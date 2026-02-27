import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import { ecommerceProcess } from "@/data/process-steps";

export default function EcommerceProcess() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Processus"
          title="De l'idee a la premiere vente"
          subtitle="Un processus structure en 5 etapes pour lancer votre boutique en ligne dans les meilleures conditions."
        />

        <div className="mx-auto max-w-2xl">
          <ProcessTimeline steps={ecommerceProcess} />
        </div>
      </Container>
    </section>
  );
}
