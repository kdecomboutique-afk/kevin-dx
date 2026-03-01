import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = createMetadata({
  title: "Simulations de projet - Ce qu'un site web peut apporter à votre activité",
  description:
    "Découvrez comment un site web professionnel peut booster l'activité d'un artisan ou d'une TPE. Scénarios réalistes, résultats projetés et solutions concrètes par Kevin DX.",
  path: "/etudes-de-cas",
});

const categoryIcons: Record<string, string> = {
  Plombier: "🔧",
  Restaurant: "🍽️",
  "Institut de beauté": "✨",
};

export default function EtudesDeCasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <SectionHeading
              as="h1"
              badge="Simulations de projet"
              title="Ce qu'on peut faire pour vous"
              subtitle="Des scénarios réalistes basés sur les besoins typiques des artisans et TPE en Occitanie. Résultats projetés, solutions concrètes."
            />
          </FadeIn>
        </Container>
      </section>

      {/* Case studies grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {caseStudies.map((study, index) => (
              <FadeIn key={study.slug} delay={index * 0.1}>
                <Link href={`/etudes-de-cas/${study.slug}`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="accent">
                          {study.clientType}
                        </Badge>
                        <span className="text-2xl">
                          {categoryIcons[study.clientType] || "🌐"}
                        </span>
                      </div>
                      <div className="mt-4">
                        <span className="text-3xl font-extrabold text-white sm:text-4xl">
                          {study.heroMetric.value}
                        </span>
                        <p className="mt-1 text-sm text-gray-300">
                          {study.heroMetric.label}
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-primary line-clamp-2">
                        {study.tagline}
                      </h3>
                      <p className="mt-2 text-sm text-text-muted">
                        {study.clientName} — {study.city} ({study.region})
                      </p>

                      {/* Mini stats */}
                      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          Lighthouse {study.lighthouseScore}/100
                        </span>
                        <span>{study.solution.price}</span>
                        <span>{study.solution.duration}</span>
                      </div>

                      {/* Read more */}
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-accent/80">
                        Voir la simulation
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <Container>
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Et si c&apos;était votre entreprise ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                Ces simulations montrent ce qu&apos;un site web professionnel peut apporter à votre activité.
                Discutons de votre projet — le devis est gratuit et sans engagement.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/devis" size="lg">
                  Demander un devis gratuit
                </Button>
                <Button
                  href="/realisations"
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Voir les templates
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
