"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  fadeUp, blurFadeUp, staggerContainer, staggerItem, staggerItemSoft,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_EXPO, SPRING_MEDIUM, SPRING_SOFT,
  hoverLift, hoverRevealOverlay, HERO_SEQUENCE, delayedFadeUp, delayedBlurFade,
  clipRevealUp, lineRevealX,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#6B5B47", accent: "#C9A96E", bg: "#FAF7F2", dark: "#2D2D2D", darkLight: "#3D3D3D", muted: "#999999", light: "#CCCCCC", white: "#FFFFFF" };

/* ── Data ── */
const categories = ["Toutes", "Ceramique", "Bronze", "Techniques mixtes"] as const;
type Cat = (typeof categories)[number];

const creations = [
  { title: "Vase Aurore", medium: "Ceramique", cat: "Ceramique" as Cat, tall: true, grad: `linear-gradient(160deg, ${P.accent}, ${P.primary})` },
  { title: "Sculpture Ondine", medium: "Bronze patine", cat: "Bronze" as Cat, tall: false, grad: `linear-gradient(160deg, ${P.darkLight}, ${P.dark})` },
  { title: "Luminaire Cosmos", medium: "Laiton & verre", cat: "Techniques mixtes" as Cat, tall: false, grad: `linear-gradient(160deg, ${P.accent}CC, ${P.primary}CC)` },
  { title: "Tableau Relief", medium: "Techniques mixtes", cat: "Techniques mixtes" as Cat, tall: true, grad: `linear-gradient(160deg, ${P.dark}, ${P.accent}80)` },
  { title: "Coupe Horizon", medium: "Ceramique raku", cat: "Ceramique" as Cat, tall: false, grad: `linear-gradient(160deg, ${P.primary}CC, ${P.darkLight})` },
  { title: "Mobile Zephyr", medium: "Cuivre & fil", cat: "Bronze" as Cat, tall: true, grad: `linear-gradient(160deg, ${P.accent}, ${P.darkLight})` },
  { title: "Miroir Eclipse", medium: "Metal & verre", cat: "Techniques mixtes" as Cat, tall: false, grad: `linear-gradient(160deg, ${P.darkLight}, ${P.accent})` },
  { title: "Jardiniere Gaia", medium: "Terre cuite", cat: "Ceramique" as Cat, tall: false, grad: `linear-gradient(160deg, ${P.accent}CC, ${P.primary})` },
];

const processusArt = [
  { step: "Inspiration", desc: "Chaque oeuvre nait d'une emotion, d'une lumiere, d'un instant suspendu dans le temps.", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
  { step: "Creation", desc: "Les mains faconnent la matiere. Le geste est precis, repete, jusqu'a trouver la forme juste.", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { step: "Finition", desc: "Chaque detail est pense. La patine revele l'ame de la piece, unique et intemporelle.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
];

const expositions = [
  { date: "15 -- 28 Mars 2026", lieu: "Galerie Ephemere, Paris 3e", event: "Matieres & Lumieres" },
  { date: "10 -- 22 Avril 2026", lieu: "Maison de la Ceramique, Vallauris", event: "Terres d'Exception" },
  { date: "5 -- 18 Juin 2026", lieu: "Salon Revelations, Grand Palais", event: "Artisanat d'Art" },
];

/* ── Section helper ── */
function S({ children, bg = P.bg, className = "" }: { children: React.ReactNode; bg?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} className={`${SECTION.padding} ${className}`} style={{ background: bg }}>
      <div className={SECTION.container}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>{children}</motion.div>
      </div>
    </section>
  );
}

/* ── Main ── */
export default function LAtelier() {
  const [filter, setFilter] = useState<Cat>("Toutes");
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const filtered = filter === "Toutes" ? creations : creations.filter((c) => c.cat === filter);

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.9)", borderColor: `${P.primary}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: P.dark }}>L&apos;Atelier</span>
            <span className="text-xs hidden sm:inline" style={{ color: P.muted }}>Artisan d&apos;art</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-black/5" style={{ color: P.muted }}>Retour</a>
            <a href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.accent }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: P.dark }}>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[50vw] h-[60vh] opacity-20 blur-3xl" style={{ background: `radial-gradient(ellipse, ${P.accent}, transparent 70%)` }} />
          <div className={SECTION.container + " relative z-10"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: P.accent }} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.badge, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                  Artisan d&apos;art
                </motion.p>
                <motion.h1 className="text-6xl sm:text-7xl lg:text-8xl font-extralight leading-[0.95] tracking-tight mb-8" style={{ color: P.white }} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: DURATION.slow, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                  L&apos;Atelier
                </motion.h1>
                <motion.p className="text-xl leading-relaxed max-w-lg mb-10" style={{ color: P.muted }} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.subtitle, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                  Creations uniques, faconnees a la main. Chaque piece est une rencontre entre la matiere et le geste.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.cta, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                  <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-full font-medium tracking-wide cursor-pointer" style={{ background: P.accent, color: P.white }}>
                    Decouvrir les oeuvres
                  </motion.button>
                </motion.div>
              </div>
              {/* Hero visual */}
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: DURATION.dramatic, delay: HERO_SEQUENCE.visual, ease: [...EASE_OUT_EXPO] as [number, number, number, number] }} className="aspect-[3/4] rounded-3xl max-w-md mx-auto lg:ml-auto" style={{ background: `linear-gradient(160deg, ${P.accent}40, ${P.primary}80, ${P.dark})` }} />
            </div>
          </div>
        </section>

        {/* ─── CREATIONS / MASONRY (Signature) ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: P.accent }}>Portfolio</span>
            <h2 className="text-4xl sm:text-5xl font-extralight mt-3" style={{ color: P.dark }}>Creations</h2>
          </motion.div>
          {/* Filter tabs */}
          <motion.div variants={delayedFadeUp(0.2)} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className="px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer" style={{ background: filter === c ? P.accent : "transparent", color: filter === c ? P.white : P.muted, border: `1px solid ${filter === c ? P.accent : P.muted}40` }}>
                {c}
              </button>
            ))}
          </motion.div>
          {/* Masonry cascade */}
          <div className="columns-1 sm:columns-2 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((c, i) => (
                <motion.div key={c.title} layout initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5, delay: i * 0.06, ease: [...EASE_SMOOTH] as [number, number, number, number] }} className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group">
                  <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={SPRING_MEDIUM}>
                    <div className="overflow-hidden">
                      <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [...EASE_SMOOTH] as [number, number, number, number] }} className={`w-full ${c.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} style={{ background: c.grad }} />
                    </div>
                    <div className="p-5" style={{ background: P.white }}>
                      <h3 className="text-lg font-medium" style={{ color: P.dark }}>{c.title}</h3>
                      <p className="text-sm mt-1" style={{ color: P.muted }}>{c.medium}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </S>

        {/* ─── L'ARTISTE ─── */}
        <S bg={P.white}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={clipRevealUp} className="aspect-[4/5] rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.dark}20, ${P.accent}30, ${P.bg})` }} />
            <div>
              <motion.p variants={fadeUp} className="text-sm tracking-[0.3em] uppercase mb-4" style={{ color: P.accent }}>L&apos;artiste</motion.p>
              <motion.h2 variants={delayedFadeUp(0.1)} className="text-4xl sm:text-5xl font-extralight mb-8" style={{ color: P.dark }}>
                Une passion<br />devenue vocation
              </motion.h2>
              <motion.p variants={delayedFadeUp(0.2)} className="text-base leading-relaxed mb-4" style={{ color: P.muted }}>
                Forme aux Beaux-Arts de Paris et aux ateliers de ceramique de Vallauris, je travaille la matiere depuis plus de 15 ans. Mon atelier, installe dans une ancienne forge, est un lieu de creation ou le temps suspend son vol.
              </motion.p>
              <motion.p variants={delayedFadeUp(0.3)} className="text-base leading-relaxed" style={{ color: P.muted }}>
                Mes oeuvres puisent leur inspiration dans les formes organiques de la nature, les textures du temps qui passe et la lumiere changeante des saisons.
              </motion.p>
              <motion.div variants={delayedFadeUp(0.4)} className="mt-8 flex flex-wrap gap-3">
                {["Ceramique", "Bronze", "Techniques mixtes", "Raku"].map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: `${P.accent}15`, color: P.accent }}>{t}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </S>

        {/* ─── PROCESSUS ─── */}
        <S bg={P.dark}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: P.accent }}>Demarche</span>
            <h2 className="text-4xl sm:text-5xl font-extralight mt-3" style={{ color: P.white }}>Le processus creatif</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.15, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {processusArt.map((p) => (
              <motion.div key={p.step} variants={staggerItemSoft} className="text-center" {...hoverLift}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: `${P.accent}18`, color: P.accent }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                </div>
                <h3 className="text-2xl font-light mb-4" style={{ color: P.white }}>{p.step}</h3>
                <p className="text-base leading-relaxed" style={{ color: P.muted }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── EXPOSITIONS ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: P.accent }}>Agenda</span>
            <h2 className="text-4xl sm:text-5xl font-extralight mt-3" style={{ color: P.dark }}>Prochaines expositions</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.12, 0.2)} className="max-w-3xl mx-auto space-y-6">
            {expositions.map((e) => (
              <motion.div key={e.event} variants={staggerItemSoft} whileHover={{ x: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }} transition={SPRING_MEDIUM} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-white cursor-pointer">
                <div className="text-sm font-medium tracking-wide whitespace-nowrap shrink-0" style={{ color: P.accent }}>{e.date}</div>
                <div className="hidden sm:block w-px h-10" style={{ background: `${P.dark}15` }} />
                <div>
                  <h3 className="text-lg font-medium" style={{ color: P.dark }}>{e.event}</h3>
                  <p className="text-sm mt-1" style={{ color: P.muted }}>{e.lieu}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── SUR MESURE ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: P.accent }}>Commande</span>
            <h2 className="text-4xl sm:text-5xl font-extralight mt-3" style={{ color: P.dark }}>Sur mesure</h2>
            <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: P.muted }}>Chaque creation peut etre adaptee ou concue specialement pour vous. Decrivez votre envie.</p>
          </motion.div>
          <motion.div variants={delayedFadeUp(0.2)} className="max-w-2xl mx-auto rounded-2xl p-8 sm:p-10" style={{ background: P.bg }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {[{ l: "Nom", p: "Votre nom" }, { l: "Email", p: "votre@email.com" }].map((f) => (
                <div key={f.l}>
                  <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>{f.l}</label>
                  <input type="text" placeholder={f.p} className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none text-sm" style={{ borderColor: `${P.accent}30`, color: P.dark }} readOnly />
                </div>
              ))}
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Objet</label>
              <div className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: `${P.accent}30`, color: P.muted, background: P.white }}>Commande sur mesure</div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Message</label>
              <textarea rows={4} placeholder="Decrivez votre demande..." className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none text-sm resize-none" style={{ borderColor: `${P.accent}30`, color: P.dark }} readOnly />
            </div>
            <motion.button whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl font-medium tracking-wide cursor-pointer" style={{ background: P.accent, color: P.white }}>
              Envoyer
            </motion.button>
          </motion.div>
        </S>

        {/* ─── CONTACT ─── */}
        <S bg={P.dark}>
          <motion.div variants={fadeUp} className="text-center">
            <span className="text-sm tracking-[0.3em] uppercase" style={{ color: P.accent }}>Contact</span>
            <h2 className="text-4xl sm:text-5xl font-extralight mt-3 mb-4" style={{ color: P.white }}>Entrons en contact</h2>
            <p className="text-base mb-8" style={{ color: P.muted }}>Visite d&apos;atelier, commande ou question sur une oeuvre.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm" style={{ color: P.light }}>
              <span>04 90 00 00 00</span>
              <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: P.accent }} />
              <span>atelier@latelier-art.fr</span>
              <span className="hidden sm:block w-1 h-1 rounded-full" style={{ background: P.accent }} />
              <span>Provence</span>
            </div>
          </motion.div>
        </S>
      </div>
    </div>
  );
}
