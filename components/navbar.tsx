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
  color: "rgba(28, 43, 69, 0.75)",
  padding: "6px 12px",
  borderRadius: "8px",
  textDecoration: "none",
  transition: "color 0.2s ease",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const dropdownItemStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "13.5px",
  color: "#1C2B45",
  padding: "9px 10px",
  borderRadius: "8px",
  textDecoration: "none",
};

// Ces liens pointent tous vers la même section pour l'instant : elle couvre déjà
// ces 4 aspects du produit. À éclater en ancres dédiées si des sous-sections
// séparées sont créées plus tard.
const produitItems = [
  { label: "Devis & Factures", href: "/#fonctionnalites" },
  { label: "Reçus de paiement", href: "/#fonctionnalites" },
  { label: "Signature & Cachet numérique", href: "/#fonctionnalites" },
  { label: "Catalogue de prestations", href: "/#fonctionnalites" },
];

// Pages dédiées par métier — à créer, n'existent pas encore.
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
          className="flex items-center gap-1"
          onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
            (e.currentTarget as HTMLElement).style.color = "#B8502E";
          }}
          onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
            (e.currentTarget as HTMLElement).style.color = "rgba(28, 43, 69, 0.75)";
          }}
        >
          {label}
          <ChevronDownIcon style={{ width: 13, height: 13 }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(28, 43, 69, 0.12)",
          borderRadius: "12px",
          padding: "6px",
          minWidth: "230px",
          boxShadow: "0 16px 40px rgba(28, 43, 69, 0.16)",
        }}
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link
              href={item.href}
              style={dropdownItemStyle}
              onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(28, 43, 69, 0.06)";
              }}
              onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
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
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(28, 43, 69, 0.12)",
          borderRadius: "14px",
          height: "52px",
        }}
      >
        <div className="flex items-center justify-between h-full px-4 sm:px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                position: "relative",
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src="/logo.png"
                alt="ZAP Logo"
                width={28}
                height={28}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "21px",
                fontWeight: 400,
                color: "#1C2B45",
                letterSpacing: "-0.02em",
              }}
            >
              ZAP
            </span>
          </Link>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center gap-1">
            <NavDropdown label="Produit" items={produitItems} />
            <NavDropdown label="Solutions" items={solutionsItems} />
            <Link
              href="/#pricing"
              style={navLinkStyle}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "#B8502E";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                (e.target as HTMLElement).style.color = "rgba(28, 43, 69, 0.75)";
              }}
            >
              Tarifs
            </Link>
          </div>

          {/* Right: Connexion + CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/login?tab=login"
              className="hidden md:flex items-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13.5px",
                fontWeight: 400,
                color: "rgba(28, 43, 69, 0.75)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Connexion
            </Link>

            <Link
              href="/login?tab=register"
              className="hero-cta hidden md:flex items-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#F4EEE2",
                background: "linear-gradient(135deg, #1C2B45 0%, #2C3A5C 100%)",
                padding: "8px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Commencer gratuitement
            </Link>

            {/* Mobile hamburger with 44px touch target */}
            <button
              className="md:hidden flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                color: "rgba(28, 43, 69, 0.85)",
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
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(28, 43, 69, 0.12)",
            borderRadius: "12px",
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {[
            { label: "Produit", items: produitItems },
            { label: "Solutions", items: solutionsItems },
          ].map((group) => (
            <details key={group.label} className="nav-accordion">
              <summary
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "rgba(28, 43, 69, 0.85)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                }}
              >
                {group.label}
                <ChevronDownIcon className="nav-accordion-icon" style={{ width: 16, height: 16 }} />
              </summary>
              <div style={{ display: "flex", flexDirection: "column", padding: "2px 14px 8px 22px" }}>
                {group.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(28, 43, 69, 0.65)",
                      textDecoration: "none",
                      padding: "12px 0",
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
          ))}

          <Link
            href="/#pricing"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              color: "rgba(28, 43, 69, 0.85)",
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
              fontWeight: 400,
              color: "rgba(28, 43, 69, 0.85)",
              padding: "10px 14px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Connexion
          </Link>

          <div style={{ padding: "8px 6px 2px" }}>
            <Link
              href="/login?tab=register"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#F4EEE2",
                background: "linear-gradient(135deg, #1C2B45 0%, #2C3A5C 100%)",
                padding: "10px 16px",
                borderRadius: "8px",
                textDecoration: "none",
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
