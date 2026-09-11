"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ShieldCheckIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/lib/i18n/language-context";
import DepthText from "@/components/ui/DepthText";

const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

function HeroBadge() {
  const { t } = useLanguage();
  return (
    <div
      className="inline-flex items-center gap-2 mb-6"
      style={{ isolation: "isolate" }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "100px",
          height: "28px",
          padding: "4px 14px",
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
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          {t.hero.badge}
        </span>
      </div>
    </div>
  );
}

function HeroScanForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [url, setUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    router.push(`/scan?url=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2.5 w-full"
      style={{ maxWidth: "460px" }}
    >
      <input
        type="text"
        inputMode="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder={t.hero.inputPlaceholder}
        style={{
          width: "100%",
          height: "48px",
          padding: "0 16px",
          borderRadius: "10px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-1.5 w-full sm:w-auto flex-shrink-0"
        style={{
          height: "48px",
          padding: "0 22px",
          borderRadius: "10px",
          background: "#FFFFFF",
          color: "#000000",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {t.hero.cta}
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "115px",
        paddingBottom: "60px",
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

      {/* Accent décoratif "IA" en relief 3D — centré derrière "inside AI answers" */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% - 20px))",
          zIndex: 0,
          opacity: 0.18,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <DepthText
          text="IA"
          layers={30}
          depth={2.6}
          faceColor="#B6FF6E"
          depthColor="#39FF14"
          tilt={6}
          pointerTracking
          smoothing={0.14}
          perspective={850}
          autoOrbit
          orbitSpeed={0.25}
          fontSize="clamp(9rem, 22vw, 16rem)"
          fontWeight={900}
          shadow
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "760px",
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
            fontSize: "clamp(34px, 6vw, 50px)",
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
            marginBottom: "18px",
          }}
        >
          {t.hero.h1Line1}
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
            {t.hero.h1Line2}
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15.5px",
            fontWeight: 300,
            color: "#A1A1AA",
            maxWidth: "480px",
            lineHeight: 1.65,
            marginBottom: "30px",
          }}
        >
          {t.hero.description}
        </p>

        <div className="flex flex-col items-center gap-2.5 w-full">
          <HeroScanForm />

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {t.hero.ctaSubtext}
          </p>
        </div>

        <div
          className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <ShieldCheckIcon className="w-4 h-4 text-zinc-400" />
          <span>{t.hero.trustLine}</span>
        </div>
      </div>
    </section>
  );
}
