// Rôle des affaires : la liste de tous les dossiers, affichée sur l'accueil.
// Un dossier "instruit" a sa page dans app/dossiers/<slug>/page.tsx.
// Un dossier "en instruction" est annoncé sans lien, le temps d'écrire l'enquête.
// Le premier de la liste est affiché en tête du rôle : c'est le dossier d'ouverture.

export type Intercalaire = "bleu" | "jaune" | "vert" | "rose";

export type Dossier = {
  slug: string;
  numero: string;
  titre: string;
  accroche: string;
  annee: number;
  statut: "instruit" | "en-instruction";
  intercalaire: Intercalaire;
};

export const dossiers: Dossier[] = [
  {
    slug: "balance-ton-porc",
    numero: "2017-BTP-01",
    titre: "Le procès du feed",
    accroche:
      "#BalanceTonPorc, #BalanceTonFrère : quand un hashtag emprunte les codes de la justice sans en avoir les garanties.",
    annee: 2017,
    statut: "instruit",
    intercalaire: "bleu",
  },
];
