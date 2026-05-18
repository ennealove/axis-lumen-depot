(function () {
  "use strict";

  const STORAGE_KEYS = [
    "axis_lumen_custom_session",
    "axis_lumen_generated_session",
    "axis_current_session",
    "axis-practice-session"
  ];

  let root;
  let session     = null;
  let index       = 0;
  let running     = false;
  let paused      = false;
  let startAt     = 0;
  let pauseAt     = 0;
  let pausedTotal = 0;
  let timer       = null;
  let audioCtx    = null;
  let bgAudio     = null;
  let bgTrackUrl  = "";
  let segmentKey  = "";
  let breathKey   = "";

  // Flag : true quand un overlay plein-écran gère lui-même le décompte
  let specialActive = false;

  // ─── Métronome ────────────────────────────────────────────────────
  let metroTimer  = null;
  let metroBeat   = 0;

  // ─── Session ──────────────────────────────────────────────────────

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

  function currentPhase() {
    return session && session.phases ? session.phases[index] : null;
  }

  // ─── Audio Web ────────────────────────────────────────────────────

  function audioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
    return audioCtx;
  }

  function playTone(freq, dur, gain, type) {
    try {
      const ctx = audioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(gain || 0.08, now + 0.04);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + dur + 0.08);
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
        const g   = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.10 / (i + 1), now + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now); osc.stop(now + 1.9);
      });
    } catch (_) {}
  }

  function playBreathTone(tone) {
    const voice = session && session.voice ? session.voice : {};
    if (!voice.breathTonesEnabled) return;
    const map = { LA: 440.00, DO: 261.63, FA: 349.23 };
    playTone(map[tone] || 349.23, 0.95, 0.075, tone === "DO" ? "triangle" : "sine");
  }

  // ─── Audio de fond (pistes MP3) ───────────────────────────────────

  function stopBgAudio() {
    if (bgAudio) {
      try { bgAudio.pause(); } catch (_) {}
      try { bgAudio.currentTime = 0; } catch (_) {}
    }
    bgAudio = null;
    bgTrackUrl = "";
  }

  function startBgAudio(track) {
    const vol = (session && session.voice) ? (session.voice.audioVolume ?? 0.32) : 0.32;

    if (!track || !track.url) { stopBgAudio(); return; }

    // Même piste déjà en cours → ne pas relancer
    if (bgTrackUrl === track.url && bgAudio && !bgAudio.paused) return;

    // Nouvelle piste
    if (bgTrackUrl !== track.url) {
      stopBgAudio();
      try {
        bgAudio = new Audio(track.url);
        bgAudio.loop   = true;
        bgAudio.volume = vol;
        bgTrackUrl = track.url;
      } catch (_) { return; }
    }

    if (bgAudio && bgAudio.paused) {
      const p = bgAudio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }

  function pauseBgAudio() {
    if (bgAudio) try { bgAudio.pause(); } catch (_) {}
  }

  function resumeBgAudio() {
    if (bgAudio && bgAudio.paused && bgTrackUrl) {
      const p = bgAudio.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }

  // ─── Métronome (Guide rythmique) ──────────────────────────────────

  function clickBeat(volume, pan) {
    try {
      const ctx  = audioContext();
      const now  = ctx.currentTime;
      const len  = Math.ceil(ctx.sampleRate * 0.04);
      const buff = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buff.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 4);
      }
      const source = ctx.createBufferSource();
      source.buffer = buff;
      const gain = ctx.createGain();
      gain.gain.value = Math.max(0.05, Math.min(1, volume || 0.2));
      if (pan !== 0 && ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        panner.pan.value = pan;
        source.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        source.connect(gain);
        gain.connect(ctx.destination);
      }
      source.start(now);
    } catch (_) {}
  }

  function startMetronome(config) {
    stopMetronome();
    if (!config || config.mode === "off" || !config.mode) return;
    const bpm      = Math.max(20, Math.min(120, Number(config.bpm)  || 60));
    const volume   = Math.max(0.05, Math.min(1,  Number(config.volume) || 0.2));
    const stereo   = config.mode === "stereo";
    const interval = Math.round((60 / bpm) * 1000);
    metroBeat = 0;
    metroTimer = setInterval(function () {
      const pan = stereo ? (metroBeat % 2 === 0 ? -0.85 : 0.85) : 0;
      clickBeat(volume, pan);
      metroBeat++;
    }, interval);
  }

  function stopMetronome() {
    if (metroTimer) { clearInterval(metroTimer); metroTimer = null; }
    metroBeat = 0;
  }

  // ─── Voix ─────────────────────────────────────────────────────────

  function speak(text, force) {
    if (!window.speechSynthesis || !text) return;
    const voiceEnabled = !session || !session.voice || session.voice.enabled !== false;
    if (!voiceEnabled) return;
    try {
      if (force) window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      // Priorité : config session → config globale → défauts
      const sv  = (session && session.voice) ? session.voice : {};
      const gv  = window.AXIS_VOICE_CFG || {};
      u.rate    = sv.rate    ?? gv.rate    ?? 0.92;
      u.volume  = sv.volume  ?? gv.volume  ?? 0.9;
      const voiceName = sv.voiceName || gv.voiceName || "";
      const v = window.speechSynthesis.getVoices().find(vv => vv.name === voiceName);
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function stopSpeech() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
  }

  // ─── Vidéo ────────────────────────────────────────────────────────

  function setVideo(src, autoplay) {
    const video = document.getElementById("axisPracticeVideo");
    const ph    = document.getElementById("axisPracticePlaceholder");
    if (!video || !ph) return;

    video.muted = true; video.volume = 0;

    if (!src) {
      try { video.pause(); } catch (_) {}
      video.removeAttribute("src");
      video.style.display = "none";
      ph.style.display = "grid";
      return;
    }

    ph.style.display = "none";
    video.style.display = "block";
    video.loop = true;

    if (video.getAttribute("src") !== src) { video.setAttribute("src", src); video.load(); }
    if (autoplay) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
  }

  // ─── Décompte (overlay) ───────────────────────────────────────────

  function startCountdown(seconds, elementId, onEnd) {
    let remaining = seconds;
    const update = () => {
      const el = document.getElementById(elementId);
      if (el) el.textContent = remaining;
    };
    update();
    const iv = setInterval(() => {
      remaining--;
      update();
      if (remaining <= 0) { clearInterval(iv); if (typeof onEnd === "function") onEnd(); }
    }, 1000);
  }

  // ─── Shell HTML du player ─────────────────────────────────────────

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
                <button class="session-btn primary" id="axisStart"  type="button">Lancer</button>
                <button class="session-btn"         id="axisPause"  type="button">Pause</button>
                <button class="session-btn"         id="axisResume" type="button">Reprendre</button>
                <button class="session-btn"         id="axisNext"   type="button">Phase suivante</button>
                <button class="session-btn"         id="axisReset"  type="button">Revenir au début</button>
                <a class="session-btn" href="creer-seance.html">Créer une autre séance</a>
              </div>
            </div>
          </div>
          <aside>
            <h2>Timeline</h2>
            <div class="session-timeline" id="axisTimeline"></div>
          </aside>
        </div>
      </section>`;
  }

  // ─── Timeline ─────────────────────────────────────────────────────

  function formatClock(s) {
    s = Math.max(0, Math.ceil(s));
    const m = Math.floor(s / 60), r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }

  function formatDuration(s) {
    s = Math.max(0, Math.round(s));
    const m = Math.floor(s / 60), r = s % 60;
    if (m <= 0) return r + " s";
    if (r === 0) return m + " min";
    return m + " min " + r + " s";
  }

  function renderTimeline() {
    const host = document.getElementById("axisTimeline");
    if (!host) return;
    if (!session) {
      host.innerHTML = `<article class="session-phase-row"><strong>Aucune séance</strong><small>Génère une séance depuis Créer sa séance.</small></article>`;
      return;
    }
    host.innerHTML = "";
    session.phases.forEach((p, i) => {
      const row = document.createElement("article");
      row.className = "session-phase-row" + (i === index ? " active" : "");
      const audio = p.audioTrack && p.audioTrack.name ? " · " + p.audioTrack.name : "";
      row.innerHTML = `<strong>${String(i + 1).padStart(2, "0")}. ${p.title}</strong><small>${formatDuration(p.duration)}${audio}</small>`;
      host.appendChild(row);
    });
  }

  // ─── Rendu d'une phase ────────────────────────────────────────────

  function segmentForPhase(p, elapsed) {
    if (!p) return null;
    if (Array.isArray(p.segments)) {
      return p.segments.find(s => elapsed >= s.from && elapsed < s.to) || p.segments[p.segments.length - 1];
    }
    if (p.type === "respiration" && Array.isArray(p.breathPattern)) {
      const total = p.breathPatternDuration || p.breathPattern.reduce((s, i) => s + i.duration, 0);
      let t = elapsed % total, acc = 0;
      for (const seg of p.breathPattern) {
        acc += seg.duration;
        if (t < acc) return { title: seg.title, tone: seg.tone, guidance: seg.guidance };
      }
    }
    return null;
  }

  // Callback commun à la fin d'un overlay spécial
  function onSpecialEnd() {
    specialActive = false;
    renderShell();
    bind();
    index += 1;
    if (index >= session.phases.length) { finish(); return; }
    startAt     = Date.now();
    pauseAt     = 0;
    pausedTotal = 0;
    paused      = false;
    showPhase(true);
  }

  function showPhase(autoplay) {
    const p = currentPhase();
    if (!p) { finish(); return; }

    segmentKey = "";
    breathKey  = "";

    // ── Overlay : contemplation d'objet ──────────────────────────
    if (p.type === "object-contemplation") {
      specialActive = true;
      root.innerHTML = `
        <div class="axis-object-contemplation">
          <h2>Observez cet objet</h2>
          <img src="${p.image}" alt="${p.title}">
          <div class="axis-instruction-countdown" id="axisCountdown">${p.duration}</div>
        </div>`;
      if (autoplay) speak(p.voiceStart || "Contemplez cet objet.", true);
      startCountdown(p.duration, "axisCountdown", onSpecialEnd);
      return;
    }

    // ── Overlay : instruction (lumière / bandeau) ─────────────────
    if (p.type === "instruction") {
      specialActive = true;
      const imgHTML = p.image ? `<img src="${p.image}" alt="${p.text}">` : "";
      root.innerHTML = `
        <div class="axis-instruction-step">
          <h2>${p.text}</h2>
          ${imgHTML}
          <p>${p.subtext || ""}</p>
          <div class="axis-instruction-countdown" id="axisCountdown">${p.duration}</div>
        </div>`;
      if (autoplay) speak(p.voiceStart || p.text, true);
      startCountdown(p.duration, "axisCountdown", onSpecialEnd);
      return;
    }

    // ── Phase normale (vidéo + audio de fond) ────────────────────
    const titleEl  = document.getElementById("axisPhaseTitle");
    const segEl    = document.getElementById("axisPhaseSegment");
    const guidEl   = document.getElementById("axisPhaseGuidance");
    const timerEl  = document.getElementById("axisTimer");

    if (titleEl)  titleEl.textContent  = p.title;
    if (segEl)    segEl.textContent    = p.type || "";
    if (guidEl)   guidEl.textContent   = p.guidance || "";
    if (timerEl)  timerEl.textContent  = formatClock(p.duration);

    setVideo(p.video || "", autoplay);
    startBgAudio(p.audioTrack || null);

    // Métronome : actif uniquement pendant les phases de balancement
    if (p.type === "balancement") {
      const metro = session && session.config && session.config.metro;
      startMetronome(metro);
    } else {
      stopMetronome();
    }

    renderTimeline();

    if (autoplay) speak(p.voiceStart || p.guidance || p.title, true);
  }

  // ─── Tick (horloge du player) ─────────────────────────────────────

  function tick() {
    if (!running || paused || specialActive) return;

    const p = currentPhase();
    if (!p) { finish(); return; }

    const elapsed   = (Date.now() - startAt - pausedTotal) / 1000;
    const remaining = Math.max(0, p.duration - elapsed);

    const timerEl = document.getElementById("axisTimer");
    if (timerEl) timerEl.textContent = formatClock(remaining);

    const seg = segmentForPhase(p, elapsed);

    if (seg) {
      const segEl  = document.getElementById("axisPhaseSegment");
      const guidEl = document.getElementById("axisPhaseGuidance");

      if (p.type === "balancement") {
        const key = p.type + "-" + index + "-" + seg.title;
        if (key !== segmentKey) { segmentKey = key; speak(seg.voice || seg.guidance || seg.title, true); }
        if (segEl)  segEl.textContent  = seg.mantra ? seg.title + " · " + seg.mantra : seg.title;
        if (guidEl) guidEl.textContent = seg.guidance || p.guidance || "";
      }

      if (p.type === "respiration") {
        const key = p.type + "-" + index + "-" + seg.title + "-" + Math.floor(elapsed / Math.max(1, seg.duration || 1));
        if (key !== breathKey) { breathKey = key; playBreathTone(seg.tone); }
        if (segEl)  segEl.textContent  = seg.title + " · " + (seg.tone || "");
        if (guidEl) guidEl.textContent = seg.guidance || p.guidance || "";
      }
    } else {
      const segEl  = document.getElementById("axisPhaseSegment");
      const guidEl = document.getElementById("axisPhaseGuidance");
      if (segEl)  segEl.textContent  = p.type || "";
      if (guidEl) guidEl.textContent = p.guidance || "";
    }

    if (elapsed >= p.duration) nextPhase();
  }

  // ─── Contrôles ───────────────────────────────────────────────────

  function start() {
    session = readSession();
    if (!session) { renderSession(); return; }

    try { audioContext(); } catch (_) {}

    running       = true;
    paused        = false;
    specialActive = false;
    index         = 0;
    startAt       = Date.now();
    pauseAt       = 0;
    pausedTotal   = 0;

    clearInterval(timer);
    timer = setInterval(tick, 250);

    playBell();
    showPhase(true);
    tick();
  }

  function pause() {
    if (!running || paused) return;
    paused  = true;
    pauseAt = Date.now();
    const video = document.getElementById("axisPracticeVideo");
    try { if (video) video.pause(); } catch (_) {}
    pauseBgAudio();
    stopMetronome();
    speak("Pause.", true);
  }

  function resume() {
    if (!running || !paused) return;
    paused       = false;
    pausedTotal += Date.now() - pauseAt;
    const video = document.getElementById("axisPracticeVideo");
    try { if (video) { const p = video.play(); if (p && p.catch) p.catch(() => {}); } } catch (_) {}
    resumeBgAudio();
    // Relancer le métronome si on est en phase de balancement
    const p = currentPhase();
    if (p && p.type === "balancement") {
      const metro = session && session.config && session.config.metro;
      startMetronome(metro);
    }
    speak("Reprise.", true);
  }

  function nextPhase() {
    if (!session) return;
    playBell();
    index += 1;
    if (index >= session.phases.length) { finish(); return; }
    startAt     = Date.now();
    pauseAt     = 0;
    pausedTotal = 0;
    paused      = false;
    showPhase(true);
    tick();
  }

  function reset() {
    running       = false;
    paused        = false;
    specialActive = false;
    index         = 0;
    startAt       = 0;
    pauseAt       = 0;
    pausedTotal   = 0;
    clearInterval(timer);
    stopSpeech();
    stopBgAudio();
    stopMetronome();
    renderShell();
    bind();
    renderSession();
  }

  // ─── Tirage de vertu ─────────────────────────────────────────────

  function drawVertu() {
    const vertus = window.AXIS_VERTUS;
    if (!Array.isArray(vertus) || vertus.length === 0) return null;

    const storageKey = "axis_vertus_history";
    let history = [];
    try { history = JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (_) {}

    const now = Date.now();
    const sevenDays = 7 * 24 * 3600 * 1000;
    history = history.filter(e => now - e.ts < sevenDays);

    const usedIds = new Set(history.map(e => e.id));
    const pool = vertus.filter(v => !usedIds.has(v.id));
    const source = pool.length > 0 ? pool : vertus;
    const chosen = source[Math.floor(Math.random() * source.length)];

    history.push({ id: chosen.id, ts: now });
    try { localStorage.setItem(storageKey, JSON.stringify(history)); } catch (_) {}

    return chosen;
  }

  function finish() {
    running       = false;
    paused        = false;
    specialActive = false;
    clearInterval(timer);
    stopBgAudio();
    stopMetronome();
    playBell();

    const video = document.getElementById("axisPracticeVideo");
    try { if (video) video.pause(); } catch (_) {}

    const vertu = drawVertu();
    const hour  = new Date().getHours();
    const timeMsg = hour < 14
      ? "Vous pouvez porter cette vertu avec vous aujourd'hui. Cherchez à l'incarner dans vos actions."
      : "En vous endormant, laissez cette vertu habiter vos pensées. Laissez-la travailler en vous durant le sommeil.";

    if (vertu) {
      root.innerHTML = `
        <div style="
          min-height:70vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
          padding:clamp(24px,4vw,60px);text-align:center;
          background:radial-gradient(circle at 50% 20%,rgba(216,180,95,.13),transparent 54%);
        ">
          <p style="color:#f4d986;font-size:.78rem;font-weight:900;letter-spacing:.16em;text-transform:uppercase;margin:0 0 18px;">Fin de séance</p>
          <h2 style="margin:0 0 10px;color:rgba(244,236,216,.7);font-size:1rem;font-weight:500;">Votre séance est terminée. Prenez un instant.</h2>

          <div style="
            margin:24px 0;padding:32px 36px;
            border:1px solid rgba(216,180,95,.34);
            border-radius:28px;
            background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.03));
            max-width:540px;width:100%;
            box-shadow:0 30px 80px rgba(0,0,0,.4);
          ">
            <p style="color:#f4d986;font-size:.74rem;font-weight:900;letter-spacing:.14em;text-transform:uppercase;margin:0 0 10px;">Carte des vertus</p>
            <h3 style="
              font-family:Georgia,'Times New Roman',serif;
              font-size:clamp(2rem,6vw,3.4rem);
              color:#ffe7a3;margin:0 0 16px;line-height:1;
            ">${vertu.nom}</h3>
            <p style="color:rgba(244,236,216,.82);line-height:1.7;margin:0 0 14px;font-size:1rem;">${vertu.description}</p>
            <p style="
              border-top:1px solid rgba(216,180,95,.18);
              padding-top:14px;margin:0;
              color:rgba(216,180,95,.88);font-style:italic;line-height:1.6;font-size:.92rem;
            ">${vertu.meditation}</p>
          </div>

          <p style="
            max-width:480px;color:rgba(244,236,216,.65);line-height:1.65;
            font-size:.94rem;margin:0 0 28px;
          ">${timeMsg}</p>

          <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">
            <button id="axisFinishLight" type="button" style="
              padding:13px 28px;border-radius:14px;
              background:linear-gradient(135deg,rgba(216,180,95,.22),rgba(216,180,95,.08));
              border:1px solid rgba(216,180,95,.42);
              color:#ffe7a3;font-weight:800;font-size:.92rem;cursor:pointer;
            " aria-label="Rallumer la source lumineuse">☀ Rallumer la lumière</button>
            <a href="index.html" style="
              padding:13px 28px;border-radius:14px;
              background:transparent;border:1px solid rgba(216,180,95,.22);
              color:rgba(244,236,216,.7);font-weight:700;font-size:.9rem;
              text-decoration:none;display:inline-flex;align-items:center;
            ">Revenir à l'accueil</a>
          </div>

          <p id="axisFinishLightMsg" style="margin-top:20px;color:#f4d986;font-size:.9rem;min-height:1.4em;"></p>
        </div>`;

      const lightBtn = document.getElementById("axisFinishLight");
      if (lightBtn) {
        lightBtn.addEventListener("click", function () {
          const msg = document.getElementById("axisFinishLightMsg");
          if (msg) msg.textContent = "Rallumez votre source lumineuse. Fixez-la quelques instants, les yeux doux.";
          speak("Rallumez votre source lumineuse. Fixez-la quelques instants, les yeux doux.", true);
        });
      }

      setTimeout(function () {
        speak("Votre séance est terminée. " + vertu.nom + ". " + vertu.description + " " + timeMsg, true);
      }, 1800);

    } else {
      const el = id => document.getElementById(id);
      if (el("axisTimer"))        el("axisTimer").textContent        = "00:00";
      if (el("axisPhaseTitle"))   el("axisPhaseTitle").textContent   = "Séance terminée";
      if (el("axisPhaseSegment")) el("axisPhaseSegment").textContent = "Retour au calme";
      if (el("axisPhaseGuidance"))el("axisPhaseGuidance").textContent= "Respire doucement, puis reprends contact avec l'espace.";
      renderTimeline();
      speak("Fin de l'exercice. Revenez doucement.", true);
    }
  }

  // ─── Session init ─────────────────────────────────────────────────

  function renderSession() {
    session = readSession();
    const intro = document.getElementById("axisPlayerIntro");
    if (!session) {
      if (intro) intro.textContent = "Aucune séance générée. Va dans Créer sa séance pour construire une timeline vidéo.";
      renderTimeline();
      return;
    }
    if (intro) intro.textContent = "Séance chargée : " + (session.totalLabel || formatDuration(session.totalSeconds || 0)) + ". Lance la pratique quand tu es prêt.";
    index = 0;
    showPhase(false);
  }

  // ─── Liaisons boutons ─────────────────────────────────────────────

  function bind() {
    const btn = id => document.getElementById(id);
    if (btn("axisStart"))  btn("axisStart").addEventListener("click",  start);
    if (btn("axisPause"))  btn("axisPause").addEventListener("click",  pause);
    if (btn("axisResume")) btn("axisResume").addEventListener("click", resume);
    if (btn("axisNext"))   btn("axisNext").addEventListener("click",   nextPhase);
    if (btn("axisReset"))  btn("axisReset").addEventListener("click",  reset);
  }

  // ─── Init ─────────────────────────────────────────────────────────

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
