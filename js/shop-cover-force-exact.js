(function () {
  const STAMP = "20260501_183240";

  const COVERS = [
    { key: "je-suis", src: "assets/books/je-suis-cover.jpg", match: ["je suis", "je suis pdf", "je suis epub", "je suis papier", "rendre son temple vivant"] },
    { key: "vertus", src: "assets/books/vertus-cover.jpg", match: ["livre des vertus", "vertus"] },
    { key: "alimentation", src: "assets/books/alimentation-cover.jpg", match: ["livre de l’alimentation", "livre de l'alimentation", "alimentation", "terrain"] },
    { key: "exercices", src: "assets/books/exercices-cover.jpg", match: ["livre d’exercices", "livre d'exercices", "exercices"] },
    { key: "pack", src: "assets/books/pack-complet-cover.jpg", match: ["pack 4 livres", "pack complet", "collection complète", "collection complete"] },
    { key: "fondateur", src: "assets/books/pack-fondateur-cover.jpg", match: ["pack fondateur"] },
    { key: "terrain", src: "assets/books/pack-terrain-cover.jpg", match: ["pack terrain"] },
    { key: "abonnement", src: "assets/books/abonnement-cover.jpg", match: ["abonnement"] }
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

  function coverFor(card) {
    const txt = normalize(card.textContent);

    const ordered = COVERS.slice().sort(function (a, b) {
      return Math.max.apply(null, b.match.map(m => normalize(m).length)) -
             Math.max.apply(null, a.match.map(m => normalize(m).length));
    });

    return ordered.find(function (cover) {
      return cover.match.some(function (term) {
        return txt.includes(normalize(term));
      });
    });
  }

  function inject(card, cover) {
    if (!cover) return;

    let frame = card.querySelector(".axis-cover-force-frame, .axis-book-cover-frame, .axis-shop-cover, .shop-cover, .product-cover, figure, picture");

    if (!frame) {
      frame = document.createElement("div");
      card.insertBefore(frame, card.firstChild);
    }

    frame.className = "axis-cover-force-frame";
    frame.setAttribute("data-cover-kind", cover.key);
    frame.innerHTML = "";

    const img = document.createElement("img");
    img.className = "axis-cover-force-img";
    img.src = cover.src + "?v=" + STAMP;
    img.alt = "Couverture " + cover.key;
    img.loading = "lazy";

    frame.appendChild(img);
    card.setAttribute("data-axis-cover", cover.key);
  }

  function findCards() {
    const root = document.getElementById("boutique") || document.querySelector("main") || document.body;

    return Array.from(root.querySelectorAll("article, .axis-shop-card, .shop-card, .product-card, .card, [data-shop-offer]"))
      .filter(function (card) {
        const txt = normalize(card.textContent);
        return txt.includes("je suis") ||
          txt.includes("vertus") ||
          txt.includes("alimentation") ||
          txt.includes("exercices") ||
          txt.includes("pack") ||
          txt.includes("abonnement");
      });
  }

  function apply() {
    if (!/boutique\.html$/i.test(window.location.pathname)) return;

    findCards().forEach(function (card) {
      inject(card, coverFor(card));
    });

    document.documentElement.setAttribute("data-axis-covers-forced", "true");
    console.info("Couvertures boutique corrigées — mapping exact.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(apply, 100);
      setTimeout(apply, 800);
      setTimeout(apply, 1800);
    });
  } else {
    setTimeout(apply, 100);
    setTimeout(apply, 800);
    setTimeout(apply, 1800);
  }
})();