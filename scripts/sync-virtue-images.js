/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_DEFAULT = 'C:\\Users\\chauv\\Documents\\JE SUIS\\IMAGE VERTUS';
const SOURCE_DIR = process.argv[2] ? path.resolve(process.argv[2]) : SOURCE_DEFAULT;
const TARGET_DIR = path.join(ROOT, 'assets', 'virtues');
const MANIFEST_FILE = path.join(TARGET_DIR, 'virtues-manifest.json');
const VALID_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const VIRTUE_NAMES = [
  'Présence', 'Silence intérieur', 'Observation', 'Acceptation', 'Sincérité', 'Disponibilité',
  'Bienveillance', 'Compassion', 'Douceur', 'Pardon', 'Gratitude', 'Générosité',
  'Stabilité', 'Ancrage', 'Endurance', 'Patience', 'Rythme', 'Simplicité',
  'Clarté', 'Discernement', 'Lucidité', 'Responsabilité', 'Mesure', 'Précision',
  'Lâcher-prise', 'Renoncement', 'Dépouillement', 'Adaptation', 'Résilience', 'Transmutation',
  'Courage', 'Volonté', 'Détermination', 'Discipline', 'Maîtrise', 'Engagement',
  'Élan', 'Fluidité', 'Audace', 'Exploration', 'Initiative', 'Avancée',
  'Attention', 'Conscience de soi', 'Conscience des autres', 'Vision', 'Intuition', 'Compréhension',
  'Équilibre', 'Paix', 'Harmonie', 'Réconciliation', 'Unité', 'Alignement',
  'Inspiration', 'Créativité', 'Émerveillement', 'Beauté', 'Joie', 'Ouverture',
  'Humilité', 'Vérité', 'Foi', 'Noblesse', 'Sagesse', 'Amour',
  'Présence rayonnante', 'Stabilité intérieure', 'Fidélité à soi', 'Rayonnement', 'Service', 'Accomplissement'
];

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function normalizeLoose(value) {
  return slugify(value).replace(/-/g, '');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function listImages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => VALID_EXT.has(path.extname(name).toLowerCase()));
}

function buildCandidateSet(number, name) {
  const n = String(number);
  const n2 = String(number).padStart(2, '0');
  const slug = slugify(name);
  const bare = normalizeLoose(name);
  return new Set([
    n, n2,
    `${n}-${slug}`, `${n2}-${slug}`,
    `${n}_${slug}`, `${n2}_${slug}`,
    `${n} ${name}`, `${n2} ${name}`,
    `carte-${n}-${slug}`, `carte-${n2}-${slug}`,
    slug, bare
  ].map((item) => normalizeLoose(item)));
}

function resolveSourceFile(files, number, name) {
  const candidates = buildCandidateSet(number, name);
  const withMeta = files.map((file) => {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    return { file, ext, key: normalizeLoose(base) };
  });

  // Direct number match first
  const num1 = String(number);
  const num2 = String(number).padStart(2, '0');
  const numDirect = withMeta.find((item) => item.key === num1 || item.key === num2);
  if (numDirect) return numDirect;

  const exact = withMeta.find((item) => candidates.has(item.key));
  if (exact) return exact;

  const fuzzy = withMeta.find((item) => {
    for (const c of candidates) {
      if (item.key.includes(c) || c.includes(item.key)) return true;
    }
    return false;
  });
  if (fuzzy) return fuzzy;
  return null;
}

function run() {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source folder not found: ${SOURCE_DIR}`);
  }

  ensureDir(TARGET_DIR);
  const sourceFiles = listImages(SOURCE_DIR);
  const cards = [];
  const missing = [];

  for (let i = 0; i < VIRTUE_NAMES.length; i += 1) {
    const number = i + 1;
    const name = VIRTUE_NAMES[i];
    const srcMeta = resolveSourceFile(sourceFiles, number, name);
    const two = String(number).padStart(2, '0');
    const slug = slugify(name);
    const outExt = srcMeta ? srcMeta.ext : '.png';
    const outFile = `${two}-${slug}${outExt}`;
    const outAbs = path.join(TARGET_DIR, outFile);

    if (srcMeta) {
      const srcAbs = path.join(SOURCE_DIR, srcMeta.file);
      fs.copyFileSync(srcAbs, outAbs);
      cards.push({
        number,
        name,
        file: outFile,
        url: `assets/virtues/${outFile}`,
        found: true,
        sourceFile: srcMeta.file
      });
    } else {
      cards.push({
        number,
        name,
        file: '',
        url: '',
        found: false
      });
      missing.push({ number, name });
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: SOURCE_DIR,
    target: 'assets/virtues',
    cards,
    missing
  };

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`[virtues-sync] found=${cards.filter((c) => c.found).length}`);
  console.log(`[virtues-sync] missing=${missing.length}`);
  console.log(`[virtues-sync] manifest=${MANIFEST_FILE}`);
}

try {
  run();
} catch (error) {
  console.error('[virtues-sync] failed:', error.message);
  process.exitCode = 1;
}

