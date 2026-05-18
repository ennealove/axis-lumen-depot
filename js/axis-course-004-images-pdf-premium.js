/* Axis Lumen Studio - Cours 004 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-004/rythmes_lumineux_1_1.png",
    gallery: [
      "assets/courses/course-004/rythmes_lumineux_1_1.png",
      "assets/courses/course-004/rythmes_lumineux_1_2.png",
      "assets/courses/course-004/rythmes_lumineux_1_3.png",
      "assets/courses/course-004/rythmes_lumineux_1_4.png",
      "assets/courses/course-004/rythmes_lumineux_2_1.png",
      "assets/courses/course-004/rythmes_lumineux_2_2.png",
      "assets/courses/course-004/rythmes_lumineux_2_3.png",
      "assets/courses/course-004/rythmes_lumineux_2_4.png",
      "assets/courses/course-004/rythmes_lumineux_3_1.png",
      "assets/courses/course-004/rythmes_lumineux_3_2.png",
      "assets/courses/course-004/rythmes_lumineux_3_3.png",
      "assets/courses/course-004/rythmes_lumineux_3_4.png"
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