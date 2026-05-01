(function () {
  "use strict";

  const VERSION = "session-swing-filter-safe-20260430";

  const ALLOWED = [
    { value: "lateral", label: "Latéral" },
    { value: "vertical", label: "Vertical" },
    { value: "rotation", label: "Rotation" }
  ];

  const ALLOWED_VALUES = new Set(ALLOWED.map(item => item.value));

  function byId(id) {
    return document.getElementById(id);
  }

  function filterSessionSwing() {
    const select = byId("sessionSwing");
    if (!select) return;

    const previous = ALLOWED_VALUES.has(select.value) ? select.value : "lateral";

    const currentSignature = Array.from(select.options).map(opt => opt.value).join("|");
    const expectedSignature = ALLOWED.map(item => item.value).join("|");

    if (currentSignature !== expectedSignature) {
      select.innerHTML = "";

      ALLOWED.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.label;
        select.appendChild(opt);
      });
    }

    select.value = previous;
  }

  function bind() {
    filterSessionSwing();

    // L'application remplit parfois les selects après initialisation :
    // on repasse quelques fois sans toucher aux autres fonctions.
    let count = 0;
    const timer = setInterval(function () {
      filterSessionSwing();
      count++;
      if (count >= 12) clearInterval(timer);
    }, 400);

    document.addEventListener("change", function (event) {
      if (event.target && event.target.id === "sessionSwing") {
        filterSessionSwing();
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target && event.target.id === "sessionSwing") {
        filterSessionSwing();
      }
    });

    console.info("[AXIS LUMEN]", VERSION, "actif — sessionSwing limité à Latéral / Vertical / Rotation");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
