/* Axis Lumen Studio — Enrichissement premium — Partie 3 (cours 40-75)
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  function enrich(id, data) {
    var list = window.AXIS_ONE_HOUR_COURSES || [];
    var c = list.find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  // ── C040 — Terrain vivant : eau, sang, souffle, minéraux ──────────────────
  enrich("c040", {
    longSummary: "Le terrain biologique — cet ensemble de paramètres qui détermine la qualité du milieu intérieur de l'organisme — est la fondation oubliée de toute pratique spirituelle sérieuse. Un terrain acide, déshydraté, déminéralisé ou surchargé de toxines est un mauvais conducteur de la pratique : les états de conscience restent superficiels, la rémanence est courte, la fatigue est chronique. Prendre soin du terrain, c'est prendre soin du temple.\n\nCe cours explore les quatre composantes fondamentales du terrain vivant : l'eau (hydratation et qualité), le sang (composition et fluidité), le souffle (oxygénation et pH), et les minéraux (conductivité électrique et transmission cellulaire). Ces quatre éléments sont interdépendants — améliorer l'un améliore les autres. Et chacun peut être mesuré, suivi et optimisé sans médicament ni technologie coûteuse.",
    pedagogicalObjective: "Comprendre les quatre composantes du terrain vivant et leur impact direct sur la qualité des pratiques de conscience.",
    initiaticObjective: "Accepter la responsabilité totale de la qualité de son temple intérieur — et commencer à agir en conséquence.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Bois un grand verre d'eau fraîche avant de commencer. C'est le premier acte de soin du terrain." },
      { time: "5–20 min",  title: "Enseignement",  content: "Les quatre composantes du terrain : eau, sang, souffle, minéraux. Comment ils interagissent. Les signes d'un terrain dégradé." },
      { time: "20–40 min", title: "Auto-évaluation", content: "Questionnaire de terrain : hydratation (combien de litres/jour ?), alimentation (vivante ou morte ?), respiration (thoracique ou abdominale ?), minéralisation (signes de carences ?)." },
      { time: "40–50 min", title: "Plan d'action",  content: "Établis ton plan de terrain pour les 7 prochains jours : un changement par domaine, réaliste et concret." },
      { time: "50–57 min", title: "Carnet",        content: "Note ton état de terrain actuel. Ce sera ton point de comparaison dans 30 jours." },
      { time: "57–60 min", title: "Clôture",       content: "Un dernier verre d'eau. Le premier acte de soin du terrain est aussi simple que ça." }
    ],
    keyPhrase: "Le meilleur outil spirituel est un corps bien hydraté, bien minéralisé et bien oxygéné.",
    journalQuestions: [
      "Quelle est la composante de ton terrain que tu néglige le plus — et qu'est-ce qui t'en empêche ?",
      "Si ton terrain était une plante, serait-elle en train de fleurir, de survivre ou de dépérir — et que lui faudrait-il ?",
      "As-tu déjà remarqué un lien entre ton alimentation ou ton hydratation et la qualité de tes pratiques de conscience ?"
    ]
  });

  // ── C041 — Alimentation fraîche ────────────────────────────────────────────
  enrich("c041", {
    longSummary: "L'alimentation vivante — fruits, légumes frais, graines germées, herbes — apporte non seulement des nutriments mais aussi de l'information biologique : des enzymes actives, des photons biophotoniques, et une structure d'eau organisée que les aliments cuits ou transformés ne contiennent plus. Cette 'vie' dans les aliments est mesurable par biophotonique et corrèle directement avec la vitalité de celui qui les consomme.\n\nCe cours n'est pas un cours de diététique — c'est un cours sur la relation entre la qualité de la nourriture et la qualité de la conscience. Il explique pourquoi les grandes traditions spirituelles recommandent une alimentation légère avant la pratique, comment certains aliments 'alourdissent' la conscience et d'autres la 'clarifient', et comment construire une alimentation qui soutient une pratique intérieure sérieuse sans tomber dans l'orthorexie.",
    pedagogicalObjective: "Comprendre la relation entre alimentation vivante et qualité de la conscience, et construire une approche alimentaire soutenant la pratique.",
    initiaticObjective: "Manger comme un praticien : non pas pour satisfaire l'appétit mais pour nourrir le temple.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Qu'as-tu mangé aujourd'hui ? Note-le. Avec quel niveau d'attention as-tu choisi ces aliments ?" },
      { time: "5–20 min",  title: "Enseignement",  content: "Alimentation vivante vs morte. Biophotonique alimentaire. La digestion comme pratique d'alchimie. Les aliments qui alourdissent vs clarifient." },
      { time: "20–40 min", title: "Pratique",      content: "Manger une petite quantité d'un aliment vivant (pomme, carotte, herbe fraîche) avec une attention totale : couleur, odeur, texture, saveur, sensation en avalant." },
      { time: "40–50 min", title: "Contemplation", content: "Après avoir mangé avec attention, ferme les yeux. Observe ce que le corps ressent 5 minutes après cet aliment vivant." },
      { time: "50–57 min", title: "Carnet",        content: "Dresse la liste des aliments que tu manges régulièrement et classe-les : vivants / neutres / alourdissants." },
      { time: "57–60 min", title: "Clôture",       content: "Un verre d'eau citronnée. Le citron est l'un des grands alcalinisants du terrain." }
    ],
    keyPhrase: "Tu n'es pas ce que tu manges — tu es la qualité de conscience que ta nourriture nourrit.",
    journalQuestions: [
      "Quel changement alimentaire simple (pas un régime radical — juste un petit changement) pourrais-tu faire dès demain ?",
      "As-tu remarqué que tu pratiques mieux certains jours ? Existe-t-il une corrélation avec ce que tu as mangé ?",
      "Si tu traitais chaque repas comme une préparation à la pratique, qu'est-ce que tu arrêterais de manger immédiatement ?"
    ]
  });

  // ── C042 — Émonctoires ─────────────────────────────────────────────────────
  enrich("c042", {
    longSummary: "Les émonctoires sont les voies naturelles d'élimination de l'organisme : le foie (filtration principale), les reins (élimination urinaire), les intestins (transit), la peau (sudation), et les poumons (CO2 et vapeur d'eau). Quand ces voies sont surchargées ou obstruées, les toxines reflux dans le sang et le tissu interstitiel — créant ce 'bruit de fond' biologique qui perturbe toutes les pratiques de conscience.\n\nCe cours n'est pas de la naturopathie — c'est de la physique du temple intérieur. Un praticien qui prend soin de ses émonctoires ne tombe pas malade aussi souvent, récupère plus vite, dort mieux et pratique avec une clarté que les pratiquants qui négligent ce domaine ne comprennent pas toujours pourquoi ils n'atteignent pas.",
    pedagogicalObjective: "Comprendre le rôle des cinq émonctoires et leur impact sur la clarté des pratiques de conscience.",
    initiaticObjective: "Prendre soin de ses voies d'élimination comme acte de respect envers le temple qui abrite la conscience.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappel des 5 émonctoires. Lequel tu penses être le plus surchargé en ce moment ?" },
      { time: "5–20 min",  title: "Enseignement",  content: "Les 5 émonctoires, leurs signes de surcharge, et les gestes simples pour les soutenir sans médicament." },
      { time: "20–40 min", title: "Auto-bilan",    content: "Bilan des 5 émonctoires : intestins (transit régulier ?), reins (urine claire ?), foie (digesttion facile ?), peau (transpiration naturelle ?), poumons (souffle profond ?)." },
      { time: "40–55 min", title: "Plan de soutien", content: "Un geste de soutien par émonctoire pour les 7 prochains jours. Simples, réalistes, vérifiables." },
      { time: "55–60 min", title: "Clôture",       content: "L'eau tiède citronnée le matin : le premier geste de soutien hépatique le plus simple qui soit." }
    ],
    keyPhrase: "Un temple dont les portes d'évacuation sont bouchées accumule ce qu'il devrait libérer.",
    journalQuestions: [
      "Quel émonctoire est le plus sollicité dans ta vie — et quel comportement crée cette surcharge ?",
      "As-tu remarqué des périodes dans ta vie où ton corps élimidait mieux — et qu'est-ce qui était différent ?",
      "Si les émonctoires sont les 'portes de sortie' du corps, quelles sont les portes de sortie émotionnelles que tu utilises (ou bloques) ?"
    ]
  });

  // ── C043 — rH², pH et résistivité ─────────────────────────────────────────
  enrich("c043", {
    longSummary: "Le pH (acidité), le rH² (potentiel d'oxydo-réduction) et la résistivité (conductivité électrique) sont les trois paramètres qui permettent de prendre une 'photo' du terrain biologique à un instant donné. Ces mesures, réalisables à domicile avec du matériel simple, donnent une vision objective de l'état du milieu intérieur — et permettent de suivre l'évolution de ce milieu en réponse aux pratiques alimentaires, respiratoires et méditatives.\n\nCe cours est un cours de mesure : comment prendre ces mesures correctement, comment les interpréter, et comment les utiliser pour orienter sa pratique quotidienne. Un praticien qui mesure son terrain régulièrement ne travaille plus à l'aveugle — il dispose d'un tableau de bord biologique qui guide ses choix avec précision.",
    pedagogicalObjective: "Maîtriser la prise et l'interprétation des trois mesures du terrain (pH, rH², résistivité) pour guider la pratique.",
    initiaticObjective: "Devenir un praticien qui mesure, vérifie et ajuste — non pas un croyant mais un expérimentateur de sa propre biologie.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Si tu as du matériel de mesure, fais tes mesures maintenant avant le cours. Elles serviront de référence." },
      { time: "5–20 min",  title: "Enseignement",  content: "pH : acide/basique. rH² : oxydé/réduit. Résistivité : conducteur/isolant. Plages optimales. Comment les mesurer." },
      { time: "20–40 min", title: "Interprétation", content: "Cas pratiques : que signifie pH urinaire de 5,5 ? rH² de 28 ? Résistivité de 500 ohms ? Table de correspondance terrain-pratique." },
      { time: "40–55 min", title: "Plan de mesure", content: "Protocole de suivi : quand mesurer, comment noter, comment interpréter les tendances sur 30 jours." },
      { time: "55–60 min", title: "Clôture",       content: "Si tu n'as pas encore de matériel, fais la liste du matériel minimal nécessaire et décide d'une date d'achat." }
    ],
    keyPhrase: "Ce qui peut être mesuré peut être amélioré — et ce qui est amélioré dans le terrain est amélioré dans la conscience.",
    journalQuestions: [
      "As-tu déjà mesuré ton terrain ? Si oui, qu'as-tu découvert ? Si non, qu'est-ce qui te retient ?",
      "Existe-t-il des habitudes dans ta vie dont tu sais déjà qu'elles acidifient ton terrain, mais que tu maintiens quand même ?",
      "Si tu pouvais 'voir' ton terrain comme un indicateur en temps réel, qu'est-ce que tu changerais immédiatement ?"
    ]
  });

  // ── C044 — Électrolytes, sel complet et conductivité ─────────────────────
  enrich("c044", {
    longSummary: "Les électrolytes — sodium, potassium, magnésium, calcium, chlore — sont les ions qui permettent à l'eau du corps d'être conductrice de l'information électrique. Sans électrolytes, l'eau est pure mais inerte. Avec électrolytes en bonne proportion, l'eau du corps devient un supraconducteur biologique capable de transmettre des signaux nerveux, hormonaux et bioélectriques à la vitesse de la lumière.\n\nLe sel complet (non raffiné, contenant les 84 minéraux naturels de l'eau de mer) est l'un des outils les plus simples et les plus puissants pour rééquilibrer les électrolytes. Ce cours explique pourquoi le sel raffiné est un problème et le sel complet une solution, comment équilibrer les électrolytes sans suppléments coûteux, et comment la minéralisation optimale améliore directement la qualité et la profondeur des états méditatifs.",
    pedagogicalObjective: "Comprendre le rôle des électrolytes dans la conductivité du terrain et savoir les optimiser par l'alimentation.",
    initiaticObjective: "Traiter la minéralisation du corps avec le même soin qu'on traite la préparation d'une séance — les deux sont de l'hygiène du temple.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Quand as-tu mangé du sel pour la dernière fois ? Du sel complet ou du sel raffiné ? La différence est considérable." },
      { time: "5–20 min",  title: "Enseignement",  content: "Les électrolytes et la conductivité de l'eau. Sel raffiné vs sel complet. Les 84 minéraux de l'eau de mer. Signes de carence en électrolytes." },
      { time: "20–40 min", title: "Pratique",      content: "Préparation d'eau minéralisée maison : eau filtrée + pincée de sel complet + trace de citron. Boire lentement en prenant conscience de chaque gorgée." },
      { time: "40–55 min", title: "Intégration",   content: "Méditation courte : imaginer l'eau minéralisée circulant dans chaque cellule, portant l'information électrique qui permet la conscience." },
      { time: "55–60 min", title: "Clôture",       content: "Remplace chez toi le sel raffiné par du sel complet. Acte simple, impact durable." }
    ],
    keyPhrase: "L'eau sans électrolytes ne conduit rien — le corps sans minéraux ne transmet rien.",
    journalQuestions: [
      "Utilises-tu du sel complet ou du sel raffiné ? Si du raffiné, qu'est-ce qui t'empêche de changer ?",
      "As-tu déjà ressenti les signes d'une carence en électrolytes (crampes, fatigue, brouillard mental) sans le reconnaître comme telle ?",
      "Si tu traitais ton eau quotidienne comme une pratique de terrain, comment changerais-tu ta façon de boire ?"
    ]
  });

  // ── C045 — Jeûne juste et temps sans manger ────────────────────────────────
  enrich("c045", {
    longSummary: "Le jeûne n'est pas une privation — c'est une clarification. Pendant les périodes sans manger, le corps active des processus de nettoyage (autophagie), d'équilibrage (régulation glycémique) et de réparation (protection des cellules nerveuses) qui ne peuvent pas fonctionner quand le tube digestif est en permanence occupé à digérer. Pour le praticien, le jeûne intermittent est l'un des outils les plus puissants pour clarifier le terrain avant une pratique intensive.\n\nCe cours présente trois approches adaptées à des niveaux différents : le simple décalage du premier repas (jeûne 14-16 heures), le repas unique le soir (jeûne 20 heures), et le jeûne hydrique de 24 heures occasionnel. Aucune de ces approches ne nécessite de volonté extraordinaire — elles nécessitent de comprendre ce que le corps fait pendant ces périodes, et de faire confiance à ce processus.",
    pedagogicalObjective: "Comprendre le principe du jeûne intermittent comme clarification du terrain et savoir choisir l'approche adaptée à son niveau.",
    initiaticObjective: "Expérimenter que l'absence de nourriture est un espace de clarification — pas un manque à combler.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Quelle est ta relation au jeûne — familière, angoissante, indifférente ? Honnêteté sans jugement." },
      { time: "5–20 min",  title: "Enseignement",  content: "L'autophagie et le nettoyage cellulaire. Le jeûne 14h, 16h, 20h. La fenêtre alimentaire et l'énergie libérée pour la conscience." },
      { time: "20–40 min", title: "Pratique",      content: "Pratique de conscience du vide : méditation dans un état de légère faim (si possible) pour observer comment le mental réagit au vide digestif." },
      { time: "40–55 min", title: "Planification", content: "Choisis ton approche de jeûne pour les 7 prochains jours. Note l'heure du premier repas chaque jour." },
      { time: "55–60 min", title: "Clôture",       content: "Engage-toi pour 7 jours seulement. Pas un régime définitif — une expérience de clarification." }
    ],
    keyPhrase: "Le vide digestif n'est pas un manque — c'est l'espace dans lequel la conscience s'affine.",
    journalQuestions: [
      "As-tu déjà expérimenté le jeûne — même court ? Qu'as-tu ressenti dans les premières heures ?",
      "La faim est-elle pour toi une urgence à satisfaire ou un signal à observer ? La différence est fondamentale.",
      "Qu'est-ce que tu manges souvent non par faim mais par habitude, ennui ou anxiété — et que se passerait-il si tu te contenais d'observer ?"
    ]
  });

  // ── C046 — Recettes de clarification ──────────────────────────────────────
  enrich("c046", {
    longSummary: "Les protocoles alimentaires de clarification ne sont pas des 'régimes' — ce sont des préparations intentionnelles du temple avant une pratique intensive. Comme un musicien accorde son instrument avant un concert, le praticien prépare son terrain avant une séance ou une période de travail approfondi. Ces protocoles sont simples, économiques, et leurs effets sont mesurables en 24 à 48 heures.\n\nCe cours présente cinq recettes et protocoles : le jeûne de jus verts (clarification rapide), le mono-repas de riz brun (stabilisation digestive), le bouillon de minéraux (reminéralisation), le jeûne d'eau citronnée (nettoyage hépatique), et la fenêtre alimentaire stricte de 6 heures (clarification cognitive). Chacun est associé à un type de pratique spécifique pour un effet optimal.",
    pedagogicalObjective: "Maîtriser cinq protocoles alimentaires de clarification et savoir les associer aux pratiques appropriées.",
    initiaticObjective: "Traiter la préparation alimentaire avec la même intention que la préparation d'une séance — les deux sont du soin du temple.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappel : qu'as-tu mangé hier soir et ce matin ? Dans quel état ton système digestif se trouve-t-il en ce moment ?" },
      { time: "5–20 min",  title: "Enseignement",  content: "Les 5 protocoles de clarification. Quand les utiliser. Effets attendus et délais. Comment mesurer le résultat." },
      { time: "20–45 min", title: "Expérimentation", content: "Prépare et consomme le bouillon de minéraux (eau chaude + sel complet + citron + gingembre frais) en pratiquant une méditation simple simultanément." },
      { time: "45–55 min", title: "Observation",   content: "15 minutes après le bouillon : observer l'état du corps. Chaleur, légèreté, clarté ou non ?" },
      { time: "55–60 min", title: "Carnet",        content: "Planifie pour les 2 prochaines semaines : quel protocole, quel jour, avant quelle pratique." }
    ],
    keyPhrase: "Préparer son terrain, c'est agir sur la cause au lieu d'attendre que l'effet arrive.",
    journalQuestions: [
      "Quel protocole de clarification te semble le plus accessible à mettre en place dans ta vie actuelle ?",
      "As-tu déjà remarqué une différence dans ta clarté mentale selon ce que tu avais mangé — et quels aliments avaient le meilleur effet ?",
      "Si tu associais systématiquement une préparation alimentaire à tes pratiques importantes, qu'est-ce que cela changerait ?"
    ]
  });

  // ── C047 — Protocole terrain de sept jours ─────────────────────────────────
  enrich("c047", {
    longSummary: "Le protocole terrain de sept jours est une immersion complète dans le soin du milieu intérieur : chaque jour, une combinaison d'hydratation optimale, d'alimentation clarifiante, de soutien des émonctoires et de mesures du terrain. À la fin des sept jours, la différence est perceptible — dans l'énergie, la clarté mentale, la qualité du sommeil et la profondeur des pratiques de conscience.\n\nCe protocole n'est pas un 'cure miracle' — c'est une démonstration par l'expérience que le terrain peut être transformé rapidement par des interventions simples et cohérentes. Les effets qu'on croit permanents (fatigue chronique, brouillard mental, sensibilité émotionnelle) sont souvent des effets réversibles d'un terrain dégradé. Sept jours suffisent pour s'en convaincre.",
    pedagogicalObjective: "Compléter un protocole de terrain de sept jours et mesurer objectivement les changements dans le milieu intérieur et la qualité des pratiques.",
    initiaticObjective: "Vivre l'expérience directe que le soin du corps transforme la conscience — et non l'inverse.",
    minutePlan: [
      { time: "J1 matin",  title: "Mesures de base", content: "pH urinaire, prise de note de l'état général, qualité du sommeil, niveau d'énergie sur 10." },
      { time: "J1-7",      title: "Protocole quotidien", content: "2L d'eau citronnée / jour, alimentation 80% vivante, 15 min de respiration profonde matin et soir, soutien hépatique le matin." },
      { time: "J3",        title: "Bilan intermédiaire", content: "Mesures et comparaison avec J1. Premiers effets perceptibles ?" },
      { time: "J7",        title: "Bilan final",    content: "Mesures complètes, comparaison J1 vs J7, qualité des pratiques de la semaine." },
      { time: "J8",        title: "Intégration",    content: "Comment maintenir les gains sans rester dans un protocole strict permanent." },
      { time: "",          title: "",              content: "" }
    ],
    keyPhrase: "Sept jours de soin du terrain font voir ce que dix ans de méditation ne peuvent pas faire sans ce fondement.",
    journalQuestions: [
      "Quels sont les principaux changements que tu as observés entre le jour 1 et le jour 7 ?",
      "Quel aspect du protocole a été le plus difficile à maintenir — et qu'est-ce que cette difficulté révèle sur tes habitudes ?",
      "Après ce protocole, qu'est-ce que tu es prêt à garder dans ta vie quotidienne de façon permanente ?"
    ]
  });

  // ── C048 — Soleil visible et lumière intérieure ────────────────────────────
  enrich("c048", {
    longSummary: "Le soleil est la source de toute lumière sur Terre — et la seule source d'énergie qui ait nourri la vie depuis son origine. L'exposition consciente à la lumière solaire (non pas au soleil direct mais à sa luminosité diffuse) a des effets neurobiologiques documentés : production de sérotonine, régulation du cortisol, synchronisation de l'horloge circadienne et stimulation du système immunitaire. Ces effets ne sont pas secondaires à la pratique — ils en sont la fondation.\n\nCe cours établit le pont entre la lumière physique extérieure et la lumière de conscience intérieure. Cette relation n'est pas métaphorique : les mêmes structures cérébrales qui traitent la lumière physique sont impliquées dans les états de conscience lumineux. Observer la lumière avec attention crée une 'empreinte neurologique' qui reste active même dans l'obscurité — c'est la rémanence, et c'est le cœur de toute cette pratique.",
    pedagogicalObjective: "Comprendre la relation neurobiologique entre la lumière physique et les états de conscience lumineux, et l'utiliser comme fondation de pratique.",
    initiaticObjective: "Établir un rapport conscient et sacré avec la lumière — non comme phénomène physique mais comme enseignante.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Si possible, ouvre les yeux vers une fenêtre. Regarde simplement la lumière du ciel — sans chercher le soleil. Laisse la lumière venir à toi." },
      { time: "5–20 min",  title: "Enseignement",  content: "Le soleil et le cerveau : mélatonine, sérotonine, cortisol, rythme circadien. Lumière physique et lumière de conscience : même porte, deux côtés." },
      { time: "20–40 min", title: "Pratique",      content: "10 min d'observation de la lumière naturelle diffuse (ciel, fenêtre, bougie) → 10 min de rémanence yeux fermés → 10 min de contemplation." },
      { time: "40–50 min", title: "Comparaison",   content: "Pense à un jour nuageux passé dans une pièce sombre. Comment te sentais-tu ? Et maintenant ? La différence est mesurable — c'est neurobiologique." },
      { time: "50–57 min", title: "Carnet",        content: "Décris la trace lumineuse que tu vois actuellement — couleur, forme, intensité, durée. C'est ta rémanence personnelle." },
      { time: "57–60 min", title: "Clôture",       content: "Ouvre les yeux. La lumière de la pièce te touche maintenant différemment — tu sais ce qu'elle fait dans ton cerveau." }
    ],
    keyPhrase: "La lumière que tu observes dehors et la lumière que tu vois dedans sont la même lumière — vue de deux côtés du miroir.",
    journalQuestions: [
      "Quelle est ta relation quotidienne à la lumière naturelle — cherches-tu la lumière ou l'évites-tu instinctivement ?",
      "As-tu déjà remarqué l'effet de la lumière matinale sur ton humeur et ta capacité à pratiquer ?",
      "Si la lumière physique et la lumière de conscience sont liées, qu'est-ce que l'obscurité intérieure que tu vis parfois dit de ta relation à la lumière extérieure ?"
    ]
  });

  // ── C049 — Prudence oculaire et observation douce ──────────────────────────
  enrich("c049", {
    longSummary: "Les yeux sont les seuls organes de perception directement reliés au cerveau par une extension du tissu nerveux — le nerf optique. Ils sont aussi l'un des organes les plus fragiles du corps : la rétine ne se régénère pas en cas de brûlure sérieuse. Cette fragilité impose une règle absolue dans toute pratique lumineuse : jamais d'observation du soleil direct, jamais de lumière artificielle intense, toujours la prudence avant l'intensité.\n\nCe cours enseigne ce qu'il faut savoir sur la physiologie oculaire, les sources de danger à éviter, et les conditions d'une observation sécurisée et bénéfique : lumière naturelle diffuse, bougie à bonne distance, lampe de faible intensité. La prudence n'est pas une restriction — c'est la condition pour pratiquer longtemps et profondément.",
    pedagogicalObjective: "Maîtriser les règles de prudence oculaire pour pratiquer en toute sécurité sur le long terme.",
    initiaticObjective: "Protéger ses outils de pratique — les yeux — avec autant de soin qu'on protège son carnet ou son lieu de pratique.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Frotte les paumes, pose-les sur les yeux fermés. Chaleur douce. Tes yeux travaillent depuis ce matin — remercie-les." },
      { time: "5–20 min",  title: "Enseignement",  content: "Anatomie de l'œil : rétine, fovéa, nerf optique. Ce qui peut être endommagé. Sources de danger à éviter absolument. Sources sûres pour la pratique." },
      { time: "20–40 min", title: "Pratique",      content: "Observation guidée sécurisée : bougie à 1m (3 min) → lumière naturelle diffuse de fenêtre (5 min) → observation d'une plante ou d'un objet éclairé (5 min) → rémanence (10 min)." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, observe la différence entre les trois types d'observation : bougie, fenêtre, objet. Chacun produit une trace différente." },
      { time: "50–57 min", title: "Carnet",        content: "Dresse ta liste personnelle de sources d'observation sûres dans ton environnement habituel." },
      { time: "57–60 min", title: "Clôture",       content: "Paumes sur les yeux à nouveau. Remercie tes yeux pour tout ce qu'ils te permettent de voir." }
    ],
    keyPhrase: "On ne pratique pas l'observation lumineuse avec un regard qui force — on pratique avec un regard qui accueille.",
    journalQuestions: [
      "As-tu déjà pratiqué une observation lumineuse sans respecter les règles de prudence ? Qu'est-il arrivé ?",
      "Quelle source de lumière dans ton environnement quotidien pourrait devenir un support de pratique — une fenêtre, une bougie, la nature ?",
      "La prudence dans la pratique lumineuse — est-elle une limitation pour toi ou un signe de maturité initiatique ?"
    ]
  });

  // ── C050 — Rémanence lumineuse et système nerveux ─────────────────────────
  enrich("c050", {
    longSummary: "La rémanence lumineuse — cette trace colorée que l'œil conserve après avoir fixé une source de lumière — est bien plus qu'un simple phénomène optique. Elle est le signe visible d'un état neurologique précis : une activité accrue dans le cortex visuel et les structures limbiques associées à la conscience et à la plasticité. Pendant que la trace est présente, le cerveau est dans un état de réceptivité inhabituellement élevée.\n\nCe cours explore les mécanismes neurologiques de la rémanence : pourquoi elle dure ce qu'elle dure, pourquoi elle change de couleur (complémentarité chromatique), et surtout pourquoi elle est si précieuse pour la pratique. C'est dans cet état — pendant la trace — que l'apprentissage est le plus profond, que les intentions s'imprègnent le plus facilement, et que la conscience est la plus accessible à elle-même.",
    pedagogicalObjective: "Comprendre les mécanismes neurologiques de la rémanence lumineuse et apprendre à l'utiliser comme état de pratique optimal.",
    initiaticObjective: "Reconnaître la rémanence non comme un effet secondaire de l'observation mais comme l'espace de pratique lui-même.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Observe une bougie 1 minute. Ferme les yeux. Regarde la trace. Elle est là — tu es dans le bon état." },
      { time: "5–20 min",  title: "Enseignement",  content: "Mécanismes neurologiques de la rémanence : cônes et bâtonnets, complémentarité chromatique, activation du cortex visuel. Pourquoi la trace est précieuse." },
      { time: "20–45 min", title: "Pratique",      content: "5 cycles observation/rémanence avec durées progressives : 1 min / 3 min → 2 min / 5 min → 3 min / 8 min. Observer l'évolution de la trace dans chaque cycle." },
      { time: "45–55 min", title: "Contemplation", content: "Dans la trace du dernier cycle (la plus longue), dépose mentalement une intention. Reste immobile le plus longtemps possible." },
      { time: "55–60 min", title: "Carnet",        content: "Trace le cycle de rémanence : combien de temps dure la trace la plus longue ? De quelle couleur ? Quelle forme ?" }
    ],
    keyPhrase: "La trace lumineuse n'est pas ce qui reste après la pratique — c'est le cœur de la pratique elle-même.",
    journalQuestions: [
      "Combien de temps dure ta trace lumineuse typiquement — quelques secondes, une minute, plus longtemps ? Qu'est-ce que cela indique ?",
      "As-tu remarqué que la qualité de ta conscience est différente pendant la trace ? Comment la décris-tu ?",
      "Si la trace est l'espace de réceptivité maximale, quelle intention tu veux y déposer pour les prochaines semaines ?"
    ]
  });

  // ── C051 — Lumière du matin et rythme circadien ────────────────────────────
  enrich("c051", {
    longSummary: "L'horloge biologique humaine est synchronisée par la lumière du matin — principalement dans les 30 à 60 premières minutes après le lever du soleil. Cette lumière bleue-blanche de l'aube supprime la mélatonine, active la sérotonine et programme l'horloge interne pour les 24 heures suivantes. Un praticien qui s'expose à la lumière du matin s'assure des fondations neurobiologiques optimales pour toute la journée.\n\nCe cours explique le mécanisme du rythme circadien, pourquoi les écrans le soir le perturbent, comment utiliser l'exposition lumineuse matinale comme pratique spirituelle à part entière, et comment synchroniser sa routine de pratique avec les rythmes biologiques naturels pour maximiser les effets. La lumière du matin n'est pas un supplément santé — c'est la fondation de la conscience humaine quotidienne.",
    pedagogicalObjective: "Comprendre le rôle de la lumière matinale dans le rythme circadien et l'utiliser comme fondation de la pratique quotidienne.",
    initiaticObjective: "Accueillir chaque matin comme un acte conscient de synchronisation avec la lumière — entrer dans la journée plutôt que d'y tomber.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "À quelle heure tu te lèves habituellement ? À quelle heure tu vois la lumière du jour pour la première fois ? L'écart entre les deux est révélateur." },
      { time: "5–20 min",  title: "Enseignement",  content: "Le rythme circadien et ses mécanismes. La lumière bleue du matin. L'impact des écrans le soir. Comment programmer l'horloge biologique avec intention." },
      { time: "20–40 min", title: "Pratique",      content: "Simulation d'un rituel matinal complet : ouverture de fenêtre, 10 min de lumière naturelle diffuse (ou lumière de thérapie lumineuse), 5 min de respiration + 5 min de silence." },
      { time: "40–55 min", title: "Planification", content: "Concevoir son rituel matinal personnel : durée, heure, source de lumière, pratique associée." },
      { time: "55–60 min", title: "Clôture",       content: "Engage-toi pour 7 jours : 'Chaque matin, je m'expose à la lumière dans les 30 premières minutes.'" }
    ],
    keyPhrase: "Le praticien qui accueille la lumière du matin ne subit pas sa journée — il la programme.",
    journalQuestions: [
      "À quelle heure tu vois la lumière naturelle pour la première fois dans ta journée typique — et que devrais-tu changer ?",
      "As-tu remarqué une différence dans ta pratique les jours où tu t'es exposé tôt à la lumière vs les jours où tu ne l'as pas fait ?",
      "Le matin est souvent le moment le plus précieux pour la pratique — qu'est-ce qui te vole ce temps actuellement ?"
    ]
  });

  // ── C052 — Photons, attention et plasticité cérébrale ─────────────────────
  enrich("c052", {
    longSummary: "Les photons — les particules de lumière — interagissent avec le système nerveux à plusieurs niveaux. Au niveau de la rétine, ils déclenchent des signaux électriques qui voyagent vers le cortex visuel. Au niveau cellulaire, ils participent à la biophotonique — la communication inter-cellulaire par lumière que les biologistes commencent à documenter. Au niveau de la conscience, ils sont associés aux états d'éveil et d'attention amplifiée.\n\nCe cours explore la relation entre photons, attention et plasticité cérébrale : comment la pratique répétée de l'observation lumineuse crée des changements structurels dans le cerveau, pourquoi l'attention soutenue amplifie ces changements, et comment ces changements se cumulent avec le temps pour créer une conscience progressivement plus claire, plus stable et plus accessible.",
    pedagogicalObjective: "Comprendre comment la pratique répétée de l'observation lumineuse crée des changements neurologiques cumulatifs et durables.",
    initiaticObjective: "Pratiquer avec la confiance que chaque séance laisse une trace physique dans le cerveau — invisible mais réelle et cumulative.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Combien de séances d'observation lumineuse as-tu faites jusqu'ici ? Chaque séance a laissé une trace. Tu n'es pas le même qu'au début." },
      { time: "5–20 min",  title: "Enseignement",  content: "Neuroplasticité et lumière. Biophotonique cellulaire. Attention soutenue comme amplificateur des changements cérébraux." },
      { time: "20–40 min", title: "Pratique",      content: "Séance d'observation lumineuse avec attention totale : chaque seconde, maintenir l'attention sur la source. Si elle s'échappe — la ramener doucement." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, observe la qualité de ton attention. Est-elle plus stable qu'au début de ta pratique ?" },
      { time: "50–57 min", title: "Carnet",        content: "Trace l'évolution de ta qualité d'attention depuis le cours 1 jusqu'à aujourd'hui. Des progrès mesurables ?" },
      { time: "57–60 min", title: "Clôture",       content: "Rappelle-toi : chaque séance d'aujourd'hui facilite la séance de demain. La plasticité est une loi — utilise-la." }
    ],
    keyPhrase: "L'attention soutenue sur la lumière réorganise littéralement le cerveau — et cette réorganisation dure.",
    journalQuestions: [
      "Est-ce que tu crois que ta pratique de ces dernières semaines a physiquement changé quelque chose dans ton cerveau ? Sur quoi tu bases cette conviction ?",
      "Qu'est-ce qui est différent dans ta relation à la lumière depuis que tu pratiques — comment la vois-tu autrement ?",
      "Si la plasticité est la loi, que veux-tu que ton cerveau devienne dans 6 mois de pratique régulière ?"
    ]
  });

  // ── C053 — Lumière, sommeil et réparation ──────────────────────────────────
  enrich("c053", {
    longSummary: "Le sommeil est le moment où le cerveau effectue son travail de consolidation, de réparation et de nettoyage. Pendant le sommeil profond, le système glymphatique — un réseau de drainage cérébral récemment découvert — élimine les déchets métaboliques accumulés pendant la journée, y compris les protéines associées aux maladies neurodégénératives. Un sommeil de mauvaise qualité prive le praticien de sa fondation de conscience la plus précieuse.\n\nLa lumière joue un rôle central dans la qualité du sommeil : la lumière bleue des écrans le soir supprime la mélatonine et retarde l'endormissement. La pratique de coupure des écrans deux heures avant le coucher, associée à une lumière orangée/rouge le soir, est l'un des gestes les plus efficaces pour améliorer la qualité du sommeil et donc la qualité des pratiques du lendemain.",
    pedagogicalObjective: "Comprendre la relation entre lumière, mélatonine et qualité du sommeil, et mettre en place une hygiène lumineuse du soir.",
    initiaticObjective: "Traiter le sommeil avec le même soin que la pratique — car c'est pendant la nuit que la pratique du jour s'intègre.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "À quelle heure tu regardes un écran pour la dernière fois avant de dormir ? Et à quelle heure tu t'endors vraiment ?" },
      { time: "5–20 min",  title: "Enseignement",  content: "Le système glymphatique. La mélatonine et la lumière bleue. Sommeil profond et réparation neurale. Pourquoi les rêves sont importants pour le praticien." },
      { time: "20–40 min", title: "Pratique",      content: "Simulation d'une routine de soirée : coupure des écrans, lumière orangée, 5 min de respiration rectangulaire 4/8, pose au sol avec intention." },
      { time: "40–55 min", title: "Planification", content: "Concevoir sa routine de soirée personnelle : éclairage, coupure des écrans, pratique d'endormissement." },
      { time: "55–60 min", title: "Clôture",       content: "Cette nuit : applique ta nouvelle routine. Note demain matin si le sommeil était différent." }
    ],
    keyPhrase: "La nuit est le laboratoire où le cerveau intègre tout ce que la lumière du jour a semé.",
    journalQuestions: [
      "Comment qualifies-tu ton sommeil en ce moment — réparateur ou épuisant ? Qu'est-ce qui l'influence le plus ?",
      "As-tu déjà testé la coupure des écrans 2 heures avant de dormir ? Si oui, quel effet ? Si non, qu'est-ce qui t'en empêche ?",
      "Si le sommeil est l'espace d'intégration de la pratique, comment changes-tu ta façon de préparer ta nuit ?"
    ]
  });

  // ── C054 — Source lumineuse, intention et imprégnation ────────────────────
  enrich("c054", {
    longSummary: "L'imprégnation consciente par la lumière est une pratique à la croisée de la neurologie et de l'initiation : pendant que la trace lumineuse active la plasticité cérébrale, on dépose dans cet état de réceptivité maximale une intention précise. Cette intention n'est pas un vœu — c'est une instruction au système nerveux. Et parce qu'elle est formulée dans un état de conscience modifié (la rémanence), elle s'imprime plus profondément que n'importe quelle affirmation répétée en état ordinaire.\n\nCe cours enseigne la pratique complète de l'imprégnation lumineuse : comment choisir une intention efficace (concrète, positive, à court terme), comment la déposer dans la trace sans la forcer, et comment évaluer son effet sur les 24 à 48 heures suivantes. C'est l'une des pratiques les plus puissantes de l'école — et l'une des moins connues.",
    pedagogicalObjective: "Maîtriser la pratique d'imprégnation lumineuse : observation + rémanence + dépôt d'intention dans l'état de plasticité maximale.",
    initiaticObjective: "Utiliser la lumière non seulement pour se transformer mais pour se créer — en choisissant consciemment ce que l'on grave dans le cerveau.",
    minutePlan: [
      { time: "0–5 min",   title: "Intention",     content: "Formule une intention pour cette séance : une qualité à cultiver, un état à atteindre, une direction à prendre. Simple. Concrète. Positive." },
      { time: "5–30 min",  title: "Observation",   content: "Observation lumineuse douce 5 min. Ferme les yeux. Accueille la trace sans rien faire. Laisse l'état de réceptivité s'installer complètement." },
      { time: "30–45 min", title: "Imprégnation",  content: "Dans la trace, répète mentalement ton intention UNE FOIS — puis lâche. Ne force pas. La trace fait le travail. Reste dans le silence." },
      { time: "45–55 min", title: "Contemplation", content: "Observe ce qui se passe après le dépôt. La trace s'est-elle modifiée ? Quelque chose s'est-il 'allumé' ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note l'intention déposée et la date. Dans 48 heures, note ce qui a changé dans cette direction." }
    ],
    keyPhrase: "Dans l'état de la trace lumineuse, une intention vaut mille affirmations en état ordinaire.",
    journalQuestions: [
      "Quelle intention as-tu déposée — et pourquoi cette intention plutôt qu'une autre ?",
      "As-tu senti que l'intention 'prenait' pendant la trace, ou était-ce un acte de foi dans le processus ?",
      "48 heures après : qu'est-ce qui a changé dans la direction de l'intention déposée ?"
    ]
  });

  // ── C055 — Intégrer la lumière dans la journée ────────────────────────────
  enrich("c055", {
    longSummary: "Une pratique formelle de 30 à 60 minutes est précieuse — mais une pratique continue dans l'ordinaire de la journée est transformatrice. Ce cours enseigne comment créer une 'pratique de la lumière continue' : observer la lumière naturelle pendant quelques secondes à chaque heure, accueillir le soleil sur la peau comme une pratique de conscience, utiliser les moments de transition (lever, repas, coucher) comme micro-séances d'observation.\n\nLa lumière est partout — dans la bougie du soir, dans le reflet du soleil sur une surface, dans la luminosité d'un écran baissé au minimum. Apprendre à voir la lumière comme une pratique continue plutôt qu'un exercice occasionnel transforme la relation à chaque instant de la journée. Et cette relation transformée crée un état de conscience progressivement plus lumineux, plus stable, plus centré.",
    pedagogicalObjective: "Créer une pratique continue de la lumière dans la vie quotidienne à travers des micro-observations régulières.",
    initiaticObjective: "Vivre dans un état de pratique continue — où la séance formelle et la vie ordinaire ne sont plus deux choses séparées.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "La pratique continue vs la pratique formelle. Les micro-observations. Comment les intégrer sans forcer ni créer une obligation supplémentaire." },
      { time: "10–30 min", title: "Journée simulée", content: "Simulation d'une journée complète : matin (lumière naturelle), midi (pause solaire), soir (bougie), nuit (lumière orangée). Pratique de chaque moment." },
      { time: "30–50 min", title: "Planification", content: "Cartographier sa journée habituelle et identifier 5 moments naturels pour des micro-observations de 30 secondes." },
      { time: "50–57 min", title: "Carnet",        content: "Note les 5 moments choisis avec le type d'observation associé. Ce sera ton programme de pratique continue." },
      { time: "57–60 min", title: "Clôture",       content: "Regarde la lumière de la pièce maintenant. Voilà : tu pratiques déjà." }
    ],
    keyPhrase: "Quand chaque regard devient une pratique, la vie entière devient une initiation.",
    journalQuestions: [
      "Y a-t-il des moments dans ta journée où tu es déjà naturellement attentif à la lumière — et comment les approfondir ?",
      "Qu'est-ce qui te semble le plus difficile dans l'idée d'une pratique continue vs une pratique formelle ?",
      "Si tu vivais dans un état d'attention à la lumière 10% du temps de ta journée, qu'est-ce qui serait différent dans ta façon d'habiter le monde ?"
    ]
  });

  // ── C056 — Loi du rythme biologique ───────────────────────────────────────
  enrich("c056", {
    longSummary: "Le rythme est la première loi du vivant. Avant la forme, avant la structure, avant même la chimie, il y a le rythme — le battement qui distingue la vie de la non-vie. Le cœur bat, les poumons respirent, le cerveau oscille, les cellules se divisent, les hormones pulsent. Ces rythmes ne sont pas des accidents — ce sont les signatures d'une intelligence organisatrice qui s'exprime dans le temps.\n\nCe cours explore la loi du rythme biologique dans toutes ses dimensions : les rythmes ultradiens (moins de 24h), circadiens (24h) et infradiens (plus de 24h), leur interaction, leur perturbation par le mode de vie moderne, et leur restauration par la pratique consciente. Un praticien qui comprend ses propres rythmes biologiques peut planifier ses séances aux moments où son cerveau est le plus réceptif — et multiplier ainsi l'efficacité de sa pratique.",
    pedagogicalObjective: "Comprendre les trois familles de rythmes biologiques et apprendre à planifier la pratique en synchronie avec ses propres cycles.",
    initiaticObjective: "Entrer en accord avec les rythmes du vivant qui te traversent — et laisser ces rythmes guider ta pratique plutôt que de t'y opposer.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Sens ton pouls. Compte les battements pendant 10 secondes. Ce rythme est la fondation de tout ce qui va suivre." },
      { time: "5–20 min",  title: "Enseignement",  content: "Rythmes ultradiens (90 min), circadiens (24h) et infradiens (7, 28 jours). La fenêtre ultra-radienne optimale pour la pratique. Identifier ses propres rythmes." },
      { time: "20–40 min", title: "Auto-observation", content: "Journée de rythmes : noter à chaque heure son niveau d'énergie (1-10) et clarté mentale (1-10) pour cartographier sa propre courbe circadienne." },
      { time: "40–55 min", title: "Planification", content: "À partir de la courbe, identifier les 2-3 moments de la journée où l'énergie et la clarté sont au maximum. Ce sont tes fenêtres de pratique optimales." },
      { time: "55–60 min", title: "Clôture",       content: "Engage-toi à pratiquer pendant une semaine aux heures identifiées comme optimales." }
    ],
    keyPhrase: "Le praticien intelligent ne s'oppose pas à ses rythmes — il les surfe.",
    journalQuestions: [
      "À quelle heure de la journée te sens-tu le plus clair, le plus centré, le plus disponible pour la pratique ?",
      "Quelles habitudes de ta vie perturbent le plus tes rythmes biologiques naturels ?",
      "Si tu pratiquais systématiquement à l'heure de ta fenêtre optimale pendant 30 jours, quelle différence anticipes-tu ?"
    ]
  });

  // ── C057 — Alternance gauche-droite et attention ──────────────────────────
  enrich("c057", {
    longSummary: "L'alternance gauche-droite est un principe fondamental de l'architecture cérébrale humaine. Les deux hémisphères — gauche (logique, séquentiel, verbal) et droit (global, spatial, non-verbal) — fonctionnent en alternance naturelle dans des cycles d'environ 90 minutes. Cette alternance naturelle peut être amplifiée par des stimulations bilatérales rythmiques — comme le balancement latéral, la marche, ou certains mouvements oculaires.\n\nCe cours explore comment exploiter l'alternance hémisphérique pour optimiser l'apprentissage et la pratique intérieure. Les techniques EMDR (mouvement oculaire bilatéral) utilisées en thérapie, le tapotement bilatéral de la médecine chinoise, et les balancements de cette école partagent tous le même principe : activer les deux hémisphères alternativement pour créer une cohérence inter-hémisphérique qui facilite l'intégration et la transformation.",
    pedagogicalObjective: "Comprendre le principe de l'alternance hémisphérique et savoir l'utiliser comme outil d'équilibre cognitif et de pratique.",
    initiaticObjective: "Intégrer les deux aspects de sa conscience — logique et intuitif, mâle et femelle, solaire et lunaire — dans une alternance fluide et consciente.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Lequel des deux hémisphères domine dans ta vie actuelle — le logique ou l'intuitif ? Honnêtement." },
      { time: "5–20 min",  title: "Enseignement",  content: "Les deux hémisphères et leurs fonctions. L'alternance naturelle de 90 minutes. Les techniques de stimulation bilatérale et leurs effets." },
      { time: "20–45 min", title: "Pratique",      content: "15 min de balancement latéral ILLI → 5 min de repos → 10 min de marche en comptant alternativement les pas gauche/droite → 5 min d'immobilité." },
      { time: "45–55 min", title: "Contemplation", content: "Dans le silence, observe : les deux hémisphères sont-ils en dialogue ? Une pensée logique et une image intuitive peuvent-elles coexister ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note : quelle intuition et quelle analyse sont en tension en toi en ce moment ? L'alternance leur a-t-elle permis de dialoguer ?" }
    ],
    keyPhrase: "Le génie n'est ni dans l'hémisphère gauche ni dans le droit — il est dans leur dialogue.",
    journalQuestions: [
      "Dans ta vie quotidienne, quand accèdes-tu le plus facilement à l'hémisphère intuitif — et qu'est-ce qui le bloque le reste du temps ?",
      "Y a-t-il une décision que tu dois prendre et que tu abordes toujours du même côté (uniquement logique ou uniquement intuitif) ? Comment l'alternance te permettrait-elle de la voir différemment ?",
      "La stimulation bilatérale t'a-t-elle aidé à ressentir une cohérence plus grande — si oui, comment la décris-tu ?"
    ]
  });

  // ── C058 — Nombre d'or comme architecture vivante ─────────────────────────
  enrich("c058", {
    longSummary: "Le nombre d'or — φ = 1,618 — est le ratio qui apparaît dans les structures les plus fondamentales du vivant : la disposition des graines du tournesol, les spirales de la coquille du nautile, les proportions du corps humain, les oscillations des marchés financiers et les rythmes cerebraux. Ce n'est pas une coïncidence — c'est la signature mathématique de la façon dont la nature organise la croissance.\n\nCe cours explore le nombre d'or non comme curiosité mathématique mais comme outil de pratique : comment utiliser les proportions φ dans la construction des séances (division du temps en segments φ), comment reconnaître ce ratio dans sa propre biologie, et comment travailler avec les fréquences φ (7,4 Hz, 12 Hz) dans les pratiques de respiration et de balancement. La pratique alignée avec φ est une pratique en accord avec l'architecture fondamentale du vivant.",
    pedagogicalObjective: "Comprendre le nombre d'or et ses manifestations biologiques, et apprendre à l'utiliser comme principe organisateur de la pratique.",
    initiaticObjective: "S'aligner avec la proportion fondamentale du vivant — et reconnaître que l'éveil obéit aux mêmes lois mathématiques que la croissance d'une fleur.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Pose la main sur le cœur. Le ratio inspiration/expiration de ta respiration de repos est proche de 1:1,618 — le nombre d'or. Tu le portes déjà." },
      { time: "5–20 min",  title: "Enseignement",  content: "φ = 1,618. Son apparition dans la nature. Les proportions du corps humain. Les fréquences φ dans le cerveau. Application à la structure des séances." },
      { time: "20–40 min", title: "Pratique",      content: "Séance structurée en proportions φ : enseignement 22 min / pratique 36 min (ratio ≈ 1:1,618). Observer si la structure φ change l'expérience." },
      { time: "40–55 min", title: "Exploration",   content: "Respiration φ : inspire 4s, expire 6,5s (ratio 1:1,618). 10 minutes. Observer l'effet sur l'état de conscience." },
      { time: "55–60 min", title: "Carnet",        content: "Note : la structure φ de la séance ou la respiration φ ont-elles produit un effet particulier ?" }
    ],
    keyPhrase: "φ n'est pas une formule — c'est la façon dont la vie s'organise pour croître sans perdre sa forme.",
    journalQuestions: [
      "As-tu remarqué le nombre d'or dans des objets ou structures naturelles autour de toi ? Lesquels ?",
      "La respiration φ t'a-t-elle semblé plus naturelle ou moins naturelle que la respiration carrée 4/4 ?",
      "Si la vie s'organise en proportions d'or, dans quelle proportion s'organise ta vie entre pratique et action, entre don et réception ?"
    ]
  });

  // ── C059 — Fractales du vivant et perception ──────────────────────────────
  enrich("c059", {
    longSummary: "Une fractale est une structure qui se répète à toutes les échelles : le même motif dans la feuille et dans le brocoli, dans le réseau de neurones et dans le réseau de rivières, dans la distribution des galaxies et dans la structure des poumons. Cette auto-similarité à travers les échelles n'est pas une métaphore philosophique — c'est une propriété mesurable des systèmes biologiques et cosmologiques.\n\nCe cours explore comment la perception fractale change la façon d'observer : au lieu de voir des objets séparés, on commence à voir des patterns qui se répètent. Ce changement de perception est fondamental pour le développement du clair-ressenti : la capacité à percevoir le 'signal dans le bruit' est directement liée à la capacité à reconnaître des patterns récurrents. Regarder une feuille et voir le réseau de neurones, regarder une vague et entendre le son du cœur — c'est la perception fractale.",
    pedagogicalObjective: "Comprendre le principe des fractales dans la nature et développer la perception des patterns récurrents comme fondation du ressenti subtil.",
    initiaticObjective: "Développer un regard qui voit les correspondances entre les échelles — et reconnaître que le microcosme reflète le macrocosme.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Regarde ta main. Les veines sur le dos de la main. Et dans les veines — un réseau. Et dans le réseau — des branches. Et dans les branches — encore des branches." },
      { time: "5–20 min",  title: "Enseignement",  content: "Définition des fractales. Exemples biologiques. L'auto-similarité à travers les échelles. Comment la perception fractale enrichit le ressenti subtil." },
      { time: "20–40 min", title: "Pratique",      content: "Méditation de perception fractale : 10 min d'observation d'un objet naturel (feuille, bois, pierre) en cherchant les patterns répétés → 10 min yeux fermés en cherchant les mêmes patterns à l'intérieur." },
      { time: "40–55 min", title: "Contemplation", content: "Yeux fermés. Le pattern que tu as vu à l'extérieur — le retrouves-tu à l'intérieur ? Dans quelle zone du corps ?" },
      { time: "55–60 min", title: "Carnet",        content: "Dessine le pattern fractal que tu as observé. À quelle(s) autre(s) échelle(s) de ta vie ce pattern se répète-t-il ?" }
    ],
    keyPhrase: "Ce qui est en haut comme ce qui est en bas — et ce qui est dehors comme ce qui est dedans.",
    journalQuestions: [
      "Quel pattern récurrent reconnais-tu dans plusieurs domaines de ta vie — en matière de relations, de travail, de pratique ?",
      "La perception fractale — voir le même pattern à différentes échelles — te semble-t-elle une compétence intuitive que tu possèdes déjà ?",
      "Si tu regardes ta pratique comme une fractale de ta vie, quel aspect de ta pratique reflète le plus fidèlement qui tu es ?"
    ]
  });

  // ── C060 — Spirales, proportions et axe intérieur ─────────────────────────
  enrich("c060", {
    longSummary: "La spirale est la forme de convergence universelle : l'eau qui descend dans le siphon, la galaxie qui tourne sur elle-même, l'ADN qui s'enroule autour de ses histones, la coquille du nautile qui grandit selon le nombre d'or. La spirale est la trajectoire naturelle de tout ce qui cherche son centre — et c'est donc la figure de la méditation et de l'éveil.\n\nCe cours utilise la spirale comme outil de méditation : visualiser une spirale qui descend vers son centre, pratiquer une spirale de respiration (amplitude décroissante vers un souffle de plus en plus fin), et utiliser la rotation douce du cours précédent comme spirale physique. Ces pratiques convergent vers le même point : l'axe intérieur, ce centre stable que les traditions nomment 'le soi', 'l'atman', 'le point de conscience' — et que chaque praticien peut trouver par l'expérience directe.",
    pedagogicalObjective: "Utiliser la figure de la spirale comme outil de méditation et de convergence vers l'axe intérieur.",
    initiaticObjective: "Trouver, même brièvement, le point de silence absolu au centre de la spirale intérieure — et y reconnaître sa propre demeure.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Dessine une spirale sur papier, de l'extérieur vers le centre. Maintenant ferme les yeux et refais la même spirale mentalement." },
      { time: "5–15 min",  title: "Enseignement",  content: "La spirale dans la nature. La spirale comme trajectoire de convergence. L'axe intérieur comme centre de la spirale." },
      { time: "15–45 min", title: "Pratique",      content: "10 min de spirale visuelle (imaginer une spirale dorée qui tourne et converge) → 10 min de spirale respiratoire (expiration de plus en plus courte vers 0) → 10 min de silence au centre." },
      { time: "45–55 min", title: "Contemplation", content: "Au centre de la spirale, il n'y a pas de mouvement. Y as-tu trouvé le silence ? Était-il vide ou plein ? Effrayant ou paisible ?" },
      { time: "55–60 min", title: "Carnet",        content: "Décris le 'centre' que tu as touché — même brièvement. Comment était-ce différent de l'état ordinaire ?" }
    ],
    keyPhrase: "La spirale ne mène pas quelque part de nouveau — elle mène à ce que tu as toujours été.",
    journalQuestions: [
      "As-tu touché le centre de la spirale pendant la pratique — ne serait-ce qu'un instant ? Comment le décris-tu ?",
      "La convergence vers le centre te semblait-elle sécurisante ou angoissante — et qu'est-ce que cela révèle ?",
      "Si ta vie entière était une spirale se resserrant vers un centre, vers quoi converges-tu actuellement ?"
    ]
  });

  // ── C061 — La respiration comme voie intérieure ────────────────────────────
  enrich("c061", {
    longSummary: "Il existe des milliers de techniques respiratoires dans les traditions du monde — mais toutes les grandes traditions s'accordent sur un point : la technique n'est qu'un outil. Ce qui transforme, ce n'est pas la technique — c'est la qualité de conscience qu'on apporte à la technique. Une respiration carrée pratiquée machinalement produit peu d'effets. La même respiration carrée pratiquée avec une attention totale, une intention claire et une présence au souffle instant après instant produit des états profonds.\n\nCe cours explore les quatre conditions qui font d'une pratique respiratoire une 'voie intérieure' : la régularité (pratique quotidienne), la progressivité (augmentation graduelle de la durée et de la complexité), l'attention (présence à chaque souffle), et l'intention (savoir pourquoi on pratique). Ces quatre conditions transforment une technique en pratique et une pratique en transformation.",
    pedagogicalObjective: "Comprendre les quatre conditions qui transforment une technique respiratoire en voie de transformation intérieure.",
    initiaticObjective: "Passer du praticien qui fait des exercices au praticien qui marche sur une voie — avec conscience de là où il va.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Un seul souffle conscient. Inspire lentement. Retiens une seconde. Expire lentement. Dans ce seul souffle conscient est contenue toute la voie." },
      { time: "5–20 min",  title: "Enseignement",  content: "Les 4 conditions : régularité, progressivité, attention, intention. Pourquoi chacune est nécessaire. La différence entre exercice et voie." },
      { time: "20–45 min", title: "Pratique",      content: "25 minutes de respiration choisie librement — mais avec les quatre conditions actives simultanément. Pas de rythme imposé : juste l'attention et l'intention." },
      { time: "45–55 min", title: "Contemplation", content: "Respiration libre. Observe : est-ce que les quatre conditions étaient présentes ? Laquelle a été la plus difficile à maintenir ?" },
      { time: "55–60 min", title: "Carnet",        content: "Évalue les quatre conditions sur 10 pour cette séance : régularité / progressivité / attention / intention. Quelle est ta priorité de progression ?" }
    ],
    keyPhrase: "Une technique sans attention est un exercice. Une technique avec attention et intention est une voie.",
    journalQuestions: [
      "Laquelle des quatre conditions (régularité, progressivité, attention, intention) est la plus difficile pour toi — et pourquoi ?",
      "Peux-tu identifier des moments dans ta pratique où tu 'faisais l'exercice' sans vraiment être là ? Qu'est-ce qui t'en a sorti ?",
      "Si tu avais une seule condition à améliorer dans ta pratique respiratoire, laquelle choisirais-tu, et quel serait le premier geste concret ?"
    ]
  });

  // ── C062 — Posture et fondations du souffle ────────────────────────────────
  enrich("c062", {
    longSummary: "La posture et la respiration sont inséparables : une colonne vertébrale courbée comprime les poumons et réduit la capacité respiratoire d'un tiers. Un menton trop rentré bloque le passage de l'air dans la gorge. Des épaules remontées créent une tension qui empêche le diaphragme de descendre pleinement. La posture n'est pas un détail — c'est la structure portante de la respiration.\n\nCe cours explore deux postures fondamentales pour la pratique respiratoire : la posture assise avec support (chaise ou coussin) qui favorise l'éveil et la conscience, et la posture allongée (shavasana) qui favorise la détente et l'intégration. Pour chaque posture, les points clés à vérifier, les ajustements qui font toute la différence, et les erreurs communes qui sabotent la pratique. La posture juste n'est pas rigide — elle est vivante, adaptable et en dialogue constant avec le souffle.",
    pedagogicalObjective: "Maîtriser les deux postures fondamentales pour la pratique respiratoire et comprendre leur relation directe avec la profondeur du souffle.",
    initiaticObjective: "Habiter sa posture avec attention — non comme une contrainte mais comme l'expression physique d'un état de disponibilité intérieure.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assois-toi exactement comme tu le fais habituellement. Observe sans juger : ta colonne est-elle droite ? Tes épaules ? Ton menton ?" },
      { time: "5–15 min",  title: "Enseignement",  content: "Posture assise : les 5 points de vérification. Posture allongée : les 4 points de vérification. L'impact de la posture sur le volume respiratoire." },
      { time: "15–35 min", title: "Pratique assise", content: "10 min de respiration diaphragmatique en posture ajustée. Sens la différence avec la posture habituelle non ajustée." },
      { time: "35–50 min", title: "Pratique allongée", content: "10 min de respiration libre en shavasana. Observer l'état de conscience qui se crée — différent de l'assis." },
      { time: "50–57 min", title: "Comparaison",   content: "Assis à nouveau. Quelle posture est la plus efficace pour quel type de pratique ?" },
      { time: "57–60 min", title: "Clôture",       content: "Choisis ta posture pour ta prochaine séance — et note pourquoi ce choix." }
    ],
    keyPhrase: "La posture juste n'est pas une performance — c'est la condition dans laquelle le souffle peut enfin être libre.",
    journalQuestions: [
      "Quelle est ta posture habituelle de pratique — et as-tu déjà vérifié si elle était vraiment optimale pour ton souffle ?",
      "La différence entre les deux postures (assis/allongé) — qu'est-ce qu'elle révèle sur les états de conscience qui leur correspondent ?",
      "Si ta posture quotidienne (au travail, dans la vie) reflétait ton état intérieur, qu'est-ce qu'elle dirait de toi ?"
    ]
  });

  // ── C063 — Observer le souffle avant de le transformer ────────────────────
  enrich("c063", {
    longSummary: "Le praticien pressé saute directement aux techniques sans prendre le temps d'observer ce qui est. C'est une erreur fondamentale — non par défaut de connaissance mais par manque d'humilité. Observer le souffle tel qu'il est, sans le modifier, pendant dix ou vingt minutes, révèle plus sur son état intérieur que n'importe quelle technique appliquée avec ardeur.\n\nCe cours est un cours d'observation pure. Pas de technique, pas de rythme imposé, pas d'objectif — seulement l'attention portée au souffle tel qu'il se présente. Cet exercice simple est en réalité l'un des plus difficiles que propose cette école : tenir l'attention sur quelque chose d'aussi banal que le souffle, sans s'ennuyer, sans le forcer à changer, sans s'endormir. Et c'est précisément cette difficulté qui en fait l'un des exercices les plus formateurs.",
    pedagogicalObjective: "Pratiquer l'observation pure du souffle sans technique ni modification, comme exercice fondamental d'attention et d'honnêteté.",
    initiaticObjective: "Apprendre à voir ce qui est plutôt que ce qu'on voudrait que soit — dans le souffle comme dans la vie.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Une seule consigne pour les 55 prochaines minutes : observer le souffle tel qu'il est. Ne le modifie pas. Ne l'améliore pas. Observe seulement." },
      { time: "5–30 min",  title: "Observation",   content: "25 minutes d'observation pure. Sans minuterie visible, sans compte de cycles. Le souffle va et vient — tu regardes." },
      { time: "30–50 min", title: "Observation",   content: "Continuation. Si l'ennui arrive, observe l'ennui. Si le sommeil arrive, observe la somnolence. Si le mental s'agite, observe l'agitation. Rien ne perturbe l'observateur." },
      { time: "50–57 min", title: "Carnet",        content: "Note ce que tu as observé : les qualités du souffle (profond/superficiel, régulier/irrégulier), les états qui sont apparus, les résistances rencontrées." },
      { time: "57–60 min", title: "Clôture",       content: "Une seule respiration intentionnelle. Après 55 minutes d'observation, tu sais maintenant d'où tu pars avant de transformer." }
    ],
    keyPhrase: "Celui qui sait observer ce qui est n'a plus besoin qu'on lui dise quoi faire — il voit lui-même ce qui doit changer.",
    journalQuestions: [
      "Qu'as-tu observé dans ton souffle que tu n'avais jamais remarqué avant — une asymétrie, un blocage, un rythme particulier ?",
      "L'ennui est-il apparu pendant l'observation ? À quel moment, et comment as-tu traversé cet ennui ?",
      "Si tu pratiquais 10 minutes d'observation pure du souffle chaque matin avant toute autre pratique, qu'est-ce que cela changerait ?"
    ]
  });

  // ── C064 — Développer l'imagination sensorielle ────────────────────────────
  enrich("c064", {
    longSummary: "L'imagination sensorielle — la capacité à créer dans l'espace mental des sensations visuelles, sonores, tactiles, olfactives ou gustatives aussi précises que des perceptions réelles — est la fondation de toutes les pratiques perceptives subtiles. Sans une imagination sensorielle bien développée, il est impossible de distinguer entre une vraie perception intérieure et un souvenir, une projection ou une fabrication.\n\nCe cours développe l'imagination sensorielle à travers une progression méthodique : d'abord les images simples (couleur, forme, lumière), puis les sons intérieurs (notes, mélodies), puis les sensations tactiles (texture, température, pression), et enfin les combinaisons multimodales. À la fin de ce cours, l'imagination sensorielle est un outil conscient et maîtrisable — la fondation sur laquelle toutes les perceptions subtiles ultérieures seront évaluées.",
    pedagogicalObjective: "Développer une imagination sensorielle précise et maîtrisable comme fondation des pratiques de perception intérieure.",
    initiaticObjective: "Distinguer avec certitude ce qu'on crée de l'intérieur de ce qu'on reçoit de l'extérieur — la différence entre imagination et perception.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Ferme les yeux. Imagine une orange. Vois la couleur, la peau texturée, la forme ronde. Sent l'odeur. Entends le son quand tu la coupes. Goûte le jus. C'est l'imagination sensorielle." },
      { time: "5–15 min",  title: "Enseignement",  content: "Imagination sensorielle vs perception réelle. Comment développer la précision. Pourquoi c'est fondamental pour le travail perceptif subtil." },
      { time: "15–45 min", title: "Pratique",      content: "Progression en 4 étapes : 5 min visuel (une flamme de bougie) → 5 min sonore (le son d'une cloche) → 5 min tactile (la texture de l'eau) → 10 min multimodal (un repas imaginaire complet)." },
      { time: "45–55 min", title: "Évaluation",    content: "Quelle modalité est la plus nette ? La moins nette ? C'est le reflet de tes sens dominants et de tes sens à développer." },
      { time: "55–60 min", title: "Carnet",        content: "Note le niveau de netteté de chaque modalité sensorielle sur 10. Ce sera ton point de départ pour suivre les progrès." }
    ],
    keyPhrase: "L'imagination sensorielle précise n'est pas de la fantasie — c'est le laboratoire dans lequel la perception se développe.",
    journalQuestions: [
      "Quelle modalité sensorielle est la plus nette dans ton imagination — visuelle, sonore, tactile, olfactive, gustative ?",
      "As-tu des rêves en couleur ? Entends-tu des sons dans tes rêves ? Ces indices révèlent tes modalités dominantes.",
      "La différence entre 'je l'imagine' et 'je le perçois' — est-ce que tu la ressens clairement ? Si non, qu'est-ce qui rend cette distinction difficile ?"
    ]
  });

  // ── C065 — Stabiliser un point lumineux interne ────────────────────────────
  enrich("c065", {
    longSummary: "Le point lumineux interne — cette petite tache de lumière que l'on peut percevoir dans le champ visuel intérieur, souvent de couleur blanche ou légèrement dorée — est l'un des premiers signes que la pratique lumineuse commence à porter ses fruits au niveau perceptif. Ce n'est pas une hallucination — c'est une activation du cortex visuel en l'absence de stimulus externe, produit par la pratique répétée de l'observation et de la rémanence.\n\nCe cours enseigne comment trouver ce point lumineux, comment le stabiliser (empêcher qu'il ne disparaisse ou ne se déplace), et comment travailler avec lui comme ancre de conscience. Le point lumineux stable est l'outil le plus direct pour 'rester' dans un état de conscience modifié au lieu d'y faire des visites éclair — il est l'ancre qui permet d'explorer l'espace intérieur sans se perdre.",
    pedagogicalObjective: "Trouver, stabiliser et travailler avec le point lumineux interne comme ancre de conscience dans les états perceptifs subtils.",
    initiaticObjective: "Avoir accès, quand on le souhaite, à ce point de lumière intérieure qui est la lampe du chercheur dans les profondeurs de la conscience.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Ferme les yeux. Regarde l'intérieur de tes paupières. Dans l'obscurité — il y a-t-il une légère lumière quelque part ? Un point, une zone ? Ne force pas — observe seulement." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le point lumineux interne : son origine neurologique, sa signification pratique, comment le trouver et comment travailler avec lui." },
      { time: "15–40 min", title: "Pratique",      content: "5 min d'observation douce d'une bougie → 20 min de travail avec la trace, en cherchant le point lumineux stable → si trouvé, maintenir l'attention sur lui." },
      { time: "40–55 min", title: "Stabilisation", content: "Si le point est trouvé : pratiquer de le retrouver après chaque dispersion. Il disparaît → tu le retrouves → il disparaît → tu le retrouves." },
      { time: "55–60 min", title: "Carnet",        content: "As-tu trouvé le point ? De quelle couleur, quelle position, quelle stabilité ? Note toutes les données brutes." }
    ],
    keyPhrase: "Le point lumineux intérieur est la lampe du voyageur — il n'éclaire pas tout mais il indique la direction.",
    journalQuestions: [
      "As-tu déjà spontanément vu un point de lumière dans l'obscurité des yeux fermés — avant même de pratiquer cela ?",
      "Le point lumineux — était-il plus facile à trouver après l'observation d'une bougie qu'en état ordinaire ? Qu'est-ce que cela confirme ?",
      "Imagine que le point lumineux soit ta propre conscience vous observant — qu'est-ce que cela change dans ta relation à la pratique ?"
    ]
  });

  // ── C066 — Images mentales et rémanence ────────────────────────────────────
  enrich("c066", {
    longSummary: "Les images mentales qui surgissent pendant la rémanence lumineuse sont d'une nature différente des images de l'imagination ordinaire : elles ne sont pas construites délibérément, elles surgissent — souvent de façon surprenante, chargées d'une qualité émotionnelle ou intuitive qui dépasse leur contenu apparent. Ce caractère 'reçu' plutôt que 'fabriqué' est le premier signe d'une perception intérieure authentique.\n\nCe cours enseigne comment travailler avec ces images : les accueillir sans les forcer, les observer sans les interpréter immédiatement, les noter dans le carnet avec précision, et les laisser 'mûrir' avant d'en tirer des conclusions. La précipitation dans l'interprétation est l'ennemi du praticien perceptif — et ce cours en explique les raisons et les remèdes.",
    pedagogicalObjective: "Apprendre à accueillir, observer et noter les images mentales de la rémanence sans les forcer ni les interpréter prématurément.",
    initiaticObjective: "Développer la patiente d'un chercheur envers ses propres perceptions — ni les rejeter ni les sur-interpréter, juste les accueillir.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappel de la règle d'or : pendant la pratique, tu observes. Tu n'interprètes pas. L'interprétation vient après, dans le carnet. Pas pendant." },
      { time: "5–15 min",  title: "Enseignement",  content: "La différence entre image fabriquée et image reçue. Comment les reconnaître. Les pièges de l'interprétation prématurée. Le carnet comme outil de vérification." },
      { time: "15–40 min", title: "Pratique",      content: "Observation 5 min → rémanence 30 min. Pendant la rémanence : accueille chaque image qui surge, laisse-la passer, accueille la suivante. Ni rétention ni chasse." },
      { time: "40–55 min", title: "Carnet",        content: "Note maintenant (après, pas pendant) toutes les images reçues. Description brute : couleur, forme, mouvement, qualité émotionnelle. Pas d'interprétation encore." },
      { time: "55–60 min", title: "Clôture",       content: "Relis tes notes dans 24h. Qu'est-ce que tu vois alors que tu ne voyais pas immédiatement après la séance ?" }
    ],
    keyPhrase: "L'image reçue ne se choisit pas — elle arrive. Le praticien sage la reçoit sans la modifier.",
    journalQuestions: [
      "As-tu reçu des images pendant la rémanence ? Lesquelles ont semblé 'données' plutôt que 'fabriquées' — et comment fais-tu la différence ?",
      "Quelle image t'a le plus surpris ou marqué — et qu'est-ce qu'elle pourrait signifier après 24h de mûrissement ?",
      "La patience devant ses propres perceptions — est-ce une qualité que tu possèdes, ou quelque chose à développer ?"
    ]
  });

  // ── C067 — Clairvoyance : fondations sobres ────────────────────────────────
  enrich("c067", {
    longSummary: "Le mot 'clairvoyance' est souvent mal compris — on en fait soit une capacité extraordinaire et mystérieuse, soit une illusion complète. La réalité est plus sobre et plus précise : la clairvoyance est la capacité à percevoir des informations par des voies autres que les cinq sens ordinaires. Cette capacité existe — elle est documentée expérimentalement depuis 150 ans — mais elle est fragile, variable, facilement polluée par la projection et l'imagination.\n\nCe cours établit les fondations sobres d'un travail perceptif honnête : comment distinguer la vraie perception de la projection, comment établir un protocole de vérification, comment calibrer son niveau de confiance sur une observation. La clairvoyance sobre n'est pas spectaculaire — elle est fiable. Et la fiabilité, dans ce domaine comme dans tout autre, est infiniment plus précieuse que le spectacle.",
    pedagogicalObjective: "Établir les fondements d'un travail perceptif honnête : distinguer perception de projection, et établir un protocole de vérification.",
    initiaticObjective: "Choisir la rigueur plutôt que le spectacle dans le développement perceptif — parce que la vérité intérieure mérite d'être vérifiée.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Question fondamentale : qu'est-ce que tu veux vraiment — des expériences impressionnantes ou une perception fiable ? La réponse oriente tout." },
      { time: "5–20 min",  title: "Enseignement",  content: "La clairvoyance sobre : définition rigoureuse. Projection vs perception. Les 5 critères d'une perception vérifiable. Le protocole de vérification." },
      { time: "20–40 min", title: "Pratique",      content: "Test perceptif simple : regarder une photo de personne inconnue (face retournée), noter ses impressions, retourner la photo et comparer." },
      { time: "40–55 min", title: "Analyse",       content: "Évalue la correspondance entre tes impressions et la réalité. Sur quoi portait la correspondance ? Sur quoi la projection ?" },
      { time: "55–60 min", title: "Carnet",        content: "Taux de correspondance sur ce test. Ce chiffre sera ton point de départ. La pratique le fera évoluer." }
    ],
    keyPhrase: "Une perception vérifiable et modeste vaut infiniment plus qu'une certitude non vérifiable.",
    journalQuestions: [
      "Quel est ton taux de correspondance sur le test perceptif ? T'attendais-tu à ce résultat ?",
      "Y a-t-il des domaines où tu perçois souvent juste — et d'autres où tu projettes systématiquement ?",
      "Si tu devais développer ta clairvoyance avec la rigueur d'un scientifique, quel protocole mettrais-tu en place ?"
    ]
  });

  // ── C068 — Rêves, symboles et carnet ──────────────────────────────────────
  enrich("c068", {
    longSummary: "Le rêve est le laboratoire naturel de la conscience — un espace où le cerveau traite, consolide, explore et crée sans la censure du moi éveillé. Pour le praticien, les rêves sont une extension de la pratique : les états de conscience modifiés produits pendant les séances se prolongent souvent dans les rêves des nuits suivantes, et les insights surgis en rêve peuvent éclairer la pratique diurne.\n\nCe cours enseigne le travail avec les rêves : comment les noter immédiatement (avant que le souvenir ne s'efface), comment identifier les symboles récurrents, comment distinguer les différents types de rêves (ordinaires, lucides, précognitifs, symboliques), et comment intégrer les messages du rêve dans la pratique consciente. Le carnet de rêves est aussi important que le carnet de séances — ils sont les deux faces de la même exploration intérieure.",
    pedagogicalObjective: "Établir une pratique de notation et d'interprétation des rêves comme extension de la pratique de conscience diurne.",
    initiaticObjective: "Reconnaître le rêve comme un enseignant — un miroir de l'inconscient qui révèle ce que le moi éveillé ne voit pas encore.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappelle-toi ton dernier rêve dont tu te souviens. Note les premières images qui viennent. Ce sont les portes d'entrée." },
      { time: "5–20 min",  title: "Enseignement",  content: "Types de rêves. Comment noter au réveil. La symbolique personnelle vs universelle. Le rêve lucide et son rapport à la pratique." },
      { time: "20–40 min", title: "Travail sur rêve", content: "Travail sur le rêve noté : amplification (associer librement), contextualisation (lien avec la vie actuelle), question (quelle question ce rêve pose-t-il ?)." },
      { time: "40–55 min", title: "Pratique",      content: "Méditation de pré-sommeil : pendant 5 minutes, formuler une intention pour les rêves de ce soir. Observer ce qui vient." },
      { time: "55–60 min", title: "Clôture",       content: "Engagement : demain matin, noter le rêve dans les 5 premières minutes du réveil, avant de faire quoi que ce soit d'autre." }
    ],
    keyPhrase: "Le rêve ne ment pas — il parle en images ce que le moi éveillé ne peut pas encore entendre en mots.",
    journalQuestions: [
      "Te rappelles-tu souvent tes rêves — ou ils s'effacent rapidement ? Qu'est-ce qui influence ta mémoire des rêves ?",
      "Y a-t-il des symboles récurrents dans tes rêves — des lieux, des personnes, des situations ? Que pourraient-ils signifier ?",
      "As-tu déjà eu un rêve qui t'a donné une information utile sur ta vie — et comment l'as-tu interprété ?"
    ]
  });

  // ── C069 — Vision intérieure et silence ────────────────────────────────────
  enrich("c069", {
    longSummary: "La vision intérieure n'est pas un talent — c'est un espace qui s'ouvre quand les conditions sont réunies : le silence du mental, la détente du corps, et une qualité d'attention flottante qui ne cherche pas mais reste disponible. Le problème de la plupart des pratiquants est qu'ils cherchent la vision intérieure — et cette recherche active ferme précisément l'espace dans lequel elle pourrait se manifester.\n\nCe cours enseigne l'art du non-chercher : comment créer les conditions de la vision intérieure sans la forcer, comment distinguer le silence fertile (plein de potentiel) du silence vide (simple absence de stimuli), et comment rester dans l'espace d'attente sans tomber dans le sommeil ou l'ennui. C'est l'un des cours les plus subtils et les plus précieux de l'école — et il demande une maturité de pratique que les cours précédents ont contribué à construire.",
    pedagogicalObjective: "Créer les conditions de la vision intérieure sans la chercher — maîtriser l'art du non-chercher dans la conscience.",
    initiaticObjective: "Apprendre à habiter le silence sans le remplir — et découvrir que ce silence est plus plein que n'importe quelle image fabriquée.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Règle unique pour ce cours : tu n'essaies pas de voir quoi que ce soit. Tu crées seulement les conditions et tu attends. La vision vient — ou ne vient pas. Les deux sont corrects." },
      { time: "5–15 min",  title: "Enseignement",  content: "La différence entre chercher et accueillir. Le silence fertile. L'attention flottante vs l'attention focalisée. Les obstacles au non-chercher." },
      { time: "15–50 min", title: "Pratique",      content: "35 minutes de silence complet avec les conditions : position confortable, lumière douce, yeux mi-clos ou fermés, respiration libre. Attente ouverte." },
      { time: "50–57 min", title: "Carnet",        content: "Note ce qui est arrivé : rien / quelque chose de vague / une image / une sensation / un son / une certitude. Toutes les réponses sont valides." },
      { time: "57–60 min", title: "Clôture",       content: "Quelle que soit l'expérience : tu as pratiqué le non-chercher. C'est la compétence la plus difficile et la plus précieuse de toute l'école." }
    ],
    keyPhrase: "La vision intérieure ne se cherche pas — elle survient dans l'espace que ton chercher habituel laissait vide.",
    journalQuestions: [
      "Qu'est-ce qui est arrivé pendant les 35 minutes de silence ? Peux-tu décrire l'état sans le juger ?",
      "La non-recherche était-elle difficile — et qu'est-ce qui poussait à chercher quand même ?",
      "Si la vision intérieure est une conséquence du silence plutôt qu'une récompense de l'effort, comment cela change-t-il ton rapport à la pratique ?"
    ]
  });

  // ── C070 — Protocole de vérification intérieure ────────────────────────────
  enrich("c070", {
    longSummary: "Un protocole de vérification est la différence entre un praticien qui accumule des expériences impressionnantes et un praticien qui développe une perception fiable et utilisable. Sans vérification, les perceptions intérieures restent dans un état de 'peut-être' permanent — on ne sait pas si on a vraiment perçu quelque chose ou si on a projeté. Avec vérification, chaque perception devient soit confirmée, soit infirmée — et dans les deux cas, on apprend.\n\nCe cours présente un protocole de vérification complet en cinq étapes : noter la perception brute, formuler une prédiction vérifiable, observer sur une période définie, comparer avec la réalité, et évaluer la correspondance. Ce protocole n'est pas restrictif — il est libérateur : il permet de faire confiance aux perceptions qui se révèlent fiables, et de ne pas se perdre dans celles qui ne le sont pas encore.",
    pedagogicalObjective: "Maîtriser un protocole de vérification en cinq étapes pour évaluer la fiabilité des perceptions intérieures.",
    initiaticObjective: "Devenir son propre scientifique intérieur — ni naïf ni sceptique, mais rigoureux et ouvert.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "As-tu eu une perception récente dont tu ne savais pas si elle était vraie ou projetée ? C'est le point de départ parfait pour ce cours." },
      { time: "5–20 min",  title: "Enseignement",  content: "Le protocole en 5 étapes : noter brut → prédire → observer → comparer → évaluer. Exemples concrets. Les erreurs classiques." },
      { time: "20–40 min", title: "Application",   content: "Exercice pratique : prendre une perception récente et la faire passer par les 5 étapes du protocole. Travail écrit rigoureux." },
      { time: "40–55 min", title: "Cas d'école",   content: "Analyse de 3 exemples de perceptions vérifiées : une vraie, une fausse, une ambiguë. Que révèle chaque cas ?" },
      { time: "55–60 min", title: "Carnet",        content: "Crée une section 'Perceptions en vérification' dans ton carnet. Commence aujourd'hui." }
    ],
    keyPhrase: "Une perception vérifiée construit la confiance. Une perception non vérifiée construit l'illusion.",
    journalQuestions: [
      "As-tu une perception récente que tu peux soumettre au protocole des cinq étapes dès aujourd'hui ?",
      "Quelle est ton attitude habituelle face à tes perceptions — tu les crois trop facilement, ou tu les rejettes trop vite ?",
      "Si tu tenais un carnet de vérification rigoureux depuis 6 mois, qu'est-ce que tu saurais sur la fiabilité de tes perceptions que tu ne sais pas encore ?"
    ]
  });

  // ── C071 — Séance de clairvoyance guidée ──────────────────────────────────
  enrich("c071", {
    longSummary: "La séance de clairvoyance guidée est la synthèse de toute la famille Clairvoyance — un voyage complet de l'ouverture lumineuse à la perception, la vérification et la clôture. Elle suit un protocole précis qui maximise les conditions de la perception fiable : préparation du terrain (lumière, corps, silence), induction de l'état (rémanence), travail perceptif (attente ouverte), notation rigoureuse (carnet), et vérification différée.\n\nCe cours est aussi l'occasion de faire un bilan personnel de la progression dans cette famille : qu'est-ce qui a changé depuis le premier cours sur l'imagination sensorielle ? La perception est-elle plus claire, plus distincte de la projection ? Le protocole de vérification est-il devenu une habitude ? Cette auto-évaluation honnête est le meilleur guide pour la suite du parcours.",
    pedagogicalObjective: "Exécuter une séance complète de clairvoyance guidée de bout en bout, du seuil à la vérification.",
    initiaticObjective: "Faire le point sur son développement perceptif — honnêtement, sans fausse modestie ni faux enthousiasme — et choisir la prochaine direction.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Préparation complète : lieu, corps, lumière douce. Formulation de l'intention de la séance : quelle perception explorer aujourd'hui ?" },
      { time: "5–20 min",  title: "Induction",     content: "Observation lumineuse 5 min → rémanence 10 min → installation dans l'état de réceptivité. Patience totale." },
      { time: "20–45 min", title: "Perception",    content: "25 minutes d'attente ouverte dans la rémanence. Accueille ce qui vient — images, sons, sensations, certitudes — sans chercher." },
      { time: "45–55 min", title: "Notation",      content: "Note tout ce qui est venu : brut, précis, sans interprétation." },
      { time: "55–58 min", title: "Clôture",       content: "Retour progressif au corps, bâillement, mouvement doux." },
      { time: "58–60 min", title: "Bilan",         content: "Comment cette séance se compare à ta première séance de clairvoyance ? Qu'as-tu développé ?" }
    ],
    keyPhrase: "La séance de clairvoyance guidée n'est pas un test — c'est une rencontre avec ce qui est prêt à se montrer.",
    journalQuestions: [
      "Qu'as-tu perçu pendant cette séance — et quelle est ta confiance dans la fiabilité de cette perception ?",
      "Quelle est la plus grande transformation dans ta perception intérieure depuis le début de la famille Clairvoyance ?",
      "Quelle est la prochaine compétence perceptive que tu veux développer, et pourquoi ?"
    ]
  });

  // ── C072 — Clair-ressenti corporel ────────────────────────────────────────
  enrich("c072", {
    longSummary: "Le clair-ressenti est la perception du monde par le corps — non pas par les émotions ni par la pensée mais par les sensations physiques directes qui surgissent en présence de certaines personnes, lieux ou situations. Cette forme de perception est plus primitive et souvent plus fiable que la clairvoyance visuelle : elle est enracinée dans le corps, difficile à fabriquer, et communique directement avec le système nerveux entérique (le cerveau du ventre).\n\nCe cours approfondit le travail déjà commencé dans la famille Cénesthésie — mais l'oriente maintenant vers la perception d'informations extérieures au lieu de simplement cartographier l'intérieur. Quelle est la qualité de présence de cette personne ? Quel est le 'champ' de ce lieu ? La différence entre les deux est aussi réelle que la différence entre sentir son propre ventre et sentir le parfum d'une fleur.",
    pedagogicalObjective: "Développer le clair-ressenti corporel comme outil de perception de l'environnement extérieur (personnes, lieux, situations).",
    initiaticObjective: "Apprendre à faire confiance au corps comme organe de connaissance — non pas malgré sa nature physique mais grâce à elle.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Scanner cénesthésique rapide : comment te sens-tu en ce moment dans le corps ? Ce sera ton 'état de base' pour comparer avec l'état après contact." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le clair-ressenti vs la clairvoyance. Le cerveau entérique. Comment distinguer propre ressenti et perception de l'autre. Les pièges." },
      { time: "15–45 min", title: "Pratique",      content: "3 exercices progressifs : 1) ressenti d'un objet chargé 10 min / 2) ressenti d'une plante 10 min / 3) ressenti d'une photo de lieu 10 min." },
      { time: "45–55 min", title: "Comparaison",   content: "Pour chaque exercice : compare ton ressenti avec les informations disponibles. Qu'est-ce qui correspond ? Qu'est-ce qui projette ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note les correspondances et les projections. Ton taux de fiabilité dans ce domaine — premier chiffre." }
    ],
    keyPhrase: "Le corps perçoit avant que le mental ne comprenne — apprendre à l'écouter, c'est apprendre à voir dans l'obscurité.",
    journalQuestions: [
      "Quand tu rencontres une personne pour la première fois, ressens-tu quelque chose dans le corps — et quel est ton niveau de confiance dans ce ressenti ?",
      "Y a-t-il des lieux que tu évites 'sans raison' — ou des lieux où tu te sens inexplicablement bien ? Tes ressentis étaient-ils fiables avec le recul ?",
      "La différence entre 'le corps sait' et 'l'émotion réagit' — est-ce que tu commences à la faire ?"
    ]
  });

  console.log("[Axis Enrichment Part 3] Cours 40-72 enrichis.");
})();
