"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Mes clients me font davantage confiance depuis que mes factures ont l'air aussi sérieuses que celles d'un grand atelier.",
    author: "Moussa D.",
    role: "Mécanicien",
    city: "Cotonou",
  },
  {
    quote:
      "Je n'ai plus besoin de courir après mon carnet à souche. Tout est sur mon téléphone.",
    author: "Ablavi T.",
    role: "Couturière",
    city: "Lomé",
  },
  {
    quote:
      "Le cachet numérique, c'est exactement mon vrai cachet — mes clients ne voient pas la différence.",
    author: "Kouamé B.",
    role: "Menuisier",
    city: "Abidjan",
  },
];

// Replicate for seamless infinite marquee loop
const items = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section
      style={{
        background: "#000000",
        padding: "88px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(28px, 4vw, 38px)",
              color: "#F4F4F5",
              lineHeight: 1.2,
              marginBottom: "12px",
            }}
          >
            Ils font confiance à{" "}
            <span
              style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ZAP
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 244, 245, 0.65)",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            Artisans et entrepreneurs indépendants partagent leur expérience.
          </motion.p>
        </div>
      </div>

      {/* Infinite Marquee with edge fades and hover pause */}
      <div
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            gap: "20px",
            width: "max-content",
            padding: "8px 0",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "paused";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState =
              "running";
          }}
        >
          {items.map((t, i) => (
            <div
              key={`${t.city}-${i}`}
              style={{
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: "14px",
                padding: "24px 28px",
                width: "340px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "18px",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                  fontSize: "15.5px",
                  color: "#F4F4F5",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                &laquo;&nbsp;{t.quote}&nbsp;&raquo;
              </p>

              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: "#D4AF37",
                    margin: 0,
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "rgba(244, 244, 245, 0.45)",
                    margin: "2px 0 0",
                  }}
                >
                  {t.role}, {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
