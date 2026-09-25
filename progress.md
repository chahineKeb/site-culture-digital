# Progression : République du Feed

Dernière mise à jour : 25 septembre 2026

## Où on en est

- **Site en ligne** : https://site-culture-digital.vercel.app (Vercel, déploiement automatique à chaque push sur `main`)
- **Repo** : git@github.com:chahineKeb/site-culture-digital.git
- **Newsletter à envoyer** : `email-corrige.html` (à la racine, hors repo). Version du groupe, corrigée, avec le lien vers le site et la date du 25 septembre 2026.
- **Copie en ligne de la newsletter** : `public/convocation-2017-btp-01.html` (lien depuis la page À propos)

## Contenu du site

| Page | Adresse | État |
|---|---|---|
| Accueil | `/` | Fait : photo pièce à conviction, étagère des dossiers, méthode en bref |
| Nos histoires | `/histoires/` | Fait : chemises cartonnées cliquables, chemise vide « prochain dossier » |
| Dossier 2017-BTP-01 | `/dossiers/balance-ton-porc/` | Fait : 9 feuilles A4, version du groupe |
| La méthode | `/methode/` | Fait |
| À propos | `/a-propos/` | Fait : travail de groupe, sans nom ni studio |
| 404 | toute adresse inconnue | Fait : « Cette feuille n'est pas dans le dossier » |

## Fonctionnement du dossier

- Chemise qui s'ouvre au clic, puis lecture feuille par feuille (boutons, flèches du clavier, glissement sur mobile)
- Sommaire d'intercalaires collé en bas, registre des garanties en marge (ordinateur) ou en tête (mobile)
- Bulletin de vote cliquable, le verdict (feuille 7) rappelle la lettre cochée
- Renvois [n] qui ouvrent la bonne source dans l'annexe

## Décisions prises

- Direction artistique : convocation officielle, feuilles A4, chemise bleu-gris, un seul rouge (tampon). Détail dans `CLAUDE.md`
- Deux polices seulement : Helvetica/Arial et Courier
- Logo : tampon « RF » (`app/icon.svg` et composant `Logo`)
- Le site garde le registre des garanties, absent de la newsletter du groupe (à retirer si le groupe le demande)
- Accessibilité : contrastes AA vérifiés, lien d'évitement, focus géré, lecture possible sans JavaScript
- Aucune mention de Claude dans les commits

## À faire

- [ ] Recevoir les sujets des prochaines histoires et monter un dossier par sujet (marche à suivre dans `CLAUDE.md`, section « Ajouter un dossier »)
- [ ] Trouver la source du chiffre « +200 000 mentions en trois jours, selon Le Monde » (pièce 2), absente du bordereau
- [ ] Trouver l'URL de l'article Télépro (source [9]), cité sans lien
- [ ] Changer la date d'envoi de la newsletter si elle part un autre jour (commentaire `DATE D'ENVOI` dans `email-corrige.html`, puis recopier dans `public/`)
- [ ] Tester sur un vrai téléphone et dans de vraies messageries (Gmail, Outlook, Apple Mail) : les vérifications ont été faites en captures Chrome à 375 px
- [ ] Sous-domaine d'ananas-frais.fr : pas encore branché, le site tourne sur l'adresse Vercel

## Fichiers hors repo

- `email.html` : ancienne version de la newsletter (avant les modifications du groupe)
- `email-corrige.html` : newsletter à envoyer
