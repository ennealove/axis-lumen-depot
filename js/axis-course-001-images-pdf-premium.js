/* Axis Lumen Studio - Cours 001 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-001/cover.webp",
    gallery: [
      "assets/courses/course-001/contemplation.webp",
      "assets/courses/course-001/contemplative.webp",
      "assets/courses/course-001/cover.webp",
      "assets/courses/course-001/exercise.webp",
      "assets/courses/course-001/journal.webp",
      "assets/courses/course-001/pedagogical.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 1; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();