
(() => {
  const HOME_IMAGE = "assets/images/page-accueil.png";

  function renderHome() {
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) return;

    dashboard.classList.add("axis-home-premium-host");

    dashboard.innerHTML = `
      <div class="axis-home-premium">
        <section class="axis-home-hero" aria-label="Accueil JE SUIS Axis Lumen">
          <div class="axis-home-bg">
            <img src="${HOME_IMAGE}" alt="JE SUIS — Axis Lumen, espace de pratique et d’intégration intérieure" loading="eager">
          </div>

          <div class="axis-home-glow"></div>
          <div class="axis-home-particles"></div>

          <div class="axis-home-content">
            <div class="axis-home-kicker">Voix · temps · audio · visuel synchronisés</div>

            <h1 class="axis-home-title">JE SUIS</h1>

            <p class="axis-home-subtitle">
              Un espace de pratique, de lecture et d’intégration intérieure.
            </p>

            <p class="axis-home-text">
              Explorez les livres, les cartes Vertus, les séances guidées et les outils
              de pratique dans une interface claire, douce et inspirante.
            </p>

            <div class="axis-home-actions">
              <button class="axis-home-btn primary" type="button" data-home-target="session">
                Commencer une séance <span aria-hidden="true">→</span>
              </button>

              <button class="axis-home-btn" type="button" data-home-target="boutique">
                Découvrir la boutique <span aria-hidden="true">✦</span>
              </button>

              <button class="axis-home-btn" type="button" data-home-target="vertus">
                Tirer une carte Vertu <span aria-hidden="true">☉</span>
              </button>
            </div>
          </div>
        </section>

        <section class="axis-home-cards" aria-label="Accès rapides">
          <article class="axis-home-card" data-home-target="session">
            <div class="axis-home-card-icon">〰</div>
            <h3>Créer sa séance</h3>
            <p>Composez votre pratique avec respiration, oscillation, lumière, audio et intégration.</p>
          </article>

          <article class="axis-home-card" data-home-target="vertus">
            <div class="axis-home-card-icon">✶</div>
            <h3>Carte Vertu</h3>
            <p>Tirez une vertu, contemplez-la et laissez-la orienter votre état intérieur.</p>
          </article>

          <article class="axis-home-card" data-home-target="boutique">
            <div class="axis-home-card-icon">▣</div>
            <h3>Boutique</h3>
            <p>Retrouvez les livres de la collection JE SUIS et le pack complet papier.</p>
          </article>

          <article class="axis-home-card" data-home-target="abonnement">
            <div class="axis-home-card-icon">◈</div>
            <h3>Abonnement</h3>
            <p>Activez l’accès aux parcours, aux séances guidées et aux outils avancés.</p>
          </article>
        </section>

        <section class="axis-home-pillars" aria-label="Piliers de pratique">
          <div class="axis-home-pillar">
            <div class="axis-home-pillar-symbol">☉</div>
            <div>
              <strong>Présence</strong>
              <span>Revenir à l’instant, habiter pleinement ce qui est.</span>
            </div>
          </div>

          <div class="axis-home-pillar">
            <div class="axis-home-pillar-symbol">∿</div>
            <div>
              <strong>Souffle</strong>
              <span>Respirer, ressentir, s’aligner dans une pratique sobre.</span>
            </div>
          </div>

          <div class="axis-home-pillar">
            <div class="axis-home-pillar-symbol">✦</div>
            <div>
              <strong>Intégration</strong>
              <span>Ancrer la lumière et relier la pratique au quotidien.</span>
            </div>
          </div>
        </section>
      </div>
    `;

    bindHomeActions(dashboard);
  }

  function bindHomeActions(root) {
    root.querySelectorAll("[data-home-target]").forEach((el) => {
      if (el.dataset.homeBound === "true") return;

      el.dataset.homeBound = "true";

      el.addEventListener("click", () => {
        goToView(el.dataset.homeTarget);
      });
    });
  }

  function goToView(viewId) {
    if (!viewId) return;

    const directButton =
      document.querySelector(`[data-view="${viewId}"]`) ||
      document.querySelector(`[data-target="${viewId}"]`) ||
      Array.from(document.querySelectorAll("button, a")).find((el) => {
        const text = String(el.textContent || "").toLowerCase();

        if (viewId === "session") {
          return text.includes("créer sa séance") || text.includes("creer sa seance");
        }

        if (viewId === "vertus") {
          return text.includes("carte vertu");
        }

        return text.includes(viewId);
      });

    if (directButton) {
      directButton.click();
      return;
    }

    document.querySelectorAll(".view").forEach((view) => {
      view.classList.toggle("active", view.id === viewId);
    });

    document.querySelectorAll(".nav-tab, [data-view]").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.view === viewId);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderHome);
  } else {
    renderHome();
  }

  window.AXIS_RENDER_HOME_PREMIUM = renderHome;
})();
