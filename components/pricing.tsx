"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

function BorderGlowCard({
  children,
  featured = false,
}: {
  children: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "#121215",
        border: featured
          ? "1px solid rgba(255, 255, 255, 0.35)"
          : "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.2s ease",
        boxShadow: featured ? "0 0 35px rgba(255, 255, 255, 0.05)" : "none",
      }}
      className="hover:border-zinc-500"
    >
      {/* Featured Top Highlight Bar */}
      {featured && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

type Plan = {
  key: string;
  name: string;
  badge?: string;
  featured: boolean;
  monthly: { amount: string; suffix: string };
  annual: { amount: string; suffix: string };
  description: string;
  ctaLabel: string;
  features: string[];
  footnote?: string;
};

const plans: Plan[] = [
  {
    key: "free",
    name: "Gratuit",
    featured: false,
    monthly: { amount: "0 FCFA", suffix: "/pour toujours" },
    annual: { amount: "0 FCFA", suffix: "/pour toujours" },
    description: "8 documents pour démarrer et tester ZAP sans engagement.",
    ctaLabel: "Commencer gratuitement",
    features: [
      "8 documents gratuits pour démarrer",
      "Cachet numérique d'atelier",
      "Signature manuscrite tactile",
      "Export PDF haute définition",
      "Partage direct WhatsApp en 1 clic",
    ],
  },
  {
    key: "standard",
    name: "Standard",
    badge: "Recommandé",
    featured: true,
    monthly: { amount: "3 000 FCFA", suffix: "/mois" },
    annual: { amount: "27 000 FCFA", suffix: "/an (~2 250 F/mois)" },
    description: "40 documents par mois, pour formaliser votre activité au quotidien.",
    ctaLabel: "Choisir Standard",
    features: [
      "40 documents par mois",
      "Modèles personnalisés sauvegardés",
      "Gestion d'acompte & calcul du solde",
      "Catalogue d'atelier multi-métiers",
      "Duplication 1-clic d'un document existant",
    ],
    footnote: "Besoin de plus ce mois-ci ? +20 documents pour 2 000 FCFA, sans changer de formule.",
  },
  {
    key: "pro",
    name: "Pro",
    featured: false,
    monthly: { amount: "6 000 FCFA", suffix: "/mois" },
    annual: { amount: "54 000 FCFA", suffix: "/an (~4 500 F/mois)" },
    description: "Documents illimités, pour les ateliers et entreprises à fort volume.",
    ctaLabel: "Passer à Pro",
    features: [
      "Documents illimités, sans compter",
      "Registre des ventes & trésorerie complète",
      "Catégories personnalisées illimitées",
      "Cachet & signature réutilisables à l'infini",
      "Support prioritaire",
    ],
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      style={{
        background: "#09090B",
        padding: "96px 24px",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div style={{ maxWidth: "980px", margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#FFFFFF",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Tarifs clairs, sans surprise.
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
              color: "#A1A1AA",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            Démarrez gratuitement et passez à la vitesse supérieure quand votre activité grandit.
          </motion.p>
        </div>

        {/* Switch: Mensuel / Annuel */}
        <div className="flex items-center justify-center gap-3.5 mb-12">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: !isAnnual ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
            onClick={() => setIsAnnual(false)}
          >
            Mensuel
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: "48px",
              height: "26px",
              background: "#171717",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "100px",
              position: "relative",
              cursor: "pointer",
              padding: "2px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <motion.div
              animate={{ x: isAnnual ? 22 : 2 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#FFFFFF",
              }}
            />
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsAnnual(true)}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: isAnnual ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)",
                transition: "color 0.2s ease",
              }}
            >
              Annuel
            </span>

            <AnimatePresence>
              {isAnnual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85, x: -4 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -4 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 500,
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "2px 8px",
                    borderRadius: "100px",
                  }}
                >
                  Économisez ~25%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.annual : plan.monthly;
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BorderGlowCard featured={plan.featured}>
                  <div className="flex justify-between items-center mb-3.5">
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: plan.featured ? 600 : 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: plan.featured ? "#FFFFFF" : "rgba(255, 255, 255, 0.45)",
                        margin: 0,
                      }}
                    >
                      {plan.name}
                    </p>
                    {plan.badge && (
                      <span
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.25)",
                          color: "#FFFFFF",
                          fontSize: "10px",
                          fontWeight: 500,
                          fontFamily: "'DM Sans', sans-serif",
                          padding: "2px 8px",
                          borderRadius: "100px",
                        }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      height: "48px",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      marginBottom: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isAnnual ? `${plan.key}-annual` : `${plan.key}-monthly`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-baseline gap-2"
                      >
                        <span
                          style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: "36px",
                            color: "#FFFFFF",
                            lineHeight: 1,
                          }}
                        >
                          {price.amount}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            color: "rgba(255, 255, 255, 0.45)",
                          }}
                        >
                          {price.suffix}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      fontWeight: 300,
                      color: "rgba(255, 255, 255, 0.6)",
                      lineHeight: 1.5,
                      margin: "0 0 24px",
                      minHeight: "42px",
                    }}
                  >
                    {plan.description}
                  </p>

                  <Link
                    href="/login?tab=register"
                    className="transition-transform hover:scale-[1.02]"
                    style={{
                      display: "block",
                      textAlign: "center",
                      background: plan.featured ? "#FFFFFF" : "rgba(255, 255, 255, 0.05)",
                      border: plan.featured ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                      color: plan.featured ? "#000000" : "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: plan.featured ? 600 : 500,
                      padding: "12px",
                      borderRadius: "10px",
                      textDecoration: "none",
                      marginBottom: "28px",
                      boxShadow: plan.featured ? "0 0 25px rgba(255, 255, 255, 0.15)" : "none",
                    }}
                  >
                    {plan.ctaLabel}
                  </Link>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {plan.features.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px]">
                        <CheckIcon style={{ width: 16, height: 16, color: "#FFFFFF", flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255, 255, 255, 0.75)" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.footnote && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.45)",
                        lineHeight: 1.5,
                        marginTop: "20px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {plan.footnote}
                    </p>
                  )}
                </BorderGlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
