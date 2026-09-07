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
import { useDashboardTheme } from "./theme-context";
import ThemeSwitcher from "@/components/theme-switcher";

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
  const { theme, toggleTheme } = useDashboardTheme();
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
    <header
      className="sticky top-0 z-30 h-16 border-b px-4 sm:px-6 flex items-center justify-between transition-all select-none"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      {/* GAUCHE : Sidebar Trigger + Titre de la Vue */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobile}
          className="md:hidden p-2 rounded-lg border transition-colors cursor-pointer"
          style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
          title="Menu de navigation"
        >
          <Bars3Icon className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl border transition-all cursor-pointer active:scale-95"
          style={{ color: "var(--text-secondary)", background: "var(--background)", borderColor: "var(--border)" }}
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

        <div className="hidden sm:block h-5 w-[1px]" style={{ background: "var(--border)" }} />

        <div className="flex items-center">
          <h1
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--foreground)" }}
            className="text-base sm:text-sm font-semibold tracking-tight"
          >
            {breadcrumb.page}
          </h1>
        </div>
      </div>

      {/* DROITE : Toggle thème + Recherche + Créer + Avatar mobile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <ThemeSwitcher theme={theme} onToggle={toggleTheme} className="hidden sm:inline-flex" />

        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all w-48 lg:w-64"
          style={{ borderColor: "var(--border)", background: "var(--background)", color: "var(--text-secondary)" }}
        >
          <MagnifyingGlassIcon className="w-3.5 h-3.5 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher client, n°..."
            className="bg-transparent border-none outline-none text-xs w-full"
            style={{ color: "var(--foreground)" }}
          />
          <span
            className="text-[10px] font-mono px-1 py-0.5 rounded border"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            ⌘K
          </span>
        </div>

        {currentView !== "new" && (
          <button
            type="button"
            onClick={() => onViewChange("new")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            style={{ background: "var(--accent)", color: "var(--primary-foreground)" }}
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Créer un document</span>
            <span className="sm:hidden">Créer</span>
          </button>
        )}

        {/* Mobile ONLY : toggle thème + avatar */}
        <ThemeSwitcher theme={theme} onToggle={toggleTheme} className="sm:hidden" />

        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl border transition-colors cursor-pointer"
            style={{ borderColor: "var(--border)", background: "var(--background)" }}
            title="Menu profil"
          >
            <div
              className="relative w-8 h-8 rounded-lg border text-xs font-semibold flex items-center justify-center overflow-hidden"
              style={{ background: "var(--accent-tint)", borderColor: "var(--border)", color: "var(--accent)" }}
            >
              {workshop.logoUrl ? (
                <Image src={workshop.logoUrl} alt={workshop.name} fill className="object-cover" unoptimized />
              ) : (
                getInitials()
              )}
            </div>
          </button>

          {isDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />

              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl border p-2.5 z-50 text-xs shadow-2xl"
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <div className="px-3 py-2.5 border-b mb-1.5" style={{ borderColor: "var(--border)" }}>
                  <p className="font-semibold truncate" style={{ color: "var(--foreground)" }}>{workshop.name}</p>
                  <p className="text-[11px] truncate mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {workshop.city ? `${workshop.city}, ${workshop.country}` : workshop.activity}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("settings");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors text-left"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Cog6ToothIcon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <span>Paramètres de l&apos;Atelier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onViewChange("catalog");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors text-left"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <CheckBadgeIcon className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <span>Services</span>
                </button>

                <div className="border-t my-1" style={{ borderColor: "var(--border)" }} />

                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-colors text-left cursor-pointer"
                  style={{ color: "var(--danger)" }}
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
