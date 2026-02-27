"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const showcaseItems = [
  {
    category: "Restaurant",
    title: "Saveur & Tradition",
    gradient: "from-orange-400 to-red-500",
  },
  {
    category: "Beaute",
    title: "Eclat Beaute",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    category: "Immobilier",
    title: "Horizon Immo",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    category: "BTP",
    title: "Batisseur Pro",
    gradient: "from-slate-500 to-gray-700",
  },
  {
    category: "Photographe",
    title: "Studio Lumiere",
    gradient: "from-violet-400 to-purple-500",
  },
];

const imageMap: Record<string, string> = {
  Restaurant: "/templates/restaurant.webp",
  Beaute: "/templates/beaute.webp",
  Immobilier: "/templates/immobilier.webp",
  BTP: "/templates/btp.webp",
  Photographe: "/templates/studio-lumiere.webp",
};

export default function HeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion, next]);

  const current = showcaseItems[activeIndex];
  const hasImgError = imgErrors.has(activeIndex);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className={`h-full w-full bg-gradient-to-br ${current.gradient}`}
          >
            {!hasImgError && (
              <img
                src={imageMap[current.category]}
                alt={current.title}
                className="h-full w-full object-cover object-top"
                onError={() =>
                  setImgErrors((prev) => new Set(prev).add(activeIndex))
                }
              />
            )}
            {hasImgError && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
                {/* Wireframe mockup */}
                <div className="w-full max-w-[200px] space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-white/20" />
                    <div className="h-2 w-16 rounded bg-white/15" />
                    <div className="ml-auto flex gap-1">
                      <div className="h-2 w-6 rounded bg-white/10" />
                      <div className="h-2 w-6 rounded bg-white/10" />
                      <div className="h-2 w-6 rounded bg-white/10" />
                    </div>
                  </div>
                  <div className="h-16 w-full rounded bg-white/10" />
                  <div className="space-y-1">
                    <div className="h-2 w-3/4 rounded bg-white/15" />
                    <div className="h-2 w-1/2 rounded bg-white/10" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <div className="h-8 rounded bg-white/10" />
                    <div className="h-8 rounded bg-white/10" />
                    <div className="h-8 rounded bg-white/10" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">
                  {current.category}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {showcaseItems.map((item, i) => (
          <button
            key={item.category}
            onClick={() => setActiveIndex(i)}
            aria-label={`Voir ${item.category}`}
            className="group relative"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-accent shadow-sm shadow-accent/50"
                  : "w-1.5 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
