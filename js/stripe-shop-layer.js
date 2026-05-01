(function () {
  function money(value, currency) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency || "EUR"
    }).format(value);
  }

  function getProducts() {
    return Array.isArray(window.AXIS_STRIPE_PRODUCTS) ? window.AXIS_STRIPE_PRODUCTS : [];
  }

  function isConfiguredPaymentLink(link) {
    return typeof link === "string" && link.trim().startsWith("https://");
  }

  function isConfiguredPriceId(priceId) {
    return typeof priceId === "string" && priceId.trim().startsWith("price_");
  }

  function showPaymentModal(product) {
    let modal = document.querySelector(".payment-modal");

    if (!modal) {
      modal = document.createElement("div");
      modal.className = "payment-modal";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="payment-modal-card">
        <div class="kicker">Connexion Stripe requise</div>
        <h3>${product.title}</h3>
        <p>Ce bouton est prêt, mais il faut encore coller le lien Stripe Payment Link dans :</p>
        <input readonly value="js/stripe-products.js → ${product.id} → paymentLink">
        <p>Ou connecter un backend Stripe Checkout Session avec le price_id :</p>
        <input readonly value="${product.stripePriceId || "price_..."}">
        <div class="actions">
          <button class="btn primary" data-close-payment-modal>Compris</button>
        </div>
      </div>
    `;

    modal.classList.add("active");

    modal.querySelector("[data-close-payment-modal]").addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  async function startPayment(product) {
    localStorage.setItem("axis_lumen_selected_product", JSON.stringify(product));

    if (isConfiguredPaymentLink(product.paymentLink)) {
      window.location.href = product.paymentLink;
      return;
    }

    if (isConfiguredPriceId(product.stripePriceId)) {
      try {
        const response = await fetch("/api/stripe/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            priceId: product.stripePriceId,
            successUrl: window.location.origin + "/success.html",
            cancelUrl: window.location.origin + "/cancel.html"
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
            return;
          }
        }
      } catch (error) {
        console.warn("Backend Stripe indisponible, fallback modal.", error);
      }
    }

    showPaymentModal(product);
  }

  function renderShop() {
    const root = document.querySelector("#axis-shop-products");
    if (!root) return;

    const products = getProducts();

    root.className = "shop-products-rich";

    root.innerHTML = products.map(product => `
      <article class="shop-product-rich">
        <div class="shop-product-cover">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="shop-product-body">
          <div class="kicker">${product.badge || "Produit"}</div>
          <h3>${product.title}</h3>
          <div class="shop-product-subtitle">${product.subtitle || ""}</div>
          <p class="shop-product-description">${product.description || ""}</p>
          <div class="shop-product-price">${money(product.price, product.currency)}</div>
          <div class="tags">
            <span class="tag">${product.currency || "EUR"}</span>
            <span class="tag">${product.badge || "Axis Lumen"}</span>
          </div>
          <div class="shop-product-actions">
            <button class="btn primary payment-button" data-axis-pay="${product.id}">Payer avec Stripe</button>
            <button class="btn payment-button" data-axis-details="${product.id}">Détails</button>
          </div>
        </div>
      </article>
    `).join("");

    root.querySelectorAll("[data-axis-pay]").forEach(button => {
      button.addEventListener("click", () => {
        const product = products.find(item => item.id === button.getAttribute("data-axis-pay"));
        if (product) startPayment(product);
      });
    });

    root.querySelectorAll("[data-axis-details]").forEach(button => {
      button.addEventListener("click", () => {
        const product = products.find(item => item.id === button.getAttribute("data-axis-details"));
        if (product) {
          alert(product.title + "\n\n" + product.description + "\n\nPrix : " + money(product.price, product.currency));
        }
      });
    });
  }

  function renderSubscriptionProduct() {
    const target = document.querySelector("[data-subscription-payment]");
    if (!target) return;

    const product = getProducts().find(item => item.id === "abonnement-axis-lumen");
    if (!product) return;

    target.innerHTML = `
      <article class="shop-product-rich">
        <div class="shop-product-cover">
          <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="shop-product-body">
          <div class="kicker">${product.badge}</div>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="shop-product-price">${money(product.price, product.currency)}</div>
          <button class="btn primary payment-button" data-axis-subscribe>Activer l’abonnement Stripe</button>
        </div>
      </article>
    `;

    target.querySelector("[data-axis-subscribe]").addEventListener("click", () => startPayment(product));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderShop();
    renderSubscriptionProduct();
  });
})();