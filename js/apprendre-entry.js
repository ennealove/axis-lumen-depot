import { AXIS_LEARNING_LESSONS, AXIS_LEARNING_PATHS } from './data/axis-learning-data.js';

/* ── Accès ──────────────────────────────────────────────────────────────── */

function getUser() {
  return window.AXIS_ACCESS?.getUser?.() ?? null;
}

function hasAccess() {
  return window.AXIS_ACCESS?.hasAccess?.() ?? false;
}

/* ── Planning d'ouverture ───────────────────────────────────────────────── */
/*
 * Promo (cours 1-7) : 1 cours/jour à partir du jour d'abonnement.
 *   cours N déverrouillé si daysSinceStart >= N-1
 * Post-promo (cours 8+) : 1 cours tous les 4 jours.
 *   cours N déverrouillé si daysSinceStart >= 6 + (N-7)*4
 */

function daysUntilUnlock(n) {
  const user = getUser();
  if (!user) return 9999;
  if (user.role === 'admin') return -1;
  const startTs = Number(user.subscriptionStartedAt || user.trialStartedAt || 0);
  if (!startTs) return 9999;
  const daysSinceStart = Math.floor((Date.now() - startTs) / 86400000);
  const needed = n <= 7 ? (n - 1) : (6 + (n - 7) * 4);
  return needed - daysSinceStart;
}

function isUnlocked(n) {
  return daysUntilUnlock(n) <= 0;
}

/* ── Rendu d'un cours ───────────────────────────────────────────────────── */

function esc(v) {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function lessonHtml(lesson) {
  const n = lesson.number;
  const unlocked = isUnlocked(n);
  const dl = daysUntilUnlock(n);
  const lockLabel = dl > 0 ? `Dans ${dl} jour${dl > 1 ? 's' : ''}` : 'Verrouillé';
  const tags = (lesson.tags || []).map(t => `<span>${esc(t)}</span>`).join('');

  return `
    <article class="als-lesson ${unlocked ? 'als-unlocked' : 'als-locked'}" data-lesson-id="${esc(lesson.id)}" data-n="${n}" ${unlocked ? 'tabindex="0"' : 'aria-disabled="true"'}>
      <div class="als-lesson-head">
        <span class="als-num">${String(n).padStart(2, '0')}</span>
        <span class="als-badge">${esc(lesson.level || '')}</span>
        ${!unlocked ? `<span class="als-lock-badge">${esc(lockLabel)}</span>` : ''}
      </div>
      <h4>${esc(lesson.title)}</h4>
      <p class="als-sub">${esc(lesson.subtitle || '')}</p>
      <p>${esc(lesson.summary || '')}</p>
      <div class="als-tags">${tags}</div>
      <div class="als-meta">
        <span>${esc(lesson.duration || '')}</span>
        <span>${unlocked ? 'Disponible' : esc(lockLabel)}</span>
      </div>
    </article>`;
}

/* ── Filtres ────────────────────────────────────────────────────────────── */

function normalize(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function getFilters(host) {
  return {
    search: normalize(host.querySelector('#alsSearch')?.value || ''),
    path: host.querySelector('#alsPathFilter')?.value || 'all',
    status: host.querySelector('#alsStatusFilter')?.value || 'all',
  };
}

function filterLessons({ search, path, status }) {
  return AXIS_LEARNING_LESSONS.filter(lesson => {
    if (path !== 'all' && lesson.pathId !== path) return false;
    if (search) {
      const hay = normalize([lesson.title, lesson.subtitle, lesson.summary, ...(lesson.tags || [])].join(' '));
      if (!hay.includes(search)) return false;
    }
    if (status === 'available' && !isUnlocked(lesson.number)) return false;
    if (status === 'locked' && isUnlocked(lesson.number)) return false;
    return true;
  });
}

/* ── Grille ─────────────────────────────────────────────────────────────── */

function renderGrid(host) {
  const grid = host.querySelector('#alsLessonGrid');
  if (!grid) return;
  const lessons = filterLessons(getFilters(host));
  grid.innerHTML = lessons.length
    ? lessons.map(lessonHtml).join('')
    : '<div style="grid-column:1/-1;padding:48px;text-align:center;color:var(--muted)">Aucun cours ne correspond à ce filtre.</div>';
}

function renderStatus(host) {
  const el = host.querySelector('#alsStatus');
  if (!el) return;
  const user = getUser();
  if (user?.role === 'admin') {
    el.textContent = 'Accès administrateur — tous les cours déverrouillés.';
    return;
  }
  const startTs = Number(user?.subscriptionStartedAt || user?.trialStartedAt || 0);
  if (!startTs) { el.textContent = ''; return; }
  const days = Math.floor((Date.now() - startTs) / 86400000);
  const count = AXIS_LEARNING_LESSONS.filter(l => isUnlocked(l.number)).length;
  el.textContent = `Jour ${days + 1} — ${count} cours déverrouillé${count > 1 ? 's' : ''} sur ${AXIS_LEARNING_LESSONS.length}.`;
}

/* ── Portail d'accès ────────────────────────────────────────────────────── */

function renderGate(host) {
  const links = window.AXIS_STRIPE_LINKS || {};
  const cta = links.monthly
    ? `<a href="${esc(links.monthly)}" class="btn primary">Commencer l'essai gratuit</a>`
    : `<a href="abonnement.html" class="btn primary">Commencer l'essai gratuit</a>`;
  host.innerHTML = `
    <div class="als-gate">
      <div class="als-gate-icon">◎</div>
      <h3>École réservée aux abonnés</h3>
      <p>Les ${AXIS_LEARNING_LESSONS.length} cours de l'École du Temple Vivant sont accessibles sur abonnement Axis Lumen Studio. Les 7 premiers jours sont gratuits — un cours s'ouvre chaque jour.</p>
      <div class="als-gate-actions">
        ${cta}
        <a href="login.html" class="btn">Se connecter</a>
      </div>
    </div>`;
}

/* ── Entrée principale ──────────────────────────────────────────────────── */

function render() {
  const host = document.querySelector('#alsGrid');
  if (!host) return;

  if (!hasAccess()) {
    renderGate(host);
    return;
  }

  const pathOptions = AXIS_LEARNING_PATHS
    .map(p => `<option value="${esc(p.id)}">${esc(p.title)}</option>`)
    .join('');

  host.innerHTML = `
    <p id="alsStatus" class="als-progress-text"></p>
    <div class="als-filter-bar">
      <input id="alsSearch" type="search" placeholder="Lumière, souffle, vertu, terrain…">
      <select id="alsPathFilter">
        <option value="all">Tous les parcours</option>
        ${pathOptions}
      </select>
      <select id="alsStatusFilter">
        <option value="all">Tous les cours</option>
        <option value="available">Disponibles</option>
        <option value="locked">Verrouillés</option>
      </select>
    </div>
    <div id="alsLessonGrid" class="als-lesson-grid"></div>`;

  renderStatus(host);
  renderGrid(host);

  host.addEventListener('input', () => renderGrid(host));
  host.addEventListener('change', () => renderGrid(host));
}

document.addEventListener('DOMContentLoaded', render);
