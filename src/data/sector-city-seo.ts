import { localCities } from "./local-seo";

export interface Sector {
  slug: string;
  name: string;
  pluralName: string;
  templateId: string;
  icon: string;
  painPoints: string[];
  features: string[];
  benefits: string[];
  socialProof?: string;
}

export const sectors: Sector[] = [
  {
    slug: "restaurant",
    name: "Restaurant",
    pluralName: "restaurants",
    templateId: "template-restaurant",
    icon: "utensils",
    painPoints: [
      "Vos clients potentiels cherchent \"restaurant\" sur Google et tombent sur vos concurrents",
      "Votre menu n'est pas visible en ligne ou n'est pas à jour",
      "Vous n'avez pas de système de réservation en ligne et perdez des couverts",
    ],
    features: [
      "Menu interactif avec photos et prix",
      "Réservation en ligne intégrée",
      "Galerie photos de vos plats et de votre établissement",
      "Carte Google Maps et itinéraire",
      "Avis clients mis en avant",
    ],
    benefits: [
      "Augmentez vos réservations de 40% en moyenne",
      "Apparaissez en tête des recherches locales",
      "Fidélisez votre clientèle avec une présence digitale soignée",
    ],
    socialProof: "Les restaurants avec un site web reçoivent en moyenne 30% de réservations en plus",
  },
  {
    slug: "artisan",
    name: "Artisan",
    pluralName: "artisans",
    templateId: "template-artisan",
    icon: "wrench",
    painPoints: [
      "Vos clients vous trouvent uniquement par le bouche-à-oreille, ça limite votre croissance",
      "Vous n'avez pas de portfolio en ligne pour montrer vos réalisations",
      "Les demandes de devis arrivent par téléphone entre deux chantiers et vous en oubliez",
    ],
    features: [
      "Portfolio de réalisations avec photos avant/après",
      "Formulaire de demande de devis en ligne",
      "Témoignages clients vérifiés",
      "Présentation de vos certifications et assurances",
      "Zone d'intervention sur carte",
    ],
    benefits: [
      "Recevez des demandes de devis même en dehors des heures ouvrées",
      "Montrez la qualité de votre travail avec des photos de chantiers",
      "Gagnez en crédibilité face à la concurrence",
    ],
    socialProof: "60% des prospects cherchent un artisan en ligne avant de décrocher le téléphone",
  },
  {
    slug: "immobilier",
    name: "Agence immobilière",
    pluralName: "agences immobilières",
    templateId: "template-immobilier",
    icon: "building",
    painPoints: [
      "Votre catalogue de biens n'est visible que sur les portails (SeLoger, Leboncoin) qui prennent de grosses commissions",
      "Votre site actuel ne reflète pas le standing de votre agence",
      "Les acheteurs potentiels quittent votre site car il n'est pas mobile-friendly",
    ],
    features: [
      "Catalogue de biens avec recherche avancée",
      "Fiches détaillées avec galerie photos et visite virtuelle",
      "Formulaire de contact par bien",
      "Estimation en ligne",
      "Intégration avec votre logiciel de gestion",
    ],
    benefits: [
      "Réduisez votre dépendance aux portails immobiliers",
      "Attirez des mandats exclusifs grâce à une image professionnelle",
      "Générez des leads qualifiés directement depuis votre site",
    ],
  },
  {
    slug: "coiffeur",
    name: "Salon de coiffure",
    pluralName: "salons de coiffure",
    templateId: "template-beaute",
    icon: "scissors",
    painPoints: [
      "Vos clients doivent appeler pour prendre rendez-vous — et ils abandonnent quand c'est occupé",
      "Vous n'avez pas de vitrine en ligne pour présenter vos prestations et tarifs",
      "Votre salon n'apparaît pas dans les recherches Google locales",
    ],
    features: [
      "Prise de rendez-vous en ligne 24h/24",
      "Catalogue de prestations avec tarifs",
      "Galerie de réalisations (coupes, colorations, coiffures)",
      "Présentation de l'équipe",
      "Lien vers vos réseaux sociaux",
    ],
    benefits: [
      "Remplissez votre planning même quand le salon est fermé",
      "Réduisez les no-shows avec les rappels automatiques",
      "Attirez une nouvelle clientèle via Google",
    ],
    socialProof: "Les salons avec réservation en ligne voient leur taux de remplissage augmenter de 25%",
  },
  {
    slug: "btp",
    name: "Entreprise BTP",
    pluralName: "entreprises du BTP",
    templateId: "template-btp",
    icon: "hardhat",
    painPoints: [
      "Vos chantiers parlent pour vous, mais personne ne les voit en ligne",
      "Les particuliers et promoteurs vous comparent avec des concurrents qui ont un beau site",
      "Vous recevez des appels pour des zones où vous n'intervenez pas",
    ],
    features: [
      "Showcase de chantiers avec photos avant/après",
      "Demande de devis en ligne qualifiée",
      "Certifications et assurances bien visibles (RGE, Qualibat, décennale)",
      "Zone d'intervention claire",
      "Témoignages de maîtres d'ouvrage",
    ],
    benefits: [
      "Gagnez des appels d'offres grâce à une image professionnelle",
      "Filtrez les demandes de devis par zone et type de travaux",
      "Valorisez vos certifications pour rassurer les clients",
    ],
    socialProof: "Les entreprises BTP avec un site web obtiennent 2x plus de demandes de devis qualifiées",
  },
  {
    slug: "commerce",
    name: "Commerce",
    pluralName: "commerces",
    templateId: "template-commerce",
    icon: "store",
    painPoints: [
      "Vos clients fidèles ne savent pas quand vous êtes ouvert ou quelles sont vos nouveautés",
      "Vous perdez des ventes face aux commerces en ligne",
      "Votre visibilité se limite au passage devant votre vitrine",
    ],
    features: [
      "Présentation de vos produits phares",
      "Click & collect intégré",
      "Horaires, accès et plan",
      "Programme de fidélité",
      "Newsletter et promotions",
    ],
    benefits: [
      "Attirez de nouveaux clients au-delà de votre quartier",
      "Proposez le click & collect pour augmenter votre chiffre d'affaires",
      "Fidélisez avec une newsletter automatisée",
    ],
  },
  {
    slug: "garage",
    name: "Garage automobile",
    pluralName: "garages",
    templateId: "template-auto-expert",
    icon: "car",
    painPoints: [
      "Les automobilistes cherchent un garage sur Google et vous n'apparaissez pas",
      "Vos clients doivent appeler pour connaître vos disponibilités",
      "Vous ne pouvez pas mettre en avant vos spécialités (diagnostic, climatisation, etc.)",
    ],
    features: [
      "Prise de rendez-vous en ligne",
      "Liste de services et spécialités",
      "Demande de devis rapide",
      "Avis clients",
      "Présentation de l'équipe et des équipements",
    ],
    benefits: [
      "Remplissez vos créneaux de maintenance préventive",
      "Réduisez les appels téléphoniques chronophages",
      "Fidélisez avec des rappels de révision automatiques",
    ],
  },
  {
    slug: "fleuriste",
    name: "Fleuriste",
    pluralName: "fleuristes",
    templateId: "template-petales-fleurs",
    icon: "flower",
    painPoints: [
      "Les commandes de dernière minute (mariages, deuils, fêtes) vous échappent car les clients commandent en ligne",
      "Votre savoir-faire artistique n'est pas visible au-delà de votre vitrine",
      "Vous ne proposez pas la livraison en ligne",
    ],
    features: [
      "Catalogue de bouquets et compositions",
      "Commande en ligne avec livraison",
      "Galerie de réalisations événementielles",
      "Abonnement bouquet hebdomadaire",
      "Planning des fêtes et événements",
    ],
    benefits: [
      "Vendez 24h/24, même quand la boutique est fermée",
      "Touchez les clients qui offrent des fleurs à distance",
      "Augmentez votre panier moyen avec les abonnements",
    ],
  },
  {
    slug: "sante",
    name: "Cabinet de santé",
    pluralName: "cabinets de santé",
    templateId: "template-cabinet-sante",
    icon: "medical",
    painPoints: [
      "Vos patients potentiels ne trouvent pas vos coordonnées ou spécialités en ligne",
      "Vous passez trop de temps au téléphone pour gérer les rendez-vous",
      "Votre cabinet n'a pas de présence professionnelle en ligne",
    ],
    features: [
      "Prise de rendez-vous en ligne (Doctolib, Crenolib ou intégré)",
      "Présentation des spécialités et approches",
      "Informations pratiques (tarifs, mutuelles, accès)",
      "FAQ pour les patients",
      "Blog santé pour le référencement",
    ],
    benefits: [
      "Réduisez les appels téléphoniques de 50%",
      "Rassurez vos patients avant la première consultation",
      "Améliorez votre visibilité sur les recherches de santé locales",
    ],
  },
  {
    slug: "coach",
    name: "Coach sportif",
    pluralName: "coachs sportifs",
    templateId: "template-coach-energie",
    icon: "fitness",
    painPoints: [
      "Votre activité repose uniquement sur Instagram et le bouche-à-oreille",
      "Vous n'avez pas de plateforme pour vendre vos programmes en ligne",
      "Les prospects veulent voir vos résultats avant de s'engager",
    ],
    features: [
      "Présentation de vos programmes et tarifs",
      "Réservation de séances en ligne",
      "Témoignages et transformations clients",
      "Blog fitness avec conseils",
      "Lien vers vos réseaux sociaux",
    ],
    benefits: [
      "Vendez des programmes en ligne en plus du coaching présentiel",
      "Gagnez en crédibilité avec un site pro qui montre vos résultats",
      "Automatisez vos réservations de séances",
    ],
  },
  {
    slug: "photographe",
    name: "Photographe",
    pluralName: "photographes",
    templateId: "template-studio-lumiere",
    icon: "camera",
    painPoints: [
      "Votre portfolio est dispersé entre Instagram, Facebook et un dossier Google Drive",
      "Les clients ne trouvent pas vos tarifs et ne vous contactent pas",
      "Vous n'apparaissez pas quand quelqu'un cherche un photographe local",
    ],
    features: [
      "Portfolio par catégories (mariage, portrait, corporate, etc.)",
      "Grille tarifaire claire",
      "Formulaire de réservation",
      "Galerie plein écran pour mettre en valeur vos images",
      "Blog et coulisses de shooting",
    ],
    benefits: [
      "Montrez votre style et attirez les clients qui vous correspondent",
      "Professionnalisez votre image et justifiez vos tarifs",
      "Réduisez les allers-retours de devis avec des tarifs affichés",
    ],
  },
  {
    slug: "avocat",
    name: "Cabinet d'avocat",
    pluralName: "cabinets d'avocats",
    templateId: "template-maitre-droit",
    icon: "gavel",
    painPoints: [
      "Les justiciables cherchent un avocat sur Google et vous n'apparaissez pas dans les résultats locaux",
      "Votre cabinet ne projette pas l'image de sérieux que vous méritez en ligne",
      "Les clients potentiels ne comprennent pas vos domaines d'expertise",
    ],
    features: [
      "Présentation des domaines d'expertise",
      "Prise de rendez-vous en ligne",
      "Grille d'honoraires transparente",
      "Blog juridique pour le référencement",
      "Formulaire de contact sécurisé",
    ],
    benefits: [
      "Inspirez confiance dès le premier clic",
      "Attirez des dossiers correspondant à vos spécialités",
      "Réduisez les consultations hors-spécialité",
    ],
  },
  {
    slug: "ecommerce",
    name: "Boutique en ligne",
    pluralName: "boutiques en ligne",
    templateId: "template-boutique-mode",
    icon: "shopping-bag",
    painPoints: [
      "Vous vendez sur les marketplaces (Etsy, Amazon) qui prennent d'énormes commissions",
      "Vous n'avez pas de boutique en ligne propre à votre marque",
      "Votre taux de conversion est bas car votre site n'est pas optimisé",
    ],
    features: [
      "Boutique complète avec panier et paiement sécurisé",
      "Fiches produits optimisées avec photos et descriptions",
      "Gestion des stocks et variantes",
      "Relance automatique paniers abandonnés (IA)",
      "Tableau de bord des ventes",
    ],
    benefits: [
      "Arrêtez de payer 15-30% de commission aux marketplaces",
      "Contrôlez votre image de marque de A à Z",
      "Augmentez votre panier moyen avec les ventes croisées",
    ],
  },
  {
    slug: "agence",
    name: "Agence",
    pluralName: "agences",
    templateId: "template-agence-digitale",
    icon: "briefcase",
    painPoints: [
      "Votre site actuel ne reflète pas la qualité de vos prestations",
      "Vos prospects comparent votre site avec ceux de vos concurrents et le trouvent daté",
      "Vous n'avez pas de showcase projets convaincant",
    ],
    features: [
      "Showcase projets premium avec études de cas",
      "Présentation de l'équipe et des compétences",
      "Blog et contenus de thought leadership",
      "Formulaire de contact qualifié",
      "Intégration CRM",
    ],
    benefits: [
      "Projetez une image aussi premium que vos prestations",
      "Convertissez les visiteurs en leads qualifiés",
      "Positionnez-vous comme référence dans votre domaine",
    ],
  },
  {
    slug: "bien-etre",
    name: "Centre de bien-être",
    pluralName: "centres de bien-être",
    templateId: "template-bien-etre",
    icon: "spa",
    painPoints: [
      "Vos clients ne connaissent pas toute l'étendue de vos soins et forfaits",
      "La prise de rendez-vous par téléphone vous fait perdre des clients hors horaires",
      "Votre ambiance zen ne transpire pas dans votre présence en ligne",
    ],
    features: [
      "Catalogue de soins avec descriptions et durées",
      "Réservation en ligne 24h/24",
      "Forfaits et cartes cadeaux",
      "Galerie immersive de votre espace",
      "Témoignages clients",
    ],
    benefits: [
      "Vendez des forfaits et cartes cadeaux en ligne",
      "Remplissez vos créneaux creux grâce à la réservation en ligne",
      "Attirez une clientèle bien-être qui cherche sur Google",
    ],
  },
  {
    slug: "saas",
    name: "Startup / SaaS",
    pluralName: "startups",
    templateId: "template-app-launch",
    icon: "rocket",
    painPoints: [
      "Votre landing page ne convertit pas assez de visiteurs en utilisateurs",
      "Votre site ne reflète pas l'innovation de votre produit",
      "Vous n'avez pas les compétences front-end en interne pour un site premium",
    ],
    features: [
      "Landing page haute conversion",
      "Présentation produit avec captures et démo",
      "Grille tarifaire interactive",
      "Intégrations et API documentées",
      "Blog technique et changelog",
    ],
    benefits: [
      "Augmentez votre taux de conversion avec un design premium",
      "Projetez une image de startup sérieuse auprès des investisseurs",
      "Lancez rapidement avec un template éprouvé",
    ],
  },
];

export const seoTargetCities = ["nimes", "avignon", "montpellier", "orange", "ales"] as const;

export type SEOTargetCity = (typeof seoTargetCities)[number];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

export interface SectorCityCombo {
  sector: Sector;
  city: (typeof localCities)[number];
  slug: string; // e.g. "site-internet-restaurant-nimes" (full URL slug)
}

export function generateAllSectorCityCombinations(): SectorCityCombo[] {
  const combos: SectorCityCombo[] = [];

  for (const sector of sectors) {
    for (const citySlug of seoTargetCities) {
      const city = localCities.find((c) => c.slug === citySlug);
      if (city) {
        combos.push({
          sector,
          city,
          slug: `site-internet-${sector.slug}-${city.slug}`,
        });
      }
    }
  }

  return combos;
}
