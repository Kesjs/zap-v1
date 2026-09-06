"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  CheckBadgeIcon,
  PencilSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

// ─── BorderGlow wrapper ─────────────────────────────────────────────────────
function BorderGlowCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={className}
      style={{
        position: "relative",
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.3s ease",
        ...style,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow spotlight */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.13) 0%, rgba(226,177,112,0.06) 40%, transparent 70%)`,
          zIndex: 0,
        }}
      />
      {/* Border glow line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          borderRadius: "16px",
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.4) 0%, transparent 60%)`,
          zIndex: 0,
          maskImage:
            "linear-gradient(black 0 0) padding-box, linear-gradient(black 0 0)",
          WebkitMaskImage:
            "linear-gradient(black 0 0) padding-box, linear-gradient(black 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}

// ─── Stamp crossfade ────────────────────────────────────────────────────────
function StampCrossfade() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        aspectRatio: "16/9",
        background: "#000000",
      }}
    >
      {/* Before — physical stamp photo */}
      <div className="stamp-before" style={{ position: "absolute", inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1586339949216-35c2747cc36d?w=800&q=80"
          alt="Cachet physique encreur"
          fill
          style={{ objectFit: "cover", opacity: 0.85 }}
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(23,23,23,0.8) 100%)",
          }}
        />
      </div>

      {/* After — digital stamp preview */}
      <div className="stamp-after" style={{ position: "absolute", inset: 0, background: "#171717" }}>
        {/* Simulated digital stamp */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "140px",
              height: "140px",
              border: "3px solid #D4AF37",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "110px",
                height: "110px",
                border: "1.5px solid rgba(212,175,55,0.4)",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "13px",
                  color: "#D4AF37",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                Atelier
              </span>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "15px",
                  color: "#D4AF37",
                  fontStyle: "italic",
                }}
              >
                Koffi &amp; Fils
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
                  color: "rgba(212,175,55,0.6)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Mécanicien
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          color: "rgba(244,244,245,0.50)",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        Avant · Après
      </p>
    </div>
  );
}

// ─── Feature cards data ─────────────────────────────────────────────────────
const features = [
  {
    id: "stamp",
    title: "Studio de Cachet Numérique",
    description:
      "Photographiez votre cachet réel, il est prêt à l'emploi en un instant.",
    icon: CheckBadgeIcon,
    large: true,
    visual: <StampCrossfade />,
    imageUrl: null,
  },
  {
    id: "signature",
    title: "Signature Tactile",
    description:
      "Signez du doigt une seule fois, réutilisez-la sur chaque document.",
    icon: PencilSquareIcon,
    large: false,
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    id: "share",
    title: "Partage Instantané",
    description:
      "WhatsApp, PDF, impression : votre document part en un geste.",
    icon: ShareIcon,
    large: false,
    imageUrl:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80",
  },
];

// ─── Container animation ─────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

// ─── Main Features section ──────────────────────────────────────────────────
export default function Features() {
  return (
    <section id="features" className="section-padding" style={{ background: "#000000" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="label-tracked"
          style={{ marginBottom: "16px" }}
        >
          Fonctionnalités
        </motion.p>

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            color: "#F4F4F5",
            marginBottom: "56px",
            maxWidth: "540px",
          }}
        >
          Tout ce qu&apos;il faut pour paraître{" "}
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            irréprochable
          </span>
        </motion.h2>

        {/* Bento grid — asymmetric */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Large block — stamp (spans 2 cols on desktop) */}
          <motion.div variants={item} style={{ gridColumn: "1 / -1" }}>
            <BorderGlowCard
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 0,
                minHeight: "320px",
              }}
            >
              {/* Left: text */}
              <div style={{ padding: "32px" }}>
                {(() => { const Icon = features[0].icon; return <Icon style={{ width: 28, height: 28, color: "#D4AF37", marginBottom: "16px" }} />; })()}
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#F4F4F5",
                    marginBottom: "10px",
                    lineHeight: 1.25,
                  }}
                >
                  {features[0].title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(244,244,245,0.65)",
                    lineHeight: 1.6,
                  }}
                >
                  {features[0].description}
                </p>
              </div>
              {/* Right: crossfade visual */}
              <div style={{ padding: "24px 24px 24px 0", display: "flex", alignItems: "center" }}>
                {features[0].visual}
              </div>
            </BorderGlowCard>
          </motion.div>

          {/* Smaller blocks */}
          {features.slice(1).map((feat) => (
            <motion.div key={feat.id} variants={item}>
              <BorderGlowCard style={{ overflow: "hidden" }}>
                {/* Photo */}
                {feat.imageUrl && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={feat.imageUrl}
                      alt={feat.title}
                      fill
                      style={{ objectFit: "cover", opacity: 0.75 }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to bottom, transparent 30%, #171717 100%)",
                      }}
                    />
                  </div>
                )}
                {/* Text */}
                <div style={{ padding: "24px" }}>
                  <feat.icon
                    style={{
                      width: 24,
                      height: 24,
                      color: "#D4AF37",
                      marginBottom: "12px",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "19px",
                      color: "#F4F4F5",
                      marginBottom: "8px",
                      lineHeight: 1.25,
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color: "rgba(244,244,245,0.60)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feat.description}
                  </p>
                </div>
              </BorderGlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
