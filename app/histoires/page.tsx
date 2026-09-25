import type { Metadata } from "next";
import Image from "next/image";
import { dossiers } from "@/lib/dossiers";
import { Entete, Onglet, Piece } from "../components/papier";
import { Chemise } from "../components/chemise";
import { Pied, ProchainDossier } from "../components/role";

export const metadata: Metadata = {
  title: "Nos histoires",
  description: "L'étagère des dossiers : toutes les enquêtes de la République du Feed.",
};

export default function Histoires() {
  const instruits = dossiers.filter((d) => d.statut === "instruit").length;

  return (
    <main className="page" id="contenu" tabIndex={-1}>
      <div className="feuille">
        <Entete droite="Rôle des affaires" actif="/histoires/" />

        <Piece id="histoires">
          <div className="entree">
            <div className="flux">
              <h1 className="t-display">Nos histoires</h1>
              <p className="t-lead">
                Chaque histoire est une chemise sur l&apos;étagère : une affaire
                jugée sur les réseaux, reprise feuille par feuille, avec ses
                sources.
              </p>
              <p className="t-mention">
                {instruits} dossier{instruits > 1 ? "s" : ""} instruit
                {instruits > 1 ? "s" : ""}. Cliquez sur une chemise pour
                l&apos;ouvrir.
              </p>
            </div>
            <figure className="photo-conviction photo-conviction--petite">
              <Image
                src="/images/foule-verticale.jpg"
                alt="Des bras levés tiennent des téléphones au-dessus d'une foule, dans une rue."
                width={1000}
                height={1500}
                sizes="220px"
              />
              <figcaption>
                <a href="https://unsplash.com/@rosssneddon" target="_blank" rel="noreferrer">
                  Photo : Ross Sneddon, Unsplash
                </a>
              </figcaption>
            </figure>
          </div>
        </Piece>

        <Piece
          id="etagere"
          papier="oeuf"
          onglet={
            <Onglet couleur="jaune" decalage={1}>
              L&apos;étagère
            </Onglet>
          }
        >
          <div className="etageres">
            {dossiers.map((d, i) => (
              <Chemise key={d.slug} d={d} enTete={i === 0} />
            ))}
            <ProchainDossier />
          </div>
        </Piece>
      </div>
      <Pied />
    </main>
  );
}
