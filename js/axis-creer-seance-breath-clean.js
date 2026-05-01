(function () {
  "use strict";

  const BREATH_TYPES = [
    {
      value: "square",
      label: "Respiration carrée",
      shortLabel: "Carrée",
      detail: "Inspiration · rétention · expiration · rétention sur une mesure égale."
    },
    {
      value: "triangular",
      label: "Respiration triangulaire",
      shortLabel: "Triangulaire",
      detail: "Inspiration · rétention · expiration, sans seconde rétention."
    },
    {
      value: "rectangular",
      label: "Respiration rectangulaire",
      shortLabel: "Rectangulaire",
      detail: "Inspiration courte, rétentions plus longues, expiration courte."
    }
  ];

  const STORAGE_KEY = "axis_lumen_created_session_preferences";

  function normalize(text) {
    return String(text || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function optionExists(select, value) {
    return Array.from(select.options || []).some(option => option.value === value);
  }

  function detectCurrentValue(value) {
    const n = normalize(value);

    if (n.includes("triang")) return "triangular";
    if (n.includes("rectang")) return "rectangular";
    if (n.includes("carre") || n.includes("square")) return "square";

    if (["square", "triangular", "rectangular"].includes(value)) return value;

    return "square";
  }

  function fillBreathSelect(select) {
    if (!select) return;

    const current = detectCurrentValue(select.value || select.getAttribute("data-current") || "");

    select.innerHTML = "";

    BREATH_TYPES.forEach(type => {
      const option = document.createElement("option");
      option.value = type.value;
      option.textContent = type.label;
      option.dataset.shortLabel = type.shortLabel;
      option.dataset.detail = type.detail;
      select.appendChild(option);
    });

    select.value = optionExists(select, current) ? current : "square";
    select.setAttribute("data-axis-breath-enum", "true");
  }

  function findExistingBreathSelects() {
    const ids = [
      "sessionBreath",
      "breathType",
      "breathPattern",
      "sessionBreathType",
      "axis-session-breath-type",
      "customSessionBreath",
      "customBreathType",
      "createBreathType",
      "seanceBreathType",
      "seanceRespiration"
    ];

    const found = [];

    ids.forEach(id => {
      const el = byId(id);
      if (el && el.tagName === "SELECT") found.push(el);
    });

    document.querySelectorAll("select").forEach(select => {
      if (found.includes(select)) return;

      const label = select.closest("label, .stacked, .field, .form-group, .axis-field, .session-field");
      const text = normalize(label ? label.textContent : select.id + " " + select.name);

      const isBreath =
        text.includes("respiration") &&
        !text.includes("audio") &&
        !text.includes("support") &&
        !text.includes("musical") &&
        !text.includes("piste");

      if (isBreath) found.push(select);
    });

    return found;
  }

  function createBreathField() {
    const field = document.createElement("label");
    field.className = "axis-breath-enum-field stacked";
    field.innerHTML = `
      <span>Type de respiration</span>
      <select id="axis-session-breath-type" name="breathType"></select>
      <div class="axis-breath-clean-note" id="axisBreathEnumNote">
        Respiration carrée sélectionnée.
      </div>
    `;

    const anchors = Array.from(document.querySelectorAll("label, .stacked, .field, .form-group, .axis-field, .session-field"));

    const breathAnchor = anchors.find(el => {
      const text = normalize(el.textContent);
      return text.includes("respiration") &&
        !text.includes("audio") &&
        !text.includes("support") &&
        !text.includes("musical") &&
        !text.includes("piste");
    });

    if (breathAnchor && breathAnchor.parentNode) {
      breathAnchor.parentNode.insertBefore(field, breathAnchor.nextSibling);
      return field.querySelector("select");
    }

    const fallback =
      document.querySelector("#session .compact-grid") ||
      document.querySelector(".compact-grid") ||
      document.querySelector("form") ||
      document.querySelector(".card") ||
      document.body;

    fallback.appendChild(field);
    return field.querySelector("select");
  }

  function getMainBreathSelect() {
    const selects = findExistingBreathSelects();

    if (selects.length) {
      selects.forEach(fillBreathSelect);
      return selects[0];
    }

    const created = createBreathField();
    fillBreathSelect(created);
    return created;
  }

  function getBreathLabel(value) {
    const type = BREATH_TYPES.find(item => item.value === value) || BREATH_TYPES[0];
    return type.label;
  }

  function getBreathDetail(value) {
    const type = BREATH_TYPES.find(item => item.value === value) || BREATH_TYPES[0];
    return type.detail;
  }

  function updateBreathNote(select) {
    const value = select ? select.value : "square";
    const note =
      byId("axisBreathEnumNote") ||
      document.querySelector(".axis-breath-clean-note");

    if (note) {
      note.textContent = getBreathLabel(value) + " — " + getBreathDetail(value);
    }
  }

  function persistBreathChoice(select) {
    if (!select) return;

    const value = select.value || "square";

    const payload = {
      breathType: value,
      breathLabel: getBreathLabel(value),
      breathDetail: getBreathDetail(value),
      updatedAt: new Date().toISOString()
    };

    try {
      const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.assign({}, previous, payload)));
      localStorage.setItem("axis_lumen_session_breath_type", value);
      localStorage.setItem("axis_lumen_session_breath_label", payload.breathLabel);
    } catch (_) {
      localStorage.setItem("axis_lumen_session_breath_type", value);
      localStorage.setItem("axis_lumen_session_breath_label", payload.breathLabel);
    }

    window.AXIS_SESSION_BREATH_TYPE = value;
    window.AXIS_SESSION_BREATH_LABEL = payload.breathLabel;
  }

  function killVerbosePreview() {
    const candidates = Array.from(document.querySelectorAll(
      "article, section, .card, .panel, .preview, .session-preview, .phase-list, [id*='preview'], [class*='preview']"
    ));

    candidates.forEach(node => {
      const text = normalize(node.textContent);

      const isTheBadPreview =
        (
          text.includes("apercu video") ||
          text.includes("apercu des phases")
        ) &&
        (
          text.includes("detente initiale") ||
          text.includes("observation lumineuse") ||
          text.includes("balancement lateral") ||
          text.includes("cycle 1/") ||
          text.includes("cycle de trois minutes")
        );

      const isPhaseList =
        text.includes("detente initiale") &&
        text.includes("observation lumineuse") &&
        text.includes("balancement") &&
        text.includes("cycle");

      if (isTheBadPreview || isPhaseList) {
        node.classList.add("axis-session-preview-killed");
        node.setAttribute("aria-hidden", "true");
      }
    });

    Array.from(document.querySelectorAll("h1,h2,h3,h4,strong,div,span")).forEach(node => {
      const text = normalize(node.textContent);

      if (text === "apercu video" || text === "aperçu vidéo") {
        const card = node.closest(".card, article, section, .panel");

        if (card) {
          const cardText = normalize(card.textContent);
          const inputCount = card.querySelectorAll("input, select, textarea, button").length;

          if (
            cardText.includes("detente initiale") ||
            cardText.includes("observation lumineuse") ||
            cardText.includes("balancement")
          ) {
            if (inputCount <= 3) {
              card.classList.add("axis-session-preview-killed");
              card.setAttribute("aria-hidden", "true");
            } else {
              node.classList.add("axis-session-preview-killed");

              let sibling = node.nextElementSibling;
              while (sibling) {
                const siblingText = normalize(sibling.textContent);
                if (
                  siblingText.includes("detente initiale") ||
                  siblingText.includes("observation lumineuse") ||
                  siblingText.includes("balancement") ||
                  siblingText.includes("cycle de trois minutes")
                ) {
                  sibling.classList.add("axis-session-preview-killed");
                  sibling.setAttribute("aria-hidden", "true");
                }
                sibling = sibling.nextElementSibling;
              }
            }
          }
        }
      }
    });
  }

  function bind(select) {
    if (!select || select.dataset.axisBreathBound === "true") return;

    select.dataset.axisBreathBound = "true";

    select.addEventListener("change", () => {
      updateBreathNote(select);
      persistBreathChoice(select);
    });

    select.addEventListener("input", () => {
      updateBreathNote(select);
      persistBreathChoice(select);
    });

    document.addEventListener("click", event => {
      const button = event.target.closest("button, a");
      if (!button) return;

      const text = normalize(button.textContent);

      if (
        text.includes("generer") ||
        text.includes("générer") ||
        text.includes("lancer") ||
        text.includes("pratiquer") ||
        text.includes("preparer") ||
        text.includes("préparer")
      ) {
        persistBreathChoice(select);
      }
    }, true);
  }

  function init() {
    const select = getMainBreathSelect();

    updateBreathNote(select);
    persistBreathChoice(select);
    bind(select);
    killVerbosePreview();

    const observer = new MutationObserver(() => {
      const nextSelect = getMainBreathSelect();
      updateBreathNote(nextSelect);
      bind(nextSelect);
      killVerbosePreview();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();