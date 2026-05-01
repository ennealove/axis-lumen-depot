(() => {
  "use strict";

  function qs(selector) {
    return document.querySelector(selector);
  }

  function currentEmail() {
    const user = window.AxisAccess?.getCurrentUser?.();
    return user?.email || "";
  }

  function createActivationPanel() {
    const target = qs(".actions") || qs(".hero") || document.body;
    if (!target || document.getElementById("axisSuccessAccessPanel")) return;

    const plan = window.AxisAccess?.getPendingPlan?.() || localStorage.getItem("axis_pending_subscription_plan") || "monthly";
    const email = currentEmail();

    const panel = document.createElement("div");
    panel.id = "axisSuccessAccessPanel";
    panel.style.cssText = [
      "margin-top:18px",
      "padding:18px",
      "border:1px solid rgba(216,180,95,.25)",
      "border-radius:18px",
      "background:rgba(5,9,18,.82)",
      "color:#f4ecd8",
      "max-width:620px"
    ].join(";");

    panel.innerHTML = `
      <strong style="display:block;margin-bottom:8px;color:#ffe7a3;">Activation de l’accès abonné</strong>
      <p style="margin:0 0 12px;color:rgba(244,236,216,.76);line-height:1.5;">
        Cette activation locale relie la page de paiement validé au parcours Apprendre.
        En production, elle devra être remplacée par un webhook Stripe sécurisé.
      </p>
      <label style="display:grid;gap:6px;margin-bottom:10px;">
        <span>Email du compte abonné</span>
        <input id="axisSuccessEmail" type="email" value="${email}" placeholder="email@exemple.com"
          style="padding:12px;border-radius:12px;border:1px solid rgba(216,180,95,.22);background:#050912;color:#f4ecd8;">
      </label>
      <button id="axisSuccessActivate" type="button"
        style="padding:12px 16px;border-radius:999px;border:0;background:linear-gradient(135deg,#d8b45f,#f4d986);color:#11131a;font-weight:900;cursor:pointer;">
        Activer mon accès abonné
      </button>
      <p id="axisSuccessAccessStatus" style="margin:10px 0 0;color:rgba(244,236,216,.76);"></p>
    `;

    target.appendChild(panel);

    const activate = panel.querySelector("#axisSuccessActivate");
    const status = panel.querySelector("#axisSuccessAccessStatus");
    const emailInput = panel.querySelector("#axisSuccessEmail");

    activate.addEventListener("click", () => {
      if (!window.AxisAccess) {
        status.textContent = "Module d’accès introuvable.";
        return;
      }

      const result = window.AxisAccess.activateSubscriber(emailInput.value, plan);

      if (result.ok) {
        status.textContent = "Accès activé. Redirection vers Apprendre...";
        setTimeout(() => {
          window.location.href = "apprendre.html";
        }, 900);
      } else {
        status.textContent = result.message || "Activation impossible.";
      }
    });

    if (email && window.AxisAccess && !window.AxisAccess.isAdmin()) {
      const result = window.AxisAccess.activateSubscriber(email, plan);
      if (result.ok) {
        status.textContent = "Accès abonné activé automatiquement.";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", createActivationPanel);
})();
