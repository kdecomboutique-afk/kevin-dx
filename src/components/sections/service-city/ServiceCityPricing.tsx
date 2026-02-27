import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicePricingCard from "@/components/ui/ServicePricingCard";
import FadeIn from "@/components/animations/FadeIn";
import { vitrineTiers, ecommerceTiers, reseauxTiers } from "@/data/offres";
import type { ServiceCityConfig } from "@/data/service-city-seo-pages";
import type { LocalCity } from "@/data/local-seo";

interface ServiceCityPricingProps {
  service: ServiceCityConfig;
  city: LocalCity;
}

function getTiers(serviceSlug: string) {
  switch (serviceSlug) {
    case "site-vitrine":
      return vitrineTiers;
    case "e-commerce":
      return ecommerceTiers;
    case "reseaux-sociaux":
      return reseauxTiers;
    default:
      return vitrineTiers;
  }
}

export default function ServiceCityPricing({ service, city }: ServiceCityPricingProps) {
  const tiers = getTiers(service.slug);

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Tarifs"
          title={`Tarifs ${service.name.toLowerCase()} à ${city.name}`}
          subtitle={`Des tarifs transparents et compétitifs pour les professionnels de ${city.name}. Pas de frais cachés, pas de surprise.`}
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {tiers.map((tier, index) => (
            <FadeIn key={tier.name} delay={index * 0.2}>
              <ServicePricingCard tier={tier} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-green-200 bg-green-50 p-5 text-center">
            <p className="text-sm font-medium text-green-800">
              Artisan à {city.name} ? Votre site peut être financé par le{" "}
              <strong>FAFCEA</strong> ou votre <strong>OPCO</strong>.{" "}
              <a href="/financement-artisan" className="underline hover:text-green-900">
                En savoir plus
              </a>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
