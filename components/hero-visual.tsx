"use client";

import { motion } from "framer-motion";

const lineItems = [
  { label: "Vidange moteur + filtre", amount: "8 500 FCFA" },
  { label: "Remplacement plaquettes de frein", amount: "12 000 FCFA" },
  { label: "Main-d'œuvre diagnostics", amount: "7 500 FCFA" },
];

const penPath = [
  { left: "6%", top: "67%" },
  { left: "19%", top: "29%" },
  { left: "34%", top: "50%" },
  { left: "47%", top: "71%" },
  { left: "59%", top: "38%" },
  { left: "69%", top: "75%" },
  { left: "91%", top: "42%" },
];

export default function HeroVisualDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full max-w-[620px] mx-auto mt-14"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E1D8",
        borderTop: "3px solid #1C2B45",
        borderRadius: "16px",
        padding: "28px 24px",
        textAlign: "left",
        boxShadow: "0 24px 60px rgba(28,43,69,0.16)",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-start justify-between pb-5 border-b"
        style={{ borderColor: "#E5E1D8" }}
      >
        <div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#1A1A1A" }}>
            Atelier Koffi &amp; Fils
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(26,26,26,0.5)", marginTop: "3px" }}>
            Reçu · RF-2024-0087
          </p>
        </div>
        <span
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            color: "#16a34a",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "100px",
          }}
        >
          Réglé
        </span>
      </motion.div>

      <div className="flex flex-col gap-3 py-5 border-b" style={{ borderColor: "#E5E1D8" }}>
        {lineItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.7 + index * 0.35, ease: "easeInOut" }}
            className="flex justify-between items-center text-[13.5px]"
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(26,26,26,0.75)" }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#1A1A1A", fontWeight: 500 }}>
              {item.amount}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.9 }}
        className="flex justify-between items-center py-4 border-b"
        style={{ borderColor: "#E5E1D8" }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(26,26,26,0.6)" }}>
          Total encaissé
        </span>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#B8860B" }}>
          28 000 FCFA
        </span>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 pt-5 items-center">
        <div
          style={{
            position: "relative",
            background: "rgba(0,0,0,0.02)",
            border: "1px dashed #D8D2C4",
            borderRadius: "10px",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "84px",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "36px" }}>
            <svg
              viewBox="0 0 160 48"
              className="w-full h-9"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <motion.path
                d="M10,32 Q35,8 55,24 T95,18 Q120,40 145,20"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 2.3, ease: "easeInOut" }}
              />
            </svg>

            <motion.div
              initial={{ opacity: 0, left: penPath[0].left, top: penPath[0].top }}
              whileInView={{
                opacity: [0, 1, 1, 1, 1, 1, 0],
                left: penPath.map((p) => p.left),
                top: penPath.map((p) => p.top),
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 2.3, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "10px",
                height: "10px",
                marginLeft: "-2px",
                marginTop: "-8px",
                pointerEvents: "none",
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" style={{ transform: "rotate(-45deg)" }}>
                <path d="M2 22l3-8 12-12 5 5-12 12-8 3z" fill="#1A1A1A" />
                <path d="M14 5l5 5" stroke="#D4AF37" strokeWidth="1.5" />
              </svg>
            </motion.div>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10.5px", color: "rgba(26,26,26,0.4)", marginTop: "4px" }}>
            Signature client
          </span>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1.3, opacity: [0, 0.35, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 3.35, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            initial={{ y: -60, scale: 1.15, opacity: 0, rotate: -18 }}
            whileInView={{ y: 0, scale: 1, opacity: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 3.3, type: "spring", stiffness: 260, damping: 14 }}
            style={{
              width: "74px",
              height: "74px",
              border: "2px solid #D4AF37",
              borderRadius: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(212, 175, 55, 0.1)",
            }}
          >
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "8.5px", color: "#B8860B", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Atelier Koffi
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "7px", color: "rgba(184,134,11,0.8)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "1px" }}>
              ★ Certifié ★
            </span>
          </motion.div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10.5px", color: "rgba(26,26,26,0.4)", marginTop: "6px" }}>
            Cachet officiel
          </span>
        </div>
      </div>
    </motion.div>
  );
}
