import type { LocalCity } from "@/data/local-seo";
import { localCities } from "@/data/local-seo";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface ServiceCityConfig {
  slug: string;
  name: string;
  verb: string;
  price: string;
  priceLabel: string;
  priceNote?: string;
  features: ServiceFeature[];
  benefits: string[];
  hasProcess: boolean;
  getCityIntro: (city: LocalCity) => string;
  getCityContent: (city: LocalCity) => CityContentBlock[];
  getCityFAQ: (city: LocalCity) => CityFAQItem[];
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: "globe" | "search" | "mobile" | "zap" | "shield" | "chart" | "palette" | "share" | "calendar" | "camera" | "target" | "megaphone";
}

export interface CityContentBlock {
  heading: string;
  text: string;
}

export interface CityFAQItem {
  question: string;
  answer: string;
}

// ─── Target cities ──────────────────────────────────────────────────────────────

export const serviceCityTargets = ["nimes", "avignon", "montpellier", "orange", "ales"] as const;

// ─── Site Vitrine ───────────────────────────────────────────────────────────────

const vitrineConfig: ServiceCityConfig = {
  slug: "site-vitrine",
  name: "Site Vitrine",
  verb: "Création de site vitrine",
  price: "599",
  priceLabel: "599€",
  hasProcess: true,
  features: [
    {
      title: "Design sur mesure",
      description: "Un design unique qui reflète votre identité visuelle et inspire confiance à vos clients.",
      icon: "palette",
    },
    {
      title: "SEO local optimisé",
      description: "Référencement naturel ciblé sur votre ville et votre activité pour attirer des clients locaux.",
      icon: "search",
    },
    {
      title: "100% responsive",
      description: "Votre site s'adapte parfaitement sur mobile, tablette et ordinateur. Approche mobile-first.",
      icon: "mobile",
    },
    {
      title: "Performance maximale",
      description: "Score Lighthouse 95+ garanti. Temps de chargement ultra-rapide pour une expérience optimale.",
      icon: "zap",
    },
    {
      title: "Sécurité SSL incluse",
      description: "Certificat HTTPS, protection des données et conformité RGPD pour rassurer vos visiteurs.",
      icon: "shield",
    },
    {
      title: "Suivi & analytics",
      description: "Tableau de bord pour suivre vos visiteurs, vos pages les plus consultées et vos conversions.",
      icon: "chart",
    },
  ],
  benefits: [
    "Visibilité locale accrue sur Google dès la mise en ligne",
    "Crédibilité professionnelle renforcée auprès de vos prospects",
    "Génération de demandes de devis et d'appels qualifiés",
  ],
  getCityIntro: (city) => {
    const intros: Record<string, string> = {
      nimes: `À Nîmes, ville de ${city.population} au cœur du Gard, votre site vitrine est votre meilleur commercial. Entre ${city.landmarks[0]}, ${city.landmarks[4]} et les nombreux commerces de centre-ville, la concurrence est forte. Un site professionnel vous distingue et capte les clients qui cherchent vos services sur Google. Basé ${city.distance} de Nîmes, je crée des sites vitrines performants qui génèrent des résultats concrets.`,
      avignon: `Avignon, cité des Papes et capitale culturelle du Vaucluse avec ses ${city.population}, est un terrain de jeu idéal pour les entrepreneurs. Entre ${city.landmarks[0]}, ${city.landmarks[4]} et le commerce intra-muros, la visibilité en ligne est devenue indispensable. Basé ${city.distance} d'Avignon, je conçois des sites vitrines qui captent aussi bien la clientèle locale que les touristes internationaux.`,
      montpellier: `Montpellier, métropole de ${city.population} en plein essor, est un marché dynamique où la concurrence en ligne est intense. Entre ${city.landmarks[0]}, le quartier ${city.landmarks[2]} et l'écosystème tech florissant, votre site vitrine doit être irréprochable pour vous démarquer. Mes tarifs de freelance sont 2 à 3 fois inférieurs aux agences montpelliéraines, pour une qualité équivalente.`,
      orange: `Orange, perle du Vaucluse avec ses ${city.population}, combine patrimoine historique et économie de proximité. Avec ${city.landmarks[0]} classé UNESCO et les vignobles de Châteauneuf-du-Pape, votre site vitrine doit capter à la fois les habitants et les touristes. Basé ${city.distance} d'Orange, je suis votre développeur web de proximité.`,
      ales: `Alès, porte des Cévennes et ses ${city.population}, est une ville en pleine transformation. De ${city.landmarks[0]} au ${city.landmarks[1]}, le bassin alésien regorge d'opportunités pour les entrepreneurs connectés. Un site vitrine professionnel vous positionne en tête des recherches locales et vous distingue de la concurrence.`,
    };
    return intros[city.slug] || "";
  },
  getCityContent: (city) => {
    const content: Record<string, CityContentBlock[]> = {
      nimes: [
        {
          heading: "Un site vitrine adapté au marché nîmois",
          text: `Le tissu économique nîmois est riche et diversifié : ${city.keyIndustries.join(", ")}. Chaque secteur a ses codes, ses attentes et ses clients cibles. Je conçois votre site vitrine en tenant compte des spécificités de votre marché à Nîmes. Votre site sera optimisé pour les recherches locales comme "votre métier + Nîmes" ou "votre métier + Gard", ce qui vous positionne directement face aux prospects qui cherchent vos services.`,
        },
        {
          heading: "Proximité et réactivité depuis Roquemaure",
          text: `Basé à Roquemaure, ${city.distance} de Nîmes, je me déplace régulièrement dans le ${city.department} pour rencontrer mes clients. Contrairement aux agences parisiennes ou aux plateformes offshore, vous bénéficiez d'un interlocuteur unique, disponible pour des rendez-vous en personne dans le centre-ville de Nîmes. Cette proximité se traduit aussi dans la connaissance du marché local que j'intègre dans votre site.`,
        },
      ],
      avignon: [
        {
          heading: "Un site vitrine qui capte la clientèle avignonnaise",
          text: `Avignon vit au rythme de ses secteurs clés : ${city.keyIndustries.join(", ")}. Votre site vitrine doit parler à cette clientèle diversifiée, des habitants intra-muros aux touristes de passage pour ${city.landmarks[4]}. J'optimise chaque page pour les recherches locales dans le ${city.department}, avec un contenu qui résonne avec le public avignonnais et une structure technique que Google apprécie.`,
        },
        {
          heading: "Votre développeur web à 15 minutes d'Avignon",
          text: `La proximité est mon atout majeur. Depuis Roquemaure, je suis ${city.distance} d'Avignon par la route. Je connais le territoire, les attentes des commerçants de la rue de la République, des restaurateurs de ${city.landmarks[2]} et des viticulteurs des Côtes du Rhône. Ce n'est pas une agence distante qui gère votre projet, c'est un développeur local qui comprend votre réalité quotidienne.`,
        },
      ],
      montpellier: [
        {
          heading: "Un site vitrine compétitif sur le marché montpelliérain",
          text: `Montpellier est un marché exigeant porté par ${city.keyIndustries.join(", ")}. Les professionnels montpelliérains attendent un site web moderne, rapide et bien référencé. Ma stack technique (React, Next.js) est celle utilisée par les startups de ${city.landmarks[2]} — pas du WordPress générique. Votre site vitrine sera techniquement au niveau des meilleurs sites montpelliérains, à un tarif de freelance.`,
        },
        {
          heading: "Des tarifs freelance vs les agences montpelliéraines",
          text: `Les agences web de Montpellier facturent généralement entre 2 000 et 8 000€ pour un site vitrine. Mon positionnement de freelance indépendant me permet de proposer la même qualité dès 599€, sans intermédiaires ni charges de structure. La distance d'environ 1h depuis Roquemaure n'est jamais un frein : visio, email et déplacements ponctuels assurent un suivi fluide et personnalisé.`,
        },
      ],
      orange: [
        {
          heading: "Un site vitrine pour se démarquer à Orange",
          text: `À Orange, beaucoup de commerces et artisans n'ont pas encore de site web professionnel. C'est une opportunité : avec un site vitrine bien conçu, vous captez les recherches des ${city.population} et des milliers de touristes qui visitent ${city.landmarks[0]} chaque année. Votre site sera optimisé pour les recherches locales dans le ${city.department}, avec un accent sur les spécificités orangeoises : ${city.keyIndustries.slice(0, 3).join(", ")}.`,
        },
        {
          heading: "Le développeur le plus proche d'Orange",
          text: `${city.distance} de votre commerce ou atelier — c'est la distance qui me sépare d'Orange. Cette proximité unique me permet de vous rencontrer facilement, de comprendre votre activité sur le terrain et de créer un site qui reflète authentiquement votre entreprise. Pas de questionnaire impersonnel, mais un vrai échange humain pour un site qui vous ressemble.`,
        },
      ],
      ales: [
        {
          heading: "Un site vitrine adapté au bassin alésien",
          text: `Le bassin d'Alès et ses environs cévenols comptent des secteurs porteurs : ${city.keyIndustries.join(", ")}. Votre site vitrine sera conçu pour toucher à la fois les habitants d'Alès et les visiteurs du ${city.landmarks[1]}. J'intègre un référencement local ciblé sur le ${city.department} qui vous positionne en tête des résultats quand un prospect cherche votre activité dans la région.`,
        },
        {
          heading: "Un développeur gardois qui connaît votre territoire",
          text: `Basé dans le Gard comme vous, je comprends les réalités du marché alésien et cévenol. Même si Alès est ${city.distance} de Roquemaure, de nombreux professionnels alésiens me font confiance. Je me déplace pour les rendez-vous clés et assure un suivi réactif par visio et email. Votre site bénéficie d'un ancrage local authentique que les plateformes nationales ne peuvent pas offrir.`,
        },
      ],
    };
    return content[city.slug] || [];
  },
  getCityFAQ: (city) => [
    {
      question: `Combien coûte un site vitrine à ${city.name} ?`,
      answer: `Un site vitrine professionnel pour les entreprises de ${city.name} démarre à 599€ (pack Starter, jusqu'à 5 pages). Le pack Pro à 999€ offre des pages illimitées, un blog intégré et un SEO avancé. Ces tarifs incluent le design sur mesure, l'optimisation SEO locale pour ${city.name} et le ${city.department}, un formulaire de contact et l'hébergement première année.`,
    },
    {
      question: `En combien de temps mon site vitrine sera-t-il prêt à ${city.name} ?`,
      answer: `Votre site vitrine est livré en 10 à 14 jours après validation de la maquette. C'est 2 à 3 fois plus rapide qu'une agence classique grâce à mes templates sectoriels et mes outils IA. Le premier rendez-vous peut se faire en personne à ${city.name} (je suis basé ${city.distance}) ou en visioconférence.`,
    },
  ],
};

// ─── E-Commerce ─────────────────────────────────────────────────────────────────

const ecommerceConfig: ServiceCityConfig = {
  slug: "e-commerce",
  name: "E-Commerce",
  verb: "Création de boutique e-commerce",
  price: "1590",
  priceLabel: "1 590€",
  hasProcess: true,
  features: [
    {
      title: "Boutique complète",
      description: "Catalogue produits, fiches détaillées, variantes, gestion des stocks — tout ce qu'il faut pour vendre.",
      icon: "globe",
    },
    {
      title: "Paiement sécurisé",
      description: "Intégration Stripe et PayPal pour des transactions sûres. Conformité PCI DSS incluse.",
      icon: "shield",
    },
    {
      title: "SEO e-commerce",
      description: "Référencement optimisé pour vos produits et votre ville. Apparaissez dans les recherches d'achat locales.",
      icon: "search",
    },
    {
      title: "Mobile-first",
      description: "Parcours d'achat fluide sur smartphone. Plus de 65% des achats en ligne se font sur mobile.",
      icon: "mobile",
    },
    {
      title: "Relance automatique",
      description: "Récupérez les paniers abandonnés grâce aux emails de relance automatiques et personnalisés.",
      icon: "target",
    },
    {
      title: "Analytics & conversions",
      description: "Suivez vos ventes, votre taux de conversion et votre panier moyen en temps réel.",
      icon: "chart",
    },
  ],
  benefits: [
    "Canal de vente ouvert 24h/24, 7j/7 sans contrainte géographique",
    "Augmentation du chiffre d'affaires grâce à la vente en ligne",
    "Fidélisation client avec paniers sauvegardés et emails personnalisés",
  ],
  getCityIntro: (city) => {
    const intros: Record<string, string> = {
      nimes: `Les consommateurs nîmois achètent de plus en plus en ligne. Avec ${city.population}, Nîmes représente un marché considérable pour les commerçants qui veulent développer leur activité sur internet. Que vous vendiez des produits artisanaux, de la gastronomie locale ou des services, une boutique e-commerce vous ouvre un canal de vente disponible 24h/24, bien au-delà des limites de votre commerce physique.`,
      avignon: `Avignon et le Vaucluse offrent un potentiel e-commerce exceptionnel. Entre les produits du terroir provençal, les créations artisanales et le rayonnement culturel de la ville, vos produits méritent une vitrine en ligne à la hauteur. Une boutique e-commerce bien conçue vous permet de vendre à ${city.population} d'Avignonnais, aux touristes de retour chez eux et à toute la France.`,
      montpellier: `Montpellier est la ville la plus dynamique du sud de la France en matière de commerce en ligne. Avec ${city.population} connectés et un pouvoir d'achat en hausse, c'est le moment idéal pour lancer votre boutique e-commerce. Les consommateurs montpelliérains sont tech-savvy et exigeants — votre site doit être rapide, intuitif et sécurisé pour les convertir.`,
      orange: `À Orange, le potentiel e-commerce est particulièrement fort pour les produits locaux : vins de Châteauneuf-du-Pape, produits provençaux, artisanat d'art. Les touristes qui visitent ${city.landmarks[0]} veulent pouvoir racheter en ligne ce qu'ils ont découvert sur place. Une boutique e-commerce prolonge l'expérience client bien au-delà de la visite physique.`,
      ales: `Le bassin alésien et les Cévennes regorgent de produits authentiques qui méritent une diffusion plus large : artisanat cévenol, produits du terroir, services locaux. Avec une boutique e-commerce professionnelle, vous touchez les ${city.population} du bassin de vie d'Alès, les visiteurs du ${city.landmarks[1]} et les amateurs de produits cévenols dans toute la France.`,
    };
    return intros[city.slug] || "";
  },
  getCityContent: (city) => {
    const content: Record<string, CityContentBlock[]> = {
      nimes: [
        {
          heading: "E-commerce adapté au marché nîmois",
          text: `Le commerce en ligne à Nîmes connaît une croissance soutenue, portée par les secteurs de ${city.keyIndustries.slice(0, 3).join(", ")}. Je conçois votre boutique en tenant compte des habitudes d'achat locales et du pouvoir d'achat gardois. Chaque fiche produit est optimisée pour le référencement, chaque parcours d'achat est pensé pour maximiser les conversions. Votre boutique sera aussi performante qu'un grand site national, avec l'authenticité en plus.`,
        },
        {
          heading: "Support de proximité pour votre boutique en ligne",
          text: `Lancer un e-commerce nécessite un accompagnement de qualité. Basé ${city.distance} de Nîmes, je vous forme en personne à la gestion de votre boutique : ajout de produits, suivi des commandes, gestion des stocks. Pas de ticket support anonyme — un interlocuteur unique qui connaît votre projet et peut intervenir rapidement en cas de besoin.`,
        },
      ],
      avignon: [
        {
          heading: "Une boutique e-commerce au cœur du Vaucluse",
          text: `L'économie avignonnaise est portée par ${city.keyIndustries.join(", ")}. Votre boutique en ligne peut cibler aussi bien les Avignonnais que les touristes internationaux. J'intègre des fonctionnalités adaptées au marché local : multi-langue pour les visiteurs étrangers, référencement local pour le ${city.department}, et un design qui reflète l'élégance provençale.`,
        },
        {
          heading: "De la boutique physique au e-commerce",
          text: `Vous avez déjà un commerce intra-muros à Avignon ? Votre boutique en ligne devient le prolongement naturel de votre activité. Les clients qui vous découvrent près de ${city.landmarks[0]} ou sur ${city.landmarks[2]} peuvent commander en ligne une fois rentrés chez eux. Je crée cette passerelle entre physique et digital pour maximiser votre chiffre d'affaires.`,
        },
      ],
      montpellier: [
        {
          heading: "Un e-commerce taillé pour le marché montpelliérain",
          text: `Les consommateurs de Montpellier sont parmi les plus connectés de France. Votre boutique e-commerce doit rivaliser avec les standards techniques des startups de ${city.landmarks[2]}. Ma stack React/Next.js garantit des performances de premier ordre : temps de chargement inférieur à 2 secondes, parcours d'achat fluide et taux de conversion optimisé. Le tout à un tarif de freelance, pas d'agence.`,
        },
        {
          heading: "E-commerce + SEO local : la combinaison gagnante",
          text: `Le référencement e-commerce à Montpellier est un levier puissant. "Acheter + produit + Montpellier" génère des milliers de recherches chaque mois. Votre boutique sera optimisée pour ces requêtes commerciales, avec des pages produits structurées, des données Schema.org et un maillage interne qui plaît à Google. Résultat : plus de trafic qualifié et plus de ventes.`,
        },
      ],
      orange: [
        {
          heading: "E-commerce et terroir : le duo gagnant à Orange",
          text: `Les vignobles de Châteauneuf-du-Pape, l'artisanat provençal, les produits du marché — Orange et ses environs regorgent de trésors à vendre en ligne. Je crée des boutiques qui mettent en valeur l'authenticité de vos produits avec des visuels soignés, des descriptions qui donnent envie et un parcours d'achat simple. Vos clients retrouvent en ligne la chaleur de l'expérience en boutique.`,
        },
        {
          heading: "Vendre au-delà d'Orange grâce au e-commerce",
          text: `Votre commerce physique touche les ${city.population} et les touristes. Votre boutique en ligne touche toute la France. Pour un artisan ou commerçant d'Orange, c'est un changement d'échelle considérable. Je m'occupe de toute la partie technique — paiement, livraison, stocks — pour que vous puissiez vous concentrer sur vos produits et vos clients.`,
        },
      ],
      ales: [
        {
          heading: "E-commerce cévenol : valorisez vos produits en ligne",
          text: `Le terroir cévenol a une identité forte qui séduit bien au-delà du Gard. Vos produits locaux, votre artisanat, vos services méritent une boutique en ligne qui reflète cette authenticité. Je conçois des sites e-commerce qui racontent une histoire — celle de votre savoir-faire ancré dans les Cévennes — tout en offrant une expérience d'achat moderne et sécurisée.`,
        },
        {
          heading: "Accompagnement e-commerce dans le Gard",
          text: `Lancer une boutique en ligne quand on est artisan ou commerçant à Alès, ça peut sembler complexe. C'est pourquoi je vous accompagne de A à Z : de la stratégie produit à la mise en ligne, en passant par la formation à la gestion quotidienne. Basé dans le Gard, je me déplace à Alès pour les étapes clés et reste disponible en permanence pour le suivi.`,
        },
      ],
    };
    return content[city.slug] || [];
  },
  getCityFAQ: (city) => [
    {
      question: `Combien coûte une boutique e-commerce à ${city.name} ?`,
      answer: `Une boutique en ligne professionnelle pour les commerçants de ${city.name} démarre à 1 590€ (pack Standard, jusqu'à 100 produits). Le pack Pro à 2 490€ offre des produits illimités et des fonctionnalités avancées (multi-langue, multi-devises). Les agences du ${city.department} facturent 3 000 à 10 000€ pour des prestations similaires.`,
    },
    {
      question: `En combien de temps ma boutique en ligne sera-t-elle prête à ${city.name} ?`,
      answer: `Comptez 2 à 3 semaines pour le pack Standard et 3 à 4 semaines pour le pack Pro. Ce délai inclut le design, le développement, l'intégration de vos produits et les tests du parcours d'achat. Le premier rendez-vous se fait en personne à ${city.name} (je suis ${city.distance}) ou en visioconférence.`,
    },
  ],
};

// ─── Réseaux Sociaux ────────────────────────────────────────────────────────────

const reseauxConfig: ServiceCityConfig = {
  slug: "reseaux-sociaux",
  name: "Réseaux Sociaux",
  verb: "Gestion de réseaux sociaux",
  price: "199",
  priceLabel: "199€/mois",
  priceNote: "/mois",
  hasProcess: false,
  features: [
    {
      title: "Stratégie de contenu",
      description: "Un calendrier éditorial personnalisé avec des publications adaptées à votre secteur et votre ville.",
      icon: "calendar",
    },
    {
      title: "Création de visuels",
      description: "Des visuels professionnels et attractifs créés par IA et retouchés pour un rendu premium.",
      icon: "camera",
    },
    {
      title: "Community management",
      description: "Gestion des commentaires, messages privés et interactions pour fidéliser votre communauté.",
      icon: "share",
    },
    {
      title: "Publicités ciblées",
      description: "Campagnes Facebook et Instagram ciblées sur votre zone géographique pour un maximum de retour.",
      icon: "target",
    },
    {
      title: "Reporting mensuel",
      description: "Rapport détaillé avec métriques clés : portée, engagement, croissance, clics vers votre site.",
      icon: "chart",
    },
    {
      title: "Veille concurrentielle",
      description: "Surveillance de ce que font vos concurrents locaux pour toujours garder une longueur d'avance.",
      icon: "search",
    },
  ],
  benefits: [
    "Visibilité locale multipliée grâce à une présence régulière et professionnelle",
    "Engagement client renforcé avec du contenu qui parle à votre audience",
    "Génération de trafic vers votre site web et votre point de vente",
  ],
  getCityIntro: (city) => {
    const intros: Record<string, string> = {
      nimes: `Les réseaux sociaux sont devenus incontournables pour les entreprises nîmoises. Avec ${city.population}, Nîmes offre un bassin d'audience considérable sur Facebook, Instagram et Google Business. Mais publier de temps en temps ne suffit plus — il faut une stratégie cohérente, du contenu de qualité et de la régularité. C'est exactement ce que je propose aux professionnels du Gard.`,
      avignon: `À Avignon, les réseaux sociaux sont un levier puissant pour toucher à la fois les ${city.population} locaux et les centaines de milliers de touristes qui affluent chaque année. Du restaurateur intra-muros au vigneron des Côtes du Rhône, une présence professionnelle sur les réseaux transforme la notoriété locale en chiffre d'affaires concret.`,
      montpellier: `Montpellier est l'une des villes les plus connectées de France. Avec ${city.population} actifs sur les réseaux sociaux, la concurrence pour l'attention est intense. Pour sortir du lot, vos publications doivent être professionnelles, régulières et stratégiques. Je gère vos réseaux avec une approche data-driven qui maximise votre retour sur investissement.`,
      orange: `À Orange, les réseaux sociaux sont un formidable outil pour toucher la clientèle locale et les touristes. Beaucoup d'entreprises orangeoises sont peu présentes en ligne — c'est votre chance de prendre de l'avance. Une gestion professionnelle de vos réseaux vous permet de rester visible entre ${city.landmarks[0]} et ${city.landmarks[4]}.`,
      ales: `Les entreprises alésiennes ont tout à gagner sur les réseaux sociaux. Que vous cibliez les habitants du bassin de vie (plus de 100 000 personnes) ou les visiteurs du ${city.landmarks[1]}, une présence régulière et professionnelle sur Facebook et Instagram renforce votre notoriété et génère du trafic vers votre point de vente ou votre site web.`,
    };
    return intros[city.slug] || "";
  },
  getCityContent: (city) => {
    const content: Record<string, CityContentBlock[]> = {
      nimes: [
        {
          heading: "Une stratégie social media ancrée dans le Gard",
          text: `Publier sur les réseaux sociaux quand on est commerçant ou artisan à Nîmes, c'est chronophage. Entre les chantiers, les clients et la gestion quotidienne, difficile de trouver le temps de créer du contenu de qualité. Je prends en charge l'intégralité de votre communication digitale : création de visuels, rédaction de posts, planification et publication. Vous vous concentrez sur votre métier, je m'occupe de votre visibilité en ligne.`,
        },
        {
          heading: "Contenu local qui engage votre communauté nîmoise",
          text: `Les publications qui marchent le mieux sont celles qui parlent aux gens d'ici. Je crée du contenu ancré dans la vie nîmoise : les événements locaux (Féria, marchés), les actualités du ${city.department}, les coulisses de votre activité. Ce contenu authentique génère de l'engagement naturel et renforce votre position de professionnel de référence à Nîmes.`,
        },
      ],
      avignon: [
        {
          heading: "Social media pour les professionnels avignonnais",
          text: `Avignon vit au rythme de ses événements : ${city.landmarks[4]}, marchés de Noël, saison touristique. Votre stratégie social media doit s'adapter à ce calendrier unique. Je crée du contenu qui surfe sur ces temps forts pour maximiser votre visibilité auprès des locaux et des visiteurs. Chaque publication est pensée pour générer de l'engagement et du trafic vers votre activité.`,
        },
        {
          heading: "Toucher locaux et touristes sur les réseaux",
          text: `L'enjeu à Avignon est double : fidéliser les ${city.population} locaux ET capter les touristes. Je déploie une stratégie bilingue quand nécessaire, avec du contenu qui parle aux deux audiences. Les publicités Facebook et Instagram sont géo-ciblées sur le ${city.department} pour un budget optimisé et des résultats mesurables.`,
        },
      ],
      montpellier: [
        {
          heading: "Community management professionnel à Montpellier",
          text: `À Montpellier, les consommateurs sont exigeants et habitués aux marques qui communiquent bien. Votre présence sur les réseaux doit être à la hauteur de cette exigence. Je crée du contenu premium — visuels soignés, textes percutants, stories engageantes — qui positionne votre entreprise comme une référence dans votre secteur. Mes tarifs de freelance sont imbattables face aux agences social media montpelliéraines.`,
        },
        {
          heading: "Publicités ciblées sur l'agglomération montpelliéraine",
          text: `Les campagnes publicitaires Facebook et Instagram sont redoutablement efficaces quand elles sont bien ciblées. Je configure des audiences précises sur Montpellier et son agglomération (${city.population}+), par centres d'intérêt, tranche d'âge et comportement d'achat. Chaque euro investi est optimisé pour générer un maximum de visibilité et de conversions pour votre activité.`,
        },
      ],
      orange: [
        {
          heading: "Réseaux sociaux pour les commerces d'Orange",
          text: `À Orange, beaucoup d'entreprises ont un profil Facebook créé il y a des années mais peu actif. C'est dommage, car les ${city.population} et les touristes cherchent activement des recommandations locales sur les réseaux. Je relance votre présence digitale avec du contenu régulier, des visuels professionnels et une stratégie adaptée au rythme de la vie orangeoise.`,
        },
        {
          heading: "Valorisez votre ancrage local sur les réseaux",
          text: `${city.landmarks[0]}, ${city.landmarks[4]}, les vignobles alentour — Orange a une identité forte. Votre communication sur les réseaux doit refléter cet ancrage local. Je crée du contenu qui met en valeur votre lien avec le territoire, vos produits locaux, votre savoir-faire. C'est ce contenu authentique qui génère le plus d'engagement et de bouche-à-oreille digital.`,
        },
      ],
      ales: [
        {
          heading: "Développez votre visibilité digitale à Alès",
          text: `Le bassin alésien est un marché de proximité où le bouche-à-oreille reste important. Les réseaux sociaux sont le bouche-à-oreille du 21e siècle. Chaque publication, chaque avis partagé, chaque recommandation amplifie votre notoriété auprès des habitants d'Alès et des communes environnantes. Je structure cette présence pour qu'elle génère des résultats concrets et mesurables.`,
        },
        {
          heading: "Contenu adapté au territoire cévenol",
          text: `Les Cévennes, le ${city.landmarks[1]}, ${city.landmarks[2]} — votre territoire a une identité forte qui passionne les gens. J'exploite cette richesse dans votre stratégie de contenu : les saisons, les événements locaux, les paysages cévenols deviennent le fil rouge de votre communication. Ce contenu géo-ancré performe particulièrement bien sur Instagram et Facebook.`,
        },
      ],
    };
    return content[city.slug] || [];
  },
  getCityFAQ: (city) => [
    {
      question: `Combien coûte la gestion des réseaux sociaux à ${city.name} ?`,
      answer: `La gestion professionnelle de vos réseaux sociaux à ${city.name} démarre à 199€/mois (pack Starter : 3 publications/semaine sur 1 réseau). Le pack Growth à 399€/mois inclut 5 publications/semaine sur 3 réseaux avec community management et publicités. Les forfaits sont sans engagement, résiliables à tout moment.`,
    },
    {
      question: `Quels résultats attendre des réseaux sociaux à ${city.name} ?`,
      answer: `Les premiers résultats apparaissent dès le premier mois : augmentation de la portée et de l'engagement. Après 3 mois, vous constatez une hausse significative du trafic vers votre site web et votre point de vente à ${city.name}. Je fournis un rapport mensuel détaillé avec toutes les métriques clés pour suivre la progression.`,
    },
  ],
};

// ─── Export ──────────────────────────────────────────────────────────────────────

export const serviceConfigs: ServiceCityConfig[] = [
  vitrineConfig,
  ecommerceConfig,
  reseauxConfig,
];

export function getServiceBySlug(slug: string): ServiceCityConfig | undefined {
  return serviceConfigs.find((s) => s.slug === slug);
}

export function generateAllServiceCityCombinations() {
  const combos: { service: ServiceCityConfig; city: LocalCity; path: string }[] = [];
  for (const service of serviceConfigs) {
    for (const citySlug of serviceCityTargets) {
      const city = localCities.find((c) => c.slug === citySlug);
      if (city) {
        combos.push({
          service,
          city,
          path: `/${service.slug}/${city.slug}`,
        });
      }
    }
  }
  return combos;
}
