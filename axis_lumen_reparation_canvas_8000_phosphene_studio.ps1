# ============================================================
# AXIS LUMEN STUDIO — REPARATION CANVAS + SERVEUR 8000
# Objectif : restaurer les images des 4 onglets + Mode pratique
# Méthode : sauvegarde horodatée, moteur canvas de secours,
#           protection de animationLoop(), launcher port 8000.
# ============================================================

[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"
$Port = 8000
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupRoot = Join-Path $ProjectRoot "backups\$Stamp-canvas-rescue-8000"
$ReportPath = Join-Path $BackupRoot "RAPPORT_REPARATION_CANVAS_8000.md"

function Ensure-Dir {
    param([string]$Path)
    if (!(Test-Path -LiteralPath $Path -PathType Container)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Read-Text {
    param([string]$Path)
    if (Test-Path -LiteralPath $Path -PathType Leaf) {
        return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
    }
    return ""
}

function Write-Utf8 {
    param([string]$Path, [string]$Content)
    $dir = Split-Path -Parent $Path
    if ($dir) { Ensure-Dir $dir }
    $enc = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($Path, $Content, $enc)
}

function Add-Report {
    param([string]$Text = "")
    Add-Content -LiteralPath $ReportPath -Value $Text -Encoding UTF8
}

function Backup-File {
    param([string]$RelativePath)
    $source = Join-Path $ProjectRoot $RelativePath
    if (Test-Path -LiteralPath $source -PathType Leaf) {
        $dest = Join-Path $BackupRoot $RelativePath
        Ensure-Dir (Split-Path -Parent $dest)
        Copy-Item -LiteralPath $source -Destination $dest -Force
        Add-Report "- Sauvegardé : `$RelativePath`"
    } else {
        Add-Report "- Non trouvé, donc non sauvegardé : `$RelativePath`"
    }
}

if (!(Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
    Write-Host "ERREUR : projet introuvable : $ProjectRoot" -ForegroundColor Red
    exit 1
}

Set-Location -LiteralPath $ProjectRoot
Ensure-Dir $BackupRoot
Set-Content -LiteralPath $ReportPath -Value "# RAPPORT REPARATION CANVAS — AXIS LUMEN STUDIO" -Encoding UTF8
Add-Report ""
Add-Report "Date : $Stamp"
Add-Report "Projet : `$ProjectRoot`"
Add-Report "Port cible : `$Port`"
Add-Report ""
Add-Report "## Sauvegardes"

$FilesToBackup = @(
    "index.html",
    "js\main.js",
    "app.js",
    "server.py",
    "styles.css",
    "styles\pages\pratique.css",
    "styles\pages\gyrascope.css"
)
foreach ($file in $FilesToBackup) { Backup-File $file }

# ============================================================
# 1. Moteur canvas de secours
# ============================================================

$CanvasRescueJs = @'
(function () {
  'use strict';

  const STUDIO_RESCUE_VERSION = '20260430-canvas-rescue-8000';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const state = {
    preview: 'mixage',
    startedAt: performance.now(),
    raf: 0,
    images: {},
  };

  const imageSources = {
    faceFront: 'assets/images/face_front.png',
    faceBack: 'assets/images/face_back.png',
    flower: 'assets/images/flower.png',
    tree: 'assets/images/tree.png',
    geometry: 'assets/images/geometry.png',
    gyro1: 'assets/images/gyro_model_1.png',
    gyro2: 'assets/images/gyro_model_2.png',
    gyro3: 'assets/images/gyro_model_3.png',
    gyro4: 'assets/images/gyro_model_4.png',
  };

  const swings = {
    lateral: { label: 'Latéral', mantra: 'ILLI' },
    vertical: { label: 'Vertical', mantra: 'ALLA' },
    antero: { label: 'Avant-arrière', mantra: 'OLLO' },
    figure8: { label: 'En 8', mantra: 'ILLI' },
    cross: { label: 'En croix', mantra: 'ALLA' },
    rotation: { label: 'Rotation', mantra: 'RORO' },
    horseshoe: { label: 'Fer à cheval', mantra: 'LL' },
  };

  const breathLabels = {
    square: 'Respiration carrée',
    rectangular: 'Respiration rectangulaire',
    triangular: 'Respiration triangulaire',
  };

  function init() {
    preloadImages();
    bindNavigationFallback();
    bindPreviewButtons();
    ensureRescueBadge();
    if (!state.raf) state.raf = requestAnimationFrame(loop);
    console.info('[AXIS LUMEN] Canvas rescue actif', STUDIO_RESCUE_VERSION);
  }

  function preloadImages() {
    Object.entries(imageSources).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => { state.images[key] = img; };
      img.onerror = () => { state.images[key] = null; };
      img.src = src;
    });
  }

  function bindNavigationFallback() {
    $$('.nav-tab').forEach((tab) => {
      if (tab.dataset.canvasRescueBound === '1') return;
      tab.dataset.canvasRescueBound = '1';
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        if (!view) return;
        showView(view);
        state.preview = normalizeModule(view);
      });
    });

    $$('.go-view').forEach((btn) => {
      if (btn.dataset.canvasRescueBound === '1') return;
      btn.dataset.canvasRescueBound = '1';
      btn.addEventListener('click', () => {
        const view = btn.dataset.target;
        if (!view) return;
        showView(view);
        state.preview = normalizeModule(view);
      });
    });
  }

  function bindPreviewButtons() {
    const map = {
      sendMixageToPractice: 'mixage',
      sendBreathToPractice: 'respiration',
      gyroFullscreenBtn: 'gyrascope',
      sendTensionToPractice: 'tensions',
      practiceFullscreenBtn: null,
      openPracticeStage: null,
    };
    Object.entries(map).forEach(([id, module]) => {
      const node = document.getElementById(id);
      if (!node || node.dataset.canvasRescueBound === '1') return;
      node.dataset.canvasRescueBound = '1';
      node.addEventListener('click', () => {
        if (module) state.preview = module;
        if (id === 'practiceFullscreenBtn' || id === 'openPracticeStage' || id === 'gyroFullscreenBtn') showStageOverlay();
        if (id.startsWith('send')) showView('pratique');
      });
    });

    const close = document.getElementById('overlayClose');
    if (close && close.dataset.canvasRescueBound !== '1') {
      close.dataset.canvasRescueBound = '1';
      close.addEventListener('click', hideStageOverlay);
    }
  }

  function showView(view) {
    $$('.view').forEach((node) => node.classList.toggle('active', node.id === view));
    $$('.nav-tab').forEach((node) => node.classList.toggle('active', node.dataset.view === view));
    const title = document.getElementById('viewTitle');
    const tab = $(`.nav-tab[data-view="${cssEscape(view)}"]`);
    if (title) title.textContent = tab ? tab.textContent.trim() : 'AXIS LUMEN STUDIO';
  }

  function showStageOverlay() {
    const overlay = document.getElementById('stageOverlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
  }

  function hideStageOverlay() {
    const overlay = document.getElementById('stageOverlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }

  function normalizeModule(view) {
    if (!view) return state.preview || 'mixage';
    const v = String(view).toLowerCase();
    if (v.includes('rotor') || v.includes('gyro')) return 'gyrascope';
    if (v.includes('resp')) return 'respiration';
    if (v.includes('tension')) return 'tensions';
    if (v.includes('mix') || v.includes('oscillation')) return 'mixage';
    if (v.includes('pratique')) return state.preview || 'mixage';
    return v;
  }

  function activeModule() {
    const active = $('.view.active');
    if (!active) return state.preview || 'mixage';
    const id = normalizeModule(active.id);
    if (['mixage', 'respiration', 'gyrascope', 'tensions'].includes(id)) return id;
    return state.preview || 'mixage';
  }

  function loop(now) {
    const t = now / 1000;
    safe(() => drawDashboardCanvas(t));
    safe(() => drawMixageCanvas(t));
    safe(() => drawBreathCanvas(t));
    safe(() => drawGyroCanvas(t));
    safe(() => drawTensionCanvas(t));
    safe(() => drawPracticeCanvas(t));
    safe(() => drawStageCanvas(t));
    state.raf = requestAnimationFrame(loop);
  }

  function safe(fn) {
    try { fn(); } catch (err) { console.warn('[AXIS LUMEN] canvas rescue draw skipped:', err); }
  }

  function canvasCtx(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    fitCanvas(canvas, ctx);
    return { canvas, ctx, w: canvas.width, h: canvas.height };
  }

  function fitCanvas(canvas, ctx) {
    const rect = canvas.getBoundingClientRect();
    const cssW = Math.max(0, Math.round(rect.width));
    const cssH = Math.max(0, Math.round(rect.height));
    if (cssW < 20 || cssH < 20) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawDashboardCanvas(t) {
    const c = canvasCtx('dashboardCanvas');
    if (!c) return;
    drawBackground(c.ctx, c.w, c.h);
    drawMixageScene(c.ctx, c.w, c.h, t, 0.78, readSwing(), readObject(), 'GRAND');
    drawLabel(c.ctx, 24, 28, 'Cycle vivant · image · lumière · mouvement');
    drawLabel(c.ctx, c.w - 235, 28, `${readSwingLabel()} · ${readMantra()}`);
  }

  function drawMixageCanvas(t) {
    const c = canvasCtx('mixagePreviewCanvas');
    if (!c) return;
    const segment = mixageSegment(t);
    drawBackground(c.ctx, c.w, c.h);
    drawMixageScene(c.ctx, c.w, c.h, t, segment.amp, readSwing(), readObject(), segment.label);
  }

  function drawBreathCanvas(t) {
    const c = canvasCtx('breathPreviewCanvas');
    if (!c) return;
    drawBackground(c.ctx, c.w, c.h);
    const cfg = breathSegment(t);
    drawBreathGuide(c.ctx, c.w, c.h, cfg);
  }

  function drawGyroCanvas(t) {
    const c = canvasCtx('gyroPreviewCanvas');
    if (!c) return;
    drawBackground(c.ctx, c.w, c.h);
    drawGyro(c.ctx, c.w, c.h, t, false);
  }

  function drawTensionCanvas(t) {
    const c = canvasCtx('tensionPreviewCanvas');
    if (!c) return;
    drawBackground(c.ctx, c.w, c.h);
    drawTension(c.ctx, c.w, c.h, t);
  }

  function drawPracticeCanvas(t) {
    const c = canvasCtx('practicePreviewCanvas');
    if (!c) return;
    drawModuleScene(c.ctx, c.w, c.h, t, state.preview || activeModule(), false);
  }

  function drawStageCanvas(t) {
    const c = canvasCtx('stageCanvas');
    if (!c) return;
    drawModuleScene(c.ctx, c.w, c.h, t, state.preview || activeModule(), true);
  }

  function drawModuleScene(ctx, w, h, t, module, stage) {
    drawBackground(ctx, w, h);
    if (module === 'respiration') return drawBreathGuide(ctx, w, h, breathSegment(t), stage);
    if (module === 'gyrascope') return drawGyro(ctx, w, h, t, stage);
    if (module === 'tensions') return drawTension(ctx, w, h, t, stage);
    const segment = mixageSegment(t);
    return drawMixageScene(ctx, w, h, t, segment.amp, readSwing(), readObject(), segment.label, stage);
  }

  function drawBackground(ctx, w, h) {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#050915');
    g.addColorStop(0.55, '#071426');
    g.addColorStop(1, '#03060d');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    radial(ctx, w * 0.32, h * 0.28, Math.min(w, h) * 0.65, 'rgba(115,199,255,0.18)', 'rgba(115,199,255,0)');
    radial(ctx, w * 0.78, h * 0.18, Math.min(w, h) * 0.5, 'rgba(255,211,107,0.16)', 'rgba(255,211,107,0)');

    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = '#8fcfff';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 42) line(ctx, x, 0, x + h * 0.25, h);
    ctx.restore();
  }

  function drawMixageScene(ctx, w, h, t, amp, swing, objectKey, label, stage) {
    const cx = w * (stage ? 0.46 : 0.42);
    const cy = h * (stage ? 0.56 : 0.58);
    const scale = Math.min(w / 720, h / 460) * (stage ? 1.1 : 1);
    const radiusX = (label === 'PETIT' ? 55 : 145) * scale * amp;
    const radiusY = (label === 'PETIT' ? 38 : 100) * scale * amp;
    const p = swingPoint(swing, t, cx, cy - 46 * scale, radiusX, radiusY);

    radial(ctx, cx, cy - 70 * scale, 210 * scale, 'rgba(255,211,107,0.18)', 'rgba(255,211,107,0)');
    radial(ctx, p.x, p.y, 95 * scale, 'rgba(115,199,255,0.25)', 'rgba(115,199,255,0)');
    drawPath(ctx, swing, cx, cy - 46 * scale, radiusX, radiusY);
    drawBody(ctx, cx, cy, scale);
    drawFace(ctx, cx, cy - 52 * scale, scale, p.rot);
    drawFocus(ctx, p.x, p.y, label === 'PETIT' ? 11 * scale : 16 * scale, t);

    drawLabel(ctx, 24 * scale, 28 * scale, `${readSwingLabel()} · ${label}`);
    drawLabel(ctx, 24 * scale, 62 * scale, label === 'PETIT' ? 'Petit mouvement intérieur' : 'Grand mouvement périphérique');
    drawObjectPanel(ctx, w, h, objectKey, t, stage);
  }

  function drawPath(ctx, swing, cx, cy, rx, ry) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,211,107,0.42)';
    ctx.lineWidth = Math.max(2, Math.min(rx, ry) * 0.035);
    ctx.setLineDash([10, 12]);
    ctx.beginPath();
    if (swing === 'vertical') {
      ctx.moveTo(cx, cy - ry); ctx.lineTo(cx, cy + ry);
    } else if (swing === 'cross') {
      ctx.moveTo(cx - rx, cy); ctx.lineTo(cx + rx, cy); ctx.moveTo(cx, cy - ry); ctx.lineTo(cx, cy + ry);
    } else if (swing === 'figure8') {
      for (let i = 0; i <= 180; i += 1) {
        const a = (i / 180) * Math.PI * 2;
        const x = cx + Math.sin(a) * rx;
        const y = cy + Math.sin(a * 2) * ry * 0.58;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
    } else if (swing === 'rotation' || swing === 'horseshoe') {
      ctx.ellipse(cx, cy, rx, ry, 0, swing === 'horseshoe' ? Math.PI : 0, Math.PI * 2);
    } else {
      ctx.moveTo(cx - rx, cy); ctx.lineTo(cx + rx, cy);
    }
    ctx.stroke();
    ctx.restore();
  }

  function swingPoint(swing, t, cx, cy, rx, ry) {
    const a = t * Math.PI;
    let x = cx + Math.sin(a) * rx;
    let y = cy;
    if (swing === 'vertical') { x = cx; y = cy + Math.sin(a) * ry; }
    if (swing === 'antero') { x = cx + Math.sin(a) * rx * 0.55; y = cy + Math.cos(a) * ry * 0.35; }
    if (swing === 'figure8') { x = cx + Math.sin(a) * rx; y = cy + Math.sin(a * 2) * ry * 0.58; }
    if (swing === 'cross') {
      const phase = Math.floor(t * 1.1) % 2;
      if (phase === 0) { x = cx + Math.sin(a) * rx; y = cy; }
      else { x = cx; y = cy + Math.sin(a) * ry; }
    }
    if (swing === 'rotation') { x = cx + Math.cos(a) * rx; y = cy + Math.sin(a) * ry; }
    if (swing === 'horseshoe') { x = cx + Math.cos(Math.PI + Math.abs(Math.sin(a)) * Math.PI) * rx; y = cy + Math.sin(Math.PI + Math.abs(Math.sin(a)) * Math.PI) * ry; }
    return { x, y, rot: Math.max(-0.22, Math.min(0.22, (x - cx) / Math.max(1, rx) * 0.18)) };
  }

  function drawBody(ctx, cx, cy, scale) {
    ctx.save();
    ctx.fillStyle = 'rgba(20,34,58,0.95)';
    ctx.strokeStyle = 'rgba(255,211,107,0.22)';
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 152 * scale, 155 * scale, 62 * scale, 0, Math.PI, 0);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(216,190,150,0.82)';
    roundRect(ctx, cx - 29 * scale, cy + 60 * scale, 58 * scale, 78 * scale, 16 * scale, true, false);
    ctx.restore();
  }

  function drawFace(ctx, cx, cy, scale, rotation) {
    const img = state.images.faceFront;
    const size = 260 * scale;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation || 0);
    if (img && img.complete && img.naturalWidth) {
      const cropH = Math.floor(img.height * 0.72);
      ctx.drawImage(img, 0, 0, img.width, cropH, -size / 2, -size * 0.54, size, size * (cropH / img.width));
    } else {
      ctx.fillStyle = '#d7bd91';
      ctx.strokeStyle = 'rgba(255,244,210,0.7)';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.ellipse(0, 0, 75 * scale, 96 * scale, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#071426';
      ctx.beginPath(); ctx.arc(-27 * scale, -16 * scale, 6 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(27 * scale, -16 * scale, 6 * scale, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(7,20,38,0.8)';
      ctx.beginPath(); ctx.arc(0, 20 * scale, 26 * scale, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    }
    ctx.restore();
  }

  function drawFocus(ctx, x, y, r, t) {
    ctx.save();
    radial(ctx, x, y, r * 4.5, 'rgba(255,231,150,0.42)', 'rgba(255,231,150,0)');
    ctx.fillStyle = '#ffe99a';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(1, r * 0.12);
    ctx.beginPath();
    ctx.arc(x, y, r * (0.86 + 0.12 * Math.sin(t * 8)), 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    ctx.restore();
  }

  function drawObjectPanel(ctx, w, h, objectKey, t, stage) {
    const panelW = stage ? Math.min(320, w * 0.22) : Math.min(180, w * 0.32);
    const x = w - panelW - 28;
    const y = 28;
    roundRect(ctx, x, y, panelW, panelW * 1.18, 22, true, true, 'rgba(4,10,20,0.72)', 'rgba(255,211,107,0.22)');
    drawLabel(ctx, x + 16, y + 28, 'Objet observé');
    drawObject(ctx, objectKey, x + panelW / 2, y + panelW * 0.63, panelW * 0.31, t);
    drawLabel(ctx, x + 16, y + panelW * 1.06, readMantra());
  }

  function drawObject(ctx, key, x, y, s, t) {
    const imgKey = key === 'tree' ? 'tree' : key === 'geometry' ? 'geometry' : 'flower';
    const img = state.images[imgKey];
    ctx.save();
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, x - s, y - s, s * 2, s * 2);
      ctx.restore();
      return;
    }
    if (key === 'tree') {
      ctx.strokeStyle = '#d5a35f'; ctx.lineWidth = Math.max(2, s * 0.13);
      line(ctx, x, y + s * 0.9, x, y - s * 0.45);
      ctx.fillStyle = '#7fe0bb';
      for (let i = 0; i < 7; i += 1) {
        ctx.beginPath();
        ctx.arc(x + Math.cos(i) * s * 0.48, y - s * 0.42 + Math.sin(i * 1.7) * s * 0.25, s * 0.37, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (key === 'geometry') {
      ctx.strokeStyle = '#ffe09a'; ctx.lineWidth = Math.max(2, s * 0.08);
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const a = -Math.PI / 2 + i * Math.PI / 3 + t * 0.15;
        const px = x + Math.cos(a) * s;
        const py = y + Math.sin(a) * s;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath(); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, s * 0.42, 0, Math.PI * 2); ctx.stroke();
    } else {
      for (let i = 0; i < 12; i += 1) {
        const a = i * Math.PI / 6 + t * 0.15;
        ctx.fillStyle = i % 2 ? '#ffd36b' : '#ff8db3';
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * s * 0.48, y + Math.sin(a) * s * 0.48, s * 0.18, s * 0.43, a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#fff4c2'; ctx.beginPath(); ctx.arc(x, y, s * 0.25, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  }

  function drawBreathGuide(ctx, w, h, seg, stage) {
    const cx = w / 2;
    const cy = h / 2 + (stage ? 0 : 10);
    const base = Math.min(w, h) * (stage ? 0.22 : 0.26);
    const r = base * (0.72 + seg.level * 0.28);
    radial(ctx, cx, cy, r * 2.5, 'rgba(115,199,255,0.2)', 'rgba(115,199,255,0)');
    ctx.save();
    ctx.strokeStyle = 'rgba(255,211,107,0.55)';
    ctx.lineWidth = Math.max(3, r * 0.035);
    ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * seg.progress); ctx.stroke();
    ctx.strokeStyle = 'rgba(143,207,255,0.38)';
    ctx.lineWidth = Math.max(2, r * 0.018);
    ctx.beginPath(); ctx.arc(cx, cy, base, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#fff4d0';
    ctx.font = `800 ${Math.max(26, Math.round(Math.min(w, h) * 0.075))}px system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(seg.voice, cx, cy - 8);
    ctx.fillStyle = 'rgba(238,246,255,0.72)';
    ctx.font = `500 ${Math.max(15, Math.round(Math.min(w, h) * 0.033))}px system-ui, sans-serif`;
    ctx.fillText(readBreathLabel(), cx, cy + Math.min(70, base * 0.35));
    ctx.restore();
  }

  function drawGyro(ctx, w, h, t, stage) {
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * (stage ? 0.34 : 0.36);
    const speed = Number(value('gyroSpeed', value('sessionGyroSpeed', 15))) || 15;
    const dir = value('gyroDirection', value('sessionGyroDirection', 'clockwise')) === 'counterclockwise' ? -1 : 1;
    const inner = value('gyroColorInner', value('sessionGyroColorInner', '#ffd36b')) || '#ffd36b';
    const outer = value('gyroColorOuter', value('sessionGyroColorOuter', '#6cb9ff')) || '#6cb9ff';
    const angle = t * dir * (0.35 + speed / 18);

    radial(ctx, cx, cy, r * 2.2, 'rgba(255,211,107,0.16)', 'rgba(255,211,107,0)');
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = hexToRgba(outer, 0.48);
    ctx.lineWidth = Math.max(2, r * 0.015);
    for (let ring = 1; ring <= 4; ring += 1) {
      ctx.beginPath(); ctx.arc(0, 0, r * ring / 4, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.rotate(angle);
    for (let i = 0; i < 16; i += 1) {
      ctx.rotate(Math.PI / 8);
      const grad = ctx.createLinearGradient(0, 0, r, 0);
      grad.addColorStop(0, hexToRgba(inner, 0.85));
      grad.addColorStop(1, hexToRgba(outer, 0.12));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(r * 0.14, -r * 0.035);
      ctx.quadraticCurveTo(r * 0.58, -r * 0.16, r * 0.96, 0);
      ctx.quadraticCurveTo(r * 0.58, r * 0.16, r * 0.14, r * 0.035);
      ctx.closePath(); ctx.fill();
    }
    ctx.rotate(-angle * 1.7);
    drawObject(ctx, readGyroObject(), 0, 0, r * 0.22, t);
    ctx.restore();
    drawFocus(ctx, cx, cy, Math.max(12, r * 0.055), t);
    drawLabel(ctx, 28, 32, `Rotor Optique · vitesse ${speed}/30`);
    drawLabel(ctx, 28, 66, dir > 0 ? 'Sens horaire' : 'Sens antihoraire');
  }

  function drawTension(ctx, w, h, t, stage) {
    const cfg = readTensionConfig();
    const total = cfg.contract + cfg.hold + cfg.release;
    let p = (t % total);
    let label = 'Contractez';
    let local = p / cfg.contract;
    let level = 1;
    if (p > cfg.contract + cfg.hold) {
      label = 'Relâchez';
      local = (p - cfg.contract - cfg.hold) / cfg.release;
      level = 1 - local;
    } else if (p > cfg.contract) {
      label = 'Maintenez';
      local = (p - cfg.contract) / cfg.hold;
      level = 1;
    } else {
      level = local;
    }
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * (0.16 + 0.18 * level);
    radial(ctx, cx, cy, r * 2.7, 'rgba(255,126,144,0.20)', 'rgba(255,126,144,0)');
    ctx.save();
    ctx.strokeStyle = 'rgba(255,211,107,0.34)';
    ctx.lineWidth = Math.max(2, r * 0.05);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    for (let i = 0; i < 20; i += 1) {
      const a = (i / 20) * Math.PI * 2;
      line(ctx, cx + Math.cos(a) * (r * 1.12), cy + Math.sin(a) * (r * 1.12), cx + Math.cos(a) * (r * (1.45 + 0.2 * level)), cy + Math.sin(a) * (r * (1.45 + 0.2 * level)));
    }
    ctx.fillStyle = '#fff4d0';
    ctx.font = `800 ${Math.max(30, Math.round(Math.min(w, h) * (stage ? 0.07 : 0.08)))}px system-ui, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, cx, cy);
    ctx.fillStyle = 'rgba(238,246,255,0.7)';
    ctx.font = `500 ${Math.max(15, Math.round(Math.min(w, h) * 0.035))}px system-ui, sans-serif`;
    ctx.fillText('Cycle statique · tension consciente · relâchement', cx, cy + r + 46);
    ctx.restore();
  }

  function mixageSegment(t) {
    const x = (t * 18) % 180;
    if (x < 60) return { label: 'GRAND', amp: 1 };
    if (x < 120) return { label: 'PETIT', amp: 0.45 };
    return { label: 'GRAND', amp: 1 };
  }

  function breathSegment(t) {
    const type = value('breathType', 'square');
    const base = Math.max(4, Number(value('breathBase', 4)) || 4);
    const pattern = type === 'rectangular'
      ? [{ voice: 'Inspirez', d: base, from: 0.25, to: 1 }, { voice: 'Bloquez', d: base * 2, from: 1, to: 1 }, { voice: 'Expirez', d: base, from: 1, to: 0.25 }, { voice: 'Bloquez', d: base * 2, from: 0.25, to: 0.25 }]
      : type === 'triangular'
        ? [{ voice: 'Inspirez', d: base, from: 0.25, to: 1 }, { voice: 'Bloquez', d: base, from: 1, to: 1 }, { voice: 'Expirez', d: base, from: 1, to: 0.25 }]
        : [{ voice: 'Inspirez', d: base, from: 0.25, to: 1 }, { voice: 'Bloquez', d: base, from: 1, to: 1 }, { voice: 'Expirez', d: base, from: 1, to: 0.25 }, { voice: 'Bloquez', d: base, from: 0.25, to: 0.25 }];
    const total = pattern.reduce((a, b) => a + b.d, 0);
    let cursor = (t * 1.15) % total;
    for (const item of pattern) {
      if (cursor <= item.d) {
        const progress = cursor / item.d;
        return { voice: item.voice, progress, level: item.from + (item.to - item.from) * ease(progress) };
      }
      cursor -= item.d;
    }
    return { voice: 'Inspirez', progress: 0, level: 0.25 };
  }

  function readTensionConfig() {
    return {
      contract: Math.max(2, Number(value('tensionContract', 6)) || 6),
      hold: Math.max(2, Number(value('tensionHold', 6)) || 6),
      release: Math.max(2, Number(value('tensionRelease', 8)) || 8),
    };
  }

  function readSwing() { return value('mixageSwing', value('sessionSwing', 'lateral')) || 'lateral'; }
  function readObject() { return value('mixageObject', value('sessionObject', 'flower')) || 'flower'; }
  function readGyroObject() { return value('gyroObject', value('sessionGyroObject', 'geometry')) || 'geometry'; }
  function readSwingLabel() { return (swings[readSwing()] || swings.lateral).label; }
  function readMantra() { return (swings[readSwing()] || swings.lateral).mantra; }
  function readBreathLabel() { return breathLabels[value('breathType', 'square')] || breathLabels.square; }

  function value(id, fallback) {
    const node = document.getElementById(id);
    if (!node) return fallback;
    return node.value || fallback;
  }

  function radial(ctx, x, y, r, inner, outer) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(1, r));
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  function drawLabel(ctx, x, y, text) {
    ctx.save();
    ctx.font = `${Math.max(13, Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.032))}px system-ui, sans-serif`;
    const padX = 12;
    const padY = 8;
    const m = ctx.measureText(text);
    roundRect(ctx, x, y - 19, m.width + padX * 2, 30, 15, true, true, 'rgba(4,10,20,0.72)', 'rgba(255,211,107,0.16)');
    ctx.fillStyle = '#fff4d0';
    ctx.fillText(text, x + padX, y + 2);
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r, fill, stroke, fillStyle, strokeStyle) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.save();
    if (fillStyle) ctx.fillStyle = fillStyle;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
    ctx.restore();
  }

  function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }

  function cssEscape(value) {
    if (window.CSS && CSS.escape) return CSS.escape(value);
    return String(value).replace(/"/g, '\\"');
  }

  function hexToRgba(hex, alpha) {
    const raw = String(hex || '#ffffff').replace('#', '');
    const n = parseInt(raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function ensureRescueBadge() {
    if (document.getElementById('canvasRescueStatus')) return;
    const host = document.querySelector('.topbar-actions');
    if (!host) return;
    const badge = document.createElement('span');
    badge.id = 'canvasRescueStatus';
    badge.textContent = 'Visuels restaurés';
    badge.style.cssText = 'align-self:center;border:1px solid rgba(255,211,107,.25);background:rgba(255,211,107,.08);color:#fff4d0;border-radius:999px;padding:8px 10px;font-size:12px;white-space:nowrap;';
    host.appendChild(badge);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
'@

$rescuePath = Join-Path $ProjectRoot "js\canvas-rescue.js"
Write-Utf8 $rescuePath $CanvasRescueJs
Add-Report ""
Add-Report "## Fichier ajouté"
Add-Report "- `js\canvas-rescue.js` : moteur visuel de secours pour dashboard, oscillation, respiration, rotor, tensions, pratique et plein écran."

# ============================================================
# 2. Injection propre dans index.html
# ============================================================

$indexPath = Join-Path $ProjectRoot "index.html"
if (!(Test-Path -LiteralPath $indexPath -PathType Leaf)) {
    throw "index.html introuvable dans $ProjectRoot"
}

$index = Read-Text $indexPath
$index = [regex]::Replace($index, '\s*<script\s+defer\s+src=["'']\./js/canvas-rescue\.js[^"'']*["'']\s*>\s*</script>', '', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
$tag = "<script defer src=`"./js/canvas-rescue.js?v=$Stamp`"></script>"

if ($index -match '</body>') {
    $index = [regex]::Replace($index, '</body>', "$tag`r`n</body>", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
} else {
    $index = $index.TrimEnd() + "`r`n" + $tag + "`r`n"
}
Write-Utf8 $indexPath $index
Add-Report ""
Add-Report "## index.html"
Add-Report "- Injection du script : `$tag`"

# ============================================================
# 3. Protection de js/main.js : une erreur canvas ne doit plus tuer toute la boucle
# ============================================================

$mainPath = Join-Path $ProjectRoot "js\main.js"
if (Test-Path -LiteralPath $mainPath -PathType Leaf) {
    $main = Read-Text $mainPath
    if ($main -notmatch 'safeRenderCanvasBlock') {
        $safeLoop = @'
function safeRenderCanvasBlock(name, fn) {
  try {
    fn();
  } catch (err) {
    console.warn('[AXIS LUMEN] Rendu canvas ignoré : ' + name, err);
  }
}

export function animationLoop(time = 0) {
  const t = time / 1000;
  safeRenderCanvasBlock('drawDashboard', () => drawDashboard(t));
  safeRenderCanvasBlock('drawMixagePreview', () => drawMixagePreview(t));
  safeRenderCanvasBlock('drawBreathPreview', () => drawBreathPreview(t));
  safeRenderCanvasBlock('drawGyroPreview', () => drawGyroPreview(t));
  safeRenderCanvasBlock('drawTensionPreview', () => drawTensionPreview(t));
  safeRenderCanvasBlock('drawPracticeCanvas', () => drawPracticeCanvas(t));
  safeRenderCanvasBlock('drawStageCanvas', () => drawStageCanvas(t));
  state.rafId = requestAnimationFrame(animationLoop);
}
'@
        $pattern = 'export\s+function\s+animationLoop\s*\(\s*time\s*=\s*0\s*\)\s*\{.*?state\.rafId\s*=\s*requestAnimationFrame\s*\(\s*animationLoop\s*\)\s*;\s*\}'
        $rx = [regex]::new($pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if ($rx.IsMatch($main)) {
            $main = $rx.Replace($main, $safeLoop, 1)
            Write-Utf8 $mainPath $main
            Add-Report "- `js\main.js` : animationLoop protégée par safeRenderCanvasBlock()."
        } else {
            Add-Report "- `js\main.js` : animationLoop non trouvée automatiquement. Le moteur de secours reste actif via index.html."
        }
    } else {
        Add-Report "- `js\main.js` : protection déjà présente, aucune réécriture."
    }
} else {
    Add-Report "- `js\main.js` introuvable. Le moteur de secours reste actif via index.html."
}

# ============================================================
# 4. Port 8000 : rester sur le même serveur local
# ============================================================

$serverPath = Join-Path $ProjectRoot "server.py"
if (Test-Path -LiteralPath $serverPath -PathType Leaf) {
    $srv = Read-Text $serverPath
    $srv2 = $srv
    $srv2 = $srv2 -replace '127\.0\.0\.1:8765', '127.0.0.1:8000'
    $srv2 = $srv2 -replace 'localhost:8765', 'localhost:8000'
    $srv2 = $srv2 -replace '\b8765\b', '8000'
    if ($srv2 -ne $srv) {
        Write-Utf8 $serverPath $srv2
        Add-Report "- `server.py` : anciennes références au port 8765 remplacées par 8000."
    } else {
        Add-Report "- `server.py` : aucune référence 8765 détectée, pas de modification du serveur."
    }
} else {
    Add-Report "- `server.py` introuvable : le lanceur utilisera `python -m http.server 8000`."
}

$launcher = @"
# AXIS LUMEN STUDIO — lancement local port 8000
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
`$OutputEncoding = [System.Text.UTF8Encoding]::new()
`$ErrorActionPreference = "Stop"
`$ProjectRoot = "$ProjectRoot"
Set-Location -LiteralPath `$ProjectRoot
`$env:PORT = "8000"
`$env:AXIS_LUMEN_PORT = "8000"
Write-Host "AXIS LUMEN STUDIO — http://127.0.0.1:8000" -ForegroundColor Cyan
if (Test-Path -LiteralPath ".\server.py" -PathType Leaf) {
    python .\server.py
} else {
    python -m http.server 8000 --bind 127.0.0.1
}
"@
$launcherPath = Join-Path $ProjectRoot "start-studio-8000.ps1"
Write-Utf8 $launcherPath $launcher
Add-Report "- Lanceur ajouté : `start-studio-8000.ps1`"

# ============================================================
# 5. Rapport et contrôle rapide
# ============================================================

Add-Report ""
Add-Report "## Contrôle rapide"
Add-Report "- Canvas rescue : $(Test-Path -LiteralPath $rescuePath -PathType Leaf)"
Add-Report "- index.html contient canvas-rescue.js : $((Read-Text $indexPath) -match 'canvas-rescue\.js')"
Add-Report "- Lanceur port 8000 : $(Test-Path -LiteralPath $launcherPath -PathType Leaf)"
Add-Report ""
Add-Report "## Relance"
Add-Report '```powershell'
Add-Report "cd `"$ProjectRoot`""
Add-Report ".\start-studio-8000.ps1"
Add-Report '```'
Add-Report ""
Add-Report "URL : http://127.0.0.1:8000"

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  Réparation canvas installée" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Sauvegarde : $BackupRoot" -ForegroundColor Yellow
Write-Host "Rapport    : $ReportPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "Relance maintenant sur le port 8000 :" -ForegroundColor Cyan
Write-Host "cd `"$ProjectRoot`""
Write-Host ".\start-studio-8000.ps1"
Write-Host ""
Write-Host "Puis ouvre : http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host ""
