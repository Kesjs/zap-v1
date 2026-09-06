"use client";

import { motion } from "framer-motion";
import {
  Squares2X2Icon,
  BanknotesIcon,
  ArrowPathIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

// ─── Precision Card Component (identique à Signature/Cachet) ───────────────
function BorderGlowCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        background: "#171717",
        border: "1px solid #262626",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
        ...style,
      }}
      className="hover:border-neutral-700"
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Mockup 1 : Catalogue — items enregistrés réutilisés en 1 clic ─────────
const CATALOG_SAMPLE = [
  { label: "Vidange moteur synthétique 5W40", price: "15 000 FCFA" },
  { label: "Pose de tissage", price: "8 000 FCFA" },
  { label: "Confection tenue Bazin riche brodé", price: "65 000 FCFA" },
];

function CatalogMockup() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        aspectRatio: "16/10",
        background: "#000000",
        border: "1px solid #262626",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          color: "rgba(244,244,245,0.40)",
          margin: "0 0 4px 0",
        }}
      >
        Mes prestations enregistrées
      </p>

      {CATALOG_SAMPLE.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "8px",
            padding: "9px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244,244,245,0.85)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "62%",
            }}
          >
            {item.label}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(244,244,245,0.55)",
              }}
            >
              {item.price}
            </span>
            <PlusCircleIcon style={{ width: 16, height: 16, color: "#D4AF37" }} />
          </div>
        </motion.div>
      ))}

      {/* Legend pill */}
      <div
        style={{
          marginTop: "auto",
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(12,12,12,0.85)",
          border: "1px solid #262626",
          borderRadius: "100px",
          padding: "3px 12px",
        }}
      >
        <ArrowPathIcon style={{ width: 12, height: 12, color: "rgba(244,244,245,0.5)" }} />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: "rgba(244, 244, 245, 0.60)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Ajouté à un document en un clic
        </p>
      </div>
    </div>
  );
}

// ─── Mockup 2 : Registre & trésorerie — dashboard des encaissements ────────
const SALES_SAMPLE = [
  { client: "Client Awa T.", amount: "28 000 FCFA", status: "Payé" },
  { client: "Client Moussa D.", amount: "75 000 FCFA", status: "Payé" },
  { client: "Client Fatou K.", amount: "145 000 FCFA", status: "En attente" },
];

function RegistryMockup() {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        aspectRatio: "16/10",
        background: "#000000",
        border: "1px solid #262626",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Total encaissé */}
      <div
        style={{
          background: "rgba(212,175,55,0.06)",
          border: "1px solid rgba(212,175,55,0.25)",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "2px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "10px",
            color: "rgba(244,244,245,0.45)",
            margin: "0 0 2px 0",
          }}
        >
          Total encaissé ce mois
        </p>
        <p
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "18px",
            color: "#D4AF37",
            margin: 0,
          }}
        >
          103 000 FCFA
        </p>
      </div>

      {SALES_SAMPLE.map((sale, i) => (
        <motion.div
          key={sale.client}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(244,244,245,0.85)",
            }}
          >
            {sale.client}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                color: sale.status === "Payé" ? "#4ADE80" : "rgba(244,244,245,0.45)",
                border: `1px solid ${sale.status === "Payé" ? "rgba(74,222,128,0.3)" : "#262626"}`,
                borderRadius: "100px",
                padding: "2px 8px",
                whiteSpace: "nowrap",
              }}
            >
              {sale.status}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(244,244,245,0.55)",
                minWidth: "70px",
                textAlign: "right",
              }}
            >
              {sale.amount}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Section : Catalogue & Trésorerie ──────────────────────────────────
export default function CatalogRegistry() {
  return (
    <section
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
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(30px, 4.5vw, 40px)",
              color: "#F4F4F5",
              lineHeight: 1.15,
              marginBottom: "14px",
            }}
          >
            Votre atelier, organisé.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
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
            Vos prestations et vos ventes, toujours à portée de main.
          </motion.p>
        </div>

        {/* 2 Blocks with BorderGlow */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Block 1: Catalogue multi-métiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <BorderGlowCard style={{ padding: "28px" }}>
              <div style={{ marginBottom: "24px" }}>
                <CatalogMockup />
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <Squares2X2Icon style={{ width: 22, height: 22, color: "#D4AF37" }} />
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#F4F4F5",
                    margin: 0,
                  }}
                >
                  Catalogue multi-métiers
                </h3>
              </div>

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
                Enregistrez vos prestations une fois et réutilisez-les en un clic dans un
                nouveau document, au lieu de tout retaper à chaque fois.
              </p>
            </BorderGlowCard>
          </motion.div>

          {/* Block 2: Registre & trésorerie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <BorderGlowCard style={{ padding: "28px" }}>
              <div style={{ marginBottom: "24px" }}>
                <RegistryMockup />
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <BanknotesIcon style={{ width: 22, height: 22, color: "#D4AF37" }} />
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    color: "#F4F4F5",
                    margin: 0,
                  }}
                >
                  Registre &amp; trésorerie
                </h3>
              </div>

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
                Suivez vos ventes et vos encaissements en un coup d&apos;œil : combien
                vous avez vendu ce mois-ci, et ce qui reste à encaisser.
              </p>
            </BorderGlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
