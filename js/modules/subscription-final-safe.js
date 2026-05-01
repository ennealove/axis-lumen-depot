(() => {
  const USER_KEY = "axis_current_user";
  const REF_KEY = "axis_referred_by_code";
  const ORDER_KEY = "axis_pending_subscription_order";

  const REFERRAL_KEYS = [
    "axis_referral_own_code",
    "axis_referral_own_code_v2",
    "axis_referral_code",
    "axis_user_referral_code"
  ];

  function cleanCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 32);
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
    if (user.referralCode) syncReferralKeys(user.referralCode);
  }

  function getRefFromUrl() {
    try {
      return cleanCode(new URL(window.location.href).searchParams.get("ref"));
    } catch {
      return "";
    }
  }

  function saveIncomingRef() {
    const code = getRefFromUrl();

    if (code) {
      localStorage.setItem(REF_KEY, code);
      return code;
    }

    return cleanCode(localStorage.getItem(REF_KEY));
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

  function getStoredReferralCode() {
    for (const key of REFERRAL_KEYS) {
      const code = cleanCode(localStorage.getItem(key));
      if (code) return code;
    }

    return "";
  }

  function syncReferralKeys(code) {
    const finalCode = cleanCode(code);

    if (!finalCode) return "";

    REFERRAL_KEYS.forEach((key) => {
      localStorage.setItem(key, finalCode);
    });

    return finalCode;
  }

  function getOfficialReferralCode() {
    const user = getUser();

    if (user && cleanCode(user.referralCode)) {
      return syncReferralKeys(user.referralCode);
    }

    const stored = getStoredReferralCode();

    if (stored) {
      if (user) {
        user.referralCode = stored;
        saveUser(user);
      }

      return syncReferralKeys(stored);
    }

    const generated = generateReferralCode();

    if (user) {
      user.referralCode = generated;
      saveUser(user);
    }

    return syncReferralKeys(generated);
  }

  function buildReferralLink(code) {
    const url = new URL(window.location.href);
    url.searchParams.set("ref", cleanCode(code));
    url.hash = "";
    return url.toString();
  }

  async function sha256(text) {
    if (!crypto.subtle) return String(text || "");

    const data = new TextEncoder().encode(String(text || ""));
    const digest = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function getTrialInfo(user = getUser()) {
    const startedAt = Number(user?.trialStartedAt || 0);

    if (!startedAt) {
      return {
        active: false,
        expired: false,
        daysLeft: 0
      };
    }

    const duration = 7 * 24 * 60 * 60 * 1000;
    const remaining = startedAt + duration - Date.now();

    return {
      active: remaining > 0,
      expired: remaining <= 0,
      daysLeft: Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)))
    };
  }

  function getStatusText() {
    const user = getUser();

    if (!user) return "Aucun espace abonné créé.";

    if (user.role === "admin") return "Accès administrateur actif.";
    if (user.subscriptionStatus === "active") return "Abonnement actif.";

    const trial = getTrialInfo(user);

    if (trial.active) return `Essai gratuit actif — ${trial.daysLeft} jour(s) restant(s).`;
    if (trial.expired) return "Essai gratuit terminé. Choisissez un abonnement pour conserver l’accès complet.";

    return "Espace abonné créé.";
  }

  function getSignupHtml() {
    const incoming = saveIncomingRef();

    return `
      <form id="axisSafeSignupForm" class="axis-safe-form">
        <div class="axis-safe-row">
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

        <div class="axis-safe-row">
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

        <label class="axis-safe-consent">
          <input type="checkbox" name="consent" required>
          <span>J’accepte de créer mon espace abonné et de recevoir les informations liées à mon accès.</span>
        </label>

        <button class="axis-safe-primary" type="submit">
          Créer mon espace et démarrer les 7 jours gratuits
        </button>

        <p id="axisSafeSignupStatus" class="axis-safe-status" aria-live="polite"></p>
      </form>
    `;
  }

  function getLoginHtml() {
    return `
      <form id="axisSafeLoginForm" class="axis-safe-form">
        <label>
          Adresse email
          <input type="email" name="email" required autocomplete="email">
        </label>

        <label>
          Mot de passe
          <input type="password" name="password" required autocomplete="current-password">
        </label>

        <button class="axis-safe-secondary" type="submit">
          Me connecter
        </button>

        <p id="axisSafeLoginStatus" class="axis-safe-status" aria-live="polite"></p>
      </form>
    `;
  }

  function getProfileHtml() {
    const user = getUser();

    if (!user) {
      return `
        <div class="axis-safe-profile">
          <h2>Mon espace abonné</h2>
          <p>Créez votre profil pour recevoir votre numéro client, votre code parrain et votre lien de transmission.</p>
        </div>
      `;
    }

    const referralCode = getOfficialReferralCode();
    const referralLink = buildReferralLink(referralCode);

    return `
      <div class="axis-safe-profile">
        <h2>Mon espace abonné</h2>

        <div class="axis-safe-profile-grid">
          <div><span>Nom</span><strong>${user.firstName} ${user.lastName}</strong></div>
          <div><span>Email</span><strong>${user.email}</strong></div>
          <div><span>Numéro client</span><strong>${user.clientNumber}</strong></div>
          <div><span>Statut</span><strong>${getStatusText()}</strong></div>
          <div><span>Code parrain</span><strong>${referralCode}</strong></div>
          <div><span>Code filleul</span><strong>${user.referredByCode || "Aucun"}</strong></div>
        </div>

        <label class="axis-safe-link-label">Mon lien de parrainage</label>

        <div class="axis-safe-copy-row">
          <input id="axisSafeReferralLink" value="${referralLink}" readonly>
          <button id="axisSafeCopyReferral" type="button">Copier</button>
        </div>
      </div>
    `;
  }

  function getAbonnementHtml() {
    return `
      <section class="axis-safe-sub-page">
        <div class="axis-safe-hero">
          <div class="axis-safe-kicker">Abonnement</div>
          <h1>Créez votre espace.<br>Essayez 7 jours gratuitement.</h1>
          <p>
            L’espace abonné permet d’activer votre essai, de suivre votre progression,
            de recevoir votre numéro client et de générer votre code de parrainage.
          </p>
        </div>

        <div id="axisSafeSubStatus" class="axis-safe-sub-status">
          ${getStatusText()}
        </div>

        <div class="axis-safe-grid">
          <article class="axis-safe-card axis-safe-card-main">
            <span class="axis-safe-label">Étape 1</span>
            <h2>Créer mon espace abonné</h2>
            <p>
              Remplissez ce formulaire pour activer l’essai gratuit de 7 jours et préparer
              votre futur abonnement.
            </p>
            ${getSignupHtml()}
          </article>

          <article class="axis-safe-card">
            <span class="axis-safe-label">Déjà inscrit</span>
            <h2>Connexion</h2>
            <p>
              Connectez-vous à votre espace local pour retrouver votre numéro client,
              votre code parrain et votre accès en cours.
            </p>
            ${getLoginHtml()}
          </article>

          <article class="axis-safe-card">
            <span class="axis-safe-label">Accès complet</span>

            <div class="axis-safe-price">19 €<small>/mois</small></div>
            <h2>Mensuel</h2>
            <p>Accès complet au studio, aux 90 séances, aux exercices et au parcours Apprendre.</p>
            <button id="axisSafeBuyMonthly" class="axis-safe-secondary" type="button">
              S’abonner
            </button>

            <div class="axis-safe-price axis-safe-price-year">190 €<small>/an</small></div>
            <h2>Annuel</h2>
            <p>Deux mois offerts pour pratiquer sur la durée.</p>
            <button id="axisSafeBuyYearly" class="axis-safe-secondary" type="button">
              Choisir l’abonnement annuel
            </button>
          </article>
        </div>

        <div id="axisSafeProfileMount">
          ${getProfileHtml()}
        </div>

        <div class="axis-safe-unlocks">
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

        <div class="axis-safe-note">
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

  function renderAbonnement() {
    const section = document.getElementById("abonnement");
    if (!section) return;

    section.innerHTML = getAbonnementHtml();
    bindAbonnement();
  }

  function refreshProfileOnly() {
    const mount = document.getElementById("axisSafeProfileMount");
    if (mount) mount.innerHTML = getProfileHtml();

    const status = document.getElementById("axisSafeSubStatus");
    if (status) status.textContent = getStatusText();

    bindCopyButton();
  }

  async function createProfile(form) {
    const status = document.getElementById("axisSafeSignupStatus");
    const data = new FormData(form);

    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");
    const confirm = String(data.get("passwordConfirm") || "");

    if (!firstName || !lastName || !email) {
      if (status) status.textContent = "Merci de compléter les champs obligatoires.";
      return;
    }

    if (password !== confirm) {
      if (status) status.textContent = "Les mots de passe ne correspondent pas.";
      return;
    }

    const referralCode = getOfficialReferralCode() || generateReferralCode();

    const user = {
      clientNumber: generateClientNumber(),
      firstName,
      lastName,
      email,
      phone: String(data.get("phone") || "").trim(),
      passwordHash: await sha256(password),
      referralCode,
      referredByCode: cleanCode(data.get("referredByCode") || saveIncomingRef()),
      discoverySource: String(data.get("discoverySource") || "").trim(),
      trialStartedAt: Date.now(),
      subscriptionStatus: "trialing",
      role: "user",
      createdAt: new Date().toISOString()
    };

    saveUser(user);

    if (status) status.textContent = "Espace abonné créé. Votre essai gratuit de 7 jours est activé.";

    refreshProfileOnly();
    updateParrainageVisibleFields();
  }

  async function login(form) {
    const status = document.getElementById("axisSafeLoginStatus");
    const data = new FormData(form);

    const email = String(data.get("email") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");

    const user = getUser();

    if (!user || user.email !== email) {
      if (status) status.textContent = "Aucun profil local trouvé avec cet email.";
      return;
    }

    const hash = await sha256(password);

    if (user.passwordHash !== hash) {
      if (status) status.textContent = "Mot de passe incorrect.";
      return;
    }

    user.lastLoginAt = new Date().toISOString();
    saveUser(user);

    if (status) status.textContent = "Connexion réussie.";

    refreshProfileOnly();
    updateParrainageVisibleFields();
  }

  function buy(plan) {
    const user = getUser();

    if (!user) {
      alert("Créez d’abord votre espace abonné pour activer l’essai gratuit ou choisir un abonnement.");
      return;
    }

    const order = {
      clientNumber: user.clientNumber,
      email: user.email,
      plan,
      referralCode: user.referralCode,
      referredByCode: user.referredByCode || "",
      discoverySource: user.discoverySource || "",
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(ORDER_KEY, JSON.stringify(order));

    const links = window.AXIS_STRIPE_LINKS || {};
    const link = links[plan];

    if (!link) {
      alert("Le paiement sécurisé sera disponible très bientôt. Votre profil est prêt.");
      return;
    }

    window.location.href = link;
  }

  function bindCopyButton() {
    const copy = document.getElementById("axisSafeCopyReferral");
    const input = document.getElementById("axisSafeReferralLink");

    if (copy && input && copy.dataset.bound !== "true") {
      copy.dataset.bound = "true";
      copy.addEventListener("click", async () => {
        await navigator.clipboard.writeText(input.value);
        copy.textContent = "Copié";
        setTimeout(() => copy.textContent = "Copier", 1200);
      });
    }
  }

  function bindAbonnement() {
    const signup = document.getElementById("axisSafeSignupForm");
    const loginForm = document.getElementById("axisSafeLoginForm");
    const monthly = document.getElementById("axisSafeBuyMonthly");
    const yearly = document.getElementById("axisSafeBuyYearly");

    if (signup && signup.dataset.bound !== "true") {
      signup.dataset.bound = "true";
      signup.addEventListener("submit", (event) => {
        event.preventDefault();
        createProfile(signup);
      });
    }

    if (loginForm && loginForm.dataset.bound !== "true") {
      loginForm.dataset.bound = "true";
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        login(loginForm);
      });
    }

    if (monthly && monthly.dataset.bound !== "true") {
      monthly.dataset.bound = "true";
      monthly.addEventListener("click", () => buy("monthly"));
    }

    if (yearly && yearly.dataset.bound !== "true") {
      yearly.dataset.bound = "true";
      yearly.addEventListener("click", () => buy("yearly"));
    }

    bindCopyButton();
  }

  function updateParrainageVisibleFields() {
    const code = getOfficialReferralCode();
    const link = buildReferralLink(code);

    const codeInputs = [
      "#axisReferralCode",
      "#axisReferralCodeV2",
      "#axisPromoReferralCode"
    ];

    const linkInputs = [
      "#axisReferralLink",
      "#axisReferralLinkV2",
      "#axisPromoReferralLink"
    ];

    codeInputs.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.value = code;
    });

    linkInputs.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.value = link;
    });

    document.querySelectorAll("input[readonly]").forEach((input) => {
      const value = String(input.value || "");

      if (value.includes("?ref=AXIS-")) input.value = link;
      if (/^AXIS-[A-Z0-9-]+$/.test(value)) input.value = code;
    });
  }

  function routeClickHandler(event) {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const value = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (value.includes("abonnement") || value.includes("subscription")) {
      setTimeout(renderAbonnement, 40);
      setTimeout(renderAbonnement, 180);
    }

    if (value.includes("parrainage") || value.includes("referral")) {
      syncReferralKeys(getOfficialReferralCode());
      setTimeout(updateParrainageVisibleFields, 80);
      setTimeout(updateParrainageVisibleFields, 300);
    }
  }

  function init() {
    saveIncomingRef();
    syncReferralKeys(getOfficialReferralCode());

    if (document.getElementById("abonnement")) {
      renderAbonnement();
    }

    updateParrainageVisibleFields();
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("click", routeClickHandler);

  window.AXIS_SUBSCRIPTION_SAFE = {
    getUser,
    getOfficialReferralCode,
    syncReferralKeys,
    buildReferralLink,
    renderAbonnement,
    updateParrainageVisibleFields
  };

  init();
})();