"use client";

import React from "react";
import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { DocumentData, computeTotals, formatFcfa } from "@/lib/document-types";

// Polices cohérentes avec le design system ZAP (DM Serif Display / DM Sans).
// Chargées depuis Google Fonts côté navigateur au moment du rendu du PDF.
try {
  Font.register({
    family: "DM Serif Display",
    src: "https://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0ITb.ttf",
  });
  Font.register({
    family: "DM Sans",
    fonts: [
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAo1qgFYRO.ttf", fontWeight: 400 },
      { src: "https://fonts.gstatic.com/s/dmsans/v15/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9J0cwvo0wAo1qgFYRO.ttf", fontWeight: 700 },
    ],
  });
} catch {
  // ignore si déjà enregistré (hot-reload dev)
}

const GOLD = "#B8912B"; // légèrement assombri par rapport à #D4AF37 pour rester lisible imprimé sur blanc
const INK = "#171717";
const MUTED = "#6B6B6B";
const BORDER = "#E4E1D8";

const styles = StyleSheet.create({
  page: {
    fontFamily: "DM Sans",
    fontSize: 9.5,
    color: INK,
    padding: 36,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottom: `1.5px solid ${GOLD}`,
  },
  companyName: {
    fontFamily: "DM Serif Display",
    fontSize: 20,
    color: INK,
    marginBottom: 3,
  },
  companyMeta: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.5,
  },
  docTypeBadge: {
    fontFamily: "DM Serif Display",
    fontSize: 16,
    color: GOLD,
    textAlign: "right",
    marginBottom: 3,
  },
  docNumber: {
    fontSize: 9,
    color: MUTED,
    textAlign: "right",
  },
  sectionTitle: {
    fontFamily: "DM Serif Display",
    fontSize: 11,
    color: INK,
    marginBottom: 6,
    marginTop: 14,
  },
  clientBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FAF8F2",
    borderRadius: 6,
    padding: 10,
    marginBottom: 4,
  },
  clientCol: { maxWidth: "48%" },
  label: { fontSize: 8, color: MUTED, marginBottom: 2 },
  value: { fontSize: 9.5, color: INK, fontWeight: 700 },
  table: {
    marginTop: 4,
    borderTop: `1px solid ${BORDER}`,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#F4F1E8",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottom: `1px solid ${BORDER}`,
  },
  colLabel: { flex: 3.4 },
  colUnit: { flex: 0.9, textAlign: "center" },
  colQty: { flex: 0.7, textAlign: "center" },
  colPrice: { flex: 1.3, textAlign: "right" },
  colTotal: { flex: 1.3, textAlign: "right" },
  th: { fontSize: 7.5, color: MUTED, fontWeight: 700, textTransform: "uppercase" },
  itemLabel: { fontSize: 9.5, color: INK, fontWeight: 700 },
  itemDesc: { fontSize: 8, color: MUTED, marginTop: 1.5 },
  cellText: { fontSize: 9, color: INK },
  totalsBox: {
    marginTop: 14,
    alignSelf: "flex-end",
    width: 220,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalsLabel: { fontSize: 9, color: MUTED },
  totalsValue: { fontSize: 9, color: INK, fontWeight: 700 },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    marginTop: 4,
    borderTop: `1.5px solid ${GOLD}`,
  },
  grandTotalLabel: { fontFamily: "DM Serif Display", fontSize: 12, color: INK },
  grandTotalValue: { fontFamily: "DM Serif Display", fontSize: 12, color: GOLD },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FAF3E3",
    borderRadius: 4,
    padding: 6,
    marginTop: 6,
  },
  legalBox: {
    marginTop: 22,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#F7F7F5",
  },
  legalText: { fontSize: 7.5, color: MUTED, lineHeight: 1.4 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signBlock: {
    width: 150,
    borderTop: `1px solid ${BORDER}`,
    paddingTop: 6,
    textAlign: "center",
  },
  signLabel: { fontSize: 7.5, color: MUTED },
  stampCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    border: `2px solid ${GOLD}`,
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(-8deg)",
  },
  stampText: {
    fontFamily: "DM Serif Display",
    fontSize: 7,
    color: GOLD,
    textAlign: "center",
  },
  pageFooter: {
    position: "absolute",
    bottom: 20,
    left: 36,
    right: 36,
    fontSize: 7,
    color: MUTED,
    textAlign: "center",
    borderTop: `0.5px solid ${BORDER}`,
    paddingTop: 6,
  },
});

interface InvoicePdfProps {
  data: DocumentData;
}

/**
 * Gabarit PDF format A4/A5 — utilisé pour Facture officielle & Devis proforma.
 * Pensé pour être imprimable sur n'importe quel format de papier (A4 par défaut,
 * adaptable en A5) : mise en page vectorielle, aucune dépendance à la capture d'écran.
 */
export default function InvoicePdf({ data }: InvoicePdfProps) {
  const { total, effectiveDeposit, remainingBalance } = computeTotals(
    data.items,
    data.depositAmount,
    data.hasDeposit
  );

  const typeLabel = data.type === "facture" ? "Facture" : "Devis Proforma";

  return (
    <Document title={`${typeLabel} ${data.number}`}>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.companyName}>{data.company.name}</Text>
            <Text style={styles.companyMeta}>{data.company.city}</Text>
            <Text style={styles.companyMeta}>
              IFU {data.company.ifu} · RCCM {data.company.rccm}
            </Text>
            <Text style={styles.companyMeta}>WhatsApp : {data.company.whatsapp}</Text>
          </View>
          <View>
            <Text style={styles.docTypeBadge}>{typeLabel}</Text>
            <Text style={styles.docNumber}>N° {data.number}</Text>
            <Text style={styles.docNumber}>
              Émis le {new Date(data.issueDate).toLocaleDateString("fr-FR")}
            </Text>
          </View>
        </View>

        {/* Client */}
        <View style={styles.clientBox}>
          <View style={styles.clientCol}>
            <Text style={styles.label}>Client / Entreprise</Text>
            <Text style={styles.value}>{data.clientName}</Text>
            {data.clientPhone ? (
              <Text style={[styles.companyMeta, { marginTop: 2 }]}>{data.clientPhone}</Text>
            ) : null}
          </View>
          <View style={styles.clientCol}>
            <Text style={styles.label}>Validité / Échéance</Text>
            <Text style={styles.value}>{data.validity}</Text>
          </View>
        </View>

        {/* Lignes */}
        <Text style={styles.sectionTitle}>Prestations & Produits</Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.th, styles.colLabel]}>Désignation</Text>
            <Text style={[styles.th, styles.colUnit]}>Unité</Text>
            <Text style={[styles.th, styles.colQty]}>Qté</Text>
            <Text style={[styles.th, styles.colPrice]}>P.U.</Text>
            <Text style={[styles.th, styles.colTotal]}>Total</Text>
          </View>

          {data.items.map((item) => (
            <View key={item.id} style={styles.tableRow} wrap={false}>
              <View style={styles.colLabel}>
                <Text style={styles.itemLabel}>{item.label}</Text>
                {item.description ? <Text style={styles.itemDesc}>{item.description}</Text> : null}
              </View>
              <Text style={[styles.cellText, styles.colUnit]}>{item.unit ?? "—"}</Text>
              <Text style={[styles.cellText, styles.colQty]}>{item.qty}</Text>
              <Text style={[styles.cellText, styles.colPrice]}>
                {item.unitPrice.toLocaleString("fr-FR")}
              </Text>
              <Text style={[styles.cellText, styles.colTotal, { fontWeight: 700 }]}>
                {(item.qty * item.unitPrice - (item.discount ?? 0)).toLocaleString("fr-FR")}
              </Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totalsBox}>
          {data.hasDeposit && (
            <>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Montant total</Text>
                <Text style={styles.totalsValue}>{formatFcfa(total)}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Acompte perçu</Text>
                <Text style={[styles.totalsValue, { color: "#3F7A5C" }]}>
                  - {formatFcfa(effectiveDeposit)}
                </Text>
              </View>
            </>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>
              {data.hasDeposit ? "Reste dû" : "Total net"}
            </Text>
            <Text style={styles.grandTotalValue}>
              {formatFcfa(data.hasDeposit ? remainingBalance : total)}
            </Text>
          </View>
        </View>

        {/* Règlement */}
        <Text style={styles.sectionTitle}>Modalités de règlement</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.cellText}>
            Paiement via {data.paymentProvider} — {data.paymentPhone}
          </Text>
        </View>

        {/* Mentions légales */}
        <View style={styles.legalBox}>
          <Text style={styles.legalText}>{data.company.legalMention}</Text>
        </View>

        {/* Signature & tampon */}
        <View style={styles.footerRow}>
          <View style={styles.signBlock}>
            <Text style={styles.signLabel}>
              {data.includeSignature ? "Signature certifiée de l'atelier" : "Signature"}
            </Text>
          </View>

          {data.includeStamp && (
            <View style={styles.stampCircle}>
              <Text style={styles.stampText}>ZAP{"\n"}CERTIFIÉ</Text>
            </View>
          )}
        </View>

        <Text style={styles.pageFooter}>
          Document généré via ZAP — conforme aux normes OHADA / UEMOA. {data.company.name}, {data.company.city}.
        </Text>
      </Page>
    </Document>
  );
}
