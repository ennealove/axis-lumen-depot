import { OBJECTS, state } from '../core/state.js';

export function drawBackground(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#030711');
  gradient.addColorStop(0.55, '#081120');
  gradient.addColorStop(1, '#050a15');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  const breath = 0.55 + Math.sin(performance.now() * 0.0012) * 0.1;
  const halo = ctx.createRadialGradient(
    w * 0.5,
    h * 0.46,
    Math.min(w, h) * 0.04,
    w * 0.5,
    h * 0.46,
    Math.max(w, h) * 0.46
  );
  halo.addColorStop(0, `rgba(255, 211, 107, ${0.08 * breath})`);
  halo.addColorStop(0.45, `rgba(115, 199, 255, ${0.07 * breath})`);
  halo.addColorStop(1, 'rgba(115, 199, 255, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.strokeStyle = `rgba(255, 211, 107, ${0.08 + breath * 0.08})`;
  ctx.lineWidth = Math.max(1, w * 0.0012);
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.12);
  ctx.lineTo(w * 0.5, h * 0.88);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  for (let i = 0; i < 22; i += 1) {
    const seed = i * 17.47;
    const drift = performance.now() * 0.00005 * (0.8 + (i % 5) * 0.12);
    const x = ((Math.sin(seed + drift) + 1) * 0.5) * w;
    const y = ((Math.cos(seed * 0.7 + drift * 1.2) + 1) * 0.5) * h;
    const r = 0.7 + (i % 4) * 0.35;
    ctx.fillStyle = `rgba(255, 244, 208, ${0.045 + (i % 3) * 0.012})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawAura(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function drawFace(ctx, img, x, y, size, rotation = 0, faceMode = 'front') {
  if (!img) return;
  const cropBottom = faceMode === 'back' ? 0.76 : 0.72;
  const sw = img.width;
  const sh = Math.floor(img.height * cropBottom);
  const aspect = sh / sw;
  const h = size * aspect;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.drawImage(img, 0, 0, sw, sh, -size / 2, -h / 2, size, h);
  ctx.restore();
}

export function drawShouldersBase(ctx, x, y, width) {
  ctx.save();
  drawAura(ctx, x, y - 50, width * 0.62, 'rgba(255,211,107,0.08)');
  const grad = ctx.createLinearGradient(x, y - 70, x, y + 70);
  grad.addColorStop(0, 'rgba(36,56,96,0.95)');
  grad.addColorStop(1, 'rgba(56,82,130,0.92)');
  ctx.fillStyle = grad;
  roundedRect(ctx, x - width / 2, y - 26, width, 148, 54);
  ctx.fill();
  ctx.fillStyle = 'rgba(212,190,176,0.88)';
  roundedRect(ctx, x - 42, y - 62, 84, 80, 30);
  ctx.fill();
  ctx.restore();
}

export function drawFocusPoint(ctx, x, y, size, t) {
  drawAura(ctx, x, y, size * 3, 'rgba(255,230,140,0.24)');
  ctx.save();
  ctx.fillStyle = '#ffe27b';
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255,${0.45 + Math.sin(t * 4) * 0.15})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, size + 8 + Math.sin(t * 4) * 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

export function drawCrosshair(ctx, x, y, size) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.restore();
}

export function drawInsetPanel(ctx, x, y, w, h, title) {
  ctx.save();
  roundedRect(ctx, x, y, w, h, 18);
  ctx.fillStyle = 'rgba(6,10,18,0.78)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.stroke();
  ctx.fillStyle = '#eef6ff';
  ctx.font = '600 14px Inter, sans-serif';
  ctx.fillText(title, x + 14, y + 22);
  ctx.restore();
}

export function drawCardLabel(ctx, x, y, text) {
  ctx.save();
  ctx.font = '600 14px Inter, sans-serif';
  const width = Math.ceil(ctx.measureText(text).width) + 24;
  roundedRect(ctx, x, y, width, 34, 999);
  ctx.fillStyle = 'rgba(5,9,16,0.68)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.stroke();
  ctx.fillStyle = '#eef6ff';
  ctx.fillText(text, x + 12, y + 22);
  ctx.restore();
}

export function drawObject(ctx, key, x, y, size, options = {}) {
  const customImage = options.customImage || null;
  if (customImage) {
    const img = customImage;
    const ratio = img.height / img.width;
    const h = size * ratio;
    ctx.drawImage(img, x - size / 2, y - h / 2, size, h);
    return;
  }

  const obj = OBJECTS[key] || OBJECTS.flower;
  if (obj.imageKey && state.images[obj.imageKey]) {
    const img = state.images[obj.imageKey];
    const ratio = img.height / img.width;
    const h = size * ratio;
    ctx.drawImage(img, x - size / 2, y - h / 2, size, h);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#f4e8a4';
  ctx.fillStyle = 'rgba(255,211,107,0.18)';

  switch (key) {
    case 'spiral': {
      ctx.beginPath();
      for (let a = 0; a < Math.PI * 6; a += 0.1) {
        const r = (size * 0.45) * (a / (Math.PI * 6));
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      break;
    }
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.45);
      ctx.lineTo(size * 0.42, size * 0.35);
      ctx.lineTo(-size * 0.42, size * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      break;
    case 'star':
      starPath(ctx, 0, 0, size * 0.46, size * 0.22, 5);
      ctx.fill();
      ctx.stroke();
      break;
    case 'cube':
      drawCube(ctx, size * 0.55);
      break;
    case 'sphere': {
      const g = ctx.createRadialGradient(-size * 0.15, -size * 0.18, 2, 0, 0, size * 0.4);
      g.addColorStop(0, '#ffffff');
      g.addColorStop(0.4, '#9ed7ff');
      g.addColorStop(1, '#2c5d88');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.42, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'lotus':
    case 'seed':
    default:
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  }

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

export function starPath(ctx, x, y, outer, inner, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const a = -Math.PI / 2 + (i * Math.PI) / points;
    const r = i % 2 === 0 ? outer : inner;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export function drawCube(ctx, s) {
  ctx.save();
  ctx.translate(-s * 0.1, s * 0.05);
  ctx.fillStyle = 'rgba(158, 215, 255, 0.24)';
  ctx.strokeStyle = '#f5ecbf';
  ctx.lineWidth = 3;

  const pts = [
    [-s * 0.35, -s * 0.1],
    [0, -s * 0.35],
    [s * 0.35, -s * 0.1],
    [0, s * 0.15]
  ];

  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-s * 0.35, -s * 0.1);
  ctx.lineTo(-s * 0.35, s * 0.45);
  ctx.lineTo(0, s * 0.7);
  ctx.lineTo(0, s * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(s * 0.35, -s * 0.1);
  ctx.lineTo(s * 0.35, s * 0.45);
  ctx.lineTo(0, s * 0.7);
  ctx.lineTo(0, s * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}
