import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/animations/FadeIn";

const steps = [
  {
    step: 1,
    title: "Vérifier votre éligibilité",
    description:
      "Vous êtes artisan inscrit au RNE et vous payez la Contribution à la Formation Professionnelle (CFP) ? Vous êtes probablement éligible. On vérifie ensemble en 5 minutes.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Faire la demande FAFCEA",
    description:
      "Vous soumettez votre demande de prise en charge directement sur le site du FAFCEA. Je vous guide pas à pas dans le remplissage du dossier.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "On construit votre site",
    description:
      "Pendant la phase de formation (minimum 14h), nous construisons ensemble votre site web. Vous apprenez à le gérer, je m'occupe du développement.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Le FAFCEA vous rembourse",
    description:
      "Une fois la formation terminée, le FAFCEA rembourse la totalité (ou quasi-totalité) des frais. Résultat : votre site professionnel pour 0\u20AC ou presque.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export default function FinancementProcess() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          badge="Comment ça marche"
          title="4 étapes pour un site financé"
          subtitle="Un processus simple et accompagné, de la vérification d'éligibilité au remboursement."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent/20 sm:block lg:left-1/2 lg:-translate-x-0.5" />

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, index) => (
              <FadeIn key={step.step} delay={index * 0.15}>
                <div className="relative flex items-start gap-6">
                  {/* Step number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/20">
                    <span className="font-heading text-lg font-bold">{step.step}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/20">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                        {step.icon}
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
