import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import { vitrineProcess, ecommerceProcess } from "@/data/process-steps";
import type { ServiceCityConfig } from "@/data/service-city-seo-pages";
import type { LocalCity } from "@/data/local-seo";

interface ServiceCityProcessProps {
  service: ServiceCityConfig;
  city: LocalCity;
}

function getSteps(serviceSlug: string) {
  switch (serviceSlug) {
    case "site-vitrine":
      return vitrineProcess;
    case "e-commerce":
      return ecommerceProcess;
    default:
      return null;
  }
}

export default function ServiceCityProcess({ service, city }: ServiceCityProcessProps) {
  const steps = getSteps(service.slug);
  if (!steps) return null;

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Processus"
          title={`Comment je crée votre ${service.name.toLowerCase()} à ${city.name}`}
          subtitle={`Un processus clair et structuré, du premier échange à la mise en ligne. Vous gardez le contrôle à chaque étape.`}
        />

        <div className="mx-auto max-w-3xl">
          <ProcessTimeline steps={steps} />
        </div>
      </Container>
    </section>
  );
}
