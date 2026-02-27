"use client";

import { useState, useCallback } from "react";
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
  primary: "#C77D9E",
  accent: "#E8C4B8",
  bg: "#FDF8F6",
  dark: "#2C2C2C",
  text: "#3D3535",
  muted: "#9E8E8E",
  white: "#FFFFFF",
  blush: "#F5E6E0",
  gold: "#D4A574",
};

/* ─── DATA ─── */
type CatKey = "visage" | "corps" | "bienetre";
const categories: { key: CatKey; label: string }[] = [
  { key: "visage", label: "Visage" },
  { key: "corps", label: "Corps" },
  { key: "bienetre", label: "Bien-etre" },
];

const soinsData: Record<CatKey, { nom: string; desc: string; duree: string; prix: string; best?: boolean }[]> = {
  visage: [
    { nom: "Soin Eclat Vitamine C", desc: "Teint lumineux et uniforme grace a un cocktail d'antioxydants purs", duree: "1h", prix: "95 EUR", best: true },
    { nom: "Hydratation Profonde", desc: "Repulpe et hydrate en profondeur pour une peau rebondie", duree: "45min", prix: "80 EUR" },
    { nom: "Anti-Age Lifting Naturel", desc: "Stimule le collagene, raffermit et lisse les traits", duree: "1h15", prix: "120 EUR", best: true },
    { nom: "Peeling Doux Regenerant", desc: "Elimine les cellules mortes et revele l'eclat naturel", duree: "30min", prix: "55 EUR" },
    { nom: "Soin Purete Peau Nette", desc: "Nettoyage en profondeur, extraction et masque purifiant", duree: "1h", prix: "85 EUR" },
  ],
  corps: [
    { nom: "Modelage Relaxant Signature", desc: "Massage aux huiles essentielles bio, dissout le stress", duree: "1h", prix: "90 EUR", best: true },
    { nom: "Enveloppement Detox Algues", desc: "Drainant et purifiant, affine la silhouette", duree: "1h15", prix: "110 EUR" },
    { nom: "Gommage Corps Sucre", desc: "Exfoliation douce qui laisse la peau satinee", duree: "45min", prix: "65 EUR" },
    { nom: "Massage Pierres Chaudes", desc: "Relaxation musculaire profonde par la chaleur", duree: "1h30", prix: "130 EUR", best: true },
    { nom: "Rituel Jambes Legeres", desc: "Drainage et modelage pour des jambes legeres", duree: "45min", prix: "75 EUR" },
  ],
  bienetre: [
    { nom: "Rituel Hammam Privatif", desc: "Vapeur purifiante, gommage et modelage relaxant", duree: "1h30", prix: "140 EUR", best: true },
    { nom: "Reflexologie Plantaire", desc: "Stimule les zones reflexes pour un equilibre total", duree: "45min", prix: "70 EUR" },
    { nom: "Soin Ayurvedique Abhyanga", desc: "Massage complet a l'huile tiede, equilibre les energies", duree: "1h15", prix: "115 EUR" },
    { nom: "Parenthese Duo", desc: "Experience bien-etre a partager en cabine double", duree: "1h30", prix: "220 EUR", best: true },
  ],
};

const beforeAfter = [
  { type: "Soin Eclat Visage", result: "Apres 3 seances", gBefore: `linear-gradient(135deg, #C4B8B0, #A89E96)`, gAfter: `linear-gradient(135deg, ${C.blush}, ${C.primary}50)` },
  { type: "Peeling Regenerant", result: "Apres 2 seances", gBefore: `linear-gradient(135deg, #B8ADA5, #9E9490)`, gAfter: `linear-gradient(135deg, #FDE8E0, ${C.gold}60)` },
  { type: "Anti-Age Lifting", result: "Apres 5 seances", gBefore: `linear-gradient(135deg, #C0B5AD, #A69B93)`, gAfter: `linear-gradient(135deg, ${C.blush}, ${C.primary}40)` },
];

const equipe = [
  { nom: "Sophie Martin", role: "Directrice & Estheticienne", specs: ["Soins visage", "Anti-age", "Diagnostic peau"], cite: "La beaute est un equilibre entre le soin et la confiance en soi." },
  { nom: "Clara Dubois", role: "Praticienne Bien-etre", specs: ["Massage", "Reflexologie", "Ayurveda"], cite: "Chaque massage est une conversation entre mes mains et votre corps." },
  { nom: "Amira Benali", role: "Specialiste Corps & Spa", specs: ["Hammam", "Enveloppements", "Gommages"], cite: "Le bien-etre commence quand on s'accorde du temps pour soi." },
];

const bookingSoins = [
  { nom: "Soin Eclat Vitamine C", duree: "1h", prix: "95 EUR" },
  { nom: "Modelage Relaxant", duree: "1h", prix: "90 EUR" },
  { nom: "Rituel Hammam Privatif", duree: "1h30", prix: "140 EUR" },
  { nom: "Anti-Age Lifting", duree: "1h15", prix: "120 EUR" },
];

const avisData = [
  { prenom: "Camille R.", texte: "Un moment hors du temps. Le soin eclat vitamine C a transforme ma peau, je rayonne !" },
  { prenom: "Lea M.", texte: "L'ambiance est divine, on se sent dans un cocon. Le hammam privatif est une pepite." },
  { prenom: "Nathalie P.", texte: "Sophie a des mains en or. Mon soin anti-age a visiblement repulpe ma peau en 3 seances." },
  { prenom: "Isabelle D.", texte: "Le massage pierres chaudes est incroyable. On repart legere et detendue. Merci !" },
];

/* ─── HELPERS ─── */
function Stars5() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" fill={C.primary} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ─── SHIMMER CARD — Signature animation ─── */
function ShimmerCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {/* Shimmer sweep on hover */}
      <div
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10"
        style={{ background: `linear-gradient(90deg, transparent, ${C.gold}15, transparent)` }}
      />
      {children}
    </div>
  );
}

const zen = TYPOGRAPHY.zen;

/* ─── MAIN COMPONENT ─── */
export default function EclatBeaute() {
  const [activeTab, setActiveTab] = useState<CatKey>("visage");
  const [sliders, setSliders] = useState([50, 50, 50]);
  const [step, setStep] = useState(1);
  const [selSoin, setSelSoin] = useState<number | null>(null);
  const [selCreneau, setSelCreneau] = useState<string | null>(null);

  const handleSlider = useCallback((idx: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    setSliders((p) => { const n = [...p]; n[idx] = pct; return n; });
  }, []);

  const handleSliderTouch = useCallback((idx: number, e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, ((e.touches[0].clientX - rect.left) / rect.width) * 100));
    setSliders((p) => { const n = [...p]; n[idx] = pct; return n; });
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: C.bg }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t py-3 px-4" style={{ borderColor: `${C.primary}15` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-semibold italic" style={{ color: C.primary }}>Eclat Beaute</span>
            <span className="text-sm hidden sm:inline" style={{ color: C.muted }}>&#8226; Institut de beaute &amp; spa</span>
          </div>
          <div className="flex gap-3">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-xl" style={{ color: C.muted }}>Retour</a>
            <a href="/devis?pack=template-beaute" className="px-4 py-2 text-sm font-medium rounded-xl text-white" style={{ backgroundColor: C.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ═══ 1. HERO GLAMOUR ═══ */}
        <section className={`relative min-h-screen flex items-center overflow-hidden ${SECTION.paddingHero}`} style={{ backgroundColor: C.bg }}>
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: C.primary, filter: "blur(80px)", opacity: 0.1 }} />
          <div className="absolute bottom-1/3 left-[15%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: C.gold, filter: "blur(80px)", opacity: 0.08 }} />

          <div className={SECTION.container}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center relative z-10">
              <div className="lg:col-span-3">
                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                  initial="hidden" animate="visible"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
                  style={{ backgroundColor: `${C.primary}12`, color: C.primary }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-sm font-medium">4.9/5 sur Google &mdash; 200+ avis</span>
                </motion.div>

                <motion.h1
                  variants={delayedBlurFade(HERO_SEQUENCE.title)}
                  initial="hidden" animate="visible"
                  className={`${zen.heroTitle} mb-6 leading-[1.05]`}
                  style={{ color: C.text }}
                >
                  <em className="not-italic font-extralight italic">Revelez</em> votre<br />
                  <span className="font-semibold" style={{ color: C.primary }}>beaute naturelle</span>
                </motion.h1>

                <motion.p
                  variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                  initial="hidden" animate="visible"
                  className={`${zen.subtitle} mb-10 max-w-lg`}
                  style={{ color: C.muted }}
                >
                  Institut de beaute &amp; spa &mdash; Soins du visage, corps et bien-etre dans un ecrin de douceur
                </motion.p>

                <motion.div
                  variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                  initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row gap-4 items-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: `0 16px 40px ${C.primary}30` }}
                    whileTap={{ scale: 0.98 }}
                    transition={SPRING_SOFT}
                    className="px-8 py-4 rounded-full text-white text-lg font-medium"
                    style={{ backgroundColor: C.primary, boxShadow: `0 12px 32px ${C.primary}25` }}
                  >
                    Prendre rendez-vous
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="inline-flex items-center gap-2 px-4 py-4 text-lg font-light"
                    style={{ color: C.muted }}
                  >
                    Decouvrir nos soins <span>&darr;</span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Hero visual */}
              <motion.div
                variants={delayedBlurFade(HERO_SEQUENCE.visual)}
                initial="hidden" animate="visible"
                className="lg:col-span-2 relative"
              >
                <div className="aspect-[3/4] rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${C.blush}, ${C.primary}30 50%, ${C.gold}25)` }}>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.12 }}>
                    <svg className="w-48 h-48" fill="none" viewBox="0 0 100 100" stroke={C.primary} strokeWidth={0.5}>
                      <circle cx="50" cy="50" r="45" /><circle cx="50" cy="50" r="30" /><circle cx="50" cy="50" r="15" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: `linear-gradient(to top, ${C.primary}15, transparent)` }} />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 sm:-left-8 bg-white rounded-2xl px-5 py-3"
                  style={{ boxShadow: `0 8px 32px ${C.primary}12` }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: EASE_IN_OUT }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${C.primary}15` }}>
                      <svg className="w-5 h-5" fill={C.primary} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-sm" style={{ color: C.text }}>200+</div>
                      <div className="text-xs" style={{ color: C.muted }}>clientes satisfaites</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ 2. PRESTATIONS — Tabs ═══ */}
        <section id="prestations" className={SECTION.padding} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Nos soins</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Carte des Prestations</h2>
              <p className={`${zen.subtitle} mt-4 max-w-2xl mx-auto`} style={{ color: C.muted }}>
                Des soins d&apos;exception realises par nos expertes avec des produits haut de gamme
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 sm:gap-8 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className="relative px-4 sm:px-6 py-3 text-base sm:text-lg font-medium transition-colors"
                  style={{ color: activeTab === cat.key ? C.primary : C.muted }}
                >
                  {cat.label}
                  {activeTab === cat.key && (
                    <motion.div
                      layoutId="prestationTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: C.primary }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Soins list */}
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: DURATION.normal, ease: EASE_SMOOTH }}
                  className="divide-y"
                  style={{ borderColor: `${C.primary}10` }}
                >
                  {soinsData[activeTab].map((s, i) => (
                    <ShimmerCard key={s.nom}>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        className="py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-heading font-semibold text-lg" style={{ color: C.text }}>{s.nom}</h3>
                            {s.best && (
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${C.gold}20`, color: C.gold }}>BEST-SELLER</span>
                            )}
                          </div>
                          <p className="text-sm mt-1 font-light" style={{ color: C.muted }}>{s.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                          <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: `${C.primary}10`, color: C.primary }}>{s.duree}</span>
                          <span className="font-heading font-bold text-lg tabular-nums" style={{ color: C.primary }}>{s.prix}</span>
                        </div>
                      </motion.div>
                    </ShimmerCard>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ═══ 3. AVANT / APRES — Slider ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.gold }}>Resultats</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Avant &amp; Apres</h2>
              <p className={`${zen.subtitle} mt-4 max-w-xl mx-auto`} style={{ color: C.muted }}>
                Glissez pour decouvrir la transformation
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {beforeAfter.map((item, idx) => (
                <motion.div key={item.type} variants={staggerItemSoft}>
                  <div
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-col-resize select-none"
                    style={{ boxShadow: `0 8px 32px ${C.primary}10` }}
                    onMouseMove={(e) => handleSlider(idx, e)}
                    onTouchMove={(e) => handleSliderTouch(idx, e)}
                  >
                    {/* Before */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: item.gBefore }}>
                      <span className="text-sm font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>Avant</span>
                    </div>
                    {/* After */}
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: item.gAfter, clipPath: `inset(0 0 0 ${sliders[idx]}%)` }}>
                      <span className="text-sm font-medium uppercase tracking-widest" style={{ color: C.primary }}>Apres</span>
                    </div>
                    {/* Slider handle */}
                    <div className="absolute top-0 bottom-0 w-0.5 pointer-events-none z-10" style={{ left: `${sliders[idx]}%`, backgroundColor: C.white, boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}>
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: C.white, boxShadow: `0 2px 12px ${C.primary}30` }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke={C.primary} strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M16 15l-4 4-4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="font-heading font-semibold" style={{ color: C.text }}>{item.type}</h3>
                    <p className="text-sm mt-1 font-light" style={{ color: C.muted }}>{item.result}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 4. L'EQUIPE ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.blush }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Notre equipe</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Nos Expertes</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
              {equipe.map((m, idx) => (
                <ShimmerCard key={m.nom} className="rounded-3xl">
                  <motion.div
                    variants={staggerItemSoft}
                    whileHover={{ y: -4, transition: { ...SPRING_SOFT } }}
                    className="text-center bg-white/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 transition-shadow duration-500"
                    style={{ boxShadow: `0 4px 24px ${C.primary}08` }}
                  >
                    <div
                      className="w-32 h-32 mx-auto rounded-full mb-6"
                      style={{
                        background: idx === 0 ? `linear-gradient(135deg, ${C.primary}, ${C.gold})` : idx === 1 ? `linear-gradient(135deg, ${C.gold}, ${C.primary})` : `linear-gradient(135deg, ${C.blush}, ${C.primary}90)`,
                        boxShadow: `0 8px 24px ${C.primary}20`,
                      }}
                    />
                    <h3 className="font-heading font-semibold text-xl" style={{ color: C.text }}>{m.nom}</h3>
                    <p className="text-sm font-medium mt-1" style={{ color: C.primary }}>{m.role}</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {m.specs.map((s) => (
                        <span key={s} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: `${C.primary}10`, color: C.primary }}>{s}</span>
                      ))}
                    </div>
                    <p className="text-sm italic mt-5 font-light leading-relaxed" style={{ color: C.muted }}>&laquo;&nbsp;{m.cite}&nbsp;&raquo;</p>
                  </motion.div>
                </ShimmerCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 5. BOOKING — 3 etapes ═══ */}
        <section className={SECTION.padding} style={{ background: `linear-gradient(135deg, ${C.primary}12, ${C.blush} 50%, ${C.gold}12)` }}>
          <div className={`${SECTION.container} relative z-10`}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGapCompact}`}
            >
              <h2 className={`${zen.sectionTitle}`} style={{ color: C.dark }}>Reservez votre moment de bien-etre</h2>
              <p className={`${zen.subtitle} mt-4`} style={{ color: C.muted }}>En 3 etapes simples</p>
            </motion.div>

            {/* Progress */}
            <motion.div
              variants={blurFadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2" style={{ backgroundColor: `${C.primary}20` }} />
                <motion.div
                  className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2"
                  style={{ backgroundColor: C.primary }}
                  animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
                  transition={{ duration: 0.4 }}
                />
                {[1, 2, 3].map((s) => (
                  <button key={s} onClick={() => { if (s < step) setStep(s); }} className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm"
                      animate={{
                        backgroundColor: s <= step ? C.primary : C.white,
                        color: s <= step ? C.white : C.muted,
                        scale: s === step ? 1.15 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ boxShadow: s <= step ? `0 4px 16px ${C.primary}30` : "0 2px 8px rgba(0,0,0,0.06)" }}
                    >
                      {s}
                    </motion.div>
                    <span className="text-xs font-medium hidden sm:block" style={{ color: s <= step ? C.primary : C.muted }}>
                      {s === 1 ? "Soin" : s === 2 ? "Date" : "Coordonnees"}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Form card */}
            <motion.div
              variants={blurFadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 lg:p-12"
              style={{ backgroundColor: C.white, boxShadow: `0 16px 48px ${C.primary}10` }}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-heading font-semibold text-xl mb-6" style={{ color: C.text }}>Choisissez votre soin</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {bookingSoins.map((soin, i) => (
                        <motion.button
                          key={soin.nom}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setSelSoin(i); setStep(2); }}
                          className="text-left p-5 rounded-2xl border-2 transition-all"
                          style={{ borderColor: selSoin === i ? C.primary : `${C.primary}15`, backgroundColor: selSoin === i ? `${C.primary}08` : C.white }}
                        >
                          <h4 className="font-heading font-semibold text-sm" style={{ color: C.text }}>{soin.nom}</h4>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${C.primary}10`, color: C.primary }}>{soin.duree}</span>
                            <span className="font-heading font-bold text-sm" style={{ color: C.primary }}>{soin.prix}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-heading font-semibold text-xl mb-6" style={{ color: C.text }}>Choisissez votre creneau</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>Date souhaitee</label>
                        <div className="w-full h-12 rounded-xl border px-4 flex items-center text-sm" style={{ borderColor: `${C.primary}20`, backgroundColor: C.bg, color: C.muted }}>jj / mm / aaaa</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: C.text }}>Creneau prefere</label>
                        <div className="flex gap-3">
                          {["Matin", "Apres-midi", "Soir"].map((c) => (
                            <motion.button
                              key={c}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelCreneau(c)}
                              className="flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all"
                              style={{ borderColor: selCreneau === c ? C.primary : `${C.primary}15`, backgroundColor: selCreneau === c ? `${C.primary}10` : C.white, color: selCreneau === c ? C.primary : C.muted }}
                            >
                              {c}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl font-medium text-sm border" style={{ borderColor: `${C.primary}20`, color: C.muted }}>Retour</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(3)} className="flex-[2] py-3.5 rounded-xl text-white font-medium text-sm" style={{ backgroundColor: C.primary, boxShadow: `0 8px 24px ${C.primary}25` }}>Continuer</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                    <h3 className="font-heading font-semibold text-xl mb-6" style={{ color: C.text }}>Vos coordonnees</h3>
                    <div className="space-y-5">
                      {[{ l: "Nom complet", p: "Marie Dupont" }, { l: "Telephone", p: "06 12 34 56 78" }, { l: "Email", p: "marie@exemple.fr" }].map((f) => (
                        <div key={f.l}>
                          <label className="block text-sm font-medium mb-2" style={{ color: C.text }}>{f.l}</label>
                          <div className="w-full h-12 rounded-xl border px-4 flex items-center text-sm" style={{ borderColor: `${C.primary}20`, backgroundColor: C.bg, color: C.muted }}>{f.p}</div>
                        </div>
                      ))}
                      <div className="flex gap-3 pt-2">
                        <motion.button whileHover={{ scale: 1.02 }} onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl font-medium text-sm border" style={{ borderColor: `${C.primary}20`, color: C.muted }}>Retour</motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-[2] py-3.5 rounded-xl text-white font-semibold text-sm"
                          style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.gold})`, boxShadow: `0 8px 24px ${C.primary}30` }}
                        >
                          Confirmer mon rendez-vous
                        </motion.button>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 text-xs" style={{ color: C.muted }}>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          Annulation gratuite 24h avant
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          SMS de confirmation
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ═══ 6. PRODUITS UTILISES ═══ */}
        <section className={SECTION.paddingCompact} style={{ backgroundColor: C.white }}>
          <div className={SECTION.container}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`text-center ${SECTION.titleGapCompact}`}>
              <span className={zen.caption} style={{ color: C.gold }}>Qualite</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Nos Produits</h2>
            </motion.div>
            <motion.div variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
              {[{ name: "Biologique Recherche", desc: "Soins visage haute performance" }, { name: "Thalgo", desc: "Expertise marine corps" }, { name: "Nuxe", desc: "Huiles et soins naturels" }, { name: "Maria Galland", desc: "Anti-age et eclat" }].map((prod) => (
                <ShimmerCard key={prod.name} className="rounded-2xl">
                  <motion.div variants={staggerItemSoft} className="flex items-center gap-4 px-6 py-4 rounded-2xl border" style={{ borderColor: `${C.gold}20`, backgroundColor: C.white }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${C.gold}20, ${C.primary}10)` }}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={C.gold} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
                    </div>
                    <div><h4 className="font-heading font-semibold text-sm" style={{ color: C.dark }}>{prod.name}</h4><p className="text-xs" style={{ color: C.muted }}>{prod.desc}</p></div>
                  </motion.div>
                </ShimmerCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ 7. AVIS CLIENTS ═══ */}
        <section className={SECTION.padding} style={{ backgroundColor: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              variants={fadeUp}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className={`text-center ${SECTION.titleGap}`}
            >
              <span className={zen.caption} style={{ color: C.primary }}>Temoignages</span>
              <h2 className={`${zen.sectionTitle} mt-4`} style={{ color: C.dark }}>Ce qu&apos;elles en disent</h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.1, 0.15)}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {avisData.map((a) => (
                <ShimmerCard key={a.prenom} className="rounded-2xl">
                  <motion.div
                    variants={staggerItemSoft}
                    className="rounded-2xl p-7 border transition-shadow duration-300 hover:shadow-lg"
                    style={{ backgroundColor: C.white, borderColor: `${C.primary}10`, boxShadow: `0 2px 12px ${C.primary}05` }}
                  >
                    <Stars5 />
                    <p className="mt-4 mb-6 text-sm leading-relaxed font-light" style={{ color: C.text }}>&laquo;&nbsp;{a.texte}&nbsp;&raquo;</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full" style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.gold})` }} />
                        <span className="font-heading font-semibold text-sm" style={{ color: C.text }}>{a.prenom}</span>
                      </div>
                      <span className="text-xs font-medium flex items-center gap-1" style={{ color: C.gold }}>
                        Verifie
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    </div>
                  </motion.div>
                </ShimmerCard>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer style={{ backgroundColor: C.dark }}>
          <div className={`${SECTION.container} py-16 lg:py-20`}>
            <div className="text-center mb-12">
              <h3 className="font-heading text-3xl font-semibold italic" style={{ color: C.primary }}>Eclat Beaute</h3>
              <p className="text-sm mt-2 font-light" style={{ color: "rgba(255,255,255,0.4)" }}>Institut de beaute &amp; spa</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: C.primary }}>Horaires</h4>
                <div className="space-y-2 text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}><p>Lun &ndash; Ven : 9h &ndash; 19h</p><p>Samedi : 9h &ndash; 18h</p><p>Dimanche : Ferme</p></div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: C.primary }}>Nous trouver</h4>
                <div className="space-y-2 text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}><p>12 Rue de la Paix</p><p>75002 Paris</p><p>01 42 00 00 00</p></div>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: C.primary }}>Suivez-nous</h4>
                <div className="flex gap-4 justify-center md:justify-start">
                  {["Instagram", "Facebook", "TikTok"].map((s) => (
                    <motion.span key={s} whileHover={{ scale: 1.15, y: -2 }} className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>{s[0]}</motion.span>
                  ))}
                </div>
                <motion.span whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 mt-6 text-sm font-medium cursor-pointer" style={{ color: C.gold }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18" /></svg>
                  Offrez un bon cadeau
                </motion.span>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-xs font-light" style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)" }}>&copy; 2025 Eclat Beaute &mdash; Tous droits reserves</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
