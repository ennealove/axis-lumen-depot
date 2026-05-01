import { $ } from "../core/dom.js";
import { OBJECTS, SWINGS, state } from "../core/state.js";

const ASSETS = {
  busteFace: "assets/images/buste_face.png",
  busteProfil: "assets/images/buste_profil.png",
  teteFace: "assets/images/tete_face.png",
  teteProfil: "assets/images/tete_profil.png",
  halo: "assets/images/halo_lumineux.png"
};

const cache = {};

function img(key) {
  if (!cache[key]) {
    const i = new Image();
    i.decoding = "async";
    i.src = ASSETS[key];
    cache[key] = i;
  }
  return cache[key];
}

function ok(i) {
  return i && i.complete && i.naturalWidth > 0;
}

function contain(ctx, image, cx, cy, boxW, boxH, rot = 0, scale = 1, alpha = 1) {
  if (!ok(image)) return false;
  const ratio = image.naturalWidth / image.naturalHeight;
  let w = boxW;
  let h = w / ratio;
  if (h > boxH) {
    h = boxH;
    w = h * ratio;
  }
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.scale(scale, scale);
  ctx.drawImage(image, -w / 2, -h / 2, w, h);
  ctx.restore();
  return { w, h };
}

function getFigureLayout(w, h, isProfile) {
  const figureCx = w * (isProfile ? 0.42 : 0.40);
  const figureCy = h * 0.60;

  const bodyH = Math.min(h * 0.78, w * (isProfile ? 0.74 : 0.80));
  const bodyW = bodyH * (isProfile ? 0.62 : 0.78);
  const bodyCx = figureCx;
  const bodyCy = figureCy + bodyH * 0.06;

  const headH = bodyH * (isProfile ? 0.31 : 0.29);
  const headW = headH * (isProfile ? 0.90 : 0.88);
  const headCx = figureCx + (isProfile ? bodyW * 0.035 : 0);
  const headCy = figureCy - bodyH * (isProfile ? 0.205 : 0.215);

  const swingCx = headCx;
  const swingCy = headCy - headH * 0.02;

  const plateW = bodyW * 1.08;
  const plateH = bodyH * 1.18;
  const plateCx = figureCx;
  const plateCy = figureCy - bodyH * 0.02;

  return {
    figureCx,
    figureCy,
    bodyCx,
    bodyCy,
    bodyW,
    bodyH,
    headCx,
    headCy,
    headW,
    headH,
    swingCx,
    swingCy,
    plateCx,
    plateCy,
    plateW,
    plateH
  };
}

export function getPremiumMixageSegment(elapsed) {
  if (elapsed < 60) return { index: 0, movement: "GRAND", guidance: "Grand mouvement · mantra à voix haute.", amplitude: 1 };
  if (elapsed < 120) return { index: 1, movement: "PETIT", guidance: "Petit mouvement · mantra intérieur.", amplitude: 0.45 };
  return { index: 2, movement: "GRAND", guidance: "Grand mouvement · projection mentale.", amplitude: 1 };
}

function readMixageConfig() {
  return {
    objectKey: $("#mixageObject")?.value || "flower",
    swingKey: $("#mixageSwing")?.value || "lateral",
    durationMin: Number($("#mixageDuration")?.value || 15),
    audioId: $("#mixageAudio")?.value || ""
  };
}

export function drawDashboard(t) {
  const canvas = $("#dashboardCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const swingKey = $("#mixageSwing")?.value || "lateral";
  drawBackground(ctx, canvas.width, canvas.height);
  drawMixageScene(ctx, canvas.width, canvas.height, {
    objectKey: $("#mixageObject")?.value || "flower",
    swingKey
  }, t, 0.85, "GRAND");
  drawCardLabel(ctx, 20, 20, "Grand / Petit / Grand");
  drawCardLabel(ctx, canvas.width - 220, 20, `${SWINGS[swingKey]?.mantra || "ILLI"} · ${SWINGS[swingKey]?.rhythmText || "2 s"}`);
}

export function drawMixagePreview(t) {
  const canvas = $("#mixagePreviewCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cfg = readMixageConfig();
  const seg = getPremiumMixageSegment((t * 18) % 180);
  drawBackground(ctx, canvas.width, canvas.height);
  drawMixageScene(ctx, canvas.width, canvas.height, cfg, t * 1.2, seg.amplitude, seg.movement);
}

export function drawMixageScene(ctx, w, h, cfg = {}, t = 0, amplitude = 1, movementLabel = "GRAND") {
  const swingKey = cfg.swingKey || "lateral";
  const swing = SWINGS[swingKey] || SWINGS.lateral;
  const focusMode = movementLabel === "PETIT" ? "inner" : "outer";
  const isProfile = swingKey === "anteroPosterior" || swingKey === "antero" || swing.assetMode === "profile";
  const layout = getFigureLayout(w, h, isProfile);

  const pathW = focusMode === "outer" ? layout.headW * 0.92 : layout.headW * 0.32;
  const pathH = focusMode === "outer" ? layout.headH * 0.72 : layout.headH * 0.26;

  drawBackground(ctx, w, h);
  drawAura(ctx, layout.figureCx, layout.figureCy - layout.bodyH * 0.08, Math.min(w, h) * 0.42, "rgba(255,211,107,.11)");
  drawHalo(ctx, layout.figureCx, layout.figureCy - layout.bodyH * 0.14, Math.min(w, h) * 0.58);
  drawFigurePlate(ctx, layout.plateCx, layout.plateCy, layout.plateW, layout.plateH);
  drawSwingPath(ctx, swingKey, layout.swingCx, layout.swingCy, pathW, pathH, focusMode);

  const pose = swingPose(swingKey, t, amplitude, layout.swingCx, layout.swingCy, focusMode, layout);
  drawPerson(ctx, layout, pose, isProfile, focusMode);
  drawFocusPoint(ctx, pose.dot.x, pose.dot.y, focusMode === "outer" ? 14 : 9, t);

  const panelW = Math.min(174, w * 0.30);
  drawInsetPanel(ctx, w - panelW - 24, 24, panelW, 214, "Objet observé");
  drawObject(ctx, cfg.objectKey || "flower", w - panelW / 2 - 24, 122, Math.min(82, panelW * 0.52));
  drawCardLabel(ctx, w - panelW - 4, 214, `Mantra ${swing.mantra || "ILLI"}`);

  drawCardLabel(ctx, 20, 20, `${swing.label || "Latéral"} · ${movementLabel}`);
  drawCardLabel(ctx, 20, 56, focusMode === "outer" ? "Point externe · grand mouvement" : "Point interne · petit mouvement");
}

function drawPerson(ctx, layout, pose, isProfile, focusMode) {
  const body = img(isProfile ? "busteProfil" : "busteFace");
  const head = img(isProfile ? "teteProfil" : "teteFace");

  drawAura(ctx, layout.figureCx, layout.figureCy - layout.bodyH * 0.10, layout.bodyH * 0.50, "rgba(115,199,255,.09)");

  const bodyDrawn = contain(ctx, body, layout.bodyCx, layout.bodyCy, layout.bodyW, layout.bodyH);
  if (!bodyDrawn) {
    fallbackBody(ctx, layout.bodyCx, layout.bodyCy, layout.bodyW, layout.bodyH);
  }

  const headX = layout.headCx + pose.headDx;
  const headY = layout.headCy + pose.headDy;
  const headDrawn = contain(ctx, head, headX, headY, layout.headW, layout.headH, pose.rotation, pose.scale);
  if (!headDrawn) {
    fallbackHead(ctx, headX, headY, layout.headW, layout.headH, pose.rotation, pose.scale);
  }

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const g = ctx.createLinearGradient(layout.figureCx, layout.figureCy - layout.bodyH * 0.46, layout.figureCx, layout.figureCy + layout.bodyH * 0.18);
  g.addColorStop(0, "rgba(255,240,190,0)");
  g.addColorStop(0.42, "rgba(255,224,120,.19)");
  g.addColorStop(1, "rgba(255,224,120,0)");
  ctx.strokeStyle = g;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(layout.figureCx, layout.figureCy - layout.bodyH * 0.42);
  ctx.lineTo(layout.figureCx, layout.figureCy + layout.bodyH * 0.18);
  ctx.stroke();
  ctx.restore();

  if (focusMode === "inner") {
    drawAura(ctx, layout.figureCx, layout.figureCy - layout.bodyH * 0.05, 72, "rgba(255,224,120,.14)");
  }
}

function drawFigurePlate(ctx, cx, cy, w, h) {
  ctx.save();

  const rg = ctx.createRadialGradient(cx, cy - h * 0.18, 10, cx, cy - h * 0.08, h * 0.72);
  rg.addColorStop(0, "rgba(255,255,255,.98)");
  rg.addColorStop(0.52, "rgba(252,249,242,.94)");
  rg.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = rg;
  ctx.beginPath();
  ctx.ellipse(cx, cy, w * 0.52, h * 0.52, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = "rgba(255,255,255,.22)";
  ctx.shadowBlur = 26;
  ctx.fillStyle = "rgba(252,249,242,.86)";
  roundedRect(ctx, cx - w * 0.34, cy - h * 0.43, w * 0.68, h * 0.86, 42);
  ctx.fill();

  ctx.restore();
}

function drawHalo(ctx, cx, cy, size) {
  const halo = img("halo");
  if (contain(ctx, halo, cx, cy, size, size, 0, 1, 0.58)) return;
  ctx.save();
  ctx.strokeStyle = "rgba(255,211,107,.18)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, size * (0.17 + i * 0.08), 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

export function swingPose(swingKey, t, amp, cx, cy, focusMode = "outer", layout = null) {
  const swing = SWINGS[swingKey] || SWINGS.lateral;
  const rhythm = swing.rhythmSeconds || 2;
  const p = ((t % rhythm) / rhythm) * Math.PI * 2;

  const headW = layout?.headW || 100;
  const headH = layout?.headH || 100;

  const outerA = focusMode === "outer" ? headW * 0.82 : headW * 0.26;
  const outerB = focusMode === "outer" ? headH * 0.62 : headH * 0.20;

  const pose = {
    headDx: 0,
    headDy: 0,
    rotation: 0,
    scale: 1,
    dot: { x: cx, y: cy }
  };

  if (swingKey === "lateral") {
    pose.headDx = Math.sin(p) * headW * 0.07 * amp;
    pose.rotation = Math.sin(p) * 0.11 * amp;
    pose.dot.x = cx + Math.sin(p) * outerA;
    pose.dot.y = cy;
  } else if (swingKey === "vertical") {
    pose.headDy = Math.sin(p) * headH * 0.15 * amp;
    pose.rotation = Math.sin(p) * 0.03 * amp;
    pose.dot.x = cx;
    pose.dot.y = cy + Math.sin(p) * outerB;
  } else if (swingKey === "anteroPosterior" || swingKey === "antero") {
    pose.headDx = Math.sin(p) * headW * 0.16 * amp;
    pose.headDy = Math.sin(p) * headH * 0.01 * amp;
    pose.scale = 1 + Math.sin(p) * 0.06 * amp;
    pose.rotation = Math.sin(p) * 0.02 * amp;
    pose.dot.x = cx + Math.sin(p) * outerA * 0.65;
    pose.dot.y = cy;
  } else if (swingKey === "figure8") {
    pose.headDx = Math.sin(p) * headW * 0.05 * amp;
    pose.headDy = Math.sin(p * 2) * headH * 0.06 * amp;
    pose.rotation = Math.sin(p) * 0.05 * amp;
    pose.dot.x = cx + Math.sin(p) * outerA * 0.88;
    pose.dot.y = cy + Math.sin(p * 2) * outerB * 0.76;
  } else if (swingKey === "cross") {
    pose.headDx = Math.sin(p) * headW * 0.04 * amp;
    pose.headDy = Math.sin(p + Math.PI / 2) * headH * 0.05 * amp;
    pose.dot.x = cx + Math.sin(p) * outerA;
    pose.dot.y = cy + Math.sin(p + Math.PI / 2) * outerB;
  } else if (swingKey === "horseshoe") {
    const u = ((t % rhythm) / rhythm);
    const p0 = { x: cx + outerA * 0.92, y: cy - outerB * 0.05 };
    const p1 = { x: cx, y: cy + outerB * 0.92 };
    const p2 = { x: cx - outerA * 0.92, y: cy - outerB * 0.05 };
    pose.dot.x = (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * p1.x + u * u * p2.x;
    pose.dot.y = (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * p1.y + u * u * p2.y;
    pose.headDx = (0.5 - u) * headW * 0.05 * amp;
    pose.headDy = Math.sin(u * Math.PI) * headH * 0.03 * amp;
    pose.rotation = (0.5 - u) * 0.08 * amp;
  } else {
    const r = focusMode === "outer" ? headW * 0.42 : headW * 0.15;
    pose.headDx = Math.cos(p) * headW * 0.025 * amp;
    pose.headDy = Math.sin(p) * headH * 0.025 * amp;
    pose.rotation = Math.sin(p) * 0.06 * amp;
    pose.dot.x = cx + Math.cos(p) * r;
    pose.dot.y = cy + Math.sin(p) * r;
  }

  return pose;
}

export function drawSwingPath(ctx, swingKey, cx, cy, ampX, ampY, focusMode = "outer") {
  ctx.save();
  ctx.lineWidth = focusMode === "outer" ? 3 : 2;
  ctx.strokeStyle = focusMode === "outer" ? "rgba(255,235,170,.24)" : "rgba(255,255,255,.13)";
  ctx.setLineDash([8, 8]);
  ctx.beginPath();

  if (swingKey === "lateral") {
    ctx.moveTo(cx - ampX, cy);
    ctx.lineTo(cx + ampX, cy);
  } else if (swingKey === "vertical") {
    ctx.moveTo(cx, cy - ampY);
    ctx.lineTo(cx, cy + ampY);
  } else if (swingKey === "anteroPosterior" || swingKey === "antero") {
    ctx.ellipse(cx, cy, ampX * 0.58, ampY * 0.34, 0, 0, Math.PI * 2);
  } else if (swingKey === "figure8") {
    for (let a = -Math.PI; a <= Math.PI; a += 0.055) {
      const x = cx + Math.sin(a) * ampX * 0.88;
      const y = cy + Math.sin(a * 2) * ampY * 0.76;
      if (a === -Math.PI) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
  } else if (swingKey === "cross") {
    ctx.moveTo(cx - ampX, cy);
    ctx.lineTo(cx + ampX, cy);
    ctx.moveTo(cx, cy - ampY);
    ctx.lineTo(cx, cy + ampY);
  } else if (swingKey === "horseshoe") {
    ctx.moveTo(cx + ampX * 0.92, cy - ampY * 0.04);
    ctx.quadraticCurveTo(cx, cy + ampY, cx - ampX * 0.92, cy - ampY * 0.04);
  } else {
    ctx.arc(cx, cy, Math.max(ampX * 0.68, 34), 0, Math.PI * 2);
  }

  ctx.stroke();
  ctx.restore();
}

export function drawBackground(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#060a13");
  g.addColorStop(0.52, "#081525");
  g.addColorStop(1, "#03060d");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const rg = ctx.createRadialGradient(w * 0.36, h * 0.28, 10, w * 0.36, h * 0.28, w * 0.62);
  rg.addColorStop(0, "rgba(115,199,255,.16)");
  rg.addColorStop(1, "rgba(115,199,255,0)");
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  const rg2 = ctx.createRadialGradient(w * 0.76, h * 0.18, 0, w * 0.76, h * 0.18, w * 0.48);
  rg2.addColorStop(0, "rgba(255,211,107,.14)");
  rg2.addColorStop(1, "rgba(255,211,107,0)");
  ctx.fillStyle = rg2;
  ctx.fillRect(0, 0, w, h);
}

export function drawAura(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function drawFocusPoint(ctx, x, y, size, t = 0) {
  drawAura(ctx, x, y, size * 3.4, "rgba(255,230,140,.30)");
  ctx.save();
  ctx.fillStyle = "#ffe27b";
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255,${0.48 + Math.sin(t * 4) * 0.12})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, size + 8 + Math.sin(t * 4) * 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function drawInsetPanel(ctx, x, y, w, h, title) {
  ctx.save();
  roundedRect(ctx, x, y, w, h, 18);
  ctx.fillStyle = "rgba(6,10,18,.78)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.08)";
  ctx.stroke();
  ctx.fillStyle = "#eef6ff";
  ctx.font = "600 14px Inter, sans-serif";
  ctx.fillText(title, x + 14, y + 23);
  ctx.restore();
}

export function drawCardLabel(ctx, x, y, text) {
  ctx.save();
  ctx.font = "600 14px Inter, sans-serif";
  const width = Math.ceil(ctx.measureText(String(text)).width) + 24;
  roundedRect(ctx, x, y, width, 34, 999);
  ctx.fillStyle = "rgba(5,9,16,.70)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,.08)";
  ctx.stroke();
  ctx.fillStyle = "#eef6ff";
  ctx.fillText(String(text), x + 12, y + 22);
  ctx.restore();
}

export function drawObject(ctx, key, x, y, size, options = {}) {
  const customImage = options.customImage || null;
  if (customImage && contain(ctx, customImage, x, y, size, size)) return;

  const obj = OBJECTS?.[key] || OBJECTS?.flower || { label: "Objet" };
  const objectImg = obj.imageKey && state.images ? state.images[obj.imageKey] : null;
  if (contain(ctx, objectImg, x, y, size, size)) return;

  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#f4e8a4";
  ctx.fillStyle = "rgba(255,211,107,.18)";

  if (key === "spiral") {
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 6; a += 0.1) {
      const r = (size * 0.45) * (a / (Math.PI * 6));
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  } else if (key === "triangle") {
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.45);
    ctx.lineTo(size * 0.42, size * 0.35);
    ctx.lineTo(-size * 0.42, size * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

export function drawObjectScene(ctx, w, h, objectKey, customImage, stage = false) {
  drawBackground(ctx, w, h);
  drawAura(ctx, w / 2, h / 2, Math.min(w, h) * 0.28, "rgba(255,211,107,.16)");
  drawObject(ctx, objectKey, w / 2, h / 2, stage ? Math.min(w, h) * 0.30 : Math.min(w, h) * 0.23, { customImage });
  drawCardLabel(ctx, 24, 24, "Observation de l’objet");
}

export function drawLightScene(ctx, w, h, stage = false, refresh = false) {
  drawBackground(ctx, w, h);
  const r = Math.min(w, h) * (stage ? 0.18 : 0.13);
  drawAura(ctx, w / 2, h / 2, r * 3.2, "rgba(255,233,151,.35)");
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, r);
  g.addColorStop(0, "#fffef2");
  g.addColorStop(0.35, "#ffe998");
  g.addColorStop(1, "#f3b73e");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
  ctx.fill();
  drawCardLabel(ctx, 24, 24, refresh ? "Recharge lumière" : "Observation lumineuse");
}

function fallbackBody(ctx, cx, cy, w, h) {
  ctx.save();
  const grad = ctx.createLinearGradient(cx, cy - h * 0.25, cx, cy + h * 0.35);
  grad.addColorStop(0, "rgba(250,247,240,.96)");
  grad.addColorStop(1, "rgba(188,160,120,.94)");
  ctx.fillStyle = grad;
  roundedRect(ctx, cx - w * 0.30, cy - h * 0.20, w * 0.60, h * 0.46, 50);
  ctx.fill();
  ctx.fillStyle = "rgba(246,241,232,.96)";
  roundedRect(ctx, cx - w * 0.09, cy - h * 0.35, w * 0.18, h * 0.18, 24);
  ctx.fill();
  ctx.restore();
}

function fallbackHead(ctx, cx, cy, w, h, rotation, scale) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  const g = ctx.createRadialGradient(-w * 0.1, -h * 0.18, 4, 0, 0, h * 0.55);
  g.addColorStop(0, "#fbebd8");
  g.addColorStop(1, "#a8765d");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.36, h * 0.43, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
