"use client";

// Ce qui réagit au lecteur pendant l'audience :
// - le bulletin de vote, dont le verdict se souvient ;
// - le registre de suivi en marge, qui se remplit au fil de la lecture.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { GARANTIES } from "@/lib/garanties";

type Choix = "A" | "B" | "C" | "D";

const AudienceContext = createContext<{
  vote: Choix | null;
  voter: (c: Choix) => void;
}>({ vote: null, voter: () => {} });

export function Audience({ children }: { children: ReactNode }) {
  const [vote, setVote] = useState<Choix | null>(null);
  return (
    <AudienceContext.Provider value={{ vote, voter: setVote }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function Bulletin({
  question,
  choix,
}: {
  question: string;
  choix: Record<Choix, string>;
}) {
  const { vote, voter } = useContext(AudienceContext);
  return (
    <form className="bulletin" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>{question}</legend>
        {(Object.keys(choix) as Choix[]).map((lettre) => (
          <label key={lettre} className="choix">
            <input
              type="radio"
              name="vote"
              value={lettre}
              checked={vote === lettre}
              onChange={() => voter(lettre)}
            />
            <span className="choix__case">
              {vote === lettre ? "☒" : "☐"} {lettre}.
            </span>
            <span>{choix[lettre]}</span>
          </label>
        ))}
      </fieldset>
      <p className="bulletin__pied" data-vote={vote !== null} aria-live="polite">
        {vote
          ? `Bulletin déposé : ${vote}. Continuez la lecture.`
          : "Cochez une case avant de continuer."}
      </p>
    </form>
  );
}

/** Première phrase du verdict : elle dépend de ce que le lecteur a coché. */
export function RappelDuVote() {
  const { vote } = useContext(AudienceContext);
  if (!vote) {
    return (
      <>
        Vous n&apos;avez rien coché. Pourtant, votre avis s&apos;est formé
        pendant la lecture : vous avez tranché une histoire que vous ne
        connaissiez qu&apos;à moitié.
      </>
    );
  }
  return (
    <>
      Vous avez coché {vote}. A, B, C ou D, peu importe : vous avez tranché une
      histoire que vous ne connaissiez qu&apos;à moitié.
    </>
  );
}

/** Registre en marge : chaque garantie passe au rouge quand la pièce qui l'examine est lue. */
export function SuiviDuRegistre() {
  const [manquantes, setManquantes] = useState(0);

  useEffect(() => {
    const blocs = document.querySelectorAll<HTMLElement>("[data-examine]");
    const observer = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) {
          if (!e.isIntersecting) continue;
          const n = Number(e.target.getAttribute("data-examine"));
          setManquantes((m) => Math.max(m, n));
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    blocs.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="suivi" aria-label="Registre des garanties">
      <p className="suivi__titre">Registre des garanties</p>
      <ul>
        {GARANTIES.map((g, i) => (
          <li key={g.nom} data-manque={i < manquantes}>
            {i < manquantes ? "✗" : "☐"} {g.nom}
          </li>
        ))}
      </ul>
    </aside>
  );
}
