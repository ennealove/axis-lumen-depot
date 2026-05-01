export const PRODUCTS = [
  {
    id: 'je-suis',
    slug: 'je-suis-rendre-son-temple-vivant',
    title: 'JE SUIS',
    subtitle: 'Rendre son temple vivant',
    role: 'Livre fondateur',
    description: 'Version numérique, papier et packs combinés.',
    longDescription: 'Livre source pour préparer le corps, orienter la pensée, accueillir la lumière et structurer la pratique.',
    formats: ['pdf', 'epub', 'bundle-digital', 'paper', 'paper-digital'],
    prices: {
      pdf: 17,
      epub: 17,
      bundleDigital: 24,
      paper: 29,
      paperDigital: 39
    },
    currency: 'EUR',
    image: 'assets/books/je-suis-cover.jpg',
    available: true,
    stripePriceIds: {
      pdf: '',
      epub: '',
      bundleDigital: '',
      paper: '',
      paperDigital: ''
    }
  },
  {
    id: 'livre-des-vertus',
    slug: 'livre-des-vertus',
    title: 'Le Livre des Vertus',
    subtitle: '72 vertus à contempler',
    role: 'Papier',
    description: 'Format papier uniquement.',
    longDescription: 'Support de tirage, lecture lente et imprégnation pour une vertu par séance.',
    formats: ['paper', 'future-box'],
    prices: {
      paper: 34,
      futureBoxMin: 69,
      futureBoxMax: 79
    },
    currency: 'EUR',
    image: 'assets/books/vertus-cover.jpg',
    available: true,
    stripePriceIds: {
      paper: '',
      futureBox: ''
    }
  },
  {
    id: 'livre-alimentation',
    slug: 'livre-alimentation',
    title: 'Le Livre de l\'Alimentation',
    subtitle: 'Terrain vivant et rH²',
    role: 'Papier',
    description: 'Format papier uniquement.',
    longDescription: 'Repères concrets autour du terrain vivant, de l\'eau, des minéraux et des émonctoires.',
    formats: ['paper'],
    prices: {
      paper: 32
    },
    currency: 'EUR',
    image: 'assets/books/alimentation-cover.jpg',
    available: true,
    stripePriceIds: {
      paper: ''
    }
  },
  {
    id: 'livre-exercices',
    slug: 'livre-exercices',
    title: 'Le Livre d\'Exercices',
    subtitle: 'Lumière, souffle et rythme',
    role: 'Papier',
    description: 'Format papier uniquement.',
    longDescription: 'Protocoles de pratique: observation lumineuse, rémanence, souffle, balancement, rotor et carnet.',
    formats: ['paper'],
    prices: {
      paper: 39
    },
    currency: 'EUR',
    image: 'assets/books/exercices-cover.jpg',
    available: true,
    stripePriceIds: {
      paper: ''
    }
  },
  {
    id: 'pack-4-livres-papier',
    slug: 'pack-4-livres-papier',
    title: 'Pack 4 livres papier',
    subtitle: 'Collection complète',
    role: 'Pack',
    description: 'JE SUIS + Vertus + Alimentation + Exercices.',
    longDescription: 'Pack complet pour construire une progression sur les quatre axes du projet.',
    formats: ['paper-pack'],
    prices: {
      paperPack: 119
    },
    currency: 'EUR',
    image: 'assets/books/je-suis-cover.jpg',
    available: true,
    stripePriceIds: {
      paperPack: ''
    }
  },
  {
    id: 'pack-fondateur',
    slug: 'pack-fondateur-je-suis-exercices',
    title: 'Pack fondateur',
    subtitle: 'JE SUIS + Exercices',
    role: 'Pack',
    description: 'Pack papier fondamental.',
    longDescription: 'Concentre le socle JE SUIS et l\'application directe par les exercices.',
    formats: ['paper-pack'],
    prices: {
      paperPack: 59
    },
    currency: 'EUR',
    image: 'assets/books/exercices-cover.jpg',
    available: true,
    stripePriceIds: {
      paperPack: ''
    }
  },
  {
    id: 'pack-terrain',
    slug: 'pack-terrain-alimentation-exercices',
    title: 'Pack Terrain',
    subtitle: 'Alimentation + Exercices',
    role: 'Pack',
    description: 'Pack papier terrain et pratique.',
    longDescription: 'Relie directement le terrain physiologique et la pratique guidée.',
    formats: ['paper-pack'],
    prices: {
      paperPack: 65
    },
    currency: 'EUR',
    image: 'assets/books/alimentation-cover.jpg',
    available: true,
    stripePriceIds: {
      paperPack: ''
    }
  }
];

export const SUBSCRIPTION_PRODUCT = {
  id: 'axis-lumen-studio-subscription',
  title: 'Abonnement Axis Lumen Studio',
  prices: {
    monthly: 19,
    yearly: 190
  },
  currency: 'EUR',
  stripePriceIds: {
    monthly: '',
    yearly: ''
  },
  features: [
    'Studio de pratique',
    'Séances guidées',
    'Générateur de séance',
    'Carte Vertu du jour',
    'Parcours Apprendre',
    'Progression locale',
    'Exercices lumière / respiration / balancement',
    'Bibliothèque audio'
  ]
};

export const REFERRAL_CONFIG = {
  enabled: true,
  referralCookieDays: 60,
  rewardTrigger: 'paid_subscription_or_valid_purchase',
  referrerReward: {
    type: 'credit',
    label: 'Crédit de gratitude',
    amount: 5,
    currency: 'EUR'
  },
  referredUserReward: {
    type: 'percent_discount',
    label: 'Remise de bienvenue',
    percent: 10
  },
  allowSelfReferral: false
};

const VIRTUE_NAMES = [
  'Présence', 'Silence intérieur', 'Observation', 'Acceptation', 'Sincérité', 'Disponibilité',
  'Bienveillance', 'Compassion', 'Douceur', 'Pardon', 'Gratitude', 'Générosité',
  'Stabilité', 'Ancrage', 'Endurance', 'Patience', 'Rythme', 'Simplicité',
  'Clarté', 'Discernement', 'Lucidité', 'Responsabilité', 'Mesure', 'Précision',
  'Lâcher-prise', 'Renoncement', 'Dépouillement', 'Adaptation', 'Résilience', 'Transmutation',
  'Courage', 'Volonté', 'Détermination', 'Discipline', 'Maîtrise', 'Engagement',
  'Élan', 'Fluidité', 'Audace', 'Exploration', 'Initiative', 'Avancée',
  'Attention', 'Conscience de soi', 'Conscience des autres', 'Vision', 'Intuition', 'Compréhension',
  'Équilibre', 'Paix', 'Harmonie', 'Réconciliation', 'Unité', 'Alignement',
  'Inspiration', 'Créativité', 'Émerveillement', 'Beauté', 'Joie', 'Ouverture',
  'Humilité', 'Vérité', 'Foi', 'Noblesse', 'Sagesse', 'Amour',
  'Présence rayonnante', 'Stabilité intérieure', 'Fidélité à soi', 'Rayonnement', 'Service', 'Accomplissement'
];

const VIRTUE_FAMILIES = [
  'Fondation', 'Fondation', 'Fondation', 'Fondation', 'Fondation', 'Fondation',
  'Cœur', 'Cœur', 'Cœur', 'Cœur', 'Cœur', 'Cœur',
  'Stabilité', 'Stabilité', 'Stabilité', 'Stabilité', 'Stabilité', 'Stabilité',
  'Clarté', 'Clarté', 'Clarté', 'Clarté', 'Clarté', 'Clarté',
  'Transformation', 'Transformation', 'Transformation', 'Transformation', 'Transformation', 'Transformation',
  'Volonté', 'Volonté', 'Volonté', 'Volonté', 'Volonté', 'Volonté',
  'Élan', 'Élan', 'Élan', 'Élan', 'Élan', 'Élan',
  'Conscience', 'Conscience', 'Conscience', 'Conscience', 'Conscience', 'Conscience',
  'Harmonie', 'Harmonie', 'Harmonie', 'Harmonie', 'Harmonie', 'Harmonie',
  'Création', 'Création', 'Création', 'Création', 'Création', 'Création',
  'Sagesse', 'Sagesse', 'Sagesse', 'Sagesse', 'Sagesse', 'Sagesse',
  'Rayonnement', 'Rayonnement', 'Rayonnement', 'Rayonnement', 'Rayonnement', 'Rayonnement'
];

export const VIRTUES = VIRTUE_NAMES.map((name, index) => {
  const number = index + 1;
  return {
    number,
    id: `virtue-${String(number).padStart(2, '0')}`,
    name,
    family: VIRTUE_FAMILIES[index],
    intention: `Aujourd'hui, j'accueille ${name.toLowerCase()} dans un geste simple et concret.`
  };
});
