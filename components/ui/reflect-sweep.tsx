"use client";

interface ReflectSweepProps {
  /** Ne rend (et donc ne joue) l'animation que lorsque true — piloté par le parent via useInView. */
  active: boolean;
  /** Décalage en ms, pour créer une cascade entre plusieurs cartes d'une même rangée. */
  delayMs?: number;
}

/**
 * Bande de lumière diagonale qui traverse le conteneur une seule fois.
 * Le conteneur parent doit être `position: relative` + `overflow: hidden`.
 */
export function ReflectSweep({ active, delayMs = 0 }: ReflectSweepProps) {
  if (!active) return null;

  return (
    <span
      aria-hidden="true"
      className="reflect-sweep"
      style={{ animationDelay: `${delayMs}ms` }}
    />
  );
}
