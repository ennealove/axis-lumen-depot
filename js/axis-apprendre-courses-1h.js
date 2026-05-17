/* Axis Lumen Studio — École du Temple Vivant
   Source unique de vérité — familles et cours.
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  // ═══════════════════════════════════════════════════════
  // FAMILLES
  // ═══════════════════════════════════════════════════════
  window.AXIS_ONE_HOUR_FAMILIES = [
    { id:"regles",       order:1,  symbol:"◎", title:"Règles de l'enseignement",          subtitle:"Cadre, sécurité, discipline, progression" },
    { id:"terrain",      order:2,  symbol:"♒", title:"Terrain vivant & alimentation",      subtitle:"Temple propre, eau, rH², émonctoires" },
    { id:"balancements", order:3,  symbol:"↔", title:"Balancements",                       subtitle:"Latéral, vertical, huit, croix, rotation" },
    { id:"soleil",       order:4,  symbol:"☉", title:"Soleil, lumière & neurosciences",    subtitle:"Rémanence, attention, rythme circadien" },
    { id:"rythmes",      order:5,  symbol:"φ", title:"Rythmes, nombre d'or & fractales",   subtitle:"Cadence, cerveau, proportions du vivant" },
    { id:"inversion",    order:6,  symbol:"↧", title:"Inversion & incarnation",            subtitle:"Ce qui est en haut comme ce qui est en bas" },
    { id:"yoga",         order:7,  symbol:"ॐ", title:"Yoga, souffle & mantras",            subtitle:"Respiration, posture, vibration" },
    { id:"clairvoyance", order:8,  symbol:"◉", title:"Clairvoyance & perception intérieure", subtitle:"Point lumineux, images, rêves, vérification" },
    { id:"ressenti",     order:9,  symbol:"♧", title:"Clair-ressenti & vivant",            subtitle:"Animal, végétal, lieux, ambiances" },
    { id:"guidance",     order:10, symbol:"✦", title:"Guidance & au-delà",                 subtitle:"Guides, défunts, prière, écoute" },
    { id:"telepathie",   order:11, symbol:"⚡", title:"Télépathie, télékinésie & recherche", subtitle:"Protocoles, tests, carnet, prudence" },
    { id:"protection",   order:12, symbol:"⛨", title:"Protection énergétique",             subtitle:"Prières, vertus, nettoyage, limites" },
    { id:"eau",          order:13, symbol:"♁", title:"Eau informée & biorésonance",        subtitle:"Pensée, eau, Spooky², plasma, terrain" },
    { id:"exercices",    order:14, symbol:"△", title:"Livre d'Exercices enrichi",          subtitle:"Les exercices sources transformés en cours 1h" }
  ];

  // ═══════════════════════════════════════════════════════
  // COURS — 119 entrées dans l'ordre d'affichage
  // ═══════════════════════════════════════════════════════
  window.AXIS_ONE_HOUR_COURSES = [

    // ── FONDATIONS (1-4) ──────────────────────────────────
    {
      id:"c001", number:1, order:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"La lumière dans les traditions du monde",
      subtitle:"Entrer dans le rythme vivant de l'attention",
      summary:"Un voyage à travers les grandes traditions humaines pour découvrir que la lumière intérieure est le secret universel de l'éveil.",
      tags:["rythme","attention","balancement","carnet"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-001/cover.webp",
      images:{ cover:"assets/courses/course-001/cover.webp", pedagogical:["assets/courses/course-001/course-001-image-02.webp","assets/courses/course-001/course-001-image-03.webp"] },
      pdfPath:"data/pdf/cours-01-lumiere-traditions.pdf", pdfPremium:true
    },
    {
      id:"c002", number:2, order:2, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Le cerveau comme organe de conscience",
      subtitle:"Cadre, sécurité, discipline, progression",
      summary:"La neuroscience confirme ce que les mystiques ont toujours su : le cerveau est un organe de conscience transformable par la pratique.",
      tags:["sécurité","discernement","sobriété","carnet"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-002/cerveau-anatomie.png",
      images:{ cover:"assets/courses/course-002/cerveau-anatomie.png", pedagogical:["assets/courses/course-002/course-002-image-02.webp","assets/courses/course-002/course-002-image-03.webp"] },
      pdfPath:"data/pdf/cours-02-cerveau-conscience.pdf", pdfPremium:true
    },
    {
      id:"c003", number:3, order:3, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Qu'est-ce qu'une initiation ?",
      subtitle:"Hygiène intérieure, ordre du lieu et disponibilité de l'attention",
      summary:"Tu es déjà en initiation. Ce cours te demande d'en prendre conscience et de comprendre les étapes du voyage que tu traverses.",
      tags:["initiation","hygiène","attention","seuil"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-003/cover.webp",
      images:{ cover:"assets/courses/course-003/cover.webp", pedagogical:["assets/courses/course-003/course-003-image-02.webp"] },
      pdfPath:"data/pdf/cours-03-initiation.pdf", pdfPremium:true
    },
    {
      id:"c004", number:4, order:4, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"La méthode des rythmes lumineux — histoire et fondements",
      subtitle:"Préparer l'espace, écouter le corps, clarifier l'attention",
      summary:"Découvrir l'histoire, les découvertes et l'œuvre d'un médecin-chercheur qui a synthétisé une méthode d'éveil accessible à tous.",
      tags:["histoire","méthode","fondements","rythmique"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-004/cover.webp",
      images:{ cover:"assets/courses/course-004/cover.webp", pedagogical:["assets/courses/course-004/course-004-image-02.webp"] },
      pdfPath:"data/pdf/cours-04-lefebure.pdf", pdfPremium:true
    },

    // ── CLAIR-RESSENTI fondations (5, 5.1, 5.2) ──────────
    {
      id:"c005", number:5, order:5, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Sensations cénesthésiques",
      subtitle:"Percevoir et habiter les sensations internes du corps vivant",
      summary:"Développer la conscience des sensations internes du corps comme fondation du clair-ressenti.",
      tags:["cénesthésie","sensations","corps","chaleur"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-005/cover.webp",
      images:{ cover:"assets/courses/course-005/cover.webp", pedagogical:["assets/courses/course-005/course-005-image-02.webp"] },
      pdfPath:"data/pdf/cours-05-sensations-cenesthesiques.pdf", pdfPremium:true
    },
    {
      id:"c006", number:5.1, order:6, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Cénesthésie en pratique — sentir depuis l'intérieur",
      subtitle:"De la perception générale aux sensations fines et localisées",
      summary:"Passer de la perception globale aux sensations localisées : cartographier le corps de l'intérieur.",
      tags:["cénesthésie","scanner","localisation","carte sensorielle"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-005/cover.webp",
      pdfPath:"data/pdf/cours-05b-cenesthesie-pratique.pdf", pdfPremium:true
    },
    {
      id:"c007", number:5.2, order:7, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Intégrer la cénesthésie dans la pratique quotidienne",
      subtitle:"Du scanner formel à la présence corporelle continue",
      summary:"Passer du scanner de séance à la conscience corporelle continue dans la vie quotidienne.",
      tags:["cénesthésie","ancrage","intégration","quotidien"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-006/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── YOGA fondations (6) ───────────────────────────────
    {
      id:"c008", number:6, order:8, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Mantras et voyelles vibratoires",
      subtitle:"Ancrer le son dans le corps comme support d'attention intérieure",
      summary:"Pratiquer les voyelles vibratoires comme ancres d'attention et de résonance corporelle.",
      tags:["mantra","voyelles","son","vibration"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-007/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── EXERCICES fondation (7) ───────────────────────────
    {
      id:"c009", number:7, order:9, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Convergence oculaire",
      subtitle:"Fusionner deux points visuels vers un centre unique",
      summary:"Diriger les deux axes visuels vers un même point central.",
      tags:["convergence","regard","concentration","binoculaire"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-008/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── BALANCEMENTS (8-15, 15.5) ─────────────────────────
    {
      id:"c010", number:8, order:10, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement latéral complet",
      subtitle:"L'oscillation droite-gauche comme rééquilibrage des hémisphères",
      summary:"Le balancement latéral droite-gauche au rythme de 2 secondes : premier exercice agissant directement sur le cerveau, avec le mantra ILLI et un carré bleu.",
      tags:["latéral","hémisphères","ILLI","carré bleu"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-009/cover.webp",
      images:{ cover:"assets/courses/course-009/cover.webp", pedagogical:["assets/courses/course-009/course-009-image-02.webp","assets/courses/course-009/course-009-image-03.webp"] },
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c011", number:9, order:11, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement vertical complet",
      subtitle:"L'oscillation haut-bas comme dialogue entre ciel et terre",
      summary:"Le balancement vertical haut-bas au rythme de 2 secondes avec le mantra ALLA et un carré rouge — l'axe cranio-sacré et le liquide céphalo-rachidien en mouvement.",
      tags:["vertical","ALLA","carré rouge","axe"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-010/cover.webp",
      images:{ cover:"assets/courses/course-010/cover.webp", pedagogical:["assets/courses/course-010/course-010-image-02.webp","assets/courses/course-010/course-010-image-03.webp"] },
      pdfPath:"data/pdf/cours-09-balancement-vertical.pdf", pdfPremium:true
    },
    {
      id:"c012", number:10, order:12, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement antéro-postérieur",
      subtitle:"L'oscillation avant-arrière comme intégration du passé et de l'avenir",
      summary:"Le balancement avant-arrière au rythme de 2 secondes avec le mantra ELLU et un rectangle vert — troisième axe, troisième dimension de la conscience.",
      tags:["antéro-postérieur","ELLU","rectangle vert","axe profond"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-011/cover.webp",
      pdfPath:"data/pdf/cours-10-balancement-antero-posterieur.pdf", pdfPremium:true
    },
    {
      id:"c013", number:11, order:13, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement en huit",
      subtitle:"La lemniscate comme intégration des polarités",
      summary:"Balancement latéral avancé avec un rectangle orange : synchroniser mouvement et pensée pour graver les apprentissages dans le cerveau.",
      tags:["lemniscate","polarités","rectangle orange","intégration"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-012/cover.webp",
      pdfPath:"data/pdf/cours-11-balancement-en-huit.pdf", pdfPremium:true
    },
    {
      id:"c014", number:12, order:14, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement en croix",
      subtitle:"Les quatre directions comme ancrage dans l'espace sacré",
      summary:"Balancement vertical avancé avec un triangle bleu : approfondir la conscience du liquide céphalo-rachidien et le rajeunissement cérébral.",
      tags:["croix","quatre directions","triangle bleu","espace sacré"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-013/cover.webp",
      pdfPath:"data/pdf/cours-12-balancement-en-croix.pdf", pdfPremium:true
    },
    {
      id:"c015", number:13, order:15, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Rotation douce",
      subtitle:"Le mouvement spiralaire comme accès à la centration profonde",
      summary:"Balancement antéro-postérieur avancé avec un triangle violet : approfondir l'axe de profondeur et introduire la visualisation végétale ou lumineuse.",
      tags:["rotation","spirale","triangle violet","centration"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-014/cover.webp",
      pdfPath:"data/pdf/cours-13-rotation-douce.pdf", pdfPremium:true
    },
    {
      id:"c016", number:14, order:16, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Fer à cheval et perception arrière",
      subtitle:"Ouvrir le champ dorsal pour une conscience spatiale complète",
      summary:"Balancement latéral avec visualisation d'un personnage : introduire l'élément humain et apprendre à projeter une présence dans l'espace du balancement.",
      tags:["fer à cheval","perception","espace","présence"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-015/cover.webp",
      pdfPath:"data/pdf/cours-14-fer-a-cheval.pdf", pdfPremium:true
    },
    {
      id:"c017", number:15, order:17, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Séance combinée de balancements",
      subtitle:"Intégration de tous les mouvements en une pratique fluide",
      summary:"Programme 15 jours sur les balancements : un protocole quotidien progressif pour intégrer les trois directions, les trois mantras et la progression des supports.",
      tags:["combinée","intégration","15 jours","protocole"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-016/cover.webp",
      pdfPath:"data/pdf/cours-15-seance-combinee-balancements.pdf", pdfPremium:true
    },
    {
      id:"c018", number:15.5, order:18, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Programme 15 jours — Balancements",
      subtitle:"Pratiquer chaque jour un balancement différent",
      summary:"15 jours de balancements guidés, entièrement pré-configurés. Aucun réglage nécessaire.",
      tags:["programme","15 jours","balancements","pratique autonome"],
      level:"Pratique intensive", duration:"15 jours",
      image:"assets/courses/course-017/cover.webp",
      pdfPath:"data/pdf/cours-15b-programme-15j-balancements.pdf", pdfPremium:true
    },

    // ── INVERSION / RESPIRATIONS RYTHMIQUES (52-59) ───────
    {
      id:"c019", number:52, order:19, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Respiration naturelle — Le souffle rythmique comme fondation",
      subtitle:"Équilibrer l'inspire, la rétention pleine, l'expire et la rétention vide",
      summary:"Respiration 4/4 : observer et rééduquer le souffle de base comme fondation de toutes les pratiques respiratoires.",
      tags:["souffle","respiration","rythme","fondation"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-018/cover.webp",
      pdfPath:"data/pdf/cours-52-respiration-naturelle.pdf", pdfPremium:true
    },
    {
      id:"c020", number:53, order:20, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Respiration diaphragmatique — Massage des organes et nerf vague",
      subtitle:"La progression complète vers la respiration circulaire",
      summary:"Respiration diaphragmatique 5/5 : approfondir le souffle abdominal pour consolider le système parasympathique.",
      tags:["diaphragme","nerf vague","parasympathique","abdomen"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-019/cover.webp",
      pdfPath:"data/pdf/cours-53-respiration-diaphragmatique.pdf", pdfPremium:true
    },
    {
      id:"c021", number:54, order:21, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Respiration carrée — L'équilibre des quatre phases",
      subtitle:"Les quatre syllabes comme instruments de résonance intérieure",
      summary:"Respiration carrée 4×4 : quatre phases égales de 4 secondes pour une régulation précise du système nerveux.",
      tags:["carrée","4 phases","équilibre","système nerveux"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-020/cover.webp",
      pdfPath:"data/pdf/cours-54-respiration-carree.pdf", pdfPremium:true
    },
    {
      id:"c022", number:55, order:22, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Respiration triangulaire — L'asymétrie ascendante",
      subtitle:"Le son originel comme outil de centration et de résonance totale",
      summary:"Respiration triangulaire 4/4/4 : trois phases égales sans rétention vide — une forme accessible pour travailler les rétentions.",
      tags:["triangulaire","3 phases","rétention","ascendant"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-021/cover.webp",
      pdfPath:"data/pdf/cours-55-respiration-triangulaire.pdf", pdfPremium:true
    },
    {
      id:"c023", number:56, order:23, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Respiration rectangulaire — L'expiration longue et le nerf vague",
      subtitle:"Clôture intégrative de la famille Souffle",
      summary:"Respiration rectangulaire 4/8 : inspiration courte et expiration longue pour activer profondément le système parasympathique.",
      tags:["rectangulaire","expiration longue","nerf vague","calme"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-022/cover.webp",
      pdfPath:"data/pdf/cours-56-respiration-rectangulaire.pdf", pdfPremium:true
    },
    {
      id:"c024", number:58, order:24, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Le Pneumophène — Respiration spirituelle et légère soif d'air",
      subtitle:"Appliquer le principe d'inversion à la pratique quotidienne",
      summary:"Le pneumophène : respiration lente avec légère privation d'air (8s/8s), équivalent respiratoire de la lumière intérieure — 20 minutes de séance.",
      tags:["pneumophène","soif d'air","inversion","spirituel"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-023/cover.webp",
      pdfPath:"data/pdf/cours-58-pneumophene.pdf", pdfPremium:true
    },
    {
      id:"c025", number:59, order:25, symbol:"↧",
      familyId:"inversion", familyTitle:"Inversion & incarnation",
      title:"Intégration respiratoire complète",
      subtitle:"Clôture de la famille Inversion : retourner le regard vers sa source",
      summary:"Intégration complète : combiner tous les rythmes respiratoires et les associer aux balancements pour une séance intégrée de 60 minutes.",
      tags:["intégration","combinée","balancements","clôture"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-024/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c026", number:59.5, order:26, symbol:"◎",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Programme 15 jours — Complet",
      subtitle:"Balancement & Respiration — Le parcours de l'éveil",
      summary:"15 séances combinées : balancement puis respiration chaque jour. La progression complète.",
      tags:["15 jours","balancement","respiration","programme"],
      level:"Initiatique avancé", duration:"15 jours",
      image:"assets/courses/course-025/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── YOGA / SOUFFLE (16-23, 23.5) ──────────────────────
    {
      id:"c027", number:16, order:27, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Yoga du temple vivant",
      subtitle:"Le corps comme espace sacré de la respiration",
      summary:"Le corps comme espace sacré : architecture respiratoire et posture juste pour la pratique du souffle.",
      tags:["yoga","corps","posture","sacré"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-026/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c028", number:17, order:28, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Postures statiques et axe",
      subtitle:"Tenir la posture comme acte de conscience",
      summary:"Les postures statiques comme pratique de présence : tenir l'axe, détendre le superflu, observer.",
      tags:["posture","axe","statique","présence"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-027/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c029", number:18, order:29, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Respiration naturelle",
      subtitle:"Retrouver le souffle originel avant toute technique",
      summary:"Retrouver la respiration abdominale spontanée, libre et naturelle, avant toute technique.",
      tags:["respiration","naturelle","abdominale","origine"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-028/cover.webp",
      pdfPath:"data/pdf/cours-52-respiration-naturelle.pdf", pdfPremium:true
    },
    {
      id:"c030", number:19, order:30, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Respiration carrée",
      subtitle:"Équilibrer l'inspire, le plein, l'expire et le vide",
      summary:"Quatre temps égaux pour équilibrer le système nerveux et développer le contrôle du souffle.",
      tags:["carrée","quatre temps","équilibre","contrôle"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-029/cover.webp",
      pdfPath:"data/pdf/cours-54-respiration-carree.pdf", pdfPremium:true
    },
    {
      id:"c031", number:20, order:31, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Respiration triangulaire et rectangulaire",
      subtitle:"Moduler le ratio inspire/expire pour des effets ciblés",
      summary:"Moduler les ratios respiratoires pour activer, équilibrer ou induire le calme profond.",
      tags:["triangulaire","rectangulaire","ratio","modulation"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-030/cover.webp",
      pdfPath:"data/pdf/cours-55-respiration-triangulaire.pdf", pdfPremium:true
    },
    {
      id:"c032", number:21, order:32, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Mantras ILLI, ALLA, OLLO, RORO",
      subtitle:"Les quatre syllabes comme instruments de résonance intérieure",
      summary:"ILLI, ALLA, OLLO, RORO : quatre mantras vibratoires, chacun résonnant dans une zone distincte du corps.",
      tags:["ILLI","ALLA","OLLO","RORO"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-031/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c033", number:22, order:33, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"OM et vibration intérieure",
      subtitle:"Le son primordial comme outil de centration et de résonance globale",
      summary:"AUM : le son primordial, ses trois phases, et la vibration intérieure qui subsiste dans le silence.",
      tags:["OM","AUM","vibration","silence"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-032/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c034", number:23, order:34, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Séquence souffle, mantra et mouvement",
      subtitle:"Clôture intégrative de la famille Souffle",
      summary:"Synthèse de la famille Souffle : associer respiration, mantra et mouvement en une pratique intégrative fluide.",
      tags:["séquence","intégration","clôture","mouvement"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-033/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c035", number:23.5, order:35, symbol:"ॐ",
      familyId:"yoga", familyTitle:"Yoga, souffle & mantras",
      title:"Programme 15 jours — Balancements & Respiration",
      subtitle:"Deux disciplines unies en un seul protocole initiatique",
      summary:"15 jours d'intégration : chaque jour un balancement et une respiration guidés. Aucun réglage nécessaire.",
      tags:["programme","15 jours","balancement","respiration"],
      level:"Intégration", duration:"15 jours",
      image:"assets/courses/course-034/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── RÈGLES complémentaires (24-27) ────────────────────
    {
      id:"c036", number:24, order:36, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Préparer une séance : ouvrir le seuil",
      subtitle:"Passer du bruit ordinaire à l'espace de pratique",
      summary:"Apprendre à préparer une séance avant toute pratique : lieu, corps, lumière douce, intention, carnet et clôture.",
      tags:["préparation","seuil","intention","carnet"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-035/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c037", number:25, order:37, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Clore une séance",
      subtitle:"Déposer la lumière, revenir au corps, intégrer l'expérience",
      summary:"Ce cours apprend à terminer une séance sans brutalité : revenir au corps, déposer l'expérience, stabiliser le souffle.",
      tags:["clôture","retour","corps","intégration"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-036/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c038", number:26, order:38, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Présence, carte et lumière",
      subtitle:"Faire descendre une vertu dans la rémanence",
      summary:"Tirer une carte de vertu, lire lentement, observer une lumière douce, déposer la vertu dans la rémanence, puis choisir un geste concret.",
      tags:["vertu","lumière","rémanence","carte"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-037/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c039", number:27, order:39, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Construire une séance d'une heure",
      subtitle:"Structure, rythme et cadre d'une pratique complète",
      summary:"Apprendre à construire une séance d'une heure : les cinq phases, le rythme, le carnet et la clôture consciente.",
      tags:["structure","séance","rythme","cadre"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-038/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── TERRAIN VIVANT (28-35) ─────────────────────────────
    {
      id:"c040", number:28, order:40, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Terrain vivant : eau, sang, souffle, minéraux",
      subtitle:"Le corps comme milieu conducteur de la pratique",
      summary:"Le corps comme milieu conducteur : eau, minéraux, souffle et sang au service de la pratique.",
      tags:["eau","minéraux","sang","conductivité"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-039/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c041", number:29, order:41, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Alimentation fraîche et réduction de la surcharge",
      subtitle:"Nourrir sans alourdir : le choix des aliments vivants",
      summary:"Alimentation vivante vs aliments morts : choisir ce qui nourrit sans alourdir.",
      tags:["alimentation","vivant","fraîcheur","légèreté"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-040/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c042", number:30, order:42, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Émonctoires : intestins, reins, foie, lymphe",
      subtitle:"Les quatre portes de sortie du terrain saturé",
      summary:"Les quatre émonctoires du corps : comprendre et soutenir les voies naturelles d'élimination.",
      tags:["émonctoires","intestins","foie","lymphe"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-041/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c043", number:31, order:43, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"rH², pH et résistivité : boussole du terrain",
      subtitle:"Mesurer l'invisible pour orienter la pratique",
      summary:"pH, rH², résistivité : les trois indicateurs du terrain vivant et comment les interpréter.",
      tags:["rH²","pH","résistivité","mesure"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-042/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c044", number:32, order:44, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Électrolytes, sel complet et conductivité",
      subtitle:"La minéralisation comme fondation de la transmission intérieure",
      summary:"Électrolytes et sel complet : le fondement ionique de la conductivité du terrain vivant.",
      tags:["électrolytes","sel","minéraux","conductivité"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-043/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c045", number:33, order:45, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Jeûne juste et temps sans manger",
      subtitle:"Les fenêtres de clarification : comprendre le jeûne comme pratique",
      summary:"Comprendre le principe du jeûne intermittent comme outil de clarification du terrain intérieur.",
      tags:["jeûne","clarification","fenêtre","intermittent"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-044/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c046", number:34, order:46, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Recettes de clarification avant pratique",
      subtitle:"Préparer le milieu intérieur avant chaque séance",
      summary:"Protocoles alimentaires simples pour préparer le corps avant une pratique intensive.",
      tags:["recettes","clarification","préparation","protocole"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-045/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c047", number:35, order:47, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Protocole terrain de sept jours",
      subtitle:"Une semaine pour transformer le milieu intérieur",
      summary:"Sept jours de protocole intégratif : eau, alimentation, émonctoires et mesures du terrain.",
      tags:["protocole","7 jours","terrain","transformation"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-046/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── SOLEIL / LUMIÈRE (36-43) ───────────────────────────
    {
      id:"c048", number:36, order:48, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Soleil visible et lumière intérieure",
      subtitle:"La lumière comme porte d'entrée de la pratique intérieure",
      summary:"Comprendre la relation entre la lumière physique et la lumière de conscience — deux aspects d'un même phénomène.",
      tags:["soleil","lumière","conscience","porte"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-047/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c049", number:37, order:49, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Prudence oculaire et observation douce",
      subtitle:"Protéger les yeux pour protéger la pratique",
      summary:"Anatomie de l'œil, sources de danger et conditions d'observation sécurisée : la prudence au service de la pratique.",
      tags:["prudence","yeux","sécurité","observation"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-048/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c050", number:38, order:50, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Rémanence lumineuse et système nerveux",
      subtitle:"La trace intérieure comme état neurologique actif",
      summary:"Rémanence lumineuse : mécanismes neurologiques, phases de la trace intérieure, protocole d'utilisation.",
      tags:["rémanence","neurologie","trace","système nerveux"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-049/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c051", number:39, order:51, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Lumière du matin et rythme circadien",
      subtitle:"Synchroniser l'horloge biologique pour une pratique plus profonde",
      summary:"Lumière du matin et rythme circadien : synchroniser l'horloge biologique pour améliorer la pratique.",
      tags:["matin","circadien","horloge","synchronisation"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-050/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c052", number:40, order:52, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Photons, attention et plasticité cérébrale",
      subtitle:"Comment la lumière réorganise le cerveau attentif",
      summary:"Lumière, attention et plasticité : comment la pratique lumineuse répétée réorganise le cerveau.",
      tags:["photons","plasticité","attention","cerveau"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-051/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c053", number:41, order:53, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Lumière, sommeil et réparation",
      subtitle:"La nuit comme laboratoire intérieur de transformation",
      summary:"Lumière du soir, mélatonine, sommeil profond : préparer la nuit comme un espace de réparation.",
      tags:["sommeil","mélatonine","nuit","réparation"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-052/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c054", number:42, order:54, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Source lumineuse, intention et imprégnation",
      subtitle:"Associer une intention à la trace pour imprégner l'inconscient",
      summary:"Observer, rémanence, intention : le protocole d'imprégnation consciente par la lumière.",
      tags:["intention","imprégnation","inconscient","lumière"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-053/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c055", number:43, order:55, symbol:"☉",
      familyId:"soleil", familyTitle:"Soleil, lumière & neurosciences",
      title:"Intégrer la lumière dans la journée",
      subtitle:"Faire de la lumière une pratique continue dans l'ordinaire",
      summary:"Protocole intégrateur : lumière du matin, rémanence du jour, lumière du soir — une journée complète.",
      tags:["journée","intégration","continu","quotidien"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-054/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── RYTHMES / NOMBRE D'OR (44-51) ─────────────────────
    {
      id:"c056", number:44, order:56, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Loi du rythme biologique",
      subtitle:"Le rythme comme première loi du vivant",
      summary:"Le rythme comme loi fondamentale du vivant : comprendre et utiliser la cadence comme outil de transformation.",
      tags:["rythme","biologique","loi","cadence"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-055/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c057", number:45, order:57, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Alternance gauche-droite et attention",
      subtitle:"Stimulation hémisphérique alternée comme outil d'équilibre cérébral",
      summary:"Alternance latérale et hémisphères cérébraux : comprendre et utiliser la stimulation alternée pour l'équilibre cognitif.",
      tags:["alternance","hémisphères","gauche","droite"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-056/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c058", number:46, order:58, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Nombre d'or comme architecture vivante",
      subtitle:"φ = 1,618 : la proportion qui structure le vivant",
      summary:"Le nombre d'or φ : principe organisateur du vivant et outil de structuration de la pratique.",
      tags:["nombre d'or","φ","proportion","architecture"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-057/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c059", number:47, order:59, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Fractales du vivant et perception",
      subtitle:"La géométrie qui se répète à toutes les échelles",
      summary:"Géométrie fractale : auto-similarité à toutes les échelles, du neurone au cosmos.",
      tags:["fractale","géométrie","échelles","vivant"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-058/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c060", number:48, order:60, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Spirales, proportions et axe intérieur",
      subtitle:"La spirale comme chemin de l'extérieur vers le centre",
      summary:"La spirale : forme universelle de convergence vers le centre — et technique de méditation pour trouver l'axe intérieur.",
      tags:["spirale","centre","axe","proportion"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-059/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c061", number:49, order:61, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"La respiration comme voie intérieure",
      subtitle:"Les quatre conditions pour que le souffle devienne transformateur",
      summary:"Introduction aux pratiques respiratoires : anatomie respiratoire, théorie des rythmes, et quatre conditions qui rendent la respiration transformatrice.",
      tags:["respiration","voie","conditions","transformateur"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-060/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c062", number:50, order:62, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Posture et fondations du souffle",
      subtitle:"Tenir le corps comme un espace stable pour la respiration profonde",
      summary:"La posture n'est pas une contrainte imposée à la respiration — elle est sa condition. Postures assise et allongée pour la respiration complète.",
      tags:["posture","fondation","souffle","stabilité"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-061/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c063", number:51, order:63, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Observer le souffle avant de le transformer",
      subtitle:"Retrouver le souffle originel avant toute technique",
      summary:"Avant les techniques respiratoires : observer le souffle tel qu'il est — sans correction, sans jugement.",
      tags:["observation","souffle","naturel","sans technique"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-062/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── CLAIRVOYANCE (60-67) ──────────────────────────────
    {
      id:"c064", number:60, order:64, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Développer l'imagination sensorielle",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Comprendre, pratiquer et intégrer l'imagination sensorielle comme fondation de la perception intérieure.",
      tags:["imagination","sensorielle","images","intérieur"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-063/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c065", number:61, order:65, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Stabiliser un point lumineux interne",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Apprendre à maintenir et stabiliser un point lumineux intérieur stable comme ancre de conscience.",
      tags:["point lumineux","stabilité","ancre","intérieur"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-064/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c066", number:62, order:66, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Images mentales et rémanence",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Travailler avec les images mentales et la rémanence lumineuse comme support de développement perceptif.",
      tags:["images mentales","rémanence","perception","développement"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-065/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c067", number:63, order:67, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Clairvoyance : fondations sobres",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Les bases sobres et vérifiables de la perception intérieure : distinguer l'imagination de la perception réelle.",
      tags:["sobriété","vérification","perception","discernement"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-066/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c068", number:64, order:68, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Rêves, symboles et carnet",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Travailler avec les rêves et les symboles comme extension de la perception intérieure — noter, observer, vérifier.",
      tags:["rêves","symboles","carnet","vérification"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-067/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c069", number:65, order:69, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Vision intérieure et silence",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Approfondir la vision intérieure dans le silence : laisser les images se former sans les forcer.",
      tags:["vision","silence","images","non-forcer"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-068/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c070", number:66, order:70, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Protocole de vérification intérieure",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Un protocole rigoureux pour vérifier la nature et la cohérence des perceptions intérieures reçues.",
      tags:["protocole","vérification","rigueur","cohérence"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-069/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c071", number:67, order:71, symbol:"◉",
      familyId:"clairvoyance", familyTitle:"Clairvoyance & perception intérieure",
      title:"Séance de clairvoyance guidée",
      subtitle:"Point lumineux, images, rêves, vérification",
      summary:"Séance complète guidée : de l'ouverture lumineuse à la perception, jusqu'au carnet et à la vérification.",
      tags:["guidée","séance","complète","intégration"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-070/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── CLAIR-RESSENTI (68-75) ────────────────────────────
    {
      id:"c072", number:68, order:72, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Clair-ressenti corporel",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Explorer et affiner le clair-ressenti corporel comme outil de perception du vivant.",
      tags:["clair-ressenti","corporel","vivant","perception"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-071/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c073", number:69, order:73, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Lecture des sensations subtiles",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Apprendre à lire et interpréter les sensations subtiles du corps sans les confondre avec l'imagination.",
      tags:["sensations","subtil","lecture","discernement"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-072/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c074", number:70, order:74, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Communication animale : approche éthique",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Une approche éthique et sobre de la communication animale par le ressenti — sans projection.",
      tags:["animal","communication","éthique","sobriété"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-073/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c075", number:71, order:75, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Communication végétale et présence",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"S'ouvrir à la présence du végétal comme être vivant et développer une communication par le ressenti.",
      tags:["végétal","présence","communication","vivant"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-074/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c076", number:72, order:76, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Dialogue avec le vivant par la lumière",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Utiliser la lumière intérieure comme pont de communication avec les formes de vie non-humaines.",
      tags:["dialogue","lumière","vivant","pont"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-075/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c077", number:73, order:77, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Ressenti des lieux et ambiances",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Percevoir l'énergie et l'ambiance d'un lieu par le ressenti corporel direct.",
      tags:["lieux","ambiance","énergie","ressenti"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-076/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c078", number:74, order:78, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Différencier intuition et projection",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Apprendre à distinguer une intuition réelle d'une projection mentale — le critère décisif.",
      tags:["intuition","projection","discernement","critère"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-077/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c079", number:75, order:79, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"Pratique quotidienne du clair-ressenti",
      subtitle:"Animal, végétal, lieux, ambiances",
      summary:"Intégrer le clair-ressenti dans la vie ordinaire : micro-pratiques, carnet, vérification au long cours.",
      tags:["quotidien","micro-pratique","carnet","intégration"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-078/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── GUIDANCE (76-83) ──────────────────────────────────
    {
      id:"c080", number:76, order:80, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Contact avec les guides : cadre et prudence",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Établir un cadre sécurisé et sobre pour le contact avec les instances intérieures ou extérieures.",
      tags:["guides","cadre","prudence","sécurité"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-079/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c081", number:77, order:81, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Prière, demande claire et écoute",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Formuler une demande claire, prier avec présence et écouter la réponse sans l'interpréter.",
      tags:["prière","demande","écoute","clarté"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-080/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c082", number:78, order:82, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Défunts et au-delà : respect et discernement",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Aborder la question des défunts avec respect, sobriété et discernement — ni fusion ni refus.",
      tags:["défunts","au-delà","respect","discernement"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-081/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c083", number:79, order:83, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Tenir une guidance sans s'identifier",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Rester soi-même pendant une guidance : ne pas se dissoudre dans le message reçu.",
      tags:["guidance","identité","ancrage","présence"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-082/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c084", number:80, order:84, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Écrire un message intérieur",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Pratiquer l'écriture automatique sobre : laisser venir un message intérieur sans le forcer ni le censurer.",
      tags:["écriture","message","intérieur","automatique"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-083/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c085", number:81, order:85, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Signes, synchronicités et tri",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Reconnaître les synchronicités sans tomber dans la paranoïa du sens — le tri rigoureux des signes.",
      tags:["synchronicité","signes","tri","rigueur"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-084/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c086", number:82, order:86, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Protéger la guidance de l'ego",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Identifier les distorsions de l'ego dans la guidance et maintenir l'honnêteté intérieure.",
      tags:["ego","distorsion","honnêteté","protection"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-085/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c087", number:83, order:87, symbol:"✦",
      familyId:"guidance", familyTitle:"Guidance & au-delà",
      title:"Rituel de clôture d'une guidance",
      subtitle:"Guides, défunts, prière, écoute",
      summary:"Terminer une guidance proprement : remercier, fermer, revenir au corps et au quotidien.",
      tags:["clôture","rituel","retour","corps"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-086/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── TÉLÉPATHIE / TÉLÉKINÉSIE (84-91) ──────────────────
    {
      id:"c088", number:84, order:88, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Télépathie : bases expérimentales",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Les bases expérimentales et reproductibles de la télépathie : protocoles sobres, mesurables, documentés.",
      tags:["télépathie","protocole","expérimental","mesurable"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-087/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c089", number:85, order:89, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Émettre une image simple",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Protocole d'émission télépathique : choisir une image simple, la former clairement, l'envoyer avec intention.",
      tags:["émission","image","intention","protocole"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-088/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c090", number:86, order:90, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Recevoir sans inventer",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"L'art de la réception : rester ouvert sans projeter — distinguer ce qui vient de ce qu'on fabrique.",
      tags:["réception","ouverture","projection","distinction"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-089/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c091", number:87, order:91, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Travail à deux : protocole et carnet",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Expérimenter la télépathie en binôme avec un protocole rigoureux et un carnet de résultats.",
      tags:["binôme","protocole","carnet","résultats"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-090/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c092", number:88, order:92, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Télékinésie : cadre de recherche et prudence",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Aborder la télékinésie comme chercheur : conditions expérimentales, prudence, documentation rigoureuse.",
      tags:["télékinésie","recherche","prudence","conditions"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-091/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c093", number:89, order:93, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Micro-intentions et observation",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Tester les micro-intentions : des expériences simples et mesurables pour observer l'effet de la pensée sur la matière.",
      tags:["micro-intention","observation","pensée","matière"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-092/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c094", number:90, order:94, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Statistiques simples et vérification",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Utiliser les statistiques de base pour évaluer objectivement les résultats de ses expériences.",
      tags:["statistiques","vérification","objectivité","mesure"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-093/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c095", number:91, order:95, symbol:"⚡",
      familyId:"telepathie", familyTitle:"Télépathie, télékinésie & recherche",
      title:"Éthique des capacités extrasensorielles",
      subtitle:"Protocoles, tests, carnet, prudence",
      summary:"Les règles éthiques fondamentales pour exercer les capacités extrasensorielles sans nuire ni manipuler.",
      tags:["éthique","responsabilité","limites","respect"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-094/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── PROTECTION ÉNERGÉTIQUE (92-99) ────────────────────
    {
      id:"c096", number:92, order:96, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Protection énergétique du corps",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Les fondations de la protection énergétique personnelle : ancrage, enveloppe lumineuse, vertus.",
      tags:["protection","corps","ancrage","enveloppe"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-095/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c097", number:93, order:97, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Nettoyage du lieu",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Protocoles pour purifier et harmoniser l'espace de pratique : eau, sel, lumière, intention et prière.",
      tags:["nettoyage","lieu","purification","harmonisation"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-096/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c098", number:94, order:98, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Prière de protection",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Les prières de protection issues des grandes traditions : comment les formuler avec présence et sincérité.",
      tags:["prière","protection","tradition","sincérité"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-097/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c099", number:95, order:99, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Vertus comme armure intérieure",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Les vertus pratiquées quotidiennement comme protection naturelle contre les influences négatives.",
      tags:["vertus","armure","protection","quotidien"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-098/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c100", number:96, order:100, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Couper les charges relationnelles",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Protocoles pour se libérer des liens énergétiques parasites issus des relations difficiles.",
      tags:["charges","liens","libération","relations"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-099/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c101", number:97, order:101, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Se recentrer après un soin ou un échange",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Retrouver son centre et son intégrité après avoir donné de l'énergie ou accompagné quelqu'un.",
      tags:["recentrage","soin","échange","intégrité"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-100/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c102", number:98, order:102, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Eau, sel, lumière et intention",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Utiliser l'eau, le sel et la lumière comme outils concrets de purification et d'intention.",
      tags:["eau","sel","lumière","purification"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-101/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c103", number:99, order:103, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Rituel quotidien de protection",
      subtitle:"Prières, vertus, nettoyage, limites",
      summary:"Construire un rituel de protection quotidien simple, efficace et ancré dans la vie réelle.",
      tags:["rituel","quotidien","simple","efficace"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-102/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── EAU INFORMÉE / BIORÉSONANCE (100-107) ─────────────
    {
      id:"c104", number:100, order:104, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Eau informée : principe symbolique et pratique",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Le principe de l'eau informée : comment la pensée et l'intention influencent la structure de l'eau.",
      tags:["eau","intention","information","structure"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-103/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c105", number:101, order:105, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Transfert de pensée dans l'eau",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Protocoles pratiques pour informer l'eau par la pensée, la prière ou la lumière.",
      tags:["transfert","pensée","eau","protocole"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-104/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c106", number:102, order:106, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Verre d'eau, intention et lumière",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Pratiquer l'information de l'eau au quotidien : un verre d'eau, une intention, une lumière.",
      tags:["verre","eau","quotidien","lumière"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-105/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c107", number:103, order:107, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Biorésonance et information du terrain",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Comprendre la biorésonance comme outil d'information du terrain biologique et de soutien à la pratique.",
      tags:["biorésonance","terrain","biologique","information"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-106/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c108", number:104, order:108, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Spooky², plasma, PEMF : cadre expérimental",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Introduction au cadre expérimental des technologies de biorésonance : Spooky², plasma et PEMF.",
      tags:["Spooky²","plasma","PEMF","expérimental"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-107/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c109", number:105, order:109, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Choisir la bonne eau pour le bon corps",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Guide pratique pour choisir et préparer l'eau adaptée à son terrain biologique et sa pratique.",
      tags:["eau","choix","terrain","pratique"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-108/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c110", number:106, order:110, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Journal de l'eau et mesures du terrain",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Tenir un journal des mesures du terrain (pH, rH², résistivité) et de la qualité de l'eau consommée.",
      tags:["journal","mesures","pH","rH²"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-109/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c111", number:107, order:111, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Protocole eau informée sept jours",
      subtitle:"Pensée, eau, Spooky², plasma, terrain",
      summary:"Un protocole complet de sept jours centré sur l'eau informée pour transformer le terrain intérieur.",
      tags:["protocole","7 jours","eau","transformation"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-110/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── LIVRE D'EXERCICES ENRICHI (108-115) ───────────────
    {
      id:"c112", number:108, order:112, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 1 — Préparer une séance",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"L'exercice source transformé en module complet : enseignement, pratique guidée, carnet et clôture.",
      tags:["préparation","exercice","module","guidé"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-111/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c113", number:109, order:113, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 2 — Observer une source lumineuse",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Observer une source de lumière douce avec prudence : protocole complet de la séance d'observation.",
      tags:["observation","lumière","source","prudence"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c114", number:110, order:114, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 3 — Accueillir la rémanence",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Accueillir la trace lumineuse après observation : ne pas fabriquer, laisser venir, déposer une intention.",
      tags:["rémanence","trace","accueil","intention"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c115", number:111, order:115, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 4 — Stabiliser le point intérieur",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Maintenir l'attention sur un point de conscience stable : front, cœur, ventre ou colonne.",
      tags:["stabilisation","point","attention","intérieur"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c116", number:112, order:116, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 5 — Tenir le carnet d'expérience",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Le carnet comme outil de vérification : date, état, lumière, rémanence, sensation, phrase reçue.",
      tags:["carnet","vérification","expérience","notation"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c117", number:113, order:117, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Exercice 6 — Clore une séance",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"La clôture consciente : revenir au corps, déposer la lumière, stabiliser le souffle, intégrer.",
      tags:["clôture","corps","souffle","intégration"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c118", number:114, order:118, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Point fixe, objet et lumière",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Fixer un objet géométrique sous lumière douce et travailler avec la trace intérieure qui en résulte.",
      tags:["point fixe","objet","lumière","géométrie"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c119", number:115, order:119, symbol:"△",
      familyId:"exercices", familyTitle:"Livre d'Exercices enrichi",
      title:"Synthèse du Livre d'Exercices",
      subtitle:"Les exercices sources transformés en cours 1h",
      summary:"Réunir tous les exercices en une séance intégrative complète — le parcours de l'élève en une heure.",
      tags:["synthèse","intégration","complète","parcours"],
      level:"Recherche", duration:"1 h",
      image:"assets/courses/course-112/cover.webp",
      pdfPath:"", pdfPremium:true
    }

  ];

  // ═══════════════════════════════════════════════════════
  // CORRECTION AUTOMATIQUE DES IMAGES
  // Le numéro de cours = numéro du dossier assets/courses/course-XXX/
  // Les cours > 112 utilisent le dossier course-112 (dernier disponible)
  // ═══════════════════════════════════════════════════════
  window.AXIS_ONE_HOUR_COURSES.forEach(function (c) {
    var n = Math.min(Math.floor(Number(c.number)), 112);
    if (n < 1) n = 1;
    var pad = String(n).padStart(3, "0");
    var base = "assets/courses/course-" + pad;
    var pfx  = "course-" + pad;
    c.image      = base + "/cover.webp";
    c.coverImage = base + "/cover.webp";
    c.images     = {
      cover:       base + "/cover.webp",
      pedagogical: [
        base + "/" + pfx + "-image-02.webp",
        base + "/" + pfx + "-image-03.webp",
        base + "/" + pfx + "-image-04.webp"
      ]
    };
  });

})();
