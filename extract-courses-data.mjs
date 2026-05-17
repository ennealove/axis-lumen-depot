// extract-courses-data.mjs — version 2
// Extrait les données enrichies de tous les fichiers JS et les exporte en JSON

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(fname) {
  return readFileSync(join(__dirname, fname), 'utf-8');
}

// ── Extraction des cours de base depuis axis-apprendre-courses-1h.js ──────
function extractBaseCourses() {
  const code = readFile('js/axis-apprendre-courses-1h.js');
  // Le fichier commence par: window.AXIS_ONE_HOUR_COURSES = [...]
  // On va chercher tous les objets avec "number": N
  const courses = [];

  // Trouve le tableau AXIS_ONE_HOUR_COURSES
  const match = code.match(/AXIS_ONE_HOUR_COURSES\s*=\s*(\[[\s\S]*)/);
  if (!match) {
    process.stderr.write('Could not find AXIS_ONE_HOUR_COURSES\n');
    return courses;
  }

  // Exécute dans un contexte simulé
  const fakeWindow = {};
  try {
    const fn = new Function('window', 'var AXIS_ONE_HOUR_FAMILIES = []; ' + code);
    fn(fakeWindow);
    if (fakeWindow.AXIS_ONE_HOUR_COURSES) {
      return fakeWindow.AXIS_ONE_HOUR_COURSES;
    }
  } catch(e) {
    process.stderr.write(`Base courses eval error: ${e.message}\n`);
  }
  return courses;
}

// ── Extraction des enrichissements ────────────────────────────────────────
function extractEnriched(code) {
  // Trouve le tableau ENRICHED_XX_YY
  const match = code.match(/(?:var|let|const)\s+ENRICHED_[\w]+\s*=\s*(\[)/);
  if (!match) return [];

  const startIdx = code.indexOf('[', match.index + match[0].length - 1);

  // Balance brackets to find end of array
  let depth = 0;
  let i = startIdx;
  while (i < code.length) {
    if (code[i] === '[' || code[i] === '{') depth++;
    else if (code[i] === ']' || code[i] === '}') {
      depth--;
      if (depth === 0) { i++; break; }
    }
    i++;
  }

  const arrayStr = code.slice(startIdx, i);
  try {
    const fn = new Function('return ' + arrayStr);
    return fn();
  } catch(e) {
    process.stderr.write(`Enriched eval error: ${e.message.slice(0,100)}\n`);
    return [];
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
process.stderr.write('Loading base courses...\n');
const baseCourses = extractBaseCourses();
process.stderr.write(`Base courses loaded: ${baseCourses.length}\n`);

const enrichedFiles = [
  'js/axis-courses-enriched-9-32.js',
  'js/axis-courses-enriched-33-36.js',
  'js/axis-courses-enriched-37-56.js',
  'js/axis-courses-enriched-57-80.js',
  'js/axis-courses-enriched-81-112.js',
];

const allEnriched = {};
for (const fname of enrichedFiles) {
  try {
    const code = readFile(fname);
    const arr = extractEnriched(code);
    for (const item of arr) {
      if (item && item.number) allEnriched[item.number] = item;
    }
    process.stderr.write(`${fname}: ${arr.length} courses\n`);
  } catch(e) {
    process.stderr.write(`Error ${fname}: ${e.message}\n`);
  }
}

// Merge
const merged = baseCourses.map(c => {
  const e = allEnriched[c.number];
  return e ? { ...c, ...e } : c;
});

// Also add any enriched courses not in base (shouldn't happen but safe)
const baseNums = new Set(baseCourses.map(c => c.number));
for (const [num, e] of Object.entries(allEnriched)) {
  if (!baseNums.has(parseInt(num))) merged.push(e);
}

merged.sort((a, b) => (a.number || 0) - (b.number || 0));

process.stdout.write(JSON.stringify(merged, null, 2));
process.stderr.write(`Total exported: ${merged.length}\n`);
