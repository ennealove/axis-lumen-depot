(function () {
  const API_BASE = window.AXIS_API_BASE || "http://127.0.0.1:8787";
  const REF_STORAGE_KEY = "axis_referral_code";
  const LAST_PRODUCT_KEY = "axis_last_checkout_product";
  const PRODUCTS = window.AXIS_STRIPE_PRODUCTS || {};

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function cleanCode(value) {
    return String(value || "")
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, "")
      .slice(0, 64);
  }

  function incomingReferralCode() {
    return cleanCode(
      getParam("ref") ||
      getParam("parrain") ||
      getParam("code") ||
      getParam("referralCode") ||
      getParam("referral_code")
    );
  }

  function saveIncomingReferral() {
    const code = incomingReferralCode();
    if (!code) return;

    localStorage.setItem(REF_STORAGE_KEY, code);
    localStorage.setItem("axis_incoming_referral_code", code);
    document.documentElement.setAttribute("data-axis-referral-code", code);
  }

  function getStoredReferralCode() {
    return cleanCode(
      localStorage.getItem(REF_STORAGE_KEY) ||
      localStorage.getItem("axis_incoming_referral_code") ||
      localStorage.getItem("axis_referral") ||
      ""
    );
  }

  function getAuthToken() {
    return (
      localStorage.getItem("axis_token") ||
      localStorage.getItem("axis_auth_token") ||
      localStorage.getItem("axis_access_token") ||
      ""
    );
  }

  function addReferralToForms() {
    const code = getStoredReferralCode();
    if (!code) return;

    document.querySelectorAll("form").forEach(function (form) {
      const text = normalize(form.textContent + " " + form.id + " " + form.className);

      const looksLikeSignup =
        text.includes("inscription") ||
        text.includes("creer") ||
        text.includes("compte") ||
        text.includes("register") ||
        text.includes("signup");

      if (!looksLikeSignup) return;

      let input = form.querySelector("input[name='referralCode']");

      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "referralCode";
        form.appendChild(input);
      }

      input.value = code;
    });
  }

  function productFromElement(el) {
    const ds = el.dataset || {};
    const raw =
      ds.productId ||
      ds.stripeProduct ||
      ds.axisProduct ||
      ds.axisBuyPlan ||
      ds.plan ||
      "";

    if (raw && PRODUCTS[raw]) return PRODUCTS[raw];

    if (raw === "monthly" || raw === "mensuel") return PRODUCTS.subscription_monthly;
    if (raw === "yearly" || raw === "annual" || raw === "annuel") return PRODUCTS.subscription_yearly;

    const txt = normalize(
      el.textContent + " " +
      (el.getAttribute("href") || "") + " " +
      (el.getAttribute("aria-label") || "")
    );

    if (txt.includes("190") || txt.includes("annuel") || txt.includes("an")) {
      return PRODUCTS.subscription_yearly;
    }

    if (txt.includes("19") || txt.includes("mensuel") || txt.includes("mois")) {
      return PRODUCTS.subscription_monthly;
    }

    if (txt.includes("pack") || txt.includes("collection complete") || txt.includes("4 livres")) {
      return PRODUCTS.pack_complet;
    }

    if (txt.includes("je suis") || txt.includes("temple vivant")) {
      return PRODUCTS.book_je_suis;
    }

    if (txt.includes("vertus")) {
      return PRODUCTS.book_vertus;
    }

    if (txt.includes("alimentation") || txt.includes("terrain")) {
      return PRODUCTS.book_alimentation;
    }

    if (txt.includes("exercices")) {
      return PRODUCTS.book_exercices;
    }

    return null;
  }

  function shouldHandleButton(el) {
    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    if (tag !== "a" && tag !== "button") return false;

    const txt = normalize(el.textContent + " " + (el.getAttribute("aria-label") || ""));

    const actionText =
      txt.includes("acheter") ||
      txt.includes("commander") ||
      txt.includes("s abonner") ||
      txt.includes("abonner") ||
      txt.includes("choisir") ||
      txt.includes("checkout") ||
      txt.includes("paiement");

    const hasProduct =
      el.dataset.productId ||
      el.dataset.stripeProduct ||
      el.dataset.axisProduct ||
      el.dataset.axisBuyPlan ||
      productFromElement(el);

    return Boolean(actionText && hasProduct);
  }

  async function createCheckout(product, sourceEl) {
    if (!product) return;

    const referralCode = getStoredReferralCode();
    const token = getAuthToken();

    localStorage.setItem(LAST_PRODUCT_KEY, product.id);

    const payload = {
      productId: product.id,
      priceId: product.priceId || "",
      mode: product.mode || "payment",
      plan: product.plan || "",
      referralCode: referralCode || "",
      commissionable: product.commissionable !== false,
      commissionRate: product.commissionRate || 0.20,
      successUrl: window.location.origin + "/success.html?checkout=success",
      cancelUrl: window.location.origin + "/cancel.html?checkout=cancel",
      clientReferenceId: referralCode || ""
    };

    const headers = {
      "Content-Type": "application/json"
    };

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    try {
      const response = await fetch(API_BASE + "/api/stripe/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Backend Checkout indisponible : HTTP " + response.status);
      }

      const data = await response.json();
      const checkoutUrl = data.url || data.checkoutUrl || data.sessionUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }

      throw new Error("Aucune URL Checkout reçue.");
    } catch (error) {
      console.warn("Checkout backend non disponible, tentative Payment Link :", error);

      if (product.paymentLink) {
        window.location.href = product.paymentLink;
        return;
      }

      alert(
        "Le paiement Stripe n’est pas encore configuré pour : " +
        (product.label || product.id) +
        ".\n\nAjoute le price_id ou le Payment Link dans js/stripe-products.js."
      );
    }
  }

  function bindCheckoutButtons() {
    document.querySelectorAll("a, button").forEach(function (el) {
      if (el.dataset.axisStripeBound === "1") return;
      if (!shouldHandleButton(el)) return;

      const product = productFromElement(el);
      if (!product) return;

      el.dataset.axisStripeBound = "1";
      el.dataset.axisStripeProductResolved = product.id;

      el.addEventListener("click", function (event) {
        const href = el.getAttribute("href") || "";

        if (href && href.startsWith("http") && !href.includes("stripe")) {
          return;
        }

        event.preventDefault();
        createCheckout(product, el);
      });
    });
  }

  function decorateReferralLinks() {
    const code = getStoredReferralCode();
    if (!code) return;

    document.querySelectorAll("[data-referral-link], #axisReferralLink, #axisReferralLinkV2, #axisSafeReferralLink").forEach(function (el) {
      const url = window.location.origin + "/abonnement.html?ref=" + encodeURIComponent(code);

      if (el.tagName && el.tagName.toLowerCase() === "input") {
        el.value = url;
      } else {
        el.textContent = url;
      }
    });
  }

  function hidePublicCommissionInputs() {
    document.querySelectorAll("label, p, span, div").forEach(function (el) {
      const txt = normalize(el.textContent);

      if (!txt.includes("taux de commission")) return;

      const block =
        el.closest(".field") ||
        el.closest(".form-field") ||
        el.closest(".form-group") ||
        el.closest(".card") ||
        el.closest("label") ||
        el;

      block.setAttribute("data-axis-hide-public-commission", "true");
    });

    document.querySelectorAll("input, select").forEach(function (el) {
      const name = normalize(el.name + " " + el.id + " " + el.getAttribute("aria-label"));

      if (
        name.includes("commission") ||
        name.includes("commission rate") ||
        name.includes("taux commission")
      ) {
        const block =
          el.closest(".field") ||
          el.closest(".form-field") ||
          el.closest(".form-group") ||
          el.closest("label") ||
          el.parentElement ||
          el;

        block.setAttribute("data-axis-hide-public-commission", "true");
      }
    });
  }

  function init() {
    saveIncomingReferral();
    addReferralToForms();
    decorateReferralLinks();
    hidePublicCommissionInputs();
    bindCheckoutButtons();

    setTimeout(addReferralToForms, 600);
    setTimeout(decorateReferralLinks, 600);
    setTimeout(hidePublicCommissionInputs, 600);
    setTimeout(bindCheckoutButtons, 600);
    setTimeout(bindCheckoutButtons, 1600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  const observer = new MutationObserver(function () {
    addReferralToForms();
    decorateReferralLinks();
    hidePublicCommissionInputs();
    bindCheckoutButtons();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();