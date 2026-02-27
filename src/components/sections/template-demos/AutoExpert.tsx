"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  fadeUp, staggerContainer, staggerItem, staggerItemBounce,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_BACK, SPRING_BOUNCE,
  hoverLift, HERO_SEQUENCE, delayedFadeUp,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#2C3E50", accent: "#E74C3C", bg: "#F2F4F5", white: "#FFFFFF", muted: "#7F8C8D", dark: "#1A252F", yellow: "#F1C40F" };

/* ── Gauge SVG (Signature animation) ── */
function Gauge({ value, label, color = P.accent }: { value: number; label: string; color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke={`${P.primary}15`} strokeWidth="8" />
        <motion.circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} initial={{ strokeDashoffset: circumference }} animate={inView ? { strokeDashoffset: offset } : {}} transition={{ duration: 1.5, delay: 0.3, ease: [...EASE_SMOOTH] as [number, number, number, number] }} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
        <text x="50" y="50" textAnchor="middle" dy="0.35em" fill={P.primary} fontSize="18" fontWeight="800">{value}%</text>
      </svg>
      <p className="text-sm font-bold mt-2" style={{ color: P.primary }}>{label}</p>
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
const services = [
  { nom: "Mecanique", desc: "Revision, vidange, distribution, embrayage, freins et toutes reparations mecaniques.", tarif: "A partir de 89 EUR", icon: "M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.18l.72-.72a2.25 2.25 0 013.18 0l5.1 5.1m-6.9 6.9l5.1 5.1a2.25 2.25 0 003.18 0l.72-.72a2.25 2.25 0 000-3.18l-5.1-5.1" },
  { nom: "Carrosserie", desc: "Reparation de bosses, peinture, debosselage sans peinture, remplacement pieces.", tarif: "Sur devis", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245" },
  { nom: "Diagnostic", desc: "Diagnostic electronique toutes marques, lecture codes defaut, mise a jour calculateurs.", tarif: "49 EUR", icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25" },
  { nom: "Pneumatiques", desc: "Montage, equilibrage, permutation, reparation de crevaison, stockage pneus.", tarif: "A partir de 15 EUR/pneu", icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { nom: "Climatisation", desc: "Recharge de climatisation, detection de fuites, remplacement compresseur.", tarif: "A partir de 69 EUR", icon: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3" },
  { nom: "Controle technique", desc: "Controle technique obligatoire, contre-visite, preparation au controle.", tarif: "79 EUR", icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21" },
];

const horaires = [
  { jour: "Lundi", h: "8h00 - 18h30", rdv: false },
  { jour: "Mardi", h: "8h00 - 18h30", rdv: false },
  { jour: "Mercredi", h: "8h00 - 18h30", rdv: false },
  { jour: "Jeudi", h: "8h00 - 18h30", rdv: false },
  { jour: "Vendredi", h: "8h00 - 18h30", rdv: false },
  { jour: "Samedi", h: "8h30 - 13h00", rdv: true },
  { jour: "Dimanche", h: "Ferme", rdv: false },
];

const avis = [
  { nom: "Pierre L.", note: 5, texte: "Excellent garage ! Reparation rapide de mon embrayage, prix tres correct. Equipe professionnelle et honnete.", reponse: "Merci Pierre ! Ravi que votre embrayage tourne comme neuf." },
  { nom: "Stephanie M.", note: 5, texte: "Je viens ici depuis 5 ans pour l'entretien de ma voiture. Toujours impecable, les conseils sont clairs.", reponse: "Merci pour votre fidelite Stephanie !" },
  { nom: "Karim B.", note: 4, texte: "Diagnostic rapide et precis. Mon probleme de climatisation a ete resolu en moins de 2h.", reponse: "Merci Karim ! N'hesitez pas a revenir pour la revision." },
];

const garanties = ["Agree toutes assurances", "Toutes marques", "Devis gratuit", "Garantie pieces 2 ans", "Vehicule de pret", "Paiement 3x sans frais"];

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

/* ── Stars ── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">{[...Array(5)].map((_, i) => (
      <svg key={i} className={`w-4 h-4 ${i < count ? "text-[#FFC107]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
    ))}</div>
  );
}

/* ── Main ── */
export default function AutoExpert() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative">
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.92)", borderColor: `${P.primary}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold" style={{ color: P.accent }}>Auto Expert</span>
            <span className="text-xs hidden sm:inline" style={{ color: P.muted }}>Garage automobile</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-black/5" style={{ color: P.muted }}>Retour</a>
            <a href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.accent }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${P.primary} 0%, ${P.dark} 100%)` }}>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${P.accent}, ${P.yellow}, ${P.accent})` }} />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: `${P.accent}10` }} />

          <div className={SECTION.container + " relative z-10"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div className="flex flex-wrap gap-3 mb-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.badge }}>
                  {["Agree", "Toutes marques", "Devis gratuit"].map((b) => (
                    <span key={b} className="px-4 py-1.5 rounded-full text-sm font-bold" style={{ background: `${P.yellow}15`, border: `1px solid ${P.yellow}30`, color: P.yellow }}>{b}</span>
                  ))}
                </motion.div>

                <motion.h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-6" initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: DURATION.slow, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                  <span style={{ color: P.white }}>AUTO </span><span style={{ color: P.accent }}>EXPERT</span>
                </motion.h1>

                <motion.p className="text-xl text-white/60 font-light leading-relaxed mb-10 max-w-lg" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.subtitle }}>
                  Votre garage de confiance depuis 2005. Entretien, reparation et diagnostic toutes marques.
                </motion.p>

                <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.cta }}>
                  <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-xl text-lg font-bold shadow-lg cursor-pointer" style={{ background: P.accent, color: P.white }}>Demander un devis</motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 border-2 border-white/20 text-white rounded-xl text-lg font-bold cursor-pointer hover:bg-white/5 transition-colors">Nos services</motion.button>
                </motion.div>
              </div>

              {/* Gauges (Signature) */}
              <motion.div className="hidden lg:grid grid-cols-2 gap-8" initial={{ opacity: 0, scale: 0.9 }} animate={heroInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: HERO_SEQUENCE.visual, duration: 0.8 }}>
                <Gauge value={98} label="Satisfaction" color={P.accent} />
                <Gauge value={95} label="Reussite CT" color={P.yellow} />
                <Gauge value={100} label="Agree" color="#27AE60" />
                <Gauge value={92} label="Fidelite" color="#3498DB" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.accent }}>Prestations</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.primary }}>Nos Services</h2>
            <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: P.muted }}>Un service complet pour l&apos;entretien et la reparation de votre vehicule</p>
          </motion.div>
          <motion.div variants={staggerContainer(0.08, 0.2)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <motion.div key={s.nom} variants={staggerItemBounce} whileHover={{ y: -5 }} className="rounded-2xl p-7 border group cursor-pointer transition-all hover:shadow-xl" style={{ background: P.bg, borderColor: `${P.primary}10` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:text-white transition-colors" style={{ background: `${P.accent}10`, color: P.accent }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: P.primary }}>{s.nom}</h3>
                <p className="text-sm mb-4" style={{ color: P.muted }}>{s.desc}</p>
                <div className="font-bold" style={{ color: P.accent }}>{s.tarif}</div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── GARANTIES ─── */}
        <S bg={P.primary}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.yellow }}>Confiance</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3" style={{ color: P.white }}>Nos Garanties</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.08, 0.2)} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {garanties.map((g) => (
              <motion.div key={g} variants={staggerItemBounce} whileHover={{ y: -4, scale: 1.05 }} className="rounded-xl p-5 text-center border cursor-pointer" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: `${P.yellow}10` }}>
                  <svg className="w-6 h-6" style={{ color: P.yellow }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21" /></svg>
                </div>
                <p className="text-sm font-medium text-white/80">{g}</p>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── DEVIS ─── */}
        <S bg={P.white}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span variants={fadeUp} className="text-sm font-bold uppercase tracking-widest" style={{ color: P.accent }}>Estimation</motion.span>
              <motion.h2 variants={delayedFadeUp(0.1)} className="text-3xl sm:text-4xl font-extrabold mt-3 mb-6" style={{ color: P.primary }}>Devis en ligne</motion.h2>
              <motion.p variants={delayedFadeUp(0.2)} className="text-lg mb-8" style={{ color: P.muted }}>Remplissez ce formulaire pour recevoir un devis gratuit sous 24h. Sans engagement.</motion.p>
              <motion.div variants={delayedFadeUp(0.3)} className="flex gap-8">
                {[{ v: "Gratuit", l: "Devis" }, { v: "24h", l: "Reponse" }, { v: "0 EUR", l: "Engagement" }].map((s) => (
                  <div key={s.l}><div className="text-2xl font-black" style={{ color: P.accent }}>{s.v}</div><div className="text-sm" style={{ color: P.muted }}>{s.l}</div></div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={delayedFadeUp(0.2)} className="rounded-3xl p-8 sm:p-10 border" style={{ background: P.bg, borderColor: `${P.primary}10` }}>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[{ l: "Marque", p: "Selectionner" }, { l: "Modele", p: "Ex : Clio IV" }].map((f) => (
                    <div key={f.l}><label className="block text-sm font-bold mb-2" style={{ color: P.primary }}>{f.l}</label><div className="w-full h-12 rounded-xl bg-white border px-4 flex items-center text-sm" style={{ borderColor: `${P.primary}15`, color: P.muted }}>{f.p}</div></div>
                  ))}
                </div>
                {[{ l: "Prestation souhaitee", p: "Choisir une prestation" }, { l: "Kilometrage", p: "Ex : 85 000 km" }].map((f) => (
                  <div key={f.l}><label className="block text-sm font-bold mb-2" style={{ color: P.primary }}>{f.l}</label><div className="w-full h-12 rounded-xl bg-white border px-4 flex items-center text-sm" style={{ borderColor: `${P.primary}15`, color: P.muted }}>{f.p}</div></div>
                ))}
                <div><label className="block text-sm font-bold mb-2" style={{ color: P.primary }}>Details supplementaires</label><div className="w-full h-24 rounded-xl bg-white border px-4 pt-3 text-sm" style={{ borderColor: `${P.primary}15`, color: P.muted }}>Decrivez le probleme...</div></div>
                <motion.button whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${P.accent}40` }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl font-bold text-lg cursor-pointer" style={{ background: P.accent, color: P.white }}>Recevoir mon devis gratuit</motion.button>
              </div>
            </motion.div>
          </div>
        </S>

        {/* ─── HORAIRES ─── */}
        <S bg={P.bg}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.accent }}>Ouverture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: P.primary }}>Horaires</h2>
          </motion.div>
          <motion.div variants={delayedFadeUp(0.2)} className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: `${P.primary}10` }}>
            {horaires.map((h) => (
              <div key={h.jour} className="flex items-center justify-between py-4 border-b last:border-0" style={{ borderColor: `${P.primary}08` }}>
                <span className="font-bold" style={{ color: P.primary }}>{h.jour}</span>
                <div className="flex items-center gap-4">
                  {h.h === "Ferme" ? <span className="text-sm font-medium" style={{ color: P.accent }}>Ferme</span> : <span className="text-sm" style={{ color: P.muted }}>{h.h}</span>}
                  {h.rdv && <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${P.yellow}15`, color: "#C89000" }}>Sur RDV</span>}
                  {h.h !== "Ferme" && !h.rdv && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold">Sans RDV</span>}
                </div>
              </div>
            ))}
          </motion.div>
        </S>

        {/* ─── AVIS ─── */}
        <S bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: P.yellow }}>Temoignages</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: P.primary }}>Avis Clients</h2>
            <div className="flex items-center justify-center gap-3 mt-4"><Stars count={5} /><span className="text-lg font-medium" style={{ color: P.muted }}>4.8/5 sur Google</span></div>
          </motion.div>
          <motion.div variants={staggerContainer(0.1, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avis.map((a) => (
              <motion.div key={a.nom} variants={staggerItemBounce} className="rounded-2xl p-8 border" style={{ background: P.bg, borderColor: `${P.primary}10` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: `linear-gradient(135deg, ${P.accent}, ${P.primary})` }}>{a.nom.charAt(0)}</div>
                  <div><span className="font-bold" style={{ color: P.primary }}>{a.nom}</span><div><Stars count={a.note} /></div></div>
                </div>
                <p className="text-sm mb-4" style={{ color: P.muted }}>&ldquo;{a.texte}&rdquo;</p>
                <div className="bg-white rounded-xl p-4 border" style={{ borderColor: `${P.primary}10` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: P.accent }}>
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <span className="text-xs font-bold" style={{ color: P.accent }}>Reponse du gerant</span>
                  </div>
                  <p className="text-sm italic" style={{ color: P.muted }}>{a.reponse}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </S>

        {/* ─── FOOTER ─── */}
        <footer className="py-16" style={{ background: P.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-2xl font-black mb-4"><span style={{ color: P.white }}>AUTO </span><span style={{ color: P.accent }}>EXPERT</span></h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>Zone Industrielle des Platanes<br />42 Rue de la Mecanique<br />31000 Toulouse<br />05 61 00 00 00</p>
              </div>
              <div><h4 className="font-bold mb-4" style={{ color: P.white }}>Horaires</h4><div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}><p>Lundi - Vendredi : 8h00 - 18h30</p><p>Samedi : 8h30 - 13h00 (sur RDV)</p><p>Dimanche : Ferme</p></div></div>
              <div><h4 className="font-bold mb-4" style={{ color: P.white }}>Certifications</h4><div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}><p>Agree toutes assurances</p><p>Label Qualite Garage</p><p>Garantie pieces 2 ans</p></div></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
