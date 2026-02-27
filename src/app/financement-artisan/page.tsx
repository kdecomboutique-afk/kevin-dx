import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import FinancementHero from "@/components/sections/financement/FinancementHero";
import FinancementProcess from "@/components/sections/financement/FinancementProcess";
import FinancementEligibility from "@/components/sections/financement/FinancementEligibility";
import FinancementFAQ from "@/components/sections/financement/FinancementFAQ";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Financement FAFCEA — Votre site web artisan financé à 0\u20AC",
    description:
      "Artisans : votre site internet peut être financé jusqu'à 0\u20AC grâce au FAFCEA. Vérifiez votre éligibilité et obtenez un site professionnel sans frais.",
    path: "/financement-artisan",
  }),
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Création de site web pour artisans avec financement FAFCEA",
      description:
        "Accompagnement complet pour la création de votre site web professionnel avec prise en charge FAFCEA. Site vitrine à partir de 599\u20AC, potentiellement financé à 100%.",
      provider: {
        "@type": "LocalBusiness",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 44.05,
          longitude: 4.78,
        },
        geoRadius: "100000",
      },
      offers: {
        "@type": "Offer",
        price: "599",
        priceCurrency: "EUR",
        description: "Site vitrine professionnel éligible au financement FAFCEA",
      },
    }),
  },
};

export default function FinancementArtisanPage() {
  return (
    <>
      <FinancementHero />
      <FinancementProcess />
      <FinancementEligibility />

      {/* Comparison section */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <FadeIn>
            <div className="mb-12 text-center lg:mb-16">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Simulation
              </span>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Combien ça coûte vraiment ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Avec le FAFCEA, le reste à charge peut être nul.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
                <h3 className="font-heading text-xl font-bold text-primary">
                  Site Vitrine
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Tarif Kevin DX</span>
                    <span className="font-semibold text-primary">599 &euro;</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Formation (14h x 80&euro;/h)</span>
                    <span className="font-semibold text-green-600">-1 120 &euro;</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-primary">Reste à charge</span>
                      <span className="font-heading text-2xl font-bold text-green-600">0 &euro;</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border-2 border-accent bg-white p-6 shadow-lg shadow-accent/10 lg:p-8">
                <div className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                  Populaire
                </div>
                <h3 className="font-heading text-xl font-bold text-primary">
                  Site E-Commerce
                </h3>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Tarif Kevin DX</span>
                    <span className="font-semibold text-primary">1 590 &euro;</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Formation (21h x 80&euro;/h)</span>
                    <span className="font-semibold text-green-600">-1 680 &euro;</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-primary">Reste à charge</span>
                      <span className="font-heading text-2xl font-bold text-green-600">0 &euro;</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-800">
              <strong>Note de transparence :</strong> La certification Qualiopi
              est en cours d&apos;obtention. En attendant, je vous accompagne dans vos
              démarches FAFCEA et vous aide à monter votre dossier. Vous pouvez
              aussi faire votre demande FAFCEA directement et vous faire
              rembourser après la formation.
            </div>
          </FadeIn>
        </Container>
      </section>

      <FinancementFAQ />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 lg:py-28">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Prêt à obtenir votre site financé ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Vérifiez votre éligibilité gratuitement en 5 minutes. Si le
                FAFCEA vous finance, votre site ne vous coûte rien.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Vérifier mon éligibilité
                </Button>
                <Button
                  href="/devis"
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
