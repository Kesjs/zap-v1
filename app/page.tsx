import dynamic from "next/dynamic";
import Hero from "@/components/hero";

const CraftsMarquee = dynamic(() => import("@/components/crafts-marquee"));
const FeaturesBento = dynamic(() => import("@/components/features-bento"));
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const Testimonials = dynamic(() => import("@/components/testimonials"));
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
        background: "#09090B",
      }}
    >
      <Hero />
      <div className="below-fold" style={{ background: "#09090B" }}>
        <CraftsMarquee />
        <FeaturesBento />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
        <Footer />
      </div>
    </main>
  );
}
