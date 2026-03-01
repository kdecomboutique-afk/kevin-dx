import { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "plombier-nimes-site-web",
    clientType: "Plombier",
    clientName: "Bâtisseur Pro",
    city: "Nîmes",
    region: "Gard",
    templateId: "template-btp",
    templateName: "Bâtisseur Pro",
    heroMetric: { value: "+200%", label: "de demandes de devis" },
    tagline: "Comment un site moderne pourrait tripler les demandes de devis d'un plombier à Nîmes",
    challenge: {
      intro: "Comme beaucoup d'artisans, un plombier nîmois typique compte uniquement sur le bouche-à-oreille. Résultat : des périodes creuses imprévisibles et aucune visibilité en ligne.",
      painPoints: [
        {
          icon: "search",
          title: "Invisible sur Google",
          description: "Aucun site web, introuvable sur les recherches locales « plombier Nîmes » — les prospects allaient chez la concurrence.",
        },
        {
          icon: "clock",
          title: "Bouche-à-oreille aléatoire",
          description: "Pas de flux régulier de nouveaux clients. Des semaines chargées suivies de semaines vides, impossible de prévoir le chiffre d'affaires.",
        },
        {
          icon: "phone",
          title: "Appels non qualifiés",
          description: "Quand le téléphone sonnait, c'était souvent pour des urgences mal ciblées ou des demandes hors zone. Perte de temps considérable.",
        },
      ],
    },
    solution: {
      intro: "Un site vitrine professionnel optimisé pour le SEO local, conçu pour convertir les visiteurs en demandes de devis qualifiées.",
      features: [
        { title: "SEO local Nîmes", description: "Optimisation complète pour « plombier Nîmes », « plombier chauffagiste Gard » et toutes les requêtes locales pertinentes." },
        { title: "Formulaire de devis intelligent", description: "Formulaire multi-étapes qualifiant le type de travaux, le budget et l'urgence avant d'envoyer la demande." },
        { title: "Galerie de réalisations", description: "Photos avant/après des chantiers pour prouver le savoir-faire et rassurer les prospects." },
        { title: "Avis clients intégrés", description: "Témoignages vérifiés directement sur le site pour renforcer la crédibilité." },
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "SEO optimisé", "Formulaire intelligent"],
      price: "599€",
      duration: "2 semaines",
    },
    results: [
      { value: 200, suffix: "%", prefix: "+", label: "Demandes de devis" },
      { value: 1, suffix: "ère", label: "Position Google « plombier Nîmes »" },
      { value: 95, suffix: "/100", label: "Score Lighthouse" },
      { value: 15, suffix: "", label: "Nouveaux clients/mois" },
    ],
    testimonial: {
      quote: "Un artisan sans site web perd en moyenne 60% des prospects qui cherchent sur Google. Avec un site optimisé SEO local, un plombier à Nîmes peut capter les recherches « plombier Nîmes » et transformer chaque visite en demande de devis qualifiée.",
      author: "Projection basée sur les données SEO locales",
      role: "Scénario type — artisan BTP en Occitanie",
      rating: 5,
    },
    colorScheme: { primary: "#1e3a5f", accent: "#f59e0b" },
    lighthouseScore: 95,
    seoTitle: "Simulation : site web pour plombier à Nîmes — potentiel +200% de devis",
    seoDescription: "Découvrez comment un site web moderne et optimisé SEO pourrait tripler les demandes de devis d'un plombier à Nîmes. Simulation de projet Kevin DX.",
  },
  {
    slug: "restaurant-avignon-reservations",
    clientType: "Restaurant",
    clientName: "Saveur & Tradition",
    city: "Avignon",
    region: "Vaucluse",
    templateId: "template-restaurant",
    templateName: "Saveur & Tradition",
    heroMetric: { value: "40", label: "réservations en ligne/mois" },
    tagline: "Comment un restaurant avignonnais pourrait remplir ses tables grâce à la réservation en ligne",
    challenge: {
      intro: "Un restaurant familial d'Avignon typique a souvent une belle réputation locale, mais dépend entièrement des plateformes comme TheFork (avec leurs commissions) et des appels téléphoniques en plein service.",
      painPoints: [
        {
          icon: "percent",
          title: "Commissions des plateformes",
          description: "TheFork, TripAdvisor... chaque réservation coûtait entre 2€ et 5€ de commission. Sur un mois chargé, ça représentait des centaines d'euros perdus.",
        },
        {
          icon: "phone",
          title: "Téléphone qui sonne en service",
          description: "Le personnel devait quitter le service pour répondre au téléphone. Des réservations perdues pendant les rushs, une expérience dégradée pour les clients en salle.",
        },
        {
          icon: "eye",
          title: "Menu introuvable en ligne",
          description: "Le menu existait en PDF illisible sur mobile. Les clients ne pouvaient pas consulter les plats ni les prix avant de venir, freinant la décision.",
        },
      ],
    },
    solution: {
      intro: "Un site élégant avec le menu en ligne, un système de réservation intégré sans commission, et une présence Google My Business optimisée.",
      features: [
        { title: "Menu digital interactif", description: "Menu complet avec photos des plats, descriptions appétissantes et prix. Mis à jour facilement selon les saisons." },
        { title: "Réservation en ligne 0% commission", description: "Formulaire de réservation directe avec choix du créneau, nombre de couverts et demandes spéciales. Zéro intermédiaire." },
        { title: "Google My Business optimisé", description: "Fiche GMB connectée au site, photos professionnelles, horaires à jour, réponse aux avis." },
        { title: "Galerie ambiance", description: "Photos de l'intérieur, de la terrasse et des plats signatures pour donner envie avant même de réserver." },
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "Formulaire réservation", "SEO local"],
      price: "599€",
      duration: "2 semaines",
    },
    results: [
      { value: 40, suffix: "", label: "Réservations en ligne/mois" },
      { value: 0, suffix: "€", label: "Commission par réservation" },
      { value: 98, suffix: "/100", label: "Score Lighthouse" },
      { value: 35, suffix: "%", prefix: "+", label: "Chiffre d'affaires" },
    ],
    testimonial: {
      quote: "Un restaurant qui passe de TheFork à la réservation directe économise en moyenne 200 à 500 euros par mois en commissions. Un site avec formulaire de réservation intégré permet aux clients de réserver 24h/24 sans intermédiaire.",
      author: "Projection basée sur les données restauration",
      role: "Scénario type — restaurant en centre-ville",
      rating: 5,
    },
    colorScheme: { primary: "#2d1810", accent: "#c4841d" },
    lighthouseScore: 98,
    seoTitle: "Simulation : site web pour restaurant à Avignon — 40 réservations/mois",
    seoDescription: "Comment un site web moderne pourrait apporter 40 réservations en ligne par mois sans commission à un restaurant d'Avignon. Simulation de projet Kevin DX.",
  },
  {
    slug: "institut-beaute-tarascon",
    clientType: "Institut de beauté",
    clientName: "Éclat Beauté",
    city: "Tarascon",
    region: "Bouches-du-Rhône",
    templateId: "template-beaute",
    templateName: "Éclat Beauté",
    heroMetric: { value: "90%", label: "d'agenda rempli" },
    tagline: "Comment un institut de beauté à Tarascon pourrait remplir son agenda à 90% toute l'année",
    challenge: {
      intro: "Beaucoup d'esthéticiennes indépendantes ont du mal à fidéliser leur clientèle et à remplir leurs créneaux hors périodes de fêtes. Sans visibilité en ligne, elles dépendent des réseaux sociaux avec des résultats irréguliers.",
      painPoints: [
        {
          icon: "calendar",
          title: "Créneaux vides hors saison",
          description: "L'agenda se remplissait pour Noël et la Saint-Valentin, mais le reste de l'année, des journées entières restaient vides. Impossible de lisser le CA.",
        },
        {
          icon: "instagram",
          title: "Dépendance aux réseaux sociaux",
          description: "Tout passait par Instagram, mais l'algorithme changeait sans cesse. Un mois de likes ne garantissait pas un seul rendez-vous.",
        },
        {
          icon: "star",
          title: "Pas de vitrine professionnelle",
          description: "Aucun site web pour présenter les prestations et les tarifs. Les clientes devaient envoyer un DM pour connaître les prix — beaucoup abandonnaient.",
        },
      ],
    },
    solution: {
      intro: "Un site vitrine élégant avec catalogue de prestations, tarifs transparents, système de prise de rendez-vous et offres de fidélité intégrées.",
      features: [
        { title: "Catalogue de prestations", description: "Toutes les prestations avec descriptions détaillées, durées et tarifs clairs. Les clientes savent exactement ce qu'elles vont payer." },
        { title: "Prise de rendez-vous en ligne", description: "Réservation 24h/24 avec choix du soin, du créneau et envoi de confirmation automatique. Plus besoin de répondre au téléphone." },
        { title: "Programme fidélité visible", description: "Offres spéciales et forfaits mis en avant sur le site pour encourager la récurrence et la fidélisation." },
        { title: "SEO local Tarascon", description: "Optimisation pour « institut beauté Tarascon », « esthéticienne Tarascon » et toutes les variantes locales." },
      ],
      tech: ["Next.js", "React", "Tailwind CSS", "Réservation en ligne", "SEO local"],
      price: "599€",
      duration: "2 semaines",
    },
    results: [
      { value: 90, suffix: "%", label: "Agenda rempli" },
      { value: 60, suffix: "%", prefix: "+", label: "Nouvelles clientes" },
      { value: 99, suffix: "/100", label: "Score Lighthouse" },
      { value: 25, suffix: "%", prefix: "+", label: "Panier moyen" },
    ],
    testimonial: {
      quote: "Un institut de beauté avec prise de rendez-vous en ligne capte les réservations 24h/24 — y compris le soir quand les clientes ont le temps de s'en occuper. Le catalogue de prestations avec tarifs clairs élimine les allers-retours par DM Instagram.",
      author: "Projection basée sur les données beauté/bien-être",
      role: "Scénario type — esthéticienne indépendante",
      rating: 5,
    },
    colorScheme: { primary: "#4a2040", accent: "#d4a574" },
    lighthouseScore: 99,
    seoTitle: "Simulation : site web pour institut de beauté à Tarascon — agenda rempli à 90%",
    seoDescription: "Comment un site web avec réservation en ligne pourrait remplir l'agenda d'un institut de beauté à Tarascon à 90%. Simulation de projet Kevin DX.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.slug);
}
