/* Axis Lumen Studio — École du Temple Vivant
   Source unique de vérité — familles et cours.
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  // ═══════════════════════════════════════════════════════
  // FAMILLES
  // ═══════════════════════════════════════════════════════
  window.AXIS_ONE_HOUR_FAMILIES = [
    { id:"regles",       order:1, unlockDays:1,  symbol:"◎", title:"Règles de l'enseignement",          subtitle:"Cadre, sécurité, discipline, progression" },
    { id:"terrain",      order:2, unlockDays:1,  symbol:"♒", title:"Terrain vivant & alimentation",      subtitle:"Temple propre, eau, rH², émonctoires" },
    { id:"balancements", order:3, unlockDays:1,  symbol:"↔", title:"Balancements",                       subtitle:"Latéral, vertical, huit, croix, rotation" },
    { id:"soleil",       order:4, unlockDays:1,  symbol:"☉", title:"Soleil, lumière & neurosciences",    subtitle:"Rémanence, attention, rythme circadien" },
    { id:"rythmes",      order:5, unlockDays:1,  symbol:"φ", title:"Rythmes, nombre d'or & fractales",   subtitle:"Cadence, cerveau, proportions du vivant" },
    { id:"inversion",    order:6,  symbol:"↧", title:"Inversion & incarnation",            subtitle:"Ce qui est en haut comme ce qui est en bas" },
    { id:"kundalini",    order:7,  symbol:"⊛", title:"Éveil de la Koundalini",             subtitle:"Force tourbillonnaire, axe, illumination" },
    { id:"clairvoyance", order:8, unlockDays:1,  symbol:"◉", title:"Clairvoyance & perception intérieure", subtitle:"Point lumineux, images, rêves, vérification" },
    { id:"ressenti",     order:9, unlockDays:1,  symbol:"♧", title:"Clair-ressenti & vivant",            subtitle:"Animal, végétal, lieux, ambiances" },
    { id:"guidance",     order:10, unlockDays:7, symbol:"✦", title:"Guidance & au-delà",                 subtitle:"Guides, défunts, prière, écoute" },
    { id:"telepathie",   order:11, unlockDays:7, symbol:"⚡", title:"Télépathie, télékinésie & recherche", subtitle:"Protocoles, tests, carnet, prudence" },
    { id:"protection",   order:12, unlockDays:7, symbol:"⛨", title:"Protection énergétique",             subtitle:"Prières, vertus, nettoyage, limites" },
    { id:"eau",          order:13, unlockDays:4, symbol:"♁", title:"Eau informée & biorésonance",        subtitle:"Pensée, eau, Spooky², plasma, terrain" },
    { id:"exercices",    order:14, unlockDays:4, symbol:"△", title:"Livre d'Exercices enrichi",          subtitle:"Les exercices sources transformés en cours 1h" },
    { id:"astral",       order:15, unlockDays:4, symbol:"✶", title:"Sortie de corps astral",               subtitle:"Tensions statiques, dédoublement, expériences initiatiques" }
  ];

  // ═══════════════════════════════════════════════════════
  // COURS — 119 entrées dans l'ordre d'affichage
  // ═══════════════════════════════════════════════════════
  window.AXIS_ONE_HOUR_COURSES = [

    // ── FONDATIONS (1-4) ──────────────────────────────────
    {
      id:"c001", number:1, order:1, unlockDays:1, symbol:"◎",
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
      id:"c002", number:2, order:2, unlockDays:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Le cerveau comme organe de conscience",
      subtitle:"Cadre, sécurité, discipline, progression",
      summary:"La neuroscience confirme ce que les mystiques ont toujours su : le cerveau est un organe de conscience transformable par la pratique.",
      tags:["sécurité","discernement","sobriété","carnet"],
      level:"Fondation", duration:"1 h",
      coverImage:"assets/courses/course-002/cerveau-anatomie.png",
      image:"assets/courses/course-002/cerveau-anatomie.png",
      images:{ cover:"assets/courses/course-002/cerveau-anatomie.png", pedagogical:["assets/courses/course-002/course-002-image-02.webp","assets/courses/course-002/course-002-image-03.webp"] },
      pdfPath:"data/pdf/cours-02-cerveau-conscience.pdf", pdfPremium:true
    },
    {
      id:"c003", number:3, order:3, unlockDays:1, symbol:"◎",
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
      id:"c004", number:4, order:4, unlockDays:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"La méthode des rythmes lumineux — histoire et fondements",
      subtitle:"Préparer l'espace, écouter le corps, clarifier l'attention",
      summary:"Découvrir l'histoire, les découvertes et l'œuvre d'un médecin-chercheur qui a synthétisé une méthode d'éveil accessible à tous.",
      tags:["histoire","méthode","fondements","rythmique"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-004/rythmes_lumineux_1_1.png",
      images:{ cover:"assets/courses/course-004/rythmes_lumineux_1_1.png", pedagogical:["assets/courses/course-004/rythmes_lumineux_1_2.png","assets/courses/course-004/rythmes_lumineux_1_3.png","assets/courses/course-004/rythmes_lumineux_1_4.png","assets/courses/course-004/rythmes_lumineux_2_1.png","assets/courses/course-004/rythmes_lumineux_2_2.png","assets/courses/course-004/rythmes_lumineux_2_3.png","assets/courses/course-004/rythmes_lumineux_2_4.png","assets/courses/course-004/rythmes_lumineux_3_1.png","assets/courses/course-004/rythmes_lumineux_3_2.png","assets/courses/course-004/rythmes_lumineux_3_3.png","assets/courses/course-004/rythmes_lumineux_3_4.png"], gallery:["assets/courses/course-004/rythmes_lumineux_1_1.png","assets/courses/course-004/rythmes_lumineux_1_2.png","assets/courses/course-004/rythmes_lumineux_1_3.png","assets/courses/course-004/rythmes_lumineux_1_4.png","assets/courses/course-004/rythmes_lumineux_2_1.png","assets/courses/course-004/rythmes_lumineux_2_2.png","assets/courses/course-004/rythmes_lumineux_2_3.png","assets/courses/course-004/rythmes_lumineux_2_4.png","assets/courses/course-004/rythmes_lumineux_3_1.png","assets/courses/course-004/rythmes_lumineux_3_2.png","assets/courses/course-004/rythmes_lumineux_3_3.png","assets/courses/course-004/rythmes_lumineux_3_4.png"] },
      pdfPath:"data/pdf/cours-04-lefebure.pdf", pdfPremium:true
    },

    // ── CLAIR-RESSENTI fondations (5) ──────────
    {
      id:"c005", number:5, order:5, unlockDays:1, symbol:"♧",
      familyId:"ressenti", familyTitle:"Clair-ressenti & vivant",
      title:"La cénesthésie initiatique",
      subtitle:"Fondation de toute perception subtile — sensations résiduelles, mouvement centripète et cénesthésie psychique",
      summary:"Sans porter attention aux sensations subjectives du corps vivant, le développement de la clairvoyance, de la clairaudience et de toute capacité extrasensorielle ne peut voir le jour. Ce cours complet trace le chemin complet : de la cénesthésie physique à la cénesthésie psychique.",
      tags:["cénesthésie","sensations résiduelles","perception subtile","corps vivant","mouvement centripète","cénesthésie psychique"],
      level:"Fondation", duration:"1 h 30",
      image:"assets/courses/course-005/cover.webp",
      images:{ cover:"assets/courses/course-005/cover.webp", pedagogical:["assets/courses/course-005/course-005-image-02.webp"] },
      pdfPath:"data/pdf/cours-05-cenesthesie-initiatique.pdf", pdfPremium:true
    },

    // ── KOUNDALINI — cours fondation mantra (6) ──────────
    {
      id:"c008", number:6, order:8, unlockDays:1, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Mantras et voyelles vibratoires",
      subtitle:"Ancrer le son dans le corps comme support d'attention intérieure",
      summary:"Pratiquer les voyelles vibratoires comme ancres d'attention et de résonance corporelle.",
      tags:["mantra","voyelles","son","vibration"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-006/mantras_vibratoires_1_1.png",
      images:{ cover:"assets/courses/course-006/mantras_vibratoires_1_1.png", pedagogical:["assets/courses/course-006/mantras_vibratoires_1_2.png","assets/courses/course-006/mantras_vibratoires_1_3.png","assets/courses/course-006/mantras_vibratoires_2_1.png","assets/courses/course-006/mantras_vibratoires_2_2.png","assets/courses/course-006/mantras_vibratoires_2_3.png","assets/courses/course-006/mantras_vibratoires_3_1.png","assets/courses/course-006/mantras_vibratoires_3_2.png","assets/courses/course-006/mantras_vibratoires_3_3.png"], gallery:["assets/courses/course-006/mantras_vibratoires_1_1.png","assets/courses/course-006/mantras_vibratoires_1_2.png","assets/courses/course-006/mantras_vibratoires_1_3.png","assets/courses/course-006/mantras_vibratoires_2_1.png","assets/courses/course-006/mantras_vibratoires_2_2.png","assets/courses/course-006/mantras_vibratoires_2_3.png","assets/courses/course-006/mantras_vibratoires_3_1.png","assets/courses/course-006/mantras_vibratoires_3_2.png","assets/courses/course-006/mantras_vibratoires_3_3.png"] },
      pdfPath:"", pdfPremium:true
    },

    // ── EXERCICES fondation (7) ───────────────────────────
    {
      id:"c009", number:7, order:9, unlockDays:1, symbol:"△",
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
      id:"c010", number:8, order:10, unlockDays:7, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement latéral complet",
      subtitle:"L'oscillation droite-gauche comme rééquilibrage des hémisphères",
      summary:"Le balancement latéral droite-gauche au rythme de 2 secondes : premier exercice agissant directement sur le cerveau, avec le mantra ILLI et un carré bleu.",
      tags:["latéral","hémisphères","ILLI","carré bleu"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-008/balancement_lateral_1.png",
      images:{ cover:"assets/courses/course-008/balancement_lateral_1.png", pedagogical:["assets/courses/course-008/balancement_lateral_2.png","assets/courses/course-008/balancement_lateral_3.png","assets/courses/course-008/balancement_lateral_4.png","assets/courses/course-008/balancement_lateral_5.png","assets/courses/course-008/balancement_lateral_6.png","assets/courses/course-008/balancement_lateral_7.png","assets/courses/course-008/balancement_lateral_8.png","assets/courses/course-008/balancement_lateral_9.png"], gallery:["assets/courses/course-008/balancement_lateral_1.png","assets/courses/course-008/balancement_lateral_2.png","assets/courses/course-008/balancement_lateral_3.png","assets/courses/course-008/balancement_lateral_4.png","assets/courses/course-008/balancement_lateral_5.png","assets/courses/course-008/balancement_lateral_6.png","assets/courses/course-008/balancement_lateral_7.png","assets/courses/course-008/balancement_lateral_8.png","assets/courses/course-008/balancement_lateral_9.png"] },
      pdfPath:"", pdfPremium:true
    },
    {
      id:"c011", number:9, order:11, unlockDays:7, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement vertical complet",
      subtitle:"L'oscillation haut-bas comme dialogue entre ciel et terre",
      summary:"Le balancement vertical haut-bas au rythme de 2 secondes avec le mantra ALLA et un carré rouge — l'axe cranio-sacré et le liquide céphalo-rachidien en mouvement.",
      tags:["vertical","ALLA","carré rouge","axe"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-009/balancement_vertical_1.png",
      images:{ cover:"assets/courses/course-009/balancement_vertical_1.png", pedagogical:["assets/courses/course-009/balancement_vertical_2.png","assets/courses/course-009/balancement_vertical_3.png","assets/courses/course-009/balancement_vertical_4.png","assets/courses/course-009/balancement_vertical_5.png","assets/courses/course-009/balancement_vertical_6.png","assets/courses/course-009/balancement_vertical_7.png","assets/courses/course-009/balancement_vertical_8.png","assets/courses/course-009/balancement_vertical_9.png"], gallery:["assets/courses/course-009/balancement_vertical_1.png","assets/courses/course-009/balancement_vertical_2.png","assets/courses/course-009/balancement_vertical_3.png","assets/courses/course-009/balancement_vertical_4.png","assets/courses/course-009/balancement_vertical_5.png","assets/courses/course-009/balancement_vertical_6.png","assets/courses/course-009/balancement_vertical_7.png","assets/courses/course-009/balancement_vertical_8.png","assets/courses/course-009/balancement_vertical_9.png"] },
      pdfPath:"data/pdf/cours-09-balancement-vertical.pdf", pdfPremium:true
    },
    {
      id:"c012", number:10, order:12, unlockDays:7, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement antéro-postérieur",
      subtitle:"L'oscillation avant-arrière comme intégration du passé et de l'avenir",
      summary:"Le balancement avant-arrière au rythme de 2 secondes avec le mantra ELLU et un rectangle vert — troisième axe, troisième dimension de la conscience.",
      tags:["antéro-postérieur","ELLU","rectangle vert","axe profond"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-010/balancement_antero_posterieur_1.png",
      images:{
        cover:"assets/courses/course-010/balancement_antero_posterieur_1.png",
        pedagogical:[
          "assets/courses/course-010/balancement_antero_posterieur_2.png",
          "assets/courses/course-010/balancement_antero_posterieur_3.png",
          "assets/courses/course-010/balancement_antero_posterieur_4.png",
          "assets/courses/course-010/balancement_antero_posterieur_5.png",
          "assets/courses/course-010/balancement_antero_posterieur_6.png",
          "assets/courses/course-010/balancement_antero_posterieur_7.png",
          "assets/courses/course-010/balancement_antero_posterieur_8.png",
          "assets/courses/course-010/balancement_antero_posterieur_9.png"
        ],
        gallery:[
          "assets/courses/course-010/balancement_antero_posterieur_1.png",
          "assets/courses/course-010/balancement_antero_posterieur_2.png",
          "assets/courses/course-010/balancement_antero_posterieur_3.png",
          "assets/courses/course-010/balancement_antero_posterieur_4.png",
          "assets/courses/course-010/balancement_antero_posterieur_5.png",
          "assets/courses/course-010/balancement_antero_posterieur_6.png",
          "assets/courses/course-010/balancement_antero_posterieur_7.png",
          "assets/courses/course-010/balancement_antero_posterieur_8.png",
          "assets/courses/course-010/balancement_antero_posterieur_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-10-balancement-antero-posterieur.pdf", pdfPremium:false
    },
    {
      id:"c013", number:11, order:13, unlockDays:4, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement en huit",
      subtitle:"La lemniscate comme intégration des polarités",
      summary:"Balancement latéral avancé avec un rectangle orange : synchroniser mouvement et pensée pour graver les apprentissages dans le cerveau.",
      tags:["lemniscate","polarités","rectangle orange","intégration"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-011/balancement_huit_1.png",
      images:{
        cover:"assets/courses/course-011/balancement_huit_1.png",
        pedagogical:[
          "assets/courses/course-011/balancement_huit_2.png",
          "assets/courses/course-011/balancement_huit_3.png",
          "assets/courses/course-011/balancement_huit_4.png",
          "assets/courses/course-011/balancement_huit_5.png",
          "assets/courses/course-011/balancement_huit_6.png",
          "assets/courses/course-011/balancement_huit_7.png",
          "assets/courses/course-011/balancement_huit_8.png",
          "assets/courses/course-011/balancement_huit_9.png"
        ],
        gallery:[
          "assets/courses/course-011/balancement_huit_1.png",
          "assets/courses/course-011/balancement_huit_2.png",
          "assets/courses/course-011/balancement_huit_3.png",
          "assets/courses/course-011/balancement_huit_4.png",
          "assets/courses/course-011/balancement_huit_5.png",
          "assets/courses/course-011/balancement_huit_6.png",
          "assets/courses/course-011/balancement_huit_7.png",
          "assets/courses/course-011/balancement_huit_8.png",
          "assets/courses/course-011/balancement_huit_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-11-balancement-en-huit.pdf", pdfPremium:false
    },
    {
      id:"c014", number:12, order:14, unlockDays:4, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Balancement en croix",
      subtitle:"Les quatre directions comme ancrage dans l'espace sacré",
      summary:"Balancement vertical avancé avec un triangle bleu : approfondir la conscience du liquide céphalo-rachidien et le rajeunissement cérébral.",
      tags:["croix","quatre directions","triangle bleu","espace sacré"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-012/balancement_croix_1.png",
      images:{
        cover:"assets/courses/course-012/balancement_croix_1.png",
        pedagogical:[
          "assets/courses/course-012/balancement_croix_2.png",
          "assets/courses/course-012/balancement_croix_3.png",
          "assets/courses/course-012/balancement_croix_4.png",
          "assets/courses/course-012/balancement_croix_5.png",
          "assets/courses/course-012/balancement_croix_6.png",
          "assets/courses/course-012/balancement_croix_7.png",
          "assets/courses/course-012/balancement_croix_8.png",
          "assets/courses/course-012/balancement_croix_9.png"
        ],
        gallery:[
          "assets/courses/course-012/balancement_croix_1.png",
          "assets/courses/course-012/balancement_croix_2.png",
          "assets/courses/course-012/balancement_croix_3.png",
          "assets/courses/course-012/balancement_croix_4.png",
          "assets/courses/course-012/balancement_croix_5.png",
          "assets/courses/course-012/balancement_croix_6.png",
          "assets/courses/course-012/balancement_croix_7.png",
          "assets/courses/course-012/balancement_croix_8.png",
          "assets/courses/course-012/balancement_croix_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-12-balancement-en-croix.pdf", pdfPremium:false
    },
    {
      id:"c015", number:13, order:15, unlockDays:4, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Rotation douce",
      subtitle:"Le mouvement spiralaire comme accès à la centration profonde",
      summary:"Balancement antéro-postérieur avancé avec un triangle violet : approfondir l'axe de profondeur et introduire la visualisation végétale ou lumineuse.",
      tags:["rotation","spirale","triangle violet","centration"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-013/rotation_douce_1.png",
      images:{
        cover:"assets/courses/course-013/rotation_douce_1.png",
        pedagogical:[
          "assets/courses/course-013/rotation_douce_2.png",
          "assets/courses/course-013/rotation_douce_3.png",
          "assets/courses/course-013/rotation_douce_4.png",
          "assets/courses/course-013/rotation_douce_5.png",
          "assets/courses/course-013/rotation_douce_6.png",
          "assets/courses/course-013/rotation_douce_7.png",
          "assets/courses/course-013/rotation_douce_8.png",
          "assets/courses/course-013/rotation_douce_9.png"
        ],
        gallery:[
          "assets/courses/course-013/rotation_douce_1.png",
          "assets/courses/course-013/rotation_douce_2.png",
          "assets/courses/course-013/rotation_douce_3.png",
          "assets/courses/course-013/rotation_douce_4.png",
          "assets/courses/course-013/rotation_douce_5.png",
          "assets/courses/course-013/rotation_douce_6.png",
          "assets/courses/course-013/rotation_douce_7.png",
          "assets/courses/course-013/rotation_douce_8.png",
          "assets/courses/course-013/rotation_douce_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-13-rotation-douce.pdf", pdfPremium:false
    },
    {
      id:"c016", number:14, order:16, unlockDays:4, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Fer à cheval et perception arrière",
      subtitle:"Ouvrir le champ dorsal pour une conscience spatiale complète",
      summary:"Balancement latéral avec visualisation d'un personnage : introduire l'élément humain et apprendre à projeter une présence dans l'espace du balancement.",
      tags:["fer à cheval","perception","espace","présence"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-014/fer_a_cheval_1.png",
      images:{
        cover:"assets/courses/course-014/fer_a_cheval_1.png",
        pedagogical:[
          "assets/courses/course-014/fer_a_cheval_2.png",
          "assets/courses/course-014/fer_a_cheval_3.png",
          "assets/courses/course-014/fer_a_cheval_4.png",
          "assets/courses/course-014/fer_a_cheval_5.png",
          "assets/courses/course-014/fer_a_cheval_6.png",
          "assets/courses/course-014/fer_a_cheval_7.png",
          "assets/courses/course-014/fer_a_cheval_8.png",
          "assets/courses/course-014/fer_a_cheval_9.png"
        ],
        gallery:[
          "assets/courses/course-014/fer_a_cheval_1.png",
          "assets/courses/course-014/fer_a_cheval_2.png",
          "assets/courses/course-014/fer_a_cheval_3.png",
          "assets/courses/course-014/fer_a_cheval_4.png",
          "assets/courses/course-014/fer_a_cheval_5.png",
          "assets/courses/course-014/fer_a_cheval_6.png",
          "assets/courses/course-014/fer_a_cheval_7.png",
          "assets/courses/course-014/fer_a_cheval_8.png",
          "assets/courses/course-014/fer_a_cheval_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-14-fer-a-cheval.pdf", pdfPremium:false
    },
    {
      id:"c017", number:15, order:17, unlockDays:7, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Séance combinée de balancements",
      subtitle:"Intégration de tous les mouvements en une pratique fluide",
      summary:"Programme 15 jours sur les balancements : un protocole quotidien progressif pour intégrer les trois directions, les trois mantras et la progression des supports.",
      tags:["combinée","intégration","15 jours","protocole"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-015/balancements_combines_1.png",
      images:{
        cover:"assets/courses/course-015/balancements_combines_1.png",
        pedagogical:[
          "assets/courses/course-015/balancements_combines_2.png",
          "assets/courses/course-015/balancements_combines_3.png",
          "assets/courses/course-015/balancements_combines_4.png",
          "assets/courses/course-015/balancements_combines_5.png",
          "assets/courses/course-015/balancements_combines_6.png",
          "assets/courses/course-015/balancements_combines_7.png",
          "assets/courses/course-015/balancements_combines_8.png",
          "assets/courses/course-015/balancements_combines_9.png"
        ],
        gallery:[
          "assets/courses/course-015/balancements_combines_1.png",
          "assets/courses/course-015/balancements_combines_2.png",
          "assets/courses/course-015/balancements_combines_3.png",
          "assets/courses/course-015/balancements_combines_4.png",
          "assets/courses/course-015/balancements_combines_5.png",
          "assets/courses/course-015/balancements_combines_6.png",
          "assets/courses/course-015/balancements_combines_7.png",
          "assets/courses/course-015/balancements_combines_8.png",
          "assets/courses/course-015/balancements_combines_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-15-seance-combinee-balancements.pdf", pdfPremium:false
    },
    {
      id:"c018", number:15.5, order:18, unlockDays:15, symbol:"↔",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Programme 15 jours — Balancements",
      subtitle:"Pratiquer chaque jour un balancement différent",
      summary:"15 jours de balancements guidés, entièrement pré-configurés. Aucun réglage nécessaire.",
      tags:["programme","15 jours","balancements","pratique autonome"],
      level:"Pratique intensive", duration:"15 jours",
      image:"assets/courses/course-015/cours-15.5/programme_15_jours_1.png",
      images:{
        cover:"assets/courses/course-015/cours-15.5/programme_15_jours_1.png",
        pedagogical:[
          "assets/courses/course-015/cours-15.5/programme_15_jours_2.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_3.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_4.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_5.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_6.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_7.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_8.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_9.png"
        ],
        gallery:[
          "assets/courses/course-015/cours-15.5/programme_15_jours_1.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_2.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_3.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_4.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_5.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_6.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_7.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_8.png",
          "assets/courses/course-015/cours-15.5/programme_15_jours_9.png"
        ]
      },
      pdfPath:"data/pdf/cours-15b-programme-15j-balancements.pdf", pdfPremium:false
    },

    // ── INVERSION / RESPIRATIONS RYTHMIQUES (52-59) ───────
    {
      id:"c019", number:52, order:19, unlockDays:4, symbol:"↧",
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
      id:"c020", number:53, order:20, unlockDays:4, symbol:"↧",
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
      id:"c021", number:54, order:21, unlockDays:4, symbol:"↧",
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
      id:"c022", number:55, order:22, unlockDays:4, symbol:"↧",
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
      id:"c023", number:56, order:23, unlockDays:4, symbol:"↧",
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
      id:"c024", number:58, order:24, unlockDays:4, symbol:"↧",
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
      id:"c025", number:59, order:25, unlockDays:4, symbol:"↧",
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
      id:"c026", number:59.5, order:26, unlockDays:15, symbol:"◎",
      familyId:"balancements", familyTitle:"Balancements",
      title:"Programme 15 jours — Complet",
      subtitle:"Balancement & Respiration — Le parcours de l'éveil",
      summary:"15 séances combinées : balancement puis respiration chaque jour. La progression complète.",
      tags:["15 jours","balancement","respiration","programme"],
      level:"Initiatique avancé", duration:"15 jours",
      image:"assets/courses/course-025/cover.webp",
      pdfPath:"", pdfPremium:true
    },

    // ── ÉVEIL DE LA KOUNDALINI (16-24) ─────────────────────
    {
      id:"c027", number:16, order:27, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 16 — La nature réelle de la Koundalini",
      subtitle:"Dépasser les mythes, comprendre la force tourbillonnaire",
      summary:"Koundalini n'est pas une force mystérieuse et dangereuse. C'est une chose très simple, très bénéfique, sans danger, facile à provoquer : la fonction rotationnelle naturelle du cerveau. Oscillation, tourbillon, tremblement — trois rythmes fondamentaux accessibles à tous dès la première séance.",
      longSummary:"La tradition ésotérique occidentale a longtemps présenté Koundalini comme une énergie redoutable, réservée aux initiés d'Asie. Cette représentation est inexacte. Les textes primitifs du Cachemire — antérieurs à toute déformation mythologique — décrivent Koundalini exclusivement sous un aspect tourbillonnaire, un 'vif tournoiement' qui monte 'de roue en roue' jusqu'au sommet du crâne. Cet aspect rotatif est précisément ce que l'observation directe de la physiologie cérébrale confirme. Lorsqu'on comprend ce qu'est vraiment cette force, on réalise qu'elle est constitutive du fonctionnement naturel du cerveau. La triade fondamentale — oscillation lente, tourbillon, tremblement rapide — suffit à en provoquer l'éveil.",
      tags:["koundalini","tourbillon","rotation","éveil"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-026/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre la nature réelle de Koundalini comme fonction rotationnelle du cerveau, démythifier les représentations dangereuses.",
      initiaticObjective:"Poser les fondations d'un éveil progressif, sûr et reproductible par la compréhension juste.",
      teaching:{
        intro:"Koundalini apparaît à la partie inférieure du tronc, à environ un à deux centimètres au-dessus du milieu du périnée. Elle s'élève ensuite selon un mouvement hélicoïdal autour de l'axe vertical du corps. Lorsqu'elle atteint la tête, un état d'illumination intérieure se produit.",
        sections:[
          { title:"La triade des rythmes", content:"Toute manifestation de Koundalini revient à trois éléments purement mentaux : l'oscillation lente (1 à 2 secondes), le tourbillon (rotation consciente de l'espace mental), et le tremblement rapide (fréquence proche du sixième de seconde). Ces trois éléments ne nécessitent aucun appareil, aucun gourou, aucun danger." },
          { title:"Les chakras comme roues tournoyantes", content:"Les textes du Shivaïsme non-dualiste du Cachemire — parmi les plus anciens — insistent sur l'aspect exclusivement tourbillonnaire des chakras. Ce sont des 'roues tournoyantes', des centres de rotation vive, et non des fleurs de lotus statiques. Du centre de ces roues jaillissent des étincelles en jets rectilignes suivant leurs rayons." },
          { title:"Pourquoi c'est sans danger", content:"Les risques attribués à Koundalini proviennent de pratiques annexes sans rapport avec ce qui agit réellement. Dès lors qu'on travaille avec les seuls éléments efficaces — rotation mentale, rythme et souffle — le processus est entièrement bénéfique, similaire à la détente d'un système nerveux bien accordé." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Lecture et démythification", content:"Relire mentalement ce qu'on croyait savoir sur Koundalini. Identifier les représentations de danger ou de réservation aux élites." },
        { time:"10–25 min", title:"La triade des rythmes", content:"Observer successivement les trois rythmes naturels du cerveau : oscillation, rotation, tremblement." },
        { time:"25–50 min", title:"Exercice de rotation mentale", content:"Premier exercice d'observation de la rotation naturelle — détaillé ci-dessous." },
        { time:"50–60 min", title:"Carnet d'expérience", content:"Noter avec précision ce qui a été ressenti, sans amplifier ni minimiser." }
      ],
      contemplation:{ duration:"5 min", question:"Quelle image avais-je de Koundalini avant ce cours, et qu'est-ce qui se dépose maintenant ?", guidance:"Fermer les yeux. Laisser la question résonner sans chercher à répondre intellectuellement. Observer ce qui se montre." },
      practice:{
        name:"Observation de la rotation mentale spontanée",
        duration:"20 minutes",
        intention:"Observer si une rotation apparaît naturellement dans l'espace mental intérieur, sans la forcer.",
        posture:"Assis confortablement, colonne droite sans rigidité, mains posées sur les genoux, yeux fermés.",
        steps:[
          "S'installer dans la posture. Prendre trois respirations lentes et complètes.",
          "Porter l'attention sur l'espace mental intérieur — derrière les yeux fermés, dans la tête.",
          "Observer passivement : y a-t-il un mouvement, une tendance à la rotation, un tourbillon qui cherche à se former ?",
          "Si oui, ne pas l'amplifier ni le réprimer. Simplement l'observer avec curiosité bienveillante.",
          "Si rien ne se produit : imaginer doucement un point qui tourne en cercle lent, à une ou deux secondes par tour.",
          "Maintenir cette observation pendant 15 minutes. Observer les variations de rythme, de direction, d'intensité.",
          "Terminer en respirant profondément, en bougant doucement les doigts et les pieds avant d'ouvrir les yeux."
        ],
        adaptations:["Si la rotation devient trop intense, ralentir le rythme imaginé ou ouvrir les yeux un instant.","Pratiquer de préférence après un balancement de 5 à 10 minutes pour préparer le cerveau."],
        safety:"Interrompre si une sensation désagréable persiste. Il ne doit y avoir ni douleur ni anxiété. La pratique est douce par nature."
      },
      preprogrammedSession:{
        label:"Koundalini 16 — Première rotation mentale",
        context:"Séance d'éveil en douceur. Le balancement prépare la rotation naturelle du cerveau. Observer si le tourbillon apparaît spontanément après l'arrêt.",
        detente:3,
        objetContemplation:"cercles",
        balancement:{type:"latéral", duree:15},
        respiration:{type:"carrée", mesure:4, duree:7},
        final:{type:"tension", duree:3},
        voix:true,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c028", number:17, order:28, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 17 — L'axe vertical du corps",
      subtitle:"Du périnée au sommet — le canal de la montée",
      summary:"L'axe vertical du corps, de la base du tronc au sommet du crâne, est le chemin naturel de la montée de Koundalini. Ce cours enseigne comment percevoir cet axe, l'habiter par la posture juste, et comprendre pourquoi le liquide céphalo-rachidien joue un rôle central dans ce processus.",
      longSummary:"L'axe vertical est une ligne virtuelle passant par le centre du corps en position debout correcte. On peut en prendre conscience à volonté. La montée de Koundalini suit cet axe, décrivant une hélice autour de lui ou progressant à l'intérieur de la colonne vertébrale. Tenir cet axe dans la posture — sans raideur, sans effondrement — est la première préparation physique à l'éveil. Le liquide céphalo-rachidien, qui baigne et nourrit le cerveau et la moelle épinière, est mis en mouvement par chaque rotation et chaque oscillation du corps, produisant une nutrition et une désintoxication cérébrales directement perceptibles.",
      tags:["axe","vertical","colonne","liquide céphalo-rachidien"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-027/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Percevoir et habiter l'axe vertical du corps comme support vivant de la montée.",
      initiaticObjective:"Établir la posture juste qui permet à la force de monter sans obstacle.",
      teaching:{
        intro:"La montée de Koundalini est décrite dans les textes anciens comme se faisant en hélice autour de l'axe vertical passant par le centre de gravité, sur un sujet debout en position correcte. Cet axe n'est pas une métaphore : c'est une ligne virtuelle qu'on peut percevoir directement.",
        sections:[
          { title:"Le périnée : point de départ", content:"Koundalini naît à la partie inférieure du tronc, environ un à deux centimètres au-dessus du milieu du périnée. Ce point d'origine est la 'racine' au sens étymologique — non pas une métaphore mythologique mais une localisation précise, perceptible par la conscience attentive." },
          { title:"La colonne comme chemin vivant", content:"La colonne vertébrale n'est pas qu'un support osseux. Elle est entourée du liquide céphalo-rachidien dans lequel baigne la moelle épinière. Ce liquide circule dans les méninges depuis le cerveau jusqu'au sacrum. Toute oscillation, tout balancement, toute rotation mobilise ce liquide — et donc nourrit directement le système nerveux central." },
          { title:"La ligne virtuelle centrale", content:"On prend facilement conscience de la ligne virtuelle verticale qui passe par le centre de gravité. Debout, les pieds parallèles à largeur de hanches, on perçoit cette ligne comme une colonne d'air, un fil d'aplomb intérieur. C'est sur cet axe que l'hélice de Koundalini s'enroule lors de son ascension." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Posture debout et perception de l'axe", content:"Debout, pieds parallèles. Fermer les yeux. Trouver l'équilibre naturel. Percevoir l'axe vertical comme une ligne d'air intérieure." },
        { time:"10–30 min", title:"Descente et remontée consciente", content:"Faire descendre l'attention du sommet du crâne jusqu'au périnée, puis remonter lentement. Répéter 10 fois." },
        { time:"30–50 min", title:"Exercice d'axe en mouvement", content:"Exercice détaillé ci-dessous — axe en oscillation douce puis en rotation lente." },
        { time:"50–60 min", title:"Carnet et intégration", content:"Décrire avec précision la qualité de la perception de l'axe avant et après l'exercice." }
      ],
      contemplation:{ duration:"5 min", question:"Où est mon axe en ce moment ? Est-il droit, vivant, présent ?", guidance:"Debout ou assis, fermer les yeux. Percevoir l'axe sans le construire mentalement. Laisser le corps répondre." },
      practice:{
        name:"Éveil de l'axe vertical — descente et remontée",
        duration:"20 minutes",
        intention:"Percevoir l'axe vertical comme une réalité vivante et mobiliser le liquide céphalo-rachidien par une oscillation douce.",
        posture:"Debout, pieds à la largeur des hanches, genoux légèrement déverrouillés, bras le long du corps.",
        steps:[
          "Fermer les yeux. Prendre trois respirations profondes.",
          "Porter l'attention au sommet du crâne. Sentir ce point.",
          "Faire descendre l'attention très lentement le long de l'axe central : crâne, nuque, base du cou, entre les omoplates, milieu du dos, bas du dos, sacrum, périnée.",
          "Arrivé au périnée, imaginer une légère pression, une chaleur douce, un point d'ancrage.",
          "Faire remonter l'attention le long du même axe, aussi lentement.",
          "Répéter cette descente-remontée 10 fois en respirant normalement.",
          "Puis initier une très légère oscillation du corps d'avant en arrière — 2 secondes par balancement — tout en maintenant la conscience de l'axe.",
          "Après 5 minutes, changer pour un balancement latéral droit-gauche. L'axe reste vivant et présent.",
          "Terminer par 2 minutes d'immobilité, axe perçu, puis ouvrir les yeux lentement."
        ],
        adaptations:["En position assise si debout n'est pas possible. L'axe est perceptible dans toutes les postures."],
        safety:"Mouvement très lent. Pas d'effort. Si des vertiges surviennent, s'asseoir et respirer."
      },
      preprogrammedSession:{
        label:"Koundalini 17 — Axe vertical et LCR",
        context:"Séance debout si possible. Le balancement vertical mobilise le liquide céphalo-rachidien le long de la colonne. Tenir mentalement la conscience de l'axe tout au long.",
        detente:3,
        objetContemplation:"rectangle",
        balancement:{type:"vertical", duree:20},
        respiration:{type:"rectangulaire", mesure:5, duree:10},
        final:{type:"tension", duree:3},
        voix:false,
        cloche:true,
        tonalites:["LA"]
      }
    },
    {
      id:"c029", number:18, order:29, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 18 — Les chakras : roues tournoyantes",
      subtitle:"Les centres d'énergie comme tourbillons vivants — la conception primitive",
      summary:"Dans la tradition la plus ancienne du Cachemire, les chakras ne sont pas des fleurs de lotus immobiles mais des roues qui tournoyent vivement. Cette conception directe, antérieure aux décorations mythologiques, conduit à une pratique concrète et vérifiable : activer chaque centre par une visualisation rotative précise.",
      longSummary:"Les textes du Shivaïsme non-dualiste du Cachemire — qui remontent à l'aube des temps historiques — définissent les chakras comme des 'roues tournoyantes'. Du centre de ces roues jaillissent des étincelles qui s'éloignent en jets suivant les rayons rectilignes. Koundalini peut naître dans n'importe quel centre. Ce qui est fondamental, c'est de savoir provoquer dans son imagination un mouvement tourbillonnaire — pas la localisation. L'intensité du tournoiement, quand elle dépasse un certain seuil, active les énergies de synchronisation cérébrales et produit des états de superconscience.",
      tags:["chakras","roues","tourbillon","Cachemire"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-028/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser la visualisation du tourbillon pour activer les centres énergétiques selon la méthode primitive.",
      initiaticObjective:"Expérimenter directement la rotation intérieure dans un ou plusieurs centres du corps.",
      teaching:{
        intro:"Le Shivaïsme du Cachemire insiste : ce n'est que postérieurement à cette conception quasi exclusivement tourbillonnaire que s'est ajoutée la comparaison des chakras à des fleurs de lotus. La technique la plus efficace est un retour à cette conception primitive.",
        sections:[
          { title:"La roue secrète à la base", content:"Le centre radical est situé à la partie inférieure du tronc. Il est contenu dans un 'bulbe' sur le plan énergétique. Lorsqu'il se met à vibrer, l'énergie atteint en quelques minutes le chakra du nombril, puis les deux centres tourbillonnent ensemble." },
          { title:"Le barattement de l'énergie", content:"L'expression 'barattement de l'énergie' désigne ce que la physiologie nomme 'rotation différentielle' : deux zones qui tournent à des vitesses légèrement différentes créent entre elles une friction productive, génératrice d'énergie, comme deux engrenages qui se transmettent le mouvement." },
          { title:"Étincelles et rayons de lumière", content:"Lors d'une activation suffisante, les centres produisent des étincelles perçues comme des jets de lumière partant du centre selon les rayons. Ce phénomène — identique dans les textes anciens et dans les expériences contemporaines — valide la précision de ces descriptions millénaires." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Carte des centres tourbillonnaires", content:"Réviser mentalement la localisation des sept centres principaux sur l'axe vertical." },
        { time:"10–30 min", title:"Activation séquentielle par rotation", content:"Passer en revue chaque chakra de la base au sommet, activer chaque roue." },
        { time:"30–50 min", title:"Exercice du barattement", content:"Exercice complet détaillé ci-dessous." },
        { time:"50–60 min", title:"Carnet", content:"Noter les centres où le tourbillon a été le plus facilement perçu." }
      ],
      contemplation:{ duration:"5 min", question:"Dans quelle zone de mon corps l'énergie tourne-t-elle le plus naturellement aujourd'hui ?", guidance:"Porter l'attention successivement sur chaque centre. Ne pas chercher. Observer." },
      practice:{
        name:"Activation des roues — du périnée au sommet",
        duration:"20 minutes",
        intention:"Éveiller successivement chaque centre tourbillonnaire depuis la base jusqu'au sommet du crâne.",
        posture:"Assis en tailleur ou sur une chaise, colonne droite, mains posées sur les genoux.",
        steps:[
          "Fermer les yeux. Établir une respiration naturelle et régulière.",
          "Porter l'attention au centre du périnée. Imaginer une roue horizontale, comme un disque, qui se met doucement à tourner dans le sens des aiguilles d'une montre. Tenir 1 minute.",
          "Faire monter l'attention au bas du ventre (chakra sacré). Même roue qui s'active. 1 minute.",
          "Monter au plexus solaire. Imaginer la roue qui tourne, légèrement plus vite. Du centre, percevoir de petites étincelles qui partent vers l'extérieur. 1 minute.",
          "Monter au centre du thorax (cœur). La roue est vaste, lumineuse. La rotation est apaisante. 1 minute.",
          "Monter à la gorge. Roue plus fine, rotation rapide, légère vibration. 1 minute.",
          "Entre les sourcils. Roue lumineuse, rotation lente et profonde. 1 minute.",
          "Sommet du crâne. Roue ouverte vers le haut. Rotation qui semble attirer quelque chose d'en haut. 2 minutes.",
          "Laisser l'énergie circuler librement de la base au sommet. Observer sans intervenir. 5 minutes.",
          "Respirer profondément trois fois et revenir doucement."
        ],
        adaptations:["Commencer par un seul chakra pendant plusieurs séances avant de faire la séquence complète.","Direction de rotation : les deux sens sont valides. Choisir celui qui se présente naturellement."],
        safety:"Ne pas forcer la visualisation. Si un centre résiste, passer au suivant et y revenir en fin de séquence."
      },
      preprogrammedSession:{
        label:"Koundalini 18 — Activation des roues chakras",
        context:"La rotation douce amplifie naturellement les visualisations chakras. Pendant le balancement, activer mentalement chaque roue de bas en haut. Observer les étincelles.",
        detente:3,
        objetContemplation:"cercles",
        balancement:{type:"rotation", duree:20},
        respiration:{type:"rectangulaire", mesure:5, duree:10},
        final:{type:"rotation", duree:3},
        voix:false,
        cloche:true,
        tonalites:["DO","FA"]
      }
    },
    {
      id:"c030", number:19, order:30, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 19 — La triade sacrée : Oscillation, Tourbillon, Tremblement",
      subtitle:"Les trois rythmes fondamentaux qui constituent l'essence de Koundalini",
      summary:"Toute manifestation de Koundalini revient à cette triade : l'oscillation lente (balancement régulier), le tourbillon (rotation de conscience), le tremblement (fréquence rapide du 1/6e de seconde). Ces trois éléments, vécus mentalement, sont les éléments nécessaires et suffisants de l'éveil.",
      longSummary:"Les textes anciens du Cachemire mentionnent déjà cette nomenclature : oscillation du tourbillon, tournoiement, tremblement combiné à l'oscillation. L'importance du tremblement mental y est soulignée dans de longs paragraphes. Cette triade constitue le fond commun de toutes les grandes pratiques initiatiques, du yoga indotibétain aux danses sacrées. Comprendre et pratiquer les trois rythmes séparément avant de les combiner conduit à un éveil solide et progressif, sans à-coups.",
      tags:["oscillation","tourbillon","tremblement","rythme"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-029/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser séparément puis combiner les trois rythmes fondamentaux de Koundalini.",
      initiaticObjective:"Vivre l'éveil de la triade comme une expérience directe et consciente.",
      teaching:{
        intro:"La physiologie cérébrale confirme ce que les textes anciens décrivent : le cerveau produit naturellement ces trois types de rythmes. Les reconnaître et les cultiver revient à affiner un instrument de musique déjà accordé.",
        sections:[
          { title:"L'oscillation — 1 à 3 secondes", content:"C'est le rythme le plus lent et le plus reconnaissable. Le balancement physique gauche-droite ou avant-arrière en est l'expression corporelle. Mentalement, il correspond à l'alternance douce de l'attention entre deux polarités. C'est le point d'entrée le plus accessible dans la triade." },
          { title:"Le tourbillon — rotation consciente", content:"Le tourbillon est la rotation de l'espace mental autour d'un axe. Il peut être horizontal, vertical ou oblique. Son intensité est variable — d'une rotation lente et paisible à un tournoiement vif qui 'dépasse l'imagination'. C'est l'élément central, celui qui caractérise le plus Koundalini dans les textes primitifs." },
          { title:"Le tremblement — 1/6e de seconde", content:"Le tremblement est le rythme le plus rapide de la triade — environ six pulsations par seconde. Ce rythme est identique à celui du mantra rapide. Lorsqu'il se produit naturellement dans l'espace mental, c'est le signe que Koundalini est en pleine activation. L'association oscillation + tourbillon + tremblement est signalée dans les textes comme l'état le plus complet de l'éveil." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Comprendre la triade", content:"Lecture et assimilation des trois rythmes. Les ressentir dans le corps sans exercice encore." },
        { time:"10–25 min", title:"Oscillation pure", content:"Balancement physique droit-gauche, 2 secondes, pendant 10 minutes. Observer si cela déclenche spontanément les autres rythmes." },
        { time:"25–40 min", title:"Tourbillon pur", content:"Immobile, visualiser la rotation intérieure. Explorer vitesse, direction, localisation." },
        { time:"40–55 min", title:"Tremblement pur puis synthèse", content:"Imaginer une vibration rapide à 6 pulsations/seconde. Puis laisser les trois rythmes coexister librement." },
        { time:"55–60 min", title:"Carnet", content:"La triade a-t-elle été vécue dans ses trois dimensions ? Laquelle a été la plus naturelle ?" }
      ],
      contemplation:{ duration:"5 min", question:"Quel rythme me semble le plus naturel en ce moment — lent, rotatif ou rapide ?", guidance:"Sans exercice. Juste l'observation intérieure." },
      practice:{
        name:"La séquence des trois rythmes",
        duration:"30 minutes",
        intention:"Vivre successivement les trois rythmes puis les laisser se combiner spontanément.",
        posture:"Assis sur une chaise ou en tailleur. Colonne droite. Yeux fermés.",
        steps:[
          "Phase 1 — Oscillation (10 min) : initier un balancement latéral droit-gauche à raison de 2 secondes par cycle. Corps détendu. Observer l'effet sur l'espace mental. Après 5 min, ralentir jusqu'à immobilité en conservant le rythme intérieur.",
          "Phase 2 — Tourbillon (10 min) : immobile, imaginer un point dans l'espace mental qui se met à tourner lentement en cercle. Laisser le cercle s'agrandir progressivement. Changer de sens si le mouvement naturel le demande. Observer si des étincelles apparaissent.",
          "Phase 3 — Tremblement (5 min) : imaginer le tourbillon qui s'accélère jusqu'à vibrer très rapidement — 6 fois par seconde environ. Ne pas forcer. Si la vitesse ne vient pas, rester avec le tourbillon lent.",
          "Synthèse (5 min) : laisser les trois rythmes coexister. L'oscillation dans la respiration, le tourbillon dans l'espace mental, le tremblement comme texture de fond. Observer sans intervenir."
        ],
        adaptations:["Faire chaque phase séparément lors de séances différentes avant de les combiner."],
        safety:"Si vertiges ou nausées lors du tourbillon, ouvrir les yeux, respirer et reprendre plus doucement."
      },
      preprogrammedSession:{
        label:"Koundalini 19 — La triade : oscillation, tourbillon, tremblement",
        context:"Séance pour expérimenter les 3 rythmes successivement. Le balancement latéral installe l'oscillation, la respiration carrée régulière soutient le rythme — puis observer si le tourbillon et le tremblement émergent.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:20},
        respiration:{type:"carrée", mesure:4, duree:10},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c031", number:20, order:31, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 20 — La rotation du corps : chemin initiatique du derviche",
      subtitle:"Le liquide céphalo-rachidien en mouvement — rajeunissement cérébral et mémoire",
      summary:"Les danses initiatiques de rotation corporelle activent le liquide céphalo-rachidien, nourrissant et désintoxiquant le cerveau. Toute pensée associée à la rotation prend un relief particulier et reste mieux gravée dans la mémoire. Protocole progressif sans risque de vertige, pratiqué à raison de 3 rotations pour commencer.",
      longSummary:"Dans les pays où ces danses sacrées sont pratiquées régulièrement, la longévité est significativement plus élevée. Cela s'explique directement : le cerveau baigne dans le liquide céphalo-rachidien qui le nourrit. Ces rotations du corps autour de son axe vertical mobilisent ce liquide, provoquant une meilleure nutrition et désintoxication de l'encéphale. Dès le début de la pratique, on constate un rajeunissement cérébral. De plus, l'action sur l'organe de l'équilibre intérieur, associée aux exercices mentaux, aide à former l'idée de l'espace et améliore les capacités cognitives.",
      tags:["derviche","rotation","cerveau","liquide céphalo-rachidien"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-030/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser la rotation corporelle progressive sans vertige, en associant une intention ou un mantra à chaque rotation.",
      initiaticObjective:"Mobiliser le liquide céphalo-rachidien pour activer le tourbillon mental depuis l'extérieur vers l'intérieur.",
      teaching:{
        intro:"La rotation du corps autour de son axe vertical est l'une des plus anciennes pratiques d'éveil connues. Sa puissance tient à une réalité physiologique simple : elle mobilise directement le liquide qui nourrit le cerveau.",
        sections:[
          { title:"L'oreille interne comme point d'entrée", content:"L'organe de l'équilibre — dans l'oreille interne — est mis en jeu par toute rotation. La stimulation des canaux semi-circulaires, associée à une méditation, déclenche dans le cerveau des phénomènes similaires à ceux d'une longue pratique contemplative. C'est le lien fondamental entre la rotation du corps et l'éveil intérieur." },
          { title:"Pourquoi associer une pensée à la rotation", content:"Du fait de la suractivation cérébrale pendant la rotation, toute pensée qui y est associée prend un relief particulier et reste mieux gravée dans la mémoire. Cette propriété est applicable à l'apprentissage, à la résolution de problèmes, mais surtout à la fixation d'une qualité spirituelle ou d'une intention de pratique." },
          { title:"Protocole sans vertige", content:"La clé pour éviter tout vertige est la progressivité. On commence par 3 rotations, puis 7, puis 10, jamais plus. On fixe un point avec les yeux en pivotant. Entre les rotations, on s'immobilise et on porte l'attention sur les sensations intérieures — c'est là que se produit l'essentiel." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Comprendre avant de pratiquer", content:"Lire et assimiler le mécanisme du liquide céphalo-rachidien. Visualiser l'intérieur du crâne en train d'être nourri." },
        { time:"10–20 min", title:"Préparation — axe et intention", content:"Établir l'axe vertical, choisir une intention ou un mantra court à associer aux rotations." },
        { time:"20–45 min", title:"Protocole des rotations progressives", content:"Exercice complet détaillé ci-dessous." },
        { time:"45–60 min", title:"Intégration allongée et carnet", content:"S'allonger 5 min, observer les sensations post-rotation. Carnet : qu'est-ce qui a changé dans l'espace intérieur ?" }
      ],
      contemplation:{ duration:"5 min", question:"Après la rotation, quelle est la qualité du silence intérieur ?", guidance:"Allongé, les yeux fermés, simplement observer ce qui se dépose dans le calme post-rotation." },
      practice:{
        name:"Protocole de rotation initiatique progressive",
        duration:"25 minutes",
        intention:"Mobiliser le liquide céphalo-rachidien et ancrer une intention dans la mémoire cérébrale par la rotation.",
        posture:"Debout, pieds à la largeur des hanches, bras tendus à l'horizontale ou légèrement abaissés, regard droit.",
        steps:[
          "Choisir une intention courte à garder présente pendant les rotations — par exemple : 'Je m'éveille' ou un son simple.",
          "Se placer au centre de l'espace. Inspirer profondément.",
          "Session 1 : effectuer 3 rotations lentes vers la droite (sens des aiguilles d'une montre vu du dessus). Fixer un point avec les yeux en pivotant, puis le retrouver rapidement — c'est la technique classique pour éviter le vertige.",
          "S'arrêter. Fermer les yeux. Tenir l'intention. Observer les sensations pendant 1 à 2 minutes.",
          "Session 2 : 3 rotations supplémentaires. Même technique. S'arrêter et observer.",
          "Session 3 : si les deux premières sessions ont été confortables, ajouter 3 rotations. Sinon, rester à 6 au total.",
          "S'allonger sur le dos. Bras le long du corps. Observer sans analyser les courants de sensations qui se déplacent dans le corps et la tête. Maintenir l'intention choisie. Durée : 10 minutes.",
          "Se lever très lentement."
        ],
        adaptations:["Commencer assis sur une chaise pivotante si debout est difficile. Même effet, moins d'amplitude.","Ne jamais dépasser 21 rotations en une seule session, quelle que soit l'expérience accumulée."],
        safety:"Arrêter immédiatement si nausées. Ne pas pratiquer à jeun avancé ni juste après un repas. Avoir un appui à portée de main les premières fois."
      },
      preprogrammedSession:{
        label:"Koundalini 20 — Derviche : rotation corporelle et LCR",
        context:"Pratiquer les rotations corporelles (3 puis 7) AVANT de lancer la séance. La rotation gyroscopique en final amplifie le gyrophène et consolide la mémoire de rotation. S'allonger 5 min après la séance.",
        detente:3,
        objetContemplation:"cercles",
        balancement:{type:"latéral", duree:15},
        respiration:{type:"rectangulaire", mesure:5, duree:10},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["LA"]
      }
    },
    {
      id:"c032", number:21, order:32, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 21 — La pensée rythmique et le mantra rapide",
      subtitle:"Le rythme au sixième de seconde — clé des états hypervigiles",
      summary:"Certains rythmes de la pensée, notamment au sixième de seconde, produisent des effets remarquables sur la conscience : illumination, éveil des chakras, purification des sentiments. Le mantra, compris comme 'son mental', n'opère que par son rythme. La régularité du rythme est tout — comme pour une balançoire qu'on pousse au bon moment.",
      longSummary:"Les mantras rapides sont peut-être l'un des plus grands secrets des yogis. Cependant, les tradipraticiens n'ont jamais pu expliquer sur quoi reposent leurs effets. La réponse est dans le rythme, non dans le sens. Le rythme au sixième de seconde — soit environ 6 pulsations par seconde — se révèle être une clé des pouvoirs supranormaux de l'esprit. Sous certaines excitations, l'espace intérieur se met à trembler sur ce rythme. Les effets sont proportionnels à la régularité, pas à l'intensité de l'effort. Tout comme pour une balançoire, il faut donner l'impulsion au bon moment.",
      tags:["rythme","mantra","sixième de seconde","pensée"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-031/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser la répétition rythmique d'un son mental à fréquence croissante jusqu'au seuil du tremblement.",
      initiaticObjective:"Accéder par le rythme rapide à des états d'illumination et de purification des sentiments.",
      teaching:{
        intro:"Le mot 'mantra' vient du sanscrit et signifie à sa racine 'son mental'. C'est donc davantage le rythme qui importe. Un mantra répété régulièrement à haute fréquence produit une forme particulière d'illumination, puis un état de conscience élargi où se produisent des visions et des perceptions inhabituelles.",
        sections:[
          { title:"La balançoire et le rythme juste", content:"Tout comme une balançoire n'est entretenue que si l'impulsion est donnée exactement au bon moment — ni trop tôt ni trop tard — le mantra rapide ne produit ses effets que si le rythme est parfaitement régulier. Un rythme irrégulier, même rapide, n'a pas le même effet qu'un rythme régulier plus lent." },
          { title:"Purification des sentiments", content:"L'un des effets les plus documentés du mantra rapide régulier est la purification des sentiments. Les émotions lourdes, les ressentiments anciens, les tensions chroniques se dissolvent progressivement, remplacés par une clarté et une légèreté perceptibles dès les premières séances." },
          { title:"Illumination et dédoublement", content:"Avec une pratique régulière, on obtient une forme particulière d'illumination — un état hypervigile où la conscience semble s'étendre au-delà des frontières habituelles du corps. Des visions prophétiques ont été rapportées, qui se réalisent peu de temps après. Ces phénomènes adviennent avec une facilité déconcertante lorsque le rythme est tenu." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Comprendre le rythme comme clé", content:"Assimiler pourquoi le rythme prime sur le sens. Choisir un son simple à utiliser comme mantra mental." },
        { time:"10–25 min", title:"Rythme lent progressif", content:"Commencer la répétition à 1 pulsation/seconde. Très lentement, augmenter jusqu'à 2/seconde." },
        { time:"25–45 min", title:"Accélération progressive", content:"De 2 à 6 pulsations/seconde en gardant la régularité absolue. Observer les effets à chaque palier." },
        { time:"45–55 min", title:"Seuil du tremblement", content:"Tenir 10 minutes au seuil de 6/seconde. Observer si l'espace intérieur se met lui-même à vibrer." },
        { time:"55–60 min", title:"Carnet", content:"Décrire la qualité de conscience à chaque palier de rythme." }
      ],
      contemplation:{ duration:"3 min", question:"Quel son me vient naturellement quand je cesse de chercher ?", guidance:"Laisser venir un son mental sans le fabriquer. Il est souvent très court — une syllabe, un souffle." },
      practice:{
        name:"Ascension rythmique — du lent au tremblement",
        duration:"30 minutes",
        intention:"Trouver par le rythme le seuil où l'espace intérieur commence à vibrer de lui-même.",
        posture:"Assis, immobile, yeux fermés. Colonne droite.",
        steps:[
          "Choisir un son mental court — une syllabe, même un simple 'ah' ou 'oh'. L'important est qu'il soit stable.",
          "Commencer à répéter ce son mentalement à raison d'une fois toutes les deux secondes. Régularité absolue. Durée : 3 minutes.",
          "Passer à une répétition par seconde. Tenir la régularité. 3 minutes.",
          "Accélérer à deux fois par seconde. Observer si l'état intérieur change. 3 minutes.",
          "Quatre fois par seconde. L'accent est mis sur la régularité, pas sur l'effort. 3 minutes.",
          "Six fois par seconde — environ. Ceci est le seuil du tremblement. Ne pas forcer la vitesse si elle ne vient pas naturellement. Tenir 10 minutes.",
          "Laisser le son mental s'éteindre progressivement. Observer ce qui reste dans l'espace intérieur pendant 5 minutes.",
          "Revenir doucement."
        ],
        adaptations:["Utiliser un métronome les premières fois pour vérifier la régularité.","Si la fréquence de 6/seconde ne vient pas, rester à 3 ou 4/seconde — les effets sont comparables si la régularité est parfaite."],
        safety:"Arrêter si une confusion mentale survient. Revenir à une respiration calme, ouvrir les yeux, bouger doucement."
      },
      preprogrammedSession:{
        label:"Koundalini 21 — Mantra rapide et tremblement",
        context:"Séance pour expérimenter le rythme au 1/6e de seconde. La respiration triangulaire soutient la régularité du rythme mental. Pendant la respiration, répéter mentalement un son court à fréquence croissante.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:15},
        respiration:{type:"triangulaire", mesure:4, duree:15},
        final:{type:"tension", duree:3},
        voix:false,
        cloche:false,
        tonalites:["DO"]
      }
    },
    {
      id:"c033", number:22, order:33, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 22 — La montée hélicoïdale et l'échelle des couleurs",
      subtitle:"L'ascension en spirale de la base au sommet — physiologie de l'éveil",
      summary:"La Koundalini monte en hélice autour de l'axe vertical. Cet aspect hélicoïdal — fondamental selon toutes les traditions primitives — distingue cet éveil d'un simple éveil énergétique linéaire. La montée suit une échelle naturelle de couleurs, du rouge à la base jusqu'au blanc au centre du thorax, puis vers le violet au sommet.",
      longSummary:"La magnétofluidodynamique — étude des mouvements de fluides conducteurs dans des champs magnétiques — permet de comprendre pourquoi l'ascension de Koundalini prend la forme d'une hélice. Les mêmes lois physiques qui gouvernent les mouvements du plasma stellaire et les tourbillons de l'atmosphère s'appliquent au mouvement du fluide vital dans l'axe du corps. L'échelle des couleurs suit la progression naturelle des températures lumineuses : rouge profond à la base, orange, jaune, blanc au milieu du thorax, puis violet pâle, bleu-blanc vers le sommet. Cette échelle se retrouve dans toutes les étoiles de l'univers.",
      tags:["hélice","spirale","montée","couleurs"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-032/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Visualiser avec précision l'ascension hélicoïdale et l'échelle des couleurs de la montée.",
      initiaticObjective:"Conduire la montée jusqu'au thorax et observer l'émergence spontanée de la lumière intérieure.",
      teaching:{
        intro:"La montée de Koundalini en hélice autour de l'axe vertical est une constante de toutes les descriptions authentiques. Le serpent qui s'enroule autour du caducée d'Hermès, le Caducée de médecine, le symbole de l'ADN — tous représentent la même réalité : la force qui monte en spirale.",
        sections:[
          { title:"Pourquoi l'hélice", content:"Un mouvement hélicoïdal est plus stable qu'un mouvement rectiligne dans tout fluide visqueux. C'est la raison pour laquelle une balle de fusil tourne en montant, pourquoi les galaxies sont spiralées, pourquoi le sang tourne dans le cœur. La Koundalini suit la même loi : la spirale est le chemin de moindre résistance dans l'axe du corps." },
          { title:"L'échelle des couleurs", content:"La couleur rouge correspond à l'énergie de la base — dense, lente, proche de la matière. En montant, l'énergie s'affine : orange au ventre, jaune au plexus, blanc lumineux au centre du thorax. Ce point blanc est celui où les deux moitiés du spectre se réunissent — comme dans la physique stellaire. Au-delà, bleu pâle à la gorge, violet à la tête." },
          { title:"L'illumination et le blanc", content:"Le blanc au milieu du thorax est un repère central dans la progression. C'est le point d'équilibre entre la terre et le ciel, entre la densité de la base et la subtilité du sommet. Beaucoup de pratiquants décrivent une forte sensation de chaleur et d'expansion à ce niveau lors d'une montée bien conduite." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Mémoriser l'échelle des couleurs", content:"Rouge–Orange–Jaune–Blanc–Bleu pâle–Violet. Les associer à chaque centre." },
        { time:"10–20 min", title:"Visualisation de l'hélice", content:"Observer le mouvement hélicoïdal en imagination — comme un ressort qui s'étire de la base au sommet." },
        { time:"20–50 min", title:"Méditation de la montée colorée", content:"Exercice complet détaillé ci-dessous." },
        { time:"50–60 min", title:"Carnet", content:"À quelle couleur la montée s'est-elle arrêtée ? Quelle sensation y était associée ?" }
      ],
      contemplation:{ duration:"5 min", question:"De quelle couleur est mon énergie en ce moment, et où dans le corps la situerais-je ?", guidance:"Fermer les yeux. Laisser une couleur émerger sans la choisir intellectuellement. Observer sa localisation spontanée." },
      practice:{
        name:"Méditation de l'ascension colorée",
        duration:"30 minutes",
        intention:"Conduire la conscience de la base au sommet en suivant l'échelle naturelle des couleurs, en spirale.",
        posture:"Assis ou allongé. Colonne droite si assis. Corps détendu.",
        steps:[
          "Fermer les yeux. Établir une respiration rythmique : inspire 6 temps, pause 3 temps, expire 6 temps. Maintenir ce rythme tout au long.",
          "Porter l'attention au centre du périnée. Visualiser une lueur rouge sombre, comme une braise. L'imaginer tourner lentement en sens horaire. 3 minutes.",
          "Inspirer en faisant monter cette lueur vers le bas du ventre. Elle vire à l'orange. Elle tourne toujours, mais légèrement plus vite. 3 minutes.",
          "Monter encore au plexus solaire. La lueur est maintenant jaune vif. La rotation s'accélère encore légèrement. 3 minutes.",
          "Continuer vers le centre du thorax. Ici, la lueur devient blanche — lumineuse, égale, sans chaleur agressive. C'est le centre de l'équilibre. Rester ici 5 minutes. Observer si une sensation d'expansion se produit.",
          "Si la montée vient naturellement : continuer vers la gorge (bleu pâle, 2 min), puis entre les sourcils (violet profond, 2 min), puis sommet du crâne (lumière blanche pure qui déborde, 3 min).",
          "Descendre lentement en suivant les couleurs en sens inverse. Reposer dans le rouge à la base. 2 minutes.",
          "Respirer profondément. Ouvrir les yeux lentement."
        ],
        adaptations:["Ne pas forcer la montée au-delà du thorax lors des premières séances. Le thorax blanc est une étape en soi."],
        safety:"Si une chaleur ou une pression intense se produit, ralentir la progression et respirer plus lentement."
      },
      preprogrammedSession:{
        label:"Koundalini 22 — Montée hélicoïdale et échelle des couleurs",
        context:"La rotation douce soutient la visualisation hélicoïdale. Pendant le balancement, conduire mentalement l'énergie de rouge (base) à blanc (thorax) à chaque cycle. La respiration rectangulaire 6s synchronise la montée.",
        detente:3,
        objetContemplation:"cercles",
        balancement:{type:"rotation", duree:25},
        respiration:{type:"rectangulaire", mesure:6, duree:12},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["LA","DO"]
      }
    },
    {
      id:"c034", number:23, order:34, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 23 — L'illumination intérieure",
      subtitle:"Quand la Koundalini atteint le sommet — états hypervigiles et purification",
      summary:"Lorsque la force tourbillonnaire atteint la tête, surgissent des états hypervigiles : une lumière intérieure d'une intensité indescriptible, la purification des pensées et des sentiments, et l'ouverture à une perception élargie du temps et de l'espace. Ce cours décrit ces états, comment les préparer, les accueillir, les stabiliser sans les fuir ni les saisir.",
      longSummary:"L'illumination est décrite de la même façon dans toutes les traditions — qu'il s'agisse des textes du Cachemire, des soufis, des Taoïstes ou de la contemplation chrétienne : une lumière intérieure d'une nature particulière, différente de toute image visuelle, inondant la conscience d'une présence qui est à la fois très agréable et d'une grande beauté. Elle s'accompagne d'une perception modifiée du temps — qui semble s'arrêter ou se dilater — et d'une certitude tranquille. La force qui a produit cet état peut être comprise, cultivée et renouvelée.",
      tags:["illumination","hypervigile","lumière","sommet"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-033/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Préparer les conditions physiologiques et mentales de l'illumination, savoir la reconnaître quand elle se produit.",
      initiaticObjective:"Vivre au moins une fois l'état hypervigile et comprendre comment le renouveler.",
      teaching:{
        intro:"Depuis des millénaires, des êtres humains affirment avoir perçu une lumière intérieure d'une intensité indescriptible. Cette lumière s'est bien souvent traduite à l'extérieur seulement par des remous étranges, parfois par des traits de génie. Personne n'avait encore analysé suffisamment en détail le mécanisme par lequel cette illumination se produit pour la rendre facilement accessible.",
        sections:[
          { title:"Ce que l'illumination n'est pas", content:"L'illumination n'est pas une image visualisée, ni une production de l'imagination, ni un état d'hystérie ou de transe. Elle présente des caractères propres qui la distinguent de tout autre état : elle n'est pas plate comme une image mentale, elle a un volume ; elle ne gêne pas la vision de l'environnement ; les autres ne la voient pas. C'est un phénomène de conscience, pas de perception sensorielle." },
          { title:"La lumière de première génération", content:"Par analogie avec la physique solaire — où une lumière de première génération est produite au centre et doit traverser des couches opaques avant de se manifester en surface — la lumière intérieure est une énergie profonde qui cherche à se manifester. Toute la pratique initiatique consiste à aider cette énergie à traverser les 'couches opaques' du mental ordinaire." },
          { title:"Après l'illumination", content:"L'état d'illumination, quand il survient, produit des effets durables : purification des pensées, légèreté des sentiments, facilité d'attention, qualité du sommeil améliorée, intuition renforcée. Il n'est pas nécessaire de 'rester dans l'illumination' — il suffit d'avoir traversé cette frontière pour que la transformation soit en cours." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Préparation mentale", content:"Lire l'intention du cours. Écrire dans le carnet : 'Ce que j'attends de ce cours', puis déposer l'attente." },
        { time:"10–20 min", title:"Respiration rythmique d'ouverture", content:"Respiration rectangulaire : 8 temps inspiration, 4 temps rétention, 8 temps expiration, 4 temps vide. 10 cycles." },
        { time:"20–50 min", title:"Méditation de préparation à l'illumination", content:"Exercice complet ci-dessous." },
        { time:"50–60 min", title:"Carnet d'expérience approfondi", content:"Décrire avec précision ce qui s'est produit. Ne pas amplifier. Ne pas minimiser. Juste ce qui a été." }
      ],
      contemplation:{ duration:"5 min", question:"Si une lumière intérieure devait surgir maintenant, de quelle couleur serait-elle, et d'où viendrait-elle ?", guidance:"Ne pas chercher. Simplement accueillir ce qui se présente, si quelque chose se présente." },
      practice:{
        name:"Méditation de préparation à l'illumination",
        duration:"30 minutes",
        intention:"Créer les conditions de l'illumination sans la forcer — par la respiration rythmique, la rotation et la montée.",
        posture:"Assis, colonne droite, mains en mudra de réception — paumes vers le haut sur les genoux.",
        steps:[
          "10 cycles de respiration rectangulaire : inspire 8, pause 4, expire 8, vide 4. Très régulier.",
          "Porter l'attention au périnée. Imaginer le tourbillon rouge qui se met en mouvement.",
          "Sur chaque inspire, laisser l'énergie monter d'un chakra. Sur chaque expire, laisser la rotation s'intensifier dans le chakra atteint.",
          "Procéder ainsi chakra par chakra jusqu'au sommet du crâne — 6 grandes respirations en tout.",
          "Arrivé au sommet, ne plus guider. Respirer naturellement. Observer passivement ce qui se produit.",
          "S'il ne se passe rien de particulier : c'est normal lors des premières séances. L'important est d'avoir fait le chemin.",
          "S'il se produit une qualité de lumière ou d'espace inhabituels : ne pas s'y agripper. La laisser être. L'observer sans la commenter mentalement.",
          "Demeurer dans cet espace, actif ou non, pendant 15 minutes.",
          "Descendre lentement en refermant les chakras de haut en bas. Terminer en portant l'attention sur les deux pieds touchant le sol."
        ],
        adaptations:["Réduire le nombre de chakras si la concentration se disperse. Aller plus lentement vaut mieux qu'aller vite."],
        safety:"Si une émotion intense surgit : respirer lentement, poser les mains à plat sur le sol, revenir au corps physique."
      },
      preprogrammedSession:{
        label:"Koundalini 23 — Préparation à l'illumination",
        context:"Séance profonde. La respiration rectangulaire 8s prépare l'ouverture. Après la séance, rester allongé 10 min en observation passive — c'est là que l'illumination se manifeste le plus souvent.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{type:"rotation", duree:20},
        respiration:{type:"rectangulaire", mesure:8, duree:15},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["FA"]
      }
    },
    {
      id:"c035", number:23.5, order:35, unlockDays:21, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 23.5 — Programme 21 jours — L'Éveil progressif",
      subtitle:"Protocole quotidien pour que le cerveau 'prenne le pli' de la rotation",
      summary:"21 jours de pratique progressive : chaque jour une combinaison précise d'oscillation, de rotation mentale et de respiration rythmique. La progression est conçue pour que le cerveau prenne le pli de la fonction rotationnelle jusqu'à ce qu'elle devienne naturelle, automatique et consciente — comparable à une mise en orbite.",
      longSummary:"La mise en orbite d'un satellite nécessite une vitesse critique — en-deçà, il retombe. Une fois en orbite, il y reste. L'éveil de Koundalini suit la même logique : une pratique quotidienne suffit pour que le cerveau prenne un pli permanent. Ce programme de 21 jours est conçu pour que chaque séance s'appuie sur la précédente, de façon à ce que la puissance de l'éveil soit en général suffisante dès les deux premières semaines pour produire les effets classiques de la montée — ressentie dans la colonne vertébrale, produisant une illumination lorsqu'elle atteint la tête.",
      tags:["programme","21 jours","progressif","quotidien"],
      level:"Intégration", duration:"21 jours",
      image:"assets/courses/course-034/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Établir une pratique quotidienne stable sur 21 jours pour que la rotation devienne une fonction cérébrale naturelle.",
      initiaticObjective:"Atteindre la 'mise en orbite' — le point où l'éveil de Koundalini se maintient de lui-même.",
      teaching:{
        intro:"Le programme 21 jours est structuré en trois semaines de 7 jours. Chaque semaine approfondit un aspect de la triade : oscillation (semaine 1), rotation (semaine 2), tremblement et synthèse (semaine 3).",
        sections:[
          { title:"Semaine 1 — L'Oscillation (Jours 1-7)", content:"Chaque jour : 15 min de balancement physique gauche-droite à 2 secondes + 5 min d'observation de l'oscillation mentale qui persiste après l'arrêt du mouvement + carnet. Objectif : que l'oscillation devienne perceptible sans le mouvement physique." },
          { title:"Semaine 2 — Le Tourbillon (Jours 8-14)", content:"Chaque jour : 5 min de balancement d'ouverture + 20 min de rotation mentale dans les chakras + 3 rotations du corps + carnet. Objectif : que le tourbillon se déclenche rapidement, en moins de 2 minutes de pratique." },
          { title:"Semaine 3 — La Synthèse (Jours 15-21)", content:"Chaque jour : respiration rectangulaire 8 cycles + montée colorée complète + mantra rapide 6/seconde pendant 5 min + carnet. Objectif : que les trois rythmes coexistent simultanément sans effort de volonté." }
        ]
      },
      minutePlan:[
        { time:"Jours 1-7", title:"Semaine de l'Oscillation", content:"20 min/jour : 15 min balancement + 5 min observation intérieure." },
        { time:"Jours 8-14", title:"Semaine du Tourbillon", content:"30 min/jour : 5 min balancement + 20 min chakras + 3 rotations." },
        { time:"Jours 15-21", title:"Semaine de la Synthèse", content:"45 min/jour : respiration rythmique + montée colorée + mantra rapide." }
      ],
      contemplation:{ duration:"5 min", question:"Où en suis-je dans ma mise en orbite ? Quelle résistance reste présente ?", guidance:"Ne pas évaluer. Simplement observer l'état du jour et le noter honnêtement dans le carnet." },
      practice:{
        name:"Protocole jour 1 — Premier balancement",
        duration:"20 minutes",
        intention:"Installer la fondation de l'oscillation régulière.",
        posture:"Assis sur une chaise ou en tailleur. Colonne droite.",
        steps:[
          "Balancement latéral droit-gauche à raison de 2 secondes par cycle complet. 15 minutes.",
          "Arrêter le mouvement physique. Fermer les yeux. Observer si le balancement continue mentalement.",
          "S'il continue : ne pas l'arrêter. Observer avec curiosité. C'est le premier signe de la Koundalini.",
          "Après 5 minutes, noter dans le carnet : durée du balancement mental après l'arrêt, qualité, sensation associée."
        ],
        adaptations:["Adapter la durée à 10 min le premier jour si nécessaire."],
        safety:"Aucun risque dans ce protocole. Le balancement est physiologiquement neutre et même bénéfique."
      },
      preprogrammedSession:{
        label:"Koundalini 23.5 — Jour 1 du programme 21 jours",
        context:"Premier jour : fondation de l'oscillation. Balancement latéral simple 15 min. Après l'arrêt, observer le balancement mental résiduel. C'est le premier signe de la Koundalini.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:15},
        respiration:{type:"carrée", mesure:4, duree:5},
        final:{type:"tension", duree:3},
        voix:true,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c036", number:24, order:36, unlockDays:4, symbol:"⊛",
      familyId:"kundalini", familyTitle:"Éveil de la Koundalini",
      title:"Cours 24 — L'éveil comme fondation de vie",
      subtitle:"Intégrer la Koundalini dans la pratique quotidienne",
      summary:"L'éveil de Koundalini n'est pas une destination mais un début. Ce cours montre comment maintenir et approfondir la fonction rotationnelle dans la vie ordinaire — au réveil, pendant la marche, dans la relation, dans le travail créatif — jusqu'à ce que le tourbillon devienne une présence permanente et bénéfique.",
      longSummary:"Une fois que le cerveau a 'pris le pli' de la rotation, il ne l'oublie pas — comme un satellite en orbite. La question n'est plus 'comment éveiller Koundalini' mais 'comment approfondir et étendre cet éveil'. Ce cours explore les façons dont la rotation mentale peut être réactivée en quelques secondes dans n'importe quelle situation de vie, comment elle transforme la qualité de l'attention, des relations et du travail, et comment elle devient progressivement une source d'énergie permanente plutôt qu'une pratique séparée.",
      tags:["intégration","quotidien","stabilisation","vie"],
      level:"Intégration", duration:"1 h",
      image:"assets/courses/course-035/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Transférer la pratique formelle dans la vie quotidienne par des micro-pratiques intégrées.",
      initiaticObjective:"Que la rotation devienne une présence permanente et une source d'énergie dans toutes les activités.",
      teaching:{
        intro:"Les grands initiés des traditions orientales ne sont pas en permanence en méditation formelle. Ils ont appris à maintenir le tourbillon intérieur en pleine activité ordinaire. C'est cela, la véritable intégration.",
        sections:[
          { title:"La pratique minute", content:"60 secondes de rotation mentale focalisée sur le chakra du plexus solaire peuvent suffire à réactiver l'ensemble de la triade. Cette 'pratique minute' peut être insérée dans n'importe quelle transition de la journée : entre deux activités, avant une conversation importante, en attendant le bus." },
          { title:"Le tourbillon dans la relation", content:"L'éveil de Koundalini transforme la qualité de la présence relationnelle. Une personne dont la fonction rotationnelle est active perçoit les autres avec plus de précision et moins de projection. La transmission d'énergie — documentée dans toutes les traditions — devient possible naturellement." },
          { title:"Koundalini et le sommeil", content:"Une des premières transformations documentées est l'amélioration du sommeil. Les rêves deviennent plus colorés et plus conscients. Dans certains cas, la rotation continue pendant le sommeil léger, produisant des expériences d'éveil sur des plans subtils comparables à celles des initiations orientales." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Bilan des 21 jours", content:"Relire le carnet du programme 21 jours. Identifier les transformations réelles, petites ou grandes." },
        { time:"10–25 min", title:"La pratique minute", content:"Apprendre et pratiquer la version condensée de 60 secondes." },
        { time:"25–45 min", title:"Méditation d'intégration", content:"Exercice de synthèse ci-dessous." },
        { time:"45–60 min", title:"Intention de vie", content:"Formuler une phrase simple sur la façon dont on va continuer à pratiquer dans la vie ordinaire." }
      ],
      contemplation:{ duration:"5 min", question:"Comment Koundalini s'est-elle déjà manifestée dans ma vie ordinaire, même brièvement ?", guidance:"Regarder en arrière. Chercher les moments où l'énergie était plus vive, la pensée plus claire, le corps plus léger." },
      practice:{
        name:"La pratique minute — version intégrée",
        duration:"Toute la vie",
        intention:"Réactiver le tourbillon intérieur en 60 secondes dans n'importe quelle situation.",
        posture:"Debout, assis, en marchant — aucune contrainte posturale.",
        steps:[
          "Prendre une inspiration profonde par le nez.",
          "Sur l'expire, porter l'attention au plexus solaire et imaginer un tourbillon qui se met en mouvement — n'importe quelle direction.",
          "Sur la prochaine inspire, laisser le tourbillon monter vers le thorax.",
          "Sur l'expire, laisser la rotation se diffuser dans tout le corps.",
          "Une dernière respiration : laisser le sommet du crâne s'ouvrir légèrement vers le haut.",
          "Reprendre l'activité. Observer si la qualité de l'attention a changé."
        ],
        adaptations:["Pratiquer cette version condensée 5 à 10 fois par jour lors de la première semaine d'intégration, pour qu'elle devienne automatique."],
        safety:"Aucune contre-indication."
      },
      preprogrammedSession:{
        label:"Koundalini 24 — Intégration quotidienne",
        context:"Séance courte d'entretien. À pratiquer quotidiennement une fois que le cerveau a pris le pli. La pratique minute (60 sec de tourbillon) peut précéder ou suivre cette séance.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:15},
        respiration:{type:"carrée", mesure:5, duree:7},
        final:{type:"tension", duree:3},
        voix:false,
        cloche:false,
        tonalites:["DO"]
      }
    },
    {
      id:"c037", number:25, order:37, unlockDays:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Clore une séance",
      subtitle:"Déposer la lumière, revenir au corps, intégrer l'expérience",
      shortSummary:"Ce cours enseigne l'art de la clôture : revenir au corps avec soin, déposer l'expérience lumineuse sans la perdre, et stabiliser ce qui vient de se produire.",
      summary:"Terminer une séance sans brutalité est une compétence à part entière. Trop souvent, on arrête brusquement, on se lève, on reprend le quotidien — et l'expérience s'évapore. Ce cours transmet l'art de la clôture consciente : le retour progressif au corps, le dépôt de la lumière dans le souffle, la note dans le carnet, et la transition vers la vie ordinaire. La clôture est la dernière phase de l'intégration — elle décide de ce qui reste.",
      tags:["clôture","retour","corps","intégration"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-036/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser un protocole de clôture en trois temps — retour corporel, dépôt de l'expérience, transition consciente — applicable après chaque séance quelle qu'en soit la durée.",
      initiaticObjective:"Comprendre que la clôture n'est pas une fin mais un seuil : ce qui se dépose dans les dernières minutes d'une séance reste actif dans les heures qui suivent. Apprendre à honorer ce seuil.",
      teaching:{
        intro:"Il existe une asymétrie fondamentale dans la pratique intérieure : l'entrée dans la séance est soignée, préparée, consciente — mais la sortie est souvent brutale. On arrête, on se lève, le téléphone sonne. Et tout ce qui vient de se tisser se défait en quelques secondes. Ce cours corrige cette asymétrie.",
        sections:[
          {
            title:"Pourquoi la clôture est une phase à part entière",
            content:"La pratique lumineuse, le balancement, la respiration rythmique — toutes ces disciplines créent un état intérieur particulier : une disponibilité accrue, une sensibilité amplifiée, un espace mental plus ouvert. Cet état est précieux. Il est aussi fragile. Si l'on en sort trop vite — sans transition, sans rituel de clôture — l'expérience se volatilise avant d'avoir pu s'imprimer. La clôture est donc une phase pédagogique à part entière. Elle n'est pas accessoire. Elle est la condition de l'intégration."
          },
          {
            title:"Le retour au corps : trois respirations conscientes",
            content:"La première étape de la clôture est toujours corporelle. Avant de noter, avant de réfléchir, avant de bouger — trois respirations lentes et profondes. Inspire par le nez, expire par la bouche, légèrement plus long. À chaque expire, on sent le poids du corps sur le sol ou sur la chaise. On sent les paumes des mains. On sent la température de l'air sur le visage. Ces trois respirations signalent au système nerveux : la pratique intensive est terminée, le corps peut reprendre le premier plan. Ce retour prend 60 secondes. Il est irremplaçable."
          },
          {
            title:"Déposer la lumière dans le souffle",
            content:"Si une lumière intérieure s'est produite pendant la séance — rémanence, éclat, couleur, chaleur — ne la chassez pas et ne la retenez pas. Imaginez qu'elle descend avec chaque expire, depuis la tête vers le tronc, vers les mains, vers les pieds. Comme si vous l'intégriez dans tout le corps au lieu de la laisser flotter dans la tête seule. Cette visualisation très simple — descendre la lumière avec le souffle — est une technique d'intégration somatique. Elle empêche la dissociation entre expérience et corps, entre vision et vie."
          },
          {
            title:"La note de clôture : trois lignes suffisent",
            content:"Le carnet n'a pas besoin d'être un journal littéraire. Trois lignes suffisent : ce qui s'est passé (une image, une sensation, un mot), ce qui reste (une qualité d'état, une clarté), et ce que je porte dans ma journée (une intention concrète, un geste, une attitude). Ces trois lignes prennent deux minutes. Elles transforment une expérience intérieure en mémoire consolidée. Elles créent un pont entre la séance et la vie. Sans elles, 80% de l'expérience s'efface avant le soir."
          },
          {
            title:"La transition : ne pas reprendre le quotidien comme on plonge dans l'eau froide",
            content:"La dernière étape de la clôture est la transition elle-même. Après le retour corporel, après le dépôt de la lumière, après la note — accordez-vous encore deux minutes avant de vous lever et de reprendre les activités. Ces deux minutes peuvent être simplement des minutes de silence assis. Elles créent un sas entre l'espace intérieur de la pratique et l'espace extérieur du quotidien. Ce sas est le garant de la continuité : l'état d'après la séance reste accessible pendant les heures qui suivent si la transition est respectée."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Ouverture du cours — La clôture comme compétence", content:"Exposé sur la phénomène de l'évaporation de l'expérience. Pourquoi nous perdons ce que nous venons de vivre. La clôture comme antidote."},
        {time:"10–25 min", title:"Le protocole de retour en trois temps", content:"Démonstration des trois respirations de retour, de la descente de la lumière et de la note de clôture. Exercice guidé pas à pas."},
        {time:"25–40 min", title:"Séance courte avec clôture complète", content:"Pratique d'une séance courte de 10 minutes (balancement ou respiration au choix) suivie d'une clôture complète appliquée. Observation de l'état avant et après."},
        {time:"40–55 min", title:"La transition et le carnet — mise en pratique", content:"Écriture dans le carnet : les trois lignes de clôture. Puis exercice de transition consciente debout. Comment porter l'état de la séance dans les premiers gestes du quotidien."},
        {time:"55–60 min", title:"Intégration — L'art du seuil", content:"Synthèse. La clôture comme acte de respect envers soi-même et envers la pratique. Engagement à intégrer ce protocole après chaque séance."}
      ],
      contemplation:{
        duration:"8 minutes",
        question:"Qu'est-ce que je perds habituellement en sortant trop vite d'une pratique ? Qu'est-ce qui resterait si je prenais le temps de clore correctement ?",
        guidance:"Assis, yeux fermés, après avoir noté les trois lignes dans le carnet. Laissez la question résonner sans chercher à y répondre immédiatement. Observez ce qui monte : une image, un regret, une reconnaissance, une intention. Ne forcez rien. La clôture se contemple elle-même."
      },
      practice:{
        name:"Protocole de clôture complète — à appliquer après chaque séance",
        duration:"7 à 10 minutes",
        intention:"Ancrer dans le corps et dans la mémoire ce qui vient de se produire pendant la pratique.",
        posture:"Assis ou allongé selon la fatigue. Si assis : dos droit, mains posées sur les cuisses. Si allongé : bras le long du corps, paumes vers le haut.",
        steps:[
          "Trois respirations de retour : inspire 4 secondes par le nez, expire 6 secondes par la bouche. À chaque expire, sentez le poids du corps, les mains, le sol sous vous.",
          "Descente de la lumière : si une lumière ou une chaleur intérieure est présente, imaginez qu'elle descend avec chaque expire depuis le sommet du crâne vers le tronc, les bras, les jambes. Trois cycles de respiration.",
          "Scan corporel rapide : de la tête aux pieds, sans rien changer, notez mentalement comment se sent chaque zone. 60 secondes.",
          "Ouvrez le carnet. Écrivez exactement trois lignes : (1) Ce qui s'est passé — une image, une sensation, un mot. (2) Ce qui reste — une qualité d'état. (3) Ce que je porte dans ma journée — une intention concrète.",
          "Restez assis encore deux minutes en silence sans rien faire de particulier. C'est le sas de transition.",
          "Levez-vous lentement. Étirez les bras au-dessus de la tête. Expirez fort une fois. La séance est close."
        ],
        adaptations:[
          "Si le temps manque : réduire à trois respirations de retour + une seule ligne dans le carnet. C'est le minimum incontournable.",
          "Si la pratique a été très intense : prolonger le scan corporel à 3 minutes et rester allongé pendant la transition.",
          "Si pratique du soir : après la clôture, glissez directement vers le sommeil en portant l'intention écrite dans le carnet."
        ],
        safety:"Ne jamais sauter la clôture après une séance de plus de 20 minutes. Le système nerveux a besoin de ce signal de retour pour ne pas rester dans un état d'activation prolongée."
      }
    },
    {
      id:"c038", number:26, order:38, unlockDays:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"La carte de vertu comme préparation",
      subtitle:"Éveiller une qualité en soi avant d'entrer en séance",
      shortSummary:"Avant d'ouvrir le générateur de séance, tirer une carte de vertu et laisser la qualité choisie devenir l'intention invisible qui traverse toute la pratique.",
      summary:"La carte de vertu n'est pas un exercice en soi — c'est une préparation. En 5 minutes avant d'ouvrir l'onglet 'Créer sa séance', elle permet d'identifier la qualité intérieure que l'on souhaite éveiller, cultiver ou stabiliser pendant la séance. La vertu devient le fil conducteur invisible : elle oriente le choix des exercices, colore la rémanence, et donne un sens personnel à chaque phase de la pratique.",
      tags:["vertu","préparation","intention","séance"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-037/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Savoir utiliser la carte de vertu comme rituel de préparation avant chaque séance — pour transformer une collection d'exercices en une pratique animée par une intention vivante.",
      initiaticObjective:"Comprendre que l'intention précède toujours la technique. La vertu tirée avant la séance n'est pas un ornement : elle devient l'âme de la séance. Sans elle, on pratique mécaniquement. Avec elle, on pratique en conscience.",
      teaching:{
        intro:"L'onglet 'Vertus' dans l'école propose un jeu de cartes initiatiques : chaque carte porte le nom d'une vertu, sa définition, une phrase essentielle, et une invitation à la pratique. Ces cartes ont été conçues pour être tirées avant une séance — non pas pour remplacer la séance, mais pour l'orienter de l'intérieur. Ce cours enseigne comment les utiliser exactement pour cela : comme préparation à la séance que vous allez construire dans 'Créer sa séance'.",
        sections:[
          {
            title:"Ce qu'est la carte de vertu — et ce qu'elle n'est pas",
            content:"La carte de vertu n'est pas un exercice de morale ni une leçon à apprendre. C'est un miroir. Lorsque vous tirez une carte — patience, courage, discernement, équanimité, présence, joie — vous ne la choisissez pas intellectuellement. Elle arrive. Et ce qui arrive est toujours utile, même si cela dérange. La carte vous dit : 'Voici la qualité que cette séance peut éveiller en toi si tu l'y invites.' À vous de l'accepter et d'en faire l'intention de votre pratique."
          },
          {
            title:"Le rituel de préparation — 5 minutes avant d'ouvrir 'Créer sa séance'",
            content:"Avant d'ouvrir le générateur, asseyez-vous une minute en silence. Ouvrez l'onglet 'Vertus'. Tirez une carte — laissez le hasard décider, ou choisissez délibérément si une qualité vous appelle ce jour-là. Lisez la carte lentement. Une seule phrase doit résonner : c'est votre phrase-intention. Fermez les yeux 2 minutes en tenant cette phrase dans l'esprit. Puis ouvrez 'Créer sa séance'. Désormais, chaque choix que vous faites dans le générateur sera guidé par cette intention. Le balancement que vous choisissez n'est pas seulement un exercice — il est le mouvement de cette vertu dans votre corps."
          },
          {
            title:"Comment la vertu oriente les choix dans le générateur",
            content:"Chaque paramètre de 'Créer sa séance' peut être relié à la vertu choisie. Si votre vertu est la patience : choisissez un rythme respiratoire lent (mesure 6 ou 8 secondes), une durée de balancement longue, et terminez par une tension statique plutôt qu'une rotation vive. Si votre vertu est la clarté : choisissez un objet de contemplation simple (carré ou cercles), une respiration carrée régulière, et une durée modérée pour ne pas saturer. Si votre vertu est la force : amplifiez les paramètres, choisissez la rotation gyroscopique en final, et augmentez la durée du cœur de séance. La vertu n'impose pas les paramètres — elle les colore."
          },
          {
            title:"Pendant la séance : la vertu comme présence silencieuse",
            content:"Une fois la séance lancée, vous n'avez pas besoin de penser à la vertu à chaque instant. Elle est posée comme une intention en début de séance — elle travaille d'elle-même. Pendant le balancement, si votre esprit se disperse, revenez à la phrase-intention : une seule répétition mentale suffit pour retrouver le fil. Pendant la rémanence, si vous entrez en contemplation, laissez la vertu colorer l'espace intérieur. À la fin, pendant les dernières secondes avant le retour, demandez-vous simplement : 'Est-ce que cette qualité est un peu plus vivante en moi qu'avant la séance ?'"
          },
          {
            title:"Après la séance : noter la vertu dans le carnet",
            content:"La note de clôture dans le carnet doit mentionner la vertu travaillée. Une ligne suffit : la vertu tirée, la phrase-intention choisie, et un mot sur ce qui a été ressenti. Cette note crée une continuité entre les séances. Après vingt séances, vous verrez les patterns : les vertus qui reviennent souvent, celles que vous évitez, et le chemin silencieux qu'elles tracent. La carte de vertu, utilisée systématiquement, transforme une pratique d'exercices en un chemin intérieur."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Introduction — La vertu comme âme de la séance", content:"Exposé sur la différence entre pratiquer mécaniquement et pratiquer avec une intention vivante. Présentation du rôle de la carte de vertu comme préparation — non comme exercice supplémentaire, mais comme orientation intérieure."},
        {time:"10–20 min", title:"Découverte des cartes — Tirage et lecture active", content:"Chaque participant ouvre l'onglet Vertus et tire une carte. Lecture silencieuse, puis à voix haute pour certaines. Identification de la phrase-intention personnelle. Discussion sur les résistances et les affinités."},
        {time:"20–30 min", title:"Le rituel des 5 minutes — Pratique guidée", content:"Tirage guidé collectif. Lecture de la carte tirée. Fermeture des yeux pendant 2 minutes en tenant la phrase-intention. Ouverture du générateur 'Créer sa séance'. Observation de la manière dont la vertu oriente les choix de paramètres."},
        {time:"30–50 min", title:"Construction et pratique d'une séance orientée par la vertu", content:"Chaque participant construit et démarre sa séance dans le générateur, en laissant la vertu guider les choix de durée, d'exercice et de tempo. L'enseignant observe et commente les choix."},
        {time:"50–60 min", title:"Clôture — Note et partage", content:"Note de clôture dans le carnet : vertu, phrase-intention, ressenti. Partage de deux ou trois observations sur la différence entre une séance 'technique' et une séance orientée par une intention de vertu."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Quelle qualité intérieure voudrais-je éveiller dans ma prochaine séance — non pas parce qu'elle me manque, mais parce qu'elle est déjà là et attend d'être invitée ?",
        guidance:"Assis, yeux fermés. Laissez venir le nom d'une vertu — sans chercher, sans juger. Un mot simple suffit : patience, présence, courage, joie, clarté. Ce mot est votre intention pour la séance à venir. Posez-le doucement, comme on pose une bougie allumée avant de commencer un travail."
      },
      practice:{
        name:"Rituel de préparation par la carte de vertu — 5 minutes",
        duration:"5 minutes (avant la séance)",
        intention:"Identifier une qualité intérieure à éveiller et l'établir comme intention invisible de la séance à venir dans 'Créer sa séance'.",
        material:"L'onglet 'Vertus' de l'école (cartes numériques). Le carnet de pratique. L'onglet 'Créer sa séance' ouvert en arrière-plan.",
        posture:"Assis, dos droit, mains posées sur les genoux. Écran visible mais non actif.",
        steps:[
          "Silence d'entrée (1 min) : Posez les mains, fermez les yeux. Trois respirations lentes. Prenez conscience de l'état intérieur du moment — agité, calme, fatigué, alerte. Ne cherchez pas à le changer.",
          "Tirage (30 sec) : Ouvrez l'onglet Vertus. Tirez une carte sans réfléchir — laissez le hasard décider. Si le hasard vous résiste ou que vous êtes attiré par une carte spécifique, choisissez-la délibérément. Les deux manières sont valides.",
          "Lecture active (2 min) : Lisez la carte lentement. Une première fois pour l'ensemble. Une seconde fois pour trouver la phrase qui résonne le plus en vous ce jour précis. Notez-la dans votre carnet.",
          "Intention posée (1 min 30) : Fermez les yeux. Répétez mentalement la phrase-intention trois fois, lentement. Laissez-la s'installer dans le corps — pas dans la tête.",
          "Ouverture du générateur : Ouvrez 'Créer sa séance'. La vertu est maintenant votre boussole. Chaque choix de paramètre peut en être coloré — durée, rythme, type d'exercice, ambiance sonore."
        ],
        adaptations:[
          "Pratique sans onglet Vertus disponible : choisissez librement un mot de qualité qui vous appelle ce jour-là. La vertu n'a pas besoin d'une carte pour exister.",
          "Temps très limité : 1 minute suffit — tirage, lecture d'une seule ligne, fermeture des yeux 30 secondes. L'intention, même posée en une minute, change la qualité de la séance.",
          "Répétition sur plusieurs jours : travailler la même vertu 7 jours de suite avant chaque séance produit une imprégnation profonde. La vertu commence à s'activer spontanément."
        ],
        safety:"Ce rituel n'est pas une contrainte — si un jour vous n'avez pas le temps, pratiquez sans lui. L'intention peut aussi être posée en silence, sans carte, au moment d'appuyer sur 'Générer la séance'."
      }
    },
    {
      id:"c039", number:27, order:39, unlockDays:1, symbol:"◎",
      familyId:"regles", familyTitle:"Règles de l'enseignement",
      title:"Créer sa séance — Guide complet du générateur",
      subtitle:"Comprendre et maîtriser chaque réglage de l'onglet 'Créer sa séance'",
      shortSummary:"Un cours entier consacré à l'onglet 'Créer sa séance' : à quoi sert chaque paramètre, comment les choisir, et comment générer une séance personnalisée complète en quelques clics.",
      summary:"L'onglet 'Créer sa séance' est le cœur opérationnel de l'école — le lieu où toutes les disciplines se combinent en une séance personnalisée. Ce cours explique en détail chaque paramètre disponible : détente initiale, objet de contemplation, type et durée du balancement, type et mesure de la respiration, phase finale, réglages audio et vocaux, et les deux boutons d'action. À la fin de ce cours, vous savez construire une séance adaptée à votre état du jour, à votre intention, et à votre niveau de pratique.",
      tags:["séance","générateur","paramètres","pratique","outil"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-038/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Maîtriser chaque paramètre du générateur 'Créer sa séance' : savoir quoi choisir, pourquoi, et comment construire une séance cohérente avec son intention et son état intérieur du moment.",
      initiaticObjective:"Comprendre que la séance générée n'est pas arbitraire — chaque paramètre est un choix conscient. Savoir composer sa séance, c'est commencer à se connaître : ses besoins, ses préférences, ses zones de résistance et ses terrains de progression.",
      teaching:{
        intro:"Le générateur 'Créer sa séance' propose une séquence en cinq phases : détente initiale, observation lumineuse, balancement, respiration, et final. Chaque phase est paramétrable. L'objectif de ce cours est de comprendre chaque option disponible — non pas pour mémoriser des règles, mais pour pouvoir choisir avec discernement. Une séance bien construite n'est pas forcément longue ou complexe — elle est juste adaptée au moment.",
        sections:[
          {
            title:"Phase 1 — Détente initiale (1 à 5 minutes)",
            content:"La détente initiale est la phase d'entrée. Elle prépare le système nerveux à recevoir les exercices qui suivent. Durée recommandée : 3 minutes pour une séance standard, 5 minutes si vous êtes agité ou stressé, 1 minute si vous êtes déjà calme. Pendant cette phase, une piste audio de détente peut être activée — elle guide la respiration naturelle et le relâchement musculaire. Ne pas sauter cette phase : elle conditionne la qualité de tout ce qui suit."
          },
          {
            title:"Phase 2 — Objet de contemplation (observation lumineuse — 20 secondes)",
            content:"Après la détente, une observation lumineuse brève de 20 secondes amorce la production de rémanence. Le générateur propose plusieurs objets : carré lumineux, cercles concentriques, arbre, rose, tulipes, objet 3D, rectangle, triangle — ou un import de votre propre image. Comment choisir : pour une séance de concentration, privilégiez les formes géométriques simples (carré, rectangle, triangle). Pour une séance créative ou émotionnelle, les formes organiques (rose, arbre) produisent des rémanences plus colorées. Pour une séance très centrée, le carré blanc sur fond sombre est le plus neutre. L'objet importé permet d'associer une image personnelle à la séance — une photo, un symbole, une intention visuelle."
          },
          {
            title:"Phase 3 — Balancement : type et durée",
            content:"Le balancement est la discipline centrale de la plupart des séances. Trois types disponibles. (1) Balancement latéral : droite-gauche, le plus accessible, idéal pour les débutants et les séances de relaxation active. (2) Balancement vertical : haut-bas, plus stimulant, favorise la vigilance et la concentration. Recommandé en milieu de journée ou quand la fatigue est présente. (3) Rotation douce : mouvement circulaire, plus complexe à maintenir, produit les rémanences les plus riches. Pour les pratiquants expérimentés. Durée : de 15 à 45 minutes. Une première séance : 15 minutes. Une séance régulière : 20 à 30 minutes. Une séance approfondie : 40 à 45 minutes. Règle simple — mieux vaut 20 minutes de qualité que 40 minutes d'attention dispersée."
          },
          {
            title:"Phase 4 — Respiration : type, mesure, durée",
            content:"La respiration suit le balancement — elle amplifie les effets de la rémanence et installe un rythme intérieur stable. Trois types disponibles. (1) Respiration carrée : inspiration / rétention / expiration / rétention, durées égales. Le plus équilibrant. Idéal pour les séances centrées sur la clarté et l'équilibre. (2) Respiration triangulaire : trois temps sans rétention après expiration, ou avec rétention sur l'une des phases. Plus tonifiante. (3) Respiration rectangulaire : inspiration courte, rétention longue, expiration longue. Profonde et apaisante. Mesure (en secondes par temps) : 4 secondes est le tempo de base, accessible à tous. 5 à 6 secondes pour une pratique plus avancée. 8 secondes pour les pratiquants expérimentés, effet très profond. Durée : 5 à 15 minutes. Commencez par 5 minutes si vous débutez en respiration rythmique."
          },
          {
            title:"Phase 5 — Final : tension statique ou rotation gyroscopique",
            content:"Le final est la phase de clôture active — elle scelle la séance et consolide les effets. Deux options. (1) Tension statique : contraction musculaire intense pendant quelques secondes, puis relâchement complet. Produit un effet de « vidange » du système nerveux — très efficace pour libérer les tensions accumulées pendant la séance. Durée : 1, 3 ou 5 minutes. (2) Rotation gyroscopique : les yeux décrivent un mouvement circulaire régulier. Stimule les connections inter-hémisphériques et amplifie la rémanence finale. Durée : 1, 3, 5 ou 10 minutes. Comment choisir : si la séance a été intense ou que vous voulez vous sentir libéré et ancré, choisissez la tension statique. Si vous voulez amplifier la rémanence et rester dans un état méditatif lumineux, choisissez la rotation gyroscopique."
          },
          {
            title:"Réglages audio, voix et tonalités",
            content:"Le générateur propose plusieurs réglages sonores. Pistes audio par phase : chaque phase peut recevoir une piste audio dédiée — détente, observation lumineuse, balancement, respiration, final. Activez celles qui correspondent à votre type de séance. Guidage vocal : activez/désactivez la voix guidée. Utile pour les débutants ou les séances intenses. Désactivez-la si vous souhaitez une pratique en silence total. Vitesse et volume vocal sont réglables indépendamment. Cloche de transition : un signal sonore annonce le passage entre les phases. Recommandé pour ne pas avoir à regarder l'écran. Tonalités LA / DO / FA : trois tonalités spécifiques peuvent être activées pendant la séance. Elles correspondent à des fréquences qui soutiennent respectivement l'ancrage (LA), l'ouverture (DO) et la vibration intérieure (FA). Activez une ou deux tonalités — jamais les trois simultanément."
          },
          {
            title:"Les deux boutons d'action",
            content:"Une fois tous les paramètres réglés, deux boutons sont disponibles. (1) 'Générer la séance' : génère le programme détaillé de la séance (durée totale, phases, paramètres récapitulés) mais ne la lance pas. Utilisez ce bouton pour vérifier la cohérence avant de commencer. (2) 'Générer et ouvrir Pratiquer' : génère la séance ET ouvre immédiatement l'onglet 'Pratiquer' avec la séance prête à démarrer. Le bouton à utiliser quand vous êtes prêt à pratiquer. Conseil : au début, utilisez 'Générer la séance' pour lire le récapitulatif et vérifier vos choix. Quand vous maîtrisez le générateur, allez directement sur 'Générer et ouvrir Pratiquer'."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Introduction — La logique du générateur de séances", content:"Présentation de la philosophie derrière 'Créer sa séance' : pourquoi les cinq phases dans cet ordre, comment elles s'amplifient mutuellement, et ce que signifie 'construire une séance adaptée à son état du moment'."},
        {time:"10–30 min", title:"Exploration guidée de chaque paramètre", content:"Parcours complet du générateur en temps réel avec l'enseignant. Chaque paramètre est expliqué, démontré et discuté. Focus particulier sur : le choix du type de balancement selon l'état du jour, la mesure respiratoire selon l'expérience, et le final selon l'intention."},
        {time:"30–45 min", title:"Construction d'une séance personnelle", content:"Chaque participant configure sa propre séance dans le générateur, selon son état et son intention du moment. L'enseignant passe individuellement pour commenter les choix. Discussion collective sur les différentes configurations choisies."},
        {time:"45–57 min", title:"Pratique — Lancement de la séance configurée", content:"Chaque participant clique sur 'Générer et ouvrir Pratiquer' et réalise les premières 10 minutes de sa séance. Retour sur l'expérience : est-ce que les paramètres choisis correspondent à l'état ressenti ?"},
        {time:"57–60 min", title:"Synthèse — Le générateur comme outil de connaissance de soi", content:"Comment utiliser le générateur régulièrement pour affiner sa connaissance de ses besoins. Le carnet comme mémoire des configurations qui fonctionnent."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Quel est mon état intérieur en ce moment — agité ou calme, concentré ou dispersé, ouvert ou fermé ? En partant de cet état précis, quelle séance serait la plus juste aujourd'hui ?",
        guidance:"Assis, les yeux fermés. Scannez simplement votre état physique, mental et émotionnel. Ne jugez rien. À partir de ce scan, laissez venir les paramètres naturellement : durée courte ou longue ? mouvement doux ou vigoureux ? silence ou guidage vocal ? Votre corps sait ce dont il a besoin — le générateur lui donne la forme."
      },
      practice:{
        name:"Configuration et lancement d'une séance personnalisée complète",
        duration:"Variable selon la configuration",
        intention:"Apprendre à utiliser chaque paramètre du générateur de manière consciente et à construire une séance adaptée à l'intention et à l'état du moment.",
        material:"L'onglet 'Créer sa séance' ouvert. Le carnet de pratique. Un espace calme pour pratiquer.",
        posture:"Assis face à l'écran pour la configuration. Posture variable selon la séance générée.",
        steps:[
          "Préparation (2 min) : Avant d'ouvrir le générateur, notez dans votre carnet : votre état du moment en un mot, et votre intention pour cette séance en une phrase. Ce sera votre boussole pour les choix de paramètres.",
          "Détente initiale : Choisissez une durée entre 1 et 5 minutes. Activez la piste audio de détente si disponible. Règle : 3 minutes par défaut, 5 minutes si vous êtes agité.",
          "Objet de contemplation : Choisissez un objet selon votre intention. Forme géométrique pour la concentration, forme organique pour l'ouverture émotionnelle. L'objet importé pour associer une image personnelle.",
          "Balancement : Choisissez le type (latéral / vertical / rotation) selon votre énergie du moment. Choisissez la durée selon votre disponibilité. Notez votre choix dans le carnet.",
          "Respiration : Choisissez le type (carrée / triangulaire / rectangulaire) et la mesure (4, 5, 6 ou 8 secondes). Règle de base : commencez à 4 secondes jusqu'à ce que 5 minutes de respiration rythmique soient naturelles.",
          "Final : Tension statique pour ancrer et libérer, rotation gyroscopique pour amplifier la rémanence. Durée : 1 à 5 minutes.",
          "Audio : Activez les pistes souhaitées. Décidez du guidage vocal (oui/non), de la cloche de transition, et des tonalités (une ou deux maximum).",
          "Génération : Cliquez sur 'Générer la séance' pour vérifier le récapitulatif. Puis 'Générer et ouvrir Pratiquer' pour démarrer. Bonne séance."
        ],
        adaptations:[
          "Séance courte (20 minutes) : détente 2 min, balancement 10 min, respiration 5 min, final 3 min. Objet de contemplation toujours présent.",
          "Première utilisation : commencez par les réglages par défaut, lancez la séance, et ajustez les paramètres à la séance suivante selon ce qui vous a semblé trop court, trop long, trop rapide.",
          "Séance avancée : 45 min de balancement (rotation douce) + 15 min de respiration carrée à 8 secondes + 5 min de rotation gyroscopique. La combinaison la plus profonde disponible dans le générateur."
        ],
        safety:"Ne jamais dépasser vos capacités du jour. Si une phase semble trop longue ou trop intense en cours de séance, vous pouvez toujours passer manuellement à la phase suivante dans l'onglet Pratiquer. La séance générée est un guide, pas une contrainte."
      }
    },

    // ── TERRAIN VIVANT (28-35) ─────────────────────────────
    {
      id:"c040", number:28, order:40, unlockDays:21, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Terrain vivant : eau, sang, souffle, minéraux",
      subtitle:"Le corps comme milieu conducteur de la lumière intérieure",
      shortSummary:"Un terrain acide, saturé ou minéralement appauvri résiste à la lumière. Un terrain réducteur, bien hydraté et minéralisé la reçoit, la transmet, l'amplifie.",
      summary:"On ne bâtit pas un temple vivant sur un terrain saturé. La qualité du corps physique — son eau, son sang, son souffle, ses minéraux — conditionne directement la profondeur de la pratique intérieure. Ce cours introduit la notion fondamentale de terrain : non pas comme un thème de santé périphérique, mais comme la chambre que l'on prépare pour accueillir la lumière.",
      tags:["terrain","eau","sang","conductivité","rH2"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-039/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre pourquoi la qualité du terrain physique conditionne la profondeur de la pratique lumineuse, et identifier les quatre piliers d'un terrain conducteur.",
      initiaticObjective:"Prendre conscience que le corps n'est pas un obstacle à la pratique spirituelle — il en est la première matière. Un terrain vivant est une chambre préparée. Un terrain saturé est une chambre encombrée.",
      teaching:{
        intro:"Le Livre de l'Alimentation l'énonce clairement : 'On ne bâtit pas un temple vivant sur un terrain saturé.' Ce cours transmet l'idée centrale de la série Terrain vivant : le corps est le premier conducteur de la lumière. Avant les exercices, avant les techniques, avant les protocoles — il y a la qualité du milieu. Eau, sang, souffle, minéraux : ces quatre éléments forment la base physique de toute transformation intérieure.",
        sections:[
          {
            title:"Le terrain comme notion centrale",
            content:"Le terrain désigne l'ensemble des conditions intérieures dans lesquelles la vie se déroule : qualité de l'eau intracellulaire, composition du sang, conductivité des fluides, équilibre acido-basique, capacité d'élimination. Un terrain dit 'vivant' est un terrain réducteur, hydraté, minéralisé et capable d'éliminer efficacement ses déchets. À l'inverse, un terrain oxydé, surchargé, mal hydraté ou appauvri en minéraux résiste aux transformations — y compris aux transformations intérieures produites par la pratique."
          },
          {
            title:"Terrain acide vs terrain réducteur — ce que cela change pour la pratique",
            content:"Un terrain acide, caractérisé par un rH2 élevé (au-dessus de 28), est un terrain oxydé, surchargé en déchets, où la transmission des signaux nerveux est ralentie. Un terrain réducteur (rH2 entre 20 et 24) est un terrain plus conducteur : les signaux nerveux y circulent mieux, la rémanence lumineuse s'y installe plus profondément, et les effets des balancements et des respirations rythmiques y sont amplifiés. La pratique lumineuse, pour être profonde, bénéficie directement d'un terrain réducteur. Ce n'est pas une théorie abstraite : les pratiquants qui clarifient leur terrain rapportent systématiquement une qualité de rémanence plus riche et des états méditatifs plus stables."
          },
          {
            title:"L'eau — premier conducteur",
            content:"Le corps est composé à 60-70 % d'eau. Cette eau n'est pas un simple solvant — c'est le milieu dans lequel se déroulent toutes les transmissions électriques et biochimiques. La qualité de l'eau intracellulaire dépend de la qualité de l'eau bue, de la minéralité, du pH et de la structure moléculaire. Une eau de bonne qualité, légèrement minéralisée, soutient la conductivité du terrain. L'hydratation régulière — 1,5 à 2 litres par jour — est la première action possible sur le terrain."
          },
          {
            title:"Le sang — véhicule de la lumière intérieure",
            content:"Le sang transporte l'oxygène, les nutriments et les déchets. Sa qualité — sa fluidité, sa richesse en fer, sa teneur en vitamines et minéraux — conditionne directement la qualité de l'oxygénation cérébrale et donc la clarté de conscience pendant la pratique. Un sang surchargé en déchets (excès de sucres industriels, graisses rances, protéines mal digérées, alcool) est un sang 'épais', moins conducteur. Les exercices de respiration rythmique oxygènent directement le sang et le cerveau — c'est pourquoi pratiquer sur un terrain déjà clarifié amplifie leurs effets."
          },
          {
            title:"Le souffle — interface entre terrain physique et terrain énergétique",
            content:"La respiration est l'unique fonction du système végétatif sur laquelle la volonté peut agir directement. Elle régule le pH sanguin (via le CO2), active le système nerveux parasympathique, oxygène le cerveau et déplace le liquide céphalo-rachidien par les variations de pression thoracique. En ce sens, le souffle est à la fois un outil de modification du terrain physique et une porte d'entrée vers la pratique intérieure. La respiration rythmique — pratiquée dans 'Créer sa séance' — agit directement sur la conductivité du terrain."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Introduction — Le corps comme chambre", content:"Présentation du concept de terrain vivant. Lecture du principe fondateur : 'On ne bâtit pas un temple sur un terrain saturé.' Tour d'horizon des quatre piliers."},
        {time:"10–25 min", title:"Eau et hydratation — le premier acte sur le terrain", content:"Exposé sur la qualité de l'eau, la minéralité, la structure. Comment évaluer son niveau d'hydratation. L'eau citronnée du matin comme premier geste de terrain."},
        {time:"25–40 min", title:"Sang, souffle et oxygénation — préparer le cerveau à recevoir", content:"Lien entre qualité du sang, oxygénation cérébrale et profondeur de la rémanence lumineuse. Introduction à la respiration comme modificateur de terrain."},
        {time:"40–55 min", title:"Pratique — Séance terrain du matin", content:"Séance préprogrammée : détente 3 min, balancement latéral 20 min, respiration carrée 5s 10 min, tension statique 3 min. Observer la qualité de la rémanence."},
        {time:"55–60 min", title:"Carnet — noter la qualité du terrain", content:"Après la séance : noter l'état d'hydratation du matin, la qualité de la rémanence, et une intention de terrain pour les 7 prochains jours."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Si mon corps était une chambre que je préparais pour accueillir quelque chose de grand — que devrais-je y retirer ? Que devrais-je y apporter ?",
        guidance:"Yeux fermés, mains posées sur l'abdomen. Scanner le corps de la tête aux pieds. Observer sans juger. Quelles zones semblent lourdes, chargées, peu vivantes ? Quelles zones semblent légères et ouvertes ? Cette observation est le premier geste du terrain."
      },
      practice:{
        name:"Séance terrain du matin — éveil du milieu conducteur",
        duration:"36 minutes",
        intention:"Activer la conductivité du terrain par l'association du balancement, de la respiration rythmique et d'une intention de clarification.",
        material:"Verre d'eau tiède citronnée bu 30 minutes avant. Espace calme. Position assise ou debout pour le balancement.",
        posture:"Assis ou debout selon le type de balancement choisi.",
        steps:[
          "Boire l'eau citronnée 30 minutes avant la séance. Ce geste prépare le terrain — il n'est pas anecdotique.",
          "Détente initiale (3 min) : assis, trois respirations profondes. Scanner le corps. Poser l'intention : 'Je prépare le milieu pour recevoir la lumière.'",
          "Objet de contemplation (20 sec) : fixer le carré lumineux. Fermer les yeux.",
          "Balancement latéral (20 min) : droite-gauche, rythme régulier, 2 secondes par cycle. Maintenir la rémanence. Si l'esprit se disperse, revenir à la qualité physique du mouvement.",
          "Respiration carrée (10 min) : 5 secondes par temps. Inspiration / rétention / expiration / rétention. Sentir l'oxygène travailler le sang.",
          "Tension statique finale (3 min) : contraction douce et progressive de tout le corps, puis relâchement total. Sentir la différence avant/après.",
          "Note dans le carnet : qualité de la rémanence, état du corps, une observation sur le terrain."
        ],
        adaptations:[
          "Matin difficile ou fatigue : réduire balancement à 10 min, respiration à 5 min. L'important est la régularité, pas la durée.",
          "Sans eau citronnée disponible : remplacer par eau tiède nature. L'hydratation prime sur la recette."
        ],
        safety:"Ne pas forcer la respiration carrée si 5 secondes est trop long — commencer à 4 secondes. La pratique doit rester confortable."
      },
      preprogrammedSession:{
        label:"Terrain du matin — milieu conducteur",
        context:"À pratiquer à jeun le matin, après eau tiède citronnée. Idéal pour initier la journée depuis un terrain clarifié.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:20},
        respiration:{type:"carrée", mesure:5, duree:10},
        final:{type:"tension", duree:3},
        voix:true,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c041", number:29, order:41, unlockDays:21, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Alimentation fraîche et réduction de la surcharge",
      subtitle:"Nourrir sans alourdir — le choix des aliments vivants",
      shortSummary:"Ce que l'on mange devient le milieu dans lequel la pratique se déroule. Un repas mort alourdit la chambre. Un repas vivant la clarifie.",
      summary:"La nourriture n'est pas séparable de la pratique — elle en est le substrat. Ce cours distingue les aliments qui clarifient le terrain de ceux qui le surchargent, et transmet la règle centrale : nourrir sans alourdir. La fraîcheur, l'orientation rH2, l'absence d'huiles rances et de sucres industriels sont les premiers critères d'une alimentation au service de la conscience.",
      tags:["alimentation","rH2","vivant","surcharge","fraîcheur"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-040/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Distinguer les aliments qui soutiennent un terrain réducteur de ceux qui l'oxidisent, et construire un repas orienté 'rH2 bas' avant une séance.",
      initiaticObjective:"Comprendre que choisir sa nourriture est un acte de gouvernement sur soi-même. Celui qui mange dans l'excès nourrit l'excès. Celui qui mange des choses mortes finit souvent par se sentir plus lourd qu'avant.",
      teaching:{
        intro:"Le Livre de l'Alimentation distingue deux catégories : les aliments qui tirent le terrain vers une orientation réductrice — plus conductrice, plus vivante — et ceux qui poussent vers une orientation oxydante. Ce n'est pas une morale alimentaire. C'est une lecture du terrain. Ce cours donne les repères pour orienter ses choix sans rigidité ni idolâtrie de la pureté.",
        sections:[
          {
            title:"Le rH2 d'un aliment — ce que cela révèle",
            content:"Chaque aliment possède une orientation rH2 : réductrice (basse, entre 20 et 25) ou oxydante (haute, au-dessus de 28). Les légumes verts frais, les herbes aromatiques, le citron frais, les bouillons clairs, les cuissons douces — poussent vers le réducteur. Les fritures, les huiles rances, les sucres industriels, les produits ultra-transformés, l'alcool — poussent vers l'oxydant. La règle n'est pas l'ascèse mais l'orientation : un repas qui contient 80 % d'éléments réducteurs et 20 % d'éléments neutres soutient déjà un terrain de pratique."
          },
          {
            title:"La fraîcheur — premier critère",
            content:"Un aliment fraîchement préparé conserve son orientation réductrice. La même courgette coupée immédiatement avant consommation a un rH2 significativement plus bas que la même courgette préparée la veille et conservée. La fraîcheur est le premier critère, avant la sophistication de la recette. Une salade préparée à la dernière minute avec une huile d'olive non rancee vaut mieux qu'une préparation élaborée réchauffée trois fois. Ce principe simple transforme la table en outil de terrain."
          },
          {
            title:"Ce qu'il faut éviter — les aliments qui alourdissent la chambre",
            content:"Les aliments qui dégradent le terrain se reconnaissent à quatre caractéristiques : (1) fritures et huiles chauffées répétées — oxydation maximale ; (2) sucres industriels — pics glycémiques qui surchargent le pancréas et génèrent de la glycation ; (3) produits ultra-transformés — cocktails de conservateurs, d'exhausteurs et d'additifs sans valeur vivante ; (4) alcool — toxique hépatique direct. Ce ne sont pas des interdits moraux — ce sont des charges que le corps devra métaboliser pendant la séance, réduisant d'autant la qualité de présence."
          },
          {
            title:"Manger avec présence — la table comme antichambre du sanctuaire",
            content:"L'alimentation consciente commence souvent par une erreur : croire que la pureté de l'assiette prouve la qualité de l'être. Ce n'est pas la purité qui importe — c'est la présence. Manger sans parler inutilement, sans regarder d'écran, sans nourrir en même temps le tumulte mental et le corps : c'est faire de la table une antichambre du sanctuaire. Un repas simple mangé avec présence et gratitude est plus nourrissant, au sens plein, qu'un repas parfaitement équilibré avalé dans la dispersion."
          },
          {
            title:"Timing avant la séance — quand ne pas manger",
            content:"Pratiquer juste après un repas réduit la qualité de la séance. La digestion mobilise l'énergie nerveuse vers les organes digestifs, réduisant la disponibilité du cortex. Règle simple : attendre 2 heures après un repas léger, 3 heures après un repas normal. Idéalement, les séances les plus profondes se font à jeun ou dans la première fenêtre du matin. Si la faim est présente pendant la séance, elle ne perturbe pas — elle clarifie souvent l'espace mental."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Le rH2 de votre assiette — introduction pratique", content:"Présenter 5 aliments courants et identifier leur orientation rH2 : légumes verts frais (réducteur), sucre blanc (oxydant), huile d'olive fraîche (réducteur), chips friture (oxydant), citron frais (réducteur)."},
        {time:"10–25 min", title:"Construire un repas de terrain — exercice pratique", content:"Les participants construisent mentalement un repas 'terrain' pour le lendemain matin, avant une séance. Discussion sur les choix et leurs raisons rH2."},
        {time:"25–40 min", title:"Timing alimentaire et pratique — comment espacer repas et séance", content:"Exemples pratiques de timing. Le jeûne du matin comme espace naturel de pratique. Ce que la légère faim produit comme qualité de présence."},
        {time:"40–55 min", title:"Pratique — Séance après préparation légère", content:"Séance préprogrammée à réaliser 2h après un repas végétal léger."},
        {time:"55–60 min", title:"Carnet — alimentation et qualité de rémanence", content:"Les participants notent la relation qu'ils ont observée entre ce qu'ils ont mangé aujourd'hui et la qualité de leur présence dans la séance."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Ce que j'ai mangé aujourd'hui — est-ce que cela soutient ou alourdit la chambre dans laquelle je veux pratiquer ce soir ?",
        guidance:"Sans culpabilité ni jugement. Simplement observer. La conscience de l'effet est déjà une transformation."
      },
      practice:{
        name:"Séance de clarification post-repas léger",
        duration:"38 minutes",
        intention:"Observer l'effet d'un repas végétal léger sur la qualité de la rémanence et de la présence en séance.",
        material:"Repas léger pris 2 heures avant : légumes cuits, bouillon clair, ou compote de fruits. Rien de frit, rien de sucré industriellement.",
        posture:"Assis, dos droit. Espace aéré.",
        steps:[
          "2h avant la séance : prendre un repas léger végétal. Manger lentement, sans écran, avec présence. Observer la légèreté après le repas.",
          "Détente initiale (5 min) : respiration naturelle, scan corporel. Observer la qualité de l'espace intérieur post-repas.",
          "Objet de contemplation (20 sec) : cercles concentriques ou carré.",
          "Balancement latéral (20 min) : rythme régulier. Maintenir la rémanence comme fond de conscience.",
          "Respiration rectangulaire (10 min) : inspiration 6s, rétention 3s, expiration 9s. Observer l'approfondissement de l'espace intérieur.",
          "Rotation gyroscopique (3 min) : amplification de la rémanence finale.",
          "Carnet : noter la qualité comparée à une séance faite après un repas lourd."
        ],
        adaptations:[
          "Si 2h d'attente n'est pas possible : boire un grand verre d'eau 30 min avant et n'avoir pas mangé depuis au moins 1h30.",
          "Pour une séance du soir : dernier repas léger vers 18h, séance vers 20h30."
        ],
        safety:"Ne pas pratiquer le ventre plein. Si la digestion est active, sentie comme une chaleur abdominale, attendre encore 30 minutes."
      },
      preprogrammedSession:{
        label:"Clarification alimentaire — post-repas léger",
        context:"À pratiquer 2h après un repas végétal léger. Observe la relation entre alimentation et qualité de présence.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{type:"latéral", duree:20},
        respiration:{type:"rectangulaire", mesure:6, duree:10},
        final:{type:"rotation", duree:3},
        voix:true,
        cloche:true,
        tonalites:["FA"]
      }
    },
    {
      id:"c042", number:30, order:42, unlockDays:21, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Émonctoires : intestins, reins, foie, lymphe",
      subtitle:"Les quatre portes de sortie — nettoyer le temple pour recevoir la lumière",
      shortSummary:"Les émonctoires sont les portes d'élimination du corps. Quand elles fonctionnent bien, le terrain se clarifie. Quand elles sont surchargées, le corps accumule et la pratique s'alourdit.",
      summary:"Les intestins discernent, les reins lâchent, le foie transforme, la lymphe circule lentement. Ces quatre émonctoires sont les quatre portes de purification du temple vivant. Ce cours explique le rôle de chacun, les signes d'une surcharge, et les moyens simples de les soutenir — notamment par les respirations rythmiques et les mouvements doux qui activent directement la lymphe et le foie.",
      tags:["émonctoires","intestins","foie","lymphe","reins","purification"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-041/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Identifier les quatre émonctoires, comprendre leurs fonctions et leurs surcharges, et associer chaque porte d'élimination à une pratique spécifique de soutien.",
      initiaticObjective:"Comprendre que purifier les émonctoires n'est pas un acte d'hygiène mais de préparation spirituelle. Les intestins enseignent le discernement. Les reins enseignent le lâcher. Le foie enseigne la transformation. La lymphe enseigne la patience.",
      teaching:{
        intro:"Le Temple Vivant l'énonce : 'Les intestins sont la première porte. Ils reçoivent, sélectionnent, assimilent et rejettent. Lorsqu'ils sont troublés, toute la base du temple devient confuse.' Les émonctoires ne sont pas seulement des organes physiologiques — ils sont des fonctions initiatiques. Les soutenir, c'est préparer la chambre intérieure.",
        sections:[
          {
            title:"Intestins — la première porte : le discernement",
            content:"Les intestins reçoivent tout ce qui entre : nourriture, mais aussi influences, impressions, paroles. Ils sélectionnent ce qui sera assimilé et ce qui sera rejeté. Une flore intestinale déséquilibrée, une fermentation excessive, une perméabilité intestinale altérée — tous ces états produisent un état de 'brouillard mental', une difficulté à discerner clairement. Soutenir l'intestin : fibres solubles, légumes tendres, fermentations adaptées, absence de sucre industriel et de repas trop complexes. L'exercice qui soutient l'intestin : la respiration abdominale profonde, qui masse l'intestin par les variations de pression diaphragmatique."
          },
          {
            title:"Reins — la deuxième porte : le lâcher",
            content:"Les reins portent la mémoire de l'eau. Ils filtrent le sang et éliminent les déchets solubles. Sur le plan intérieur, ils enseignent le lâcher juste : beaucoup gardent en eux des charges mortes — peurs anciennes, fidélités toxiques, relations usées. Ils deviennent réservoirs du passé au lieu d'être réceptacles de présence. Soutenir les reins : eau de qualité, potassium des légumes aqueux, absence d'alcool et d'excès de sel raffiné. L'exercice le plus direct : les balancements, qui créent une pression alternée sur les reins par l'oscillation du bassin."
          },
          {
            title:"Foie — l'atelier central : la transformation",
            content:"Le foie est l'organe de la transformation. Il traite tout ce qui arrive, trie, redistribue. Lorsqu'il est saturé par l'alcool, les graisses rances, les produits ultra-transformés ou les repas trop tardifs, le terrain encaisse mal la suite du travail. Sur le plan intérieur, le foie enseigne la transformation de l'expérience : ce que tu reçois ne doit pas être subi seulement — il doit être traité, converti, réorienté. Le soutien alimentaire du foie : amers nobles (pissenlit, artichaut), citron, crucifères, betterave, herbes fraîches. L'exercice le plus efficace : la respiration triangulaire, qui crée une pression hépato-diaphragmatique rythmique."
          },
          {
            title:"Lymphe — la quatrième porte : la patience",
            content:"La lymphe circule lentement — elle n'a pas de pompe comme le cœur. Elle dépend du mouvement musculaire, de la respiration et de la contraction rythmique des parois lymphatiques. Elle enseigne que le nettoyage profond ne se fait pas dans la brutalité. La lymphe surchargée produit : œdèmes, infections fréquentes, fatigue chronique, sensation d'être 'collant' intérieurement. Soutenir la lymphe : mouvement doux, marche régulière, balancements, absence de sédentarité, limitation du sucre industriel. L'exercice le plus efficace : les balancements réguliers, qui activent la pompe lymphatique par l'alternance de contraction et de relâchement musculaire."
          },
          {
            title:"La respiration complète — outil universel des émonctoires",
            content:"La respiration complète — inspiration diaphragmatique jusqu'au ventre, expansion thoracique, légère rétention, expiration longue — est l'exercice le plus directement efficace sur l'ensemble des émonctoires. Elle masse l'intestin par le diaphragme, active la pompe lymphatique par la pression alternée, soutient la circulation hépatique par les variations de pression abdominale, et optimise l'oxygénation rénale. Pendant un nettoyage du foie (alimentation dépurative sur 7 jours), la respiration rectangulaire profonde est l'exercice à prioriser : inspiration 6s, rétention 6s, expiration 9s."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Présentation des quatre émonctoires — fonctions et surcharges", content:"Tour des quatre portes : rôle physiologique et signification initiatique de chacune. Comment reconnaître une surcharge émonctorielle dans sa pratique."},
        {time:"10–25 min", title:"Alimentation soutien par émonctoire", content:"Quels aliments soutiennent l'intestin / les reins / le foie / la lymphe. Les règles rH2 associées à chaque phase."},
        {time:"25–45 min", title:"Pratique — Respiration dépurative pendant une phase de nettoyage", content:"Séance préprogrammée : respirations rectangulaires profondes comme soutien du foie. À utiliser pendant une semaine de clarification alimentaire."},
        {time:"45–55 min", title:"Protocole d'une semaine d'émonctoires", content:"Comment séquencer le soutien des émonctoires sur 7 jours : intestins (j1-j2), reins (j3-j4), foie (j5-j6), lymphe (j7)."},
        {time:"55–60 min", title:"Carnet — ma porte d'élimination prioritaire", content:"Chaque participant identifie l'émonctoire qu'il souhaite soutenir en priorité et note un plan d'action alimentaire et pratique sur 7 jours."}
      ],
      contemplation:{
        duration:"7 minutes",
        question:"Quelle porte d'élimination est la plus fermée en moi — pas seulement physiquement, mais intérieurement ? Qu'est-ce que je n'ai pas encore laissé partir ?",
        guidance:"Intestins = ce que je n'ai pas encore discerné. Reins = ce que je porte encore et qui n'est plus à moi. Foie = ce que je n'ai pas encore transformé. Lymphe = ce qui circule trop lentement dans ma vie. Yeux fermés, scanner les quatre zones du corps. Observer sans forcer."
      },
      practice:{
        name:"Respiration dépurative — soutien du foie pendant un nettoyage",
        duration:"35 minutes",
        intention:"Utiliser la respiration rectangulaire comme support actif d'un nettoyage hépatique de 7 jours.",
        material:"À pratiquer pendant une semaine d'alimentation clarifiante : pas d'alcool, pas de friture, amers nobles, légumes verts, citron.",
        posture:"Assis, dos droit, mains posées sur l'abdomen.",
        steps:[
          "Détente initiale (5 min) : respirations naturelles, relâchement complet. Poser l'intention : 'Je soutiens la capacité de transformation de mon corps.'",
          "Objet de contemplation (20 sec) : triangle — symbole de la transformation.",
          "Balancement vertical (15 min) : avant-arrière doux, amplitude faible. Ce balancement active doucement la région hépatique.",
          "Respiration rectangulaire dépurative (12 min) : inspiration 6s, rétention haute 6s, expiration 9s, sans rétention basse. Sentir l'expansion abdominale masser les organes. Après 5 min, la chaleur dans la région du foie (côté droit) est souvent perceptible.",
          "Tension statique finale (3 min) : contraction abdominale incluse. Relâchement total.",
          "Note : observer si une sensation de légèreté ou de chaleur dans le flanc droit a été perçue."
        ],
        adaptations:[
          "Si la rétention de 6s est inconfortable : démarrer à 4s. Augmenter progressivement sur 7 jours.",
          "Séance du matin pendant jeûne : encore plus efficace pour le foie qui travaille activement au nettoyage pendant la nuit."
        ],
        safety:"Ne pas pratiquer avec une pathologie hépatique diagnostiquée sans avis médical. La légère chaleur dans le flanc droit est normale — une douleur n'est pas."
      },
      preprogrammedSession:{
        label:"Nettoyage du foie — respiration dépurative",
        context:"Séance à pratiquer pendant une semaine de clarification alimentaire (amers, citron, légumes verts). Idéale le matin à jeun.",
        detente:5,
        objetContemplation:"triangle",
        balancement:{type:"vertical", duree:15},
        respiration:{type:"rectangulaire", mesure:6, duree:12},
        final:{type:"tension", duree:3},
        voix:false,
        cloche:true,
        tonalites:["LA"]
      }
    },
    {
      id:"c043", number:31, order:43, unlockDays:1, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"rH², pH et résistivité : boussole du terrain",
      subtitle:"Trois mesures pour lire l'invisible et orienter la pratique",
      shortSummary:"rH2, pH, résistivité — trois mesures qui révèlent l'état du terrain et guident les choix alimentaires et pratiques. Un rH2 bas (réducteur) est propice à recevoir l'éveil.",
      summary:"Le rH2 n'est pas une décoration théorique. C'est une valeur qui indique l'orientation oxydante ou réductrice d'un milieu — et donc la capacité du terrain à recevoir et transmettre la lumière intérieure. Associé au pH et à la résistivité, il forme la boussole complète du terrain vivant. Ce cours explique ces trois mesures et leur interprétation pratique pour orienter les choix alimentaires et les séances.",
      tags:["rH2","pH","résistivité","boussole","terrain","mesure"],
      level:"Intermédiaire", duration:"1 h",
      image:"assets/courses/course-042/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre ce que mesurent le rH2, le pH et la résistivité, savoir les interpréter et utiliser ces mesures pour orienter les choix alimentaires et la pratique.",
      initiaticObjective:"Comprendre que mesurer son terrain n'est pas un acte médical — c'est un acte de connaissance de soi. Le rH2 révèle une orientation intérieure. Savoir lire ces valeurs, c'est apprendre à lire le milieu dans lequel la lumière doit descendre.",
      teaching:{
        intro:"Le Livre de l'Alimentation le formule ainsi : 'Le rH2 ne se comprend jamais seul — il dialogue avec le pH, la résistivité, et l'état global du terrain.' Ces trois mesures forment un triangle de lecture du terrain. Ensemble, elles décrivent l'état électrochimique du milieu intérieur — et donc sa disposition à accueillir la transformation.",
        sections:[
          {
            title:"Le pH — équilibre acido-basique",
            content:"Le pH mesure la concentration en ions hydrogène dans un fluide. Un pH de 7 est neutre, en dessous de 7 est acide, au-dessus est basique (alcalin). Le pH sanguin est très régulé (7,35-7,45) — toute déviation est compensée par les poumons et les reins. Ce qui est mesurable de manière simple, c'est le pH urinaire (papier pH ou bandelette), qui donne une indication de l'activité tamponnante de l'organisme. Un pH urinaire chroniquement en dessous de 6 indique une acidose de terrain. La nourriture végétale alcalinisante, l'hydratation et la respiration profonde sont les premiers correcteurs."
          },
          {
            title:"Le rH2 — orientation réductrice ou oxydante",
            content:"Le rH2 mesure le potentiel d'oxydoréduction du milieu. Une valeur basse (entre 20 et 24) indique un terrain réducteur, conducteur, vivant — propice à la pratique. Une valeur haute (au-dessus de 28) indique un terrain oxydé, chargé, résistant. Les aliments frais non chauffés, les légumes verts, le citron, les herbes fraîches poussent le rH2 vers le bas (réducteur). Les fritures, l'alcool, les huiles rances, les sucres industriels le poussent vers le haut (oxydant). Le rH2 est la mesure la plus directement liée à la qualité de pratique : un terrain réducteur produit systématiquement une rémanence plus riche et des états méditatifs plus stables."
          },
          {
            title:"La résistivité — conductivité du milieu",
            content:"La résistivité est l'inverse de la conductivité. Une résistivité faible indique un terrain bien minéralisé et conducteur. Une résistivité haute indique un terrain pauvre en électrolytes, peu conducteur. La déshydratation, le manque de minéraux (magnésium, potassium, calcium), l'excès de sucre — augmentent la résistivité. L'hydratation de qualité, le sel complet non raffiné, les légumes riches en potassium — la réduisent. La résistivité est le lien le plus direct entre le terrain et la transmission des signaux électriques dans le système nerveux — et donc la qualité de la rémanence lumineuse."
          },
          {
            title:"Comment lire les trois valeurs ensemble",
            content:"Un terrain idéal pour la pratique : pH urinaire entre 6,5 et 7,2 (légèrement alcalin), rH2 entre 20 et 24 (réducteur), résistivité faible (bonne conductivité). Ces trois valeurs évoluent ensemble — elles ne sont pas indépendantes. Une semaine de clarification alimentaire (légumes verts, citron, eau de qualité, limitation des oxydants) fait descendre le rH2, alcalinise le pH et améliore la conductivité. Les effets sur la qualité de pratique sont perceptibles dès 3 à 5 jours."
          },
          {
            title:"Terrain acide-réducteur — la piste de l'éveil",
            content:"Il existe une combinaison particulièrement propice à recevoir l'éveil : un terrain légèrement acide en pH (6,5-7) associé à un rH2 réducteur bas (20-22). Ce paradoxe apparent — légère acidité avec forte réductivité — caractérise les milieux les plus vivants : l'eau de source fraîche, le liquide céphalo-rachidien, le plasma sanguin oxygéné. C'est dans ce milieu que les processus de régénération cellulaire sont les plus actifs. La pratique lumineuse combinée à une alimentation orientée dans ce sens produit les effets les plus puissants."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Introduction — Mesurer l'invisible pour orienter la pratique", content:"Présentation des trois mesures. Démonstration avec bandelettes pH si disponibles. Lecture des valeurs de chaque participant."},
        {time:"10–25 min", title:"rH2 alimentaire — construire un repas réducteur", content:"Calcul approximatif du rH2 d'un repas type. Exercice : chaque participant propose un menu et évalue son orientation rH2."},
        {time:"25–40 min", title:"La résistivité en pratique — hydratation et minéralisation", content:"Comment l'hydratation et les électrolytes modifient la résistivité. Le sel complet comme outil de conductivité. Eau citronnée + sel = premier protocole de terrain."},
        {time:"40–55 min", title:"Pratique — Séance d'évaluation du terrain", content:"Séance courte avant et après une phase de clarification. Observer la différence de rémanence."},
        {time:"55–60 min", title:"Carnet — ma boussole de terrain personnelle", content:"Chaque participant note ses valeurs estimées et un plan de 7 jours pour orienter son terrain vers le réducteur."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Mon terrain intérieur en ce moment — oxydé ou réducteur ? Chargé ou conducteur ? Pas en jugement, mais en observation.",
        guidance:"Scanner la qualité de la pensée (brumeuse ou claire ?), la qualité de l'énergie (lourde ou légère ?), la qualité de la rémanence dans les exercices récents (faible ou riche ?). Ces observations informelles sont des lectures approximatives du terrain."
      },
      practice:{
        name:"Séance boussole — observer la rémanence comme indicateur de terrain",
        duration:"33 minutes",
        intention:"Utiliser la qualité de la rémanence pendant la séance comme mesure directe de l'état du terrain.",
        material:"Carnet de pratique. Une observation de la qualité de rémanence notée avant la séance (basée sur les séances récentes).",
        posture:"Assis, dos droit.",
        steps:[
          "Avant de commencer : noter dans le carnet l'estimation de son terrain — 'lourd', 'moyen', 'léger'. Pas de mesure exacte nécessaire.",
          "Détente initiale (3 min) : respirations profondes. Intention : 'J'observe la qualité de mon terrain aujourd'hui.'",
          "Objet de contemplation (20 sec) : carré.",
          "Balancement latéral (20 min) : rythme régulier. Attention particulière à la qualité de la rémanence — sa durée, sa richesse colorée, sa stabilité.",
          "Respiration carrée (7 min) : 5 secondes par temps. Observer si la rémanence s'amplifie avec la respiration.",
          "Tension statique (3 min) : observer la rémanence post-tension.",
          "Note immédiate : durée estimée de la rémanence, richesse (faible/moyenne/riche), stabilité. Comparer à la note pré-séance."
        ],
        adaptations:[
          "Faire cette séance le soir après une journée de clarification alimentaire et le lendemain matin après une bonne nuit — comparer les deux rémanences.",
          "La rémanence est une mesure subjective mais très sensible aux variations de terrain."
        ],
        safety:"Aucun risque particulier. Si la rémanence est particulièrement faible, augmenter l'hydratation et patienter 24-48h avant de re-tester."
      },
      preprogrammedSession:{
        label:"Boussole terrain — observer la rémanence",
        context:"Séance de diagnostic : utiliser la qualité de la rémanence comme indicateur direct de l'état du terrain. À faire après une journée de clarification alimentaire.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"latéral", duree:20},
        respiration:{type:"carrée", mesure:5, duree:7},
        final:{type:"tension", duree:3},
        voix:false,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c044", number:32, order:44, unlockDays:1, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Électrolytes, sel complet et conductivité",
      subtitle:"La minéralisation comme fondation de la transmission intérieure",
      shortSummary:"Les électrolytes sont les porteurs de charge du système nerveux. Sans potassium, magnésium et sodium équilibrés, la transmission est altérée — et la pratique lumineuse avec elle.",
      summary:"La conductivité du terrain repose sur les électrolytes : potassium, magnésium, sodium, calcium. Ces ions chargés électriquement sont les porteurs de la transmission nerveuse. Un corps appauvri en électrolytes transmet moins bien — la rémanence est moins vive, les états méditatifs moins profonds. Ce cours explique le rôle de chaque électrolyte, les signes d'une carence, et l'importance du sel complet non raffiné comme source minérale complète.",
      tags:["électrolytes","sel","minéraux","conductivité","potassium","magnésium"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-043/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre le rôle des électrolytes dans la transmission nerveuse et la qualité de pratique, et identifier les sources alimentaires naturelles de chaque minéral clé.",
      initiaticObjective:"Comprendre que le corps ne peut pas transmettre ce qu'il n'a pas les moyens de conduire. La minéralisation n'est pas un luxe — c'est la fondation électrique de tout ce qui suit.",
      teaching:{
        intro:"Le Livre de l'Alimentation est précis : 'La véritable conductivité vient de l'ensemble : eau de qualité, potassium des légumes, magnésium alimentaire, sel complet. L'eau seule ne suffit pas toujours.' Les électrolytes sont les ions qui rendent l'eau conductrice. Sans eux, l'eau dans le corps est comme de l'eau distillée — propre mais non conductrice.",
        sections:[
          {
            title:"Potassium — l'ion de la transmission cellulaire",
            content:"Le potassium est l'électrolyte principal à l'intérieur des cellules. Il régule la charge électrique de la membrane cellulaire et est indispensable à la contraction musculaire et à la transmission nerveuse. Une carence en potassium produit : fatigue, crampes, faiblesse musculaire, arythmies, et une qualité de présence amoindrie pendant la pratique. Sources : légumes verts (épinards, blettes), pomme de terre douce, avocats, légumineuses, banane. La cuisson douce conserve mieux le potassium que la cuisson longue à haute température."
          },
          {
            title:"Magnésium — l'ion de la relaxation et de la plasticité cérébrale",
            content:"Le magnésium intervient dans plus de 300 réactions enzymatiques. Il régule la qualité du sommeil, la résistance au stress, la plasticité synaptique (mémorisation) et la relaxation musculaire. Un déficit chronique en magnésium — très fréquent dans les populations occidentales — produit : irritabilité, hyperréactivité au stress, sommeil fragmenté, crampes nocturnes, et une difficulté à atteindre l'état alpha pendant la pratique. Sources : graines de courge, amandes, légumineuses, céréales complètes, eau minéralisée en magnésium."
          },
          {
            title:"Sodium et sel complet — l'électrolyte mal compris",
            content:"Le sodium est l'électrolyte principal à l'extérieur des cellules. Il régule la pression osmotique et la conductivité du plasma. Son déficit, rare, produit une hyponatrémie dangereuse. Son excès sous forme de sel industriel raffiné — chlorure de sodium pur, vidé de ses oligoéléments — surcharge les reins et perturbe l'équilibre électrolytique. Le sel complet non raffiné — Guérande, Himalaya, mer de Bretagne — contient 60 à 80 minéraux traces qui équilibrent l'apport de sodium. C'est la différence entre un conducteur complet et un conducteur appauvri."
          },
          {
            title:"Calcium — l'ion de la densité et de la stabilité",
            content:"Le calcium intervient dans la minéralisation osseuse, la contraction musculaire et la transmission synaptique. Un déficit de calcium produit une hyperexcitabilité neuromusculaire (crampes, spasmes, fourmillements) et une instabilité dans les états méditatifs — le système nerveux ne peut pas rester 'posé'. Sources végétales de calcium : amandes, graines de sésame, chou kale, brocoli, tofu calcique, eaux minérales calciques."
          },
          {
            title:"Protocole électrolytique du matin — l'eau conductrice",
            content:"La première action électrolytique de la journée : 250 ml d'eau tiède + jus de citron + une pincée de sel complet + une pincée de bicarbonate si le terrain est trop acide. Ce mélange simple crée une eau légèrement minéralisée, conductrice, qui prépare le terrain en 20 minutes. C'est la base du protocole de terrain du matin — avant toute pratique, avant tout repas. Résultat observable : qualité de rémanence améliorée dans les 3 à 5 jours si pratiqué régulièrement."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Présentation des quatre électrolytes clés", content:"Potassium, magnésium, sodium (sel complet), calcium : rôles, carences, sources. Identification des signes de manque dans sa propre vie."},
        {time:"10–25 min", title:"Le sel complet vs sel industriel — une différence fondamentale", content:"Comparaison des profils minéraux. Lecture d'étiquettes. Protocole de l'eau conductrice du matin."},
        {time:"25–40 min", title:"Sources alimentaires naturelles — construire un apport électrolytique complet", content:"Tour des sources végétales par électrolyte. Construction d'un menu électrolytiquement complet."},
        {time:"40–55 min", title:"Pratique — Séance du matin après eau conductrice", content:"Séance préprogrammée après le protocole de l'eau conductrice."},
        {time:"55–60 min", title:"Carnet — noter la différence de conductivité", content:"Comparer la qualité de la séance faite après l'eau conductrice avec une séance ordinaire."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Mon corps est-il correctement minéralisé en ce moment ? Quels signes indiquent une carence électrolytique dans ma vie quotidienne ?",
        guidance:"Crampes nocturnes, irritabilité, fatigue sans cause, sommeil fragmenté, rémanence faible — chaque signe pointe vers un électrolyte. Observer sans alarme, avec curiosité."
      },
      practice:{
        name:"Séance après eau conductrice — activation de la conductivité du terrain",
        duration:"33 minutes",
        intention:"Observer l'effet du protocole électrolytique du matin sur la qualité de la rémanence et la fluidité du balancement.",
        material:"20 minutes avant la séance : 250 ml eau tiède + jus d'1/2 citron + pincée de sel complet.",
        posture:"Assis ou debout pour le balancement.",
        steps:[
          "Préparer l'eau conductrice 20 min avant la séance. Boire lentement, avec présence.",
          "Détente initiale (3 min) : respirations lentes. Observer la qualité de l'espace intérieur post-eau.",
          "Objet de contemplation (20 sec) : carré.",
          "Balancement vertical (20 min) : avant-arrière, amplitude modérée. Observer si la fluidité du mouvement est différente.",
          "Respiration rectangulaire (7 min) : inspiration 5s, rétention 5s, expiration 8s.",
          "Rotation gyroscopique (3 min) : amplification finale.",
          "Note : qualité de la rémanence, fluidité du balancement, état général. À comparer avec une séance sans préparation."
        ],
        adaptations:[
          "Sans citron : eau tiède seule avec sel complet suffit.",
          "Si sensible au sel : remplacer par eau de coco nature (riche en potassium) sans ajout de sel."
        ],
        safety:"Le sel complet est contre-indiqué en cas d'hypertension non contrôlée. Consulter un médecin avant toute modification du régime en sel si hypertension diagnostiquée."
      },
      preprogrammedSession:{
        label:"Conductivité électrolytique — eau du matin + balancement",
        context:"À pratiquer 20 min après l'eau conductrice (eau tiède + citron + sel complet). Observe l'effet de la minéralisation sur la fluidité de la pratique.",
        detente:3,
        objetContemplation:"carré",
        balancement:{type:"vertical", duree:20},
        respiration:{type:"rectangulaire", mesure:5, duree:7},
        final:{type:"rotation", duree:3},
        voix:true,
        cloche:true,
        tonalites:["LA","DO"]
      }
    },
    {
      id:"c045", number:33, order:45, unlockDays:9, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Jeûne juste et temps sans manger",
      subtitle:"Les fenêtres de clarification — le jeûne comme amplificateur de pratique",
      shortSummary:"Le jeûne n'est pas une privation — c'est une fenêtre. Pendant une fenêtre de jeûne, la pratique lumineuse est amplifiée : la rémanence est plus riche, les états méditatifs plus profonds.",
      summary:"La digestion est un feu. S'il brûle toute la journée, il occupe l'espace que d'autres fonctions pourraient utiliser : trier, réparer, recycler, clarifier. Une fenêtre de 12 à 16 heures sans nourriture donne au corps ce temps précieux — et à la pratique une qualité d'espace qu'aucun repas, même idéal, ne peut offrir. Ce cours explique le principe du jeûne juste, ses effets sur la pratique, et les précautions pour ne pas l'aborder comme une privation mais comme un outil.",
      tags:["jeûne","fenêtre","clarification","intermittent","pratique","amplification"],
      level:"Intermédiaire", duration:"1 h",
      image:"assets/courses/course-044/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre le mécanisme du jeûne intermittent, son effet sur la qualité de pratique, et savoir construire une fenêtre de jeûne adaptée à son rythme de vie.",
      initiaticObjective:"Comprendre que le jeûne n'est pas un orgueil de privation. Il est un sabbat du système. Il est une chambre où la matière cesse d'être sans cesse sollicitée pour que le centre puisse être mieux entendu.",
      teaching:{
        intro:"Le Temple Vivant l'énonce sans ambiguïté : 'Le vrai jeûne n'est pas seulement alimentaire. Il touche aussi la parole, les écrans, les excitations, les distractions et les réactions automatiques.' Le jeûne alimentaire est le plus concret et le plus mesurable — mais il s'inscrit dans une logique plus large de 'temps sans recevoir', de 'fenêtre où la matière se clarifie'.",
        sections:[
          {
            title:"Le mécanisme du jeûne — pourquoi cela clarifie",
            content:"Pendant la digestion, 20 à 30 % de l'énergie métabolique totale est mobilisée pour transformer, absorber et redistribuer les nutriments. Pendant le jeûne, cette énergie est redirigée vers la réparation cellulaire, l'autophagie (nettoyage des déchets cellulaires) et l'optimisation du système nerveux. L'autophagie, découverte par Yoshinori Ohsumi (Prix Nobel 2016), est un mécanisme de recyclage cellulaire qui ne s'active pleinement qu'après 12 à 16 heures de jeûne. C'est pendant cette fenêtre que le terrain se clarifie le plus profondément."
          },
          {
            title:"Jeûne et pratique lumineuse — effets directs",
            content:"Les pratiquants qui ont expérimenté des séances pendant une fenêtre de jeûne avancée (14h+) rapportent systématiquement : rémanence plus intense et plus durable, états méditatifs plus accessibles et plus profonds, balancement plus fluide et moins d'effort pour maintenir la régularité, rémanence colorée plus riche. L'explication est physiologique : un système digestif au repos libère l'énergie nerveuse vers le cortex. Le cerveau est plus disponible, l'attention plus stable, la rémanence plus vive."
          },
          {
            title:"La fenêtre de jeûne — comment la construire",
            content:"La forme la plus accessible est le jeûne intermittent 16/8 : 16 heures sans manger, 8 heures de fenêtre alimentaire. Exemple : dernier repas à 19h, premier repas le lendemain à 11h. La pratique du matin à 7h se déroule ainsi dans la fenêtre de jeûne la plus claire — après 12h de nuit + 1h de réveil. La règle : eau, eau citronnée, infusions autorisées pendant la fenêtre de jeûne. Pas de jus de fruit, pas de bouillon avec protéines — ils déclenchent la digestion."
          },
          {
            title:"Précautions — jeûner sans appauvrir le terrain",
            content:"Le jeûne clarifie, mais il n'enrichit pas en minéraux. Pendant la fenêtre de jeûne, l'eau conductrice (eau + citron + sel complet) est indispensable pour maintenir l'équilibre électrolytique. Sans minéraux, un jeûne prolongé peut produire des crampes, de l'irritabilité et une fatigue qui ne ressemble pas à la clarté attendue. La règle : jeûne sans minéraux n'est pas un outil — c'est un manque. Le vrai jeûne intègre toujours l'hydratation minérale."
          },
          {
            title:"Le jeûne comme pratique en soi — pas seulement comme préparation",
            content:"Au-delà de son effet sur la qualité des séances, le jeûne est lui-même une pratique. Il révèle l'état des compulsions alimentaires, la relation au plaisir et à la privation, la capacité de l'esprit à habiter le corps sans le nourrir. Un jeûne fait avec conscience — non comme ascèse punitive mais comme exploration — révèle des zones de l'être qui ne se montrent qu'en l'absence de la stimulation alimentaire. Cette dimension est aussi précieuse que les effets physiologiques."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Le mécanisme du jeûne — autophagie et clarification du terrain", content:"Explication simple de l'autophagie. Pourquoi 12-16h est la fenêtre clé. Les effets sur le cerveau et la pratique."},
        {time:"10–25 min", title:"Construire sa fenêtre de jeûne — pratique et personnalisation", content:"Différents modèles selon le mode de vie. Comment intégrer la pratique lumineuse dans la fenêtre de jeûne. Précautions électrolytiques."},
        {time:"25–40 min", title:"Jeûne et compulsions — ce que le jeûne révèle", content:"Discussion sur la dimension psychologique du jeûne. La différence entre faim physiologique et compulsion alimentaire. Le jeûne comme miroir."},
        {time:"40–55 min", title:"Pratique — Séance de jeûne avancé", content:"Séance préprogrammée à réaliser dans une fenêtre de jeûne de 14h+. La plus profonde de la série."},
        {time:"55–60 min", title:"Carnet — ma fenêtre de pratique idéale", content:"Identifier le créneau quotidien où une fenêtre de jeûne et une pratique de qualité peuvent se combiner."}
      ],
      contemplation:{
        duration:"7 minutes",
        question:"Qu'est-ce que j'attends de la nourriture, au-delà de la nutrition ? Qu'est-ce qui se passerait si ce besoin n'était plus comblé par l'alimentation ?",
        guidance:"Sans jugement ni ascétisme. Observer simplement ce que la pensée de 'ne pas manger pendant quelques heures de plus' produit dans l'espace mental. La résistance est une information. L'aisance aussi."
      },
      practice:{
        name:"Séance de jeûne avancé — amplification maximale",
        duration:"55 minutes",
        intention:"Pratiquer dans une fenêtre de jeûne de 14 heures ou plus et observer l'amplification de la rémanence et la profondeur des états méditatifs.",
        material:"Eau conductrice (eau tiède + citron + sel complet) bue 30 min avant. Aucun aliment depuis au moins 14h.",
        posture:"Assis ou debout, selon énergie disponible.",
        steps:[
          "S'assurer que la fenêtre de jeûne est d'au moins 14h. Boire l'eau conductrice 30 min avant.",
          "Détente initiale (5 min) : respirations profondes. Observer la qualité particulière du corps à jeun — légèreté, vigilance, disponibilité.",
          "Objet de contemplation (20 sec) : cercles — formes les plus propices aux rémanences profondes pendant le jeûne.",
          "Balancement vertical (30 min) : avant-arrière, amplitude modérée. Le jeûne amplifie la sensibilité au mouvement. Moins d'effort nécessaire pour maintenir la régularité.",
          "Respiration triangulaire (15 min) : inspiration 6s, rétention haute 6s, expiration 6s. La respiration triangulaire pendant le jeûne produit des états très stables.",
          "Rotation gyroscopique (5 min) : la rémanence finale sera significativement plus riche qu'en état de digestion.",
          "Observation post-séance : noter la qualité de la rémanence, la profondeur des états, la facilité d'accès à la contemplation. Comparer mentalement avec une séance post-repas."
        ],
        adaptations:[
          "Première fois à jeun : commencer par 12h de fenêtre seulement. Augmenter progressivement sur 2 semaines.",
          "Si des vertiges surviennent : boire un grand verre d'eau minérale et s'arrêter. La fenêtre de jeûne est peut-être trop longue ou le terrain trop carencé en électrolytes."
        ],
        safety:"Ne pas jeûner plus de 24h sans expérience préalable. Contre-indiqué pour les personnes diabétiques (surveillance glycémique nécessaire), femmes enceintes ou allaitantes, et en cas de sous-poids. Si faiblesse ou vertiges pendant la séance : arrêter et s'alimenter légèrement."
      },
      preprogrammedSession:{
        label:"Jeûne avancé — amplification maximale",
        context:"Séance à pratiquer dans une fenêtre de jeûne de 14h+, après eau conductrice. La plus profonde de la série terrain. Rémanence amplifiée.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{type:"vertical", duree:30},
        respiration:{type:"triangulaire", mesure:6, duree:15},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["FA"]
      }
    },
    {
      id:"c046", number:34, order:46, unlockDays:3, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Recettes de clarification avant pratique",
      subtitle:"La table comme antichambre du sanctuaire — préparer le milieu avant la séance",
      shortSummary:"Quelques recettes simples conçues pour préparer le terrain physique avant une séance : légères, réductrices, non fermentescibles, orientées rH2.",
      summary:"Les recettes du Livre de l'Alimentation sont des architectures de terrain : elles choisissent une porte d'élimination, une qualité minérale, une fraîcheur et une intention. Ce cours présente les recettes les plus directement utiles avant une séance — bouillon clair, eau citronnée, compote apaisante, soupe légère — et explique pourquoi leur timing et leur orientation rH2 importent autant que leurs ingrédients.",
      tags:["recettes","clarification","rH2","bouillon","terrain","timing"],
      level:"Fondation", duration:"1 h",
      image:"assets/courses/course-045/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Savoir préparer 4 recettes de clarification adaptées aux différentes situations (jeûne, reprise, soir avant séance) et comprendre leur action sur le terrain.",
      initiaticObjective:"Comprendre que la table peut être une antichambre du sanctuaire. Choisir une nourriture qui soutient le terrain est un acte de préparation — pas une contrainte.",
      teaching:{
        intro:"Le Livre de l'Alimentation est explicite : 'Une salade fraîchement préparée et un repas industriel ne donnent pas les mêmes signaux au terrain.' Ce cours ne transmet pas une idéologie alimentaire — il transmet des outils concrets : quelques recettes simples que l'on peut préparer en 10-20 minutes, qui orientent le terrain dans la bonne direction avant une pratique.",
        sections:[
          {
            title:"L'eau tiède citronnée — premier outil de terrain",
            content:"250 ml d'eau tiède + jus d'un demi-citron frais + pincée de sel complet non raffiné. À boire 20-30 minutes avant la séance du matin ou avant la séance du soir si la fenêtre de jeûne le permet. Action : alcalinise légèrement les tissus, fournit un électrolyte soluble (potassium du citron, sodium du sel), active doucement le foie et les reins, améliore la conductivité du terrain en 20-30 minutes. La fraîcheur est essentielle — le jus de citron en bouteille n'a pas le même rH2 que le citron pressé à l'instant."
          },
          {
            title:"Le bouillon clair de relance douce — émonctoire intestins",
            content:"Courgette, carotte, fenouil, huile d'olive, eau, sel complet non raffiné. Cuisson douce à 85°C maximum (jamais à ébullition pour préserver l'orientation réductrice). Ce bouillon prépare la séance du soir après une journée chargée : il apaise l'intestin, hydrate avec des minéraux végétaux et produit un état de légèreté digestive en 45-60 minutes. Règle : préparer et consommer immédiatement — chaque heure de conservation dégrade l'orientation rH2."
          },
          {
            title:"La compote pomme-poire — apaisement intestinal avant pratique",
            content:"Pomme, poire, cannelle, eau, citron. Cuisson très douce (15 min à 80°C). Sans sucre ajouté. La pectine des fruits calme l'intestin, la cannelle oriente vers le réducteur, le citron préserve l'orientation. À consommer 1h avant une séance si l'intestin est irrité ou agité. Elle crée un état de calme digestif qui facilite la concentration et la stabilité de la rémanence."
          },
          {
            title:"La soupe courgette-fenouil — préparation légère du soir",
            content:"Courgette, fenouil, pomme de terre, oignon doux, huile d'olive. Mixer finement pour une absorption rapide. Le fenouil apaise les ballonnements et soutient la digestion. La courgette hydrate et draine doucement les reins et la lymphe. À consommer 1h30 à 2h avant une séance du soir. Éviter d'y ajouter des protéines (tofu, légumineuses) si la séance est dans moins de 2h — les protéines ralentissent la digestion."
          },
          {
            title:"Règles de terrain pour toutes les recettes",
            content:"Quatre règles universelles s'appliquent à toutes les recettes de terrain : (1) Pas de friture, jamais. (2) Pas de sucre industriel ajouté. (3) Pas d'huiles rances ou réchauffées. (4) Sel complet non raffiné uniquement, en petite quantité. Ces règles ne réduisent pas la richesse des recettes — elles préservent leur orientation réductrice. Une recette qui respecte ces quatre règles soutient le terrain. Une recette qui en enfreint une ou plusieurs le charge."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Introduction — La table comme antichambre du sanctuaire", content:"Présentation de la philosophie : nourrir sans alourdir. Pourquoi le timing et l'orientation rH2 importent autant que les ingrédients."},
        {time:"10–30 min", title:"Présentation et préparation des 4 recettes de terrain", content:"Démonstration de l'eau citronnée, du bouillon clair, de la compote et de la soupe fenouil. Discussion sur leur timing avant séance."},
        {time:"30–45 min", title:"Construire son protocole alimentaire pré-séance", content:"Chaque participant construit son protocole personnel : quelle recette pour quelle situation (matin à jeun, soir après travail, nettoyage hebdomadaire)."},
        {time:"45–57 min", title:"Pratique — Séance 1h après soupe légère", content:"Séance préprogrammée à réaliser 1h30 après la soupe de terrain."},
        {time:"57–60 min", title:"Carnet — mon protocole pré-séance de référence", content:"Chaque participant note son protocole de référence : recette + timing + séance associée."}
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Si je préparais un repas dont l'unique intention est de clarifier la chambre pour la séance qui suivra — à quoi ressemblerait-il ? Quelles qualités chercherais-je à y mettre ?",
        guidance:"Fermer les yeux. Imaginer ce repas idéal — sa légèreté, sa fraîcheur, sa minéralité, sa simplicité. Cet imaginaire est déjà une orientation."
      },
      practice:{
        name:"Séance après soupe de terrain — clarification du soir",
        duration:"38 minutes",
        intention:"Pratiquer 1h30 après une soupe légère de terrain et observer la qualité de présence et de rémanence comparée à une séance post-repas lourd.",
        material:"Soupe préparée avec courgette + fenouil + huile d'olive, consommée 1h30 avant la séance.",
        posture:"Assis, dos droit.",
        steps:[
          "Préparer la soupe dans la journée. La consommer lentement, sans écran, avec présence.",
          "Attendre 1h30. Observer la légèreté digestive.",
          "Détente initiale (3 min) : respirations lentes. Intention : 'La table a préparé la chambre.'",
          "Objet de contemplation (20 sec) : arbre — forme organique propice à la contemplation du soir.",
          "Balancement latéral (20 min) : rythme stable. Observer la qualité du terrain préparé.",
          "Respiration carrée (12 min) : 5 secondes. Observer si l'espace mental est plus clair qu'après un repas standard.",
          "Tension statique (3 min) : relâchement total.",
          "Note : légèreté, clarté, qualité de rémanence. Était-ce différent d'une séance ordinaire ?"
        ],
        adaptations:[
          "Si le temps manque pour la soupe : l'eau citronnée 30 min avant suffit comme minimum de préparation.",
          "Adapter selon la saison : la soupe chaude en hiver, le bouillon froid ou la salade légère en été."
        ],
        safety:"Ne jamais pratiquer juste après un repas, même léger. Le minimum est 1h pour une soupe légère, 2h pour un repas normal."
      },
      preprogrammedSession:{
        label:"Clarification du soir — après soupe de terrain",
        context:"À pratiquer 1h30 après une soupe légère (courgette-fenouil ou bouillon clair). Séance douce orientée apaisement et intégration.",
        detente:3,
        objetContemplation:"arbre",
        balancement:{type:"latéral", duree:20},
        respiration:{type:"carrée", mesure:5, duree:12},
        final:{type:"tension", duree:3},
        voix:true,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c047", number:35, order:47, unlockDays:7, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Protocole terrain de sept jours",
      subtitle:"Une semaine pour transformer le milieu intérieur — séquencer les émonctoires",
      shortSummary:"Un protocole de 7 jours pour séquencer le soutien des émonctoires, clarifier le terrain et mesurer l'effet sur la qualité de pratique. Jour par jour, porte par porte.",
      summary:"Le protocole de 7 jours est une application concrète de l'ensemble de la série Terrain vivant. Chaque jour cible un émonctoire principal : intestins (j1-j2), reins (j3), foie (j4-j5), lymphe (j6), consolidation (j7). Chaque jour associe une intention alimentaire, une recette de terrain, une séance préprogrammée adaptée et une mesure de terrain. À la fin des 7 jours, le terrain est significativement plus conducteur — et la pratique lumineuse l'atteste.",
      tags:["protocole","7 jours","émonctoires","séquence","transformation","consolidation"],
      level:"Intermédiaire", duration:"1 h",
      image:"assets/courses/course-046/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre la logique séquentielle du protocole de 7 jours, savoir associer recettes, séances et intentions à chaque porte d'élimination.",
      initiaticObjective:"Comprendre que la transformation du terrain est un chemin, pas un acte. Sept jours de travail cohérent produisent une qualité de terrain — et une qualité de présence — que nulle séance isolée, aussi puissante soit-elle, ne peut produire seule.",
      teaching:{
        intro:"Le Livre de l'Alimentation propose un séquençage par phases : intestins, reins, foie, lymphe, rate-pancréas, cœur/circulation, anti-inflammation. Ce cours condense ces phases en un protocole de 7 jours accessible, adapté à la pratique de l'école, avec une séance préprogrammée spécifique pour chaque jour.",
        sections:[
          {
            title:"Jours 1-2 — Intestins : la première porte",
            content:"Les deux premiers jours posent la base : clarifier l'intestin pour que tout ce qui suit puisse s'éliminer correctement. Alimentation : légumes tendres, fibres solubles (compote, soupe légère), bouillons clairs, aucun sucre industriel ni farine raffinée. Pas de repas trop complexes. Recette : bouillon clair de relance douce (courgette-carotte-fenouil). Séance : balancement latéral 20 min + respiration carrée 10 min. Intention des jours 1-2 : 'Je clarifie la première porte. Ce que j'accepte d'éliminer ici, tout le reste du nettoyage devient possible.'"
          },
          {
            title:"Jour 3 — Reins : fluidité et lâcher",
            content:"Le troisième jour tourne vers les reins : hydratation intense, légumes aqueux (asperges, courgette, céleri), eau citronnée x3 dans la journée, potassium végétal. Pas d'alcool, pas de sel raffiné, pas de surcharge protéique. Recette : eau tiède citronnée au gingembre + soupe légère aux légumes aqueux. Séance : balancement vertical 25 min + respiration rectangulaire 10 min. Intention du jour 3 : 'Je lâche ce que je porte encore et qui n'est plus à moi.'"
          },
          {
            title:"Jours 4-5 — Foie : transformation et clarté",
            content:"Les jours 4 et 5 sont le cœur du protocole. Le foie est l'atelier central — il a besoin de 48h pour répondre à un soutien alimentaire. Alimentation : amers nobles (pissenlit, artichaut, radis noir en jus), betterave, curcuma, citron, crucifères, légumes verts. Pas d'alcool, pas de friture, pas de repas tardifs. Recette : velouté de lentilles corail + herbes fraîches, ou salade de betterave au cumin. Séance : balancement vertical 15 min + respiration rectangulaire 12 min (6s). Intention des jours 4-5 : 'Je transforme ce que je reçois au lieu de le subir.'"
          },
          {
            title:"Jour 6 — Lymphe : circulation lente",
            content:"Le sixième jour active la lymphe. La lymphe circule par le mouvement — pas seulement alimentaire. Ce jour exige de marcher (30 min minimum), de faire des balancements amples, d'éviter la sédentarité. Alimentation : légumes verts, herbes fraîches, eau minéralisée, limitation stricte du sucre industriel. Recette : bouillon d'herbes fraîches + salade verte crue. Séance : rotation gyroscopique 10 min + balancement latéral 20 min. Intention du jour 6 : 'Je remets en mouvement ce qui stagnait.'"
          },
          {
            title:"Jour 7 — Consolidation : intégration et mesure",
            content:"Le septième jour consolide les 6 jours de travail. Alimentation libre mais orientée terrain — pas de retour brutal aux excès. Une seule règle ce jour-là : nourrir sans surcharger. Recette : riz semi-complet aux légumes fondants + herbes fraîches. Séance de consolidation : la plus complète — balancement rotation 30 min + respiration triangulaire 15 min + rotation gyroscopique 5 min. Mesurer la rémanence ce jour-là et la comparer au jour 1. C'est la mesure la plus honnête du protocole."
          }
        ]
      },
      minutePlan:[
        {time:"0–10 min", title:"Logique du protocole — pourquoi séquencer les émonctoires", content:"Expliquer pourquoi l'ordre intestins → reins → foie → lymphe est la séquence la plus efficace. L'intestin d'abord, pour que le foie ait une porte de sortie."},
        {time:"10–30 min", title:"Jour par jour — alimentation, recette et séance", content:"Parcours complet des 7 jours. Pour chaque jour : l'aliment phare, la recette, la séance préprogrammée et l'intention du jour."},
        {time:"30–45 min", title:"Mesurer avant et après — la rémanence comme boussole", content:"Comment utiliser la qualité de rémanence du jour 1 et du jour 7 comme mesure de l'effet du protocole. Discussion sur d'autres indicateurs : qualité du sommeil, état mental, énergie."},
        {time:"45–57 min", title:"Pratique — Séance de consolidation du jour 7", content:"La séance de consolidation : la plus complète, la plus profonde. Observer la rémanence après 7 jours de terrain clarifié."},
        {time:"57–60 min", title:"Carnet — après le protocole, que faire ?", content:"Comment maintenir les acquis après les 7 jours. Le protocole comme outil trimestriel, non comme régime permanent."}
      ],
      contemplation:{
        duration:"7 minutes",
        question:"Si je prenais 7 jours pour préparer le temple — que se passerait-il dans ma pratique à la fin de ces 7 jours ? Qu'est-ce que je porterais différemment dans la séance du 7ème jour ?",
        guidance:"Imaginer concrètement la séance du jour 7 — son espace, sa qualité, la rémanence. Cette visualisation est déjà une intention de transformation."
      },
      practice:{
        name:"Séance de consolidation — jour 7 du protocole",
        duration:"55 minutes",
        intention:"Pratiquer la séance la plus complète après 6 jours de clarification du terrain, et mesurer la rémanence comme indicateur de l'efficacité du protocole.",
        material:"Septième jour du protocole : terrain clarifié. Eau conductrice 30 min avant. Aucun repas depuis au moins 14h (jeûne du matin de préférence).",
        posture:"Assis ou debout pour le balancement.",
        steps:[
          "Eau conductrice (30 min avant) : eau tiède + citron + sel complet.",
          "Détente initiale (5 min) : respirations lentes. Rappeler mentalement le chemin des 6 jours. Intention : 'Le terrain est préparé. La chambre est prête.'",
          "Objet de contemplation (20 sec) : cercles — pour la rémanence la plus riche.",
          "Balancement en rotation douce (30 min) : la forme la plus profonde. Le terrain clarifié amplifie l'effet. Observer la qualité de la rémanence à chaque moment.",
          "Respiration triangulaire (15 min) : 6 secondes par temps. Observer la profondeur des états méditatifs accessibles après 6 jours de terrain travaillé.",
          "Rotation gyroscopique (5 min) : amplification finale maximale.",
          "Note dans le carnet : qualité de rémanence (noter de 1 à 10), profondeur des états, comparaison avec le jour 1. Ce bilan est la mesure du protocole."
        ],
        adaptations:[
          "Si le protocole de 7 jours n'a pas été suivi entièrement : faire la séance de consolidation quand même, et noter honnêtement les différences avec les jours de terrain moins préparé.",
          "Répéter ce protocole tous les 3 mois comme entretien du temple."
        ],
        safety:"Après 7 jours d'alimentation très légère, ne pas pratiquer cette séance en état de fatigue réelle. Si le corps demande à se nourrir, prendre un repas léger, attendre 2h, et pratiquer ensuite."
      },
      preprogrammedSession:{
        label:"Consolidation jour 7 — terrain clarifié",
        context:"La séance la plus complète du protocole. À pratiquer le 7ème jour du protocole terrain, de préférence à jeun le matin. Mesurer la rémanence et comparer au jour 1.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{type:"rotation", duree:30},
        respiration:{type:"triangulaire", mesure:6, duree:15},
        final:{type:"rotation", duree:5},
        voix:false,
        cloche:true,
        tonalites:["FA"]
      }
    },

    // ── SOLEIL / LUMIÈRE (36-43) ───────────────────────────
    {
      id:"c048", number:36, order:48, unlockDays:3, symbol:"☉",
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
      id:"c049", number:37, order:49, unlockDays:3, symbol:"☉",
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
      id:"c050", number:38, order:50, unlockDays:3, symbol:"☉",
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
      id:"c051", number:39, order:51, unlockDays:3, symbol:"☉",
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
      id:"c052", number:40, order:52, unlockDays:3, symbol:"☉",
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
      id:"c053", number:41, order:53, unlockDays:3, symbol:"☉",
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
      id:"c054", number:42, order:54, unlockDays:3, symbol:"☉",
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
      id:"c055", number:43, order:55, unlockDays:3, symbol:"☉",
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
      id:"c056", number:44, order:56, unlockDays:3, symbol:"φ",
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
      id:"c057", number:45, order:57, unlockDays:3, symbol:"φ",
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
      id:"c058", number:46, order:58, unlockDays:3, symbol:"φ",
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
      id:"c059", number:47, order:59, unlockDays:3, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Le seuil du sommeil — portes de la conscience",
      subtitle:"Comprendre les états hypnagogiques et leur rôle dans le dédoublement",
      summary:"Les expériences au seuil du sommeil sont la première porte vers la sortie de corps : vibrations, bourdonnements, images hypnagogiques, paralysie. Apprendre à reconnaître ces signes et à les cultiver.",
      tags:["hypnagogique","dédoublement","seuil","rémanences lumineuses"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Reconnaître les signes précurseurs d'un état propice au dédoublement.",
      initiaticObjective:"Ouvrir consciemment la porte du seuil plutôt que de la subir.",
      essentialPhrase:"Le corps s'endort, la conscience veille — c'est la définition même du dédoublement.",
      teaching:{
        intro:"Les archives de la tradition initiatique documentent des milliers d'expériences sur plusieurs décennies. Toutes commencent au même endroit : le seuil du sommeil, cet instant précis où le corps abandonne la veille sans que la conscience suive.",
        sections:[
          { title:"Le seuil : zone de transition", content:"Entre 0 % et 100 % de sommeil, il existe une zone de chevauchement où les deux états coexistent. C'est dans cette zone que les rémanences lumineuses surgissent, que les sons intérieurs apparaissent, que le corps semble vibrer ou flotter. Cette tradition nomme cette zone 'le seuil'. Elle est à la fois le laboratoire naturel des expériences mystiques et le terrain d'entraînement des pratiques initiatiques." },
          { title:"Signes annonciateurs du dédoublement", content:"Bourdonnements croissants dans les oreilles. Sensation d'électricité parcourant les membres. Impression de légèreté ou d'absence de poids. Paralysie douce accompagnée d'images lumineuses. Flashes lumineux colorés sur fond noir. Ces signes ne sont pas aléatoires : ils sont les manifestations du LCR (liquide céphalorachidien) sous pression amplifiée, activé par la pratique régulière des balancements et des tensions statiques." },
          { title:"L'erreur classique : s'endormir ou résister", content:"La plupart des pratiquants font l'une de ces deux erreurs : soit ils s'endorment complètement (perte de conscience), soit ils résistent à la paralysie par peur et se réveillent brusquement. La voie médiane consiste à maintenir un fil ténu de conscience observatrice — comme une flamme protégée du vent. Le balancement entretenu pendant 20 à 30 minutes crée les conditions idéales pour atteindre ce seuil sans tomber dans le sommeil." },
          { title:"Le corps éthérique — une réalité fonctionnelle", content:"La tradition initiatique ne théorise pas le corps éthérique comme une entité métaphysique abstraite. Elle l'observe comme un phénomène fonctionnel : une organisation de l'énergie vitale qui peut temporairement se désolidariser du corps physique sous certaines conditions. Ces conditions sont précisément celles que l'École du Temple Vivant cultive : terrain clarifié, respiration consciente, balancement régulier, tensions statiques." },
          { title:"Protocole d'approche du seuil", content:"Phase 1 (10 min) : balancement latéral doux, mantra ILLI, yeux mi-clos. Phase 2 (10 min) : ralentissement progressif du balancement jusqu'à l'immobilité, maintien de l'intention de 'rester conscient'. Phase 3 (indéterminée) : observation passive des phénomènes — sons, lumières, sensations. Ne pas chercher à provoquer, ni à retenir. Laisser venir." }
        ]
      },
      minutePlan:[
        { time:"0–5 min", title:"Installation et ancrage", content:"Posture allongée ou assise stable. Intention clairement posée : 'Je vais observer le seuil consciemment.'" },
        { time:"5–25 min", title:"Balancement d'approche", content:"Balancement latéral doux mantra ILLI. Observer les premières sensations de légèreté ou de vibration." },
        { time:"25–40 min", title:"Ralentissement et seuil", content:"Ralentir progressivement jusqu'à l'immobilité. Maintenir la conscience comme une flamme douce." },
        { time:"40–55 min", title:"Observation passive", content:"Accueillir les rémanences lumineuses, sons, sensations. Ne pas intervenir. Simplement noter mentalement." },
        { time:"55–60 min", title:"Retour et carnet", content:"Retour à la conscience ordinaire. Écrire immédiatement les perceptions dans le carnet." }
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Qu'est-ce qui observe quand le corps s'endort ?",
        guidance:"Fermez les yeux et demandez-vous : qui est ce 'je' qui peut encore observer quand le corps commence à partir dans le sommeil ? Cette question, tenue doucement sans chercher de réponse intellectuelle, est déjà une pratique de dédoublement."
      },
      practice:{
        name:"Veille consciente au seuil",
        duration:"40 minutes",
        intention:"Atteindre le seuil hypnagogique en restant conscient.",
        posture:"Allongé sur le dos, bras légèrement écartés, jambes non croisées.",
        steps:[
          "Posez l'intention : 'Je reste conscient pendant que le corps s'endort.'",
          "Démarrez un balancement latéral doux (ILLI) pendant 20 minutes.",
          "Ralentissez progressivement sur 5 minutes jusqu'à l'immobilité totale.",
          "Observez les phénomènes sans réagir : sons, lumières, sensations.",
          "Si vous sentez une vibration ou une légèreté soudaine — restez calme, ne forcez pas.",
          "Après 15 minutes d'observation, retournez doucement à la conscience éveillée.",
          "Notez immédiatement dans votre carnet : date, heure, sensations, images."
        ],
        adaptations:["Si endormissement fréquent : pratiquer assis. Si résistance par peur : commencer par 10 minutes seulement."],
        safety:"Ne pas pratiquer dans un état de grande fatigue ou de stress intense. Le seuil doit être approché avec calme et sans attente."
      },
      journalQuestions:[
        "Avez-vous déjà eu une expérience spontanée au seuil du sommeil ? Décrivez.",
        "Quelle est la différence pour vous entre s'endormir et observer le seuil ?",
        "Avez-vous ressenti une vibration, un bourdonnement ou une légèreté lors de l'exercice ?"
      ],
      validation:[
        "Je peux décrire 3 signes précurseurs du dédoublement",
        "J'ai maintenu la conscience au seuil pendant au moins 5 minutes",
        "J'ai noté une expérience hypnagogique dans mon carnet"
      ],
      references:["Expériences initiatiques — Archives de la tradition, Vol. I", "L'oscillation pendulaire — Pratiques initiatiques"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Approche du seuil — balancement d'induction",
        context:"Le soir, avant de s'endormir. Corps allongé. Intention posée. Laisser le balancement conduire vers le seuil.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{ type:"latéral", duree:25 },
        respiration:{ type:"rectangulaire", mesure:5, duree:8 },
        final:{ type:"tension", duree:3 },
        voix:false,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c060", number:48, order:60, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Les tensions statiques — principe et mécanisme",
      subtitle:"Comment la contraction isométrique amplifie le LCR et ouvre les portes",
      summary:"La tension statique est la contraction simultanée de muscles antagonistes créant une pression isométrique sans mouvement. Elle amplifie le flux du liquide céphalorachidien, génère des rémanences lumineuses intenses et prépare les conditions du dédoublement.",
      tags:["tensions statiques","LCR","isométrique","rémanences lumineuses"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Comprendre le mécanisme physiologique des tensions statiques.",
      initiaticObjective:"Utiliser la tension isométrique comme outil d'amplification de la conscience.",
      essentialPhrase:"La tension statique n'immobilise pas le corps — elle mobilise la conscience.",
      teaching:{
        intro:"Parmi toutes les techniques de la méthode initiatique, les tensions statiques occupent une place particulière : elles sont directement accessibles, ne nécessitent aucun matériel, peuvent être pratiquées n'importe où, et produisent des effets mesurables dès les premières séances.",
        sections:[
          { title:"Définition de la tension statique", content:"Une tension statique est une contraction simultanée et équilibrée de deux groupes de muscles antagonistes (fléchisseurs et extenseurs) autour d'une articulation. Le résultat : une pression interne sans mouvement visible. Ce type de contraction isométrique est différent de l'effort musculaire ordinaire — il agit directement sur le flux du LCR dans la colonne vertébrale et la boîte crânienne." },
          { title:"Le LCR comme vecteur de conscience", content:"Le liquide céphalorachidien (LCR) baigne le cerveau et la moelle épinière. Il a un rythme d'oscillation naturel (8 à 12 cycles par minute chez l'adulte sain). La tension statique crée une pression sur ce système hydraulique fermé. Cette pression amplifie les rémanences lumineuses, intensifie les perceptions intérieures et crée les conditions neurophysiologiques propices aux états modifiés de conscience — dont le dédoublement." },
          { title:"Les 7 points de tension de la méthode", content:"La méthode initiatique a identifié 7 points majeurs de tension le long de l'axe corporel : 1. Les orteils (contre résistance). 2. Les genoux (fléchisseurs contre extenseurs). 3. Les hanches (adducteurs contre abducteurs). 4. L'abdomen (contraction interne). 5. La poitrine (tension des pectoraux contre les dorsaux). 6. Les épaules (omoplates vers le centre). 7. Le crâne (mâchoires et nuque en légère tension). Chaque point correspond à un plexus nerveux et à une zone de LCR particulière." },
          { title:"Durée et intensité — les erreurs à éviter", content:"La tension doit être légère (environ 20-30 % du maximum possible), maintenue entre 10 et 60 secondes, et relâchée progressivement. L'erreur la plus fréquente : tendre trop fort (cela crée de la douleur et bloque la circulation) ou relâcher brusquement (on perd le bénéfice de la phase de dissipation). La phase de relâchement — où la chaleur et les phosphènes se diffusent — est aussi importante que la tension elle-même." },
          { title:"Séquence de base : 3 tensions en série", content:"Pour débuter : 1. Tension aux genoux (fléchisseurs contre extenseurs) pendant 30 secondes. 2. Relâchement progressif + observation 30 secondes. 3. Tension aux épaules (omoplates vers le centre) pendant 30 secondes. 4. Relâchement + observation 30 secondes. 5. Tension du crâne (légère pression mâchoires et nuque) pendant 20 secondes. 6. Relâchement + observation 1 minute. Total : 10 minutes. Observer les rémanences lumineuses pendant les phases de relâchement." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Théorie et installation", content:"Comprendre le mécanisme LCR. Posture assise stable. Observer le souffle naturel." },
        { time:"10–25 min", title:"Première série — 3 points", content:"Tension genoux → épaules → crâne. Observer les phosphènes entre chaque." },
        { time:"25–40 min", title:"Deuxième série — 7 points complets", content:"Séquence complète des 7 points. Durée 20 secondes par point. Relâchement attentif." },
        { time:"40–50 min", title:"Intégration avec balancement", content:"Balancement latéral léger après les tensions pour fluidifier le LCR activé." },
        { time:"50–60 min", title:"Contemplation et carnet", content:"Observer les images résiduelles. Écrire les perceptions dans le carnet." }
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Où se situe la frontière entre effort et lâcher-prise dans la tension statique ?",
        guidance:"Appliquez une légère tension aux épaules. Ni trop forte ni trop faible. Cherchez le point d'équilibre où la tension devient presque confortable — comme une plénitude interne plutôt qu'un effort. C'est là que le LCR commence à répondre."
      },
      practice:{
        name:"Séquence complète des 7 tensions",
        duration:"25 minutes",
        intention:"Activer le LCR par tensions progressives et observer les rémanences lumineuses.",
        posture:"Assis sur une chaise, dos droit, pieds à plat.",
        steps:[
          "Orteils : pliez les orteils contre le sol en tirant aussi vers le haut — 20 sec. Relâchez. Observez.",
          "Genoux : pressez les jambes l'une contre l'autre tout en les écartant simultanément — 30 sec. Relâchez.",
          "Hanches : contractez les fessiers et adducteurs ensemble — 30 sec. Relâchez. Sentez la chaleur.",
          "Abdomen : rentrez légèrement le ventre et poussez en même temps — 20 sec. Relâchez.",
          "Poitrine : poussez les paumes l'une contre l'autre (ou contre les cuisses) — 30 sec. Relâchez.",
          "Épaules : tirez les omoplates vers le centre du dos — 30 sec. Relâchez. Observer la nuque.",
          "Crâne : légère tension de la mâchoire et de la nuque ensemble — 20 sec. Relâchez complètement.",
          "Phase finale : 3 minutes d'immobilité totale, observation des rémanences lumineuses et sensations."
        ],
        adaptations:["Blessure articulaire : sauter le point correspondant", "Difficultés de concentration : réduire à 3 tensions au lieu de 7"],
        safety:"Ne jamais forcer au point de douleur. Les tensions doivent être légères. Personnes souffrant d'hypertension : consulter un médecin avant de pratiquer."
      },
      journalQuestions:[
        "Avez-vous perçu des phosphènes pendant ou après les tensions ? Décrivez-les.",
        "Quel point de tension a produit l'effet le plus intense pour vous ?",
        "Avez-vous ressenti une sensation particulière au moment du relâchement ?"
      ],
      validation:[
        "Je peux pratiquer les 7 tensions dans l'ordre correct",
        "J'ai observé des phosphènes pendant au moins une phase de relâchement",
        "Je connais la différence entre tension trop forte et tension juste"
      ],
      references:["Les Tensions Statiques — Méthode du Temple Vivant", "Expériences initiatiques — Archives de la tradition"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Activation LCR — tensions et balancement",
        context:"Séquence tensions statiques 7 points, suivie d'un balancement pour fluidifier et amplifier.",
        detente:3,
        objetContemplation:"carré",
        balancement:{ type:"vertical", duree:20 },
        respiration:{ type:"rectangulaire", mesure:6, duree:10 },
        final:{ type:"tension", duree:5 },
        voix:false,
        cloche:true,
        tonalites:["LA","DO"]
      }
    },
    {
      id:"c061", number:49, order:61, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Le dédoublement — anatomie d'une expérience",
      subtitle:"Décrire, comprendre et situer la sortie de corps dans l'enseignement initiatique",
      summary:"Qu'est-ce qu'un dédoublement ? La tradition initiatique distingue clairement l'expérience authentique des fantasmes et des erreurs d'interprétation. Ce cours donne les critères de reconnaissance, les conditions de déclenchement et le cadre initiatique de l'expérience.",
      tags:["dédoublement","corps astral","expérience","critères"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Définir avec précision ce qu'est un dédoublement selon la tradition initiatique.",
      initiaticObjective:"Situer l'expérience du dédoublement dans un cadre d'intégration spirituelle.",
      essentialPhrase:"Le dédoublement n'est pas une fuite du corps — c'est la découverte de ce que l'on est au-delà du corps.",
      teaching:{
        intro:"Les archives initiatiques rapportent des centaines de dédoublements vécus par des élèves de nombreuses générations. Ces témoignages ne sont pas des 'histoires extraordinaires' destinées à susciter l'émerveillement : ce sont des observations rigoureuses de chercheurs qui ont consacré leur vie à comprendre les mécanismes de la conscience.",
        sections:[
          { title:"Définition opératoire du dédoublement", content:"Un dédoublement est l'expérience de percevoir, depuis un point d'observation distinct du corps physique, la réalité environnante ou une réalité intérieure. Le corps reste visible et perçu comme 'ailleurs'. La conscience est localisée dans un autre corps — que les traditions nomment éthérique, astral ou de lumière. La tradition évite les termes métaphysiques superflus : le dédoublement est un phénomène reproductible, entraînable, et objectivement constatable." },
          { title:"Les trois types d'expériences au seuil", content:"1. Dédoublement partiel : sensation de flotter légèrement au-dessus du corps, vue du corps depuis une hauteur légèrement supérieure. 2. Dédoublement complet : déplacement dans l'espace ordinaire, possibilité de voir des objets ou des personnes impossibles à percevoir depuis la position physique. 3. Dédoublement intérieur : voyage dans des espaces de lumière ou des dimensions non physiques. Ces trois types nécessitent des niveaux de préparation différents." },
          { title:"Conditions nécessaires", content:"L'enseignement est formel : les dédoublements ne se produisent pas par hasard ou par chance. Ils requièrent un terrain neurobiologique préparé (LCR activé, cerveau synchronisé), un état de conscience particulier (seuil hypnagogique stable), et une absence de peur. La peur est le principal obstacle : elle provoque une brusque contraction qui ramène instantanément dans le corps. Les balancements réguliers et les tensions statiques sont les préparations les plus efficaces." },
          { title:"Elian — un cas exemplaire des Expériences Initiatiques", content:"Les témoignages initiatiques décrivent l'évolution de Elian, un élève qui passe par toutes les étapes : premières rémanences lumineuses, balancements profonds, tensions statiques, approche du seuil, et enfin dédoublements répétés. Son parcours est un modèle pédagogique : il montre que le dédoublement n'est pas un don rare mais le résultat d'une pratique cohérente et patiente." },
          { title:"Intégration et prudence", content:"L'expérience du dédoublement doit s'intégrer dans la vie quotidienne sans créer de clivage. L'enseignement insiste : un élève qui recherche le dédoublement pour 'fuir' la réalité ordinaire s'égare. Le dédoublement authentique amplifie la présence dans le corps — il ne crée pas de dissociation. La protection vient naturellement de la qualité de l'intention et de la pureté du terrain intérieur." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Étude de témoignages initiatiques", content:"Lecture ou écoute de deux témoignages de dédoublement issus des archives de la tradition." },
        { time:"10–25 min", title:"Clarification conceptuelle", content:"Distinguer les 3 types de dédoublement. Identifier ses propres expériences similaires." },
        { time:"25–45 min", title:"Pratique préparatoire", content:"Tensions statiques 7 points + balancement lent. Observer le seuil." },
        { time:"45–55 min", title:"Contemplation", content:"Question : qu'est-ce qui perçoit ? Observer la conscience de la conscience." },
        { time:"55–60 min", title:"Carnet", content:"Décrire toute expérience de seuil vécue pendant la séance." }
      ],
      contemplation:{
        duration:"10 minutes",
        question:"Qui observe le corps en train de s'endormir ?",
        guidance:"Allongez-vous. Laissez le corps se détendre progressivement. Observez les pensées comme des nuages. Posez la question : 'Qui est en train d'observer tout cela ?' Ne cherchez pas de réponse intellectuelle. Restez dans la question."
      },
      practice:{
        name:"Protocole tensions + seuil conscient",
        duration:"30 minutes",
        intention:"Atteindre le seuil hypnagogique après activation LCR par tensions statiques.",
        posture:"Allongé sur le dos. Éventuellement bandeau sur les yeux pour réduire les distractions.",
        steps:[
          "5 minutes de respiration rectangulaire 5 sec (5-5-5-5) pour synchroniser.",
          "Tensions statiques aux 7 points (séquence courte — 10-15 sec par point).",
          "Relâchement total et balancement très lent (rotation) pendant 15 minutes.",
          "Immobilité progressive. Maintenir un fil de conscience observatrice.",
          "Observer sans intervenir. Accueillir toute sensation, image, son.",
          "Retour doux. Carnet immédiat."
        ],
        adaptations:["Version assise pour les pratiquants qui s'endorment facilement allongés"],
        safety:"Si expérience intense (vibrations très fortes, sortie involontaire) : rester calme, respirer profondément, l'expérience se résorbe naturellement."
      },
      journalQuestions:[
        "Avez-vous déjà eu une expérience que vous identifieriez maintenant comme un début de dédoublement ?",
        "Quelle est votre réaction émotionnelle à l'idée du dédoublement : curiosité, peur, scepticisme ?",
        "Quel type de dédoublement (partiel, complet, intérieur) vous semble le plus proche ?"
      ],
      validation:[
        "Je peux définir les 3 types de dédoublement selon la tradition initiatique",
        "J'ai identifié les conditions nécessaires au dédoublement",
        "J'ai maintenu une conscience observatrice au seuil pendant la pratique"
      ],
      references:["Expériences initiatiques — Archives de la tradition, Vol. I, II, III", "Parcours initiatique de Elian — Vol. I et II"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Seuil du dédoublement — tensions + rotation",
        context:"Séance du soir. Corps allongé. Tensions statiques courtes puis rotation lente vers le seuil.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{ type:"rotation", duree:25 },
        respiration:{ type:"rectangulaire", mesure:5, duree:10 },
        final:{ type:"tension", duree:5 },
        voix:false,
        cloche:true,
        tonalites:["FA"]
      }
    },
    {
      id:"c062", number:50, order:62, unlockDays:4, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Le rythme phi — cadence naturelle et nombre d'or",
      subtitle:"Comprendre pourquoi le vivant pulse selon le rapport 1,618",
      summary:"Le nombre d'or n'est pas une abstraction mathématique : il est le rythme du vivant. Respiration, battement cardiaque, croissance cellulaire — tout pulse selon φ.",
      tags:["phi","nombre d'or","rythme","biologie","spirale"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-062/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Percevoir le rythme φ dans son propre corps et l'intégrer comme cadence de pratique.",
      initiaticObjective:"S'accorder à la pulsation universelle — faire de son souffle et de son pas un reflet du rythme cosmique.",
      plan:[
        "Le nombre d'or dans la nature et le corps humain",
        "φ et le battement cardiaque : cohérence cardiaque et ratio 1,618",
        "Respiration en rythme phi : 5 temps inspir / 8 temps expir",
        "Le pas initiatique : marcher en cadence fibonacci",
        "Exercice : séquencer sa journée selon les proportions d'or",
        "Observation : journal du rythme intérieur"
      ],
      teaching:{
        intro:"Le rapport φ = 1,618... est omniprésent dans le vivant — spirales de coquillages, disposition des graines dans le tournesol, proportions du corps humain. Ce n'est pas une coïncidence : φ est le rapport d'expansion le plus économique en énergie, celui que la nature a sélectionné depuis des millions d'années.",
        sections:[
          {title:"φ dans le corps humain",content:"La longueur du bras divisée par la distance épaule-coude donne φ. La distance ombilico-tête / taille totale donne φ. Le visage, la main, les phalanges : partout le même rapport. L'initié reconnaît en son propre corps le reflet du grand ordonnancement."},
          {title:"φ dans la respiration",content:"Une respiration en rythme phi s'inspire sur 5 temps et s'expire sur 8 temps (8/5 = 1,6). Ou inspir 3 temps, retenue 2 temps, expir 5 temps. Cette cadence produit naturellement un état de cohérence — le corps s'y reconnaît."},
          {title:"φ et la marche initiatique",content:"Marcher 3 pas, pause 2 temps, 5 pas, pause 3 temps : la marche fibonacci. Dans les anciennes traditions de pèlerinage, le pas était rythmé pour induire un état modifié de conscience. La récurrence du rythme phi dans le pas crée une résonance avec la structure même du vivant."},
          {title:"Séquencer sa journée",content:"Répartir sa journée selon les proportions d'or : si l'on a 8 heures de travail actif, 5 heures de pratique contemplative et 3 heures de silence. Ou appliquer φ à la durée des séances : 20 min, 12 min, 7 min. L'initié ne subit plus le temps — il le sculpte."}
        ]
      },
      practice:{
        name:"Respiration phi — 5/8",
        duration:"20 minutes",
        intention:"S'accorder au rythme universel du vivant",
        steps:[
          "Assieds-toi dans ta posture habituelle, colonne droite.",
          "Pose une main sur le cœur, l'autre sur le ventre.",
          "Inspire sur 5 temps lents (compte intérieur).",
          "Expire sur 8 temps lents.",
          "Maintiens cette cadence pendant 10 minutes sans forcer.",
          "Observe : le souffle devient fluide, régulier, presque automatique.",
          "Pendant les 10 dernières minutes, laisse le rythme se moduler librement tout en gardant le ratio phi en arrière-plan.",
          "Note dans ton carnet : quelle sensation corporelle s'installe après cette respiration ?"
        ]
      },
      journalQuestions:[
        "Où perçois-tu le rythme phi dans ta vie quotidienne ?",
        "Qu'est-ce qui change dans ton corps quand tu respires en cadence 5/8 ?",
        "Quel rapport as-tu au temps — le subis-tu ou le crées-tu ?"
      ],
      essentialPhrase:"Le vivant ne connaît pas le hasard. Il connaît φ."
    },
    {
      id:"c063", number:51, order:63, unlockDays:4, symbol:"φ",
      familyId:"rythmes", familyTitle:"Rythmes, nombre d'or & fractales",
      title:"Fractales et auto-similarité — le vivant se répète à toutes les échelles",
      subtitle:"Reconnaître l'infini dans le fini : la même structure du microcosme au macrocosme",
      summary:"La côte de Bretagne ressemble à une feuille de fougère. La fougère ressemble à un neurone. Le neurone ressemble à une galaxie. L'auto-similarité est la signature du vivant intelligent.",
      tags:["fractales","auto-similarité","macrocosme","microcosme","infini"],
      level:"Approfondissement", duration:"1 h",
      image:"assets/courses/course-063/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Comprendre le principe fractal et l'appliquer à l'observation de soi et du monde.",
      initiaticObjective:"Percevoir que l'initié est lui-même une fractale du cosmos — que ce qu'il transforme en lui transforme l'ensemble.",
      plan:[
        "Qu'est-ce qu'une fractale ? Définition et exemples vivants",
        "L'auto-similarité dans le corps : vaisseaux, poumons, neurones",
        "Microcosme et macrocosme : la formule hermétique illustrée",
        "Fractales et conscience : le cerveau pense en réseaux fractals",
        "Exercice contemplatif : méditer sur une image fractale",
        "Application initiatique : si je change une chose en moi, qu'est-ce qui change à l'extérieur ?"
      ],
      teaching:{
        intro:"Une fractale est une structure dont chaque partie ressemble à l'ensemble. La nature en est saturée : la forme d'un poumon vue en entier ressemble à une branche individuelle. La branche ressemble à un alvéole. L'alvéole ressemble à la molécule d'oxygène en transit. Ce n'est pas un hasard — c'est l'économie du vivant.",
        sections:[
          {title:"L'auto-similarité dans le corps",content:"Vaisseaux sanguins, arbre bronchique, réseau neuronal, structure rénale : le corps humain est une cascade de fractales emboîtées. Chaque niveau d'organisation obéit à la même règle — subdiviser pour maximiser la surface d'échange. Le vivant compresse l'infini dans le fini."},
          {title:"Microcosme et macrocosme",content:"'Ce qui est en haut est comme ce qui est en bas' — la tradition hermétique n'est pas une métaphore. La structure d'un réseau de neurones photographié au microscope électronique est visuellement indiscernable d'une cartographie des filaments de la grande structure cosmique. L'initié qui se transforme modifie réellement quelque chose dans le réseau."},
          {title:"Fractales et conscience",content:"Le cerveau traite l'information de façon fractale : les ondes cérébrales emboîtent les unes dans les autres (delta dans thêta dans alpha dans bêta). Un état de méditation profonde correspond à une synchronisation fractale de ces niveaux. L'expérience intérieure de 'l'infini dans le fini' est une perception directe de cette structure."},
          {title:"Contemplation fractale",content:"Fixer une image fractale pendant 15 à 20 minutes — une spirale de Mandelbrot, une fougère, un flocon de Koch — produit un état particulier de conscience. L'œil se perd dans la répétition infinie. Le mental lâche prise. Une forme de rémanence intérieure s'installe : la structure se grave dans les couches profondes de la perception."}
        ]
      },
      practice:{
        name:"Contemplation de la spirale dorée",
        duration:"25 minutes",
        intention:"Percevoir l'infini dans une structure finie, ouvrir la conscience à l'auto-similarité",
        steps:[
          "Imprime ou affiche une spirale dorée (spirale de Fibonacci sur fond noir).",
          "Place-la à 40 cm de tes yeux, hauteur du regard.",
          "Fixe le centre de la spirale sans cligner, en respirant en rythme phi 5/8.",
          "Après 10 minutes, ferme les yeux : observe l'image résiduelle qui se forme.",
          "Laisse cette image rémanente se déployer, se transformer, s'agrandir.",
          "Pose-toi la question : 'Où se termine la spirale ? Où commence l'infini ?'",
          "Ouvre les yeux après 5 minutes. Note immédiatement ce que tu as perçu.",
          "Répète 3 jours de suite pour approfondir la rémanence."
        ]
      },
      journalQuestions:[
        "Quelle structure fractale observes-tu dans ton propre comportement (une habitude qui se répète à différentes échelles de ta vie) ?",
        "Si tu es un microcosme du cosmos, quelle responsabilité cela implique-t-il ?",
        "Qu'est-ce qui se transforme en toi quand tu médites ? Est-ce que quelque chose change à l'extérieur ?"
      ],
      essentialPhrase:"L'initié est une fractale du cosmos. Ce qu'il transforme en lui transforme l'ensemble."
    },

    // ── CLAIRVOYANCE (60-67) ──────────────────────────────
    {
      id:"c064", number:60, order:64, unlockDays:4, symbol:"◉",
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
      id:"c065", number:61, order:65, unlockDays:4, symbol:"◉",
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
      id:"c066", number:62, order:66, unlockDays:4, symbol:"◉",
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
      id:"c067", number:63, order:67, unlockDays:4, symbol:"◉",
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
      id:"c068", number:64, order:68, unlockDays:4, symbol:"◉",
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
      id:"c069", number:65, order:69, unlockDays:4, symbol:"◉",
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
      id:"c070", number:66, order:70, unlockDays:4, symbol:"◉",
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
      id:"c071", number:67, order:71, unlockDays:4, symbol:"◉",
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
      id:"c072", number:68, order:72, unlockDays:4, symbol:"♧",
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
      id:"c073", number:69, order:73, unlockDays:4, symbol:"♧",
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
      id:"c074", number:70, order:74, unlockDays:4, symbol:"♧",
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
      id:"c075", number:71, order:75, unlockDays:4, symbol:"♧",
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
      id:"c076", number:72, order:76, unlockDays:4, symbol:"♧",
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
      id:"c077", number:73, order:77, unlockDays:4, symbol:"♧",
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
      id:"c078", number:74, order:78, unlockDays:4, symbol:"♧",
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
      id:"c079", number:75, order:79, unlockDays:4, symbol:"♧",
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
      id:"c080", number:76, order:80, unlockDays:4, symbol:"✦",
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
      id:"c081", number:77, order:81, unlockDays:4, symbol:"✦",
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
      id:"c082", number:78, order:82, unlockDays:4, symbol:"✦",
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
      id:"c083", number:79, order:83, unlockDays:4, symbol:"✦",
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
      id:"c084", number:80, order:84, unlockDays:4, symbol:"✦",
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
      id:"c085", number:81, order:85, unlockDays:4, symbol:"✦",
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
      id:"c086", number:82, order:86, unlockDays:4, symbol:"✦",
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
      id:"c087", number:83, order:87, unlockDays:4, symbol:"✦",
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
      id:"c088", number:84, order:88, unlockDays:4, symbol:"⚡",
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
      id:"c089", number:85, order:89, unlockDays:4, symbol:"⚡",
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
      id:"c090", number:86, order:90, unlockDays:4, symbol:"⚡",
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
      id:"c091", number:87, order:91, unlockDays:4, symbol:"⚡",
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
      id:"c092", number:88, order:92, unlockDays:4, symbol:"⚡",
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
      id:"c093", number:89, order:93, unlockDays:4, symbol:"⚡",
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
      id:"c094", number:90, order:94, unlockDays:4, symbol:"⚡",
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
      id:"c095", number:91, order:95, unlockDays:4, symbol:"⚡",
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
      id:"c096", number:92, order:96, unlockDays:4, symbol:"⛨",
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
      id:"c097", number:93, order:97, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Recherche d'objet — psychométrie et détection par le ressenti",
      subtitle:"Apprendre à lire l'empreinte énergétique d'un objet ou d'un lieu",
      summary:"La psychométrie est l'art de lire les impressions énergétiques emmagasinées dans les objets. Chaque chose que tu touches te raconte une histoire — apprendre à l'entendre est un art initiatique fondamental.",
      tags:["psychométrie","ressenti","objet","perception","extrasensoriel"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-097/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Développer la perception extra-sensorielle par contact avec des objets chargés d'empreintes.",
      initiaticObjective:"Apprendre à différencier le ressenti personnel du ressenti reçu — affiner l'outil perceptif de l'initié.",
      plan:[
        "Qu'est-ce que la psychométrie ? Base théorique et exemples historiques",
        "Comment un objet emmagasine-t-il une empreinte ?",
        "Préparer sa perception : neutralité, centrage, silence intérieur",
        "Le protocole de lecture : contact, respiration, réception, transcription",
        "Exercices progressifs : objet inconnu, objet d'un proche, lieu",
        "Protocole de validation : comment vérifier ses perceptions ?"
      ],
      teaching:{
        intro:"Dans les traditions initiatiques, la capacité de lire l'histoire d'un objet par simple contact est considérée comme un signe d'avancement. Aujourd'hui certains chercheurs l'étudient sous le terme de 'psychométrie'. Qu'on le nomme assim ou autrement, le phénomène est réel pour quiconque a développé son outil perceptif.",
        sections:[
          {title:"Comment un objet emmagasine une empreinte",content:"Toute chose portée, touchée, habitée régulièrement par une personne absorbe quelque chose de son état énergétique. Les émotions intenses — joie, douleur, amour, peur — semblent particulièrement bien se fixer. Les métaux, les pierres et les matières organiques seraient plus 'réceptifs' que le plastique ou le verre synthétique."},
          {title:"Préparer sa réception",content:"Avant tout exercice de psychométrie, il faut neutraliser son propre état. Cinq minutes de respiration consciente, une intention claire ('je reçois ce qui est là, sans projeter'), et un état de légèreté intérieure. La psychométrie ne fonctionne pas dans un état d'agitation mentale ou de désir de 'trouver quelque chose'."},
          {title:"Le protocole de lecture",content:"1. Prendre l'objet dans la main dominante, yeux fermés. 2. Respirer lentement 3 fois. 3. Ne rien chercher — juste écouter ce qui vient : images, mots, températures, couleurs, émotions. 4. Transcrire immédiatement sans censurer. 5. Comparer ensuite avec la réalité connue."},
          {title:"Protocole de validation",content:"La psychométrie s'entraîne comme un muscle. Commence avec des objets dont tu connais l'histoire — compare ta perception aux faits. Demande à des proches de te soumettre des objets anonymes. Tiens un journal de progression. L'honnêteté dans la validation est cruciale : ni sur-interprétation ni déni."}
        ]
      },
      practice:{
        name:"Lecture d'objet — premier protocole",
        duration:"30 minutes",
        intention:"Exercer la perception psychométrique dans des conditions contrôlées",
        material:"3 objets ayant appartenu à des personnes différentes (préparés à l'avance), carnet, stylo",
        steps:[
          "Prépare 3 petits objets ayant appartenu à des proches — sans te rappeler à qui appartient chacun (les mélanger ou les faire préparer par quelqu'un d'autre).",
          "Centres-toi avec 5 minutes de respiration phi 5/8.",
          "Prends le premier objet dans la main droite, ferme les yeux.",
          "Reste dans le silence intérieur pendant 2 minutes — laisse venir ce qui vient.",
          "Transcris immédiatement : images, couleurs, émotions, températures, mots.",
          "Répète avec les 2 autres objets.",
          "Révèle ensuite à qui appartient chaque objet et compare avec tes notes.",
          "Note ton pourcentage de cohérence sans jugement — c'est le point de départ."
        ],
        safety:"Ne jamais psychométriser des objets très chargés (bijoux de défunts, objets de violence) sans protection préalable — surtout en phase d'apprentissage."
      },
      journalQuestions:[
        "Quels types d'impressions reçois-tu le plus facilement : images, émotions, températures, mots ?",
        "As-tu déjà ressenti 'quelque chose' au contact d'un lieu ou d'un objet dans ta vie quotidienne ?",
        "Comment distingues-tu une impression reçue d'une projection de ton mental ?"
      ],
      essentialPhrase:"Tout ce qui a été touché avec intensité garde l'empreinte. L'initié sait lire."
    },
    {
      id:"c098", number:94, order:98, unlockDays:4, symbol:"⛨",
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
      id:"c099", number:95, order:99, unlockDays:4, symbol:"⛨",
      familyId:"protection", familyTitle:"Protection énergétique",
      title:"Le sceau de lumière — créer un espace sacré et protégé",
      subtitle:"Délimiter, purifier et sceller l'espace de pratique par des protocoles initiatiques précis",
      summary:"Toute pratique initiatique sérieuse commence par la création d'un espace sanctuarisé. Ce cours enseigne les protocoles pour délimiter, purifier et sceller un lieu de pratique.",
      tags:["espace sacré","purification","sceau","protection","rituel"],
      level:"Avancé", duration:"1 h",
      image:"assets/courses/course-099/cover.webp",
      pdfPath:"", pdfPremium:true,
      pedagogicalObjective:"Apprendre à créer un espace de pratique protégé, stable et consacré par des protocoles répétables.",
      initiaticObjective:"Comprendre que l'espace intérieur et l'espace extérieur se répondent — sanctuariser le dehors, c'est sanctuariser le dedans.",
      plan:[
        "Pourquoi l'espace de pratique est fondamental",
        "Les quatre éléments comme gardiens de l'espace",
        "Le cercle de lumière : tracer, nommer, sceller",
        "Purification sonore et olfactive : sons, fumigations, eau bénite",
        "L'ancrage des quatre directions",
        "Clore et dissoudre l'espace sacré après la pratique"
      ],
      teaching:{
        intro:"Dans les traditions initiatiques du monde entier — chamanique, hermétique, bouddhiste tibétaine, soufie — toute pratique sérieuse débute par la création d'un espace délimité. Pas par superstition, mais par compréhension : l'état intérieur de l'initié est poreux. Un espace préparé soutient l'état requis. Un espace non préparé le disperse.",
        sections:[
          {title:"Le cercle de lumière",content:"Le cercle est la forme la plus universelle de délimitation sacrée. On le trace — mentalement ou physiquement — en tournant dans le sens du soleil (est, sud, ouest, nord). À chaque point cardinal, on pose une intention ou un nom sacré. Le cercle n'est pas une barrière — c'est une amplificateur. Ce qui se passe à l'intérieur est intensifié."},
          {title:"Les quatre gardiens",content:"Chaque direction porte une qualité : Est/Lumière-Air, Sud/Feu-Chaleur, Ouest/Eau-Réception, Nord/Terre-Stabilité. Reconnaître ces gardiens — les invoquer intérieurement — ancre l'espace dans les quatre dimensions de l'existence incarnée. L'initié ne travaille jamais seul dans le vide."},
          {title:"Purification sonore",content:"Le son — cloche, bol tibétain, voix, claquement des mains — rompt les configurations énergétiques stagnantes dans un espace. Trois coups dans chaque coin de la pièce, en commençant par le nord-est et en suivant le soleil. L'espace résonne différemment après — on peut l'entendre, et surtout le ressentir."},
          {title:"Clore après la pratique",content:"Aussi important que d'ouvrir : dissoudre l'espace sacré après la pratique en le remerciant et en tournant cette fois à contre-sens du soleil. Cela évite que l'espace reste 'ouvert' et qu'il soit perturbé ou que l'état de pratique interfère avec la vie ordinaire. Le sacré a un début et une fin — c'est ce qui le rend sacré."}
        ]
      },
      practice:{
        name:"Création de l'espace sacré — premier protocole complet",
        duration:"35 minutes",
        intention:"Établir un espace de pratique délimité, purifié et ancré dans les quatre directions",
        material:"Une cloche ou un bol sonore (ou claquement des mains), de l'eau pure, optionnel : une bougie ou de l'encens",
        steps:[
          "Choisis un endroit dans ta maison dédié à la pratique — même petit, même temporaire.",
          "Tiens-toi au centre. Ferme les yeux. Respire 5 fois profondément.",
          "Tourne vers l'Est (ou à défaut, vers une fenêtre). Pose intérieurement : 'Je reçois la lumière de l'aube.'",
          "Tourne vers le Sud. Pose : 'Je reçois la chaleur du feu vivant.'",
          "Tourne vers l'Ouest. Pose : 'Je reçois la fluidité de l'eau.'",
          "Tourne vers le Nord. Pose : 'Je reçois la stabilité de la terre.'",
          "Reviens au centre. Frappe 3 fois dans tes mains — fort, sec, clair.",
          "Fais le tour de la pièce en frappant dans chaque coin (3 coups chacun, sens horaire).",
          "Asperse légèrement d'eau pure les quatre murs ou les coins.",
          "Reviens au centre. 'Cet espace est sanctuarisé pour ma pratique.'",
          "Pratique maintenant ce que tu avais prévu.",
          "À la fin : retourne au centre, remercie les quatre directions en sens inverse, 3 coups lents — 'Je referme cet espace. Que la pratique reste en moi.'"
        ]
      },
      journalQuestions:[
        "Qu'est-ce qui change dans ta pratique quand tu prépares l'espace intentionnellement ?",
        "Y a-t-il un endroit dans ta maison ou dans la nature qui te semble naturellement 'sacré' ? Pourquoi ?",
        "Qu'est-ce que cela révèle de la frontière entre le sacré et le profane dans ta vie ?"
      ],
      essentialPhrase:"Avant de travailler sur soi, on prépare le sol. Le temple extérieur appelle le temple intérieur."
    },
    {
      id:"c100", number:96, order:100, unlockDays:4, symbol:"⛨",
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
      id:"c101", number:97, order:101, unlockDays:4, symbol:"⛨",
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
      id:"c102", number:98, order:102, unlockDays:4, symbol:"⛨",
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
      id:"c103", number:99, order:103, unlockDays:4, symbol:"⛨",
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
      id:"c104", number:100, order:104, unlockDays:4, symbol:"♁",
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
      id:"c105", number:101, order:105, unlockDays:4, symbol:"♁",
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
      id:"c106", number:102, order:106, unlockDays:4, symbol:"♁",
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
      id:"c107", number:103, order:107, unlockDays:4, symbol:"♁",
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
      id:"c108", number:104, order:108, unlockDays:4, symbol:"♁",
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
      id:"c109", number:105, order:109, unlockDays:4, symbol:"♁",
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
      id:"c110", number:106, order:110, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Elian — l'initiation par l'expérience directe",
      subtitle:"Étude d'un parcours initiatique documenté : le cas de Elian",
      summary:"Elian est l'un des élèves dont l'évolution initiatique a été documentée dans les archives de la tradition. Son parcours — des premières rémanences lumineuses au dédoublement complet — est un modèle d'initiation progressive, patiente, ancrée dans la pratique quotidienne.",
      tags:["Elian","initiation","dédoublement","progression","expérience"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Comprendre la progression initiatique à travers l'étude du cas Elian.",
      initiaticObjective:"Reconnaître dans son propre parcours les étapes de l'évolution décrite dans les témoignages initiatiques.",
      essentialPhrase:"L'initiation n'est pas un événement — c'est une progression quotidienne qui s'accumule.",
      teaching:{
        intro:"Les archives initiatiques documentent l'évolution sur plusieurs années d'un élève nommé Elian. Ce n'est pas un personnage exceptionnel — c'est précisément ce qui rend son parcours si précieux pédagogiquement. Elian commence avec des difficultés ordinaires, fait des erreurs ordinaires, et progresse de façon ordinaire. Et pourtant, il atteint des états de conscience extraordinaires.",
        sections:[
          { title:"Phase 1 — Les premiers phosphènes de Elian", content:"Elian commence par ne percevoir que de vagues lueurs après observation du soleil. Ses rémanences lumineuses sont instables, fugitives, difficiles à maintenir. L'enseignement préconise la patience : ne pas chercher à fabriquer les phosphènes, mais simplement observer ce qui vient. Cette phase dure plusieurs semaines. C'est la phase que traverse tout débutant." },
          { title:"Phase 2 — Les balancements et la profondeur", content:"Elian intègre le balancement latéral dans sa pratique quotidienne. Les rémanences lumineuses deviennent plus stables, plus vives. Il commence à percevoir des formes géométriques dans l'obscurité. Les tensions statiques apparaissent dans sa pratique et amplifient notablement les effets. Il commence à approcher le seuil hypnagogique régulièrement sans y tomber." },
          { title:"Phase 3 — Les premiers signes du dédoublement", content:"Elian rapporte des sensations nouvelles : impression de légèreté après les tensions, vibrations dans les membres, sentiment parfois d'être 'à côté' de son corps sans pouvoir le définir clairement. L'enseignement encourage à ne pas chercher à forcer ces expériences. La clé est la régularité : chaque jour, 20 à 30 minutes de pratique, sans attente de résultats particuliers." },
          { title:"Phase 4 — Le dédoublement confirmé", content:"Après plusieurs mois de pratique quotidienne, Elian vit une expérience de dédoublement complet : il se perçoit flottant au-dessus de son corps, peut observer la pièce depuis le plafond, distingue des détails impossibles à percevoir de sa position physique habituelle. La tradition valide l'expérience et enseigne à Elian comment l'intégrer sans s'y attacher." },
          { title:"La leçon de Elian pour chaque pratiquant", content:"Le parcours de Elian enseigne plusieurs vérités essentielles : 1. Le dédoublement est le résultat naturel d'une pratique cohérente, pas un don exceptionnel. 2. La patience est la vertu principale — Elian a mis plusieurs mois. 3. L'absence d'attente est une condition : dès que Elian cherchait le dédoublement, il ne venait pas. 4. Le carnet d'expérience est indispensable : Elian notait tout, même les séances 'sans résultat'." }
        ]
      },
      minutePlan:[
        { time:"0–15 min", title:"Étude du parcours de Elian", content:"Lire ou écouter les étapes principales. Identifier les parallèles avec son propre parcours." },
        { time:"15–35 min", title:"Pratique — tensions + balancement", content:"Séquence complète : 7 tensions statiques légères puis balancement latéral 15 minutes." },
        { time:"35–50 min", title:"Immobilité et observation", content:"Immobilité totale après le balancement. Observer sans attendre. Laisser venir." },
        { time:"50–60 min", title:"Carnet — parallèles avec Elian", content:"Écrire où vous vous situez dans la progression décrite." }
      ],
      contemplation:{
        duration:"7 minutes",
        question:"À quelle étape du parcours de Elian vous identifiez-vous aujourd'hui ?",
        guidance:"Relisez mentalement les 4 phases de Elian. Où êtes-vous ? Phase 1 (premiers phosphènes) ? Phase 2 (balancements profonds) ? Phase 3 (approche du seuil) ? Cette évaluation honnête est la base d'une progression réelle."
      },
      practice:{
        name:"Pratique dans l'esprit de Elian — sans attente",
        duration:"30 minutes",
        intention:"Pratiquer comme Elian : régulièrement, sans attente, en notant tout.",
        posture:"Allongé ou assis selon préférence.",
        steps:[
          "Poser l'intention : 'Je pratique sans chercher de résultat particulier.'",
          "Tensions statiques légères aux 7 points (version courte — 10 sec chaque).",
          "Balancement latéral 20 minutes, mantra ILLI.",
          "Immobilité 10 minutes. Observer sans intervenir.",
          "Carnet : noter même 'rien de particulier' est une observation valide."
        ],
        adaptations:["Version courte (15 min) : tensions 3 points + balancement 10 min + immobilité 5 min"],
        safety:"L'absence de résultat spectaculaire est normale et n'indique pas l'absence de progrès."
      },
      journalQuestions:[
        "À quelle phase de Elian vous situez-vous ? Pourquoi ?",
        "Quelle est votre principale difficulté en ce moment dans la pratique ?",
        "Avez-vous eu une expérience récente qui ressemble à celles décrites dans le parcours de Elian ?"
      ],
      validation:[
        "Je peux décrire les 4 phases du parcours de Elian",
        "J'ai identifié ma propre phase de progression",
        "J'ai pratiqué sans attente et noté honnêtement les résultats"
      ],
      references:["Parcours initiatique de Elian — Vol. I", "Parcours initiatique de Elian — Vol. II"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Pratique de Elian — régularité sans attente",
        context:"Pratique quotidienne simple. Tensions légères puis balancement latéral. L'essentiel est la régularité.",
        detente:3,
        objetContemplation:"carré",
        balancement:{ type:"latéral", duree:20 },
        respiration:{ type:"rectangulaire", mesure:5, duree:8 },
        final:{ type:"tension", duree:3 },
        voix:false,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c111", number:107, order:111, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Visions initiatiques — décoder les images hypnagogiques",
      subtitle:"Comprendre les images au seuil du sommeil comme informations de la conscience profonde",
      summary:"Les images hypnagogiques (formes, visages, paysages) qui apparaissent au seuil du sommeil ne sont pas aléatoires. la tradition initiatique enseigne comment les déchiffrer comme des messages de la conscience profonde — et comment cultiver cette perception.",
      tags:["hypnagogique","visions","images","décodage","conscience"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Développer la capacité à observer et déchiffrer les images hypnagogiques.",
      initiaticObjective:"Reconnaître dans les images du seuil les informations de la conscience profonde.",
      essentialPhrase:"L'image au seuil est une lettre de la conscience profonde — apprends à la lire.",
      teaching:{
        intro:"Les archives initiatiques analysent en détail les visions survenant au seuil du sommeil chez les pratiquants. Elles distinguent les images de bruit (productions aléatoires du cerveau au repos) des images d'information (visions porteuses de sens). La différence : la qualité de présence et la cohérence interne de l'image.",
        sections:[
          { title:"Classification des images hypnagogiques", content:"Niveau 1 — Géométrique : points, lignes, grilles, spirales. Ces images indiquent une activation du cortex visuel par les rémanences lumineuses. Niveau 2 — Symbolique : formes reconnaissables (animaux, plantes, objets) sans contexte narratif. Ces images indiquent une activation des mémoires profondes. Niveau 3 — Narratif : scènes, visages, espaces cohérents avec une logique interne. Ces images sont celles que la tradition nomme 'visions initiatiques'. Niveau 4 — Lucide : l'observateur sait qu'il observe et peut interagir avec l'image." },
          { title:"Comment cultiver les images de niveau 3 et 4", content:"La qualité des images hypnagogiques dépend directement de la qualité du seuil atteint. Plus le seuil est stable (corps endormi, conscience éveillée), plus les images sont cohérentes et chargées de sens. Les tensions statiques et le balancement préparent ce seuil stable. L'absence de peur et l'absence d'attente permettent aux images de se former sans interférence." },
          { title:"Le déchiffrement — ne pas interpréter trop vite", content:"L'erreur classique est d'interpréter immédiatement chaque image selon ses grilles de sens habituelles. L'enseignement conseille : d'abord décrire précisément dans le carnet, ensuite laisser reposer plusieurs jours, puis regarder si une cohérence émerge. Les images initiatiques trouvent souvent leur sens dans la vie quotidienne des jours suivants — non par coïncidence, mais par résonance." },
          { title:"Exemples de visions initiatiques documentées", content:"Les archives de la tradition rapportent des visions de paysages lumineux, de formes géométriques pulsantes, de visages inconnus porteurs de messages. Certaines visions ont été vérifiées objectivement après coup. D'autres ont guidé les pratiquants vers des décisions importantes dans leur vie. L'important n'est pas de croire à ces récits, mais de cultiver la capacité d'observation qui les rend possibles." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Étude des niveaux d'images", content:"Identifier les 4 niveaux. Se rappeler ses propres images hypnagogiques passées." },
        { time:"10–30 min", title:"Pratique — induction du seuil", content:"Tensions légères + balancement rotation + immobilité progressive." },
        { time:"30–50 min", title:"Observation des images", content:"Observer sans intervenir. Laisser les images venir et partir sans les retenir." },
        { time:"50–60 min", title:"Transcription immédiate", content:"Décrire avec précision les images observées. Ne pas encore interpréter." }
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Quelle image hypnagogique vous a marqué dans votre vie — sans que vous compreniez pourquoi ?",
        guidance:"Cherchez dans vos souvenirs une image reçue dans cet état particulier entre veille et sommeil. Ne cherchez pas à l'interpréter maintenant. Juste la retrouver et la revisiter avec bienveillance."
      },
      practice:{
        name:"Culture des images du seuil",
        duration:"35 minutes",
        intention:"Atteindre le seuil niveau 3 — images cohérentes et narratives.",
        posture:"Allongé sur le dos. Bandeau sur les yeux recommandé.",
        steps:[
          "Tensions statiques courtes (5 positions, 15 sec chaque).",
          "Balancement rotation lent — 15 minutes.",
          "Immobilité progressive — maintenir conscience comme un fil.",
          "Lorsqu'une image apparaît : ne pas la saisir. La laisser évoluer naturellement.",
          "Observer le mouvement, les transformations, les détails de l'image.",
          "Au retour : décrire immédiatement sans chercher à interpréter."
        ],
        adaptations:["Si endormissement : pratiquer assis, réduire la durée du balancement"],
        safety:"Les images peuvent parfois être intenses ou émotionnellement chargées. La présence calme et le souffle conscient permettent de rester observateur."
      },
      journalQuestions:[
        "Quelles images avez-vous observées ? À quel niveau (1-4) les situez-vous ?",
        "Avez-vous réussi à observer une image sans la saisir ni la repousser ?",
        "Quelle cohérence émerge après quelques jours de vos images du seuil ?"
      ],
      validation:[
        "Je peux distinguer les 4 niveaux d'images hypnagogiques",
        "J'ai observé au moins une image de niveau 2 ou plus",
        "J'ai décrit une image du seuil dans mon carnet sans l'interpréter immédiatement"
      ],
      references:["Expériences initiatiques — Archives de la tradition, Vol. II", "Expériences initiatiques — Archives de la tradition, Vol. III"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Culture du seuil — images et visions",
        context:"Séance du soir pour cultiver les images hypnagogiques. Rotation lente pour induire le seuil profond.",
        detente:5,
        objetContemplation:"cercles",
        balancement:{ type:"rotation", duree:20 },
        respiration:{ type:"rectangulaire", mesure:6, duree:10 },
        final:{ type:"tension", duree:3 },
        voix:false,
        cloche:false,
        tonalites:["FA"]
      }
    },

    // ── SORTIE DE CORPS ASTRAL — suite (112-117) ─────────
    {
      id:"c112", number:108, order:112, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"De l'étudiant à l'initié — la transformation du regard",
      subtitle:"Ce qui a changé en toi, la perte de l'ego, et comment l'initié habite désormais la Terre",
      summary:"À ce stade du parcours, quelque chose s'est irrémédiablement transformé. Tu n'es plus tout à fait le même qu'au premier jour. Le bâton du berger et les livres t'ont conduit jusqu'ici — mais l'initié n'en a plus besoin de la même façon. Comme Jonathan Livingston, tu as appris à voler autrement : non pour fuir le monde, mais pour le traverser avec une présence différente. Ce cours explore cette transformation intérieure — la dissolution progressive de l'ego, le nouveau rapport au monde, et la qualité d'être qui en découle.",
      tags:["transformation","ego","initié","présence","humilité","Jonathan Livingston","regard","être"],
      level:"Maîtrise", duration:"1 h",
      pedagogicalObjective:"Reconnaître et nommer les transformations intérieures survenues au cours du parcours initiatique.",
      initiaticObjective:"Incarner la qualité d'être de l'initié : humilité, présence au monde, regard transformé — sans se séparer de la vie ordinaire.",
      essentialPhrase:"L'initié ne quitte pas le monde — il le traverse autrement. Il marche sur la même terre, mais ses pieds la touchent différemment.",
      teaching:{
        intro:"Il existe un moment dans tout parcours initiatique authentique où l'étudiant réalise, souvent sans pouvoir l'expliquer, qu'il n'est plus tout à fait celui qui a commencé. Ce n'est pas une illumination soudaine comme dans les romans ésotériques. C'est plus discret, plus profond — une modification de la texture du regard, une légèreté nouvelle dans la façon d'habiter l'instant. Ce cours n'enseigne pas une technique. Il t'invite à reconnaître ce qui s'est déjà passé en toi.",
        sections:[
          { title:"Ce qui s'est transformé — un inventaire honnête", content:"Au début du parcours, tu arrivais avec tes questions, tes attentes, peut-être tes blessures. Tu cherchais quelque chose — un pouvoir, une réponse, une guérison, ou simplement le sens. Tu tenais tes livres d'une main et ton bâton de berger de l'autre — ces guides extérieurs qui donnaient forme à l'invisible. Aujourd'hui, arrête-toi. Qu'est-ce qui a changé, concrètement ? Peut-être que les mêmes situations ne te touchent plus de la même façon. Peut-être que certaines personnes ont glissé de ta vie sans douleur. Peut-être que le silence ne t'effraye plus. Peut-être que tu réagis moins vite à ce qui t'aurait autrefois blessé. Peut-être — et c'est souvent la transformation la plus subtile — que tu commences à te sentir moins important, et que cela te libère plutôt que de te diminuer." },
          { title:"Jonathan Livingston — l'allégorie du vol intérieur", content:"Jonathan Livingston Seagull de Richard Bach n'est pas un livre sur les mouettes. C'est une carte du voyage initiatique. Jonathan apprend à voler non pas pour se nourrir — comme les autres goélands — mais pour la joie pure du vol lui-même, pour repousser les limites de ce qu'un goéland peut être. Il est d'abord rejeté par sa communauté (la famille, les pairs, la société qui ne comprend pas le chercheur). Puis il rencontre des maîtres qui lui révèlent les niveaux supérieurs du vol. Enfin — et c'est la phase que ce cours aborde — il revient vers sa communauté originelle, non pas pour montrer ce qu'il sait faire, mais pour enseigner avec humilité à ceux qui sont prêts. L'initié revient dans le monde. Il ne le fuit pas. Il y marche différemment." },
          { title:"La dissolution de l'ego — un processus naturel, non une performance", content:"L'ego n'est pas un ennemi à détruire. C'est une structure d'organisation du moi qui a été nécessaire à chaque étape. L'ego de l'étudiant cherche, compare, juge, progresse, s'améliore, veut 'arriver'. Il est utile. Mais à un certain stade du parcours, quelque chose de plus vaste commence à prendre la relève — non pas comme une victoire sur l'ego, mais comme un desserrement naturel de son emprise. Tu remarques que tu as moins besoin d'avoir raison. Moins besoin d'être reconnu. Moins besoin que les choses se passent exactement comme tu le voulais. Ce n'est pas de l'indifférence — c'est de la paix. Le paradoxe : plus l'ego se dissout, plus tu es présent, plus tu ressens, plus tu aimes. L'ego prenait de la place pour lui-même. Sa dissolution libère de l'espace pour l'autre." },
          { title:"Comment l'initié habite la surface de la Terre", content:"L'initié marche sur la même terre que tout le monde. Il fait ses courses, il paye ses impôts, il traverse les mêmes embouteillages. Mais la façon dont il habite ces espaces ordinaires a changé. Il n'est plus pressé de la même manière — non pas par paresse, mais parce qu'il perçoit mieux ce qui est réellement urgent et ce qui ne l'est pas. Il ne se bat plus contre les personnes difficiles — il comprend leur condition sans nécessairement l'approuver. Il ne cherche pas à convertir ou à convaincre — il est ce qu'il est, et cela suffit. Cette qualité de présence est douce mais visible. Les gens la sentent sans pouvoir la nommer. Elle crée autour de l'initié un espace de calme que d'autres cherchent instinctivement." },
          { title:"Comportement, attitude et relation au monde — ce qui change vraiment", content:"Voici quelques marqueurs concrets de la transformation initiatique réelle — non pas des idéaux à atteindre, mais des observations de ce qui se passe naturellement. La parole se fait moins abondante et plus juste. L'écoute s'approfondit. La tolérance envers les faiblesses des autres augmente, parce qu'on reconnaît ces mêmes faiblesses en soi. La compétition avec autrui perd de son attrait — la seule mesure qui reste est celle de sa propre cohérence intérieure. La gratitude devient plus naturelle, plus spontanée. La simplicité est préférée à l'ostentation. Les moments de silence deviennent des espaces de ressourcement et non plus d'inconfort. Et — peut-être le signe le plus subtil — on commence à trouver du sens dans ce que l'on fait, indépendamment du regard extérieur." },
          { title:"Le bâton du berger et les livres — leur place a changé", content:"Au début, les livres donnaient le cadre. Le bâton du berger désignait la direction. Ils étaient des tuteurs nécessaires pour la plante encore jeune. L'initié ne jette pas ses outils — il les utilise différemment. Les livres ne lui apprennent plus ce qu'il doit penser — ils lui confirment ce qu'il ressent déjà. Le bâton ne pointe plus vers un but extérieur — il aide à maintenir l'équilibre sur un chemin qu'on n'a plus peur de perdre. La différence entre l'étudiant et l'initié, ce n'est pas le savoir accumulé. C'est la relation au savoir. L'étudiant apprend pour savoir. L'initié vit pour être — et apprend en vivant." }
        ]
      },
      minutePlan:[
        { time:"0–15 min", title:"Inventaire de transformation", content:"Prendre le carnet. Écrire, honnêtement, 5 choses concrètes qui ont changé en toi depuis le début du parcours. Pas des idéaux — des observations réelles." },
        { time:"15–30 min", title:"L'allégorie de Jonathan Livingston", content:"Méditer sur l'image du goéland qui revient dans son monde après avoir appris à voler autrement. Où en es-tu dans ce voyage ?" },
        { time:"30–50 min", title:"Pratique de présence pure", content:"Balancement très lent ou immobilité complète. Pas d'objectif. Pas de technique à réussir. Simplement être — et observer qui observe." },
        { time:"50–60 min", title:"Engagement d'incarnation", content:"Écrire dans le carnet : comment vas-tu incarner concrètement cette qualité d'être dans ta vie quotidienne cette semaine ?" }
      ],
      contemplation:{
        duration:"10 minutes",
        question:"Qui es-tu maintenant, après tout ce chemin — et en quoi es-tu différent de qui tu étais au premier jour ?",
        guidance:"Ferme les yeux. Rappelle-toi le premier jour du parcours — qui tu étais, ce que tu cherchais, ce que tu craignais. Puis laisse venir l'image de qui tu es aujourd'hui. Ne juge pas. Ne compare pas. Observe simplement la distance parcourue, sans orgueil ni humilité forcée. Juste la reconnaissance tranquille d'une transformation qui s'est faite, un jour à la fois, dans le silence des pratiques."
      },
      practice:{
        name:"Présence pure — être sans chercher",
        duration:"20 minutes",
        intention:"Pratiquer sans objectif — simplement être présent à ce qui est, sans chercher à produire un état particulier.",
        posture:"Assis en silence. Ou marche lente et consciente si disponible.",
        steps:[
          "S'installer confortablement. Fermer les yeux ou garder un regard doux vers le sol.",
          "Ne rien chercher à produire. Pas de technique. Pas de mantra. Pas d'intention spéciale.",
          "Observer les sensations du corps — le souffle, la chaleur, le contact du sol.",
          "Quand une pensée vient : la reconnaître sans la suivre. Revenir à la sensation.",
          "Si le silence devient inconfortable : ne pas le fuir. Observer l'inconfort sans s'y identifier.",
          "Après 20 minutes : noter dans le carnet — quelle qualité d'être as-tu habitée pendant cette pratique ?"
        ],
        adaptations:["Si l'immobilité est difficile : marche lente et consciente de 20 minutes dans un espace calme", "Si des émotions surgissent : les accueillir sans les amplifier ni les refuser — elles font partie du processus"],
        safety:"Ce cours peut susciter des remises en question profondes sur son identité et son chemin. C'est normal et sain. Si des émotions intenses surviennent, noter dans le carnet et laisser du temps avant d'analyser."
      },
      journalQuestions:[
        "Nomme 3 façons concrètes dont tu interagis différemment avec les autres qu'au début du parcours.",
        "Qu'est-ce que tu as lâché au cours de ce chemin — une croyance, une peur, un besoin — et qu'as-tu reçu à la place ?",
        "Comment imagines-tu 'marcher sur la terre' en initié dans ta vie de tous les jours, cette semaine ?"
      ],
      validation:[
        "J'ai identifié au moins 3 transformations concrètes survenues depuis le début du parcours",
        "J'ai pratiqué 20 minutes de présence pure sans objectif technique",
        "J'ai écrit un engagement concret d'incarnation pour la semaine à venir"
      ],
      references:["Jonathan Livingston Seagull — Richard Bach", "Tradition initiatique — le retour dans le monde", "Expériences initiatiques — Archives de la tradition, Vol. III"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Présence pure — être sans chercher",
        context:"Pas d'objectif technique. Simplement être. Balancement très lent ou immobilité. Observer qui observe.",
        detente:10,
        objetContemplation:"sphère",
        balancement:{ type:"latéral", duree:15 },
        respiration:{ type:"complete", mesure:5, duree:10 },
        final:{ type:"tension", duree:0 },
        voix:true,
        cloche:true,
        tonalites:["SI","LA"]
      }
    },
    {
      id:"c113", number:109, order:113, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Le balancement comme portail — technique avancée",
      subtitle:"Utiliser l'oscillation pendulaire pour induire le dédoublement",
      summary:"Le balancement prolongé est la technique centrale de la méthode initiatique pour induire le dédoublement. Ce cours enseigne les nuances avancées : durée, rythme, transition vers l'immobilité, et les signes annonçant l'imminence de la sortie de corps.",
      tags:["balancement","portail","oscillation","dédoublement","avancé"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Maîtriser le balancement prolongé comme technique d'induction du dédoublement.",
      initiaticObjective:"Utiliser l'oscillation pendulaire pour franchir le seuil de la conscience élargie.",
      essentialPhrase:"Le balancement est le berceau dans lequel l'âme apprend à se séparer doucement du corps.",
      teaching:{
        intro:"Parmi toutes les techniques de préparation au dédoublement, le balancement prolongé est la plus directement efficace documentée par la tradition initiatique. De nombreux témoignages rapportent des dédoublements survenant pendant ou immédiatement après un balancement prolongé de 30 à 45 minutes.",
        sections:[
          { title:"Pourquoi le balancement induit le dédoublement", content:"Le balancement crée un rythme oscillatoire qui synchronise le mouvement du LCR avec le mouvement du corps. Après 20-30 minutes, ce rythme devient si intégré que lorsque le corps s'immobilise, le LCR continue d'osciller — créant une 'mémoire cinétique' dans le système nerveux. C'est dans ce moment de décalage entre la fin du mouvement physique et la continuation du mouvement interne que le corps éthérique peut se desserrer." },
          { title:"La transition critique — de l'oscillation à l'immobilité", content:"La transition est le moment le plus délicat. Si elle est trop brusque (arrêt soudain), le corps se contracte et la chance est perdue. Si elle est trop lente (balancement qui ne s'arrête jamais), on ne crée pas le contraste nécessaire. La technique correcte : ralentir progressivement sur 5 à 10 minutes jusqu'à des oscillations presque imperceptibles, puis une immobilité qui semble surgir naturellement." },
          { title:"Les signes annonçant la sortie imminente", content:"Les témoignages initiatiques identifient plusieurs signes qui précèdent le dédoublement pendant le balancement : augmentation soudaine de la chaleur dans la colonne. Sensation de légèreté dans les membres. Bourdonnement sourd ou son tonal dans les oreilles. Impression que le balancement 'continue tout seul'. Rémanences lumineuses de plus en plus intenses même les yeux fermés. Ces signes demandent : ne pas réagir. Rester dans l'observation calme." },
          { title:"La respiration pendant le balancement", content:"La respiration ne doit pas être volontairement contrôlée pendant le balancement. Elle suit naturellement le rythme de l'oscillation — s'ouvrant à la montée, se relâchant à la descente. Cette synchronisation naturelle est plus efficace que toute technique respiratoire imposée. Si la respiration naturelle est insuffisante pour maintenir la conscience, une respiration rectangulaire légère peut être utilisée au début, puis abandonnée après 10 minutes." }
        ]
      },
      minutePlan:[
        { time:"0–5 min", title:"Installation — intention + souffle", content:"Corps stable. Posture de balancement. Intention posée. 3 respirations profondes." },
        { time:"5–30 min", title:"Balancement soutenu", content:"Balancement latéral puis vertical selon sensations. Rythme naturel, ni forcé ni freiné." },
        { time:"30–40 min", title:"Transition vers la rotation", content:"Passer progressivement au mouvement rotatoire — plus proche du mouvement LCR naturel." },
        { time:"40–50 min", title:"Ralentissement progressif", content:"Diminuer amplitude sur 10 minutes jusqu'à quasi-immobilité. Observer les signes." },
        { time:"50–60 min", title:"Immobilité et seuil", content:"Immobilité totale. Maintenir la conscience. Accueillir tout ce qui vient." }
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Qu'est-ce qui se passe dans le corps quand le balancement s'arrête ?",
        guidance:"Bougez doucement d'un côté à l'autre pendant 2 minutes. Arrêtez brusquement. Observez ce qui continue à bouger à l'intérieur. C'est une petite démonstration de l'inertie du LCR après le balancement."
      },
      practice:{
        name:"Balancement d'induction avancé — 45 minutes",
        duration:"45 minutes",
        intention:"Franchir le seuil du dédoublement via le balancement prolongé.",
        posture:"Assis en tailleur ou sur chaise. Corps stable. Mains sur les cuisses.",
        steps:[
          "Intention : 'Je laisse le balancement me conduire au seuil.'",
          "Balancement latéral mantra ILLI — 15 minutes.",
          "Transition vers vertical mantra ALLA — 10 minutes.",
          "Transition vers rotation — 10 minutes.",
          "Ralentissement progressif sur 10 minutes.",
          "Immobilité totale. Observer les signes (chaleur, légèreté, bourdonnement).",
          "Ne pas réagir. Rester dans l'observation calme pendant 10+ minutes."
        ],
        adaptations:["Si douleur au dos : pratiquer allongé en imaginant le balancement (balancement mental)"],
        safety:"Si sensation de panique lors du seuil : rouvrir les yeux, respirer, recommencer plus brièvement une autre fois."
      },
      journalQuestions:[
        "Avez-vous senti 'quelque chose continuer à bouger' après l'arrêt du balancement ?",
        "Avez-vous observé un des signes annonciateurs (chaleur, bourdonnement, légèreté) ?",
        "Quelle durée de balancement vous semble la plus propice au seuil ?"
      ],
      validation:[
        "Je peux maintenir un balancement soutenu pendant 30 minutes",
        "J'ai maîtrisé la transition progressive vers l'immobilité",
        "J'ai observé au moins un signe annonciateur lors d'un balancement prolongé"
      ],
      references:["Expériences initiatiques — Archives de la tradition, Vol. II", "L'oscillation pendulaire — Pratiques initiatiques"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Balancement portail — induction prolongée",
        context:"Séance d'induction avancée. Balancement latéral long → vertical → rotation → immobilité.",
        detente:3,
        objetContemplation:"cercles",
        balancement:{ type:"rotation", duree:35 },
        respiration:{ type:"rectangulaire", mesure:5, duree:8 },
        final:{ type:"rotation", duree:5 },
        voix:false,
        cloche:true,
        tonalites:["LA","FA"]
      }
    },
    {
      id:"c114", number:110, order:114, unlockDays:4, symbol:"△",
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
      id:"c115", number:111, order:115, unlockDays:7, symbol:"✶",
      familyId:"astral", familyTitle:"Sortie de corps astral",
      title:"Intégration post-dédoublement — ancrage et mémoire",
      subtitle:"Comment intégrer une expérience de sortie de corps sans se dissocier",
      summary:"Après une expérience de dédoublement, l'intégration est aussi importante que l'expérience elle-même. L'enseignement insiste : sans intégration, les dédoublements peuvent créer de la confusion ou de la dissociation. Ce cours enseigne les protocoles d'ancrage post-sortie.",
      tags:["intégration","ancrage","post-dédoublement","mémoire","stabilité"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Maîtriser les protocoles d'intégration après une expérience de dédoublement.",
      initiaticObjective:"Ancrer les dédoublements dans la conscience ordinaire sans perte de sens.",
      essentialPhrase:"Revenir dans le corps est aussi sacré que d'en sortir.",
      teaching:{
        intro:"Les témoignages initiatiques montrent que les élèves qui ont des dédoublements fréquents mais ne les intègrent pas correctement deviennent progressivement instables : rêveurs, détachés de la réalité quotidienne, parfois anxieux. L'intégration n'est pas optionnelle — elle est la condition pour que les dédoublements restent une source de croissance et non de désorganisation.",
        sections:[
          { title:"Le retour — comment ne pas le brusquer", content:"Le retour dans le corps après un dédoublement doit être aussi progressif que la sortie. Si le retour est brusque (alarme, bruit fort, peur soudaine), il peut créer une sensation de choc désagréable. La technique correcte : dès que la conscience ordinaire reprend, ne pas se lever immédiatement. Rester allongé 5 minutes. Respirer profondément. Sentir le poids du corps sur la surface. Bouger les doigts et orteils lentement." },
          { title:"La mémoire du dédoublement — comment la préserver", content:"La mémoire d'un dédoublement est extrêmement fragile — plus fragile encore que la mémoire d'un rêve. Elle se dissipe en quelques minutes si elle n'est pas fixée. La règle absolue : noter immédiatement, dans un carnet réservé aux expériences du seuil. Pas de téléphone, pas de conversation — le carnet d'abord. Noter : heure, durée approximative, premier souvenir, sensations physiques, images, sons, tout." },
          { title:"L'ancrage dans le corps — techniques", content:"Après un dédoublement, l'ancrage corporel peut être insuffisant pendant plusieurs heures. Techniques d'ancrage recommandées par la méthode : marcher pieds nus sur la terre ou le sol. Manger quelque chose de substantiel (pas de jeûne prolongé après un dédoublement profond). Faire un travail physique simple (vaisselle, jardinage). Se laver les mains et le visage à l'eau froide. Ces gestes simples ramènent l'attention dans le corps physique." },
          { title:"L'intégration sur plusieurs jours", content:"Une expérience de dédoublement profond demande parfois plusieurs jours d'intégration. Des visions ou des insights peuvent continuer à émerger dans les jours suivants. L'enseignement recommande : tenir un journal quotidien après tout dédoublement, relire le journal après 7 jours, chercher les thèmes récurrents ou les cohérences avec la vie quotidienne. L'intégration complète peut prendre des semaines ou des mois." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Protocole de retour — théorie et pratique", content:"Comprendre les étapes du retour. S'exercer à revenir progressivement dans le corps depuis un état de profonde relaxation." },
        { time:"10–30 min", title:"Pratique d'induction douce", content:"Tensions légères + balancement 15 minutes. Observer le seuil sans chercher à aller loin." },
        { time:"30–45 min", title:"Retour conscient", content:"Revenir progressivement. Ancrage : doigts, orteils, respiration, poids du corps." },
        { time:"45–55 min", title:"Carnet d'intégration", content:"Écrire : qu'est-ce que cette expérience m'enseigne ? Qu'est-ce qui a changé ?" },
        { time:"55–60 min", title:"Ancrage final", content:"3 respirations profondes. Boire de l'eau. Sensations physiques concrètes." }
      ],
      contemplation:{
        duration:"7 minutes",
        question:"Qu'est-ce que revenir dans le corps vous apprend sur ce que vous êtes ?",
        guidance:"Après la pratique, sentez le poids de votre corps, la texture de vos vêtements, le son de la pièce. Puis posez la question : 'Est-ce que ce corps, c'est moi ?' Observez la réponse — ou l'absence de réponse."
      },
      practice:{
        name:"Ancrage corporel post-seuil",
        duration:"25 minutes",
        intention:"Pratiquer le retour conscient et l'ancrage après un état de seuil.",
        posture:"Allongé. Progressivement assis. Progressivement debout.",
        steps:[
          "Descente dans le seuil : tensions légères (3 points) + immobilité 15 minutes.",
          "Retour : bouger les orteils très lentement. Puis les doigts.",
          "Ouvrir les yeux très doucement. Regarder le plafond sans bouger.",
          "S'asseoir progressivement. Sentir le sol sous les pieds.",
          "Boire de l'eau fraîche. Carnet immédiat.",
          "Si possible : marcher 5 minutes pieds nus."
        ],
        adaptations:["Si sensation de dissociation : ancrage physique accéléré (manger quelque chose de consistant)"],
        safety:"Ne jamais conduire de véhicule dans les 30 minutes après un dédoublement profond."
      },
      journalQuestions:[
        "Comment avez-vous ressenti le retour dans votre corps ?",
        "Quelle est votre technique d'ancrage la plus efficace ?",
        "Qu'est-ce qui s'est modifié dans votre perception ordinaire après l'expérience ?"
      ],
      validation:[
        "Je peux pratiquer un retour progressif et conscient dans le corps",
        "J'ai noté une expérience du seuil dans mon carnet immédiatement après",
        "J'ai identifié au moins 2 techniques d'ancrage efficaces pour moi"
      ],
      references:["Expériences initiatiques — Archives de la tradition, Vol. III", "Parcours initiatique de Elian — Vol. II"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Ancrage et intégration — retour conscient",
        context:"Séance d'intégration. Balancement doux, seuil bref, retour progressif. Pas de profondeur excessive.",
        detente:5,
        objetContemplation:"carré",
        balancement:{ type:"latéral", duree:15 },
        respiration:{ type:"carrée", mesure:5, duree:8 },
        final:{ type:"tension", duree:3 },
        voix:true,
        cloche:true,
        tonalites:["DO"]
      }
    },
    {
      id:"c116", number:112, order:116, unlockDays:14, symbol:"♁",
      familyId:"eau", familyTitle:"Eau informée & biorésonance",
      title:"Protocole de rajeunissement cellulaire",
      subtitle:"Eau informée 0,9% NaCl, terrain bioélectronique et fréquences de régénération",
      summary:"Un protocole expérimental non médical d'accompagnement cellulaire : eau faiblement minéralisée légèrement salée dont le pH est adapté au terrain estimé, liste complète de fréquences initiatiques de rajeunissement, et exercices d'activation cellulaire par balancement gyroscopique, tensions statiques et respiration. Cadre : symbolique, bioélectronique, sans diagnostic ni promesse thérapeutique.",
      tags:["rajeunissement","eau informée","terrain","fréquences","bioélectronique","NaCl","régénération"],
      level:"Avancé", duration:"1 h",
      pedagogicalObjective:"Comprendre et appliquer le protocole de support hydrique et fréquentiel de rajeunissement cellulaire.",
      initiaticObjective:"Aligner son terrain bioélectronique avec les fréquences de régénération pour soutenir le renouvellement cellulaire.",
      essentialPhrase:"Le corps est un champ cohérent — l'eau en est le langage, la fréquence en est la mémoire.",
      teaching:{
        intro:"Ce protocole est expérimental, non médical et symbolique. Il s'inscrit dans la logique bioélectronique du terrain Axis Lumen. Son objectif interne est de créer les conditions de conductivité, de cohérence redox et de stabilité électrolytique propices à l'activation des processus naturels de régénération cellulaire. Il ne remplace aucun suivi médical et ne constitue pas un traitement.",
        sections:[
          { title:"1. Le terrain bioélectronique — principe fondateur", content:"Le terrain bioélectronique est l'ensemble des paramètres estimables qui définissent l'environnement intérieur de chaque cellule. Trois paramètres-clés : le pH (acidité/alcalinité), le rH2 (potentiel redox, état d'oxydation/réduction), et la résistivité (conductivité de l'eau intracellulaire). Dans la logique du diagramme de Vincent utilisé par le système Axis Lumen, tout terrain peut être représenté dans un espace tridimensionnel pH/rH2/résistivité. L'objectif du protocole est de moduler symboliquement ce terrain vers plus de cohérence. Ces estimations sont internes au système — elles ne constituent pas un diagnostic médical." },
          { title:"2. L'eau comme vecteur de cohérence cellulaire", content:"L'eau représente 70 à 75 % de la masse cellulaire. Sa qualité — minéralisation, pH, structure moléculaire — influence directement la conductivité du milieu intracellulaire. Une eau faiblement minéralisée permet une meilleure pénétration cellulaire. La légère salinisation à 0,9% NaCl (isotonique au plasma sanguin) harmonise symboliquement la pression osmotique et optimise la conductivité. L'ajustement du pH selon le terrain estimé crée une orientation compensatrice douce — principe d'équilibrage symbolique et expérimental." },
          { title:"3. Protocole hydrique — préparation et dosage", content:"Eau de base recommandée : eau faiblement minéralisée (Mont Roucous pH 5.8, Rosée de la Reine, Montcalm ou équivalent très peu minéralisé). Sel : 0,9% NaCl — soit 9 g de sel marin non raffiné par litre, ou 0,9 g pour 100 ml. Préparation : dissoudre le sel dans l'eau à température ambiante. Laisser reposer 5 à 10 minutes. Informer l'eau avec une intention ou une fréquence sonore (bol tibétain, diapason 528 Hz posé sur le verre) pendant le repos. Quantité : 150 à 250 ml avant chaque session, petites prises fractionnées pendant, hydratation progressive après. Ne jamais dépasser 0,9% NaCl." },
          { title:"4. Ajustement du pH selon le terrain estimé", content:"TERRAIN ESTIMÉ ALCALIN (pH simulé > 7, zone réduite) — Choisir une eau naturellement légèrement acide pour créer un équilibrage compensateur. Exemples : Mont Roucous (pH 5.8), Montcalm (pH 6.5). But symbolique : éviter le renforcement excessif du pôle alcalin, favoriser la neutralité dynamique. || TERRAIN ESTIMÉ ACIDE (pH simulé < 7, zone oxydée) — Choisir une eau plus neutre ou légèrement alcaline. Exemples : eaux bicarbonatées légères, eaux à pH 7-7.5. But : soutien de la stabilité électrolytique. || TERRAIN ÉQUILIBRÉ — Base standard : Mont Roucous + NaCl 0,9%. || IMPORTANT : cette logique est une stratégie d'équilibrage symbolique interne au système Axis Lumen. Le pH corporel réel n'est pas directement mesurable sans analyse biologique. Ce protocole ne constitue pas une correction biologique démontrée ni un acte médical." },
          { title:"5. Fréquences initiatiques de rajeunissement — liste complète", content:"Ces fréquences sont utilisées en écoute active, en diapason, ou en diffusion pendant les exercices. Cadre expérimental et symbolique — elles ne constituent pas un traitement médical. || 7,83 Hz — Résonance de Schumann — Ancrage bio-rythmique terrestre, synchronisation circadienne. || 40 Hz — Gamma — Neuroplasticité, cohérence neuronale, activation des processus de régénération cérébrale. || 136,1 Hz — OM cosmique — Accord avec le rythme terrestre annuel, cohérence des systèmes autonomes. || 174 Hz — Fondation cellulaire — Soutien de l'intégrité tissulaire, libération des tensions chroniques. || 285 Hz — Mémoire cellulaire de l'intégrité — Régénération tissulaire symbolique, rappel du schéma optimal. || 396 Hz — Libération — Dissolution des résistances de terrain, libération des blocages énergétiques. || 432 Hz — Accord naturel — Cohérence cardiovasculaire, harmonisation des rythmes biologiques. || 528 Hz — Cohérence ADN — Transformation, activation des processus de réparation, ton de la lumière verte. || 639 Hz — Harmonisation — Équilibre du système nerveux autonome, cohérence des relations cellulaires. || 741 Hz — Expression cellulaire — Clarification, résolution des perturbations de terrain. || 852 Hz — Intuition profonde — Retour à l'ordre naturel, activation de la conscience cellulaire. || 963 Hz — Connexion universelle — Cohérence du champ, activation de la mémoire profonde. || Dans le système Axis Lumen : DO (261 Hz) — ancrage ; MI (329 Hz) — transformation ; SOL (392 Hz) — régénération ; LA (440 Hz) — cohérence vibratoire." },
          { title:"6. Exercices initiatiques de rajeunissement cellulaire", content:"EXERCICE 1 — Balancement gyroscopique de régénération (20 min) : Balancement rotation lent (40 BPM) avec mantra ILLI·ALLA en alternance. Ce rythme oscillatoire amplifie le flux du LCR dans toute la colonne vertébrale, stimulant la circulation des liquides nourriciers vers chaque vertèbre et chaque disque. Synchroniser avec la fréquence 285 Hz diffusée en fond sonore. || EXERCICE 2 — Tensions statiques axe de régénération (15 min) : Séquence spécifique — abdomen (45 sec), poitrine (45 sec), crâne (15 sec max). Relâchement attentif entre chaque tension : observer la chaleur, les vibrations, les rémanences lumineuses. Ces tensions amplifient la pulsation du LCR dans les zones les plus actives métaboliquement. Synchroniser avec la fréquence 528 Hz. || EXERCICE 3 — Respiration complète de régénération (10 min) : 5 temps — abdomen (gonfler, 4 sec), flancs (ouvrir, 3 sec), thorax (élever, 3 sec), clavicules (dégager, 2 sec), expiration totale (8 sec). Ratio I:E = 1:2 pour activation parasympathique et détoxification cellulaire. || EXERCICE 4 — Eau informée rituelle (protocole d'intention) : Tenir le verre entre les deux paumes. Fixer l'eau 30 secondes avec l'intention : 'Que cette eau porte la mémoire de l'intégrité et de la régénération de chaque cellule.' Boire lentement, en pleine conscience, entre chaque exercice." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Théorie et intention", content:"Comprendre le principe du terrain bioélectronique. Préparer l'eau informée 0,9% NaCl. Poser l'intention de régénération." },
        { time:"10–20 min", title:"Respiration complète", content:"10 minutes de respiration complète 5 segments (4+3+3+2+8). Calibrer le souffle sur la fréquence 528 Hz diffusée." },
        { time:"20–40 min", title:"Balancement gyroscopique", content:"Rotation lente 40 BPM, ILLI·ALLA. Observer la chaleur dans la colonne et les rémanences lumineuses. Boire 100 ml d'eau informée." },
        { time:"40–55 min", title:"Tensions statiques axe régénération", content:"Abdomen → poitrine → crâne. Relâchement attentif après chaque. Fréquence 528 Hz. Eau informée entre les tensions." },
        { time:"55–60 min", title:"Intégration et carnet", content:"Immobilité 3 minutes. Boire les 150 ml restants avec intention rituelle de clôture. Écrire les perceptions dans le carnet." }
      ],
      contemplation:{
        duration:"5 minutes",
        question:"Quelle est la fréquence naturelle de votre corps quand il est en parfaite cohérence ?",
        guidance:"Fermez les yeux. Placez les mains sur le ventre. Respirez lentement. Imaginez chaque cellule de votre corps comme une petite lumière — brillante, stable, vibrante à sa fréquence propre. Restez dans cette image de cohérence totale. Ne cherchez pas à corriger quoi que ce soit — seulement à toucher la mémoire de l'intégrité déjà présente en vous."
      },
      practice:{
        name:"Protocole rajeunissement intégral — eau + fréquences + mouvement",
        duration:"45 minutes",
        intention:"Activer les processus naturels de régénération par la cohérence hydrique, fréquentielle et oscillatoire.",
        posture:"Assis pour les respirations et tensions. Rotation debout ou assis selon capacité physique.",
        steps:[
          "Préparer 250 ml d'eau faiblement minéralisée + 2,25 g de sel marin non raffiné (0,9%). Laisser reposer 10 min.",
          "Diffuser la fréquence 174 Hz dans l'espace pendant 5 minutes (préparation du terrain sonore).",
          "Respiration complète 5 segments — 10 cycles. Observer l'oxygénation progressive.",
          "Tenir le verre d'eau entre les paumes — intention rituelle 30 sec. Boire 100 ml lentement.",
          "Balancement rotation 40 BPM — 20 minutes. Mantra ILLI·ALLA. Fréquence 285 Hz diffusée.",
          "Tension abdomen — 45 sec. Relâchement 60 sec. Observer les rémanences lumineuses.",
          "Tension poitrine — 30 sec. Relâchement 60 sec. Observer la chaleur thoracique.",
          "Tension crâne — 15 sec maximum. Relâchement 2 minutes complètes. Fréquence 528 Hz.",
          "Immobilité 5 minutes. Laisser les fréquences travailler dans le silence.",
          "Boire les 150 ml restants avec intention de clôture. Carnet immédiat."
        ],
        adaptations:["Hypertension : éviter la tension crâne, se limiter aux points 3-4-5", "Grossesse : consulter un professionnel de santé avant tout ajustement hydrique", "Rein fragile : réduire le sel à 0,5% maximum"],
        safety:"Ce protocole est expérimental et non médical. Il ne remplace aucun suivi médical. Ne pas dépasser 0,9% NaCl. Toute personne sous traitement médical ou souffrant d'une condition chronique doit consulter son médecin avant toute modification de son hydratation."
      },
      journalQuestions:[
        "Avez-vous ressenti une différence de qualité avec l'eau salée informée par rapport à une eau ordinaire ?",
        "Quelles sensations physiques avez-vous observées pendant le balancement rotation avec la fréquence 285 Hz ?",
        "Comment estimez-vous votre terrain actuellement : plutôt acide, alcalin, ou équilibré ?"
      ],
      validation:[
        "Je comprends le principe d'ajustement du pH de l'eau selon le terrain estimé",
        "J'ai préparé et consommé l'eau informée 0,9% NaCl avec l'intention rituelle",
        "J'ai complété le protocole intégral (respiration + balancement + tensions) en une seule séance"
      ],
      references:["Bioélectronique de Vincent — Terrain et équilibre acide-base", "Neurophysiologie de la conscience — Recherches initiatiques", "Eau informée — Physique quantique et cohérence hydrique"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Rajeunissement cellulaire — eau + rotation + tensions",
        context:"Avec eau informée 0,9% NaCl préparée. Fréquence 285 Hz puis 528 Hz diffusées. Intention de régénération posée avant le début.",
        detente:5,
        objetContemplation:"sphère",
        balancement:{ type:"rotation", duree:20 },
        respiration:{ type:"complete", mesure:4, duree:10 },
        final:{ type:"tension", duree:5 },
        voix:false,
        cloche:true,
        tonalites:["DO","MI","SOL"]
      }
    },
    {
      id:"c117", number:113, order:117, unlockDays:30, symbol:"♒",
      familyId:"terrain", familyTitle:"Terrain vivant & alimentation",
      title:"Programme 12 mois — Calendrier initiatique intégral du Temple Vivant",
      subtitle:"Nettoyage des émonctoires, exercices quotidiens, alimentation et pratique selon le cycle saisonnier",
      summary:"Le calendrier complet de l'étudiant du Temple Vivant : pour chaque mois de l'année, un focus sur l'émonctoire prioritaire (5 Mouvements MTC), un protocole matinal de balancement et respiration, un régime alimentaire saisonnier, et une séquence vespérale de tensions statiques ou gyroscopiques. Un programme de vie initiatique complet fondé sur la cohérence entre cycles naturels et pratique intérieure.",
      tags:["calendrier","12 mois","émonctoires","alimentation","programme","intégral","saisonnier","MTC"],
      level:"Maîtrise", duration:"1 h",
      pedagogicalObjective:"Intégrer l'ensemble des pratiques de l'École dans un calendrier annuel structuré et cohérent.",
      initiaticObjective:"Vivre selon les rythmes naturels du corps et de l'année pour incarner progressivement l'état du Temple Vivant.",
      essentialPhrase:"Un mois à la fois, une saison à la fois — le Temple se construit par l'accumulation des jours.",
      teaching:{
        intro:"Ce calendrier est la synthèse vivante de tout l'enseignement de l'École du Temple Vivant. Il ne s'agit pas d'un programme à suivre parfaitement — il s'agit d'un guide de navigation annuelle. Chaque mois pointe vers un organe-émonctoire prioritaire selon la logique des 5 Mouvements (Médecine Traditionnelle Chinoise), une pratique matinale, une orientation alimentaire, et une séquence du soir. La règle d'or : la constance vaut mieux que la perfection. 20 minutes matin et soir, chaque jour, construisent plus que 2 heures le dimanche.",
        sections:[
          { title:"JANVIER — Reins / Émonctoire rénal — Jing profond (Hiver, Eau yin)", content:"ORGANE PRIORITAIRE : Reins + Vessie. Élément : Eau. Émotion à transformer : la peur → volonté et sagesse. || MATIN (25 min) : Balancement latéral doux 15 min (ILLI, 60 BPM). Respiration rectangulaire 5-5-5-5 — 10 min. Intention : 'Je nourris mes reins, je consolide mon Jing, je me ressource dans la profondeur de l'hiver.' || ALIMENTATION : Bouillon d'os ou de légumes racines (minéralisant). Légumes noirs et bleus : haricots noirs, algues marines (wakamé, nori), betterave. Réduction du sodium alimentaire ajouté, du café et de l'alcool. Hydratation prioritaire : eau tiède plate, eau NaCl 0,9% faiblement minéralisée. Tout cuisiner chaud et lentement — éviter absolument les aliments crus et froids en hiver. || SOIR (20 min) : Tensions statiques points 1-2-3 (orteils, genoux, hanches) — 30 sec chaque, relâchement 45 sec. Immobilité 10 min. Carnet : qualité du calme intérieur, sensations dans les reins et le bas du dos." },
          { title:"FÉVRIER — Reins / Immunité profonde — Consolidation du Jing (Hiver, Eau yang)", content:"ORGANE PRIORITAIRE : Reins + Glandes surrénales. Renforcement de l'immunité de fond. Émotion : consolider la volonté sans épuiser la substance vitale. || MATIN (30 min) : Balancement latéral alternant avec rotation lente — 20 min (ILLI puis ILLI·ALLA en transition). Respiration complète 5 segments — 10 min. Intention : 'Je protège mon feu intérieur. Je consolide ma vitalité essentielle.' || ALIMENTATION : Graines germées (alfalfa, lentilles, pois chiches). Champignons médicinaux : shiitake, maitake. Gingembre frais dans les préparations chaudes. Eau NaCl 0,9% faiblement minéralisée tiède. Éviter le surmenage et le manque de sommeil — ils épuisent le Jing des reins plus vite que toute alimentation ne peut le régénérer. || SOIR (25 min) : 7 tensions statiques complètes (10 sec chaque, rythme doux). Balancement mental après l'arrêt — imaginer le mouvement sans bouger physiquement. Carnet : niveau d'énergie vitale, qualité des rêves nocturnes." },
          { title:"MARS — Foie / Vésicule biliaire — Bois printanier (Printemps naissant)", content:"ORGANE PRIORITAIRE : Foie + Vésicule biliaire. Élément : Bois. Émotion à transformer : frustration, colère → créativité, vision, élan. || MATIN (30 min) : Balancement rotation 20 min (ILLI·ALLA, 40 BPM) — le mouvement circulaire active le drainage hépatique et la circulation du Qi du foie. Respiration dépurative (LA + DO×3) — 10 min. Intention : 'Je libère. Je circule. Je renouvelle mon regard sur la vie.' || ALIMENTATION : Draineurs hépatiques : artichaut (cuit), radis noir râpé, pissenlit (salade ou tisane), jus de citron à jeun. Légumes verts en abondance (brocoli, roquette, épinards). Réduction des graisses saturées et de l'alcool — repos hépatique prioritaire. Repas léger le matin, plus consistant le midi, léger le soir. Le foie aime la régularité des horaires. || SOIR (25 min) : Tensions statiques points 3-4-5 (hanches, abdomen, poitrine). Relâchement attentif. Balancement antéro-postérieur (fer à cheval) 10 min après les tensions — mouvement hépatique par excellence. Carnet : clarté mentale, projets créatifs, état de la vision." },
          { title:"AVRIL — Foie / Sang — Purification printanière (Bois yang)", content:"ORGANE PRIORITAIRE : Foie (purification du sang). Sang vivant, circulation. Émotion : transformer la frustration résiduelle en force créatrice dirigée. || MATIN (30 min) : Balancement antéro-postérieur (fer à cheval) 20 min, 45 BPM — rythme ample, plus lent que le latéral, accompagner le buste dans le mouvement comme un pendule. Respiration triangulaire 4-4-8 (LA-DO-FA) — 10 min. Intention : 'Mon sang circule librement. Ma vision est claire.' || ALIMENTATION : Jus de légumes verts frais (céleri, concombre, épinard). Chlorophylle liquide, spiruline (1 c. à café dans l'eau). Réduction du sucre raffiné et des sucres rapides. Légumes crus augmentés progressivement. Eau avec jus de citron chaque matin à jeun 15 min avant le petit-déjeuner. || SOIR (30 min) : 7 tensions statiques complètes (15 sec chaque). Balancement figure de huit 10 min après les tensions — activation croisée des deux hémisphères, intégration droite-gauche. Carnet : état de la peau (miroir du foie et du sang), rêves, énergie créative." },
          { title:"MAI — Rate / Estomac — Terre, digestion et assimilation (Fin de Printemps)", content:"ORGANE PRIORITAIRE : Rate + Pancréas + Estomac. Élément : Terre. Émotion à transformer : rumination, soucis → centrage, présence, confiance. || MATIN (25 min) : Balancement latéral doux 15 min (60 BPM, ILLI) — stabilité, ancrage, centrage. Respiration carrée 6-6-6-6 — 10 min. Intention : 'Je suis centré. Je digère la vie avec sérénité. J'assimile le bon de chaque expérience.' || ALIMENTATION : Cuisson longue et douce (soupes, ragoûts, mijotés). Céréales complètes : millet (tonique de la Rate en MTC), riz demi-complet, avoine. Légumes dorés et orangés : courge, carottes, patate douce. Réduction des aliments crus et des boissons froides — la Rate préfère la chaleur. Manger assis, lentement, sans écrans ni lecture. Horaires réguliers. || SOIR (20 min) : Tensions statiques points 3-4 (hanches et abdomen — axe digestif). Relâchement 60 sec chaque. Balancement vertical très lent 10 min. Carnet : qualité de la digestion, état de l'énergie après les repas, pensées ruminantes ou calme." },
          { title:"JUIN — Cœur / Intestin grêle — Feu d'été, joie et clarté (Été naissant)", content:"ORGANE PRIORITAIRE : Cœur + Intestin grêle. Élément : Feu. Émotion à transformer : joie excessive ou agitation → équilibre, légèreté juste, paix du cœur. || MATIN (30 min) : Balancement rotation 20 min, 40 BPM — ouverture du champ, expansion naturelle du Feu. Respiration de cohérence cardiaque : 5 sec inspiration + 5 sec expiration, régulière pendant 10 min. Intention : 'Mon cœur bat dans la paix. Ma joie est stable et rayonnante.' || ALIMENTATION : Fruits rouges : fraises, cerises, framboises (couleur Feu en MTC). Légères salades et légumes crus abondants. Réduction des protéines animales le soir. Pastèque, concombre, courgette — hydratants et rafraîchissants. Éviter les épices très chauffantes. Repas du soir léger, au moins 2h avant le coucher. || SOIR (25 min) : Tensions statiques points 5-6 (poitrine, épaules). Relâchement attentif — observer le rayonnement du plexus cardiaque. Activation lumineuse 10 min (observation source lumineuse douce + rémanence). Carnet : qualité du sommeil, des rêves, des relations interpersonnelles." },
          { title:"JUILLET — Triple Réchauffeur / Circulation — Feu maximal (Été plein)", content:"ORGANE PRIORITAIRE : Triple Réchauffeur + Maître du Cœur. Circulation générale, thermorégulation, vitalité maximale. Émotion : rayonnement sans épuisement — gérer l'expansion. || MATIN (35 min) : Balancement figure de huit 20 min (ILLI·ELLU, 40 BPM) — activation de la circulation croisée et du rayonnement. Respiration yoga 4-7-8 — 5 cycles. Respiration complète 5 segments — 5 cycles. Intention : 'Je rayonne. Je distribue la vie équitablement en moi et autour de moi.' || ALIMENTATION : 90% aliments frais et hydratants. Réduction stricte des fritures et grillades carbonisées. Myrtilles, mûres, baies variées (antioxydants). Herbes fraîches : menthe, basilic, coriandre. Eau fraîche NaCl 0,9% ou eau de coco naturelle. Deux repas légers plutôt qu'un seul lourd. || SOIR (30 min) : 7 tensions statiques complètes (20 sec chaque). Immobilité au seuil 15 min — observer les rémanences lumineuses et les images hypnagogiques. Balancement mental (imaginer la rotation sans bouger). Carnet : qualité de l'énergie dans la chaleur, signes de seuil." },
          { title:"AOÛT — Gros intestin / Métal précoce — Lâcher-prise et élimination (Fin d'Été)", content:"ORGANE PRIORITAIRE : Gros intestin. Élément : Métal naissant. Émotion à transformer : deuil, attachement → lâcher-prise, espace intérieur libéré. || MATIN (30 min) : Balancement antéro-postérieur (fer à cheval) 20 min, 45 BPM — activation du transit et de l'élimination par le mouvement du bassin. Respiration dépurative (LA + DO×3) — 10 min. Intention : 'Je lâche ce qui n'est plus. Je libère l'espace pour ce qui vient.' || ALIMENTATION : Aliments riches en fibres : psyllium blond (1 c. à soupe dans eau le matin), graines de lin broyées, légumineuses. Prébiotiques : oignons, ail, topinambour, asperges. Réduction du gluten et des farines blanches raffinées. Légumes-feuilles : épinards, blettes, chou kale. Eau NaCl 0,9%. Aliments lacto-fermentés : kombucha, kéfir végétal, choucroute crue. || SOIR (25 min) : Tensions statiques points 3-4-7 (abdomen, hanches, crâne). Balancement latéral rythmé 10 min après les tensions. Carnet : qualité du transit intestinal, état de la peau (émonctoire de suppléance), émotions de lâcher-prise." },
          { title:"SEPTEMBRE — Poumons / Peau — Métal, purification respiratoire (Automne naissant)", content:"ORGANE PRIORITAIRE : Poumons + Peau. Élément : Métal. Émotion à transformer : tristesse, mélancolie → détachement lumineux, discernement, respect de soi. || MATIN (30 min) : Balancement latéral 15 min (60 BPM, ILLI) — retour à la verticalité après l'expansion estivale. Respiration complète 5 segments — 15 min (augmenter la part de l'expiration). Intention : 'Je respire pleinement la vie. Chaque expiration libère ce qui doit partir pour toujours.' || ALIMENTATION : Aliments blancs et or (couleur Métal en MTC) : oignons, ail, poireaux, poires, navets, chou-fleur. Miel cru (soutien respiratoire et antimicrobien). Noix, amandes (oméga-3, vitamin E). Réduction des produits laitiers (ils surchargent les poumons et créent du mucus). Curcuma + poivre noir dans les plats. Eau tiède uniquement. || SOIR (25 min) : Tensions statiques points 5-6 (poitrine, épaules) + exercice de souffle : expiration active forcée en fin de séquence (vider complètement les poumons 3 fois). Balancement vertical lent 10 min. Carnet : capacité respiratoire, état émotionnel, tristesses à traverser." },
          { title:"OCTOBRE — Gros intestin / Terrain Acide-Base — Équilibre automnal (Métal yang)", content:"ORGANE PRIORITAIRE : Gros intestin (approfondissement) + Foie (second nettoyage automnal). Terrain acide-base. Émotion : intégrer les transformations de l'année avec grâce et gratitude. || MATIN (30 min) : Balancement rotation lent 20 min (40 BPM) — profondeur et intégration. Respiration triangulaire inversée (LA-DO×2-FA) — 10 min. Intention : 'J'intègre. Je digère l'expérience de l'année. Je prépare le sol de l'hiver.' || ALIMENTATION : Aliments lacto-fermentés en quantité : choucroute, kimchi, miso, tempeh. Pruneaux, figues, dattes (transit + minéraux). Réduction des viandes rouges et charcuteries. Légumes racines d'automne : panais, céleri-rave, betterave, topinambour. Bouillon de légumes quotidien. Eau NaCl 0,9% avec quelques gouttes de jus de citron. || SOIR (35 min) : 7 tensions statiques complètes (20 sec chaque, relâchement attentif). Balancement gyroscopique (rotation) 20 min lent vers l'immobilité. Seuil hypnagogique. Carnet : bilan partiel de l'année, intégration des apprentissages, intentions pour les 3 derniers mois." },
          { title:"NOVEMBRE — Reins / Surrénales — Retour vers le Jing (Hiver précoce, Eau)", content:"ORGANE PRIORITAIRE : Reins + Glandes surrénales. Retour progressif vers la profondeur hivernale. Émotion : reconnecter à la force intérieure profonde sans gaspillement d'énergie. || MATIN (30 min) : Balancement latéral 20 min en se réchauffant progressivement (ILLI, 60 BPM). Respiration complète — 10 min. Intention : 'Je rentre en moi. Je protège mon feu intérieur pour l'hiver. Je suis ma propre source.' || ALIMENTATION : Légumes racines abondants (betterave, panais, navet, carotte, céleri-rave). Bouillon de volaille ou légumes quotidien — reminéralisant. Réduction progressive de tous les aliments crus. Algues marines (iode, minéraux du grand fond). Sel de mer non raffiné dans la cuisine. Eau tiède NaCl 0,9%. Éviter les excitants en soirée. || SOIR (25 min) : Tensions statiques points 1-2-3-7 (bas du corps et crâne — axe Rein-Cerveau-LCR). Immobilité profonde 15 min. Observer les rémanences lumineuses et les premières images hypnagogiques du cycle hivernal. Carnet : rêves de profondeur, état des reins et du bas du dos, niveau d'énergie fondamentale." },
          { title:"DÉCEMBRE — LCR / Moelle / Axe central — Profondeur hivernale maximale (Solstice)", content:"ORGANE PRIORITAIRE : LCR, Moelle épinière, Axe central cerveau-colonne. Vaisseaux Gouverneur et Conception. Émotion : dissolution dans le silence créateur — gestation de l'être. || MATIN (35 min) : Balancement rotation très lent 25 min (38 BPM) — induire le seuil hypnagogique matinal, porte de la profondeur. Respiration rectangulaire 6-6-6-6 — 10 min. Intention : 'Je m'immerge dans le silence de l'hiver. Je prépare la graine du prochain cycle.' || ALIMENTATION : Repos digestif maximum — aliments légers, digestion facile. Bouillon de moelle osseuse (2-3 fois par semaine). Réduction de tous les stimulants : café, sucre, alcool. Eau NaCl 0,9% tiède avec une pincée de cannelle. Céréales à cuisson lente (bouillie de sarrasin, crème de riz). Favoriser les repas chauds, simples, en communauté ou en silence. || SOIR (45 min) : 7 tensions statiques complètes (20 sec chaque, relâchement profond et attentif). Balancement rotation 20 min vers l'immobilité consciente. Seuil hypnagogique maintenu — observer, ne pas s'endormir. Carnet : bilan annuel complet, gratitude pour l'année traversée, graines d'intention pour l'année suivante. || NUIT DU SOLSTICE (21-22 décembre) — Séance spéciale annuelle de 60 minutes : 7 tensions complètes + balancement rotation 30 min + immobilité au seuil 15 min. Eau informée NaCl 0,9% avec intention de renouveau pour le cycle suivant. Cette séance marque la renaissance symbolique du cycle." }
        ]
      },
      minutePlan:[
        { time:"0–10 min", title:"Vue d'ensemble du calendrier", content:"Présentation des 12 mois, des 5 Mouvements MTC, et de la logique saisonnière des pratiques. Identifier le mois en cours." },
        { time:"10–20 min", title:"Lecture du mois en cours", content:"Lire en détail la section correspondant au mois actuel : organe, pratique, alimentation. Planifier les ajustements concrets." },
        { time:"20–50 min", title:"Séance pilote du mois en cours", content:"Pratiquer la séquence complète du mois actuel — balancement recommandé + respiration + tensions. Durée réelle 30 min." },
        { time:"50–60 min", title:"Mise en place du carnet annuel", content:"Créer la page mensuelle du carnet : organe, pratique du matin, pratique du soir, alimentation, observations. Format à répliquer 12 fois dans l'année." }
      ],
      contemplation:{
        duration:"7 minutes",
        question:"Dans quelle saison intérieure êtes-vous actuellement — et la saison de votre pratique lui correspond-elle ?",
        guidance:"Fermez les yeux. Ressentez votre énergie du moment sans la juger. Est-elle printanière (élan, désir d'expansion) ? Estivale (chaleur, rayonnement, socialité) ? Automnale (récolte, lâcher-prise, mélancolie douce) ? Hivernale (besoin de profondeur, de silence, de ressourcement) ? Il n'y a pas de bonne réponse — seulement une honnêteté avec soi-même. Votre pratique devrait correspondre à ce que ressent votre corps, pas seulement au calendrier officiel."
      },
      practice:{
        name:"Séance d'inauguration du calendrier annuel",
        duration:"30 minutes",
        intention:"Pratiquer la séquence intégrale du mois en cours comme engagement d'entrée dans le programme annuel du Temple Vivant.",
        posture:"Adapté au mois en cours — voir la section correspondante dans le cours.",
        steps:[
          "Identifier le mois en cours et relire attentivement sa section dans ce cours.",
          "Préparer l'espace : eau NaCl 0,9% faiblement minéralisée, source lumineuse si disponible, carnet à portée.",
          "MATIN (ou simulation) : pratiquer le balancement recommandé pour ce mois, à la durée indiquée.",
          "Pratiquer la respiration recommandée pour ce mois, à la durée indiquée.",
          "SOIR (ou simulation) : pratiquer les tensions statiques recommandées pour ce mois.",
          "Immobilité finale selon la durée indiquée pour le mois.",
          "Écrire dans le carnet : date d'entrée dans le programme, engagement personnel sur 12 mois, première observation du mois."
        ],
        adaptations:["Débutant : commencer par le balancement seulement (5 min le matin) et une seule tension (le soir). Ajouter un élément par semaine.", "Avancé : respecter les durées complètes dès le premier mois.", "Très chargé : 10 minutes matin + 10 minutes soir minimum — la constance prime sur la durée."],
        safety:"Ce programme est un guide de navigation, pas une contrainte absolue. En cas de maladie aiguë : repos complet prioritaire, pas de tensions statiques. Reprendre progressivement dès l'amélioration. En cas de déménagement, voyage ou événement majeur : simplifier la pratique, ne pas abandonner complètement."
      },
      journalQuestions:[
        "Quel mois du calendrier vous inspire le plus d'enthousiasme ? Lequel vous résiste le plus — et pourquoi ?",
        "Avez-vous déjà observé une corrélation naturelle entre les saisons et votre état d'énergie ou de santé ?",
        "Quel est votre plus grand obstacle à la pratique quotidienne — le temps, la motivation, la discipline ou autre chose ?"
      ],
      validation:[
        "Je peux citer l'organe prioritaire, la pratique matinale et la pratique du soir pour le mois en cours",
        "J'ai complété la séance pilote du mois en cours et noté mes observations",
        "J'ai créé la page mensuelle de mon carnet annuel du Temple Vivant"
      ],
      references:["Médecine Traditionnelle Chinoise — 5 Mouvements et correspondances saisonnières", "Naturopathie — Nettoyage des émonctoires selon les cycles naturels", "Les Tensions Statiques — Méthode du Temple Vivant", "Expériences initiatiques — Archives de la tradition"],
      pdfPath:"", pdfPremium:true,
      preprogrammedSession:{
        label:"Calendrier du Temple — séance complète du mois",
        context:"Pratique intégrale selon la saison en cours. Adapter le balancement et la respiration à la section du mois actuel dans ce cours.",
        detente:5,
        objetContemplation:"sphère",
        balancement:{ type:"rotation", duree:20 },
        respiration:{ type:"complete", mesure:5, duree:12 },
        final:{ type:"tension", duree:7 },
        voix:false,
        cloche:true,
        tonalites:["DO","RE","MI","FA","SOL","LA","SI"]
      }
    },
    {
      id:"c118", number:114, order:118, unlockDays:4, symbol:"△",
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
      id:"c119", number:115, order:119, unlockDays:4, symbol:"△",
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
  // Images manuelles : ces cours ont une image spécifique, ne pas écraser
  var MANUAL_COVER = {
    "c002": "assets/courses/course-002/cerveau-anatomie.png"
  };

  window.AXIS_ONE_HOUR_COURSES.forEach(function (c) {
    var n = Math.min(Math.floor(Number(c.number)), 112);
    if (n < 1) n = 1;
    var pad = String(n).padStart(3, "0");
    var base = "assets/courses/course-" + pad;
    var pfx  = "course-" + pad;
    var manualCover = MANUAL_COVER[c.id];

    // Si le cours a déjà une image PNG personnalisée, ne pas écraser
    if (!manualCover && c.image && c.image.endsWith(".png")) return;

    c.image      = manualCover || base + "/cover.webp";
    c.coverImage = manualCover || base + "/cover.webp";
    c.images     = {
      cover:       manualCover || base + "/cover.webp",
      pedagogical: [
        base + "/" + pfx + "-image-02.webp",
        base + "/" + pfx + "-image-03.webp",
        base + "/" + pfx + "-image-04.webp"
      ]
    };
  });

})();
