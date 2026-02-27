import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { reseauxFAQ } from "@/data/faq";

export default function ReseauxFAQ() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Questions frequentes"
          subtitle="Tout ce que vous devez savoir sur la gestion de vos reseaux sociaux."
        />

        <div className="mx-auto max-w-3xl">
          <Accordion items={reseauxFAQ} />
        </div>
      </Container>
    </section>
  );
}
