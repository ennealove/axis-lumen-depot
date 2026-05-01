(function () {
  "use strict";

  const MANIFEST = window.PHOSPHENE_VIDEO_MANIFEST || { roles: {}, videos: [] };

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function all(selector, root) {
    return Array.from((root || document).querySelectorAll(selector));
  }

  function getRole(roleName) {
    return MANIFEST.roles && MANIFEST.roles[roleName] ? MANIFEST.roles[roleName] : null;
  }

  function hasRole(roleName) {
    const item = getRole(roleName);
    return !!(item && item.status === "ok" && item.src);
  }

  function roleOrFallback(primary, fallback) {
    if (hasRole(primary)) return primary;
    if (hasRole(fallback)) return fallback;
    return primary;
  }

  function encodePath(path) {
    return String(path || "")
      .split("/")
      .map(function (part) { return encodeURIComponent(part); })
      .join("/");
  }

  function selectedSwingLabel() {
    const select = $("#mixageSwing");
    if (!select) return "";

    const option = select.options && select.selectedIndex >= 0
      ? select.options[select.selectedIndex]
      : null;

    return String((option && option.textContent) || select.value || "");
  }

  function selectedSwingValue() {
    const select = $("#mixageSwing");
    if (!select) return "";

    return String(select.value || "") + " " + selectedSwingLabel();
  }

  function currentMixageRole() {
    const value = selectedSwingValue()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (
      value.includes("rotation") ||
      value.includes("rotor") ||
      value.includes("gyr") ||
      value.includes("roro")
    ) {
      return roleOrFallback("rotation_swing", "lateral_swing");
    }

    if (value.includes("vertical") || value.includes("haut") || value.includes("bas")) {
      return roleOrFallback("vertical_swing", "lateral_swing");
    }

    if (value.includes("lateral") || value.includes("lat") || value.includes("gauche") || value.includes("droite")) {
      return roleOrFallback("lateral_swing", "vertical_swing");
    }

    return roleOrFallback("lateral_swing", "vertical_swing");
  }

  function preventNativeVideoAccess(video) {
    if (!video) return;

    video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
    video.setAttribute("disablePictureInPicture", "");
    video.setAttribute("disableRemotePlayback", "");
    video.setAttribute("draggable", "false");

    video.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    video.addEventListener("dragstart", function (event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    });

    video.addEventListener("enterpictureinpicture", function () {
      try {
        if (document.exitPictureInPicture) {
          document.exitPictureInPicture();
        }
      } catch (_) {}
    });
  }

  function makePlayer(roleName, title, subtitlePrefix) {
    const item = getRole(roleName);

    const shell = document.createElement("div");
    shell.className = "video-training-shell";
    shell.dataset.videoRole = roleName;

    if (!item || item.status !== "ok" || !item.src) {
      shell.classList.add("video-training-missing");
      shell.innerHTML = `
        <div class="video-training-inner">
          <div class="video-training-missing-message">
            Vidéo non trouvée pour ce rôle.
          </div>
        </div>
      `;

      return {
        shell: shell,
        setRole: function () {}
      };
    }

    shell.innerHTML = `
      <div class="video-training-inner">
        <video class="video-training-player"
          muted
          autoplay
          loop
          playsinline
          preload="metadata"
          controlslist="nodownload noplaybackrate noremoteplayback"
          disablepictureinpicture
          disableremoteplayback
          draggable="false"></video>

        <div class="video-training-caption">
          <div>
            <strong></strong>
            <span></span>
          </div>
          <div class="video-training-actions">
            <button type="button" data-action="restart">Relancer</button>
            <button type="button" data-action="mute">Son vidéo</button>
          </div>
        </div>
      </div>
    `;

    const video = $("video", shell);
    const strong = $(".video-training-caption strong", shell);
    const span = $(".video-training-caption span", shell);
    const restart = $('[data-action="restart"]', shell);
    const mute = $('[data-action="mute"]', shell);

    preventNativeVideoAccess(video);

    function setRole(nextRoleName, nextTitle, nextSubtitlePrefix) {
      const nextItem = getRole(nextRoleName);
      if (!nextItem || nextItem.status !== "ok" || !nextItem.src) return;

      const encoded = encodePath(nextItem.src);
      const absolute = new URL(encoded, window.location.href).href;

      if (video.dataset.currentSrc !== absolute) {
        video.dataset.currentSrc = absolute;
        video.src = encoded;
        video.load();
        video.play().catch(function () {});
      }

      shell.dataset.videoRole = nextRoleName;
      strong.textContent = nextTitle || title || "";
      span.textContent = (nextSubtitlePrefix || subtitlePrefix || "") + nextItem.file;
    }

    setRole(roleName, title, subtitlePrefix || "");

    restart.addEventListener("click", function () {
      try {
        video.currentTime = 0;
        video.play().catch(function () {});
      } catch (_) {}
    });

    mute.addEventListener("click", function () {
      video.muted = !video.muted;
      mute.textContent = video.muted ? "Son vidéo" : "Couper son";
      video.play().catch(function () {});
    });

    video.addEventListener("error", function () {
      const inner = $(".video-training-inner", shell);
      if (inner) {
        inner.innerHTML = `
          <div class="video-training-missing-message">
            La vidéo est détectée, mais le navigateur ne peut pas la lire.
          </div>
        `;
      }
    });

    return {
      shell: shell,
      setRole: setRole
    };
  }

  function findViewByIdOrDataView(name) {
    return document.getElementById(name) ||
      document.querySelector('.view[id="' + CSS.escape(name) + '"]') ||
      null;
  }

  function findCard(sectionId, canvasId) {
    const canvas = document.getElementById(canvasId);

    if (canvas) {
      return {
        card: canvas.closest(".visual-card") || canvas.closest(".card") || canvas.parentElement,
        canvas: canvas
      };
    }

    const section = findViewByIdOrDataView(sectionId);
    if (!section) {
      return { card: null, canvas: null };
    }

    const visual = section.querySelector(".visual-card");
    if (visual) {
      return { card: visual, canvas: visual.querySelector("canvas") };
    }

    const cards = all(".card", section);
    const last = cards.length ? cards[cards.length - 1] : null;

    return {
      card: last,
      canvas: last ? last.querySelector("canvas") : null
    };
  }

  function removeParasiteText(root) {
    const forbidden = [
      "La vidéo remplace l’ancienne prévisualisation animée du Rotor Optique",
      "La vidéo remplace l'ancienne prévisualisation animée du Rotor Optique",
      "La vidéo remplace l’ancien schéma vocal",
      "La vidéo remplace l'ancien schéma vocal",
      "Le guidage sonore reste géré par le logiciel",
      "La vidéo remplace l’ancien visage animé",
      "La vidéo remplace l'ancien visage animé",
      "Elle sert de support propre pour l’exercice d’oscillation guidée",
      "Elle sert de support propre pour l'exercice d'oscillation guidée"
    ];

    all("p, div, span, small", root || document).forEach(function (node) {
      const text = String(node.textContent || "").trim();
      if (!text) return;

      const hit = forbidden.some(function (phrase) {
        return text.includes(phrase);
      });

      if (hit) {
        try { node.remove(); } catch (_) {}
      }
    });
  }

  function insertPlayer(target, player, marker) {
    if (!target || !target.card || !player || !player.shell) return;

    const existing = target.card.querySelector('[data-video-marker="' + marker + '"]');
    if (existing) {
      try { existing.remove(); } catch (_) {}
    }

    target.card.classList.add("video-training-card");
    player.shell.dataset.videoMarker = marker;

    const h3 = target.card.querySelector("h3");

    if (h3 && h3.nextSibling) {
      target.card.insertBefore(player.shell, h3.nextSibling);
    } else if (h3) {
      target.card.appendChild(player.shell);
    } else {
      target.card.prepend(player.shell);
    }

    if (target.canvas) {
      target.canvas.classList.add("video-training-canvas-hidden");
      target.canvas.style.display = "none";
    }

    removeParasiteText(target.card);
  }

  function enhanceMixage() {
    const target = findCard("mixage", "mixagePreviewCanvas");
    if (!target.card) return;

    const selectedRole = currentMixageRole();

    const player = makePlayer(
      selectedRole,
      "Oscillation guidée",
      "Démonstration · "
    );

    insertPlayer(target, player, "mixage");

    const swing = $("#mixageSwing");
    if (swing && swing.dataset.videoRotationBound !== "1") {
      swing.dataset.videoRotationBound = "1";

      swing.addEventListener("change", function () {
        const nextRole = currentMixageRole();
        player.setRole(nextRole, "Oscillation guidée", "Démonstration · ");
        removeParasiteText(target.card);
      });

      swing.addEventListener("input", function () {
        const nextRole = currentMixageRole();
        player.setRole(nextRole, "Oscillation guidée", "Démonstration · ");
        removeParasiteText(target.card);
      });
    }
  }

  function enhanceBreathing() {
    const target = findCard("respiration", "breathPreviewCanvas");
    if (!target.card) return;

    const player = makePlayer(
      "breathing",
      "Respiration guidée",
      "Observation lumineuse + souffle · "
    );

    insertPlayer(target, player, "breathing");
  }

  function enhanceTension() {
    const target = findCard("tensions", "tensionPreviewCanvas");
    if (!target.card) return;

    const player = makePlayer(
      "static_tension",
      "Tensions statiques",
      "Contractez · maintenez · relâchez · "
    );

    insertPlayer(target, player, "tension");
  }

  function enhanceRotor() {
    const target = findCard("Rotor Optique", "gyroPreviewCanvas");
    if (!target.card) return;

    const player = makePlayer(
      "gyro_rotation",
      "Rotor Optique",
      "Rotation · "
    );

    insertPlayer(target, player, "rotor");
  }

  function mount() {
    enhanceMixage();
    enhanceBreathing();
    enhanceTension();
    enhanceRotor();
    removeParasiteText(document);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    mount();
    setTimeout(mount, 250);
    setTimeout(mount, 1000);
    setTimeout(mount, 2000);

    document.addEventListener("click", function () {
      setTimeout(function () {
        mount();
        removeParasiteText(document);
      }, 80);
    }, true);
  });
})();
