"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  fadeUp, staggerContainer, staggerItem, staggerItemBounce,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_EXPO, EASE_OUT_BACK, SPRING_BOUNCE,
  hoverLift, HERO_SEQUENCE, delayedFadeUp, lineRevealX,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#1B2631", accent: "#E67E22", bg: "#F4F6F8", steel: "#2C3E50", concrete: "#ECF0F1", white: "#FFFFFF", text: "#1B2631", muted: "#5D6D7E", success: "#27AE60" };

/* ── Icon helper ── */
const Ic = ({ d, size = "w-7 h-7", sw = 1.5 }: { d: string; size?: string; sw?: number }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={sw}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
);

/* ── Counter ── */
function useCounter(target: number, inView: boolean) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (inView && !started.current) { started.current = true; let s = 0; const step = Math.max(1, Math.floor(target / 60)); const id = setInterval(() => { s += step; if (s >= target) { setVal(target); clearInterval(id); } else setVal(s); }, 25); }
  return val;
}
function Counter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const val = useCounter(target, inView);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/* ── Data ── */
const metiers = [
  { titre: "Construction neuve", desc: "Maisons individuelles, villas contemporaines et locaux professionnels.", icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
  { titre: "Toiture & Couverture", desc: "Charpente traditionnelle, couverture tuiles ou ardoises, zinguerie.", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m3-6h.75m-.75 3h.75" },
  { titre: "Renovation complete", desc: "Renovation interieure et exterieure, mise aux normes.", icon: "M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" },
  { titre: "Isolation thermique", desc: "ITE, combles, planchers. Solutions RGE, eligibles MaPrimeRenov.", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" },
  { titre: "Extension & Surelevation", desc: "Agrandissement, veranda, garage, etage supplementaire.", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
  { titre: "Piscine & Amenagement", desc: "Piscine beton, terrasses, amenagements exterieurs.", icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" },
];

const filterCategories = ["Tous", "Toiture", "Renovation", "Extension", "Neuf"] as const;
type FilterCat = (typeof filterCategories)[number];

const realisations = [
  { titre: "Villa contemporaine 180m2", type: "Neuf" as FilterCat, ville: "Nimes (30)", gradient: `linear-gradient(135deg, ${P.accent} 0%, ${P.primary} 100%)` },
  { titre: "Renovation mas provencal", type: "Renovation" as FilterCat, ville: "Uzes (30)", gradient: `linear-gradient(135deg, ${P.steel} 0%, ${P.accent} 100%)` },
  { titre: "Refection toiture 350m2", type: "Toiture" as FilterCat, ville: "Avignon (84)", gradient: `linear-gradient(135deg, ${P.primary} 0%, ${P.steel} 100%)` },
  { titre: "Extension maison de ville", type: "Extension" as FilterCat, ville: "Montpellier (34)", gradient: `linear-gradient(135deg, ${P.accent}CC 0%, ${P.primary} 100%)` },
];

const etapes = [
  { num: 1, titre: "Premier contact", desc: "Echangeons par telephone ou email. Premiere estimation gratuite.", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372" },
  { num: 2, titre: "Visite technique", desc: "Deplacement gratuit sur site. Releves, photos, analyse technique.", icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" },
  { num: 3, titre: "Devis detaille", desc: "Devis chiffre poste par poste, planning previsionnel.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" },
  { num: 4, titre: "Travaux", desc: "Execution par nos equipes qualifiees. Suivi hebdomadaire.", icon: "M11.42 15.17l-5.384-3.19A2.625 2.625 0 016 9.355v-1.48" },
  { num: 5, titre: "Reception", desc: "PV de conformite, remise des cles. Garantie decennale activee.", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21" },
];

const certifications = [
  { nom: "Decennale", desc: "Assurance responsabilite civile decennale couvrant tous vos travaux pendant 10 ans.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622" },
  { nom: "RGE", desc: "Reconnu Garant de l'Environnement. Eligible aux aides MaPrimeRenov.", icon: "M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348" },
  { nom: "Qualibat", desc: "Qualification professionnelle attestant de nos competences techniques.", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602" },
  { nom: "FFBTP", desc: "Membre Federation Francaise du Batiment. Engagement qualite.", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21" },
];

const temoignages = [
  { texte: "Travail remarquable sur notre villa. Equipe ponctuelle, chantier propre, finitions impeccables.", nom: "Jean-Pierre D.", ville: "Nimes", note: 5 },
  { texte: "Renovation complete de notre mas. Ils ont su preserver le charme de la pierre tout en apportant le confort moderne.", nom: "Marie-Claire F.", ville: "Uzes", note: 5 },
  { texte: "Notre toiture fuyait depuis des mois. Intervention rapide, diagnostic precis, travaux en 3 jours.", nom: "Patrick M.", ville: "Avignon", note: 5 },
];

/* ── Blueprint grid draw signature variant ── */
const blueprintDraw = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleX: 1, opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ── Section helper ── */
function S({ children, bg = P.bg, className = "" }: { children: React.ReactNode; bg?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} className={`${SECTION.padding} ${className}`} style={{ background: bg }}>
      <div className={SECTION.container}><motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>{children}</motion.div></div>
    </section>
  );
}

/* ── Main ── */
export default function BatisseurPro() {
  const [activeFilter, setActiveFilter] = useState<FilterCat>("Tous");
  const [budgetValue, setBudgetValue] = useState(25);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const filteredRealisations = activeFilter === "Tous" ? realisations : realisations.filter((r) => r.type === activeFilter);
  const budgetLabels = ["5K", "10K", "20K", "50K", "100K+"];
  const budgetDisplay = budgetLabels[Math.min(Math.floor(budgetValue / 25), 4)] || "100K+";

  return (
    <div className="relative" id="template-btp">
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.92)", borderColor: P.concrete }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: P.accent }}><Ic d="M2.25 21h19.5m-18-18v18m10.5-18v18" size="w-4 h-4" sw={2} /></div>
            <span className="font-bold text-sm sm:text-base" style={{ color: P.primary }}>Batisseur Pro</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-black/5" style={{ color: P.muted }}>Retour</a>
            <a href="/devis?pack=template-btp" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.accent }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.primary} 0%, ${P.steel} 60%, ${P.primary} 100%)` }}>
          {/* Blueprint grid lines (Signature) */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div key={`h-${i}`} custom={i} variants={blueprintDraw} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="absolute h-px origin-left" style={{ top: `${12 + i * 12}%`, left: 0, right: 0, background: `${P.accent}08` }} />
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.div key={`v-${i}`} custom={i + 3} initial={{ scaleY: 0, opacity: 0 }} animate={heroInView ? { scaleY: 1, opacity: 1 } : {}} transition={{ duration: 0.8, delay: (i + 3) * 0.1, ease: [...EASE_SMOOTH] as [number, number, number, number] }} className="absolute w-px origin-top" style={{ left: `${12 + i * 12}%`, top: 0, bottom: 0, background: `${P.accent}08` }} />
            ))}
          </div>
          {/* Triangles decoratifs */}
          <div className="absolute top-20 right-10 w-72 h-72 md:w-[400px] md:h-[400px] opacity-[0.06] rotate-12" style={{ background: `linear-gradient(135deg, ${P.accent}, transparent)`, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />

          <div className={SECTION.container + " relative z-10"}>
            {/* Stats top */}
            <motion.div className="flex flex-wrap justify-center lg:justify-end gap-6 sm:gap-10 mb-12" initial={{ opacity: 0, y: -20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
              {[{ t: 15, s: "+", l: "ans d'experience" }, { t: 350, s: "+", l: "chantiers livres" }, { t: 100, s: "%", l: "assure & garanti" }].map((stat) => (
                <div key={stat.l} className="text-center">
                  <div style={{ color: P.accent }}><Counter target={stat.t} suffix={stat.s} className="text-2xl sm:text-3xl md:text-4xl font-black" /></div>
                  <p className="text-xs sm:text-sm font-medium uppercase tracking-wider mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.l}</p>
                </div>
              ))}
            </motion.div>

            <div className="max-w-4xl">
              <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: `${P.accent}15`, border: `1px solid ${P.accent}30` }} initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: HERO_SEQUENCE.badge }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: P.accent }} />
                <span className="text-sm font-medium" style={{ color: P.accent }}>Devis gratuit sous 48h</span>
              </motion.div>

              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6" initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.7, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                <span style={{ color: P.white }}>Construisons</span><br /><span style={{ color: P.white }}>ensemble </span><span style={{ color: P.accent }}>votre projet</span>
              </motion.h1>

              <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-10" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: HERO_SEQUENCE.subtitle }}>
                {["Toiture", "Renovation", "Extension", "Neuf", "Isolation"].map((chip) => (
                  <span key={chip} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>{chip}</span>
                ))}
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: HERO_SEQUENCE.cta }}>
                <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.97 }} className="px-8 py-4 text-sm tracking-wider uppercase font-bold rounded-xl cursor-pointer" style={{ background: P.accent, color: P.white }}>Demander un devis gratuit</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 text-sm tracking-wider uppercase font-bold rounded-xl border-2 cursor-pointer" style={{ borderColor: "rgba(255,255,255,0.25)", color: P.white }}>Voir nos realisations</motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── METIERS ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Nos expertises</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" style={{ color: P.text }}>Nos Metiers</h2>
            <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: P.accent }} />
          </motion.div>
          <motion.div variants={staggerContainer(0.08, 0.2)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {metiers.map((m) => (
              <motion.div key={m.titre} variants={staggerItemBounce} whileHover={{ y: -4, borderColor: P.accent }} className="group relative p-8 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden" style={{ borderColor: P.concrete, background: P.white }}>
                <div className="absolute left-0 top-0 bottom-0 w-1 transition-all opacity-0 group-hover:opacity-100" style={{ background: P.accent }} />
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: `${P.accent}12`, color: P.accent }}><Ic d={m.icon} /></div>
                <h3 className="text-xl font-bold mb-3" style={{ color: P.text }}>{m.titre}</h3>
                <p className="text-sm leading-relaxed" style={{ color: P.muted }}>{m.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── REALISATIONS ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4" style={{ color: P.text }}>Nos Realisations</h2>
          </motion.div>
          <motion.div variants={delayedFadeUp(0.2)} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {filterCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer" style={{ background: activeFilter === cat ? P.accent : P.white, color: activeFilter === cat ? P.white : P.muted, border: `2px solid ${activeFilter === cat ? P.accent : P.concrete}`, boxShadow: activeFilter === cat ? `0 4px 14px ${P.accent}40` : "none" }}>{cat}</button>
            ))}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredRealisations.map((p) => (
                <motion.div key={p.titre} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, ease: [...EASE_OUT_BACK] as [number, number, number, number] }} className="group rounded-2xl overflow-hidden cursor-pointer" style={{ border: `1px solid ${P.concrete}` }}>
                  <div className="relative aspect-[16/10]" style={{ background: p.gradient }}>
                    <div className="absolute top-4 left-4"><span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: P.accent, color: P.white }}>{p.type}</span></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(27,38,49,0.85)" }}>
                      <span className="text-sm font-bold" style={{ color: P.accent }}>Voir le detail</span>
                    </div>
                  </div>
                  <div className="p-5" style={{ background: P.white }}>
                    <h3 className="font-bold text-lg mb-1" style={{ color: P.text }}>{p.titre}</h3>
                    <p className="text-sm flex items-center gap-1" style={{ color: P.muted }}><Ic d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" size="w-4 h-4" /> {p.ville}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </S>

        {/* ─── PROCESSUS ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Notre methode</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" style={{ color: P.text }}>De votre appel a la remise des cles</h2>
          </motion.div>
          {/* Timeline */}
          <div className="relative pl-12 sm:pl-16 max-w-2xl mx-auto">
            <motion.div variants={lineRevealX} className="absolute left-5 sm:left-7 top-0 bottom-0 w-[3px] rounded-full origin-top" style={{ background: `${P.accent}20` }} />
            <motion.div variants={staggerContainer(0.15, 0.3)}>
              {etapes.map((e) => (
                <motion.div key={e.num} variants={staggerItemBounce} className="relative mb-12 last:mb-0">
                  <div className="absolute -left-12 sm:-left-16 top-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg z-10" style={{ background: P.accent, boxShadow: `0 4px 15px ${P.accent}40` }}>
                    <span className="text-sm sm:text-lg font-black" style={{ color: P.white }}>{e.num}</span>
                  </div>
                  <div className="p-6 rounded-2xl" style={{ background: P.bg, border: `1px solid ${P.concrete}` }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: P.text }}>{e.titre}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: P.muted }}>{e.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </S>

        {/* ─── CERTIFICATIONS ─── */}
        <S bg={P.primary}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Garanties</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" style={{ color: P.white }}>Nos Certifications</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((c) => (
              <motion.div key={c.nom} variants={staggerItemBounce} whileHover={{ scale: 1.03, borderColor: `${P.accent}50` }} className="text-center p-8 rounded-2xl backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{ background: `${P.accent}18`, color: P.accent }}><Ic d={c.icon} size="w-8 h-8" /></div>
                <h3 className="text-xl font-bold mb-2" style={{ color: P.accent }}>{c.nom}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── DEVIS ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Estimation rapide</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" style={{ color: P.text }}>Estimez votre projet</h2>
          </motion.div>
          <motion.div variants={delayedFadeUp(0.2)} className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 shadow-xl" style={{ background: P.white, border: `1px solid ${P.concrete}` }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-5">
                <h3 className="text-lg font-bold" style={{ color: P.text }}>Votre projet</h3>
                {[{ l: "Type de travaux", v: "Construction neuve" }, { l: "Surface estimee (m2)", v: "150" }, { l: "Ville du chantier", v: "Nimes (30)" }].map((f) => (
                  <div key={f.l}><label className="block text-sm font-semibold mb-2" style={{ color: P.text }}>{f.l}</label><div className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: P.bg, border: `2px solid ${P.concrete}`, color: P.muted }}>{f.v}</div></div>
                ))}
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: P.text }}>Budget estime : <span style={{ color: P.accent }}>{budgetDisplay}</span></label>
                  <input type="range" min="0" max="100" value={budgetValue} onChange={(e) => setBudgetValue(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${P.accent} 0%, ${P.accent} ${budgetValue}%, ${P.concrete} ${budgetValue}%, ${P.concrete} 100%)`, accentColor: P.accent }} />
                </div>
              </div>
              <div className="space-y-5">
                <h3 className="text-lg font-bold" style={{ color: P.text }}>Vos coordonnees</h3>
                {[{ l: "Nom complet", v: "Votre nom" }, { l: "Telephone", v: "06 XX XX XX XX" }, { l: "Email", v: "votre@email.fr" }].map((f) => (
                  <div key={f.l}><label className="block text-sm font-semibold mb-2" style={{ color: P.text }}>{f.l}</label><div className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: P.bg, border: `2px solid ${P.concrete}`, color: `${P.muted}80` }}>{f.v}</div></div>
                ))}
                <div><label className="block text-sm font-semibold mb-2" style={{ color: P.text }}>Message</label><div className="w-full px-4 py-3 rounded-xl text-sm min-h-[80px]" style={{ background: P.bg, border: `2px solid ${P.concrete}`, color: `${P.muted}80` }}>Decrivez votre projet...</div></div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.98 }} className="w-full mt-8 py-4 text-sm tracking-wider uppercase font-bold rounded-xl cursor-pointer" style={{ background: P.accent, color: P.white }}>Recevoir mon devis gratuit</motion.button>
          </motion.div>
        </S>

        {/* ─── TEMOIGNAGES ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm tracking-[0.3em] uppercase font-semibold" style={{ color: P.accent }}>Ils nous font confiance</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3" style={{ color: P.text }}>Temoignages Clients</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {temoignages.map((t) => (
              <motion.div key={t.nom} variants={staggerItemBounce} className="p-8 rounded-2xl" style={{ background: P.white, borderTop: `3px solid ${P.accent}` }}>
                <div className="flex gap-0.5 mb-4">{Array.from({ length: t.note }).map((_, i) => <svg key={i} className="w-4 h-4" style={{ color: P.accent }} fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>)}</div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: P.muted }}>{t.texte}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${P.accent}15`, color: P.accent }}>{t.nom.split(" ").map((n) => n[0]).join("")}</div>
                  <div><p className="text-sm font-bold" style={{ color: P.text }}>{t.nom}</p><p className="text-xs" style={{ color: P.muted }}>{t.ville}</p></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── FOOTER ─── */}
        <footer className="py-16" style={{ background: P.primary, borderTop: `3px solid ${P.accent}` }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: P.accent }}><Ic d="M2.25 21h19.5m-18-18v18m10.5-18v18" size="w-5 h-5" sw={2} /></div>
                  <span className="text-xl font-bold" style={{ color: P.white }}>Batisseur Pro</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>Entreprise tous corps d&apos;etat. Construction, renovation dans le Gard et departements limitrophes.</p>
              </div>
              <div><h4 className="font-semibold mb-4" style={{ color: P.white }}>Services</h4><ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{["Construction", "Renovation", "Toiture", "Extension", "Isolation"].map((s) => <li key={s}>{s}</li>)}</ul></div>
              <div><h4 className="font-semibold mb-4" style={{ color: P.white }}>Contact</h4><div className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}><p>04 66 XX XX XX</p><p>contact@batisseur-pro.fr</p><p>Zone Artisanale, 30000 Nimes</p></div></div>
            </div>
            <div className="border-t pt-8 text-center text-sm" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>&copy; 2025 Batisseur Pro -- Template par Kevin DX</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
