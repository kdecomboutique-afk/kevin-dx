"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import DeviceFrame from "@/components/ui/DeviceFrame";
import HeroShowcase from "@/components/sections/home/HeroShowcase";
import StaggerChildren from "@/components/animations/StaggerChildren";
import { staggerItemVariants } from "@/components/animations/StaggerChildren";

const words = ["professionnel,", "clé en main"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Decorative elements move slower than scroll (parallax ratio 0.3-0.5)
  const dotsY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-surface via-white to-primary/5 py-16 sm:py-20 lg:py-28"
    >
      {/* Background pattern - parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
          y: prefersReducedMotion ? 0 : dotsY,
        }}
      />

      {/* Decorative gradient blobs - parallax */}
      <motion.div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        style={{ y: prefersReducedMotion ? 0 : blob1Y }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
        style={{ y: prefersReducedMotion ? 0 : blob2Y }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <StaggerChildren staggerDelay={0.15}>
            <motion.div variants={staggerItemVariants}>
              <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                Développeur Web Freelance
              </span>
            </motion.div>

            <motion.h1
              variants={staggerItemVariants}
              className="mt-6 font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 10px rgba(30, 58, 95, 0.08)" }}
            >
              Votre site web{" "}
              <span className="relative">
                <span className="relative z-10">
                  {words.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + i * 0.3,
                        duration: 0.5,
                      }}
                      className={
                        i === 0
                          ? "bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent"
                          : ""
                      }
                    >
                      {i === 0 ? "" : " "}
                      {word}
                    </motion.span>
                  ))}
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={staggerItemVariants}
              className="mt-6 max-w-lg text-lg sm:text-xl leading-relaxed text-text-muted"
            >
              Création de sites vitrines, e-commerce et gestion de réseaux
              sociaux pour{" "}
              <span className="font-semibold text-text">
                TPE, PME et artisans
              </span>
              . Des solutions sur mesure, à des prix accessibles.
            </motion.p>

            <motion.div
              variants={staggerItemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button
                href="#services"
                variant="primary"
                size="lg"
                className="animate-[pulse-glow_3s_ease-in-out_infinite]"
              >
                Voir les offres
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Me contacter
              </Button>
            </motion.div>

            <motion.div
              variants={staggerItemVariants}
              className="mt-8 flex items-center gap-6 text-sm text-text-muted"
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
                Réponse sous 24h
              </span>
            </motion.div>
          </StaggerChildren>

          {/* Right: Device frame */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="animate-[float-bob_4s_ease-in-out_infinite]">
              <DeviceFrame type="laptop" className="max-w-lg">
                <HeroShowcase />
              </DeviceFrame>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
