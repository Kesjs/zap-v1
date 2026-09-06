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
  name: "Atelier Koffi & Fils",
  activity: "Menuiserie & Agencement",
  city: "Cotonou",
  country: "Bénin",
  whatsapp: "+229 97 00 11 22",
  ifu: "3202112456789",
  rccm: "RB/COT/21 B 12345",
  logoUrl: null,
  stampUrl: null,
  signatureUrl: null,
  mobileMoney1: {
    provider: "MTN MoMo",
    number: "+229 97 00 11 22",
    name: "Koffi Mensah",
  },
  mobileMoney2: {
    provider: "Moov Money",
    number: "+229 95 33 44 55",
    name: "Atelier Koffi",
  },
  bankInfo: {
    bank: "BOA Bénin",
    rib: "BJ061 01001 002345678901 23",
    iban: "BJ66 BJ06 1010 0100 2345 6789 0123",
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
      if (cloudWorkshop && typeof cloudWorkshop === "object") {
        setWorkshop((prev) => {
          const merged = { ...prev, ...cloudWorkshop };
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

        const { error } = await supabase.auth.updateUser({
          data: {
            workshop: nextProfile,
            updated_at: new Date().toISOString(),
          },
        });

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
