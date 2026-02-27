"use client";

import Container from "@/components/ui/Container";
import ScrollCounter from "@/components/animations/ScrollCounter";
import FadeIn from "@/components/animations/FadeIn";

const stats = [
  {
    value: 26,
    suffix: "+",
    label: "Templates",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    value: 97,
    suffix: "/100",
    label: "Lighthouse",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    value: 24,
    suffix: "h",
    label: "Reponse",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "%",
    label: "Satisfait ou remboursé",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 lg:py-16">
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <FadeIn key={stat.label} delay={index * 0.1}>
              <div
                className={`flex flex-col items-center text-center ${
                  index < stats.length - 1
                    ? "lg:border-r lg:border-white/10"
                    : ""
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent-light">
                  {stat.icon}
                </div>
                <div className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
                  <ScrollCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <span className="mt-1 text-sm font-medium text-white/60">
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
