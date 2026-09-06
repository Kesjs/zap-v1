"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

export default function FinalCta() {
  return (
    <section
      style={{
        background: "#09090B",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            background: "#121215",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "24px",
            padding: "64px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 44px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "16px",
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
              maxWidth: "480px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Devis, facture ou reçu certifié : émettez votre prochain document officiel en moins de deux minutes.
          </p>

          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.15 }}>
            <Link
              href="/login?tab=register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#000000",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14.5px",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "10px",
                textDecoration: "none",
                boxShadow: "0 0 35px rgba(255, 255, 255, 0.2)",
              }}
            >
              Commencer gratuitement
            </Link>
          </motion.div>

          <div className="flex items-center gap-1.5 mt-4 text-xs text-zinc-500">
            <ShieldCheckIcon className="w-4 h-4 text-zinc-400" />
            <span>8 documents offerts à l&apos;inscription · Zéro carte bancaire requise</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
