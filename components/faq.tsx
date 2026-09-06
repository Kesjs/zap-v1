"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    id: "create-doc",
    question: "Comment créer un document ?",
    answer:
      "Sélectionnez le type de document souhaité (devis, facture ou reçu), renseignez les prestations et montants, puis validez. Votre document est prêt en moins de 60 secondes avec vos coordonnées complètes.",
  },
  {
    id: "signature",
    question: "Comment fonctionne la signature ?",
    answer:
      "Vous signez une seule fois du doigt directement sur l'écran tactile de votre smartphone ou tablette. ZAP enregistre votre tracé de façon sécurisée et l'appose automatiquement sur chacun de vos documents.",
  },
  {
    id: "cachet",
    question: "Comment ajouter mon cachet/tampon ?",
    answer:
      "Prenez simplement en photo votre cachet physique réel avec votre téléphone. Notre studio numérique détoure l'empreinte et crée un tampon officiel net et fidèle qui est estampillé sur vos factures.",
  },
  {
    id: "pdf-download",
    question: "Puis-je télécharger mon document en PDF ?",
    answer:
      "Absolument. Chaque document généré est disponible immédiatement au format PDF haute résolution, prêt à être imprimé, archivé ou partagé directement à votre client par WhatsApp ou email.",
  },
  {
    id: "free-tier",
    question: "Combien de documents puis-je créer gratuitement ?",
    answer:
      "L'offre Gratuite vous offre 8 documents complets pour tester l'application sans carte bancaire et sans aucun engagement. Vous disposez de toutes les fonctions essentielles dès l'inscription.",
  },
  {
    id: "pro-offer",
    question: "Que comprend l'offre Pro ?",
    answer:
      "L'abonnement Pro comprend 80 documents par mois (ou 120 documents/mois en facturation annuelle), le cachet et la signature réutilisables à l'infini, l'historique complet et un support prioritaire WhatsApp 7j/7.",
  },
  {
    id: "offline-usage",
    question: "Puis-je utiliser ZAP sans connexion internet ?",
    answer:
      "La création et la synchronisation nécessitent une connexion de données. Vos documents générés restent cependant consultables dans votre historique local et prêts pour vos rendez-vous clients.",
  },
  {
    id: "payment-methods",
    question: "Quels moyens de paiement sont acceptés pour l'abonnement ?",
    answer:
      "ZAP intègre les moyens de paiement mobile les plus populaires en Afrique de l'Ouest : Wave, Orange Money, MTN MoMo et Moov Money. Aucune carte bancaire internationale n'est requise.",
  },
];

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("create-doc");

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
