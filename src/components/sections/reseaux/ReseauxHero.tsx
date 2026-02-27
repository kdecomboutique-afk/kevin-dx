"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function ReseauxHero() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-28 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 right-1/3 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-secondary blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div>
            <FadeIn direction="up">
              <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-accent-light">
                Reseaux Sociaux
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-heading text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                Boostez votre presence sur les{" "}
                <span className="bg-gradient-to-r from-accent to-secondary-light bg-clip-text text-transparent">reseaux sociaux</span>
              </h1>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
                Developpez votre communaute, engagez vos clients et generez
                du trafic vers votre site. Une strategie sur mesure adaptee
                a votre activite et votre cible.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/devis" variant="primary" size="lg">
                  Demarrer maintenant
                </Button>
                <Button
                  href="#tarifs"
                  variant="ghost"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Voir les formules
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Illustration: Social media mockup */}
          <FadeIn direction="right" delay={0.3}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm ring-1 ring-white/10">
                {/* Social feed mockup */}
                <div className="space-y-4">
                  {/* Post 1 */}
                  <div className="rounded-xl bg-white/10 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-accent/30" />
                      <div>
                        <div className="h-3 w-24 rounded bg-white/30" />
                        <div className="mt-1 h-2 w-16 rounded bg-white/15" />
                      </div>
                    </div>
                    <div className="h-28 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20" />
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <div className="h-2 w-6 rounded bg-white/20" />
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                        </svg>
                        <div className="h-2 w-4 rounded bg-white/20" />
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                        <div className="h-2 w-5 rounded bg-white/20" />
                      </div>
                    </div>
                  </div>
                  {/* Post 2 - smaller */}
                  <div className="rounded-xl bg-white/10 p-4">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/30" />
                      <div className="h-3 w-24 rounded bg-white/30" />
                    </div>
                    <div className="h-3 w-full rounded bg-white/10" />
                    <div className="mt-1 h-3 w-3/4 rounded bg-white/10" />
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white shadow-lg shadow-accent/30">
                Contenu sur mesure
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-secondary/30">
                Strategie sur mesure
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
