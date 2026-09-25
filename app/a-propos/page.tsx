import type { Metadata } from "next";
import { Entete, Onglet, Piece } from "../components/papier";
import { Pied } from "../components/role";

export const metadata: Metadata = {
  title: "À propos",
  description: "D'où vient la République du Feed, qui la fait, et les crédits.",
};

const PHOTOS = [
  { auteur: "Ben Stein", profil: "https://unsplash.com/@benostein", sujet: "Foule qui filme (accueil)" },
  { auteur: "Ross Sneddon", profil: "https://unsplash.com/@rosssneddon", sujet: "Téléphones levés (nos histoires)" },
  { auteur: "Dragon White Munthe", profil: "https://unsplash.com/@fotomagi", sujet: "Salle d'audience (la méthode)" },
];

export default function APropos() {
  return (
    <main className="page" id="contenu" tabIndex={-1}>
      <div className="feuille">
        <Entete droite="Greffe des affaires en ligne" actif="/a-propos/" />

        <Piece id="a-propos">
          <h1 className="t-display">À propos</h1>
          <p className="t-lead">
            La République du Feed est née d&apos;un devoir de culture digitale
            sur un sujet précis : la cancel culture et la liberté
            d&apos;expression sur les réseaux.
          </p>
          <p>
            Le devoir a d&apos;abord pris la forme d&apos;une convocation
            envoyée par email : le lecteur y devenait juré d&apos;un procès
            tenu sur les réseaux. Le site reprend ce dossier et en ouvre
            d&apos;autres, sur des histoires qui ont été jugées en ligne avant
            de l&apos;être ailleurs.
          </p>
          <p>
            <a className="lien-fort" href="/convocation-2017-btp-01.html">
              Lire la convocation d&apos;origine, version email
            </a>
          </p>
        </Piece>

        <Piece
          id="parti-pris"
          papier="oeuf"
          onglet={<Onglet couleur="rose">Le parti pris</Onglet>}
        >
          <h2 className="t-titre">Ni pour, ni contre : regarder la procédure</h2>
          <p>
            La cancel culture n&apos;est pas l&apos;ennemie de la liberté
            d&apos;expression, c&apos;en est un usage collectif. Le problème,
            c&apos;est qu&apos;elle emprunte les codes de la justice (procès,
            jury, accusation, verdict) sans en avoir les garanties : preuve,
            défense, présomption d&apos;innocence, appel.
          </p>
          <p>
            Chaque dossier part de cette tension. Il ne dit pas qui avait
            raison. Il montre comment le jugement s&apos;est fait.
          </p>
        </Piece>

        <Piece
          id="credits"
          onglet={
            <Onglet couleur="bleu" decalage={1}>
              Crédits
            </Onglet>
          }
        >
          <h2 className="t-titre">Qui fait quoi</h2>
          <dl className="lecture">
            <div>
              <dt>Conception, écriture et design</dt>
              <dd>Un travail de groupe, réalisé en classe dans le cadre du cours de culture digitale.</dd>
            </div>
            <div>
              <dt>Photographies</dt>
              <dd>
                {PHOTOS.map((p, i) => (
                  <span key={p.auteur}>
                    <a href={p.profil} target="_blank" rel="noreferrer">{p.auteur}</a>
                    {" "}({p.sujet}){i < PHOTOS.length - 1 ? ", " : ". "}
                  </span>
                ))}
                Sur Unsplash, sous licence Unsplash.
              </dd>
            </div>
            <div>
              <dt>Typographies</dt>
              <dd>Helvetica ou Arial pour le texte, Courier pour les mentions de greffe.</dd>
            </div>
          </dl>
        </Piece>
      </div>
      <Pied />
    </main>
  );
}
