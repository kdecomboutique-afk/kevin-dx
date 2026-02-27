import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ParrainageHero from "@/components/sections/parrainage/ParrainageHero";
import ParrainageSteps from "@/components/sections/parrainage/ParrainageSteps";
import ParrainageCommissions from "@/components/sections/parrainage/ParrainageCommissions";
import ParrainageTools from "@/components/sections/parrainage/ParrainageTools";
import ParrainageFAQ from "@/components/sections/parrainage/ParrainageFAQ";
import ParrainageCGP from "@/components/sections/parrainage/ParrainageCGP";
import FinalCTA from "@/components/sections/home/FinalCTA";

export const metadata: Metadata = createMetadata({
  title: "Programme de parrainage - Gagnez jusqu'à 200€ par recommandation",
  description:
    "Recommandez Kevin DX à un pro qui a besoin d'un site web et touchez jusqu'à 10% de commission sur chaque vente. Programme ouvert à tous, sans limite.",
  path: "/parrainage",
});

export default function ParrainagePage() {
  return (
    <>
      <ParrainageHero />
      <ParrainageSteps />
      <ParrainageCommissions />
      <ParrainageTools />
      <ParrainageFAQ />
      <ParrainageCGP />
      <FinalCTA />
    </>
  );
}
