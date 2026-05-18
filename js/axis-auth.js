(function () {
  const DEFAULT_API = "http://127.0.0.1:8787";

  function $(id) {
    return document.getElementById(id);
  }

  function apiBase() {
    return localStorage.getItem("axis_api_base") || DEFAULT_API;
  }

  function setStatus(id, text, ok) {
    const el = $(id);
    if (!el) return;

    el.textContent = text || "";
    el.classList.remove("ok", "bad");

    if (text) {
      el.classList.add(ok ? "ok" : "bad");
    }
  }

  function getRefFromUrl() {
    const params = new URLSearchParams(window.location.search);

    return (
      params.get("ref") ||
      params.get("parrain") ||
      params.get("code") ||
      params.get("referral") ||
      ""
    ).trim();
  }

  async function postJson(path, body) {
    const response = await fetch(apiBase() + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body || {})
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.ok === false) {
      throw new Error(data.error || data.message || "Erreur API");
    }

    return data;
  }

  function saveSession(data) {
    if (!data || !data.token) return;

    localStorage.setItem("axis_auth_token", data.token);
    localStorage.setItem("axis_user", JSON.stringify(data.user || {}));

    if (data.referral && data.referral.code) {
      localStorage.setItem("axis_referral_code", data.referral.code);
    }
  }

  function bindTabs() {
    document.querySelectorAll("[data-axis-auth-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        const target = button.getAttribute("data-axis-auth-tab");

        document.querySelectorAll("[data-axis-auth-tab]").forEach(function (b) {
          b.classList.toggle("active", b === button);
        });

        document.querySelectorAll(".axis-auth-form").forEach(function (form) {
          form.classList.toggle("active", form.id.toLowerCase().includes(target));
        });
      });
    });
  }

  function bindLogin() {
    const form = $("axisLoginForm");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      setStatus("axisLoginStatus", "Connexion en cours...", true);

      const email    = ($("axisLoginEmail")?.value    || "").trim();
      const password = ($("axisLoginPassword")?.value || "").trim();

      // ── Essayer d'abord le système local (axis-access-control.js) ──────────
      // Fonctionne pour l'admin et les abonnés locaux, sans serveur backend.
      if (window.AxisAccess && typeof window.AxisAccess.login === "function") {
        try {
          const localResult = await window.AxisAccess.login(email, password);
          if (localResult && localResult.ok) {
            setStatus("axisLoginStatus", localResult.message || "Connexion réussie. Redirection...", true);
            setTimeout(function () {
              // Admin → apprendre.html, abonné → parrainage.html
              const dest = (localResult.user && localResult.user.role === "admin")
                ? "apprendre.html"
                : "parrainage.html";
              window.location.href = dest;
            }, 700);
            return; // ne pas appeler l'API
          }
          // Compte non trouvé localement → tenter l'API
        } catch (_) { /* continuer vers l'API */ }
      }

      // ── Fallback : API backend (optionnel, serveur local 8787) ───────────
      try {
        const data = await postJson("/api/auth/login", { email, password });

        saveSession(data);

        setStatus("axisLoginStatus", "Connexion réussie. Redirection...", true);

        setTimeout(function () {
          window.location.href = "parrainage.html";
        }, 700);
      } catch (error) {
        setStatus("axisLoginStatus", "Connexion impossible : " + error.message, false);
      }
    });
  }

  function bindRegister() {
    const form = $("axisRegisterForm");
    if (!form) return;

    const ref = getRefFromUrl();

    if (ref && $("axisRegisterReferral")) {
      $("axisRegisterReferral").value = ref;
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      setStatus("axisRegisterStatus", "Création du compte...", true);

      try {
        const data = await postJson("/api/auth/register", {
          name: $("axisRegisterName").value,
          email: $("axisRegisterEmail").value,
          password: $("axisRegisterPassword").value,
          referralCode: $("axisRegisterReferral").value
        });

        saveSession(data);

        const code = data.referral && data.referral.code ? data.referral.code : "";

        setStatus("axisRegisterStatus", "Compte créé. Code parrain : " + code, true);

        setTimeout(function () {
          window.location.href = "parrainage.html";
        }, 900);
      } catch (error) {
        setStatus("axisRegisterStatus", "Inscription impossible : " + error.message, false);
      }
    });
  }

  function init() {
    bindTabs();
    bindLogin();
    bindRegister();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();