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

interface WorkshopContextType {
  workshop: WorkshopProfile;
  updateWorkshop: (partial: Partial<WorkshopProfile>) => void;
  getInitials: () => string;
}

const WorkshopContext = createContext<WorkshopContextType | undefined>(undefined);

export function WorkshopProvider({ children }: { children: React.ReactNode }) {
  const [workshop, setWorkshop] = useState<WorkshopProfile>(DEFAULT_WORKSHOP);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zap:workshop_profile");
      if (saved) {
        setWorkshop((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // Ignore in private browsing
    }
  }, []);

  const updateWorkshop = (partial: Partial<WorkshopProfile>) => {
    setWorkshop((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem("zap:workshop_profile", JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const getInitials = () => {
    if (!workshop.name) return "AK";
    const words = workshop.name.trim().split(/\s+/);
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <WorkshopContext.Provider value={{ workshop, updateWorkshop, getInitials }}>
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
