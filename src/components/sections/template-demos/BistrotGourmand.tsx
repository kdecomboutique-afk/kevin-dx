"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  SPRING_MEDIUM,
  SPRING_SOFT,
  DURATION,
  fadeUp,
  blurFadeUp,
  fadeScale,
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  lineRevealX,
  clipRevealUp,
  floatAnimation,
  delayedBlurFade,
  SECTION,
  HERO_SEQUENCE,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE — Bistrot parisien
   ================================================================ */
const C = {
  brown: "#5D4037",
  gold: "#D4A437",
  bg: "#F5F0E8",
  chalk: "#F8F4E3",
  board: "#2B3A3C",
  dark: "#1a1a1a",
  muted: "#64748B",
  white: "#FFFFFF",
};

/* ================================================================
   CARTE DU JOUR
   ================================================================ */
const carteJour = {
  entree: { nom: "Oeuf parfait", desc: "Champignons des bois poeles, emulsion au parmesan, pain de campagne grille", prix: "12" },
  plat: { nom: "Joue de boeuf braisee", desc: "Polenta cremeuse, carottes glacees, jus corse au vin rouge", prix: "22" },
  dessert: { nom: "Creme brulee vanille", desc: "Vanille de Tahiti, tuile aux amandes", prix: "9" },
  menuComplet: "38",
};

/* ================================================================
   SPECIALITES
   ================================================================ */
const specialites = [
  { nom: "Tartare de boeuf", desc: "Coupe au couteau, frites maison", prix: "19", badge: "Signature" },
  { nom: "Blanquette de veau", desc: "Recette traditionnelle, riz pilaf", prix: "21", badge: null },
  { nom: "Confit de canard", desc: "Pommes sarladaises, salade verte", prix: "23", badge: "Populaire" },
  { nom: "Pave de saumon", desc: "Beurre blanc, legumes de saison", prix: "20", badge: null },
  { nom: "Burger du Bistrot", desc: "Charolais, cheddar affine, bacon, frites", prix: "18", badge: "Coup de coeur" },
  { nom: "Souris d'agneau", desc: "Confite 7h, puree a l'ancienne, jus d'agneau", prix: "24", badge: null },
];

/* ================================================================
   EVENEMENTS
   ================================================================ */
const events = [
  { titre: "Soiree Jazz", date: "Chaque vendredi soir", desc: "Jazz live avec le quartet de Marc Delacroix. Ambiance feutree, cocktails signatures.", accent: C.gold },
  { titre: "Brunch Dominical", date: "Dimanche 10h - 14h", desc: "Buffet sucre-sale, oeufs Benedict, viennoiseries, jus presses. 32 euros par personne.", accent: C.brown },
  { titre: "After Work", date: "Mardi & Jeudi 18h - 21h", desc: "Planches a partager et vins au verre a prix doux. L'ideal entre collegues.", accent: C.gold },
  { titre: "Soiree Accords", date: "1er samedi du mois", desc: "Menu 5 plats accorde avec 5 vins par notre sommelier. Places limitees.", accent: C.brown },
];

/* ================================================================
   SUGGESTION DU CHEF
   ================================================================ */
const suggestion = {
  nom: "Cote de boeuf maturee 45 jours",
  desc: "Cote de boeuf Black Angus maturee sur os, bearnaise maison, gratin dauphinois, legumes rotis au thym. Pour 2 personnes.",
  prix: "78",
};

/* ================================================================
   SIGNATURE: chalkboard-write — Texte craie sur ardoise
   ================================================================ */
const chalkWrite: Variants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: (i: number) => ({
    opacity: 1,
    pathLength: 1,
    transition: {
      opacity: { duration: 0.01, delay: i * 0.15 },
      pathLength: { duration: DURATION.slow, delay: i * 0.15, ease: [...EASE_SMOOTH] },
    },
  }),
};

const chalkTextReveal: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, delay: 0.3 + i * 0.12, ease: [...EASE_SMOOTH] },
  }),
};

/* ================================================================
   COUNTER COMPONENT
   ================================================================ */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
export default function BistrotGourmand() {
  return (
    <div className="relative" id="template-bistrot-gourmand">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(245,240,232,0.92)", borderColor: `${C.gold}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold" style={{ color: C.brown }}>Le Bistrot</span>
            <span className="font-bold ml-1" style={{ color: C.gold }}>Gourmand</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Bistrot / Brasserie</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-bistrot-gourmand" className="px-4 py-2 text-sm font-medium rounded-xl text-white" style={{ background: C.gold }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO — Chalkboard style ==================== */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: C.board }}>
          {/* Chalk texture overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' fill='%23fff'/%3E%3C/svg%3E")`,
          }} />

          {/* Warm glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: `radial-gradient(circle, ${C.gold}18 0%, transparent 60%)` }} />

          <div className={`${SECTION.container} relative z-10`}>
            <div className="max-w-3xl">
              <motion.div
                className="flex items-center gap-3 mb-8"
                variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                initial="hidden"
                animate="visible"
              >
                <div className="w-12 h-0.5" style={{ background: C.gold }} />
                <span className="text-sm tracking-widest uppercase font-medium" style={{ color: C.gold }}>
                  Carte du jour &bull; Fait maison &bull; Terrasse
                </span>
              </motion.div>

              {/* SIGNATURE: Chalk-style text */}
              <motion.h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8">
                <motion.span
                  className="inline-block"
                  style={{ color: C.chalk }}
                  variants={chalkTextReveal}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  Le Bistrot
                </motion.span>
                <br />
                <motion.span
                  className="inline-block"
                  style={{ color: C.gold }}
                  variants={chalkTextReveal}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  Gourmand
                </motion.span>
              </motion.h1>

              {/* Chalk underline SVG */}
              <motion.svg
                className="w-48 h-4 mb-8"
                viewBox="0 0 200 8"
                fill="none"
              >
                <motion.path
                  d="M2 4C40 2 80 6 120 3C160 1 180 5 198 4"
                  stroke={C.gold}
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={chalkWrite}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                />
              </motion.svg>

              <motion.p
                className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
                style={{ color: `${C.chalk}CC` }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                Cuisine de marche, plats du jour gourmands et bons vins dans un cadre chaleureux. Ici, on mange bien et on se sent chez soi.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className="px-8 py-4 rounded-xl font-bold text-sm"
                  style={{ background: C.gold, color: C.board }}
                  whileHover={{ scale: 1.04, boxShadow: `0 10px 30px ${C.gold}35` }}
                  transition={{ duration: DURATION.micro }}
                >
                  Reserver une table
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-xl font-bold text-sm border-2"
                  style={{ borderColor: C.chalk, color: C.chalk }}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ duration: DURATION.micro }}
                >
                  Voir la carte
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60H1440V30C1440 30 1200 0 720 0C240 0 0 30 0 30V60Z" fill={C.bg} /></svg>
          </div>
        </section>

        {/* ==================== 2. ARDOISE DU JOUR ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGapCompact}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 rounded-full text-xs tracking-widest uppercase font-bold mb-4" style={{ background: `${C.gold}15`, color: C.gold }}>Mise a jour quotidienne</span>
              <h2 className="text-5xl md:text-6xl font-black" style={{ color: C.brown }}>L&apos;Ardoise du Jour</h2>
            </motion.div>

            {/* Chalkboard card — SIGNATURE */}
            <motion.div
              className="max-w-2xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: C.board }}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' fill='%23fff'/%3E%3C/svg%3E")`,
              }} />

              <div className="relative z-10 space-y-8">
                {[
                  { label: "Entree", ...carteJour.entree },
                  { label: "Plat", ...carteJour.plat },
                  { label: "Dessert", ...carteJour.dessert },
                ].map((course, i) => (
                  <motion.div
                    key={course.label}
                    className="text-center"
                    variants={chalkTextReveal}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                    transition={SPRING_MEDIUM}
                  >
                    <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: C.gold }}>{course.label}</p>
                    <h3 className="text-2xl font-bold italic" style={{ color: C.chalk }}>{course.nom}</h3>
                    <p className="text-sm mt-1" style={{ color: `${C.chalk}B0` }}>{course.desc}</p>
                    <p className="font-bold text-lg mt-2" style={{ color: C.gold }}>{course.prix}&euro;</p>
                    {i < 2 && (
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex-1 h-px" style={{ background: `${C.chalk}20` }} />
                        <svg className="w-4 h-4" style={{ color: C.gold }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                        </svg>
                        <div className="flex-1 h-px" style={{ background: `${C.chalk}20` }} />
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="border-t pt-6 text-center" style={{ borderColor: `${C.chalk}20` }}>
                  <p className="text-sm" style={{ color: `${C.chalk}B0` }}>Menu complet (Entree + Plat + Dessert)</p>
                  <p className="text-3xl font-black mt-1" style={{ color: C.gold }}>{carteJour.menuComplet}&euro;</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. SPECIALITES ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-black" style={{ color: C.brown }}>Nos Specialites</h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Les classiques du Bistrot, disponibles toute la semaine</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {specialites.map((plat) => (
                <motion.div
                  key={plat.nom}
                  className="relative p-6 rounded-2xl group cursor-pointer"
                  style={{ background: C.bg, border: `1px solid ${C.brown}10` }}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.02, boxShadow: `0 20px 40px ${C.brown}12` }}
                  transition={SPRING_MEDIUM}
                >
                  {plat.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: C.gold, color: C.brown }}>
                      {plat.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2" style={{ color: C.brown }}>{plat.nom}</h3>
                  <p className="text-sm mb-4" style={{ color: C.muted }}>{plat.desc}</p>
                  <span className="text-2xl font-black" style={{ color: C.gold }}>{plat.prix}&euro;</span>
                  <div className="h-0.5 mt-4 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${C.gold}60, transparent)` }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. SUGGESTION DU CHEF ==================== */}
        <section className={SECTION.paddingCompact} style={{ background: C.bg }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${C.brown}, ${C.board})` }}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-10" style={{ background: C.gold }} />
              <div className="relative z-10 text-center">
                <span className="inline-block px-4 py-1 rounded-full text-xs tracking-widest uppercase font-bold mb-6" style={{ background: `${C.gold}20`, color: C.gold }}>Suggestion du Chef</span>
                <h3 className="text-3xl md:text-4xl font-black mb-4" style={{ color: C.chalk }}>{suggestion.nom}</h3>
                <p className="text-base leading-relaxed mb-6 max-w-lg mx-auto" style={{ color: `${C.chalk}B0` }}>{suggestion.desc}</p>
                <p className="text-4xl font-black" style={{ color: C.gold }}>{suggestion.prix}&euro;</p>
                <p className="text-xs mt-2" style={{ color: `${C.chalk}60` }}>Pour 2 personnes &mdash; Sur reservation</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. L'EQUIPE ==================== */}
        <section className={SECTION.padding} style={{ background: C.brown }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="rounded-3xl overflow-hidden aspect-[4/5] relative"
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.brown})` }}
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="w-full rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                    <p className="font-bold text-lg" style={{ color: C.chalk }}>Chef Jean-Pierre Dubois</p>
                    <p className="text-sm" style={{ color: `${C.chalk}B0` }}>25 ans de passion culinaire</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: C.gold }}>Notre philosophie</p>
                <h2 className="text-4xl md:text-5xl font-black mb-8" style={{ color: C.chalk }}>Le gout de la simplicite</h2>
                <div className="space-y-4 text-lg leading-relaxed" style={{ color: `${C.chalk}CC` }}>
                  <p>&laquo;&nbsp;Chaque matin, je me rends au marche pour selectionner les meilleurs produits. Ma cuisine est simple, genereuse, sans chichis.&nbsp;&raquo;</p>
                  <p>Forme aupres de grands noms de la cuisine francaise, Jean-Pierre a fait le choix d&apos;une cuisine accessible et authentique.</p>
                </div>
                <div className="flex flex-wrap gap-6 mt-8">
                  {[
                    { val: 25, suffix: "", label: "ans d'experience" },
                    { val: 100, suffix: "%", label: "fait maison" },
                    { val: 40, suffix: "", label: "couverts / service" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl font-black" style={{ color: C.gold }}>
                        <Counter target={s.val} suffix={s.suffix} />
                      </p>
                      <p className="text-sm" style={{ color: `${C.chalk}90` }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 6. EVENEMENTS ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-black" style={{ color: C.brown }}>Evenements</h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Il se passe toujours quelque chose au Bistrot</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {events.map((evt) => (
                <motion.div
                  key={evt.titre}
                  className="p-8 rounded-3xl relative overflow-hidden group cursor-pointer bg-white"
                  style={{ border: `2px solid ${evt.accent}20` }}
                  variants={staggerItem}
                  whileHover={{ scale: 1.02, boxShadow: `0 20px 40px ${C.brown}10` }}
                  transition={SPRING_MEDIUM}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10" style={{ background: evt.accent }} />
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: `${evt.accent}20`, color: evt.accent }}>
                    {evt.date}
                  </span>
                  <h3 className="text-2xl font-black mb-3" style={{ color: C.brown }}>{evt.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{evt.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 7. RESERVATION CTA ==================== */}
        <section className={SECTION.padding} style={{ background: C.board }}>
          <div className={SECTION.containerNarrow}>
            <motion.div className="text-center" variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: C.chalk }}>Reservez votre table</h2>
              <p className="text-lg mb-10" style={{ color: `${C.chalk}90` }}>
                Un dejeuner entre collegues, un diner en amoureux ou un brunch dominical — nous vous attendons.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  className="px-10 py-4 rounded-xl font-bold text-sm"
                  style={{ background: C.gold, color: C.brown }}
                  whileHover={{ scale: 1.04, boxShadow: `0 10px 30px ${C.gold}35` }}
                  transition={{ duration: DURATION.micro }}
                >
                  Reserver en ligne
                </motion.button>
                <motion.button
                  className="px-10 py-4 rounded-xl font-bold text-sm border-2"
                  style={{ borderColor: C.chalk, color: C.chalk }}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
                  transition={{ duration: DURATION.micro }}
                >
                  01 42 58 17 63
                </motion.button>
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: `${C.chalk}80` }}>
                <span>45 Rue du Faubourg Saint-Antoine, 75011 Paris</span>
                <span>Metro Bastille</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-16" style={{ background: C.brown }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div>
                <h3 className="text-2xl font-black mb-4" style={{ color: C.chalk }}>
                  Le Bistrot <span style={{ color: C.gold }}>Gourmand</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: `${C.chalk}90` }}>
                  Cuisine de marche et plats genereux dans un cadre convivial. Terrasse ouverte aux beaux jours.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: C.chalk }}>Adresse</h4>
                <ul className="space-y-2 text-sm" style={{ color: `${C.chalk}90` }}>
                  <li>45 Rue du Faubourg Saint-Antoine</li>
                  <li>75011 Paris</li>
                  <li>Metro Bastille (lignes 1, 5, 8)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: C.chalk }}>Horaires</h4>
                <ul className="space-y-2 text-sm" style={{ color: `${C.chalk}90` }}>
                  <li>Mar - Sam : 12h - 14h30 | 19h - 23h</li>
                  <li>Dimanche : 10h - 15h (Brunch)</li>
                  <li>Lundi : Ferme</li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm" style={{ borderColor: `${C.chalk}15`, color: `${C.chalk}60` }}>
              &copy; 2025 Le Bistrot Gourmand. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
