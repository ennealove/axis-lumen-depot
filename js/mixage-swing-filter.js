(function () {
  "use strict";

  const VERSION = "mixage-swing-filter-safe-20260430";

  const ALLOWED = [
    { value: "lateral", label: "Latéral", mantra: "ILLI", rhythm: "2 secondes" },
    { value: "vertical", label: "Vertical", mantra: "ALLA", rhythm: "2 secondes" },
    { value: "rotation", label: "Rotation", mantra: "RORO", rhythm: "3 secondes" }
  ];

  const ALLOWED_VALUES = new Set(ALLOWED.map(item => item.value));

  function byId(id) {
    return document.getElementById(id);
  }

  function getAllowed(value) {
    return ALLOWED.find(item => item.value === value) || ALLOWED[0];
  }

  function filterMixageSwing() {
    const select = byId("mixageSwing");
    if (!select) return;

    const previous = ALLOWED_VALUES.has(select.value) ? select.value : "lateral";

    const currentSignature = Array.from(select.options).map(opt => opt.value).join("|");
    const expectedSignature = ALLOWED.map(item => item.value).join("|");

    let changed = false;

    if (currentSignature !== expectedSignature) {
      select.innerHTML = "";

      ALLOWED.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.label;
        select.appendChild(opt);
      });

      changed = true;
    }

    if (select.value !== previous) {
      select.value = previous;
      changed = true;
    }

    updateMixageLabels(previous);

    if (changed) {
      select.dispatchEvent(new Event("input", { bubbles: true }));
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  function updateMixageLabels(value) {
    const item = getAllowed(value);

    const mantra = byId("mixageMantra");
    const rhythm = byId("mixageRhythm");
    const summary = byId("mixageSummary");

    if (mantra) mantra.textContent = item.mantra;
    if (rhythm) rhythm.textContent = item.rhythm;

    if (summary && summary.dataset.swingFilterTouched !== "1") {
      summary.dataset.swingFilterTouched = "1";
    }
  }

  function bind() {
    filterMixageSwing();

    let count = 0;
    const timer = setInterval(function () {
      filterMixageSwing();
      count++;
      if (count >= 12) clearInterval(timer);
    }, 400);

    document.addEventListener("change", function (event) {
      if (event.target && event.target.id === "mixageSwing") {
        filterMixageSwing();
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target && event.target.id === "mixageSwing") {
        filterMixageSwing();
      }
    });

    console.info("[AXIS LUMEN]", VERSION, "actif — mixageSwing limité à Latéral / Vertical / Rotation");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
