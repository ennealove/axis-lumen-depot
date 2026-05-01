(() => {
  const ABOUT_HTML = `
    <section class="axis-about-premium-inner">
      <div class="about-hero-sacred">
        <div class="about-kicker">AXIS LUMEN / JE SUIS</div>
        <h1>À propos de JE SUIS</h1>
        <p class="about-lead">
          Une école intérieure née d’une expérience de lumière, d’une quête spirituelle
          et d’un travail de transmission.
        </p>
      </div>

      <div class="about-grid-premium">
        <article class="about-card about-card-main">
          <h2>Une origine intérieure</h2>
          <p>
            JE SUIS n’est pas né comme un simple projet de site, ni comme une méthode
            construite uniquement par assemblage intellectuel. Il est né d’une expérience
            intérieure fondatrice, vécue comme une rencontre christique, suivie d’un long
            échange intime qui a profondément réorienté mon travail, ma recherche et ma
            manière de transmettre.
          </p>
          <p>
            À la suite de cette expérience, quatre livres sont venus structurer l’ensemble
            de l’enseignement : <strong>JE SUIS — Rendre son temple vivant</strong>,
            <strong>Le Livre des Vertus</strong>, <strong>Le Livre de l’Alimentation</strong>
            et <strong>Le Livre d’Exercices</strong>. Chacun de ces ouvrages explore une
            porte différente du même chemin : revenir au centre, préparer le corps, purifier
            le terrain, travailler avec la lumière, cultiver les vertus et organiser une
            pratique régulière.
          </p>
        </article>

        <article class="about-card">
          <h2>La quête de la lumière</h2>
          <p>
            Mon parcours ne commence pourtant pas là. Depuis longtemps, je chemine à travers
            différentes écoles ésotériques, traditions symboliques et pratiques de transformation
            intérieure.
          </p>
          <p>
            Mais la recherche de la lumière est devenue pour moi une quête centrale depuis une
            expérience de mort imminente vécue plus jeune. Dans cette expérience, la perception
            d’un tunnel blanc, d’une lumière profonde et d’un appel intérieur a laissé une
            empreinte indélébile.
          </p>
          <p>
            Depuis, une part essentielle de mon chemin consiste à retrouver consciemment cette
            lumière, non comme un souvenir lointain, mais comme une direction vivante.
          </p>
        </article>

        <article class="about-card">
          <h2>Une école de pratique</h2>
          <p>
            Axis Lumen / JE SUIS est la forme structurée de cette quête.
          </p>
          <p>
            Ce site transmet une pratique fondée sur l’axe, le souffle, la lumière, la rémanence,
            les vertus, le rythme et l’observation intérieure. Les exercices proposés ne sont pas
            de simples mouvements. Ils sont pensés comme des portes progressives : préparer le
            corps, stabiliser l’attention, ouvrir la perception, affiner la présence et accompagner
            l’élévation de la conscience.
          </p>
          <p>
            L’enseignement repose sur une idée simple : le corps peut devenir un temple vivant
            lorsque l’attention, le souffle, le terrain, la lumière et l’intention commencent à
            travailler ensemble.
          </p>
        </article>

        <article class="about-card">
          <h2>Ce que vous trouverez ici</h2>
          <p>
            Vous trouverez ici des séances guidées, des exercices ciblés, des tirages de cartes
            Vertus, des pratiques de respiration, des balancements, des temps de rémanence
            lumineuse, des outils d’intégration et une progression construite pour durer.
          </p>
          <p>
            Le champ d’expérimentation est volontairement vaste. Il ne s’agit pas de tout
            consommer rapidement, mais d’entrer dans une pratique régulière, patiente et vivante.
          </p>
        </article>

        <article class="about-card about-card-main">
          <h2>Développer la perception intérieure</h2>
          <p>
            Ce chemin peut soutenir le développement de la perception intérieure, de la sensibilité
            subtile, de l’intuition, de la concentration et de certaines facultés psychiques ou
            extrasensorielles.
          </p>
          <p>
            Mais il demande du temps, de la rigueur, du discernement et une grande honnêteté
            envers soi-même. Les compétences profondes ne se décrètent pas. Elles se cultivent.
          </p>
          <p>
            JE SUIS n’est donc pas une promesse spectaculaire. C’est une école de pratique.
          </p>
        </article>

        <article class="about-manifesto">
          <p>Une école pour revenir au centre.</p>
          <p>Une école pour rendre le corps plus disponible.</p>
          <p>Une école pour travailler avec la lumière sans forcer.</p>
          <p>Une école pour transformer les vertus en présence réelle.</p>
          <p>Une école pour expérimenter, noter, ajuster et progresser.</p>
        </article>

        <article class="about-card about-card-closing">
          <h2>Transmission</h2>
          <p>
            Avancez avec sérieux, mais sans lourdeur. Pratiquez avec prudence, mais sans peur.
            Gardez votre discernement, votre joie et votre liberté intérieure.
          </p>
          <p>
            Je vous livre ici ce que j’ai reçu, expérimenté, structuré et approfondi.
          </p>
          <p class="about-final">
            Bon travail à vous. Explorez, expérimentez, amusez-vous, et laissez la lumière vous
            enseigner dans la durée.
          </p>
        </article>

        <article class="about-warning">
          <h2>Repère de prudence</h2>
          <p>
            Les pratiques proposées sur ce site relèvent d’un chemin de développement intérieur,
            d’observation, de respiration, de concentration et d’expérimentation personnelle.
            Elles ne remplacent pas un avis médical, psychologique ou thérapeutique.
          </p>
          <p>
            Chacun est invité à pratiquer avec discernement, mesure et respect de son corps,
            en particulier dans les exercices liés à la lumière.
          </p>
        </article>
      </div>
    </section>
  `;

  const ABOUT_SELECTORS = [
    '#about',
    '#apropos',
    '#a-propos',
    '#view-about',
    '#view-apropos',
    '#view-a-propos',
    '.about-page',
    '.apropos-page',
    'section[data-view="about"]',
    'section[data-view="apropos"]',
    'section[data-view="a-propos"]',
    '.view[data-view="about"]',
    '.view[data-view="apropos"]',
    '.view[data-view="a-propos"]',
    '[data-page="about"]',
    '[data-page="apropos"]',
    '[data-section="about"]',
    '[data-section="apropos"]'
  ];

  function isContentContainer(el) {
    if (!el) return false;
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (['button', 'a', 'span', 'li'].includes(tag)) return false;
    if (el.closest('nav, .nav, .sidebar-nav, .menu, .topbar')) return false;
    return true;
  }

  function findAboutContainer() {
    for (const selector of ABOUT_SELECTORS) {
      const candidates = Array.from(document.querySelectorAll(selector));
      const found = candidates.find(isContentContainer);
      if (found) return found;
    }

    const allViews = Array.from(document.querySelectorAll('[data-view], [id], section, main > div'));
    return allViews.find((el) => {
      if (!isContentContainer(el)) return false;
      const marker = [
        el.id || '',
        el.dataset?.view || '',
        el.dataset?.page || '',
        el.dataset?.section || '',
        el.className || ''
      ].join(' ').toLowerCase();

      return marker.includes('about') || marker.includes('apropos') || marker.includes('a-propos');
    });
  }

  function patchAbout() {
    const container = findAboutContainer();
    if (!container) return false;

    if (container.dataset.axisAboutPremium === 'true') return true;

    container.innerHTML = ABOUT_HTML;
    container.classList.add('axis-about-premium');
    container.dataset.axisAboutPremium = 'true';
    return true;
  }

  function schedulePatch() {
    setTimeout(patchAbout, 50);
    setTimeout(patchAbout, 250);
    setTimeout(patchAbout, 750);
  }

  document.addEventListener('DOMContentLoaded', schedulePatch);

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-view], [data-page], a, button');
    if (!trigger) return;

    const value = [
      trigger.dataset?.view || '',
      trigger.dataset?.page || '',
      trigger.getAttribute('href') || '',
      trigger.textContent || ''
    ].join(' ').toLowerCase();

    if (value.includes('propos') || value.includes('about')) {
      schedulePatch();
    }
  });

  const observer = new MutationObserver(() => {
    const activeText = document.body.innerText || '';
    if (activeText.toLowerCase().includes('à propos') || activeText.toLowerCase().includes('a propos')) {
      patchAbout();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  schedulePatch();
})();
