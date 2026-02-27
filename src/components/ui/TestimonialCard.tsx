import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "text-amber-400" : "text-gray-200"
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-white p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-accent/20",
        className
      )}
    >
      {/* Decorative quote icon - fades in on hover */}
      <div className="pointer-events-none absolute top-4 right-5 text-accent/0 transition-all duration-500 group-hover:text-accent/10">
        <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
      </div>

      <StarRating rating={testimonial.rating} />

      <blockquote className="mt-4 flex-1">
        <p className="text-text leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">
            {testimonial.name}
          </p>
          <p className="text-xs text-text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
