"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    id: "which-ai",
    question: "Quelles IA sont mesurées ?",
    answer:
      "ChatGPT en V1. C'est l'IA effectivement interrogée pour mesurer ta visibilité réelle — pas juste citée en exemple.",
  },
  {
    id: "gemini-role",
    question: "Pourquoi Gemini apparaît quelque part dans le produit ?",
    answer:
      "Gemini n'est jamais mesuré. Il sert uniquement, en coulisses, à comprendre ton site (secteur, offre, positionnement) au moment de l'onboarding — un composant interne, invisible pour toi.",
  },
  {
    id: "how-measured",
    question: "Comment le score est-il calculé ?",
    answer:
      "Chaque requête suivie est interrogée plusieurs fois (3 à 5 runs minimum), jamais une seule. Le résultat est une fréquence d'apparition mesurée, jamais un score binaire ou une estimation.",
  },
  {
    id: "opportunities",
    question: "Comment une opportunité est-elle validée ?",
    answer:
      "Une opportunité n'apparaît que si elle est confirmée sur plusieurs runs ET plusieurs requêtes liées au même sujet. Aucune recommandation n'est affichée sans preuve consultable.",
  },
  {
    id: "trial",
    question: "Comment fonctionne l'essai gratuit ?",
    answer:
      "7 jours, carte bancaire requise. 1,50€ sont prélevés à l'inscription pour valider la carte, puis 49€ facturés au jour 7 si tu ne résilies pas avant.",
  },
  {
    id: "queries-limit",
    question: "Combien de requêtes puis-je suivre ?",
    answer:
      "Jusqu'à 30 requêtes actives, analysées chaque semaine. Tu peux les modifier, en pauser ou en ajouter à tout moment depuis le dashboard.",
  },
  {
    id: "re-measure",
    question: "Après une modification de mon site, quand vois-je l'effet ?",
    answer:
      "Compte 2 à 3 semaines minimum avant qu'un signal de re-mesure soit jugé fiable — le temps que les moteurs IA reflètent le changement.",
  },
  {
    id: "free-scan",
    question: "Le scan gratuit engage-t-il à quelque chose ?",
    answer:
      "Non. Le scan public donne un premier aperçu sans création de compte ni carte bancaire. L'abonnement n'intervient qu'au moment où tu veux le suivi complet dans le temps.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("which-ai");

  return (
    <section
      id="faq"
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#F4F4F5",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Questions fréquentes
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
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Tout ce que vous devez savoir pour démarrer sereinement avec ZAP.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div style={{ borderTop: "1px solid #262626" }}>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderBottom: "1px solid #262626",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "22px 0",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                  }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "18px",
                      color: isOpen ? "#FFFFFF" : "#F4F4F5",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDownIcon
                      style={{
                        width: 20,
                        height: 20,
                        color: isOpen ? "#FFFFFF" : "rgba(244,244,245,0.45)",
                      }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14.5px",
                          fontWeight: 300,
                          color: "rgba(244, 244, 245, 0.65)",
                          lineHeight: 1.7,
                          paddingBottom: "22px",
                          margin: 0,
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
