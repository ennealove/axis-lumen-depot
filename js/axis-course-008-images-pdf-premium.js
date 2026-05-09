/* Axis Lumen Studio - Cours 008 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-008/cover.webp",
    gallery: [
      "assets/courses/course-008/69f30444-af4b-4b9f-a590-fcbddea1b6af.webp",
      "assets/courses/course-008/contemplation.webp",
      "assets/courses/course-008/contemplative.webp",
      "assets/courses/course-008/cover.webp",
      "assets/courses/course-008/exercise.webp",
      "assets/courses/course-008/journal.webp",
      "assets/courses/course-008/pedagogical.webp",
      "assets/courses/course-008/practice.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 8; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();