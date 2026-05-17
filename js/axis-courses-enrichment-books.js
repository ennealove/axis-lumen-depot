// axis-courses-enrichment-books.js
// Enrichissement des cours avec les connaissances des livres sources
// Distille les enseignements des 21 livres de la bibliothèque selon les règles absolues :
// — Aucun nom d'auteur, de titre, de marque ou de terme breveté
// — Termes universels, phénoménologiques, scientifiques courants
// — Ton contemplatif, direct, chaleureux

(function () {
  "use strict";

  // ── Enrichissements par numéro de cours ──────────────────────────────────
  var ENRICHMENTS = {

    // ─────────────────────────────────────────────────────────────────────
    // COURS 1 — La loi des deux secondes
    // ─────────────────────────────────────────────────────────────────────
    1: {
      deepTeaching: {
        titre: "La physiologie du rythme de deux secondes",
        contenu: "Le cerveau humain oscille naturellement entre ses deux hémisphères sur une période d'environ deux secondes. Cette alternance — vérifiée par observation directe de l'image rémanente en mouvement — est la fréquence d'entrée naturelle du traitement croisé de l'information. Quand un balancement corporel respecte ce rythme, il n'impose pas une contrainte au cerveau : il entre en résonance avec une loi déjà présente. C'est pourquoi l'effort est minimal et l'attention se stabilise naturellement. Cette synchronisation entre mouvement et fonctionnement cérébral est la clé physiologique de toute la pratique qui suit."
      },
      scienceNote: "Des mesures réalisées en laboratoire ont montré que l'image rémanente obtenue après contemplation d'une source lumineuse suit exactement ce rythme de deux secondes dans son oscillation spontanée gauche-droite. C'est le baromètre vivant de l'alternance hémisphérique de chaque individu."
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 41 — Balancement latéral (cours 8 dans le nouvel ordre = pos 8)
    // ─────────────────────────────────────────────────────────────────────
    41: {
      deepTeaching: {
        titre: "Le balancement latéral : physiologie et tradition",
        contenu: "Le balancement de gauche à droite active alternativement les deux hémisphères cérébraux sur le rythme fondamental de deux secondes. L'hémisphère gauche traite l'analyse, le langage, la séquence ; l'hémisphère droit traite la synthèse, l'image, le global. Leur alternance rythmée produit une coopération qui amplifie simultanément la mémoire, la créativité et l'intuition. Ce n'est pas une métaphore : des mesures directes sur l'image rémanente en mouvement ont montré que c'est précisément à ce rythme que l'alternance hémisphérique se produit. Les traditions qui utilisent ce balancement (prière oscillante, récitation rythmée) ont découvert empiriquement ce que la physiologie confirme aujourd'hui."
      },
      mantra: {
        nom: "ILLI",
        explication: "Le son ILLI place la langue haute et antérieure contre le palais dur, créant une vibration naturellement latérale. Sa double consonne produit une pulsation qui accompagne le mouvement gauche-droite. La répétition ILLI-ILLI-ILLI synchronise la vibration sonore avec l'alternance hémisphérique activée par le balancement.",
        technique: "Vibrer doucement ILLI sur chaque expiration pendant le balancement. Intensité très douce — presque un murmure intérieur. La vibration se ressent dans le haut du crâne et les tempes."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 42 — Balancement vertical
    // ─────────────────────────────────────────────────────────────────────
    42: {
      deepTeaching: {
        titre: "Le balancement vertical : axe et élévation",
        contenu: "Le balancement tête-pelvis active l'axe vertébral comme axe vivant de la pratique. La colonne vertébrale n'est pas seulement un support mécanique : elle conduit les influx nerveux entre le cerveau et le corps, elle protège la moelle épinière, et elle participe à la circulation du liquide céphalo-rachidien. Un balancement vertical doux mobilise doucement ce liquide, améliore la nutrition du cerveau et active une perception de l'axe intérieur que toutes les traditions contemplatives ont décrit sous différents noms. Le balancement avant-arrière et haut-bas active aussi les zones cérébrales liées à la proprioception et à l'équilibre."
      },
      mantra: {
        nom: "ALLA",
        explication: "Le son ALLA ouvre la bouche et descend le larynx — c'est la voyelle la plus ouverte de la phonétique. Sa vibration part du cœur de la gorge et s'étend vers le bas du corps puis remonte. La double consonne 'LL' ancre ce mouvement dans le centre de la bouche. ALLA-ALLA-ALLA crée une ouverture-fermeture qui accompagne naturellement l'axe vertical.",
        technique: "Gorge ouverte pendant la vibration. Son descendant sur l'expiration, naturellement amplifié par le relâchement du buste vers le bas dans le balancement."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 43 — Balancement antéro-postérieur
    // ─────────────────────────────────────────────────────────────────────
    43: {
      deepTeaching: {
        titre: "Le balancement antéro-postérieur : temps et intégration",
        contenu: "Le balancement avant-arrière est le plus profond des trois balancements fondamentaux. Il correspond à l'axe du temps dans l'espace tridimensionnel : l'avant est le futur, l'arrière est le passé, le présent est le point d'équilibre entre les deux. Ce balancement active les zones cérébrales liées à la mémoire épisodique (mouvement vers l'arrière) et à la projection anticipatrice (mouvement vers l'avant). Il est associé dans de nombreuses traditions à l'état de veille dans le sommeil — le dédoublement conscient — car il correspond précisément à l'axe d'intégration de l'expérience intérieure et extérieure."
      },
      mantra: {
        nom: "ELLU",
        explication: "ELLU combine E (son médio-haut, avant de la bouche) et U (son arrondi, arrière de la bouche). Cette transition E→U crée un voyage phonétique avant-arrière dans la cavité buccale — miroir exact du balancement antéro-postérieur du corps. La consonne LL lie les deux voyelles dans une vibration continue qui traverse tout l'espace buccal.",
        technique: "Attention à la transition E→U : sentir la voyelle passer de l'avant vers l'arrière de la bouche. Vibration dans la gorge et l'arrière du palais. Associer ce mouvement sonore au mouvement corporel."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 44-48 — Balancements avancés
    // ─────────────────────────────────────────────────────────────────────
    44: {
      deepTeaching: {
        titre: "La rotation : le quatrième axe",
        contenu: "La rotation corporelle autour de l'axe vertical est le quatrième mouvement fondamental, qui combine et synthétise les trois balancements. Contempler un point en rotation lente et régulière imprime à la pensée un mouvement tourbillonnaire analogue. Ce mouvement mental, une fois établi, active des couches profondes de traitement cérébral. La rotation douce mobilise aussi le liquide céphalo-rachidien, améliore la nutrition du cerveau et régule le sommeil. Les traditions qui utilisent la rotation rituelle (derviche, danse sacrée, prière tournante) ont découvert empiriquement ces effets sur un fondement qui est aujourd'hui physiologiquement explicable."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 51-53 — Respiration
    // ─────────────────────────────────────────────────────────────────────
    51: {
      deepTeaching: {
        titre: "La respiration rythmique : pont entre volonté et corps",
        contenu: "La respiration est le seul processus du système végétatif (autonome) que la volonté peut moduler directement. Tous les autres processus — rythme cardiaque, digestion, circulation — sont hors de notre contrôle conscient direct. Mais la respiration obéit à la volonté tout en restant autonome quand l'attention se relâche. Cette double appartenance en fait un pont privilégié : en modulant la respiration, on module indirectement le système nerveux végétatif tout entier. Une respiration lente et rythmée active le système parasympathique (détente, récupération, présence), alors qu'une respiration rapide et haute active le sympathique (stress, réaction, contraction). Le choix du rythme respiratoire est donc une commande directe sur l'état du milieu intérieur."
      },
      homologie: "La respiration est l'homologue physiologique de la volonté. Ce principe, vérifié par observation directe sur de nombreux sujets, explique pourquoi les pratiques spirituelles de toutes les traditions associent systématiquement la respiration à l'intention, à la décision et à la transformation intérieure."
    },

    52: {
      deepTeaching: {
        titre: "La respiration carrée : équilibre et maîtrise",
        contenu: "La respiration carrée (4 temps égaux : inspire, rétention poumons pleins, expire, rétention poumons vides) impose un cadre mathématique au souffle. Ce cadre n'est pas arbitraire : il force une égalité parfaite entre les quatre phases respiratoires, ce qui produit une stabilisation du système nerveux autonome. La rétention poumons pleins active légèrement le système sympathique (énergie, présence) ; la rétention poumons vides active le parasympathique profond (relâchement, réceptivité). L'alternance équilibrée des deux états produit une régulation fine que les respirations unilatérales ne permettent pas."
      }
    },

    53: {
      deepTeaching: {
        titre: "La légère soif d'air : le souffle comme gardien",
        contenu: "Maintenir une légère soif d'air — allonger légèrement les expirations sans retenir, juste effleurer le seuil de la reprise — active une dimension plus fine du souffle que les respirations ordinaires. Ce n'est pas de l'apnée ni de la rétention : c'est simplement ne pas précipiter l'inspiration quand l'expiration est terminée. Ce micro-intervalle, répété sur 10 à 20 minutes, produit une présence accrue, une légèreté corporelle et une qualité d'attention que les élèves décrivent comme 'le souffle qui regarde'. Cette technique est le fondement de nombreuses pratiques contemplatives orientales et occidentales, reconnue sous différents noms dans toutes les traditions qui travaillent le souffle."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 54 — Mantras complet
    // ─────────────────────────────────────────────────────────────────────
    54: {
      deepTeaching: {
        titre: "Comment un mantra agit physiologiquement",
        contenu: "Un mantra agit par trois voies physiologiques distinctes. La conduction osseuse : les vibrations sonores se propagent directement dans les os du crâne, contournant l'oreille externe, atteignant le cerveau avec plus de fidélité qu'un son aérien. Le nerf vague : le larynx est innervé par le nerf vague (Xème nerf crânien), qui régule le rythme cardiaque, la digestion et l'état parasympathique. Vibrer un mantra stimule directement ce nerf, induisant un état de calme et de présence. La modulation respiratoire : tout mantra vibre sur l'expiration, allongeant naturellement le souffle et produisant une cohérence cardiaque. Ces trois voies d'action expliquent l'efficacité documentée des pratiques vocales dans toutes les traditions contemplatives."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 57-64 — Clairvoyance
    // ─────────────────────────────────────────────────────────────────────
    57: {
      deepTeaching: {
        titre: "Clairvoyance : cadre, sobriété et vérification",
        contenu: "La clairvoyance — dans le sens large de perception intérieure plus fine que la perception ordinaire — n'est pas un don réservé à quelques-uns. C'est une sensibilité du milieu intérieur qui se développe avec la régularité de la pratique et la qualité du terrain. Elle se manifeste d'abord sous des formes très simples : une impression juste sur une situation, une image intérieure qui précède un événement, une sensation dans le corps qui donne une information fiable. Ces manifestations sont ordinaires et ne justifient aucune interprétation spectaculaire. La condition de leur développement est strictement liée à deux facteurs : la qualité du terrain (corps sain, pratique régulière, carnet honnête) et l'absence d'ego dans leur interprétation."
      },
      protocole: "Toute impression perçue pendant la pratique est à noter sans interprétation immédiate. L'interprétation se fait uniquement après vérification extérieure possible. Ce qui ne peut pas être vérifié est noté mais suspendu — ni affirmé, ni nié."
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 65-72 — Clair-ressenti
    // ─────────────────────────────────────────────────────────────────────
    65: {
      deepTeaching: {
        titre: "Le clair-ressenti : une information du corps, pas un message de l'au-delà",
        contenu: "Le clair-ressenti est la capacité à percevoir des informations par voie non sensorielle ordinaire — une impression de l'état d'une personne, d'un lieu, d'une situation. Avant tout développement de cette capacité, il est essentiel de comprendre sa nature réelle : c'est une amplification de la sensibilité intéroceptive (ce que le corps ressent de l'intérieur) et proprioceptive (le sens de la position et de l'espace). Le corps enregistre des informations subtiles avant que la conscience analytique les traite. Le clair-ressenti, c'est l'accès à ces enregistrements corporels préconscients. Ce n'est pas mystérieux : c'est une compétence qui se développe avec la pratique honnête et la neutralité."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 73-80 — Guidance
    // ─────────────────────────────────────────────────────────────────────
    73: {
      deepTeaching: {
        titre: "La guidance intérieure : distinguer la voix réelle du bruit mental",
        contenu: "La guidance intérieure — les impressions, images, sons ou phrases qui semblent venir d'une source plus profonde que la pensée ordinaire — est un phénomène authentique que de nombreuses traditions ont reconnu et travaillé. Mais elle est aussi le territoire de la plus grande confusion : le désir de recevoir une guidance peut fabriquer ce qu'il attend. La distinction entre guidance réelle et projection de l'ego s'apprend progressivement, par une règle simple : la guidance réelle ne renforce pas l'ego, ne flatte pas, ne justifie pas des décisions déjà prises, et ne crée pas de dépendance à sa propre répétition. Elle est sobre, brève et souvent inattendue."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 81-88 — Télépathie et recherche
    // ─────────────────────────────────────────────────────────────────────
    81: {
      deepTeaching: {
        titre: "Télépathie et capacités extrasensorielles : protocole de recherche",
        contenu: "Les capacités extrasensorielles — télépathie, précognition, clairvoyance à distance — sont traitées dans l'École du Temple Vivant comme un domaine de recherche expérimentale, non comme une croyance à adopter ou à rejeter. Le protocole est celui de la science : hypothèse (telle personne a reçu telle impression), test (vérification par confrontation), résultat (confirmation, infirmation, ou ambiguïté), note (dans le carnet, sans embellissement). Ce protocole protège l'élève contre deux erreurs opposées : l'inflation (tout est perçu, tout est signe) et le déni (rien n'est possible, tout est imaginé). La réalité se trouve dans les données accumulées sur des mois, pas dans une expérience isolée."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 89-96 — Protection énergétique
    // ─────────────────────────────────────────────────────────────────────
    89: {
      deepTeaching: {
        titre: "La protection : une hygiène intérieure, pas une magie",
        contenu: "La protection énergétique est comprise dans l'École du Temple Vivant comme une hygiène de la présence intérieure — pas comme un bouclier magique contre des forces extérieures. Ce qui protège réellement : la régularité de la pratique (qui stabilise le terrain intérieur), la sobriété de l'interprétation (qui évite l'amplification de l'ordinaire), la clôture systématique des séances (qui ferme les états ouverts), et la clarté des intentions (qui oriente l'énergie vers le constructif). Ces quatre éléments constituent une protection réelle et vérifiable — bien plus fiable que n'importe quel symbole ou rituel appliqué mécaniquement."
      }
    },

    // ─────────────────────────────────────────────────────────────────────
    // COURS 97-104 — Eau informée
    // ─────────────────────────────────────────────────────────────────────
    97: {
      deepTeaching: {
        titre: "L'eau comme milieu d'information",
        contenu: "L'eau est le solvant universel du vivant — elle transporte ions, molécules, informations électriques et énergétiques. Sa structure moléculaire (liaisons hydrogène) lui permet de former des configurations temporaires qui enregistrent des patterns d'information. Cette propriété, étudiée depuis les années 1980 dans plusieurs laboratoires, explique pourquoi l'intention, le son, la lumière et le contact affectent mesurément la structure de l'eau et ses effets biologiques. Dans la pratique, l'eau 'informée' par une intention consciente et répétée constitue un support d'imprégnation que de nombreuses traditions ont utilisé sous le nom d'eau bénite, eau consacrée, eau mémorisée."
      }
    },

  };

  // ── Applique les enrichissements à AXIS_ONE_HOUR_COURSES ─────────────────
  function applyEnrichments() {
    if (!window.AXIS_ONE_HOUR_COURSES) return;
    window.AXIS_ONE_HOUR_COURSES.forEach(function (course) {
      var n = Number(course.number);
      var enr = ENRICHMENTS[n];
      if (!enr) return;

      // Ajouter deepTeaching comme nouvelle section dans teaching
      if (enr.deepTeaching) {
        if (!course.teaching) course.teaching = { sections: [] };
        if (!course.teaching.sections) course.teaching.sections = [];
        // Ajouter seulement si pas déjà présent
        var exists = course.teaching.sections.some(function (s) {
          return s.title === enr.deepTeaching.titre;
        });
        if (!exists) {
          course.teaching.sections.push({
            title: enr.deepTeaching.titre,
            content: enr.deepTeaching.contenu,
            type: 'physiologique',
          });
        }
      }

      // Ajouter mantra info si présent
      if (enr.mantra && course.teaching) {
        if (!course.teaching.mantra) {
          course.teaching.mantra = enr.mantra;
        }
      }

      // Ajouter note scientifique
      if (enr.scienceNote) {
        course.scienceNote = enr.scienceNote;
      }

      // Ajouter homologie
      if (enr.homologie) {
        course.homologie = enr.homologie;
      }

      // Ajouter protocole
      if (enr.protocole) {
        course.protocole = enr.protocole;
      }
    });
  }

  applyEnrichments();

})();
