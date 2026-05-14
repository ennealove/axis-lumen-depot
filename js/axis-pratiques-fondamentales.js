/* ============================================================
   AXIS PRATIQUES FONDAMENTALES
   Exercices essentiels reconstruits depuis les cours 38-56
   + Générateur de séance sur mesure avec images objets par couleur
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
        { label: 'Préparation',        dur: 120, guide: 'Installe-toi. Nuque libre, épaules relâchées. Observe ton état réel sans le corriger.' },
        { label: 'Balancement doux',   dur: 300, guide: 'Une seconde à gauche, une seconde à droite. Mouvement petit et régulier. Garde la nuque souple.' },
        { label: 'ILLI + balancement', dur: 600, guide: 'Prononce ILLI intérieurement. Une syllabe par côté : ILLI à gauche, ILLI à droite. Vibration dans le haut du crâne.' },
        { label: 'Rémanence',          dur: 300, guide: 'Arrête le mouvement. Reste immobile. Observe les sensations résiduelles dans le crâne et le système nerveux.' },
        { label: 'Carnet',             dur: 180, guide: 'Note : rythme, sensations, images intérieures, état avant et après.' }
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
        { label: 'Préparation',          dur: 120, guide: 'Sens ton axe vertical. De la couronne jusqu\'au coccyx, une ligne lumineuse et stable.' },
        { label: 'Balancement vertical', dur: 300, guide: 'Monte doucement en t\'élevant, descend en t\'ancrant. Respiration corporelle verticale.' },
        { label: 'ALLA + vertical',      dur: 600, guide: 'ALLA en montant, ALLA en descendant. Vibration centrale qui traverse la gorge et le cœur.' },
        { label: 'Rémanence',            dur: 300, guide: 'Arrête. Reste dans l\'axe. Sens la colonne de lumière entre couronne et base.' },
        { label: 'Carnet',               dur: 180, guide: 'Note l\'état de l\'axe vertical. Enracinement ? Élévation ? Les deux ?' }
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
        { label: 'Préparation',          dur: 120, guide: 'Sens le point d\'équilibre exact. Ni penché en avant ni en arrière. Le centre.' },
        { label: 'Avant-arrière doux',   dur: 300, guide: 'À l\'inspiration légèrement en avant (engagement), à l\'expiration en arrière (réception). 3 secondes par côté.' },
        { label: 'OLLO + avant-arrière', dur: 600, guide: 'OLLO en avant, OLLO en arrière. L\'espace intérieur devient sphérique, rond, complet.' },
        { label: 'Rémanence',            dur: 300, guide: 'Arrête au centre. Sens la sphère de présence autour de toi. Ni avant ni arrière — juste ici.' },
        { label: 'Carnet',               dur: 180, guide: 'Ta tendance naturelle : vers l\'avant (projection) ou vers l\'arrière (réception) ?' }
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
        { label: 'Préparation',               dur: 120, guide: 'Yeux ouverts, regard doux et sans cible. Nuque et mâchoire complètement relâchées.' },
        { label: 'Premières convergences',    dur: 240, guide: 'Yeux mi-clos. Convergez très doucement vers un point imaginaire à 30 cm du nez. 30 s de convergence, puis relâchez. Répétez.' },
        { label: 'Alternance douce',          dur: 480, guide: '30 secondes de convergence douce, 30 secondes de regard doux relâché. Observez les phosphènes qui apparaissent — ne les forcez pas.' },
        { label: 'Yeux fermés — observation', dur: 300, guide: 'Fermez les yeux. Observez les couleurs, formes et lumières intérieures. Ne les dirigez pas. Laissez venir.' },
        { label: 'Intégration',               dur: 120, guide: 'Ouvrez doucement les yeux. Bougez légèrement les doigts. Revenez à la pièce.' }
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
        { label: 'Préparation',     dur: 90,  guide: 'Assis dans l\'axe. Bouche légèrement ouverte. Mâchoire et gorge décontractées.' },
        { label: 'ILLI',            dur: 240, guide: 'ILLI — vibration haute. Langue contre le palais sur le L. Sens les sinus frontaux et le haut du crâne s\'allumer.' },
        { label: 'ALLA',            dur: 240, guide: 'ALLA — vibration centrale. La voyelle A ouvre la gorge. Traversée de la gorge au cœur.' },
        { label: 'OLLO',            dur: 240, guide: 'OLLO — vibration ronde. O sphérique dans la poitrine et le ventre. Espace intérieur plein et arrondi.' },
        { label: 'RORO',            dur: 240, guide: 'RORO — vibration basse. R roulé, plancher buccal, sacrum. La vibration descend et ancre.' },
        { label: 'Silence vibrant', dur: 180, guide: 'Plus de mantra. Écoute le silence. La vibration continue dans le corps sans effort.' },
        { label: 'Carnet',          dur: 120, guide: 'Lequel des quatre mantras a résonné le plus fort aujourd\'hui ? Pourquoi ?' }
      ]
    }
  ];

  /* ── Catalogue d'images par forme et couleur ────────────── */

  var BASE = 'assets/images/images objet/';

  var COULEURS_ORDRE = ['bleu', 'rouge', 'vert', 'orange', 'jaune', 'violet'];

  var FORMES_COULEURS = {
    'Carré': {
      dossier: BASE + 'carré/',
      couleurs: {
        bleu:   'bleu.png',
        rouge:  'rouge.png',
        vert:   'vert.png',
        jaune:  'jaune.png',
        violet: 'violet.png'
      }
    },
    'Cercle': {
      dossier: BASE + 'cercles/',
      couleurs: {
        bleu:   'bleu.png',
        vert:   'vert.png',
        orange: 'orange.png',
        jaune:  'jaune.png',
        violet: 'violet.png'
      }
    },
    'Triangle': {
      dossier: BASE + 'triangle/',
      couleurs: {
        bleu:   'bleu.png',
        rouge:  'rouge.png',
        vert:   'vert.png',
        orange: 'orange.png',
        jaune:  'jaune.png',
        violet: 'violet.png'
      }
    },
    'Rectangle': {
      dossier: BASE + 'rectangle/',
      couleurs: {
        bleu:   'bleu.png',
        rouge:  'rouge.png',
        vert:   'vert.png',
        orange: 'orange.png',
        jaune:  'jaune.png',
        violet: 'violet.png'
      }
    },
    'Objet 3D': {
      dossier: BASE + 'objet 3D/',
      couleurs: {
        bleu:   'sphère bleu.png',
        rouge:  'cube rouge.png',
        vert:   'cylindre vert.png',
        orange: 'cone orange.png',
        jaune:  'etoile jaune.png',
        violet: 'pyramide violet.png'
      }
    },
    'Fleurs': {
      dossier: BASE + 'fleurs/tulipes/',
      couleurs: {
        bleu:  'bleu.png',
        rouge: 'rouge.png'
      }
    }
  };

  var FORMES_NOMS = Object.keys(FORMES_COULEURS);

  var COULEUR_DOT = {
    bleu:   '#3b82f6',
    rouge:  '#ef4444',
    vert:   '#22c55e',
    orange: '#f97316',
    jaune:  '#eab308',
    violet: '#8b5cf6'
  };

  /* Retourne le label pour objet 3D (nom de forme) ou simple couleur */
  function labelObjet(forme, couleur) {
    var f = FORMES_COULEURS[forme];
    if (!f) return couleur;
    var fichier = f.couleurs[couleur];
    if (!fichier) return couleur;
    if (forme === 'Objet 3D') {
      return fichier.replace('.png', '');
    }
    return forme + ' ' + couleur;
  }

  /* Construit le chemin complet */
  function srcObjet(forme, couleur) {
    var f = FORMES_COULEURS[forme];
    if (!f || !f.couleurs[couleur]) return null;
    return f.dossier + f.couleurs[couleur];
  }

  /* ── Progression en localStorage ───────────────────────── */

  var LS_KEY = 'axis_pf_progression';

  function chargerProg() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {};
  }

  function sauverProg(prog) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(prog)); } catch (e) {}
  }

  /* Retourne la prochaine couleur suggérée pour une forme */
  function prochaineCouleur(forme) {
    var prog = chargerProg();
    var idx  = prog[forme] !== undefined ? prog[forme] : 0;
    var f    = FORMES_COULEURS[forme];
    if (!f) return 'bleu';
    var couleursDispos = COULEURS_ORDRE.filter(function (c) { return f.couleurs[c]; });
    return couleursDispos[idx % couleursDispos.length] || couleursDispos[0];
  }

  /* Avance l'index de couleur pour une forme après une séance */
  function avancerCouleur(forme) {
    var prog = chargerProg();
    var f    = FORMES_COULEURS[forme];
    if (!f) return;
    var couleursDispos = COULEURS_ORDRE.filter(function (c) { return f.couleurs[c]; });
    var idx = (prog[forme] !== undefined ? prog[forme] : 0) + 1;
    prog[forme] = idx % couleursDispos.length;
    sauverProg(prog);
  }

  /* ── State ──────────────────────────────────────────────── */

  var state = {
    activePratique: null,
    phaseIndex:     0,
    elapsed:        0,
    running:        false,
    paused:         false,
    tick:           null,
    selectedForme:  FORMES_NOMS[0],
    selectedCouleur: null,
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

    // Initialise la forme et couleur suggérée
    state.selectedForme   = FORMES_NOMS[0];
    state.selectedCouleur = prochaineCouleur(state.selectedForme);

    var modal   = $('axisPfModal');
    var overlay = $('axisPfOverlay');

    $('axisPfModalKicker').textContent = p.subtitle;
    $('axisPfModalTitle').textContent  = p.title;

    $('axisPfPhaseLabel').textContent  = 'Prêt';
    $('axisPfTimer').textContent       = fmt(p.phases[0].dur);
    $('axisPfProgressBar').style.width = '0%';
    $('axisPfGuidance').textContent    = 'Appuie sur Démarrer pour commencer.';
    $('axisPfStart').style.display     = 'inline-block';
    $('axisPfStart').textContent       = 'Démarrer';
    $('axisPfPause').style.display     = 'none';
    $('axisPfStop').style.display      = 'none';

    $('axisPfGenerator').style.display = 'none';
    $('axisPfPractice').style.display  = 'flex';

    var done = modal.querySelector('.axis-pf-done-msg');
    if (done) done.remove();

    modal.classList.add('open');
    overlay.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    clearInterval(state.tick);
    state.running = false;
    $('axisPfModal').classList.remove('open');
    $('axisPfOverlay').classList.remove('open');
    $('axisPfModal').setAttribute('aria-hidden', 'true');
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
    var p = state.activePratique;
    if (!p) return;
    var phase = p.phases[state.phaseIndex];
    if (!phase) { onComplete(); return; }

    state.elapsed = 0;
    $('axisPfPhaseLabel').textContent  = phase.label;
    $('axisPfGuidance').textContent    = phase.guide;
    $('axisPfTimer').textContent       = fmt(phase.dur);
    $('axisPfProgressBar').style.width = '0%';

    if (typeof window.axisSpeak === 'function') {
      window.axisSpeak(phase.label + '. ' + phase.guide, false);
    }

    clearInterval(state.tick);
    state.tick = setInterval(function () {
      if (state.paused) return;
      state.elapsed++;
      var rem = Math.max(0, phase.dur - state.elapsed);
      $('axisPfTimer').textContent       = fmt(rem);
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
    $('axisPfPhaseLabel').textContent  = 'Arrêté';
    $('axisPfPause').style.display     = 'none';
    $('axisPfStop').style.display      = 'none';
    $('axisPfStart').style.display     = 'inline-block';
    $('axisPfStart').textContent       = 'Recommencer';
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
    $('axisPfPhaseLabel').textContent  = 'Terminé ✓';
    $('axisPfTimer').textContent       = '00:00';
    $('axisPfProgressBar').style.width = '100%';
    $('axisPfGuidance').textContent    = 'Exercice complet. Reste un moment dans le silence.';
    $('axisPfPause').style.display     = 'none';
    $('axisPfStop').style.display      = 'none';
    $('axisPfStart').style.display     = 'none';

    if (typeof window.axisSpeak === 'function') {
      window.axisSpeak('Exercice terminé. Reste un moment dans le silence.', false);
    }

    var practice = $('axisPfPractice');
    if (!$('axisPfModal').querySelector('.axis-pf-done-msg')) {
      var div = document.createElement('div');
      div.className = 'axis-pf-done-msg';
      div.innerHTML =
        '<strong>Séance complète</strong>' +
        '<p>Génère maintenant une séance sur mesure avec un objet de contemplation.</p>' +
        '<button id="axisPfShowGen" class="axis-pf-btn primary" type="button">Générer une séance sur mesure</button>';
      practice.appendChild(div);
      div.querySelector('#axisPfShowGen').addEventListener('click', showGenerator);
    }
  }

  /* ── Générateur ─────────────────────────────────────────── */

  function showGenerator() {
    $('axisPfGenerator').style.display = 'block';
    renderFormeBtns();
    renderCouleurBtns();
    renderObjetPreview();
    renderPreviewSeance();
    $('axisPfGenerator').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* Boutons de forme */
  function renderFormeBtns() {
    var wrap = $('axisPfCatBtns');
    wrap.innerHTML = '';
    FORMES_NOMS.forEach(function (forme) {
      var btn = document.createElement('button');
      btn.className = 'axis-pf-cat-btn' + (forme === state.selectedForme ? ' active' : '');
      btn.textContent = forme;
      btn.type = 'button';
      btn.addEventListener('click', function () {
        state.selectedForme   = forme;
        state.selectedCouleur = prochaineCouleur(forme);
        renderFormeBtns();
        renderCouleurBtns();
        renderObjetPreview();
        renderPreviewSeance();
      });
      wrap.appendChild(btn);
    });
  }

  /* Boutons de couleur avec point coloré */
  function renderCouleurBtns() {
    var wrap = $('axisPfImageGrid');
    wrap.innerHTML = '';
    var f = FORMES_COULEURS[state.selectedForme];
    if (!f) return;

    COULEURS_ORDRE.forEach(function (couleur) {
      if (!f.couleurs[couleur]) return;
      var src    = srcObjet(state.selectedForme, couleur);
      var label  = labelObjet(state.selectedForme, couleur);
      var isSugg = couleur === prochaineCouleur(state.selectedForme);
      var isSel  = couleur === state.selectedCouleur;
      var dot    = COULEUR_DOT[couleur] || '#fff';

      var div = document.createElement('div');
      div.className = 'axis-pf-couleur-card' + (isSel ? ' selected' : '');
      div.innerHTML =
        '<div class="axis-pf-couleur-thumb-wrap">' +
          '<img src="' + src + '" alt="' + label + '" loading="lazy" class="axis-pf-couleur-thumb">' +
          (isSugg ? '<span class="axis-pf-sugg-badge">Suggéré</span>' : '') +
        '</div>' +
        '<div class="axis-pf-couleur-label">' +
          '<span class="axis-pf-dot" style="background:' + dot + '"></span>' +
          '<span>' + label + '</span>' +
        '</div>';
      div.addEventListener('click', function () {
        state.selectedCouleur = couleur;
        renderCouleurBtns();
        renderObjetPreview();
        renderPreviewSeance();
      });
      wrap.appendChild(div);
    });
  }

  /* Grande prévisualisation de l'objet sélectionné */
  function renderObjetPreview() {
    var wrap = $('axisPfObjetPreview');
    if (!wrap) return;
    var src   = state.selectedCouleur ? srcObjet(state.selectedForme, state.selectedCouleur) : null;
    var label = state.selectedCouleur ? labelObjet(state.selectedForme, state.selectedCouleur) : '';
    if (src) {
      wrap.innerHTML =
        '<img src="' + src + '" alt="' + label + '" class="axis-pf-objet-big">' +
        '<p class="axis-pf-objet-label">' + label + '</p>';
    } else {
      wrap.innerHTML = '<p class="axis-pf-objet-placeholder">Sélectionne une couleur</p>';
    }
  }

  /* Résumé de la séance générée */
  function renderPreviewSeance() {
    var wrap = $('axisPfGenPreview');
    var p    = state.activePratique;
    var totalMin = parseInt(state.selectedDur, 10);
    var phases   = buildGenPhases(p, totalMin);
    var src      = state.selectedCouleur ? srcObjet(state.selectedForme, state.selectedCouleur) : null;
    var label    = state.selectedCouleur ? labelObjet(state.selectedForme, state.selectedCouleur) : null;
    var swingTxt = { lateral: 'Latéral', vertical: 'Vertical', anterieur: 'Antéro-postérieur' };

    var html = '';
    if (src) {
      html += '<div class="axis-pf-preview-row">' +
        '<strong>Objet</strong>' +
        '<img class="axis-pf-preview-img" src="' + src + '" alt="' + label + '">' +
        '<span>' + label + '</span>' +
        '</div>';
    }
    html += '<div class="axis-pf-preview-row"><strong>Exercice</strong>' + (p ? p.title : '—') + '</div>';
    html += '<div class="axis-pf-preview-row"><strong>Balancement</strong>' + (swingTxt[state.selectedSwing] || '—') + '</div>';
    html += '<div class="axis-pf-preview-row"><strong>Durée totale</strong>' + totalMin + ' min</div>';
    html += '<div class="axis-pf-preview-row"><strong>Phases</strong>' +
      phases.map(function (ph) { return ph.label + ' ' + ph.durMin + ' min'; }).join(' → ') + '</div>';

    wrap.innerHTML = html;
  }

  function buildGenPhases(p, totalMin) {
    var ex   = Math.round(totalMin * 0.50);
    var lum  = Math.round(totalMin * 0.15);
    var rem  = Math.round(totalMin * 0.20);
    var clos = totalMin - ex - lum - rem;
    return [
      { label: 'Lumière',                     durMin: lum  },
      { label: p ? p.title : 'Exercice',      durMin: ex   },
      { label: 'Rémanence',                   durMin: rem  },
      { label: 'Clôture',                     durMin: Math.max(1, clos) }
    ];
  }

  function bindGenEvents() {
    $('axisPfSwingBtns').addEventListener('click', function (e) {
      var btn = e.target.closest('.axis-pf-opt');
      if (!btn) return;
      $('axisPfSwingBtns').querySelectorAll('.axis-pf-opt').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.selectedSwing = btn.dataset.val;
      renderPreviewSeance();
    });

    $('axisPfDurBtns').addEventListener('click', function (e) {
      var btn = e.target.closest('.axis-pf-opt');
      if (!btn) return;
      $('axisPfDurBtns').querySelectorAll('.axis-pf-opt').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.selectedDur = btn.dataset.val;
      renderPreviewSeance();
    });

    $('axisPfGenLaunch').addEventListener('click', function () { launchSession(false); });
    $('axisPfGenSave').addEventListener('click',   function () { launchSession(true);  });
  }

  function launchSession(redirect) {
    var p = state.activePratique;
    var totalMin = parseInt(state.selectedDur, 10);

    var payload = {
      createdFrom:   p ? p.id : 'manuel',
      exerciceTitle: p ? p.title : '—',
      mantra:        p ? p.mantra : null,
      forme:         state.selectedForme,
      couleur:       state.selectedCouleur,
      objectLabel:   state.selectedCouleur ? labelObjet(state.selectedForme, state.selectedCouleur) : null,
      objectSrc:     state.selectedCouleur ? srcObjet(state.selectedForme, state.selectedCouleur) : null,
      swingType:     state.selectedSwing,
      totalMin:      totalMin,
      phases:        buildGenPhases(p, totalMin),
      createdAt:     new Date().toISOString()
    };

    try { localStorage.setItem('axis_seance_generee', JSON.stringify(payload)); } catch (e) {}

    if (state.selectedForme && state.selectedCouleur) {
      avancerCouleur(state.selectedForme);
    }

    if (redirect) {
      window.location.href = 'pratiquer.html';
    } else {
      closeModal();
      var msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;bottom:28px;right:28px;background:#1a140a;border:1px solid rgba(216,180,95,.4);border-radius:14px;padding:14px 22px;color:#ffe7a3;font-size:.88rem;font-weight:700;z-index:9999;max-width:340px;box-shadow:0 8px 32px rgba(0,0,0,.5);';
      var lbl = payload.objectLabel ? ' (' + payload.objectLabel + ')' : '';
      msg.textContent = 'Séance générée' + lbl + '. Ouvre Pratiquer pour la lancer.';
      document.body.appendChild(msg);
      setTimeout(function () { msg.remove(); }, 4500);
    }
  }

  /* ── Init ───────────────────────────────────────────────── */

  function init() {
    renderSection();

    $('axisPfModalClose').addEventListener('click', closeModal);
    $('axisPfOverlay').addEventListener('click', closeModal);

    $('axisPfStart').addEventListener('click', function () {
      if (!state.activePratique) return;
      state.phaseIndex = 0;
      state.elapsed    = 0;
      startTimer();
    });
    $('axisPfPause').addEventListener('click', pauseResume);
    $('axisPfStop').addEventListener('click',  stopTimer);

    bindGenEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
