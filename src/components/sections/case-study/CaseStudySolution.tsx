import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import { CaseStudy } from "@/types";

interface CaseStudySolutionProps {
  study: CaseStudy;
}

export default function CaseStudySolution({ study }: CaseStudySolutionProps) {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="La solution"
          title="Ce que nous avons mis en place"
          subtitle={study.solution.intro}
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Left: features */}
          <div className="space-y-6">
            {study.solution.features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right: tech + price + duration */}
          <div className="flex flex-col justify-center">
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border bg-white p-8">
                <h3 className="font-heading text-lg font-bold text-primary">
                  Fiche technique
                </h3>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.solution.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Price & duration */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-accent/5 p-4 text-center">
                    <p className="text-2xl font-bold text-accent">
                      {study.solution.price}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Investissement
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {study.solution.duration}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">Délai</p>
                  </div>
                </div>

                {/* Lighthouse score */}
                <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <span className="text-lg font-bold text-green-700">
                      {study.lighthouseScore}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Score Lighthouse
                    </p>
                    <p className="text-xs text-green-600">
                      Performance, SEO, accessibilité
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Badge variant="success">
                    Satisfait ou remboursé
                  </Badge>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
