import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ServicePricingCard from "@/components/ui/ServicePricingCard";
import FadeIn from "@/components/animations/FadeIn";
import { reseauxTiers } from "@/data/offres";

export default function ReseauxPricing() {
  return (
    <section id="tarifs" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Formules"
          title="Des formules adaptees a vos ambitions"
          subtitle="Forfaits mensuels sans engagement. Choisissez la formule qui correspond a vos objectifs de croissance."
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {reseauxTiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <ServicePricingCard tier={tier} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <p className="mt-8 text-center text-sm text-text-muted">
            Sans engagement de durée. Préavis de 30 jours.{" "}
            <Link
              href="/contact"
              className="font-semibold text-accent hover:text-accent-dark transition-colors"
            >
              Contactez-moi
            </Link>{" "}
            pour en discuter.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
