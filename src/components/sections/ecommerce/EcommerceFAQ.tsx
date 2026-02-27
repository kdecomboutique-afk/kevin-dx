import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { ecommerceFAQ } from "@/data/faq";

export default function EcommerceFAQ() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Questions frequentes"
          subtitle="Les reponses a vos questions sur la creation de votre boutique en ligne."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={ecommerceFAQ} />
        </div>
      </Container>
    </section>
  );
}
