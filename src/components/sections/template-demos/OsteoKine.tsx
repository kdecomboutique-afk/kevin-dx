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
  SECTION,
  TYPOGRAPHY,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ─── PALETTE ─── */
const C = {
  primary: "#3B7DD8",
  accent: "#4ECDC4",
  bg: "#F5F9FC",
  dark: "#1A2B3C",
  text: "#2C4356",
  muted: "#7A99B0",
  white: "#FFFFFF",
  light: "#EAF2F8",
  orange: "#F59E0B",
};

/* ─── DATA ─── */
type TabKey = "dos" | "sport" | "grossesse" | "bebe" | "posture";
const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: "dos", label: "Dos & Cervicales", icon: "spine" },
  { key: "sport", label: "Sport", icon: "bolt" },
  { key: "grossesse", label: "Grossesse", icon: "heart" },
  { key: "bebe", label: "Bebe", icon: "baby" },
  { key: "posture", label: "Posture", icon: "posture" },
];

const tabContent: Record<TabKey, { title: string; desc: string; points: string[] }> = {
  dos: {
    title: "Douleurs du dos et des cervicales",
    desc: "Lombalgies, sciatiques, torticolis, hernies discales. Nos techniques manuelles douces soulagent durablement vos douleurs vertebrales.",
    points: ["Manipulations articulaires douces", "Relachement myofascial", "Exercices de prevention personnalises", "Conseils posturaux pour le quotidien"],
  },
  sport: {
    title: "Reeducation sportive",
    desc: "Entorses, tendinites, dechirures, fractures. Protocoles adaptes pour un retour rapide et securise a l'activite physique.",
    points: ["Reeducation fonctionnelle ciblee", "Strapping et taping therapeutique", "Reprise progressive encadree", "Electrothérapie et ultrasons"],
  },
  grossesse: {
    title: "Accompagnement grossesse",
    desc: "Douleurs lombaires, sciatique de grossesse, preparation du bassin. Un suivi bienveillant du debut a l'apres accouchement.",
    points: ["Soulagement des douleurs du dos", "Preparation du bassin a l'accouchement", "Reeducation post-partum", "Techniques douces et securisees"],
  },
  bebe: {
    title: "Osteopathie du nourrisson",
    desc: "Torticolis, coliques, reflux, plagiocephalie. Des gestes d'une extreme douceur adaptes aux tout-petits des les premieres semaines.",
    points: ["Bilan cranien complet", "Torticolis congenital du nourrisson", "Coliques et troubles du sommeil", "Suivi de la plagiocephalie"],
  },
  posture: {
    title: "Bilan postural complet",
    desc: "Analyse posturale, semelles orthopediques, ergonomie du poste de travail. Corrigez vos desequilibres pour prevenir les douleurs.",
    points: ["Bilan sur plateforme stabilometrique", "Prescription de semelles adaptees", "Ergonomie poste de travail", "Suivi evolution posturale"],
  },
};

const praticien = {
  nom: "Dr. Marie Laurent",
  titre: "Osteopathe D.O.",
  bio: "Diplomee de l'ESO Paris avec 12 ans d'experience, Marie allie expertise technique et approche humaine. Specialisee en perinatalite et pediatrie, elle accompagne chaque patient avec bienveillance et precision.",
  formation: ["ESO Paris — Diplome d'Osteopathie", "DU Perinatalite — Universite Paris Descartes", "Formation McKenzie — Niveau C", "Osteopathie pediatrique — Sutherland Academy"],
};

const tarifs = [
  { soin: "Consultation Osteopathie", prix: "60 EUR", duree: "45 min", note: "" },
  { soin: "Consultation Kinesitherapie", prix: "Conventionnee", duree: "30 min", note: "Prise en charge Securite Sociale" },
  { soin: "Bilan Postural Complet", prix: "90 EUR", duree: "60 min", note: "" },
  { soin: "Seance Nourrisson", prix: "55 EUR", duree: "30 min", note: "" },
];

const mutuelles = ["Harmonie Mutuelle", "MGEN", "Groupama", "Malakoff Humanis", "Allianz", "AXA"];

const temoignages = [
  { nom: "Stephane R.", note: 5, texte: "Apres des annees de douleurs lombaires, 3 seances avec Marie ont suffi pour me soulager durablement. Un cabinet serieux et humain." },
  { nom: "Aurelie M.", note: 5, texte: "Thomas m'a accompagnee apres ma rupture des ligaments. Grace a son protocole, j'ai repris le trail en 6 mois. Un kine passionne." },
  { nom: "Celine D.", note: 5, texte: "Sophie a vu notre bebe des ses 2 semaines pour un torticolis. En deux seances, tout etait resolu. La douceur incarnee." },
  { nom: "Marc P.", note: 5, texte: "Le bilan postural a revele des desequilibres que je trainais depuis l'adolescence. Les semelles et les exercices ont tout change." },
];

const faqData = [
  { q: "L'osteopathie fait-elle mal ?", r: "Non, les techniques utilisees sont douces et adaptees. Vous pouvez ressentir une legere sensibilite, mais jamais de douleur vive. Nous nous adaptons toujours a votre ressenti." },
  { q: "Combien de seances sont necessaires ?", r: "Pour un trouble recent, 1 a 3 seances suffisent generalement. Pour les problematiques chroniques, un suivi regulier peut etre recommande. Nous etablissons un plan personnalise." },
  { q: "Prenez-vous les nourrissons ?", r: "Oui. Notre specialiste en pediatrie recoit les bebes des les premieres semaines de vie pour torticolis, coliques, reflux et troubles du sommeil." },
  { q: "Etes-vous conventionne ?", r: "La kinesitherapie est conventionnee sur prescription medicale. L'osteopathie n'est pas remboursee par la Secu, mais la plupart des mutuelles couvrent 1 a 5 seances par an." },
  { q: "Puis-je venir en urgence ?", r: "Oui, nous reservons chaque jour des creneaux pour les urgences. Appelez-nous le matin et nous ferons notre possible pour vous recevoir dans la journee." },
];

/* ─── BODY ZONE HIGHLIGHT — Signature animation ─── */
const bodyZones = [
  { id: "tete", label: "Tete & Crane", cx: 50, cy: 10, r: 7 },
  { id: "cervicales", label: "Cervicales", cx: 50, cy: 20, r: 5 },
  { id: "epaule", label: "Epaules", cx: 35, cy: 30, r: 6 },
  { id: "dos", label: "Dos & Lombaires", cx: 50, cy: 42, r: 8 },
  { id: "bassin", label: "Bassin & Hanches", cx: 50, cy: 58, r: 7 },
  { id: "genou", label: "Genoux", cx: 43, cy: 74, r: 5 },
];

function BodySilhouette({ activeZone, onZoneClick }: { activeZone: string | null; onZoneClick: (id: string) => void }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-[280px] mx-auto">
      {/* Simplified body silhouette */}
      <ellipse cx="50" cy="10" rx="7" ry="8" fill={C.primary} opacity={0.08} />
      <rect x="45" y="18" width="10" height="5" rx="3" fill={C.primary} opacity={0.06} />
      <path d="M38 23 Q50 20 62 23 L65 45 Q50 48 35 45 Z" fill={C.primary} opacity={0.06} />
      <path d="M30 25 L38 23 L36 40 L28 38 Z" fill={C.primary} opacity={0.05} />
      <path d="M62 23 L70 25 L72 38 L64 40 Z" fill={C.primary} opacity={0.05} />
      <path d="M40 45 L47 48 L44 70 L38 68 Z" fill={C.primary} opacity={0.05} />
      <path d="M53 48 L60 45 L62 68 L56 70 Z" fill={C.primary} opacity={0.05} />
      <path d="M38 68 L44 70 L43 90 L37 88 Z" fill={C.primary} opacity={0.04} />
      <path d="M56 70 L62 68 L63 88 L57 90 Z" fill={C.primary} opacity={0.04} />

      {/* Clickable zones */}
      {bodyZones.map((zone) => (
        <g key={zone.id} onClick={() => onZoneClick(zone.id)} className="cursor-pointer">
          <motion.circle
            cx={zone.cx}
            cy={zone.cy}
            r={zone.r}
            fill={activeZone === zone.id ? C.accent : C.primary}
            initial={{ opacity: 0.12 }}
            animate={{
              opacity: activeZone === zone.id ? 0.4 : 0.12,
              scale: activeZone === zone.id ? 1.2 : 1,
            }}
            transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
            style={{ transformOrigin: `${zone.cx}px ${zone.cy}px` }}
          />
          {activeZone === zone.id && (
            <motion.circle
              cx={zone.cx}
              cy={zone.cy}
              r={zone.r + 3}
              fill="none"
              stroke={C.accent}
              strokeWidth={0.5}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.6, 0], scale: [1, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: EASE_IN_OUT }}
              style={{ transformOrigin: `${zone.cx}px ${zone.cy}px` }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={i < count ? C.orange : "#e0e0e0"} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const zen = TYPOGRAPHY.zen;

/* ─── MAIN COMPONENT ─── */
export default function OsteoKine() {
  const [activeTab, setActiveTab] = useState<TabKey>("dos");
  const [activeZone, setActiveZone] = useState<string | null>("dos");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative" style={{ backgroundColor: C.bg }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t py-3 px-4" style={{ borderColor: `${C.primary}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold" style={{ color: C.primary }}>Cabinet Equilibre</span>
            <span className="text-sm hidden sm:inline" style={{ color: C.muted }}>&#8226; Osteo &amp; Kine</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-xl" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-osteo-kine" className="px-4 py-2 text-sm font-medium rounded-xl text-white" style={{ backgroundColor: C.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ═══ 1. HERO with body silhouette ═══ */}
        <section className={`relative min-h-screen flex items-center overflow-hidden ${SECTION.paddingHero}`} style={{ background: `linear-gradient(170deg, ${C.white}, ${C.bg} 50%, ${C.light})` }}>
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: C.primary, opacity: 0.04, filter: "blur(120px)" }} />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: C.accent, opacity: 0.05, filter: "blur(100px)" }} />

          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div>
                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden" animate="visible"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
                  style={{ backgroundColor: `${C.primary}10`, color: C.primary }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.accent }} />
                  <span className="text-sm font-medium">Osteopathie &amp; Kinesitherapie</span>
                </motion.div>

                <motion.h1
                  variants={delayedBlurFade(HERO_SEQUENCE.title)}
                  initial="hidden" animate="visible"
                  className={`${zen.heroTitle} mb-6 leading-[1.1]`}
                  style={{ color: C.dark }}
                >
                  Retrouvez votre{" "}
                  <span style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    equilibre
                  </span>
                  , naturellement.
                </motion.h1>

                <motion.p
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden" animate="visible"
                  className={`${zen.subtitle} mb-10 max-w-lg`}
                  style={{ color: C.muted }}
                >
                  Approche globale et personnalisee pour soulager vos douleurs, ameliorer votre mobilite et retrouver votre bien-etre au quotidien.
                </motion.p>

                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row gap-4 mb-10"
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
                    className="px-8 py-4 rounded-2xl text-lg font-medium border-2"
                    style={{ borderColor: `${C.primary}20`, color: C.primary }}
                  >
                    Nos specialites
                  </motion.button>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.stats)}
                  initial="hidden" animate="visible"
                  className="flex flex-wrap gap-3"
                >
                  {["Conventionne", "15 ans d'experience", "Urgences acceptees"].map((b) => (
                    <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-xl border" style={{ backgroundColor: C.white, borderColor: `${C.primary}10` }}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="text-sm font-medium" style={{ color: C.text }}>{b}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Interactive body silhouette */}
              <motion.div
                variants={delayedBlurFade(HERO_SEQUENCE.visual)}
                initial="hidden" animate="visible"
                className="hidden lg:flex flex-col items-center"
              >
                <div className="relative w-full max-w-sm">
                  <div className="rounded-3xl p-10" style={{ background: `linear-gradient(135deg, ${C.primary}06, ${C.accent}06)`, border: `1px solid ${C.primary}10` }}>
                    <BodySilhouette activeZone={activeZone} onZoneClick={setActiveZone} />
                  </div>

                  {/* Active zone label */}
                  <AnimatePresence mode="wait">
                    {activeZone && (
                      <motion.div
                        key={activeZone}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: DURATION.fast }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                        style={{ backgroundColor: C.primary, boxShadow: `0 4px 16px ${C.primary}30` }}
                      >
                        {bodyZones.find((z) => z.id === activeZone)?.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs mt-8" style={{ color: C.muted }}>Cliquez sur une zone pour en savoir plus</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 2. SPECIALITES — Tabs ═══ */}
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
                Une prise en charge pluridisciplinaire pour chaque etape de votre vie
              </p>
            </motion.div>

            {/* Tab navigation */}
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab.key)}
                  className="relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: activeTab === tab.key ? C.primary : `${C.primary}08`,
                    color: activeTab === tab.key ? C.white : C.primary,
                    boxShadow: activeTab === tab.key ? `0 4px 16px ${C.primary}25` : "none",
                  }}
                >
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
                className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border"
                style={{ backgroundColor: C.white, borderColor: `${C.primary}10`, boxShadow: `0 8px 32px ${C.primary}06` }}
              >
                <h3 className="font-heading font-semibold text-2xl mb-4" style={{ color: C.dark }}>{tabContent[activeTab].title}</h3>
                <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>{tabContent[activeTab].desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tabContent[activeTab].points.map((point, i) => (
                    <motion.div
                      key={point}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: DURATION.fast }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${C.accent}15` }}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke={C.accent} strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      <span className="text-sm" style={{ color: C.text }}>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ 3. LE PRATICIEN ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(180deg, ${C.bg}, ${C.white})` }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.accent }}>Votre praticienne</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Approche &amp; Philosophie</h2>
            </motion.div>

            <motion.div
              variants={blurFadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center"
            >
              {/* Photo + info */}
              <div className="lg:col-span-2 text-center">
                <div className="w-48 h-48 mx-auto rounded-full mb-6" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, boxShadow: `0 16px 40px ${C.primary}20` }} />
                <h3 className="font-heading font-semibold text-2xl" style={{ color: C.dark }}>{praticien.nom}</h3>
                <p className="text-sm font-medium mt-1" style={{ color: C.primary }}>{praticien.titre}</p>
              </div>

              {/* Bio + formation */}
              <div className="lg:col-span-3 space-y-6">
                <p className="text-base leading-loose" style={{ color: C.text }}>{praticien.bio}</p>
                <div>
                  <h4 className="font-heading font-semibold mb-4" style={{ color: C.dark }}>Formation</h4>
                  <div className="space-y-3">
                    {praticien.formation.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: C.accent }} />
                        <span className="text-sm" style={{ color: C.muted }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. TARIFS & MUTUELLES ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Transparence</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Tarifs &amp; Remboursements</h2>
              <p className={`${zen.subtitle} mt-4 max-w-2xl mx-auto`} style={{ color: C.muted }}>
                Des tarifs clairs, sans surprise. Kinesitherapie prise en charge sur prescription.
              </p>
            </motion.div>

            <motion.div
              variants={blurFadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              {/* Tarifs table */}
              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${C.primary}10`, boxShadow: `0 8px 32px ${C.primary}06` }}>
                {tarifs.map((t, i) => (
                  <div
                    key={t.soin}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-3"
                    style={{ borderBottom: i < tarifs.length - 1 ? `1px solid ${C.primary}08` : "none", backgroundColor: C.white }}
                  >
                    <div>
                      <h3 className="font-heading font-semibold" style={{ color: C.dark }}>{t.soin}</h3>
                      {t.note && <p className="text-xs font-medium mt-0.5" style={{ color: C.accent }}>{t.note}</p>}
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm" style={{ color: C.muted }}>{t.duree}</span>
                      <span className="font-heading font-bold text-xl min-w-[100px] text-right" style={{ color: C.primary }}>{t.prix}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mutuelles */}
              <div className="mt-8 rounded-2xl p-6 border" style={{ borderColor: `${C.accent}15`, backgroundColor: `${C.accent}04` }}>
                <h4 className="font-heading font-semibold text-sm mb-4" style={{ color: C.dark }}>Mutuelles partenaires</h4>
                <div className="flex flex-wrap gap-2">
                  {mutuelles.map((m) => (
                    <span key={m} className="px-3 py-1.5 rounded-xl text-xs font-medium" style={{ backgroundColor: `${C.primary}08`, color: C.primary }}>{m}</span>
                  ))}
                </div>
                <p className="text-xs mt-4 leading-relaxed" style={{ color: C.muted }}>
                  La plupart des mutuelles remboursent 1 a 5 seances d&apos;osteopathie par an. Facture detaillee fournie.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ 5. RENDEZ-VOUS ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primary}E0)` }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={blurFadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight tracking-tight">
                  Prenez Rendez-vous{" "}
                  <span style={{ color: C.accent }}>en Ligne</span>
                </h2>
                <p className="text-lg font-light leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Consultez les disponibilites et reservez en quelques clics. Confirmation instantanee par SMS.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING_SOFT}
                  className="px-8 py-4 rounded-2xl text-lg font-medium"
                  style={{ backgroundColor: C.white, color: C.primary, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                >
                  Reserver sur Doctolib
                </motion.button>
              </motion.div>

              {/* Mockup calendar */}
              <motion.div
                variants={blurFadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="rounded-2xl p-6" style={{ backgroundColor: C.white, boxShadow: "0 24px 64px rgba(0,0,0,0.15)" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-semibold" style={{ color: C.dark }}>Disponibilites</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.accent }} />
                    <span className="text-xs font-medium" style={{ color: C.accent }}>12 creneaux</span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {["Lun 24", "Mar 25", "Mer 26", "Jeu 27", "Ven 28"].map((j, i) => (
                    <div key={j} className="text-center py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: i === 0 ? C.primary : `${C.primary}08`, color: i === 0 ? C.white : C.text }}>
                      {j}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(5)].map((_, col) => (
                    <div key={col} className="space-y-2">
                      {["9h00", "9h45", "10h30", "14h00", "14h45", "15h30"].map((h, row) => {
                        const ok = (col + row) % 3 !== 0;
                        return (
                          <div key={`${col}-${h}`} className="py-1.5 rounded-lg text-center text-xs font-medium transition-colors cursor-pointer" style={{ backgroundColor: ok ? `${C.accent}12` : "#f5f5f5", color: ok ? C.primary : "#d0d0d0" }}>
                            {ok ? h : "-"}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 6. TEMOIGNAGES ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Temoignages</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Avis Patients</h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Stars count={5} />
                <span className="font-heading font-bold" style={{ color: C.dark }}>4.9/5</span>
                <span className="text-sm" style={{ color: C.muted }}>&mdash; 230+ avis Google</span>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {temoignages.map((t) => (
                <motion.div
                  key={t.nom}
                  variants={staggerItemSoft}
                  whileHover={{ y: -4, transition: { ...SPRING_SOFT } }}
                  className="rounded-2xl p-7 border transition-shadow duration-300"
                  style={{ backgroundColor: C.bg, borderColor: `${C.primary}08` }}
                >
                  <Stars count={t.note} />
                  <p className="mt-4 mb-6 text-sm leading-relaxed" style={{ color: C.text }}>&laquo;&nbsp;{t.texte}&nbsp;&raquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})` }} />
                    <span className="font-heading font-semibold text-sm" style={{ color: C.dark }}>{t.nom}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. FAQ ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(180deg, ${C.bg}, ${C.white})` }}>
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
                  className="rounded-2xl border overflow-hidden"
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

        {/* ═══ FOOTER ═══ */}
        <footer style={{ backgroundColor: C.dark }}>
          <div className={`${SECTION.container} py-16`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="lg:col-span-2">
                <h3 className="font-heading font-semibold text-xl text-white mb-3">Cabinet Equilibre</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Osteopathie et kinesitherapie a Nimes. Approche globale et personnalisee depuis 2010.
                </p>
                <div className="flex gap-3">
                  <span className="px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>4.9 Google</span>
                  <span className="px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>Doctolib</span>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white mb-4">Horaires</h4>
                <div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <p>Lun - Ven : 8h30 - 19h00</p>
                  <p>Samedi : 9h00 - 13h00</p>
                  <p style={{ color: C.orange }}>Urgences sur appel</p>
                </div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-white mb-4">Contact</h4>
                <div className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <p>12 Boulevard Victor Hugo</p>
                  <p>30000 Nimes</p>
                  <p>04 66 00 00 00</p>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
              &copy; 2025 Cabinet Equilibre &mdash; Tous droits reserves
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
