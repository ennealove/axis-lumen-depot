(() => {
  "use strict";

  const cards = Array.isArray(window.AXIS_VIRTUE_CARDS) ? window.AXIS_VIRTUE_CARDS : [];

  const $ = (selector) => document.querySelector(selector);

  const els = {
    draw: $("#axisVirtueDraw"),
    start: $("#axisVirtueStart"),
    enlarge: $("#axisVirtueEnlarge"),
    img: $("#axisVirtueImage"),
    lens: $("#axisVirtueLens"),
    empty: $("#axisVirtueEmpty"),
    number: $("#axisVirtueNumber"),
    title: $("#axisVirtueTitle"),
    source: $("#axisVirtueSource"),
    phase: $("#axisVirtuePhase"),
    timer: $("#axisVirtueTimer"),
    guidance: $("#axisVirtueGuidance"),
    pause: $("#axisVirtuePause"),
    resume: $("#axisVirtueResume"),
    stop: $("#axisVirtueStop"),
    note: $("#axisVirtueNote"),
    saveNote: $("#axisVirtueSaveNote"),
    modal: $("#axisVirtueModal"),
    modalTitle: $("#axisVirtueModalTitle"),
    modalImage: $("#axisVirtueModalImage"),
    modalClose: $("#axisVirtueModalClose"),
    zoom: $("#axisVirtueZoom"),
    zoomPane: $("#axisVirtueZoomPane"),
    frame: document.querySelector(".axis-virtue-card-frame")
  };

  const state = {
    current: null,
    phaseIndex: -1,
    phases: [],
    running: false,
    paused: false,
    remaining: 0,
    interval: null
  };

  function init() {
    bind();
    selectFromQueryOrRandom(false);
    updateTimer(0);
  }

  function bind() {
    els.draw.addEventListener("click", () => drawRandom(true));
    els.start.addEventListener("click", startPractice);
    els.enlarge.addEventListener("click", openModal);
    els.img.addEventListener("click", openModal);
    els.pause.addEventListener("click", pausePractice);
    els.resume.addEventListener("click", resumePractice);
    els.stop.addEventListener("click", stopPractice);
    els.saveNote.addEventListener("click", saveNote);
    els.modalClose.addEventListener("click", closeModal);
    els.zoom.addEventListener("input", updateModalZoom);

    els.frame.addEventListener("mousemove", moveLens);
    els.frame.addEventListener("mouseleave", () => {
      els.lens.style.display = "none";
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
    });
  }

  function selectFromQueryOrRandom(announce) {
    const params = new URLSearchParams(location.search);
    const wanted = Number(params.get("card"));

    if (cards.length && wanted) {
      const found = cards.find((card) => Number(card.number) === wanted);
      if (found) {
        setCard(found, announce);
        return;
      }
    }

    drawRandom(announce);
  }

  function drawRandom(announce = true) {
    if (!cards.length) {
      showEmpty();
      return;
    }

    const card = cards[Math.floor(Math.random() * cards.length)];
    setCard(card, announce);
  }

  function setCard(card, announce = true) {
    state.current = card;

    els.empty.style.display = "none";
    els.img.style.display = "block";
    els.img.src = card.src;
    els.img.alt = `Carte ${card.number || ""} ${card.title || "Vertu"}`;
    els.number.textContent = card.number ? String(card.number) : "—";
    els.title.textContent = card.title || "Carte Vertu";
    els.source.textContent = "Carte tirée depuis Le Livre des Vertus";
    els.modalImage.src = card.src;
    els.modalTitle.textContent = `${card.number ? card.number + " · " : ""}${card.title || "Carte Vertu"}`;

    const saved = localStorage.getItem(noteKey(card)) || "";
    els.note.value = saved;

    if (announce) {
      speak(`Carte tirée. ${card.title || "Vertu"}. Lis la carte lentement avant d’observer la lumière.`);
    }
  }

  function showEmpty() {
    els.img.style.display = "none";
    els.empty.style.display = "grid";
    els.number.textContent = "—";
    els.title.textContent = "Aucune carte";
    els.source.textContent = "Dossier assets/vertus vide";
    els.guidance.textContent = "Aucune carte n’a été trouvée. Relance le patch après avoir placé les images dans le dossier IMAGE VERTUS.";
  }

  function buildPhases() {
    const cardTitle = state.current ? (state.current.title || "cette vertu") : "cette vertu";
    state.phases = [
      {
        id: "lecture",
        label: "Lecture de la carte",
        seconds: 5 * 60,
        guidance: "Lisez la carte lentement. Laissez un mot, une image ou une phrase vous toucher. Ne cherchez pas à tout retenir — une seule phrase suffit.",
        voice: "Prenez le temps de lire cette carte. Laissez un mot, une image, une phrase vous toucher particulièrement. Ne cherchez pas à tout retenir — une seule phrase suffit."
      },
      {
        id: "lumiere",
        label: "Lumière allumée — 3 minutes",
        seconds: 3 * 60,
        guidance: "Allumez votre source lumineuse. Regardez-la pendant trois minutes en pensant à la vertu tirée. Laissez cette qualité remplir votre regard et votre espace intérieur.",
        voice: "Allumez maintenant votre source lumineuse. Regardez-la pendant trois minutes en pensant à " + cardTitle + ". Laissez cette qualité remplir votre regard et votre espace intérieur."
      },
      {
        id: "remanence",
        label: "Rémanence — yeux fermés",
        seconds: 10 * 60,
        guidance: "Éteignez la lumière. Fermez les yeux. Laissez la vertu s’imprégner en vous. Observez les images, les sensations, les souvenirs qu’elle éveille. Accueillez tout ce qui vient, sans juger.",
        voice: "Éteignez la lumière. Fermez les yeux doucement. Laissez la vertu s’imprégner en vous. Observez les images, les sensations, les souvenirs qu’elle éveille. Accueillez tout ce qui vient, sans juger."
      },
      {
        id: "carnet",
        label: "Carnet — points forts",
        seconds: 3 * 60,
        guidance: "Revenez doucement. Notez les points forts : une image reçue, une sensation, un souvenir, une décision ou une action concrète que cette vertu vous inspire.",
        voice: "Revenez doucement. Prenez votre carnet et notez les points forts : une image reçue, une sensation, un souvenir, une décision que cette vertu vous inspire."
      }
    ];
  }

  function startPractice() {
    if (!state.current) {
      drawRandom(true);
      if (!state.current) return;
    }

    buildPhases();
    state.phaseIndex = -1;
    state.running = true;
    state.paused = false;
    nextPhase();
  }

  function nextPhase() {
    state.phaseIndex += 1;

    if (state.phaseIndex >= state.phases.length) {
      stopPractice();
      const hour = new Date().getHours();
      const timeMsg = hour < 14
        ? "Portez cette vertu avec vous aujourd'hui. Cherchez à l'incarner dans une action concrète, même petite."
        : "Ce soir, en vous endormant, laissez cette vertu habiter vos pensées. Laissez-la travailler en vous pendant le sommeil.";
      const cardTitle = state.current ? (state.current.title || "cette vertu") : "cette vertu";
      els.phase.textContent   = "Séance terminée";
      els.guidance.textContent = timeMsg;
      updateTimer(0);
      speak("Votre séance avec " + cardTitle + " est terminée. " + timeMsg);
      return;
    }

    const phase = state.phases[state.phaseIndex];
    state.remaining = phase.seconds;
    els.phase.textContent = phase.label;
    els.guidance.textContent = phase.guidance;
    updateTimer(state.remaining);
    speak(phase.voice);

    clearInterval(state.interval);
    state.interval = setInterval(() => {
      if (!state.running || state.paused) return;

      state.remaining -= 1;
      updateTimer(state.remaining);

      if (state.remaining <= 0) {
        nextPhase();
      }
    }, 1000);
  }

  function pausePractice() {
    if (!state.running) return;
    state.paused = true;
    speak("Pause.");
  }

  function resumePractice() {
    if (!state.running) return;
    state.paused = false;
    speak("Reprise.");
  }

  function stopPractice() {
    state.running = false;
    state.paused = false;
    clearInterval(state.interval);
    state.interval = null;
  }

  function updateTimer(seconds) {
    const s = Math.max(0, Math.floor(seconds || 0));
    const m = Math.floor(s / 60);
    const r = s % 60;
    els.timer.textContent = `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function openModal() {
    if (!state.current) return;

    els.modal.classList.remove("hidden");
    els.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("axis-virtue-lock");
    updateModalZoom();
  }

  function closeModal() {
    els.modal.classList.add("hidden");
    els.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("axis-virtue-lock");
  }

  function updateModalZoom() {
    const zoom = Number(els.zoom.value || 1.8);
    els.modalImage.style.transform = `scale(${zoom})`;
    els.modalImage.style.transformOrigin = "top center";
    els.modalImage.style.marginBottom = `${Math.max(0, (zoom - 1) * 900)}px`;
  }

  function moveLens(event) {
    if (!state.current || !els.img.src) return;

    const imgRect = els.img.getBoundingClientRect();
    const frameRect = els.frame.getBoundingClientRect();

    const x = event.clientX - imgRect.left;
    const y = event.clientY - imgRect.top;

    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      els.lens.style.display = "none";
      return;
    }

    const zoom = 2.8;
    const lensSize = 250;
    const lensX = event.clientX - frameRect.left - lensSize / 2;
    const lensY = event.clientY - frameRect.top - lensSize / 2;

    els.lens.style.display = "block";
    els.lens.style.left = `${lensX}px`;
    els.lens.style.top = `${lensY}px`;
    els.lens.style.backgroundImage = `url("${els.img.src}")`;
    els.lens.style.backgroundSize = `${imgRect.width * zoom}px ${imgRect.height * zoom}px`;
    els.lens.style.backgroundPosition = `${-(x * zoom - lensSize / 2)}px ${-(y * zoom - lensSize / 2)}px`;
  }

  function saveNote() {
    if (!state.current) return;
    localStorage.setItem(noteKey(state.current), els.note.value || "");
    speak("Note sauvegardée.");
  }

  function noteKey(card) {
    return `axis_virtue_note_${card.number || card.src}`;
  }

  function speak(text) {
    if (!text) return;
    if (window.axisSpeak) { window.axisSpeak(text, true); return; }
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((v) => /^fr/i.test(v.lang)) || voices[0];
      if (fr) utterance.voice = fr;
      utterance.lang   = fr?.lang || "fr-FR";
      utterance.rate   = 0.92;
      utterance.volume = 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (_) {}
  }

  document.addEventListener("DOMContentLoaded", init);
})();
