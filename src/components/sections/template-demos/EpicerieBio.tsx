"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SECTION,
  TYPOGRAPHY,
  DURATION,
  EASE_SMOOTH,
  EASE_IN_OUT,
  SPRING_MEDIUM,
  SPRING_SNAPPY,
  fadeUp,
  blurFadeUp,
  staggerContainer,
  staggerItem,
  hoverLift,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#FAFAF2",
  surface: "#F0EDE4",
  card: "#FFFFFF",
  border: "#E0D9CA",
  primary: "#4A7C59",
  accent: "#D4A437",
  dark: "#2C1810",
  white: "#FFFFFF",
  muted: "#7A6B5D",
  mutedDark: "#5C4D40",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Products", "Click & Collect", "Recipes", "Contact"];

const categories = [
  { name: "Fruits & Vegetables", count: 45, icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z", grad: `linear-gradient(135deg, #7CB342, ${c.primary})` },
  { name: "Pantry", count: 62, icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", grad: `linear-gradient(135deg, ${c.accent}, #B8860B)` },
  { name: "Dairy & Eggs", count: 28, icon: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z", grad: `linear-gradient(135deg, #F5DEB3, #DEB887)` },
  { name: "Beverages", count: 34, icon: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z", grad: `linear-gradient(135deg, #06B6D4, #0E7490)` },
];

const producers = [
  { name: "Domaine des Oliviers", bio: "Organic olive oil producer since 1987. Family-run estate in Provence with traditional stone-press methods.", specialty: "Cold-pressed olive oil", location: "Provence", grad: `linear-gradient(135deg, #7CB342, ${c.primary})` },
  { name: "La Ferme du Soleil", bio: "Free-range eggs and artisanal cheese from happy goats on a sunny hillside farm.", specialty: "Goat cheese & eggs", location: "Ardeche", grad: `linear-gradient(135deg, ${c.accent}, #F59E0B)` },
  { name: "Rucher des Cevennes", bio: "Third-generation beekeeper. Wildflower honey harvested by hand, zero pesticides.", specialty: "Wildflower honey", location: "Cevennes", grad: `linear-gradient(135deg, #D97706, #92400E)` },
];

const collectSteps = [
  { step: "1", title: "Browse & Order", desc: "Pick your products online. 800+ organic references available.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
  { step: "2", title: "We Prepare", desc: "Our team hand-picks the freshest items for your basket.", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { step: "3", title: "Pick Up", desc: "Collect at the shop or get it delivered within 24h in your area.", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18M5.25 14.25h13.5M5.25 14.25L4.5 6h15l-.75 8.25" },
];

const loyaltyTiers = [
  { name: "Seed", min: 0, discount: "5%", color: c.primary },
  { name: "Sprout", min: 200, discount: "10%", color: "#7CB342" },
  { name: "Bloom", min: 500, discount: "15%", color: c.accent },
];

const recipes = [
  { title: "Provencal Ratatouille", time: "45 min", difficulty: "Easy", grad: `linear-gradient(135deg, #EF4444, #F59E0B)` },
  { title: "Honey Granola Bowls", time: "20 min", difficulty: "Easy", grad: `linear-gradient(135deg, ${c.accent}, #D97706)` },
  { title: "Green Pesto Pasta", time: "30 min", difficulty: "Medium", grad: `linear-gradient(135deg, ${c.primary}, #059669)` },
];

/* ------------------------------------------------------------------ */
/*  Floating Leaves (Signature)                                        */
/* ------------------------------------------------------------------ */
function FloatingLeaves() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const leaves = [
    { x: "8%", delay: 0, dur: 12, size: 16, rotate: 45 },
    { x: "25%", delay: 3, dur: 15, size: 12, rotate: -30 },
    { x: "55%", delay: 1, dur: 10, size: 18, rotate: 60 },
    { x: "75%", delay: 5, dur: 14, size: 14, rotate: -45 },
    { x: "90%", delay: 2, dur: 11, size: 10, rotate: 20 },
    { x: "42%", delay: 7, dur: 13, size: 15, rotate: -60 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: leaf.x, top: "-5%" }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [leaf.rotate, leaf.rotate + 360],
            x: [0, Math.sin(i) * 40, 0],
          }}
          transition={{
            duration: leaf.dur,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" fill={c.primary} opacity={0.12}>
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.warm;

export default function EpicerieBio() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div style={{ background: c.bg, color: c.dark }} className="overflow-hidden">
      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.normal, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ borderColor: c.border, background: c.bg + "EE" }}
      >
        <div className={`${SECTION.container} flex items-center justify-between h-16`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: c.primary }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <span className="font-bold text-lg" style={{ color: c.primary }}>Le Panier Vert</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <span key={l} className="text-sm cursor-pointer transition-colors hover:text-green-800" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2 rounded-full text-sm font-medium text-white"
            style={{ background: c.primary }}
          >
            Order Now
          </motion.button>
        </div>
      </motion.nav>

      {/* ═══ HERO — Nature with Floating Leaves ═══ */}
      <section className={`${SECTION.paddingHero} relative`}>
        <FloatingLeaves />
        <div className={`${SECTION.container} relative z-10`}>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
              style={{ background: c.primary + "15", color: c.primary }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={c.primary}>
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
              100% Certified Organic
            </motion.div>

            <motion.h1
              variants={delayedBlurFade(HERO_SEQUENCE.title)}
              initial="hidden"
              animate="visible"
              className={`${typo.heroTitle} mb-6`}
            >
              Fresh from the{" "}
              <span style={{ color: c.primary }}>farm</span>
              {" "}to your{" "}
              <span style={{ color: c.accent }}>table</span>
            </motion.h1>

            <motion.p
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
              className={`${typo.subtitle} max-w-xl mx-auto mb-10`}
              style={{ color: c.muted }}
            >
              800+ organic products from local producers. Order online, pick up fresh. Supporting sustainable agriculture since 2019.
            </motion.p>

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${c.primary}30` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-medium text-white"
                style={{ background: c.primary }}
              >
                Shop Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-full font-medium border"
                style={{ borderColor: c.primary, color: c.primary }}
              >
                Our Producers
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CATALOGUE — Category Tabs ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className={`${typo.caption}`} style={{ color: c.primary }}>Our Products</span>
            <h2 className={`${typo.sectionTitle} mt-2`}>Browse by Category</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={staggerItem}
                onClick={() => setActiveCategory(i)}
                className={`group rounded-2xl border p-6 text-center cursor-pointer transition-all duration-300 ${
                  activeCategory === i ? "ring-2" : ""
                }`}
                style={{
                  background: activeCategory === i ? c.card : c.bg,
                  borderColor: activeCategory === i ? c.primary : c.border,
                  ...(activeCategory === i ? { boxShadow: `0 4px 20px ${c.primary}15` } : {}),
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: activeCategory === i ? c.primary + "15" : c.surface }}
                >
                  <svg className="w-6 h-6" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1">{cat.name}</h3>
                <p className="text-xs" style={{ color: c.muted }}>{cat.count} products</p>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: DURATION.fast, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
              className="rounded-2xl overflow-hidden"
              style={{ background: categories[activeCategory].grad }}
            >
              <div className="aspect-[21/9] flex items-center justify-center p-8">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{categories[activeCategory].name}</h3>
                  <p className="text-sm opacity-80">{categories[activeCategory].count} organic products from local farms</p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 px-6 py-2 rounded-full text-sm font-medium"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
                  >
                    Browse All
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ PRODUCERS ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption}`} style={{ color: c.accent }}>Our Partners</span>
            <h2 className={`${typo.sectionTitle} mt-2`}>Meet Our Producers</h2>
            <p className={`${typo.subtitle} mt-3 max-w-xl mx-auto`} style={{ color: c.muted }}>
              We work directly with local farmers and artisans. No middlemen. Fair prices.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {producers.map((p) => (
              <motion.div
                key={p.name}
                variants={staggerItem}
                {...hoverLift}
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ background: c.card, borderColor: c.border }}
              >
                <div className="aspect-[16/9]" style={{ background: p.grad }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white/20">{p.name[0]}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span className="text-xs" style={{ color: c.muted }}>{p.location}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: c.muted }}>{p.bio}</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: c.primary + "12", color: c.primary }}
                  >
                    {p.specialty}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CLICK & COLLECT ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption}`} style={{ color: c.primary }}>How It Works</span>
            <h2 className={`${typo.sectionTitle} mt-2`}>Click & Collect</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.15, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
          >
            {/* Connection arrows (desktop) */}
            <div className="hidden md:block absolute top-16 left-[33%] w-[34%] h-px" style={{ background: `linear-gradient(to right, ${c.primary}30, ${c.accent}30)` }} />

            {collectSteps.map((s) => (
              <motion.div
                key={s.step}
                variants={staggerItem}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 relative z-10"
                  style={{ background: c.primary, color: "white" }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: c.muted }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LOYALTY PROGRAM ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption}`} style={{ color: c.accent }}>Rewards</span>
            <h2 className={`${typo.sectionTitle} mt-2`}>Loyalty Program</h2>
            <p className={`${typo.subtitle} mt-3 max-w-xl mx-auto`} style={{ color: c.muted }}>
              Earn points with every purchase. Grow your rewards like we grow our produce.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {loyaltyTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={staggerItem}
                {...hoverLift}
                className="rounded-2xl border p-8 text-center"
                style={{ background: c.card, borderColor: c.border }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: tier.color + "15" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={tier.color}>
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-sm mb-4" style={{ color: c.muted }}>From {tier.min} points</p>
                <div className="text-3xl font-bold" style={{ color: tier.color }}>{tier.discount}</div>
                <p className="text-xs mt-1" style={{ color: c.muted }}>discount on all orders</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ RECIPES / BLOG ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption}`} style={{ color: c.primary }}>Inspiration</span>
            <h2 className={`${typo.sectionTitle} mt-2`}>Seasonal Recipes</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {recipes.map((r) => (
              <motion.div
                key={r.title}
                variants={staggerItem}
                {...hoverLift}
                className="rounded-2xl border overflow-hidden cursor-pointer"
                style={{ background: c.card, borderColor: c.border }}
              >
                <div className="aspect-[16/10]" style={{ background: r.grad }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265z" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-2">{r.title}</h3>
                  <div className="flex items-center gap-3 text-xs" style={{ color: c.muted }}>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {r.time}
                    </span>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: c.primary + "12", color: c.primary }}>{r.difficulty}</span>
                  </div>
                </div>
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
            className="relative text-center rounded-3xl overflow-hidden py-20 px-6"
            style={{ background: c.primary }}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, white, transparent 70%)" }}
            />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">
              Ready to eat better?
            </h2>
            <p className="text-base text-white/70 mb-8 max-w-md mx-auto relative z-10">
              Join 2,000+ families who trust Le Panier Vert for their weekly organic groceries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full font-medium text-lg"
                style={{ background: c.white, color: c.primary }}
              >
                Start Shopping
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full font-medium text-lg border-2 text-white"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                Visit the Shop
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12" style={{ borderColor: c.border }}>
        <div className={`${SECTION.container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: c.primary }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <span className="font-bold" style={{ color: c.primary }}>Le Panier Vert</span>
          </div>
          <div className="flex items-center gap-6">
            {["About", "Delivery", "FAQ", "Contact"].map((l) => (
              <span key={l} className="text-sm cursor-pointer transition-colors" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: c.muted }}>&copy; 2026 Le Panier Vert. Organic & Local.</p>
        </div>
      </footer>
    </div>
  );
}
