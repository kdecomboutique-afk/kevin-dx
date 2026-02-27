"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  EASE_IN_OUT,
  SPRING_SOFT,
  SPRING_MEDIUM,
  DURATION,
  fadeUp,
  blurFadeUp,
  clipRevealLeft,
  lineRevealX,
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
  primary: "#1B365D",
  accent: "#C9A227",
  bg: "#F8F9FC",
  dark: "#0E1B33",
  muted: "#64748B",
  light: "#E8ECF4",
  white: "#FFFFFF",
};

// ─── DATA ───
const biens = [
  { titre: "Mas Provençal", prix: "685 000", surface: "180", pieces: 5, lieu: "Uzès", badge: "Exclusivité", gradient: `linear-gradient(135deg, ${C.primary} 0%, #2A5298 100%)` },
  { titre: "Appartement T4", prix: "329 000", surface: "98", pieces: 4, lieu: "Nîmes Écusson", badge: "Coup de coeur", gradient: `linear-gradient(135deg, #2A5298 0%, #4A7CC9 100%)` },
  { titre: "Villa Contemporaine", prix: "525 000", surface: "155", pieces: 6, lieu: "Montpellier", badge: "Nouveau", gradient: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)` },
  { titre: "Loft Rénové", prix: "245 000", surface: "72", pieces: 3, lieu: "Avignon Intra-Muros", badge: "Rare", gradient: `linear-gradient(135deg, #4A7CC9 0%, ${C.primary} 100%)` },
  { titre: "Bastide avec Parc", prix: "890 000", surface: "320", pieces: 8, lieu: "Luberon", badge: "Prestige", gradient: `linear-gradient(135deg, ${C.accent}80 0%, ${C.primary} 100%)` },
];

const services = [
  { titre: "Achat", desc: "Accompagnement personnalisé de la recherche à la signature. Plus de 200 biens en catalogue.", icon: "M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
  { titre: "Vente", desc: "Estimation précise, photos professionnelles, diffusion multi-supports, suivi complet jusqu'au notaire.", icon: "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { titre: "Gestion locative", desc: "Recherche de locataires, états des lieux, suivi technique et administratif. Sérénité garantie.", icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" },
];

const agents = [
  { nom: "Sophie Martin", role: "Directrice", specialite: "Maisons & villas", initials: "SM" },
  { nom: "Thomas Dubois", role: "Conseiller senior", specialite: "Investissement locatif", initials: "TD" },
  { nom: "Claire Laurent", role: "Experte", specialite: "Biens de prestige", initials: "CL" },
];

const stats = [
  { val: 200, suffix: "+", label: "Biens en catalogue" },
  { val: 15, suffix: " ans", label: "D'expérience" },
  { val: 98, suffix: "%", label: "Clients satisfaits" },
  { val: 45, suffix: " jours", label: "Délai moyen de vente" },
];

const searchTabs = ["Acheter", "Louer", "Estimer"];

// ─── ANIMATED COUNTER ───
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {target}{suffix}
      </motion.span>
    </motion.span>
  );
}

// ─── PROPERTY CAROUSEL (Signature Animation) ───
function PropertyCarousel() {
  const [active, setActive] = useState(0);
  const visibleCount = 3;

  const next = () => setActive((p) => (p + 1) % biens.length);
  const prev = () => setActive((p) => (p - 1 + biens.length) % biens.length);

  const getVisible = () => {
    const items = [];
    for (let i = 0; i < visibleCount; i++) {
      items.push(biens[(active + i) % biens.length]);
    }
    return items;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          {biens.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
              style={{ width: i === active ? 32 : 12, background: i === active ? C.accent : `${C.primary}20` }}
            >
              {i === active && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: C.accent }}
                  layoutId="carousel-indicator"
                  transition={SPRING_MEDIUM}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:border-[#C9A227]" style={{ borderColor: `${C.primary}20` }}>
            <svg className="w-4 h-4" style={{ color: C.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={next} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-90" style={{ background: C.primary, color: C.white }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {getVisible().map((bien, i) => (
            <motion.div
              key={`${bien.titre}-${(active + i) % biens.length}`}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.95 }}
              transition={{ ...SPRING_SOFT, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-sm" style={{ background: bien.gradient }}>
                <div className="aspect-[4/3] flex items-center justify-center">
                  <svg className="w-16 h-16 opacity-10" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase" style={{ background: C.accent, color: C.dark }}>
                    {bien.badge}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-3 text-white/80 text-xs">
                  <span>{bien.surface} m²</span>
                  <span>{bien.pieces} pcs</span>
                </div>
              </div>
              <div className="pt-4 pb-2">
                <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: C.muted }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {bien.lieu}
                </div>
                <h3 className="text-lg font-light tracking-tight" style={{ color: C.dark }}>{bien.titre}</h3>
                <p className="text-xl font-light mt-1" style={{ color: C.primary }}>{bien.prix} &euro;</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export default function HorizonImmo() {
  const [searchTab, setSearchTab] = useState(0);

  return (
    <div className="relative" id="template-immobilier" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="pb-20">

        {/* ═══════════════ 1. HERO ═══════════════ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden" style={{ background: C.bg }}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[50%] h-full opacity-[0.03]" style={{ background: `repeating-linear-gradient(45deg, ${C.primary} 0, ${C.primary} 1px, transparent 0, transparent 40px)` }} />
          <motion.div
            className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full opacity-[0.06]"
            style={{ background: `radial-gradient(circle, ${C.accent} 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: EASE_IN_OUT }}
          />

          <div className={SECTION.container + " relative z-10"}>
            <div className="max-w-4xl">
              <motion.div
                className="flex items-center gap-3 mb-8"
                variants={delayedBlurFade(HERO_SEQUENCE.badge)}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="h-px w-12 origin-left" style={{ background: C.accent }} variants={lineRevealX} initial="hidden" animate="visible" />
                <span className={TYPOGRAPHY.luxury.caption} style={{ color: C.accent, letterSpacing: "0.2em" }}>Agence immobiliere depuis 2009</span>
              </motion.div>

              <motion.h1
                className={TYPOGRAPHY.luxury.heroTitle + " leading-[0.95] mb-6"}
                variants={delayedBlurFade(HERO_SEQUENCE.title)}
                initial="hidden"
                animate="visible"
              >
                <span style={{ color: C.primary }}>Horizon</span>{" "}
                <span style={{ color: C.accent }}>Immo</span>
              </motion.h1>

              <motion.p
                className={TYPOGRAPHY.luxury.subtitle + " mb-12 max-w-xl"}
                style={{ color: C.muted }}
                variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
                initial="hidden"
                animate="visible"
              >
                Votre partenaire immobilier de confiance dans le Gard et l&apos;Herault. Achat, vente, gestion locative.
              </motion.p>

              {/* Search bar */}
              <motion.div
                className="max-w-2xl"
                variants={delayedBlurFade(HERO_SEQUENCE.cta)}
                initial="hidden"
                animate="visible"
              >
                <div className="flex gap-1 mb-4">
                  {searchTabs.map((tab, i) => (
                    <button
                      key={tab}
                      onClick={() => setSearchTab(i)}
                      className="relative px-5 py-2 text-sm transition-colors"
                      style={{ color: searchTab === i ? C.primary : C.muted }}
                    >
                      {tab}
                      {searchTab === i && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ background: C.accent }}
                          layoutId="search-tab"
                          transition={SPRING_MEDIUM}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex rounded-sm overflow-hidden shadow-lg" style={{ background: C.white }}>
                  <div className="flex-1 px-5 py-4 border-r" style={{ borderColor: C.light }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Localisation</div>
                    <div className="text-sm font-light" style={{ color: C.dark }}>Nîmes, Montpellier...</div>
                  </div>
                  <div className="flex-1 px-5 py-4 border-r" style={{ borderColor: C.light }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Type de bien</div>
                    <div className="text-sm font-light" style={{ color: C.dark }}>Maison, Appartement</div>
                  </div>
                  <div className="flex-1 px-5 py-4 border-r" style={{ borderColor: C.light }}>
                    <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: C.muted }}>Budget</div>
                    <div className="text-sm font-light" style={{ color: C.dark }}>200 000 - 600 000</div>
                  </div>
                  <motion.button
                    className="px-8 flex items-center gap-2 text-sm font-medium tracking-wider"
                    style={{ background: C.primary, color: C.white }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    Rechercher
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-12 mt-16"
              variants={delayedBlurFade(HERO_SEQUENCE.stats)}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-8" style={{ background: `${C.primary}15` }} />}
                  <div>
                    <div className="text-2xl font-light" style={{ color: C.primary }}>
                      <Counter target={stat.val} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs tracking-wide" style={{ color: C.muted }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 2. BIENS EN VEDETTE (Signature: property-carousel-smooth) ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              className="flex items-end justify-between mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div>
                <span className={TYPOGRAPHY.luxury.caption} style={{ color: C.accent, letterSpacing: "0.2em" }}>Selection</span>
                <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.dark }}>
                  Biens en Vedette
                </h2>
              </div>
              <button className="hidden sm:flex items-center gap-2 text-sm tracking-wide transition-colors group" style={{ color: C.primary }}>
                Voir le catalogue
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </motion.div>

            <PropertyCarousel />
          </div>
        </section>

        {/* ═══════════════ 3. SERVICES ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.bg }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.luxury.caption} style={{ color: C.accent, letterSpacing: "0.2em" }}>Nos metiers</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.dark }}>Services Immobiliers</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer(0.12, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((s) => (
                <motion.div
                  key={s.titre}
                  variants={staggerItemSoft}
                  className="group p-8 border transition-all duration-500 hover:shadow-lg rounded-sm cursor-pointer"
                  style={{ background: C.white, borderColor: `${C.primary}08` }}
                  {...hoverLift}
                >
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-[#C9A227]"
                    style={{ background: `${C.primary}08`, color: C.primary }}
                  >
                    <svg className="w-6 h-6 transition-colors duration-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-light tracking-tight mb-3" style={{ color: C.dark }}>{s.titre}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 4. ESTIMATION GRATUITE ═══════════════ */}
        <section className="relative overflow-hidden" style={{ background: C.primary }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${C.accent} 0, ${C.accent} 1px, transparent 0, transparent 80px)` }} />
          <div className={SECTION.container + " " + SECTION.padding}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className={TYPOGRAPHY.luxury.caption} style={{ color: `${C.accent}`, letterSpacing: "0.2em" }}>Estimation</span>
                <h2 className="text-4xl sm:text-5xl font-light tracking-tight mt-4 mb-6" style={{ color: C.white }}>
                  Estimez votre bien<br />
                  <span style={{ color: C.accent }}>gratuitement</span>
                </h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: `${C.white}99` }}>
                  Notre algorithme analyse les transactions recentes de votre quartier pour vous fournir une estimation precise en moins de 5 minutes.
                </p>
                <div className="flex gap-8">
                  {[
                    { label: "Pour estimer", value: "5 min" },
                    { label: "Sans engagement", value: "Gratuit" },
                    { label: "Fiabilite", value: "97%" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center gap-4">
                      {i > 0 && <div className="w-px h-10" style={{ background: `${C.white}20` }} />}
                      <div>
                        <div className="text-xl font-light" style={{ color: C.white }}>{item.value}</div>
                        <div className="text-xs" style={{ color: `${C.white}60` }}>{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="p-8 rounded-sm"
                style={{ background: `${C.white}08`, border: `1px solid ${C.white}15` }}
                variants={delayedBlurFade(0.3)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-5">
                  {[
                    { label: "Type de bien", value: "Maison" },
                    { label: "Surface (m²)", value: "120" },
                    { label: "Code postal", value: "30000" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs tracking-wider uppercase mb-2" style={{ color: `${C.white}80` }}>{field.label}</label>
                      <div className="w-full px-4 py-3 rounded-sm text-sm font-light" style={{ background: `${C.white}06`, border: `1px solid ${C.white}12`, color: C.white }}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                  <motion.button
                    className="w-full py-4 rounded-sm text-sm font-medium tracking-wider uppercase mt-2"
                    style={{ background: C.accent, color: C.dark }}
                    whileHover={{ scale: 1.02, transition: { duration: DURATION.micro } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Estimer mon bien
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 5. EQUIPE ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.container}>
            <motion.div
              className="text-center mb-16"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.luxury.caption} style={{ color: C.accent, letterSpacing: "0.2em" }}>L&apos;equipe</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3"} style={{ color: C.dark }}>Nos Experts</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-10"
              variants={staggerContainer(0.15, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {agents.map((agent) => (
                <motion.div
                  key={agent.nom}
                  variants={staggerItemSoft}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative mx-auto mb-6">
                    <div
                      className="w-28 h-28 rounded-full mx-auto flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})` }}
                    >
                      <span className="text-xl font-light" style={{ color: C.white }}>{agent.initials}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-light tracking-tight" style={{ color: C.dark }}>{agent.nom}</h3>
                  <p className="text-xs tracking-wider uppercase mt-1" style={{ color: C.accent }}>{agent.role}</p>
                  <p className="text-sm mt-2" style={{ color: C.muted }}>{agent.specialite}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ 6. CHIFFRES CLES ═══════════════ */}
        <section className="relative" style={{ background: C.bg }}>
          <div className={SECTION.container + " " + SECTION.paddingCompact}>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { val: "1 200", label: "Transactions realisees" },
                { val: "4.9/5", label: "Note moyenne" },
                { val: "32", label: "Communes couvertes" },
                { val: "24h", label: "Reponse garantie" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={staggerItemSoft}
                  className="text-center py-8"
                >
                  <div className="text-3xl font-light" style={{ color: C.primary }}>{item.val}</div>
                  <div className="text-xs tracking-wider mt-2" style={{ color: C.muted }}>{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div className="h-px origin-left" style={{ background: `${C.primary}10` }} variants={lineRevealX} initial="hidden" whileInView="visible" viewport={{ once: true }} />
        </section>

        {/* ═══════════════ 7. CONTACT / CTA ═══════════════ */}
        <section className={SECTION.padding} style={{ background: C.white }}>
          <div className={SECTION.containerNarrow}>
            <motion.div
              className="text-center"
              variants={blurFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span className={TYPOGRAPHY.luxury.caption} style={{ color: C.accent, letterSpacing: "0.2em" }}>Contact</span>
              <h2 className={TYPOGRAPHY.luxury.sectionTitle + " mt-3 mb-4"} style={{ color: C.dark }}>
                Parlons de votre projet
              </h2>
              <p className="text-base mb-12" style={{ color: C.muted }}>
                Que vous cherchiez a acheter, vendre ou investir, notre equipe est a votre ecoute.
              </p>
            </motion.div>

            <motion.div
              className="space-y-5"
              variants={delayedBlurFade(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="px-4 py-3 rounded-sm border text-sm font-light" style={{ borderColor: `${C.primary}15`, color: C.muted }}>
                  Nom complet
                </div>
                <div className="px-4 py-3 rounded-sm border text-sm font-light" style={{ borderColor: `${C.primary}15`, color: C.muted }}>
                  Telephone
                </div>
              </div>
              <div className="px-4 py-3 rounded-sm border text-sm font-light" style={{ borderColor: `${C.primary}15`, color: C.muted }}>
                Email
              </div>
              <div className="px-4 pt-3 pb-16 rounded-sm border text-sm font-light" style={{ borderColor: `${C.primary}15`, color: C.muted }}>
                Votre projet immobilier...
              </div>
              <motion.button
                className="w-full py-4 rounded-sm text-sm font-medium tracking-wider uppercase"
                style={{ background: C.primary, color: C.white }}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 30px ${C.primary}30`, transition: { duration: DURATION.fast } }}
                whileTap={{ scale: 0.98 }}
              >
                Envoyer ma demande
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="py-16" style={{ background: C.dark }}>
          <div className={SECTION.container}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <h3 className="text-xl font-light tracking-tight mb-4" style={{ color: C.accent }}>Horizon Immo</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${C.white}40` }}>
                  Votre partenaire immobilier dans le Gard et l&apos;Herault depuis 2009.
                </p>
              </div>
              <div>
                <h4 className="text-sm tracking-wider uppercase mb-4" style={{ color: C.white }}>Services</h4>
                <ul className="space-y-2 text-sm" style={{ color: `${C.white}40` }}>
                  {["Achat immobilier", "Vente immobiliere", "Gestion locative", "Estimation gratuite"].map((s) => (
                    <li key={s} className="cursor-pointer hover:opacity-80 transition-opacity">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm tracking-wider uppercase mb-4" style={{ color: C.white }}>Zones</h4>
                <ul className="space-y-2 text-sm" style={{ color: `${C.white}40` }}>
                  {["Nîmes", "Montpellier", "Avignon", "Uzès"].map((z) => (
                    <li key={z} className="cursor-pointer hover:opacity-80 transition-opacity">{z}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm tracking-wider uppercase mb-4" style={{ color: C.white }}>Contact</h4>
                <div className="space-y-2 text-sm" style={{ color: `${C.white}40` }}>
                  <p>04 66 XX XX XX</p>
                  <p>contact@horizon-immo.fr</p>
                  <p>15 Bd Gambetta, 30000 Nîmes</p>
                </div>
              </div>
            </div>
            <div className="border-t pt-8 text-center text-xs tracking-wider" style={{ borderColor: `${C.white}08`, color: `${C.white}25` }}>
              &copy; 2025 Horizon Immo. Tous droits reserves. &mdash; Template par Kevin DX
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}