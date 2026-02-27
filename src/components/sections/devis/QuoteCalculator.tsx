"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  PROJECT_TYPES,
  type ProjectType,
  type ProjectTypeId,
} from "@/data/quote-options";
import { FORMSPREE_ENDPOINT, DASHBOARD_LEADS_ENDPOINT } from "@/lib/constants";
import { getTrackingSessionId } from "@/components/analytics/SiteTracker";
import { getReferralCode } from "@/lib/referral";
import StepIndicator from "./StepIndicator";
import QuoteStep1 from "./QuoteStep1";
import QuoteStep2 from "./QuoteStep2";
import QuoteStep3 from "./QuoteStep3";

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
              <QuoteStep1
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
              <QuoteStep2
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
              <QuoteStep3
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
