/* axis-image-final-override.js — runs LAST, after all axis-course-XXX-images-pdf-premium.js */
(function () {
  var IMG = {
    5:    "assets/images/exercice%20113%20114%20115/c%C3%A9n%C3%A8st%C3%A9sique%201.png",
    6:    "assets/images/exercice%20113%20114%20115/mantra%201.png",
    7:    "assets/images/exercice%20113%20114%20115/convergence%20oculaire%201.png",
    113:  "assets/images/exercice%20113%20114%20115/c%C3%A9n%C3%A8st%C3%A9sique%201.png",
    114:  "assets/images/exercice%20113%20114%20115/mantra%201.png",
    115:  "assets/images/exercice%20113%20114%20115/convergence%20oculaire%201.png",
    15.5:  "assets/images/images%20objet/carr%C3%A9/bleu.png",
    59.5:  "assets/images/personnage%20avec%20bandeau%20sur%20les%20yeux.png"
  };

  var MISSING = [
    {
      number: 5, id: "C005-sensations-cenesthesiques",
      title: "Sensations cénesthésiques",
      subtitle: "Percevoir et habiter les sensations internes du corps vivant",
      familyTitle: "Clair-ressenti & vivant", family: "Clair-ressenti & vivant",
      kind: "Exercice de perception corporelle", level: "Fondation",
      duration: "1 h", durationMin: 60, status: "available",
      shortSummary: "Développer la conscience des sensations internes du corps comme fondation du clair-ressenti.",
      summary: "Apprendre à percevoir les sensations cénesthésiques — chaleur, picotements, poids, flux — comme fondation du clair-ressenti."
    },
    {
      number: 7, id: "C007-convergence-oculaire",
      title: "Convergence oculaire",
      subtitle: "Diriger les deux axes visuels vers un même centre unique",
      familyTitle: "Clair-ressenti & vivant", family: "Clair-ressenti & vivant",
      kind: "Exercice de perception visuelle", level: "Fondation",
      duration: "1 h", durationMin: 60, status: "available",
      shortSummary: "Diriger les deux axes visuels vers un point central pour stabiliser l'attention intérieure.",
      summary: "La convergence oculaire est un exercice fondamental qui concentre le regard et prépare à la perception de la rémanence lumineuse."
    },
    {
      number: 59.5, order: 15.69, id: "C059bis-programme-15j-complet",
      title: "Programme 15 jours — Complet",
      subtitle: "Balancement & Respiration — Le parcours de l'éveil",
      familyTitle: "Balancement phosphénique", family: "Balancement phosphénique",
      kind: "Programme guidé 15 jours", level: "Initiatique avancé",
      duration: "15 jours", durationMin: 0, status: "available",
      shortSummary: "15 séances combinées : balancement puis respiration chaque jour. La progression complète.",
      summary: "Ce programme initiatique réunit chaque jour deux disciplines fondamentales de la méthode Lefebure : le balancement phosphénique suivi d'une pratique respiratoire. Le balancement active le système vestibulaire et mobilise le liquide céphalo-rachidien, créant un état de réceptivité intérieure. La respiration rythmique, décrite par Lefebure comme le pneumophène — équivalent respiratoire du phosphène — approfondit et amplifie cet état. Selon le principe d'homologie (analogie psycho-physique), ces deux disciplines combinées en séquence créent une synergie que chacune seule ne peut produire : la lumière intérieure est amplifiée par le souffle, et le souffle est orienté par la lumière. 15 jours, 15 séances, une progression continue. Chaque jour propose un balancement pré-configuré (forme, couleur, direction) suivi d'un exercice respiratoire adapté à l'avancement du cycle. Aucun réglage — un clic pour commencer.",
      pdf: { protectedNotice: "Ce programme combine les enseignements du Dr Francis Lefebure issus du Mixage Phosphénique, du Pneumophène et de la Respiration Rythmique. La pratique quotidienne de balancement + respiration constitue l'un des protocoles les plus complets de la méthode phosphénique pour le développement des facultés intérieures." },
      launchUrl: "exercice-programme-15j-complet.html"
    },
    {
      number: 15.5, order: 15.5, id: "C015bis-programme-15j-balancements",
      title: "Programme 15 jours — Balancements",
      subtitle: "Parcours initiatique complet du carré bleu au support animé",
      familyTitle: "Balancement phosphénique", family: "Balancement phosphénique",
      kind: "Programme guidé 15 jours", level: "Initiatique",
      duration: "15 jours", durationMin: 0, status: "available",
      shortSummary: "15 séances pré-configurées : une forme, une couleur, un balancement par jour. Aucun réglage — un clic pour pratiquer.",
      summary: "Programme initiatique complet couvrant les 8 jours de balancement sous toutes leurs formes. Chaque séance est entièrement pré-configurée : forme, couleur, direction et durée. L'étudiant n'a rien à paramétrer.",
      launchUrl: "exercice-programme-15j-balancements.html"
    }
  ];

  var list = window.AXIS_ONE_HOUR_COURSES || [];

  // Re-inject missing courses
  MISSING.forEach(function (stub) {
    var exists = list.some(function (c) { return Number(c.number) === stub.number; });
    if (!exists) {
      var img = IMG[stub.number];
      stub.coverImage = img; stub.image = img; stub.cover = img;
      stub.thumbnail = img; stub.hero = img;
      stub.images = { cover: img };
      list.push(stub);
    }
  });

  // Apply image map to all courses
  list.forEach(function (c) {
    var img = IMG[Number(c.number)];
    if (!img) return;
    c.coverImage = img;
    c.image      = img;
    c.cover      = img;
    c.thumbnail  = img;
    c.hero       = img;
    if (!c.images) c.images = {};
    c.images.cover = img;
  });

  // Remove course 57 (Mantras ILLI, ALLA, OLLO, RORO) — duplicate of cours 6
  list = list.filter(function (c) { return Number(c.number) !== 57; });

  // Set launchUrl for balancement courses (8-15) and respiration courses (52-59)
  // Set order for respiration courses so they appear right after 15.5 in the one-hour renderer
  list.forEach(function (c) {
    var n = Number(c.number);
    if (n >= 8 && n <= 15) {
      c.launchUrl = "exercice-balancement.html?jour=" + (n - 7);
    } else if (n >= 52 && n <= 59) {
      c.launchUrl = "exercice-respiration.html?jour=" + (n - 51);
      // Store original jour for renderer use
      c.jourRespiration = n - 51;
      // Place right after 15.5: order 15.61 → 15.68 (skipping 15.67 = old 57)
      c.order = 15.6 + (n - 52) * 0.01;
    }
    // Programme pages (15.5 and 59.5) already have launchUrl set in MISSING stubs
  });

  // Sort: respiration courses (52-59) appear right after 15.5 (programme 15j balancements)
  // by mapping their sort key to 15.51–15.58
  list.sort(function (a, b) {
    function sk(n) {
      if (n >= 52 && n <= 59) return 15.5 + (n - 51) / 100; // → 15.51–15.58
      return n;
    }
    return sk(Number(a.number || 0)) - sk(Number(b.number || 0));
  });

  window.AXIS_ONE_HOUR_COURSES = list;
})();
