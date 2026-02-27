"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { ProjectType } from "@/data/quote-options";
import AnimatedPrice from "./AnimatedPrice";

interface QuoteStep3Props {
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
}

export default function QuoteStep3({
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
}: QuoteStep3Props) {
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
