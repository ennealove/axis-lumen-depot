/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'js', 'data', 'axis-sessions.js');

const groups = [
  {
    key: 'fondation',
    level: 'Fondation',
    titles: [
      'Revenir au centre', 'Corps-temple', 'Sortir de la dispersion', 'Purifier sans dureté', 'Le seuil intérieur', 'La chambre de lumière',
      'L’axe simple', 'Le silence du temple', 'Respiration et présence', 'Déposer le faux centre', 'Sobriété intérieure', 'Le souffle comme offrande',
      'La colonne vivante', 'La lumière gardée', 'Le rythme qui rassemble', 'Le retour au sanctuaire', 'Clôturer avec justesse', 'Habiter le centre'
    ]
  },
  {
    key: 'terrain',
    level: 'Terrain',
    titles: [
      'Terrain vivant', 'Eau consciente', 'Minéraux et conductivité', 'Intestins — première porte', 'Reins — fluidité', 'Foie — transformation',
      'Lymphe — mouvement doux', 'Rate-pancréas — stabilité', 'Cœur et circulation', 'Anti-inflammation', 'Système immunitaire', 'Sobriété alimentaire',
      'Repas léger et pratique', 'Silence digestif', 'rH² et clarté', 'Émonctoires et sortie', 'Terrain du matin', 'Terrain du soir'
    ]
  },
  {
    key: 'vertus',
    level: 'Vertus',
    titles: [
      'Présence', 'Silence intérieur', 'Observation', 'Acceptation', 'Sincérité', 'Disponibilité',
      'Bienveillance', 'Compassion', 'Gratitude', 'Pardon', 'Courage', 'Discipline',
      'Clarté', 'Discernement', 'Équilibre', 'Harmonie', 'Foi', 'Accomplissement'
    ]
  },
  {
    key: 'exercices',
    level: 'Exercices',
    titles: [
      'Observation lumineuse', 'Rémanence stable', 'Point intérieur', 'Balancement latéral', 'Balancement vertical', 'Balancement antéro-postérieur',
      'Balancement en huit', 'Balancement en croix', 'Fer à cheval', 'Respiration carrée', 'Respiration triangulaire', 'Respiration rectangulaire',
      'Rotor Optique doux', 'Rotor Optique profond', 'Tensions statiques courtes', 'Tensions statiques complètes', 'Carnet d’expérience', 'Clôture de séance'
    ]
  },
  {
    key: 'synthese',
    level: 'Synthèse',
    titles: [
      'Temple vivant complet', 'Vertu et terrain clair', 'Lumière et alimentation juste', 'Corps-temple et rémanence', 'rH², souffle et axe', 'Émonctoires et lâcher-prise',
      'Balancement et vertu du jour', 'Respiration et paix intérieure', 'Rotor, vision et discernement', 'Tensions et volonté', 'Gratitude et terrain du soir', 'Courage et purification',
      'Silence et lumière gardée', 'Harmonie du corps-temple', 'Service et incarnation', 'Rayonnement intérieur', 'Accomplissement progressif', 'Séance intégrale JE SUIS'
    ]
  }
];

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function durationFor(index, key) {
  const base = [12, 15, 18, 20, 24, 30];
  if (key === 'synthese') return [20, 24, 30, 36, 45][index % 5];
  if (key === 'exercices') return [12, 15, 18, 20][index % 4];
  return base[index % base.length];
}

function rhythmFor(index) {
  const map = ['lent', 'modéré', 'stable', 'profond'];
  return map[index % map.length];
}

function virtueModeFor(key, title) {
  if (key === 'vertus') return `focused-${slugify(title)}`;
  if (key === 'synthese') return 'random-or-intention';
  return 'random-or-presence';
}

function terrainFocusFor(key, title) {
  if (key === 'terrain') return `Focus terrain: ${title}. Eau, minéraux, rH² et observation du corps.`;
  return 'Hydratation douce, état digestif, clarté du terrain et respect des émonctoires.';
}

function exerciseFocusFor(key, title) {
  if (key === 'exercices') return title;
  if (key === 'vertus') return 'Lumière douce, rémanence, respiration et carnet';
  return 'Observation lumineuse, rémanence, souffle, balancement, rotor ou tensions selon l’état.';
}

function audioCategoryFor(key, title) {
  const ref = `${key} ${title}`.toLowerCase();
  if (ref.includes('respiration') || ref.includes('souffle')) return 'respiration';
  if (ref.includes('rotor')) return 'gyroscope';
  if (ref.includes('tension')) return 'tension';
  if (ref.includes('vertu')) return 'mantra';
  if (ref.includes('balancement')) return 'balancement';
  return 'biofeedback';
}

function phasesFor(durationMin, key, title) {
  const total = durationMin * 60;
  const base = [
    { label: 'Préparation', type: 'preparation', sec: 60 },
    { label: 'État du terrain', type: 'terrain', sec: 90 },
    { label: 'Vertu', type: 'virtue', sec: 60 },
    { label: 'Observation lumineuse', type: 'light', sec: 30 },
    { label: 'Rémanence', type: 'afterimage', sec: 180 },
    { label: 'Exercice principal', type: 'practice', sec: 240 },
    { label: 'Intégration', type: 'integration', sec: 90 },
    { label: 'Carnet', type: 'journal', sec: 60 }
  ];
  if (key === 'synthese') {
    base[5].sec = 360;
    base[6].sec = 120;
  } else if (key === 'exercices') {
    base[5].sec = 300;
  } else if (key === 'vertus') {
    base[2].sec = 90;
    base[5].sec = 180;
  }

  const sum = base.reduce((acc, item) => acc + item.sec, 0);
  const delta = total - sum;
  base[5].sec = Math.max(120, base[5].sec + delta);

  return base.map((item) => ({
    label: item.label,
    duration: item.sec,
    type: item.type
  }));
}

const sourceBooks = ['je-suis', 'livre-alimentation', 'livre-des-vertus', 'livre-exercices'];
const sessions = [];
let number = 1;

for (const group of groups) {
  group.titles.forEach((title, idx) => {
    const id = `session-${String(number).padStart(3, '0')}-${slugify(title)}`;
    const duration = durationFor(idx, group.key);
    const terrainFocus = terrainFocusFor(group.key, title);
    const exerciseFocus = exerciseFocusFor(group.key, title);
    const intention = `Je cultive ${title.toLowerCase()} avec une pratique sobre, régulière et reliée aux 4 livres.`;

    sessions.push({
      id,
      number,
      title,
      subtitle: `Séance ${group.level} — axe, terrain, vertu et exercice`,
      duration,
      level: group.level,
      sourceBooks,
      intention,
      virtueMode: virtueModeFor(group.key, title),
      terrainFocus,
      exerciseFocus,
      rhythm: rhythmFor(number),
      audioCategory: audioCategoryFor(group.key, title),
      phases: phasesFor(duration, group.key, title),
      unlockOrder: number,
      tags: [group.key, 'je-suis', 'alimentation', 'vertus', 'exercices'],
      description: `Cette séance relie explicitement JE SUIS (intention et axe), le Livre de l’Alimentation (terrain vivant), le Livre des Vertus (imprégnation) et le Livre d’Exercices (mise en pratique). Thème principal: ${title}.`,
      shortDescription: `Séance ${group.level.toLowerCase()} autour de ${title}.`,
      relatedProductSlugs: sourceBooks
    });
    number += 1;
  });
}

const content = `export const AXIS_SESSIONS = ${JSON.stringify(sessions, null, 2)};\n`;
fs.writeFileSync(OUT, content, 'utf8');
console.log(`[axis-sessions] generated ${sessions.length} sessions in ${OUT}`);

