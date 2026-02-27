"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SECTION,
  TYPOGRAPHY,
  DURATION,
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  SPRING_SNAPPY,
  fadeUp,
  blurFadeUp,
  staggerContainer,
  staggerItemSnappy,
  hoverLift,
  HERO_SEQUENCE,
  delayedBlurFade,
  lineRevealX,
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#0C0C0C",
  surface: "#141414",
  card: "#1A1A1A",
  border: "#262626",
  primary: "#7C3AED",
  accent: "#3B82F6",
  white: "#FAFAFA",
  muted: "#A1A1AA",
  mutedDark: "#71717A",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Projects", "Services", "Team", "Contact"];

const projects = [
  { name: "Maison Lumiere", category: "E-commerce Luxe", year: "2025", grad: `linear-gradient(135deg, ${c.primary}, ${c.accent})` },
  { name: "TechFlow", category: "SaaS Platform", year: "2025", grad: `linear-gradient(135deg, #06B6D4, #3B82F6)` },
  { name: "Artisan Provence", category: "Brand Identity", year: "2024", grad: `linear-gradient(135deg, #F59E0B, #EF4444)` },
  { name: "NeoBank", category: "Fintech App", year: "2024", grad: `linear-gradient(135deg, #10B981, #06B6D4)` },
];

const services = [
  { title: "Branding", desc: "Visual identity, logo systems, and brand guidelines that make you unforgettable.", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 1.06 9.037 9.037 0 005.052 1.44H7.5a8.966 8.966 0 004.56-1.24M15 9.75a3 3 0 11-6 0 3 3 0 016 0zm6 2.25a6 6 0 11-12 0 6 6 0 0112 0z" },
  { title: "Web Design", desc: "Pixel-perfect websites that convert visitors into customers. Awwwards-quality.", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" },
  { title: "App Development", desc: "Native and cross-platform apps with beautiful UX and bulletproof architecture.", icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" },
  { title: "Marketing", desc: "Growth strategies, SEO, and performance campaigns that deliver measurable ROI.", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" },
];

const process = [
  { step: "01", title: "Discover", desc: "Deep-dive into your brand, goals, audience, and competitive landscape." },
  { step: "02", title: "Design", desc: "Wireframes, prototypes, and visual direction. Iterate until perfect." },
  { step: "03", title: "Develop", desc: "Clean, performant code. Modern stack. Lighthouse 95+ guaranteed." },
  { step: "04", title: "Deploy", desc: "Launch, monitor, optimize. Ongoing support and growth strategy." },
];

const team = [
  { name: "Lucas Martin", role: "Creative Director", color: c.primary },
  { name: "Emma Rousseau", role: "Lead Designer", color: c.accent },
  { name: "Thomas Petit", role: "Tech Lead", color: "#06B6D4" },
  { name: "Chloe Bernard", role: "Strategist", color: "#F59E0B" },
];

const clients = ["Apple", "Stripe", "Vercel", "Linear", "Figma", "Notion", "Arc", "Framer"];

/* ------------------------------------------------------------------ */
/*  Text Reveal Word by Word                                           */
/* ------------------------------------------------------------------ */
const heroWords = ["We", "craft", "digital", "experiences", "that", "matter."];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.5 + i * 0.12, duration: 0.6, ease: EASE_SMOOTH as unknown as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.tech;

export default function AgenceDigitale() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div style={{ background: c.bg }} className="text-white overflow-hidden">
      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.normal, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ borderColor: c.border + "60", background: c.bg + "DD" }}
      >
        <div className={`${SECTION.container} flex items-center justify-between h-16`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
            <span className="font-semibold text-lg">Nexus Studio</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <span key={l} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${c.primary}40` }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: c.primary }}
          >
            Start a Project
          </motion.button>
        </div>
      </motion.nav>

      {/* ═══ HERO — Word by Word Reveal ═══ */}
      <section className="min-h-[80vh] flex items-center relative">
        <div className={SECTION.container}>
          <div className="max-w-5xl">
            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-8"
              style={{ borderColor: c.primary + "40", color: c.primary, background: c.primary + "08" }}
            >
              DIGITAL AGENCY &middot; EST. 2020
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-8">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={`inline-block mr-[0.3em] ${word === "digital" || word === "experiences" ? "bg-clip-text text-transparent" : ""}`}
                  style={
                    word === "digital" || word === "experiences"
                      ? { backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }
                      : undefined
                  }
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
              className={`${typo.subtitle} max-w-xl mb-10`}
              style={{ color: c.muted }}
            >
              We build brands, websites, and apps for companies that refuse to blend in.
            </motion.p>

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}40` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
              >
                View Our Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium border"
                style={{ borderColor: c.border, color: c.muted }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS — Magnetic Cursor Reveal (Signature) ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>SELECTED WORK</span>
              <h2 className={typo.sectionTitle}>Case Studies</h2>
            </div>
            <span className="hidden md:block text-sm font-mono" style={{ color: c.mutedDark }}>04 Projects</span>
          </motion.div>

          <div className="space-y-1">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                onHoverStart={() => setHoveredProject(i)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative border-t py-8 md:py-10 cursor-pointer"
                style={{ borderColor: c.border }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 md:gap-12">
                    <span className="text-sm font-mono" style={{ color: c.mutedDark }}>0{i + 1}</span>
                    <div>
                      <motion.h3
                        animate={{ x: hoveredProject === i ? 16 : 0 }}
                        transition={SPRING_SNAPPY}
                        className="text-2xl md:text-4xl font-semibold tracking-tight"
                      >
                        {p.name}
                      </motion.h3>
                      <span className="text-sm mt-1 block" style={{ color: c.muted }}>{p.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm font-mono" style={{ color: c.mutedDark }}>{p.year}</span>
                    <motion.div
                      animate={{ scale: hoveredProject === i ? 1 : 0, opacity: hoveredProject === i ? 1 : 0 }}
                      transition={SPRING_SNAPPY}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: c.primary }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* Reveal mask on hover */}
                <AnimatePresence>
                  {hoveredProject === i && (
                    <motion.div
                      initial={{ clipPath: "circle(0% at 80% 50%)" }}
                      animate={{ clipPath: "circle(25% at 80% 50%)" }}
                      exit={{ clipPath: "circle(0% at 80% 50%)" }}
                      transition={{ duration: 0.5, ease: [...EASE_OUT_EXPO] }}
                      className="absolute inset-0 z-0 pointer-events-none hidden md:block"
                      style={{ background: p.grad, opacity: 0.08 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t" style={{ borderColor: c.border }} />
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>SERVICES</span>
            <h2 className={typo.sectionTitle}>What we do best</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((s) => (
              <motion.div
                key={s.title}
                variants={staggerItemSnappy}
                {...hoverLift}
                className="group rounded-2xl border p-8 cursor-pointer"
                style={{ background: c.card, borderColor: c.border }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: c.primary + "12" }}>
                  <svg className="w-6 h-6" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>PROCESS</span>
            <h2 className={typo.sectionTitle}>How we work</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {process.map((p) => (
              <motion.div
                key={p.step}
                variants={staggerItemSnappy}
                className="relative"
              >
                <span className="text-6xl font-bold opacity-5 absolute -top-4 -left-2">{p.step}</span>
                <div className="pt-8">
                  <div className="text-xs font-mono mb-3" style={{ color: c.primary }}>{p.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>TEAM</span>
            <h2 className={typo.sectionTitle}>The people behind the pixels</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {team.map((t) => (
              <motion.div
                key={t.name}
                variants={staggerItemSnappy}
                {...hoverLift}
                className="group text-center cursor-pointer"
              >
                <div className="aspect-square rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden"
                  style={{ background: c.card }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${t.color}20, transparent)` }}
                  />
                  <span className="text-5xl font-bold" style={{ color: t.color + "30" }}>{t.name[0]}</span>
                </div>
                <h3 className="font-semibold mb-1">{t.name}</h3>
                <p className="text-sm" style={{ color: c.muted }}>{t.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CLIENTS ═══ */}
      <section className={SECTION.paddingCompact}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.mutedDark }}>TRUSTED BY</span>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {clients.map((cl) => (
              <motion.span
                key={cl}
                variants={staggerItemSnappy}
                className="text-lg md:text-xl font-semibold cursor-pointer hover:text-white transition-colors"
                style={{ color: c.mutedDark }}
              >
                {cl}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={blurFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative text-center rounded-3xl border overflow-hidden py-20 px-6"
            style={{ borderColor: c.border, background: c.surface }}
          >
            <div className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${c.primary}30, transparent 70%)` }}
            />
            <span className={`${typo.caption} block mb-4 relative z-10`} style={{ color: c.primary }}>LET&apos;S TALK</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 relative z-10">
              Got a project in mind?
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto relative z-10" style={{ color: c.muted }}>
              Tell us about your vision. We&apos;ll make it real.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}40` }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 px-10 py-4 rounded-xl font-medium text-white text-lg"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              Start a Project
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12" style={{ borderColor: c.border }}>
        <div className={`${SECTION.container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
            <span className="font-semibold">Nexus Studio</span>
          </div>
          <div className="flex items-center gap-6">
            {["Twitter", "Dribbble", "GitHub", "LinkedIn"].map((l) => (
              <span key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: c.mutedDark }}>{l}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: c.mutedDark }}>&copy; 2026 Nexus Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
