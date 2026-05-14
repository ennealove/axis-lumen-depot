/* ── Axis Apprendre — Parcours pédagogique 4 blocs ── */
(function () {
  "use strict";

  var STORAGE_KEY = "axis_apprendre_progression";

  /* ─── Structure ───────────────────────────────── */
  var STRUCTURE = [
    { id: "A1", bloc: "A", blocLabel: "A — Ressentir", label: "La cénesthésie" },
    { id: "A2", bloc: "A", blocLabel: null,            label: "Sensations par pratique" },
    { id: "B1", bloc: "B", blocLabel: "B — Sonner",    label: "Mantras & lettre L" },
    { id: "C1", bloc: "C", blocLabel: "C — Voir",      label: "Convergence oculaire" },
    { id: "C2", bloc: "C", blocLabel: null,             label: "Visualisation" },
    { id: "C3", bloc: "C", blocLabel: null,             label: "Point de concentration" },
    { id: "D1", bloc: "D", blocLabel: "D — Bouger",    label: "Jour 1 — Le carré" },
    { id: "D2", bloc: "D", blocLabel: null,             label: "Jour 2 — Le triangle" },
    { id: "D3", bloc: "D", blocLabel: null,             label: "Jour 3 — Le cercle" },
    { id: "D4", bloc: "D", blocLabel: null,             label: "Jour 4 — Le rectangle" },
    { id: "D5", bloc: "D", blocLabel: null,             label: "Jour 5 — Formes 3D" },
    { id: "D6", bloc: "D", blocLabel: null,             label: "Jour 6 — Végétaux" },
    { id: "D7", bloc: "D", blocLabel: null,             label: "Jour 7 — Arbres" },
    { id: "D8", bloc: "D", blocLabel: null,             label: "Jour 8 — Point de concentration" },
    { id: "EX43", bloc: "D", blocLabel: null,           label: "Exercice 43 — Latéral" },
    { id: "EX44", bloc: "D", blocLabel: null,           label: "Exercice 44 — Vertical" },
    { id: "EX45", bloc: "D", blocLabel: null,           label: "Exercice 45 — Antéro-post." },
    { id: "GEN",  bloc: "D", blocLabel: null,           label: "Générateur de séance" }
  ];

  /* ─── Unlock rules ────────────────────────────── */
  function unlockedIds(prog) {
    var done = prog.done || [];
    var unlocked = ["A1"];
    var order = STRUCTURE.map(function (s) { return s.id; });

    for (var i = 0; i < order.length; i++) {
      var id = order[i];
      if (done.indexOf(id) >= 0) {
        // unlock next in sequence
        var s = STRUCTURE[i + 1];
        if (s) {
          // EX44 needs EX43 practiced 3 times
          if (s.id === "EX44" && (prog.practiced["EX43"] || 0) < 3) continue;
          if (s.id === "EX45" && (prog.practiced["EX44"] || 0) < 3) continue;
          unlocked.push(s.id);
        }
      }
    }
    return unlocked;
  }

  function progressionVierge() {
    return { version: 2, done: [], current: "A1", practiced: {}, journal: [] };
  }

  function charger() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch (_) {}
    return progressionVierge();
  }

  function sauvegarder(prog) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prog)); } catch (_) {}
  }

  /* ─── Speak helper ────────────────────────────── */
  function speak(text) {
    if (!text) return;
    if (window.axisSpeak) { window.axisSpeak(text, true); return; }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR"; u.rate = 0.92; u.volume = 0.9;
    var fr = window.speechSynthesis.getVoices().find(function (v) {
      return v.lang && v.lang.toLowerCase().startsWith("fr");
    });
    if (fr) u.voice = fr;
    window.speechSynthesis.speak(u);
  }

  /* ─── Timer d'exercice ────────────────────────── */
  function TimerExercice(phases, containerId, onComplete) {
    var self = this;
    self.phases = phases;
    self.containerId = containerId;
    self.onComplete = onComplete || function () {};
    self.phaseIndex = -1;
    self.countdown = null;
    self.barTimer = null;
    self.running = false;
  }

  TimerExercice.prototype.demarrer = function () {
    this.running = true;
    this.executerPhase(0);
  };

  TimerExercice.prototype.arreter = function () {
    this.running = false;
    clearTimeout(this.countdown);
    clearInterval(this.barTimer);
  };

  TimerExercice.prototype.executerPhase = function (index) {
    if (!this.running) return;
    if (index >= this.phases.length) {
      this.running = false;
      this.onComplete();
      return;
    }
    var self = this;
    var phase = this.phases[index];
    this.phaseIndex = index;

    var c = document.getElementById(this.containerId);
    if (c) {
      var phaseEl = c.querySelector(".ap-timer-phase");
      var bodyEl  = c.querySelector(".ap-timer-body");
      var cdEl    = c.querySelector(".ap-timer-countdown");
      var barEl   = c.querySelector(".ap-timer-bar");

      if (phaseEl) { phaseEl.textContent = phase.label; phaseEl.className = "ap-timer-phase phase-" + (phase.type || "neutral"); }
      if (bodyEl)  bodyEl.textContent = phase.instruction || "";
      if (cdEl)    cdEl.textContent = phase.duree;
      if (barEl)   { barEl.style.transition = "none"; barEl.style.width = "100%"; }
    }

    if (phase.voix) speak(phase.voix);

    var remaining = phase.duree;
    clearInterval(this.barTimer);
    this.barTimer = setInterval(function () {
      remaining--;
      var c2 = document.getElementById(self.containerId);
      if (c2) {
        var cdEl2 = c2.querySelector(".ap-timer-countdown");
        var barEl2 = c2.querySelector(".ap-timer-bar");
        if (cdEl2) cdEl2.textContent = Math.max(0, remaining);
        if (barEl2) barEl2.style.width = (remaining / phase.duree * 100) + "%";
      }
    }, 1000);

    this.countdown = setTimeout(function () {
      clearInterval(self.barTimer);
      self.executerPhase(index + 1);
    }, phase.duree * 1000);
  };

  /* ─── Animation SVG point de concentration ───── */
  function creerSVGPoint(direction, containerId) {
    var c = document.getElementById(containerId);
    if (!c) return;

    var configs = {
      lateral: {
        cx1: 60, cy1: 200, cx2: 340, cy2: 200,
        label: "ILLI", couleur: "#d8b45f", dur: "2s"
      },
      vertical: {
        cx1: 200, cy1: 340, cx2: 200, cy2: 60,
        label: "ALLA", couleur: "#ffe7a3", dur: "2.2s"
      },
      anteroposterieur: {
        cx1: 60, cy1: 210, cx2: 340, cy2: 190,
        label: "ELLU", couleur: "#f4d986", dur: "2.4s"
      }
    };

    var cfg = configs[direction] || configs.lateral;
    var pathId = "trajet-" + direction + "-" + Date.now();

    c.innerHTML =
      '<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">' +
        '<ellipse cx="200" cy="200" rx="140" ry="160" fill="none" stroke="rgba(216,180,95,.15)" stroke-width="2"/>' +
        '<defs>' +
          '<path id="' + pathId + '" d="M ' + cfg.cx1 + ' ' + cfg.cy1 + ' Q 200 200 ' + cfg.cx2 + ' ' + cfg.cy2 + '"/>' +
        '</defs>' +
        '<use href="#' + pathId + '" fill="none" stroke="rgba(216,180,95,.25)" stroke-width="1" stroke-dasharray="4,4"/>' +
        '<circle r="9" fill="' + cfg.couleur + '" opacity="0.95" filter="url(#glow' + direction + ')">' +
          '<animateMotion dur="' + cfg.dur + '" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1" keyTimes="0;1">' +
            '<mpath href="#' + pathId + '"/>' +
          '</animateMotion>' +
        '</circle>' +
        '<text x="200" y="374" text-anchor="middle" fill="' + cfg.couleur + '" font-size="28" font-weight="800" letter-spacing="6" font-family="Georgia,serif">' + cfg.label + '</text>' +
      '</svg>';
  }

  /* ─── Contenu des leçons ──────────────────────── */
  function renderLecon(id) {
    switch (id) {
      case "A1": return contentA1();
      case "A2": return contentA2();
      case "B1": return contentB1();
      case "C1": return contentC1();
      case "C2": return contentC2();
      case "C3": return contentC3();
      case "D1": case "D2": case "D3": case "D4":
        return contentJour(id);
      case "D5": return contentJour5();
      case "D6": return contentJour6();
      case "D7": return contentJour7();
      case "D8": return contentJour8();
      case "EX43": return contentEx(43);
      case "EX44": return contentEx(44);
      case "EX45": return contentEx(45);
      case "GEN":  return contentGenerateur();
      default: return "<p>Leçon à venir.</p>";
    }
  }

  /* ── A1 ─────────────────────────────────────── */
  function contentA1() {
    return '<p class="ap-lesson-kicker">Bloc A — Ressentir</p>' +
      '<h2 class="ap-lesson-title">La cénesthésie</h2>' +

      '<div class="ap-section">' +
        '<h3>Qu\'est-ce que la cénesthésie ?</h3>' +
        '<p>La cénesthésie est la conscience interne du corps vivant. Pas ce que vous voyez, pas ce que vous entendez — ce que vous ressentez de l\'intérieur. La position d\'un membre sans le regarder. La tension d\'un muscle sans le toucher. Le mouvement d\'une articulation dans l\'obscurité.</p>' +
        '<p>C\'est votre sixième sens réel, celui dont personne ne parle, celui que les traditions initiatiques ont toujours placé au cœur de leur enseignement.</p>' +
        '<p>Sans développement de cette écoute intérieure, tous les exercices — balancements, tensions statiques, respirations — restent des gestes mécaniques sans effet profond. Avec elle, chaque mouvement devient une exploration.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Les sensations subjectives</h3>' +
        '<p>Une sensation subjective est une perception qui possède les caractéristiques d\'une sensation physique, mais qui survient sans stimulation physique directe.</p>' +
        '<p>Exemples que vous connaissez peut-être déjà :</p>' +
        '<ul>' +
          '<li>La sensation de tomber juste avant de s\'endormir</li>' +
          '<li>Un membre qui "s\'endort" et que l\'on ne reconnaît plus comme sien</li>' +
          '<li>La chaleur qui monte dans les mains pendant une méditation</li>' +
          '<li>Le fourmillement dans le crâne lors d\'une forte concentration</li>' +
        '</ul>' +
        '<div class="ap-quote">Ces sensations ne sont pas des illusions. Ce sont des perceptions réelles d\'énergies subtiles que le système nerveux génère et peut apprendre à amplifier. Elles constituent votre boussole intérieure.</div>' +
        '<p><em>Les sensations subjectives vous informent sur le passage d\'un état à un autre.</em> C\'est la phrase la plus importante de ce cours. Retenez-la.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>La contraction cénesthésique</h3>' +
        '<p>Au cœur de notre pratique se trouve un geste en trois temps :</p>' +
        '<ol>' +
          '<li><strong>La contraction physique — 8 secondes.</strong> Vous contractez réellement un muscle ou un groupe musculaire. Fermement, mais sans douleur.</li>' +
          '<li><strong>Le relâchement — 8 secondes.</strong> Vous relâchez complètement. Vous observez ce qui reste — la trace, le souvenir physique de la contraction.</li>' +
          '<li><strong>La contraction en pensée — 8 secondes.</strong> Sans bouger, vous revivez la contraction intérieurement. Pas vous la représentez comme un spectateur — vous la ressentez comme un acteur. Ce n\'est pas de la visualisation. C\'est de la sensation pure.</li>' +
        '</ol>' +
        '<p>Ce troisième temps est l\'essence de la pratique. Le système nerveux ne distingue pas toujours parfaitement entre une contraction réelle et une contraction parfaitement habitée en pensée.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Exercice pratique 1 — La main</h3>' +
        '<p>Contractez la main droite en poing, relâchez, puis revivez-la en pensée. 8 secondes par phase.</p>' +
        timerWidget("timer-a1-main", [
          { label: "CONTRACTION", type: "contraction", instruction: "Serrez la main droite en poing — fort et stable.", duree: 8, voix: "Contractez la main droite en poing. Serrez fermement." },
          { label: "RELÂCHEMENT", type: "relachement", instruction: "Ouvrez la main, observez la trace de la tension.", duree: 8, voix: "Relâchez complètement. Observez ce qui reste." },
          { label: "EN PENSÉE",   type: "pensee",      instruction: "Sans bouger, revivez la contraction de l'intérieur.", duree: 8, voix: "Maintenant, revivez cette contraction en pensée pure. Ne bougez pas — ressentez." }
        ], "J'ai pratiqué l'exercice de la main") +
        '<textarea class="ap-note-field" placeholder="Qu\'avez-vous ressenti ? (facultatif)" rows="3" style="margin-top:12px;"></textarea>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Pourquoi c\'est difficile au début</h3>' +
        '<p>Il est normal de ne rien percevoir les premières fois. Le canal sensoriel interne est comme un muscle atrophié — il faut du temps pour le réveiller.</p>' +
        '<p>La principale erreur est de vouloir sentir quelque chose de précis. Cette attente bloque la perception. La bonne attitude : observer avec une attention détendue, sans attente, sans jugement. Comme on écoute un son lointain.</p>' +
        '<p>Une autre erreur : confondre <em>visualiser</em> et <em>ressentir</em>. Si vous voyez votre main se contracter, vous visualisez. Si vous sentez la tension monter dans les fibres musculaires, vous ressentez. Ce sont deux activités différentes. Nous cherchons la seconde.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Les sensations à reconnaître</h3>' +
        '<ul>' +
          '<li><em>Fourmillement</em> — signe d\'activation nerveuse, souvent le premier signal</li>' +
          '<li><em>Chaleur diffuse</em> — énergie qui se répand dans une zone</li>' +
          '<li><em>Légèreté</em> — sensation que le membre "flotte"</li>' +
          '<li><em>Pression douce</em> — présence intérieure, comme un contact sans contact</li>' +
          '<li><em>Vibration</em> — rythme interne, souvent perçu au niveau du crâne</li>' +
          '<li><em>Engourdissement bienveillant</em> — accompagné de bien-être</li>' +
        '</ul>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Exercice pratique 2 — Corps entier</h3>' +
        '<p>Séquence complète guidée. 8 secondes par phase.</p>' +
        timerWidget("timer-a1-corps", buildCorpsEntierPhases(), "J'ai pratiqué la séquence complète") +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Exercice pratique 3 — Reconnaissance des sensations</h3>' +
        '<p>Cochez ce que vous avez perçu. Il n\'y a pas de bonne ou mauvaise réponse.</p>' +
        '<div class="ap-sensation-grid" id="sensGrid">' +
          sensationChip("fourmillement", "Fourmillement") +
          sensationChip("chaleur", "Chaleur") +
          sensationChip("legeret", "Légèreté") +
          sensationChip("pression", "Pression douce") +
          sensationChip("vibration", "Vibration") +
          sensationChip("engourdi", "Engourdissement bienveillant") +
          sensationChip("rien", "Rien perçu") +
        '</div>' +
        '<div id="sensMsg" class="ap-sensation-feedback"></div>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="A1">J\'ai pratiqué et compris — accéder à la leçon suivante</button>';
  }

  function buildCorpsEntierPhases() {
    var parties = [
      ["Jambe gauche", "jambe gauche"],
      ["Jambe droite", "jambe droite"],
      ["Bras gauche", "bras gauche"],
      ["Bras droit", "bras droit"],
      ["Ventre", "ventre"],
      ["Cou et nuque", "cou et nuque"],
      ["Corps entier", "tout le corps"]
    ];
    var phases = [];
    parties.forEach(function (p) {
      phases.push({ label: "CONTRACTION", type: "contraction", instruction: "Contractez — " + p[0], duree: 8, voix: p[0] + " — contractez." });
      phases.push({ label: "RELÂCHEMENT", type: "relachement", instruction: "Relâchez — " + p[0], duree: 8, voix: "Relâchez." });
      phases.push({ label: "EN PENSÉE",   type: "pensee",      instruction: "Revivez en pensée — " + p[0], duree: 8, voix: "Contraction en pensée." });
    });
    return phases;
  }

  function sensationChip(id, label) {
    return '<label class="ap-sensation-chip" data-id="' + id + '">' +
      '<span class="ap-dot"></span>' + label +
    '</label>';
  }

  /* ── A2 ─────────────────────────────────────── */
  function contentA2() {
    return '<p class="ap-lesson-kicker">Bloc A — Ressentir</p>' +
      '<h2 class="ap-lesson-title">Sensations pendant les exercices spécifiques</h2>' +

      '<div class="ap-section">' +
        '<h3>Pendant les balancements</h3>' +
        '<p>Vous pourrez percevoir : léger vertige doux, sensation de flottement, chaleur au niveau du crâne, vibration rythmique, impression que le corps continue à bouger après l\'arrêt.</p>' +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Pendant les tensions statiques</h3>' +
        '<p>Fourmillement progressif envahissant le corps, engourdissement bienveillant, sensation d\'être enveloppé, légèreté paradoxale, vibration interne.</p>' +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Pendant la respiration rythmée</h3>' +
        '<p>Chaleur irradiant de la poitrine, sensation d\'expansion à l\'inspire, légèreté à l\'expire, picotement aux extrémités.</p>' +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Entre les séances</h3>' +
        '<p>C\'est là que les effets profonds se manifestent. Un bien-être inexplicable. Une intuition plus vive. Des rêves plus colorés, plus cohérents. Un sentiment de présence intérieure accrue.</p>' +
        '<div class="ap-quote">Commencez à tenir un journal de pratique. Même trois lignes après chaque séance. C\'est votre mémoire de progression.</div>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="A2">Compris — continuer vers les mantras</button>';
  }

  /* ── B1 ─────────────────────────────────────── */
  function contentB1() {
    return '<p class="ap-lesson-kicker">Bloc B — Sonner</p>' +
      '<h2 class="ap-lesson-title">Les mantras et la lettre L</h2>' +

      '<div class="ap-section">' +
        '<h3>Qu\'est-ce qu\'un mantra dans notre pratique ?</h3>' +
        '<p>Un mantra n\'est pas ici une prière ni une invocation. C\'est un outil physiologique précis. Un son qui, par sa structure et sa résonance, produit un effet mesurable sur le système nerveux et les glandes endocrines.</p>' +
        '<p>Notre pratique utilise trois mantras : <em>ILLI, ALLA, ELLU</em>. Un pour chaque direction de balancement. Leur structure sonore a été sélectionnée pour une raison précise.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>La lettre L et la glande hypophyse</h3>' +
        '<p>Prononcez lentement, en appuyant, la lettre <em>L</em>. Sentez où se place votre langue. Elle monte appuyer contre le haut du palais, juste derrière les dents supérieures.</p>' +
        '<p>Ce point de contact n\'est pas anodin. Au-dessus de ce palais se trouve la glande hypophyse — la glande maîtresse du système endocrinien, régulatrice de toutes les autres glandes.</p>' +
        '<p>La vibration créée par le L appuyé stimule mécaniquement cette zone par résonance osseuse. Ce n\'est pas de la métaphysique — c\'est de la physiologie vibratoire.</p>' +
        '<div class="ap-quote">Dans la tradition hébraïque, EL signifie Dieu. Le suffixe -el dans les noms des anges (Michaël, Raphaël, Gabriël) désigne la présence divine. Ce son est un vecteur de connexion à notre nature la plus haute.</div>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Les trois mantras et leurs directions</h3>' +
        '<div class="ap-mantra-showcase">' +
          '<div class="ap-mantra-card">' +
            '<span class="ap-mantra-word">ILLI</span>' +
            '<div class="ap-mantra-dir">Latéral ↔</div>' +
            '<p class="ap-mantra-desc">Ill-li, langue frappe deux fois le palais. Le rythme double correspond au rythme gauche-droite.</p>' +
            '<button class="ap-mantra-play" onclick="if(window.axisSpeak)window.axisSpeak(\'ILLI, ILLI, ILLI, ILLI, ILLI\',true);else window.speechSynthesis&&window.speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(\'ILLI ILLI ILLI ILLI ILLI\'),{lang:\'fr-FR\',rate:.7}))">▶ Écouter</button>' +
          '</div>' +
          '<div class="ap-mantra-card">' +
            '<span class="ap-mantra-word">ALLA</span>' +
            '<div class="ap-mantra-dir">Vertical ↕</div>' +
            '<p class="ap-mantra-desc">All-la, son qui monte. Le A final s\'ouvre vers le haut — évoque la verticalité, l\'axe.</p>' +
            '<button class="ap-mantra-play" onclick="if(window.axisSpeak)window.axisSpeak(\'ALLA, ALLA, ALLA, ALLA, ALLA\',true);else window.speechSynthesis&&window.speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(\'ALLA ALLA ALLA ALLA ALLA\'),{lang:\'fr-FR\',rate:.7}))">▶ Écouter</button>' +
          '</div>' +
          '<div class="ap-mantra-card">' +
            '<span class="ap-mantra-word">ELLU</span>' +
            '<div class="ap-mantra-dir">Antéro-post. ⟷</div>' +
            '<p class="ap-mantra-desc">Ell-lu. Le son se déplace de l\'avant vers l\'arrière de la bouche — comme la direction du mouvement.</p>' +
            '<button class="ap-mantra-play" onclick="if(window.axisSpeak)window.axisSpeak(\'ELLU, ELLU, ELLU, ELLU, ELLU\',true);else window.speechSynthesis&&window.speechSynthesis.speak(Object.assign(new SpeechSynthesisUtterance(\'ELLU ELLU ELLU ELLU ELLU\'),{lang:\'fr-FR\',rate:.7}))">▶ Écouter</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Exercice — Sentir la résonance</h3>' +
        '<p>Placez deux doigts sur le sommet du crâne. Prononcez chaque mantra à voix haute en appuyant le L. Percevez-vous une vibration ?</p>' +
        '<p>Cliquez sur "Écouter" au-dessus pour entendre la voix off prononcer chaque mantra lentement, 5 fois. Répétez avec elle.</p>' +
        '<textarea class="ap-note-field" placeholder="Notez vos sensations pour chaque mantra…" rows="3"></textarea>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Comment utiliser le mantra pendant le balancement</h3>' +
        '<p>Le mantra n\'est pas dit à voix haute pendant la séance — il est murmuré intérieurement, ou prononcé à voix très basse, au rythme du balancement. Une répétition toutes les 8 à 10 secondes environ.</p>' +
        '<p>Il ne faut pas le <em>penser</em> — il faut le <em>sonner</em> intérieurement. La différence : quand vous le pensez, vous l\'intellectualisez. Quand vous le sonnez, vous le sentez résonner.</p>' +
        '<p>Avec le temps, le mantra devient automatique — il s\'installe de lui-même au rythme du mouvement. C\'est le signe que les rythmes cérébraux commencent à s\'organiser.</p>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="B1">J\'ai ressenti la résonance — continuer vers la vision</button>';
  }

  /* ── C1 ─────────────────────────────────────── */
  function contentC1() {
    return '<p class="ap-lesson-kicker">Bloc C — Voir</p>' +
      '<h2 class="ap-lesson-title">La convergence oculaire et le troisième œil</h2>' +

      '<div class="ap-section">' +
        '<h3>Le point entre les sourcils</h3>' +
        '<p>Entre vos deux sourcils, légèrement en retrait, se trouve la zone que toutes les traditions initiatiques connaissent : troisième œil, ajna chakra, œil de Shiva, œil d\'Horus. En physiologie moderne, cette zone correspond à la glande pinéale.</p>' +
        '<p>La glande pinéale produit la mélatonine qui régule nos cycles veille-sommeil. Elle est sensible à la lumière — même les yeux fermés. Notre pratique la stimule par deux voies : la convergence oculaire et la fixation de la source lumineuse avec attention portée vers ce point.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Technique de convergence</h3>' +
        '<p>Tenez un crayon à bras tendu, à hauteur des yeux. Fixez sa pointe. Ramenez-le lentement vers vous jusqu\'à environ 15 centimètres du visage, en gardant les deux yeux fixés sur la pointe.</p>' +
        '<p>Vous percevrez peut-être une légère pression entre les sourcils — c\'est l\'activation de la zone.</p>' +
        '<div class="ap-convergence-demo">' +
          '<div class="ap-conv-point"></div>' +
          '<span class="ap-conv-instruction">Suivez le point des yeux — ramenez-le vers vous</span>' +
        '</div>' +
        timerWidget("timer-c1-conv", [
          { label: "CONVERGENCE", type: "neutral", instruction: "Suivez le point qui s\'approche. Attention vers le front.", duree: 120, voix: "Suivez le point des yeux. Ramenez-le doucement vers vous. Portez l\'attention vers le point entre vos sourcils, sans forcer." }
        ], "Pratiqué la convergence") +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Convergence pendant la fixation lumineuse</h3>' +
        '<p>Quand vous fixez la source lumineuse pour créer un phosphène, portez doucement votre attention vers ce point entre les sourcils — sans forcer, sans crisper. Comme si vous regardiez légèrement vers le haut et vers l\'intérieur.</p>' +
        '<p>Cela amplifie considérablement la qualité du phosphène et active simultanément les deux voies : visuelle et énergétique.</p>' +
        '<div class="ap-lumiere-container">' +
          '<div class="ap-source-lumineuse"></div>' +
          '<p class="ap-lumiere-instruction">Fixez cette lumière 30 secondes en portant l\'attention entre les sourcils</p>' +
        '</div>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="C1">Pratiqué — continuer vers la visualisation</button>';
  }

  /* ── C2 ─────────────────────────────────────── */
  function contentC2() {
    return '<p class="ap-lesson-kicker">Bloc C — Voir</p>' +
      '<h2 class="ap-lesson-title">La visualisation — des formes simples aux images composites</h2>' +

      '<div class="ap-section">' +
        '<h3>Pourquoi on commence par des formes 2D simples</h3>' +
        '<p>La visualisation est un muscle. Personne ne soulève 100 kg le premier jour. On ne commence pas par des paysages complexes ou des visages — on commence par une forme géométrique plane, d\'une seule couleur, sur fond noir.</p>' +
        '<p>L\'objectif n\'est pas de "voir" l\'image comme une hallucination. C\'est de la maintenir stable et présente en pensée avec suffisamment de densité pour pouvoir la mêler au phosphène.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>La progression naturelle</h3>' +
        '<ol>' +
          '<li><strong>Étape 1 — Formes 2D :</strong> carré, triangle, cercle, rectangle. Une couleur à la fois, une forme à la fois. Une semaine complète.</li>' +
          '<li><strong>Étape 2 — Formes 3D :</strong> cube, pyramide, sphère. L\'objet a maintenant un volume, une ombre, une présence dans l\'espace.</li>' +
          '<li><strong>Étape 3 — Images organiques :</strong> végétaux, arbres. L\'image n\'est plus géométrique — elle est vivante.</li>' +
          '<li><strong>Étape 4 — L\'objet mêlé au phosphène :</strong> l\'image que vous tenez en pensée se mêle à la tache colorée du phosphène. C\'est le Mixage Phosphénique dans sa forme directe.</li>' +
        '</ol>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>La règle d\'or</h3>' +
        '<div class="ap-quote">Si l\'image s\'échappe, ne forcez pas. Revenez-y doucement. L\'effort de concentration doit être léger et constant, jamais crispé. Une attention crispée détruit la perception subtile. Une attention légère l\'accueille.</div>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="C2">Compris — continuer vers le point de concentration</button>';
  }

  /* ── C3 ─────────────────────────────────────── */
  function contentC3() {
    return '<p class="ap-lesson-kicker">Bloc C — Voir</p>' +
      '<h2 class="ap-lesson-title">Le point de concentration</h2>' +

      '<div class="ap-section">' +
        '<h3>Qu\'est-ce que le point de concentration ?</h3>' +
        '<p>Le point de concentration est un point lumineux imaginé en esprit — une petite sphère de lumière, brillante, précise, que vous tenez en pensée. Contrairement à un objet fixe, il est mobile. Il va accompagner vos balancements, traverser l\'espace intérieur de votre crâne en rythme.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Comment le former</h3>' +
        '<p>Fermez les yeux. Imaginez une petite lumière blanche ou dorée, de la taille d\'une bille, à l\'intérieur de votre crâne. Ni grande ni petite — juste suffisamment présente pour être sentie autant que vue.</p>' +
        '<p>Ne forcez pas sa luminosité. Si elle semble terne au début, c\'est normal. Avec la pratique, elle devient plus vive, plus stable, plus réelle.</p>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Son rôle pendant les balancements</h3>' +
        '<ul>' +
          '<li><em>Balancement latéral (ILLI)</em> → le point traverse de tempe à tempe, de gauche à droite</li>' +
          '<li><em>Balancement vertical (ALLA)</em> → le point monte du menton vers le sommet du crâne</li>' +
          '<li><em>Balancement antéro-postérieur (ELLU)</em> → le point vient de l\'arrière du crâne vers le front, le dépassant légèrement</li>' +
        '</ul>' +
        '<div class="ap-quote">L\'objet de contemplation reste ancré — fixe dans l\'espace mental. Le point de concentration traverse cet espace en rythme. Ces deux présences simultanées créent l\'activité rythmée que nous cherchons à installer.</div>' +
      '</div>' +

      '<div class="ap-section">' +
        '<h3>Animation interactive — Choisissez une direction</h3>' +
        '<div class="ap-svgpoint-btns">' +
          '<button class="ap-svgpoint-btn active" data-dir="lateral">Latéral — ILLI</button>' +
          '<button class="ap-svgpoint-btn" data-dir="vertical">Vertical — ALLA</button>' +
          '<button class="ap-svgpoint-btn" data-dir="anteroposterieur">Antéro-post. — ELLU</button>' +
        '</div>' +
        '<div class="ap-svgpoint-container" id="svgPointContainer" style="height:260px;"></div>' +
      '</div>' +

      '<button class="ap-btn-validate" data-validate="C3">Je tiens le point — commencer les 8 jours d\'entraînement</button>';
  }

  /* ── Jours D1–D4 ────────────────────────────── */
  var JOURS_2D = {
    D1: { n: 1, forme: "Le carré",     voix: "Le carré est la forme de la stabilité, de l'ancrage, de la terre. Quatre côtés égaux, quatre angles droits. Laissez cette stabilité entrer en vous." },
    D2: { n: 2, forme: "Le triangle",  voix: "Le triangle est la forme de l'élévation, du feu, de l'aspiration vers le haut. Son sommet pointe vers le ciel. En le maintenant en pensée, vous travaillez la verticalité intérieure." },
    D3: { n: 3, forme: "Le cercle",    voix: "Le cercle n'a ni début ni fin. C'est le symbole du cycle, de l'unité — et du phosphène lui-même, qui apparaît toujours circulaire." },
    D4: { n: 4, forme: "Le rectangle", voix: "Le rectangle introduit l'asymétrie dans l'équilibre. Observez comment votre esprit réagit à cette tension entre deux dimensions différentes." }
  };

  function contentJour(id) {
    var j = JOURS_2D[id];
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Jour ' + j.n + ' — ' + j.forme + '</h2>' +
      '<div class="ap-jour-header">' +
        '<div class="ap-jour-badge">' + j.n + '</div>' +
        '<div><p style="color:var(--ap-text-dim);font-size:.9rem;margin:0;">' + j.voix + '</p></div>' +
      '</div>' +
      protocoleJour(j.n, id);
  }

  function protocoleJour(n, id) {
    return '<div class="ap-section">' +
        '<h3>Protocole — 45 minutes</h3>' +
        '<ol>' +
          '<li><strong>Phase 1 — Observation de l\'objet</strong> — 20 secondes, plein écran fond noir</li>' +
          '<li><strong>Phase 2 — Fixation lumineuse + convergence</strong> — 30 secondes</li>' +
          '<li><strong>Phase 3 — Extinction + bandeau</strong> — 15 secondes de transition</li>' +
          '<li><strong>Phase 4 — Balancement libre en tenant l\'image</strong> — cycles de 3 minutes, rappel voix off toutes les 5 minutes</li>' +
          '<li><strong>Phase 5 — Retour objet + lumière</strong> — cycles de 50 secondes, répéter jusqu\'à 45 minutes</li>' +
          '<li><strong>Phase 6 — Fin de session + bilan</strong></li>' +
        '</ol>' +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Lancer la session guidée</h3>' +
        timerWidget("timer-jour-" + id, buildJourPhases(), null) +
      '</div>' +
      '<button class="ap-btn-validate" data-validate="' + id + '">Session pratiquée — continuer</button>';
  }

  function buildJourPhases() {
    return [
      { label: "OBSERVATION", type: "neutral", instruction: "Observez votre objet — mémorisez sa forme et sa couleur.", duree: 20, voix: "Observez attentivement l'objet. Mémorisez sa forme, sa couleur, sa présence." },
      { label: "LUMIÈRE", type: "neutral", instruction: "Fixez la source lumineuse. Attention entre les sourcils.", duree: 30, voix: "Fixez la source lumineuse. Portez doucement l'attention vers le point entre vos sourcils." },
      { label: "TRANSITION", type: "neutral", instruction: "Éteignez. Mettez votre bandeau. Fermez les yeux.", duree: 15, voix: "Éteignez la lumière. Fermez les yeux. Laissez le phosphène s'installer." },
      { label: "BALANCEMENT", type: "neutral", instruction: "Balancez en tenant l'image. Mantra en pensée.", duree: 180, voix: "Commencez à balancer doucement. Tenez l'image dans l'espace intérieur. Sonnez intérieurement votre mantra." },
      { label: "RETOUR LUMIÈRE", type: "neutral", instruction: "Revenez à l'objet. Fixez à nouveau la lumière.", duree: 50, voix: "Revenez à l'objet. Fixez la source lumineuse." }
    ];
  }

  function contentJour5() {
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Jour 5 — Formes 3D</h2>' +
      '<div class="ap-section">' +
        '<h3>Cube et Pyramide</h3>' +
        '<div class="ap-quote">Vous passez aujourd\'hui à la troisième dimension. L\'objet a maintenant un volume, une profondeur, une présence dans l\'espace. Votre cerveau doit tenir une information plus riche. Laissez l\'objet tourner légèrement en pensée — donnez-lui une présence.</div>' +
      '</div>' +
      protocoleJour(5, "D5");
  }

  function contentJour6() {
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Jour 6 — Les végétaux</h2>' +
      '<div class="ap-section">' +
        '<h3>Images organiques</h3>' +
        '<div class="ap-quote">Les végétaux ont un lien particulier et profond avec la conscience humaine. Ils déclenchent des perceptions riches et diversifiées. Contrairement aux formes géométriques, un végétal est vivant — organique, asymétrique, changeant. Laissez-vous surprendre.</div>' +
      '</div>' +
      protocoleJour(6, "D6");
  }

  function contentJour7() {
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Jour 7 — Les arbres</h2>' +
      '<div class="ap-section">' +
        '<h3>L\'axe du monde</h3>' +
        '<div class="ap-quote">L\'arbre est l\'axe du monde dans toutes les traditions. Racines en bas, branches en haut — comme l\'être humain debout entre terre et ciel. Certains pratiquants obtiennent leurs premiers contacts avec des guides intérieurs en passant par l\'image d\'un arbre. Prenez le temps d\'entrer en relation avec lui.</div>' +
      '</div>' +
      protocoleJour(7, "D7");
  }

  function contentJour8() {
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Jour 8 — Le point de concentration</h2>' +
      '<div class="ap-section">' +
        '<h3>La double présence</h3>' +
        '<div class="ap-quote">Aujourd\'hui vous unifiez tout ce que vous avez appris. L\'objet est votre ancre — fixe, stable, lumineux. Le point de concentration est votre explorateur — il traverse l\'espace intérieur en rythme avec votre corps. Ne cherchez pas à contrôler. Laissez les deux présences coexister naturellement.</div>' +
        '<p>Protocole :</p>' +
        '<ol>' +
          '<li>Choisissez votre objet favori parmi tous ceux travaillés</li>' +
          '<li>Observation objet — 20 secondes</li>' +
          '<li>Fixation lumineuse + convergence — 30 secondes</li>' +
          '<li>Extinction + bandeau</li>' +
          '<li>Balancement avec double présence : objet ancré fixe + point de concentration qui traverse</li>' +
          '<li>Retour cycle lumière/objet toutes les 3 minutes</li>' +
        '</ol>' +
      '</div>' +
      timerWidget("timer-d8", [
        { label: "OBSERVATION", type: "neutral", instruction: "Observez votre objet favori.", duree: 20, voix: "Observez attentivement votre objet. Ancrez-le en vous." },
        { label: "LUMIÈRE + CONVERGENCE", type: "neutral", instruction: "Fixez la lumière. Convergence douce.", duree: 30, voix: "Fixez la source lumineuse. Convergence vers le point entre les sourcils." },
        { label: "TRANSITION", type: "neutral", instruction: "Éteignez. Bandeau. Yeux fermés.", duree: 15, voix: "Éteignez. Bandeau. Fermez les yeux." },
        { label: "DOUBLE PRÉSENCE", type: "pensee", instruction: "Objet ancré fixe + point traversant en rythme.", duree: 180, voix: "Balancez maintenant. L'objet reste fixe et lumineux dans votre espace intérieur. Le point de concentration traverse de côté en côté, en rythme avec votre corps. Les deux présences simultanées — accueillez-les." }
      ], null) +
      '<div class="ap-msg info" style="margin-top:16px;">Après avoir complété cette session, les Exercices 43, 44 et 45 ainsi que le Générateur de séance seront déverrouillés.</div>' +
      '<button class="ap-btn-validate" data-validate="D8">Session Jour 8 pratiquée — déverrouiller la suite</button>';
  }

  /* ── Exercices 43 / 44 / 45 ─────────────────── */
  var EXERCICES = {
    43: {
      titre: "Balancement latéral",
      mantra: "ILLI",
      dir: "lateral",
      dirLabel: "Tempe gauche → Tempe droite",
      intro: "Le balancement latéral — gauche-droite — favorise le recentrage, l'alternance hémisphérique, la stabilisation de l'attention. Il est le premier balancement parce qu'il est le plus naturel, le plus proche du mouvement spontané de l'enfant sur une balançoire.\n\nSon mantra est ILLI. La langue frappe deux fois le palais, en écho au rythme binaire du mouvement.\n\nDirection de l'objet dans le crâne : grand balancement → de tempe à tempe. Petit balancement → l'objet reste confiné à l'intérieur du crâne."
    },
    44: {
      titre: "Balancement vertical",
      mantra: "ALLA",
      dir: "vertical",
      dirLabel: "Menton → Sommet de la tête",
      intro: "Le balancement vertical — haut-bas — travaille l'axe et la verticalité intérieure. Il est plus subtil que le latéral. Il réveille le sentiment d'alignement entre la terre et le ciel.\n\nSon mantra est ALLA. Le A ouvert évoque la verticalité, l'axe.\n\nDirection de l'objet : grand balancement → du menton vers le sommet de la tête. Petit balancement → confiné à l'intérieur."
    },
    45: {
      titre: "Balancement antéro-postérieur",
      mantra: "ELLU",
      dir: "anteroposterieur",
      dirLabel: "Arrière du crâne → Front (légèrement dépassé)",
      intro: "Le balancement antéro-postérieur — avant-arrière — active le gyroscope intérieur. Il crée une profondeur de perception différente des deux premiers. C'est le mouvement de la prière dans de nombreuses traditions.\n\nSon mantra est ELLU. Le son se déplace de l'avant vers l'arrière de la bouche, comme la direction du mouvement.\n\nDirection de l'objet : grand balancement → de l'arrière du crâne vers le front, le dépassant légèrement."
    }
  };

  function contentEx(n) {
    var ex = EXERCICES[n];
    var exId = "EX" + n;
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Exercice ' + n + ' — ' + ex.titre + '</h2>' +
      '<div class="ap-exercice-intro">' +
        '<div class="ap-exercice-mantra">' + ex.mantra + '</div>' +
        '<div class="ap-exercice-direction">' + ex.dirLabel + '</div>' +
        ex.intro.split("\n\n").map(function (p) { return '<p>' + p + '</p>'; }).join("") +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Animation du point de concentration</h3>' +
        '<div class="ap-svgpoint-container" id="svgExContainer' + n + '" style="height:260px;"></div>' +
      '</div>' +
      '<div class="ap-section">' +
        '<h3>Session guidée</h3>' +
        timerWidget("timer-ex" + n, buildExPhases(ex.mantra, ex.titre), null) +
      '</div>' +
      '<button class="ap-btn-validate" data-validate="' + exId + '" data-practice="' + exId + '">Session pratiquée — enregistrer</button>';
  }

  function buildExPhases(mantra, titre) {
    return [
      { label: "DÉTENTE", type: "neutral", instruction: "Installez-vous. Fixez la source lumineuse.", duree: 180, voix: "Installez-vous confortablement. Fixez la source lumineuse pendant trois minutes. Laissez l'intention de cette session s'installer." },
      { label: "OBSERVATION OBJET", type: "neutral", instruction: "Observez votre objet — mémorisez-le.", duree: 20, voix: "Observez votre objet. Mémorisez-le précisément." },
      { label: "LUMIÈRE", type: "neutral", instruction: "Fixez la lumière. Convergence douce.", duree: 30, voix: "Fixez la lumière. Convergence douce vers le front." },
      { label: "GRAND BALANCEMENT", type: "neutral", instruction: "Grand balancement. Mantra " + mantra + ". Objet qui traverse.", duree: 180, voix: "Commencez le grand balancement. Mantra " + mantra + " en pensée. L'objet traverse de part en part, en rythme avec votre corps." },
      { label: "PETIT BALANCEMENT", type: "neutral", instruction: "Réduisez l'amplitude. Objet confiné à l'intérieur.", duree: 120, voix: "Réduisez l'amplitude. Petit balancement. L'objet reste confiné à l'intérieur du crâne." },
      { label: "RETOUR LUMIÈRE", type: "neutral", instruction: "Revenez à la lumière. Cycles répétés.", duree: 50, voix: "Revenez à la lumière. Rechargez l'image." }
    ];
  }

  /* ── Générateur de séance ────────────────────── */
  function contentGenerateur() {
    return '<p class="ap-lesson-kicker">Bloc D — Bouger</p>' +
      '<h2 class="ap-lesson-title">Générateur de séance personnalisée</h2>' +
      '<p style="color:var(--ap-text-dim);margin-bottom:24px;">Créez une session guidée complète adaptée à votre niveau de progression.</p>' +

      '<div class="ap-gen-card">' +
        '<h3>Paramètres de la séance</h3>' +

        '<div class="ap-gen-field">' +
          '<label class="ap-gen-label">Type de balancement</label>' +
          '<div class="ap-gen-options" id="genSwing">' +
            '<button class="ap-gen-opt selected" data-val="lateral">Latéral — ILLI</button>' +
            '<button class="ap-gen-opt" data-val="vertical" id="genSwingV">Vertical — ALLA</button>' +
            '<button class="ap-gen-opt" data-val="anteroposterieur" id="genSwingA">Antéro-post. — ELLU</button>' +
          '</div>' +
        '</div>' +

        '<div class="ap-gen-field">' +
          '<label class="ap-gen-label">Durée active des balancements</label>' +
          '<div class="ap-gen-options" id="genDuree">' +
            '<button class="ap-gen-opt" data-val="15">15 min</button>' +
            '<button class="ap-gen-opt selected" data-val="20">20 min</button>' +
            '<button class="ap-gen-opt" data-val="30">30 min</button>' +
            '<button class="ap-gen-opt" data-val="45">45 min</button>' +
          '</div>' +
        '</div>' +

        '<div class="ap-gen-field">' +
          '<label class="ap-gen-label">Respiration après les balancements ?</label>' +
          '<div class="ap-gen-options" id="genBreath">' +
            '<button class="ap-gen-opt" data-val="square">Carrée</button>' +
            '<button class="ap-gen-opt" data-val="triangular">Triangulaire</button>' +
            '<button class="ap-gen-opt selected" data-val="none">Aucune</button>' +
          '</div>' +
        '</div>' +

        '<div class="ap-gen-field">' +
          '<label class="ap-gen-label">Exercice final</label>' +
          '<div class="ap-gen-options" id="genFinal">' +
            '<button class="ap-gen-opt" data-val="tensions">Tensions statiques</button>' +
            '<button class="ap-gen-opt" data-val="rotor">Rotor optique</button>' +
            '<button class="ap-gen-opt selected" data-val="none">Aucun</button>' +
          '</div>' +
        '</div>' +

        '<button id="genLancer" class="ap-btn primary" style="width:100%;margin-top:8px;font-size:1rem;padding:16px;">Générer et démarrer la séance</button>' +
      '</div>' +

      '<div id="genSession" style="display:none;margin-top:24px;">' +
        timerWidget("timer-gen", [], null) +
      '</div>' +

      '<div id="genBilan" style="display:none;margin-top:24px;">' +
        renderBilan() +
      '</div>';
  }

  function renderBilan() {
    return '<div class="ap-bilan-card">' +
      '<h2>Session terminée</h2>' +
      '<div class="ap-bilan-question">' +
        '<p>L\'image était-elle stable ?</p>' +
        '<div class="ap-bilan-opts">' +
          '<button class="ap-bilan-opt" data-q="image" data-v="stable">Très stable</button>' +
          '<button class="ap-bilan-opt" data-q="image" data-v="assez">Assez stable</button>' +
          '<button class="ap-bilan-opt" data-q="image" data-v="instable">Instable</button>' +
        '</div>' +
      '</div>' +
      '<div class="ap-bilan-question">' +
        '<p>Avez-vous ressenti des sensations ?</p>' +
        '<div class="ap-bilan-opts">' +
          '<button class="ap-bilan-opt" data-q="sens" data-v="claires">Oui, claires</button>' +
          '<button class="ap-bilan-opt" data-q="sens" data-v="legeres">Légères</button>' +
          '<button class="ap-bilan-opt" data-q="sens" data-v="aucune">Aucune</button>' +
        '</div>' +
      '</div>' +
      '<div class="ap-bilan-question">' +
        '<p>Le mantra était-il présent ?</p>' +
        '<div class="ap-bilan-opts">' +
          '<button class="ap-bilan-opt" data-q="mantra" data-v="naturel">Naturellement</button>' +
          '<button class="ap-bilan-opt" data-q="mantra" data-v="effort">Avec effort</button>' +
          '<button class="ap-bilan-opt" data-q="mantra" data-v="oublie">Oublié</button>' +
        '</div>' +
      '</div>' +
      '<textarea class="ap-bilan-note" placeholder="Notes libres…" rows="3"></textarea>' +
      '<div class="ap-bilan-actions">' +
        '<button id="bilanSauvegarder" class="ap-btn primary">Sauvegarder</button>' +
        '<a href="vertus.html" class="ap-btn secondary">Tirer une vertu</a>' +
      '</div>' +
    '</div>';
  }

  /* ─── Widget timer HTML ───────────────────────── */
  function timerWidget(id, phases, validateLabel) {
    return '<div class="ap-timer-widget" id="' + id + '">' +
      '<div class="ap-timer-phase">Prêt</div>' +
      '<div class="ap-timer-body" style="min-height:2em;"> </div>' +
      '<div class="ap-timer-countdown">—</div>' +
      '<div class="ap-timer-bar-wrap"><div class="ap-timer-bar"></div></div>' +
      '<div class="ap-timer-actions">' +
        '<button class="ap-btn primary" data-timer="start" data-id="' + id + '" data-phases=\'' + JSON.stringify(phases) + '\'>▶ Démarrer</button>' +
        '<button class="ap-btn ghost" data-timer="stop" data-id="' + id + '">■ Arrêter</button>' +
        (validateLabel ? '<button class="ap-btn secondary" data-timer="skip" data-id="' + id + '">' + validateLabel + '</button>' : '') +
      '</div>' +
    '</div>';
  }

  /* ─── Calcul progression ──────────────────────── */
  function calcPercent(prog) {
    var total = STRUCTURE.length;
    var done = (prog.done || []).length;
    return Math.round(done / total * 100);
  }

  /* ─── Rendu timeline ──────────────────────────── */
  function renderTimeline(prog, activeId) {
    var unlocked = unlockedIds(prog);
    var done = prog.done || [];
    var html = "";
    var lastBloc = null;

    STRUCTURE.forEach(function (item) {
      if (item.blocLabel) {
        html += '<div class="ap-bloc-header">' + item.blocLabel + '</div>';
        lastBloc = item.bloc;
      }

      var isDone   = done.indexOf(item.id) >= 0;
      var isLocked = unlocked.indexOf(item.id) < 0;
      var isActive = item.id === activeId;

      var cls = "ap-timeline-item";
      if (isActive) cls += " ap-active";
      if (isDone)   cls += " ap-done";
      if (isLocked) cls += " ap-locked";

      var dot = '<span class="ap-tl-dot"></span>';
      var lock = isLocked ? ' <span class="ap-tl-lock">🔒</span>' : (isDone ? ' <span style="color:var(--ap-green);font-size:.72rem;">✓</span>' : '');

      html += '<div class="' + cls + '" data-lessonid="' + item.id + '">' +
        dot + item.label + lock +
      '</div>';
    });

    return html;
  }

  /* ─── Render page ─────────────────────────────── */
  function render(prog, activeId) {
    var timelineEl = document.getElementById("apTimeline");
    var contentEl  = document.getElementById("apContent");
    var barEl      = document.getElementById("apProgressBar");
    var pctEl      = document.getElementById("apProgressPct");

    if (timelineEl) timelineEl.innerHTML = renderTimeline(prog, activeId);
    if (contentEl)  contentEl.innerHTML  = renderLecon(activeId);
    if (barEl)      barEl.style.width    = calcPercent(prog) + "%";
    if (pctEl)      pctEl.textContent    = calcPercent(prog) + "% complété";

    bindContentEvents(prog, activeId);
    bindTimelineEvents(prog);
  }

  /* ─── Bind événements contenu ─────────────────── */
  function bindContentEvents(prog, activeId) {
    // Validation boutons
    document.querySelectorAll("[data-validate]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-validate");
        if ((prog.done || []).indexOf(id) < 0) {
          prog.done = prog.done || [];
          prog.done.push(id);
        }
        // Practice count
        var prac = btn.getAttribute("data-practice");
        if (prac) {
          prog.practiced = prog.practiced || {};
          prog.practiced[prac] = (prog.practiced[prac] || 0) + 1;
        }
        // Jour 8 unlock
        if (id === "D8") {
          prog.practiced = prog.practiced || {};
          if ((prog.practiced["EX43"] || 0) === 0) prog.practiced["EX43"] = 0;
        }
        sauvegarder(prog);
        // Navigate to next
        var idx = STRUCTURE.findIndex(function (s) { return s.id === id; });
        var next = STRUCTURE[idx + 1];
        var unlocked = unlockedIds(prog);
        if (next && unlocked.indexOf(next.id) >= 0) {
          prog.current = next.id;
          sauvegarder(prog);
          render(prog, next.id);
        } else {
          render(prog, activeId);
        }
        window.scrollTo(0, 0);
        speak("Leçon validée. Bien joué.");
      });
    });

    // Timers
    var activeTimers = {};
    document.querySelectorAll("[data-timer='start']").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        var phasesRaw = btn.getAttribute("data-phases");
        var phases;
        try { phases = JSON.parse(phasesRaw); } catch (_) { phases = []; }
        if (!phases.length) return;
        if (activeTimers[id]) activeTimers[id].arreter();
        activeTimers[id] = new TimerExercice(phases, id, function () {
          var phEl = document.querySelector("#" + id + " .ap-timer-phase");
          if (phEl) phEl.textContent = "Terminé ✓";
          var cdEl = document.querySelector("#" + id + " .ap-timer-countdown");
          if (cdEl) cdEl.textContent = "✓";
          speak("Exercice terminé.");
          // Show bilan if generateur
          if (id === "timer-gen") {
            var g = document.getElementById("genBilan");
            if (g) g.style.display = "block";
          }
        });
        activeTimers[id].demarrer();
        btn.disabled = true;
      });
    });

    document.querySelectorAll("[data-timer='stop']").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        if (activeTimers[id]) activeTimers[id].arreter();
        var startBtn = document.querySelector("[data-timer='start'][data-id='" + id + "']");
        if (startBtn) startBtn.disabled = false;
      });
    });

    // SVG point animation C3
    document.querySelectorAll(".ap-svgpoint-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".ap-svgpoint-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        creerSVGPoint(btn.getAttribute("data-dir"), "svgPointContainer");
      });
    });
    // Init SVG pour C3
    if (activeId === "C3") {
      setTimeout(function () { creerSVGPoint("lateral", "svgPointContainer"); }, 100);
    }
    // Init SVG pour exercices
    [43, 44, 45].forEach(function (n) {
      if (activeId === "EX" + n) {
        var dir = EXERCICES[n].dir;
        setTimeout(function () { creerSVGPoint(dir, "svgExContainer" + n); }, 100);
      }
    });

    // Sensations grid A1
    document.querySelectorAll(".ap-sensation-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        chip.classList.toggle("checked");
        updateSensMsg();
      });
    });

    // Générateur
    bindGenEvents(prog);

    // Bilan opts
    document.querySelectorAll(".ap-bilan-opt").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var q = btn.getAttribute("data-q");
        document.querySelectorAll(".ap-bilan-opt[data-q='" + q + "']").forEach(function (b) { b.classList.remove("selected"); });
        btn.classList.add("selected");
      });
    });

    var bilanBtn = document.getElementById("bilanSauvegarder");
    if (bilanBtn) {
      bilanBtn.addEventListener("click", function () {
        var entry = { date: new Date().toISOString(), reponses: {} };
        document.querySelectorAll(".ap-bilan-opt.selected").forEach(function (b) {
          entry.reponses[b.getAttribute("data-q")] = b.getAttribute("data-v");
        });
        var note = document.querySelector(".ap-bilan-note");
        if (note) entry.note = note.value;
        prog.journal = prog.journal || [];
        prog.journal.push(entry);
        sauvegarder(prog);
        bilanBtn.textContent = "Sauvegardé ✓";
        bilanBtn.disabled = true;
        speak("Journal sauvegardé.");
      });
    }
  }

  function updateSensMsg() {
    var checked = [];
    document.querySelectorAll(".ap-sensation-chip.checked").forEach(function (c) {
      checked.push(c.getAttribute("data-id"));
    });
    var msg = document.getElementById("sensMsg");
    if (!msg) return;
    if (!checked.length) { msg.classList.remove("visible"); return; }
    msg.classList.add("visible");
    if (checked.indexOf("rien") >= 0) {
      msg.textContent = "C\'est parfaitement normal au début. Le canal sensoriel interne est comme un muscle — il s\'ouvre progressivement avec la pratique régulière. Continuez sans attente.";
    } else if (checked.length >= 3) {
      msg.textContent = "Excellent — vous percevez déjà plusieurs types de sensations. Votre canal sensoriel interne est actif. Continuez à les observer sans chercher à les reproduire.";
    } else {
      msg.textContent = "Bonne sensibilité naissante. Ces premières perceptions sont les signaux d\'un canal qui s\'ouvre. Notez-les dans votre journal après chaque pratique.";
    }
  }

  function bindGenEvents(prog) {
    // Options sélecteur
    ["genSwing", "genDuree", "genBreath", "genFinal"].forEach(function (groupId) {
      var group = document.getElementById(groupId);
      if (!group) return;
      group.querySelectorAll(".ap-gen-opt").forEach(function (btn) {
        btn.addEventListener("click", function () {
          group.querySelectorAll(".ap-gen-opt").forEach(function (b) { b.classList.remove("selected"); });
          btn.classList.add("selected");
        });
      });
    });

    // Griser swings non débloqués
    var unlocked = unlockedIds(prog);
    var swV = document.getElementById("genSwingV");
    var swA = document.getElementById("genSwingA");
    if (swV && unlocked.indexOf("EX44") < 0) { swV.disabled = true; swV.title = "Déverrouillez l'exercice 44 d'abord"; }
    if (swA && unlocked.indexOf("EX45") < 0) { swA.disabled = true; swA.title = "Déverrouillez l'exercice 45 d'abord"; }

    var lancer = document.getElementById("genLancer");
    if (!lancer) return;
    lancer.addEventListener("click", function () {
      var swing = (document.querySelector("#genSwing .ap-gen-opt.selected") || {}).dataset || {};
      var dureeMin = parseInt((document.querySelector("#genDuree .ap-gen-opt.selected") || {dataset:{val:"20"}}).dataset.val) || 20;
      var phases = buildGenPhases(swing.val || "lateral", dureeMin);

      var timerWidget = document.getElementById("timer-gen");
      if (!timerWidget) return;
      // Update phases on start button
      var startBtn = timerWidget.querySelector("[data-timer='start']");
      if (startBtn) startBtn.setAttribute("data-phases", JSON.stringify(phases));

      var genSession = document.getElementById("genSession");
      if (genSession) genSession.style.display = "block";
      lancer.style.display = "none";
      window.scrollTo(0, genSession ? genSession.offsetTop - 80 : 0);
    });
  }

  function buildGenPhases(swingDir, dureeMin) {
    var mantraMap = { lateral: "ILLI", vertical: "ALLA", anteroposterieur: "ELLU" };
    var mantra = mantraMap[swingDir] || "ILLI";
    var swingSeconds = dureeMin * 60;
    var cycles = Math.floor(swingSeconds / 230); // ~3min50 par cycle
    var phases = [
      { label: "DÉTENTE INITIALE", type: "neutral", instruction: "Installez-vous. Fixez la source lumineuse.", duree: 180, voix: "Installez-vous confortablement. Fixez la source lumineuse pendant trois minutes. Laissez votre intention s'installer." }
    ];
    for (var i = 0; i < Math.max(1, cycles); i++) {
      phases.push({ label: "OBSERVATION", type: "neutral", instruction: "Observez votre objet.", duree: 20, voix: i === 0 ? "Observez votre objet. Mémorisez-le." : "Revenez à votre objet." });
      phases.push({ label: "LUMIÈRE", type: "neutral", instruction: "Fixez la lumière — convergence.", duree: 30, voix: "Fixez la source lumineuse. Convergence douce." });
      phases.push({ label: "TRANSITION", type: "neutral", instruction: "Éteignez. Yeux fermés.", duree: 15, voix: "Éteignez la lumière. Fermez les yeux." });
      phases.push({ label: "BALANCEMENT " + mantra, type: "neutral", instruction: "Balancez — " + mantra + " — objet qui traverse.", duree: 165, voix: "Commencez à balancer. " + mantra + " intérieurement. Laissez l'objet traverser en rythme." });
    }
    return phases;
  }

  /* ─── Bind timeline ───────────────────────────── */
  function bindTimelineEvents(prog) {
    var unlocked = unlockedIds(prog);
    document.querySelectorAll(".ap-timeline-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var id = item.getAttribute("data-lessonid");
        if (!id || unlocked.indexOf(id) < 0) return;
        prog.current = id;
        sauvegarder(prog);
        render(prog, id);
        window.scrollTo(0, 0);
      });
    });
  }

  /* ─── Init ────────────────────────────────────── */
  function init() {
    var prog = charger();
    var activeId = prog.current || "A1";
    // Make sure current is unlocked
    var unlocked = unlockedIds(prog);
    if (unlocked.indexOf(activeId) < 0) activeId = unlocked[unlocked.length - 1] || "A1";
    render(prog, activeId);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();
