/* Axis Lumen Studio — Enrichissement premium — Partie 4 (cours 73-119)
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  function enrich(id, data) {
    var list = window.AXIS_ONE_HOUR_COURSES || [];
    var c = list.find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  // ── C073 — Lecture des sensations subtiles ─────────────────────────────────
  enrich("c073", {
    longSummary: "Les sensations subtiles sont ces légères variations du champ corporel qui surviennent en présence de certaines personnes, lieux ou objets : un léger fourmillement dans la main, une chaleur localisée dans la poitrine, une contraction imperceptible du plexus solaire. Ces sensations sont réelles — mesurables en principe par des capteurs suffisamment sensibles — mais elles nécessitent un niveau d'attention et de discrimination que la plupart des gens n'ont pas développé.\n\nCe cours enseigne comment 'lire' ces sensations subtiles : comment distinguer une sensation issue de l'environnement (perception) d'une sensation issue de son propre état (projection), comment calibrer l'intensité (fort/faible/absent), comment noter sans interpréter, et comment construire progressivement un 'dictionnaire personnel' des correspondances entre sensations et types d'informations.",
    pedagogicalObjective: "Développer la lecture des sensations subtiles en distinguant perception de projection et en construisant un dictionnaire personnel de correspondances.",
    initiaticObjective: "Faire de son corps un instrument de précision — pas en l'améliorant techniquement mais en l'écoutant avec plus de finesse.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Scanner corporel baseline. Note l'état de chaque zone. Tu cherches les variations par rapport à ce baseline dans l'heure qui suit." },
      { time: "5–15 min",  title: "Enseignement",  content: "Sensations subtiles : définition, exemples, différenciation perception/projection. Échelle d'intensité. Dictionnaire personnel." },
      { time: "15–45 min", title: "Pratique",      content: "5 objets de nature différente posés devant toi (minéral, végétal, tissu, métal, papier avec texte). Main ouverte au-dessus de chaque : 3 min par objet. Note les sensations brutes." },
      { time: "45–55 min", title: "Analyse",       content: "Compare les sensations pour les 5 objets. Y a-t-il des patterns ? Quelles zones du corps répondent le plus ?" },
      { time: "55–60 min", title: "Carnet",        content: "Début du dictionnaire personnel : 3 sensations avec leur correspondance probable." }
    ],
    keyPhrase: "Le corps est un texte — apprendre à le lire, c'est apprendre une langue que tu portais depuis toujours.",
    journalQuestions: [
      "As-tu des sensations corporelles récurrentes dans certaines situations — une chaleur, un fourmillement, une contraction — que tu n'avais jamais reconnues comme perceptions ?",
      "Quelles zones de ton corps semblent 'parler' le plus dans ces exercices — les mains, le plexus, la gorge ?",
      "Si tu avais un 'capteur corporel' le plus fiable pour percevoir les personnes, les lieux ou les situations, quelle serait cette zone ?"
    ]
  });

  // ── C074 — Communication animale ──────────────────────────────────────────
  enrich("c074", {
    longSummary: "La communication avec les animaux par le ressenti n'est pas de la fantasie romantique — c'est une compétence qui se développe avec des outils précis et une discipline rigoureuse. Les animaux communiquent continuellement par des signaux émotionnels, corporels et énergétiques que la plupart des humains ont appris à ignorer. Un praticien du clair-ressenti peut commencer à les percevoir — à condition de respecter trois règles fondamentales : présence (pas de distraction mentale), sobriété (pas de projection anthropomorphique), et vérification (ne pas prendre ses désirs pour des messages).\n\nCe cours est une introduction éthique et sobre à la communication animale : comment entrer en contact par le ressenti, comment distinguer ce qui vient de l'animal de ce qu'on lui prête, et comment gérer les informations reçues avec responsabilité. Il n'y a pas de promesse ici — seulement des outils honnêtes et une invitation à l'expérimentation rigoureuse.",
    pedagogicalObjective: "Pratiquer une communication animale sobre et éthique par le ressenti, en respectant les trois règles fondamentales.",
    initiaticObjective: "Sortir de l'anthropocentrisme pour s'ouvrir à des formes de conscience différentes — avec humilité et curiosité.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Pense à un animal que tu connais bien (ton animal, un ami de nature). Comment il se tient, comment il te regarde. Il communique déjà." },
      { time: "5–15 min",  title: "Enseignement",  content: "Communication animale éthique : les trois règles. La projection anthropomorphique. Comment distinguer message et fabrication." },
      { time: "15–45 min", title: "Pratique",      content: "Si animal présent : 10 min d'observation silencieuse + 15 min de contact par le ressenti + 5 min de notes. Si animal absent : travail sur photo." },
      { time: "45–55 min", title: "Vérification",  content: "Quelles informations reçues peuvent être vérifiées par le comportement de l'animal dans les 24h suivantes ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note brute de l'expérience. Ne conclus pas encore. Observe sur 24h." }
    ],
    keyPhrase: "L'animal ne ment pas — mais l'humain qui l'interprète peut lui faire dire ce qu'il voudrait entendre.",
    journalQuestions: [
      "As-tu déjà eu la certitude que tu 'comprenais' ce qu'un animal voulait ou ressentait — et comment as-tu vérifié cette compréhension ?",
      "Quelle qualité de présence te demande la communication animale que ta vie ordinaire ne te demande pas ?",
      "Si tu pouvais communiquer vraiment avec un animal que tu connais, que voudrais-tu lui transmettre — et que voudrait-il te dire ?"
    ]
  });

  // ── C075 — Communication végétale et présence ─────────────────────────────
  enrich("c075", {
    longSummary: "Les plantes ne communiquent pas de la même façon que les animaux — leur registre est plus lent, plus diffus, plus chimique. Mais elles communiquent : par des signaux électriques dans leurs tissus (documentés scientifiquement), par des émissions chimiques volatiles, et selon certaines recherches, par des champs de biophotons. Un praticien développé peut commencer à percevoir ces signaux — non pas comme des 'paroles' mais comme des qualités de présence, de vitalité ou de besoin.\n\nCe cours enseigne comment s'approcher d'une plante avec la qualité de présence qui permet cette perception : lenteur, respiration douce, attention flottante, absence d'attente. C'est moins une technique qu'une attitude — l'attitude du jardinier attentif qui perçoit avant d'agir, et dont les soins sont guidés par cette perception.",
    pedagogicalObjective: "Développer une qualité de présence spécifique permettant de percevoir les signaux de vitalité et de besoin du monde végétal.",
    initiaticObjective: "S'ouvrir à la conscience végétale comme forme d'intelligence ancienne — non pour la 'lire' mais pour s'accorder à elle.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Approche une plante ou une fleur. Arrête-toi à 50cm. Respire. Ne fais rien pendant 1 minute. Laisse la plante t'accueillir." },
      { time: "5–15 min",  title: "Enseignement",  content: "La communication végétale : signaux électriques, émissions chimiques, biophotonique. L'attitude du jardinier attentif." },
      { time: "15–45 min", title: "Pratique",      content: "10 min d'observation silencieuse d'une plante → 10 min avec paume à 5cm sans contact → 10 min avec contact léger d'un doigt → 5 min de retrait et observation de l'état corporel." },
      { time: "45–55 min", title: "Ressenti",      content: "Qu'as-tu perçu dans les différentes distances ? La plante te semblait-elle indifférente, présente, heureuse, stressée ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note l'état de la plante (apparence, santé) et les sensations perçues. Reviens dans 3 jours : a-t-elle changé ?" }
    ],
    keyPhrase: "La plante ne répond pas à tes questions — elle répond à ta présence.",
    journalQuestions: [
      "As-tu des plantes chez toi ? Te souviens-tu d'une plante qui a prospéré ou dépéri en lien avec ton propre état à ce moment-là ?",
      "Quelle qualité de présence la communication avec les plantes te demande que tu n'as généralement pas dans ta vie ?",
      "Si les plantes pouvaient choisir d'être proches de toi ou loin, que choisiraient-elles actuellement ?"
    ]
  });

  // ── C076 — Dialogue avec le vivant par la lumière ─────────────────────────
  enrich("c076", {
    longSummary: "Utiliser la lumière intérieure comme pont de communication est une idée audacieuse — mais elle repose sur un mécanisme réel. La biophotonique documentée par des biologistes comme Fritz-Albert Popp montre que les organismes vivants émettent et absorbent des photons de façon cohérente. Cette 'communication lumineuse' cellulaire est à la base de nombreux phénomènes de régulation biologique.\n\nCe cours explore une pratique expérimentale : pendant la rémanence lumineuse, orienter la conscience vers un être vivant (animal ou plante) et observer ce qui se passe dans l'état intérieur. Pas de certitude, pas de système — seulement l'expérimentation rigoureuse et la notation honnête. Certains pratiquants rapportent des synchronicités frappantes. D'autres ne perçoivent rien. Les deux expériences sont également valides et instructives.",
    pedagogicalObjective: "Expérimenter rigoureusement l'utilisation de la lumière intérieure comme pont de contact avec d'autres formes de vie.",
    initiaticObjective: "S'ouvrir à la possibilité que la lumière de conscience soit un médium de communication — sans y croire aveuglément ni le rejeter sans l'avoir testé.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Choisis l'être vivant avec lequel tu vas travailler : un animal présent, une plante, un arbre dehors, une personne aimée." },
      { time: "5–15 min",  title: "Enseignement",  content: "Biophotonique et communication lumineuse entre organismes. Le cadre expérimental. Les précautions éthiques." },
      { time: "15–40 min", title: "Pratique",      content: "Observation 5 min → rémanence 10 min → dans la trace, orienter doucement la conscience vers l'être choisi → rester 20 min en attente ouverte." },
      { time: "40–55 min", title: "Notation",      content: "Note précise de tout ce qui s'est passé : sensations, images, certitudes, rien. Toutes les réponses sont des données." },
      { time: "55–60 min", title: "Clôture",       content: "Remercie l'être avec lequel tu as travaillé. Reviens à toi-même. Aucune conclusion hâtive." }
    ],
    keyPhrase: "La lumière comme langage universel — une hypothèse à tester, pas une certitude à croire.",
    journalQuestions: [
      "Qu'as-tu perçu pendant le travail avec l'être vivant choisi — quelque chose ou rien ? Les deux méritent d'être notés.",
      "Si la communication lumineuse était réelle et fiable, comment changerait-elle ta relation aux autres formes de vie ?",
      "Quel est ton niveau de scepticisme vis-à-vis de cette pratique — et ce scepticisme est-il productif ou paralysant ?"
    ]
  });

  // ── C077 — Ressenti des lieux et ambiances ─────────────────────────────────
  enrich("c077", {
    longSummary: "Chaque lieu a une 'qualité de présence' — une combinaison d'éléments mesurables (acoustique, luminosité, champs électromagnétiques, humidité, histoire) et d'éléments plus subtils (mémoire collective, intenions déposées, qualité de l'attention des personnes qui l'ont habité). Un praticien développé peut percevoir ces qualités directement par le ressenti corporel — avant même d'avoir analysé les éléments visibles.\n\nCe cours développe la capacité à 'lire' l'ambiance d'un lieu : comment entrer dans un espace avec une attention ouverte, comment distinguer sa propre émotion de la qualité du lieu, et comment utiliser cette information pour orienter ses décisions (où pratiquer, où vivre, où travailler). C'est une compétence pratique avec des applications concrètes dans la vie quotidienne.",
    pedagogicalObjective: "Développer la lecture de l'ambiance et de la qualité énergétique des lieux par le clair-ressenti corporel.",
    initiaticObjective: "Habiter les lieux consciemment — en percevant leur qualité avant de les juger, et en choisissant les espaces qui soutiennent ta pratique.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Dans quelle pièce pratiques-tu habituellement ? Quelle est la qualité de cet espace — quelle sensation il te donne avant même de commencer ?" },
      { time: "5–15 min",  title: "Enseignement",  content: "La mémoire des lieux. Les facteurs mesurables et subtils. Distinguer émotion personnelle et qualité du lieu." },
      { time: "15–40 min", title: "Pratique",      content: "Exercice en 3 espaces de ta maison ou de ton environnement proche : 5 min dans chaque, scanner corporel complet, note les différences." },
      { time: "40–55 min", title: "Comparaison",   content: "Compare les trois espaces. Quel espace soutient le mieux la pratique — et pourquoi selon toi ?" },
      { time: "55–60 min", title: "Carnet",        content: "Identifie et nomme l'espace optimal de ta pratique. Et l'espace à éviter si possible." }
    ],
    keyPhrase: "Tu n'es pas indépendant de l'espace que tu habites — tu le portes en toi et il te porte.",
    journalQuestions: [
      "Y a-t-il un lieu dans ta vie où tu te sens systématiquement mieux — plus centré, plus en paix ? Qu'est-ce qui crée cette qualité ?",
      "Y a-t-il un lieu que tu évites ou dans lequel tu te sens systématiquement moins bien ? Qu'est-ce que cela t'apprend ?",
      "Si tu pouvais choisir l'espace de vie idéal pour ta pratique, à quoi ressemblerait-il ?"
    ]
  });

  // ── C078 — Différencier intuition et projection ────────────────────────────
  enrich("c078", {
    longSummary: "La question la plus difficile dans tout développement perceptif est celle-ci : 'Est-ce que je perçois vraiment quelque chose, ou est-ce que je projette ce que je veux voir (ou ce que je crains) ?' Cette question n'a pas de réponse théorique satisfaisante — elle a une réponse pratique : un protocole de distinction rigoureux appliqué systématiquement, et les vérifications qui le valident ou l'infirment au fil du temps.\n\nCe cours donne le critère décisif de la distinction : une intuition authentique est généralement accompagnée d'un calme corporel, d'une absence de désir de résultat, et d'une qualité de 'déjà su'. Une projection est généralement accompagnée d'une légère agitation, d'un désir d'avoir raison, et d'une construction mentale visible. Ces critères sont imparfaits — mais ils sont les meilleurs outils disponibles, et leur utilisation régulière affine progressivement la discrimination.",
    pedagogicalObjective: "Maîtriser le critère décisif de distinction entre intuition authentique et projection mentale.",
    initiaticObjective: "Développer l'honnêteté envers ses propres perceptions comme acte fondamental d'intégrité spirituelle.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Rappelle-toi une intuition que tu avais eue et qui s'est avérée exacte. Comment la décrivais-tu à l'époque ? Calme ou agitation ?" },
      { time: "5–20 min",  title: "Enseignement",  content: "Les 5 critères de l'intuition authentique vs les 5 critères de la projection. Le test du calme corporel. Exercices de discrimination." },
      { time: "20–40 min", title: "Pratique",      content: "5 situations du quotidien (décisions à prendre) : pour chacune, noter l'état corporel associé à chaque option. L'option qui s'accompagne de calme vs celle qui s'accompagne d'agitation." },
      { time: "40–55 min", title: "Analyse",       content: "Y a-t-il une tendance dans tes projections récurrentes ? Quel domaine de ta vie est le plus pollué par elles ?" },
      { time: "55–60 min", title: "Carnet",        content: "Note 3 intuitions en cours (non vérifiables immédiatement) avec leur niveau de calme corporel associé. Vérifie dans 30 jours." }
    ],
    keyPhrase: "L'intuition authentique arrive dans le calme. La projection arrive dans l'agitation — même subtile.",
    journalQuestions: [
      "Peux-tu identifier une projection récente que tu as prise pour une intuition — et qu'est-ce qui t'a permis de la reconnaître rétrospectivement ?",
      "Dans quel domaine de ta vie tu projettes le plus (relations amoureuses, travail, famille) — et qu'est-ce qui alimente ces projections ?",
      "Si tu appliquais le test du calme corporel à toutes tes 'intuitions' pendant 30 jours, quelle serait la proportion d'authentiques vs projetées selon toi ?"
    ]
  });

  // ── C079 — Pratique quotidienne du clair-ressenti ─────────────────────────
  enrich("c079", {
    longSummary: "Le clair-ressenti ne se développe pas pendant les séances formelles — il se développe dans la pratique continue, dans le quotidien, dans les micro-moments d'attention au ressenti corporel pendant les interactions ordinaires. La séance formelle est la salle de musculation ; le quotidien est le terrain de jeu où la compétence s'exprime vraiment.\n\nCe cours intègre le clair-ressenti dans la vie ordinaire à travers des micro-pratiques : le scan avant de prendre une décision importante, l'attention au corps en rencontrant quelqu'un de nouveau, l'observation des variations de ressenti dans différents environnements. Ces pratiques sont invisibles, gratuites, ne demandent que quelques secondes — et elles transforment progressivement chaque interaction en occasion d'affiner la perception.",
    pedagogicalObjective: "Intégrer le clair-ressenti dans la vie quotidienne à travers des micro-pratiques continues et vérifiables.",
    initiaticObjective: "Faire de chaque interaction et de chaque lieu une occasion de pratiquer — et ne plus dissocier vie ordinaire et vie de pratique.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "Les 5 micro-pratiques du clair-ressenti quotidien. Comment les intégrer sans créer d'obsession ou de surinterprétation." },
      { time: "10–30 min", title: "Simulation",    content: "Simulation de 5 situations quotidiennes avec pratique du scan intégré : arriver chez quelqu'un, prendre une décision, entrer dans un magasin, rencontrer un inconnu, choisir un aliment." },
      { time: "30–50 min", title: "Planification", content: "Cartographie les 5 moments de demain où tu vas pratiquer le scan intégré. Note l'heure, la situation, ce que tu cherches à percevoir." },
      { time: "50–57 min", title: "Carnet",        content: "Note les 5 micro-pratiques prévues. Demain soir, reviens noter les résultats pour chacune." },
      { time: "57–60 min", title: "Clôture",       content: "Pratique du scan sur cet instant : comment te sens-tu maintenant ? Qu'est-ce que ce cours a changé dans ta façon de te percevoir ?" }
    ],
    keyPhrase: "Le praticien avancé n'a pas besoin de séance formelle — il est en pratique continue dans la vie ordinaire.",
    journalQuestions: [
      "Quelles sont les 5 situations quotidiennes que tu as identifiées comme opportunités de micro-pratique du clair-ressenti ?",
      "Qu'est-ce qui te semble le plus difficile dans l'idée d'une pratique continue — la distraction, le manque de temps, ou autre chose ?",
      "Si dans 6 mois ton clair-ressenti quotidien était aussi naturel que de voir avec les yeux, comment cela changerait-il ta vie ?"
    ]
  });

  // ── C080 — Contact avec les guides : cadre et prudence ────────────────────
  enrich("c080", {
    longSummary: "Le contact avec des instances que l'on nomme 'guides', 'anges gardiens', 'présences supérieures' ou 'conscience élargie' est une expérience rapportée dans toutes les traditions spirituelles et par de nombreux pratiquants sérieux. Ce n'est pas le lieu de débattre de leur nature ontologique — la question pragmatique est celle-ci : si de telles instances existent, comment entrer en contact avec elles de façon sûre, sobre et vérifiable ?\n\nCe cours établit le cadre de sécurité absolu pour tout travail dans ce domaine : purification préalable du terrain (pas de substances, pas d'état altéré chimique), ancrage rigoureux dans le corps et le présent, critère de discernement (ce qui vient en amour et clarté vs ce qui vient en peur et confusion), et clôture systématique. Sans ce cadre, le travail avec les guides peut mener à des confusions graves. Avec ce cadre, il peut être l'une des dimensions les plus précieuses de la pratique.",
    pedagogicalObjective: "Établir le cadre de sécurité complet pour tout travail avec les guides ou instances supérieures — et ne jamais s'en écarter.",
    initiaticObjective: "Aborder le domaine des guides avec l'humilité d'un débutant et la rigueur d'un chercheur — non pas la crédulité d'un enthousiate.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Question importante : quelle est ta motivation pour ce travail ? Ce que tu espères trouver peut colorer ce que tu vas percevoir." },
      { time: "5–20 min",  title: "Enseignement",  content: "Le cadre de sécurité en 6 points. Le critère de discernement. Les confusions classiques. Les contre-indications absolues." },
      { time: "20–40 min", title: "Pratique",      content: "Première pratique d'ouverture dans le cadre : ancrage corporel → purification respiratoire → ouverture consciente → 10 min d'écoute ouverte → clôture rigoureuse." },
      { time: "40–55 min", title: "Évaluation",    content: "Qu'est-ce qui est venu ? Avec quelle qualité de présence — amour/clarté ou peur/confusion ? Le critère de discernement s'applique." },
      { time: "55–60 min", title: "Carnet",        content: "Note l'expérience. Appliquer le protocole de vérification sur 48h avant de tirer des conclusions." }
    ],
    keyPhrase: "Les guides authentiques ne demandent pas ta dévotion — ils demandent ton discernement.",
    journalQuestions: [
      "Quelle est ta conception actuelle des guides ou présences supérieures — et d'où vient cette conception ?",
      "As-tu déjà eu une expérience que tu pourrais appeler 'contact avec quelque chose de plus grand' ? Comment tu l'as vécue ?",
      "Le critère de discernement (amour/clarté vs peur/confusion) — est-il suffisamment net pour toi, ou as-tu besoin de l'affiner ?"
    ]
  });

  // ── C081 — Prière, demande claire et écoute ────────────────────────────────
  enrich("c081", {
    longSummary: "La prière efficace n'est pas une supplique — c'est un acte de communication conscient. Elle se compose de trois éléments : une présence (être vraiment là, pas en train de réciter machinalement), une demande claire (précise, formulée positivement, dans l'immédiat), et une écoute active (rester dans le silence après la demande pour accueillir ce qui vient). Ces trois éléments semblent simples — mais les pratiquer simultanément demande une discipline réelle.\n\nCe cours enseigne l'art de prier avec tout son être : comment se préparer à la prière (ancrage, respiration, mise en présence), comment formuler une demande qui soit vraiment une demande et pas une liste de courses, et comment tenir l'espace d'écoute après la demande sans le remplir d'attentes ou d'anxiété. La prière pratiquée dans ces conditions est l'un des actes les plus puissants que cette école propose.",
    pedagogicalObjective: "Pratiquer la prière consciente en trois phases — présence, demande claire, écoute active — comme outil de communication et de guidage.",
    initiaticObjective: "Expérimenter que la prière authentique est un dialogue, pas un monologue — et que la partie la plus importante est l'écoute.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Qu'est-ce que tu voudrais vraiment demander en ce moment — en une phrase simple, positive, concrète ? Note-la." },
      { time: "5–15 min",  title: "Enseignement",  content: "La prière en trois phases. Comment formuler une demande claire. L'art de l'écoute active. Les formes de prière à travers les traditions." },
      { time: "15–40 min", title: "Pratique",      content: "Préparation 5 min (ancrage, respiration, mise en présence) → demande formulée clairement → 20 min d'écoute active dans le silence." },
      { time: "40–55 min", title: "Réception",     content: "Qu'est-ce qui est venu pendant l'écoute ? Images, sensations, mots intérieurs, certitudes, silence. Tout noter sans juger." },
      { time: "55–60 min", title: "Carnet",        content: "La demande formulée + ce qui a été reçu en réponse. Vérification différée sur 48-72h." }
    ],
    keyPhrase: "La prière qui n'est pas suivie d'écoute est un monologue. La prière avec écoute est un dialogue.",
    journalQuestions: [
      "As-tu une pratique de prière — formelle ou informelle ? Comment décris-tu ce que tu fais pendant la prière ?",
      "Quelle est la demande que tu n'as pas encore osé formuler clairement — et pourquoi ?",
      "As-tu déjà eu l'expérience d'une 'réponse' à une prière — et comment tu l'as interprétée ?"
    ]
  });

  // ── C082-C087 : famille Guidance (résumés enrichis) ─────────────────────
  enrich("c082", {
    longSummary: "La question des défunts est l'une des plus délicates et des plus universellement présentes dans toutes les traditions humaines. Presque toutes les cultures ont développé des rituels de contact, de commémoration ou de communication avec les morts — ce qui suggère une expérience humaine fondamentale qui mérite d'être prise au sérieux. Ce cours aborde ce domaine avec deux qualités essentielles : le respect (ni fusion morbide ni refus craintif) et le discernement (distinguer ce qui vient vraiment de ce qu'on fabrique par le deuil ou le désir).",
    pedagogicalObjective: "Aborder le domaine des défunts avec respect et discernement, en tenant le double cap entre fusion et refus.",
    initiaticObjective: "Intégrer la continuité de la conscience au-delà de la mort corporelle comme horizon de la pratique — sans en faire une obsession.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "Les différentes conceptions culturelles des défunts. Le respect comme attitude fondamentale. Les deux erreurs : la fusion et le rejet." },
      { time: "10–40 min", title: "Pratique",      content: "Méditation de présence : dans le silence et l'ancrage corporel, ouvrir un espace de souvenir et de gratitude pour un défunt aimé — sans chercher de contact, juste être présent à sa mémoire." },
      { time: "40–55 min", title: "Intégration",   content: "Qu'est-ce que la présence à ce souvenir a éveillé — émotionnellement, perceptivement ? Comment distinguer émotion de deuil et perception réelle ?" },
      { time: "55–60 min", title: "Clôture",       content: "Clôture rituelle : remercier, fermer consciemment l'espace, revenir pleinement au présent et au corps." }
    ],
    keyPhrase: "Honorer les défunts ne signifie pas les rejoindre — cela signifie continuer à vivre avec leur héritage.",
    journalQuestions: [
      "As-tu vécu le deuil d'un être cher — et y a-t-il eu des expériences pendant ce deuil que tu n'as jamais partagées parce qu'elles te semblaient 'trop étranges' ?",
      "Quelle est ta conception personnelle de ce qui se passe après la mort — et d'où vient cette conception ?",
      "Y a-t-il un défunt dont tu voudrais 'honorer' la mémoire différemment que tu ne le fais actuellement ?"
    ]
  });

  enrich("c083", {
    longSummary: "La guidance est une pratique qui demande deux compétences rarement réunies : l'ouverture à recevoir des informations venant d'une source autre que le moi ordinaire, et la stabilité d'identité qui empêche de se dissoudre dans ce qui est reçu. Ces deux qualités sont en tension naturelle — trop d'ouverture crée confusion, trop de fermeture crée blocage. Ce cours enseigne comment les tenir ensemble.",
    pedagogicalObjective: "Pratiquer la guidance en maintenant l'équilibre entre ouverture à la réception et stabilité de l'identité personnelle.",
    initiaticObjective: "Être un canal sans être submergé — rester soi tout en laissant quelque chose de plus grand traverser.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "L'équilibre ouverture/stabilité. Les signes de dissolution de l'identité. Comment maintenir l'ancre pendant la guidance." },
      { time: "10–45 min", title: "Pratique",      content: "Guidance guidée en 3 phases : ancrage corporel profond (10 min) → ouverture et réception (20 min) → vérification de l'identité et clôture (10 min)." },
      { time: "45–57 min", title: "Évaluation",    content: "Étais-tu 'toi' pendant toute la guidance ? Y a-t-il eu des moments où tu t'es perdu — et comment tu es revenu ?" },
      { time: "57–60 min", title: "Clôture",       content: "Ancrage final : nom complet, date, lieu, sensation des pieds sur le sol." }
    ],
    keyPhrase: "La guidance n'efface pas celui qui guide — elle le révèle.",
    journalQuestions: [
      "T'est-il déjà arrivé de 'te perdre' dans une expérience spirituelle — et comment tu es revenu à toi-même ?",
      "Quelle est la différence entre être un canal et être dominé par quelque chose d'extérieur ?",
      "Comment développes-tu la stabilité d'identité nécessaire pour un travail de guidance fiable ?"
    ]
  });

  enrich("c084", {
    longSummary: "L'écriture automatique sobre — différente de la transe dissociative — est la pratique d'écrire sans censure préalable, en laissant la main aller sur le papier pendant que le mental observe plutôt qu'il ne dirige. Dans cet état, des informations qui n'étaient pas dans le flux conscient ordinaire peuvent émerger. Ce n'est pas de la magie — c'est de l'accès à des couches moins contrôlées de la conscience.",
    pedagogicalObjective: "Pratiquer l'écriture automatique sobre comme outil d'accès à des informations hors du flux conscient ordinaire.",
    initiaticObjective: "Découvrir que l'inconscient a quelque chose à dire — et lui donner un espace sécurisé pour le faire.",
    minutePlan: [
      { time: "0–5 min",   title: "Préparation",   content: "Carnet vierge, stylo. Ancrage corporel 2 min. Formuler : 'Je suis disponible pour ce qui veut s'écrire.'" },
      { time: "5–35 min",  title: "Écriture",      content: "30 minutes d'écriture continue sans s'arrêter. Ne pas relire pendant l'exercice. Ne pas censurer. Si rien ne vient — écrire 'rien ne vient' jusqu'à ce que quelque chose vienne." },
      { time: "35–50 min", title: "Lecture",       content: "Relis ce qui a été écrit avec l'œil d'un étranger bienveillant. Souligne ce qui te surprend." },
      { time: "50–57 min", title: "Analyse sobre",  content: "Parmi les phrases soulignées : laquelle semble la plus 'vraie' ou la plus importante ? Pourquoi ?" },
      { time: "57–60 min", title: "Clôture",       content: "Ferme le carnet. Ce qui est écrit est écrit. Tu y reviendras si nécessaire." }
    ],
    keyPhrase: "L'écriture automatique sobre ne te possède pas — elle t'écoute.",
    journalQuestions: [
      "Qu'est-ce qui t'a le plus surpris dans ce qui s'est écrit — et pourquoi était-ce surprenant ?",
      "Y a-t-il une phrase dans ton écriture automatique qui mérite d'être méditée plus longuement ?",
      "L'écriture automatique t'a-t-elle donné accès à quelque chose que tu savais mais n'avais pas encore formulé ?"
    ]
  });

  enrich("c085", {
    longSummary: "Les synchronicités — ces coïncidences signifiantes qui semblent trop précises pour être fortuites — sont l'un des phénomènes les plus universellement rapportés par les praticiens de toutes traditions. Jung leur a donné un nom et un cadre théorique, mais leur expérience est bien antérieure à toute théorie. Le problème n'est pas leur réalité — c'est leur interprétation. Entre celui qui voit des signes partout (apophénie) et celui qui n'en voit jamais (blindspot de perception), il y a un espace de discernement sobre à cultiver.",
    pedagogicalObjective: "Développer un protocole de tri des synchronicités : reconnaître les vraies, écarter les fabriquées, interpréter sans excès.",
    initiaticObjective: "Vivre dans un univers signifiant sans tomber dans la paranoïa du sens — trouver l'équilibre du chercheur sobre.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "Définition rigoureuse des synchronicités. Le spectre apophénie/blindspot. Les 3 critères d'une vraie synchronicité." },
      { time: "10–35 min", title: "Inventaire",    content: "Liste des 5 synchronicités les plus marquantes de ta vie. Pour chacune : appliquer les 3 critères." },
      { time: "35–50 min", title: "Analyse",       content: "Combien passent le test des 3 critères ? Que révèle l'analyse sur ton rapport aux signes ?" },
      { time: "50–57 min", title: "Carnet",        content: "Commence une section 'Synchronicités en observation' dans ton carnet." },
      { time: "57–60 min", title: "Clôture",       content: "Engagement : noter toute synchronicité pendant 30 jours. Ne jamais conclure dans les 24 premières heures." }
    ],
    keyPhrase: "Un signe n'est pas une preuve — mais il peut être une invitation à regarder plus attentivement.",
    journalQuestions: [
      "Rappelle-toi la synchronicité la plus marquante de ta vie. Passe-t-elle le test des 3 critères ?",
      "As-tu tendance à voir des signes partout ou à ne jamais en voir ? Lequel des deux biais est le plus présent chez toi ?",
      "Si l'univers t'envoyait un signe en ce moment, que serait-il — et comment tu ferais la différence entre une vraie réponse et ta propre projection ?"
    ]
  });

  enrich("c086", {
    longSummary: "L'ego est le gardien du moi — et comme tout gardien, il peut devenir tyran. Dans le travail de guidance, l'ego cherche à infiltrer les messages reçus avec ses propres peurs, désirs et biais. Le résultat : une 'guidance' qui confirme ce qu'on voulait entendre, qui flatte l'importance personnelle, ou qui alimente une vision du monde déjà existante. Identifier ces distorsions de l'ego dans la guidance est l'une des compétences les plus importantes — et les plus difficiles — que ce travail demande.",
    pedagogicalObjective: "Identifier les cinq principales distorsions de l'ego dans la guidance et développer les contre-mesures correspondantes.",
    initiaticObjective: "Cultiver l'honnêteté radicale envers soi-même comme fondement de toute guidance fiable.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "Les 5 distorsions de l'ego : confirmation de biais, inflation de l'importance personnelle, désir-comme-guidance, peur-comme-guidance, conformité sociale." },
      { time: "10–40 min", title: "Auto-audit",    content: "Reprends 3 guidances passées (notes de carnet) et identifie lesquelles des 5 distorsions y étaient présentes." },
      { time: "40–55 min", title: "Contre-mesures", content: "Pour chaque distorsion identifiée : quelle contre-mesure spécifique aurais-tu pu appliquer ?" },
      { time: "55–60 min", title: "Clôture",       content: "Un engagement d'honnêteté : 'Dans mes prochaines guidances, je vais vérifier systématiquement la distorsion ___ .'" }
    ],
    keyPhrase: "L'ego ne disparaît pas dans le travail spirituel — il apprend à se déguiser mieux. Apprends à le reconnaître quand même.",
    journalQuestions: [
      "Quelle est la distorsion de l'ego la plus présente dans ton travail de guidance — et comment elle se manifeste concrètement ?",
      "As-tu déjà reçu une guidance que tu savais être une projection mais que tu as acceptée quand même — parce qu'elle te convenait ?",
      "L'honnêteté radicale envers soi-même est souvent douloureuse — qu'est-ce qui te retient parfois de l'exercer pleinement ?"
    ]
  });

  enrich("c087", {
    longSummary: "La clôture d'une guidance est aussi importante que son ouverture — peut-être plus, car c'est elle qui garantit qu'on revient complètement dans la vie ordinaire avec ce qu'on a reçu, sans rester 'entre deux mondes'. Un rituel de clôture bien exécuté comprend cinq éléments : remerciement conscient (gratitude envers ce qui a été reçu), fermeture de l'espace (intention de refermer le canal), retour au corps (sensations physiques), ancrage dans le temps présent (date, lieu, nom), et engagement de vie (un geste concret dans les 24 heures).",
    pedagogicalObjective: "Maîtriser le rituel de clôture d'une guidance en cinq éléments pour un retour complet et intégré à la vie ordinaire.",
    initiaticObjective: "Honorer chaque guidance par une clôture rituelle — parce que ce qui commence a besoin d'une fin consciente pour être pleinement reçu.",
    minutePlan: [
      { time: "0–10 min",  title: "Enseignement",  content: "Les 5 éléments de la clôture. Pourquoi chacun est nécessaire. Les erreurs de clôture et leurs conséquences." },
      { time: "10–40 min", title: "Pratique",      content: "Guidance brève (20 min) suivie d'une clôture complète guidée étape par étape (10 min)." },
      { time: "40–55 min", title: "Évaluation",    content: "Comment te sens-tu après la clôture comparé à comment tu te sentais en fin de guidance ? La différence est mesurable." },
      { time: "55–60 min", title: "Carnet",        content: "Note le geste concret de vie que tu as choisi. Dans 24h : l'as-tu posé ?" }
    ],
    keyPhrase: "Une guidance sans clôture reste ouverte — et ce qui reste ouvert ne peut pas être intégré.",
    journalQuestions: [
      "Clôtures-tu habituellement tes guidances avec intention — ou tu passes directement à autre chose ? Qu'est-ce que cela indique ?",
      "Quel est le geste concret que tu as choisi pour intégrer cette guidance dans ta vie réelle ?",
      "La clôture rituelle te semblait-elle artificielle ou naturelle — et qu'est-ce que cette réaction révèle ?"
    ]
  });

  // ── Famille Télépathie C088-C095 (enrichissements condensés) ─────────────
  var telepathieData = [
    { id:"c088", title:"Télépathie : bases expérimentales",
      summary:"La télépathie comme sujet de recherche sérieuse : protocoles de Ganzfeld, études de Daryl Bem, méta-analyses de parapsychologie. Les résultats sont modestes mais statistiquement significatifs — ce qui est suffisant pour justifier une exploration rigoureuse.",
      phrase:"La télépathie n'est pas prouvée de façon définitive — mais elle est suffisamment documentée pour mériter d'être expérimentée avec rigueur."
    },
    { id:"c089", title:"Émettre une image simple",
      summary:"Le protocole d'émission : choisir une image géométrique simple (carré, cercle, triangle), la former clairement dans l'imagination, l'envoyer avec intention calme et répétée. Pas d'effort spectaculaire — juste une présence focalisée et silencieuse.",
      phrase:"Émettre clairement, c'est former l'image avec précision — pas avec intensité."
    },
    { id:"c090", title:"Recevoir sans inventer",
      summary:"La réception télépathique est l'art de rester ouvert sans projeter. Les premières images qui viennent avant l'analyse sont les plus fiables. La sur-interprétation est l'ennemi principal de la réception authentique.",
      phrase:"Reçois la première image — avant que le mental n'ait le temps de la corriger."
    },
    { id:"c091", title:"Travail à deux : protocole et carnet",
      summary:"Travailler en binôme avec un protocole double-aveugle : l'émetteur choisit son image sans que le receveur ne soit présent, le receveur note ses impressions sans connaître l'image, puis on compare. Le carnet est la mémoire collective de l'expérimentation.",
      phrase:"Le protocole double-aveugle transforme une expérience en expérimentation."
    },
    { id:"c092", title:"Télékinésie : cadre de recherche et prudence",
      summary:"La télékinésie — action de la pensée sur la matière — est le domaine le plus contesté et le plus exposé aux fraudes. Ce cours établit un cadre de recherche rigoureux pour les expériences de micro-télékinésie (générateurs de nombres aléatoires) et pose les limites éthiques claires.",
      phrase:"Chercher à influencer la matière par la pensée n'est pas impossible — c'est juste très difficile à séparer du hasard."
    },
    { id:"c093", title:"Micro-intentions et observation",
      summary:"Les micro-intentions sur des systèmes aléatoires sont le terrain de recherche le plus prometteur pour les effets de la conscience sur la matière. Ce cours présente les protocoles de test accessibles et comment évaluer les résultats statistiquement.",
      phrase:"Une micro-intention n'est pas une pensée magique — c'est une hypothèse à tester."
    },
    { id:"c094", title:"Statistiques simples et vérification",
      summary:"Comprendre les statistiques de base (p-value, effet de taille, nombre d'essais nécessaires) est indispensable pour évaluer honnêtement les résultats de ses expériences de perception ou d'influence. Ce cours rend ces outils accessibles sans formation mathématique.",
      phrase:"Sans statistiques, on ne peut pas distinguer talent et chance — avec statistiques, on peut commencer à savoir."
    },
    { id:"c095", title:"Éthique des capacités extrasensorielles",
      summary:"Les capacités extrasensorielles, si elles existent et se développent, créent des responsabilités éthiques réelles : consentement de l'autre pour tout travail télépathique, confidentialité des perceptions, refus d'utiliser la guidance pour manipuler, honnêteté sur les limites de la fiabilité.",
      phrase:"Une capacité perceptive qui n'est pas accompagnée d'une éthique proportionnelle est une capacité dangereuse."
    }
  ];

  telepathieData.forEach(function(d) {
    enrich(d.id, {
      longSummary: d.summary + "\n\nCe cours s'inscrit dans une démarche de chercheur sobre : ni croyance aveugle ni rejet dogmatique, mais expérimentation rigoureuse, notation systématique, vérification honnête et éthique claire. C'est dans cet esprit que les capacités authentiques se développent.",
      pedagogicalObjective: "Maîtriser le protocole expérimental spécifique à " + d.title + " et l'appliquer avec rigueur.",
      initiaticObjective: "Être un chercheur de vérité intérieure — rigoureux, humble, ouvert et éthique.",
      minutePlan: [
        { time:"0–5 min", title:"Seuil", content:"Rappel de l'attitude du chercheur : ni croire ni rejeter — expérimenter." },
        { time:"5–20 min", title:"Enseignement", content:"Protocole spécifique, contexte de recherche, exemples documentés." },
        { time:"20–45 min", title:"Pratique", content:"Expérimentation guidée avec le protocole enseigné." },
        { time:"45–55 min", title:"Analyse", content:"Évaluation sobre des résultats. Qu'est-ce qui a fonctionné ? Qu'est-ce qui n'a pas fonctionné ?" },
        { time:"55–60 min", title:"Carnet", content:"Notes rigoureuses pour le carnet de recherche." }
      ],
      keyPhrase: d.phrase,
      journalQuestions: [
        "Quelle a été ta principale découverte dans cette expérimentation — même si c'est la découverte que cela n'a pas fonctionné ?",
        "Qu'est-ce qui distingue ce travail d'une simple curiosité, et qu'est-ce qui lui donne une valeur dans ta pratique globale ?",
        "Si tu devais partager tes résultats avec un scientifique sceptique, comment les présenterais-tu honnêtement ?"
      ]
    });
  });

  // ── Famille Protection C096-C103 (enrichissements condensés) ─────────────
  var protectionData = [
    { id:"c096", title:"Protection énergétique du corps",
      phrase:"La meilleure protection n'est pas un bouclier — c'est un centre habité et lumineux."
    },
    { id:"c097", title:"Nettoyage du lieu",
      phrase:"Un lieu nettoyé physiquement et intentionnellement est un espace de pratique amplifié."
    },
    { id:"c098", title:"Prière de protection",
      phrase:"La prière de protection ne demande pas à être protégé de la vie — elle demande à la traverser avec intégrité."
    },
    { id:"c099", title:"Vertus comme armure intérieure",
      phrase:"La véritable protection vient de l'intérieur : un être vertueux n'attire pas les influences qu'il ne porte pas en lui."
    },
    { id:"c100", title:"Couper les charges relationnelles",
      phrase:"Couper un lien parasitaire n'est pas abandonner l'autre — c'est se reconnecter à soi pour pouvoir donner vraiment."
    },
    { id:"c101", title:"Se recentrer après un soin ou un échange",
      phrase:"Donner de l'énergie sans se recentrer ensuite, c'est se vider au lieu de servir."
    },
    { id:"c102", title:"Eau, sel, lumière et intention",
      phrase:"L'eau, le sel et la lumière sont les trois outils de purification les plus simples et les plus puissants."
    },
    { id:"c103", title:"Rituel quotidien de protection",
      phrase:"Un rituel de protection quotidien n'est pas de la superstition — c'est de l'hygiène énergétique."
    }
  ];

  protectionData.forEach(function(d) {
    enrich(d.id, {
      longSummary: "La protection énergétique est un domaine qui oscille entre deux écueils : la naïveté qui ignore les influences subtiles réelles, et la paranoïa qui en voit partout. Ce cours " + d.title + " vous donne des outils concrets, testables et fondés sur des pratiques transmises dans plusieurs traditions, pour naviguer ce domaine avec discernement et efficacité.\n\nLa protection la plus efficace n'est pas défensive mais créatrice : un praticien centré, ancré dans ses vertus, rayonnant de clarté intérieure, est naturellement moins perméable aux influences négatives qu'un praticien anxieux qui cherche des protections extérieures.",
      pedagogicalObjective: "Maîtriser les outils et protocoles spécifiques à " + d.title + " dans le cadre d'une pratique de protection sobre et efficace.",
      initiaticObjective: "Construire une protection intérieure fondée non sur la peur mais sur la clarté, la vertu et la présence.",
      minutePlan: [
        { time:"0–5 min", title:"Seuil", content:"Évaluation de l'état énergétique du moment. Quelles influences (positives ou négatives) portes-tu en ce moment ?" },
        { time:"5–20 min", title:"Enseignement", content:"Protocole spécifique, fondements, exemples pratiques." },
        { time:"20–45 min", title:"Pratique", content:"Application complète du protocole avec attention et intention." },
        { time:"45–55 min", title:"Évaluation", content:"Avant/après. La différence est-elle perceptible ?" },
        { time:"55–60 min", title:"Carnet", content:"Note le protocole utilisé et les effets observés." }
      ],
      keyPhrase: d.phrase,
      journalQuestions: [
        "Dans quelles situations de ta vie ressens-tu le besoin de protection énergétique — et est-ce que tu le traites ou tu l'ignores ?",
        "La protection énergétique te semble-t-elle une réalité pratique ou une croyance — et qu'est-ce qui orienterait ta réponse dans un sens ou dans l'autre ?",
        "Quel outil de protection as-tu trouvé le plus efficace dans ta pratique — et comment tu en expliques l'efficacité ?"
      ]
    });
  });

  // ── Famille Eau informée C104-C111 ────────────────────────────────────────
  var eauData = [
    { id:"c104", phrase:"L'eau n'est pas seulement H₂O — elle est la mémoire de tout ce qu'elle a traversé." },
    { id:"c105", phrase:"Informer l'eau avec intention, c'est transformer le véhicule le plus fondamental de la vie." },
    { id:"c106", phrase:"Un verre d'eau, une intention, une lumière — la pratique la plus simple et la plus quotidienne." },
    { id:"c107", phrase:"La biorésonance n'est pas de la magie — c'est de la physique appliquée à la biologie." },
    { id:"c108", phrase:"Comprendre les outils de biorésonance, c'est comprendre comment le corps peut être informé." },
    { id:"c109", phrase:"Choisir son eau avec la même attention qu'on choisit sa pratique — les deux nourrissent le même temple." },
    { id:"c110", phrase:"Ce qui se mesure peut être amélioré — tenir un journal du terrain, c'est garder une boussole." },
    { id:"c111", phrase:"Sept jours d'eau informée avec intention peuvent transformer un terrain que des années de négligence ont acidifié." }
  ];

  eauData.forEach(function(d) {
    enrich(d.id, {
      longSummary: "L'eau informée et la biorésonance sont des domaines à la frontière de la science officielle et de la recherche émergente. Ce cours traite ce sujet avec rigueur : ce qui est documenté expérimentalement, ce qui est encore débattu, et ce qui est clairement de la pensée magique. L'objectif n'est pas de convaincre mais d'expérimenter honnêtement.\n\nDans le cadre de la pratique du temple vivant, l'eau informée est un outil de soutien du terrain qui s'ajoute aux pratiques alimentaires, respiratoires et méditatives. Elle ne les remplace pas — elle les complète. Et son efficacité, comme tout le reste dans cette école, doit être vérifiée par l'expérience directe et les mesures du terrain.",
      pedagogicalObjective: "Comprendre le principe et le protocole de ce cours et l'appliquer dans le cadre du soin du terrain vivant.",
      initiaticObjective: "Traiter l'eau avec le même respect que la lumière — comme un véhicule de transformation du temple intérieur.",
      minutePlan: [
        { time:"0–5 min", title:"Seuil", content:"Bois un verre d'eau avec une attention totale. Sens sa température, sa texture, le trajet qu'elle fait dans ton corps." },
        { time:"5–20 min", title:"Enseignement", content:"Protocole et principe spécifiques à ce cours." },
        { time:"20–45 min", title:"Pratique", content:"Application du protocole avec matériel disponible." },
        { time:"45–55 min", title:"Observation", content:"Observer l'état du corps 15-30 min après l'eau informée." },
        { time:"55–60 min", title:"Carnet", content:"Notes terrain : date, état avant, état après, mesures si disponibles." }
      ],
      keyPhrase: d.phrase,
      journalQuestions: [
        "Quelle est ta relation à l'eau dans ta vie quotidienne — est-ce un aliment que tu choisis avec intention ou un besoin que tu satisfais machinalement ?",
        "As-tu expérimenté la différence entre différentes qualités d'eau dans ta pratique ou ta vitalité — et qu'as-tu observé ?",
        "Si l'eau pouvait être un outil de transformation consciente, quel usage en ferais-tu différemment dès demain ?"
      ]
    });
  });

  // ── Famille Exercices C112-C119 ────────────────────────────────────────────
  var exercicesData = [
    { id:"c112", title:"Exercice 1 — Préparer une séance",
      longSummary:"Le premier exercice du Livre d'Exercices transformé en module complet d'une heure : tout ce que 'préparer une séance' signifie vraiment — l'espace physique, l'espace corporel, l'espace mental, et l'espace intentionnel. Chaque dimension est travaillée séparément avant d'être unifiée en une préparation fluide de 5 minutes.\n\nCe module inclut la théorie (pourquoi la préparation change l'expérience), la pratique guidée (une préparation complète en temps réel), la comparaison (avec et sans préparation), et l'intégration (comment faire de cette préparation une habitude irremplaçable).",
      phrase:"La préparation est la première pratique — et souvent la plus transformatrice."
    },
    { id:"c113", title:"Exercice 2 — Observer une source lumineuse",
      longSummary:"Le deuxième exercice fondamental : observer une source de lumière douce avec prudence et précision. Ce module développe la compétence complète de l'observation lumineuse — de la sécurité oculaire à la gestion de la trace, en passant par la progression des durées d'observation et le travail avec différentes sources.\n\nChaque sous-compétence est enseignée séparément : choisir la source, s'installer, maintenir l'attention, gérer la fatigue oculaire, accueillir la trace. À la fin, une séance complète d'observation de 20 minutes dans les conditions optimales.",
      phrase:"Voir n'est pas observer — observer, c'est voir avec tout son être."
    },
    { id:"c114", title:"Exercice 3 — Accueillir la rémanence",
      longSummary:"Le troisième exercice est peut-être le plus difficile : accueillir la trace lumineuse sans la forcer à durer, sans essayer de la modifier, sans s'en lasser. C'est une pratique pure d'accueil — une des formes les plus fondamentales de la présence.\n\nCe module enseigne les différentes phases de la rémanence (intensité maximale, phase stable, disparition graduelle), comment travailler avec chaque phase, comment utiliser le moment de disparition comme moment de conscience pure, et comment le cycle observation-rémanence se cumule séance après séance.",
      phrase:"Accueillir la rémanence, c'est accueillir la grâce sans l'attraper."
    },
    { id:"c115", title:"Exercice 4 — Stabiliser le point intérieur",
      longSummary:"Le quatrième exercice travaille la compétence la plus avancée de la famille Clairvoyance : maintenir un point de conscience stable dans l'espace intérieur. Ce point — qu'on le localise au front, au cœur, au ventre ou à la colonne — est l'ancre qui permet d'explorer les états de conscience profonds sans se perdre.\n\nCe module enseigne comment trouver le point, comment le maintenir contre l'agitation mentale, comment le retrouver quand il disparaît, et comment l'approfondir progressivement jusqu'à ce qu'il devienne un compagnon permanent de la pratique.",
      phrase:"Le point intérieur stable est la demeure — une fois trouvée, on peut explorer loin sans se perdre."
    },
    { id:"c116", title:"Exercice 5 — Tenir le carnet d'expérience",
      longSummary:"Le carnet d'expérience n'est pas un journal intime — c'est un instrument de précision. Ce module enseigne comment tenir un carnet de pratique qui soit à la fois rigoureux (données vérifiables, dates, durées, intensités) et vivant (ressentis, images, questions).\n\nLe carnet tenu correctement devient la mémoire de la progression, le miroir du développement, et l'outil de vérification des perceptions. Sans carnet, la pratique reste dans le domaine du vécu subjectif non documenté. Avec carnet, elle entre dans le domaine de l'expérimentation vérifiable.",
      phrase:"Un carnet tenu avec rigueur est la différence entre une expérience et une expérimentation."
    },
    { id:"c117", title:"Exercice 6 — Clore une séance",
      longSummary:"La clôture consciente est l'exercice le plus court en durée et le plus important en impact à long terme. Ce module enseigne le rituel de clôture complet : retour au corps, dépose de la trace ou de l'expérience, stabilisation du souffle, gratitude simple, et engagement de vie.\n\nCes cinq éléments pratiqués en 5 minutes à chaque fin de séance multiplient l'effet d'intégration par rapport à une séance terminée brutalement. Ce module inclut aussi les clôtures spéciales pour les séances particulièrement intenses ou les états de conscience profonds.",
      phrase:"La clôture est la dernière bouchée d'un repas — on se souvient de celle-là jusqu'au prochain."
    },
    { id:"c118", title:"Point fixe, objet et lumière",
      longSummary:"Fixer un objet géométrique (carré, cercle, triangle) sous lumière douce et travailler avec la trace qu'il laisse est l'une des pratiques les plus riches de cette école. Contrairement à la flamme d'une bougie, l'objet géométrique produit une trace nette aux bords définis — et cette netteté favorise le travail de conscience avec la forme plutôt qu'avec la lumière diffuse.\n\nCe module enseigne la progression complète : comment choisir ou créer son objet de travail, comment l'observer, comment travailler avec la trace géométrique, et comment associer une intention à la forme — le cercle pour l'unité, le carré pour la stabilité, le triangle pour l'élévation, le losange pour l'équilibre.",
      phrase:"La trace géométrique est plus nette que la lumière diffuse — et cette netteté enseigne la précision."
    },
    { id:"c119", title:"Synthèse du Livre d'Exercices",
      longSummary:"Ce dernier module est la synthèse de toute l'école — les huit exercices fondamentaux réunis en une séance intégrative complète d'une heure. Pas de remplissage, pas de redite : chaque exercice est pratiqué dans sa forme la plus épurée, dans la séquence qui maximise leur synergie.\n\nCette séance de synthèse est aussi un rite de passage : pratiquer les huit exercices en séquence est la démonstration que tu as intégré les fondements de l'école. Pas comme une performance — comme une vérification vivante que le corps, la conscience et l'intention savent désormais travailler ensemble en une heure fluide et profonde.",
      phrase:"Quand les huit exercices coulent dans une heure sans effort, tu es devenu l'école."
    }
  ];

  exercicesData.forEach(function(d) {
    enrich(d.id, {
      longSummary: d.longSummary,
      pedagogicalObjective: "Maîtriser " + d.title + " dans sa forme complète et l'intégrer dans la pratique quotidienne autonome.",
      initiaticObjective: "Vivre cet exercice comme une pratique initiatique à part entière — non comme un exercice technique mais comme une porte vers soi.",
      minutePlan: [
        { time:"0–5 min", title:"Seuil", content:"Quelle est la qualité de présence que tu apportes à cet exercice ce soir ?" },
        { time:"5–20 min", title:"Enseignement", content:"Contexte, principes, subtilités et pièges spécifiques à cet exercice." },
        { time:"20–45 min", title:"Pratique", content:"Pratique complète de l'exercice dans ses meilleures conditions." },
        { time:"45–55 min", title:"Contemplation", content:"Dans le silence post-exercice, qu'est-ce qui reste ?" },
        { time:"55–60 min", title:"Carnet", content:"Note l'exercice, l'état, les découvertes, les questions." }
      ],
      keyPhrase: d.phrase,
      journalQuestions: [
        "Cet exercice avait-il une qualité différente ce soir par rapport à la première fois que tu l'as pratiqué ?",
        "Qu'est-ce qui te révèle que tu as vraiment intégré cet exercice — non pas intellectuellement mais dans le corps et la conscience ?",
        "Si tu devais transmettre cet exercice à quelqu'un qui commence, quel serait l'essentiel que tu lui dirais de ne pas oublier ?"
      ]
    });
  });

  console.log("[Axis Enrichment Part 4] Cours 73-119 enrichis. École complète.");
})();
