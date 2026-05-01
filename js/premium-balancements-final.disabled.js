(function () {
  "use strict";

  const VERSION = "premium-balancements-final-vertical-top-20260430";

  const DISABLED_SWINGS = new Set([
    "antero",
    "anteroPosterior",
    "cross",
    "horseshoe"
  ]);

  const ASSETS = {
    body: "assets/images/buste_face.png",
    head: "assets/images/tete_face.png",
    halo: "assets/images/halo_lumineux.png",
    topHeadCandidates: [
      "assets/images/tete_dessus.png",
      "assets/images/tete_top.png",
      "assets/images/tete_haut.png"
    ]
  };

  const imgs = {};
  let topHead = null;
  let triedTopHead = false;

  function byId(id) {
    return document.getElementById(id);
  }

  function loadImage(key, src) {
    if (imgs[key]) return imgs[key];

    const im = new Image();
    im.decoding = "async";
    im.src = src;
    imgs[key] = im;
    return im;
  }

  function ready(im) {
    return im && im.complete && im.naturalWidth > 0 && im.naturalHeight > 0;
  }

  function tryLoadTopHead() {
    if (triedTopHead) return topHead;
    triedTopHead = true;

    let index = 0;

    function attempt() {
      if (index >= ASSETS.topHeadCandidates.length) return;

      const src = ASSETS.topHeadCandidates[index++];
      const im = new Image();
      im.decoding = "async";

      im.onload = function () {
        topHead = im;
      };

      im.onerror = attempt;
      im.src = src;
    }

    attempt();
    return topHead;
  }

  function removeForbiddenSwingOptions() {
    const selects = [
      byId("mixageSwing"),
      byId("sessionSwing")
    ].filter(Boolean);

    selects.forEach(function (select) {
      let changed = false;

      Array.from(select.options).forEach(function (option) {
        if (DISABLED_SWINGS.has(option.value)) {
          option.remove();
          changed = true;
        }
      });

      if (DISABLED_SWINGS.has(select.value) || !select.value) {
        select.value = "lateral";
        changed = true;
      }

      if (changed) {
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  function currentSwing() {
    const select = byId("mixageSwing") || byId("sessionSwing");
    const value = select ? select.value : "lateral";

    if (DISABLED_SWINGS.has(value)) {
      removeForbiddenSwingOptions();
      return "lateral";
    }

    return value || "lateral";
  }

  function activeViewId() {
    return document.querySelector(".view.active")?.id || "";
  }

  function practiceIsMixage() {
    const active = activeViewId();
    const moduleText = (byId("statusModule")?.textContent || "").toLowerCase();
    const phaseText = (byId("statusPhase")?.textContent || "").toLowerCase();

    if (active === "mixage") return true;
    if (active === "pratique" && moduleText.includes("oscillation")) return true;
    if (phaseText.includes("mixage")) return true;
    if (phaseText.includes("oscillation")) return true;

    return false;
  }

  function resizeCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(80, Math.floor(rect.width || canvas.clientWidth || canvas.width || 560));
    const cssH = Math.max(80, Math.floor(rect.height || canvas.clientHeight || canvas.height || 380));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    return { ctx, w: cssW, h: cssH };
  }

  function drawContain(ctx, image, cx, cy, boxW, boxH, rotation, scaleX, scaleY, alpha) {
    if (!ready(image)) return null;

    const ratio = image.naturalWidth / image.naturalHeight;
    let w = boxW;
    let h = w / ratio;

    if (h > boxH) {
      h = boxH;
      w = h * ratio;
    }

    ctx.save();
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.translate(cx, cy);
    ctx.rotate(rotation || 0);
    ctx.scale(scaleX == null ? 1 : scaleX, scaleY == null ? 1 : scaleY);
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
    ctx.restore();

    return { w, h };
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);

    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function aura(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function layout(w, h) {
    const cx = w * 0.405;
    const cy = h * 0.61;

    const bodyH = Math.min(h * 0.76, w * 0.86);
    const bodyW = bodyH * 0.74;

    const bodyCx = cx;
    const bodyCy = cy + bodyH * 0.075;
    const bodyTop = bodyCy - bodyH / 2;

    const headH = bodyH * 0.335;
    const headW = headH * 0.82;

    const headCx = cx;
    const headCy = bodyTop + headH * 0.145;

    return {
      cx,
      cy,
      bodyCx,
      bodyCy,
      bodyW,
      bodyH,
      bodyTop,
      headCx,
      headCy,
      headW,
      headH,
      templeX: headCx,
      templeY: headCy - headH * 0.01,
      whiteCx: cx,
      whiteCy: cy - bodyH * 0.08,
      whiteW: bodyW * 1.26,
      whiteH: bodyH * 1.14
    };
  }

  function drawBackground(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#050914");
    g.addColorStop(0.52, "#081522");
    g.addColorStop(1, "#02050c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const blue = ctx.createRadialGradient(w * 0.38, h * 0.28, 10, w * 0.38, h * 0.28, w * 0.58);
    blue.addColorStop(0, "rgba(115,199,255,.16)");
    blue.addColorStop(1, "rgba(115,199,255,0)");
    ctx.fillStyle = blue;
    ctx.fillRect(0, 0, w, h);

    const gold = ctx.createRadialGradient(w * 0.76, h * 0.18, 0, w * 0.76, h * 0.18, w * 0.46);
    gold.addColorStop(0, "rgba(255,211,107,.16)");
    gold.addColorStop(1, "rgba(255,211,107,0)");
    ctx.fillStyle = gold;
    ctx.fillRect(0, 0, w, h);
  }

  function drawWhiteUnifier(ctx, L) {
    ctx.save();

    const radial = ctx.createRadialGradient(
      L.whiteCx,
      L.whiteCy - L.whiteH * 0.16,
      0,
      L.whiteCx,
      L.whiteCy,
      L.whiteH * 0.68
    );

    radial.addColorStop(0, "rgba(255,255,255,.98)");
    radial.addColorStop(0.52, "rgba(255,252,244,.95)");
    radial.addColorStop(0.86, "rgba(255,252,244,.72)");
    radial.addColorStop(1, "rgba(255,252,244,0)");

    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.ellipse(L.whiteCx, L.whiteCy, L.whiteW * 0.55, L.whiteH * 0.57, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowColor = "rgba(255,255,255,.20)";
    ctx.shadowBlur = 28;

    ctx.fillStyle = "rgba(255,252,244,.88)";
    roundRect(ctx, L.whiteCx - L.whiteW * 0.34, L.whiteCy - L.whiteH * 0.47, L.whiteW * 0.68, L.whiteH * 0.92, 44);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,220,140,.16)";
    ctx.lineWidth = 1.2;
    roundRect(ctx, L.whiteCx - L.whiteW * 0.34, L.whiteCy - L.whiteH * 0.47, L.whiteW * 0.68, L.whiteH * 0.92, 44);
    ctx.stroke();

    ctx.restore();
  }

  function drawHalo(ctx, L, w, h) {
    const halo = loadImage("halo", ASSETS.halo);

    aura(ctx, L.templeX, L.templeY, Math.min(w, h) * 0.46, "rgba(255,211,107,.13)");

    if (ready(halo)) {
      drawContain(ctx, halo, L.templeX, L.templeY, Math.min(w, h) * 0.74, Math.min(w, h) * 0.74, 0, 1, 1, 0.34);
      return;
    }

    ctx.save();
    ctx.strokeStyle = "rgba(255,211,107,.18)";
    ctx.lineWidth = 1.1;

    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(L.templeX, L.templeY, Math.min(w, h) * (0.13 + i * 0.052), 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  function verticalLean(t) {
    return 0.5 + 0.5 * Math.sin(t * Math.PI);
  }

  function drawVerticalPath(ctx, L, lean) {
    const pathY = L.headH * 0.72;

    ctx.save();
    ctx.strokeStyle = "rgba(255,226,150,.36)";
    ctx.lineWidth = 2.6;
    ctx.setLineDash([8, 8]);

    ctx.beginPath();
    ctx.moveTo(L.templeX, L.templeY - pathY * 0.50);
    ctx.quadraticCurveTo(
      L.templeX,
      L.templeY + pathY * 0.25,
      L.templeX,
      L.templeY + pathY * 0.62
    );
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(255,226,120,.75)";

    ctx.beginPath();
    ctx.arc(L.templeX, L.templeY + (lean * 2 - 1) * pathY * 0.50, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawBody(ctx, L) {
    const body = loadImage("body", ASSETS.body);

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.16)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;

    drawContain(ctx, body, L.bodyCx, L.bodyCy, L.bodyW, L.bodyH, 0, 1, 1, 1);

    ctx.restore();
  }

  function drawNeckBridge(ctx, L, headX, headY, lean) {
    const neckTop = headY + L.headH * 0.30;
    const neckBottom = L.bodyTop + L.bodyH * 0.165;
    const neckH = Math.max(28, neckBottom - neckTop + L.headH * 0.18);
    const neckW = L.headW * 0.36;

    ctx.save();

    const shadow = ctx.createRadialGradient(
      headX,
      neckTop + neckH * 0.10,
      2,
      headX,
      neckTop + neckH * 0.10,
      L.headW * 0.50
    );
    shadow.addColorStop(0, "rgba(80,50,30,.18)");
    shadow.addColorStop(0.45, "rgba(80,50,30,.07)");
    shadow.addColorStop(1, "rgba(80,50,30,0)");

    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(headX, neckTop + neckH * 0.10, L.headW * 0.38, L.headH * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    const neckGrad = ctx.createLinearGradient(headX, neckTop, headX, neckTop + neckH);
    neckGrad.addColorStop(0, "rgba(238,198,166,.98)");
    neckGrad.addColorStop(0.48, "rgba(245,218,190,.96)");
    neckGrad.addColorStop(1, "rgba(250,240,222,.92)");

    ctx.fillStyle = neckGrad;
    roundRect(ctx, headX - neckW / 2, neckTop, neckW, neckH, neckW * 0.34);
    ctx.fill();

    const whiteBlend = ctx.createRadialGradient(
      headX,
      neckTop + neckH * 0.68,
      0,
      headX,
      neckTop + neckH * 0.68,
      L.headW * 0.70
    );
    whiteBlend.addColorStop(0, "rgba(255,252,244,.70)");
    whiteBlend.addColorStop(0.42, "rgba(255,252,244,.42)");
    whiteBlend.addColorStop(1, "rgba(255,252,244,0)");

    ctx.fillStyle = whiteBlend;
    ctx.beginPath();
    ctx.ellipse(headX, neckTop + neckH * 0.72, L.headW * 0.54, L.headH * 0.30, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "screen";
    ctx.strokeStyle = "rgba(255,236,176,.38)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(headX, neckTop + L.headH * 0.02);
    ctx.lineTo(headX, neckTop + neckH + L.headH * 0.08);
    ctx.stroke();

    ctx.restore();
  }

  function drawTopHeadFallback(ctx, x, y, L, lean) {
    ctx.save();

    const topAlpha = 0.25 + lean * 0.75;
    const hairW = L.headW * (0.70 + lean * 0.20);
    const hairH = L.headH * (0.28 + lean * 0.22);

    const g = ctx.createRadialGradient(x - hairW * 0.15, y - hairH * 0.10, 2, x, y, hairW * 0.62);
    g.addColorStop(0, "rgba(132,82,38,.95)");
    g.addColorStop(0.42, "rgba(79,43,23,.96)");
    g.addColorStop(1, "rgba(34,20,14,.94)");

    ctx.globalAlpha = topAlpha;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, hairW * 0.50, hairH * 0.50, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,220,160,.26)";
    ctx.lineWidth = 1.2;

    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      const rx = Math.cos(a) * hairW * (0.33 + 0.08 * Math.sin(i * 1.7));
      const ry = Math.sin(a) * hairH * (0.33 + 0.08 * Math.cos(i * 1.3));
      ctx.beginPath();
      ctx.arc(x + rx, y + ry, Math.max(2.5, L.headW * 0.025), 0, Math.PI * 2);
      ctx.stroke();
    }

    const shine = ctx.createRadialGradient(x, y, 0, x, y, hairW * 0.45);
    shine.addColorStop(0, "rgba(255,215,145,.24)");
    shine.addColorStop(1, "rgba(255,215,145,0)");
    ctx.fillStyle = shine;
    ctx.beginPath();
    ctx.ellipse(x, y, hairW * 0.48, hairH * 0.48, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawHeadVertical(ctx, L, t) {
    const head = loadImage("head", ASSETS.head);
    const maybeTop = tryLoadTopHead();

    const lean = verticalLean(t);

    const headX = L.headCx;
    const headY = L.headCy + lean * L.headH * 0.12;

    drawNeckBridge(ctx, L, headX, headY, lean);

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.18)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;

    const faceScaleY = 1 - lean * 0.34;
    const faceAlpha = 1 - lean * 0.14;

    drawContain(
      ctx,
      head,
      headX,
      headY + lean * L.headH * 0.08,
      L.headW,
      L.headH,
      lean * 0.010,
      1 + lean * 0.025,
      faceScaleY,
      faceAlpha
    );

    ctx.restore();

    const topX = headX;
    const topY = headY - L.headH * (0.16 + lean * 0.05);

    if (ready(maybeTop)) {
      drawContain(
        ctx,
        maybeTop,
        topX,
        topY,
        L.headW * (0.78 + lean * 0.22),
        L.headH * (0.50 + lean * 0.18),
        0,
        1,
        1,
        0.28 + lean * 0.72
      );
    } else {
      drawTopHeadFallback(ctx, topX, topY, L, lean);
    }

    return {
      x: L.templeX,
      y: L.templeY + (lean * 2 - 1) * L.headH * 0.36,
      lean
    };
  }

  function drawFocus(ctx, x, y, size, t) {
    aura(ctx, x, y, size * 3.4, "rgba(255,230,140,.34)");

    ctx.save();

    ctx.fillStyle = "#ffe27b";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.58)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, size + 7 + Math.sin(t * 4) * 1.8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function label(ctx, x, y, text) {
    ctx.save();

    ctx.font = "600 14px Inter, Segoe UI, sans-serif";
    const width = Math.ceil(ctx.measureText(String(text)).width) + 24;

    roundRect(ctx, x, y, width, 34, 999);
    ctx.fillStyle = "rgba(5,9,16,.72)";
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.10)";
    ctx.stroke();

    ctx.fillStyle = "#eef6ff";
    ctx.fillText(String(text), x + 12, y + 22);

    ctx.restore();
  }

  function drawVerticalScene(canvas, t) {
    const kit = resizeCanvas(canvas);
    if (!kit) return;

    const ctx = kit.ctx;
    const w = kit.w;
    const h = kit.h;

    const L = layout(w, h);

    drawBackground(ctx, w, h);
    drawHalo(ctx, L, w, h);
    drawWhiteUnifier(ctx, L);
    drawVerticalPath(ctx, L, verticalLean(t));
    drawBody(ctx, L);

    const focus = drawHeadVertical(ctx, L, t);

    drawFocus(ctx, focus.x, focus.y, 13, t);

    label(ctx, 20, 20, "Balancement vertical · hochement avant");
    label(ctx, 20, 56, "Sommet du crâne visible · retour neutre");
  }

  function loop(now) {
    const t = now / 1000;

    removeForbiddenSwingOptions();

    if (currentSwing() !== "vertical") {
      requestAnimationFrame(loop);
      return;
    }

    try {
      const canvas = byId("mixagePreviewCanvas");
      if (canvas) drawVerticalScene(canvas, t);
    } catch (e) {}

    try {
      const canvas = byId("dashboardCanvas");
      if (canvas) drawVerticalScene(canvas, t * 0.96);
    } catch (e) {}

    try {
      const canvas = byId("practicePreviewCanvas");
      if (canvas && practiceIsMixage()) drawVerticalScene(canvas, t);
    } catch (e) {}

    try {
      const overlay = byId("stageOverlay");
      const canvas = byId("stageCanvas");
      const open = overlay && !overlay.classList.contains("hidden");
      if (canvas && open && practiceIsMixage()) drawVerticalScene(canvas, t);
    } catch (e) {}

    requestAnimationFrame(loop);
  }

  function boot() {
    removeForbiddenSwingOptions();
    setInterval(removeForbiddenSwingOptions, 1000);

    document.addEventListener("change", function (event) {
      if (event.target && (event.target.id === "mixageSwing" || event.target.id === "sessionSwing")) {
        removeForbiddenSwingOptions();
      }
    });

    console.info("[AXIS LUMEN]", VERSION, "actif");
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
