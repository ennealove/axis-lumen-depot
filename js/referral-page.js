(function () {
  "use strict";

  const STORAGE_KEY = "axis_lumen_referral_local_v1";
  const DEFAULT_MONTHLY_PRICE = 19;
  const DEFAULT_RATE = 0.20;

  function $(selector) {
    return document.querySelector(selector);
  }

  function money(value) {
    const n = Number(value || 0);
    return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
  }

  function makeCode() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed.code) return parsed.code;
    } catch (_) {}

    const code = "AXIS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ code }));
    return code;
  }

  function ensurePanel() {
    const page = document.getElementById("parrainage");
    if (!page) return;

    if (document.getElementById("referralPatchPanel")) return;

    page.insertAdjacentHTML("beforeend", `
      <article class="card" id="referralPatchPanel">
        <div class="section-head">
          <div>
            <div class="eyebrow">Calcul restauré</div>
            <h3>Code, lien et commission</h3>
            <p class="muted">Ce bloc reste fonctionnel même sans backend. Si le backend Node/Express est lancé sur 8787, il tentera de charger les vraies données.</p>
          </div>
        </div>
        <div class="status-grid">
          <div><span>Code parrain</span><strong id="referralCode">AXIS</strong></div>
          <div><span>Filleuls</span><strong id="referralCount">0</strong></div>
          <div><span>Actifs</span><strong id="referralActiveCount">0</strong></div>
          <div><span>Commission estimée</span><strong id="referralCommission">0 € / mois</strong></div>
          <div><span>Crédits</span><strong id="referralCredit">0 €</strong></div>
          <div><span>Stripe</span><strong>Prêt</strong></div>
        </div>
        <label class="stacked">
          <span>Lien de parrainage</span>
          <input id="referralLink" readonly value="">
        </label>
        <div class="grid compact-grid">
          <label class="stacked">
            <span>Filleuls actifs simulés</span>
            <input id="refActiveInput" type="number" min="0" step="1" value="0">
          </label>
          <label class="stacked">
            <span>Prix abonnement mensuel</span>
            <input id="refPriceInput" type="number" min="0" step="1" value="19">
          </label>
        </div>
        <div class="button-row">
          <button id="copyReferralLink" class="secondary-btn">Copier le lien</button>
          <button id="refreshReferralCalc" class="secondary-btn">Recalculer</button>
        </div>
        <div class="note-box" id="referralHistory">Système prêt pour Stripe : remise filleul, crédit parrain, commission mensuelle et historique.</div>
      </article>
    `);
  }

  function calculate(active, price) {
    return Number(active || 0) * Number(price || DEFAULT_MONTHLY_PRICE) * DEFAULT_RATE;
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function setValue(id, value) {
    const node = document.getElementById(id);
    if (node) node.value = value;
  }

  function localRender(data) {
    const code = data && data.code ? data.code : makeCode();
    const active = Number(data && (data.activeReferrals ?? data.active ?? data.active_count) || 0);
    const count = Number(data && (data.totalReferrals ?? data.count ?? data.total_count) || active || 0);
    const credit = Number(data && (data.credit ?? data.credits ?? 0) || 0);
    const priceInput = document.getElementById("refPriceInput");
    const activeInput = document.getElementById("refActiveInput");
    const price = Number(priceInput && priceInput.value ? priceInput.value : DEFAULT_MONTHLY_PRICE);
    const activeForCalc = activeInput && activeInput.value !== "" ? Number(activeInput.value) : active;
    const commission = calculate(activeForCalc, price);

    const url = new URL(window.location.href);
    url.search = "?ref=" + encodeURIComponent(code);

    setText("referralCode", code);
    setText("referralCount", String(count));
    setText("referralActiveCount", String(activeForCalc));
    setText("referralCommission", money(commission) + " / mois");
    setText("referralCredit", money(credit));
    setValue("referralLink", url.toString());

    const history = document.getElementById("referralHistory");
    if (history && data && Array.isArray(data.history) && data.history.length) {
      history.innerHTML = data.history.map(item => `<div>${String(item.date || "")} — ${String(item.label || item.type || "Mouvement")} — ${String(item.amount || "")}</div>`).join("");
    }
  }

  async function tryLoadBackend() {
    const candidates = [
      "/api/referrals/me",
      "http://localhost:8787/api/referrals/me"
    ];

    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: "no-store", credentials: "include" });
        if (!res.ok) continue;
        const data = await res.json();
        localRender(data || {});
        return true;
      } catch (_) {}
    }

    return false;
  }

  function bind() {
    const copy = document.getElementById("copyReferralLink");
    if (copy) {
      copy.addEventListener("click", async () => {
        const input = document.getElementById("referralLink");
        if (!input) return;
        try {
          await navigator.clipboard.writeText(input.value);
          copy.textContent = "Lien copié";
          setTimeout(() => { copy.textContent = "Copier le lien"; }, 1200);
        } catch (_) {
          input.select();
          document.execCommand("copy");
        }
      });
    }

    ["refActiveInput", "refPriceInput", "refreshReferralCalc"].forEach(id => {
      const node = document.getElementById(id);
      if (node) {
        node.addEventListener("input", () => localRender({ code: makeCode() }));
        node.addEventListener("click", () => localRender({ code: makeCode() }));
      }
    });
  }

  document.addEventListener("DOMContentLoaded", async () => {
    ensurePanel();
    localRender({ code: makeCode() });
    bind();
    await tryLoadBackend();
  });
})();