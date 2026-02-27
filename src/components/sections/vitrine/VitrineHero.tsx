"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function VitrineHero() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-28 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <FadeIn direction="up">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent-light">
                Site Vitrine
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                Votre site vitrine{" "}
                <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">professionnel</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
                Obtenez un site web moderne, rapide et responsive qui met en
                valeur votre activite. Concu pour convaincre vos visiteurs et
                les transformer en clients.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/devis" variant="primary" size="lg">
                  Demander un devis gratuit
                </Button>
                <Button
                  href="#tarifs"
                  variant="ghost"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Voir les tarifs
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Illustration */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10">
                {/* Browser mockup */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                  <div className="ml-4 h-6 flex-1 rounded bg-white/10" />
                </div>
                {/* Placeholder content blocks */}
                <div className="space-y-3">
                  <div className="h-32 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-20 rounded-lg bg-white/10" />
                    <div className="h-20 rounded-lg bg-white/10" />
                    <div className="h-20 rounded-lg bg-white/10" />
                  </div>
                  <div className="h-8 w-2/3 rounded bg-white/10" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-4/5 rounded bg-white/5" />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white shadow-lg shadow-accent/30">
                100% Responsive
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/30">
                SEO Optimise
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
