"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animations/StaggerChildren";
import type { LocalCity } from "@/data/local-seo";

interface LocalServicesProps {
  city: LocalCity;
}

interface ServiceCardData {
  title: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  href: string;
}

function getServicesForCity(city: LocalCity): ServiceCardData[] {
  const industryPhrase = city.keyIndustries.slice(0, 2).join(" et ");
  const landmark = city.landmarks[0];

  return [
    {
      title: "Site Vitrine",
      price: "599",
      priceNote: "A partir de",
      description: `Un site professionnel pour presenter votre activite a ${city.name}. Ideal pour les acteurs du ${industryPhrase} qui souhaitent etre trouves en ligne par les clients locaux.`,
      features: [
        "Design responsive sur mesure",
        `SEO local ${city.name} et ${city.department}`,
        "Formulaire de contact integre",
        "Chatbot IA inclus",
        "Hebergement 1 an offert",
        "Eligible FAFCEA",
        "Livraison en 7 jours",
      ],
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
      href: "/site-vitrine",
    },
    {
      title: "E-Commerce",
      price: "1 590",
      priceNote: "A partir de",
      description: `Vendez vos produits en ligne depuis ${city.name}. Votre boutique pres de ${landmark} merite une vitrine numerique a la hauteur de votre savoir-faire.`,
      features: [
        "Boutique en ligne complete",
        "Paiement securise integre",
        "Gestion des stocks et commandes",
        "Chatbot IA 24h/24",
        "Relance paniers abandonnes",
        `Referencement ${city.name} et region`,
        "Eligible FAFCEA",
        "Formation a l'utilisation incluse",
      ],
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      ),
      popular: true,
      href: "/e-commerce",
    },
    {
      title: "Reseaux Sociaux",
      price: "199",
      priceNote: "/mois",
      description: `Developpez votre communaute locale a ${city.name} et dans le ${city.department}. Une strategie sur mesure pour toucher les habitants et les visiteurs de la region.`,
      features: [
        "3 publications par semaine",
        `Strategie adaptee au marche de ${city.name}`,
        "Creation de visuels professionnels",
        "Planification IA du contenu",
        "Community management reactif",
        "Rapport automatise mensuel",
      ],
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
          />
        </svg>
      ),
      href: "/reseaux-sociaux",
    },
  ];
}

export default function LocalServices({ city }: LocalServicesProps) {
  const services = getServicesForCity(city);

  return (
    <section id="tarifs" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge={`Services a ${city.name}`}
          title={`Mes services web à ${city.name}`}
          subtitle={`Des solutions digitales pensees pour les entreprises du ${city.department}. Du site vitrine au e-commerce, en passant par la gestion de vos reseaux sociaux.`}
        />

        <StaggerChildren
          className="grid gap-8 md:grid-cols-3"
          staggerDelay={0.12}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItemVariants}
              className={`group relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all duration-300 lg:p-8 ${
                service.popular
                  ? "border-accent shadow-lg shadow-accent/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
                  : "border-border hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
              }`}
            >
              {service.popular && (
                <>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
                  </div>
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      Populaire
                    </span>
                  </div>
                </>
              )}

              <div className="mb-6">
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    service.popular
                      ? "bg-accent/10 text-accent"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">
                  {service.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-sm text-text-muted">
                  {service.priceNote}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold text-primary">
                    {service.price}
                  </span>
                  <span className="text-lg text-text-muted">
                    {service.priceNote === "/mois" ? "\u20AC/mois" : "\u20AC"}
                  </span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className={`mt-0.5 h-5 w-5 shrink-0 ${
                        service.popular ? "text-accent" : "text-secondary"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-text">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={service.href}
                variant={service.popular ? "primary" : "secondary"}
                size="lg"
                className="w-full"
              >
                En savoir plus
              </Button>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
