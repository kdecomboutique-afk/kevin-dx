"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { ProjectType } from "@/data/quote-options";
import AnimatedPrice from "./AnimatedPrice";

interface QuoteStep2Props {
  projectType: ProjectType;
  selectedRanges: Record<string, number>;
  selectedOptions: Set<string>;
  onRangeChange: (rangeId: string, index: number) => void;
  onToggleOption: (id: string) => void;
  total: number;
  isRecurring: boolean;
}

export default function QuoteStep2({
  projectType,
  selectedRanges,
  selectedOptions,
  onRangeChange,
  onToggleOption,
  total,
  isRecurring,
}: QuoteStep2Props) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Options panel */}
      <div className="flex-1">
        <h2 className="mb-2 font-heading text-2xl font-bold text-primary sm:text-3xl">
          Personnalisez votre {projectType.name.toLowerCase()}
        </h2>
        <p className="mb-6 text-text-muted">
          Sélectionnez les options qui correspondent à vos besoins.
        </p>

        {/* Ranges */}
        {projectType.ranges.map((range) => {
          const currentIdx = selectedRanges[range.id] ?? 0;
          return (
            <div key={range.id} className="mb-6">
              <label className="mb-3 block font-heading text-sm font-semibold text-primary">
                {range.label}
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {range.ranges.map((r, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onRangeChange(range.id, idx)}
                    className={cn(
                      "flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200",
                      currentIdx === idx
                        ? "border-accent bg-accent/5 text-primary font-medium"
                        : "border-border bg-white text-text-muted hover:border-accent/30"
                    )}
                  >
                    <span>{r.label}</span>
                    {r.price > 0 && (
                      <span className="ml-2 whitespace-nowrap font-semibold text-accent">
                        +{r.price} €{isRecurring ? "/mois" : ""}
                      </span>
                    )}
                    {r.price === 0 && (
                      <span className="ml-2 whitespace-nowrap text-xs font-medium text-secondary">
                        Inclus
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Options */}
        <div>
          <label className="mb-3 block font-heading text-sm font-semibold text-primary">
            Options disponibles
          </label>
          <div className="space-y-2">
            {projectType.options.map((opt) => {
              const isChecked = opt.included || selectedOptions.has(opt.id);
              return (
                <motion.label
                  key={opt.id}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-200",
                    opt.included
                      ? "border-secondary/20 bg-secondary/5"
                      : isChecked
                        ? "border-accent bg-accent/5"
                        : "border-border bg-white hover:border-accent/30"
                  )}
                >
                  {/* Custom checkbox */}
                  <span className="mt-0.5 flex-shrink-0">
                    {opt.included ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-secondary text-white">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="2 6 4.5 8.5 10 3" />
                        </svg>
                      </span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleOption(opt.id)}
                        className="h-5 w-5 rounded-md border-2 border-border text-accent accent-accent focus:ring-2 focus:ring-accent/30"
                      />
                    )}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isChecked ? "text-primary" : "text-text"
                        )}
                      >
                        {opt.label}
                      </span>
                      <span className="flex-shrink-0">
                        {opt.included || opt.price === 0 ? (
                          <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-semibold text-secondary">
                            Inclus
                          </span>
                        ) : (
                          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                            +{opt.price} €{isRecurring ? "/mois" : ""}
                          </span>
                        )}
                      </span>
                    </div>
                    {opt.description && (
                      <p className="mt-0.5 text-xs text-text-muted">
                        {opt.description}
                      </p>
                    )}
                  </div>
                </motion.label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky total panel */}
      <div className="lg:w-72">
        <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-text-muted">
            Estimation
          </h3>

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-text-muted">
              {projectType.name}
            </span>
            <span className="text-sm font-medium text-primary">
              {formatPrice(projectType.basePrice)}
              {isRecurring ? "/mois" : ""}
            </span>
          </div>

          {/* Dynamic extras */}
          {projectType.ranges.map((range) => {
            const idx = selectedRanges[range.id] ?? 0;
            const selected = range.ranges[idx];
            if (!selected || selected.price === 0) return null;
            return (
              <div
                key={range.id}
                className="mb-2 flex items-center justify-between"
              >
                <span className="text-xs text-text-muted">{range.label}</span>
                <span className="text-xs font-medium text-accent">
                  +{formatPrice(selected.price)}
                  {isRecurring ? "/mois" : ""}
                </span>
              </div>
            );
          })}
          {projectType.options.map((opt) => {
            if (!selectedOptions.has(opt.id) || opt.included) return null;
            return (
              <div
                key={opt.id}
                className="mb-2 flex items-center justify-between"
              >
                <span className="text-xs text-text-muted">{opt.label}</span>
                <span className="text-xs font-medium text-accent">
                  +{formatPrice(opt.price)}
                  {isRecurring ? "/mois" : ""}
                </span>
              </div>
            );
          })}

          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-sm font-semibold text-primary">
                Total estimé
              </span>
              <AnimatedPrice
                value={total}
                suffix={isRecurring ? "/mois" : ""}
                className="font-heading text-2xl font-bold text-accent"
              />
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-text-muted">
            * Prix indicatif, devis personnalisé sur demande
          </p>
        </div>
      </div>
    </div>
  );
}
