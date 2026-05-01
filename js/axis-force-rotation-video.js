(function () {
  const STAMP = "20260501_192728";
  const ROTATION_SRC = "assets/videos/web/axis-rotation-source.mp4";

  function pageName() {
    return (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  }

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function mainVideo() {
    const videos = Array.from(document.querySelectorAll("video"));

    if (videos.length) {
      return videos.sort(function (a, b) {
        return (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight);
      })[0];
    }

    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;

    const main = document.querySelector("main") || document.body;
    main.appendChild(video);

    return video;
  }

  function protectVideo(video) {
    if (!video) return;

    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.style.pointerEvents = "auto";
    video.setAttribute("controlsList", "nodownload noremoteplayback");
    video.disablePictureInPicture = true;

    video.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  function removeDownloadLinks() {
    document.querySelectorAll("a[href]").forEach(function (a) {
      const href = a.getAttribute("href") || "";
      const txt = normalize(a.textContent || "");

      if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(href) && (txt.includes("telecharger") || txt.includes("download"))) {
        a.style.display = "none";
        a.setAttribute("aria-hidden", "true");
      }
    });
  }

  function setVideoToRotation() {
    const video = mainVideo();
    if (!video) return;

    const src = ROTATION_SRC + "?v=" + STAMP;

    if (!video.src.includes(ROTATION_SRC)) {
      video.pause();
      video.src = src;
      video.load();
    }

    protectVideo(video);
    removeDownloadLinks();

    document.documentElement.setAttribute("data-axis-rotation-source", "official");
    console.info("Rotation officielle appliquée :", ROTATION_SRC);
  }

  function status(message) {
    let el = document.querySelector(".axis-rotation-video-status");

    if (!el) {
      el = document.createElement("div");
      el.className = "axis-rotation-video-status";

      const video = mainVideo();
      if (video && video.parentElement) {
        video.parentElement.insertBefore(el, video);
      } else {
        (document.querySelector("main") || document.body).prepend(el);
      }
    }

    el.textContent = message;
  }

  function bindOscillationRotationButton() {
    if (pageName() !== "oscillation.html") return;

    const clickables = Array.from(document.querySelectorAll("button, a, article, .card, .feature-card, div"));

    clickables.forEach(function (el) {
      const txt = normalize(el.textContent || "");

      const isRotation =
        txt.includes("rotation") ||
        txt.includes("rotatif") ||
        txt.includes("rotative");

      if (!isRotation) return;

      const card = el.closest("article, .card, .feature-card") || el;
      card.style.cursor = "pointer";
      card.setAttribute("data-axis-rotation-button", "true");

      if (card.dataset.axisRotationBound === "1") return;

      card.dataset.axisRotationBound = "1";

      card.addEventListener("click", function () {
        document.querySelectorAll(".axis-rotation-active").forEach(function (active) {
          active.classList.remove("axis-rotation-active");
        });

        card.classList.add("axis-rotation-active");
        setVideoToRotation();
        status("Vidéo active : rotation officielle");
      });
    });
  }

  function init() {
    const page = pageName();

    removeDownloadLinks();

    if (page === "rotor-optique.html") {
      setVideoToRotation();
      status("Vidéo active : rotation officielle");
      setTimeout(setVideoToRotation, 400);
      setTimeout(setVideoToRotation, 1200);
      setTimeout(setVideoToRotation, 2500);
      return;
    }

    if (page === "oscillation.html") {
      bindOscillationRotationButton();

      setTimeout(function () {
        bindOscillationRotationButton();
        removeDownloadLinks();
      }, 500);

      setTimeout(function () {
        bindOscillationRotationButton();
        removeDownloadLinks();
      }, 1500);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();