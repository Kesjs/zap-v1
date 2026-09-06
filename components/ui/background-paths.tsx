"use client";

import { motion } from "framer-motion";

export function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(255,255,255,${0.05 + i * 0.015})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full text-white"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.03 + path.id * 0.006}
            initial={{ pathLength: 0.3, opacity: 0.18 }}
            animate={{
              pathLength: 1,
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 34 + (path.id % 12) * 2.4,
              delay: -(path.id * 1.7),
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#09090B] ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        {/* Soft radial overlay for subtle vignetting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(9,9,11,0.2) 0%, #09090B 80%)",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default BackgroundPaths;
