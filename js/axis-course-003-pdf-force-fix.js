(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function asArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  }

  function findCourse003() {
    var pools = [
      window.AXIS_ONE_HOUR_COURSES,
      window.AXIS_COURSES,
      window.COURSES,
      window.RAW_COURSES
    ];

    for (var p = 0; p < pools.length; p += 1) {
      var pool = pools[p];
      if (!Array.isArray(pool)) continue;

      for (var i = 0; i < pool.length; i += 1) {
        var c = pool[i];
        if (!c) continue;

        var id = normalizeText(c.id || "");
        var title = normalizeText(c.title || "");

        if (
          c.number === 3 ||
          id.indexOf("course-003") !== -1 ||
          id.indexOf("c003") !== -1 ||
          title.indexOf("maintenir son temple propre") !== -1
        ) {
          return c;
        }
      }
    }

    return {
      id: "course-003",
      number: 3,
      title: "Maintenir son temple propre au quotidien",
      subtitle: "Hygiène intérieure, ordre du lieu et disponibilité de l’attention",
      family: "Fondation",
      duration: "1 h",
      level: "Fondation",
      longSummary: "Ce cours transforme l’idée de propreté intérieure en protocole concret. Il ne s’agit pas de perfection morale ni de purification rigide, mais d’un art quotidien : retirer ce qui encombre, préparer le lieu, respecter le corps, observer l’état réel du terrain, réduire les distractions, puis entrer dans une pratique simple, stable et validable.",
      pedagogicalObjective: "Comprendre comment l’ordre du lieu, la sobriété sensorielle, la posture, l’eau, le carnet et la clôture conditionnent la qualité d’une séance.",
      initiaticObjective: "Faire de l’hygiène quotidienne un seuil initiatique : ne plus pratiquer dans le bruit, mais entrer dans un espace choisi, habité et respecté.",
      essentialPhrase: "Un temple propre n’est pas un temple parfait ; c’est un espace où l’inutile ne gouverne plus.",
      images: {
        cover: "assets/courses/course-003/axis_lumen_image_1.png",
        pedagogical: [
          "assets/courses/course-003/axis_lumen_image_2.png",
          "assets/courses/course-003/axis_lumen_image_3.png",
          "assets/courses/course-003/axis_lumen_image_4.png",
          "assets/courses/course-003/axis_lumen_image_5.png",
          "assets/courses/course-003/axis_lumen_image_6.png",
          "assets/courses/course-003/axis_lumen_image_7.png",
          "assets/courses/course-003/axis_lumen_image_8.png",
          "assets/courses/course-003/axis_lumen_image_9.png"
        ],
        gallery: [
          "assets/courses/course-003/axis_lumen_image_1.png",
          "assets/courses/course-003/axis_lumen_image_2.png",
          "assets/courses/course-003/axis_lumen_image_3.png",
          "assets/courses/course-003/axis_lumen_image_4.png",
          "assets/courses/course-003/axis_lumen_image_5.png",
          "assets/courses/course-003/axis_lumen_image_6.png",
          "assets/courses/course-003/axis_lumen_image_7.png",
          "assets/courses/course-003/axis_lumen_image_8.png",
          "assets/courses/course-003/axis_lumen_image_9.png"
        ]
      }
    };
  }

  function listHtml(items) {
    var arr = asArray(items).filter(Boolean);
    if (!arr.length) return "";
    return "<ul>" + arr.map(function (item) {
      if (typeof item === "object") {
        return "<li><strong>" + escapeHtml(item.time || item.title || "") + "</strong> " + escapeHtml(item.content || item.details || "") + "</li>";
      }
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>";
  }

  function paragraphs(value) {
    if (!value) return "";
    if (Array.isArray(value)) {
      return value.map(function (v) {
        return "<p>" + escapeHtml(typeof v === "object" ? JSON.stringify(v) : v) + "</p>";
      }).join("");
    }
    return String(value)
      .split(/\n{2,}/)
      .map(function (v) {
        return "<p>" + escapeHtml(v) + "</p>";
      })
      .join("");
  }

  function section(title, body) {
    if (!body) return "";
    return '<section class="pdf-section"><h2>' + escapeHtml(title) + "</h2>" + body + "</section>";
  }

  function teachingHtml(course) {
    if (!course.teaching) return "";

    var html = "";

    if (course.teaching.intro) {
      html += "<p>" + escapeHtml(course.teaching.intro) + "</p>";
    }

    if (Array.isArray(course.teaching.sections)) {
      html += course.teaching.sections.map(function (s) {
        return "<h3>" + escapeHtml(s.title || "") + "</h3><p>" + escapeHtml(s.content || "") + "</p>";
      }).join("");
    }

    return html;
  }

  function practiceHtml(course) {
    var p = course.practice;
    if (!p) {
      return [
        "<h3>Le seuil propre</h3>",
        "<p><strong>Durée :</strong> 25 minutes</p>",
        "<p><strong>Intention :</strong> rendre le lieu, le corps et l’attention disponibles avant toute pratique plus avancée.</p>",
        "<ol>",
        "<li>Retirer une distraction visible.</li>",
        "<li>Poser le carnet et le verre d’eau.</li>",
        "<li>S’asseoir sans commencer tout de suite.</li>",
        "<li>Observer les yeux, la nuque, le ventre, le souffle et les mains.</li>",
        "<li>Respirer naturellement sans forcer.</li>",
        "<li>Noter une phrase vraie dans le carnet.</li>",
        "<li>Clore la séance clairement.</li>",
        "</ol>"
      ].join("");
    }

    var html = "";
    if (p.name) html += "<h3>" + escapeHtml(p.name) + "</h3>";
    if (p.duration) html += "<p><strong>Durée :</strong> " + escapeHtml(p.duration) + "</p>";
    if (p.intention) html += "<p><strong>Intention :</strong> " + escapeHtml(p.intention) + "</p>";
    if (p.material) html += "<h4>Matériel</h4>" + listHtml(p.material);
    if (p.posture) html += "<h4>Posture</h4><p>" + escapeHtml(p.posture) + "</p>";
    if (p.steps) html += "<h4>Étapes</h4>" + listHtml(p.steps);
    if (p.adaptations) html += "<h4>Adaptations</h4>" + listHtml(p.adaptations);
    if (p.safety) html += "<h4>Prudence</h4>" + listHtml(p.safety);
    return html;
  }

  function imageGalleryHtml(course) {
    var images = course.images || {};
    var labels = {
      cover: "Couverture",
      pedagogical: "Image pédagogique",
      practice: "Pratique",
      contemplation: "Contemplation",
      contemplative: "Contemplation",
      exercise: "Exercice",
      journal: "Carnet",
      safety: "Prudence",
      symbolic: "Image symbolique",
      closing: "Clôture",
      atmosphere: "Atmosphère"
    };

    var html = "";

    Object.keys(images).forEach(function (key) {
      var src = images[key];

      if (Array.isArray(src)) {
        src.forEach(function (one, index) {
          if (!one || typeof one !== "string") return;
          html += imageFigure(one, (labels[key] || key) + " " + (index + 1));
        });
        return;
      }

      if (!src || typeof src !== "string") return;
      html += imageFigure(src, labels[key] || key);
    });

    return html;
  }

  function imageFigure(src, label) {
    return [
      '<figure class="pdf-image">',
      '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(label) + '">',
      '<figcaption>' + escapeHtml(label) + '</figcaption>',
      '</figure>'
    ].join("");
  }

  function openCourse003Pdf() {
    var course = findCourse003();

    var title =
      course.pdf && course.pdf.title
        ? course.pdf.title
        : "Cours 3 — " + (course.title || "Maintenir son temple propre au quotidien");

    var imageGallery = imageGalleryHtml(course);

    var contemplation = "";
    if (course.contemplation) {
      contemplation += course.contemplation.duration ? "<p><strong>Durée :</strong> " + escapeHtml(course.contemplation.duration) + "</p>" : "";
      contemplation += course.contemplation.question ? "<p><strong>Question :</strong> " + escapeHtml(course.contemplation.question) + "</p>" : "";
      contemplation += course.contemplation.guidance ? "<p>" + escapeHtml(course.contemplation.guidance) + "</p>" : "";
    } else {
      contemplation = "<p><strong>Question :</strong> Qu’est-ce qui encombre réellement mon temple aujourd’hui ?</p><p>Observer simplement ce qui prend trop de place : lieu, corps, écran, émotion, pensée répétée, fatigue ou bruit.</p>";
    }

    var validation = "";
    if (course.validation && Array.isArray(course.validation.criteria)) {
      validation = listHtml(course.validation.criteria);
    } else if (Array.isArray(course.validation)) {
      validation = listHtml(course.validation);
    } else {
      validation = listHtml([
        "J’ai préparé un lieu sobre et stable.",
        "J’ai observé mon état réel avant de pratiquer.",
        "J’ai respecté mes yeux, mon souffle et mon corps.",
        "J’ai noté mon expérience dans le carnet.",
        "J’ai clôturé la séance clairement."
      ]);
    }

    var notice =
      course.pdf && course.pdf.protectedNotice
        ? course.pdf.protectedNotice
        : "Support réservé aux élèves Axis Lumen Studio. Reproduction interdite sans autorisation.";

    var html = [
      "<!doctype html>",
      '<html lang="fr">',
      "<head>",
      '<meta charset="utf-8">',
      "<title>" + escapeHtml(title) + "</title>",
      "<style>",
      "*{box-sizing:border-box}",
      "body{margin:0;background:#e9e4d8;color:#111827;font-family:Georgia,'Times New Roman',serif;line-height:1.58}",
      ".toolbar{position:sticky;top:0;z-index:10;background:#07111f;color:#fff;padding:12px;text-align:center;border-bottom:1px solid rgba(230,190,110,.4)}",
      ".toolbar button{cursor:pointer;border:1px solid rgba(230,190,110,.75);border-radius:999px;background:linear-gradient(135deg,#f1d58b,#b99955);color:#07111f;font-weight:700;padding:10px 18px}",
      ".page{width:min(920px,calc(100% - 32px));margin:24px auto;padding:48px;background:#fffaf0;border:1px solid rgba(185,153,85,.45);box-shadow:0 24px 80px rgba(0,0,0,.18)}",
      ".cover{min-height:640px;padding:42px;border-radius:28px;background:radial-gradient(circle at top,rgba(255,220,140,.22),transparent 36%),linear-gradient(160deg,#07111f,#101d2d 65%,#241d12);color:white;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;position:relative}",
      ".cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.42}",
      ".cover-content{position:relative;z-index:1;max-width:720px}",
      ".eyebrow{color:#f1d58b;text-transform:uppercase;letter-spacing:.16em;font-size:12px}",
      "h1{margin:12px 0 8px;font-size:42px;line-height:1.08}",
      "h2{margin-top:34px;padding-top:18px;border-top:1px solid rgba(185,153,85,.35);color:#2c2415;font-size:25px}",
      "h3{color:#3b2f18;margin-top:22px}",
      "h4{margin-bottom:6px;color:#4d3c1f}",
      ".subtitle{font-size:19px;color:rgba(255,255,255,.86)}",
      ".meta{margin-top:18px;color:rgba(255,255,255,.74);font-size:14px}",
      ".pdf-image-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin:22px 0}",
      ".pdf-image{margin:0;padding:10px;border:1px solid rgba(185,153,85,.35);border-radius:18px;background:white;break-inside:avoid}",
      ".pdf-image img{width:100%;display:block;border-radius:12px;aspect-ratio:4/5;object-fit:cover}",
      ".pdf-image figcaption{margin-top:8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#806633}",
      ".phrase{margin:28px 0;padding:22px;border-radius:18px;background:#111827;color:#f6e4aa;font-size:21px;text-align:center}",
      ".notice{margin-top:24px;padding:14px 16px;border-left:4px solid #b99955;background:rgba(185,153,85,.12);color:#4b3c20}",
      ".footer{margin-top:42px;padding-top:20px;border-top:1px solid rgba(185,153,85,.35);color:#5f6472;font-size:12px}",
      "@media print{.toolbar{display:none}body{background:white}.page{width:auto;margin:0;padding:28px;box-shadow:none;border:none}.cover{min-height:680px;page-break-after:always}.pdf-section{break-inside:avoid}.pdf-image-grid{grid-template-columns:repeat(2,1fr)}}",
      "</style>",
      "</head>",
      "<body>",
      '<div class="toolbar"><button onclick="window.print()">Imprimer / enregistrer en PDF</button></div>',
      '<main class="page">',
      '<section class="cover">',
      course.images && course.images.cover ? '<img src="' + escapeHtml(course.images.cover) + '" alt="">' : "",
      '<div class="cover-content">',
      '<div class="eyebrow">Axis Lumen Studio — École du Temple Vivant</div>',
      "<h1>" + escapeHtml(title) + "</h1>",
      course.subtitle ? '<div class="subtitle">' + escapeHtml(course.subtitle) + "</div>" : "",
      '<div class="meta">' + escapeHtml(course.family || "Fondation") + " · " + escapeHtml(course.duration || "1 h") + " · " + escapeHtml(course.level || "Fondation") + "</div>",
      "</div>",
      "</section>",

      section("Résumé du module", paragraphs(course.longSummary || course.summary || course.shortSummary)),
      section("Objectifs", [
        course.pedagogicalObjective ? "<p><strong>Objectif pédagogique :</strong> " + escapeHtml(course.pedagogicalObjective) + "</p>" : "",
        course.initiaticObjective ? "<p><strong>Objectif initiatique :</strong> " + escapeHtml(course.initiaticObjective) + "</p>" : ""
      ].join("")),
      section("Plan du module", listHtml(course.minutePlan || [
        "0-5 min : seuil, silence, installation du lieu",
        "5-15 min : lecture du principe du temple quotidien",
        "15-25 min : observation du corps, des yeux, du souffle et du mental",
        "25-40 min : pratique guidée de nettoyage doux de l’attention",
        "40-50 min : contemplation et question intérieure",
        "50-57 min : carnet d’expérience",
        "57-60 min : clôture et validation"
      ])),
      imageGallery ? section("Images pédagogiques", '<div class="pdf-image-grid">' + imageGallery + "</div>") : "",
      teachingHtml(course) ? section("Enseignement complet", teachingHtml(course)) : section("Enseignement complet", paragraphs("Un temple n’est pas propre parce qu’il brille. Il est propre parce que rien d’inutile n’y gouverne. Dans la pratique intérieure, la vraie propreté commence lorsque le corps cesse d’être envahi, lorsque le lieu cesse de tirer l’attention dans tous les sens, lorsque le regard n’est plus forcé, lorsque le souffle redevient naturel et lorsque la pensée accepte de se poser.")),
      section("Contemplation", contemplation),
      section("Protocole pratique", practiceHtml(course)),
      course.vocalScript ? section("Script vocal guidé", paragraphs(course.vocalScript)) : "",
      section("Questions de carnet", listHtml(course.journalQuestions || [
        "Dans quel état réel suis-je entré dans la séance ?",
        "Qu’est-ce qui encombrait le plus mon temple aujourd’hui ?",
        "Quel geste simple a changé la qualité de présence ?",
        "Ai-je forcé quelque chose ou ai-je respecté le seuil ?",
        "Quelle règle personnelle puis-je garder pour demain ?"
      ])),
      course.essentialPhrase ? '<div class="phrase">' + escapeHtml(course.essentialPhrase) + "</div>" : "",
      section("Références", listHtml(course.references || [
        "JE SUIS — Le Livre d’Exercices : préparer le lieu, tenir le carnet, clore la séance.",
        "JE SUIS — Rendre son temple vivant : ordre intérieur, sobriété, retour au centre.",
        "Axis Lumen Studio : Comprendre, Pratiquer, Observer, Noter, Valider."
      ])),
      section("Validation", validation),
      '<div class="notice">' + escapeHtml(notice) + "</div>",
      '<div class="footer">© Axis Lumen Studio — Support pédagogique protégé.</div>',
      "</main>",
      "</body>",
      "</html>"
    ].join("");

    var win = window.open("", "_blank");

    if (!win) {
      alert("Le navigateur a bloqué l’ouverture du PDF. Autorise les pop-ups pour localhost, puis réessaie.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
  }

  window.AxisCourse003PdfForceFix = {
    open: openCourse003Pdf
  };

  window.openPrintablePdfCourse003 = openCourse003Pdf;

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target) return;

    var button = target.closest("button, a");
    if (!button) return;

    var text = normalizeText(button.textContent || button.innerText || "");
    var href = normalizeText(button.getAttribute("href") || "");
    var cls = normalizeText(button.className || "");

    var isPdfButton =
      text.indexOf("pdf") !== -1 ||
      href.indexOf("pdf") !== -1 ||
      cls.indexOf("pdf") !== -1;

    if (!isPdfButton) return;

    var pageText = normalizeText(document.body.innerText || "");
    var course3Visible = pageText.indexOf("maintenir son temple propre") !== -1;

    if (!course3Visible) return;

    event.preventDefault();
    event.stopPropagation();
    if (event.stopImmediatePropagation) event.stopImmediatePropagation();

    openCourse003Pdf();
  }, true);
})();
