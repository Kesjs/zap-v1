"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Squares2X2Icon,
  PlusCircleIcon,
  TagIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SparklesIcon,
  XMarkIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "./sidebar-context";

export type DashboardView = "registry" | "new" | "catalog" | "settings" | "pdf-preview";

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  documentCount?: number;
  maxDocuments?: number;
  onLogout?: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  documentCount = 3,
  maxDocuments = 8,
  onLogout,
}: SidebarProps) {
  const { isCollapsed, isOpenMobile, closeMobile } = useSidebar();

  const navItems = [
    {
      id: "registry" as DashboardView,
      label: "Registre des ventes",
      shortLabel: "Registre",
      icon: Squares2X2Icon,
      badge: "Actif",
    },
    {
      id: "new" as DashboardView,
      label: "Nouveau document",
      shortLabel: "Créer",
      icon: PlusCircleIcon,
      highlight: true,
    },
    {
      id: "catalog" as DashboardView,
      label: "Catalogue d'articles",
      shortLabel: "Catalogue",
      icon: TagIcon,
    },
    {
      id: "settings" as DashboardView,
      label: "Profil & Empreinte",
      shortLabel: "Paramètres",
      icon: Cog6ToothIcon,
    },
    {
      id: "pdf-preview" as DashboardView,
      label: "Aperçu PDF (test)",
      shortLabel: "Aperçu PDF",
      icon: BeakerIcon,
    },
  ];

  const quotaPercent = Math.min(100, Math.round((documentCount / maxDocuments) * 100));

  const handleNavClick = (view: DashboardView) => {
    onViewChange(view);
    closeMobile();
  };

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────────────
          1. DESKTOP SIDEBAR : COLLAPSIBLE (240px <-> 68px)
      ────────────────────────────────────────────────────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col justify-between fixed top-0 bottom-0 left-0 z-40 bg-[#000000] border-r border-[#262626] transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div
            className={`h-16 flex items-center border-b border-[#262626] transition-all duration-300 ${
              isCollapsed ? "justify-center px-2" : "px-4"
            }`}
          >
            {/* Logo Link to Home — le bouton collapse/expand vit désormais uniquement
                dans le header (un seul déclencheur pour éviter le doublon). */}
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline group overflow-hidden"
              title="ZAP — Retour à l'accueil"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[#262626] bg-[#171717]">
                <Image
                  src="/logo.png"
                  alt="ZAP Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col leading-none overflow-hidden">
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "18px",
                      letterSpacing: "0.08em",
                      color: "#F4F4F5",
                    }}
                  >
                    ZAP
                  </span>
                  <span className="text-[10px] text-[#D4AF37] font-mono tracking-wider mt-0.5">
                    COCKPIT PRO
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-colors relative cursor-pointer ${
                    isCollapsed
                      ? "h-11 justify-center px-0"
                      : "h-10 px-3 gap-3 justify-start"
                  } ${
                    isActive
                      ? "bg-[#262626] text-[#D4AF37] font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#D4AF37] rounded-r-sm" />
                  )}

                  <Icon
                    className={`shrink-0 transition-colors ${
                      isCollapsed ? "w-5 h-5" : "w-4 h-4"
                    } ${isActive ? "text-[#D4AF37]" : "text-neutral-400"}`}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!isCollapsed && item.highlight && (
                    <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      +1
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section : Quota + Profile */}
        <div className="p-2 border-t border-[#262626] space-y-2">
          {/* Quota Gauge Block */}
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-[#171717] border border-[#262626]">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Quota gratuit
                </span>
                <span className="font-mono text-neutral-300 text-[11px]">
                  {documentCount}/{maxDocuments}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden mb-2.5">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E2B170] transition-all duration-300"
                  style={{ width: `${quotaPercent}%` }}
                />
              </div>

              <Link
                href="/#pricing"
                className="block text-center py-1.5 px-2 rounded-lg bg-[#262626] hover:bg-[#303030] text-[11px] font-medium text-[#D4AF37] transition-colors no-underline"
              >
                Passer au Plan Pro
              </Link>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-[#171717] border border-[#262626] flex flex-col items-center justify-center text-[10px] font-mono text-[#D4AF37]"
              title={`Quota : ${documentCount}/${maxDocuments} documents`}
            >
              <span>{documentCount}</span>
              <span className="text-[8px] text-neutral-500">/{maxDocuments}</span>
            </div>
          )}

          {/* User Account / Logout row */}
          <div
            className={`flex items-center rounded-xl bg-[#171717] border border-[#262626] transition-all ${
              isCollapsed ? "h-11 justify-center p-0" : "p-2 gap-2.5 justify-between"
            }`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold flex items-center justify-center shrink-0">
                KM
              </div>
              {!isCollapsed && (
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="text-xs font-medium text-neutral-200 truncate">
                    Atelier Koffi
                  </span>
                  <span className="text-[10px] text-neutral-500 truncate">
                    Cotonou, Bénin
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-[#262626] transition-colors cursor-pointer"
                title="Déconnexion"
              >
                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ──────────────────────────────────────────────────────────────────────────
          2. MOBILE DRAWER (SUR SMARTPHONE)
      ────────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-50 bg-black/85 md:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#121212] border-r border-[#262626] flex flex-col justify-between p-4 md:hidden"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#262626] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#262626] bg-[#171717]">
                      <Image
                        src="/logo.png"
                        alt="ZAP"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "20px",
                        color: "#F4F4F5",
                      }}
                    >
                      ZAP
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white border border-[#262626] bg-[#171717]"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = currentView === item.id;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-[#262626] text-[#D4AF37] font-semibold border-l-2 border-[#D4AF37]"
                            : "text-neutral-400 hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#D4AF37]" : "text-neutral-400"}`} />
                        <span className="flex-1 text-left">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Bottom Info */}
              <div className="space-y-3 pt-4 border-t border-[#262626]">
                <div className="p-3 rounded-xl bg-[#171717] border border-[#262626]">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-neutral-400">Quota gratuit</span>
                    <span className="font-mono text-[#D4AF37]">{documentCount}/{maxDocuments}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#262626] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E2B170]"
                      style={{ width: `${quotaPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-[#171717] border border-[#262626]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] text-xs font-semibold flex items-center justify-center">
                      KM
                    </div>
                    <span className="text-xs font-medium text-neutral-200">Atelier Koffi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      onLogout?.();
                    }}
                    className="text-xs text-neutral-400 hover:text-red-400 cursor-pointer"
                  >
                    <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
