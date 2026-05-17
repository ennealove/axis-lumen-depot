(function () {
  'use strict';

  var BALANCEMENTS = [
    {
      swing:    'lateral',
      symbol:   '↔',
      title:    'Balancement latéral',
      mantra:   'ILLI',
      cours:    'Cours 8',
      desc:     'Gauche-droite, une seconde par côté. ILLI résonne dans le haut du crâne et active les deux hémisphères en alternance.'
    },
    {
      swing:    'vertical',
      symbol:   '↕',
      title:    'Balancement vertical',
      mantra:   'ALLA',
      cours:    'Cours 9',
      desc:     'Élévation et ancrage en alternance. ALLA traverse le centre de la gorge au cœur et structure l\'axe vertical.'
    },
    {
      swing:    'ap',
      symbol:   '⇄',
      title:    'Balancement antéro-postérieur',
      mantra:   'ELLU',
      cours:    'Cours 10',
      desc:     'Avant pour s\'engager, arrière pour recevoir. ELLU arrondit l\'espace intérieur en sphère de présence.'
    }
  ];

  var RESPIRATIONS = [
    {
      jour:   1,
      symbol: '◌',
      title:  'Observation naturelle',
      rythme: '4 — 0 — 4 — 0',
      cours:  'Cours 16',
      desc:   'Écoute du souffle sans intervention. Reprendre contact avec la respiration abdominale naturelle.'
    },
    {
      jour:   4,
      symbol: '⬡',
      title:  'Respiration carrée',
      rythme: '4 — 4 — 4 — 4',
      cours:  'Cours 19',
      desc:   'Quatre temps égaux. Inspire, retiens, expire, vide. La symétrie parfaite apaise et centre profondément.'
    },
    {
      jour:   8,
      symbol: '∿',
      title:  'Pneumophène',
      rythme: '3 — 0 — 3 — 0',
      cours:  'Cours 23',
      desc:   'La légère faim d\'air produit un état de conscience élargie. Mantra AL-LA. Technique avancée de Dr. Lefebure.'
    }
  ];

  function renderSection() {
    var wrap = document.getElementById('axisPratiquesFondamentales');
    if (!wrap) return;

    var html =
      '<div class="axis-pf-header">' +
        '<div>' +
          '<p class="axis-pf-kicker">Pratiques fondamentales</p>' +
          '<h2 class="axis-pf-title">Exercices de balancement &amp; respiration — Livre d\'Exercices</h2>' +
          '<p class="axis-pf-subtitle">Disponibles dès maintenant, quel que soit ton avancement dans le parcours.</p>' +
        '</div>' +
      '</div>' +

      '<p class="axis-pf-section-title">Balancements</p>' +
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

    html += '</div>' +
      '<p class="axis-pf-section-title" style="margin-top:28px;">Respiration</p>' +
      '<div class="axis-pf-grid">';

    RESPIRATIONS.forEach(function (r) {
      html +=
        '<div class="axis-pf-card">' +
          '<div class="axis-pf-card-symbol">' + r.symbol + '</div>' +
          '<h3 class="axis-pf-card-title">' + r.title + '</h3>' +
          '<span class="axis-pf-card-mantra" style="font-size:.72rem;letter-spacing:.12em;">' + r.rythme + '</span>' +
          '<p class="axis-pf-card-desc">' + r.desc + '</p>' +
          '<span class="axis-pf-card-ref">' + r.cours + '</span>' +
          '<div class="axis-pf-card-footer">' +
            '<a href="exercice-respiration.html?jour=' + r.jour + '" class="axis-pf-btn primary">Pratiquer</a>' +
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
