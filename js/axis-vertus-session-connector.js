// axis-vertus-session-connector.js
// Connecte les boutons Pause/Resume/Stop aux phases de la pratique guidée vertus
// et ajoute : cloche entre phases, barre de progression, activation visuelle des étapes

(() => {
  "use strict";

  // ── Cloche Web Audio ──────────────────────────────────────────────────────
  function ringBell(volume = 0.55) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      // Fondamentale
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(528, now);
      osc1.frequency.exponentialRampToValueAtTime(420, now + 2.2);
      gain1.gain.setValueAtTime(volume, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 3.5);
      // Harmonique
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1056, now);
      gain2.gain.setValueAtTime(volume * 0.35, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 2.5);
    } catch (_) {}
  }

  // ── Helpers DOM ───────────────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const phaseOrder = ["lecture", "lumiere", "remanence", "carnet"];

  function setPhaseActive(phaseId) {
    document.querySelectorAll(".avps").forEach(el => {
      const isActive = el.dataset.phase === phaseId;
      el.classList.toggle("active", isActive);
      el.classList.toggle("done", phaseOrder.indexOf(el.dataset.phase) < phaseOrder.indexOf(phaseId));
    });
  }

  function resetPhaseSteps() {
    document.querySelectorAll(".avps").forEach(el => {
      el.classList.remove("active", "done");
    });
  }

  function setProgress(pct) {
    const bar = $("axisVirtueProgressBar");
    if (bar) bar.style.width = Math.max(0, Math.min(100, pct)) + "%";
  }

  // ── Observer les changements de phase via MutationObserver ────────────────
  // On surveille le textContent de #axisVirtuePhase pour réagir aux changements
  function watchPhaseLabel() {
    const phaseEl = $("axisVirtuePhase");
    if (!phaseEl) return;

    const phaseMap = {
      "lecture": "lecture",
      "lire": "lecture",
      "lumière": "lumiere",
      "lumiere": "lumiere",
      "rémanence": "remanence",
      "remanence": "remanence",
      "carnet": "carnet",
      "intégration": "carnet",
    };

    let lastPhase = "";
    const observer = new MutationObserver(() => {
      const text = (phaseEl.textContent || "").toLowerCase().trim();
      const phaseId = Object.entries(phaseMap).find(([k]) => text.includes(k))?.[1];
      const progressWrap = $("axisVirtueProgressWrap");

      if (text === "prêt" || text === "séance terminée") {
        resetPhaseSteps();
        if (progressWrap) progressWrap.style.display = "none";
        setProgress(0);
        lastPhase = "";
        return;
      }

      if (progressWrap) progressWrap.style.display = "block";

      if (phaseId && phaseId !== lastPhase) {
        if (lastPhase) ringBell(0.5); // cloche au changement de phase
        lastPhase = phaseId;
        setPhaseActive(phaseId);
        // Afficher les boutons de contrôle
        showControls(true);
      }
    });
    observer.observe(phaseEl, { childList: true, characterData: true, subtree: true });
  }

  // ── Observer le timer pour mettre à jour la barre de progression ──────────
  function watchTimer() {
    const timerEl = $("axisVirtueTimer");
    if (!timerEl) return;

    // Durées totales des phases (en secondes)
    const phaseDurations = { lecture: 300, lumiere: 180, remanence: 600, carnet: 180 };
    const totalDuration = Object.values(phaseDurations).reduce((a, b) => a + b, 0);
    let phaseStart = 0; // secondes cumulées avant la phase active

    const phaseEl = $("axisVirtuePhase");

    const observer = new MutationObserver(() => {
      const timerText = timerEl.textContent || "00:00";
      const [mStr, sStr] = timerText.split(":");
      const remaining = parseInt(mStr) * 60 + parseInt(sStr || 0);

      // Déterminer la phase active pour calculer la progression
      const phaseText = (phaseEl?.textContent || "").toLowerCase();
      let currentPhaseDur = 300;
      let cumulBefore = 0;
      if (phaseText.includes("lumière") || phaseText.includes("lumiere")) { cumulBefore = 300; currentPhaseDur = 180; }
      else if (phaseText.includes("rémanence") || phaseText.includes("remanence")) { cumulBefore = 480; currentPhaseDur = 600; }
      else if (phaseText.includes("carnet") || phaseText.includes("intégration")) { cumulBefore = 1080; currentPhaseDur = 180; }

      const elapsed = cumulBefore + (currentPhaseDur - remaining);
      const pct = (elapsed / totalDuration) * 100;
      setProgress(pct);
    });
    observer.observe(timerEl, { childList: true, characterData: true, subtree: true });
  }

  // ── Afficher/masquer les boutons de contrôle ──────────────────────────────
  function showControls(show) {
    const ids = ["axisVirtuePause", "axisVirtueResume", "axisVirtueStop"];
    ids.forEach(id => {
      const el = $(id);
      if (el) el.style.display = show ? "" : "none";
    });
  }

  // ── Ecouter le bouton Start pour afficher les contrôles ───────────────────
  function bindStartBtn() {
    const startBtn = $("axisVirtueStart");
    if (!startBtn) return;
    startBtn.addEventListener("click", () => {
      const progressWrap = $("axisVirtueProgressWrap");
      if (progressWrap) progressWrap.style.display = "block";
      resetPhaseSteps();
      setTimeout(() => {
        showControls(true);
        ringBell(0.4); // cloche de démarrage
        const bellStatus = $("axisVirtueBellStatus");
        if (bellStatus) bellStatus.textContent = "🔔 Signal sonore actif entre les phases";
      }, 300);
    });
  }

  // ── Ecouter Stop ─────────────────────────────────────────────────────────
  function bindStopBtn() {
    const stopBtn = $("axisVirtueStop");
    if (!stopBtn) return;
    stopBtn.addEventListener("click", () => {
      showControls(false);
      resetPhaseSteps();
      setProgress(0);
      const progressWrap = $("axisVirtueProgressWrap");
      if (progressWrap) progressWrap.style.display = "none";
    });
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    watchPhaseLabel();
    watchTimer();
    bindStartBtn();
    bindStopBtn();
  });
})();
