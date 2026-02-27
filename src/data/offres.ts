import type { PricingTier } from "@/types";

// ─── Site Vitrine ────────────────────────────────────────────────────────────

export const vitrineTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "599 €",
    description:
      "Ideal pour les artisans et petites entreprises qui souhaitent une presence en ligne professionnelle.",
    features: [
      "Design responsive sur mesure",
      "Jusqu'a 5 pages",
      "Formulaire de contact",
      "Chatbot IA inclus",
      "SEO de base",
      "Hebergement 1 an offert",
      "Eligible FAFCEA",
      "Livraison en 7 jours",
    ],
    highlighted: false,
    cta: "Choisir Starter",
    href: "/devis?pack=vitrine-starter",
  },
  {
    name: "Pro",
    price: "999 €",
    description:
      "Pour ceux qui veulent un site complet avec un design premium et des fonctionnalites avancees.",
    features: [
      "Design premium sur mesure",
      "Pages illimitees",
      "Formulaire avance (multi-etapes)",
      "Chatbot IA inclus",
      "SEO optimise + mots-cles",
      "Hebergement 1 an offert",
      "Blog integre",
      "Eligible FAFCEA",
      "Livraison en 7 jours",
    ],
    highlighted: true,
    cta: "Choisir Pro",
    href: "/devis?pack=vitrine-pro",
  },
];

// ─── E-Commerce ──────────────────────────────────────────────────────────────

export const ecommerceTiers: PricingTier[] = [
  {
    name: "Standard",
    price: "1 590 €",
    description:
      "Parfait pour lancer votre premiere boutique en ligne et commencer a vendre vos produits sur internet.",
    features: [
      "Boutique jusqu'a 100 produits",
      "Paiement securise (Stripe)",
      "Design responsive",
      "Gestion des stocks",
      "Chatbot IA 24h/24",
      "Relance paniers abandonnes",
      "SEO e-commerce",
      "Eligible FAFCEA",
      "Livraison en 2-3 semaines",
    ],
    highlighted: false,
    cta: "Choisir Standard",
    href: "/devis?pack=ecommerce-standard",
  },
  {
    name: "Pro",
    price: "2 490 €",
    description:
      "Pour les commercants ambitieux qui veulent une boutique complete avec toutes les fonctionnalites avancees.",
    features: [
      "Produits illimites",
      "Paiement multi-devises",
      "Design premium sur mesure",
      "Gestion avancee des stocks",
      "Chatbot IA 24h/24",
      "Relance paniers abandonnes",
      "SEO avance + blog",
      "Multi-langue",
      "Eligible FAFCEA",
      "Livraison en 3-4 semaines",
    ],
    highlighted: true,
    cta: "Choisir Pro",
    href: "/devis?pack=ecommerce-pro",
  },
];

// ─── Reseaux Sociaux ─────────────────────────────────────────────────────────

export const reseauxTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "199 €",
    priceNote: "/mois",
    description:
      "Pour les entreprises qui debutent sur les reseaux sociaux et souhaitent etablir une presence reguliere.",
    features: [
      "3 publications par semaine",
      "1 reseau social",
      "Creation de visuels",
      "Planification IA du contenu",
      "Rapport mensuel",
    ],
    highlighted: false,
    cta: "Choisir Starter",
    href: "/devis?pack=reseaux-starter",
  },
  {
    name: "Growth",
    price: "399 €",
    priceNote: "/mois",
    description:
      "Pour les entreprises qui veulent accelerer leur croissance et maximiser leur impact sur les reseaux sociaux.",
    features: [
      "5 publications par semaine",
      "3 reseaux sociaux",
      "Creation de visuels premium",
      "Strategie de contenu",
      "Community management",
      "Planification IA du contenu",
      "Rapport automatise hebdomadaire",
      "Publicites incluses (budget en sus)",
    ],
    highlighted: true,
    cta: "Choisir Growth",
    href: "/devis?pack=reseaux-growth",
  },
];

// ─── Tableau comparatif ──────────────────────────────────────────────────────

export interface ComparisonRow {
  criteria: string;
  template: string;
  starter: string;
  pro: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    criteria: "Code source",
    template: "Inclus",
    starter: "Inclus",
    pro: "Inclus",
  },
  {
    criteria: "Personnalisation",
    template: "Vous-même",
    starter: "Par Kevin",
    pro: "Sur mesure",
  },
  {
    criteria: "Hébergement",
    template: "Non inclus",
    starter: "1 an offert",
    pro: "1 an offert",
  },
  {
    criteria: "SEO local",
    template: "Non",
    starter: "Inclus",
    pro: "Avancé",
  },
  {
    criteria: "Chatbot IA",
    template: "Non",
    starter: "Inclus",
    pro: "Inclus",
  },
  {
    criteria: "Support",
    template: "Email 30j",
    starter: "3 mois",
    pro: "6 mois",
  },
  {
    criteria: "Délai",
    template: "Immédiat",
    starter: "7 jours",
    pro: "7 jours",
  },
];

// ─── Descriptions courtes pour la page offres ────────────────────────────────

export const serviceDescriptions = {
  vitrine: {
    title: "Site Vitrine",
    description:
      "Un site professionnel qui met en valeur votre activité et convertit vos visiteurs en clients.",
    href: "/site-vitrine",
  },
  ecommerce: {
    title: "E-Commerce",
    description:
      "Une boutique en ligne complète pour vendre vos produits et développer votre chiffre d'affaires.",
    href: "/e-commerce",
  },
  reseaux: {
    title: "Réseaux Sociaux",
    description:
      "Une gestion professionnelle de vos réseaux pour développer votre visibilité en ligne.",
    href: "/reseaux-sociaux",
  },
};
