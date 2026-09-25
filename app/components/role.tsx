// Éléments partagés par les listes de dossiers.
import type { CSSProperties } from "react";

/** Chemise vide en pointillés : un prochain dossier arrive. */
export function ProchainDossier() {
  return (
    <div className="chemise chemise--fermee" style={{ "--tab": "transparent" } as CSSProperties}>
      <span className="chemise__onglet">Prochain dossier</span>
      <span className="chemise__couverture">
        <span className="chemise__etiquette">
          <span className="chemise__numero">En instruction</span>
          <span className="chemise__titre" style={{ display: "block" }}>
            Affaire à venir
          </span>
        </span>
        <span className="chemise__accroche">
          Une nouvelle affaire est en cours d&apos;écriture. Elle rejoindra
          l&apos;étagère dès que ses sources seront vérifiées.
        </span>
      </span>
    </div>
  );
}

export function Pied() {
  return (
    <footer className="pied">
      <span>République du Feed, petites enquêtes de culture digitale</span>
      <span>Travail de groupe, cours de culture digitale</span>
    </footer>
  );
}
