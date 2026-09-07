"use client";

import { useCallback, useRef } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { flushSync } from "react-dom";

interface ThemeSwitcherProps {
  theme: "light" | "dark";
  onToggle: () => void;
  className?: string;
}

/**
 * Toggle clair/sombre — icône seule (pas de fond/pilule coloré),
 * révélé par un cercle animé via la View Transitions API.
 * Reste contrôlé par le DashboardThemeProvider : ce composant ne fait
 * que déclencher onToggle() à l'intérieur de la transition.
 */
export default function ThemeSwitcher({ theme, onToggle, className = "" }: ThemeSwitcherProps) {
  const isDark = theme === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);

  const handleClick = useCallback(() => {
    const button = buttonRef.current;
    if (!button || isTransitioningRef.current) return;

    if (typeof document.startViewTransition !== "function") {
      onToggle();
      return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    isTransitioningRef.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(onToggle);
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => {
      isTransitioningRef.current = false;
    });
  }, [onToggle]);

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={isDark ? "Thème sombre — cliquer pour passer au clair" : "Thème clair — cliquer pour passer au sombre"}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors cursor-pointer hover:bg-[var(--surface)] ${className}`}
      style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
    >
      {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}
