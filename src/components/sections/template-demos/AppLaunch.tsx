"use client";

import { useState, useEffect } from "react";
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
  gradientShift,
  HERO_SEQUENCE,
  delayedBlurFade,
} from "@/lib/template-design-system";

/* ------------------------------------------------------------------ */
/*  Palette                                                            */
/* ------------------------------------------------------------------ */
const c = {
  bg: "#0B1120",
  surface: "#111827",
  card: "#1E293B",
  border: "#334155",
  primary: "#3B82F6",
  accent: "#8B5CF6",
  white: "#F8FAFC",
  muted: "#94A3B8",
  mutedDark: "#64748B",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const navLinks = ["Features", "Pricing", "Integrations", "Docs"];

const features = [
  { title: "Kanban Boards", desc: "Drag-and-drop task management with custom columns and swimlanes.", icon: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z", span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1" },
  { title: "Time Tracking", desc: "Automatic time logs with detailed weekly reports.", icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", span: "col-span-1 row-span-1" },
  { title: "AI Copilot", desc: "Smart suggestions, auto-assign, and predictive deadlines.", icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", span: "col-span-1 row-span-1" },
  { title: "Invoicing", desc: "Generate invoices from tracked hours with one click.", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1" },
  { title: "Team Chat", desc: "Real-time messaging with threads, reactions, and file sharing.", icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155", span: "col-span-1 row-span-1" },
  { title: "Analytics", desc: "Deep insights on team velocity, burndown charts, and bottlenecks.", icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z", span: "col-span-1 row-span-1" },
];

const plans = [
  { name: "Starter", monthly: 0, annual: 0, desc: "For individuals", features: ["5 projects", "Basic analytics", "1 GB storage", "Email support"], cta: "Get Started", popular: false },
  { name: "Pro", monthly: 29, annual: 24, desc: "For growing teams", features: ["Unlimited projects", "Advanced analytics", "50 GB storage", "Priority support", "AI Copilot", "Custom workflows"], cta: "Start Free Trial", popular: true },
  { name: "Enterprise", monthly: 99, annual: 79, desc: "For large orgs", features: ["Everything in Pro", "SSO & SAML", "Unlimited storage", "Dedicated CSM", "SLA 99.99%", "Audit logs", "Custom integrations"], cta: "Contact Sales", popular: false },
];

const integrations = ["Slack", "GitHub", "Figma", "Notion", "Linear", "Jira", "Stripe", "Zapier", "Discord", "Google", "Vercel", "AWS"];

const stats = [
  { label: "Teams Active", value: 12400, suffix: "+" },
  { label: "Tasks Completed", value: 8, suffix: "M+" },
  { label: "Uptime SLA", value: 99.99, suffix: "%" },
  { label: "Countries", value: 142, suffix: "" },
];

const testimonials = [
  { name: "Sarah Chen", role: "CTO, TechScale", text: "FlowDesk replaced 4 tools for us. The AI copilot alone saves our team 10 hours per week." },
  { name: "Marc Dubois", role: "PM, DataViz", text: "The bento dashboard is incredible. We have full visibility on every project in real-time." },
  { name: "Aisha Patel", role: "Founder, NexGen", text: "Best project management tool we've used. Migration from Jira took less than a day." },
];

const faqs = [
  { q: "Can I import from other tools?", a: "Yes. One-click import from Jira, Asana, Trello, Monday, Notion, and Linear. Full data migration with zero downtime." },
  { q: "Is there a free trial?", a: "Pro plan comes with a 14-day free trial. No credit card required. Cancel anytime." },
  { q: "How does the AI Copilot work?", a: "It analyzes your team patterns to suggest task assignments, predict deadlines, and auto-generate sprint plans." },
  { q: "What about data security?", a: "SOC 2 Type II certified. End-to-end encryption. Data stored in EU or US — your choice. GDPR compliant." },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const typo = TYPOGRAPHY.tech;

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = !Number.isInteger(value);
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className="tabular-nums"
    >
      {Number.isInteger(value) ? count.toLocaleString() : count.toFixed(2)}{suffix}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AppLaunch() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: c.bg }} className="text-white overflow-hidden">
      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: DURATION.normal, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
        className="sticky top-0 z-50 backdrop-blur-xl border-b"
        style={{ borderColor: c.border + "40", background: c.bg + "CC" }}
      >
        <div className={`${SECTION.container} flex items-center justify-between h-16`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
            <span className="font-semibold text-lg">FlowDesk</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <span key={l} className="text-sm cursor-pointer transition-colors hover:text-white" style={{ color: c.muted }}>{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm cursor-pointer" style={{ color: c.muted }}>Login</span>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${c.primary}50` }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: c.primary }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section className={SECTION.paddingHero}>
        <div className={SECTION.container}>
          <div className="relative text-center max-w-4xl mx-auto">
            {/* Gradient mesh bg */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-30 blur-3xl pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 30% 50%, ${c.primary}40, transparent 70%), radial-gradient(ellipse at 70% 50%, ${c.accent}40, transparent 70%)` }}
            />

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.badge)}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-8"
              style={{ borderColor: c.primary + "40", color: c.primary, background: c.primary + "10" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: c.primary }} />
              v3.0 — AI Copilot is here
            </motion.div>

            <motion.h1
              variants={delayedBlurFade(HERO_SEQUENCE.title)}
              initial="hidden"
              animate="visible"
              className={`${typo.heroTitle} mb-6`}
            >
              Ship faster with{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}>
                FlowDesk
              </span>
            </motion.h1>

            <motion.p
              variants={delayedBlurFade(HERO_SEQUENCE.subtitle)}
              initial="hidden"
              animate="visible"
              className={`${typo.subtitle} max-w-2xl mx-auto mb-10`}
              style={{ color: c.muted }}
            >
              The project management platform built for modern teams. Kanban, time tracking, invoicing, and AI — all in one beautiful workspace.
            </motion.p>

            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.cta)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}50` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-xl font-medium border"
                style={{ borderColor: c.border, color: c.muted }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Hero visual — fake app UI */}
            <motion.div
              variants={delayedBlurFade(HERO_SEQUENCE.visual)}
              initial="hidden"
              animate="visible"
              className="mt-16 rounded-2xl border overflow-hidden"
              style={{ borderColor: c.border, background: c.surface }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: c.border }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center text-xs font-mono" style={{ color: c.mutedDark }}>flowdesk.app/dashboard</div>
              </div>
              {/* Fake kanban */}
              <div className="p-6 grid grid-cols-3 gap-4">
                {["To Do", "In Progress", "Done"].map((col_name, ci) => (
                  <div key={col_name}>
                    <div className="text-xs font-mono mb-3 flex items-center gap-2" style={{ color: c.muted }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: ci === 0 ? c.muted : ci === 1 ? c.primary : "#22C55E" }} />
                      {col_name}
                    </div>
                    {[0, 1].map((j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4 + ci * 0.15 + j * 0.1, ...SPRING_SNAPPY }}
                        className="rounded-lg p-3 mb-2 border"
                        style={{ background: c.card, borderColor: c.border }}
                      >
                        <div className="h-2 rounded-full w-3/4 mb-2" style={{ background: c.border }} />
                        <div className="h-2 rounded-full w-1/2" style={{ background: c.border + "80" }} />
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES — BENTO GRID (Signature) ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>FEATURES</span>
            <h2 className={typo.sectionTitle}>
              Everything you need to{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}>
                ship faster
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={staggerItemSnappy}
                {...hoverLift}
                className={`${f.span} group relative rounded-2xl border p-6 cursor-pointer transition-colors`}
                style={{ background: c.surface, borderColor: c.border }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${c.primary}08, transparent 60%)` }}
                />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: c.primary + "15" }}>
                  <svg className="w-5 h-5" style={{ color: c.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
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
            <h2 className={typo.sectionTitle}>Simple, transparent pricing</h2>
            <p className={`${typo.subtitle} mt-4 max-w-xl mx-auto`} style={{ color: c.muted }}>
              Start for free. Upgrade when you need more.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className="text-sm" style={{ color: annual ? c.muted : c.white }}>Monthly</span>
              <motion.button
                onClick={() => setAnnual(!annual)}
                className="relative w-14 h-7 rounded-full p-1 cursor-pointer"
                style={{ background: annual ? c.primary : c.border }}
              >
                <motion.div
                  layout
                  transition={SPRING_SNAPPY}
                  className="w-5 h-5 rounded-full bg-white"
                  style={{ marginLeft: annual ? "auto" : 0 }}
                />
              </motion.button>
              <span className="text-sm flex items-center gap-2" style={{ color: annual ? c.white : c.muted }}>
                Annual
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: c.accent + "20", color: c.accent }}>-20%</span>
              </span>
            </div>
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
                className={`relative rounded-2xl border p-8 ${plan.popular ? "ring-2" : ""}`}
                style={{
                  background: c.bg,
                  borderColor: plan.popular ? c.primary : c.border,
                  ...(plan.popular ? { ringColor: c.primary } : {}),
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm mb-6" style={{ color: c.muted }}>{plan.desc}</p>

                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={annual ? "a" : "m"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: DURATION.fast, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
                      className="flex items-end gap-1"
                    >
                      <span className="text-4xl font-bold">${annual ? plan.annual : plan.monthly}</span>
                      {plan.monthly > 0 && <span className="text-sm mb-1" style={{ color: c.muted }}>/month</span>}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: plan.popular ? `0 8px 30px ${c.primary}40` : "none" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl text-sm font-medium mb-6"
                  style={{
                    background: plan.popular ? `linear-gradient(135deg, ${c.primary}, ${c.accent})` : "transparent",
                    border: plan.popular ? "none" : `1px solid ${c.border}`,
                    color: plan.popular ? "white" : c.muted,
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

      {/* ═══ INTEGRATIONS ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.container}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>INTEGRATIONS</span>
            <h2 className={typo.sectionTitle}>Connects with your stack</h2>
          </motion.div>

          {/* Scrolling logos */}
          <div className="relative overflow-hidden py-8">
            <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(to right, ${c.bg}, transparent)` }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: `linear-gradient(to left, ${c.bg}, transparent)` }} />
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8"
            >
              {[...integrations, ...integrations, ...integrations].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 w-32 h-16 rounded-xl border flex items-center justify-center font-mono text-sm"
                  style={{ background: c.surface, borderColor: c.border, color: c.muted }}
                >
                  {name}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF — STATS + TESTIMONIALS ═══ */}
      <section className={SECTION.padding} style={{ background: c.surface }}>
        <div className={SECTION.container}>
          {/* Stats */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={staggerItemSnappy}
                className="text-center p-6 rounded-2xl border"
                style={{ background: c.bg, borderColor: c.border }}
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: c.primary }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm" style={{ color: c.muted }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.accent }}>TESTIMONIALS</span>
            <h2 className={typo.sectionTitle}>Loved by modern teams</h2>
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
                style={{ background: c.bg, borderColor: c.border }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: "#FBBF24" }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: c.muted }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs" style={{ color: c.mutedDark }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className={SECTION.padding}>
        <div className={SECTION.containerNarrow}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <span className={`${typo.caption} block mb-3`} style={{ color: c.primary }}>FAQ</span>
            <h2 className={typo.sectionTitle}>Common questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="rounded-xl border overflow-hidden"
                style={{ background: c.surface, borderColor: c.border }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <motion.svg
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={SPRING_SNAPPY}
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: c.muted }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE_SMOOTH as unknown as [number, number, number, number] }}
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: c.muted }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
            {/* Gradient bg */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at center, ${c.primary}30, transparent 70%)` }}
            />
            <h2 className={`${typo.sectionTitle} mb-4 relative z-10`}>
              Ready to ship faster?
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto relative z-10" style={{ color: c.muted }}>
              Join 12,000+ teams already using FlowDesk to build better products.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 8px 40px ${c.primary}50` }}
              whileTap={{ scale: 0.97 }}
              className="relative z-10 px-10 py-4 rounded-xl font-medium text-white text-lg"
              style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }}
            >
              Start Free Trial
            </motion.button>
            <p className="text-xs mt-4 relative z-10" style={{ color: c.mutedDark }}>
              No credit card required &middot; 14-day free trial
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t py-12" style={{ borderColor: c.border }}>
        <div className={`${SECTION.container} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
            <span className="font-semibold">FlowDesk</span>
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Status", "Docs"].map((l) => (
              <span key={l} className="text-sm cursor-pointer hover:text-white transition-colors" style={{ color: c.mutedDark }}>{l}</span>
            ))}
          </div>
          <p className="text-xs" style={{ color: c.mutedDark }}>&copy; 2026 FlowDesk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
