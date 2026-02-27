"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CaseStudyCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-[#0c1f35] py-20 lg:py-28">
      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Vous voulez les mêmes résultats ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Chaque projet est unique, mais la méthode est éprouvée. Discutons de
            votre activité et voyons comment un site web professionnel peut
            transformer votre business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/devis" size="lg">
              Demander un devis gratuit
            </Button>
            <Button
              href="/etudes-de-cas"
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Voir les autres études de cas
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-400">
            Devis gratuit en 24h — Sans engagement — Satisfait ou remboursé
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
