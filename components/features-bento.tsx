"use client";

import { motion } from "framer-motion";
import {
  CheckBadgeIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  CalculatorIcon,
  RectangleStackIcon,
  DocumentCheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function FeaturesBento() {
  return (
    <section
      id="fonctionnalites"
      style={{
        background: "#09090B",
        padding: "96px 24px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
            <DocumentCheckIcon className="w-3.5 h-3.5 text-zinc-300" />
            <span className="text-xs tracking-wider uppercase font-medium text-zinc-300">
              Fonctionnalités Clés
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 42px)",
              color: "#FFFFFF",
              lineHeight: 1.18,
              marginBottom: "16px",
            }}
          >
            Tout pour professionnaliser vos documents d&apos;atelier.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "#A1A1AA",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Fini les carnets papier volants et les contestations de prix. Émettez des devis, factures et reçus à valeur officielle en quelques secondes.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Cachet Numérique (Spans 2 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                <CheckBadgeIcon className="w-5 h-5 text-white" />
              </div>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Cachet Numérique Officiel
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-md">
                Votre sceau d&apos;atelier officiel apposé automatiquement sur chaque document émis. L&apos;authenticité de votre savoir-faire, reconnue au premier coup d&apos;œil.
              </p>
            </div>

            {/* Seal Graphic Simulation */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-white/30 flex flex-col items-center justify-center text-center p-1 rotate-[-3deg] bg-white/[0.02]">
                  <span className="text-[7.5px] font-serif uppercase tracking-widest text-zinc-200">
                    ATELIER
                  </span>
                  <span className="text-[6px] tracking-wider text-zinc-400">
                    CERTIFIÉ
                  </span>
                  <span className="text-[5.5px] text-zinc-400 uppercase">
                    OFFICIEL
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">Sceau d&apos;authenticité ZAP</p>
                  <p className="text-[11px] text-zinc-500">Nom de l&apos;entreprise · Ville · Réf. légale</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300">
                <DocumentCheckIcon className="w-3.5 h-3.5 text-zinc-300" />
                <span>Prêt à l&apos;emploi</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Signature Tactile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                <PencilSquareIcon className="w-5 h-5 text-white" />
              </div>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Signature Tactile
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Faites signer votre client directement au doigt sur l&apos;écran de votre smartphone avant de commencer les travaux.
              </p>
            </div>

            {/* Signature stroke simulation */}
            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="h-16 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center relative px-4">
                <svg className="w-full h-8 text-zinc-400 opacity-75" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M10 25 C30 10, 45 35, 70 20 C95 5, 110 38, 140 15 C160 30, 180 10, 190 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute bottom-1 right-2 text-[10px] text-zinc-500 font-mono">
                  Signé par le client
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Partage WhatsApp Direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                <PaperAirplaneIcon className="w-5 h-5 text-white" />
              </div>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Partage WhatsApp Direct
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Téléchargez le document PDF haute résolution ou partagez-le en un clic via WhatsApp à votre client. Aucune impression requise.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-200">
                    PDF
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-200">Devis-2024-0087.pdf</p>
                    <p className="text-[10px] text-zinc-500">Prêt à l&apos;envoi</p>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-300 font-medium">1-Clic</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Acomptes & Solde Automatique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                <CalculatorIcon className="w-5 h-5 text-white" />
              </div>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Acomptes &amp; Solde
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Renseignez l&apos;avance reçue pour vos fournitures. Le montant restant dû est automatiquement calculé et affiché en toute transparence.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Total prestation :</span>
                <span className="text-zinc-200 font-medium">50 000 FCFA</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Acompte encaissé :</span>
                <span className="text-zinc-300 font-medium">- 30 000 FCFA</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-white pt-1.5 border-t border-white/10">
                <span>Reste à payer :</span>
                <span>20 000 FCFA</span>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Catalogue Réutilisable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl p-7 flex flex-col justify-between transition-all duration-200"
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                <RectangleStackIcon className="w-5 h-5 text-white" />
              </div>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                Catalogue de Prestations
              </h3>

              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Sauvegardez vos prestations fréquentes pour remplir vos prochains devis en 3 clics, sans tout retaper.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap gap-1.5">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-300">
                Diagnostic auto
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-300">
                Confection robe
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-300">
                Pose de serrure
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-zinc-300">
                Main-d&apos;œuvre
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
