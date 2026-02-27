import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import ContactMap from "@/components/sections/contact/ContactMap";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contactez Kevin DX - Devis Gratuit sous 24h",
  description:
    "Contactez Kevin DX pour un devis gratuit. Création de sites vitrines, e-commerce et gestion de réseaux sociaux pour TPE, PME et artisans.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                Contact
              </span>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Parlons de votre projet
              </h1>
              <p className="mt-4 text-lg text-text-muted">
                Décrivez-moi votre besoin et recevez un devis personnalisé sous
                24h. Premier échange gratuit et sans engagement.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
            {/* Contact Form */}
            <FadeIn direction="right">
              <div className="rounded-2xl border border-border bg-white p-6 lg:p-8">
                <h2 className="mb-6 font-heading text-2xl font-bold text-primary">
                  Envoyez-moi un message
                </h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Contact Info */}
            <FadeIn direction="left" delay={0.2}>
              <ContactInfo />
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="pb-16 lg:pb-24">
        <Container>
          <FadeIn>
            <ContactMap />
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
