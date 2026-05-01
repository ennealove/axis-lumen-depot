(() => {
  "use strict";

  const PATHS = [
    { id: "all", title: "Tous les cours", subtitle: "Les 72 portes de l’école" },
    { id: "fondation", title: "Fondation — JE SUIS", subtitle: "Centre, temple vivant, purification" },
    { id: "terrain", title: "Terrain vivant", subtitle: "Eau, émonctoires, rH², rythme" },
    { id: "vertus", title: "Vertus", subtitle: "Tirage, lumière, imprégnation" },
    { id: "exercices", title: "Livre d’Exercices", subtitle: "Socle, lumière, souffle, mouvement" },
    { id: "seances", title: "Séances guidées", subtitle: "Formats prêts à pratiquer" }
  ];

  const RAW_COURSES = [
    ["fondation", "Masterclass 1 — Préparer le temple de pratique", "Séance longue : lieu, corps, souffle, eau, intention, carnet. Le cours pose le seuil avant tout exercice.", "contemplation", "creer-seance.html", "Je prépare le lieu. Je respecte mon corps. Je choisis une intention claire.", 45, "cours_01_preparer_temple.png", 1],
    ["fondation", "Masterclass 2 — Observer la source lumineuse avec prudence", "Séance longue : regard souple, lampe douce, 20 à 30 secondes, sécurité visuelle, passage vers l’intérieur.", "light", "oscillation.html", "Je regarde sans forcer. Je reçois sans prendre. Je respecte mon regard.", 45, "cours_02_observer_source_lumineuse.png", 2],
    ["fondation", "Masterclass 3 — Accueillir la rémanence lumineuse", "Séance longue : fermer les yeux, accueillir la trace, ne pas fabriquer, déposer une phrase dans la lumière.", "light", "oscillation.html", "Je reçois la trace lumineuse et je laisse la lumière devenir intérieure.", 45, "cours_03_accueillir_remanence.png", 3],
    ["fondation", "Masterclass 4 — Stabiliser le point intérieur", "Séance longue : front, cœur, ventre, colonne ou mains. Choisir un seul lieu et y déposer la lumière.", "contemplation", "pratiquer.html", "Je reviens au point. Je ne force pas la lumière. Je demeure au centre.", 40, "cours_04_stabiliser_point_interieur.png", 8],
    ["fondation", "Masterclass 5 — Tenir le carnet d’expérience", "Séance longue : date, état du corps, lumière, rémanence, sensation, phrase reçue et ajustement.", "contemplation", "apprendre.html", "Je note ce qui est réel. Je n’ajoute pas. Je ne retire pas.", 35, "cours_05_tenir_carnet.png", 3],
    ["fondation", "Masterclass 6 — Clore une séance", "Séance longue : revenir au corps, déposer la lumière, retrouver le souffle naturel et intégrer sans brusquer.", "contemplation", "pratiquer.html", "Je reviens dans mon corps. Je garde le fruit de l’exercice. La séance est close.", 35, "cours_06_clore_seance.png", 1],
    ["fondation", "Masterclass 7 — Présence, carte et lumière", "Séance complète : tirer une vertu, lire la carte, observer la lumière, infuser dans la rémanence, écrire le geste du jour.", "virtue", "vertus.html?card=1", "Je suis là, entièrement. La présence devient la première porte.", 60, "cours_07_seance_presence.png", 1],
    ["fondation", "Masterclass 8 — Vertu dans la lumière", "Séance complète : la vertu devient mot, puis climat, puis sensation, puis action concrète.", "virtue", "vertus.html", "Je laisse la vertu descendre dans la lumière et s’incarner dans un geste simple.", 45, "cours_08_vertu_dans_lumiere.png", 8],

    ["terrain", "La table n’est pas une religion", "Chercher la justesse, pas la supériorité", "terrain", "creer-seance.html", "Je cherche la clarté, pas la perfection."],
    ["terrain", "L’eau conductrice", "Hydratation, minéraux et présence", "terrain", "creer-seance.html", "Je prépare l’eau du corps à porter la pratique."],
    ["terrain", "Intestins — porte du discernement", "Accueillir, trier, laisser partir", "terrain", "creer-seance.html", "Je laisse sortir ce qui n’a plus lieu de rester."],
    ["terrain", "Reins — fluidité et réserve", "L’eau, la mesure et la profondeur", "terrain", "creer-seance.html", "Je choisis la fluidité plutôt que la surcharge."],
    ["terrain", "Foie — atelier de transformation", "Ne pas subir ce qui entre", "terrain", "creer-seance.html", "Je transforme sans accumuler."],
    ["terrain", "Lymphe — circulation lente", "Mouvement doux et patience du vivant", "terrain", "creer-seance.html", "Je remets en mouvement sans brutalité."],
    ["terrain", "Intervalle alimentaire", "Le temps sans manger comme silence", "terrain", "creer-seance.html", "Je donne au corps un espace pour trier."],
    ["terrain", "rH² — boussole du vivant", "Orientation, fraîcheur et conductivité", "terrain", "creer-seance.html", "Je choisis ce qui clarifie le terrain."],

    ["vertus", "Tirer une vertu", "Une seule qualité pour une séance", "virtue", "creer-seance.html", "Je laisse une vertu m’orienter aujourd’hui."],
    ["vertus", "Lire sans saisir", "Laisser les mots devenir climat", "virtue", "creer-seance.html", "Je lis lentement et je cesse de forcer le sens."],
    ["vertus", "Lumière et imprégnation", "Observer, fermer les yeux, recevoir", "light", "oscillation.html", "Je laisse la vertu descendre dans la lumière."],
    ["vertus", "La vertu dans la rémanence", "Déposer la qualité dans l’empreinte lumineuse", "virtue", "oscillation.html", "Je place la vertu dans l’espace lumineux intérieur."],
    ["vertus", "Cycle trois à quatre passages", "Répéter sans mécanique", "light", "oscillation.html", "Je répète avec présence, pas avec tension."],
    ["vertus", "Carnet de vertu", "Noter ce qui se dépose", "virtue", "apprendre.html", "Je garde une trace sincère de la qualité travaillée."],
    ["vertus", "Vertu du jour en action", "Porter la qualité dans le réel", "virtue", "pratiquer.html", "J’incarne la vertu dans un geste concret."],
    ["vertus", "Transmettre sans parler", "Rayonner par la tenue intérieure", "virtue", "creer-seance.html", "Je laisse la qualité parler par ma présence."],

    ["exercices", "Préparer le lieu intérieur", "Premier seuil du Livre d’Exercices", "contemplation", "creer-seance.html", "Je prépare le lieu extérieur et le lieu intérieur."],
    ["exercices", "Observer la source avec prudence", "Regard souple, mesure, respect des yeux", "light", "oscillation.html", "Je regarde sans dureté et je respecte mon regard."],
    ["exercices", "Accueillir la rémanence", "Recevoir la trace sans impatience", "light", "oscillation.html", "J’accueille ce qui reste de la lumière."],
    ["exercices", "Stabiliser le point intérieur", "Demeurer avec une clarté simple", "contemplation", "pratiquer.html", "Je reste avec un point intérieur simple."],
    ["exercices", "Tenir le carnet d’expérience", "Ne pas oublier, ne pas inventer", "contemplation", "apprendre.html", "J’écris juste ce qui a été vécu."],
    ["exercices", "Clore une séance", "Ramener, déposer, revenir", "contemplation", "pratiquer.html", "Je termine sans casser l’état obtenu."],
    ["exercices", "Le point fixe", "Une borne pour l’attention", "contemplation", "pratiquer.html", "Je stabilise mon regard et ma pensée."],
    ["exercices", "Objet puis lumière", "Le cycle de base en deux temps", "light", "oscillation.html", "J’observe l’objet puis je reçois la lumière."],
    ["exercices", "Mixage pensée-lumière", "La pensée dans la trace lumineuse", "light", "oscillation.html", "Je mêle une intention simple à la rémanence."],
    ["exercices", "Grand mouvement, petit mouvement", "Amplitude et intériorisation", "swing", "oscillation.html", "Je passe du geste visible au mouvement intérieur."],
    ["exercices", "Balancement latéral", "Gauche, droite, cadence et axe", "swing", "oscillation.html", "Je retrouve une alternance régulière."],
    ["exercices", "Balancement vertical", "Haut, bas, axe et respiration", "swing", "oscillation.html", "Je relie la terre, le corps et le haut."],
    ["exercices", "Balancement en huit", "Fluidifier sans se disperser", "swing", "oscillation.html", "Je laisse le mouvement dessiner une continuité."],
    ["exercices", "Balancement en croix", "Horizontal, vertical, centre", "swing", "oscillation.html", "Je rassemble les axes autour du centre."],
    ["exercices", "Rotation douce du corps", "Tourner sans chercher le vertige", "swing", "oscillation.html", "Je tourne avec mesure et stabilité."],
    ["exercices", "Fer à cheval", "Arc arrière et perception du crâne", "swing", "oscillation.html", "Je sens l’arrière de la tête comme un espace vivant."],
    ["exercices", "Rythme deux secondes", "La cadence qui rassemble", "swing", "oscillation.html", "Je laisse le rythme devenir tuteur de l’attention."],
    ["exercices", "Mantra ILLI", "Support sonore du latéral", "swing", "oscillation.html", "Je soutiens le mouvement par un son simple."],
    ["exercices", "Mantra ALLA", "Support sonore de l’axe vertical", "swing", "oscillation.html", "Je laisse le son porter la verticalité."],
    ["exercices", "Mantra OLLO", "Avant, arrière, profondeur", "swing", "oscillation.html", "Je donne au mouvement une profondeur calme."],
    ["exercices", "Mantra RORO", "Rotation, cercle et continuité", "swing", "oscillation.html", "Je tourne autour du centre sans le quitter."],
    ["exercices", "Respiration naturelle", "Observer avant de corriger", "breath", "respiration.html", "Je retrouve le souffle avant toute technique."],
    ["exercices", "Respiration carrée", "Inspire, retiens, expire, retiens", "breath", "respiration.html", "Je construis une mesure respiratoire stable."],
    ["exercices", "Respiration triangulaire", "Trois temps pour simplifier", "breath", "respiration.html", "Je respire en triangle avec douceur."],
    ["exercices", "Respiration rectangulaire", "Allonger sans contraindre", "breath", "respiration.html", "J’allonge le souffle sans le durcir."],
    ["exercices", "Rétention juste", "Garder sans bloquer", "breath", "respiration.html", "Je retiens avec mesure, jamais avec violence."],
    ["exercices", "Ondulation du souffle", "Respirer comme une vague", "breath", "respiration.html", "Je laisse le souffle circuler en onde."],
    ["exercices", "Rotor optique — objet seul", "Voir l’objet avant la rotation", "rotor", "rotor-optique.html", "Je fixe l’objet avec calme avant le mouvement."],
    ["exercices", "Rotor optique — lumière seule", "Installer le centre lumineux", "rotor", "rotor-optique.html", "Je laisse la lumière devenir centre."],
    ["exercices", "Rotor optique — bout de pale", "L’objet voyage avec la pale", "rotor", "rotor-optique.html", "Je suis l’objet fixé au bord du rotor."],
    ["exercices", "Rotor optique — sens horaire", "Rotation expansive et tenue du regard", "rotor", "rotor-optique.html", "Je garde l’axe dans le mouvement horaire."],
    ["exercices", "Rotor optique — sens antihoraire", "Rotation inverse et retour au centre", "rotor", "rotor-optique.html", "Je garde l’axe dans le mouvement inverse."],
    ["exercices", "Tension statique — contracter", "Monter la force sans crispation", "tension", "tensions-statiques.html", "Je contracte avec précision, pas avec colère."],
    ["exercices", "Tension statique — maintenir", "Tenir le signal", "tension", "tensions-statiques.html", "Je maintiens sans perdre le souffle."],
    ["exercices", "Tension statique — relâcher", "Libérer et observer", "tension", "tensions-statiques.html", "Je relâche et je sens ce qui circule."],
    ["exercices", "Intégrer debout", "Revenir au corps vertical", "contemplation", "pratiquer.html", "Je ramène la pratique dans la station debout."],

    ["seances", "Séance 7 minutes — seuil", "Format ultra-court de retour à soi", "session", "creer-seance.html", "Je pratique peu, mais clairement."],
    ["seances", "Séance 12 minutes — vertu", "Tirage, lumière, imprégnation", "session", "creer-seance.html", "Je laisse une vertu devenir présence."],
    ["seances", "Séance 15 minutes — lumière", "Objet, lumière, rémanence", "session", "creer-seance.html", "Je donne quinze minutes à la lumière intérieure."],
    ["seances", "Séance 20 minutes — terrain", "Préparer le corps avant l’exercice", "session", "creer-seance.html", "Je prépare le terrain avant de pratiquer."],
    ["seances", "Séance 24 minutes — respiration", "Souffle, rythme et intégration", "session", "respiration.html", "Je construis la séance autour du souffle."],
    ["seances", "Séance 30 minutes — balancements", "Rythme, mantra et mouvement", "session", "oscillation.html", "Je laisse le mouvement ordonner la pensée."],
    ["seances", "Séance rotor optique", "Objet, lumière, rotation", "session", "rotor-optique.html", "Je traverse le rotor sans quitter le centre."],
    ["seances", "Séance purification douce", "Retrait, souffle et clarté", "session", "creer-seance.html", "Je purifie sans dureté."],
    ["seances", "Séance clarté mentale", "Point fixe et carnet", "session", "pratiquer.html", "Je clarifie sans m’agiter."],
    ["seances", "Séance ancrage et corps", "Appuis, souffle, verticalité", "session", "pratiquer.html", "Je reviens dans le corps-temple."],
    ["seances", "Séance complète du temple vivant", "Lire, respirer, bouger, intégrer", "session", "creer-seance.html", "Je relie les quatre livres dans une seule pratique."],
    ["seances", "Rituel de clôture des 72 portes", "Terminer le cycle et ouvrir le suivant", "session", "pratiquer.html", "Je ferme le cycle et je garde l’essentiel."]
  ];

  const COURSES = RAW_COURSES.map((item, index) => {
    const [pathId, title, subtitle, kind, launchUrl, intention, durationOverride, visualKey, virtueNumber] = item;
    return {
      number: index + 1,
      id: `course-${String(index + 1).padStart(2, "0")}-${slugify(title)}`,
      pathId,
      title,
      subtitle,
      kind,
      launchUrl,
      intention,
      durationMin: Number(durationOverride) || (kind === "session" ? 7 : kind === "rotor" ? 6 : kind === "breath" ? 5 : kind === "terrain" ? 6 : 4),
      visualKey: visualKey || "",
      virtueNumber: Number(virtueNumber) || null
    };
  });

  const STORE_KEY = "axis_apprendre_72_progress_v1";
  const NOTES_KEY = "axis_apprendre_72_notes_v1";

  const state = {
    path: "all",
    kind: "all",
    status: "all",
    search: "",
    selectedId: COURSES[0].id,
    completed: loadSet(STORE_KEY),
    notes: loadObject(NOTES_KEY),
    timer: {
      course: null,
      total: 180,
      left: 180,
      running: false,
      interval: null
    },
    raf: 0
  };

  const els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheEls();
    bindEvents();
    renderPaths();
    renderAll();
    startConstellation();
  }

  function cacheEls() {
    els.accessPanel = $("#axisAccessPanel");
    els.paths = $("#axisLearnPaths");
    els.search = $("#axisLearnSearch");
    els.kind = $("#axisLearnKind");
    els.status = $("#axisLearnStatus");
    els.grid = $("#axisLearnGrid");
    els.reader = $("#axisLearnReader");
    els.listTitle = $("#axisLearnListTitle");
    els.count = $("#axisLearnCount");
    els.progressBar = $("#axisLearnProgressBar");
    els.progressText = $("#axisLearnProgressText");
    els.progressPercent = $("#axisLearnProgressPercent");
    els.resume = $("#axisLearnResume");
    els.random = $("#axisLearnRandom");
    els.fullscreen = $("#axisLearnFullscreen");
    els.canvas = $("#axisLearnConstellation");
    els.overlay = $("#axisLearnPracticeOverlay");
    els.practiceTitle = $("#axisLearnPracticeTitle");
    els.practiceTimer = $("#axisLearnPracticeTimer");
    els.practiceGuidance = $("#axisLearnPracticeGuidance");
    els.practiceStart = $("#axisLearnPracticeStart");
    els.practicePause = $("#axisLearnPracticePause");
    els.practiceClose = $("#axisLearnPracticeClose");
  }

  function bindEvents() {
    els.search.addEventListener("input", () => {
      state.search = els.search.value.trim().toLowerCase();
      renderAll();
    });

    els.kind.addEventListener("change", () => {
      state.kind = els.kind.value;
      renderAll();
    });

    els.status.addEventListener("change", () => {
      state.status = els.status.value;
      renderAll();
    });

    els.resume.addEventListener("click", () => {
      const last = localStorage.getItem("axis_apprendre_72_last_course");
      const course = COURSES.find((item) => item.id === last) || nextTodoCourse() || COURSES[0];
      selectCourse(course.id);
      scrollReader();
    });

    els.random.addEventListener("click", () => {
      const pool = visibleCourses().filter((course) => accessForCourse(course).allowed);
      const course = pool[Math.floor(Math.random() * pool.length)] || COURSES[0];
      selectCourse(course.id);
      scrollReader();
    });

    els.fullscreen.addEventListener("click", async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch {}
    });

    els.practiceStart.addEventListener("click", startOverlayTimer);
    els.practicePause.addEventListener("click", pauseOverlayTimer);
    els.practiceClose.addEventListener("click", closePracticeOverlay);

    window.addEventListener("axis-access-change", () => {
      renderAll();
    });
  }

  function renderAccessPanel() {
    if (!els.accessPanel) return;

    const access = window.AxisAccess?.getAccessState?.() || { authenticated: false, role: "visitor" };

    if (access.isAdmin) {
      els.accessPanel.innerHTML = `
        <div class="axis-access-box">
          <div class="axis-access-status">
            <strong>Créateur connecté</strong><br>
            ${escapeHtml(access.user.email)}<br>
            Accès total aux 72 cours, sans calendrier de déblocage.
          </div>
          <button id="axisAccessLogout" class="axis-learn-btn ghost" type="button">Déconnexion</button>
        </div>
      `;
      $("#axisAccessLogout").addEventListener("click", () => {
        window.AxisAccess.logout();
      });
      return;
    }

    if (access.isSubscriber) {
      const start = access.subscriptionStart ? new Date(access.subscriptionStart) : null;
      els.accessPanel.innerHTML = `
        <div class="axis-access-box">
          <div class="axis-access-status">
            <strong>Abonnement actif</strong><br>
            ${escapeHtml(access.user.email)}<br>
            Début du calendrier : ${start ? start.toLocaleDateString("fr-FR") : "aujourd’hui"}<br>
            Règle : 1 cours tous les 4 jours + cours précédent validé.
          </div>
          <button id="axisAccessLogout" class="axis-learn-btn ghost" type="button">Déconnexion</button>
        </div>
      `;
      $("#axisAccessLogout").addEventListener("click", () => {
        window.AxisAccess.logout();
      });
      return;
    }

    els.accessPanel.innerHTML = `
      <div class="axis-access-box">
        <div class="axis-access-status">
          <strong>Cours réservés aux abonnés</strong><br>
          Connecte-toi avec le compte créateur ou active un abonnement après paiement.
        </div>

        <form id="axisAccessLoginForm" class="axis-access-form">
          <input id="axisAccessEmail" type="email" placeholder="Email">
          <input id="axisAccessPassword" type="password" placeholder="Mot de passe">
          <button class="axis-learn-btn primary" type="submit">Connexion</button>
          <a class="axis-learn-btn secondary" href="abonnement.html">S’abonner</a>
          <p id="axisAccessMessage" class="axis-access-message"></p>
        </form>
      </div>
    `;

    $("#axisAccessLoginForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = $("#axisAccessEmail").value;
      const password = $("#axisAccessPassword").value;
      const msg = $("#axisAccessMessage");

      const result = await window.AxisAccess.login(email, password);
      msg.textContent = result.message || "";

      if (result.ok) {
        renderAll();
      }
    });
  }

  function accessForCourse(course) {
    if (!window.AxisAccess) {
      return {
        allowed: false,
        reason: "Module d’accès indisponible",
        status: "Verrouillé"
      };
    }

    const access = window.AxisAccess.getAccessState();

    if (access.isAdmin) {
      return {
        allowed: true,
        reason: "Accès créateur",
        status: "Créateur"
      };
    }

    if (!access.isSubscriber) {
      return {
        allowed: false,
        reason: "Ce cours est réservé aux abonnés.",
        status: "Abonnement requis"
      };
    }

    const schedule = window.AxisAccess.getCourseSchedule(course.number);

    if (!schedule.allowedByDate) {
      return {
        allowed: false,
        reason: schedule.label,
        status: schedule.label
      };
    }

    if (course.number > 1) {
      const previous = COURSES[course.number - 2];
      if (previous && !state.completed.has(previous.id)) {
        return {
          allowed: false,
          reason: `Valide d’abord le cours ${String(previous.number).padStart(2, "0")} : ${previous.title}.`,
          status: "Cours précédent requis"
        };
      }
    }

    return {
      allowed: true,
      reason: "Cours accessible",
      status: "Accessible"
    };
  }

  function renderPaths() {
    els.paths.innerHTML = "";

    PATHS.forEach((path) => {
      const btn = document.createElement("button");
      btn.className = "axis-learn-path-btn" + (state.path === path.id ? " active" : "");
      btn.type = "button";

      const count = path.id === "all"
        ? COURSES.length
        : COURSES.filter((course) => course.pathId === path.id).length;

      btn.innerHTML = `
        <strong>${escapeHtml(path.title)}</strong>
        <span>${escapeHtml(path.subtitle)} · ${count} cours</span>
      `;

      btn.addEventListener("click", () => {
        state.path = path.id;
        renderPaths();
        renderAll();
      });

      els.paths.appendChild(btn);
    });
  }

  function renderAll() {
    renderAccessPanel();
    renderGrid();
    renderReader();
    renderProgress();
  }

  function visibleCourses() {
    return COURSES.filter((course) => {
      const access = accessForCourse(course);
      const text = `${course.title} ${course.subtitle} ${course.intention} ${course.kind} ${course.pathId}`.toLowerCase();
      const pathOk = state.path === "all" || course.pathId === state.path;
      const kindOk = state.kind === "all" || course.kind === state.kind;
      const searchOk = !state.search || text.includes(state.search);
      const done = state.completed.has(course.id);
      const statusOk =
        state.status === "all" ||
        (state.status === "done" && done) ||
        (state.status === "todo" && !done && access.allowed) ||
        (state.status === "available" && access.allowed) ||
        (state.status === "locked" && !access.allowed);

      return pathOk && kindOk && searchOk && statusOk;
    });
  }

  function renderGrid() {
    const courses = visibleCourses();
    const path = PATHS.find((item) => item.id === state.path) || PATHS[0];

    els.listTitle.textContent = path.title;
    els.count.textContent = `${courses.length} cours`;

    els.grid.innerHTML = "";

    if (!courses.length) {
      els.grid.innerHTML = `<article class="axis-learn-card"><h3>Aucun cours trouvé</h3><p>Change le filtre ou la recherche.</p></article>`;
      return;
    }

    courses.forEach((course) => {
      const done = state.completed.has(course.id);
      const access = accessForCourse(course);
      const card = document.createElement("button");

      card.type = "button";
      card.className =
        "axis-learn-card" +
        (course.id === state.selectedId ? " active" : "") +
        (done ? " done" : "") +
        (!access.allowed ? " locked" : "");

      card.innerHTML = `
        <div class="axis-learn-card-head">
          <span class="axis-learn-number">${String(course.number).padStart(2, "0")}</span>
          <span class="axis-learn-status">${done ? "validé" : access.status}</span>
        </div>
        <h3>${escapeHtml(course.title)}</h3>
        <p>${escapeHtml(course.subtitle)}</p>
        <div class="axis-learn-chip-row">
          <span class="axis-learn-chip">${escapeHtml(labelPath(course.pathId))}</span>
          <span class="axis-learn-chip">${escapeHtml(labelKind(course.kind))}</span>
          <span class="axis-learn-chip">${course.durationMin} min</span>
        </div>
      `;

      card.addEventListener("click", () => selectCourse(course.id));
      els.grid.appendChild(card);
    });
  }

  function renderReader() {
    const course = COURSES.find((item) => item.id === state.selectedId) || COURSES[0];
    const done = state.completed.has(course.id);
    const access = accessForCourse(course);

    if (!access.allowed) {
      renderLockedReader(course, access);
      return;
    }

    const steps = practiceSteps(course);
    const teaching = teachingFor(course);
    const isAdmin = window.AxisAccess?.isAdmin?.();

    els.reader.innerHTML = `
      <div class="reader-meta">
        <span class="reader-badge">Cours ${String(course.number).padStart(2, "0")} / 72</span>
        <span class="reader-badge">${escapeHtml(labelPath(course.pathId))}</span>
        <span class="reader-badge">${escapeHtml(labelKind(course.kind))}</span>
        <span class="reader-badge">${done ? "Validé" : "À pratiquer"}</span>
      </div>

      <h2>${escapeHtml(course.title)}</h2>
      <p class="reader-subtitle">${escapeHtml(course.subtitle)} <span class="axis-course-duration-badge">${course.durationMin} min</span></p>

      ${renderCourseVisual(course)}

      <div class="reader-block">
        <h3>Sens du cours</h3>
        <p>${escapeHtml(teaching)}</p>
      </div>

      <div class="reader-block">
        <h3>Intention</h3>
        <p>${escapeHtml(course.intention)}</p>
      </div>

      <div class="reader-block">
        <h3>Pratique guidée</h3>
        <ol>
          ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ol>
      </div>

      <div class="reader-block">
        <h3>Validation</h3>
        <p>${isAdmin ? "Créateur : validation manuelle autorisée." : "Abonné : le cours se valide automatiquement à la fin du mode pratique."}</p>
      </div>

      <div class="axis-learn-reader-actions">
        <button class="axis-learn-btn primary" data-action="practice">Mode pratique</button>
        <button class="axis-learn-btn secondary" data-action="speak">Écouter</button>
        <button class="axis-learn-btn secondary" data-action="launch">Ouvrir l’exercice</button>
        ${isAdmin ? `<button class="axis-learn-btn ghost" data-action="complete">${done ? "Retirer validation" : "Valider le cours"}</button>` : ""}
      </div>

      <label class="axis-learn-field">
        <span>Carnet d’expérience</span>
        <textarea id="axisLearnNote" class="axis-learn-note" placeholder="Date, état avant, état après, sensation, image, prudence…">${escapeHtml(state.notes[course.id] || "")}</textarea>
      </label>
    `;

    els.reader.querySelector('[data-action="practice"]').addEventListener("click", () => openPracticeOverlay(course));
    els.reader.querySelector('[data-action="speak"]').addEventListener("click", () => speakCourse(course));
    els.reader.querySelector('[data-action="launch"]').addEventListener("click", () => launchCourse(course));

    const completeButton = els.reader.querySelector('[data-action="complete"]');
    if (completeButton) {
      completeButton.addEventListener("click", () => toggleComplete(course.id));
    }

    const note = $("#axisLearnNote");
    note.addEventListener("input", () => {
      state.notes[course.id] = note.value;
      saveObject(NOTES_KEY, state.notes);
    });

    localStorage.setItem("axis_apprendre_72_last_course", course.id);
  }

  function findVirtueCard(number) {
    const cards = Array.isArray(window.AXIS_VIRTUE_CARDS) ? window.AXIS_VIRTUE_CARDS : [];
    return cards.find((card) => Number(card.number) === Number(number)) || null;
  }
  function renderCourseVisual(course) {
    const visualPath = course.visualKey
      ? (String(course.visualKey).match(/\.(png|jpg|jpeg|webp|svg)$/i)
        ? `assets/course-visuals/${escapeHtml(course.visualKey)}`
        : `assets/course-visuals/${escapeHtml(course.visualKey)}.svg`)
      : "";

    const visual = visualPath
      ? `<div class="axis-course-visual-card"><img src="${visualPath}" alt="Schéma pédagogique du cours ${escapeHtml(course.title)}"></div>`
      : "";

    const card = course.virtueNumber ? findVirtueCard(course.virtueNumber) : null;
    const virtue = card
      ? `
        <a class="axis-course-virtue-link" href="vertus.html?card=${encodeURIComponent(card.number)}">
          <img src="${escapeHtml(card.src)}" alt="Carte vertu ${escapeHtml(card.title)}">
          <span>
            <strong>Vertu associée : ${escapeHtml(card.title || "Carte " + card.number)}</strong>
            <span>Ouvrir la carte, la lire en grand, puis pratiquer l’imprégnation lumineuse.</span>
          </span>
        </a>
      `
      : "";

    if (!visual && !virtue) return "";

    return `
      <div class="axis-course-visual">
        ${visual}
        ${virtue}
      </div>
    `;
  }

  function renderLockedReader(course, access) {
    const accessState = window.AxisAccess?.getAccessState?.() || { authenticated: false };
    const schedule = window.AxisAccess?.getCourseSchedule?.(course.number);

    let cta = "";

    if (!accessState.isSubscriber) {
      cta = `
        <a class="axis-learn-btn primary" href="abonnement.html">S’abonner</a>
      `;
    } else if (schedule?.plannedDate) {
      cta = `
        <button class="axis-learn-btn secondary" type="button" disabled>${escapeHtml(access.reason)}</button>
      `;
    }

    els.reader.innerHTML = `
      <div class="reader-meta">
        <span class="reader-badge">Cours ${String(course.number).padStart(2, "0")} / 72</span>
        <span class="reader-badge">${escapeHtml(labelPath(course.pathId))}</span>
        <span class="reader-badge">Verrouillé</span>
      </div>

      <h2>${escapeHtml(course.title)}</h2>
      <p class="reader-subtitle">${escapeHtml(course.subtitle)} <span class="axis-course-duration-badge">${course.durationMin} min</span></p>

      ${renderCourseVisual(course)}

      <div class="reader-block lock-block">
        <h3>Accès verrouillé</h3>
        <p>${escapeHtml(access.reason)}</p>
      </div>

      <div class="reader-block">
        <h3>Règle de progression</h3>
        <p>
          Les cours se débloquent selon deux conditions :
          calendrier de 4 jours depuis le début d’abonnement,
          puis validation du cours précédent.
        </p>
      </div>

      <div class="axis-learn-reader-actions">
        ${cta}
      </div>
    `;
  }

  function renderProgress() {
    const done = state.completed.size;
    const total = COURSES.length;
    const pct = Math.round((done / total) * 100);

    els.progressBar.style.width = `${pct}%`;
    els.progressText.textContent = `${done} cours validé${done > 1 ? "s" : ""} sur ${total}.`;
    els.progressPercent.textContent = `${pct}%`;
  }

  function selectCourse(id) {
    state.selectedId = id;
    renderGrid();
    renderReader();
  }

  function toggleComplete(id) {
    if (!window.AxisAccess?.isAdmin?.()) return;

    if (state.completed.has(id)) {
      state.completed.delete(id);
    } else {
      state.completed.add(id);
    }

    saveSet(STORE_KEY, state.completed);
    renderAll();
  }

  function completeAfterPractice(id) {
    state.completed.add(id);
    saveSet(STORE_KEY, state.completed);
    renderAll();
  }

  function nextTodoCourse() {
    return COURSES.find((course) => !state.completed.has(course.id) && accessForCourse(course).allowed);
  }

  function teachingFor(course) {
    const bases = {
      fondation: "Ce cours appartient au socle JE SUIS : revenir au centre, traiter le corps comme un temple et rendre la pratique habitable. Il ne cherche pas le spectaculaire, mais la construction d’un axe fiable.",
      terrain: "Ce cours relie la pratique au terrain vivant : eau, minéraux, digestion, élimination, rythme et clarté. Le corps devient plus disponible lorsque ce qui l’encombre est vu, simplifié et retiré avec mesure.",
      vertus: "Ce cours transforme une vertu en qualité vécue. On ne cherche pas seulement à comprendre une idée : on la lit, on la laisse descendre dans la lumière, puis on l’incarne dans un geste concret.",
      exercices: "Ce cours vient du Livre d’Exercices : seuil, lumière, rémanence, souffle, rythme, balancement, rotor, tensions et intégration. Le geste est simple, mais il doit être net, prudent et répété.",
      seances: "Ce cours assemble plusieurs portes en un format praticable. L’objectif est de passer du savoir au vécu : une durée claire, une consigne unique, un retour au calme et une trace dans le carnet."
    };

    return `${bases[course.pathId]} Ici, la porte ${course.number} travaille : ${course.title}. ${course.subtitle}. L’intention centrale est : « ${course.intention} »`;
  }

  function practiceSteps(course) {
    const commonStart = [
      "Installe-toi dans un lieu simple, sans écran inutile.",
      "Observe ton état réel : corps, souffle, ventre, regard, fatigue ou agitation."
    ];

    const bank = {
      contemplation: [
        ...commonStart,
        `Répète intérieurement : « ${course.intention} »`,
        "Reste immobile une à trois minutes, sans chercher un phénomène.",
        "Note une phrase exacte dans le carnet."
      ],
      terrain: [
        ...commonStart,
        "Bois quelques gorgées d’eau avec présence si le corps le demande.",
        `Choisis un retrait concret lié à l’intention : « ${course.intention} »`,
        "Observe ce qui rend ton terrain plus lisible, plus léger ou plus stable."
      ],
      virtue: [
        "Tire ou choisis une seule vertu, sans multiplier les messages.",
        "Lis le nom, la phrase essentielle et l’orientation lentement.",
        "Observe une lumière douce 20 à 30 secondes, sans forcer le regard.",
        `Ferme les yeux et laisse descendre : « ${course.intention} »`,
        "Note comment la vertu peut devenir un geste aujourd’hui."
      ],
      light: [
        "Prépare une lampe douce ou une source lumineuse confortable.",
        "Observe 20 à 30 secondes avec un regard souple.",
        "Ferme les yeux et accueille la rémanence sans impatience.",
        `Dépose dans la trace lumineuse : « ${course.intention} »`,
        "Reste deux à trois minutes, puis reviens au souffle naturel."
      ],
      swing: [
        "Prépare la nuque : épaules relâchées, mâchoire desserrée.",
        "Commence avec une amplitude très faible et régulière.",
        "Garde une cadence simple, environ deux secondes par cycle.",
        `Associe le mouvement à : « ${course.intention} »`,
        "Arrête avant toute gêne visuelle ou cervicale."
      ],
      breath: [
        "Assieds-toi avec la colonne libre, sans rigidité.",
        "Observe trois respirations naturelles avant toute technique.",
        "Entre dans le rythme respiratoire choisi sans forcer.",
        `Garde l’intention : « ${course.intention} »`,
        "Termine par une respiration libre et une note courte."
      ],
      rotor: [
        "Observe l’objet seul pendant 30 secondes.",
        "Observe ensuite la lumière centrale pendant 30 secondes.",
        "Lance la rotation et garde l’objet lisible en bout de pale.",
        `Maintiens l’intention : « ${course.intention} »`,
        "Reviens doucement, sans quitter brutalement l’état obtenu."
      ],
      tension: [
        "Place-toi dans une posture stable, souffle naturel.",
        "Contracte progressivement sans crisper le visage.",
        "Maintiens avec attention, sans bloquer le souffle.",
        "Relâche lentement et observe la circulation intérieure.",
        `Termine avec : « ${course.intention} »`
      ],
      session: [
        "Choisis une durée claire et un exercice principal.",
        "Commence par un seuil : posture, souffle, intention.",
        "Pratique sans changer de consigne au milieu du parcours.",
        `Laisse la séance porter : « ${course.intention} »`,
        "Clôture, note, puis reviens au quotidien avec lenteur."
      ]
    };

    return bank[course.kind] || bank.contemplation;
  }

  function speakCourse(course) {
    if (!window.speechSynthesis) return;

    const access = accessForCourse(course);
    if (!access.allowed) {
      speakSimple(`Cours verrouillé. ${access.reason}`);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const text = [
        `Cours ${course.number}. ${course.title}.`,
        course.subtitle,
        teachingFor(course),
        `Intention : ${course.intention}.`,
        "Pratique.",
        ...practiceSteps(course)
      ].join(" ");

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((voice) => /^fr/i.test(voice.lang)) || voices[0];

      if (fr) utterance.voice = fr;
      utterance.lang = fr?.lang || "fr-FR";
      utterance.rate = 0.92;
      utterance.pitch = 0.94;
      utterance.volume = 0.9;

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  function launchCourse(course) {
    const access = accessForCourse(course);
    if (!access.allowed) {
      speakSimple(`Cours verrouillé. ${access.reason}`);
      return;
    }

    try {
      localStorage.setItem("axis_pending_session_intention", course.intention);
      localStorage.setItem("axis_pending_learning_course", JSON.stringify({
        number: course.number,
        title: course.title,
        subtitle: course.subtitle,
        kind: course.kind,
        intention: course.intention,
        steps: practiceSteps(course)
      }));
    } catch {}

    window.location.href = course.launchUrl || "creer-seance.html";
  }

  function openPracticeOverlay(course) {
    const access = accessForCourse(course);
    if (!access.allowed) {
      speakSimple(`Cours verrouillé. ${access.reason}`);
      return;
    }

    state.timer.course = course;
    state.timer.total = Math.max(90, Math.min(600, course.durationMin * 60));
    state.timer.left = state.timer.total;
    state.timer.running = false;

    els.practiceTitle.textContent = course.title;
    els.practiceGuidance.textContent = course.intention;
    els.practiceTimer.textContent = formatClock(state.timer.left);
    els.overlay.classList.remove("hidden");
    els.overlay.setAttribute("aria-hidden", "false");

    speakSimple(`Mode pratique. ${course.title}. ${course.intention}`);
  }

  function startOverlayTimer() {
    if (!state.timer.course || state.timer.running) return;

    state.timer.running = true;
    speakSimple("Commencez la pratique.");

    clearInterval(state.timer.interval);
    state.timer.interval = setInterval(() => {
      if (!state.timer.running) return;

      state.timer.left -= 1;
      els.practiceTimer.textContent = formatClock(state.timer.left);

      if (state.timer.left <= 0) {
        clearInterval(state.timer.interval);
        state.timer.running = false;
        speakSimple("Fin du temps de pratique. Le cours est validé. Le prochain cours respectera le calendrier de quatre jours.");
        if (state.timer.course) {
          completeAfterPractice(state.timer.course.id);
        }
      }
    }, 1000);
  }

  function pauseOverlayTimer() {
    state.timer.running = !state.timer.running;
    els.practicePause.textContent = state.timer.running ? "Pause" : "Reprendre";
  }

  function closePracticeOverlay() {
    clearInterval(state.timer.interval);
    state.timer.running = false;
    els.overlay.classList.add("hidden");
    els.overlay.setAttribute("aria-hidden", "true");
    els.practicePause.textContent = "Pause";
  }

  function speakSimple(text) {
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((voice) => /^fr/i.test(voice.lang)) || voices[0];

      if (fr) utterance.voice = fr;
      utterance.lang = fr?.lang || "fr-FR";
      utterance.rate = 0.92;
      utterance.pitch = 0.94;
      utterance.volume = 0.9;

      window.speechSynthesis.speak(utterance);
    } catch {}
  }

  function startConstellation() {
    function frame(time) {
      drawConstellation(time);
      state.raf = requestAnimationFrame(frame);
    }

    state.raf = requestAnimationFrame(frame);
  }

  function drawConstellation(time) {
    const canvas = els.canvas;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(w, h) * 0.36;

    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
    bg.addColorStop(0, "rgba(255, 217, 120, 0.13)");
    bg.addColorStop(0.45, "rgba(123, 188, 255, 0.06)");
    bg.addColorStop(1, "rgba(2, 5, 12, 0)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.strokeStyle = "rgba(232, 205, 139, 0.17)";
    ctx.lineWidth = 1;

    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (r / 5) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
      const a = (Math.PI * 2 * i) / 12 + time * 0.00005;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.stroke();
    }
    ctx.restore();

    COURSES.forEach((course, index) => {
      const ring = 0.52 + ((index % 6) * 0.085);
      const angle = (Math.PI * 2 * index) / COURSES.length - Math.PI / 2 + time * 0.000025;
      const x = cx + Math.cos(angle) * r * ring;
      const y = cy + Math.sin(angle) * r * ring;
      const done = state.completed.has(course.id);
      const selected = course.id === state.selectedId;
      const access = accessForCourse(course);

      ctx.beginPath();
      ctx.arc(x, y, selected ? 5.5 : done ? 4.5 : access.allowed ? 3.2 : 2.4, 0, Math.PI * 2);
      ctx.fillStyle = selected
        ? "rgba(255, 245, 200, 0.98)"
        : done
          ? "rgba(141, 224, 179, 0.86)"
          : access.allowed
            ? "rgba(232, 205, 139, 0.44)"
            : "rgba(255, 138, 154, 0.24)";
      ctx.fill();

      if (selected) {
        ctx.strokeStyle = "rgba(255, 217, 120, 0.86)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 231, 163, 0.88)";
    ctx.font = "700 16px Georgia, serif";
    ctx.fillText("72 portes", cx, cy - 4);
    ctx.fillStyle = "rgba(174, 185, 204, 0.80)";
    ctx.font = "500 12px Inter, system-ui, sans-serif";
    ctx.fillText("école du temple vivant", cx, cy + 18);
    ctx.restore();
  }

  function scrollReader() {
    if (window.innerWidth < 1320) {
      els.reader.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function labelPath(pathId) {
    const found = PATHS.find((path) => path.id === pathId);
    return found ? found.title.replace(" — ", " · ") : pathId;
  }

  function labelKind(kind) {
    const labels = {
      contemplation: "Contemplation",
      terrain: "Terrain",
      virtue: "Vertu",
      light: "Lumière",
      swing: "Balancement",
      breath: "Respiration",
      rotor: "Rotor",
      tension: "Tension",
      session: "Séance"
    };

    return labels[kind] || kind;
  }

  function formatClock(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function $(selector) {
    return document.querySelector(selector);
  }

  function loadSet(key) {
    try {
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  function saveSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }

  function loadObject(key) {
    try {
      const raw = localStorage.getItem(key);
      const value = raw ? JSON.parse(raw) : {};
      return value && typeof value === "object" ? value : {};
    } catch {
      return {};
    }
  }

  function saveObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value || {}));
  }
})();


