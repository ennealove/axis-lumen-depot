document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-copy-ref]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = window.location.origin + "/parrainage.html?ref=AXIS-LUMEN";
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Lien copié";
        setTimeout(() => btn.textContent = "Copier le lien", 1200);
      } catch {
        alert(text);
      }
    });
  });
});