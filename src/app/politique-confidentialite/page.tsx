import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Politique de Confidentialité",
  description:
    "Politique de confidentialité du site kevin-dx.fr - Traitement des données personnelles, cookies et droits RGPD.",
  path: "/politique-confidentialite",
});

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Politique de Confidentialité
              </h1>
              <p className="mt-4 text-lg text-text-muted">
                Dernière mise à jour : février 2026
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
              {/* Introduction */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  1. Introduction
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    {SITE_CONFIG.name} accorde une grande importance à la
                    protection de vos données personnelles. Cette politique de
                    confidentialité décrit les types de données que nous
                    collectons, comment nous les utilisons, et les mesures que
                    nous prenons pour les protéger.
                  </p>
                  <p>
                    Cette politique est conforme au Règlement Général sur la
                    Protection des Données (RGPD - Règlement UE 2016/679) et à
                    la loi Informatique et Libertés du 6 janvier 1978 modifiée.
                  </p>
                </div>
              </div>

              {/* Responsable du traitement */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  2. Responsable du traitement
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-2 text-text">
                  <p>
                    <strong>Nom :</strong> Kevin DX
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
                    <strong>Adresse :</strong> {CONTACT.location}
                  </p>
                </div>
              </div>

              {/* Données collectées */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  3. Données collectées
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>Nous collectons les données suivantes :</p>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      3.1 Données fournies volontairement
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Formulaire de contact :</strong> nom, email,
                        téléphone, message
                      </li>
                      <li>
                        <strong>Formulaire de devis :</strong> nom, email,
                        téléphone, détails du projet, budget estimé
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      3.2 Données collectées automatiquement
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        Adresse IP (anonymisée si Google Analytics est activé)
                      </li>
                      <li>Type de navigateur et système d&apos;exploitation</li>
                      <li>Pages visitées et durée de visite</li>
                      <li>Source de trafic (moteur de recherche, lien direct)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Finalités */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  4. Finalités du traitement
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Répondre à vos demandes de contact et de devis
                    </li>
                    <li>
                      Établir et gérer la relation commerciale
                    </li>
                    <li>
                      Améliorer l&apos;expérience utilisateur sur le site
                    </li>
                    <li>
                      Mesurer l&apos;audience et les performances du site
                      (uniquement avec votre consentement)
                    </li>
                    <li>
                      Respecter nos obligations légales et réglementaires
                    </li>
                  </ul>
                </div>
              </div>

              {/* Base légale */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  5. Base légale du traitement
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Consentement :</strong> pour les cookies
                      analytiques et les communications marketing
                    </li>
                    <li>
                      <strong>Exécution contractuelle :</strong> pour le
                      traitement des demandes de devis et la gestion de projets
                    </li>
                    <li>
                      <strong>Intérêt légitime :</strong> pour l&apos;amélioration
                      du site et la sécurité
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  6. Cookies
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Un cookie est un petit fichier texte déposé sur votre
                    terminal (ordinateur, tablette, smartphone) lors de la visite
                    d&apos;un site web.
                  </p>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      6.1 Cookies strictement nécessaires
                    </h3>
                    <p>
                      Ces cookies sont essentiels au fonctionnement du site. Ils
                      permettent de mémoriser vos préférences de consentement. Ils
                      ne nécessitent pas votre consentement.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      6.2 Cookies analytiques (optionnels)
                    </h3>
                    <p>
                      Si activés avec votre consentement, ces cookies (Google
                      Analytics) nous permettent de mesurer l&apos;audience du
                      site et de comprendre comment les visiteurs l&apos;utilisent.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      6.3 Gestion des cookies
                    </h3>
                    <p>
                      Vous pouvez à tout moment modifier vos préférences en
                      matière de cookies via la bannière de consentement ou les
                      paramètres de votre navigateur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Durée de conservation */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  7. Durée de conservation
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Données de contact :</strong> 3 ans après le
                      dernier contact
                    </li>
                    <li>
                      <strong>Données clients :</strong> durée de la relation
                      contractuelle + 5 ans (obligations légales)
                    </li>
                    <li>
                      <strong>Cookies analytiques :</strong> 13 mois maximum
                    </li>
                  </ul>
                </div>
              </div>

              {/* Vos droits */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  8. Vos droits
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Droit d&apos;accès :</strong> obtenir la
                      confirmation que des données vous concernant sont traitées
                    </li>
                    <li>
                      <strong>Droit de rectification :</strong> demander la
                      correction de données inexactes
                    </li>
                    <li>
                      <strong>Droit à l&apos;effacement :</strong> demander la
                      suppression de vos données
                    </li>
                    <li>
                      <strong>Droit à la portabilité :</strong> recevoir vos
                      données dans un format structuré
                    </li>
                    <li>
                      <strong>Droit d&apos;opposition :</strong> vous opposer au
                      traitement de vos données
                    </li>
                    <li>
                      <strong>Droit à la limitation :</strong> demander la
                      limitation du traitement
                    </li>
                  </ul>
                  <p>
                    Pour exercer ces droits, contactez-nous à{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-accent hover:underline"
                    >
                      {CONTACT.email}
                    </a>
                    . Nous répondrons dans un délai d&apos;un mois.
                  </p>
                  <p>
                    Vous pouvez également introduire une réclamation auprès de la
                    CNIL :{" "}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      www.cnil.fr
                    </a>
                  </p>
                </div>
              </div>

              {/* Sécurité */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  9. Sécurité des données
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Nous mettons en oeuvre des mesures techniques et
                    organisationnelles appropriées pour protéger vos données
                    contre tout accès non autorisé, modification, divulgation ou
                    destruction. Le site utilise le protocole HTTPS pour chiffrer
                    les communications.
                  </p>
                </div>
              </div>

              {/* Sous-traitants */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  10. Sous-traitants
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Hostinger</strong> (hébergement) - Chypre/UE
                    </li>
                    <li>
                      <strong>Formspree</strong> (traitement des formulaires) -
                      États-Unis (clauses contractuelles types)
                    </li>
                    <li>
                      <strong>Google Analytics</strong> (mesure d&apos;audience,
                      si activé) - États-Unis (clauses contractuelles types)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modification */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  11. Modification de la politique
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Nous nous réservons le droit de modifier cette politique de
                    confidentialité à tout moment. Les modifications seront
                    publiées sur cette page avec la date de mise à jour. Nous
                    vous invitons à consulter régulièrement cette page.
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
