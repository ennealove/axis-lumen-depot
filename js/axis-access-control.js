(() => {
  "use strict";

  const CONFIG = {
    adminEmail: "michaelchauvet432@gmail.com",
    adminPasswordHash: "76051d3859f67d8f70b341f42cb2d127c55da1b204a8fe19dd72af0233cb837b",
    adminPasswordHash2: "8402b3a5bd2adec399cb27114b57c4572423ad3fcdb605166b1ff50423f9782c", // ancien
    unlockDelayDays: 4,
    appName: "Axis Lumen Studio"
  };

  const USERS_KEY = "axis_access_users_v1";
  const SESSION_KEY = "axis_access_session_v1";
  const PENDING_PLAN_KEY = "axis_pending_subscription_plan";

  function nowIso() {
    return new Date().toISOString();
  }

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function loadUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const users = raw ? JSON.parse(raw) : {};
      return users && typeof users === "object" ? users : {};
    } catch {
      return {};
    }
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users || {}));
  }

  function seedCreatorAccount() {
    const users = loadUsers();
    const email = normalizeEmail(CONFIG.adminEmail);

    users[email] = {
      email,
      role: "admin",
      displayName: "Michael Chauvet",
      passwordHash: CONFIG.adminPasswordHash,
      createdAt: users[email]?.createdAt || nowIso(),
      updatedAt: nowIso(),
      subscription: {
        status: "creator",
        plan: "creator",
        startDate: "2026-05-01T00:00:00.000Z",
        unlimited: true
      }
    };

    saveUsers(users);
  }

  async function sha256(text) {
    const data = new TextEncoder().encode(String(text || ""));
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      const session = raw ? JSON.parse(raw) : null;
      if (!session || !session.email) return null;
      return session;
    } catch {
      return null;
    }
  }

  function setSession(user) {
    const session = {
      email: normalizeEmail(user.email),
      role: user.role || "subscriber",
      loginAt: nowIso()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent("axis-access-change", { detail: session }));
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("axis-access-change", { detail: null }));
  }

  function getCurrentUser() {
    seedCreatorAccount();

    const session = getSession();
    if (!session) return null;

    const users = loadUsers();
    return users[normalizeEmail(session.email)] || null;
  }

  async function login(email, password) {
    seedCreatorAccount();

    const cleanEmail = normalizeEmail(email);
    const users = loadUsers();
    const user = users[cleanEmail];

    if (!user) {
      return {
        ok: false,
        message: "Compte introuvable. Abonne-toi ou utilise le compte créateur."
      };
    }

    if (user.role === "admin") {
      const hash = await sha256(password);
      if (hash !== user.passwordHash) {
        return {
          ok: false,
          message: "Mot de passe admin incorrect."
        };
      }

      setSession(user);
      return {
        ok: true,
        user,
        message: "Connexion créateur validée. Accès total débloqué."
      };
    }

    if (user.role === "subscriber") {
      if (user.passwordHash) {
        const hash = await sha256(password);
        if (hash !== user.passwordHash) {
          return {
            ok: false,
            message: "Mot de passe incorrect."
          };
        }
      }

      setSession(user);
      return {
        ok: true,
        user,
        message: "Connexion abonné validée."
      };
    }

    return {
      ok: false,
      message: "Rôle non reconnu."
    };
  }

  async function createSubscriberAccount(email, password, plan = "monthly") {
    seedCreatorAccount();

    const cleanEmail = normalizeEmail(email);
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return {
        ok: false,
        message: "Email invalide."
      };
    }

    const users = loadUsers();
    const existing = users[cleanEmail] || {};
    const passwordHash = password ? await sha256(password) : existing.passwordHash || "";

    users[cleanEmail] = {
      email: cleanEmail,
      role: "subscriber",
      displayName: existing.displayName || cleanEmail.split("@")[0],
      passwordHash,
      createdAt: existing.createdAt || nowIso(),
      updatedAt: nowIso(),
      subscription: {
        status: "active",
        plan,
        startDate: existing.subscription?.startDate || nowIso(),
        paidAt: nowIso(),
        unlimited: false
      }
    };

    saveUsers(users);
    setSession(users[cleanEmail]);

    return {
      ok: true,
      user: users[cleanEmail],
      message: "Abonnement local activé. Le calendrier de progression commence maintenant."
    };
  }

  function activateSubscriber(email, plan = "monthly") {
    seedCreatorAccount();

    const cleanEmail = normalizeEmail(email);
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return {
        ok: false,
        message: "Email invalide."
      };
    }

    const users = loadUsers();
    const existing = users[cleanEmail] || {};

    users[cleanEmail] = {
      email: cleanEmail,
      role: "subscriber",
      displayName: existing.displayName || cleanEmail.split("@")[0],
      passwordHash: existing.passwordHash || "",
      createdAt: existing.createdAt || nowIso(),
      updatedAt: nowIso(),
      subscription: {
        status: "active",
        plan,
        startDate: existing.subscription?.startDate || nowIso(),
        paidAt: nowIso(),
        unlimited: false
      }
    };

    saveUsers(users);
    setSession(users[cleanEmail]);

    return {
      ok: true,
      user: users[cleanEmail],
      message: "Accès abonné activé."
    };
  }

  function isAdmin() {
    const user = getCurrentUser();
    return !!user && user.role === "admin";
  }

  function isSubscriber() {
    const user = getCurrentUser();
    if (!user) return false;
    if (user.role === "admin") return true;
    return user.role === "subscriber" && user.subscription?.status === "active";
  }

  function getAccessState() {
    const user = getCurrentUser();

    if (!user) {
      return {
        authenticated: false,
        role: "visitor",
        user: null,
        isAdmin: false,
        isSubscriber: false,
        subscriptionStart: null
      };
    }

    return {
      authenticated: true,
      role: user.role,
      user,
      isAdmin: user.role === "admin",
      isSubscriber: user.role === "admin" || user.subscription?.status === "active",
      subscriptionStart: user.subscription?.startDate || null
    };
  }

  function getCourseSchedule(courseNumber) {
    const access = getAccessState();

    if (access.isAdmin) {
      return {
        allowedByDate: true,
        plannedDate: null,
        daysLeft: 0,
        label: "Accès créateur"
      };
    }

    if (!access.isSubscriber || !access.subscriptionStart) {
      return {
        allowedByDate: false,
        plannedDate: null,
        daysLeft: null,
        label: "Abonnement requis"
      };
    }

    const start = new Date(access.subscriptionStart).getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    const planned = start + ((Math.max(1, Number(courseNumber)) - 1) * CONFIG.unlockDelayDays * dayMs);
    const now = Date.now();
    const diff = planned - now;
    const daysLeft = diff <= 0 ? 0 : Math.ceil(diff / dayMs);

    return {
      allowedByDate: daysLeft <= 0,
      plannedDate: new Date(planned).toISOString(),
      daysLeft,
      label: daysLeft <= 0 ? "Disponible" : `Disponible dans ${daysLeft} jour${daysLeft > 1 ? "s" : ""}`
    };
  }

  function setPendingPlan(plan) {
    localStorage.setItem(PENDING_PLAN_KEY, String(plan || "monthly"));
  }

  function getPendingPlan() {
    return localStorage.getItem(PENDING_PLAN_KEY) || "monthly";
  }

  function logout() {
    clearSession();
  }

  seedCreatorAccount();

  window.AxisAccess = {
    config: CONFIG,
    seedCreatorAccount,
    login,
    logout,
    getCurrentUser,
    getAccessState,
    getCourseSchedule,
    createSubscriberAccount,
    activateSubscriber,
    isAdmin,
    isSubscriber,
    setPendingPlan,
    getPendingPlan
  };

  // Raccourcis globaux pour les scripts qui appelleraient directement window.login / window.isAdmin
  window.login   = login;
  window.isAdmin = isAdmin;
})();
