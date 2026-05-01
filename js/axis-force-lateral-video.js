(function () {
  const STAMP = "20260501_192957";
  const LATERAL_SRC = "assets/videos/web/axis-balancement-lateral-source.mp4";

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

  function setVideoToLateral() {
    const video = mainVideo();
    if (!video) return;

    const src = LATERAL_SRC + "?v=" + STAMP;

    if (!video.src.includes(LATERAL_SRC)) {
      video.pause();
      video.src = src;
      video.load();
    }

    protectVideo(video);
    removeDownloadLinks();

    document.documentElement.setAttribute("data-axis-lateral-source", "official");
    console.info("Balancement latéral officiel appliqué :", LATERAL_SRC);
  }

  function status(message) {
    let el = document.querySelector(".axis-lateral-video-status");

    if (!el) {
      el = document.createElement("div");
      el.className = "axis-lateral-video-status";

      const video = mainVideo();

      if (video && video.parentElement) {
        video.parentElement.insertBefore(el, video);
      } else {
        (document.querySelector("main") || document.body).prepend(el);
      }
    }

    el.textContent = message;
  }

  function bindLateralButton() {
    if (pageName() !== "oscillation.html") return;

    const clickables = Array.from(document.querySelectorAll("button, a, article, .card, .feature-card, div"));

    clickables.forEach(function (el) {
      const txt = normalize(el.textContent || "");

      const isLateral =
        txt.includes("lateral") ||
        txt.includes("latéral") ||
        txt.includes("balancement lateral") ||
        txt.includes("balancement latéral");

      if (!isLateral) return;

      const card = el.closest("article, .card, .feature-card") || el;
      card.style.cursor = "pointer";
      card.setAttribute("data-axis-lateral-button", "true");

      if (card.dataset.axisLateralBound === "1") return;

      card.dataset.axisLateralBound = "1";

      card.addEventListener("click", function () {
        document.querySelectorAll(".axis-lateral-active").forEach(function (active) {
          active.classList.remove("axis-lateral-active");
        });

        card.classList.add("axis-lateral-active");
        setVideoToLateral();
        status("Vidéo active : balancement latéral officiel");
      });
    });
  }

  function init() {
    if (pageName() !== "oscillation.html") return;

    bindLateralButton();
    setVideoToLateral();
    status("Vidéo active : balancement latéral officiel");

    setTimeout(function () {
      bindLateralButton();
      setVideoToLateral();
      removeDownloadLinks();
    }, 500);

    setTimeout(function () {
      bindLateralButton();
      removeDownloadLinks();
    }, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();