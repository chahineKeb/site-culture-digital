# République du Feed

Des affaires jugées en ligne, rouvertes pièce par pièce.

Petites enquêtes de culture digitale présentées comme de vrais dossiers : chemises cartonnées, feuilles A4 qu'on feuillette, registre des garanties d'un procès, sources en annexe.

## Lancer le site

```bash
npm install
npm run dev      # http://localhost:3000
```

## Mettre en ligne

```bash
npm run build    # génère le dossier out/
```

Le dossier `out/` est un site statique : on le dépose tel quel sur l'hébergement du sous-domaine (FTP, Netlify, Vercel, GitHub Pages…). Aucun serveur Node n'est nécessaire.

## Pages

- `/` : accueil
- `/histoires/` : toutes les enquêtes
- `/dossiers/balance-ton-porc/` : le procès du feed (cancel culture et liberté d'expression)
- `/methode/` : comment un dossier est instruit
- `/a-propos/` : origine du projet et crédits
- `/convocation-2017-btp-01.html` : la version email d'origine

## Crédits photos

Ben Stein, Ross Sneddon et Dragon White Munthe, sur Unsplash (licence Unsplash).
