"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import type { LocalCity } from "@/data/local-seo";

interface LocalAdvantagesProps {
  city: LocalCity;
}

interface Advantage {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function getAdvantagesForCity(city: LocalCity): Advantage[] {
  return [
    {
      title: "Proximite geographique",
      description: `Base a Roquemaure, je suis ${city.distance} de ${city.name}. Rencontrons-nous dans vos locaux, un cafe ou en visioconference pour discuter de votre projet.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
    },
    {
      title: `Connaissance du ${city.department}`,
      description: `Je connais le tissu economique local, les habitudes de consommation et les specificites du marche de ${city.name}. Votre site reflete authentiquement votre environnement.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
          />
        </svg>
      ),
    },
    {
      title: "Tarifs competitifs",
      description: `En tant que freelance, je propose des tarifs bien plus accessibles que les agences web traditionnelles, sans compromis sur la qualite. Un investissement adapte aux budgets des TPE de ${city.name}.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
    {
      title: "Rendez-vous en personne",
      description: `Contrairement aux prestataires distants, je me deplace a ${city.name} pour les etapes cles de votre projet : lancement, validation des maquettes et mise en ligne.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
    {
      title: "Suivi personnalise",
      description: `Un seul interlocuteur du debut a la fin. Pas de turnover d'equipe ni de perte d'information. Je vous accompagne personnellement a chaque etape de la creation de votre site.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
    },
    {
      title: "Reactivite garantie",
      description: `Besoin d'une modification urgente ? En tant que freelance local, je reagis sous 24 heures. Votre projet a ${city.name} est toujours ma priorite, pas un dossier parmi des dizaines.`,
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
  ];
}

export default function LocalAdvantages({ city }: LocalAdvantagesProps) {
  const advantages = getAdvantagesForCity(city);

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Vos avantages"
          title={`Pourquoi choisir Kevin DX a ${city.name} ?`}
          subtitle={`Un developpeur web de proximite, engage pour la reussite numerique des entreprises du ${city.department}.`}
        />

        <StaggerChildren
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={staggerItemVariants}
              className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-accent/10 group-hover:text-accent">
                {advantage.icon}
              </div>
              <h3 className="font-heading text-lg font-bold text-primary">
                {advantage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {advantage.description}
              </p>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
