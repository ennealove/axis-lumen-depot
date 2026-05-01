(function () {
  "use strict";

  const VERSION = "keep-three-balancements-safe-20260430";

  const ALLOWED = [
    { value: "lateral", label: "Latéral", mantra: "ILLI", rhythm: "2 secondes" },
    { value: "vertical", label: "Vertical", mantra: "ALLA", rhythm: "2 secondes" },
    { value: "rotation", label: "Rotation", mantra: "RORO", rhythm: "3 secondes" }
  ];

  const ALLOWED_VALUES = new Set(ALLOWED.map((item) => item.value));

  function byId(id) {
    return document.getElementById(id);
  }

  function optionSignature(select) {
    return Array.from(select.options).map((opt) => opt.value).join("|");
  }

  function rebuildSelect(select) {
    if (!select) return false;

    const previous = ALLOWED_VALUES.has(select.value) ? select.value : "lateral";
    const expected = ALLOWED.map((item) => item.value).join("|");

    if (optionSignature(select) === expected && select.value === previous) {
      return false;
    }

    select.innerHTML = "";

    ALLOWED.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.label;
      select.appendChild(opt);
    });

    select.value = previous;

    return true;
  }

  function getCurrentSwing() {
    const select = byId("mixageSwing") || byId("sessionSwing");
    const value = select && ALLOWED_VALUES.has(select.value) ? select.value : "lateral";
    return ALLOWED.find((item) => item.value === value) || ALLOWED[0];
  }

  function updateLabels() {
    const current = getCurrentSwing();

    const mantra = byId("mixageMantra");
    const rhythm = byId("mixageRhythm");
    const summary = byId("mixageSummary");

    if (mantra) mantra.textContent = current.mantra;
    if (rhythm) rhythm.textContent = current.rhythm;

    if (summary) {
      summary.innerHTML =
        "<strong>Balancement conservé :</strong> " +
        current.label +
        " · mantra <strong>" +
        current.mantra +
        "</strong> · rythme <strong>" +
        current.rhythm +
        "</strong>. Les autres formes ont été retirées pour stabiliser l’expérience.";
    }
  }

  function cleanBalancements() {
    const selects = [byId("mixageSwing"), byId("sessionSwing")].filter(Boolean);
    let changed = false;

    selects.forEach((select) => {
      if (rebuildSelect(select)) changed = true;
    });

    updateLabels();

    if (changed) {
      selects.forEach((select) => {
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
  }

  function bind() {
    document.addEventListener("change", function (event) {
      if (!event.target) return;
      if (event.target.id === "mixageSwing" || event.target.id === "sessionSwing") {
        cleanBalancements();
      }
    });

    document.addEventListener("input", function (event) {
      if (!event.target) return;
      if (event.target.id === "mixageSwing" || event.target.id === "sessionSwing") {
        cleanBalancements();
      }
    });

    const observer = new MutationObserver(function () {
      cleanBalancements();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    cleanBalancements();

    let count = 0;
    const timer = setInterval(function () {
      cleanBalancements();
      count++;
      if (count > 12) clearInterval(timer);
    }, 500);

    console.info("[AXIS LUMEN]", VERSION, "actif");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
