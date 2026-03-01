import type { ProcessStep } from "@/types";

export const vitrineProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Découverte",
    description:
      "Brief téléphonique ou en visio pour analyser vos besoins, comprendre votre activité et définir les objectifs de votre site vitrine.",
    duration: "1 jour",
    icon: "chat",
  },
  {
    step: 2,
    title: "Maquette",
    description:
      "Création du design sur mesure adapté à votre identité visuelle. Vous validez les maquettes avant le passage au développement.",
    duration: "2-3 jours",
    icon: "palette",
  },
  {
    step: 3,
    title: "Développement",
    description:
      "Intégration et développement de votre site avec les technologies les plus performantes. Code propre, rapide et optimisé.",
    duration: "5-7 jours",
    icon: "code",
  },
  {
    step: 4,
    title: "Tests & Optimisation",
    description:
      "Tests approfondis sur tous les appareils, optimisation des performances, du SEO et de l'accessibilité.",
    duration: "1-2 jours",
    icon: "check",
  },
  {
    step: 5,
    title: "Livraison",
    description:
      "Mise en ligne de votre site, configuration du nom de domaine et formation a l'utilisation de votre panneau d'administration.",
    duration: "1 jour",
    icon: "rocket",
  },
];

export const ecommerceProcess: ProcessStep[] = [
  {
    step: 1,
    title: "Analyse",
    description:
      "Étude approfondie de votre marché, de votre catalogue produits et de vos concurrents pour définir la meilleure stratégie e-commerce.",
    duration: "2-3 jours",
    icon: "search",
  },
  {
    step: 2,
    title: "Design",
    description:
      "Création de l'interface de votre boutique en ligne, optimisée pour la conversion : parcours d'achat fluide, fiches produits attractives.",
    duration: "5-7 jours",
    icon: "palette",
  },
  {
    step: 3,
    title: "Développement",
    description:
      "Intégration de vos produits, configuration du système de paiement sécurisé, gestion des stocks et des livraisons.",
    duration: "10-14 jours",
    icon: "code",
  },
  {
    step: 4,
    title: "Tests",
    description:
      "Tests complets du parcours d'achat, du paiement, de la version mobile et des performances pour garantir une expérience sans faille.",
    duration: "3-5 jours",
    icon: "check",
  },
  {
    step: 5,
    title: "Lancement",
    description:
      "Mise en ligne de votre boutique, formation complète à la gestion des commandes et des produits, et accompagnement post-lancement.",
    duration: "2 jours",
    icon: "rocket",
  },
];
