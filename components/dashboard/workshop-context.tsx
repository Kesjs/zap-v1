"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MobileMoneyAccount {
  provider: "MTN MoMo" | "Moov Money" | "Wave" | "Celtiis" | "Orange Money";
  number: string;
  name: string;
}

export interface BankAccount {
  bank: string;
  rib: string;
  iban: string;
}

export interface WorkshopProfile {
  name: string;
  activity: string;
  city: string;
  country: string;
  whatsapp: string;
  ifu: string;
  rccm: string;
  logoUrl: string | null;
  stampUrl: string | null;
  signatureUrl: string | null;
  mobileMoney1: MobileMoneyAccount;
  mobileMoney2?: MobileMoneyAccount;
  bankInfo?: BankAccount;
}

const DEFAULT_WORKSHOP: WorkshopProfile = {
  name: "Mon Atelier",
  activity: "Artisanat & Services",
  city: "Cotonou",
  country: "Bénin",
  whatsapp: "",
  ifu: "",
  rccm: "",
  logoUrl: null,
  stampUrl: null,
  signatureUrl: null,
  mobileMoney1: {
    provider: "MTN MoMo",
    number: "",
    name: "",
  },
};

import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface WorkshopContextType {
  workshop: WorkshopProfile;
  updateWorkshop: (partial: Partial<WorkshopProfile>) => Promise<void>;
  getInitials: () => string;
  isSyncing: boolean;
  isCloudSynced: boolean;
  lastSyncedAt: string | null;
  userEmail: string | null;
  userId: string | null;
  refreshWorkshop: () => Promise<void>;
}

const WorkshopContext = createContext<WorkshopContextType | undefined>(undefined);

export function WorkshopProvider({ children }: { children: React.ReactNode }) {
  const [workshop, setWorkshop] = useState<WorkshopProfile>(DEFAULT_WORKSHOP);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCloudSynced, setIsCloudSynced] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Hydrate from localStorage first (instant UI, zero flash)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zap:workshop_profile");
      if (saved) {
        setWorkshop((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // Ignore
    }
  }, []);

  // 2. Hydrate from Supabase Cloud Auth User Metadata
  const refreshWorkshop = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setIsCloudSynced(false);
        return;
      }

      setUserEmail(user.email ?? null);
      setUserId(user.id);
      setIsCloudSynced(true);

      const cloudWorkshop = user.user_metadata?.workshop as Partial<WorkshopProfile> | undefined;
      const profileUpdates: Partial<WorkshopProfile> = {};

      // 1. Lire depuis la table public.workshops
      try {
        const { data: dbWorkshop } = await supabase
          .from("workshops")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (dbWorkshop) {
          const fromDb: Partial<WorkshopProfile> = {
            name: dbWorkshop.name || undefined,
            city: dbWorkshop.city || undefined,
            country: dbWorkshop.country || undefined,
            whatsapp: dbWorkshop.phone || undefined,
            ifu: dbWorkshop.tax_id || undefined,
            logoUrl: dbWorkshop.logo_url || undefined,
            stampUrl: dbWorkshop.stamp_signature_url || undefined,
          };
          if (dbWorkshop.momo_number) {
            fromDb.mobileMoney1 = {
              provider: (dbWorkshop.momo_operator as any) || "MTN Mobile Money",
              number: dbWorkshop.momo_number,
              name: dbWorkshop.owner_name || dbWorkshop.name || "",
            };
          }
          Object.assign(profileUpdates, fromDb);
        }
      } catch (e) {
        console.warn("Table workshops fetch warning:", e);
      }

      // 2. Lire depuis public.profiles table en complément
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, city, phone_number, avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (profile) {
          if (profile.full_name && !profileUpdates.name) profileUpdates.name = profile.full_name;
          if (profile.city && !profileUpdates.city) profileUpdates.city = profile.city;
          if (profile.phone_number && !profileUpdates.whatsapp) profileUpdates.whatsapp = profile.phone_number;
          if (profile.avatar_url && !profileUpdates.logoUrl && !cloudWorkshop?.logoUrl) profileUpdates.logoUrl = profile.avatar_url;
        }
      } catch {
        // Table fallback
      }

      if (cloudWorkshop || Object.keys(profileUpdates).length > 0) {
        setWorkshop((prev) => {
          const merged = { ...prev, ...cloudWorkshop, ...profileUpdates };
          try {
            localStorage.setItem("zap:workshop_profile", JSON.stringify(merged));
          } catch {
            // Ignore
          }
          return merged;
        });
        setLastSyncedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err) {
      console.warn("Supabase fetch user warning:", err);
    }
  };

  useEffect(() => {
    refreshWorkshop();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      refreshWorkshop();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 3. Update both locally and asynchronously in Supabase Cloud
  const updateWorkshop = async (partial: Partial<WorkshopProfile>) => {
    let nextProfile: WorkshopProfile = DEFAULT_WORKSHOP;

    setWorkshop((prev) => {
      const next = { ...prev, ...partial };
      nextProfile = next;
      try {
        localStorage.setItem("zap:workshop_profile", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });

    // Sync to Supabase Cloud if user is authenticated
    try {
      setIsSyncing(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserEmail(user.email ?? null);
        setUserId(user.id);

        // 1. Sync full rich metadata to Supabase Auth user_metadata
        const { error } = await supabase.auth.updateUser({
          data: {
            workshop: nextProfile,
            updated_at: new Date().toISOString(),
          },
        });

        // 2. Sync into public.workshops SQL table
        try {
          await supabase.from("workshops").upsert(
            {
              user_id: user.id,
              name: nextProfile.name,
              owner_name: nextProfile.mobileMoney1?.name || nextProfile.name,
              phone: nextProfile.whatsapp,
              city: nextProfile.city,
              country: nextProfile.country,
              tax_id: nextProfile.ifu,
              momo_operator: nextProfile.mobileMoney1?.provider || "MTN Mobile Money",
              momo_number: nextProfile.mobileMoney1?.number || null,
              logo_url: nextProfile.logoUrl,
              stamp_signature_url: nextProfile.stampUrl,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
        } catch (wsErr) {
          console.warn("Supabase workshops table upsert warning:", wsErr);
        }

        // 3. Sync core identity fields to public.profiles SQL table
        try {
          await supabase
            .from("profiles")
            .update({
              full_name: nextProfile.name,
              city: nextProfile.city,
              phone_number: nextProfile.whatsapp,
              avatar_url: nextProfile.logoUrl,
              updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
        } catch {
          // Ignore if profile row not created yet
        }

        if (!error) {
          setIsCloudSynced(true);
          setLastSyncedAt(
            new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
          );
        } else {
          console.warn("Supabase updateUser metadata error:", error.message);
        }
      }
    } catch (err) {
      console.warn("Supabase sync exception:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const getInitials = () => {
    if (!workshop.name) return "AK";
    const words = workshop.name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <WorkshopContext.Provider
      value={{
        workshop,
        updateWorkshop,
        getInitials,
        isSyncing,
        isCloudSynced,
        lastSyncedAt,
        userEmail,
        userId,
        refreshWorkshop,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);
  if (!context) {
    throw new Error("useWorkshop must be used within a WorkshopProvider");
  }
  return context;
}
