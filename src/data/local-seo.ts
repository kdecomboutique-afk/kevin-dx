export interface LocalCity {
  slug: string;
  name: string;
  department: string;
  region: string;
  population: string;
  distance: string;
  description: string;
  keyIndustries: string[];
  landmarks: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const localCities: LocalCity[] = [
  {
    slug: "nimes",
    name: "Nîmes",
    department: "Gard (30)",
    region: "Occitanie",
    population: "150 000 habitants",
    distance: "à 30 min",
    description:
      "Nîmes est une ville dynamique du Gard qui allie patrimoine antique exceptionnel et tissu économique florissant. Le centre-ville regorge de commerces indépendants, de restaurants et d'artisans qui profitent du flux touristique généré par les Arènes, la Maison Carrée et les Jardins de la Fontaine. Le marché local est en pleine transformation numérique, avec une demande croissante de visibilité en ligne pour les entreprises du bassin nîmois.",
    keyIndustries: [
      "tourisme et patrimoine",
      "restauration et gastronomie",
      "artisanat d'art",
      "commerce de centre-ville",
      "viticulture et œnotourisme",
    ],
    landmarks: [
      "les Arènes de Nîmes",
      "la Maison Carrée",
      "les Jardins de la Fontaine",
      "le Pont du Gard",
      "le quartier de l'Ecusson",
    ],
    faq: [
      {
        question: "Combien coûte la création d'un site web à Nîmes ?",
        answer:
          "Chez Kevin DX, la création d'un site vitrine professionnel pour les entreprises nîmoises démarre à 599 EUR. Ce tarif comprend un design sur mesure, l'optimisation SEO locale pour Nîmes et le Gard, un formulaire de contact et un hébergement offert la première année. Pour un site e-commerce, les tarifs débutent à 1 590 EUR avec boutique complète et paiement sécurisé.",
      },
      {
        question:
          "Pourquoi choisir un développeur web local plutôt qu'une agence parisienne ?",
        answer:
          "En tant que développeur basé à Roquemaure, à seulement 30 minutes de Nîmes, je connais le tissu économique du Gard et les attentes des clients locaux. Vous bénéficiez de rendez-vous en personne, d'une réactivité accrue et de tarifs bien plus compétitifs qu'une agence parisienne, sans intermédiaire. Ma proximité me permet également d'optimiser votre référencement local de manière précise.",
      },
      {
        question:
          "Combien de temps faut-il pour créer un site internet à Nîmes ?",
        answer:
          "Un site vitrine professionnel est livré en 7 jours après validation de la maquette. Pour un site e-commerce, comptez 2 à 3 semaines. C'est 2 à 3 fois plus rapide qu'une agence classique grâce à mes templates sectoriels et mes outils IA. Chaque projet débute par un entretien gratuit, que nous pouvons réaliser dans un café du centre-ville de Nîmes ou en visioconférence.",
      },
      {
        question:
          "Mon site sera-t-il bien référencé sur Google pour les recherches à Nîmes ?",
        answer:
          "Absolument. Chaque site que je crée est optimisé pour le référencement local. Cela inclut l'intégration de mots-clés ciblés comme votre activité associée à Nîmes et au Gard, la configuration de votre fiche Google Business Profile, et une structure technique performante qui plaît aux moteurs de recherche. L'objectif est de vous faire apparaître dans les résultats locaux de Google.",
      },
      {
        question:
          "Proposez-vous un suivi après la mise en ligne du site à Nîmes ?",
        answer:
          "Oui, je propose un accompagnement complet après la livraison. Cela inclut une formation pour gérer votre contenu, une assistance technique réactive pendant les premiers mois, et des options de maintenance mensuelle. Étant à proximité de Nîmes, je reste disponible pour des ajustements en personne si nécessaire.",
      },
    ],
  },
  {
    slug: "avignon",
    name: "Avignon",
    department: "Vaucluse (84)",
    region: "Provence-Alpes-Côte d'Azur",
    population: "92 000 habitants",
    distance: "à 15 min",
    description:
      "Avignon, cité des Papes et capitale culturelle du Vaucluse, accueille chaque été le célèbre Festival d'Avignon qui attire des centaines de milliers de visiteurs. La ville possède un écosystème commercial riche, entre boutiques de la rue de la République, restaurants intra-muros et vignerons des Côtes du Rhône. Les professionnels avignonnais cherchent de plus en plus à développer leur présence numérique pour capter une clientèle touristique internationale et locale.",
    keyIndustries: [
      "tourisme et culture",
      "viticulture et Côtes du Rhône",
      "spectacle vivant et événementiel",
      "commerce intra-muros",
      "hôtellerie et restauration",
    ],
    landmarks: [
      "le Palais des Papes",
      "le Pont d'Avignon",
      "la Place de l'Horloge",
      "les remparts historiques",
      "le Festival d'Avignon",
    ],
    faq: [
      {
        question: "Quel est le prix d'un site internet a Avignon ?",
        answer:
          "Les tarifs pour un site web professionnel à Avignon commencent à 599 EUR pour un site vitrine et 1 590 EUR pour une boutique en ligne. Ces prix incluent le design personnalisé, l'optimisation pour le référencement local dans le Vaucluse, l'hébergement première année et la formation à l'utilisation de votre site. Des formules de gestion de réseaux sociaux sont également disponibles à partir de 199 EUR par mois.",
      },
      {
        question:
          "Pouvez-vous vous déplacer à Avignon pour discuter de mon projet ?",
        answer:
          "Bien sûr ! Basé à Roquemaure, je suis à seulement 15 minutes d'Avignon. Je me déplace régulièrement en centre-ville pour rencontrer mes clients. Nous pouvons organiser un rendez-vous dans vos locaux, dans un café de la Place de l'Horloge ou en visioconférence selon votre convenance. Ce premier entretien est entièrement gratuit.",
      },
      {
        question:
          "Créez-vous des sites pour les viticulteurs et domaines viticoles ?",
        answer:
          "Tout à fait, c'est même l'une de mes spécialités dans la région. Je conçois des sites élégants pour les domaines viticoles des Côtes du Rhône, avec des fonctionnalités adaptées : catalogue de cuvées, réservation de visites, vente en ligne de vin et intégration avec les plateformes œnotouristiques. J'ai une connaissance fine du secteur viticole vauclusien.",
      },
      {
        question:
          "Mon site sera-t-il optimisé pour les recherches touristiques à Avignon ?",
        answer:
          "Oui, le référencement touristique est une priorité pour les professionnels d'Avignon. Votre site sera optimisé pour les recherches en français et en anglais liées au tourisme avignonnais. Je configure également votre fiche Google Business Profile et j'intègre les données structurées qui permettent à votre établissement d'apparaître dans les résultats de recherche locaux et sur Google Maps.",
      },
      {
        question:
          "Quel type de site conseillez-vous pour un commerce intra-muros a Avignon ?",
        answer:
          "Pour un commerce situé dans les remparts d'Avignon, je recommande généralement un site vitrine avec une forte orientation locale : horaires, accès, galerie de produits et avis clients. Si vous souhaitez vendre en ligne, une solution e-commerce permettra d'étendre votre rayonnement au-delà des visiteurs physiques. Dans les deux cas, le site sera optimisé pour le mobile, essentiel pour les touristes qui naviguent depuis leur smartphone.",
      },
    ],
  },
  {
    slug: "montpellier",
    name: "Montpellier",
    department: "Hérault (34)",
    region: "Occitanie",
    population: "300 000 habitants",
    distance: "à 1h",
    description:
      "Montpellier est la métropole la plus dynamique du sud de la France, portée par un écosystème tech en pleine expansion, un pôle universitaire de premier plan et un cadre de vie attractif. La ville attire startups, professions libérales et commerçants innovants. Avec une croissance démographique parmi les plus fortes de France, les opportunités pour les TPE et PME montpelliéraines sont immenses, à condition de disposer d'une présence en ligne performante et professionnelle.",
    keyIndustries: [
      "tech et startups",
      "santé et medtech",
      "tourisme et littoral",
      "commerce et restauration",
      "professions libérales",
    ],
    landmarks: [
      "la Place de la Comédie",
      "l'Ecusson historique",
      "le quartier Antigone",
      "la Promenade du Peyrou",
      "le tramway emblématique",
    ],
    faq: [
      {
        question:
          "Pourquoi faire appel à Kevin DX pour créer un site à Montpellier ?",
        answer:
          "Bien que basé à Roquemaure, à environ une heure de Montpellier, je travaille régulièrement avec des entreprises montpelliéraines. Mes tarifs de freelance sont bien plus accessibles que ceux des agences montpelliéraines, sans compromis sur la qualité. Je me déplace à Montpellier pour les rendez-vous importants et reste joignable en permanence par visio, téléphone et email.",
      },
      {
        question:
          "Combien coûte un site web professionnel à Montpellier ?",
        answer:
          "Un site vitrine professionnel démarre à 599 EUR et un site e-commerce à 1 590 EUR. Comparativement, les agences web montpelliéraines facturent généralement entre 2 000 et 8 000 EUR pour des prestations équivalentes. Mon positionnement de freelance me permet de vous offrir un excellent rapport qualité-prix, avec un suivi personnalisé que les grandes agences peinent à garantir.",
      },
      {
        question:
          "Créez-vous des sites pour les startups et entreprises tech de Montpellier ?",
        answer:
          "Absolument. Je conçois des sites web modernes et performants, parfaitement adaptés à l'écosystème tech montpelliérain. Landing pages de lancement, sites SaaS, portfolios de startups : je maîtrise les standards techniques attendus par ce secteur exigeant. Les technologies que j'utilise (React, Next.js, Tailwind CSS) sont celles adoptées par les meilleures startups.",
      },
      {
        question:
          "Comment se passe la collaboration à distance depuis Montpellier ?",
        answer:
          "La collaboration est fluide et structurée. Après un premier rendez-vous en personne à Montpellier ou en visio, nous échangeons par email et visioconférence à chaque étape clé du projet. Vous recevez des maquettes à valider, un accès au site en développement pour suivre l'avancement, et je reste disponible pour ajuster le moindre détail. La distance n'est jamais un frein à la qualité.",
      },
      {
        question:
          "Mon site montpelliérain sera-t-il adapté aux mobiles ?",
        answer:
          "C'est une priorité absolue. Plus de 65% des recherches à Montpellier se font sur mobile. Chaque site que je crée est pensé d'abord pour les écrans mobiles (approche mobile-first), puis adapté aux tablettes et ordinateurs. Le résultat : un site rapide, lisible et agréable à utiliser sur tous les appareils, ce qui améliore aussi votre référencement Google.",
      },
    ],
  },
  {
    slug: "orange",
    name: "Orange",
    department: "Vaucluse (84)",
    region: "Provence-Alpes-Côte d'Azur",
    population: "30 000 habitants",
    distance: "à 10 min",
    description:
      "Orange est une perle du Vaucluse, reconnue pour son Théâtre Antique classé au patrimoine mondial de l'UNESCO et sa proximité avec les prestigieux vignobles de Châteauneuf-du-Pape. La ville combine un riche patrimoine historique avec une économie de proximité portée par l'artisanat, la viticulture et le tourisme. Les commerçants et artisans orangeois ont tout à gagner à renforcer leur présence sur internet pour se démarquer dans ce bassin de vie attractif.",
    keyIndustries: [
      "viticulture et Châteauneuf-du-Pape",
      "tourisme patrimonial",
      "artisanat et métiers d'art",
      "commerce de proximité",
      "agriculture et marchés provençaux",
    ],
    landmarks: [
      "le Théâtre Antique",
      "l'Arc de Triomphe romain",
      "la Colline Saint-Eutrope",
      "les vignobles de Châteauneuf-du-Pape",
      "le marché provençal",
    ],
    faq: [
      {
        question:
          "Est-ce vraiment utile d'avoir un site web pour un commerce a Orange ?",
        answer:
          "Absolument, et peut-être encore plus dans une ville comme Orange. De nombreux commerces locaux n'ont pas encore de site web, c'est une opportunité de vous démarquer. Les touristes qui visitent le Théâtre Antique ou les vignobles recherchent activement des restaurants, commerces et services sur Google. Un site web bien référencé vous permet de capter cette clientèle de passage en plus de vos clients habituels.",
      },
      {
        question:
          "Quel est l'avantage de travailler avec un développeur basé à 10 minutes d'Orange ?",
        answer:
          "Ma proximité est un avantage considérable. Basé à Roquemaure, à seulement 10 minutes d'Orange, je peux vous rencontrer facilement dans votre commerce ou atelier. Je connais parfaitement le tissu économique local, les habitudes des consommateurs et les spécificités de la vie orangeoise. Cette connaissance du terrain se traduit dans un site web authentique, qui parle à vos clients.",
      },
      {
        question:
          "Combien coûte un site internet pour un artisan à Orange ?",
        answer:
          "Un site vitrine adapté aux artisans et commerçants d'Orange démarre à 599 EUR. Ce tarif comprend un design professionnel, l'optimisation pour les recherches locales, un formulaire de contact et un an d'hébergement. C'est un investissement accessible qui se rentabilise rapidement grâce à la visibilité supplémentaire qu'il génère auprès des habitants et des touristes.",
      },
      {
        question:
          "Pouvez-vous créer un site pour un domaine viticole près d'Orange ?",
        answer:
          "C'est l'une de mes expertises. Les domaines viticoles de Châteauneuf-du-Pape, Gigondas et des environs d'Orange sont au cœur de mon territoire. Je crée des sites qui mettent en valeur le terroir, les cuvées et le savoir-faire viticole, avec des options de vente en ligne et de réservation de visites. Chaque site est conçu pour refléter l'élégance et l'authenticité de votre domaine.",
      },
      {
        question:
          "Le site sera-t-il visible par les touristes qui cherchent des activités à Orange ?",
        answer:
          "Oui, c'est l'un des objectifs principaux. Votre site sera optimisé pour les recherches touristiques liées à Orange et ses environs : restaurants, boutiques, activités, hébergements. L'intégration avec Google Maps et votre fiche Google Business Profile assure une visibilité maximale auprès des visiteurs du Théâtre Antique et des amateurs de vin qui explorent la région.",
      },
    ],
  },
  {
    slug: "ales",
    name: "Alès",
    department: "Gard (30)",
    region: "Occitanie",
    population: "42 000 habitants",
    distance: "à 1h",
    description:
      "Alès, porte d'entrée des Cévennes, est une ville en pleine réinvention. Ancienne cité minière, elle s'est transformée en un pôle économique diversifié où cohabitent industries, commerces et acteurs du tourisme vert. Le bassin alésien compte de nombreux artisans, commerçants et prestataires de services qui desservent les habitants locaux et les visiteurs attirés par les Cévennes, le Parc national et les activités de pleine nature.",
    keyIndustries: [
      "tourisme vert et Cévennes",
      "industrie et reconversion",
      "artisanat et savoir-faire local",
      "commerce de proximite",
      "services aux entreprises",
    ],
    landmarks: [
      "la Mine temoin",
      "le Parc national des Cévennes",
      "la Bambouseraie d'Anduze",
      "le Fort Vauban",
      "le marché couvert",
    ],
    faq: [
      {
        question:
          "Pourquoi un site web est-il important pour une entreprise à Alès ?",
        answer:
          "Alès est au cœur d'un bassin de vie de plus de 100 000 habitants et constitue la porte d'entrée des Cévennes. De nombreuses entreprises locales n'ont pas encore de site web, disposer d'une présence en ligne vous donne un avantage compétitif considérable. Les touristes des Cévennes, les habitants à la recherche de services locaux et les entreprises partenaires vous trouveront plus facilement grâce à un site bien référencé.",
      },
      {
        question:
          "Êtes-vous disponible pour des rendez-vous à Alès ?",
        answer:
          "Oui, je me déplace à Alès pour les rendez-vous importants comme le lancement du projet et la présentation des maquettes. Pour les échanges courants, nous utilisons la visioconférence et l'email, ce qui nous permet d'avancer efficacement. Malgré la distance d'environ une heure depuis Roquemaure, de nombreux clients alésiens me font confiance grâce à ma connaissance du Gard et à la qualité de mon suivi.",
      },
      {
        question:
          "Combien coûte la création d'un site web pour une entreprise alésienne ?",
        answer:
          "Les tarifs démarrent à 599 EUR pour un site vitrine professionnel, incluant design sur mesure, référencement local pour Alès et les Cévennes, formulaire de contact et un an d'hébergement. Pour un site e-commerce complet, comptez à partir de 1 590 EUR. Ces tarifs de freelance sont significativement inférieurs à ceux proposés par les agences, pour une qualité équivalente voire supérieure.",
      },
      {
        question:
          "Pouvez-vous créer un site pour un hébergement touristique dans les Cévennes ?",
        answer:
          "C'est un domaine que je maîtrise parfaitement. Je crée des sites pour les gîtes, chambres d'hôtes et campings de la région alésienne et cévenole. Chaque site intègre un système de réservation, des galeries photos immersives, la présentation des activités alentour et une optimisation poussée pour les recherches touristiques. L'objectif : maximiser vos réservations directes et réduire votre dépendance aux plateformes de réservation.",
      },
      {
        question:
          "Le site sera-t-il adapté pour les recherches liées aux Cévennes ?",
        answer:
          "Bien sûr. Le référencement de votre site prendra en compte les spécificités du territoire cévenol : recherches liées aux Cévennes, au Parc national, aux activités de pleine nature et aux villages de la région. Votre site sera également optimisé pour Google Maps et les recherches mobiles, essentielles pour les touristes en déplacement dans les Cévennes.",
      },
    ],
  },
];

export function getCityBySlug(slug: string): LocalCity | undefined {
  return localCities.find((city) => city.slug === slug);
}
