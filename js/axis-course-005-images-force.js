(function () {
  "use strict";

  const COURSE_ID = "course-005";
  const MAIN_IMAGE = "assets/courses/course-005/8de58bb7-3725-4e15-84f3-860413d894ec.png";

  const COURSE_IMAGES = {
    cover: MAIN_IMAGE,
    main: MAIN_IMAGE,
    card: MAIN_IMAGE,
    pdfCover: MAIN_IMAGE,
    "2a0302a8_1232_4544_bf14_0bd665ae55d4": "assets/courses/course-005/2a0302a8-1232-4544-bf14-0bd665ae55d4.png",
    "51bf665d_4b2b_496d_9920_f2a097d42b91": "assets/courses/course-005/51bf665d-4b2b-496d-9920-f2a097d42b91.png",
    "8de58bb7_3725_4e15_84f3_860413d894ec": "assets/courses/course-005/8de58bb7-3725-4e15-84f3-860413d894ec.png",
    "90ad867d_de9c_4a27_8a58_b8e9b7bdc060": "assets/courses/course-005/90ad867d-de9c-4a27-8a58-b8e9b7bdc060.png",
    "a1e518bf_c46a_40c0_a408_71f0162495f4": "assets/courses/course-005/a1e518bf-c46a-40c0-a408-71f0162495f4.png",
    "ce64ca95_e4b1_425c_8ca9_69a57d0b19ba": "assets/courses/course-005/ce64ca95-e4b1-425c-8ca9-69a57d0b19ba.png",
    "e96c9bbd_e7e0_4770_a850_2527e093869d": "assets/courses/course-005/e96c9bbd-e7e0-4770-a850-2527e093869d.png",
    "fdcbb514_c869_4f22_86a9_c70c1c417a29": "assets/courses/course-005/fdcbb514-c869-4f22-86a9-c70c1c417a29.png"
  };

  const COURSE_GALLERY = [
    { key: "2a0302a8-1232-4544-bf14-0bd665ae55d4.png", src: "assets/courses/course-005/2a0302a8-1232-4544-bf14-0bd665ae55d4.png" },
    { key: "51bf665d-4b2b-496d-9920-f2a097d42b91.png", src: "assets/courses/course-005/51bf665d-4b2b-496d-9920-f2a097d42b91.png" },
    { key: "8de58bb7-3725-4e15-84f3-860413d894ec.png", src: "assets/courses/course-005/8de58bb7-3725-4e15-84f3-860413d894ec.png" },
    { key: "90ad867d-de9c-4a27-8a58-b8e9b7bdc060.png", src: "assets/courses/course-005/90ad867d-de9c-4a27-8a58-b8e9b7bdc060.png" },
    { key: "a1e518bf-c46a-40c0-a408-71f0162495f4.png", src: "assets/courses/course-005/a1e518bf-c46a-40c0-a408-71f0162495f4.png" },
    { key: "ce64ca95-e4b1-425c-8ca9-69a57d0b19ba.png", src: "assets/courses/course-005/ce64ca95-e4b1-425c-8ca9-69a57d0b19ba.png" },
    { key: "e96c9bbd-e7e0-4770-a850-2527e093869d.png", src: "assets/courses/course-005/e96c9bbd-e7e0-4770-a850-2527e093869d.png" },
    { key: "fdcbb514-c869-4f22-86a9-c70c1c417a29.png", src: "assets/courses/course-005/fdcbb514-c869-4f22-86a9-c70c1c417a29.png" }
  ];

  function isCourse005(course) {
    if (!course) return false;

    const id = String(course.id || course.slug || course.key || "").toLowerCase();
    const number = String(course.number || course.num || "").trim();
    const title = String(course.title || course.name || "").toLowerCase();

    return (
      id === COURSE_ID ||
      id.includes(COURSE_ID) ||
      number === "5" ||
      title.includes("préparer une séance") ||
      title.includes("preparer une seance") ||
      title.includes("ouvrir le seuil")
    );
  }

  function enrichCourse(course) {
    if (!course) return course;

    course.image = MAIN_IMAGE;
    course.cover = MAIN_IMAGE;
    course.coverImage = MAIN_IMAGE;
    course.thumbnail = MAIN_IMAGE;
    course.hero = MAIN_IMAGE;

    course.images = Object.assign({}, course.images || {}, COURSE_IMAGES);
    course.gallery = COURSE_GALLERY;

    course.pdf = Object.assign({}, course.pdf || {}, {
      title: "Cours 5 — Préparer une séance : ouvrir le seuil",
      cover: MAIN_IMAGE,
      image: MAIN_IMAGE,
      images: COURSE_IMAGES,
      protectedNotice: "Document réservé à l’usage personnel de l’élève — Axis Lumen Studio / Michael Chauvet."
    });

    return course;
  }

  function enrichAllKnownSources() {
    const sources = [
      window.AXIS_ONE_HOUR_COURSES,
      window.RAW_COURSES,
      window.AXIS_COURSES,
      window.axisCourses,
      window.learningCourses,
      window.courses
    ];

    let found = null;

    sources.forEach((src) => {
      if (!Array.isArray(src)) return;

      src.forEach((course) => {
        if (isCourse005(course)) {
          found = enrichCourse(course);
        }
      });
    });

    return found;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function forceCardImage() {
    const grid = document.querySelector("#axisLearnGrid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll("article, .card, [class*='card'], [data-course-id], [data-id], li, .axis-learn-card, .axis-course-card, .learn-card"));

    cards.forEach((card) => {
      const text = String(card.textContent || "").toLowerCase();
      const html = String(card.innerHTML || "").toLowerCase();
      const dataId = String(card.dataset.courseId || card.dataset.id || "").toLowerCase();

      const match =
        dataId.includes(COURSE_ID) ||
        html.includes(COURSE_ID) ||
        text.includes("préparer une séance") ||
        text.includes("preparer une seance") ||
        text.includes("ouvrir le seuil");

      if (!match) return;

      card.classList.add("axis-course-005-force-card");

      let img =
        card.querySelector("img.axis-course-005-main-image") ||
        card.querySelector("img");

      if (!img) {
        img = document.createElement("img");
        card.insertBefore(img, card.firstChild);
      }

      img.classList.add("axis-course-005-main-image");
      img.src = MAIN_IMAGE;
      img.alt = "Cours 5 — Préparer une séance : ouvrir le seuil";
      img.loading = "lazy";

      img.style.width = "100%";
      img.style.height = "240px";
      img.style.objectFit = "cover";
      img.style.display = "block";
      img.style.borderRadius = "20px";
      img.style.marginBottom = "16px";
      img.style.border = "1px solid rgba(214,180,106,.45)";
      img.style.boxShadow = "0 22px 55px rgba(0,0,0,.32)";
    });
  }

  function forceReaderImages() {
    const reader = document.querySelector("#axisLearnReader");
    if (!reader) return;

    const text = String(reader.textContent || "").toLowerCase();
    const html = String(reader.innerHTML || "").toLowerCase();

    const match =
      html.includes(COURSE_ID) ||
      text.includes("préparer une séance") ||
      text.includes("preparer une seance") ||
      text.includes("ouvrir le seuil");

    if (!match) return;

    let hero = reader.querySelector(".axis-course-005-reader-hero");

    if (!hero) {
      hero = document.createElement("figure");
      hero.className = "axis-course-005-reader-hero";
      hero.innerHTML = '<img src="' + esc(MAIN_IMAGE) + '" alt="Cours 5 — Préparer une séance : ouvrir le seuil">';
      reader.insertBefore(hero, reader.firstChild);
    } else {
      const img = hero.querySelector("img");
      if (img) img.src = MAIN_IMAGE;
    }

    if (!reader.querySelector(".axis-course-005-reader-gallery")) {
      const gallery = document.createElement("section");
      gallery.className = "axis-course-005-reader-gallery";
      gallery.innerHTML =
        '<h3>Images du cours 5</h3>' +
        '<div>' +
        COURSE_GALLERY.map((item) => {
          return '<figure><img src="' + esc(item.src) + '" alt="' + esc(item.key) + '"><figcaption>' + esc(item.key) + '</figcaption></figure>';
        }).join("") +
        '</div>';

      reader.appendChild(gallery);
    }
  }

  function buildCourse005Pdf(course) {
    course = enrichCourse(course || enrichAllKnownSources() || {});

    const title = course.title || "Cours 5 — Préparer une séance : ouvrir le seuil";
    const subtitle = course.subtitle || "Créer le seuil juste avant toute pratique";
    const summary = course.longSummary || course.shortSummary || "Ce module apprend à préparer l’espace, le corps, la lumière, le carnet et l’intention afin qu’une séance commence dans la présence plutôt que dans la dispersion.";

    const minutePlan = course.minutePlan || [
      "0–5 min : ouvrir le seuil et quitter l’agitation.",
      "5–15 min : comprendre le rôle du lieu et du passage.",
      "15–25 min : préparer la lumière douce, le carnet, l’eau et la posture.",
      "25–35 min : consulter l’état réel du corps, des yeux, du ventre, de la nuque et du souffle.",
      "35–50 min : pratique guidée d’entrée dans la séance.",
      "50–60 min : observation, carnet, validation et clôture."
    ];

    const journalQuestions = course.journalQuestions || [
      "Dans quel état réel suis-je arrivé ?",
      "Qu’est-ce qui a changé quand j’ai préparé le lieu ?",
      "Mon corps était-il disponible, lourd, agité ou clair ?",
      "Quelle intention ai-je posée ?",
      "Qu’est-ce que je peux valider concrètement aujourd’hui ?"
    ];

    function list(items) {
      return "<ul>" + items.map((item) => "<li>" + esc(item) + "</li>").join("") + "</ul>";
    }

    return '<!doctype html>' +
      '<html lang="fr">' +
      '<head>' +
        '<meta charset="utf-8">' +
        '<title>' + esc(title) + '</title>' +
        '<style>' +
          '@page{size:A4;margin:15mm}' +
          'body{margin:0;background:#f6efe2;color:#111827;font-family:Georgia,serif;line-height:1.55}' +
          '.cover{min-height:96vh;position:relative;background:#08111f;color:#ffe9b3;display:flex;align-items:flex-end;overflow:hidden;padding:28mm 20mm;box-sizing:border-box}' +
          '.cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.62}' +
          '.cover:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.82),rgba(0,0,0,.22),rgba(0,0,0,.35))}' +
          '.cover-content{position:relative;z-index:2}' +
          '.kicker{text-transform:uppercase;letter-spacing:.18em;color:#d8bd78;font-size:11px}' +
          'h1{font-size:36px;line-height:1.08;margin:10px 0;color:#ffe9b3}' +
          '.subtitle{font-size:18px;color:#f5dfac}' +
          'main{padding:14mm 18mm}' +
          'section{break-inside:avoid;margin-bottom:18px}' +
          'h2{font-size:24px;color:#10203a;border-bottom:1px solid #d8bd78;padding-bottom:6px;margin-top:20px}' +
          'h3{font-size:17px;color:#24385d}' +
          '.image{margin:18px 0;break-inside:avoid}' +
          '.image img{width:100%;max-height:145mm;object-fit:cover;border-radius:16px;border:1px solid #d8bd78}' +
          '.gallery{display:grid;grid-template-columns:1fr 1fr;gap:12px}' +
          '.gallery figure{margin:0;break-inside:avoid}' +
          '.gallery img{width:100%;height:90mm;object-fit:cover;border-radius:14px;border:1px solid #d8bd78}' +
          '.gallery figcaption{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-top:4px}' +
          '.phrase{font-size:21px;font-style:italic;color:#6d4f13;border-left:4px solid #d8bd78;padding-left:12px}' +
          '.notice{background:#fffaf0;border:1px solid #d8bd78;padding:12px;margin-top:20px}' +
          '.footer{font-size:11px;color:#6b7280;border-top:1px solid #d8bd78;margin-top:28px;padding-top:8px}' +
          '@media print{button{display:none}}' +
        '</style>' +
      '</head>' +
      '<body>' +
        '<section class="cover">' +
          '<img src="' + esc(MAIN_IMAGE) + '" alt="Couverture du cours 5">' +
          '<div class="cover-content">' +
            '<div class="kicker">Axis Lumen Studio — École du Temple Vivant</div>' +
            '<h1>' + esc(title) + '</h1>' +
            '<div class="subtitle">' + esc(subtitle) + '</div>' +
          '</div>' +
        '</section>' +

        '<main>' +
          '<section>' +
            '<h2>Résumé du module</h2>' +
            '<p>' + esc(summary) + '</p>' +
            '<figure class="image"><img src="' + esc(MAIN_IMAGE) + '" alt="Image principale du cours 5"></figure>' +
          '</section>' +

          '<section>' +
            '<h2>Objectifs</h2>' +
            '<h3>Objectif pédagogique</h3>' +
            '<p>' + esc(course.pedagogicalObjective || "Savoir préparer une séance complète : lieu, posture, lumière douce, carnet, intention, sécurité et disponibilité intérieure.") + '</p>' +
            '<h3>Objectif initiatique</h3>' +
            '<p>' + esc(course.initiaticObjective || "Comprendre que le seuil est déjà une initiation : il transforme une pratique ordinaire en acte conscient.") + '</p>' +
          '</section>' +

          '<section>' +
            '<h2>Plan minute par minute</h2>' +
            list(minutePlan) +
          '</section>' +

          '<section>' +
            '<h2>Enseignement</h2>' +
            '<p>Une séance ne commence pas quand les yeux se ferment. Elle commence au moment où l’élève retire ce qui disperse, prépare son espace, consulte son corps et pose une intention simple. Sans seuil, la pratique reste une activité ajoutée au bruit. Avec un seuil, elle devient un passage.</p>' +
            '<p>Le lieu n’a pas besoin d’être parfait. Il doit être choisi. Une chaise stable, une lumière douce, un carnet, un verre d’eau et quelques minutes sans interruption suffisent à ouvrir une vraie chambre intérieure.</p>' +
            '<p>Le corps doit être consulté avant d’être engagé. Si les yeux sont fatigués, on évite toute lumière intense. Si la nuque est tendue, on évite les mouvements amples. Si le ventre est lourd, on privilégie une séance douce. La discipline donne une forme ; la violence force le passage.</p>' +
          '</section>' +

          '<section>' +
            '<h2>Pratique guidée</h2>' +
            '<p><strong>Nom :</strong> Ouvrir le seuil de la séance</p>' +
            '<p><strong>Durée :</strong> 20 minutes</p>' +
            '<p><strong>Intention :</strong> passer de la dispersion à une présence stable, simple et praticable.</p>' +
            list([
              "Éloigner le téléphone et les écrans.",
              "Ranger l’espace immédiat.",
              "Installer une lumière douce, indirecte, jamais agressive.",
              "Préparer le carnet et un verre d’eau.",
              "S’asseoir sans commencer tout de suite.",
              "Sentir les pieds, les mains, le dos, la nuque, les yeux et le souffle.",
              "Nommer intérieurement l’état réel du moment.",
              "Choisir une intention simple.",
              "Entrer dans la pratique sans chercher le phénomène."
            ]) +
          '</section>' +

          '<section>' +
            '<h2>Script vocal</h2>' +
            '<p>Installe-toi. Ne commence pas encore. Laisse le corps comprendre que tu entres dans un autre temps. Retire ce qui disperse. Sens les pieds. Sens les mains. Sens la colonne. La séance commence ici, dans cette décision simple de devenir présent.</p>' +
          '</section>' +

          '<section>' +
            '<h2>Carnet d’expérience</h2>' +
            list(journalQuestions) +
          '</section>' +

          '<section>' +
            '<h2>Galerie du cours</h2>' +
            '<div class="gallery">' +
              COURSE_GALLERY.map((item) => {
                return '<figure><img src="' + esc(item.src) + '" alt="' + esc(item.key) + '"><figcaption>' + esc(item.key) + '</figcaption></figure>';
              }).join("") +
            '</div>' +
          '</section>' +

          '<section>' +
            '<h2>Phrase essentielle</h2>' +
            '<p class="phrase">' + esc(course.essentialPhrase || "Sans seuil, il n’y a pas de temple ; il n’y a qu’une activité de plus ajoutée au bruit.") + '</p>' +
          '</section>' +

          '<section>' +
            '<h2>Validation</h2>' +
            '<p>' + esc(course.validation || "Le cours est validé lorsque l’élève sait préparer son lieu, choisir une lumière douce, consulter son état corporel, poser une intention simple et noter une observation claire dans son carnet.") + '</p>' +
            '<div class="notice">Document protégé — Usage personnel de l’élève — Axis Lumen Studio / Michael Chauvet.</div>' +
            '<div class="footer">© Axis Lumen Studio / Michael Chauvet</div>' +
          '</section>' +
        '</main>' +
      '</body>' +
      '</html>';
  }

  function patchPdf() {
    const oldOpenPrintablePdf = window.openPrintablePdf;

    window.openPrintablePdf = function (course) {
      if (isCourse005(course)) {
        const html = buildCourse005Pdf(course);
        const win = window.open("", "_blank");

        if (!win) {
          alert("Fenêtre PDF bloquée. Autorise les pop-ups pour imprimer le cours.");
          return;
        }

        win.document.open();
        win.document.write(html);
        win.document.close();
        win.focus();

        setTimeout(function () {
          try { win.print(); } catch (e) {}
        }, 800);

        return;
      }

      if (typeof oldOpenPrintablePdf === "function") {
        return oldOpenPrintablePdf.apply(this, arguments);
      }
    };
  }

  function injectStyles() {
    if (document.getElementById("axis-course-005-force-style")) return;

    const style = document.createElement("style");
    style.id = "axis-course-005-force-style";
    style.textContent = 
      .axis-course-005-reader-hero {
        margin: 0 0 28px 0;
      }

      .axis-course-005-reader-hero img {
        width: 100%;
        max-height: 420px;
        object-fit: cover;
        display: block;
        border-radius: 28px;
        border: 1px solid rgba(214,180,106,.45);
        box-shadow: 0 24px 70px rgba(0,0,0,.35);
      }

      .axis-course-005-reader-gallery {
        margin-top: 34px;
        padding: 24px;
        border-radius: 26px;
        background: rgba(8,17,31,.46);
        border: 1px solid rgba(214,180,106,.32);
      }

      .axis-course-005-reader-gallery h3 {
        margin-top: 0;
        color: #f5d58a;
      }

      .axis-course-005-reader-gallery > div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 14px;
      }

      .axis-course-005-reader-gallery figure {
        margin: 0;
      }

      .axis-course-005-reader-gallery img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
        border-radius: 18px;
        border: 1px solid rgba(214,180,106,.32);
      }

      .axis-course-005-reader-gallery figcaption {
        margin-top: 6px;
        font-size: 11px;
        opacity: .7;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
    ;

    document.head.appendChild(style);
  }

  function refreshRenderers() {
    const renderers = [
      "renderAxisLearnGrid",
      "renderAxisLearnReader",
      "renderLearnGrid",
      "renderLearnReader",
      "axisRenderLearnGrid",
      "axisRenderLearnReader",
      "renderCourses",
      "renderCourseGrid"
    ];

    renderers.forEach((name) => {
      if (typeof window[name] === "function") {
        try { window[name](); } catch (e) {}
      }
    });
  }

  function boot() {
    injectStyles();
    enrichAllKnownSources();
    patchPdf();

    setTimeout(function () {
      enrichAllKnownSources();
      refreshRenderers();
      forceCardImage();
      forceReaderImages();
    }, 200);

    setTimeout(function () {
      forceCardImage();
      forceReaderImages();
    }, 900);

    setTimeout(function () {
      forceCardImage();
      forceReaderImages();
    }, 1800);

    const observer = new MutationObserver(function () {
      enrichAllKnownSources();
      forceCardImage();
      forceReaderImages();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    window.AxisCourse005CoverFix = {
      mainImage: MAIN_IMAGE,
      images: COURSE_IMAGES,
      gallery: COURSE_GALLERY,
      refresh: function () {
        enrichAllKnownSources();
        forceCardImage();
        forceReaderImages();
      },
      print: function () {
        const course = enrichAllKnownSources();
        const html = buildCourse005Pdf(course);
        const win = window.open("", "_blank");
        win.document.open();
        win.document.write(html);
        win.document.close();
        setTimeout(function () { win.print(); }, 800);
      }
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
