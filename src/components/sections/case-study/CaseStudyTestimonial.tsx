import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import { CaseStudy } from "@/types";

interface CaseStudyTestimonialProps {
  study: CaseStudy;
}

export default function CaseStudyTestimonial({ study }: CaseStudyTestimonialProps) {
  const { testimonial } = study;
  const initials = testimonial.author
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg
                  key={i}
                  className="h-6 w-6 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mt-8">
              <p className="text-lg leading-relaxed text-text sm:text-xl">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>

            {/* Author */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-heading text-lg font-bold text-accent">
                {initials}
              </div>
              <div className="text-left">
                <p className="font-heading text-base font-bold text-primary">
                  {testimonial.author}
                </p>
                <p className="text-sm text-text-muted">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
