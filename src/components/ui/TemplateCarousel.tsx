"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import TemplateCarouselCard from "@/components/ui/TemplateCarouselCard";
import { cn } from "@/lib/utils";

interface TemplateListing {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  lighthouseScore?: number;
  price?: number;
}

interface TemplateCarouselProps {
  templates: TemplateListing[];
}

const CATEGORIES = [
  "Tous",
  "Restaurant",
  "Artisan",
  "BTP",
  "Beauté",
  "E-commerce",
  "Santé",
];

const AUTOPLAY_MS = 3500;
const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY = 300;
const VISIBLE_RANGE = 2;

const spring = { type: "spring" as const, stiffness: 260, damping: 30 };

function getCardStyle(offset: number, isMobile: boolean) {
  if (offset === 0) {
    return { scale: 1, opacity: 1, x: 0, rotateY: 0, zIndex: 10 };
  }

  const absOffset = Math.abs(offset);
  const sign = offset > 0 ? 1 : -1;

  if (absOffset === 1) {
    return {
      scale: 0.85,
      opacity: 0.65,
      x: sign * (isMobile ? 200 : 300),
      rotateY: sign * -8,
      zIndex: 5,
    };
  }

  // ±2 — desktop only
  if (absOffset === 2 && !isMobile) {
    return {
      scale: 0.7,
      opacity: 0.3,
      x: sign * 550,
      rotateY: sign * -16,
      zIndex: 1,
    };
  }

  return { scale: 0, opacity: 0, x: sign * 800, rotateY: 0, zIndex: 0 };
}

export default function TemplateCarousel({ templates }: TemplateCarouselProps) {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const isDragging = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);

  const filtered =
    activeCategory === "Tous"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  // SSR-safe responsive detection
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsMobile(!mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Reduced motion detection
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // Navigation helpers
  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % filtered.length) + filtered.length) % filtered.length);
    },
    [filtered.length]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (prefersReducedMotion.current || filtered.length <= 1) return;

    const start = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        if (!isPaused.current) next();
      }, AUTOPLAY_MS);
    };

    start();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [next, filtered.length]);

  // Pause on hover / touch
  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Swipe handler
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (
      Math.abs(offset.x) > SWIPE_THRESHOLD ||
      Math.abs(velocity.x) > SWIPE_VELOCITY
    ) {
      if (offset.x < 0) next();
      else prev();
    }
    // Guard isDragging for 50ms to prevent click-through
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  // Visible card indices (max 5)
  const visibleCards = filtered
    .map((t, i) => ({ ...t, originalIndex: i }))
    .filter((_, i) => {
      const offset = i - activeIndex;
      const wrappedOffset =
        ((offset + filtered.length / 2) % filtered.length) -
        filtered.length / 2;
      const range = isMobile ? 1 : VISIBLE_RANGE;
      return Math.abs(wrappedOffset) <= range;
    });

  return (
    <div className="mt-10 mb-8">
      {/* Category tabs */}
      <div className="mb-8 flex justify-center px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide md:flex-wrap md:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 flex-shrink-0",
                activeCategory === cat
                  ? "bg-accent text-white shadow-md"
                  : "bg-white text-text-muted border border-border hover:border-accent/30 hover:text-accent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel viewport */}
      <div
        ref={containerRef}
        className="relative mx-auto flex h-[380px] items-center justify-center overflow-hidden md:h-[420px]"
        style={{ perspective: "1200px" }}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full w-full items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {/* Drag layer for swipe */}
            <motion.div
              className="absolute inset-0 z-20 touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={() => {
                isDragging.current = true;
              }}
              onDragEnd={handleDragEnd}
            />

            {visibleCards.map((template) => {
              const rawOffset = template.originalIndex - activeIndex;
              const offset =
                ((rawOffset + filtered.length / 2) % filtered.length) -
                filtered.length / 2;
              const style = getCardStyle(
                Math.round(offset),
                isMobile
              );

              return (
                <motion.div
                  key={template.id}
                  className="absolute"
                  initial={false}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    rotateY: prefersReducedMotion.current ? 0 : style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={spring}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <TemplateCarouselCard
                    id={template.id}
                    title={template.title}
                    category={template.category}
                    image={template.image}
                    description={template.description}
                    tags={template.tags}
                    lighthouseScore={template.lighthouseScore}
                    price={template.price}
                    isDragging={isDragging.current}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons — desktop only */}
        {filtered.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-white/80 text-primary shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg md:flex"
              aria-label="Template précédent"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 z-30 hidden h-10 w-10 items-center justify-center rounded-full bg-white/80 text-primary shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg md:flex"
              aria-label="Template suivant"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {filtered.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Aller au template ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-border hover:bg-text-muted"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
