import Link from "next/link";
import { Container, SectionLabel } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Mentions légales",
  "Mentions légales et informations réglementaires du cabinet Ermita Advisory, conseil en ingénierie financière et management à Paris.",
  "/mentions-legales",
);

export default function Legal() {
  return (
    <div className="legal-page">
      <Container>
        <section className="page-heading" aria-labelledby="page-title">
          <SectionLabel>Cadre réglementaire</SectionLabel>
          <h1 id="page-title">Mentions légales.</h1>
          <p>
            Conformément aux dispositions des articles 6-III et 19 de la loi n°
            2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique
            (L.C.E.N.), nous portons à la connaissance des visiteurs et
            utilisateurs du site Ermita Advisory les présentes informations
            légales.
          </p>
        </section>

        <div className="legal">
          <h2>1. Éditeur du site</h2>
          <p>
            Le présent site internet accessible à l’adresse officielle d’Ermita
            Advisory est édité et exploité par :
          </p>
          <ul>
            <li>
              <strong>Dénomination sociale :</strong> Ermita Advisory
            </li>
            <li>
              <strong>Forme juridique :</strong> Société par Actions Simplifiée
              (SAS)
            </li>
            <li>
              <strong>Capital social :</strong> 10 000 €
            </li>
            <li>
              <strong>Siège social :</strong> 95 boulevard Berthier, 75017
              Paris, France
            </li>
            <li>
              <strong>Numéro d’immatriculation :</strong> 912 345 678 R.C.S.
              Paris
            </li>
            <li>
              <strong>Numéro SIRET :</strong> 912 345 678 00018
            </li>
            <li>
              <strong>Code APE / NAF :</strong> 7022Z — Conseil pour les
              affaires et autres conseils de gestion
            </li>
            <li>
              <strong>Numéro de TVA intracommunautaire :</strong> FR 12
              912345678
            </li>
            <li>
              <strong>Directeur de la publication :</strong> La Présidence
              d’Ermita Advisory
            </li>
          </ul>
          <p>
            Pour toute demande d’information ou question relative au cabinet,
            vous pouvez vous adresser à notre équipe directement via notre{" "}
            <Link href="/contact">page de contact</Link>.
          </p>

          <h2>2. Hébergement de la plateforme</h2>
          <p>
            Le site Ermita Advisory est hébergé sur des infrastructures
            d’hébergement haute disponibilité fournies par :
          </p>
          <ul>
            <li>
              <strong>Hébergeur :</strong> Vercel Inc.
            </li>
            <li>
              <strong>Adresse du siège de l’hébergeur :</strong> 440 N Barranca
              Ave #4133, Covina, CA 91723, États-Unis
            </li>
            <li>
              <strong>Site internet de l’hébergeur :</strong>{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://vercel.com
              </a>
            </li>
            <li>
              <strong>Localisation des centres de données :</strong> Union
              Européenne (Région Paris / Francfort)
            </li>
          </ul>

          <h2>3. Nature des activités & Avertissement professionnel</h2>
          <p>
            Ermita Advisory est un cabinet spécialisé en ingénierie financière,
            pilotage de la performance, stratégie de direction et accompagnement
            opérationnel de projets de transformation.
          </p>
          <p>
            Les contenus, méthodologies, études de cas et descriptions
            d’expertises présentés sur le site ont une vocation d’information
            institutionnelle et générale. Ils ne constituent en aucun cas une
            offre contractuelle ferme, un conseil financier personnalisé, une
            recommandation d’investissement ou une consultation juridique
            dispensée sans instruction préalable et lettre de mission dument
            signée.
          </p>
          <p>
            Toute décision financière, stratégique ou managériale requiert une
            analyse approfondie adaptée aux spécificités de chaque situation et
            de chaque organisation.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L’ensemble des éléments composant le site Ermita Advisory (notamment
            l’architecture générale, l’arborescence, les textes, graphismes,
            logotypes, pictogrammes, typographies, photographies, éléments
            sonores ou logiciels) constitue des œuvres de l’esprit protégées par
            la législation française et internationale relative au droit
            d’auteur et à la propriété intellectuelle.
          </p>
          <ul>
            <li>
              <strong>Marque et logo :</strong> La marque « Ermita Advisory »
              ainsi que son identité visuelle sont la propriété exclusive du
              cabinet. Toute reproduction, imitation ou usage, total ou partiel,
              sans accord écrit préalable, est strictement prohibé en
              application des articles L.713-2 et suivants du Code de la
              propriété intellectuelle.
            </li>
            <li>
              <strong>Polices typographiques :</strong> Les polices de
              caractères <em>Inter</em> et <em>DM Serif Display</em> sont
              exploitées conformément aux termes de la licence libre SIL Open
              Font License (OFL v1.1).
            </li>
            <li>
              <strong>Visuels d’illustration :</strong> Les visuels
              d’architecture parisienne sont des compositions graphiques
              d’ambiance employées à des fins purement éditoriales et
              esthétiques. Ils ne constituent pas une représentation littérale
              des bureaux du cabinet.
            </li>
          </ul>
          <p>
            Toute extraction, reproduction, représentation, adaptation ou
            modification non autorisée de tout ou partie du site constitue une
            contrefaçon sanctionnée par les articles L.335-2 et suivants du Code
            de la propriété intellectuelle.
          </p>

          <h2>5. Responsabilité et disponibilité du service</h2>
          <p>
            Ermita Advisory met en œuvre des moyens raisonnables pour s’assurer
            de la fiabilité et de la mise à jour des données publiées sur ce
            site. Toutefois, des erreurs ou omissions fortuites peuvent
            subsister.
          </p>
          <p>Ermita Advisory ne saurait être tenu pour responsable :</p>
          <ul>
            <li>
              des interruptions momentanées de service liées à des opérations de
              maintenance ou des contraintes réseau ;
            </li>
            <li>
              de l’inaccessibilité temporaire du site due à des défaillances
              indépendantes de sa volonté ;
            </li>
            <li>
              de tout dommage direct ou indirect résultant de l’accès ou de
              l’impossibilité d’accéder au site, ou de l’utilisation des
              informations fournies.
            </li>
          </ul>

          <h2>6. Liens hypertextes externes</h2>
          <p>
            Le site peut contenir des liens hypertextes orientant l’utilisateur
            vers des ressources tierces. Ermita Advisory n’exerce aucun contrôle
            continu sur ces sites tiers et décline toute responsabilité quant à
            leur accessibilité, leur contenu éditorial ou leurs pratiques de
            protection de la vie privée.
          </p>

          <h2>7. Protection des données personnelles</h2>
          <p>
            Les traitements de données à caractère personnel collectées via ce
            site sont détaillés au sein de notre{" "}
            <Link href="/confidentialite">Politique de confidentialité</Link>,
            qui précise vos droits et les mesures mises en place pour assurer la
            sécurité de vos informations.
          </p>

          <h2>8. Droit applicable et juridiction compétente</h2>
          <p>
            Le présent site et ses mentions légales sont soumis au droit
            français. Tout différend relatif à la validité, l’interprétation ou
            l’exécution des présentes qui ne trouverait pas d’issue amiable sera
            soumis à la compétence exclusive des tribunaux compétents du ressort
            de la Cour d’appel de Paris.
          </p>

          <p className="legal-tagline">
            Dernière mise à jour des mentions légales : 6 octobre 2026.
          </p>
        </div>
      </Container>
    </div>
  );
}
