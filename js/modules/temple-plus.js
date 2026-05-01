import { speak } from '../core/speech.js';
import { PRODUCTS, REFERRAL_CONFIG, SUBSCRIPTION_PRODUCT, VIRTUES } from '../data/temple-data.js';

const VIRTUE_STORAGE_KEY = 'axis_virtue_state';
const REFERRAL_STORAGE_KEY = 'axis_referral_state';
const PENDING_INTENTION_KEY = 'axis_pending_session_intention';

let virtuesManifest = null;

function getJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function setJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function openView(view) {
  const tab = document.querySelector(`.nav-tab[data-view="${CSS.escape(view)}"]`);
  if (tab) {
    tab.click();
    return;
  }
  document.querySelectorAll('.view').forEach((node) => node.classList.toggle('active', node.id === view));
  document.querySelectorAll('.nav-tab').forEach((node) => node.classList.toggle('active', node.dataset.view === view));
  const title = document.querySelector('#viewTitle');
  if (title) title.textContent = view;
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

async function loadVirtuesManifest() {
  if (virtuesManifest) return virtuesManifest;
  try {
    const res = await fetch('assets/virtues/virtues-manifest.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    virtuesManifest = await res.json();
  } catch {
    virtuesManifest = { cards: [] };
  }
  return virtuesManifest;
}

export function resolveVirtueImage(virtue) {
  const two = String(virtue.number).padStart(2, '0');
  const slug = slugify(virtue.name);

  const fromManifest = virtuesManifest?.cards?.find((item) => item.number === virtue.number && item.found);
  if (fromManifest?.url) return fromManifest.url;

  return [
    `assets/virtues/${two}-${slug}.png`,
    `assets/virtues/${two}-${slug}.jpg`,
    `assets/virtues/${two}-${slug}.jpeg`,
    `assets/virtues/${two}-${slug}.webp`,
    `assets/virtues/${two}.png`,
    `assets/virtues/${two}.jpg`,
    `assets/virtues/virtue-${two}.png`,
    `assets/virtues/virtue-${two}.jpg`
  ][0];
}

function getVirtueState() {
  return getJson(VIRTUE_STORAGE_KEY, { lastVirtueId: '', history: [] });
}

function setVirtueState(next) {
  setJson(VIRTUE_STORAGE_KEY, next);
}

function drawVirtue() {
  const virtue = VIRTUES[Math.floor(Math.random() * VIRTUES.length)];
  const state = getVirtueState();
  state.lastVirtueId = virtue.id;
  state.history = [{ id: virtue.id, at: new Date().toISOString() }, ...(state.history || [])].slice(0, 24);
  setVirtueState(state);
  return virtue;
}

function selectedVirtue() {
  const state = getVirtueState();
  return VIRTUES.find((item) => item.id === state.lastVirtueId) || VIRTUES[0];
}

function sendVirtueToSession(virtue, openSession = true) {
  localStorage.setItem(PENDING_INTENTION_KEY, JSON.stringify({
    lessonId: virtue.id,
    title: `Vertu ${virtue.number} — ${virtue.name}`,
    intention: virtue.intention,
    sourceBook: 'Le Livre des Vertus',
    practiceType: 'virtue'
  }));

  const sessionFinal = document.querySelector('#sessionFinal');
  const sessionMixageMin = document.querySelector('#sessionMixageMin');
  const sessionBreathMin = document.querySelector('#sessionBreathMin');
  const sessionFinalMin = document.querySelector('#sessionFinalMin');
  if (sessionFinal) sessionFinal.value = 'Rotor Optique';
  if (sessionMixageMin) sessionMixageMin.value = '6';
  if (sessionBreathMin) sessionBreathMin.value = '3';
  if (sessionFinalMin) sessionFinalMin.value = '3';

  speak(`Intention de vertu préparée : ${virtue.name}.`, { key: `virtue-${virtue.id}`, force: true });
  if (openSession) openView('session');
}

function renderVirtueHistory() {
  const host = document.querySelector('#virtueHistory');
  if (!host) return;
  const state = getVirtueState();
  const rows = (state.history || []).map((item) => {
    const virtue = VIRTUES.find((v) => v.id === item.id);
    if (!virtue) return '';
    const date = new Date(item.at);
    return `<li>${virtue.number}. ${virtue.name} — ${date.toLocaleString('fr-FR')}</li>`;
  }).filter(Boolean);
  host.innerHTML = rows.length ? rows.join('') : '<li>Aucun tirage pour le moment.</li>';
}

function updateVirtueCard(virtue) {
  const idNode = document.querySelector('#virtueCardId');
  const nameNode = document.querySelector('#virtueCardName');
  const familyNode = document.querySelector('#virtueCardFamily');
  const intentionNode = document.querySelector('#virtueCardIntention');
  const img = document.querySelector('#virtueCardImage');
  const fallback = document.querySelector('#virtueCardFallback');
  if (!idNode || !nameNode || !familyNode || !intentionNode || !img || !fallback) return;

  idNode.textContent = String(virtue.number).padStart(2, '0');
  nameNode.textContent = virtue.name;
  familyNode.textContent = virtue.family;
  intentionNode.textContent = virtue.intention;

  const two = String(virtue.number).padStart(2, '0');
  const slug = slugify(virtue.name);
  const fromManifest = virtuesManifest?.cards?.find((item) => item.number === virtue.number && item.found);
  const candidates = fromManifest?.url
    ? [fromManifest.url]
    : [
      `assets/virtues/${two}-${slug}.png`,
      `assets/virtues/${two}-${slug}.jpg`,
      `assets/virtues/${two}-${slug}.jpeg`,
      `assets/virtues/${two}-${slug}.webp`,
      `assets/virtues/${two}.png`,
      `assets/virtues/${two}.jpg`,
      `assets/virtues/${two}.jpeg`,
      `assets/virtues/${two}.webp`,
      `assets/virtues/virtue-${two}.png`,
      `assets/virtues/virtue-${two}.jpg`
    ];

  img.dataset.candidates = JSON.stringify(candidates);
  img.dataset.index = '0';
  img.src = candidates[0];
  img.alt = `Carte vertu ${virtue.number} ${virtue.name}`;
  img.classList.remove('is-hidden');
  fallback.classList.add('is-hidden');

  renderVirtueHistory();
}

function installVirtueImageFallback() {
  const img = document.querySelector('#virtueCardImage');
  if (!img || img.dataset.fallbackBound === '1') return;
  img.dataset.fallbackBound = '1';
  img.addEventListener('error', () => {
    const fallback = document.querySelector('#virtueCardFallback');
    const candidates = JSON.parse(img.dataset.candidates || '[]');
    const index = Number(img.dataset.index || '0');
    const next = index + 1;
    if (next < candidates.length) {
      img.dataset.index = String(next);
      img.src = candidates[next];
      return;
    }
    img.classList.add('is-hidden');
    if (fallback) fallback.classList.remove('is-hidden');
  });
}

function renderVirtueView() {
  const host = document.querySelector('#vertus');
  if (!host) return;
  const current = selectedVirtue();
  host.innerHTML = `
    <div class="card temple-card">
      <div class="section-head">
        <div>
          <h3>Carte Vertu</h3>
          <p class="muted">Tirage local parmi 72 vertus, imprégnation douce, historique personnel et intention de séance.</p>
        </div>
        <div class="button-row">
          <button class="primary-btn" data-virtue-action="draw">Tirer une carte</button>
          <button class="secondary-btn" data-virtue-action="read">Lire la carte</button>
        </div>
      </div>
      <div class="temple-grid">
        <article class="temple-glass-card">
          <div class="virtue-card-head">
            <span class="learn-source-badge">N° <strong id="virtueCardId"></strong></span>
            <span class="learn-source-badge" id="virtueCardFamily"></span>
          </div>
          <h4 id="virtueCardName"></h4>
          <p id="virtueCardIntention"></p>
          <div class="virtue-image-wrap" data-virtue-action="open-lightbox">
            <img id="virtueCardImage" alt="" />
            <div id="virtueCardFallback" class="virtue-fallback is-hidden">
              Image de la carte à synchroniser.<br />
              <strong id="virtueFallbackTitle"></strong>
            </div>
          </div>
          <div class="button-row">
            <button class="secondary-btn" data-virtue-action="add-session">Ajouter à ma séance</button>
            <button class="primary-btn" data-virtue-action="create-session">Créer une séance Vertu</button>
          </div>
          <p class="muted small">Une seule vertu par séance suffit. Le but n'est pas d'accumuler, mais de laisser une qualité devenir présence.</p>
        </article>
        <article class="temple-glass-card">
          <h4>30 % pour votre invité</h4>
          <ul id="virtueHistory" class="timeline"></ul>
        </article>
      </div>
      <div id="virtueLightbox" class="virtue-lightbox hidden" aria-hidden="true">
        <button class="danger-btn virtue-close" data-virtue-action="close-lightbox">Fermer</button>
        <img id="virtueLightboxImage" alt="" />
      </div>
    </div>
  `;

  installVirtueImageFallback();
  updateVirtueCard(current);
  const fallbackTitle = document.querySelector('#virtueFallbackTitle');
  if (fallbackTitle) fallbackTitle.textContent = `${String(current.number).padStart(2, '0')} — ${current.name} (${current.family})`;
}

function formatMoney(value, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);
}

function renderPriceLines(product) {
  const lines = [];
  const p = product.prices || {};
  if (typeof p.pdf === 'number') lines.push(`PDF : ${formatMoney(p.pdf, product.currency)}`);
  if (typeof p.epub === 'number') lines.push(`EPUB : ${formatMoney(p.epub, product.currency)}`);
  if (typeof p.bundleDigital === 'number') lines.push(`Bundle PDF + EPUB : ${formatMoney(p.bundleDigital, product.currency)}`);
  if (typeof p.paper === 'number') lines.push(`Papier : ${formatMoney(p.paper, product.currency)}`);
  if (typeof p.paperDigital === 'number') lines.push(`Papier + numérique : ${formatMoney(p.paperDigital, product.currency)}`);
  if (typeof p.paperPack === 'number') lines.push(`Pack papier : ${formatMoney(p.paperPack, product.currency)}`);
  if (typeof p.futureBoxMin === 'number' && typeof p.futureBoxMax === 'number') {
    lines.push(`Coffret futur : ${formatMoney(p.futureBoxMin, product.currency)} à ${formatMoney(p.futureBoxMax, product.currency)}`);
  }
  return lines;
}

function productCardHtml(product) {
  const priceLines = renderPriceLines(product);
  return `
    <article class="temple-glass-card shop-card">
      <div class="learn-source-badge">${product.role}</div>
      <h4>${product.title}</h4>
      <p class="learn-book-subtitle">${product.subtitle}</p>
      <p>${product.description}</p>
      <p class="muted small">${product.longDescription}</p>
      <div class="temple-cover-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
      </div>
      <ul class="timeline">
        ${priceLines.map((line) => `<li>${line}</li>`).join('')}
      </ul>
      <p class="muted small">Formats: ${product.formats.join(', ')}</p>
      <p class="muted small">Stripe placeholders: ${Object.keys(product.stripePriceIds).join(', ')}</p>
      <button class="secondary-btn" disabled>${product.available ? 'Paiement à connecter' : 'Indisponible'}</button>
    </article>
  `;
}

function renderBoutiqueView() {
  const host = document.querySelector('#boutique');
  if (!host) return;
  host.innerHTML = `
    <div class="card temple-card">
      <div class="section-head">
        <div>
          <h3>Boutique</h3>
          <p class="muted">Tarifs premium de lancement. Paiement non connecté dans cette version.</p>
        </div>
      </div>
      <div class="temple-grid shop-grid">
        ${PRODUCTS.map(productCardHtml).join('')}
      </div>
    </div>
  `;
}

function renderAbonnementView() {
  const host = document.querySelector('#abonnement');
  if (!host) return;
  host.innerHTML = `
    <div class="card temple-card">
      <h3>${SUBSCRIPTION_PRODUCT.title}</h3>
      <p class="learn-book-subtitle">Mensuel : ${formatMoney(SUBSCRIPTION_PRODUCT.prices.monthly, SUBSCRIPTION_PRODUCT.currency)} / mois</p>
      <p class="learn-book-subtitle">Annuel : ${formatMoney(SUBSCRIPTION_PRODUCT.prices.yearly, SUBSCRIPTION_PRODUCT.currency)} / an</p>
      <ul class="timeline">
        ${SUBSCRIPTION_PRODUCT.features.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <div class="learn-warning-box">
        <strong>Information</strong>
        <p>Paiement sécurisé en préparation.</p>
      </div>
      <button class="secondary-btn" disabled>Activer l'abonnement (bientôt)</button>
    </div>
  `;
}

function getReferralState() {
  return getJson(REFERRAL_STORAGE_KEY, { code: '', history: [], referredBy: '' });
}

function setReferralState(next) {
  setJson(REFERRAL_STORAGE_KEY, next);
}

function randomCode() {
  return `AXIS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function referralLink(code) {
  const url = new URL(window.location.href);
  url.searchParams.set('ref', code);
  return url.toString();
}

function renderReferralHistory() {
  const host = document.querySelector('#referralHistory');
  if (!host) return;
  const state = getReferralState();
  const rows = (state.history || []).map((item) => `<li>${item.code} — ${new Date(item.at).toLocaleString('fr-FR')}</li>`);
  host.innerHTML = rows.length ? rows.join('') : '<li>Votre invité bénéficie d’une remise de bienvenue sur son premier mois pour découvrir les séances, les exercices, les cartes Vertus et l’école intérieure.</li>';
}

function syncReferralUi() {
  const state = getReferralState();
  const codeNode = document.querySelector('#referralCodeValue');
  const linkNode = document.querySelector('#referralLinkValue');
  const activeNode = document.querySelector('#referralActiveInvite');
  if (!codeNode || !linkNode || !activeNode) return;

  if (!state.code) state.code = randomCode();
  const link = referralLink(state.code);
  setReferralState(state);

  codeNode.textContent = state.code;
  linkNode.value = link;
  activeNode.textContent = state.referredBy
    ? `Lien prêt à partager : ${state.referredBy}`
    : 'Aucune invitation active détectée.';
  renderReferralHistory();
}

function renderParrainageView() {
  const host = document.querySelector('#parrainage');
  if (!host) return;
  host.innerHTML = `
    <div class="card temple-card">
      <h3>Cercle de transmission</h3>
      <p class="muted">Invitez une personne à découvrir Axis Lumen / JE SUIS. Elle reçoit 30 % de réduction sur son premier mois, et vous recevez 1 € de réduction chaque mois tant qu’elle reste abonnée.</p>
      <div class="temple-grid">
        <article class="temple-glass-card">
          <h4>Votre code d’invitation</h4>
          <p id="referralCodeValue"></p>
          <div class="button-row">
            <button class="secondary-btn" data-ref-action="generate">Générer mon code</button>
          </div>
          <label class="stacked">
            <span>Lien à partager</span>
            <input id="referralLinkValue" type="text" readonly />
          </label>
          <div class="button-row">
            <button class="primary-btn" data-ref-action="copy">Copier mon lien</button>
          </div>
          <p id="referralActiveInvite" class="muted small"></p>
        </article>
        <article class="temple-glass-card">
          <h4>30 % pour votre invité</h4>
          <ul id="referralHistory" class="timeline"></ul>
          <p class="muted small">Préparation backend: transmettre <code>referral_code</code> en metadata Stripe côté serveur.</p>
        </article>
      </div>
      <div class="learn-warning-box">
        <strong>1 € pour vous chaque mois</strong>
        <p>Pour chaque abonné actif parrainé, vous recevez 1 € de réduction mensuelle sur votre propre abonnement. Plus vous transmettez l’école, plus votre accès s’allège.
<div class="referral-promo-source-block">
  <h2>Faites circuler l’école</h2>
  <p>
    Axis Lumen / JE SUIS grandit par la transmission : les livres, les séances, les cartes Vertus,
    les pratiques de lumière et l’école Apprendre peuvent toucher des personnes qui cherchent un cadre
    clair, sobre et profond.
  </p>
  <p>
    Partagez votre lien avec les personnes qui pourraient réellement bénéficier de cette voie.
    Votre invité découvre l’école avec une réduction, et votre propre abonnement devient plus léger
    tant que les abonnés parrainés restent actifs.
  </p>
  <div class="referral-promo-source-examples">
    <span><strong>1</strong> abonné actif = <em>1 € / mois</em></span>
    <span><strong>5</strong> abonnés actifs = <em>5 € / mois</em></span>
    <span><strong>10</strong> abonnés actifs = <em>10 € / mois</em></span>
  </div>
</div>
</p>
      </div>
      <pre class="temple-config">${JSON.stringify(REFERRAL_CONFIG, null, 2)}</pre>
    </div>
  `;
  syncReferralUi();
}

function detectReferralFromQuery() {
  const code = new URLSearchParams(window.location.search).get('ref');
  if (!code) return;
  const state = getReferralState();
  state.referredBy = code.trim().toUpperCase();
  setReferralState(state);
}

function bindVirtueEvents() {
  document.addEventListener('click', (event) => {
    const actionNode = event.target.closest('[data-virtue-action]');
    if (!actionNode) return;

    const action = actionNode.dataset.virtueAction;
    const virtue = selectedVirtue();
    if (!virtue) return;

    if (action === 'draw') {
      const nextVirtue = drawVirtue();
      updateVirtueCard(nextVirtue);
      const fallbackTitle = document.querySelector('#virtueFallbackTitle');
      if (fallbackTitle) fallbackTitle.textContent = `${String(nextVirtue.number).padStart(2, '0')} — ${nextVirtue.name} (${nextVirtue.family})`;
      return;
    }
    if (action === 'read') {
      speak(`Vertu ${virtue.number}. ${virtue.name}. Famille ${virtue.family}. Intention. ${virtue.intention}`, { key: `virtue-read-${virtue.id}`, force: true });
      return;
    }
    if (action === 'create-session') {
      sendVirtueToSession(virtue, true);
      return;
    }
    if (action === 'add-session') {
      sendVirtueToSession(virtue, false);
      return;
    }
    if (action === 'open-lightbox') {
      const lightbox = document.querySelector('#virtueLightbox');
      const source = document.querySelector('#virtueCardImage');
      const target = document.querySelector('#virtueLightboxImage');
      if (!lightbox || !source || !target || source.classList.contains('is-hidden')) return;
      target.src = source.src;
      target.alt = source.alt;
      lightbox.classList.remove('hidden');
      lightbox.setAttribute('aria-hidden', 'false');
      return;
    }
    if (action === 'close-lightbox') {
      const lightbox = document.querySelector('#virtueLightbox');
      if (!lightbox) return;
      lightbox.classList.add('hidden');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const lightbox = document.querySelector('#virtueLightbox');
    if (!lightbox) return;
    lightbox.classList.add('hidden');
    lightbox.setAttribute('aria-hidden', 'true');
  });
}

function bindReferralEvents() {
  document.addEventListener('click', async (event) => {
    const actionNode = event.target.closest('[data-ref-action]');
    if (!actionNode) return;
    const action = actionNode.dataset.refAction;
    const state = getReferralState();

    if (action === 'generate') {
      state.code = randomCode();
      state.history = [{ code: state.code, at: new Date().toISOString() }, ...(state.history || [])].slice(0, 30);
      setReferralState(state);
      syncReferralUi();
      return;
    }

    if (action === 'copy') {
      const input = document.querySelector('#referralLinkValue');
      if (!input) return;
      try {
        await navigator.clipboard.writeText(input.value);
      } catch {
        input.select();
        document.execCommand('copy');
      }
      speak('Lien de parrainage copié.', { key: 'referral-copy', force: true });
    }
  });
}

export async function initTemplePlus() {
  await loadVirtuesManifest();
  detectReferralFromQuery();
  renderVirtueView();
  renderBoutiqueView();
  renderAbonnementView();
  renderParrainageView();
  bindVirtueEvents();
  bindReferralEvents();
}
