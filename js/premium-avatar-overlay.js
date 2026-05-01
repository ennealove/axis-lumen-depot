(function () {
  "use strict";

  const VERSION = "premium-avatar-overlay-surgical-20260430";

  const ASSETS = {
    busteFace: "assets/images/buste_face.png",
    busteProfil: "assets/images/buste_profil.png",
    teteFace: "assets/images/tete_face.png",
    teteProfil: "assets/images/tete_profil.png",
    halo: "assets/images/halo_lumineux.png"
  };

  const raw = {};
  const clean = {};
  const failed = new Set();

  const SWINGS = {
  lateral: {
    label: "Latéral",
    mantra: "ILLI",
    rhythm: 2,
    rhythmSeconds: 2,
    rhythmText: "2 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Balancement latéral : oreille vers épaule, gauche puis droite, buste stable."
  },
  vertical: {
    label: "Vertical",
    mantra: "ALLA",
    rhythm: 2,
    rhythmSeconds: 2,
    rhythmText: "2 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Balancement vertical : hochement doux vers l'avant puis retour neutre, sans brusquer la nuque."
  },
  rotation: {
    label: "Rotation",
    mantra: "RORO",
    rhythm: 3,
    rhythmSeconds: 3,
    rhythmText: "3 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Rotation douce de la tête. Alterner horaire et antihoraire pour compenser."
  }
};

  function $(selector) {
    return document.querySelector(selector);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function getImage(key) {
    if (raw[key]) return raw[key];

    const img = new Image();
    img.decoding = "async";
    img.src = ASSETS[key];

    raw[key] = img;
    return img;
  }

  function isReady(img) {
    return img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0;
  }

  function getCleanImage(key) {
    const img = getImage(key);
    if (!isReady(img)) return img;
    if (clean[key]) return clean[key];
    if (failed.has(key)) return img;

    try {
      clean[key] = removeFalseTransparencyAndTrim(img, key);
      return clean[key] || img;
    } catch (e) {
      console.warn("[AXIS PREMIUM] Nettoyage image impossible :", key, e);
      failed.add(key);
      return img;
    }
  }

  function removeFalseTransparencyAndTrim(img, key) {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const maxSide = key.includes("tete") ? 1600 : 2100;
    const ratio = Math.min(1, maxSide / Math.max(iw, ih));
    const w = Math.max(1, Math.round(iw * ratio));
    const h = Math.max(1, Math.round(ih * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    const total = w * h;

    const visited = new Uint8Array(total);
    const qx = new Int32Array(total);
    const qy = new Int32Array(total);
    let qs = 0;
    let qe = 0;

    function indexOf(x, y) {
      return y * w + x;
    }

    function isBackgroundPixel(i) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a < 12) return true;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const lum = (r + g + b) / 3;
      const sat = max - min;

      if (lum > 218 && sat < 42) return true;
      if (lum > 170 && sat < 24) return true;

      const greyCheck =
        Math.abs(r - g) < 18 &&
        Math.abs(g - b) < 18 &&
        lum > 140 &&
        lum < 245;

      if (greyCheck) return true;

      return false;
    }

    function push(x, y) {
      if (x < 0 || y < 0 || x >= w || y >= h) return;

      const idx = indexOf(x, y);
      if (visited[idx]) return;

      const i = idx * 4;
      if (!isBackgroundPixel(i)) return;

      visited[idx] = 1;
      qx[qe] = x;
      qy[qe] = y;
      qe++;
    }

    for (let x = 0; x < w; x++) {
      push(x, 0);
      push(x, h - 1);
    }

    for (let y = 0; y < h; y++) {
      push(0, y);
      push(w - 1, y);
    }

    while (qs < qe) {
      const x = qx[qs];
      const y = qy[qs];
      qs++;

      push(x + 1, y);
      push(x - 1, y);
      push(x, y + 1);
      push(x, y - 1);
    }

    for (let idx = 0; idx < total; idx++) {
      if (!visited[idx]) continue;
      const i = idx * 4;
      data[i + 3] = 0;
    }

    ctx.putImageData(imageData, 0, 0);

    const after = ctx.getImageData(0, 0, w, h).data;

    let minX = w;
    let minY = h;
    let maxX = 0;
    let maxY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = after[(y * w + x) * 4 + 3];
        if (a > 12) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX >= maxX || minY >= maxY) return canvas;

    const pad = key.includes("tete") ? 10 : 16;

    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w - 1, maxX + pad);
    maxY = Math.min(h - 1, maxY + pad);

    const tw = maxX - minX + 1;
    const th = maxY - minY + 1;

    const out = document.createElement("canvas");
    out.width = tw;
    out.height = th;

    const ox = out.getContext("2d");
    ox.imageSmoothingEnabled = true;
    ox.imageSmoothingQuality = "high";
    ox.drawImage(canvas, minX, minY, tw, th, 0, 0, tw, th);

    return out;
  }

  function resizeCanvas(canvas) {
    if (!canvas) return null;

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
    if (!ctx) return null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    return { ctx, w: cssW, h: cssH };
  }

  function drawImageContain(ctx, image, cx, cy, boxW, boxH, rotation = 0, scale = 1, alpha = 1) {
    if (!isReady(image) && !(image instanceof HTMLCanvasElement)) return null;

    const iw = image.naturalWidth || image.width;
    const ih = image.naturalHeight || image.height;

    if (!iw || !ih) return null;

    const ratio = iw / ih;

    let w = boxW;
    let h = w / ratio;

    if (h > boxH) {
      h = boxH;
      w = h * ratio;
    }

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, -w / 2, -h / 2, w, h);
    ctx.restore();

    return { w, h };
  }

  function currentSwingKey() {
    const select = byId("mixageSwing") || byId("sessionSwing");
    return select?.value || "lateral";
  }

  function normalizeSwing(key) {
    if (key === "anteroPosterior") return "anteroPosterior";
    if (key === "antero") return "anteroPosterior";
    return key || "lateral";
  }

  function swingInfo(key) {
    key = normalizeSwing(key);
    return SWINGS[key] || SWINGS.lateral;
  }

  function layout(w, h, isProfile) {
    const cx = w * (isProfile ? 0.42 : 0.405);
    const cy = h * 0.61;

    const bodyH = Math.min(h * 0.76, w * (isProfile ? 0.76 : 0.86));
    const bodyW = bodyH * (isProfile ? 0.58 : 0.74);

    const bodyCx = cx;
    const bodyCy = cy + bodyH * 0.075;

    const bodyTop = bodyCy - bodyH / 2;

    const headH = bodyH * (isProfile ? 0.34 : 0.335);
    const headW = headH * (isProfile ? 0.82 : 0.82);

    const headCx = cx + (isProfile ? bodyW * 0.025 : 0);
    const headCy = bodyTop + headH * 0.145;

    const templeY = headCy - headH * 0.01;
    const templeX = headCx;

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
      templeX,
      templeY,
      whiteCx: cx,
      whiteCy: cy - bodyH * 0.08,
      whiteW: bodyW * 1.26,
      whiteH: bodyH * 1.14
    };
  }

  function movementSegment(t) {
    const simulatedElapsed = (t * 18) % 180;

    if (simulatedElapsed < 60) {
      return { label: "GRAND", amplitude: 1 };
    }

    if (simulatedElapsed < 120) {
      return { label: "PETIT", amplitude: 0.34 };
    }

    return { label: "GRAND", amplitude: 1 };
  }

  function poseFor(key, t, L, amplitude, focusMode) {
    key = normalizeSwing(key);

    const info = swingInfo(key);
    const rhythm = info.rhythm || 2;
    const p = ((t % rhythm) / rhythm) * Math.PI * 2;

    const s = Math.sin(p);
    const c = Math.cos(p);

    const outerX = focusMode === "outer" ? L.headW * 1.45 : L.headW * 0.36;
    const outerY = focusMode === "outer" ? L.headH * 0.72 : L.headH * 0.22;

    const pose = {
      headDx: 0,
      headDy: 0,
      rotation: 0,
      scale: 1,
      dotX: L.templeX,
      dotY: L.templeY
    };

    if (key === "lateral") {
      pose.headDx = s * L.headW * 0.065 * amplitude;
      pose.headDy = Math.sin(p * 2) * L.headH * 0.006 * amplitude;
      pose.rotation = s * 0.060 * amplitude;
      pose.dotX = L.templeX + s * outerX;
      pose.dotY = L.templeY;
      return pose;
    }

    if (key === "vertical") {
      pose.headDy = s * L.headH * 0.080 * amplitude;
      pose.rotation = s * 0.020 * amplitude;
      pose.dotX = L.templeX;
      pose.dotY = L.templeY + s * outerY;
      return pose;
    }

    if (key === "anteroPosterior") {
      pose.headDx = s * L.headW * 0.125 * amplitude;
      pose.headDy = c * L.headH * 0.008 * amplitude;
      pose.scale = 1 + s * 0.040 * amplitude;
      pose.rotation = s * 0.010 * amplitude;
      pose.dotX = L.templeX + s * outerX * 0.52;
      pose.dotY = L.templeY + c * outerY * 0.055;
      return pose;
    }

    if (key === "figure8") {
      pose.headDx = s * L.headW * 0.052 * amplitude;
      pose.headDy = Math.sin(p * 2) * L.headH * 0.052 * amplitude;
      pose.rotation = s * 0.045 * amplitude;
      pose.dotX = L.templeX + s * outerX * 0.86;
      pose.dotY = L.templeY + Math.sin(p * 2) * outerY * 0.78;
      return pose;
    }

    if (key === "horseshoe") {
      const u = (t % rhythm) / rhythm;

      const p0 = {
        x: L.templeX + outerX * 0.84,
        y: L.templeY - outerY * 0.10
      };

      const p1 = {
        x: L.templeX,
        y: L.templeY + outerY * 0.92
      };

      const p2 = {
        x: L.templeX - outerX * 0.84,
        y: L.templeY - outerY * 0.10
      };

      pose.dotX = (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * p1.x + u * u * p2.x;
      pose.dotY = (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * p1.y + u * u * p2.y;

      pose.headDx = (0.5 - u) * L.headW * 0.055 * amplitude;
      pose.headDy = Math.sin(u * Math.PI) * L.headH * 0.030 * amplitude;
      pose.rotation = (0.5 - u) * 0.055 * amplitude;
      return pose;
    }

    if (key === "cross") {
      pose.headDx = s * L.headW * 0.040 * amplitude;
      pose.headDy = Math.sin(p + Math.PI / 2) * L.headH * 0.040 * amplitude;
      pose.rotation = s * 0.034 * amplitude;
      pose.dotX = L.templeX + s * outerX;
      pose.dotY = L.templeY + Math.sin(p + Math.PI / 2) * outerY;
      return pose;
    }

    const r = focusMode === "outer" ? L.headW * 0.62 : L.headW * 0.18;

    pose.headDx = Math.cos(p) * L.headW * 0.026 * amplitude;
    pose.headDy = Math.sin(p) * L.headH * 0.026 * amplitude;
    pose.rotation = Math.sin(p) * 0.048 * amplitude;
    pose.dotX = L.templeX + Math.cos(p) * r;
    pose.dotY = L.templeY + Math.sin(p) * r;

    return pose;
  }

  function drawBackground(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#050914");
    g.addColorStop(0.52, "#081522");
    g.addColorStop(1, "#02050c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const aura = ctx.createRadialGradient(w * 0.38, h * 0.28, 10, w * 0.38, h * 0.28, w * 0.58);
    aura.addColorStop(0, "rgba(115,199,255,.16)");
    aura.addColorStop(1, "rgba(115,199,255,0)");
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, w, h);

    const gold = ctx.createRadialGradient(w * 0.76, h * 0.18, 0, w * 0.76, h * 0.18, w * 0.46);
    gold.addColorStop(0, "rgba(255,211,107,.16)");
    gold.addColorStop(1, "rgba(255,211,107,0)");
    ctx.fillStyle = gold;
    ctx.fillRect(0, 0, w, h);
  }

  function drawAura(ctx, x, y, r, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
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
    const halo = getCleanImage("halo");

    drawAura(ctx, L.templeX, L.templeY, Math.min(w, h) * 0.46, "rgba(255,211,107,.13)");

    if (isReady(halo) || halo instanceof HTMLCanvasElement) {
      drawImageContain(ctx, halo, L.templeX, L.templeY, Math.min(w, h) * 0.74, Math.min(w, h) * 0.74, 0, 1, 0.36);
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

  function drawPath(ctx, key, L, focusMode) {
    key = normalizeSwing(key);

    const pathX = focusMode === "outer" ? L.headW * 1.45 : L.headW * 0.36;
    const pathY = focusMode === "outer" ? L.headH * 0.72 : L.headH * 0.22;

    ctx.save();
    ctx.strokeStyle = focusMode === "outer" ? "rgba(255,226,150,.36)" : "rgba(255,255,255,.18)";
    ctx.lineWidth = focusMode === "outer" ? 2.6 : 1.8;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();

    if (key === "lateral") {
      ctx.moveTo(L.templeX - pathX, L.templeY);
      ctx.lineTo(L.templeX + pathX, L.templeY);
    } else if (key === "vertical") {
      ctx.moveTo(L.templeX, L.templeY - pathY);
      ctx.lineTo(L.templeX, L.templeY + pathY);
    } else if (key === "anteroPosterior") {
      ctx.ellipse(L.templeX, L.templeY, pathX * 0.52, pathY * 0.28, 0, 0, Math.PI * 2);
    } else if (key === "figure8") {
      for (let a = -Math.PI; a <= Math.PI; a += 0.055) {
        const x = L.templeX + Math.sin(a) * pathX * 0.84;
        const y = L.templeY + Math.sin(a * 2) * pathY * 0.78;
        if (a === -Math.PI) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    } else if (key === "horseshoe") {
      ctx.moveTo(L.templeX + pathX * 0.84, L.templeY - pathY * 0.10);
      ctx.quadraticCurveTo(L.templeX, L.templeY + pathY * 0.92, L.templeX - pathX * 0.84, L.templeY - pathY * 0.10);
    } else if (key === "cross") {
      ctx.moveTo(L.templeX - pathX, L.templeY);
      ctx.lineTo(L.templeX + pathX, L.templeY);
      ctx.moveTo(L.templeX, L.templeY - pathY);
      ctx.lineTo(L.templeX, L.templeY + pathY);
    } else {
      ctx.arc(L.templeX, L.templeY, Math.max(pathX * 0.44, 26), 0, Math.PI * 2);
    }

    ctx.stroke();
    ctx.restore();
  }

  function drawAvatar(ctx, L, pose, isProfile, t) {
    const body = getCleanImage(isProfile ? "busteProfil" : "busteFace");
    const head = getCleanImage(isProfile ? "teteProfil" : "teteFace");

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.16)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    drawImageContain(ctx, body, L.bodyCx, L.bodyCy, L.bodyW, L.bodyH, 0, 1, 1);
    ctx.restore();

    drawNeckBridge(ctx, L, pose);
    drawCentralAxis(ctx, L, t);

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.18)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;

    drawImageContain(
      ctx,
      head,
      L.headCx + pose.headDx,
      L.headCy + pose.headDy,
      L.headW,
      L.headH,
      pose.rotation,
      pose.scale,
      1
    );

    ctx.restore();
  }

  function drawNeckBridge(ctx, L, pose) {
    const hx = L.headCx + pose.headDx;
    const hy = L.headCy + pose.headDy;

    const neckTop = hy + L.headH * 0.34;
    const neckBottom = L.bodyTop + L.bodyH * 0.145;
    const neckH = Math.max(24, neckBottom - neckTop);
    const neckW = L.headW * 0.34;

    ctx.save();

    // Ombre douce sous le menton, pour éviter l'effet tête découpée.
    const shadow = ctx.createRadialGradient(
      hx,
      neckTop + neckH * 0.10,
      2,
      hx,
      neckTop + neckH * 0.10,
      L.headW * 0.48
    );
    shadow.addColorStop(0, "rgba(80,50,30,.20)");
    shadow.addColorStop(0.45, "rgba(80,50,30,.08)");
    shadow.addColorStop(1, "rgba(80,50,30,0)");
    ctx.fillStyle = shadow;
    ctx.beginPath();
    ctx.ellipse(hx, neckTop + neckH * 0.12, L.headW * 0.36, L.headH * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Colonne de cou réelle : elle relie la base de la tête au haut du vêtement.
    const neckGrad = ctx.createLinearGradient(hx, neckTop, hx, neckTop + neckH);
    neckGrad.addColorStop(0, "rgba(238,198,166,.98)");
    neckGrad.addColorStop(0.45, "rgba(245,218,190,.96)");
    neckGrad.addColorStop(1, "rgba(250,240,222,.92)");

    ctx.fillStyle = neckGrad;
    roundRect(ctx, hx - neckW / 2, neckTop, neckW, neckH + L.headH * 0.12, neckW * 0.34);
    ctx.fill();

    // Halo blanc-crème qui uniformise le fond de la tête et du buste.
    const whiteBlend = ctx.createRadialGradient(
      hx,
      neckTop + neckH * 0.70,
      0,
      hx,
      neckTop + neckH * 0.70,
      L.headW * 0.72
    );
    whiteBlend.addColorStop(0, "rgba(255,252,244,.92)");
    whiteBlend.addColorStop(0.42, "rgba(255,252,244,.62)");
    whiteBlend.addColorStop(1, "rgba(255,252,244,0)");

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = whiteBlend;
    ctx.beginPath();
    ctx.ellipse(hx, neckTop + neckH * 0.72, L.headW * 0.58, L.headH * 0.34, 0, 0, Math.PI * 2);
    ctx.fill();

    // Re-dessin subtil du cou par-dessus le halo blanc.
    ctx.fillStyle = neckGrad;
    roundRect(ctx, hx - neckW * 0.43, neckTop + L.headH * 0.02, neckW * 0.86, neckH + L.headH * 0.06, neckW * 0.28);
    ctx.fill();

    // Petite lumière verticale pour fondre la jonction avec l'axe lumineux du buste.
    ctx.globalCompositeOperation = "screen";
    const light = ctx.createLinearGradient(hx, neckTop, hx, neckTop + neckH + L.headH * 0.20);
    light.addColorStop(0, "rgba(255,246,210,0)");
    light.addColorStop(0.42, "rgba(255,235,170,.34)");
    light.addColorStop(1, "rgba(255,246,210,0)");

    ctx.strokeStyle = light;
    ctx.lineWidth = Math.max(1.5, L.headW * 0.025);
    ctx.beginPath();
    ctx.moveTo(hx, neckTop + L.headH * 0.04);
    ctx.lineTo(hx, neckTop + neckH + L.headH * 0.16);
    ctx.stroke();

    ctx.restore();
  }

  function drawCentralAxis(ctx, L, t) {
    const pulse = 0.52 + Math.sin(t * 2.6) * 0.10;

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    ctx.strokeStyle = `rgba(255,236,176,${pulse})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(L.cx, L.headCy + L.headH * 0.36);
    ctx.lineTo(L.cx, L.bodyTop + L.bodyH * 0.62);
    ctx.stroke();

    const heartY = L.bodyTop + L.bodyH * 0.31;
    const rg = ctx.createRadialGradient(L.cx, heartY, 0, L.cx, heartY, L.bodyW * 0.23);
    rg.addColorStop(0, "rgba(255,255,240,.82)");
    rg.addColorStop(0.26, "rgba(255,226,134,.42)");
    rg.addColorStop(1, "rgba(255,226,134,0)");

    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(L.cx, heartY, L.bodyW * 0.23, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawFocus(ctx, x, y, size, t) {
    drawAura(ctx, x, y, size * 3.4, "rgba(255,230,140,.34)");

    ctx.save();

    ctx.fillStyle = "#ffe27b";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255,255,255,${0.48 + Math.sin(t * 4) * 0.12})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, size + 7 + Math.sin(t * 4) * 1.8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawTrail(ctx, key, L, t, amplitude, focusMode) {
    ctx.save();

    for (let i = 6; i >= 1; i--) {
      const p = poseFor(key, t - i * 0.055, L, amplitude, focusMode);
      ctx.globalAlpha = 0.055 * (7 - i);

      drawAura(ctx, p.dotX, p.dotY, 18, "rgba(255,226,120,.42)");

      ctx.fillStyle = "rgba(255,226,120,.72)";
      ctx.beginPath();
      ctx.arc(p.dotX, p.dotY, 4 + i * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function label(ctx, x, y, text) {
    ctx.save();

    ctx.font = "600 14px Inter, Segoe UI, sans-serif";
    const w = Math.ceil(ctx.measureText(String(text)).width) + 24;

    roundRect(ctx, x, y, w, 34, 999);
    ctx.fillStyle = "rgba(5,9,16,.72)";
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.10)";
    ctx.stroke();

    ctx.fillStyle = "#eef6ff";
    ctx.fillText(String(text), x + 12, y + 22);

    ctx.restore();
  }

  function drawObject(ctx, key, x, y, size) {
    const labelText = objectLabel(key);

    ctx.save();

    drawAura(ctx, x, y, size * 0.92, "rgba(255,226,130,.22)");

    ctx.fillStyle = "rgba(255,211,107,.16)";
    ctx.strokeStyle = "#f4e8a4";
    ctx.lineWidth = 3;

    if (key === "triangle") {
      ctx.beginPath();
      ctx.moveTo(x, y - size * 0.42);
      ctx.lineTo(x + size * 0.42, y + size * 0.34);
      ctx.lineTo(x - size * 0.42, y + size * 0.34);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (key === "spiral") {
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 6; a += 0.1) {
        const r = size * 0.42 * (a / (Math.PI * 6));
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, size * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = "#fff4d0";
    ctx.font = "600 12px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(labelText, x, y + size * 0.62);

    ctx.restore();
  }

  function objectLabel(key) {
    const map = {
      flower: "Fleur",
      tree: "Arbre",
      geometry: "Géométrie",
      lotus: "Lotus",
      seed: "Graine",
      spiral: "Spirale",
      triangle: "Triangle",
      star: "Étoile",
      cube: "Cube",
      sphere: "Sphère"
    };

    return map[key] || "Objet";
  }

  function drawPanel(ctx, x, y, w, h, title) {
    ctx.save();

    roundRect(ctx, x, y, w, h, 18);
    ctx.fillStyle = "rgba(6,10,18,.78)";
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,.10)";
    ctx.stroke();

    ctx.fillStyle = "#eef6ff";
    ctx.font = "600 14px Inter, Segoe UI, sans-serif";
    ctx.fillText(title, x + 14, y + 23);

    ctx.restore();
  }

  function drawScene(canvas, t, forcedKey) {
    const kit = resizeCanvas(canvas);
    if (!kit) return;

    const { ctx, w, h } = kit;

    const key = normalizeSwing(forcedKey || currentSwingKey());
    const info = swingInfo(key);
    const isProfile = info.view === "profile";

    const segment = movementSegment(t);
    const focusMode = segment.label === "PETIT" ? "inner" : "outer";

    const L = layout(w, h, isProfile);
    const pose = poseFor(key, t, L, segment.amplitude, focusMode);

    drawBackground(ctx, w, h);
    drawHalo(ctx, L, w, h);
    drawWhiteUnifier(ctx, L);
    drawPath(ctx, key, L, focusMode);
    drawTrail(ctx, key, L, t, segment.amplitude, focusMode);
    drawAvatar(ctx, L, pose, isProfile, t);
    drawFocus(ctx, pose.dotX, pose.dotY, focusMode === "outer" ? 13 : 8, t);

    const panelW = Math.min(176, w * 0.30);
    const objectKey = byId("mixageObject")?.value || byId("sessionObject")?.value || "flower";

    drawPanel(ctx, w - panelW - 24, 24, panelW, 210, "Objet observé");
    drawObject(ctx, objectKey, w - panelW / 2 - 24, 124, Math.min(84, panelW * 0.52));

    label(ctx, 20, 20, `${info.label} · ${segment.label}`);
    label(ctx, 20, 56, "Point lumineux au niveau des tempes");
    label(ctx, w - panelW - 4, 214, `Mantra ${info.mantra}`);
  }

  function activeViewId() {
    return document.querySelector(".view.active")?.id || "";
  }

  function practiceIsMixage() {
    const moduleText = (byId("statusModule")?.textContent || "").toLowerCase();
    const phaseText = (byId("statusPhase")?.textContent || "").toLowerCase();
    const active = activeViewId();

    if (active === "mixage") return true;
    if (active === "pratique" && moduleText.includes("oscillation")) return true;
    if (phaseText.includes("mixage")) return true;
    if (phaseText.includes("oscillation")) return true;

    return false;
  }

  function loop(now) {
    const t = now / 1000;

    try {
      const c = byId("mixagePreviewCanvas");
      if (c) drawScene(c, t);
    } catch (e) {}

    try {
      const c = byId("dashboardCanvas");
      if (c) drawScene(c, t * 0.96);
    } catch (e) {}

    try {
      const c = byId("practicePreviewCanvas");
      if (c && practiceIsMixage()) drawScene(c, t);
    } catch (e) {}

    try {
      const overlay = byId("stageOverlay");
      const c = byId("stageCanvas");
      const open = overlay && !overlay.classList.contains("hidden");
      if (c && open && practiceIsMixage()) drawScene(c, t);
    } catch (e) {}

    requestAnimationFrame(loop);
  }

    function ensureOnlyAllowedSwingOptions() {
    const allowed = new Set(["lateral", "vertical", "rotation", "circle"]);
    const selects = [byId("mixageSwing"), byId("sessionSwing")].filter(Boolean);

    selects.forEach((select) => {
      Array.from(select.options).forEach((opt) => {
        if (!allowed.has(opt.value)) {
          opt.remove();
        }
      });

      if (!allowed.has(select.value)) {
        select.value = "lateral";
      }
    });
  }

  function ensureAnteroOption() {
    const allowed = new Set(["lateral", "vertical", "rotation"]);
    ["mixageSwing", "sessionSwing"].forEach(function (id) {
      const select = document.getElementById(id);
      if (!select) return;
      Array.from(select.options).forEach(function (opt) {
        if (!allowed.has(opt.value)) opt.remove();
      });
      if (!allowed.has(select.value)) select.value = "lateral";
    });
}
    });
  }

  function boot() {
    ensureOnlyAllowedSwingOptions();
    ensureAnteroOption();
    console.info("[AXIS LUMEN]", VERSION, "actif");
    setInterval(ensureOnlyAllowedSwingOptions, 800);
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();


