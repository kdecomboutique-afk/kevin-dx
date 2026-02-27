"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import { referralSteps } from "@/data/referral";

function StepIcon({ icon, step }: { icon: string; step: number }) {
  const iconMap: Record<string, React.ReactNode> = {
    share: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    handshake: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
    ),
    cash: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  };

  return (
    <div className="relative">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        {iconMap[icon]}
      </div>
      <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
        {step}
      </span>
    </div>
  );
}

export default function ParrainageSteps() {
  return (
    <section id="comment-ca-marche" className="py-20 lg:py-28 bg-surface scroll-mt-20">
      <Container>
        <SectionHeading
          badge="Simple et transparent"
          title="Comment ça marche ?"
          subtitle="3 étapes. Pas de formulaire compliqué, pas de plateforme à apprendre."
        />

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-12">
          {referralSteps.map((item, index) => (
            <FadeIn key={item.step} delay={index * 0.15}>
              <div className="relative text-center">
                {/* Connector line (hidden on mobile, visible on desktop) */}
                {index < referralSteps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+40px)] hidden h-[2px] w-[calc(100%-80px)] bg-gradient-to-r from-accent/30 to-accent/10 md:block" />
                )}

                <div className="flex flex-col items-center">
                  <StepIcon icon={item.icon} step={item.step} />
                  <h3 className="mt-5 font-heading text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-text-muted leading-relaxed">
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
