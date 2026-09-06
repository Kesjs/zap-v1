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
    <div className="h-[600px] flex items-center justify-center text-xs text-neutral-500">
      Chargement de l&apos;aperçu PDF…
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
      {/* Bandeau explicatif : c'est un espace de test, pas la vraie génération finale */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#171717] border border-[#D4AF37]/30">
        <BeakerIcon className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif" }} className="text-base text-white">
            Aperçu PDF — Mode test (données factices)
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Cette vue sert à valider le rendu imprimable des deux gabarits (Facture/Devis format A4 et Reçu
            format ticket) avant de les brancher sur les vraies saisies du formulaire. Les informations
            affichées ci-dessous ne sont pas connectées à l&apos;éditeur de document.
          </p>
        </div>
      </div>

      {/* Sélecteur de gabarit */}
      <div className="flex bg-[#171717] border border-[#262626] rounded-xl p-1 w-full sm:w-fit">
        <button
          type="button"
          onClick={() => setActive("invoice")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            active === "invoice" ? "bg-[#262626] text-[#D4AF37]" : "text-neutral-400 hover:text-white"
          }`}
        >
          <DocumentTextIcon className="w-4 h-4" />
          Facture / Devis (A4)
        </button>
        <button
          type="button"
          onClick={() => setActive("receipt")}
          className={`flex items-center gap-2 py-2 px-4 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            active === "receipt" ? "bg-[#262626] text-[#D4AF37]" : "text-neutral-400 hover:text-white"
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
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#e2b170] text-[#000000] text-xs font-semibold transition-colors no-underline"
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
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#e2b170] text-[#000000] text-xs font-semibold transition-colors no-underline"
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
      <div className="rounded-2xl overflow-hidden border border-[#262626] bg-[#000000]">
        <PDFViewer width="100%" height={700} showToolbar>
          {active === "invoice" ? <InvoicePdf data={MOCK_INVOICE} /> : <ReceiptPdf data={MOCK_RECEIPT} />}
        </PDFViewer>
      </div>
    </div>
  );
}
