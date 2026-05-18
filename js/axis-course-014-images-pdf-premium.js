/* Axis Lumen Studio - Cours 014 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-014/fer_a_cheval_1.png",
    gallery: [
      "assets/courses/course-014/fer_a_cheval_1.png",
      "assets/courses/course-014/fer_a_cheval_2.png",
      "assets/courses/course-014/fer_a_cheval_3.png",
      "assets/courses/course-014/fer_a_cheval_4.png",
      "assets/courses/course-014/fer_a_cheval_5.png",
      "assets/courses/course-014/fer_a_cheval_6.png",
      "assets/courses/course-014/fer_a_cheval_7.png",
      "assets/courses/course-014/fer_a_cheval_8.png",
      "assets/courses/course-014/fer_a_cheval_9.png"
    ],
    pedagogical: [
      "assets/courses/course-014/fer_a_cheval_2.png",
      "assets/courses/course-014/fer_a_cheval_3.png",
      "assets/courses/course-014/fer_a_cheval_4.png"
    ],
    contemplative: "assets/courses/course-014/fer_a_cheval_5.png",
    exercise:      "assets/courses/course-014/fer_a_cheval_6.png"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 14; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
    course.pdf        = course.pdf || {};
    course.pdf.title  = "Balancement avec personnage — La présence comme support : archétypes et projection perceptive";
    course.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();