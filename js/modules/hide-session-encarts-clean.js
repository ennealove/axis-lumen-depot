(() => {
  function normalize(text) {
    return String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function restoreVirtueBox(session) {
    const selectors = [
      "#axisSelectedVirtueSessionBox",
      "#axisSessionVirtueLarge",
      "#axisForcedLargeVirtueBox",
      ".axis-selected-virtue-session-box",
      ".axis-session-virtue-large",
      ".axis-hide-selected-virtue-card"
    ];

    selectors.forEach((selector) => {
      session.querySelectorAll(selector).forEach((node) => {
        node.classList.remove("axis-hide-selected-virtue-card");
        node.removeAttribute("aria-hidden");
        node.style.display = "";
        node.style.visibility = "";
        node.style.opacity = "";
      });
    });
  }

  function hidePreviewBlock(session) {
    const preview = session.querySelector("#sessionPreview");
    if (!preview) return;

    preview.style.display = "none";
    preview.setAttribute("aria-hidden", "true");

    const article = preview.closest("article.card, .card");
    if (!article) return;

    const text = normalize(article.textContent);

    if (text.includes("apercu des phases")) {
      article.classList.add("axis-hide-session-preview-card");
      article.setAttribute("aria-hidden", "true");
    }
  }

  function cleanSessionOnlyPreview() {
    const session = document.getElementById("session");
    if (!session) return;

    restoreVirtueBox(session);
    hidePreviewBlock(session);
  }

  function scheduleClean() {
    setTimeout(cleanSessionOnlyPreview, 60);
    setTimeout(cleanSessionOnlyPreview, 250);
    setTimeout(cleanSessionOnlyPreview, 700);
  }

  document.addEventListener("DOMContentLoaded", scheduleClean);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-target], button, a");
    if (!trigger) return;

    const label = normalize([
      trigger.dataset?.view || "",
      trigger.dataset?.target || "",
      trigger.textContent || "",
      trigger.getAttribute("href") || ""
    ].join(" "));

    if (
      label.includes("session") ||
      label.includes("seance") ||
      label.includes("creer") ||
      label.includes("vertu") ||
      label.includes("previsualiser")
    ) {
      scheduleClean();
    }
  });

  const session = document.getElementById("session");

  if (session) {
    const observer = new MutationObserver(() => {
      cleanSessionOnlyPreview();
    });

    observer.observe(session, {
      childList: true,
      subtree: true
    });
  }

  window.AXIS_HIDE_SESSION_ENCARTS = cleanSessionOnlyPreview;

  scheduleClean();
})();
