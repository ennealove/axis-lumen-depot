/* Axis Lumen Studio - Cours 029 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-029/cover.webp",
    gallery: [
      "assets/courses/course-029/cover.webp",
      "assets/courses/course-029/course-029-image-02.webp",
      "assets/courses/course-029/course-029-image-03.webp",
      "assets/courses/course-029/course-029-image-04.webp",
      "assets/courses/course-029/course-029-image-05.webp",
      "assets/courses/course-029/course-029-image-06.webp",
      "assets/courses/course-029/course-029-image-07.webp",
      "assets/courses/course-029/course-029-image-08.webp"
    ],
    pedagogical: [
      "assets/courses/course-029/course-029-image-02.webp",
      "assets/courses/course-029/course-029-image-03.webp",
      "assets/courses/course-029/course-029-image-04.webp"
    ],
    contemplative: "assets/courses/course-029/course-029-image-05.webp",
    exercise:      "assets/courses/course-029/course-029-image-06.webp"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 29; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
  }
})();