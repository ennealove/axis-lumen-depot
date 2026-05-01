(function () {
  "use strict";

  const MAP = window.AXIS_SESSION_VIDEO_MAP || { roles: {}, maxSeconds: 2700 };
  const STORAGE_CONFIG = "axis.session.builder.config.v1";
  const STORAGE_SEQUENCE = "axis.session.builder.sequence.v1";
  const STORAGE_VERSION = "axis.session.builder.version";

  const DEFAULT_CONFIG = {
    voiceGender: "female",
    targetMinutes: 30,
    relaxationMinutes: 1,
    swingType: "lateral_swing",
    swingMinutes: 15,
    includeBreathing: true,
    breathingMinutes: 5,
    includeRotor: false,
    rotorMinutes: 5,
    includeTension: false,
    tensionMinutes: 5,
    returnCalmMinutes: 1
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

  function clamp(value, min, max) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
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

  function roleStatus(roleName) {
    const item = getRole(roleName);
    return item && item.status === "ok" ? "ok" : "missing";
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

  function getSessionView() {
    return findView("session", ["creer sa seance", "creer une seance", "seance complete", "construire une seance"]);
  }

  function setNavLabels() {
    const sessionTab = document.querySelector('.nav-tab[data-view="session"]');
    if (sessionTab) sessionTab.textContent = "Créer sa séance";

    const practiceTab = document.querySelector('.nav-tab[data-view="pratique"]');
    if (practiceTab) practiceTab.textContent = "Pratiquer";
  }

  function loadConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_CONFIG);
      if (raw) return Object.assign({}, DEFAULT_CONFIG, JSON.parse(raw));
    } catch (_) {}
    return Object.assign({}, DEFAULT_CONFIG);
  }

  function saveConfig(config) {
    localStorage.setItem(STORAGE_CONFIG, JSON.stringify(config));
    localStorage.setItem(STORAGE_VERSION, "session-builder-to-practice-theater-v1");
  }

  function saveSequence(sequence, config) {
    localStorage.setItem(STORAGE_SEQUENCE, JSON.stringify({
      createdAt: new Date().toISOString(),
      config: config,
      sequence: sequence
    }));
  }

  function openPractice() {
    const tab = document.querySelector('.nav-tab[data-view="pratique"], .go-view[data-target="pratique"]');
    if (tab) {
      tab.click();
      return;
    }

    const practice = document.getElementById("pratique");
    if (practice) practice.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function swingLabel(role) {
    if (role === "vertical_swing") return "balancement vertical";
    if (role === "rotation_swing") return "rotation";
    return "balancement latéral";
  }

  function readConfig() {
    const root = $("#axisSessionBuilderRoot");
    if (!root) return loadConfig();

    return {
      voiceGender: ($("#axisVoiceGender", root) || {}).value || DEFAULT_CONFIG.voiceGender,
      targetMinutes: clamp(($("#axisTargetMinutes", root) || {}).value, 15, 45),
      relaxationMinutes: clamp(($("#axisRelaxationMinutes", root) || {}).value, 1, 5),
      swingType: ($("#axisSwingType", root) || {}).value || DEFAULT_CONFIG.swingType,
      swingMinutes: clamp(($("#axisSwingMinutes", root) || {}).value, 3, 30),
      includeBreathing: !!($("#axisIncludeBreathing", root) || {}).checked,
      breathingMinutes: clamp(($("#axisBreathingMinutes", root) || {}).value, 1, 15),
      includeRotor: !!($("#axisIncludeRotor", root) || {}).checked,
      rotorMinutes: clamp(($("#axisRotorMinutes", root) || {}).value, 1, 15),
      includeTension: !!($("#axisIncludeTension", root) || {}).checked,
      tensionMinutes: clamp(($("#axisTensionMinutes", root) || {}).value, 1, 15),
      returnCalmMinutes: clamp(($("#axisReturnCalmMinutes", root) || {}).value, 1, 5)
    };
  }

  function buildSequence(config) {
    const cfg = Object.assign({}, DEFAULT_CONFIG, config || {});
    const maxSeconds = Math.min(clamp(cfg.targetMinutes, 15, 45) * 60, 2700);

    const sequence = [];

    const add = function (role, title, subtitle, seconds, voice, meta) {
      sequence.push(Object.assign({
        role: role,
        title: title,
        subtitle: subtitle,
        duration: Math.max(1, Math.round(seconds)),
        voice: voice
      }, meta || {}));
    };

    const relaxationSec = clamp(cfg.relaxationMinutes, 1, 5) * 60;
    const returnCalmSec = clamp(cfg.returnCalmMinutes, 1, 5) * 60;

    add(
      "relaxation",
      "Détente",
      "Préparation intérieure",
      relaxationSec,
      "Temps de détente. Relâchez le corps. Laissez la respiration devenir calme et régulière."
    );

    add(
      "light_on",
      "Observation lumineuse",
      "Regardez la source lumineuse pendant trente secondes",
      30,
      "Allumez la lumière. Regardez la source lumineuse pendant trente secondes. Restez stable, présent, sans tension."
    );

    add(
      "light_off",
      "Extinction de la lumière",
      "Éteignez la lumière",
      8,
      "Éteignez la lumière. Fermez doucement les yeux."
    );

    add(
      "blindfold",
      "Bandeau",
      "Mettez le bandeau sur les yeux",
      12,
      "Mettez maintenant le bandeau sur les yeux. Observez la rémanence lumineuse sans chercher à la retenir."
    );

    const optionalSeconds =
      (cfg.includeBreathing ? clamp(cfg.breathingMinutes, 1, 15) * 60 : 0) +
      (cfg.includeRotor ? clamp(cfg.rotorMinutes, 1, 15) * 60 : 0) +
      (cfg.includeTension ? clamp(cfg.tensionMinutes, 1, 15) * 60 : 0);

    const fixedBeforeSwing = sequence.reduce(function (sum, item) { return sum + item.duration; }, 0);
    const availableForSwing = Math.max(180, maxSeconds - fixedBeforeSwing - optionalSeconds - returnCalmSec);
    const requestedSwingSeconds = clamp(cfg.swingMinutes, 3, 30) * 60;
    const swingSeconds = Math.min(requestedSwingSeconds, availableForSwing);

    let remainingSwing = swingSeconds;
    let minuteIndex = 0;
    const sLabel = swingLabel(cfg.swingType);

    while (remainingSwing > 0) {
      const duration = Math.min(60, remainingSwing);
      const cyclePosition = minuteIndex % 3;
      const amplitude = cyclePosition === 1 ? "petit" : "grand";
      const title = amplitude === "petit" ? "Petit balancement" : "Grand balancement";

      add(
        cfg.swingType,
        title,
        sLabel + " · minute " + (minuteIndex + 1),
        duration,
        amplitude === "petit"
          ? "Passez au petit " + sLabel + ". Réduisez l’amplitude. Gardez la régularité."
          : "Commencez le grand " + sLabel + ". Mouvement ample, souple et régulier.",
        {
          family: "swing",
          amplitude: amplitude,
          minute: minuteIndex + 1
        }
      );

      remainingSwing -= duration;
      minuteIndex += 1;
    }

    if (cfg.includeBreathing) {
      add(
        "breathing",
        "Respiration",
        "Souffle guidé",
        clamp(cfg.breathingMinutes, 1, 15) * 60,
        "Passez maintenant à la respiration. Inspirez calmement. Laissez le rythme vous guider. Expirez sans effort."
      );
    }

    if (cfg.includeRotor) {
      add(
        "rotor",
        "Rotor Optique",
        "Rotation et concentration",
        clamp(cfg.rotorMinutes, 1, 15) * 60,
        "Passez au rotor optique. Gardez l’attention au centre. Laissez la rotation devenir un support stable."
      );
    }

    if (cfg.includeTension) {
      add(
        "static_tension",
        "Tension statique",
        "Contractez, maintenez, relâchez",
        clamp(cfg.tensionMinutes, 1, 15) * 60,
        "Passez aux tensions statiques. Contractez, maintenez, puis relâchez. Observez la trace intérieure."
      );
    }

    add(
      "return_calm",
      "Retour au calme",
      "Intégration finale",
      returnCalmSec,
      "Retour au calme. Restez quelques instants en silence. Observez les effets de la séance dans le corps et dans la pensée."
    );

    return sequence;
  }

  function totalSeconds(sequence) {
    return sequence.reduce(function (sum, item) {
      return sum + Number(item.duration || 0);
    }, 0);
  }

  function renderPreview(sequence) {
    const list = $("#axisBuilderSequencePreview");
    const total = $("#axisBuilderTotal");
    const detail = $("#axisBuilderDetail");

    if (!list) return;

    list.innerHTML = "";

    sequence.forEach(function (step, index) {
      const node = document.createElement("div");
      node.className = "axis-builder-step";
      node.innerHTML = `
        <small>${formatClock(step.duration)}</small>
        <div>
          <strong>${index + 1}. ${step.title}</strong><br>
          <small>${step.subtitle || ""}</small>
        </div>
      `;
      list.appendChild(node);
    });

    if (total) total.textContent = formatClock(totalSeconds(sequence));

    if (detail) {
      const config = readConfig();
      detail.textContent =
        "Voix " + (config.voiceGender === "male" ? "masculine" : "féminine") +
        " · " + swingLabel(config.swingType) +
        " · " + sequence.length + " étape(s)";
    }
  }

  function renderAssetsStatus() {
    const root = $("#axisBuilderAssets");
    if (!root) return;

    const labels = [
      ["relaxation", "Détente"],
      ["light_on", "Lumière 30 secondes"],
      ["light_off", "Éteindre la lumière"],
      ["blindfold", "Bandeau"],
      ["lateral_swing", "Balancement latéral"],
      ["vertical_swing", "Balancement vertical"],
      ["rotation_swing", "Rotation"],
      ["breathing", "Respiration"],
      ["rotor", "Rotor Optique"],
      ["static_tension", "Tension statique"]
    ];

    root.innerHTML = labels.map(function (item) {
      const roleName = item[0];
      const label = item[1];
      const asset = getRole(roleName);
      const ok = asset && asset.status === "ok";
      const file = ok ? asset.file : "support virtuel / à compléter";
      return `
        <div class="axis-builder-asset">
          <span class="axis-builder-dot ${ok ? "ok" : "missing"}"></span>
          <span><strong>${label}</strong><br><small>${file}</small></span>
        </div>
      `;
    }).join("");
  }

  function refresh() {
    const config = readConfig();
    saveConfig(config);
    const sequence = buildSequence(config);
    renderPreview(sequence);
  }

  function mount() {
    setNavLabels();

    const sessionView = getSessionView();
    if (!sessionView) return;

    sessionView.classList.add("axis-session-builder-active");

    let root = $("#axisSessionBuilderRoot", sessionView);
    if (!root) {
      root = document.createElement("div");
      root.id = "axisSessionBuilderRoot";
      sessionView.prepend(root);
    }

    if (root.dataset.ready === "1") {
      refresh();
      return;
    }

    root.dataset.ready = "1";

    const config = loadConfig();

    root.innerHTML = `
      <div class="axis-builder-shell">
        <article class="axis-builder-hero">
          <div class="eyebrow">Création de séance</div>
          <h3>Créer sa séance sur mesure</h3>
          <p class="muted">
            Configure ici la pratique complète. L’onglet “Pratiquer” devient ensuite un écran géant :
            une seule vidéo à la fois, une voix de guidage, un minuteur, et une progression claire.
          </p>
        </article>

        <div class="axis-builder-grid">
          <article class="axis-builder-panel">
            <h3>Paramètres</h3>

            <div class="axis-builder-form-grid">
              <div class="axis-builder-field">
                <label for="axisVoiceGender">Voix de guidage</label>
                <select id="axisVoiceGender">
                  <option value="female">Voix féminine</option>
                  <option value="male">Voix masculine</option>
                </select>
              </div>

              <div class="axis-builder-field">
                <label for="axisTargetMinutes">Durée maximale de séance</label>
                <select id="axisTargetMinutes">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                </select>
              </div>

              <div class="axis-builder-field">
                <label for="axisRelaxationMinutes">Temps de détente</label>
                <select id="axisRelaxationMinutes">
                  <option value="1">1 minute</option>
                  <option value="3">3 minutes</option>
                  <option value="5">5 minutes</option>
                </select>
              </div>

              <div class="axis-builder-field">
                <label for="axisReturnCalmMinutes">Retour au calme</label>
                <select id="axisReturnCalmMinutes">
                  <option value="1">1 minute</option>
                  <option value="3">3 minutes</option>
                  <option value="5">5 minutes</option>
                </select>
              </div>

              <div class="axis-builder-field">
                <label for="axisSwingType">Balancement</label>
                <select id="axisSwingType">
                  <option value="lateral_swing">Balancement latéral</option>
                  <option value="vertical_swing">Balancement vertical</option>
                  <option value="rotation_swing">Rotation</option>
                </select>
              </div>

              <div class="axis-builder-field">
                <label for="axisSwingMinutes">Durée du balancement</label>
                <input id="axisSwingMinutes" type="number" min="3" max="30" step="3">
              </div>
            </div>

            <div class="axis-builder-note">
              Séquence fixe : détente → lumière 30 secondes → éteindre → bandeau → balancement.
              Le balancement suit le cycle : 1 minute grand, 1 minute petit, 1 minute grand, puis répétition.
            </div>

            <div class="axis-builder-modules">
              <div class="axis-builder-module">
                <input id="axisIncludeBreathing" type="checkbox">
                <label for="axisIncludeBreathing">Ajouter respiration</label>
                <input id="axisBreathingMinutes" type="number" min="1" max="15" step="1">
              </div>

              <div class="axis-builder-module">
                <input id="axisIncludeRotor" type="checkbox">
                <label for="axisIncludeRotor">Ajouter rotor optique</label>
                <input id="axisRotorMinutes" type="number" min="1" max="15" step="1">
              </div>

              <div class="axis-builder-module">
                <input id="axisIncludeTension" type="checkbox">
                <label for="axisIncludeTension">Ajouter tension statique</label>
                <input id="axisTensionMinutes" type="number" min="1" max="15" step="1">
              </div>
            </div>

            <div class="axis-builder-actions">
              <button type="button" class="primary-btn" id="axisBuildSession">Construire dans Pratiquer</button>
              <button type="button" class="secondary-btn" id="axisBuildAndOpen">Construire et ouvrir l’écran géant</button>
            </div>
          </article>

          <article class="axis-builder-panel axis-builder-summary">
            <h3>Séquence générée</h3>

            <div class="axis-builder-pill-row">
              <div class="axis-builder-pill">Total : <strong id="axisBuilderTotal">00:00</strong></div>
              <div class="axis-builder-pill" id="axisBuilderDetail">Séquence prête</div>
            </div>

            <div id="axisBuilderSequencePreview" class="axis-builder-sequence-preview"></div>

            <h3>Supports détectés</h3>
            <div id="axisBuilderAssets" class="axis-builder-assets"></div>
          </article>
        </div>
      </div>
    `;

    $("#axisVoiceGender", root).value = config.voiceGender;
    $("#axisTargetMinutes", root).value = String(config.targetMinutes);
    $("#axisRelaxationMinutes", root).value = String(config.relaxationMinutes);
    $("#axisReturnCalmMinutes", root).value = String(config.returnCalmMinutes);
    $("#axisSwingType", root).value = config.swingType;
    $("#axisSwingMinutes", root).value = String(config.swingMinutes);

    $("#axisIncludeBreathing", root).checked = !!config.includeBreathing;
    $("#axisBreathingMinutes", root).value = String(config.breathingMinutes);

    $("#axisIncludeRotor", root).checked = !!config.includeRotor;
    $("#axisRotorMinutes", root).value = String(config.rotorMinutes);

    $("#axisIncludeTension", root).checked = !!config.includeTension;
    $("#axisTensionMinutes", root).value = String(config.tensionMinutes);

    all("input, select", root).forEach(function (input) {
      input.addEventListener("input", refresh);
      input.addEventListener("change", refresh);
    });

    $("#axisBuildSession", root).addEventListener("click", function () {
      const cfg = readConfig();
      const sequence = buildSequence(cfg);
      saveConfig(cfg);
      saveSequence(sequence, cfg);
      window.dispatchEvent(new CustomEvent("axis-session-sequence-updated", { detail: { sequence: sequence, config: cfg } }));
      openPractice();
    });

    $("#axisBuildAndOpen", root).addEventListener("click", function () {
      const cfg = readConfig();
      const sequence = buildSequence(cfg);
      saveConfig(cfg);
      saveSequence(sequence, cfg);
      window.dispatchEvent(new CustomEvent("axis-session-sequence-updated", { detail: { sequence: sequence, config: cfg } }));
      openPractice();
      setTimeout(function () {
        window.dispatchEvent(new CustomEvent("axis-session-start-requested"));
      }, 300);
    });

    renderAssetsStatus();
    refresh();
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    try {
      localStorage.removeItem("phosphene.practice.sequencer.config.v1");
      localStorage.removeItem("phosphene.practice.sequencer.sequence.v1");
    } catch (_) {}

    mount();
    setTimeout(mount, 500);
    setTimeout(mount, 1500);
  });
})();

