"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Entre ton site",
    description: "Une URL suffit. On lance une analyse réelle : pages, offres, positionnement, secteur.",
  },
  {
    step: "02",
    title: "Confirme le résumé",
    description: "Reflet te propose un résumé de ton activité et une première liste de requêtes suivies, modifiables avant de lancer quoi que ce soit.",
  },
  {
    step: "03",
    title: "Vois ta visibilité",
    description:
      "ChatGPT est interrogé sur tes requêtes suivies. Tu obtiens un score, des preuves cliquables et des opportunités priorisées.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(28px, 4vw, 38px)",
              color: "#F4F4F5",
              lineHeight: 1.2,
              marginBottom: "14px",
            }}
          >
            De ton URL à ton score de visibilité, en quelques minutes.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "rgba(244, 244, 245, 0.65)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Trois étapes, aucune supposition — chaque résultat s&apos;appuie sur
            une analyse réelle de ton site et des réponses IA effectivement mesurées.
          </motion.p>
        </div>

        {/* 3 Step Blocks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: "14px",
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "24px",
                  color: "#FFFFFF",
                  opacity: 0.8,
                }}
              >
                {item.step}
              </span>

              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "21px",
                  color: "#F4F4F5",
                  margin: 0,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "rgba(244, 244, 245, 0.65)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
