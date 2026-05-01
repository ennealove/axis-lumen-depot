(function () {
  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function hideCommissionRatePublicField() {
    if (!/parrainage\.html$/i.test(window.location.pathname)) return;

    const candidates = Array.from(document.querySelectorAll("label, .axis-field, .field, .form-group, div, p"));

    candidates.forEach(function (el) {
      const txt = normalize(el.textContent);

      if (
        txt.includes("taux de commission") ||
        txt.includes("commission %") ||
        txt.includes("commission percent")
      ) {
        const host = el.closest(".axis-field, .field, .form-group, article, .card, div") || el;
        host.classList.add("axis-public-hidden");
      }
    });

    document.querySelectorAll("input").forEach(function (input) {
      const label = input.closest("label, .axis-field, .field, .form-group, div");
      const txt = normalize(label ? label.textContent : "");

      if (txt.includes("taux de commission") || txt.includes("commission %")) {
        const host = input.closest(".axis-field, .field, .form-group, article, .card, div") || input;
        host.classList.add("axis-public-hidden");
      }
    });
  }

  function init() {
    hideCommissionRatePublicField();
    setTimeout(hideCommissionRatePublicField, 500);
    setTimeout(hideCommissionRatePublicField, 1500);
    setTimeout(hideCommissionRatePublicField, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();