import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { caseStudies, getCaseStudyBySlug, getAllCaseStudySlugs } from "@/data/case-studies";
import CaseStudyHero from "@/components/sections/case-study/CaseStudyHero";
import CaseStudyChallenge from "@/components/sections/case-study/CaseStudyChallenge";
import CaseStudySolution from "@/components/sections/case-study/CaseStudySolution";
import CaseStudyResults from "@/components/sections/case-study/CaseStudyResults";
import CaseStudyTestimonial from "@/components/sections/case-study/CaseStudyTestimonial";
import CaseStudyCTA from "@/components/sections/case-study/CaseStudyCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Étude de cas introuvable" };
  }

  const url = `${SITE_CONFIG.url}/etudes-de-cas/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.seoTitle,
    description: study.seoDescription,
    url,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    about: {
      "@type": "Service",
      name: `Création de site web pour ${study.clientType.toLowerCase()}`,
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
      areaServed: {
        "@type": "City",
        name: study.city,
      },
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: study.testimonial.rating,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: study.testimonial.author,
      },
      reviewBody: study.testimonial.quote,
    },
  };

  return {
    title: study.seoTitle,
    description: study.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${study.seoTitle} | ${SITE_CONFIG.name}`,
      description: study.seoDescription,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "article",
      images: [{ url: "/og/default.png", width: 1200, height: 630, alt: study.seoTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.seoTitle} | ${SITE_CONFIG.name}`,
      description: study.seoDescription,
      images: ["/og/default.png"],
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const breadcrumbJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Études de cas",
        item: `${SITE_CONFIG.url}/etudes-de-cas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${study.clientType} — ${study.city}`,
        item: `${SITE_CONFIG.url}/etudes-de-cas/${slug}`,
      },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <CaseStudyHero study={study} />
      <CaseStudyChallenge study={study} />
      <CaseStudySolution study={study} />
      <CaseStudyResults study={study} />
      <CaseStudyTestimonial study={study} />
      <CaseStudyCTA />
    </>
  );
}
