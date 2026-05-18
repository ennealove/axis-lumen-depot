/* Axis Lumen Studio - Cours 003 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-003/axis_lumen_image_1.png",
    gallery: [
      "assets/courses/course-003/axis_lumen_image_1.png",
      "assets/courses/course-003/axis_lumen_image_2.png",
      "assets/courses/course-003/axis_lumen_image_3.png",
      "assets/courses/course-003/axis_lumen_image_4.png",
      "assets/courses/course-003/axis_lumen_image_5.png",
      "assets/courses/course-003/axis_lumen_image_6.png",
      "assets/courses/course-003/axis_lumen_image_7.png",
      "assets/courses/course-003/axis_lumen_image_8.png",
      "assets/courses/course-003/axis_lumen_image_9.png"
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