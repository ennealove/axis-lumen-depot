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
    coverImage: "assets/courses/course-003/axis_lumen_image_1.png",
    image:      "assets/courses/course-003/axis_lumen_image_1.png",
    images: {
      cover: "assets/courses/course-003/axis_lumen_image_1.png",
      pedagogical: [
        "assets/courses/course-003/axis_lumen_image_2.png",
        "assets/courses/course-003/axis_lumen_image_3.png",
        "assets/courses/course-003/axis_lumen_image_4.png",
        "assets/courses/course-003/axis_lumen_image_5.png",
        "assets/courses/course-003/axis_lumen_image_6.png",
        "assets/courses/course-003/axis_lumen_image_7.png",
        "assets/courses/course-003/axis_lumen_image_8.png",
        "assets/courses/course-003/axis_lumen_image_9.png"
      ],
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
    },
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
    coverImage: "assets/courses/course-004/rythmes_lumineux_1_1.png",
    image:      "assets/courses/course-004/rythmes_lumineux_1_1.png",
    images: {
      cover: "assets/courses/course-004/rythmes_lumineux_1_1.png",
      pedagogical: [
        "assets/courses/course-004/rythmes_lumineux_1_2.png",
        "assets/courses/course-004/rythmes_lumineux_1_3.png",
        "assets/courses/course-004/rythmes_lumineux_1_4.png",
        "assets/courses/course-004/rythmes_lumineux_2_1.png",
        "assets/courses/course-004/rythmes_lumineux_2_2.png",
        "assets/courses/course-004/rythmes_lumineux_2_3.png",
        "assets/courses/course-004/rythmes_lumineux_2_4.png",
        "assets/courses/course-004/rythmes_lumineux_3_1.png",
        "assets/courses/course-004/rythmes_lumineux_3_2.png",
        "assets/courses/course-004/rythmes_lumineux_3_3.png",
        "assets/courses/course-004/rythmes_lumineux_3_4.png"
      ],
      gallery: [
        "assets/courses/course-004/rythmes_lumineux_1_1.png",
        "assets/courses/course-004/rythmes_lumineux_1_2.png",
        "assets/courses/course-004/rythmes_lumineux_1_3.png",
        "assets/courses/course-004/rythmes_lumineux_1_4.png",
        "assets/courses/course-004/rythmes_lumineux_2_1.png",
        "assets/courses/course-004/rythmes_lumineux_2_2.png",
        "assets/courses/course-004/rythmes_lumineux_2_3.png",
        "assets/courses/course-004/rythmes_lumineux_2_4.png",
        "assets/courses/course-004/rythmes_lumineux_3_1.png",
        "assets/courses/course-004/rythmes_lumineux_3_2.png",
        "assets/courses/course-004/rythmes_lumineux_3_3.png",
        "assets/courses/course-004/rythmes_lumineux_3_4.png"
      ]
    },
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

  // ── C005 — La cénesthésie initiatique (cours complet unifié) ────────────
  enrich("c005", {
    coverImage: "assets/courses/course-005/cenesthesie_slide_1_1.png",
    image:      "assets/courses/course-005/cenesthesie_slide_1_1.png",
    images: {
      cover: "assets/courses/course-005/cenesthesie_slide_1_1.png",
      pedagogical: [
        "assets/courses/course-005/cenesthesie_slide_1_1.png",
        "assets/courses/course-005/cenesthesie_slide_1_2.png",
        "assets/courses/course-005/cenesthesie_slide_1_3.png",
        "assets/courses/course-005/cenesthesie_slide_1_4.png",
        "assets/courses/course-005/cenesthesie_slide_2_1.png",
        "assets/courses/course-005/cenesthesie_slide_2_2.png",
        "assets/courses/course-005/cenesthesie_slide_2_3.png",
        "assets/courses/course-005/cenesthesie_slide_2_4.png",
        "assets/courses/course-005/cenesthesie_slide_3_1.png",
        "assets/courses/course-005/cenesthesie_slide_3_2.png",
        "assets/courses/course-005/cenesthesie_slide_3_3.png",
        "assets/courses/course-005/cenesthesie_slide_3_4.png"
      ]
    },
    longSummary: "La cénesthésie est la conscience du corps de l'intérieur — non pas ce que le corps ressent en contact avec le monde extérieur, mais ce qu'il ressent de lui-même : la chaleur diffuse dans les membres, la pulsation dans la poitrine, la sensation d'expansion dans la cage thoracique, le léger fourmillement dans les paumes. Ce registre sensoriel interne est la fondation absolue de tout développement des capacités extrasensorielles.\n\nSans une base cénesthésique développée, les pratiques de clairvoyance, de clairaudience et de clair-ressenti restent floues, invérifiables et sujettes à la projection imaginaire. La cénesthésie n'est pas une pratique accessoire : elle est le sol sur lequel tout le reste repose.\n\nCe cours complet suit le chemin de la cénesthésie physique jusqu'à la cénesthésie psychique : de la perception des sensations organiques à la perception des organes subtils de l'âme. Il intègre les trois dimensions — définition et fondation, précision et cartographie, intégration quotidienne — en un seul module intense et progressif.",
    pedagogicalObjective: "Développer une conscience corporelle interne fine, différenciée et continue, depuis les cinq registres cénesthésiques de base jusqu'à la perception des sensations résiduelles comme seuil de la perception spirituelle.",
    initiaticObjective: "Habiter son corps de l'intérieur comme un temple vivant et apprendre à tourner les sens vers l'intérieur — condition préalable à toute perception subtile authentique.",
    minutePlan: [
      { time: "0–5 min",    title: "Seuil",               content: "Allonge-toi ou assieds-toi confortablement. Ferme les yeux. Commence par sentir simplement le poids de ton corps sur la surface qui te porte." },
      { time: "5–20 min",   title: "Enseignement I",      content: "Qu'est-ce que la cénesthésie ? Différence avec la proprioception (position dans l'espace) et l'extéroception (les cinq sens vers l'extérieur). Les cinq registres cénesthésiques : chaleur, pulsation, pesanteur, expansion, vibration. Pourquoi sans ce sol, toute perception subtile dérive vers la projection." },
      { time: "20–40 min",  title: "Scanner global",      content: "Scanner cénesthésique complet : pieds, jambes, bassin, ventre, poitrine, bras, mains, cou, visage, crâne. Environ 1 minute par zone. Nommer mentalement chaque sensation sans l'interpréter." },
      { time: "40–50 min",  title: "Enseignement II",     content: "Les sensations résiduelles : perceptions organiques qui persistent sans stimulus extérieur. Elles forment le seuil de la perception spirituelle. Ce ne sont pas des illusions — ce sont les premières perceptions de la vie intérieure. Méthode : retourner l'oreille vers elle-même, le regard vers lui-même, le toucher vers lui-même." },
      { time: "50–65 min",  title: "Scanner de précision", content: "Exercice de zooming : main droite entière (1 min) → paume uniquement (1 min) → bout du majeur droit (1 min). Répéter avec 3 autres zones au choix. Observer ce qui reste — les sensations résiduelles — après avoir retiré l'attention." },
      { time: "65–75 min",  title: "Enseignement III",    content: "La cénesthésie psychique : de même que les organes physiques donnent des sensations organiques spécifiques, les organes psychiques de l'âme donnent des sensations intérieures spécifiques. Sentir la joie non pas comme une émotion abstraite mais comme une sensation localisée. Sentir le doute, la clarté, la vigilance comme des états intérieurs avec une texture sensorielle." },
      { time: "75–85 min",  title: "Intégration",         content: "Ferme les yeux. Laisse le corps être UN. Observe s'il reste une sensation sans cause externe — sans stimulus, sans mouvement. Si oui : tu touches le seuil. Reste là sans te précipiter." },
      { time: "85–87 min",  title: "Carnet",              content: "Dessine une silhouette simple. Note les zones les plus vivantes, les zones les plus silencieuses, et une sensation résiduelle si tu en as repéré une." },
      { time: "87–90 min",  title: "Clôture",             content: "Bouge doucement les doigts, les orteils. Ouvre les yeux. Retiens ceci : 'Je ne perçois le monde subtil qu'avec la même attention que celle que je porte à mon propre corps.'" }
    ],
    keyPhrase: "Les sensations résiduelles forment le seuil de la perception spirituelle — apprends à les reconnaître avant de chercher plus loin.",
    teaching: {
      intro: "La cénesthésie est le sens le plus ignoré et pourtant le plus fondamental. Toutes les traditions de développement intérieur qui ont produit des résultats vérifiables ont une chose en commun : elles commencent par le corps. Non pas le corps comme obstacle à transcender, mais le corps comme instrument de perception à affiner. Ce cours complet trace le chemin de la cénesthésie physique ordinaire jusqu'à la cénesthésie psychique — la perception des organes intérieurs de l'âme.",
      sections: [
        {
          title: "La cénesthésie — définition et place dans la hiérarchie des sens",
          content: "La physiologie distingue trois grandes familles de perception sensorielle. L'extéroception regroupe les cinq sens classiques orientés vers le monde extérieur : vue, ouïe, odorat, goût, toucher. La proprioception informe le cerveau de la position et du mouvement du corps dans l'espace — c'est elle qui te permet de toucher ton nez les yeux fermés. La cénesthésie, enfin, est la perception du corps par lui-même : non pas sa position ni ses contacts avec l'extérieur, mais son état interne — la chaleur diffuse d'un membre, la légère pulsation dans une zone, la sensation d'expansion ou de compression dans la poitrine, le fourmillement fin dans les mains.\n\nCes cinq registres cénesthésiques fondamentaux — chaleur, pulsation, pesanteur, expansion, vibration — sont les lettres de l'alphabet du corps. Avant de lire un texte subtil, il faut maîtriser l'alphabet. Avant de percevoir quoi que ce soit d'extrasensoriel, il faut avoir développé une sensibilité fine à ces cinq registres dans son propre corps.\n\nLe paradoxe est que la cénesthésie est le sens le plus proche de nous et le plus négligé. Nous passons des heures à regarder l'extérieur, à écouter l'extérieur, à saisir l'extérieur — et des minutes à peine à sentir l'intérieur. Ce déséquilibre crée un vide sensoriel interne qui se remplit de projections, d'interprétations, d'imaginations. La cénesthésie pratiquée régulièrement remplace ce vide par une présence réelle."
        },
        {
          title: "Les sensations résiduelles — seuil de la perception spirituelle",
          content: "Il existe une catégorie particulière de sensations cénesthésiques qui mérite une attention spéciale : les sensations résiduelles. Ce sont des perceptions organiques qui persistent sans stimulus extérieur identifiable. Tu viens de poser ta main sur ton genou, puis tu la retires — et tu continues à sentir quelque chose à l'endroit où elle était posée. Tu as fermé les yeux depuis plusieurs minutes — et tu perçois encore une légère lumière, comme un résidu de vision. Tu as cessé d'écouter — et tu entends encore un léger bruit interne, comme un bourdonnement fin dans l'oreille.\n\nCes sensations résiduelles ne sont pas des illusions ni des artefacts neurologiques sans importance. Elles forment le seuil de la perception spirituelle. Ce sont les premières manifestations de ce que les traditions appelaient la « vie intérieure » — une activité perceptuelle qui ne dépend plus du monde extérieur pour exister.\n\nLa méthode pour les développer est simple mais exige de la patience : après une stimulation sensorielle (regarder une lumière, écouter un son, sentir la chaleur d'une flamme), retirer le stimulus et observer ce qui reste. Au début, les résidus sont brefs — quelques secondes. Avec la pratique, ils s'allongent, se précisent, s'approfondissent. Ce sont ces résidus prolongés qui constituent les premiers pas vers la clairvoyance et la clairaudience authentiques."
        },
        {
          title: "Le mouvement centripète — retourner les sens vers l'intérieur",
          content: "Dans la vie ordinaire, nos sens fonctionnent en mode centrifuge : ils se projettent vers l'extérieur, captent des informations du monde, les ramènent au cerveau pour interprétation. Ce mode est nécessaire pour la survie et l'action. Mais il crée une habitude sensorielle profonde : l'attention pointe toujours vers l'extérieur, jamais vers l'intérieur.\n\nLe mouvement centripète est l'inverse : retourner les sens vers eux-mêmes. Au lieu d'écouter le monde, écouter l'oreille elle-même — son activité interne, son bourdonnement propre, le silence qui précède tout son. Au lieu de voir le monde, observer l'activité du regard lui-même — les formes lumineuses qui apparaissent derrière les paupières fermées, les fluctuations de la lumière intérieure. Au lieu de toucher pour capter, sentir la surface intérieure du toucher — la chaleur de la peau elle-même, la pulsation sous les doigts.\n\nCe retournement de l'attention n'est pas passif. C'est un acte actif, volontaire, qui demande un effort soutenu au début. Le mental résiste : il est habitué à saisir l'extérieur, à se nourrir de stimulations. Apprendre à se tourner vers l'intérieur est literalement apprendre à marcher dans une direction que le corps n'a jamais exploitée. Avec la pratique, ce mouvement devient naturel et finit par s'installer en permanence, comme un fond de conscience corporelle qui accompagne toute activité."
        },
        {
          title: "Scanner corporel progressif — cartographier le corps de l'intérieur",
          content: "Le scanner corporel systématique est l'outil principal du développement cénesthésique. Son principe est simple : diriger l'attention vers chaque zone du corps successivement, en observant ce qui est présent sans chercher à le modifier ni à l'interpréter.\n\nLe scanner complet suit cette progression : pieds et orteils — chevilles et mollets — genoux et cuisses — bassin et hanches — bas du ventre — nombril et abdomen moyen — plexus solaire — poitrine — bras et avant-bras — mains et doigts — cou et gorge — visage — crâne. Environ une minute par zone au début, moins quand la pratique s'installe.\n\nMais le vrai travail commence après le scanner global : l'exercice de zooming. Prend une zone — la main droite par exemple. Sens-la dans sa globalité (1 minute). Réduis l'attention à la paume uniquement (1 minute). Réduis encore au bout du majeur (1 minute). Observe ce qui reste quand tu retires l'attention — les sensations résiduelles. Puis remonte : du bout du doigt à la paume, de la paume à la main entière, de la main au bras entier.\n\nCet exercice de zooming développe deux capacités essentielles : la précision sensorielle (distinguer deux zones voisines avec clarté) et la detection des résidus (percevoir ce qui persiste après le retrait de l'attention). Ces deux capacités sont les fondations directes de la clairvoyance et de la clairaudience — perceptions fines et perceptions sans stimulus."
        },
        {
          title: "La cénesthésie psychique — les organes intérieurs de l'âme",
          content: "La cénesthésie physique — percevoir les organes et tissus du corps — n'est que le premier niveau. Il existe un niveau plus profond : la cénesthésie psychique, la perception des organes de la vie intérieure.\n\nDe même que le corps physique donne des sensations organiques spécifiques selon la zone perçue (la chaleur du foie est différente de la fraîcheur du poumon, la pulsation du cœur diffère de la pesanteur de l'estomac), la vie psychique intérieure donne elle aussi des sensations spécifiques selon l'état traversé. La joie a une texture sensorielle localisable — une expansion dans la poitrine, une légèreté dans les membres. Le doute a la sienne — une compression dans la gorge, un vide dans le ventre. La clarté intérieure a la sienne — une sensation de luminosité fine au niveau du front, une immobilité dans la respiration.\n\nCes sensations psycho-cénesthésiques ne sont pas des métaphores. Elles sont des perceptions réelles, vérifiables, répétables. Apprendre à les reconnaître et à les distinguer les unes des autres constitue le développement de ce qu'on appellera plus tard la clairsentience — la capacité à percevoir des états et des qualités invisibles avec autant de précision que le nez perçoit les odeurs.\n\nL'état psycho-cénesthésique le plus important à reconnaître est ce que les traditions appellent différemment — état d'éveil, sur-conscience, présence amplifiée. Il est reconnaissable à une sensation très particulière : une qualité de présence simultanée au corps et à un espace plus vaste que le corps, une clarté qui n'est pas mentale mais sensorielle, une immobilité intérieure qui n'est pas absence mais plénitude."
        },
        {
          title: "Intégration quotidienne — la présence corporelle permanente",
          content: "La vraie mesure d'une pratique cénesthésique n'est pas ce qui se passe pendant la séance — c'est ce qui reste quand la séance est terminée. La cénesthésie intégrée, c'est cette qualité de présence au corps qui persiste pendant que tu marches, que tu prépares un repas, que tu conduis, que tu travailles.\n\nL'intégration passe par des micro-pratiques régulières tout au long de la journée. Cinq secondes en attendant que l'eau bout : sentir les deux mains, la chaleur dans la paume. Dix secondes avant de répondre au téléphone : scan rapide de la poitrine et du ventre. Trente secondes en marchant d'une pièce à l'autre : sentir les pieds au sol, le mouvement des jambes, la respiration naturelle. Ces micro-scans ne demandent aucun temps supplémentaire — ils s'insèrent dans les interstices du quotidien.\n\nLa progression naturelle est la suivante : d'abord les séances formelles régulières (20–30 minutes chaque matin ou soir) pour construire la sensibilité de base. Puis les micro-scans de transit qui maintiennent la connexion entre les séances. Puis, progressivement, une présence corporelle de fond qui devient permanente — non plus un exercice qu'on fait, mais un état qu'on est. À ce stade, la cénesthésie n'est plus une pratique séparée : elle est la façon dont tu habites ton corps, et donc la façon dont tu perçois le monde."
        }
      ]
    },
    journalQuestions: [
      "Quelle zone de ton corps ressens-tu le moins clairement — et peux-tu identifier un moment dans ta vie où cette zone a été impliquée dans quelque chose de difficile ?",
      "As-tu perçu, même brièvement, une sensation résiduelle pendant la séance — quelque chose qui persistait sans cause externe identifiable ? Décris-la avec précision.",
      "Quelle est la différence, pour toi, entre 'je me sens bien' (évaluation mentale) et 'je perçois telle sensation précise dans telle zone de mon corps' (observation cénesthésique) ?",
      "Si tu devais choisir un seul moment de ta journée de demain pour faire un micro-scan de 10 secondes, lequel choisirais-tu — et pourquoi ce moment particulier ?"
    ]
  });

  // ── C008 — Mantras et voyelles vibratoires ──────────────────────────────
  enrich("c008", {
    coverImage: "assets/courses/course-006/mantras_vibratoires_1_1.png",
    image:      "assets/courses/course-006/mantras_vibratoires_1_1.png",
    images: {
      cover: "assets/courses/course-006/mantras_vibratoires_1_1.png",
      pedagogical: [
        "assets/courses/course-006/mantras_vibratoires_1_2.png",
        "assets/courses/course-006/mantras_vibratoires_1_3.png",
        "assets/courses/course-006/mantras_vibratoires_2_1.png",
        "assets/courses/course-006/mantras_vibratoires_2_2.png",
        "assets/courses/course-006/mantras_vibratoires_2_3.png",
        "assets/courses/course-006/mantras_vibratoires_3_1.png",
        "assets/courses/course-006/mantras_vibratoires_3_2.png",
        "assets/courses/course-006/mantras_vibratoires_3_3.png"
      ],
      gallery: [
        "assets/courses/course-006/mantras_vibratoires_1_1.png",
        "assets/courses/course-006/mantras_vibratoires_1_2.png",
        "assets/courses/course-006/mantras_vibratoires_1_3.png",
        "assets/courses/course-006/mantras_vibratoires_2_1.png",
        "assets/courses/course-006/mantras_vibratoires_2_2.png",
        "assets/courses/course-006/mantras_vibratoires_2_3.png",
        "assets/courses/course-006/mantras_vibratoires_3_1.png",
        "assets/courses/course-006/mantras_vibratoires_3_2.png",
        "assets/courses/course-006/mantras_vibratoires_3_3.png"
      ]
    },
    longSummary: "ILLI, ALLA, AILLU, OLLO — ces syllabes ne sont pas des formules arbitraires ni des mots sacrés empruntés à une tradition exotique. Ce sont des constructions phonétiques précises, bâties sur une loi simple et vérifiable : chaque position de la bouche pendant la prononciation d'une lettre est en résonance analogique avec un mouvement, une direction, une zone du corps. La voyelle I ouvre la bouche au maximum dans le sens latéral — donc ILLI accompagne le balancement gauche-droite. La voyelle A ouvre la bouche au maximum dans le sens vertical — donc ALLA accompagne le balancement haut-bas. La consonne LL est la seule consonne qui fait décrire un cercle à la langue — elle est, littéralement, la consonne du balancement. Ce cours donne la clé phonétique complète de tous les mantras de la méthode, depuis le OM primordial jusqu'aux syllabes spécifiques de chaque exercice.",
    pedagogicalObjective: "Comprendre la construction phonétique des mantras par résonance analogique, maîtriser la logique qui justifie ILLI, ALLA, AILLU et OLLO, et pratiquer OM dans ses principales modalités.",
    initiaticObjective: "Découvrir que le son n'est pas un habillage de la pratique mais sa substance même — et que la justesse phonétique d'un mantra est une condition de son efficacité.",
    teaching: {
      intro: "Toutes les traditions spirituelles ont utilisé des sons répétés — mantras, litanies, dhikr, néfés, invocations. La convergence est trop universelle pour être un hasard culturel. Ce cours donne la clé qui explique cette convergence : il existe des lois physiques de résonance entre les formes que prend la bouche en prononçant une lettre et les mouvements ou structures de l'espace intérieur. Ces lois sont mesurables, vérifiables à l'oscilloscope cathodique, et déductibles logiquement. Quand vous prononcez ILLI pendant le balancement latéral, ce n'est pas une convention — c'est une résonance analogique exacte entre le mouvement de votre langue et le mouvement de votre tête.",
      sections: [
        {
          title: "Qu'est-ce qu'un mantra — l'instrument de pensée",
          content: "Le mot sanscrit « mantra » signifie littéralement « instrument de pensée ». Cette définition mérite d'être prise au pied de la lettre : un mantra est un outil qui agit sur la pensée par deux mécanismes distincts.\n\nPremier mécanisme : le rythme. N'importe quel mot répété mentalement de façon rythmique perd son sens dans une langue humaine et commence à agir par son rythme et ses résonances analogiques. Un professeur de latin observait sur lui-même : en répétant sans cesse mentalement le même mot, celui-ci perdait tout sens en tant que langage — et devenait autre chose, plus actif, plus profond. C'est exactement cela, le mantra : un mot sorti du registre sémantique pour entrer dans le registre vibratoire.\n\nDeuxième mécanisme : la résonance analogique. Chaque son crée dans l'air des formes spécifiques — comme la poudre de lycopodes sur une plaque métallique vibrante dessine des figures géométriques précises et différentes selon la fréquence du son (figures de Chladni). De même, chaque mantra crée des formes dans l'espace de la conscience — des formes qui sont en résonance analogique avec la structure phonétique du son. Ce n'est pas de la magie : c'est de la physique des résonances appliquée à la physiologie cérébrale.\n\nLa puissance du mantra est donc double : l'action rythmique (la répétition crée un rythme qui se propage dans le cerveau) et l'action formelle (la phonétique précise du son crée des résonances spécifiques dans des zones précises). C'est pourquoi le choix du mantra n'est pas arbitraire — et c'est pourquoi ce cours vous en donne la logique complète plutôt que la simple consigne."
        },
        {
          title: "OM — la loi de polarité universelle en un seul son",
          content: "Le « pranava mantra » OM est le point de départ de toute la théorie des mantras. Il est le son le plus universel — présent dans toutes les traditions sous des formes légèrement différentes (AUM, AOM, HOUM, AWEN) — parce qu'il est l'expression phonétique de la loi de polarité universelle.\n\nVoici pourquoi. La lettre O est produite en formant les lèvres en cercle le plus parfait possible, les joues légèrement gonflées, la pointe de la langue légèrement relevée — la cavité buccale se moulant sur une sphère imaginaire. L'analyse à l'oscilloscope cathodique de ce son montre qu'il se traduit exactement par un cercle. La lettre M, en revanche, est le bourdonnement bouche fermée, lèvres au repos, voile du palais tombant — les sinus crâniens résonnant et produisant le maximum d'harmoniques possible. L'oscilloscope traduit ce son par un carré (la forme qui contient le maximum d'harmoniques, le « son blanc » de l'électronique).\n\nOM est donc, littéralement : cercle + carré. Sinusoïde pure + toutes les fréquences. Unité + multiplicité. Sphère + droites. Cette opposition se retrouve partout dans la nature : ovule et spermatozoïde, tête et membres, inspiration et expiration. C'est pourquoi OM est appelé « nom naturel de Dieu » — non par mystique, mais parce qu'il exprime phonétiquement la polarité universelle à laquelle toute la physique et toute la biologie obéissent.\n\nSon mandala naturel : un disque jaune sur un carré blanc — le cercle de la lettre O sur le carré de la lettre M. Son lieu dans le corps : l'espace entre les sourcils, où l'iris de l'œil physique offre exactement la même structure de cercles concentriques et de fibres radiées (les fibres circulaires de contraction et les fibres radiées de dilatation)."
        },
        {
          title: "Le LL — la consonne des balancements",
          content: "Parmi toutes les consonnes, une se distingue de façon unique pour les pratiques de balancements : le L double, LL. Voici pourquoi.\n\nPour prononcer la consonne L, la pointe de la langue lèche le palais plus longtemps que pour toute autre consonne — elle est la seule qui coupe vraiment le courant d'air en deux flux latéraux simultanés. Mais surtout : pendant la prononciation du L, la pointe de la langue décrit un cercle. Prononcez « LE-LE-LE » en portant l'attention sur le mouvement de la pointe de votre langue : elle décrit un cercle dans un sens. Prononcez « EL-EL-EL » : elle décrit un cercle dans l'autre sens. Le L double combine ces deux directions — la langue tourne une fois dans un sens, une fois dans l'autre — un aller-retour circulaire qui ne se retrouve dans aucune autre consonne.\n\nCe mouvement circulaire de la langue est en résonance analogique exacte avec le mouvement pendulaire de la tête dans les balancements. LL est donc ce que l'on peut appeler la « consonne des balancements » — le symbole de l'ondulation universelle que l'on retrouve dans les vagues, les vibrations sonores, le mouvement sinusoïdal fondamental de l'énergie. Ce n'est pas une coïncidence que le mot « Allah » — prononcé avec son allongement liturgique — contienne deux L et que les musulmans le récitent pendant leurs balancements de tête dans la cérémonie du dhikr."
        },
        {
          title: "La table des voyelles — anatomie phonétique",
          content: "Les voyelles se classifient selon la position de la bouche pendant leur émission. Cette classification révèle leurs résonances analogiques avec les directions du corps et de l'espace.\n\nA : ouverture maximale dans le sens vertical — la bouche s'ouvre vers le haut et vers le bas. Résonance : l'axe vertical, le mouvement de montée-descente.\n\nI : ouverture maximale dans le sens horizontal — les coins des lèvres s'écartent latéralement, la langue monte vers le palais en dos d'âne, coupant presque l'air en deux. Résonance : l'axe latéral, le balancement gauche-droite.\n\nO : les lèvres forment un cercle. Résonance : le mouvement circulaire, la rotation.\n\nU : les lèvres se tendent vers l'avant. Résonance : l'antérieur, la projection vers l'avant.\n\nAI : les coins des lèvres sont le plus en arrière. Résonance : le postérieur, le recul.\n\nCette classification n'est pas symbolique — elle repose sur la forme physique des voies vocales et leurs analogies avec les mouvements correspondants. « Le premier langage est analogique », et les voyelles en sont la démonstration la plus directe : la bouche fait le mouvement que l'on souhaite exprimer."
        },
        {
          title: "ILLI, ALLA, AILLU — la construction phonétique exacte",
          content: "Avec cette table des voyelles et la connaissance du LL comme consonne des balancements, la construction des mantras principaux devient transparente.\n\nILLI : I (ouverture latérale maximale) + LL (consonne du balancement, mouvement circulaire de la langue) + I. Ce son cadence le balancement de droite à gauche de la tête parce que la voyelle I est précisément la voyelle pour laquelle l'ouverture de la bouche est maximale dans le sens horizontal — exactement la direction du balancement latéral.\n\nALLA : A (ouverture verticale maximale) + LL + A. Ce son accompagne le balancement vertical haut-bas parce que la voyelle A est la voyelle dont l'ouverture de la bouche est maximale dans le sens vertical. L'Islam l'a intégré naturellement : « Allah » contient ALLA et IL, et les musulmans répètent cette formule pendant leurs balancements de tête dans le dhikr.\n\nAILLU : AI (lèvres le plus en arrière) + LL + U (lèvres le plus en avant). Ce son est le mantra du balancement antéro-postérieur parce que AI correspond à la position arrière de la tête et U à la position avant — les deux pôles du mouvement avant-arrière, réunis par la consonne LL du balancement.\n\nOLLO : O (cercle) + LL + O. Ce son accompagne les rotations de la tête — la voyelle O en cercle est en résonance exacte avec le mouvement circulaire.\n\nChaque mantra est ainsi une description phonétique précise du mouvement qu'il accompagne. Ce n'est pas de l'arbitraire traditionnel — c'est de la mécanique de résonance."
        },
        {
          title: "La convergence universelle — les noms divins comme mantras naturels",
          content: "Une fois la logique phonétique comprise, quelque chose de remarquable apparaît dans l'histoire des religions : les noms donnés à la divinité dans les traditions les plus diverses obéissent tous aux mêmes lois de résonance analogique.\n\nAWEN (celtique) : A (voyelle la plus postéro-inférieure) + W prononcé OU (voyelle médiane) + N (consonne la plus antéro-supérieure). Les deux pôles extrêmes + le terme médian — un équilibre phonétique remarquable qui en fait un mantra très facile à utiliser mentalement.\n\nHOUM (tibétain) : H (pré-voyelle proche de A) + OU (médian) + M (le son blanc). Variante décalée vers le grave de l'AWEN, mais même équilibre des trois pôles.\n\nAOM (zoroastrien) : glissement progressif de A vers O vers M — les deux pôles reliés par un passage continu, sans rupture, comme la colonne vertébrale qui passe progressivement des corps vertébraux arrondis (pôle O) aux lames rectilignes (pôle M).\n\nALLAH (islamique) : contient explicitement le mantra ALLA du balancement vertical et le son IL du balancement latéral. Prononcé avec son allongement liturgique par les muezzins, avec la résonance progressive de la dernière lettre H en nasale prolongée, ce nom contient les deux pôles et leur passage sinusoïdal.\n\nCette convergence n'est pas une curiosité anecdotique. Elle confirme que ces traditions ont découvert empiriquement — à travers des millénaires de pratique — les lois phonétiques de résonance que la physique du son peut maintenant formaliser."
        },
        {
          title: "Les chakras comme harmoniques d'une corde vibrante",
          content: "La répétition rythmique d'un mantra se diffuse dans l'ensemble du cerveau — des zones sensorielles vers les zones motrices, puis vers les zones de la conscience. Ce phénomène de diffusion rythmique est ce que les traditions hindoues appellent « Kundalini » : la force de la pensée rythmée qui monte le long de la colonne vertébrale.\n\nOr, la localisation des chakras dans le corps obéit exactement à la loi physique des harmoniques d'une corde vibrante ou d'un tuyau d'orgue fermé. Une corde vibrante a des points immobiles (nœuds) dont la position est déterminée par ses harmoniques naturelles : la première harmonique donne les deux extrémités, la deuxième donne le milieu, la troisième les tiers, la quatrième les quarts. En combinant les 4 premières harmoniques, on obtient 7 nœuds distincts — exactement le nombre de chakras principaux dans la tradition yoga.\n\nCes 7 nœuds correspondent exactement aux localisations des chakras : périnée, sacrum, nombril, cœur, gorge, front, sommet du crâne. La colonne vertébrale vibre sous l'effet des mantras comme un tuyau d'orgue — et les chakras sont les nœuds de cette vibration.\n\nCette compréhension a une conséquence pratique directe : chaque chakra peut être activé par un mantra construit sur les sons correspondant à sa position dans le tableau phonétique. Les sons les plus postérieurs (gutturaux) activent les chakras inférieurs, les sons médians activent les chakras centraux, les sons les plus antérieurs et aigus activent les chakras supérieurs. C'est la mécanique de tous les yoga des sons — décodée par la physique des vibrations."
        }
      ]
    },
    minutePlan: [
      { time: "0–5 min",   title: "Seuil — OM d'ouverture",  content: "Un OM chanté à voix haute, très lentement — en glissant de la bouche grande ouverte vers le bourdonnement bouche fermée. Reste dans ce silence une minute." },
      { time: "5–20 min",  title: "Enseignement — sections 1 à 4", content: "Le mantra comme instrument de pensée. OM et la polarité universelle. LL la consonne des balancements. La table des voyelles." },
      { time: "20–30 min", title: "Pratique des voyelles", content: "Chaque voyelle prononcée mentalement, yeux fermés, pendant 2 minutes. A — I — O — U — AI. Attention portée sur la forme que prend la bouche et les résonances dans la tête." },
      { time: "30–40 min", title: "Enseignement — sections 5 et 6", content: "Construction exacte de ILLI, ALLA, AILLU, OLLO. Les noms divins comme mantras naturels." },
      { time: "40–50 min", title: "Pratique des mantras de balancements", content: "Sans balancement physique : répétition mentale de ILLI (2 min), ALLA (2 min), AILLU (2 min), OLLO (2 min). Observer la résonance de chacun dans le corps." },
      { time: "50–57 min", title: "Carnet", content: "Note la correspondance ressentie pour chaque voyelle. Note le mantra qui a le plus résonné en toi — et quelle zone du corps cela a activé." },
      { time: "57–60 min", title: "Clôture — OM/MNM", content: "Bourdonnement bouche fermée, modulé lentement du grave vers l'aigu et retour. La forme la plus profonde du OM. Laisser s'éteindre naturellement." }
    ],
    keyPhrase: "ILLI ne veut rien dire — et c'est exactement pour ça qu'il fonctionne : la langue tourne dans ta bouche exactement comme ta tête tourne dans l'espace.",
    journalQuestions: [
      "En prononçant ILLI, ALLA, AILLU mentalement sans bouger la tête, as-tu senti une correspondance entre la forme du son dans ta bouche et une direction du corps ou de l'espace ?",
      "Quelle différence as-tu ressenti entre répéter un mot de ta langue maternelle et répéter un mantra ? À quel moment la signification s'efface-t-elle pour laisser place à la vibration pure ?",
      "Le lien entre le nom divin ALLAH et le mantra ALLA du balancement vertical te semble-t-il fortuit ou révélateur d'une loi sous-jacente ? Qu'est-ce que cela change dans ta façon d'entendre les liturgies du monde ?"
    ]
  });

  // ── C009 — Convergence oculaire ─────────────────────────────────────────
  enrich("c009", {
    coverImage: "assets/courses/course-007/convergence_oculaire_1_1.png",
    image:      "assets/courses/course-007/convergence_oculaire_1_1.png",
    images: {
      cover: "assets/courses/course-007/convergence_oculaire_1_1.png",
      pedagogical: [
        "assets/courses/course-007/convergence_oculaire_1_1.png",
        "assets/courses/course-007/convergence_oculaire_1_2.png",
        "assets/courses/course-007/convergence_oculaire_1_3.png",
        "assets/courses/course-007/convergence_oculaire_1_4.png",
        "assets/courses/course-007/convergence_oculaire_2_1.png",
        "assets/courses/course-007/convergence_oculaire_2_2.png",
        "assets/courses/course-007/convergence_oculaire_2_3.png",
        "assets/courses/course-007/convergence_oculaire_2_4.png",
        "assets/courses/course-007/convergence_oculaire_3_1.png",
        "assets/courses/course-007/convergence_oculaire_3_2.png",
        "assets/courses/course-007/convergence_oculaire_3_3.png",
        "assets/courses/course-007/convergence_oculaire_3_4.png"
      ]
    },
    longSummary: "La convergence oculaire est définie par les grandes traditions initiatiques comme la clé de voûte de la science occulte — le « sine qua non » de l'accès, en pleine conscience et parfait équilibre mental, aux mondes invisibles. Cet exercice consiste à diriger les axes des deux yeux vers la racine du nez de telle sorte qu'ils se coupent sur le plan médian dans l'espace inter-orbitaire, activant ce que les traditions hindoues nomment l'œil de Shiva.\n\nContrairement à ce qu'on pourrait croire, c'est un exercice très simple dans sa technique — un crayon, une attention, quelques minutes par jour — mais d'une profondeur initiatique extraordinaire. La lumière qui en résulte n'est pas physique : elle inonde l'adepte toute la journée, dans le travail comme dans le repos, et donne un sentiment intense de réalité intérieure que rien d'autre ne peut produire.\n\nCe cours donne la technique précise, les erreurs typiques à éviter, le procédé du crayon pour un entraînement progressif et correct, l'usage des sensations cénesthésiques de l'orbite pour guider le regard dans l'obscurité, et la compréhension du lien entre l'espace inter-orbitaire et la perception de la quatrième dimension.",
    pedagogicalObjective: "Maîtriser la technique de convergence oculaire par le procédé du crayon, éviter les erreurs de faux-semblant dans l'obscurité, et développer la sensibilité aux sensations cénesthésiques orbitaires qui guident le regard intérieur.",
    initiaticObjective: "Éveiller l'œil spirituel situé entre les deux yeux — et percevoir pour la première fois la lumière non physique qui en résulte.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",              content: "Frotte doucement les paumes des mains, pose-les sur les yeux fermés. Chaleur, obscurité, relâchement total. Puis ouvre les yeux doucement." },
      { time: "5–20 min",  title: "Enseignement",        content: "Pourquoi la convergence oculaire est-elle la clé de voûte de l'initiation ? L'œil spirituel (œil de Shiva) et l'espace inter-orbitaire. Le rayon magnétique de l'axe oculaire. La tradition universelle : yogis, soufis, traditions judéo-chrétiennes." },
      { time: "20–40 min", title: "Pratique — crayon",   content: "Procédé du crayon : tenir un crayon horizontal perpendiculairement au front. Le rapprocher progressivement. Deux images correctement = convergence juste. Progresser jusqu'à l'espace inter-orbitaire. Séquences : pointe du nez (5 min) → mi-front (5 min) → racine du nez (10 min)." },
      { time: "40–55 min", title: "Pratique — obscurité", content: "Fermer les yeux ou mettre les doigts joints devant les orbites. Tenter la convergence dans le noir. Observer la tendance à regarder vers le haut. S'appuyer sur les sensations cénesthésiques de l'orbite. Si une lueur ou un point lumineux apparaît dans le champ visuel intérieur : le choisir comme point de convergence." },
      { time: "55–57 min", title: "Carnet",              content: "Note les sensations de l'orbite, les images ou lueurs perçues, et la qualité de l'état intérieur pendant et après l'exercice." },
      { time: "57–60 min", title: "Clôture",             content: "Regard panoramique très doux : laisser les yeux se promener sans fixer. Sentir la différence entre ce regard ouvert et la concentration qui vient de s'accomplir." }
    ],
    keyPhrase: "La lumière conquise par la convergence oculaire inonde l'adepte toute la journée — elle n'est pas physique, mais n'en donne pas moins une sensation intense de réalité.",
    teaching: {
      intro: "La convergence oculaire est l'exercice sur lequel toutes les traditions initiatiques qui ont produit des résultats vérifiables s'accordent. Les yogis hindous, les soufis, les traditions judéo-chrétiennes médiévales, l'image de Siméon prophétisant dans la chapelle des Carmes — tous ont reconnu dans cet exercice la clé de l'accès aux mondes invisibles. Ce n'est pas un hasard : c'est ce que les biologistes appellent « convergence des caractères » — quand des traditions différentes arrivent au même outil, c'est que cet outil correspond à une loi réelle et universelle.",
      sections: [
        {
          title: "La clé de voûte de la science occulte — l'œil de Shiva",
          content: "Cet exercice consiste à diriger les axes des deux yeux vers la racine du nez, de telle sorte qu'ils se coupent sur le plan médian dans l'espace inter-orbitaire. Il est le « sine qua non » de l'accès, en pleine conscience et parfait équilibre mental, aux mondes invisibles.\n\nLa raison en est la suivante : il existe vraisemblablement un œil spirituel situé entre les deux yeux — communément appelé « œil de Shiva » dans la tradition hindoue, ou encore troisième œil — dont l'éveil permet de percevoir la lumière spirituelle des mystiques. Or cet œil spirituel n'est pas indépendant des yeux physiques. Certaines positions des globes oculaires agissent directement sur son développement. L'explication la plus probable est qu'un rayon magnétique se dégage en permanence le long de l'axe de chaque œil. Lorsque les globes sont disposés de telle sorte que les pupilles sont dans l'angle interne de l'œil, ces axes — ces rayons magnétiques — se croisent précisément dans l'espace de l'œil de Shiva, vivifiant ce centre par leur croisement.\n\nL'élan donné à ce centre par la convergence persiste après l'exercice. C'est pourquoi la lumière qui en résulte accompagne l'adepte toute la journée, bien au-delà des minutes de pratique formelle. Elle inonde son travail, son repos, ses instants de pénombre ou de plein soleil, et donne un sentiment profond de réalité intérieure."
        },
        {
          title: "Le procédé du crayon — maîtriser la convergence correcte",
          content: "La principale difficulté de la convergence oculaire est de savoir si on la fait vraiment ou si on croit la faire. Le procédé du crayon résout ce problème de façon élégante et immédiatement vérifiable.\n\nOn tient un crayon horizontal, perpendiculairement au front. On le rapproche progressivement. Tant que les yeux convergent correctement, on perçoit deux crayons se touchant par la pointe. Si les deux images se coupent, le regard converge au point d'intersection exact. Si les deux images ne se coupent plus, les yeux ne convergent plus.\n\nCe phénomène de double vision est la diplopie physiologique normale, simplement exagérée. Dans la vision ordinaire, les objets placés devant ou derrière le point de fixation apparaissent en double — mais l'habitude fait qu'on les voit simplement flous. Lors de la convergence sur le crayon très proche du front, on ne fusionne plus ce dédoublement en un flou : une seule pointe de crayon occupe toute la surface de la fovéa (la zone de vision précise de la rétine), et les deux images restent distinctes.\n\nC'est un symbole physique saisissant de ce qui se passe dans la conscience : le point sur lequel on concentre l'attention finit par occuper tout le champ de conscience, et la lumière jaillit à partir de ce point unique."
        },
        {
          title: "La convergence dans l'obscurité — s'appuyer sur les sensations cénesthésiques",
          content: "Une partie du temps consacré à la convergence doit être pratiquée dans l'obscurité — yeux fermés, ou doigts joints devant les orbites, paupières closes. La raison est importante : au début, la lumière physique externe masque la lumière spirituelle subtile, détournant l'attention de l'intérieur vers l'extérieur. Dans l'obscurité, le point de repère habituel de la vue manque, et la lumière intérieure peut émerger sans concurrence.\n\nMais il y a un piège presque inévitable au début : dans le noir, l'étudiant croit converger alors que ses yeux regardent en haut. Les sensations musculaires de l'orbite étant maximales vers le haut, le regard dérive naturellement dans cette direction sans qu'on le sache. On est persuadé d'opérer correctement alors qu'on se trompe totalement.\n\nLa solution est d'apprendre à s'appuyer sur les sensations cénesthésiques de la cavité orbitaire pour guider le regard — sentir les muscles internes de l'orbite, les tensions fines des globes oculaires, et utiliser ces sensations internes comme boussole plutôt que les repères externes habituels. Au début, un procédé commode : commencer la convergence à la lumière, puis éteindre brusquement. Les yeux restent alors dans la bonne position par inertie, et on apprend à mémoriser la sensation musculaire correspondante."
        },
        {
          title: "Du point à la lumière — le mécanisme de l'éveil intérieur",
          content: "La vision d'un point rapproché lors de la convergence occupe progressivement de plus en plus la surface rétinienne utilisée habituellement pour le champ visuel utile. C'est un symbole grandiose : de même que ce point physique grossit par l'attention qu'on lui porte jusqu'à occuper tout le champ de vision, le point de concentration intérieure finit, lorsqu'on le maintient avec persévérance, par occuper le champ de conscience ordinairement obturé par le tourbillon des pensées et des sentiments banaux. La lumière jaillit dans l'être à partir de ce point.\n\nCette lumière qui émerge n'est pas simplement imaginée ni uniquement physique. Elle est plus douce que la lumière physique, et plus calme que les images de l'imagination ordinaire. Elle paraît le plus souvent jaillir de l'intérieur du corps, et donne ce que les témoins décrivent invariablement comme « un sentiment intense de réalité » — une présence, une certitude, une joie calme sans cause extérieure identifiable.\n\nPour ceux qui ont du mal à saisir le point dans l'obscurité, un chemin plus accessible : porter l'attention sur le plus petit phosphène qui se manifeste dans cette position, en choisissant celui qui donne l'impression subjective d'être situé entre les deux yeux. En persistant quotidiennement quelques instants de cette façon, ce phosphène se transforme progressivement en une lumière extraordinaire qui, pour n'être plus physique, n'en donne pas moins une sensation de réalité — et qui persistera dans la journée en dehors des exercices."
        },
        {
          title: "L'espace inter-orbitaire et la quatrième dimension",
          content: "Il existe un fait remarquable dont les implications sont profondes : l'espace entre les deux yeux est particulièrement lié à ce que les mathématiciens appellent la quatrième dimension. Si le regard converge dans cet espace précis, il peut percevoir une sphère dans sa totalité — comme s'il la voyait à travers la quatrième dimension, c'est-à-dire depuis l'intérieur et l'extérieur simultanément.\n\nToute méditation relative à la quatrième dimension — à l'unité de l'espace, à la simultanéité du dedans et du dehors, au dépassement de la perspective ordinaire — doit être centrée dans l'espace entre les deux yeux. C'est la raison pour laquelle toutes les traditions contemplatives ont, d'une façon ou d'une autre, identifié ce lieu comme le siège d'une forme de perception supérieure.\n\nC'est également pour cette raison que le bouddhisme et le yoga préconisent de terminer la convergence en remontant progressivement depuis la pointe du nez jusqu'à l'espace entre les deux yeux, puis le long du front, par un léger mouvement de rotation au sommet du crâne. Ce mouvement progressif de la convergence n'est pas seulement un exercice musculaire : il trace un chemin dans l'espace intérieur, depuis le centre du visage jusqu'au sommet de la conscience."
        }
      ]
    },
    journalQuestions: [
      "Pendant l'exercice du crayon, as-tu perçu clairement les deux images qui se rejoignent ? Si non, à quel moment perdais-tu la convergence — et qu'est-ce que cela t'a appris sur ton attention ?",
      "As-tu, même brièvement, perçu une lumière ou une luminosité intérieure pendant la convergence dans l'obscurité ? Décris-la avec précision : couleur, texture, intensité, durée.",
      "Quelle est la différence entre regarder et voir ? En quel sens la convergence oculaire est-elle un exercice de regard plutôt qu'un exercice de vision ?"
    ]
  });

  // ── C010 — Balancement latéral complet ──────────────────────────────────
  enrich("c010", {
    coverImage: "assets/courses/course-008/balancement_lateral_1.png",
    image:      "assets/courses/course-008/balancement_lateral_1.png",
    images: {
      cover: "assets/courses/course-008/balancement_lateral_1.png",
      pedagogical: [
        "assets/courses/course-008/balancement_lateral_2.png",
        "assets/courses/course-008/balancement_lateral_3.png",
        "assets/courses/course-008/balancement_lateral_4.png",
        "assets/courses/course-008/balancement_lateral_5.png",
        "assets/courses/course-008/balancement_lateral_6.png",
        "assets/courses/course-008/balancement_lateral_7.png",
        "assets/courses/course-008/balancement_lateral_8.png",
        "assets/courses/course-008/balancement_lateral_9.png"
      ],
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
    },
    longSummary: "Le balancement latéral droite-gauche au rythme de deux secondes est le premier exercice fondamental de la méthode des rythmes lumineux. Ce rythme précis — ni trop lent, ni trop rapide — correspond à la fréquence naturelle de synchronisation des deux hémisphères cérébraux. Associé à une observation lumineuse préalable, le balancement amplifie l'état de la rémanence et l'étend dans le temps.\n\nLe protocole complet : dans Créer sa séance, tu choisis ton objet de contemplation (forme géométrique, fleur, objet 3D…). Tu l'observes 20 secondes, puis tu fixes une ampoule de 75W pendant 30 secondes. Tu fermes les yeux, tu mets le bandeau, et tu commences le balancement. À chaque séance, la couleur de l'objet progresse automatiquement. Le mantra ILLI, répété mentalement en synchronisation avec le mouvement, ancre la vibration dans le corps. Ce cours te donne toute la théorie et la pratique complète de ce premier balancement.",
    pedagogicalObjective: "Maîtriser le balancement latéral avec le rythme de 2 secondes et le mantra ILLI — en suivant le protocole complet : objet 20 s, ampoule 75W 30 s, bandeau, balancement.",
    initiaticObjective: "Vivre pour la première fois l'expérience d'un état de conscience modifié produit par le mouvement rythmique — et le reconnaître comme réel.",
    minutePlan: [
      { time: "0–2 min",   title: "Seuil",         content: "Dans Créer sa séance, sélectionne ton objet de contemplation. Installe-toi, dos droit. Observe l'objet 20 secondes, puis fixe l'ampoule de 75W pendant 30 secondes. Ferme les yeux et mets ton bandeau." },
      { time: "2–15 min",  title: "Enseignement",  content: "Le balancement latéral : mécanisme, rythme de 2 secondes, synchronisation hémisphérique, mantra ILLI. Protocole : objet 20 s → ampoule 75W 30 s → bandeau → balancement." },
      { time: "15–40 min", title: "Pratique",      content: "Balancement latéral ILLI 20 min → assis immobile avec la rémanence 10 min. L'objet change de couleur à chaque séance." },
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
    coverImage: "assets/courses/course-009/balancement_vertical_1.png",
    image:      "assets/courses/course-009/balancement_vertical_1.png",
    images: {
      cover: "assets/courses/course-009/balancement_vertical_1.png",
      pedagogical: [
        "assets/courses/course-009/balancement_vertical_2.png",
        "assets/courses/course-009/balancement_vertical_3.png",
        "assets/courses/course-009/balancement_vertical_4.png",
        "assets/courses/course-009/balancement_vertical_5.png",
        "assets/courses/course-009/balancement_vertical_6.png",
        "assets/courses/course-009/balancement_vertical_7.png",
        "assets/courses/course-009/balancement_vertical_8.png",
        "assets/courses/course-009/balancement_vertical_9.png"
      ],
      gallery: [
        "assets/courses/course-009/balancement_vertical_1.png",
        "assets/courses/course-009/balancement_vertical_2.png",
        "assets/courses/course-009/balancement_vertical_3.png",
        "assets/courses/course-009/balancement_vertical_4.png",
        "assets/courses/course-009/balancement_vertical_5.png",
        "assets/courses/course-009/balancement_vertical_6.png",
        "assets/courses/course-009/balancement_vertical_7.png",
        "assets/courses/course-009/balancement_vertical_8.png",
        "assets/courses/course-009/balancement_vertical_9.png"
      ]
    },
    longSummary: "Le balancement vertical haut-bas active un axe différent du balancement latéral — l'axe crânio-sacré, qui correspond au mouvement du liquide céphalo-rachidien dans la colonne vertébrale. Ce liquide, qui baigne le cerveau et la moelle épinière, pulse naturellement de 6 à 12 fois par minute. Le balancement vertical à 2 secondes entre en résonance avec ce rythme et l'amplifie.\n\nLe mantra ALLA, associé à un carré rouge, produit une activation préférentiellement dans les zones basses du corps et du tronc cérébral — siège des fonctions vitales et de la régulation autonome. Ce deuxième balancement complète le premier en ajoutant une dimension verticale à l'équilibre hémisphérique : là où le balancement latéral synchronise la gauche et la droite, le balancement vertical synchronise le haut et le bas — le céleste et le terrestre dans le corps.",
    pedagogicalObjective: "Maîtriser le balancement vertical avec le rythme de 2 secondes, le mantra ALLA et le carré rouge pour activer l'axe crânio-sacré.",
    initiaticObjective: "Sentir le dialogue entre le haut et le bas de ton être — et reconnaître que ciel et terre se rejoignent dans la colonne vertébrale.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Debout si possible. Sens tes pieds sur le sol. Sens le sommet de ton crâne vers le ciel. Tu es l'axe entre les deux." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le liquide céphalo-rachidien et son rythme. Le balancement vertical comme amplificateur de ce rythme. ALLA et le carré rouge." },
      { time: "15–40 min", title: "Pratique",      content: "Objet choisi 20 s → ampoule 75W 30 s → bandeau → balancement vertical ALLA 20 min → immobile avec la rémanence 10 min." },
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
      { time: "15–40 min", title: "Pratique",      content: "Objet choisi 20 s → ampoule 75W 30 s → bandeau → balancement avant-arrière ELLU 20 min → immobile avec la rémanence 10 min." },
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
      { time: "15–40 min", title: "Pratique",      content: "Objet choisi 20 s → ampoule 75W 30 s → bandeau → balancement en huit 20 min → immobile avec la rémanence 10 min." },
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
      { time: "15–40 min", title: "Pratique",      content: "Objet choisi 20 s → ampoule 75W 30 s → bandeau → latéral 5 min → vertical 5 min → alternance 10 min → immobile avec la rémanence 10 min." },
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
      { time: "15–40 min", title: "Pratique",      content: "Objet choisi 20 s → ampoule 75W 30 s → bandeau → rotation sens horaire 10 min → sens inverse 10 min → immobile avec la rémanence 10 min." },
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
      { time: "0–2 min",   title: "Seuil",         content: "Dans Créer sa séance, sélectionne ton objet et ta durée. Installe-toi. Protocole de départ : objet 20 s → ampoule 75W 30 s → bandeau. La couleur progresse automatiquement à chaque séance." },
      { time: "2–12 min",  title: "Latéral",        content: "Balancement latéral ILLI 10 min — entrer dans le rythme fondamental. L'objet traverse la tête de gauche à droite en rythme." },
      { time: "12–22 min", title: "Vertical",       content: "Balancement vertical ALLA 10 min — activer l'axe crânio-sacré. L'objet monte et descend avec le mouvement." },
      { time: "22–32 min", title: "Antérieur",      content: "Balancement avant-arrière ELLU 10 min — ouvrir la dimension temporelle. L'objet traverse d'avant en arrière." },
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
