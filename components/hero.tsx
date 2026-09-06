"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  StarIcon,
  BoltIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

const Beams = dynamic(() => import("@/components/ui/Beams"), { ssr: false });

const avatars = [
  {
    name: "Moussa Diop - Menuisier",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Amina Touré - Couture & Mode",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Koffi Mensah - Mécanique Auto",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Fatou Sow - Créatrice d'Atelier",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
  },
  {
    name: "Ibrahim Koné - Électricien BTP",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
  },
];

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

function HeroSocialProof() {
  return (
    <div className="flex flex-col items-center gap-4 mt-8 pt-6 border-t border-white/10 w-full max-w-lg">
      {/* Avatars & Ratings */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Avatars stack */}
        <div className="flex items-center -space-x-2.5">
          {avatars.map((avatar, idx) => (
            <div
              key={idx}
              className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-black"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              <Image
                src={avatar.src}
                alt={avatar.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Stars and score */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 text-amber-400" />
            ))}
          </div>
          <span className="text-white text-xs font-semibold tracking-tight">4.9/5</span>
        </div>
      </div>

      {/* Trust text */}
      <p className="text-xs text-zinc-400 text-center font-normal">
        Recommandé par plus de <span className="text-zinc-200 font-medium">150 artisans & indépendants</span>
      </p>

      {/* 3 Value pills with Heroicons */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300">
          <BoltIcon className="w-3.5 h-3.5 text-zinc-300" />
          <span>Prêt en 30 secondes</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300">
          <PaperAirplaneIcon className="w-3.5 h-3.5 text-zinc-300" />
          <span>Partage direct WhatsApp</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-zinc-300">
          <ShieldCheckIcon className="w-3.5 h-3.5 text-zinc-300" />
          <span>8 documents offerts</span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
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
        {/* Soft radial vignette overlay */}
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
            maxWidth: "480px",
            lineHeight: 1.65,
            marginBottom: "30px",
          }}
        >
          Vos informations, votre signature et votre cachet officiel, réunis sur chaque document.
        </p>

        <div className="flex flex-col items-center gap-2.5">
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
              padding: "13px 26px",
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
            8 documents gratuits pour commencer sans engagement
          </p>
        </div>

        {/* Social proof replacing the mockup */}
        <HeroSocialProof />
      </div>
    </section>
  );
}
