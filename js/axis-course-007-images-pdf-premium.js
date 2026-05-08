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

  function isCourse007(course) {
    if (!course) return false;
    var id = normalizeText(course.id || "");
    var title = normalizeText(course.title || "");
    return Number(course.number) === 7 ||
      id.indexOf("007") !== -1 ||
      title.indexOf("presence carte et lumiere") !== -1;
  }

  function findCourse007() {
    var pools = [
      window.AXIS_ONE_HOUR_COURSES,
      window.COURSES,
      window.AXIS_COURSES,
      window.RAW_COURSES
    ];

    for (var p = 0; p < pools.length; p += 1) {
      var pool = pools[p];
      if (!Array.isArray(pool)) continue;

      for (var i = 0; i < pool.length; i += 1) {
        if (isCourse007(pool[i])) return pool[i];
      }
    }

    return null;
  }

  function listHtml(items) {
    if (!items) return "";
    var arr = Array.isArray(items) ? items : [items];

    return "<ul>" + arr.map(function (item) {
      if (typeof item === "object" && item !== null) {
        return "<li><strong>" + escapeHtml(item.time || item.title || "") + "</strong> " + escapeHtml(item.content || item.details || item.text || "") + "</li>";
      }
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function paragraphs(value) {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value.map(function (item) {
        if (typeof item === "object" && item !== null) {
          return "<p><strong>" + escapeHtml(item.time || item.title || "") + "</strong> " + escapeHtml(item.text || item.content || "") + "</p>";
        }
        return "<p>" + escapeHtml(item) + "</p>";
      }).join("");
    }

    return String(value)
      .split(/\n{2,}/)
      .map(function (p) { return "<p>" + escapeHtml(p) + "</p>"; })
      .join("");
  }

  function section(title, body) {
    if (!body) return "";
    return '<section class="axis-course-007-pdf-section"><h2>' + escapeHtml(title) + "</h2>" + body + "</section>";
  }

  function teachingHtml(course) {
    var teaching = course.teaching;
    if (!teaching) return "";

    var html = "";

    if (teaching.intro) {
      html += "<p>" + escapeHtml(teaching.intro) + "</p>";
    }

    if (Array.isArray(teaching.sections)) {
      html += teaching.sections.map(function (part) {
        return "<h3>" + escapeHtml(part.title || "") + "</h3><p>" + escapeHtml(part.content || "") + "</p>";
      }).join("");
    }

    return html;
  }

  function practiceHtml(course) {
    var p = course.practice || {};
    var html = "";

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

  function getImages(course) {
    var images = course.images || {};
    var out = [];

    function add(value) {
      if (!value) return;
      if (Array.isArray(value)) {
        value.forEach(add);
        return;
      }
      if (typeof value === "string") {
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

  function imageFigure(src, label) {
    if (!src) return "";
    return [
      '<figure class="axis-course-007-pdf-image">',
      '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(label) + '">',
      '<figcaption>' + escapeHtml(label) + '</figcaption>',
      '</figure>'
    ].join("");
  }

  function galleryHtml(course) {
    var labels = [
      "Couverture — Vertu 7",
      "Conscience — Vertu 8",
      "Douceur — Vertu 5",
      "Expression — Vertu 10",
      "Patience — Vertu 6",
      "Relation — Vertu 11",
      "Accomplissement — Vertu 12",
      "Équilibre intérieur — Vertu 13",
      "Engagement — Vertu 15",
      "Maîtrise — Vertu 16",
      "Atmosphère"
    ];

    return getImages(course).map(function (src, index) {
      return imageFigure(src, labels[index] || "Image du cours");
    }).join("");
  }

  function openCourse007Pdf() {
    var course = findCourse007();

    if (!course) {
      alert("Cours 7 introuvable dans le catalogue actif.");
      return;
    }

    var title = course.pdf && course.pdf.title ? course.pdf.title : "Cours 7 — " + course.title;
    var cover = course.coverImage || course.image || (course.images && course.images.cover) || "";

    var contemplation = "";
    if (course.contemplation) {
      contemplation += course.contemplation.duration ? "<p><strong>Durée :</strong> " + escapeHtml(course.contemplation.duration) + "</p>" : "";
      contemplation += course.contemplation.question ? "<p><strong>Question :</strong> " + escapeHtml(course.contemplation.question) + "</p>" : "";
      contemplation += course.contemplation.guidance ? "<p>" + escapeHtml(course.contemplation.guidance) + "</p>" : "";
    }

    var validation = course.validation && course.validation.criteria
      ? listHtml(course.validation.criteria)
      : listHtml(course.validation);

    var html = [
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
      ".cover{min-height:680px;padding:44px;border-radius:30px;background:linear-gradient(160deg,#07111f,#101d2d 68%,#241d12);color:white;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;position:relative}",
      ".cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.72}",
      ".cover:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.72),rgba(0,0,0,.08))}",
      ".cover-content{position:relative;z-index:1;max-width:720px}",
      ".eyebrow{color:#f1d58b;text-transform:uppercase;letter-spacing:.16em;font-size:12px}",
      "h1{margin:12px 0 8px;font-size:43px;line-height:1.08}",
      "h2{margin-top:34px;padding-top:18px;border-top:1px solid rgba(185,153,85,.35);color:#2c2415;font-size:25px}",
      "h3{color:#3b2f18;margin-top:22px}",
      "h4{margin-bottom:6px;color:#4d3c1f}",
      ".subtitle{font-size:19px;color:rgba(255,255,255,.86)}",
      ".meta{margin-top:18px;color:rgba(255,255,255,.76);font-size:14px}",
      ".axis-course-007-pdf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:22px 0}",
      ".axis-course-007-pdf-image{margin:0;padding:10px;border:1px solid rgba(185,153,85,.35);border-radius:18px;background:white;break-inside:avoid}",
      ".axis-course-007-pdf-image img{width:100%;display:block;border-radius:12px;aspect-ratio:4/5;object-fit:cover}",
      ".axis-course-007-pdf-image figcaption{margin-top:8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#806633}",
      ".phrase{margin:28px 0;padding:22px;border-radius:18px;background:#111827;color:#f6e4aa;font-size:21px;text-align:center}",
      ".notice{margin-top:24px;padding:14px 16px;border-left:4px solid #b99955;background:rgba(185,153,85,.12);color:#4b3c20}",
      ".footer{margin-top:42px;padding-top:20px;border-top:1px solid rgba(185,153,85,.35);color:#5f6472;font-size:12px}",
      "@media print{.toolbar{display:none}body{background:white}.page{width:auto;margin:0;padding:28px;box-shadow:none;border:none}.cover{min-height:700px;page-break-after:always}.axis-course-007-pdf-section{break-inside:avoid}.axis-course-007-pdf-grid{grid-template-columns:repeat(2,1fr)}}",
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
      section("Images du cours", '<div class="axis-course-007-pdf-grid">' + galleryHtml(course) + "</div>"),
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

    var win = window.open("", "_blank");

    if (!win) {
      alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les pop-ups pour localhost.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
  }

  function installPdfClick() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;

      var button = target.closest("button, a");
      if (!button) return;

      var text = normalizeText(button.textContent || button.innerText || "");
      var cls = normalizeText(button.className || "");
      var href = normalizeText(button.getAttribute("href") || "");

      var isPdf =
        text.indexOf("pdf") !== -1 ||
        cls.indexOf("pdf") !== -1 ||
        href.indexOf("pdf") !== -1;

      if (!isPdf) return;

      var reader = document.getElementById("axisLearnReader");
      var pageText = normalizeText(reader ? reader.innerText : document.body.innerText || "");

      if (pageText.indexOf("presence carte et lumiere") === -1 && pageText.indexOf("présence, carte et lumière") === -1) return;

      event.preventDefault();
      event.stopPropagation();

      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      }

      openCourse007Pdf();
    }, true);
  }

  function boot() {
    installPdfClick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.AxisCourse007Premium = {
    openPdf: openCourse007Pdf
  };
})();