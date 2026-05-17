// ═══════════════════════════════════════════════════════════════════════════
// AXIS LUMEN STUDIO — Réorganisation pédagogique de la chronologie des cours
// Ce fichier doit être chargé APRÈS tous les fichiers axis-apprendre-courses-*
// et axis-courses-enriched-*. Il ajoute le champ `order` à chaque cours
// (sans toucher aux numéros, PDFs ni images) et injecte les 3 nouveaux cours
// fondamentaux : Sensations cénesthésiques (113), Convergence oculaire (114),
// Mantras ILLI/ALLA/ELLU intro (115).
// ═══════════════════════════════════════════════════════════════════════════

(function () {
  "use strict";

  // ─────────────────────────────────────────────────────────────────────────
  // CARTE D'ORDRE D'AFFICHAGE
  // Clé = numéro de cours, Valeur = position dans la liste affichée
  // ─────────────────────────────────────────────────────────────────────────
  var ORDER_MAP = {
    // ── Fondations originelles (inchangées) ──────────────────────────────
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    // ── Nouveaux cours fondamentaux (113, 114, 115 → positions 5, 6, 7) ──
    113: 5,
    114: 6,
    115: 7,
    // ── Balancements (41–48 → positions 8–15) ────────────────────────────
    41: 8,
    42: 9,
    43: 10,
    44: 11,
    45: 12,
    46: 13,
    47: 14,
    48: 15,
    // ── Respiration + Yoga + Mantras complet (49–56 réordonnés) ──────────
    51: 16,   // Respiration naturelle
    52: 17,   // Respiration carrée
    53: 18,   // Respiration triangulaire et rectangulaire
    49: 19,   // Yoga du temple vivant
    50: 20,   // Postures statiques et axe
    54: 21,   // Mantras ILLI, ALLA, ELLU, RORO (complet)
    55: 22,   // OM et vibration intérieure
    56: 23,   // Séquence souffle, mantra et mouvement
    // ── Terrain vivant (9–16 → positions 24–31) ──────────────────────────
    9:  24,
    10: 25,
    11: 26,
    12: 27,
    13: 28,
    14: 29,
    15: 30,
    16: 31,
    // ── Lumière & neurosciences (17–24 → positions 32–39) ────────────────
    17: 32,
    18: 33,
    19: 34,
    20: 35,
    21: 36,
    22: 37,
    23: 38,
    24: 39,
    // ── Rythmes, nombre d'or & fractales (25–32 → positions 40–47) ───────
    25: 40,
    26: 41,
    27: 42,
    28: 43,
    29: 44,
    30: 45,
    31: 46,
    32: 47,
    // ── Inversion & incarnation (33–40 → positions 48–55) ────────────────
    33: 48,
    34: 49,
    35: 50,
    36: 51,
    37: 52,
    38: 53,
    39: 54,
    40: 55,
    // ── Clairvoyance & perception intérieure (57–64 → 56–63) ─────────────
    57: 56,
    58: 57,
    59: 58,
    60: 59,
    61: 60,
    62: 61,
    63: 62,
    64: 63,
    // ── Clair-ressenti & vivant (65–72 → 64–71) ──────────────────────────
    65: 64,
    66: 65,
    67: 66,
    68: 67,
    69: 68,
    70: 69,
    71: 70,
    72: 71,
    // ── Guidance & au-delà (73–80 → 72–79) ───────────────────────────────
    73: 72,
    74: 73,
    75: 74,
    76: 75,
    77: 76,
    78: 77,
    79: 78,
    80: 79,
    // ── Télépathie, télékinésie & recherche (81–88 → 80–87) ──────────────
    81: 80,
    82: 81,
    83: 82,
    84: 83,
    85: 84,
    86: 85,
    87: 86,
    88: 87,
    // ── Protection énergétique (89–96 → 88–95) ───────────────────────────
    89: 88,
    90: 89,
    91: 90,
    92: 91,
    93: 92,
    94: 93,
    95: 94,
    96: 95,
    // ── Eau informée & biorésonance (97–104 → 96–103) ────────────────────
    97:  96,
    98:  97,
    99:  98,
    100: 99,
    101: 100,
    102: 101,
    103: 102,
    104: 103,
    // ── Livre d'Exercices enrichi (105–112 → 104–111) ────────────────────
    105: 104,
    106: 105,
    107: 106,
    108: 107,
    109: 108,
    110: 109,
    111: 110,
    112: 111,
    // ── Cours structurels déplacés en fin de cursus ───────────────────────
    5: 112,   // Préparer une séance : ouvrir le seuil
    6: 113,   // Clore une séance
    7: 114,   // Présence, carte et lumière
    8: 115    // Construire une séance d'une heure
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 3 NOUVEAUX COURS FONDAMENTAUX
  // ─────────────────────────────────────────────────────────────────────────
  var NEW_COURSES = [

    // ═══════════════════════════════════════════════════════════════════════
    // COURS 113 — Sensations cénesthésiques : lire le corps pendant la pratique
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "C113-sensations-cenesthesiques",
      number: 113,
      order: 5,
      title: "Sensations cénesthésiques : lire le corps pendant la pratique",
      subtitle: "Reconnaître et nommer ce que ressent le corps",
      family: "Fondations du Temple Vivant",
      familyTitle: "Fondations du Temple Vivant",
      familyId: "fondation",
      chapter: "Fondation — Lire les signaux intérieurs",
      duration: "1 h",
      durationMin: 60,
      level: "Fondation",
      kind: "Lecture corporelle",
      symbol: "◉",
      status: "available",
      tags: ["sensations", "cénesthésie", "corps", "proprioception", "fondation"],
      shortSummary: "Apprendre à reconnaître et nommer les sensations corporelles pendant la pratique : chaleur, pesanteur, fourmillement, vibration, légèreté — les signaux vivants de l'expérience intérieure.",
      summary: "Ce cours fonde la capacité à lire le corps pendant la pratique. Sans cet outil, l'élève pratique sans savoir ce qu'il vit. Avec lui, chaque sensation devient une information précise : le corps parle, l'élève écoute et note.",
      longSummary: "La cénesthésie est la perception globale de son corps de l'intérieur — tout ce qui est ressenti sans passer par la vue, l'ouïe ou le toucher de surface. Chaleur ou froid intérieur, pesanteur ou légèreté des membres, fourmillement des extrémités, vibration dans le torse, pression dans le crâne, fluidité ou blocage dans la respiration : ce sont les signaux vivants que le corps envoie pendant la pratique. Ce cours apprend à reconnaître, nommer et noter ces signaux, sans les gonfler ni les nier. C'est le fondement de l'observation honnête.",
      pedagogicalObjective: "Identifier les cinq familles de sensations cénesthésiques (thermiques, gravitationnelles, vibratoires, pressives, cinétiques) et apprendre à les noter avec précision dans le carnet.",
      initiaticObjective: "Comprendre que le corps n'est pas le décor de la pratique : il en est le premier instrument de mesure. Savoir lire ses sensations, c'est avoir un baromètre vivant de l'état intérieur.",
      essentialPhrase: "Ce que le corps ressent n'est pas une imagination : c'est de l'information.",
      shortPhrase: "Le corps parle. Apprends à l'écouter.",
      minutePlan: [
        { time: "0–5 min",   title: "Seuil",              content: "Installation, souffle naturel, état corporel du moment." },
        { time: "5–15 min",  title: "Qu'est-ce que la cénesthésie ?", content: "Définition, proprioception, interoception, différence avec imagination." },
        { time: "15–25 min", title: "Les 5 familles de sensations", content: "Thermiques, gravitationnelles, vibratoires, pressives, cinétiques." },
        { time: "25–35 min", title: "Scan corporel guidé", content: "Descente lente de la tête aux pieds : nommer ce qui est réel." },
        { time: "35–50 min", title: "Pratique avec balancement doux", content: "Balancement latéral 2 secondes et observation des sensations qui apparaissent." },
        { time: "50–57 min", title: "Carnet",              content: "Lister les sensations ressenties. Lesquelles étaient attendues, lesquelles surprenantes ?" },
        { time: "57–60 min", title: "Clôture",             content: "Retour au souffle, aux appuis, au corps complet." }
      ],
      plan: [
        "0–5 min — Seuil : installation et état corporel du moment.",
        "5–15 min — Comprendre la cénesthésie : ce que ressent le corps de l'intérieur.",
        "15–25 min — Les 5 familles de sensations à reconnaître.",
        "25–35 min — Scan corporel guidé : nommer sans inventer.",
        "35–50 min — Pratique avec balancement doux et observation.",
        "50–57 min — Carnet : noter les sensations réelles.",
        "57–60 min — Clôture."
      ],
      teaching: {
        intro: "Avant de pratiquer les balancements, avant d'observer une lumière, avant d'utiliser un mantra — l'élève doit apprendre à lire son propre corps. Sans cet outil, il pratique à l'aveugle. Ce cours installe le vocabulaire sensoriel de toute la suite de l'enseignement.",
        sections: [
          {
            title: "1. La cénesthésie : sens de l'intérieur",
            content: "La cénesthésie (du grec koinos : commun + aisthesis : sensation) est la perception globale de son propre corps depuis l'intérieur. Elle regroupe la proprioception (position des membres), l'interoception (état des organes, rythme cardiaque, digestion) et les sensations diffuses non localisées. C'est le sens qui permet de savoir si on est fatigué avant d'être malade, tendu avant d'être douloureux, actif avant d'être agité."
          },
          {
            title: "2. Les 5 familles de sensations",
            content: "Thermiques : chaleur ou froid intérieur — souvent dans les mains, le torse, le crâne ou la colonne. Gravitationnelles : pesanteur (corps lourd, comme ancré au sol) ou légèreté (sensation d'allègement, de flottement doux). Vibratoires : fourmillement des extrémités, picotements dans les paumes, bourdonnement dans la poitrine ou le crâne. Pressives : sensation de pression ou de dilatation dans la tête, le sternum, la gorge. Cinétiques : impression de mouvement interne, de circulation, de flux."
          },
          {
            title: "3. Sentir sans inventer",
            content: "La règle fondamentale : noter uniquement ce qui est présent, pas ce qui devrait être présent. L'élève qui lit une description de chaleur dans les mains peut 'créer' cette chaleur par attente. Le carnet protège contre cela : noter honnêtement 'rien de particulier' est aussi valide que 'chaleur dans les paumes'. L'observation sobre est plus précieuse qu'une expérience embellie."
          },
          {
            title: "4. Sensations et pratiques Axis Lumen",
            content: "Pendant le balancement, certaines sensations apparaissent régulièrement : légèreté progressive des bras, chaleur dans le haut du crâne, fourmillement des paumes, vibration dans la cage thoracique lors du mantra. Ces sensations confirment que le système nerveux répond à la pratique. Elles ne prouvent pas une expérience mystique — elles prouvent un changement d'état physiologique réel."
          },
          {
            title: "5. Le carnet comme outil de mesure",
            content: "Un carnet précis transforme la pratique en recherche. L'élève note : avant la séance (état de base), pendant (sensations observées, leur localisation, intensité, durée), après (ce qui reste). Sur plusieurs séances, des patterns apparaissent. Ce sont ces patterns qui forment la 'signature personnelle' de l'état méditatif — différente pour chaque élève."
          }
        ]
      },
      contemplation: {
        duration: "8 minutes",
        question: "En ce moment, dans mon corps, qu'est-ce qui est présent ? Chaleur, pesanteur, légèreté, tension, fluidité ?",
        guidance: "Ferme les yeux. Sans bouger. Commence par les pieds — qu'est-ce que tu ressens là ? Remonte lentement. Genoux, cuisses, bassin, ventre, poitrine, épaules, bras, mains, gorge, tête. Ne cherche pas une sensation particulière. Note simplement ce qui est là."
      },
      practice: {
        name: "Scan corporel + balancement avec observation",
        duration: "15 à 20 min",
        intention: "Je lis mon corps avec précision et sans jugement.",
        material: "Chaise stable, carnet, stylo.",
        posture: "Assis, dos libre, épaules relâchées.",
        steps: [
          "Ferme les yeux. Pose les mains sur les cuisses.",
          "Commence le scan : pieds → chevilles → mollets → genoux → cuisses → bassin → ventre → poitrine → dos → épaules → bras → mains → gorge → visage → sommet du crâne.",
          "À chaque zone : note mentalement (ou dans le carnet) ce qui est présent : chaleur, froid, tension, légèreté, pesanteur, fourmillement, rien.",
          "Après le scan : commence un balancement latéral très doux, 2 secondes gauche, 2 secondes droite.",
          "Continue 10 minutes. Observe : quelles sensations changent avec le mouvement ?",
          "Après le balancement : reste immobile 2 minutes. Qu'est-ce qui reste ?",
          "Note dans le carnet : liste des sensations ressenties pendant et après."
        ],
        safety: "Ne force aucune sensation. Si rien n'est perçu, c'est une observation valide. Ne jamais inventer ou amplifier."
      },
      journalQuestions: [
        "Quelles sensations étaient présentes au début du scan ?",
        "Le balancement a-t-il changé quelque chose dans le corps ?",
        "Quelle sensation a été la plus claire ou la plus surprenante ?",
        "Y avait-il des zones 'muettes' — sans aucune sensation particulière ?",
        "Comment décrirais-tu ton état corporel général en trois mots ?"
      ],
      validation: [
        "Je connais les 5 familles de sensations cénesthésiques.",
        "J'ai réalisé un scan corporel complet.",
        "J'ai observé les sensations pendant le balancement.",
        "J'ai noté mes observations avec précision dans le carnet.",
        "Je sais faire la différence entre 'sentir' et 'imaginer'."
      ],
      references: [
        "JE SUIS — Le Livre d'Exercices : observer l'état du corps avant et après.",
        "Antonio Damasio — L'Erreur de Descartes : corps et conscience.",
        "Peter Levine — In an Unspoken Voice : corps, sensation et intégration."
      ],
      image: "assets/images/exercice 113 114 115/cénèstésique 1.png",
      cover: "assets/images/exercice 113 114 115/cénèstésique 1.png",
      coverImage: "assets/images/exercice 113 114 115/cénèstésique 1.png",
      thumbnail: "assets/images/exercice 113 114 115/cénèstésique 1.png",
      images: {
        cover: "assets/images/exercice 113 114 115/cénèstésique 1.png",
        gallery: [
          "assets/images/exercice 113 114 115/cénèstésique 1.png",
          "assets/images/exercice 113 114 115/cénèstésique 2.png",
          "assets/images/exercice 113 114 115/cénèstésique 3.png",
          "assets/images/exercice 113 114 115/cénèstésique 4.png",
          "assets/images/exercice 113 114 115/cénèstésique 5.png"
        ],
        pedagogical: [
          "assets/images/exercice 113 114 115/cénèstésique 2.png",
          "assets/images/exercice 113 114 115/cénèstésique 3.png",
          "assets/images/exercice 113 114 115/cénèstésique 4.png",
          "assets/images/exercice 113 114 115/cénèstésique 5.png"
        ],
        practice: "assets/images/exercice 113 114 115/cénèstésique 3.png",
        contemplation: "assets/images/exercice 113 114 115/cénèstésique 4.png",
        contemplative: "assets/images/exercice 113 114 115/cénèstésique 5.png"
      },
      pdf: { path: "", title: "Cours 113 — Sensations cénesthésiques", protectedNotice: "Support réservé à l'usage personnel de l'élève Axis Lumen Studio." },
      pdfPremium: true
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COURS 114 — Convergence oculaire : maîtriser le regard
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "C114-convergence-oculaire",
      number: 114,
      order: 6,
      title: "Convergence oculaire : maîtriser le regard",
      subtitle: "Du regard diffus au point de fixation vivant",
      family: "Fondations du Temple Vivant",
      familyTitle: "Fondations du Temple Vivant",
      familyId: "fondation",
      chapter: "Fondation — Stabiliser l'attention par le regard",
      duration: "1 h",
      durationMin: 60,
      level: "Fondation",
      kind: "Technique oculaire",
      symbol: "◉",
      status: "available",
      tags: ["convergence", "regard", "oculaire", "point fixe", "rémanence", "attention"],
      shortSummary: "Apprendre à stabiliser le regard sur un point de fixation pour induire un état alpha, préparer la rémanence lumineuse et soutenir l'attention pendant les balancements.",
      summary: "La convergence oculaire est l'une des techniques les plus efficaces pour induire un état de présence intérieure. Fixer un point précis modifie directement l'activité cérébrale, réduit le bruit mental et prépare l'œil à capter et retenir les images lumineuses.",
      longSummary: "Le regard diffus est le regard ordinaire — il saute d'un objet à l'autre, suit les mouvements, cherche la nouveauté. Le regard convergent est différent : il se fixe sur un point précis, immobile, pendant une durée déterminée. Ce changement simple de mode oculaire produit des effets neurologiques mesurables : réduction de l'activité du réseau par défaut (mode 'pensée automatique'), induction d'ondes alpha (présence calme), diminution des saccades (micro-mouvements oculaires involontaires), et amplification de la rémanence lumineuse après l'extinction d'une source. Ce cours installe la convergence oculaire comme technique de base de toutes les pratiques Axis Lumen.",
      pedagogicalObjective: "Maîtriser les trois modes du regard (diffus, mou, convergent), apprendre la fixation oculaire douce sur objet géométrique et source lumineuse, et comprendre le lien entre convergence et rémanence.",
      initiaticObjective: "Le regard est la première direction de la conscience. Apprendre à le tenir stable, c'est apprendre à tenir l'attention. Ce que l'œil fixe, l'esprit habite.",
      essentialPhrase: "Là où va le regard, va l'attention. Là où va l'attention, va la conscience.",
      shortPhrase: "Le point fixe : premier ancrage de la présence.",
      minutePlan: [
        { time: "0–5 min",   title: "Seuil",                content: "Installation, respiration naturelle, yeux ouverts en regard diffus." },
        { time: "5–15 min",  title: "Les trois modes du regard", content: "Diffus (ordinaire), mou (semi-fixé), convergent (point fixe). Effets neurologiques de chaque mode." },
        { time: "15–25 min", title: "Technique de fixation douce", content: "Comment fixer sans crispation : distance, hauteur, relâchement des muscles péri-oculaires." },
        { time: "25–35 min", title: "Fixation sur objet géométrique", content: "Carré, cercle ou triangle posé à 50–80 cm : 2 minutes de fixation douce, observation de la rémanence." },
        { time: "35–48 min", title: "Convergence + balancement", content: "Maintenir un point de fixation pendant le balancement latéral doux. Observer l'effet sur la stabilité de l'attention." },
        { time: "48–55 min", title: "Carnet",                content: "Rémanence observée ? État de l'attention avec vs sans point fixe ? Sensations oculaires ?" },
        { time: "55–60 min", title: "Clôture",               content: "Cligner lentement 5 fois. Regard doux à l'horizon. Retour au souffle." }
      ],
      plan: [
        "0–5 min — Seuil.",
        "5–15 min — Les trois modes du regard et leurs effets.",
        "15–25 min — Technique de fixation douce.",
        "25–35 min — Fixation sur objet géométrique et rémanence.",
        "35–48 min — Convergence maintenue pendant le balancement.",
        "48–55 min — Carnet.",
        "55–60 min — Clôture oculaire."
      ],
      teaching: {
        intro: "Les traditions contemplatives ont toujours utilisé le regard comme premier outil de maîtrise de l'attention. Le Tratak yogique (fixation sur une flamme), la méditation sur point lumineux dans les traditions tibétaines, la fixation sur le nombril dans certaines pratiques soufies — toutes convergent vers le même principe : un regard stable produit une conscience stable.",
        sections: [
          {
            title: "1. Les trois modes du regard",
            content: "Le regard diffus est le mode par défaut : les yeux bougent constamment (saccades), capturant de nouvelles informations, alimentant le réseau par défaut cérébral (pensées automatiques, ruminations). Le regard mou est un entre-deux : l'élève laisse son regard se poser sans fixer précisément, comme regarder au loin. Il produit déjà un léger relâchement mental. Le regard convergent fixe un point précis sans clignoter ni bouger. Il active les voies visuelles primaires et court-circuite le traitement cognitif de haut niveau — produisant un état de présence pure."
          },
          {
            title: "2. Effets neurologiques de la convergence",
            content: "Des études EEG montrent qu'une fixation oculaire maintenue 2 à 5 minutes produit : une augmentation des ondes alpha (8–12 Hz — état de vigilance calme et réceptive), une réduction de l'activité du cortex préfrontal latéral (moins de jugement, moins d'analyse), et une augmentation de la cohérence interhémisphérique. Ces effets sont comparables à ceux d'une méditation de pleine conscience de durée équivalente."
          },
          {
            title: "3. La rémanence : prolongement de la fixation",
            content: "Quand l'œil fixe une source lumineuse ou un objet coloré pendant 30 secondes à 2 minutes, puis détourne le regard ou ferme les yeux, une image rémanente apparaît. Cette rémanence est l'image complémentaire (inversion des couleurs) laissée sur la rétine et le cortex visuel. Dans les pratiques Axis Lumen, cet effet est central : la rémanence d'un objet géométrique coloré devient le premier support de visualisation intérieure."
          },
          {
            title: "4. Convergence et balancement",
            content: "Maintenir un point de fixation pendant le balancement crée une tension productive : le corps oscille mais le regard reste stable. Cette dissociation œil/corps stabilise l'attention d'une façon qui ne peut être obtenue ni par le mouvement seul ni par la fixation seule. C'est l'une des clés techniques des pratiques avancées Axis Lumen : le corps se balance, les yeux tiennent le centre."
          },
          {
            title: "5. Précautions oculaires",
            content: "La convergence douce ne force jamais les yeux. Aucun larmoiement ne doit apparaître. Si les yeux fatiguent, cligner lentement 3 fois et relâcher. La fixation sur source lumineuse directe (lampe, soleil) est interdite. La fixation sur une bougie ou LED douce de 1 à 3 watts à 50 cm est recommandée pour les premières séances."
          }
        ]
      },
      contemplation: {
        duration: "5 minutes",
        question: "Quand est-ce que mon regard est vraiment stable dans la vie ordinaire ? Sur quoi se pose-t-il naturellement ?",
        guidance: "Observe ton regard en ce moment. Est-il diffus — qui saute ? Ou est-il posé — qui habite un espace ? La réponse t'indique la qualité de ta présence ordinaire."
      },
      practice: {
        name: "Fixation sur carré géométrique + balancement convergent",
        duration: "15 minutes",
        intention: "Je tiens mon regard pour tenir mon attention.",
        material: "Un carré coloré (bleu recommandé, 10×10 cm) posé à 60 cm. Chaise stable.",
        posture: "Assis, dos libre, tête légèrement inclinée vers l'avant, yeux dans l'axe de l'objet.",
        steps: [
          "Pose le carré à 60 cm, légèrement sous la ligne des yeux.",
          "Commence par un regard diffus — regarde autour de l'objet.",
          "Tranquillement, laisse le regard se poser sur le centre du carré.",
          "Fixe doucement le centre, sans forcer, sans cligner si possible.",
          "Maintiens 90 secondes. Si les yeux tirent, cligne lentement une fois.",
          "Ferme les yeux : observe la rémanence — quelle couleur ? Quelle forme ?",
          "Ouvre les yeux. Commence le balancement latéral doux tout en maintenant le regard sur le carré.",
          "Continue 8 minutes : corps qui se balance, regard qui reste fixe.",
          "Arrête le balancement. Ferme les yeux 2 minutes. Observe ce qui reste."
        ],
        safety: "Jamais de fixation forcée. Si larmoiement ou douleur — arrêter immédiatement. Ne jamais fixer une source lumineuse directe."
      },
      journalQuestions: [
        "Quelle rémanence as-tu observée ? Couleur, forme, durée ?",
        "L'état mental pendant la fixation différait-il de l'état ordinaire ?",
        "Maintenir le regard pendant le balancement était-il difficile ?",
        "Y avait-il une sensation corporelle particulière pendant la convergence ?"
      ],
      validation: [
        "Je connais les 3 modes du regard et leurs effets neurologiques.",
        "J'ai pratiqué la fixation douce sur objet géométrique.",
        "J'ai observé une rémanence et l'ai notée.",
        "J'ai combiné convergence oculaire et balancement.",
        "Je sais corriger une fixation trop forcée."
      ],
      references: [
        "JE SUIS — Observation lumineuse et rémanence.",
        "Tratak — pratique yogique de fixation.",
        "Yoga de la lumière — traditions tibétaines et méditatives.",
        "Neurologie de la vision : ondes alpha et fixation oculaire."
      ],
      image: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
      cover: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
      coverImage: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
      thumbnail: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
      images: {
        cover: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
        gallery: [
          "assets/images/exercice 113 114 115/convergence oculaire 1.png",
          "assets/images/exercice 113 114 115/convergence oculaire 2.png",
          "assets/images/exercice 113 114 115/convergence oculaire 3.png",
          "assets/images/exercice 113 114 115/convergence oculaire vers le front.png",
          "assets/images/exercice 113 114 115/convergence oculaire vers le nez.png"
        ],
        pedagogical: [
          "assets/images/exercice 113 114 115/convergence oculaire 2.png",
          "assets/images/exercice 113 114 115/convergence oculaire 3.png",
          "assets/images/exercice 113 114 115/convergence oculaire vers le front.png",
          "assets/images/exercice 113 114 115/convergence oculaire vers le nez.png"
        ],
        practice: "assets/images/exercice 113 114 115/convergence oculaire vers le front.png",
        contemplation: "assets/images/exercice 113 114 115/convergence oculaire 1.png",
        contemplative: "assets/images/exercice 113 114 115/convergence oculaire 1.png"
      },
      pdf: { path: "", title: "Cours 114 — Convergence oculaire", protectedNotice: "Support réservé à l'usage personnel de l'élève Axis Lumen Studio." },
      pdfPremium: true
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COURS 115 — Mantras ILLI, ALLA, ELLU : voix du balancement
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: "C115-mantras-illi-alla-ellu-introduction",
      number: 115,
      order: 7,
      title: "Mantras ILLI, ALLA, ELLU : voix du balancement",
      subtitle: "Synchroniser la vibration sonore avec le mouvement du corps",
      family: "Fondations du Temple Vivant",
      familyTitle: "Fondations du Temple Vivant",
      familyId: "fondation",
      chapter: "Fondation — Vibration, axe et mouvement",
      duration: "1 h",
      durationMin: 60,
      level: "Fondation",
      kind: "Mantra et mouvement",
      symbol: "ॐ",
      status: "available",
      tags: ["mantra", "ILLI", "ALLA", "ELLU", "balancement", "vibration", "fondation"],
      shortSummary: "Découvrir et pratiquer les trois mantras des balancements Axis Lumen : ILLI pour le latéral, ALLA pour le vertical, ELLU pour l'antéro-postérieur. Chaque mantra synchronise la voix, le souffle et le mouvement.",
      summary: "Ce cours installe les trois mantras vibratoires des balancements avant la pratique des séances complètes. ILLI accompagne l'axe gauche-droite, ALLA l'axe haut-bas, ELLU l'axe avant-arrière. Leur vibration spécifique amplifie l'effet cérébral et sensoriel de chaque balancement.",
      longSummary: "Un mantra n'est pas une prière — c'est un outil sonore. Sa vibration agit sur le système nerveux via la conduction osseuse (vibration du crâne), la stimulation du nerf vague (via le larynx), et la modulation du rythme respiratoire. ILLI produit des consonnes latérales (I-I) qui accompagnent naturellement l'alternance gauche-droite. ALLA produit des consonnes centrales et verticales (A-A) qui s'alignent avec l'axe crânio-caudal. ELLU produit des consonnes qui ouvrent l'espace avant-arrière avec une voyelle arrondie. Ce cours apprend à vibrer chaque mantra dans la bonne posture, au bon rythme, avec le bon balancement — avant d'entrer dans les séances complètes.",
      pedagogicalObjective: "Maîtriser la vibration correcte de ILLI, ALLA et ELLU, leur synchronisation avec le mouvement correspondant, et leur effet ressenti dans le corps.",
      initiaticObjective: "Comprendre que chaque axe du balancement a sa voix. Le corps se met en mouvement, la voix entre en résonance, et l'ensemble produit un état qui dépasse chacun de ses composants pris séparément.",
      essentialPhrase: "Le mantra n'est pas dit : il est vibré. La différence est entre parler à quelqu'un et faire sonner un instrument.",
      shortPhrase: "ILLI : gauche-droite. ALLA : haut-bas. ELLU : avant-arrière.",
      minutePlan: [
        { time: "0–5 min",   title: "Seuil",              content: "Installation, respiration naturelle, une minute de silence." },
        { time: "5–15 min",  title: "Qu'est-ce qu'un mantra ?", content: "Vibration, nerf vague, conduction osseuse, effet sur les rythmes cérébraux." },
        { time: "15–25 min", title: "ILLI — axe latéral",  content: "Phonétique, placement lingual (langue contre le palais), synchronisation avec balancement gauche-droite." },
        { time: "25–35 min", title: "ALLA — axe vertical", content: "Phonétique, ouverture de la gorge, synchronisation avec balancement haut-bas." },
        { time: "35–45 min", title: "ELLU — axe antéro-postérieur", content: "Phonétique, vibration avant-arrière du larynx, synchronisation avec balancement avant-arrière." },
        { time: "45–53 min", title: "Séquence des trois",  content: "5 minutes par axe : ILLI avec latéral, ALLA avec vertical, ELLU avec AP." },
        { time: "53–57 min", title: "Carnet",              content: "Quel mantra a produit la vibration la plus nette ? Où dans le corps ?" },
        { time: "57–60 min", title: "Clôture",             content: "Retour au silence. Souffle naturel. Geste du jour." }
      ],
      plan: [
        "0–5 min — Seuil et silence.",
        "5–15 min — La vibration sonore comme outil.",
        "15–25 min — ILLI : vibration de l'axe latéral.",
        "25–35 min — ALLA : vibration de l'axe vertical.",
        "35–45 min — ELLU : vibration de l'axe antéro-postérieur.",
        "45–53 min — Séquence complète des trois balancements avec mantra.",
        "53–57 min — Carnet.",
        "57–60 min — Clôture."
      ],
      teaching: {
        intro: "Dans les traditions qui utilisent le son comme outil de transformation, le mantra n'est jamais arbitraire. Chaque son a une géographie : sa vibration naît dans une partie précise du corps, se propage selon un axe particulier, et touche des structures nerveuses spécifiques. ILLI, ALLA et ELLU ont été choisis pour leur correspondance naturelle avec les trois axes du balancement Axis Lumen.",
        sections: [
          {
            title: "1. Comment un mantra agit-il ?",
            content: "Trois voies d'action : La conduction osseuse — les vibrations sonores se propagent directement dans les os du crâne, contournant l'oreille externe, atteignant le cerveau avec plus de fidélité qu'un son aérien. Le nerf vague — le larynx est innervé par le nerf vague (nerf cranien X), qui régule le rythme cardiaque, la digestion et l'état parasympathique. Vibrer un mantra stimule directement ce nerf, induisant un état de calme et de présence. La modulation respiratoire — tout mantra vibre sur l'expiration, allongeant naturellement le souffle et produisant une cohérence cardiaque."
          },
          {
            title: "2. ILLI — l'axe gauche-droite",
            content: "Le son 'I' (comme dans 'vie') est une voyelle haute et antérieure : la langue monte vers le palais dur, proche des dents. Cette position linguale est naturellement associée à une stimulation des zones corticales supérieures et latérales. La double consonne 'LL' produit une légère vibration latérale dans la bouche. La répétition 'ILLI-ILLI-ILLI' crée un rythme pulsé qui accompagne naturellement l'alternance gauche-droite. Pendant le balancement latéral : langue contre le palais, vibration du 'I' dans le haut du crâne, expiration douce sur chaque répétition."
          },
          {
            title: "3. ALLA — l'axe vertical",
            content: "Le son 'A' (comme dans 'âme') est une voyelle basse et centrale : la bouche s'ouvre, le larynx descend, la gorge s'élargit. C'est le son le plus ouvert de la phonétique — celui qui correspond à l'axe vertical d'élévation. La double consonne 'LL' ancre la vibration dans le centre de la bouche. 'ALLA-ALLA-ALLA' crée un mouvement sonore d'ouverture-fermeture qui accompagne naturellement le balancement haut-bas. Pendant le balancement vertical : gorge ouverte, vibration dans l'axe tête-bassin, expiration descendante à chaque répétition."
          },
          {
            title: "4. ELLU — l'axe antéro-postérieur",
            content: "ELLU combine le 'E' ouvert (comme dans 'tête') — son médio-haut — et le 'U' arrondi (comme dans 'lune') — son postérieur. Cette transition E→U crée un mouvement phonétique avant-arrière dans la bouche qui correspond précisément à l'axe antéro-postérieur. La consonne 'LL' lie les deux voyelles dans une vibration continue. 'ELLU-ELLU-ELLU' produit un son qui voyage de l'avant vers l'arrière de la cavité buccale — miroir exact du balancement du corps. Pendant le balancement AP : attention à la transition E→U, vibration dans la gorge et l'arrière du palais."
          }
        ]
      },
      contemplation: {
        duration: "5 minutes",
        question: "Parmi les trois balancements (gauche-droite, haut-bas, avant-arrière), lequel me semble le plus naturel dans ma vie ? Lequel est le plus inconnu ?",
        guidance: "Ce n'est pas une question technique. C'est une question sur ta façon d'habiter le monde. Celui qui se balance naturellement gauche-droite vit dans l'alternance des possibles. Celui qui monte et descend vit dans les cycles. Celui qui va avant-arrière dialogue avec le temps."
      },
      practice: {
        name: "Séquence ILLI → ALLA → ELLU avec balancements",
        duration: "15 minutes",
        intention: "Je donne une voix à chaque axe de mon corps.",
        material: "Chaise stable. Lieu calme.",
        posture: "Assis, dos libre, gorge libre, bouche légèrement entrouverte au repos.",
        steps: [
          "ILLI (5 min) : commence le balancement latéral doux (2s gauche, 2s droite). Sur chaque expiration, vibre doucement ILLI. Langue contre le palais. Intensité douce — tu vibres pour toi, pas pour être entendu.",
          "Pause (30s) : arrête le mouvement et le mantra. Observe le silence intérieur.",
          "ALLA (5 min) : commence le balancement vertical doux (tête vers le bas, tête vers le haut). Sur chaque expiration, vibre ALLA. Gorge ouverte, son descendant.",
          "Pause (30s) : silence.",
          "ELLU (5 min) : commence le balancement antéro-postérieur doux. Sur chaque expiration, vibre ELLU. Transition E→U dans la bouche.",
          "Silence final (2 min) : reste immobile, sans mantra, sans mouvement. Observe ce qui reste."
        ],
        safety: "Ne force jamais le souffle pour produire le mantra. Volume très doux — presque un murmure intérieur. Arrêter en cas de vertige, tension cervicale ou inconfort."
      },
      journalQuestions: [
        "Quel mantra a été le plus naturel à vibrer ?",
        "Où dans le corps as-tu ressenti la vibration de chaque mantra ?",
        "L'association mantra + mouvement a-t-elle facilité ou compliqué la pratique ?",
        "Y avait-il un mantra qui produisait plus de calme que les autres ?"
      ],
      validation: [
        "Je connais les trois mantras ILLI, ALLA, ELLU et leur axe correspondant.",
        "J'ai vibré chacun des trois mantras pendant le balancement correspondant.",
        "J'ai observé l'effet vibratoire dans le corps.",
        "Je comprends pourquoi chaque voyelle correspond à son axe.",
        "J'ai noté mes observations dans le carnet."
      ],
      references: [
        "JE SUIS — Mantras des balancements : ILLI, ALLA, ELLU.",
        "Cours 54 — Mantras ILLI, ALLA, ELLU, RORO (approfondissement complet).",
        "Neuro-acoustique — effets du son sur le système nerveux autonome.",
        "Phonétique articulatoire — géographie sonore des voyelles."
      ],
      image: "assets/images/exercice 113 114 115/mantra 1.png",
      cover: "assets/images/exercice 113 114 115/mantra 1.png",
      coverImage: "assets/images/exercice 113 114 115/mantra 1.png",
      thumbnail: "assets/images/exercice 113 114 115/mantra 1.png",
      images: {
        cover: "assets/images/exercice 113 114 115/mantra 1.png",
        gallery: [
          "assets/images/exercice 113 114 115/mantra 1.png",
          "assets/images/exercice 113 114 115/mantra 2.png"
        ],
        pedagogical: [
          "assets/images/exercice 113 114 115/mantra 2.png"
        ],
        practice: "assets/images/exercice 113 114 115/mantra 2.png",
        contemplation: "assets/images/exercice 113 114 115/mantra 1.png",
        contemplative: "assets/images/exercice 113 114 115/mantra 2.png"
      },
      pdf: { path: "", title: "Cours 115 — Mantras ILLI, ALLA, ELLU", protectedNotice: "Support réservé à l'usage personnel de l'élève Axis Lumen Studio." },
      pdfPremium: true
    }

  ]; // fin NEW_COURSES

  // ─────────────────────────────────────────────────────────────────────────
  // INJECTION
  // ─────────────────────────────────────────────────────────────────────────
  function applyPatch() {
    if (!Array.isArray(window.AXIS_ONE_HOUR_COURSES)) return;

    // 1. Appliquer les ordres d'affichage aux cours existants
    window.AXIS_ONE_HOUR_COURSES.forEach(function (course) {
      var o = ORDER_MAP[Number(course.number)];
      if (o !== undefined) course.order = o;
    });

    // 2. Injecter les 3 nouveaux cours (si pas déjà présents)
    NEW_COURSES.forEach(function (newCourse) {
      var exists = window.AXIS_ONE_HOUR_COURSES.some(function (c) {
        return Number(c.number) === Number(newCourse.number);
      });
      if (!exists) {
        window.AXIS_ONE_HOUR_COURSES.push(newCourse);
      }
    });
  }

  // Exécuter immédiatement — AXIS_ONE_HOUR_COURSES est déjà défini par les
  // scripts précédents. Ne pas attendre DOMContentLoaded car le renderer
  // (axis-apprendre-one-hour.js) est en defer et lit l'array avant cet événement.
  applyPatch();

  window.AXIS_COURSE_ORDER_PATCH = ORDER_MAP;

})();

