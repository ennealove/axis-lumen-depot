const AXIS = {
  prices: {
    jeSuisPdf: 19,
    jeSuisEpub: 19,
    jeSuisPaper: 29,
    vertusPaper: 34,
    alimentationPaper: 29,
    exercicesPaper: 39,
    pack4: 119,
    packFondateur: 49,
    packTerrain: 59,
    abonnement: 19
  },

  products: [
    { id:"je-suis-pdf", title:"JE SUIS — PDF", price:19, type:"pdf" },
    { id:"je-suis-epub", title:"JE SUIS — EPUB", price:19, type:"epub" },
    { id:"je-suis-paper", title:"JE SUIS — Papier", price:29, type:"paper" },
    { id:"vertus-paper", title:"Le Livre des Vertus", price:34, type:"paper" },
    { id:"alimentation-paper", title:"Le Livre de l’Alimentation", price:29, type:"paper" },
    { id:"exercices-paper", title:"Le Livre d’Exercices", price:39, type:"paper" },
    { id:"pack-4-livres", title:"Pack 4 livres papier", price:119, type:"bundle" },
    { id:"pack-fondateur", title:"Pack fondateur", price:49, type:"bundle" },
    { id:"pack-terrain", title:"Pack Terrain", price:59, type:"bundle" },
    { id:"abonnement-axis", title:"Abonnement Axis Lumen Studio", price:19, type:"subscription" }
  ],

  enums: {
    intentions: [
      ["recentrage","Recentrage"],
      ["clarte","Clarté"],
      ["ancrage","Ancrage"],
      ["apaisement","Apaisement"],
      ["purification","Purification du terrain"],
      ["vertu","Vertu du jour"],
      ["souffle","Souffle"],
      ["lumiere","Lumière"],
      ["rythme","Rythme"],
      ["elevation","Élévation"]
    ],
    movements: [
      ["lateral_swing","Balancement latéral"],
      ["vertical_swing","Balancement vertical"],
      ["rotation_swing","Balancement en rotation"],
      ["gyro_rotation","Rotor optique"],
      ["static_tension","Tensions statiques"]
    ],
    breathing: [
      ["none","Sans module respiratoire"],
      ["breathing_3","Respiration courte — 3 min"],
      ["breathing_10","Respiration complète — 10 min"]
    ],
    integration: [
      ["remanence_2","Rémanence — 2 min"],
      ["remanence_3","Rémanence — 3 min"],
      ["journal","Carnet d’expérience"],
      ["silence","Silence d’intégration"]
    ]
  },

  videos: {
    lateral_swing: "assets/videos/web/balancement-lateral-complet.web.mp4",
    vertical_swing: "assets/videos/web/balancement-lateral-complet.web.mp4",
    rotation_swing: "assets/videos/web/rotation-complete.web.mp4",
    gyro_rotation: "assets/videos/web/rotation-complete.web.mp4",
    static_tension: "assets/videos/web/tension-statique-complete.web.mp4",
    breathing_3: "assets/videos/web/respiration-complete-10-minutes.web.mp4",
    breathing_10: "assets/videos/web/respiration-complete-10-minutes.web.mp4"
  }
};

function axisOptionList(list) {
  return list.map(([value,label]) => `<option value="${value}">${label}</option>`).join("");
}

function axisLabel(list, value) {
  const found = list.find(item => item[0] === value);
  return found ? found[1] : value;
}

function saveSession(session) {
  localStorage.setItem("axis_lumen_current_session", JSON.stringify(session));
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem("axis_lumen_current_session") || "null");
  } catch {
    return null;
  }
}

function buildSessionFromForm() {
  const intention = document.querySelector("#axis-intention")?.value || "recentrage";
  const movement = document.querySelector("#axis-movement")?.value || "lateral_swing";
  const breathing = document.querySelector("#axis-breathing")?.value || "breathing_3";
  const integration = document.querySelector("#axis-integration")?.value || "remanence_3";
  const duration = Number(document.querySelector("#axis-duration")?.value || 15);

  const phases = [
    {
      key:"opening",
      title:"Ouverture",
      duration:"1 min",
      text:"Posture, intention, entrée dans le calme."
    },
    {
      key:"light_on",
      title:"Observation lumineuse",
      duration:"30 sec",
      text:"Allumer la lumière, observer sans tension, stabiliser l’attention."
    },
    {
      key:"remanence",
      title:"Rémanence",
      duration: integration.includes("3") ? "3 min" : "2 min",
      text:"Fermer les yeux, suivre la trace lumineuse et laisser l’image intérieure se poser."
    },
    {
      key: movement,
      title: axisLabel(AXIS.enums.movements, movement),
      duration: Math.max(3, duration - 6) + " min",
      text:"Entrer dans le mouvement choisi avec un rythme stable.",
      video: AXIS.videos[movement] || ""
    }
  ];

  if (breathing !== "none") {
    phases.splice(3, 0, {
      key: breathing,
      title: axisLabel(AXIS.enums.breathing, breathing),
      duration: breathing === "breathing_10" ? "10 min" : "3 min",
      text:"Respiration guidée pour stabiliser le rythme.",
      video: AXIS.videos[breathing] || ""
    });
  }

  phases.push({
    key:"closing",
    title:"Clôture",
    duration:"1 min",
    text:"Retour au silence, note intérieure, intégration dans le carnet."
  });

  return {
    createdAt: new Date().toISOString(),
    intention,
    intentionLabel: axisLabel(AXIS.enums.intentions, intention),
    movement,
    movementLabel: axisLabel(AXIS.enums.movements, movement),
    breathing,
    breathingLabel: axisLabel(AXIS.enums.breathing, breathing),
    integration,
    integrationLabel: axisLabel(AXIS.enums.integration, integration),
    duration,
    phases
  };
}

function renderSession(session, target) {
  if (!target) return;

  target.innerHTML = `
    <article class="card session-result">
      <div class="kicker">Séance générée</div>
      <h3>${session.intentionLabel} · ${session.movementLabel}</h3>
      <p>Durée cible : ${session.duration} minutes · Respiration : ${session.breathingLabel} · Intégration : ${session.integrationLabel}</p>
      <div class="phase-list">
        ${session.phases.map(phase => `
          <div class="phase">
            <strong>${phase.duration}</strong>
            <span><b>${phase.title}</b><br>${phase.text}</span>
            ${phase.video ? `<a class="btn" href="pratiquer.html">Pratiquer</a>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="actions">
        <a class="btn primary" href="pratiquer.html">Lancer en pratique</a>
        <button class="btn" id="axis-save-session">Sauvegarder</button>
      </div>
    </article>
  `;

  document.querySelector("#axis-save-session")?.addEventListener("click", () => {
    saveSession(session);
    alert("Séance sauvegardée.");
  });
}

function initSessionBuilder() {
  const root = document.querySelector("#axis-session-builder");
  if (!root) return;

  root.innerHTML = `
    <section class="card">
      <div class="kicker">Générateur restauré</div>
      <h3>Composer une séance Axis Lumen</h3>
      <p>Choisis l’intention, le mouvement, le souffle et l’intégration. La séance est ensuite envoyée vers l’espace Pratiquer.</p>

      <div class="form-grid">
        <div class="field">
          <label>Intention</label>
          <select id="axis-intention">${axisOptionList(AXIS.enums.intentions)}</select>
        </div>
        <div class="field">
          <label>Mouvement</label>
          <select id="axis-movement">${axisOptionList(AXIS.enums.movements)}</select>
        </div>
        <div class="field">
          <label>Respiration</label>
          <select id="axis-breathing">${axisOptionList(AXIS.enums.breathing)}</select>
        </div>
        <div class="field">
          <label>Intégration</label>
          <select id="axis-integration">${axisOptionList(AXIS.enums.integration)}</select>
        </div>
        <div class="field">
          <label>Durée cible</label>
          <select id="axis-duration">
            <option value="7">7 minutes</option>
            <option value="12">12 minutes</option>
            <option value="15" selected>15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>
      </div>

      <div class="actions">
        <button class="btn primary" id="axis-generate-session">Générer la séance</button>
        <a class="btn" href="pratiquer.html">Pratiquer</a>
      </div>
    </section>
    <div id="axis-session-result"></div>
  `;

  document.querySelector("#axis-generate-session")?.addEventListener("click", () => {
    const session = buildSessionFromForm();
    saveSession(session);
    renderSession(session, document.querySelector("#axis-session-result"));
  });

  const existing = loadSession();
  if (existing) renderSession(existing, document.querySelector("#axis-session-result"));
}

function initPractice() {
  const root = document.querySelector("#axis-practice-session");
  if (!root) return;

  const session = loadSession();

  if (!session) {
    root.innerHTML = `
      <article class="card">
        <div class="kicker">Aucune séance générée</div>
        <h3>Créer d’abord une séance</h3>
        <p>Tu peux pratiquer librement avec les vidéos ci-dessous, ou générer une séance complète.</p>
        <a class="btn primary" href="creer-seance.html">Créer ma séance</a>
      </article>
    `;
    return;
  }

  root.innerHTML = `
    <article class="card">
      <div class="kicker">Séance active</div>
      <h3>${session.intentionLabel} · ${session.duration} minutes</h3>
      <p>${session.movementLabel} · ${session.breathingLabel} · ${session.integrationLabel}</p>
      <div class="phase-list">
        ${session.phases.map(phase => `
          <div class="phase">
            <strong>${phase.duration}</strong>
            <span><b>${phase.title}</b><br>${phase.text}</span>
            ${phase.video ? `<a class="btn" href="${phase.video}" target="_blank">Vidéo</a>` : ""}
          </div>
        `).join("")}
      </div>
    </article>
  `;

  const videoGrid = document.querySelector("#axis-practice-videos");
  if (videoGrid) {
    const videos = session.phases.filter(p => p.video);
    videoGrid.innerHTML = videos.map(p => `
      <article class="video-card">
        <h3>${p.title}</h3>
        <video controls src="${p.video}"></video>
      </article>
    `).join("");
  }
}

function initShop() {
  const root = document.querySelector("#axis-shop-products");
  if (!root) return;

  root.innerHTML = AXIS.products.map(product => `
    <article class="product">
      <div class="kicker">${product.type}</div>
      <h3>${product.title}</h3>
      <p>${product.type === "subscription" ? "Accès mensuel au studio, cours et générateur." : "Produit prêt à relier à Stripe."}</p>
      <div class="price">${product.price} €</div>
      <div class="tags"><span class="tag">${product.type}</span><span class="tag">Stripe placeholder</span></div>
      <div class="product-actions">
        <button class="btn primary" data-buy="${product.id}">Acheter</button>
        <button class="btn" data-detail="${product.id}">Détails</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-buy]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-buy");
      const product = AXIS.products.find(p => p.id === id);
      localStorage.setItem("axis_lumen_cart", JSON.stringify(product));
      showCart(product);
    });
  });
}

function showCart(product) {
  let bar = document.querySelector(".cart-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "cart-bar";
    document.body.appendChild(bar);
  }

  bar.innerHTML = `
    <h3>${product.title}</h3>
    <p>Produit sélectionné : ${product.price} €. Connexion Stripe à brancher sur ce bouton.</p>
    <button class="btn primary" onclick="this.closest('.cart-bar').classList.remove('active')">OK</button>
  `;
  bar.classList.add("active");
}

function initSubscription() {
  const root = document.querySelector("#axis-subscription-panel");
  if (!root) return;

  const status = localStorage.getItem("axis_lumen_subscription") || "inactive";

  root.innerHTML = `
    <article class="card">
      <div class="kicker">Statut abonnement</div>
      <h3>${status === "active" ? "Abonnement actif" : "Abonnement non activé"}</h3>
      <p>Tarif préparé : ${AXIS.prices.abonnement} € / mois.</p>
      <div class="status">
        <span>Accès cours</span><strong>${status === "active" ? "ouvert" : "fermé"}</strong>
        <span>Générateur</span><strong>disponible</strong>
        <span>Stripe</span><strong>à connecter</strong>
      </div>
      <button class="btn primary" id="axis-activate-sub">Simuler activation</button>
    </article>
  `;

  document.querySelector("#axis-activate-sub")?.addEventListener("click", () => {
    localStorage.setItem("axis_lumen_subscription", "active");
    initSubscription();
  });
}

function initReferral() {
  const root = document.querySelector("#axis-referral-panel");
  if (!root) return;

  let data;
  try {
    data = JSON.parse(localStorage.getItem("axis_lumen_referral") || "null");
  } catch {
    data = null;
  }

  if (!data) {
    data = {
      code: "AXIS-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      referrals: 0,
      active: 0,
      credit: 0
    };
    localStorage.setItem("axis_lumen_referral", JSON.stringify(data));
  }

  const link = `${window.location.origin}/abonnement.html?ref=${data.code}`;
  const commission = data.active * 5;

  root.innerHTML = `
    <article class="card">
      <div class="kicker">Parrainage restauré</div>
      <h3>Code ${data.code}</h3>
      <div class="status">
        <span>Filleuls</span><strong>${data.referrals}</strong>
        <span>Actifs</span><strong>${data.active}</strong>
        <span>Crédit mensuel estimé</span><strong>${commission} €</strong>
        <span>Remise filleul</span><strong>10 %</strong>
      </div>
      <input class="ref-link" readonly value="${link}">
      <div class="actions">
        <button class="btn primary" id="axis-copy-ref">Copier le lien</button>
        <button class="btn" id="axis-sim-ref">Simuler un filleul actif</button>
      </div>
    </article>
  `;

  document.querySelector("#axis-copy-ref")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(link);
      document.querySelector("#axis-copy-ref").textContent = "Lien copié";
    } catch {
      alert(link);
    }
  });

  document.querySelector("#axis-sim-ref")?.addEventListener("click", () => {
    data.referrals += 1;
    data.active += 1;
    data.credit = data.active * 5;
    localStorage.setItem("axis_lumen_referral", JSON.stringify(data));
    initReferral();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSessionBuilder();
  initPractice();
  initShop();
  initSubscription();
  initReferral();
});


// AXIS_LEGACY_FUNCTION_BRIDGE_START
(function () {
  const STAMP = "20260501_180819";

  const routes = [
    {
      pages: ["", "/", "index.html"],
      mounts: ["dashboard"],
      scripts: [
        "js/data/temple-data.js",
        "js/modules/home-premium.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["boutique.html"],
      mounts: ["boutique"],
      scripts: [
        "js/modules/shop-premium-clean.js",
        "js/modules/shop-pack-cover-force.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["abonnement.html"],
      mounts: ["abonnement"],
      scripts: [
        "js/modules/subscription-access.js",
        "js/modules/subscription-final-safe.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["parrainage.html"],
      mounts: ["parrainage"],
      scripts: [
        "js/referral-page.js",
        "js/modules/referral-premium.js",
        "js/modules/referral-premium-v2.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["a-propos.html", "apropos.html"],
      mounts: ["apropos"],
      scripts: [
        "js/data/temple-data.js",
        "js/modules/about-premium.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["apprendre.html"],
      mounts: ["apprendre"],
      scripts: [
        "js/data/axis-learning-data.js",
        "js/data/axis-sessions.js",
        "js/data/temple-data.js",
        "js/modules/apprendre.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["creer-seance.html"],
      mounts: ["session"],
      scripts: [
        "js/data/axis-learning-data.js",
        "js/data/axis-sessions.js",
        "js/data/temple-data.js",
        "js/modules/temple-plus.js"
      ]
    },
    {
      pages: ["pratiquer.html"],
      mounts: ["pratique"],
      scripts: [
        "js/data/axis-learning-data.js",
        "js/data/axis-sessions.js",
        "js/data/temple-data.js",
        "js/modules/temple-plus.js"
      ]
    }
  ];

  function getPageName() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function getRoute() {
    const page = getPageName();

    return routes.find(function (route) {
      return route.pages.includes(page);
    });
  }

  function ensureCss(href) {
    const clean = href.split("?")[0];

    const exists = Array.from(document.querySelectorAll("link[rel='stylesheet']")).some(function (link) {
      return (link.getAttribute("href") || "").includes(clean);
    });

    if (exists) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href + "?v=" + STAMP;
    document.head.appendChild(link);
  }

  function ensureMount(id) {
    let el = document.getElementById(id);

    if (el) return el;

    const main = document.querySelector("main") || document.body;
    el = document.createElement("section");
    el.id = id;
    el.className = "legacy-module-mount";
    main.appendChild(el);

    return el;
  }

  function scriptAlreadyLoaded(src) {
    const clean = src.split("?")[0];

    return Array.from(document.querySelectorAll("script[src]")).some(function (script) {
      return (script.getAttribute("src") || "").includes(clean);
    });
  }

  function loadScript(src) {
    return new Promise(function (resolve) {
      if (scriptAlreadyLoaded(src)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src + "?v=" + STAMP;
      script.async = false;
      script.onload = function () { resolve(); };
      script.onerror = function () {
        console.warn("Module Axis Lumen introuvable :", src);
        resolve();
      };

      document.body.appendChild(script);
    });
  }

  function loadSequential(scripts) {
    return scripts.reduce(function (promise, src) {
      return promise.then(function () {
        return loadScript(src);
      });
    }, Promise.resolve());
  }

  function init() {
    const route = getRoute();

    if (!route) return;

    ensureCss("css/legacy-bridge.css");

    route.mounts.forEach(function (id) {
      ensureMount(id);
    });

    loadSequential(route.scripts).then(function () {
      document.documentElement.setAttribute("data-axis-legacy-bridge", "loaded");
      console.info("Axis Lumen legacy bridge chargé :", getPageName(), route.scripts);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
// AXIS_LEGACY_FUNCTION_BRIDGE_END
