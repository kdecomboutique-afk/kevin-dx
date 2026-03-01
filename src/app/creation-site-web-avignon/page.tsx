import type { Metadata } from "next";
import { getCityBySlug } from "@/data/local-seo";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalAdvantages from "@/components/sections/local/LocalAdvantages";
import LocalFAQ from "@/components/sections/local/LocalFAQ";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const city = getCityBySlug("avignon")!;

export const metadata: Metadata = {
  title:
    "Création de Site Web à Avignon - Développeur Freelance Vaucluse",
  description:
    "Développeur web freelance à 15 min d'Avignon (Vaucluse). Sites vitrines, e-commerce et réseaux sociaux pour commerçants, vignerons et professionnels du tourisme. Devis gratuit.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/creation-site-web-avignon`,
  },
  openGraph: {
    title: "Création de Site Web à Avignon | Kevin DX",
    description:
      "Développeur web freelance à 15 min d'Avignon. Sites professionnels pour les entreprises du Vaucluse. Devis gratuit.",
    url: `${SITE_CONFIG.url}/creation-site-web-avignon`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de Site Web à Avignon | Kevin DX",
    description:
      "Développeur web freelance près d'Avignon. Sites vitrines et e-commerce pour TPE et artisans du Vaucluse.",
  },
};

function AvignonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kevin DX - Développeur Web Freelance",
    description:
      "Création de sites web professionnels pour les entreprises d'Avignon et du Vaucluse. Sites vitrines, e-commerce, domaines viticoles et réseaux sociaux.",
    url: `${SITE_CONFIG.url}/creation-site-web-avignon`,
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
      name: "Avignon",
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

  // Static JSON-LD structured data for SEO, built from hardcoded constants only
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function CreationSiteWebAvignonPage() {
  return (
    <>
      <AvignonJsonLd />

      <LocalHero city={city} />
      <LocalServices city={city} />

      {/* Contenu SEO unique pour Avignon */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Le web au service des entreprises avignonnaises
            </h2>
            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <p>
                Avignon, cité des Papes et joyau du Vaucluse, vit au rythme de
                son célèbre Festival et de son patrimoine culturel unique. Avec{" "}
                {city.population}, la ville attire chaque année des millions de
                visiteurs du monde entier. Pour les professionnels avignonnais,
                qu&apos;il s&apos;agisse d&apos;un restaurant de la Place de
                l&apos;Horloge, d&apos;un domaine viticole des Côtes du Rhône ou
                d&apos;une boutique des remparts, la visibilité en ligne est
                devenue un levier de croissance incontournable.
              </p>
              <p>
                Le bassin avignonnais regorge de TPE et PME, dont une part
                importante n&apos;a toujours pas de site internet. C&apos;est un paradoxe pour une ville aussi
                touristique : les visiteurs cherchent spontanément sur leur
                smartphone les bonnes adresses, les activités et les hébergements
                à proximité du Palais des Papes ou du Pont d&apos;Avignon. Sans
                présence web, ces entreprises restent invisibles au moment même
                où les clients les cherchent.
              </p>
              <p>
                Ma situation géographique à Roquemaure, à seulement 15 minutes
                d&apos;Avignon, est un atout majeur. Je traverse régulièrement le
                Rhône pour rencontrer mes clients avignonnais et je connais
                intimement l&apos;écosystème local. La viticulture, avec les
                appellations Châteauneuf-du-Pape et Côtes du Rhône, le
                spectacle vivant autour du Festival, l&apos;hôtellerie et le
                commerce intra-muros : chaque secteur a ses codes et ses
                attentes spécifiques en matière de site web.
              </p>
              <p>
                Faire appel à un développeur freelance de proximité plutôt
                qu&apos;à une agence distante, c&apos;est la garantie d&apos;un
                site qui parle le langage de vos clients. Je conçois des sites
                web rapides, esthétiques et optimisés pour le référencement local,
                avec un rapport qualité-prix imbattable. Du premier entretien à
                la mise en ligne, en passant par chaque validation de maquette,
                vous avez un interlocuteur unique, disponible et à votre écoute.
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
            <span className="text-accent">Avignon</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Retrouvons-nous près du Palais des Papes ou en visioconférence pour
            donner vie à votre projet web. Première consultation gratuite et sans
            engagement.
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
