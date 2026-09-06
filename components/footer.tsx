"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "1px solid #1a1a1a",
        padding: "64px 24px 36px",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        {/* 3 Columns Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "48px",
            marginBottom: "52px",
          }}
        >
          {/* Col 1: Brand with new logo + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Link
              href="/"
              className="flex items-center gap-2.5"
              style={{ textDecoration: "none", width: "fit-content" }}
            >
              <div
                style={{
                  position: "relative",
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="ZAP Logo"
                  width={28}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "22px",
                  color: "#D4AF37",
                  letterSpacing: "-0.02em",
                }}
              >
                ZAP
              </span>
            </Link>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(244, 244, 245, 0.50)",
                lineHeight: 1.65,
                maxWidth: "280px",
                margin: 0,
              }}
            >
              Le carnet de reçus, devis et factures officiel et numérique pour
              les entrepreneurs et indépendants africains.
            </p>
          </div>

          {/* Col 2: Produit */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(244, 244, 245, 0.40)",
                marginBottom: "16px",
              }}
            >
              Produit
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Produit", href: "#produit" },
                { label: "Tarifs", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "rgba(244, 244, 245, 0.60)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#D4AF37";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(244, 244, 245, 0.60)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(244, 244, 245, 0.40)",
                marginBottom: "16px",
              }}
            >
              Support
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Contact", href: "mailto:contact@zap.africa" },
                { label: "WhatsApp", href: "https://wa.me/22900000000" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "rgba(244, 244, 245, 0.60)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#D4AF37";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color =
                        "rgba(244, 244, 245, 0.60)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            borderTop: "1px solid #262626",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              color: "rgba(244, 244, 245, 0.50)",
              margin: 0,
            }}
          >
            © 2025 ZAP
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "rgba(244, 244, 245, 0.50)",
                textDecoration: "none",
              }}
            >
              Mentions légales
            </Link>
            <span style={{ color: "rgba(244, 244, 245, 0.25)" }}>·</span>
            <Link
              href="#"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "rgba(244, 244, 245, 0.50)",
                textDecoration: "none",
              }}
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
