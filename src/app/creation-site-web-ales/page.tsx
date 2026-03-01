import type { Metadata } from "next";
import { getCityBySlug } from "@/data/local-seo";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalAdvantages from "@/components/sections/local/LocalAdvantages";
import LocalFAQ from "@/components/sections/local/LocalFAQ";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const city = getCityBySlug("ales")!;

export const metadata: Metadata = {
  title:
    "Création de Site Web à Alès - Développeur Freelance Gard Cévennes",
  description:
    "Développeur web freelance pour Alès et les Cévennes (Gard). Sites vitrines, e-commerce et réseaux sociaux pour artisans, gîtes, hébergements touristiques et commerçants. Devis gratuit.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/creation-site-web-ales`,
  },
  openGraph: {
    title: "Création de Site Web à Alès - Cévennes | Kevin DX",
    description:
      "Développeur web freelance pour Alès et les Cévennes. Sites professionnels pour les entreprises du Gard. Devis gratuit.",
    url: `${SITE_CONFIG.url}/creation-site-web-ales`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de Site Web à Alès | Kevin DX",
    description:
      "Développeur web freelance pour Alès. Sites vitrines et e-commerce pour TPE, gîtes et artisans des Cévennes.",
  },
};

function AlesJsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kevin DX - Développeur Web Freelance",
    description:
      "Création de sites web professionnels pour les entreprises d'Alès, des Cévennes et du nord du Gard. Sites vitrines, e-commerce, gîtes et hébergements touristiques.",
    url: `${SITE_CONFIG.url}/creation-site-web-ales`,
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
      name: "Alès",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gard",
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

  const serialized = JSON.stringify(jsonLdData);

  // Static SEO structured data from hardcoded constants only - safe to render
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

export default function CreationSiteWebAlesPage() {
  return (
    <>
      <AlesJsonLd />

      <LocalHero city={city} />
      <LocalServices city={city} />

      {/* Contenu SEO unique pour Alès */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Alès et les Cévennes : un territoire qui mérite le numérique
            </h2>
            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <p>
                Alès, porte d&apos;entrée des Cévennes et deuxième ville du
                Gard, est un territoire en pleine mutation. Avec{" "}
                {city.population} et un bassin de vie de plus de 100 000
                habitants, la cité cévenole offre un marché dynamique pour les
                entrepreneurs. Qu&apos;il s&apos;agisse d&apos;artisans du
                centre-ville, de propriétaires de gîtes dans les Cévennes ou de
                commerçants du marché couvert, la transition numérique est une
                nécessité pour rester compétitif.
              </p>
              <p>
                Aujourd&apos;hui, de nombreuses entreprises alésiennes n&apos;ont pas de
                site internet. C&apos;est un chiffre qui représente à la fois un
                retard et une opportunité formidable. Les visiteurs des Cévennes,
                les amateurs de la Bambouseraie d&apos;Anduze et les randonneurs
                du Parc national recherchent activement en ligne les
                hébergements, restaurants et activités de la région. Un site web
                bien référencé vous place en première ligne pour capter ces
                visiteurs.
              </p>
              <p>
                Bien que basé à Roquemaure, à environ une heure d&apos;Alès, je
                travaille régulièrement avec des entrepreneurs du bassin
                alésien. Ma connaissance du Gard, de ses dynamiques économiques
                et de ses spécificités territoriales me permet de créer des
                sites web ancrés dans la réalité locale. Pour les hébergements
                touristiques, je conçois des sites avec système de réservation
                intégré qui réduisent votre dépendance aux grandes plateformes
                et leurs commissions parfois lourdes.
              </p>
              <p>
                Le tourisme vert et les Cévennes attirent une clientèle qui
                valorise l&apos;authenticité et le local. Votre site web doit
                refléter ces valeurs. Pas de templates génériques ni de sites
                standardisés : chaque projet est pensé pour raconter votre
                histoire, mettre en avant votre savoir-faire et convaincre les
                visiteurs de franchir votre porte. Avec des tarifs accessibles
                à partir de 599 EUR, la création d&apos;un site professionnel
                est un investissement à la portée de toutes les entreprises
                alésiennes.
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
            <span className="text-accent">Alès</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Discutons de votre projet par visioconférence ou lors d&apos;un
            déplacement à Alès. Première consultation gratuite, devis détaillé
            sous 48 heures.
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
