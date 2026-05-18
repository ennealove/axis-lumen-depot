(function () {
  'use strict';

  var BASE    = 'assets/images/images objet/';
  var BANDEAU = 'assets/images/personnage avec bandeau sur les yeux.png';

  var COULEURS_ORDRE = ['bleu', 'rouge', 'vert', 'orange', 'jaune', 'violet'];

  var FORMES_COULEURS = {
    'Carré':     { dossier: BASE + 'carré/',     couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Rectangle': { dossier: BASE + 'rectangle/', couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Triangle':  { dossier: BASE + 'triangle/',  couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Cercle':    { dossier: BASE + 'cercles/',   couleurs: { bleu: 'bleu.png', vert: 'vert.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Objet 3D':  { dossier: BASE + 'objet 3D/', couleurs: { bleu: 'sphère bleu.png', rouge: 'cube rouge.png', vert: 'cylindre vert.png', orange: 'cone orange.png', jaune: 'etoile jaune.png', violet: 'pyramide violet.png' } },
    'Fleurs':    { dossier: BASE + 'fleurs/tulipes/', couleurs: { bleu: 'bleu.png', rouge: 'rouge.png', vert: 'verte.png', orange: 'orange.png', jaune: 'jaune.png', violet: 'violet.png' } },
    'Roses':     { dossier: BASE + 'fleurs/rose/',    couleurs: { bleu: 'rose bleu.png', rouge: 'rose rouge.png', jaune: 'rose jaune.png', violet: 'rose rose.png', vert: 'rose blanche.png', orange: 'rose noir.png' } }
  };

  var JOURS = [
    { jour: 1, titre: 'Carré',         forme: 'Carré',     desc: 'Stabilité — forme fondamentale',      icon: '◻' },
    { jour: 2, titre: 'Rectangle',     forme: 'Rectangle', desc: 'Extension proportionnée',             icon: '▭' },
    { jour: 3, titre: 'Triangle',      forme: 'Triangle',  desc: 'Direction et ascension',              icon: '△' },
    { jour: 4, titre: 'Cercle',        forme: 'Cercle',    desc: 'Complétude et cycle',                 icon: '○' },
    { jour: 5, titre: 'Objet 3D',      forme: 'Objet 3D',  desc: 'Volume et profondeur',                icon: '◈' },
    { jour: 6, titre: 'Fleurs',        forme: 'Fleurs',    desc: 'Organique et vivant',                 icon: '✿' },
    { jour: 7, titre: 'Visualisation', forme: null, img: BASE + 'fleurs/arbre/arbre.png',              desc: 'Personne devant un arbre',        icon: '👤', special: 'person' },
    { jour: 8, titre: 'Support animé', forme: null, img: BASE + 'fleurs/arbre/arbre plus personne.png', desc: 'Point de concentration lumineux', icon: '✦', special: 'canvas' }
  ];

  var SWINGS = {
    lateral:  { label: 'Latéral ↔',            mantra: 'ILLI', direction: 'tempe à tempe',    videoKey: 'lateral',
      guidance: 'Balancement gauche / droite. Mantra ILLI — langue contre le palais.',
      voiceGrand:   'Grand balancement latéral. ILLI — de tempe à tempe, en rythme avec ton mouvement.',
      voicePetit:   'Petit balancement. Réduis l\'amplitude. ILLI continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement latéral.' },
    vertical: { label: 'Vertical ↕',            mantra: 'ALLA', direction: 'menton vers sommet', videoKey: 'vertical',
      guidance: 'Balancement haut / bas. Mantra ALLA — axe et verticalité intérieure.',
      voiceGrand:   'Grand balancement vertical. ALLA — du menton vers le sommet du crâne.',
      voicePetit:   'Petit balancement. Amplitude réduite. ALLA continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement vertical.' },
    ap:       { label: 'Antéro-postérieur ⇄',   mantra: 'ELLU', direction: 'avant vers arrière', videoKey: 'rotation',
      guidance: 'Balancement avant / arrière. Mantra ELLU — sphère intérieure de présence.',
      voiceGrand:   'Grand balancement antéro-postérieur. ELLU — de l\'avant vers l\'arrière du crâne.',
      voicePetit:   'Petit balancement. ELLU continue intérieurement.',
      voiceReprise: 'Reprends le grand balancement antéro-postérieur.' }
  };

  var COULEUR_DOT = { bleu: '#3b82f6', rouge: '#ef4444', vert: '#22c55e', orange: '#f97316', jaune: '#eab308', violet: '#8b5cf6' };

  var LS_PROG    = 'axis_pf_progression';
  var LS_SESSION = 'axis_lumen_generated_session';

  var state = { jour: 1, swing: 'lateral', duree: 20, trackId: '', couleur: null, metro: 'off', metroVol: 0.20, voice: true };

  var sessionInterval = null;
  var sessionAudio    = null;
  var metroBeat       = 0;
  var beatSide        = false;
  var sessionPaused   = false;

  function speak(text) {
    if (!state.voice || !text) return;
    if (window.axisSpeak) window.axisSpeak(text, false);
  }
  function stopSpeech() {
    if (window.axisStopSpeech) window.axisStopSpeech();
  }

  function $ (id) { return document.getElementById(id); }

  /* ── Web Audio engine ─────────────────────────────────────────────── */
  var SND = (function () {
    var ctx = null;
    function C() {
      if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
      return ctx;
    }
    function tone(freq, dur, vol, type) {
      var c = C(); if (!c) return;
      try {
        var o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = type || 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
        o.start(); o.stop(c.currentTime + dur);
      } catch (e) {}
    }
    function click(pan, vol) {
      var c = C(); if (!c) return;
      var gainVal = (vol !== undefined ? vol : 0.20);
      /* Cloche synchrophonie : sine pur, fréquence distincte L/R, decay 300ms */
      var freq  = pan < 0 ? 880 : 660;   /* L = 880 Hz (la5), R = 660 Hz (mi5) */
      var panVal = pan < 0 ? -0.9 : 0.9;
      var decay = 0.30;
      try {
        var o  = c.createOscillator();
        var g  = c.createGain();
        o.type = 'sine';
        o.frequency.value = freq;
        if (c.createStereoPanner) {
          var sp = c.createStereoPanner();
          sp.pan.value = panVal;
          o.connect(g); g.connect(sp); sp.connect(c.destination);
        } else {
          o.connect(g); g.connect(c.destination);
        }
        g.gain.setValueAtTime(gainVal, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + decay);
        o.start(); o.stop(c.currentTime + decay);
      } catch (e) {}
    }
    return {
      phaseBell: function () { tone(528, 1.8, 0.30); },
      majorBell: function () {
        tone(396, 2.2, 0.28);
        setTimeout(function () { tone(528, 1.8, 0.22); }, 300);
      },
      metronome: function () { tone(800, 0.04, 0.12, 'square'); },
      click:     click,
      endBell:   function () {
        tone(528, 2.5, 0.32);
        setTimeout(function () { tone(660, 2.0, 0.24); }, 800);
        setTimeout(function () { tone(792, 1.5, 0.18); }, 1600);
      }
    };
  })();

  /* ── Progression ──────────────────────────────────────────────────── */
  function chargerProg() {
    try { var r = localStorage.getItem(LS_PROG); if (r) return JSON.parse(r); } catch (e) {}
    return {};
  }
  function sauverProg(prog) {
    try { localStorage.setItem(LS_PROG, JSON.stringify(prog)); } catch (e) {}
  }
  function prochaineCouleur(forme) {
    var prog = chargerProg(), idx = prog[forme] !== undefined ? prog[forme] : 0;
    var f = FORMES_COULEURS[forme]; if (!f) return 'bleu';
    var d = COULEURS_ORDRE.filter(function (c) { return f.couleurs[c]; });
    return d[idx % d.length] || d[0];
  }
  function avancerCouleur(forme) {
    var prog = chargerProg(), f = FORMES_COULEURS[forme]; if (!f) return;
    var d = COULEURS_ORDRE.filter(function (c) { return f.couleurs[c]; });
    prog[forme] = ((prog[forme] || 0) + 1) % d.length;
    sauverProg(prog);
  }
  function currentJour() { return JOURS[state.jour - 1]; }

  /* ── Render days ──────────────────────────────────────────────────── */
  function renderDays() {
    var wrap = $('ebDaysGrid'); if (!wrap) return;
    wrap.innerHTML = '';
    JOURS.forEach(function (j) {
      var div = document.createElement('div');
      div.className = 'eb-day-card' + (j.jour === state.jour ? ' active' : '');
      var imgHtml = '';
      if (j.forme) {
        var cPrev = prochaineCouleur(j.forme), f = FORMES_COULEURS[j.forme];
        if (f && f.couleurs[cPrev]) imgHtml = '<img src="' + f.dossier + f.couleurs[cPrev] + '" alt="' + j.titre + '" loading="lazy">';
      } else if (j.img) {
        imgHtml = '<img src="' + j.img + '" alt="' + j.titre + '" loading="lazy">';
      } else {
        imgHtml = '<span class="eb-day-icon">' + j.icon + '</span>';
      }
      div.innerHTML =
        '<span class="eb-day-num">Jour ' + j.jour + '</span>' +
        '<div class="eb-day-thumb">' + imgHtml + '</div>' +
        '<strong class="eb-day-title">' + j.titre + '</strong>' +
        '<span class="eb-day-desc">' + j.desc + '</span>';
      div.addEventListener('click', function () {
        state.jour = j.jour;
        state.couleur = j.forme ? prochaineCouleur(j.forme) : null;
        renderDays(); renderObjectPicker(); renderPreview();
      });
      wrap.appendChild(div);
    });
  }

  /* ── Object picker ────────────────────────────────────────────────── */
  function renderObjectPicker() {
    var wrap = $('ebObjectPicker'); if (!wrap) return;
    var jour = currentJour();
    if (!jour.forme) {
      if (jour.special === 'person') {
        wrap.innerHTML = '<div class="eb-special-info"><span class="eb-special-icon">👤</span><p><strong>Visualisation libre</strong></p><p>Choisissez mentalement une personne. Elle sera placée devant un arbre imaginaire au début de chaque cycle.</p></div>';
      } else {
        wrap.innerHTML = '<div class="eb-special-info"><span class="eb-special-icon">✦</span><p><strong>Support animé</strong></p><p>Un point de concentration lumineux se déplacera en synchronie avec votre balancement.</p></div>';
      }
      return;
    }
    var f = FORMES_COULEURS[jour.forme]; if (!f) { wrap.innerHTML = ''; return; }
    var html = '<p class="eb-picker-label">Couleur de départ <small style="font-weight:400;opacity:.7">— les couleurs défileront automatiquement à chaque cycle</small></p><div class="eb-color-grid">';
    COULEURS_ORDRE.forEach(function (couleur) {
      if (!f.couleurs[couleur]) return;
      var src = f.dossier + f.couleurs[couleur];
      var isSel = couleur === state.couleur, isSugg = couleur === prochaineCouleur(jour.forme);
      var label = (jour.forme === 'Objet 3D' || jour.forme === 'Roses') ? f.couleurs[couleur].replace('.png', '') : jour.forme + ' ' + couleur;
      html += '<div class="eb-color-card' + (isSel ? ' selected' : '') + '" data-couleur="' + couleur + '">' +
        '<div class="eb-color-thumb-wrap"><img src="' + src + '" alt="' + label + '" loading="lazy">' + (isSugg ? '<span class="eb-sugg-badge">Prochaine</span>' : '') + '</div>' +
        '<div class="eb-color-label"><span class="eb-color-dot" style="background:' + (COULEUR_DOT[couleur] || '#fff') + '"></span>' + label + '</div></div>';
    });
    html += '</div>';
    wrap.innerHTML = html;
    wrap.querySelectorAll('.eb-color-card').forEach(function (card) {
      card.addEventListener('click', function () { state.couleur = card.dataset.couleur; renderObjectPicker(); renderPreview(); });
    });
  }

  /* ── Audio select ─────────────────────────────────────────────────── */
  function renderAudioSelect() {
    var sel = $('ebAudioSelect'); if (!sel) return;
    sel.innerHTML = '<option value="">Aucune musique</option>';
    var seen = {};
    (window.AXIS_AUDIO_TRACKS || []).forEach(function (t) {
      if (seen[t.url]) return; seen[t.url] = true;
      var opt = document.createElement('option'); opt.value = t.id;
      var name = t.name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
      if (name.length > 52) name = name.substring(0, 50) + '…';
      opt.textContent = name;
      sel.appendChild(opt);
    });
    sel.value = state.trackId;
  }

  /* ── Preview ──────────────────────────────────────────────────────── */
  function renderPreview() {
    var wrap = $('ebPreview'); if (!wrap) return;
    var jour = currentJour(), swing = SWINGS[state.swing];
    var cycles = Math.max(1, Math.round(state.duree / 3));
    var totalSec = cycles * (20 + 30 + 5 + 8 + 180) + 120;
    var objLabel = '—';
    if (jour.forme && state.couleur) {
      var f = FORMES_COULEURS[jour.forme];
      if (f && f.couleurs[state.couleur]) objLabel = jour.forme === 'Objet 3D' ? f.couleurs[state.couleur].replace('.png', '') : jour.forme + ' ' + state.couleur;
    } else if (jour.special === 'person') { objLabel = 'Visualisation personne'; }
    else if (jour.special === 'canvas')   { objLabel = 'Support animé'; }
    wrap.innerHTML =
      '<div class="eb-prev-row"><strong>Jour</strong><span>' + jour.jour + ' — ' + jour.titre + '</span></div>' +
      '<div class="eb-prev-row"><strong>Objet</strong><span>' + objLabel + '</span></div>' +
      '<div class="eb-prev-row"><strong>Balancement</strong><span>' + swing.label + ' · ' + swing.mantra + '</span></div>' +
      '<div class="eb-prev-row"><strong>Durée estimée</strong><span>≈ ' + Math.round(totalSec / 60) + ' min · ' + cycles + ' cycle' + (cycles > 1 ? 's' : '') + '</span></div>';
  }

  /* ── Build phase list ─────────────────────────────────────────────── */
  function buildPhases() {
    var jour   = currentJour();
    var swing  = SWINGS[state.swing];
    var cycles = Math.max(1, Math.round(state.duree / 3));
    var phases = [];

    var formeData = jour.forme ? FORMES_COULEURS[jour.forme] : null;
    var couleurDispos = formeData ? COULEURS_ORDRE.filter(function (c) { return formeData.couleurs[c]; }) : [];
    var startIdx = couleurDispos.indexOf(state.couleur);
    if (startIdx < 0) startIdx = 0;

    for (var i = 0; i < cycles; i++) {
      var n = i + 1;
      var label = 'Cycle ' + n + '/' + cycles;

      /* Object image */
      var objUrl = '', objLabel = '';
      if (formeData && couleurDispos.length) {
        var c = couleurDispos[(startIdx + i) % couleurDispos.length];
        objUrl   = formeData.dossier + formeData.couleurs[c];
        objLabel = (jour.forme === 'Objet 3D' || jour.forme === 'Roses') ? formeData.couleurs[c].replace('.png', '') : jour.forme + ' ' + c;
      } else if (jour.special === 'person') {
        objUrl   = BASE + 'fleurs/arbre/arbre plus personne.png';
        objLabel = 'Visualisation';
      }

      if (objUrl) {
        phases.push({ kind: 'image', dur: 20, img: objUrl,
          title: 'Contemplation — ' + objLabel, sub: label,
          guide: 'Fixez cet objet du regard. Imprégnez-vous de sa forme et de sa couleur sans cligner des yeux. Laissez la forme s\'imprimer dans votre esprit.' });
      }

      phases.push({ kind: 'text', dur: 30, icon: '☀',
        title: 'Observation lumineuse', sub: label,
        mainText: 'Regardez la lumière',
        guide: 'Allumez la source lumineuse. Regardez-la pendant 30 secondes sans cligner des yeux.' });

      phases.push({ kind: 'text', dur: 5, icon: '◯',
        title: 'Éteignez la lumière', sub: label,
        mainText: 'Éteignez maintenant',
        guide: 'Coupez la lumière. Préparez-vous à entrer dans l\'obscurité.' });

      phases.push({ kind: 'image', dur: 8, img: BANDEAU,
        title: 'Posez le bandeau', sub: label,
        guide: 'Posez le bandeau sur vos yeux. Installez-vous confortablement pour le balancement.' });

      phases.push({ kind: 'balancement', dur: 180,
        swing: state.swing, mantra: swing.mantra,
        title: swing.label + ' · ' + swing.mantra, sub: label,
        guide: swing.guidance,
        segments: [
          { from: 0,   to: 60,  label: 'Grand mouvement',   guide: swing.voiceGrand },
          { from: 60,  to: 120, label: 'Petit balancement',  guide: swing.voicePetit },
          { from: 120, to: 180, label: 'Grand mouvement',   guide: swing.voiceReprise }
        ]
      });
    }

    phases.push({ kind: 'text', dur: 120, icon: '◉',
      title: 'Rémanence', sub: 'Restez immobile',
      mainText: 'Observez les formes lumineuses',
      guide: 'Restez immobile, bandeau sur les yeux. Observez les formes lumineuses intérieures. Laissez la rémanence s\'installer dans le silence.' });

    return phases;
  }

  /* ── Session overlay helpers ─────────────────────────────────────── */
  function sovEl(id) { return document.getElementById(id); }

  function sovShowImage(src) {
    var img = sovEl('ebSovImage'), pend = sovEl('ebSovPendulum'), txt = sovEl('ebSovTextBlock');
    if (img)  { img.src = src; img.classList.remove('hidden'); }
    if (pend) pend.classList.add('hidden');
    if (txt)  txt.classList.add('hidden');
  }

  function sovShowPendulum(swing, mantra, segLabel) {
    var img = sovEl('ebSovImage'), pend = sovEl('ebSovPendulum'), txt = sovEl('ebSovTextBlock');
    if (img)  img.classList.add('hidden');
    if (pend) { pend.className = 'eb-sov-pendulum ' + swing; pend.classList.remove('hidden'); }
    if (txt)  txt.classList.add('hidden');
    var m = sovEl('ebSovMantra'); if (m) m.textContent = mantra || '';
    var s = sovEl('ebSovSegLabel'); if (s) s.textContent = segLabel || '';
  }

  function sovShowText(icon, mainText) {
    var img = sovEl('ebSovImage'), pend = sovEl('ebSovPendulum'), txt = sovEl('ebSovTextBlock');
    if (img)  img.classList.add('hidden');
    if (pend) pend.classList.add('hidden');
    if (txt)  txt.classList.remove('hidden');
    var ic = sovEl('ebSovIcon'); if (ic) ic.textContent = icon || '';
    var mt = sovEl('ebSovMainText'); if (mt) mt.textContent = mainText || '';
  }

  function sovSetHeader(title, sub, phaseNum) {
    var t = sovEl('ebSovTitle'); if (t) t.textContent = title || '';
    var s = sovEl('ebSovSub');   if (s) s.textContent = sub || '';
    var n = sovEl('ebSovPhaseNum'); if (n) n.textContent = phaseNum || '';
  }

  function sovSetProgress(pct) {
    var bar = sovEl('ebSovProgressBar'); if (bar) bar.style.width = Math.min(100, pct) + '%';
  }

  /* ── Session runner ───────────────────────────────────────────────── */
  function lancerSession() {
    var overlay = $('ebSessionOverlay'); if (!overlay) return;
    var phases  = buildPhases();
    var totalDur = phases.reduce(function (s, p) { return s + p.dur; }, 0);
    var elapsed  = 0;
    var phaseIdx = 0;
    var phaseElapsed = 0;

    overlay.classList.remove('hidden');
    SND.majorBell();
    setTimeout(function () { speak('Bienvenue dans ta séance de balancement. Installe-toi confortablement, dos droit.'); }, 1800);

    /* Audio de fond */
    if (state.trackId && window.AXIS_AUDIO_TRACKS) {
      var track = (window.AXIS_AUDIO_TRACKS || []).find(function (t) { return t.id === state.trackId; });
      if (track) {
        sessionAudio = new Audio(track.url);
        sessionAudio.loop = true; sessionAudio.volume = 0.32;
        sessionAudio.play().catch(function () {});
      }
    }

    function showPhase(ph, phNum) {
      sovSetHeader(ph.title, ph.sub, 'Étape ' + phNum + '/' + phases.length);
      if (ph.kind === 'image') {
        sovShowImage(ph.img);
        if (ph.title.indexOf('Contemplation') >= 0) {
          speak('Contemplation. Fixe cet objet du regard sans cligner des yeux. Imprègne-toi de sa forme et de sa couleur.');
        } else {
          speak('Pose le bandeau sur les yeux. Installe-toi confortablement pour le balancement.');
        }
      } else if (ph.kind === 'balancement') {
        sovShowPendulum(ph.swing, ph.mantra, ph.segments[0].label);
        speak(ph.segments[0].guide);
      } else {
        sovShowText(ph.icon, ph.mainText);
        if (ph.title.indexOf('lumineuse') >= 0) {
          speak('Observation lumineuse. Dirige ton regard vers la source de lumière. Regarde-la sans cligner des yeux pendant trente secondes.');
        } else if (ph.title.indexOf('Éteignez') >= 0) {
          speak('Éteins la lumière maintenant. Prépare-toi à entrer dans l\'obscurité.');
        } else if (ph.title.indexOf('Rémanence') >= 0) {
          speak('Rémanence. Reste immobile, bandeau sur les yeux. Observe les formes lumineuses intérieures. Laisse le silence s\'installer.');
        }
      }
      var guide = sovEl('ebSovGuide'); if (guide) guide.textContent = ph.guide || '';
    }

    showPhase(phases[0], 1);

    if (sessionInterval) clearInterval(sessionInterval);
    metroBeat = 0;

    sessionInterval = setInterval(function () {
      if (sessionPaused) return;
      elapsed++;
      phaseElapsed++;
      sovSetProgress((elapsed / totalDur) * 100);

      var ph = phases[phaseIdx];
      var remaining = ph.dur - phaseElapsed;

      /* Timer badge */
      var timerEl = sovEl('ebSovTimer');
      if (timerEl) {
        var totRem = totalDur - elapsed;
        var tm = Math.floor(totRem / 60), ts = totRem % 60;
        timerEl.textContent = tm + 'min ' + (ts < 10 ? '0' : '') + ts + 's';
      }

      /* Countdown */
      var cdEl = sovEl('ebSovCountdown');
      if (cdEl) cdEl.textContent = remaining > 0 ? remaining : '';

      /* Balancement : metronome + segment update */
      if (ph.kind === 'balancement') {
        metroBeat++;
        if (metroBeat % 2 === 0) {
          if (state.metro === 'stereo') {
            SND.click(beatSide ? 1 : -1, state.metroVol);
            beatSide = !beatSide;
          } else if (state.metro === 'mono') {
            SND.click(0, state.metroVol);
          }
        }
        var segs = ph.segments;
        var activeSeg = segs[segs.length - 1];
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed <= segs[si].to) { activeSeg = segs[si]; break; }
        }
        var sl = sovEl('ebSovSegLabel'); if (sl) sl.textContent = activeSeg.label;
        /* Update guide at segment boundaries */
        for (var si = 0; si < segs.length; si++) {
          if (phaseElapsed === segs[si].from + 1) {
            var guide = sovEl('ebSovGuide'); if (guide) guide.textContent = activeSeg.guide;
            SND.phaseBell();
            speak(activeSeg.guide);
          }
        }
      }

      /* Phase transition */
      if (phaseElapsed >= ph.dur) {
        phaseIdx++;
        phaseElapsed = 0;
        metroBeat = 0;
        if (phaseIdx >= phases.length) {
          SND.endBell();
          stopSession();
          if (currentJour().forme && state.couleur) avancerCouleur(currentJour().forme);
          return;
        }
        beatSide = false;
        SND.majorBell();
        showPhase(phases[phaseIdx], phaseIdx + 1);
      }
    }, 1000);
  }

  function stopSession() {
    if (sessionInterval) { clearInterval(sessionInterval); sessionInterval = null; }
    if (sessionAudio)    { sessionAudio.pause(); sessionAudio = null; }
    stopSpeech();
    sessionPaused = false;
    var overlay = $('ebSessionOverlay');
    if (overlay) overlay.classList.add('hidden');
    var pauseBtn = $('ebSovPause'), resumeBtn = $('ebSovResume');
    if (pauseBtn)  pauseBtn.style.display  = '';
    if (resumeBtn) resumeBtn.style.display = 'none';
    sovSetProgress(0);
  }

  /* ── Launch ───────────────────────────────────────────────────────── */
  function launch() {
    var jour = currentJour();

    if (jour.special === 'canvas') {
      try { localStorage.setItem('axis_eb_jour8_swing', state.swing); } catch (e) {}
      window.location.href = 'jour8-balancement.html';
      return;
    }

    if (jour.forme && !state.couleur) {
      alert('Sélectionnez une couleur pour l\'objet avant de lancer la séance.');
      return;
    }

    lancerSession();
  }

  /* ── Bind events ──────────────────────────────────────────────────── */
  function bindEvents() {
    var sel = $('ebAudioSelect');
    if (sel) sel.addEventListener('change', function () { state.trackId = sel.value; renderPreview(); });

    var swingBtns = $('ebSwingBtns');
    if (swingBtns) swingBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-swing]'); if (!btn) return;
      state.swing = btn.dataset.swing;
      swingBtns.querySelectorAll('[data-swing]').forEach(function (b) { b.classList.toggle('active', b.dataset.swing === state.swing); });
      renderPreview();
    });

    var durBtns = $('ebDurBtns');
    if (durBtns) durBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-dur]'); if (!btn) return;
      state.duree = parseInt(btn.dataset.dur, 10);
      durBtns.querySelectorAll('[data-dur]').forEach(function (b) { b.classList.toggle('active', parseInt(b.dataset.dur, 10) === state.duree); });
      renderPreview();
    });

    var metroBtns = $('ebMetroBtns');
    if (metroBtns) metroBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-metro]'); if (!btn) return;
      state.metro = btn.dataset.metro;
      metroBtns.querySelectorAll('[data-metro]').forEach(function (b) {
        b.classList.toggle('active', b.dataset.metro === state.metro);
      });
    });

    var metroVolSlider = $('ebMetroVol');
    if (metroVolSlider) metroVolSlider.addEventListener('input', function () {
      state.metroVol = parseFloat(metroVolSlider.value);
      var lbl = $('ebMetroVolLabel');
      if (lbl) lbl.textContent = Math.round(state.metroVol * 100) + '%';
    });

    var voiceBtns = $('ebVoiceBtns');
    if (voiceBtns) voiceBtns.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-voice]'); if (!btn) return;
      state.voice = (btn.dataset.voice === 'on');
      voiceBtns.querySelectorAll('[data-voice]').forEach(function (b) {
        b.classList.toggle('active', (b.dataset.voice === 'on') === state.voice);
      });
    });

    var pauseBtn = $('ebSovPause');
    if (pauseBtn) pauseBtn.addEventListener('click', function () {
      sessionPaused = true;
      if (sessionAudio) try { sessionAudio.pause(); } catch (e) {}
      stopSpeech();
      pauseBtn.style.display = 'none';
      var rb = $('ebSovResume'); if (rb) rb.style.display = '';
    });

    var resumeBtn = $('ebSovResume');
    if (resumeBtn) resumeBtn.addEventListener('click', function () {
      sessionPaused = false;
      if (sessionAudio) try { sessionAudio.play().catch(function () {}); } catch (e) {}
      resumeBtn.style.display = 'none';
      var pb = $('ebSovPause'); if (pb) pb.style.display = '';
    });

    var launchBtn = $('ebLaunch');
    if (launchBtn) launchBtn.addEventListener('click', launch);

    var stopBtn = $('ebSovStop');
    if (stopBtn) stopBtn.addEventListener('click', stopSession);
  }

  /* ── Init ─────────────────────────────────────────────────────────── */
  function init() {
    try {
      var params = new URLSearchParams(window.location.search);
      var swing = params.get('swing');
      if (swing && SWINGS[swing]) state.swing = swing;
      var jourParam = parseInt(params.get('jour'), 10);
      if (jourParam >= 1 && jourParam <= JOURS.length) state.jour = jourParam;
    } catch (e) {}

    var jour = currentJour();
    state.couleur = jour.forme ? prochaineCouleur(jour.forme) : null;

    renderDays(); renderObjectPicker(); renderAudioSelect(); renderPreview(); bindEvents();

    document.querySelectorAll('[data-swing]').forEach(function (b) { b.classList.toggle('active', b.dataset.swing === state.swing); });
    document.querySelectorAll('[data-dur]').forEach(function (b)   { b.classList.toggle('active', parseInt(b.dataset.dur, 10) === state.duree); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
