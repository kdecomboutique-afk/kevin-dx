"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-24 lg:py-36">
      {/* Static decorative dot pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Content */}
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Headline */}
          <h2 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            Prêt à lancer{" "}
            <span className="relative inline-block">
              <span className="relative z-10">votre projet</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-full bg-accent/30 rounded-full -z-0"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </span>{" "}
            ?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
            Lancez votre projet web avec un développeur qui comprend votre
            métier.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                href="/devis"
                variant="primary"
                size="lg"
                className="bg-accent hover:bg-accent-dark px-10 py-5 text-lg shadow-[0_0_30px_rgba(255,107,53,0.4)] hover:shadow-[0_0_50px_rgba(255,107,53,0.6)] transition-shadow duration-300"
              >
                Devis gratuit en 2 min
              </Button>
            </motion.div>
            <Button
              href="#services"
              variant="secondary"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Découvrir mes offres
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
