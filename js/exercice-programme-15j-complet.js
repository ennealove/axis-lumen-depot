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
    lateral:  { label: 'Latéral ↔', mantra: 'ILLI', icon: '↔',
      guidance: 'Balancement gauche / droite. Mantra ILLI.',
      voiceGrand: 'Grand balancement latéral. ILLI — de tempe à tempe.',
      voicePetit: 'Petit balancement. ILLI continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement latéral.' },
    vertical: { label: 'Vertical ↕', mantra: 'ALLA', icon: '↕',
      guidance: 'Balancement haut / bas. Mantra ALLA.',
      voiceGrand: 'Grand balancement vertical. ALLA — du menton vers le sommet.',
      voicePetit: 'Petit balancement. ALLA continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement vertical.' },
    ap:       { label: 'Antéro-postérieur ⇄', mantra: 'ELLU', icon: '⇄',
      guidance: 'Balancement avant / arrière. Mantra ELLU.',
      voiceGrand: 'Grand balancement antéro-postérieur. ELLU.',
      voicePetit: 'Petit balancement. ELLU continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement antéro-postérieur.' }
  };

  /* ── Respiration rhythms (seconds per phase) ──────────────────────── */
  var RYTHMES = {
    naturelle:     { in: 4, hold: 0, out: 4, pause: 0, label: 'Observation naturelle' },
    diaphragm:     { in: 5, hold: 0, out: 5, pause: 0, label: 'Diaphragmatique' },
    carree4:       { in: 4, hold: 4, out: 4, pause: 4, label: 'Carrée 4×4' },
    carree6:       { in: 6, hold: 6, out: 6, pause: 6, label: 'Carrée 6×6' },
    triangulaire4: { in: 4, hold: 4, out: 4, pause: 0, label: 'Triangulaire 4×4' },
    triangulaire6: { in: 6, hold: 6, out: 6, pause: 0, label: 'Triangulaire 6×6' },
    rectangulaire: { in: 4, hold: 2, out: 8, pause: 0, label: 'Rectangulaire' },
    rectLongue:    { in: 6, hold: 3, out: 12, pause: 0, label: 'Rectangulaire longue' },
    cardiaque:     { in: 3, hold: 0, out: 3, pause: 0, label: 'Rythme cardiaque' },
    pneumophene:   { in: 8, hold: 0, out: 8, pause: 0, label: 'Pneumophène' }
  };

  /* ── 15-day schedule ─────────────────────────────────────────────── */
  /* bal: balancement config; resp: respiration config                   */
  var PROGRAMME = [
    { jour: 1,  titre: 'Fondation — Souffle naturel',    icon: '◻🌬',
      bal:  { forme: 'Carré',     couleur: 'bleu',   swings: ['lateral'],           cycles: 3 },
      resp: { rythme: 'naturelle',     cycles: 8,  guide: 'Observe ton souffle naturel. Sans forcer, sans contrôle. Laisse le rythme venir.' } },
    { jour: 2,  titre: 'Chaleur — Diaphragme',           icon: '◻🫁',
      bal:  { forme: 'Carré',     couleur: 'rouge',  swings: ['vertical'],          cycles: 3 },
      resp: { rythme: 'diaphragm',     cycles: 8,  guide: 'Respiration diaphragmatique. À l\'inspire, le ventre se gonfle doucement.' } },
    { jour: 3,  titre: 'Espace — Respiration carrée',    icon: '▭□',
      bal:  { forme: 'Rectangle', couleur: 'vert',   swings: ['ap'],                cycles: 4 },
      resp: { rythme: 'carree4',       cycles: 6,  guide: 'Respiration carrée 4×4. Inspire — retiens — expire — vide. Quatre temps égaux.' } },
    { jour: 4,  titre: 'Direction — Triangulaire',       icon: '△🔺',
      bal:  { forme: 'Triangle',  couleur: 'bleu',   swings: ['lateral'],           cycles: 4 },
      resp: { rythme: 'triangulaire4', cycles: 6,  guide: 'Respiration triangulaire. Trois temps égaux. Le vide se referme naturellement.' } },
    { jour: 5,  titre: 'Élévation — Rectangulaire',      icon: '△📐',
      bal:  { forme: 'Triangle',  couleur: 'violet', swings: ['vertical'],          cycles: 4 },
      resp: { rythme: 'rectangulaire', cycles: 6,  guide: 'Rectangulaire : l\'expir dure deux fois l\'inspir. Relâche, libère.' } },
    { jour: 6,  titre: 'Cycle — Rythme cardiaque',       icon: '○💓',
      bal:  { forme: 'Cercle',    couleur: 'bleu',   swings: ['ap'],                cycles: 4 },
      resp: { rythme: 'cardiaque',     cycles: 12, guide: 'Synchronise le souffle avec le pouls. Court, régulier, vivant.' } },
    { jour: 7,  titre: 'Expansion — Carré lent',         icon: '○□',
      bal:  { forme: 'Cercle',    couleur: 'orange', swings: ['lateral'],           cycles: 4 },
      resp: { rythme: 'carree6',       cycles: 5,  guide: 'Respiration carrée 6×6. Plus lente, plus profonde. Laisse le calme s\'installer.' } },
    { jour: 8,  titre: 'Volume — Triangulaire lente',    icon: '◈△',
      bal:  { forme: 'Objet 3D',  couleur: 'bleu',   swings: ['vertical'],          cycles: 5 },
      resp: { rythme: 'triangulaire6', cycles: 5,  guide: 'Triangulaire 6×6. L\'espace intérieur se déploie dans la lenteur.' } },
    { jour: 9,  titre: 'Structure — Rectangulaire longue', icon: '◈📐',
      bal:  { forme: 'Objet 3D',  couleur: 'rouge',  swings: ['ap'],                cycles: 5 },
      resp: { rythme: 'rectLongue',    cycles: 5,  guide: 'Rectangulaire longue. L\'expir profond libère les tensions accumulées.' } },
    { jour: 10, titre: 'Vivant — Carré et présence',     icon: '✿□',
      bal:  { forme: 'Fleurs',    couleur: 'violet', swings: ['lateral'],           cycles: 5 },
      resp: { rythme: 'carree6',       cycles: 5,  guide: 'Respiration carrée lente. Sois pleinement présent à chaque phase.' } },
    { jour: 11, titre: 'Beauté — Pneumophène',           icon: '✿💫',
      bal:  { forme: 'Roses',     couleur: 'rouge',  swings: ['vertical'],          cycles: 5 },
      resp: { rythme: 'pneumophene',   cycles: 5,  guide: 'Respiration lente et profonde. Laisse la lumière intérieure se déposer.' } },
    { jour: 12, titre: 'Projection — Rythme intérieur',  icon: '👤💓',
      bal:  { special: 'person',                    swings: ['ap'],                cycles: 5 },
      resp: { rythme: 'cardiaque',     cycles: 10, guide: 'Visualise et synchronise. Le souffle et l\'image intérieure s\'unissent.' } },
    { jour: 13, titre: 'Intégration — Souffle libre',   icon: '👤🌬',
      bal:  { special: 'person',                    swings: ['lateral', 'ap'],    cycles: 6 },
      resp: { rythme: 'naturelle',     cycles: 10, guide: 'Souffle naturel après le balancement. Observe sans chercher à contrôler.' } },
    { jour: 14, titre: 'Profondeur — Pneumophène long',  icon: '👤💫',
      bal:  { special: 'person',                    swings: ['vertical', 'ap'],   cycles: 6 },
      resp: { rythme: 'pneumophene',   cycles: 6,  guide: 'Respiration profonde et lente. L\'espace intérieur est vaste.' } },
    { jour: 15, titre: 'Intégration totale',             icon: '✦💫',
      bal:  { special: 'canvas',                    swings: ['lateral','vertical','ap'], cycles: 8 },
      resp: { rythme: 'pneumophene',   cycles: 8,  guide: 'Pneumophène final. Laisse la lumière et le souffle fusionner dans le silence.' } }
  ];

  var LS_KEY = 'axis_p15c_prog';
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
      phaseBell:  function () { tone(528, 1.8, 0.30); },
      majorBell:  function () { tone(396, 2.2, 0.28); setTimeout(function () { tone(528, 1.8, 0.22); }, 300); },
      metronome:  function () { tone(800, 0.04, 0.12, 'square'); },
      breathBell: function () { tone(432, 1.2, 0.18); },
      endBell:    function () {
        tone(528, 2.5, 0.32);
        setTimeout(function () { tone(660, 2.0, 0.24); }, 800);
        setTimeout(function () { tone(792, 1.5, 0.18); }, 1600);
      }
    };
  })();

  /* ── Progression ──────────────────────────────────────────────────── */
  function loadProg()   { try { var r = localStorage.getItem(LS_KEY); if (r) return JSON.parse(r); } catch (e) {} return { done: [], activeDay: 1 }; }
  function saveProg(p)  { try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch (e) {} }
  function markDone(n)  { var p = loadProg(); if (p.done.indexOf(n) < 0) p.done.push(n); if (p.activeDay <= n && n < 15) p.activeDay = n + 1; saveProg(p); }

  /* ── Helpers ──────────────────────────────────────────────────────── */
  function getBalThumb(day) {
    var bal = day.bal;
    if (bal.forme && bal.couleur) {
      var f = FORMES_COULEURS[bal.forme];
      if (f && f.couleurs[bal.couleur]) return f.dossier + f.couleurs[bal.couleur];
    }
    if (bal.special === 'person') return BASE + 'fleurs/arbre/arbre plus personne.png';
    return '';
  }

  function cycleDurSec(day) {
    var balDur  = day.bal.cycles * (20 + 30 + 5 + 8 + 180) + 30; // +30 transition
    var r = RYTHMES[day.resp.rythme];
    var cycleLen = r.in + r.hold + r.out + r.pause;
    var respDur = day.resp.cycles * cycleLen;
    return balDur + respDur + 120; // +120 rémanence
  }

  function uniqueArr(arr) { return arr.filter(function (v, i, a) { return a.indexOf(v) === i; }); }

  function swingLabel(swings) {
    var names = { lateral: 'Latéral', vertical: 'Vertical', ap: 'Antéro-post.' };
    var labels = uniqueArr(swings.map(function(s) { return names[s] || s; }));
    if (labels.length >= 3) return 'Complet';
    return labels.join(' + ');
  }

  function objLabel(bal) {
    if (bal.special === 'person') return 'Visualisation';
    if (bal.special === 'canvas') return 'Support animé';
    return bal.forme + ' ' + bal.couleur;
  }

  /* ── Grid rendering ───────────────────────────────────────────────── */
  function renderGrid() {
    var grid = $('p15cGrid'); if (!grid) return;
    var prog = loadProg();
    grid.innerHTML = '';

    PROGRAMME.forEach(function (day) {
      var isDone   = prog.done.indexOf(day.jour) >= 0;
      var isActive = day.jour === prog.activeDay;
      var isSel    = selectedDay && selectedDay.jour === day.jour;

      var cls = 'p15c-card';
      if (isDone)   cls += ' done';
      if (isActive) cls += ' active-d';
      if (isSel)    cls += ' selected';

      var card = document.createElement('div');
      card.className = cls;

      var resp     = RYTHMES[day.resp.rythme];
      var totalMin = Math.round(cycleDurSec(day) / 60);
      var swing    = swingLabel(day.bal.swings);
      var obj      = objLabel(day.bal);

      card.innerHTML =
        '<div class="p15c-card-header">' +
          '<span class="p15c-num">Jour ' + day.jour + '</span>' +
          '<span class="p15c-dur">≈ ' + totalMin + ' min</span>' +
        '</div>' +
        '<div class="p15c-step">' +
          '<span class="p15c-step-lbl bal">① Balancement</span>' +
          '<div class="p15c-step-body">' +
            '<span class="p15c-tag swing">' + swing + '</span>' +
            '<span class="p15c-tag obj">' + obj + '</span>' +
            '<span class="p15c-tag cyc">' + day.bal.cycles + ' cycles</span>' +
          '</div>' +
        '</div>' +
        '<div class="p15c-seq-arrow">puis  ↓</div>' +
        '<div class="p15c-step">' +
          '<span class="p15c-step-lbl resp">② Respiration</span>' +
          '<div class="p15c-step-body">' +
            '<span class="p15c-tag rythm">' + resp.label + '</span>' +
            '<span class="p15c-tag cyc">' + day.resp.cycles + ' cycles</span>' +
          '</div>' +
        '</div>' +
        (isDone   ? '<span class="p15c-done-badge">✓ Complété</span>'   : '') +
        (!isDone && isActive ? '<span class="p15c-active-badge">Jour actif</span>' : '');

      card.addEventListener('click', function () { selectedDay = day; renderGrid(); updateBar(); });
      grid.appendChild(card);
    });
  }

  function updateBar() {
    var info = $('p15cInfo'), btn = $('p15cLaunch');
    if (!info || !btn) return;
    if (!selectedDay) { info.textContent = 'Sélectionne un jour pour commencer.'; btn.disabled = true; return; }
    var d = selectedDay;
    info.textContent = 'Jour ' + d.jour + ' · ' + d.titre + ' · ≈ ' + Math.round(cycleDurSec(d) / 60) + ' min';
    btn.disabled = false;
  }

  /* ── Build phases ─────────────────────────────────────────────────── */
  function buildBreathPhases(rythmeKey, cycles) {
    var r = RYTHMES[rythmeKey];
    var phases = [];
    for (var i = 0; i < cycles; i++) {
      var n = i + 1;
      var label = 'Cycle ' + n + '/' + cycles;
      if (r.in   > 0) phases.push({ kind: 'breath', breathKind: 'inspire',  dur: r.in,    sub: label, scale: 1.5, label: 'Inspire' });
      if (r.hold > 0) phases.push({ kind: 'breath', breathKind: 'hold-in',  dur: r.hold,  sub: label, scale: 1.5, label: 'Retiens' });
      if (r.out  > 0) phases.push({ kind: 'breath', breathKind: 'expire',   dur: r.out,   sub: label, scale: 1.0, label: 'Expire' });
      if (r.pause> 0) phases.push({ kind: 'breath', breathKind: 'hold-out', dur: r.pause, sub: label, scale: 1.0, label: 'Vide' });
    }
    return phases;
  }

  function buildPhases(day) {
    var phases = [];
    var bal = day.bal;
    var swings = bal.swings;

    /* ─── Balancement section ─── */
    for (var i = 0; i < bal.cycles; i++) {
      var n = i + 1;
      var label = 'Cycle ' + n + '/' + bal.cycles;
      var swingKey = swings[i % swings.length];
      var swing = SWINGS[swingKey];

      var imgUrl = '', objLabel = '';
      if (bal.forme && bal.couleur) {
        var f = FORMES_COULEURS[bal.forme];
        if (f && f.couleurs[bal.couleur]) {
          imgUrl = f.dossier + f.couleurs[bal.couleur];
          objLabel = (bal.forme === 'Objet 3D' || bal.forme === 'Roses') ? f.couleurs[bal.couleur].replace('.png','') : bal.forme + ' ' + bal.couleur;
        }
      } else if (bal.special === 'person') {
        imgUrl = BASE + 'fleurs/arbre/arbre plus personne.png';
        objLabel = 'Visualisation';
      }

      if (imgUrl) {
        phases.push({ kind: 'image', section: 'bal', dur: 20, img: imgUrl,
          title: 'Contemplation — ' + objLabel, sub: label,
          guide: 'Fixez cet objet du regard. Laissez la forme s\'imprimer dans votre esprit.' });
      } else {
        phases.push({ kind: 'pendulum', section: 'bal', swing: swingKey, mantra: swing.mantra, dur: 20,
          title: 'Contemplation — Point lumineux', sub: label,
          guide: 'Suivez le point animé du regard. Accompagnez le mouvement.' });
      }

      phases.push({ kind: 'text', section: 'bal', dur: 30, icon: '☀', mainText: 'Regardez la lumière',
        title: 'Observation lumineuse', sub: label, guide: 'Regardez la source lumineuse 30 secondes sans cligner des yeux.' });
      phases.push({ kind: 'text', section: 'bal', dur: 5, icon: '◯', mainText: 'Éteignez maintenant',
        title: 'Éteignez la lumière', sub: label, guide: 'Coupez la lumière. Préparez-vous à l\'obscurité.' });
      phases.push({ kind: 'image', section: 'bal', dur: 8, img: BANDEAU,
        title: 'Posez le bandeau', sub: label, guide: 'Posez le bandeau. Installez-vous pour le balancement.' });
      phases.push({ kind: 'balancement', section: 'bal', dur: 180, swing: swingKey, mantra: swing.mantra,
        title: swing.label + ' · ' + swing.mantra, sub: label, guide: swing.guidance,
        segments: [
          { from: 0,   to: 60,  label: 'Grand mouvement',  guide: swing.voiceGrand },
          { from: 60,  to: 120, label: 'Petit balancement', guide: swing.voicePetit },
          { from: 120, to: 180, label: 'Grand mouvement',  guide: swing.voiceReprise }
        ]
      });
    }

    /* ─── Transition ─── */
    phases.push({ kind: 'text', section: 'transition', dur: 30, icon: '〜', mainText: 'Transition',
      title: 'Transition — Posez le bandeau', sub: 'Prépare la respiration',
      guide: 'Retire le bandeau. Installe-toi confortablement pour la respiration. Laisse le corps se poser.' });

    /* ─── Respiration section ─── */
    var respPhases = buildBreathPhases(day.resp.rythme, day.resp.cycles);
    respPhases.forEach(function (p) {
      p.section = 'resp';
      p.guide = day.resp.guide;
      p.title = RYTHMES[day.resp.rythme].label + ' — ' + p.label;
    });
    phases = phases.concat(respPhases);

    /* ─── Rémanence ─── */
    phases.push({ kind: 'text', section: 'resp', dur: 120, icon: '◉', mainText: 'Observez les phosphènes',
      title: 'Rémanence', sub: 'Restez immobile',
      guide: 'Restez immobile dans l\'obscurité intérieure. Laissez la lumière et le souffle se fondre en silence.' });

    return phases;
  }

  /* ── Overlay ──────────────────────────────────────────────────────── */
  function showPhase(ph) {
    var img    = $('p15cImg');
    var pend   = $('p15cPend');
    var txt    = $('p15cText');
    var breath = $('p15cBreath');
    var dot    = $('p15cDot');

    if (img)    img.style.display    = 'none';
    if (pend)   pend.style.display   = 'none';
    if (txt)    txt.style.display    = 'none';
    if (breath) breath.style.display = 'none';

    if (ph.kind === 'image') {
      if (img) { img.src = ph.img; img.style.display = ''; }
    } else if (ph.kind === 'balancement' || ph.kind === 'pendulum') {
      if (pend) pend.style.display = '';
      if (dot)  dot.className = 'p15c-ov-dot ' + ph.swing;
    } else if (ph.kind === 'breath') {
      if (breath) breath.style.display = 'flex';
      updateBreathRing(ph.scale, ph.label, '');
    } else {
      if (txt) txt.style.display = 'flex';
      setEl('p15cIcon', ph.icon || '');
      setEl('p15cMainText', ph.mainText || '');
    }

    /* Section badge */
    var badge = $('p15cSection');
    if (badge) {
      if (ph.section === 'bal') { badge.textContent = 'Balancement'; badge.className = 'p15c-section-badge bal'; }
      else if (ph.section === 'resp') { badge.textContent = 'Respiration'; badge.className = 'p15c-section-badge resp'; }
      else { badge.textContent = ''; badge.className = 'p15c-section-badge'; }
    }

    setEl('p15cTitle', ph.title || '');
    setEl('p15cPhase', ph.sub   || '');
    setEl('p15cGuide', ph.guide || '');
    setEl('p15cMantra', (ph.kind === 'balancement' || ph.kind === 'pendulum') ? ph.mantra : '');
    setEl('p15cCountdown', '');
  }

  function updateBreathRing(targetScale, phaseLabel, countdown) {
    var ring = $('p15cBreathRing');
    if (ring) ring.style.transform = 'scale(' + targetScale + ')';
    setEl('p15cBreathPhase', phaseLabel || '');
    setEl('p15cBreathCount', countdown || '');
  }

  /* ── Session runner ───────────────────────────────────────────────── */
  function lancerSession(day) {
    var overlay = $('p15cOverlay'); if (!overlay) return;
    var phases   = buildPhases(day);
    var totalDur = phases.reduce(function (s, p) { return s + p.dur; }, 0);
    var elapsed = 0, phaseIdx = 0, phaseElapsed = 0;

    overlay.classList.remove('hidden');
    SND.majorBell();

    var tracks = window.AXIS_AUDIO_TRACKS || [];
    if (tracks.length) {
      sessionAudio = new Audio(tracks[0].url);
      sessionAudio.loop = true; sessionAudio.volume = 0.26;
      sessionAudio.play().catch(function () {});
    }

    setEl('p15cKicker', 'Programme 15 jours complet · Jour ' + day.jour + '/15');
    showPhase(phases[0]);
    if (sessionInterval) clearInterval(sessionInterval);
    metroBeat = 0;

    sessionInterval = setInterval(function () {
      elapsed++; phaseElapsed++;

      var bar = $('p15cProgBar');
      if (bar) bar.style.width = Math.min(100, (elapsed / totalDur) * 100) + '%';

      var ph = phases[phaseIdx];
      var remaining = ph.dur - phaseElapsed;

      var rem = totalDur - elapsed;
      setEl('p15cTimer', Math.floor(rem / 60) + 'min ' + (rem % 60 < 10 ? '0' : '') + (rem % 60) + 's');

      /* Countdown for non-balancement phases */
      if (ph.kind !== 'balancement' && ph.kind !== 'breath') {
        setEl('p15cCountdown', remaining > 0 ? String(remaining) : '');
      }

      /* Balancement logic */
      if (ph.kind === 'balancement') {
        metroBeat++;
        if (metroBeat % 2 === 0) SND.metronome();
        var segs = ph.segments, activeSeg = segs[segs.length - 1];
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed <= segs[si].to) { activeSeg = segs[si]; break; }
        }
        setEl('p15cPhase', ph.sub + ' · ' + activeSeg.label);
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed === segs[si].from + 1) { setEl('p15cGuide', activeSeg.guide); SND.phaseBell(); }
        }
      }

      /* Breath phase logic */
      if (ph.kind === 'breath') {
        var frac = phaseElapsed / ph.dur;
        var currentScale;
        if (ph.breathKind === 'inspire')  currentScale = 1.0 + 0.5 * frac;
        else if (ph.breathKind === 'expire') currentScale = 1.5 - 0.5 * frac;
        else                              currentScale = ph.scale;
        updateBreathRing(currentScale, ph.label, remaining > 0 ? String(remaining) : '');
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
        var next = phases[phaseIdx];
        /* Sound cue at breath cycle start (when breathKind = 'inspire') */
        if (next.kind === 'breath' && next.breathKind === 'inspire') SND.breathBell();
        else if (next.section === 'resp' && ph.section !== 'resp')   SND.majorBell(); // section transition
        else SND.majorBell();
        showPhase(next);
      }
    }, 1000);
  }

  function stopSession() {
    if (sessionInterval) { clearInterval(sessionInterval); sessionInterval = null; }
    if (sessionAudio)    { sessionAudio.pause(); sessionAudio = null; }
    var ov = $('p15cOverlay'); if (ov) ov.classList.add('hidden');
    var bar = $('p15cProgBar'); if (bar) bar.style.width = '0%';
  }

  /* ── Init ─────────────────────────────────────────────────────────── */
  function init() {
    var prog = loadProg();
    var activeNum = prog.activeDay || 1;
    selectedDay = PROGRAMME.filter(function (d) { return d.jour === activeNum; })[0] || PROGRAMME[0];
    renderGrid(); updateBar();

    var btn = $('p15cLaunch'); if (btn) btn.addEventListener('click', function () { if (selectedDay) lancerSession(selectedDay); });
    var stop = $('p15cStop');  if (stop) stop.addEventListener('click', stopSession);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
