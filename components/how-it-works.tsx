"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-context";

const SWEEP_DURATION = 2.2; // secondes — temps total pour traverser le panneau du haut vers le bas

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.howItWorks;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const stepDelay = SWEEP_DURATION / h.steps.length;
  const revealNow = isInView && !prefersReducedMotion;

  return (
    <section
      id="comment-ca-marche"
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
              marginBottom: "14px",
            }}
          >
            {h.title}
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
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {h.subtitle}
          </motion.p>
        </div>

        {/* Panneau scanné — un seul cadre, une barre lumineuse traverse une fois de haut en bas
            et révèle chaque étape au fur et à mesure qu'elle passe dessus */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            background: "#121215",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Barre de scan — masquée si l'utilisateur préfère les animations réduites */}
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              initial={{ top: "0%", opacity: 0 }}
              animate={isInView ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
              transition={{ duration: SWEEP_DURATION, ease: "easeInOut", times: [0, 0.06, 0.94, 1] }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
                boxShadow: "0 0 24px 3px rgba(255, 255, 255, 0.45)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          )}

          {h.steps.map((item, i) => (
            <div
              key={item.step}
              style={{
                position: "relative",
                padding: "36px 32px",
                borderBottom:
                  i < h.steps.length - 1 ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
              }}
            >
              <motion.div
                initial={{ opacity: 0.12, filter: "blur(5px)" }}
                animate={revealNow ? { opacity: 1, filter: "blur(0px)" } : prefersReducedMotion ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: stepDelay * (i + 0.55), ease: "easeOut" }}
                style={{ display: "flex", gap: "22px", alignItems: "flex-start" }}
              >
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "24px",
                    color: "#FFFFFF",
                    opacity: 0.45,
                    flexShrink: 0,
                    width: "36px",
                  }}
                >
                  {item.step}
                </span>

                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "20px",
                      color: "#F4F4F5",
                      margin: "0 0 8px",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(244, 244, 245, 0.65)",
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: "440px",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
