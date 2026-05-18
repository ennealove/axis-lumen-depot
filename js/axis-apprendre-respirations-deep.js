/* Axis Lumen Studio — Enrichissement profond des cours de respiration (c019-c026)
   Sources : traités de respiration rythmique et pratiques respiratoires initiatiques.
   RÈGLE ABSOLUE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  function enrich(id, data) {
    var list = window.AXIS_ONE_HOUR_COURSES || [];
    var c = list.find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  // ── C019 — Respiration naturelle ─────────────────────────────────────────
  enrich("c019", {
    exerciceUrl: "exercice-respiration.html?jour=1",
    jourRespiration: 1,
    teaching: {
      intro: "La respiration rythmique est la seule fonction de la vie végétative sur laquelle la volonté peut agir dans une large mesure. Elle établit la liaison entre notre vie de relation et notre vie végétative — c'est pourquoi elle occupe une place prépondérante dans toutes les formes d'auto-éducation connues depuis l'Antiquité.",
      sections: [
        {
          title: "La première condition : le repos préparatoire",
          content: "Avant tout exercice respiratoire, le repos est indispensable. Deux positions sont recommandées : assis sur une chaise sans s'appuyer sur le dossier, ou allongé sur un plan dur bien à plat. La relaxation musculaire doit être active et méthodique — on relâche un à un chaque groupe musculaire en suivant un circuit déterminé : jambe droite, bras droit, muscles de la tête, bras gauche, jambe gauche, muscles du tronc. Cette relaxation est à reprendre plusieurs fois, car dès que l'attention se détourne, certains muscles se retendent. Les meilleurs moments sont le réveil, avant que les tracas du jour n'affleurent, et le coucher."
        },
        {
          title: "Le rythme cardiaque comme métronome naturel",
          content: "Depuis des temps immémoriaux, les traditions orientales pratiquent la respiration rythmée en se basant sur les pulsations cardiaques. La pulsation cardiaque est l'unité naturelle du temps physiologique : elle lance chaque fois la même quantité de sang vers les cellules, quelle que soit la durée réelle entre deux battements. Prendre son pouls au poignet (assis) ou sentir le cœur dans la poitrine (couché, mains sur l'épigastre) permet de rythmer la respiration sur ce métronome vivant. Le rythme de départ : inspiration 4 pulsations — apnée pleine 1 — expiration 4 — apnée vide 1. Progressivement : 7/1/7/1."
        },
        {
          title: "Rythme, fatigue et repos — la clé physiologique",
          content: "La fatigue est engendrée par deux activités arythmiques : celle de la tête (sensorielle, dirigée du monde extérieur vers nous) et celle des membres (musculaire, dirigée de nous vers le monde). Entre les deux, unissant tête et membres, se place l'activité du tronc : circulation, respiration, digestion — essentiellement rythmiques. Ces activités rythmiques n'engendrent pas la fatigue, c'est pourquoi le sommeil repose même si le cœur et les poumons continuent de travailler. De là, la règle : un travail rythmé fatigue moins qu'un travail arythmique. La respiration rythmique, en imposant le rythme au souffle, diffuse progressivement ce calme à l'ensemble du système nerveux."
        },
        {
          title: "Les effets observables dès les premières semaines",
          content: "Le premier effet de la respiration rythmique est l'augmentation de la relaxation musculaire pendant l'exercice. Le cours des pensées se ralentit, l'esprit se calme et tend à se fixer sur une seule idée. Sur le sommeil : pratiqué le soir (au moins 15 à 20 minutes), le sommeil survient plus rapidement, devient plus profond et plus reposant. Après quelques semaines d'entraînement, les rêves agités diminuent souvent de façon notable. Sur la circulation périphérique : les extrémités froides se réchauffent, les troubles de la circulation s'améliorent. Ces effets ne peuvent être jugés après un seul exercice — il faut quelques semaines de travail régulier pour les apprécier pleinement."
        },
        {
          title: "La pensée rythmée pendant l'exercice",
          content: "Pour rendre l'exercice durable et éviter la somnolence qui perturbe le rythme, le praticien peut remplacer le comptage par une phrase intérieure : un mot par pulsation, l'ensemble de la phrase couvrant exactement une phase respiratoire. La pensée choisie doit être élévante et agréable. Le cerveau, mieux oxygéné et recevant davantage de sang pendant la respiration rythmique, rend les pensées plus intenses et plus vibrantes — la durée de l'exercice est donc le moment le plus propice pour le développement de l'intelligence et de la sensibilité."
        }
      ]
    }
  });

  // ── C020 — Respiration diaphragmatique ────────────────────────────────────
  enrich("c020", {
    exerciceUrl: "exercice-respiration.html?jour=2",
    jourRespiration: 2,
    teaching: {
      intro: "La respiration complète utilise les trois zones du poumon dans une séquence précise. Elle est le fondement de tous les exercices respiratoires avancés. Sans maîtrise de la respiration diaphragmatique isolée, toutes les techniques de rythme restent superficielles.",
      sections: [
        {
          title: "Les trois modes respiratoires — anatomie fonctionnelle",
          content: "La respiration complète se décompose en trois modes qui se succèdent sans interruption : 1) Costal supérieur — élève les côtes supérieures et le sternum, active le sommet du poumon. C'est le seul mode qui agit favorablement sur les mécanismes cérébraux supérieurs, raison pour laquelle on commence par lui. 2) Costal moyen — écarte les côtes moyennes, dilate la partie centrale. 3) Diaphragmatique — abaisse le diaphragme, fait bomber la paroi abdominale, et réalise un puissant massage hépatique, rénal et intestinal."
        },
        {
          title: "Le massage des organes intérieurs par le diaphragme",
          content: "Le foie est accolé au diaphragme et monte à chaque inspiration. Si ce mouvement est accentué — surtout si à l'expiration on creuse fortement l'abdomen — on réalise un véritable massage hépatique : augmentation de la circulation dans le foie, accélération des processus chimiques, stimulation de la sécrétion de la bile. De même pour les reins, visibles à la radioscopie qui montent et s'abaissent avec le diaphragme. Les sécrétions rénales doublent voire quintuplent pendant une demi-heure de respiration diaphragmatique. Pour le côlon transverse et les intestins, le massage diaphragmatique est un remède naturel contre certaines constipations. En cas de respiration chroniquement thoracique, ces organes ne reçoivent jamais ce massage vital."
        },
        {
          title: "Bonne respiration vs mauvaise respiration — la distinction clé",
          content: "Dans la bonne respiration, à l'inspiration, la paroi abdominale avance passivement sous l'effet de la descente du diaphragme, la cage thoracique s'élargit activement. À l'expiration, les côtes s'abaissent et l'abdomen se creuse. Dans la mauvaise respiration — très répandue — le mouvement est inversé : on gonfle les côtes puis on creuse l'abdomen en fin d'inspiration (ce qui fait tourbillonner l'air déjà vicié à l'intérieur du poumon sans en faire entrer de frais). L'erreur est imperceptible de l'extérieur mais ses conséquences sur 20 ans de vie respiratoire sont profondes. La règle simple : quand tu inspires, ton ventre avance — quand tu expires, ton ventre rentre."
        },
        {
          title: "L'ordre du remplissage : commencer par le haut",
          content: "Il existe deux thèses sur l'ordre de remplissage : commencer par le bas (plus naturel et logique, comme remplir un flacon) ou commencer par le haut. L'étude des mécanismes cérébraux montre que la respiration par le sommet du poumon est la seule qui régularise et améliore le fonctionnement cérébral. Raison pratique : les sommets pulmonaires, sans exercices spéciaux, travaillent beaucoup moins que le reste des poumons — c'est d'ailleurs là que débutent la plupart des pathologies pulmonaires. Commencer par le haut à l'inspiration et finir par le haut à l'expiration fait travailler plus longtemps cette zone critique."
        },
        {
          title: "Apprendre la respiration diaphragmatique isolée",
          content: "Pour les pratiquants qui peinent à dissocier les mouvements : expirer complètement, puis serrer une ceinture au niveau des côtes inférieures. On se trouve alors contraint de respirer uniquement par le diaphragme. Avancer et creuser l'abdomen alternativement permet de sentir l'air entrer et sortir sous le seul jeu du diaphragme. L'expérience prouve qu'une fois l'habitude prise, le praticien peut vivre avec la seule respiration abdominale — à condition de ne pas se livrer à des efforts physiques exagérés. Cinq minutes matin et soir suffisent à transformer la respiration de fond en quelques semaines."
        }
      ]
    }
  });

  // ── C021 — Respiration carrée ─────────────────────────────────────────────
  enrich("c021", {
    exerciceUrl: "exercice-respiration.html?jour=4",
    jourRespiration: 4,
    teaching: {
      intro: "La respiration carrée — quatre temps parfaitement égaux — est considérée par les traditions respiratoires comme le rythme qui procure la meilleure relaxation et améliore le caractère et les relations sociales. Sa structure sinusoïdale en fait le rythme le plus proche du cercle parfait dans la classification des rythmes respiratoires.",
      sections: [
        {
          title: "La classification des rythmes respiratoires vers le cercle",
          content: "Les rythmes respiratoires peuvent être classés selon leur distance au rythme circulaire — la sinusoïde parfaite que le yogi cherche à atteindre. Dans l'ordre croissant de perfection : 1) Triangulaire isocèle (inspiration = expiration, rétention = moitié), 2) Rectangulaire (expiration double de l'inspiration), 3) Triangulaire équilatérale (trois temps égaux), 4) Carrée (quatre temps égaux), 5) Circulaire (sinusoïde parfaite). Cette classification permet au praticien de savoir exactement où il se trouve dans sa progression — et quel est le prochain rythme vers lequel progresser."
        },
        {
          title: "La respiration carrée — 3e exercice fondamental",
          content: "Inspiration, rétention pleine, expiration, rétention vide — les quatre temps sont égaux. On peut commencer à 6 secondes par temps (6/6/6/6), progresser vers 8 secondes (8/8/8/8) et viser 12 secondes par temps pour les pratiquants confirmés. Ce rythme parfaitement pendulaire, d'un degré de symétrie égal à celui d'une sinusoïde, procure la meilleure relaxation musculaire. Il relève le niveau moral de l'affectivité et des rêveries. Il améliore le caractère et les relations sociales. C'est le seul des rythmes qui présente ces avantages spécifiques — la raison pour laquelle les traditions l'ont conservé pendant des millénaires."
        },
        {
          title: "Les deux rétentions — leur signification profonde",
          content: "La rétention pleine (poumons remplis) est un état de plénitude et de pression douce : le sang est maximallement oxygéné, la cage thoracique maintient le cœur dans les meilleures conditions de remplissage, une légère chaleur intérieure se propage. La rétention vide (poumons vides) est l'état opposé — un vide intérieur, une légère dépression, un espace de silence absolu. Les deux rétentions ensemble créent un contraste qui dynamise le cycle : le vide appelle le plein, et le plein aspire à se vider. Dans la pratique initiatique, la rétention vide est l'espace où la conscience peut observer sa propre existence sans le bruit du souffle."
        },
        {
          title: "Les effets physiologiques mesurables",
          content: "Pendant la rétention pleine, la pression qu'exerce la masse pulmonaire sur le cœur est minimale — le cœur se remplit plus facilement lors de la diastole. Cette mécanique favorise la circulation pulmonaire et décongestionne le foie. Pendant la rétention vide, la dépression atmosphérique intrapulmonaire favorise le dégagement des gaz dissous dans le sang. Ces deux rétentions, alternées avec des inspirations et expirations complètes, créent une 'vague sanguine' lente, ample et régulière — profondément différente de la respiration ordinaire. Le résultat est une irrigation cérébrale supérieure, dans un état de relaxation musculaire maximale."
        },
        {
          title: "La progression pratique — de 4×4 à 8×8",
          content: "Semaines 1-2 : 4 secondes par temps. Observer la symétrie, ne pas forcer. Semaines 3-4 : 5 secondes par temps, puis 6 secondes. La résistance à la rétention vide est normale les premiers jours — elle disparaît avec l'habitude. Après 4-6 semaines de pratique régulière : 8 secondes par temps (32 secondes par cycle complet). La règle fondamentale : ne jamais dépasser le rythme praticable sans effort. Si l'exercice demande de l'effort, le but principal est manqué — la sensation de repos, de bien-être, doit rester intacte pendant toute la durée."
        }
      ]
    }
  });

  // ── C022 — Respiration triangulaire ──────────────────────────────────────
  enrich("c022", {
    exerciceUrl: "exercice-respiration.html?jour=5",
    jourRespiration: 5,
    teaching: {
      intro: "La respiration triangulaire est le premier rythme dans la classification vers le cercle. Elle supprime une rétention (ou les deux selon la version) et crée un effet directionnel : montante (triangulaire ascendante) pour l'activation, descendante (triangulaire descendante) pour l'apaisement. C'est l'outil thérapeutique le plus souple de la famille respiratoire.",
      sections: [
        {
          title: "Triangulaire isocèle — le rythme le plus accessible",
          content: "Inspiration en 8 secondes — rétention pleine 4 secondes — expiration 8 secondes. Pas de rétention vide. Ce rythme contient un axe de symétrie (symbolisé par un triangle inscrit dans un cercle). L'absence de rétention vide le rend accessible même aux débutants qui trouvent inconfortable le vide du souffle. L'effet est activant : l'énergie s'accumule pendant la rétention pleine et se libère lors de l'expiration. Ce rythme correspond au 'Pranayama' des traditions hindoues dans sa forme la plus accessible — inspiration équivalente à l'expiration, rétention intermédiaire."
        },
        {
          title: "L'exercice dépresseur — calmer l'agitation",
          content: "Pour les états d'excitation, d'anxiété ou d'agitation : inspiration courte (3 pulsations cardiaques) — apnée courte (1) — expiration très longue (12 pulsations). Ce rythme reproduit le schéma du sommeil (expiration relativement plus longue que l'inspiration) — et par un mécanisme comparable au réflexe conditionnel, reproduire ce rythme à l'état de veille tend à faire apparaître le calme. À pratiquer 3 minutes, répétable jusqu'à 12 fois dans la journée. Après les premiers exercices, l'effet est momentané ; avec la persévérance (quelques semaines), l'amélioration devient durable et stable."
        },
        {
          title: "L'exercice tonifiant — sortir de la dépression",
          content: "Pour les états de dépression, de léthargie ou de manque d'élan : inspiration très longue (12 pulsations) — apnée courte (1) — expiration courte (3 pulsations). L'inverse exact du rythme dépresseur. Physiologiquement, une inspiration longue suivie d'une expiration rapide agite légèrement le système nerveux — c'est son mécanisme d'action. L'exercice stimulant combine les deux : 3 minutes de dépresseur, puis immédiatement 3 minutes de tonifiant. Le contraste des deux effets rend plus vif l'effet stimulant du second."
        },
        {
          title: "La progression vers la triangulaire équilatérale",
          content: "La triangulaire équilatérale est la version avancée : trois temps strictement égaux (inspiration = rétention = expiration, sans rétention vide). Par exemple : 6/6/6 ou 8/8/8. Ce rythme est plus difficile que la triangulaire isocèle et marque un passage vers la respiration carrée. La triangulaire équilatérale se distingue du carré par l'absence de la rétention vide — ce qui en fait un rythme de montée et d'accumulation plutôt que d'équilibre et de repos. Elle prépare le système nerveux à la symétrie complète du carré, sans encore y plonger."
        },
        {
          title: "Usage initiatique — tenir la plénitude",
          content: "Dans la perspective initiatique, la rétention pleine est l'espace dans lequel on apprend à 'tenir' ce que l'on vient de recevoir — sans le déverser immédiatement. C'est une qualité fondamentale dans toute forme de développement : la capacité à retenir une inspiration, une révélation, une joie, avant de la partager. Le triangulaire, en maintenant le pratiquant dans la plénitude (poumons pleins) sans rétention vide, entraîne cette capacité. Au bout de quelques semaines, la différence se ressent dans la vie quotidienne : on parle moins vite, on réagit avec plus de distance, on 'digère' les expériences avant d'agir."
        }
      ]
    }
  });

  // ── C023 — Respiration rectangulaire ─────────────────────────────────────
  enrich("c023", {
    exerciceUrl: "exercice-respiration.html?jour=6",
    jourRespiration: 6,
    teaching: {
      intro: "La respiration rectangulaire possède deux axes de symétrie au lieu d'un seul (inspiration et expiration peuvent chacune être allongées ou raccourcies de façon symétrique). Elle est, dans la classification vers le cercle, plus proche du carré que la triangulaire. Son effet parasympathique profond en fait l'outil de prédilection pour induire la détente dans toutes les situations de stress.",
      sections: [
        {
          title: "Le ratio fondamental — l'expiration double de l'inspiration",
          content: "La forme la plus simple et la plus puissante : inspiration 4 secondes, expiration 8 secondes (ratio 1:2). Sans aucune rétention. Ce ratio active le nerf vague par un mécanisme simple : l'expiration prolongée stimule les barorécepteurs qui signalent au système nerveux que tout va bien, déclenchant la cascade parasympathique. En 5 à 10 minutes de ce seul exercice, la fréquence cardiaque ralentit, les muscles se relâchent, les pensées se calment. C'est neurophysiologiquement démontré et immédiatement vérifiable."
        },
        {
          title: "La rectangulaire profonde — diaphragme et circulation",
          content: "Dans la respiration rectangulaire profonde, le diaphragme intervient puissamment lors de l'expiration longue. L'air est chassé méthodiquement : d'abord les côtes supérieures s'abaissent, puis les côtes moyennes, enfin l'abdomen se creuse profondément. Cette expiration complète et lente réalise simultanément un massage hépatique, un drainage lymphatique abdominal, et une amélioration de la circulation dans toute la cavité pelvienne. La tradition yogique appelle cet effet 'apana' — le mouvement descendant de purification."
        },
        {
          title: "Rectangulaire et rythme cardiaque — les deux axes de symétrie",
          content: "La respiration rectangulaire peut s'exprimer de deux façons symétriques : expiration longue (1:2) pour le calme, ou inspiration longue (2:1) pour l'activation — c'est l'exercice tonifiant. Cette double polarité est ce qui lui confère ses deux axes de symétrie dans la classification géométrique. En pratique initiatique, on utilise rarement les deux dans la même séance : chaque axe correspond à un état recherché. La rectangulaire standard (expiration longue) est la plus utile dans 95% des situations — c'est elle qui est enseignée dans les forces d'urgence, les unités militaires d'élite et les protocoles anti-stress contemporains."
        },
        {
          title: "Les usages stratégiques — quand et comment",
          content: "Avant de dormir : 10-15 minutes de 4/8 permet d'entrer dans le sommeil avec un système nerveux déjà détendu — le sommeil est plus rapide et plus profond. Après un conflit ou une émotion forte : 5 minutes suffisent à réinitialiser le système nerveux. Au milieu d'une journée dense : une pause de 5 minutes recalibrate le cortisol et améliore la prise de décision. Avant une pratique méditative : 3-5 minutes de rectangulaire crée le substrat de calme nécessaire. Ce souffle est un outil de transition — il ne demande pas de conditions particulières, peut se faire assis à son bureau, et son effet est immédiatement mesurable (tension avant / après sur 10)."
        },
        {
          title: "Progression — de 4/8 à 6/12",
          content: "Semaine 1 : 4 secondes d'inspiration, 8 secondes d'expiration. 10 minutes par séance. Semaine 2 : 5/10 pour approfondir l'effet. Semaine 3-4 : 6/12, qui correspond à 2 cycles respiratoires par minute — l'une des fréquences les plus régulatrices pour le système nerveux autonome. Ne pas chercher à dépasser 6/12 sans raison : l'efficacité de la rectangulaire vient de sa régularité, pas de sa longueur. Un pratiquant qui fait 4/8 chaque soir pendant 6 mois obtiendra bien plus qu'un pratiquant qui fait 10/20 une fois par semaine."
        }
      ]
    }
  });

  // ── C024 — Le Pneumophène ─────────────────────────────────────────────────
  enrich("c024", {
    exerciceUrl: "exercice-respiration.html?jour=8",
    jourRespiration: 8,
    teaching: {
      intro: "La respiration spirituelle commence lorsqu'on associe une pensée à une respiration accompagnée d'une légère soif d'air permanente. Alors seulement, on perçoit ce que les traditions hindoues nomment le 'prâna' — le Souffle de l'Esprit. Les effets sont profonds, en rapport avec l'origine même de la vie consciente. Cette pratique, d'une durée minimale de vingt minutes, est la plus exigeante et la plus transformatrice de toutes les formes respiratoires.",
      sections: [
        {
          title: "La légère soif d'air — principe et mise en pratique",
          content: "La soif d'air est un léger manque d'air facilement tolérable — même agréable quand la technique est bien maîtrisée. Elle doit être constante pendant les quatre temps respiratoires : même à l'inspiration, on reprend suffisamment peu d'air pour maintenir sans interruption l'impression d'en manquer légèrement. Ce n'est pas une apnée forcée, ni un essoufflement — c'est un état subtil entre les deux. La porte est étroite : en deçà, on n'obtient que des effets physiques ordinaires ; au-delà (si le manque d'air provoque des spasmes ou de l'agitation), on brise l'état. Cet état doit être maintenu au minimum vingt minutes."
        },
        {
          title: "Les trois façons d'induire la légère privation d'air",
          content: "1) Allongement maximal du rythme : pratiquer un rythme plus long que sa capacité habituelle. Exemple : si on maîtrise le carré à 12 secondes, pratiquer le carré à 8 secondes mais sans inspirer complètement. 2) Diminution de l'amplitude : sur n'importe quel rythme, réduire la profondeur des mouvements de cage thoracique tout en maintenant le tempo. 3) Respiration superficielle : réduire progressivement l'amplitude jusqu'à des mouvements presque imperceptibles de la cage thoracique — c'est la 'respiration superficielle des lamas tibétains'. En pratique, on mélange ces trois approches selon les instants."
        },
        {
          title: "L'état de vie ralentie — ses signes et ses effets",
          content: "Quand la légère privation d'air est bien tenue, les muscles se détendent au maximum pour consommer moins d'oxygène — c'est une hyper-relaxation. Une sensation très agréable envahit tout le corps, surtout dans le système musculaire — sensation spécifique qu'aucune autre méthode ne peut procurer. On entre dans un certain degré de vie ralentie : après vingt minutes de cet état, on remarquera que les jambes sont 'en coton' quelques instants à la reprise de la marche. Cette vie ralentie n'est pas à craindre : par un phénomène de compensation très banal en biologie, la phase de ralentissement est toujours suivie d'une phase d'intensification."
        },
        {
          title: "Le parallèle avec le jeûne — le retournement vers l'intérieur",
          content: "Le jeûne est à l'activité digestive ce que la légère privation d'air est à l'activité respiratoire : un retournement vers l'intérieur. Le jeûneur qui se prive de nourriture voit son imagination portée vers la nourriture — de même, se priver légèrement d'air facilite l'imagination de l'air intérieur, du souffle comme phénomène de conscience. Ce parallèle explique pourquoi les grandes traditions spirituelles combinent souvent le jeûne et des pratiques respiratoires spéciales : les deux disciplines convergent vers le même retournement de l'attention, du monde extérieur vers le monde intérieur."
        },
        {
          title: "Protocole de séance — début, milieu, fin",
          content: "Début de séance : obtenir la légère privation d'air par le plus grand allongement possible du rythme — inspirations et expirations très longues, légèrement exagérées par rapport à sa capacité. Milieu de séance : suivre l'intuition, observer attentivement les effets sur le système musculaire, chercher le rythme le plus favorable à l'établissement de la vie ralentie. Fin de séance : quand l'organisme s'est adapté, terminer par la respiration superficielle qui permet d'aller plus loin dans le ralentissement biologique. Durée minimale : 20 minutes. Optimale : 45 minutes. Contre-indications : après alcool, après repas copieux, en hypoglycémie, en état de grande fatigue physique."
        }
      ]
    }
  });

  // ── C025 — Intégration respiratoire complète ──────────────────────────────
  enrich("c025", {
    exerciceUrl: "exercice-respiration.html",
    teaching: {
      intro: "La séance d'intégration est le sommet de la famille respiratoire. Elle enchaîne les cinq rythmes dans une progression logique qui suit la classification vers le cercle. Chaque rythme prépare le suivant, et l'ensemble crée une expérience de conscience que la pratique isolée de chaque rythme ne peut pas atteindre.",
      sections: [
        {
          title: "La progression logique — du triangle au cercle",
          content: "La séquence d'intégration suit la classification des rythmes par ordre croissant de symétrie : Triangulaire (activation, un axe de symétrie) → Rectangulaire (apaisement, deux axes) → Carrée (équilibre parfait, quatre axes) → Pneumophène (légère privation d'air, conscience aiguisée). Chaque transition est naturelle : le triangulaire active et prépare le système respiratoire ; le rectangulaire apaise l'excitation créée ; le carré équilibre et stabilise ; le pneumophène exploite l'état de calme pour approfondir la conscience. La séquence prend 55-60 minutes, avec 5 minutes de silence final."
        },
        {
          title: "La continuité comme principe — pas de rupture entre les rythmes",
          content: "Dans la séance d'intégration, les transitions entre les rythmes se font sans interruption du souffle. On glisse progressivement d'un rythme à l'autre en modifiant les durées de phases. Par exemple, pour passer du triangulaire (8/4/8) au rectangulaire (4/8) : on rallonge progressivement l'expiration sur 3 à 4 cycles, tout en raccourcissant l'inspiration, sans jamais briser le tempo. Cette fluidité empêche le système nerveux de 'sortir' de l'état induit — c'est elle qui rend la séance d'intégration plus puissante que la somme de ses parties."
        },
        {
          title: "Associer une pensée à chaque rythme",
          content: "La tradition enseigne d'associer une intention précise à chaque phase de la séance. Pendant le triangulaire : une pensée activante (un projet, une résolution). Pendant le rectangulaire : une pensée apaisante (gratitude, paix, pardon). Pendant le carré : une pensée de présence pure (juste être ici, juste respirer). Pendant le pneumophène : laisser la pensée se dissoudre — ne plus choisir, juste observer ce qui émerge dans cet état de légère privation d'air. La tradition appelle cet état de réception 'le vide actif' : pas d'absence, mais une présence maximale sans objet spécifique."
        },
        {
          title: "Effets cumulatifs — ce que la pratique séparée ne produit pas",
          content: "La séance d'intégration produit des effets que la pratique isolée de chaque rythme ne produit pas, notamment par effets de contraste : après 15 minutes de triangulaire (activant), les 15 minutes de rectangulaire (apaisant) produisent un calme plus profond que si on avait commencé directement par le rectangulaire. De même, le carré après le rectangulaire atteint une profondeur de symétrie rarement accessible sans cette préparation. Et le pneumophène en fin de séance, dans un organisme déjà rythmé et détendu, produit des états de conscience qualitativement différents de ceux du pneumophène pratiqué seul."
        },
        {
          title: "La séance d'intégration comme rite — son usage optimal",
          content: "Une à deux fois par semaine, la séance d'intégration est un rite complet. Les cinq autres jours, on pratique les rythmes séparément. C'est cette alternance — profondeur le week-end, régularité en semaine — qui construit une transformation durable. La séance d'intégration peut aussi servir de point de référence : on compare l'état induit d'une séance à l'autre, mois après mois, et on observe comment cet état évolue. Ce suivi subjectif rigoureux est l'un des instruments les plus fins pour mesurer l'avancement d'une pratique intérieure."
        }
      ]
    }
  });

  // ── C026 — Programme 15 jours Complet ─────────────────────────────────────
  enrich("c026", {
    exerciceUrl: "exercice-programme-15j-complet.html",
    teaching: {
      intro: "Le programme de 15 jours complet est la synthèse des deux familles fondamentales de la pratique : balancement et respiration. Chaque jour, une séance de balancement suivie d'une pratique respiratoire. Ce double travail quotidien produit une transformation profonde en deux semaines — plus qu'un an de pratique irrégulière.",
      sections: [
        {
          title: "Pourquoi deux semaines — la durée minimale de transformation",
          content: "Deux semaines de pratique régulière représentent approximativement 14 cycles complets de renouvellement du glycogène musculaire, 3 cycles de renouvellement des neurotransmetteurs de base, et le délai minimal observé pour qu'un changement de comportement commence à se consolider dans les voies neuronales. En dessous de deux semaines, les effets sont réels mais réversibles. À partir de la troisième semaine, ils commencent à devenir le nouveau 'point de base'. Le programme de 15 jours est donc conçu pour atteindre précisément ce seuil."
        },
        {
          title: "La logique de la séquence — balancement puis respiration",
          content: "Le balancement est pratiqué en premier car il mobilise le corps, synchronise les hémisphères et prépare le système nerveux à un état réceptif. La respiration suit immédiatement, dans cet état préparé : elle trouve un terrain plus fertile que si elle était pratiquée à froid. Dans cet ordre, les deux disciplines se potentialisent mutuellement : le balancement ouvre, la respiration approfondit. L'ordre inverse (respiration puis balancement) serait possible mais moins efficace — la respiration induit un calme que le balancement disperserait partiellement."
        },
        {
          title: "La progression sur 15 jours — construction et consolidation",
          content: "Jours 1-5 (Installation) : rythmes simples, durées courtes, priorité à la régularité. Jours 6-10 (Approfondissement) : rythmes plus complexes, durées plus longues, début des effets durables. Jours 11-15 (Consolidation) : retour aux rythmes fondamentaux mais à une profondeur inaccessible en début de programme. Ce retour aux bases en fin de programme n'est pas une régression — c'est une vérification : le même exercice pratiqué avec un organisme entraîné produit une expérience qualitativement différente."
        },
        {
          title: "Le carnet de bord — instrument de mesure et de mémoire",
          content: "Chaque jour : 3 mots pour décrire l'état post-pratique + une note de 1 à 10 sur la qualité de cet état. Cette discipline simple crée une courbe de progression visible. Le carnet révèle les jours de résistance (note basse malgré la pratique) et les jours d'accélération (note haute inattendue). Ces variations sont des informations précieuses sur les cycles personnels du praticien. Le bilan final (jour 15) : comparer la note moyenne des 5 premiers jours avec celle des 5 derniers. La différence est la mesure objective de la transformation accomplie."
        },
        {
          title: "Recommandation — deux fois par an comme mise à jour intérieure",
          content: "Ce programme est recommandé deux fois par an — en début de printemps et en début d'automne — comme 'mise à jour' intérieure. Il représente l'équivalent d'une retraite de méditation intensive, mais intégrée dans la vie quotidienne. Entre ces deux cycles, la pratique quotidienne de 15-20 minutes (balancement ou respiration, alternés) maintient les bénéfices acquis. La régularité est la force de ce programme : ce n'est pas l'intensité qui transforme, c'est la répétition consciente, jour après jour, qui creuse progressivement un sillon nouveau dans l'être."
        }
      ]
    }
  });

})();
