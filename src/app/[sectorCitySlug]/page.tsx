import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";
import { generateAllSectorCityCombinations } from "@/data/sector-city-seo";
import SectorCityHero from "@/components/sections/sector-city/SectorCityHero";
import SectorCityPainPoints from "@/components/sections/sector-city/SectorCityPainPoints";
import SectorCitySolution from "@/components/sections/sector-city/SectorCitySolution";
import SectorCityPricing from "@/components/sections/sector-city/SectorCityPricing";
import SectorCityFAQ from "@/components/sections/sector-city/SectorCityFAQ";
import SectorCityCTA from "@/components/sections/sector-city/SectorCityCTA";

const allCombinations = generateAllSectorCityCombinations();

function findCombo(slug: string) {
  return allCombinations.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return allCombinations.map((combo) => ({
    sectorCitySlug: combo.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sectorCitySlug: string }>;
}): Promise<Metadata> {
  const { sectorCitySlug } = await params;
  const combo = findCombo(sectorCitySlug);
  if (!combo) return {};

  const { sector, city } = combo;
  const title = `Site internet ${sector.name.toLowerCase()} à ${city.name} | Kevin DX — à partir de 599\u20AC`;
  const description = `Création de site internet pour ${sector.name.toLowerCase()} à ${city.name}. Design sur mesure, SEO local, score Lighthouse 95+. Devis gratuit. Basé ${city.distance} de ${city.name}.`;

  return {
    ...createMetadata({
      title,
      description,
      path: `/${combo.slug}`,
    }),
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Création de site internet pour ${sector.name.toLowerCase()} à ${city.name}`,
          description,
          provider: {
            "@type": "LocalBusiness",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
            telephone: CONTACT.phone,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Roquemaure",
              addressRegion: "Occitanie",
              postalCode: "30150",
              addressCountry: "FR",
            },
          },
          areaServed: {
            "@type": "City",
            name: city.name,
          },
          offers: {
            "@type": "Offer",
            price: "599",
            priceCurrency: "EUR",
            description: `Site vitrine professionnel pour ${sector.name.toLowerCase()} à ${city.name}`,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE_CONFIG.name,
          url: `${SITE_CONFIG.url}/${combo.slug}`,
          telephone: CONTACT.phone,
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
            name: city.name,
          },
        },
      ]),
    },
  };
}

export default async function SectorCityPage({
  params,
}: {
  params: Promise<{ sectorCitySlug: string }>;
}) {
  const { sectorCitySlug } = await params;
  const combo = findCombo(sectorCitySlug);
  if (!combo) notFound();

  const { sector, city } = combo;

  return (
    <>
      <SectorCityHero sector={sector} city={city} />
      <SectorCityPainPoints sector={sector} city={city} />
      <SectorCitySolution sector={sector} city={city} />
      <SectorCityPricing sector={sector} city={city} />
      <SectorCityFAQ sector={sector} city={city} />
      <SectorCityCTA sector={sector} city={city} />
    </>
  );
}
