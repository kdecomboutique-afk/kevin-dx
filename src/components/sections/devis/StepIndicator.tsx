"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  label: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Type de projet" },
  { number: 2, label: "Personnalisation" },
  { number: 3, label: "Récapitulatif" },
];

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

export default function StepIndicator({
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        const isLast = index === STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            {/* Circle + Label */}
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors sm:h-12 sm:w-12 sm:text-base",
                  isCompleted &&
                    "border-secondary bg-secondary text-white",
                  isActive &&
                    "border-accent bg-accent text-white shadow-lg shadow-accent/30",
                  !isActive &&
                    !isCompleted &&
                    "border-border bg-white text-text-muted"
                )}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3.5 9.5 7 13 14.5 5.5" />
                  </motion.svg>
                ) : (
                  step.number
                )}

                {/* Pulse ring on active step */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-accent"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <span
                className={cn(
                  "mt-2 text-center text-xs font-medium transition-colors sm:text-sm",
                  isActive && "text-accent font-semibold",
                  isCompleted && "text-secondary",
                  !isActive && !isCompleted && "text-text-muted"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className="relative mx-2 mb-6 h-0.5 w-12 sm:mx-4 sm:w-20 lg:w-28">
                {/* Background line */}
                <div className="absolute inset-0 rounded-full bg-border" />
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-secondary"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isCompleted ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
