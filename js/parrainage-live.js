// parrainage-live.js — Espace parrainage utilisateur
// 100 % localStorage, aucun serveur requis.
// Utilise la session d'axis-access-control.js (window.AxisAccess).
// Registre partagé avec axis-admin.js : axis_referral_registry_v2

(function () {
  "use strict";

  const REGISTRY_KEY    = "axis_referral_registry_v2";
  const COMMISSION_RATE = 0.20;
  const REF_PENDING_KEY = "axis_pending_referral_code";

  // ── Helpers ────────────────────────────────────────────────────────────────
  function $(sel) { return document.querySelector(sel); }

  function euro(cents) {
    return (Number(cents || 0) / 100).toLocaleString("fr-FR", {
      style: "currency", currency: "EUR"
    });
  }

  function generateCode(email) {
    const login = (email.split("@")[0] || "USER")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase()
      .slice(0, 4);
    // Seed déterministe basé sur l'email pour que le code soit stable
    let hash = 0;
    for (let i = 0; i < email.length; i++) hash = (hash * 31 + email.charCodeAt(i)) & 0xffff;
    const suffix = hash.toString(36).toUpperCase().padStart(4, "0").slice(0, 4);
    return login + suffix;
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

  function ensureUserEntry(email, displayName) {
    const reg = loadRegistry();
    if (!reg.users[email]) {
      reg.users[email] = {
        email,
        name:          displayName || email.split("@")[0],
        referralCode:  generateCode(email),
        referredByCode: localStorage.getItem(REF_PENDING_KEY) || "",
        createdAt:     new Date().toISOString()
      };
      saveRegistry(reg);
    } else if (!reg.users[email].referralCode) {
      reg.users[email].referralCode = generateCode(email);
      saveRegistry(reg);
    }
    return loadRegistry().users[email];
  }

  // ── Code de parrainage entrant ─────────────────────────────────────────────
  function getIncomingRef() {
    const url = new URL(window.location.href);
    return (
      url.searchParams.get("ref") ||
      url.searchParams.get("referral") ||
      url.searchParams.get("code") ||
      localStorage.getItem(REF_PENDING_KEY) ||
      ""
    ).trim();
  }

  function saveIncomingRef() {
    const ref = getIncomingRef();
    if (ref) localStorage.setItem(REF_PENDING_KEY, ref);
    return ref;
  }

  function referralLink(code) {
    const base = window.location.origin +
      (window.location.pathname.includes("parrainage") ? window.location.pathname : "/parrainage.html");
    return base + "?ref=" + encodeURIComponent(code);
  }

  // ── Rendu — non connecté ───────────────────────────────────────────────────
  function renderLoggedOut(incomingRef) {
    const app = $("#axisReferralApp");
    if (!app) return;

    app.innerHTML = `
      <div class="axis-ref-grid">
        <section class="axis-card">
          <h2>Espace parrainage</h2>
          <p>
            Connectez-vous avec votre compte Axis Lumen pour accéder à votre lien de parrainage,
            suivre vos filleuls et vos commissions.
          </p>

          ${incomingRef ? `
            <div class="axis-status" style="margin:16px 0;padding:12px 16px;background:rgba(216,180,95,.10);
              border:1px solid rgba(216,180,95,.28);border-radius:10px;">
              Code parrain détecté : <strong>${incomingRef}</strong>
              <br><small>Il sera associé à votre compte après connexion.</small>
            </div>
          ` : ""}

          <a class="axis-btn primary" href="login.html" style="display:inline-block;margin-top:18px;">
            Se connecter →
          </a>
          <p style="margin-top:12px;font-size:.84rem;opacity:.7;">
            Pas encore de compte ?
            <a href="login.html" style="color:var(--axis-gold-soft,#d8b45f);">Créer un compte →</a>
          </p>
        </section>

        <section class="axis-card">
          <h2>Commission par filleul</h2>
          <p>Taux fixe <strong>20 %</strong> — identique quelle que soit la modalité de paiement choisie.</p>

          <div class="axis-ref-rate" style="margin-top:18px;display:grid;gap:12px;">
            <div class="axis-ref-rate-card" style="padding:16px;background:rgba(216,180,95,.07);
              border:1px solid rgba(216,180,95,.20);border-radius:12px;">
              <strong style="font-size:1.6rem;color:#ffe7a3;">218 €</strong>
              <span style="display:block;font-size:.82rem;opacity:.7;margin-top:4px;">
                Paiement unique — 1 090 × 20 %
              </span>
            </div>
            <div class="axis-ref-rate-card" style="padding:16px;background:rgba(216,180,95,.07);
              border:1px solid rgba(216,180,95,.20);border-radius:12px;">
              <strong style="font-size:1.6rem;color:#ffe7a3;">4 × 54,50 €</strong>
              <span style="display:block;font-size:.82rem;opacity:.7;margin-top:4px;">
                Paiement en 4 fois — 272,50 × 20 % par versement = 218 € total
              </span>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  // ── Rendu — tableau de bord connecté ──────────────────────────────────────
  function renderDashboard(accessState) {
    const app = $("#axisReferralApp");
    if (!app) return;

    const email       = accessState.user.email;
    const displayName = accessState.user.displayName || email.split("@")[0];

    const entry     = ensureUserEntry(email, displayName);
    const code      = entry.referralCode;
    const link      = referralLink(code);
    const reg       = loadRegistry();

    const myFilleuls    = Object.values(reg.users).filter(u => u.referredByCode === code);
    const myCommissions = reg.commissions.filter(c =>
      c.referrerEmail === email || c.referralCode === code
    );

    const payableCents = myCommissions
      .filter(c => c.status !== "paid")
      .reduce((s, c) => s + (c.amountCents || 0), 0);
    const paidCents = myCommissions
      .filter(c => c.status === "paid")
      .reduce((s, c) => s + (c.amountCents || 0), 0);

    app.innerHTML = `
      <div class="axis-ref-grid">

        <section class="axis-card">
          <h2>Votre lien de parrainage</h2>
          <p>
            Partagez ce lien. Pour chaque filleul qui achète l'accès à vie,
            vous recevez automatiquement <strong>218 €</strong>.
          </p>
          <div style="margin-top:18px;">
            <div style="font-size:1.4rem;font-weight:900;letter-spacing:.12em;
              color:#ffe7a3;padding:14px 18px;background:rgba(216,180,95,.10);
              border:1px solid rgba(216,180,95,.28);border-radius:12px;
              text-align:center;">${code}</div>
            <div id="axisReferralLink" style="margin-top:8px;font-size:.8rem;
              opacity:.65;word-break:break-all;text-align:center;">${link}</div>
            <button class="axis-btn primary" id="axisCopyReferral"
              style="display:block;width:100%;margin-top:14px;">
              Copier mon lien
            </button>
          </div>
        </section>

        <section class="axis-card">
          <h2>Suivi des commissions</h2>
          <div class="axis-summary" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px;">
            <div class="axis-summary-card" style="text-align:center;padding:14px;
              background:rgba(255,255,255,.04);border-radius:12px;">
              <span style="display:block;font-size:.76rem;opacity:.6;text-transform:uppercase;
                letter-spacing:.08em;">Filleuls</span>
              <strong style="font-size:1.6rem;color:#ffe7a3;">${myFilleuls.length}</strong>
            </div>
            <div class="axis-summary-card" style="text-align:center;padding:14px;
              background:rgba(255,255,255,.04);border-radius:12px;">
              <span style="display:block;font-size:.76rem;opacity:.6;text-transform:uppercase;
                letter-spacing:.08em;">Payable</span>
              <strong style="font-size:1.3rem;color:#ffe7a3;">${euro(payableCents)}</strong>
            </div>
            <div class="axis-summary-card" style="text-align:center;padding:14px;
              background:rgba(255,255,255,.04);border-radius:12px;">
              <span style="display:block;font-size:.76rem;opacity:.6;text-transform:uppercase;
                letter-spacing:.08em;">Perçu</span>
              <strong style="font-size:1.3rem;color:#ffe7a3;">${euro(paidCents)}</strong>
            </div>
          </div>
          <p style="font-size:.83rem;opacity:.7;line-height:1.6;">
            Commission fixe <strong>20 %</strong>. Accès à vie 1 090 € → <strong>218 €</strong>.
            Paiement en 4 fois : <strong>54,50 €</strong> par versement (= 218 € total).
            Aucun plafond, aucune expiration.
          </p>
        </section>
      </div>

      <section class="axis-card" style="margin-top:24px;">
        <h2>Filleuls (${myFilleuls.length})</h2>
        ${myFilleuls.length ? `
          <table class="axis-table" style="width:100%;border-collapse:collapse;margin-top:14px;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Nom</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Email</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Date</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Achat</th>
              </tr>
            </thead>
            <tbody>
              ${myFilleuls.map(f => `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${f.name || "—"}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${f.email || "—"}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${
                    f.createdAt ? new Date(f.createdAt).toLocaleDateString("fr-FR") : "—"
                  }</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${
                    f.plan ? `${f.plan} · ${euro(f.purchaseAmountCents || 0)}` : "Pas encore acheté"
                  }</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `
          <p style="opacity:.65;margin-top:12px;">
            Aucun filleul pour le moment. Partagez votre lien pour démarrer.
          </p>
        `}
      </section>

      <section class="axis-card" style="margin-top:24px;">
        <h2>Commissions (${myCommissions.length})</h2>
        ${myCommissions.length ? `
          <table class="axis-table" style="width:100%;border-collapse:collapse;margin-top:14px;">
            <thead>
              <tr>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Filleul</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Vente</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Commission</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Statut</th>
                <th style="padding:10px 12px;text-align:left;border-bottom:1px solid rgba(216,180,95,.15);">Date</th>
              </tr>
            </thead>
            <tbody>
              ${myCommissions.map(c => `
                <tr>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${c.referredEmail || "—"}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${euro(c.saleAmountCents)}</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);"><strong>${euro(c.amountCents)}</strong></td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${
                    c.status === "paid"
                      ? '<span style="color:#8de0b3;">✓ Réglée</span>'
                      : '<span style="color:#d8b45f;">Payable</span>'
                  }</td>
                  <td style="padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.05);">${
                    c.createdAt ? new Date(c.createdAt).toLocaleDateString("fr-FR") : "—"
                  }</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        ` : `
          <p style="opacity:.65;margin-top:12px;">
            Aucune commission enregistrée. Les commissions apparaissent dès qu'un filleul
            achète l'accès à vie et que l'achat est confirmé (simulation ou Stripe).
          </p>
        `}
      </section>
    `;

    // Copier le lien
    const copyBtn = $("#axisCopyReferral");
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(link);
          copyBtn.textContent = "✓ Lien copié !";
          setTimeout(() => { copyBtn.textContent = "Copier mon lien"; }, 1800);
        } catch {
          // Fallback si clipboard non disponible (file://)
          copyBtn.textContent = "Lien : " + code;
        }
      });
    }
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    const incomingRef = saveIncomingRef();

    // Si l'utilisateur est connecté via axis-access-control.js → afficher son tableau de bord
    if (window.AxisAccess && typeof window.AxisAccess.getAccessState === "function") {
      const access = window.AxisAccess.getAccessState();
      if (access.authenticated && access.user) {
        renderDashboard(access);
        return;
      }
    }

    // Non connecté → formulaire d'invitation à se connecter
    renderLoggedOut(incomingRef);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
