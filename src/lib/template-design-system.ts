/**
 * Template Design System — kevin-dx
 * ===================================
 * Fichier de référence pour TOUS les template demos.
 * Chaque agent builder DOIT importer depuis ce fichier.
 *
 * Inspirations : Rauno Freiberg (Vercel), Paco Coursey (Linear),
 * Emil Kowalski, Matt Perry (Framer Motion), Josh Comeau,
 * Aristide Benoist, Locomotive, GSAP masters
 */

import type { Variants, Transition } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────
//  1. EASING CURVES
//  Standardisées — ne JAMAIS utiliser de magic numbers inline
// ─────────────────────────────────────────────────────────────────────

/** Smooth deceleration — usage principal (entrées, reveals) */
export const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/** Ease out cubic — usage secondaire (hover, subtle transitions) */
export const EASE_OUT = [0.33, 1, 0.68, 1] as const;

/** Ease in-out — usage pour les boucles continues */
export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

/** Ease out expo — pour les entrées dramatiques (hero, modals) */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Ease out back — léger overshoot pour les éléments playful */
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;

// ─────────────────────────────────────────────────────────────────────
//  2. SPRING PRESETS
//  3 niveaux — soft, medium, snappy
// ─────────────────────────────────────────────────────────────────────

/** Soft spring — lent, organique (wellness, beauté, luxe) */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 0.8,
};

/** Medium spring — polyvalent (cards, stagger, grids) */
export const SPRING_MEDIUM: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 22,
  mass: 0.6,
};

/** Snappy spring — réactif, tech (boutons, toggles, tabs) */
export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.5,
};

/** Bounce spring — playful, énergie (food, sport, street) */
export const SPRING_BOUNCE: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
  mass: 0.4,
};

/** Magnetic spring — pour MagneticButton et cursor-follow */
export const SPRING_MAGNETIC: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 15,
};

// ─────────────────────────────────────────────────────────────────────
//  3. DURATION TOKENS
// ─────────────────────────────────────────────────────────────────────

export const DURATION = {
  /** Micro-interactions : hover, toggle, icon (100-200ms) */
  micro: 0.15,
  /** Transitions rapides : tabs, menus (200-300ms) */
  fast: 0.25,
  /** Standard : fade-in, slide (400-600ms) */
  normal: 0.5,
  /** Reveal lent : images, sections (600-800ms) */
  slow: 0.7,
  /** Dramatique : hero, page enter (800-1200ms) */
  dramatic: 1.0,
  /** Counter/number animations */
  counter: 2.0,
} as const;

// ─────────────────────────────────────────────────────────────────────
//  4. ANIMATION VARIANTS — Prêts à l'emploi
//  Importables directement dans les template demos
// ─────────────────────────────────────────────────────────────────────

// --- Fade variants ---

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_SMOOTH },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_SMOOTH },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_SMOOTH },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_SMOOTH },
  },
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE_SMOOTH },
  },
};

// --- Blur fade (premium text reveals) ---

export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

export const blurFadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

// --- Slide variants (pour sidebars, drawers, panels) ---

export const slideInRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE_SMOOTH },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE_SMOOTH },
  },
};

export const slideInUp: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE_OUT_EXPO },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE_SMOOTH },
  },
};

// --- Scale variants ---

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_MEDIUM,
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_BOUNCE,
  },
};

// --- Clip-path reveals ---

export const clipRevealLeft: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

export const clipRevealRight: Variants = {
  hidden: { clipPath: "inset(0 0 0 100%)" },
  visible: {
    clipPath: "inset(0 0 0 0%)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

export const clipRevealDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

// --- Line/separator reveals ---

export const lineRevealX: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

export const lineRevealY: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_SMOOTH },
  },
};

// ─────────────────────────────────────────────────────────────────────
//  5. STAGGER CONTAINERS — Orchestrateurs parent/enfant
// ─────────────────────────────────────────────────────────────────────

/** Stagger container factory — crée un orchestrateur avec délai configurable */
export function staggerContainer(
  staggerDelay = 0.08,
  delayChildren = 0.1
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };
}

/** Stagger item — enfant standard (fade + slide up + subtle scale) */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_MEDIUM,
  },
};

/** Stagger item soft — pour les contextes doux (santé, bien-être) */
export const staggerItemSoft: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING_SOFT,
  },
};

/** Stagger item snappy — pour les contextes tech/agence */
export const staggerItemSnappy: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_SNAPPY,
  },
};

/** Stagger item bounce — pour les contextes food/street/pop */
export const staggerItemBounce: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: SPRING_BOUNCE,
  },
};

// ─────────────────────────────────────────────────────────────────────
//  6. HERO SEQUENCE — Timing orchestré pour les sections hero
// ─────────────────────────────────────────────────────────────────────

/** Séquence hero standard — délais échelonnés pour un reveal cinématique */
export const HERO_SEQUENCE = {
  /** Badge/subtitle apparaît en premier */
  badge: 0.1,
  /** Titre principal */
  title: 0.3,
  /** Sous-titre/description */
  subtitle: 0.5,
  /** Ligne décorative ou séparateur */
  decoration: 0.7,
  /** Boutons CTA */
  cta: 0.9,
  /** Élément visuel (image, card, device) */
  visual: 1.1,
  /** Stats ou éléments flottants */
  stats: 1.3,
} as const;

// ─────────────────────────────────────────────────────────────────────
//  7. HOVER EFFECTS — Presets pour les interactions
// ─────────────────────────────────────────────────────────────────────

/** Hover lift — carte standard */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: DURATION.micro } },
};

/** Hover scale — bouton/card subtil */
export const hoverScale = {
  whileHover: { scale: 1.03, transition: { duration: DURATION.micro } },
};

/** Hover scale + glow — CTA principal */
export const hoverScaleGlow = (color: string) => ({
  whileHover: {
    scale: 1.04,
    boxShadow: `0 8px 30px ${color}40`,
    transition: { duration: DURATION.fast },
  },
});

/** Hover tilt 3D — cartes produit, portfolio */
export const hoverTilt = {
  whileHover: {
    rotateY: 3,
    rotateX: -2,
    scale: 1.02,
    transition: { duration: DURATION.fast },
  },
};

/** Hover reveal overlay — images gallery */
export const hoverRevealOverlay = {
  whileHover: {
    scale: 1.03,
    transition: { duration: DURATION.fast, ease: EASE_OUT },
  },
};

// ─────────────────────────────────────────────────────────────────────
//  8. CONTINUOUS ANIMATIONS — Boucles infinies
//  Usage modéré : max 2-3 par template
// ─────────────────────────────────────────────────────────────────────

/** Float doux — badges flottants, éléments décoratifs */
export const floatAnimation = (
  amplitude = 8,
  duration = 4
): { animate: object; transition: object } => ({
  animate: { y: [0, -amplitude, 0] },
  transition: {
    duration,
    repeat: Infinity,
    ease: EASE_IN_OUT,
  },
});

/** Pulse subtil — badges attention, indicateurs */
export const pulseAnimation = (
  scale = 1.05,
  duration = 3
): { animate: object; transition: object } => ({
  animate: { scale: [1, scale, 1] },
  transition: {
    duration,
    repeat: Infinity,
    ease: EASE_IN_OUT,
  },
});

/** Rotate lent — éléments décoratifs, loading */
export const rotateAnimation = (
  duration = 20
): { animate: object; transition: object } => ({
  animate: { rotate: 360 },
  transition: {
    duration,
    repeat: Infinity,
    ease: "linear",
  },
});

/** Gradient shift — backgrounds animés */
export const gradientShift = (
  duration = 8
): { animate: object; transition: object } => ({
  animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
  transition: {
    duration,
    repeat: Infinity,
    ease: EASE_IN_OUT,
  },
});

// ─────────────────────────────────────────────────────────────────────
//  9. TEMPLATE AMBIANCES
//  Chaque catégorie a une ambiance qui dicte le choix des animations
// ─────────────────────────────────────────────────────────────────────

export type TemplateAmbiance =
  | "luxury"      // Immobilier prestige, juridique, photographe
  | "warm"        // Restaurant, artisan, fleuriste, commerce
  | "zen"         // Beauté, bien-être, santé
  | "energy"      // BTP, coach, street food, garage
  | "tech"        // SaaS, agence, e-commerce
  | "pop";        // Street food, commerce fun

export interface AmbianceConfig {
  /** Spring preset principal */
  spring: Transition;
  /** Stagger item variant */
  staggerItem: Variants;
  /** Stagger delay entre enfants */
  staggerDelay: number;
  /** Durée des transitions principales */
  duration: number;
  /** Easing principal */
  ease: readonly number[];
  /** Intensité hover (scale factor) */
  hoverIntensity: number;
  /** Border-radius des cards (Tailwind class) */
  cardRadius: string;
  /** Shadow des cards (Tailwind class) */
  cardShadow: string;
  /** Permet les particules flottantes ? */
  allowParticles: boolean;
  /** Permet les effets glassmorphism ? */
  allowGlass: boolean;
}

export const AMBIANCE: Record<TemplateAmbiance, AmbianceConfig> = {
  luxury: {
    spring: SPRING_SOFT,
    staggerItem: staggerItemSoft,
    staggerDelay: 0.12,
    duration: DURATION.slow,
    ease: EASE_OUT_EXPO,
    hoverIntensity: 1.02,
    cardRadius: "rounded-none sm:rounded-sm",
    cardShadow: "shadow-lg",
    allowParticles: false,
    allowGlass: true,
  },
  warm: {
    spring: SPRING_MEDIUM,
    staggerItem: staggerItem,
    staggerDelay: 0.08,
    duration: DURATION.normal,
    ease: EASE_SMOOTH,
    hoverIntensity: 1.03,
    cardRadius: "rounded-xl",
    cardShadow: "shadow-md",
    allowParticles: true,
    allowGlass: false,
  },
  zen: {
    spring: SPRING_SOFT,
    staggerItem: staggerItemSoft,
    staggerDelay: 0.1,
    duration: DURATION.slow,
    ease: EASE_SMOOTH,
    hoverIntensity: 1.02,
    cardRadius: "rounded-2xl",
    cardShadow: "shadow-sm",
    allowParticles: false,
    allowGlass: true,
  },
  energy: {
    spring: SPRING_BOUNCE,
    staggerItem: staggerItemBounce,
    staggerDelay: 0.06,
    duration: DURATION.fast,
    ease: EASE_OUT_BACK,
    hoverIntensity: 1.05,
    cardRadius: "rounded-lg",
    cardShadow: "shadow-xl",
    allowParticles: true,
    allowGlass: false,
  },
  tech: {
    spring: SPRING_SNAPPY,
    staggerItem: staggerItemSnappy,
    staggerDelay: 0.06,
    duration: DURATION.fast,
    ease: EASE_OUT_EXPO,
    hoverIntensity: 1.04,
    cardRadius: "rounded-xl",
    cardShadow: "shadow-lg shadow-black/10",
    allowParticles: true,
    allowGlass: true,
  },
  pop: {
    spring: SPRING_BOUNCE,
    staggerItem: staggerItemBounce,
    staggerDelay: 0.05,
    duration: DURATION.fast,
    ease: EASE_OUT_BACK,
    hoverIntensity: 1.06,
    cardRadius: "rounded-2xl",
    cardShadow: "shadow-lg",
    allowParticles: true,
    allowGlass: false,
  },
};

// ─────────────────────────────────────────────────────────────────────
//  10. TEMPLATE → AMBIANCE MAPPING
//  Chaque template est rattaché à une ambiance
// ─────────────────────────────────────────────────────────────────────

export const TEMPLATE_AMBIANCE: Record<string, TemplateAmbiance> = {
  // Restaurant
  "template-restaurant": "warm",            // Saveur & Tradition — fine dining chaleureux
  "template-restaurant-2": "warm",           // Gusto Italia — trattoria chaleureuse
  "template-bistrot-gourmand": "warm",       // Le Bistrot — authentique
  "template-street-food": "pop",             // Street Food — urbain, pop
  // Artisan
  "template-artisan": "warm",               // Maître Artisan — terroir
  "template-artisan-2": "warm",              // L'Atelier — épuré artisanal
  "template-atelier-creatif": "warm",        // Atelier Créatif — craft
  // Immobilier
  "template-immobilier": "luxury",           // Horizon Immo — institutionnel
  "template-immo-prestige": "luxury",        // Immo Prestige — ultra-luxe
  // Santé
  "template-cabinet-sante": "zen",           // Cabinet Santé+ — médical rassurant
  "template-osteo-kine": "zen",              // Cabinet Équilibre — thérapeutique
  // E-commerce
  "template-boutique-mode": "luxury",        // Maison Élégance — haute couture
  "template-epicerie-bio": "warm",           // Le Panier Vert — bio, nature
  // Agence
  "template-agence-digitale": "tech",        // Nexus Studio — Awwwards dark
  "template-studio-motion": "tech",          // Kinetic Studio — cinéma, motion
  // Tech / SaaS
  "template-app-launch": "tech",             // FlowDesk — Linear/Vercel style
  "template-crypto-vault": "tech",           // CryptoVault — cyberpunk
  // Autres
  "template-beaute": "zen",                  // Éclat Beauté — doux, glamour
  "template-btp": "energy",                  // Bâtisseur Pro — solide, technique
  "template-commerce": "warm",               // Ma Boutique — local chaleureux
  "template-auto-expert": "energy",          // Auto Expert — technique, précis
  "template-petales-fleurs": "warm",         // Pétales & Fleurs — romantique
  "template-coach-energie": "energy",        // Coach Énergie — dynamique
  "template-studio-lumiere": "luxury",       // Studio Lumière — minimaliste
  "template-maitre-droit": "luxury",         // Maître Droit — solennel
  "template-bien-etre": "zen",              // Sérénité Spa — zen
};

// ─────────────────────────────────────────────────────────────────────
//  11. SIGNATURE ANIMATIONS — Unique par template
//  Chaque template DOIT utiliser sa signature + 2 animations du système
// ─────────────────────────────────────────────────────────────────────

export interface TemplateSignature {
  /** Nom de l'animation signature */
  name: string;
  /** Description courte */
  description: string;
  /** Type d'animation */
  type: "scroll" | "hover" | "continuous" | "interaction" | "reveal";
}

export const TEMPLATE_SIGNATURES: Record<string, TemplateSignature> = {
  // Restaurant
  "template-restaurant": {
    name: "menu-flip-reveal",
    description: "Cards menu qui se retournent en cascade avec reflet doré",
    type: "scroll",
  },
  "template-restaurant-2": {
    name: "warm-gradient-morph",
    description: "Backgrounds qui morphent entre teintes chaudes italiennes",
    type: "continuous",
  },
  "template-bistrot-gourmand": {
    name: "chalkboard-write",
    description: "Texte qui s'écrit comme à la craie sur tableau noir",
    type: "reveal",
  },
  "template-street-food": {
    name: "neon-pulse-bounce",
    description: "Éléments qui rebondissent avec glow néon pulsant",
    type: "continuous",
  },
  // Artisan
  "template-artisan": {
    name: "before-after-drag",
    description: "Slider avant/après draggable avec haptic feedback visuel",
    type: "interaction",
  },
  "template-artisan-2": {
    name: "masonry-cascade",
    description: "Galerie masonry qui cascade de gauche à droite en vagues",
    type: "scroll",
  },
  "template-atelier-creatif": {
    name: "material-texture-peel",
    description: "Éléments qui se révèlent comme des couches de matériaux pelées",
    type: "reveal",
  },
  // Immobilier
  "template-immobilier": {
    name: "property-carousel-smooth",
    description: "Carousel de biens avec transitions fluides et cartes qui glissent",
    type: "interaction",
  },
  "template-immo-prestige": {
    name: "cinematic-pan-blur",
    description: "Hero avec pan cinématique lent et profondeur de champ simulée",
    type: "continuous",
  },
  // Santé
  "template-cabinet-sante": {
    name: "vitals-pulse-line",
    description: "Ligne de vie pulsante qui connecte les sections comme un ECG",
    type: "continuous",
  },
  "template-osteo-kine": {
    name: "body-zone-highlight",
    description: "Silhouette interactive avec zones qui s'illuminent au hover",
    type: "interaction",
  },
  // E-commerce
  "template-boutique-mode": {
    name: "lookbook-parallax-stack",
    description: "Photos éditorial qui se stackent en parallax au scroll",
    type: "scroll",
  },
  "template-epicerie-bio": {
    name: "leaf-particle-float",
    description: "Feuilles organiques qui flottent doucement en arrière-plan",
    type: "continuous",
  },
  // Agence
  "template-agence-digitale": {
    name: "magnetic-cursor-reveal",
    description: "Projets révélés par un curseur magnétique avec mask circular",
    type: "interaction",
  },
  "template-studio-motion": {
    name: "showreel-split-text",
    description: "Texte qui se split et recompose au scroll avec effet cinéma",
    type: "scroll",
  },
  // Tech / SaaS
  "template-app-launch": {
    name: "bento-grid-morph",
    description: "Grille bento qui se réarrange avec layout animations fluides",
    type: "scroll",
  },
  "template-crypto-vault": {
    name: "matrix-data-stream",
    description: "Flux de données type matrix en arrière-plan avec counters live",
    type: "continuous",
  },
  // Autres
  "template-beaute": {
    name: "shimmer-gradient-sweep",
    description: "Gradient shimmer qui balaie les cartes comme un reflet lumineux",
    type: "hover",
  },
  "template-btp": {
    name: "blueprint-grid-draw",
    description: "Lignes de blueprint qui se dessinent pour former la grille",
    type: "reveal",
  },
  "template-commerce": {
    name: "product-tilt-3d",
    description: "Cartes produit avec tilt 3D au mouvement de souris",
    type: "hover",
  },
  "template-auto-expert": {
    name: "gauge-fill-animate",
    description: "Jauges de dashboard qui se remplissent au scroll",
    type: "scroll",
  },
  "template-petales-fleurs": {
    name: "petal-scatter-bloom",
    description: "Pétales qui s'éparpillent et fleurissent au scroll",
    type: "scroll",
  },
  "template-coach-energie": {
    name: "progress-ring-burst",
    description: "Anneaux de progression qui éclatent et se remplissent",
    type: "scroll",
  },
  "template-studio-lumiere": {
    name: "ken-burns-gallery",
    description: "Photos en plein écran avec zoom lent Ken Burns et fondu",
    type: "continuous",
  },
  "template-maitre-droit": {
    name: "scroll-timeline-reveal",
    description: "Timeline juridique qui se déroule majestueusement au scroll",
    type: "scroll",
  },
  "template-bien-etre": {
    name: "breathing-rhythm",
    description: "Éléments qui pulsent au rythme d'une respiration lente (4-7-8)",
    type: "continuous",
  },
};

// ─────────────────────────────────────────────────────────────────────
//  12. TYPOGRAPHY SCALES PAR AMBIANCE
//  Classes Tailwind recommandées par contexte
// ─────────────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  luxury: {
    heroTitle: "text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight",
    sectionTitle: "text-3xl sm:text-4xl font-light tracking-tight",
    subtitle: "text-lg sm:text-xl font-light text-opacity-80",
    body: "text-base leading-relaxed",
    caption: "text-sm tracking-wide uppercase",
  },
  warm: {
    heroTitle: "text-4xl sm:text-5xl lg:text-6xl font-bold",
    sectionTitle: "text-3xl sm:text-4xl font-bold",
    subtitle: "text-lg sm:text-xl",
    body: "text-base leading-relaxed",
    caption: "text-sm font-medium",
  },
  zen: {
    heroTitle: "text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight",
    sectionTitle: "text-2xl sm:text-3xl lg:text-4xl font-light",
    subtitle: "text-lg font-light leading-relaxed",
    body: "text-base leading-loose",
    caption: "text-xs tracking-widest uppercase",
  },
  energy: {
    heroTitle: "text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tighter",
    sectionTitle: "text-3xl sm:text-4xl font-extrabold",
    subtitle: "text-lg sm:text-xl font-medium",
    body: "text-base leading-relaxed",
    caption: "text-sm font-bold uppercase tracking-wide",
  },
  tech: {
    heroTitle: "text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight",
    sectionTitle: "text-2xl sm:text-3xl lg:text-4xl font-semibold",
    subtitle: "text-lg text-opacity-70",
    body: "text-base leading-relaxed",
    caption: "text-xs font-mono tracking-wide uppercase",
  },
  pop: {
    heroTitle: "text-5xl sm:text-6xl lg:text-7xl font-black",
    sectionTitle: "text-3xl sm:text-4xl font-extrabold",
    subtitle: "text-xl font-medium",
    body: "text-base leading-relaxed",
    caption: "text-sm font-bold tracking-wide",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────
//  13. SECTION SPACING TOKENS
//  Espacement vertical standardisé entre sections
// ─────────────────────────────────────────────────────────────────────

export const SECTION = {
  /** Padding vertical standard des sections */
  padding: "py-20 sm:py-24 lg:py-32",
  /** Padding réduit (entre sous-sections) */
  paddingCompact: "py-12 sm:py-16 lg:py-20",
  /** Padding hero (plus grand) */
  paddingHero: "pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28",
  /** Gap entre le titre de section et le contenu */
  titleGap: "mb-12 sm:mb-16",
  /** Gap compact */
  titleGapCompact: "mb-8 sm:mb-12",
  /** Container max-width */
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  /** Container étroit (texte, formulaires) */
  containerNarrow: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
  /** Container large (galeries, grilles) */
  containerWide: "max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8",
} as const;

// ─────────────────────────────────────────────────────────────────────
//  14. UTILS — Helpers pour les template demos
// ─────────────────────────────────────────────────────────────────────

/**
 * Crée un variant fadeUp avec delay personnalisé
 * Usage: <motion.div variants={delayedFadeUp(0.3)} />
 */
export function delayedFadeUp(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.normal, delay, ease: EASE_SMOOTH },
    },
  };
}

/**
 * Crée un variant blurFade avec delay personnalisé
 * Usage: <motion.div variants={delayedBlurFade(0.5)} />
 */
export function delayedBlurFade(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: DURATION.slow, delay, ease: EASE_SMOOTH },
    },
  };
}

/**
 * Retourne l'ambiance config pour un template donné
 * Usage: const config = getAmbianceConfig("template-restaurant");
 */
export function getAmbianceConfig(templateId: string): AmbianceConfig {
  const ambiance = TEMPLATE_AMBIANCE[templateId] ?? "warm";
  return AMBIANCE[ambiance];
}

/**
 * Retourne la signature animation pour un template donné
 * Usage: const sig = getSignature("template-restaurant");
 */
export function getSignature(templateId: string): TemplateSignature | null {
  return TEMPLATE_SIGNATURES[templateId] ?? null;
}

/**
 * Retourne la typographie pour une ambiance donnée
 * Usage: const typo = getTypography("luxury");
 */
export function getTypography(ambiance: TemplateAmbiance) {
  return TYPOGRAPHY[ambiance];
}
