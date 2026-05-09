/* axis-audio-local-patch.js
   Sur localhost : remplace les URLs GitHub Releases par les chemins assets/audio/ locaux
   Sur production (Render) : ne fait rien */
(function () {
  var isLocal = window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '';

  if (!isLocal) return;

  var GITHUB_BASE = 'https://github.com/ennealove/axis-lumen-depot/releases/download/audio-v1/';
  var LOCAL_BASE  = 'assets/audio/';

  // Renommages inverses (nom release -> nom fichier local original)
  var RENAMES = {
    'equilibrage_rythme_1sec_alt.wav':              'equilibrage rythme 1 sec alt.wav',
    'rythme_australie2_1.12s_4mn.mp3':              'rythme_australie2_ 1.12s_4mn.mp3',
    'relaxingtime-relax-music-vol10-188655-alt.mp3':'relaxingtime-relax-music-vol10-188655 (1).mp3'
  };

  function toLocal(url) {
    if (typeof url !== 'string' || !url.startsWith(GITHUB_BASE)) return url;
    var filename = url.slice(GITHUB_BASE.length);
    var localName = RENAMES[filename] || filename;
    return LOCAL_BASE + localName;
  }

  function patchTracks(arr) {
    if (!Array.isArray(arr)) return;
    arr.forEach(function (t) { if (t && t.url) t.url = toLocal(t.url); });
  }

  // Patcher les sessions stockées en localStorage (audioTrack.url)
  var SESSION_KEYS = [
    'axis_lumen_custom_session',
    'axis_lumen_generated_session',
    'axis_current_session',
    'axis-practice-session'
  ];

  function patchLocalStorage() {
    SESSION_KEYS.forEach(function (key) {
      try {
        var raw = localStorage.getItem(key);
        if (!raw) return;
        var session = JSON.parse(raw);
        var changed = false;

        // Patcher audioTrack dans la session principale
        if (session && session.audioTrack && session.audioTrack.url) {
          var patched = toLocal(session.audioTrack.url);
          if (patched !== session.audioTrack.url) {
            session.audioTrack.url = patched;
            changed = true;
          }
        }

        // Patcher audioTrack dans chaque phase
        if (session && Array.isArray(session.phases)) {
          session.phases.forEach(function (phase) {
            if (phase && phase.audioTrack && phase.audioTrack.url) {
              var p = toLocal(phase.audioTrack.url);
              if (p !== phase.audioTrack.url) {
                phase.audioTrack.url = p;
                changed = true;
              }
            }
          });
        }

        if (changed) localStorage.setItem(key, JSON.stringify(session));
      } catch (_) {}
    });
  }

  // Patcher AXIS_AUDIO_TRACKS immédiatement
  patchTracks(window.AXIS_AUDIO_TRACKS);

  // Patcher le localStorage dès maintenant et après DOMContentLoaded
  patchLocalStorage();
  document.addEventListener('DOMContentLoaded', function () {
    patchTracks(window.AXIS_AUDIO_TRACKS);
    patchLocalStorage();
  });
})();
