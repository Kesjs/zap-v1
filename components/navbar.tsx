"use client";

import { useState, useEffect, type MouseEvent } from "react";
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
import { createClient } from "@/lib/supabase/client";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  // Hide landing navbar on dashboard, login and reset-password pages
  if (
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/reset-password")
  ) {
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
          {/* Logo — image seule (déjà fond noir + Z blanc), plus de cadre blanc, + wordmark ZAP */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 gap-2.5 transition-opacity hover:opacity-90"
            style={{ textDecoration: "none" }}
            aria-label="Accueil ZAP"
          >
            <div
              style={{
                position: "relative",
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image
                src="/log.jpg"
                alt="ZAP"
                width={36}
                height={36}
                priority
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "17px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
                lineHeight: 1,
              }}
            >
              ZAP
            </span>
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
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="hidden md:flex items-center transition-all duration-200 hover:scale-[1.02]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 2px 10px rgba(0, 0, 0, 0.3)",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.32)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.18)";
                }}
              >
                Tableau de bord
              </Link>
            ) : (
              <>
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
                  className="hidden md:flex items-center transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    padding: "7px 18px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 2px 10px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.32)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 0 16px rgba(255, 255, 255, 0.12)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.18)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 2px 10px rgba(0, 0, 0, 0.3)";
                  }}
                >
                  Inscription
                </Link>
              </>
            )}

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

          {isLoggedIn ? (
            <div style={{ padding: "8px 6px 4px" }}>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  padding: "11px 16px",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                }}
              >
                Tableau de bord
              </Link>
            </div>
          ) : (
            <>
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
                    fontWeight: 500,
                    color: "#FFFFFF",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    padding: "11px 16px",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                  }}
                >
                  Inscription
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
