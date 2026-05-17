// dump-courses.js — CommonJS
// Charge tous les fichiers enrichis et dump le JSON

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const BASE = __dirname;

function loadEnriched(fname) {
  const code = fs.readFileSync(path.join(BASE, fname), 'utf-8');
  // Crée un contexte avec window simulé
  const ctx = {
    window: { AXIS_ONE_HOUR_COURSES: [] },
    console: { log: () => {}, warn: () => {} }
  };
  vm.createContext(ctx);
  try {
    vm.runInContext(code, ctx, { filename: fname });
  } catch(e) {
    process.stderr.write(`Warning ${fname}: ${e.message.slice(0,80)}\n`);
  }
  return ctx;
}

// Charge le fichier principal pour avoir la liste de base
process.stderr.write('Loading main courses file...\n');
const mainCtx = loadEnriched('js/axis-apprendre-courses-1h.js');
const baseCourses = mainCtx.window.AXIS_ONE_HOUR_COURSES || [];
process.stderr.write(`Base courses: ${baseCourses.length}\n`);

// Index par numéro
const courseMap = {};
for (const c of baseCourses) {
  if (c.number) courseMap[c.number] = Object.assign({}, c);
}

// Charge chaque fichier enrichi
const enrichedFiles = [
  'js/axis-courses-enriched-9-32.js',
  'js/axis-courses-enriched-33-36.js',
  'js/axis-courses-enriched-37-56.js',
  'js/axis-courses-enriched-57-80.js',
  'js/axis-courses-enriched-81-112.js',
];

for (const fname of enrichedFiles) {
  // On extrait le tableau ENRICHED directement
  const code = fs.readFileSync(path.join(BASE, fname), 'utf-8');
  const ctx2 = {
    window: { AXIS_ONE_HOUR_COURSES: [] },
    Object: { assign: Object.assign.bind(Object) },
    Array: Array,
    console: { log: () => {}, warn: () => {} }
  };
  vm.createContext(ctx2);
  // Patch Object.assign pour capturer les enrichissements
  const captured = [];
  ctx2.Object.assign = function(target, source) {
    if (source && source.number) captured.push(source);
    return Object.assign(target, source);
  };
  // Inject fake courses array
  ctx2.window.AXIS_ONE_HOUR_COURSES = baseCourses.map(c => Object.assign({}, c));
  try {
    vm.runInContext(code, ctx2, { filename: fname });
    // Récupère les cours patchés
    const patched = ctx2.window.AXIS_ONE_HOUR_COURSES;
    let count = 0;
    for (const c of patched) {
      if (c.number && (c.longSummary || c.pedagogicalObjective || c.teaching)) {
        courseMap[c.number] = Object.assign(courseMap[c.number] || {}, c);
        count++;
      }
    }
    process.stderr.write(`${fname}: ${count} enriched\n`);
  } catch(e) {
    process.stderr.write(`Error ${fname}: ${e.message.slice(0,100)}\n`);
  }
}

// Build final sorted array
const result = Object.values(courseMap).sort((a, b) => (a.number || 0) - (b.number || 0));

// Stats
const withLong = result.filter(c => c.longSummary).length;
const withTeaching = result.filter(c => c.teaching && c.teaching.sections && c.teaching.sections.length > 0).length;
process.stderr.write(`Total: ${result.length}, withLongSummary: ${withLong}, withTeaching: ${withTeaching}\n`);

process.stdout.write(JSON.stringify(result));
