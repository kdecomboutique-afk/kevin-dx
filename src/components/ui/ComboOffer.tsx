"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface ComboOfferProps {
  /** Title of the combo offer */
  title: string;
  /** Description text */
  description: string;
  /** Discount text, e.g. "-15%" */
  discount: string;
  /** Text for the CTA button */
  ctaText?: string;
  /** URL for the CTA */
  ctaHref?: string;
}

export default function ComboOffer({
  title,
  description,
  discount,
  ctaText = "En savoir plus",
  ctaHref = "/contact",
}: ComboOfferProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 p-8 sm:p-10 lg:p-12"
        >
          {/* Gradient border glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/10 via-secondary/10 to-accent/10 opacity-50" />

          {/* Background decorative orb */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-8">
            {/* Badge */}
            <div className="mb-6 lg:mb-0 lg:shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white shadow-lg shadow-accent/25">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
                Offre Speciale
              </span>
              <div className="mt-4 text-4xl font-extrabold text-accent sm:text-5xl">
                {discount}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                {title}
              </h3>
              <p className="mt-3 text-text-muted leading-relaxed">
                {description}
              </p>
              <div className="mt-6">
                <Button href={ctaHref} variant="primary" size="lg">
                  {ctaText}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
