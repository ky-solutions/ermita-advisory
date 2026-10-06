# Brief d’intégration — Ermita Advisory

Version du 6 octobre 2026. Destinataire : agent de code chargé de l’intégration Next.js.

## 1. Mission et résultat attendu

Construire un site vitrine en français pour Ermita Advisory, cabinet dont l’activité déclarée est l’ingénierie financière et le conseil en management. Objectif : présenter le cabinet, expliquer ses expertises et générer des demandes de contact.

Livrer un projet Next.js maintenable, responsive et fidèle aux références visuelles jointes. Commencer par l’accueil desktop et mobile, puis décliner le modèle d’expertise et les autres pages. Le présent brief autorise la réalisation locale et les vérifications ; il ne demande pas de publication en production.

Les quatre pôles et les textes ci-dessous sont une proposition éditoriale validée comme base de conception par le commanditaire. Leur correspondance aux prestations réelles reste à confirmer par l’entreprise avant publication. Ne pas présenter cette validation de conception comme une confirmation du cabinet.

## 2. Dossier fourni et références visuelles

Le fichier `ermita-advisory-kit-integration.zip` contient ce brief et les quatre références. Extraire l’archive avant de commencer. Les chemins ci-dessous sont relatifs à la racine du dossier extrait ; ils ne dépendent pas de l’environnement de préparation.

| Référence | Chemin dans l’archive | Usage |
|---|---|---|
| Brief complet | brief-integration-ermita-advisory.md | Instructions et contenus |
| Logo corrigé | assets/logo/ermita-advisory-logo-corrige.png | Orthographe et identité |
| Accueil desktop | maquettes/accueil-desktop.png | Composition générale |
| Accueil mobile | maquettes/accueil-mobile.png | Adaptation en une colonne |
| Expertise desktop | maquettes/expertise-ingenierie-financiere-desktop.png | Modèle des quatre expertises |

Les fichiers des maquettes sont des références, pas des images à afficher comme pages du site. Le logo fourni reste un PNG raster ; l’archive contient désormais des photographies séparées et un logo PNG transparent ; elle ne contient pas de SVG final du logo. Utiliser les assets listés dans ASSETS.md et dans la section 5.

Ces maquettes sont des images de direction artistique, pas des spécifications pixel exactes ni des assets découpés. Les textes de ce brief priment sur les textes générés dans les images. Les règles de responsive et d’accessibilité priment sur les anomalies des maquettes : marges mobile trop grandes, footer trop compact, titre trop long sur une seule ligne, « Accueil » actif sur la page d’expertise.

Inspirations pour la structure, sans copier leurs contenus ou éléments de marque :
- Accuracy : https://www.accuracy.com/
- Eight Advisory : https://www.8advisory.com/
- Oderis : https://oderis.fr/
- Finexsi : https://finexsi.eu/

## 3. Périmètre et routes

| Route | Page | Objectif |
|---|---|---|
| / | Accueil | Promesse, cabinet, expertises, méthode, contact |
| /le-cabinet | Le cabinet | Présentation et approche |
| /expertises | Nos expertises | Vue d’ensemble des quatre pôles |
| /expertises/ingenierie-financiere | Expertise | Modèle détaillé |
| /expertises/pilotage-et-performance | Expertise | Même modèle, contenu spécifique |
| /expertises/strategie-et-management | Expertise | Même modèle, contenu spécifique |
| /expertises/accompagnement-de-projets | Expertise | Même modèle, contenu spécifique |
| /contact | Contact | Coordonnées et formulaire |
| /mentions-legales | Informations légales | Texte à compléter et valider |
| /confidentialite | Confidentialité | Texte adapté aux traitements réels, à valider |

Ajouter une page 404 utile avec retour à l’accueil. Pas de blog, espace client, base de données ou CMS dans cette première version. Centraliser les contenus pour permettre une évolution future.

## 4. Identité et système graphique

### Logo

Wordmark « ermita » en minuscules avec un vrai m à deux arches distinctes ; i séparé et point carré bleu. « ADVISORY » en petites capitales espacées dessous. Conserver la lisibilité avant tout.

Le PNG fourni est une proposition raster sur fond clair, pas un fichier vectoriel. Ne pas le présenter comme un SVG final et ne pas l’insérer avec ses grandes marges blanches. Utiliser assets/logo/ermita-advisory-logo-transparent.png pour l’intégration actuelle et prévoir un emplacement pour un SVG validé. Une version provisoire recadrée ou une reconstruction typographique clairement signalée dans le README est acceptable pour la prévisualisation. Ne pas modifier le fichier source fourni. Le favicon peut reprendre un e et un carré bleu, sous réserve de validation graphique.

### Tokens proposés

| Token | Valeur |
|---|---|
| Fond principal | #F7F6F2 |
| Texte principal / sections sombres | #24242B |
| Accent bleu | #385CDB |
| Texte secondaire | #55565F |
| Bordures | #D5D4CF |
| Blanc | #FFFFFF |

Vérifier le contraste des combinaisons réellement employées ; ajuster les nuances de boutons si nécessaire. Éviter les gradients, ombres fortes, gros arrondis et icônes décoratives génériques.

Polices fournies localement avec leurs licences OFL dans assets/fonts/ ; les charger avec next/font/local. DMSerifDisplay-Regular.ttf : poids 400 ; Inter-Variable.ttf : poids 100–900. Elles ne sont pas identifiées comme celles des images : **DM Serif Display** pour les titres et **Inter** pour le corps/UI. Vérifier les accents français et leur rendu ; conserver les licences avec les assets locaux. Si les polices sont indisponibles, employer des fallbacks explicites, sans bloquer le build par un téléchargement réseau obligatoire. Le logo reste un asset indépendant de la police des titres.

### Dimensions de départ

- Conteneur desktop : maximum 1280 px, centré ; à 1440 px, marges latérales de 80 px.
- Tablette : marges 32 px ; mobile : 20–24 px.
- Corps : 16–18 px ; interligne 1.5–1.65.
- H1 desktop : environ 64–72 px ; mobile : 36–42 px, ajusté au contenu.
- H2 desktop : 42–52 px ; mobile : 28–34 px.
- Espacements de section : 80–112 px desktop, 48–64 px mobile.
- Boutons : hauteur d’au moins 48 px ; focus visible ; rayons faibles, 0–4 px.
- Petites étiquettes en capitales espacées, sans réduire les contenus utiles à une taille illisible.

Ce sont des valeurs de départ pour retrouver le rythme de la maquette ; ajuster après comparaison visuelle.

## 5. Assets photographiques

Direction : photographie éditoriale d’architecture parisienne, pierre claire, lignes structurées, lumière naturelle. Accueil : façade ; expertise : escalier ou détail architectural.

Ces visuels illustrent l’ambiance et ne représentent pas les bureaux d’Ermita. Ne pas les légender comme tels. Les images contenues dans les captures ne sont pas des fichiers photographiques prêts à intégrer. Utiliser des photos séparées fournies par le commanditaire ou obtenues avec une licence adaptée, en documentant leur provenance. Les assets disponibles sont assets/images/hero-facade.webp et assets/images/expertise-escalier.webp (originaux PNG également inclus). Ils ont été générés pour ce projet et sont des illustrations : ils ne reproduisent pas exactement les photos des maquettes. Ne pas dépendre d’un hotlink externe.

Prévoir des recadrages adaptés au desktop et au mobile. Renseigner les dimensions, éviter les décalages de mise en page, charger paresseusement les images sous la ligne de flottaison. Employer un alt descriptif si l’image apporte du sens, ou alt vide si purement décorative.

## 6. Stack et organisation

- Next.js, TypeScript, App Router, Tailwind CSS ; utiliser des versions stables compatibles, vérifier la documentation officielle au moment de l’implémentation et verrouiller les dépendances.
- Si un dépôt existe, lire ses instructions et respecter sa configuration. Ne pas remplacer arbitrairement son gestionnaire de paquets.
- Server Components par défaut ; Client Components seulement pour le menu, le formulaire et les interactions qui le nécessitent.
- Pas de backend séparé. Le traitement de contact peut utiliser une Server Action ou un Route Handler selon l’architecture choisie.
- Contenus typés centralisés dans un module ; aucune duplication des quatre pages d’expertise.
- Aucun secret dans le navigateur ou le dépôt.

Organisation indicative : app/(routes), components/layout, components/ui, components/sections, content, lib, public/brand, public/images. Pour les expertises, utiliser une route dynamique [slug] avec une liste fermée des quatre slugs ; retourner une 404 pour un slug inconnu.

Composants attendus : Header, MobileNavigation, Footer, BrandLogo, Container, ButtonLink, SectionLabel, ExpertiseCard, ExpertisePage, ProcessSection, ContactBanner, ContactForm et Breadcrumbs.

## 7. Navigation et comportements

- Menu : Accueil, Le cabinet, Nos expertises ; CTA « Parlons de votre projet » vers /contact.
- Lien actif correct, y compris « Nos expertises » pour ses sous-pages.
- Logo vers /. Liens d’expertise vers les routes correspondantes. Pas de href="#" de substitution.
- Menu mobile : bouton nommé, aria-expanded, ouverture/fermeture, fermeture après navigation et via Échap. Si présenté comme une modale, gérer le focus, sa restitution et le défilement de fond.
- Fil d’Ariane sur pages d’expertise.
- Animations légères facultatives ; respecter prefers-reduced-motion. Aucun contenu ne doit dépendre d’une animation pour être visible.
- Mobile : une colonne, hero texte avant photo, expertises en liste, méthode empilée, footer empilé et lisible. Pas de grille desktop simplement rétrécie.

## 8. Contenus à intégrer

### Accueil

**Étiquette :** Ingénierie financière & conseil en management.

**H1 :** Éclairer vos décisions financières. Structurer votre développement.

**Introduction :** Ermita Advisory accompagne les entreprises dans leurs enjeux financiers, organisationnels et stratégiques. Nous vous aidons à comprendre votre situation, à évaluer vos options et à construire un plan d’action adapté à vos objectifs.

**CTA :** Parlons de votre projet. **Second lien :** Découvrir nos expertises.

**Section cabinet — H2 :** Donner une direction claire à vos ambitions.

Une décision de financement, un projet de développement ou une évolution de votre organisation exige une vision claire des enjeux. Notre démarche associe analyse financière et compréhension de votre fonctionnement pour vous aider à décider et à agir. Nous construisons avec vous des recommandations adaptées à vos ressources, à vos contraintes et à vos priorités.

**Lien :** Découvrir le cabinet.

**Section expertises — H2 :** Quatre expertises au service de vos décisions.

1. **Ingénierie financière** — Évaluez la viabilité de vos projets et préparez vos décisions de financement grâce à des analyses, des prévisions et des modèles financiers structurés.
2. **Pilotage et performance** — Disposez d’une vision claire de vos résultats, de votre trésorerie et de vos priorités grâce à des outils de suivi adaptés à votre entreprise.
3. **Stratégie et management** — Clarifiez vos orientations, identifiez vos axes de développement et faites évoluer votre organisation pour soutenir vos ambitions.
4. **Accompagnement de projets** — Transformez une idée en projet structuré, depuis l’étude de faisabilité jusqu’au suivi de sa mise en œuvre.

**Section méthode — H2 :** Comprendre. Structurer. Accompagner.

- **Comprendre votre situation :** Nous échangeons sur vos objectifs, analysons les informations disponibles et identifions les questions à traiter en priorité.
- **Structurer vos décisions :** Nous confrontons les options, explicitons les hypothèses et formulons des recommandations accompagnées d’un plan d’action.
- **Accompagner la mise en œuvre :** Selon le périmètre de la mission, nous vous aidons à déployer les actions retenues et à suivre leur progression.

**Bannière finale — H2 :** Construisons votre prochaine étape.

Présentez-nous votre situation. Un premier échange permettra de préciser vos besoins et d’identifier l’accompagnement approprié.

**CTA :** Échanger avec Ermita Advisory.

### Le cabinet

**H1 :** Le conseil au plus près de vos enjeux.

Ermita Advisory est un cabinet établi à Paris, spécialisé dans l’ingénierie financière et le conseil en management. Notre vocation est d’aider les entreprises à prendre des décisions éclairées et à structurer leur développement. Nous abordons chaque mission en tenant compte de ses dimensions financières, organisationnelles et opérationnelles.

**H2 :** Notre approche.

- **Partir de votre réalité :** Vos objectifs, vos ressources et vos contraintes constituent le point de départ de notre travail.
- **Rendre les analyses compréhensibles :** Nous explicitons les hypothèses, les options et leurs implications pour faciliter la décision.
- **Relier les recommandations à l’action :** Nous traduisons les conclusions de nos travaux en priorités et en étapes de mise en œuvre.

Prévoir une section équipe seulement si des portraits et biographies validés sont fournis. Sans ces données, la masquer ; ne pas générer de faux collaborateurs. **CTA :** Rencontrons-nous.

### Index des expertises

**H1 :** Des analyses utiles. Des décisions éclairées. Des actions structurées.

Nos quatre pôles d’expertise répondent à des besoins complémentaires : préparer une décision financière, mieux piloter l’activité, faire évoluer l’organisation et mener un projet.

Reprendre les quatre descriptions de l’accueil. **CTA :** Discuter de votre besoin.

### Modèle des pages d’expertise

Structure : fil d’Ariane ; hero avec titre, introduction, photographie et CTA ; accompagnement ; livrables possibles ; démarche ; trois autres expertises ; bannière contact. Les livrables sont indicatifs et dépendent du périmètre convenu.

#### Ingénierie financière

**H1 :** Construire une vision financière de vos projets.

Avant d’engager des ressources ou de solliciter un financement, il est essentiel d’évaluer les besoins, les hypothèses et les risques. Nous vous aidons à traduire votre projet en données financières compréhensibles pour comparer les scénarios et préparer vos échanges avec vos interlocuteurs.

**Accompagnement :** Élaboration de business plans et de prévisions financières ; construction de modèles financiers ; analyse de rentabilité et comparaison de scénarios ; évaluation des besoins de financement ; préparation des éléments financiers d’un dossier de financement.

**Livrables :** Modèle financier ; prévisions de trésorerie ; analyse de scénarios ; synthèse des hypothèses et points de vigilance.

**Démarche :** Comprendre votre projet ; construire les scénarios ; préparer la décision.

**CTA :** Préparer votre projet financier.

#### Pilotage et performance

**H1 :** Transformer vos données en outils de décision.

Le suivi de votre entreprise doit vous permettre de comprendre les résultats, d’anticiper les tensions et de définir les actions prioritaires. Nous vous accompagnons dans la structuration d’outils de pilotage adaptés à votre activité et aux besoins de votre direction.

**Accompagnement :** Définition des indicateurs de performance ; élaboration de budgets et suivi des écarts ; construction de tableaux de bord ; prévisions et suivi de trésorerie ; amélioration des processus de reporting financier.

**Livrables :** Tableau de bord ; budget prévisionnel ; outil de suivi de trésorerie ; recommandations pour organiser le pilotage.

**Démarche :** Analyser les données disponibles ; définir les indicateurs ; organiser le suivi.

**CTA :** Faire évoluer votre pilotage.

#### Stratégie et management

**H1 :** Aligner votre organisation sur vos ambitions.

Une orientation stratégique prend tout son sens lorsqu’elle se traduit en priorités claires et en responsabilités définies. Nous vous aidons à examiner votre fonctionnement, à préciser vos choix de développement et à préparer les évolutions nécessaires.

**Accompagnement :** Diagnostic organisationnel ; clarification des objectifs et des priorités ; élaboration de plans de développement ; structuration des rôles et des processus ; accompagnement du changement.

**Livrables :** Diagnostic ; feuille de route ; plan d’action priorisé ; propositions d’évolution de l’organisation.

**Démarche :** Examiner le fonctionnement ; définir les priorités ; accompagner les évolutions.

**CTA :** Structurer votre prochaine étape.

#### Accompagnement de projets

**H1 :** Donner à votre projet un cadre pour avancer.

Un projet exige une définition précise de ses objectifs, de ses moyens et de ses étapes. Nous vous accompagnons pour examiner sa faisabilité, organiser sa préparation et mettre en place les outils nécessaires à son suivi.

**Accompagnement :** Études de faisabilité ; définition du périmètre et des objectifs ; estimation des ressources et du budget ; préparation de dossiers de présentation ; planification et suivi de la mise en œuvre.

**Livrables :** Étude de faisabilité ; budget ; calendrier ; répartition des responsabilités ; outil de suivi.

**Démarche :** Préciser le projet ; préparer son exécution ; suivre sa progression.

**CTA :** Construire votre feuille de route.

### Contact

**H1 :** Parlons de vos enjeux.

Vous souhaitez préparer une décision financière, améliorer votre pilotage ou structurer un projet ? Présentez-nous votre besoin et les objectifs que vous souhaitez atteindre.

Champs : nom et prénom (requis), e-mail professionnel (requis), entreprise (facultatif), téléphone (facultatif), expertise concernée (facultatif, quatre pôles + Autre demande), message (requis).

Placeholder du message : « Décrivez votre situation, votre objectif et, si vous en avez une, votre échéance. » Labels visibles indépendamment des placeholders.

**Bouton :** Envoyer ma demande.

**Succès :** Votre message a bien été envoyé. Merci d’avoir contacté Ermita Advisory.

**Erreur :** Votre message n’a pas pu être envoyé. Veuillez réessayer dans quelques instants.

Coordonnées connues : Ermita Advisory, 95 boulevard Berthier, 75017 Paris, France. E-mail, téléphone et destinataire du formulaire : à fournir. Ne pas inventer une adresse e-mail à partir du nom de l’entreprise.

### Footer

Logo ; « Ingénierie financière & conseil en management. » ; navigation ; adresse ; © année courante Ermita Advisory. Tous droits réservés ; liens Mentions légales et Politique de confidentialité.

## 9. Formulaire : implémentation et état de configuration

- Validation côté serveur, avec validation client pour le confort. Bornes de longueur raisonnables ; erreurs liées aux champs ; confirmation annoncée aux technologies d’assistance.
- État envoi en cours et protection contre les doubles soumissions.
- Protection antispam sobre : champ piège et limitation des requêtes adaptée à l’hébergement ; ne pas se reposer sur une mémoire locale de processus en environnement distribué.
- Destinataire, fournisseur d’e-mail et secrets via variables d’environnement. Configurer un expéditeur autorisé ; utiliser l’e-mail du visiteur en reply-to, pas comme expéditeur.
- Réponse de succès uniquement après confirmation de prise en charge par le service d’envoi. Ne pas simuler une soumission réussie.
- Sans configuration d’e-mail : avertissement explicite dans l’environnement de prévisualisation, bouton d’envoi désactivé ou erreur claire ; documenter ce blocage avant lancement.
- Aucune conservation en base demandée. Éviter de journaliser les messages et données personnelles. Définir avec le cabinet le traitement réel et le texte d’information associé.

## 10. SEO, accessibilité et performances

- Langue fr, titres et descriptions propres à chaque route, un H1 par page, niveaux de titres cohérents, liens descriptifs.
- Exemple accueil : titre « Ermita Advisory | Ingénierie financière & conseil en management » ; description « Découvrez Ermita Advisory : ingénierie financière, pilotage de la performance, stratégie et accompagnement de projets. »
- URL canonique, sitemap et robots à configurer à partir du domaine réel. Prévisualisation non indexable ; configuration explicite pour la production.
- Métadonnées sociales avec image adaptée. Données structurées éventuelles limitées aux informations confirmées ; aucun avis, note ou résultat inventé.
- Navigation clavier, lien d’évitement, focus visible, formulaires accessibles, contrastes vérifiés. Ne pas désactiver le zoom.
- Images optimisées, polices maîtrisées, peu de JavaScript client et aucune bibliothèque d’animation lourde pour de simples apparitions.
- Pas de traceurs ajoutés par défaut. Les pages légales doivent correspondre aux services effectivement intégrés ; leur texte définitif reste à fournir/valider.

## 11. Ordre d’exécution demandé à l’agent

1. Inspecter le dépôt, ses instructions, les assets et les maquettes ; établir les dépendances manquantes.
2. Mettre en place tokens, polices, composants de base, header et footer.
3. Intégrer l’accueil desktop et mobile avec les textes de ce brief.
4. Fournir des captures à 1440 px et 390 px et corriger les écarts visibles avant la déclinaison générale.
5. Construire le modèle d’expertise et alimenter les quatre routes.
6. Réaliser les pages cabinet, index d’expertises, contact, 404 et emplacements des pages légales.
7. Configurer le traitement du formulaire si ses paramètres sont disponibles ; sinon documenter son état incomplet sans faux succès.
8. Vérifier build, types, lint selon les commandes du projet et les parcours pertinents.
9. Livrer les sources, captures, README et liste des éléments à confirmer. Ne pas déployer automatiquement.

## 12. Critères de réception

- Toutes les routes prévues répondent ; slug inconnu et route inconnue donnent une 404.
- Logo lisible « ermita » ; absence de textes erronés issus des captures.
- Comparaison visuelle de l’accueil et de l’expertise aux références, avec ajustements mobile justifiés.
- Vérifications à 390, 768 et 1440 px, plus contrôle à 320 px : aucun débordement horizontal, texte coupé ou footer minuscule.
- Menu mobile utilisable au clavier ; focus et lien actif corrects.
- Tous les liens et CTA fonctionnent ; aucun faux lien de remplacement.
- Formulaire vérifié : champs invalides, envoi réussi avec service configuré, échec fournisseur et configuration absente.
- Pas de biographies, références clients, témoignages, chiffres, agréments ou coordonnées inventés.
- Pas d’erreurs de compilation ni d’hydratation ; tests ciblés sur navigation/formulaire si pertinents, sans imposer des tests qui recopient simplement la mise en page.
- README : installation, commandes, variables d’environnement sans secrets, état du formulaire, provenance des assets et limites connues.

## 13. Éléments restant à obtenir avant publication

Prestations confirmées par Ermita ; logo vectoriel final ; photographies utilisables et leurs droits ; portraits/biographies si souhaités ; e-mail et téléphone publics ; destinataire et configuration d’envoi ; domaine et hébergement ; informations et textes légaux adaptés au site ; validation finale des contenus.

Les informations juridiques issues des recherches (SIREN 979 873 437, SAS, siège parisien) servent de contexte. Les vérifier avec les documents à jour fournis par l’entreprise pour les mentions légales. Ne pas intégrer automatiquement des noms de dirigeants issus d’annuaires contradictoires.

## 14. Assets prêts à intégrer dans l’archive

- assets/logo/ermita-advisory-logo-transparent.png : logo PNG avec transparence réelle.
- assets/logo/ermita-advisory-logo-corrige.png : référence initiale sur fond clair.
- assets/images/hero-facade.webp : visuel d’accueil, original PNG inclus.
- assets/images/expertise-escalier.webp : visuel d’expertise, original PNG inclus.
- assets/fonts/ : DM Serif Display et Inter en TTF, licences OFL incluses.
- assets/brand/favicon.svg : favicon vectoriel proposé.
- assets/icons/ : arrow-right.svg, arrow-up-right.svg, menu.svg, close.svg.
- design-tokens.css : couleurs et dimensions de départ.
- ASSETS.md : provenance et instructions d’utilisation.

Copier les assets utiles dans public/ et conserver les licences. Utiliser les fichiers WebP pour le site. Les images générées sont des illustrations d’ambiance, pas des photographies des locaux réels. Le logo reste raster ; la vectorisation définitive est un travail distinct. Ces assets permettent l’intégration sans téléchargement de photo ou police à l’exécution.
