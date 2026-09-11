import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import TopLoader from "@/components/ui/top-loader";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/lib/i18n/language-context";

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
  title: "Reflet — Ta visibilité dans les réponses IA",
  description:
    "Reflet mesure comment ChatGPT parle de ta marque, avec des preuves à l'appui. Scan gratuit, score de visibilité, opportunités priorisées pour PME, SaaS, e-commerce et agences.",
  keywords: [
    "visibilité IA",
    "GEO",
    "ChatGPT",
    "monitoring marque",
    "PME",
    "SaaS",
    "e-commerce",
    "agence marketing",
  ],
  openGraph: {
    title: "Reflet — Ta visibilité dans les réponses IA",
    description:
      "Vois où ta marque apparaît — et où elle est absente — quand on parle de ton secteur à ChatGPT.",
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
        <LanguageProvider>
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
        </LanguageProvider>
      </body>
    </html>
  );
}
