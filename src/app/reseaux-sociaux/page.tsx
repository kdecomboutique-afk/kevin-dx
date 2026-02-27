import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ReseauxHero from "@/components/sections/reseaux/ReseauxHero";
import ReseauxPricing from "@/components/sections/reseaux/ReseauxPricing";
import ReseauxPortfolio from "@/components/sections/reseaux/ReseauxPortfolio";
import ReseauxFAQ from "@/components/sections/reseaux/ReseauxFAQ";
import ReseauxEngagements from "@/components/sections/reseaux/ReseauxEngagements";
import ComboOffer from "@/components/ui/ComboOffer";

export const metadata: Metadata = createMetadata({
  title: "Réseaux Sociaux - Gestion et stratégie",
  description:
    "Gestion professionnelle de vos réseaux sociaux : création de contenu, community management, publicités. Forfaits à partir de 199 EUR/mois.",
  path: "/reseaux-sociaux",
});

export default function ReseauxSociauxPage() {
  return (
    <>
      <ReseauxHero />
      <ReseauxEngagements />
      <ReseauxPricing />
      <ReseauxPortfolio />
      <ComboOffer
        title="Combo Réseaux Sociaux + Site Web"
        description="Combinez la puissance des réseaux sociaux avec un site vitrine ou e-commerce professionnel. Redirigez votre audience vers un site qui convertit et développez votre activité en ligne."
        discount="-15%"
        ctaText="Demander ce pack"
        ctaHref="/devis?pack=combo-reseaux-site"
      />
      <ReseauxFAQ />
    </>
  );
}
