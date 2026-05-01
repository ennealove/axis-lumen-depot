(() => {
  const STORAGE_KEYS = {
    ownCode: "axis_referral_own_code",
    incomingCode: "axis_referral_incoming_code",
    incomingSavedAt: "axis_referral_incoming_saved_at"
  };

  const REFERRAL_CONFIG = {
    enabled: true,
    referralCookieDays: 60,
    rewardTrigger: "active_subscription",
    referrerReward: {
      type: "monthly_subscription_discount",
      label: "1 € de réduction mensuelle par abonné actif",
      amount: 1,
      currency: "EUR",
      perActiveSubscriber: true
    },
    referredUserReward: {
      type: "first_month_percent_discount",
      label: "30 % sur le premier mois",
      percent: 30
    },
    maxMonthlyDiscount: "subscription_price",
    allowCashPayout: false,
    allowSelfReferral: false,
    stripeMetadata: {
      referral_code: "",
      referred_user_discount_percent: 30,
      referrer_monthly_discount_per_active_subscriber: 1
    }
  };

  function cleanCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 32);
  }

  function generateCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";
    for (let i = 0; i < 5; i += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `AXIS-${suffix}`;
  }

  function getOwnCode() {
    let code = cleanCode(localStorage.getItem(STORAGE_KEYS.ownCode));
    if (!code) {
      code = generateCode();
      localStorage.setItem(STORAGE_KEYS.ownCode, code);
    }
    return code;
  }

  function setNewOwnCode() {
    const code = generateCode();
    localStorage.setItem(STORAGE_KEYS.ownCode, code);
    return code;
  }

  function buildReferralLink(code) {
    const url = new URL(window.location.href);
    url.searchParams.set("ref", code);
    url.hash = "";
    return url.toString();
  }

  function getIncomingCodeFromUrl() {
    const url = new URL(window.location.href);
    return cleanCode(url.searchParams.get("ref"));
  }

  function saveIncomingCodeFromUrl() {
    const incoming = getIncomingCodeFromUrl();
    const own = getOwnCode();

    if (!incoming || incoming === own) return null;

    const existing = cleanCode(localStorage.getItem(STORAGE_KEYS.incomingCode));
    if (!existing) {
      localStorage.setItem(STORAGE_KEYS.incomingCode, incoming);
      localStorage.setItem(STORAGE_KEYS.incomingSavedAt, new Date().toISOString());
    }

    return cleanCode(localStorage.getItem(STORAGE_KEYS.incomingCode));
  }

  function getIncomingCode() {
    saveIncomingCodeFromUrl();
    return cleanCode(localStorage.getItem(STORAGE_KEYS.incomingCode));
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "readonly");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      textarea.remove();
    }
  }

  function getReferralHtml() {
    const code = getOwnCode();
    const link = buildReferralLink(code);
    const incoming = getIncomingCode();

    return `
      <section class="referral-premium-page">
        <div class="referral-premium-hero">
          <div class="referral-kicker">Cercle de transmission</div>
          <h1>Inviter un proche</h1>
          <p>
            Faites découvrir l’école Axis Lumen / JE SUIS. Votre invité reçoit
            <strong>30 % de réduction sur son premier mois</strong>, et vous recevez
            <strong>1 € de réduction chaque mois</strong> tant qu’il reste abonné.
          </p>
        </div>

        ${incoming ? `
          <div class="referral-incoming-banner">
            Invitation active détectée : <strong>${incoming}</strong>.
            La remise de bienvenue pourra être appliquée lors de l’abonnement.
          </div>
        ` : ""}

        <div class="referral-premium-grid">
          <article class="referral-premium-card referral-link-card">
            <div class="referral-card-label">Votre lien d’invitation</div>
            <h2>Partager l’école</h2>
            <p>
              Copiez ce lien et transmettez-le à une personne de confiance.
              Le suivi automatique sera relié à Stripe lorsque le paiement sera activé.
            </p>

            <label class="referral-field-label" for="axisReferralCode">Votre code</label>
            <div class="referral-code-row">
              <input id="axisReferralCode" class="referral-input" value="${code}" readonly />
              <button class="referral-secondary-button" id="axisReferralNewCode" type="button">
                Nouveau code
              </button>
            </div>

            <label class="referral-field-label" for="axisReferralLink">Votre lien</label>
            <input id="axisReferralLink" class="referral-input referral-link-input" value="${link}" readonly />

            <div class="referral-actions">
              <button class="referral-main-button" id="axisReferralCopy" type="button">
                Copier mon lien
              </button>
              <button class="referral-secondary-button" id="axisReferralShare" type="button">
                Partager
              </button>
            </div>

            <p class="referral-copy-status" id="axisReferralStatus" aria-live="polite"></p>
          </article>

          <article class="referral-premium-card referral-benefit-card">
            <div class="referral-big-number">30 %</div>
            <h2>Pour votre invité</h2>
            <p>
              La personne invitée bénéficie d’une remise de bienvenue sur son premier mois
              d’abonnement Axis Lumen Studio.
            </p>
            <p class="referral-soft-note">
              Une porte d’entrée plus douce pour découvrir les séances, les cartes Vertus,
              l’école Apprendre et le générateur de pratique.
            </p>
          </article>

          <article class="referral-premium-card referral-benefit-card">
            <div class="referral-big-number">1 €</div>
            <h2>Pour vous, chaque mois</h2>
            <p>
              Pour chaque abonné actif parrainé, vous recevez 1 € de réduction mensuelle
              sur votre propre abonnement.
            </p>
            <p class="referral-soft-note">
              La réduction continue tant que votre invité reste abonné.
            </p>
          </article>
        </div>

        <div class="referral-example-panel">
          <h2>Exemple simple</h2>
          <div class="referral-example-grid">
            <div>
              <strong>1</strong>
              <span>abonné actif</span>
              <em>1 € / mois</em>
            </div>
            <div>
              <strong>5</strong>
              <span>abonnés actifs</span>
              <em>5 € / mois</em>
            </div>
            <div>
              <strong>10</strong>
              <span>abonnés actifs</span>
              <em>10 € / mois</em>
            </div>
          </div>
        </div>

        <div class="referral-note-panel">
          <p>
            Le parrainage s’applique uniquement aux abonnements actifs. La réduction ne peut pas
            dépasser le prix de l’abonnement et n’est pas convertie en paiement en argent.
          </p>
        </div>
      </section>
    `;
  }

  const REFERRAL_SELECTORS = [
    "#parrainage",
    "#referral",
    "#view-parrainage",
    "#view-referral",
    ".referral-page",
    ".parrainage-page",
    "section[data-view='parrainage']",
    "section[data-view='referral']",
    ".view[data-view='parrainage']",
    ".view[data-view='referral']",
    "[data-page='parrainage']",
    "[data-page='referral']",
    "[data-section='parrainage']",
    "[data-section='referral']"
  ];

  function isContentContainer(el) {
    if (!el) return false;
    const tag = el.tagName ? el.tagName.toLowerCase() : "";
    if (["button", "a", "span", "li"].includes(tag)) return false;
    if (el.closest("nav, .nav, .sidebar, .sidebar-nav, .menu, .topbar")) return false;
    return true;
  }

  function findReferralContainer() {
    for (const selector of REFERRAL_SELECTORS) {
      const candidates = Array.from(document.querySelectorAll(selector));
      const found = candidates.find(isContentContainer);
      if (found) return found;
    }

    const all = Array.from(document.querySelectorAll("[data-view], [data-page], [id], section, main > div"));
    return all.find((el) => {
      if (!isContentContainer(el)) return false;

      const marker = [
        el.id || "",
        el.dataset?.view || "",
        el.dataset?.page || "",
        el.dataset?.section || "",
        el.className || "",
        el.textContent || ""
      ].join(" ").toLowerCase();

      return marker.includes("parrainage")
        || marker.includes("referral")
        || marker.includes("cercle de transmission")
        || marker.includes("mon code");
    });
  }

  function bindReferralActions(container) {
    const codeInput = container.querySelector("#axisReferralCode");
    const linkInput = container.querySelector("#axisReferralLink");
    const status = container.querySelector("#axisReferralStatus");
    const copyButton = container.querySelector("#axisReferralCopy");
    const shareButton = container.querySelector("#axisReferralShare");
    const newCodeButton = container.querySelector("#axisReferralNewCode");

    function refresh(code) {
      const nextCode = code || getOwnCode();
      const nextLink = buildReferralLink(nextCode);
      if (codeInput) codeInput.value = nextCode;
      if (linkInput) linkInput.value = nextLink;
    }

    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        const link = linkInput ? linkInput.value : buildReferralLink(getOwnCode());
        try {
          await copyToClipboard(link);
          if (status) status.textContent = "Lien copié.";
        } catch (error) {
          if (status) status.textContent = "Copie impossible. Sélectionnez le lien manuellement.";
        }
      });
    }

    if (shareButton) {
      shareButton.addEventListener("click", async () => {
        const link = linkInput ? linkInput.value : buildReferralLink(getOwnCode());
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Axis Lumen / JE SUIS",
              text: "Je t’invite à découvrir l’école Axis Lumen / JE SUIS.",
              url: link
            });
            if (status) status.textContent = "Lien partagé.";
          } catch (error) {
            if (status) status.textContent = "";
          }
        } else {
          try {
            await copyToClipboard(link);
            if (status) status.textContent = "Partage direct indisponible : lien copié.";
          } catch (error) {
            if (status) status.textContent = "Partage indisponible. Copiez le lien manuellement.";
          }
        }
      });
    }

    if (newCodeButton) {
      newCodeButton.addEventListener("click", () => {
        const code = setNewOwnCode();
        refresh(code);
        if (status) status.textContent = "Nouveau code généré.";
      });
    }

    refresh();
  }

  function patchReferral() {
    const container = findReferralContainer();
    if (!container) return false;

    if (container.dataset.axisReferralPremium === "true") return true;

    container.innerHTML = getReferralHtml();
    container.classList.add("referral-premium-host");
    container.dataset.axisReferralPremium = "true";
    bindReferralActions(container);
    return true;
  }

  function schedulePatch() {
    saveIncomingCodeFromUrl();
    setTimeout(patchReferral, 50);
    setTimeout(patchReferral, 250);
    setTimeout(patchReferral, 750);
  }

  document.addEventListener("DOMContentLoaded", schedulePatch);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const value = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (value.includes("parrainage") || value.includes("referral") || value.includes("cercle")) {
      schedulePatch();
    }
  });

  const observer = new MutationObserver(() => {
    const bodyText = document.body ? document.body.innerText.toLowerCase() : "";
    if (
      bodyText.includes("parrainage")
      || bodyText.includes("cercle de transmission")
      || bodyText.includes("mon code")
      || bodyText.includes("referral")
    ) {
      patchReferral();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_REFERRAL_PREMIUM = {
    config: REFERRAL_CONFIG,
    getOwnCode,
    setNewOwnCode,
    buildReferralLink,
    getIncomingCode,
    patchReferral
  };

  schedulePatch();
})();
