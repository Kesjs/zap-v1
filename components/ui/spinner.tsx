import React from "react";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Spinner({ className = "", size = "md" }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-[1.5px]",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-2",
  }[size];

  return (
    <div
      className={`rounded-full border-white/20 border-t-white animate-spin shrink-0 ${sizeClasses} ${className}`}
      role="status"
      aria-label="Chargement"
    />
  );
}

export default Spinner;
