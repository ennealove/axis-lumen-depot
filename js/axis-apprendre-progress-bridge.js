// axis-apprendre-progress-bridge.js
// Branche le compteur de progression (constellation + barre + %) sur les vraies
// validations du système axis-apprendre-one-hour.js (clés axis_course_validated_*)
// et redessine la constellation avec les 117 portes réelles.

(() => {
  "use strict";

  const TOTAL = 117;

  // ── Compter les cours validés dans le nouveau système ─────────────────────
  function countValidated() {
    let count = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("axis_course_validated_")) {
          count++;
        }
      }
    } catch (_) {}
    return count;
  }

  // ── Mettre à jour les éléments UI de progression ──────────────────────────
  function updateProgressUI() {
    const done  = countValidated();
    const pct   = Math.round((done / TOTAL) * 100);

    const elPct  = document.getElementById("axisLearnProgressPercent");
    const elBar  = document.getElementById("axisLearnProgressBar");
    const elText = document.getElementById("axisLearnProgressText");

    if (elPct)  elPct.textContent  = `${pct}%`;
    if (elBar)  elBar.style.width  = `${pct}%`;
    if (elText) elText.textContent = `${done} cours validé${done !== 1 ? "s" : ""} sur ${TOTAL}.`;
  }

  // ── Redessiner la constellation avec 117 dots ─────────────────────────────
  // Appelé après que le transcendant.js a déjà initialisé le canvas.
  function drawConstellation117() {
    const canvas = document.getElementById("axisLearnConstellation");
    if (!canvas || !canvas.getContext) return;

    const courses = Array.isArray(window.AXIS_ONE_HOUR_COURSES)
      ? window.AXIS_ONE_HOUR_COURSES
      : [];
    if (courses.length < 10) return; // pas encore chargé

    const validated = new Set();
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("axis_course_validated_")) {
          validated.add(key.replace("axis_course_validated_", ""));
        }
      }
    } catch (_) {}

    const dpr    = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w      = canvas.offsetWidth  || 360;
    const h      = canvas.offsetHeight || 360;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const r  = Math.min(w, h) * 0.38;

    // Fond
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
    bg.addColorStop(0,    "rgba(255,217,120,.13)");
    bg.addColorStop(0.45, "rgba(123,188,255,.06)");
    bg.addColorStop(1,    "rgba(2,5,12,0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Cercles et rayons
    ctx.save();
    ctx.strokeStyle = "rgba(232,205,139,.17)";
    ctx.lineWidth   = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (r / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 * i) / 12;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.stroke();
    }
    ctx.restore();

    // Dots pour chaque cours
    const sorted = courses.slice().sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    sorted.forEach((course, index) => {
      const rings   = 5;
      const ring    = (index % rings) + 1;
      const inRing  = Math.floor(index / rings);
      const total   = Math.ceil(sorted.length / rings);
      const angle   = (Math.PI * 2 * inRing) / total + (ring * 0.18);
      const dist    = (r / (rings + 1)) * ring;

      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;

      const isDone = validated.has(String(course.order));
      const dotR   = isDone ? 5 : 3.5;

      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = isDone
        ? "rgba(141,224,179,.9)"   // vert = validé
        : "rgba(232,205,139,.45)"; // or = disponible
      ctx.fill();
    });

    // Texte central
    ctx.save();
    ctx.textAlign  = "center";
    ctx.fillStyle  = "rgba(255,231,163,.88)";
    ctx.font       = "700 15px Georgia, serif";
    ctx.fillText("117 portes", cx, cy - 4);
    ctx.fillStyle  = "rgba(174,185,204,.80)";
    ctx.font       = "500 11px Inter, system-ui, sans-serif";
    ctx.fillText("école du temple vivant", cx, cy + 17);
    ctx.restore();
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    updateProgressUI();
    // Attendre que les cours soient chargés avant de dessiner la constellation
    const tryDraw = (attempts) => {
      const courses = window.AXIS_ONE_HOUR_COURSES;
      if (Array.isArray(courses) && courses.length >= 100) {
        drawConstellation117();
      } else if (attempts > 0) {
        setTimeout(() => tryDraw(attempts - 1), 300);
      }
    };
    setTimeout(() => tryDraw(10), 600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ── Rafraîchir la progression quand une validation a lieu ────────────────
  // Ecouter les changements de localStorage depuis les autres scripts
  window.addEventListener("storage", (e) => {
    if (e.key && e.key.startsWith("axis_course_validated_")) {
      updateProgressUI();
      drawConstellation117();
    }
  });

  // Exposer pour que axis-apprendre-one-hour.js puisse notifier après validation
  window.axisRefreshProgress = function () {
    updateProgressUI();
    drawConstellation117();
  };
})();
