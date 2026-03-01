"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";
import type { FAQ } from "@/types";

interface SectorCityFAQProps {
  sector: Sector;
  city: LocalCity;
}

function generateFAQ(sector: Sector, city: LocalCity): FAQ[] {
  return [
    {
      question: `Combien coûte un site internet pour ${sector.name.toLowerCase()} à ${city.name} ?`,
      answer: `Chez Kevin DX, un site vitrine professionnel pour votre ${sector.name.toLowerCase()} à ${city.name} démarre à 599\u20AC. Ce tarif comprend un design adapté à votre secteur, l'optimisation SEO locale pour ${city.name} et ${city.department}, un formulaire de contact, un chatbot IA et un an d'hébergement. Pour un site e-commerce, les tarifs débutent à 1 590\u20AC. Si vous êtes artisan, le financement FAFCEA peut couvrir jusqu'à 100% du coût.`,
    },
    {
      question: `Pourquoi choisir Kevin DX pour créer un site ${sector.name.toLowerCase()} à ${city.name} ?`,
      answer: `Basé à Roquemaure (${city.distance} de ${city.name}), je connais le tissu économique local et les attentes de vos clients. Ancien du BTP reconverti développeur web, je comprends les contraintes des professionnels. Mes sites sont construits en React/Next.js (pas WordPress), ce qui garantit un score Lighthouse 95+ et un excellent référencement Google. Et j'ai déjà un template spécialement conçu pour les ${sector.pluralName}.`,
    },
    {
      question: `En combien de temps mon site ${sector.name.toLowerCase()} sera-t-il prêt ?`,
      answer: `Un site vitrine est livré en 10 à 14 jours après validation de la maquette. Pour un site e-commerce, comptez 3 à 4 semaines. C'est 2 à 3 fois plus rapide qu'une agence classique grâce à mes templates sectoriels et mes outils IA. Le processus démarre par un entretien gratuit (en personne à ${city.name} ou en visio) pour comprendre vos besoins et vous présenter le template ${sector.name} que j'adapterai à votre image.`,
    },
    {
      question: `Mon site sera-t-il bien référencé pour les recherches à ${city.name} ?`,
      answer: `C'est l'une de mes priorités. Votre site sera optimisé pour les recherches locales comme "${sector.name.toLowerCase()} ${city.name}", "${sector.name.toLowerCase()} ${city.department}" et les variantes associées. Je configure également votre fiche Google Business Profile et j'intègre les données structurées (Schema.org) pour maximiser votre visibilité dans les résultats Google locaux et sur Google Maps.`,
    },
    {
      question: `Proposez-vous un suivi après la mise en ligne ?`,
      answer: `Oui, chaque projet inclut une formation pour gérer votre contenu en autonomie, plus une assistance technique réactive après la livraison. Des options de maintenance mensuelle sont disponibles. Étant ${city.distance} de ${city.name}, je reste facilement joignable et disponible pour des ajustements.`,
    },
  ];
}

export default function SectorCityFAQ({ sector, city }: SectorCityFAQProps) {
  const faqItems = generateFAQ(sector, city);

  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="FAQ"
          title={`Questions fréquentes — ${sector.name} à ${city.name}`}
          subtitle="Tout ce que vous devez savoir avant de créer votre site."
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
