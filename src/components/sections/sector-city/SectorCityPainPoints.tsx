import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";
import type { Sector } from "@/data/sector-city-seo";
import type { LocalCity } from "@/data/local-seo";

interface SectorCityPainPointsProps {
  sector: Sector;
  city: LocalCity;
}

export default function SectorCityPainPoints({ sector, city }: SectorCityPainPointsProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Le problème"
          title={`Les défis des ${sector.pluralName} à ${city.name}`}
          subtitle={`Vous êtes ${sector.name.toLowerCase()} à ${city.name} et vous reconnaissez ces situations ?`}
        />

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {sector.painPoints.map((pain, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="relative rounded-2xl border border-red-100 bg-red-50/50 p-6 transition-all duration-300 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <p className="text-sm leading-relaxed text-text">
                  {pain}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
