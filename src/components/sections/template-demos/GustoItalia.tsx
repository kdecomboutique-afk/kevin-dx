"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
  SPRING_MEDIUM,
  SPRING_BOUNCE,
  DURATION,
  fadeUp,
  blurFadeUp,
  fadeScale,
  fadeLeft,
  fadeRight,
  staggerContainer,
  staggerItem,
  lineRevealX,
  hoverLift,
  delayedBlurFade,
  SECTION,
  HERO_SEQUENCE,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE — Trattoria italienne
   ================================================================ */
const C = {
  red: "#C0392B",
  green: "#27AE60",
  bg: "#FFF8F0",
  dark: "#1a1a1a",
  cream: "#FEFAE0",
  white: "#FFFFFF",
  muted: "#7a7060",
};

/* ================================================================
   MENU DATA
   ================================================================ */
const menuCategories = [
  {
    titre: "Pizze",
    icon: "M12 2C8 2 4 6 4 10c0 2 1 4 2 5l6 7 6-7c1-1 2-3 2-5 0-4-4-8-8-8z",
    items: [
      { nom: "Margherita DOP", desc: "Mozzarella di bufala, basilic frais, tomates San Marzano", prix: "14" },
      { nom: "Diavola", desc: "Salami piquant, mozzarella fior di latte, piment calabrais", prix: "16" },
      { nom: "Quattro Formaggi", desc: "Gorgonzola, taleggio, parmesan, mozzarella, miel", prix: "17" },
      { nom: "Truffle Bianca", desc: "Creme de truffe, champignons, burrata, roquette", prix: "22" },
    ],
  },
  {
    titre: "Pasta",
    icon: "M4 12h16M4 8h16M8 4v16M16 4v16",
    items: [
      { nom: "Cacio e Pepe", desc: "Pecorino romano, poivre noir, spaghetti al dente", prix: "16" },
      { nom: "Carbonara", desc: "Guanciale, jaune d'oeuf, pecorino, poivre noir", prix: "17" },
      { nom: "Pappardelle al Ragu", desc: "Ragu de boeuf braise 6h, parmesan 24 mois", prix: "19" },
      { nom: "Linguine Frutti di Mare", desc: "Moules, palourdes, crevettes, bisque safranee", prix: "24" },
    ],
  },
  {
    titre: "Dolci",
    icon: "M12 8c-2-3-6-3-6 1 0 3 6 6 6 6s6-3 6-6c0-4-4-4-6-1z",
    items: [
      { nom: "Tiramisu della Nonna", desc: "Mascarpone, cafe expresso, cacao amer", prix: "10" },
      { nom: "Panna Cotta", desc: "Vanille de Madagascar, coulis fruits rouges", prix: "9" },
      { nom: "Cannoli Siciliani", desc: "Ricotta, pistaches de Bronte, chocolat", prix: "11" },
      { nom: "Affogato", desc: "Glace fior di latte, double expresso", prix: "8" },
    ],
  },
];

/* ================================================================
   TIMELINE DATA
   ================================================================ */
const timeline = [
  { annee: "1985", lieu: "Naples", texte: "Nonna Maria ouvre sa premiere pizzeria dans le quartier Spaccanapoli" },
  { annee: "1998", lieu: "Rome", texte: "Marco reprend le flambeau et perfectionne les recettes familiales" },
  { annee: "2012", lieu: "Lyon", texte: "L'aventure francaise commence avec un premier restaurant" },
  { annee: "2024", lieu: "Paris", texte: "Gusto Italia s'installe dans le Marais et enchante les parisiens" },
];

/* ================================================================
   REVIEWS DATA
   ================================================================ */
const avis = [
  { nom: "Sophie L.", note: 5, texte: "La meilleure pizza de Paris, sans hesitation ! La pate est incroyable et les ingredients d'une fraicheur remarquable." },
  { nom: "Thomas M.", note: 5, texte: "Un voyage direct en Italie. Les pates sont faites maison, le tiramisu est a tomber. On y retourne chaque semaine !" },
  { nom: "Claire D.", note: 4, texte: "Ambiance chaleureuse, service attentionne et cuisine authentique. La carbonara est la meilleure que j'ai goutee hors d'Italie." },
];

/* ================================================================
   DELIVERY BADGES
   ================================================================ */
const livraison = [
  { label: "Livraison en 30 min", icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" },
  { label: "Gratuit des 25 euros", icon: "M12 8c-2-3-6-3-6 1 0 3 6 6 6 6s6-3 6-6c0-4-4-4-6-1z" },
  { label: "7j/7 midi et soir", icon: "M3 12h18M3 6h18M3 18h18" },
];

/* ================================================================
   SIGNATURE: warm-gradient-morph — backgrounds morphing
   ================================================================ */
const gradientMorphKeyframes = [
  "radial-gradient(circle at 20% 50%, rgba(192,57,43,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(39,174,96,0.1) 0%, transparent 50%)",
  "radial-gradient(circle at 80% 30%, rgba(192,57,43,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(39,174,96,0.15) 0%, transparent 50%)",
  "radial-gradient(circle at 50% 80%, rgba(192,57,43,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(39,174,96,0.12) 0%, transparent 50%)",
  "radial-gradient(circle at 20% 50%, rgba(192,57,43,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(39,174,96,0.1) 0%, transparent 50%)",
];

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
export default function GustoItalia() {
  const [gradientIdx, setGradientIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGradientIdx((prev) => (prev + 1) % gradientMorphKeyframes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative" id="template-restaurant-2">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(255,248,240,0.92)", borderColor: `${C.red}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-bold" style={{ color: C.red }}>Gusto</span>
            <span className="font-bold italic ml-1" style={{ color: C.green }}>Italia</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Trattoria italienne</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-restaurant-2" className="px-4 py-2 text-sm font-medium rounded-full text-white" style={{ background: C.red }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO ==================== */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: C.cream, backgroundImage: gradientMorphKeyframes[gradientIdx], transition: "background-image 3s ease-in-out" }}
        >
          {/* Pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23606C38' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div className={`${SECTION.container} relative z-10`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.span
                  className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{ background: `${C.red}12`, color: C.red }}
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden"
                  animate="visible"
                >
                  Autentica cucina italiana
                </motion.span>

                <motion.h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] mb-6">
                  <motion.span
                    className="inline-block"
                    style={{ color: C.red }}
                    variants={delayedBlurFade(HERO_SEQUENCE.title)}
                    initial="hidden"
                    animate="visible"
                  >
                    Gusto
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block italic"
                    style={{ color: C.green }}
                    variants={delayedBlurFade(HERO_SEQUENCE.title + 0.2)}
                    initial="hidden"
                    animate="visible"
                  >
                    Italia
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl max-w-md mb-8 leading-relaxed"
                  style={{ color: C.green }}
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden"
                  animate="visible"
                >
                  Des recettes transmises de generation en generation, des ingredients importes directement d&apos;Italie, et un four a bois qui fait toute la difference.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    className="px-8 py-4 rounded-full font-bold text-sm text-white"
                    style={{ background: C.red }}
                    whileHover={{ scale: 1.04, boxShadow: `0 10px 30px ${C.red}35` }}
                    transition={{ duration: DURATION.micro }}
                  >
                    Commander en ligne
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 rounded-full font-bold text-sm border-2"
                    style={{ borderColor: C.green, color: C.green }}
                    whileHover={{ scale: 1.03, backgroundColor: `${C.green}08` }}
                    transition={{ duration: DURATION.micro }}
                  >
                    Voir la carte
                  </motion.button>
                </motion.div>
              </div>

              {/* Pizza illustration */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ ...SPRING_MEDIUM, delay: HERO_SEQUENCE.visual }}
              >
                <div className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full relative" style={{ background: `linear-gradient(135deg, ${C.red}, #a02020 60%, ${C.red})` }}>
                  <div className="absolute inset-4 rounded-full" style={{ background: `linear-gradient(135deg, ${C.cream}, #f5e6b8 50%, ${C.cream})` }}>
                    <div className="absolute inset-8 rounded-full opacity-40" style={{ background: `radial-gradient(circle at 30% 40%, ${C.red}, transparent 60%)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="1" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="8" cy="10" r="1.5" fill={C.red} />
                          <circle cx="14" cy="8" r="1" fill={C.green} />
                          <circle cx="16" cy="13" r="1.5" fill={C.red} />
                          <circle cx="10" cy="15" r="1" fill={C.green} />
                        </svg>
                        <p className="text-sm font-bold mt-2" style={{ color: C.red }}>Four a bois</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -top-2 -right-2 md:top-2 md:right-2 px-4 py-2 rounded-2xl shadow-lg bg-white"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-bold" style={{ color: C.red }}>Four a bois</span>
                </motion.div>
                <motion.div
                  className="absolute bottom-4 -left-2 md:bottom-8 md:left-0 px-4 py-2 rounded-2xl shadow-lg bg-white"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="text-sm font-bold" style={{ color: C.green }}>Fait maison</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. MENU ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black" style={{ color: C.red }}>La Carta</h2>
              <p className="text-lg mt-4" style={{ color: C.green }}>Chaque plat est une declaration d&apos;amour a l&apos;Italie</p>
            </motion.div>

            <div className="space-y-16">
              {menuCategories.map((cat, catIdx) => (
                <motion.div
                  key={cat.titre}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-2xl" style={{ background: `${C.red}10`, color: C.red }}>
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-black" style={{ color: C.dark }}>{cat.titre}</h3>
                    <div className="flex-1 h-px" style={{ background: `${C.red}20` }} />
                  </div>

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    variants={staggerContainer(0.06, catIdx * 0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {cat.items.map((item) => (
                      <motion.div
                        key={item.nom}
                        className="p-6 rounded-2xl group cursor-pointer"
                        style={{ background: C.cream, border: `1px solid ${C.green}15` }}
                        variants={staggerItem}
                        whileHover={{ scale: 1.03, y: -3, boxShadow: `0 16px 32px ${C.green}12` }}
                        transition={SPRING_MEDIUM}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg" style={{ color: C.dark }}>{item.nom}</h4>
                          <span className="text-xl font-black ml-4 flex-shrink-0" style={{ color: C.red }}>{item.prix}&euro;</span>
                        </div>
                        <p className="text-sm" style={{ color: C.green }}>{item.desc}</p>
                        {/* Warm underline on hover */}
                        <div className="h-0.5 mt-4 w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${C.red}40, ${C.green}40)` }} />
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 3. COMMANDE RAPIDE ==================== */}
        <section className={SECTION.padding} style={{ background: C.cream }}>
          <div className={SECTION.container}>
            <motion.div
              className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              style={{ background: C.red }}
              variants={fadeScale}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full" style={{ background: C.white }} />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full" style={{ background: C.white }} />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Commande en ligne</h2>
                <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">Votre pizza preferee en quelques clics. Livraison rapide ou retrait sur place.</p>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {livraison.map((b, i) => (
                    <motion.div
                      key={b.label}
                      className="px-5 py-3 rounded-full flex items-center gap-2"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                      variants={staggerItem}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                      </svg>
                      <span className="text-sm font-bold text-white">{b.label}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  className="px-10 py-4 rounded-full font-bold text-sm"
                  style={{ background: C.white, color: C.red }}
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                  transition={{ duration: DURATION.micro }}
                >
                  Commander maintenant
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. NOTRE HISTOIRE (Timeline) ==================== */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black" style={{ color: C.green }}>La Nostra Storia</h2>
              <p className="text-lg mt-4" style={{ color: C.red }}>De Naples a Paris, une passion qui traverse les generations</p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5" style={{ background: `${C.red}20` }} />
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-8"
                variants={staggerContainer(0.15, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {timeline.map((item) => (
                  <motion.div key={item.annee} className="relative text-center" variants={staggerItem}>
                    <div className="hidden md:flex w-4 h-4 rounded-full mx-auto mb-6 relative z-10" style={{ background: C.red }} />
                    <motion.div
                      className="p-6 rounded-2xl bg-white"
                      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                      whileHover={{ scale: 1.03, y: -3, boxShadow: `0 12px 32px ${C.red}10` }}
                      transition={SPRING_MEDIUM}
                    >
                      <span className="text-3xl font-black" style={{ color: C.red }}>{item.annee}</span>
                      <p className="font-bold mt-1" style={{ color: C.green }}>{item.lieu}</p>
                      <p className="text-sm mt-3" style={{ color: C.muted }}>{item.texte}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 5. LIVRAISON ==================== */}
        <section className={SECTION.padding} style={{ background: C.red }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">Livraison a domicile</h2>
                <p className="text-lg mb-8 leading-relaxed text-white/85">
                  Profitez de nos pizzas et plats directement chez vous. Nos livreurs vous apportent la chaleur de l&apos;Italie en un temps record.
                </p>
                <motion.button
                  className="px-10 py-4 rounded-full font-bold text-sm"
                  style={{ background: C.white, color: C.red }}
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
                  transition={{ duration: DURATION.micro }}
                >
                  Commander maintenant
                </motion.button>
              </motion.div>

              {/* Zone de livraison */}
              <motion.div
                className="rounded-3xl overflow-hidden aspect-square relative"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))" }}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                    </svg>
                    <p className="font-bold text-white">Zone de livraison</p>
                    <p className="text-sm text-white/70 mt-1">Paris et petite couronne</p>
                  </div>
                </div>
                <div className="absolute inset-8 rounded-full border border-white/10" />
                <div className="absolute inset-16 rounded-full border border-white/10" />
                <div className="absolute inset-24 rounded-full border border-white/10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 6. AVIS ==================== */}
        <section className={SECTION.padding} style={{ background: C.cream }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl md:text-6xl font-black" style={{ color: C.dark }}>I Nostri Clienti</h2>
              <p className="text-lg mt-4" style={{ color: C.green }}>Ce qu&apos;ils disent de nous</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {avis.map((a) => (
                <motion.div
                  key={a.nom}
                  className="p-8 rounded-3xl bg-white"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                  variants={staggerItem}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: `0 16px 40px ${C.red}10` }}
                  transition={SPRING_MEDIUM}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} className="w-5 h-5" fill={idx < a.note ? C.red : "#ddd"} viewBox="0 0 24 24">
                        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#555" }}>
                    &laquo;&nbsp;{a.texte}&nbsp;&raquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: C.green }}>
                      {a.nom.charAt(0)}
                    </div>
                    <span className="font-bold" style={{ color: C.dark }}>{a.nom}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 7. CONTACT ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.containerNarrow}>
            <motion.div className="text-center" variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: C.dark }}>Venez nous voir</h2>
              <p className="text-lg mb-10" style={{ color: C.muted }}>28 Rue des Rosiers, 75004 Paris — Le Marais</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Telephone", value: "01 44 59 88 12" },
                  { label: "Email", value: "ciao@gustoitalia.fr" },
                  { label: "Horaires", value: "7j/7 11h30-23h" },
                ].map((info) => (
                  <div key={info.label} className="p-6 rounded-2xl" style={{ background: C.cream }}>
                    <p className="text-xs tracking-widest uppercase mb-2 font-bold" style={{ color: C.red }}>{info.label}</p>
                    <p className="font-bold" style={{ color: C.dark }}>{info.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-black mb-4">
                  <span style={{ color: C.red }}>Gusto</span>{" "}
                  <span className="italic" style={{ color: C.green }}>Italia</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Pizzeria artisanale au coeur de Paris. Four a bois, ingredients importes d&apos;Italie, recettes familiales depuis 1985. Ouvert 7j/7.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: C.cream }}>Horaires</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>Lun - Ven : 11h30 - 23h00</li>
                  <li>Sam - Dim : 11h00 - 00h00</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4" style={{ color: C.cream }}>Contact</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>28 Rue des Rosiers, 75004 Paris</li>
                  <li>01 44 59 88 12</li>
                  <li>ciao@gustoitalia.fr</li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
              &copy; 2025 Gusto Italia. Tutti i diritti riservati. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
