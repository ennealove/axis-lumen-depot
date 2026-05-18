/* Axis Lumen Studio - Cours 008 images premium */
(function () {
  var images = {
    cover: "assets/courses/course-008/balancement_lateral_1.png",
    gallery: [
      "assets/courses/course-008/balancement_lateral_1.png",
      "assets/courses/course-008/balancement_lateral_2.png",
      "assets/courses/course-008/balancement_lateral_3.png",
      "assets/courses/course-008/balancement_lateral_4.png",
      "assets/courses/course-008/balancement_lateral_5.png",
      "assets/courses/course-008/balancement_lateral_6.png",
      "assets/courses/course-008/balancement_lateral_7.png",
      "assets/courses/course-008/balancement_lateral_8.png",
      "assets/courses/course-008/balancement_lateral_9.png"
    ]
  };

  var list = Array.isArray(window.AXIS_ONE_HOUR_COURSES) ? window.AXIS_ONE_HOUR_COURSES : [];
  var course = list.find(function (c) { return Number(c.number) === 8; });
  if (course) {
    course.image      = images.cover;
    course.coverImage = images.cover;
    course.images     = Object.assign({}, course.images || {}, images);
    course.pdfPremium = true;
    course.pdf        = course.pdf || {};
    course.pdf.title  = "Balancement latéral initiatique — ILLI et le rythme de 2 secondes";
    course.pdf.protectedNotice = "Support pédagogique réservé aux élèves de l'École du Temple Vivant — Axis Lumen Studio.";
  }
})();