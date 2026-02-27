import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import EcommerceHero from "@/components/sections/ecommerce/EcommerceHero";
import EcommercePricing from "@/components/sections/ecommerce/EcommercePricing";
import EcommerceProcess from "@/components/sections/ecommerce/EcommerceProcess";
import EcommerceCaseStudy from "@/components/sections/ecommerce/EcommerceCaseStudy";
import EcommerceFAQ from "@/components/sections/ecommerce/EcommerceFAQ";
import ComboOffer from "@/components/ui/ComboOffer";

export const metadata: Metadata = createMetadata({
  title: "E-Commerce - Création de boutiques en ligne",
  description:
    "Création de boutiques en ligne professionnelles et sécurisées pour artisans et commerçants. Paiement intégré, gestion des stocks, SEO. À partir de 1 590 EUR.",
  path: "/e-commerce",
});

export default function EcommercePage() {
  return (
    <>
      <EcommerceHero />
      <EcommercePricing />
      <EcommerceProcess />
      <EcommerceCaseStudy />
      <ComboOffer
        title="Combo E-Commerce + Réseaux Sociaux"
        description="Maximisez vos ventes en combinant votre boutique en ligne avec une stratégie de réseaux sociaux performante. Générez du trafic qualifié et convertissez plus de visiteurs en clients."
        discount="-15%"
        ctaText="Demander ce pack"
        ctaHref="/devis?pack=combo-ecommerce-reseaux"
      />
      <EcommerceFAQ />
    </>
  );
}
