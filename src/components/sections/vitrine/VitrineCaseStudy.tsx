"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";

const features = [
  { label: "Score Lighthouse", value: "95+", description: "Performance optimale" },
  { label: "Templates disponibles", value: "26", description: "Tous secteurs" },
  { label: "Responsive", value: "100%", description: "Mobile, tablette, desktop" },
];

export default function VitrineCaseStudy() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Qualité garantie"
          title="Ce que vous obtenez"
          subtitle="Chaque site vitrine est conçu avec les mêmes standards de qualité professionnelle."
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <FadeIn direction="left">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                  Un site qui travaille pour vous
                </h3>
                <ul className="space-y-3">
                  {[
                    "Design professionnel personnalisé à votre image",
                    "Optimisé pour le référencement local (Google)",
                    "Formulaire de contact ou réservation en ligne",
                    "Compatible mobile, tablette et desktop",
                    "Chargement ultra-rapide (score Lighthouse 95+)",
                    "Formation à la gestion de votre site incluse",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
                  {features.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-white p-4 text-center lg:flex lg:items-center lg:gap-4 lg:text-left"
                    >
                      <span className="block font-heading text-2xl font-extrabold text-accent lg:text-3xl">
                        {stat.value}
                      </span>
                      <div>
                        <span className="block text-sm font-semibold text-primary">
                          {stat.label}
                        </span>
                        <span className="block text-xs text-text-muted">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-white p-6 text-center">
                  <p className="text-text-muted leading-relaxed mb-4">
                    Explorez mes templates pour voir concrètement la qualité de
                    mon travail avant de vous engager.
                  </p>
                  <Button href="/templates" variant="secondary" size="sm">
                    Voir les démos en ligne
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
