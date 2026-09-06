"use client";

import React from "react";
import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";
import { DocumentData, computeTotals, formatFcfa } from "@/lib/document-types";

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
  // ignore si déjà enregistré
}

const INK = "#171717";
const MUTED = "#666666";
const GOLD = "#B8912B";

// Format ticket ~80mm de large (norme imprimante thermique de caisse), hauteur libre.
const TICKET_WIDTH = 227; // ~80mm en points (72pt = 1 inch, 80mm ≈ 3.15in ≈ 227pt)

const styles = StyleSheet.create({
  page: {
    fontFamily: "DM Sans",
    fontSize: 8,
    color: INK,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  center: { textAlign: "center" },
  brand: {
    fontFamily: "DM Serif Display",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 2,
  },
  meta: { fontSize: 7, color: MUTED, textAlign: "center", lineHeight: 1.4 },
  dashedLine: {
    borderBottom: "1px dashed #B8B8B8",
    marginVertical: 8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  label: { fontSize: 7.5, color: MUTED },
  value: { fontSize: 7.5, color: INK, fontWeight: 700 },
  itemRow: { marginBottom: 6 },
  itemLabel: { fontSize: 8, color: INK, fontWeight: 700 },
  itemDetail: { flexDirection: "row", justifyContent: "space-between", marginTop: 1 },
  itemQty: { fontSize: 7.5, color: MUTED },
  itemAmount: { fontSize: 8, color: INK, fontWeight: 700 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  totalLabel: { fontFamily: "DM Serif Display", fontSize: 10 },
  totalValue: { fontFamily: "DM Serif Display", fontSize: 10, color: GOLD },
  stampWrap: { alignItems: "center", marginTop: 10 },
  stampCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    border: `1.5px solid ${GOLD}`,
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(-6deg)",
  },
  stampText: { fontFamily: "DM Serif Display", fontSize: 5.5, color: GOLD, textAlign: "center" },
  footerNote: { fontSize: 6.5, color: MUTED, textAlign: "center", marginTop: 10, lineHeight: 1.4 },
});

interface ReceiptPdfProps {
  data: DocumentData;
}

/**
 * Gabarit PDF format "ticket de caisse" étroit — remplace le carnet de reçus
 * papier pour le Reçu d'encaissement. Format compact, lisible sur imprimante
 * thermique 80mm ou en A4 (centré, marges blanches).
 */
export default function ReceiptPdf({ data }: ReceiptPdfProps) {
  const { total } = computeTotals(data.items, data.depositAmount, data.hasDeposit);

  return (
    <Document title={`Reçu ${data.number}`}>
      <Page size={[TICKET_WIDTH, 640]} style={styles.page}>
        <Text style={styles.brand}>{data.company.name}</Text>
        <Text style={styles.meta}>{data.company.city}</Text>
        <Text style={styles.meta}>IFU {data.company.ifu}</Text>
        <Text style={styles.meta}>{data.company.whatsapp}</Text>

        <View style={styles.dashedLine} />

        <Text style={[styles.center, { fontSize: 9, fontWeight: 700 }]}>REÇU D&apos;ENCAISSEMENT</Text>
        <Text style={[styles.meta, { marginTop: 2 }]}>N° {data.number}</Text>
        <Text style={styles.meta}>
          {new Date(data.issueDate).toLocaleDateString("fr-FR")} —{" "}
          {new Date(data.issueDate).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
        </Text>

        <View style={styles.dashedLine} />

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Client</Text>
        </View>
        <Text style={styles.value}>{data.clientName}</Text>

        <View style={styles.dashedLine} />

        {data.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemLabel}>{item.label}</Text>
            <View style={styles.itemDetail}>
              <Text style={styles.itemQty}>
                {item.qty} {item.unit ?? ""} × {item.unitPrice.toLocaleString("fr-FR")}
              </Text>
              <Text style={styles.itemAmount}>
                {(item.qty * item.unitPrice - (item.discount ?? 0)).toLocaleString("fr-FR")}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.dashedLine} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL PAYÉ</Text>
          <Text style={styles.totalValue}>{formatFcfa(total)}</Text>
        </View>

        <View style={{ marginTop: 6 }}>
          <Text style={styles.label}>Réglé via {data.paymentProvider}</Text>
          <Text style={styles.label}>{data.paymentPhone}</Text>
        </View>

        {data.includeStamp && (
          <View style={styles.stampWrap}>
            <View style={styles.stampCircle}>
              <Text style={styles.stampText}>ZAP{"\n"}CERTIFIÉ</Text>
            </View>
          </View>
        )}

        <Text style={styles.footerNote}>
          Reçu généré via ZAP — conforme aux usages OHADA/UEMOA.{"\n"}Merci de votre confiance.
        </Text>
      </Page>
    </Document>
  );
}
