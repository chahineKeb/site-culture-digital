"use client";

// Lecture feuille par feuille : le dossier se feuillette comme une vraie liasse.
// - une seule feuille à plat sur la pile, l'épaisseur des suivantes visible dessous ;
// - tourner : boutons, flèches du clavier, glissement du doigt ;
// - les intercalaires en bas servent de sommaire ;
// - un lien vers #quelque-chose ouvre la feuille qui le contient.
import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type EntreeSommaire = { label: string; couleur: string };

type Sortie = { index: number; sens: "avant" | "arriere" } | null;

export function Liasse({
  onglet,
  couleur,
  sommaire,
  children,
}: {
  /** texte de l'onglet de la chemise ouverte */
  onglet: string;
  /** couleur du carton, ex. "var(--i-bleu)" */
  couleur: string;
  sommaire: EntreeSommaire[];
  children: ReactNode;
}) {
  const feuilles = Children.toArray(children);
  const total = feuilles.length;
  const [active, setActive] = useState(0);
  const [sortie, setSortie] = useState<Sortie>(null);
  const pile = useRef<HTMLDivElement>(null);
  const debutTouche = useRef<{ x: number; y: number } | null>(null);

  const activeRef = useRef(0);

  const aller = useCallback(
    (cible: number, ancre?: string) => {
      if (cible < 0 || cible >= total) return;
      const courante = activeRef.current;
      const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (cible !== courante) {
        setSortie(reduit ? null : { index: courante, sens: cible > courante ? "avant" : "arriere" });
        activeRef.current = cible;
        setActive(cible);
      }
      // on revient en haut de la feuille, ou sur l'élément visé
      requestAnimationFrame(() => {
        const el = ancre ? document.getElementById(ancre) : pile.current;
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 24;
        if (!ancre && y > window.scrollY) return; // déjà en haut de la pile
        window.scrollTo({ top: y, behavior: reduit ? "auto" : "smooth" });
      });
    },
    [total],
  );

  // Trouve la feuille qui contient un id, puis l'ouvre.
  const ouvrirAncre = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      const feuille = el?.closest<HTMLElement>("[data-feuille]");
      if (!feuille) return false;
      aller(Number(feuille.dataset.feuille), id);
      return true;
    },
    [aller],
  );

  // Ancre dans l'adresse au chargement (#piece-5, #source-3…)
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) ouvrirAncre(id);
  }, [ouvrirAncre]);

  // Clavier : flèches gauche et droite
  useEffect(() => {
    function touche(e: KeyboardEvent) {
      const cible = e.target as HTMLElement;
      if (cible.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") aller(active + 1);
      if (e.key === "ArrowLeft") aller(active - 1);
    }
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [active, aller]);

  // Liens internes (#piece-2, #source-4) : on ouvre la bonne feuille
  function clic(e: React.MouseEvent) {
    const lien = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!lien) return;
    const id = lien.getAttribute("href")!.slice(1);
    if (ouvrirAncre(id)) {
      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <div className="feuilletage">
      <div className="chemise-dos" style={{ "--tab": couleur } as CSSProperties}>
      <span className="chemise-dos__onglet">{onglet}</span>
      <div
        ref={pile}
        className="pile"
        data-restantes={Math.min(total - active - 1, 2)}
        data-sens={sortie?.sens}
        onClick={clic}
        onTouchStart={(e) => {
          debutTouche.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const d = debutTouche.current;
          debutTouche.current = null;
          if (!d) return;
          const dx = e.changedTouches[0].clientX - d.x;
          const dy = e.changedTouches[0].clientY - d.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            aller(dx < 0 ? active + 1 : active - 1);
          }
        }}
      >
        {feuilles.map((f, i) => {
          const etat =
            i === active ? "active" : sortie?.index === i ? `sort-${sortie.sens}` : "rangee";
          return (
            <div
              key={i}
              className="pile__feuille"
              data-feuille={i}
              data-etat={etat}
              aria-hidden={i !== active}
              inert={i !== active}
              onAnimationEnd={() => {
                if (sortie?.index === i) setSortie(null);
              }}
            >
              {f}
            </div>
          );
        })}
      </div>
      </div>

      <nav className="sommaire" aria-label="Feuilles du dossier">
        <button
          type="button"
          className="sommaire__tourner"
          onClick={() => aller(active - 1)}
          disabled={active === 0}
        >
          Feuille précédente
        </button>
        <ol className="sommaire__onglets">
          {sommaire.map((s, i) => (
            <li key={s.label}>
              <button
                type="button"
                style={{ "--tab": s.couleur } as CSSProperties}
                aria-current={i === active ? "step" : undefined}
                aria-label={`Feuille ${i + 1} : ${s.label}`}
                title={s.label}
                onClick={() => aller(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ol>
        <p className="sommaire__position" aria-live="polite">
          Feuille {active + 1}/{total} : {sommaire[active]?.label}
        </p>
        <button
          type="button"
          className="sommaire__tourner sommaire__tourner--suivante"
          onClick={() => aller(active + 1)}
          disabled={active === total - 1}
        >
          Feuille suivante
        </button>
      </nav>
    </div>
  );
}
