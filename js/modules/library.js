import { $ } from '../core/dom.js';
import { state } from '../core/state.js';

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm'];

const FALLBACK_BUILTIN = [
  {
    id: 'builtin-ck3-02-wav',
    name: 'CK3 Piste 02 (WAV)',
    path: 'assets/audio/ck3_piste_02.wav',
    url: 'assets/audio/ck3_piste_02.wav',
    category: 'biofeedback',
    group: 'builtin',
    source: 'builtin',
    builtin: true
  },
  {
    id: 'builtin-ck3-03-wav',
    name: 'CK3 Piste 03 (WAV)',
    path: 'assets/audio/ck3_piste_03.wav',
    url: 'assets/audio/ck3_piste_03.wav',
    category: 'biofeedback',
    group: 'builtin',
    source: 'builtin',
    builtin: true
  },
  {
    id: 'builtin-ck3-04-wav',
    name: 'CK3 Piste 04 (WAV)',
    path: 'assets/audio/ck3_piste_04.wav',
    url: 'assets/audio/ck3_piste_04.wav',
    category: 'biofeedback',
    group: 'builtin',
    source: 'builtin',
    builtin: true
  }
];

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function normalizePath(value) {
  return String(value || '').replace(/\\/g, '/').toLowerCase();
}

function cleanLabel(value) {
  return String(value || '')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function displayName(value) {
  return cleanLabel(value)
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function inferCategory(trackLike) {
  const ref = `${trackLike.path || ''} ${trackLike.name || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  if (/(gyro|gyrascope|rotor|optique)/.test(ref)) return 'gyroscope';
  if (/(respiration|breath|souffle)/.test(ref)) return 'respiration';
  if (/(balancement|swing|lateral|vertical|huit|croix)/.test(ref)) return 'balancement';
  if (/(mantra|om|aum)/.test(ref)) return 'mantra';
  if (/(biofeedback|rythme|rhythm|phosphene|phosphenique)/.test(ref)) return 'biofeedback';
  if (/(tension|contract)/.test(ref)) return 'tension';
  if (/(ambient|meditation|healing|zen)/.test(ref)) return 'ambient';
  return 'playlist';
}

function categoryFits(category, desired) {
  const map = {
    mixage: new Set(['biofeedback', 'balancement', 'mantra', 'playlist', 'ambient']),
    breath: new Set(['respiration', 'mantra', 'ambient', 'playlist']),
    gyro: new Set(['gyroscope', 'ambient', 'playlist', 'biofeedback']),
    tension: new Set(['tension', 'ambient', 'playlist', 'biofeedback'])
  };
  const allowed = map[desired] || new Set();
  return allowed.has(category);
}

function isAudioFile(file) {
  const name = String(file?.name || '').toLowerCase();
  const type = String(file?.type || '').toLowerCase();
  return type.startsWith('audio/') || AUDIO_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function dedupeTracks(tracks) {
  const out = new Map();
  for (const item of tracks || []) {
    const key = normalizePath(item.path || item.url || item.name);
    if (!key) continue;
    if (!out.has(key)) out.set(key, item);
  }
  return Array.from(out.values());
}

export function normalizeAudioTrack(track, source = 'manifest') {
  const pathValue = track.path || track.url || track.file || '';
  const name = track.name || displayName(track.file || pathValue || track.id || 'Audio');
  const id = track.id || `audio-${slugify(pathValue || name)}`;
  const category = track.category || inferCategory(track);
  const group = track.group || 'Audio';
  const url = pathValue.startsWith('assets/') ? pathValue : (pathValue ? `assets/audio/${pathValue}` : '');
  return {
    id,
    name,
    path: url,
    url,
    category,
    group,
    source,
    builtin: source === 'builtin'
  };
}

export function groupAudioTracks(tracks) {
  const groups = new Map();
  for (const track of tracks) {
    const group = track.group || 'Audio';
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(track);
  }
  return groups;
}

export async function loadFullAudioManifest() {
  const paths = ['assets/audio/audio-manifest.json', 'audio-manifest.json'];
  for (const manifestPath of paths) {
    try {
      const res = await fetch(manifestPath, { cache: 'no-store' });
      if (!res.ok) continue;
      const data = await res.json();
      const tracks = Array.isArray(data?.tracks) ? data.tracks.map((track) => normalizeAudioTrack(track, 'manifest')) : [];
      if (tracks.length) return tracks;
    } catch {
      // continue
    }
  }
  return [];
}

export function bundledLibrary() {
  return FALLBACK_BUILTIN.map((track) => ({ ...track }));
}

async function importAudioFiles(fileList) {
  const files = Array.from(fileList || []);
  const imported = [];
  files.forEach((file, index) => {
    if (!isAudioFile(file)) return;
    const id = `import-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`;
    const url = URL.createObjectURL(file);
    const rel = file.webkitRelativePath || file.name;
    const track = normalizeAudioTrack(
      {
        id,
        name: displayName(file.name),
        path: rel,
        url,
        category: inferCategory({ path: rel, name: file.name }),
        group: rel.includes('/') ? rel.split('/')[0] : 'import'
      },
      'import'
    );
    track.url = url;
    imported.push(track);
  });

  if (imported.length) {
    const preserved = state.library.filter((track) => track.source !== 'import');
    state.library = dedupeTracks([...preserved, ...imported]);
  }

  populateAudioEnumsFromManifest(state.library);
  renderLibraryRoots();
  renderLibrary();
}

export async function loadServerLibrary(force = false) {
  const manifestTracks = await loadFullAudioManifest();

  let serverTracks = [];
  let message = '';
  if (window.fetch && force) {
    try {
      const res = await fetch(`/api/library${force ? '?rescan=1' : ''}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        state.serverRoots = Array.isArray(data.roots) ? data.roots : [];
        serverTracks = Array.isArray(data.tracks)
          ? data.tracks.map((track) => normalizeAudioTrack({
            id: track.id,
            name: track.name,
            path: track.url || track.path,
            group: track.group || track.root || 'server',
            category: inferCategory(track)
          }, 'server'))
          : [];
        message = data.message || '';
      }
    } catch {
      state.serverRoots = [];
    }
  }

  const manualImports = state.library.filter((track) => track.source === 'import');
  state.library = dedupeTracks([
    ...bundledLibrary(),
    ...manifestTracks,
    ...serverTracks,
    ...manualImports
  ]);

  if (!message) {
    message = manifestTracks.length
      ? `${manifestTracks.length} piste(s) chargée(s) via manifest audio.`
      : 'Manifest audio introuvable, fallback intégré utilisé.';
  }
  state.libraryScanMessage = message;
}

function trackOptionLabel(track) {
  return `${track.group || 'Audio'} · ${track.name}`;
}

function tracksForCategory(category) {
  const filtered = state.library.filter((track) => categoryFits(track.category, category));
  return filtered.length ? filtered : state.library;
}

function populateAudioSelect(selectId, category) {
  const select = $('#' + selectId);
  if (!select) return;
  const current = select.value;
  const tracks = tracksForCategory(category);
  const grouped = groupAudioTracks(tracks);

  select.innerHTML = '';
  const none = document.createElement('option');
  none.value = '';
  none.textContent = 'Aucun';
  select.appendChild(none);

  for (const [group, items] of grouped) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group;
    items.forEach((track) => {
      const option = document.createElement('option');
      option.value = track.id;
      option.textContent = trackOptionLabel(track);
      optgroup.appendChild(option);
    });
    select.appendChild(optgroup);
  }

  if (tracks.some((track) => track.id === current)) {
    select.value = current;
  }
}

export function populateAudioEnumsFromManifest(tracks = state.library) {
  if (tracks !== state.library) state.library = dedupeTracks(tracks);
  populateAudioSelect('mixageAudio', 'mixage');
  populateAudioSelect('breathAudio', 'breath');
  populateAudioSelect('gyroAudio', 'gyro');
  populateAudioSelect('tensionAudio', 'tension');
  populateAudioSelect('sessionMixageAudio', 'mixage');
  populateAudioSelect('sessionBreathAudio', 'breath');

  const finalValue = String($('#sessionFinal')?.value || '').toLowerCase();
  const finalCategory = finalValue.includes('rotor') || finalValue === 'gyrascope' ? 'gyro' : 'tension';
  populateAudioSelect('sessionFinalAudio', finalCategory);
}

export function populateAudioSelects() {
  populateAudioEnumsFromManifest();
}

function stopBackgroundAudio() {
  if (state.backgroundAudio) {
    try { state.backgroundAudio.pause(); } catch {}
    try { state.backgroundAudio.currentTime = 0; } catch {}
  }
  state.backgroundAudio = null;
  state.backgroundAudioId = null;
}

export function bindLibraryInputs() {
  $('#libraryInputFiles')?.addEventListener('change', (event) => importAudioFiles(event.target.files));
  $('#libraryInputFolder')?.addEventListener('change', (event) => importAudioFiles(event.target.files));
  $('#libraryRescanServer')?.addEventListener('click', async () => {
    await loadServerLibrary(true);
    populateAudioEnumsFromManifest();
    renderLibraryRoots();
    renderLibrary();
  });
  $('#clearLibrary')?.addEventListener('click', async () => {
    state.library
      .filter((track) => track.source === 'import')
      .forEach((track) => {
        try { URL.revokeObjectURL(track.url); } catch {}
      });
    await loadServerLibrary();
    populateAudioEnumsFromManifest();
    renderLibraryRoots();
    renderLibrary();
  });
}

export function renderLibraryRoots() {
  const host = $('#libraryRoots');
  if (!host) return;
  const serverCount = state.library.filter((track) => track.source === 'server').length;
  const importCount = state.library.filter((track) => track.source === 'import').length;
  const manifestCount = state.library.filter((track) => track.source === 'manifest').length;
  host.innerHTML = `<strong>Playlists synchronisées</strong><div class="root-note">${manifestCount} manifest · ${serverCount} serveur · ${importCount} import(s) manuel(s) · ${escapeHtml(state.libraryScanMessage || 'Synchronisation prête.')}</div>`;
}

export function renderLibrary() {
  const host = $('#libraryList');
  if (!host) return;
  host.innerHTML = '';

  if (!state.library.length) {
    host.innerHTML = '<div class="note-box">Aucun fichier audio détecté.</div>';
    return;
  }

  state.library.forEach((track) => {
    const row = document.createElement('div');
    row.className = 'library-item';

    const head = document.createElement('div');
    head.className = 'library-item-head';

    const left = document.createElement('div');
    const sourceLabel = track.source === 'server'
      ? 'serveur'
      : (track.source === 'manifest' ? 'manifest' : (track.builtin ? 'intégré' : 'import'));
    left.innerHTML = `<strong>${escapeHtml(track.name)}</strong> <span class="tag-inline">${sourceLabel}</span>`;

    const actions = document.createElement('div');
    const play = document.createElement('button');
    play.className = 'secondary-btn';
    play.textContent = 'ÉÉcouter';
    play.addEventListener('click', async () => {
      stopBackgroundAudio();
      try {
        state.backgroundAudio = new Audio(track.url);
        state.backgroundAudio.loop = true;
        state.backgroundAudio.volume = 0.45;
        await state.backgroundAudio.play();
        state.backgroundAudioId = track.id;
      } catch {
        state.backgroundAudio = null;
        state.backgroundAudioId = null;
      }
    });

    const stop = document.createElement('button');
    stop.className = 'secondary-btn';
    stop.textContent = 'Stop';
    stop.addEventListener('click', stopBackgroundAudio);

    actions.append(play, stop);
    head.append(left, actions);

    const pathNode = document.createElement('div');
    pathNode.className = 'library-path';
    pathNode.textContent = track.path;

    row.append(head, pathNode);
    host.appendChild(row);
  });

  const builtinCount = state.library.filter((track) => track.source === 'builtin').length;
  const manifestCount = state.library.filter((track) => track.source === 'manifest').length;
  const serverCount = state.library.filter((track) => track.source === 'server').length;
  const importCount = state.library.filter((track) => track.source === 'import').length;

  $('#librarySummary').textContent = `${state.library.length} piste(s) · ${builtinCount} intégrée(s) · ${manifestCount} manifest · ${serverCount} serveur · ${importCount} import(s).`;
}
