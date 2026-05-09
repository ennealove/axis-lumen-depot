/* Axis Lumen Studio - Cours 003 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-003/cover.webp",
    gallery: [
      "assets/courses/course-003/atmosphere.webp",
      "assets/courses/course-003/closing.webp",
      "assets/courses/course-003/contemplation.webp",
      "assets/courses/course-003/contemplative.webp",
      "assets/courses/course-003/cover.webp",
      "assets/courses/course-003/journal.webp",
      "assets/courses/course-003/pedagogical.webp",
      "assets/courses/course-003/practice.webp",
      "assets/courses/course-003/safety.webp",
      "assets/courses/course-003/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 3; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();