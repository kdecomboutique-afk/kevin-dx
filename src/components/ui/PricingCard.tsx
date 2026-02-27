"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerItemVariants } from "@/components/animations/StaggerChildren";
import Button from "./Button";
import Badge from "./Badge";
import type { Service } from "@/types";

interface PricingCardProps {
  service: Service;
  className?: string;
}

function ServiceIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "globe":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      );
    case "shopping-cart":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      );
    case "share":
      return (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const aiKeywords = ["IA", "Chatbot", "automatisé", "Planification IA", "Relance paniers"];

function isAIFeature(feature: string): boolean {
  return aiKeywords.some((kw) => feature.toLowerCase().includes(kw.toLowerCase()));
}

export default function PricingCard({ service, className }: PricingCardProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={cn(
        "group relative flex flex-col rounded-2xl border-2 bg-white p-6 lg:p-8 transition-all duration-300",
        service.popular
          ? "border-accent shadow-lg shadow-accent/10 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2"
          : "border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {/* Shimmer effect on popular card */}
      {service.popular && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
        </div>
      )}

      {service.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="accent">Populaire</Badge>
        </div>
      )}

      <div className="mb-6">
        <div
          className={cn(
            "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
            service.popular
              ? "bg-accent/10 text-accent"
              : "bg-primary/10 text-primary"
          )}
        >
          <ServiceIcon icon={service.icon} />
        </div>
        <h3 className="font-heading text-xl font-bold text-primary">
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-text-muted">{service.description}</p>
      </div>

      <div className="mb-6">
        {service.priceNote && (
          <span className="text-sm text-text-muted">{service.priceNote}</span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-4xl font-bold text-primary">
            {service.price}
          </span>
          <span className="text-lg text-text-muted">
            {service.priceNote === "/mois" ? "\u20AC/mois" : "\u20AC"}
          </span>
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {service.features.map((feature) => {
          const ai = isAIFeature(feature);
          return (
            <li key={feature} className="flex items-start gap-3">
              <svg
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0",
                  service.popular ? "text-accent" : "text-secondary"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-text">
                {feature}
                {ai && (
                  <span className="ml-1.5 inline-flex items-center rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-700">
                    IA
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <Button
        href={service.href}
        variant={service.popular ? "primary" : "secondary"}
        size="lg"
        className="w-full"
      >
        En savoir plus
      </Button>
    </motion.div>
  );
}
