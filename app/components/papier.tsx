// Composants "papier" : tout ce qui compose une feuille de dossier.
// Composants serveur, sans JavaScript côté navigateur.
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { Intercalaire } from "@/lib/dossiers";
import { GARANTIES } from "@/lib/garanties";

type Papier = "blanc" | "oeuf" | "rouge";

const DECALAGES = ["0%", "14%", "28%", "42%"];

const MENU = [
  { href: "/", label: "Accueil" },
  { href: "/histoires/", label: "Nos histoires" },
  { href: "/methode/", label: "La méthode" },
  { href: "/a-propos/", label: "À propos" },
];

/** En-tête de feuille : papier à lettre officiel + menu du site. */
export function Entete({ droite, actif }: { droite: ReactNode; actif?: string }) {
  return (
    <header className="entete">
      <div className="entete__ligne">
        <Link href="/">
          <strong>RÉPUBLIQUE DU FEED</strong>
        </Link>
        <span>{droite}</span>
      </div>
      <nav className="menu" aria-label="Menu principal">
        {MENU.map((m) => (
          <Link key={m.href} href={m.href} aria-current={actif === m.href ? "page" : undefined}>
            {m.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function Onglet({
  couleur,
  decalage = 0,
  children,
}: {
  couleur: Intercalaire | "blanc";
  decalage?: 0 | 1 | 2 | 3;
  children: ReactNode;
}) {
  const style = {
    "--tab": couleur === "blanc" ? "var(--papier)" : `var(--i-${couleur})`,
    "--decalage": DECALAGES[decalage],
  } as CSSProperties;
  return (
    <div className="intercalaire" style={style}>
      <span>{children}</span>
    </div>
  );
}

export function Piece({
  id,
  papier = "blanc",
  onglet,
  children,
}: {
  id: string;
  papier?: Papier;
  onglet?: ReactNode;
  children: ReactNode;
}) {
  const classe = papier === "blanc" ? "piece" : `piece piece--${papier}`;
  return (
    <section id={id} className={classe}>
      {onglet}
      <div className="flux">{children}</div>
    </section>
  );
}

export function Tampon({ haut, numero }: { haut: ReactNode; numero: string }) {
  return (
    <div className="tampon" aria-hidden="true">
      {haut}
      <b>{numero}</b>
    </div>
  );
}

export function NoteDuGreffier({ children }: { children: ReactNode }) {
  return (
    <aside className="note">
      NOTE DU GREFFIER : {children}
    </aside>
  );
}

/** Renvoi vers une source du bordereau, en bas de page. */
export function Ref({ n }: { n: number }) {
  return (
    <a className="ref" href={`#source-${n}`} aria-label={`Source ${n}`}>
      [{n}]
    </a>
  );
}

/**
 * Registre des garanties.
 * `manquantes` : nombre de garanties déjà examinées et absentes (0 à 4), dans l'ordre de GARANTIES.
 * Le registre de suivi, en marge, se remplit quand ce bloc entre à l'écran.
 */
export function Registre({
  titre,
  manquantes,
  children,
}: {
  titre: string;
  manquantes: number;
  children?: ReactNode;
}) {
  return (
    <div className="registre" data-examine={manquantes}>
      <p className="registre__titre">Registre des garanties, {titre}</p>
      <ListeGaranties etat={(i) => (i < manquantes ? "manque" : "a-voir")} />
      {children && <p className="registre__commentaire">{children}</p>}
    </div>
  );
}

export function ListeGaranties({
  etat,
}: {
  etat: (index: number) => "manque" | "ok" | "a-voir";
}) {
  return (
    <ul className="registre__liste">
      {GARANTIES.map((g, i) => {
        const e = etat(i);
        const signe = e === "manque" ? "✗" : e === "ok" ? "☑" : "☐";
        const etatLisible = e === "manque" ? "absente" : e === "ok" ? "respectée" : "pas encore examinée";
        return (
          <li
            key={g.nom}
            className={`registre__item${e === "a-voir" ? "" : ` registre__item--${e}`}`}
          >
            <span aria-hidden="true">{signe} </span>
            {g.nom}
            <span className="sr-only"> : {etatLisible}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Tweet({
  pseudo,
  compteurs,
  children,
}: {
  pseudo: string;
  compteurs?: string[];
  children: ReactNode;
}) {
  return (
    <article className="tweet">
      <div className="tweet__avatar" aria-hidden="true" />
      <div>
        <p className="tweet__pseudo">{pseudo}</p>
        <p className="tweet__texte">{children}</p>
        {compteurs && (
          <p className="tweet__compteurs">
            {compteurs.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

export type Source = {
  n: number;
  titre: string;
  apport: ReactNode;
  source: string;
  url?: string;
};

export function Bordereau({
  groupes,
}: {
  groupes: { titre: string; sources: Source[] }[];
}) {
  return (
    <>
      {groupes.map((g) => (
        <div key={g.titre}>
          <h3 className="bordereau-groupe t-petit">{g.titre}</h3>
          <ol>
            {g.sources.map((s) => (
              <li key={s.n} id={`source-${s.n}`} className="source">
                <span className="source__num">[{s.n}]</span>
                <div>
                  <p className="source__titre">{s.titre}</p>
                  <p className="source__apport">{s.apport}</p>
                  <p className="source__lien">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.source}
                      </a>
                    ) : (
                      s.source
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </>
  );
}

const ANGLES = ["-0.5deg", "0.7deg", "-0.3deg", "0.45deg", "-0.65deg", "0.3deg"];

/**
 * Feuille volante au format A4 : une pièce du dossier = une feuille.
 * `index` fait varier l'inclinaison, `folio` s'imprime en bas de page.
 */
export function FeuilleVolante({
  index,
  papier = "blanc",
  folio,
  id,
  children,
}: {
  index: number;
  papier?: Papier;
  folio: [string, string];
  id?: string;
  children: ReactNode;
}) {
  const style = {
    "--angle": ANGLES[index % ANGLES.length],
  } as CSSProperties;
  const classe = papier === "blanc" ? "feuille feuille-volante" : `feuille feuille-volante feuille-volante--${papier}`;
  return (
    <article className={classe} style={style} id={id}>
      {children}
      <footer className="folio">
        <span>{folio[0]}</span>
        <span>{folio[1]}</span>
      </footer>
    </article>
  );
}
