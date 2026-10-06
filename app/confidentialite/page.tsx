import Link from 'next/link';
import {Container, SectionLabel} from '@/components/ui';
import {pageMetadata} from '@/lib/seo';

export const metadata = pageMetadata(
  'Politique de confidentialité',
  'Politique de protection des données personnelles et respect de la vie privée d’Ermita Advisory, conforme au RGPD.',
  '/confidentialite'
);

export default function Privacy() {
  return (
    <div className="legal-page"><Container>
      <section className="page-heading">
        <SectionLabel>Protection des données</SectionLabel>
        <h1>Politique de confidentialité.</h1>
        <p>
          Le respect de votre vie privée et la protection de vos données à caractère personnel constituent
          une priorité absolue pour Ermita Advisory. La présente politique a pour objet de vous informer avec
          transparence sur les traitements de données mis en œuvre sur notre site, conformément au Règlement
          Général sur la Protection des Données (RGPD n° 2016/679) et à la loi Informatique et Libertés modifiée.
        </p>
      </section>

      <div className="legal">
        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données à caractère personnel collectées sur ce site est :
        </p>
        <ul>
          <li><strong>Société :</strong> Ermita Advisory (SAS)</li>
          <li><strong>Siège social :</strong> 95 boulevard Berthier, 75017 Paris, France</li>
          <li><strong>R.C.S. :</strong> 912 345 678 Paris</li>
          <li><strong>Contact :</strong> Accessible directement via notre <Link href="/contact">formulaire de contact</Link> ou par courrier postal adressé au siège social.</li>
        </ul>

        <h2>2. Principes directeurs et minimisation des données</h2>
        <p>
          Ermita Advisory applique strictement le principe de minimisation des données (article 5-1-c du RGPD).
          Seules les données strictement pertinentes et nécessaires aux finalités poursuivies sont collectées.
          Le site ne comporte aucun espace d’enregistrement d’utilisateur, aucun espace publicitaire, ni aucun
          outil de pistage comportemental tiers.
        </p>

        <h2>3. Données collectées et modalités de collecte</h2>
        <p>
          Dans le cadre de votre utilisation du site, deux catégories de données sont susceptibles d’être traitées :
        </p>

        <h3>A. Données transmises volontairement via le formulaire de contact</h3>
        <p>
          Lorsque vous complétez notre formulaire de prise de contact, vous nous transmettez directement les informations suivantes :
        </p>
        <ul>
          <li><strong>Nom et prénom</strong> (obligatoire) : afin d’identifier notre interlocuteur ;</li>
          <li><strong>Adresse e-mail professionnelle</strong> (obligatoire) : afin de vous répondre et d’acheminer nos échanges ;</li>
          <li><strong>Nom de votre entreprise ou organisation</strong> (facultatif) : afin de contextualiser votre structure ;</li>
          <li><strong>Numéro de téléphone</strong> (facultatif) : afin de faciliter un échange direct si vous le souhaitez ;</li>
          <li><strong>Pôle d’expertise concerné</strong> (facultatif) : pour orienter directement la demande vers l’équipe dédiée ;</li>
          <li><strong>Message</strong> (obligatoire) : description de votre situation, de vos enjeux et de vos objectifs.</li>
        </ul>

        <h3>B. Données techniques de sécurité et prévention des abus (Antispam)</h3>
        <p>
          Afin de protéger le site contre les attaques par déni de service (DDoS) et les soumissions massives automatisées :
        </p>
        <ul>
          <li>
            <strong>Empreinte cryptographique d’adresse IP :</strong> Lors d’une tentative de soumission du formulaire,
            une empreinte hachée unidirectionnelle (HMAC-SHA256) est générée à l’aide d’un sel secret aléatoire côté serveur.
            Cette empreinte anonymisée permet uniquement de limiter les requêtes répétitives (maximum 5 requêtes par tranche de 10 minutes)
            sans jamais stocker ni journaliser votre adresse IP en clair.
          </li>
          <li>
            <strong>Piège antispam invisible (honeypot) :</strong> Un champ masqué permet de bloquer automatiquement les robots
            malveillants sans recourir à un captcha tiers intrusif déposant des cookies sur votre navigateur.
          </li>
        </ul>

        <h2>4. Finalités et bases légales des traitements</h2>
        <p>
          Chaque traitement repose sur une base juridique claire au sens de l’article 6 du RGPD :
        </p>
        <ul>
          <li>
            <strong>Gestion et suivi de vos demandes de contact professionnel :</strong>
            <br />
            <em>Finalité :</em> Échanger sur vos besoins, qualifier votre demande, planifier un premier entretien d’évaluation et,
            le cas échéant, établir une proposition d’intervention sur mesure.
            <br />
            <em>Base légale :</em> Mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD) et intérêt légitime
            du cabinet à entretenir des relations d’affaires avec ses interlocuteurs (art. 6.1.f du RGPD).
          </li>
          <li>
            <strong>Sécurité du site web et protection des systèmes :</strong>
            <br />
            <em>Finalité :</em> Prévenir les soumissions abusives, sécuriser l’acheminement des flux et garantir la disponibilité de l’infrastructure.
            <br />
            <em>Base légale :</em> Intérêt légitime d’Ermita Advisory à préserver la sécurité et l’intégrité de son service (art. 6.1.f du RGPD).
          </li>
        </ul>

        <h2>5. Destinataires et sous-traitants techniques</h2>
        <p>
          Vos données sont strictement réservées aux associés et collaborateurs d’Ermita Advisory habilités à traiter votre demande.
        </p>
        <p>
          Pour le bon fonctionnement technique et sécurisé du service, Ermita Advisory fait appel aux prestataires techniques suivants,
          sélectionnés pour leurs engagements rigoureux en matière de confidentialité et de conformité RGPD :
        </p>
        <ul>
          <li>
            <strong>Resend Inc. (acheminement des courriels) :</strong> Acheminement sécurisé des messages transmis via le formulaire.
            Les transmissions sont protégées par chiffrement TLS. Les correspondances vous utilisent comme adresse de réponse directe (reply-to).
          </li>
          <li>
            <strong>Upstash Inc. (rate-limiting antispam) :</strong> Base de données Redis chiffrée en mémoire volatile assurant
            le comptage technique temporaire des soumissions d’API.
          </li>
          <li>
            <strong>Vercel Inc. (hébergement applicatif) :</strong> Hébergement du code source et diffusion sécurisée du site web.
          </li>
        </ul>
        <p>
          <strong>Aucune vente ni cession de données :</strong> Ermita Advisory ne vend, ne loue, ne cède ni ne transfère aucune donnée
          personnelle à des tiers à des fins commerciales ou publicitaires.
        </p>

        <h2>6. Durée de conservation des données</h2>
        <p>
          Ermita Advisory conserve vos données pendant une durée strictement limitée et proportionnée aux finalités poursuivies :
        </p>
        <ul>
          <li>
            <strong>Demandes d’information sans suite contractuelle :</strong> Les coordonnées et échanges sont conservés pour une durée
            maximale de 3 ans à compter du dernier contact émanant de votre part, puis sont définitivement supprimés.
          </li>
          <li>
            <strong>Relations contractuelles et missions engagées :</strong> Les données nécessaires à l’exécution de la mission,
            à la gestion comptable et au respect des obligations légales sont archivées pendant les durées de prescription légales
            (5 ans pour la responsabilité contractuelle, 10 ans pour les pièces comptables et fiscales).
          </li>
          <li>
            <strong>Données techniques de limitation (compteurs antispam) :</strong> Expiration automatique et irréversible après 10 minutes.
          </li>
        </ul>

        <h2>7. Mesures de sécurité</h2>
        <p>
          Ermita Advisory applique des mesures de sécurité techniques et organisationnelles renforcées :
        </p>
        <ul>
          <li>Chiffrement systématique des communications via le protocole HTTPS / TLS ;</li>
          <li>Hachage cryptographique sécurisé (HMAC-SHA256) pour les données techniques de limitation ;</li>
          <li>Absence d’exposition ou d’hébergement d’une base de données de messages en accès libre sur le site web ;</li>
          <li>Contrôle strict des accès et des clés de sécurité via des variables d’environnement isolées.</li>
        </ul>

        <h2>8. Politique relative aux cookies et traceurs</h2>
        <p>
          Le site Ermita Advisory se distingue par une conception sobre et éthique :
        </p>
        <ul>
          <li><strong>Zéro cookie publicitaire ou de ciblage ;</strong></li>
          <li><strong>Zéro cookie tiers issu de réseaux sociaux ;</strong></li>
          <li><strong>Zéro outil d’analyse comportementale intrusif requérant un consentement préalable.</strong></li>
        </ul>
        <p>
          Conformément aux délibérations et recommandations de la CNIL relatives aux traceurs, notre site ne requiert
          aucun bandeau intrusif d’acceptation de cookies, votre navigation n’étant soumise à aucun traçage commercial.
        </p>

        <h2>9. Vos droits et modalités d’exercice</h2>
        <p>
          Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants concernant vos données à caractère personnel :
        </p>
        <ul>
          <li><strong>Droit d’accès (art. 15 RGPD) :</strong> vérifier l’existence d’un traitement vous concernant et en obtenir communication ;</li>
          <li><strong>Droit de rectification (art. 16 RGPD) :</strong> demander la mise à jour ou la correction de données inexactes ou incomplètes ;</li>
          <li><strong>Droit à l’effacement (« droit à l’oubli », art. 17 RGPD) :</strong> obtenir l’effacement de vos données, sous réserve des obligations légales de conservation ;</li>
          <li><strong>Droit à la limitation du traitement (art. 18 RGPD) :</strong> demander le gel temporaire du traitement de certaines données ;</li>
          <li><strong>Droit d’opposition (art. 21 RGPD) :</strong> vous opposer à tout moment, pour des motifs légitimes, au traitement de vos données ;</li>
          <li><strong>Droit à la portabilité (art. 20 RGPD) :</strong> recevoir vos données dans un format structuré et lisible par machine ;</li>
          <li><strong>Directives post-mortem :</strong> définir des directives relatives au sort de vos données après votre décès.</li>
        </ul>

        <h3>Modalités d’exercice de vos droits</h3>
        <p>
          Vous pouvez exercer l’ensemble de ces droits à tout moment en nous adressant une demande :
        </p>
        <ul>
          <li>Par voie postale : <strong>Ermita Advisory, 95 boulevard Berthier, 75017 Paris, France</strong> ;</li>
          <li>En ligne : via notre <Link href="/contact">formulaire de contact</Link>.</li>
        </ul>
        <p>
          Afin de protéger la confidentialité de vos données, nous pourrons être amenés à vous demander des précisions
          permettant de confirmer votre identité en cas de doute raisonnable. Une réponse vous sera apportée dans un délai
          maximal d’un mois à compter de la réception de votre demande (délai prorogeable de deux mois en cas de complexité avérée).
        </p>

        <h3>Réclamation auprès de l’autorité de contrôle</h3>
        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous avez la possibilité
          d’introduire une réclamation auprès de la <strong>Commission Nationale de l’Informatique et des Libertés (CNIL)</strong> :
        </p>
        <ul>
          <li>Sur le site officiel de la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">https://www.cnil.fr</a></li>
          <li>Par courrier postal : CNIL — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</li>
        </ul>

        <h2>10. Modifications de la politique de confidentialité</h2>
        <p>
          Ermita Advisory se réserve la possibilité d’adapter la présente politique de confidentialité afin de refléter
          les évolutions des pratiques, des services proposés ou du cadre législatif et réglementaire. Toute modification
          entrera en vigueur dès sa publication en ligne.
        </p>

        <p className="legal-tagline">
          Dernière mise à jour de la politique de confidentialité : 6 octobre 2026.
        </p>
      </div>
    </Container></div>
  );
}


