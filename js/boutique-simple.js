(function () {
  function initDetails() {
    const buttons = document.querySelectorAll("[data-toggle-details]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-toggle-details");
        const block = document.getElementById(targetId);
        if (!block) return;
        block.classList.toggle("open");
      });
    });
  }

  function initBuyButtons() {
    const buttons = document.querySelectorAll("[data-buy-product]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const name = button.getAttribute("data-buy-product") || "produit";
        alert("Bouton Acheter prêt pour : " + name + "\n\nRelie ensuite ce bouton à un Payment Link Stripe ou à ton futur Checkout.");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initDetails();
      initBuyButtons();
    });
  } else {
    initDetails();
    initBuyButtons();
  }
})();