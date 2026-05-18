/* Axis Lumen Studio - Cours 055 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-055/cover.webp",
    gallery: [
      "assets/courses/course-055/cover.webp",
      "assets/courses/course-055/course-055-image-02.webp",
      "assets/courses/course-055/course-055-image-03.webp",
      "assets/courses/course-055/course-055-image-04.webp",
      "assets/courses/course-055/course-055-image-05.webp",
      "assets/courses/course-055/course-055-image-06.webp",
      "assets/courses/course-055/course-055-image-07.webp",
      "assets/courses/course-055/course-055-image-08.webp"
    ],
    pedagogical: [
      "assets/courses/course-055/course-055-image-02.webp",
      "assets/courses/course-055/course-055-image-03.webp",
      "assets/courses/course-055/course-055-image-04.webp"
    ],
    contemplative: "assets/courses/course-055/course-055-image-05.webp",
    exercise:      "assets/courses/course-055/course-055-image-06.webp"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 55; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
    course.pdf        = course.pdf || {};
    course.pdf.title  = "Respiration triangulaire 4/4/4 — L'asymétrie ascendante et l'éveil de la lumière intérieure";
    course.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();