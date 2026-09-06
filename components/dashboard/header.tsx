"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  ChevronLeftIcon,
  PlusIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { DashboardView } from "./sidebar";
import { useSidebar } from "./sidebar-context";

interface HeaderProps {
  title: string;
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  onLogout?: () => void;
}

export default function DashboardHeader({
  title,
  currentView,
  onViewChange,
  onLogout,
}: HeaderProps) {
  const { isCollapsed, toggleSidebar, toggleMobile } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const viewTitles: Record<DashboardView, { section: string; page: string }> = {
    registry: { section: "Cockpit", page: "Registre des ventes" },
    new: { section: "Facturation", page: "Nouveau document" },
    catalog: { section: "Gestion", page: "Catalogue d'articles" },
    settings: { section: "Configuration", page: "Profil & Cachet" },
    "pdf-preview": { section: "Test", page: "Aperçu PDF (données factices)" },
  };

  const breadcrumb = viewTitles[currentView] || { section: "Cockpit", page: title };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#000000] border-b border-[#262626] px-4 sm:px-6 flex items-center justify-between transition-all select-none">
      {/* ──────────────────────────────────────────────────────────────────────────
          GAUCHE : Sidebar Trigger + Breadcrumbs
          (Seul et unique déclencheur de collapse/expand de la sidebar — celui qui
          existait aussi dans sidebar.tsx a été retiré pour éviter le doublon.)
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={toggleMobile}
          className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#171717] border border-[#262626] transition-colors cursor-pointer"
          title="Menu de navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Collapse / Expand Button — seul déclencheur, style peaufiné */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl text-neutral-400 hover:text-[#D4AF37] bg-[#171717] hover:bg-[#1d1d1d] border border-[#262626] hover:border-[#D4AF37]/40 transition-all cursor-pointer active:scale-95"
          title={isCollapsed ? "Déplier la barre latérale" : "Replier la barre latérale"}
        >
          <motion.span
            initial={false}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </motion.span>
        </button>

        {/* Separator */}
        <div className="hidden sm:block h-5 w-[1px] bg-[#262626]" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium">
          <span className="text-neutral-500 hidden sm:inline-block">
            {breadcrumb.section}
          </span>
          <span className="text-neutral-600 hidden sm:inline-block">/</span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#F4F4F5",
              fontWeight: 500,
            }}
            className="text-sm sm:text-xs tracking-tight"
          >
            {breadcrumb.page}
          </span>
        </nav>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          DROITE : Bouton Action Rapide + Profil Dropdown
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Status Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>IFU 320194857 · UEMOA</span>
        </div>

        {/* Fast Action CTA : + Créer un document */}
        {currentView !== "new" && (
          <button
            type="button"
            onClick={() => onViewChange("new")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#e2b170] text-[#000000] text-xs font-semibold transition-colors cursor-pointer"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Créer un document</span>
            <span className="sm:hidden">Créer</span>
          </button>
        )}

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-[#262626] bg-[#171717] hover:border-neutral-700 transition-colors cursor-pointer"
            title="Menu profil"
          >
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold flex items-center justify-center">
              KM
            </div>
          </button>

          {/* Dropdown Menu Modal */}
          {isDropdownOpen && (
            <>
              {/* Invisible dismiss backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#171717] border border-[#262626] p-2 z-50 text-xs">
                {/* User details */}
                <div className="px-3 py-2 border-b border-[#262626] mb-1">
                  <p className="font-medium text-white truncate">Koffi Mensah</p>
                  <p className="text-[11px] text-neutral-400 truncate">Atelier Teck & Or</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#262626] transition-colors text-left"
                >
                  <Cog6ToothIcon className="w-4 h-4 text-neutral-400" />
                  <span>Profil & Cachet fiscal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("catalog");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-[#262626] transition-colors text-left"
                >
                  <CheckBadgeIcon className="w-4 h-4 text-neutral-400" />
                  <span>Mes prestations & prix</span>
                </button>

                <div className="border-t border-[#262626] my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors text-left cursor-pointer"
                >
                  <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                  <span>Se déconnecter</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
