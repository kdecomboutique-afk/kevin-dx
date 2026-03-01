import { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/animations/FadeIn";
import { createMetadata } from "@/lib/metadata";
import { SITE_CONFIG, CONTACT } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Conditions Générales de Vente - Kevin DX",
  description:
    "Conditions générales de vente de Kevin DX - Prestations de création de sites web et gestion de réseaux sociaux pour TPE, PME et artisans.",
  path: "/cgv",
});

export default function CGVPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-surface pt-32 pb-16 lg:pt-40 lg:pb-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Conditions Générales de Vente
              </h1>
              <p className="mt-4 text-lg text-text-muted">
                Dernière mise à jour : mars 2026
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

              {/* 1. Objet */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  1. Objet et champ d&apos;application
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Les présentes Conditions Générales de Vente (CGV) régissent
                    l&apos;ensemble des prestations de services conclues entre{" "}
                    {SITE_CONFIG.name} (ci-après &quot;le Prestataire&quot;) et
                    toute personne physique ou morale (ci-après &quot;le
                    Client&quot;) souhaitant bénéficier de ses services.
                  </p>
                  <p>
                    Toute commande implique l&apos;acceptation pleine et entière
                    des présentes CGV. Le Client déclare en avoir pris
                    connaissance et les accepter sans réserve avant toute
                    commande.
                  </p>
                </div>
              </div>

              {/* 2. Prestataire */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  2. Identification du prestataire
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-2 text-text">
                  <p>
                    <strong>Nom commercial :</strong> {SITE_CONFIG.name}
                  </p>
                  <p>
                    <strong>Statut :</strong> Micro-entrepreneur (entrepreneur
                    individuel)
                  </p>
                  <p>
                    <strong>Activité :</strong> Création de sites web et gestion
                    de réseaux sociaux
                  </p>
                  <p>
                    <strong>SIRET :</strong> En cours d&apos;immatriculation —
                    Réf. J00220670293
                  </p>
                  <p>
                    <strong>Adresse :</strong> 50 rue de la Liberté, 30150
                    Roquemaure, Occitanie
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
                    <strong>TVA :</strong> Non assujetti à la TVA — Article 293 B
                    du Code Général des Impôts
                  </p>
                </div>
              </div>

              {/* 3. Services */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  3. Services proposés
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    {SITE_CONFIG.name} propose les prestations suivantes :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Site vitrine :</strong> conception et développement
                      de sites web de présentation, optimisés pour le référencement
                      naturel (SEO) et les performances
                    </li>
                    <li>
                      <strong>Site e-commerce :</strong> conception et
                      développement de boutiques en ligne avec gestion des
                      produits, paiements sécurisés et commandes
                    </li>
                    <li>
                      <strong>Gestion de réseaux sociaux :</strong> création et
                      animation de contenus sur les plateformes sociales
                      (Facebook, Instagram, etc.)
                    </li>
                    <li>
                      <strong>Maintenance et évolution :</strong> mises à jour,
                      corrections et ajouts de fonctionnalités sur des projets
                      existants
                    </li>
                  </ul>
                  <p>
                    Le détail des prestations est précisé dans le devis
                    personnalisé remis au Client avant toute commande.
                  </p>
                </div>
              </div>

              {/* 4. Devis et commande */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  4. Devis et commande
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Toute prestation fait l&apos;objet d&apos;un devis gratuit
                    préalable, établi après échange avec le Client sur ses besoins.
                    Le devis est valable <strong>30 jours</strong> à compter de
                    sa date d&apos;émission.
                  </p>
                  <p>
                    La commande est ferme et définitive dès lors que le Client
                    retourne le devis signé (manuscritement ou par voie
                    électronique) accompagné de la mention &quot;Bon pour
                    accord&quot; et du versement de l&apos;acompte prévu.
                  </p>
                  <p>
                    Toute modification du périmètre de la prestation après
                    signature du devis fera l&apos;objet d&apos;un avenant
                    tarifaire soumis à l&apos;accord du Client.
                  </p>
                </div>
              </div>

              {/* 5. Prix et paiement */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  5. Prix et modalités de paiement
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Les prix sont exprimés en euros TTC. En tant que
                    micro-entrepreneur bénéficiant de la franchise en base de TVA
                    (article 293 B du CGI), aucune TVA n&apos;est applicable sur
                    les prestations.
                  </p>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Échelonnement du paiement
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>
                        <strong>Acompte de 30 %</strong> à la signature du devis
                        et avant tout début de travaux
                      </li>
                      <li>
                        <strong>Solde de 70 %</strong> à la livraison du projet
                        et avant mise en ligne définitive
                      </li>
                    </ul>
                  </div>
                  <p>
                    Le paiement en <strong>3 fois sans frais</strong> est
                    disponible sur demande, selon les modalités suivantes : 30 %
                    à la commande, 35 % à mi-parcours, 35 % à la livraison.
                  </p>
                  <p>
                    Les règlements s&apos;effectuent par virement bancaire ou
                    tout autre moyen convenu entre les parties. En cas de retard
                    de paiement, des pénalités de 10 % du montant dû par mois de
                    retard seront appliquées, sans mise en demeure préalable.
                  </p>
                </div>
              </div>

              {/* 6. Délais */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  6. Délais de livraison
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Les délais indicatifs de livraison sont les suivants, à
                    compter de la réception de l&apos;acompte et de l&apos;ensemble
                    des éléments nécessaires (textes, images, identité visuelle) :
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      <strong>Site vitrine :</strong> 10 à 21 jours ouvrés
                    </li>
                    <li>
                      <strong>Site e-commerce :</strong> 20 à 42 jours ouvrés
                    </li>
                    <li>
                      <strong>Gestion de réseaux sociaux :</strong> démarrage
                      sous 7 jours ouvrés
                    </li>
                  </ul>
                  <p>
                    Ces délais sont donnés à titre indicatif et peuvent être
                    allongés en cas de retard dans la transmission des éléments
                    par le Client, ou en cas de demandes de modifications
                    dépassant le périmètre initial du devis.
                  </p>
                </div>
              </div>

              {/* 7. Droit de rétractation */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  7. Droit de rétractation
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Conformément aux articles L.221-18 et suivants du Code de la
                    consommation, le Client disposant de la qualité de
                    consommateur bénéficie d&apos;un droit de rétractation de{" "}
                    <strong>14 jours calendaires</strong> à compter de la
                    conclusion du contrat, sans avoir à justifier de motif.
                  </p>
                  <p>
                    Ce droit peut être exercé par envoi d&apos;un email à{" "}
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-accent hover:underline"
                    >
                      {CONTACT.email}
                    </a>{" "}
                    avec mention explicite de la volonté de se rétracter.
                  </p>
                  <p>
                    Conformément à l&apos;article L.221-28 du Code de la
                    consommation, le droit de rétractation ne s&apos;applique pas
                    aux prestations de services pleinement exécutées avant la fin
                    du délai de rétractation, si le Client a expressément demandé
                    l&apos;exécution immédiate des travaux.
                  </p>
                </div>
              </div>

              {/* 8. Satisfait ou remboursé */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  8. Garantie satisfait ou remboursé
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    {SITE_CONFIG.name} s&apos;engage à livrer un projet conforme
                    au cahier des charges défini dans le devis. Si le Client
                    estime que le rendu final ne correspond pas aux spécifications
                    convenues, la procédure suivante s&apos;applique :
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Le Client doit signaler son insatisfaction par email dans
                      les <strong>14 jours suivant la livraison</strong>, en
                      précisant les points non conformes
                    </li>
                    <li>
                      Le Prestataire s&apos;engage à proposer des corrections
                      dans un délai de 7 jours ouvrés
                    </li>
                    <li>
                      Si aucune solution satisfaisante n&apos;est trouvée après
                      deux séries de corrections, un remboursement intégral des
                      sommes versées sera effectué
                    </li>
                  </ul>
                  <p>
                    Cette garantie ne couvre pas les modifications demandées après
                    la livraison et sortant du périmètre initial du devis.
                  </p>
                </div>
              </div>

              {/* 9. Propriété intellectuelle */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  9. Propriété intellectuelle
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Le Prestataire reste propriétaire de l&apos;ensemble des
                    droits de propriété intellectuelle sur les créations réalisées
                    jusqu&apos;au paiement intégral des sommes dues.
                  </p>
                  <p>
                    Après règlement complet, le Client devient propriétaire des
                    droits d&apos;exploitation du site livré, pour une utilisation
                    en rapport avec l&apos;activité décrite dans le devis. Les
                    codes sources, frameworks et bibliothèques tiers utilisés
                    restent soumis à leurs licences respectives.
                  </p>
                  <p>
                    Le Prestataire se réserve le droit de mentionner la
                    réalisation dans son portfolio et ses supports de
                    communication, sauf accord contraire écrit du Client.
                  </p>
                </div>
              </div>

              {/* 10. Responsabilités */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  10. Responsabilités
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    Le Prestataire s&apos;engage à une <strong>obligation
                    de moyens</strong> et non de résultat. Il met en œuvre toutes
                    les compétences nécessaires à la bonne réalisation des
                    prestations.
                  </p>
                  <p>
                    Le Prestataire ne peut être tenu responsable de résultats
                    commerciaux, de positions dans les moteurs de recherche (SEO),
                    ni du trafic généré sur le site du Client. Les performances
                    SEO dépendent de nombreux facteurs externes hors du contrôle
                    du Prestataire.
                  </p>
                  <p>
                    Le Client est seul responsable des contenus (textes, images,
                    vidéos) qu&apos;il fournit au Prestataire, et garantit
                    disposer des droits nécessaires sur ces éléments.
                  </p>
                </div>
              </div>

              {/* 11. Protection des données */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  11. Protection des données personnelles
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Les données personnelles collectées dans le cadre de
                    l&apos;exécution des présentes CGV sont traitées
                    conformément à la politique de confidentialité disponible à
                    l&apos;adresse{" "}
                    <a
                      href="/politique-confidentialite"
                      className="text-accent hover:underline"
                    >
                      {SITE_CONFIG.url}/politique-confidentialite
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* 12. Litiges */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  12. Résolution des litiges
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-text leading-relaxed">
                  <p>
                    En cas de litige, les parties s&apos;engagent à rechercher
                    une solution amiable avant tout recours judiciaire.
                  </p>
                  <p>
                    Conformément aux articles L.612-1 et suivants du Code de la
                    consommation, le Client consommateur peut recourir gratuitement
                    à un médiateur de la consommation. Le Prestataire adhère au
                    service de médiation du Centre de Médiation et d&apos;Arbitrage
                    de Paris (CMAP) ou tout autre médiateur compétent.
                  </p>
                  <p>
                    À défaut de résolution amiable, les tribunaux compétents
                    seront ceux du ressort de <strong>Nîmes</strong>, nonobstant
                    pluralité de défendeurs ou appel en garantie.
                  </p>
                </div>
              </div>

              {/* 13. Droit applicable */}
              <div>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">
                  13. Droit applicable
                </h2>
                <div className="rounded-2xl border border-border bg-white p-6 text-text leading-relaxed">
                  <p>
                    Les présentes CGV sont soumises au <strong>droit français</strong>.
                    Toute question relative à leur interprétation ou à leur
                    exécution sera régie par les dispositions du Code civil et
                    du Code de la consommation français.
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
