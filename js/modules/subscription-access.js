(() => {
  const USER_KEY = "axis_current_user";
  const TRIAL_KEY = "axis_trial_started_at";
  const INCOMING_REF_KEY = "axis_referred_by_code";
  const PENDING_ORDER_KEY = "axis_pending_subscription_order";

  const FREE_LABELS = [
    "accueil",
    "apprendre",
    "boutique",
    "abonnement",
    "parrainage",
    "à propos",
    "a propos",
    "about",
    "connexion",
    "login"
  ];

  const PROTECTED_LABELS = [
    "créer sa séance",
    "creer sa seance",
    "créer sa seance",
    "oscillation guidée",
    "oscillation guidee",
    "respiration",
    "rotor optique",
    "tensions statiques",
    "pratiquer",
    "plein écran",
    "plein ecran",
    "séance 45 min",
    "seance 45 min",
    "mixage 15 min",
    "carte vertu"
  ];

  function cleanCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 32);
  }

  function getRefFromUrl() {
    try {
      return cleanCode(new URL(window.location.href).searchParams.get("ref"));
    } catch {
      return "";
    }
  }

  function saveIncomingReferral() {
    const fromUrl = getRefFromUrl();

    if (fromUrl) {
      localStorage.setItem(INCOMING_REF_KEY, fromUrl);
      return fromUrl;
    }

    return cleanCode(localStorage.getItem(INCOMING_REF_KEY));
  }

  function generateClientNumber() {
    const year = new Date().getFullYear();
    const number = Math.floor(100000 + Math.random() * 900000);
    return `AXIS-${year}-${number}`;
  }

  function generateReferralCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";

    for (let i = 0; i < 5; i += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return `AXIS-${suffix}`;
  }

  function buildReferralLink(code) {
    const url = new URL(window.location.href);
    url.searchParams.set("ref", code);
    url.hash = "";
    return url.toString();
  }

  async function sha256(text) {
    if (!crypto.subtle) return "";
    const data = new TextEncoder().encode(String(text || ""));
    const digest = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  }

  function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    if (user.trialStartedAt) {
      localStorage.setItem(TRIAL_KEY, String(user.trialStartedAt));
    }
  }

  function getTrialInfo(user = getUser()) {
    const startedAt = Number(
      user?.trialStartedAt ||
      localStorage.getItem(TRIAL_KEY) ||
      0
    );

    if (!startedAt) {
      return {
        started: false,
        active: false,
        expired: false,
        daysLeft: 0
      };
    }

    const duration = 7 * 24 * 60 * 60 * 1000;
    const remaining = startedAt + duration - Date.now();

    return {
      started: true,
      active: remaining > 0,
      expired: remaining <= 0,
      daysLeft: Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)))
    };
  }

  function hasAccess() {
    const user = getUser();

    if (!user) return false;

    if (user.role === "admin") return true;
    if (user.subscriptionStatus === "active") return true;

    if (user.subscriptionStatus === "trialing") {
      return getTrialInfo(user).active;
    }

    return false;
  }

  function getAccessStatusText() {
    const user = getUser();

    if (!user) return "Aucun espace abonné créé.";

    if (user.role === "admin") return "Accès administrateur actif.";
    if (user.subscriptionStatus === "active") return "Abonnement actif.";

    const trial = getTrialInfo(user);

    if (trial.active) {
      return `Essai gratuit actif — ${trial.daysLeft} jour(s) restant(s).`;
    }

    if (trial.expired) {
      return "Essai gratuit terminé. Choisissez un abonnement pour conserver l’accès complet.";
    }

    return "Profil créé, accès non activé.";
  }

  function getStripeLinks() {
    return window.AXIS_STRIPE_LINKS || {
      monthly: "",
      yearly: ""
    };
  }

  function getSignupFormHtml(context = "page") {
    const incoming = saveIncomingReferral();

    return `
      <form class="axis-signup-form" data-axis-signup-form="${context}">
        <div class="axis-form-row">
          <label>
            Prénom
            <input type="text" name="firstName" required autocomplete="given-name">
          </label>

          <label>
            Nom
            <input type="text" name="lastName" required autocomplete="family-name">
          </label>
        </div>

        <label>
          Adresse email
          <input type="email" name="email" required autocomplete="email">
        </label>

        <label>
          Téléphone <span>facultatif</span>
          <input type="tel" name="phone" autocomplete="tel">
        </label>

        <div class="axis-form-row">
          <label>
            Mot de passe
            <input type="password" name="password" required minlength="8" autocomplete="new-password">
          </label>

          <label>
            Confirmer le mot de passe
            <input type="password" name="passwordConfirm" required minlength="8" autocomplete="new-password">
          </label>
        </div>

        <label>
          Comment avez-vous connu Axis Lumen / JE SUIS ?
          <select name="discoverySource" required>
            <option value="">Choisir une option</option>
            <option value="recherche">Recherche internet</option>
            <option value="reseaux">Réseaux sociaux</option>
            <option value="bouche-a-oreille">Bouche-à-oreille</option>
            <option value="parrainage">Parrainage</option>
            <option value="livre">Livre / PDF</option>
            <option value="atelier">Formation / atelier</option>
            <option value="autre">Autre</option>
          </select>
        </label>

        <label>
          Code parrain / code filleul <span>facultatif</span>
          <input type="text" name="referredByCode" value="${incoming || ""}" placeholder="Exemple : AXIS-WJAJJI">
        </label>

        <label class="axis-consent">
          <input type="checkbox" name="consent" required>
          <span>J’accepte de créer mon espace abonné et de recevoir les informations liées à mon accès.</span>
        </label>

        <button class="axis-primary-button" type="submit">
          Créer mon espace et démarrer les 7 jours gratuits
        </button>

        <p class="axis-form-status" aria-live="polite"></p>
      </form>
    `;
  }

  function getLoginFormHtml() {
    return `
      <form class="axis-login-form">
        <label>
          Adresse email
          <input type="email" name="email" required autocomplete="email">
        </label>

        <label>
          Mot de passe
          <input type="password" name="password" required autocomplete="current-password">
        </label>

        <button class="axis-secondary-button" type="submit">
          Me connecter
        </button>

        <p class="axis-login-status" aria-live="polite"></p>
      </form>
    `;
  }

  async function createSubscriberFromForm(form) {
    const status = form.querySelector(".axis-form-status");
    const data = new FormData(form);

    const password = String(data.get("password") || "");
    const confirm = String(data.get("passwordConfirm") || "");

    if (password !== confirm) {
      if (status) status.textContent = "Les mots de passe ne correspondent pas.";
      return null;
    }

    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim().toLowerCase();

    if (!firstName || !lastName || !email) {
      if (status) status.textContent = "Merci de compléter les champs obligatoires.";
      return null;
    }

    const existing = getUser();

    if (existing?.email && existing.email === email) {
      if (status) status.textContent = "Un espace abonné existe déjà avec cet email.";
      return existing;
    }

    const trialStartedAt = Date.now();

    const user = {
      clientNumber: generateClientNumber(),
      firstName,
      lastName,
      email,
      phone: String(data.get("phone") || "").trim(),
      passwordHash: await sha256(password),
      referralCode: generateReferralCode(),
      referredByCode: cleanCode(data.get("referredByCode") || saveIncomingReferral()),
      discoverySource: String(data.get("discoverySource") || "").trim(),
      trialStartedAt,
      subscriptionStatus: "trialing",
      role: "user",
      createdAt: new Date().toISOString()
    };

    saveUser(user);

    if (status) {
      status.textContent = "Espace abonné créé. Votre essai gratuit de 7 jours est activé.";
    }

    patchSubscriptionPage(true);
    closeAccessModal();

    return user;
  }

  async function loginFromForm(form) {
    const status = form.querySelector(".axis-login-status");
    const data = new FormData(form);

    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");

    const user = getUser();

    if (!user || user.email !== email) {
      if (status) status.textContent = "Aucun profil local trouvé avec cet email.";
      return false;
    }

    const hash = await sha256(password);

    if (hash !== user.passwordHash) {
      if (status) status.textContent = "Mot de passe incorrect.";
      return false;
    }

    user.lastLoginAt = new Date().toISOString();
    saveUser(user);

    if (status) status.textContent = "Connexion réussie.";

    patchSubscriptionPage(true);
    closeAccessModal();

    return true;
  }

  function bindForms(root = document) {
    root.querySelectorAll(".axis-signup-form").forEach((form) => {
      if (form.dataset.bound === "true") return;

      form.dataset.bound = "true";

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        createSubscriberFromForm(form);
      });
    });

    root.querySelectorAll(".axis-login-form").forEach((form) => {
      if (form.dataset.bound === "true") return;

      form.dataset.bound = "true";

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        loginFromForm(form);
      });
    });
  }

  function getProfileHtml() {
    const user = getUser();

    if (!user) {
      return `
        <div class="axis-profile-box">
          <h2>Mon espace abonné</h2>
          <p>Créez votre profil pour recevoir votre numéro client, votre code parrain et votre lien de transmission.</p>
        </div>
      `;
    }

    const trial = getTrialInfo(user);
    const link = buildReferralLink(user.referralCode);

    return `
      <div class="axis-profile-box">
        <h2>Mon espace abonné</h2>

        <div class="axis-profile-grid">
          <div><span>Nom</span><strong>${user.firstName} ${user.lastName}</strong></div>
          <div><span>Email</span><strong>${user.email}</strong></div>
          <div><span>Numéro client</span><strong>${user.clientNumber}</strong></div>
          <div><span>Statut</span><strong>${getAccessStatusText()}</strong></div>
          <div><span>Code parrain</span><strong>${user.referralCode}</strong></div>
          <div><span>Code filleul</span><strong>${user.referredByCode || "Aucun"}</strong></div>
        </div>

        <label class="axis-link-label">Mon lien de parrainage</label>

        <div class="axis-copy-row">
          <input id="axisSubscriberReferralLink" value="${link}" readonly>
          <button id="axisCopySubscriberLink" type="button">Copier</button>
        </div>

        <p class="axis-profile-note">
          ${trial.active ? `Votre essai est actif pendant encore ${trial.daysLeft} jour(s).` : "Votre essai gratuit est terminé ou non actif."}
        </p>
      </div>
    `;
  }

  function getSubscriptionHtml() {
    return `
      <section class="axis-sub-page">
        <div class="axis-sub-hero">
          <div class="axis-sub-kicker">Abonnement</div>
          <h1>Créez votre espace.<br>Essayez 7 jours gratuitement.</h1>
          <p>
            L’espace abonné permet d’activer votre essai, de suivre votre progression,
            de recevoir votre numéro client et de générer votre code de parrainage.
          </p>
        </div>

        <div class="axis-sub-status">
          ${getAccessStatusText()}
        </div>

        <div class="axis-sub-grid">
          <article class="axis-sub-card axis-sub-card-main">
            <span class="axis-sub-label">Étape 1</span>
            <h2>Créer mon espace abonné</h2>
            <p>
              Remplissez ce formulaire pour activer l’essai gratuit de 7 jours et préparer
              votre futur abonnement.
            </p>
            ${getSignupFormHtml("subscription-page")}
          </article>

          <article class="axis-sub-card">
            <span class="axis-sub-label">Déjà inscrit</span>
            <h2>Connexion</h2>
            <p>
              Connectez-vous à votre espace local pour retrouver votre numéro client,
              votre code parrain et votre accès en cours.
            </p>
            ${getLoginFormHtml()}
          </article>

          <article class="axis-sub-card">
            <span class="axis-sub-label">Accès complet</span>

            <div class="axis-sub-price">19 €<small>/mois</small></div>
            <h2>Mensuel</h2>
            <p>Accès complet au studio, aux 90 séances, aux exercices et au parcours Apprendre.</p>
            <button class="axis-secondary-button" data-axis-buy-plan="monthly" type="button">
              S’abonner
            </button>

            <div class="axis-sub-price axis-sub-price-year">190 €<small>/an</small></div>
            <h2>Annuel</h2>
            <p>Deux mois offerts pour pratiquer sur la durée.</p>
            <button class="axis-secondary-button" data-axis-buy-plan="yearly" type="button">
              Choisir l’abonnement annuel
            </button>
          </article>
        </div>

        ${getProfileHtml()}

        <div class="axis-sub-access">
          <h2>Ce que l’abonnement déverrouille</h2>
          <div>
            <span>Créer sa séance</span>
            <span>Oscillation guidée</span>
            <span>Respiration</span>
            <span>Rotor Optique</span>
            <span>Tensions statiques</span>
            <span>Mode pratique</span>
            <span>Carte Vertu</span>
            <span>90 séances guidées</span>
            <span>Parcours Apprendre</span>
            <span>Parrainage</span>
            <span>Audio complet</span>
            <span>Futures extensions</span>
          </div>
        </div>

        <div class="axis-sub-note">
          <h2>Après les 7 jours gratuits</h2>
          <p>
            À la fin de l’essai, vous pourrez choisir l’abonnement mensuel ou annuel
            pour conserver l’accès aux exercices, aux séances guidées, aux cartes Vertus
            et au générateur de pratique.
          </p>
          <p>
            L’accès complet sera activé après validation du paiement sécurisé.
          </p>
        </div>
      </section>
    `;
  }

  function findSubscriptionContainer() {
    const selectors = [
      "main [data-view='abonnement']",
      "main [data-page='abonnement']",
      "main [data-section='abonnement']",
      "section[data-view='abonnement']",
      ".view[data-view='abonnement']",
      "#abonnement",
      "#view-abonnement",
      "#subscription",
      "#view-subscription"
    ];

    for (const selector of selectors) {
      const found = document.querySelector(selector);

      if (found && !found.closest("nav, aside, .sidebar, .menu")) {
        return found;
      }
    }

    const all = Array.from(document.querySelectorAll("main section, main article, main div, section, article, div"));

    const candidates = all.filter((el) => {
      if (el.closest("nav, aside, .sidebar, .menu")) return false;

      const text = el.textContent || "";

      return text.includes("Abonnement Axis Lumen Studio") ||
        text.includes("Paiement sécurisé en préparation") ||
        text.includes("Activer l'abonnement") ||
        text.includes("Mensuel : 19") ||
        text.includes("Créer mon espace") ||
        text.includes("Après les 7 jours gratuits");
    });

    if (!candidates.length) return null;

    candidates.sort((a, b) => {
      const areaA = a.getBoundingClientRect().width * a.getBoundingClientRect().height;
      const areaB = b.getBoundingClientRect().width * b.getBoundingClientRect().height;

      return areaB - areaA;
    });

    return candidates[0];
  }

  function patchSubscriptionPage(force = false) {
    const container = findSubscriptionContainer();

    if (!container) return false;

    if (container.dataset.axisSubRebuilt === "true" && !force) {
      bindForms(container);
      bindBuyButtons(container);
      bindProfileCopy(container);
      return true;
    }

    container.innerHTML = getSubscriptionHtml();
    container.classList.add("axis-subscription-rebuilt-host");
    container.dataset.axisSubRebuilt = "true";

    bindForms(container);
    bindBuyButtons(container);
    bindProfileCopy(container);

    return true;
  }

  function bindProfileCopy(root = document) {
    const copy = root.querySelector("#axisCopySubscriberLink");
    const input = root.querySelector("#axisSubscriberReferralLink");

    if (copy && input && copy.dataset.bound !== "true") {
      copy.dataset.bound = "true";

      copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(input.value);
        copy.textContent = "Copié";
        setTimeout(() => copy.textContent = "Copier", 1400);
      });
    }
  }

  function bindBuyButtons(root = document) {
    root.querySelectorAll("[data-axis-buy-plan]").forEach((button) => {
      if (button.dataset.bound === "true") return;

      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        const plan = button.dataset.axisBuyPlan;
        const user = getUser();

        if (!user) {
          showAccessModal();
          return;
        }

        const pendingOrder = {
          clientNumber: user.clientNumber,
          email: user.email,
          plan,
          referralCode: user.referralCode,
          referredByCode: user.referredByCode || "",
          discoverySource: user.discoverySource || "",
          createdAt: new Date().toISOString()
        };

        localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(pendingOrder));

        const links = getStripeLinks();
        const link = links[plan];

        if (!link) {
          alert("Le paiement sécurisé sera disponible très bientôt. Votre profil est prêt.");
          return;
        }

        window.location.href = link;
      });
    });
  }

  function showAccessModal() {
    closeAccessModal();

    const modal = document.createElement("div");
    modal.id = "axisAccessModal";
    modal.className = "axis-access-modal-backdrop";

    modal.innerHTML = `
      <div class="axis-access-modal" role="dialog" aria-modal="true">
        <button id="axisAccessClose" class="axis-access-close" type="button">×</button>

        <div class="axis-sub-kicker">Accès aux exercices</div>
        <h2>Créez votre espace abonné</h2>
        <p>
          Les exercices et séances guidées sont accessibles après création de votre profil.
          Votre essai gratuit de 7 jours sera activé immédiatement.
        </p>

        ${getSignupFormHtml("access-modal")}

        <div class="axis-access-login">
          <h3>Déjà inscrit ?</h3>
          ${getLoginFormHtml()}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#axisAccessClose")?.addEventListener("click", closeAccessModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeAccessModal();
    });

    bindForms(modal);
  }

  function closeAccessModal() {
    document.getElementById("axisAccessModal")?.remove();
  }

  function shouldProtect(trigger) {
    const text = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.dataset?.section || "",
      trigger.getAttribute("href") || "",
      trigger.getAttribute("aria-label") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (FREE_LABELS.some((label) => text.includes(label))) return false;

    return PROTECTED_LABELS.some((label) => text.includes(label));
  }

  function scheduleSubscriptionPatch() {
    setTimeout(() => patchSubscriptionPage(), 80);
    setTimeout(() => patchSubscriptionPage(), 300);
    setTimeout(() => patchSubscriptionPage(), 900);
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], [data-section], a, button");

    if (!trigger) return;
    if (trigger.closest("#axisAccessModal")) return;

    if (shouldProtect(trigger) && !hasAccess()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      showAccessModal();
      return;
    }

    const value = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (value.includes("abonnement") || value.includes("subscription")) {
      scheduleSubscriptionPatch();
    }
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAccessModal();
  });

  document.addEventListener("DOMContentLoaded", () => {
    saveIncomingReferral();
    scheduleSubscriptionPatch();
  });

  const observer = new MutationObserver(() => {
    const text = document.body?.innerText || "";

    if (
      text.includes("Abonnement Axis Lumen Studio") ||
      text.includes("Paiement sécurisé en préparation") ||
      text.includes("Activer l'abonnement") ||
      text.includes("Après les 7 jours gratuits")
    ) {
      patchSubscriptionPage();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_ACCESS = {
    getUser,
    hasAccess,
    getTrialInfo,
    patchSubscriptionPage,
    showAccessModal
  };

  saveIncomingReferral();
  scheduleSubscriptionPatch();
})();