(() => {
  "use strict";

  function init() {
    document.querySelectorAll("[data-subscribe]").forEach((button) => {
      button.addEventListener("click", () => {
        const plan = button.getAttribute("data-plan") || "monthly";
        if (window.AxisAccess) {
          window.AxisAccess.setPendingPlan(plan);
        } else {
          localStorage.setItem("axis_pending_subscription_plan", plan);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
