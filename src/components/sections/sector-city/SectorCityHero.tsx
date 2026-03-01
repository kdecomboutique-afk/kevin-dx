import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";

interface SectorCityHeroProps {
  sector: Sector;
  city: LocalCity;
}

export default function SectorCityHero({ sector, city }: SectorCityHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge className="mb-6 border border-accent/30 bg-accent/10 text-accent-light">
              {sector.name} &bull; {city.name}
            </Badge>

            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              Création de site internet pour{" "}
              <span className="text-accent">{sector.name.toLowerCase()}</span>{" "}
              à {city.name}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Un site web professionnel et performant pour votre{" "}
              {sector.name.toLowerCase()} à {city.name}. Design sur mesure, SEO
              local optimisé, livré en 10-14 jours. À partir de 599&euro;.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/devis" size="lg">
                Devis gratuit
              </Button>
              <Button
                href={`/templates/${sector.templateId}`}
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Voir le template {sector.name}
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                À partir de 599&euro;
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Basé {city.distance} de {city.name}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Score Lighthouse 95+
              </span>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
