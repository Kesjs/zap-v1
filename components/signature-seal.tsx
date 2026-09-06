"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  DocumentCheckIcon,
  ReceiptRefundIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

// ─── Precision Card Component (Flat, sans ombres lourdes) ───────────────────
function BorderGlowCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
        ...style,
      }}
      className="hover:border-neutral-700"
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Stamp Crossfade: Avant / Après (Slow 3s loop) ──────────────────────────
function StampCrossfade() {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3200); // 3.2s state duration

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        aspectRatio: "16/10",
        background: "#000000",
        border: "1px solid #262626",
      }}
    >
      {/* Before: Physical stamp photo */}
      <motion.div
        animate={{ opacity: showAfter ? 0 : 1 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: showAfter ? 0 : 1,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=1000&q=85"
          alt="Cachet d'atelier physique"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,12,12,0.85) 0%, transparent 50%)",
          }}
        />
      </motion.div>

      {/* After: Digital stamp render on document */}
      <motion.div
        animate={{ opacity: showAfter ? 1 : 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: showAfter ? 1 : 0,
          background: "#171717",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        {/* Document simulation background */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            border: "1px solid rgba(212,175,55,0.25)",
            background: "rgba(12,12,12,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Circular Gold Seal Empreinte */}
          <div
            style={{
              width: "130px",
              height: "130px",
              border: "2px solid #D4AF37",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              background: "rgba(212,175,55,0.06)",
              transform: "rotate(-4deg)",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "12px",
                color: "#D4AF37",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Atelier Koffi
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "9px",
                color: "rgba(212,175,55,0.75)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Cotonou · Bénin
            </span>
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(212,175,55,0.4)",
                margin: "2px 0",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "8px",
                color: "#E2B170",
                fontWeight: 500,
              }}
            >
              CERTIFIÉ
            </span>
          </div>
        </div>
      </motion.div>

      {/* Legend pill */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(12,12,12,0.85)",
          border: "1px solid #262626",
          borderRadius: "100px",
          padding: "3px 12px",
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: "rgba(244, 244, 245, 0.60)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          {showAfter ? "Rendu numérique" : "Cachet physique"} · Avant / Après
        </p>
      </div>
    </div>
  );
}

// ─── Bande récap : Devis / Factures / Reçus / PDF & WhatsApp ───────────────
const recapChips = [
  { label: "Devis", icon: DocumentTextIcon },
  { label: "Factures", icon: DocumentCheckIcon },
  { label: "Reçus", icon: ReceiptRefundIcon },
  { label: "PDF & WhatsApp", icon: DocumentArrowDownIcon },
];

function DocumentRecapBand() {
  return (
    <div
      style={{
        marginTop: "56px",
        paddingTop: "32px",
        borderTop: "1px solid #262626",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {recapChips.map((chip, index) => {
          const Icon = chip.icon;
          return (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: "100px",
                padding: "9px 16px",
              }}
            >
              <Icon style={{ width: 16, height: 16, color: "#D4AF37" }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "rgba(244, 244, 245, 0.80)",
                  whiteSpace: "nowrap",
                }}
              >
                {chip.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Signature & Cachet Section (fusionnée) ────────────────────────────
export default function SignatureSeal() {
  return (
    <section
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#F4F4F5",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Votre signature. Votre cachet.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 244, 245, 0.65)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Personnalisez vos documents avec les éléments qui vous identifient
            auprès de vos clients.
          </motion.p>
        </div>

        {/* 2 Blocks with BorderGlow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Block 1: Signature manuscrite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <BorderGlowCard style={{ padding: "28px" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "16/10",
                  marginBottom: "24px",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=85"
                  alt="Signature manuscrite sur tablette"
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(23,23,23,0.85) 0%, transparent 50%)",
                  }}
                />
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <PencilSquareIcon style={{ width: 22, height: 22, color: "#D4AF37" }} />
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#F4F4F5",
                    margin: 0,
                  }}
                >
                  Signature manuscrite
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(244, 244, 245, 0.65)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Signez directement à la main et réutilisez votre signature sur vos documents.
              </p>
            </BorderGlowCard>
          </motion.div>

          {/* Block 2: Cachet & tampon with crossfade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <BorderGlowCard style={{ padding: "28px" }}>
              <div style={{ marginBottom: "24px" }}>
                <StampCrossfade />
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <CheckBadgeIcon style={{ width: 22, height: 22, color: "#D4AF37" }} />
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#F4F4F5",
                    margin: 0,
                  }}
                >
                  Cachet &amp; tampon
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(244, 244, 245, 0.65)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Ajoutez votre cachet ou votre tampon pour retrouver votre
                identité habituelle sur vos documents numériques.
              </p>
            </BorderGlowCard>
          </motion.div>
        </div>

        {/* Bande récap : types de documents + sortie PDF/WhatsApp */}
        <DocumentRecapBand />
      </div>
    </section>
  );
}
