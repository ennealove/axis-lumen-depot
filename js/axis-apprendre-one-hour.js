(() => {
  "use strict";

  const ROOT_ID = "axisOneHourSchool";
  const COPYRIGHT = "© Axis Lumen Studio / Michael Chauvet — Tous droits réservés. Reproduction, redistribution, revente ou extraction interdite sans autorisation.";

  const families = Array.isArray(window.AXIS_ONE_HOUR_FAMILIES) ? window.AXIS_ONE_HOUR_FAMILIES : [];
  const courses = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];

  const state = {
    family: "all",
    search: "",
    selected: courses[0]?.id || ""
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function filteredCourses() {
    const q = normalize(state.search);
    return courses.filter((course) => {
      const byFamily = state.family === "all" || course.familyId === state.family;
      const blob = normalize([
        course.title,
        course.subtitle,
        course.familyTitle,
        course.summary,
        course.teaching,
        course.tags?.join(" ")
      ].join(" "));
      const bySearch = !q || blob.includes(q);
      return byFamily && bySearch;
    });
  }

  function familyButtonsHtml() {
    const allCount = courses.length;
    const buttons = [
      `<button class="axis-onehour-family ${state.family === "all" ? "active" : ""}" data-family="all">
        <strong>◎ Tous les cours</strong>
        <small>${allCount} cours d’une heure — école complète</small>
      </button>`
    ];

    families
      .slice()
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0))
      .forEach((family) => {
        const count = courses.filter((course) => course.familyId === family.id).length;
        buttons.push(`
          <button class="axis-onehour-family ${state.family === family.id ? "active" : ""}" data-family="${escapeHtml(family.id)}">
            <strong>${escapeHtml(family.symbol)} ${escapeHtml(family.title)}</strong>
            <small>${count} cours — ${escapeHtml(family.subtitle)}</small>
          </button>
        `);
      });

    return buttons.join("");
  }

  function cardHtml(course) {
    const tags = (course.tags || []).slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const cover = course.coverImage || course.image || course.images?.cover || "";
    const pdfPath = course.pdf?.path || course.pdfPath || "";
    const summary = course.shortSummary || course.summary || course.longSummary || "";

    return `
      <article class="axis-onehour-card" data-course-id="${escapeHtml(course.id)}">
        <div class="axis-onehour-card-top">
          <span class="axis-onehour-number">${String(course.number).padStart(2, "0")}</span>
          <span class="axis-onehour-symbol">${escapeHtml(course.symbol || "◎")}</span>
        </div>

        ${cover ? `<figure class="axis-onehour-course-cover"><img src="${escapeHtml(cover)}" alt="${escapeHtml(course.title)}" loading="lazy"></figure>` : ""}

        <div>
          <p class="axis-onehour-kicker">${escapeHtml(course.family || course.familyTitle || "École du Temple Vivant")}</p>
          <h3>${escapeHtml(course.title)}</h3>
          ${course.subtitle ? `<p class="axis-onehour-subtitle">${escapeHtml(course.subtitle)}</p>` : ""}
          <p>${escapeHtml(summary)}</p>
        </div>

        <div class="axis-onehour-tags">
          ${tags}
          <span>${escapeHtml(course.duration || "1 h")}</span>
          <span>${escapeHtml(course.level || "Fondation")}</span>
        </div>

        <div class="axis-onehour-actions">
          <button class="axis-onehour-btn primary" data-action="open" data-course="${escapeHtml(course.id)}">Lire le cours</button>
          <button class="axis-onehour-btn" data-action="session" data-course="${escapeHtml(course.id)}">Pratiquer</button>
          <button class="axis-onehour-btn" data-action="pdf" data-course="${escapeHtml(course.id)}">${pdfPath ? "Ouvrir PDF" : "PDF premium"}</button>
        </div>
      </article>
    `;
  }

  function readerHtml(course) {
    if (!course) {
      return `<div class="axis-onehour-reader axis-onehour-empty">Sélectionne un cours pour ouvrir le lecteur.</div>`;
    }

    const list = (items) => (items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const cover = course.coverImage || course.image || course.images?.cover || "";
    const pdfPath = course.pdf?.path || course.pdfPath || "";
    const summary = course.longSummary || course.summary || "";

    const imageItems = [
      course.images?.cover,
      ...(course.images?.pedagogical || []),
      course.images?.contemplative,
      course.images?.exercise
    ].filter(Boolean).filter((value, index, array) => array.indexOf(value) === index);

    const imageGallery = imageItems.length
      ? `
        <section class="axis-course-rich-section">
          <h4>Images du cours</h4>
          <div class="axis-course-image-gallery">
            ${imageItems.map((src, index) => `
              <figure>
                <img src="${escapeHtml(src)}" alt="Image pédagogique ${index + 1} — ${escapeHtml(course.title)}" loading="lazy">
              </figure>
            `).join("")}
          </div>
        </section>
      `
      : "";

    const objectiveHtml = `
      ${course.pedagogicalObjective ? `<div class="axis-course-rich-box"><h4>Objectif pédagogique</h4><p>${escapeHtml(course.pedagogicalObjective)}</p></div>` : ""}
      ${course.initiaticObjective ? `<div class="axis-course-rich-box"><h4>Objectif initiatique</h4><p>${escapeHtml(course.initiaticObjective)}</p></div>` : ""}
    `;

    const planItems = Array.isArray(course.minutePlan) && course.minutePlan.length
      ? course.minutePlan.map((line) => `<li><strong>${escapeHtml(line.time)}</strong> — ${escapeHtml(line.title)}<br><span>${escapeHtml(line.content)}</span></li>`).join("")
      : (course.plan || []).map((line) => `<li>${escapeHtml(line)}</li>`).join("");

    const teachingHtml = course.teaching && typeof course.teaching === "object"
      ? `
        ${course.teaching.intro ? `<p>${escapeHtml(course.teaching.intro)}</p>` : ""}
        ${(course.teaching.sections || []).map((section) => `
          <div class="axis-course-rich-subsection">
            <h5>${escapeHtml(section.title)}</h5>
            <p>${escapeHtml(section.content)}</p>
          </div>
        `).join("")}
      `
      : `<p>${escapeHtml(course.teaching || "")}</p>`;

    const contemplationHtml = course.contemplation
      ? `
        <h4>Contemplation</h4>
        <p><strong>Durée :</strong> ${escapeHtml(course.contemplation.duration || "")}</p>
        <p><strong>Question :</strong> ${escapeHtml(course.contemplation.question || "")}</p>
        <p>${escapeHtml(course.contemplation.guidance || "")}</p>
      `
      : "";

    const practice = course.practice && typeof course.practice === "object"
      ? course.practice
      : { name: "Pratique associée", steps: [course.practice || ""] };

    const practiceHtml = `
      <h4>Exercice pratique détaillé</h4>
      ${practice.name ? `<p><strong>${escapeHtml(practice.name)}</strong></p>` : ""}
      ${practice.duration ? `<p><strong>Durée :</strong> ${escapeHtml(practice.duration)}</p>` : ""}
      ${practice.intention ? `<p><strong>Intention :</strong> ${escapeHtml(practice.intention)}</p>` : ""}
      ${practice.material ? `<p><strong>Matériel :</strong> ${escapeHtml(practice.material)}</p>` : ""}
      ${practice.posture ? `<p><strong>Posture :</strong> ${escapeHtml(practice.posture)}</p>` : ""}
      ${(practice.steps || []).length ? `<ol>${list(practice.steps)}</ol>` : ""}
      ${(practice.adaptations || []).length ? `<h5>Adaptations</h5><ul>${list(practice.adaptations)}</ul>` : ""}
      ${practice.safety ? `<div class="axis-course-safety"><strong>Prudence</strong><p>${escapeHtml(practice.safety)}</p></div>` : ""}
    `;

    const vocalHtml = (course.vocalScript || []).length
      ? `
        <h4>Script vocal</h4>
        ${(course.vocalScript || []).map((line) => `
          <div class="axis-course-vocal-line">
            <strong>${escapeHtml(line.time)} — ${escapeHtml(line.title)}</strong>
            <p>${escapeHtml(line.text)}</p>
          </div>
        `).join("")}
      `
      : "";

    const journalHtml = (course.journalQuestions || []).length
      ? `<h4>Questions de carnet</h4><ul>${list(course.journalQuestions)}</ul>`
      : "";

    const refsHtml = (course.references || []).length
      ? `<h4>Références</h4><ul>${list(course.references)}</ul>`
      : "";

    const validationHtml = (course.validation || []).length
      ? `<h4>Validation</h4><ul>${list(course.validation)}</ul>`
      : "";

    return `
      <aside class="axis-onehour-reader" id="axisOneHourReader">
        <div class="axis-course-premium-reader">
          <p class="axis-onehour-kicker">Cours ${String(course.number).padStart(3, "0")} · ${escapeHtml(course.duration || "1 h")} · ${escapeHtml(course.level || "Fondation")}</p>
          <h3>${escapeHtml(course.title)}</h3>
          ${course.subtitle ? `<p class="axis-course-premium-subtitle">${escapeHtml(course.subtitle)}</p>` : ""}
          ${cover ? `<figure class="axis-course-rich-cover"><img src="${escapeHtml(cover)}" alt="${escapeHtml(course.title)}" loading="lazy"></figure>` : ""}
          <p>${escapeHtml(summary)}</p>

          ${imageGallery}

          <section class="axis-course-rich-section">${objectiveHtml}</section>

          <section class="axis-course-rich-section">
            <h4>Plan du module</h4>
            <ul>${planItems}</ul>
          </section>

          <section class="axis-course-rich-section">
            <h4>Enseignement complet</h4>
            ${teachingHtml}
          </section>

          <section class="axis-course-rich-section">
            ${contemplationHtml}
            ${practiceHtml}
          </section>

          <section class="axis-course-rich-section">
            ${vocalHtml}
            ${journalHtml}
          </section>

          <section class="axis-course-rich-section">
            ${course.essentialPhrase ? `<h4>Phrase essentielle</h4><blockquote>${escapeHtml(course.essentialPhrase)}</blockquote>` : ""}
            ${refsHtml}
            ${pdfPath ? `<h4>PDF source</h4><p>${escapeHtml(course.pdf?.protectedNotice || "Support imprimable du cours.")}</p><p><a class="axis-onehour-btn" href="${escapeHtml(pdfPath)}" target="_blank" rel="noopener">Ouvrir le PDF source</a></p>` : ""}
            ${validationHtml}
          </section>

          <div class="axis-onehour-actions">
            <button class="axis-onehour-btn primary" data-action="pdf" data-course="${escapeHtml(course.id)}">Générer le PDF premium</button>
            <button class="axis-onehour-btn" data-action="session" data-course="${escapeHtml(course.id)}">Envoyer vers Créer sa séance</button>
          </div>

          <div class="axis-onehour-copyright">${escapeHtml(course.copyright || COPYRIGHT)}</div>
        </div>
      </aside>
    `;
  }

  function render() {
    const root = document.getElementById(ROOT_ID);
    if (!root) return;

    const list = filteredCourses();
    const selected = courses.find((course) => course.id === state.selected) || list[0] || courses[0];

    if (selected) state.selected = selected.id;

    root.innerHTML = `
      <div class="axis-onehour-head">
        <div>
          <p class="axis-onehour-kicker">ÉCOLE DU TEMPLE VIVANT</p>
          <h2>Cours d’une heure — enseignement, pratique et intégration</h2>
          <p>
            Chaque cours devient un véritable module d’environ une heure : un enseignement structuré, une image dédiée, un support PDF imprimable, un cadre de protection, des références et une pratique guidée. Les 72 portes existantes restent la base du parcours ; elles deviennent les fondations d’une grande école évolutive, pensée pour accompagner l’élève pas à pas : comprendre, pratiquer, observer, intégrer, puis valider son expérience intérieure.
          </p>
        </div>

        <div class="axis-onehour-stats">
          <div class="axis-onehour-stat">
            <strong>${courses.length}</strong>
            <span>cours 1h</span>
          </div>
          <div class="axis-onehour-stat">
            <strong>${families.length}</strong>
            <span>familles</span>
          </div>
        </div>
      </div>

      <div class="axis-onehour-toolbar">
        <input id="axisOneHourSearch" type="search" placeholder="Rechercher : lumière, eau, clairvoyance, protection..." value="${escapeHtml(state.search)}">
        <select id="axisOneHourFamily">
          <option value="all">Toutes les familles</option>
          ${families.map((family) => `<option value="${escapeHtml(family.id)}" ${state.family === family.id ? "selected" : ""}>${escapeHtml(family.title)}</option>`).join("")}
        </select>
        <select id="axisOneHourLevel">
          <option value="">Tous niveaux</option>
          <option>Fondation</option>
          <option>Approfondissement</option>
          <option>Avancé</option>
          <option>Recherche</option>
        </select>
      </div>

      <div class="axis-onehour-layout">
        <nav class="axis-onehour-families" aria-label="Familles de cours">
          ${familyButtonsHtml()}
        </nav>

        <section>
          <div class="axis-onehour-grid">
            ${list.length ? list.map(cardHtml).join("") : `<div class="axis-onehour-empty">Aucun cours trouvé.</div>`}
          </div>
          ${readerHtml(selected)}
        </section>
      </div>
    `;

    bindControls(root);
  }

  function bindControls(root) {
    const search = root.querySelector("#axisOneHourSearch");
    const family = root.querySelector("#axisOneHourFamily");

    search?.addEventListener("input", (event) => {
      state.search = event.target.value || "";
      render();
    });

    family?.addEventListener("change", (event) => {
      state.family = event.target.value || "all";
      render();
    });

    root.querySelectorAll("[data-family]").forEach((button) => {
      button.addEventListener("click", () => {
        state.family = button.dataset.family || "all";
        render();
      });
    });

    root.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const course = courses.find((item) => item.id === button.dataset.course);
        if (!course) return;

        const action = button.dataset.action;

        if (action === "open") {
          state.selected = course.id;
          render();
          setTimeout(() => document.getElementById("axisOneHourReader")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        }

        if (action === "pdf") {
          openPrintablePdf(course);
        }

        if (action === "session") {
          sendToSession(course);
        }
      });
    });
  }

  function sendToSession(course) {
    try {
      localStorage.setItem("axis_pending_session_intention", JSON.stringify({
        source: "apprendre-cours-1h",
        courseId: course.id,
        title: course.title,
        intention: (course.practice && typeof course.practice === "object" ? (course.practice.intention || course.practice.name || course.summary || course.title) : course.practice),
        createdAt: new Date().toISOString()
      }));
    } catch {}

    window.location.href = "creer-seance.html";
  }

  function openPrintablePdf(course) {
    if (!course) return;

    const safe = (value) => escapeHtml(value == null ? "" : String(value));
    const copyrightText = course.copyright || (typeof COPYRIGHT !== "undefined" ? COPYRIGHT : "© Axis Lumen Studio / Michael Chauvet — Tous droits réservés.");

    const imageSet = [
      course.images?.cover || course.coverImage || course.image,
      ...(course.images?.pedagogical || []),
      course.images?.contemplative,
      course.images?.exercise
    ].filter(Boolean).filter((value, index, array) => array.indexOf(value) === index);

    const section = (title, body) => body ? `<section class="pdf-section"><h2>${safe(title)}</h2>${body}</section>` : "";
    const ul = (items) => Array.isArray(items) && items.length ? `<ul>${items.map((x) => `<li>${safe(x)}</li>`).join("")}</ul>` : "";
    const ol = (items) => Array.isArray(items) && items.length ? `<ol>${items.map((x) => `<li>${safe(x)}</li>`).join("")}</ol>` : "";

    const imageFigure = (src, label) => src ? `
      <figure class="pdf-image">
        <img src="${safe(src)}" alt="${safe(label)}">
        <figcaption>${safe(label)}</figcaption>
      </figure>
    ` : "";

    const minutePlan = Array.isArray(course.minutePlan) && course.minutePlan.length
      ? `<ul>${course.minutePlan.map((line) => `
          <li><strong>${safe(line.time)} — ${safe(line.title)}</strong><br>${safe(line.content)}</li>
        `).join("")}</ul>`
      : ul(course.plan || []);

    const teaching = course.teaching && typeof course.teaching === "object"
      ? `
        ${course.teaching.intro ? `<p>${safe(course.teaching.intro)}</p>` : ""}
        ${(course.teaching.sections || []).map((s) => `
          <div class="pdf-subsection">
            <h3>${safe(s.title)}</h3>
            <p>${safe(s.content)}</p>
          </div>
        `).join("")}
      `
      : `<p>${safe(course.teaching || "")}</p>`;

    const contemplation = course.contemplation
      ? `
        <p><strong>Durée :</strong> ${safe(course.contemplation.duration || "")}</p>
        <p><strong>Question :</strong> ${safe(course.contemplation.question || "")}</p>
        <p>${safe(course.contemplation.guidance || "")}</p>
      `
      : "";

    const practice = course.practice && typeof course.practice === "object"
      ? course.practice
      : { name: "Pratique associée", steps: [course.practice || ""] };

    const practiceHtml = `
      ${practice.name ? `<p><strong>${safe(practice.name)}</strong></p>` : ""}
      ${practice.duration ? `<p><strong>Durée :</strong> ${safe(practice.duration)}</p>` : ""}
      ${practice.intention ? `<p><strong>Intention :</strong> ${safe(practice.intention)}</p>` : ""}
      ${practice.material ? `<p><strong>Matériel :</strong> ${safe(practice.material)}</p>` : ""}
      ${practice.posture ? `<p><strong>Posture :</strong> ${safe(practice.posture)}</p>` : ""}
      ${ol(practice.steps || [])}
      ${(practice.adaptations || []).length ? `<h3>Adaptations</h3>${ul(practice.adaptations)}` : ""}
      ${practice.safety ? `<div class="pdf-warning"><strong>Prudence</strong><p>${safe(practice.safety)}</p></div>` : ""}
    `;

    const vocal = (course.vocalScript || []).length
      ? course.vocalScript.map((line) => `
          <div class="pdf-script-line">
            <strong>${safe(line.time)} — ${safe(line.title)}</strong>
            <p>${safe(line.text)}</p>
          </div>
        `).join("")
      : "";

    const gallery = imageSet.length
      ? `<section class="pdf-section pdf-gallery"><h2>Planches visuelles du cours</h2>${imageSet.map((src, i) => imageFigure(src, `Planche ${i + 1}`)).join("")}</section>`
      : "";

    const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${safe(course.title)} — PDF premium</title>
<style>
  :root {
    --ink: #17202f;
    --gold: #b8892e;
    --gold-soft: #e9c77a;
    --blue: #06111f;
    --paper: #fffaf0;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    color: var(--ink);
    background: #f1eadb;
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.58;
  }

  .print-toolbar {
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 12px 18px;
    background: #06111f;
    color: white;
    display: flex;
    gap: 12px;
    justify-content: center;
    border-bottom: 1px solid rgba(232,199,122,.35);
  }

  .print-toolbar button {
    cursor: pointer;
    border: 1px solid rgba(232,199,122,.55);
    background: linear-gradient(135deg, #d8af58, #8a6222);
    color: #06111f;
    font-weight: 700;
    padding: 10px 18px;
    border-radius: 999px;
  }

  .page {
    width: min(900px, calc(100% - 32px));
    margin: 24px auto;
    background: var(--paper);
    border: 1px solid rgba(184,137,46,.35);
    box-shadow: 0 20px 70px rgba(0,0,0,.16);
  }

  .cover-page {
    background: #06111f;
    color: #fff4d2;
    padding: 0;
    min-height: 1120px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .cover-image {
    width: 100%;
    height: 100%;
    min-height: 1120px;
    object-fit: cover;
    display: block;
  }

  .inner {
    padding: 54px 64px;
  }

  .kicker {
    text-transform: uppercase;
    letter-spacing: .18em;
    color: var(--gold);
    font-size: 12px;
    margin-bottom: 12px;
  }

  h1 {
    margin: 0;
    font-size: 44px;
    line-height: 1.05;
    color: #102038;
  }

  .subtitle {
    font-size: 22px;
    color: #7b5a20;
    margin-top: 10px;
    font-style: italic;
  }

  .notice {
    margin-top: 24px;
    padding: 16px 18px;
    background: rgba(184,137,46,.08);
    border-left: 3px solid var(--gold);
    border-radius: 12px;
  }

  .pdf-section {
    margin-top: 34px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .pdf-section h2 {
    font-size: 24px;
    color: #7b5a20;
    border-bottom: 1px solid rgba(184,137,46,.35);
    padding-bottom: 8px;
    margin-bottom: 16px;
  }

  .pdf-subsection {
    margin: 16px 0;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(6,17,31,.045);
    border: 1px solid rgba(6,17,31,.08);
  }

  .pdf-subsection h3 {
    margin: 0 0 8px;
    color: #1c2c45;
  }

  ul, ol {
    padding-left: 22px;
  }

  li {
    margin: 7px 0;
  }

  blockquote {
    margin: 20px 0;
    padding: 18px 22px;
    border-left: 4px solid var(--gold);
    background: rgba(184,137,46,.08);
    color: #5a4014;
    font-size: 21px;
    border-radius: 12px;
  }

  .pdf-image {
    margin: 26px 0;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .pdf-image img {
    width: 100%;
    max-height: 880px;
    object-fit: contain;
    border-radius: 18px;
    display: block;
    border: 1px solid rgba(184,137,46,.25);
  }

  .pdf-image figcaption {
    margin-top: 8px;
    text-align: center;
    color: #7b5a20;
    font-size: 13px;
  }

  .pdf-warning {
    margin-top: 18px;
    padding: 14px 16px;
    border-radius: 14px;
    background: rgba(184,137,46,.10);
    border: 1px solid rgba(184,137,46,.30);
  }

  .pdf-script-line {
    margin: 14px 0;
    padding: 12px 14px;
    border-radius: 12px;
    background: rgba(6,17,31,.045);
  }

  .footer {
    margin-top: 36px;
    padding-top: 14px;
    border-top: 1px solid rgba(184,137,46,.25);
    font-size: 12px;
    color: #6b5c44;
  }

  .watermark {
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: .035;
    display: grid;
    place-items: center;
    transform: rotate(-28deg);
    font-size: 74px;
    color: #06111f;
    font-weight: 800;
    letter-spacing: .12em;
  }

  @media print {
    body { background: white; }
    .print-toolbar { display: none; }
    .page {
      width: 100%;
      margin: 0;
      box-shadow: none;
      border: none;
      page-break-after: always;
    }
    .page:last-child { page-break-after: auto; }
    .inner { padding: 38px 46px; }
    .cover-page { min-height: 100vh; }
    .cover-image { min-height: 100vh; }
    @page {
      size: A4;
      margin: 12mm;
    }
  }
</style>
</head>
<body>
  <div class="print-toolbar">
    <button onclick="window.print()">Imprimer / Enregistrer en PDF</button>
  </div>

  <div class="watermark">AXIS LUMEN</div>

  ${imageSet[0] ? `
  <section class="page cover-page">
    <img class="cover-image" src="${safe(imageSet[0])}" alt="${safe(course.title)}">
  </section>
  ` : ""}

  <main class="page">
    <div class="inner">
      <div class="kicker">Axis Lumen Studio · Cours ${safe(String(course.number || 1).padStart(3, "0"))} · ${safe(course.duration || "1 h")}</div>
      <h1>${safe(course.title)}</h1>
      ${course.subtitle ? `<div class="subtitle">${safe(course.subtitle)}</div>` : ""}

      <div class="notice">
        <strong>Notice de protection</strong><br>
        ${safe(course.pdf?.protectedNotice || "Support réservé à l’usage personnel de l’élève Axis Lumen Studio.")}
      </div>

      ${section("Résumé long", `<p>${safe(course.longSummary || course.summary || "")}</p>`)}
      ${section("Objectifs", `
        ${course.pedagogicalObjective ? `<p><strong>Objectif pédagogique :</strong> ${safe(course.pedagogicalObjective)}</p>` : ""}
        ${course.initiaticObjective ? `<p><strong>Objectif initiatique :</strong> ${safe(course.initiaticObjective)}</p>` : ""}
      `)}
      ${section("Plan du module", minutePlan)}
      ${course.essentialPhrase ? section("Phrase essentielle", `<blockquote>${safe(course.essentialPhrase)}</blockquote>`) : ""}

      <div class="footer">${safe(copyrightText)}</div>
    </div>
  </main>

  ${imageSet[1] ? `<main class="page"><div class="inner">${imageFigure(imageSet[1], "Schéma pédagogique — la loi des deux secondes")}</div></main>` : ""}

  <main class="page">
    <div class="inner">
      ${section("Enseignement complet", teaching)}
      <div class="footer">${safe(copyrightText)}</div>
    </div>
  </main>

  ${imageSet[2] ? `<main class="page"><div class="inner">${imageFigure(imageSet[2], "Observer · Noter · Intégrer")}</div></main>` : ""}

  <main class="page">
    <div class="inner">
      ${section("Contemplation", contemplation)}
      ${section("Exercice pratique détaillé", practiceHtml)}
      <div class="footer">${safe(copyrightText)}</div>
    </div>
  </main>

  ${imageSet[3] ? `<main class="page"><div class="inner">${imageFigure(imageSet[3], "Balancement latéral doux")}</div></main>` : ""}

  <main class="page">
    <div class="inner">
      ${vocal ? section("Script vocal", vocal) : ""}
      ${section("Questions de carnet", ul(course.journalQuestions || []))}
      ${section("Validation", ul(course.validation || []))}
      ${section("Références", ul(course.references || []))}
      <div class="footer">${safe(copyrightText)}</div>
    </div>
  </main>

  ${gallery}
</body>
</html>`;

    const popup = window.open("", "_blank");
    if (!popup) {
      alert("Le navigateur a bloqué la fenêtre PDF. Autorise les pop-ups pour ce site local.");
      return;
    }

    popup.document.open();
    popup.document.write(html);
    popup.document.close();
  }

  function init() {
    if (!courses.length || !families.length) return;

    if (document.getElementById(ROOT_ID)) return;

    const main = document.querySelector(".axis-learn-main") || document.querySelector("main") || document.body;
    const mount = document.createElement("section");
    mount.id = ROOT_ID;
    mount.className = "axis-onehour-school";

    const after = document.querySelector(".axis-learn-books") || document.querySelector(".axis-learn-hero");

    if (after && after.parentElement) {
      after.insertAdjacentElement("afterend", mount);
    } else {
      main.appendChild(mount);
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();




function openPrintablePdf(course) {
  if (!course) {
    console.warn("openPrintablePdf: aucun cours fourni.");
    return;
  }

  const escapeHtml = (value) => {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };

  const list = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  };

  const paragraphs = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value.map(v => `<p>${escapeHtml(v)}</p>`).join("");
    }
    return String(value)
      .split(/\n{2,}/)
      .map(v => `<p>${escapeHtml(v)}</p>`)
      .join("");
  };

  const section = (title, body) => {
    if (!body) return "";
    return `
      <section class="pdf-section">
        <h2>${escapeHtml(title)}</h2>
        ${body}
      </section>
    `;
  };

  const images = (() => {
    if (!course.images || typeof course.images !== "object") return "";
    const labels = {
      cover: "Couverture",
      pedagogical: "Image pédagogique",
      practice: "Pratique",
      contemplative: "Contemplation",
      contemplation: "Contemplation",
      exercise: "Exercice",
      journal: "Carnet",
      safety: "Prudence",
      symbolic: "Image symbolique",
      closing: "Clôture",
      atmosphere: "Atmosphère"
    };

    return Object.entries(course.images)
      .filter(([key, src]) => src && typeof src === "string")
      .map(([key, src]) => `
        <figure class="pdf-image">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(labels[key] || key)}">
          <figcaption>${escapeHtml(labels[key] || key)}</figcaption>
        </figure>
      `)
      .join("");
  })();

  const minutePlan = Array.isArray(course.minutePlan)
    ? list(course.minutePlan)
    : paragraphs(course.minutePlan);

  const teachingSections = (() => {
    if (!course.teaching) return "";
    let html = "";
    if (course.teaching.intro) {
      html += `<p>${escapeHtml(course.teaching.intro)}</p>`;
    }
    if (Array.isArray(course.teaching.sections)) {
      html += course.teaching.sections.map(s => `
        <h3>${escapeHtml(s.title || "")}</h3>
        <p>${escapeHtml(s.content || "")}</p>
      `).join("");
    }
    return html;
  })();

  const practice = (() => {
    if (!course.practice) return "";
    return `
      ${course.practice.name ? `<h3>${escapeHtml(course.practice.name)}</h3>` : ""}
      ${course.practice.duration ? `<p><strong>Durée :</strong> ${escapeHtml(course.practice.duration)}</p>` : ""}
      ${course.practice.intention ? `<p><strong>Intention :</strong> ${escapeHtml(course.practice.intention)}</p>` : ""}
      ${Array.isArray(course.practice.material) ? `<h4>Matériel</h4>${list(course.practice.material)}` : ""}
      ${course.practice.posture ? `<h4>Posture</h4><p>${escapeHtml(course.practice.posture)}</p>` : ""}
      ${Array.isArray(course.practice.steps) ? `<h4>Étapes</h4>${list(course.practice.steps)}` : ""}
      ${Array.isArray(course.practice.adaptations) ? `<h4>Adaptations</h4>${list(course.practice.adaptations)}` : ""}
      ${Array.isArray(course.practice.safety) ? `<h4>Prudence</h4>${list(course.practice.safety)}` : ""}
    `;
  })();

  const contemplation = (() => {
    if (!course.contemplation) return "";
    return `
      ${course.contemplation.duration ? `<p><strong>Durée :</strong> ${escapeHtml(course.contemplation.duration)}</p>` : ""}
      ${course.contemplation.question ? `<p><strong>Question :</strong> ${escapeHtml(course.contemplation.question)}</p>` : ""}
      ${course.contemplation.guidance ? `<p>${escapeHtml(course.contemplation.guidance)}</p>` : ""}
    `;
  })();

  const validation = (() => {
    if (!course.validation) return "";
    if (Array.isArray(course.validation.criteria)) return list(course.validation.criteria);
    return paragraphs(course.validation);
  })();

  const pdfTitle =
    course.pdf?.title ||
    `Cours ${course.number || ""} — ${course.title || "Axis Lumen Studio"}`;

  const protectedNotice =
    course.pdf?.protectedNotice ||
    "Support réservé aux élèves Axis Lumen Studio. Reproduction interdite sans autorisation.";

  const html = `
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${escapeHtml(pdfTitle)}</title>
<style>
  :root {
    --ink: #111827;
    --muted: #5f6472;
    --gold: #b99955;
    --night: #07111f;
    --paper: #fffaf0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #e9e4d8;
    color: var(--ink);
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.55;
  }

  .page {
    width: min(900px, calc(100% - 32px));
    margin: 24px auto;
    padding: 48px;
    background: var(--paper);
    border: 1px solid rgba(185, 153, 85, .45);
    box-shadow: 0 24px 80px rgba(0,0,0,.18);
  }

  .cover {
    min-height: 520px;
    padding: 42px;
    border-radius: 28px;
    background:
      radial-gradient(circle at top, rgba(255,220,140,.22), transparent 36%),
      linear-gradient(160deg, #07111f, #101d2d 65%, #241d12);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
  }

  .cover img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .42;
  }

  .cover-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .eyebrow {
    color: #f1d58b;
    text-transform: uppercase;
    letter-spacing: .16em;
    font-size: 12px;
  }

  h1 {
    margin: 12px 0 8px;
    font-size: 42px;
    line-height: 1.08;
  }

  h2 {
    margin-top: 34px;
    padding-top: 18px;
    border-top: 1px solid rgba(185,153,85,.35);
    color: #2c2415;
    font-size: 25px;
  }

  h3 {
    color: #3b2f18;
    margin-top: 22px;
  }

  h4 {
    margin-bottom: 6px;
    color: #4d3c1f;
  }

  .subtitle {
    font-size: 19px;
    color: rgba(255,255,255,.86);
  }

  .meta {
    margin-top: 18px;
    color: rgba(255,255,255,.74);
    font-size: 14px;
  }

  .notice {
    margin-top: 24px;
    padding: 14px 16px;
    border-left: 4px solid var(--gold);
    background: rgba(185,153,85,.12);
    color: #4b3c20;
  }

  .pdf-image-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin: 22px 0;
  }

  .pdf-image {
    margin: 0;
    padding: 10px;
    border: 1px solid rgba(185,153,85,.35);
    border-radius: 18px;
    background: white;
    break-inside: avoid;
  }

  .pdf-image img {
    width: 100%;
    display: block;
    border-radius: 12px;
  }

  .pdf-image figcaption {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #806633;
  }

  .phrase {
    margin: 28px 0;
    padding: 22px;
    border-radius: 18px;
    background: #111827;
    color: #f6e4aa;
    font-size: 21px;
    text-align: center;
  }

  .footer {
    margin-top: 42px;
    padding-top: 20px;
    border-top: 1px solid rgba(185,153,85,.35);
    color: var(--muted);
    font-size: 12px;
  }

  @media print {
    body {
      background: white;
    }

    .page {
      width: auto;
      margin: 0;
      padding: 28px;
      box-shadow: none;
      border: none;
    }

    .cover {
      min-height: 680px;
      page-break-after: always;
    }

    .pdf-section {
      break-inside: avoid;
    }

    .pdf-image-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
</head>
<body>
  <main class="page">
    <section class="cover">
      ${course.images?.cover ? `<img src="${escapeHtml(course.images.cover)}" alt="">` : ""}
      <div class="cover-content">
        <div class="eyebrow">Axis Lumen Studio — École du Temple Vivant</div>
        <h1>${escapeHtml(pdfTitle)}</h1>
        ${course.subtitle ? `<div class="subtitle">${escapeHtml(course.subtitle)}</div>` : ""}
        <div class="meta">
          ${course.family ? escapeHtml(course.family) + " · " : ""}
          ${course.duration || course.durationMin ? escapeHtml(course.duration || `${course.durationMin} min`) + " · " : ""}
          ${course.level ? escapeHtml(course.level) : ""}
        </div>
      </div>
    </section>

    ${course.longSummary ? section("Résumé du module", paragraphs(course.longSummary)) : ""}
    ${section("Objectifs", `
      ${course.pedagogicalObjective ? `<p><strong>Objectif pédagogique :</strong> ${escapeHtml(course.pedagogicalObjective)}</p>` : ""}
      ${course.initiaticObjective ? `<p><strong>Objectif initiatique :</strong> ${escapeHtml(course.initiaticObjective)}</p>` : ""}
    `)}

    ${minutePlan ? section("Plan du module", minutePlan) : ""}

    ${images ? `
      <section class="pdf-section">
        <h2>Images pédagogiques</h2>
        <div class="pdf-image-grid">${images}</div>
      </section>
    ` : ""}

    ${teachingSections ? section("Enseignement complet", teachingSections) : ""}
    ${contemplation ? section("Contemplation", contemplation) : ""}
    ${practice ? section("Protocole pratique", practice) : ""}
    ${course.vocalScript ? section("Script vocal guidé", paragraphs(course.vocalScript)) : ""}
    ${Array.isArray(course.journalQuestions) ? section("Questions de carnet", list(course.journalQuestions)) : ""}
    ${course.essentialPhrase ? `<div class="phrase">${escapeHtml(course.essentialPhrase)}</div>` : ""}
    ${Array.isArray(course.references) ? section("Références", list(course.references)) : ""}
    ${validation ? section("Validation", validation) : ""}

    <div class="notice">
      ${escapeHtml(protectedNotice)}
    </div>

    <div class="footer">
      © Axis Lumen Studio / Michael Chauvet — Support pédagogique protégé.
    </div>
  </main>

<script>
  window.addEventListener("load", function () {
    setTimeout(function () {
      window.focus();
      window.print();
    }, 500);
  });
</script>
</body>
</html>
`;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les pop-ups pour localhost, puis réessaie.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}



function openPrintablePdf(course) {
  if (!course) {
    console.warn("openPrintablePdf: aucun cours fourni.");
    return;
  }

  const escapeHtml = (value) => {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  };

  const list = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  };

  const paragraphs = (value) => {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value.map(v => `<p>${escapeHtml(v)}</p>`).join("");
    }
    return String(value)
      .split(/\n{2,}/)
      .map(v => `<p>${escapeHtml(v)}</p>`)
      .join("");
  };

  const section = (title, body) => {
    if (!body) return "";
    return `
      <section class="pdf-section">
        <h2>${escapeHtml(title)}</h2>
        ${body}
      </section>
    `;
  };

  const images = (() => {
    if (!course.images || typeof course.images !== "object") return "";
    const labels = {
      cover: "Couverture",
      pedagogical: "Image pédagogique",
      practice: "Pratique",
      contemplative: "Contemplation",
      contemplation: "Contemplation",
      exercise: "Exercice",
      journal: "Carnet",
      safety: "Prudence",
      symbolic: "Image symbolique",
      closing: "Clôture",
      atmosphere: "Atmosphère"
    };

    return Object.entries(course.images)
      .filter(([key, src]) => src && typeof src === "string")
      .map(([key, src]) => `
        <figure class="pdf-image">
          <img src="${escapeHtml(src)}" alt="${escapeHtml(labels[key] || key)}">
          <figcaption>${escapeHtml(labels[key] || key)}</figcaption>
        </figure>
      `)
      .join("");
  })();

  const minutePlan = Array.isArray(course.minutePlan)
    ? list(course.minutePlan)
    : paragraphs(course.minutePlan);

  const teachingSections = (() => {
    if (!course.teaching) return "";
    let html = "";
    if (course.teaching.intro) {
      html += `<p>${escapeHtml(course.teaching.intro)}</p>`;
    }
    if (Array.isArray(course.teaching.sections)) {
      html += course.teaching.sections.map(s => `
        <h3>${escapeHtml(s.title || "")}</h3>
        <p>${escapeHtml(s.content || "")}</p>
      `).join("");
    }
    return html;
  })();

  const practice = (() => {
    if (!course.practice) return "";
    return `
      ${course.practice.name ? `<h3>${escapeHtml(course.practice.name)}</h3>` : ""}
      ${course.practice.duration ? `<p><strong>Durée :</strong> ${escapeHtml(course.practice.duration)}</p>` : ""}
      ${course.practice.intention ? `<p><strong>Intention :</strong> ${escapeHtml(course.practice.intention)}</p>` : ""}
      ${Array.isArray(course.practice.material) ? `<h4>Matériel</h4>${list(course.practice.material)}` : ""}
      ${course.practice.posture ? `<h4>Posture</h4><p>${escapeHtml(course.practice.posture)}</p>` : ""}
      ${Array.isArray(course.practice.steps) ? `<h4>Étapes</h4>${list(course.practice.steps)}` : ""}
      ${Array.isArray(course.practice.adaptations) ? `<h4>Adaptations</h4>${list(course.practice.adaptations)}` : ""}
      ${Array.isArray(course.practice.safety) ? `<h4>Prudence</h4>${list(course.practice.safety)}` : ""}
    `;
  })();

  const contemplation = (() => {
    if (!course.contemplation) return "";
    return `
      ${course.contemplation.duration ? `<p><strong>Durée :</strong> ${escapeHtml(course.contemplation.duration)}</p>` : ""}
      ${course.contemplation.question ? `<p><strong>Question :</strong> ${escapeHtml(course.contemplation.question)}</p>` : ""}
      ${course.contemplation.guidance ? `<p>${escapeHtml(course.contemplation.guidance)}</p>` : ""}
    `;
  })();

  const validation = (() => {
    if (!course.validation) return "";
    if (Array.isArray(course.validation.criteria)) return list(course.validation.criteria);
    return paragraphs(course.validation);
  })();

  const pdfTitle =
    course.pdf?.title ||
    `Cours ${course.number || ""} — ${course.title || "Axis Lumen Studio"}`;

  const protectedNotice =
    course.pdf?.protectedNotice ||
    "Support réservé aux élèves Axis Lumen Studio. Reproduction interdite sans autorisation.";

  const html = `
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${escapeHtml(pdfTitle)}</title>
<style>
  :root {
    --ink: #111827;
    --muted: #5f6472;
    --gold: #b99955;
    --night: #07111f;
    --paper: #fffaf0;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background: #e9e4d8;
    color: var(--ink);
    font-family: Georgia, "Times New Roman", serif;
    line-height: 1.55;
  }

  .page {
    width: min(900px, calc(100% - 32px));
    margin: 24px auto;
    padding: 48px;
    background: var(--paper);
    border: 1px solid rgba(185, 153, 85, .45);
    box-shadow: 0 24px 80px rgba(0,0,0,.18);
  }

  .cover {
    min-height: 520px;
    padding: 42px;
    border-radius: 28px;
    background:
      radial-gradient(circle at top, rgba(255,220,140,.22), transparent 36%),
      linear-gradient(160deg, #07111f, #101d2d 65%, #241d12);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
  }

  .cover img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .42;
  }

  .cover-content {
    position: relative;
    z-index: 1;
    max-width: 680px;
  }

  .eyebrow {
    color: #f1d58b;
    text-transform: uppercase;
    letter-spacing: .16em;
    font-size: 12px;
  }

  h1 {
    margin: 12px 0 8px;
    font-size: 42px;
    line-height: 1.08;
  }

  h2 {
    margin-top: 34px;
    padding-top: 18px;
    border-top: 1px solid rgba(185,153,85,.35);
    color: #2c2415;
    font-size: 25px;
  }

  h3 {
    color: #3b2f18;
    margin-top: 22px;
  }

  h4 {
    margin-bottom: 6px;
    color: #4d3c1f;
  }

  .subtitle {
    font-size: 19px;
    color: rgba(255,255,255,.86);
  }

  .meta {
    margin-top: 18px;
    color: rgba(255,255,255,.74);
    font-size: 14px;
  }

  .notice {
    margin-top: 24px;
    padding: 14px 16px;
    border-left: 4px solid var(--gold);
    background: rgba(185,153,85,.12);
    color: #4b3c20;
  }

  .pdf-image-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin: 22px 0;
  }

  .pdf-image {
    margin: 0;
    padding: 10px;
    border: 1px solid rgba(185,153,85,.35);
    border-radius: 18px;
    background: white;
    break-inside: avoid;
  }

  .pdf-image img {
    width: 100%;
    display: block;
    border-radius: 12px;
  }

  .pdf-image figcaption {
    margin-top: 8px;
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #806633;
  }

  .phrase {
    margin: 28px 0;
    padding: 22px;
    border-radius: 18px;
    background: #111827;
    color: #f6e4aa;
    font-size: 21px;
    text-align: center;
  }

  .footer {
    margin-top: 42px;
    padding-top: 20px;
    border-top: 1px solid rgba(185,153,85,.35);
    color: var(--muted);
    font-size: 12px;
  }

  @media print {
    body {
      background: white;
    }

    .page {
      width: auto;
      margin: 0;
      padding: 28px;
      box-shadow: none;
      border: none;
    }

    .cover {
      min-height: 680px;
      page-break-after: always;
    }

    .pdf-section {
      break-inside: avoid;
    }

    .pdf-image-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
</head>
<body>
  <main class="page">
    <section class="cover">
      ${course.images?.cover ? `<img src="${escapeHtml(course.images.cover)}" alt="">` : ""}
      <div class="cover-content">
        <div class="eyebrow">Axis Lumen Studio — École du Temple Vivant</div>
        <h1>${escapeHtml(pdfTitle)}</h1>
        ${course.subtitle ? `<div class="subtitle">${escapeHtml(course.subtitle)}</div>` : ""}
        <div class="meta">
          ${course.family ? escapeHtml(course.family) + " · " : ""}
          ${course.duration || course.durationMin ? escapeHtml(course.duration || `${course.durationMin} min`) + " · " : ""}
          ${course.level ? escapeHtml(course.level) : ""}
        </div>
      </div>
    </section>

    ${course.longSummary ? section("Résumé du module", paragraphs(course.longSummary)) : ""}
    ${section("Objectifs", `
      ${course.pedagogicalObjective ? `<p><strong>Objectif pédagogique :</strong> ${escapeHtml(course.pedagogicalObjective)}</p>` : ""}
      ${course.initiaticObjective ? `<p><strong>Objectif initiatique :</strong> ${escapeHtml(course.initiaticObjective)}</p>` : ""}
    `)}

    ${minutePlan ? section("Plan du module", minutePlan) : ""}

    ${images ? `
      <section class="pdf-section">
        <h2>Images pédagogiques</h2>
        <div class="pdf-image-grid">${images}</div>
      </section>
    ` : ""}

    ${teachingSections ? section("Enseignement complet", teachingSections) : ""}
    ${contemplation ? section("Contemplation", contemplation) : ""}
    ${practice ? section("Protocole pratique", practice) : ""}
    ${course.vocalScript ? section("Script vocal guidé", paragraphs(course.vocalScript)) : ""}
    ${Array.isArray(course.journalQuestions) ? section("Questions de carnet", list(course.journalQuestions)) : ""}
    ${course.essentialPhrase ? `<div class="phrase">${escapeHtml(course.essentialPhrase)}</div>` : ""}
    ${Array.isArray(course.references) ? section("Références", list(course.references)) : ""}
    ${validation ? section("Validation", validation) : ""}

    <div class="notice">
      ${escapeHtml(protectedNotice)}
    </div>

    <div class="footer">
      © Axis Lumen Studio / Michael Chauvet — Support pédagogique protégé.
    </div>
  </main>

<script>
  window.addEventListener("load", function () {
    setTimeout(function () {
      window.focus();
      window.print();
    }, 500);
  });
</script>
</body>
</html>
`;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les pop-ups pour localhost, puis réessaie.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
/* AXIS_GENERIC_PREMIUM_PDF_PATCH_START */
(function () {
  const previousOpenPrintablePdf = window.openPrintablePdf;

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function collectImages(course) {
    const out = [];
    const add = function (v) {
      if (!v) return;
      if (Array.isArray(v)) return v.forEach(add);
      if (typeof v === "string") out.push(v);
    };

    add(course.coverImage);
    add(course.image);
    add(course.cover);
    add(course.thumbnail);

    if (course.images) {
      add(course.images.cover);
      add(course.images.gallery);
      add(course.images.pedagogical);
      add(course.images.practice);
      add(course.images.exercise);
      add(course.images.contemplation);
      add(course.images.contemplative);
      add(course.images.journal);
      add(course.images.safety);
      add(course.images.symbolic);
      add(course.images.closing);
      add(course.images.atmosphere);
    }

    return Array.from(new Set(out.filter(Boolean)));
  }

  function list(items) {
    if (!Array.isArray(items)) return "";
    return items.map(function (item) {
      if (typeof item === "string") return "<li>" + esc(item) + "</li>";
      return "<li><strong>" + esc(item.time || item.title || "") + "</strong> " + esc(item.content || item.detail || item.text || "") + "</li>";
    }).join("");
  }

  function makePremiumHtml(course) {
    const images = collectImages(course);
    const teaching = course.teaching || {};
    const sections = Array.isArray(teaching.sections) ? teaching.sections : [];
    const practice = course.practice || {};
    const contemplation = course.contemplation || {};

    return `
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${esc(course.title || "Cours Axis Lumen")}</title>
<style>
body{margin:0;background:#f3ead8;color:#151515;font-family:Georgia,"Times New Roman",serif;line-height:1.62}
.page{max-width:980px;margin:0 auto;padding:42px;background:#fffaf0}
.cover{min-height:90vh;display:flex;flex-direction:column;justify-content:center;border:1px solid #caa85b;padding:44px;background:#08111f;color:#fff3c8;text-align:center;page-break-after:always}
.cover img{max-height:58vh;object-fit:contain}
h1{font-size:46px;line-height:1.05;margin:12px 0}
h2{margin-top:38px;padding-bottom:8px;border-bottom:1px solid #caa85b;color:#13223a}
h3{color:#253b5f;margin-top:24px}
img{width:100%;border-radius:18px;margin:18px 0;border:1px solid rgba(202,168,91,.45)}
.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.gallery figure{margin:0}
.phrase{font-size:22px;color:#caa85b;font-style:italic;margin-top:18px}
.notice{margin-top:42px;padding:18px;border:1px solid #caa85b;background:#fff1ce}
@media print{body{background:white}.page{max-width:none;padding:18mm}.cover{min-height:250mm}}
</style>
</head>
<body>
<main class="page">
<section class="cover">
<p>Axis Lumen Studio — École du Temple Vivant</p>
<h1>${esc(course.title || "")}</h1>
<p>${esc(course.subtitle || "")}</p>
${images[0] ? '<img src="' + esc(images[0]) + '" alt="Couverture du cours">' : ''}
<p class="phrase">${esc(course.essentialPhrase || course.shortPhrase || "")}</p>
</section>

<h2>Galerie d’images</h2>
<div class="gallery">
${images.map(function(src){return '<figure><img src="' + esc(src) + '" alt="Image du cours"></figure>';}).join("")}
</div>

<h2>Résumé long</h2>
<p>${esc(course.longSummary || course.summary || course.shortSummary || "")}</p>

<h2>Objectifs</h2>
<h3>Objectif pédagogique</h3>
<p>${esc(course.pedagogicalObjective || "")}</p>
<h3>Objectif initiatique</h3>
<p>${esc(course.initiaticObjective || "")}</p>

<h2>Plan du module</h2>
<ul>${list(course.minutePlan || [])}</ul>

<h2>Enseignement complet</h2>
<p>${esc(teaching.intro || "")}</p>
${sections.map(function(section){return '<h3>' + esc(section.title || "") + '</h3><p>' + esc(section.content || "") + '</p>';}).join("")}

<h2>Contemplation</h2>
<p><strong>Durée :</strong> ${esc(contemplation.duration || "")}</p>
<p><strong>Question :</strong> ${esc(contemplation.question || "")}</p>
<p>${esc(contemplation.guidance || "")}</p>

<h2>Exercice pratique</h2>
<p><strong>${esc(practice.name || "")}</strong></p>
<p><strong>Durée :</strong> ${esc(practice.duration || "")}</p>
<p><strong>Intention :</strong> ${esc(practice.intention || "")}</p>
<p><strong>Matériel :</strong> ${esc(practice.material || "")}</p>
<p><strong>Posture :</strong> ${esc(practice.posture || "")}</p>
<h3>Étapes</h3>
<ol>${list(practice.steps || [])}</ol>
<h3>Adaptations</h3>
<ul>${list(practice.adaptations || [])}</ul>
<h3>Prudence</h3>
<p>${esc(practice.safety || "")}</p>

<h2>Script vocal</h2>
<ul>${list(course.vocalScript || [])}</ul>

<h2>Questions de carnet</h2>
<ol>${list(course.journalQuestions || [])}</ol>

<h2>Références</h2>
<ul>${list(course.references || [])}</ul>

<h2>Validation</h2>
<ul>${list(course.validation || [])}</ul>

<div class="notice">
<strong>Notice de protection</strong>
<p>${esc((course.pdf && course.pdf.protectedNotice) || "Support pédagogique protégé — Axis Lumen Studio / Michael Chauvet.")}</p>
<p>© Axis Lumen Studio / Michael Chauvet — Tous droits réservés.</p>
</div>
</main>
<script>window.print();</script>
</body>
</html>`;
  }

  window.openPrintablePdf = function patchedOpenPrintablePdf(course) {
    if (course && (course.pdfPremium || course.teaching || course.minutePlan || course.vocalScript || course.images)) {
      const win = window.open("", "_blank");
      if (!win) {
        alert("La fenêtre PDF a été bloquée. Autorise les popups pour ouvrir le PDF premium.");
        return;
      }
      win.document.open();
      win.document.write(makePremiumHtml(course));
      win.document.close();
      return;
    }

    if (typeof previousOpenPrintablePdf === "function") {
      return previousOpenPrintablePdf.apply(this, arguments);
    }
  };
})();
 /* AXIS_GENERIC_PREMIUM_PDF_PATCH_END */
/* AXIS_SAFE_PREMIUM_PDF_PATCH_START */
(function () {
  const previous = window.openPrintablePdf;

  function esc(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function addImages(course) {
    const out = [];
    const add = function (v) {
      if (!v) return;
      if (Array.isArray(v)) return v.forEach(add);
      if (typeof v === "string") out.push(v);
    };

    add(course.coverImage);
    add(course.image);
    add(course.cover);
    add(course.thumbnail);

    if (course.images) {
      add(course.images.cover);
      add(course.images.gallery);
      add(course.images.pedagogical);
      add(course.images.practice);
      add(course.images.exercise);
      add(course.images.contemplation);
      add(course.images.contemplative);
      add(course.images.journal);
      add(course.images.safety);
      add(course.images.symbolic);
      add(course.images.closing);
      add(course.images.atmosphere);
    }

    return Array.from(new Set(out.filter(Boolean)));
  }

  function list(items) {
    if (!Array.isArray(items)) return "";
    return items.map(function (item) {
      if (typeof item === "string") return "<li>" + esc(item) + "</li>";
      return "<li><strong>" + esc(item.time || item.title || "") + "</strong> " + esc(item.content || item.text || item.detail || "") + "</li>";
    }).join("");
  }

  window.openPrintablePdf = function patchedPdf(course) {
    if (!course) return;

    if (!(course.pdfPremium || course.images || course.teaching || course.minutePlan || course.vocalScript)) {
      if (typeof previous === "function") return previous.apply(this, arguments);
    }

    const images = addImages(course);
    const teaching = course.teaching || {};
    const sections = Array.isArray(teaching.sections) ? teaching.sections : [];
    const practice = course.practice && typeof course.practice === "object" ? course.practice : {};
    const contemplation = course.contemplation || {};

    const html = `
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${esc(course.title || "Cours Axis Lumen")}</title>
<style>
body{margin:0;background:#f4ead8;color:#171717;font-family:Georgia,"Times New Roman",serif;line-height:1.6}
.page{max-width:980px;margin:0 auto;padding:44px;background:#fffaf0}
.cover{min-height:90vh;display:flex;flex-direction:column;justify-content:center;text-align:center;background:#07111f;color:#fff0c8;padding:44px;page-break-after:always}
.cover img{max-height:62vh;object-fit:contain;border-radius:20px}
h1{font-size:44px;line-height:1.08}
h2{margin-top:34px;color:#7b5a20;border-bottom:1px solid #caa85b;padding-bottom:8px}
img{width:100%;border-radius:18px;border:1px solid rgba(202,168,91,.35);margin:16px 0}
.gallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.notice{margin-top:36px;padding:18px;border:1px solid #caa85b;background:#fff1ce}
@media print{body{background:white}.page{max-width:none;padding:18mm}.cover{min-height:260mm}@page{size:A4;margin:12mm}}
</style>
</head>
<body>
<section class="cover">
<p>Axis Lumen Studio — École du Temple Vivant</p>
<h1>${esc(course.title || "")}</h1>
<p>${esc(course.subtitle || "")}</p>
${images[0] ? '<img src="' + esc(images[0]) + '" alt="Couverture">' : ""}
<p>${esc(course.essentialPhrase || course.shortPhrase || "")}</p>
</section>

<main class="page">
<h2>Galerie d’images</h2>
<div class="gallery">${images.map(function(src){return '<figure><img src="' + esc(src) + '" alt="Image du cours"></figure>';}).join("")}</div>

<h2>Résumé</h2>
<p>${esc(course.longSummary || course.summary || course.shortSummary || "")}</p>

<h2>Objectifs</h2>
<p><strong>Objectif pédagogique :</strong> ${esc(course.pedagogicalObjective || "")}</p>
<p><strong>Objectif initiatique :</strong> ${esc(course.initiaticObjective || "")}</p>

<h2>Plan du module</h2>
<ul>${list(course.minutePlan || [])}</ul>

<h2>Enseignement complet</h2>
<p>${esc(teaching.intro || "")}</p>
${sections.map(function(s){return '<h3>' + esc(s.title || "") + '</h3><p>' + esc(s.content || "") + '</p>';}).join("")}

<h2>Contemplation</h2>
<p><strong>Durée :</strong> ${esc(contemplation.duration || "")}</p>
<p><strong>Question :</strong> ${esc(contemplation.question || "")}</p>
<p>${esc(contemplation.guidance || "")}</p>

<h2>Exercice pratique</h2>
<p><strong>${esc(practice.name || "")}</strong></p>
<p><strong>Durée :</strong> ${esc(practice.duration || "")}</p>
<p><strong>Intention :</strong> ${esc(practice.intention || "")}</p>
<p><strong>Matériel :</strong> ${esc(practice.material || "")}</p>
<p><strong>Posture :</strong> ${esc(practice.posture || "")}</p>
<ol>${list(practice.steps || [])}</ol>

<h2>Script vocal</h2>
<ul>${list(course.vocalScript || [])}</ul>

<h2>Questions de carnet</h2>
<ul>${list(course.journalQuestions || [])}</ul>

<h2>Validation</h2>
<ul>${list(course.validation || [])}</ul>

<h2>Références</h2>
<ul>${list(course.references || [])}</ul>

<div class="notice">
<strong>Notice de protection</strong>
<p>${esc((course.pdf && course.pdf.protectedNotice) || "Support pédagogique protégé — Axis Lumen Studio / Michael Chauvet.")}</p>
<p>© Axis Lumen Studio / Michael Chauvet — Tous droits réservés.</p>
</div>
</main>
<script>window.print();</script>
</body>
</html>`;

    const popup = window.open("", "_blank");
    if (!popup) {
      alert("Le navigateur a bloqué la fenêtre PDF. Autorise les popups pour ce site local.");
      return;
    }

    popup.document.open();
    popup.document.write(html);
    popup.document.close();
  };
})();
 /* AXIS_SAFE_PREMIUM_PDF_PATCH_END */
