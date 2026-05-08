/* Axis Lumen Studio - Cours 031 images premium */
(function () {
  var images = {
    cover:         "assets/courses/course-031/cover.png",
    gallery: [
      "assets/courses/course-031/cover.png",
      "assets/courses/course-031/course-031-image-02.png",
      "assets/courses/course-031/course-031-image-03.png",
      "assets/courses/course-031/course-031-image-04.png",
      "assets/courses/course-031/course-031-image-05.png",
      "assets/courses/course-031/course-031-image-06.png",
      "assets/courses/course-031/course-031-image-07.png",
      "assets/courses/course-031/course-031-image-08.png"
    ],
    pedagogical: [
      "assets/courses/course-031/course-031-image-02.png",
      "assets/courses/course-031/course-031-image-03.png",
      "assets/courses/course-031/course-031-image-04.png"
    ],
    contemplative: "assets/courses/course-031/course-031-image-05.png",
    exercise:      "assets/courses/course-031/course-031-image-06.png"
  };

  /* Injection SYNCHRONE - avant que axis-apprendre-one-hour.js rende les cartes */
  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 31; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
  }
})();