"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  SPRING_MEDIUM,
  SPRING_SOFT,
  DURATION,
  fadeUp,
  blurFadeUp,
  fadeScale,
  staggerContainer,
  staggerItem,
  lineRevealX,
  hoverLift,
  hoverScale,
  delayedBlurFade,
  SECTION,
  TYPOGRAPHY,
  HERO_SEQUENCE,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE
   ================================================================ */
const C = {
  primary: "#D4402B",
  accent: "#C9A96E",
  bg: "#FDFBF7",
  dark: "#1A1A1A",
  cream: "#F5F0EB",
  white: "#FFFFFF",
  muted: "#6B6460",
};

/* ================================================================
   MENU DATA
   ================================================================ */
type MenuItem = { nom: string; desc: string; prix: string; star?: boolean };

const menuData: Record<string, MenuItem[]> = {
  "Entrees": [
    { nom: "Veloute de cepes & truffe noire", desc: "Espuma de parmesan, chips de topinambour, huile de noisette", prix: "24", star: true },
    { nom: "Foie gras mi-cuit du Perigord", desc: "Chutney de figues, brioche feuilletee, fleur de sel", prix: "32" },
    { nom: "Carpaccio de Saint-Jacques", desc: "Agrumes de Menton, caviar d'Aquitaine, vinaigrette yuzu", prix: "28" },
    { nom: "Oeuf parfait 64 degres", desc: "Creme de morilles, asperges vertes, copeaux de comte", prix: "22" },
  ],
  "Plats": [
    { nom: "Filet de boeuf Rossini", desc: "Foie gras poele, sauce Perigueux, pommes Anna, truffe", prix: "52", star: true },
    { nom: "Bar de ligne roti sur peau", desc: "Risotto aux artichauts violets, jus de bouillabaisse", prix: "44" },
    { nom: "Carre d'agneau en croute d'herbes", desc: "Tian provencal, jus au thym, olive de Nyons confite", prix: "46" },
    { nom: "Supreme de volaille de Bresse", desc: "Morilles farcies, vin jaune du Jura, gratin dauphinois", prix: "42", star: true },
  ],
  "Desserts": [
    { nom: "Souffle au Grand Marnier", desc: "Creme anglaise vanille bourbon de Madagascar", prix: "18", star: true },
    { nom: "Sphere chocolat Valrhona Guanaja", desc: "Coeur coulant framboise, tuile dentelle, sorbet cacao", prix: "20" },
    { nom: "Tarte tatin revisitee", desc: "Pommes caramelisees, glace caramel beurre sale", prix: "16" },
    { nom: "Declinaison citron de Menton", desc: "Tartelette meringuee, cremeux, sorbet, zestes confits", prix: "18" },
  ],
  "Vins": [
    { nom: "Chablis Premier Cru 2021", desc: "William Fevre — Mineral, vif, notes d'agrumes", prix: "14", star: true },
    { nom: "Pommard Les Rugiens 2019", desc: "Domaine de Montille — Puissant, tannins soyeux", prix: "22" },
    { nom: "Champagne Blanc de Blancs", desc: "Pierre Gimonnet — Elegant, bulles fines, brioche", prix: "16" },
    { nom: "Sauternes 2018", desc: "Chateau d'Yquem — Liquoreux, abricot confit, miel", prix: "28", star: true },
  ],
};

const menuTabs = Object.keys(menuData);

/* ================================================================
   GALLERY DATA
   ================================================================ */
const gallery = [
  { label: "Filet de boeuf Rossini", grad: "linear-gradient(145deg, #8B6914, #5C3A0A 40%, #3D1F08 80%)", span: "col-span-2 row-span-2" },
  { label: "Saint-Jacques roties", grad: "linear-gradient(135deg, #F5E6C8, #D4A373 50%, #A67C52)", span: "" },
  { label: "Souffle au Grand Marnier", grad: "linear-gradient(150deg, #E8C27A, #C9A96E 40%, #8B6914)", span: "" },
  { label: "La salle principale", grad: "linear-gradient(140deg, #2A1F1F, #722F37 50%, #4A1A22)", span: "" },
  { label: "Sphere chocolat Valrhona", grad: "linear-gradient(160deg, #3D1F08, #5C2E0E 40%, #C9A96E)", span: "" },
];

/* ================================================================
   EXPERIENCE DATA
   ================================================================ */
const piliers = [
  { titre: "Produits locaux", desc: "Chaque matin, notre chef selectionne les meilleurs produits au marche et chez nos producteurs partenaires du terroir." },
  { titre: "Cave d'exception", desc: "Plus de 400 references soigneusement selectionnees. Notre sommelier vous guide a travers les grands crus." },
  { titre: "Service attentionne", desc: "Une equipe passionnee au service de votre experience. Chaque detail est pense pour un moment inoubliable." },
];

/* ================================================================
   HORAIRES
   ================================================================ */
const horaires = [
  { jour: "Mardi - Vendredi", midi: "12h00 - 14h00", soir: "19h30 - 22h00" },
  { jour: "Samedi", midi: "12h00 - 14h30", soir: "19h00 - 22h30" },
  { jour: "Dimanche", midi: "12h00 - 14h30", soir: "Ferme" },
  { jour: "Lundi", midi: "Ferme", soir: "Ferme" },
];

/* ================================================================
   TEMOIGNAGES
   ================================================================ */
const temoignages = [
  { nom: "Catherine M.", texte: "Une experience culinaire inoubliable. Chaque plat est un chef-d'oeuvre visuel et gustatif. Le service est impeccable.", note: 5 },
  { nom: "Jean-Pierre D.", texte: "Le filet de boeuf Rossini est le meilleur que j'ai goute. La carte des vins est exceptionnelle.", note: 5 },
  { nom: "Marie L.", texte: "Un cadre magnifique, une cuisine raffinee et un personnel aux petits soins. Nous y retournons chaque anniversaire.", note: 5 },
];

/* ================================================================
   SIGNATURE: menu-flip-reveal — Cards menu qui flip en cascade
   ================================================================ */
const flipCard: Variants = {
  hidden: { rotateY: 90, opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      delay: i * 0.08,
      ease: [...EASE_SMOOTH],
    },
  }),
  exit: { rotateY: -90, opacity: 0, scale: 0.85, transition: { duration: DURATION.fast } },
};

const menuContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
export default function SaveurTradition() {
  const [activeTab, setActiveTab] = useState("Entrees");

  const GoldLine = useCallback(() => (
    <div className="flex items-center justify-center gap-4">
      <div className="w-16 h-px" style={{ background: C.accent }} />
      <div className="w-2 h-2 rotate-45" style={{ background: C.accent }} />
      <div className="w-16 h-px" style={{ background: C.accent }} />
    </div>
  ), []);

  return (
    <div className="relative" id="template-restaurant">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(253,251,247,0.92)", borderColor: `${C.accent}30` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold" style={{ color: C.dark }}>Saveur &amp; Tradition</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Restaurant gastronomique</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-restaurant" className="px-4 py-2 text-sm font-medium rounded-lg text-white" style={{ background: C.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO ==================== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(180deg, ${C.dark} 0%, #0D0D0D 100%)` }}>
          {/* Gold particles */}
          {[
            { top: "15%", left: "12%", size: "w-2 h-2", delay: 0 },
            { top: "35%", left: "82%", size: "w-1.5 h-1.5", delay: 1.5 },
            { top: "65%", left: "25%", size: "w-1 h-1", delay: 2.5 },
            { top: "55%", left: "90%", size: "w-1.5 h-1.5", delay: 3.5 },
          ].map((p, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${p.size}`}
              style={{ top: p.top, left: p.left, background: C.accent, opacity: 0.3 }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Ambient glow */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${C.accent} 0%, transparent 70%)` }} />
            <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full" style={{ background: `radial-gradient(circle, ${C.primary} 0%, transparent 70%)` }} />
          </div>

          {/* Top decorative line */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
            style={{ background: `linear-gradient(180deg, transparent, ${C.accent})` }}
            variants={lineRevealX}
            initial="hidden"
            animate="visible"
          />

          <div className={`${SECTION.container} relative z-10 text-center`}>
            {/* Subtitle */}
            <motion.p
              className="text-xs sm:text-sm tracking-[0.5em] uppercase mb-8"
              style={{ color: C.accent }}
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
            >
              Cuisine francaise d&apos;exception
            </motion.p>

            {/* Stars */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              variants={fadeScale}
              initial="hidden"
              animate="visible"
            >
              {[0, 1, 2].map((i) => (
                <svg key={i} className="w-5 h-5" style={{ color: C.accent }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                </svg>
              ))}
            </motion.div>

            {/* Title with blur-fade reveal */}
            <motion.h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] mb-6">
              <motion.span
                className="inline-block italic tracking-tight"
                style={{ color: C.accent }}
                variants={delayedBlurFade(HERO_SEQUENCE.title)}
                initial="hidden"
                animate="visible"
              >
                Saveur
              </motion.span>
              <br />
              <motion.span
                className="inline-block font-light text-4xl sm:text-5xl md:text-6xl"
                style={{ color: "rgba(255,255,255,0.3)" }}
                variants={fadeScale}
                initial="hidden"
                animate="visible"
              >
                &amp;
              </motion.span>
              <br />
              <motion.span
                className="inline-block italic tracking-tight"
                style={{ color: C.white }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                Tradition
              </motion.span>
            </motion.h1>

            {/* Gold line decoration */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-8"
              variants={delayedBlurFade(HERO_SEQUENCE.decoration)}
              initial="hidden"
              animate="visible"
            >
              <div className="w-20 h-px" style={{ background: C.accent }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
              <div className="w-20 h-px" style={{ background: C.accent }} />
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
              variants={delayedBlurFade(HERO_SEQUENCE.cta - 0.1)}
              initial="hidden"
              animate="visible"
            >
              Une experience culinaire d&apos;exception au coeur de Paris, ou chaque assiette raconte l&apos;histoire de nos terroirs.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                style={{ background: C.accent, color: C.dark }}
                whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${C.accent}40` }}
                transition={{ duration: DURATION.micro }}
              >
                Reserver une table
              </motion.button>
              <motion.button
                className="px-10 py-4 text-sm tracking-[0.2em] uppercase font-semibold border transition-all duration-300"
                style={{ borderColor: `${C.accent}50`, color: C.accent }}
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                transition={{ duration: DURATION.micro }}
              >
                Decouvrir la carte
              </motion.button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: `${C.accent}60` }}>Scroll</span>
            <motion.svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: C.accent }} animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
              <path d="M4 7L10 13L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </section>

        {/* ==================== 2. CHEF QUOTE ==================== */}
        <section className={SECTION.padding} style={{ background: C.cream }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <GoldLine />
              <p className="italic text-2xl sm:text-3xl md:text-4xl leading-relaxed my-10" style={{ color: C.dark }}>
                &laquo;&nbsp;Ma cuisine est un hommage au temps qui passe, aux saisons qui se succedent, et au respect inalterable des produits que la terre nous offre.&nbsp;&raquo;
              </p>
              <GoldLine />
              <p className="font-bold text-xl mt-8" style={{ color: C.dark }}>Antoine Moreau</p>
              <p className="text-sm tracking-[0.2em] uppercase mt-2" style={{ color: C.accent }}>Chef etoile &mdash; Meilleur Ouvrier de France</p>
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. MENU — Signature flip-reveal ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.primary }}>Notre carte</p>
              <h2 className="italic text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: C.dark }}>La Carte</h2>
              <motion.div className="w-20 h-0.5 mx-auto mt-6" style={{ background: C.accent }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            </motion.div>

            {/* Tabs */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative flex justify-center gap-1 sm:gap-2">
                {menuTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative px-5 sm:px-8 py-3 text-sm sm:text-base tracking-[0.15em] uppercase font-medium transition-colors duration-300"
                    style={{ color: activeTab === tab ? C.dark : C.muted }}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ background: C.accent }}
                        layoutId="menu-tab-underline-saveur"
                        transition={SPRING_MEDIUM}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu items — SIGNATURE: flip cascade with gold reflection */}
            <div className="max-w-2xl mx-auto" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={menuContainer}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-1"
                >
                  {menuData[activeTab].map((item, i) => (
                    <motion.div
                      key={`${activeTab}-${item.nom}`}
                      variants={flipCard}
                      custom={i}
                      className="group cursor-pointer py-5 px-4 rounded-xl transition-colors duration-300 hover:bg-white/60"
                      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                      whileHover={{ x: 6, transition: { ...SPRING_MEDIUM } }}
                    >
                      <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="font-semibold text-lg flex-shrink-0" style={{ color: C.dark }}>{item.nom}</h4>
                        {item.star && (
                          <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${C.accent}15`, color: C.accent, border: `1px solid ${C.accent}30` }}>
                            Chef recommande
                          </span>
                        )}
                        <div className="flex-1 mx-2 border-b border-dashed min-w-[20px]" style={{ borderColor: `${C.accent}40` }} />
                        <span className="font-bold text-lg flex-shrink-0" style={{ color: C.accent }}>{item.prix}&euro;</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{item.desc}</p>
                      {/* Gold reflection bar on hover */}
                      <div className="h-px mt-4 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: `linear-gradient(90deg, transparent, ${C.accent}40, transparent)` }} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="text-center mt-14 pt-8"
                style={{ borderTop: `1px solid ${C.accent}20` }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-sm italic" style={{ color: C.primary }}>
                  Menu Degustation 7 services &mdash; 125&euro; &nbsp;|&nbsp; Accord Mets &amp; Vins &mdash; 185&euro;
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 4. GALERIE ==================== */}
        <section className={SECTION.padding} style={{ background: C.cream }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.primary }}>Art culinaire</p>
              <h2 className="italic text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: C.dark }}>La Galerie</h2>
              <motion.div className="w-20 h-0.5 mx-auto mt-6" style={{ background: C.accent }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[280px]"
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {gallery.map((item) => (
                <motion.div
                  key={item.label}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
                  style={{ background: item.grad }}
                  variants={staggerItem}
                  whileHover={{ scale: 1.03, transition: { duration: DURATION.fast } }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(26,26,26,0.45)" }} />
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-semibold text-lg text-white">{item.label}</p>
                      <div className="w-8 h-0.5 mt-2" style={{ background: C.accent }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. EXPERIENCE ==================== */}
        <section className={SECTION.padding} style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>Notre engagement</p>
              <h2 className="italic text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight" style={{ color: C.cream }}>L&apos;Experience</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16"
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {piliers.map((p) => (
                <motion.div key={p.titre} variants={staggerItem} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: `${C.accent}15`, border: `1px solid ${C.accent}30` }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div className="w-10 h-0.5 mx-auto mb-6" style={{ background: C.accent }} />
                  <h3 className="font-bold text-xl mb-4" style={{ color: C.cream }}>{p.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.65)" }}>{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 6. TEMOIGNAGES ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.primary }}>Nos clients</p>
              <h2 className="italic text-5xl md:text-6xl font-bold tracking-tight" style={{ color: C.dark }}>Temoignages</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {temoignages.map((t) => (
                <motion.div
                  key={t.nom}
                  variants={staggerItem}
                  className="p-8 rounded-2xl"
                  style={{ background: C.white, border: `1px solid ${C.accent}15` }}
                  whileHover={{ y: -4, boxShadow: `0 16px 40px ${C.accent}12`, transition: { duration: DURATION.fast } }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} className="w-4 h-4" fill={idx < t.note ? C.accent : "#ddd"} viewBox="0 0 24 24">
                        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: C.muted }}>
                    &laquo;&nbsp;{t.texte}&nbsp;&raquo;
                  </p>
                  <p className="font-bold text-sm" style={{ color: C.dark }}>{t.nom}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 7. RESERVATION ==================== */}
        <section className={`${SECTION.padding} relative overflow-hidden`} style={{ background: `linear-gradient(135deg, #722F37, ${C.dark})` }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${C.accent} 0%, transparent 70%)` }} />

          <div className={`${SECTION.container} relative z-10`}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.accent }}>Votre soiree commence ici</p>
              <h2 className="italic text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">Reservez votre table</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Form */}
              <motion.div className="lg:col-span-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="rounded-2xl p-8 md:p-10" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.accent}20`, backdropFilter: "blur(10px)" }}>
                  <div className="mb-5">
                    <label className="block text-sm font-medium mb-2 tracking-wide" style={{ color: C.accent }}>Nom</label>
                    <input type="text" placeholder="Jean Dupont" readOnly className="w-full px-4 py-3 rounded-lg text-sm outline-none placeholder:opacity-40" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.accent}25`, color: C.white }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 tracking-wide" style={{ color: C.accent }}>Date</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm outline-none appearance-none" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.accent}25`, color: C.white }} defaultValue="sam-15">
                        <option value="sam-15">Samedi 15 Mars</option>
                        <option value="dim-16">Dimanche 16 Mars</option>
                        <option value="mar-18">Mardi 18 Mars</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 tracking-wide" style={{ color: C.accent }}>Heure</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm outline-none appearance-none" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.accent}25`, color: C.white }} defaultValue="20h">
                        <option value="12h">12h00</option>
                        <option value="19h30">19h30</option>
                        <option value="20h">20h00</option>
                        <option value="20h30">20h30</option>
                        <option value="21h">21h00</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div>
                      <label className="block text-sm font-medium mb-2 tracking-wide" style={{ color: C.accent }}>Convives</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm outline-none appearance-none" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.accent}25`, color: C.white }} defaultValue="2">
                        <option value="2">2 personnes</option>
                        <option value="4">4 personnes</option>
                        <option value="6">6 personnes</option>
                        <option value="8">8+ (salon prive)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 tracking-wide" style={{ color: C.accent }}>Occasion</label>
                      <select className="w-full px-4 py-3 rounded-lg text-sm outline-none appearance-none" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.accent}25`, color: C.white }} defaultValue="aucune">
                        <option value="aucune">Aucune</option>
                        <option value="anniversaire">Anniversaire</option>
                        <option value="romantique">Diner romantique</option>
                        <option value="affaires">Repas d&apos;affaires</option>
                      </select>
                    </div>
                  </div>
                  <motion.button
                    className="w-full py-4 text-sm tracking-[0.2em] uppercase font-semibold rounded-lg"
                    style={{ background: C.accent, color: C.dark }}
                    whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.accent}40` }}
                    transition={{ duration: DURATION.fast }}
                  >
                    Confirmer la reservation
                  </motion.button>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div className="lg:col-span-2 space-y-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div>
                  <h3 className="font-bold text-lg mb-5 flex items-center gap-2" style={{ color: C.accent }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    Horaires
                  </h3>
                  <div className="space-y-3">
                    {horaires.map((h) => (
                      <div key={h.jour} className="flex justify-between text-sm py-2" style={{ borderBottom: `1px solid ${C.accent}15` }}>
                        <span style={{ color: C.cream }}>{h.jour}</span>
                        <span style={{ color: h.midi === "Ferme" ? "rgba(255,255,255,0.3)" : "rgba(245,240,235,0.7)" }}>
                          {h.midi} {h.soir !== h.midi && <>&nbsp;|&nbsp;{h.soir}</>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: C.accent }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    Adresse
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(245,240,235,0.7)" }}>12 Rue de la Paix<br />75002 Paris<br />Voiturier disponible le soir</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: C.accent }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                    Reservation
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(245,240,235,0.7)" }}>01 42 65 98 31</p>
                  <p className="text-sm mt-1" style={{ color: "rgba(245,240,235,0.7)" }}>reservation@saveur-tradition.fr</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 8. FOOTER ==================== */}
        <footer className="py-16 lg:py-20" style={{ background: "#0A0A0A" }}>
          <div className={SECTION.container}>
            <div className="text-center mb-12">
              <h3 className="italic text-3xl md:text-4xl font-bold tracking-tight mb-3" style={{ color: C.accent }}>Saveur &amp; Tradition</h3>
              <p className="text-xs tracking-[0.4em] uppercase" style={{ color: `${C.accent}50` }}>Restaurant gastronomique &mdash; Paris</p>
              <div className="w-12 h-px mx-auto mt-6" style={{ background: `${C.accent}40` }} />
            </div>
            <div className="max-w-md mx-auto mb-12 grid grid-cols-2 gap-6 text-center text-sm">
              <div>
                <p className="font-semibold mb-2" style={{ color: C.cream }}>Mardi &mdash; Vendredi</p>
                <p style={{ color: "rgba(245,240,235,0.5)" }}>12h00 - 14h00</p>
                <p style={{ color: "rgba(245,240,235,0.5)" }}>19h30 - 22h00</p>
              </div>
              <div>
                <p className="font-semibold mb-2" style={{ color: C.cream }}>Samedi &mdash; Dimanche</p>
                <p style={{ color: "rgba(245,240,235,0.5)" }}>12h00 - 14h30</p>
                <p style={{ color: "rgba(245,240,235,0.5)" }}>19h00 - 22h30 (Sam)</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 mb-12">
              {["Instagram", "Facebook", "TripAdvisor"].map((s) => (
                <motion.span key={s} className="text-sm cursor-pointer" style={{ color: "rgba(245,240,235,0.5)" }} whileHover={{ color: C.accent, scale: 1.1 }}>
                  {s}
                </motion.span>
              ))}
            </div>
            <div className="text-center text-sm mb-10" style={{ color: "rgba(245,240,235,0.4)" }}>
              <p>12 Rue de la Paix, 75002 Paris &mdash; 01 42 65 98 31</p>
              <p className="mt-1">reservation@saveur-tradition.fr</p>
            </div>
            <div className="pt-8 text-center text-xs" style={{ borderTop: `1px solid ${C.accent}10`, color: "rgba(245,240,235,0.25)" }}>
              &copy; 2025 Saveur &amp; Tradition. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
