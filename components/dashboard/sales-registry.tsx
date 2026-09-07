"use client";

import React, { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import CustomSelect, { SelectOption } from "@/components/ui/custom-select";
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
  TrashIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const supabase = createClient();

const DOC_TYPE_OPTIONS: SelectOption[] = [
  { value: "all", label: "Tous les types" },
  { value: "recu", label: "Reçus", badge: "REC" },
  { value: "facture", label: "Factures", badge: "FAC" },
  { value: "devis", label: "Devis", badge: "DEV" },
];

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

const initialDocuments: DocumentItem[] = [];

interface SalesRegistryProps {
  onCreateDocument: () => void;
  onDuplicateDocument?: (doc: DocumentItem) => void;
  onNavigateSettings?: () => void;
  onNavigateDocuments?: () => void;
  mode?: "home" | "documents";
}

export default function SalesRegistry({
  onCreateDocument,
  onDuplicateDocument,
  onNavigateSettings,
  onNavigateDocuments,
  mode = "documents",
}: SalesRegistryProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // 1. Fetch documents from Supabase Cloud + LocalStorage fallback
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: dbDocs, error } = await supabase
          .from("documents")
          .select("*, items:document_items(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && dbDocs && dbDocs.length > 0) {
          const mapped: DocumentItem[] = dbDocs.map((d: any) => ({
            id: d.id,
            number: d.number,
            date: new Date(d.created_at).toLocaleDateString("fr-FR") + " · " + new Date(d.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            client: d.client_name,
            clientPhone: d.client_phone || undefined,
            type: d.type === "invoice" ? "facture" : d.type === "quote" ? "devis" : "recu",
            amount: Number(d.total) || 0,
            status: d.status === "paid" ? "paye" : "en_attente",
            items: (d.items || []).map((it: any) => ({
              label: it.description,
              qty: Number(it.quantity) || 1,
              price: Number(it.unit_price) || 0,
            })),
          }));
          setDocuments(mapped);
          try {
            localStorage.setItem("zap:documents", JSON.stringify(mapped));
          } catch {
            // ignore
          }
          return;
        }
      }

      // Fallback to local storage
      const local = localStorage.getItem("zap:documents");
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDocuments(parsed);
          return;
        }
      }

      // Default demo documents if totally empty
      setDocuments(initialDocuments);
    } catch (e) {
      console.warn("Supabase fetch documents error:", e);
      setDocuments(initialDocuments);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

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

  // Displayed documents (limit to 3 recent items if in home cockpit mode)
  const displayedDocuments = useMemo(() => {
    return mode === "home" ? filteredDocuments.slice(0, 3) : filteredDocuments;
  }, [filteredDocuments, mode]);

  // Handle encaissement action
  const handleOpenEncaisser = (doc: DocumentItem) => {
    setEncaisserDoc(doc);
    setEncaissementAmount(doc.amount);
  };

  const handleConfirmEncaisser = async () => {
    if (!encaisserDoc) return;
    setIsProcessing(true);

    try {
      // 1. Mettre à jour dans Supabase
      const newNumber = encaisserDoc.number.replace("FAC", "REC");
      await supabase
        .from("documents")
        .update({
          status: "paid",
          type: "receipt",
          amount_paid: encaissementAmount || encaisserDoc.amount,
          number: newNumber,
          updated_at: new Date().toISOString(),
        })
        .eq("id", encaisserDoc.id);

      // 2. Mettre à jour l'état local
      setDocuments((prev) => {
        const next = prev.map((d) =>
          d.id === encaisserDoc.id
            ? { ...d, type: "recu" as const, status: "paye" as const, number: newNumber }
            : d
        );
        try {
          localStorage.setItem("zap:documents", JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });

      const encDocNum = encaisserDoc.number;
      setEncaisserDoc(null);
      toast.success("Reçu généré avec succès", {
        description: `La pièce ${encDocNum} a été encaissée et le reçu est synchronisé dans Supabase.`,
      });
    } catch (e) {
      console.warn("Error updating doc status:", e);
      toast.error("Erreur lors de l'enregistrement de l'encaissement.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle delete document action
  const handleDeleteDocument = async (docId: string, docNumber: string) => {
    if (!confirm(`Confirmer la suppression du document ${docNumber} ?`)) return;

    try {
      await supabase.from("documents").delete().eq("id", docId);
      setDocuments((prev) => {
        const next = prev.filter((d) => d.id !== docId);
        try {
          localStorage.setItem("zap:documents", JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      toast.success(`Document ${docNumber} supprimé.`);
    } catch (e) {
      console.warn("Delete document err:", e);
      toast.error("Erreur lors de la suppression du document.");
    }
  };

  const getTypeBadgeStyle = (type: DocumentItem["type"]) => {
    switch (type) {
      case "devis":
        return {
          bg: "var(--surface)",
          border: "var(--border)",
          text: "var(--foreground)",
          label: "DEVIS",
        };
      case "facture":
        return {
          bg: "rgba(59, 130, 246, 0.08)",
          border: "rgba(59, 130, 246, 0.25)",
          text: "#60A5FA",
          label: "FACTURE",
        };
      case "recu":
        return {
          bg: "rgba(16, 185, 129, 0.08)",
          border: "rgba(16, 185, 129, 0.25)",
          text: "#34D399",
          label: "REÇU",
        };
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Onboarding Checklist Guide */}
      {showChecklist && (
        <div className="rounded-2xl border p-5 sm:p-6 relative" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm sm:text-base font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                Démarrage rapide — Configurez votre atelier
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                3 étapes indispensables pour professionnaliser vos devis et factures.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowChecklist(false)}
              className="p-1 rounded-lg transition-colors cursor-pointer hover:bg-[var(--accent-tint)]"
              style={{ color: "var(--text-secondary)" }}
              title="Fermer le guide"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {[
              { title: "1. Profil d'atelier", done: true, desc: "Nom, ville & IFU fiscal" },
              { title: "2. Tampon & Signature", done: false, desc: "Ajouter dans Paramètres", action: onNavigateSettings },
              { title: "3. Premier document", done: documents.length > 0, desc: "Émettre en 60 secondes", action: onCreateDocument },
            ].map((step) => (
              <div
                key={step.title}
                onClick={step.action}
                className={`p-3.5 rounded-xl border transition-all ${step.action ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                style={{
                  background: step.done ? "var(--accent-tint)" : "var(--background)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ color: step.done ? "#34D399" : "var(--foreground)" }}>
                    {step.title}
                  </span>
                  {step.done ? (
                    <CheckBadgeIcon className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--text-secondary)" }} />
                  )}
                </div>
                <span className="text-[11px] block" style={{ color: "var(--text-secondary)" }}>{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Total Encaissé */}
        <div className="rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all hover:opacity-90" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <BanknotesIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Total encaissé</span>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              En caisse
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight" style={{ color: "var(--foreground)" }}>
              {totalEncaissed.toLocaleString("fr-FR")}
            </span>
            <span className="text-xs font-medium font-mono" style={{ color: "var(--text-secondary)" }}>FCFA</span>
          </div>
        </div>

        {/* Card 2: En attente */}
        <div className="rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all hover:opacity-90" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <ClockIcon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Factures en attente</span>
            </div>
            {totalPending > 0 && (
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                À recouvrer
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums tracking-tight" style={{ color: "var(--foreground)" }}>
              {totalPending.toLocaleString("fr-FR")}
            </span>
            <span className="text-xs font-medium font-mono" style={{ color: "var(--text-secondary)" }}>FCFA</span>
          </div>
        </div>
      </div>

      {/* Action CTA & Search / Filter Controls */}
      {mode === "home" ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <h2 className="text-sm font-semibold text-[var(--foreground)]">Documents récents</h2>
            <p className="text-xs text-[var(--text-secondary)]">Les 3 dernières pièces enregistrées dans l&apos;atelier</p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCreateDocument}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-colors cursor-pointer"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Créer</span>
            </button>
            {onNavigateDocuments && (
              <button
                type="button"
                onClick={onNavigateDocuments}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface)] hover:bg-[var(--accent-tint)] border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                <span>Voir tous les documents ({documents.length})</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      ) : (
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
                color: "var(--text-secondary)",
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
                background: "var(--surface)",
                border: "1px solid var(--border)",
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
          <div className="flex items-center gap-2.5">
            <CustomSelect
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
              options={DOC_TYPE_OPTIONS}
              className="w-44 shrink-0"
            />

            {/* Primary CTA */}
            <button
              type="button"
              onClick={onCreateDocument}
              style={{
                height: "44px",
                background: "var(--foreground)",
                border: "none",
                borderRadius: "12px",
                padding: "0 20px",
                color: "var(--background)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <PlusIcon style={{ width: 18, height: 18 }} />
              <span>Créer un document</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div
        className="hidden sm:block"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                N° &amp; DATE
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                CLIENT
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                TYPE
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, textAlign: "right" }}>
                MONTANT TOTAL
              </th>
              <th style={{ padding: "16px 20px", fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, textAlign: "right" }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedDocuments.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: "48px 20px", textAlign: "center" }}>
                  <DocumentTextIcon style={{ width: "36px", height: "36px", margin: "0 auto 12px", color: "var(--text-secondary)" }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--foreground)", margin: 0 }}>
                    Aucun document enregistré
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 16px" }}>
                    Créez votre première facture, devis ou reçu officiel conforme OHADA.
                  </p>
                  <button
                    type="button"
                    onClick={onCreateDocument}
                    style={{
                      background: "var(--foreground)",
                      color: "var(--background)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "8px 16px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <PlusIcon style={{ width: "14px", height: "14px" }} />
                    <span>Créer un document</span>
                  </button>
                </td>
              </tr>
            ) : (
              displayedDocuments.map((doc) => {
                const badge = getTypeBadgeStyle(doc.type);
                return (
                  <tr key={doc.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "16px 20px" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "#F4F4F5", margin: 0, fontWeight: 500 }}>
                        {doc.number}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--text-secondary)", margin: "2px 0 0" }}>
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
                              background: "var(--accent-tint-strong)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              color: "var(--foreground)",
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
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            padding: "6px 8px",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                          }}
                        >
                          <DocumentDuplicateIcon style={{ width: 16, height: 16 }} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteDocument(doc.id, doc.number)}
                          title="Supprimer définitivement ce document"
                          style={{
                            background: "transparent",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            padding: "6px 8px",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                          }}
                          className="hover:text-red-400 hover:border-red-500/30 transition-colors"
                        >
                          <TrashIcon style={{ width: 16, height: 16 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View (<640px) */}
      <div className="sm:hidden flex flex-col gap-3">
        {displayedDocuments.length === 0 ? (
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "36px 20px",
              textAlign: "center",
            }}
          >
            <DocumentTextIcon style={{ width: "32px", height: "32px", margin: "0 auto 10px", color: "var(--text-secondary)" }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--foreground)", margin: 0 }}>
              Aucun document enregistré
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 16px" }}>
              Créez votre première facture, devis ou reçu.
            </p>
            <button
              type="button"
              onClick={onCreateDocument}
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                borderRadius: "10px",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <PlusIcon style={{ width: "14px", height: "14px" }} />
              <span>Créer un document</span>
            </button>
          </div>
        ) : (
          displayedDocuments.map((doc) => {
          const badge = getTypeBadgeStyle(doc.type);
          return (
            <div
              key={doc.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
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

              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "var(--text-secondary)" }}>
                  {doc.number} · {doc.date}
                </span>

                <div className="flex items-center gap-2">
                  {doc.type === "facture" && doc.status === "en_attente" && (
                    <button
                      type="button"
                      onClick={() => handleOpenEncaisser(doc)}
                      style={{
                        background: "var(--foreground)",
                        color: "var(--background)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        fontSize: "12px",
                        fontWeight: 600,
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
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "6px",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                  >
                    <DocumentDuplicateIcon style={{ width: 16, height: 16 }} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteDocument(doc.id, doc.number)}
                    style={{
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "6px",
                      color: "var(--text-secondary)",
                      cursor: "pointer",
                    }}
                    className="hover:text-red-400 hover:border-red-500/30 transition-colors"
                  >
                    <TrashIcon style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
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
          <div className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <h3 className="text-base font-semibold text-[var(--foreground)] tracking-tight">
                Encaisser la facture
              </h3>
              <button
                type="button"
                onClick={() => setEncaisserDoc(null)}
                className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--accent-tint)] transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[var(--accent-tint)] border border-[var(--border)] rounded-xl p-3 text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--text-secondary)] block mb-0.5 font-mono uppercase tracking-wider text-[10px]">Client & Référence</span>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--foreground)]">{encaisserDoc.client}</span>
                <span className="font-mono text-[var(--text-secondary)]">{encaisserDoc.number}</span>
              </div>
            </div>

            {/* Mode de règlement */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                Mode de règlement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Wave", "MoMo", "Cash"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`h-11 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center border ${
                      paymentMode === mode
                        ? "bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] font-semibold shadow-sm"
                        : "bg-[var(--accent-tint)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--accent-tint-strong)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Montant */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">
                Montant encaissé (FCFA)
              </label>
              <input
                type="number"
                value={encaissementAmount}
                onChange={(e) => setEncaissementAmount(Number(e.target.value))}
                className="w-full h-11 bg-[var(--background)] border border-[var(--border)] rounded-xl px-3.5 text-[var(--foreground)] font-mono tabular-nums text-base focus:border-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors"
              />
            </div>

            {/* Validation Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEncaisserDoc(null)}
                className="flex-1 h-11 bg-transparent border border-[var(--border)] hover:bg-[var(--accent-tint)] rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmEncaisser}
                disabled={isProcessing}
                className="flex-1 h-11 bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
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
