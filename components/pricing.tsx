"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Pricing() {
  const { t } = useLanguage();
  const p = t.pricing;

  return (
    <section
      id="pricing"
      style={{
        background: "#09090B",
        padding: "96px 24px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div style={{ maxWidth: "560px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            {p.title}
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
              color: "#A1A1AA",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            {p.subtitle}
          </motion.p>
        </div>

        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            position: "relative",
            background: "#121215",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 35px rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, padding: "36px 32px" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "14px",
              }}
            >
              {p.planLabel}
            </p>

            <div className="flex items-baseline gap-2 flex-wrap" style={{ marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "40px",
                  color: "#FFFFFF",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                49€
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#A1A1AA",
                }}
              >
                {p.priceSuffix}
              </span>
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13.5px",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.5,
                margin: "0 0 28px",
              }}
            >
              {p.trialText}
            </p>

            <Link
              href="/login?tab=register"
              className="transition-transform hover:scale-[1.02]"
              style={{
                display: "block",
                textAlign: "center",
                background: "#FFFFFF",
                color: "#000000",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                padding: "12px",
                borderRadius: "10px",
                textDecoration: "none",
                marginBottom: "28px",
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.15)",
              }}
            >
              {p.cta}
            </Link>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {p.features.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[13.5px]">
                  <CheckIcon style={{ width: 16, height: 16, color: "#FFFFFF", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255, 255, 255, 0.75)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
