(function () {
  "use strict";

  var MAP = window.AXIS_SESSION_VIDEO_MAP || {};

  var SWINGS = {
    lateral: {
      label: "Balancement latéral",
      short: "Latéral",
      mantra: "SAT / NAM",
      rhythm: "1 seconde d’un côté, 1 seconde de l’autre",
      video: function () { return MAP.swing && MAP.swing.lateral || ""; }
    },
    vertical: {
      label: "Balancement vertical",
      short: "Vertical",
      mantra: "SAT / NAM",
      rhythm: "SAT dans un sens, NAM dans l’autre",
      video: function () { return MAP.swing && MAP.swing.vertical || ""; }
    },
    rotation: {
      label: "Rotation",
      short: "Rotation",
      mantra: "SAT / NAM",
      rhythm: "rotation douce, sans forcer",
      video: function () { return MAP.swing && MAP.swing.rotation || ""; }
    }
  };

  function $(id) {
    return document.getElementById(id);
  }

  function clamp(value, min, max, fallback) {
    var n = Number(value);
    if (Number.isNaN(n)) return fallback;
    return Math.max(min, Math.min(max, n));
  }

  function formatTime(seconds) {
    var s = Math.max(0, Math.round(seconds));
    var m = Math.floor(s / 60);
    var r = s % 60;
    if (r === 0) return m + " min";
    return m + " min " + r + " s";
  }

  function phase(type, title, duration, video, guidance, extra) {
    return Object.assign({
      type: type,
      title: title,
      duration: duration,
      video: video || "",
      guidance: guidance || ""
    }, extra || {});
  }

  function getConfig() {
    var swing = $("axisSwing").value;
    var balanceMin = clamp($("axisBalanceMin").value, 15, 45, 15);
    balanceMin = Math.round(balanceMin / 3) * 3;

    return {
      relaxationMin: clamp($("axisRelaxMin").value, 2, 5, 3),
      swing: swing,
      swingData: SWINGS[swing],
      balanceMin: balanceMin,
      breathMin: clamp($("axisBreathMin").value, 5, 15, 5),
      finalType: $("axisFinalType").value,
      finalMin: clamp($("axisFinalMin").value, 5, 15, 5),
      intention: $("axisIntention").value
    };
  }

  function buildSession(config) {
    var phases = [];
    var cycles = Math.max(5, Math.round(config.balanceMin / 3));

    phases.push(phase(
      "detente",
      "Détente initiale",
      config.relaxationMin * 60,
      MAP.detente || "",
      "Installe-toi. Relâche les épaules, la mâchoire, le ventre. Laisse le souffle descendre."
    ));

    for (var i = 0; i < cycles; i += 1) {
      phases.push(phase(
        "lumiere",
        "Observation lumineuse",
        30,
        MAP.light || "",
        "Allume la lumière. Regarde la source lumineuse pendant trente secondes, sans forcer."
      ));

      phases.push(phase(
        "balancement",
        config.swingData.label + " — cycle " + (i + 1) + "/" + cycles,
        180,
        config.swingData.video(),
        "Cycle de trois minutes : grand mouvement, petit mouvement, puis retour au grand mouvement.",
        {
          mantra: "SAT / NAM",
          swing: config.swing,
          segments: [
            {
              from: 0,
              to: 60,
              title: "Grand mouvement",
              mantra: "SAT à l’aller · NAM au retour",
              guidance: "Récite le mantra à voix haute. SAT dans un sens, NAM dans l’autre."
            },
            {
              from: 60,
              to: 120,
              title: "Petit balancement",
              mantra: "SAT / NAM en pensée",
              guidance: "Réduis le mouvement. Le mantra continue intérieurement, sans voix."
            },
            {
              from: 120,
              to: 180,
              title: "Grand mouvement",
              mantra: "SAT à l’aller · NAM au retour",
              guidance: "Reprends le grand mouvement. Le mantra revient à voix haute."
            }
          ]
        }
      ));
    }

    phases.push(phase(
      "respiration",
      "Respiration guidée",
      config.breathMin * 60,
      MAP.breath || "",
      "Respiration consciente. Inspire, retiens, expire. Laisse le rythme devenir clair et régulier."
    ));

    if (config.finalType === "tension") {
      phases.push(phase(
        "final",
        "Tension statique",
        config.finalMin * 60,
        MAP.final && MAP.final.tension || "",
        "Contracte, maintiens, relâche. Puis revis le geste mentalement avec précision."
      ));
    } else {
      phases.push(phase(
        "final",
        "Rotation gyroscopique",
        config.finalMin * 60,
        MAP.final && MAP.final.rotor || "",
        "Fixe le centre. Laisse la rotation agir autour de l’axe intérieur."
      ));
    }

    var total = phases.reduce(function (sum, item) {
      return sum + item.duration;
    }, 0);

    return {
      id: "axis-video-session-" + Date.now(),
      engine: "axis-video-timeline-v1",
      createdAt: new Date().toISOString(),
      intention: config.intention,
      config: config,
      phases: phases,
      totalSeconds: total,
      totalLabel: formatTime(total),
      maxSeconds: 3600
    };
  }

  function renderPreview(session) {
    var list = $("axisSessionPreview");
    var total = $("axisTotal");
    var warning = $("axisWarning");
    var save = $("axisSave");
    var open = $("axisOpenPractice");

    list.innerHTML = "";

    session.phases.forEach(function (item, index) {
      var node = document.createElement("article");
      node.className = "axis-builder-phase";
      node.innerHTML =
        '<div class="axis-builder-phase-head">' +
          '<strong>' + String(index + 1).padStart(2, "0") + ". " + item.title + '</strong>' +
          '<span>' + formatTime(item.duration) + '</span>' +
        '</div>' +
        '<small>' + item.guidance + '</small>';
      list.appendChild(node);
    });

    total.textContent = session.totalLabel;

    if (session.totalSeconds > 3600) {
      warning.textContent = "La séance dépasse 1 heure. Réduis la durée de balancement, de respiration ou du final.";
      warning.classList.add("bad");
      save.disabled = true;
      open.disabled = true;
    } else {
      warning.textContent = "Séance valide : elle respecte la limite d’une heure.";
      warning.classList.remove("bad");
      save.disabled = false;
      open.disabled = false;
    }
  }

  function currentSession() {
    return buildSession(getConfig());
  }

  function saveSession() {
    var session = currentSession();

    if (session.totalSeconds > 3600) {
      renderPreview(session);
      return null;
    }

    localStorage.setItem("axis_lumen_custom_session", JSON.stringify(session));
    localStorage.setItem("axis_lumen_generated_session", JSON.stringify(session));
    localStorage.setItem("axis_current_session", JSON.stringify(session));
    localStorage.setItem("axis-practice-session", JSON.stringify(session));

    renderPreview(session);

    var warning = $("axisWarning");
    warning.textContent = "Séance vidéo générée et envoyée vers l’onglet Pratiquer.";
    warning.classList.remove("bad");

    return session;
  }

  function bind() {
    [
      "axisRelaxMin",
      "axisSwing",
      "axisBalanceMin",
      "axisBreathMin",
      "axisFinalType",
      "axisFinalMin",
      "axisIntention"
    ].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.addEventListener("input", function () { renderPreview(currentSession()); });
      el.addEventListener("change", function () { renderPreview(currentSession()); });
    });

    $("axisSave").addEventListener("click", function () {
      saveSession();
    });

    $("axisOpenPractice").addEventListener("click", function () {
      var session = saveSession();
      if (session) {
        window.location.href = "pratiquer.html?session=video";
      }
    });
  }

  function init() {
    bind();
    renderPreview(currentSession());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();