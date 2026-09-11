"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

const SIZE = 132;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ScoreRingProps {
  value?: number;
  max?: number;
  label?: string;
}

export function ScoreRing({ value = 73, max = 100, label }: ScoreRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);
  const [offset, setOffset] = useState(CIRCUMFERENCE);
  const [swept, setSwept] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplay(value);
      setOffset(CIRCUMFERENCE - (value / max) * CIRCUMFERENCE);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(Math.round(v));
        setOffset(CIRCUMFERENCE - (v / max) * CIRCUMFERENCE);
      },
      onComplete: () => setSwept(true),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="score-ring-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Fond ardoise */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#1A1A1D"
          strokeWidth={STROKE}
        />

        {/* Progression 0 → value */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />

        {/* Sweep lumineux — un seul passage, déclenché en fin de fill */}
        {swept && (
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#score-ring-sweep)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${CIRCUMFERENCE * 0.16} ${CIRCUMFERENCE}`}
            className="score-ring-sweep"
          />
        )}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "36px",
            lineHeight: 1,
            color: "#FFFFFF",
          }}
        >
          {display}
        </span>
        {label && (
          <span className="mt-1 text-[9px] text-zinc-400 uppercase tracking-wide">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
