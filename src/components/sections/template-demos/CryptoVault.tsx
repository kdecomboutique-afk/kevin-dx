"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SECTION,
  TYPOGRAPHY,
  DURATION,
  EASE_SMOOTH,
  EASE_OUT_EXPO,
  SPRING_SNAPPY,
  fadeUp,
  blurFadeUp,
  staggerContainer,
  staggerItemSnappy,
  hoverLift,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#050505",
  surface: "#0A0F1A",
  card: "#111318",
  border: "#1E2530",
  primary: "#00DC82",
  accent: "#06B6D4",
  red: "#EF4444",
  white: "#F0F6FC",
  muted: "#8B949E",
  mutedDark: "#484F58",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Features", "Security", "Pricing", "API"];

const features = [
  { title: "Multi-Chain Portfolio", desc: "Track assets across Ethereum, Bitcoin, Solana & 50+ chains in one unified dashboard.", icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" },
  { title: "Hardware Vault", desc: "Enterprise-grade cold storage with multi-sig authorization and biometric locks.", icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" },
  { title: "DeFi Aggregator", desc: "Best swap rates across 200+ DEXs. Auto-routing for optimal slippage & gas.", icon: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" },
  { title: "Zero-Knowledge Proofs", desc: "Privacy-preserving transactions with zk-SNARK verification on every transfer.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
];

const plans = [
  { name: "Explorer", price: 0, desc: "Track & learn", features: ["5 wallets", "Basic charts", "Price alerts", "Community support"], cta: "Start Free" },
  { name: "Trader", price: 49, desc: "Active trading", features: ["Unlimited wallets", "DeFi aggregator", "Advanced analytics", "Priority support", "Tax reports", "API access"], cta: "Go Trader", popular: true },
  { name: "Institutional", price: 299, desc: "Enterprise grade", features: ["Everything in Trader", "Multi-sig vault", "Compliance tools", "Dedicated manager", "SLA 99.99%", "Custom integration", "Audit trail"], cta: "Contact Sales" },
];

const liveStats = [
  { label: "Total Value Locked", value: 2.4, prefix: "$", suffix: "B", color: c.primary },
  { label: "Active Users", value: 847, prefix: "", suffix: "K", color: c.accent },
  { label: "Transactions/Day", value: 3.2, prefix: "", suffix: "M", color: c.primary },
  { label: "Chains Supported", value: 54, prefix: "", suffix: "+", color: c.accent },
];

const testimonials = [
  { name: "Alex Volkov", role: "DeFi Trader", text: "CryptoVault's aggregator saved me $12K in slippage fees last quarter. The routing engine is unreal." },
  { name: "Priya Sharma", role: "Fund Manager", text: "Finally a platform that handles institutional compliance without sacrificing the DeFi experience." },
  { name: "Jordan Lee", role: "Developer", text: "The API is beautifully documented. Integrated our portfolio tracker in under 2 hours." },
];

/* ------------------------------------------------------------------ */
/*  Matrix Rain                                                        */
/* ------------------------------------------------------------------ */
const MATRIX_CHARS = "01アイウエオカキクケコ$€£¥₿ΞΛΣΨΩ∞∂∫≈≠±×÷√π";

function MatrixRain() {
  const [columns, setColumns] = useState<Array<{ chars: string[]; x: number; speed: number; opacity: number }>>([]);

  useEffect(() => {
    const cols = Array.from({ length: 18 }, (_, i) => ({
      chars: Array.from({ length: 12 + Math.floor(Math.random() * 8) }, () =>
        MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
      ),
      x: (i / 18) * 100 + Math.random() * 3,
      speed: 8 + Math.random() * 12,
      opacity: 0.06 + Math.random() * 0.1,
    }));
    setColumns(cols);
  }, []);

  if (columns.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((col, ci) => (
        <motion.div
          key={ci}
          className="absolute top-0 flex flex-col font-mono text-xs leading-5"
          style={{ left: `${col.x}%`, opacity: col.opacity, color: c.primary }}
          animate={{ y: ["-30%", "110%"] }}
          transition={{ duration: col.speed, repeat: Infinity, ease: "linear", delay: ci * 0.4 }}
        >
          {col.chars.map((ch, j) => (
            <span key={j} style={{ opacity: j === 0 ? 1 : 0.3 + (j / col.chars.length) * 0.7 }}>{ch}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = !Number.isInteger(value);
    const steps = 60;
    const inc = value / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= value) { setCount(value); clearInterval(timer); }
      else setCount(isDecimal ? parseFloat(cur.toFixed(1)) : Math.floor(cur));
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className="tabular-nums"
    >
      {prefix}{Number.isInteger(value) ? count.toLocaleString() : count.toFixed(1)}{suffix}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Fake Bar Chart                                                     */
/* ------------------------------------------------------------------ */
function BarChart() {
  const bars = [35, 52, 78, 45, 92, 67, 83, 55, 71, 88, 60, 95];
  return (
    <div className="flex items-end gap-1.5 h-32">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.8 + i * 0.06, duration: 0.6, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
          className="flex-1 rounded-t"
          style={{ background: i === bars.length - 1 ? c.primary : `${c.primary}30`, minWidth: 6 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.tech;

export default function CryptoVault() {
  return (
    <div style={{ background: c.bg }} className="text-white overflow-hidden">
      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.normal, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ borderColor: c.border + "60", background: c.bg + "DD" }}
      >
        <div className={`${SECTION.container} flex items-center justify-between h-16`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`, color: c.bg }}
            >
              CV
            </div>
            <span className="font-semibold text-lg">CryptoVault</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <span key={l} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm cursor-pointer" style={{ color: c.muted }}>Login</span>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${c.primary}40` }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: c.primary, color: c.bg }}
            >
              Launch App
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO — Cyberpunk + Matrix Rain ═══ */}
      <section className={`${SECTION.paddingHero} relative`}>
        <MatrixRain />
        <div className={`${SECTION.container} relative z-10`}>
          <div className="text-center max-w-4xl mx-auto">
            {/* Glow */}
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse, ${c.primary}50, transparent 70%)` }}
            />

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-8"
              style={{ borderColor: c.primary + "40", color: c.primary, background: c.primary + "08" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: c.primary }} />
              PROTOCOL v2.0 LIVE
            </motion.div>

            <motion.h1
              variants={delayedBlurFade(HERO_SEQUENCE.title)}
              initial="hidden"
              animate="visible"
              className={`${typo.heroTitle} mb-6`}
            >
              Your crypto,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}>
                your vault
              </span>
            </motion.h1>

            <motion.p
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
              className={`${typo.subtitle} max-w-2xl mx-auto mb-10`}
              style={{ color: c.muted }}
            >
              Self-custodial portfolio management with institutional-grade security. Track, trade, and protect your digital assets across every chain.
            </motion.p>

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${c.primary}40` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium"
                style={{ background: c.primary, color: c.bg }}
              >
                Launch App
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium border"
                style={{ borderColor: c.border, color: c.muted }}
              >
                Read Docs
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ DASHBOARD PREVIEW ═══ */}
      <section className={SECTION.paddingCompact}>
        <div className={SECTION.container}>
          <motion.div
            variants={blurFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border overflow-hidden"
            style={{ background: c.surface, borderColor: c.border }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: c.border }}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono" style={{ color: c.primary }}>Dashboard</span>
                <span className="text-sm font-mono" style={{ color: c.mutedDark }}>Portfolio</span>
                <span className="text-sm font-mono" style={{ color: c.mutedDark }}>History</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: c.primary }} />
                <span className="text-xs font-mono" style={{ color: c.primary }}>LIVE</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Portfolio value */}
              <div className="md:col-span-2">
                <div className="text-xs font-mono mb-1" style={{ color: c.muted }}>TOTAL BALANCE</div>
                <div className="text-3xl font-bold mb-1">$847,392.48</div>
                <div className="text-sm font-mono mb-6" style={{ color: c.primary }}>+12.4% (24h)</div>
                <BarChart />
              </div>

              {/* Asset list */}
              <div className="space-y-3">
                <div className="text-xs font-mono mb-2" style={{ color: c.muted }}>TOP ASSETS</div>
                {[
                  { name: "BTC", pct: "+2.4%", val: "$412K", color: "#F7931A" },
                  { name: "ETH", pct: "+5.1%", val: "$289K", color: "#627EEA" },
                  { name: "SOL", pct: "+18.7%", val: "$98K", color: "#9945FF" },
                  { name: "AVAX", pct: "-1.2%", val: "$48K", color: "#E84142" },
                ].map((asset, i) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.1, ...SPRING_SNAPPY }}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ background: c.card, borderColor: c.border }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: asset.color + "20", color: asset.color }}>
                        {asset.name[0]}
                      </div>
                      <span className="font-mono text-sm">{asset.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">{asset.val}</div>
                      <div className="text-xs font-mono" style={{ color: asset.pct.startsWith("+") ? c.primary : c.red }}>{asset.pct}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES — Glassmorphism Cards ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>SECURITY FIRST</span>
            <h2 className={typo.sectionTitle}>
              Built for{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}>
                maximum security
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItemSnappy}
                {...hoverLift}
                className="group relative rounded-2xl border p-8 backdrop-blur-sm cursor-pointer overflow-hidden"
                style={{ background: `${c.card}CC`, borderColor: c.border }}
              >
                {/* Glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl"
                  style={{ background: c.primary }}
                />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: c.primary + "12" }}>
                  <svg className="w-6 h-6" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>PRICING</span>
            <h2 className={typo.sectionTitle}>Choose your tier</h2>
            <p className={`${typo.subtitle} mt-4 max-w-xl mx-auto`} style={{ color: c.muted }}>
              From hobbyist to institutional. Scale as you grow.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={staggerItemSnappy}
                {...hoverLift}
                className={`relative rounded-2xl border p-8 ${plan.popular ? "ring-1" : ""}`}
                style={{
                  background: c.card,
                  borderColor: plan.popular ? c.primary : c.border,
                  ...(plan.popular ? { boxShadow: `0 0 40px ${c.primary}15` } : {}),
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-medium"
                    style={{ background: c.primary, color: c.bg }}
                  >
                    POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: c.muted }}>{plan.desc}</p>

                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price === 0 ? "Free" : `$${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-sm mb-1 font-mono" style={{ color: c.muted }}>/mo</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: plan.popular ? `0 0 30px ${c.primary}30` : "none" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl text-sm font-medium mb-6"
                  style={{
                    background: plan.popular ? c.primary : "transparent",
                    border: plan.popular ? "none" : `1px solid ${c.border}`,
                    color: plan.popular ? c.bg : c.muted,
                  }}
                >
                  {plan.cta}
                </motion.button>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: c.muted }}>
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ LIVE STATS ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>PROTOCOL STATS</span>
            <h2 className={typo.sectionTitle}>Trusted by the ecosystem</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {liveStats.map((s) => (
              <motion.div
                key={s.label}
                variants={staggerItemSnappy}
                className="text-center p-6 rounded-2xl border"
                style={{ background: c.surface, borderColor: c.border }}
              >
                <div className="text-3xl sm:text-4xl font-bold font-mono mb-2" style={{ color: s.color }}>
                  <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-sm font-mono" style={{ color: c.muted }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>COMMUNITY</span>
            <h2 className={typo.sectionTitle}>What traders say</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={staggerItemSnappy}
                {...hoverLift}
                className="rounded-2xl border p-6"
                style={{ background: c.card, borderColor: c.border }}
              >
                <p className="text-sm leading-relaxed mb-6" style={{ color: c.muted }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold"
                    style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`, color: c.bg }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs font-mono" style={{ color: c.mutedDark }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={blurFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative text-center rounded-3xl border overflow-hidden py-20 px-6"
            style={{ borderColor: c.border, background: c.surface }}
          >
            <div className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${c.primary}40, transparent 70%)` }}
            />
            <h2 className={`${typo.sectionTitle} mb-4 relative z-10`}>
              Ready to secure your future?
            </h2>
            <p className="text-base mb-8 max-w-lg mx-auto relative z-10" style={{ color: c.muted }}>
              Join 847K+ users managing over $2.4B in digital assets with CryptoVault.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${c.primary}40` }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 px-10 py-4 rounded-xl font-medium text-lg"
              style={{ background: c.primary, color: c.bg }}
            >
              Launch App
            </motion.button>
            <p className="text-xs font-mono mt-4 relative z-10" style={{ color: c.mutedDark }}>
              No KYC required &middot; Self-custodial &middot; Open source
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12" style={{ borderColor: c.border }}>
        <div className={`${SECTION.container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`, color: c.bg }}
            >
              CV
            </div>
            <span className="font-semibold">CryptoVault</span>
          </div>
          <div className="flex items-center gap-6">
            {["Docs", "GitHub", "Security", "Status"].map((l) => (
              <span key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: c.mutedDark }}>{l}</span>
            ))}
          </div>
          <p className="text-xs font-mono" style={{ color: c.mutedDark }}>&copy; 2026 CryptoVault Protocol</p>
        </div>
      </footer>
    </div>
  );
}
