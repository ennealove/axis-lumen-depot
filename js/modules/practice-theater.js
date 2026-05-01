(function () {
  "use strict";

  const MAP = window.AXIS_SESSION_VIDEO_MAP || { roles: {}, maxSeconds: 2700 };
  const STORAGE_SEQUENCE = "axis.session.builder.sequence.v1";
  const STORAGE_CONFIG = "axis.session.builder.config.v1";

  const state = {
    sequence: [],
    config: null,
    index: 0,
    running: false,
    paused: false,
    startedAt: 0,
    elapsedBeforePause: 0,
    timer: null,
    currentSrc: "",
    currentRole: "",
    mediaNode: null
  };

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function encodePath(path) {
    return String(path || "")
      .split("/")
      .map(function (part) { return encodeURIComponent(part); })
      .join("/");
  }

  function formatClock(seconds) {
    const s = Math.max(0, Math.round(seconds || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function getRole(roleName) {
    return MAP.roles && MAP.roles[roleName] ? MAP.roles[roleName] : null;
  }

  function findView(id, needles) {
    const exact = document.getElementById(id);
    if (exact) return exact;

    const byData = document.querySelector('[data-view-panel="' + id + '"], .view[data-view="' + id + '"]');
    if (byData) return byData;

    const candidates = all("section.view, section, .view");
    for (const candidate of candidates) {
      const text = normalize(candidate.textContent || "");
      if (needles.some(function (needle) { return text.includes(needle); })) {
        return candidate;
      }
    }

    return null;
  }

  function getPracticeView() {
    return findView("pratique", ["pratiquer", "mode pratique", "scene pratique"]);
  }

  function loadSequencePayload() {
    try {
      const raw = localStorage.getItem(STORAGE_SEQUENCE);
      if (raw) return JSON.parse(raw);
    } catch (_) {}

    return null;
  }

  function loadConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_CONFIG);
      if (raw) return JSON.parse(raw);
    } catch (_) {}

    return { voiceGender: "female" };
  }

  function totalSeconds(sequence) {
    return sequence.reduce(function (sum, item) {
      return sum + Number(item.duration || 0);
    }, 0);
  }

  function currentElapsed() {
    if (!state.running) return 0;
    if (state.paused) return state.elapsedBeforePause;
    return state.elapsedBeforePause + ((Date.now() - state.startedAt) / 1000);
  }

  function totalElapsedBeforeIndex(index) {
    let sum = 0;
    for (let i = 0; i < index; i += 1) {
      sum += Number(state.sequence[i] && state.sequence[i].duration || 0);
    }
    return sum;
  }

  function removeMedia() {
    const screen = $("#axisTheaterScreen");
    if (!screen) return;

    all(".axis-theater-media", screen).forEach(function (node) {
      try {
        if (node.tagName === "VIDEO") {
          node.pause();
          node.removeAttribute("src");
          node.load();
        }
      } catch (_) {}

      try { node.remove(); } catch (_) {}
    });

    state.mediaNode = null;
    state.currentSrc = "";
    state.currentRole = "";
  }

  function preventVideoAccess(video) {
    if (!video) return;

    video.removeAttribute("controls");
    video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
    video.setAttribute("disablePictureInPicture", "");
    video.setAttribute("disableRemotePlayback", "");
    video.setAttribute("draggable", "false");

    video.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    video.addEventListener("dragstart", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
  }

  function showPlaceholder(roleName, title) {
    const screen = $("#axisTheaterScreen");
    const placeholder = $("#axisTheaterPlaceholder");
    if (!screen || !placeholder) return;

    removeMedia();

    const role = getRole(roleName);
    const fallback = role && role.fallback ? role.fallback : "dark";

    placeholder.className = "axis-theater-placeholder " + fallback;
    placeholder.style.display = "grid";
    placeholder.innerHTML = `
      <div>
        <strong>${title || "Étape"}</strong><br>
        <span>Support visuel virtuel. La voix continue le guidage.</span>
      </div>
    `;
  }

  function renderMedia(roleName, title) {
    const screen = $("#axisTheaterScreen");
    const placeholder = $("#axisTheaterPlaceholder");
    if (!screen) return;

    const item = getRole(roleName);

    if (!item || item.status !== "ok" || !item.src) {
      showPlaceholder(roleName, title);
      return;
    }

    const src = encodePath(item.src);
    const absolute = new URL(src, window.location.href).href;

    if (state.currentSrc === absolute && state.mediaNode) {
      if (state.mediaNode.tagName === "VIDEO") {
        state.mediaNode.play().catch(function () {});
      }
      if (placeholder) placeholder.style.display = "none";
      state.currentRole = roleName;
      return;
    }

    removeMedia();

    let media;

    if (item.kind === "image") {
      media = document.createElement("img");
      media.src = src;
      media.alt = item.label || item.file || roleName;
    } else {
      media = document.createElement("video");
      media.src = src;
      media.muted = true;
      media.autoplay = true;
      media.loop = true;
      media.playsInline = true;
      media.preload = "metadata";
      preventVideoAccess(media);

      media.addEventListener("error", function () {
        showPlaceholder(roleName, title);
      });

      media.play().catch(function () {});
    }

    media.className = "axis-theater-media";
    state.mediaNode = media;
    state.currentSrc = absolute;
    state.currentRole = roleName;

    if (placeholder) placeholder.style.display = "none";

    const overlay = $(".axis-theater-overlay", screen);
    if (overlay) screen.insertBefore(media, overlay);
    else screen.appendChild(media);
  }

  function renderTimeline() {
    const timeline = $("#axisTheaterTimeline");
    if (!timeline) return;

    timeline.innerHTML = "";

    state.sequence.forEach(function (step, index) {
      const node = document.createElement("div");
      node.className = "axis-theater-step";
      node.dataset.index = String(index);
      node.innerHTML = `
        <small>${formatClock(step.duration)}</small>
        <div>
          <strong>${index + 1}. ${step.title}</strong><br>
          <small>${step.subtitle || ""}</small>
        </div>
        <small>${step.role}</small>
      `;
      timeline.appendChild(node);
    });
  }

  function updateActiveTimeline() {
    all(".axis-theater-step").forEach(function (node) {
      node.classList.toggle("is-active", Number(node.dataset.index) === state.index);
    });

    const active = document.querySelector(".axis-theater-step.is-active");
    if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderPhase(announce) {
    const step = state.sequence[state.index];
    if (!step) return;

    renderMedia(step.role, step.title);

    const phase = $("#axisTheaterPhase");
    const subtitle = $("#axisTheaterSubtitle");
    const timer = $("#axisTheaterTimer");
    const index = $("#axisTheaterIndex");
    const total = $("#axisTheaterTotal");
    const progress = $("#axisTheaterProgressBar");

    if (phase) phase.textContent = step.title || "Étape";
    if (subtitle) subtitle.textContent = step.subtitle || "";
    if (timer) timer.textContent = formatClock(step.duration);
    if (index) index.textContent = (state.index + 1) + " / " + state.sequence.length;
    if (total) total.textContent = formatClock(totalSeconds(state.sequence));
    if (progress) progress.style.width = "0%";

    updateActiveTimeline();

    if (announce) speak(step.voice || step.title || "");
  }

  function updateTimerUi() {
    const step = state.sequence[state.index];
    if (!step) return;

    const elapsed = currentElapsed();
    const remaining = Math.max(0, Number(step.duration || 0) - elapsed);
    const timer = $("#axisTheaterTimer");
    const progress = $("#axisTheaterProgressBar");
    const totalProgress = $("#axisTheaterTotalProgress");

    if (timer) timer.textContent = formatClock(remaining);

    if (progress) {
      const pct = Math.min(100, Math.max(0, (elapsed / Number(step.duration || 1)) * 100));
      progress.style.width = pct + "%";
    }

    if (totalProgress) {
      const total = totalSeconds(state.sequence);
      const done = totalElapsedBeforeIndex(state.index) + Math.min(elapsed, Number(step.duration || 0));
      totalProgress.textContent = formatClock(done) + " / " + formatClock(total);
    }

    if (remaining <= 0.05 && state.running && !state.paused) {
      nextPhase();
    }
  }

  function startTimer() {
    stopTimer();
    state.timer = setInterval(updateTimerUi, 250);
  }

  function stopTimer() {
    if (state.timer) {
      clearInterval(state.timer);
      state.timer = null;
    }
  }

  function getVoices() {
    if (!("speechSynthesis" in window)) return [];
    return window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
  }

  function chooseVoice(gender) {
    const voices = getVoices();
    const fr = voices.filter(function (v) {
      return normalize(v.lang).startsWith("fr");
    });

    const femaleHints = ["amelie", "hortense", "julie", "marie", "audrey", "virginie", "celine", "lea", "clara", "sylvie"];
    const maleHints = ["thomas", "claude", "daniel", "antoine", "nicolas", "paul", "henri", "guillaume"];

    const hints = gender === "male" ? maleHints : femaleHints;

    for (const hint of hints) {
      const found = fr.find(function (v) {
        return normalize(v.name).includes(hint);
      });
      if (found) return found;
    }

    return fr[0] || voices[0] || null;
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    if (!text) return;

    const voiceToggle = document.getElementById("voiceEnabled");
    if (voiceToggle && !voiceToggle.checked) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const gender = state.config && state.config.voiceGender ? state.config.voiceGender : "female";
      const voice = chooseVoice(gender);

      utterance.lang = "fr-FR";
      utterance.rate = 0.92;
      utterance.pitch = gender === "male" ? 0.82 : 1.08;
      utterance.volume = 1;

      if (voice) utterance.voice = voice;

      window.speechSynthesis.speak(utterance);
    } catch (_) {}
  }

  function loadFromStorage() {
    const payload = loadSequencePayload();

    if (payload && Array.isArray(payload.sequence)) {
      state.sequence = payload.sequence;
      state.config = payload.config || loadConfig();
      return true;
    }

    return false;
  }

  function hydrateSequence(sequence, config) {
    if (Array.isArray(sequence)) {
      state.sequence = sequence;
      state.config = config || loadConfig();
    } else {
      loadFromStorage();
    }

    state.index = 0;
    state.running = false;
    state.paused = false;
    state.elapsedBeforePause = 0;

    renderTimeline();
    renderPhase(false);

    const hint = $("#axisTheaterHint");
    if (hint) {
      hint.textContent = state.sequence.length
        ? "Séance chargée. Appuie sur Lancer pour démarrer l’écran géant."
        : "Aucune séance chargée. Va dans Créer sa séance pour générer une pratique.";
    }
  }

  function startPractice() {
    if (!state.sequence.length) {
      if (!loadFromStorage()) {
        const hint = $("#axisTheaterHint");
        if (hint) hint.textContent = "Aucune séance disponible. Construis d’abord une séance.";
        return;
      }
      renderTimeline();
    }

    if (state.index >= state.sequence.length) state.index = 0;

    state.running = true;
    state.paused = false;
    state.elapsedBeforePause = 0;
    state.startedAt = Date.now();

    const pauseBtn = $("#axisTheaterPause");
    if (pauseBtn) pauseBtn.textContent = "Pause";

    renderPhase(true);
    startTimer();
  }

  function pausePractice() {
    if (!state.running) return;

    const pauseBtn = $("#axisTheaterPause");

    if (!state.paused) {
      state.paused = true;
      state.elapsedBeforePause += (Date.now() - state.startedAt) / 1000;

      if (state.mediaNode && state.mediaNode.tagName === "VIDEO") {
        try { state.mediaNode.pause(); } catch (_) {}
      }

      if ("speechSynthesis" in window) window.speechSynthesis.cancel();

      stopTimer();

      if (pauseBtn) pauseBtn.textContent = "Reprendre";
      return;
    }

    state.paused = false;
    state.startedAt = Date.now();

    if (state.mediaNode && state.mediaNode.tagName === "VIDEO") {
      state.mediaNode.play().catch(function () {});
    }

    if (pauseBtn) pauseBtn.textContent = "Pause";

    speak("Reprise de la séance.");
    startTimer();
  }

  function nextPhase() {
    if (!state.sequence.length) return;

    state.index += 1;

    if (state.index >= state.sequence.length) {
      finishPractice();
      return;
    }

    state.elapsedBeforePause = 0;
    state.startedAt = Date.now();

    renderPhase(true);

    if (state.running && !state.paused) {
      startTimer();
    }
  }

  function restartPractice() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    stopTimer();
    removeMedia();

    state.index = 0;
    state.running = false;
    state.paused = false;
    state.elapsedBeforePause = 0;

    const pauseBtn = $("#axisTheaterPause");
    if (pauseBtn) pauseBtn.textContent = "Pause";

    renderPhase(false);
  }

  function finishPractice() {
    stopTimer();

    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    state.running = false;
    state.paused = false;
    state.elapsedBeforePause = 0;

    const phase = $("#axisTheaterPhase");
    const subtitle = $("#axisTheaterSubtitle");
    const timer = $("#axisTheaterTimer");
    const progress = $("#axisTheaterProgressBar");

    if (phase) phase.textContent = "Séance terminée";
    if (subtitle) subtitle.textContent = "Restez quelques instants en silence avant de reprendre vos activités.";
    if (timer) timer.textContent = "00:00";
    if (progress) progress.style.width = "100%";

    speak("La séance est terminée. Restez quelques instants en silence avant de reprendre vos activités.");
  }

  function openFullscreen() {
    const stage = $("#axisTheaterStage");
    if (!stage) return;

    try {
      if (stage.requestFullscreen) stage.requestFullscreen();
      else if (stage.webkitRequestFullscreen) stage.webkitRequestFullscreen();
    } catch (_) {}
  }

  function mount() {
    const practiceView = getPracticeView();
    if (!practiceView) return;

    practiceView.classList.add("axis-practice-theater-active");

    let root = $("#axisPracticeTheaterRoot", practiceView);
    if (!root) {
      root = document.createElement("div");
      root.id = "axisPracticeTheaterRoot";
      practiceView.prepend(root);
    }

    if (root.dataset.ready === "1") {
      if (!state.sequence.length) hydrateSequence();
      return;
    }

    root.dataset.ready = "1";

    root.innerHTML = `
      <div class="axis-theater-shell">
        <article class="axis-theater-stage" id="axisTheaterStage">
          <div class="axis-theater-screen" id="axisTheaterScreen">
            <div class="axis-theater-placeholder dark" id="axisTheaterPlaceholder">
              <div>
                <strong>Écran de pratique</strong><br>
                <span>Construis une séance dans “Créer sa séance”, puis lance la pratique.</span>
              </div>
            </div>

            <div class="axis-theater-overlay">
              <div>
                <strong id="axisTheaterPhase">Aucune séance</strong>
                <span id="axisTheaterSubtitle">En attente de génération.</span>
              </div>
              <div class="axis-theater-timer" id="axisTheaterTimer">00:00</div>
            </div>

            <div class="axis-theater-progress"><span id="axisTheaterProgressBar"></span></div>
          </div>
        </article>

        <div class="axis-theater-controls">
          <button type="button" class="primary-btn" id="axisTheaterStart">Lancer</button>
          <button type="button" class="secondary-btn" id="axisTheaterPause">Pause</button>
          <button type="button" class="secondary-btn" id="axisTheaterNext">Étape suivante</button>
          <button type="button" class="secondary-btn" id="axisTheaterRestart">Revenir au début</button>
          <button type="button" class="secondary-btn" id="axisTheaterFullscreen">Plein écran</button>
        </div>

        <div class="axis-theater-meta">
          <div class="axis-theater-pill">Étape : <strong id="axisTheaterIndex">0 / 0</strong></div>
          <div class="axis-theater-pill">Total : <strong id="axisTheaterTotal">00:00</strong></div>
          <div class="axis-theater-pill">Progression : <strong id="axisTheaterTotalProgress">00:00 / 00:00</strong></div>
        </div>

        <article class="axis-theater-panel">
          <h3>Déroulé de la séance</h3>
          <p class="muted" id="axisTheaterHint">
            Va dans “Créer sa séance” pour générer une pratique personnalisée.
          </p>
          <div class="axis-theater-timeline" id="axisTheaterTimeline"></div>
        </article>
      </div>
    `;

    $("#axisTheaterStart", root).addEventListener("click", startPractice);
    $("#axisTheaterPause", root).addEventListener("click", pausePractice);
    $("#axisTheaterNext", root).addEventListener("click", nextPhase);
    $("#axisTheaterRestart", root).addEventListener("click", restartPractice);
    $("#axisTheaterFullscreen", root).addEventListener("click", openFullscreen);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = function () {};
      window.speechSynthesis.getVoices();
    }

    hydrateSequence();
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  window.addEventListener("axis-session-sequence-updated", function (event) {
    const detail = event.detail || {};
    hydrateSequence(detail.sequence, detail.config);
  });

  window.addEventListener("axis-session-start-requested", function () {
    setTimeout(startPractice, 120);
  });

  ready(function () {
    mount();
    setTimeout(mount, 500);
    setTimeout(mount, 1500);
  });
})();
