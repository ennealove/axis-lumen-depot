(function () {
  "use strict";

  var STORAGE_KEYS = [
    "axis_lumen_custom_session",
    "axis_lumen_generated_session",
    "axis_current_session",
    "axis-practice-session"
  ];

  var root;
  var session = null;
  var index = 0;
  var running = false;
  var paused = false;
  var phaseStart = 0;
  var pausedAt = 0;
  var pausedTotal = 0;
  var timer = null;

  function readSession() {
    for (var i = 0; i < STORAGE_KEYS.length; i += 1) {
      try {
        var raw = localStorage.getItem(STORAGE_KEYS[i]);
        if (!raw) continue;
        var parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.phases)) return parsed;
      } catch (_) {}
    }

    return null;
  }

  function formatClock(seconds) {
    var s = Math.max(0, Math.ceil(seconds));
    var m = Math.floor(s / 60);
    var r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function formatDuration(seconds) {
    var s = Math.max(0, Math.round(seconds));
    var m = Math.floor(s / 60);
    var r = s % 60;
    if (r === 0) return m + " min";
    return m + " min " + r + " s";
  }

  function phase() {
    if (!session || !session.phases) return null;
    return session.phases[index] || null;
  }

  function html() {
    root.innerHTML =
      '<section class="axis-session-player">' +
        '<h2>Séance à pratiquer</h2>' +
        '<p id="axisPlayerIntro">Charge une séance depuis “Créer sa séance”, puis lance la pratique.</p>' +
        '<div class="axis-session-layout">' +
          '<div>' +
            '<div class="axis-session-video-card">' +
              '<video id="axisPracticeVideo" controls playsinline controlsList="nodownload noremoteplayback"></video>' +
              '<div id="axisPracticePlaceholder" class="axis-session-placeholder">Aucune vidéo reliée à cette phase. Suis la consigne affichée.</div>' +
            '</div>' +
            '<div class="axis-session-now">' +
              '<div class="axis-session-timer" id="axisPracticeTimer">00:00</div>' +
              '<p><strong id="axisPracticeTitle">Aucune séance chargée</strong></p>' +
              '<p id="axisPracticeSegment">—</p>' +
              '<p id="axisPracticeGuidance">Va dans Créer sa séance pour générer une séance vidéo.</p>' +
              '<div class="axis-session-actions">' +
                '<button class="axis-session-btn primary" id="axisPracticeStart" type="button">Lancer</button>' +
                '<button class="axis-session-btn" id="axisPracticePause" type="button">Pause</button>' +
                '<button class="axis-session-btn" id="axisPracticeResume" type="button">Reprendre</button>' +
                '<button class="axis-session-btn" id="axisPracticeNext" type="button">Phase suivante</button>' +
                '<button class="axis-session-btn" id="axisPracticeReset" type="button">Revenir au début</button>' +
                '<a class="axis-session-btn" href="creer-seance.html">Créer une autre séance</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<aside>' +
            '<h3>Timeline vidéo</h3>' +
            '<div class="axis-session-list" id="axisPracticeList"></div>' +
          '</aside>' +
        '</div>' +
      '</section>';
  }

  function renderSession() {
    session = readSession();

    var intro = document.getElementById("axisPlayerIntro");
    var list = document.getElementById("axisPracticeList");

    if (!session) {
      intro.textContent = "Aucune séance générée pour le moment. Va dans Créer sa séance pour construire une timeline vidéo.";
      list.innerHTML = '<article class="axis-session-phase"><strong>Aucune séance</strong><small>La séance apparaîtra ici après génération.</small></article>';
      return;
    }

    intro.textContent =
      "Séance chargée : " +
      (session.totalLabel || formatDuration(session.totalSeconds || 0)) +
      " · intention : " +
      (session.intention || "pratique");

    list.innerHTML = "";

    session.phases.forEach(function (item, i) {
      var node = document.createElement("article");
      node.className = "axis-session-phase" + (i === index ? " is-active" : "");
      node.innerHTML =
        '<div class="axis-session-phase-head">' +
          '<strong>' + String(i + 1).padStart(2, "0") + ". " + item.title + '</strong>' +
          '<span>' + formatDuration(item.duration) + '</span>' +
        '</div>' +
        '<small>' + (item.guidance || "") + '</small>';
      list.appendChild(node);
    });

    showPhase(false);
  }

  function setVideo(src, autoplay) {
    var video = document.getElementById("axisPracticeVideo");
    var placeholder = document.getElementById("axisPracticePlaceholder");

    if (!video || !placeholder) return;

    if (!src) {
      video.style.display = "none";
      placeholder.style.display = "grid";
      try { video.pause(); } catch (_) {}
      video.removeAttribute("src");
      return;
    }

    placeholder.style.display = "none";
    video.style.display = "block";
    video.loop = true;

    if (video.getAttribute("src") !== src) {
      video.setAttribute("src", src);
      video.load();
    }

    if (autoplay) {
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    }
  }

  function currentSegment(item, elapsed) {
    if (!item || !Array.isArray(item.segments)) return null;

    for (var i = 0; i < item.segments.length; i += 1) {
      var seg = item.segments[i];
      if (elapsed >= seg.from && elapsed < seg.to) return seg;
    }

    return item.segments[item.segments.length - 1] || null;
  }

  function showPhase(autoplay) {
    var item = phase();
    var title = document.getElementById("axisPracticeTitle");
    var guidance = document.getElementById("axisPracticeGuidance");
    var segment = document.getElementById("axisPracticeSegment");
    var timerEl = document.getElementById("axisPracticeTimer");

    if (!item) {
      title.textContent = "Séance terminée";
      guidance.textContent = "La pratique est terminée. Reviens doucement au calme.";
      segment.textContent = "Fin";
      timerEl.textContent = "00:00";
      setVideo("", false);
      return;
    }

    title.textContent = item.title;
    guidance.textContent = item.guidance || "";
    segment.textContent = item.type || "";
    timerEl.textContent = formatClock(item.duration);

    setVideo(item.video || "", autoplay);
    renderActiveList();
  }

  function renderActiveList() {
    var nodes = root.querySelectorAll(".axis-session-phase");
    nodes.forEach(function (node, i) {
      node.classList.toggle("is-active", i === index);
    });
  }

  function tick() {
    if (!running || paused) return;

    var item = phase();
    if (!item) return finish();

    var elapsed = (Date.now() - phaseStart - pausedTotal) / 1000;
    var remaining = Math.max(0, item.duration - elapsed);

    document.getElementById("axisPracticeTimer").textContent = formatClock(remaining);

    var seg = currentSegment(item, elapsed);

    if (seg) {
      document.getElementById("axisPracticeSegment").textContent = seg.title + " · " + seg.mantra;
      document.getElementById("axisPracticeGuidance").textContent = seg.guidance;
    } else {
      document.getElementById("axisPracticeSegment").textContent = item.type || "";
      document.getElementById("axisPracticeGuidance").textContent = item.guidance || "";
    }

    if (elapsed >= item.duration) {
      nextPhase();
    }
  }

  function start() {
    session = readSession();

    if (!session) {
      renderSession();
      return;
    }

    running = true;
    paused = false;
    index = 0;
    phaseStart = Date.now();
    pausedTotal = 0;
    pausedAt = 0;

    showPhase(true);

    clearInterval(timer);
    timer = setInterval(tick, 250);
    tick();
  }

  function pause() {
    if (!running || paused) return;

    paused = true;
    pausedAt = Date.now();

    var video = document.getElementById("axisPracticeVideo");
    try { video.pause(); } catch (_) {}
  }

  function resume() {
    if (!running || !paused) return;

    paused = false;
    pausedTotal += Date.now() - pausedAt;

    var video = document.getElementById("axisPracticeVideo");
    try {
      var p = video.play();
      if (p && typeof p.catch === "function") p.catch(function () {});
    } catch (_) {}
  }

  function nextPhase() {
    index += 1;

    if (!session || index >= session.phases.length) {
      finish();
      return;
    }

    phaseStart = Date.now();
    pausedTotal = 0;
    pausedAt = 0;
    paused = false;

    showPhase(true);
    tick();
  }

  function reset() {
    running = false;
    paused = false;
    index = 0;
    phaseStart = 0;
    pausedTotal = 0;
    pausedAt = 0;

    clearInterval(timer);

    var video = document.getElementById("axisPracticeVideo");
    try {
      video.pause();
      video.currentTime = 0;
    } catch (_) {}

    renderSession();
  }

  function finish() {
    running = false;
    paused = false;
    clearInterval(timer);

    var video = document.getElementById("axisPracticeVideo");
    try { video.pause(); } catch (_) {}

    document.getElementById("axisPracticeTitle").textContent = "Séance terminée";
    document.getElementById("axisPracticeSegment").textContent = "Retour au calme";
    document.getElementById("axisPracticeGuidance").textContent = "La séance est terminée. Respire doucement, puis reprends contact avec l’espace.";
    document.getElementById("axisPracticeTimer").textContent = "00:00";
    renderActiveList();
  }

  function bind() {
    document.getElementById("axisPracticeStart").addEventListener("click", start);
    document.getElementById("axisPracticePause").addEventListener("click", pause);
    document.getElementById("axisPracticeResume").addEventListener("click", resume);
    document.getElementById("axisPracticeNext").addEventListener("click", nextPhase);
    document.getElementById("axisPracticeReset").addEventListener("click", reset);
  }

  function init() {
    root = document.getElementById("axis-session-player-root");
    if (!root) return;

    html();
    bind();
    renderSession();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();