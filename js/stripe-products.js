window.AXIS_STRIPE_PRODUCTS = {
  // ── Accès à vie (nouveau modèle) ──────────────────────────────────────────
  subscription: {
    // Paiement unique — 1 090 €
    paymentLinkLifetime:   "",   // ← coller ici le Payment Link Stripe (one-time 1090€)
    // Paiement en 4 fois — 4 × 272,50 €
    paymentLinkLifetime4x: "",   // ← coller ici le Payment Link Stripe (4 installments)
    // Legacy (conservés pour compatibilité)
    paymentLinkAnnual:  "",
    paymentLinkMonthly: ""
  },

  lifetime: {
    id: "lifetime",
    label: "Accès à vie — Axis Lumen Studio",
    amountCents: 109000,
    displayPrice: "1 090 €",
    mode: "payment",
    plan: "lifetime",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  lifetime_4x: {
    id: "lifetime_4x",
    label: "Accès à vie — paiement en 4 fois",
    amountCents: 109000,
    displayPrice: "4 × 272,50 €",
    mode: "payment",
    plan: "lifetime-4x",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  // ── Legacy (conservés pour compatibilité) ─────────────────────────────────
  subscription_monthly: {
    id: "subscription_monthly",
    label: "Abonnement mensuel (legacy)",
    amountCents: 1900,
    displayPrice: "19 € / mois",
    mode: "subscription",
    plan: "monthly",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  subscription_yearly: {
    id: "subscription_yearly",
    label: "Abonnement annuel (legacy)",
    amountCents: 19000,
    displayPrice: "190 € / an",
    mode: "subscription",
    plan: "yearly",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  book_je_suis: {
    id: "book_je_suis",
    label: "JE SUIS — Rendre son temple vivant",
    mode: "payment",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  book_vertus: {
    id: "book_vertus",
    label: "Le Livre des Vertus",
    mode: "payment",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  book_alimentation: {
    id: "book_alimentation",
    label: "Le Livre de l’Alimentation",
    mode: "payment",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  book_exercices: {
    id: "book_exercices",
    label: "Le Livre d’Exercices",
    mode: "payment",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  },

  pack_complet: {
    id: "pack_complet",
    label: "Pack complet — 4 livres",
    mode: "payment",
    commissionable: true,
    commissionRate: 0.20,
    priceId: "",
    paymentLink: ""
  }
};