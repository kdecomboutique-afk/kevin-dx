"use client";

import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  fadeUp, blurFadeUp, staggerContainer, staggerItem, clipRevealLeft,
  SECTION, DURATION, EASE_SMOOTH, EASE_OUT_EXPO, SPRING_MEDIUM,
  hoverLift, HERO_SEQUENCE, delayedFadeUp, lineRevealX,
} from "@/lib/template-design-system";

/* ── Palette ── */
const P = { primary: "#8B6F47", accent: "#6B7F3A", bg: "#FAF8F5", dark: "#3D2B1F", muted: "#7C6A5A", white: "#FFFFFF", cream: "#F5F0E8" };

/* ── Data ── */
const badges = ["Compagnon du Devoir", "Maitre Artisan", "Label EPV"];
const stats = [
  { val: 30, suffix: " ans", label: "d'experience" },
  { val: 850, suffix: "+", label: "realisations" },
  { val: 100, suffix: "%", label: "sur mesure" },
  { val: 10, suffix: " ans", label: "de garantie" },
];

const expertises = [
  { title: "Menuiserie", desc: "Fenetres, portes, escaliers et agencements interieurs sur mesure.", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" },
  { title: "Ebenisterie", desc: "Meubles d'exception en bois massif, finitions haut de gamme.", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
  { title: "Restauration", desc: "Redonner vie aux meubles anciens tout en preservant leur ame.", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" },
];

const beforeAfterData = [
  { title: "Escalier chene massif", cat: "Menuiserie", before: `linear-gradient(135deg, #8B7355, #6B5B47)`, after: `linear-gradient(135deg, ${P.primary}, ${P.accent})` },
  { title: "Cuisine noyer", cat: "Ebenisterie", before: `linear-gradient(135deg, #7A6B5A, #5A4B3A)`, after: `linear-gradient(135deg, ${P.accent}, ${P.primary})` },
];

const processus = [
  { step: "01", title: "Devis gratuit", desc: "Prise de mesures, ecoute de vos besoins et chiffrage detaille." },
  { step: "02", title: "Conception", desc: "Plans 3D, choix des essences et validation du projet ensemble." },
  { step: "03", title: "Fabrication", desc: "Realisation artisanale dans notre atelier, avec des bois selectionnes." },
  { step: "04", title: "Installation", desc: "Pose soignee chez vous par notre equipe de compagnons." },
];

const temoignages = [
  { name: "Marie & Pierre L.", text: "Un travail exceptionnel sur notre escalier. Le bois est magnifique, les finitions parfaites.", note: 5 },
  { name: "Jean-Marc D.", text: "Notre cuisine sur mesure est exactement ce dont nous revions. L'ecoute et le professionnalisme sont au rendez-vous.", note: 5 },
  { name: "Sophie R.", text: "La restauration de notre commode Louis XV est une reussite totale. Un vrai artisan passionne.", note: 5 },
];

const zones = ["Nimes", "Avignon", "Montpellier", "Orange", "Uzes", "Ales", "Roquemaure", "Villeneuve-les-Avignon"];

/* ── Counter hook ── */
function useCounter(target: number, inView: boolean) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  if (inView && !started.current) {
    started.current = true;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 25);
  }
  return val;
}
function Counter({ target, suffix = "", className = "" }: { target: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const val = useCounter(target, inView);
  return <span ref={ref} className={className}>{val}{suffix}</span>;
}

/* ── BeforeAfter Slider ── */
function BeforeAfterSlider({ before, after, title, cat }: { before: string; after: string; title: string; cat: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const clipPath = useTransform(x, (v) => `inset(0 0 0 ${v}%)`);
  const handleDrag = (e: React.PointerEvent | PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    x.set(Math.max(5, Math.min(95, pct)));
  };
  return (
    <div className="rounded-xl overflow-hidden">
      <div ref={containerRef} className="relative aspect-[16/10] cursor-ew-resize select-none" onPointerMove={(e) => { if (e.buttons === 1) handleDrag(e); }}>
        <div className="absolute inset-0" style={{ background: before }} />
        <motion.div className="absolute inset-0" style={{ background: after, clipPath }} />
        {/* Drag handle */}
        <motion.div className="absolute top-0 bottom-0 w-1 -translate-x-1/2 z-10" style={{ left: useTransform(x, (v) => `${v}%`), background: P.white }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: P.white, background: `${P.primary}CC`, backdropFilter: "blur(4px)" }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
          </div>
        </motion.div>
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(0,0,0,0.5)" }}>Avant</div>
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: `${P.accent}CC` }}>Apres</div>
      </div>
      <div className="p-4" style={{ background: P.white }}>
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: P.accent }}>{cat}</span>
        <h3 className="text-lg font-bold mt-1" style={{ color: P.dark }}>{title}</h3>
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
function Section({ children, bg = P.bg, className = "", id }: { children: React.ReactNode; bg?: string; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section ref={ref} id={id} className={`${SECTION.padding} ${className}`} style={{ background: bg }}>
      <div className={SECTION.container}>
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main Component ── */
export default function MaitreArtisan() {
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="relative" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Floating bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 py-3 px-4 border-t backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.9)", borderColor: `${P.primary}20` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: P.primary }}>
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63" /></svg>
            </div>
            <span className="font-bold" style={{ color: P.dark }}>Maitre Artisan</span>
            <span className="text-xs hidden sm:inline px-2 py-0.5 rounded-full" style={{ background: `${P.primary}15`, color: P.primary }}>Artisan du batiment</span>
          </div>
          <div className="flex gap-2">
            <a href="/templates" className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-black/5" style={{ color: P.muted }}>Retour</a>
            <a href="/contact" className="px-4 py-2 text-sm font-bold text-white rounded-lg" style={{ background: P.primary }}>Utiliser ce template</a>
          </div>
        </div>
      </div>

      <div className="pb-20">
        {/* ─── HERO ─── */}
        <section ref={heroRef} className={SECTION.paddingHero} style={{ background: `radial-gradient(ellipse at 20% 50%, ${P.primary}18 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, ${P.accent}12 0%, transparent 50%), linear-gradient(180deg, ${P.bg} 0%, ${P.cream} 100%)`, minHeight: "85vh", display: "flex", alignItems: "center" }}>
          <div className={SECTION.container}>
            <div className="max-w-4xl">
              {/* Badges */}
              <motion.div className="flex flex-wrap gap-3 mb-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.badge, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                {badges.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: `${P.primary}12`, color: P.primary }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    {b}
                  </span>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6" initial={{ opacity: 0, y: 30, filter: "blur(8px)" }} animate={heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: DURATION.slow, delay: HERO_SEQUENCE.title, ease: [...EASE_SMOOTH] as [number, number, number, number] }} style={{ color: P.dark }}>
                Maitre<br /><span style={{ color: P.primary }}>Artisan</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mb-10" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.subtitle, ease: [...EASE_SMOOTH] as [number, number, number, number] }} style={{ color: P.muted }}>
                30 ans de savoir-faire au service de votre interieur. Menuiserie, ebenisterie et restauration de meubles anciens.
              </motion.p>

              {/* CTA */}
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: DURATION.normal, delay: HERO_SEQUENCE.cta, ease: [...EASE_SMOOTH] as [number, number, number, number] }}>
                <motion.button whileHover={{ scale: 1.04, boxShadow: `0 8px 30px ${P.primary}40` }} whileTap={{ scale: 0.97 }} transition={SPRING_MEDIUM} className="px-8 py-4 rounded-xl font-semibold text-white shadow-lg cursor-pointer" style={{ background: P.primary }}>
                  Demander un devis gratuit
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={SPRING_MEDIUM} className="px-8 py-4 rounded-xl font-semibold border-2 cursor-pointer" style={{ borderColor: P.primary, color: P.primary }}>
                  Voir nos realisations
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <Section bg={P.white} className="!py-12 lg:!py-16">
          <motion.div variants={staggerContainer(0.1, 0)} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <div style={{ color: P.primary }}>
                  <Counter target={s.val} suffix={s.suffix} className="text-3xl sm:text-4xl font-extrabold" />
                </div>
                <p className="text-sm mt-2" style={{ color: P.muted }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ─── EXPERTISE ─── */}
        <Section bg={P.cream}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.accent }}>Expertise</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: P.dark }}>Notre savoir-faire</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.12, 0.2)} className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {expertises.map((e) => (
              <motion.div key={e.title} variants={staggerItem} {...hoverLift} className="bg-white rounded-xl p-8 text-center shadow-md cursor-pointer transition-shadow hover:shadow-xl">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ background: `${P.primary}12`, color: P.primary }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={e.icon} /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: P.dark }}>{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: P.muted }}>{e.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ─── BEFORE / AFTER (Signature) ─── */}
        <Section bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: P.dark }}>Nos realisations avant/apres</h2>
            <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: P.muted }}>Faites glisser pour decouvrir la transformation. Chaque projet est une histoire unique.</p>
          </motion.div>
          <motion.div variants={staggerContainer(0.15, 0.2)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beforeAfterData.map((ba) => (
              <motion.div key={ba.title} variants={staggerItem}>
                <BeforeAfterSlider {...ba} />
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ─── PROCESSUS ─── */}
        <Section bg={P.cream}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Comment nous travaillons</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: P.dark }}>Notre processus</h2>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <motion.div variants={staggerContainer(0.12, 0.2)}>
              {processus.map((p, i) => (
                <motion.div key={p.step} variants={staggerItem} className="flex gap-6 mb-10 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: P.primary }}>{p.step}</div>
                    {i < processus.length - 1 && <motion.div variants={lineRevealX} className="w-px flex-1 mt-2 origin-top" style={{ background: `${P.primary}30` }} />}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-xl font-bold mb-2" style={{ color: P.dark }}>{p.title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: P.muted }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ─── DEVIS ─── */}
        <Section bg={P.white}>
          <div className="max-w-3xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Contact</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4" style={{ color: P.dark }}>Demandez votre devis</h2>
              <p className="text-lg" style={{ color: P.muted }}>Decrivez votre projet, nous vous repondrons sous 48h.</p>
            </motion.div>
            <motion.div variants={delayedFadeUp(0.2)} className="rounded-2xl p-8 sm:p-10" style={{ background: P.cream }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[{ label: "Nom", ph: "Votre nom" }, { label: "Telephone", ph: "06 00 00 00 00" }].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>{f.label}</label>
                    <input type="text" placeholder={f.ph} className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm" style={{ borderColor: `${P.primary}30`, color: P.dark }} readOnly />
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Email</label>
                <input type="text" placeholder="votre@email.com" className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm" style={{ borderColor: `${P.primary}30`, color: P.dark }} readOnly />
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium mb-2" style={{ color: P.dark }}>Decrivez votre projet</label>
                <textarea rows={4} placeholder="Type de meuble, dimensions, essence de bois souhaitee..." className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm resize-none" style={{ borderColor: `${P.primary}30`, color: P.dark }} readOnly />
              </div>
              <motion.button whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${P.primary}40` }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-xl font-semibold text-white cursor-pointer" style={{ background: P.primary }}>
                Envoyer ma demande de devis
              </motion.button>
            </motion.div>
          </div>
        </Section>

        {/* ─── TEMOIGNAGES ─── */}
        <Section bg={P.cream}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.accent }}>Avis clients</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: P.dark }}>Ils nous font confiance</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.12, 0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {temoignages.map((t) => (
              <motion.div key={t.name} variants={staggerItem} {...hoverLift} className="bg-white rounded-xl p-8 shadow-md cursor-pointer">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.note }).map((_, j) => (
                    <svg key={j} className="w-5 h-5" fill={P.primary} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: P.muted }}>&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold" style={{ color: P.dark }}>{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* ─── ZONE D'INTERVENTION ─── */}
        <Section bg={P.white}>
          <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: P.primary }}>Proximite</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3" style={{ color: P.dark }}>Zone d&apos;intervention</h2>
          </motion.div>
          <motion.div variants={staggerContainer(0.06, 0.2)} className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
            {zones.map((z) => (
              <motion.span key={z} variants={staggerItem} className="px-5 py-2.5 rounded-full text-sm font-medium border cursor-pointer transition-colors hover:text-white" style={{ borderColor: `${P.primary}30`, color: P.primary }} whileHover={{ background: P.primary, color: P.white, borderColor: P.primary }}>
                {z}
              </motion.span>
            ))}
          </motion.div>
          <motion.p variants={delayedFadeUp(0.5)} className="text-center text-sm mt-8" style={{ color: P.muted }}>
            Intervention dans un rayon de 60 km autour de Roquemaure (30150)
          </motion.p>
        </Section>
      </div>
    </div>
  );
}
