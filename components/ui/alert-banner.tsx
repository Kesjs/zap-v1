"use client";

import React from "react";
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

type AlertVariant = "success" | "error" | "info";

interface AlertBannerProps {
  variant: AlertVariant;
  message: string;
  className?: string;
}

const VARIANT_STYLES: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
  success: {
    bg: "rgba(63,125,92,0.10)",
    border: "rgba(63,125,92,0.35)",
    text: "#2E5E45",
    icon: "#3F7D5C",
  },
  error: {
    bg: "rgba(162,59,59,0.08)",
    border: "rgba(162,59,59,0.30)",
    text: "#7C2E2E",
    icon: "#A23B3B",
  },
  info: {
    bg: "rgba(74,59,120,0.08)",
    border: "rgba(74,59,120,0.25)",
    text: "#3A2F5F",
    icon: "#4A3B78",
  },
};

const ICONS: Record<AlertVariant, typeof CheckCircleIcon> = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

/**
 * Bannière d'alerte inline (pas de position fixed) — pour les retours de formulaire
 * (succès, erreur, info). Remplace les blocs dupliqués précédemment codés en dur
 * dans sales-registry.tsx et document-editor.tsx.
 */
export function AlertBanner({ variant, message, className = "" }: AlertBannerProps) {
  const styles = VARIANT_STYLES[variant];
  const Icon = ICONS[variant];

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-xl px-3.5 py-3 text-[13px] leading-snug ${className}`}
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        color: styles.text,
      }}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: styles.icon }} />
      <span>{message}</span>
    </div>
  );
}

/**
 * Toast flottant, non bloquant, pour les confirmations d'action dans le dashboard
 * (ex: "Reçu généré", "Modèle sauvegardé"). Se ferme seul après `duration` ms —
 * gérer le timer et le message côté parent (useState + setTimeout), ce composant
 * n'est que la présentation.
 */
export function Toast({ variant, message }: { variant: AlertVariant; message: string }) {
  const styles = VARIANT_STYLES[variant];
  const Icon = ICONS[variant];

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm shadow-lg"
      style={{
        background: "#FFFFFF",
        border: `1px solid ${styles.border}`,
        color: "#22314A",
      }}
    >
      <Icon className="w-[18px] h-[18px] shrink-0" style={{ color: styles.icon }} />
      <span>{message}</span>
    </div>
  );
}
