"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import ScrollCounter from "@/components/animations/ScrollCounter";

const stats = [
  { value: 4800, suffix: "\u20AC/an", label: "financés max" },
  { value: 80, suffix: "\u20AC/h", label: "pris en charge" },
  { value: 100, suffix: "%", label: "finançable" },
];

export default function FinancementHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <FadeIn>
            <Badge className="mb-6 inline-flex items-center gap-1.5 border border-green-400/30 bg-green-500/10 text-green-300">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Artisans &amp; TPE
            </Badge>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Votre site web financé{" "}
              <span className="bg-gradient-to-r from-green-400 to-accent bg-clip-text text-transparent">
                jusqu&apos;à 0&euro;
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Grâce au FAFCEA (Fonds d&apos;Assurance Formation des Chefs
              d&apos;Entreprises Artisanales), votre site internet peut être
              intégralement financé. Je vous accompagne dans les démarches.
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
                Demander un devis gratuit
              </Button>
            </div>

            {/* Reassurance */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Accompagnement gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Sans engagement
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Réponse sous 24h
              </span>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.3}>
            <div className="mt-12 grid grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-2xl font-bold text-white sm:text-3xl">
                    <ScrollCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
