import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import DeviceFrame from "@/components/ui/DeviceFrame";
import { CaseStudy } from "@/types";

interface CaseStudyHeroProps {
  study: CaseStudy;
}

export default function CaseStudyHero({ study }: CaseStudyHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] pt-32 pb-16 lg:pt-40 lg:pb-24">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <div>
            <FadeIn>
              <Badge variant="accent" className="mb-6">
                {study.clientType} — {study.city}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {study.tagline}
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-5xl font-extrabold text-accent sm:text-6xl lg:text-7xl">
                  {study.heroMetric.value}
                </span>
                <span className="text-lg font-medium text-gray-300 sm:text-xl">
                  {study.heroMetric.label}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Lighthouse {study.lighthouseScore}/100
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 backdrop-blur-sm">
                  <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                  </svg>
                  Template {study.templateName}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/devis" size="lg">
                  Je veux les mêmes résultats
                </Button>
                <Button
                  href={`/templates/${study.templateId}`}
                  variant="secondary"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Voir le template
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right: device frame (desktop only) */}
          <FadeIn delay={0.3} direction="right" className="hidden lg:block">
            <div className="animate-[float-bob_4s_ease-in-out_infinite]">
              <DeviceFrame type="laptop">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-accent/20" />
                    <p className="font-heading text-sm font-bold text-primary">
                      {study.templateName}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Template {study.clientType}
                    </p>
                  </div>
                </div>
              </DeviceFrame>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
