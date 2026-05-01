(function () {
  "use strict";

  const MAP = window.AXIS_SESSION_VIDEO_MAP || {};
  const AUDIO_TRACKS = Array.isArray(window.AXIS_AUDIO_TRACKS) ? window.AXIS_AUDIO_TRACKS : [];

  const STORAGE_KEYS = [
    "axis_lumen_custom_session",
    "axis_lumen_generated_session",
    "axis_current_session",
    "axis-practice-session"
  ];

  const SWINGS = {
    lateral: {
      label: "Balancement latéral",
      video: () => MAP.swing && MAP.swing.lateral || "",
      guidance: "Balancement gauche / droite, SAT dans un sens, NAM dans l’autre."
    },
    vertical: {
      label: "Balancement vertical",
      video: () => MAP.swing && MAP.swing.vertical || "",
      guidance: "Balancement haut / bas, SAT dans un sens, NAM dans l’autre."
    },
    rotation: {
      label: "Rotation douce",
      video: () => MAP.swing && MAP.swing.rotation || "",
      guidance: "Rotation douce, sans chercher le vertige, en gardant l’axe."
    }
  };

  const BREATHS = {
    square: {
      label: "Respiration carrée",
      patternLabel: "LA · FA · DO · FA",
      segments: base => [
        { title: "Inspiration", duration: base, tone: "LA", guidance: "Inspirez." },
        { title: "Rétention", duration: base, tone: "FA", guidance: "Retenez l’air." },
        { title: "Expiration", duration: base, tone: "DO", guidance: "Expirez." },
        { title: "Rétention", duration: base, tone: "FA", guidance: "Restez vide." }
      ]
    },
    triangular: {
      label: "Respiration triangulaire",
      patternLabel: "LA · FA · DO",
      segments: base => [
        { title: "Inspiration", duration: base, tone: "LA", guidance: "Inspirez." },
        { title: "Rétention", duration: base, tone: "FA", guidance: "Retenez l’air." },
        { title: "Expiration", duration: base, tone: "DO", guidance: "Expirez." }
      ]
    },
    rectangular: {
      label: "Respiration rectangulaire",
      patternLabel: "LA · FA long · DO · FA long",
      segments: base => [
        { title: "Inspiration", duration: base, tone: "LA", guidance: "Inspirez." },
        { title: "Rétention longue", duration: base * 2, tone: "FA", guidance: "Retenez l’air plus longtemps." },
        { title: "Expiration", duration: base, tone: "DO", guidance: "Expirez." },
        { title: "Rétention longue", duration: base * 2, tone: "FA", guidance: "Restez vide plus longtemps." }
      ]
    }
  };

  function $(id) {
    return document.getElementById(id);
  }

  function clamp(value, min, max, fallback) {
    const n = Number(value);
    if (Number.isNaN(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  }

  function formatDuration(seconds) {
    const s = Math.max(0, Math.round(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;

    if (m <= 0) return r + " s";
    if (r === 0) return m + " min";
    return m + " min " + r + " s";
  }

  function audioById(id) {
    return AUDIO_TRACKS.find(track => track.id === id) || null;
  }

  function fillAudioSelect(id, preferredPattern) {
    const select = $(id);
    if (!select) return;

    select.innerHTML = "";

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Aucune piste";
    select.appendChild(empty);

    AUDIO_TRACKS.forEach(track => {
      const option = document.createElement("option");
      option.value = track.id;
      option.textContent = track.name;
      select.appendChild(option);
    });

    if (preferredPattern) {
      const found = AUDIO_TRACKS.find(track => {
        const hay = (track.name + " " + track.url).toLowerCase();
        return hay.includes(preferredPattern.toLowerCase());
      });

      if (found) select.value = found.id;
    }
  }

  function fillVoiceSelect() {
    const select = $("axisVoiceName");
    if (!select || !window.speechSynthesis) return;

    const previous = select.value;

    const voices = window.speechSynthesis.getVoices();
    select.innerHTML = "";

    const auto = document.createElement("option");
    auto.value = "";
    auto.textContent = "Voix française par défaut";
    select.appendChild(auto);

    voices
      .filter(voice => String(voice.lang || "").toLowerCase().startsWith("fr"))
      .concat(voices.filter(voice => !String(voice.lang || "").toLowerCase().startsWith("fr")))
      .forEach(voice => {
        const option = document.createElement("option");
        option.value = voice.name;
        option.textContent = voice.name + " — " + voice.lang;
        select.appendChild(option);
      });

    if (previous) select.value = previous;
  }

  function phase(type, title, duration, video, guidance, extra) {
    return Object.assign({
      type,
      title,
      duration,
      video: video || "",
      guidance: guidance || "",
      voiceStart: guidance || "",
      bellAtEnd: true
    }, extra || {});
  }

  function getAudioConfig() {
    const get = id => audioById($(id).value);

    return {
      detente: get("axisAudioDetente"),
      light: get("axisAudioLight"),
      swing: get("axisAudioSwing"),
      breath: get("axisAudioBreath"),
      final: get("axisAudioFinal")
    };
  }

  function getVoiceConfig() {
    return {
      enabled: $("axisVoiceEnabled").checked,
      voiceName: $("axisVoiceName").value || "",
      rate: clamp($("axisVoiceRate").value, 0.75, 1.35, 0.95),
      volume: clamp($("axisVoiceVolume").value, 0, 1, 0.85),
      bellEnabled: $("axisBellEnabled").checked,
      breathTonesEnabled: $("axisBreathTonesEnabled").checked,
      audioVolume: clamp($("axisAudioVolume").value, 0, 1, 0.32)
    };
  }

  function getConfig() {
    let balanceMin = clamp($("axisBalanceMin").value, 15, 45, 15);
    balanceMin = Math.round(balanceMin / 3) * 3;

    const breathType = $("axisBreathType").value || "square";
    const breathBase = clamp($("axisBreathBase").value, 4, 8, 4);
    const audio = getAudioConfig();

    return {
      relaxationMin: clamp($("axisRelaxMin").value, 1, 5, 2),
      swing: $("axisSwing").value || "lateral",
      balanceMin,
      breathType,
      breathBase,
      breathMin: clamp($("axisBreathMin").value, 5, 15, 5),
      finalType: $("axisFinalType").value || "tension",
      finalMin: clamp($("axisFinalMin").value, 1, 10, 3),
      audio,
      voice: getVoiceConfig()
    };
  }

  function audioExtra(track) {
    return track ? {
      audioTrack: {
        id: track.id,
        name: track.name,
        url: track.url
      }
    } : {
      audioTrack: null
    };
  }

  function buildSession(config) {
    const phases = [];
    const cycles = Math.max(5, Math.round(config.balanceMin / 3));
    const swing = SWINGS[config.swing] || SWINGS.lateral;
    const breath = BREATHS[config.breathType] || BREATHS.square;
    const breathPattern = breath.segments(config.breathBase);
    const breathPatternDuration = breathPattern.reduce((sum, item) => sum + item.duration, 0);

    phases.push(phase(
      "detente",
      "Détente initiale",
      config.relaxationMin * 60,
      MAP.detente || "",
      "Début de séance. Installez-vous confortablement. Relâchez les épaules, la mâchoire et le ventre.",
      audioExtra(config.audio.detente)
    ));

    for (let i = 0; i < cycles; i += 1) {
      phases.push(phase(
        "lumiere",
        "Observation lumineuse",
        30,
        MAP.light || "",
        "Allumez la lumière. Regardez la source lumineuse pendant trente secondes.",
        audioExtra(config.audio.light)
      ));

      phases.push(phase(
        "balancement",
        swing.label + " — cycle " + (i + 1) + "/" + cycles,
        180,
        swing.video(),
        "Éteignez la lumière. Commencez les balancements.",
        Object.assign(audioExtra(config.audio.swing), {
          swing: config.swing,
          mantra: "SAT / NAM",
          segments: [
            {
              from: 0,
              to: 60,
              title: "Grand mouvement",
              mantra: "SAT à l’aller · NAM au retour",
              voice: "Grand mouvement. Récitez le mantra à voix haute. SAT dans un sens, NAM dans l’autre.",
              guidance: "Récite à voix haute : SAT dans un sens, NAM dans l’autre."
            },
            {
              from: 60,
              to: 120,
              title: "Petit balancement",
              mantra: "SAT / NAM en pensée",
              voice: "Petit balancement. Le mantra continue en pensée.",
              guidance: "Réduis le mouvement. Le mantra continue intérieurement."
            },
            {
              from: 120,
              to: 180,
              title: "Grand mouvement",
              mantra: "SAT à l’aller · NAM au retour",
              voice: "Reprenez le grand mouvement. SAT dans un sens, NAM dans l’autre.",
              guidance: "Reprends le grand mouvement. Le mantra revient à voix haute."
            }
          ]
        })
      ));
    }

    phases.push(phase(
      "respiration",
      breath.label,
      config.breathMin * 60,
      MAP.breath || "",
      "Commencez la " + breath.label.toLowerCase() + ". Suivez les tonalités : LA pour inspirer, FA pour retenir, DO pour expirer.",
      Object.assign(audioExtra(config.audio.breath), {
        breathType: config.breathType,
        breathBase: config.breathBase,
        breathPattern,
        breathPatternDuration
      })
    ));

    if (config.finalType === "rotor") {
      phases.push(phase(
        "final",
        "Rotation gyroscopique",
        config.finalMin * 60,
        MAP.final && MAP.final.rotor || "",
        "Préparez le final. Fixez le centre. Laissez la rotation agir autour de l’axe intérieur.",
        audioExtra(config.audio.final)
      ));
    } else {
      phases.push(phase(
        "final",
        "Tension statique",
        config.finalMin * 60,
        MAP.final && MAP.final.tension || "",
        "Préparez les tensions statiques. Contractez, maintenez, relâchez, puis revivez le geste mentalement.",
        audioExtra(config.audio.final)
      ));
    }

    const totalSeconds = phases.reduce((sum, item) => sum + item.duration, 0);

    return {
      id: "axis-video-session-" + Date.now(),
      engine: "axis-video-session-audio-voice-v3",
      createdAt: new Date().toISOString(),
      config,
      voice: config.voice,
      phases,
      totalSeconds,
      totalLabel: formatDuration(totalSeconds),
      maxSeconds: 3600
    };
  }

  function compactPreview(session) {
    const cfg = session.config;
    const cycles = Math.round(cfg.balanceMin / 3);
    const swing = SWINGS[cfg.swing] || SWINGS.lateral;
    const breath = BREATHS[cfg.breathType] || BREATHS.square;
    const finalLabel = cfg.finalType === "rotor" ? "Rotation gyroscopique" : "Tension statique";

    return [
      {
        title: "Détente initiale",
        time: formatDuration(cfg.relaxationMin * 60),
        detail: "Vidéo muette + voix d’accueil + piste : " + (cfg.audio.detente ? cfg.audio.detente.name : "aucune")
      },
      {
        title: "Balancement + lumière",
        time: formatDuration(cfg.balanceMin * 60 + cycles * 30),
        detail: cycles + " cycles. Vidéos muettes + voix synchronisée + piste : " + (cfg.audio.swing ? cfg.audio.swing.name : "aucune")
      },
      {
        title: breath.label,
        time: formatDuration(cfg.breathMin * 60),
        detail: breath.patternLabel + " · piste : " + (cfg.audio.breath ? cfg.audio.breath.name : "aucune")
      },
      {
        title: finalLabel,
        time: formatDuration(cfg.finalMin * 60),
        detail: "Vidéo muette + voix finale + piste : " + (cfg.audio.final ? cfg.audio.final.name : "aucune")
      }
    ];
  }

  function renderPreview() {
    const session = buildSession(getConfig());
    const list = $("axisCompactPreview");
    const total = $("axisTotal");
    const msg = $("axisMessage");
    const save = $("axisSave");
    const open = $("axisOpenPractice");

    list.innerHTML = "";

    compactPreview(session).forEach(item => {
      const node = document.createElement("article");
      node.className = "session-preview-item";
      node.innerHTML = `
        <strong>${item.title}</strong>
        <span>${item.time}</span>
        <small>${item.detail}</small>
      `;
      list.appendChild(node);
    });

    total.textContent = session.totalLabel;

    if (session.totalSeconds > 3600) {
      msg.textContent = "La séance dépasse 1 heure. Réduis la durée du balancement, de la respiration ou du final.";
      msg.classList.add("bad");
      save.disabled = true;
      open.disabled = true;
    } else {
      msg.textContent = "Séance valide. Les vidéos seront muettes ; la voix, la cloche et les pistes audio accompagneront la pratique.";
      msg.classList.remove("bad");
      save.disabled = false;
      open.disabled = false;
    }

    return session;
  }

  function saveSession() {
    const session = renderPreview();

    if (session.totalSeconds > 3600) return null;

    STORAGE_KEYS.forEach(key => {
      localStorage.setItem(key, JSON.stringify(session));
    });

    $("axisMessage").textContent = "Séance générée. Elle est prête dans l’onglet Pratiquer.";
    $("axisMessage").classList.remove("bad");

    return session;
  }

  function bind() {
    [
      "axisRelaxMin",
      "axisSwing",
      "axisBalanceMin",
      "axisBreathType",
      "axisBreathBase",
      "axisBreathMin",
      "axisFinalType",
      "axisFinalMin",
      "axisVoiceEnabled",
      "axisVoiceName",
      "axisVoiceRate",
      "axisVoiceVolume",
      "axisBellEnabled",
      "axisBreathTonesEnabled",
      "axisAudioVolume",
      "axisAudioDetente",
      "axisAudioLight",
      "axisAudioSwing",
      "axisAudioBreath",
      "axisAudioFinal"
    ].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("input", renderPreview);
      el.addEventListener("change", renderPreview);
    });

    $("axisSave").addEventListener("click", () => {
      saveSession();
    });

    $("axisOpenPractice").addEventListener("click", () => {
      const session = saveSession();
      if (session) {
        window.location.href = "pratiquer.html?session=video";
      }
    });

    $("axisTestVoice").addEventListener("click", () => {
      const session = buildSession(getConfig());
      const voice = session.voice;

      if (!window.speechSynthesis || !voice.enabled) return;

      const utter = new SpeechSynthesisUtterance("Ceci est la voix de guidage Axis Lumen.");
      utter.lang = "fr-FR";
      utter.rate = voice.rate;
      utter.volume = voice.volume;

      const voices = window.speechSynthesis.getVoices();
      const selected = voices.find(v => v.name === voice.voiceName);

      if (selected) utter.voice = selected;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    });
  }

  function init() {
    fillAudioSelect("axisAudioDetente", "detente");
    fillAudioSelect("axisAudioLight", "lumiere");
    fillAudioSelect("axisAudioSwing", "rythme");
    fillAudioSelect("axisAudioBreath", "respiration");
    fillAudioSelect("axisAudioFinal", "mantra");

    fillVoiceSelect();

    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = fillVoiceSelect;
    }

    bind();
    renderPreview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();