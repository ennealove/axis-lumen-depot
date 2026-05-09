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

  // Patcher AXIS_AUDIO_TRACKS immédiatement s'il est déjà chargé
  patchTracks(window.AXIS_AUDIO_TRACKS);

  // Patcher aussi après DOMContentLoaded au cas où
  document.addEventListener('DOMContentLoaded', function () {
    patchTracks(window.AXIS_AUDIO_TRACKS);
  });
})();