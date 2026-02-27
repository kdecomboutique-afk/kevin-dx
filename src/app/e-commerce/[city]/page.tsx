import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";
import { getCityBySlug } from "@/data/local-seo";
import { getServiceBySlug, serviceCityTargets } from "@/data/service-city-seo-pages";
import ServiceCityHero from "@/components/sections/service-city/ServiceCityHero";
import ServiceCityFeatures from "@/components/sections/service-city/ServiceCityFeatures";
import ServiceCityPricing from "@/components/sections/service-city/ServiceCityPricing";
import ServiceCityProcess from "@/components/sections/service-city/ServiceCityProcess";
import ServiceCityContent from "@/components/sections/service-city/ServiceCityContent";
import ServiceCityFAQ from "@/components/sections/service-city/ServiceCityFAQ";
import ServiceCityCTA from "@/components/sections/service-city/ServiceCityCTA";

const service = getServiceBySlug("e-commerce")!;

export function generateStaticParams() {
  return serviceCityTargets.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Boutique E-Commerce à ${city.name} — Création dès 1 590€ | Kevin DX`;
  const description = `Création de boutique e-commerce professionnelle à ${city.name}. Paiement sécurisé, gestion des stocks, SEO e-commerce optimisé pour ${city.name} et le ${city.department}. Devis gratuit.`;

  return {
    ...createMetadata({
      title,
      description,
      path: `/e-commerce/${city.slug}`,
    }),
    other: {
      "script:ld+json": JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Création de boutique e-commerce à ${city.name}`,
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
            price: "1590",
            priceCurrency: "EUR",
            description: `Boutique e-commerce professionnelle à ${city.name}`,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE_CONFIG.name,
          url: `${SITE_CONFIG.url}/e-commerce/${city.slug}`,
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

export default async function EcommerceCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return (
    <>
      <ServiceCityHero service={service} city={city} />
      <ServiceCityFeatures service={service} city={city} />
      <ServiceCityPricing service={service} city={city} />
      <ServiceCityProcess service={service} city={city} />
      <ServiceCityContent service={service} city={city} />
      <ServiceCityFAQ service={service} city={city} />
      <ServiceCityCTA service={service} city={city} />
    </>
  );
}
