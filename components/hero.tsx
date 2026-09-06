import Link from "next/link";
import dynamic from "next/dynamic";

const HeroVisualDocument = dynamic(() => import("@/components/hero-visual"));

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
          background: "rgba(255, 255, 255, 0.65)",
          border: "1px solid rgba(28, 43, 69, 0.14)",
          borderRadius: "100px",
          height: "28px",
          padding: "4px 12px 4px 4px",
          position: "relative",
          overflow: "hidden",
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
              "linear-gradient(90deg, transparent 0%, #B8502E 45%, #C89B3C 55%, transparent 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            backgroundSize: "200% 100%",
            animation: "badge-beam 11s linear infinite",
          }}
        />
        <span
          style={{
            background: "#1C2B45",
            color: "#F4EEE2",
            fontSize: "10px",
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.08em",
            padding: "2px 6px",
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
            color: "rgba(28, 43, 69, 0.65)",
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
        paddingTop: "100px",
        paddingBottom: "80px",
        background:
          "radial-gradient(ellipse 900px 500px at 50% -10%, #FBF7EE 0%, #F4EEE2 60%)",
      }}
    >
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
            fontSize: "clamp(34px, 6vw, 46px)",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#1C2B45",
            marginBottom: "20px",
          }}
        >
          Créez vos devis, factures et reçus
          <br />
          <span
            style={{
              fontStyle: "italic",
              background: "linear-gradient(135deg, #B8502E 0%, #C89B3C 100%)",
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
            color: "rgba(28, 43, 69, 0.65)",
            maxWidth: "440px",
            lineHeight: 1.65,
            marginBottom: "32px",
          }}
        >
          Vos informations, votre signature et votre cachet, réunis sur chaque document.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/login?tab=register"
            className="hero-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #1C2B45 0%, #2C3A5C 100%)",
              color: "#F4EEE2",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              padding: "13px 22px",
              borderRadius: "10px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Créer un document
          </Link>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(28, 43, 69, 0.55)",
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
