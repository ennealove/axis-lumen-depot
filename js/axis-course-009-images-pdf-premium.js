/* Axis Lumen Studio - Cours 009 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-009/balancement_vertical_1.png",
    gallery: [
      "assets/courses/course-009/balancement_vertical_1.png",
      "assets/courses/course-009/balancement_vertical_2.png",
      "assets/courses/course-009/balancement_vertical_3.png",
      "assets/courses/course-009/balancement_vertical_4.png",
      "assets/courses/course-009/balancement_vertical_5.png",
      "assets/courses/course-009/balancement_vertical_6.png",
      "assets/courses/course-009/balancement_vertical_7.png",
      "assets/courses/course-009/balancement_vertical_8.png",
      "assets/courses/course-009/balancement_vertical_9.png"
    ],
    pedagogical: [
      "assets/courses/course-009/balancement_vertical_2.png",
      "assets/courses/course-009/balancement_vertical_3.png",
      "assets/courses/course-009/balancement_vertical_4.png",
      "assets/courses/course-009/balancement_vertical_5.png",
      "assets/courses/course-009/balancement_vertical_6.png",
      "assets/courses/course-009/balancement_vertical_7.png",
      "assets/courses/course-009/balancement_vertical_8.png",
      "assets/courses/course-009/balancement_vertical_9.png"
    ]
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 9; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
    course.pdf        = course.pdf || {};
    course.pdf.title  = "Balancement vertical initiatique — ALLA et l'axe cranio-sacré";
    course.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();