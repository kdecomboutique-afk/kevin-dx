import type { Metadata } from "next";
import { getCityBySlug } from "@/data/local-seo";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";
import LocalHero from "@/components/sections/local/LocalHero";
import LocalServices from "@/components/sections/local/LocalServices";
import LocalAdvantages from "@/components/sections/local/LocalAdvantages";
import LocalFAQ from "@/components/sections/local/LocalFAQ";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const city = getCityBySlug("nimes")!;

export const metadata: Metadata = {
  title: "Création de Site Web à Nîmes - Développeur Freelance",
  description:
    "Développeur web freelance près de Nîmes (Gard). Création de sites vitrines, e-commerce et gestion réseaux sociaux pour TPE, artisans et commerçants nîmois. Devis gratuit, à partir de 599 EUR.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/creation-site-web-nimes`,
  },
  openGraph: {
    title: "Création de Site Web à Nîmes - Développeur Freelance | Kevin DX",
    description:
      "Développeur web freelance à 30 min de Nîmes. Sites professionnels pour les entreprises du Gard. Devis gratuit.",
    url: `${SITE_CONFIG.url}/creation-site-web-nimes`,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Création de Site Web à Nîmes | Kevin DX",
    description:
      "Développeur web freelance près de Nîmes. Sites vitrines et e-commerce pour TPE et artisans du Gard.",
  },
};

function NimesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kevin DX - Développeur Web Freelance",
    description:
      "Création de sites web professionnels pour les entreprises de Nîmes et du Gard. Sites vitrines, e-commerce et réseaux sociaux.",
    url: `${SITE_CONFIG.url}/creation-site-web-nimes`,
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
      name: "Nîmes",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Gard",
      },
    },
    priceRange: "599EUR - 1590EUR",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://linkedin.com/in/kevin-dx",
      "https://github.com/kevin-dx",
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      // Static JSON-LD structured data for SEO - no user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function CreationSiteWebNimesPage() {
  return (
    <>
      <NimesJsonLd />

      <LocalHero city={city} />
      <LocalServices city={city} />

      {/* Contenu SEO unique pour Nîmes */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
              Votre partenaire web dans le Gard
            </h2>
            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <p>
                Nimes, avec ses {city.population} et son patrimoine antique
                exceptionnel, est une ville où le numérique transforme
                profondément les habitudes de consommation. Que vous teniez un
                restaurant près des Arènes, une boutique dans le quartier de
                l&apos;Écusson ou un atelier d&apos;artisanat d&apos;art, votre
                présence en ligne est devenue indispensable pour attirer une
                clientèle locale et touristique.
              </p>
              <p>
                Les chiffres sont parlants : de nombreuses TPE
                et PME du bassin nîmois ne disposent
                toujours pas d&apos;un site web digne de ce nom, alors que la demande
                en ligne ne cesse de croître. Chaque mois,
                des centaines d&apos;internautes recherchent sur Google un prestataire web
                à Nîmes. C&apos;est une opportunité immense pour les
                entreprises qui souhaitent se démarquer.
              </p>
              <p>
                En tant que développeur web basé à Roquemaure, à seulement 30
                minutes de Nîmes, je comprends les enjeux spécifiques du marché
                gardois. Le {city.keyIndustries.join(", ")} constituent les
                piliers économiques de la cité nîmoise. Mon approche consiste à
                créer des sites web qui parlent directement à vos clients, qu&apos;ils
                soient des habitants fidèles ou des touristes de passage découvrant{" "}
                {city.landmarks.join(", ")}.
              </p>
              <p>
                Contrairement aux agences web parisiennes ou aux grandes
                structures montpelliéraines, je vous offre un accompagnement
                humain et personnalisé. Un seul interlocuteur, des rendez-vous
                possibles en face à face dans le centre-ville de Nîmes, et une
                réactivité que seul un freelance de proximité peut garantir.
                Votre site sera conçu avec les technologies les plus modernes
                (React, Next.js) tout en restant simple à gérer au quotidien.
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
            <span className="text-accent">Nîmes</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Discutons de votre projet autour d&apos;un café dans le centre-ville
            de Nîmes ou en visioconférence. Premier entretien gratuit et sans
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
