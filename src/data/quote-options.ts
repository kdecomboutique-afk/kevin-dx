// ---------------------------------------------------------------
// Data & Types for the interactive quote calculator (/devis)
// ---------------------------------------------------------------

/** Identifies a project type. */
export type ProjectTypeId = "vitrine" | "ecommerce" | "reseaux";

/** A single selectable option within a project type. */
export interface QuoteOption {
  id: string;
  label: string;
  /** Extra cost in euros (0 = included). For "reseaux" type this is per month. */
  price: number;
  included?: boolean;
  description?: string;
}

/** A range-based option (pages, products, publications). */
export interface QuoteRange {
  id: string;
  label: string;
  ranges: { label: string; price: number }[];
}

/** Full configuration for one project type. */
export interface ProjectType {
  id: ProjectTypeId;
  name: string;
  basePrice: number;
  /** Label shown next to the base price. */
  priceLabel: string;
  description: string;
  icon: ProjectTypeId;
  ranges: QuoteRange[];
  options: QuoteOption[];
}

// ---------------------------------------------------------------
// Project types
// ---------------------------------------------------------------

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "vitrine",
    name: "Site Vitrine",
    basePrice: 599,
    priceLabel: "à partir de 599 €",
    description:
      "Un site professionnel pour présenter votre activité, vos services et gagner en crédibilité en ligne.",
    icon: "vitrine",
    ranges: [
      {
        id: "pages",
        label: "Nombre de pages",
        ranges: [
          { label: "1 – 5 pages (inclus)", price: 0 },
          { label: "6 – 10 pages", price: 200 },
          { label: "11 – 20 pages", price: 450 },
        ],
      },
    ],
    options: [
      {
        id: "responsive",
        label: "Design responsive (mobile, tablette, desktop)",
        price: 0,
        included: true,
        description: "Adaptation automatique à tous les écrans",
      },
      {
        id: "contact-form",
        label: "Formulaire de contact",
        price: 0,
        included: true,
        description: "Formulaire personnalisé avec notifications e-mail",
      },
      {
        id: "gallery",
        label: "Galerie photos",
        price: 150,
        description: "Galerie interactive avec lightbox et filtres",
      },
      {
        id: "blog",
        label: "Blog intégré",
        price: 250,
        description: "Système de blog complet avec catégories et recherche",
      },
      {
        id: "booking",
        label: "Réservation en ligne",
        price: 350,
        description: "Calendrier de prise de rendez-vous en temps réel",
      },
      {
        id: "multilingual",
        label: "Multilingue",
        price: 400,
        description: "Gestion de plusieurs langues avec sélecteur",
      },
      {
        id: "seo",
        label: "SEO optimisé",
        price: 200,
        description:
          "Audit SEO, balises optimisées, sitemap et inscription Search Console",
      },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    basePrice: 1590,
    priceLabel: "à partir de 1 590 €",
    description:
      "Une boutique en ligne complète pour vendre vos produits avec paiement sécurisé et gestion des commandes.",
    icon: "ecommerce",
    ranges: [
      {
        id: "products",
        label: "Nombre de produits",
        ranges: [
          { label: "1 – 50 produits (inclus)", price: 0 },
          { label: "51 – 200 produits", price: 300 },
          { label: "201 – 500 produits", price: 600 },
          { label: "500+ produits", price: 900 },
        ],
      },
    ],
    options: [
      {
        id: "payment",
        label: "Passerelle de paiement (Stripe / PayPal)",
        price: 0,
        included: true,
        description: "Paiement sécurisé par carte bancaire et PayPal",
      },
      {
        id: "stock",
        label: "Gestion de stock",
        price: 0,
        included: true,
        description: "Suivi automatique des stocks et alertes",
      },
      {
        id: "click-collect",
        label: "Click & Collect",
        price: 250,
        description: "Commande en ligne et retrait en magasin",
      },
      {
        id: "loyalty",
        label: "Programme de fidélité",
        price: 350,
        description: "Points de fidélité, réductions et parrainage",
      },
      {
        id: "multilingual",
        label: "Multilingue",
        price: 500,
        description: "Boutique disponible en plusieurs langues",
      },
      {
        id: "marketplace",
        label: "Marketplace multi-vendeurs",
        price: 800,
        description: "Plateforme ouverte à plusieurs vendeurs",
      },
    ],
  },
  {
    id: "reseaux",
    name: "Gestion Réseaux Sociaux",
    basePrice: 199,
    priceLabel: "à partir de 199 €/mois",
    description:
      "Une gestion professionnelle de vos réseaux sociaux pour développer votre communauté et votre visibilité.",
    icon: "reseaux",
    ranges: [
      {
        id: "publications",
        label: "Publications par semaine",
        ranges: [
          { label: "3 publications / semaine (inclus)", price: 0 },
          { label: "5 publications / semaine", price: 80 },
          { label: "7 publications / semaine", price: 150 },
        ],
      },
    ],
    options: [
      {
        id: "instagram",
        label: "Instagram",
        price: 0,
        included: true,
        description: "Gestion complète de votre compte Instagram",
      },
      {
        id: "facebook",
        label: "Facebook",
        price: 0,
        included: true,
        description: "Gestion complète de votre page Facebook",
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        price: 50,
        description: "Gestion de votre page LinkedIn professionnelle",
      },
      {
        id: "tiktok",
        label: "TikTok",
        price: 50,
        description: "Création de contenu vidéo court pour TikTok",
      },
      {
        id: "stories",
        label: "Stories quotidiennes",
        price: 60,
        description: "Création et publication de stories engageantes",
      },
      {
        id: "community",
        label: "Community management",
        price: 100,
        description:
          "Réponses aux commentaires, messages et gestion de communauté",
      },
      {
        id: "report",
        label: "Rapport mensuel",
        price: 0,
        included: true,
        description:
          "Analyse des performances et recommandations chaque mois",
      },
      {
        id: "ads",
        label: "Publicité sponsorisée",
        price: 150,
        description:
          "Création et gestion de campagnes publicitaires ciblées",
      },
    ],
  },
];

// ---------------------------------------------------------------
// Helper: get a project type by id
// ---------------------------------------------------------------
export function getProjectType(id: ProjectTypeId): ProjectType {
  const found = PROJECT_TYPES.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown project type: ${id}`);
  return found;
}
