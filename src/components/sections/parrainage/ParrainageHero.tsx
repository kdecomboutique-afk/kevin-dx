"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ParrainageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-24 lg:py-32">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px]"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 right-0 h-[350px] w-[350px] rounded-full bg-secondary/15 blur-[100px]"
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent-light backdrop-blur-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Gagnez jusqu&apos;a 200€ par recommandation
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl leading-tight">
            Recommandez,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">gagnez</span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-full bg-accent/30 rounded-full -z-0"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ originX: 0 }}
              />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
            Vous connaissez un artisan, un commerçant ou un pro qui a besoin d&apos;un site web ?
            Recommandez Kevin DX et touchez jusqu&apos;à <strong className="text-white">10% de commission</strong> sur chaque vente.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                href="#devenir-parrain"
                variant="primary"
                size="lg"
                className="bg-accent hover:bg-accent-dark px-10 py-5 text-lg shadow-[0_0_30px_rgba(255,107,53,0.4)] hover:shadow-[0_0_50px_rgba(255,107,53,0.6)] transition-shadow duration-300"
              >
                Devenir parrain
              </Button>
            </motion.div>
            <Button
              href="#comment-ca-marche"
              variant="secondary"
              size="lg"
              className="border-white/30 text-white hover:bg-white hover:text-primary"
            >
              Comment ça marche ?
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Aucun investissement
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Commission sur vente effective
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sans limite de parrainages
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
