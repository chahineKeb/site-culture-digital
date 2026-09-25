"use client";

// Une chemise cartonnée à élastiques. Au clic, la couverture s'ouvre,
// la première feuille sort, puis on entre dans le dossier.
import { useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Dossier } from "@/lib/dossiers";

export function Chemise({ d, enTete = false }: { d: Dossier; enTete?: boolean }) {
  const router = useRouter();
  const [ouverte, setOuverte] = useState(false);
  const href = `/dossiers/${d.slug}/`;
  const style = { "--tab": `var(--i-${d.intercalaire})` } as CSSProperties;
  const classe = `chemise${enTete ? " chemise--tete" : ""}${d.statut === "instruit" ? "" : " chemise--fermee"}`;

  const interieur = (
    <>
      <span className="chemise__onglet">Dossier n°{d.numero}</span>
      <span className="chemise__feuille" aria-hidden="true" />
      <div className="chemise__couverture">
        <div className="chemise__etiquette">
          <span className="chemise__numero">
            République du Feed, affaire de {d.annee}
          </span>
          <h2 className="chemise__titre">{d.titre}</h2>
        </div>
        <p className="chemise__accroche">{d.accroche}</p>
        {d.statut === "instruit" ? (
          <span className="tampon" aria-hidden="true">INSTRUIT</span>
        ) : (
          <span className="tampon" aria-hidden="true" style={{ color: "var(--gris)", borderColor: "var(--gris)" }}>
            EN INSTRUCTION
          </span>
        )}
        {d.statut === "instruit" && <span className="chemise__action">Ouvrir le dossier</span>}
      </div>
    </>
  );

  if (d.statut !== "instruit") {
    return <div className={classe} style={style}>{interieur}</div>;
  }

  function ouvrir(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    setOuverte(true);
    router.prefetch(href);
    window.setTimeout(() => router.push(href), 520);
  }

  return (
    <Link
      href={href}
      className={classe}
      style={style}
      data-ouverte={ouverte}
      onClick={ouvrir}
      aria-label={`Ouvrir le dossier : ${d.titre}`}
    >
      {interieur}
    </Link>
  );
}
