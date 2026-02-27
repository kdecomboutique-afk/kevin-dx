import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templates } from "@/data/templates";
import { SITE_CONFIG } from "@/lib/constants";
import TemplateDetailClient from "./TemplateDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);

  if (!template) {
    return { title: "Template introuvable" };
  }

  const url = `${SITE_CONFIG.url}/templates/${id}`;
  const title = `${template.title} - Template ${template.category} | ${template.price || 99}\u20AC`;
  const description = `${template.longDescription || template.description} Code source Next.js, Lighthouse 95+, support 30 jours. ${template.price || 99}\u20AC TTC.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${template.title} - Template ${template.category} | Kevin DX`,
      description: template.longDescription || template.description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [{ url: template.image, width: 1200, height: 630, alt: template.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.title} - Template ${template.category} | Kevin DX`,
      description: template.longDescription || template.description,
      images: [template.image],
    },
  };
}

function TemplateProductJsonLd({ template }: { template: (typeof templates)[number] }) {
  // All values are hardcoded constants from the codebase (static template data),
  // not user input. Safe to serialize as structured data for SEO.
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${template.title} - Template ${template.category}`,
    description: template.longDescription || template.description,
    url: `${SITE_CONFIG.url}/templates/${template.id}`,
    brand: { "@type": "Brand", name: "Kevin DX" },
    offers: {
      "@type": "Offer",
      price: String(template.price || 99),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Person", name: "Kevin DX", url: SITE_CONFIG.url },
    },
    category: `Template ${template.category}`,
  });

  return (
    <script
      type="application/ld+json"
      // Content is derived from static codebase constants, not user input
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: data }}
    />
  );
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);

  if (!template) notFound();

  // Find similar templates (same category, or if not enough, closest categories)
  const sameCategory = templates.filter(
    (t) => t.category === template.category && t.id !== template.id
  );
  const otherTemplates = templates.filter(
    (t) => t.category !== template.category && t.id !== template.id
  );
  const similarTemplates = [
    ...sameCategory.slice(0, 2),
    ...(sameCategory.length < 2 ? otherTemplates.slice(0, 3 - sameCategory.length) : [otherTemplates[0]]),
  ].slice(0, 3);

  return (
    <>
      <TemplateProductJsonLd template={template} />
      <TemplateDetailClient
        template={template}
        similarTemplates={similarTemplates}
      />
    </>
  );
}
