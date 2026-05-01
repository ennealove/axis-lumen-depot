(function () {
  "use strict";

  const RESCUE_VERSION = "canvas-rescue-20260430-direct";
  const MODULE_BY_VIEW = {
    dashboard: "dashboard",
    session: "mixage",
    mixage: "mixage",
    respiration: "respiration",
    "Rotor Optique": "gyrascope",
    gyrascope: "gyrascope",
    tensions: "tensions",
    pratique: "practice"
  };

  let lastModule = "mixage";
  let lastTime = 0;

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resizeCanvas(canvas) {
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    let width = Math.floor(rect.width || canvas.clientWidth || canvas.width || 640);
    let height = Math.floor(rect.height || canvas.clientHeight || canvas.height || 420);

    if (width < 20 || height < 20) {
      width = Number(canvas.getAttribute("width")) || 640;
      height = Number(canvas.getAttribute("height")) || 420;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.max(80, Math.floor(width * dpr));
    const targetHeight = Math.max(80, Math.floor(height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  }

  function ctxOf(id) {
    const canvas = byId(id);
    if (!canvas) return null;
    if (!resizeCanvas(canvas)) return null;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(80, Math.floor(rect.width || canvas.width));
    const height = Math.max(80, Math.floor(rect.height || canvas.height));
    const ctx = canvas.getContext("2d");
    return { canvas, ctx, w: width, h: height };
  }

  function clearScene(ctx, w, h, title) {
    const bg = ctx.createRadialGradient(w * 0.5, h * 0.38, 10, w * 0.5, h * 0.5, Math.max(w, h) * 0.72);
    bg.addColorStop(0, "#162747");
    bg.addColorStop(0.45, "#07101f");
    bg.addColorStop(1, "#02050b");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "#ffd36b";
    ctx.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      const r = Math.min(w, h) * (0.18 + i * 0.07);
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.10;
    for (let i = 0; i < 10; i++) {
      const x = (i + 1) * w / 11;
      ctx.beginPath();
      ctx.moveTo(x, h * 0.08);
      ctx.lineTo(w - x, h * 0.92);
      ctx.stroke();
    }
    ctx.restore();

    if (title) {
      ctx.save();
      ctx.font = "700 14px Inter, Segoe UI, sans-serif";
      ctx.fillStyle = "rgba(255, 211, 107, 0.92)";
      ctx.fillText(title, 22, 30);
      ctx.restore();
    }
  }

  function glow(ctx, x, y, r, color, alpha) {
    ctx.save();
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(0.35, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawFace(ctx, w, h, t, intense) {
    const cx = w * 0.5;
    const cy = h * 0.52;
    const headW = Math.min(w, h) * 0.26;
    const headH = Math.min(w, h) * 0.36;
    const swing = Math.sin(t * Math.PI * 2 / 2) * Math.min(w, h) * 0.055;

    ctx.save();
    ctx.translate(swing, 0);

    glow(ctx, cx, cy, headH * 1.35, "rgba(115,199,255,0.28)", 1);
    glow(ctx, cx, cy - headH * 0.2, headH * 0.9, "rgba(255,211,107,0.18)", 1);

    ctx.fillStyle = "rgba(220, 231, 246, 0.08)";
    ctx.strokeStyle = "rgba(238, 246, 255, 0.62)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(cx, cy, headW, headH, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(238, 246, 255, 0.52)";
    ctx.lineWidth = 1.6;

    ctx.beginPath();
    ctx.arc(cx - headW * 0.35, cy - headH * 0.10, headW * 0.08, 0, Math.PI * 2);
    ctx.arc(cx + headW * 0.35, cy - headH * 0.10, headW * 0.08, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy - headH * 0.03);
    ctx.lineTo(cx, cy + headH * 0.22);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy + headH * 0.30, headW * 0.28, 0.12 * Math.PI, 0.88 * Math.PI);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,211,107,0.64)";
    ctx.beginPath();
    ctx.moveTo(cx, cy - headH * 1.15);
    ctx.lineTo(cx, cy + headH * 1.15);
    ctx.stroke();

    ctx.restore();

    const pointX = cx + Math.sin(t * Math.PI * 2 / 2) * headW * 1.7;
    const pointY = cy - headH * 0.08;
    glow(ctx, pointX, pointY, intense ? 34 : 24, "rgba(255,211,107,0.95)", 0.95);

    ctx.save();
    ctx.fillStyle = "#fff4d0";
    ctx.beginPath();
    ctx.arc(pointX, pointY, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,211,107,0.85)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - headW * 2.1, pointY);
    ctx.lineTo(cx + headW * 2.1, pointY);
    ctx.stroke();
    ctx.restore();
  }

  function drawMixage(target, t, label) {
    if (!target) return;
    const { ctx, w, h } = target;

    clearScene(ctx, w, h, label || "Oscillation guidee");
    drawFace(ctx, w, h, t, true);

    const cx = w * 0.5;
    const cy = h * 0.18;

    glow(ctx, cx, cy, Math.min(w, h) * 0.13, "rgba(255, 230, 150, 0.55)", 1);

    ctx.save();
    ctx.fillStyle = "#fff4d0";
    ctx.font = "700 18px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ILLI", cx, h - 34);

    ctx.font = "12px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(238,246,255,0.70)";
    ctx.fillText("rythme 2 secondes - grand / petit / grand mouvement", cx, h - 14);
    ctx.restore();
  }

  function drawBreath(target, t, label) {
    if (!target) return;
    const { ctx, w, h } = target;

    clearScene(ctx, w, h, label || "Respiration");

    const cx = w * 0.5;
    const cy = h * 0.52;
    const base = Math.min(w, h) * 0.20;
    const pulse = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(t * Math.PI * 2 / 6));
    const r = base * pulse;

    glow(ctx, cx, cy, base * 2.0, "rgba(115,199,255,0.22)", 1);
    glow(ctx, cx, cy, r * 1.45, "rgba(133,240,202,0.22)", 1);

    ctx.save();
    ctx.strokeStyle = "rgba(133,240,202,0.82)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,211,107,0.64)";
    ctx.lineWidth = 1.5;

    for (let i = 0; i < 12; i++) {
      const a = i * Math.PI * 2 / 12 + t * 0.22;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r * 0.55, cy + Math.sin(a) * r * 0.55);
      ctx.lineTo(cx + Math.cos(a) * r * 1.45, cy + Math.sin(a) * r * 1.45);
      ctx.stroke();
    }

    const phase = Math.floor((t % 12) / 3);
    const words = ["INSPIRE", "RETIENT", "EXPIRE", "REPOSE"];
    ctx.fillStyle = "#fff4d0";
    ctx.font = "800 22px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(words[phase], cx, cy + 8);

    ctx.font = "12px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(238,246,255,0.70)";
    ctx.fillText("cycle guide - souffle stable - presence calme", cx, h - 24);
    ctx.restore();
  }

  function drawGyro(target, t, label) {
    if (!target) return;
    const { ctx, w, h } = target;

    clearScene(ctx, w, h, label || "Rotor Optique");

    const cx = w * 0.5;
    const cy = h * 0.52;
    const r = Math.min(w, h) * 0.30;
    const angle = t * Math.PI * 2 / 4;

    glow(ctx, cx, cy, r * 1.8, "rgba(115,199,255,0.20)", 1);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI * 2 / 16;
      ctx.save();
      ctx.rotate(a);
      ctx.strokeStyle = i % 2 === 0 ? "rgba(255,211,107,0.88)" : "rgba(115,199,255,0.75)";
      ctx.lineWidth = i % 2 === 0 ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(r * 0.18, 0);
      ctx.lineTo(r, 0);
      ctx.stroke();
      ctx.restore();
    }

    ctx.strokeStyle = "rgba(238,246,255,0.58)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    glow(ctx, cx, cy, r * 0.26, "rgba(255,211,107,0.75)", 1);

    ctx.save();
    ctx.fillStyle = "#fff4d0";
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.42, -angle, Math.PI * 2 - angle);
    ctx.stroke();

    ctx.font = "12px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(238,246,255,0.70)";
    ctx.textAlign = "center";
    ctx.fillText("centre fixe - rotation externe - regard stabilise", cx, h - 24);
    ctx.restore();
  }

  function drawTension(target, t, label) {
    if (!target) return;
    const { ctx, w, h } = target;

    clearScene(ctx, w, h, label || "Tensions statiques");

    const cx = w * 0.5;
    const cy = h * 0.50;
    const scale = Math.min(w, h);
    const cycle = (t % 9) / 9;
    const intensity = cycle < 0.33 ? cycle / 0.33 : cycle < 0.66 ? 1 : 1 - ((cycle - 0.66) / 0.34);

    glow(ctx, cx, cy, scale * (0.18 + intensity * 0.20), "rgba(255,211,107,0.28)", 1);
    glow(ctx, cx, cy, scale * 0.42, "rgba(255,126,144,0.11)", 1);

    ctx.save();
    ctx.strokeStyle = "rgba(238,246,255,0.72)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.arc(cx, cy - scale * 0.19, scale * 0.055, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy - scale * 0.13);
    ctx.lineTo(cx, cy + scale * 0.18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - scale * 0.20, cy - scale * 0.02);
    ctx.lineTo(cx + scale * 0.20, cy - scale * 0.02);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy + scale * 0.18);
    ctx.lineTo(cx - scale * 0.15, cy + scale * 0.38);
    ctx.moveTo(cx, cy + scale * 0.18);
    ctx.lineTo(cx + scale * 0.15, cy + scale * 0.38);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,211,107,0.85)";
    ctx.lineWidth = 2;

    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI * 2 / 10;
      const r1 = scale * (0.19 + intensity * 0.04);
      const r2 = scale * (0.30 + intensity * 0.09);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
    }

    let word = "CONTRACTEZ";
    if (cycle >= 0.33 && cycle < 0.66) word = "MAINTENEZ";
    if (cycle >= 0.66) word = "RELACHEZ";

    ctx.fillStyle = "#fff4d0";
    ctx.font = "800 22px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(word, cx, h - 42);

    ctx.font = "12px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = "rgba(238,246,255,0.70)";
    ctx.fillText("cycle corporel - charge - fixation - retour au calme", cx, h - 20);
    ctx.restore();
  }

  function drawDashboard(target, t) {
    if (!target) return;
    const { ctx, w, h } = target;
    clearScene(ctx, w, h, "AXIS LUMEN STUDIO");

    const cx = w * 0.5;
    const cy = h * 0.52;
    const r = Math.min(w, h) * 0.22;

    glow(ctx, cx, cy, r * 2.2, "rgba(255,211,107,0.22)", 1);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(t * 0.18);

    ctx.strokeStyle = "rgba(255,211,107,0.86)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI * 2 / 6;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2);
      ctx.lineTo(Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25);
      ctx.stroke();
    }

    ctx.restore();

    drawFace(ctx, w, h, t, false);

    ctx.save();
    ctx.font = "700 16px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = "#fff4d0";
    ctx.textAlign = "center";
    ctx.fillText("visuels canvas restaurés", cx, h - 30);
    ctx.restore();
  }

  function getActiveModule() {
    const active = $(".view.active");
    if (!active) return lastModule;

    const id = active.id;
    const mapped = MODULE_BY_VIEW[id] || lastModule;

    if (mapped !== "practice" && mapped !== "dashboard") {
      lastModule = mapped;
    }

    if (mapped === "practice") {
      const status = byId("statusModule");
      const text = status ? (status.textContent || "").toLowerCase() : "";
      if (text.includes("resp")) return "respiration";
      if (text.includes("rotor") || text.includes("gyro")) return "gyrascope";
      if (text.includes("tension")) return "tensions";
      if (text.includes("mix") || text.includes("oscillation")) return "mixage";
      return lastModule;
    }

    return mapped;
  }

  function drawModule(target, module, t, label) {
    if (module === "dashboard") return drawDashboard(target, t);
    if (module === "respiration") return drawBreath(target, t, label);
    if (module === "gyrascope") return drawGyro(target, t, label);
    if (module === "tensions") return drawTension(target, t, label);
    return drawMixage(target, t, label);
  }

  function loop(now) {
    const t = now / 1000;
    if (!lastTime) lastTime = t;
    lastTime = t;

    try { drawDashboard(ctxOf("dashboardCanvas"), t); } catch (e) {}

    try { drawMixage(ctxOf("mixagePreviewCanvas"), t, "Oscillation guidee"); } catch (e) {}
    try { drawBreath(ctxOf("breathPreviewCanvas"), t, "Respiration"); } catch (e) {}
    try { drawGyro(ctxOf("gyroPreviewCanvas"), t, "Rotor Optique"); } catch (e) {}
    try { drawTension(ctxOf("tensionPreviewCanvas"), t, "Tensions statiques"); } catch (e) {}

    const activeModule = getActiveModule();
    try { drawModule(ctxOf("practicePreviewCanvas"), activeModule, t, "Mode pratique"); } catch (e) {}
    try { drawModule(ctxOf("stageCanvas"), activeModule, t, "Plein ecran"); } catch (e) {}

    window.requestAnimationFrame(loop);
  }

  function fallbackNavigation() {
    $$(".nav-tab").forEach(function (tab) {
      if (tab.dataset.canvasRescueBound === "1") return;
      tab.dataset.canvasRescueBound = "1";

      tab.addEventListener("click", function () {
        const view = tab.getAttribute("data-view");
        if (!view) return;

        $$(".view").forEach(function (node) {
          node.classList.toggle("active", node.id === view);
        });

        $$(".nav-tab").forEach(function (node) {
          node.classList.toggle("active", node === tab);
        });

        const title = byId("viewTitle");
        if (title) title.textContent = tab.textContent || "AXIS LUMEN STUDIO";

        const mapped = MODULE_BY_VIEW[view];
        if (mapped && mapped !== "practice" && mapped !== "dashboard") {
          lastModule = mapped;
        }
      });
    });

    $$(".go-view").forEach(function (btn) {
      if (btn.dataset.canvasRescueBound === "1") return;
      btn.dataset.canvasRescueBound = "1";

      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-target");
        const tab = $('.nav-tab[data-view="' + target + '"]');
        if (tab) tab.click();
      });
    });
  }

  function fallbackStageButtons() {
    const open = byId("openPracticeStage");
    const overlay = $(".stage-overlay") || byId("stageOverlay");

    if (open && overlay && open.dataset.canvasRescueBound !== "1") {
      open.dataset.canvasRescueBound = "1";
      open.addEventListener("click", function () {
        overlay.classList.remove("hidden");
        overlay.classList.remove("is-hidden");
      });
    }

    const closeSelectors = [
      "#closePracticeStage",
      "#closeStageOverlay",
      "#stageClose",
      "#exitStage",
      "[data-stage-close]"
    ];

    closeSelectors.forEach(function (selector) {
      $$(selector).forEach(function (btn) {
        if (btn.dataset.canvasRescueBound === "1") return;
        btn.dataset.canvasRescueBound = "1";
        btn.addEventListener("click", function () {
          if (overlay) {
            overlay.classList.add("hidden");
          }
        });
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay) {
        overlay.classList.add("hidden");
      }
    });
  }

  function showRescueBadge() {
    if (byId("canvasRescueBadge")) return;

    const badge = document.createElement("div");
    badge.id = "canvasRescueBadge";
    badge.textContent = "Canvas rescue actif";
    badge.style.position = "fixed";
    badge.style.right = "12px";
    badge.style.bottom = "12px";
    badge.style.zIndex = "9999";
    badge.style.font = "12px Inter, Segoe UI, sans-serif";
    badge.style.padding = "7px 10px";
    badge.style.border = "1px solid rgba(255,211,107,.38)";
    badge.style.borderRadius = "999px";
    badge.style.color = "#fff4d0";
    badge.style.background = "rgba(3,6,13,.82)";
    badge.style.boxShadow = "0 10px 24px rgba(0,0,0,.32)";
    badge.style.pointerEvents = "none";
    document.body.appendChild(badge);

    setTimeout(function () {
      badge.style.opacity = "0";
      badge.style.transition = "opacity .8s ease";
      setTimeout(function () {
        if (badge.parentNode) badge.parentNode.removeChild(badge);
      }, 900);
    }, 2800);
  }

  function init() {
    fallbackNavigation();
    fallbackStageButtons();
    showRescueBadge();
    window.requestAnimationFrame(loop);
    console.info("[AXIS LUMEN]", RESCUE_VERSION, "actif");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
