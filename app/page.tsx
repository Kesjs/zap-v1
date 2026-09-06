import dynamic from "next/dynamic";
import Hero from "@/components/hero";

const CraftsMarquee = dynamic(() => import("@/components/crafts-marquee"));
const SignatureSeal = dynamic(() => import("@/components/signature-seal"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
const CatalogRegistry = dynamic(() => import("@/components/catalog-registry"));
const TrustBanner = dynamic(() => import("@/components/trust-banner"));
const Pricing = dynamic(() => import("@/components/pricing"));
const Faq = dynamic(() => import("@/components/faq"));
const FinalCta = dynamic(() => import("@/components/final-cta"));
const Footer = dynamic(() => import("@/components/footer"));

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100dvh",
        background: "#000000",
      }}
    >
      <Hero />
      <div className="below-fold">
        <div id="fonctionnalites">
          <CraftsMarquee />
          <SignatureSeal />
          <CatalogRegistry />
        </div>
        <HowItWorks />
        <Testimonials />
        <TrustBanner />
        <Pricing />
        <Faq />
        <FinalCta />
        <Footer />
      </div>
    </main>
  );
}
