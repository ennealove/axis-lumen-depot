(() => {
  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getVirtueScope() {
    return document.getElementById("vertus") ||
      document.querySelector("[data-view='vertus']") ||
      document.querySelector("[data-page='vertus']") ||
      document.body;
  }

  function hideAddToSessionButton() {
    const scope = getVirtueScope();

    const buttons = Array.from(scope.querySelectorAll("button, a"));

    buttons.forEach((button) => {
      const label = normalize(button.textContent || "");

      if (
        label.includes("ajouter") &&
        label.includes("ma seance")
      ) {
        button.classList.add("axis-hide-add-virtue-button");
        button.style.display = "none";
        button.setAttribute("aria-hidden", "true");
        button.setAttribute("tabindex", "-1");
      }
    });
  }

  function schedule() {
    setTimeout(hideAddToSessionButton, 50);
    setTimeout(hideAddToSessionButton, 250);
    setTimeout(hideAddToSessionButton, 700);
    setTimeout(hideAddToSessionButton, 1400);
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

    if (
      label.includes("carte vertu") ||
      label.includes("vertu") ||
      label.includes("tirer") ||
      label.includes("agrandir")
    ) {
      schedule();
    }
  }, true);

  const observer = new MutationObserver(() => {
    const text = normalize(document.body?.innerText || "");

    if (
      text.includes("ajouter a ma seance") ||
      text.includes("ajouter à ma séance") ||
      text.includes("creer une seance vertu") ||
      text.includes("créer une séance vertu")
    ) {
      hideAddToSessionButton();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_HIDE_ADD_VIRTUE_BUTTON = hideAddToSessionButton;

  schedule();
})();
