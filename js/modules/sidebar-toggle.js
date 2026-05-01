
(() => {
  const STORAGE_KEY = "axis_sidebar_collapsed";

  function getSidebar() {
    return document.querySelector(".sidebar");
  }

  function getAppShell() {
    return document.querySelector(".app-shell");
  }

  function isCollapsed() {
    return document.body.classList.contains("axis-sidebar-collapsed");
  }

  function applyState(collapsed) {
    document.body.classList.toggle("axis-sidebar-collapsed", collapsed);
    localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");

    const button = document.getElementById("axisSidebarFloatingToggle");
    if (button) {
      button.setAttribute("aria-expanded", collapsed ? "false" : "true");
      button.setAttribute("data-label", collapsed ? "Ouvrir le menu" : "Fermer le menu");

      const icon = button.querySelector("span");
      if (icon) {
        icon.textContent = collapsed ? "☰" : "‹";
      }
    }
  }

  function toggleSidebar() {
    applyState(!isCollapsed());
  }

  function installFloatingButton() {
    if (document.getElementById("axisSidebarFloatingToggle")) return;

    const button = document.createElement("button");
    button.id = "axisSidebarFloatingToggle";
    button.className = "axis-sidebar-floating-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Ouvrir ou fermer le menu");
    button.setAttribute("data-label", "Fermer le menu");
    button.innerHTML = "<span>‹</span>";

    button.addEventListener("click", toggleSidebar);

    document.body.appendChild(button);
  }

  function installInternalButton() {
    const sidebar = getSidebar();
    if (!sidebar) return;

    if (sidebar.querySelector(".axis-sidebar-internal-toggle")) return;

    const button = document.createElement("button");
    button.className = "axis-sidebar-internal-toggle";
    button.type = "button";
    button.innerHTML = "Masquer le menu <span aria-hidden='true'>‹</span>";

    button.addEventListener("click", toggleSidebar);

    sidebar.prepend(button);
  }

  function installKeyboardShortcut() {
    document.addEventListener("keydown", (event) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCmd = isMac ? event.metaKey : event.ctrlKey;

      if (ctrlOrCmd && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    });
  }

  function initSidebarToggle() {
    if (!getAppShell() || !getSidebar()) return;

    installFloatingButton();
    installInternalButton();
    installKeyboardShortcut();

    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === "1") {
      applyState(true);
    } else {
      applyState(false);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSidebarToggle);
  } else {
    initSidebarToggle();
  }

  window.AXIS_TOGGLE_SIDEBAR = toggleSidebar;
})();
