"use client";

import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckBadgeIcon,
  ShareIcon,
  XMarkIcon,
  BanknotesIcon,
  BookmarkSquareIcon,
  SparklesIcon,
  ArrowPathIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export interface LineItem {
  id: string;
  label: string;
  qty: number;
  price: number;
}

export interface CustomTemplate {
  id: string;
  name: string;
  type: "devis" | "facture" | "recu";
  hasDeposit: boolean;
  depositPercent?: number;
  items: LineItem[];
  validity: string;
  paymentProvider: "Wave" | "MTN MoMo" | "Orange Money" | "Moov Money" | "Espèces";
}

// REAL WEST AFRICAN COMPLIANT TEMPLATES (Normes OHADA, UEMOA & CGI)
const OFFICIAL_COMPLIANT_TEMPLATES = [
  {
    id: "ohada_atelier",
    name: "Atelier & Fabrication sur mesure (Norme OHADA)",
    badge: "Menuiserie / Couture / Forge",
    type: "facture" as const,
    description: "Conforme droit commercial OHADA avec séparation Fournitures & Façon d'atelier.",
    hasDeposit: true,
    depositPercent: 50,
    validity: "Solde à la livraison",
    paymentProvider: "Wave" as const,
    items: [
      { id: "1", label: "Fourniture bois massif teck & quincaillerie traitée", qty: 1, price: 180000 },
      { id: "2", label: "Façon d'atelier, usinage & assemblage sur mesure", qty: 1, price: 120000 },
      { id: "3", label: "Traitement vernis marin & livraison sur site", qty: 1, price: 25000 },
    ],
  },
  {
    id: "uemoa_chantier",
    name: "Devis Proforma Chantier & Travaux (Norme UEMOA)",
    badge: "BTP / Électricité / Plomberie",
    type: "devis" as const,
    description: "Devis d'engagement avec clause de validité 30j et acompte démarrage 30%.",
    hasDeposit: true,
    depositPercent: 30,
    validity: "Valable 30 jours",
    paymentProvider: "MTN MoMo" as const,
    items: [
      { id: "1", label: "Fourniture câbles 2.5mm², disjoncteurs & appareillage Legrand", qty: 1, price: 85000 },
      { id: "2", label: "Pose goulottes, tirage de lignes & raccordement tableau", qty: 1, price: 50000 },
      { id: "3", label: "Essais techniques & mise en conformité de sécurité", qty: 1, price: 15000 },
    ],
  },
  {
    id: "dgi_service",
    name: "Facture Commerciale Normalisée (UEMOA / DGI)",
    badge: "Prestation B2B & Négoce",
    type: "facture" as const,
    description: "Facturation directe B2B avec dispense TVA (Art. 238bis CGI / Régime TPS).",
    hasDeposit: false,
    depositPercent: 0,
    validity: "Paiement à réception",
    paymentProvider: "Wave" as const,
    items: [
      { id: "1", label: "Prestation d'audit & maintenance technique d'équipements", qty: 1, price: 150000 },
      { id: "2", label: "Rapport d'intervention certifié & recommandations", qty: 1, price: 30000 },
    ],
  },
  {
    id: "recu_momo",
    name: "Reçu de Trésorerie & Quittance Mobile Money",
    badge: "Preuve libératoire Wave / MoMo",
    type: "recu" as const,
    description: "Quittance formelle d'encaissement direct pour clôturer un paiement ou acompte.",
    hasDeposit: false,
    depositPercent: 0,
    validity: "Paiement à réception",
    paymentProvider: "Wave" as const,
    items: [
      { id: "1", label: "Règlement intégral prestation de mécanique générale", qty: 1, price: 45000 },
    ],
  },
];

interface DocumentEditorProps {
  initialType?: "devis" | "facture" | "recu";
  initialClient?: string;
  initialItems?: LineItem[];
  onSuccess?: () => void;
}

export default function DocumentEditor({
  initialType = "facture",
  initialClient = "",
  initialItems,
  onSuccess,
}: DocumentEditorProps) {
  const [docType, setDocType] = useState<"devis" | "facture" | "recu">(initialType);
  const [clientName, setClientName] = useState(initialClient);
  const [clientPhone, setClientPhone] = useState("+229 ");

  // Selected template indicator
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("custom_blank");

  // Custom templates saved by the user (localStorage)
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState("");

  // Line items
  const [items, setItems] = useState<LineItem[]>(
    initialItems && initialItems.length > 0
      ? initialItems
      : [
          { id: "1", label: "Table de réunion teck massif (12 places)", qty: 1, price: 350000 },
          { id: "2", label: "Livraison & assemblage sur site", qty: 1, price: 35000 },
        ]
  );

  // Dialog for adding manual line item
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [manualLabel, setManualLabel] = useState("");
  const [manualQty, setManualQty] = useState(1);
  const [manualPrice, setManualPrice] = useState(25000);

  // OPTIONAL DEPOSIT & PAYMENT SETTINGS
  const [hasDeposit, setHasDeposit] = useState(false);
  const [depositAmount, setDepositAmount] = useState(150000);

  // Mobile Money details
  const [paymentProvider, setPaymentProvider] = useState<"Wave" | "MTN MoMo" | "Orange Money" | "Moov Money" | "Espèces">("Wave");
  const [paymentPhone, setPaymentPhone] = useState("+229 97 00 11 22");

  // Validity / Terms
  const [validity, setValidity] = useState("Valable 15 jours");

  // Stamp and signature toggles
  const [includeStamp, setIncludeStamp] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);

  // Legal OHADA / UEMOA compliance note
  const [legalMention, setLegalMention] = useState("TVA non applicable — Régime TPS / Micro-entreprise (Art. 238bis CGI). Enregistré au RCCM.");

  // Sharing state
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load custom templates from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zap_user_templates");
      if (saved) {
        setCustomTemplates(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = subtotal;
  const effectiveDeposit = hasDeposit ? Math.min(depositAmount, total) : 0;
  const remainingBalance = Math.max(0, total - effectiveDeposit);

  // Apply an official compliant template
  const handleApplyOfficialTemplate = (tmpl: (typeof OFFICIAL_COMPLIANT_TEMPLATES)[0]) => {
    setSelectedTemplateId(tmpl.id);
    setDocType(tmpl.type);
    setItems(tmpl.items.map((it) => ({ ...it, id: Date.now().toString() + Math.random().toString().slice(2, 5) })));
    setHasDeposit(tmpl.hasDeposit);
    setValidity(tmpl.validity);
    setPaymentProvider(tmpl.paymentProvider);

    const calcTotal = tmpl.items.reduce((s, it) => s + it.qty * it.price, 0);
    if (tmpl.hasDeposit && tmpl.depositPercent) {
      setDepositAmount(Math.round((calcTotal * tmpl.depositPercent) / 100));
    }
    setToastMessage(`Modèle conforme appliqué : ${tmpl.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Start with a totally blank page (no pre-existing models)
  const handleStartBlank = () => {
    setSelectedTemplateId("blank");
    setItems([]);
    setHasDeposit(false);
    setDepositAmount(0);
    setClientName("");
    setToastMessage("Page blanche prête. Saisissez librement vos propres prestations.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Apply user's saved custom template
  const handleApplyCustomTemplate = (tmpl: CustomTemplate) => {
    setSelectedTemplateId(`custom_${tmpl.id}`);
    setDocType(tmpl.type);
    setItems(tmpl.items.map((it) => ({ ...it, id: Date.now().toString() + Math.random().toString().slice(2, 5) })));
    setHasDeposit(tmpl.hasDeposit);
    setValidity(tmpl.validity);
    setPaymentProvider(tmpl.paymentProvider);

    const calcTotal = tmpl.items.reduce((s, it) => s + it.qty * it.price, 0);
    if (tmpl.hasDeposit && tmpl.depositPercent) {
      setDepositAmount(Math.round((calcTotal * tmpl.depositPercent) / 100));
    }
    setToastMessage(`Votre modèle appliqué : ${tmpl.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Save current document as custom template
  const handleSaveCurrentAsTemplate = () => {
    if (!newTemplateName.trim()) return;
    if (items.length === 0) {
      alert("Ajoutez au moins une prestation avant d'enregistrer le modèle.");
      return;
    }

    const newTmpl: CustomTemplate = {
      id: Date.now().toString(),
      name: newTemplateName.trim(),
      type: docType,
      hasDeposit,
      depositPercent: total > 0 && hasDeposit ? Math.round((effectiveDeposit / total) * 100) : 0,
      items: [...items],
      validity,
      paymentProvider,
    };

    const updated = [newTmpl, ...customTemplates];
    setCustomTemplates(updated);
    try {
      localStorage.setItem("zap_user_templates", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewTemplateName("");
    setIsSaveModalOpen(false);
    setSelectedTemplateId(`custom_${newTmpl.id}`);
    setToastMessage(`Modèle "${newTmpl.name}" sauvegardé avec succès !`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteCustomTemplate = (tmplId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customTemplates.filter((t) => t.id !== tmplId);
    setCustomTemplates(updated);
    try {
      localStorage.setItem("zap_user_templates", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddManualItem = () => {
    if (!manualLabel.trim()) return;
    const newItem: LineItem = {
      id: Date.now().toString(),
      label: manualLabel.trim(),
      qty: manualQty,
      price: manualPrice,
    };
    setItems((prev) => [...prev, newItem]);
    setManualLabel("");
    setManualQty(1);
    setManualPrice(25000);
    setIsAddDialogOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleSetDepositPercent = (percent: number) => {
    setDepositAmount(Math.round((total * percent) / 100));
  };

  const handleGenerateAndShare = () => {
    if (!clientName.trim()) {
      alert("Veuillez renseigner le nom du client.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setToastMessage("Document certifié généré avec succès !");

      const typeLabel = docType === "recu" ? "Reçu officiel" : docType === "facture" ? "Facture" : "Devis proforma";
      const docNumber = docType === "recu" ? "REC-2025-0043" : docType === "facture" ? "FAC-2025-0105" : "DEV-2025-0090";

      let paymentText = `Règlement accepté via ${paymentProvider} (${paymentPhone}).`;
      if (hasDeposit && effectiveDeposit > 0) {
        paymentText += `\n- Acompte perçu : ${effectiveDeposit.toLocaleString("fr-FR")} FCFA\n- Reste dû à la livraison : ${remainingBalance.toLocaleString("fr-FR")} FCFA`;
      }

      const message = encodeURIComponent(
        `Bonjour ${clientName},\nVoici votre ${typeLabel} ZAP N° ${docNumber} conforme aux normes OHADA/UEMOA d'un montant total de ${total.toLocaleString("fr-FR")} FCFA.\n${paymentText}\n\nConsultez et téléchargez votre PDF certifié avec cachet & signature ici : https://zap.africa/d/${docNumber}`
      );
      const cleanPhone = clientPhone.replace(/\D/g, "");
      const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${message}` : `https://wa.me/?text=${message}`;

      window.open(waUrl, "_blank");
      onSuccess?.();
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-32">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 bg-[#171717] border border-[#D4AF37] rounded-xl p-4 text-sm text-[#F4F4F5] z-50 flex items-center gap-2.5 shadow-none">
          <CheckBadgeIcon className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TEMPLATE PICKER: Real Net-Compliant Models OR Custom Blank / Saved */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-[#D4AF37]" />
              <h3 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-base text-white">
                Choix du modèle de document
              </h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Utilisez un modèle certifié du net, vos propres modèles sauvegardés, ou partez d&apos;une page blanche sans contrainte.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleStartBlank}
              className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedTemplateId === "blank"
                  ? "bg-[#262626] border-[#D4AF37] text-[#D4AF37]"
                  : "bg-[#000000] border-[#262626] text-neutral-300 hover:text-white"
              }`}
              title="Créer un document sans aucun modèle imposé"
            >
              <DocumentTextIcon className="w-3.5 h-3.5" />
              <span>Page blanche (Vierge)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSaveModalOpen(true)}
              className="py-1.5 px-3 rounded-lg bg-[#262626] hover:bg-[#333] border border-[#333] text-xs font-medium text-[#D4AF37] transition-colors cursor-pointer flex items-center gap-1.5"
              title="Enregistrer la configuration actuelle comme modèle d'atelier réutilisable"
            >
              <BookmarkSquareIcon className="w-3.5 h-3.5" />
              <span>⭐ Sauvegarder comme mon modèle</span>
            </button>
          </div>
        </div>

        {/* Templates Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {OFFICIAL_COMPLIANT_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => handleApplyOfficialTemplate(tmpl)}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                selectedTemplateId === tmpl.id
                  ? "bg-[#202020] border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                  : "bg-[#000000] border-[#262626] hover:border-[#383838]"
              }`}
            >
              <div>
                <span className="inline-block text-[10px] font-mono py-0.5 px-1.5 rounded bg-[#262626] text-[#D4AF37] mb-1.5">
                  {tmpl.badge}
                </span>
                <p className="text-xs font-semibold text-white leading-snug">{tmpl.name}</p>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#1f1f1f] flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                <span>{tmpl.type.toUpperCase()}</span>
                <span>{tmpl.hasDeposit ? `Acompte ${tmpl.depositPercent}%` : "Comptant"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* User's Own Custom Templates (if any) */}
        {customTemplates.length > 0 && (
          <div className="pt-2 border-t border-[#262626]">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono block mb-2">
              Vos modèles personnalisés d&apos;atelier ({customTemplates.length}) :
            </span>
            <div className="flex flex-wrap gap-2">
              {customTemplates.map((custom) => (
                <div
                  key={custom.id}
                  onClick={() => handleApplyCustomTemplate(custom)}
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedTemplateId === `custom_${custom.id}`
                      ? "bg-[#262626] border-[#D4AF37] text-white"
                      : "bg-[#000000] border-[#262626] text-neutral-300 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{custom.name}</span>
                  <span className="text-[10px] font-mono text-[#D4AF37]">
                    ({custom.items.length} lignes)
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCustomTemplate(custom.id, e)}
                    className="text-neutral-500 hover:text-red-400 p-0.5"
                    title="Supprimer ce modèle personnalisé"
                  >
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3 Tabs Document Type Switcher */}
      <div className="flex bg-[#171717] border border-[#262626] rounded-xl p-1 select-none">
        {[
          { id: "facture" as const, label: "Facture officielle", badge: "Comptabilité OHADA" },
          { id: "devis" as const, label: "Devis proforma", badge: "Avant travaux" },
          { id: "recu" as const, label: "Reçu d'encaissement", badge: "Preuve libératoire" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setDocType(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
              docType === tab.id
                ? "bg-[#262626] text-[#D4AF37] font-semibold border-b-2 border-[#D4AF37]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span className="hidden sm:inline text-[10px] font-mono text-neutral-500">
              ({tab.badge})
            </span>
          </button>
        ))}
      </div>

      {/* 1. Client & Dates Info Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
            1. Informations du client &amp; Mentions
          </h2>
          <span className="text-[11px] font-mono text-[#D4AF37]">
            {docType === "recu" ? "REC-2025-0043" : docType === "facture" ? "FAC-2025-0105" : "DEV-2025-0090"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Nom du client / Entreprise *
            </label>
            <input
              type="text"
              placeholder="Ex: Mme Tossou / Société Générale Bénin"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Numéro WhatsApp client (pour envoi direct)
            </label>
            <input
              type="tel"
              placeholder="+229 97 00 00 00 / +225 07..."
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Échéance / Validité du document
            </label>
            <select
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            >
              <option value="Paiement à réception">Paiement à réception (Comptant)</option>
              <option value="Valable 15 jours">Valable 15 jours</option>
              <option value="Valable 30 jours">Valable 30 jours</option>
              <option value="Solde à la livraison">Solde dû à la livraison</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              Mode de règlement Mobile Money / Espèces
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={paymentProvider}
                onChange={(e: any) => setPaymentProvider(e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="Wave">Wave</option>
                <option value="MTN MoMo">MTN MoMo</option>
                <option value="Orange Money">Orange Money</option>
                <option value="Moov Money">Moov Money</option>
                <option value="Espèces">Espèces (Cash)</option>
              </select>

              <input
                type="text"
                value={paymentPhone}
                onChange={(e) => setPaymentPhone(e.target.value)}
                placeholder="+229..."
                className="w-full px-2.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Legal Mentions Input (OHADA / UEMOA) */}
        <div>
          <label className="block text-xs font-medium text-neutral-300 mb-1">
            Mention légale &amp; Régime fiscal (Norme UEMOA / OHADA)
          </label>
          <input
            type="text"
            value={legalMention}
            onChange={(e) => setLegalMention(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-[#262626] text-xs text-neutral-300 placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* 2. Line Items Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
              2. Prestations &amp; Produits ({items.length} lignes)
            </h2>
            <p className="text-xs text-neutral-400">
              Saisie totalement libre : personnalisez chaque libellé, quantité et prix unitaire.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#262626] hover:bg-[#303030] text-xs font-medium text-[#D4AF37] transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span>+ Ajouter une ligne</span>
          </button>
        </div>

        {/* Added Items List */}
        {items.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-[#262626] rounded-xl">
            <DocumentTextIcon className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
            <p className="text-sm text-neutral-300 font-medium">Aucune ligne dans ce document</p>
            <p className="text-xs text-neutral-500 mt-1 mb-3">
              Ajoutez vos propres prestations manuellement ou choisissez un modèle ci-dessus.
            </p>
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(true)}
              className="py-1.5 px-3.5 rounded-lg bg-[#D4AF37] text-[#000000] text-xs font-semibold cursor-pointer"
            >
              + Ajouter la première ligne
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#000000] border border-[#262626]"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.label}</p>
                  <p className="text-xs text-neutral-400 font-mono">
                    {item.qty} × {item.price.toLocaleString("fr-FR")} FCFA
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold text-[#D4AF37] font-mono tabular-nums">
                    {(item.qty * item.price).toLocaleString("fr-FR")} FCFA
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 rounded-lg text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Supprimer cette ligne"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. OPTIONAL DEPOSIT & BALANCE DUE MODULE (AFRICAN WORKFLOW) */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BanknotesIcon className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
                3. Acompte &amp; Reste à payer (100% Optionnel)
              </h2>
              <p className="text-xs text-neutral-400">
                Inactif pour les ventes comptant. Activez pour les chantiers et fabrications sur commande afin d&apos;éviter les litiges.
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={hasDeposit}
              onChange={(e) => setHasDeposit(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]" />
          </label>
        </div>

        {/* Deposit details when enabled */}
        {hasDeposit && (
          <div className="pt-3 border-t border-[#262626] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Montant de l&apos;acompte versé par le client (FCFA)
                </label>
                <input
                  type="number"
                  min={0}
                  max={total}
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Raccourcis de pourcentage :
                </label>
                <div className="flex gap-2">
                  {[
                    { label: "30% (Matériaux)", percent: 30 },
                    { label: "50% (Standard atelier)", percent: 50 },
                    { label: "70% (Avance forte)", percent: 70 },
                  ].map((btn) => (
                    <button
                      key={btn.percent}
                      type="button"
                      onClick={() => handleSetDepositPercent(btn.percent)}
                      className="flex-1 py-2 px-2 rounded-xl bg-[#000000] border border-[#262626] hover:border-[#D4AF37] text-xs font-medium text-neutral-300 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Summary Box */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#000000] border border-[#262626] text-center">
              <div>
                <span className="text-[11px] text-neutral-400 block mb-0.5">Montant Total</span>
                <span className="text-sm font-semibold text-white font-mono tabular-nums">
                  {total.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div className="border-x border-[#262626]">
                <span className="text-[11px] text-emerald-400 block mb-0.5">Acompte Perçu</span>
                <span className="text-sm font-semibold text-emerald-400 font-mono tabular-nums">
                  - {effectiveDeposit.toLocaleString("fr-FR")} F
                </span>
              </div>
              <div>
                <span className="text-[11px] text-[#D4AF37] block mb-0.5">Reste dû à livraison</span>
                <span className="text-sm font-bold text-[#D4AF37] font-mono tabular-nums">
                  {remainingBalance.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Stamp & Signature Card */}
      <div className="bg-[#171717] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-3">
        <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
          4. Empreinte certifiée sur le document
        </h2>

        <div className="flex flex-col sm:flex-row gap-5">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeStamp}
              onChange={(e) => setIncludeStamp(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm text-neutral-300">
              Apposer le tampon d&apos;atelier officiel ZAP
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSignature}
              onChange={(e) => setIncludeSignature(e.target.checked)}
              className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
            />
            <span className="text-sm text-neutral-300">
              Apposer la signature manuscrite certifiée
            </span>
          </label>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#000000]/95 border-t border-[#262626] p-4 z-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-baseline gap-4">
            <div>
              <span className="text-[11px] text-neutral-400 block">Total net :</span>
              <span
                style={{ fontFamily: "'DM Serif Display', serif" }}
                className="text-xl sm:text-2xl text-white font-mono tabular-nums"
              >
                {total.toLocaleString("fr-FR")} FCFA
              </span>
            </div>

            {hasDeposit && effectiveDeposit > 0 && (
              <div className="border-l border-[#262626] pl-4">
                <span className="text-[11px] text-[#D4AF37] block">Reste à payer :</span>
                <span className="text-base sm:text-lg font-bold text-[#D4AF37] font-mono tabular-nums">
                  {remainingBalance.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerateAndShare}
            disabled={isGenerating}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#e2b170] text-[#000000] text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            <ShareIcon className="w-4 h-4" />
            <span>
              {isGenerating ? "Génération du PDF..." : "Générer & Partager sur WhatsApp"}
            </span>
          </button>
        </div>
      </div>

      {/* Modal: Save Current Document as Custom Template */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#171717] border border-[#262626] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
                Enregistrer comme modèle d&apos;atelier
              </h3>
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300">
              Ce modèle sauvegardera vos {items.length} lignes de prestation, les conditions de règlement ({paymentProvider}) et la configuration d&apos;acompte pour vos prochains devis et factures.
            </p>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Nom de votre modèle personnalisé *
              </label>
              <input
                type="text"
                placeholder="Ex: Mon devis standard Meuble TV / Ma robe mariage"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex gap-3 pt-2 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setIsSaveModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#262626] text-xs text-neutral-300 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveCurrentAsTemplate}
                className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-[#000000] text-xs font-semibold hover:bg-[#e2b170] transition-colors"
              >
                Enregistrer le modèle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog for adding line item manually */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#171717] border border-[#262626] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <h3 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-lg text-white">
                Ajouter une prestation libre
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Désignation</label>
                <input
                  type="text"
                  placeholder="Ex: Confection porte bois rouge / Réparation châssis"
                  value={manualLabel}
                  onChange={(e) => setManualLabel(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Quantité</label>
                  <input
                    type="number"
                    min={1}
                    value={manualQty}
                    onChange={(e) => setManualQty(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Prix unitaire (FCFA)</label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={manualPrice}
                    onChange={(e) => setManualPrice(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#000000] border border-[#262626] text-sm text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                className="py-2 px-4 rounded-xl border border-[#262626] text-xs text-neutral-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleAddManualItem}
                className="py-2 px-4 rounded-xl bg-[#D4AF37] text-[#000000] text-xs font-semibold hover:bg-[#e2b170]"
              >
                Ajouter au document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
