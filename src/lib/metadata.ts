import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function createMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
    },
  };
}
