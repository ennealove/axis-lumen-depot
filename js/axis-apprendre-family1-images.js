/* ============================================================
   FAMILLE 1 — IMAGES ET PDFs PREMIUM — cours c001 à c004
   Câblage des galeries et documents des 4 premiers cours
   ============================================================ */

(function () {
  function enrich(id, data) {
    var c = (window.AXIS_ONE_HOUR_COURSES || []).find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  /* ──────────────────────────────────────────────────────────
     C001 — LA LUMIÈRE DANS LES TRADITIONS
     12 images illustrant les grandes traditions de lumière
  ────────────────────────────────────────────────────────── */
  enrich("c001", {
    pdfPath: "assets/courses/course-001/cours-001-premium.pdf",
    images: {
      cover:      "assets/courses/course-001/cover.webp",
      pedagogical: [
        "assets/courses/course-001/c001-egypte-soleil.png",       // Femme égyptienne recevant la lumière — traditions solaires
        "assets/courses/course-001/c001-feu-sacre.png",           // Prêtre devant le feu sacré et l'étoile
        "assets/courses/course-001/c001-mysteres-grecs.png",      // Prêtresse grecque portant la torche — Mystères d'Éleusis
        "assets/courses/course-001/c001-kabbale-arbre.png",       // Kabbaliste devant l'Arbre de Vie lumineux
        "assets/courses/course-001/c001-chakras-lumiere.png",     // Méditant avec les 7 centres lumineux — traditions indiennes
        "assets/courses/course-001/c001-tao-aurore.png",          // Sage taoïste méditant au lever du soleil
        "assets/courses/course-001/c001-tao-lumiere.png",         // Méditant tenant le yin-yang lumineux
        "assets/courses/course-001/c001-tao-bougies.png",         // Sage taoïste, bougies et symboles
        "assets/courses/course-001/c001-tao-guerrier.png",        // Guerrier taoïste face au yin-yang cosmique
        "assets/courses/course-001/c001-tao-mouvement.png",       // Arts martiaux et énergie du ciel
        "assets/courses/course-001/c001-sagesse-ecrite.png",      // Sage transcrivant la sagesse à la lumière de la lune
        "assets/courses/course-001/c001-tao-soleil.png"           // Sage contemplatif face au coucher de soleil
      ]
    }
  });

  /* ──────────────────────────────────────────────────────────
     C002 — LE CERVEAU COMME ORGANE DE CONSCIENCE
     4 slides pédagogiques neutres (sans référence phosphène/Lefébure)
  ────────────────────────────────────────────────────────── */
  enrich("c002", {
    pdfPath: "assets/courses/course-002/cours-002-premium.pdf",
    images: {
      cover:      "assets/courses/course-002/cover.webp",
      pedagogical: [
        "assets/courses/course-002/c002-slide-couverture.png",    // Slide de couverture — Cours 002
        "assets/courses/course-002/c002-slide-phrase.png",        // Phrase essentielle : le cerveau organe de manifestation
        "assets/courses/course-002/c002-slide-eeg.png",           // Les ondes cérébrales : alpha, thêta, delta, gamma
        "assets/courses/course-002/c002-slide-finale.png"         // Slide finale : le laboratoire est en toi
      ]
    }
  });

  /* ──────────────────────────────────────────────────────────
     C003 — QU'EST-CE QU'UNE INITIATION ?
     10 slides complètes du module — parcours de l'initiation
  ────────────────────────────────────────────────────────── */
  enrich("c003", {
    pdfPath: "assets/courses/course-003/cours-003-premium.pdf",
    images: {
      cover:      "assets/courses/course-003/cover.webp",
      pedagogical: [
        "assets/courses/course-003/c003-slide-couverture.png",    // Slide de couverture — Qu'est-ce qu'une initiation ?
        "assets/courses/course-003/c003-slide-objectifs.png",     // Résumé long, objectifs pédagogique et initiatique
        "assets/courses/course-003/c003-slide-plan.png",          // Plan du module — les 6 phases
        "assets/courses/course-003/c003-slide-phrase.png",        // Phrase essentielle : l'initiation arrive quand tu choisis de ne pas fuir
        "assets/courses/course-003/c003-slide-epreuves.png",      // Les épreuves — le feu qui transforme
        "assets/courses/course-003/c003-slide-mort.png",          // La mort symbolique — laisser mourir l'ancien
        "assets/courses/course-003/c003-slide-inities.png",       // Les grands initiés : Bouddha, Rumi, Thérèse d'Avila, Milarepa
        "assets/courses/course-003/c003-slide-cartographie.png",  // Cartographie personnelle — où es-tu sur le chemin ?
        "assets/courses/course-003/c003-slide-cloture.png",       // Clôture — l'engagement conscient
        "assets/courses/course-003/c003-slide-finale.png"         // Slide finale Axis Lumen
      ]
    }
  });

  /* ──────────────────────────────────────────────────────────
     C004 — LA MÉTHODE DES RYTHMES LUMINEUX
     1 image neutre (carnet de recherche + spirale cosmique)
     Note : les autres images du pack original contenaient des
     références explicites à des auteurs tiers — non utilisées.
  ────────────────────────────────────────────────────────── */
  enrich("c004", {
    images: {
      cover:      "assets/courses/course-004/cover.webp",
      pedagogical: [
        "assets/courses/course-004/c004-carnet-spiral.png"        // Carnet de recherche et spirale cosmique
      ]
    }
  });

})();
