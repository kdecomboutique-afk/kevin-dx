import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function createMetadata({ title, description, path, image }: PageMeta): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || "/og/default.png";

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage],
    },
  };
}
