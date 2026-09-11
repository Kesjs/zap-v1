"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Lang } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "reflet-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Au montage, on relit la préférence enregistrée (si présente) sans provoquer
  // de mismatch d'hydratation : le rendu serveur reste toujours en "fr".
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  function setLang(next: Lang) {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage doit être utilisé à l'intérieur de <LanguageProvider>");
  }
  return ctx;
}
