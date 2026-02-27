"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import {
  PROJECT_TYPES,
  type ProjectType,
  type ProjectTypeId,
} from "@/data/quote-options";
import { FORMSPREE_ENDPOINT, DASHBOARD_LEADS_ENDPOINT } from "@/lib/constants";
import { getTrackingSessionId } from "@/components/analytics/SiteTracker";
import { getReferralCode } from "@/lib/referral";
import StepIndicator from "./StepIndicator";
import AnimatedPrice from "./AnimatedPrice";
import ProjectIcon from "./ProjectIcon";

// ---------------------------------------------------------------
// Pack URL parameter mapping
// ---------------------------------------------------------------
const PACK_TYPE_MAP: Record<string, ProjectTypeId> = {
  "vitrine-starter": "vitrine",
  "vitrine-pro": "vitrine",
  "ecommerce-standard": "ecommerce",
  "ecommerce-pro": "ecommerce",
  "reseaux-starter": "reseaux",
  "reseaux-growth": "reseaux",
  "combo-vitrine-reseaux": "vitrine",
  "combo-ecommerce-reseaux": "ecommerce",
  "combo-reseaux-site": "reseaux",
};

const COMBO_MESSAGES: Record<string, string> = {
  "combo-vitrine-reseaux":
    "Je suis intéressé(e) par le pack Combo Site Vitrine + Réseaux Sociaux (-15%).",
  "combo-ecommerce-reseaux":
    "Je suis intéressé(e) par le pack Combo E-Commerce + Réseaux Sociaux (-15%).",
  "combo-reseaux-site":
    "Je suis intéressé(e) par le pack Combo Réseaux Sociaux + Site Web (-15%).",
};

// ---------------------------------------------------------------
// Slide animation variants
// ---------------------------------------------------------------
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ---------------------------------------------------------------
// Main component
// ---------------------------------------------------------------
export default function QuoteCalculator() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedType, setSelectedType] = useState<ProjectTypeId | null>(null);
  const [selectedRanges, setSelectedRanges] = useState<Record<string, number>>(
    {}
  );
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set()
  );
  // Contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Pre-fill from ?pack= URL parameter (combo offers, direct pack links)
  useEffect(() => {
    const pack = searchParams.get("pack");
    if (!pack) return;

    // Map pack param to project type
    const typeId = PACK_TYPE_MAP[pack];
    if (typeId) {
      setSelectedType(typeId);
    }

    // Pre-fill combo message
    const comboMsg = COMBO_MESSAGES[pack];
    if (comboMsg) {
      setFormData((prev) => ({ ...prev, message: comboMsg }));
    }

    // Handle template-* pack params (from template "Acheter" buttons)
    if (pack.startsWith("template-")) {
      const templateId = pack.replace("template-", "");
      setFormData((prev) => ({
        ...prev,
        message: `Je suis intéressé(e) par le template "${templateId}" à 99 €.`,
      }));
    }
  }, [searchParams]);

  const projectType: ProjectType | null = useMemo(
    () => PROJECT_TYPES.find((p) => p.id === selectedType) ?? null,
    [selectedType]
  );

  const isRecurring = selectedType === "reseaux";

  // Calculate total
  const total = useMemo(() => {
    if (!projectType) return 0;
    let sum = projectType.basePrice;

    // Range costs
    for (const range of projectType.ranges) {
      const idx = selectedRanges[range.id] ?? 0;
      sum += range.ranges[idx]?.price ?? 0;
    }

    // Option costs
    for (const opt of projectType.options) {
      if (selectedOptions.has(opt.id) && !opt.included) {
        sum += opt.price;
      }
    }

    return sum;
  }, [projectType, selectedRanges, selectedOptions]);

  // Navigation
  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  // Step 1 validation: must have selected a type
  const canGoToStep2 = selectedType !== null;
  // Step 2 validation: always valid (base is default)
  const canGoToStep3 = true;

  // Select project type
  function handleSelectType(id: ProjectTypeId) {
    setSelectedType(id);
    // Reset options when changing type
    setSelectedRanges({});
    setSelectedOptions(new Set());
  }

  // Toggle option
  function toggleOption(id: string) {
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // Range change
  function handleRangeChange(rangeId: string, index: number) {
    setSelectedRanges((prev) => ({ ...prev, [rangeId]: index }));
  }

  // Form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    setFormError(false);

    const estimatedTotal = `${total} €${isRecurring ? "/mois" : ""}`;
    const summary = summaryItems
      .map((item) => `${item.label}: ${item.price} €`)
      .join("\n");

    try {
      // Essayer le dashboard CRM d'abord
      let dashboardOk = false;
      try {
        const dashRes = await fetch(DASHBOARD_LEADS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "devis",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            projectType: projectType?.name ?? "",
            estimatedTotal,
            summary,
            sessionId: getTrackingSessionId() || undefined,
            sourcePage: window.location.pathname,
            referralCode: getReferralCode() || undefined,
          }),
        });
        dashboardOk = dashRes.ok;
      } catch {
        // Dashboard indisponible — fallback Formspree
      }

      // Fallback Formspree
      if (!dashboardOk) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...formData,
            _subject: `Demande de devis - ${projectType?.name ?? ""}`,
            projectType: projectType?.name ?? "",
            estimatedTotal,
            summary,
          }),
        });
        if (!res.ok) {
          setFormError(true);
          return;
        }
      }

      setFormSubmitted(true);
    } catch {
      setFormError(true);
    } finally {
      setFormLoading(false);
    }
  }

  // Summary items for step 3
  const summaryItems = useMemo(() => {
    if (!projectType) return [];
    const items: { label: string; price: number }[] = [];

    items.push({ label: `${projectType.name} (base)`, price: projectType.basePrice });

    for (const range of projectType.ranges) {
      const idx = selectedRanges[range.id] ?? 0;
      const selected = range.ranges[idx];
      if (selected && selected.price > 0) {
        items.push({ label: `${range.label} : ${selected.label}`, price: selected.price });
      }
    }

    for (const opt of projectType.options) {
      if (selectedOptions.has(opt.id) && !opt.included) {
        items.push({ label: opt.label, price: opt.price });
      }
    }

    return items;
  }, [projectType, selectedRanges, selectedOptions]);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Step indicator */}
      <StepIndicator currentStep={step} className="mb-10" />

      {/* Content area */}
      <div className="relative min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Step1
                selectedType={selectedType}
                onSelect={handleSelectType}
              />
            </motion.div>
          )}

          {step === 2 && projectType && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Step2
                projectType={projectType}
                selectedRanges={selectedRanges}
                selectedOptions={selectedOptions}
                onRangeChange={handleRangeChange}
                onToggleOption={toggleOption}
                total={total}
                isRecurring={isRecurring}
              />
            </motion.div>
          )}

          {step === 3 && projectType && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Step3
                projectType={projectType}
                summaryItems={summaryItems}
                total={total}
                isRecurring={isRecurring}
                formData={formData}
                setFormData={setFormData}
                formSubmitted={formSubmitted}
                formLoading={formLoading}
                formError={formError}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {!formSubmitted && (
        <div className="mt-8 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 12L6 8l4-4" />
              </svg>
              Précédent
            </button>
          ) : (
            <div />
          )}

          {step < 3 && (
            <button
              type="button"
              onClick={goNext}
              disabled={step === 1 && !canGoToStep2}
              className={cn(
                "group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300",
                step === 1 && !canGoToStep2
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20 hover:scale-[1.02]"
              )}
            >
              <span className="relative z-10">Suivant</span>
              <svg
                className="relative z-10"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 12l4-4-4-4" />
              </svg>
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-[btn-shimmer_0.6s_ease-in-out] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ===============================================================
// Step 1 : Project type selection
// ===============================================================
function Step1({
  selectedType,
  onSelect,
}: {
  selectedType: ProjectTypeId | null;
  onSelect: (id: ProjectTypeId) => void;
}) {
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

// ===============================================================
// Step 2 : Options
// ===============================================================
function Step2({
  projectType,
  selectedRanges,
  selectedOptions,
  onRangeChange,
  onToggleOption,
  total,
  isRecurring,
}: {
  projectType: ProjectType;
  selectedRanges: Record<string, number>;
  selectedOptions: Set<string>;
  onRangeChange: (rangeId: string, index: number) => void;
  onToggleOption: (id: string) => void;
  total: number;
  isRecurring: boolean;
}) {
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

// ===============================================================
// Step 3 : Summary + Contact form
// ===============================================================
function Step3({
  projectType,
  summaryItems,
  total,
  isRecurring,
  formData,
  setFormData,
  formSubmitted,
  formLoading,
  formError,
  onSubmit,
}: {
  projectType: ProjectType;
  summaryItems: { label: string; price: number }[];
  total: number;
  isRecurring: boolean;
  formData: { name: string; email: string; phone: string; message: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      message: string;
    }>
  >;
  formSubmitted: boolean;
  formLoading: boolean;
  formError: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  if (formSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-lg py-12 text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="10 20 17 27 30 13" />
          </svg>
        </div>
        <h2 className="mb-3 font-heading text-2xl font-bold text-primary">
          Demande envoyée !
        </h2>
        <p className="text-text-muted">
          Merci pour votre demande de devis. Je vous recontacte sous 24h pour
          discuter de votre projet en détail.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Summary */}
      <div className="lg:w-80">
        <div className="rounded-2xl border border-border bg-white p-6">
          <h3 className="mb-4 font-heading text-lg font-bold text-primary">
            Récapitulatif
          </h3>

          <div className="space-y-3">
            {summaryItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-text-muted">{item.label}</span>
                <span className="text-sm font-medium text-primary">
                  {formatPrice(item.price)}
                  {isRecurring ? "/mois" : ""}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-baseline justify-between">
              <span className="font-heading font-semibold text-primary">
                Total estimé
              </span>
              <AnimatedPrice
                value={total}
                suffix={isRecurring ? "/mois" : ""}
                className="font-heading text-2xl font-bold text-accent"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 p-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium text-green-700">
              Devis gratuit et sans engagement
            </span>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="flex-1">
        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h3 className="mb-1 font-heading text-lg font-bold text-primary">
            Recevez votre devis personnalisé
          </h3>
          <p className="mb-6 text-sm text-text-muted">
            Remplissez le formulaire ci-dessous et je vous recontacte sous 24h.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="quote-name"
                className="mb-1.5 block text-sm font-medium text-primary"
              >
                Nom complet <span className="text-accent">*</span>
              </label>
              <input
                id="quote-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Jean Dupont"
                className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="quote-email"
                className="mb-1.5 block text-sm font-medium text-primary"
              >
                Email <span className="text-accent">*</span>
              </label>
              <input
                id="quote-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="jean@example.com"
                className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="quote-phone"
                className="mb-1.5 block text-sm font-medium text-primary"
              >
                Téléphone <span className="text-accent">*</span>
              </label>
              <input
                id="quote-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="06 12 34 56 78"
                className="w-full rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="quote-message"
                className="mb-1.5 block text-sm font-medium text-primary"
              >
                Message{" "}
                <span className="text-xs font-normal text-text-muted">
                  (optionnel)
                </span>
              </label>
              <textarea
                id="quote-message"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Décrivez brièvement votre projet..."
                className="w-full resize-none rounded-xl border-2 border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              />
            </div>

            {formError && (
              <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                Une erreur est survenue. Veuillez réessayer ou nous contacter
                directement par email.
              </div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              className={cn(
                "group relative w-full overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300",
                formLoading
                  ? "cursor-wait bg-accent/70"
                  : "bg-accent hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {formLoading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15.5 2.5l-7 15-3-6-6-3 15-7z" />
                      <path d="M15.5 2.5l-6.5 6.5" />
                    </svg>
                    Envoyer ma demande de devis
                  </>
                )}
              </span>
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-[btn-shimmer_0.6s_ease-in-out] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
