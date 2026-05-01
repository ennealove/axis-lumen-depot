(() => {
  "use strict";

  function markVirtueCards() {
    document.body.classList.add("axis-virtues-page");

    const images = Array.from(document.images || []);

    images.forEach((img) => {
      const src = String(img.currentSrc || img.src || "").toLowerCase();
      const alt = String(img.alt || "").toLowerCase();

      const isVirtue =
        src.includes("assets/virtues/") ||
        src.includes("assets/vertus/") ||
        src.includes("virtue_") ||
        alt.includes("vertu") ||
        alt.includes("virtue");

      if (!isVirtue) return;

      img.classList.add("axis-virtue-full-img");
      img.loading = "eager";

      const frame =
        img.closest(".axis-virtue-card-frame") ||
        img.closest(".virtue-card-frame") ||
        img.closest(".vertu-card-frame") ||
        img.closest(".axis-virtue-card") ||
        img.closest(".virtue-card") ||
        img.closest(".vertu-card") ||
        img.closest(".daily-virtue-card") ||
        img.closest(".drawn-virtue-card") ||
        img.closest("figure") ||
        img.parentElement;

      if (frame) {
        frame.classList.add("axis-virtue-full-frame");
      }

      const host =
        img.closest("article") ||
        img.closest(".card") ||
        img.closest(".axis-panel") ||
        img.closest(".axis-virtue-reader") ||
        img.closest(".virtue-reader");

      if (host) {
        host.classList.add("axis-card-full-host");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", markVirtueCards);
  } else {
    markVirtueCards();
  }

  const observer = new MutationObserver(markVirtueCards);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "alt", "class"]
  });
})();
