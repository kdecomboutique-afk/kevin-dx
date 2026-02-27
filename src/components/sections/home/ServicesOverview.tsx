"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingCard from "@/components/ui/PricingCard";
import StaggerChildren from "@/components/animations/StaggerChildren";
import { services } from "@/data/services";

export default function ServicesOverview() {
  return (
    <section id="services" className="py-20 lg:py-28 bg-surface">
      <Container>
        <SectionHeading
          badge="Mes offres"
          title="Des solutions adaptées à chaque besoin"
          subtitle="Des formules claires et transparentes, adaptées aux besoins et au budget des TPE, PME et artisans."
        />

        <StaggerChildren
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.15}
        >
          {services.map((service) => (
            <PricingCard key={service.id} service={service} />
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
