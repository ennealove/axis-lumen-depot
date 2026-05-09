(function () {
  "use strict";

  const STORAGE_KEYS = [
    "axis_lumen_custom_session",
    "axis_lumen_generated_session",
    "axis_current_session",
    "axis-practice-session"
  ];

  let root;
  let session = null;
  let index = 0;
  let running = false;
  let paused = false;
  let startAt = 0;
  let pauseAt = 0;
  let pausedTotal = 0;
  let timer = null;
  let audioCtx = null;
  let bgAudio = null;
  let currentTrackUrl = "";
  let segmentKey = "";
  let breathToneKey = "";
  let inSpecialStep = false;

  function readSession() {
    for (const key of STORAGE_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.phases)) return parsed;
      } catch (_) {}
    }

    return null;
  }

  function audioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    return audioCtx;
  }

  function playTone(freq, duration, gainValue, type) {
    try {
      const ctx = audioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainValue || 0.08, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.08);
    } catch (_) {}
  }

  function playBell() {
    const voice = session && session.voice ? session.voice : {};
    if (!voice.bellEnabled) return;

    try {
      const ctx = audioContext();
      const now = ctx.currentTime;

      [660, 880, 1320].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.10 / (i + 1), now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.9);
      });
    } catch (_) {}
  }

  function playBreathTone(tone) {
    const voice = session && session.voice ? session.voice : {};
    if (!voice.breathTonesEnabled) return;

    const map = {
      LA: 440.00,
      DO: 261.63,
      FA: 349.23
    };

    playTone(map[tone] || 349.23, 0.95, 0.075, tone === "DO" ? "triangle" : "sine");
  }

  function speak(text, force) {
    if (!session || !session.voice || !session.voice.enabled) return;
    if (!window.speechSynthesis || !text) return;

    try {
      if (force) window.speechSynthesis.cancel();

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "fr-FR";
      utter.rate = session.voice.rate || 0.95;
      utter.volume = session.voice.volume ?? 0.85;

      const voices = window.speechSynthesis.getVoices();
      const selected = voices.find(v => v.name === session.voice.voiceName);

      if (selected) utter.voice = selected;

      window.speechSynthesis.speak(utter);
    } catch (_) {}
  }

  function stopSpeech() {
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (_) {}
  }

  function stopBackgroundAudio() {
    if (bgAudio) {
      try { bgAudio.pause(); } catch (_) {}
      try { bgAudio.currentTime = 0; } catch (_) {}
    }

    bgAudio = null;
    currentTrackUrl = "";
  }

  function startBackgroundAudio(track) {
    const voice = session && session.voice ? session.voice : {};
    const volume = voice.audioVolume ?? 0.32;

    if (!track || !track.url) {
      stopBackgroundAudio();
      return;
    }

    if (currentTrackUrl === track.url && bgAudio) return;

    stopBackgroundAudio();

    try {
      bgAudio = new Audio(track.url);
      bgAudio.loop = true;
      bgAudio.volume = volume;
      currentTrackUrl = track.url;

      const p = bgAudio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } catch (_) {
      bgAudio = null;
      currentTrackUrl = "";
    }
  }

  function formatClock(seconds) {
    const s = Math.max(0, Math.ceil(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function formatDuration(seconds) {
    const s = Math.max(0, Math.round(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;

    if (m <= 0) return r + " s";
    if (r === 0) return m + " min";
    return m + " min " + r + " s";
  }

  function startCountdown(seconds, elementId, callback) {
    let remaining = seconds;
    const el = document.getElementById(elementId);
    if (el) el.textContent = remaining;

    const interval = setInterval(() => {
      remaining--;
      const el2 = document.getElementById(elementId);
      if (el2) el2.textContent = remaining;
      if (remaining <= 0) {
        clearInterval(interval);
        if (typeof callback === "function") callback();
      }
    }, 1000);
  }

  function currentPhase() {
    return session && session.phases ? session.phases[index] : null;
  }

  function renderShell() {
    root.innerHTML = `
      <section class="session-player-card">
        <h1>Pratiquer</h1>
        <p id="axisPlayerIntro">Charge une séance depuis "Créer sa séance", puis lance la pratique.</p>

        <div class="session-player-layout">
          <div>
            <div class="session-video-wrap">
              <video id="axisPracticeVideo" muted controls playsinline controlsList="nodownload noremoteplayback"></video>
              <div id="axisPracticePlaceholder" class="session-video-placeholder">
                Aucune vidéo reliée à cette phase. Suis la consigne affichée.
              </div>
            </div>

            <div class="session-current">
              <div class="session-timer" id="axisTimer">00:00</div>
              <p><strong id="axisPhaseTitle">Aucune séance chargée</strong></p>
              <p id="axisPhaseSegment">—</p>
              <p id="axisPhaseGuidance">Va dans Créer sa séance pour générer une séance vidéo.</p>

              <div class="session-player-actions">
                <button class="session-btn primary" id="axisStart" type="button">Lancer</button>
                <button class="session-btn" id="axisPause" type="button">Pause</button>
                <button class="session-btn" id="axisResume" type="button">Reprendre</button>
                <button class="session-btn" id="axisNext" type="button">Phase suivante</button>
                <button class="session-btn" id="axisReset" type="button">Revenir au début</button>
                <a class="session-btn" href="creer-seance.html">Créer une autre séance</a>
              </div>
            </div>
          </div>

          <aside>
            <h2>Timeline</h2>
            <div class="session-timeline" id="axisTimeline"></div>
          </aside>
        </div>
      </section>
    `;
  }

  function setVideo(src, autoplay) {
    const video = document.getElementById("axisPracticeVideo");
    const placeholder = document.getElementById("axisPracticePlaceholder");

    if (!video || !placeholder) return;

    video.muted = true;
    video.volume = 0;

    if (!src) {
      try { video.pause(); } catch (_) {}
      video.removeAttribute("src");
      video.style.display = "none";
      placeholder.style.display = "grid";
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
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }

  function segmentForPhase(phase, elapsed) {
    if (!phase) return null;

    if (Array.isArray(phase.segments)) {
      return phase.segments.find(seg => elapsed >= seg.from && elapsed < seg.to) || phase.segments[phase.segments.length - 1];
    }

    if (phase.type === "respiration" && Array.isArray(phase.breathPattern)) {
      const total = phase.breathPatternDuration || phase.breathPattern.reduce((sum, item) => sum + item.duration, 0);
      let t = elapsed % total;
      let acc = 0;

      for (const seg of phase.breathPattern) {
        acc += seg.duration;
        if (t < acc) {
          return {
            title: seg.title,
            tone: seg.tone,
            guidance: seg.guidance
          };
        }
      }
    }

    return null;
  }

  function renderTimeline() {
    const host = document.getElementById("axisTimeline");

    if (!host) return;

    if (!session) {
      host.innerHTML = `<article class="session-phase-row"><strong>Aucune séance</strong><small>Génère une séance depuis Créer sa séance.</small></article>`;
      return;
    }

    host.innerHTML = "";

    session.phases.forEach((phase, i) => {
      const node = document.createElement("article");
      node.className = "session-phase-row" + (i === index ? " active" : "");
      const audioName = phase.audioTrack && phase.audioTrack.name ? " · audio : " + phase.audioTrack.name : "";
      node.innerHTML = `
        <strong>${String(i + 1).padStart(2, "0")}. ${phase.title}</strong>
        <small>${formatDuration(phase.duration)} · vidéo muette${audioName}</small>
      `;
      host.appendChild(node);
    });
  }

  function showPhase(autoplay) {
    const phase = currentPhase();

    if (!phase) {
      finish();
      return;
    }

    segmentKey = "";
    breathToneKey = "";

    // ── Contemplation d'objet ─────────────────────────────────────
    if (phase.type === "object-contemplation") {
      inSpecialStep = true;
      root.innerHTML = `
        <div class="axis-object-contemplation">
          <h2>Observez cet objet</h2>
          <img src="${phase.image}" alt="Objet de contemplation">
          <div class="axis-instruction-countdown" id="axisCountdown">${phase.duration}</div>
        </div>
      `;
      if (autoplay) speak(phase.voiceStart || "Contemplez cet objet.", true);
      startCountdown(phase.duration, "axisCountdown", function () {
        inSpecialStep = false;
        playBell();
        renderShell();
        bind();
        nextPhase();
      });
      return;
    }

    // ── Instruction (lumière ou bandeau) ──────────────────────────
    if (phase.type === "instruction") {
      inSpecialStep = true;
      const imgHTML = phase.image
        ? `<img src="${phase.image}" alt="${phase.text}">`
        : "";
      root.innerHTML = `
        <div class="axis-instruction-step">
          <h2>${phase.text}</h2>
          ${imgHTML}
          <p>${phase.subtext || ""}</p>
          <div class="axis-instruction-countdown" id="axisCountdown">${phase.duration}</div>
        </div>
      `;
      if (autoplay) speak(phase.voiceStart || phase.text, true);
      startCountdown(phase.duration, "axisCountdown", function () {
        inSpecialStep = false;
        renderShell();
        bind();
        nextPhase();
      });
      return;
    }

    document.getElementById("axisPhaseTitle").textContent = phase.title;
    document.getElementById("axisPhaseSegment").textContent = phase.type || "";
    document.getElementById("axisPhaseGuidance").textContent = phase.guidance || "";
    document.getElementById("axisTimer").textContent = formatClock(phase.duration);

    setVideo(phase.video || "", autoplay);
    startBackgroundAudio(phase.audioTrack || null);
    renderTimeline();

    if (autoplay) {
      speak(phase.voiceStart || phase.guidance || phase.title, true);
    }
  }

  function renderSession() {
    session = readSession();

    const intro = document.getElementById("axisPlayerIntro");

    if (!session) {
      intro.textContent = "Aucune séance générée. Va dans Créer sa séance pour construire une timeline vidéo.";
      renderTimeline();
      return;
    }

    intro.textContent = "Séance chargée : " + (session.totalLabel || formatDuration(session.totalSeconds || 0)) + ". Vidéos muettes, voix et pistes audio actives selon tes réglages.";
    index = 0;
    showPhase(false);
  }

  function tick() {
    if (!running || paused || inSpecialStep) return;

    const phase = currentPhase();

    if (!phase) {
      finish();
      return;
    }

    const elapsed = (Date.now() - startAt - pausedTotal) / 1000;
    const remaining = Math.max(0, phase.duration - elapsed);

    const timerEl = document.getElementById("axisTimer");
    if (timerEl) timerEl.textContent = formatClock(remaining);

    const seg = segmentForPhase(phase, elapsed);

    if (seg) {
      if (phase.type === "balancement") {
        const stableKey = phase.type + "-" + index + "-" + seg.title;

        if (stableKey !== segmentKey) {
          segmentKey = stableKey;
          speak(seg.voice || seg.guidance || seg.title, true);
        }

        const segEl = document.getElementById("axisPhaseSegment");
        const guidEl = document.getElementById("axisPhaseGuidance");
        if (segEl) segEl.textContent = seg.mantra ? seg.title + " · " + seg.mantra : seg.title;
        if (guidEl) guidEl.textContent = seg.guidance || phase.guidance || "";
      }

      if (phase.type === "respiration") {
        const cycleKey = phase.type + "-" + index + "-" + seg.title + "-" + Math.floor(elapsed / Math.max(1, seg.duration || 1));

        if (cycleKey !== breathToneKey) {
          breathToneKey = cycleKey;
          playBreathTone(seg.tone);
        }

        const segEl = document.getElementById("axisPhaseSegment");
        const guidEl = document.getElementById("axisPhaseGuidance");
        if (segEl) segEl.textContent = seg.title + " · " + (seg.tone || "");
        if (guidEl) guidEl.textContent = seg.guidance || phase.guidance || "";
      }
    } else {
      const segEl = document.getElementById("axisPhaseSegment");
      const guidEl = document.getElementById("axisPhaseGuidance");
      if (segEl) segEl.textContent = phase.type || "";
      if (guidEl) guidEl.textContent = phase.guidance || "";
    }

    if (elapsed >= phase.duration) {
      nextPhase();
    }
  }

  function start() {
    session = readSession();

    if (!session) {
      renderSession();
      return;
    }

    try { audioContext(); } catch (_) {}

    running = true;
    paused = false;
    inSpecialStep = false;
    index = 0;
    startAt = Date.now();
    pauseAt = 0;
    pausedTotal = 0;

    clearInterval(timer);
    timer = setInterval(tick, 250);

    playBell();
    showPhase(true);
    tick();
  }

  function pause() {
    if (!running || paused) return;

    paused = true;
    pauseAt = Date.now();

    const video = document.getElementById("axisPracticeVideo");
    try { if (video) video.pause(); } catch (_) {}
    try { if (bgAudio) bgAudio.pause(); } catch (_) {}
    speak("Pause.", true);
  }

  function resume() {
    if (!running || !paused) return;

    paused = false;
    pausedTotal += Date.now() - pauseAt;

    const video = document.getElementById("axisPracticeVideo");

    try {
      if (video) {
        const p = video.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
    } catch (_) {}

    try {
      if (bgAudio) {
        const p2 = bgAudio.play();
        if (p2 && typeof p2.catch === "function") p2.catch(() => {});
      }
    } catch (_) {}

    speak("Reprise.", true);
  }

  function nextPhase() {
    if (!session) return;

    playBell();

    index += 1;

    if (index >= session.phases.length) {
      finish();
      return;
    }

    startAt = Date.now();
    pauseAt = 0;
    pausedTotal = 0;
    paused = false;

    showPhase(true);
    tick();
  }

  function reset() {
    running = false;
    paused = false;
    inSpecialStep = false;
    index = 0;
    startAt = 0;
    pauseAt = 0;
    pausedTotal = 0;

    clearInterval(timer);
    stopSpeech();
    stopBackgroundAudio();

    renderShell();
    bind();
    renderSession();
  }

  function finish() {
    running = false;
    paused = false;
    inSpecialStep = false;
    clearInterval(timer);
    stopBackgroundAudio();
    playBell();

    const video = document.getElementById("axisPracticeVideo");
    try { if (video) video.pause(); } catch (_) {}

    const timerEl = document.getElementById("axisTimer");
    const titleEl = document.getElementById("axisPhaseTitle");
    const segEl   = document.getElementById("axisPhaseSegment");
    const guidEl  = document.getElementById("axisPhaseGuidance");

    if (timerEl) timerEl.textContent = "00:00";
    if (titleEl) titleEl.textContent = "Séance terminée";
    if (segEl)   segEl.textContent   = "Retour au calme";
    if (guidEl)  guidEl.textContent  = "Respire doucement, puis reprends contact avec l'espace.";

    renderTimeline();
    speak("Fin de l'exercice. Revenez doucement.", true);
  }

  function bind() {
    const startBtn  = document.getElementById("axisStart");
    const pauseBtn  = document.getElementById("axisPause");
    const resumeBtn = document.getElementById("axisResume");
    const nextBtn   = document.getElementById("axisNext");
    const resetBtn  = document.getElementById("axisReset");

    if (startBtn)  startBtn.addEventListener("click", start);
    if (pauseBtn)  pauseBtn.addEventListener("click", pause);
    if (resumeBtn) resumeBtn.addEventListener("click", resume);
    if (nextBtn)   nextBtn.addEventListener("click", nextPhase);
    if (resetBtn)  resetBtn.addEventListener("click", reset);
  }

  function init() {
    root = document.getElementById("axis-session-player-root");
    if (!root) return;

    renderShell();
    bind();
    renderSession();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
