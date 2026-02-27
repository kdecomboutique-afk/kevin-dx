import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineItems: TimelineItem[] = [
  {
    period: "2015 - 2018",
    title: "Sapeur-pompier volontaire",
    description:
      "À 19 ans, je suis les traces de mon père et m'engage chez les pompiers. Interventions, urgences, travail d'équipe sous pression : c'est là que naît mon instinct de service. Toujours cette envie d'aider, de résoudre des problèmes concrets.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
  },
  {
    period: "2018 - 2020",
    title: "Police nationale — Marseille",
    description:
      "Adjoint de sécurité à la division Nord de Marseille, quartiers Nord. 2 ans d'interventions au cœur des réalités du terrain. Du contrôle routier aux descentes de stupéfiants — la rigueur, le sang-froid et l'humain en première ligne.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    period: "2020 - 2023",
    title: "Découverte du digital",
    description:
      "Poussé par une envie de liberté, je quitte la police pour explorer le monde numérique. E-commerce, réseaux sociaux, création de contenu, publicité en ligne — je teste tout, j'échoue, j'apprends. C'est là que je découvre la programmation web et que naît une nouvelle passion.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    period: "2023 - 2025",
    title: "Couvreur-zingueur",
    description:
      "Formation et Titre Pro couvreur-zingueur à Valenciennes, puis missions d'intérim dans le BTP. Sur les toits du sud de la France, je vois au quotidien ces artisans excellents mais invisibles en ligne. La petite voix dans ma tête me dit que je peux être plus utile avec un PC qu'un marteau.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    period: "2025 - Présent",
    title: "Kevin DX — Développeur web freelance",
    description:
      "Cette fois, plus question de rester \"le copain qui fait des trucs\". Je structure une vraie activité : 26 templates sectoriels, stack moderne (React, Next.js), automatisation IA, et un objectif simple — rendre visibles les artisans et TPE d'Occitanie.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
];

export default function CareerTimeline() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Parcours"
          title="10 ans de terrain, une seule mission"
          subtitle="Chaque étape m'a rapproché de ce que je fais aujourd'hui : aider ceux qui bossent avec leurs mains à exister en ligne."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border lg:left-1/2 lg:-translate-x-0.5" />

          {timelineItems.map((item, index) => (
            <FadeIn
              key={item.period}
              direction={index % 2 === 0 ? "right" : "left"}
              delay={index * 0.15}
            >
              <div
                className={`relative mb-12 flex items-start gap-6 lg:mb-16 ${
                  index % 2 === 0
                    ? "lg:flex-row-reverse lg:text-right"
                    : "lg:flex-row"
                }`}
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  {item.icon}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-2xl border border-border bg-surface p-6 ${
                    index % 2 === 0
                      ? "lg:mr-[calc(50%+2rem)]"
                      : "lg:ml-[calc(50%+2rem)]"
                  }`}
                >
                  <span className="mb-1 inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold text-accent">
                    {item.period}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
