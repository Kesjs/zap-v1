"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide landing navbar on dashboard and login pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/login")) {
    return null;
  }

  const navLinks = [
    { label: "Fonctionnalités", href: "/#produit" },
    { label: "Tarifs", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Connexion", href: "/login?tab=login" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3">
      {/* Floating pill navbar */}
      <nav
        className="w-full max-w-5xl"
        style={{
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid #262626",
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
                color: "#D4AF37",
                letterSpacing: "-0.02em",
              }}
            >
              ZAP
            </span>
          </Link>

          {/* Center nav links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 400,
                  color: "rgba(244, 244, 245, 0.70)",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.target as HTMLElement).style.color = "#D4AF37";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  (e.target as HTMLElement).style.color =
                    "rgba(244, 244, 245, 0.70)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA + mobile hamburger */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop */}
            <Link
              href="/login?tab=register"
              className="hero-cta hidden md:flex items-center"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                color: "#0C0C0C",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
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
                color: "rgba(244, 244, 245, 0.85)",
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
                <Bars3Icon style={{ width: 24, height: 24 }} />
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
            background: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(16px)",
            border: "1px solid #262626",
            borderRadius: "12px",
            padding: "12px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(244, 244, 245, 0.80)",
                padding: "10px 14px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
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
                color: "#0C0C0C",
                background: "linear-gradient(135deg, #D4AF37 0%, #E2B170 100%)",
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
