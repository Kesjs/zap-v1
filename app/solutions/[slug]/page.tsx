import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  WrenchScrewdriverIcon,
  ScissorsIcon,
  SparklesIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Footer from "@/components/footer";

interface SolutionData {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: typeof WrenchScrewdriverIcon;
  benefits: {
    title: string;
    description: string;
    icon: typeof CheckBadgeIcon;
  }[];
  sampleDocument: {
    type: string;
    reference: string;
    client: string;
    items: { label: string; amount: string }[];
    total: string;
    deposit: string;
    balance: string;
  };
}

const solutionsData: Record<string, SolutionData> = {
  "menuiserie-bois": {
    slug: "menuiserie-bois",
    badge: "Menuiserie & Travaux du Bois",
    title: "Chiffrez vos ouvrages, sécurisez vos acomptes et signez sur place.",
    subtitle:
      "Fini les devis approximatifs sur des bouts de bois ou les acomptes non formalisés. Estimez la matière première, la quincaillerie et la pose, et recevez votre avance avant de découper la première pièce.",
    icon: SparklesIcon,
    benefits: [
      {
        title: "Acompte bois garanti",
        description:
          "Enregistrez l'acompte nécessaire à l'achat du bois sans jamais avancer vos fonds personnels.",
        icon: CalculatorIcon,
      },
      {
        title: "Signature avant débit",
        description:
          "Faites valider les cotes, l'essence de bois et les finitions directement sur votre smartphone.",
        icon: PencilSquareIcon,
      },
      {
        title: "Envoi WhatsApp direct",
        description:
          "Transmettez le devis PDF soigné à votre client dès la fin de la prise de mesures.",
        icon: PaperAirplaneIcon,
      },
    ],
    sampleDocument: {
      type: "Devis d'Atelier",
      reference: "DEV-MB-2025-014",
      client: "Résidence M. Lawson · Cotonou",
      items: [
        { label: "Table de salle à manger Teck massif (180x90cm)", amount: "180 000 FCFA" },
        { label: "Quincaillerie & assemblage tenon-mortaise", amount: "25 000 FCFA" },
        { label: "Finition vernis mat protecteur 3 couches", amount: "35 000 FCFA" },
      ],
      total: "240 000 FCFA",
      deposit: "144 000 FCFA (Acompte 60%)",
      balance: "96 000 FCFA (À la livraison)",
    },
  },
  "couture-mode": {
    slug: "couture-mode",
    badge: "Couture, Stylisme & Mode",
    title: "Validez le modèle, enregistrez l'acompte tissu et respectez vos délais.",
    subtitle:
      "Évitez les clientes qui contestent les prix ou oublient de régler leur solde. Émettez un reçu officiel précisant le tissu confié, le modèle retenu, l'acompte perçu et la date exacte d'essayage.",
    icon: ScissorsIcon,
    benefits: [
      {
        title: "Preuve du tissu & mesures",
        description:
          "Documentez les spécificités du tissu confié et les détails du modèle pour zéro contestation.",
        icon: CheckBadgeIcon,
      },
      {
        title: "Date d'essayage convenue",
        description:
          "Indiquez l'échéance claire sur le document partagé avec votre cliente sur WhatsApp.",
        icon: PaperAirplaneIcon,
      },
      {
        title: "Solde automatique au retrait",
        description:
          "Le client sait exactement combien régler pour récupérer sa tenue terminée.",
        icon: CalculatorIcon,
      },
    ],
    sampleDocument: {
      type: "Reçu d'Acompte & Commande",
      reference: "REC-CT-2025-089",
      client: "Mme Adanho · Abidjan",
      items: [
        { label: "Confection ensemble veste & jupe sur-mesure (Tissu Bazin fourni)", amount: "45 000 FCFA" },
        { label: "Broderie artisanale fils dorés col & manches", amount: "20 000 FCFA" },
        { label: "Fournitures atelier (doublure satin, zip invisible)", amount: "10 000 FCFA" },
      ],
      total: "75 000 FCFA",
      deposit: "50 000 FCFA (Acompte perçu)",
      balance: "25 000 FCFA (Solde à l'essayage)",
    },
  },
  "btp-electricite": {
    slug: "btp-electricite",
    badge: "BTP, Électricité & Plomberie",
    title: "Chiffrez vos chantiers avec rigueur et facturez par palier d'avancement.",
    subtitle:
      "Que vous interveniez chez un particulier ou en sous-traitance pour une entreprise, émettez des devis conformes avec cachet certifié, gestion des fournitures et acomptes par phase de travaux.",
    icon: BuildingOffice2Icon,
    benefits: [
      {
        title: "Facturation par tranches",
        description:
          "Échelonnez les paiements : acompte de démarrage, second œuvre, et solde à la réception.",
        icon: CalculatorIcon,
      },
      {
        title: "Cachet officiel d'entreprise",
        description:
          "Votre sceau numérique ZAP donne à vos devis l'autorité exigée par les maîtres d'ouvrage.",
        icon: CheckBadgeIcon,
      },
      {
        title: "Catalogue de fournitures",
        description:
          "Insérez vos disjoncteurs, câbles et tuyaux préenregistrés avec vos marges en un clic.",
        icon: PencilSquareIcon,
      },
    ],
    sampleDocument: {
      type: "Devis Travaux & Rénovation",
      reference: "DEV-BTP-2025-042",
      client: "Immeuble Le Balisier · Lomé",
      items: [
        { label: "Tableau électrique principal 18 modules conforme", amount: "95 000 FCFA" },
        { label: "Tirage de lignes blindées & pose prises/interrupteurs (x12)", amount: "72 000 FCFA" },
        { label: "Main-d'œuvre raccordement, mise à la terre & tests", amount: "50 000 FCFA" },
      ],
      total: "217 000 FCFA",
      deposit: "108 500 FCFA (Acompte 50%)",
      balance: "108 500 FCFA (Solde fin de chantier)",
    },
  },
  "mecanique-auto": {
    slug: "mecanique-auto",
    badge: "Mécanique, Garage & Diagnostic Auto",
    title: "Ordre de réparation signé, pièces détaillées et transparence totale.",
    subtitle:
      "Détaillez clairement les pièces d'usure remplacées, les forfaits révision et la main-d'œuvre de diagnostic. Faites signer l'accord de réparation au doigt avant de commencer les travaux sous le capot.",
    icon: WrenchScrewdriverIcon,
    benefits: [
      {
        title: "Accord de travaux signé au doigt",
        description:
          "Le propriétaire valide le diagnostic et le montant estimé avant l'engagement des frais.",
        icon: PencilSquareIcon,
      },
      {
        title: "Détail pièces vs main-d'œuvre",
        description:
          "Une clarté totale qui élimine tout soupçon et renforce la fidélité de votre clientèle.",
        icon: CheckBadgeIcon,
      },
      {
        title: "Facture PDF sur WhatsApp",
        description:
          "L'automobiliste conserve son historique d'entretien officiel directement dans son téléphone.",
        icon: PaperAirplaneIcon,
      },
    ],
    sampleDocument: {
      type: "Facture d'Entretien & Réparation",
      reference: "FAC-MEC-2025-112",
      client: "Toyota Corolla · M. Kpodar · Dakar",
      items: [
        { label: "Kit de distribution complet + Pompe à eau d'origine", amount: "68 000 FCFA" },
        { label: "Forfait vidange moteur 5W30 + filtre huile & air", amount: "28 000 FCFA" },
        { label: "Main-d'œuvre calage distribution & contrôle électronique", amount: "25 000 FCFA" },
      ],
      total: "121 000 FCFA",
      deposit: "90 000 FCFA (Acompte pièces versé)",
      balance: "31 000 FCFA (Solde à la remise des clés)",
    },
  },
};

export function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = solutionsData[slug];
  if (!data) return { title: "Solution non trouvée | ZAP" };
  return {
    title: `${data.badge} | ZAP - Factures & Devis pour Artisans`,
    description: data.subtitle,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = solutionsData[slug];

  if (!data) {
    notFound();
  }

  const IconComponent = data.icon;

  return (
    <div
      style={{
        background: "#09090B",
        color: "#F4F4F5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Breadcrumb & Navbar Bar */}
      <header
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Retour à l&apos;accueil ZAP</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-decoration-none">
            <div className="relative w-6 h-6 rounded overflow-hidden">
              <Image src="/logo.png" alt="ZAP Logo" width={24} height={24} style={{ objectFit: "contain" }} />
            </div>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "18px",
                color: "#FFFFFF",
              }}
            >
              ZAP
            </span>
          </Link>

          <Link
            href="/login?tab=register"
            className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors"
          >
            Essai gratuit
          </Link>
        </div>
      </header>

      {/* Main Solution Hero */}
      <main style={{ flex: 1 }}>
        <section
          style={{
            padding: "80px 24px 60px",
            textAlign: "center",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          {/* Trade Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/[0.04] mb-6">
            <IconComponent className="w-4 h-4 text-white" />
            <span className="text-xs tracking-wider uppercase font-semibold text-white">
              {data.badge}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 5.5vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              marginBottom: "20px",
            }}
          >
            {data.title}
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "#A1A1AA",
              maxWidth: "600px",
              margin: "0 auto 36px",
              lineHeight: 1.65,
            }}
          >
            {data.subtitle}
          </p>

          <div className="flex flex-col items-center gap-3">
            <Link
              href="/login?tab=register"
              className="transition-transform hover:scale-105"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#000000",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                padding: "13px 26px",
                borderRadius: "10px",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
              }}
            >
              Créer mon premier document gratuitement
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <ShieldCheckIcon className="w-4 h-4 text-zinc-400" />
              <span>8 documents gratuits inclus · Zéro carte requise</span>
            </div>
          </div>
        </section>

        {/* Trade Benefits Bento Grid */}
        <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 24px 80px" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {data.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: "#121215",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "16px",
                    padding: "28px",
                  }}
                  className="flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
                    <BenefitIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "20px",
                      color: "#FFFFFF",
                      marginBottom: "8px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sample Document Simulation Card */}
          <div
            style={{
              background: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "20px",
              padding: "36px 32px",
              maxWidth: "760px",
              margin: "0 auto",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                  {data.sampleDocument.type}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  {data.sampleDocument.reference}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{data.sampleDocument.client}</p>
              </div>

              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-xs text-white">
                <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />
                <span>Certifié conforme</span>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 mb-6">
              {data.sampleDocument.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm pb-2 border-b border-white/[0.05]">
                  <span className="text-zinc-300 font-light">{item.label}</span>
                  <span className="text-white font-medium font-mono">{item.amount}</span>
                </div>
              ))}
            </div>

            {/* Totals & Deposit */}
            <div className="pt-2 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Montant Total :</span>
                <span className="text-white font-semibold font-mono">{data.sampleDocument.total}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Acompte encaissé :</span>
                <span className="text-zinc-300 font-mono">{data.sampleDocument.deposit}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Reste à payer :</span>
                <span className="text-white font-mono">{data.sampleDocument.balance}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
