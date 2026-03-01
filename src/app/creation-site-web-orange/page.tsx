import type { Metadata } from "next";
import { getCityBySlug } from "@/data/local-seo";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalAdvantages from "@/components/sections/local/LocalAdvantages";
import LocalFAQ from "@/components/sections/local/LocalFAQ";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const city = getCityBySlug("orange")!;

export const metadata: Metadata = {
  title:
    "Création de Site Web à Orange - Développeur Freelance Vaucluse",
  description:
    "Développeur web freelance à 10 min d'Orange (Vaucluse). Sites vitrines et e-commerce pour artisans, commerçants et vignerons près du Théâtre Antique et de Châteauneuf-du-Pape. Devis gratuit.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/creation-site-web-orange`,
  },
  openGraph: {
    title: "Création de Site Web à Orange | Kevin DX",
    description:
      "Développeur web freelance à 10 min d'Orange. Sites professionnels pour artisans et vignerons du Vaucluse. Devis gratuit.",
    url: `${SITE_CONFIG.url}/creation-site-web-orange`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de Site Web à Orange | Kevin DX",
    description:
      "Développeur web freelance près d'Orange. Sites vitrines et e-commerce pour artisans et vignerons du Vaucluse.",
  },
};

function OrangeJsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kevin DX - Développeur Web Freelance",
    description:
      "Création de sites web professionnels pour les entreprises d'Orange et du nord Vaucluse. Sites vitrines, e-commerce pour artisans, vignerons et commerçants.",
    url: `${SITE_CONFIG.url}/creation-site-web-orange`,
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
      name: "Orange",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Vaucluse",
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

  // Static JSON-LD structured data for SEO - built entirely from hardcoded string constants, no user input
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdData),
      }}
    />
  );
}

export default function CreationSiteWebOrangePage() {
  return (
    <>
      <OrangeJsonLd />

      <LocalHero city={city} />
      <LocalServices city={city} />

      {/* Contenu SEO unique pour Orange */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Artisans et vignerons d&apos;Orange : passez au numérique
            </h2>
            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <p>
                Orange est une ville à taille humaine où chaque commerce,
                chaque artisan et chaque vigneron compte. Avec {city.population}{" "}
                et une position stratégique au coeur de la vallée du Rhône, la
                cité du Théâtre Antique bénéficie d&apos;un flux touristique
                constant. Pourtant, de nombreuses entreprises locales n&apos;ont pas
                encore de site internet. C&apos;est une opportunité immense pour
                ceux qui franchissent le pas.
              </p>
              <p>
                Imaginez : un touriste quitte le Théâtre Antique et cherche sur
                son téléphone un restaurant, une boulangerie artisanale ou un
                domaine viticole pour une dégustation. Sans site web, votre
                entreprise n&apos;existe pas dans cette recherche. Avec un site
                professionnel et bien référencé, vous captez cette clientèle de
                passage qui s&apos;ajoute à vos fidèles clients locaux. Le
                retour sur investissement est souvent spectaculaire.
              </p>
              <p>
                Ma proximité avec Orange est un atout précieux. Basé à
                Roquemaure, à seulement 10 minutes en voiture, je suis
                littéralement votre voisin. Je connais les marchés provençaux,
                les vignobles de Châteauneuf-du-Pape, les boutiques du
                centre-ville et les défis auxquels font face les entrepreneurs
                orangeois. Cette connaissance du terrain transparaît dans chaque
                site que je crée : des visuels authentiques, des textes qui
                parlent à votre clientèle et un référencement ciblé sur votre
                zone de chalandise.
              </p>
              <p>
                Pour les domaines viticoles des environs d&apos;Orange, je
                propose des sites élégants avec catalogue de cuvées, réservation
                de visites de cave et possibilité de vente en ligne. Pour les
                commerçants et artisans du centre-ville, un site vitrine clair
                et efficace avec horaires, localisation et galerie de
                réalisations. Chaque projet est conçu sur mesure, avec un budget
                adapté aux réalités des petites entreprises provençales.
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
            <span className="text-accent">Orange</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Je suis à 10 minutes de chez vous. Passons nous voir pour discuter
            de votre projet autour d&apos;un café, ou organisons une visio.
            Première consultation gratuite.
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
