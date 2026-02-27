"use client";

import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";

const engagements = [
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
    title: "Reponse sous 24h",
    description:
      "Chaque demande recoit une reponse personnalisee en moins de 24 heures.",
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
    title: "Rapport mensuel detaille",
    description:
      "Un bilan complet chaque mois : performances, statistiques et axes d'amelioration.",
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
    title: "Sans engagement",
    description:
      "Pas de contrat longue duree. Vous restez libre avec un preavis de 30 jours.",
  },
];

export default function ReseauxEngagements() {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-16 lg:py-24">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {engagements.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.15}
              direction="up"
              scale
            >
              <div className="group text-center">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-accent transition-colors group-hover:bg-accent/20">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
