import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollCounter from "@/components/animations/ScrollCounter";
import FadeIn from "@/components/animations/FadeIn";
import { CaseStudy } from "@/types";

interface CaseStudyResultsProps {
  study: CaseStudy;
}

export default function CaseStudyResults({ study }: CaseStudyResultsProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] py-20 lg:py-28">
      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          badge="Les résultats"
          title="Des chiffres qui parlent d'eux-mêmes"
          dark
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {study.results.map((metric, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                <div className="text-4xl font-extrabold text-accent">
                  <ScrollCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-300">{metric.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
