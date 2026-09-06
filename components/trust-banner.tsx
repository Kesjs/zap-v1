"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Wave", wordmark: "Wave" },
  { name: "Orange Money", wordmark: "Orange Money" },
  { name: "MTN MoMo", wordmark: "MTN MoMo" },
  { name: "Moov Money", wordmark: "Moov Money" },
  { name: "Wave", wordmark: "Wave" },
  { name: "Orange Money", wordmark: "Orange Money" },
  { name: "MTN MoMo", wordmark: "MTN MoMo" },
  { name: "Moov Money", wordmark: "Moov Money" },
];

// SVG wordmarks — minimal, clean, ivoire ~50%
const WordmarkSvgs: Record<string, React.FC<{ style?: React.CSSProperties }>> = {
  "Wave": ({ style }) => (
    <svg viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto", ...style }}>
      <text x="0" y="22" fontFamily="DM Sans, sans-serif" fontSize="20" fontWeight="300" fill="currentColor">Wave</text>
    </svg>
  ),
  "Orange Money": ({ style }) => (
    <svg viewBox="0 0 155 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto", ...style }}>
      <text x="0" y="22" fontFamily="DM Sans, sans-serif" fontSize="20" fontWeight="300" fill="currentColor">Orange Money</text>
    </svg>
  ),
  "MTN MoMo": ({ style }) => (
    <svg viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto", ...style }}>
      <text x="0" y="22" fontFamily="DM Sans, sans-serif" fontSize="20" fontWeight="300" fill="currentColor">MTN MoMo</text>
    </svg>
  ),
  "Moov Money": ({ style }) => (
    <svg viewBox="0 0 135 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 22, width: "auto", ...style }}>
      <text x="0" y="22" fontFamily="DM Sans, sans-serif" fontSize="20" fontWeight="300" fill="currentColor">Moov Money</text>
    </svg>
  ),
};

export default function TrustBanner() {
  // Duplicate array for seamless infinite loop
  const items = [...partners, ...partners];

  return (
    <section
      style={{
        padding: "48px 0",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "rgba(244,244,245,0.35)",
          marginBottom: "28px",
        }}
      >
        Paiements acceptés
      </motion.p>

      {/* Marquee container with edge fades */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "56px",
            width: "max-content",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = "running";
          }}
        >
          {items.map((partner, i) => {
            const Wordmark = WordmarkSvgs[partner.name];
            return (
              <div
                key={`${partner.name}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  color: "rgba(244,244,245,0.50)",
                  flexShrink: 0,
                }}
              >
                {Wordmark && (
                  <Wordmark />
                )}
                {/* Dot separator */}
                <span
                  aria-hidden
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(244,244,245,0.20)",
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
