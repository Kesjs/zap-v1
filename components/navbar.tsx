"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars2Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePathname } from "next/navigation";

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13.5px",
  fontWeight: 400,
  color: "#A1A1AA",
  padding: "6px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "all 0.2s ease",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const dropdownItemStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13.5px",
  color: "#D4D4D8",
  padding: "9px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "all 0.15s ease",
};



// Pages dédiées par métier
const solutionsItems = [
  { label: "Menuiserie & Bois", href: "/solutions/menuiserie-bois" },
  { label: "Couture & Mode", href: "/solutions/couture-mode" },
  { label: "BTP & Électricité", href: "/solutions/btp-electricite" },
  { label: "Mécanique & Auto", href: "/solutions/mecanique-auto" },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          style={navLinkStyle}
          className="flex items-center gap-1 hover:text-white"
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            (e.currentTarget as HTMLElement).style.color = "#A1A1AA";
          }}
        >
          {label}
          <ChevronDownIcon style={{ width: 13, height: 13 }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        style={{
          background: "#0F0F10",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "12px",
          padding: "6px",
          minWidth: "230px",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.7)",
        }}
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link
              href={item.href}
              style={dropdownItemStyle}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)";
                (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#D4D4D8";
              }}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide landing navbar on dashboard and login pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3">
      {/* Floating pill navbar */}
      <nav
        className="w-full max-w-5xl"
        style={{
          background: "rgba(10, 10, 10, 0.78)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "14px",
          height: "52px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="flex items-center justify-between h-full px-4 sm:px-5">
          {/* Logo — grand, lisible, sur fond blanc aux coins arrondis, sans texte redondant */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 transition-opacity hover:opacity-90"
            style={{ textDecoration: "none" }}
            aria-label="Accueil ZAP"
          >
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                background: "#FFFFFF",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
                padding: "2px",
              }}
            >
              <Image
                src="/logo.png"
                alt="ZAP"
                width={38}
                height={38}
                priority
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/#fonctionnalites"
              style={navLinkStyle}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#A1A1AA";
              }}
            >
              Fonctionnalités
            </Link>
            <NavDropdown label="Solutions" items={solutionsItems} />
            <Link
              href="/#pricing"
              style={navLinkStyle}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#A1A1AA";
              }}
            >
              Tarifs
            </Link>
          </div>

          {/* Right: Connexion + CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/login?tab=login"
              className="hidden md:flex items-center transition-colors"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13.5px",
                fontWeight: 400,
                color: "#A1A1AA",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#A1A1AA";
              }}
            >
              Connexion
            </Link>

            <Link
              href="/login?tab=register"
              className="hero-cta hidden md:flex items-center transition-transform hover:scale-105"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#000000",
                background: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
              }}
            >
              Commencer gratuitement
            </Link>

            {/* Mobile hamburger with 44px touch target */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                color: "#FFFFFF",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                width: "44px",
                height: "44px",
                padding: "10px",
                borderRadius: "8px",
              }}
              aria-label={
                isMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"
              }
              id="navbar-menu-toggle"
            >
              {isMenuOpen ? (
                <XMarkIcon style={{ width: 24, height: 24 }} />
              ) : (
                <Bars2Icon style={{ width: 24, height: 24 }} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className="absolute top-16 left-4 right-4 md:hidden"
          style={{
            background: "rgba(12, 12, 12, 0.96)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Direct link for Fonctionnalités */}
          <Link
            href="/#fonctionnalites"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#FFFFFF",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Fonctionnalités
          </Link>

          {/* Solutions Accordion */}
          <details className="nav-accordion">
            <summary
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                color: "#FFFFFF",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Solutions
              <ChevronDownIcon className="nav-accordion-icon" style={{ width: 16, height: 16 }} />
            </summary>
            <div style={{ display: "flex", flexDirection: "column", padding: "2px 14px 8px 22px" }}>
              {solutionsItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#A1A1AA",
                    textDecoration: "none",
                    padding: "10px 0",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href="/#pricing"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#FFFFFF",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Tarifs
          </Link>

          <Link
            href="/login?tab=login"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#A1A1AA",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Connexion
          </Link>

          <div style={{ padding: "8px 6px 4px" }}>
            <Link
              href="/login?tab=register"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#000000",
                background: "#FFFFFF",
                padding: "11px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
              }}
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
