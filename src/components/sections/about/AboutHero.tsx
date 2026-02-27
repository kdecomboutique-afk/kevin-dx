import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutHero() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <FadeIn direction="right">
            <div>
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                Mon parcours
              </span>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Du terrain{" "}
                <span className="text-accent">au digital</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-text-muted">
                Pompier volontaire, policier aux quartiers Nord de Marseille,
                couvreur-zingueur sur les toits du sud de la France — mon parcours
                ne suit pas une ligne droite.{" "}
                <strong className="text-primary">
                  Il suit une logique de terrain.
                </strong>
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                Quand un plombier me parle de ses devis qu&apos;il fait entre
                deux chantiers sur son téléphone, <strong className="text-primary">je comprends</strong>.
                Quand un restaurateur me dit qu&apos;il n&apos;a pas le temps de
                s&apos;occuper d&apos;un site, je comprends aussi.
                J&apos;ai vécu ces contraintes. J&apos;ai vu combien
                d&apos;artisans excellents restaient{" "}
                <strong className="text-primary">invisibles en ligne</strong>.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-muted">
                Aujourd&apos;hui, je mets la même exigence que sur un chantier
                ou une intervention :{" "}
                <strong className="text-primary">
                  travail propre, dans les délais, sans surprise.
                </strong>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/contact" size="lg">
                  Discutons de votre projet
                </Button>
                <Button href="/templates" variant="secondary" size="lg">
                  Voir mes templates
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Photo */}
          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="/images/moi-perso.webp"
                  alt="Kevin DX, développeur web freelance"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-accent/20" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
