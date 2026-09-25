import type { Metadata } from "next";
import Link from "next/link";
import {
  Bordereau,
  Entete,
  FeuilleVolante,
  ListeGaranties,
  NoteDuGreffier,
  Onglet,
  Piece,
  Ref,
  Registre,
  Tampon,
  Tweet,
  type Source,
} from "../../components/papier";
import {
  Audience,
  Bulletin,
  RappelDuVote,
  SuiviDuRegistre,
} from "../../components/audience";
import { Liasse, type EntreeSommaire } from "../../components/liasse";
import { Pied } from "../../components/role";

export const metadata: Metadata = {
  title: "Le procès du feed",
  description:
    "Dossier n°2017-BTP-01. La cancel culture emprunte les codes de la justice sans en avoir les garanties. Une audience en huit pièces.",
};

// Onglets du sommaire, dans l'ordre des feuilles
const SOMMAIRE: EntreeSommaire[] = [
  { label: "Convocation", couleur: "var(--note)" },
  { label: "Les faits", couleur: "var(--i-bleu)" },
  { label: "L'audience", couleur: "var(--i-jaune)" },
  { label: "Les proches", couleur: "var(--i-vert)" },
  { label: "Le droit", couleur: "var(--i-rose)" },
  { label: "La délibération", couleur: "var(--i-bleu)" },
  { label: "Le verdict", couleur: "#e39a9e" },
  { label: "La clôture", couleur: "var(--i-jaune)" },
  { label: "Annexe : les preuves", couleur: "var(--i-rose)" },
];

const SOURCES: { titre: string; sources: Source[] }[] = [
  {
    titre: "Liberté d'expression et ses limites",
    sources: [
      {
        n: 1,
        titre: "Article 11 de la Déclaration des droits de l'homme et du citoyen (1789)",
        apport:
          "« La libre communication des pensées et des opinions est un des droits les plus précieux de l'homme [...] », sauf à répondre de l'abus de cette liberté dans les cas déterminés par la loi.",
        source: "Légifrance",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006527437",
      },
      {
        n: 2,
        titre: "Loi du 29 juillet 1881 sur la liberté de la presse, articles 29 et suivants",
        apport:
          "Définit la diffamation et l'injure, et le cadre de la bonne foi qui permet d'échapper à une condamnation.",
        source: "Légifrance",
        url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006419790",
      },
    ],
  },
  {
    titre: "#BalanceTonPorc devant un vrai tribunal",
    sources: [
      {
        n: 3,
        titre: "Première instance, 2019 : Sandra Muller condamnée",
        apport:
          "L'initiatrice du hashtag est condamnée pour diffamation à verser 15 000 euros de dommages-intérêts à l'homme qu'elle avait nommé.",
        source: "Maître Eolas, « La condamnation de Sandra Muller dans l'affaire #BalanceTonPorc »",
        url: "https://www.maitre-eolas.fr/post/2019/09/25/La-condamnation-de-Sandra-Muller-dans-l-affaire-BalanceTonPorc",
      },
      {
        n: 4,
        titre: "Appel, 2021, et Cour de cassation, 2022 : relaxe définitive",
        apport:
          "La cour d'appel lui reconnaît la bonne foi, au nom d'un débat d'intérêt général sur la libération de la parole des femmes. La Cour de cassation confirme le 11 mai 2022.",
        source: "Wikipédia, « Sandra Muller », section sur les procès",
        url: "https://fr.wikipedia.org/wiki/Sandra_Muller",
      },
    ],
  },
  {
    titre: "L'affaire Roméo Elvis et #BalanceTonFrère",
    sources: [
      {
        n: 5,
        titre: "Angèle, « Balance ton quoi » (2019)",
        apport:
          "Le titre féministe de la chanteuse, écrit en écho à #BalanceTonPorc. Un an plus tard, les internautes le retournent contre elle.",
        source: "YouTube, clip officiel",
        url: "https://www.youtube.com/watch?v=Hi7Rx3En7-k",
      },
      {
        n: 6,
        titre: "Accusation, excuses publiques, fin des contrats",
        apport:
          "Septembre 2020 : Roméo Elvis reconnaît les faits et s'excuse. Le 18 septembre, Lacoste et le chocolatier Galler mettent fin à leur collaboration avec lui.",
        source: "Wikipédia, « Roméo Elvis »",
        url: "https://fr.wikipedia.org/wiki/Rom%C3%A9o_Elvis",
      },
      {
        n: 7,
        titre: "« C'était un geste déplacé »",
        apport: "Deux ans plus tard, l'artiste revient sur les faits dans l'émission En Aparté.",
        source: "Canal+ / YouTube, En Aparté",
        url: "https://www.youtube.com/watch?v=5Lg7ABnAAEs",
      },
      {
        n: 8,
        titre: "« Angèle », documentaire Netflix (2021)",
        apport:
          "La chanteuse y consacre un passage entier à l'événement : la violence de l'injonction publique, le sentiment que certains « jubilaient à l'idée de la coincer », la difficulté de gérer publiquement une affaire privée.",
        source: "Netflix, documentaire « Angèle »",
      },
      {
        n: 9,
        titre: "Angèle réagit aux accusations visant son frère",
        apport:
          "Reprend les commentaires d'internautes (« Pas de story par rapport à ton frère ? », « Balance ton frère ») et la réponse officielle de la chanteuse, qui condamne les actes.",
        source: "Télépro",
      },
    ],
  },
];

export default function DossierBalanceTonPorc() {
  return (
    <main className="page" id="contenu" tabIndex={-1}>
      <Audience>
        <div className="dossier">
          <SuiviDuRegistre />

          <Liasse
            onglet="Dossier n°2017-BTP-01 : le procès du feed"
            couleur="var(--i-bleu)"
            sommaire={SOMMAIRE}
          >
            <FeuilleVolante index={0} papier="blanc" folio={["Dossier n°2017-BTP-01", "Feuille 1/9"]}>
              <Entete droite="Dossier n°2017-BTP-01" actif="/histoires/" />
              {/* PIÈCE 1 : ouverture */}
              <Piece id="piece-1" papier="blanc">
                <Tampon
                  haut={
                    <>
                      PIÈCE À<br />
                      CONVICTION
                    </>
                  }
                  numero="N°01"
                />
                <p className="t-mention">Convocation</p>
                <h1 className="t-display">
                  Vous êtes appelé(e) à comparaître en qualité de juré.
                </h1>
                <p>
                  Ce matin, une accusation est arrivée sur votre téléphone avant
                  votre café.
                </p>
                <p>
                  Une journaliste accuse un ancien dirigeant de télévision de
                  propos sexistes et insistants, et lance sur les réseaux sociaux
                  un hashtag qui devient viral. Vous ne connaissez pas
                  l&apos;accusé. Vous ne connaissez pas non plus la personne qui
                  accuse.
                </p>
                <p>C&apos;est le sujet de cette audience.</p>
                <p>
                  Tout au long du dossier, le greffier tient le registre des
                  quatre garanties d&apos;un vrai procès. À vous de vérifier
                  lesquelles le feed respecte.
                </p>
                <Registre titre="à l'ouverture" manquantes={0} />
                <p className="centre espace-l">
                  <a href="#piece-2" className="t-fort">
                    Lire la feuille suivante
                  </a>
                </p>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={1} papier="oeuf" folio={["Dossier n°2017-BTP-01", "Feuille 2/9"]}>
              {/* PIÈCE 2 : les faits */}
              <Piece
                id="piece-2"
                papier="oeuf"
                onglet={<Onglet couleur="bleu">N°2 : les faits</Onglet>}
              >
                <p className="t-mention">13 octobre 2017</p>
                <h2 className="t-titre">
                  Un hashtag apparaît : #BalanceTonPorc
                  <Ref n={3} />
                  <Ref n={4} />
                </h2>
                <div className="escalier espace-l">
                  <p>1 témoignage.</p>
                  <p>100.</p>
                  <p>1 000.</p>
                  <p>Des milliers.</p>
                  <p>Un mouvement.</p>
                </div>
                <div className="droite">
                  <p className="chiffre">+200&nbsp;000</p>
                  <p>
                    mentions en trois jours, selon <em>Le Monde</em>.
                  </p>
                </div>
                <NoteDuGreffier>
                  ce chiffre est réel.
                </NoteDuGreffier>
                <p>
                  Ce hashtag permet à des milliers de personnes de dénoncer
                  publiquement les violences qu&apos;elles ont subies. Certaines
                  n&apos;avaient jamais osé en parler. Pour la première fois,
                  elles peuvent mettre des mots sur ce qu&apos;elles ont vécu et se
                  libérer d&apos;un poids qu&apos;elles portaient en silence.
                </p>
                <p className="t-titre filet-fort">
                  Mais un hashtag ne vérifie rien. Il diffuse.
                </p>
                <div className="espace-l">
                  <Registre titre="pièce n°2" manquantes={1}>
                    Preuve : aucune. Le hashtag a circulé avant toute vérification.
                  </Registre>
                </div>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={2} papier="blanc" folio={["Dossier n°2017-BTP-01", "Feuille 3/9"]}>
              {/* PIÈCE 3 : l'audience */}
              <Piece
                id="piece-3"
                onglet={
                  <Onglet couleur="jaune" decalage={1}>
                    N°3 : l&apos;audience
                  </Onglet>
                }
              >
                <h2 className="t-titre">Le tribunal du feed</h2>
                <div>
                  <Tweet pseudo="@user_4587" compteurs={["❤️ 14,8K", "🔁 6,2K", "💬 1,8K"]}>
                    Je viens de voir ce témoignage. C&apos;est absolument immonde.
                  </Tweet>
                  <Tweet pseudo="@user_9821" compteurs={["❤️ 22K", "🔁 11K"]}>
                    Il faut arrêter de le suivre.
                  </Tweet>
                  <Tweet pseudo="@user_1234" compteurs={["❤️ 1,5K", "🔁 2K"]}>
                    Et son entourage, ils étaient au courant&nbsp;?
                  </Tweet>
                </div>
                <p className="t-fort espace-l">LE FEED NE S&apos;ARRÊTE PAS À L&apos;ACCUSÉ.</p>
                <ol className="cercle" aria-label="Le cercle s'élargit">
                  <li>La personne est accusée.</li>
                  <li>Son entourage doit s&apos;expliquer.</li>
                  <li>Son employeur doit réagir.</li>
                  <li>Les marques doivent choisir leur camp.</li>
                  <li>Même le silence devient suspect.</li>
                </ol>
                <p className="t-fort">Le procès ne vise plus seulement l&apos;accusé.</p>
                <div className="espace-l">
                  <Registre titre="pièce n°3" manquantes={2}>
                    Défense : aucune. Dans le fil, l&apos;accusé n&apos;a jamais la
                    parole, et son entourage non plus.
                  </Registre>
                </div>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={3} papier="oeuf" folio={["Dossier n°2017-BTP-01", "Feuille 4/9"]}>
              {/* PIÈCE 4 : les proches */}
              <Piece
                id="piece-4"
                papier="oeuf"
                onglet={
                  <Onglet couleur="vert" decalage={2}>
                    N°4 : les proches
                  </Onglet>
                }
              >
                <h2 className="t-titre">QUAND LE PROCÈS CHANGE DE CIBLE</h2>
                <div className="fiche">
                  <p className="fiche__date">2020</p>
                  <p className="fiche__texte">
                    Roméo Elvis est publiquement accusé d&apos;agression sexuelle.
                    Il reconnaît un comportement inapproprié et présente ses
                    excuses.
                    <Ref n={6} />
                    <Ref n={7} />
                  </p>
                </div>
                <div className="centre espace-l">
                  <p className="t-mention">Internet :</p>
                  <p className="t-display">
                    «&nbsp;Et sa sœur, la chanteuse Angèle&nbsp;?&nbsp;»
                    <Ref n={9} />
                  </p>
                  <p className="t-fort">
                    Création du #BalanceTonFrère
                    <Ref n={5} />
                  </p>
                </div>
                <div className="espace-l">
                  <p className="t-lead">Elle n&apos;est pas accusée des faits.</p>
                  <p className="t-fort">
                    Mais elle est sommée de prendre position.
                    <Ref n={8} />
                  </p>
                </div>
                <NoteDuGreffier>
                  Internet lui demande de répondre. Tant qu&apos;elle se tait, elle
                  devient à son tour une cible.
                </NoteDuGreffier>
                <Registre titre="pièce n°4" manquantes={3}>
                  Présomption d&apos;innocence : renversée. Angèle n&apos;est
                  accusée de rien, c&apos;est pourtant à elle de se justifier.
                </Registre>
                <p className="t-titre espace-l">
                  Peut-on être tenu responsable du silence, ou simplement du nom
                  qu&apos;on porte&nbsp;?
                </p>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={4} papier="blanc" folio={["Dossier n°2017-BTP-01", "Feuille 5/9"]}>
              {/* PIÈCE 5 : le droit */}
              <Piece
                id="piece-5"
                onglet={
                  <Onglet couleur="rose" decalage={3}>
                    N°5 : le droit
                  </Onglet>
                }
              >
                <h2 className="t-titre centre">Liberté d&apos;expression : qui parle&nbsp;?</h2>
                <div className="face-a-face">
                  <div>
                    <h3 className="parler">
                      Parler
                      <Ref n={1} />
                    </h3>
                    <ul>
                      <li>Témoigner.</li>
                      <li>Dénoncer.</li>
                      <li>Critiquer.</li>
                      <li>Contester.</li>
                      <li>Appeler au boycott.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="faire-taire nowrap">
                      Faire taire
                      <Ref n={2} />
                    </h3>
                    <ul>
                      <li>Harceler.</li>
                      <li>Menacer.</li>
                      <li>Intimider.</li>
                      <li>Faire pression.</li>
                      <li>Exclure.</li>
                    </ul>
                  </div>
                </div>
                <NoteDuGreffier>
                  beaucoup de ces témoignages n&apos;ont jamais atteint un
                  tribunal classique, faute de preuves suffisantes ou de moyens
                  pour porter plainte. Pour certaines victimes, le hashtag a fait
                  ce que la justice n&apos;a pas fait.
                </NoteDuGreffier>
                <p className="t-display centre espace-l">OÙ EST LA FRONTIÈRE&nbsp;?</p>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={5} papier="oeuf" folio={["Dossier n°2017-BTP-01", "Feuille 6/9"]}>
              {/* PIÈCE 6 : la délibération */}
              <Piece
                id="piece-6"
                papier="oeuf"
                onglet={<Onglet couleur="bleu">N°6 : la délibération</Onglet>}
              >
                <h2 className="t-titre">Le problème du juge</h2>
                <p>
                  Une vidéo TikTok accuse un homme d&apos;agression sexuelle.
                  <br />4 millions de vues.
                  <br />Le témoignage est crédible.
                  <br />Les commentaires réclament une sanction.
                  <br />Et le feed vous demande de décider.
                </p>
                <Bulletin
                  question="QUEL DOIT ÊTRE SON SORT ?"
                  consigne="Choisissez. Vous avez 10 secondes. Le feed, lui, n'attendra pas."
                  choix={{
                    A: "Je partage le témoignage pour alerter",
                    B: "Je demande qu'il soit boycotté",
                    C: "Je signale son compte",
                    D: "Je condamne publiquement ses actes",
                  }}
                />
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={6} papier="rouge" folio={["Dossier n°2017-BTP-01", "Feuille 7/9"]}>
              {/* PIÈCE 7 : le verdict */}
              <Piece
                id="piece-7"
                papier="rouge"
                onglet={
                  <Onglet couleur="blanc" decalage={1}>
                    N°7 : le verdict
                  </Onglet>
                }
              >
                <p className="t-display">
                  <RappelDuVote />
                </p>
                <p>
                  La vidéo TikTok de la pièce précédente existait dans notre
                  scénario. L&apos;homme accusé y perdait son travail avant que qui
                  que ce soit vérifie quoi que ce soit. Personne ne rouvre jamais
                  la vidéo pour remettre les vues à zéro.
                </p>
                <p className="t-fort citation-verdict">
                  C&apos;est ça, le tribunal du feed : il rend un verdict à la
                  vitesse d&apos;un scroll, et il ne revient jamais sur ses
                  jugements.
                </p>
                <div className="espace-l">
                  <Registre titre="pièce n°7" manquantes={4}>
                    Appel : impossible. Personne ne rouvre la vidéo, personne ne
                    rejuge.
                  </Registre>
                </div>
              </Piece>
            </FeuilleVolante>

            <FeuilleVolante index={7} papier="blanc" folio={["Dossier n°2017-BTP-01", "Feuille 8/9"]}>
              {/* PIÈCE 8 : la clôture */}
              <Piece
                id="piece-8"
                onglet={
                  <Onglet couleur="jaune" decalage={2}>
                    N°8 : la clôture
                  </Onglet>
                }
              >
                <p>
                  Internet ne nous a pas donné un tribunal. Il nous a donné une
                  voix, collective, immédiate, parfois la seule que certaines
                  victimes aient jamais eue.
                </p>
                <p>
                  Le vrai problème : on a appris à s&apos;en servir comme un
                  tribunal, avec un verdict, sans preuve, sans défense, sans
                  retour en arrière possible.
                </p>
                <div className="registre">
                  <p className="registre__titre">Registre des garanties, bilan</p>
                  <div className="registre__ligne">
                    <p className="registre__ligne-titre">
                      Un vrai tribunal : l&apos;affaire Sandra Muller, 2019-2022
                      <Ref n={3} />
                      <Ref n={4} />
                    </p>
                    <ListeGaranties etat={() => "ok"} />
                    <p className="registre__commentaire t-petit">
                      Condamnée, puis relaxée en appel. Le hashtag lui-même a eu
                      droit à un procès.
                    </p>
                  </div>
                  <div className="registre__ligne">
                    <p className="registre__ligne-titre">Le tribunal du feed</p>
                    <ListeGaranties etat={() => "manque"} />
                  </div>
                </div>
                <p className="t-titre centre espace-l">
                  La liberté d&apos;expression permet à quelqu&apos;un de dénoncer
                  publiquement une situation, mais cette même liberté permet
                  ensuite à une foule de réagir, de condamner, de faire pression,
                  et parfois de basculer dans la cancel culture.
                </p>
                <p className="t-mention centre espace-l">
                  FIN DU PROCÈS. (Le vôtre continue.)
                </p>
                <aside className="encart espace-l">
                  <p className="encart__titre">Le saviez-vous&nbsp;?</p>
                  <p>
                    La devise du KGB est «&nbsp;Loyauté au Parti, loyauté à la
                    Patrie&nbsp;». La phrase «&nbsp;Faites confiance, mais
                    vérifiez&nbsp;» est un proverbe russe devenu mondialement
                    célèbre à la fin de la guerre froide.
                  </p>
                  <p className="encart__chute">On a fait confiance, mais on a vérifié&nbsp;!</p>
                </aside>
              </Piece>
            </FeuilleVolante>

          {/* ANNEXE : les preuves */}
            <FeuilleVolante index={8} folio={["Dossier n°2017-BTP-01, annexe", "Feuille 9/9"]} id="annexe">
            <Entete droite="Dossier n°2017-BTP-01, annexe" actif="/histoires/" />
            <Piece
              id="bordereau"
              onglet={<Onglet couleur="rose">Annexe : les preuves</Onglet>}
            >
              <h2 className="t-titre">Bordereau des pièces</h2>
              <p>
                Contrairement au feed, ce dossier donne ses preuves. Chaque
                renvoi <span className="ref">[n]</span> du texte mène à une
                source ci-dessous.
              </p>
              <Bordereau groupes={SOURCES} />
            </Piece>
            </FeuilleVolante>
          </Liasse>
        </div>
      </Audience>

      <p className="retour">
        <Link href="/histoires/">Refermer le dossier et revenir à nos histoires</Link>
      </p>
      <Pied />
    </main>
  );
}
