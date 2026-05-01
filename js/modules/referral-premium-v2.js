(() => {
  const STORAGE_KEY = "axis_referral_own_code_v2";

  function cleanCode(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .slice(0, 32);
  }

  function generateCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";
    for (let i = 0; i < 5; i += 1) {
      suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `AXIS-${suffix}`;
  }

  function getCode() {
    let code = cleanCode(localStorage.getItem(STORAGE_KEY));
    if (!code) {
      code = generateCode();
      localStorage.setItem(STORAGE_KEY, code);
    }
    return code;
  }

  function createNewCode() {
    const code = generateCode();
    localStorage.setItem(STORAGE_KEY, code);
    return code;
  }

  function buildLink(code) {
    const url = new URL(window.location.href);
    url.searchParams.set("ref", code);
    url.hash = "";
    return url.toString();
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function referralHtml() {
    const code = getCode();
    const link = buildLink(code);

    return `
      <section class="axis-referral-v2">
        <div class="axis-referral-hero-v2">
          <div class="axis-referral-kicker-v2">Cercle de transmission</div>
          <h1>Partagez l’école.<br>Allégez votre abonnement.</h1>
          <p>
            Faites découvrir <strong>Axis Lumen / JE SUIS</strong> à une personne de confiance.
            Votre invité bénéficie de <strong>30 % de réduction sur son premier mois</strong>,
            et vous recevez <strong>1 € de réduction chaque mois</strong> tant qu’il reste abonné.
          </p>
        </div>

        <div class="axis-referral-main-grid-v2">
          <article class="axis-referral-card-v2 axis-referral-link-card-v2">
            <span class="axis-referral-label-v2">Votre lien personnel</span>
            <h2>Inviter simplement</h2>
            <p>
              Copiez votre lien et partagez-le avec les personnes qui pourraient être sensibles
              à l’école, aux livres, aux cartes Vertus ou aux pratiques de lumière.
            </p>

            <label for="axisReferralCodeV2">Votre code</label>
            <div class="axis-referral-code-row-v2">
              <input id="axisReferralCodeV2" value="${code}" readonly>
              <button id="axisReferralNewCodeV2" type="button">Nouveau code</button>
            </div>

            <label for="axisReferralLinkV2">Lien à partager</label>
            <input id="axisReferralLinkV2" value="${link}" readonly>

            <div class="axis-referral-actions-v2">
              <button id="axisReferralCopyV2" class="axis-referral-primary-v2" type="button">
                Copier mon lien
              </button>
              <button id="axisReferralShareV2" class="axis-referral-secondary-v2" type="button">
                Partager
              </button>
            </div>

            <p id="axisReferralStatusV2" class="axis-referral-status-v2" aria-live="polite"></p>
          </article>

          <article class="axis-referral-card-v2 axis-referral-benefit-v2">
            <div class="axis-referral-number-v2">30 %</div>
            <h2>Pour votre invité</h2>
            <p>
              Une remise de bienvenue sur son premier mois pour découvrir les séances,
              les exercices, les cartes Vertus et l’école intérieure.
            </p>
          </article>

          <article class="axis-referral-card-v2 axis-referral-benefit-v2">
            <div class="axis-referral-number-v2">1 €</div>
            <h2>Pour vous chaque mois</h2>
            <p>
              Chaque abonné actif parrainé vous apporte 1 € de réduction mensuelle
              sur votre propre abonnement.
            </p>
          </article>
        </div>

        <div class="axis-referral-message-v2">
          <h2>Une transmission simple, utile et durable</h2>
          <p>
            Axis Lumen / JE SUIS grandit par la qualité de la pratique et par les personnes
            qui choisissent de le faire connaître. En partageant votre lien, vous soutenez
            le développement de l’école, vous ouvrez une porte d’entrée à votre invité,
            et votre propre abonnement devient progressivement plus léger.
          </p>
        </div>

        <div class="axis-referral-examples-v2">
          <div>
            <strong>1</strong>
            <span>abonné actif</span>
            <em>1 € / mois</em>
          </div>
          <div>
            <strong>5</strong>
            <span>abonnés actifs</span>
            <em>5 € / mois</em>
          </div>
          <div>
            <strong>10</strong>
            <span>abonnés actifs</span>
            <em>10 € / mois</em>
          </div>
        </div>

        <div class="axis-referral-closing-v2">
          <h2>Faites circuler l’école</h2>
          <p>
            Partagez le site avec les personnes qui cherchent une pratique structurée :
            lumière, souffle, vertus, exercices, séances guidées et progression intérieure.
            Chaque invitation peut devenir une nouvelle entrée dans le Temple Vivant.
          </p>
          <p class="axis-referral-small-v2">
            La réduction s’applique sur l’abonnement et ne peut pas dépasser son montant.
            Le suivi automatique sera relié au paiement lorsque Stripe sera activé.
          </p>
        </div>
      </section>
    `;
  }

  function containsMenuText(el) {
    const text = (el.textContent || "").toLowerCase();
    return text.includes("créer sa séance")
      && text.includes("oscillation guidée")
      && text.includes("boutique")
      && text.includes("abonnement");
  }

  function isBadContainer(el) {
    if (!el) return true;
    if (el === document.body || el === document.documentElement) return true;
    if (el.closest("nav, aside, .sidebar, .menu, .topbar")) return true;
    if (containsMenuText(el)) return true;
    return false;
  }

  function findExistingReferralBlock() {
    const all = Array.from(document.querySelectorAll("main section, main article, main div, section, article, div"));

    const candidates = all.filter((el) => {
      if (isBadContainer(el)) return false;

      const text = el.textContent || "";
      return text.includes("Cercle de transmission")
        && (
          text.includes("30 % pour votre invité")
          || text.includes("1 € pour vous chaque mois")
          || text.includes("Préparation backend")
          || text.includes("Votre code d’invitation")
        );
    });

    if (!candidates.length) return null;

    candidates.sort((a, b) => {
      const areaA = a.getBoundingClientRect().width * a.getBoundingClientRect().height;
      const areaB = b.getBoundingClientRect().width * b.getBoundingClientRect().height;
      return areaA - areaB;
    });

    return candidates[0];
  }

  function findExactReferralView() {
    const selectors = [
      "main [data-view='parrainage']",
      "main [data-page='parrainage']",
      "main [data-section='parrainage']",
      "section[data-view='parrainage']",
      "section[data-page='parrainage']",
      ".view[data-view='parrainage']",
      ".page[data-view='parrainage']",
      "#parrainage",
      "#view-parrainage",
      "#referral",
      "#view-referral"
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && !isBadContainer(el)) return el;
    }

    return null;
  }

  function findHost() {
    return findExactReferralView() || findExistingReferralBlock();
  }

  function bindReferral(host) {
    const codeInput = host.querySelector("#axisReferralCodeV2");
    const linkInput = host.querySelector("#axisReferralLinkV2");
    const status = host.querySelector("#axisReferralStatusV2");
    const copyButton = host.querySelector("#axisReferralCopyV2");
    const shareButton = host.querySelector("#axisReferralShareV2");
    const newCodeButton = host.querySelector("#axisReferralNewCodeV2");

    function refresh(code) {
      const finalCode = code || getCode();
      const finalLink = buildLink(finalCode);

      if (codeInput) codeInput.value = finalCode;
      if (linkInput) linkInput.value = finalLink;
    }

    if (copyButton) {
      copyButton.addEventListener("click", async () => {
        try {
          await copyText(linkInput.value);
          if (status) status.textContent = "Lien copié. Vous pouvez maintenant le partager.";
        } catch {
          if (status) status.textContent = "Copie impossible. Sélectionnez le lien manuellement.";
        }
      });
    }

    if (shareButton) {
      shareButton.addEventListener("click", async () => {
        const link = linkInput.value;

        if (navigator.share) {
          try {
            await navigator.share({
              title: "Axis Lumen / JE SUIS",
              text: "Je t’invite à découvrir l’école Axis Lumen / JE SUIS avec une remise de bienvenue.",
              url: link
            });
            if (status) status.textContent = "Lien partagé.";
          } catch {
            if (status) status.textContent = "";
          }
        } else {
          try {
            await copyText(link);
            if (status) status.textContent = "Partage direct indisponible : lien copié.";
          } catch {
            if (status) status.textContent = "Partage indisponible. Copiez le lien manuellement.";
          }
        }
      });
    }

    if (newCodeButton) {
      newCodeButton.addEventListener("click", () => {
        const code = createNewCode();
        refresh(code);
        if (status) status.textContent = "Nouveau code généré.";
      });
    }

    refresh();
  }

  function patchReferral() {
    const host = findHost();

    if (!host) {
      return false;
    }

    if (host.dataset.axisReferralV2 === "true") {
      return true;
    }

    host.innerHTML = referralHtml();
    host.classList.add("axis-referral-host-v2");
    host.dataset.axisReferralV2 = "true";
    bindReferral(host);

    return true;
  }

  function schedulePatch() {
    setTimeout(patchReferral, 80);
    setTimeout(patchReferral, 300);
    setTimeout(patchReferral, 900);
  }

  document.addEventListener("DOMContentLoaded", schedulePatch);

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-view], [data-page], a, button");
    if (!trigger) return;

    const value = [
      trigger.dataset?.view || "",
      trigger.dataset?.page || "",
      trigger.getAttribute("href") || "",
      trigger.textContent || ""
    ].join(" ").toLowerCase();

    if (value.includes("parrainage") || value.includes("referral") || value.includes("cercle")) {
      schedulePatch();
    }
  });

  const observer = new MutationObserver(() => {
    const txt = document.body?.innerText || "";
    if (
      txt.includes("30 % pour votre invité")
      || txt.includes("1 € pour vous chaque mois")
      || txt.includes("Préparation backend")
    ) {
      patchReferral();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.AXIS_REFERRAL_V2 = {
    patchReferral,
    getCode,
    createNewCode,
    buildLink
  };

  schedulePatch();
})();
