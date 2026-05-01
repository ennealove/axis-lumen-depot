(function () {
  const STAMP = "20260501_182126";
  const COVERS = [
  { key: "je-suis", src: "assets/books/je-suis-cover.jpg", match: ["JE SUIS", "Rendre son temple vivant", "temple vivant"] },
  { key: "vertus", src: "assets/books/vertus-cover.jpg", match: ["Livre des Vertus", "Vertus"] },
  { key: "alimentation", src: "assets/books/alimentation-cover.jpg", match: ["Livre de l’Alimentation", "Livre de l'Alimentation", "Alimentation", "Terrain"] },
  { key: "exercices", src: "assets/books/exercices-cover.jpg", match: ["Livre d’Exercices", "Livre d'Exercices", "Exercices"] },
  { key: "pack-4", src: "assets/books/pack-complet-cover.jpg", match: ["Pack 4 livres", "Collection complète", "Collection complete"] },
  { key: "fondateur", src: "assets/books/pack-fondateur-cover.jpg", match: ["Pack fondateur", "Fondateur"] },
  { key: "terrain", src: "assets/books/pack-terrain-cover.jpg", match: ["Pack Terrain", "Terrain"] },
  { key: "abonnement", src: "assets/books/abonnement-cover.jpg", match: ["Abonnement Axis Lumen Studio", "Abonnement"] }
];

  const VIDEO_MAP = {
    lateral: [
      "assets/videos/web/balancement-lateral-complet.web.mp4",
      "assets/videos/complete/balancement-lateral-complet.mp4",
      "assets/vidéo/vidéo complète/utiles/balancement latéral 3 minutes .mp4"
    ],
    vertical: [
      "assets/videos/web/balancement-vertical-complet.web.mp4",
      "assets/videos/complete/balancement-vertical-complet.mp4"
    ],
    rotation: [
      "assets/videos/web/rotation-complete.web.mp4",
      "assets/videos/complete/rotation-complete.mp4",
      "assets/vidéo/vidéo complète/vidéo complète/rotation .mp4"
    ]
  };

  const SESSION_ENUMS = {
    intention: [
      "Recentrage",
      "Clarté",
      "Ancrage",
      "Purification du terrain",
      "Vertu du jour",
      "Souffle",
      "Lumière",
      "Rythme",
      "Apaisement",
      "Élévation"
    ],
    mouvement: [
      "Balancement latéral",
      "Balancement vertical",
      "Balancement rotatif",
      "Rotor optique",
      "Respiration complète",
      "Tensions statiques",
      "Observation lumineuse"
    ],
    respiration: [
      "Sans module respiratoire",
      "Respiration complète — 10 minutes",
      "Respiration calme",
      "Respiration rythmée",
      "Souffle carré",
      "Souffle d’intégration"
    ],
    duree: [
      "7 minutes",
      "12 minutes",
      "15 minutes",
      "20 minutes",
      "30 minutes",
      "45 minutes"
    ],
    integration: [
      "Rémanence — 2 min",
      "Rémanence — 3 min",
      "Observation intérieure",
      "Silence d’intégration",
      "Carnet d’expérience",
      "Clôture lumineuse"
    ]
  };

  function pageName() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function textIncludes(el, terms) {
    const txt = normalize(el ? el.textContent : "");

    return terms.some(function (term) {
      return txt.includes(normalize(term));
    });
  }

  function removeHomeVendreCard() {
    const page = pageName();

    if (page !== "index.html" && page !== "") return;

    const candidates = Array.from(document.querySelectorAll("article, .card, .step, .home-card, .feature-card, div"));

    candidates.forEach(function (el) {
      const txt = normalize(el.textContent);

      const isVendre =
        txt.includes("vendre") &&
        txt.includes("boutique") &&
        txt.includes("abonnement") &&
        txt.includes("parrainage");

      if (!isVendre) return;

      const parentCard = el.closest("article, .card, .step, .home-card, .feature-card") || el;
      parentCard.setAttribute("data-axis-home-vendre-hidden", "true");
    });
  }

  function applyVideoNoDownload() {
    document.querySelectorAll("video").forEach(function (video) {
      video.controls = true;
      video.style.pointerEvents = "auto";
      video.setAttribute("controlsList", "nodownload noremoteplayback");
      video.setAttribute("preload", "metadata");

      video.addEventListener("contextmenu", function (event) {
        event.preventDefault();
      });
    });
  }

  async function firstExistingVideo(candidates) {
    for (const src of candidates) {
      try {
        const response = await fetch(src + "?probe=" + STAMP, { method: "HEAD", cache: "no-store" });

        if (response.ok) {
          return src;
        }
      } catch (error) {}
    }

    return candidates[0];
  }

  function mainVideo() {
    const videos = Array.from(document.querySelectorAll("video"));

    if (!videos.length) return null;

    return videos.sort(function (a, b) {
      return (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight);
    })[0];
  }

  async function setOscillationVideo(kind) {
    const video = mainVideo();

    if (!video || !VIDEO_MAP[kind]) return;

    const src = await firstExistingVideo(VIDEO_MAP[kind]);

    if (!src) return;

    video.pause();
    video.src = src + "?v=" + STAMP;
    video.load();
    video.controls = true;
    video.style.pointerEvents = "auto";
    video.setAttribute("controlsList", "nodownload noremoteplayback");

    document.querySelectorAll(".axis-video-choice-active").forEach(function (el) {
      el.classList.remove("axis-video-choice-active");
    });

    document.querySelectorAll("[data-axis-video-kind='" + kind + "']").forEach(function (el) {
      el.classList.add("axis-video-choice-active");
    });
  }

  function connectOscillationButtons() {
    if (pageName() !== "oscillation.html") return;

    const clickable = Array.from(document.querySelectorAll("button, article, .card, .feature-card, div"));

    clickable.forEach(function (el) {
      const txt = normalize(el.textContent);
      let kind = "";

      if (txt.includes("lateral")) kind = "lateral";
      else if (txt.includes("vertical")) kind = "vertical";
      else if (txt.includes("rotation") || txt.includes("rotatif")) kind = "rotation";

      if (!kind) return;

      const card = el.closest("article, .card, .feature-card") || el;
      card.setAttribute("data-axis-video-kind", kind);
      card.style.cursor = "pointer";

      if (card.dataset.axisVideoBound === "1") return;

      card.dataset.axisVideoBound = "1";
      card.addEventListener("click", function () {
        setOscillationVideo(kind);
      });
    });

    setTimeout(function () {
      applyVideoNoDownload();
      setOscillationVideo("lateral");
    }, 400);
  }

  function findCardsForCovers() {
    const root = document.getElementById("boutique") || document.querySelector("main") || document.body;

    return Array.from(root.querySelectorAll("article, .axis-shop-card, .shop-card, .product-card, .card, [data-shop-offer]"))
      .filter(function (card) {
        const txt = normalize(card.textContent);
        return txt.includes("livre") ||
          txt.includes("je suis") ||
          txt.includes("vertus") ||
          txt.includes("alimentation") ||
          txt.includes("exercices") ||
          txt.includes("pack") ||
          txt.includes("abonnement");
      });
  }

  function coverForCard(card) {
    const txt = normalize(card.textContent);

    return COVERS.find(function (cover) {
      return cover.match.some(function (term) {
        return txt.includes(normalize(term));
      });
    });
  }

  function applyBookCovers() {
    if (pageName() !== "boutique.html") return;

    const cards = findCardsForCovers();

    cards.forEach(function (card) {
      const cover = coverForCard(card);
      if (!cover || !cover.src) return;

      let frame = card.querySelector(".axis-book-cover-frame");

      if (!frame) {
        frame = card.querySelector(".axis-shop-cover, .shop-cover, .product-cover, figure, picture");
      }

      if (!frame) {
        frame = document.createElement("div");
        frame.className = "axis-book-cover-frame";
        card.insertBefore(frame, card.firstChild);
      }

      frame.classList.add("axis-book-cover-frame");
      frame.innerHTML = "";

      const img = document.createElement("img");
      img.className = "axis-book-cover-restored";
      img.src = cover.src + "?v=" + STAMP;
      img.alt = "Couverture " + cover.key;
      img.loading = "lazy";

      frame.appendChild(img);
    });

    document.documentElement.setAttribute("data-axis-covers-restored", "true");
  }

  function selectByLabelContains(words) {
    const labels = Array.from(document.querySelectorAll("label"));

    for (const label of labels) {
      const txt = normalize(label.textContent);

      if (!words.some(function (word) { return txt.includes(normalize(word)); })) {
        continue;
      }

      const forId = label.getAttribute("for");

      if (forId) {
        const found = document.getElementById(forId);
        if (found && found.tagName === "SELECT") return found;
      }

      const local = label.querySelector("select");
      if (local) return local;

      const next = label.parentElement ? label.parentElement.querySelector("select") : null;
      if (next) return next;
    }

    return null;
  }

  function fillSelect(select, values) {
    if (!select || !values || !values.length) return;

    const current = select.value;

    select.innerHTML = "";

    values.forEach(function (label, index) {
      const option = document.createElement("option");
      option.value = label;
      option.textContent = label;
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });

    if (current && values.includes(current)) {
      select.value = current;
    }
  }

  function buildSessionObject() {
    const intentionSelect = selectByLabelContains(["intention"]);
    const movementSelect = selectByLabelContains(["mouvement", "oscillation", "balancement"]);
    const breathSelect = selectByLabelContains(["respiration", "souffle"]);
    const durationSelect = selectByLabelContains(["durée", "duree", "temps"]);
    const integrationSelect = selectByLabelContains(["intégration", "integration", "rémanence", "remanence"]);

    return {
      createdAt: new Date().toISOString(),
      intention: intentionSelect ? intentionSelect.value : SESSION_ENUMS.intention[0],
      mouvement: movementSelect ? movementSelect.value : SESSION_ENUMS.mouvement[0],
      respiration: breathSelect ? breathSelect.value : SESSION_ENUMS.respiration[0],
      duree: durationSelect ? durationSelect.value : SESSION_ENUMS.duree[2],
      integration: integrationSelect ? integrationSelect.value : SESSION_ENUMS.integration[0],
      sequence: []
    };
  }

  function enrichSession(session) {
    session.sequence = [
      "Préparation : s’installer, stabiliser l’axe et poser l’intention.",
      "Lumière : observer la source lumineuse sans tension excessive.",
      "Mouvement : " + session.mouvement + ".",
      "Souffle : " + session.respiration + ".",
      "Durée cible : " + session.duree + ".",
      "Intégration : " + session.integration + ".",
      "Clôture : revenir au calme, noter les perceptions utiles."
    ];

    return session;
  }

  function renderSessionResult(session) {
    let mount = document.getElementById("axisSessionResult");

    if (!mount) {
      mount = document.createElement("section");
      mount.id = "axisSessionResult";
      mount.className = "axis-session-result";

      const main = document.querySelector("main") || document.body;
      main.appendChild(mount);
    }

    mount.innerHTML = [
      "<h3>Séance générée</h3>",
      "<p><strong>Intention :</strong> " + session.intention + "</p>",
      "<p><strong>Mouvement :</strong> " + session.mouvement + "</p>",
      "<p><strong>Respiration :</strong> " + session.respiration + "</p>",
      "<p><strong>Durée :</strong> " + session.duree + "</p>",
      "<p><strong>Intégration :</strong> " + session.integration + "</p>",
      "<ol>" + session.sequence.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ol>"
    ].join("");
  }

  function bindSessionGenerator() {
    if (pageName() !== "creer-seance.html") return;

    fillSelect(selectByLabelContains(["intention"]), SESSION_ENUMS.intention);
    fillSelect(selectByLabelContains(["mouvement", "oscillation", "balancement"]), SESSION_ENUMS.mouvement);
    fillSelect(selectByLabelContains(["respiration", "souffle"]), SESSION_ENUMS.respiration);
    fillSelect(selectByLabelContains(["durée", "duree", "temps"]), SESSION_ENUMS.duree);
    fillSelect(selectByLabelContains(["intégration", "integration", "rémanence", "remanence"]), SESSION_ENUMS.integration);

    const buttons = Array.from(document.querySelectorAll("button, a"));

    buttons.forEach(function (button) {
      const txt = normalize(button.textContent);

      if (txt.includes("generer la seance") || txt.includes("générer la séance")) {
        if (button.dataset.axisSessionBound === "1") return;

        button.dataset.axisSessionBound = "1";

        button.addEventListener("click", function (event) {
          event.preventDefault();

          const session = enrichSession(buildSessionObject());

          localStorage.setItem("axis_current_session", JSON.stringify(session));
          localStorage.setItem("axis_generated_session", JSON.stringify(session));
          localStorage.setItem("axis_practice_session", JSON.stringify(session));

          renderSessionResult(session);
        });
      }

      if (txt === "pratiquer" || txt.includes("pratiquer")) {
        if (button.dataset.axisPracticeBound === "1") return;

        button.dataset.axisPracticeBound = "1";

        button.addEventListener("click", function (event) {
          const session = enrichSession(buildSessionObject());

          localStorage.setItem("axis_current_session", JSON.stringify(session));
          localStorage.setItem("axis_generated_session", JSON.stringify(session));
          localStorage.setItem("axis_practice_session", JSON.stringify(session));

          window.location.href = "pratiquer.html?v=" + STAMP;
        });
      }
    });
  }

  function showGeneratedSessionInPractice() {
    if (pageName() !== "pratiquer.html") return;

    let raw = localStorage.getItem("axis_practice_session") || localStorage.getItem("axis_generated_session") || localStorage.getItem("axis_current_session");

    if (!raw) return;

    try {
      const session = JSON.parse(raw);
      renderSessionResult(session);
    } catch (error) {}
  }

  function init() {
    removeHomeVendreCard();
    applyVideoNoDownload();
    connectOscillationButtons();
    applyBookCovers();
    bindSessionGenerator();
    showGeneratedSessionInPractice();

    setTimeout(removeHomeVendreCard, 600);
    setTimeout(applyBookCovers, 600);
    setTimeout(applyBookCovers, 1500);
    setTimeout(applyVideoNoDownload, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();