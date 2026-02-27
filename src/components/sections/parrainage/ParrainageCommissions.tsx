"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, { staggerItemVariants } from "@/components/animations/StaggerChildren";
import { commissionTiers } from "@/data/referral";

function TierIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    monitor: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21h8M12 17v4M2 7h20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cart: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    share: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    template: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  };

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
      {iconMap[icon]}
    </div>
  );
}

export default function ParrainageCommissions() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Grille de commissions"
          title="Combien pouvez-vous gagner ?"
          subtitle="Commissions claires et transparentes, versées sur chaque vente effective."
        />

        <StaggerChildren staggerDelay={0.12} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {commissionTiers.map((tier) => (
            <motion.div
              key={tier.service}
              variants={staggerItemVariants}
              className="group relative rounded-2xl border-2 border-border bg-white p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
            >
              <TierIcon icon={tier.icon} />

              <h3 className="mt-4 font-heading text-lg font-bold text-primary">
                {tier.service}
              </h3>

              <p className="mt-1 text-sm text-text-muted">
                Prestation {tier.price}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-3xl font-extrabold text-accent">
                  {tier.rate}
                </span>
                <span className="text-sm text-text-muted">de commission</span>
              </div>

              <div className="mt-3 rounded-xl bg-green-50 px-3 py-2">
                <p className="text-sm font-semibold text-green-700">
                  {tier.amount} par vente
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Example calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-12 max-w-2xl rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8"
        >
          <h3 className="font-heading text-lg font-bold text-primary">
            Exemple concret
          </h3>
          <p className="mt-2 text-text-muted leading-relaxed">
            Vous recommandez 3 pros dans l&apos;année : un plombier prend un site vitrine (899€),
            un restaurant prend un e-commerce (2 490€), un coach prend les réseaux sociaux (199€/mois).{" "}
            <strong className="text-primary">
              Vous touchez environ 90€ + 175€ + 199€ = 464€
            </strong>{" "}
            pour avoir simplement partagé un lien.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
