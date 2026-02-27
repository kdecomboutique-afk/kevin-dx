import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import TemplateCarousel from "@/components/ui/TemplateCarousel";

interface TemplateListing {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  lighthouseScore?: number;
  price?: number;
}

interface TemplateShowcaseProps {
  templates: TemplateListing[];
}

export default function TemplateShowcase({ templates }: TemplateShowcaseProps) {
  return (
    <section className="overflow-hidden py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Templates"
          title="Des templates pensés pour votre secteur"
          subtitle="Choisissez parmi mes modèles optimisés et personnalisables, prêts à être adaptés à votre activité."
        />
      </Container>

      <TemplateCarousel templates={templates} />

      <Container>
        <div className="mt-6 text-center">
          <Button href="/templates" variant="secondary" size="lg">
            Voir les {templates.length} templates
          </Button>
        </div>
      </Container>
    </section>
  );
}
