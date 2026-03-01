import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import QuoteCalculator from "@/components/sections/devis/QuoteCalculator";
import Accordion from "@/components/ui/Accordion";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Devis Gratuit - Estimez votre projet web en 2 minutes",
  description:
    "Calculez le coût de votre site vitrine, e-commerce ou gestion de réseaux sociaux en quelques clics. Devis gratuit et sans engagement. Réponse sous 24h.",
  path: "/devis",
});

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le calculateur de devis ?",
    answer:
      "Choisissez votre type de projet (site vitrine, e-commerce ou réseaux sociaux), sélectionnez les options souhaitées, et obtenez une estimation instantanée. Remplissez ensuite le formulaire pour recevoir un devis personnalisé et détaillé sous 24h.",
  },
  {
    question: "Le devis est-il vraiment gratuit et sans engagement ?",
    answer:
      "Absolument ! L'estimation en ligne est gratuite, et le devis personnalisé que je vous envoie par la suite n'engage à rien. Vous êtes libre de comparer et de prendre votre décision en toute sérénité.",
  },
  {
    question: "Les prix affichés sont-ils définitifs ?",
    answer:
      "Les prix affichés sont des estimations indicatives basées sur les options sélectionnées. Le devis final peut varier selon la complexité spécifique de votre projet. Chaque projet étant unique, j'ajuste les tarifs après avoir discuté de vos besoins précis.",
  },
  {
    question: "Sous quel délai recevrai-je mon devis personnalisé ?",
    answer:
      "Après avoir rempli le formulaire, je vous recontacte sous 24h (jours ouvrés) par email ou téléphone pour échanger sur votre projet et vous transmettre un devis détaillé adapté à vos besoins.",
  },
];

// JSON-LD FAQPage structured data — static content only, no user input.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function DevisPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                Gratuit et sans engagement
              </span>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Estimez votre projet{" "}
                <span className="text-gradient">en 2 minutes</span>
              </h1>
              <p className="mt-4 text-lg text-text-muted">
                Répondez à quelques questions et recevez une estimation
                personnalisée pour votre site vitrine, e-commerce ou gestion de
                réseaux sociaux.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Calculator */}
      <section className="py-12 lg:py-20">
        <Container>
          <Suspense>
            <QuoteCalculator />
          </Suspense>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface py-16 lg:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Questions fréquentes
              </h2>
              <p className="mt-4 text-lg text-text-muted">
                Tout ce que vous devez savoir sur le processus de devis.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mx-auto max-w-3xl">
              <Accordion items={FAQ_ITEMS} />
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
