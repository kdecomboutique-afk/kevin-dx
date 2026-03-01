import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Mentions Légales - Kevin DX Développeur Web",
  description:
    "Mentions légales du site kevin-dx.fr - Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Mentions Légales
              </h1>
              <p className="mt-4 text-lg text-text-muted">
                Informations légales conformément à la loi n°2004-575 du 21 juin
                2004 pour la confiance dans l&apos;économie numérique.
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <Container>
          <FadeIn amount={0.05}>
            <div className="mx-auto max-w-3xl space-y-10">
              {/* Éditeur */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  1. Éditeur du site
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-2 text-text">
                  <p>
                    <strong>Nom :</strong> Kevin DX (micro-entrepreneur)
                  </p>
                  <p>
                    <strong>Activité :</strong> Création de sites web et gestion
                    de réseaux sociaux
                  </p>
                  <p>
                    <strong>SIRET :</strong> En cours d&apos;immatriculation — Réf. J00220670293
                  </p>
                  <p>
                    <strong>Adresse :</strong> {CONTACT.location}
                  </p>
                  <p>
                    <strong>Email :</strong>{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-accent hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                  </p>
                  <p>
                    <strong>Téléphone :</strong>{" "}
                    <a
                      href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                      className="text-accent hover:underline"
                    >
                      {CONTACT.phone}
                    </a>
                  </p>
                  <p>
                    <strong>Directeur de la publication :</strong> Kevin DX
                  </p>
                </div>
              </div>

              {/* Hébergeur */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  2. Hébergeur
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-2 text-text">
                  <p>
                    <strong>Raison sociale :</strong> Hostinger International
                    Ltd.
                  </p>
                  <p>
                    <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023
                    Larnaca, Chypre
                  </p>
                  <p>
                    <strong>Site web :</strong>{" "}
                    <a
                      href="https://www.hostinger.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      www.hostinger.fr
                    </a>
                  </p>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  3. Propriété intellectuelle
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    L&apos;ensemble du contenu de ce site (textes, images,
                    vidéos, logos, icônes, sons, logiciels, etc.) est la
                    propriété exclusive de {SITE_CONFIG.name} ou de ses
                    partenaires et est protégé par les lois françaises et
                    internationales relatives à la propriété intellectuelle.
                  </p>
                  <p>
                    Toute reproduction, représentation, modification,
                    publication, transmission, dénaturation, totale ou partielle
                    du site ou de son contenu, par quelque procédé que ce soit,
                    et sur quelque support que ce soit est interdite sans
                    l&apos;autorisation écrite préalable de {SITE_CONFIG.name}.
                  </p>
                </div>
              </div>

              {/* Responsabilité */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  4. Limitation de responsabilité
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    {SITE_CONFIG.name} s&apos;efforce d&apos;assurer
                    l&apos;exactitude et la mise à jour des informations
                    diffusées sur ce site, dont il se réserve le droit de
                    corriger le contenu à tout moment et sans préavis.
                  </p>
                  <p>
                    {SITE_CONFIG.name} décline toute responsabilité en cas de
                    difficulté d&apos;accès à son site ou d&apos;interruptions
                    dans la connexion, quelle qu&apos;en soit la cause.
                  </p>
                  <p>
                    Les prix affichés sur le site sont donnés à titre indicatif.
                    Seul un devis personnalisé fait foi.
                  </p>
                </div>
              </div>

              {/* Liens hypertextes */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  5. Liens hypertextes
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Le site peut contenir des liens vers d&apos;autres sites
                    internet. {SITE_CONFIG.name} n&apos;exerce aucun contrôle
                    sur ces sites et décline toute responsabilité quant à
                    l&apos;accès, au contenu ou à l&apos;utilisation de ces
                    sites tiers.
                  </p>
                </div>
              </div>

              {/* Droit applicable */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  6. Droit applicable
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Les présentes mentions légales sont soumises au droit
                    français. En cas de litige, les tribunaux français seront
                    seuls compétents.
                  </p>
                </div>
              </div>

              {/* Crédits */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  7. Crédits
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-2 text-text">
                  <p>
                    <strong>Conception et développement :</strong>{" "}
                    {SITE_CONFIG.name}
                  </p>
                  <p>
                    <strong>Technologies :</strong> Next.js, React, Tailwind CSS,
                    TypeScript
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
