/* Axis Lumen Studio — Enrichissement premium — Partie 2 (cours 19-50)
   RÈGLE : ne jamais citer phosphènes, phosphénisme, Lefébure. */
(function () {
  "use strict";

  function enrich(id, data) {
    var list = window.AXIS_ONE_HOUR_COURSES || [];
    var c = list.find(function (x) { return x.id === id; });
    if (c) Object.assign(c, data);
  }

  // ── C019 — Respiration naturelle ─────────────────────────────────────────
  enrich("c019", {
    longSummary: "La respiration naturelle est le fondement de toutes les pratiques respiratoires. Avant d'apprendre à moduler le souffle, il faut observer ce qui se passe réellement quand on respire sans y penser : souvent, on découvre une respiration thoracique superficielle, asymétrique, légèrement bloquée dans certaines phases. Cette observation honnête est le premier pas.\n\nLe rythme 4/4 — quatre secondes à l'inspiration, quatre secondes à l'expiration — est le rythme le plus équilibré et le plus universel. Il correspond à la fréquence cardiaque au repos d'un adulte en bonne santé, et il est suffisamment lent pour activer le système parasympathique sans être inconfortable. Ce cours rééduque le souffle à ce rythme naturel et crée la fondation sur laquelle tous les autres rythmes respiratoires seront construits.",
    pedagogicalObjective: "Observer et rééduquer la respiration naturelle au rythme 4/4 comme fondation de toutes les pratiques respiratoires.",
    initiaticObjective: "Reconnaître dans le souffle le premier acte conscient de chaque seconde — et reprendre ce premier acte en main.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Observe ta respiration exactement comme elle est. Sans la modifier. Sans la juger. Juste observer pendant 5 minutes." },
      { time: "5–15 min",  title: "Enseignement",  content: "Anatomie respiratoire de base. Le rythme 4/4. Système sympathique vs parasympathique. Effets du souffle sur le système nerveux." },
      { time: "15–40 min", title: "Pratique",      content: "Respiration 4/4 guidée : 5 min allongé → 5 min assis → 5 min debout → 10 min assis en consolidant." },
      { time: "40–50 min", title: "Contemplation", content: "Respiration libre — ni 4/4 ni autre rythme imposé. Laisse le corps choisir. Observe comment il a changé depuis le début." },
      { time: "50–57 min", title: "Carnet",        content: "Compare ta respiration de départ (observation initiale) avec maintenant. Quelles différences ? Qu'est-ce que cela révèle ?" },
      { time: "57–60 min", title: "Clôture",       content: "Un soupir conscient : inspire à fond, retiens 2 secondes, expire longuement avec un son. Puis reviens à la respiration libre." }
    ],
    keyPhrase: "Le souffle est le seul acte automatique que tu peux reprendre en main à tout moment — c'est ta liberté immédiate.",
    journalQuestions: [
      "Comment respirais-tu avant ce cours — et qu'est-ce que cette observation t'a révélé sur ton état de base ?",
      "Y a-t-il des situations dans ta vie où tu 'retiens' le souffle — et qu'est-ce que cela signifie ?",
      "Si ta façon de respirer reflétait ta façon de vivre, quel serait le principal changement à faire ?"
    ]
  });

  // ── C020 — Respiration diaphragmatique ────────────────────────────────────
  enrich("c020", {
    longSummary: "Le diaphragme est le muscle le plus important du corps après le cœur — et le plus négligé. Cette grande coupole musculaire qui sépare le thorax de l'abdomen est le moteur principal de la respiration, le masseur naturel des organes digestifs, et le régulateur direct du nerf vague. Apprendre à respirer avec le diaphragme, c'est activer simultanément la respiration, la digestion et le système nerveux parasympathique.\n\nLe rythme 5/5 de cette pratique — cinq secondes à l'inspiration, cinq secondes à l'expiration — est légèrement plus lent que le rythme naturel 4/4, ce qui permet d'approfondir l'activation parasympathique. Associé à la conscience du ventre qui se gonfle à l'inspire et se vide à l'expire, ce rythme crée un état de calme profond qui est le socle de toutes les pratiques méditatives.",
    pedagogicalObjective: "Maîtriser la respiration diaphragmatique complète au rythme 5/5 et comprendre son action sur le système nerveux autonome.",
    initiaticObjective: "Retrouver le souffle primaire de l'enfant — avant que le stress et l'habitude n'aient durci la ceinture abdominale.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Allonge-toi. Pose une main sur le ventre, une main sur la poitrine. Observe : laquelle se lève à l'inspiration ?" },
      { time: "5–15 min",  title: "Enseignement",  content: "Anatomie du diaphragme. Nerf vague et système parasympathique. Rythme 5/5 et ses effets mesurables." },
      { time: "15–40 min", title: "Pratique",      content: "Respiration diaphragmatique guidée 5/5 : 10 min allongé (main sur ventre) → 10 min assis → 10 min avec visualisation du diaphragme comme vague." },
      { time: "40–50 min", title: "Contemplation", content: "Respiration diaphragmatique libre. Laisse le ventre se gonfler et se vider comme l'océan. Sens la paix qui monte de la profondeur du souffle." },
      { time: "50–57 min", title: "Carnet",        content: "Où tu sentais la respiration avant, et où tu la sens maintenant. Sens-tu une différence dans ton état de calme ?" },
      { time: "57–60 min", title: "Clôture",       content: "Pose les deux mains sur le ventre. Remercie ton diaphragme — il travaille sans relâche depuis ta naissance." }
    ],
    keyPhrase: "Respire avec le ventre et tu auras la sagesse du corps. Respire avec la poitrine et tu auras l'anxiété de la tête.",
    journalQuestions: [
      "Avant ce cours, savais-tu que tu respirais de façon thoracique plutôt que diaphragmatique ? Qu'est-ce que cela t'apprend ?",
      "Dans quelles situations de stress dans ta vie ta respiration s'emballe ou se bloque — et que se passerait-il si tu utilisais ce rythme à ce moment ?",
      "Le ventre est souvent appelé le 'deuxième cerveau' — qu'est-ce que le tien te dit quand tu l'écoutes ?"
    ]
  });

  // ── C021 — Respiration carrée ─────────────────────────────────────────────
  enrich("c021", {
    longSummary: "La respiration carrée est une pratique ancienne que l'on retrouve dans le yoga (box breathing), dans les traditions militaires modernes pour la gestion du stress, et dans le bouddhisme tibétain comme préparation à la méditation profonde. Sa structure — quatre phases égales de même durée — crée une symétrie parfaite qui régule le système nerveux avec une précision remarquable.\n\nLa version 4×4 (4 secondes chaque phase) est la plus accessible. La version 5×5 commence à demander une maîtrise du souffle. La version 8×8 est réservée aux pratiquants confirmés. Ce cours enseigne la progression depuis 4×4 jusqu'à 6×6, avec une attention particulière aux deux rétentions — pleine et vide — qui sont les phases les plus transformatrices et les plus délicates à bien exécuter.",
    pedagogicalObjective: "Maîtriser la respiration carrée en quatre phases égales, en progressant de 4×4 à 6×6 avec les rétentions.",
    initiaticObjective: "Découvrir que le silence entre deux souffles — la rétention — est l'espace où la conscience se révèle à elle-même.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi droit. Expire complètement. Dans ce vide, prends conscience que tu es à l'équilibre entre deux mondes." },
      { time: "5–15 min",  title: "Enseignement",  content: "Les quatre phases et leur signification. La rétention pleine (plénitude) vs la rétention vide (vide, mort symbolique). Progression 4×4 → 6×6." },
      { time: "15–40 min", title: "Pratique",      content: "10 min de respiration carrée 4×4 → 5 min de transition → 10 min de respiration carrée 5×5 → 5 min de retour libre." },
      { time: "40–50 min", title: "Contemplation", content: "Dans la rétention vide, observe : qu'y a-t-il dans ce silence ? Pas une pensée, pas une image — juste la conscience de la conscience." },
      { time: "50–57 min", title: "Carnet",        content: "Quelle phase de la respiration carrée était la plus difficile ? Quelle phase t'a le plus apaisé ?" },
      { time: "57–60 min", title: "Clôture",       content: "Respiration libre. Sens la différence avec le point de départ. C'est mesurable — c'est réel." }
    ],
    keyPhrase: "Dans les quatre temps du souffle carré, il y a les quatre saisons de l'âme — apprends à habiter chacune.",
    journalQuestions: [
      "La rétention après l'expiration — le vide du souffle — est-elle apaisante ou anxiogène pour toi ? Qu'est-ce que cela révèle ?",
      "Si les quatre phases du souffle carré correspondaient à des phases de ta vie, dans laquelle te trouves-tu actuellement ?",
      "La régularité du rythme carré — est-elle contraignante ou libératrice pour toi dans la pratique ?"
    ]
  });

  // ── C022 — Respiration triangulaire ─────────────────────────────────────
  enrich("c022", {
    longSummary: "La respiration triangulaire supprime la rétention vide — il n'y a que trois phases : inspire, rétention pleine, expire. Cette asymétrie volontaire crée un effet de 'montée' : l'énergie s'accumule pendant la rétention pleine et se libère dans l'expiration. C'est un rythme activant, idéal pour commencer une journée, préparer une pratique intense ou sortir d'un état de létharge.\n\nLe rythme 4/4/4 (quatre secondes par phase) est le point de départ. La progression vers 5/5/5 puis 6/6/6 approfondit l'effet. Ce cours explique aussi pourquoi la suppression de la rétention vide n'est pas un manque mais un choix : en restant dans le plein, on travaille la capacité à tenir la plénitude sans la déverser immédiatement — une qualité initiatique fondamentale.",
    pedagogicalObjective: "Maîtriser la respiration triangulaire en trois phases et comprendre son action sur l'activation et l'accumulation d'énergie.",
    initiaticObjective: "Apprendre à tenir la plénitude — ne pas se vider dès qu'on est plein — comme pratique de maîtrise intérieure.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Bâille deux fois. Étire les bras vers le haut. Tu es prêt pour une pratique activante." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le triangle respiratoire : inspire-plein-expire. Pourquoi trois phases au lieu de quatre. L'effet d'accumulation et d'ascension." },
      { time: "15–40 min", title: "Pratique",      content: "10 min de respiration triangulaire 4/4/4 → 15 min de 5/5/5 → 10 min de retour spontané et observation." },
      { time: "40–50 min", title: "Contemplation", content: "Assis dans l'énergie accumulée par la pratique, laisse-la circuler librement dans le corps. Ne la contrôle pas — guide-la avec ton attention." },
      { time: "50–57 min", title: "Carnet",        content: "Sens-tu une différence entre le début et la fin ? Dans quel état es-tu — actif, calme, ouvert, concentré ?" },
      { time: "57–60 min", title: "Clôture",       content: "Deux respirations rectangulaires (inspire court, expire long) pour redescendre doucement avant de terminer." }
    ],
    keyPhrase: "Le triangle monte — garde la plénitude en toi assez longtemps pour qu'elle devienne ta nature.",
    journalQuestions: [
      "As-tu l'habitude de 'te vider' dès que tu es plein — dans les conversations, les relations, la créativité ? Ce rythme t'a-t-il fait voir cela ?",
      "La rétention pleine était-elle confortable ou oppressante ? Comment as-tu géré l'inconfort si présent ?",
      "Après 25 minutes de respiration triangulaire, dans quel état te trouves-tu — et est-ce l'état que tu voulais ?"
    ]
  });

  // ── C023 — Respiration rectangulaire ─────────────────────────────────────
  enrich("c023", {
    longSummary: "La respiration rectangulaire est l'outil le plus puissant pour activer le système nerveux parasympathique. Son principe : l'expiration est deux fois plus longue que l'inspiration (ratio 1:2), sans rétention. Cette asymétrie simple produit un effet de ralentissement cardiaque, de détente musculaire profonde et de calme mental qui est neurophysiologiquement démontré — c'est la base de toutes les techniques de régulation des forces de l'urgence.\n\nLe rythme 4/8 est accessible à tous. La progression vers 5/10 puis 6/12 approfondit l'effet. Ce cours enseigne aussi l'utilisation stratégique de la respiration rectangulaire : avant de dormir, après un conflit, au milieu d'une journée stressante, ou comme transition entre une pratique active et un état méditatif. C'est le souffle de la paix — simple, efficace, immédiatement vérifiable.",
    pedagogicalObjective: "Maîtriser la respiration rectangulaire (ratio 1:2) et savoir l'utiliser stratégiquement pour induire le calme profond.",
    initiaticObjective: "Découvrir que la paix intérieure n'est pas un état qu'on attend — c'est un état qu'on crée délibérément avec chaque souffle.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Note ton état de tension sur 10. Tu vas le mesurer à nouveau dans 25 minutes." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le ratio 1:2. Nerf vague et activation parasympathique. Pourquoi l'expiration longue est plus efficace que n'importe quel anxiolytique naturel." },
      { time: "15–40 min", title: "Pratique",      content: "10 min de respiration 4/8 → 10 min de 5/10 → 5 min de 6/12 → 5 min de retour libre." },
      { time: "40–50 min", title: "Contemplation", content: "Dans le calme induit, laisse émerger ce qui a besoin de se déposer. Pas de travail — juste de la réception." },
      { time: "50–57 min", title: "Carnet",        content: "Note ton état de tension sur 10 maintenant. La différence est ta mesure de l'efficacité. Note aussi ce qui s'est 'déposé' pendant la contemplation." },
      { time: "57–60 min", title: "Clôture",       content: "Engage-toi : je vais utiliser 5 minutes de respiration rectangulaire _____ (nomme le moment de ta journée de demain)." }
    ],
    keyPhrase: "Expire deux fois plus longtemps que tu n'inspires — et tu actives la paix comme un interrupteur.",
    journalQuestions: [
      "De combien de points a diminué ton niveau de tension entre le début et la fin ? Est-ce surprenant ?",
      "Dans quel contexte de ta vie tu pourrais utiliser immédiatement ce souffle comme outil — et pourquoi ne l'avais-tu pas fait avant ?",
      "Si la respiration rectangulaire est aussi simple et efficace, pourquoi les gens ne la pratiquent-ils pas spontanément ?"
    ]
  });

  // ── C024 — Le Pneumophène ────────────────────────────────────────────────
  enrich("c024", {
    longSummary: "Le pneumophène — mot forgé pour décrire la 'lumière respiratoire' — est une pratique unique qui conjugue deux principes : la légère privation d'air (souffle lent avec une douce sensation de manque) et la conscience de la lumière intérieure. Cette combinaison crée un état très particulier : une conscience aiguisée, légèrement modifiée, similaire en douceur à ce que les traditions nomment 'état de vigilance intérieure'.\n\nLe rythme 8/8 — huit secondes à l'inspiration, huit secondes à l'expiration — est suffisamment lent pour créer la légère soif d'air caractéristique sans provoquer aucun malaise. Vingt minutes de cette pratique produit un état que beaucoup décrivent comme 'une lumière intérieure plus nette' — d'où le nom. Ce cours est une introduction douce à des états de conscience que les grandes traditions associent au début de l'éveil.",
    pedagogicalObjective: "Maîtriser le pneumophène en rythme 8/8 avec légère soif d'air et conscience de la lumière intérieure.",
    initiaticObjective: "Vivre l'expérience de la conscience aiguisée par la légère privation d'air — et reconnaître en elle un outil d'éveil.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Contre-indication absolue : ne jamais pratiquer après l'alcool, un repas copieux, ou si tu te sens hypoglycémique. Vérifie ton état." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le pneumophène : définition, mécanisme, sécurité. La légère soif d'air — ce qu'elle est et ce qu'elle n'est pas. Le rythme 8/8." },
      { time: "15–35 min", title: "Pratique",      content: "Respiration 8/8 guidée : 20 minutes en position assise, yeux fermés, conscience sur la lumière intérieure." },
      { time: "35–50 min", title: "Contemplation", content: "Dans l'état post-pneumophène, la conscience est souvent plus nette et plus silencieuse. Reste dans ce silence le plus longtemps possible." },
      { time: "50–57 min", title: "Carnet",        content: "Décris l'état dans lequel tu te trouves — avec des mots précis, pas poétiques. Que vois-tu intérieurement ? Qu'entends-tu ?" },
      { time: "57–60 min", title: "Clôture",       content: "Trois respirations normales. Bois un verre d'eau. Reviens complètement." }
    ],
    keyPhrase: "La légère soif d'air n'est pas un manque — c'est la conscience qui se retourne vers sa propre lumière.",
    journalQuestions: [
      "Comment décris-tu l'état après 20 minutes de pneumophène — en quoi est-il différent de ton état habituel ?",
      "La légère soif d'air était-elle inconfortable ou étrange — et comment as-tu géré cet inconfort ?",
      "Si la lumière intérieure est plus visible dans cet état, qu'est-ce que cela t'apprend sur ce qui la masque dans l'état ordinaire ?"
    ]
  });

  // ── C025 — Intégration respiratoire complète ──────────────────────────────
  enrich("c025", {
    longSummary: "Après avoir maîtrisé les cinq rythmes respiratoires séparément, cette séance les intègre dans une pratique continue d'une heure. La logique de la séquence suit les états de conscience qu'elle induit : on commence par le rythme naturel (observation), on active avec le triangulaire, on équilibre avec le carré, on apaise avec le rectangulaire, et on conclut avec le pneumophène pour une conscience maximalement aiguisée.\n\nC'est la séance la plus complète de la famille Inversion — et elle prépare directement aux pratiques de perception subtile qui suivront. Une respiration maîtrisée est la fondation invisible de toute pratique avancée : elle stabilise l'état de conscience, régule le système nerveux, et crée les conditions dans lesquelles les perceptions subtiles deviennent accessibles.",
    pedagogicalObjective: "Exécuter une heure de pratique respiratoire intégrée combinant les cinq rythmes dans une séquence logique.",
    initiaticObjective: "Expérimenter que le souffle maîtrisé est la clé qui ouvre toutes les autres portes de la conscience.",
    minutePlan: [
      { time: "0–5 min",   title: "Observation",   content: "Souffle naturel — observe sans modifier. C'est ton point de départ." },
      { time: "5–15 min",  title: "Triangulaire",  content: "5/5/5 — monte, accumule, active." },
      { time: "15–30 min", title: "Carré",         content: "5×5 — équilibre toutes les phases, stabilise." },
      { time: "30–45 min", title: "Rectangulaire", content: "4/8 — apaise, détend, calme profond." },
      { time: "45–55 min", title: "Pneumophène",   content: "8/8 avec légère soif d'air — aiguise la conscience." },
      { time: "55–60 min", title: "Silence",       content: "5 minutes de silence complet. Respiration libre. Observation." }
    ],
    keyPhrase: "Cinq souffles, cinq états — un seul praticien qui apprend à habiter tous les registres de son être.",
    journalQuestions: [
      "Quel rythme respiratoire t'a semblé le plus 'naturel' — et pourquoi selon toi ?",
      "Quel rythme t'a demandé le plus d'effort — et qu'est-ce que cela révèle sur ton état de base ?",
      "Après une heure de pratique respiratoire intégrée, dans quelle mesure ta perception du monde autour de toi a-t-elle changé ?"
    ]
  });

  // ── C026 — Programme 15 jours Complet ─────────────────────────────────────
  enrich("c026", {
    longSummary: "Le programme de 15 jours complet est la synthèse des deux familles fondamentales : chaque jour, une séance de balancement suivie d'une pratique respiratoire. Ce double travail quotidien crée une transformation profonde et mesurable en deux semaines : meilleure cohérence hémisphérique, système nerveux plus régulé, états de conscience plus accessibles et plus stables.\n\nCe programme est recommandé deux fois par an — en début de printemps et en début d'automne — comme 'mise à jour' intérieure. Il représente l'équivalent d'une retraite de méditation intensive, mais intégrée dans la vie quotidienne. La régularité est sa force : ce n'est pas l'intensité qui transforme, c'est la répétition consciente.",
    pedagogicalObjective: "Compléter 15 jours de double pratique quotidienne (balancement + respiration) pour une transformation profonde et mesurable.",
    initiaticObjective: "Faire de la pratique quotidienne non plus une obligation mais un choix libre et joyeux — parce qu'on en ressent les effets.",
    minutePlan: [
      { time: "0–5 min",   title: "Engagement",    content: "Chaque matin : 1 minute d'intention. 'Aujourd'hui je pratique parce que...' (complète chaque matin différemment.)" },
      { time: "5–35 min",  title: "Balancement",   content: "Le balancement du jour selon le programme. Suivi rigoureusement." },
      { time: "35–55 min", title: "Respiration",   content: "Le rythme respiratoire du jour selon le programme. Suivi rigoureusement." },
      { time: "55–58 min", title: "Trace",         content: "3 minutes de silence complet dans l'état induit." },
      { time: "58–60 min", title: "Carnet",        content: "3 mots clés + note de 1-10 sur la qualité de l'état post-pratique." },
      { time: "Bilan J15", title: "Bilan final",   content: "Le dernier jour : compare ta note moyenne sur 15 jours avec ton état au jour 1. C'est ta mesure de transformation." }
    ],
    keyPhrase: "Deux semaines de pratique régulière font ce que deux ans de lecture ne peuvent pas faire.",
    journalQuestions: [
      "Pourquoi maintenant ? Qu'est-ce qui t'a poussé à commencer ce programme à ce moment de ta vie ?",
      "Quel est l'obstacle numéro un que tu anticipez — et comment tu l'as déjà surmonté une fois dans ta vie ?",
      "Si dans 15 jours tu regardes en arrière, quelle serait la chose que tu es le plus fier d'avoir accomplie ?"
    ]
  });

  // ── C027 — Yoga du temple vivant ──────────────────────────────────────────
  enrich("c027", {
    longSummary: "Le mot 'yoga' signifie 'union' — l'union du corps et de l'esprit, de la terre et du ciel, de l'individu et de l'universel. Dans la perspective de cette école, le yoga n'est pas une série de postures physiques — c'est une attitude : habiter le corps comme un espace sacré, chaque posture étant une déclaration que 'ici, maintenant, je suis présent à moi-même'.\n\nCe cours pose les fondations de cette approche du yoga : la posture juste (ni rigide ni avachie), la respiration associée au mouvement, la conscience de l'axe central du corps, et l'intention de traiter chaque position comme une porte d'entrée vers le silence intérieur. Pas de performance, pas de souplesse requise — seulement la qualité de présence à ce qui se passe.",
    pedagogicalObjective: "Comprendre et pratiquer le yoga comme présence consciente au corps — un espace sacré à habiter plutôt qu'un corps à performer.",
    initiaticObjective: "Déclarer par le corps : 'Je suis ici, je suis présent, ce corps est mon temple.'",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Tiens-toi debout. Sens tes pieds sur le sol. Sens le sommet de ton crâne. Tu es un axe entre la terre et le ciel. C'est le yoga." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le yoga comme attitude de présence. L'axe du corps. La posture juste. La différence entre performance et habitation du corps." },
      { time: "15–40 min", title: "Pratique",      content: "6 postures simples : debout/ancré → extension vers le haut → torsion douce → flexion avant → posture d'équilibre → posture de repos." },
      { time: "40–50 min", title: "Contemplation", content: "Shavasana (allongé sur le dos) pendant 10 minutes. Laisse le corps intégrer ce qui vient d'être pratiqué." },
      { time: "50–57 min", title: "Carnet",        content: "Quelle posture t'a le plus mis au défi — physiquement ou mentalement ? Qu'est-ce que cette résistance révèle ?" },
      { time: "57–60 min", title: "Clôture",       content: "Mains jointes devant le cœur. Incline doucement la tête. Un geste simple qui dit : 'Je reconnais le sacré dans ce corps.'" }
    ],
    keyPhrase: "Le yoga n'est pas ce que fait ton corps — c'est la qualité d'attention que tu lui portes.",
    journalQuestions: [
      "Quel est ton rapport habituel à ton corps — outil, objet, ennemi, allié ? Ce cours a-t-il modifié ce rapport ?",
      "Quelle posture t'a semblé la plus 'juste' — celle où tu étais vraiment là, dans le corps, sans être ailleurs ?",
      "Si ton corps était un temple, qu'est-ce que tu changerais dans la façon dont tu l'habites quotidiennement ?"
    ]
  });

  // ── C028 — Postures statiques et axe ─────────────────────────────────────
  enrich("c028", {
    longSummary: "La posture statique — tenir une position sans bouger pendant une durée prolongée — est l'une des pratiques les plus difficiles et les plus révélatrices qui soit. Elle révèle immédiatement les zones de tension chronique dans le corps, les habitudes posturales inconscientes, et la capacité à rester présent quand la situation devient inconfortable. En ce sens, chaque posture tenue est un miroir de la façon dont on tient sa vie.\n\nCe cours enseigne l'art de 'tenir la posture' : comment s'installer dans une position sans la rigidifier, comment respirer dans l'inconfort pour le transformer plutôt que le fuir, et comment distinguer la douleur utile (étirement, résistance) de la douleur nuisible (articulation, nerf). La posture statique tenue avec conscience est l'un des exercices les plus efficaces pour développer la volonté intérieure.",
    pedagogicalObjective: "Maîtriser l'art de tenir une posture statique avec conscience, en travaillant la présence dans l'inconfort.",
    initiaticObjective: "Développer la capacité à rester stable quand la situation devient inconfortable — dans le corps comme dans la vie.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Debout. Ferme les yeux. Sens dans quelle partie de ton corps la tension habite — avant même de commencer à te tenir droit." },
      { time: "5–15 min",  title: "Enseignement",  content: "Pourquoi tenir une posture est si difficile. L'axe central du corps. La différence entre tension utile et douleur nuisible." },
      { time: "15–45 min", title: "Pratique",      content: "4 postures statiques : assis droit 5 min → debout les bras levés 3 min → position de l'arbre 5 min × 2 côtés → assis lotus ou demi-lotus 10 min." },
      { time: "45–50 min", title: "Contemplation", content: "Allongé. Observe les zones qui vibrent, qui ont travaillé, qui se relâchent maintenant. Le corps raconte son expérience." },
      { time: "50–57 min", title: "Carnet",        content: "Quelle posture t'a le plus mis au défi — et qu'as-tu fait de ton mental pendant ces moments difficiles ?" },
      { time: "57–60 min", title: "Clôture",       content: "Trois rotations douces des épaules. Bâille. Reviens au mouvement naturel." }
    ],
    keyPhrase: "Ce que tu fais de l'inconfort dans la posture, tu le fais de l'inconfort dans ta vie.",
    journalQuestions: [
      "Quelle posture statique a été la plus difficile, et comment as-tu traversé l'inconfort ?",
      "As-tu envie de fuir quand c'est difficile, ou d'aller vers la difficulté pour voir ce qu'elle a à t'apprendre ?",
      "Si tenir la posture reflète comment tu tiens ta vie, que révèle ta tendance à bouger, à ajuster, à t'agiter ?"
    ]
  });

  // ── C029 — Respiration naturelle (famille Yoga) ────────────────────────────
  enrich("c029", {
    longSummary: "Ce cours revisit la respiration naturelle depuis la perspective du yoga — non plus comme rééducation neurologique mais comme retour à la source. La respiration naturelle du yoga est abdominale, lente, silencieuse, et rythmée par l'intention plutôt que par l'automatisme. Avant toute technique, le yogi observe ce que le corps fait spontanément — et constate souvent que des décennies de stress ont durci, superficialisé et désynchronisé le souffle.\n\nLe travail ici est une désapprentissage : lâcher les habitudes respiratoires acquises pour retrouver le souffle originel. Ce souffle n'a pas besoin d'être appris — il doit être libéré. Ce cours offre les pratiques pour cette libération : étirement des espaces intercostaux, massage du diaphragme, pratique du son continu, et méditation du souffle libre.",
    pedagogicalObjective: "Retrouver la respiration abdominale naturelle et libre avant toute technique, en libérant les habitudes respiratoires acquises.",
    initiaticObjective: "Reconnaître dans le souffle libéré la respiration de l'enfant — et accepter de redevenir cet enfant pour quelques minutes chaque jour.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Allonge-toi. Ferme les yeux. Laisse le souffle aller et venir exactement comme il veut. Observe seulement." },
      { time: "5–15 min",  title: "Enseignement",  content: "Le souffle originel vs le souffle conditionné. Comment le stress modifie la respiration durablement. Les trois blocages principaux." },
      { time: "15–40 min", title: "Pratique",      content: "Libération en 3 étapes : étirements des côtes (5 min) → massage abdominal (5 min) → son continu AAAA sur l'expiration (10 min) → silence (10 min)." },
      { time: "40–50 min", title: "Contemplation", content: "Respiration complètement libre. Observe la qualité du souffle qui reste maintenant — est-il différent de celui du début ?" },
      { time: "50–57 min", title: "Carnet",        content: "Écris en une phrase : 'Mon souffle originel me dit...' Complète sans réfléchir, laisse venir." },
      { time: "57–60 min", title: "Clôture",       content: "Pose les mains sur les côtes. Sens les poumons se dilater. Remercie ce système qui t'a maintenu en vie sans te demander ton avis." }
    ],
    keyPhrase: "Tu n'apprends pas à respirer — tu te rappelles comment.",
    journalQuestions: [
      "Quelle est la principale habitude respiratoire qui limite ton souffle ? D'où vient-elle selon toi ?",
      "As-tu senti, même brièvement, ce 'souffle originel' — ce moment où le souffle est devenu fluide et naturel ?",
      "Si ton souffle pouvait parler, que dirait-il de comment tu traites le corps qui le porte ?"
    ]
  });

  // ── C030 — Respiration carrée (famille Yoga) ─────────────────────────────
  enrich("c030", {
    longSummary: "Dans la tradition du yoga, la respiration carrée porte le nom de 'sama vritti' — rythme uniforme. C'est l'une des pratiques fondamentales du pranayama, présentée dans les textes classiques comme le préalable à toute méditation profonde. Son principe : égaliser les quatre phases du souffle jusqu'à ce que le mental, privé de la variation qui l'occupe, s'apaise de lui-même.\n\nCe cours aborde la respiration carrée depuis l'angle yogique : pas seulement comme technique de régulation, mais comme pratique d'équanimité intérieure. Chaque phase est associée à une qualité : l'inspiration à l'accueil, la rétention pleine à la gratitude, l'expiration au lâcher-prise, la rétention vide à l'abandon. Ces quatre qualités pratiquées dans le souffle se transposent progressivement dans la vie.",
    pedagogicalObjective: "Approfondir la respiration carrée depuis la perspective du yoga et l'associer aux quatre qualités intérieures fondamentales.",
    initiaticObjective: "Pratiquer l'équanimité dans le souffle jusqu'à ce qu'elle devienne une posture de l'âme dans la vie.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi en posture de méditation. Trois respirations libres. Sens le sol sous toi. Sens l'air autour de toi. Tu es là." },
      { time: "5–15 min",  title: "Enseignement",  content: "Sama vritti dans la tradition yogique. Les quatre qualités associées aux quatre phases. L'équanimité comme but." },
      { time: "15–40 min", title: "Pratique",      content: "20 min de sama vritti 5×5 avec conscience de la qualité associée à chaque phase. Puis 5 min de respiration libre." },
      { time: "40–50 min", title: "Contemplation", content: "Dans le calme créé, quelle des quatre qualités (accueil, gratitude, lâcher-prise, abandon) est la plus présente ? La moins présente ?" },
      { time: "50–57 min", title: "Carnet",        content: "Quelle qualité as-tu le plus de mal à pratiquer dans ta vie en ce moment — et comment cela s'est-il montré dans le souffle ?" },
      { time: "57–60 min", title: "Clôture",       content: "Un OM silencieux — ressenti mais non exprimé. La vibration intérieure qui contient tout." }
    ],
    keyPhrase: "Quatre phases égales dans le souffle — quatre vertus égales dans la vie.",
    journalQuestions: [
      "L'accueil, la gratitude, le lâcher-prise, l'abandon — laquelle de ces quatre qualités est la plus difficile pour toi ?",
      "As-tu remarqué comment ton mental s'est modifié au fil de la pratique — plus agité, plus calme, plus vide ?",
      "Si tu pratiquais la respiration carrée chaque matin, quelle qualité espères-tu voir s'installer progressivement dans ta vie ?"
    ]
  });

  // ── C031 — Respiration triangulaire et rectangulaire (Yoga) ────────────────
  enrich("c031", {
    longSummary: "Ce cours explore les deux respirations asymétriques — triangulaire et rectangulaire — depuis la perspective du yoga : non pas comme techniques de régulation mais comme outils de navigation entre les états de conscience. La respiration triangulaire monte, active, prépare à l'action ou à la pratique intense. La respiration rectangulaire descend, apaise, prépare au sommeil ou à la méditation profonde.\n\nMaîtriser ces deux rythmes, c'est avoir un tableau de bord de son système nerveux : on peut choisir de monter ou de descendre son niveau d'activation selon les besoins du moment. Cette maîtrise est une forme de liberté intérieure concrète — plus besoin de subir son état, on peut le moduler.",
    pedagogicalObjective: "Utiliser la respiration triangulaire et rectangulaire comme outils de navigation entre états de conscience activé et apaisé.",
    initiaticObjective: "Acquérir la liberté de choisir son état intérieur plutôt que de le subir.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Note ton état actuel — niveau d'énergie sur 10, niveau de calme sur 10. Tu vas apprendre à naviguer entre les deux." },
      { time: "5–15 min",  title: "Enseignement",  content: "Triangulaire = activation. Rectangulaire = apaisement. Comment passer de l'un à l'autre. Applications concrètes dans la vie." },
      { time: "15–35 min", title: "Pratique",      content: "10 min de triangulaire 5/5/5 → transition en 5 respirations normales → 10 min de rectangulaire 4/8." },
      { time: "35–50 min", title: "Contemplation", content: "Respiration libre. Sens où ton corps a atterri — ni trop actif ni trop endormi. L'équilibre naturel entre les deux." },
      { time: "50–57 min", title: "Carnet",        content: "Deux colonnes : 'Situations où j'ai besoin de monter' et 'Situations où j'ai besoin de descendre'. Note 5 exemples de ta vie dans chaque colonne." },
      { time: "57–60 min", title: "Clôture",       content: "Tu as maintenant deux outils de navigation. Nomme-les clairement avant de fermer le carnet." }
    ],
    keyPhrase: "Monter ou descendre — tu peux choisir. C'est cela, la liberté du souffle.",
    journalQuestions: [
      "Dans ta vie actuelle, as-tu plutôt besoin de monter (plus d'énergie, d'action) ou de descendre (plus de calme, de paix) ?",
      "Y a-t-il des situations récurrentes où tu aimerais pouvoir modifier ton état instantanément — et quel souffle utiliserais-tu ?",
      "As-tu déjà utilisé le souffle consciemment dans ta vie sans savoir que c'était une technique ? Comment ?"
    ]
  });

  // ── C032 — Mantras ILLI ALLA OLLO RORO ──────────────────────────────────
  enrich("c032", {
    longSummary: "ILLI, ALLA, OLLO, RORO — ces quatre syllabes sont les mantras fondamentaux de la pratique des rythmes lumineux. Chacun est composé de deux voyelles et de deux consonnes choisies pour leur résonance dans une zone précise du corps : ILLI dans la tête (i = résonance crânienne), ALLA dans la poitrine (a = résonance thoracique), OLLO dans la gorge (o = résonance laryngée), RORO dans le ventre (r = résonance abdominale par la friction).\n\nLorsqu'ils sont chantés en rythme avec les balancements, ces mantras créent une double stimulation : le mouvement physique et la vibration vocale se combinent pour produire un effet synergique qui amplifie la rémanence et l'état de conscience modifié. Ce cours est une exploration complète de ces quatre mantras — leurs zones de résonance, leur association avec les balancements, et leur pratique combinée.",
    pedagogicalObjective: "Maîtriser les quatre mantras fondamentaux, leurs zones de résonance, et leur association avec les balancements.",
    initiaticObjective: "Découvrir que le son est une forme de lumière — et que ta voix peut illuminer ton corps de l'intérieur.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "En silence, pose l'attention successivement dans la tête, la poitrine, la gorge, le ventre. Ces quatre zones attendent leur mantra." },
      { time: "5–15 min",  title: "Enseignement",  content: "ILLI (tête), ALLA (poitrine), OLLO (gorge), RORO (ventre) : zones de résonance, mode de chant, association aux balancements." },
      { time: "15–40 min", title: "Pratique",      content: "5 min de chant ILLI seul → 5 min ALLA → 5 min OLLO → 5 min RORO → 10 min combinaison libre des quatre." },
      { time: "40–50 min", title: "Contemplation", content: "Silence complet après le chant. Dans ce silence, chaque zone vibre encore. Écoute cette vibration résiduelle — c'est le mantra qui continue sans toi." },
      { time: "50–57 min", title: "Carnet",        content: "Quel mantra résonnait le plus fort en toi ? Le moins fort ? Dessine un corps et note l'intensité dans chaque zone." },
      { time: "57–60 min", title: "Clôture",       content: "Un dernier ILLI très doux, presque inaudible. Laisse-le disparaître. Le silence qui suit est le vrai mantra." }
    ],
    keyPhrase: "ILLI dans la tête, ALLA dans le cœur, OLLO dans la gorge, RORO dans le ventre — ton corps est une cathédrale sonore.",
    journalQuestions: [
      "Quel mantra as-tu trouvé le plus difficile à chanter, et dans quelle zone du corps ressens-tu le plus de résistance ?",
      "Le chant a-t-il modifié ton état de conscience — et si oui, de quelle manière ?",
      "Si tu pouvais n'emporter qu'un seul mantra dans ta vie quotidienne, lequel choisirais-tu, et dans quels moments l'utiliserais-tu ?"
    ]
  });

  // ── C033 — OM et vibration intérieure ─────────────────────────────────────
  enrich("c033", {
    longSummary: "OM — ou AUM — est peut-être le son le plus étudié de l'histoire de l'humanité. Sa composition en trois phases (A-U-M) représente dans la tradition hindoue les trois états de conscience : l'éveil, le rêve, le sommeil profond. Le silence qui suit le M représente le quatrième état — turiya — la conscience pure sans objet. Ce n'est pas une croyance — c'est une structure vibratoire que l'on peut expérimenter directement.\n\nCe cours explore l'OM comme pratique vibratoire : comment le chanter pour sentir ses trois phases dans le corps, comment faire durer la vibration M (la plus transformatrice) et comment habiter le silence qui suit. Associé à la lumière intérieure et aux balancements, l'OM devient un outil de centration totale — corps, son, lumière et conscience unifiés dans un seul acte.",
    pedagogicalObjective: "Maîtriser le chant de l'OM en trois phases et sentir dans le corps la correspondance entre les états A, U, M et le silence final.",
    initiaticObjective: "Habiter l'OM du premier souffle jusqu'au dernier silence et reconnaître dans ce silence la conscience qui précède toute pensée.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Une longue expiration complète. Dans le vide qui suit, qui es-tu ? Commence l'OM depuis ce lieu." },
      { time: "5–15 min",  title: "Enseignement",  content: "AUM : A dans le ventre, U dans la poitrine, M dans la tête. Le silence après le M comme quatrième état. La résonance crânienne du M." },
      { time: "15–40 min", title: "Pratique",      content: "10 OM lents avec conscience des phases → 5 min de silence entre chaque série → 5 OM silencieux (ressentis mais non exprimés)." },
      { time: "40–50 min", title: "Contemplation", content: "Dans le silence post-OM, reste. Qui es-tu dans ce silence ? Pas une réponse conceptuelle — juste la présence." },
      { time: "50–57 min", title: "Carnet",        content: "Décris le silence qui suit l'OM — sa texture, sa qualité, sa durée avant que le mental ne reprenne. Est-ce un silence vide ou un silence plein ?" },
      { time: "57–60 min", title: "Clôture",       content: "Mains sur le cœur. Un OM mental, inaudible. Le plus long de la séance. Il n'y a pas de fin." }
    ],
    keyPhrase: "L'OM que tu peux entendre n'est pas le vrai OM — le vrai est le silence qui reste après.",
    journalQuestions: [
      "Avais-tu déjà pratiqué l'OM ? Comment cette pratique s'est-elle distinguée de tes expériences précédentes ?",
      "Le silence après l'OM — était-il vide ou plein ? Rempli de quoi ?",
      "Si tu pouvais vivre dans l'état que tu as touché pendant le silence post-OM, qu'est-ce qui changerait dans ta vie ?"
    ]
  });

  // ── C034 — Séquence souffle mantra et mouvement ────────────────────────────
  enrich("c034", {
    longSummary: "La synthèse de la famille Souffle intègre les trois dimensions travaillées séparément : le mouvement (balancements), le son (mantras) et le souffle (respirations rythmiques). Lorsque ces trois éléments sont combinés avec une intention claire, ils créent une pratique d'une puissance transformatrice bien supérieure à la somme de ses parties — une véritable alchimie du corps, de la voix et du souffle.\n\nLa clé de cette intégration est la fluidité : ne pas penser à 'faire trois choses à la fois' mais laisser les trois éléments s'imbriquer naturellement, l'un guidant l'autre. Le mouvement donne le rythme au souffle, le souffle donne la profondeur au mantra, le mantra donne l'intention au mouvement. Ce cours te guide dans cette intégration progressive.",
    pedagogicalObjective: "Intégrer fluidement balancement, mantra et respiration rythmique dans une pratique unifiée d'une heure.",
    initiaticObjective: "Expérimenter l'état dans lequel le corps, la voix et le souffle ne font qu'un — et reconnaître cet état comme un état de méditation avancée.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Assieds-toi. Balancement latéral lent. ILLI en rythme. Respiration 4/4. Ces trois choses séparées. Maintenant laisse-les devenir une." },
      { time: "5–10 min",  title: "Mouvement",     content: "Balancement latéral seul — sans son ni souffle particulier. Trouvez le rythme naturel." },
      { time: "10–20 min", title: "Son + Mouvement", content: "Ajoute ILLI au balancement. Laisse la syllabe rythmer le mouvement." },
      { time: "20–40 min", title: "Triple intégration", content: "Balancement + ILLI + respiration 4/4. Les trois ensemble. Pas d'effort — lâche le contrôle et laisse le corps trouver la fluidité." },
      { time: "40–55 min", title: "Dissolution",   content: "15 min d'immobilité complète. Plus de mouvement, plus de son, plus de rythme imposé. Laisse la trace de tout cela vibrer." },
      { time: "55–60 min", title: "Clôture",       content: "Note dans le carnet : quel moment pendant la pratique tu as senti les trois éléments se fondre en un ?" }
    ],
    keyPhrase: "Quand le corps, la voix et le souffle ne font plus qu'un, c'est la méditation — sans que tu aies eu besoin de chercher.",
    journalQuestions: [
      "Y a-t-il eu un moment où les trois éléments se sont synchronisés naturellement ? Décris ce que tu as ressenti.",
      "Quel élément était le plus difficile à intégrer avec les deux autres, et qu'est-ce que cela révèle ?",
      "Après cette pratique intégrative, comment te sens-tu — dans le corps, dans la tête, dans le cœur ?"
    ]
  });

  // ── C035 — Programme 15 jours Balancements et Respiration (Yoga) ──────────
  enrich("c035", {
    longSummary: "Ce programme de 15 jours combine les balancements et le yoga du souffle en une pratique quotidienne structurée. Chaque jour, une session de 45-60 minutes qui alterne mouvement rythmique et pratique respiratoire, créant une progression organique vers un état de cohérence corps-esprit de plus en plus stable. La particularité de ce programme : il ne demande aucune expertise technique — il demande seulement une présence régulière.\n\nLe programme est conçu sur un arc narratif de 15 jours : les cinq premiers jours posent les fondations (balancements de base + respiration naturelle), les jours 6-10 approfondissent et combinent, les jours 11-15 intègrent et consolident. À la fin, tu auras une routine quotidienne que tu pourras reproduire indéfiniment — parce qu'elle te fait du bien et que tu en ressens les effets mesurables.",
    pedagogicalObjective: "Établir une routine quotidienne de 15 jours combinant balancements et yoga du souffle pour créer une cohérence corps-esprit durable.",
    initiaticObjective: "Créer une habitude de pratique qui ne dépend pas de la motivation mais de l'expérience directe de ses effets.",
    minutePlan: [
      { time: "0–3 min",   title: "Intention du jour", content: "Un mot pour cette séance. Pas un objectif — une qualité à cultiver." },
      { time: "3–30 min",  title: "Balancement",   content: "Selon le programme du jour. Suivi rigoureusement." },
      { time: "30–50 min", title: "Souffle",        content: "Selon le programme du jour. Suivi rigoureusement." },
      { time: "50–57 min", title: "Intégration",   content: "Silence complet. Ni balancement ni souffle dirigé. Juste être." },
      { time: "57–60 min", title: "Carnet",        content: "Date, état avant/après sur 10, un insight de la séance, engagement pour demain." },
      { time: "Bilan J15", title: "Clôture programme", content: "Compare les carnets du jour 1 et du jour 15. Que s'est-il transformé ?" }
    ],
    keyPhrase: "La pratique quotidienne transforme la conscience — pas parce que tu y crois, mais parce qu'elle le fait.",
    journalQuestions: [
      "Quelle est la différence entre vouloir pratiquer et décider de pratiquer — et laquelle s'est manifestée dans ce programme ?",
      "Quels obstacles as-tu rencontrés et comment tu les as surmontés — ou pas ?",
      "Si tu devais garder une seule chose de ce programme pour le reste de ta vie, quelle serait-elle ?"
    ]
  });

  // ── C036 — Préparer une séance ────────────────────────────────────────────
  enrich("c036", {
    longSummary: "La préparation d'une séance est elle-même une pratique — pas une corvée administrative. La qualité de ce qui se passe pendant la séance dépend en grande partie de la qualité de ce qui se passe juste avant. Un lieu préparé, un corps disponible, une attention clarifiée, une intention formulée : ces quatre éléments créent un 'espace de pratique' qui amplifie tous les effets de la séance elle-même.\n\nCe cours enseigne le rituel de préparation : comment préparer le lieu (lumière, température, position), comment préparer le corps (étirements, souffle de transition, position assise ou allongée), comment clarifier l'attention (une minute de regard intérieur), et comment formuler une intention (pas un objectif de résultat mais une qualité de présence). Ces éléments pris ensemble durent 5 minutes — et ils valent le double de la séance qui suit.",
    pedagogicalObjective: "Maîtriser un rituel de préparation de séance en cinq minutes qui maximise la qualité de la pratique qui suit.",
    initiaticObjective: "Comprendre que le seuil est sacré — et que traverser consciemment le seuil vers la pratique est déjà la pratique.",
    minutePlan: [
      { time: "0–10 min",  title: "Théorie",       content: "Pourquoi la préparation change tout. Les quatre éléments : lieu, corps, attention, intention. Études de cas." },
      { time: "10–30 min", title: "Pratique guidée", content: "Pratique d'une préparation complète : 5 minutes de préparation → 20 minutes de séance libre → observation de la différence." },
      { time: "30–50 min", title: "Comparaison",   content: "Maintenant, commence une séance sans préparation. Observer la différence dans la qualité de l'état." },
      { time: "50–57 min", title: "Carnet",        content: "Note la différence entre les deux expériences. Quelle préparation spécifique a eu le plus d'effet ?" },
      { time: "57–60 min", title: "Clôture",       content: "Engage-toi : 'Chaque séance future commencera par au moins 3 minutes de préparation consciente.'" },
      { time: "",          title: "",              content: "" }
    ],
    keyPhrase: "La séance commence au moment où tu décides de préparer l'espace — pas au moment où tu fermes les yeux.",
    journalQuestions: [
      "As-tu remarqué une différence mesurable entre la séance préparée et la séance non préparée ?",
      "Quel élément de la préparation (lieu, corps, attention, intention) est le plus difficile à respecter pour toi ?",
      "Si tu traitais chaque séance comme un rendez-vous sacré plutôt qu'une tâche à cocher, qu'est-ce qui changerait ?"
    ]
  });

  // ── C037 — Clore une séance ────────────────────────────────────────────────
  enrich("c037", {
    longSummary: "La clôture d'une séance est aussi importante que son ouverture — et souvent la plus négligée. Arrêter brutalement une pratique après 45 minutes de travail profond, c'est comme fermer une porte à la volée dans une maison que tu viens de remplir de lumière. Une clôture consciente permet à l'expérience de s'intégrer, au système nerveux de se réorienter vers le quotidien, et à la conscience de déposer ce qui a été reçu avant de le perdre dans l'agitation.\n\nCe cours enseigne le rituel de clôture : retour progressif au corps, dépose de la trace lumineuse ou sonore, stabilisation du souffle, formulation d'une gratitude et d'un engagement de vie, et sortie en douceur. Ces cinq éléments, pratiqués en 5 minutes à la fin de chaque séance, multiplient l'effet d'intégration à long terme.",
    pedagogicalObjective: "Maîtriser un rituel de clôture de séance en cinq minutes pour maximiser l'intégration de ce qui a été vécu.",
    initiaticObjective: "Apprendre à déposer l'expérience avec soin — ni la retenir comme une possession ni l'abandonner comme si elle n'avait pas eu lieu.",
    minutePlan: [
      { time: "0–10 min",  title: "Théorie",       content: "Pourquoi la clôture est fondamentale. Ce qui se perd quand on ne clôt pas. Les cinq éléments de la clôture parfaite." },
      { time: "10–30 min", title: "Pratique guidée", content: "20 min de pratique libre → 5 min de clôture guidée étape par étape." },
      { time: "30–50 min", title: "Comparaison",   content: "Pratique libre de même durée → arrêt brutal. Observer ce qui se passe dans les 5 minutes suivantes." },
      { time: "50–57 min", title: "Carnet",        content: "Compare les deux sorties. Qu'est-ce qui reste disponible dans la conscience 5 minutes après la clôture consciente ?" },
      { time: "57–60 min", title: "Clôture",       content: "Pratique la clôture de ce cours lui-même : retour au corps, gratitude, engagement, sortie." },
      { time: "",          title: "",              content: "" }
    ],
    keyPhrase: "Ce qui n'est pas déposé ne peut pas être reçu — et ce qui n'est pas intégré repart comme il est venu.",
    journalQuestions: [
      "As-tu l'habitude de clore tes pratiques consciemment, ou tu passes directement à autre chose ? Qu'est-ce que cela dit de ta relation à l'expérience ?",
      "Quel élément de la clôture t'a semblé le plus impactant — et pourquoi selon toi ?",
      "Y a-t-il des 'clôtures' manquantes dans ta vie (relations terminées sans cérémonie, projets abandonnés sans bilan) — et quel serait le coût de les faire maintenant ?"
    ]
  });

  // ── C038 — Présence, carte et lumière ─────────────────────────────────────
  enrich("c038", {
    longSummary: "Tirer une carte de vertu, la lire lentement, observer une lumière douce et déposer la vertu dans la rémanence lumineuse — voici une pratique complète en quatre actes. Ce n'est pas de la divination : c'est une méthode d'imprégnation consciente. La carte choisie (ou tirée au hasard) nomme une qualité que le système nerveux va associer, dans les secondes qui suivent, à la trace lumineuse intérieure. Cette association crée une imprégnation profonde qui dépasse la seule compréhension intellectuelle.\n\nCe cours enseigne cette pratique complète et explique pourquoi elle fonctionne : la trace lumineuse active la plasticité neuronale, la vertu nomme la direction de cette plasticité, et l'ensemble crée une 'mémoire lumineuse' qui se réactive chaque fois que la lumière ou le silence est présent. C'est de l'éducation neuronale — douce, joyeuse, et profondément efficace.",
    pedagogicalObjective: "Maîtriser la pratique complète vertu + lumière + rémanence comme outil d'imprégnation consciente.",
    initiaticObjective: "Graver une vertu dans le corps par la lumière — au-delà de la compréhension, jusqu'à l'incarnation.",
    minutePlan: [
      { time: "0–5 min",   title: "Seuil",         content: "Tiens le jeu de cartes des vertus dans les mains. Ferme les yeux. Quelle qualité as-tu besoin d'incarner aujourd'hui ?" },
      { time: "5–10 min",  title: "Tirage",        content: "Tire une carte. Lis son nom. Puis lis lentement sa description. Laisse chaque mot entrer." },
      { time: "10–20 min", title: "Observation",   content: "Observe une source lumineuse douce pendant 5 minutes. Puis ferme les yeux — accueille la trace." },
      { time: "20–40 min", title: "Imprégnation",  content: "Dans la trace lumineuse, 'dépose' mentalement la vertu de la carte. Répète son nom une fois, puis laisse-la rayonner dans la lumière." },
      { time: "40–55 min", title: "Contemplation", content: "Reste dans cet espace. La vertu et la lumière font leur travail. Ne dirige pas — accueille." },
      { time: "55–60 min", title: "Carnet + Clôture", content: "Note la vertu tirée, l'image qui est venue, le geste concret que tu vas poser dans les 24 heures pour incarner cette vertu." }
    ],
    keyPhrase: "Une vertu comprise reste dans la tête. Une vertu imprégnée par la lumière descend dans le corps.",
    journalQuestions: [
      "Quelle vertu est apparue — et en quoi était-elle exactement ce dont tu avais besoin aujourd'hui ?",
      "Y a-t-il une résistance à incarner cette vertu — une peur, une habitude contraire ? De quoi s'agit-il ?",
      "Le geste concret que tu as choisi pour incarner cette vertu : comment vas-tu te souvenir de le poser demain ?"
    ]
  });

  // ── C039 — Construire une séance d'une heure ──────────────────────────────
  enrich("c039", {
    longSummary: "Construire une séance d'une heure autonome est la compétence ultime du praticien — la différence entre suivre un cours et devenir son propre maître. Une séance bien construite a cinq phases : l'ouverture (seuil), l'enseignement ou l'intention, la pratique principale, la contemplation et l'intégration, et la clôture. Ces cinq phases sont universelles — elles s'appliquent à n'importe quel type de pratique.\n\nCe cours enseigne non seulement la structure mais aussi l'art de choisir ce qui convient à sa propre étape. Comment décider si une séance sera orientée balancement, souffle, lumière, vertu ou contemplation ? Comment calibrer la durée de chaque phase ? Comment s'adapter si la pratique prend une direction inattendue ? Ce cours transforme le praticien qui suit en praticien qui crée.",
    pedagogicalObjective: "Maîtriser la structure universelle d'une séance d'une heure et acquérir la capacité de construire ses propres séances autonomes.",
    initiaticObjective: "Devenir son propre maître de séance — non pas par arrogance mais par maturité et connaissance de soi.",
    minutePlan: [
      { time: "0–15 min",  title: "Théorie",       content: "Les cinq phases universelles. Le ratio idéal des durées. Comment choisir la pratique principale selon son état." },
      { time: "15–25 min", title: "Planification", content: "Construire sur papier une séance de 60 minutes personnalisée pour aujourd'hui. (10 minutes de travail écrit.)" },
      { time: "25–55 min", title: "Pratique",      content: "Pratiquer la séance que tu viens de construire. Seul, en autonomie complète. Observe ce qui fonctionne et ce qui doit être ajusté." },
      { time: "55–60 min", title: "Bilan",         content: "Compare la séance planifiée et la séance vécue. Qu'as-tu ajusté spontanément — et était-ce juste ?" },
      { time: "",          title: "",              content: "" },
      { time: "",          title: "",              content: "" }
    ],
    keyPhrase: "Un praticien qui peut construire sa propre séance n'attend plus qu'on lui dise quoi faire — il sait.",
    journalQuestions: [
      "Quelle pratique principale as-tu choisie pour ta séance autonome, et pourquoi ce choix reflète-t-il ton état actuel ?",
      "Qu'as-tu ajusté spontanément pendant la séance — et cet ajustement était-il une fuite ou une écoute de toi-même ?",
      "Si tu devais enseigner à quelqu'un comment construire une séance, quelle serait la première chose que tu lui dirais ?"
    ]
  });

  console.log("[Axis Enrichment Part 2] Cours 19-39 enrichis.");
})();
