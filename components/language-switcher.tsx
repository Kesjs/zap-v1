"use client";

import { useLanguage } from "@/lib/i18n/language-context";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center flex-shrink-0 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "100px",
        padding: "2px",
        height: "28px",
      }}
      role="group"
      aria-label="Choix de la langue / Language selection"
    >
      {/* Pastille glissante */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "2px",
          bottom: "2px",
          left: lang === "fr" ? "2px" : "50%",
          width: "calc(50% - 2px)",
          background: "#FFFFFF",
          borderRadius: "100px",
          transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {(["fr", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          style={{
            position: "relative",
            zIndex: 1,
            width: "30px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: lang === option ? "#000000" : "#A1A1AA",
            transition: "color 0.25s ease",
          }}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
