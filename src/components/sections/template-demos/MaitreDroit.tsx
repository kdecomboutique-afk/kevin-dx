"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
  SPRING_SOFT,
  SPRING_MEDIUM,
  DURATION,
  fadeUp,
  blurFadeUp,
  lineRevealX,
  lineRevealY,
  clipRevealLeft,
  staggerContainer,
  staggerItemSoft,
  hoverLift,
  HERO_SEQUENCE,
  SECTION,
  TYPOGRAPHY,
  delayedBlurFade,
} from "@/lib/template-design-system";

// ─── PALETTE ───
const C = {
  primary: "#1A2744",
  accent: "#B8860B",
  bg: "#F7F6F3",
  dark: "#0E1729",
  ivory: "#F7F6F3",
  muted: "#7A7A7A",
  white: "#FFFFFF",
};

// ─── DATA ───
const domaines = [
  { nom: "Droit de la Famille", desc: "Divorce, garde d'enfants, successions, regimes matrimoniaux et adoption.", icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" },
  { nom: "Droit Penal", desc: "Defense penale, droit des victimes, infractions routieres et affaires criminelles.", icon: "M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285zm0 13.036h.008v.008H12v-.008z" },
  { nom: "Droit Commercial", desc: "Creation de societe, contrats commerciaux, fusions-acquisitions et contentieux.", icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" },
  { nom: "Droit Immobilier", desc: "Transactions immobilieres, copropriete, baux commerciaux et contentieux locatifs.", icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
  { nom: "Droit Social", desc: "Licenciement, harcelement, negociation collective et prud'hommes.", icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" },
  { nom: "Droit Fiscal", desc: "Optimisation fiscale, controles, contentieux fiscal et fiscalite internationale.", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const timeline = [
  { annee: "1992", titre: "Fondation du cabinet", desc: "Maitre Dupont fonde le cabinet avec une vision claire : une justice accessible et une defense sans compromis." },
  { annee: "2001", titre: "Extension en droit des affaires", desc: "Ouverture du pole droit commercial et droit des societes. Le cabinet accompagne desormais les entreprises." },
  { annee: "2010", titre: "Equipe pluridisciplinaire", desc: "Arrivee de Maitre Laurent et Maitre Bernard. Le cabinet couvre desormais 6 domaines d'expertise." },
  { annee: "2018", titre: "Rayonnement national", desc: "Plus de 2 000 dossiers traites. Le cabinet est reconnu parmi les references du barreau." },
  { annee: "2024", titre: "Innovation numerique", desc: "Consultations en visio, espace client securise, suivi en temps reel de vos dossiers." },
];

const honoraires = [
  { type: "Consultation initiale", prix: "150 €", desc: "Premiere rencontre d'une heure pour evaluer votre dossier et definir une strategie claire.", highlight: false },
  { type: "Forfait procedure", prix: "Sur devis", desc: "Honoraires fixes convenus a l'avance. Transparence totale, sans mauvaise surprise.", highlight: true },
  { type: "Aide juridictionnelle", prix: "Pris en charge", desc: "Nous acceptons l'aide juridictionnelle. Verifiez votre eligibilite aupres du tribunal.", highlight: false },
];

const actualites = [
  { date: "15 janv. 2025", titre: "Reforme du droit de la famille : ce qui change", categorie: "Famille" },
  { date: "8 dec. 2024", titre: "Protection des donnees personnelles en entreprise", categorie: "Commercial" },
  { date: "22 nov. 2024", titre: "Nouveau bareme des indemnites prud'homales", categorie: "Social" },
];

// ─── SCROLL TIMELINE (Signature Animation) ───
function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical line track */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px" style={{ background: `${C.primary}10` }}>
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{ height: lineHeight, background: C.accent }}
        />
      </div>

      <div className="space-y-16 md:space-y-24">
        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.annee}
              className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: DURATION.slow, ease: EASE_SMOOTH, delay: 0.1 }}
            >
              {/* Content */}
              <div className={`flex-1 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <span className="text-xs tracking-[0.2em] uppercase" style={{ color: C.accent }}>{item.annee}</span>
                <h3 className="text-xl font-light tracking-tight mt-2" style={{ color: C.primary }}>{item.titre}</h3>
                <p className="text-sm leading-relaxed mt-2" style={{ color: C.muted }}>{item.desc}</p>
              </div>

              {/* Node */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ background: C.accent, boxShadow: `0 0 0 4px ${C.bg}, 0 0 0 5px ${C.accent}30` }}>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: C.accent }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: EASE_IN_OUT, delay: i * 0.5 }}
                />
              </div>

              {/* Spacer for alignment */}
              <div className="hidden md:block flex-1 md:w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function MaitreDroit() {
  const [activeDomaine, setActiveDomaine] = useState(0);

  return (
    <div className="relative" id="template-maitre-droit">
      <div className="pb-20">

        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: C.primary }}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${C.accent} 0, ${C.accent} 1px, transparent 0, transparent 40px)` }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: `radial-gradient(circle, ${C.accent}, transparent)` }} />

          <div className={SECTION.container + " relative z-10"}>
            <div className="max-w-3xl">
              <motion.div
                className="flex items-center gap-4 mb-8"
                variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="h-px w-16 origin-left" style={{ background: C.accent }} variants={lineRevealX} initial="hidden" animate="visible" />
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: `${C.accent}` }}>Cabinet d&apos;avocats &bull; Depuis 1992</span>
              </motion.div>

              <motion.h1
                className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95]"
                variants={delayedBlurFade(HERO_SEQUENCE.title)}
                initial="hidden"
                animate="visible"
              >
                <span style={{ color: C.white }}>Maitre</span>{" "}
                <span style={{ color: C.accent }}>Droit</span>
              </motion.h1>

              <motion.div
                className="flex items-center gap-3 mt-6 mb-8"
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                {["Excellence", "Expertise", "Ethique"].map((w, i) => (
                  <span key={w} className="flex items-center gap-3">
                    {i > 0 && <span className="w-1 h-1 rounded-full" style={{ background: `${C.accent}50` }} />}
                    <span className="text-lg font-light" style={{ color: `${C.white}60` }}>{w}</span>
                  </span>
                ))}
              </motion.div>

              <motion.p
                className="text-lg font-light leading-relaxed max-w-xl mb-10"
                style={{ color: `${C.white}50` }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle + 0.2)}
                initial="hidden"
                animate="visible"
              >
                Depuis plus de 30 ans, notre cabinet accompagne particuliers et entreprises avec rigueur, ethique et determination. Votre cause merite la meilleure defense.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className="px-8 py-4 rounded-sm text-sm font-medium tracking-wider"
                  style={{ background: C.accent, color: C.primary }}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.accent}30` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Demander une consultation
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-sm text-sm font-light tracking-wider"
                  style={{ border: `1px solid ${C.accent}30`, color: C.accent }}
                  whileHover={{ background: `${C.accent}08` }}
                >
                  Nos domaines
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 2. DOMAINES D'EXPERTISE ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.ivory }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: C.accent }}>Expertise</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.primary }}>Domaines d&apos;intervention</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: domain list */}
              <div className="lg:col-span-2 space-y-1">
                {domaines.map((d, i) => (
                  <motion.button
                    key={d.nom}
                    className="w-full text-left px-5 py-4 rounded-sm transition-all duration-300 flex items-center gap-4"
                    style={{
                      background: activeDomaine === i ? `${C.primary}08` : "transparent",
                      borderLeft: activeDomaine === i ? `2px solid ${C.accent}` : "2px solid transparent",
                    }}
                    onClick={() => setActiveDomaine(i)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: DURATION.normal, ease: EASE_SMOOTH }}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: activeDomaine === i ? C.accent : C.muted }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                    </svg>
                    <span className="text-sm tracking-wide" style={{ color: activeDomaine === i ? C.primary : C.muted }}>
                      {d.nom}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right: active domain detail */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDomaine}
                    className="p-10 rounded-sm h-full"
                    style={{ background: C.white, border: `1px solid ${C.primary}08` }}
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
                  >
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6" style={{ background: `${C.primary}08` }}>
                      <svg className="w-6 h-6" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={domaines[activeDomaine].icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light tracking-tight mb-4" style={{ color: C.primary }}>
                      {domaines[activeDomaine].nom}
                    </h3>
                    <p className="text-base leading-relaxed mb-6" style={{ color: C.muted }}>
                      {domaines[activeDomaine].desc}
                    </p>
                    <motion.div className="h-px origin-left" style={{ background: `${C.primary}08` }} variants={lineRevealX} initial="hidden" animate="visible" />
                    <div className="mt-6 flex items-center gap-2 cursor-pointer group">
                      <span className="text-sm font-light" style={{ color: C.accent }}>En savoir plus</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 3. TIMELINE (Signature: scroll-timeline-reveal) ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-20"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: C.accent }}>Notre histoire</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.primary }}>30 ans d&apos;engagement</h2>
            </motion.div>

            <ScrollTimeline />
          </div>
        </section>

        {/* ═══════════════ 4. HONORAIRES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className="text-xs tracking-[0.25em] uppercase" style={{ color: C.accent }}>Transparence</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.primary }}>Honoraires</h2>
              <p className="text-base mt-4 max-w-xl mx-auto" style={{ color: C.muted }}>
                Une tarification claire, convenue a l&apos;avance, sans mauvaise surprise.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {honoraires.map((h) => (
                <motion.div
                  key={h.type}
                  variants={staggerItemSoft}
                  className="relative p-8 rounded-sm text-center transition-all duration-300 cursor-pointer"
                  style={{
                    background: h.highlight ? C.primary : C.bg,
                    border: h.highlight ? "none" : `1px solid ${C.primary}08`,
                  }}
                  {...hoverLift}
                >
                  {h.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-widest uppercase" style={{ background: C.accent, color: C.primary }}>
                      Recommande
                    </div>
                  )}
                  <h3 className="text-lg font-light tracking-tight" style={{ color: h.highlight ? C.white : C.primary }}>{h.type}</h3>
                  <div className="text-3xl font-thin my-4" style={{ color: h.highlight ? C.accent : C.accent }}>
                    {h.prix}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: h.highlight ? `${C.white}60` : C.muted }}>{h.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 5. RENDEZ-VOUS ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.primary }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div className="h-px w-16 origin-left mb-6" style={{ background: C.accent }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
                <h2 className="text-4xl sm:text-5xl font-light tracking-tight mb-6" style={{ color: C.white }}>
                  Premier rendez-vous
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: `${C.white}50` }}>
                  Decrivez brievement votre situation. Nous vous recontactons sous 24h pour organiser une consultation confidentielle.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "Adresse", value: "28 Avenue des Champs-Elysees, 75008 Paris" },
                    { icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", label: "Telephone", value: "01 45 00 00 00" },
                    { icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75", label: "Email", value: "contact@maitre-droit.fr" },
                  ].map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0" style={{ background: `${C.white}08` }}>
                        <svg className="w-4 h-4" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs tracking-wider uppercase" style={{ color: `${C.white}40` }}>{info.label}</p>
                        <p className="text-sm font-light mt-0.5" style={{ color: `${C.white}70` }}>{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="p-8 sm:p-10 rounded-sm"
                style={{ background: `${C.white}06`, border: `1px solid ${C.white}08` }}
                variants={delayedBlurFade(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-5">
                  {[
                    { label: "Nom complet", placeholder: "Votre nom" },
                    { label: "Telephone", placeholder: "06 00 00 00 00" },
                    { label: "Domaine concerne", placeholder: "Selectionnez..." },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: `${C.white}50` }}>{field.label}</label>
                      <div className="w-full px-4 py-3 rounded-sm text-sm font-light" style={{ background: `${C.white}04`, border: `1px solid ${C.white}08`, color: `${C.white}30` }}>
                        {field.placeholder}
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: `${C.white}50` }}>Votre message</label>
                    <div className="w-full px-4 pt-3 pb-16 rounded-sm text-sm font-light" style={{ background: `${C.white}04`, border: `1px solid ${C.white}08`, color: `${C.white}30` }}>
                      Decrivez votre situation...
                    </div>
                  </div>
                  <motion.button
                    className="w-full py-4 rounded-sm text-sm font-medium tracking-wider"
                    style={{ background: C.accent, color: C.primary }}
                    whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.accent}30` }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Envoyer ma demande
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 6. ACTUALITES JURIDIQUES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.ivory }}>
          <div className={SECTION.container}>
            <motion.div
              className="flex items-end justify-between mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: C.accent }}>Veille juridique</span>
                <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.primary }}>Actualites</h2>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer(0.1, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {actualites.map((a) => (
                <motion.article
                  key={a.titre}
                  variants={staggerItemSoft}
                  className="group p-6 rounded-sm cursor-pointer transition-all duration-300"
                  style={{ background: C.white, border: `1px solid ${C.primary}05` }}
                  {...hoverLift}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-sm" style={{ background: `${C.accent}10`, color: C.accent }}>
                      {a.categorie}
                    </span>
                    <span className="text-xs" style={{ color: C.muted }}>{a.date}</span>
                  </div>
                  <h3 className="text-base font-light tracking-tight leading-snug" style={{ color: C.primary }}>{a.titre}</h3>
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs" style={{ color: C.accent }}>Lire</span>
                    <svg className="w-3 h-3" style={{ color: C.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 7. FOOTER ═══════════════ */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-light tracking-tight mb-4" style={{ color: C.accent }}>Maitre Droit</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${C.white}30` }}>
                  28 Avenue des Champs-Elysees<br />
                  75008 Paris<br />
                  01 45 00 00 00
                </p>
              </div>
              <div>
                <h4 className="text-xs tracking-wider uppercase mb-4" style={{ color: C.white }}>Horaires</h4>
                <div className="space-y-2 text-sm" style={{ color: `${C.white}30` }}>
                  <p>Lundi - Vendredi : 9h00 - 19h00</p>
                  <p>Samedi : Sur rendez-vous</p>
                  <p>Urgences : 24h/24</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs tracking-wider uppercase mb-4" style={{ color: C.white }}>Affiliations</h4>
                <div className="space-y-2 text-sm" style={{ color: `${C.white}30` }}>
                  <p>Barreau de Paris</p>
                  <p>Ordre des Avocats</p>
                  <p>CNB</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-[10px] tracking-[0.2em]" style={{ borderColor: `${C.white}05`, color: `${C.white}15` }}>
              &copy; 2025 Maitre Droit. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}