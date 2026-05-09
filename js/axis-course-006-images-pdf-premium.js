/* Axis Lumen Studio - Cours 006 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-006/cover.webp",
    gallery: [
      "assets/courses/course-006/atmosphere.webp",
      "assets/courses/course-006/closing.webp",
      "assets/courses/course-006/contemplation.webp",
      "assets/courses/course-006/contemplative.webp",
      "assets/courses/course-006/cover.webp",
      "assets/courses/course-006/exercise.webp",
      "assets/courses/course-006/journal.webp",
      "assets/courses/course-006/pedagogical.webp",
      "assets/courses/course-006/practice.webp",
      "assets/courses/course-006/safety.webp",
      "assets/courses/course-006/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 6; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();