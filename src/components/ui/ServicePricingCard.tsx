import { cn } from "@/lib/utils";
import type { PricingTier } from "@/types";
import Button from "@/components/ui/Button";

interface ServicePricingCardProps {
  tier: PricingTier;
  className?: string;
}

export default function ServicePricingCard({ tier, className }: ServicePricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 lg:p-8",
        tier.highlighted
          ? "border-accent shadow-lg shadow-accent/10"
          : "border-border",
        className
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          Populaire
        </span>
      )}

      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold text-primary">
          {tier.name}
        </h3>
        <p className="mt-2 text-sm text-text-muted">{tier.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-4xl font-bold text-primary">
            {tier.price}
          </span>
          {tier.priceNote && (
            <span className="text-sm text-text-muted">{tier.priceNote}</span>
          )}
        </div>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <svg
              className={cn(
                "mt-0.5 h-5 w-5 flex-shrink-0",
                tier.highlighted ? "text-accent" : "text-secondary"
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
            <span className="text-sm text-text">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={tier.href}
        variant={tier.highlighted ? "primary" : "secondary"}
        size="lg"
        className="w-full"
      >
        {tier.cta}
      </Button>
    </div>
  );
}
