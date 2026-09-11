export type Lang = "fr" | "en";

type NavItem = { label: string; href: string };

interface Dictionary {
  nav: {
    features: string;
    solutions: string;
    solutionsItems: NavItem[];
    pricing: string;
    login: string;
    register: string;
    dashboard: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    description: string;
    inputPlaceholder: string;
    cta: string;
    ctaSubtext: string;
    trustLine: string;
  };
  marquee: {
    segments: string[];
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    card1: { title: string; description: string; runsLabel: string; caption: string };
    card2: { title: string; description: string };
    card3: { title: string; description: string };
    card4: { title: string; description: string };
    card5: { title: string; description: string };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: { step: string; title: string; description: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    planLabel: string;
    priceSuffix: string;
    trialText: string;
    cta: string;
    features: string[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { id: string; question: string; answer: string }[];
  };
  finalCta: {
    title: string;
    description: string;
    cta: string;
    trustLine: string;
  };
  footer: {
    description: string;
    productHeading: string;
    productLinks: NavItem[];
    supportHeading: string;
    emailLabel: string;
    copyright: (year: number) => string;
    legalNotice: string;
    terms: string;
    privacy: string;
  };
}

export const translations: Record<Lang, Dictionary> = {
  fr: {
    nav: {
      features: "Fonctionnalités",
      solutions: "Solutions",
      solutionsItems: [
        { label: "PME", href: "/solutions/pme" },
        { label: "SaaS", href: "/solutions/saas" },
        { label: "E-commerce", href: "/solutions/e-commerce" },
        { label: "Agences marketing & SEO", href: "/solutions/agences" },
      ],
      pricing: "Tarifs",
      login: "Connexion",
      register: "Inscription",
      dashboard: "Tableau de bord",
      openMenu: "Ouvrir le menu de navigation",
      closeMenu: "Fermer le menu de navigation",
    },
    hero: {
      badge: "AI VISIBILITY MONITORING",
      h1Line1: "La visibilité de votre marque,",
      h1Line2: "dans les réponses des IA.",
      description:
        "Reflet mesure la visibilité de votre marque dans les réponses IA — quand vous êtes recommandé, qui apparaît à votre place, comment ça évolue. Mesuré, pas estimé.",
      inputPlaceholder: "votresite.com",
      cta: "Commencer gratuitement",
      ctaSubtext: "Scan gratuit, sans carte bancaire · résultat en quelques secondes",
      trustLine: "Pensez à Reflet comme à votre Google Search Console — mais pour les moteurs d'IA",
    },
    marquee: {
      segments: ["PME", "SaaS", "E-commerce", "Agences marketing & SEO"],
    },
    features: {
      badge: "AI VISIBILITY MONITORING",
      title: "Une couche de monitoring entre votre marque et les moteurs d'IA.",
      subtitle:
        "Fini les suppositions sur votre présence dans les réponses IA. Chaque score, chaque opportunité s'appuie sur des preuves vérifiables.",
      card1: {
        title: "Un score, fondé sur des réponses IA réelles",
        description:
          "ChatGPT est interrogé plusieurs fois sur les requêtes liées à votre secteur. Le score reflète une fréquence d'apparition mesurée — jamais une estimation ou un résultat binaire.",
        runsLabel: "runs / requête",
        caption: "Minimum garanti par requête suivie, jamais un seul passage.",
      },
      card2: {
        title: "30 requêtes suivies",
        description:
          "Les questions que vos clients posent réellement à ChatGPT, acceptées, modifiées ou ajoutées par vous — analysées chaque semaine.",
      },
      card3: {
        title: "Opportunités priorisées",
        description:
          "3 à 5 opportunités affichées, chacune avec un niveau de confiance — validée seulement si confirmée sur plusieurs runs et plusieurs requêtes liées.",
      },
      card4: {
        title: "Preuves cliquables",
        description:
          "Chaque indicateur de visibilité renvoie à la réponse IA exacte qui le justifie. Aucune recommandation sans preuve, aucune causalité affirmée — seulement des corrélations observées.",
      },
      card5: {
        title: "Concurrents détectés automatiquement",
        description:
          "Pas besoin de les renseigner vous-même : Reflet identifie qui apparaît à votre place dans les mêmes réponses IA.",
      },
    },
    howItWorks: {
      title: "De votre URL à votre score de visibilité, en quelques minutes.",
      subtitle:
        "Trois étapes, aucune supposition — chaque résultat s'appuie sur une analyse réelle de votre site et des réponses IA effectivement mesurées.",
      steps: [
        {
          step: "01",
          title: "Entrez votre site",
          description: "Une URL suffit. On lance une analyse réelle : pages, offres, positionnement, secteur.",
        },
        {
          step: "02",
          title: "Confirmez le résumé",
          description:
            "Reflet vous propose un résumé de votre activité et une première liste de requêtes suivies, modifiable avant de lancer quoi que ce soit.",
        },
        {
          step: "03",
          title: "Voyez votre visibilité",
          description:
            "ChatGPT est interrogé sur vos requêtes suivies : on vous dit s'il vous connaît, s'il vous recommande, et qui apparaît à votre place.",
        },
      ],
    },
    pricing: {
      title: "Un seul plan, tarif PME.",
      subtitle:
        "Aucun concurrent connu ne descend sous 99$/mois. Reflet est pensé pour les PME et indépendants, sans palier compliqué.",
      planLabel: "Plan Reflet",
      priceSuffix: "/ mois",
      trialText:
        "Essai 7 jours, carte bancaire requise — 1,50€ prélevés à l'inscription, 49€ facturés au jour 7 si non résilié.",
      cta: "Démarrer l'essai",
      features: [
        "ChatGPT — 30 requêtes suivies",
        "Analyse hebdomadaire, 3 à 5 runs par requête",
        "1 marque suivie",
        "Score de visibilité + preuves cliquables",
        "3 à 5 opportunités priorisées, avec niveau de confiance",
        "Concurrents détectés automatiquement",
        "Historique roulant sur 3 mois",
      ],
    },
    faq: {
      title: "Questions fréquentes",
      subtitle: "Tout ce que vous devez savoir pour démarrer sereinement avec Reflet.",
      items: [
        {
          id: "which-ai",
          question: "Quelles IA sont mesurées ?",
          answer:
            "ChatGPT en V1. C'est l'IA effectivement interrogée pour mesurer votre visibilité réelle — pas juste citée en exemple.",
        },
        {
          id: "gemini-role",
          question: "Pourquoi Gemini apparaît quelque part dans le produit ?",
          answer:
            "Gemini n'est jamais mesuré. Il sert uniquement, en coulisses, à comprendre votre site (secteur, offre, positionnement) au moment de l'onboarding — un composant interne, invisible pour vous.",
        },
        {
          id: "how-measured",
          question: "Comment le score est-il calculé ?",
          answer:
            "Chaque requête suivie est interrogée plusieurs fois (3 à 5 runs minimum), jamais une seule. Le résultat est une fréquence d'apparition mesurée, jamais un score binaire ou une estimation.",
        },
        {
          id: "opportunities",
          question: "Comment une opportunité est-elle validée ?",
          answer:
            "Une opportunité n'apparaît que si elle est confirmée sur plusieurs runs ET plusieurs requêtes liées au même sujet. Aucune recommandation n'est affichée sans preuve consultable.",
        },
        {
          id: "trial",
          question: "Comment fonctionne l'essai gratuit ?",
          answer:
            "7 jours, carte bancaire requise. 1,50€ sont prélevés à l'inscription pour valider la carte, puis 49€ facturés au jour 7 si vous ne résiliez pas avant.",
        },
        {
          id: "queries-limit",
          question: "Combien de requêtes puis-je suivre ?",
          answer:
            "Jusqu'à 30 requêtes actives, analysées chaque semaine. Vous pouvez les modifier, les mettre en pause ou en ajouter à tout moment depuis le dashboard.",
        },
        {
          id: "re-measure",
          question: "Après une modification de mon site, quand vois-je l'effet ?",
          answer:
            "Comptez 2 à 3 semaines minimum avant qu'un signal de re-mesure soit jugé fiable — le temps que les moteurs IA reflètent le changement.",
        },
        {
          id: "free-scan",
          question: "Le scan gratuit engage-t-il à quelque chose ?",
          answer:
            "Non. Le scan public donne un premier aperçu sans création de compte ni carte bancaire. L'abonnement n'intervient qu'au moment où vous voulez le suivi complet dans le temps.",
        },
        {
          id: "seo-replace",
          question: "Reflet remplace-t-il mon SEO ou un outil comme Semrush ?",
          answer:
            "Non. Reflet est complémentaire : le SEO travaille votre visibilité sur Google, Reflet mesure votre visibilité dans les réponses des IA — deux couches différentes.",
        },
        {
          id: "recommends-action",
          question: "Reflet me dit-il quoi faire pour m'améliorer ?",
          answer:
            "Pas encore en V1 — Reflet mesure et priorise les opportunités, sans plan d'action détaillé pour l'instant. L'accompagnement complet arrive en V2/V3.",
        },
        {
          id: "competitors",
          question: "Dois-je renseigner mes concurrents moi-même ?",
          answer:
            "Non, Reflet les détecte automatiquement à partir des mêmes réponses IA analysées pour votre marque.",
        },
      ],
    },
    finalCta: {
      title: "Prêt à savoir ce que ChatGPT dit de vous ?",
      description:
        "Un scan gratuit, sans carte bancaire, pour voir où vous apparaissez — et où vous êtes absent — dans les réponses IA de votre secteur.",
      cta: "Commencer gratuitement",
      trustLine: "Résultat en quelques secondes · Aucune carte bancaire requise",
    },
    footer: {
      description: "La couche de monitoring de visibilité entre votre marque et les moteurs d'IA.",
      productHeading: "Produit",
      productLinks: [
        { label: "Fonctionnalités", href: "#fonctionnalites" },
        { label: "Tarifs", href: "#pricing" },
        { label: "Comment ça marche", href: "#comment-ca-marche" },
        { label: "FAQ", href: "#faq" },
      ],
      supportHeading: "Support & Contact",
      emailLabel: "Email : contact@reflet.app",
      copyright: (year: number) => `© ${year} Reflet. Tous droits réservés.`,
      legalNotice: "Mentions légales",
      terms: "CGU",
      privacy: "Confidentialité",
    },
  },
  en: {
    nav: {
      features: "Features",
      solutions: "Solutions",
      solutionsItems: [
        { label: "SMBs", href: "/solutions/pme" },
        { label: "SaaS", href: "/solutions/saas" },
        { label: "E-commerce", href: "/solutions/e-commerce" },
        { label: "Marketing & SEO agencies", href: "/solutions/agences" },
      ],
      pricing: "Pricing",
      login: "Log in",
      register: "Sign up",
      dashboard: "Dashboard",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
    },
    hero: {
      badge: "AI VISIBILITY MONITORING",
      h1Line1: "Your brand's visibility,",
      h1Line2: "inside AI answers.",
      description:
        "Reflet measures your brand's visibility in AI answers — when you're recommended, who shows up in your place, how it evolves. Measured, not guessed.",
      inputPlaceholder: "yourwebsite.com",
      cta: "Get Started",
      ctaSubtext: "Free scan, no credit card · results in seconds",
      trustLine: "Think of Reflet as your Google Search Console — but for AI engines",
    },
    marquee: {
      segments: ["SMBs", "SaaS", "E-commerce", "Marketing & SEO agencies"],
    },
    features: {
      badge: "AI VISIBILITY MONITORING",
      title: "The monitoring layer between your brand and AI engines.",
      subtitle:
        "No more guessing about your presence in AI answers. Every score, every opportunity is backed by verifiable evidence.",
      card1: {
        title: "A score, built on real AI answers",
        description:
          "ChatGPT is queried multiple times on the questions tied to your industry. The score reflects a measured appearance frequency — never an estimate or a binary result.",
        runsLabel: "runs / query",
        caption: "Guaranteed minimum per tracked query, never a single pass.",
      },
      card2: {
        title: "30 tracked queries",
        description:
          "The questions your customers actually ask ChatGPT — accepted, edited, or added by you — analyzed every week.",
      },
      card3: {
        title: "Prioritized opportunities",
        description:
          "3 to 5 opportunities shown, each with a confidence level — validated only when confirmed across multiple runs and related queries.",
      },
      card4: {
        title: "Clickable evidence",
        description:
          "Every visibility indicator links back to the exact AI answer behind it. No recommendation without evidence, no claimed causation — only observed correlations.",
      },
      card5: {
        title: "Competitors detected automatically",
        description:
          "No need to enter them yourself: Reflet identifies who shows up in your place in the same AI answers.",
      },
    },
    howItWorks: {
      title: "From your URL to your visibility score, in minutes.",
      subtitle:
        "Three steps, no guesswork — every result is based on a real analysis of your site and actually measured AI answers.",
      steps: [
        {
          step: "01",
          title: "Enter your website",
          description: "Just a URL. We run a real analysis: pages, offers, positioning, industry.",
        },
        {
          step: "02",
          title: "Confirm the summary",
          description:
            "Reflet suggests a summary of your business and a first list of tracked queries, editable before anything runs.",
        },
        {
          step: "03",
          title: "See your visibility",
          description:
            "ChatGPT is asked about your tracked queries: we tell you if it knows you, recommends you, and who shows up in your place.",
        },
      ],
    },
    pricing: {
      title: "One plan, SMB pricing.",
      subtitle:
        "No known competitor goes below $99/month. Reflet is built for SMBs and solo founders, with no complicated tiers.",
      planLabel: "Reflet Plan",
      priceSuffix: "/ month",
      trialText: "7-day trial, card required — €1.50 charged at signup, €49 billed on day 7 if not cancelled.",
      cta: "Start trial",
      features: [
        "ChatGPT — 30 tracked queries",
        "Weekly analysis, 3 to 5 runs per query",
        "1 brand tracked",
        "Visibility score + clickable evidence",
        "3 to 5 prioritized opportunities, with confidence level",
        "Competitors detected automatically",
        "3-month rolling history",
      ],
    },
    faq: {
      title: "Frequently asked questions",
      subtitle: "Everything you need to know to get started with Reflet.",
      items: [
        {
          id: "which-ai",
          question: "Which AIs are measured?",
          answer:
            "ChatGPT in V1. It's the AI actually queried to measure your real visibility — not just mentioned as an example.",
        },
        {
          id: "gemini-role",
          question: "Why does Gemini show up somewhere in the product?",
          answer:
            "Gemini is never measured. It's only used behind the scenes to understand your site (industry, offering, positioning) during onboarding — an internal component, invisible to you.",
        },
        {
          id: "how-measured",
          question: "How is the score calculated?",
          answer:
            "Each tracked query is run multiple times (3 to 5 runs minimum), never just once. The result is a measured appearance frequency, never a binary score or an estimate.",
        },
        {
          id: "opportunities",
          question: "How is an opportunity validated?",
          answer:
            "An opportunity only appears if it's confirmed across multiple runs AND multiple related queries. No recommendation is shown without checkable evidence.",
        },
        {
          id: "trial",
          question: "How does the free trial work?",
          answer:
            "7 days, card required. €1.50 is charged at signup to validate the card, then €49 billed on day 7 if you don't cancel before then.",
        },
        {
          id: "queries-limit",
          question: "How many queries can I track?",
          answer:
            "Up to 30 active queries, analyzed every week. You can edit, pause, or add them anytime from the dashboard.",
        },
        {
          id: "re-measure",
          question: "After I change my site, when do I see the effect?",
          answer:
            "Allow at least 2 to 3 weeks before a re-measurement signal is considered reliable — the time it takes AI engines to reflect the change.",
        },
        {
          id: "free-scan",
          question: "Does the free scan commit me to anything?",
          answer:
            "No. The public scan gives a first glimpse with no account creation or card required. The subscription only comes in when you want full tracking over time.",
        },
        {
          id: "seo-replace",
          question: "Does Reflet replace my SEO or a tool like Semrush?",
          answer:
            "No. Reflet is complementary: SEO works on your Google visibility, Reflet measures your visibility inside AI answers — two different layers.",
        },
        {
          id: "recommends-action",
          question: "Does Reflet tell me what to do to improve?",
          answer:
            "Not yet in V1 — Reflet measures and prioritizes opportunities, without a detailed action plan for now. Full guidance is coming in V2/V3.",
        },
        {
          id: "competitors",
          question: "Do I need to enter my competitors myself?",
          answer:
            "No, Reflet detects them automatically from the same AI answers analyzed for your brand.",
        },
      ],
    },
    finalCta: {
      title: "Ready to know what ChatGPT says about you?",
      description:
        "A free scan, no credit card, to see where you show up — and where you don't — in your industry's AI answers.",
      cta: "Get Started",
      trustLine: "Results in seconds · No credit card required",
    },
    footer: {
      description: "The visibility monitoring layer between your brand and AI engines.",
      productHeading: "Product",
      productLinks: [
        { label: "Features", href: "#fonctionnalites" },
        { label: "Pricing", href: "#pricing" },
        { label: "How it works", href: "#comment-ca-marche" },
        { label: "FAQ", href: "#faq" },
      ],
      supportHeading: "Support & Contact",
      emailLabel: "Email: contact@reflet.app",
      copyright: (year: number) => `© ${year} Reflet. All rights reserved.`,
      legalNotice: "Legal notice",
      terms: "Terms",
      privacy: "Privacy",
    },
  },
};
