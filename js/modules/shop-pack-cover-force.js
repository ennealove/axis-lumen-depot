(() => {
  const PACK_SRC = "";

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function findPackCard() {
    const cards = Array.from(document.querySelectorAll("article, .axis-shop-card, .card, div"));

    return cards.find((el) => {
      const t = normalize(el.textContent);
      return (
        t.includes("pack complet papier") ||
        (t.includes("pack papier") && t.includes("les 4 livres")) ||
        (t.includes("les 4 livres de la collection") && t.includes("119"))
      );
    });
  }

  function forcePackCover() {
    const card = findPackCard();
    if (!card) return false;

    let img = card.querySelector("img");

    if (!img) {
      const cover = card.querySelector(".axis-shop-cover") || card;
      img = document.createElement("img");
      img.alt = "Pack complet papier — les 4 livres de la collection JE SUIS";
      img.loading = "lazy";
      cover.prepend(img);
    }

    img.src = PACK_SRC;
    img.alt = "Pack complet papier — les 4 livres de la collection JE SUIS";
    img.style.objectFit = "cover";
    img.style.width = "100%";
    img.style.maxWidth = "100%";

    const coverBox = img.closest(".axis-shop-cover");
    if (coverBox) {
      coverBox.classList.add("axis-pack-cover-forced");
    }

    return true;
  }

  function schedule() {
    setTimeout(forcePackCover, 50);
    setTimeout(forcePackCover, 250);
    setTimeout(forcePackCover, 800);
    setTimeout(forcePackCover, 1500);
  }

  document.addEventListener("DOMContentLoaded", schedule);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const label = normalize([
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" "));

    if (label.includes("boutique")) {
      schedule();
    }
  });

  const observer = new MutationObserver(() => {
    const bodyText = normalize(document.body?.innerText || "");
    if (bodyText.includes("pack complet papier") || bodyText.includes("les 4 livres de la collection")) {
      forcePackCover();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_FORCE_PACK_COVER = forcePackCover;

  schedule();
})();
