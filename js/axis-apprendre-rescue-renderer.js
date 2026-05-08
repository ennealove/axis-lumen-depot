(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getCourses() {
    var pools = [
      window.AXIS_ONE_HOUR_COURSES,
      window.RAW_COURSES,
      window.AXIS_COURSES,
      window.COURSES,
      window.learningCourses,
      window.axisCourses
    ];

    for (var i = 0; i < pools.length; i += 1) {
      if (Array.isArray(pools[i]) && pools[i].length >= 50) {
        return pools[i];
      }
    }

    for (var j = 0; j < pools.length; j += 1) {
      if (Array.isArray(pools[j]) && pools[j].length > 0) {
        return pools[j];
      }
    }

    return [];
  }

  function getNumber(course, index) {
    return Number(course.number || course.num || course.courseNumber || index + 1);
  }

  function getTitle(course, index) {
    if (course.title) return course.title;
    if (course.name) return course.name;
    return "Cours " + getNumber(course, index);
  }

  function getFamily(course) {
    return course.familyTitle || course.family || course.familyId || course.chapter || "Fondation";
  }

  function getSummary(course) {
    return course.shortSummary || course.summary || course.longSummary || course.description || "Module Axis Lumen Studio.";
  }

  function getDuration(course) {
    return course.duration || (course.durationMin ? course.durationMin + " min" : "1 h");
  }

  function getLevel(course) {
    return course.level || "Fondation";
  }

  function getKind(course) {
    return course.kind || course.type || "Cours";
  }

  function getImage(course) {
    var images = course.images || {};
    return (
      course.coverImage ||
      course.image ||
      course.cover ||
      course.thumbnail ||
      course.hero ||
      images.cover ||
      (Array.isArray(images.gallery) ? images.gallery[0] : "") ||
      ""
    );
  }

  function list(items) {
    if (!items) return "";
    var arr = Array.isArray(items) ? items : [items];

    return "<ul>" + arr.map(function (item) {
      if (typeof item === "object" && item !== null) {
        return "<li><strong>" + esc(item.time || item.title || "") + "</strong> " + esc(item.content || item.text || item.details || "") + "</li>";
      }

      return "<li>" + esc(item) + "</li>";
    }).join("") + "</ul>";
  }

  function paragraphs(value) {
    if (!value) return "";

    if (Array.isArray(value)) {
      return value.map(function (item) {
        if (typeof item === "object" && item !== null) {
          return "<p><strong>" + esc(item.time || item.title || "") + "</strong> " + esc(item.text || item.content || "") + "</p>";
        }

        return "<p>" + esc(item) + "</p>";
      }).join("");
    }

    return String(value)
      .split(/\n{2,}/)
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("");
  }

  function getGallery(course) {
    var images = course.images || {};
    var out = [];

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

  function renderTeaching(course) {
    var teaching = course.teaching;
    if (!teaching) return "";

    var html = "";

    if (teaching.intro) {
      html += "<p>" + esc(teaching.intro) + "</p>";
    }

    if (Array.isArray(teaching.sections)) {
      html += teaching.sections.map(function (section) {
        return "<article class='axis-rescue-inner-section'>" +
          "<h4>" + esc(section.title || "") + "</h4>" +
          "<p>" + esc(section.content || section.text || "") + "</p>" +
        "</article>";
      }).join("");
    }

    return html;
  }

  function renderPractice(course) {
    var p = course.practice;
    if (!p) return "";

    return [
      p.name ? "<h4>" + esc(p.name) + "</h4>" : "",
      p.duration ? "<p><strong>Durée :</strong> " + esc(p.duration) + "</p>" : "",
      p.intention ? "<p><strong>Intention :</strong> " + esc(p.intention) + "</p>" : "",
      p.material ? "<h4>Matériel</h4>" + list(p.material) : "",
      p.posture ? "<h4>Posture</h4><p>" + esc(p.posture) + "</p>" : "",
      p.steps ? "<h4>Étapes</h4>" + list(p.steps) : "",
      p.adaptations ? "<h4>Adaptations</h4>" + list(p.adaptations) : "",
      p.safety ? "<h4>Sécurité</h4>" + list(p.safety) : ""
    ].join("");
  }

  function renderReader(course, index) {
    var reader = document.getElementById("axisLearnReader");
    if (!reader) return;

    var number = getNumber(course, index);
    var title = getTitle(course, index);
    var subtitle = course.subtitle || "";
    var gallery = getGallery(course);

    reader.innerHTML = [
      "<article class='axis-rescue-reader'>",
        "<div class='axis-rescue-reader-head'>",
          "<div class='axis-rescue-kicker'>Cours " + esc(number) + " · " + esc(getFamily(course)) + " · " + esc(getDuration(course)) + "</div>",
          "<h2>" + esc(title) + "</h2>",
          subtitle ? "<p class='axis-rescue-subtitle'>" + esc(subtitle) + "</p>" : "",
        "</div>",

        getImage(course) ? "<figure class='axis-rescue-hero'><img src='" + esc(getImage(course)) + "' alt='" + esc(title) + "' loading='lazy'></figure>" : "",

        "<section><h3>Résumé</h3>" + paragraphs(course.longSummary || course.summary || course.shortSummary || getSummary(course)) + "</section>",

        course.pedagogicalObjective || course.initiaticObjective
          ? "<section><h3>Objectifs</h3>" +
              (course.pedagogicalObjective ? "<p><strong>Objectif pédagogique :</strong> " + esc(course.pedagogicalObjective) + "</p>" : "") +
              (course.initiaticObjective ? "<p><strong>Objectif initiatique :</strong> " + esc(course.initiaticObjective) + "</p>" : "") +
            "</section>"
          : "",

        course.minutePlan ? "<section><h3>Plan minute par minute</h3>" + list(course.minutePlan) + "</section>" : "",
        gallery.length ? "<section><h3>Images du cours</h3><div class='axis-rescue-gallery'>" + gallery.map(function (src) {
          return "<figure><img src='" + esc(src) + "' alt='' loading='lazy'></figure>";
        }).join("") + "</div></section>" : "",
        course.teaching ? "<section><h3>Enseignement</h3>" + renderTeaching(course) + "</section>" : "",

        course.contemplation ? "<section><h3>Contemplation</h3>" +
          (course.contemplation.duration ? "<p><strong>Durée :</strong> " + esc(course.contemplation.duration) + "</p>" : "") +
          (course.contemplation.question ? "<p><strong>Question :</strong> " + esc(course.contemplation.question) + "</p>" : "") +
          (course.contemplation.guidance ? "<p>" + esc(course.contemplation.guidance) + "</p>" : "") +
        "</section>" : "",

        course.practice ? "<section><h3>Pratique</h3>" + renderPractice(course) + "</section>" : "",
        course.vocalScript ? "<section><h3>Script vocal</h3>" + paragraphs(course.vocalScript) + "</section>" : "",
        course.journalQuestions ? "<section><h3>Questions de carnet</h3>" + list(course.journalQuestions) + "</section>" : "",
        course.essentialPhrase ? "<section class='axis-rescue-phrase'>" + esc(course.essentialPhrase) + "</section>" : "",
        course.references ? "<section><h3>Références</h3>" + list(course.references) + "</section>" : "",
        course.validation ? "<section><h3>Validation</h3>" + (course.validation.criteria ? list(course.validation.criteria) : list(course.validation)) + "</section>" : "",

        "<div class='axis-rescue-actions'>",
          "<button type='button' data-axis-rescue-pdf='" + esc(number) + "'>PDF premium</button>",
        "</div>",
      "</article>"
    ].join("");

    reader.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function printablePdf(course, index) {
    var title = (course.pdf && course.pdf.title) || getTitle(course, index);
    var cover = getImage(course);
    var gallery = getGallery(course);

    var html = [
      "<!doctype html>",
      "<html lang='fr'>",
      "<head>",
        "<meta charset='utf-8'>",
        "<title>" + esc(title) + "</title>",
        "<style>",
          "body{margin:0;background:#eee8dc;color:#111827;font-family:Georgia,serif;line-height:1.55}",
          ".page{width:min(940px,calc(100% - 32px));margin:24px auto;padding:48px;background:#fffaf0;border:1px solid rgba(185,153,85,.45)}",
          ".cover{min-height:620px;position:relative;background:#07111f;color:white;border-radius:28px;overflow:hidden;display:flex;align-items:flex-end;padding:42px}",
          ".cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.58}",
          ".cover:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.78),rgba(0,0,0,.1))}",
          ".cover div{position:relative;z-index:1}",
          "h1{font-size:42px;line-height:1.1;color:#f8dfa0}",
          "h2{border-top:1px solid rgba(185,153,85,.35);padding-top:18px;color:#2c2415}",
          ".grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}",
          ".grid img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px}",
          ".phrase{margin:24px 0;padding:22px;background:#111827;color:#f6e4aa;border-radius:18px;text-align:center;font-size:21px}",
          "@media print{body{background:white}.page{width:auto;margin:0;border:none}.cover{page-break-after:always}}",
        "</style>",
      "</head>",
      "<body>",
      "<main class='page'>",
        "<section class='cover'>",
          cover ? "<img src='" + esc(cover) + "' alt=''>" : "",
          "<div><p>Axis Lumen Studio — École du Temple Vivant</p><h1>" + esc(title) + "</h1><p>" + esc(course.subtitle || "") + "</p></div>",
        "</section>",
        "<h2>Résumé</h2>",
        paragraphs(course.longSummary || course.summary || course.shortSummary || getSummary(course)),
        "<h2>Objectifs</h2>",
        course.pedagogicalObjective ? "<p><strong>Objectif pédagogique :</strong> " + esc(course.pedagogicalObjective) + "</p>" : "",
        course.initiaticObjective ? "<p><strong>Objectif initiatique :</strong> " + esc(course.initiaticObjective) + "</p>" : "",
        course.minutePlan ? "<h2>Plan du module</h2>" + list(course.minutePlan) : "",
        gallery.length ? "<h2>Images du cours</h2><div class='grid'>" + gallery.map(function (src) { return "<img src='" + esc(src) + "' alt=''>"; }).join("") + "</div>" : "",
        course.teaching ? "<h2>Enseignement</h2>" + renderTeaching(course) : "",
        course.practice ? "<h2>Protocole pratique</h2>" + renderPractice(course) : "",
        course.vocalScript ? "<h2>Script vocal</h2>" + paragraphs(course.vocalScript) : "",
        course.journalQuestions ? "<h2>Questions de carnet</h2>" + list(course.journalQuestions) : "",
        course.essentialPhrase ? "<div class='phrase'>" + esc(course.essentialPhrase) + "</div>" : "",
        course.references ? "<h2>Références</h2>" + list(course.references) : "",
        course.validation ? "<h2>Validation</h2>" + (course.validation.criteria ? list(course.validation.criteria) : list(course.validation)) : "",
        "<p><strong>Document protégé :</strong> Axis Lumen Studio / Michael Chauvet.</p>",
      "</main>",
      "<script>setTimeout(function(){window.print()},600)</script>",
      "</body>",
      "</html>"
    ].join("");

    var win = window.open("", "_blank");

    if (!win) {
      alert("Fenêtre PDF bloquée. Autorise les pop-ups pour localhost.");
      return;
    }

    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
  }

  function renderGrid(force) {
    var grid = document.getElementById("axisLearnGrid");
    if (!grid) return;

    var courses = getCourses();

    if (!courses.length) {
      grid.innerHTML = "<div class='axis-rescue-empty'><h2>Aucun cours trouvé</h2><p>Le fichier des cours est chargé, mais aucun tableau de cours n’est disponible dans window.AXIS_ONE_HOUR_COURSES.</p></div>";
      return;
    }

    if (!force && grid.children.length > 0 && grid.innerText.trim().length > 50) {
      return;
    }

    grid.classList.add("axis-rescue-grid");

    grid.innerHTML = courses.map(function (course, index) {
      var number = getNumber(course, index);
      var title = getTitle(course, index);
      var image = getImage(course);

      return [
        "<article class='axis-rescue-card' data-axis-course-number='" + esc(number) + "'>",
          image ? "<img class='axis-rescue-card-img' src='" + esc(image) + "' alt='" + esc(title) + "' loading='lazy'>" : "",
          "<div class='axis-rescue-card-body'>",
            "<div class='axis-rescue-card-meta'>Cours " + esc(number) + " · " + esc(getFamily(course)) + "</div>",
            "<h3>" + esc(title) + "</h3>",
            course.subtitle ? "<p class='axis-rescue-card-subtitle'>" + esc(course.subtitle) + "</p>" : "",
            "<p>" + esc(getSummary(course)) + "</p>",
            "<div class='axis-rescue-tags'>",
              "<span>" + esc(getDuration(course)) + "</span>",
              "<span>" + esc(getLevel(course)) + "</span>",
              "<span>" + esc(getKind(course)) + "</span>",
            "</div>",
            "<div class='axis-rescue-actions'>",
              "<button type='button' data-axis-rescue-read='" + esc(number) + "'>Lire le cours</button>",
              "<button type='button' data-axis-rescue-practice='" + esc(number) + "'>Pratiquer</button>",
              "<button type='button' data-axis-rescue-pdf='" + esc(number) + "'>PDF premium</button>",
            "</div>",
          "</div>",
        "</article>"
      ].join("");
    }).join("");

    document.documentElement.setAttribute("data-axis-rescue-course-count", String(courses.length));
    window.AxisRescueCourses = courses;
  }

  function injectStyles() {
    if (document.getElementById("axis-rescue-renderer-style")) return;

    var style = document.createElement("style");
    style.id = "axis-rescue-renderer-style";
    style.textContent = [
      "#axisLearnGrid.axis-rescue-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}",
      ".axis-rescue-card{border:1px solid rgba(218,184,104,.28);border-radius:24px;overflow:hidden;background:rgba(7,17,31,.76);box-shadow:0 18px 50px rgba(0,0,0,.28)}",
      ".axis-rescue-card-img{width:100%;height:220px;object-fit:cover;display:block}",
      ".axis-rescue-card-body{padding:18px}",
      ".axis-rescue-card-meta{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:#d8b86f;margin-bottom:8px}",
      ".axis-rescue-card h3{margin:.2rem 0 .6rem;color:#f7e6b1}",
      ".axis-rescue-card p{color:rgba(255,255,255,.78)}",
      ".axis-rescue-card-subtitle{color:#f2d58b!important}",
      ".axis-rescue-tags{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}",
      ".axis-rescue-tags span{font-size:.76rem;border:1px solid rgba(218,184,104,.28);border-radius:999px;padding:5px 9px;color:#f5d58a}",
      ".axis-rescue-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}",
      ".axis-rescue-actions button{cursor:pointer;border:1px solid rgba(218,184,104,.55);border-radius:999px;background:linear-gradient(135deg,#f1d58b,#b99955);color:#07111f;font-weight:800;padding:9px 14px}",
      ".axis-rescue-reader{padding:24px;border:1px solid rgba(218,184,104,.28);border-radius:28px;background:rgba(7,17,31,.72)}",
      ".axis-rescue-reader h2{color:#f7e6b1;font-size:2rem}",
      ".axis-rescue-reader h3{color:#f2d58b;margin-top:26px}",
      ".axis-rescue-reader h4{color:#f7e6b1}",
      ".axis-rescue-reader p,.axis-rescue-reader li{color:rgba(255,255,255,.82)}",
      ".axis-rescue-kicker{color:#d8b86f;text-transform:uppercase;letter-spacing:.12em;font-size:.82rem}",
      ".axis-rescue-subtitle{color:#f2d58b!important;font-size:1.1rem}",
      ".axis-rescue-hero img{width:100%;max-height:460px;object-fit:cover;border-radius:24px;border:1px solid rgba(218,184,104,.32)}",
      ".axis-rescue-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px}",
      ".axis-rescue-gallery figure{margin:0}",
      ".axis-rescue-gallery img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:16px;border:1px solid rgba(218,184,104,.25)}",
      ".axis-rescue-phrase{margin:26px 0;padding:22px;border-radius:18px;background:#111827;color:#f6e4aa!important;text-align:center;font-size:1.25rem}",
      ".axis-rescue-empty{padding:24px;border:1px solid #b99955;border-radius:18px;background:#111827;color:#f6e4aa}"
    ].join("\n");

    document.head.appendChild(style);
  }

  function installClicks() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;

      var btn = target.closest("[data-axis-rescue-read],[data-axis-rescue-practice],[data-axis-rescue-pdf]");
      if (!btn) return;

      var courses = getCourses();
      var number = Number(
        btn.getAttribute("data-axis-rescue-read") ||
        btn.getAttribute("data-axis-rescue-practice") ||
        btn.getAttribute("data-axis-rescue-pdf")
      );

      var course = courses.find(function (c, index) {
        return getNumber(c, index) === number;
      });

      if (!course) return;

      event.preventDefault();
      event.stopPropagation();

      if (btn.hasAttribute("data-axis-rescue-pdf")) {
        if (typeof window.openPrintablePdf === "function") {
          try {
            window.openPrintablePdf(course);
            return;
          } catch (e) {
            console.warn("openPrintablePdf a échoué, PDF secours utilisé.", e);
          }
        }

        printablePdf(course, Math.max(0, number - 1));
        return;
      }

      renderReader(course, Math.max(0, number - 1));
    }, true);
  }

  function boot() {
    injectStyles();
    installClicks();

    setTimeout(function () {
      renderGrid(false);
    }, 100);

    setTimeout(function () {
      renderGrid(false);
    }, 600);

    setTimeout(function () {
      renderGrid(false);
    }, 1500);

    window.AxisRescueRender = function () {
      renderGrid(true);
    };
  }

  ready(boot);
})();