/* Axis Lumen Studio - Cours 002 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-002/cover.webp",
    gallery: [
      "assets/courses/course-002/atmosphere.webp",
      "assets/courses/course-002/closing.webp",
      "assets/courses/course-002/contemplation.webp",
      "assets/courses/course-002/course-002-image-02.webp",
      "assets/courses/course-002/course-002-image-03.webp",
      "assets/courses/course-002/course-002-image-04.webp",
      "assets/courses/course-002/course-002-image-05.webp",
      "assets/courses/course-002/course-002-image-06.webp",
      "assets/courses/course-002/course-002-image-07.webp",
      "assets/courses/course-002/course-002-image-08.webp",
      "assets/courses/course-002/course-002-image-09.webp",
      "assets/courses/course-002/cover.webp",
      "assets/courses/course-002/journal.webp",
      "assets/courses/course-002/pedagogical.webp",
      "assets/courses/course-002/practice.webp",
      "assets/courses/course-002/safety.webp",
      "assets/courses/course-002/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 2; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();