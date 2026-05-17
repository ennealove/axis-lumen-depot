(function () {
  'use strict';

  var BASE    = 'assets/images/images objet/';
  var BANDEAU = 'assets/images/personnage avec bandeau sur les yeux.png';

  var FORMES_COULEURS = {
    'Carré':     { dossier: BASE + 'carré/',          couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Rectangle': { dossier: BASE + 'rectangle/',      couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Triangle':  { dossier: BASE + 'triangle/',       couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Cercle':    { dossier: BASE + 'cercles/',        couleurs: { bleu: 'bleu.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Objet 3D':  { dossier: BASE + 'objet 3D/',      couleurs: { bleu: 'sphère bleu.png', rouge: 'cube rouge.png', vert: 'cylindre vert.png', orange: 'cone orange.png', jaune: 'etoile jaune.png', violet: 'pyramide violet.png' } },
    'Fleurs':    { dossier: BASE + 'fleurs/tulipes/', couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'verte.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Roses':     { dossier: BASE + 'fleurs/rose/',   couleurs: { bleu: 'rose bleu.png', rouge: 'rose rouge.png', jaune: 'rose jaune.png', violet: 'rose rose.png', vert: 'rose blanche.png', orange: 'rose noir.png' } }
  };

  var SWINGS = {
    lateral:  { label: 'Latéral ↔',           mantra: 'ILLI', icon: '↔',
      guidance:     'Balancement gauche / droite. Mantra ILLI — langue contre le palais.',
      voiceGrand:   'Grand balancement latéral. ILLI — de tempe à tempe, en rythme avec ton mouvement.',
      voicePetit:   'Petit balancement. Réduis l\'amplitude. ILLI continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement latéral.' },
    vertical: { label: 'Vertical ↕',           mantra: 'ALLA', icon: '↕',
      guidance:     'Balancement haut / bas. Mantra ALLA — axe et verticalité intérieure.',
      voiceGrand:   'Grand balancement vertical. ALLA — du menton vers le sommet du crâne.',
      voicePetit:   'Petit balancement. Amplitude réduite. ALLA continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement vertical.' },
    ap:       { label: 'Antéro-postérieur ⇄',  mantra: 'ELLU', icon: '⇄',
      guidance:     'Balancement avant / arrière. Mantra ELLU — sphère intérieure de présence.',
      voiceGrand:   'Grand balancement antéro-postérieur. ELLU — de l\'avant vers l\'arrière du crâne.',
      voicePetit:   'Petit balancement. ELLU continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement antéro-postérieur.' }
  };

  /* ── 15-day schedule — fully pre-configured ──────────────────────── */
  /* swings: array rotated per cycle; cycles: number of repetitions     */
  /* Rotation stricte : Latéral (J1,4,7,10,13) → Vertical (J2,5,8,11,14) → AP (J3,6,9,12) → tous 3 (J15) */
  var PROGRAMME = [
    { jour: 1,  titre: 'Latéral · Carré bleu',                 theme: 'Fondation — stabilité',     forme: 'Carré',     couleur: 'bleu',   icon: '◻', swings: ['lateral'],               cycles: 5 },
    { jour: 2,  titre: 'Vertical · Carré rouge',               theme: 'Activation — chaleur',      forme: 'Carré',     couleur: 'rouge',  icon: '◻', swings: ['vertical'],              cycles: 5 },
    { jour: 3,  titre: 'Antéro-postérieur · Rectangle vert',   theme: 'Extension — espace',        forme: 'Rectangle', couleur: 'vert',   icon: '▭', swings: ['ap'],                    cycles: 6 },
    { jour: 4,  titre: 'Latéral · Rectangle orange',           theme: 'Profondeur intérieure',     forme: 'Rectangle', couleur: 'orange', icon: '▭', swings: ['lateral'],               cycles: 6 },
    { jour: 5,  titre: 'Vertical · Triangle bleu',             theme: 'Direction — ascension',     forme: 'Triangle',  couleur: 'bleu',   icon: '△', swings: ['vertical'],              cycles: 6 },
    { jour: 6,  titre: 'Antéro-postérieur · Triangle violet',  theme: 'Élévation intérieure',      forme: 'Triangle',  couleur: 'violet', icon: '△', swings: ['ap'],                    cycles: 7 },
    { jour: 7,  titre: 'Latéral · Cercle bleu',                theme: 'Complétude — cycle',        forme: 'Cercle',    couleur: 'bleu',   icon: '○', swings: ['lateral'],               cycles: 7 },
    { jour: 8,  titre: 'Vertical · Cercle orange',             theme: 'Expansion cyclique',        forme: 'Cercle',    couleur: 'orange', icon: '○', swings: ['vertical'],              cycles: 7 },
    { jour: 9,  titre: 'Antéro-postérieur · Sphère bleue',     theme: 'Volume tridimensionnel',    forme: 'Objet 3D',  couleur: 'bleu',   icon: '◈', swings: ['ap'],                    cycles: 8 },
    { jour: 10, titre: 'Latéral · Cube rouge',                 theme: 'Structure — intériorité',   forme: 'Objet 3D',  couleur: 'rouge',  icon: '◈', swings: ['lateral'],               cycles: 8 },
    { jour: 11, titre: 'Vertical · Fleurs violettes',          theme: 'Vivant — organique',        forme: 'Fleurs',    couleur: 'violet', icon: '✿', swings: ['vertical'],              cycles: 8 },
    { jour: 12, titre: 'Antéro-postérieur · Rose rouge',       theme: 'Beauté intérieure',         forme: 'Roses',     couleur: 'rouge',  icon: '✿', swings: ['ap'],                    cycles: 9 },
    { jour: 13, titre: 'Latéral · Visualisation',              theme: 'Projection — présence',     special: 'person',  icon: '👤',        swings: ['lateral'],                       cycles: 9 },
    { jour: 14, titre: 'Vertical · Fusion profonde',           theme: 'Intégration — immobilité',  special: 'person',  icon: '👤',        swings: ['vertical'],                      cycles: 10 },
    { jour: 15, titre: 'Complet · Support animé',              theme: 'Intégration totale',        special: 'canvas',  icon: '✦',         swings: ['lateral', 'vertical', 'ap'],     cycles: 12 }
  ];

  var LS_KEY = 'axis_p15b_prog';
  var selectedDay    = null;
  var sessionInterval = null;
  var sessionAudio   = null;
  var metroBeat      = 0;

  function $ (id) { return document.getElementById(id); }
  function setEl(id, txt) { var el = $(id); if (el) el.textContent = txt; }

  /* ── Web Audio ────────────────────────────────────────────────────── */
  var SND = (function () {
    var ctx = null;
    function C() { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return ctx; }
    function tone(f, d, v, t) {
      var c = C(); if (!c) return;
      try {
        var o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = t || 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(v, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + d);
        o.start(); o.stop(c.currentTime + d);
      } catch (e) {}
    }
    return {
      phaseBell: function () { tone(528, 1.8, 0.30); },
      majorBell: function () { tone(396, 2.2, 0.28); setTimeout(function () { tone(528, 1.8, 0.22); }, 300); },
      metronome: function () { tone(800, 0.04, 0.12, 'square'); },
      endBell:   function () {
        tone(528, 2.5, 0.32);
        setTimeout(function () { tone(660, 2.0, 0.24); }, 800);
        setTimeout(function () { tone(792, 1.5, 0.18); }, 1600);
      }
    };
  })();

  /* ── Progression ──────────────────────────────────────────────────── */
  function loadProg() {
    try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {}
    return { done: [], activeDay: 1 };
  }
  function saveProg(p) { try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (e) {} }
  function markDone(num) {
    var p = loadProg();
    if (p.done.indexOf(num) < 0) p.done.push(num);
    if (p.activeDay <= num && num < 15) p.activeDay = num + 1;
    saveProg(p);
  }

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function getThumbImg(day) {
    if (day.forme && day.couleur) {
      var f = FORMES_COULEURS[day.forme];
      if (f && f.couleurs[day.couleur]) return f.dossier + f.couleurs[day.couleur];
    }
    if (day.special === 'person') return BASE + 'fleurs/arbre/arbre plus personne.png';
    return '';
  }

  function cycleDurSec(day) {
    return day.cycles * (20 + 30 + 5 + 8 + 180) + 120;
  }

  function uniqueArr(arr) {
    return arr.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }

  /* ── Grid rendering ───────────────────────────────────────────────── */
  function renderGrid() {
    var grid = $('p15Grid'); if (!grid) return;
    var prog = loadProg();
    grid.innerHTML = '';

    PROGRAMME.forEach(function (day) {
      var isDone   = prog.done.indexOf(day.jour) >= 0;
      var isActive = day.jour === prog.activeDay;
      var isSel    = selectedDay && selectedDay.jour === day.jour;

      var cls = 'p15-card';
      if (isDone)   cls += ' done';
      if (isActive) cls += ' active-day';
      if (isSel)    cls += ' selected';

      var card = document.createElement('div');
      card.className = cls;

      var imgSrc = getThumbImg(day);
      var thumbHtml = imgSrc
        ? '<img class="p15-card-thumb" src="' + imgSrc + '" alt="' + day.titre + '" loading="lazy">'
        : '<div class="p15-card-thumb" style="display:flex;align-items:center;justify-content:center;font-size:2.5rem;">' + day.icon + '</div>';

      var swingIcons = uniqueArr(day.swings.map(function (s) { return SWINGS[s].icon; })).join('');
      var mantras    = uniqueArr(day.swings.map(function (s) { return SWINGS[s].mantra; })).join(' · ');
      var totalMin   = Math.round(cycleDurSec(day) / 60);

      card.innerHTML =
        '<span class="p15-card-num">Jour ' + day.jour + '</span>' +
        '<div class="p15-card-thumb-wrap">' + thumbHtml +
          '<span class="p15-card-swing">' + swingIcons + '</span>' +
        '</div>' +
        '<span class="p15-card-title">' + day.titre + '</span>' +
        '<span class="p15-card-mantra">' + mantras + '</span>' +
        '<span class="p15-card-dur">≈ ' + totalMin + ' min · ' + day.cycles + ' cycles</span>' +
        (isDone ? '<span class="p15-card-done-badge">✓ Complété</span>' : '') +
        (!isDone && isActive ? '<span class="p15-card-done-badge" style="color:#d8b86f;">Jour actif</span>' : '');

      card.addEventListener('click', function () { selectedDay = day; renderGrid(); updateLaunchBar(); });
      grid.appendChild(card);
    });
  }

  function updateLaunchBar() {
    var info = $('p15LaunchInfo'), btn = $('p15LaunchBtn');
    if (!info || !btn) return;
    if (!selectedDay) {
      info.textContent = 'Sélectionne un jour pour commencer.';
      btn.disabled = true;
      return;
    }
    var d = selectedDay;
    info.textContent = 'Jour ' + d.jour + ' · ' + d.titre + ' · ≈ ' + Math.round(cycleDurSec(d) / 60) + ' min';
    btn.disabled = false;
  }

  /* ── Build phases for a day ───────────────────────────────────────── */
  function buildPhases(day) {
    var phases = [];

    for (var i = 0; i < day.cycles; i++) {
      var n        = i + 1;
      var label    = 'Cycle ' + n + '/' + day.cycles;
      var swingKey = day.swings[i % day.swings.length];
      var swing    = SWINGS[swingKey];

      /* Contemplation — image or animated point */
      var imgUrl = '', objLabel = '';
      if (day.forme && day.couleur) {
        var f = FORMES_COULEURS[day.forme];
        if (f && f.couleurs[day.couleur]) {
          imgUrl   = f.dossier + f.couleurs[day.couleur];
          objLabel = (day.forme === 'Objet 3D' || day.forme === 'Roses')
            ? f.couleurs[day.couleur].replace('.png', '')
            : day.forme + ' ' + day.couleur;
        }
      } else if (day.special === 'person') {
        imgUrl   = BASE + 'fleurs/arbre/arbre plus personne.png';
        objLabel = 'Visualisation';
      }

      if (imgUrl) {
        phases.push({ kind: 'image', dur: 20, img: imgUrl,
          title: 'Contemplation — ' + objLabel, sub: label,
          guide: 'Fixez cet objet du regard. Laissez la forme s\'imprimer dans votre esprit sans cligner des yeux.' });
      } else {
        phases.push({ kind: 'pendulum', dur: 20, swing: swingKey, mantra: swing.mantra,
          title: 'Contemplation — Point lumineux', sub: label,
          guide: 'Suivez le point lumineux animé du regard. Laissez votre vision accompagner le mouvement.' });
      }

      phases.push({ kind: 'text', dur: 30, icon: '☀',
        title: 'Observation lumineuse', sub: label, mainText: 'Regardez la lumière',
        guide: 'Allumez la source lumineuse. Regardez-la pendant 30 secondes sans cligner des yeux.' });

      phases.push({ kind: 'text', dur: 5, icon: '◯',
        title: 'Éteignez la lumière', sub: label, mainText: 'Éteignez maintenant',
        guide: 'Coupez la lumière. Préparez-vous à entrer dans l\'obscurité.' });

      phases.push({ kind: 'image', dur: 8, img: BANDEAU,
        title: 'Posez le bandeau', sub: label,
        guide: 'Posez le bandeau sur vos yeux. Installez-vous confortablement pour le balancement.' });

      phases.push({ kind: 'balancement', dur: 180, swing: swingKey, mantra: swing.mantra,
        title: swing.label + ' · ' + swing.mantra, sub: label, guide: swing.guidance,
        segments: [
          { from: 0,   to: 60,  label: 'Grand mouvement',   guide: swing.voiceGrand },
          { from: 60,  to: 120, label: 'Petit balancement',  guide: swing.voicePetit },
          { from: 120, to: 180, label: 'Grand mouvement',   guide: swing.voiceReprise }
        ]
      });
    }

    phases.push({ kind: 'text', dur: 120, icon: '◉',
      title: 'Rémanence', sub: 'Restez immobile', mainText: 'Observez les phosphènes',
      guide: 'Restez immobile, bandeau sur les yeux. Observez les formes lumineuses intérieures. Laissez la rémanence s\'installer dans le silence.' });

    return phases;
  }

  /* ── Overlay display ──────────────────────────────────────────────── */
  function showPhase(ph) {
    var img  = $('p15SovImg');
    var pend = $('p15SovPendulum');
    var txt  = $('p15SovText');
    var dot  = $('p15SovDot');

    if (img)  img.style.display  = 'none';
    if (pend) pend.style.display = 'none';
    if (txt)  txt.style.display  = 'none';

    if (ph.kind === 'image') {
      if (img) { img.src = ph.img; img.style.display = ''; }
    } else if (ph.kind === 'balancement' || ph.kind === 'pendulum') {
      if (pend) pend.style.display = '';
      if (dot)  dot.className = 'p15-sov-dot ' + ph.swing;
    } else {
      if (txt) txt.style.display = 'flex';
      setEl('p15SovIcon',     ph.icon     || '');
      setEl('p15SovMainText', ph.mainText || '');
    }

    setEl('p15SovTitle',  ph.title || '');
    setEl('p15SovPhase',  ph.sub   || '');
    setEl('p15SovGuide',  ph.guide || '');
    setEl('p15SovMantra', (ph.kind === 'balancement' || ph.kind === 'pendulum') ? ph.mantra : '');
    setEl('p15SovCountdown', '');
  }

  /* ── Session runner ───────────────────────────────────────────────── */
  function lancerSession(day) {
    var overlay = $('p15Overlay'); if (!overlay) return;
    var phases   = buildPhases(day);
    var totalDur = phases.reduce(function (s, p) { return s + p.dur; }, 0);
    var elapsed = 0, phaseIdx = 0, phaseElapsed = 0;

    overlay.classList.remove('hidden');
    SND.majorBell();

    var tracks = window.AXIS_AUDIO_TRACKS || [];
    if (tracks.length) {
      sessionAudio = new Audio(tracks[0].url);
      sessionAudio.loop = true; sessionAudio.volume = 0.28;
      sessionAudio.play().catch(function () {});
    }

    setEl('p15SovKicker', 'Programme 15 jours · Jour ' + day.jour + '/15');
    showPhase(phases[0]);
    if (sessionInterval) clearInterval(sessionInterval);
    metroBeat = 0;

    sessionInterval = setInterval(function () {
      elapsed++; phaseElapsed++;

      var bar = $('p15ProgBar');
      if (bar) bar.style.width = Math.min(100, (elapsed / totalDur) * 100) + '%';

      var ph = phases[phaseIdx];
      var remaining = ph.dur - phaseElapsed;

      /* Total timer */
      var rem = totalDur - elapsed;
      setEl('p15SovTimer', Math.floor(rem / 60) + 'min ' + (rem % 60 < 10 ? '0' : '') + (rem % 60) + 's');

      /* Phase countdown */
      if (ph.kind !== 'balancement') {
        setEl('p15SovCountdown', remaining > 0 ? String(remaining) : '');
      }

      /* Balancement — metronome + segment updates */
      if (ph.kind === 'balancement') {
        metroBeat++;
        if (metroBeat % 2 === 0) SND.metronome();
        var segs = ph.segments, activeSeg = segs[segs.length - 1];
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed <= segs[si].to) { activeSeg = segs[si]; break; }
        }
        setEl('p15SovPhase', ph.sub + ' · ' + activeSeg.label);
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed === segs[si].from + 1) {
            setEl('p15SovGuide', activeSeg.guide);
            SND.phaseBell();
          }
        }
      }

      /* Phase transition */
      if (phaseElapsed >= ph.dur) {
        phaseIdx++; phaseElapsed = 0; metroBeat = 0;
        if (phaseIdx >= phases.length) {
          SND.endBell();
          stopSession();
          markDone(day.jour);
          renderGrid();
          return;
        }
        SND.majorBell();
        showPhase(phases[phaseIdx]);
      }
    }, 1000);
  }

  function stopSession() {
    if (sessionInterval) { clearInterval(sessionInterval); sessionInterval = null; }
    if (sessionAudio)    { sessionAudio.pause(); sessionAudio = null; }
    var overlay = $('p15Overlay');
    if (overlay) overlay.classList.add('hidden');
    var bar = $('p15ProgBar'); if (bar) bar.style.width = '0%';
  }

  /* ── Init ─────────────────────────────────────────────────────────── */
  function init() {
    var prog = loadProg();
    var activeNum = prog.activeDay || 1;
    selectedDay = PROGRAMME.filter(function (d) { return d.jour === activeNum; })[0] || PROGRAMME[0];

    renderGrid(); updateLaunchBar();

    var btn = $('p15LaunchBtn');
    if (btn) btn.addEventListener('click', function () { if (selectedDay) lancerSession(selectedDay); });

    var stop = $('p15SovStop');
    if (stop) stop.addEventListener('click', stopSession);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
