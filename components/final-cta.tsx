"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import { FloatingPaths } from "@/components/ui/background-paths";
import MotionButton from "@/components/ui/motion-button";

export default function FinalCta() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center text-center"
      style={{
        background: "#000000",
        padding: "140px 24px",
        minHeight: "560px",
      }}
    >
      {/* Background Animated Floating Paths — identique au panneau visuel de /login */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
        {/* Masque radial sombre pour fondre les trajectoires aux extrémités et garder le texte lisible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 20%, #000000 90%)",
          }}
        />
      </div>

      {/* Contenu posé directement sur le fond animé — pas de carte/cadre autour */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
        style={{ maxWidth: "620px", margin: "0 auto" }}
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
          Prêt à savoir ce que ChatGPT dit de toi ?
        </h2>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15.5px",
            fontWeight: 300,
            color: "#A1A1AA",
            maxWidth: "500px",
            lineHeight: 1.6,
            marginBottom: "36px",
          }}
        >
          Un scan gratuit, sans carte bancaire, pour voir où tu apparais — et où tu es absent — dans les réponses IA de ton secteur.
        </p>

        {/* Bouton CTA signature identique à celui du Hero (MotionButton) */}
        <div className="flex flex-col items-center gap-3">
          <MotionButton
            label="Lancer mon scan gratuit"
            href="/#hero"
            classes="w-64"
          />

          <div className="flex items-center gap-2 mt-3 text-xs text-zinc-400">
            <ShieldCheckIcon className="w-4 h-4 text-zinc-300" />
            <span>Résultat en quelques secondes · Aucune carte bancaire requise</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
