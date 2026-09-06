"use client";

import { motion } from "framer-motion";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function PdfReady() {
  return (
    <section
      style={{
        background: "#000000",
        padding: "80px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Centered Document / PDF Icon with Gold Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "relative",
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "rgba(212, 175, 55, 0.08)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 28px",
          }}
        >
          <DocumentArrowDownIcon
            style={{ width: 34, height: 34, color: "#D4AF37" }}
          />
        </motion.div>

        {/* Section H2 */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 38px)",
            color: "#F4F4F5",
            lineHeight: 1.2,
            marginBottom: "14px",
          }}
        >
          Prêt à être envoyé.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(244, 244, 245, 0.65)",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.65,
          }}
        >
          Chaque document peut être obtenu au format PDF, prêt à conserver,
          imprimer ou transmettre à votre client.
        </motion.p>
      </div>
    </section>
  );
}
