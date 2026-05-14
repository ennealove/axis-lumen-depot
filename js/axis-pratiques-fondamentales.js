/* ============================================================
   AXIS PRATIQUES FONDAMENTALES
   Exercices essentiels reconstruits depuis les cours 38-56
   + Générateur de séance sur mesure avec images objets
   ============================================================ */

(function () {
  'use strict';

  /* ── Exercices fondamentaux ─────────────────────────────── */

  var PRATIQUES = [
    {
      id: 'bal-lateral',
      courseNums: [38, 39, 40],
      symbol: '↔',
      title: 'Balancement latéral',
      mantra: 'ILLI',
      subtitle: 'Activation hémisphérique — cours 38–40',
      desc: 'Gauche-droite, une seconde par côté. ILLI résonne dans le haut du crâne et active les deux hémisphères en alternance.',
      phases: [
        { label: 'Préparation',         dur: 120, guide: 'Installe-toi. Nuque libre, épaules relâchées. Observe ton état réel sans le corriger.' },
        { label: 'Balancement doux',    dur: 300, guide: 'Une seconde à gauche, une seconde à droite. Mouvement petit et régulier. Garde la nuque souple.' },
        { label: 'ILLI + balancement',  dur: 600, guide: 'Prononce ILLI intérieurement. Une syllabe par côté : ILLI à gauche, ILLI à droite. Vibration dans le haut du crâne.' },
        { label: 'Rémanence',           dur: 300, guide: 'Arrête le mouvement. Reste immobile. Observe les sensations résiduelles dans le crâne et le système nerveux.' },
        { label: 'Carnet',              dur: 180, guide: 'Note : rythme, sensations, images intérieures, état avant et après.' }
      ]
    },
    {
      id: 'bal-vertical',
      courseNums: [41, 42],
      symbol: '↕',
      title: 'Balancement vertical',
      mantra: 'ALLA',
      subtitle: 'Axe haut-bas — cours 41–42',
      desc: 'Élévation et ancrage en alternance. ALLA traverse le centre de la gorge au cœur et structure l\'axe vertical.',
      phases: [
        { label: 'Préparation',        dur: 120, guide: 'Sens ton axe vertical. De la couronne jusqu\'au coccyx, une ligne lumineuse et stable.' },
        { label: 'Balancement vertical', dur: 300, guide: 'Monte doucement en t\'élevant, descend en t\'ancrant. Respiration corporelle verticale.' },
        { label: 'ALLA + vertical',    dur: 600, guide: 'ALLA en montant, ALLA en descendant. Vibration centrale qui traverse la gorge et le cœur.' },
        { label: 'Rémanence',          dur: 300, guide: 'Arrête. Reste dans l\'axe. Sens la colonne de lumière entre couronne et base.' },
        { label: 'Carnet',             dur: 180, guide: 'Note l\'état de l\'axe vertical. Enracinement ? Élévation ? Les deux ?' }
      ]
    },
    {
      id: 'bal-ap',
      courseNums: [43],
      symbol: '⇄',
      title: 'Balancement antéro-postérieur',
      mantra: 'OLLO',
      subtitle: 'Projection et réception — cours 43',
      desc: 'Avant pour s\'engager, arrière pour recevoir. OLLO arrondit l\'espace intérieur en sphère de présence.',
      phases: [
        { label: 'Préparation',        dur: 120, guide: 'Sens le point d\'équilibre exact. Ni penché en avant ni en arrière. Le centre.' },
        { label: 'Avant-arrière doux', dur: 300, guide: 'À l\'inspiration légèrement en avant (engagement), à l\'expiration en arrière (réception). 3 secondes par côté.' },
        { label: 'OLLO + avant-arrière', dur: 600, guide: 'OLLO en avant, OLLO en arrière. L\'espace intérieur devient sphérique, rond, complet.' },
        { label: 'Rémanence',          dur: 300, guide: 'Arrête au centre. Sens la sphère de présence autour de toi. Ni avant ni arrière — juste ici.' },
        { label: 'Carnet',             dur: 180, guide: 'Ta tendance naturelle : vers l\'avant (projection) ou vers l\'arrière (réception) ?' }
      ]
    },
    {
      id: 'convergence',
      courseNums: [49],
      symbol: '◎',
      title: 'Convergence oculaire',
      mantra: null,
      subtitle: 'Phosphènes doux — cours 49',
      desc: 'Yeux mi-clos, regard convergent vers un point imaginaire à 30 cm. Active le parasympathique et déclenche la rémanence.',
      phases: [
        { label: 'Préparation',              dur: 120, guide: 'Yeux ouverts, regard doux et sans cible. Nuque et mâchoire complètement relâchées.' },
        { label: 'Premières convergences',   dur: 240, guide: 'Yeux mi-clos. Convergez très doucement vers un point imaginaire à 30 cm du nez. 30 s de convergence, puis relâchez. Répétez.' },
        { label: 'Alternance douce',         dur: 480, guide: '30 secondes de convergence douce, 30 secondes de regard doux relâché. Observez les phosphènes qui apparaissent — ne les forcez pas.' },
        { label: 'Yeux fermés — observation', dur: 300, guide: 'Fermez les yeux. Observez les couleurs, formes et lumières intérieures. Ne les dirigez pas. Laissez venir.' },
        { label: 'Intégration',              dur: 120, guide: 'Ouvrez doucement les yeux. Bougez légèrement les doigts. Revenez à la pièce.' }
      ]
    },
    {
      id: 'mantras',
      courseNums: [31, 54],
      symbol: '℣',
      title: 'Mantras ILLI · ALLA · OLLO · RORO',
      mantra: 'Quatre clés vibratoires',
      subtitle: 'Vibration, zones, synchronisation — cours 54',
      desc: 'ILLI (crâne), ALLA (centre), OLLO (poitrine), RORO (sacrum). Chaque mantra est une porte différente du même temple.',
      phases: [
        { label: 'Préparation',      dur: 90,  guide: 'Assis dans l\'axe. Bouche légèrement ouverte. Mâchoire et gorge décontractées.' },
        { label: 'ILLI',             dur: 240, guide: 'ILLI — vibration haute. Langue contre le palais sur le L. Sens les sinus frontaux et le haut du crâne s\'allumer.' },
        { label: 'ALLA',             dur: 240, guide: 'ALLA — vibration centrale. La voyelle A ouvre la gorge. Traversée de la gorge au cœur.' },
        { label: 'OLLO',             dur: 240, guide: 'OLLO — vibration ronde. O sphérique dans la poitrine et le ventre. Espace intérieur plein et arrondi.' },
        { label: 'RORO',             dur: 240, guide: 'RORO — vibration basse. R roulé, plancher buccal, sacrum. La vibration descend et ancre.' },
        { label: 'Silence vibrant',  dur: 180, guide: 'Plus de mantra. Écoute le silence. La vibration continue dans le corps sans effort.' },
        { label: 'Carnet',           dur: 120, guide: 'Lequel des quatre mantras a résonné le plus fort aujourd\'hui ? Pourquoi ?' }
      ]
    }
  ];

  /* ── Catalogue d'images objets ──────────────────────────── */

  var BASE = 'assets/images/images objet/';

  var IMAGES_CAT = {
    'Carré': [
      BASE + 'carré/0be90a94-25d1-4a02-bf43-59e25f1e79e5.png',
      BASE + 'carré/2916bae3-7dfd-438d-8e79-88719d040ddd.png',
      BASE + 'carré/2b9d24bd-55d8-4180-96f9-413c89a926dd.png',
      BASE + 'carré/490b82e6-a96e-4e15-adbb-5487a9663ed3.png',
      BASE + 'carré/a5b3f11d-7780-4502-afeb-ee96fffbaea2.png',
      BASE + 'carré/bbfbe8e9-0d64-4ee7-87f9-6350615cfb7f.png'
    ],
    'Cercle': [
      BASE + 'cercles/10c3be64-488b-4d3f-9275-49d664cc1664.png',
      BASE + 'cercles/38147c65-7f10-4cd8-a8e6-0cfebdd6fd42.png',
      BASE + 'cercles/4779f918-1285-4f59-b627-b26e105ef6d4.png',
      BASE + 'cercles/4cae5efe-70f0-46b7-af8a-a986413fe05b.png',
      BASE + 'cercles/51e3d49c-03c2-4c84-9322-114859dee2d8.png',
      BASE + 'cercles/c9728ed0-305e-4ff5-bc76-c0a56e584b6b.png'
    ],
    'Triangle': [
      BASE + 'triangle/12816b85-7b6b-4464-b23f-a0d3982854f9.png',
      BASE + 'triangle/16e79914-b32c-40f5-bd0d-80569e4edf87.png',
      BASE + 'triangle/4563b92c-431c-4acf-b922-605d2a7d640a.png',
      BASE + 'triangle/4a28a626-1863-432d-adb0-85f7ef0a5de2.png',
      BASE + 'triangle/a4210eca-2724-4dc4-9f1d-9f6183484dd8.png',
      BASE + 'triangle/ffe994fa-fbef-49fd-a14a-02664cac380a.png'
    ],
    'Rectangle': [
      BASE + 'rectangle/41bfa61c-5bce-4ed2-a450-7a41f9d59bca.png',
      BASE + 'rectangle/4c20d28d-88d4-4585-909b-bd2f627b29fb.png',
      BASE + 'rectangle/9021d654-a30f-4177-a0fe-32e57e12be4d.png',
      BASE + 'rectangle/9a6f56a2-c9cb-45b8-a5f2-6b5ce8d1826d.png',
      BASE + 'rectangle/d2447a2f-296b-4af9-9087-71347c2fc39c.png',
      BASE + 'rectangle/f90cabd6-10ba-458d-a0ad-d27f8ed73498.png'
    ],
    'Objet 3D': [
      BASE + 'objet 3D/1796824c-f7c1-41b1-ba6e-f6272950852a.png',
      BASE + 'objet 3D/3d5e03e7-a463-4916-89d4-a34a26650b60.png',
      BASE + 'objet 3D/414be51e-546d-4381-8740-f357902dd430.png',
      BASE + 'objet 3D/624d0424-8708-45ff-9010-6a1104907827.png',
      BASE + 'objet 3D/8e958f7e-83f1-42f3-b38b-47775f5012e8.png',
      BASE + 'objet 3D/d822a3ff-12d1-46ad-819d-d323d44dbd21.png'
    ],
    'Fleurs': [
      BASE + 'fleurs/tulipes/7bf5ea42-4e1b-4f84-bc09-7006851f699d.png'
    ]
  };

  var CAT_NAMES = Object.keys(IMAGES_CAT);

  /* ── State ──────────────────────────────────────────────── */

  var state = {
    activePratique: null,
    phaseIndex:     0,
    elapsed:        0,
    running:        false,
    paused:         false,
    tick:           null,
    selectedCat:    CAT_NAMES[0],
    selectedImg:    null,
    selectedSwing:  'lateral',
    selectedDur:    '20'
  };

  /* ── DOM helpers ────────────────────────────────────────── */

  function $  (id) { return document.getElementById(id); }
  function fmt(s)  {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  /* ── Render section ─────────────────────────────────────── */

  function renderSection() {
    var wrap = $('axisPratiquesFondamentales');
    if (!wrap) return;

    var html = '<div class="axis-pf-header">' +
      '<div>' +
      '<p class="axis-pf-kicker">Pratiques fondamentales</p>' +
      '<h2 class="axis-pf-title">Exercices essentiels du Livre d\'Exercices</h2>' +
      '<p class="axis-pf-subtitle">Reconstruits depuis les cours 38 à 54 — disponibles dès maintenant, quel que soit ton avancement</p>' +
      '</div>' +
      '</div>' +
      '<div class="axis-pf-grid">';

    PRATIQUES.forEach(function (p) {
      var refStr = 'Cours ' + p.courseNums.join(', ');
      html += '<div class="axis-pf-card">' +
        '<div class="axis-pf-card-symbol">' + p.symbol + '</div>' +
        '<h3 class="axis-pf-card-title">' + p.title + '</h3>' +
        (p.mantra ? '<span class="axis-pf-card-mantra">' + p.mantra + '</span>' : '') +
        '<p class="axis-pf-card-desc">' + p.desc + '</p>' +
        '<span class="axis-pf-card-ref">' + refStr + ' — ' + p.subtitle + '</span>' +
        '<div class="axis-pf-card-footer">' +
        '<button class="axis-pf-btn primary" data-pf="' + p.id + '" type="button">Pratiquer</button>' +
        '</div>' +
        '</div>';
    });

    html += '</div>';
    wrap.innerHTML = html;

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-pf]');
      if (!btn) return;
      var p = PRATIQUES.find(function (x) { return x.id === btn.dataset.pf; });
      if (p) openModal(p);
    });
  }

  /* ── Modal open / close ─────────────────────────────────── */

  function openModal(p) {
    state.activePratique = p;
    state.phaseIndex  = 0;
    state.elapsed     = 0;
    state.running     = false;
    state.paused      = false;
    clearInterval(state.tick);

    var modal   = $('axisPfModal');
    var overlay = $('axisPfOverlay');

    $('axisPfModalKicker').textContent  = p.subtitle;
    $('axisPfModalTitle').textContent   = p.title;

    // Reset practice panel
    $('axisPfPhaseLabel').textContent   = 'Prêt';
    $('axisPfTimer').textContent        = fmt(p.phases[0].dur);
    $('axisPfProgressBar').style.width  = '0%';
    $('axisPfGuidance').textContent     = 'Appuie sur Démarrer pour commencer.';
    $('axisPfStart').style.display      = 'inline-block';
    $('axisPfPause').style.display      = 'none';
    $('axisPfStop').style.display       = 'none';

    // Hide generator
    $('axisPfGenerator').style.display  = 'none';
    $('axisPfPractice').style.display   = 'flex';

    // Remove done message if any
    var done = modal.querySelector('.axis-pf-done-msg');
    if (done) done.remove();

    modal.classList.add('open');
    overlay.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    clearInterval(state.tick);
    state.running = false;
    var modal   = $('axisPfModal');
    var overlay = $('axisPfOverlay');
    modal.classList.remove('open');
    overlay.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    state.activePratique = null;
  }

  /* ── Timer ──────────────────────────────────────────────── */

  function startTimer() {
    var p = state.activePratique;
    if (!p) return;

    state.running = true;
    state.paused  = false;
    $('axisPfStart').style.display = 'none';
    $('axisPfPause').style.display = 'inline-block';
    $('axisPfStop').style.display  = 'inline-block';

    runPhase();
  }

  function runPhase() {
    var p     = state.activePratique;
    if (!p) return;
    var phase = p.phases[state.phaseIndex];
    if (!phase) { onComplete(); return; }

    state.elapsed = 0;

    $('axisPfPhaseLabel').textContent = phase.label;
    $('axisPfGuidance').textContent   = phase.guide;
    $('axisPfTimer').textContent      = fmt(phase.dur);
    $('axisPfProgressBar').style.width = '0%';

    if (typeof window.axisSpeak === 'function') {
      window.axisSpeak(phase.label + '. ' + phase.guide, false);
    }

    clearInterval(state.tick);
    state.tick = setInterval(function () {
      if (state.paused) return;
      state.elapsed++;
      var rem = phase.dur - state.elapsed;
      if (rem < 0) rem = 0;
      $('axisPfTimer').textContent = fmt(rem);
      $('axisPfProgressBar').style.width = Math.min(100, (state.elapsed / phase.dur) * 100) + '%';

      if (state.elapsed >= phase.dur) {
        clearInterval(state.tick);
        state.phaseIndex++;
        runPhase();
      }
    }, 1000);
  }

  function pauseResume() {
    state.paused = !state.paused;
    $('axisPfPause').textContent = state.paused ? 'Reprendre' : 'Pause';
  }

  function stopTimer() {
    clearInterval(state.tick);
    state.running = false;
    $('axisPfPhaseLabel').textContent = 'Arrêté';
    $('axisPfPause').style.display    = 'none';
    $('axisPfStop').style.display     = 'none';
    $('axisPfStart').style.display    = 'inline-block';
    $('axisPfStart').textContent      = 'Recommencer';
    state.phaseIndex = 0;
    state.elapsed    = 0;
    var p = state.activePratique;
    if (p) {
      $('axisPfTimer').textContent       = fmt(p.phases[0].dur);
      $('axisPfProgressBar').style.width = '0%';
      $('axisPfGuidance').textContent    = 'Exercice arrêté. Appuie sur Recommencer.';
    }
  }

  function onComplete() {
    clearInterval(state.tick);
    state.running = false;

    $('axisPfPhaseLabel').textContent  = 'Terminé';
    $('axisPfTimer').textContent       = '00:00';
    $('axisPfProgressBar').style.width = '100%';
    $('axisPfGuidance').textContent    = 'Exercice complet. Reste un moment dans le silence.';
    $('axisPfPause').style.display     = 'none';
    $('axisPfStop').style.display      = 'none';
    $('axisPfStart').style.display     = 'none';

    if (typeof window.axisSpeak === 'function') {
      window.axisSpeak('Exercice terminé. Reste un moment dans le silence.', false);
    }

    // Insert done message with generator launch
    var practice = $('axisPfPractice');
    var existing = $('axisPfModal').querySelector('.axis-pf-done-msg');
    if (!existing) {
      var div = document.createElement('div');
      div.className = 'axis-pf-done-msg';
      div.innerHTML =
        '<strong>Séance complète</strong>' +
        '<p>Tu peux maintenant générer une séance sur mesure basée sur cet exercice.</p>' +
        '<button id="axisPfShowGen" class="axis-pf-btn primary" type="button">Générer une séance sur mesure</button>';
      practice.appendChild(div);
      div.querySelector('#axisPfShowGen').addEventListener('click', showGenerator);
    }
  }

  /* ── Generator ──────────────────────────────────────────── */

  function showGenerator() {
    $('axisPfGenerator').style.display = 'block';
    renderCatBtns();
    renderImageGrid();
    renderPreview();
    $('axisPfGenerator').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function renderCatBtns() {
    var wrap = $('axisPfCatBtns');
    wrap.innerHTML = '';
    CAT_NAMES.forEach(function (cat) {
      var btn = document.createElement('button');
      btn.className = 'axis-pf-cat-btn' + (cat === state.selectedCat ? ' active' : '');
      btn.textContent = cat;
      btn.type = 'button';
      btn.addEventListener('click', function () {
        state.selectedCat = cat;
        state.selectedImg = null;
        renderCatBtns();
        renderImageGrid();
        renderPreview();
      });
      wrap.appendChild(btn);
    });
  }

  function renderImageGrid() {
    var wrap   = $('axisPfImageGrid');
    var images = IMAGES_CAT[state.selectedCat] || [];
    wrap.innerHTML = '';
    if (!images.length) {
      wrap.innerHTML = '<p style="color:rgba(244,236,216,.45);font-size:.82rem;grid-column:1/-1">Images bientôt disponibles pour cette catégorie.</p>';
      return;
    }
    images.forEach(function (src) {
      var div = document.createElement('div');
      div.className = 'axis-pf-img-thumb' + (src === state.selectedImg ? ' selected' : '');
      div.innerHTML = '<img src="' + src + '" alt="" loading="lazy">';
      div.addEventListener('click', function () {
        state.selectedImg = src;
        renderImageGrid();
        renderPreview();
      });
      wrap.appendChild(div);
    });
  }

  function renderPreview() {
    var wrap   = $('axisPfGenPreview');
    var p      = state.activePratique;
    var swingLabel = { lateral: 'Latéral', vertical: 'Vertical', anterieur: 'Antéro-postérieur' };
    var totalMin = parseInt(state.selectedDur, 10);
    var exercice = p ? p.title : '—';
    var phases   = buildGenPhases(p, totalMin);

    var html = '<div class="axis-pf-preview-row">' +
      '<strong>Exercice</strong>' + exercice + '</div>';

    if (state.selectedImg) {
      html += '<div class="axis-pf-preview-row">' +
        '<strong>Objet</strong>' +
        '<img class="axis-pf-preview-img" src="' + state.selectedImg + '" alt="">' +
        '</div>';
    } else {
      html += '<div class="axis-pf-preview-row"><strong>Objet</strong><em style="opacity:.55">Sélectionne une image</em></div>';
    }

    html += '<div class="axis-pf-preview-row"><strong>Balancement</strong>' +
      (swingLabel[state.selectedSwing] || '—') + '</div>';

    html += '<div class="axis-pf-preview-row"><strong>Durée totale</strong>' + totalMin + ' minutes</div>';

    html += '<div class="axis-pf-preview-row"><strong>Phases</strong>' +
      phases.map(function (ph) { return ph.label + ' (' + ph.durMin + ' min)'; }).join(' → ') + '</div>';

    wrap.innerHTML = html;
  }

  function buildGenPhases(p, totalMin) {
    var exerciceMin = Math.round(totalMin * 0.5);
    var lightMin    = Math.round(totalMin * 0.15);
    var remanMin    = Math.round(totalMin * 0.2);
    var closureMin  = totalMin - exerciceMin - lightMin - remanMin;

    var phases = [
      { label: 'Lumière', durMin: lightMin },
      { label: p ? p.title : 'Exercice', durMin: exerciceMin },
      { label: 'Rémanence', durMin: remanMin },
      { label: 'Clôture', durMin: closureMin }
    ];
    return phases;
  }

  function bindGenEvents() {
    // Swing buttons
    $('axisPfSwingBtns').addEventListener('click', function (e) {
      var btn = e.target.closest('.axis-pf-opt');
      if (!btn) return;
      $('axisPfSwingBtns').querySelectorAll('.axis-pf-opt').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.selectedSwing = btn.dataset.val;
      renderPreview();
    });

    // Duration buttons
    $('axisPfDurBtns').addEventListener('click', function (e) {
      var btn = e.target.closest('.axis-pf-opt');
      if (!btn) return;
      $('axisPfDurBtns').querySelectorAll('.axis-pf-opt').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.selectedDur = btn.dataset.val;
      renderPreview();
    });

    // Launch — build session payload → localStorage → go to pratiquer
    $('axisPfGenLaunch').addEventListener('click', function () {
      launchSession(false);
    });

    // Save + redirect
    $('axisPfGenSave').addEventListener('click', function () {
      launchSession(true);
    });
  }

  function launchSession(redirect) {
    var p = state.activePratique;
    var totalMin = parseInt(state.selectedDur, 10);
    var phases   = buildGenPhases(p, totalMin);

    var payload = {
      createdFrom:  p ? p.id : 'manuel',
      exerciceTitle: p ? p.title : '—',
      mantra:       p ? p.mantra : null,
      objectSrc:    state.selectedImg,
      objectCat:    state.selectedCat,
      swingType:    state.selectedSwing,
      totalMin:     totalMin,
      phases:       phases,
      createdAt:    new Date().toISOString()
    };

    try { localStorage.setItem('axis_seance_generee', JSON.stringify(payload)); } catch (e) {}

    if (redirect) {
      window.location.href = 'pratiquer.html';
    } else {
      closeModal();
      if (typeof window.axisSpeak === 'function') {
        window.axisSpeak('Séance générée et sauvegardée. Ouvre l\'onglet Pratiquer pour la lancer.', false);
      }
      var msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;bottom:28px;right:28px;background:#1a140a;border:1px solid rgba(216,180,95,.4);border-radius:14px;padding:14px 22px;color:#ffe7a3;font-size:.88rem;font-weight:700;z-index:9999;max-width:320px;';
      msg.textContent = 'Séance sauvegardée. Ouvre Pratiquer pour la lancer.';
      document.body.appendChild(msg);
      setTimeout(function () { msg.remove(); }, 4000);
    }
  }

  /* ── Init ───────────────────────────────────────────────── */

  function init() {
    renderSection();

    $('axisPfModalClose').addEventListener('click', closeModal);
    $('axisPfOverlay').addEventListener('click', closeModal);
    $('axisPfStart').addEventListener('click', function () {
      if (state.activePratique) {
        state.phaseIndex = 0;
        state.elapsed    = 0;
        $('axisPfStart').textContent = 'Démarrer';
        startTimer();
      }
    });
    $('axisPfPause').addEventListener('click', pauseResume);
    $('axisPfStop').addEventListener('click', stopTimer);
    bindGenEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
