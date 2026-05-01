(function () {
  const COVERS = [
    { key: "je-suis", src: "assets/book-covers-restored/je-suis-rendre-son-temple-vivant.svg", match: ["JE SUIS", "Rendre son temple vivant", "temple vivant"] },
    { key: "vertus", src: "assets/book-covers-restored/livre-des-vertus.svg", match: ["Livre des Vertus", "Vertus"] },
    { key: "alimentation", src: "assets/book-covers-restored/livre-alimentation.svg", match: ["Livre de l’Alimentation", "Livre de l'Alimentation", "Alimentation", "Terrain"] },
    { key: "exercices", src: "assets/book-covers-restored/livre-exercices.svg", match: ["Livre d’Exercices", "Livre d'Exercices", "Exercices"] },
    { key: "pack-4", src: "assets/book-covers-restored/pack-4-livres.svg", match: ["Pack 4 livres", "Pack quatre livres", "Collection complète", "Pack"] },
    { key: "fondateur", src: "assets/book-covers-restored/pack-fondateur.svg", match: ["Pack fondateur", "Fondateur"] },
    { key: "terrain", src: "assets/book-covers-restored/pack-terrain.svg", match: ["Pack Terrain", "Terrain"] },
    { key: "abonnement", src: "assets/book-covers-restored/abonnement-axis-lumen-studio.svg", match: ["Abonnement Axis Lumen Studio", "Abonnement"] }
  ];

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function findCards() {
    const boutique = document.getElementById("boutique") || document.querySelector("main") || document.body;

    return Array.from(boutique.querySelectorAll("article, .axis-shop-card, .shop-card, .card, [data-shop-offer], .product-card"))
      .filter(function (card) {
        const txt = normalize(card.textContent);
        return txt.includes("livre") || txt.includes("pack") || txt.includes("abonnement") || txt.includes("je suis") || txt.includes("vertus");
      });
  }

  function coverForCard(card) {
    const text = normalize(card.textContent);

    return COVERS.find(function (cover) {
      return cover.match.some(function (term) {
        return text.includes(normalize(term));
      });
    });
  }

  function hasRealImage(card) {
    const img = card.querySelector("img");

    if (!img) return false;

    const src = img.getAttribute("src") || "";

    if (!src) return false;

    return true;
  }

  function injectCover(card, cover) {
    if (!cover || hasRealImage(card)) return;

    const img = document.createElement("img");
    img.className = "axis-book-cover-restored";
    img.src = cover.src + "?v=20260501_181505";
    img.alt = "Couverture " + cover.key;
    img.loading = "lazy";

    const existingMedia = card.querySelector(".axis-shop-cover, .shop-cover, .product-cover, figure, picture");

    if (existingMedia) {
      existingMedia.innerHTML = "";
      existingMedia.appendChild(img);
      existingMedia.classList.add("axis-book-cover-frame");
      return;
    }

    const frame = document.createElement("div");
    frame.className = "axis-book-cover-frame";
    frame.appendChild(img);

    card.insertBefore(frame, card.firstChild);
  }

  function applyCovers() {
    const cards = findCards();

    cards.forEach(function (card) {
      const cover = coverForCard(card);
      injectCover(card, cover);
    });

    document.documentElement.setAttribute("data-axis-book-covers", "restored");
    console.info("Axis Lumen couvertures boutique restaurées :", COVERS.length);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(applyCovers, 300);
      setTimeout(applyCovers, 1200);
      setTimeout(applyCovers, 2500);
    });
  } else {
    setTimeout(applyCovers, 300);
    setTimeout(applyCovers, 1200);
    setTimeout(applyCovers, 2500);
  }
})();