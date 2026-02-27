"use client";

import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import Badge from "@/components/ui/Badge";

const quickNav = [
  {
    label: "Prestations",
    anchor: "#prestations",
    sub: "À partir de 199€/mois",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 002.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    label: "Templates",
    anchor: "#templates",
    sub: "99€ le template",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: "Aide au choix",
    anchor: "#guide",
    sub: "Pas sûr ? Comparez ici",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function OffresHero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <Badge className="mb-4">Mes offres</Badge>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Une solution pour{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                chaque besoin
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              Prestations clé en main, templates prêts à l&apos;emploi, ou les
              deux. Trouvez l&apos;offre qui vous correspond.
            </p>
          </FadeIn>
        </div>

        {/* Quick nav cards */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
          {quickNav.map((item, i) => (
            <FadeIn key={item.label} delay={0.3 + i * 0.1}>
              <a
                href={item.anchor}
                className="group flex flex-col items-center rounded-2xl border-2 border-border bg-white p-6 text-center transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">
                  {item.label}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{item.sub}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
