/* axis-video-local-patch.js
   Sur localhost : remplace les URLs GitHub Releases video-v1 par les chemins locaux
   Sur production (Render) : ne fait rien */
(function () {
  var isLocal = window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '';

  if (!isLocal) return;

  var GITHUB_BASE = 'https://github.com/ennealove/axis-lumen-depot/releases/download/video-v1/';

  // Mapping filename -> chemin local (web/ ou complete/)
  var LOCAL_MAP = {
    // web
    'balancement-lateral-complet.web.mp4':       'assets/videos/web/balancement-lateral-complet.web.mp4',
    'balancement-vertical-complet.web.mp4':      'assets/videos/web/balancement-vertical-complet.web.mp4',
    'observer-la-lumiere-2.web.mp4':             'assets/videos/web/observer-la-lumiere-2.web.mp4',
    'oscillation-lateral.mp4':                   'assets/videos/web/oscillation-lateral.mp4',
    'oscillation-rotation.mp4':                  'assets/videos/web/oscillation-rotation.mp4',
    'oscillation-vertical.mp4':                  'assets/videos/web/oscillation-vertical.mp4',
    'respiration-complete-10-minutes.web.mp4':   'assets/videos/web/respiration-complete-10-minutes.web.mp4',
    'session-detente.mp4':                       'assets/videos/web/session-detente.mp4',
    'session-lumiere-30s.mp4':                   'assets/videos/web/session-lumiere-30s.mp4',
    'session-respiration.mp4':                   'assets/videos/web/session-respiration.mp4',
    'session-rotation.mp4':                      'assets/videos/web/session-rotation.mp4',
    'session-tension-statique.mp4':              'assets/videos/web/session-tension-statique.mp4',
    'tension-statique-complete.web.mp4':         'assets/videos/web/tension-statique-complete.web.mp4',
    // complete
    'balancement-lateral-complet.mp4':           'assets/videos/complete/balancement-lateral-complet.mp4',
    'balancement-vertical-complet.mp4':          'assets/videos/complete/balancement-vertical-complet.mp4',
    'observer-la-lumiere-2.mp4':                 'assets/videos/complete/observer-la-lumiere-2.mp4',
    'respiration-complete-10-minutes.mp4':       'assets/videos/complete/respiration-complete-10-minutes.mp4',
    'tension-statique-complete.mp4':             'assets/videos/complete/tension-statique-complete.mp4'
  };

  function toLocal(url) {
    if (typeof url !== 'string' || !url.startsWith(GITHUB_BASE)) return url;
    var filename = url.slice(GITHUB_BASE.length);
    return LOCAL_MAP[filename] || url;
  }

  // Patcher les éléments <video> dans le DOM
  function patchVideoElements() {
    document.querySelectorAll('video[src]').forEach(function (v) {
      var local = toLocal(v.src);
      if (local !== v.src) v.src = local;
    });
    document.querySelectorAll('source[src]').forEach(function (s) {
      var local = toLocal(s.src);
      if (local !== s.src) { s.src = local; if (s.parentElement) s.parentElement.load(); }
    });
    // Patcher les attributs data-src (ex: boutons oscillation)
    document.querySelectorAll('[data-src]').forEach(function (el) {
      var raw = el.getAttribute('data-src');
      var local = toLocal(raw);
      if (local !== raw) el.setAttribute('data-src', local);
    });
  }

  // Patcher les sessions localStorage (videoUrl dans phases)
  var SESSION_KEYS = [
    'axis_lumen_custom_session', 'axis_lumen_generated_session',
    'axis_current_session', 'axis-practice-session'
  ];

  function patchLocalStorage() {
    SESSION_KEYS.forEach(function (key) {
      try {
        var raw = localStorage.getItem(key);
        if (!raw) return;
        var session = JSON.parse(raw);
        var changed = false;
        if (Array.isArray(session && session.phases)) {
          session.phases.forEach(function (phase) {
            ['videoUrl', 'src', 'url'].forEach(function (field) {
              if (phase[field]) {
                var p = toLocal(phase[field]);
                if (p !== phase[field]) { phase[field] = p; changed = true; }
              }
            });
          });
        }
        if (changed) localStorage.setItem(key, JSON.stringify(session));
      } catch (_) {}
    });
  }

  // Patcher les objets JS globaux de vidéos
  function patchVideoMaps() {
    ['AXIS_VIDEO_MAP', 'AXIS_SESSION_VIDEOS', 'AXIS_VIDEO_SOURCES'].forEach(function (name) {
      var obj = window[name];
      if (!obj) return;
      Object.keys(obj).forEach(function (k) {
        if (typeof obj[k] === 'string') obj[k] = toLocal(obj[k]);
        else if (obj[k] && typeof obj[k].src === 'string') obj[k].src = toLocal(obj[k].src);
        else if (obj[k] && typeof obj[k].url === 'string') obj[k].url = toLocal(obj[k].url);
      });
    });
  }

  // Observer les changements DOM pour les vidéos ajoutées dynamiquement
  var observer = new MutationObserver(function () { patchVideoElements(); });

  document.addEventListener('DOMContentLoaded', function () {
    patchVideoElements();
    patchVideoMaps();
    patchLocalStorage();
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
  });

  // Aussi au chargement immédiat
  patchVideoMaps();
  patchLocalStorage();
})();
