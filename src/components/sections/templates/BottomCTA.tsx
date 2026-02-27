"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function BottomCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-16 lg:py-24">
      {/* Animated gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-accent/15 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/10 blur-[80px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Besoin d&apos;un design{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                sur mesure
              </span>{" "}
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Mes templates ne correspondent pas exactement à votre besoin ? Pas
              de problème, je crée des sites entièrement personnalisés pour votre
              activité.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href="/devis"
                size="lg"
                className="bg-accent hover:bg-accent-dark shadow-[0_0_30px_rgba(255,107,53,0.3)]"
              >
                Demander un devis gratuit
              </Button>
              <Button
                href="/site-vitrine"
                variant="secondary"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-primary"
              >
                Voir mes offres
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
