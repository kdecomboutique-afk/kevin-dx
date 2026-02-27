import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { vitrineFAQ } from "@/data/faq";

export default function VitrineFAQ() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Questions frequentes"
          subtitle="Tout ce que vous devez savoir sur la creation de votre site vitrine."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={vitrineFAQ} />
        </div>
      </Container>
    </section>
  );
}
