# Ermita Advisory

Site vitrine français développé directement à la racine avec Next.js 16.3.8, React 19.3.0, TypeScript, App Router et Tailwind CSS 4. Dépendances exactes verrouillées dans `package-lock.json`. Node.js 22 recommandé (version utilisée : 22.23.2), npm 10 ou supérieur.

## Lancement local

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:3000. Pour tester la version de production locale, arrêter le serveur de développement puis lancer :

```sh
npm run build
npm start
```

Aucune publication n’a été réalisée.

## Configuration Vercel

`vercel.json` impose le framework Next.js, `npm ci` et `npm run build`, et laisse Vercel détecter la sortie du framework. Dans les réglages Vercel, le Root Directory doit être la racine du dépôt (`./`). Ne pas servir `public/` comme un site statique : cela rend les images accessibles mais laisse les routes App Router en 404. Après modification des paramètres, créer un nouveau déploiement, de préférence sans réutiliser le cache du précédent.

Pour le domaine actuellement fourni, renseigner `NEXT_PUBLIC_SITE_URL=https://ermita-advisory.vercel.app`. Garder `NEXT_PUBLIC_ALLOW_INDEXING=false` tant que les validations avant publication ne sont pas terminées. Aucun déploiement n’est lancé automatiquement par l’agent.

## Sources et organisation

Le brief de référence est `ermita-advisory-kit-integration/brief-integration-ermita-advisory.md`, qui référence les assets intégrables et complète la copie de la racine. Les briefs, l’archive, les maquettes et tous les assets d’origine sont préservés.

- `app/` : accueil, cabinet, quatre expertises via une route dynamique fermée, contact, mentions légales, confidentialité, 404, robots, sitemap et API de contact.
- `content/site.ts` : contenus typés centralisés, repris du brief ; `scripts/import-content.cjs` permet de les régénérer depuis le kit (écrase uniquement le module généré).
- `components/` : header, navigation mobile, logo, composants UI, hero, cartes d’expertise, méthode, bannière de contact, footer et formulaire.
- `public/` : copies des assets fournis et tokens graphiques. Polices chargées avec `next/font/local` ; images WebP optimisées par `next/image`.
- `verification/` : captures intégrales à 390 et 1440 px de l’accueil et de l’expertise financière, rapports des vérifications.

La composition des maquettes est reprise avec les textes du brief. Les contenus plus longs augmentent la hauteur des sections. Le mobile emploie des marges de 20 px, une colonne, le texte avant la photo et un footer empilé lisible. Le menu est un panneau dans le flux, pas une modale ; le fond reste accessible, Échap ferme le panneau et rend le focus au bouton.

## Formulaire et configuration

Copier `.env.example` vers `.env.local` et renseigner les valeurs réelles. Sans les six paramètres d’envoi et de limitation, le bouton est désactivé, un avertissement est affiché et l’API répond 503. Aucun succès n’est simulé.

- `RESEND_API_KEY` : clé serveur du fournisseur d’e-mail Resend.
- `CONTACT_FROM` : expéditeur autorisé sur un domaine vérifié par le fournisseur.
- `CONTACT_TO` : destinataire validé par le cabinet.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` : stockage Redis partagé pour les compteurs antispam, sans mémoire locale de processus.
- `RATE_LIMIT_SALT` : secret aléatoire pour protéger les empreintes de limitation.
- `TRUSTED_IP_HEADER` : uniquement un header dont l’hébergeur garantit l’écrasement par son proxy ; à valider selon l’hébergement. Sans valeur, un compteur global conservateur s’applique.

La limite est de cinq demandes par dix minutes. Le compteur Redis est atomique et expire après dix minutes. Une panne du compteur empêche l’envoi. L’e-mail du visiteur est utilisé comme `reply_to`, jamais comme expéditeur. L’API vérifie l’origine, les tailles et champs, le champ piège, les requêtes et la confirmation de prise en charge du fournisseur. Elle ne conserve aucun message en base et ne journalise pas les données du formulaire. La prise en charge par Resend ne garantit pas l’arrivée dans la boîte finale.

L’envoi réel reste à tester avec les comptes et coordonnées du cabinet. Les cas de prise en charge, d’erreur et de limitation ont été vérifiés avec des services simulés, sans e-mail sortant. Confirmer les traitements et les textes de confidentialité avant activation.

Documentation technique utilisée : [Next.js](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Resend](https://resend.com/docs/api-reference/emails/send-email), [Upstash REST](https://upstash.com/docs/redis/features/restapi). Les guides embarqués de Next.js ont également été consultés.

## SEO

La prévisualisation est non indexable par défaut : `robots.txt` interdit l’indexation et le sitemap reste vide. Pour la publication, fournir un domaine HTTPS réel dans `NEXT_PUBLIC_SITE_URL` et mettre explicitement `NEXT_PUBLIC_ALLOW_INDEXING=true`, puis reconstruire le site. Le sitemap et les robots de production sont alors activés. Les canoniques et métadonnées sociales restent présents dans tous les environnements ; sans domaine configuré, leur origine est `http://localhost:3000`. L’image sociale dédiée est générée en 1200 × 630.

## Vérifications

```sh
npm run typecheck
npm run lint
npm run build
npm run verify:contact
# Serveur local actif sur le port 3000 et Microsoft Edge installé :
npm run verify:browser
```

Le script navigateur utilise Playwright et Edge installé localement, sans télécharger un navigateur. Il parcourt les neuf routes à 320, 390, 768 et 1440 px, contrôle les statuts, un H1 par page, l’absence de débordement horizontal, les liens locaux, les 404, le lien actif, le menu clavier, la fermeture après navigation, les erreurs JavaScript et le formulaire non configuré. Captures réalisées après chargement des images et polices. Le test contact vérifie les champs invalides, tailles, configuration absente, origine étrangère, champ piège, acceptation et échec fournisseur, limitation ; les services externes sont simulés.

Build, types et lint validés. Audit des dépendances de production : aucune vulnérabilité signalée. L’audit complet relève cinq entrées liées à une même vulnérabilité transitive de `braces` dans l’outillage ESLint, sans correctif disponible selon npm lors de l’installation ; à surveiller lors des mises à jour. Les textes secondaires et les boutons emploient les couleurs du kit avec un contraste AA pour les combinaisons principales. Une recette manuelle avec lecteur d’écran et le test de délivrabilité réelle restent à faire avant publication.

## Provenance et validations avant publication

Voir `ermita-advisory-kit-integration/ASSETS.md`. Les photographies sont des illustrations architecturales générées par IA, pas les locaux d’Ermita. Les PNG originaux restent dans le kit. Le logo utilisé est le PNG transparent fourni, sans reconstruction typographique ; le logo vectoriel définitif et le favicon proposé restent à valider. Inter et DM Serif Display proviennent du dépôt officiel Google Fonts ; leurs licences SIL OFL sont conservées dans `public/fonts/` et le kit.

Éléments restant à fournir ou valider :

- Prestations réelles et ensemble des textes par Ermita Advisory.
- Identité graphique finale, logo vectoriel et droits d’utilisation des illustrations.
- E-mail et téléphone publics, destinataire, expéditeur autorisé, comptes Resend/Redis et paramètres du proxy.
- Domaine, hébergement, informations juridiques complètes, textes légaux et traitements de données réels (base légale, conservation, droits, destinataires et transferts éventuels).
- Validation de l’envoi réel, de la délivrabilité et recette finale avant publication.

Aucune équipe, référence client, résultat ou coordonnée supplémentaire n’a été inventé. Les mentions légales et la confidentialité sont clairement signalées comme provisoires.

## Mise à jour typographique
Les titres utilisent désormais Poppins Regular, chargée localement via next/font/local. Le corps et l’interface conservent Inter. Poppins et sa licence SIL OFL ont été téléchargées depuis https://github.com/google/fonts/tree/main/ofl/poppins ; fichiers conservés dans public/fonts/. La police DM Serif Display d’origine reste disponible mais n’est plus chargée.


Le corps et l’interface utilisent désormais Space Grotesk variable (300–700), à la place d’Inter. Fichiers et licence SIL OFL issus du dépôt officiel https://github.com/google/fonts/tree/main/ofl/spacegrotesk et conservés dans public/fonts/. Poppins reste la police des titres. Inter d’origine est conservée mais n’est plus chargée.


La page d’index /expertises a été supprimée à la demande du commanditaire. Les liens Nos expertises pointent désormais vers /#expertises ; les quatre pages détaillées sont conservées.


## Corrections de l’audit
Voir [le rapport détaillé](verification/AUDIT.md) pour les tâches T-01 à T-18, les scores, les choix et les blocages. Configuration publique centralisée dans lib/site.ts. Les coordonnées de contact du footer restent masquées sans NEXT_PUBLIC_CONTACT_EMAIL et NEXT_PUBLIC_CONTACT_PHONE. La CSP est bloquante par défaut ; CSP_REPORT_ONLY=true sert au diagnostic. HSTS est réservé à une configuration de production HTTPS. Les polices du navigateur sont désormais en WOFF2.


