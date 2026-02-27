import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "site-vitrine",
    title: "Site Vitrine",
    description:
      "Un site web professionnel qui met en valeur votre activité et attire de nouveaux clients.",
    price: "599",
    priceNote: "À partir de",
    features: [
      "Design responsive",
      "SEO optimisé",
      "Formulaire de contact",
      "Chatbot IA inclus",
      "Hébergement 1 an offert",
      "Livraison en 7 jours",
      "Éligible FAFCEA",
    ],
    icon: "globe",
    href: "/site-vitrine",
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description:
      "Une boutique en ligne complète pour vendre vos produits et développer votre chiffre d'affaires.",
    price: "1 590",
    priceNote: "À partir de",
    features: [
      "Boutique complète",
      "Paiement sécurisé",
      "Gestion des stocks",
      "Chatbot IA 24h/24",
      "Relance paniers abandonnés",
      "Formation incluse",
      "Livraison 2-3 semaines",
      "Éligible FAFCEA",
    ],
    icon: "shopping-cart",
    href: "/e-commerce",
    popular: true,
  },
  {
    id: "reseaux-sociaux",
    title: "Réseaux Sociaux",
    description:
      "Une gestion professionnelle de vos réseaux sociaux pour développer votre visibilité en ligne.",
    price: "199",
    priceNote: "/mois",
    features: [
      "3 publications/semaine",
      "Stratégie de contenu",
      "Planification IA du contenu",
      "Création visuels",
      "Rapport mensuel automatisé",
      "Community management",
    ],
    icon: "share",
    href: "/reseaux-sociaux",
  },
];
