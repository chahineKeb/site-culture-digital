import Image from "next/image";
import Link from "next/link";
import { dossiers } from "@/lib/dossiers";
import { GARANTIES } from "@/lib/garanties";
import { Entete, Onglet, Piece, Tampon } from "./components/papier";
import { Chemise } from "./components/chemise";
import { Pied, ProchainDossier } from "./components/role";

export default function Accueil() {
  const [enTete, ...suite] = dossiers;

  return (
    <main className="page">
      <div className="feuille">
        <Entete droite="Greffe des affaires en ligne" actif="/" />

        <Piece id="ouverture">
          <figure className="photo-conviction">
            <Image
              src="/images/foule-filme.jpg"
              alt="Une foule lève ses téléphones et filme la même scène."
              width={1600}
              height={1066}
              priority
              sizes="(max-width: 760px) 100vw, 640px"
            />
            <Tampon
              haut={
                <>
                  PIÈCE À<br />
                  CONVICTION
                </>
              }
              numero="N°00"
            />
            <figcaption>
              <span>Tout le monde filme. Personne ne vérifie.</span>
              <a href="https://unsplash.com/@benostein" target="_blank" rel="noreferrer">
                Photo : Ben Stein, Unsplash
              </a>
            </figcaption>
          </figure>
          <h1 className="t-hero espace-l">
            Des affaires jugées en ligne, rouvertes pièce par pièce.
          </h1>
          <p className="t-lead">
            Une accusation fait le tour des réseaux en une matinée. Le verdict
            tombe avant que quiconque ait vérifié quoi que ce soit. Ici, on
            reprend ces histoires comme de vrais dossiers : les faits, les
            témoins, les sources, et ce que le feed a oublié de vérifier.
          </p>
        </Piece>

        <Piece
          id="a-l-audience"
          papier="oeuf"
          onglet={<Onglet couleur="bleu">À l&apos;audience</Onglet>}
        >
          <div className="etageres">
            <Chemise d={enTete} enTete />
            {suite.map((d) => (
              <Chemise key={d.slug} d={d} />
            ))}
            <ProchainDossier />
          </div>
          <p className="espace-l">
            <Link href="/histoires/" className="lien-fort">
              Voir toutes nos histoires
            </Link>
          </p>
        </Piece>

        <Piece
          id="methode"
          onglet={
            <Onglet couleur="vert" decalage={2}>
              La méthode
            </Onglet>
          }
        >
          <h2 className="t-titre">Quatre garanties, à chaque dossier</h2>
          <p>
            Un tribunal ne rend pas de verdict sans elles. Le feed, si. Chaque
            enquête tient un registre de ces quatre garanties et note celles qui
            ont manqué.
          </p>
          <dl className="garanties">
            {GARANTIES.map((g) => (
              <div key={g.nom}>
                <dt>{g.nom}</dt>
                <dd>{g.definition}</dd>
              </div>
            ))}
          </dl>
          <p>
            <Link href="/methode/" className="lien-fort">
              Lire la méthode en entier
            </Link>
          </p>
        </Piece>
      </div>
      <Pied />
    </main>
  );
}
