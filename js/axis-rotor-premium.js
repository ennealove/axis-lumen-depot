(() => {
  "use strict";

  const ASSETS = {
    models: {
      model1: "assets/images/gyro_model_1.png",
      model2: "assets/images/gyro_model_2.png",
      model3: "assets/images/gyro_model_3.png",
      model4: "assets/images/gyro_model_4.png"
    },
    objects: {
      flower: "assets/images/flower.png",
      tree: "assets/images/tree.png",
      geometry: "assets/images/geometry.png"
    }
  };

  const FALLBACK_TRACKS = [
    { id: "", name: "Aucune piste musicale", url: "" },
    { id: "ck3_01", name: "CK3 Piste 01", url: "assets/audio/ck3_piste_01.mp3" },
    { id: "ck3_02", name: "CK3 Piste 02", url: "assets/audio/ck3_piste_02.mp3" },
    { id: "ck3_03", name: "CK3 Piste 03", url: "assets/audio/ck3_piste_03.mp3" },
    { id: "ck3_04", name: "CK3 Piste 04", url: "assets/audio/ck3_piste_04.mp3" },
    { id: "rythme_1s_3mn", name: "Rythme 1s — 3 min", url: "assets/audio/rythme_1s_3mn.mp3" },
    { id: "rythme_1s_alt_3mn", name: "Rythme 1s alterné — 3 min", url: "assets/audio/rythme_1s_alt_3mn.mp3" },
    { id: "rythme_bass_rotations", name: "Rythme bass rotations — 8 min", url: "assets/audio/rythme_bass_rotations_1s_6e_sec_8min.mp3" },
    { id: "rythme_multidimensionnel", name: "Rythme multidimensionnel — 11 min", url: "assets/audio/rythme_multidimensionnel_1s_alt_6e_sec_11min.mp3" },
    { id: "respirations_phosphenique", name: "Respirations phosphéniques", url: "assets/audio/Respirations-Phosphenique.mp3" },
    { id: "mantra_aum_3mn", name: "Mantra AUM — 3 min", url: "assets/audio/mantra_aum_3mn.mp3" },
    { id: "mantra_aum_20mn", name: "Mantra AUM — 20 min", url: "assets/audio/mantra_aum_20mn.mp3" },
    { id: "om_mi", name: "OM en Mi", url: "assets/audio/OM_en_mi.mp3" },
    { id: "angelic_meditation", name: "Angelic Meditation", url: "assets/audio/35433346-angelic-meditation-172334.mp3" },
    { id: "heavenly_energy", name: "Heavenly Energy", url: "assets/audio/light_music-heavenly-energy-188908.mp3" },
    { id: "zen_walk", name: "Zen Walk", url: "assets/audio/light_music-zen-walk-176110.mp3" },
    { id: "deep_theta", name: "Deep 5Hz Theta Relaxation", url: "assets/audio/tim_kulig_free_music-deep-5hz-theta-relaxation-232572.mp3" },
    { id: "healing_396", name: "Healing Sound 396 Hz", url: "assets/audio/sonorahealing-healing-sound-396_-hz-452272.mp3" }
  ];

  const PHASES = {
    idle: {
      label: "Prévisualisation",
      hint: "Configure la séance, puis lance le rotor optique.",
      voice: ""
    },
    generated: {
      label: "Séance générée",
      hint: "La séance est prête. Lance-la ou passe en plein écran.",
      voice: ""
    },
    object: {
      label: "Observation de l’objet",
      hint: "Regard stable. Observez seulement l’objet choisi.",
      voice: "Observez l’objet. Gardez le regard stable."
    },
    light: {
      label: "Observation lumineuse",
      hint: "Regard posé au centre de la lumière.",
      voice: "Allumez la lumière. Regardez le centre lumineux."
    },
    rotation: {
      label: "Rotation gyroscopique",
      hint: "L’objet est fixé en bout de pale. Le centre lumineux reste fixe.",
      voice: "Commencez la rotation. Gardez le regard stable sur l’objet en bout de pale."
    },
    return: {
      label: "Retour au calme",
      hint: "Respirez doucement. Laissez la vision se déposer.",
      voice: "La rotation se termine. Revenez doucement. Respirez calmement."
    },
    done: {
      label: "Fin de l’exercice",
      hint: "Séance terminée.",
      voice: "Fin de l’exercice."
    }
  };

  const $ = (selector) => document.querySelector(selector);

  const canvas = $("#rotorCanvas");
  const ctx = canvas.getContext("2d", { alpha: false });

  const els = {
    stage: $("#rotorStage"),
    phaseBadge: $("#phaseBadge"),
    timerLabel: $("#timerLabel"),
    phaseHint: $("#phaseHint"),
    model: $("#gyroModel"),
    object: $("#objectSelect"),
    direction: $("#directionSelect"),
    duration: $("#durationSelect"),
    speed: $("#speedRange"),
    speedOutput: $("#speedOutput"),
    size: $("#sizeRange"),
    sizeOutput: $("#sizeOutput"),
    voiceToggle: $("#voiceToggle"),
    bellToggle: $("#bellToggle"),
    voiceSelect: $("#voiceSelect"),
    voiceRate: $("#voiceRate"),
    voiceRateOutput: $("#voiceRateOutput"),
    voiceVolume: $("#voiceVolume"),
    voiceVolumeOutput: $("#voiceVolumeOutput"),
    musicSelect: $("#musicSelect"),
    musicVolume: $("#musicVolume"),
    musicVolumeOutput: $("#musicVolumeOutput"),
    testVoice: $("#testVoiceBtn"),
    generate: $("#generateBtn"),
    start: $("#startBtn"),
    fullscreen: $("#fullscreenBtn"),
    pause: $("#pauseBtn"),
    resume: $("#resumeBtn"),
    stop: $("#stopBtn"),
    fsPause: $("#fsPauseBtn"),
    fsResume: $("#fsResumeBtn"),
    fsExit: $("#fsExitBtn"),
    summary: $("#sessionSummary"),
    timeline: $("#sessionTimeline")
  };

  const state = {
    phase: "idle",
    running: false,
    paused: false,
    generated: false,
    phaseStartedAt: 0,
    phasePausedMs: 0,
    pauseStartedAt: 0,
    phaseIndex: -1,
    timeline: [],
    model: "model1",
    object: "flower",
    direction: "clockwise",
    durationMin: 3,
    speed: 15,
    sizePercent: 90,
    rotationAngle: 0,
    lastFrameAt: performance.now(),
    lastSpokenPhase: "",
    images: {
      models: {},
      objects: {}
    },
    audio: null,
    audioUrl: "",
    audioStarted: false,
    bellCtx: null,
    voices: [],
    tracks: []
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  async function preloadImages() {
    await Promise.all(
      Object.entries(ASSETS.models).map(async ([key, src]) => {
        state.images.models[key] = await loadImage(src);
      })
    );

    await Promise.all(
      Object.entries(ASSETS.objects).map(async ([key, src]) => {
        state.images.objects[key] = await loadImage(src);
      })
    );
  }

  function getExternalAudioTracks() {
    const out = [];
    const candidates = [
      window.AXIS_SESSION_AUDIO_MAP,
      window.AXIS_SESSION_AUDIO,
      window.AXIS_AUDIO_MAP,
      window.axisSessionAudioMap,
      window.axisAudioMap
    ];

    function pushTrack(item, fallbackName = "") {
      if (!item) return;

      if (typeof item === "string") {
        out.push({
          id: item,
          name: fallbackName || item.split("/").pop() || item,
          url: item
        });
        return;
      }

      const url = item.url || item.path || item.src || item.file || "";
      if (!url) return;

      out.push({
        id: item.id || url,
        name: item.name || item.label || item.title || fallbackName || url.split("/").pop() || url,
        url
      });
    }

    candidates.forEach((source) => {
      if (!source) return;

      if (Array.isArray(source)) {
        source.forEach((item) => pushTrack(item));
        return;
      }

      if (source.tracks && Array.isArray(source.tracks)) {
        source.tracks.forEach((item) => pushTrack(item));
        return;
      }

      if (typeof source === "object") {
        Object.entries(source).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => pushTrack(item, key));
          } else {
            pushTrack(value, key);
          }
        });
      }
    });

    return out;
  }

  function dedupeTracks(items) {
    const seen = new Set();
    return items.filter((track) => {
      const key = track.url || track.id || track.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function populateMusicSelect() {
    const external = getExternalAudioTracks();
    const all = dedupeTracks([...FALLBACK_TRACKS, ...external]).filter((track, index, arr) => {
      if (!track.url && track.id !== "") return false;
      return true;
    });

    state.tracks = all;

    els.musicSelect.innerHTML = "";
    all.forEach((track) => {
      const opt = document.createElement("option");
      opt.value = track.url || "";
      opt.textContent = track.name || "Piste audio";
      els.musicSelect.appendChild(opt);
    });
  }

  function refreshVoices() {
    if (!window.speechSynthesis) return;

    state.voices = window.speechSynthesis.getVoices() || [];
    const current = els.voiceSelect.value;

    els.voiceSelect.innerHTML = "";

    const auto = document.createElement("option");
    auto.value = "";
    auto.textContent = "Automatique";
    els.voiceSelect.appendChild(auto);

    state.voices.forEach((voice, index) => {
      const opt = document.createElement("option");
      opt.value = String(index);
      opt.textContent = `${voice.name} · ${voice.lang}`;
      els.voiceSelect.appendChild(opt);
    });

    if ([...els.voiceSelect.options].some((opt) => opt.value === current)) {
      els.voiceSelect.value = current;
    }
  }

  function syncFromInputs() {
    state.model = els.model.value || "model1";
    state.object = els.object.value || "flower";
    state.direction = els.direction.value || "clockwise";
    state.durationMin = Number(els.duration.value || 3);
    state.speed = Number(els.speed.value || 15);
    state.sizePercent = Number(els.size.value || 90);

    els.speedOutput.textContent = String(state.speed);
    els.sizeOutput.textContent = `${state.sizePercent}%`;
    els.voiceRateOutput.textContent = Number(els.voiceRate.value || 0.95).toFixed(2);
    els.voiceVolumeOutput.textContent = Number(els.voiceVolume.value || 0.85).toFixed(2);
    els.musicVolumeOutput.textContent = Number(els.musicVolume.value || 0.32).toFixed(2);

    if (state.audio) {
      state.audio.volume = Number(els.musicVolume.value || 0.32);
    }

    renderGeneratedSession();
  }

  function buildTimeline() {
    syncFromInputs();

    state.timeline = [
      {
        phase: "object",
        label: "Observation de l’objet",
        duration: 30,
        detail: "L’objet choisi apparaît seul, grand, centré et calme."
      },
      {
        phase: "light",
        label: "Observation lumineuse",
        duration: 30,
        detail: "Le centre lumineux devient le point de fixation."
      },
      {
        phase: "rotation",
        label: "Rotation gyroscopique",
        duration: Math.max(1, state.durationMin) * 60,
        detail: "Le gyroscope tourne. L’objet est fixé à l’extrémité d’une pale."
      },
      {
        phase: "return",
        label: "Retour au calme",
        duration: 20,
        detail: "La lumière ralentit. La voix invite au retour."
      }
    ];

    state.generated = true;
    state.phase = "generated";
    state.phaseIndex = -1;
    state.running = false;
    state.paused = false;
    state.lastSpokenPhase = "";
    updateHud();
    renderGeneratedSession();

    try {
      localStorage.setItem("axis-rotor-session-v1", JSON.stringify(getSessionConfigForStorage()));
    } catch {}
  }

  function getSessionConfigForStorage() {
    return {
      type: "rotor-optique",
      model: state.model,
      object: state.object,
      direction: state.direction,
      speed: state.speed,
      sizePercent: state.sizePercent,
      durationMin: state.durationMin,
      voiceEnabled: els.voiceToggle.checked,
      bellEnabled: els.bellToggle.checked,
      voiceRate: Number(els.voiceRate.value || 0.95),
      voiceVolume: Number(els.voiceVolume.value || 0.85),
      musicUrl: els.musicSelect.value || "",
      musicVolume: Number(els.musicVolume.value || 0.32),
      timeline: state.timeline
    };
  }

  function totalSeconds() {
    return state.timeline.reduce((sum, item) => sum + item.duration, 0);
  }

  function formatClock(totalSecondsValue) {
    const s = Math.max(0, Math.ceil(totalSecondsValue));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function formatDuration(seconds) {
    const s = Math.round(seconds);
    const m = Math.floor(s / 60);
    const r = s % 60;
    if (m <= 0) return `${r} s`;
    if (r === 0) return `${m} min`;
    return `${m} min ${r} s`;
  }

  function renderGeneratedSession() {
    if (!els.summary || !els.timeline) return;

    const duration = Math.max(1, Number(els.duration.value || 3));
    const selectedTrack = els.musicSelect.options[els.musicSelect.selectedIndex]?.textContent || "Aucune piste musicale";

    els.summary.innerHTML = `
      <strong>Rotor optique prêt.</strong><br>
      Objet : ${labelForObject(els.object.value)} · ${labelForModel(els.model.value)} ·
      ${els.direction.value === "clockwise" ? "horaire" : "antihoraire"} ·
      rotation ${duration} min.<br>
      Piste : ${escapeHtml(selectedTrack)}.
    `;

    const timeline = state.timeline.length ? state.timeline : [
      { label: "Observation de l’objet", duration: 30, detail: "Objet seul, centré." },
      { label: "Observation lumineuse", duration: 30, detail: "Centre lumineux fixe." },
      { label: "Rotation gyroscopique", duration: duration * 60, detail: "Objet fixé en bout de pale." },
      { label: "Retour au calme", duration: 20, detail: "Sortie progressive." }
    ];

    els.timeline.innerHTML = timeline.map((item) => `
      <div class="axis-rotor-step">
        <strong>${escapeHtml(item.label)} · ${formatDuration(item.duration)}</strong>
        <span>${escapeHtml(item.detail || "")}</span>
      </div>
    `).join("");
  }

  function labelForObject(value) {
    if (value === "tree") return "Arbre";
    if (value === "geometry") return "Géométrie";
    return "Fleur";
  }

  function labelForModel(value) {
    if (value === "model2") return "Modèle 2";
    if (value === "model3") return "Modèle 3";
    if (value === "model4") return "Modèle 4";
    return "Modèle 1";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentTimelineItem() {
    if (state.phaseIndex < 0) return null;
    return state.timeline[state.phaseIndex] || null;
  }

  function phaseDurationSeconds(phase) {
    const item = currentTimelineItem();
    if (item && item.phase === phase) return item.duration;
    return 0;
  }

  function nowPhaseElapsedSeconds() {
    if (!state.running || !state.phaseStartedAt) return 0;

    const now = performance.now();
    const pausedExtra = state.paused ? now - state.pauseStartedAt : 0;
    const elapsedMs = now - state.phaseStartedAt - state.phasePausedMs - pausedExtra;

    return Math.max(0, elapsedMs / 1000);
  }

  function remainingSeconds() {
    const item = currentTimelineItem();
    if (!item) return 0;
    return Math.max(0, item.duration - nowPhaseElapsedSeconds());
  }

  function setPhaseByIndex(index) {
    state.phaseIndex = index;

    const item = state.timeline[index];
    if (!item) {
      finishSession();
      return;
    }

    state.phase = item.phase;
    state.phaseStartedAt = performance.now();
    state.phasePausedMs = 0;
    state.pauseStartedAt = 0;
    state.paused = false;

    updateHud();
    ringBell();
    speakPhase(state.phase);
  }

  function startSession() {
    if (!state.generated || !state.timeline.length) {
      buildTimeline();
    }

    stopAudio();
    syncFromInputs();

    state.running = true;
    state.paused = false;
    state.rotationAngle = 0;
    state.lastSpokenPhase = "";

    startAudio();
    setPhaseByIndex(0);
  }

  function finishSession() {
    state.running = false;
    state.paused = false;
    state.phase = "done";
    state.phaseIndex = -1;
    state.phaseStartedAt = 0;
    updateHud();
    speakPhase("done");
    fadeOutAudio();
  }

  function stopSession() {
    state.running = false;
    state.paused = false;
    state.phase = state.generated ? "generated" : "idle";
    state.phaseIndex = -1;
    state.phaseStartedAt = 0;
    stopAudio();

    if (window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }

    updateHud();
  }

  function pauseSession() {
    if (!state.running || state.paused) return;

    state.paused = true;
    state.pauseStartedAt = performance.now();

    if (state.audio) {
      try { state.audio.pause(); } catch {}
    }

    if (window.speechSynthesis) {
      try { window.speechSynthesis.pause(); } catch {}
    }

    updateHud();
  }

  function resumeSession() {
    if (!state.running || !state.paused) return;

    const now = performance.now();
    state.phasePausedMs += now - state.pauseStartedAt;
    state.pauseStartedAt = 0;
    state.paused = false;

    if (state.audio) {
      state.audio.play().catch(() => {});
    }

    if (window.speechSynthesis) {
      try { window.speechSynthesis.resume(); } catch {}
    }

    updateHud();
  }

  function nextPhaseIfNeeded() {
    if (!state.running || state.paused) return;

    const item = currentTimelineItem();
    if (!item) return;

    if (nowPhaseElapsedSeconds() >= item.duration) {
      setPhaseByIndex(state.phaseIndex + 1);
    }
  }

  function updateHud() {
    const phaseInfo = PHASES[state.phase] || PHASES.idle;
    els.phaseBadge.textContent = phaseInfo.label;

    const item = currentTimelineItem();
    if (state.running && item) {
      els.timerLabel.textContent = formatClock(remainingSeconds());
      els.phaseHint.textContent = item.detail || phaseInfo.hint;
    } else if (state.phase === "generated") {
      els.timerLabel.textContent = formatClock(totalSeconds());
      els.phaseHint.textContent = PHASES.generated.hint;
    } else {
      els.timerLabel.textContent = "00:00";
      els.phaseHint.textContent = phaseInfo.hint;
    }

    els.pause.disabled = !state.running || state.paused;
    els.resume.disabled = !state.running || !state.paused;
    els.stop.disabled = !state.running && state.phase !== "done";
  }

  function speakPhase(phase) {
    if (!els.voiceToggle.checked) return;
    if (!window.speechSynthesis) return;

    const text = PHASES[phase]?.voice || "";
    if (!text) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const selectedIndex = Number(els.voiceSelect.value);
      const selectedVoice = Number.isFinite(selectedIndex) ? state.voices[selectedIndex] : null;
      const frVoice = selectedVoice || state.voices.find((voice) => /^fr/i.test(voice.lang)) || state.voices[0];

      utterance.lang = frVoice?.lang || "fr-FR";
      if (frVoice) utterance.voice = frVoice;
      utterance.rate = Number(els.voiceRate.value || 0.95);
      utterance.pitch = 0.94;
      utterance.volume = Number(els.voiceVolume.value || 0.85);

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  function testVoice() {
    speakCustom("Voix de guidage Axis Lumen prête. Le rotor optique peut maintenant générer une séance complète.");
  }

  function speakCustom(text) {
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const selectedIndex = Number(els.voiceSelect.value);
      const selectedVoice = Number.isFinite(selectedIndex) ? state.voices[selectedIndex] : null;
      const frVoice = selectedVoice || state.voices.find((voice) => /^fr/i.test(voice.lang)) || state.voices[0];

      utterance.lang = frVoice?.lang || "fr-FR";
      if (frVoice) utterance.voice = frVoice;
      utterance.rate = Number(els.voiceRate.value || 0.95);
      utterance.pitch = 0.94;
      utterance.volume = Number(els.voiceVolume.value || 0.85);

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  function ensureBellCtx() {
    if (!state.bellCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      state.bellCtx = new AudioContextClass();
    }
    return state.bellCtx;
  }

  function ringBell() {
    if (!els.bellToggle.checked) return;

    try {
      const audioCtx = ensureBellCtx();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const gain = audioCtx.createGain();
      const osc = audioCtx.createOscillator();

      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(990, now + 0.12);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {}
  }

  function startAudio() {
    const url = els.musicSelect.value || "";
    if (!url) return;

    try {
      state.audio = new Audio(url);
      state.audio.loop = true;
      state.audio.volume = Number(els.musicVolume.value || 0.32);
      state.audio.play().catch(() => {});
      state.audioUrl = url;
      state.audioStarted = true;
    } catch {}
  }

  function stopAudio() {
    if (!state.audio) return;

    try {
      state.audio.pause();
      state.audio.currentTime = 0;
    } catch {}

    state.audio = null;
    state.audioUrl = "";
    state.audioStarted = false;
  }

  function fadeOutAudio() {
    if (!state.audio) return;

    const audio = state.audio;
    const startVolume = audio.volume;
    const startedAt = performance.now();
    const duration = 2400;

    function step(now) {
      const t = clamp((now - startedAt) / duration, 0, 1);
      audio.volume = startVolume * (1 - t);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        stopAudio();
      }
    }

    requestAnimationFrame(step);
  }

  async function enterFullscreen() {
    try {
      if (els.stage.requestFullscreen) {
        await els.stage.requestFullscreen();
      } else {
        throw new Error("Fullscreen API indisponible");
      }
    } catch {
      els.stage.classList.add("is-emulated-fullscreen");
      document.body.classList.add("axis-rotor-lock");
    }

    resizeCanvas();
  }

  async function exitFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {}

    els.stage.classList.remove("is-emulated-fullscreen");
    document.body.classList.remove("axis-rotor-lock");
    resizeCanvas();
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getCanvasSize() {
    const rect = canvas.getBoundingClientRect();
    return {
      w: rect.width,
      h: rect.height
    };
  }

  function drawBackground(w, h, time) {
    const cx = w / 2;
    const cy = h / 2;

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.74);
    bg.addColorStop(0, "#091526");
    bg.addColorStop(0.36, "#040a15");
    bg.addColorStop(1, "#010309");

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = "rgba(232, 205, 139, 0.22)";
    ctx.lineWidth = 1;

    const rings = 8;
    const maxR = Math.min(w, h) * 0.49;

    for (let i = 1; i <= rings; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (maxR / rings) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.14;
    for (let i = 0; i < 32; i++) {
      const a = (Math.PI * 2 * i) / 32 + time * 0.000018;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
      ctx.stroke();
    }

    ctx.restore();

    for (let i = 0; i < 95; i++) {
      const x = (i * 97.13) % w;
      const y = (i * 53.77) % h;
      const pulse = 0.24 + Math.sin(time * 0.001 + i) * 0.16;
      ctx.fillStyle = `rgba(246, 236, 215, ${Math.max(0.04, pulse)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  function drawLight(cx, cy, radius, intensity = 1) {
    ctx.save();

    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.9);
    glow.addColorStop(0, `rgba(255, 244, 197, ${0.96 * intensity})`);
    glow.addColorStop(0.14, `rgba(255, 217, 120, ${0.58 * intensity})`);
    glow.addColorStop(0.42, `rgba(123, 188, 255, ${0.20 * intensity})`);
    glow.addColorStop(1, "rgba(255, 232, 150, 0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 2.9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 217, 120, ${0.68 * intensity})`;
    ctx.lineWidth = 1.5;

    for (let i = 1; i <= 4; i++) {
      ctx.globalAlpha = 0.14 + i * 0.09;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * (0.62 + i * 0.34), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff5c8";
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.36, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function selectedObjectImage() {
    return state.images.objects[state.object] || null;
  }

  function drawImageContained(img, x, y, size, rotation = 0) {
    if (!img) {
      drawFallbackObject(x, y, size, rotation);
      return;
    }

    const ratio = Math.min(size / img.width, size / img.height);
    const dw = img.width * ratio;
    const dh = img.height * ratio;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  }

  function drawFallbackObject(x, y, size, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.strokeStyle = "rgba(255, 217, 120, 0.92)";
    ctx.fillStyle = "rgba(123, 188, 255, 0.12)";
    ctx.lineWidth = Math.max(2, size * 0.035);

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = -Math.PI / 2 + (Math.PI * 2 * i) / 6;
      const px = Math.cos(a) * size * 0.42;
      const py = Math.sin(a) * size * 0.42;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 245, 200, 0.92)";
    ctx.fill();

    ctx.restore();
  }

  function drawObjectHalo(x, y, size) {
    ctx.save();

    const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 0.95);
    glow.addColorStop(0, "rgba(255, 232, 150, 0.30)");
    glow.addColorStop(0.5, "rgba(123, 188, 255, 0.14)");
    glow.addColorStop(1, "rgba(255, 232, 150, 0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.95, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 217, 120, 0.62)";
    ctx.lineWidth = Math.max(1, size * 0.018);
    ctx.beginPath();
    ctx.arc(x, y, size * 0.54, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawObjectPhase(w, h, time) {
    const cx = w / 2;
    const cy = h / 2;
    const size = Math.min(w, h) * 0.34;
    const pulse = 1 + Math.sin(time * 0.002) * 0.025;

    drawObjectHalo(cx, cy, size * 1.12);
    drawImageContained(selectedObjectImage(), cx, cy, size * pulse, 0);

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(246, 236, 215, 0.68)";
    ctx.font = "500 16px Inter, system-ui, sans-serif";
    ctx.fillText("Objet seul — 30 secondes", cx, Math.min(h - 44, cy + size * 0.72));
    ctx.restore();
  }

  function drawLightPhase(w, h, time) {
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.12;
    const pulse = 0.9 + Math.sin(time * 0.004) * 0.08;

    drawLight(cx, cy, radius * pulse, 1.12);

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(246, 236, 215, 0.70)";
    ctx.font = "500 16px Inter, system-ui, sans-serif";
    ctx.fillText("Observation lumineuse — 30 secondes", cx, Math.min(h - 44, cy + radius * 2.7));
    ctx.restore();
  }

  function drawFallbackRotor(cx, cy, rotorRadius, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const bladeCount = 4;

    for (let i = 0; i < bladeCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / bladeCount);

      const grad = ctx.createLinearGradient(0, 0, 0, -rotorRadius);
      grad.addColorStop(0, "rgba(255, 217, 120, 0.10)");
      grad.addColorStop(0.45, "rgba(123, 188, 255, 0.22)");
      grad.addColorStop(1, "rgba(255, 217, 120, 0.58)");

      ctx.fillStyle = grad;
      ctx.strokeStyle = "rgba(255, 217, 120, 0.46)";
      ctx.lineWidth = Math.max(1.5, rotorRadius * 0.006);

      ctx.beginPath();
      ctx.moveTo(0, -rotorRadius * 0.08);
      ctx.quadraticCurveTo(rotorRadius * 0.16, -rotorRadius * 0.46, rotorRadius * 0.07, -rotorRadius);
      ctx.quadraticCurveTo(0, -rotorRadius * 0.86, -rotorRadius * 0.07, -rotorRadius);
      ctx.quadraticCurveTo(-rotorRadius * 0.16, -rotorRadius * 0.46, 0, -rotorRadius * 0.08);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    ctx.strokeStyle = "rgba(123, 188, 255, 0.38)";
    ctx.lineWidth = Math.max(2, rotorRadius * 0.008);
    ctx.beginPath();
    ctx.arc(0, 0, rotorRadius * 0.98, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawRotorImage(cx, cy, rotorRadius, angle) {
    const img = state.images.models[state.model];

    if (!img) {
      drawFallbackRotor(cx, cy, rotorRadius, angle);
      return;
    }

    const size = rotorRadius * 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.globalAlpha = 0.96;
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  function drawRotationPhase(w, h) {
    const cx = w / 2;
    const cy = h / 2;
    const shortSide = Math.min(w, h);
    const sizeFactor = clamp(state.sizePercent / 100, 0.68, 0.96);
    const objectBaseSize = Math.max(54, shortSide * 0.105);
    const maxRotorRadius = shortSide * 0.5 - objectBaseSize * 0.55 - 10;
    const rotorRadius = clamp(shortSide * 0.5 * sizeFactor, shortSide * 0.28, maxRotorRadius);

    const bladeOffset = -Math.PI / 2;
    const objectOrbit = rotorRadius * 0.86;
    const objectAngle = state.rotationAngle + bladeOffset;
    const objectX = cx + Math.cos(objectAngle) * objectOrbit;
    const objectY = cy + Math.sin(objectAngle) * objectOrbit;
    const objectSize = clamp(rotorRadius * 0.22, 54, shortSide * 0.15);

    ctx.save();
    ctx.globalAlpha = 0.36;
    ctx.strokeStyle = "rgba(232, 205, 139, 0.52)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, objectOrbit, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    drawRotorImage(cx, cy, rotorRadius, state.rotationAngle);
    drawLight(cx, cy, Math.max(34, rotorRadius * 0.09), 0.96);

    ctx.save();
    ctx.strokeStyle = "rgba(255, 217, 120, 0.46)";
    ctx.lineWidth = Math.max(1, rotorRadius * 0.006);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(objectX, objectY);
    ctx.stroke();
    ctx.restore();

    drawObjectHalo(objectX, objectY, objectSize * 1.15);
    drawImageContained(selectedObjectImage(), objectX, objectY, objectSize, objectAngle + Math.PI / 2);
  }

  function drawReturnPhase(w, h, time) {
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.08;
    drawLight(cx, cy, radius, 0.72);

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(246, 236, 215, 0.84)";
    ctx.font = "600 24px Georgia, serif";
    ctx.fillText("Retour au calme", cx, cy + radius * 2.5);
    ctx.fillStyle = "rgba(174, 185, 204, 0.82)";
    ctx.font = "500 15px Inter, system-ui, sans-serif";
    ctx.fillText("Respirez doucement.", cx, cy + radius * 2.5 + 32);
    ctx.restore();
  }

  function drawDonePhase(w, h, time) {
    const cx = w / 2;
    const cy = h / 2;

    drawLight(cx, cy, Math.min(w, h) * 0.095, 0.82);

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(246, 236, 215, 0.9)";
    ctx.font = "600 26px Georgia, serif";
    ctx.fillText("Fin de l’exercice", cx, cy + Math.min(w, h) * 0.20);

    ctx.fillStyle = "rgba(174, 185, 204, 0.82)";
    ctx.font = "500 15px Inter, system-ui, sans-serif";
    ctx.fillText("Revenez doucement.", cx, cy + Math.min(w, h) * 0.20 + 34);
    ctx.restore();
  }

  function animationLoop(time) {
    resizeCanvas();

    const { w, h } = getCanvasSize();
    const dt = Math.min(0.05, Math.max(0, (time - state.lastFrameAt) / 1000));
    state.lastFrameAt = time;

    const shouldRotate =
      !state.paused &&
      (state.phase === "idle" || state.phase === "generated" || state.phase === "rotation");

    if (shouldRotate) {
      const direction = state.direction === "clockwise" ? 1 : -1;
      const angularVelocity = 0.25 + state.speed * 0.16;
      state.rotationAngle += dt * angularVelocity * direction;
    }

    drawBackground(w, h, time);

    if (state.phase === "object") {
      drawObjectPhase(w, h, time);
    } else if (state.phase === "light") {
      drawLightPhase(w, h, time);
    } else if (state.phase === "rotation" || state.phase === "idle" || state.phase === "generated") {
      drawRotationPhase(w, h);
    } else if (state.phase === "return") {
      drawReturnPhase(w, h, time);
    } else if (state.phase === "done") {
      drawDonePhase(w, h, time);
    }

    nextPhaseIfNeeded();
    updateHud();

    requestAnimationFrame(animationLoop);
  }

  function bindEvents() {
    [
      els.model,
      els.object,
      els.direction,
      els.duration,
      els.speed,
      els.size,
      els.voiceToggle,
      els.bellToggle,
      els.voiceSelect,
      els.voiceRate,
      els.voiceVolume,
      els.musicSelect,
      els.musicVolume
    ].forEach((el) => {
      el.addEventListener("input", syncFromInputs);
      el.addEventListener("change", syncFromInputs);
    });

    els.generate.addEventListener("click", buildTimeline);
    els.start.addEventListener("click", startSession);
    els.fullscreen.addEventListener("click", enterFullscreen);
    els.pause.addEventListener("click", pauseSession);
    els.resume.addEventListener("click", resumeSession);
    els.stop.addEventListener("click", stopSession);
    els.testVoice.addEventListener("click", testVoice);

    els.fsPause.addEventListener("click", pauseSession);
    els.fsResume.addEventListener("click", resumeSession);
    els.fsExit.addEventListener("click", exitFullscreen);

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        els.stage.classList.remove("is-emulated-fullscreen");
        document.body.classList.remove("axis-rotor-lock");
      }
      resizeCanvas();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && els.stage.classList.contains("is-emulated-fullscreen")) {
        exitFullscreen();
      }

      if (event.key === " " && state.running) {
        event.preventDefault();
        state.paused ? resumeSession() : pauseSession();
      }

      if (event.key === "Enter" && !state.running) {
        enterFullscreen();
      }
    });

    window.addEventListener("resize", resizeCanvas);

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = refreshVoices;
    }
  }

  async function init() {
    bindEvents();
    populateMusicSelect();
    refreshVoices();
    syncFromInputs();
    buildTimeline();
    await preloadImages();
    resizeCanvas();
    requestAnimationFrame(animationLoop);
  }

  init();
})();
