import type { Metadata } from "next";
import Hero from "@/components/sections/home/Hero";
import StatsBar from "@/components/sections/home/StatsBar";
import ServicesOverview from "@/components/sections/home/ServicesOverview";
import TrustBadges from "@/components/sections/home/TrustBadges";
import TemplateShowcase from "@/components/sections/home/TemplateShowcase";
import AIAdvantage from "@/components/sections/home/AIAdvantage";
import Testimonials from "@/components/sections/home/Testimonials";
import FinalCTA from "@/components/sections/home/FinalCTA";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Développeur Web Freelance à Roquemaure",
  description:
    "Création de sites vitrines, e-commerce et gestion de réseaux sociaux pour TPE, PME et artisans. Devis gratuit, tarifs transparents. Basé à Roquemaure, Occitanie.",
};

// Only pass lightweight fields to client component
const templatesListing = templates.map(({ id, title, category, image, description, tags, lighthouseScore }) => ({
  id, title, category, image, description, tags, lighthouseScore,
}));

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesOverview />
      <TrustBadges />
      <TemplateShowcase templates={templatesListing} />
      <AIAdvantage />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
