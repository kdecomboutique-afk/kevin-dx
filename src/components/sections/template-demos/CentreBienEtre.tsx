"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_IN_OUT,
  SPRING_SOFT,
  SPRING_MEDIUM,
  DURATION,
  fadeUp,
  blurFadeUp,
  lineRevealX,
  staggerContainer,
  staggerItemSoft,
  hoverLift,
  HERO_SEQUENCE,
  SECTION,
  TYPOGRAPHY,
  delayedBlurFade,
} from "@/lib/template-design-system";

// ─── PALETTE ───
const C = {
  primary: "#7C9A7E",
  accent: "#D4B896",
  bg: "#F9F7F4",
  dark: "#2D3B2D",
  muted: "#8A8A7A",
  cream: "#F4F1EC",
  white: "#FFFFFF",
};

// ─── DATA ───
const soinsTabs = ["Visage", "Corps", "Massage"];

const soinsData: Record<string, Array<{ nom: string; duree: string; prix: string; desc: string }>> = {
  Visage: [
    { nom: "Eclat Vitamine C", duree: "45 min", prix: "75", desc: "Soin booster d'eclat aux actifs naturels. Teint lumineux et unifie." },
    { nom: "Hydratation Profonde", duree: "60 min", prix: "95", desc: "Cocktail d'acide hyaluronique et aloe vera. Peau repulpee et confortable." },
    { nom: "Anti-Age Premium", duree: "75 min", prix: "125", desc: "Soin complet aux peptides et retinol vegetal. Action anti-rides visible." },
  ],
  Corps: [
    { nom: "Gommage Douceur", duree: "30 min", prix: "55", desc: "Exfoliation aux cristaux de sel rose et huiles bio. Peau soyeuse." },
    { nom: "Enveloppement Detox", duree: "60 min", prix: "89", desc: "Argile verte et algues marines. Detoxifie et raffermit en profondeur." },
    { nom: "Rituel Corps Complet", duree: "90 min", prix: "139", desc: "Gommage, enveloppement et massage. L'experience spa ultime." },
  ],
  Massage: [
    { nom: "Relaxant Suedois", duree: "60 min", prix: "85", desc: "Pressions douces et profondes. Liberation des tensions musculaires." },
    { nom: "Pierres Chaudes", duree: "75 min", prix: "105", desc: "Basalte chaud et huiles essentielles. Relaxation absolue." },
    { nom: "Ayurvedique", duree: "90 min", prix: "129", desc: "Massage ancestral a l'huile tiede de sesame. Harmonie corps et esprit." },
  ],
};

const forfaits = [
  { nom: "Decouverte", prix: "109", features: ["1 soin au choix", "Acces espace detente 2h", "Tisane bio offerte", "Peignoir et serviettes"], highlight: false },
  { nom: "Evasion", prix: "229", features: ["2 soins au choix", "Acces spa illimite", "Dejeuner bien-etre", "Produits bio en cadeau"], highlight: true },
  { nom: "Prestige", prix: "359", features: ["3 soins premium au choix", "Acces spa + hammam VIP", "Champagne & mignardises", "Coffret de soins offert"], highlight: false },
];

const espaces = [
  { nom: "Piscine Chauffee", desc: "Bassin a 32°C avec jets hydromassants et nage a contre-courant.", gradient: `linear-gradient(135deg, ${C.primary}30, ${C.accent}20)` },
  { nom: "Hammam & Sauna", desc: "Vapeur eucalyptus et sauna finlandais traditionnel en bois de cedre.", gradient: `linear-gradient(135deg, ${C.accent}30, ${C.primary}20)` },
  { nom: "Jardin Zen", desc: "Terrasse paisible avec fontaine, transats et tisanerie en libre-service.", gradient: `linear-gradient(135deg, ${C.dark}20, ${C.primary}30)` },
];

const temoignages = [
  { nom: "Amelie D.", texte: "Un havre de paix absolu. Le massage aux pierres chaudes est divin, et le personnel est d'une bienveillance rare.", note: 5 },
  { nom: "Laurent M.", texte: "J'offre le forfait Evasion a ma femme chaque annee. C'est devenu notre rituel. L'espace est magnifique.", note: 5 },
  { nom: "Sophie R.", texte: "Le soin visage Eclat Vitamine C a transforme ma peau. Je n'utilise plus de fond de teint depuis 3 mois.", note: 5 },
];

// ─── BREATHING CIRCLE (Signature Animation) ───
function BreathingCircle() {
  return (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: `1px solid ${C.primary}15` }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{ border: `1px solid ${C.primary}20` }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT, delay: 0.3 }}
      />
      {/* Inner circle */}
      <motion.div
        className="absolute inset-8 rounded-full flex items-center justify-center"
        style={{ background: `${C.primary}08` }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT, delay: 0.6 }}
      >
        <motion.span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: C.primary }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT }}
        >
          Respirez
        </motion.span>
      </motion.div>
      {/* Decorative dots */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <motion.div
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: C.primary,
            top: "50%",
            left: "50%",
            transform: `rotate(${deg}deg) translateY(-${92}px) translate(-50%, -50%)`,
          }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT, delay: deg / 360 * 2 }}
        />
      ))}
    </div>
  );
}

export default function CentreBienEtre() {
  const [activeSoinTab, setActiveSoinTab] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="relative" id="template-bien-etre">
      <div className="pb-20">

        {/* ═══════════════ 1. HERO ZEN ═══════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: C.bg }}>
          {/* Subtle decorative background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ background: `radial-gradient(circle at 30% 50%, ${C.primary} 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${C.accent} 0%, transparent 50%)` }} />

          <div className={SECTION.container + " relative z-10"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div className="h-px w-10 origin-left" style={{ background: C.primary }} variants={lineRevealX} initial="hidden" animate="visible" />
                  <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>Spa & Bien-etre</span>
                </motion.div>

                <motion.h1
                  className={TYPOGRAPHY.zen.heroTitle + " leading-[0.95] mb-6"}
                  style={{ color: C.dark }}
                  variants={delayedBlurFade(HERO_SEQUENCE.title)}
                  initial="hidden"
                  animate="visible"
                >
                  Serenite<br />
                  <span style={{ color: C.primary }}>Spa</span>
                </motion.h1>

                <motion.p
                  className={TYPOGRAPHY.zen.subtitle + " max-w-md mb-10"}
                  style={{ color: C.muted }}
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden"
                  animate="visible"
                >
                  Un sanctuaire de calme et de beaute, ou chaque soin est une invitation au lacher-prise.
                </motion.p>

                <motion.div
                  className="flex gap-4"
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    className="px-8 py-3 rounded-full text-sm font-light tracking-wide"
                    style={{ background: C.primary, color: C.white }}
                    whileHover={{ scale: 1.03, boxShadow: `0 8px 30px ${C.primary}30` }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Reserver un soin
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 rounded-full text-sm font-light tracking-wide"
                    style={{ border: `1px solid ${C.primary}30`, color: C.primary }}
                    whileHover={{ background: `${C.primary}08` }}
                  >
                    Carte des soins
                  </motion.button>
                </motion.div>
              </div>

              {/* Breathing circle */}
              <motion.div
                className="flex items-center justify-center"
                variants={delayedBlurFade(HERO_SEQUENCE.visual)}
                initial="hidden"
                animate="visible"
              >
                <BreathingCircle />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 2. CATALOGUE SOINS (Tabs) ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-12"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>Nos soins</span>
              <h2 className={TYPOGRAPHY.zen.sectionTitle + " mt-3"} style={{ color: C.dark }}>Carte des Soins</h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-12">
              {soinsTabs.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveSoinTab(i)}
                  className="relative px-6 py-2 rounded-full text-sm font-light transition-colors"
                  style={{
                    background: activeSoinTab === i ? `${C.primary}10` : "transparent",
                    color: activeSoinTab === i ? C.dark : C.muted,
                  }}
                >
                  {tab}
                  {activeSoinTab === i && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${C.primary}20` }}
                      layoutId="soin-tab"
                      transition={SPRING_MEDIUM}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSoinTab}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
              >
                {soinsData[soinsTabs[activeSoinTab]].map((soin, i) => (
                  <motion.div
                    key={soin.nom}
                    className="group p-7 rounded-2xl transition-all duration-300 cursor-pointer"
                    style={{ background: C.bg, border: `1px solid ${C.primary}08` }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, ...SPRING_SOFT }}
                    whileHover={{ y: -4, boxShadow: `0 8px 30px ${C.primary}10` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs tracking-wider" style={{ color: C.muted }}>{soin.duree}</span>
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: C.primary }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT, delay: i * 1 }}
                      />
                    </div>
                    <h3 className="text-lg font-light tracking-tight mb-2" style={{ color: C.dark }}>{soin.nom}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: C.muted }}>{soin.desc}</p>
                    <div className="text-xl font-light" style={{ color: C.primary }}>{soin.prix} &euro;</div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══════════════ 3. FORFAITS & CURES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>Forfaits</span>
              <h2 className={TYPOGRAPHY.zen.sectionTitle + " mt-3"} style={{ color: C.dark }}>Offres Bien-etre</h2>
              <p className="text-base font-light mt-4 max-w-md mx-auto" style={{ color: C.muted }}>
                Des experiences completes pour vous ou vos proches.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {forfaits.map((f) => (
                <motion.div
                  key={f.nom}
                  variants={staggerItemSoft}
                  className="relative p-8 rounded-2xl text-center transition-all duration-300"
                  style={{
                    background: f.highlight ? C.dark : C.white,
                    border: f.highlight ? "none" : `1px solid ${C.primary}10`,
                  }}
                  {...hoverLift}
                >
                  {f.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ background: C.accent, color: C.dark }}>
                      Populaire
                    </div>
                  )}
                  <h3 className="text-lg font-light tracking-tight" style={{ color: f.highlight ? C.white : C.dark }}>{f.nom}</h3>
                  <div className="my-6">
                    <span className="text-4xl font-thin" style={{ color: f.highlight ? C.accent : C.primary }}>{f.prix}</span>
                    <span className="text-sm ml-1" style={{ color: f.highlight ? `${C.white}50` : C.muted }}>&euro;</span>
                  </div>
                  <ul className="space-y-3 text-sm text-left">
                    {f.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: f.highlight ? C.accent : C.primary }} />
                        <span style={{ color: f.highlight ? `${C.white}70` : C.muted }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    className="w-full mt-8 py-3 rounded-full text-sm font-light tracking-wide"
                    style={{
                      background: f.highlight ? C.accent : `${C.primary}10`,
                      color: f.highlight ? C.dark : C.primary,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reserver
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 4. ESPACE SPA ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>L&apos;espace</span>
              <h2 className={TYPOGRAPHY.zen.sectionTitle + " mt-3"} style={{ color: C.dark }}>Notre Univers</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {espaces.map((e) => (
                <motion.div
                  key={e.nom}
                  variants={staggerItemSoft}
                  className="group rounded-2xl overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-[4/3]" style={{ background: e.gradient }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: `${C.white}10` }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT }}
                      >
                        <svg className="w-6 h-6" style={{ color: `${C.dark}40` }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-6" style={{ background: C.bg }}>
                    <h3 className="text-lg font-light tracking-tight" style={{ color: C.dark }}>{e.nom}</h3>
                    <p className="text-sm leading-relaxed mt-2" style={{ color: C.muted }}>{e.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 5. CARTE CADEAU ═══════════════ */}
        <section className="relative overflow-hidden" style={{ background: C.dark }}>
          <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at 20% 50%, ${C.primary}, transparent 50%), radial-gradient(circle at 80% 50%, ${C.accent}, transparent 50%)` }} />
          <div className={SECTION.container + " " + SECTION.padding}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className={TYPOGRAPHY.zen.caption} style={{ color: C.accent, letterSpacing: "0.25em" }}>Offrir</span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight mt-4 mb-6" style={{ color: C.white }}>
                  Carte Cadeau
                </h2>
                <p className="text-base font-light leading-relaxed mb-8" style={{ color: `${C.white}50` }}>
                  Offrez un moment de pure serenite a vos proches. Nos cartes cadeaux sont personnalisables et valables 1 an.
                </p>
                <div className="flex gap-3">
                  {["50 €", "100 €", "150 €", "Sur mesure"].map((montant) => (
                    <motion.button
                      key={montant}
                      className="px-5 py-2 rounded-full text-sm font-light"
                      style={{ border: `1px solid ${C.accent}30`, color: C.accent }}
                      whileHover={{ background: `${C.accent}15`, scale: 1.03 }}
                    >
                      {montant}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative"
                variants={delayedBlurFade(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="aspect-[3/2] rounded-2xl flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.primary}40, ${C.accent}30)` }}>
                  <motion.div
                    className="absolute inset-0"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 12, repeat: Infinity, ease: EASE_IN_OUT }}
                    style={{ backgroundSize: "200% 200%", background: `linear-gradient(135deg, ${C.primary}20, ${C.accent}20, ${C.primary}20)` }}
                  />
                  <div className="text-center relative z-10">
                    <p className="text-xs tracking-[0.3em] uppercase" style={{ color: `${C.white}50` }}>Serenite Spa</p>
                    <p className="text-3xl font-thin mt-2" style={{ color: C.white }}>Carte Cadeau</p>
                    <motion.div className="h-px w-12 mx-auto mt-4 origin-center" style={{ background: `${C.accent}50` }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 6. TEMOIGNAGES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center mb-12"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>Avis</span>
              <h2 className={TYPOGRAPHY.zen.sectionTitle + " mt-3"} style={{ color: C.dark }}>Ce qu&apos;ils en disent</h2>
            </motion.div>

            <div className="relative min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className="text-center"
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: DURATION.slow, ease: EASE_SMOOTH }}
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: temoignages[activeTestimonial].note }).map((_, i) => (
                      <motion.svg
                        key={i}
                        className="w-4 h-4"
                        style={{ color: C.accent }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: EASE_IN_OUT, delay: i * 0.3 }}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </motion.svg>
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl font-light leading-relaxed italic" style={{ color: C.dark }}>
                    &ldquo;{temoignages[activeTestimonial].texte}&rdquo;
                  </blockquote>
                  <p className="text-sm font-light mt-6" style={{ color: C.primary }}>{temoignages[activeTestimonial].nom}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {temoignages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    background: i === activeTestimonial ? C.primary : `${C.primary}20`,
                    transform: i === activeTestimonial ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════ 7. RESERVATION ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center mb-12"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.zen.caption} style={{ color: C.primary, letterSpacing: "0.25em" }}>Reservation</span>
              <h2 className={TYPOGRAPHY.zen.sectionTitle + " mt-3"} style={{ color: C.dark }}>
                Reservez votre moment
              </h2>
              <p className="text-base font-light mt-4" style={{ color: C.muted }}>
                Offrez-vous une parenthese de douceur.
              </p>
            </motion.div>

            <motion.div
              className="space-y-5 max-w-lg mx-auto"
              variants={delayedBlurFade(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {["Nom", "Telephone"].map((label) => (
                  <div key={label} className="px-5 py-3 rounded-xl text-sm font-light" style={{ background: C.bg, color: C.muted, border: `1px solid ${C.primary}08` }}>
                    {label}
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 rounded-xl text-sm font-light" style={{ background: C.bg, color: C.muted, border: `1px solid ${C.primary}08` }}>
                Soin souhaite
              </div>
              <div className="px-5 py-3 rounded-xl text-sm font-light" style={{ background: C.bg, color: C.muted, border: `1px solid ${C.primary}08` }}>
                Date & creneau prefere
              </div>
              <div className="px-5 pt-3 pb-12 rounded-xl text-sm font-light" style={{ background: C.bg, color: C.muted, border: `1px solid ${C.primary}08` }}>
                Message (optionnel)
              </div>
              <motion.button
                className="w-full py-3 rounded-full text-sm font-light tracking-wide"
                style={{ background: C.primary, color: C.white }}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.primary}25` }}
                whileTap={{ scale: 0.98 }}
              >
                Confirmer ma reservation
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-light tracking-tight mb-4" style={{ color: C.accent }}>Serenite Spa</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${C.white}30` }}>
                  Un sanctuaire de calme et de beaute au coeur de la Provence.
                </p>
              </div>
              <div>
                <h4 className={TYPOGRAPHY.zen.caption + " mb-4"} style={{ color: C.white, letterSpacing: "0.2em" }}>Horaires</h4>
                <div className="space-y-2 text-sm" style={{ color: `${C.white}30` }}>
                  <p>Lundi - Samedi : 9h30 - 19h30</p>
                  <p>Dimanche : 10h - 17h</p>
                </div>
              </div>
              <div>
                <h4 className={TYPOGRAPHY.zen.caption + " mb-4"} style={{ color: C.white, letterSpacing: "0.2em" }}>Contact</h4>
                <div className="space-y-2 text-sm" style={{ color: `${C.white}30` }}>
                  <p>04 90 XX XX XX</p>
                  <p>contact@serenite-spa.fr</p>
                  <p>12 Rue de la Paix, 13100 Aix-en-Provence</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-[10px] tracking-[0.2em]" style={{ borderColor: `${C.white}05`, color: `${C.white}15` }}>
              &copy; 2025 Serenite Spa. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}