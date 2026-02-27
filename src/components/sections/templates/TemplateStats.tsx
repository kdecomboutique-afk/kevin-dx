"use client";

import Container from "@/components/ui/Container";
import ScrollCounter from "@/components/animations/ScrollCounter";
import FadeIn from "@/components/animations/FadeIn";

const stats = [
  { value: 26, label: "Templates disponibles", suffix: "" },
  { value: 16, label: "Secteurs d'activité", suffix: "" },
  { value: 97, label: "Score Lighthouse moyen", suffix: "/100" },
];

export default function TemplateStats() {
  return (
    <section className="border-y border-border bg-white py-10 lg:py-14">
      <Container>
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-0">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div
                className={`flex flex-col items-center text-center px-8 sm:px-12 ${
                  index < stats.length - 1
                    ? "sm:border-r sm:border-border"
                    : ""
                }`}
              >
                <div className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
                  <ScrollCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <span className="mt-1 text-sm text-text-muted">
                  {stat.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
