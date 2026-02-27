"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  EASE_SMOOTH,
  SPRING_MEDIUM,
  SPRING_SOFT,
  DURATION,
  fadeUp,
  blurFadeUp,
  blurFadeScale,
  fadeScale,
  fadeLeft,
  fadeRight,
  clipRevealUp,
  staggerContainer,
  staggerItem,
  staggerItemSoft,
  lineRevealX,
  delayedBlurFade,
  SECTION,
  HERO_SEQUENCE,
  TYPOGRAPHY,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE — Fleuriste romantique
   ================================================================ */
const C = {
  rose: "#D4758C",
  green: "#7BA05B",
  bg: "#FDF8F5",
  white: "#FFFFFF",
  dark: "#2a2a2a",
  muted: "#888",
  rosePale: "rgba(212,117,140,0.1)",
  greenPale: "rgba(123,160,91,0.1)",
};

/* ================================================================
   BOUQUETS DATA
   ================================================================ */
const bouquets = [
  { nom: "L'Aurore", desc: "Roses de jardin, pivoines, eucalyptus", prix: "45", grad: `linear-gradient(135deg, #FFB5C2, #ff8fa3)`, tag: "Livraison" },
  { nom: "Eclat de Printemps", desc: "Tulipes, renoncules, feuillage saison", prix: "38", grad: `linear-gradient(135deg, #A7C4A0, #7db37a)`, tag: "Livraison" },
  { nom: "Douceur Eternelle", desc: "Roses stabilisees, gypsophile, ecrin cadeau", prix: "65", grad: `linear-gradient(135deg, #f8d7da, #FFB5C2)`, tag: "Exclusif" },
  { nom: "Jardin Sauvage", desc: "Fleurs des champs, marguerites, lavande", prix: "32", grad: `linear-gradient(135deg, #d4e8d0, #A7C4A0)`, tag: "Livraison" },
  { nom: "Passion Exotique", desc: "Orchidees, strelitzia, feuilles tropicales", prix: "55", grad: `linear-gradient(135deg, #FFB5C2, #e8a0b0)`, tag: "Livraison" },
  { nom: "Blanc Pur", desc: "Roses blanches, lisianthus, verdure fine", prix: "42", grad: `linear-gradient(135deg, #f0f0f0, #e8e8e8)`, tag: "Mariage" },
];

/* ================================================================
   OCCASIONS DATA
   ================================================================ */
const occasions = [
  { titre: "Mariages", desc: "Bouquets de mariee, decoration de ceremonie, centres de table, arches florales", icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
  { titre: "Decoration", desc: "Hotels, restaurants, bureaux, evenements prives, inaugurations", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" },
  { titre: "Deuil", desc: "Gerbes, couronnes, compositions avec rubans personnalises", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" },
  { titre: "Entreprises", desc: "Abonnements floraux hebdomadaires, compositions pour accueil", icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15" },
];

/* ================================================================
   LIVRAISON DATA
   ================================================================ */
const livraisonInfos = [
  { titre: "Livraison le jour meme", desc: "Commandez avant 14h pour une livraison le jour meme dans toute la ville." },
  { titre: "Fraicheur garantie", desc: "Nos bouquets sont confectionnes le matin meme avec des fleurs fraiches." },
  { titre: "Emballage soigne", desc: "Chaque bouquet est emballe avec soin dans du papier de soie et un ruban." },
];

/* ================================================================
   ATELIER DATA
   ================================================================ */
const atelierSteps = [
  { titre: "Cours decouverte", desc: "Apprenez les bases de l'art floral. Repartez avec votre creation.", prix: "55", duree: "2h" },
  { titre: "Atelier Bouquet Rond", desc: "Techniques de composition du bouquet rond classique et moderne.", prix: "75", duree: "2h30" },
  { titre: "Masterclass Mariage", desc: "Creez votre bouquet de mariee et les accessoires assortis.", prix: "120", duree: "3h" },
];

/* ================================================================
   SIGNATURE: petal-scatter-bloom
   Petals that scatter and float on scroll
   ================================================================ */
const petalColors = ["#FFB5C2", "#ff8fa3", "#f8d7da", "#D4758C", "#e8a0b0"];

function FloatingPetals() {
  const petals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 6 + Math.random() * 10,
      color: petalColors[i % petalColors.length],
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
      rotate: Math.random() * 360,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: "-20px",
            width: p.size,
            height: p.size * 0.7,
            background: p.color,
            opacity: 0.3,
            borderRadius: "50% 50% 50% 0",
            rotate: p.rotate,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() > 0.5 ? 30 : -30, 0],
            rotate: [p.rotate, p.rotate + 180, p.rotate + 360],
            opacity: [0, 0.35, 0.25, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

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
    const dur = 2000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
export default function PetalesFleurs() {
  return (
    <div className="relative" id="template-petales-fleurs">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(253,248,245,0.92)", borderColor: `${C.rose}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-light" style={{ color: C.dark }}>Petales</span>
            <span className="font-bold italic ml-1" style={{ color: C.rose }}>&amp; Fleurs</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Fleuriste</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-petales-fleurs" className="px-4 py-2 text-sm font-medium rounded-full text-white" style={{ background: C.rose }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO — Petals floating ==================== */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.white }}>
          {/* SIGNATURE: Floating petals */}
          <FloatingPetals />

          {/* Soft background shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-25" style={{ background: `radial-gradient(circle, ${C.rose}60 0%, transparent 70%)` }} />
            <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-18" style={{ background: `radial-gradient(circle, ${C.green}50 0%, transparent 70%)` }} />
          </div>

          <div className={`${SECTION.container} relative z-10`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.span
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{ background: C.rosePale, color: C.rose }}
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden"
                  animate="visible"
                >
                  Artisan fleuriste depuis 2005
                </motion.span>

                <motion.h1 className={`${TYPOGRAPHY.warm.heroTitle} leading-[0.95] mb-6`} style={{ color: C.dark }}>
                  <motion.span
                    className="inline-block font-light"
                    variants={delayedBlurFade(HERO_SEQUENCE.title)}
                    initial="hidden"
                    animate="visible"
                  >
                    Petales
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block font-bold italic"
                    style={{ color: C.rose }}
                    variants={delayedBlurFade(HERO_SEQUENCE.title + 0.2)}
                    initial="hidden"
                    animate="visible"
                  >
                    &amp; Fleurs
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl max-w-md mb-8 leading-relaxed"
                  style={{ color: C.muted }}
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden"
                  animate="visible"
                >
                  L&apos;art floral au service de vos emotions. Chaque bouquet est une creation unique, confectionnee avec passion et delicatesse.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    className="px-8 py-4 rounded-full font-semibold text-sm text-white"
                    style={{ background: C.rose }}
                    whileHover={{ scale: 1.04, boxShadow: `0 10px 30px ${C.rose}35` }}
                    transition={{ duration: DURATION.micro }}
                  >
                    Decouvrir nos creations
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 rounded-full font-semibold text-sm border-2"
                    style={{ borderColor: C.green, color: C.green }}
                    whileHover={{ scale: 1.03, backgroundColor: C.greenPale }}
                    transition={{ duration: DURATION.micro }}
                  >
                    Commander un bouquet
                  </motion.button>
                </motion.div>
              </div>

              {/* Floral sphere */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING_SOFT, delay: HERO_SEQUENCE.visual }}
              >
                <div
                  className="w-80 h-80 md:w-[420px] md:h-[420px] mx-auto rounded-full relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${C.rose}80, #f8d7da 30%, ${C.green}70 70%, #d4e8d0)` }}
                >
                  <div className="absolute inset-6 rounded-full" style={{ background: "linear-gradient(225deg, rgba(255,255,255,0.6), transparent 60%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-20 h-20 mx-auto mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2-3-6-3-6 1 0 3 6 6 6 6s6-3 6-6c0-4-4-4-6-1z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V2" />
                      </svg>
                      <p className="font-light text-white text-lg">Bouquets sur mesure</p>
                    </div>
                  </div>
                </div>
                <motion.div className="absolute top-4 right-4 md:top-8 md:right-8 px-4 py-2 rounded-2xl shadow-lg bg-white" animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                  <span className="text-sm font-medium" style={{ color: C.green }}>Livraison express</span>
                </motion.div>
                <motion.div className="absolute bottom-8 left-0 md:bottom-12 md:left-4 px-4 py-2 rounded-2xl shadow-lg bg-white" animate={{ y: [0, 6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                  <span className="text-sm font-medium" style={{ color: C.rose }}>Fait avec amour</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. CATALOGUE ==================== */}
        <section className={SECTION.padding} style={{ background: "#fafafa" }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light" style={{ color: C.dark }}>
                Nos <span className="font-bold italic" style={{ color: C.rose }}>Creations</span>
              </h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Des bouquets pour chaque occasion, chaque emotion</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {bouquets.map((b) => (
                <motion.div
                  key={b.nom}
                  className="rounded-3xl overflow-hidden bg-white shadow-sm group cursor-pointer"
                  variants={staggerItemSoft}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: `0 20px 40px ${C.rose}12` }}
                  transition={SPRING_SOFT}
                >
                  <motion.div
                    className="aspect-[4/5] relative overflow-hidden"
                    style={{ background: b.grad }}
                    variants={clipRevealUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2-3-6-3-6 1 0 3 6 6 6 6s6-3 6-6c0-4-4-4-6-1z" />
                      </svg>
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: C.green }}>
                      {b.tag}
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </motion.div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold" style={{ color: C.dark }}>{b.nom}</h3>
                      <span className="text-xl font-bold flex-shrink-0 ml-3" style={{ color: C.rose }}>{b.prix}&euro;</span>
                    </div>
                    <p className="text-sm" style={{ color: C.muted }}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. OCCASIONS ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-light" style={{ color: C.dark }}>
                Pour chaque <span className="font-bold italic" style={{ color: C.green }}>Occasion</span>
              </h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Des fleurs qui accompagnent tous les moments de votre vie</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {occasions.map((o) => (
                <motion.div
                  key={o.titre}
                  className="p-8 rounded-3xl text-center group cursor-pointer"
                  style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}
                  variants={staggerItemSoft}
                  whileHover={{ y: -4, scale: 1.02, boxShadow: `0 20px 40px ${C.rose}08` }}
                  transition={SPRING_SOFT}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-shadow duration-300 group-hover:shadow-lg" style={{ background: C.rosePale, color: C.rose }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={o.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: C.dark }}>{o.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{o.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. BOUQUET SUR MESURE (form) ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.containerNarrow}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-light" style={{ color: C.dark }}>
                Bouquet <span className="font-bold italic" style={{ color: C.rose }}>sur mesure</span>
              </h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Decrivez-nous votre envie, nous creons pour vous</p>
            </motion.div>

            <motion.div
              className="rounded-3xl p-8 md:p-10 bg-white"
              style={{ boxShadow: `0 8px 30px ${C.rose}08` }}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: C.dark }}>Occasion</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{ borderColor: "#f0f0f0" }} defaultValue="anniversaire">
                    <option value="anniversaire">Anniversaire</option>
                    <option value="mariage">Mariage</option>
                    <option value="deuil">Deuil</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: C.dark }}>Budget</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm border outline-none" style={{ borderColor: "#f0f0f0" }} defaultValue="50">
                    <option value="30">30 - 50 euros</option>
                    <option value="50">50 - 80 euros</option>
                    <option value="80">80 - 120 euros</option>
                    <option value="120">120 euros et plus</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: C.dark }}>Vos preferences</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl text-sm border outline-none resize-none"
                  style={{ borderColor: "#f0f0f0" }}
                  rows={4}
                  placeholder="Couleurs preferees, fleurs aimees, message a transmettre..."
                  readOnly
                />
              </div>
              <motion.button
                className="w-full py-4 rounded-xl font-semibold text-sm text-white"
                style={{ background: C.rose }}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.rose}35` }}
                transition={{ duration: DURATION.fast }}
              >
                Demander un devis gratuit
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. LIVRAISON ==================== */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(135deg, ${C.rose}CC, #f8d7da 50%, #d4e8d0 100%)` }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-bold text-white">Livraison</h2>
              <p className="text-lg mt-4 text-white/85">Offrez des fleurs sans vous deplacer</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {livraisonInfos.map((info) => (
                <motion.div
                  key={info.titre}
                  className="p-8 rounded-3xl text-center"
                  style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}
                  variants={staggerItemSoft}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: C.greenPale }}>
                    <svg className="w-6 h-6" style={{ color: C.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: C.dark }}>{info.titre}</h3>
                  <p className="text-sm" style={{ color: "#666" }}>{info.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl" style={{ background: "rgba(255,255,255,0.9)" }}>
                <div className="text-center sm:text-left">
                  <p className="font-bold" style={{ color: C.dark }}>Zone de livraison</p>
                  <p className="text-sm" style={{ color: "#666" }}>Paris et 15 km</p>
                </div>
                <div className="w-px h-8 hidden sm:block" style={{ background: "#ddd" }} />
                <div className="text-center sm:text-left">
                  <p className="font-bold" style={{ color: C.dark }}>Delai</p>
                  <p className="text-sm" style={{ color: "#666" }}>Jour meme avant 14h</p>
                </div>
                <div className="w-px h-8 hidden sm:block" style={{ background: "#ddd" }} />
                <div className="text-center sm:text-left">
                  <p className="font-bold" style={{ color: C.dark }}>Frais</p>
                  <p className="text-sm" style={{ color: "#666" }}>Gratuit des 50&euro;</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 6. ATELIER FLORAL ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                className="rounded-3xl overflow-hidden aspect-[4/5] relative order-2 lg:order-1"
                style={{ background: `linear-gradient(135deg, ${C.green}90, #d4e8d0 40%, ${C.rose}80)` }}
                variants={clipRevealUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute inset-0 flex items-end p-8">
                  <div className="w-full p-6 rounded-2xl" style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
                    <p className="font-bold" style={{ color: C.dark }}>Notre atelier</p>
                    <p className="text-sm" style={{ color: C.muted }}>Un espace de creation au coeur de la ville</p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="order-1 lg:order-2" variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ background: C.greenPale, color: C.green }}>
                  Ateliers &amp; Cours
                </span>
                <h2 className="text-4xl md:text-5xl font-light mb-8" style={{ color: C.dark }}>
                  L&apos;Atelier <span className="font-bold italic" style={{ color: C.rose }}>Petales</span>
                </h2>
                <div className="space-y-4">
                  {atelierSteps.map((a) => (
                    <motion.div
                      key={a.titre}
                      className="p-5 rounded-2xl group cursor-pointer"
                      style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}
                      whileHover={{ x: 6, boxShadow: `0 8px 24px ${C.rose}08` }}
                      transition={SPRING_SOFT}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold" style={{ color: C.dark }}>{a.titre}</h4>
                        <span className="font-bold text-sm flex-shrink-0 ml-3" style={{ color: C.rose }}>{a.prix}&euro;</span>
                      </div>
                      <p className="text-sm" style={{ color: C.muted }}>{a.desc}</p>
                      <p className="text-xs mt-2" style={{ color: C.green }}>Duree : {a.duree}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-8 mt-10">
                  <div>
                    <p className="text-3xl font-bold" style={{ color: C.rose }}><Counter target={20} /></p>
                    <p className="text-sm" style={{ color: C.muted }}>ans de passion</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: C.rose }}><Counter target={15} suffix="k+" /></p>
                    <p className="text-sm" style={{ color: C.muted }}>bouquets crees</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold" style={{ color: C.rose }}><Counter target={500} suffix="+" /></p>
                    <p className="text-sm" style={{ color: C.muted }}>mariages fleuris</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 7. TEMOIGNAGES + CTA ==================== */}
        <section className={SECTION.padding} style={{ background: "#fafafa" }}>
          <div className={SECTION.containerNarrow}>
            <motion.div className="text-center" variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ color: C.dark }}>
                Envie de <span className="font-bold italic" style={{ color: C.rose }}>fleurir</span> votre quotidien ?
              </h2>
              <p className="text-lg mb-8" style={{ color: C.muted }}>
                Passez commande en ligne ou venez nous rendre visite a l&apos;atelier. Nous serons ravis de creer le bouquet parfait pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-10 py-4 rounded-full font-semibold text-sm text-white"
                  style={{ background: C.rose }}
                  whileHover={{ scale: 1.04, boxShadow: `0 10px 30px ${C.rose}35` }}
                  transition={{ duration: DURATION.micro }}
                >
                  Commander un bouquet
                </motion.button>
                <motion.button
                  className="px-10 py-4 rounded-full font-semibold text-sm border-2"
                  style={{ borderColor: C.green, color: C.green }}
                  whileHover={{ scale: 1.03, backgroundColor: C.greenPale }}
                  transition={{ duration: DURATION.micro }}
                >
                  Nous contacter
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-light mb-4 text-white">
                  Petales <span className="font-bold italic" style={{ color: C.rose }}>&amp; Fleurs</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Artisan fleuriste depuis 2005. Bouquets sur mesure, compositions florales et livraison a domicile.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: C.rose }}>Boutique</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>15 Rue des Martyrs</li>
                  <li>75009 Paris</li>
                  <li>01 48 78 52 31</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: C.green }}>Horaires</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>Mar - Sam : 9h00 - 19h30</li>
                  <li>Dimanche : 9h00 - 13h00</li>
                  <li>Lundi : Ferme</li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
              &copy; 2025 Petales &amp; Fleurs. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
