import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";

interface SectorCityPricingProps {
  sector: Sector;
  city: LocalCity;
}

export default function SectorCityPricing({ sector, city }: SectorCityPricingProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Tarifs"
          title={`Combien coûte un site ${sector.name.toLowerCase()} à ${city.name} ?`}
          subtitle="Des tarifs clairs, sans surprise. Devis gratuit et sans engagement."
        />

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {/* Site Vitrine */}
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-lg lg:p-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">
                Site Vitrine
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                Parfait pour présenter votre {sector.name.toLowerCase()}
              </p>
              <div className="mt-4">
                <span className="text-sm text-text-muted">À partir de</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-primary">599</span>
                  <span className="text-lg text-text-muted">&euro;</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {["Design responsive", "SEO local " + city.name, "Chatbot IA inclus", "Livraison en 7 jours"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text">
                    <svg className="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/site-vitrine" variant="secondary" size="lg" className="mt-6 w-full">
                En savoir plus
              </Button>
            </div>
          </FadeIn>

          {/* E-Commerce */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border-2 border-accent bg-white p-6 shadow-lg shadow-accent/10 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 lg:p-8">
              <div className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                Populaire
              </div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">
                Site E-Commerce
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                Vendez en ligne 24h/24
              </p>
              <div className="mt-4">
                <span className="text-sm text-text-muted">À partir de</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-primary">1 590</span>
                  <span className="text-lg text-text-muted">&euro;</span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {["Boutique complète", "Paiement sécurisé", "Chatbot IA 24h/24", "Relance paniers IA"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text">
                    <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/e-commerce" size="lg" className="mt-6 w-full">
                En savoir plus
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* FAFCEA mention */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-green-800">
              <strong>Artisan ?</strong> Votre site peut être financé à 0&euro;
              grâce au FAFCEA.{" "}
              <Link href="/financement-artisan" className="font-semibold underline hover:no-underline">
                En savoir plus &rarr;
              </Link>
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
