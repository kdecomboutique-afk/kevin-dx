import { Metadata } from "next";
import Container from "@/components/ui/Container";
import TemplateGrid from "@/components/sections/templates/TemplateGrid";
import TemplatesHero from "@/components/sections/templates/TemplatesHero";
import TemplateStats from "@/components/sections/templates/TemplateStats";
import BottomCTA from "@/components/sections/templates/BottomCTA";
import { createMetadata } from "@/lib/metadata";
import { templates, templateCategories } from "@/data/templates";

export const metadata: Metadata = createMetadata({
  title: "Templates - Modèles de sites web professionnels",
  description:
    "Découvrez mes templates de sites web professionnels pour restaurants, artisans, immobilier, beauté, BTP et commerces. Prêts à l'emploi et personnalisables.",
  path: "/templates",
});

// Strip heavy fields — only listing data goes to the client
const templatesListing = templates.map(({ colorScheme, longDescription, sections, idealFor, keyFeatures, ...rest }) => rest);

export default function TemplatesPage() {
  return (
    <>
      <TemplatesHero />
      <TemplateStats />

      {/* Template Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <TemplateGrid templates={templatesListing} categories={templateCategories} />
        </Container>
      </section>

      <BottomCTA />
    </>
  );
}
