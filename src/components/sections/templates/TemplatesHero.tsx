"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import ScrollCounter from "@/components/animations/ScrollCounter";

const thumbnails = [
  { gradient: "from-orange-400 to-red-500", label: "Restaurant" },
  { gradient: "from-pink-400 to-rose-500", label: "Beauté" },
  { gradient: "from-blue-400 to-indigo-500", label: "Immobilier" },
  { gradient: "from-slate-500 to-gray-700", label: "BTP" },
];

const stats = [
  { value: 26, suffix: "+", label: "Templates" },
  { value: 16, label: "Secteurs" },
  { value: 97, suffix: "/100", label: "Lighthouse" },
];

export default function TemplatesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary-dark to-surface-dark pt-32 pb-16 lg:pt-40 lg:pb-20">
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/10 blur-[80px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 border border-accent/30 bg-accent/10 text-accent-light">
                Templates professionnels
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Le template{" "}
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                parfait
              </span>{" "}
              pour votre activité
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-lg text-lg text-white/60"
            >
              Des modèles de sites web optimisés et prêts à être personnalisés.
              Chaque template est pensé pour convertir vos visiteurs en clients.
            </motion.p>

            {/* Inline stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex gap-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <div className="h-8 w-px bg-white/10" />
                  )}
                  <div className={i > 0 ? "pl-3" : ""}>
                    <div className="font-heading text-2xl font-bold text-white">
                      <ScrollCounter target={stat.value} suffix={stat.suffix || ""} />
                    </div>
                    <div className="text-xs text-white/40">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Mini thumbnail grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-3">
              {thumbnails.map((thumb, i) => (
                <motion.div
                  key={thumb.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 shadow-lg"
                >
                  <div className={`h-full w-full bg-gradient-to-br ${thumb.gradient}`}>
                    {/* Wireframe content */}
                    <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                      <div className="w-full max-w-[120px] space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-white/20" />
                          <div className="h-1.5 w-10 rounded bg-white/15" />
                          <div className="ml-auto flex gap-0.5">
                            <div className="h-1.5 w-4 rounded bg-white/10" />
                            <div className="h-1.5 w-4 rounded bg-white/10" />
                          </div>
                        </div>
                        <div className="h-8 w-full rounded bg-white/10" />
                        <div className="space-y-0.5">
                          <div className="h-1 w-3/4 rounded bg-white/15" />
                          <div className="h-1 w-1/2 rounded bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-3 pb-2 pt-6">
                    <span className="text-xs font-semibold text-white/80">
                      {thumb.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
