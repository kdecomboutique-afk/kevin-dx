"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TemplateDemoViewer from "@/components/ui/TemplateDemoViewer";
import FadeIn from "@/components/animations/FadeIn";
import TemplateThumb from "@/components/ui/TemplateThumb";
import LighthouseScore from "@/components/sections/templates/LighthouseScore";
import TemplatePurchaseBar from "@/components/ui/TemplatePurchaseBar";
import type { Template } from "@/types";

/* ================================================================
   DEMO COMPONENTS — Dynamic import for each template
   ================================================================ */
const templateDemos: Record<string, React.ComponentType> = {
  "template-restaurant": dynamic(() => import("@/components/sections/template-demos/SaveurTradition")),
  "template-restaurant-2": dynamic(() => import("@/components/sections/template-demos/GustoItalia")),
  "template-bistrot-gourmand": dynamic(() => import("@/components/sections/template-demos/BistrotGourmand")),
  "template-street-food": dynamic(() => import("@/components/sections/template-demos/StreetFood")),
  "template-petales-fleurs": dynamic(() => import("@/components/sections/template-demos/PetalesFleurs")),
  "template-beaute": dynamic(() => import("@/components/sections/template-demos/EclatBeaute")),
  "template-cabinet-sante": dynamic(() => import("@/components/sections/template-demos/CabinetSante")),
  "template-coach-energie": dynamic(() => import("@/components/sections/template-demos/CoachEnergie")),
  "template-maitre-droit": dynamic(() => import("@/components/sections/template-demos/MaitreDroit")),
  "template-auto-expert": dynamic(() => import("@/components/sections/template-demos/AutoExpert")),
  "template-artisan": dynamic(() => import("@/components/sections/template-demos/MaitreArtisan")),
  "template-artisan-2": dynamic(() => import("@/components/sections/template-demos/LAtelier")),
  "template-atelier-creatif": dynamic(() => import("@/components/sections/template-demos/AtelierCreatif")),
  "template-commerce": dynamic(() => import("@/components/sections/template-demos/MaBoutique")),
  "template-immobilier": dynamic(() => import("@/components/sections/template-demos/HorizonImmo")),
  "template-immo-prestige": dynamic(() => import("@/components/sections/template-demos/ImmoPrestige")),
  "template-btp": dynamic(() => import("@/components/sections/template-demos/BatisseurPro")),
  "template-studio-lumiere": dynamic(() => import("@/components/sections/template-demos/StudioLumiere")),
  "template-boutique-mode": dynamic(() => import("@/components/sections/template-demos/BoutiqueMode")),
  "template-agence-digitale": dynamic(() => import("@/components/sections/template-demos/AgenceDigitale")),
  "template-bien-etre": dynamic(() => import("@/components/sections/template-demos/CentreBienEtre")),
  "template-app-launch": dynamic(() => import("@/components/sections/template-demos/AppLaunch")),
  "template-epicerie-bio": dynamic(() => import("@/components/sections/template-demos/EpicerieBio")),
  "template-studio-motion": dynamic(() => import("@/components/sections/template-demos/StudioMotion")),
  "template-osteo-kine": dynamic(() => import("@/components/sections/template-demos/OsteoKine")),
  "template-crypto-vault": dynamic(() => import("@/components/sections/template-demos/CryptoVault")),
};

/* ================================================================
   SECTION ICONS — SVG icons for template sections
   ================================================================ */
const sectionIcons: Record<string, React.ReactNode> = {
  hero: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  ),
  menu: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <circle cx="4" cy="6" r="1" fill="currentColor" /><circle cx="4" cy="12" r="1" fill="currentColor" /><circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  gallery: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  ),
  contact: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  booking: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  team: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  default: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

function getSectionIcon(sectionName: string): React.ReactNode {
  const lower = sectionName.toLowerCase();
  if (lower.includes("hero") || lower.includes("header")) return sectionIcons.hero;
  if (lower.includes("menu") || lower.includes("catalogue") || lower.includes("service") || lower.includes("prestation") || lower.includes("soin") || lower.includes("programme") || lower.includes("tarif") || lower.includes("produit") || lower.includes("boutique") || lower.includes("pricing") || lower.includes("feature") || lower.includes("bien") || lower.includes("projet") || lower.includes("domaine") || lower.includes("spécialité")) return sectionIcons.menu;
  if (lower.includes("galerie") || lower.includes("portfolio") || lower.includes("réalisation") || lower.includes("showreel") || lower.includes("lookbook") || lower.includes("dashboard") || lower.includes("photo") || lower.includes("transformation") || lower.includes("chantier") || lower.includes("visite")) return sectionIcons.gallery;
  if (lower.includes("contact") || lower.includes("localisation") || lower.includes("accès") || lower.includes("horaire") || lower.includes("zone") || lower.includes("newsletter")) return sectionIcons.contact;
  if (lower.includes("réservation") || lower.includes("rendez-vous") || lower.includes("commande") || lower.includes("devis") || lower.includes("estimation") || lower.includes("séance") || lower.includes("click") || lower.includes("cta") || lower.includes("panier") || lower.includes("carte cadeau") || lower.includes("sur mesure") || lower.includes("fidélité")) return sectionIcons.booking;
  if (lower.includes("équipe") || lower.includes("propos") || lower.includes("histoire") || lower.includes("savoir") || lower.includes("coach") || lower.includes("praticien") || lower.includes("avocat") || lower.includes("atelier") || lower.includes("producteur") || lower.includes("artisan") || lower.includes("photographe") || lower.includes("concept") || lower.includes("processus") || lower.includes("client") || lower.includes("logo") || lower.includes("espace")) return sectionIcons.team;
  if (lower.includes("témoignage") || lower.includes("avis") || lower.includes("faq") || lower.includes("blog") || lower.includes("recette") || lower.includes("conseil") || lower.includes("actualité") || lower.includes("événement") || lower.includes("soirée") || lower.includes("réseaux") || lower.includes("sécurité") || lower.includes("intégration") || lower.includes("certification") || lower.includes("chiffre") || lower.includes("guide") || lower.includes("rayon") || lower.includes("footer")) return sectionIcons.default;
  return sectionIcons.default;
}

/* ================================================================
   FAQ DATA
   ================================================================ */
const templateFAQ = [
  {
    question: "Puis-je personnaliser le template avec mes couleurs et mon logo ?",
    answer: "Absolument. Chaque template est entièrement personnalisable : couleurs, typographies, logo, images, textes. Je m'occupe de tout adapter à votre identité visuelle. Le résultat sera un site unique qui vous ressemble, pas un template générique.",
  },
  {
    question: "Quel est le délai de livraison ?",
    answer: "Un template personnalisé est livré en 1 à 2 semaines. Cela inclut l'adaptation à votre charte graphique, l'intégration de vos contenus (textes, photos) et le déploiement en ligne. Pour un site plus complexe avec des fonctionnalités sur mesure, comptez 2 à 3 semaines.",
  },
  {
    question: "Que comprend le template à 99\u20AC ?",
    answer: "Le template inclut le code source complet (Next.js/React), la documentation technique, 30 jours de support par email et des performances Lighthouse 95+. Vous recevez un site prêt à être personnalisé. Si vous souhaitez que je m'occupe de la personnalisation et du déploiement, optez pour l'offre Site Vitrine à partir de 599\u20AC.",
  },
];

/* ================================================================
   MAIN CLIENT COMPONENT
   ================================================================ */
interface TemplateDetailClientProps {
  template: Template;
  similarTemplates: Template[];
}

export default function TemplateDetailClient({
  template,
  similarTemplates,
}: TemplateDetailClientProps) {
  const [showDemo, setShowDemo] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const DemoComponent = templateDemos[template.id];
  const buyUrl = template.purchaseUrl || `/devis?pack=template-${template.id}`;
  const primaryColor = template.colorScheme?.primary || "#6366F1";
  const accentColor = template.colorScheme?.accent || "#F59E0B";

  return (
    <>
      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Background tint from template colorScheme */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}08 0%, transparent 50%, ${accentColor}05 100%)`,
          }}
        />
        {/* Dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Gradient blob */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-[120px]"
          style={{ backgroundColor: primaryColor }}
        />

        <Container className="relative">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/templates" className="hover:text-primary transition-colors">Templates</Link>
              <span>/</span>
              <span className="text-primary font-medium">{template.title}</span>
            </nav>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left — Text content */}
            <div>
              <FadeIn>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="border border-accent/30 bg-accent/10 text-accent">
                    {template.category}
                  </Badge>
                  {template.lighthouseScore && (
                    <Badge variant="success">
                      Lighthouse {template.lighthouseScore}/100
                    </Badge>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="font-heading text-4xl font-extrabold leading-tight text-primary sm:text-5xl lg:text-6xl">
                  {template.title}
                </h1>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-xl">
                  {template.longDescription || template.description}
                </p>
              </FadeIn>

              {/* Tags */}
              <FadeIn delay={0.2}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs font-medium border border-border bg-white text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>

              {/* Price + CTAs */}
              <FadeIn delay={0.25}>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-extrabold text-primary">
                      {template.price || 99}&euro;
                    </span>
                    <span className="text-sm text-text-muted">TTC</span>
                  </div>
                  <div className="flex gap-3">
                    <Button href={buyUrl} size="lg">
                      Acheter le template
                    </Button>
                    <Button href="/devis" variant="secondary" size="lg">
                      Devis personnalisé
                    </Button>
                  </div>
                </div>
                <p className="mt-3 text-xs text-text-muted">
                  Code source + documentation + support 30 jours inclus
                </p>
              </FadeIn>
            </div>

            {/* Right — Template preview thumb */}
            <FadeIn delay={0.2} direction="left">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/10">
                  <TemplateThumb
                    src={template.image}
                    alt={template.title}
                    category={template.category}
                    lighthouseScore={template.lighthouseScore}
                    colorScheme={template.colorScheme}
                  />
                </div>
                {/* Floating score badge */}
                {template.lighthouseScore && (
                  <div className="absolute -bottom-4 -right-4 rounded-2xl border border-border bg-white p-3 shadow-lg">
                    <LighthouseScore score={template.lighthouseScore} />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* ============================================================
          SECTION 2 — DEMO PREVIEW (fullscreen browser mockup)
          ============================================================ */}
      {DemoComponent && (
        <section className="border-y border-border bg-surface py-12">
          <Container>
            <FadeIn>
              <div className="text-center mb-8">
                <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  Aperçu du template
                </h2>
                <p className="mt-2 text-text-muted">
                  Découvrez le rendu complet du template avec ses sections et interactions
                </p>
                <button
                  onClick={() => setShowDemo(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all hover:shadow-md hover:border-accent/30 hover:-translate-y-0.5"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                  Voir la démo en plein écran
                </button>
              </div>
            </FadeIn>
          </Container>

          <TemplateDemoViewer
            isOpen={showDemo}
            onClose={() => setShowDemo(false)}
            templateTitle={template.title}
          >
            <DemoComponent />
          </TemplateDemoViewer>
        </section>
      )}

      {/* ============================================================
          SECTION 3 — SECTIONS INCLUSES
          ============================================================ */}
      {template.sections && template.sections.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <FadeIn>
              <div className="text-center mb-12">
                <Badge className="mb-4 inline-block">Structure du template</Badge>
                <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  {template.sections.length} sections prêtes à l&apos;emploi
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-text-muted">
                  Chaque section est optimisée pour la conversion et s&apos;adapte parfaitement sur mobile, tablette et desktop.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {template.sections.map((section, i) => (
                <FadeIn key={section} delay={i * 0.05}>
                  <div className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md hover:border-accent/20 hover:-translate-y-0.5">
                    <div
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${primaryColor}10`,
                        color: primaryColor,
                      }}
                    >
                      {getSectionIcon(section)}
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-primary">{section}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="h-1 w-1 rounded-full bg-green-500" />
                        <span className="text-xs text-text-muted">Responsive</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ============================================================
          SECTION 4 — KEY FEATURES (2x2 grid)
          ============================================================ */}
      {template.keyFeatures && template.keyFeatures.length > 0 && (
        <section className="py-16 lg:py-24 bg-surface">
          <Container>
            <FadeIn>
              <div className="text-center mb-12">
                <Badge className="mb-4 inline-block">Fonctionnalités</Badge>
                <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  Ce qui rend ce template unique
                </h2>
              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2">
              {template.keyFeatures.map((feature, i) => (
                <FadeIn key={feature.title} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-lg hover:border-accent/20 hover:-translate-y-1">
                    {/* Colored top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                      style={{
                        background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                      }}
                    />
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-bold text-primary">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-text-muted leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ============================================================
          SECTION 5 — IDEAL FOR (profile badges)
          ============================================================ */}
      {template.idealFor && template.idealFor.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <FadeIn>
                <div>
                  <Badge className="mb-4 inline-block">Pour qui ?</Badge>
                  <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                    Ce template est fait pour vous si...
                  </h2>
                  <p className="mt-4 text-text-muted leading-relaxed">
                    Chaque template est conçu pour un secteur précis. Les fonctionnalités, le design et le wording sont adaptés à votre activité et à vos clients.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1} direction="left">
                <div className="space-y-4">
                  {template.idealFor.map((profile, i) => (
                    <div
                      key={profile}
                      className="flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold text-white text-sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-semibold text-primary">{profile}</span>
                    </div>
                  ))}
                  {/* Extra generic profile */}
                  <div className="flex items-center gap-4 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-muted">
                      Besoin d&apos;un template différent ?{" "}
                      <Link href="/contact" className="text-accent font-semibold hover:underline">
                        Contactez-moi
                      </Link>
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>
      )}

      {/* ============================================================
          SECTION 6 — LIGHTHOUSE PERFORMANCE
          ============================================================ */}
      {template.lighthouseScore && (
        <section className="py-16 lg:py-24 bg-surface">
          <Container>
            <FadeIn>
              <div className="rounded-2xl border border-border bg-white p-8 lg:p-12">
                <div className="grid gap-8 lg:grid-cols-2 items-center">
                  <div>
                    <Badge variant="success" className="mb-4 inline-block">Performance</Badge>
                    <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                      Score Lighthouse {template.lighthouseScore}/100
                    </h2>
                    <p className="mt-4 text-text-muted leading-relaxed">
                      Ce template est optimisé pour la performance, l&apos;accessibilité et le SEO.
                      Un site rapide, c&apos;est un site qui convertit mieux et qui remonte dans Google.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {[
                        { label: "Performance", value: template.lighthouseScore },
                        { label: "Accessibilité", value: Math.min(100, template.lighthouseScore + 1) },
                        { label: "SEO", value: 100 },
                        { label: "Bonnes pratiques", value: Math.min(100, template.lighthouseScore + 2) },
                      ].map((metric) => (
                        <div key={metric.label} className="rounded-lg bg-surface p-3">
                          <div className="text-xs text-text-muted mb-1">{metric.label}</div>
                          <div className="font-heading text-xl font-bold text-green-600">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="flex items-center justify-center">
                        <LighthouseScore score={template.lighthouseScore} />
                      </div>
                      <div className="mt-4 text-center text-sm font-medium text-text-muted">
                        Score Lighthouse
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* ============================================================
          SECTION 7 — WHAT'S INCLUDED
          ============================================================ */}
      <section className="py-16 lg:py-24">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-4 inline-block">Inclus dans le template</Badge>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                Tout ce dont vous avez besoin
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "code", title: "Code source complet", desc: "Next.js 16, React 19, TypeScript. Code propre, documenté et maintenable." },
              { icon: "mobile", title: "100% Responsive", desc: "Adapté mobile, tablette et desktop. Mobile-first pour vos clients en déplacement." },
              { icon: "speed", title: "Ultra-rapide", desc: "Score Lighthouse 95+. Chargement instantané, SEO optimisé, Core Web Vitals au vert." },
              { icon: "support", title: "Support 30 jours", desc: "Questions techniques, aide à la personnalisation, assistance par email." },
              { icon: "seo", title: "SEO optimisé", desc: "Méta-données, sitemap, schema.org, balises OpenGraph et Twitter Cards." },
              { icon: "update", title: "Mises à jour", desc: "Corrections de bugs et mises à jour de sécurité pendant 6 mois." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-white p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {item.icon === "code" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                      </svg>
                    )}
                    {item.icon === "mobile" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                    )}
                    {item.icon === "speed" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    )}
                    {item.icon === "support" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                    {item.icon === "seo" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    )}
                    {item.icon === "update" && (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
                    <p className="mt-1 text-xs text-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ============================================================
          SECTION 8 — FAQ
          ============================================================ */}
      <section className="py-16 lg:py-24 bg-surface">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-4 inline-block">FAQ</Badge>
              <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                Questions fréquentes
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            <div className="divide-y divide-border rounded-2xl border border-border bg-white">
              {templateFAQ.map((item, index) => {
                const isOpen = openFAQ === index;
                return (
                  <div key={index}>
                    <button
                      type="button"
                      onClick={() => setOpenFAQ(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface ${
                        index === 0 ? "rounded-t-2xl" : ""
                      } ${index === templateFAQ.length - 1 && !isOpen ? "rounded-b-2xl" : ""}`}
                    >
                      <span className="font-heading text-base font-semibold text-primary sm:text-lg">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary"
                      >
                        <svg
                          width="16" height="16" viewBox="0 0 16 16" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        >
                          <line x1="8" y1="2" x2="8" y2="14" />
                          <line x1="2" y1="8" x2="14" y2="8" />
                        </svg>
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className={`px-6 pb-5 text-text-muted leading-relaxed ${
                            index === templateFAQ.length - 1 ? "rounded-b-2xl" : ""
                          }`}>
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
          SECTION 9 — FINAL CTA
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary py-16 lg:py-24">
        {/* Blob */}
        <div
          className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-30 blur-[100px]"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-[80px]"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <Container className="relative">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Prêt à lancer votre{" "}
                <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                  site {template.category.toLowerCase()}
                </span>{" "}
                ?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                Achetez le template et personnalisez-le vous-même, ou confiez-moi la création d&apos;un site sur mesure à partir de {template.price || 99}&euro;.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  href={buyUrl}
                  size="lg"
                  className="bg-accent hover:bg-accent-dark shadow-[0_0_30px_rgba(255,107,53,0.3)]"
                >
                  Acheter le template — {template.price || 99}&euro;
                </Button>
                <Button
                  href="/devis"
                  variant="secondary"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-primary"
                >
                  Demander un devis gratuit
                </Button>
              </div>
              <p className="mt-4 text-sm text-white/40">
                Site vitrine complet dès 599&euro; &middot; E-commerce dès 1 590&euro; &middot; Satisfait ou remboursé
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================================
          SECTION 10 — SIMILAR TEMPLATES
          ============================================================ */}
      {similarTemplates.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <FadeIn>
              <div className="text-center mb-12">
                <Badge className="mb-4 inline-block">Vous aimerez aussi</Badge>
                <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  Templates similaires
                </h2>
              </div>
            </FadeIn>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarTemplates.map((t, i) => (
                <FadeIn key={t.id} delay={i * 0.1}>
                  <Link href={`/templates/${t.id}`}>
                    <div className="group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative">
                        <TemplateThumb
                          src={t.image}
                          alt={t.title}
                          category={t.category}
                          lighthouseScore={t.lighthouseScore}
                          colorScheme={t.colorScheme}
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-primary shadow-sm">
                            {t.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-base font-bold text-primary">
                          {t.title}
                        </h3>
                        <p className="mb-3 mt-1.5 text-sm text-text-muted leading-relaxed line-clamp-2">
                          {t.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1.5">
                            {t.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="default">{tag}</Badge>
                            ))}
                          </div>
                          <span className="font-heading text-lg font-bold text-primary">
                            {t.price || 99}&euro;
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-10 text-center">
                <Button href="/templates" variant="secondary">
                  Voir tous les templates
                </Button>
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* Sticky purchase bar */}
      <TemplatePurchaseBar template={template} />
    </>
  );
}
