"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FinalCta() {
  return (
    <section
      style={{
        background: "#000000",
        padding: "80px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "20px",
            padding: "64px 32px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 42px)",
              color: "#F4F4F5",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Créez votre premier document.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 244, 245, 0.65)",
              maxWidth: "460px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Devis, facture ou reçu : votre prochain document commence ici.
          </p>

          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
            <Link
              href="/login?tab=register"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                color: "#0C0C0C",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14.5px",
                fontWeight: 500,
                padding: "13px 26px",
                borderRadius: "10px",
                textDecoration: "none",
              }}
            >
              Créer un document
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
