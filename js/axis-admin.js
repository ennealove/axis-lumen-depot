// axis-admin.js — Administration parrainage & commissions
// 100 % localStorage, aucun serveur requis.
// Produits réels : accès à vie 1 090 € (unique) ou 4 × 272,50 € (en 4 fois).
// Commission : 20 % fixe = 218 € par vente complète.

(function () {
  "use strict";

  const REGISTRY_KEY    = "axis_referral_registry_v2";
  const COMMISSION_RATE = 0.20;

  const PRODUCTS = {
    lifetime: {
      id: "lifetime",
      label: "Accès à vie — 1 090 € (paiement unique)",
      amountCents: 109000
    },
    lifetime_4x_installment: {
      id: "lifetime_4x_installment",
      label: "Accès à vie — 272,50 € (1 versement / 4)",
      amountCents: 27250
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  function $(id) { return document.getElementById(id); }

  function euro(cents) {
    return (Number(cents || 0) / 100).toLocaleString("fr-FR", {
      style: "currency", currency: "EUR"
    });
  }

  function setStatus(id, text, ok) {
    const el = $(id);
    if (!el) return;
    el.textContent = text || "";
    el.classList.remove("ok", "bad");
    if (text) el.classList.add(ok ? "ok" : "bad");
  }

  // ── Registre localStorage ──────────────────────────────────────────────────
  function loadRegistry() {
    try {
      const raw = localStorage.getItem(REGISTRY_KEY);
      const reg = raw ? JSON.parse(raw) : {};
      return {
        users:       typeof reg.users === "object" && reg.users ? reg.users : {},
        commissions: Array.isArray(reg.commissions) ? reg.commissions : []
      };
    } catch { return { users: {}, commissions: [] }; }
  }

  function saveRegistry(reg) {
    try { localStorage.setItem(REGISTRY_KEY, JSON.stringify(reg)); } catch {}
  }

  // Enrichir le registre avec les utilisateurs connus d'axis-access-control.js
  function syncAccessUsers() {
    try {
      const raw = localStorage.getItem("axis_access_users_v1");
      if (!raw) return;
      const accessUsers = JSON.parse(raw);
      const reg = loadRegistry();
      let changed = false;

      Object.values(accessUsers).forEach(u => {
        if (!u.email) return;
        if (!reg.users[u.email]) {
          reg.users[u.email] = {
            email: u.email,
            name: u.displayName || u.email.split("@")[0],
            referralCode: reg.users[u.email]?.referralCode || generateCode(u.email),
            referredByCode: "",
            plan: u.subscription?.plan || "",
            purchaseAmountCents: u.subscription?.plan === "creator" ? 109000 : 0,
            createdAt: u.createdAt || new Date().toISOString()
          };
          changed = true;
        }
      });

      if (changed) saveRegistry(reg);
    } catch {}
  }

  function generateCode(email) {
    const login = (email.split("@")[0] || "USER")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 4);
    const rand = Math.random().toString(36).toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 4)
      .padEnd(4, "X");
    return login + rand;
  }

  // ── Rendus ─────────────────────────────────────────────────────────────────
  function renderKpis(reg) {
    const root = $("axisAdminKpis");
    if (!root) return;

    const users = Object.values(reg.users);
    const filleuls      = users.filter(u => u.referredByCode);
    const payableCents  = reg.commissions
      .filter(c => c.status !== "paid")
      .reduce((s, c) => s + (c.amountCents || 0), 0);
    const paidCents = reg.commissions
      .filter(c => c.status === "paid")
      .reduce((s, c) => s + (c.amountCents || 0), 0);

    root.innerHTML = [
      ["Clients",    users.length],
      ["Filleuls",   filleuls.length],
      ["À payer",    euro(payableCents)],
      ["Déjà payé",  euro(paidCents)]
    ].map(([label, val]) =>
      `<article class="axis-kpi"><strong>${val}</strong><span>${label}</span></article>`
    ).join("");
  }

  function renderUsers(reg) {
    const body = $("axisUsersBody");
    if (!body) return;

    const users = Object.values(reg.users);
    if (!users.length) {
      body.innerHTML = '<tr><td colspan="6">Aucun client inscrit.</td></tr>';
      return;
    }

    body.innerHTML = users.map((u, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${u.name || "—"}</td>
        <td>${u.email || "—"}</td>
        <td><span class="axis-pill">${u.referralCode || "—"}</span></td>
        <td>${u.referredByCode || "—"}</td>
        <td>${u.plan
          ? `${u.plan} · ${euro(u.purchaseAmountCents || 0)}`
          : "Non abonné"
        }</td>
      </tr>
    `).join("");
  }

  function renderCommissions(reg) {
    const body = $("axisCommissionsBody");
    if (!body) return;

    if (!reg.commissions.length) {
      body.innerHTML = '<tr><td colspan="7">Aucune commission générée.</td></tr>';
      return;
    }

    body.innerHTML = reg.commissions.map(c => `
      <tr>
        <td>${c.referrerEmail || "—"}<br>
            <span class="axis-pill">${c.referralCode || "—"}</span></td>
        <td>${c.referredEmail || "—"}</td>
        <td>${euro(c.saleAmountCents || 0)}<br>
            <span class="axis-pill">${c.plan || "—"}</span></td>
        <td><strong>${euro(c.amountCents || 0)}</strong><br>
            <span class="axis-pill">${Math.round((c.commissionRate || 0.20) * 100)} %</span></td>
        <td>${c.status === "paid" ? "✓ Réglée" : "Payable"}</td>
        <td>${c.createdAt
          ? new Date(c.createdAt).toLocaleDateString("fr-FR")
          : "—"
        }</td>
        <td>${c.status === "paid"
          ? "<span class='axis-pill'>Réglé</span>"
          : `<button class="axis-btn secondary" type="button" data-pay="${c.id}">Marquer payé</button>`
        }</td>
      </tr>
    `).join("");

    body.querySelectorAll("[data-pay]").forEach(btn => {
      btn.addEventListener("click", () => {
        const reg2 = loadRegistry();
        const comm = reg2.commissions.find(c => c.id === btn.dataset.pay);
        if (!comm) return;
        comm.status    = "paid";
        comm.paidAt    = new Date().toISOString();
        comm.payoutRef = "Règlement manuel " + new Date().toISOString();
        saveRegistry(reg2);
        load();
        setStatus("axisAdminStatus", `Commission de ${euro(comm.amountCents)} pour ${comm.referrerEmail} marquée comme payée.`, true);
      });
    });
  }

  // ── Chargement du registre ─────────────────────────────────────────────────
  function load() {
    syncAccessUsers();
    const reg = loadRegistry();
    renderKpis(reg);
    renderUsers(reg);
    renderCommissions(reg);

    const nb = Object.keys(reg.users).length;
    setStatus(
      "axisAdminStatus",
      `Registre chargé — ${nb} client${nb !== 1 ? "s" : ""}, ${reg.commissions.length} commission${reg.commissions.length !== 1 ? "s" : ""}.`,
      true
    );
  }

  // ── Simulation de paiement ─────────────────────────────────────────────────
  function simulatePayment() {
    const email   = $("axisSimEmail")?.value.trim();
    const planKey = $("axisSimPlan")?.value || "lifetime";
    const product = PRODUCTS[planKey] || PRODUCTS.lifetime;

    if (!email) {
      setStatus("axisSimStatus", "Indique l'email du filleul.", false);
      return;
    }

    syncAccessUsers();
    const reg = loadRegistry();

    // Créer l'utilisateur à la volée si inexistant
    if (!reg.users[email]) {
      reg.users[email] = {
        email,
        name: email.split("@")[0],
        referralCode: generateCode(email),
        referredByCode: "",
        createdAt: new Date().toISOString()
      };
    }

    const buyer = reg.users[email];
    buyer.plan                = product.id;
    buyer.purchaseAmountCents = product.amountCents;
    buyer.purchaseDate        = new Date().toISOString();

    // Chercher le parrain
    const referrerCode = buyer.referredByCode;
    if (!referrerCode) {
      saveRegistry(reg);
      load();
      setStatus("axisSimStatus",
        `Achat de ${euro(product.amountCents)} simulé pour ${email}. ` +
        `Aucun parrain rattaché — aucune commission générée.`, true);
      return;
    }

    const referrer = Object.values(reg.users).find(u => u.referralCode === referrerCode);
    if (!referrer) {
      saveRegistry(reg);
      load();
      setStatus("axisSimStatus",
        `Achat simulé. Code parrain "${referrerCode}" introuvable dans le registre.`, false);
      return;
    }

    const commissionCents = Math.round(product.amountCents * COMMISSION_RATE);

    reg.commissions.push({
      id:               "sim_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      referrerEmail:    referrer.email,
      referralCode:     referrerCode,
      referredEmail:    email,
      plan:             product.id,
      saleAmountCents:  product.amountCents,
      amountCents:      commissionCents,
      commissionRate:   COMMISSION_RATE,
      status:           "payable",
      createdAt:        new Date().toISOString(),
      simulated:        true
    });

    saveRegistry(reg);
    load();
    setStatus("axisSimStatus",
      `✓ Achat de ${euro(product.amountCents)} simulé pour ${email}. ` +
      `Commission de ${euro(commissionCents)} créée pour ${referrer.email} (20 %).`,
      true
    );
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    // Masquer les champs API (inutiles sans backend)
    ["axisAdminApi", "axisAdminToken"].forEach(id => {
      const el = $(id)?.closest?.(".axis-field");
      if (el) el.style.display = "none";
    });

    // Mettre à jour le sélecteur de plan avec les vrais prix
    const planSelect = $("axisSimPlan");
    if (planSelect) {
      planSelect.innerHTML = Object.values(PRODUCTS)
        .map(p => `<option value="${p.id}">${p.label}</option>`)
        .join("");
    }

    // Montant par défaut : 1 090 €
    const amountInput = $("axisSimAmount");
    if (amountInput) {
      amountInput.value = "1090";
      amountInput.style.display = "none"; // calculé automatiquement par le plan
      amountInput.closest?.(".axis-field")?.style &&
        (amountInput.closest(".axis-field").style.display = "none");
    }

    // Remplacer le label montant par une note explicative
    const simActions = $("axisSimulatePayment")?.closest?.(".axis-admin-actions");
    if (simActions && !simActions.querySelector(".axis-rate-note")) {
      const note = document.createElement("p");
      note.className = "axis-rate-note";
      note.style.cssText = "margin:0 0 12px;font-size:.84rem;opacity:.75;";
      note.innerHTML = "Commission automatique : <strong>20 %</strong> du montant sélectionné. " +
        "Paiement unique 1 090 € → <strong>218 €</strong>. " +
        "Un versement 272,50 € → <strong>54,50 €</strong>.";
      simActions.insertBefore(note, $("axisSimulatePayment"));
    }

    $("axisAdminLoad")?.addEventListener("click", load);
    $("axisSimulatePayment")?.addEventListener("click", simulatePayment);

    // Charger automatiquement au démarrage
    load();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
