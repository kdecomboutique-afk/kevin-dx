"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  fadeUp, blurFadeUp, staggerContainer, staggerItem, clipRevealUp, clipRevealLeft,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_EXPO, SPRING_MEDIUM,
  hoverLift, HERO_SEQUENCE, delayedFadeUp, lineRevealX,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#A0522D", accent: "#CD853F", bg: "#FBF6F0", dark: "#2D2016", muted: "#7A6B5A", cream: "#F5E6D3", creamDark: "#E8D5BD", vert: "#2D5016", vertLight: "#3A6B1E", white: "#FFFFFF" };

/* ── Data ── */
const boutique = [
  { name: "Bol ceramique", price: 35, grad: `linear-gradient(135deg, ${P.primary}, ${P.accent})` },
  { name: "Bougie artisanale", price: 22, grad: `linear-gradient(135deg, ${P.vert}, ${P.vertLight})` },
  { name: "Plateau bois d'olivier", price: 48, grad: `linear-gradient(135deg, ${P.accent}, ${P.vert})` },
  { name: "Savon naturel (lot de 3)", price: 18, grad: `linear-gradient(135deg, ${P.vertLight}, ${P.primary})` },
];

const processCreation = [
  { num: "01", title: "Choix des matieres", desc: "Selection de matieres premieres nobles, locales et eco-responsables.", icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" },
  { num: "02", title: "Faconnage a la main", desc: "Chaque piece est creee sans moule, tournee ou sculptee a la main.", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62" },
  { num: "03", title: "Sechage & cuisson", desc: "Processus lent et maitrise pour garantir la solidite et la couleur.", icon: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" },
  { num: "04", title: "Finition artisanale", desc: "Emaillage, patine ou cirage : chaque finition est unique.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" },
  { num: "05", title: "Emballage & envoi", desc: "Ecrin soigne, emballage eco-responsable, expedition en 3-5 jours.", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21" },
];

const guarantees = [
  { title: "Livraison soignee", desc: "Emballage eco, expedition sous 3-5 jours.", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" },
  { title: "Retours gratuits", desc: "30 jours pour changer d'avis.", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" },
  { title: "Paiement securise", desc: "CB, PayPal, virement 100% securise.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { title: "Emballage cadeau", desc: "Option cadeau avec message personnalise.", icon: "M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
];

/* ── Counter ── */
function useCounter(target: number, inView: boolean) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (inView && !started.current) {
    started.current = true;
    let s = 0; const step = Math.max(1, Math.floor(target / 50));
    const id = setInterval(() => { s += step; if (s >= target) { setVal(target); clearInterval(id); } else setVal(s); }, 30);
  }
  return val;
}
function Counter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const val = useCounter(target, inView);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/* ── Section ── */
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

/* ── Material Peel reveal variant (Signature) ── */
const materialPeel = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (i: number) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Main ── */
export default function AtelierCreatif() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.9)", borderColor: `${P.primary}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: P.dark }}>Atelier Creatif</span>
            <span className="text-xs hidden sm:inline" style={{ color: P.muted }}>Artisan createur</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-black/5" style={{ color: P.muted }}>Retour</a>
            <a href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: `radial-gradient(ellipse at 30% 80%, ${P.primary}20 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, ${P.vert}12 0%, transparent 50%), linear-gradient(180deg, ${P.bg} 0%, ${P.creamDark} 100%)` }}>
          {/* Texture pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A0522D' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3-2 3zM0 20h2v2H0v-2z'/%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className={SECTION.container + " relative z-10"}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: P.primary }} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.badge, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                Fait main en France
              </motion.p>
              <motion.h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6" style={{ color: P.dark }} initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: DURATION.slow, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                Atelier<br /><span style={{ color: P.primary }}>Creatif</span>
              </motion.h1>
              <motion.p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto mb-4" style={{ color: P.muted }} initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.subtitle }}>
                Creations artisanales &bull; Pieces uniques &bull; Faites main
              </motion.p>
              <motion.div className="flex flex-wrap justify-center gap-4 mt-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.cta, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${P.primary}40` }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg cursor-pointer" style={{ background: P.primary }}>
                  Voir la boutique
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-xl font-semibold border-2 cursor-pointer" style={{ borderColor: P.vert, color: P.vert }}>
                  Notre histoire
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── BOUTIQUE (Material peel signature) ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Boutique</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: P.dark }}>Nos creations</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boutique.map((p, i) => (
              <motion.div key={p.name} custom={i} variants={materialPeel} whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} transition={SPRING_MEDIUM} className="group rounded-2xl overflow-hidden cursor-pointer" style={{ background: P.cream }}>
                <div className="overflow-hidden relative">
                  <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6, ease: [...EASE_SMOOTH] as [number, number, number, number] }} className="aspect-square w-full" style={{ background: p.grad }} />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <svg className="w-5 h-5" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold" style={{ color: P.dark }}>{p.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold" style={{ color: P.primary }}>{p.price}&nbsp;&euro;</span>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 rounded-lg text-sm font-semibold text-white cursor-pointer" style={{ background: P.vert }}>Ajouter</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </S>

        {/* ─── NOTRE HISTOIRE ─── */}
        <S bg={P.cream}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={clipRevealUp} className="aspect-[4/5] rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.primary}30, ${P.vert}20, ${P.creamDark})` }} />
            <div>
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: P.primary }}>Notre histoire</motion.p>
              <motion.h2 variants={delayedFadeUp(0.1)} className="text-4xl sm:text-5xl font-extrabold mb-8" style={{ color: P.dark }}>
                La passion de creer,<br />l&apos;art du fait main
              </motion.h2>
              <motion.div variants={delayedFadeUp(0.2)} className="space-y-4 text-base leading-relaxed" style={{ color: P.muted }}>
                <p>Tout a commence dans un petit atelier du sud de la France, avec une envie simple : creer des objets beaux et utiles, avec des materiaux nobles et des savoir-faire ancestraux.</p>
                <p>Notre philosophie <strong style={{ color: P.dark }}>slow-made</strong> signifie que chaque piece prend le temps qu&apos;il faut. Pas de production de masse, pas de compromis.</p>
              </motion.div>
              <motion.div variants={delayedFadeUp(0.3)} className="grid grid-cols-3 gap-6 mt-10">
                {[{ t: 200, s: "+", l: "Creations" }, { t: 1500, s: "+", l: "Clients" }].map((c) => (
                  <div key={c.l} className="text-center" style={{ color: P.primary }}>
                    <Counter target={c.t} suffix={c.s} className="text-2xl font-extrabold" />
                    <div className="text-sm mt-1" style={{ color: P.muted }}>{c.l}</div>
                  </div>
                ))}
                <div className="text-center">
                  <div className="text-2xl font-extrabold" style={{ color: P.primary }}>4.9/5</div>
                  <div className="text-sm mt-1" style={{ color: P.muted }}>Avis</div>
                </div>
              </motion.div>
            </div>
          </div>
        </S>

        {/* ─── PROCESSUS CREATION ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.accent }}>Fabrication</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: P.dark }}>Le processus de creation</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processCreation.map((p) => (
              <motion.div key={p.num} variants={staggerItem} className="text-center p-6 rounded-xl" style={{ background: P.bg }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${P.primary}15`, color: P.primary }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                </div>
                <span className="text-xs font-bold" style={{ color: P.accent }}>{p.num}</span>
                <h3 className="text-base font-bold mt-1 mb-2" style={{ color: P.dark }}>{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: P.muted }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── CONFIANCE ─── */}
        <S bg={P.cream}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.vert }}>Tranquillite</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: P.dark }}>Acheter en confiance</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((g) => (
              <motion.div key={g.title} variants={staggerItem} {...hoverLift} className="bg-white rounded-2xl p-6 text-center shadow-sm cursor-pointer">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${P.vert}12`, color: P.vert }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={g.icon} /></svg>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: P.dark }}>{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: P.muted }}>{g.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── SUR MESURE ─── */}
        <S bg={P.white}>
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Sur mesure</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 mb-4" style={{ color: P.dark }}>Creez votre piece unique</h2>
              <p className="text-lg" style={{ color: P.muted }}>Decrivez votre envie, nous la faconnons pour vous.</p>
            </motion.div>
            <motion.div variants={delayedFadeUp(0.2)} className="rounded-2xl p-8 sm:p-10" style={{ background: P.bg }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[{ l: "Nom", p: "Votre nom" }, { l: "Email", p: "votre@email.com" }].map((f) => (
                  <div key={f.l}>
                    <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>{f.l}</label>
                    <input type="text" placeholder={f.p} className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none text-sm" style={{ borderColor: `${P.primary}30`, color: P.dark }} readOnly />
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Type de creation</label>
                <div className="w-full px-4 py-3 rounded-xl border text-sm" style={{ borderColor: `${P.primary}30`, color: P.muted, background: P.white }}>Bol / Vase / Bougie / Autre</div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Votre envie</label>
                <textarea rows={4} placeholder="Decrivez la piece souhaitee, les matieres, les couleurs..." className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none text-sm resize-none" style={{ borderColor: `${P.primary}30`, color: P.dark }} readOnly />
              </div>
              <motion.button whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${P.primary}40` }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl font-semibold text-white cursor-pointer" style={{ background: P.primary }}>
                Envoyer ma demande sur mesure
              </motion.button>
            </motion.div>
          </div>
        </S>

        {/* ─── VISITE ATELIER ─── */}
        <S bg={P.cream}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: P.primary }}>Rendez-nous visite</motion.p>
              <motion.h2 variants={delayedFadeUp(0.1)} className="text-3xl sm:text-4xl font-extrabold mb-8" style={{ color: P.dark }}>Visitez notre atelier</motion.h2>
              <motion.div variants={delayedFadeUp(0.2)} className="space-y-4" style={{ color: P.muted }}>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  <span>12 rue des Artisans, 13100 Aix-en-Provence</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div><p>Mardi - Samedi : 10h - 18h</p><p>Dimanche & Lundi : Ferme</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  <span>04 42 00 00 00</span>
                </div>
              </motion.div>
              <motion.button variants={delayedFadeUp(0.3)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-8 px-8 py-4 rounded-xl font-semibold text-white cursor-pointer" style={{ background: P.primary }}>
                Prendre rendez-vous
              </motion.button>
            </div>
            <motion.div variants={clipRevealLeft} className="aspect-[4/3] rounded-2xl" style={{ background: `linear-gradient(135deg, ${P.cream}, ${P.creamDark}), repeating-linear-gradient(0deg, transparent, transparent 40px, ${P.primary}08 40px, ${P.primary}08 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, ${P.primary}08 40px, ${P.primary}08 41px)` }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto mb-2" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  <p className="text-sm font-medium" style={{ color: P.muted }}>Carte interactive</p>
                </div>
              </div>
            </motion.div>
          </div>
        </S>
      </div>
    </div>
  );
}
