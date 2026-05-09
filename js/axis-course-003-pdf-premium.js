(() => {
  "use strict";

  const COURSE = {
    title: "Cours 3 — Maintenir son temple propre au quotidien",
    subtitle: "Transformer l’hygiène du quotidien en protocole vivant",
    cover: "assets/courses/course-003/cover.png",
    images: [
      "assets/courses/course-003/cover.png",
      "assets/courses/course-003/pedagogical.png",
      "assets/courses/course-003/practice.png",
      "assets/courses/course-003/contemplation.png",
      "assets/courses/course-003/journal.png",
      "assets/courses/course-003/safety.png",
      "assets/courses/course-003/symbolic.png",
      "assets/courses/course-003/closing.png",
      "assets/courses/course-003/atmosphere.png"
    ],
    longSummary: "Un temple vivant n’a pas besoin d’être parfait. Il a besoin d’être entretenu. Ce cours enseigne comment l’hygiène du lieu, du corps, de l’attention, de l’alimentation symbolique et du carnet devient une pratique quotidienne.",
    essentialPhrase: "Un temple vivant ne reste clair que s’il est entretenu par des gestes simples, répétés et vrais."
  };

  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function imageFigure(src, label) {
    if (!src) return "";
    return `
      <figure class="pdf-image">
        <img src="${esc(src)}" alt="${esc(label)}">
        <figcaption>${esc(label)}</figcaption>
      </figure>
    `;
  }

  function openPdf() {
    const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${esc(COURSE.title)} — PDF premium</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #efe8d8;
    color: #152033;
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.6;
  }
  .toolbar {
    position: sticky;
    top: 0;
    z-index: 5;
    background: #06111f;
    color: white;
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid rgba(232,199,122,.35);
  }
  .toolbar button {
    cursor: pointer;
    border: 1px solid rgba(232,199,122,.65);
    background: linear-gradient(135deg, #e8c77a, #9b6d24);
    color: #06111f;
    font-weight: 700;
    padding: 10px 18px;
    border-radius: 999px;
  }
  .page {
    width: min(920px, calc(100% - 32px));
    margin: 24px auto;
    background: #fffaf0;
    border: 1px solid rgba(184,137,46,.35);
    box-shadow: 0 18px 70px rgba(0,0,0,.16);
  }
  .cover {
    background: #06111f;
    color: #fff4d2;
    min-height: 1050px;
    display: flex;
    flex-direction: column;
  }
  .cover img {
    width: 100%;
    height: 760px;
    object-fit: cover;
    display: block;
  }
  .cover-text {
    padding: 46px 58px;
  }
  .kicker {
    text-transform: uppercase;
    letter-spacing: .18em;
    color: #d8af58;
    font-size: 12px;
  }
  h1 {
    margin: 8px 0 0;
    font-size: 44px;
    line-height: 1.08;
  }
  h2 {
    color: #8a6222;
    border-bottom: 1px solid rgba(184,137,46,.35);
    padding-bottom: 8px;
    margin-top: 34px;
  }
  h3 { color: #17304f; }
  .inner { padding: 50px 64px; }
  .quote {
    margin: 28px 0;
    padding: 20px 24px;
    border-left: 4px solid #d8af58;
    background: rgba(184,137,46,.08);
    font-size: 20px;
    color: #6f4d17;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }
  .pdf-image {
    margin: 0;
    break-inside: avoid;
    border: 1px solid rgba(184,137,46,.25);
    background: white;
  }
  .pdf-image img {
    width: 100%;
    display: block;
    aspect-ratio: 4 / 5;
    object-fit: cover;
  }
  .pdf-image figcaption {
    font-size: 12px;
    color: #7b5a20;
    padding: 8px 10px;
  }
  .notice {
    margin-top: 34px;
    padding: 18px;
    border: 1px solid rgba(184,137,46,.35);
    background: rgba(6,17,31,.06);
    font-size: 13px;
  }
  @media print {
    .toolbar { display: none; }
    body { background: white; }
    .page { width: 100%; margin: 0; box-shadow: none; border: none; page-break-after: always; }
    .cover { min-height: 100vh; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <button onclick="window.print()">Imprimer / enregistrer en PDF</button>
  </div>

  <section class="page cover">
    <img src="${esc(COURSE.cover)}" alt="${esc(COURSE.title)}">
    <div class="cover-text">
      <div class="kicker">Axis Lumen Studio · École du Temple Vivant</div>
      <h1>${esc(COURSE.title)}</h1>
      <p>${esc(COURSE.subtitle)}</p>
      <p>${esc(COURSE.longSummary)}</p>
    </div>
  </section>

  <section class="page">
    <div class="inner">
      <div class="kicker">Module premium · 1 heure</div>
      <h2>Objectifs</h2>
      <h3>Objectif pédagogique</h3>
      <p>Comprendre comment l’hygiène du lieu, du corps, de l’attention et du carnet influence directement la qualité des pratiques Axis Lumen.</p>
      <h3>Objectif initiatique</h3>
      <p>Installer une discipline simple, quotidienne et non rigide, afin que le corps devienne progressivement une demeure plus claire pour l’attention, la lumière intérieure et la pensée rythmée.</p>

      <h2>Plan du module</h2>
      <ul>
        <li><strong>0–5 min</strong> — Entrée dans le seuil.</li>
        <li><strong>5–12 min</strong> — Comprendre le temple quotidien.</li>
        <li><strong>12–22 min</strong> — Identifier les encombrements.</li>
        <li><strong>22–32 min</strong> — Les sept gestes de maintien.</li>
        <li><strong>32–45 min</strong> — Pratique guidée.</li>
        <li><strong>45–52 min</strong> — Observation et carnet.</li>
        <li><strong>52–58 min</strong> — Clôture.</li>
        <li><strong>58–60 min</strong> — Validation.</li>
      </ul>

      <h2>Enseignement complet</h2>
      <p>Le temple n’est pas un décor. C’est le corps réel, le lieu réel, le souffle réel, la pensée réelle. Maintenir son temple propre, ce n’est pas chercher une perfection extérieure ; c’est apprendre à retirer ce qui brouille la présence.</p>
      <p>La propreté juste n’est pas une obsession de pureté. Elle consiste à retirer ce qui empêche la circulation : trop d’objets, trop d’écrans, trop de paroles, trop de nourriture morte, trop de pensées répétées.</p>
      <p>Chaque jour, quelque chose entre en nous : nourriture, eau, images, paroles, musiques, informations, émotions. Maintenir son temple propre commence par redevenir gardien du seuil.</p>
      <p>Tout ce qui entre ne doit pas rester. Le corps possède ses portes de sortie ; l’intériorité aussi : parole juste, écriture, mouvement doux, respiration naturelle, silence et clôture.</p>
      <p>Un temple propre n’est pas vide. C’est un espace où le souffle, l’eau, l’attention, la pensée et la lumière intérieure circulent sans stagnation.</p>

      <div class="quote">${esc(COURSE.essentialPhrase)}</div>
    </div>
  </section>

  <section class="page">
    <div class="inner">
      <h2>Planches visuelles du cours</h2>
      <div class="grid">
        ${COURSE.images.map((src, index) => imageFigure(src, "Planche " + (index + 1))).join("")}
      </div>
    </div>
  </section>

  <section class="page">
    <div class="inner">
      <h2>Protocole pratique</h2>
      <ol>
        <li><strong>Nettoyage du lieu — 5 min :</strong> ranger un seul espace visible.</li>
        <li><strong>Nettoyage du corps — 5 min :</strong> sentir les pieds, les mains, le bassin, la colonne ; boire une gorgée d’eau.</li>
        <li><strong>Nettoyage de l’attention — 5 min :</strong> fermer les yeux, observer ce qui occupe l’esprit sans le combattre.</li>
        <li><strong>Lumière douce optionnelle — 3 min :</strong> regarder l’ambiance lumineuse ou une lampe douce sans fixation dure.</li>
        <li><strong>Dépôt intérieur — 4 min :</strong> laisser l’attention se déposer dans le cœur, le ventre ou la colonne.</li>
        <li><strong>Carnet — 2 min :</strong> noter ce qui encombrait, ce qui s’est clarifié, le geste à maintenir demain.</li>
        <li><strong>Clôture — 1 min :</strong> sentir les appuis, bouger les doigts et les orteils, ouvrir les yeux lentement.</li>
      </ol>

      <h2>Questions de carnet</h2>
      <ul>
        <li>Quel était l’état de mon lieu avant la pratique ?</li>
        <li>Quel était l’état de mon corps ?</li>
        <li>Quelle forme d’encombrement était la plus présente ?</li>
        <li>Quel geste simple a changé l’ambiance ?</li>
        <li>Qu’ai-je laissé sortir ?</li>
        <li>Qu’ai-je choisi de garder ?</li>
        <li>Quel geste vais-je répéter demain ?</li>
      </ul>

      <h2>Validation</h2>
      <p>Le cours est validé lorsque l’élève a pratiqué pendant trois jours consécutifs : un geste de clarté dans le lieu, une minute de retour au corps, trois lignes de carnet, une clôture consciente.</p>

      <div class="notice">
        <strong>Notice de protection</strong><br>
        PDF protégé — Axis Lumen Studio / École du Temple Vivant. Usage personnel réservé à l’élève. Toute reproduction ou diffusion non autorisée est interdite.<br><br>
        © Axis Lumen Studio — Tous droits réservés.
      </div>
    </div>
  </section>
</body>
</html>`;

    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      alert("La fenêtre PDF a été bloquée par le navigateur. Autorise les popups pour générer le PDF premium.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".axis-course-003-pdf-button");
    if (!button) return;
    event.preventDefault();
    openPdf();
  });

  window.AxisCourse003Pdf = { open: openPdf };
})();