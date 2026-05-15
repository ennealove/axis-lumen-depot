(function () {
  'use strict';

  var BALANCEMENTS = [
    {
      swing:    'lateral',
      symbol:   '↔',
      title:    'Balancement latéral',
      mantra:   'ILLI',
      cours:    'Cours 38, 39, 40',
      desc:     'Gauche-droite, une seconde par côté. ILLI résonne dans le haut du crâne et active les deux hémisphères en alternance.'
    },
    {
      swing:    'vertical',
      symbol:   '↕',
      title:    'Balancement vertical',
      mantra:   'ALLA',
      cours:    'Cours 41, 42',
      desc:     'Élévation et ancrage en alternance. ALLA traverse le centre de la gorge au cœur et structure l\'axe vertical.'
    },
    {
      swing:    'ap',
      symbol:   '⇄',
      title:    'Balancement antéro-postérieur',
      mantra:   'ELLU',
      cours:    'Cours 43',
      desc:     'Avant pour s\'engager, arrière pour recevoir. ELLU arrondit l\'espace intérieur en sphère de présence.'
    }
  ];

  function renderSection() {
    var wrap = document.getElementById('axisPratiquesFondamentales');
    if (!wrap) return;

    var html =
      '<div class="axis-pf-header">' +
        '<div>' +
          '<p class="axis-pf-kicker">Pratiques fondamentales</p>' +
          '<h2 class="axis-pf-title">Exercices de balancement — Livre d\'Exercices</h2>' +
          '<p class="axis-pf-subtitle">Disponibles dès maintenant, quel que soit ton avancement dans le parcours.</p>' +
        '</div>' +
      '</div>' +
      '<div class="axis-pf-grid">';

    BALANCEMENTS.forEach(function (b) {
      html +=
        '<div class="axis-pf-card">' +
          '<div class="axis-pf-card-symbol">' + b.symbol + '</div>' +
          '<h3 class="axis-pf-card-title">' + b.title + '</h3>' +
          '<span class="axis-pf-card-mantra">' + b.mantra + '</span>' +
          '<p class="axis-pf-card-desc">' + b.desc + '</p>' +
          '<span class="axis-pf-card-ref">' + b.cours + '</span>' +
          '<div class="axis-pf-card-footer">' +
            '<a href="exercice-balancement.html?swing=' + b.swing + '" class="axis-pf-btn primary">Générer la séance</a>' +
          '</div>' +
        '</div>';
    });

    html += '</div>';
    wrap.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderSection);
  } else {
    renderSection();
  }
})();
