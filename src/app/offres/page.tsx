import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import OffresHero from "@/components/sections/offres/OffresHero";
import OffresPrestations from "@/components/sections/offres/OffresPrestations";
import OffresTemplates from "@/components/sections/offres/OffresTemplates";
import OffresComparison from "@/components/sections/offres/OffresComparison";
import FinalCTA from "@/components/sections/home/FinalCTA";
import { templates } from "@/data/templates";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

// Strip heavy fields for client component
const templatesListing = templates.map(({ colorScheme, longDescription, sections, idealFor, keyFeatures, ...rest }) => rest);

export const metadata: Metadata = createMetadata({
  title: "Mes offres - Prestations et templates web",
  description:
    "Découvrez toutes les offres Kevin DX : sites vitrines dès 599€, e-commerce dès 1 590€, réseaux sociaux dès 199€/mois, et 26 templates à 99€. Devis gratuit.",
  path: "/offres",
});

// JSON-LD structured data is a static constant with no user input — safe to serialize.
const offresJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Offres Kevin DX - Création de sites web",
  description:
    "Prestations de création web et templates professionnels pour TPE, PME et artisans.",
  url: `${SITE_CONFIG.url}/offres`,
  numberOfItems: 8,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Site Vitrine Starter",
        description: "Site vitrine professionnel avec design responsive, SEO et chatbot IA.",
        offers: {
          "@type": "Offer",
          price: "599",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/site-vitrine`,
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Site Vitrine Pro",
        description: "Site vitrine premium avec pages illimitées, blog et SEO avancé.",
        offers: {
          "@type": "Offer",
          price: "999",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/site-vitrine`,
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "E-Commerce Standard",
        description: "Boutique en ligne complète avec paiement sécurisé et gestion de stocks.",
        offers: {
          "@type": "Offer",
          price: "1590",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/e-commerce`,
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "E-Commerce Pro",
        description: "Boutique premium multi-langue avec produits illimités.",
        offers: {
          "@type": "Offer",
          price: "2490",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/e-commerce`,
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Réseaux Sociaux Starter",
        description: "Gestion de réseaux sociaux avec 3 publications par semaine.",
        offers: {
          "@type": "Offer",
          price: "199",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/reseaux-sociaux`,
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "Réseaux Sociaux Growth",
        description: "Gestion avancée de 3 réseaux avec community management et publicités.",
        offers: {
          "@type": "Offer",
          price: "399",
          priceCurrency: "EUR",
        },
        url: `${SITE_CONFIG.url}/reseaux-sociaux`,
      },
    },
  ],
};

export default function OffresPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Accueil", href: "/" }, { name: "Nos offres", href: "/offres" }]} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offresJsonLd) }}
      />
      <OffresHero />
      <OffresPrestations />
      <OffresTemplates templates={templatesListing} />
      <OffresComparison />
      <FinalCTA />
    </>
  );
}
