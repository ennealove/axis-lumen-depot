/* Axis Lumen Studio — Enrichissement premium des 119 cours
   Injecte : longSummary, pedagogicalObjective, initiaticObjective,
   minutePlan, keyPhrase, journalQuestions sur chaque cours.
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  function enrich(id, data) {
    var list = window.AXIS_ONE_HOUR_COURSES || [];
    var c = list.find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  // ── C001 — La lumière dans les traditions du monde ─────────────────────────
  enrich("c001", {
    longSummary: "Depuis les cathédrales gothiques jusqu'aux temples solaires d'Égypte, depuis les icônes byzantines jusqu'aux fenêtres du Zen, chaque tradition a placé la lumière au centre de son enseignement. Ce cours explore ces convergences non comme curiosité historique, mais comme révélation d'une loi universelle : l'attention orientée vers la lumière transforme le percevant.\n\nTu découvriras comment les anciens utilisaient l'orientation des bâtiments, les jeux d'ombre et de lumière, et les pratiques du regard pour induire des états de conscience modifiés durables. Ce que les traditions appelaient 'illumination', la neurologie contemporaine commence à en cartographier les mécanismes — et la convergence est stupéfiante.",
    pedagogicalObjective: "Comprendre pourquoi toutes les grandes traditions ont centré leur pratique initiatique autour de la lumière physique et intérieure.",
    initiaticObjective: "Reconnaître en toi l'héritage universel de l'éveil lumineux et choisir consciemment d'en être le dépositaire vivant.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Pose-toi. Trois respirations lentes. Formule intérieurement : 'Je suis disponible à recevoir.'" },
      { time: "5–20 min",  title: "Enseignement",  content: "Les sept traditions majeures et leur rapport à la lumière : Égypte, Grèce, Inde, Chine, Islam, Christianisme mystique, traditions autochtones." },
      { time: "20–35 min", title: "Pratique",      content: "Observation d'une bougie ou source douce pendant 10 minutes, puis fermeture des yeux pour accueillir la trace lumineuse intérieure." },
      { time: "35–50 min", title: "Contemplation", content: "Dans le silence de la trace, laisse émerger une image, un symbole, un souvenir. Ne force rien. Observe avec la même douceur qu'un ciel nuageux." },
      { time: "50–57 min", title: "Carnet",        content: "Note trois mots qui résument ce que tu as perçu. Écris la question : 'Quelle tradition résonne le plus en moi et pourquoi ?'" },
      { time: "57–60 min", title: "Clôture",       content: "Pose les mains sur les genoux, souffle trois fois lentement, remercie le moment qui vient de se vivre." }
    ],
    keyPhrase: "La lumière n'est pas le symbole de l'éveil — elle en est le mécanisme.",
    journalQuestions: [
      "Quelle tradition lumineuse résonne le plus dans ton histoire personnelle, et qu'est-ce que cela révèle de ta nature profonde ?",
      "Quand as-tu vécu pour la première fois une expérience que tu pourrais appeler 'lumineuse' ou 'illuminée' — même brièvement ?",
      "Si la lumière physique est un outil de transformation, qu'est-ce que tu es prêt à transformer en toi ce soir ?"
    ]
  });

  // ── C002 — Le cerveau comme organe de conscience ──────────────────────────
  enrich("c002", {
    longSummary: "Le cerveau n'est pas un ordinateur biologique qui produit de la conscience — il est l'organe qui reçoit, filtre et amplifie la conscience. Cette distinction fondamentale change tout : si le cerveau est un récepteur, alors les pratiques qui modifient son état modifient ce qu'il est capable de recevoir. La neuroplasticité confirme que le cerveau se réorganise en réponse à l'attention répétée.\n\nCe cours explore les structures cérébrales impliquées dans les états de conscience modifiés : l'hippocampe, le cortex préfrontal, l'axe thalamique et le système réticulaire activateur. Tu comprendras pourquoi certaines pratiques — observation lumineuse, balancement rythmique, respiration profonde — produisent des effets mesurables sur le cerveau, et comment utiliser cette connaissance pour pratiquer avec intention.",
    pedagogicalObjective: "Comprendre les bases neurobiologiques qui sous-tendent les pratiques de conscience et la transformation par l'attention.",
    initiaticObjective: "Accepter que ton cerveau est transformable et engager ta pratique avec la confiance que chaque séance laisse une trace physique réelle.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Ferme les yeux. Pose une main sur le sommet du crâne. Sens le poids, la chaleur, la vie dans cet organe extraordinaire." },
      { time: "5–20 min",  title: "Enseignement",  content: "Anatomie de la conscience : le tronc cérébral (survie), le système limbique (émotion), le néocortex (pensée), l'axe thalamique (attention)." },
      { time: "20–35 min", title: "Pratique",      content: "Séquence d'activation : 5 minutes de respiration lente (4/4), puis observation d'une lumière douce, puis 5 minutes de silence absolu." },
      { time: "35–50 min", title: "Contemplation", content: "Dans l'espace post-lumineux, observe les pensées qui traversent comme des nuages. Qui observe ? Cette question est la pratique." },
      { time: "50–57 min", title: "Carnet",        content: "Dessine schématiquement ce que tu as ressenti comme 'zones actives' dans ta tête pendant la pratique. Aucune précision anatomique requise — juste le ressenti." },
      { time: "57–60 min", title: "Clôture",       content: "Baille trois fois intentionnellement (activation du vague), puis ouvre les yeux lentement sur l'espace autour de toi." }
    ],
    keyPhrase: "Ton cerveau n'est pas ce que tu es — c'est l'instrument sur lequel tu joues.",
    journalQuestions: [
      "As-tu déjà remarqué que certaines pratiques te rendent plus 'clair' le lendemain ? Lesquelles, et pourquoi selon toi ?",
      "Si ton cerveau était un instrument de musique, dans quel état de désaccordage se trouve-t-il aujourd'hui ?",
      "Qu'est-ce que tu fais régulièrement qui 'nourrit' ton cerveau — et qu'est-ce qui le 'pollue' ?"
    ]
  });

  // ── C003 — Qu'est-ce qu'une initiation ? ────────────────────────────────
  enrich("c003", {
    longSummary: "Le mot 'initiation' vient du latin 'initium' — le commencement. Une initiation n'est pas un diplôme qu'on obtient, c'est un seuil qu'on traverse. Ce qui change, c'est le regard, pas le monde. Après une vraie initiation, tu vois ce que tu voyais déjà — mais tu le vois différemment. Et cette différence est irréversible.\n\nCe cours démystifie l'initiation en la rendant concrète et praticable : les cinq étapes universelles (appel, séparation, épreuve, mort symbolique, renaissance), comment les reconnaître dans ta propre vie, et comment les pratiques de cette école constituent une initiation structurée, progressive et vérifiable. L'initiation n'est pas réservée aux élus — elle est disponible pour tout être qui choisit de se retourner vers sa propre lumière.",
    pedagogicalObjective: "Comprendre la structure universelle de l'initiation et identifier où tu en es dans ton propre voyage initiatique.",
    initiaticObjective: "Reconnaître que tu es déjà en initiation, et choisir d'avancer consciemment plutôt qu'à tâtons.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi face à l'est si possible. Formule en silence : 'Je suis ici, présent, disponible à ce que cette heure a à m'offrir.'" },
      { time: "5–20 min",  title: "Enseignement",  content: "Les cinq étapes universelles de l'initiation à travers les cultures : appel, séparation, descente, révélation, retour transformé." },
      { time: "20–35 min", title: "Pratique",      content: "Exercice d'écriture rapide : 15 minutes pour écrire sans censure 'Ce qui m'a appelé à cette école, et ce que j'espère y trouver.'" },
      { time: "35–50 min", title: "Contemplation", content: "Relis ce que tu as écrit en observant une lumière douce. Laisse la trace lumineuse 'irradier' les mots que tu viens de poser." },
      { time: "50–57 min", title: "Carnet",        content: "Identifie dans ta vie actuelle : quelle est l'épreuve que tu traverses ? Quelle mort symbolique est en cours ? Quelle renaissance émerge ?" },
      { time: "57–60 min", title: "Clôture",       content: "Pose la main sur le cœur. Dis intérieurement : 'Je reçois ce que cette étape m'apprend.' Expire lentement." }
    ],
    keyPhrase: "L'initiation ne t'est pas donnée — elle se révèle à toi quand tu cesses de regarder ailleurs.",
    journalQuestions: [
      "Quel événement de ta vie ressemble, avec le recul, à une initiation — même douloureuse ?",
      "Qu'est-ce qui doit 'mourir' en toi pour que la prochaine étape de ta vie puisse naître ?",
      "Si tu devais donner un titre à l'initiation que tu traverses en ce moment, quel titre lui donnerais-tu ?"
    ]
  });

  // ── C004 — La méthode des rythmes lumineux ──────────────────────────────
  enrich("c004", {
    longSummary: "Au début du XXe siècle, un médecin-chercheur a consacré sa vie à une découverte qui allait relier neurologie, tradition spirituelle et pratique quotidienne : les rythmes lumineux produits par le système visuel humain sont des outils de transformation de la conscience. Ce n'était pas de la magie — c'était de la physiologie appliquée à l'éveil.\n\nCe cours retrace l'histoire de cette découverte, les étapes de la recherche, les résistances institutionnelles, et la synthèse finale : une méthode accessible à tous, basée sur trois pratiques simples (lumière, balancement, respiration rythmique), qui produit des effets neurologiques documentés. Tu sortiras de ce cours avec une compréhension complète du 'pourquoi' de l'école — et cette compréhension renforcera chaque pratique qui suit.",
    pedagogicalObjective: "Comprendre l'origine, la logique et la cohérence interne de la méthode des rythmes lumineux comme système d'éveil documenté.",
    initiaticObjective: "Inscrire ta pratique dans une lignée de recherche sérieuse et sentir que tu n'avances pas seul dans ce travail.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Respire lentement. Imagine que tu entres dans une bibliothèque qui contient cent ans de recherche sur l'éveil. Tu es invité à en hériter." },
      { time: "5–20 min",  title: "Enseignement",  content: "Histoire chronologique : découverte des rythmes, premières expériences, développement de la méthode, transmission et expansion mondiale." },
      { time: "20–35 min", title: "Pratique",      content: "Première expérience complète : observation 3 min, rémanence 10 min avec balancement latéral 2 secondes, carnet." },
      { time: "35–50 min", title: "Contemplation", content: "Assis en silence, observe la trace lumineuse intérieure. Laisse-la évoluer sans intervention. Note mentalement ce qui change." },
      { time: "50–57 min", title: "Carnet",        content: "Écris : 'Ce qui m'a le plus étonné dans ce cours, et la question que cela fait naître en moi.'" },
      { time: "57–60 min", title: "Clôture",       content: "Trois respirations profondes. Remercie intérieurement le chercheur inconnu qui a tracé ce chemin." }
    ],
    keyPhrase: "Une méthode d'éveil n'a de valeur que si elle est vérifiable par celui qui la pratique.",
    journalQuestions: [
      "Qu'est-ce qui t'a conduit vers cette méthode plutôt qu'une autre — et qu'est-ce que cela dit de ta recherche profonde ?",
      "Quelle est la différence entre croire en une pratique et la vérifier soi-même ? Comment vas-tu la vérifier ?",
      "Quelle est la chose la plus surprenante que tu as apprise sur l'histoire de cette méthode ?"
    ]
  });

  // ── C005 — Sensations cénesthésiques ────────────────────────────────────
  enrich("c005", {
    longSummary: "La cénesthésie est la conscience du corps de l'intérieur — non pas ce que le corps ressent en contact avec le monde, mais ce qu'il ressent de lui-même. C'est la chaleur diffuse dans les membres, la pulsation dans la poitrine, la sensation d'expansion dans la cage thoracique, le léger fourmillement dans les mains. Ce registre sensoriel est la fondation de tout développement du ressenti subtil.\n\nSans une base cénesthésique bien développée, les pratiques de clair-ressenti, de perception animale ou végétale restent floues et invérifiables. Ce cours te donne les outils concrets pour développer cette base : scanner corporel progressif, attention flottante, différenciation des sensations, et ancrage dans la continuité corporelle comme fondation de toute perception intérieure.",
    pedagogicalObjective: "Développer une conscience corporelle interne fine et différenciée comme fondation de toutes les pratiques de ressenti subtil.",
    initiaticObjective: "Habiter son corps de l'intérieur comme un temple vivant — non plus comme un outil, mais comme un espace de perception.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Allonge-toi ou assieds-toi confortablement. Ferme les yeux. Commence par sentir simplement le poids de ton corps." },
      { time: "5–20 min",  title: "Enseignement",  content: "Qu'est-ce que la cénesthésie ? Différence avec la proprioception et l'extéroception. Les cinq registres : chaleur, pulsation, pesanteur, expansion, vibration." },
      { time: "20–40 min", title: "Pratique",      content: "Scanner cénesthésique complet : pieds, jambes, bassin, ventre, poitrine, bras, mains, cou, visage, crâne. 1 minute par zone." },
      { time: "40–50 min", title: "Contemplation", content: "Maintenant que chaque zone a été 'visitée', laisse le corps être UN. Une présence globale. Un espace intérieur unifié." },
      { time: "50–57 min", title: "Carnet",        content: "Dessine une silhouette simple. Note les sensations marquantes de chaque zone avec des mots ou des couleurs." },
      { time: "57–60 min", title: "Clôture",       content: "Bouge doucement les doigts, les orteils. Ouvre les yeux. Dis : 'Mon corps est mon premier sens.'" }
    ],
    keyPhrase: "Avant de percevoir le monde subtil, apprends à percevoir ton propre corps de l'intérieur.",
    journalQuestions: [
      "Quelle zone de ton corps ressens-tu le moins — et qu'est-ce qui s'est passé pour que tu te sois déconnecté de cette zone ?",
      "As-tu remarqué une corrélation entre certaines sensations corporelles et certains états émotionnels ? Lesquels ?",
      "Si ton corps pouvait te parler par les sensations, quel message te transmettrait-il aujourd'hui ?"
    ]
  });

  // ── C006 — Cénesthésie en pratique ──────────────────────────────────────
  enrich("c006", {
    longSummary: "Le scanner corporel global est une bonne fondation, mais la vraie maîtrise de la cénesthésie passe par la localisation précise : être capable de sentir la main gauche indépendamment de la droite, le lobe postérieur du poumon distinct de l'antérieur, la zone entre les omoplates avec autant de clarté que la paume. Cette précision n'est pas une performance — elle est la condition d'une perception subtile fiable.\n\nCe cours apprend à passer du scan global à l'attention locale et de retour au global, comme un photographe qui maîtrise le zoom. Tu développeras une carte sensorielle intérieure personnelle — différente pour chacun, car chaque corps a son histoire. Cette carte deviendra ton référentiel de base pour distinguer une sensation ordinaire d'une perception inhabituellement significative.",
    pedagogicalObjective: "Passer du scanner corporel global à l'attention sensorielle localisée et affinée, zone par zone.",
    initiaticObjective: "Construire une carte sensorielle intérieure personnelle qui servira de référentiel pour toute perception subtile future.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi. Prends 3 respirations profondes. Commence par sentir simplement les deux mains posées sur tes genoux." },
      { time: "5–15 min",  title: "Enseignement",  content: "La différence entre perception globale et localisation précise. Pourquoi la précision protège de la projection." },
      { time: "15–40 min", title: "Pratique",      content: "Exercice de zooming : main droite entière (1 min) → pouce droit (1 min) → bout du pouce droit (1 min). Répéter avec 5 zones différentes." },
      { time: "40–50 min", title: "Contemplation", content: "Retour au corps entier. Compare : la carte que tu avais avant ce cours et ce que tu perçois maintenant. Qu'est-ce qui a changé ?" },
      { time: "50–57 min", title: "Carnet",        content: "Dessine deux mains. Note dans chaque zone les sensations spécifiques que tu as pu localiser avec précision." },
      { time: "57–60 min", title: "Clôture",       content: "Frotte doucement les paumes l'une contre l'autre. Sens la chaleur. Repose-les sur les genoux." }
    ],
    keyPhrase: "La précision du ressenti n'est pas une limite à la sensibilité — elle en est la condition.",
    journalQuestions: [
      "Quelle zone de ton corps as-tu le plus de mal à sentir avec précision ? Y a-t-il une histoire derrière cela ?",
      "Quand tu fais la différence entre 'je ressens' et 'je projette', qu'est-ce qui change dans ta relation au monde ?",
      "Si tu devais enseigner la cénesthésie à quelqu'un en 2 minutes, quelle serait la première chose que tu lui dirais ?"
    ]
  });

  // ── C007 — Intégrer la cénesthésie dans le quotidien ────────────────────
  enrich("c007", {
    longSummary: "La vraie mesure d'une pratique n'est pas ce qui se passe pendant la séance — c'est ce qui reste quand la séance est terminée. La cénesthésie intégrée, c'est cette qualité de présence au corps qui persiste pendant que tu marches, que tu prépares à manger, que tu conduis ou que tu travailles. Ce n'est plus un exercice : c'est une façon d'être.\n\nCe cours te donne les micro-pratiques qui permettent cette transition : l'ancrage de trente secondes, le scan de transit, la présence au souffle en situation, la détection rapide des zones de tension. Ces outils, pratiqués régulièrement, créent une continuité de conscience corporelle qui transforme progressivement la qualité de toutes tes perceptions — y compris les plus subtiles.",
    pedagogicalObjective: "Transformer le scanner formel de séance en une présence corporelle continue et naturelle dans la vie quotidienne.",
    initiaticObjective: "Faire du corps un espace de conscience permanent — non plus un lieu qu'on 'visite' pendant la méditation, mais un temple qu'on habite.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappel : as-tu été présent à ton corps entre la dernière séance et celle-ci ? Honnêteté sans jugement." },
      { time: "5–15 min",  title: "Enseignement",  content: "La différence entre pratique formelle et présence continue. Les obstacles à l'intégration : automatismes, distraction, identification mentale." },
      { time: "15–35 min", title: "Pratique",      content: "Simulation de 4 situations quotidiennes : debout devant une fenêtre, en train de boire un verre d'eau, en marchant 10 pas, en attendant. Scan cénesthésique dans chaque situation." },
      { time: "35–50 min", title: "Contemplation", content: "Assis, ferme les yeux. Imagine ta journée de demain. Dans quels moments précis pourras-tu faire un micro-scan de 10 secondes ?" },
      { time: "50–57 min", title: "Carnet",        content: "Écris 5 moments de ta journée habituelle où tu vas désormais prendre 10 secondes pour scanner ton corps. Nomme-les précisément." },
      { time: "57–60 min", title: "Clôture",       content: "Engage-toi : 'Demain, je scanne mon corps au moins 5 fois.' Pas plus. Pas moins." }
    ],
    keyPhrase: "Un temple qu'on n'habite que le dimanche n'est qu'un monument — habite le tien tous les jours.",
    journalQuestions: [
      "Dans quelle situation de ta vie quotidienne es-tu le plus 'sorti de ton corps' — et qu'est-ce qui provoque cette sortie ?",
      "Quelle est la différence entre te sentir fatigué et percevoir ta fatigue comme une information du corps ?",
      "Si tu vivais dans ton corps avec la même précision qu'un musicien dans sa musique, qu'est-ce qui changerait dans ta vie ?"
    ]
  });

  // ── C008 — Mantras et voyelles vibratoires ──────────────────────────────
  enrich("c008", {
    longSummary: "Les voyelles A, E, I, O, U ne sont pas des sons arbitraires — elles sont les cinq résonateurs naturels du corps humain. Chaque voyelle vibre préférentiellement dans une zone anatomique précise : le A dans l'abdomen, le E dans la poitrine, le I dans le crâne, le O dans la gorge, le U dans le ventre profond. Cette correspondance n'est pas symbolique — elle est vérifiable par quiconque chante ces voyelles avec attention.\n\nCe cours te donne la pratique des voyelles vibratoires comme outil d'ancrage, de centration et de résonance intérieure. Associées aux balancements et à la lumière intérieure, ces voyelles deviennent des 'ancres sonores' qui permettent de retrouver instantanément un état de conscience spécifique. Tu apprendras aussi les mantras fondamentaux de la pratique — ILLI, ALLA, OLLO, RORO — et leur relation avec les zones cérébrales.",
    pedagogicalObjective: "Maîtriser les cinq voyelles vibratoires et les quatre mantras fondamentaux comme outils d'ancrage et de résonance corporelle.",
    initiaticObjective: "Découvrir que ta voix est un instrument sacré capable de modifier ton état de conscience de l'intérieur.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi, les mains sur les genoux. Expire complètement. Dans le vide de l'expiration, où se trouve le silence ?" },
      { time: "5–15 min",  title: "Enseignement",  content: "Anatomie vibratoire : les cinq voyelles et leurs zones de résonance. Les mantras ILLI, ALLA, OLLO, RORO et leur action spécifique." },
      { time: "15–35 min", title: "Pratique",      content: "Chant des voyelles : 2 minutes par voyelle, yeux fermés, attention dans la zone de résonance. Puis 5 minutes de silence pour observer la rémanence sonore." },
      { time: "35–50 min", title: "Contemplation", content: "Dans le silence post-vibratoire, quelle zone de ton corps 'brille' encore ? Laisse cette zone être le centre de ta conscience." },
      { time: "50–57 min", title: "Carnet",        content: "Note la correspondance que tu as ressentie entre chaque voyelle et sa zone. Correspond-elle à la carte anatomique ou as-tu vécu quelque chose de différent ?" },
      { time: "57–60 min", title: "Clôture",       content: "Un dernier OM — long, doux, continu. Laisse-le s'éteindre naturellement. Reste dans ce silence une minute." }
    ],
    keyPhrase: "Ta voix est la vibration la plus directe que tu puisses offrir à ton propre cerveau.",
    journalQuestions: [
      "Quelle voyelle a résonné le plus fortement en toi — et quelle zone du corps cela active-t-il ?",
      "As-tu chanté ou récité des mantras avant cette pratique ? Comment cela se comparait-il à ce que tu viens de vivre ?",
      "Si tu devais choisir un seul mantra comme 'ancre de retour à toi-même', lequel choisirais-tu, et pourquoi ?"
    ]
  });

  // ── C009 — Convergence oculaire ─────────────────────────────────────────
  enrich("c009", {
    longSummary: "La convergence oculaire — l'acte de diriger les deux yeux vers un point commun — est l'un des rares exercices qui active simultanément les deux hémisphères cérébraux en imposant leur coopération. Lorsque les yeux convergent sur un point précis, le corps calleux s'active, la cohérence inter-hémisphérique augmente, et l'état de conscience se modifie subtilement mais mesuralement.\n\nCe cours part de cet exercice simple pour révéler une vérité fondamentale : le regard est une action, pas une réception passive. Diriger le regard avec intention, c'est diriger l'attention avec précision. Et diriger l'attention avec précision, c'est la définition même de la méditation. La convergence oculaire est donc à la fois un exercice de vision, d'attention et de conscience — en une seule pratique.",
    pedagogicalObjective: "Maîtriser la technique de convergence oculaire et comprendre son action sur la cohérence hémisphérique et l'état de conscience.",
    initiaticObjective: "Découvrir que le regard est le premier outil de la conscience — et apprendre à l'utiliser comme tel.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Frotte doucement les paumes des mains, pose-les sur les yeux fermés. Chaleur, obscurité, relâchement. Puis ouvre les yeux doucement." },
      { time: "5–15 min",  title: "Enseignement",  content: "Anatomie de la convergence : muscles oculomoteurs, corps calleux, activation hémisphérique bilatérale et ses effets sur l'état de conscience." },
      { time: "15–35 min", title: "Pratique",      content: "Exercice progressif : convergence sur l'index à bout de bras (2 min) → à 30 cm (2 min) → à 15 cm (2 min) → sur le bout du nez (1 min). Pause de 2 min. Répéter." },
      { time: "35–50 min", title: "Contemplation", content: "Yeux fermés, maintiens mentalement le 'point de convergence'. Observe ce qui se passe dans le champ intérieur quand tu 'converges' vers l'intérieur." },
      { time: "50–57 min", title: "Carnet",        content: "Note : qu'as-tu remarqué dans ta perception (couleurs, sensation de profondeur, calme) pendant et après l'exercice ?" },
      { time: "57–60 min", title: "Clôture",       content: "Regard panoramique : laisse les yeux se promener doucement dans l'espace sans fixer aucun point. Respire." }
    ],
    keyPhrase: "Converger le regard, c'est converger l'esprit — les deux sont le même mouvement.",
    journalQuestions: [
      "Quand tu regards les gens que tu aimes, est-ce que tu les 'vois' vraiment ou tu 'regardes' sans percevoir ?",
      "Qu'est-ce que l'exercice de convergence a modifié dans ton état — même subtilement ?",
      "Si le regard est une action de l'âme, sur quoi diriges-tu habituellement le tien ?"
    ]
  });

  // ── C010 — Balancement latéral complet ──────────────────────────────────
  enrich("c010", {
    longSummary: "Le balancement latéral droite-gauche au rythme de deux secondes est le premier exercice fondamental de la méthode des rythmes lumineux. Ce rythme précis — ni trop lent, ni trop rapide — correspond à la fréquence naturelle de synchronisation des deux hémisphères cérébraux. Associé à une observation lumineuse préalable, le balancement amplifie l'état de la rémanence et l'étend dans le temps.\n\nLe mantra ILLI, chanté en rythme avec le balancement, ajoute une dimension vibratoire qui ancre l'expérience dans le corps. Le carré bleu comme support visuel n'est pas arbitraire : le bleu est la couleur qui induit le plus facilement un état de calme attentif dans le système nerveux. Ce cours te donne toute la théorie et la pratique complète de ce premier balancement — celui qui est la fondation de tout le reste.",
    pedagogicalObjective: "Maîtriser le balancement latéral avec le rythme, le mantra ILLI et le support carré bleu pour une synchronisation hémisphérique optimale.",
    initiaticObjective: "Vivre pour la première fois l'expérience d'un état de conscience modifié produit par le mouvement rythmique — et le reconnaître comme réel.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Prépare ton carré bleu. Assure-toi que la pièce est calme. Observe le carré 3 minutes sans ciller." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le balancement latéral : mécanisme, rythme de 2 secondes, synchronisation hémisphérique, mantra ILLI et carré bleu." },
      { time: "15–40 min", title: "Pratique",      content: "Observation lumineuse 5 min → balancement latéral ILLI 20 min → assis immobile avec la trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Dans l'espace de la trace, observe. Ne force rien. Laisse les images, sensations, insights surgir naturellement." },
      { time: "50–57 min", title: "Carnet",        content: "Note : intensité de la trace, durée, couleur, forme. Notes sur les pensées ou images qui ont émergé pendant la pratique." },
      { time: "57–60 min", title: "Clôture",       content: "Trois respirations lentes. Baille intentionnellement. Remercie la pratique." }
    ],
    keyPhrase: "Le balancement ne t'endort pas — il t'éveille à un état que tu ne connaissais pas encore.",
    journalQuestions: [
      "Qu'as-tu ressenti pendant le balancement — physiquement, émotionnellement, mentalement ?",
      "La trace lumineuse était-elle plus nette, plus longue, plus intense après le balancement qu'avant ? Décris la différence.",
      "Si le balancement équilibre les hémisphères, lequel des deux — logique ou intuitif — avait besoin d'être rééquilibré en toi ?"
    ]
  });

  // ── C011 — Balancement vertical complet ─────────────────────────────────
  enrich("c011", {
    longSummary: "Le balancement vertical haut-bas active un axe différent du balancement latéral — l'axe crânio-sacré, qui correspond au mouvement du liquide céphalo-rachidien dans la colonne vertébrale. Ce liquide, qui baigne le cerveau et la moelle épinière, pulse naturellement de 6 à 12 fois par minute. Le balancement vertical à 2 secondes entre en résonance avec ce rythme et l'amplifie.\n\nLe mantra ALLA, associé à un carré rouge, produit une activation préférentiellement dans les zones basses du corps et du tronc cérébral — siège des fonctions vitales et de la régulation autonome. Ce deuxième balancement complète le premier en ajoutant une dimension verticale à l'équilibre hémisphérique : là où le balancement latéral synchronise la gauche et la droite, le balancement vertical synchronise le haut et le bas — le céleste et le terrestre dans le corps.",
    pedagogicalObjective: "Maîtriser le balancement vertical avec le rythme de 2 secondes, le mantra ALLA et le carré rouge pour activer l'axe crânio-sacré.",
    initiaticObjective: "Sentir le dialogue entre le haut et le bas de ton être — et reconnaître que ciel et terre se rejoignent dans la colonne vertébrale.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Debout si possible. Sens tes pieds sur le sol. Sens le sommet de ton crâne vers le ciel. Tu es l'axe entre les deux." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le liquide céphalo-rachidien et son rythme. Le balancement vertical comme amplificateur de ce rythme. ALLA et le carré rouge." },
      { time: "15–40 min", title: "Pratique",      content: "Observation carré rouge 5 min → balancement vertical ALLA 20 min → immobile avec la trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, sens l'axe de ton corps : de la base de la colonne jusqu'au sommet du crâne. Un seul axe lumineux." },
      { time: "50–57 min", title: "Carnet",        content: "Compare ce balancement avec le balancement latéral : sensations différentes ? Trace différente ? État différent ?" },
      { time: "57–60 min", title: "Clôture",       content: "Pose les deux pieds à plat. Sens le contact avec le sol. Expire longtemps. Tu es ancré." }
    ],
    keyPhrase: "L'axe crânio-sacré est la colonne de lumière que tu portes depuis ta naissance — le balancement vertical le réveille.",
    journalQuestions: [
      "As-tu senti une différence entre le balancement latéral et le vertical — et où dans le corps cette différence était-elle la plus nette ?",
      "Le haut et le bas de ton être — mental et instinctif, céleste et terrestre — sont-ils en dialogue ou en conflit actuellement ?",
      "Qu'est-ce que le mouvement haut-bas éveille en toi que le gauche-droite n'éveillait pas ?"
    ]
  });

  // ── C012 — Balancement antéro-postérieur ────────────────────────────────
  enrich("c012", {
    longSummary: "Le troisième axe du balancement — avant-arrière — complète les deux premiers pour couvrir les trois dimensions de l'espace. Si le balancement latéral synchronise les hémisphères gauche et droit, et le balancement vertical dialogue avec le haut et le bas, le balancement antéro-postérieur travaille sur la dimension passé-futur : reculer vers ce qui a été, avancer vers ce qui vient.\n\nLe mantra ELLU et le rectangle vert apportent une qualité d'ouverture et de fluidité propre à cette direction. Ce balancement est souvent le plus doux des trois — et paradoxalement le plus profond dans ses effets sur la mémoire et la projection. Beaucoup de pratiquants rapportent que c'est pendant ce balancement que des mémoires anciennes ou des visions d'avenir surgissent spontanément. Ce cours te prépare à travailler avec ces émergences sans te laisser emporter.",
    pedagogicalObjective: "Maîtriser le balancement antéro-postérieur avec ELLU et le rectangle vert, et comprendre sa relation à la dimension temporelle de la conscience.",
    initiaticObjective: "Réconcilier passé et futur dans le corps — en trouvant, dans le centre du balancement, le présent permanent.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi. Laisse ton buste s'incliner légèrement en avant, puis revenir. Sens le centre d'équilibre entre les deux. C'est là que tu es." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le troisième axe : antéro-postérieur. ELLU et rectangle vert. La relation entre ce balancement et la dimension temporelle de la mémoire." },
      { time: "15–40 min", title: "Pratique",      content: "Observation rectangle vert 5 min → balancement avant-arrière ELLU 20 min → immobile avec la trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, observe : des images du passé ou du futur émergent-elles ? Reçois-les sans t'y attacher — elles passent comme des nuages." },
      { time: "50–57 min", title: "Carnet",        content: "Note ce qui a émergé. Pas d'interprétation — juste description brute de ce qui est apparu." },
      { time: "57–60 min", title: "Clôture",       content: "Reviens au présent : sens tes pieds, ta chaise, l'air dans la pièce. Tu es ici. Maintenant." }
    ],
    keyPhrase: "Au centre du balancement avant-arrière se trouve le présent — le seul endroit où la conscience peut vraiment habiter.",
    journalQuestions: [
      "Des mémoires ou des anticipations ont-elles émergé pendant ce balancement ? Lesquelles, et quel sens leur donnes-tu ?",
      "Es-tu davantage ancré dans le passé ou dans le futur dans ta vie quotidienne — et comment cela se manifeste-t-il ?",
      "Que se passe-t-il en toi quand tu trouves, même brièvement, le point d'équilibre entre avant et arrière ?"
    ]
  });

  // ── C013 — Balancement en huit ───────────────────────────────────────────
  enrich("c013", {
    longSummary: "La lemniscate — le signe de l'infini, ce huit couché — est la figure géométrique qui représente le mieux la relation entre les deux polarités de toute réalité : gauche-droite, haut-bas, lumière-ombre, masculin-féminin. Le balancement en huit est une pratique avancée qui demande une coordination supplémentaire : il ne s'agit plus de se balancer dans une seule direction, mais de tracer mentalement et physiquement une courbe qui relie les deux côtés.\n\nCe balancement travaille particulièrement sur la synchronisation inter-hémisphérique à un niveau plus fin que le balancement latéral simple. Le rectangle orange comme support visuel introduit la chaleur du feu et de l'action dans la pratique. C'est un balancement d'intégration — idéal pour consolider des apprentissages, résoudre des tensions internes, ou préparer une transition.",
    pedagogicalObjective: "Maîtriser le balancement en lemniscate comme outil avancé d'intégration des polarités et de synchronisation hémisphérique.",
    initiaticObjective: "Expérimenter que les opposés ne sont pas en conflit — ils sont les deux arcs d'un même cercle vivant.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Dessine mentalement une lemniscate dans l'air devant toi. Sens le mouvement fluide qui unit les deux arcs sans jamais s'arrêter." },
      { time: "5–15 min",  title: "Enseignement",  content: "La lemniscate comme symbole et comme pratique. Rectangle orange. Synchronisation inter-hémisphérique avancée et intégration des polarités." },
      { time: "15–40 min", title: "Pratique",      content: "Observation rectangle orange 5 min → balancement en huit 20 min → immobile avec trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, visualise la lemniscate de lumière dans ta tête. Les deux lobes s'éclairent alternativement et forment un tout unifié." },
      { time: "50–57 min", title: "Carnet",        content: "Quelle polarité en toi a le plus besoin d'intégration ? (Ex : action/repos, expression/silence, solitude/relation.) Note ce qui est apparu." },
      { time: "57–60 min", title: "Clôture",       content: "Un dernier tracé mental de la lemniscate. Sens qu'elle continue de tourner doucement même quand tu t'arrêtes." }
    ],
    keyPhrase: "La lemniscate ne choisit pas un côté — elle les tient tous les deux dans un seul mouvement infini.",
    journalQuestions: [
      "Quelle polarité en toi est la plus difficile à intégrer — et comment cette tension se manifeste-t-elle dans ta vie ?",
      "Le balancement en huit était-il plus difficile que les trois premiers ? Qu'est-ce que cette difficulté t'apprend ?",
      "Si tu traçais une lemniscate entre ton monde intérieur et ton monde extérieur, à quel point les deux arcs se rejoindraient-ils ?"
    ]
  });

  // ── C014 — Balancement en croix ──────────────────────────────────────────
  enrich("c014", {
    longSummary: "La croix est le symbole le plus universel de l'espace orienté : les quatre directions, les quatre éléments, les quatre saisons. Le balancement en croix combine les deux axes fondamentaux — latéral et vertical — en une pratique séquentielle ou alternée qui crée une conscience spatiale complète. Là où les balancements précédents travaillaient sur un axe à la fois, le balancement en croix travaille sur l'espace tout entier.\n\nLe triangle bleu comme support visuel introduit la géométrie sacrée dans la pratique. Le triangle pointe vers le haut — vers le ciel, vers la conscience supérieure. Ce balancement est particulièrement indiqué pour les pratiques de centration avant un travail intense, ou pour retrouver l'équilibre après une période de stress ou de dispersion. C'est aussi le balancement idéal pour préparer une séance de travail avec les quatre éléments ou les quatre directions.",
    pedagogicalObjective: "Maîtriser le balancement en croix comme pratique spatiale complète combinant les axes latéral et vertical.",
    initiaticObjective: "S'ancrer dans les quatre directions comme être spatial conscient — et reconnaître le centre de la croix comme lieu de ta demeure intérieure.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Face à l'est si possible. Nomme mentalement les quatre directions. Tu es au centre. C'est là que tu commences toujours." },
      { time: "5–15 min",  title: "Enseignement",  content: "La croix comme espace orienté universel. Triangle bleu. Combinaison des axes latéral et vertical dans une pratique séquentielle." },
      { time: "15–40 min", title: "Pratique",      content: "Observation triangle bleu 5 min → balancement latéral 5 min → vertical 5 min → alternance 10 min → immobile avec trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Au centre de la croix de lumière qui illumine ton espace intérieur, qui es-tu ? Pas une pensée, pas un rôle — juste la présence." },
      { time: "50–57 min", title: "Carnet",        content: "Dessine une croix. Dans chaque bras, note ce que cette direction évoque en toi (nord/sud/est/ouest, ou passé/futur/gauche/droite selon ton ressenti)." },
      { time: "57–60 min", title: "Clôture",       content: "Pose les deux mains sur le cœur — le centre de ta croix intérieure. Expire. Tu es chez toi." }
    ],
    keyPhrase: "Le centre de la croix n'est nulle part et partout — c'est là que tu habites quand tu es vraiment toi.",
    journalQuestions: [
      "Laquelle des quatre directions de ta vie (passé, futur, relations, travail intérieur) est la plus déséquilibrée en ce moment ?",
      "Qu'as-tu ressenti au moment où tu as combiné les deux axes — une cohérence, une tension, une libération ?",
      "Si tu vivais depuis le centre de ta croix intérieure, qu'est-ce qui changerait dans tes décisions quotidiennes ?"
    ]
  });

  // ── C015 — Rotation douce ───────────────────────────────────────────────
  enrich("c015", {
    longSummary: "La rotation est le mouvement le plus ancien et le plus universel : la Terre tourne, les galaxies tournent, les électrons tournent, les derviches tournent. La rotation douce dans la pratique des rythmes lumineux est une forme délicate de ce mouvement universel — non pas une rotation du corps entier, mais un mouvement circulaire de la tête ou du buste qui trace une sphère autour du centre.\n\nCe balancement avancé travaille sur la conscience spatiale sphérique — la perception de l'espace à 360°. Le triangle violet comme support visuel introduit la dimension du spirituel profond et de l'intuition mystique. Ce balancement est souvent décrit par les pratiquants comme 'celui qui ouvre quelque chose' — une sensation d'expansion spatiale difficile à nommer mais immédiatement reconnaissable.",
    pedagogicalObjective: "Maîtriser la rotation douce comme pratique de conscience spatiale sphérique et d'expansion perceptive avancée.",
    initiaticObjective: "Expérimenter la conscience sphérique — sentir que tu es au centre d'un espace qui s'étend dans toutes les directions simultanément.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Ferme les yeux. Sens l'espace derrière toi. L'espace sur les côtés. Au-dessus. En dessous. Tu es au centre d'une sphère." },
      { time: "5–15 min",  title: "Enseignement",  content: "La rotation douce : définition, amplitude, rythme. Triangle violet. Conscience sphérique et expansion spatiale." },
      { time: "15–40 min", title: "Pratique",      content: "Observation triangle violet 5 min → rotation douce dans le sens des aiguilles 10 min → sens inverse 10 min → immobile avec trace 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la trace, sens la sphère d'espace qui t'entoure. Tu n'es pas dans l'espace — tu es le centre depuis lequel l'espace se déploie." },
      { time: "50–57 min", title: "Carnet",        content: "Note : vers le centre ou vers l'expansion ? La rotation t'a-t-elle amené vers toi-même ou ouvert vers quelque chose de plus grand ?" },
      { time: "57–60 min", title: "Clôture",       content: "Trois rotations très lentes dans chaque sens pour 'refermer' la sphère. Puis immobilité complète. Reviens." }
    ],
    keyPhrase: "La rotation douce ne te déplace pas dans l'espace — elle te révèle que tu es l'espace.",
    journalQuestions: [
      "La rotation dans un sens te semblait-elle plus naturelle que dans l'autre ? Qu'est-ce que cela t'apprend sur toi ?",
      "As-tu eu une sensation d'expansion ou de dissolution pendant la rotation ? Comment la décris-tu ?",
      "Si tu pouvais voir à 360° autour de toi dans ta vie intérieure — ce que tu veux voir et ce que tu évites — que verrait-on ?"
    ]
  });

  // ── C016 — Fer à cheval et perception arrière ────────────────────────────
  enrich("c016", {
    longSummary: "Le fer à cheval est une figure spatiale qui ouvre le champ de conscience vers l'arrière — vers ce qui est derrière nous, ce que nous ne voyons pas directement, ce qui nous suit ou nous précède sans qu'on le regarde. Dans la pratique des rythmes lumineux, visualiser un personnage dans l'espace du balancement introduit pour la première fois la présence d'un autre être dans la pratique — préparant ainsi les séances de clair-ressenti et de guidage qui viendront plus tard.\n\nCe cours travaille spécifiquement la conscience dorsale — cette zone du corps et de l'espace que nous habitons le moins. Développer une perception dorsal consciente est une étape clé du développement psychique : les perceptions les plus subtiles arrivent souvent 'par derrière', dans la zone moins contrôlée par l'ego.",
    pedagogicalObjective: "Développer la conscience dorsale et la perception arrière comme fondation des capacités extrasensorielles.",
    initiaticObjective: "Ouvrir le champ de conscience à 360° en apprenant à percevoir ce qui se passe dans l'espace que tes yeux ne voient pas.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi, dos droit. Sens la zone dans ton dos entre les omoplates. Maintenant sens l'espace derrière toi dans la pièce." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le fer à cheval : figure spatiale, conscience dorsale, introduction de la présence de l'autre dans la pratique." },
      { time: "15–40 min", title: "Pratique",      content: "Balancement latéral 10 min en visualisant un personnage debout en face → puis imaginer le personnage derrière toi 10 min → immobile 10 min." },
      { time: "40–50 min", title: "Contemplation", content: "Sens l'espace derrière toi. Quelque chose ou quelqu'un y est-il présent ? Ne force pas — observe seulement." },
      { time: "50–57 min", title: "Carnet",        content: "Note : quelle figure est apparue dans ta visualisation ? Reconnue ou inconnue ? Quelle impression, quelle qualité de présence ?" },
      { time: "57–60 min", title: "Clôture",       content: "Retourne-toi physiquement pour voir ce qu'il y a réellement derrière toi. Puis reviens face avant. Tu sais maintenant faire les deux." }
    ],
    keyPhrase: "Ce qui est derrière toi n'est pas hors de portée — tu n'as pas encore développé les sens pour le percevoir.",
    journalQuestions: [
      "Qu'est-ce qui est 'derrière toi' dans ta vie — ce que tu n'oses pas regarder, ou ce que tu as laissé derrière toi sans l'intégrer ?",
      "Quelle figure est apparue dans ta visualisation — et que penses-tu qu'elle représente ?",
      "As-tu déjà eu la sensation d'une présence derrière toi sans qu'il y ait quelqu'un ? Comment l'as-tu interprété ?"
    ]
  });

  // ── C017 — Séance combinée de balancements ──────────────────────────────
  enrich("c017", {
    longSummary: "Après avoir maîtrisé les cinq balancements séparément, cette séance les combine en une pratique fluide d'une heure : un voyage complet à travers les trois axes de l'espace, les trois mantras fondamentaux, la progression des couleurs, et l'intégration finale dans le silence. C'est la séance de synthèse de la famille Balancements — et elle constitue une initiation en elle-même.\n\nLa séquence recommandée suit une logique neurologique précise : du plus simple au plus complexe, du plus ancré au plus ouvert. Cette logique garantit que l'état de conscience s'approfondit progressivement sans brusquerie ni confusion. À la fin d'une séance combinée réussie, l'état de cohérence entre les hémisphères et l'activation de la rémanence atteignent leur maximum.",
    pedagogicalObjective: "Exécuter une séance complète combinant les cinq balancements dans une séquence logique et fluide d'une heure.",
    initiaticObjective: "Vivre pour la première fois une heure de pratique continue qui modifie durablement l'état de conscience — et reconnaître cet état comme une référence.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Prépare tous tes supports : carré bleu, rouge, vert, orange, triangle bleu, triangle violet. Respire. Tu commences un voyage." },
      { time: "5–10 min",  title: "Latéral",        content: "Balancement latéral ILLI carré bleu — entrer dans le rythme fondamental." },
      { time: "10–20 min", title: "Vertical",       content: "Balancement vertical ALLA carré rouge — activer l'axe crânio-sacré." },
      { time: "20–30 min", title: "Antérieur",      content: "Balancement avant-arrière ELLU rectangle vert — ouvrir la dimension temporelle." },
      { time: "30–45 min", title: "Avancés",        content: "10 min de balancement en huit → 5 min de rotation douce. Silence complet entre les deux." },
      { time: "45–60 min", title: "Intégration",    content: "15 minutes d'immobilité complète dans la trace combinée. Carnet en fin de séance." }
    ],
    keyPhrase: "Une heure de balancements bien conduits vaut trois heures de réflexion — le mouvement pense à ta place.",
    journalQuestions: [
      "Quel balancement a produit l'effet le plus puissant aujourd'hui, et pourquoi selon toi ?",
      "Y a-t-il eu un moment pendant la séance où quelque chose 's'est ouvert' ? Décris-le précisément.",
      "Comment te sens-tu comparé à comment tu te sentais avant la séance — et cette différence est-elle vérifiable objectivement ?"
    ]
  });

  // ── C018 — Programme 15 jours Balancements ──────────────────────────────
  enrich("c018", {
    longSummary: "La transformation durable ne vient pas d'une séance exceptionnelle — elle vient de la répétition régulière. Le programme de 15 jours de balancements est conçu pour créer exactement cela : une trace neurologique profonde et durable, construite jour après jour, balancement après balancement. Chaque jour est différent, chaque jour approfondit le précédent.\n\nCe programme est entièrement pré-configuré : aucun choix à faire, aucun réglage à effectuer. Tu arrives, tu pratiques, tu notes. La progression est calculée pour optimiser l'apprentissage : les jours 1-5 consolident les balancements de base, les jours 6-10 introduisent les combinaisons, les jours 11-15 travaillent l'intégration et la profondeur. À la fin des 15 jours, tu auras une pratique des balancements qui est devenue naturelle, efficace et autonome.",
    pedagogicalObjective: "Établir une pratique quotidienne des balancements sur 15 jours pour créer une trace neurologique profonde et durable.",
    initiaticObjective: "Choisir délibérément de modifier son quotidien pendant 15 jours comme acte de volonté initiatique.",
    minutePlan: [
      { time: "0–5 min",   title: "Intention",     content: "Chaque jour : nomme un mot-intention pour la séance. Pas un objectif — une qualité de présence." },
      { time: "5–45 min",  title: "Programme",     content: "Suive le programme du jour tel quel. Pas d'improvisation. La structure est la pratique." },
      { time: "45–55 min", title: "Trace",         content: "10 minutes d'immobilité complète après le dernier balancement. Obligatoire." },
      { time: "55–58 min", title: "Carnet",        content: "3 mots : ce que j'ai ressenti / ce qui a changé / ce que je laisse reposer." },
      { time: "58–60 min", title: "Clôture",       content: "Engagement pour demain : même heure, même lieu si possible." },
      { time: "Jours 1–15", title: "Progression",  content: "J1-5 : fondamentaux. J6-10 : combinaisons. J11-15 : intégration et profondeur. Chaque jour une note de 1-10 sur l'état de la trace." }
    ],
    keyPhrase: "15 jours de régularité font plus que 3 mois d'enthousiasme intermittent.",
    journalQuestions: [
      "Pourquoi 15 jours spécifiquement ? Qu'est-ce que cette durée représente pour toi comme engagement ?",
      "Quel est l'obstacle le plus probable qui pourrait interrompre ce programme — et comment tu vas l'anticiper ?",
      "Si tu savais avec certitude que 15 jours de pratique quotidienne allaient changer quelque chose en toi, qu'est-ce que tu espérerais que ce soit ?"
    ]
  });

  console.log("[Axis Enrichment] Cours 1-18 enrichis.");
})();
