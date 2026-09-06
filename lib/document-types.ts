// ─────────────────────────────────────────────────────────────────────────
// Types partagés "document" (facture / devis / reçu) + données factices
// utilisées pour tester les gabarits PDF (@react-pdf/renderer) AVANT de les
// brancher sur les vraies saisies de l'utilisateur.
// ─────────────────────────────────────────────────────────────────────────

export type DocumentType = "facture" | "devis" | "recu";

export type PaymentProvider = "Wave" | "MTN MoMo" | "Orange Money" | "Moov Money" | "Espèces";

/**
 * Ligne de document unifiée (remplace les anciens types séparés
 * `LineItem` (éditeur) et `CatalogItem` (catalogue) qui se faisaient perdre
 * la description au passage de l'un à l'autre).
 */
export interface DocumentLineItem {
  id: string;
  /** Désignation courte affichée en gras sur le document */
  label: string;
  /** Détail optionnel affiché en dessous du libellé (ex: matériaux, finitions) */
  description?: string;
  /** Unité de mesure (pièce, m², heure, forfait, kg...) */
  unit?: string;
  qty: number;
  unitPrice: number;
  /** Remise en FCFA sur cette ligne (optionnel) */
  discount?: number;
}

/** Profil de l'entreprise/atelier émetteur — source unique pour header + documents */
export interface CompanyProfile {
  name: string;
  ifu: string;
  rccm: string;
  city: string;
  whatsapp: string;
  legalMention: string;
  stampImageUrl?: string;
}

export interface DocumentData {
  type: DocumentType;
  number: string;
  issueDate: string; // ISO date
  validity: string;
  clientName: string;
  clientPhone: string;
  items: DocumentLineItem[];
  hasDeposit: boolean;
  depositAmount: number;
  paymentProvider: PaymentProvider;
  paymentPhone: string;
  includeStamp: boolean;
  includeSignature: boolean;
  company: CompanyProfile;
}

export function computeTotals(items: DocumentLineItem[], depositAmount: number, hasDeposit: boolean) {
  const total = items.reduce((sum, it) => sum + it.qty * it.unitPrice - (it.discount ?? 0), 0);
  const effectiveDeposit = hasDeposit ? Math.min(depositAmount, total) : 0;
  const remainingBalance = Math.max(0, total - effectiveDeposit);
  return { total, effectiveDeposit, remainingBalance };
}

export const MOCK_COMPANY: CompanyProfile = {
  name: "Atelier Koffi & Fils",
  ifu: "3202112456789",
  rccm: "RB/COT/21 B 12345",
  city: "Cotonou, Bénin",
  whatsapp: "+229 97 00 11 22",
  legalMention: "TVA non applicable — Régime TPS / Micro-entreprise (Art. 238bis CGI). Enregistré au RCCM.",
};

/** Facture factice — pour tester le gabarit A4 */
export const MOCK_INVOICE: DocumentData = {
  type: "facture",
  number: "FAC-2025-0105",
  issueDate: "2026-09-05",
  validity: "Solde à la livraison",
  clientName: "Mme Tossou / Société Générale Bénin",
  clientPhone: "+229 97 55 22 11",
  items: [
    {
      id: "1",
      label: "Fourniture bois massif teck & quincaillerie traitée",
      description: "Bois teck certifié, visserie inox anti-rouille",
      unit: "forfait",
      qty: 1,
      unitPrice: 180000,
    },
    {
      id: "2",
      label: "Façon d'atelier, usinage & assemblage sur mesure",
      description: "Main d'œuvre spécialisée, 6 jours d'atelier",
      unit: "forfait",
      qty: 1,
      unitPrice: 120000,
    },
    {
      id: "3",
      label: "Traitement vernis marin & livraison sur site",
      unit: "forfait",
      qty: 1,
      unitPrice: 25000,
    },
  ],
  hasDeposit: true,
  depositAmount: 162500,
  paymentProvider: "Wave",
  paymentPhone: "+229 97 00 11 22",
  includeStamp: true,
  includeSignature: true,
  company: MOCK_COMPANY,
};

/** Reçu factice — pour tester le gabarit format ticket */
export const MOCK_RECEIPT: DocumentData = {
  type: "recu",
  number: "REC-2025-0043",
  issueDate: "2026-09-05",
  validity: "Paiement à réception",
  clientName: "Koffi Mensah",
  clientPhone: "+229 90 12 34 56",
  items: [
    {
      id: "1",
      label: "Règlement intégral prestation de mécanique générale",
      unit: "forfait",
      qty: 1,
      unitPrice: 45000,
    },
  ],
  hasDeposit: false,
  depositAmount: 0,
  paymentProvider: "Wave",
  paymentPhone: "+229 97 00 11 22",
  includeStamp: true,
  includeSignature: false,
  company: MOCK_COMPANY,
};

export function formatFcfa(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}
