(function () {
  "use strict";

  var PACK_COVER_URL = "assets/books/pack-cover.png";

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function hasPackText(value) {
    var txt = normalize(value);
    return txt.indexOf("pack complet") !== -1 ||
           txt.indexOf("pack integral") !== -1 ||
           txt.indexOf("collection complete") !== -1 ||
           txt.indexOf("complete pack") !== -1 ||
           txt.indexOf("pack") !== -1;
  }

  function badSrc(src) {
    var value = String(src || "").trim();

    if (!value) return true;
    if (value === window.location.href) return true;
    if (value === "#") return true;
    if (value.indexOf("data:image/svg") === 0) return true;

    var low = normalize(value);

    return low.indexOf("placeholder") !== -1 ||
           low.indexOf("fallback") !== -1 ||
           low.indexOf("cover.svg") !== -1 ||
           low.indexOf("pack-cover") !== -1;
  }

  function applyPackImage(img) {
    if (!img) return;

    img.setAttribute("src", PACK_COVER_URL);
    img.setAttribute("alt", "Pack complet Axis Lumen");
    img.setAttribute("loading", "eager");
    img.classList.add("axis-pack-cover-img");
  }

  function findBestImage(card) {
    var images = Array.prototype.slice.call(card.querySelectorAll("img"));

    if (!images.length) return null;

    var packImage = images.find(function (img) {
      return hasPackText(img.alt) ||
             hasPackText(img.title) ||
             hasPackText(img.id) ||
             hasPackText(img.className) ||
             hasPackText(img.getAttribute("src"));
    });

    if (packImage) return packImage;

    var emptyImage = images.find(function (img) {
      return badSrc(img.getAttribute("src"));
    });

    return emptyImage || images[0];
  }

  function insertPackImage(card) {
    var img = document.createElement("img");
    applyPackImage(img);

    var media =
      card.querySelector(".product-cover") ||
      card.querySelector(".book-cover") ||
      card.querySelector(".card-cover") ||
      card.querySelector(".cover") ||
      card.querySelector(".product-media") ||
      card.querySelector(".book-media") ||
      card.querySelector("figure");

    if (media) {
      media.innerHTML = "";
      media.appendChild(img);
      return;
    }

    card.insertBefore(img, card.firstElementChild || null);
  }

  function upgradeCard(card) {
    if (!card || card.nodeType !== 1) return;
    if (card === document.body || card === document.documentElement) return;

    if (!hasPackText(card.textContent) &&
        !hasPackText(card.id) &&
        !hasPackText(card.className)) {
      return;
    }

    card.classList.add("axis-pack-cover-card");

    var img = findBestImage(card);

    if (img) {
      applyPackImage(img);
    } else {
      insertPackImage(card);
    }
  }

  function closestCard(node) {
    if (!node || !node.closest) return null;

    return node.closest(
      "article, .card, .product-card, .book-card, .shop-card, .home-card, .feature-card, .premium-card, .library-card, .book-tile, .product, .book, li, .grid > div, .collection-card"
    );
  }

  function run() {
    Array.prototype.slice.call(document.querySelectorAll("img")).forEach(function (img) {
      if (
        hasPackText(img.alt) ||
        hasPackText(img.title) ||
        hasPackText(img.id) ||
        hasPackText(img.className) ||
        hasPackText(img.getAttribute("src"))
      ) {
        applyPackImage(img);
      }
    });

    Array.prototype.slice.call(document.querySelectorAll("h1,h2,h3,h4,p,strong,span,a,button")).forEach(function (node) {
      if (!hasPackText(node.textContent)) return;

      var card = closestCard(node);

      if (card) {
        upgradeCard(card);
      }
    });

    Array.prototype.slice.call(document.querySelectorAll("[data-product],[data-book],[data-title],[id],[class]")).forEach(function (node) {
      if (
        hasPackText(node.getAttribute("data-product")) ||
        hasPackText(node.getAttribute("data-book")) ||
        hasPackText(node.getAttribute("data-title")) ||
        hasPackText(node.id) ||
        hasPackText(node.className)
      ) {
        var card = closestCard(node) || node;
        upgradeCard(card);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  setTimeout(run, 500);
  setTimeout(run, 1500);
})();