(function () {
  "use strict";

  var STORAGE_KEY = "axis_voice_global";

  // ─── Config ───────────────────────────────────────────────────────────────

  function loadConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var p = JSON.parse(raw);
        return {
          voiceName: p.voiceName || "",
          rate:   isFinite(p.rate)   ? Number(p.rate)   : 0.92,
          volume: isFinite(p.volume) ? Number(p.volume) : 0.9
        };
      }
    } catch (_) {}
    return { voiceName: "", rate: 0.92, volume: 0.9 };
  }

  function persistConfig(cfg) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg)); } catch (_) {}
    window.AXIS_VOICE_CFG = cfg;
  }

  window.AXIS_VOICE_CFG = loadConfig();

  // ─── API globale ──────────────────────────────────────────────────────────

  window.axisSpeak = function (text, force) {
    if (!window.speechSynthesis || !text) return;
    var cfg = window.AXIS_VOICE_CFG;
    try {
      if (force) window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang   = "fr-FR";
      u.rate   = cfg.rate;
      u.volume = cfg.volume;
      var v = window.speechSynthesis.getVoices().find(function (vv) {
        return vv.name === cfg.voiceName;
      });
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  };

  window.axisStopSpeech = function () {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
  };

  // ─── Widget flottant ──────────────────────────────────────────────────────

  var panelOpen = false;

  function voiceOptions(selectedName) {
    if (!window.speechSynthesis) return '<option value="">— Speech non disponible —</option>';
    var voices = window.speechSynthesis.getVoices();
    var fr    = voices.filter(function (v) { return v.lang && v.lang.toLowerCase().startsWith("fr"); });
    var other = voices.filter(function (v) { return !v.lang || !v.lang.toLowerCase().startsWith("fr"); });
    var html  = '<option value="">Voix française par défaut</option>';
    fr.concat(other).forEach(function (v) {
      var sel = (v.name === selectedName) ? " selected" : "";
      html += '<option value="' + v.name.replace(/"/g, "&quot;") + '"' + sel + ">" +
        v.name + " — " + v.lang + "</option>";
    });
    return html;
  }

  function el(id) { return document.getElementById(id); }

  function refreshVoiceList() {
    var sel = el("axisGVoiceName");
    if (sel) sel.innerHTML = voiceOptions(window.AXIS_VOICE_CFG.voiceName);
  }

  function openPanel() {
    panelOpen = true;
    var panel = el("axisGVPanel");
    if (panel) panel.style.display = "block";
    refreshVoiceList();
  }

  function closePanel() {
    panelOpen = false;
    var panel = el("axisGVPanel");
    if (panel) panel.style.display = "none";
  }

  function syncGeneratorControls(cfg) {
    var nameEl  = el("axisVoiceName");
    var rateEl  = el("axisVoiceRate");
    var volEl   = el("axisVoiceVolume");
    if (nameEl && cfg.voiceName !== undefined) nameEl.value = cfg.voiceName;
    if (rateEl) rateEl.value  = cfg.rate;
    if (volEl)  volEl.value   = cfg.volume;
  }

  function renderWidget() {
    if (!document.body || !window.speechSynthesis) return;
    if (el("axisGVWidget")) return;

    var cfg = window.AXIS_VOICE_CFG;

    var wrapper = document.createElement("div");
    wrapper.id = "axisGVWidget";
    wrapper.innerHTML =
      /* ── Bouton flottant ── */
      '<button id="axisGVToggle" type="button" ' +
        'style="position:fixed;bottom:24px;right:24px;z-index:9000;' +
        'width:46px;height:46px;border-radius:50%;' +
        'background:linear-gradient(135deg,#d8b45f,#9a7430);' +
        'border:none;cursor:pointer;font-size:1.15rem;' +
        'box-shadow:0 6px 22px rgba(0,0,0,.55);' +
        'display:flex;align-items:center;justify-content:center;color:#070b14;" ' +
        'aria-label="Paramètres de voix — tous les onglets" title="Réglages voix">🎙</button>' +

      /* ── Panneau ── */
      '<div id="axisGVPanel" ' +
        'style="display:none;position:fixed;bottom:78px;right:24px;z-index:9000;' +
        'width:min(350px,calc(100vw - 40px));' +
        'background:linear-gradient(145deg,#0e1220,#0a0f1c);' +
        'border:1px solid rgba(216,180,95,.42);border-radius:24px;' +
        'padding:22px 20px;' +
        'box-shadow:0 24px 70px rgba(0,0,0,.65);' +
        'color:#f4ecd8;font-family:inherit;">' +

        /* en-tête */
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
          '<strong style="color:#ffe7a3;font-size:.92rem;letter-spacing:.04em;">🎙 Voix — réglage global</strong>' +
          '<button id="axisGVClose" type="button" style="background:none;border:none;color:rgba(244,236,216,.5);font-size:1.1rem;cursor:pointer;padding:4px 8px;" aria-label="Fermer">✕</button>' +
        '</div>' +

        /* voix */
        '<div style="margin-bottom:12px;">' +
          '<label for="axisGVoiceName" style="display:block;font-size:.76rem;color:#f4d986;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;">Voix</label>' +
          '<select id="axisGVoiceName" style="width:100%;padding:8px 10px;border-radius:10px;background:#111827;border:1px solid rgba(216,180,95,.28);color:#f4ecd8;font-size:.87rem;">' +
            voiceOptions(cfg.voiceName) +
          '</select>' +
        '</div>' +

        /* vitesse */
        '<div style="margin-bottom:12px;">' +
          '<label for="axisGVRate" style="display:block;font-size:.76rem;color:#f4d986;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;">' +
            'Vitesse &nbsp;<span id="axisGVRateVal" style="color:#fff;">' + cfg.rate.toFixed(2) + '</span>' +
          '</label>' +
          '<input id="axisGVRate" type="range" min="0.7" max="1.4" step="0.05" value="' + cfg.rate + '" style="width:100%;accent-color:#d8b45f;">' +
        '</div>' +

        /* volume */
        '<div style="margin-bottom:18px;">' +
          '<label for="axisGVolume" style="display:block;font-size:.76rem;color:#f4d986;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:5px;">' +
            'Volume &nbsp;<span id="axisGVolumeVal" style="color:#fff;">' + Math.round(cfg.volume * 100) + '%</span>' +
          '</label>' +
          '<input id="axisGVolume" type="range" min="0" max="1" step="0.05" value="' + cfg.volume + '" style="width:100%;accent-color:#d8b45f;">' +
        '</div>' +

        /* boutons */
        '<div style="display:flex;gap:8px;">' +
          '<button id="axisGVTest" type="button" style="flex:1;padding:10px;border-radius:12px;background:transparent;border:1px solid rgba(216,180,95,.32);color:#ffe7a3;font-weight:700;font-size:.87rem;cursor:pointer;" aria-label="Tester la voix sélectionnée">▶ Tester</button>' +
          '<button id="axisGVSave" type="button" style="flex:2;padding:10px;border-radius:12px;background:linear-gradient(135deg,#d8b45f,#9a7430);border:none;color:#070b14;font-weight:900;font-size:.87rem;cursor:pointer;" aria-label="Enregistrer la voix pour tous les onglets">Enregistrer pour tous les onglets</button>' +
        '</div>' +

        '<p id="axisGVMsg" style="margin:10px 0 0;font-size:.81rem;color:rgba(244,217,134,.85);min-height:1.2em;text-align:center;"></p>' +
      '</div>';

    document.body.appendChild(wrapper);

    /* ── Liaisons ── */

    el("axisGVToggle").addEventListener("click", function () {
      panelOpen ? closePanel() : openPanel();
    });

    el("axisGVClose").addEventListener("click", closePanel);

    el("axisGVRate").addEventListener("input", function () {
      var v = el("axisGVRateVal");
      if (v) v.textContent = parseFloat(this.value).toFixed(2);
    });

    el("axisGVolume").addEventListener("input", function () {
      var v = el("axisGVolumeVal");
      if (v) v.textContent = Math.round(parseFloat(this.value) * 100) + "%";
    });

    el("axisGVTest").addEventListener("click", function () {
      if (!window.speechSynthesis) return;
      var voiceName = el("axisGVoiceName").value;
      var rate      = parseFloat(el("axisGVRate").value);
      var volume    = parseFloat(el("axisGVolume").value);
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance("Ceci est la voix de guidage Axis Lumen Studio.");
      u.lang   = "fr-FR";
      u.rate   = rate;
      u.volume = volume;
      var v = window.speechSynthesis.getVoices().find(function (vv) { return vv.name === voiceName; });
      if (v) u.voice = v;
      window.speechSynthesis.speak(u);
    });

    el("axisGVSave").addEventListener("click", function () {
      var cfg = {
        voiceName: el("axisGVoiceName").value,
        rate:      parseFloat(el("axisGVRate").value),
        volume:    parseFloat(el("axisGVolume").value)
      };
      persistConfig(cfg);
      syncGeneratorControls(cfg);

      var msg = el("axisGVMsg");
      if (msg) {
        msg.textContent = "✓ Voix enregistrée — active sur tous les onglets.";
        setTimeout(function () { if (msg) msg.textContent = ""; }, 3000);
      }
    });

    /* Recharge la liste si les voix arrivent après le rendu (Chrome) */
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      var _prev = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = function () {
        if (typeof _prev === "function") _prev();
        refreshVoiceList();
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderWidget);
  } else {
    renderWidget();
  }
})();
