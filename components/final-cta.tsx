"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheckIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function FinalCta() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#000000",
        padding: "110px 24px",
      }}
    >
      {/* Background Animated Floating Paths */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        {/* Soft radial overlay for luxury vignetting */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.3) 0%, #000000 85%)",
          }}
        />
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            background: "rgba(18, 18, 21, 0.75)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "24px",
            padding: "64px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 46px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Prêt à professionnaliser vos documents ?
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15.5px",
              fontWeight: 300,
              color: "#A1A1AA",
              maxWidth: "500px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Devis, facture ou reçu certifié : émettez votre prochain document officiel en moins de deux minutes.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <Link
              href="/login?tab=register"
              className="group inline-flex items-center gap-2.5 transition-all duration-300"
              style={{
                background: "#FFFFFF",
                color: "#000000",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14.5px",
                fontWeight: 600,
                padding: "14px 30px",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 0 35px rgba(255, 255, 255, 0.25)",
              }}
            >
              <span>Commencer gratuitement</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-2 mt-5 text-xs text-zinc-400">
            <ShieldCheckIcon className="w-4 h-4 text-zinc-300" />
            <span>8 documents offerts à l'inscription · Zéro carte bancaire requise</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
