"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function FloatingIcon({
  children,
  className,
  duration = 6,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute text-white/10 ${className}`}
      animate={{
        y: [0, -18, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-24 lg:py-36">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[100px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-secondary/15 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent-light/10 blur-[80px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Decorative dot pattern */}
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

      {/* Floating decorative elements */}
      <FloatingIcon className="top-[12%] left-[8%] text-3xl lg:text-4xl" duration={7} delay={0}>
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="top-[18%] right-[10%]" duration={8} delay={1}>
        <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="bottom-[20%] left-[12%]" duration={6} delay={2}>
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      </FloatingIcon>
      <FloatingIcon className="bottom-[15%] right-[8%]" duration={9} delay={0.5}>
        <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      </FloatingIcon>

      {/* Content */}
      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Promo badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent-light backdrop-blur-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            Offre de lancement : -20% sur votre premier projet
          </motion.div>

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
            Rejoignez les TPE et artisans d&apos;Occitanie qui font confiance à
            Kevin DX pour leur présence en ligne.
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
