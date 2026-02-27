"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  SECTION,
  TYPOGRAPHY,
  DURATION,
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  SPRING_SNAPPY,
  SPRING_SOFT,
  fadeUp,
  blurFadeUp,
  staggerContainer,
  staggerItemSoft,
  hoverLift,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#FAF8FF",
  surface: "#F3F0F8",
  card: "#FFFFFF",
  border: "#E8E0F0",
  primary: "#6B21A8",
  accent: "#D4AF37",
  dark: "#1A0A2E",
  white: "#FFFFFF",
  muted: "#7C6F8A",
  mutedDark: "#5A4E6A",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["New In", "Collections", "Lookbook", "Cart"];

const products = [
  { name: "Silk Drape Dress", price: 289, category: "Dresses", grad: "linear-gradient(135deg, #D4BC8B, #8B7355)" },
  { name: "Oversized Blazer", price: 345, category: "Jackets", grad: "linear-gradient(135deg, #3a3a3a, #1a1a1a)" },
  { name: "Grained Leather Bag", price: 420, category: "Accessories", grad: "linear-gradient(135deg, #A8893E, #6B5A30)" },
  { name: "Patent Stilettos", price: 195, category: "Shoes", grad: "linear-gradient(135deg, #6B21A8, #3B0764)" },
  { name: "Cashmere Coat", price: 520, category: "Outerwear", grad: "linear-gradient(135deg, #D4AF37, #B8860B)" },
  { name: "Wool Midi Skirt", price: 175, category: "Skirts", grad: "linear-gradient(135deg, #8B5E3C, #5C3D2E)" },
];

const collections = [
  { name: "Spring", pieces: 24, grad: `linear-gradient(135deg, #F9A8D4, #C084FC)` },
  { name: "Summer", pieces: 18, grad: `linear-gradient(135deg, ${c.accent}, #F59E0B)` },
  { name: "Autumn", pieces: 22, grad: `linear-gradient(135deg, #92400E, #DC2626)` },
  { name: "Winter", pieces: 20, grad: `linear-gradient(135deg, #1E3A5F, #6B21A8)` },
];

const lookbookImages = [
  { grad: `linear-gradient(135deg, ${c.primary}40, ${c.accent}40)`, label: "Editorial 01" },
  { grad: `linear-gradient(135deg, ${c.accent}60, #F9A8D440)`, label: "Editorial 02" },
  { grad: `linear-gradient(135deg, #1A0A2E60, ${c.primary}30)`, label: "Editorial 03" },
];

const sizes = [
  { label: "XS", bust: "80-84", waist: "60-64", hips: "86-90" },
  { label: "S", bust: "84-88", waist: "64-68", hips: "90-94" },
  { label: "M", bust: "88-92", waist: "68-72", hips: "94-98" },
  { label: "L", bust: "92-96", waist: "72-76", hips: "98-102" },
  { label: "XL", bust: "96-100", waist: "76-80", hips: "102-106" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.luxury;

export default function BoutiqueMode() {
  const [activeCollection, setActiveCollection] = useState(0);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

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
          <span className="text-xl font-light tracking-widest uppercase" style={{ color: c.primary }}>
            Maison Elegance
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <span key={l} className="text-sm tracking-wide cursor-pointer transition-colors hover:text-black" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <svg className="w-5 h-5 cursor-pointer" style={{ color: c.mutedDark }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <svg className="w-5 h-5 cursor-pointer" style={{ color: c.mutedDark }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO — Editorial ═══ */}
      <section className={SECTION.paddingHero}>
        <div className={`${SECTION.container} text-center`}>
          <motion.div
            variants={delayedBlurFade(HERO_SEQUENCE.badge)}
            initial="hidden"
            animate="visible"
            className={`${typo.caption} mb-6`}
            style={{ color: c.accent }}
          >
            SPRING / SUMMER 2026
          </motion.div>

          <motion.h1
            variants={delayedBlurFade(HERO_SEQUENCE.title)}
            initial="hidden"
            animate="visible"
            className={`${typo.heroTitle} mb-6`}
            style={{ color: c.dark }}
          >
            The Art of{" "}
            <span style={{ color: c.primary }}>Elegance</span>
          </motion.h1>

          <motion.p
            variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
            initial="hidden"
            animate="visible"
            className={`${typo.subtitle} max-w-xl mx-auto mb-10`}
            style={{ color: c.muted }}
          >
            Timeless pieces crafted from the finest materials. Where heritage meets contemporary design.
          </motion.p>

          <motion.div
            variants={delayedBlurFade(HERO_SEQUENCE.cta)}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: `0 8px 30px ${c.primary}30` }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 rounded-none text-sm tracking-widest uppercase font-light text-white"
              style={{ background: c.primary }}
            >
              Shop Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-3.5 rounded-none text-sm tracking-widest uppercase font-light border"
              style={{ borderColor: c.primary, color: c.primary }}
            >
              Lookbook
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═══ LOOKBOOK — Parallax Stack (Signature) ═══ */}
      <section className={SECTION.padding} ref={parallaxRef}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>LOOKBOOK</span>
            <h2 className={typo.sectionTitle}>Spring Collection</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {lookbookImages.map((img, i) => {
              const yVal = i === 0 ? y1 : i === 1 ? y2 : y3;
              return (
                <motion.div
                  key={img.label}
                  style={{ y: yVal }}
                  className="rounded-sm overflow-hidden"
                >
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    <div className="aspect-[3/4] relative" style={{ background: img.grad }}>
                      <div className="absolute inset-0 flex items-end p-6">
                        <span className={`${typo.caption}`} style={{ color: "rgba(255,255,255,0.6)" }}>{img.label}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ COLLECTIONS — Tabs ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>COLLECTIONS</span>
            <h2 className={typo.sectionTitle}>Seasonal Curation</h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {collections.map((col, i) => (
              <motion.button
                key={col.name}
                onClick={() => setActiveCollection(i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-6 py-2.5 text-sm tracking-wide transition-colors cursor-pointer ${
                  activeCollection === i ? "text-white" : ""
                }`}
                style={{
                  color: activeCollection === i ? c.white : c.muted,
                  background: activeCollection === i ? c.primary : "transparent",
                }}
              >
                {col.name}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCollection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: DURATION.fast, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
              className="text-center"
            >
              <div className="aspect-[21/9] max-w-4xl mx-auto rounded-sm overflow-hidden mb-6"
                style={{ background: collections[activeCollection].grad }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div>
                    <h3 className="text-3xl font-light text-white tracking-wide mb-2">{collections[activeCollection].name}</h3>
                    <p className="text-sm text-white/60 tracking-widest uppercase">{collections[activeCollection].pieces} pieces</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ PRODUCTS GRID ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>BESTSELLERS</span>
            <h2 className={typo.sectionTitle}>Curated Selection</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((p) => (
              <motion.div
                key={p.name}
                variants={staggerItemSoft}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="aspect-[3/4] rounded-sm overflow-hidden mb-4 relative"
                  style={{ background: p.grad }}
                >
                  {/* Quick actions on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(255,255,255,0.9)" }}>
                        <svg className="w-5 h-5" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md" style={{ background: "rgba(255,255,255,0.9)" }}>
                        <svg className="w-5 h-5" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-light text-base mb-0.5">{p.name}</h3>
                    <p className="text-xs tracking-wide uppercase" style={{ color: c.muted }}>{p.category}</p>
                  </div>
                  <span className="text-base font-light" style={{ color: c.primary }}>{p.price}&nbsp;&euro;</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SIZE GUIDE ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.containerNarrow}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>FIT</span>
            <h2 className={typo.sectionTitle}>Size Guide</h2>
            <p className={`${typo.subtitle} mt-3`} style={{ color: c.muted }}>All measurements in centimeters</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <th className="py-3 px-4 text-left font-light tracking-wide uppercase text-xs" style={{ color: c.muted }}>Size</th>
                  <th className="py-3 px-4 text-left font-light tracking-wide uppercase text-xs" style={{ color: c.muted }}>Bust</th>
                  <th className="py-3 px-4 text-left font-light tracking-wide uppercase text-xs" style={{ color: c.muted }}>Waist</th>
                  <th className="py-3 px-4 text-left font-light tracking-wide uppercase text-xs" style={{ color: c.muted }}>Hips</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((s) => (
                  <tr key={s.label} style={{ borderBottom: `1px solid ${c.border}` }}>
                    <td className="py-3 px-4 font-medium" style={{ color: c.primary }}>{s.label}</td>
                    <td className="py-3 px-4" style={{ color: c.mutedDark }}>{s.bust}</td>
                    <td className="py-3 px-4" style={{ color: c.mutedDark }}>{s.waist}</td>
                    <td className="py-3 px-4" style={{ color: c.mutedDark }}>{s.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.containerNarrow}>
          <motion.div
            variants={blurFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>NEWSLETTER</span>
            <h2 className={`${typo.sectionTitle} mb-4`}>Stay in the Loop</h2>
            <p className={`${typo.subtitle} mb-8`} style={{ color: c.muted }}>
              Early access to new collections, exclusive offers, and editorial content.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 text-sm border outline-none transition-colors focus:border-purple-400"
                style={{ borderColor: c.border, background: c.card, color: c.dark }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 text-sm tracking-widest uppercase font-light text-white cursor-pointer"
                style={{ background: c.primary }}
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs mt-4" style={{ color: c.muted }}>
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-16" style={{ borderColor: c.border, background: c.dark }}>
        <div className={`${SECTION.container}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <span className="text-lg font-light tracking-widest uppercase text-white block mb-4">Maison Elegance</span>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Crafting timeless elegance since 2018. Paris &middot; Milan &middot; New York.
              </p>
            </div>
            {[
              { title: "Shop", links: ["New In", "Collections", "Bestsellers", "Sale"] },
              { title: "Help", links: ["Size Guide", "Shipping", "Returns", "Contact"] },
              { title: "About", links: ["Our Story", "Sustainability", "Press", "Careers"] },
            ].map((col) => (
              <div key={col.title}>
                <span className="text-xs tracking-widest uppercase text-white/60 block mb-4">{col.title}</span>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>&copy; 2026 Maison Elegance. All rights reserved.</p>
            <div className="flex gap-6">
              {["Instagram", "Pinterest", "TikTok"].map((l) => (
                <span key={l} className="text-xs cursor-pointer hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
