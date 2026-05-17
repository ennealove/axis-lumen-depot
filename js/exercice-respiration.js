/* exercice-respiration.js — Programme 8 jours de respiration initiatique */
(function () {
  'use strict';

  /* ── Programme 8 jours ──────────────────────────────────────────────── */
  var JOURS = [
    {
      jour: 1, titre: 'Observation', icon: '◌', desc: 'Écoute du souffle naturel',
      type: 'naturelle', rythme: { in: 4, retPlein: 0, out: 4, retVide: 0 }, mantra: null,
      zones: ['Ventre'],
      guide: 'Pose une main sur le ventre. Observe simplement ton souffle sans le modifier. Puis, progressivement, allonge chaque expiration d\'une seconde.',
      conseil: 'La respiration naturelle est le point de départ de tout. Observer sans corriger est déjà une pratique.'
    },
    {
      jour: 2, titre: 'Diaphragme', icon: '◎', desc: 'Massage des organes intérieurs',
      type: 'diaphragmatique', rythme: { in: 4, retPlein: 0, out: 6, retVide: 0 }, mantra: null,
      zones: ['Ventre', 'Foie', 'Reins'],
      guide: 'Inspire par le ventre — il se gonfle comme un ballon. Expire lentement. Chaque inspiration masse foie, reins, intestins.',
      conseil: 'Le diaphragme est le seul muscle respiratoire que la volonté peut entraîner directement.'
    },
    {
      jour: 3, titre: 'Complète', icon: '◉', desc: 'Les trois zones respiratoires',
      type: 'complete', rythme: { in: 6, retPlein: 2, out: 6, retVide: 0 }, mantra: null,
      zones: ['Ventre', 'Côtes', 'Clavicules'],
      guide: 'Inspire en 3 temps : ventre → côtes → clavicules. Rétention douce. Expire en sens inverse. La respiration complète active les 3 niveaux cérébraux.',
      conseil: 'La respiration complète transforme l\'énergie lumineuse en énergie mentale (Mixage Phosphénique).'
    },
    {
      jour: 4, titre: 'Carrée', icon: '□', desc: 'Équilibre parfait des 4 temps',
      type: 'carree', rythme: { in: 4, retPlein: 4, out: 4, retVide: 4 }, mantra: null,
      zones: ['Corps entier'],
      guide: 'Quatre temps égaux : inspire 4, retiens plein 4, expire 4, retiens vide 4. Ce carré de souffle crée un équilibre parfait.',
      conseil: 'La respiration carrée développe la maîtrise de l\'apnée et renforce la capacité à retenir le souffle.'
    },
    {
      jour: 5, titre: 'Triangulaire', icon: '△', desc: 'Rythme isocèle — activation',
      type: 'triangulaire', rythme: { in: 4, retPlein: 1, out: 4, retVide: 0 }, mantra: null,
      zones: ['Poitrine', 'Cerveau'],
      guide: 'Inspire 4, rétention courte 1, expire 4. Ce triangle projette une onde sinusoïdale sur le cerveau — la forme vibratoire fondamentale du cosmos.',
      conseil: 'Le rythme sinusoïdal harmonise les oscillations cérébrales selon Lefebure.'
    },
    {
      jour: 6, titre: 'Rectangulaire', icon: '▭', desc: 'Expiration prolongée — intégration',
      type: 'rectangulaire', rythme: { in: 4, retPlein: 2, out: 8, retVide: 0 }, mantra: null,
      zones: ['Poitrine', 'Abdomen'],
      guide: 'Inspire 4, retiens 2, expire 8 — deux fois plus long. Cette asymétrie active le parasympathique et favorise l\'intégration.',
      conseil: 'Expirer plus longtemps qu\'on n\'inspire active le nerf vague et réduit le rythme cardiaque.'
    },
    {
      jour: 7, titre: 'Rythme cardiaque', icon: '♡', desc: 'Souffle sur le pouls naturel',
      type: 'cardiaque', rythme: { in: 4, retPlein: 1, out: 4, retVide: 1 }, mantra: 'IL-LI',
      zones: ['Cœur', 'Crâne'],
      guide: 'Pose un doigt sur le pouls. Inspire sur 4 pulsations, retiens 1, expire 4, pause 1. Synchronise ton souffle avec ton cœur.',
      conseil: 'La synchronisation cœur-souffle crée une cohérence cardiovasculaire et ouvre la perception intérieure.'
    },
    {
      jour: 8, titre: 'Pneumophène', icon: '∿', desc: 'Respiration spirituelle',
      type: 'pneumophene', rythme: { in: 3, retPlein: 0, out: 3, retVide: 0 }, mantra: 'AL-LA',
      zones: ['Corps entier', 'Espace intérieur'],
      guide: 'Maintiens un léger manque d\'air permanent en respirant un peu moins que nécessaire. Associe une pensée contemplative. Garde AL-LA intérieur tout au long.',
      conseil: '"Une légère soif d\'air associée à une pensée élève la conscience vers les mondes invisibles." — Lefebure'
    }
  ];

  var TYPES_LABEL = {
    naturelle: 'Respiration naturelle', diaphragmatique: 'Respiration diaphragmatique',
    complete: 'Respiration complète',   carree: 'Respiration carrée',
    triangulaire: 'Respiration triangulaire', rectangulaire: 'Respiration rectangulaire',
    cardiaque: 'Rythme cardiaque',      pneumophene: 'Pneumophène'
  };

  var DUREES = [
    { val: 5,  label: '5 min',  sub: '3–5 cycles' },
    { val: 10, label: '10 min', sub: '6–10 cycles' },
    { val: 15, label: '15 min', sub: '10–15 cycles' },
    { val: 20, label: '20 min', sub: '15–20 cycles' }
  ];

  var LS_PROG = 'axis_resp_progression';
  var state   = { jour: 1, duree: 10, trackId: '', tempsPhase: null };

  var sessionInterval  = null;
  var previewInterval  = null;
  var sessionAudio     = null;

  function $ (id) { return document.getElementById(id); }

  /* ── Web Audio engine ────────────────────────────────────────────────── */
  var SND = (function () {
    var ctx = null;
    function C() {
      if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
      return ctx;
    }
    function tone(freq, dur, vol) {
      var c = C(); if (!c) return;
      try {
        var o = c.createOscillator(), g = c.createGain();
        o.connect(g); g.connect(c.destination);
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
        o.start(); o.stop(c.currentTime + dur);
      } catch (e) {}
    }
    return {
      tick:    function () { tone(480, 0.07, 0.08); },
      inspire: function () { tone(528, 1.2, 0.28); },
      hold:    function () { tone(396, 0.8, 0.20); },
      expire:  function () { tone(432, 1.0, 0.22); },
      vide:    function () { tone(330, 0.6, 0.14); },
      end:     function () {
        tone(528, 2.0, 0.32);
        setTimeout(function () { tone(660, 1.5, 0.22); }, 700);
        setTimeout(function () { tone(792, 1.0, 0.16); }, 1400);
      }
    };
  })();

  /* ── Progression ────────────────────────────────────────────────────── */
  function chargerProg() {
    try { var r = localStorage.getItem(LS_PROG); if (r) return JSON.parse(r); } catch (e) {}
    return {};
  }
  function marquerFait(jour) {
    var prog = chargerProg(); prog['j' + jour] = true;
    try { localStorage.setItem(LS_PROG, JSON.stringify(prog)); } catch (e) {}
  }
  function estFait(jour) { return !!chargerProg()['j' + jour]; }

  /* ── Render days ─────────────────────────────────────────────────────── */
  function renderDays() {
    var wrap = $('erDaysGrid'); if (!wrap) return;
    wrap.innerHTML = '';
    JOURS.forEach(function (j) {
      var div = document.createElement('div');
      div.className = 'er-day-card' + (j.jour === state.jour ? ' active' : '') + (estFait(j.jour) ? ' done' : '');
      div.innerHTML =
        '<span class="er-day-num">Jour ' + j.jour + '</span>' +
        '<span class="er-day-icon">' + j.icon + '</span>' +
        '<strong class="er-day-title">' + j.titre + '</strong>' +
        '<span class="er-day-desc">' + j.desc + '</span>';
      div.addEventListener('click', function () {
        state.jour = j.jour; state.tempsPhase = null;
        renderDays(); renderBreathCard(); renderPreview();
        startPreviewAnim();
      });
      wrap.appendChild(div);
    });
  }

  /* ── Rythme effectif (avec temps par phase personnalisé) ─────────────── */
  var JOURS_REGLABLES = [4, 5, 6]; // carrée, triangulaire, rectangulaire
  function getRythme() {
    var j = JOURS[state.jour - 1], r = j.rythme;
    if (!JOURS_REGLABLES.includes(j.jour) || !state.tempsPhase) return r;
    var t = state.tempsPhase;
    if (j.type === 'carree')        return { in: t, retPlein: t, out: t, retVide: t };
    if (j.type === 'triangulaire')  return { in: t, retPlein: 1, out: t, retVide: 0 };
    if (j.type === 'rectangulaire') return { in: t, retPlein: Math.max(1, Math.round(t / 2)), out: t * 2, retVide: 0 };
    return r;
  }

  /* ── Breath card ─────────────────────────────────────────────────────── */
  function renderBreathCard() {
    var wrap = $('erBreathCard'); if (!wrap) return;
    var j = JOURS[state.jour - 1], r = getRythme();
    var total = r.in + r.retPlein + r.out + r.retVide;
    var phases = [];
    phases.push('<div class="er-phase-badge">Inspiration<span>' + r.in + 's</span></div>');
    if (r.retPlein > 0) phases.push('<div class="er-phase-badge">Rétention pleine<span>' + r.retPlein + 's</span></div>');
    phases.push('<div class="er-phase-badge">Expiration<span>' + r.out + 's</span></div>');
    if (r.retVide > 0) phases.push('<div class="er-phase-badge">Rétention vide<span>' + r.retVide + 's</span></div>');
    phases.push('<div class="er-phase-badge" style="border-color:#4a3f8a;color:#8878c8">Cycle<span>' + total + 's</span></div>');
    var zonesHtml = j.zones.map(function (z) { return '<span class="er-phase-badge" style="border-color:#2a3a2a;color:#5a9a5a">' + z + '</span>'; }).join('');
    var mantraHtml = j.mantra ? '<p><strong style="color:#6b5de8">Mantra :</strong> ' + j.mantra + '</p>' : '';
    wrap.innerHTML =
      '<h3>' + TYPES_LABEL[j.type] + '</h3>' +
      '<p class="er-breath-subtitle">' + j.desc + '</p>' +
      '<p>' + j.guide + '</p>' + mantraHtml +
      '<p style="font-size:.78rem;color:#5a5245;font-style:italic">' + j.conseil + '</p>' +
      '<div class="er-breath-rhythm">' + phases.join('') + zonesHtml + '</div>';
    renderTempsPhase();
  }

  /* ── Temps par phase (jours 4/5/6) ──────────────────────────────────── */
  function renderTempsPhase() {
    var wrap = $('erTempsPhase'); if (!wrap) return;
    var j = JOURS[state.jour - 1];
    if (!JOURS_REGLABLES.includes(j.jour)) { wrap.innerHTML = ''; return; }
    var t = state.tempsPhase || j.rythme.in;
    var r = getRythme();
    var detail = j.type === 'carree'
      ? t + 's — ' + t + 's — ' + t + 's — ' + t + 's'
      : j.type === 'triangulaire'
        ? t + 's — 1s — ' + t + 's'
        : t + 's — ' + Math.max(1, Math.round(t/2)) + 's — ' + (t*2) + 's';
    wrap.innerHTML =
      '<span class="er-group-label">Durée par phase</span>' +
      '<div class="er-temps-phase-row">' +
        '<input type="range" id="erTempsRange" min="2" max="20" step="1" value="' + t + '" class="er-range">' +
        '<span class="er-temps-val" id="erTempsVal">' + t + ' s</span>' +
      '</div>' +
      '<p class="er-temps-detail" id="erTempsDetail">' + detail + '</p>';
    var slider = $('erTempsRange'), val = $('erTempsVal'), det = $('erTempsDetail');
    if (slider) slider.addEventListener('input', function () {
      state.tempsPhase = parseInt(slider.value, 10);
      if (val) val.textContent = slider.value + ' s';
      var rr = getRythme();
      var dd = j.type === 'carree'
        ? slider.value + 's — ' + slider.value + 's — ' + slider.value + 's — ' + slider.value + 's'
        : j.type === 'triangulaire'
          ? slider.value + 's — 1s — ' + slider.value + 's'
          : slider.value + 's — ' + Math.max(1, Math.round(parseInt(slider.value)/2)) + 's — ' + (parseInt(slider.value)*2) + 's';
      if (det) det.textContent = dd;
      renderBreathCard(); renderPreview(); startPreviewAnim();
    });
  }

  /* ── Duration buttons ────────────────────────────────────────────────── */
  function renderDuration() {
    var wrap = $('erDurBtns'); if (!wrap) return;
    wrap.innerHTML = '';
    DUREES.forEach(function (d) {
      var btn = document.createElement('button');
      btn.className = 'er-opt-btn' + (d.val === state.duree ? ' active' : '');
      btn.innerHTML = d.label + '<br><small style="font-size:.65rem;opacity:.7">' + d.sub + '</small>';
      btn.addEventListener('click', function () {
        state.duree = d.val;
        renderDuration(); renderPreview();
      });
      wrap.appendChild(btn);
    });
  }

  /* ── Audio select ────────────────────────────────────────────────────── */
  function renderAudio() {
    var sel = $('erAudioSelect'); if (!sel) return;
    sel.innerHTML = '<option value="">Aucune musique</option>';
    var seen = {};
    (window.AXIS_AUDIO_TRACKS || []).forEach(function (t) {
      if (seen[t.url]) return; seen[t.url] = true;
      var opt = document.createElement('option');
      opt.value = t.id;
      var name = t.name.replace(/_/g, ' ').replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
      if (name.length > 52) name = name.substring(0, 50) + '…';
      opt.textContent = name;
      sel.appendChild(opt);
    });
    sel.value = state.trackId;
    sel.addEventListener('change', function () { state.trackId = sel.value; });
  }

  /* ── Preview ─────────────────────────────────────────────────────────── */
  function renderPreview() {
    var wrap = $('erPreview'); if (!wrap) return;
    var j = JOURS[state.jour - 1], r = getRythme();
    var total = r.in + r.retPlein + r.out + r.retVide;
    var cycles = Math.floor((state.duree * 60) / total);
    wrap.innerHTML =
      '<strong>' + TYPES_LABEL[j.type] + ' · Jour ' + j.jour + '</strong>' +
      '<div class="er-preview-line"><span>Durée</span><span>' + state.duree + ' min</span></div>' +
      '<div class="er-preview-line"><span>Cycle</span><span>' + total + ' sec</span></div>' +
      '<div class="er-preview-line"><span>Cycles estimés</span><span>~' + cycles + '</span></div>' +
      (j.mantra ? '<div class="er-preview-line"><span>Mantra</span><span style="color:#6b5de8">' + j.mantra + '</span></div>' : '');
  }

  /* ── Preview animation (mini cercle) ────────────────────────────────── */
  function buildPhaseSeq(r) {
    var seq = [];
    for (var i = 0; i < r.in; i++)
      seq.push({ cls: 'inspiration', label: 'Inspiration', count: r.in - i, scale: 1 + 0.38 * ((i + 1) / r.in) });
    for (var i = 0; i < r.retPlein; i++)
      seq.push({ cls: 'retention-plein', label: 'Rétention', count: r.retPlein - i, scale: 1.38 });
    for (var i = 0; i < r.out; i++)
      seq.push({ cls: 'expiration', label: 'Expiration', count: r.out - i, scale: 1.38 - 0.38 * ((i + 1) / r.out) });
    for (var i = 0; i < r.retVide; i++)
      seq.push({ cls: 'retention-vide', label: 'Pause vide', count: r.retVide - i, scale: 1 });
    return seq;
  }

  function startPreviewAnim() {
    stopPreviewAnim();
    var circleEl = $('erBreathCircle'), phaseEl = $('erBreathPhaseLabel'), countEl = $('erBreathCount');
    if (!circleEl) return;
    var j = JOURS[state.jour - 1];
    var seq = buildPhaseSeq(getRythme());
    if (!seq.length) return;
    var idx = 0;
    function step() {
      var p = seq[idx % seq.length];
      circleEl.className = 'er-breath-circle-outer ' + p.cls;
      circleEl.style.transform = 'scale(' + p.scale + ')';
      if (phaseEl) { phaseEl.className = 'er-breath-phase-label ' + p.cls; phaseEl.textContent = p.label; }
      if (countEl) countEl.textContent = p.count;
      idx++;
    }
    step();
    previewInterval = setInterval(step, 1000);
  }

  function stopPreviewAnim() {
    if (previewInterval) { clearInterval(previewInterval); previewInterval = null; }
    var circleEl = $('erBreathCircle'), phaseEl = $('erBreathPhaseLabel'), countEl = $('erBreathCount');
    if (circleEl) { circleEl.className = 'er-breath-circle-outer'; circleEl.style.transform = ''; }
    if (phaseEl)  { phaseEl.className = 'er-breath-phase-label'; phaseEl.textContent = '—'; }
    if (countEl)  countEl.textContent = '—';
  }

  /* ── Session player ──────────────────────────────────────────────────── */
  function lancerSession() {
    var j     = JOURS[state.jour - 1];
    var r     = getRythme();
    var dur   = state.duree * 60;
    var elapsed = 0;

    var overlay = $('erSessionOverlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    stopPreviewAnim();

    var circle = $('erSessionCircle');
    var phase  = $('erSessionPhase');
    var count  = $('erSessionCount');
    var mantra = $('erSessionMantra');
    var timer  = $('erSessionTimer');
    var guide  = $('erSessionGuide');
    var titleEl= $('erSessionTitle');
    var subEl  = $('erSessionSubtitle');

    if (titleEl) titleEl.textContent = TYPES_LABEL[j.type];
    if (subEl)   subEl.textContent   = 'Jour ' + j.jour + ' · ' + j.desc;
    if (mantra)  mantra.textContent  = j.mantra || '';

    var seq = buildPhaseSeq(r);
    var prevCls = '';
    var idx     = 0;
    var GUIDES  = [j.guide, j.conseil];
    var guideIdx = 0, guideClock = 0;
    if (guide) guide.textContent = GUIDES[0];

    if (sessionInterval) clearInterval(sessionInterval);

    function tick() {
      if (elapsed >= dur) {
        SND.end();
        stopSession();
        marquerFait(j.jour);
        renderDays();
        return;
      }

      var p = seq[idx % seq.length];

      /* Son : tick chaque seconde + bell au changement de phase */
      if (p.cls !== prevCls) {
        if      (p.cls === 'inspiration')    SND.inspire();
        else if (p.cls === 'retention-plein') SND.hold();
        else if (p.cls === 'expiration')     SND.expire();
        else if (p.cls === 'retention-vide') SND.vide();
        prevCls = p.cls;
      } else {
        SND.tick();
      }

      /* Timer */
      var rem  = dur - elapsed;
      var mins = Math.floor(rem / 60);
      var secs = rem % 60;
      if (timer) timer.textContent = 'Temps restant : ' + mins + 'min ' + (secs < 10 ? '0' : '') + secs + 's';

      /* Cercle */
      if (circle) { circle.className = 'er-session-circle ' + p.cls; circle.style.transform = 'scale(' + p.scale + ')'; }
      if (phase)  { phase.className = 'er-session-phase ' + p.cls; phase.textContent = p.label; }
      if (count)  count.textContent = p.count;

      guideClock++;
      if (guideClock > 25) { guideClock = 0; guideIdx = (guideIdx + 1) % GUIDES.length; if (guide) guide.textContent = GUIDES[guideIdx]; }

      elapsed++; idx++;
    }

    sessionInterval = setInterval(tick, 1000);
    tick();

    /* Audio de fond */
    if (state.trackId && window.AXIS_AUDIO_TRACKS) {
      var track = window.AXIS_AUDIO_TRACKS.find(function (t) { return t.id === state.trackId; });
      if (track) {
        sessionAudio = new Audio(track.url);
        sessionAudio.loop = true; sessionAudio.volume = 0.35;
        sessionAudio.play().catch(function () {});
      }
    }
  }

  function stopSession() {
    if (sessionInterval) { clearInterval(sessionInterval); sessionInterval = null; }
    if (sessionAudio) { sessionAudio.pause(); sessionAudio = null; }
    var overlay = $('erSessionOverlay');
    if (overlay) overlay.classList.add('hidden');
    startPreviewAnim();
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  function init() {
    /* Pre-select jour from URL ?jour=N */
    try {
      var param = parseInt(new URLSearchParams(window.location.search).get('jour'), 10);
      if (param >= 1 && param <= 8) state.jour = param;
    } catch (e) {}

    renderDays(); renderBreathCard(); renderDuration(); renderAudio(); renderPreview();
    renderTempsPhase(); startPreviewAnim();

    var launch = $('erLaunch');
    if (launch) launch.addEventListener('click', lancerSession);

    var stop = $('erSessionStop');
    if (stop) stop.addEventListener('click', stopSession);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
