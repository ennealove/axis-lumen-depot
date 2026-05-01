(() => {
  const SELECTED_VIRTUE_KEY = "axis_selected_virtue";
  const PENDING_SESSION_KEY = "axis_pending_virtue_session";
  const SESSION_INTENTION_KEY = "axis_session_intention";

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function visible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function getVirtueView() {
    return document.getElementById("vertus") ||
      document.querySelector("[data-view='vertus']") ||
      document.querySelector("[data-page='vertus']") ||
      document.querySelector(".virtue-page") ||
      document.body;
  }

  function getCurrentVirtueImage() {
    const view = getVirtueView();

    const imgs = Array.from(view.querySelectorAll("img"))
      .filter((img) => visible(img))
      .filter((img) => {
        const src = normalize(img.currentSrc || img.src || "");
        const alt = normalize(img.alt || "");
        return src.includes("virtue") ||
          src.includes("vertu") ||
          src.includes("carte") ||
          alt.includes("vertu") ||
          alt.includes("carte") ||
          img.closest(".virtue-lightbox") ||
          img.closest("[class*='virtue']") ||
          img.closest("[id*='virtue']");
      });

    return imgs[0] || Array.from(view.querySelectorAll("img")).filter(visible)[0] || null;
  }

  function getCurrentVirtueName() {
    const view = getVirtueView();

    const selectors = [
      "[data-virtue-name]",
      ".virtue-name",
      ".axis-virtue-name",
      "#virtueName",
      "#axisVirtueName",
      "h1",
      "h2",
      "h3"
    ];

    for (const selector of selectors) {
      const el = view.querySelector(selector);
      const text = String(el?.dataset?.virtueName || el?.textContent || "").trim();

      if (
        text &&
        !normalize(text).includes("carte vertu") &&
        !normalize(text).includes("tirer") &&
        !normalize(text).includes("exercice") &&
        text.length <= 80
      ) {
        return text;
      }
    }

    const img = getCurrentVirtueImage();
    if (img?.alt) return img.alt.trim();

    return "Vertu tirée";
  }

  function getCurrentVirtueFamily() {
    const view = getVirtueView();
    const text = view.innerText || "";

    const families = [
      "Initiation",
      "Ouverture du cœur",
      "Ancrage",
      "Justesse",
      "Transformation",
      "Puissance intérieure",
      "Mouvement",
      "Conscience",
      "Harmonie",
      "Inspiration",
      "Sagesse du cœur",
      "Incarnation"
    ];

    return families.find((family) => normalize(text).includes(normalize(family))) || "Vertus";
  }

  function getCurrentVirtue() {
    const image = getCurrentVirtueImage();
    const name = getCurrentVirtueName();

    return {
      name,
      family: getCurrentVirtueFamily(),
      image: image ? (image.currentSrc || image.src || "") : "",
      intention: `Pratiquer avec la vertu : ${name}`,
      practicePrompt:
        "Lire la carte, observer une lumière douce 20 à 30 secondes, fermer les yeux, laisser la rémanence apparaître, puis déposer la vertu dans le souffle.",
      selectedAt: new Date().toISOString()
    };
  }

  function saveVirtueForSession(mode = "add") {
    const virtue = getCurrentVirtue();

    localStorage.setItem(SELECTED_VIRTUE_KEY, JSON.stringify(virtue));
    localStorage.setItem(SESSION_INTENTION_KEY, virtue.intention);
    localStorage.setItem(PENDING_SESSION_KEY, JSON.stringify({
      mode,
      virtue,
      template: mode === "create" ? "Séance Vertu — 12 minutes" : "Séance personnalisée",
      phases: [
        "Préparation",
        "Lecture de la carte",
        "Observation lumineuse",
        "Rémanence + vertu",
        "Respiration douce",
        "Intégration",
        "Note finale"
      ],
      createdAt: new Date().toISOString()
    }));

    return virtue;
  }

  function goToSessionBuilder() {
    const candidates = Array.from(document.querySelectorAll("[data-view], [data-page], a, button"));

    const target = candidates.find((el) => {
      const label = normalize([
        el.dataset?.view || "",
        el.dataset?.page || "",
        el.getAttribute("href") || "",
        el.textContent || ""
      ].join(" "));

      return label.includes("creer sa seance") ||
        label.includes("créer sa séance") ||
        label.includes("session") ||
        label.includes("seance");
    });

    if (target) {
      target.click();
      setTimeout(injectVirtueIntoSessionBuilder, 120);
      setTimeout(injectVirtueIntoSessionBuilder, 450);
      return;
    }

    location.hash = "#session";
    setTimeout(injectVirtueIntoSessionBuilder, 250);
  }

  function findSessionSection() {
    const ids = [
      "session",
      "seance",
      "creer",
      "create-session",
      "session-builder",
      "dashboard"
    ];

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && visible(el)) return el;
    }

    const sections = Array.from(document.querySelectorAll("section, main, article, div"))
      .filter(visible);

    return sections.find((el) => {
      const text = normalize(el.innerText || "");
      return text.includes("creer sa seance") ||
        text.includes("créer sa séance") ||
        text.includes("construire une seance") ||
        text.includes("séance 45 min") ||
        text.includes("mixage 15 min");
    }) || document.querySelector("main") || document.body;
  }

  function setSessionFields(virtue) {
    const root = findSessionSection();

    const allInputs = Array.from(root.querySelectorAll("input, textarea, select"));

    allInputs.forEach((field) => {
      const meta = normalize([
        field.id || "",
        field.name || "",
        field.placeholder || "",
        field.getAttribute("aria-label") || "",
        field.closest("label")?.innerText || ""
      ].join(" "));

      if (
        meta.includes("intention") ||
        meta.includes("vertu") ||
        meta.includes("theme") ||
        meta.includes("thème") ||
        meta.includes("objectif")
      ) {
        if (field.tagName === "SELECT") {
          const options = Array.from(field.options);
          const found = options.find((option) => normalize(option.textContent).includes(normalize(virtue.name)));

          if (found) {
            field.value = found.value;
          }
        } else {
          field.value = virtue.intention;
        }

        field.dispatchEvent(new Event("input", { bubbles: true }));
        field.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  function injectVirtueIntoSessionBuilder() {
    let virtue;

    try {
      virtue = JSON.parse(localStorage.getItem(SELECTED_VIRTUE_KEY) || "null");
    } catch {
      virtue = null;
    }

    if (!virtue) return;

    const root = findSessionSection();
    if (!root) return;

    setSessionFields(virtue);

    let box = root.querySelector("#axisSelectedVirtueSessionBox");

    if (!box) {
      box = document.createElement("div");
      box.id = "axisSelectedVirtueSessionBox";
      box.className = "axis-selected-virtue-session-box";

      const firstCard = root.querySelector(".card, article, section, div");
      if (firstCard && firstCard !== root) {
        firstCard.prepend(box);
      } else {
        root.prepend(box);
      }
    }

    box.innerHTML = `
      <div class="axis-selected-virtue-kicker">Vertu ajoutée à la séance</div>
      <div class="axis-selected-virtue-content">
        ${virtue.image ? `<img src="${virtue.image}" alt="${escapeHtml(virtue.name)}">` : ""}
        <div>
          <h3>${escapeHtml(virtue.name)}</h3>
          <p>${escapeHtml(virtue.family || "Vertus")}</p>
          <p class="axis-selected-virtue-practice">${escapeHtml(virtue.practicePrompt || "")}</p>
          <div class="axis-selected-virtue-actions">
            <button type="button" id="axisClearSelectedVirtue">Retirer la vertu</button>
          </div>
        </div>
      </div>
    `;

    box.querySelector("#axisClearSelectedVirtue")?.addEventListener("click", () => {
      localStorage.removeItem(SELECTED_VIRTUE_KEY);
      localStorage.removeItem(PENDING_SESSION_KEY);
      localStorage.removeItem(SESSION_INTENTION_KEY);
      box.remove();
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showVirtueToast(message) {
    let toast = document.getElementById("axisVirtueToast");

    if (!toast) {
      toast = document.createElement("div");
      toast.id = "axisVirtueToast";
      toast.className = "axis-virtue-toast";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(showVirtueToast.timer);
    showVirtueToast.timer = setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function handleVirtueAction(button) {
    const label = normalize(button.textContent);

    if (label.includes("ajouter") && label.includes("seance")) {
      const virtue = saveVirtueForSession("add");
      showVirtueToast(`Vertu ajoutée à la séance : ${virtue.name}`);
      injectVirtueIntoSessionBuilder();
      return true;
    }

    if (label.includes("creer") && label.includes("seance") && label.includes("vertu")) {
      const virtue = saveVirtueForSession("create");
      showVirtueToast(`Séance Vertu préparée : ${virtue.name}`);
      goToSessionBuilder();
      return true;
    }

    return false;
  }

  function bindVirtueButtons() {
    const buttons = Array.from(document.querySelectorAll("button, a"));

    buttons.forEach((button) => {
      if (button.dataset.virtueBridgeBound === "true") return;

      const label = normalize(button.textContent);

      if (
        (label.includes("ajouter") && label.includes("seance")) ||
        (label.includes("creer") && label.includes("seance") && label.includes("vertu"))
      ) {
        button.dataset.virtueBridgeBound = "true";

        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          handleVirtueAction(button);
        }, true);
      }
    });
  }

  /* =====================================================
     LOUPE CARTE VERTU
     ===================================================== */

  function ensureMagnifierButton() {
    const img = getLoupeTargetImage();
    if (!img) return;

    const container =
      img.closest(".virtue-lightbox") ||
      img.closest("[class*='lightbox']") ||
      img.parentElement;

    if (!container) return;

    if (container.querySelector("#axisVirtueMagnifierToggle")) return;

    const btn = document.createElement("button");
    btn.id = "axisVirtueMagnifierToggle";
    btn.className = "axis-virtue-magnifier-toggle";
    btn.type = "button";
    btn.textContent = "Loupe";

    btn.addEventListener("click", () => {
      toggleMagnifier(img, btn);
    });

    container.appendChild(btn);
  }

  function getLoupeTargetImage() {
    const lightboxImages = Array.from(document.querySelectorAll(
      ".virtue-lightbox img, [class*='lightbox'] img, .is-open img, .fullscreen img"
    )).filter(visible);

    if (lightboxImages.length) return lightboxImages[0];

    const view = getVirtueView();
    return Array.from(view.querySelectorAll("img")).filter(visible)[0] || null;
  }

  function toggleMagnifier(img, btn) {
    const active = document.querySelector(".axis-virtue-magnifier-lens");

    if (active) {
      active.remove();
      img.removeEventListener("mousemove", moveMagnifier);
      img.removeEventListener("touchmove", moveMagnifier);
      img.removeEventListener("mouseleave", hideMagnifier);
      btn.textContent = "Loupe";
      return;
    }

    const lens = document.createElement("div");
    lens.className = "axis-virtue-magnifier-lens";
    lens.dataset.zoom = "3";
    document.body.appendChild(lens);

    img.dataset.magnifierActive = "true";
    img.dataset.magnifierSrc = img.currentSrc || img.src;
    btn.textContent = "Fermer la loupe";

    img.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier, { passive: false });
    img.addEventListener("mouseleave", hideMagnifier);
  }

  function moveMagnifier(event) {
    const img = event.currentTarget;
    const lens = document.querySelector(".axis-virtue-magnifier-lens");
    if (!lens) return;

    if (event.type === "touchmove") {
      event.preventDefault();
    }

    const point = event.touches ? event.touches[0] : event;
    const rect = img.getBoundingClientRect();

    const x = Math.max(0, Math.min(point.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(point.clientY - rect.top, rect.height));

    const zoom = Number(lens.dataset.zoom || 3);
    const lensSize = lens.offsetWidth || 220;

    lens.style.display = "block";
    lens.style.left = `${point.clientX + 24}px`;
    lens.style.top = `${point.clientY + 24}px`;
    lens.style.backgroundImage = `url("${img.dataset.magnifierSrc || img.currentSrc || img.src}")`;
    lens.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
    lens.style.backgroundPosition = `${-(x * zoom - lensSize / 2)}px ${-(y * zoom - lensSize / 2)}px`;
  }

  function hideMagnifier() {
    const lens = document.querySelector(".axis-virtue-magnifier-lens");
    if (lens) lens.style.display = "none";
  }

  function observeLightbox() {
    const observer = new MutationObserver(() => {
      bindVirtueButtons();
      ensureMagnifierButton();

      const bodyText = normalize(document.body?.innerText || "");

      if (
        bodyText.includes("carte vertu") ||
        bodyText.includes("agrandir") ||
        bodyText.includes("fermer")
      ) {
        ensureMagnifierButton();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });
  }

  function schedule() {
    setTimeout(bindVirtueButtons, 80);
    setTimeout(bindVirtueButtons, 300);
    setTimeout(ensureMagnifierButton, 300);
    setTimeout(ensureMagnifierButton, 900);
    setTimeout(injectVirtueIntoSessionBuilder, 600);
  }

  document.addEventListener("DOMContentLoaded", () => {
    schedule();
    observeLightbox();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const label = normalize([
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" "));

    if (label.includes("carte vertu") || label.includes("vertu")) {
      schedule();
    }

    if (
      label.includes("creer sa seance") ||
      label.includes("créer sa séance") ||
      label.includes("seance")
    ) {
      setTimeout(injectVirtueIntoSessionBuilder, 180);
      setTimeout(injectVirtueIntoSessionBuilder, 600);
    }

    if (label.includes("agrandir") || label.includes("plein ecran")) {
      setTimeout(ensureMagnifierButton, 150);
      setTimeout(ensureMagnifierButton, 500);
    }
  }, true);

  window.AXIS_VIRTUE_SESSION_BRIDGE = {
    getCurrentVirtue,
    saveVirtueForSession,
    injectVirtueIntoSessionBuilder,
    ensureMagnifierButton
  };

  schedule();
})();
