(() => {
  "use strict";

  const FULL_STEPS = [
    {
      key: "reading",
      label: "Lecture lente",
      seconds: 8 * 60,
      caption: "Lis la carte lentement. Laisse une phrase ressortir d’elle-même.",
      visual: "card",
      prompt: "Lecture lente. Lis la carte. Ne cherche pas à tout comprendre. Laisse une phrase ressortir, comme si la carte te parlait depuis l’intérieur."
    },
    {
      key: "light",
      label: "Observation lumineuse",
      seconds: 30,
      caption: "Regarde une source lumineuse douce pendant trente secondes, sans forcer.",
      visual: "video-light",
      prompt: "Regarde maintenant une source lumineuse douce. Trente secondes seulement. Ne force pas. Reste simple, stable, présent."
    },
    {
      key: "remanence",
      label: "Rémanence",
      seconds: 3 * 60,
      caption: "Ferme les yeux. Accueille l’empreinte lumineuse.",
      visual: "remanence",
      prompt: "Ferme les yeux. Accueille la rémanence lumineuse. Laisse l’empreinte apparaître, se déplacer ou disparaître. Tu observes, sans intervenir."
    },
    {
      key: "impregnation",
      label: "Imprégnation",
      seconds: 12 * 60,
      caption: "Dépose la vertu dans la lumière intérieure.",
      visual: "card-glow",
      prompt: "Dépose maintenant la vertu dans la lumière intérieure. Laisse son nom, son image et sa phrase descendre tranquillement dans le corps."
    },
    {
      key: "integration",
      label: "Intégration",
      seconds: 7 * 60,
      caption: "Silence, corps, carnet, geste concret pour la journée.",
      visual: "integration",
      prompt: "Intégration. Reviens au corps. Sens la respiration. Garde une trace dans ton carnet, puis choisis un geste concret pour laisser cette vertu accompagner ta journée."
    }
  ];

  const DEMO_STEPS = [
    { ...FULL_STEPS[0], seconds: 18 },
    { ...FULL_STEPS[1], seconds: 12 },
    { ...FULL_STEPS[2], seconds: 16 },
    { ...FULL_STEPS[3], seconds: 22 },
    { ...FULL_STEPS[4], seconds: 18 }
  ];

  const state = {
    running: false,
    paused: false,
    stepIndex: 0,
    elapsedInStep: 0,
    stepStartedAt: 0,
    timer: null,
    steps: FULL_STEPS,
    voice: null,
    card: null
  };

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function formatTime(totalSeconds) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function getTotalDuration(steps = state.steps) {
    return steps.reduce((sum, step) => sum + step.seconds, 0);
  }

  function getElapsedTotal() {
    const before = state.steps
      .slice(0, state.stepIndex)
      .reduce((sum, step) => sum + step.seconds, 0);

    const current = state.paused
      ? state.elapsedInStep
      : state.elapsedInStep + ((Date.now() - state.stepStartedAt) / 1000);

    return before + Math.max(0, current);
  }

  function findCurrentCard() {
    const images = qsa("img").filter((img) => {
      const src = String(img.currentSrc || img.src || "").toLowerCase();
      const alt = String(img.alt || "").toLowerCase();
      return (
        src.includes("assets/virtues/") ||
        src.includes("assets/vertus/") ||
        src.includes("virtue_") ||
        alt.includes("vertu") ||
        alt.includes("virtue")
      );
    });

    const visible = images.filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.width > 120 && rect.height > 160;
    });

    const img = visible[visible.length - 1] || images[images.length - 1] || null;

    if (!img) {
      return null;
    }

    const src = img.currentSrc || img.src;
    let title = img.alt || "Carte Vertu";

    const nearby =
      img.closest("article") ||
      img.closest(".card") ||
      img.closest(".axis-panel") ||
      img.closest(".axis-virtue-card") ||
      img.closest(".virtue-card") ||
      img.parentElement;

    if (nearby) {
      const titleNode =
        qs("[data-virtue-title]", nearby) ||
        qs(".axis-virtue-title", nearby) ||
        qs(".virtue-title", nearby) ||
        qs("h1", nearby) ||
        qs("h2", nearby) ||
        qs("h3", nearby) ||
        qs("strong", nearby);

      if (titleNode && titleNode.textContent.trim()) {
        title = titleNode.textContent.trim();
      }
    }

    return { src, title };
  }

  function populateVoices() {
    const select = qs("#axisVirtueVoiceName");
    if (!select || !("speechSynthesis" in window)) return;

    const voices = window.speechSynthesis.getVoices();
    const french = voices.filter((voice) => String(voice.lang || "").toLowerCase().startsWith("fr"));
    const ordered = french.length ? french : voices;

    select.innerHTML = "";

    ordered.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name} — ${voice.lang}`;
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });
  }

  function selectedVoice() {
    if (!("speechSynthesis" in window)) return null;

    const wanted = qs("#axisVirtueVoiceName")?.value || "";
    const voices = window.speechSynthesis.getVoices();

    return voices.find((voice) => voice.name === wanted) ||
      voices.find((voice) => String(voice.lang || "").toLowerCase().startsWith("fr")) ||
      voices[0] ||
      null;
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  function speak(text) {
    const enabled = qs("#axisVirtueVoiceEnabled")?.checked !== false;
    if (!enabled || !("speechSynthesis" in window) || !text) return;

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.voice = selectedVoice();

    const rate = Number(qs("#axisVirtueVoiceRate")?.value || 0.92);
    const volume = Number(qs("#axisVirtueVoiceVolume")?.value || 0.88);

    utterance.rate = rate;
    utterance.pitch = 0.92;
    utterance.volume = volume;

    window.speechSynthesis.speak(utterance);
  }

  function renderStage(step) {
    const stage = qs("#axisVirtueGuidedStage");
    if (!stage) return;

    const card = state.card || findCurrentCard();
    const safeCardSrc = card?.src || "";
    const safeTitle = card?.title || "Carte Vertu";

    let visual = "";

    if (step.visual === "video-light") {
      visual = `
        <video class="axis-virtue-guided-video" autoplay muted loop playsinline>
          <source src="assets/videos/web/session-lumiere-30s.mp4" type="video/mp4">
        </video>
      `;
    } else if (step.visual === "remanence") {
      visual = `<div class="axis-virtue-guided-remanence" aria-hidden="true"></div>`;
    } else if (step.visual === "integration") {
      visual = `<div class="axis-virtue-guided-integration" aria-hidden="true"></div>`;
    } else if (safeCardSrc) {
      visual = `<img class="axis-virtue-guided-card-img" src="${safeCardSrc}" alt="${safeTitle.replace(/"/g, "&quot;")}">`;
    } else {
      visual = `<div class="axis-virtue-guided-light" aria-hidden="true"></div>`;
    }

    stage.innerHTML = `
      ${visual}
      <div class="axis-virtue-guided-caption">
        <strong>${step.label}</strong>
        ${step.caption}
      </div>
    `;
  }

  function renderTimeline() {
    const list = qs("#axisVirtueGuidedTimelineList");
    if (!list) return;

    list.innerHTML = state.steps.map((step, index) => `
      <div class="axis-virtue-step ${index === state.stepIndex && state.running ? "active" : ""}">
        <div class="axis-virtue-step-dot">${index + 1}</div>
        <div>
          <strong>${step.label}</strong>
          <span>${formatTime(step.seconds)} — ${step.caption}</span>
        </div>
      </div>
    `).join("");
  }

  function updateDisplay() {
    const step = state.steps[state.stepIndex] || state.steps[0];
    const elapsedTotal = getElapsedTotal();
    const total = getTotalDuration();

    const current = state.paused
      ? state.elapsedInStep
      : state.elapsedInStep + ((Date.now() - state.stepStartedAt) / 1000);

    const remaining = Math.max(0, step.seconds - current);
    const progress = total ? Math.min(100, (elapsedTotal / total) * 100) : 0;

    const timer = qs("#axisVirtueGuidedTimer");
    const label = qs("#axisVirtueGuidedCurrent");
    const totalNode = qs("#axisVirtueGuidedTotal");
    const progressBar = qs("#axisVirtueGuidedProgress span");
    const message = qs("#axisVirtueGuidedMessage");

    if (timer) timer.textContent = formatTime(remaining);
    if (label) label.textContent = state.running ? step.label : "Prêt";
    if (totalNode) totalNode.textContent = `Déroulement ${formatTime(total)}`;
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (message) {
      if (!state.card) {
        message.textContent = "Tire une carte pour commencer. La séance utilisera la carte visible dans l’onglet Vertus.";
      } else if (state.running) {
        message.textContent = `${state.card.title} — ${step.caption}`;
      } else {
        message.textContent = `${state.card.title} prête pour une pratique guidée.`;
      }
    }
  }

  function setButtons() {
    const start = qs("#axisVirtueStart");
    const pause = qs("#axisVirtuePause");
    const resume = qs("#axisVirtueResume");
    const stop = qs("#axisVirtueStop");

    if (start) start.disabled = state.running;
    if (pause) pause.disabled = !state.running || state.paused;
    if (resume) resume.disabled = !state.running || !state.paused;
    if (stop) stop.disabled = !state.running;
  }

  function startStep(index) {
    state.stepIndex = index;
    state.elapsedInStep = 0;
    state.stepStartedAt = Date.now();

    const step = state.steps[state.stepIndex];

    renderStage(step);
    renderTimeline();
    updateDisplay();

    speak(step.prompt);
  }

  function tick() {
    if (!state.running || state.paused) return;

    const step = state.steps[state.stepIndex];
    const elapsed = state.elapsedInStep + ((Date.now() - state.stepStartedAt) / 1000);

    if (elapsed >= step.seconds) {
      if (state.stepIndex >= state.steps.length - 1) {
        completeSession();
        return;
      }

      startStep(state.stepIndex + 1);
      return;
    }

    updateDisplay();
  }

  function startSession() {
    state.card = findCurrentCard();

    if (!state.card) {
      speak("Tire une carte pour commencer la pratique guidée.");
      updateDisplay();
      return;
    }

    const demo = qs("#axisVirtueDemoMode")?.checked === true;
    state.steps = demo ? DEMO_STEPS : FULL_STEPS;
    state.running = true;
    state.paused = false;

    clearInterval(state.timer);
    state.timer = setInterval(tick, 300);

    setButtons();
    startStep(0);
    speak(`Pratique guidée de la vertu. ${state.card.title}. Installe-toi. Nous commençons par la lecture lente de la carte.`);
  }

  function pauseSession() {
    if (!state.running || state.paused) return;

    state.elapsedInStep += (Date.now() - state.stepStartedAt) / 1000;
    state.paused = true;

    if ("speechSynthesis" in window) window.speechSynthesis.pause();

    const video = qs("#axisVirtueGuidedStage video");
    if (video) video.pause();

    setButtons();
    updateDisplay();
  }

  function resumeSession() {
    if (!state.running || !state.paused) return;

    state.paused = false;
    state.stepStartedAt = Date.now();

    if ("speechSynthesis" in window) window.speechSynthesis.resume();

    const video = qs("#axisVirtueGuidedStage video");
    if (video) video.play().catch(() => {});

    setButtons();
    updateDisplay();
  }

  function stopSession() {
    state.running = false;
    state.paused = false;
    state.stepIndex = 0;
    state.elapsedInStep = 0;

    clearInterval(state.timer);
    stopSpeech();

    renderTimeline();
    updateDisplay();
    setButtons();
  }

  function completeSession() {
    state.running = false;
    state.paused = false;

    clearInterval(state.timer);

    renderStage({
      label: "Séance terminée",
      caption: "Garde la vertu avec toi. Laisse-la agir dans un geste simple au cours de la journée.",
      visual: "integration"
    });

    speak("La séance est terminée. Garde cette vertu avec toi tout au long de la journée. Choisis un geste simple pour l’incarner concrètement.");

    renderTimeline();
    updateDisplay();
    setButtons();
  }

  function installPanel() {
    document.body.classList.add("axis-virtues-page");

    if (qs("#axisVirtueGuidedSession")) return;

    const section = document.createElement("section");
    section.id = "axisVirtueGuidedSession";
    section.className = "axis-virtue-guided-session";

    section.innerHTML = `
      <div class="axis-virtue-guided-head">
        <div>
          <p class="axis-virtue-guided-kicker">Pratique guidée audiovisuelle</p>
          <h2>Séance Vertu</h2>
          <p>
            Une séance guidée à partir de la carte tirée : lecture lente, observation lumineuse,
            rémanence, imprégnation intérieure et intégration dans un geste concret.
          </p>
        </div>

        <aside class="axis-virtue-guided-status">
          <span id="axisVirtueGuidedCurrent">Prêt</span>
          <strong id="axisVirtueGuidedTimer">00:00</strong>
          <small id="axisVirtueGuidedTotal">Déroulement 30:30</small>
          <div class="axis-virtue-guided-progress" id="axisVirtueGuidedProgress">
            <span></span>
          </div>
        </aside>
      </div>

      <div class="axis-virtue-guided-body">
        <div class="axis-virtue-guided-panel">
          <div class="axis-virtue-guided-controls">
            <h3>Guidage</h3>

            <div class="axis-virtue-guided-buttons">
              <button class="axis-virtue-guided-btn primary" id="axisVirtueStart" type="button">Démarrer la séance</button>
              <button class="axis-virtue-guided-btn" id="axisVirtuePause" type="button">Pause</button>
              <button class="axis-virtue-guided-btn" id="axisVirtueResume" type="button">Reprendre</button>
              <button class="axis-virtue-guided-btn" id="axisVirtueStop" type="button">Arrêter</button>
            </div>

            <label class="axis-virtue-guided-option">
              <span>Voix de guidage</span>
              <input id="axisVirtueVoiceEnabled" type="checkbox" checked>
            </label>

            <label class="axis-virtue-guided-option">
              <span>Mode démonstration rapide</span>
              <input id="axisVirtueDemoMode" type="checkbox">
            </label>

            <label class="axis-virtue-guided-option">
              <span>Voix numérique</span>
              <select id="axisVirtueVoiceName"></select>
            </label>

            <label class="axis-virtue-guided-option">
              <span>Vitesse</span>
              <input id="axisVirtueVoiceRate" type="range" min="0.75" max="1.25" step="0.05" value="0.92">
            </label>

            <label class="axis-virtue-guided-option">
              <span>Volume voix</span>
              <input id="axisVirtueVoiceVolume" type="range" min="0" max="1" step="0.05" value="0.88">
            </label>

            <div id="axisVirtueGuidedMessage" class="axis-virtue-guided-message">
              Tire une carte pour commencer.
            </div>
          </div>

          <div class="axis-virtue-guided-timeline">
            <h3>Déroulement</h3>
            <div id="axisVirtueGuidedTimelineList"></div>
          </div>
        </div>

        <div class="axis-virtue-guided-screen">
          <div id="axisVirtueGuidedStage" class="axis-virtue-guided-stage">
            <div class="axis-virtue-guided-light" aria-hidden="true"></div>
            <div class="axis-virtue-guided-caption">
              <strong>Prêt</strong>
              Tire une carte, puis lance la séance guidée.
            </div>
          </div>
        </div>
      </div>
    `;

    const main = qs("main");
    const footer = qs("footer");

    if (main) {
      main.appendChild(section);
    } else if (footer && footer.parentElement) {
      footer.parentElement.insertBefore(section, footer);
    } else {
      document.body.appendChild(section);
    }

    qs("#axisVirtueStart")?.addEventListener("click", startSession);
    qs("#axisVirtuePause")?.addEventListener("click", pauseSession);
    qs("#axisVirtueResume")?.addEventListener("click", resumeSession);
    qs("#axisVirtueStop")?.addEventListener("click", stopSession);
    qs("#axisVirtueDemoMode")?.addEventListener("change", () => {
      state.steps = qs("#axisVirtueDemoMode")?.checked ? DEMO_STEPS : FULL_STEPS;
      renderTimeline();
      updateDisplay();
    });

    populateVoices();

    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = populateVoices;
    }

    state.steps = FULL_STEPS;
    state.card = findCurrentCard();

    renderTimeline();
    updateDisplay();
    setButtons();
  }

  function refreshCardQuietly() {
    if (state.running) return;
    state.card = findCurrentCard();
    updateDisplay();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installPanel);
  } else {
    installPanel();
  }

  const observer = new MutationObserver(() => {
    installPanel();
    refreshCardQuietly();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "alt", "class"]
  });
})();
