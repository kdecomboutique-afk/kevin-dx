"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { footerLinks } from "@/data/navigation";
import { SITE_CONFIG, CONTACT, SOCIAL_LINKS } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/*  Social Icon                                                        */
/* ------------------------------------------------------------------ */
function SocialIcon({ platform }: { platform: "linkedin" | "github" | "instagram" }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "github":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Tech stack logos (small inline SVGs)                                */
/* ------------------------------------------------------------------ */
function TechIcons() {
  return (
    <div className="flex items-center gap-4 mt-4">
      {/* Next.js */}
      <span className="text-gray-500 hover:text-white transition-colors" title="Next.js">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" />
        </svg>
      </span>
      {/* React */}
      <span className="text-gray-500 hover:text-[#61DAFB] transition-colors" title="React">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.541-2.602-4.887-2.602-.31 0-.6.045-.871.135a1.71 1.71 0 00-1.024.97c-.49 1.203.344 3.137 2.213 5.34a39.5 39.5 0 00-.794 1.328c-2.533.662-4.277 1.907-4.277 3.352 0 1.446 1.744 2.69 4.278 3.353.244.47.502.928.773 1.37-1.87 2.204-2.703 4.137-2.213 5.34.229.562.692.952 1.201 1.074.178.04.363.06.552.06 1.346 0 3.107-.96 4.888-2.622 1.78 1.653 3.541 2.602 4.887 2.602.31 0 .6-.045.871-.135a1.71 1.71 0 001.024-.97c.49-1.203-.344-3.137-2.213-5.34.272-.443.53-.9.793-1.37 2.534-.662 4.278-1.907 4.278-3.352 0-1.446-1.744-2.69-4.278-3.353a27.14 27.14 0 00-.773-1.37c1.87-2.203 2.703-4.136 2.213-5.34-.23-.561-.693-.951-1.2-1.073a2.29 2.29 0 00-.553-.06zM6.35 8.886c-.413-.717-.773-1.423-1.074-2.098-.44-1.093-.554-1.944-.306-2.55.126-.31.371-.51.682-.596a1.3 1.3 0 01.402-.057c.89 0 2.258.69 3.758 2.013a28.18 28.18 0 00-1.73 1.627c-.673.076-1.26.162-1.732.252zm3.653 5.09a43.91 43.91 0 01-1.566-2.592 37.73 37.73 0 011.566-2.592c.566-.026 1.15-.04 1.75-.04s1.184.014 1.75.04c.54.86 1.064 1.733 1.567 2.592a43.91 43.91 0 01-1.566 2.592c-.567.026-1.15.04-1.75.04s-1.185-.014-1.751-.04zm5.28-.338c.367.66.713 1.33 1.035 2.005.44 1.093.554 1.943.306 2.55-.126.31-.371.51-.682.596a1.3 1.3 0 01-.402.057c-.89 0-2.258-.69-3.758-2.013a28.172 28.172 0 001.73-1.627 27.78 27.78 0 001.771-.568zm-4.025 4.133c-.777-.856-1.555-1.83-2.32-2.918a32.2 32.2 0 002.31-.146 32.9 32.9 0 002.32.146 28.52 28.52 0 01-2.31 2.918zm-3.513-1.723c-.67-.076-1.26-.162-1.732-.252a24.44 24.44 0 01-1.074-2.098c-.44-1.093-.554-1.944-.306-2.55.126-.31.371-.51.682-.596.12-.032.252-.047.402-.047.89 0 2.258.69 3.758 2.013a28.172 28.172 0 00-1.73 1.53zm9.723-6.25c.413.716.773 1.422 1.074 2.098.44 1.093.554 1.944.306 2.55-.126.31-.371.51-.682.596a1.3 1.3 0 01-.402.057c-.89 0-2.258-.69-3.758-2.013a28.08 28.08 0 001.73-1.627c.673-.076 1.26-.162 1.732-.252zm-1.259-1.157a32.2 32.2 0 00-2.31.146 28.52 28.52 0 01-2.32-2.918c.777.856 1.555 1.83 2.32 2.918a32.2 32.2 0 002.31-.146z" />
        </svg>
      </span>
      {/* Tailwind */}
      <span className="text-gray-500 hover:text-[#06B6D4] transition-colors" title="Tailwind CSS">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      </span>
      {/* TypeScript */}
      <span className="text-gray-500 hover:text-[#3178C6] transition-colors" title="TypeScript">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Back to top button                                                 */
/* ------------------------------------------------------------------ */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/25 transition-colors hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label="Retour en haut"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  JSON-LD schema                                                     */
/* ------------------------------------------------------------------ */
function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Roquemaure",
      addressRegion: "Occitanie",
      addressCountry: "FR",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github, SOCIAL_LINKS.instagram],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-dark text-white">
      <LocalBusinessJsonLd />
      <BackToTop />

      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-secondary to-accent bg-[length:200%_100%] animate-[gradient-x_4s_ease_infinite]" />

      {/* Mini CTA Section */}
      <div className="border-b border-white/10 bg-white/[0.03]">
        <Container className="py-10 lg:py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                Un projet en tête ? Discutons-en !
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Obtenez un devis gratuit et personnalisé sous 24 heures.
              </p>
            </div>
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="shrink-0 bg-accent hover:bg-accent-dark"
            >
              Parlons de votre projet
            </Button>
          </div>
        </Container>
      </div>

      {/* Main footer content */}
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo + Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="36"
                height="36"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="10" fill="#FF6B35" />
                <text
                  x="50%"
                  y="54%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fill="white"
                  fontWeight="bold"
                  fontSize="16"
                  fontFamily="system-ui"
                >
                  KD
                </text>
              </svg>
              <span className="font-heading text-lg font-bold">
                Kevin <span className="text-accent">DX</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Développeur web freelance spécialisé dans la création de sites
              professionnels pour TPE, PME et artisans en Occitanie.
            </p>

            {/* Tech stack icons */}
            <TechIcons />

            {/* Social icons - larger */}
            <div className="mt-6 flex gap-3">
              {(
                Object.entries(SOCIAL_LINKS) as [
                  "linkedin" | "github" | "instagram",
                  string,
                ][]
              ).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-gray-400 transition-all duration-300 hover:bg-accent hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-accent/20"
                  aria-label={`Suivez-moi sur ${platform}`}
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zones d'intervention */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Zones d&apos;intervention
            </h3>
            <ul className="space-y-3">
              {footerLinks.villes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-gray-400 transition-colors hover:text-accent"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="text-sm text-gray-400 transition-colors hover:text-accent"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400">
                  {CONTACT.location}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400">
                  {CONTACT.availability}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-gray-500 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <p className="text-xs text-gray-500">
              &copy; {currentYear} {SITE_CONFIG.name}. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500">
              Conçu et développé avec passion en Occitanie
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
