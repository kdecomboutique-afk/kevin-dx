import type { Metadata } from "next";
import { getCityBySlug } from "@/data/local-seo";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalAdvantages from "@/components/sections/local/LocalAdvantages";
import LocalFAQ from "@/components/sections/local/LocalFAQ";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const city = getCityBySlug("montpellier")!;

export const metadata: Metadata = {
  title:
    "Création de Site Web à Montpellier - Développeur Freelance Hérault",
  description:
    "Développeur web freelance pour Montpellier et l'Hérault. Sites vitrines, e-commerce et réseaux sociaux pour startups, TPE et professions libérales. Tarifs freelance compétitifs, à partir de 599 EUR.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/creation-site-web-montpellier`,
  },
  openGraph: {
    title: "Création de Site Web à Montpellier | Kevin DX",
    description:
      "Développeur web freelance pour Montpellier. Sites modernes et performants pour les entreprises de l'Hérault. Devis gratuit.",
    url: `${SITE_CONFIG.url}/creation-site-web-montpellier`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de Site Web à Montpellier | Kevin DX",
    description:
      "Développeur web freelance pour Montpellier. Sites vitrines et e-commerce pour startups et TPE de l'Hérault.",
  },
};

function MontpellierJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kevin DX - Développeur Web Freelance",
    description:
      "Création de sites web professionnels pour les entreprises de Montpellier et de l'Hérault. Sites vitrines, e-commerce, startups et réseaux sociaux.",
    url: `${SITE_CONFIG.url}/creation-site-web-montpellier`,
    telephone: "+33 6 09 30 63 35",
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roquemaure",
      addressRegion: "Occitanie",
      postalCode: "30150",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "City",
      name: "Montpellier",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Hérault",
      },
    },
    priceRange: "599EUR - 1590EUR",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.facebook,
    ],
  };

  // Static JSON-LD structured data for SEO - built entirely from hardcoded constants
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export default function CreationSiteWebMontpellierPage() {
  return (
    <>
      <MontpellierJsonLd />

      <LocalHero city={city} />
      <LocalServices city={city} />

      {/* Contenu SEO unique pour Montpellier */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Un développeur web taillé pour la métropole montpelliéraine
            </h2>
            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <p>
                Montpellier est la métropole la plus dynamique du sud de la
                France. Avec {city.population}, une croissance démographique
                record et un écosystème tech en pleine effervescence, la ville
                offre des opportunités exceptionnelles pour les entrepreneurs.
                De la Place de la Comédie au quartier Antigone, en passant par
                les zones d&apos;activités de la périphérie, les entreprises
                montpelliéraines ont besoin de sites web à la hauteur de leurs
                ambitions.
              </p>
              <p>
                Le marché montpelliérain est vaste, avec des milliers de TPE
                et PME dont beaucoup n&apos;ont pas encore
                de site web professionnel. Avec des milliers de recherches mensuelles liées à la création de sites web à
                Montpellier, la demande est forte. Pourtant, les tarifs des
                agences web locales restent souvent prohibitifs pour les petites
                structures, les professions libérales et les commerçants
                indépendants.
              </p>
              <p>
                C&apos;est là que mon positionnement de freelance fait la
                différence. Basé à Roquemaure, à environ une heure de
                Montpellier, je propose des tarifs bien plus accessibles que
                ceux des agences montpelliéraines, sans compromis sur la
                qualité. J&apos;utilise les mêmes technologies de pointe :
                React, Next.js, Tailwind CSS. Mes
                clients montpelliérains vont des studios de yoga du quartier
                Antigone aux cabinets médicaux de l&apos;Écusson, en passant par
                les startups de la French Tech. Chaque projet est unique et
                reçoit une attention personnalisée.
              </p>
              <p>
                La collaboration à distance est parfaitement rodée : rendez-vous
                de lancement en personne à Montpellier, échanges réguliers par
                visioconférence, accès en temps réel à l&apos;avancement du
                projet. Vous bénéficiez de la flexibilité d&apos;un freelance
                avec la rigueur d&apos;un professionnel structuré. Et quand un
                rendez-vous en face à face est nécessaire, je me déplace à
                Montpellier sans hésiter.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <LocalAdvantages city={city} />
      <LocalFAQ city={city} />

      {/* CTA final */}
      <section className="bg-primary py-20 sm:py-28">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Prêt à lancer votre projet à{" "}
            <span className="text-accent">Montpellier</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Rencontrons-nous à Montpellier ou en visioconférence pour construire
            ensemble votre présence en ligne. Premier entretien offert, devis
            personnalisé sous 48 heures.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="bg-accent hover:bg-accent-dark px-10 py-5 text-lg shadow-[0_0_30px_rgba(255,107,53,0.4)]"
            >
              Demander un devis gratuit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
