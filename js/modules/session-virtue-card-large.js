
(() => {
  const HOST_ID = "axisSessionVirtueLarge";
  const STORAGE_KEYS = [
    "axis_selected_virtue",
    "axis_current_virtue",
    "axis_virtue_selected",
    "axis_last_virtue",
    "axis_last_drawn_virtue",
    "axis_virtue_of_day",
    "selectedVirtue",
    "currentVirtue"
  ];

  function safeJson(value) {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  function getStoredVirtue() {
    for (const key of STORAGE_KEYS) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      const parsed = safeJson(raw);

      if (parsed && typeof parsed === "object") {
        return normalizeVirtue(parsed);
      }

      if (typeof raw === "string" && raw.trim()) {
        return normalizeVirtue({ name: raw.trim() });
      }
    }

    return null;
  }

  function normalizeVirtue(data) {
    const image =
      data.image ||
      data.cardImage ||
      data.imagePath ||
      data.src ||
      data.path ||
      data.url ||
      "";

    const id = data.id || data.number || data.numero || "";
    const name = data.name || data.title || data.virtue || data.nom || "Vertu sélectionnée";

    return {
      id,
      number: data.number || data.numero || id || "",
      name,
      family: data.family || data.famille || data.group || "",
      intention: data.intention || data.phrase || data.summary || "",
      practicePrompt: data.practicePrompt || data.practice || data.prompt || "",
      image
    };
  }

  function getImageFromExistingSession() {
    const session = document.querySelector("#session");
    if (!session) return "";

    const img = session.querySelector(
      'img[src*="virtues"], img[src*="IMAGE%20VERTUS"], img[src*="IMAGE VERTUS"], img[src*="carte"], img[src*="vertu"]'
    );

    return img ? img.getAttribute("src") : "";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function buildFallbackImage(number, name) {
    return `
      <div class="axis-session-virtue-empty">
        <div style="font-size:3rem;margin-bottom:12px;">✦</div>
        <strong>${escapeHtml(number ? "Carte " + number : "Carte Vertu")}</strong>
        <div>${escapeHtml(name || "Vertu sélectionnée")}</div>
        <small>Image non détectée. Le texte de la vertu reste utilisable comme intention de séance.</small>
      </div>
    `;
  }

  function findInsertionPoint() {
    const session = document.querySelector("#session");
    if (!session) return null;

    const rightCard = session.querySelector(".grid.two-col > article.card:nth-child(2)");
    if (rightCard) return { parent: rightCard, mode: "prepend" };

    const firstCard = session.querySelector("article.card");
    if (firstCard) return { parent: firstCard, mode: "append" };

    return { parent: session, mode: "append" };
  }

  function renderLargeVirtueCard() {
    const session = document.querySelector("#session");
    if (!session) return false;

    const stored = getStoredVirtue();
    const existingImage = getImageFromExistingSession();

    if (!stored && !existingImage) {
      const previous = document.getElementById(HOST_ID);
      if (previous) previous.remove();
      return false;
    }

    const virtue = stored || normalizeVirtue({});
    const image = virtue.image || existingImage || "";

    let host = document.getElementById(HOST_ID);

    if (!host) {
      host = document.createElement("section");
      host.id = HOST_ID;
      host.className = "axis-session-virtue-large";

      const target = findInsertionPoint();
      if (!target) return false;

      if (target.mode === "prepend") {
        target.parent.prepend(host);
      } else {
        target.parent.appendChild(host);
      }
    }

    const numberLabel = virtue.number ? `Carte ${escapeHtml(virtue.number)}` : "Carte Vertu";
    const title = escapeHtml(virtue.name || "Vertu sélectionnée");

    host.innerHTML = `
      <div class="axis-session-virtue-kicker">Vertu associée à la séance</div>
      <h3>${numberLabel} — ${title}</h3>
      <p>
        Cette carte devient l’intention intérieure de la séance. Elle sert de support
        de contemplation avant la pratique, puis d’axe discret pendant le travail.
      </p>

      <div class="axis-session-virtue-layout">
        <div class="axis-session-virtue-image-wrap">
          ${
            image
              ? `<img class="axis-session-virtue-image" src="${escapeHtml(image)}" alt="${title}" loading="lazy">`
              : buildFallbackImage(virtue.number, virtue.name)
          }
        </div>

        <div class="axis-session-virtue-meta">
          <div class="axis-session-virtue-mini-grid">
            <div class="axis-session-virtue-chip">
              <span>Famille</span>
              <strong>${escapeHtml(virtue.family || "À compléter")}</strong>
            </div>

            <div class="axis-session-virtue-chip">
              <span>Intention</span>
              ${escapeHtml(virtue.intention || "Garder cette qualité comme axe intérieur pendant la séance.")}
            </div>

            <div class="axis-session-virtue-chip">
              <span>Exercice proposé</span>
              ${escapeHtml(virtue.practicePrompt || "Lire la carte, observer une lumière douce 20 à 30 secondes, fermer les yeux, puis laisser la vertu accompagner la rémanence pendant 2 à 3 minutes.")}
            </div>
          </div>

          <div class="axis-session-virtue-actions">
            <button type="button" id="axisSessionVirtueOpen">Voir la carte en grand</button>
            <button type="button" class="secondary" id="axisSessionVirtueRefresh">Rafraîchir l’encart</button>
          </div>
        </div>
      </div>
    `;

    const openBtn = host.querySelector("#axisSessionVirtueOpen");
    const refreshBtn = host.querySelector("#axisSessionVirtueRefresh");
    const img = host.querySelector(".axis-session-virtue-image");

    if (openBtn && img) {
      openBtn.addEventListener("click", () => {
        const lightbox = document.querySelector("#virtueLightbox, .virtue-lightbox, .axis-virtue-lightbox");

        if (lightbox) {
          lightbox.classList.add("is-open");
          lightbox.classList.remove("hidden", "is-hidden");
          const lightboxImg = lightbox.querySelector("img");
          if (lightboxImg) lightboxImg.src = img.src;
          return;
        }

        window.open(img.src, "_blank", "noopener,noreferrer");
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        renderLargeVirtueCard();
      });
    }

    return true;
  }

  function enlargeExistingMiniatures() {
    const session = document.querySelector("#session");
    if (!session) return;

    session
      .querySelectorAll('img[src*="virtues"], img[src*="IMAGE%20VERTUS"], img[src*="IMAGE VERTUS"], img[src*="carte"], img[src*="vertu"]')
      .forEach((img) => {
        img.classList.add("axis-session-virtue-image");
        img.style.width = "min(100%, 330px)";
        img.style.maxWidth = "330px";
        img.style.height = "auto";
        img.style.objectFit = "contain";
      });
  }

  function scheduleRender() {
    setTimeout(() => {
      renderLargeVirtueCard();
      enlargeExistingMiniatures();
    }, 120);

    setTimeout(() => {
      renderLargeVirtueCard();
      enlargeExistingMiniatures();
    }, 600);
  }

  document.addEventListener("DOMContentLoaded", scheduleRender);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-target], button, a");
    if (!trigger) return;

    const text = [
      trigger.dataset?.view || "",
      trigger.dataset?.target || "",
      trigger.textContent || "",
      trigger.getAttribute("href") || ""
    ].join(" ").toLowerCase();

    if (
      text.includes("session") ||
      text.includes("séance") ||
      text.includes("seance") ||
      text.includes("créer") ||
      text.includes("creer")
    ) {
      scheduleRender();
    }
  }, true);

  window.addEventListener("storage", scheduleRender);

  const observer = new MutationObserver(() => {
    const session = document.querySelector("#session");
    if (!session) return;

    if (session.classList.contains("active") || document.getElementById(HOST_ID)) {
      enlargeExistingMiniatures();

      if (!document.getElementById(HOST_ID)) {
        renderLargeVirtueCard();
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_SESSION_VIRTUE_CARD = {
    refresh: renderLargeVirtueCard
  };
})();
