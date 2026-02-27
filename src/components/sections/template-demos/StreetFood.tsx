"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_BACK,
  SPRING_BOUNCE,
  SPRING_SNAPPY,
  DURATION,
  fadeUp,
  blurFadeUp,
  fadeScale,
  popIn,
  staggerContainer,
  staggerItemBounce,
  lineRevealX,
  delayedBlurFade,
  SECTION,
  HERO_SEQUENCE,
  TYPOGRAPHY,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE — Food truck urbain neon
   ================================================================ */
const C = {
  orange: "#E67E22",
  yellow: "#F1C40F",
  dark: "#1A1A2E",
  darkAlt: "#16213E",
  pink: "#E91E63",
  white: "#FFFFFF",
  muted: "rgba(255,255,255,0.55)",
};

/* ================================================================
   MENU DATA
   ================================================================ */
const menuItems = [
  { nom: "Le Smash Burger", desc: "Double smash patty, cheddar fondu, sauce secrete, oignons croustillants", prix: "13", hot: true },
  { nom: "Le Veggie Bomb", desc: "Steak de betterave et lentilles, guacamole, tomates confites, chipotle", prix: "12", hot: false },
  { nom: "Le Poulet Croustillant", desc: "Poulet pane, coleslaw maison, sauce miel-moutarde, cornichons", prix: "12", hot: true },
  { nom: "Loaded Fries", desc: "Frites fraiches, cheddar fondu, bacon croustillant, jalapenos, creme", prix: "9", hot: false },
  { nom: "Le Hot Dog NYC", desc: "Saucisse fumee artisanale, choucroute, moutarde, oignons caramelises", prix: "10", hot: true },
  { nom: "Tacos El Fuego", desc: "Pulled pork 12h, pico de gallo, guacamole, creme de coriandre", prix: "11", hot: false },
];

const boissons = [
  { nom: "Limonade maison", prix: "4" },
  { nom: "Ice Tea peche", prix: "4" },
  { nom: "Biere artisanale", prix: "6" },
  { nom: "Milkshake", prix: "7" },
];

/* ================================================================
   PLANNING DATA
   ================================================================ */
const planning = [
  { jour: "Lundi", lieu: "Place du Marche", horaires: "11h30 - 14h30", quartier: "Centre-ville" },
  { jour: "Mardi", lieu: "Zone Industrielle Nord", horaires: "11h30 - 14h00", quartier: "Pause dejeuner" },
  { jour: "Mercredi", lieu: "Parvis de la Fac", horaires: "11h00 - 15h00", quartier: "Campus" },
  { jour: "Jeudi", lieu: "Marche Couvert", horaires: "11h30 - 14h30", quartier: "Halles" },
  { jour: "Vendredi", lieu: "Place de la Mairie", horaires: "11h30 - 22h00", quartier: "Soiree extended" },
  { jour: "Samedi", lieu: "Marche Bio", horaires: "10h00 - 16h00", quartier: "Promenade" },
  { jour: "Dimanche", lieu: "Bord de Seine", horaires: "11h00 - 17h00", quartier: "Balade dominicale" },
];

/* ================================================================
   INSTAGRAM GRID
   ================================================================ */
const instaGrid = [
  { gradient: `linear-gradient(135deg, ${C.yellow}, #FF6B6B)`, label: "Smash Burger" },
  { gradient: `linear-gradient(135deg, ${C.pink}, #9C27B0)`, label: "Loaded Fries" },
  { gradient: `linear-gradient(135deg, ${C.dark}, ${C.yellow})`, label: "Food Truck" },
  { gradient: `linear-gradient(135deg, #FF6B6B, ${C.yellow})`, label: "Tacos" },
  { gradient: `linear-gradient(135deg, #9C27B0, ${C.pink})`, label: "Milkshake" },
  { gradient: `linear-gradient(135deg, ${C.yellow}, ${C.dark})`, label: "Happy clients" },
];

/* ================================================================
   CONCEPT DATA
   ================================================================ */
const concepts = [
  { titre: "100% Frais", desc: "Produits frais livres chaque matin. Rien de congele, tout est fait minute devant vous.", icon: "M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" },
  { titre: "Artisanal", desc: "Pains et sauces faits maison. Chaque recette est le fruit de mois de recherche.", icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" },
  { titre: "Eco-responsable", desc: "Emballages compostables, zero plastique. On nourrit la ville, pas les poubelles.", icon: "M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8z" },
];

/* ================================================================
   SIGNATURE: neon-pulse-bounce
   Neon glow CSS + bounce spring animations
   ================================================================ */
const neonGlow = (color: string) => ({
  textShadow: `0 0 10px ${color}80, 0 0 30px ${color}40, 0 0 60px ${color}20`,
});

const neonBounce = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...SPRING_BOUNCE,
      delay: i * 0.1,
    },
  }),
};

/* ================================================================
   COMPOSANT PRINCIPAL
   ================================================================ */
export default function StreetFood() {
  return (
    <div className="relative" id="template-street-food">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(26,26,46,0.92)", borderColor: `${C.yellow}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-black" style={{ color: C.yellow }}>STREET</span>
            <span className="font-black ml-1 text-white">FOOD</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Food Truck</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-street-food" className="px-4 py-2 text-sm font-black rounded-full" style={{ background: C.yellow, color: C.dark }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO — Neon dark ==================== */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.dark }}>
          {/* Neon glow blobs */}
          <div className="absolute inset-0">
            <motion.div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: C.yellow }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: C.pink }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ background: C.yellow }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(${C.yellow}80 1px, transparent 1px), linear-gradient(90deg, ${C.yellow}80 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

          <div className={`${SECTION.container} relative z-10 text-center`}>
            {/* Live badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
              style={{ background: `${C.pink}25`, border: `1px solid ${C.pink}40` }}
              variants={neonBounce}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="w-2 h-2 rounded-full" style={{ background: C.pink }} animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
              <span className="text-sm font-bold" style={{ color: C.pink }}>
                Aujourd&apos;hui : Place du Marche &bull; 11h30 - 14h30
              </span>
            </motion.div>

            {/* SIGNATURE: Neon title with glow */}
            <motion.h1 className={`${TYPOGRAPHY.pop.heroTitle} leading-[0.85] mb-6`}>
              <motion.span
                className="inline-block"
                style={{ color: C.yellow, ...neonGlow(C.yellow) }}
                variants={neonBounce}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                STREET
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                style={{ color: C.white, ...neonGlow(C.white) }}
                variants={neonBounce}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                FOOD
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-bold mb-4"
              style={{ color: C.pink, ...neonGlow(C.pink) }}
              variants={neonBounce}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              Le meilleur burger en ville
            </motion.p>

            <motion.p
              className="text-lg max-w-lg mx-auto mb-10"
              style={{ color: C.muted }}
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
            >
              Burgers smashes, tacos, loaded fries &mdash; tout est fait minute avec des produits frais. Trouvez-nous pres de chez vous !
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                className="px-10 py-4 rounded-full font-black text-base"
                style={{ background: C.yellow, color: C.dark }}
                whileHover={{ scale: 1.06, boxShadow: `0 0 40px ${C.yellow}50` }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING_BOUNCE}
              >
                Commander en ligne
              </motion.button>
              <motion.button
                className="px-10 py-4 rounded-full font-black text-base border-2"
                style={{ borderColor: C.pink, color: C.pink }}
                whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${C.pink}30` }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING_BOUNCE}
              >
                Ou nous trouver ?
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ==================== 2. MENU ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className={`${TYPOGRAPHY.pop.sectionTitle}`} style={{ color: C.dark }}>LE MENU</h2>
              <p className="text-lg mt-4" style={{ color: "#64748B" }}>Tout est fait maison, tout est fait minute</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              variants={staggerContainer(0.06, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.nom}
                  className="rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
                  style={{
                    background: item.hot
                      ? `linear-gradient(135deg, ${C.yellow}, #FFC300)`
                      : `linear-gradient(135deg, ${C.pink}, #C2185B)`,
                  }}
                  variants={staggerItemBounce}
                  whileHover={{ scale: 1.05, rotate: 1, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_BOUNCE}
                >
                  <div
                    className="absolute top-3 right-3 w-16 h-16 rounded-full flex items-center justify-center font-black text-xl"
                    style={{ background: `${C.dark}E6`, color: C.white }}
                  >
                    {item.prix}&euro;
                  </div>
                  <h3
                    className="text-2xl font-black mb-3 pr-16"
                    style={{ color: item.hot ? C.dark : C.white }}
                  >
                    {item.nom}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: item.hot ? `${C.dark}B0` : "rgba(255,255,255,0.85)" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Boissons */}
            <motion.div
              className="rounded-3xl p-8"
              style={{ background: C.dark }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-black text-center mb-6" style={{ color: C.yellow, ...neonGlow(C.yellow) }}>BOISSONS</h3>
              <div className="flex flex-wrap justify-center gap-6">
                {boissons.map((b) => (
                  <div key={b.nom} className="flex items-center gap-3">
                    <span className="font-bold text-white">{b.nom}</span>
                    <span className="font-black" style={{ color: C.pink }}>{b.prix}&euro;</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. OU NOUS TROUVER ==================== */}
        <section className={SECTION.padding} style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className={TYPOGRAPHY.pop.sectionTitle} style={{ color: C.yellow, ...neonGlow(C.yellow) }}>OU NOUS TROUVER</h2>
              <p className="text-lg mt-4" style={{ color: C.muted }}>Un jour, un lieu &mdash; Suivez le truck !</p>
            </motion.div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer(0.05, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {planning.map((jour, i) => (
                <motion.div
                  key={jour.jour}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl cursor-pointer"
                  style={{
                    background: i === 0 ? `${C.yellow}15` : "rgba(255,255,255,0.03)",
                    border: i === 0 ? `1px solid ${C.yellow}35` : "1px solid rgba(255,255,255,0.05)",
                  }}
                  variants={staggerItemBounce}
                  whileHover={{ scale: 1.01, x: 8, backgroundColor: `${C.yellow}08` }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING_SNAPPY}
                >
                  <div className="w-28 flex-shrink-0">
                    <span className="font-black text-lg" style={{ color: i % 2 === 0 ? C.yellow : C.pink }}>
                      {jour.jour}
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-white">{jour.lieu}</span>
                    <span className="text-sm ml-2" style={{ color: C.muted }}>({jour.quartier})</span>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="px-4 py-1 rounded-full text-sm font-bold" style={{ background: "rgba(255,255,255,0.1)", color: C.white }}>
                      {jour.horaires}
                    </span>
                  </div>
                  {i === 0 && (
                    <motion.span
                      className="px-3 py-1 rounded-full text-xs font-black"
                      style={{ background: C.yellow, color: C.dark }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      AUJOURD&apos;HUI
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. CONCEPT ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className={TYPOGRAPHY.pop.sectionTitle} style={{ color: C.dark }}>NOTRE CONCEPT</h2>
              <p className="text-lg mt-4" style={{ color: "#64748B" }}>Bien plus qu&apos;un food truck</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {concepts.map((c) => (
                <motion.div
                  key={c.titre}
                  className="text-center p-8 rounded-3xl"
                  style={{ background: "#F8FAFC" }}
                  variants={staggerItemBounce}
                  whileHover={{ y: -6, scale: 1.03, boxShadow: `0 20px 40px ${C.orange}12` }}
                  transition={SPRING_BOUNCE}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ background: `${C.orange}15` }}>
                    <svg className="w-8 h-8" style={{ color: C.orange }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black mb-3" style={{ color: C.dark }}>{c.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. INSTAGRAM ==================== */}
        <section className={SECTION.padding} style={{ background: "#F8FAFC" }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGapCompact}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className={TYPOGRAPHY.pop.sectionTitle} style={{ color: C.dark }}>@streetfood_truck</h2>
              <p className="text-lg mt-4" style={{ color: C.pink }}>Suivez nos aventures sur Instagram</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
              variants={staggerContainer(0.05, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {instaGrid.map((item) => (
                <motion.div
                  key={item.label}
                  className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer"
                  style={{ background: item.gradient }}
                  variants={staggerItemBounce}
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_BOUNCE}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">{item.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 6. CTA COMMANDER ==================== */}
        <section className={`${SECTION.padding} relative overflow-hidden`} style={{ background: C.dark }}>
          <div className="absolute inset-0">
            <motion.div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: C.yellow }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: C.pink }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          </div>

          <div className={`${SECTION.container} relative z-10 text-center`}>
            <motion.div variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className={`${TYPOGRAPHY.pop.sectionTitle} mb-6`} style={{ color: C.yellow, ...neonGlow(C.yellow) }}>ON A FAIM ?</h2>
              <p className="text-xl mb-10 max-w-lg mx-auto" style={{ color: C.muted }}>
                Commande en ligne et recupere ton repas directement au truck. Zero attente, 100% plaisir.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  className="px-12 py-5 rounded-full font-black text-lg"
                  style={{ background: C.yellow, color: C.dark }}
                  whileHover={{ scale: 1.06, boxShadow: `0 0 50px ${C.yellow}50` }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_BOUNCE}
                >
                  Commander en ligne
                </motion.button>
                <motion.button
                  className="px-12 py-5 rounded-full font-black text-lg border-2"
                  style={{ borderColor: C.pink, color: C.pink }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${C.pink}30` }}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_BOUNCE}
                >
                  Nous suivre
                </motion.button>
              </div>
              <div className="flex justify-center gap-8">
                {["Instagram", "TikTok", "Facebook"].map((social) => (
                  <motion.span
                    key={social}
                    className="text-sm font-bold cursor-pointer"
                    style={{ color: C.muted }}
                    whileHover={{ color: C.yellow, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={SPRING_SNAPPY}
                  >
                    {social}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 7. FOOTER ==================== */}
        <footer className="py-12" style={{ background: "#111122" }}>
          <div className={SECTION.container}>
            <div className="text-center">
              <h3 className="text-2xl font-black mb-4">
                <span style={{ color: C.yellow }}>STREET</span>{" "}
                <span className="text-white">FOOD</span>
              </h3>
              <p className="text-sm mb-4" style={{ color: C.muted }}>Le food truck qui bouge &mdash; Paris et Ile-de-France</p>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                &copy; 2025 Street Food Truck. Tous droits reserves. &mdash; Template par Kevin DX
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
