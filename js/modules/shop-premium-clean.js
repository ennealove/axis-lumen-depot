(() => {
  const BOOK_IMAGES = {
  "je-suis": "assets/books/je-suis-cover.jpg",
  "vertus": "assets/books/vertus-cover.jpg",
  "alimentation": "assets/books/alimentation-cover.jpg",
  "exercices": "assets/books/exercices-cover.jpg"
};

  const SHOP_OFFERS = [
    {
      id: "je-suis-numerique",
      title: "JE SUIS — Numérique",
      subtitle: "PDF + EPUB",
      price: "19 €",
      type: "Offre numérique",
      image: BOOK_IMAGES["je-suis"],
      featured: true,
      description:
        "Le livre fondateur de la collection : recentrage, temple vivant, purification intérieure et retour au centre.",
      cta: "Acheter le numérique",
      formats: ["PDF", "EPUB"]
    },
    {
      id: "je-suis-papier",
      title: "JE SUIS",
      subtitle: "Rendre son temple vivant",
      price: "29 €",
      type: "Livre papier",
      image: BOOK_IMAGES["je-suis"],
      description:
        "L’ouvrage socle, en version imprimée, pour poser la ligne intérieure de toute la pratique.",
      cta: "Commander le livre",
      formats: ["Papier"]
    },
    {
      id: "vertus-papier",
      title: "Le Livre des Vertus",
      subtitle: "72 qualités à contempler",
      price: "34 €",
      type: "Livre papier",
      image: BOOK_IMAGES["vertus"],
      description:
        "Un support de tirage, de contemplation et d’orientation intérieure autour des 72 vertus.",
      cta: "Commander le livre",
      formats: ["Papier"]
    },
    {
      id: "alimentation-papier",
      title: "Le Livre de l’Alimentation",
      subtitle: "Terrain vivant et purification",
      price: "29 €",
      type: "Livre papier",
      image: BOOK_IMAGES["alimentation"],
      description:
        "Une approche structurée du terrain, de l’eau, des minéraux, des émonctoires et de l’alimentation consciente.",
      cta: "Commander le livre",
      formats: ["Papier"]
    },
    {
      id: "exercices-papier",
      title: "Le Livre d’Exercices",
      subtitle: "Lumière, souffle et mouvement",
      price: "39 €",
      type: "Livre papier",
      image: BOOK_IMAGES["exercices"],
      description:
        "Le livre visuel et pédagogique qui accompagne les pratiques : observation lumineuse, rémanence, balancements, respiration et intégration.",
      cta: "Commander le livre",
      formats: ["Papier"]
    },
    {
      id: "pack-complet-papier",
      title: "Pack complet papier",
      subtitle: "Les 4 livres de la collection",
      price: "119 €",
      type: "Pack papier",
      image: "assets/books/pack-cover.png",
      featured: true,
      description:
        "L’ensemble de la collection JE SUIS en version papier : fondation, vertus, terrain et exercices.",
      cta: "Réserver le pack complet",
      formats: ["4 livres papier"]
    }
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function imageHtml(offer) {
    if (!offer.image) {
      return `
        <div class="axis-shop-cover axis-shop-cover-empty">
          <div class="axis-shop-cover-symbol">✦</div>
          <span>Couverture à synchroniser</span>
        </div>
      `;
    }

    return `
      <div class="axis-shop-cover">
        <img src="${escapeHtml(offer.image)}" alt="${escapeHtml(offer.title)}" loading="lazy">
      </div>
    `;
  }

  function offerCard(offer) {
    return `
      <article class="axis-shop-card ${offer.featured ? "is-featured" : ""}">
        ${imageHtml(offer)}

        <div class="axis-shop-card-body">
          <div class="axis-shop-type">${escapeHtml(offer.type)}</div>
          <h2>${escapeHtml(offer.title)}</h2>
          <p class="axis-shop-subtitle">${escapeHtml(offer.subtitle)}</p>
          <p class="axis-shop-description">${escapeHtml(offer.description)}</p>

          <div class="axis-shop-format-row">
            ${offer.formats.map((format) => `<span>${escapeHtml(format)}</span>`).join("")}
          </div>

          <div class="axis-shop-bottom">
            <strong>${escapeHtml(offer.price)}</strong>
            <button class="axis-shop-buy" type="button" data-shop-offer="${escapeHtml(offer.id)}">
              ${escapeHtml(offer.cta)}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderBoutique() {
    const section = document.getElementById("boutique");
    if (!section) return;

    section.innerHTML = `
      <section class="axis-shop-page">
        <div class="axis-shop-hero">
          <div class="axis-shop-kicker">Boutique</div>
          <h1>Librairie JE SUIS</h1>
          <p>
            Quatre livres, une seule ligne intérieure : revenir au centre, structurer le terrain,
            contempler les vertus et pratiquer avec précision.
          </p>
        </div>

        <div class="axis-shop-intro">
          <article>
            <span>Offre principale</span>
            <h2>JE SUIS — PDF + EPUB</h2>
            <p>
              L’entrée la plus directe dans l’univers du Temple Vivant.
              Une version numérique claire, immédiate et légère.
            </p>
          </article>

          <article>
            <span>Offre complète</span>
            <h2>Pack papier 4 livres</h2>
            <p>
              Une bibliothèque cohérente pour relier fondation, vertus, alimentation consciente
              et exercices initiatiques.
            </p>
          </article>
        </div>

        <div class="axis-shop-grid">
          ${SHOP_OFFERS.map(offerCard).join("")}
        </div>

        <div class="axis-shop-note">
          <h2>Paiement sécurisé</h2>
          <p>
            Les boutons sont prêts à être reliés à Stripe. Pour l’instant, ils préparent la commande
            et conservent l’offre choisie localement, sans clé secrète dans le navigateur.
          </p>
        </div>
      </section>
    `;

    bindShopButtons();
  }

  function bindShopButtons() {
    document.querySelectorAll("[data-shop-offer]").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        const offerId = button.dataset.shopOffer;
        const offer = SHOP_OFFERS.find((item) => item.id === offerId);

        localStorage.setItem("axis_shop_pending_order", JSON.stringify({
          offerId,
          title: offer?.title || "",
          price: offer?.price || "",
          createdAt: new Date().toISOString()
        }));

        const links = window.AXIS_STRIPE_LINKS || {};
        const stripeLink = links[offerId];

        if (stripeLink) {
          window.location.href = stripeLink;
          return;
        }

        alert("Commande préparée : " + (offer?.title || offerId) + ". Le lien Stripe sera branché ensuite.");
      });
    });
  }

  function scheduleRender() {
    setTimeout(renderBoutique, 60);
    setTimeout(renderBoutique, 220);
  }

  document.addEventListener("DOMContentLoaded", scheduleRender);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const label = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (label.includes("boutique")) {
      scheduleRender();
    }
  });

  window.AXIS_SHOP_PREMIUM = {
    renderBoutique,
    offers: SHOP_OFFERS,
    images: BOOK_IMAGES
  };

  scheduleRender();
})();

