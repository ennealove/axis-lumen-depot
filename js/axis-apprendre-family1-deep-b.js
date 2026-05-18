/* ============================================================
   FAMILLE 1 — RÈGLES DE L'ENSEIGNEMENT — ENRICHISSEMENT PROFOND (PARTIE B)
   Cours : c036, c037, c038, c039
   ============================================================ */

(function () {
  function enrich(id, data) {
    var c = (window.AXIS_ONE_HOUR_COURSES || []).find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  /* ──────────────────────────────────────────────────────────
     C036 — PRÉPARER UNE SÉANCE
  ────────────────────────────────────────────────────────── */
  enrich("c036", {
    longSummary: "La qualité d'une séance de pratique ne se détermine pas au moment où vous commencez à contempler la lumière. Elle se détermine dans les minutes qui précèdent — dans la façon dont vous préparez votre espace, votre corps et votre attention. Une séance bien préparée est une séance dont la porte est déjà à moitié ouverte avant même que la pratique formelle commence. Ce cours vous donne tous les éléments d'une préparation complète et efficace.",
    pedagogicalObjective: "Maîtriser tous les aspects de la préparation d'une séance : espace physique, corps, respiration préliminaire, positionnement de l'attention et intention.",
    initiaticObjective: "Découvrir que la préparation n'est pas un détail mais une pratique à part entière — et que l'état dans lequel on entre dans une séance détermine profondément ce qu'on y trouve.",
    teaching: {
      intro: "Il existe dans toutes les traditions contemptlatives une phase que l'on nomme la préparation, la purification préliminaire, ou simplement le seuil. Ce moment — entre la vie ordinaire et l'espace de pratique — n'est pas un protocole arbitraire. C'est une transition réelle, vibratoire, qui permet au terrain de passer d'un mode de fonctionnement à un autre. Sans cette transition, on arrive en séance avec le bruit du quotidien encore actif dans le terrain — les tensions, les ruminations, la dispersion de l'attention. Avec une bonne préparation, on arrive déjà dans un état de disponibilité qui rend toute la séance plus profonde.",
      sections: [
        {
          title: "L'espace physique : créer un sanctuaire",
          content: "Le premier élément de la préparation est l'espace physique. Le terrain intérieur est sensible à l'environnement extérieur — au désordre, au bruit, à la lumière artificielle agressive, aux perturbations électromagnétiques des appareils connectés. Créer un espace dédié à la pratique n'est pas un luxe : c'est une aide concrète à la qualité du travail.\n\nL'idéal est un espace stable — toujours le même coin, la même pièce ou le même angle de pièce. La régularité du lieu crée une mémoire vibratoire : le terrain intérieur reconnaît l'espace et commence à se préparer avant même que la séance formelle commence. Certains pratiquants placent dans cet espace des éléments qui soutiennent la pratique : une bougie, un objet de contemplation, une plante, quelques pierres. Ce ne sont pas des décorations superstitieuses — ce sont des repères sensoriels qui contribuent au basculement de l'attention.\n\nAvant chaque séance : éteignez ou mettez en mode avion tous les appareils électroniques. Aérez brièvement la pièce si possible. Allumez votre bougie. Réglez l'éclairage pour une demi-obscurité agréable. Ces gestes simples sont déjà la première phase de la pratique."
        },
        {
          title: "Le corps : la préparation physique",
          content: "Le corps est le temple de la pratique. Un corps contracté, tendu ou trop lourd ne peut pas servir de conducteur pour les énergies subtiles que la méthode active. La préparation physique est donc indispensable.\n\nPremier élément : la posture. Assis sur une chaise droite, sur un coussin de méditation ou en tailleur — l'important est que la colonne vertébrale soit droite sans être rigide, que le bassin soit légèrement antéversé (bascule vers l'avant) et que les épaules soient détendues. Cette posture favorise la circulation du souffle le long de l'axe et l'activation des sept centres dans leur continuité verticale.\n\nDeuxième élément : les tensions musculaires. Avant de commencer, prenez 30 secondes pour scanner votre corps : y a-t-il des tensions dans les épaules, la nuque, les mâchoires, le ventre ? Pour chaque tension identifiée, expirez lentement en imaginant que la tension se relâche avec l'air expiré. Ce n'est pas toujours suffisant pour éliminer toutes les tensions, mais c'est une reconnaissance qui prépare la libération.\n\nTroisième élément : si vous avez le temps, quelques mouvements doux avant la séance — des étirements des épaules, des rotations du cou, des balancements légers — peuvent transformer un corps raide en un corps disponible en quelques minutes."
        },
        {
          title: "La respiration préliminaire : ouvrir le terrain",
          content: "La respiration est le pont entre le corps et le terrain vibratoire. Une respiration préliminaire bien conduite peut transformer l'état du terrain en 3 à 5 minutes. C'est l'un des outils les plus puissants et les plus sous-estimés de la préparation.\n\nExercice de respiration préliminaire en cinq temps : Installez-vous dans votre posture de pratique. Posez les mains sur les genoux, paumes vers le haut. Prenez cinq respirations lentes et profondes, en respirant par le ventre d'abord (expansion du bas), puis par la poitrine (expansion du milieu), puis par les épaules (expansion du haut). À chaque expiration, laissez le corps s'alourdir légèrement sur le siège — sentez l'ancrage. Après ces cinq respirations, revenez à une respiration naturelle et observez : le terrain est-il légèrement plus détendu ? Plus disponible ? Même une différence minime est un signe que le terrain a répondu.\n\nPour les séances plus longues ou plus profondes, vous pouvez utiliser les exercices de respiration de la Famille Respirations (cours c019-c026) comme préparation systématique. Le cours Cohérence cardiaque (c025) est particulièrement efficace comme préparation à une longue séance."
        },
        {
          title: "L'attention : positionner le regard intérieur",
          content: "La quatrième dimension de la préparation est celle de l'attention. L'attention dispersée — tournée vers les projets en cours, les conversations récentes, les préoccupations — est incompatible avec une pratique de qualité. Ramener l'attention vers l'intérieur est une compétence qui se développe progressivement.\n\nUne méthode simple : avant de commencer, prenez 30 secondes pour noter mentalement (ou par écrit) tout ce qui occupe votre mental en ce moment. Ce simple acte de reconnaissance permet souvent au mental de lâcher prise temporairement. Vous n'avez pas à résoudre ces préoccupations maintenant — vous les avez simplement reconnues, et elles peuvent attendre.\n\nEnsuite, posez votre attention sur votre souffle — non pas pour le contrôler, mais pour l'observer. Où sentez-vous votre souffle le plus clairement ? Dans le ventre ? Dans la poitrine ? Dans les narines ? Cette observation simple ramène l'attention dans le corps, dans le présent, dans le terrain intérieur. C'est le repositionnement du regard intérieur qui rend la pratique possible."
        },
        {
          title: "L'intention : donner une direction à la séance",
          content: "L'intention est différente de l'objectif. Un objectif est un résultat à atteindre — ce qui crée tension et évaluation. Une intention est une direction, une qualité de présence, une orientation de l'attention — ce qui crée disponibilité et ouverture.\n\nAvant chaque séance, posez-vous cette question : quelle intention est-ce que j'apporte à cette pratique aujourd'hui ? Il n'y a pas de bonne ou de mauvaise réponse. Parmi les intentions possibles : être présent, approfondir le calme, explorer la clarté du centre 4, laisser le souffle se déployer, simplement observer sans chercher. L'intention n'est pas un programme rigide — c'est une graine que vous plantez dans le terrain au début de la séance, et qui peut évoluer selon ce que la pratique révèle.\n\nIl est utile de noter l'intention dans votre journal avant la séance, et d'observer en fin de séance si la pratique a suivi cette direction, l'a modifiée, ou a révélé quelque chose d'inattendu. Ces observations constituent la matière la plus précieuse de votre progression."
        },
        {
          title: "La durée et le rythme des séances",
          content: "La question de la durée est souvent mal posée. On cherche la séance « idéale » — la plus longue, la plus intense, la plus riche. Mais la durée idéale d'une séance n'est pas fixe : elle varie selon votre état du moment, le temps disponible, la phase du parcours dans laquelle vous vous trouvez et l'exercice pratiqué.\n\nPour les débutants : 20 à 30 minutes est une durée excellente. Elle est suffisante pour que le terrain s'installe et entre dans une dynamique productive, mais pas assez longue pour fatiguer l'attention ou saturer le système nerveux. Pour les pratiquants intermédiaires : 45 à 60 minutes permet d'aller plus loin dans les cycles d'impression-rémanence et d'exploration intérieure. Pour les pratiquants avancés : les séances peuvent durer jusqu'à 90 minutes ou 2 heures dans des contextes particuliers, mais cela suppose un terrain bien ancré et une capacité d'intégration développée.\n\nLa règle d'or : mieux vaut une séance courte et profonde qu'une séance longue et dispersée. Si vous sentez que l'attention s'effrite, que le terrain s'agite ou que vous vous ennuyez — abrégez la séance. Il vaut mieux terminer sur un moment de qualité que de prolonger par habitude ou par culpabilité."
        },
        {
          title: "Les obstacles courants à la préparation",
          content: "Les obstacles les plus fréquents à une bonne préparation sont : le manque de temps (on arrive en séance en retard, précipité, sans transition), la fatigue (on s'installe en pratique comme on s'effondrerait dans un canapé), le perfectionnisme (on attend les conditions parfaites qui ne viendront jamais) et la routine robotique (on fait les gestes de préparation mécaniquement, sans présence réelle).\n\nPour le manque de temps : réduisez la durée de la séance plutôt que la qualité de la préparation. 5 minutes de préparation + 15 minutes de pratique de qualité surpassent 0 minutes de préparation + 25 minutes de pratique dispersée. Pour la fatigue : la respiration préliminaire est votre meilleure alliée — 5 grandes respirations peuvent transformer un état d'épuisement en une disponibilité suffisante pour une courte pratique. Pour le perfectionnisme : acceptez dès maintenant que les conditions ne seront jamais parfaites, et que le terrain réel est toujours plus intéressant que le terrain idéal imaginaire. Pour la routine robotique : variez légèrement votre préparation — un jour commencez par la posture, un autre par la respiration, un autre par une minute de silence complet."
        },
        {
          title: "La préparation comme pratique à part entière",
          content: "Avec l'expérience, vous découvrirez que la préparation n'est pas simplement un préambule à la pratique — elle est déjà la pratique. Le moment où vous allumez la bougie, où vous prenez votre posture, où vous laissez le souffle s'ouvrir — ces moments sont déjà une mise en présence réelle, un travail authentique du terrain.\n\nCertains jours, la préparation sera le seul moment de vraie pratique disponible. Et ce sera suffisant. Un terrain qui apprend à se mettre en disponibilité — à reconnaître le signal de la bougie allumée et de la respiration ouverte comme une invitation à basculer dans l'espace intérieur — est un terrain qui s'entraîne, même dans les jours les plus chargés.\n\nAvec le temps, vous constaterez que cette disponibilité commence à se propager : vous commencerez à sentir la bascule dans l'espace intérieur non seulement devant votre bougie, mais aussi dans certains moments de la vie ordinaire — un coucher de soleil, un moment de silence inattendu, une musique particulière. La préparation vous apprend à reconnaître le signal. La pratique vous apprend à l'approfondir. La vie vous apprend à le maintenir."
        }
      ]
    },
    minutePlan: [
      { time: "0–3 min", title: "Espace et posture", content: "Allumez la bougie. Installez-vous. Vérifiez que rien ne dérangera." },
      { time: "3–8 min", title: "Respiration préliminaire", content: "5 respirations complètes (ventre-poitrine-épaules). Laissez le corps s'ancrer." },
      { time: "8–12 min", title: "Reconnaissance du mental", content: "Notez mentalement ce qui vous préoccupe. Donnez-lui la permission d'attendre." },
      { time: "12–15 min", title: "Positionnement de l'attention", content: "Portez l'attention sur le souffle. Observez sans contrôler. Laissez le terrain se stabiliser." },
      { time: "15–20 min", title: "Intention", content: "Posez votre intention pour cette séance. Notez-la si possible." },
      { time: "20–60 min", title: "Séance de pratique", content: "La préparation est terminée. Commencez votre pratique principale avec ce terrain ouvert et disponible." }
    ],
    keyPhrase: "La qualité d'une séance se décide dans les cinq minutes qui la précèdent — la préparation est déjà la pratique.",
    journalQuestions: [
      "Quelle différence ai-je observé entre une séance bien préparée et une séance commencée en précipitation ?",
      "Quel aspect de la préparation me demande le plus d'effort — l'espace physique, le corps, la respiration ou l'attention ?",
      "Quelle intention vais-je apporter à ma prochaine séance ?"
    ]
  });

  /* ──────────────────────────────────────────────────────────
     C037 — CLORE UNE SÉANCE
  ────────────────────────────────────────────────────────── */
  enrich("c037", {
    longSummary: "On accorde beaucoup d'attention à la façon de commencer une pratique. Rarement assez à la façon de la terminer. Pourtant, la clôture d'une séance est aussi importante que sa préparation — peut-être plus. Car c'est dans les minutes qui suivent la pratique que les transformations s'intègrent, se stabilisent et deviennent durables. Une séance bien close est une séance dont les effets se prolongent pendant des heures dans le corps et le terrain. Une séance mal close est une séance dont une partie de l'énergie se perd dans la transition trop brutale vers la vie ordinaire.",
    pedagogicalObjective: "Comprendre pourquoi et comment clore une séance, maîtriser les gestes de clôture physiques et vibratoires, et développer une ritualisation de la fin qui soutient l'intégration.",
    initiaticObjective: "Apprendre à quitter l'espace de pratique non pas en s'en arrachant mais en fermant consciemment une porte — et en portant quelque chose de cet espace avec soi dans la vie ordinaire.",
    teaching: {
      intro: "Dans toutes les traditions rituelles — qu'il s'agisse de liturgies religieuses, de cérémonies chamanique ou de pratiques méditatives — la clôture du rite est aussi structurée que son ouverture. Cette symétrie n'est pas décorative : elle est fonctionnelle. L'espace de pratique est un état du terrain — plus fluide, plus ouvert, plus réceptif que l'état ordinaire. Pour que les effets de cet état se consolident plutôt que de s'évaporer, le retour vers l'état ordinaire doit être conscient, graduel et intentionnel. C'est ce que nous appelons la clôture.",
      sections: [
        {
          title: "Pourquoi la clôture est indispensable",
          content: "Pendant une séance de pratique, le terrain intérieur s'ouvre et se fluidifie. Les centres qui étaient renfermés s'élargissent. Le souffle qui était court et superficiel devient ample et profond. Les tensions qui comprimaient certaines zones se relâchent. Cet état d'ouverture est précieux — c'est en lui que les transformations se produisent.\n\nMais cet état est aussi un état de vulnérabilité relative. Un terrain très ouvert est plus sensible aux perturbations extérieures, aux stimulations trop intenses, aux informations trop chargées émotionnellement. Si on sort d'une séance profonde pour se jeter immédiatement devant un écran, dans une conversation difficile ou dans une activité physique intense, on crée une rupture qui peut être déstabilisante et qui empêche l'intégration des transformations vécues.\n\nLa clôture est le mécanisme par lequel le terrain revient graduellement à un niveau de densité et de protection approprié pour la vie ordinaire — sans perdre le bénéfice de ce qui vient d'être vécu."
        },
        {
          title: "La descente : phase fondamentale de la clôture",
          content: "Le Tome 1 de nos sources décrit le rythme descendant : ce rythme ramène vers la profondeur. Le terrain se densifie, se rassemble et se stabilise. Le rythme descendant renforce les centres inférieurs. C'est exactement ce que doit faire une bonne clôture : initier consciemment un mouvement descendant qui ancre ce qui a été élevé pendant la séance.\n\nComment induire ce mouvement descendant ? Premièrement, par la respiration : des expirations lentes et longues (plus longues que les inspirations) activent le système parasympathique et initient une descente douce. Deuxièmement, par la conscience du corps : ramener l'attention vers les points de contact avec le sol (les pieds, les genoux, les fesses sur le siège) ancre le terrain dans le plan physique. Troisièmement, par un geste physique simple — poser les deux mains à plat sur les genoux, appuyer légèrement les pieds sur le sol, sentir le poids du corps — qui signale au système nerveux que la transition vers l'état ordinaire commence.\n\nCes éléments, combinés, initient le rythme descendant de manière naturelle et non forcée."
        },
        {
          title: "L'observation post-séance : lire ce qui s'est passé",
          content: "Avant de fermer les yeux pour la dernière fois et d'éteindre la bougie, prenez deux à trois minutes pour observer votre terrain intérieur. Pas pour analyser, pas pour évaluer, pas pour décider si la séance était « bonne » ou « mauvaise » — mais pour simplement noter ce qui est présent maintenant.\n\nQuelques questions utiles pour cette observation : Où se situe la densité dans mon terrain en ce moment ? Où se situe la clarté ? Est-ce que je perçois l'axe ? Est-ce qu'un centre semble particulièrement actif ou particulièrement apaisé ? Quel est l'état de mon souffle — large, étroit, vertical, horizontal ?\n\nCes observations sont la matière première de votre journal de pratique. Elles tracent une carte de votre progression vibratoire qui, lue sur plusieurs semaines ou mois, révèle des patterns impossibles à voir séance par séance."
        },
        {
          title: "Le journal : l'outil d'intégration par excellence",
          content: "Le journal de pratique est l'un des outils les plus puissants de cette école. Pas le journal intime émotionnel — un journal de pratique spécifique, dédié aux observations du terrain intérieur. Quelques lignes après chaque séance suffisent, mais ces quelques lignes font une différence considérable dans la vitesse et la profondeur de la progression.\n\nLe journal de pratique répond à trois questions simples : 1) Qu'ai-je observé dans mon terrain pendant cette séance ? (densités, clartés, centres actifs, spirales perçues, moments remarquables) 2) Quelle intention avais-je au début et comment la séance s'est-elle déroulée par rapport à elle ? 3) Qu'est-ce que je porte avec moi de cette séance dans la vie quotidienne ?\n\nIl n'est pas nécessaire d'écrire de longs paragraphes. Trois phrases suffisent souvent. Ce qui compte c'est la régularité — noter quelque chose après chaque séance, même un mot ou une impression. Avec le temps, ces fragments construisent un tableau précis de votre évolution intérieure."
        },
        {
          title: "Le geste de clôture : ritualiser la transition",
          content: "Le geste de clôture est un acte symbolique et vibratoire qui signale la fin de l'espace de pratique. Sa valeur tient à sa régularité : répété à chaque séance, il finit par devenir un signal que le terrain intérieur reconnaît — un geste qui déclenche automatiquement l'intégration et la descente.\n\nDifférentes traditions proposent différents gestes : joindre les mains en prière, s'incliner, toucher le sol des deux mains, prononcer intérieurement un mot ou une phrase de conclusion, éteindre la bougie avec intention. Aucun de ces gestes n'est meilleur qu'un autre — ce qui compte est que vous adoptiez le geste qui résonne pour vous et que vous le répétiez avec cohérence.\n\nDans notre école, nous proposons ce geste simple : à la fin de la séance, posez les deux mains à plat sur le cœur (le centre 4), prenez trois respirations lentes, et posez intérieurement cette question : « Qu'est-ce que je retiens de cette séance ? » La première réponse qui vient — une image, un mot, une sensation — est ce que vous notez dans votre journal. Puis éteignez la bougie."
        },
        {
          title: "La transition vers la vie ordinaire",
          content: "La clôture ne se termine pas avec l'extinction de la bougie. Elle se continue dans les 15 à 30 minutes qui suivent la séance. Cette période de transition est précieuse — le terrain est encore en phase d'intégration, plus fluide que dans l'état ordinaire, mais en train de retrouver sa densité protectrice.\n\nPendant cette période : évitez les écrans (téléphone, ordinateur, télévision). Évitez les conversations chargées émotionnellement. Évitez les décisions importantes. Favorisez : marcher lentement, boire de l'eau ou une tisane chaude, s'étendre cinq minutes en observant le corps, faire quelque chose de doux et non cognitif (ranger, cuisiner simplement, jardiner).\n\nCes activités douces permettent au terrain de « atterrir » progressivement — de retrouver la densité nécessaire à la vie quotidienne sans perdre le fil de ce qui vient d'être vécu. C'est dans ces moments que beaucoup de pratiquants rapportent des insights soudains, des clarifications inattendues, des solutions à des problèmes en suspens. Le terrain, encore en état d'ouverture, continue de travailler."
        },
        {
          title: "Ce qu'une bonne clôture produit dans le temps",
          content: "Les effets d'une bonne clôture ne se manifestent pas seulement immédiatement après la séance. Ils se révèlent sur la durée, au fil des semaines et des mois de pratique régulière. Parmi ces effets : une meilleure consolidation des transformations vibratoires (ce qui a bougé pendant la séance reste bougé), une capacité accrue à retrouver l'état de pratique rapidement lors des séances suivantes (le terrain a enregistré la transition comme signal), une plus grande cohérence entre l'espace de pratique et la vie ordinaire (les deux ne semblent plus aussi radicalement séparés), et une profondeur de sommeil améliorée les nuits qui suivent les séances (la descente consciente prépare un sommeil plus réparateur).\n\nCes effets sont le signe que la clôture n'est pas seulement une formalité — elle est une composante essentielle de la méthode, aussi importante que l'impression lumineuse elle-même."
        }
      ]
    },
    minutePlan: [
      { time: "Dernières 2 min de pratique", title: "Signal de fin", content: "Sentez le moment où la pratique est naturellement accomplie — ne la prolongez pas par habitude." },
      { time: "2 min", title: "Respiration descendante", content: "3-5 expirations longues. Sentez le poids du corps. Ancrage progressif." },
      { time: "3 min", title: "Observation du terrain", content: "Scan rapide : densité, clarté, centres actifs, état du souffle. Notez mentalement." },
      { time: "2 min", title: "Geste de clôture", content: "Deux mains sur le cœur. Trois respirations. Question intérieure : qu'est-ce que je retiens ?" },
      { time: "5 min", title: "Journal", content: "Notez en 3 phrases : observation du terrain, intention vs réalité, ce que vous portez avec vous." },
      { time: "15-30 min après", title: "Transition douce", content: "Pas d'écran. Eau, marche lente, activité douce. Laissez le terrain atterrir." }
    ],
    keyPhrase: "La clôture n'est pas la fin de la séance : c'est le début de l'intégration — et l'intégration est là où la transformation devient durable.",
    journalQuestions: [
      "Comment est-ce que je termine habituellement mes séances — avec une transition consciente ou en passant brusquement à autre chose ?",
      "Lors de la pratique de clôture aujourd'hui, qu'ai-je observé dans les 2-3 minutes d'observation post-séance ?",
      "Qu'est-ce que j'ai porté avec moi de cette séance dans les heures suivantes ?"
    ]
  });

  /* ──────────────────────────────────────────────────────────
     C038 — PRÉSENCE, CARTE ET LUMIÈRE
  ────────────────────────────────────────────────────────── */
  enrich("c038", {
    longSummary: "La présence est le fondement de toute pratique intérieure authentique. Sans présence — sans cette qualité d'attention vivante, non divisée, non déportée vers le passé ou l'avenir — les exercices les plus sophistiqués ne produiront que des effets superficiels. Ce cours explore la nature de la présence, propose une carte précise du terrain intérieur comme support de la présence, et montre comment la lumière — extérieure et intérieure — est l'agent le plus efficace pour développer et stabiliser cette qualité fondamentale.",
    pedagogicalObjective: "Comprendre la présence comme compétence développable, maîtriser la carte du terrain intérieur comme support de l'attention, et comprendre le rôle de la lumière dans le développement de la présence.",
    initiaticObjective: "Expérimenter au moins un moment de présence pleine pendant ce cours — et reconnaître en ce moment une qualité différente de l'attention ordinaire.",
    teaching: {
      intro: "Qu'est-ce que la présence ? Dans la vie ordinaire, l'attention est presque toujours ailleurs : dans les pensées sur ce qui s'est passé, dans les anticipations de ce qui va arriver, dans les jugements sur ce qui est en train de se passer. Le terrain intérieur est constamment traversé par ces mouvements centrifuges qui l'éloignent du moment présent. La présence, c'est le retour. Le retour dans le corps, dans le souffle, dans l'espace intérieur — maintenant, ici, dans ce moment précis. Ce retour n'est pas une technique : c'est une qualité d'être. Mais comme toute qualité d'être, elle peut être cultivée.",
      sections: [
        {
          title: "La présence : définition précise",
          content: "Dans le cadre de cette école, la présence désigne un état du terrain dans lequel l'attention est simultanément : stable (elle ne saute pas d'un objet à l'autre), ouverte (elle ne se focalise pas de manière tendue mais perçoit largement), ancrée dans le corps (elle repose dans la sensation physique plutôt que dans la pensée abstraite), et disponible (elle est prête à recevoir ce qui se présente sans l'avoir décidé à l'avance).\n\nCet état est rare dans la vie moderne. La plupart du temps, l'attention est soit trop focalisée (tension, effort) soit trop dispersée (divagation, scrolling). La présence occupe un point intermédiaire paradoxal : une attention large et détendue qui peut pourtant saisir avec finesse les variations subtiles du terrain intérieur.\n\nLes traditions méditatives appellent cet état de différentes façons : pleine conscience (mindfulness), présence nue, attention ouverte, conscience témoin. Toutes ces expressions pointent vers la même qualité — celle que vous allez cultiver dans cette école."
        },
        {
          title: "La carte du terrain intérieur",
          content: "Pour que l'attention puisse naviguer dans l'espace intérieur avec précision, il est utile d'avoir une carte. La carte que nous utilisons dans cette école est celle des sept centres vibratoires, organisés le long de l'axe vertical du corps.\n\nCette carte n'est pas une anatomie au sens médical. C'est une topographie fonctionnelle — une description des zones où le terrain intérieur manifeste des dynamiques distinctes. Centre 1 (bassin profond) : densité, ancrage, fondation. Centre 2 (bas ventre) : expansion, vitalité, circulation. Centre 3 (plexus solaire) : impulsion, direction, initiative. Centre 4 (sternum/cœur) : axe, cohérence, reliance. Centre 5 (gorge) : expression, modulation, structure. Centre 6 (entre les sourcils) : perception fine, clarté, lecture. Centre 7 (sommet du crâne) : émergence, élargissement, ouverture vers le vaste.\n\nAvec la pratique, vous apprendrez à sentir chacun de ces centres, à reconnaître leur activité ou leur silence, et à suivre les mouvements qui circulent de l'un à l'autre le long de l'axe. La carte devient un outil de navigation précis pour la présence."
        },
        {
          title: "La lumière et la présence : une relation fondamentale",
          content: "Pourquoi la lumière est-elle l'agent privilégié pour développer la présence ? La réponse est à la fois neurologique et vibratoire.\n\nSur le plan neurologique : la lumière capte l'attention de manière naturelle et non violente. Un point lumineux — une flamme, une étoile, un rayon de soleil — attire le regard sans le forcer. Cette attraction naturelle crée les conditions d'une attention stable sans effort — exactement la qualité de présence que nous cherchons. Contrairement à une pensée ou une image mentale, la lumière physique ancre l'attention dans le réel, dans le présent.\n\nSur le plan vibratoire : la lumière active les centres supérieurs du terrain intérieur — particulièrement les centres 6 et 7 (clarté perceptive et émergence subtile). Quand ces centres s'éveillent, toute la perception s'affine. Ce que le Tome 1 appelle « l'espace de perception » — cet espace intermédiaire où les mouvements du terrain prennent forme avant de devenir des concepts — devient accessible. La présence cesse d'être un effort et devient une réalité perçue."
        },
        {
          title: "Les obstacles à la présence et comment les traverser",
          content: "Les obstacles les plus courants à la présence sont : la rumination (l'attention emportée vers le passé), l'anticipation (l'attention projetée vers le futur), le jugement (l'attention qui commente ce qui est en train de se passer au lieu de simplement le percevoir), et la somation (l'attention qui s'endort dans un confort non vigilant).\n\nPour chaque obstacle, il existe une réponse vibratoire précise. Pour la rumination : descendre dans les centres inférieurs, sentir le poids du corps, respirer lentement dans le ventre. Le mouvement descendant-ancrant rompt le cycle de la rumination. Pour l'anticipation : élargir la perception au terrain global plutôt que de la concentrer sur un point ou une pensée. Le mouvement d'expansion casse la fixation anticipatoire. Pour le jugement : revenir à la simple observation — décrire sans qualifier. Pour la somation : activer légèrement le corps (mouvement des doigts, balancement léger) pour relancer le circuit de l'attention.\n\nCes réponses vibratoires sont précisément ce que les exercices de cette école entraînent — progressivement, séance après séance."
        },
        {
          title: "La présence et les moments ordinaires",
          content: "L'objectif ultime de la pratique n'est pas d'avoir des moments de présence intense pendant les séances formelles. C'est de transformer progressivement la qualité de l'attention dans la vie ordinaire — dans les conversations, les repas, le travail, la marche, les moments de solitude.\n\nCela se fait par deux voies complémentaires. La première est la pratique formelle régulière — qui entraîne l'attention comme un muscle, lui apprend progressivement à rester stable et ouverte pendant des durées croissantes. La deuxième est la pratique informelle — des micro-moments de présence dans la vie quotidienne. Une minute d'attention au souffle dans les transports. Trente secondes d'observation du ciel entre deux tâches. Le temps d'un repas mangé vraiment, en savourant chaque bouchée. Ces micro-moments, répétés régulièrement, accélèrent considérablement la progression de la présence formelle.\n\nLe signe que la présence progresse : vous commencez à remarquer votre absence. C'est-à-dire que vous percevez, de plus en plus souvent et de plus en plus rapidement, le moment où l'attention s'est éloignée du présent. Et cette reconnaissance suffit à vous ramener — sans effort, sans reproche, simplement."
        },
        {
          title: "La présence et la lumière intérieure",
          content: "Il existe un lien profond entre la présence et la lumière intérieure. À mesure que la présence se développe et se stabilise, quelque chose commence à changer dans la qualité même du terrain intérieur. Les zones qui étaient denses et opaques commencent à gagner en clarté. Les zones qui étaient agitées commencent à se stabiliser. Et dans cette stabilité clarifiée, quelque chose se manifeste que les traditions appellent la lumière intérieure.\n\nCe n'est pas une vision, ni une hallucination, ni un état extraordinaire. C'est simplement cette qualité de clarté vivante qui se révèle quand le terrain est suffisamment calme et cohérent pour permettre à l'observateur intérieur de percevoir sa propre nature. La présence est la porte. La lumière est ce qu'on trouve de l'autre côté.\n\nEt cette lumière, une fois perçue — même brièvement, même partiellement — change la relation à la pratique. Elle n'est plus un effort vers quelque chose d'inconnu. Elle devient un retour vers quelque chose de familier, de reconnu, de profondément juste."
        }
      ]
    },
    minutePlan: [
      { time: "0–5 min", title: "Installation en présence", content: "Fermez les yeux. Sentez votre corps. Respirez librement. Laissez l'attention se poser." },
      { time: "5–15 min", title: "La carte du terrain", content: "Sections 1-2 : définition de la présence, carte des 7 centres. Explorez la carte dans votre propre corps." },
      { time: "15–25 min", title: "Lumière et obstacles", content: "Sections 3-4 : lumière et présence, obstacles et réponses vibratoires." },
      { time: "25–35 min", title: "Présence ordinaire", content: "Section 5 : pratique informelle. Pensez à trois moments quotidiens où vous pourriez pratiquer la présence." },
      { time: "35–45 min", title: "Pratique de présence avec bougie", content: "5 minutes de contemplation de la bougie. Puis 5 minutes les yeux fermés, présent au terrain." },
      { time: "45–60 min", title: "La lumière intérieure", content: "Section 6 et journal : avez-vous perçu quelque chose qui ressemble à une clarté intérieure ?" }
    ],
    keyPhrase: "La présence n'est pas un effort — c'est un retour. Et chaque retour, même bref, illumine un peu plus le terrain.",
    journalQuestions: [
      "Comment est ma qualité d'attention habituelle — plutôt dans le passé, dans le futur, ou présente ?",
      "Lors de la pratique de présence avec la bougie, qu'ai-je observé dans mon terrain intérieur ?",
      "Quels sont les trois moments quotidiens où je vais insérer une micro-pratique de présence cette semaine ?"
    ]
  });

  /* ──────────────────────────────────────────────────────────
     C039 — CONSTRUIRE UNE SÉANCE D'UNE HEURE
  ────────────────────────────────────────────────────────── */
  enrich("c039", {
    longSummary: "Une séance d'une heure est l'unité de pratique centrale de cette école. C'est la durée minimale pour aller suffisamment loin dans les cycles d'impression-rémanence, pour laisser le terrain s'installer et se transformer, et pour avoir le temps de clore correctement. Mais une heure de pratique n'est pas simplement une heure passée devant une bougie : c'est une architecture temporelle précise, avec ses phases, ses rythmes, ses transitions. Ce cours vous donne la structure complète d'une séance d'une heure et les principes pour l'adapter à votre niveau et à vos besoins.",
    pedagogicalObjective: "Maîtriser l'architecture d'une séance d'une heure, comprendre la logique de chaque phase et être capable de construire des séances adaptées à son niveau avec les exercices de son choix.",
    initiaticObjective: "Vivre une séance d'une heure complète et bien structurée, et sentir dans le terrain la différence entre les phases — la montée, le plein de la pratique, la descente et l'intégration.",
    teaching: {
      intro: "Une séance d'une heure n'est pas une heure de pratique uniforme. C'est un voyage avec un départ, un développement, un sommet et un retour. Comme un morceau de musique bien composé, une séance bien construite a une dynamique interne qui porte le praticien naturellement d'un état à un autre. Comprendre cette architecture, c'est comprendre comment tirer le maximum de chaque heure de pratique — et comment éviter les erreurs les plus communes (trop d'intensité dès le début, pas de clôture, durée mal répartie).",
      sections: [
        {
          title: "L'architecture fondamentale : quatre phases",
          content: "Une séance d'une heure bien construite comprend toujours quatre phases dans cet ordre : ouverture (5-10 minutes), développement (30-40 minutes), intégration active (10-15 minutes), et clôture (5-10 minutes).\n\nL'ouverture correspond à la préparation décrite dans le cours c036 : installation physique, respiration préliminaire, positionnement de l'attention, intention. Elle ne doit pas être bâclée — c'est elle qui détermine la qualité de tout ce qui suit. Le développement est le cœur de la séance : les cycles d'impression-rémanence avec les exercices choisis. C'est là que le travail vibratoire se produit. L'intégration active est une phase de transition : on ralentit le rythme des impressions, on laisse le terrain se stabiliser, on observe ce qui s'est passé. La clôture correspond au cours c037 : descente consciente, geste de clôture, journal.\n\nCes quatre phases correspondent aux quatre rythmes fondamentaux du terrain intérieur : stabilisation (ouverture), ascendant (développement), de stabilisation à nouveau (intégration), descendant (clôture)."
        },
        {
          title: "La phase d'ouverture : 0-10 minutes",
          content: "Durée recommandée : 8-10 minutes pour une séance d'une heure. Les éléments : 2 minutes d'installation physique (posture, relâchement des tensions), 3 minutes de respiration préliminaire (5-7 respirations complètes), 2 minutes de reconnaissance du mental (noter ce qui préoccupe, donner la permission d'attendre), 2 minutes de positionnement de l'attention (focus sur le souffle), 1 minute d'intention (formuler intérieurement l'intention de la séance).\n\nSigne que l'ouverture est réussie : après ces 8-10 minutes, vous sentez que le terrain est légèrement plus calme, plus disponible, plus centré qu'à votre arrivée. Même une légère différence est un bon signe. Si vous ne sentez pas de différence, rallongez l'ouverture de 2-3 minutes — votre terrain avait besoin de plus de temps pour se stabiliser."
        },
        {
          title: "La phase de développement : 10-50 minutes",
          content: "C'est la phase la plus longue et la plus riche. Elle comprend les cycles d'impression-rémanence avec les exercices intérieurs. Pour une séance d'une heure, 3 à 4 cycles complets sont appropriés. Un cycle comprend : impression (3-5 min) → fermeture des yeux (rémanence) → exercice intérieur (5-8 min) → retour naturel → mini-observation (1 min) → prochain cycle.\n\nLa structure des cycles peut varier selon le type de séance. Séance de balancement : les 3 cycles incorporent progressivement le balancement latéral, puis vertical, puis en spirale, avec observation de la rémanence entre chaque. Séance de respiration : les 3 cycles combinent une impression courte avec un exercice respiratoire long (cohérence cardiaque, respiration 4-7-8, respiration pranayama). Séance de contemplation visuelle pure : les 3 cycles sont des impressions de plus en plus longues (3 min, 5 min, 7 min) avec des phases de rémanence prolongée.\n\nLe principe est toujours le même : progresser en intensité au fil des cycles, en allant du plus simple vers le plus profond, du plus court vers le plus long."
        },
        {
          title: "La courbe d'intensité : ne pas commencer au maximum",
          content: "L'erreur la plus fréquente des débutants — et aussi de certains pratiquants intermédiaires — est de commencer la phase de développement à pleine intensité. On veut « aller au fond » dès le premier cycle, on utilise les exercices les plus intenses, on prolonge les impressions au maximum dès la première tentative. Ce faisant, on épuise le terrain dès le début de la séance et on n'a plus d'énergie pour les cycles suivants.\n\nLa courbe d'intensité idéale d'une séance ressemble à une courbe en cloche légèrement asymétrique : démarrage doux (cycles 1-2 : impressions courtes, exercices simples), montée progressive (cycle 2-3 : approfondissement de l'exercice, allongement des rémanences), sommet (cycle 3 ou 4 : le moment le plus profond de la séance), et début de descente dans la phase d'intégration.\n\nCette courbe respecte la logique du terrain intérieur : le terrain a besoin de temps pour s'ouvrir, s'acclimatation aux stimuli, et trouver son rythme. Les forcer dès le début produit une résistance ou une sur-stimulation qui compromet la qualité de toute la séance."
        },
        {
          title: "La phase d'intégration active : 50-55 minutes",
          content: "La phase d'intégration active commence quand on sent que le travail principal est accompli — que le terrain a été suffisamment travaillé et a besoin maintenant de se stabiliser plutôt que d'être davantage stimulé. Cette phase dure 8-10 minutes dans une séance d'une heure.\n\nPendant cette phase : on fait une dernière impression très courte (2 minutes maximum), ou pas d'impression du tout. On reste les yeux fermés dans la rémanence ou dans la présence intérieure. On observe simplement le terrain — sa densité, sa clarté, son état de souffle, ses centres. On note mentalement deux ou trois observations importantes.\n\nCette phase n'est pas du temps gaspillé — c'est le temps pendant lequel les transformations vibratoires se consolident. Ce que le terrain a vécu pendant la phase de développement ne devient durable que si l'intégration est respectée. Négliger cette phase pour « faire plus » de cycles est l'équivalent, en nutrition, de manger beaucoup mais de ne jamais laisser le temps à la digestion."
        },
        {
          title: "La phase de clôture : 55-60 minutes",
          content: "Les 5 dernières minutes de la séance sont consacrées à la clôture, telle que décrite dans le cours c037. Le rituel minimal : 3 expirations longues et conscientes, les deux mains sur le cœur, la question intérieure « qu'est-ce que je retiens ? », et l'extinction de la bougie.\n\nIl n'est pas nécessaire que cette clôture soit longue — 5 minutes suffisent si la transition est faite consciemment. Ce qui compte est la qualité de la présence dans ces 5 minutes, pas leur durée. Une clôture de 2 minutes faite avec pleine attention vaut mieux qu'une clôture de 10 minutes faite en regardant déjà son téléphone."
        },
        {
          title: "Adapter l'architecture à différents contextes",
          content: "L'architecture en quatre phases est un modèle de base. Elle s'adapte selon le contexte et les besoins.\n\nSéance courte (30 minutes) : ouverture 5 min, développement 15 min (2 cycles), intégration 5 min, clôture 5 min. Séance longue (90 minutes) : ouverture 10 min, développement 60 min (5-6 cycles), intégration 15 min, clôture 5 min. Séance de crise (fatigue, agitation) : ouverture prolongée 15 min axée sur l'ancrage et la respiration descendante, développement doux 20 min (1-2 cycles avec impressions très courtes), intégration longue 15 min, clôture 10 min. Séance d'exploration (curiosité, temps disponible) : ouverture standard 10 min, développement 45 min avec des cycles variés (différentes couleurs, différents exercices), intégration 20 min, clôture 5 min.\n\nDans tous les cas, la proportion clé à respecter est : développement = 50-60% de la séance totale, ouverture + clôture = 20-25%, intégration = 15-25%."
        },
        {
          title: "Les séances thématiques : organiser par famille",
          content: "Une séance d'une heure peut avoir un thème — une famille de pratiques sur laquelle elle se concentre. Les 14 familles de cette école constituent autant de thèmes possibles pour des séances thématiques.\n\nSéance de balancement : tous les cycles utilisent des balancements différents (latéral, vertical, antéro-postérieur) combinés avec des impressions courtes. Séance de respiration : tous les cycles explorent différents exercices respiratoires avec des rémanences prolongées entre chaque. Séance de couleur : chaque cycle utilise un objet de couleur différente, observe la rémanence complémentaire, et explore la zone vibratoire correspondante. Séance de clarté (avancée) : focus sur le centre 6 et 7, impressions solaires, rémanences très larges.\n\nLes séances thématiques permettent d'approfondir un aspect particulier du terrain intérieur — de le travailler de manière soutenue sur toute la durée de la séance plutôt que de le toucher brièvement dans un cycle général."
        },
        {
          title: "Tenir un calendrier de pratique",
          content: "La progression dans cette école ne se fait pas par séances isolées mais par le tissage d'un fil régulier de pratique. Pour cette raison, nous recommandons fortement de tenir un calendrier simple — un fichier ou un carnet dans lequel vous notez, pour chaque jour : si vous avez pratiqué ou non, la durée de la séance, le thème principal et une observation brève.\n\nCe calendrier remplit deux fonctions. Premièrement, il vous permet de voir vos patterns — les moments de la semaine où vous pratiquez facilement, les moments où vous sautez des séances, les corrélations entre régularité de pratique et qualité du terrain dans la vie quotidienne. Deuxièmement, il vous permet de planifier les familles de cours — en réservant certaines semaines à certaines familles, en suivant la progression recommandée par l'école, en équilibrant les familles d'ancrage (terrain, balancements, respirations) et les familles d'élévation (lumière, clairvoyance, guidance).\n\nUne pratique de 5 jours par semaine sur une année transforme radicalement le terrain intérieur. Une pratique de 2-3 jours par semaine produit une progression réelle mais plus lente. Une pratique inférieure à 2 fois par semaine maintient à peine les acquis. Ces chiffres ne sont pas des règles morales — ils sont des constats pragmatiques sur la vitesse de la neuroplasticité et de la stabilisation vibratoire."
        },
        {
          title: "Un exemple de séance complète d'une heure",
          content: "Pour rendre concret tout ce qui précède, voici un exemple détaillé d'une séance d'une heure de niveau intermédiaire, utilisant comme thème le balancement et la rémanence colorée.\n\n0-8 min — OUVERTURE : Assis, posture vérifiée. 5 respirations complètes. Mental reconnu et apaisé. Intention : « Approfondir l'ancrage et la cohérence des centres 1 à 4. »\n\n8-20 min — CYCLE 1 : Impression d'une bougie (3 min). Fermeture des yeux. Observation de la rémanence orangée (3 min). Balancement latéral doux pendant la rémanence (5 min). Observation du terrain : centre 1 et 2.\n\n20-35 min — CYCLE 2 : Impression de la bougie (4 min). Fermeture des yeux. Rémanence (3 min). Balancement antéro-postérieur léger pendant la rémanence (7 min). Focus sur le centre 3 et 4. Observation.\n\n35-50 min — CYCLE 3 (le plus profond) : Impression de la bougie (5 min). Fermeture des yeux. Rémanence prolongée (5 min). Immobilité totale — simplement observer le souffle, les centres, l'axe. Descente de l'attention des centres supérieurs vers les inférieurs. Observation finale.\n\n50-55 min — INTÉGRATION : Pas d'impression. Yeux fermés. Scan du terrain. 3 observations notées mentalement.\n\n55-60 min — CLÔTURE : Expirations longues. Mains sur le cœur. Question intérieure. Extinction de la bougie. Journal (2 minutes)."
        }
      ]
    },
    minutePlan: [
      { time: "0–8 min", title: "OUVERTURE", content: "Posture, respiration préliminaire, reconnaissance du mental, intention." },
      { time: "8–20 min", title: "CYCLE 1 — Doux", content: "Impression 3 min → rémanence → exercice simple 7 min → observation." },
      { time: "20–35 min", title: "CYCLE 2 — Montée", content: "Impression 4 min → rémanence → exercice approfondi 8 min → observation." },
      { time: "35–50 min", title: "CYCLE 3 — Sommet", content: "Impression 5 min → rémanence longue 5 min → présence totale dans le terrain." },
      { time: "50–55 min", title: "INTÉGRATION ACTIVE", content: "Yeux fermés, plus de stimuli. Scan du terrain. 3 observations retenues." },
      { time: "55–60 min", title: "CLÔTURE", content: "Descente, geste de clôture, journal." }
    ],
    keyPhrase: "Une séance d'une heure est un voyage complet — ouverture, montée, sommet, descente, retour. Respecter cette architecture, c'est respecter l'intelligence du terrain.",
    journalQuestions: [
      "Lors de ma première séance d'une heure complète, comment ai-je vécu les différentes phases — lesquelles étaient naturelles, lesquelles demandaient plus d'effort ?",
      "Quel est le thème des prochaines séances que je vais construire ?",
      "Comment vais-je organiser mon calendrier de pratique pour les prochaines semaines ?"
    ]
  });

})();
