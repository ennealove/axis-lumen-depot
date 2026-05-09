/* Axis Lumen Studio - Cours 004 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-004/cover.webp",
    gallery: [
      "assets/courses/course-004/atmosphere.webp",
      "assets/courses/course-004/closing.webp",
      "assets/courses/course-004/contemplation.webp",
      "assets/courses/course-004/contemplative.webp",
      "assets/courses/course-004/cover.webp",
      "assets/courses/course-004/journal.webp",
      "assets/courses/course-004/pedagogical.webp",
      "assets/courses/course-004/practice.webp",
      "assets/courses/course-004/safety.webp",
      "assets/courses/course-004/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 4; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();