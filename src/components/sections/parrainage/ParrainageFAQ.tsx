"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/animations/FadeIn";
import { referralFAQ } from "@/data/referral";

export default function ParrainageFAQ() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Questions fréquentes"
          title="Tout savoir sur le parrainage"
        />

        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <Accordion items={referralFAQ} />
          </div>
        </FadeIn>

        {/* CGP link */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-sm text-text-muted">
              En participant au programme, vous acceptez les{" "}
              <a href="#cgp" className="font-semibold text-accent underline hover:text-accent-dark">
                Conditions Générales de Parrainage
              </a>
              .
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
