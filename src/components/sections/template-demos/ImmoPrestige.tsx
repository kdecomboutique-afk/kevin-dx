"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
  SPRING_SOFT,
  DURATION,
  fadeUp,
  blurFadeUp,
  blurFadeScale,
  lineRevealX,
  clipRevealUp,
  staggerContainer,
  staggerItemSoft,
  HERO_SEQUENCE,
  SECTION,
  TYPOGRAPHY,
  delayedBlurFade,
} from "@/lib/template-design-system";

// ─── PALETTE ───
const C = {
  primary: "#0D1B2A",
  accent: "#D4AF37",
  bg: "#F5F3EF",
  dark: "#080F1A",
  muted: "#8A8A8A",
  cream: "#EDE8E0",
  white: "#FFFFFF",
};

// ─── DATA ───
const collections = [
  { type: "Villa", nom: "Villa Ephemere", lieu: "Cap d'Antibes", prix: "4 800 000", surface: "380 m²", pieces: "7 pieces", gradient: `linear-gradient(135deg, #2C3E50 0%, ${C.accent}40 50%, #1A1A2E 100%)` },
  { type: "Penthouse", nom: "Le Panoramique", lieu: "Monaco", prix: "12 500 000", surface: "520 m²", pieces: "5 pieces", gradient: `linear-gradient(135deg, #1A1A2E 0%, #2C3E50 50%, ${C.accent}30 100%)` },
  { type: "Propriete", nom: "Chateau des Vignes", lieu: "Luberon", prix: "7 200 000", surface: "850 m²", pieces: "12 pieces", gradient: `linear-gradient(135deg, ${C.accent}30 0%, #2C3E50 50%, #0D1B2A 100%)` },
];

const servicesPrestige = [
  { titre: "Recherche sur mesure", desc: "Un consultant dedie qui selectionne pour vous les biens correspondant exactement a vos criteres les plus exigeants." },
  { titre: "Visite privee", desc: "Decouvrez chaque propriete lors de visites exclusives, organisees selon vos disponibilites, en toute confidentialite." },
  { titre: "Negociation experte", desc: "30 ans d'experience en immobilier de luxe nous permettent de negocier les meilleures conditions pour chaque transaction." },
  { titre: "Accompagnement global", desc: "De la premiere visite a la remise des cles, en passant par le financement et le notaire. Un service integral." },
];

const temoignages = [
  { nom: "Famille de Rothschild", texte: "Un service d'une discretion et d'une efficacite remarquables. Immo Prestige a su comprendre nos attentes sans que nous ayons a les formuler deux fois.", lieu: "Acquereur, Saint-Tropez" },
  { nom: "M. & Mme Laurent-Perrier", texte: "La vente de notre propriete familiale necessitait tact et expertise. Le resultat a depasse nos attentes, tant sur le prix que sur les conditions.", lieu: "Vendeur, Luberon" },
];

const statsData = [
  { value: "30", suffix: " ans", label: "D'excellence" },
  { value: "500", suffix: "M+", label: "De biens vendus" },
  { value: "100", suffix: "%", label: "De discretion" },
  { value: "15", suffix: " pays", label: "Clientele internationale" },
];

// ─── CINEMATIC PAN (Signature Animation) ───
function CinematicHero() {
  const [gradientPos, setGradientPos] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      setGradientPos(Math.sin(elapsed * 0.15) * 50 + 50);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cinematic gradient that pans slowly */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${gradientPos}% 50%, ${C.accent}12 0%, transparent 50%), radial-gradient(ellipse at ${100 - gradientPos}% 60%, ${C.primary}40 0%, ${C.dark} 70%)`,
        }}
      />
      {/* Depth blur layers */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]" style={{ background: `linear-gradient(180deg, transparent 0%, ${C.dark}40 100%)` }} />
      {/* Top gold line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${C.accent}50, transparent)` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: EASE_IN_OUT }}
      />
    </div>
  );
}

export default function ImmoPrestige() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % temoignages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative" id="template-immo-prestige">
      <div className="pb-20">

        {/* ═══════════════ 1. HERO CINEMATIQUE ═══════════════ */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: C.dark }}>
          <CinematicHero />

          <div className={SECTION.container + " relative z-10 text-center"}>
            <motion.div
              className="inline-flex items-center gap-4 mb-10"
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="h-px w-16 origin-left" style={{ background: `${C.accent}60` }} variants={lineRevealX} initial="hidden" animate="visible" />
              <span className="text-xs tracking-[0.35em] uppercase" style={{ color: `${C.accent}` }}>
                Immobilier d&apos;exception
              </span>
              <motion.div className="h-px w-16 origin-right" style={{ background: `${C.accent}60` }} variants={lineRevealX} initial="hidden" animate="visible" />
            </motion.div>

            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-thin tracking-tight leading-[0.9]"
              style={{ color: C.white }}
              variants={delayedBlurFade(HERO_SEQUENCE.title)}
              initial="hidden"
              animate="visible"
            >
              IMMO{" "}
              <span style={{ color: C.accent }}>PRESTIGE</span>
            </motion.h1>

            <motion.p
              className="mt-8 text-lg font-light tracking-wide max-w-xl mx-auto"
              style={{ color: `${C.white}60` }}
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
            >
              L&apos;art de vivre dans l&apos;immobilier d&apos;exception. Proprietes de prestige, service sur mesure, discretion absolue.
            </motion.p>

            <motion.div
              className="mt-14 flex flex-col sm:flex-row gap-4 justify-center"
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="px-10 py-4 text-sm font-medium tracking-[0.2em] uppercase"
                style={{ background: C.accent, color: C.dark }}
                whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${C.accent}40`, transition: { duration: DURATION.fast } }}
                whileTap={{ scale: 0.97 }}
              >
                Nos proprietes
              </motion.button>
              <motion.button
                className="px-10 py-4 text-sm font-light tracking-[0.2em] uppercase"
                style={{ border: `1px solid ${C.accent}30`, color: C.accent }}
                whileHover={{ background: `${C.accent}10`, transition: { duration: DURATION.fast } }}
                whileTap={{ scale: 0.97 }}
              >
                Visite privee
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${C.accent}20, transparent)` }}
          />
        </section>

        {/* ═══════════════ 2. COLLECTION EXCLUSIVE ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accent }}>Collections exclusives</span>
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight mt-4" style={{ color: C.white }}>
                Biens d&apos;exception
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {collections.map((p) => (
                <motion.div
                  key={p.nom}
                  variants={staggerItemSoft}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden" style={{ background: p.gradient }}>
                    <motion.div
                      className="aspect-[3/4] flex items-center justify-center"
                      whileHover={{ scale: 1.05, transition: { duration: 0.8, ease: EASE_SMOOTH } }}
                    >
                      <svg className="w-20 h-20 opacity-5" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={0.3}>
                        <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                    </motion.div>
                    <div className="absolute top-5 left-5 px-3 py-1 text-[10px] tracking-[0.25em] uppercase" style={{ background: `${C.dark}90`, color: C.accent }}>
                      {p.type}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: `linear-gradient(transparent, ${C.dark}90)` }}>
                      <p className="text-xl font-thin" style={{ color: C.white }}>{p.nom}</p>
                      <p className="text-sm mt-1" style={{ color: `${C.white}50` }}>{p.lieu}</p>
                    </div>
                  </div>
                  <div className="p-6" style={{ background: `${C.white}05`, borderTop: `1px solid ${C.white}05` }}>
                    <p className="text-2xl font-thin" style={{ color: C.accent }}>{p.prix} &euro;</p>
                    <div className="flex gap-4 mt-3 text-xs" style={{ color: `${C.white}40` }}>
                      <span>{p.surface}</span>
                      <span style={{ color: `${C.white}15` }}>|</span>
                      <span>{p.pieces}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 3. VISITE PRIVEE ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.primary }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accent }}>Innovation</span>
                <h2 className="text-4xl sm:text-5xl font-thin tracking-tight mt-4" style={{ color: C.white }}>
                  Visite privee<br />
                  <span style={{ color: C.accent }}>360°</span>
                </h2>
                <p className="mt-6 font-light leading-relaxed" style={{ color: `${C.white}50` }}>
                  Explorez nos proprietes d&apos;exception depuis le confort de votre residence.
                  Notre technologie immersive vous permet de decouvrir chaque detail, ou que vous soyez dans le monde.
                </p>
                <div className="mt-8 space-y-4">
                  {["Visite virtuelle 4K", "Modelisation 3D interactive", "Plans interactifs detailles"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full" style={{ background: C.accent }} />
                      <span className="text-sm font-light" style={{ color: `${C.white}60` }}>{item}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  className="mt-10 px-8 py-3 text-sm tracking-[0.2em] uppercase font-light"
                  style={{ border: `1px solid ${C.accent}40`, color: C.accent }}
                  whileHover={{ background: `${C.accent}10` }}
                >
                  Planifier une visite
                </motion.button>
              </motion.div>

              <motion.div
                variants={clipRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative aspect-video overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.primary} 100%)`, border: `1px solid ${C.white}05` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                    style={{ border: `1px solid ${C.accent}40` }}
                    whileHover={{ scale: 1.1, borderColor: C.accent, background: `${C.accent}10` }}
                    transition={SPRING_SOFT}
                  >
                    <svg className="w-7 h-7 ml-1" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-5 text-[10px] tracking-[0.25em] uppercase" style={{ color: `${C.white}30` }}>
                  Visite virtuelle &bull; Villa Ephemere
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. SERVICES SUR MESURE ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accent }}>Conciergerie</span>
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight mt-4" style={{ color: C.primary }}>
                Services sur mesure
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-px"
              style={{ background: `${C.primary}10` }}
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {servicesPrestige.map((s, i) => (
                <motion.div
                  key={s.titre}
                  variants={staggerItemSoft}
                  className="group p-10 transition-colors duration-500 cursor-pointer hover:bg-[#EDE8E0]"
                  style={{ background: C.bg }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-3xl font-thin" style={{ color: `${C.accent}60` }}>0{i + 1}</span>
                    <div>
                      <h3 className="text-lg font-light tracking-tight" style={{ color: C.primary }}>{s.titre}</h3>
                      <p className="text-sm leading-relaxed mt-3" style={{ color: C.muted }}>{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 5. CHIFFRES ═══════════════ */}
        <section className="relative" style={{ background: C.dark }}>
          <div className="absolute inset-0 opacity-5" style={{ background: `repeating-linear-gradient(90deg, ${C.accent} 0, ${C.accent} 1px, transparent 0, transparent 120px)` }} />
          <div className={SECTION.container + " " + SECTION.padding}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {statsData.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItemSoft}
                  className="text-center py-6"
                >
                  <p className="text-4xl sm:text-5xl font-thin" style={{ color: C.accent }}>
                    {stat.value}<span className="text-2xl">{stat.suffix}</span>
                  </p>
                  <p className="mt-3 text-xs tracking-[0.2em] uppercase" style={{ color: `${C.white}40` }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 6. TEMOIGNAGES VIP ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.primary }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center mb-12"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accent }}>Temoignages</span>
              <h2 className="text-4xl font-thin tracking-tight mt-4" style={{ color: C.white }}>Nos clients temoignent</h2>
            </motion.div>

            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="text-center"
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }}
                >
                  <svg className="w-8 h-8 mx-auto mb-6 opacity-30" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="text-xl sm:text-2xl font-thin leading-relaxed italic" style={{ color: `${C.white}80` }}>
                    {temoignages[activeTestimonial].texte}
                  </blockquote>
                  <div className="mt-8">
                    <p className="text-sm font-light" style={{ color: C.accent }}>{temoignages[activeTestimonial].nom}</p>
                    <p className="text-xs mt-1" style={{ color: `${C.white}30` }}>{temoignages[activeTestimonial].lieu}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {temoignages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="h-0.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeTestimonial ? 24 : 8,
                    background: i === activeTestimonial ? C.accent : `${C.white}20`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 7. CONTACT CONFIDENTIEL ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.dark }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center mb-12"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: C.accent }}>Contact prive</span>
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight mt-4" style={{ color: C.white }}>
                Parlons de votre projet
              </h2>
              <p className="mt-4 text-sm font-light" style={{ color: `${C.white}40` }}>
                Toutes nos consultations sont strictement confidentielles.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={delayedBlurFade(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Nom", "Email"].map((label) => (
                  <div key={label} className="border-b py-4" style={{ borderColor: `${C.white}10`, color: `${C.white}30` }}>
                    <span className="text-sm font-light">{label}</span>
                  </div>
                ))}
              </div>
              <div className="border-b py-4" style={{ borderColor: `${C.white}10`, color: `${C.white}30` }}>
                <span className="text-sm font-light">Telephone</span>
              </div>
              <div className="border-b py-4 pb-16" style={{ borderColor: `${C.white}10`, color: `${C.white}30` }}>
                <span className="text-sm font-light">Decrivez votre projet...</span>
              </div>
              <div className="text-center pt-4">
                <motion.button
                  className="px-14 py-4 text-sm font-medium tracking-[0.2em] uppercase"
                  style={{ background: C.accent, color: C.dark }}
                  whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${C.accent}30` }}
                  whileTap={{ scale: 0.97 }}
                >
                  Envoyer
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="py-12" style={{ background: C.dark, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.container}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-xl font-thin tracking-tight" style={{ color: C.accent }}>Immo Prestige</span>
                <span className="text-xs" style={{ color: `${C.white}20` }}>|</span>
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: `${C.white}25` }}>Immobilier d&apos;exception</span>
              </div>
              <div className="flex gap-8 text-xs" style={{ color: `${C.white}30` }}>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">Mentions legales</span>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">Confidentialite</span>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">Contact</span>
              </div>
            </div>
            <div className="text-center mt-8 text-[10px] tracking-[0.2em]" style={{ color: `${C.white}15` }}>
              &copy; 2025 Immo Prestige. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}