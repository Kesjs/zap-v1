"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SidebarProvider, useSidebar } from "@/components/dashboard/sidebar-context";
import DashboardSidebar, { DashboardView } from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import SalesRegistry, { DocumentItem } from "@/components/dashboard/sales-registry";
import DocumentEditor, { LineItem } from "@/components/dashboard/document-editor";
import SettingsStamp from "@/components/dashboard/settings-stamp";
import CatalogView, { CatalogItem } from "@/components/dashboard/catalog-view";
import PdfPreview from "@/components/dashboard/pdf-preview";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

function DashboardMainContent() {
  const { isCollapsed } = useSidebar();

  const [currentView, setCurrentView] = useState<DashboardView>("registry");
  const [documentCount, setDocumentCount] = useState(3);
  const maxDocuments = 8;

  const [prefilledClient, setPrefilledClient] = useState("");
  const [prefilledType, setPrefilledType] = useState<"devis" | "facture" | "recu">("facture");
  const [prefilledItems, setPrefilledItems] = useState<LineItem[] | undefined>(undefined);

  const viewTitles: Record<DashboardView, string> = {
    registry: "Tableau de bord — Registre des ventes",
    new: "Éditeur 1-clic — Nouveau document",
    catalog: "Catalogue & Modèles de prix",
    settings: "Paramètres & Empreinte d'atelier",
    "pdf-preview": "Aperçu PDF — Mode test (données factices)",
  };

  const handleDuplicate = (doc: DocumentItem) => {
    setPrefilledClient(doc.client);
    setPrefilledType(doc.type);
    setPrefilledItems(undefined);
    setCurrentView("new");
  };

  const handleInvoiceFromCatalog = (item: CatalogItem) => {
    setPrefilledItems([
      {
        id: Date.now().toString(),
        label: item.label,
        qty: 1,
        price: item.price,
      },
    ]);
    setPrefilledClient("");
    setPrefilledType("facture");
    setCurrentView("new");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F4F4F5] flex flex-col">
      {/* 1. Sidebar Collapsible Desktop (240px <-> 68px) + Mobile Drawer */}
      <DashboardSidebar
        currentView={currentView}
        onViewChange={(v) => setCurrentView(v)}
        documentCount={documentCount}
        maxDocuments={maxDocuments}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Container with dynamic left margin adapting to Sidebar state */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-in-out ${
          isCollapsed ? "md:ml-[68px]" : "md:ml-[240px]"
        }`}
      >
        {/* Sticky Top Header with Breadcrumbs, Toggle & Quick Action */}
        <DashboardHeader
          title={viewTitles[currentView]}
          currentView={currentView}
          onViewChange={(v) => setCurrentView(v)}
          onLogout={handleLogout}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {currentView === "registry" && (
                <SalesRegistry
                  onCreateDocument={() => setCurrentView("new")}
                  onDuplicateDocument={handleDuplicate}
                  onNavigateSettings={() => setCurrentView("settings")}
                />
              )}

              {currentView === "new" && (
                <DocumentEditor
                  initialType={prefilledType}
                  initialClient={prefilledClient}
                  initialItems={prefilledItems}
                  onSuccess={() => {
                    setDocumentCount((prev) => Math.min(prev + 1, maxDocuments));
                    setPrefilledItems(undefined);
                    setCurrentView("registry");
                  }}
                />
              )}

              {currentView === "catalog" && (
                <CatalogView onSelectItemForInvoice={handleInvoiceFromCatalog} />
              )}

              {currentView === "settings" && <SettingsStamp />}

              {currentView === "pdf-preview" && <PdfPreview />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <DashboardMainContent />
    </SidebarProvider>
  );
}
