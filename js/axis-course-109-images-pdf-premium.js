/* Axis Lumen Studio - Cours 109 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-109/cover.png",
    gallery: [
      "assets/courses/course-109/cover.png",
      "assets/courses/course-109/course-109-image-02.png",
      "assets/courses/course-109/course-109-image-03.png",
      "assets/courses/course-109/course-109-image-04.png",
      "assets/courses/course-109/course-109-image-05.png",
      "assets/courses/course-109/course-109-image-06.png",
      "assets/courses/course-109/course-109-image-07.png",
      "assets/courses/course-109/course-109-image-08.png"
    ],
    pedagogical: [
      "assets/courses/course-109/course-109-image-02.png",
      "assets/courses/course-109/course-109-image-03.png",
      "assets/courses/course-109/course-109-image-04.png"
    ],
    contemplative: "assets/courses/course-109/course-109-image-05.png",
    exercise:      "assets/courses/course-109/course-109-image-06.png"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 109; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
  }
})();