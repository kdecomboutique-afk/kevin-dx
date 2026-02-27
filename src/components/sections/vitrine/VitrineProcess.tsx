import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/ui/ProcessTimeline";
import { vitrineProcess } from "@/data/process-steps";

export default function VitrineProcess() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Processus"
          title="Comment ca se passe ?"
          subtitle="Un processus simple et transparent en 5 etapes, de la premiere discussion a la mise en ligne de votre site."
        />

        <div className="mx-auto max-w-2xl">
          <ProcessTimeline steps={vitrineProcess} />
        </div>
      </Container>
    </section>
  );
}
