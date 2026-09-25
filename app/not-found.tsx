import Link from "next/link";
import { Entete, Piece, Tampon } from "./components/papier";
import { Pied } from "./components/role";

export default function PieceIntrouvable() {
  return (
    <main className="page" id="contenu" tabIndex={-1}>
      <div className="feuille">
        <Entete droite="Erreur 404" />
        <Piece id="introuvable">
          <Tampon haut={<>PIÈCE</>} numero="ABSENTE" />
          <h1 className="t-display">Cette feuille n&apos;est pas dans le dossier.</h1>
          <p>
            L&apos;adresse contient peut-être une erreur, ou la page a été
            retirée. Les dossiers ouverts sont tous rangés sur l&apos;étagère.
          </p>
          <p>
            <Link href="/histoires/" className="bouton">
              Voir nos histoires
            </Link>
          </p>
        </Piece>
      </div>
      <Pied />
    </main>
  );
}
