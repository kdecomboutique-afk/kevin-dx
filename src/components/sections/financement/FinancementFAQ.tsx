"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/animations/FadeIn";
import type { FAQ } from "@/types";

const faqItems: FAQ[] = [
  {
    question: "C'est quoi le FAFCEA exactement ?",
    answer:
      "Le FAFCEA (Fonds d'Assurance Formation des Chefs d'Entreprises Artisanales) est un organisme qui finance la formation des artisans. Si vous êtes chef d'entreprise artisanale et que vous payez la Contribution à la Formation Professionnelle (CFP), vous pouvez obtenir un financement pour vous former — y compris à la création et gestion d'un site web. Le FAFCEA prend en charge jusqu'à 80\u20AC/heure de formation, pour un maximum d'environ 4 800\u20AC par an.",
  },
  {
    question: "Qui est éligible au financement FAFCEA ?",
    answer:
      "Sont éligibles les chefs d'entreprise artisanale (pas les salariés) inscrits au Répertoire National des Entreprises (RNE) et à jour de leur Contribution à la Formation Professionnelle (CFP). Cela concerne les artisans du bâtiment (plombiers, électriciens, couvreurs, maçons...), de l'alimentation (boulangers, restaurateurs, traiteurs...), de la fabrication et des services. Les auto-entrepreneurs récents (moins d'un an) peuvent ne pas être éligibles car la CFP n'a pas encore été versée.",
  },
  {
    question: "Combien est financé concrètement ?",
    answer:
      "Le FAFCEA rembourse jusqu'à 80\u20AC par heure de formation. Pour un site vitrine (599\u20AC, incluant 14h de formation), le financement FAFCEA peut couvrir 1 120\u20AC — soit largement plus que le coût du site. Pour un site e-commerce (1 590\u20AC, incluant 21h de formation), le financement peut atteindre 1 680\u20AC. Dans les deux cas, le reste à charge peut être de 0\u20AC.",
  },
  {
    question: "Quelles démarches faut-il faire ?",
    answer:
      "La démarche se fait en ligne sur le site du FAFCEA. Vous remplissez un formulaire de demande de prise en charge avant le début de la formation, en précisant le thème (création de site web / marketing digital), la durée et le coût. Une fois la formation terminée, vous envoyez les justificatifs (attestation de présence, facture) et le FAFCEA procède au remboursement sous quelques semaines. Je vous accompagne dans toutes ces étapes.",
  },
  {
    question: "C'est quoi Qualiopi ? C'est obligatoire ?",
    answer:
      "Qualiopi est une certification qualité pour les organismes de formation. Certains financeurs l'exigent. Pour le FAFCEA, la certification Qualiopi n'est pas toujours obligatoire mais elle facilite grandement la prise en charge. Note de transparence : je suis en cours de certification Qualiopi. En attendant, je vous accompagne dans les démarches et vous aide à monter votre dossier pour maximiser vos chances d'obtenir le financement.",
  },
  {
    question: "Quelle est la différence entre FAFCEA et OPCO ?",
    answer:
      "Le FAFCEA finance les formations des chefs d'entreprise artisanale (les dirigeants). Les OPCO (Opérateurs de Compétences) financent les formations des salariés. Si vous êtes artisan à votre compte, c'est le FAFCEA qui vous concerne. Si vous avez des salariés que vous souhaitez former, c'est l'OPCO correspondant à votre branche qui interviendra. Dans les deux cas, je peux vous orienter.",
  },
];

export default function FinancementFAQ() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title="Questions fréquentes sur le financement"
          subtitle="Tout ce que vous devez savoir sur le FAFCEA et le financement de votre site."
        />

        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Accordion items={faqItems} />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
