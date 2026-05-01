(function () {
  function $(id) {
    return document.getElementById(id);
  }

  function cents(value) {
    return Number(value || 0);
  }

  function euro(value) {
    return (cents(value) / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR"
    });
  }

  function apiBase() {
    return ($("axisAdminApi") && $("axisAdminApi").value.trim()) || "http://127.0.0.1:8787";
  }

  function adminToken() {
    return ($("axisAdminToken") && $("axisAdminToken").value.trim()) || "AXIS_ADMIN_LOCAL";
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

  async function request(path, options) {
    const response = await fetch(apiBase() + path, Object.assign({
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + adminToken()
      }
    }, options || {}));

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.ok === false) {
      throw new Error(data.error || data.message || "Erreur API");
    }

    return data;
  }

  function renderKpis(summary) {
    const root = $("axisAdminKpis");
    if (!root) return;

    root.innerHTML = [
      ["Clients", summary.users || 0],
      ["Filleuls", summary.referrals || 0],
      ["À payer", euro(summary.payableCents || 0)],
      ["Déjà payé", euro(summary.paidCents || 0)]
    ].map(function (item) {
      return '<article class="axis-kpi"><strong>' + item[1] + '</strong><span>' + item[0] + '</span></article>';
    }).join("");
  }

  function renderUsers(users) {
    const body = $("axisUsersBody");
    if (!body) return;

    if (!users || !users.length) {
      body.innerHTML = '<tr><td colspan="6">Aucun client inscrit.</td></tr>';
      return;
    }

    body.innerHTML = users.map(function (user) {
      return [
        "<tr>",
        "<td>" + (user.clientNumber || "—") + "</td>",
        "<td>" + (user.name || "—") + "</td>",
        "<td>" + (user.email || "—") + "</td>",
        "<td><span class='axis-pill'>" + (user.referralCode || "—") + "</span></td>",
        "<td>" + (user.referredByCode || "—") + "</td>",
        "<td>" + (user.subscriptionStatus || "inactive") + "</td>",
        "</tr>"
      ].join("");
    }).join("");
  }

  function renderCommissions(commissions) {
    const body = $("axisCommissionsBody");
    if (!body) return;

    if (!commissions || !commissions.length) {
      body.innerHTML = '<tr><td colspan="7">Aucune commission générée.</td></tr>';
      return;
    }

    body.innerHTML = commissions.map(function (commission) {
      const canPay = commission.status !== "paid";

      return [
        "<tr>",
        "<td>" + (commission.referrerEmail || "—") + "<br><span class='axis-pill'>" + (commission.referralCode || "—") + "</span></td>",
        "<td>" + (commission.referredEmail || "—") + "</td>",
        "<td>" + euro(commission.saleAmountCents || 0) + "<br><span class='axis-pill'>" + (commission.plan || "—") + "</span></td>",
        "<td><strong>" + euro(commission.amountCents || 0) + "</strong><br><span class='axis-pill'>" + Math.round(Number(commission.commissionRate || 0) * 100) + "%</span></td>",
        "<td>" + (commission.status || "—") + "</td>",
        "<td>" + (commission.createdAt || "—") + "</td>",
        "<td>" + (canPay ? "<button class='axis-btn secondary' type='button' data-pay='" + commission.id + "'>Marquer payé</button>" : "<span class='axis-pill'>Réglé</span>") + "</td>",
        "</tr>"
      ].join("");
    }).join("");

    body.querySelectorAll("[data-pay]").forEach(function (button) {
      button.addEventListener("click", async function () {
        const id = button.getAttribute("data-pay");

        try {
          await request("/api/admin/commissions/" + encodeURIComponent(id) + "/pay", {
            method: "PATCH",
            body: JSON.stringify({
              payoutReference: "Règlement manuel " + new Date().toISOString()
            })
          });

          setStatus("axisAdminStatus", "Commission marquée comme payée.", true);
          load();
        } catch (error) {
          setStatus("axisAdminStatus", "Erreur paiement : " + error.message, false);
        }
      });
    });
  }

  async function load() {
    setStatus("axisAdminStatus", "Chargement du registre...", true);

    try {
      localStorage.setItem("axis_admin_api", apiBase());
      localStorage.setItem("axis_admin_token", adminToken());

      const data = await request("/api/admin/referral-summary");

      renderKpis(data.summary || {});
      renderUsers(data.users || []);
      renderCommissions(data.commissions || []);

      setStatus("axisAdminStatus", "Registre chargé.", true);
    } catch (error) {
      setStatus("axisAdminStatus", "Impossible de charger le registre : " + error.message, false);
    }
  }

  async function simulatePayment() {
    const email = $("axisSimEmail").value.trim();
    const amountEuros = Number($("axisSimAmount").value || 0);
    const plan = $("axisSimPlan").value;

    if (!email) {
      setStatus("axisSimStatus", "Indique l’email du filleul.", false);
      return;
    }

    setStatus("axisSimStatus", "Simulation du paiement...", true);

    try {
      const data = await request("/api/test/simulate-payment", {
        method: "POST",
        body: JSON.stringify({
          email,
          amountCents: Math.round(amountEuros * 100),
          plan
        })
      });

      if (data.commission) {
        setStatus("axisSimStatus", "Paiement simulé. Commission créée : " + euro(data.commission.amountCents), true);
      } else {
        setStatus("axisSimStatus", "Paiement simulé, mais aucune commission : le client n’a peut-être pas de parrain.", false);
      }

      load();
    } catch (error) {
      setStatus("axisSimStatus", "Simulation impossible : " + error.message, false);
    }
  }

  function init() {
    if ($("axisAdminApi")) {
      $("axisAdminApi").value = localStorage.getItem("axis_admin_api") || "http://127.0.0.1:8787";
    }

    if ($("axisAdminToken")) {
      $("axisAdminToken").value = localStorage.getItem("axis_admin_token") || "AXIS_ADMIN_LOCAL";
    }

    if ($("axisAdminLoad")) {
      $("axisAdminLoad").addEventListener("click", load);
    }

    if ($("axisSimulatePayment")) {
      $("axisSimulatePayment").addEventListener("click", simulatePayment);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();