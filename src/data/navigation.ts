import { NavItem } from "@/types";

export const navigation: NavItem[] = [
  {
    label: "Mes offres",
    href: "#",
    children: [
      { label: "Toutes les offres", href: "/offres" },
      { label: "Site Vitrine", href: "/site-vitrine" },
      { label: "E-Commerce", href: "/e-commerce" },
      { label: "Réseaux Sociaux", href: "/reseaux-sociaux" },
    ],
  },
  {
    label: "Réalisations",
    href: "#",
    children: [
      { label: "Templates & démos", href: "/realisations" },
      { label: "Études de cas", href: "/etudes-de-cas" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Parrainage", href: "/parrainage" },
  { label: "Devis gratuit", href: "/devis" },
];

export const footerLinks = {
  services: [
    { label: "Toutes les offres", href: "/offres" },
    { label: "Site Vitrine", href: "/site-vitrine" },
    { label: "E-Commerce", href: "/e-commerce" },
    { label: "Réseaux Sociaux", href: "/reseaux-sociaux" },
    { label: "Devis gratuit", href: "/devis" },
  ],
  ressources: [
    { label: "Templates", href: "/templates" },
    { label: "Réalisations", href: "/realisations" },
    { label: "Études de cas", href: "/etudes-de-cas" },
    { label: "Blog", href: "/blog" },
    { label: "À propos", href: "/a-propos" },
    { label: "Financement FAFCEA", href: "/financement-artisan" },
    { label: "Programme parrainage", href: "/parrainage" },
  ],
  villes: [
    { label: "Nîmes", href: "/creation-site-web-nimes" },
    { label: "Avignon", href: "/creation-site-web-avignon" },
    { label: "Montpellier", href: "/creation-site-web-montpellier" },
    { label: "Orange", href: "/creation-site-web-orange" },
    { label: "Alès", href: "/creation-site-web-ales" },
  ],
  legal: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  ],
};
