"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const HeroVisualDocument = dynamic(() => import("@/components/hero-visual"));
const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

function HeroBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 mb-6"
      style={{ isolation: "isolate" }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "100px",
          height: "28px",
          padding: "4px 12px 4px 4px",
          position: "relative",
          overflow: "hidden",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "100px",
            padding: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            backgroundSize: "200% 100%",
            animation: "badge-beam 8s linear infinite",
          }}
        />
        <span
          style={{
            background: "#FFFFFF",
            color: "#000000",
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            padding: "2px 7px",
            borderRadius: "100px",
          }}
        >
          NEW
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12.5px",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          En finir avec les carnets papier
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "120px",
        paddingBottom: "90px",
        background: "#000000",
      }}
    >
      {/* Background Animated Beams */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
          beamColor="#000000"
          backgroundColor="#000000"
        />
        {/* Soft radial vignette overlay to blend edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 35%, transparent 35%, #000000 95%)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
          padding: "0 24px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <HeroBadge />

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(34px, 6vw, 48px)",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
            marginBottom: "20px",
          }}
        >
          Créez vos devis, factures et reçus
          <br />
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(180deg, #FFFFFF 20%, #A1A1AA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            en toute simplicité.
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15.5px",
            fontWeight: 300,
            color: "#A1A1AA",
            maxWidth: "460px",
            lineHeight: 1.65,
            marginBottom: "32px",
          }}
        >
          Vos informations, votre signature et votre cachet, réunis sur chaque document.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/login?tab=register"
            className="hero-cta transition-transform hover:scale-105"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFFFF",
              color: "#000000",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              padding: "13px 24px",
              borderRadius: "10px",
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 0 35px rgba(255, 255, 255, 0.22)",
            }}
          >
            Créer un document
          </Link>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            8 documents gratuits pour commencer
          </p>
        </div>

        <HeroVisualDocument />
      </div>
    </section>
  );
}
