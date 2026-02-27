"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function EcommerceHero() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-28 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <FadeIn direction="up">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent-light">
                E-Commerce
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                Votre boutique en ligne{" "}
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">performante</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
                Vendez vos produits 24h/24 avec une boutique en ligne
                professionnelle, securisee et optimisee pour la conversion.
                De la fiche produit au paiement, chaque detail compte.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/devis" variant="primary" size="lg">
                  Lancer ma boutique
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

          {/* Illustration: Shopping mockup */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10">
                {/* Product cards mockup */}
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl bg-white/10 p-3">
                      <div className="mb-2 h-20 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20" />
                      <div className="h-3 w-3/4 rounded bg-white/20" />
                      <div className="mt-1 h-3 w-1/2 rounded bg-accent/30" />
                    </div>
                  ))}
                </div>
                {/* Cart bar */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-accent-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <span className="text-sm text-white/70">3 articles</span>
                  </div>
                  <div className="rounded-lg bg-accent px-3 py-1 text-sm font-bold text-white">
                    Commander
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/30">
                Paiement securise
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/30">
                Boutique cle en main
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
