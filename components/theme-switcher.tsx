"use client";

import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

interface ThemeSwitcherProps {
  theme: "light" | "dark";
  onToggle: () => void;
  className?: string;
}

/**
 * Toggle clair/sombre animé — pilule avec thumb glissant.
 * Contrôlé (theme/onToggle) pour rester réutilisable partout où on en a besoin.
 */
export default function ThemeSwitcher({ theme, onToggle, className = "" }: ThemeSwitcherProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={isDark ? "Thème sombre — cliquer pour passer au clair" : "Thème clair — cliquer pour passer au sombre"}
      className={`relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full border transition-colors cursor-pointer ${className}`}
      style={{
        background: "var(--accent-tint)",
        borderColor: "var(--border)",
      }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-6 w-6 items-center justify-center rounded-full shadow-sm"
        style={{
          background: "var(--accent)",
          marginLeft: isDark ? "calc(100% - 26px)" : "2px",
        }}
      >
        <motion.span
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <MoonIcon className="w-3.5 h-3.5" style={{ color: "var(--primary-foreground)" }} />
          ) : (
            <SunIcon className="w-3.5 h-3.5" style={{ color: "var(--primary-foreground)" }} />
          )}
        </motion.span>
      </motion.span>
    </button>
  );
}
