"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  HomeIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  TagIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSidebar } from "./sidebar-context";
import { useWorkshop } from "./workshop-context";

export type DashboardView =
  | "home"
  | "new"
  | "documents"
  | "catalog"
  | "settings"
  | "registry"
  | "pdf-preview";

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
  const { workshop, getInitials } = useWorkshop();

  const navItems = [
    { id: "home" as DashboardView, label: "Accueil", icon: HomeIcon },
    { id: "new" as DashboardView, label: "Créer un document", icon: PlusCircleIcon },
    { id: "documents" as DashboardView, label: "Mes documents", icon: DocumentTextIcon },
    { id: "catalog" as DashboardView, label: "Services", icon: TagIcon },
    { id: "settings" as DashboardView, label: "Paramètres", icon: Cog6ToothIcon },
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
        className={`hidden md:flex flex-col justify-between fixed top-0 bottom-0 left-0 z-40 border-r transition-all duration-300 ease-in-out select-none ${
          isCollapsed ? "w-[68px]" : "w-[240px]"
        }`}
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Top Header & Logo */}
        <div>
          <div
            className={`h-16 flex items-center border-b transition-all duration-300 ${
              isCollapsed ? "justify-center px-2" : "px-4"
            }`}
            style={{ borderColor: "var(--border)" }}
          >
            <button
              type="button"
              onClick={() => onViewChange("settings")}
              className="flex items-center gap-2.5 no-underline group overflow-hidden text-left cursor-pointer w-full"
              title={`${workshop.name} — Modifier les paramètres`}
            >
              <div
                className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 shadow-sm flex items-center justify-center border"
                style={{ background: "var(--accent-tint)", borderColor: "var(--border)" }}
              >
                {workshop.logoUrl ? (
                  <Image src={workshop.logoUrl} alt={workshop.name} fill className="object-cover" unoptimized />
                ) : (
                  <span className="text-xs font-bold tracking-wider" style={{ color: "var(--accent)" }}>
                    {getInitials()}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <div className="flex flex-col overflow-hidden leading-tight">
                  <span className="text-xs font-semibold truncate transition-colors" style={{ color: "var(--foreground)" }}>
                    {workshop.name}
                  </span>
                  <span className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>
                    {workshop.city ? `${workshop.city}, ${workshop.country}` : workshop.activity}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-2 space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive =
                currentView === item.id || (item.id === "documents" && currentView === "registry");
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-xl text-xs font-medium transition-all relative cursor-pointer border ${
                    isCollapsed ? "h-11 justify-center px-0" : "h-10 px-3 gap-3 justify-start"
                  }`}
                  style={
                    isActive
                      ? { background: "var(--accent-tint-strong)", color: "var(--foreground)", borderColor: "var(--accent-tint-strong)" }
                      : { background: "transparent", color: "var(--text-secondary)", borderColor: "transparent" }
                  }
                >
                  <Icon
                    className={`shrink-0 transition-colors ${isCollapsed ? "w-5 h-5" : "w-4 h-4"}`}
                    style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }}
                  />
                  {!isCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section : Quota + Profile */}
        <div className="p-2 border-t space-y-2" style={{ borderColor: "var(--border)" }}>
          {!isCollapsed ? (
            <div className="p-3 rounded-xl border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  <SparklesIcon className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                  Quota gratuit
                </span>
                <span className="font-mono text-[11px]" style={{ color: "var(--foreground)" }}>
                  {documentCount}/{maxDocuments}
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full overflow-hidden mb-2.5" style={{ background: "var(--border)" }}>
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${quotaPercent}%`, background: "var(--accent)" }}
                />
              </div>

              <Link
                href="/#pricing"
                className="block text-center py-1.5 px-2 rounded-lg text-[11px] font-medium border transition-colors no-underline"
                style={{ background: "var(--accent-tint)", color: "var(--accent)", borderColor: "var(--accent-tint-strong)" }}
              >
                Passer au Plan Pro
              </Link>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl border flex flex-col items-center justify-center text-[10px] font-mono"
              style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
              title={`Quota : ${documentCount}/${maxDocuments} documents`}
            >
              <span className="font-medium" style={{ color: "var(--foreground)" }}>{documentCount}</span>
              <span className="text-[8px]">/{maxDocuments}</span>
            </div>
          )}

          {/* User Account / Logout row */}
          <div
            className={`flex items-center rounded-xl border transition-all ${
              isCollapsed ? "h-11 justify-center p-0" : "p-2 gap-2.5 justify-between"
            }`}
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div
                className="relative w-7 h-7 rounded-lg border text-xs font-semibold flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: "var(--accent-tint)", borderColor: "var(--border)", color: "var(--accent)" }}
              >
                {workshop.logoUrl ? (
                  <Image src={workshop.logoUrl} alt={workshop.name} fill className="object-cover" unoptimized />
                ) : (
                  getInitials()
                )}
              </div>
              {!isCollapsed && (
                <div className="flex flex-col leading-tight overflow-hidden">
                  <span className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
                    {workshop.name}
                  </span>
                  <span className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>
                    {workshop.city ? `${workshop.city}, ${workshop.country}` : "Bénin"}
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button
                type="button"
                onClick={onLogout}
                className="p-1.5 rounded-lg transition-colors cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--danger)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-50 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)" }}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-[280px] border-r flex flex-col justify-between p-4 md:hidden"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: "var(--border)" }}>
                  <button
                    type="button"
                    onClick={() => {
                      onViewChange("settings");
                      closeMobile();
                    }}
                    className="flex items-center gap-2.5 text-left cursor-pointer overflow-hidden"
                  >
                    <div
                      className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm flex items-center justify-center border shrink-0"
                      style={{ background: "var(--accent-tint)", borderColor: "var(--border)" }}
                    >
                      {workshop.logoUrl ? (
                        <Image src={workshop.logoUrl} alt={workshop.name} fill className="object-cover" unoptimized />
                      ) : (
                        <span className="text-xs font-bold tracking-wider" style={{ color: "var(--accent)" }}>
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col leading-tight overflow-hidden">
                      <span className="text-sm font-semibold truncate" style={{ color: "var(--foreground)" }}>
                        {workshop.name}
                      </span>
                      <span className="text-[11px] truncate" style={{ color: "var(--text-secondary)" }}>
                        {workshop.city ? `${workshop.city}, ${workshop.country}` : workshop.activity}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="p-1.5 rounded-lg border"
                    style={{ color: "var(--text-secondary)", borderColor: "var(--border)", background: "var(--background)" }}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive =
                      currentView === item.id || (item.id === "documents" && currentView === "registry");
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors border relative"
                        style={
                          isActive
                            ? { background: "var(--accent-tint-strong)", color: "var(--foreground)", borderColor: "var(--accent-tint-strong)" }
                            : { background: "transparent", color: "var(--text-secondary)", borderColor: "transparent" }
                        }
                      >
                        <Icon className="w-5 h-5" style={{ color: isActive ? "var(--accent)" : "var(--text-secondary)" }} />
                        <span className="flex-1 text-left">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="p-3 rounded-xl border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--text-secondary)" }}>Quota gratuit</span>
                    <span className="font-mono" style={{ color: "var(--foreground)" }}>{documentCount}/{maxDocuments}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                    <div className="h-full transition-all duration-300" style={{ width: `${quotaPercent}%`, background: "var(--accent)" }} />
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl border" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div
                      className="relative w-7 h-7 rounded-lg border text-xs font-semibold flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ background: "var(--accent-tint)", borderColor: "var(--border)", color: "var(--accent)" }}
                    >
                      {workshop.logoUrl ? (
                        <Image src={workshop.logoUrl} alt={workshop.name} fill className="object-cover" unoptimized />
                      ) : (
                        getInitials()
                      )}
                    </div>
                    <span className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
                      {workshop.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobile();
                      onLogout?.();
                    }}
                    className="text-xs cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
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
