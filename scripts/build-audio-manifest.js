/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const AUDIO_ROOT = path.join(ROOT, 'assets', 'audio');
const OUT_FILE = path.join(AUDIO_ROOT, 'audio-manifest.json');
const OUT_FILE_ROOT = path.join(ROOT, 'audio-manifest.json');
const EXTENSIONS = new Set(['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm']);

function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    out.push(full);
  }
  return out;
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function titleize(value) {
  const cleaned = String(value || '')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function categoryFor(relPath) {
  const ref = relPath
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (/(gyro|gyrascope|rotor|optique)/.test(ref)) return 'gyroscope';
  if (/(respiration|breath|souffle)/.test(ref)) return 'respiration';
  if (/(balancement|swing|lateral|vertical|huit|croix)/.test(ref)) return 'balancement';
  if (/(mantra|om|aum)/.test(ref)) return 'mantra';
  if (/(biofeedback|rythme|rhythm|phosphene|phosphene|phosphenique)/.test(ref)) return 'biofeedback';
  if (/(tension|contract)/.test(ref)) return 'tension';
  if (/(ambient|meditation|healing|zen|playlist)/.test(ref)) return 'ambient';
  return 'playlist';
}

function groupFor(relPath) {
  const parts = relPath.split(/[\\/]/g).filter(Boolean);
  if (parts.length <= 1) return 'root';
  return parts[0];
}

function build() {
  if (!fs.existsSync(AUDIO_ROOT)) {
    throw new Error(`Audio folder not found: ${AUDIO_ROOT}`);
  }

  const files = walk(AUDIO_ROOT)
    .filter((full) => EXTENSIONS.has(path.extname(full).toLowerCase()))
    .map((full) => ({
      full,
      rel: path.relative(AUDIO_ROOT, full).replace(/\\/g, '/')
    }));

  // Deduplicate by normalized basename + extension and keep shortest relative path.
  const byKey = new Map();
  for (const item of files) {
    const base = path.basename(item.rel);
    const key = slugify(base);
    const existing = byKey.get(key);
    if (!existing || item.rel.length < existing.rel.length) {
      byKey.set(key, item);
    }
  }

  const deduped = Array.from(byKey.values()).sort((a, b) => a.rel.localeCompare(b.rel, 'fr'));

  const tracks = deduped.map((item, index) => {
    const ext = path.extname(item.rel).toLowerCase();
    const file = path.basename(item.rel);
    const category = categoryFor(item.rel);
    const group = groupFor(item.rel);
    const id = `audio-${String(index + 1).padStart(3, '0')}-${slugify(file)}`;
    return {
      id,
      name: titleize(file),
      file,
      path: `assets/audio/${item.rel}`,
      category,
      group,
      duration: null,
      extension: ext
    };
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    basePath: 'assets/audio',
    tracks
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(OUT_FILE_ROOT, JSON.stringify(manifest, null, 2), 'utf8');

  const summary = tracks.reduce((acc, track) => {
    acc[track.category] = (acc[track.category] || 0) + 1;
    return acc;
  }, {});

  console.log(`[audio-manifest] tracks=${tracks.length}`);
  console.log(`[audio-manifest] categories=${JSON.stringify(summary)}`);
  console.log(`[audio-manifest] output=${OUT_FILE}`);
}

try {
  build();
} catch (error) {
  console.error('[audio-manifest] failed:', error.message);
  process.exitCode = 1;
}

