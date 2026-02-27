"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp, staggerContainer, staggerItem, staggerItemBounce,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_BACK, SPRING_BOUNCE,
  hoverLift, HERO_SEQUENCE, delayedFadeUp,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#E67E22", accent: "#1A1A1A", bg: "#FFFBF5", white: "#FFFFFF", muted: "#6B6B6B", dark: "#0F0F0F", green: "#2DC653" };

/* ── Progress Ring (Signature animation) ── */
function ProgressRing({ value, label, color = P.primary, size = 110 }: { value: number; label: string; color?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const r = (size - 12) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${color}15`} strokeWidth="10" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={inView ? { strokeDashoffset: offset } : {}} transition={{ duration: 1.5, delay: 0.3, ease: [...EASE_SMOOTH] as [number, number, number, number] }} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
        <text x={size / 2} y={size / 2} textAnchor="middle" dy="0.35em" fill={P.accent} fontSize="22" fontWeight="900">{value}%</text>
      </svg>
      <p className="text-sm font-bold mt-3" style={{ color: P.accent }}>{label}</p>
    </div>
  );
}

/* ── Counter ── */
function useCounter(target: number, inView: boolean) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (inView && !started.current) { started.current = true; let s = 0; const step = Math.max(1, Math.floor(target / 50)); const id = setInterval(() => { s += step; if (s >= target) { setVal(target); clearInterval(id); } else setVal(s); }, 30); }
  return val;
}
function Counter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const val = useCounter(target, inView);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/* ── Data ── */
const programmes = [
  { nom: "Fitness", duree: "12 semaines", freq: "4x / semaine", prix: "59", desc: "Programme complet avec nutrition, cardio et renforcement.", color: P.primary },
  { nom: "Nutrition", duree: "16 semaines", freq: "5x / semaine", prix: "69", desc: "Musculation ciblee, plan alimentaire et suivi de progression.", color: P.green },
  { nom: "Mental", duree: "8 semaines", freq: "3x / semaine", prix: "49", desc: "Yoga, stretching et relaxation pour un corps souple.", color: "#3498DB" },
];

const transformations = [
  { nom: "Thomas, 32 ans", stat: "-18 kg en 4 mois" },
  { nom: "Julie, 28 ans", stat: "+5 kg de muscle" },
  { nom: "Marc, 45 ans", stat: "-12 kg en 3 mois" },
  { nom: "Sarah, 35 ans", stat: "Remise en forme totale" },
];

const tarifs = [
  { nom: "Solo", prix: 49, features: ["1 seance individuelle / semaine", "Acces app mobile", "Programme personnalise", "Bilan mensuel"], populaire: false },
  { nom: "Duo", prix: 79, features: ["2 seances individuelles / semaine", "Acces cours collectifs", "Plan nutrition inclus", "Suivi hebdomadaire", "Acces espace detente"], populaire: true },
  { nom: "Premium", prix: 129, features: ["Seances illimitees", "Coaching nutrition avance", "Suivi quotidien WhatsApp", "Videos exercices personnalisees", "Acces VIP salle", "1 massage / mois offert"], populaire: false },
];

const planning = [
  { jour: "Lundi", seance: "CrossFit", heure: "7h / 12h / 18h30", intensite: "haute" },
  { jour: "Mardi", seance: "Yoga Flow", heure: "7h / 12h / 19h", intensite: "basse" },
  { jour: "Mercredi", seance: "HIIT", heure: "7h / 18h30", intensite: "haute" },
  { jour: "Jeudi", seance: "Musculation", heure: "7h / 12h / 18h30", intensite: "moyenne" },
  { jour: "Vendredi", seance: "Boxing", heure: "7h / 18h30", intensite: "haute" },
  { jour: "Samedi", seance: "Circuit Training", heure: "9h / 11h", intensite: "haute" },
  { jour: "Dimanche", seance: "Stretching", heure: "10h", intensite: "basse" },
];

const conseils = [
  { titre: "5 exercices sans materiel", desc: "Pas besoin de salle pour se muscler. Decouvrez nos 5 mouvements favoris.", cat: "Fitness" },
  { titre: "Nutrition : les 3 erreurs", desc: "Evitez ces pieges frequents qui sabotent votre progression.", cat: "Nutrition" },
  { titre: "Gerer son stress par le sport", desc: "Comment l'activite physique reguliere reduit l'anxiete.", cat: "Mental" },
];

/* ── Section ── */
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
export default function CoachEnergie() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative">
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: `${P.accent}F0`, borderColor: `${P.primary}30` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: P.primary }}>Coach Energie</span>
            <span className="text-xs hidden sm:inline text-white/50">Coach sportif</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg text-white/60 hover:text-white transition-colors">Retour</a>
            <a href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: P.accent }}>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: `${P.primary}12` }} />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: `${P.green}08` }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(${P.primary} 1px, transparent 1px), linear-gradient(90deg, ${P.primary} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

          <div className={SECTION.container + " relative z-10"}>
            <div className="text-center">
              <motion.div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8" style={{ background: `${P.primary}15`, border: `1px solid ${P.primary}25`, color: P.primary }} initial={{ opacity: 0, scale: 0.8 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: HERO_SEQUENCE.badge, ...SPRING_BOUNCE }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: P.primary }} />
                Coaching personnalise
              </motion.div>

              <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8" initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: DURATION.slow, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                <span style={{ color: P.white }}>COACH </span>
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${P.primary}, ${P.green})` }}>ENERGIE</span>
              </motion.h1>

              <motion.p className="text-xl sm:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.subtitle }}>
                Transformez votre corps, transformez votre vie. Coaching sportif personnalise pour atteindre vos objectifs.
              </motion.p>

              {/* Stats */}
              <motion.div className="flex flex-wrap justify-center gap-12 mb-12" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.stats }}>
                {[{ t: 500, s: "+", l: "Clients transformes" }, { t: 98, s: "%", l: "Satisfaction" }, { t: 8, s: " ans", l: "D'experience" }].map((stat) => (
                  <div key={stat.l}>
                    <div className="text-4xl sm:text-5xl font-black" style={{ color: P.white }}><Counter target={stat.t} suffix={stat.s} className="text-4xl sm:text-5xl font-black" /></div>
                    <div className="text-sm mt-1 text-white/40">{stat.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.cta }}>
                <motion.button whileHover={{ scale: 1.05, boxShadow: `0 8px 30px ${P.primary}40` }} whileTap={{ scale: 0.95 }} className="px-10 py-5 rounded-2xl text-lg font-bold shadow-xl cursor-pointer" style={{ background: P.primary, color: P.white }}>Commencer maintenant</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl text-lg font-bold cursor-pointer hover:bg-white/5 transition-colors">Decouvrir les programmes</motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── PROGRAMMES ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.primary }}>Programmes</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.accent }}>Choisissez votre voie</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.12, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programmes.map((prog) => (
              <motion.div key={prog.nom} variants={staggerItemBounce} whileHover={{ y: -8 }} className="rounded-3xl overflow-hidden" style={{ background: P.accent }}>
                <div className="h-3" style={{ background: prog.color }} />
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-3">{prog.nom}</h3>
                  <p className="text-white/50 mb-6">{prog.desc}</p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <svg className="w-4 h-4" style={{ color: prog.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {prog.duree}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <svg className="w-4 h-4" style={{ color: P.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                      {prog.freq}
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-3xl font-black" style={{ color: prog.color }}>{prog.prix}&euro;<span className="text-sm text-white/40 font-normal">/mois</span></span>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer" style={{ background: `${prog.color}20`, color: prog.color }}>S&apos;inscrire</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── TRANSFORMATIONS + RINGS (Signature) ─── */}
        <S bg={P.accent}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.primary }}>Resultats</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.white }}>Avant / Apres</h2>
          </motion.div>
          {/* Progress rings */}
          <motion.div variants={delayedFadeUp(0.2)} className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-16">
            <ProgressRing value={95} label="Objectifs atteints" color={P.primary} />
            <ProgressRing value={98} label="Satisfaction" color={P.green} />
            <ProgressRing value={88} label="Renouvellement" color="#3498DB" />
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.3)} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {transformations.map((t) => (
              <motion.div key={t.nom} variants={staggerItemBounce} className="relative group">
                <div className="grid grid-cols-2 gap-1 rounded-2xl overflow-hidden">
                  <div className="aspect-[3/4] flex items-end p-4" style={{ background: "linear-gradient(to br, rgba(255,255,255,0.1), rgba(255,255,255,0.03))" }}>
                    <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.5)" }}>Avant</span>
                  </div>
                  <div className="aspect-[3/4] flex items-end p-4" style={{ background: `linear-gradient(to br, ${P.green}30, ${P.green}10)` }}>
                    <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: `${P.green}15`, color: P.green }}>Apres</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white font-bold">{t.nom}</span>
                  <span className="text-sm font-bold px-3 py-1 rounded-full" style={{ background: `${P.green}15`, color: P.green }}>{t.stat}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── PLANNING ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.primary }}>Semaine type</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.accent }}>Planning</h2>
          </motion.div>
          <motion.div variants={delayedFadeUp(0.2)} className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-4 gap-3 text-sm font-bold pb-4 border-b-2" style={{ color: P.accent, borderColor: `${P.accent}10` }}>
                <span>Jour</span><span>Seance</span><span>Horaires</span><span>Intensite</span>
              </div>
              {planning.map((p, i) => (
                <motion.div key={p.jour} variants={staggerItem} className="grid grid-cols-4 gap-3 py-4 border-b items-center hover:rounded-lg transition-colors px-2" style={{ borderColor: `${P.accent}05` }} whileHover={{ background: `${P.primary}08` }}>
                  <span className="font-bold" style={{ color: P.accent }}>{p.jour}</span>
                  <span style={{ color: P.accent }}>{p.seance}</span>
                  <span className="text-sm" style={{ color: P.muted }}>{p.heure}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${p.intensite === "haute" ? "" : p.intensite === "moyenne" ? "" : ""}`} style={{ background: p.intensite === "haute" ? `${P.primary}12` : p.intensite === "moyenne" ? `${P.green}12` : "#3498DB12", color: p.intensite === "haute" ? P.primary : p.intensite === "moyenne" ? P.green : "#3498DB" }}>{p.intensite}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </S>

        {/* ─── TARIFS ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.primary }}>Offres</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.accent }}>Nos Tarifs</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.12, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tarifs.map((t) => (
              <motion.div key={t.nom} variants={staggerItemBounce} whileHover={{ y: -6 }} className={`rounded-3xl p-8 relative ${t.populaire ? "ring-2 shadow-2xl" : "border-2"}`} style={{ background: t.populaire ? P.accent : P.white, ...(t.populaire ? { ringColor: P.primary, boxShadow: `0 25px 50px ${P.primary}15` } : { borderColor: `${P.accent}10` }) }}>
                {t.populaire && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 text-sm font-bold rounded-full" style={{ background: P.primary, color: P.white }}>Populaire</div>}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-black mb-4 ${t.populaire ? "text-white" : ""}`} style={t.populaire ? {} : { color: P.accent }}>{t.nom}</h3>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-black" style={{ color: t.populaire ? P.primary : P.accent }}>{t.prix}&euro;</span>
                    <span className={`text-sm mb-2 ${t.populaire ? "text-white/40" : ""}`} style={t.populaire ? {} : { color: P.muted }}>/mois</span>
                  </div>
                </div>
                <div className="space-y-3 mb-8">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" style={{ color: P.green }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      <span className={`text-sm ${t.populaire ? "text-white/70" : ""}`} style={t.populaire ? {} : { color: P.muted }}>{f}</span>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full py-4 rounded-xl font-bold text-lg cursor-pointer" style={{ background: t.populaire ? P.primary : P.accent, color: P.white }}>
                  Choisir {t.nom}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── BLOG / CONSEILS ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.green }}>Blog</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.accent }}>Conseils & Articles</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {conseils.map((c) => (
              <motion.div key={c.titre} variants={staggerItemBounce} whileHover={{ y: -6 }} className="rounded-2xl overflow-hidden cursor-pointer group" style={{ border: `1px solid ${P.accent}10` }}>
                <div className="aspect-[16/9]" style={{ background: `linear-gradient(135deg, ${P.primary}20, ${P.accent}10)` }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: `${P.primary}15`, color: P.primary }}>{c.cat}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:underline" style={{ color: P.accent }}>{c.titre}</h3>
                  <p className="text-sm" style={{ color: P.muted }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── CTA MOTIVATION ─── */}
        <S bg={P.accent} className="!py-24 lg:!py-40">
          <motion.div variants={fadeUp} className="text-center">
            <div className="text-6xl mb-8" style={{ color: P.primary }}>&ldquo;</div>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl mx-auto">
              Le seul mauvais entrainement est celui que vous n&apos;avez pas fait.
            </blockquote>
            <p className="text-lg mt-8 text-white/40">- Coach Maxime, fondateur</p>
            <motion.button variants={delayedFadeUp(0.3)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-12 px-12 py-5 rounded-2xl text-xl font-bold shadow-xl cursor-pointer" style={{ backgroundImage: `linear-gradient(to right, ${P.primary}, ${P.green})`, color: P.white }}>
              Demarrez votre transformation
            </motion.button>
          </motion.div>
        </S>

        {/* ─── FOOTER ─── */}
        <footer className="py-16" style={{ background: P.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-2xl font-black mb-4" style={{ color: P.white }}>COACH ENERGIE</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>88 Boulevard du Sport<br />33000 Bordeaux<br />05 56 00 00 00</p>
              </div>
              <div><h4 className="font-bold mb-4" style={{ color: P.white }}>Horaires</h4><div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}><p>Lundi - Vendredi : 6h30 - 21h00</p><p>Samedi : 8h00 - 18h00</p><p>Dimanche : 9h00 - 13h00</p></div></div>
              <div><h4 className="font-bold mb-4" style={{ color: P.white }}>Reseaux</h4><div className="flex gap-4">{["Instagram", "YouTube", "TikTok"].map((rs) => <span key={rs} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.4)" }}>{rs}</span>)}</div></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
