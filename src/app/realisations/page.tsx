import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import TemplateThumb from "@/components/ui/TemplateThumb";
import { createMetadata } from "@/lib/metadata";
import { templates } from "@/data/templates";

export const metadata: Metadata = createMetadata({
  title: "Réalisations - Démonstrations de sites web professionnels",
  description:
    "Explorez mes démonstrations de sites web : restaurants, artisans, immobilier, beauté, BTP et plus. 26 templates fonctionnels à personnaliser pour votre activité.",
  path: "/realisations",
});

// Sélection de 6 templates mis en avant
const featured = templates.slice(0, 6);

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <SectionHeading
              as="h1"
              badge="Portfolio"
              title="Mes réalisations"
              subtitle="Chaque template ci-dessous est un site fonctionnel que j'ai conçu et développé. Explorez les démos en ligne pour voir la qualité de mon travail."
            />
          </FadeIn>
        </Container>
      </section>

      {/* Templates showcase */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((template, index) => (
              <FadeIn key={template.id} delay={index * 0.08}>
                <Link href={`/templates/${template.id}`} className="block">
                  <div className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <TemplateThumb
                      src={template.image}
                      alt={template.title}
                      category={template.category}
                      hoverText="Voir la démo en ligne →"
                    />
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-primary">
                        {template.title}
                      </h3>
                      <p className="mt-1 text-sm text-accent font-medium">
                        {template.category}
                      </p>
                      <p className="mt-2 text-sm text-text-muted line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/templates" size="lg">
              Voir les 26 templates
            </Button>
          </div>
        </Container>
      </section>

      {/* Approche */}
      <section className="bg-surface py-16 lg:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                Mon approche
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
                Chaque site est conçu sur mesure avec les dernières technologies
                web (React, Next.js, Tailwind CSS). Performance, SEO et design
                sont au cœur de chaque projet.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-white p-6 text-center">
                  <div className="text-3xl font-bold text-accent">95+</div>
                  <p className="mt-1 text-sm text-text-muted">Score Lighthouse</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 text-center">
                  <div className="text-3xl font-bold text-accent">26</div>
                  <p className="mt-1 text-sm text-text-muted">Templates créés</p>
                </div>
                <div className="rounded-2xl border border-border bg-white p-6 text-center">
                  <div className="text-3xl font-bold text-accent">100%</div>
                  <p className="mt-1 text-sm text-text-muted">Responsive mobile</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Votre site pourrait être le prochain
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Discutons de votre projet. Je vous propose un devis gratuit et
                personnalisé, adapté à votre activité et votre budget.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/devis" size="lg">
                  Demander un devis gratuit
                </Button>
                <Button
                  href="/templates"
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Explorer les templates
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
