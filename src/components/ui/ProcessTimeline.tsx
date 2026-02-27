"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types";
import FadeIn from "@/components/animations/FadeIn";

function StepIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "chat":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case "palette":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      );
    case "code":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      );
    case "check":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "rocket":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
    case "search":
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end center"],
  });

  // Track scroll progress to fill the connecting line
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setScrollProgress(value);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Determine which steps are "completed" based on scroll progress
  const getStepProgress = (index: number) => {
    const stepThreshold = (index + 1) / steps.length;
    return scrollProgress >= stepThreshold;
  };

  const toggleStep = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? null : stepNumber));
  };

  return (
    <div className="relative" ref={timelineRef}>
      {/* Background vertical line (gray) */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border sm:left-8" />

      {/* Animated fill line (accent color) */}
      <motion.div
        className="absolute left-6 top-0 w-0.5 origin-top bg-accent sm:left-8"
        style={{
          height: "100%",
          scaleY: prefersReducedMotion ? 1 : scrollYProgress,
        }}
      />

      <div className="space-y-8 sm:space-y-12">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = activeStep === step.step;
          const isCompleted = getStepProgress(index);

          return (
            <FadeIn key={step.step} delay={index * 0.1} direction="left">
              <div
                className="relative flex gap-4 sm:gap-6 cursor-pointer group"
                onClick={() => toggleStep(step.step)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleStep(step.step);
                  }
                }}
              >
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0">
                  {/* Pulse ring for active/completed steps */}
                  {(isActive || isCompleted) && !prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/20"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                  <motion.div
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-16 sm:w-16 transition-colors duration-300",
                      isActive
                        ? "border-accent bg-accent text-white shadow-lg shadow-accent/25"
                        : isCompleted
                          ? "border-accent bg-accent/10 text-accent"
                          : isLast
                            ? "border-accent bg-accent text-white"
                            : "border-primary bg-white text-primary group-hover:border-accent/50"
                    )}
                    animate={
                      isActive && !prefersReducedMotion
                        ? { scale: [1, 1.05, 1] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 1.5,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    <StepIcon icon={step.icon} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-accent">
                      Etape {step.step}
                    </span>
                    <span className="rounded-full bg-secondary/10 px-3 py-0.5 text-xs font-medium text-secondary">
                      {step.duration}
                    </span>
                    {/* Expand/collapse indicator */}
                    <motion.svg
                      className="ml-auto h-4 w-4 text-text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                  <h3 className="mt-1 font-heading text-lg font-bold text-primary sm:text-xl">
                    {step.title}
                  </h3>

                  {/* Collapsed preview */}
                  {!isActive && (
                    <p className="mt-1 text-text-muted leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  )}

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.3, ease: "easeOut" },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-text leading-relaxed">
                          {step.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-sm text-accent font-medium">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Duree estimee : {step.duration}</span>
                        </div>
                        {index < steps.length - 1 && (
                          <p className="mt-2 text-xs text-text-muted italic">
                            Etape suivante : {steps[index + 1].title}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
