"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import {
  EASE_SMOOTH,
  SPRING_MEDIUM,
  SPRING_SNAPPY,
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
  TYPOGRAPHY,
} from "@/lib/template-design-system";

/* ================================================================
   PALETTE — Commerce local
   ================================================================ */
const C = {
  green: "#2D8B56",
  greenDark: "#1F6B40",
  orange: "#E8913A",
  bg: "#FAFAF5",
  white: "#FFFFFF",
  gray: "#F8FAFC",
  grayDark: "#F1F5F9",
  dark: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
};

/* ================================================================
   CATEGORIES DATA
   ================================================================ */
const categories = [
  { name: "Epicerie", grad: `linear-gradient(135deg, #FDE68A, #F59E0B)`, icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
  { name: "Vins", grad: `linear-gradient(135deg, #FCA5A5, #EF4444)`, icon: "M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" },
  { name: "Fromages", grad: `linear-gradient(135deg, #FDE68A, #D97706)`, icon: "M12 6v6l4 2M12 2a10 10 0 100 20 10 10 0 000-20z" },
  { name: "Charcuterie", grad: `linear-gradient(135deg, #FECACA, #DC2626)`, icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" },
  { name: "Bio", grad: `linear-gradient(135deg, #BBF7D0, #16A34A)`, icon: "M12 2C8 2 4 6 4 10c0 4 8 12 8 12s8-8 8-12c0-4-4-8-8-8z" },
  { name: "Coffrets", grad: `linear-gradient(135deg, #C4B5FD, #7C3AED)`, icon: "M12 8c-2-3-6-3-6 1 0 3 6 6 6 6s6-3 6-6c0-4-4-4-6-1z" },
];

/* ================================================================
   PRODUCTS DATA
   ================================================================ */
const produits = [
  { nom: "Huile d'olive premium", prix: "14.90", oldPrix: "18.90", grad: `linear-gradient(135deg, #FDE68A, #92400E)`, promo: true },
  { nom: "Coffret fromages AOP", prix: "27.50", oldPrix: "35.00", grad: `linear-gradient(135deg, #FDE68A, #D97706)`, promo: true },
  { nom: "Vin rouge Chateau Bellevue", prix: "16.50", oldPrix: "22.00", grad: `linear-gradient(135deg, #FCA5A5, #991B1B)`, promo: true },
  { nom: "Miel de lavande bio", prix: "12.90", oldPrix: null, grad: `linear-gradient(135deg, #FDE68A, #F59E0B)`, promo: false },
  { nom: "Confiture artisanale", prix: "8.50", oldPrix: null, grad: `linear-gradient(135deg, #FECACA, #EF4444)`, promo: false },
  { nom: "The bio collection", prix: "15.90", oldPrix: null, grad: `linear-gradient(135deg, #BBF7D0, #16A34A)`, promo: false },
];

const [activeFilter, setActiveFilterDefault] = [0, () => {}]; // Just for type

/* ================================================================
   CLICK & COLLECT STEPS
   ================================================================ */
const etapesCC = [
  { step: "1", title: "Commandez en ligne", desc: "Parcourez notre catalogue et remplissez votre panier en quelques clics.", icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" },
  { step: "2", title: "On prepare votre commande", desc: "Notre equipe selectionne vos produits avec soin et prepare votre panier.", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
  { step: "3", title: "Recuperez en boutique", desc: "Passez quand vous voulez aux horaires indiques, votre commande vous attend !", icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 013-2.599h12a2.999 2.999 0 013 2.599m-18 0V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v1.849" },
];

/* ================================================================
   FIDELITY DATA
   ================================================================ */
const paliers = [
  { points: "100 pts", reward: "5 euros de reduction", color: "#CD7F32" },
  { points: "250 pts", reward: "15 euros de reduction", color: "#C0C0C0" },
  { points: "500 pts", reward: "35 euros de reduction + cadeau", color: "#FFD700" },
];

/* ================================================================
   AVIS DATA
   ================================================================ */
const avis = [
  { nom: "Marine P.", texte: "Des produits d'une qualite exceptionnelle. Le click & collect est super pratique !", note: 5 },
  { nom: "Philippe R.", texte: "Ma boutique preferee pour les fromages et la charcuterie. L'equipe est toujours de bon conseil.", note: 5 },
  { nom: "Isabelle G.", texte: "Le programme fidelite est tres genereux. Je recommande les coffrets cadeaux !", note: 4 },
];

/* ================================================================
   SIGNATURE: product-tilt-3d
   Cards with 3D tilt on mouse movement
   ================================================================ */
function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, perspective: "1000px", transformStyle: "preserve-3d", rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
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
export default function MaBoutique() {
  const [filter, setFilter] = useState("Tous");
  const filters = ["Tous", "Promos", "Nouveautes"];

  const filteredProducts = filter === "Promos" ? produits.filter((p) => p.promo) : produits;

  return (
    <div className="relative" id="template-commerce">
      {/* NAVBAR BOTTOM */}
      <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg border-t py-3 px-4" style={{ background: "rgba(250,250,245,0.92)", borderColor: C.border }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-extrabold" style={{ color: C.dark }}>Ma </span>
            <span className="font-extrabold" style={{ color: C.green }}>Boutique</span>
            <span className="text-sm ml-2 hidden sm:inline" style={{ color: C.muted }}>Commerce de proximite</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-commerce" className="px-4 py-2 text-sm font-semibold rounded-xl text-white" style={{ background: C.green }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ==================== 1. HERO ==================== */}
        <section
          className="relative min-h-[80vh] flex items-center overflow-hidden"
          style={{ background: `radial-gradient(ellipse at 20% 80%, ${C.green}12, transparent 50%), radial-gradient(ellipse at 80% 20%, ${C.orange}08, transparent 50%), linear-gradient(180deg, ${C.white}, ${C.gray})` }}
        >
          <div className={`${SECTION.container} relative z-10`}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: `${C.green}12`, color: C.green }}
                variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="w-2 h-2 rounded-full" style={{ background: C.green }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                Ouvert maintenant &mdash; Click &amp; Collect disponible
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6"
                style={{ color: C.dark }}
                variants={delayedBlurFade(HERO_SEQUENCE.title)}
                initial="hidden"
                animate="visible"
              >
                Ma <span style={{ color: C.green }}>Boutique</span>
              </motion.h1>

              <motion.p
                className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto mb-8"
                style={{ color: C.muted }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                Votre epicerie fine en ligne &bull; Click &amp; Collect gratuit
              </motion.p>

              {/* Search bar */}
              <motion.div
                className="max-w-xl mx-auto relative"
                variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                initial="hidden"
                animate="visible"
              >
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border bg-white" style={{ borderColor: C.border }}>
                  <svg className="w-5 h-5 shrink-0" style={{ color: C.muted }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-base" style={{ color: C.muted }}>Rechercher un produit...</span>
                  <motion.button
                    className="ml-auto px-5 py-2 rounded-xl text-sm font-semibold text-white"
                    style={{ background: C.green }}
                    whileHover={{ scale: 1.05, boxShadow: `0 4px 15px ${C.green}40` }}
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING_SNAPPY}
                  >
                    Rechercher
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 2. CATEGORIES ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: C.green }}>Nos rayons</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: C.dark }}>Categories</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((c) => (
                <motion.div
                  key={c.name}
                  className="flex flex-col items-center gap-4 cursor-pointer"
                  variants={staggerItem}
                  whileHover={{ y: -6, scale: 1.05, transition: { ...SPRING_SNAPPY } }}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-md" style={{ background: c.grad }}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-bold" style={{ color: C.dark }}>{c.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. PRODUITS — SIGNATURE: product-tilt-3d ==================== */}
        <section className={SECTION.padding} style={{ background: C.gray }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGapCompact}`} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="rounded-2xl p-6 sm:p-8 mb-8 text-center" style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                <span className="text-sm font-semibold tracking-widest uppercase text-white/80">Offre de la semaine</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">Jusqu&apos;a -25% sur une selection</h2>
              </div>
            </motion.div>

            {/* Filter tabs */}
            <div className="flex justify-center gap-2 mb-10">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="relative px-6 py-2 text-sm font-semibold rounded-full transition-colors"
                  style={{ color: filter === f ? C.white : C.muted, background: filter === f ? C.green : "transparent" }}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer(0.08, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredProducts.map((p) => (
                <TiltCard
                  key={p.nom}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm cursor-pointer group"
                >
                  <motion.div variants={staggerItem}>
                    <div className="overflow-hidden relative">
                      <motion.div
                        className="aspect-[4/3] w-full"
                        style={{ background: p.grad }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      {p.promo && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#EF4444" }}>
                          PROMO
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold" style={{ color: C.dark }}>{p.nom}</h3>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-lg font-bold" style={{ color: C.green }}>{p.prix}&nbsp;&euro;</span>
                        {p.oldPrix && (
                          <span className="text-sm line-through" style={{ color: C.muted }}>{p.oldPrix}&nbsp;&euro;</span>
                        )}
                      </div>
                      <motion.button
                        className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{ background: C.green }}
                        whileHover={{ scale: 1.02, boxShadow: `0 4px 15px ${C.green}40` }}
                        whileTap={{ scale: 0.98 }}
                        transition={SPRING_SNAPPY}
                      >
                        Ajouter au panier
                      </motion.button>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 4. CLICK & COLLECT ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Simple et rapide</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: C.dark }}>Click &amp; Collect</h2>
              <p className="text-lg mt-4 max-w-xl mx-auto" style={{ color: C.muted }}>Commandez en ligne, recuperez en boutique. Gratuit, sans contact.</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {etapesCC.map((e) => (
                <motion.div
                  key={e.step}
                  className="text-center"
                  variants={staggerItem}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={SPRING_MEDIUM}
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white" style={{ background: `linear-gradient(135deg, ${C.orange}, #D4782E)` }}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={e.icon} />
                    </svg>
                  </div>
                  <div className="inline-flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold text-white mb-4" style={{ background: C.green }}>
                    {e.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: C.dark }}>{e.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: C.muted }}>{e.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==================== 5. FIDELITE ==================== */}
        <section className={SECTION.padding} style={{ background: C.gray }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: C.green }}>Programme fidelite</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: C.dark }}>1&nbsp;&euro; = 1&nbsp;point</h2>
                <p className="text-lg leading-relaxed mb-10" style={{ color: C.muted }}>
                  Cumulez des points a chaque achat et profitez de reductions exclusives. Plus vous achetez, plus vous etes recompense !
                </p>
                <div className="space-y-4">
                  {paliers.map((p) => (
                    <div key={p.points} className="flex items-center gap-4 p-4 rounded-xl bg-white">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: `${p.color}20` }}>
                        <svg className="w-6 h-6" style={{ color: p.color }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-bold" style={{ color: C.dark }}>{p.points}</span>
                        <span className="mx-2" style={{ color: C.muted }}>&mdash;</span>
                        <span style={{ color: C.muted }}>{p.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="aspect-[4/3] rounded-3xl p-8 flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/70 text-sm">Carte fidelite</p>
                      <p className="text-white text-2xl font-extrabold mt-1">Ma Boutique</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1 tracking-widest">POINTS CUMULES</p>
                    <p className="text-white text-4xl font-extrabold">
                      <Counter target={347} suffix=" pts" />
                    </p>
                    <div className="w-full h-2 rounded-full bg-white/20 mt-4">
                      <motion.div
                        className="h-full rounded-full bg-white/80"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "69%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <p className="text-white/60 text-xs mt-2">Plus que 153 pts pour 35&euro; de reduction !</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== 6. AVIS ==================== */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl font-extrabold" style={{ color: C.dark }}>Nos clients temoignent</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {avis.map((a) => (
                <motion.div
                  key={a.nom}
                  className="p-8 rounded-2xl bg-white"
                  style={{ border: `1px solid ${C.border}` }}
                  variants={staggerItem}
                  whileHover={{ y: -4, boxShadow: `0 16px 40px ${C.green}08` }}
                  transition={SPRING_MEDIUM}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} className="w-4 h-4" fill={idx < a.note ? C.orange : "#ddd"} viewBox="0 0 24 24">
                        <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6 italic" style={{ color: C.muted }}>&laquo;&nbsp;{a.texte}&nbsp;&raquo;</p>
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

        {/* ==================== 7. INFOS PRATIQUES ==================== */}
        <section className={SECTION.padding} style={{ background: C.gray }}>
          <div className={SECTION.container}>
            <motion.div className={`text-center ${SECTION.titleGap}`} variants={blurFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: C.orange }}>Rendez-nous visite</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold" style={{ color: C.dark }}>Infos pratiques</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div className="space-y-6" variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div className="p-6 rounded-2xl" style={{ background: C.white }} whileHover={{ scale: 1.02, y: -3 }} transition={SPRING_MEDIUM}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: C.dark }}>
                    <svg className="w-5 h-5" style={{ color: C.green }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Horaires d&apos;ouverture
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: C.muted }}>
                    <div className="flex justify-between"><span>Lundi - Vendredi</span><span className="font-medium" style={{ color: C.dark }}>8h30 - 19h30</span></div>
                    <div className="flex justify-between"><span>Samedi</span><span className="font-medium" style={{ color: C.dark }}>9h - 19h</span></div>
                    <div className="flex justify-between"><span>Dimanche</span><span className="font-medium" style={{ color: C.dark }}>9h - 13h</span></div>
                  </div>
                </motion.div>

                <motion.div className="p-6 rounded-2xl" style={{ background: C.white }} whileHover={{ scale: 1.02, y: -3 }} transition={SPRING_MEDIUM}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: C.dark }}>
                    <svg className="w-5 h-5" style={{ color: C.orange }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    Coordonnees
                  </h3>
                  <div className="space-y-2 text-sm" style={{ color: C.muted }}>
                    <p>24 avenue du Marche, 69003 Lyon</p>
                    <p>04 78 00 00 00</p>
                    <p>contact@maboutique.fr</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="aspect-[4/3] rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${C.gray}, ${C.grayDark}), repeating-linear-gradient(0deg, transparent, transparent 40px, ${C.green}08 40px, ${C.green}08 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, ${C.green}08 40px, ${C.green}08 41px)` }}
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto mb-2" style={{ color: C.green }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p className="text-sm font-medium" style={{ color: C.muted }}>Carte interactive</p>
                    <p className="text-xs mt-1" style={{ color: C.muted }}>24 avenue du Marche, 69003 Lyon</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================== FOOTER ==================== */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div>
                <h3 className="text-2xl font-extrabold mb-4 text-white">
                  Ma <span style={{ color: C.green }}>Boutique</span>
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Epicerie fine de proximite. Produits locaux, bio et artisanaux. Click &amp; Collect gratuit.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: C.green }}>Horaires</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>Lun - Ven : 8h30 - 19h30</li>
                  <li>Samedi : 9h - 19h</li>
                  <li>Dimanche : 9h - 13h</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm tracking-widest uppercase" style={{ color: C.orange }}>Contact</h4>
                <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <li>24 avenue du Marche, 69003 Lyon</li>
                  <li>04 78 00 00 00</li>
                  <li>contact@maboutique.fr</li>
                </ul>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
              &copy; 2025 Ma Boutique. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
