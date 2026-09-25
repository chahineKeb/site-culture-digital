@AGENTS.md

# République du Feed

Site de petites enquêtes : des affaires jugées sur les réseaux, rouvertes comme de vrais dossiers judiciaires, pièce par pièce, avec leurs sources. Premier dossier (toujours en tête de liste) : la cancel culture et la liberté d'expression (#BalanceTonPorc, #BalanceTonFrère). Hébergé en sous-domaine d'ananas-frais.fr.

Thèse qui tient tout le site : la cancel culture est un usage de la liberté d'expression, mais elle emprunte les codes de la justice (procès, jury, verdict) sans en avoir les garanties (preuve, défense, présomption d'innocence, appel).

## Commandes

- `npm run dev` : serveur de dev
- `npm run build` : export statique dans `out/` (à déposer tel quel sur l'hébergement)
- `npm run lint`

Next.js 16 (App Router), export statique (`output: "export"`, `trailingSlash: true`). Pas de serveur, pas de base de données : rien qui dépende d'une requête (cookies, headers, route handlers dynamiques).

## Structure

- `lib/dossiers.ts` : le rôle des affaires. Ordre = ordre d'affichage, le premier est le dossier en tête.
- `lib/garanties.ts` : les 4 garanties du registre.
- `app/components/papier.tsx` : composants serveur (Entete, Piece, Onglet, Tampon, NoteDuGreffier, Ref, Registre, Tweet, FeuilleVolante, Bordereau).
- `app/components/liasse.tsx` : lecture feuille par feuille (pile, page tournée, sommaire d'intercalaires, clavier, glissement, ancres).
- `app/components/audience.tsx` : bulletin de vote, rappel du vote au verdict, registre de suivi en marge.
- `app/components/chemise.tsx` : chemise cartonnée cliquable qui s'ouvre avant la navigation.
- `app/dossiers/<slug>/page.tsx` : un dossier = une page écrite à la main.
- `public/convocation-2017-btp-01.html` : la version email d'origine (tables, CSS inline). Ne pas la « moderniser ».

## Ajouter un dossier

1. Ajouter l'entrée dans `lib/dossiers.ts` avec `statut: "en-instruction"` tant que les sources ne sont pas vérifiées.
2. Créer `app/dossiers/<slug>/page.tsx` en copiant la structure du premier dossier : une `FeuilleVolante` par pièce dans une `Liasse`, un `SOMMAIRE` aligné sur les feuilles, un bordereau des sources en dernière feuille.
3. Chaque fait renvoie à une source avec `<Ref n={…} />`. Pas de source, pas de fait. Les cas inventés pour illustrer un mécanisme passent par `NoteDuGreffier` et sont annoncés comme fictifs.
4. Passer en `statut: "instruit"` quand tout est sourcé.

## Direction artistique (ne pas dériver)

Une vraie convocation administrative et un vrai dossier papier, pas une newsletter stylée.

- Fond : chemise bleu-gris `--chemise`. Feuilles A4 (ratio 210/297) blanches ou coquille d'œuf, perforations à gauche, folio en bas.
- Deux typos seulement : Helvetica/Arial (titres en gras, texte) et Courier (mentions de greffe : en-têtes, folios, notes du greffier, renvois). Pas de serif, pas de troisième police, pas de webfont.
- Un seul rouge, `--rouge` (#B0121A), celui du tampon. Jamais en fond, sauf la feuille du verdict.
- Intercalaires pastel (bleu, jaune, vert, rose) : ils indiquent l'étape de la procédure, ils ne décorent pas.
- Mouvement : seulement le coup de tampon au chargement, et ce que le lecteur déclenche (ouvrir une chemise, tourner une page). Pas d'apparition au scroll, pas d'effet au survol de chaque carte. Toujours respecter `prefers-reduced-motion`.
- Photos : Unsplash, en noir et blanc, présentées comme des pièces à conviction, créditées (légende + page À propos).

## Écriture : pas de texte générique

- Français, phrases courtes, voix active, casse normale. Pas de tiret cadratin (—).
- Interdits : « plongez », « découvrez », « au cœur de », « n'hésitez pas », « incontournable », « véritable », « en somme », les triplets d'adjectifs, les phrases qui vendent au lieu de dire.
- Pas de labels en capitales espacées au-dessus des titres, pas de chaînes « A · B · C », pas de flèche ajoutée aux boutons.
- Un bouton dit ce qu'il fait : « Ouvrir le dossier », « Feuille suivante ».
- Ne jamais inventer un fait, un chiffre, une citation ou une URL. Si une source manque, le dire.

## Git

- Messages de commit en français, courts, au présent.
- Ne jamais ajouter de ligne `Co-Authored-By` ni de mention de Claude dans les commits ou les PR.
