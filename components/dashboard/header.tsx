"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  ChevronLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { DashboardView } from "./sidebar";
import { useSidebar } from "./sidebar-context";
import { useWorkshop } from "./workshop-context";

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
  const { workshop, getInitials } = useWorkshop();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const viewTitles: Record<DashboardView, { section: string; page: string }> = {
    home: { section: "Cockpit", page: "Accueil" },
    documents: { section: "Cockpit", page: "Mes documents" },
    registry: { section: "Cockpit", page: "Mes documents" },
    new: { section: "Facturation", page: "Créer un document" },
    catalog: { section: "Atelier", page: "Services" },
    settings: { section: "Configuration", page: "Paramètres" },
    "pdf-preview": { section: "Test", page: "Aperçu PDF" },
  };

  const breadcrumb = viewTitles[currentView] || { section: "Cockpit", page: title };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#000000] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between transition-all select-none">
      {/* ──────────────────────────────────────────────────────────────────────────
          GAUCHE : Sidebar Trigger + Titre de la Vue
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={toggleMobile}
          className="md:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          title="Menu de navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Collapse / Expand Button */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-all cursor-pointer active:scale-95"
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
        <div className="hidden sm:block h-5 w-[1px] bg-white/10" />

        {/* Page Title */}
        <div className="flex items-center">
          <h1
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            className="text-base sm:text-sm font-semibold tracking-tight text-white"
          >
            {breadcrumb.page}
          </h1>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────
          DROITE : Recherche Rapide + Bouton Créer + Avatar Mobile Uniquement
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Desktop Quick Search Input */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs text-zinc-400 focus-within:border-white/30 focus-within:text-white transition-all w-48 lg:w-64">
          <MagnifyingGlassIcon className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
          <input
            type="text"
            placeholder="Rechercher client, n°..."
            className="bg-transparent border-none outline-none text-xs text-white placeholder:text-zinc-600 w-full"
          />
          <span className="text-[10px] font-mono text-zinc-500 bg-white/5 border border-white/10 px-1 py-0.5 rounded">
            ⌘K
          </span>
        </div>

        {/* Fast Action CTA : + Créer un document */}
        {currentView !== "new" && (
          <button
            type="button"
            onClick={() => onViewChange("new")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Créer un document</span>
            <span className="sm:hidden">Créer</span>
          </button>
        )}

        {/* Mobile ONLY Profile Avatar Dropdown (supprimé sur Desktop pour éviter le doublon) */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Menu profil"
          >
            <div className="relative w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center justify-center overflow-hidden">
              {workshop.logoUrl ? (
                <Image
                  src={workshop.logoUrl}
                  alt={workshop.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                getInitials()
              )}
            </div>
          </button>

          {/* Mobile Dropdown Menu Modal */}
          {isDropdownOpen && (
            <>
              {/* Invisible dismiss backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-black/95 backdrop-blur-md border border-white/10 p-2.5 z-50 text-xs shadow-2xl">
                {/* User details */}
                <div className="px-3 py-2.5 border-b border-white/10 mb-1.5">
                  <p className="font-semibold text-white truncate">{workshop.name}</p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                    {workshop.city ? `${workshop.city}, ${workshop.country}` : workshop.activity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-left"
                >
                  <Cog6ToothIcon className="w-4 h-4 text-zinc-400" />
                  <span>Paramètres de l&apos;Atelier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("catalog");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors text-left"
                >
                  <CheckBadgeIcon className="w-4 h-4 text-zinc-400" />
                  <span>Services</span>
                </button>

                <div className="border-t border-white/10 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-950/40 transition-colors text-left cursor-pointer"
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
