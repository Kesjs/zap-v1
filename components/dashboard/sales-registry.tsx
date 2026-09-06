"use client";

import React, { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CheckBadgeIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  BanknotesIcon,
  ClockIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export interface DocumentItem {
  id: string;
  number: string;
  date: string;
  client: string;
  clientPhone?: string;
  type: "devis" | "facture" | "recu";
  amount: number;
  status: "paye" | "en_attente";
  items?: Array<{ label: string; qty: number; price: number }>;
}

const initialDocuments: DocumentItem[] = [
  {
    id: "1",
    number: "REC-2025-0042",
    date: "05/09/2025 · 11:30",
    client: "Koffi Mensah",
    clientPhone: "+229 97 00 11 22",
    type: "recu",
    amount: 28000,
    status: "paye",
  },
  {
    id: "2",
    number: "FAC-2025-0104",
    date: "04/09/2025 · 16:45",
    client: "Garage Central",
    clientPhone: "+229 96 44 33 22",
    type: "facture",
    amount: 75000,
    status: "en_attente",
  },
  {
    id: "3",
    number: "DEV-2025-0089",
    date: "03/09/2025 · 09:15",
    client: "Mme Tossou",
    clientPhone: "+229 95 12 34 56",
    type: "devis",
    amount: 145000,
    status: "en_attente",
  },
];

interface SalesRegistryProps {
  onCreateDocument: () => void;
  onDuplicateDocument?: (doc: DocumentItem) => void;
  onNavigateSettings?: () => void;
}

export default function SalesRegistry({
  onCreateDocument,
  onDuplicateDocument,
  onNavigateSettings,
}: SalesRegistryProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Onboarding checklist state
  const [showChecklist, setShowChecklist] = useState(true);

  // Encaisser modal state
  const [encaisserDoc, setEncaisserDoc] = useState<DocumentItem | null>(null);
  const [paymentMode, setPaymentMode] = useState<"Wave" | "MoMo" | "Cash">("Wave");
  const [encaissementAmount, setEncaissementAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Metrics calculation
  const totalEncaissed = useMemo(() => {
    return documents
      .filter((d) => d.status === "paye" || d.type === "recu")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [documents]);

  const totalPending = useMemo(() => {
    return documents
      .filter((d) => d.status === "en_attente" && d.type === "facture")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [documents]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.number.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = selectedType === "all" || doc.type === selectedType;
      const matchStatus = selectedStatus === "all" || doc.status === selectedStatus;
      return matchSearch && matchType && matchStatus;
    });
  }, [documents, searchTerm, selectedType, selectedStatus]);

  // Handle encaissement action
  const handleOpenEncaisser = (doc: DocumentItem) => {
    setEncaisserDoc(doc);
    setEncaissementAmount(doc.amount);
  };

  const handleConfirmEncaisser = () => {
    if (!encaisserDoc) return;
    setIsProcessing(true);

    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === encaisserDoc.id
            ? { ...d, type: "recu", status: "paye", number: d.number.replace("FAC", "REC") }
            : d
        )
      );
      setIsProcessing(false);
      setEncaisserDoc(null);
      setToastMessage("Reçu généré avec succès.");
      setTimeout(() => setToastMessage(null), 3000);
    }, 600);
  };

  const getTypeBadgeStyle = (type: DocumentItem["type"]) => {
    switch (type) {
      case "devis":
        return {
          bg: "rgba(214, 168, 92, 0.12)",
          border: "rgba(214, 168, 92, 0.28)",
          text: "#D6A85C",
          label: "DEVIS",
        };
      case "facture":
        return {
          bg: "rgba(127, 168, 201, 0.12)",
          border: "rgba(127, 168, 201, 0.28)",
          text: "#7FA8C9",
          label: "FACTURE",
        };
      case "recu":
        return {
          bg: "rgba(127, 191, 142, 0.12)",
          border: "rgba(127, 191, 142, 0.28)",
          text: "#7FBF8E",
          label: "REÇU",
        };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#171717",
            border: "1px solid #D4AF37",
            borderRadius: "12px",
            padding: "12px 20px",
            color: "#F4F4F5",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
          }}
        >
          <CheckBadgeIcon style={{ width: 18, height: 18, color: "#D4AF37" }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Onboarding Checklist */}
      {showChecklist && (
        <div
          style={{
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "16px",
            padding: "20px",
            position: "relative",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "18px",
                color: "#F4F4F5",
                margin: 0,
              }}
            >
              Bienvenue sur ZAP — Premières étapes
            </h3>
            <button
              type="button"
              onClick={() => setShowChecklist(false)}
              style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer" }}
            >
              <XMarkIcon style={{ width: 18, height: 18 }} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: "1. Profil entreprise", done: true, desc: "Coordonnées & RCCM" },
              { title: "2. Tampon & Signature", done: false, desc: "Ajouter dans Paramètres", action: onNavigateSettings },
              { title: "3. Créer un document", done: false, desc: "En moins de 60 secondes", action: onCreateDocument },
            ].map((step, i) => (
              <div
                key={step.title}
                onClick={step.action}
                style={{
                  background: "#000000",
                  border: "1px solid #262626",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  cursor: step.action ? "pointer" : "default",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: step.done ? "#7FBF8E" : "#F4F4F5",
                    }}
                  >
                    {step.title}
                  </span>
                  {step.done && <CheckBadgeIcon style={{ width: 16, height: 16, color: "#7FBF8E" }} />}
                </div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "#A1A1AA",
                  }}
                >
                  {step.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Total Encaissé */}
        <div
          style={{
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div className="flex items-center gap-2">
            <BanknotesIcon style={{ width: 18, height: 18, color: "#7FBF8E" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#A1A1AA",
                fontWeight: 500,
              }}
            >
              Total encaissé ce mois
            </span>
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              color: "#F4F4F5",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {totalEncaissed.toLocaleString("fr-FR")} FCFA
          </span>
        </div>

        {/* Card 2: En attente */}
        <div
          style={{
            background: "#171717",
            border: "1px solid #262626",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div className="flex items-center gap-2">
            <ClockIcon style={{ width: 18, height: 18, color: "#D6A85C" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#A1A1AA",
                fontWeight: 500,
              }}
            >
              Factures en attente d&apos;encaissement
            </span>
          </div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "32px",
              fontWeight: 500,
              color: "#D4AF37",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {totalPending.toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>

      {/* Action CTA & Search / Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            flex: "1 1 300px",
          }}
        >
          <MagnifyingGlassIcon
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "18px",
              height: "18px",
              color: "#A1A1AA",
            }}
          />
          <input
            type="text"
            placeholder="Rechercher par client ou N° de pièce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              height: "44px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "12px",
              padding: "0 14px 0 42px",
              color: "#F4F4F5",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              outline: "none",
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              height: "44px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "12px",
              padding: "0 14px",
              color: "#F4F4F5",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">Tous les types</option>
            <option value="recu">Reçus</option>
            <option value="facture">Factures</option>
            <option value="devis">Devis</option>
          </select>

          {/* Primary CTA (Sticky on Mobile) */}
          <button
            type="button"
            onClick={onCreateDocument}
            style={{
              height: "44px",
              background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
              border: "none",
              borderRadius: "12px",
              padding: "0 20px",
              color: "#000000",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <PlusIcon style={{ width: 18, height: 18 }} />
            <span>+ Créer un document</span>
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div
        className="hidden sm:block"
        style={{
          background: "#171717",
          border: "1px solid #262626",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #262626" }}>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500 }}>
                N° &amp; DATE
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500 }}>
                CLIENT
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500 }}>
                TYPE
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500, textAlign: "right" }}>
                MONTANT TOTAL
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "#A1A1AA", fontWeight: 500, textAlign: "right" }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => {
              const badge = getTypeBadgeStyle(doc.type);
              return (
                <tr key={doc.id} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "#F4F4F5", margin: 0, fontWeight: 500 }}>
                      {doc.number}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#A1A1AA", margin: "2px 0 0" }}>
                      {doc.date}
                    </p>
                  </td>

                  <td style={{ padding: "16px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F4F4F5" }}>
                    {doc.client}
                  </td>

                  <td style={{ padding: "16px 20px" }}>
                    <span
                      style={{
                        background: badge.bg,
                        border: `1px solid ${badge.border}`,
                        color: badge.text,
                        fontSize: "11px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "8px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {badge.label}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "16px 20px",
                      textAlign: "right",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14.5px",
                      color: "#F4F4F5",
                      fontWeight: 500,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {doc.amount.toLocaleString("fr-FR")} FCFA
                  </td>

                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div className="flex items-center justify-end gap-2">
                      {doc.type === "facture" && doc.status === "en_attente" && (
                        <button
                          type="button"
                          onClick={() => handleOpenEncaisser(doc)}
                          style={{
                            background: "rgba(212, 175, 55, 0.12)",
                            border: "1px solid rgba(212, 175, 55, 0.3)",
                            borderRadius: "8px",
                            padding: "6px 12px",
                            color: "#D4AF37",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          Encaisser
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onDuplicateDocument?.(doc)}
                        title="Dupliquer le document"
                        style={{
                          background: "transparent",
                          border: "1px solid #262626",
                          borderRadius: "8px",
                          padding: "6px 8px",
                          color: "#A1A1AA",
                          cursor: "pointer",
                        }}
                      >
                        <DocumentDuplicateIcon style={{ width: 16, height: 16 }} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View (<640px) */}
      <div className="sm:hidden flex flex-col gap-3">
        {filteredDocuments.map((doc) => {
          const badge = getTypeBadgeStyle(doc.type);
          return (
            <div
              key={doc.id}
              style={{
                background: "#171717",
                border: "1px solid #262626",
                borderRadius: "14px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    style={{
                      background: badge.bg,
                      border: `1px solid ${badge.border}`,
                      color: badge.text,
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "2px 6px",
                      borderRadius: "6px",
                    }}
                  >
                    {badge.label}
                  </span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#F4F4F5", fontWeight: 500, marginTop: "6px" }}>
                    {doc.client}
                  </p>
                </div>

                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#F4F4F5",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {doc.amount.toLocaleString("fr-FR")} F
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#A1A1AA" }}>
                  {doc.number} · {doc.date}
                </span>

                <div className="flex items-center gap-2">
                  {doc.type === "facture" && doc.status === "en_attente" && (
                    <button
                      type="button"
                      onClick={() => handleOpenEncaisser(doc)}
                      style={{
                        background: "#D4AF37",
                        color: "#000000",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      Encaisser
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onDuplicateDocument?.(doc)}
                    style={{
                      background: "transparent",
                      border: "1px solid #262626",
                      borderRadius: "8px",
                      padding: "6px",
                      color: "#A1A1AA",
                      cursor: "pointer",
                    }}
                  >
                    <DocumentDuplicateIcon style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encaisser Dialog */}
      {encaisserDoc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#171717",
              border: "1px solid #262626",
              borderRadius: "18px",
              padding: "24px",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "20px",
                  color: "#F4F4F5",
                  margin: 0,
                }}
              >
                Encaisser la facture
              </h3>
              <button
                type="button"
                onClick={() => setEncaisserDoc(null)}
                style={{ background: "none", border: "none", color: "#A1A1AA", cursor: "pointer" }}
              >
                <XMarkIcon style={{ width: 20, height: 20 }} />
              </button>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A1A1AA", marginBottom: "16px" }}>
              Client : <strong className="text-[#F4F4F5]">{encaisserDoc.client}</strong> ({encaisserDoc.number})
            </p>

            {/* Mode de règlement */}
            <div className="mb-4">
              <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                Mode de règlement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Wave", "MoMo", "Cash"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    style={{
                      height: "38px",
                      borderRadius: "10px",
                      background: paymentMode === mode ? "rgba(212, 175, 55, 0.15)" : "#000000",
                      border: paymentMode === mode ? "1.5px solid #D4AF37" : "1px solid #262626",
                      color: paymentMode === mode ? "#D4AF37" : "#F4F4F5",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Montant */}
            <div className="mb-6">
              <label style={{ display: "block", fontSize: "12px", color: "#A1A1AA", marginBottom: "6px" }}>
                Montant encaissé (FCFA)
              </label>
              <input
                type="number"
                value={encaissementAmount}
                onChange={(e) => setEncaissementAmount(Number(e.target.value))}
                style={{
                  width: "100%",
                  height: "44px",
                  background: "#000000",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  padding: "0 14px",
                  color: "#F4F4F5",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  outline: "none",
                }}
              />
            </div>

            {/* Validation Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEncaisserDoc(null)}
                style={{
                  flex: 1,
                  height: "44px",
                  background: "transparent",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  color: "#F4F4F5",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmEncaisser}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  height: "44px",
                  background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {isProcessing ? "Validation..." : "Valider le reçu"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
