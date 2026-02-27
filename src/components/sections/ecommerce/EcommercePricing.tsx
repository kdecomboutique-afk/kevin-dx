import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicePricingCard from "@/components/ui/ServicePricingCard";
import FadeIn from "@/components/animations/FadeIn";
import { ecommerceTiers } from "@/data/offres";

export default function EcommercePricing() {
  return (
    <section id="tarifs" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Tarifs"
          title="Investissez dans votre boutique en ligne"
          subtitle="Des formules adaptees a toutes les ambitions. Commencez a vendre en ligne des aujourd'hui."
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {ecommerceTiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <ServicePricingCard tier={tier} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-8 text-center text-sm text-text-muted">
            Besoin d&apos;une solution personnalisée ?{" "}
            <Link
              href="/contact"
              className="font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Contactez-moi
            </Link>{" "}
            pour un devis sur mesure.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
