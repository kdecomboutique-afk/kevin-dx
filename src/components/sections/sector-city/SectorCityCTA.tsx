import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";

interface SectorCityCTAProps {
  sector: Sector;
  city: LocalCity;
}

export default function SectorCityCTA({ sector, city }: SectorCityCTAProps) {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Prêt à lancer votre site {sector.name.toLowerCase()} à {city.name} ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Premier échange gratuit et sans engagement. Basé {city.distance} de{" "}
              {city.name}, je me déplace pour vous rencontrer.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/devis" size="lg">
                Devis gratuit en 24h
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Prendre rendez-vous
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
