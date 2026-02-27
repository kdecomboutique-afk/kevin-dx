import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import type { ServiceCityConfig } from "@/data/service-city-seo-pages";
import type { LocalCity } from "@/data/local-seo";

interface ServiceCityContentProps {
  service: ServiceCityConfig;
  city: LocalCity;
}

export default function ServiceCityContent({ service, city }: ServiceCityContentProps) {
  const blocks = service.getCityContent(city);
  if (blocks.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl space-y-12">
          {blocks.map((block, index) => (
            <FadeIn key={block.heading} delay={index * 0.15}>
              <article>
                <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {block.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-text-muted">
                  {block.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
