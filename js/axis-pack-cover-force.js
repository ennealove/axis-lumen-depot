(function () {
  const STAMP = "20260501_195928";
  const PACK_SRC = "assets/books/pack-cover-official.png";

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function isPackCompleteText(text) {
    const t = normalize(text);

    const positive =
      t.includes("pack complet") ||
      t.includes("pack 4 livres") ||
      t.includes("pack quatre livres") ||
      t.includes("collection complete");

    const negative =
      t.includes("pack fondateur") ||
      t.includes("pack terrain") ||
      t.includes("abonnement");

    return positive && !negative;
  }

  function findPackCard() {
    const root = document.getElementById("boutique") || document.querySelector("main") || document.body;

    const candidates = Array.from(root.querySelectorAll(
      "article, .axis-shop-card, .shop-card, .product-card, .card, [data-shop-offer], [data-product]"
    ));

    let card = candidates.find(function (el) {
      const heading = el.querySelector("h1,h2,h3,h4,strong");
      return heading && isPackCompleteText(heading.textContent);
    });

    if (card) return card;

    card = candidates.find(function (el) {
      return isPackCompleteText(el.textContent);
    });

    return card || null;
  }

  function injectPackCover() {
    const card = findPackCard();

    if (!card) {
      console.warn("Pack complet introuvable dans la boutique.");
      return;
    }

    let frame = card.querySelector(".axis-pack-cover-force-frame");

    if (!frame) {
      frame = card.querySelector(".axis-shop-cover, .shop-cover, .product-cover, figure, picture, .axis-book-cover-frame");
    }

    if (!frame) {
      frame = document.createElement("div");
      card.insertBefore(frame, card.firstChild);
    }

    frame.className = "axis-pack-cover-force-frame";
    frame.innerHTML = "";

    const img = document.createElement("img");
    img.className = "axis-pack-cover-force-img";
    img.src = PACK_SRC + "?v=" + STAMP;
    img.alt = "Pack complet Axis Lumen Studio";
    img.loading = "eager";

    frame.appendChild(img);

    card.setAttribute("data-axis-pack-cover", "official");
    document.documentElement.setAttribute("data-axis-pack-cover", "loaded");

    console.info("Image pack complet forcée :", PACK_SRC);
  }

  function init() {
    if (!/boutique\.html$/i.test(window.location.pathname)) return;

    injectPackCover();
    setTimeout(injectPackCover, 400);
    setTimeout(injectPackCover, 1200);
    setTimeout(injectPackCover, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();