/* Axis Lumen Studio - Cours 015 images premium */
(function () {
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];

  /* ── Cours 15 ── */
  var images15 = {
    cover:         "assets/courses/course-015/balancements_combines_1.png",
    gallery: [
      "assets/courses/course-015/balancements_combines_1.png",
      "assets/courses/course-015/balancements_combines_2.png",
      "assets/courses/course-015/balancements_combines_3.png",
      "assets/courses/course-015/balancements_combines_4.png",
      "assets/courses/course-015/balancements_combines_5.png",
      "assets/courses/course-015/balancements_combines_6.png",
      "assets/courses/course-015/balancements_combines_7.png",
      "assets/courses/course-015/balancements_combines_8.png",
      "assets/courses/course-015/balancements_combines_9.png"
    ],
    pedagogical: [
      "assets/courses/course-015/balancements_combines_2.png",
      "assets/courses/course-015/balancements_combines_3.png",
      "assets/courses/course-015/balancements_combines_4.png"
    ],
    contemplative: "assets/courses/course-015/balancements_combines_5.png",
    exercise:      "assets/courses/course-015/balancements_combines_6.png"
  };
  var course15 = list.find(function (c) { return Number(c.number) === 15; });
  if (course15) {
    course15.image      = images15.cover;
    course15.coverImage = images15.cover;
    course15.images     = Object.assign({}, course15.images || {}, images15);
    course15.pdfPremium = true;
    course15.pdf        = course15.pdf || {};
    course15.pdf.title  = "Balancements combinés — Intégration des cinq directions du mouvement";
    course15.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }

  /* ── Cours 15.5 ── */
  var images155 = {
    cover:         "assets/courses/course-015/cours-15.5/programme_15_jours_1.png",
    gallery: [
      "assets/courses/course-015/cours-15.5/programme_15_jours_1.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_2.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_3.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_4.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_5.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_6.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_7.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_8.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_9.png"
    ],
    pedagogical: [
      "assets/courses/course-015/cours-15.5/programme_15_jours_2.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_3.png",
      "assets/courses/course-015/cours-15.5/programme_15_jours_4.png"
    ],
    contemplative: "assets/courses/course-015/cours-15.5/programme_15_jours_5.png",
    exercise:      "assets/courses/course-015/cours-15.5/programme_15_jours_6.png"
  };
  var course155 = list.find(function (c) { return parseFloat(c.number) === 15.5; });
  if (course155) {
    course155.image      = images155.cover;
    course155.coverImage = images155.cover;
    course155.images     = Object.assign({}, course155.images || {}, images155);
    course155.pdfPremium = true;
    course155.pdf        = course155.pdf || {};
    course155.pdf.title  = "Programme 15 jours de balancements initiatiques — Consolidation et effets cumulatifs";
    course155.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();