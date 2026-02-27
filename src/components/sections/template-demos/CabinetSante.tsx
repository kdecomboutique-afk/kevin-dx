"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SPRING_SOFT,
  DURATION,
  EASE_SMOOTH,
  EASE_IN_OUT,
  fadeUp,
  blurFadeUp,
  staggerContainer,
  staggerItemSoft,
  hoverLift,
  SECTION,
  TYPOGRAPHY,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ─── PALETTE ─── */
const C = {
  primary: "#4A90B8",
  accent: "#5CB85C",
  bg: "#F0F7FA",
  dark: "#1B3A4B",
  text: "#2A4A5C",
  muted: "#6B8FA3",
  white: "#FFFFFF",
  light: "#E8F4F8",
};

/* ─── DATA ─── */
const specialites = [
  { nom: "Medecine Generale", desc: "Consultations, bilans de sante, vaccinations et suivi medical complet pour toute la famille.", icon: "stethoscope" },
  { nom: "Pediatrie", desc: "Suivi de croissance, vaccins, conseils nutrition et developpement pour vos enfants de 0 a 16 ans.", icon: "child" },
  { nom: "Gynecologie", desc: "Suivi gynecologique, contraception, frottis et accompagnement grossesse en toute confiance.", icon: "heart" },
  { nom: "Dermatologie", desc: "Depistage cutane, traitement acne, eczema et suivi des grains de beaute suspects.", icon: "skin" },
  { nom: "Cardiologie", desc: "Bilan cardio-vasculaire, ECG, echographie cardiaque et suivi hypertension.", icon: "pulse" },
  { nom: "ORL", desc: "Troubles auditifs, sinusites chroniques, vertiges et allergies respiratoires.", icon: "ear" },
];

const medecins = [
  { nom: "Dr. Philippe Martin", titre: "Medecin Generaliste", diplomes: "Faculte Paris Descartes, DU Geriatrie", grad: `linear-gradient(135deg, ${C.primary}, ${C.accent})` },
  { nom: "Dr. Claire Rousseau", titre: "Gyneco-Obstetricienne", diplomes: "CHU Montpellier, DU Echographie", grad: `linear-gradient(135deg, ${C.accent}, #7EC8A0)` },
  { nom: "Dr. Marc Lefevre", titre: "Cardiologue", diplomes: "Hopital Cochin Paris, DU Rythmologie", grad: `linear-gradient(135deg, #7EC8A0, ${C.primary})` },
];

const horaires = [
  { jour: "Lundi", h: "8h30 - 19h00" }, { jour: "Mardi", h: "8h30 - 19h00" },
  { jour: "Mercredi", h: "8h30 - 18h00" }, { jour: "Jeudi", h: "8h30 - 19h00" },
  { jour: "Vendredi", h: "8h30 - 18h00" }, { jour: "Samedi", h: "9h00 - 13h00" },
  { jour: "Dimanche", h: "Ferme" },
];

const faqData = [
  { q: "Faut-il une ordonnance pour consulter un specialiste ?", r: "Pour la plupart des specialistes, une lettre de votre medecin traitant est recommandee pour un meilleur remboursement. La gynecologie et l'ophtalmologie sont en acces direct." },
  { q: "Pratiquez-vous le tiers payant ?", r: "Oui, nous pratiquons le tiers payant integral pour les patients en ALD, CMU-C et AME. Pour les autres, le tiers payant est applique sur la part Securite sociale." },
  { q: "Comment annuler ou reporter un rendez-vous ?", r: "Vous pouvez annuler ou modifier votre rendez-vous en ligne jusqu'a 2 heures avant l'heure prevue. Au-dela, merci de nous appeler directement." },
  { q: "Le cabinet est-il accessible aux personnes a mobilite reduite ?", r: "Oui, le cabinet est entierement accessible : rampe d'acces, ascenseur, portes elargies et toilettes adaptees. Un parking PMR est disponible devant l'entree." },
];

/* ─── SVG ICONS ─── */
function SpecIcon({ type }: { type: string }) {
  const props = { className: "w-7 h-7", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
  switch (type) {
    case "stethoscope": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" /></svg>;
    case "child": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
    case "heart": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;
    case "skin": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>;
    case "pulse": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3-9 4 18 3-9h5" /></svg>;
    case "ear": return <svg {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>;
    default: return null;
  }
}

/* ─── VITALS PULSE LINE — Signature SVG ─── */
function VitalsPulseLine() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full pointer-events-none z-0 hidden lg:block">
      <svg width="2" height="100%" className="overflow-visible">
        <motion.line
          x1="1" y1="0" x2="1" y2="100%"
          stroke={C.primary}
          strokeWidth="1"
          strokeDasharray="8 8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2 }}
        />
      </svg>
      {/* Pulse dot traveling */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
        style={{ backgroundColor: C.accent, boxShadow: `0 0 12px ${C.accent}60` }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

/* ─── INLINE ECG SVG ─── */
function EcgLine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" preserveAspectRatio="none">
      <motion.path
        d="M0 20 L30 20 L40 20 L50 5 L55 35 L60 10 L65 25 L70 20 L200 20"
        stroke={C.primary}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 3, ease: EASE_IN_OUT, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  );
}

const zen = TYPOGRAPHY.zen;

/* ─── MAIN COMPONENT ─── */
export default function CabinetSante() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDoc, setSelectedDoc] = useState(0);

  return (
    <div className="relative" style={{ backgroundColor: C.bg }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t py-3 px-4" style={{ borderColor: `${C.primary}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold" style={{ color: C.primary }}>Cabinet Sante+</span>
            <span className="text-sm hidden sm:inline" style={{ color: C.muted }}>&#8226; Cabinet medical</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-xl transition-colors" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-cabinet-sante" className="px-4 py-2 text-sm font-medium rounded-xl text-white transition-colors" style={{ backgroundColor: C.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ═══ 1. HERO ═══ */}
        <section className={`relative min-h-screen flex items-center overflow-hidden ${SECTION.paddingHero}`} style={{ background: `linear-gradient(170deg, ${C.white}, ${C.bg} 40%, ${C.light})` }}>
          {/* Decorative blobs */}
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: C.primary, opacity: 0.04, filter: "blur(100px)" }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: C.accent, opacity: 0.05, filter: "blur(80px)" }} />

          {/* ECG background pattern */}
          <div className="absolute inset-0 flex items-center opacity-30 pointer-events-none">
            <EcgLine className="w-full h-16" />
          </div>

          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden" animate="visible"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
                  style={{ backgroundColor: `${C.primary}10`, color: C.primary }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H14V0H10V3H5V8H0V12H5V17H10V20H14V17H19V12H24V8H19V3Z" /></svg>
                  <span className="text-sm font-medium">Centre medical pluridisciplinaire</span>
                </motion.div>

                <motion.h1
                  variants={delayedBlurFade(HERO_SEQUENCE.title)}
                  initial="hidden" animate="visible"
                  className={`${zen.heroTitle} mb-6 leading-[1.1]`}
                  style={{ color: C.dark }}
                >
                  Votre sante,{" "}
                  <span style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    notre priorite
                  </span>
                </motion.h1>

                <motion.p
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden" animate="visible"
                  className={`${zen.subtitle} mb-10 max-w-lg`}
                  style={{ color: C.muted }}
                >
                  Une equipe de professionnels de sante reunis sous un meme toit pour un parcours de soins coordonne, accessible et humain.
                </motion.p>

                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 12px 32px ${C.primary}35` }}
                    whileTap={{ scale: 0.98 }}
                    transition={SPRING_SOFT}
                    className="px-8 py-4 rounded-2xl text-white text-lg font-medium"
                    style={{ backgroundColor: C.primary, boxShadow: `0 8px 24px ${C.primary}25` }}
                  >
                    Prendre rendez-vous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={SPRING_SOFT}
                    className="px-8 py-4 rounded-2xl text-lg font-medium border-2 transition-colors"
                    style={{ borderColor: `${C.primary}25`, color: C.primary }}
                  >
                    Nos specialites
                  </motion.button>
                </motion.div>
              </div>

              {/* Hero visual — medical cross + floating cards */}
              <motion.div
                variants={delayedBlurFade(HERO_SEQUENCE.visual)}
                initial="hidden" animate="visible"
                className="hidden lg:block relative"
              >
                <div className="aspect-square rounded-3xl flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.primary}08, ${C.accent}08)`, border: `1px solid ${C.primary}10` }}>
                  {/* Animated cross */}
                  <motion.svg
                    className="w-40 h-40"
                    fill={C.primary}
                    viewBox="0 0 24 24"
                    style={{ opacity: 0.08 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: EASE_IN_OUT }}
                  >
                    <path d="M19 3H14V0H10V3H5V8H0V12H5V17H10V20H14V17H19V12H24V8H19V3Z" />
                  </motion.svg>

                  {/* ECG line overlay */}
                  <div className="absolute bottom-12 left-8 right-8">
                    <EcgLine className="w-full h-12" />
                  </div>
                </div>

                {/* Floating confirmation card */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 border"
                  style={{ borderColor: `${C.accent}20`, boxShadow: `0 8px 32px ${C.primary}10` }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: EASE_IN_OUT }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.accent}15` }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: C.dark }}>RDV confirme</p>
                      <p className="text-xs" style={{ color: C.muted }}>Dr. Martin &#8226; 10h30</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats badge */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-white rounded-2xl px-5 py-3 border"
                  style={{ borderColor: `${C.primary}15`, boxShadow: `0 8px 32px ${C.primary}10` }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: EASE_IN_OUT, delay: 1 }}
                >
                  <div className="text-center">
                    <span className="font-heading font-bold text-2xl" style={{ color: C.primary }}>15+</span>
                    <p className="text-xs" style={{ color: C.muted }}>ans d&apos;experience</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 2. SPECIALITES ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Expertise</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Nos Specialites</h2>
              <p className={`${zen.subtitle} mt-4 max-w-2xl mx-auto`} style={{ color: C.muted }}>
                Six poles de competences pour une prise en charge globale, coordonnee et de proximite
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {specialites.map((spec) => (
                <motion.div
                  key={spec.nom}
                  variants={staggerItemSoft}
                  {...hoverLift}
                  className="group rounded-2xl p-8 border transition-all duration-300 hover:border-transparent"
                  style={{ backgroundColor: C.white, borderColor: `${C.primary}10`, boxShadow: `0 1px 3px ${C.primary}05` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 12px 40px ${C.primary}12`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 1px 3px ${C.primary}05`; }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:text-white"
                    style={{ backgroundColor: `${C.primary}10`, color: C.primary }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.primary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${C.primary}10`; e.currentTarget.style.color = C.primary; }}
                  >
                    <SpecIcon type={spec.icon} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-3" style={{ color: C.dark }}>{spec.nom}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{spec.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 3. EQUIPE MEDICALE ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(180deg, ${C.bg}, ${C.white})` }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.accent }}>Equipe medicale</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Nos Praticiens</h2>
              <p className={`${zen.subtitle} mt-4 max-w-2xl mx-auto`} style={{ color: C.muted }}>
                Des professionnels diplomes, a l&apos;ecoute et complementaires
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {medecins.map((doc) => (
                <motion.div
                  key={doc.nom}
                  variants={staggerItemSoft}
                  whileHover={{ y: -4, transition: { ...SPRING_SOFT } }}
                  className="text-center rounded-2xl p-8 border transition-shadow duration-500"
                  style={{ backgroundColor: C.white, borderColor: `${C.primary}08`, boxShadow: `0 2px 8px ${C.primary}05` }}
                >
                  <div className="w-28 h-28 mx-auto rounded-full mb-6" style={{ background: doc.grad, boxShadow: `0 8px 24px ${C.primary}15` }} />
                  <h3 className="font-heading font-semibold text-xl" style={{ color: C.dark }}>{doc.nom}</h3>
                  <p className="text-sm font-medium mt-1" style={{ color: C.primary }}>{doc.titre}</p>
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: C.muted }}>{doc.diplomes}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={SPRING_SOFT}
                    className="mt-6 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{ backgroundColor: `${C.primary}10`, color: C.primary }}
                  >
                    Prendre RDV
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. PRISE DE RDV ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGapCompact}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>En ligne</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Reservez votre creneau</h2>
              <p className={`${zen.subtitle} mt-4`} style={{ color: C.muted }}>Choisissez votre praticien et votre horaire en quelques clics</p>
            </motion.div>

            <motion.div
              variants={blurFadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10"
              style={{ backgroundColor: C.white, boxShadow: `0 16px 48px ${C.primary}08`, border: `1px solid ${C.primary}10` }}
            >
              {/* Doctor selector */}
              <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                {medecins.map((doc, i) => (
                  <motion.button
                    key={doc.nom}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDoc(i)}
                    className="flex-shrink-0 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: selectedDoc === i ? C.primary : `${C.primary}08`,
                      color: selectedDoc === i ? C.white : C.primary,
                      boxShadow: selectedDoc === i ? `0 4px 16px ${C.primary}30` : "none",
                    }}
                  >
                    {doc.nom}
                  </motion.button>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-6 gap-2 min-w-[500px]">
                  <div />
                  {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((j) => (
                    <div key={j} className="text-center font-heading font-semibold text-sm py-2" style={{ color: C.dark }}>{j}</div>
                  ))}
                  {["9h00", "10h00", "11h00", "14h00", "15h00", "16h00", "17h00"].map((h, ri) => (
                    <div key={h} className="contents">
                      <div className="text-right text-sm py-2 pr-3" style={{ color: C.muted }}>{h}</div>
                      {["Lun", "Mar", "Mer", "Jeu", "Ven"].map((j, ci) => {
                        const available = (ri + ci + selectedDoc) % 3 !== 0;
                        return (
                          <motion.div
                            key={`${j}-${h}`}
                            whileHover={available ? { scale: 1.1 } : {}}
                            className="py-2 rounded-xl text-center text-xs font-medium cursor-pointer transition-colors duration-200"
                            style={{
                              backgroundColor: available ? `${C.accent}15` : "#f5f5f5",
                              color: available ? C.accent : "#d0d0d0",
                            }}
                          >
                            {available ? "Libre" : "-"}
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 5. INFOS PRATIQUES ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(180deg, ${C.bg}, ${C.white})` }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Pratique</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Informations Pratiques</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
              <VitalsPulseLine />

              {/* Horaires */}
              <motion.div
                variants={blurFadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl p-8 border"
                style={{ backgroundColor: C.white, borderColor: `${C.primary}10` }}
              >
                <h3 className="font-heading font-semibold text-xl mb-6 flex items-center gap-3" style={{ color: C.dark }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.primary}10` }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={C.primary} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  Horaires d&apos;ouverture
                </h3>
                <div className="space-y-0">
                  {horaires.map((h) => (
                    <div key={h.jour} className="flex justify-between items-center py-3 border-b last:border-0" style={{ borderColor: `${C.primary}08` }}>
                      <span className="font-medium text-sm" style={{ color: C.dark }}>{h.jour}</span>
                      <span className="text-sm font-medium" style={{ color: h.h === "Ferme" ? "#E57373" : C.primary }}>{h.h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Acces & paiement */}
              <motion.div
                variants={blurFadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="rounded-2xl p-8 border" style={{ backgroundColor: C.white, borderColor: `${C.accent}15` }}>
                  <h3 className="font-heading font-semibold text-xl mb-5 flex items-center gap-3" style={{ color: C.dark }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.accent}10` }}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    </div>
                    Acces
                  </h3>
                  <div className="space-y-3">
                    {[
                      { letter: "P", label: "Parking gratuit (30 places)" },
                      { letter: "B", label: "Bus lignes 12, 34 — Arret Centre Medical" },
                      { letter: "M", label: "Metro ligne 7 — Station Republique" },
                    ].map((item) => (
                      <p key={item.letter} className="flex items-center gap-3 text-sm" style={{ color: C.muted }}>
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: `${C.primary}10`, color: C.primary }}>{item.letter}</span>
                        {item.label}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl p-6 border" style={{ backgroundColor: C.white, borderColor: `${C.primary}10` }}>
                  <h4 className="font-heading font-semibold mb-3" style={{ color: C.dark }}>Moyens de paiement</h4>
                  <div className="flex flex-wrap gap-2">
                    {["CB", "Cheque", "Especes", "Tiers payant", "CMU"].map((m) => (
                      <span key={m} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{ backgroundColor: `${C.accent}10`, color: C.accent }}>{m}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 6. FAQ ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Vos questions</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Questions Frequentes</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="space-y-4"
            >
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={staggerItemSoft}
                  className="rounded-2xl border overflow-hidden transition-shadow duration-300"
                  style={{ borderColor: `${C.primary}10`, boxShadow: openFaq === i ? `0 4px 20px ${C.primary}10` : "none" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-heading font-semibold pr-4" style={{ color: C.dark }}>{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE_SMOOTH }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${C.primary}10`, color: C.primary }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{faq.r}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. URGENCES BANDEAU ═══ */}
        <section className="py-10" style={{ background: `linear-gradient(135deg, ${C.primary}, #3A7DA8)` }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white text-xl">Urgences medicales</h3>
                  <p className="text-white/70 text-sm">En cas d&apos;urgence, appelez immediatement</p>
                </div>
              </div>
              <div className="flex gap-8">
                {[{ label: "SAMU", num: "15" }, { label: "Pompiers", num: "18" }, { label: "Urgences", num: "112" }].map((u) => (
                  <div key={u.label} className="text-center">
                    <div className="font-heading font-bold text-3xl text-white">{u.num}</div>
                    <div className="text-white/50 text-xs uppercase tracking-wider">{u.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ backgroundColor: C.dark }}>
          <div className={`${SECTION.container} py-16`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-heading font-semibold text-2xl text-white mb-4">Cabinet Sante+</h3>
                <div className="space-y-1 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <p>45 Avenue de la Sante</p>
                  <p>69003 Lyon</p>
                  <p>04 72 00 00 00</p>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-white mb-4">Acces rapide</h4>
                <div className="space-y-2.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {["Nos specialites", "L'equipe", "Prendre RDV", "Infos pratiques"].map((link) => (
                    <p key={link} className="cursor-pointer hover:text-white/70 transition-colors">{link}</p>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-white mb-4">Conventionne</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Cabinet conventionne secteur 1. Tiers payant accepte. Carte Vitale et mutuelles.
                </p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
              &copy; 2025 Cabinet Sante+ &mdash; Tous droits reserves
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
