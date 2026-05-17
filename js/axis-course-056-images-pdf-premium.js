/* Axis Lumen Studio - Cours 056 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-056/cover.webp",
    gallery: [
      "assets/courses/course-056/cover.webp",
      "assets/courses/course-056/course-056-image-02.webp",
      "assets/courses/course-056/course-056-image-03.webp",
      "assets/courses/course-056/course-056-image-04.webp",
      "assets/courses/course-056/course-056-image-05.webp",
      "assets/courses/course-056/course-056-image-06.webp",
      "assets/courses/course-056/course-056-image-07.webp",
      "assets/courses/course-056/course-056-image-08.webp"
    ],
    pedagogical: [
      "assets/courses/course-056/course-056-image-02.webp",
      "assets/courses/course-056/course-056-image-03.webp",
      "assets/courses/course-056/course-056-image-04.webp"
    ],
    contemplative: "assets/courses/course-056/course-056-image-05.webp",
    exercise:      "assets/courses/course-056/course-056-image-06.webp"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 56; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
    course.pdf        = course.pdf || {};
    course.pdf.title  = "Respiration rectangulaire 4/8 — L'expiration longue, le nerf vague et les acouphènes";
    course.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();