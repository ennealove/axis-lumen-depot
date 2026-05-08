(function () {
  "use strict";

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isCourse005(course) {
    if (!course) return false;
    const id = normalizeText(course.id || "");
    const title = normalizeText(course.title || "");
    return Number(course.number) === 5 ||
      id.includes("005") ||
      title.includes("preparer une seance") ||
      title.includes("ouvrir le seuil");
  }

  function findCourse005() {
    const pools = [
      window.AXIS_ONE_HOUR_COURSES,
      window.COURSES,
      window.AXIS_COURSES,
      window.RAW_COURSES
    ];

    for (const pool of pools) {
      if (!Array.isArray(pool)) continue;
      const found = pool.find(isCourse005);
      if (found) return found;
    }

    return null;
  }

  function getCourseImages(course) {
    const images = course.images || {};
    const out = [];

    function add(value) {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach(add);
      } else if (typeof value === "string") {
        out.push(value);
      }
    }

    add(course.coverImage);
    add(course.image);
    add(course.practiceImage);
    add(course.exerciseImage);
    add(images.cover);
    add(images.gallery);
    add(images.pedagogical);
    add(images.practice);
    add(images.exercise);
    add(images.contemplation);
    add(images.contemplative);
    add(images.journal);
    add(images.safety);
    add(images.symbolic);
    add(images.closing);
    add(images.atmosphere);

    return Array.from(new Set(out.filter(Boolean)));
  }

  function listHtml(items) {
    if (!items) return "";
    const arr = Array.isArray(items) ? items : [items];

    return "<ul>" + arr.map((item) => {
      if (typeof item === "object" && item !== null) {
        return "<li><strong>" + escapeHtml(item.time || item.title || "") + "</strong> " + escapeHtml(item.content || item.details || item.text || "") + "</li>";
      }
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function paragraphs(value) {
    if (!value) return "";

    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item === "object" && item !== null) {
          return "<p><strong>" + escapeHtml(item.time || item.title || "") + "</strong> " + escapeHtml(item.text || item.content || "") + "</p>";
        }
        return "<p>" + escapeHtml(item) + "</p>";
      }).join("");
    }

    return String(value)
      .split(/\n{2,}/)
      .map((p) => "<p>" + escapeHtml(p) + "</p>")
      .join("");
  }

  function section(title, body) {
    if (!body) return "";
    return '<section class="axis-course-005-pdf-section"><h2>' + escapeHtml(title) + "</h2>" + body + "</section>";
  }

  function teachingHtml(course) {
    const teaching = course.teaching;
    if (!teaching) return "";

    let html = "";

    if (teaching.intro) {
      html += "<p>" + escapeHtml(teaching.intro) + "</p>";
    }

    if (Array.isArray(teaching.sections)) {
      html += teaching.sections.map((part) => {
        return "<h3>" + escapeHtml(part.title || "") + "</h3><p>" + escapeHtml(part.content || "") + "</p>";
      }).join("");
    }

    return html;
  }

  function practiceHtml(course) {
    const p = course.practice || {};
    let html = "";

    if (p.name) html += "<h3>" + escapeHtml(p.name) + "</h3>";
    if (p.duration) html += "<p><strong>Durée :</strong> " + escapeHtml(p.duration) + "</p>";
    if (p.intention) html += "<p><strong>Intention :</strong> " + escapeHtml(p.intention) + "</p>";
    if (p.material) html += "<h4>Matériel</h4>" + listHtml(p.material);
    if (p.posture) html += "<h4>Posture</h4><p>" + escapeHtml(p.posture) + "</p>";
    if (p.steps) html += "<h4>Étapes</h4>" + listHtml(p.steps);
    if (p.adaptations) html += "<h4>Adaptations</h4>" + listHtml(p.adaptations);
    if (p.safety) html += "<h4>Sécurité</h4>" + listHtml(p.safety);

    return html;
  }

  function imageFigure(src, label) {
    if (!src) return "";
    return [
      '<figure class="axis-course-005-pdf-image">',
      '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(label) + '">',
      '<figcaption>' + escapeHtml(label) + '</figcaption>',
      '</figure>'
    ].join("");
  }

  function galleryHtml(course) {
    const labels = [
      "Couverture",
      "Image pédagogique",
      "Pratique",
      "Exercice",
      "Contemplation",
      "Carnet d’expérience",
      "Prudence",
      "Image symbolique",
      "Clôture",
      "Atmosphère"
    ];

    return getCourseImages(course).map((src, index) => {
      return imageFigure(src, labels[index] || "Image du cours");
    }).join("");
  }

  function openCourse005Pdf() {
    const course = findCourse005();

    if (!course) {
      alert("Cours 5 introuvable dans le catalogue actif.");
      return;
    }

    const title = course.pdf && course.pdf.title ? course.pdf.title : "Cours 5 — " + course.title;
    const cover = course.coverImage || course.image || (course.images && course.images.cover) || "";
    const contemplation = course.contemplation
      ? [
          course.contemplation.duration ? "<p><strong>Durée :</strong> " + escapeHtml(course.contemplation.duration) + "</p>" : "",
          course.contemplation.question ? "<p><strong>Question :</strong> " + escapeHtml(course.contemplation.question) + "</p>" : "",
          course.contemplation.guidance ? "<p>" + escapeHtml(course.contemplation.guidance) + "</p>" : ""
        ].join("")
      : "";

    const validation = course.validation && course.validation.criteria
      ? listHtml(course.validation.criteria)
      : listHtml(course.validation);

    const html = [
      "<!doctype html>",
      '<html lang="fr">',
      "<head>",
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width,initial-scale=1">',
      "<title>" + escapeHtml(title) + "</title>",
      "<style>",
      "*{box-sizing:border-box}",
      "body{margin:0;background:#e9e4d8;color:#111827;font-family:Georgia,'Times New Roman',serif;line-height:1.58}",
      ".toolbar{position:sticky;top:0;z-index:20;background:#07111f;color:white;text-align:center;padding:12px;border-bottom:1px solid rgba(230,190,110,.45)}",
      ".toolbar button{cursor:pointer;border:1px solid rgba(230,190,110,.8);border-radius:999px;background:linear-gradient(135deg,#f1d58b,#b99955);color:#07111f;font-weight:800;padding:10px 18px}",
      ".page{width:min(940px,calc(100% - 32px));margin:24px auto;padding:48px;background:#fffaf0;border:1px solid rgba(185,153,85,.45);box-shadow:0 24px 80px rgba(0,0,0,.18)}",
      ".cover{min-height:680px;padding:44px;border-radius:30px;background:radial-gradient(circle at top,rgba(255,220,140,.24),transparent 35%),linear-gradient(160deg,#07111f,#101d2d 68%,#241d12);color:white;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;position:relative}",
      ".cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.52}",
      ".cover:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.12))}",
      ".cover-content{position:relative;z-index:1;max-width:720px}",
      ".eyebrow{color:#f1d58b;text-transform:uppercase;letter-spacing:.16em;font-size:12px}",
      "h1{margin:12px 0 8px;font-size:43px;line-height:1.08}",
      "h2{margin-top:34px;padding-top:18px;border-top:1px solid rgba(185,153,85,.35);color:#2c2415;font-size:25px}",
      "h3{color:#3b2f18;margin-top:22px}",
      "h4{margin-bottom:6px;color:#4d3c1f}",
      ".subtitle{font-size:19px;color:rgba(255,255,255,.86)}",
      ".meta{margin-top:18px;color:rgba(255,255,255,.76);font-size:14px}",
      ".axis-course-005-pdf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:22px 0}",
      ".axis-course-005-pdf-image{margin:0;padding:10px;border:1px solid rgba(185,153,85,.35);border-radius:18px;background:white;break-inside:avoid}",
      ".axis-course-005-pdf-image img{width:100%;display:block;border-radius:12px;aspect-ratio:4/5;object-fit:cover}",
      ".axis-course-005-pdf-image figcaption{margin-top:8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#806633}",
      ".phrase{margin:28px 0;padding:22px;border-radius:18px;background:#111827;color:#f6e4aa;font-size:21px;text-align:center}",
      ".notice{margin-top:24px;padding:14px 16px;border-left:4px solid #b99955;background:rgba(185,153,85,.12);color:#4b3c20}",
      ".footer{margin-top:42px;padding-top:20px;border-top:1px solid rgba(185,153,85,.35);color:#5f6472;font-size:12px}",
      "@media print{.toolbar{display:none}body{background:white}.page{width:auto;margin:0;padding:28px;box-shadow:none;border:none}.cover{min-height:700px;page-break-after:always}.axis-course-005-pdf-section{break-inside:avoid}.axis-course-005-pdf-grid{grid-template-columns:repeat(2,1fr)}}",
      "</style>",
      "</head>",
      "<body>",
      '<div class="toolbar"><button onclick="window.print()">Imprimer / enregistrer en PDF</button></div>',
      '<main class="page">',
      '<section class="cover">',
      cover ? '<img src="' + escapeHtml(cover) + '" alt="">' : "",
      '<div class="cover-content">',
      '<div class="eyebrow">Axis Lumen Studio — École du Temple Vivant</div>',
      "<h1>" + escapeHtml(title) + "</h1>",
      course.subtitle ? '<div class="subtitle">' + escapeHtml(course.subtitle) + "</div>" : "",
      '<div class="meta">' + escapeHtml(course.family || "") + " · " + escapeHtml(course.duration || "1 h") + " · " + escapeHtml(course.level || "Fondation") + "</div>",
      "</div>",
      "</section>",

      section("Résumé long", paragraphs(course.longSummary || course.summary || course.shortSummary)),
      section("Objectifs", [
        course.pedagogicalObjective ? "<p><strong>Objectif pédagogique :</strong> " + escapeHtml(course.pedagogicalObjective) + "</p>" : "",
        course.initiaticObjective ? "<p><strong>Objectif initiatique :</strong> " + escapeHtml(course.initiaticObjective) + "</p>" : ""
      ].join("")),
      section("Plan du module", listHtml(course.minutePlan)),
      section("Images du cours", '<div class="axis-course-005-pdf-grid">' + galleryHtml(course) + "</div>"),
      section("Enseignement complet", teachingHtml(course)),
      section("Contemplation", contemplation),
      section("Protocole pratique", practiceHtml(course)),
      section("Script vocal", paragraphs(course.vocalScript)),
      section("Questions de carnet", listHtml(course.journalQuestions)),
      course.essentialPhrase ? '<div class="phrase">' + escapeHtml(course.essentialPhrase) + "</div>" : "",
      section("Références", listHtml(course.references)),
      section("Validation", validation),
      '<div class="notice">' + escapeHtml(course.pdf && course.pdf.protectedNotice ? course.pdf.protectedNotice : "Support réservé aux élèves Axis Lumen Studio. Reproduction interdite sans autorisation.") + "</div>",
      '<div class="footer">© Axis Lumen Studio / Michael Chauvet — Support pédagogique protégé.</div>',
      "</main>",
      "</body>",
      "</html>"
    ].join("");

    const win = window.open("", "_blank");

    if (!win) {
      alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les pop-ups pour localhost.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
  }

  function renderReaderEnhancement() {
    const reader = document.getElementById("axisLearnReader");
    if (!reader) return;

    const text = normalizeText(reader.innerText || "");
    if (!text.includes("preparer une seance") && !text.includes("ouvrir le seuil")) return;

    if (reader.querySelector(".axis-course-005-premium-block")) return;

    const course = findCourse005();
    if (!course) return;

    const images = course.images || {};
    const block = document.createElement("section");
    block.className = "axis-course-005-premium-block";
    block.innerHTML = [
      '<div class="axis-course-005-reader-images">',
      '<figure><img src="' + escapeHtml(course.coverImage || images.cover) + '" alt="Couverture"><figcaption>Couverture</figcaption></figure>',
      '<figure><img src="' + escapeHtml(images.practice || course.practiceImage || images.cover) + '" alt="Pratiquer"><figcaption>Pratiquer</figcaption></figure>',
      '<figure><img src="' + escapeHtml(images.journal || images.cover) + '" alt="Noter"><figcaption>Noter</figcaption></figure>',
      '</div>',
      '<div class="axis-course-005-reader-action">',
      '<button type="button" class="axis-learn-btn secondary axis-course-005-premium-pdf">PDF premium</button>',
      '</div>'
    ].join("");

    reader.appendChild(block);
  }

  function injectStyles() {
    if (document.getElementById("axis-course-005-premium-style")) return;

    const style = document.createElement("style");
    style.id = "axis-course-005-premium-style";
    style.textContent = [
      ".axis-course-005-premium-block{margin-top:22px;padding:18px;border:1px solid rgba(218,184,104,.28);border-radius:24px;background:rgba(255,255,255,.045)}",
      ".axis-course-005-reader-images{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}",
      ".axis-course-005-reader-images figure{margin:0;border-radius:18px;overflow:hidden;border:1px solid rgba(218,184,104,.22);background:rgba(0,0,0,.18)}",
      ".axis-course-005-reader-images img{width:100%;display:block;aspect-ratio:4/5;object-fit:cover}",
      ".axis-course-005-reader-images figcaption{padding:8px 10px;font-size:.76rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(240,218,160,.86)}",
      ".axis-course-005-reader-action{margin-top:16px;display:flex;justify-content:flex-end}",
      "@media(max-width:800px){.axis-course-005-reader-images{grid-template-columns:1fr}}"
    ].join("\n");

    document.head.appendChild(style);
  }

  function installPdfClick() {
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (!target) return;

      const button = target.closest("button, a");
      if (!button) return;

      const text = normalizeText(button.textContent || button.innerText || "");
      const cls = normalizeText(button.className || "");
      const href = normalizeText(button.getAttribute("href") || "");

      const isPdf =
        text.includes("pdf") ||
        cls.includes("pdf") ||
        href.includes("pdf");

      if (!isPdf) return;

      const reader = document.getElementById("axisLearnReader");
      const pageText = normalizeText(reader ? reader.innerText : document.body.innerText || "");

      if (!pageText.includes("preparer une seance") && !pageText.includes("ouvrir le seuil")) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      }

      openCourse005Pdf();
    }, true);
  }

  function boot() {
    injectStyles();
    installPdfClick();

    setTimeout(renderReaderEnhancement, 400);

    document.addEventListener("click", function () {
      setTimeout(renderReaderEnhancement, 250);
      setTimeout(renderReaderEnhancement, 800);
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.AxisCourse005Premium = {
    openPdf: openCourse005Pdf,
    refresh: renderReaderEnhancement
  };
})();