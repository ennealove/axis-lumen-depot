import { $ } from "../core/dom.js";
import { BREATH_TYPES, SWINGS, state } from "../core/state.js";
import { audioNameById } from "../core/audio.js";
import {
  drawBackground,
  drawCardLabel,
  drawMixageScene,
  drawObject,
  drawObjectScene,
  drawLightScene,
  drawAura,
  roundedRect,
  getPremiumMixageSegment
} from "../render/mixage-renderer.js";

export function refreshPreviewState() {
  const current = state.currentPreviewModule || "mixage";
  if (current === "mixage") state.currentPreviewConfig = readMixageConfig();
  if (current === "respiration") state.currentPreviewConfig = readBreathConfig();
  if (current === "gyrascope") state.currentPreviewConfig = readGyroConfig();
  if (current === "tensions") state.currentPreviewConfig = readTensionConfig();
  updateStatusFromPreview();
}

export function updateStatusFromPreview() {
  if (state.currentPhase) return;

  const module = state.currentPreviewModule || "mixage";
  let mantra = "—";
  let movement = "Prévisualisation";
  let hint = "Prépare un module puis lance-le.";
  let phase = "Prêt";

  if (module === "mixage") {
    const cfg = readMixageConfig();
    const swing = SWINGS[cfg.swingKey] || SWINGS.lateral;
    mantra = swing.mantra || "ILLI";
    movement = swing.label || "Latéral";
    hint = "Le mixage montre un buste stable et une tête séparée : grand mouvement, petit mouvement, grand mouvement.";
    phase = "Oscillation guidée";
  }

  if (module === "respiration") {
    const cfg = readBreathConfig();
    mantra = BREATH_TYPES[cfg.type]?.label || "Respiration";
    movement = "Respiration";
    hint = "Le schéma sonore accompagne les phases du souffle.";
    phase = "Respiration guidée";
  }

  if (module === "gyrascope") {
    const cfg = readGyroConfig();
    mantra = "Fixez le point";
    movement = cfg.direction === "clockwise" ? "Horaire" : "Antihoraire";
    hint = "Objet observé seul puis inséré dans le Rotor Optique.";
    phase = "Rotor Optique";
  }

  if (module === "tensions") {
    mantra = "Contractez";
    movement = "Cycle harmonique";
    hint = "Observation lumineuse puis cycle contractez, maintenez, relâchez.";
    phase = "Tensions statiques";
  }

  setText("statusModule", moduleLabel(module));
  setText("statusPhase", phase);
  setText("statusMantra", mantra);
  setText("statusMovement", movement);
  setText("statusTimer", "00:00");
  setText("statusAudio", audioNameById(currentAudioIdForPreview()) || "Aucun");
  setText("practiceHint", hint);
  setText("overlayModule", moduleLabel(module));
  setText("overlayPhase", phase);
  setText("overlayMantra", mantra);
  setText("overlayMovement", movement);
  setText("overlayGuidance", hint);
  setText("overlayTimer", "00:00");
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function currentAudioIdForPreview() {
  if (state.currentPreviewModule === "mixage") return $("#mixageAudio")?.value || "";
  if (state.currentPreviewModule === "respiration") return $("#breathAudio")?.value || "";
  if (state.currentPreviewModule === "gyrascope") return $("#gyroAudio")?.value || "";
  if (state.currentPreviewModule === "tensions") return $("#tensionAudio")?.value || "";
  return "";
}

export function showStageOverlay() {
  const overlay = $("#stageOverlay");
  if (!overlay) return;
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
}

export function hideStageOverlay() {
  const overlay = $("#stageOverlay");
  if (!overlay) return;
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
}

export function drawPracticeCanvas(t) {
  const canvas = $("#practicePreviewCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  drawCurrentScene(ctx, canvas.width, canvas.height, t);
}

export function drawStageCanvas(t) {
  const canvas = $("#stageCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  drawCurrentScene(ctx, canvas.width, canvas.height, t, true);
}

function drawCurrentScene(ctx, w, h, t, stage = false) {
  const phase = state.currentPhase;

  if (!phase) {
    drawPreviewScene(ctx, w, h, t, stage);
    return;
  }

  const elapsed = state.paused
    ? (state.pauseAt - state.phaseStart) / 1000
    : (Date.now() - state.phaseStart) / 1000;

  if (phase.kind === "object") {
    drawObjectScene(ctx, w, h, phase.objectKey, phase.customImage, stage);
    return;
  }

  if (phase.kind === "light" || phase.kind === "light-refresh") {
    drawLightScene(ctx, w, h, stage, phase.kind === "light-refresh");
    return;
  }

  if (phase.kind === "mixage") {
    const seg = getPremiumMixageSegment(elapsed);
    drawBackground(ctx, w, h);
    drawMixageScene(ctx, w, h, phase, t * 1.05, seg.amplitude, seg.movement);
    return;
  }

  if (phase.kind === "breath") {
    const seg = getPatternSegment(phase.breathPattern || makeBreathPattern(phase.breathType || "square", 4), elapsed);
    drawBreathGuide(ctx, w, h, seg.phase.label, seg.progress, phase.breathType || "square", stage);
    return;
  }

  if (phase.kind === "gyro") {
    drawGyrascope(ctx, w, h, phase.gyro || readGyroConfig(), t * 1.05, stage);
    return;
  }

  if (phase.kind === "tension") {
    const seg = getTensionSegment(phase.tension || readTensionConfig(), elapsed);
    drawTensionGuide(ctx, w, h, seg, stage);
    return;
  }

  drawPreviewScene(ctx, w, h, t, stage);
}

function drawPreviewScene(ctx, w, h, t, stage = false) {
  const module = state.currentPreviewModule || "mixage";

  if (module === "mixage") {
    const cfg = readMixageConfig();
    const seg = getPremiumMixageSegment((t * 18) % 180);
    drawBackground(ctx, w, h);
    drawMixageScene(ctx, w, h, cfg, t, seg.amplitude, seg.movement);
    return;
  }

  if (module === "respiration") {
    const cfg = readBreathConfig();
    const seg = getPatternSegment(makeBreathPattern(cfg.type, cfg.base), t * 3);
    drawBreathGuide(ctx, w, h, seg.phase.label, seg.progress, cfg.type, stage);
    return;
  }

  if (module === "gyrascope") {
    drawGyrascope(ctx, w, h, readGyroConfig(), t, stage);
    return;
  }

  drawTensionGuide(ctx, w, h, getTensionSegment(readTensionConfig(), t * 2), stage);
}

function readMixageConfig() {
  return {
    objectKey: $("#mixageObject")?.value || "flower",
    swingKey: $("#mixageSwing")?.value || "lateral",
    durationMin: Number($("#mixageDuration")?.value || 15),
    audioId: $("#mixageAudio")?.value || ""
  };
}

function readBreathConfig() {
  return {
    type: $("#breathType")?.value || "square",
    base: Number($("#breathBase")?.value || 4),
    durationMin: Number($("#breathDuration")?.value || 15),
    audioId: $("#breathAudio")?.value || ""
  };
}

function readGyroConfig() {
  return {
    objectKey: $("#gyroObject")?.value || "flower",
    direction: $("#gyroDirection")?.value || "clockwise",
    speed: Number($("#gyroSpeed")?.value || 15),
    innerColor: $("#gyroColorInner")?.value || "#ffd36b",
    outerColor: $("#gyroColorOuter")?.value || "#6cb9ff",
    durationMin: Number($("#gyroDuration")?.value || 15),
    audioId: $("#gyroAudio")?.value || ""
  };
}

function readTensionConfig() {
  return {
    contract: Number($("#tensionContract")?.value || 6),
    hold: Number($("#tensionHold")?.value || 6),
    release: Number($("#tensionRelease")?.value || 8),
    durationMin: Number($("#tensionDuration")?.value || 15),
    audioId: $("#tensionAudio")?.value || ""
  };
}

function makeBreathPattern(type, base) {
  const b = Number(base || 4);

  if (type === "rectangular") {
    return [
      { label: "Inspiration", voice: "Inspirez", tone: "grave", duration: b },
      { label: "Rétention", voice: "Bloquez", tone: "medium", duration: b * 2 },
      { label: "Expiration", voice: "Expirez", tone: "aigu", duration: b },
      { label: "Rétention", voice: "Bloquez", tone: "distinct", duration: b * 2 }
    ];
  }

  if (type === "triangular") {
    return [
      { label: "Inspiration", voice: "Inspirez", tone: "grave", duration: b },
      { label: "Rétention", voice: "Bloquez", tone: "medium", duration: b },
      { label: "Expiration", voice: "Expirez", tone: "aigu", duration: b }
    ];
  }

  return [
    { label: "Inspiration", voice: "Inspirez", tone: "grave", duration: b },
    { label: "Rétention", voice: "Bloquez", tone: "medium", duration: b },
    { label: "Expiration", voice: "Expirez", tone: "aigu", duration: b },
    { label: "Rétention", voice: "Bloquez", tone: "distinct", duration: b }
  ];
}

function getPatternSegment(pattern, elapsed) {
  const total = pattern.reduce((sum, item) => sum + item.duration, 0);
  let cursor = elapsed % total;
  let acc = 0;

  for (let i = 0; i < pattern.length; i++) {
    const item = pattern[i];
    if (cursor < acc + item.duration) {
      return {
        index: i + Math.floor(elapsed / total) * pattern.length,
        phase: item,
        progress: (cursor - acc) / item.duration
      };
    }
    acc += item.duration;
  }

  return { index: 0, phase: pattern[0], progress: 0 };
}

function getTensionSegment(cfg, elapsed) {
  const pattern = [
    { name: "Contractez", voice: "Contractez", duration: Number(cfg.contract || 6) },
    { name: "Maintenez", voice: "Maintenez", duration: Number(cfg.hold || 6) },
    { name: "Relâchez", voice: "Relâchez", duration: Number(cfg.release || 8) }
  ];

  const total = pattern.reduce((sum, item) => sum + item.duration, 0);
  let cursor = elapsed % total;
  let acc = 0;

  for (let i = 0; i < pattern.length; i++) {
    const item = pattern[i];
    if (cursor < acc + item.duration) {
      return {
        index: i + Math.floor(elapsed / total) * pattern.length,
        ...item,
        progress: (cursor - acc) / item.duration
      };
    }
    acc += item.duration;
  }

  return { index: 0, ...pattern[0], progress: 0 };
}

function drawBreathGuide(ctx, w, h, label, progress, type, stage = false) {
  drawBackground(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) * (stage ? 0.18 : 0.14);
  const expand = label === "Inspiration" ? progress : label === "Expiration" ? 1 - progress : 1;
  const r = base + expand * base * 0.55;

  drawAura(ctx, cx, cy, r * 2.2, "rgba(115,199,255,.18)");

  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${0.1 + i * 0.07})`;
    ctx.lineWidth = 2;
    ctx.arc(cx, cy, r + i * 18, 0, Math.PI * 2);
    ctx.stroke();
  }

  const grad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, 10, cx, cy, r);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.45, "#7dcfff");
  grad.addColorStop(1, "#133252");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  drawCardLabel(ctx, 24, 24, `${BREATH_TYPES[type]?.label || "Respiration"} · ${label}`);
}

function drawGyrascope(ctx, w, h, cfg, t, stage = false) {
  drawBackground(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const outer = Math.min(w, h) * (stage ? 0.40 : 0.35);
  const direction = cfg.direction === "clockwise" ? 1 : -1;
  const speed = Math.max(0.25, Number(cfg.speed || 15) / 15);
  const angle = direction * t * Math.PI * speed;

  drawAura(ctx, cx, cy, outer * 1.55, "rgba(108,185,255,.20)");

  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = "rgba(255,255,255,.16)";
  ctx.lineWidth = 2;

  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, outer * (0.50 + i * 0.17), 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.rotate(angle);

  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.save();
    ctx.rotate(a);
    const grad = ctx.createLinearGradient(0, 0, outer * 0.88, 0);
    grad.addColorStop(0, "rgba(255,211,107,.08)");
    grad.addColorStop(1, "rgba(115,199,255,.30)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(5, outer * 0.035);
    ctx.beginPath();
    ctx.moveTo(outer * 0.22, 0);
    ctx.lineTo(outer * 0.82, 0);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  const centerR = outer * 0.22;
  const g = ctx.createRadialGradient(cx - centerR * 0.15, cy - centerR * 0.15, 4, cx, cy, centerR);
  g.addColorStop(0, "#fffef6");
  g.addColorStop(0.48, cfg.innerColor || "#ffd36b");
  g.addColorStop(1, "#3d2c09");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, centerR, 0, Math.PI * 2);
  ctx.fill();

  drawObject(ctx, cfg.objectKey || "flower", cx, cy, centerR * 1.05, { customImage: cfg.customImage });
  drawCardLabel(ctx, 24, 24, `Rotor Optique · ${cfg.direction === "clockwise" ? "horaire" : "antihoraire"}`);
}

function drawTensionGuide(ctx, w, h, seg, stage = false) {
  drawBackground(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const width = Math.min(w, h) * (stage ? 0.34 : 0.28);
  const levels = { Contractez: 1, Maintenez: 0.7, Relâchez: 0.35 };
  const level = levels[seg.name] || 0.6;

  drawAura(ctx, cx, cy, width * 1.2, seg.name === "Relâchez" ? "rgba(133,240,202,.18)" : "rgba(115,199,255,.16)");

  roundedRect(ctx, cx - width * 0.62, cy - width * 0.16, width * 1.24, width * 0.32, 28);
  ctx.fillStyle = "rgba(10,16,28,.76)";
  ctx.fill();

  roundedRect(ctx, cx - width * 0.60, cy - width * 0.14, width * 1.2 * level, width * 0.28, 24);
  const grad = ctx.createLinearGradient(cx - width * 0.6, cy, cx + width * 0.6, cy);
  grad.addColorStop(0, seg.name === "Relâchez" ? "#85f0ca" : "#73c7ff");
  grad.addColorStop(1, "#ffd36b");
  ctx.fillStyle = grad;
  ctx.fill();

  drawCardLabel(ctx, 24, 24, `${seg.name} · ${Math.round((seg.progress || 0) * 100)}%`);
}

function moduleLabel(module) {
  const map = {
    mixage: "Oscillation guidée",
    respiration: "Respiration",
    gyrascope: "Rotor Optique",
    tensions: "Tensions statiques",
    session: "Séance complète"
  };
  return map[module] || module;
}
