"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import type { LocalCity } from "@/data/local-seo";

interface LocalFAQProps {
  city: LocalCity;
}

export default function LocalFAQ({ city }: LocalFAQProps) {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title={`Questions frequentes - ${city.name}`}
          subtitle={`Les reponses aux questions les plus posees sur la creation de sites web a ${city.name} et dans le ${city.department}.`}
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={city.faq} />
        </div>
      </Container>
    </section>
  );
}
