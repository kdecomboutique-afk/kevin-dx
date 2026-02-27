import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";

interface SectorCitySolutionProps {
  sector: Sector;
  city: LocalCity;
}

export default function SectorCitySolution({ sector, city }: SectorCitySolutionProps) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="La solution"
          title={`Votre site ${sector.name.toLowerCase()} sur mesure`}
          subtitle={`Un site conçu spécifiquement pour les ${sector.pluralName} de ${city.name}, avec tout ce dont vous avez besoin.`}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Features */}
          <FadeIn direction="right">
            <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
              <h3 className="mb-6 font-heading text-xl font-bold text-primary">
                Fonctionnalités incluses
              </h3>
              <ul className="space-y-4">
                {sector.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-sm text-text">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Benefits */}
          <FadeIn direction="left" delay={0.2}>
            <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
              <h3 className="mb-6 font-heading text-xl font-bold text-primary">
                Résultats concrets
              </h3>
              <ul className="space-y-4">
                {sector.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                    <span className="text-sm text-text">{benefit}</span>
                  </li>
                ))}
              </ul>

              {sector.socialProof && (
                <div className="mt-6 rounded-xl bg-accent/5 p-4">
                  <p className="text-sm font-medium text-accent">
                    {sector.socialProof}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 text-center">
            <Button href={`/templates/${sector.templateId}`} size="lg">
              Voir le template {sector.name}
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
