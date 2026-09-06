"use client";

import { motion } from "framer-motion";
import {
  DocumentTextIcon,
  DocumentCheckIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";

const documents = [
  {
    title: "Devis",
    description: "Préparer et présenter vos prestations clairement.",
    icon: DocumentTextIcon,
  },
  {
    title: "Factures",
    description: "Formaliser ce qui doit être payé avec un document propre.",
    icon: DocumentCheckIcon,
  },
  {
    title: "Reçus",
    description: "Confirmer simplement qu'un paiement a bien été effectué.",
    icon: ReceiptRefundIcon,
  },
];

export default function DocumentsSimple() {
  return (
    <section
      id="produit"
      style={{
        background: "#000000",
        padding: "96px 24px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            Tous vos documents, simplement.
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
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Retrouvez l&apos;essentiel pour votre activité : devis, factures et
            reçus, réunis au même endroit.
          </motion.p>
        </div>

        {/* 3 Simple Blocks (No photo, no BorderGlow) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {documents.map((doc, i) => {
            const Icon = doc.icon;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                style={{
                  background: "#171717",
                  border: "1px solid #262626",
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(212, 175, 55, 0.08)",
                    border: "1px solid rgba(212, 175, 55, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    style={{
                      width: "22px",
                      height: "22px",
                      color: "#D4AF37",
                    }}
                  />
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "20px",
                    color: "#F4F4F5",
                    margin: "0",
                  }}
                >
                  {doc.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(244, 244, 245, 0.65)",
                    lineHeight: 1.55,
                    margin: "0",
                  }}
                >
                  {doc.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
