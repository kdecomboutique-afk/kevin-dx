import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import VitrineHero from "@/components/sections/vitrine/VitrineHero";
import VitrinePricing from "@/components/sections/vitrine/VitrinePricing";
import VitrineProcess from "@/components/sections/vitrine/VitrineProcess";
import VitrineCaseStudy from "@/components/sections/vitrine/VitrineCaseStudy";
import VitrineFAQ from "@/components/sections/vitrine/VitrineFAQ";
import ComboOffer from "@/components/ui/ComboOffer";

export const metadata: Metadata = createMetadata({
  title: "Site Vitrine - Création de sites professionnels",
  description:
    "Création de sites vitrines modernes et performants pour artisans, TPE et PME. Design sur mesure, responsive, SEO optimisé. À partir de 599 EUR.",
  path: "/site-vitrine",
});

export default function SiteVitrinePage() {
  return (
    <>
      <VitrineHero />
      <VitrinePricing />
      <VitrineProcess />
      <VitrineCaseStudy />
      <ComboOffer
        title="Combo Site Vitrine + Réseaux Sociaux"
        description="Boostez votre visibilité en ligne en combinant votre site vitrine avec une gestion professionnelle de vos réseaux sociaux. Un pack complet pour attirer et fidéliser vos clients."
        discount="-15%"
        ctaText="Demander ce pack"
        ctaHref="/devis?pack=combo-vitrine-reseaux"
      />
      <VitrineFAQ />
    </>
  );
}
