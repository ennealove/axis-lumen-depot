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
      guidance: "Balancement gauche / droite. Mantra ILLI — langue contre le palais.",
      mantra: "ILLI",
      defaultBpm: 60,
      voiceGrand: "Commencez le grand balancement latéral. Imaginez l'objet traverser votre crâne de tempe à tempe, de gauche à droite, en rythme avec votre mouvement.",
      voicePetit: "Réduisez l'amplitude. Le petit balancement maintenant. L'objet reste à l'intérieur du crâne, confiné dans l'espace intérieur.",
      voiceReprise: "Reprenez le grand balancement latéral.",
      direction: "tempe à tempe"
    },
    vertical: {
      label: "Balancement vertical",
      video: () => MAP.swing && MAP.swing.vertical || "",
      guidance: "Balancement haut / bas. Mantra ALLA — axe et verticalité intérieure.",
      mantra: "ALLA",
      defaultBpm: 60,
      voiceGrand: "Commencez le grand balancement vertical. Imaginez l'objet traverser votre crâne du menton vers le sommet de la tête.",
      voicePetit: "Réduisez l'amplitude. Le petit balancement maintenant. L'objet reste à l'intérieur du crâne, confiné dans l'espace intérieur.",
      voiceReprise: "Reprenez le grand balancement vertical.",
      direction: "du menton vers le sommet"
    },
    rotation: {
      label: "Rotation douce",
      video: () => MAP.swing && MAP.swing.rotation || "",
      guidance: "Rotation douce circulaire. Mantra ELLU — gyroscope intérieur, équilibre profond.",
      mantra: "ELLU",
      defaultBpm: 40,
      voiceGrand: "Commencez la rotation douce. Laissez la tête tracer un cercle lent et régulier. Mantra ELLU. Imaginez l'objet tourner à l'intérieur du crâne selon la même orbite circulaire.",
      voicePetit: "Réduisez l'amplitude. La rotation se fait en pensée. L'objet continue de tourner intérieurement.",
      voiceReprise: "Reprenez la rotation. ELLU, en cercle régulier.",
      direction: "circulaire"
    },
    ap: {
      label: "Antéro-postérieur — Fer à cheval",
      video: () => MAP.swing && MAP.swing.ap || "",
      guidance: "Balancement avant / arrière — Fer à cheval. Mantra ELLU. Rythme lent, ample, du front vers la nuque.",
      mantra: "ELLU",
      defaultBpm: 45,
      voiceGrand: "Commencez le grand balancement avant-arrière. Ce mouvement est plus lent et plus ample que le latéral. Laissez le buste accompagner la tête, comme un fer à cheval qui oscille. Mantra ELLU. Imaginez l'objet traverser votre crâne du front vers la nuque à chaque oscillation.",
      voicePetit: "Réduisez l'amplitude. Le petit balancement avant-arrière. L'objet continue du front vers la nuque, en pensée.",
      voiceReprise: "Reprenez le grand balancement avant-arrière. ELLU, lentement, du front vers la nuque.",
      direction: "du front vers la nuque"
    },
    huit: {
      label: "En huit — Figure de huit",
      video: () => "",
      guidance: "Balancement en figure de huit. Combine latéral et antéro-postérieur dans un mouvement continu sans point d'arrêt.",
      mantra: "ILLI · ELLU",
      defaultBpm: 40,
      voiceGrand: "Commencez le balancement en figure de huit. Tracez un huit horizontal avec la tête — de gauche à droite en passant par l'avant, sans jamais vous arrêter. Mantra ILLI pour la phase latérale, ELLU pour la phase avant-arrière. Le mouvement est continu, fluide, sans rupture.",
      voicePetit: "Réduisez l'amplitude. Continuez le huit en pensée. ILLI, ELLU, en boucle intérieure.",
      voiceReprise: "Reprenez la figure de huit. ILLI, ELLU, en fluidité continue.",
      direction: "en huit horizontal"
    },
    croix: {
      label: "En croix — Latéral + Vertical",
      video: () => "",
      guidance: "Balancement en croix. Alterne latéral ILLI et vertical ALLA selon un rythme régulier.",
      mantra: "ILLI / ALLA",
      defaultBpm: 55,
      voiceGrand: "Commencez le balancement en croix. Alternez le mouvement latéral gauche-droite — mantra ILLI — puis le mouvement vertical haut-bas — mantra ALLA. ILLI, ALLA, ILLI, ALLA. Régulier, rythmé. Imaginez la croix que trace l'objet à l'intérieur du crâne.",
      voicePetit: "Réduisez. La croix en pensée. ILLI puis ALLA, intérieurement.",
      voiceReprise: "Reprenez le balancement en croix. ILLI, ALLA, en alternance.",
      direction: "en croix latérale et verticale"
    }
  };

  const BREATHS = {
    square: {
      label: "Respiration carrée (4 temps égaux)",
      patternLabel: "LA · FA · DO · FA",
      hint: "4 phases égales. Inspir · Rétention · Expir · Vide. Idéale pour stabiliser.",
      segments: base => [
        { title: "Inspiration",  duration: base,     tone: "LA", guidance: "Inspirez." },
        { title: "Rétention",    duration: base,     tone: "FA", guidance: "Retenez l'air." },
        { title: "Expiration",   duration: base,     tone: "DO", guidance: "Expirez." },
        { title: "Rétention",    duration: base,     tone: "FA", guidance: "Restez vide." }
      ]
    },
    triangular: {
      label: "Respiration triangulaire (3 temps)",
      patternLabel: "LA · FA · DO",
      hint: "3 phases. Inspir · Rétention · Expir. Dynamique, éveillante.",
      segments: base => [
        { title: "Inspiration", duration: base, tone: "LA", guidance: "Inspirez." },
        { title: "Rétention",   duration: base, tone: "FA", guidance: "Retenez l'air." },
        { title: "Expiration",  duration: base, tone: "DO", guidance: "Expirez." }
      ]
    },
    rectangular: {
      label: "Respiration rectangulaire (rétentions longues)",
      patternLabel: "LA · FA×2 · DO · FA×2",
      hint: "Rétentions 2× plus longues que l'inspir. Approfondissement de l'oxygénation.",
      segments: base => [
        { title: "Inspiration",       duration: base,     tone: "LA", guidance: "Inspirez." },
        { title: "Rétention longue",  duration: base * 2, tone: "FA", guidance: "Retenez l'air plus longtemps." },
        { title: "Expiration",        duration: base,     tone: "DO", guidance: "Expirez." },
        { title: "Rétention longue",  duration: base * 2, tone: "FA", guidance: "Restez vide plus longtemps." }
      ]
    },
    depurative: {
      label: "Respiration dépurative (expiration ×3)",
      patternLabel: "LA court · DO ×3",
      hint: "Inspiration courte, expiration très longue. Nettoyage des émonctoires pulmonaires.",
      segments: base => [
        { title: "Inspiration rapide",  duration: base,     tone: "LA", guidance: "Inspirez rapidement et complètement par le nez." },
        { title: "Expiration longue",   duration: base * 3, tone: "DO", guidance: "Expirez lentement, lentement, jusqu'au bout. Videz complètement les poumons." }
      ]
    },
    coherence: {
      label: "Cohérence cardiaque (5-5 fixe)",
      patternLabel: "LA 5s · DO 5s",
      hint: "6 respirations par minute. Synchronise cœur et cerveau. Rythme fixe indépendant de la mesure.",
      segments: () => [
        { title: "Inspiration douce",  duration: 5, tone: "LA", guidance: "Inspirez doucement par le nez sur 5 secondes." },
        { title: "Expiration douce",   duration: 5, tone: "DO", guidance: "Expirez doucement par la bouche sur 5 secondes." }
      ]
    },
    yoga478: {
      label: "Yogique 4-7-8",
      patternLabel: "LA 4s · FA 7s · DO 8s",
      hint: "Technique du Dr Weil. Apaise le système nerveux, favorise le sommeil et le seuil hypnagogique.",
      segments: () => [
        { title: "Inspiration",        duration: 4, tone: "LA", guidance: "Inspirez par le nez, 4 secondes." },
        { title: "Rétention",          duration: 7, tone: "FA", guidance: "Retenez l'air, 7 secondes. Ne forcez pas." },
        { title: "Expiration lente",   duration: 8, tone: "DO", guidance: "Expirez lentement par la bouche, 8 secondes." }
      ]
    },
    complete: {
      label: "Respiration complète en 3 temps",
      patternLabel: "LA abdomen · LA thorax · LA clavicules · DO",
      hint: "Remplit abdomen → thorax → clavicules à l'inspir, vide dans le sens inverse à l'expir.",
      segments: base => [
        { title: "Inspiration abdominale",   duration: Math.round(base * 0.5), tone: "LA", guidance: "Inspirez d'abord le ventre — laissez l'abdomen se gonfler." },
        { title: "Inspiration thoracique",   duration: Math.round(base * 0.3), tone: "LA", guidance: "Continuez — ouvrez le thorax, les côtes s'écartent." },
        { title: "Inspiration claviculaire", duration: Math.round(base * 0.2), tone: "LA", guidance: "Terminez — montez vers les clavicules." },
        { title: "Rétention courte",         duration: Math.round(base * 0.3), tone: "FA", guidance: "Retenez un instant." },
        { title: "Expiration complète",      duration: base * 2,               tone: "DO", guidance: "Expirez de bas en haut — ventre, thorax, clavicules. Lentement." }
      ]
    },
    triangulaire_inv: {
      label: "Triangulaire inversée (expir longue)",
      patternLabel: "LA · DO×2 · FA",
      hint: "Inspiration courte, expiration double. Calme, parasympathique, avant le sommeil.",
      segments: base => [
        { title: "Inspiration",        duration: base,     tone: "LA", guidance: "Inspirez." },
        { title: "Expiration longue",  duration: base * 2, tone: "DO", guidance: "Expirez doucement, deux fois plus long que l'inspir." },
        { title: "Vide",               duration: base,     tone: "FA", guidance: "Restez vide, dans la douceur." }
      ]
    }
  };

  const AXIS_OBJECTS = [
    // ── Carrés ──────────────────────────────────────────────────
    { id: "carre-bleu",    label: "Carré bleu",    file: "carré/bleu.png"    },
    { id: "carre-rouge",   label: "Carré rouge",   file: "carré/rouge.png"   },
    { id: "carre-vert",    label: "Carré vert",    file: "carré/vert.png"    },
    { id: "carre-jaune",   label: "Carré jaune",   file: "carré/jaune.png"   },
    { id: "carre-violet",  label: "Carré violet",  file: "carré/violet.png"  },
    // ── Rectangles ──────────────────────────────────────────────
    { id: "rect-bleu",     label: "Rectangle bleu",    file: "rectangle/bleu.png"    },
    { id: "rect-rouge",    label: "Rectangle rouge",   file: "rectangle/rouge.png"   },
    { id: "rect-vert",     label: "Rectangle vert",    file: "rectangle/vert.png"    },
    { id: "rect-orange",   label: "Rectangle orange",  file: "rectangle/orange.png"  },
    { id: "rect-jaune",    label: "Rectangle jaune",   file: "rectangle/jaune.png"   },
    { id: "rect-violet",   label: "Rectangle violet",  file: "rectangle/violet.png"  },
    // ── Triangles ───────────────────────────────────────────────
    { id: "tri-bleu",      label: "Triangle bleu",     file: "triangle/bleu.png"     },
    { id: "tri-rouge",     label: "Triangle rouge",    file: "triangle/rouge.png"    },
    { id: "tri-vert",      label: "Triangle vert",     file: "triangle/vert.png"     },
    { id: "tri-orange",    label: "Triangle orange",   file: "triangle/orange.png"   },
    { id: "tri-jaune",     label: "Triangle jaune",    file: "triangle/jaune.png"    },
    { id: "tri-violet",    label: "Triangle violet",   file: "triangle/violet.png"   },
    // ── Cercles ─────────────────────────────────────────────────
    { id: "cerc-bleu",     label: "Cercle bleu",    file: "cercles/bleu.png"    },
    { id: "cerc-vert",     label: "Cercle vert",    file: "cercles/vert.png"    },
    { id: "cerc-orange",   label: "Cercle orange",  file: "cercles/orange.png"  },
    { id: "cerc-jaune",    label: "Cercle jaune",   file: "cercles/jaune.png"   },
    { id: "cerc-violet",   label: "Cercle violet",  file: "cercles/violet.png"  },
    // ── Objets 3D ───────────────────────────────────────────────
    { id: "3d-sphere",     label: "Sphère bleue",      file: "objet 3D/sphère bleu.png"     },
    { id: "3d-cube",       label: "Cube rouge",         file: "objet 3D/cube rouge.png"      },
    { id: "3d-cylindre",   label: "Cylindre vert",      file: "objet 3D/cylindre vert.png"   },
    { id: "3d-cone",       label: "Cône orange",        file: "objet 3D/cone orange.png"     },
    { id: "3d-etoile",     label: "Étoile jaune",       file: "objet 3D/etoile jaune.png"    },
    { id: "3d-pyramide",   label: "Pyramide violette",  file: "objet 3D/pyramide violet.png" },
    // ── Tulipes ─────────────────────────────────────────────────
    { id: "tulipe-bleu",   label: "Tulipe bleue",    file: "fleurs/tulipes/bleu.png"    },
    { id: "tulipe-rouge",  label: "Tulipe rouge",    file: "fleurs/tulipes/rouge.png"   },
    { id: "tulipe-vert",   label: "Tulipe verte",    file: "fleurs/tulipes/verte.png"   },
    { id: "tulipe-orange", label: "Tulipe orange",   file: "fleurs/tulipes/orange.png"  },
    { id: "tulipe-jaune",  label: "Tulipe jaune",    file: "fleurs/tulipes/jaune.png"   },
    { id: "tulipe-violet", label: "Tulipe violette", file: "fleurs/tulipes/violet.png"  },
    // ── Roses ───────────────────────────────────────────────────
    { id: "rose-blanche",  label: "Rose blanche", file: "fleurs/rose/rose blanche.png" },
    { id: "rose-bleu",     label: "Rose bleue",   file: "fleurs/rose/rose bleu.png"    },
    { id: "rose-jaune",    label: "Rose jaune",   file: "fleurs/rose/rose jaune.png"   },
    { id: "rose-noir",     label: "Rose noire",   file: "fleurs/rose/rose noir.png"    },
    { id: "rose-rose",     label: "Rose rose",    file: "fleurs/rose/rose rose.png"    },
    { id: "rose-rouge",    label: "Rose rouge",   file: "fleurs/rose/rose rouge.png"   },
    // ── Arbres ──────────────────────────────────────────────────
    { id: "arbre",          label: "Arbre",                      file: "fleurs/arbre/arbre.png"              },
    { id: "arbre-personne", label: "Personnage devant un arbre", file: "fleurs/arbre/arbre plus personne.png" }
  ];

  const AXIS_OBJECTS_PATH = "assets/images/images objet/";
  const AXIS_BANDEAU_IMG  = "assets/images/objet/personnage avec bandeau sur les yeux.png";

  // ─── Helpers ────────────────────────────────────────────────────

  function $(id) { return document.getElementById(id); }

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
    return AUDIO_TRACKS.find(t => t.id === id) || null;
  }

  // Retourne { id, label, url } pour l'objet actuellement sélectionné
  function getObjectData() {
    const select = $("axisSelectedObject");
    if (!select) {
      const obj = AXIS_OBJECTS[0];
      return { id: obj.id, label: obj.label, url: AXIS_OBJECTS_PATH + obj.file };
    }
    const opt = select.options[select.selectedIndex];
    if (opt && opt.dataset.customUrl) {
      return {
        id:    select.value,
        label: opt.dataset.customLabel || select.value,
        url:   opt.dataset.customUrl
      };
    }
    const obj = AXIS_OBJECTS.find(o => o.id === select.value) || AXIS_OBJECTS[0];
    return { id: obj.id, label: obj.label, url: AXIS_OBJECTS_PATH + obj.file };
  }

  // ─── Selects audio ──────────────────────────────────────────────

  function fillAudioSelect(id, preferredPattern) {
    const select = $(id);
    if (!select) return;
    select.innerHTML = "";

    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Aucune piste";
    select.appendChild(empty);

    AUDIO_TRACKS.forEach(track => {
      const opt = document.createElement("option");
      opt.value = track.id;
      opt.textContent = track.name;
      select.appendChild(opt);
    });

    if (preferredPattern) {
      const found = AUDIO_TRACKS.find(t =>
        (t.name + " " + t.url).toLowerCase().includes(preferredPattern.toLowerCase())
      );
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
      .filter(v => String(v.lang || "").toLowerCase().startsWith("fr"))
      .concat(voices.filter(v => !String(v.lang || "").toLowerCase().startsWith("fr")))
      .forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.name;
        opt.textContent = v.name + " — " + v.lang;
        select.appendChild(opt);
      });

    if (previous) select.value = previous;
  }

  // ─── Config ─────────────────────────────────────────────────────

  function getAudioConfig() {
    const get = id => audioById($(id) ? $(id).value : "");
    return {
      detente: get("axisAudioDetente"),
      light:   get("axisAudioLight"),
      swing:   get("axisAudioSwing"),
      breath:  get("axisAudioBreath"),
      final:   get("axisAudioFinal")
    };
  }

  function getVoiceConfig() {
    return {
      enabled:             $("axisVoiceEnabled") ? $("axisVoiceEnabled").checked : true,
      voiceName:           $("axisVoiceName")    ? $("axisVoiceName").value : "",
      rate:                clamp($("axisVoiceRate")   ? $("axisVoiceRate").value   : 0.95, 0.75, 1.35, 0.95),
      volume:              clamp($("axisVoiceVolume") ? $("axisVoiceVolume").value : 0.85, 0, 1, 0.85),
      bellEnabled:         $("axisBellEnabled")       ? $("axisBellEnabled").checked       : true,
      breathTonesEnabled:  $("axisBreathTonesEnabled")? $("axisBreathTonesEnabled").checked: true,
      audioVolume:         clamp($("axisAudioVolume") ? $("axisAudioVolume").value : 0.32, 0, 1, 0.32)
    };
  }

  function getMetroConfig() {
    const modeEl   = $("axisMetroMode");
    const bpmEl    = $("axisMetroBpm");
    const volEl    = $("axisMetroVol");
    return {
      mode:   modeEl   ? (modeEl.value || "off")               : "off",
      bpm:    clamp(bpmEl   ? bpmEl.value   : 60, 20, 120, 60),
      volume: clamp(volEl   ? volEl.value   : 0.20, 0.05, 1.0, 0.20)
    };
  }

  function getConfig() {
    let balanceMin = clamp($("axisBalanceMin") ? $("axisBalanceMin").value : 15, 3, 45, 15);
    balanceMin = Math.round(balanceMin / 3) * 3;

    const obj   = getObjectData();
    const audio = getAudioConfig();
    const swing = $("axisSwing") ? ($("axisSwing").value || "lateral") : "lateral";

    return {
      relaxationMin:       clamp($("axisRelaxMin")   ? $("axisRelaxMin").value   : 2, 1, 5, 2),
      selectedObject:      obj.id,
      selectedObjectLabel: obj.label,
      selectedObjectUrl:   obj.url,
      swing,
      balanceMin,
      breathType:          $("axisBreathType")   ? ($("axisBreathType").value || "square") : "square",
      breathBase:          clamp($("axisBreathBase") ? $("axisBreathBase").value : 4, 4, 8, 4),
      breathMin:           clamp($("axisBreathMin")  ? $("axisBreathMin").value  : 5, 5, 15, 5),
      finalType:           $("axisFinalType")   ? ($("axisFinalType").value || "tension")  : "tension",
      finalMin:            clamp($("axisFinalMin")   ? $("axisFinalMin").value   : 3, 1, 10, 3),
      audio,
      voice: getVoiceConfig(),
      metro: getMetroConfig()
    };
  }

  // ─── Session builder ─────────────────────────────────────────────

  function audioExtra(track) {
    return track
      ? { audioTrack: { id: track.id, name: track.name, url: track.url } }
      : { audioTrack: null };
  }

  function phase(type, title, duration, video, guidance, extra) {
    return Object.assign({
      type,
      title,
      duration,
      video:      video || "",
      guidance:   guidance || "",
      voiceStart: guidance || "",
      bellAtEnd:  true
    }, extra || {});
  }

  /*
   * Déroulement par cycle (répété N fois, N = balanceMin / 3) :
   *   1. Contemplation objet  (20 s)
   *   2. Observation lumineuse (30 s)
   *   3. Éteindre la lumière   (5 s)
   *   4. Poser le bandeau      (8 s)
   *   5. Balancement           (3 min : 1 min grand · 1 min petit · 1 min grand)
   *
   * Encadrés par Détente initiale (début) + Respiration + Final (fin).
   */
  function buildSession(config) {
    const phases  = [];
    const cycles  = Math.max(1, Math.round(config.balanceMin / 3));
    const swing   = SWINGS[config.swing] || SWINGS.lateral;
    const breath  = BREATHS[config.breathType] || BREATHS.square;
    const breathPattern = breath.segments(config.breathBase);
    const breathPatternDuration = breathPattern.reduce((s, i) => s + i.duration, 0);

    const objUrl   = config.selectedObjectUrl   || (AXIS_OBJECTS_PATH + (AXIS_OBJECTS.find(o => o.id === config.selectedObject) || AXIS_OBJECTS[0]).file);
    const objLabel = config.selectedObjectLabel || config.selectedObject || "Objet";

    // ── Détente initiale ──────────────────────────────────────────
    phases.push(phase(
      "detente", "Détente initiale",
      config.relaxationMin * 60,
      MAP.detente || "",
      "Installez-vous confortablement. Fixez la source lumineuse devant vous. Pensez à l'objectif que vous souhaitez travailler pendant cette séance. Laissez cette intention s'installer naturellement.",
      audioExtra(config.audio.detente)
    ));

    // ── Cycles ───────────────────────────────────────────────────
    for (let i = 0; i < cycles; i++) {
      const n = i + 1;

      // 1 — Contemplation objet
      phases.push({
        type:       "object-contemplation",
        title:      `Contemplation — ${objLabel} (${n}/${cycles})`,
        duration:   20,
        image:      objUrl,
        video:      "",
        guidance:   "Fixez cet objet du regard. Imprégnez-vous de sa forme.",
        voiceStart: "Contemplez cet objet. Fixez-le du regard.",
        bellAtEnd:  false,
        audioTrack: null
      });

      // 2 — Observation lumineuse
      phases.push(phase(
        "lumiere", `Observation lumineuse (${n}/${cycles})`,
        30,
        MAP.light || "",
        "Allumez la lumière. Regardez la source lumineuse pendant trente secondes.",
        audioExtra(config.audio.light)
      ));

      // 3 — Éteindre la lumière
      phases.push({
        type:       "instruction",
        title:      "Éteindre la lumière",
        duration:   5,
        image:      null,
        text:       "Éteignez la lumière",
        subtext:    "Préparez-vous à entrer dans l'obscurité",
        video:      "",
        guidance:   "Éteignez la lumière.",
        voiceStart: "Éteignez la lumière.",
        bellAtEnd:  false,
        audioTrack: null
      });

      // 4 — Poser le bandeau
      phases.push({
        type:       "instruction",
        title:      "Poser le bandeau",
        duration:   8,
        image:      AXIS_BANDEAU_IMG,
        text:       "Posez le bandeau sur vos yeux",
        subtext:    "Installez-vous confortablement",
        video:      "",
        guidance:   "Posez le bandeau sur vos yeux.",
        voiceStart: "Posez le bandeau sur vos yeux. Installez-vous confortablement.",
        bellAtEnd:  false,
        audioTrack: null
      });

      // 5 — Balancement 3 min (1 min grand · 1 min petit · 1 min grand)
      phases.push(phase(
        "balancement",
        `${swing.label} — cycle ${n}/${cycles}`,
        180,
        swing.video(),
        swing.guidance,
        Object.assign(audioExtra(config.audio.swing), {
          swing:  config.swing,
          mantra: swing.mantra,
          segments: [
            { from: 0,   to: 60,  title: "Grand mouvement",   mantra: swing.mantra + " · " + swing.direction, voice: swing.voiceGrand,   guidance: swing.mantra + " — langue contre le palais. " + swing.direction + "." },
            { from: 60,  to: 120, title: "Petit balancement",  mantra: swing.mantra + " en pensée",            voice: swing.voicePetit,   guidance: "Amplitude réduite. " + swing.mantra + " continue intérieurement." },
            { from: 120, to: 180, title: "Grand mouvement",   mantra: swing.mantra + " · " + swing.direction, voice: swing.voiceReprise, guidance: swing.mantra + " — reprenez le grand mouvement." }
          ]
        })
      ));
    }

    // ── Respiration ───────────────────────────────────────────────
    phases.push(phase(
      "respiration", breath.label,
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

    // ── Final ─────────────────────────────────────────────────────
    if (config.finalType === "rotor") {
      phases.push(phase(
        "final", "Rotation gyroscopique",
        config.finalMin * 60,
        MAP.final && MAP.final.rotor || "",
        "Préparez le final. Fixez le centre. Laissez la rotation agir autour de l'axe intérieur.",
        audioExtra(config.audio.final)
      ));
    } else {
      phases.push(phase(
        "final", "Tension statique",
        config.finalMin * 60,
        MAP.final && MAP.final.tension || "",
        "Préparez les tensions statiques. Contractez, maintenez, relâchez, puis revivez le geste mentalement.",
        audioExtra(config.audio.final)
      ));
    }

    const totalSeconds = phases.reduce((s, p) => s + p.duration, 0);
    return {
      id:          "axis-video-session-" + Date.now(),
      engine:      "axis-video-session-audio-voice-v3",
      createdAt:   new Date().toISOString(),
      config,
      voice:       config.voice,
      phases,
      totalSeconds,
      totalLabel:  formatDuration(totalSeconds),
      maxSeconds:  3600
    };
  }

  // ─── Aperçu compact ──────────────────────────────────────────────

  function compactPreview(session) {
    const cfg    = session.config;
    const cycles = Math.max(1, Math.round(cfg.balanceMin / 3));
    const swing  = SWINGS[cfg.swing] || SWINGS.lateral;
    const breath = BREATHS[cfg.breathType] || BREATHS.square;
    const finalLabel = cfg.finalType === "rotor" ? "Rotation gyroscopique" : "Tension statique";
    const cycleSeconds = (20 + 30 + 5 + 8 + 180) * cycles;

    return [
      {
        title:  "Détente initiale",
        time:   formatDuration(cfg.relaxationMin * 60),
        detail: "Vidéo muette + voix d'accueil · piste : " + (cfg.audio.detente ? cfg.audio.detente.name : "aucune")
      },
      {
        title:  `${cycles} cycle(s) — Contemplation + Lumière + Bandeau + ${swing.label}`,
        time:   formatDuration(cycleSeconds),
        detail: `Objet : ${cfg.selectedObjectLabel || cfg.selectedObject} · piste balancements : ` + (cfg.audio.swing ? cfg.audio.swing.name : "aucune")
      },
      {
        title:  breath.label,
        time:   formatDuration(cfg.breathMin * 60),
        detail: breath.patternLabel + " · piste : " + (cfg.audio.breath ? cfg.audio.breath.name : "aucune")
      },
      {
        title:  finalLabel,
        time:   formatDuration(cfg.finalMin * 60),
        detail: "Vidéo muette + voix finale · piste : " + (cfg.audio.final ? cfg.audio.final.name : "aucune")
      }
    ];
  }

  // ─── Rendu prévisualisation ──────────────────────────────────────

  function renderPreview() {
    const session = buildSession(getConfig());
    const list  = $("axisCompactPreview");
    const total = $("axisTotal");
    const msg   = $("axisMessage");
    const save  = $("axisSave");
    const open  = $("axisOpenPractice");

    if (!list) return session;
    list.innerHTML = "";

    compactPreview(session).forEach(item => {
      const node = document.createElement("article");
      node.className = "session-preview-item";
      node.innerHTML = `<strong>${item.title}</strong><span>${item.time}</span><small>${item.detail}</small>`;
      list.appendChild(node);
    });

    total.textContent = session.totalLabel;

    if (session.totalSeconds > 3600) {
      msg.textContent = "La séance dépasse 1 heure. Réduis le nombre de cycles ou la durée du final.";
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

    STORAGE_KEYS.forEach(key => localStorage.setItem(key, JSON.stringify(session)));

    $("axisMessage").textContent = "Séance générée. Elle est prête dans l'onglet Pratiquer.";
    $("axisMessage").classList.remove("bad");
    return session;
  }

  // ─── Import image personnelle ────────────────────────────────────

  function initObjectImport() {
    const input = $("axisObjectImport");
    if (!input) return;

    input.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;

      const url   = URL.createObjectURL(file);
      const label = file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
      const id    = "custom-" + Date.now();

      const select = $("axisSelectedObject");
      const opt    = document.createElement("option");
      opt.value                = id;
      opt.textContent          = "★ " + label;
      opt.dataset.customUrl    = url;
      opt.dataset.customLabel  = label;
      select.appendChild(opt);
      select.value = id;

      this.value = ""; // permet de re-sélectionner le même fichier
      renderPreview();
    });
  }

  function fillObjectSelect() {
    const select = $("axisSelectedObject");
    if (!select) return;

    const groups = [
      { label: "Carrés",    ids: ["carre-bleu","carre-rouge","carre-vert","carre-jaune","carre-violet"] },
      { label: "Rectangles",ids: ["rect-bleu","rect-rouge","rect-vert","rect-orange","rect-jaune","rect-violet"] },
      { label: "Triangles", ids: ["tri-bleu","tri-rouge","tri-vert","tri-orange","tri-jaune","tri-violet"] },
      { label: "Cercles",   ids: ["cerc-bleu","cerc-vert","cerc-orange","cerc-jaune","cerc-violet"] },
      { label: "Objets 3D", ids: ["3d-sphere","3d-cube","3d-cylindre","3d-cone","3d-etoile","3d-pyramide"] },
      { label: "Tulipes",   ids: ["tulipe-bleu","tulipe-rouge","tulipe-vert","tulipe-orange","tulipe-jaune","tulipe-violet"] },
      { label: "Roses",     ids: ["rose-blanche","rose-bleu","rose-jaune","rose-noir","rose-rose","rose-rouge"] },
      { label: "Autres",    ids: ["arbre","arbre-personne"] }
    ];

    select.innerHTML = "";
    groups.forEach(function (group) {
      const og = document.createElement("optgroup");
      og.label = group.label;
      group.ids.forEach(function (id) {
        const obj = AXIS_OBJECTS.find(function (o) { return o.id === id; });
        if (!obj) return;
        const opt = document.createElement("option");
        opt.value = obj.id;
        opt.textContent = obj.label;
        og.appendChild(opt);
      });
      select.appendChild(og);
    });
  }

  function initObjectPicker() {
    const select = $("axisSelectedObject");
    if (!select) return;
    fillObjectSelect();
    select.addEventListener("change", renderPreview);
  }

  // ─── Liaisons formulaire ─────────────────────────────────────────

  function initMetro() {
    // Boutons mode métronome
    document.querySelectorAll("[data-metro-mode]").forEach(btn => {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-metro-mode]").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const modeEl = $("axisMetroMode");
        if (modeEl) modeEl.value = this.dataset.metroMode;
        renderPreview();
      });
    });

    // Slider BPM
    const bpmEl    = $("axisMetroBpm");
    const bpmLabel = $("axisMetroBpmLabel");
    if (bpmEl && bpmLabel) {
      bpmEl.addEventListener("input", () => { bpmLabel.textContent = bpmEl.value; renderPreview(); });
    }

    // Slider volume
    const volEl    = $("axisMetroVol");
    const volLabel = $("axisMetroVolLabel");
    if (volEl && volLabel) {
      volEl.addEventListener("input", () => { volLabel.textContent = Math.round(volEl.value * 100) + "%"; renderPreview(); });
    }

    // Auto-BPM quand le type de balancement change
    const swingEl = $("axisSwing");
    if (swingEl && bpmEl) {
      const DEFAULT_BPMS = { lateral:60, vertical:60, rotation:40, ap:45, huit:40, croix:55 };
      swingEl.addEventListener("change", function () {
        const recommended = DEFAULT_BPMS[this.value] || 60;
        bpmEl.value = recommended;
        if (bpmLabel) bpmLabel.textContent = recommended;
        renderPreview();
      });
    }
  }

  function bind() {
    [
      "axisRelaxMin", "axisSwing", "axisBalanceMin",
      "axisBreathType", "axisBreathBase", "axisBreathMin",
      "axisFinalType", "axisFinalMin",
      "axisVoiceEnabled", "axisVoiceName", "axisVoiceRate", "axisVoiceVolume",
      "axisBellEnabled", "axisBreathTonesEnabled", "axisAudioVolume",
      "axisAudioDetente", "axisAudioLight", "axisAudioSwing", "axisAudioBreath", "axisAudioFinal"
    ].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("input",  renderPreview);
      el.addEventListener("change", renderPreview);
    });

    $("axisSave").addEventListener("click", saveSession);

    $("axisOpenPractice").addEventListener("click", () => {
      const session = saveSession();
      if (session) window.location.href = "pratiquer.html?session=video";
    });

    $("axisTestVoice").addEventListener("click", () => {
      const voice = buildSession(getConfig()).voice;
      if (!window.speechSynthesis || !voice.enabled) return;
      const utter = new SpeechSynthesisUtterance("Ceci est la voix de guidage Axis Lumen.");
      utter.lang   = "fr-FR";
      utter.rate   = voice.rate;
      utter.volume = voice.volume;
      const selected = window.speechSynthesis.getVoices().find(v => v.name === voice.voiceName);
      if (selected) utter.voice = selected;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    });

    // Propagation automatique : chaque changement de voix sur creer-seance → config globale
    ["axisVoiceName", "axisVoiceRate", "axisVoiceVolume"].forEach(id => {
      const el = $(id);
      if (!el) return;
      el.addEventListener("change", () => {
        if (!window.AXIS_VOICE_CFG) return;
        const cfg = {
          voiceName: $("axisVoiceName")  ? $("axisVoiceName").value                : window.AXIS_VOICE_CFG.voiceName,
          rate:      $("axisVoiceRate")  ? parseFloat($("axisVoiceRate").value)    : window.AXIS_VOICE_CFG.rate,
          volume:    $("axisVoiceVolume")? parseFloat($("axisVoiceVolume").value)  : window.AXIS_VOICE_CFG.volume
        };
        try { localStorage.setItem("axis_voice_global", JSON.stringify(cfg)); } catch (_) {}
        window.AXIS_VOICE_CFG = cfg;
        // Sync widget flottant si présent
        const wName = document.getElementById("axisGVoiceName");
        const wRate = document.getElementById("axisGVRate");
        const wVol  = document.getElementById("axisGVolume");
        const wRateVal  = document.getElementById("axisGVRateVal");
        const wVolVal   = document.getElementById("axisGVolumeVal");
        if (wName) wName.value = cfg.voiceName;
        if (wRate) { wRate.value = cfg.rate; if (wRateVal) wRateVal.textContent = cfg.rate.toFixed(2); }
        if (wVol)  { wVol.value  = cfg.volume; if (wVolVal) wVolVal.textContent = Math.round(cfg.volume * 100) + "%"; }
      });
    });
  }

  // ─── Init ────────────────────────────────────────────────────────

  function applyGlobalVoice() {
    const gv = window.AXIS_VOICE_CFG;
    if (!gv) return;
    const nameEl = $("axisVoiceName");
    const rateEl = $("axisVoiceRate");
    const volEl  = $("axisVoiceVolume");
    if (nameEl && gv.voiceName !== undefined) nameEl.value = gv.voiceName;
    if (rateEl && gv.rate   !== undefined) rateEl.value = gv.rate;
    if (volEl  && gv.volume !== undefined) volEl.value  = gv.volume;
  }

  function init() {
    fillAudioSelect("axisAudioDetente", "detente");
    fillAudioSelect("axisAudioLight",   "lumiere");
    fillAudioSelect("axisAudioSwing",   "rythme");
    fillAudioSelect("axisAudioBreath",  "respiration");
    fillAudioSelect("axisAudioFinal",   "mantra");

    fillVoiceSelect();
    applyGlobalVoice();
    if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = function() {
      fillVoiceSelect();
      applyGlobalVoice();
    };

    initObjectPicker();
    initObjectImport();
    initMetro();
    bind();
    renderPreview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
