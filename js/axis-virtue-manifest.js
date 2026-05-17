window.AXIS_VIRTUE_CARDS = (function () {
  var virtues = window.AXIS_VERTUS;
  if (Array.isArray(virtues) && virtues.length) {
    return virtues.map(function (v) {
      return { number: v.number, title: v.nom, src: v.src };
    });
  }
  var cards = [];
  for (var i = 1; i <= 72; i++) {
    cards.push({
      number: i,
      title: "Carte " + i,
      src: "assets/vertus/virtue_" + String(i).padStart(3, "0") + ".png"
    });
  }
  return cards;
})();
