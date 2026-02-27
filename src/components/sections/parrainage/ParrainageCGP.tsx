"use client";

import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";

export default function ParrainageCGP() {
  return (
    <section id="cgp" className="py-20 lg:py-28 bg-surface scroll-mt-20">
      <Container>
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              Conditions Générales de Parrainage
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              Dernière mise à jour : février 2026
            </p>

            <div className="mt-8 space-y-6 text-text-muted leading-relaxed">
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  1. Objet
                </h3>
                <p className="mt-2">
                  Le programme de parrainage Kevin DX permet à toute personne (le &quot;Parrain&quot;)
                  de recommander les services de Kevin DX à un tiers (le &quot;Filleul&quot;)
                  et de percevoir une commission en cas de vente effective.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  2. Éligibilité
                </h3>
                <p className="mt-2">
                  Toute personne physique majeure ou personne morale peut participer au programme.
                  Le Parrain ne doit pas être le Filleul lui-même. Les employés de Kevin DX
                  et leurs proches directs ne sont pas éligibles.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  3. Commissions
                </h3>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Site Vitrine : 10% du montant HT de la prestation</li>
                  <li>E-Commerce : 7% du montant HT de la prestation</li>
                  <li>Réseaux Sociaux : montant du premier mois d&apos;abonnement</li>
                  <li>Template : 15% du prix d&apos;achat</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  4. Conditions de déclenchement
                </h3>
                <p className="mt-2">
                  La commission est due uniquement lorsque le Filleul a effectivement payé
                  l&apos;intégralité de la prestation (ou la dernière échéance en cas de paiement
                  en plusieurs fois). Une simple demande de devis ou une signature de contrat
                  ne déclenche pas la commission.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  5. Versement
                </h3>
                <p className="mt-2">
                  La commission est versée par virement bancaire dans un délai de 30 jours
                  calendaires suivant l&apos;encaissement intégral du paiement du Filleul.
                  Le Parrain doit fournir ses coordonnées bancaires (IBAN) pour recevoir le paiement.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  6. Attribution du parrainage
                </h3>
                <p className="mt-2">
                  Le Filleul est rattaché au Parrain par le code de parrainage transmis via
                  le lien personnalisé ou mentionné lors de la prise de contact. En cas de
                  conflit d&apos;attribution (plusieurs parrains potentiels), le premier code
                  enregistré fait foi.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  7. Durée de validité
                </h3>
                <p className="mt-2">
                  Le code parrain est valide pendant 30 jours à compter de sa première
                  utilisation par le Filleul. Au-delà de ce délai, l&apos;attribution n&apos;est
                  plus garantie.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  8. Obligations fiscales
                </h3>
                <p className="mt-2">
                  Les commissions perçues constituent des revenus imposables. Le Parrain est
                  seul responsable de leur déclaration auprès de l&apos;administration fiscale.
                  Pour les Parrains professionnels, une facture sera requise pour le versement
                  de la commission.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  9. Modification et résiliation
                </h3>
                <p className="mt-2">
                  Kevin DX se réserve le droit de modifier les conditions du programme
                  (notamment les taux de commission) à tout moment, avec un préavis de 30 jours.
                  Les parrainages en cours restent soumis aux conditions en vigueur au moment
                  de la recommandation. Le programme peut être suspendu ou arrêté à tout moment.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  10. Abus
                </h3>
                <p className="mt-2">
                  Tout abus (auto-parrainage, spam, fausses recommandations, usurpation d&apos;identité)
                  entraînera l&apos;exclusion immédiate du programme et l&apos;annulation des commissions
                  dues.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
