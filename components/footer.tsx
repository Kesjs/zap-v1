"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer
      style={{
        background: "#09090B",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
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
          {/* Col 1: Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90 group"
              style={{ textDecoration: "none", width: "fit-content" }}
              aria-label="Accueil Reflet"
            >
              <div
                style={{
                  position: "relative",
                  width: "42px",
                  height: "42px",
                  background: "#000000",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.6)",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo-mark.png"
                  alt="Reflet"
                  width={42}
                  height={42}
                  className="transition-transform duration-300"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-space-grotesk), sans-serif",
                  fontSize: "21px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                Reflet
              </span>
            </Link>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "#A1A1AA",
                lineHeight: 1.65,
                maxWidth: "280px",
                margin: 0,
              }}
            >
              {f.description}
            </p>
          </div>

          {/* Col 2: Produit */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              {f.productHeading}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {f.productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "#A1A1AA",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#A1A1AA";
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
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              {f.supportHeading}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {[{ label: f.emailLabel, href: "mailto:contact@reflet.app" }].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      color: "#A1A1AA",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      (e.target as HTMLElement).style.color = "#A1A1AA";
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
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
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
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.45)",
              margin: 0,
            }}
          >
            {f.copyright(new Date().getFullYear())}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.45)",
                textDecoration: "none",
              }}
            >
              {f.legalNotice}
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
            <Link
              href="/cgu"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.45)",
                textDecoration: "none",
              }}
            >
              {f.terms}
            </Link>
            <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>·</span>
            <Link
              href="/confidentialite"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.45)",
                textDecoration: "none",
              }}
            >
              {f.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
