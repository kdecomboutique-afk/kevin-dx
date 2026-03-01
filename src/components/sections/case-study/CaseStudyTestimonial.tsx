import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import { CaseStudy } from "@/types";

interface CaseStudyTestimonialProps {
  study: CaseStudy;
}

export default function CaseStudyTestimonial({ study }: CaseStudyTestimonialProps) {
  const { testimonial } = study;

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            {/* Section label */}
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
              Pourquoi investir dans un site
            </div>

            {/* Insight */}
            <blockquote className="mt-8">
              <p className="text-lg leading-relaxed text-text sm:text-xl">
                {testimonial.quote}
              </p>
            </blockquote>

            {/* Source */}
            <div className="mt-8">
              <p className="text-sm font-medium text-text-muted">
                {testimonial.author}
              </p>
              <p className="mt-0.5 text-xs text-text-muted/70">{testimonial.role}</p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
