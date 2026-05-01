(function () {
  const API_CANDIDATES = [
    "http://127.0.0.1:8787",
    "http://localhost:8787"
  ];

  const TOKEN_KEY = "axis_auth_token";
  const USER_KEY = "axis_auth_user";
  const REF_KEY = "axis_pending_referral_code";

  const COMMISSION_RATE = 20;

  function $(selector) {
    return document.querySelector(selector);
  }

  function euro(cents) {
    const value = Number(cents || 0) / 100;
    return value.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR"
    });
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY) || "";
  }

  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
  }

  function setUser(user) {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function getIncomingRef() {
    const url = new URL(window.location.href);
    return (
      url.searchParams.get("ref") ||
      url.searchParams.get("referral") ||
      url.searchParams.get("code") ||
      localStorage.getItem(REF_KEY) ||
      ""
    ).trim();
  }

  function saveIncomingRef() {
    const ref = getIncomingRef();
    if (ref) localStorage.setItem(REF_KEY, ref);
    return ref;
  }

  function setStatus(message) {
    const el = $("#axisReferralStatus");
    if (el) el.textContent = message;
  }

  async function api(path, options = {}) {
    const token = getToken();
    let lastError = null;

    for (const base of API_CANDIDATES) {
      try {
        const headers = Object.assign({
          "Content-Type": "application/json"
        }, options.headers || {});

        if (token) headers.Authorization = "Bearer " + token;

        const response = await fetch(base + path, Object.assign({}, options, { headers }));

        const text = await response.text();
        let data = null;

        try {
          data = text ? JSON.parse(text) : null;
        } catch (error) {
          data = { raw: text };
        }

        if (!response.ok) {
          throw new Error(data && data.error ? data.error : "HTTP " + response.status);
        }

        return data;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("Backend indisponible.");
  }

  function extractCode(data) {
    return (
      data?.referral?.code ||
      data?.user?.referralCode ||
      data?.user?.referral_code ||
      data?.user?.codeParrain ||
      data?.profile?.referralCode ||
      data?.profile?.referral?.code ||
      ""
    );
  }

  function referralLink(code) {
    const base = window.location.origin + window.location.pathname;
    return base + "?ref=" + encodeURIComponent(code);
  }

  function renderLoggedOut(incomingRef) {
    const app = $("#axisReferralApp");

    app.innerHTML = `
      <div class="axis-ref-grid">
        <section class="axis-card">
          <h2>Créer son compte partenaire</h2>
          <p>Chaque compte reçoit automatiquement un code parrain unique. Si une personne s’inscrit avec ce code, elle est rattachée comme filleul.</p>

          ${incomingRef ? `<div class="axis-status">Code parrain détecté : <strong>${incomingRef}</strong></div>` : ""}

          <form class="axis-form" id="axisRegisterForm">
            <label>Nom
              <input name="name" required placeholder="Votre nom">
            </label>

            <label>Email
              <input name="email" type="email" required placeholder="vous@email.fr">
            </label>

            <label>Mot de passe
              <input name="password" type="password" required placeholder="Minimum 6 caractères">
            </label>

            <button class="axis-btn primary" type="submit">Créer mon compte</button>
          </form>
        </section>

        <section class="axis-card">
          <h2>Connexion</h2>
          <p>Connectez-vous pour retrouver votre code, votre lien, vos filleuls et vos commissions.</p>

          <form class="axis-form" id="axisLoginForm">
            <label>Email
              <input name="email" type="email" required placeholder="vous@email.fr">
            </label>

            <label>Mot de passe
              <input name="password" type="password" required>
            </label>

            <button class="axis-btn" type="submit">Me connecter</button>
          </form>

          <div class="axis-status" id="axisReferralStatus">Backend attendu : http://127.0.0.1:8787</div>
        </section>
      </div>
    `;

    bindAuthForms();
  }

  function renderDashboard(data) {
    const app = $("#axisReferralApp");

    const user = data?.user || data?.profile || {};
    const referral = data?.referral || {};
    const summary = data?.summary || {};
    const filleuls = Array.isArray(data?.filleuls) ? data.filleuls : [];
    const commissions = Array.isArray(data?.commissions) ? data.commissions : [];

    const code =
      referral.code ||
      user.referralCode ||
      user.referral_code ||
      user.codeParrain ||
      extractCode(data);

    const link = code ? referralLink(code) : "";

    app.innerHTML = `
      <div class="axis-ref-grid">
        <section class="axis-card">
          <h2>Votre espace parrainage</h2>
          <p>Le code ci-dessous identifie automatiquement le parrain lors de l’inscription d’un filleul.</p>

          <div class="axis-ref-code-box">
            <div class="axis-ref-code">${code || "CODE NON TROUVÉ"}</div>
            <div class="axis-ref-link" id="axisReferralLink">${link || "Lien indisponible"}</div>
            <button class="axis-btn primary" id="axisCopyReferral">Copier mon lien</button>
            <button class="axis-btn" id="axisLogout">Déconnexion</button>
          </div>
        </section>

        <section class="axis-card">
          <h2>Suivi des commissions</h2>

          <div class="axis-summary">
            <div class="axis-summary-card">
              <span>Filleuls</span>
              <strong>${filleuls.length}</strong>
            </div>

            <div class="axis-summary-card">
              <span>Payable</span>
              <strong>${euro(summary.payableCents)}</strong>
            </div>

            <div class="axis-summary-card">
              <span>Déjà payé</span>
              <strong>${euro(summary.paidCents)}</strong>
            </div>
          </div>

          <p>Commission fixe : <strong>${COMMISSION_RATE}%</strong>. Exemple : 3,80 € sur un abonnement mensuel à 19 €, 38 € sur un abonnement annuel à 190 €.</p>
        </section>
      </div>

      <section class="axis-card" style="margin-top:24px;">
        <h2>Filleuls</h2>
        ${filleuls.length ? `
          <table class="axis-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Nom</th>
                <th>Date</th>
                <th>Code utilisé</th>
              </tr>
            </thead>
            <tbody>
              ${filleuls.map(f => `
                <tr>
                  <td>${f.email || ""}</td>
                  <td>${f.name || ""}</td>
                  <td>${f.createdAt ? new Date(f.createdAt).toLocaleDateString("fr-FR") : ""}</td>
                  <td>${f.referredByCode || f.referralCode || ""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `<p class="axis-empty">Aucun filleul enregistré pour le moment.</p>`}
      </section>

      <section class="axis-card" style="margin-top:24px;">
        <h2>Commissions</h2>
        ${commissions.length ? `
          <table class="axis-table">
            <thead>
              <tr>
                <th>Filleul</th>
                <th>Vente</th>
                <th>Commission</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              ${commissions.map(c => `
                <tr>
                  <td>${c.referredEmail || c.email || ""}</td>
                  <td>${euro(c.saleAmountCents)}</td>
                  <td>${euro(c.amountCents)}</td>
                  <td>${c.status || ""}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `<p class="axis-empty">Aucune commission enregistrée pour le moment.</p>`}
      </section>
    `;

    const copy = $("#axisCopyReferral");
    if (copy && link) {
      copy.addEventListener("click", async function () {
        await navigator.clipboard.writeText(link);
        copy.textContent = "Lien copié";
        setTimeout(() => copy.textContent = "Copier mon lien", 1400);
      });
    }

    const logout = $("#axisLogout");
    if (logout) {
      logout.addEventListener("click", function () {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        init();
      });
    }
  }

  function bindAuthForms() {
    const registerForm = $("#axisRegisterForm");
    const loginForm = $("#axisLoginForm");

    if (registerForm) {
      registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = new FormData(registerForm);
        const incomingRef = getIncomingRef();

        const payload = {
          name: String(form.get("name") || "").trim(),
          email: String(form.get("email") || "").trim(),
          password: String(form.get("password") || "").trim()
        };

        if (incomingRef) payload.referralCode = incomingRef;

        setStatus("Création du compte...");

        try {
          const data = await api("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(payload)
          });

          setToken(data.token);
          setUser(data.user);
          localStorage.removeItem(REF_KEY);

          setStatus("Compte créé.");
          await loadDashboard();
        } catch (error) {
          setStatus("Erreur création compte : " + error.message);
        }
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const form = new FormData(loginForm);

        const payload = {
          email: String(form.get("email") || "").trim(),
          password: String(form.get("password") || "").trim()
        };

        setStatus("Connexion...");

        try {
          const data = await api("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(payload)
          });

          setToken(data.token);
          setUser(data.user);

          setStatus("Connecté.");
          await loadDashboard();
        } catch (error) {
          setStatus("Erreur connexion : " + error.message);
        }
      });
    }
  }

  async function loadDashboard() {
    const app = $("#axisReferralApp");
    app.innerHTML = `<section class="axis-card"><h2>Chargement du registre...</h2><p>Lecture du compte, du code parrain, des filleuls et des commissions.</p></section>`;

    try {
      const data = await api("/api/referrals/me", { method: "GET" });
      renderDashboard(data);
    } catch (error) {
      app.innerHTML = `
        <section class="axis-card">
          <h2>Impossible de lire le registre</h2>
          <p>${error.message}</p>
          <button class="axis-btn" id="axisBackLogin">Revenir à la connexion</button>
        </section>
      `;

      const back = $("#axisBackLogin");
      if (back) {
        back.addEventListener("click", function () {
          localStorage.removeItem(TOKEN_KEY);
          init();
        });
      }
    }
  }

  function init() {
    const incomingRef = saveIncomingRef();

    if (getToken()) {
      loadDashboard();
    } else {
      renderLoggedOut(incomingRef);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();