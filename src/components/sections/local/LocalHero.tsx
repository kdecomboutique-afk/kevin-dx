"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { LocalCity } from "@/data/local-seo";

interface LocalHeroProps {
  city: LocalCity;
}

export default function LocalHero({ city }: LocalHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5 py-16 sm:py-20 lg:py-28">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <Container className="relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Badge variant="accent" className="mb-6">
              <svg
                className="mr-1.5 h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
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
              Base a Roquemaure &mdash; {city.distance}
            </Badge>
          </motion.div>

          {/* H1 Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl"
          >
            Creation de Site Web a{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              {city.name}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl"
          >
            Developpeur web freelance {city.distance} de {city.name}. Sites
            vitrines, e-commerce et reseaux sociaux pour les{" "}
            <span className="font-semibold text-text">
              TPE et artisans du {city.department}
            </span>
            .
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              href="/devis"
              variant="primary"
              size="lg"
              className="animate-[pulse-glow_3s_ease-in-out_infinite]"
            >
              Devis gratuit
            </Button>
            <Button href="#tarifs" variant="secondary" size="lg">
              Voir nos tarifs
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex items-center gap-6 text-sm text-text-muted"
          >
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Devis gratuit
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sans engagement
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Reponse sous 24h
            </span>
          </motion.div>
        </div>

        {/* Engagements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
        >
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              {city.population}
            </div>
            <p className="mt-2 text-sm text-text-muted">
              dans le bassin de {city.name}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-heading text-3xl font-bold text-accent sm:text-4xl">
              95+
            </div>
            <p className="mt-2 text-sm text-text-muted">
              score Lighthouse garanti
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-heading text-3xl font-bold text-secondary sm:text-4xl">
              599€
            </div>
            <p className="mt-2 text-sm text-text-muted">
              à partir de, site vitrine
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
