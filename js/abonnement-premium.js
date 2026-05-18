(function () {
  function getProducts() {
    return (window.AXIS_STRIPE_PRODUCTS && window.AXIS_STRIPE_PRODUCTS.subscription)
      ? window.AXIS_STRIPE_PRODUCTS.subscription
      : {};
  }

  function getPaymentLink(plan) {
    const products = getProducts();

    if (plan === "lifetime") {
      return products.paymentLinkLifetime || "";
    }

    if (plan === "lifetime-4x") {
      return products.paymentLinkLifetime4x || "";
    }

    // Legacy fallbacks
    if (plan === "annual") {
      return products.paymentLinkAnnual || "";
    }

    return products.paymentLinkMonthly || products.paymentLink || "";
  }

  function bindSubscribeButtons() {
    document.querySelectorAll("[data-subscribe]").forEach(function (button) {
      button.addEventListener("click", function () {
        const plan = button.getAttribute("data-plan") || "monthly";
        const link = getPaymentLink(plan);

        if (link) {
          window.location.href = link;
          return;
        }

        const fieldMap = {
          "lifetime":    "subscription.paymentLinkLifetime",
          "lifetime-4x": "subscription.paymentLinkLifetime4x",
          "annual":      "subscription.paymentLinkAnnual",
          "monthly":     "subscription.paymentLinkMonthly"
        };
        const field = fieldMap[plan] || "subscription.paymentLinkLifetime";

        alert(
          "Lien Stripe à compléter.\n\nAjoute ton Payment Link Stripe dans :\njs/stripe-products.js\n\nChamp : " + field
        );
      });
    });
  }

  function bindScrollButtons() {
    document.querySelectorAll("[data-scroll-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        const target = document.querySelector(button.getAttribute("data-scroll-target"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindSubscribeButtons();
      bindScrollButtons();
    });
  } else {
    bindSubscribeButtons();
    bindScrollButtons();
  }
})();