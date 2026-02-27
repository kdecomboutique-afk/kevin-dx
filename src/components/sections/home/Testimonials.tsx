"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const reasons = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
      </svg>
    ),
    title: "Ancien du BTP, je vous comprends",
    description:
      "Après 10 ans de terrain (pompier, policier, couvreur), je connais la réalité des TPE et artisans. Pas de jargon technique, des solutions concrètes adaptées à votre métier.",
    isHero: true,
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: "Prix justes, sans surprise",
    description:
      "Tous mes tarifs sont affichés clairement. Pas de frais cachés, pas de devis qui double en cours de route. Paiement en 3x possible.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Technologies modernes",
    description:
      "React, Next.js, Tailwind CSS — votre site est rapide, sécurisé et optimisé SEO. Pas de WordPress lent ou de constructeurs limités.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Proximité en Occitanie",
    description:
      "Basé à Roquemaure, je travaille avec les entreprises de Nîmes, Avignon, Montpellier et alentours. En visio ou en personne.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: "Design sur mesure",
    description:
      "26 templates de départ, mais chaque site est personnalisé pour refléter votre identité. Pas de copier-coller entre clients.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m0 0-4.138 3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976-4.138 3.448m0 0a9.027 9.027 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 7.288a9.014 9.014 0 0 1 9.424 0M7.288 4.33l3.448 4.138m-3.448-4.138A9.027 9.027 0 0 0 5.636 5.636 9.027 9.027 0 0 0 4.33 7.288" />
      </svg>
    ),
    title: "Accompagnement inclus",
    description:
      "Je ne livre pas un site et disparais. Formation à la gestion, support réactif, et conseils pour développer votre visibilité.",
  },
];

function formatNumber(n: number): string {
  return String(n).padStart(2, "0");
}

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <Container>
        <SectionHeading
          badge="Avantages"
          title="Pourquoi me choisir"
          subtitle="Un développeur qui comprend votre métier et vos contraintes, parce qu'il est passé par là."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <FadeIn key={reason.title} delay={index * 0.08}>
              <div
                className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  reason.isHero
                    ? "sm:col-span-2 bg-gradient-to-br from-primary via-primary-dark to-primary text-white border-primary/20"
                    : "border-border bg-white hover:border-accent/20"
                }`}
              >
                {/* Numbering */}
                <span
                  className={`absolute top-4 right-5 font-heading text-4xl font-extrabold leading-none ${
                    reason.isHero
                      ? "text-white/[0.07]"
                      : "text-primary/[0.05]"
                  }`}
                >
                  {formatNumber(index + 1)}
                </span>

                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    reason.isHero
                      ? "bg-white/10 text-accent-light"
                      : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                  }`}
                >
                  {reason.icon}
                </div>
                <h3
                  className={`font-heading text-lg font-bold ${
                    reason.isHero ? "text-white" : "text-primary"
                  }`}
                >
                  {reason.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    reason.isHero ? "text-white/70" : "text-text-muted"
                  }`}
                >
                  {reason.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
