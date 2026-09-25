import type { Metadata } from "next";
import Image from "next/image";
import { GARANTIES } from "@/lib/garanties";
import { Entete, ListeGaranties, NoteDuGreffier, Onglet, Piece } from "../components/papier";
import { Pied } from "../components/role";

export const metadata: Metadata = {
  title: "La méthode",
  description:
    "Comment un dossier de la République du Feed est instruit : quatre garanties, des sources publiques, une lecture feuille par feuille.",
};

export default function Methode() {
  return (
    <main className="page">
      <div className="feuille">
        <Entete droite="Règlement de la greffe" actif="/methode/" />

        <Piece id="methode">
          <h1 className="t-display">La méthode</h1>
          <p className="t-lead">
            Chaque dossier suit la même procédure. Elle sert à montrer ce
            qu&apos;un vrai procès vérifie, et ce que le feed saute.
          </p>
          <figure className="photo-large">
            <Image
              src="/images/salle-audience.jpg"
              alt="Une salle d'audience vide, boiseries sombres et colonnes, le banc du juge au fond."
              width={1600}
              height={1200}
              sizes="(max-width: 760px) 100vw, 640px"
            />
            <figcaption>
              Une salle d&apos;audience, vide. Photo :{" "}
              <a href="https://unsplash.com/@fotomagi" target="_blank" rel="noreferrer">
                Dragon White Munthe, Unsplash
              </a>
            </figcaption>
          </figure>
        </Piece>

        <Piece
          id="garanties"
          papier="oeuf"
          onglet={<Onglet couleur="bleu">Les quatre garanties</Onglet>}
        >
          <h2 className="t-titre">Ce qu&apos;un tribunal ne saute jamais</h2>
          <dl className="garanties">
            {GARANTIES.map((g) => (
              <div key={g.nom}>
                <dt>{g.nom}</dt>
                <dd>{g.definition}</dd>
              </div>
            ))}
          </dl>
          <p>
            Dans chaque dossier, un registre suit ces quatre garanties. Il est
            vide à l&apos;ouverture. À chaque feuille, le greffier coche celle
            qui a manqué :
          </p>
          <div className="registre">
            <p className="registre__titre">Registre des garanties, exemple</p>
            <ListeGaranties etat={(i) => (i < 2 ? "manque" : "a-voir")} />
            <p className="registre__commentaire">
              Ici, deux garanties ont déjà manqué : la preuve et la défense. Les
              deux autres n&apos;ont pas encore été examinées.
            </p>
          </div>
        </Piece>

        <Piece
          id="lire"
          onglet={
            <Onglet couleur="jaune" decalage={1}>
              Lire un dossier
            </Onglet>
          }
        >
          <h2 className="t-titre">Ce que vous trouverez dans une chemise</h2>
          <dl className="lecture">
            <div>
              <dt>Les feuilles</dt>
              <dd>Une feuille par pièce du dossier, à lire dans l&apos;ordre, de la convocation à la clôture.</dd>
            </div>
            <div>
              <dt>Les intercalaires</dt>
              <dd>L&apos;onglet de couleur en haut de chaque feuille indique l&apos;étape de la procédure : les faits, l&apos;audience, le verdict.</dd>
            </div>
            <div>
              <dt>Les notes du greffier</dt>
              <dd>Des encadrés gris qui ajoutent une nuance, un chiffre ou un cas moins connu.</dd>
            </div>
            <div>
              <dt>Les renvois</dt>
              <dd>
                Les petits numéros rouges <span className="ref">[3]</span> mènent à la
                source correspondante, dans l&apos;annexe.
              </dd>
            </div>
            <div>
              <dt>Le bordereau</dt>
              <dd>La dernière feuille liste toutes les sources, avec un lien quand elles sont publiques.</dd>
            </div>
          </dl>
        </Piece>

        <Piece
          id="sources"
          papier="oeuf"
          onglet={
            <Onglet couleur="vert" decalage={2}>
              Les sources
            </Onglet>
          }
        >
          <h2 className="t-titre">Nos règles</h2>
          <ul className="lecture">
            <li>Les faits renvoient à une source publique : texte de loi, décision de justice, article, archive vidéo.</li>
            <li>Les situations inventées pour montrer un mécanisme sont signalées comme fictives.</li>
            <li>Un dossier reste « en instruction » tant que ses sources ne sont pas vérifiées.</li>
          </ul>
          <NoteDuGreffier>
            un dossier n&apos;est pas un verdict. Il montre comment une affaire a
            été jugée en ligne, pas qui avait raison.
          </NoteDuGreffier>
        </Piece>
      </div>
      <Pied />
    </main>
  );
}
