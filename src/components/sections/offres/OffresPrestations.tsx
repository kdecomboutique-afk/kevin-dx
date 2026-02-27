import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicePricingCard from "@/components/ui/ServicePricingCard";
import FadeIn from "@/components/animations/FadeIn";
import {
  vitrineTiers,
  ecommerceTiers,
  reseauxTiers,
  serviceDescriptions,
} from "@/data/offres";

const services = [
  { key: "vitrine" as const, tiers: vitrineTiers },
  { key: "ecommerce" as const, tiers: ecommerceTiers },
  { key: "reseaux" as const, tiers: reseauxTiers },
];

export default function OffresPrestations() {
  return (
    <section id="prestations" className="scroll-mt-20 bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Prestations clé en main"
          title="Je crée votre site de A à Z"
          subtitle="Choisissez votre service, sélectionnez votre formule, et je m'occupe de tout. Livraison rapide, résultat professionnel."
        />

        <div className="space-y-16">
          {services.map(({ key, tiers }, serviceIndex) => {
            const desc = serviceDescriptions[key];
            return (
              <FadeIn key={key} delay={serviceIndex * 0.1}>
                <div>
                  <div className="mb-8 text-center">
                    <h3 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                      {desc.title}
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-text-muted">
                      {desc.description}
                    </p>
                    <Link
                      href={desc.href}
                      className="mt-2 inline-flex items-center text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                    >
                      En savoir plus
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
                    {tiers.map((tier) => (
                      <ServicePricingCard key={tier.name} tier={tier} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* FAFCEA Banner */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-green-800">
              <strong>Artisan ?</strong> Votre site peut être financé à 0&euro;
              grâce au FAFCEA.{" "}
              <Link
                href="/financement-artisan"
                className="font-semibold underline hover:no-underline"
              >
                En savoir plus &rarr;
              </Link>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
