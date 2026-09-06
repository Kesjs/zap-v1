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
      label: "Documents",
      shortLabel: "Docs",
      icon: Squares2X2Icon,
    },
    {
      id: "new" as DashboardView,
      label: "Créer un document",
      shortLabel: "Créer",
      icon: PlusCircleIcon,
      highlight: true,
    },
    {
      id: "catalog" as DashboardView,
      label: "Services",
      shortLabel: "Services",
      icon: TagIcon,
    },
    {
      id: "settings" as DashboardView,
      label: "Mon Atelier",
      shortLabel: "Atelier",
      icon: Cog6ToothIcon,
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
        className={`hidden md:flex flex-col justify-between fixed top-0 bottom-0 left-0 z-40 bg-[#000000] border-r border-white/10 transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div
            className={`h-16 flex items-center border-b border-white/10 transition-all duration-300 ${
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
              <div className="relative w-9 h-9 rounded-lg bg-black overflow-hidden shrink-0 shadow-sm flex items-center justify-center border border-white/10">
                <Image
                  src="/log.jpg"
                  alt="ZAP"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {!isCollapsed && (
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk), sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "#FFFFFF",
                      lineHeight: 1,
                    }}
                  >
                    ZAP
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono tracking-wider bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                    PRO
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
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-all relative cursor-pointer ${
                    isCollapsed
                      ? "h-11 justify-center px-0"
                      : "h-10 px-3 gap-3 justify-start"
                  } ${
                    isActive
                      ? "bg-white/10 text-white font-medium border border-white/10 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon
                    className={`shrink-0 transition-colors ${
                      isCollapsed ? "w-5 h-5" : "w-4 h-4"
                    } ${isActive ? "text-white" : "text-zinc-400"}`}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!isCollapsed && item.highlight && (
                    <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-white/10 text-white border border-white/15">
                      +1
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section : Quota + Profile */}
        <div className="p-2 border-t border-white/10 space-y-2">
          {/* Quota Gauge Block */}
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <SparklesIcon className="w-3.5 h-3.5 text-zinc-300" />
                  Quota gratuit
                </span>
                <span className="font-mono text-white text-[11px]">
                  {documentCount}/{maxDocuments}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2.5">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${quotaPercent}%` }}
                />
              </div>

              <Link
                href="/#pricing"
                className="block text-center py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-medium text-white border border-white/10 transition-colors no-underline"
              >
                Passer au Plan Pro
              </Link>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-white/[0.03] border border-white/10 flex flex-col items-center justify-center text-[10px] font-mono text-zinc-300"
              title={`Quota : ${documentCount}/${maxDocuments} documents`}
            >
              <span className="text-white font-medium">{documentCount}</span>
              <span className="text-[8px] text-zinc-500">/{maxDocuments}</span>
            </div>
          )}

          {/* User Account / Logout row */}
          <div
            className={`flex items-center rounded-xl bg-white/[0.03] border border-white/10 transition-all ${
              isCollapsed ? "h-11 justify-center p-0" : "p-2 gap-2.5 justify-between"
            }`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                KM
              </div>
              {!isCollapsed && (
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="text-xs font-medium text-zinc-200 truncate">
                    Atelier Koffi
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate">
                    Cotonou, Bénin
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
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
              className="fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#000000] border-r border-white/10 flex flex-col justify-between p-4 md:hidden"
            >
              <div>
                {/* Mobile Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-lg bg-black overflow-hidden shadow-sm flex items-center justify-center border border-white/10">
                      <Image
                        src="/log.jpg"
                        alt="ZAP"
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-space-grotesk), sans-serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "#FFFFFF",
                      }}
                    >
                      ZAP
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white border border-white/10 bg-white/[0.04]"
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
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-white/10 text-white font-medium border border-white/10 shadow-sm"
                            : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-400"}`} />
                        <span className="flex-1 text-left">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Bottom Info */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-400">Quota gratuit</span>
                    <span className="font-mono text-white">{documentCount}/{maxDocuments}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${quotaPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-semibold flex items-center justify-center">
                      KM
                    </div>
                    <span className="text-xs font-medium text-zinc-200">Atelier Koffi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      onLogout?.();
                    }}
                    className="text-xs text-zinc-400 hover:text-red-400 cursor-pointer"
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
