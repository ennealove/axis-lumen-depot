
/* Axis Lumen Studio — Cours 002 images + PDF premium */
(function () {
  const COURSE_002_IMAGES = {
  "cover": "assets/courses/course-002/cover.webp",
  "gallery": [
    "assets/courses/course-002/cover.webp",
    "assets/courses/course-002/course-002-image-02.webp",
    "assets/courses/course-002/course-002-image-03.webp",
    "assets/courses/course-002/course-002-image-04.webp",
    "assets/courses/course-002/course-002-image-05.webp",
    "assets/courses/course-002/course-002-image-06.webp",
    "assets/courses/course-002/course-002-image-07.webp",
    "assets/courses/course-002/course-002-image-08.webp",
    "assets/courses/course-002/course-002-image-09.webp"
  ],
  "pedagogical": [
    "assets/courses/course-002/course-002-image-02.webp",
    "assets/courses/course-002/course-002-image-03.webp",
    "assets/courses/course-002/course-002-image-04.webp"
  ],
  "contemplative": "assets/courses/course-002/course-002-image-05.webp",
  "exercise": "assets/courses/course-002/course-002-image-06.webp"
};
  const COURSE_002_GALLERY = COURSE_002_IMAGES.gallery || [];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getCourse002() {
    const list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
    const course =
      list.find((c) => Number(c.number) === 2) ||
      list.find((c) => String(c.id || "").includes("002")) ||
      list.find((c) => String(c.title || "").includes("Règles de sécurité")) ||
      null;

    if (!course) return null;

    course.image = COURSE_002_IMAGES.cover;
    course.coverImage = COURSE_002_IMAGES.cover;
    course.images = Object.assign({}, course.images || {}, COURSE_002_IMAGES);
    course.pdfPremium = true;

    return course;
  }

  function paragraph(text) {
    if (!text) return "";
    return "<p>" + escapeHtml(text) + "</p>";
  }

  function list(items) {
    if (!Array.isArray(items) || !items.length) return "";
    return "<ul>" + items.map((item) => "<li>" + escapeHtml(typeof item === "string" ? item : item.title || item.content || item.text || "") + "</li>").join("") + "</ul>";
  }

  function minutePlan(course) {
    const plan = course.minutePlan || [];
    if (!Array.isArray(plan) || !plan.length) return "";
    return `
      <section>
        <h2>Plan du module — 60 minutes</h2>
        <div class="minute-plan">
          ${plan.map((item) => `
            <article>
              <strong>${escapeHtml(item.time || "")}</strong>
              <h3>${escapeHtml(item.title || "")}</h3>
              <p>${escapeHtml(item.content || "")}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function teaching(course) {
    const t = course.teaching || {};
    const sections = Array.isArray(t.sections) ? t.sections : [];
    return `
      <section>
        <h2>Enseignement complet</h2>
        ${paragraph(t.intro || course.richTeaching || course.summary || "")}
        ${sections.map((s) => `
          <article class="teaching-section">
            <h3>${escapeHtml(s.title || "")}</h3>
            <p>${escapeHtml(s.content || "")}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function practice(course) {
    const p = course.practice || {};
    return `
      <section>
        <h2>Pratique guidée</h2>
        <h3>${escapeHtml(p.name || "Pratique associée")}</h3>
        ${paragraph(p.intention)}
        <div class="meta-grid">
          <div><strong>Durée</strong><br>${escapeHtml(p.duration || course.duration || "1 h")}</div>
          <div><strong>Matériel</strong><br>${escapeHtml(p.material || "Lieu calme, carnet, lumière douce si nécessaire.")}</div>
          <div><strong>Posture</strong><br>${escapeHtml(p.posture || "Posture stable, respiration naturelle.")}</div>
        </div>
        <h3>Étapes</h3>
        ${list(p.steps || course.richPracticeSteps)}
        <h3>Adaptations</h3>
        ${list(p.adaptations)}
        <div class="safety"><strong>Sécurité :</strong> ${escapeHtml(p.safety || "Arrêter en cas de gêne, vertige, fatigue visuelle, douleur ou inconfort.")}</div>
      </section>
    `;
  }

  function contemplation(course) {
    const c = course.contemplation || {};
    return `
      <section>
        <h2>Contemplation</h2>
        <p><strong>Durée :</strong> ${escapeHtml(c.duration || "5 à 10 min")}</p>
        ${paragraph(c.question)}
        ${paragraph(c.guidance)}
      </section>
    `;
  }

  function vocalScript(course) {
    const v = course.vocalScript || [];
    if (!Array.isArray(v) || !v.length) return "";
    return `
      <section>
        <h2>Script vocal</h2>
        ${v.map((item) => `
          <article>
            <strong>${escapeHtml(item.time || "")}</strong>
            <h3>${escapeHtml(item.title || "")}</h3>
            <p>${escapeHtml(item.text || "")}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function imagesBlock() {
    if (!COURSE_002_GALLERY.length) return "";
    return `
      <section>
        <h2>Galerie du cours</h2>
        <div class="image-grid">
          ${COURSE_002_GALLERY.map((src, index) => `
            <figure>
              <img src="${escapeHtml(src)}" alt="Cours 2 — image ${index + 1}">
              <figcaption>Image ${index + 1} — sécurité, discernement et sobriété</figcaption>
            </figure>
          `).join("")}
        </div>
      </section>
    `;
  }

  function openCourse002Pdf() {
    const course = getCourse002();
    if (!course) {
      alert("Cours 2 introuvable dans AXIS_ONE_HOUR_COURSES.");
      return;
    }

    const title = course.title || "Cours 2 — Règles de sécurité, discernement et sobriété";
    const subtitle = course.subtitle || "Cadre, sécurité, discipline, progression";
    const cover = COURSE_002_IMAGES.cover;

    const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
<style>
  :root {
    --bg: #07101c;
    --panel: #0d1726;
    --ink: #1a2230;
    --gold: #d9b46f;
    --soft: #f4efe5;
    --muted: #6f7785;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    color: var(--ink);
    background: #ece7dc;
  }

  .cover {
    min-height: 100vh;
    padding: 48px;
    color: var(--soft);
    background:
      linear-gradient(180deg, rgba(7,16,28,.18), rgba(7,16,28,.93)),
      url("${escapeHtml(cover)}") center / cover no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    page-break-after: always;
  }

  .cover-box {
    max-width: 780px;
    padding: 34px;
    border: 1px solid rgba(217,180,111,.55);
    background: rgba(7,16,28,.72);
    box-shadow: 0 22px 80px rgba(0,0,0,.38);
  }

  .kicker {
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    font-size: 12px;
  }

  h1 {
    margin: 12px 0 10px;
    font-size: 42px;
    line-height: 1.08;
  }

  h2 {
    margin: 0 0 18px;
    color: #8a6429;
    font-size: 25px;
    border-bottom: 1px solid rgba(138,100,41,.25);
    padding-bottom: 8px;
  }

  h3 {
    margin: 14px 0 8px;
    color: #26354a;
  }

  main {
    max-width: 980px;
    margin: 0 auto;
    background: #fffaf0;
  }

  section {
    padding: 34px 44px;
    page-break-inside: avoid;
    border-bottom: 1px solid rgba(0,0,0,.08);
  }

  p, li {
    font-size: 16px;
    line-height: 1.72;
  }

  .lead {
    font-size: 19px;
    line-height: 1.68;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin: 18px 0;
  }

  .meta-grid div, .minute-plan article, .teaching-section, .safety {
    padding: 16px;
    border: 1px solid rgba(138,100,41,.18);
    background: rgba(217,180,111,.08);
    border-radius: 14px;
  }

  .minute-plan {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
  }

  figure {
    margin: 0;
    border: 1px solid rgba(138,100,41,.18);
    background: #0b1422;
    padding: 10px;
    border-radius: 16px;
    page-break-inside: avoid;
  }

  figure img {
    width: 100%;
    border-radius: 12px;
    display: block;
  }

  figcaption {
    padding: 8px 4px 2px;
    color: #f4efe5;
    font-size: 12px;
    letter-spacing: .04em;
  }

  .notice {
    padding: 28px 44px 42px;
    background: #07101c;
    color: #f4efe5;
  }

  .notice strong {
    color: var(--gold);
  }

  .print-bar {
    position: fixed;
    right: 18px;
    top: 18px;
    z-index: 10;
  }

  .print-bar button {
    border: 0;
    border-radius: 999px;
    padding: 12px 18px;
    background: #d9b46f;
    color: #07101c;
    font-weight: 700;
    cursor: pointer;
  }

  @media print {
    .print-bar { display: none; }
    body { background: white; }
    main { max-width: none; }
    section { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="print-bar"><button onclick="window.print()">Imprimer / enregistrer en PDF</button></div>

<header class="cover">
  <div class="cover-box">
    <div class="kicker">Axis Lumen Studio — École du Temple Vivant</div>
    <h1>${escapeHtml(title)}</h1>
    <p class="lead">${escapeHtml(subtitle)}</p>
    <p>${escapeHtml(course.essentialPhrase || "La sécurité est la condition d’une profondeur durable.")}</p>
  </div>
</header>

<main>
  <section>
    <h2>Résumé long</h2>
    <p class="lead">${escapeHtml(course.longSummary || course.summary || "")}</p>
  </section>

  <section>
    <h2>Objectifs</h2>
    <h3>Objectif pédagogique</h3>
    ${paragraph(course.pedagogicalObjective)}
    <h3>Objectif initiatique</h3>
    ${paragraph(course.initiaticObjective)}
  </section>

  ${imagesBlock()}
  ${minutePlan(course)}
  ${teaching(course)}
  ${contemplation(course)}
  ${practice(course)}
  ${vocalScript(course)}

  <section>
    <h2>Questions de carnet</h2>
    ${list(course.journalQuestions)}
  </section>

  <section>
    <h2>Références et validation</h2>
    <h3>Références</h3>
    ${list(course.references)}
    <h3>Validation</h3>
    ${list(course.validation)}
  </section>

  <section>
    <h2>Phrase essentielle</h2>
    <p class="lead">${escapeHtml(course.essentialPhrase || "")}</p>
    <p>${escapeHtml(course.shortPhrase || "")}</p>
  </section>

  <div class="notice">
    <p><strong>Notice de protection :</strong> ${escapeHtml(course.pdf?.protectedNotice || "Support réservé à l’usage personnel de l’élève Axis Lumen Studio.")}</p>
    <p>© Axis Lumen Studio / Michael Chauvet — Tous droits réservés. Reproduction, redistribution, revente ou extraction interdite sans autorisation.</p>
  </div>
</main>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (!win) {
      alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les popups pour ce site local.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
  }

  function enhanceCourse002Card() {
    const course = getCourse002();
    if (!course || !COURSE_002_IMAGES.cover) return;

    const cards = Array.from(document.querySelectorAll(".axis-learn-card, [class*='course-card'], article, .card"));
    cards.forEach((card) => {
      const text = card.textContent || "";
      if (!text.includes("Règles de sécurité") && !text.includes("Cours 2") && !text.includes("02")) return;
      if (!text.includes("discernement") && !text.includes("sobriété") && !text.includes("Règles de sécurité")) return;

      if (!card.querySelector("img")) {
        const imgWrap = document.createElement("figure");
        imgWrap.className = "axis-course-002-forced-cover";
        imgWrap.innerHTML = `<img src="${escapeHtml(COURSE_002_IMAGES.cover)}" alt="Cours 2 — Règles de sécurité, discernement et sobriété" loading="lazy">`;
        card.insertBefore(imgWrap, card.firstChild);
      }
    });
  }

  function isCourse002Context(el) {
    const card = el.closest(".axis-learn-card, article, .card, #axisLearnReader");
    const text = card ? card.textContent || "" : document.querySelector("#axisLearnReader")?.textContent || "";
    return text.includes("Règles de sécurité") || text.includes("discernement et sobriété") || text.includes("Cours 2");
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("button, a");
    if (!trigger) return;

    const label = (trigger.textContent || trigger.getAttribute("aria-label") || "").toLowerCase();
    if (!label.includes("pdf")) return;
    if (!isCourse002Context(trigger)) return;

    event.preventDefault();
    event.stopPropagation();
    openCourse002Pdf();
  }, true);

  const previousOpenPrintablePdf = window.openPrintablePdf;
  if (typeof previousOpenPrintablePdf === "function") {
    window.openPrintablePdf = function (course) {
      if (course && (Number(course.number) === 2 || String(course.title || "").includes("Règles de sécurité"))) {
        openCourse002Pdf();
        return;
      }
      return previousOpenPrintablePdf.apply(this, arguments);
    };
  } else {
    window.openPrintablePdfCourse002 = openCourse002Pdf;
  }

  const style = document.createElement("style");
  style.textContent = `
    .axis-course-002-forced-cover {
      margin: 0 0 14px;
      border-radius: 22px;
      overflow: hidden;
      border: 1px solid rgba(232, 190, 103, .22);
      background: rgba(255,255,255,.04);
    }
    .axis-course-002-forced-cover img {
      width: 100%;
      display: block;
      aspect-ratio: 4 / 3;
      object-fit: cover;
    }
  `;
  document.head.appendChild(style);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceCourse002Card);
  } else {
    enhanceCourse002Card();
  }

  new MutationObserver(enhanceCourse002Card).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
