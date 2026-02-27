import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { vitrineFAQ, ecommerceFAQ, reseauxFAQ } from "@/data/faq";
import type { ServiceCityConfig } from "@/data/service-city-seo-pages";
import type { LocalCity } from "@/data/local-seo";
import type { FAQ } from "@/types";

interface ServiceCityFAQProps {
  service: ServiceCityConfig;
  city: LocalCity;
}

function getServiceFAQ(serviceSlug: string): FAQ[] {
  switch (serviceSlug) {
    case "site-vitrine":
      return vitrineFAQ.slice(0, 5);
    case "e-commerce":
      return ecommerceFAQ.slice(0, 5);
    case "reseaux-sociaux":
      return reseauxFAQ.slice(0, 5);
    default:
      return [];
  }
}

export default function ServiceCityFAQ({ service, city }: ServiceCityFAQProps) {
  const serviceFAQs = getServiceFAQ(service.slug);
  const cityFAQs = service.getCityFAQ(city);

  const allFAQs: FAQ[] = [
    ...cityFAQs,
    ...serviceFAQs,
  ];

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title={`Questions fréquentes — ${service.name} à ${city.name}`}
          subtitle={`Tout ce que vous devez savoir sur notre offre ${service.name.toLowerCase()} pour les professionnels de ${city.name}.`}
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={allFAQs} />
        </div>
      </Container>
    </section>
  );
}
