"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECT_TYPES, type ProjectTypeId } from "@/data/quote-options";
import ProjectIcon from "./ProjectIcon";

interface QuoteStep1Props {
  selectedType: ProjectTypeId | null;
  onSelect: (id: ProjectTypeId) => void;
}

export default function QuoteStep1({ selectedType, onSelect }: QuoteStep1Props) {
  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-primary sm:text-3xl">
        Quel type de projet souhaitez-vous ?
      </h2>
      <p className="mb-8 text-center text-text-muted">
        Sélectionnez le service qui correspond le mieux à votre besoin.
      </p>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {PROJECT_TYPES.map((pt, index) => {
          const isSelected = selectedType === pt.id;
          return (
            <motion.button
              key={pt.id}
              type="button"
              onClick={() => onSelect(pt.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "group relative flex flex-col items-center rounded-2xl border-2 p-6 text-center transition-all duration-300 sm:p-8",
                isSelected
                  ? "border-accent bg-accent/5 shadow-lg shadow-accent/10"
                  : "border-border bg-white hover:border-accent/30 hover:shadow-md"
              )}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2.5 7 5.5 10 11.5 4" />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
                  isSelected
                    ? "bg-accent/10 text-accent"
                    : "bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent"
                )}
              >
                <ProjectIcon type={pt.id} className="h-8 w-8" />
              </div>

              {/* Name */}
              <h3 className="mb-1 font-heading text-lg font-bold text-primary">
                {pt.name}
              </h3>

              {/* Price badge */}
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                {pt.priceLabel}
              </span>

              {/* Description */}
              <p className="text-sm leading-relaxed text-text-muted">
                {pt.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
