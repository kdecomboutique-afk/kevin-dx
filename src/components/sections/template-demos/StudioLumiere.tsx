"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
  SPRING_SOFT,
  SPRING_MEDIUM,
  DURATION,
  fadeUp,
  blurFadeUp,
  clipRevealUp,
  clipRevealLeft,
  clipRevealRight,
  lineRevealX,
  staggerContainer,
  staggerItemSoft,
  HERO_SEQUENCE,
  SECTION,
  TYPOGRAPHY,
  delayedBlurFade,
} from "@/lib/template-design-system";

// ─── PALETTE ───
const C = {
  primary: "#1A1A1A",
  accent: "#FFFFFF",
  bg: "#0A0A0A",
  dark: "#050505",
  muted: "#666666",
  dimmed: "#333333",
  white: "#FFFFFF",
};

// ─── DATA ───
const heroSlides = [
  { gradient: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)", label: "Portrait" },
  { gradient: "linear-gradient(135deg, #1a1a2a 0%, #0a0a1a 50%, #050510 100%)", label: "Mariage" },
  { gradient: "linear-gradient(135deg, #2a1a1a 0%, #1a0a0a 50%, #100505 100%)", label: "Corporate" },
];

const categories = ["Mariage", "Portrait", "Corporate"];

const galleryItems: Record<string, Array<{ title: string; ratio: string; gradient: string }>> = {
  Mariage: [
    { title: "Ceremonie en Provence", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #3a3a3a, #2a2a2a)" },
    { title: "Preparation de la mariee", ratio: "aspect-square", gradient: "linear-gradient(135deg, #2a2a2a, #1a1a1a)" },
    { title: "Reception au chateau", ratio: "aspect-square", gradient: "linear-gradient(135deg, #4a4a4a, #2a2a2a)" },
    { title: "First dance", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" },
    { title: "Details floraux", ratio: "aspect-square", gradient: "linear-gradient(135deg, #3a3a3a, #1a1a1a)" },
    { title: "Golden hour", ratio: "aspect-[4/3]", gradient: "linear-gradient(135deg, #4a3a2a, #2a2a1a)" },
  ],
  Portrait: [
    { title: "Lumiere naturelle", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #2a2a2a, #3a3a3a)" },
    { title: "Studio classique", ratio: "aspect-square", gradient: "linear-gradient(135deg, #1a1a1a, #2a2a2a)" },
    { title: "Artistique N&B", ratio: "aspect-[4/3]", gradient: "linear-gradient(135deg, #3a3a3a, #0a0a0a)" },
    { title: "Corporate headshot", ratio: "aspect-square", gradient: "linear-gradient(135deg, #2a2a2a, #1a1a1a)" },
    { title: "Famille", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #3a3a2a, #2a2a1a)" },
    { title: "Enfant", ratio: "aspect-square", gradient: "linear-gradient(135deg, #2a2a3a, #1a1a2a)" },
  ],
  Corporate: [
    { title: "Team building", ratio: "aspect-[4/3]", gradient: "linear-gradient(135deg, #2a2a3a, #1a1a2a)" },
    { title: "Portraits equipe", ratio: "aspect-square", gradient: "linear-gradient(135deg, #3a3a3a, #2a2a2a)" },
    { title: "Evenement annuel", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #2a2a2a, #1a1a1a)" },
    { title: "Bureaux", ratio: "aspect-square", gradient: "linear-gradient(135deg, #1a1a2a, #2a2a3a)" },
    { title: "Produit", ratio: "aspect-square", gradient: "linear-gradient(135deg, #3a3a3a, #1a1a1a)" },
    { title: "Conference", ratio: "aspect-[3/4]", gradient: "linear-gradient(135deg, #2a3a3a, #1a2a2a)" },
  ],
};

const prestations = [
  { nom: "Portrait", prix: "250", unite: "seance", details: "1h de prise de vue, 15 photos retouchees, galerie privee en ligne" },
  { nom: "Mariage", prix: "1 500", unite: "journee", details: "Couverture complete, 300+ photos, album premium, galerie partageable" },
  { nom: "Corporate", prix: "400", unite: "demi-journee", details: "Portraits pro, photos d'equipe, ambiance bureau, usage commercial" },
  { nom: "Evenement", prix: "600", unite: "soiree", details: "Reportage complet, galerie sous 48h, tirage grand format offert" },
];

const dernieres = [
  { titre: "Mariage de Lea & Thomas", lieu: "Chateau de Versailles", gradient: "linear-gradient(135deg, #3a3a3a, #1a1a1a)" },
  { titre: "Portrait corporate EY", lieu: "Paris La Defense", gradient: "linear-gradient(135deg, #2a2a2a, #0a0a0a)" },
  { titre: "Anniversaire de marque", lieu: "Grand Palais", gradient: "linear-gradient(135deg, #4a4a4a, #2a2a2a)" },
];

// ─── KEN BURNS HERO (Signature Animation) ───
function KenBurnsHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          style={{ background: heroSlides[current].gradient }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.5, ease: EASE_SMOOTH }, scale: { duration: 8, ease: "linear" } }}
        />
      </AnimatePresence>
      {/* Perpetual slow zoom on current */}
      <motion.div
        key={`zoom-${current}`}
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 5, ease: "linear" }}
        style={{ background: heroSlides[current].gradient, opacity: 0.5 }}
      />
      <div className="absolute inset-0" style={{ background: `linear-gradient(transparent 50%, ${C.bg} 100%)` }} />
    </div>
  );
}

export default function StudioLumiere() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="relative" id="template-studio-lumiere" style={{ background: C.bg }}>
      <div className="pb-20">

        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section className="relative min-h-screen flex items-end overflow-hidden" style={{ background: C.bg }}>
          <KenBurnsHero />

          <div className={SECTION.container + " relative z-10 pb-24"}>
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <motion.span
                className="text-[10px] tracking-[0.5em] uppercase block mb-6"
                style={{ color: `${C.white}40` }}
                variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                initial="hidden"
                animate="visible"
              >
                Photographe professionnel
              </motion.span>

              <motion.h1
                className="text-7xl sm:text-8xl md:text-9xl font-thin tracking-tighter leading-[0.85]"
                style={{ color: C.white }}
                variants={delayedBlurFade(HERO_SEQUENCE.title)}
                initial="hidden"
                animate="visible"
              >
                Studio<br />
                Lumiere
              </motion.h1>

              <motion.p
                className="mt-8 text-base font-light leading-relaxed max-w-sm"
                style={{ color: `${C.white}50` }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                Capturer l&apos;instant, sublimer l&apos;emotion. Chaque image raconte une histoire que les mots ne peuvent pas dire.
              </motion.p>

              <motion.div
                className="mt-10 flex gap-4"
                variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className="px-8 py-3 text-sm font-light tracking-[0.15em]"
                  style={{ background: C.white, color: C.bg }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Portfolio
                </motion.button>
                <motion.button
                  className="px-8 py-3 text-sm font-light tracking-[0.15em]"
                  style={{ border: `1px solid ${C.white}20`, color: C.white }}
                  whileHover={{ borderColor: `${C.white}50` }}
                >
                  Me contacter
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 2. GALERIES THEMATIQUES (Tabs) ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight" style={{ color: C.white }}>
                Portfolio
              </h2>
              <div className="flex gap-1">
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(i)}
                    className="relative px-5 py-2 text-sm font-light transition-colors"
                    style={{ color: activeCategory === i ? C.white : C.muted }}
                  >
                    {cat}
                    {activeCategory === i && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: C.white }}
                        layoutId="gallery-tab"
                        transition={SPRING_MEDIUM}
                      />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-2 md:grid-cols-3 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
              >
                {galleryItems[categories[activeCategory]].map((item, i) => {
                  const clipVariants = [clipRevealUp, clipRevealLeft, clipRevealRight];
                  return (
                    <motion.div
                      key={item.title}
                      className={`group relative overflow-hidden cursor-pointer ${item.ratio}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: DURATION.slow, ease: EASE_SMOOTH }}
                      onMouseEnter={() => setHoveredItem(i)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{ background: item.gradient }}
                        animate={{ scale: hoveredItem === i ? 1.08 : 1 }}
                        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
                      />
                      <div
                        className="absolute inset-0 transition-colors duration-500"
                        style={{ background: hoveredItem === i ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0)" }}
                      />
                      <div
                        className="absolute inset-0 flex items-end p-5 transition-opacity duration-500"
                        style={{ opacity: hoveredItem === i ? 1 : 0 }}
                      >
                        <span className="text-sm font-light tracking-wide" style={{ color: C.white }}>{item.title}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══════════════ 3. PRESTATIONS & TARIFS ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.container}>
            <motion.div
              className="mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight" style={{ color: C.white }}>
                Prestations
              </h2>
            </motion.div>

            <motion.div
              className="space-y-px"
              style={{ background: `${C.white}05` }}
              variants={staggerContainer(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {prestations.map((p) => (
                <motion.div
                  key={p.nom}
                  variants={staggerItemSoft}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 cursor-pointer transition-colors duration-300 hover:bg-[#111111]"
                  style={{ background: C.bg }}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-light tracking-tight" style={{ color: C.white }}>{p.nom}</h3>
                    <p className="text-sm mt-1" style={{ color: C.muted }}>{p.details}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-2xl font-thin" style={{ color: C.white }}>{p.prix} &euro;</span>
                      <span className="text-xs ml-1" style={{ color: C.muted }}>/ {p.unite}</span>
                    </div>
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ border: `1px solid ${C.white}20` }}
                    >
                      <svg className="w-3 h-3" style={{ color: C.white }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 4. A PROPOS ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={clipRevealLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="aspect-[3/4] overflow-hidden"
                style={{ background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-24 h-24 opacity-5" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={0.3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: C.muted }}>A propos</span>
                <h2 className="text-4xl sm:text-5xl font-thin tracking-tight mt-4" style={{ color: C.white }}>
                  Mon approche
                </h2>
                <blockquote className="mt-8 text-xl sm:text-2xl font-thin leading-relaxed italic" style={{ color: `${C.white}60` }}>
                  &ldquo;La photographie, c&apos;est l&apos;art de capturer la lumiere pour raconter des histoires que les mots ne peuvent pas dire.&rdquo;
                </blockquote>
                <p className="mt-8 text-sm leading-loose" style={{ color: C.muted }}>
                  Chaque seance est une rencontre unique. Je privilegie la lumiere naturelle,
                  les emotions authentiques et les instants spontanes. Mon objectif :
                  creer des images intemporelles qui vous ressemblent, sans artifice.
                </p>
                <motion.div className="h-px w-16 mt-8 origin-left" style={{ background: `${C.white}20` }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                <p className="text-sm mt-6" style={{ color: C.muted }}>
                  12 ans d&apos;experience &bull; 500+ mariages &bull; Publié dans Vogue, Elle, Marie Claire
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 5. DERNIERES SEANCES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.container}>
            <motion.div
              className="mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight" style={{ color: C.white }}>
                Dernieres seances
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {dernieres.map((d) => (
                <motion.div
                  key={d.titre}
                  variants={staggerItemSoft}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: d.gradient }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.8, ease: EASE_SMOOTH }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-lg font-light" style={{ color: C.white }}>{d.titre}</h3>
                    <p className="text-xs mt-1" style={{ color: `${C.white}50` }}>{d.lieu}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 6. CONTACT ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-thin tracking-tight" style={{ color: C.white }}>
                Racontez-moi<br />votre projet
              </h2>
              <p className="mt-6 text-sm font-light" style={{ color: C.muted }}>
                Chaque projet commence par une conversation.
              </p>
            </motion.div>

            <motion.div
              className="mt-12 space-y-6"
              variants={delayedBlurFade(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Prenom", "Email"].map((label) => (
                  <div key={label} className="border-b py-4" style={{ borderColor: `${C.white}08`, color: `${C.white}25` }}>
                    <span className="text-sm font-light">{label}</span>
                  </div>
                ))}
              </div>
              <div className="border-b py-4" style={{ borderColor: `${C.white}08`, color: `${C.white}25` }}>
                <span className="text-sm font-light">Type de projet</span>
              </div>
              <div className="border-b py-4 pb-16" style={{ borderColor: `${C.white}08`, color: `${C.white}25` }}>
                <span className="text-sm font-light">Decrivez votre projet...</span>
              </div>
              <div className="text-center pt-4">
                <motion.button
                  className="px-12 py-3 text-sm font-light tracking-[0.15em]"
                  style={{ background: C.white, color: C.bg }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Envoyer
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 7. FOOTER ═══════════════ */}
        <footer className="py-12" style={{ background: C.dark, borderTop: `1px solid ${C.white}05` }}>
          <div className={SECTION.container}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <span className="text-xl font-thin tracking-tight" style={{ color: C.white }}>Studio Lumiere</span>
              <div className="flex gap-8 text-xs" style={{ color: `${C.white}30` }}>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">Instagram</span>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">Behance</span>
                <span className="cursor-pointer hover:opacity-80 transition-opacity">contact@studiolumiere.fr</span>
              </div>
            </div>
            <div className="text-center mt-8 text-[10px] tracking-[0.2em]" style={{ color: `${C.white}12` }}>
              &copy; 2025 Studio Lumiere. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}