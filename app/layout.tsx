import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import TopLoader from "@/components/ui/top-loader";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAP — Devis, Factures & Reçus Officiels pour Entrepreneurs Africains",
  description:
    "Créez vos devis, factures et reçus en moins de 60 secondes avec votre cachet d'atelier apposé automatiquement. L'outil officiel pour artisans et indépendants d'Afrique de l'Ouest.",
  keywords: [
    "facture",
    "devis",
    "reçu",
    "artisan",
    "Afrique de l'Ouest",
    "Wave",
    "Orange Money",
    "FCFA",
    "document officiel",
  ],
  openGraph: {
    title: "ZAP — Documents officiels en 60 secondes",
    description:
      "Votre cachet, votre signature et vos informations réunis pour offrir une image professionnelle à chaque client.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${dmSans.variable} ${dmSerif.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className={`${dmSans.className} antialiased`} style={{ background: "#000000" }}>
        <TopLoader />
        <Toaster
          position="top-right"
          theme="dark"
          closeButton
          toastOptions={{
            style: {
              background: "#0A0A0A",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#F4F4F5",
              borderRadius: "14px",
              boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.9)",
            },
          }}
        />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
