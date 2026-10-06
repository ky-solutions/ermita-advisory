# Corrections de l’audit Ermita Advisory

Recette locale du 6 octobre 2026 sur le build de production Next.js 16.3.8. Aucun déploiement réalisé. Les textes métier et la mise en page sont conservés.

## Tâches et fichiers

| Tâche | Résultat | Fichiers principaux |
|---|---|---|
| T-01 | Indexation centralisée ; neuf URL générées depuis les slugs existants ; blocage conservé par défaut. | `lib/site.ts`, `lib/seo.ts`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `.env.example` |
| T-02 | Voile local derrière la légende ; contraste minimal mesuré sur la zone photographique sous le texte : **10,32:1**. | `app/globals.css` |
| T-03, T-04 | Titres sociaux identiques aux titres HTML, descriptions, URL, locale, site, type, Twitter et canoniques absolus uniques sur les neuf pages. Image PNG 1200 × 630, réponse 200. | `lib/seo.ts`, `app/opengraph-image.tsx`, métadonnées des `page.tsx` |
| T-05 | JSON-LD ProfessionalService, Service et BreadcrumbList ; données confirmées uniquement, liens vers le vrai logo raster. | `components/structured-data.tsx`, `app/layout.tsx`, `app/expertises/[slug]/page.tsx` |
| T-06 | ICO 32 × 32, SVG et Apple PNG opaque 180 × 180 générés depuis le SVG fourni ; déclaration manuelle supprimée. | `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`, `scripts/build-brand-assets.cjs` |
| T-07 | Titre « Page introuvable », noindex et liens accueil/contact ; route et slug inconnus vérifiés en 404. | `app/not-found.tsx` |
| T-08 | Description de l’accueil avec Paris et descriptions uniques. Proposition éditoriale à confirmer par le cabinet. | `lib/site.ts`, `app/page.tsx` |
| T-09 | Nom accessible de chaque carte limité au titre, numéro décoratif masqué, carte intégralement cliquable et focus sur toute sa surface. | `components/sections.tsx` |
| T-10 | Icônes utilisées décoratives masquées ; aucun SVG décoratif non nommé dans les pages. Les SVG du kit sont des fichiers externes non insérés dans le DOM. | `components/ui.tsx`, `components/header.tsx` |
| T-11 | Sections avec H1/H2 reliées à leurs titres via aria-labelledby ; section des liens associés nommée. | `components/sections.tsx`, pages accueil/cabinet/contact/expertise/légales/404 |
| T-12 | Liens du footer de hauteur minimale 24 px ; liens du fil d’Ariane et des textes légaux également ajustés. | `app/globals.css` |
| T-13 | Nosniff, politique de référent, permissions, protection des frames, CSP bloquante et suppression X-Powered-By. HSTS activé seulement pour une configuration de production HTTPS. | `next.config.ts`, `.env.example` |
| T-14 | WOFF2 local, display swap et fallback ajusté par next/font ; réduction de **67,9 %** pour Poppins et **63,9 %** pour Space Grotesk. Aucun sous-ensemble ni perte de glyphes. | `app/layout.tsx`, `public/fonts/*.woff2`, `scripts/prepare-fonts.py` |
| T-15 | Ratio réel corrigé (2079 × 756), tailles responsive et source suffisante pour les écrans 2× ; alt vide dans le lien nommé. SVG final manquant. | `components/ui.tsx` |
| T-16 | Emplacements mailto/tel préparés et masqués lorsque les variables publiques sont vides. | `lib/site.ts`, `components/sections.tsx`, `.env.example` |
| T-17 | Erreurs liées aux champs, focus après validation client et serveur, état occupé, doubles envois bloqués, annonce globale et rejet silencieux du champ piège sans succès simulé. | `components/contact-form.tsx`, `app/api/contact/route.ts`, `scripts/verify-contact.cjs` |
| T-18 | Mobile 360 × 800 et 390 × 844, focus initial dans le menu, Échap, restitution du focus, confinement clavier, fond inert et verrouillage du défilement ; fermeture à la navigation et au passage desktop. | `components/header.tsx`, scripts de vérification |

## Contrôles finaux

- `npm run build`, `npm run typecheck` et `npm run lint` : passent. Next.js 16 ne fournit plus `next lint` ; ESLint est lancé directement par la commande du projet.
- Lighthouse mobile sur build local avec indexation activée et CSP bloquante : **Accessibilité 100, SEO 100, Bonnes pratiques 100, Performance 83**. Mesures locales, sensibles à la charge de la machine. Rapports `lighthouse-mobile.json` et `.html` conservés.
- Axe : **zéro violation**, toutes sévérités, sur les neuf pages et sur le menu mobile ouvert. Résultats dans `audit-results.json`.
- Aucune erreur JavaScript/CSP pendant les parcours. CSP testée d’abord en report-only, puis bloquante. Le formulaire appelle une API de même origine ; les fournisseurs e-mail et Redis sont appelés côté serveur et ne requièrent aucune permission navigateur supplémentaire.
- En-têtes HTTP vérifiés sur les neuf pages, sans X-Powered-By. HSTS absent sur HTTP local ; condition HTTPS vérifiée sur la configuration. Vérification sur l’hébergement réel à refaire avant publication.
- Robots/sitemap testés en mode indexable : autorisation et neuf URL absolues. Retour au mode de prévisualisation bloqué après la recette : noindex, Disallow et sitemap vide.
- Favicon ICO, SVG, Apple PNG et image sociale : réponses 200, dimensions contrôlées. Métadonnées de partage simulées localement sur toutes les pages ; image vérifiée visuellement dans `og-default.png`.
- Clavier : lien d’évitement, menu, focus des cartes et formulaire. Mobile : pas de débordement à 360/390/768/1440 px et maintien du contrôle historique à 320 px.
- Formulaire : validation locale/serveur, focus de la première erreur, erreurs associées, annonce de l’échec et prévention des doubles soumissions vérifiés. Fournisseurs simulés, aucun e-mail réel envoyé.
- Contraste de la légende vérifié à partir des pixels de la photo et du voile sous le texte, avec le texte masqué pour ne pas fausser le calcul ; test plus conservateur qu’une mesure sur un seul point. Détails dans `audit-details.json`.

## Blocages et validations avant publication

- **T-15 : logo vectoriel final** à fournir. Le PNG haute résolution du kit reste utilisé.
- **T-16 : e-mail et téléphone publics** confirmés à fournir (`NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE`). Les blocs restent absents tant que les valeurs sont vides.
- **Domaine réel** à fournir dans `NEXT_PUBLIC_SITE_URL`, puis activer explicitement `NEXT_PUBLIC_ALLOW_INDEXING=true` et reconstruire. Un flag d’indexation sans URL configurée provoque une erreur pour éviter une publication avec un domaine inventé.
- **Envoi réel** : destinataire, expéditeur autorisé et comptes Resend/Redis restent à configurer. L’envoi est désactivé dans la prévisualisation.
- **T-08 et contenus métier/légaux** : validation du client requise. Les pages légales présentes avant cet audit comprennent des mentions d’immatriculation, capital, hébergement et conservation qui ne sont pas corroborées par le kit ; ne pas les considérer comme validées pour publication. Leur contenu n’a pas été réécrit dans cette correction technique.
- **Services externes de validation** : Google Rich Results Test, schema.org Validator, opengraph.xyz et LinkedIn Post Inspector ne peuvent pas inspecter une URL localhost privée. Les balises et structures ont été contrôlées localement, mais aucun résultat de ces services externes n’est revendiqué. À compléter sur une URL de recette accessible ou en soumettant le code aux validateurs, avant publication.

## Choix et écarts justifiés

- La page d’index `/expertises` reste supprimée conformément à la demande précédente. Le sitemap contient neuf pages et le fil d’Ariane renvoie à `/#expertises`.
- Nom accessible des cartes : option minimale aria-labelledby, qui conserve strictement leur composition visuelle.
- Deux teintes des petits numéros ont été ajustées pour corriger les contrastes révélés par Axe (gris sur ivoire, bleu clair sur fond sombre). C’est le seul ajustement visuel supplémentaire au voile T-02 ; indispensable pour atteindre zéro violation sérieuse sans changer la mise en page.
- Police WOFF2 : compression complète plutôt qu’un sous-ensemble, pour préserver tous les glyphes du fichier source. Les accents, œ, apostrophe et euro restent présents. La flèche ⟶ n’existait pas dans les fichiers source : le fallback système existant continue de la rendre ; aucune flèche n’a été supprimée. Une instance statique TTF de Space Grotesk est réservée à ImageResponse, qui ne rendait pas correctement la variable ; elle n’est pas préchargée par le navigateur.
- Le logo n’est pas reconstruit en SVG ; le fichier réel est déjà en haute résolution et son ratio est respecté.
- JSON-LD : aucune zone desservie, aucun avis et aucune coordonnée non confirmée ajoutés. Le logo est référencé par son chemin PNG réel.
- CSP conserve unsafe-inline pour les scripts/styles Next statiques, selon le niveau demandé dans l’audit. Un durcissement par nonce impliquerait une architecture dynamique supplémentaire et n’a pas été ajouté.
- Le répertoire n’avait pas de Git. Un commit de référence a été créé avant les corrections, suivi de groupes cohérents avec messages français. Aucune connexion à un dépôt distant ni publication.

## Reproduire la recette

Les scripts utilisent Edge installé localement. Pour le mode indexable de test, dans PowerShell :

```powershell
$env:NEXT_PUBLIC_SITE_URL='http://127.0.0.1:3000'
$env:NEXT_PUBLIC_ALLOW_INDEXING='true'
npm run build
npm start
# Dans un autre terminal :
npm run verify:audit
npm run verify:audit-details
npm run audit:lighthouse
```

Pour revenir au mode de prévisualisation, arrêter le serveur, retirer les variables de test, reconstruire et relancer. Le script d’audit peut aussi vérifier ce mode avec `AUDIT_INDEXABLE=false` et `AUDIT_SITE_URL=http://localhost:3000`.
