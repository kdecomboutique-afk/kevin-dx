import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import AboutHero from "@/components/sections/about/AboutHero";
import AboutStats from "@/components/sections/about/AboutStats";
import CareerTimeline from "@/components/sections/about/CareerTimeline";
import WhyTrustMe from "@/components/sections/about/WhyTrustMe";
import Values from "@/components/sections/about/Values";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "À Propos - De Couvreur à Développeur Web Freelance",
  description:
    "Découvrez le parcours de Kevin DX : pompier, policier, couvreur, puis développeur web freelance. 10 ans de terrain, 26 templates, des sites ultra-performants pour artisans et TPE en Occitanie.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <CareerTimeline />
      <WhyTrustMe />
      <Values />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-20 lg:py-28">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Envie de travailler ensemble ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Que vous ayez un projet précis ou juste une idée, je suis là
                pour en discuter. Premier échange gratuit et sans engagement.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/devis" size="lg">
                  Devis gratuit en 2 min
                </Button>
                <Button
                  href="/realisations"
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Voir mes réalisations
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
