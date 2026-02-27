"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/animations/FadeIn";
import StaggerChildren, { staggerItemVariants } from "@/components/animations/StaggerChildren";

const aiFeatures = [
  {
    title: "Chatbot IA 24h/24",
    description:
      "Ne ratez plus aucun prospect pendant que vous êtes sur un chantier. Votre chatbot répond instantanément, qualifie les demandes et planifie les rendez-vous.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
  },
  {
    title: "Relance automatique devis",
    description:
      "Votre prospect reçoit un email personnalisé immédiatement après sa demande, puis une relance intelligente à J+3. Vous ne laissez plus filer aucun client.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Publication auto réseaux",
    description:
      "Votre contenu est publié automatiquement sur Instagram, Facebook et Google Business. Vous restez visible sans lever le petit doigt.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
      </svg>
    ),
  },
  {
    title: "Rapports mensuels auto",
    description:
      "Recevez chaque mois un rapport clair de votre visibilité en ligne : visiteurs, demandes de devis, performances. Sans rien demander.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default function AIAdvantage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] py-20 lg:py-28">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-12 text-center lg:mb-16">
            <Badge className="mb-4 inline-flex items-center gap-1.5 border border-violet-400/30 bg-violet-500/10 text-violet-300">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              Exclusif Kevin DX
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ce que la concurrence{" "}
              <span className="bg-gradient-to-r from-violet-400 to-accent bg-clip-text text-transparent">
                ne propose pas
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
              Des bonus IA intégrés à chaque site pour automatiser votre
              prospection et votre communication. Pendant que vous travaillez,
              votre site travaille aussi.
            </p>
          </div>
        </FadeIn>

        {/* Cards grid */}
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
          {aiFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItemVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-400/30 hover:bg-white/[0.08] hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.06), transparent 40%)" }} />

              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-colors duration-300 group-hover:bg-violet-500/20">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
