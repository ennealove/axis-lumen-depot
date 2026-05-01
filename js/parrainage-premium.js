(function () {
  function euro(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(value || 0);
  }

  function calculate() {
    const monthlyCount = Number(document.getElementById("refMonthlyCount")?.value || 0);
    const annualCount = Number(document.getElementById("refAnnualCount")?.value || 0);
    const rate = Number(document.getElementById("refRate")?.value || 20) / 100;

    const monthlyPrice = 19;
    const annualPrice = 190;

    const monthlyCommission = monthlyCount * monthlyPrice * rate;
    const annualCommission = annualCount * annualPrice * rate;
    const firstMonthTotal = monthlyCommission + annualCommission;
    const annualProjection = (monthlyCommission * 12) + annualCommission;

    const set = function (id, value) {
      const el = document.getElementById(id);
      if (el) el.textContent = euro(value);
    };

    set("monthlyCommission", monthlyCommission);
    set("annualCommission", annualCommission);
    set("firstMonthTotal", firstMonthTotal);
    set("annualProjection", annualProjection);
  }

  function makeCode() {
    const el = document.getElementById("refCode");
    if (!el) return;

    const saved = localStorage.getItem("axis_referral_code");
    if (saved) {
      el.textContent = saved;
      return;
    }

    const code = "AXIS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    localStorage.setItem("axis_referral_code", code);
    el.textContent = code;
  }

  function copyCode() {
    const code = document.getElementById("refCode")?.textContent || "";
    if (!code) return;

    try {
      navigator.clipboard.writeText(code);
      alert("Code copié : " + code);
    } catch (error) {
      alert("Code parrainage : " + code);
    }
  }

  function bind() {
    ["refMonthlyCount", "refAnnualCount", "refRate"].forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("input", calculate);
      el.addEventListener("change", calculate);
    });

    document.querySelectorAll("[data-copy-ref]").forEach(function (button) {
      button.addEventListener("click", copyCode);
    });

    makeCode();
    calculate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();