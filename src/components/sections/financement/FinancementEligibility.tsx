import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";

const eligible = [
  "Artisan inscrit au Répertoire National des Entreprises (RNE)",
  "Chef d'entreprise artisanale (dirigeant, pas salarié)",
  "À jour de la Contribution à la Formation Professionnelle (CFP)",
  "Budget FAFCEA disponible pour l'année en cours",
];

const notEligible = [
  "Salarié d'une entreprise artisanale",
  "Auto-entrepreneur créé il y a moins d'un an (CFP non encore versée)",
];

export default function FinancementEligibility() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Éligibilité"
          title="Êtes-vous éligible ?"
          subtitle="Vérifiez en 30 secondes si vous pouvez bénéficier du financement FAFCEA."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Checklist */}
          <div className="lg:col-span-3">
            <FadeIn>
              <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                <h3 className="mb-6 font-heading text-xl font-bold text-primary">
                  Vous êtes éligible si :
                </h3>
                <ul className="space-y-4">
                  {eligible.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-text">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="mb-4 font-heading text-lg font-bold text-primary">
                    Vous n&apos;êtes probablement pas éligible si :
                  </h3>
                  <ul className="space-y-3">
                    {notEligible.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                          <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* CTA Card */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.2}>
              <div className="sticky top-28 rounded-2xl border-2 border-accent bg-gradient-to-br from-accent/5 to-accent/10 p-6 lg:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary">
                  Pas sûr de votre éligibilité ?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  Contactez-moi et je vérifie avec vous gratuitement. En
                  5 minutes, on sait si le financement est possible pour votre
                  situation.
                </p>
                <Button href="/contact" size="lg" className="mt-6 w-full">
                  Vérifier mon éligibilité
                </Button>
                <p className="mt-3 text-center text-xs text-text-muted">
                  Gratuit, sans engagement
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
