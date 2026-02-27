"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import Button from "@/components/ui/Button";

const features = [
  { label: "Paiement sécurisé", value: "SSL", description: "Stripe / PayPal intégré" },
  { label: "Gestion stock", value: "Auto", description: "Mise à jour en temps réel" },
  { label: "Mobile-first", value: "100%", description: "Achat optimisé sur mobile" },
];

export default function EcommerceCaseStudy() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Qualité garantie"
          title="Votre boutique en ligne clé en main"
          subtitle="Tout ce dont vous avez besoin pour vendre en ligne, sans compromis sur la qualité."
        />

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <FadeIn direction="left">
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <h3 className="font-heading text-lg font-bold text-primary mb-4">
                  Une boutique qui convertit
                </h3>
                <ul className="space-y-3">
                  {[
                    "Design professionnel adapté à votre marque",
                    "Catalogue produits avec photos et variantes",
                    "Paiement sécurisé (Stripe, PayPal, CB)",
                    "Gestion des frais de port et promotions",
                    "Optimisé SEO pour attirer des acheteurs",
                    "Tableau de bord pour gérer vos commandes",
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
                    Découvrez mes templates e-commerce pour visualiser le
                    résultat avant de vous lancer.
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
