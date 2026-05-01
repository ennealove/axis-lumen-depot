import {
  AXIS_LEARNING_PATHS,
  AXIS_LEARNING_BOOKS,
  AXIS_LEARNING_LESSONS,
  AXIS_SESSION_TEMPLATES
} from '../data/axis-learning-data.js';
import { AXIS_SESSIONS } from '../data/axis-sessions.js';

import { speak, stopSpeech } from '../core/speech.js';
import { startSchedule } from '../core/schedule.js';
import { refreshPreviewState } from './pratique.js';
import { getMixageConfig, buildMixageSchedule } from './mixage.js';
import { getBreathConfig, buildBreathSchedule } from './respiration.js';
import { getGyroConfig, buildGyroSchedule } from './gyrascope.js';
import { getTensionConfig, buildTensionSchedule } from './tensions.js';

const STORAGE_KEY = 'axis_learning_progress';
const LEGACY_STORAGE_KEY = 'axis_learning_progress_v1';
const SELECTED_LESSON_KEY = 'axis_selected_learning_lesson';
const PENDING_INTENTION_KEY = 'axis_pending_session_intention';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!raw) return { completedLessons: [], lastLessonId: '', selectedPathId: '', notes: {}, practiceHistory: [] };
    return { completedLessons: [], lastLessonId: '', selectedPathId: '', notes: {}, practiceHistory: [], ...JSON.parse(raw) };
  } catch {
    return { completedLessons: [], lastLessonId: '', selectedPathId: '', notes: {}, practiceHistory: [] };
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isCompleted(lesson, progress = getProgress()) {
  return progress.completedLessons.includes(lesson.id);
}

function isUnlocked(lesson, progress = getProgress()) {
  if (lesson.unlockedByDefault) return true;
  const samePath = AXIS_LEARNING_LESSONS.filter((item) => item.pathId === lesson.pathId);
  const index = samePath.findIndex((item) => item.id === lesson.id);
  if (index <= 0) return true;
  return progress.completedLessons.includes(samePath[index - 1].id);
}

function completionPercent(progress = getProgress()) {
  if (!AXIS_LEARNING_LESSONS.length) return 0;
  return Math.round((progress.completedLessons.length / AXIS_LEARNING_LESSONS.length) * 100);
}

function lessonSpeechText(lesson) {
  if (!lesson) return '';
  const steps = lesson.practice?.steps || [];
  return [
    lesson.title,
    lesson.subtitle,
    lesson.summary,
    lesson.teaching,
    'Intention.',
    lesson.practice?.intention || '',
    'Pratique.',
    ...steps
  ].filter(Boolean).join(' ');
}

function isContemplativeLesson(lesson) {
  const type = lesson?.practice?.type;
  return ['contemplation', 'journal'].includes(type);
}

export function buildReadAllLessonsText() {
  return AXIS_LEARNING_LESSONS
    .map((lesson) => `${lesson.number}. ${lesson.title}. ${lesson.summary}. Intention : ${lesson.practice?.intention || ''}.`)
    .join(' ');
}

function bookCardsHtml() {
  const imageBySlug = {
    'je-suis-rendre-son-temple-vivant': 'assets/books/je-suis-cover.jpg',
    'livre-alimentation': 'assets/books/alimentation-cover.jpg',
    'livre-des-vertus': 'assets/books/vertus-cover.jpg',
    'livre-exercices': 'assets/books/exercices-cover.jpg'
  };
  return AXIS_LEARNING_BOOKS.map((book) => `
    <article class="learn-book-card" data-path-jump="${escapeHtml(book.pathId)}">
      <div class="learn-source-badge">${escapeHtml(book.role)}</div>
      <div class="learn-book-cover-wrap">
        <img class="learn-book-cover" src="${escapeHtml(imageBySlug[book.slug] || 'assets/books/je-suis-cover.jpg')}" alt="${escapeHtml(book.title)}" loading="lazy" />
      </div>
      <h4>${escapeHtml(book.title)}</h4>
      <p class="learn-book-subtitle">${escapeHtml(book.subtitle)}</p>
      <p>${escapeHtml(book.description)}</p>
      <button class="secondary-btn learn-action" data-action="filter-path" data-path="${escapeHtml(book.pathId)}">Voir les leçons</button>
    </article>
  `).join('');
}

function pathCardsHtml(progress) {
  return AXIS_LEARNING_PATHS.map((path) => {
    const lessons = AXIS_LEARNING_LESSONS.filter((lesson) => lesson.pathId === path.id);
    const done = lessons.filter((lesson) => isCompleted(lesson, progress)).length;
    return `
      <article class="learn-path-card tone-${escapeHtml(path.tone || 'gold')}" data-path-jump="${escapeHtml(path.id)}">
        <div class="learn-source-badge">${escapeHtml(path.sourceBook)}</div>
        <h4>${escapeHtml(path.title)}</h4>
        <p class="learn-book-subtitle">${escapeHtml(path.subtitle)}</p>
        <p>${escapeHtml(path.description)}</p>
        <div class="learn-progress-line"><span style="width:${lessons.length ? Math.round(done / lessons.length * 100) : 0}%"></span></div>
        <small>${done}/${lessons.length} leçon(s) terminée(s)</small>
      </article>
    `;
  }).join('');
}

function lessonCardHtml(lesson, progress) {
  const completed = isCompleted(lesson, progress);
  const unlocked = isUnlocked(lesson, progress);
  const tagHtml = (lesson.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  return `
    <article class="learn-lesson-card ${completed ? 'is-complete' : ''} ${!unlocked ? 'is-locked' : ''}" data-lesson-id="${escapeHtml(lesson.id)}">
      <div class="learn-lesson-top">
        <span class="learn-number">${String(lesson.number).padStart(2, '0')}</span>
        <span class="learn-source-badge">${escapeHtml(lesson.level)}</span>
      </div>
      <h4>${escapeHtml(lesson.title)}</h4>
      <p class="learn-book-subtitle">${escapeHtml(lesson.subtitle)}</p>
      <p>${escapeHtml(lesson.summary)}</p>
      <div class="learn-tag-row">${tagHtml}</div>
      <div class="learn-lesson-meta">
        <span>${escapeHtml(lesson.duration)}</span>
        <span>${completed ? 'Terminé' : (unlocked ? 'Disponible' : 'Verrouillé')}</span>
      </div>
      <div class="learn-actions">
        <button class="secondary-btn learn-action" data-action="open" data-lesson="${escapeHtml(lesson.id)}" ${!unlocked ? 'disabled' : ''}>Lire</button>
        <button class="secondary-btn learn-action" data-action="speak" data-lesson="${escapeHtml(lesson.id)}" ${!unlocked ? 'disabled' : ''}>ÉÉcouter</button>
        <button class="primary-btn learn-action" data-action="practice" data-lesson="${escapeHtml(lesson.id)}" ${!unlocked ? 'disabled' : ''}>${isContemplativeLesson(lesson) ? 'Pratiquer (guidé)' : 'Pratiquer'}</button>
      </div>
    </article>
  `;
}

function renderReader(lesson, progress) {
  const host = $('#learnReader');
  if (!host) return;
  if (!lesson) {
    host.innerHTML = `
      <div class="learn-reader-empty">
        <h3>Choisis une leçon</h3>
        <p>Le panneau de lecture affichera l’enseignement, le protocole pratique, l’intention et les notes locales.</p>
      </div>
    `;
    return;
  }

  const note = progress.notes?.[lesson.id] || '';
  const steps = (lesson.practice?.steps || []).map((step) => `<li>${escapeHtml(step)}</li>`).join('');
  const completed = isCompleted(lesson, progress);
  const contemplativeText = isContemplativeLesson(lesson)
    ? '<p class="learn-contemplative-text">Cette leçon est contemplative. Lis-la, puis note une phrase dans ton carnet.</p>'
    : '';

  host.innerHTML = `
    <article class="learn-reader-panel" data-current-lesson="${escapeHtml(lesson.id)}">
      <div class="learn-source-badge">${escapeHtml(lesson.sourceBook)}</div>
      <h3>${String(lesson.number).padStart(2, '0')} · ${escapeHtml(lesson.title)}</h3>
      <p class="learn-reader-subtitle">${escapeHtml(lesson.subtitle)}</p>
      <div class="learn-practice-box">
        <strong>Intention</strong>
        <p>${escapeHtml(lesson.practice?.intention || '')}</p>
      </div>
      <section class="learn-reader-section">
        <h4>Enseignement</h4>
        <p>${escapeHtml(lesson.teaching)}</p>
      </section>
      <section class="learn-reader-section">
        <h4>Protocole pratique</h4>
        <ol>${steps}</ol>
        ${contemplativeText}
      </section>
      <div class="learn-warning-box">
        <strong>Prudence</strong>
        <p>${warningTextForLesson(lesson)}</p>
      </div>
      <label class="learn-note-area">
        <span>Notes locales</span>
        <textarea id="learnNoteInput" data-note-lesson="${escapeHtml(lesson.id)}" placeholder="État avant / après, phrase reçue, sensation dominante…">${escapeHtml(note)}</textarea>
      </label>
      <div class="learn-actions learn-reader-actions">
        <button class="secondary-btn learn-action" data-action="speak" data-lesson="${escapeHtml(lesson.id)}">ÉÉcouter</button>
        <button class="primary-btn learn-action" data-action="practice" data-lesson="${escapeHtml(lesson.id)}">${isContemplativeLesson(lesson) ? 'Pratiquer (guidé)' : 'Pratiquer'}</button>
        <button class="secondary-btn learn-action" data-action="send-session" data-lesson="${escapeHtml(lesson.id)}">Créer une séance</button>
        <button class="${completed ? 'secondary-btn' : 'primary-btn'} learn-action" data-action="complete" data-lesson="${escapeHtml(lesson.id)}">${completed ? 'Terminé ✓' : 'Marquer terminé'}</button>
      </div>
    </article>
  `;
}

function warningTextForLesson(lesson) {
  const type = lesson.practice?.type;
  if (type === 'light' || (lesson.tags || []).includes('lumière')) {
    return 'La pratique lumineuse doit rester douce, brève et confortable. Ne force jamais le regard. Arrête immédiatement en cas de gêne visuelle, douleur, fatigue oculaire, vertige ou inconfort.';
  }
  if (type === 'terrain') {
    return 'Ces contenus proposent une hygiène du terrain et une réflexion personnelle. Ils ne remplacent pas un avis médical. En cas de maladie, traitement, grossesse, trouble alimentaire ou fragilité particulière, demande un accompagnement qualifié.';
  }
  if (type === 'virtue') {
    return 'Une seule vertu par séance suffit. Le but n’est pas d’accumuler, mais de laisser une qualité devenir présence.';
  }
  return 'Ne force pas. Ajuste toujours la durée, l’intensité et le mouvement à ton état réel du moment.';
}

function renderLessonGrid() {
  const progress = getProgress();
  const grid = $('#learnLessonGrid');
  if (!grid) return;
  const search = normalize($('#learnSearch')?.value || '');
  const path = $('#learnPathFilter')?.value || 'all';
  const status = $('#learnStatusFilter')?.value || 'all';

  const filtered = AXIS_LEARNING_LESSONS.filter((lesson) => {
    const okPath = path === 'all' || lesson.pathId === path;
    const hay = normalize([lesson.title, lesson.subtitle, lesson.summary, lesson.sourceBook, ...(lesson.tags || [])].join(' '));
    const okSearch = !search || hay.includes(search);
    const completed = isCompleted(lesson, progress);
    const unlocked = isUnlocked(lesson, progress);
    const okStatus = status === 'all' || (status === 'complete' && completed) || (status === 'open' && unlocked && !completed) || (status === 'locked' && !unlocked);
    return okPath && okSearch && okStatus;
  });

  grid.innerHTML = filtered.length
    ? filtered.map((lesson) => lessonCardHtml(lesson, progress)).join('')
    : '<div class="learn-empty">Aucune leçon ne correspond à ce filtre.</div>';
}

function sessionCardHtml(session) {
  return `
    <article class="learn-lesson-card" data-session-id="${escapeHtml(session.id)}">
      <div class="learn-lesson-top">
        <span class="learn-number">${String(session.number).padStart(2, '0')}</span>
        <span class="learn-source-badge">${escapeHtml(session.level)}</span>
      </div>
      <h4>${escapeHtml(session.title)}</h4>
      <p class="learn-book-subtitle">${escapeHtml(session.subtitle)}</p>
      <p>${escapeHtml(session.shortDescription)}</p>
      <div class="learn-lesson-meta">
        <span>${escapeHtml(`${session.duration} min`)}</span>
        <span>${escapeHtml(session.audioCategory)}</span>
      </div>
      <div class="learn-actions">
        <button class="secondary-btn learn-action" data-action="session-open" data-session="${escapeHtml(session.id)}">Créer une séance</button>
        <button class="primary-btn learn-action" data-action="session-start" data-session="${escapeHtml(session.id)}">Lancer (si possible)</button>
      </div>
    </article>
  `;
}

function renderGuidedSessionsGrid() {
  const host = $('#learnGuidedSessionsGrid');
  if (!host) return;
  const level = $('#learnSessionLevelFilter')?.value || 'all';
  const search = normalize($('#learnSessionSearch')?.value || '');
  const rows = AXIS_SESSIONS.filter((session) => {
    const okLevel = level === 'all' || session.level === level;
    const hay = normalize([session.title, session.subtitle, session.description, ...(session.tags || [])].join(' '));
    const okSearch = !search || hay.includes(search);
    return okLevel && okSearch;
  });
  host.innerHTML = rows.length
    ? rows.map((session) => sessionCardHtml(session)).join('')
    : '<div class="learn-empty">Aucune séance guidée ne correspond à ce filtre.</div>';
}

function writeGuidedIntentionToSession(session) {
  localStorage.setItem(PENDING_INTENTION_KEY, JSON.stringify({
    lessonId: session.id,
    title: session.title,
    intention: session.intention,
    sourceBook: 'JE SUIS + Alimentation + Vertus + Exercices',
    practiceType: session.level.toLowerCase()
  }));
}

function configureSessionFormFromGuided(session) {
  const mixage = $('#sessionMixageMin');
  const breath = $('#sessionBreathMin');
  const final = $('#sessionFinalMin');
  const finalType = $('#sessionFinal');
  const object = $('#sessionObject');
  const swing = $('#sessionSwing');
  const breathType = $('#sessionBreath');
  if (mixage) mixage.value = '15';
  if (breath) breath.value = '15';
  if (final) final.value = '15';
  if (finalType) finalType.value = /rotor/i.test(session.exerciseFocus) ? 'Rotor Optique' : 'tensions';
  if (object && !object.value) object.value = 'flower';
  if (swing && !swing.value) swing.value = 'lateral';
  if (breathType && !breathType.value) breathType.value = 'square';
}

function moduleFromSession(session) {
  const ref = `${session.exerciseFocus} ${session.audioCategory}`.toLowerCase();
  if (/(respiration|souffle|breath)/.test(ref)) return 'respiration';
  if (/(rotor|gyr|gyroscope)/.test(ref)) return 'gyrascope';
  if (/(tension|contract)/.test(ref)) return 'tensions';
  return 'mixage';
}

async function startGuidedSession(sessionId) {
  const session = AXIS_SESSIONS.find((item) => item.id === sessionId);
  if (!session) return;
  writeGuidedIntentionToSession(session);
  configureSessionFormFromGuided(session);

  const module = moduleFromSession(session);
  try {
    if (module === 'respiration') {
      await startSchedule(buildBreathSchedule(getBreathConfig()));
      return;
    }
    if (module === 'gyrascope') {
      await startSchedule(buildGyroSchedule(getGyroConfig()));
      return;
    }
    if (module === 'tensions') {
      await startSchedule(buildTensionSchedule(getTensionConfig()));
      return;
    }
    await startSchedule(buildMixageSchedule(getMixageConfig()));
  } catch (error) {
    console.warn('[Apprendre] séance guidée: lancement direct impossible, bascule vers la vue séance.', error);
    goToView('session');
  }
}

export function renderLessons() {
  const host = $('#learnGrid') || $('#apprendre');
  if (!host) return;
  const progress = getProgress();
  const lastLesson = AXIS_LEARNING_LESSONS.find((lesson) => lesson.id === progress.lastLessonId) || AXIS_LEARNING_LESSONS[0];
  const percent = completionPercent(progress);

  host.classList.remove('grid', 'three-col');
  host.innerHTML = `
    <section class="learn-school">
      <header class="learn-hero">
        <div>
          <div class="eyebrow">École du Temple Vivant</div>
          <h3 class="learn-hero-title">École du Temple Vivant</h3>
          <p class="learn-hero-subtitle">Apprendre à préparer le corps, orienter la pensée, recevoir la lumière, travailler les vertus et construire une pratique régulière.</p>
          <div class="learn-actions">
            <button class="primary-btn learn-action" data-action="open" data-lesson="${escapeHtml(lastLesson?.id || '')}">Reprendre</button>
            <button class="secondary-btn learn-action" data-action="filter-path" data-path="fondation-je-suis">Commencer le parcours</button>
            <button class="secondary-btn learn-action" data-action="filter-path" data-path="vertus">Travailler une vertu</button>
            <button class="secondary-btn learn-action" data-action="send-session" data-lesson="${escapeHtml(lastLesson?.id || '')}">Construire une séance</button>
          </div>
        </div>
        <aside class="learn-progress">
          <span>Progression</span>
          <strong>${percent}%</strong>
          <div class="learn-progress-line"><span style="width:${percent}%"></span></div>
          <small>${progress.completedLessons.length}/${AXIS_LEARNING_LESSONS.length} leçon(s) terminée(s)</small>
        </aside>
      </header>

      <section class="learn-book-grid">${bookCardsHtml()}</section>
      <section class="learn-path-grid">${pathCardsHtml(progress)}</section>

      <section class="learn-main-layout">
        <div>
          <div class="learn-filter-bar">
            <input id="learnSearch" type="search" placeholder="Rechercher : lumière, rH², vertu, souffle…" />
            <select id="learnPathFilter">
              <option value="all">Tous les parcours</option>
              ${AXIS_LEARNING_PATHS.map((path) => `<option value="${escapeHtml(path.id)}">${escapeHtml(path.title)}</option>`).join('')}
            </select>
            <select id="learnStatusFilter">
              <option value="all">Tous les statuts</option>
              <option value="open">Disponibles</option>
              <option value="complete">Terminées</option>
              <option value="locked">Verrouillées</option>
            </select>
          </div>
          <div id="learnLessonGrid" class="learn-lesson-grid"></div>
        </div>
        <aside id="learnReader" class="learn-reader"></aside>
      </section>

      <section class="learn-main-layout">
        <div>
          <div class="section-head">
            <div>
              <h4>Séances guidées premium (90)</h4>
              <p class="muted">Chaque séance relie explicitement les 4 livres : JE SUIS, Alimentation, Vertus et Exercices.</p>
            </div>
          </div>
          <div class="learn-filter-bar">
            <input id="learnSessionSearch" type="search" placeholder="Rechercher une séance guidée..." />
            <select id="learnSessionLevelFilter">
              <option value="all">Tous les niveaux</option>
              <option value="Fondation">Fondation</option>
              <option value="Terrain">Terrain</option>
              <option value="Vertus">Vertus</option>
              <option value="Exercices">Exercices</option>
              <option value="Synthèse">Synthèse</option>
            </select>
            <div class="learn-source-badge">Total ${AXIS_SESSIONS.length} séances</div>
          </div>
          <div id="learnGuidedSessionsGrid" class="learn-lesson-grid"></div>
        </div>
      </section>
    </section>
  `;

  renderLessonGrid();
  renderReader(lastLesson, progress);
  renderGuidedSessionsGrid();
}

function setFilterPath(pathId) {
  const select = $('#learnPathFilter');
  if (select) select.value = pathId;
  const progress = getProgress();
  progress.selectedPathId = pathId;
  saveProgress(progress);
  renderLessonGrid();
  $('#learnLessonGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openLesson(lessonId) {
  const lesson = AXIS_LEARNING_LESSONS.find((item) => item.id === lessonId);
  if (!lesson) return;
  const progress = getProgress();
  if (!isUnlocked(lesson, progress)) return;
  progress.lastLessonId = lesson.id;
  saveProgress(progress);
  localStorage.setItem(SELECTED_LESSON_KEY, JSON.stringify(lesson));
  renderReader(lesson, progress);
}

function markComplete(lessonId) {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) progress.completedLessons.push(lessonId);
  progress.lastLessonId = lessonId;
  saveProgress(progress);
  renderLessons();
  openLesson(lessonId);
}

function saveNote(lessonId, value) {
  const progress = getProgress();
  progress.notes = progress.notes || {};
  progress.notes[lessonId] = value;
  saveProgress(progress);
}

async function practiceLesson(lessonId) {
  const lesson = AXIS_LEARNING_LESSONS.find((item) => item.id === lessonId);
  if (!lesson) return;
  localStorage.setItem(SELECTED_LESSON_KEY, JSON.stringify(lesson));
  localStorage.setItem(PENDING_INTENTION_KEY, JSON.stringify({ lessonId: lesson.id, intention: lesson.practice?.intention || lesson.title }));

  const progress = getProgress();
  progress.practiceHistory = progress.practiceHistory || [];
  progress.practiceHistory.unshift({ lessonId: lesson.id, at: new Date().toISOString(), title: lesson.title });
  progress.practiceHistory = progress.practiceHistory.slice(0, 25);
  saveProgress(progress);

  if (isContemplativeLesson(lesson)) {
    speak(`Cette leçon est contemplative. Lis-la, puis note une phrase dans ton carnet. ${lessonSpeechText(lesson)}`, { key: `lesson-contemplative-${lesson.id}`, force: true });
    goToView('apprendre');
    return;
  }

  try {
    if (lesson.module === 'mixage') {
      await startSchedule(buildMixageSchedule({ ...getMixageConfig(), durationMin: 15 }));
      return;
    }
    if (lesson.module === 'respiration') {
      await startSchedule(buildBreathSchedule(getBreathConfig()));
      return;
    }
    if (lesson.module === 'gyrascope') {
      await startSchedule(buildGyroSchedule(getGyroConfig()));
      return;
    }
    if (lesson.module === 'tensions') {
      await startSchedule(buildTensionSchedule(getTensionConfig()));
      return;
    }
  } catch (error) {
    console.warn('[Apprendre] Lancement direct impossible, bascule vers la séance.', error);
  }

  speak(lessonSpeechText(lesson), { key: `lesson-practice-${lesson.id}`, force: true });
  goToView(lesson.module === 'session' ? 'session' : 'pratique');
  try { refreshPreviewState(); } catch {}
}

function sendToSession(lessonId) {
  const lesson = AXIS_LEARNING_LESSONS.find((item) => item.id === lessonId);
  if (!lesson) return;
  localStorage.setItem(PENDING_INTENTION_KEY, JSON.stringify({
    lessonId: lesson.id,
    title: lesson.title,
    intention: lesson.practice?.intention || lesson.title,
    sourceBook: lesson.sourceBook,
    practiceType: lesson.practice?.type || 'session'
  }));
  speak(`Intention de séance préparée : ${lesson.practice?.intention || lesson.title}`, { key: `lesson-session-${lesson.id}`, force: true });
  goToView('session');
}

function goToView(view) {
  const tab = document.querySelector(`.nav-tab[data-view="${CSS.escape(view)}"]`);
  if (tab) {
    tab.click();
    return;
  }
  $$('.view').forEach((node) => node.classList.toggle('active', node.id === view));
  $$('.nav-tab').forEach((node) => node.classList.toggle('active', node.dataset.view === view));
  const title = $('#viewTitle');
  if (title) title.textContent = view;
}

export function bindLearningControls() {
  const host = $('#apprendre') || document;
  host.addEventListener('click', async (event) => {
    const btn = event.target.closest('.learn-action');
    if (!btn) return;
    const action = btn.dataset.action;
    const lessonId = btn.dataset.lesson;
    const sessionId = btn.dataset.session;
    if (action === 'filter-path') setFilterPath(btn.dataset.path || 'all');
    if (action === 'open') openLesson(lessonId);
    if (action === 'speak') {
      const lesson = AXIS_LEARNING_LESSONS.find((item) => item.id === lessonId);
      if (lesson) speak(lessonSpeechText(lesson), { key: `lesson-${lesson.id}`, force: true });
    }
    if (action === 'practice') await practiceLesson(lessonId);
    if (action === 'send-session') sendToSession(lessonId);
    if (action === 'complete') markComplete(lessonId);
    if (action === 'session-open') {
      const session = AXIS_SESSIONS.find((item) => item.id === sessionId);
      if (!session) return;
      writeGuidedIntentionToSession(session);
      configureSessionFormFromGuided(session);
      speak(`Séance guidée préparée : ${session.title}.`, { key: `guided-open-${session.id}`, force: true });
      goToView('session');
    }
    if (action === 'session-start') await startGuidedSession(sessionId);
  });

  host.addEventListener('input', (event) => {
    if (event.target.matches('#learnSearch, #learnPathFilter, #learnStatusFilter')) renderLessonGrid();
    if (event.target.matches('#learnNoteInput')) saveNote(event.target.dataset.noteLesson, event.target.value);
    if (event.target.matches('#learnSessionSearch, #learnSessionLevelFilter')) renderGuidedSessionsGrid();
  });

  host.addEventListener('change', (event) => {
    if (event.target.matches('#learnPathFilter, #learnStatusFilter')) renderLessonGrid();
    if (event.target.matches('#learnSessionLevelFilter')) renderGuidedSessionsGrid();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') stopSpeech();
  });
}


