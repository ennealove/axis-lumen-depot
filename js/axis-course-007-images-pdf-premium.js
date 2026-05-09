/* Axis Lumen Studio - Cours 007 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-007/cover.webp",
    gallery: [
      "assets/courses/course-007/atmosphere.webp",
      "assets/courses/course-007/closing.webp",
      "assets/courses/course-007/contemplation.webp",
      "assets/courses/course-007/contemplative.webp",
      "assets/courses/course-007/cover.webp",
      "assets/courses/course-007/exercise.webp",
      "assets/courses/course-007/journal.webp",
      "assets/courses/course-007/pedagogical.webp",
      "assets/courses/course-007/practice.webp",
      "assets/courses/course-007/safety.webp",
      "assets/courses/course-007/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 7; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();