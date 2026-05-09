/* Axis Lumen Studio - Cours 005 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-005/cover.webp",
    gallery: [
      "assets/courses/course-005/2a0302a8-1232-4544-bf14-0bd665ae55d4.webp",
      "assets/courses/course-005/51bf665d-4b2b-496d-9920-f2a097d42b91.webp",
      "assets/courses/course-005/8de58bb7-3725-4e15-84f3-860413d894ec.webp",
      "assets/courses/course-005/90ad867d-de9c-4a27-8a58-b8e9b7bdc060.webp",
      "assets/courses/course-005/a1e518bf-c46a-40c0-a408-71f0162495f4.webp",
      "assets/courses/course-005/atmosphere.webp",
      "assets/courses/course-005/ce64ca95-e4b1-425c-8ca9-69a57d0b19ba.webp",
      "assets/courses/course-005/closing.webp",
      "assets/courses/course-005/contemplation.webp",
      "assets/courses/course-005/contemplative.webp",
      "assets/courses/course-005/cover.webp",
      "assets/courses/course-005/e96c9bbd-e7e0-4770-a850-2527e093869d.webp",
      "assets/courses/course-005/fdcbb514-c869-4f22-86a9-c70c1c417a29.webp",
      "assets/courses/course-005/journal.webp",
      "assets/courses/course-005/pedagogical.webp",
      "assets/courses/course-005/practice.webp",
      "assets/courses/course-005/safety.webp",
      "assets/courses/course-005/symbolic.webp"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 5; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
  }
})();