/* Axis Lumen Studio — Chemins PDF réels (fichiers premium vérifiés)
   Ce fichier est la source de vérité unique pour les PDFs disponibles.
   Il s'applique après tous les autres scripts, juste avant le renderer. */
(function () {
  "use strict";

  /* PDF disponibles : contenu vérifié, correspondance cours garantie */
  var PDF_PATHS = {
    /* Fondations */
    1:  "data/pdf/cours-01-lumiere-traditions.pdf",
    2:  "data/pdf/cours-02-cerveau-conscience.pdf",
    3:  "data/pdf/cours-03-initiation.pdf",
    4:  "data/pdf/cours-04-lefebure.pdf",

    /* Balancements phosphéniques (Lefebure) */
    9:  "data/pdf/cours-09-balancement-vertical.pdf",
    10: "data/pdf/cours-10-balancement-antero-posterieur.pdf",
    11: "data/pdf/cours-11-balancement-en-huit.pdf",
    12: "data/pdf/cours-12-balancement-en-croix.pdf",
    13: "data/pdf/cours-13-rotation-douce.pdf",
    14: "data/pdf/cours-14-fer-a-cheval.pdf",
    15: "data/pdf/cours-15-seance-combinee-balancements.pdf",

    /* Respirations rythmiques (Lefebure) */
    52: "data/pdf/cours-52-respiration-naturelle.pdf",
    53: "data/pdf/cours-53-respiration-diaphragmatique.pdf",
    54: "data/pdf/cours-54-respiration-carree.pdf",
    55: "data/pdf/cours-55-respiration-triangulaire.pdf",
    56: "data/pdf/cours-56-respiration-rectangulaire.pdf",
    58: "data/pdf/cours-58-pneumophene.pdf"
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES)
    ? window.AXIS_ONE_HOUR_COURSES : [];

  list.forEach(function (course) {
    var n = Number(course.number);
    if (PDF_PATHS[n]) {
      course.pdfPath = PDF_PATHS[n];
      course.pdfPremium = true;
      if (!course.pdf || typeof course.pdf !== "object") course.pdf = {};
      course.pdf.path = PDF_PATHS[n];
    }
  });
})();
