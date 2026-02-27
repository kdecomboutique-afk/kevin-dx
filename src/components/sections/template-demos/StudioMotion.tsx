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
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#09090B",
  surface: "#111113",
  card: "#1A1A1E",
  border: "#27272A",
  primary: "#EC4899",
  accent: "#F59E0B",
  white: "#FAFAFA",
  muted: "#A1A1AA",
  mutedDark: "#71717A",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Showreel", "Projects", "Studio", "Contact"];

const projects = [
  { title: "Animated Brand Identity", client: "Maison Lumiere", category: "Branding", grad: `linear-gradient(135deg, ${c.primary}, #8B5CF6)` },
  { title: "TV Commercial", client: "TechFlow", category: "Advertising", grad: `linear-gradient(135deg, #06B6D4, #3B82F6)` },
  { title: "Interactive Experience", client: "Modern Art Museum", category: "Interactive", grad: `linear-gradient(135deg, ${c.accent}, #EF4444)` },
];

const services = [
  { title: "Motion Design", desc: "Animated logos, explainer videos, UI motion, and title sequences.", icon: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 2.625c0-.621-.504-1.125-1.125-1.125M19.5 12h1.5m0 0c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 2.625h-1.5" },
  { title: "3D & CGI", desc: "Product visualization, architectural walkthroughs, character animation.", icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" },
  { title: "VFX & Compositing", desc: "Visual effects, green screen, particle systems, and post-production.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" },
  { title: "Brand Film", desc: "Storytelling that captures your brand essence in 60 seconds or less.", icon: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" },
];

const processSteps = [
  { step: "01", title: "Brief", desc: "We listen. Understand your goals, audience, and creative direction." },
  { step: "02", title: "Storyboard", desc: "Visual planning. Frame by frame narrative with timing and transitions." },
  { step: "03", title: "Production", desc: "Animation, rendering, sound design. Where the magic happens." },
  { step: "04", title: "Delivery", desc: "Final output in all formats. Revisions included until perfect." },
];

const awards = [
  { name: "Awwwards SOTD", count: "12x" },
  { name: "FWA of the Day", count: "8x" },
  { name: "CSS Design Awards", count: "15x" },
  { name: "Vimeo Staff Pick", count: "23x" },
];

const team = [
  { name: "Jules Moreau", role: "Founder & Director", color: c.primary },
  { name: "Lea Fontaine", role: "Lead Animator", color: c.accent },
  { name: "Karim Bensaid", role: "3D Artist", color: "#8B5CF6" },
  { name: "Clara Ng", role: "Sound Designer", color: "#06B6D4" },
];

/* ------------------------------------------------------------------ */
/*  Split Text Animation (Signature)                                   */
/* ------------------------------------------------------------------ */
const splitWords = ["KINETIC", "STUDIO"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.tech;

export default function StudioMotion() {
  const [activeService, setActiveService] = useState(0);

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
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Kinetic</span>
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
            Get a Quote
          </motion.button>
        </div>
      </motion.nav>

      {/* ═══ HERO — Full Screen Showreel + Split Text ═══ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background simulating a showreel */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse at 20% 50%, ${c.primary}25, transparent 60%), radial-gradient(ellipse at 80% 50%, ${c.accent}20, transparent 60%), linear-gradient(to bottom, ${c.bg}, ${c.bg})`,
              `radial-gradient(ellipse at 80% 30%, ${c.primary}20, transparent 60%), radial-gradient(ellipse at 20% 70%, ${c.accent}25, transparent 60%), linear-gradient(to bottom, ${c.bg}, ${c.bg})`,
              `radial-gradient(ellipse at 50% 80%, ${c.primary}25, transparent 60%), radial-gradient(ellipse at 50% 20%, ${c.accent}20, transparent 60%), linear-gradient(to bottom, ${c.bg}, ${c.bg})`,
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className={`${SECTION.container} relative z-10 text-center`}>
          {/* Split text effect */}
          <div className="mb-8">
            {splitWords.map((word, wi) => (
              <div key={word} className="overflow-hidden">
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + wi * 0.2, duration: 0.8, ease: EASE_OUT_EXPO as unknown as [number, number, number, number] }}
                  className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
                  style={wi === 0 ? { color: c.white } : undefined}
                >
                  {wi === 1 ? (
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}>
                      {word}
                    </span>
                  ) : word}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
            initial="hidden"
            animate="visible"
            className={`${typo.subtitle} max-w-xl mx-auto mb-10`}
            style={{ color: c.muted }}
          >
            We create motion that moves people. Brand films, 3D, VFX & interactive experiences.
          </motion.p>

          <motion.div
            variants={delayedBlurFade(HERO_SEQUENCE.cta)}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}40` }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-medium text-white flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Play Showreel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl font-medium border"
              style={{ borderColor: c.border, color: c.muted }}
            >
              Our Work
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECTS — Cinematic Case Studies ═══ */}
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
              <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>FEATURED WORK</span>
              <h2 className={typo.sectionTitle}>Selected Projects</h2>
            </div>
          </motion.div>

          <div className="space-y-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                {...hoverLift}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ background: c.card }}
              >
                {/* Gradient visual */}
                <div className="aspect-[21/9] relative">
                  <div className="absolute inset-0" style={{ background: p.grad }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-md"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                    <p className="text-sm" style={{ color: c.muted }}>{p.client} &middot; {p.category}</p>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{ borderColor: c.border }}
                    whileHover={{ scale: 1.1, borderColor: c.primary }}
                  >
                    <svg className="w-5 h-5" style={{ color: c.muted }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
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
            <h2 className={typo.sectionTitle}>What we create</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={staggerItemSnappy}
                onHoverStart={() => setActiveService(i)}
                {...hoverLift}
                className={`group rounded-2xl border p-8 cursor-pointer transition-colors duration-300`}
                style={{
                  background: activeService === i ? c.card : c.bg,
                  borderColor: activeService === i ? c.primary + "40" : c.border,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: activeService === i ? c.primary + "20" : c.primary + "10" }}
                >
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

      {/* ═══ PROCESS — Horizontal Timeline ═══ */}
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
            <h2 className={typo.sectionTitle}>From concept to screen</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative"
          >
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: `linear-gradient(to right, ${c.primary}40, ${c.accent}40)` }} />

            {processSteps.map((p) => (
              <motion.div key={p.step} variants={staggerItemSnappy} className="text-center relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 font-mono text-sm font-bold relative z-10"
                  style={{ background: c.primary + "20", color: c.primary, border: `2px solid ${c.primary}40` }}
                >
                  {p.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ AWARDS & CLIENTS ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>RECOGNITION</span>
            <h2 className={typo.sectionTitle}>Awards & Accolades</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {awards.map((a) => (
              <motion.div
                key={a.name}
                variants={staggerItemSnappy}
                className="text-center p-6 rounded-2xl border"
                style={{ background: c.bg, borderColor: c.border }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: c.primary }}>{a.count}</div>
                <div className="text-sm" style={{ color: c.muted }}>{a.name}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>TEAM</span>
            <h2 className={typo.sectionTitle}>Creative minds</h2>
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
                    style={{ background: `linear-gradient(135deg, ${t.color}25, transparent)` }}
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
            <span className={`${typo.caption} block mb-4 relative z-10`} style={{ color: c.primary }}>LET&apos;S CREATE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4 relative z-10">
              Got a story to tell?
            </h2>
            <p className="text-base mb-8 max-w-lg mx-auto relative z-10" style={{ color: c.muted }}>
              We turn ideas into motion. Let&apos;s make something unforgettable together.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}40` }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 px-10 py-4 rounded-xl font-medium text-white text-lg"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12" style={{ borderColor: c.border }}>
        <div className={`${SECTION.container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </div>
            <span className="font-semibold">Kinetic Studio</span>
          </div>
          <div className="flex items-center gap-6">
            {["Vimeo", "Instagram", "Behance", "Twitter"].map((l) => (
              <span key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: c.mutedDark }}>{l}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: c.mutedDark }}>&copy; 2026 Kinetic Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
