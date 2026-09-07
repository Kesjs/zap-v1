"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowDownTrayIcon, BeakerIcon, DocumentTextIcon, TicketIcon } from "@heroicons/react/24/outline";
import { MOCK_INVOICE, MOCK_RECEIPT } from "@/lib/document-types";
import InvoicePdf from "@/components/documents/invoice-pdf";
import ReceiptPdf from "@/components/documents/receipt-pdf";

// @react-pdf/renderer utilise des API navigateur (iframe / blob) : on charge
// PDFViewer et PDFDownloadLink uniquement côté client, sans rendu serveur.
const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((m) => m.PDFViewer), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] flex items-center justify-center">
      <div className="h-6 w-6 rounded-full border-2 border-[var(--border)] border-t-white animate-spin" />
    </div>
  ),
});

const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink), {
  ssr: false,
});

export default function PdfPreview() {
  const [active, setActive] = useState<"invoice" | "receipt">("invoice");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-16">
      {/* Bandeau explicatif */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
        <BeakerIcon className="w-5 h-5 text-[var(--text-secondary)] shrink-0 mt-0.5" />
        <div>
          <h2 className="text-base font-semibold text-[var(--foreground)] tracking-tight">
            Aperçu PDF — Mode test (données factices)
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Cette vue sert à valider le rendu imprimable des deux gabarits (Facture/Devis format A4 et Reçu
            format ticket) avant de les brancher sur les vraies saisies du formulaire. Les informations
            affichées ci-dessous ne sont pas connectées à l&apos;éditeur de document.
          </p>
        </div>
      </div>

      {/* Sélecteur de gabarit */}
      <div className="flex bg-[var(--surface)] border border-[var(--border)] rounded-xl p-1 w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setActive("invoice")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            active === "invoice" ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          }`}
        >
          <DocumentTextIcon className="w-4 h-4" />
          Facture / Devis (A4)
        </button>
        <button
          type="button"
          onClick={() => setActive("receipt")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            active === "receipt" ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm" : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
          }`}
        >
          <TicketIcon className="w-4 h-4" />
          Reçu (ticket)
        </button>
      </div>

      {/* Bouton de téléchargement direct (indépendant de l'aperçu iframe) */}
      <div>
        {active === "invoice" ? (
          <PDFDownloadLink
            document={<InvoicePdf data={MOCK_INVOICE} />}
            fileName={`${MOCK_INVOICE.number}.pdf`}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] text-xs font-semibold transition-colors no-underline shadow-sm"
          >
            {({ loading }: { loading: boolean }) => (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                {loading ? "Préparation du PDF…" : "Télécharger le PDF (test)"}
              </>
            )}
          </PDFDownloadLink>
        ) : (
          <PDFDownloadLink
            document={<ReceiptPdf data={MOCK_RECEIPT} />}
            fileName={`${MOCK_RECEIPT.number}.pdf`}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] text-xs font-semibold transition-colors no-underline shadow-sm"
          >
            {({ loading }: { loading: boolean }) => (
              <>
                <ArrowDownTrayIcon className="w-4 h-4" />
                {loading ? "Préparation du PDF…" : "Télécharger le PDF (test)"}
              </>
            )}
          </PDFDownloadLink>
        )}
      </div>

      {/* Aperçu live du PDF dans une iframe intégrée */}
      <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
        <PDFViewer width="100%" height={700} showToolbar>
          {active === "invoice" ? <InvoicePdf data={MOCK_INVOICE} /> : <ReceiptPdf data={MOCK_RECEIPT} />}
        </PDFViewer>
      </div>
    </div>
  );
}
