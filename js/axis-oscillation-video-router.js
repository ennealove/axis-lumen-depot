(function () {
  const STAMP = "20260501_192226";
  const SOURCES = [{"key":"lateral","label":"Balancement latéral","src":"assets/videos/web/oscillation-lateral.mp4","source":"C:\\Users\\chauv\\Documents\\JE SUIS\\je-suis-site\\phosphene-studio\\assets\\videos\\complete\\balancement-lateral-complet.mp4"},{"key":"vertical","label":"Balancement vertical","src":"assets/videos/web/oscillation-vertical.mp4","source":"C:\\Users\\chauv\\Documents\\JE SUIS\\je-suis-site\\phosphene-studio\\assets\\vidéo\\vidéo complète\\utiles\\balancement vertical 3 minutes .mp4"},{"key":"rotation","label":"Rotation","src":"assets/videos/web/oscillation-rotation.mp4","source":"C:\\Users\\chauv\\Documents\\JE SUIS\\je-suis-site\\phosphene-studio\\assets\\vidéo\\vidéo complète\\utiles\\rotation.mp4"}];

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

  function sourceFor(kind) {
    return SOURCES.find(function (item) {
      return item.key === kind;
    });
  }

  function kindFromText(text) {
    const t = normalize(text);

    if (t.includes("vertical")) return "vertical";
    if (t.includes("rotation") || t.includes("rotatif") || t.includes("rotative")) return "rotation";
    if (t.includes("lateral") || t.includes("latéral") || t.includes("lateral")) return "lateral";

    return "";
  }

  function mainVideo() {
    const videos = Array.from(document.querySelectorAll("video"));

    if (videos.length) {
      return videos.sort(function (a, b) {
        return (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight);
      })[0];
    }

    const main = document.querySelector("main") || document.body;
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.className = "axis-oscillation-main-video";
    main.appendChild(video);

    return video;
  }

  function applyNoDownload(video) {
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
      const txt = normalize(a.textContent);

      if (
        /\.(mp4|webm|mov|m4v)(\?|$)/i.test(href) &&
        (txt.includes("telecharger") || txt.includes("download") || txt.includes("video"))
      ) {
        a.style.display = "none";
        a.setAttribute("aria-hidden", "true");
      }
    });
  }

  function setStatus(message) {
    let status = document.querySelector(".axis-oscillation-status");

    if (!status) {
      const router = document.querySelector(".axis-oscillation-router");
      if (!router) return;

      status = document.createElement("div");
      status.className = "axis-oscillation-status";
      router.appendChild(status);
    }

    status.textContent = message;
  }

  function setVideo(kind) {
    const source = sourceFor(kind);
    const video = mainVideo();

    if (!source || !source.src || !video) {
      setStatus("Vidéo introuvable pour ce bouton.");
      return;
    }

    const finalSrc = source.src + "?v=" + STAMP;

    if (!video.src.includes(source.src)) {
      video.pause();
      video.src = finalSrc;
      video.load();
    }

    applyNoDownload(video);

    document.querySelectorAll(".axis-video-choice-active").forEach(function (el) {
      el.classList.remove("axis-video-choice-active");
    });

    document.querySelectorAll("[data-axis-oscillation-kind='" + kind + "']").forEach(function (el) {
      el.classList.add("axis-video-choice-active");
    });

    setStatus("Vidéo active : " + source.label);
    document.documentElement.setAttribute("data-axis-oscillation-video", kind);
  }

  function ensureRouterPanel() {
    if (document.querySelector(".axis-oscillation-router")) return;

    const video = mainVideo();
    const host = video && video.parentElement ? video.parentElement : (document.querySelector("main") || document.body);

    const panel = document.createElement("section");
    panel.className = "axis-oscillation-router";
    panel.innerHTML = [
      "<p class='axis-oscillation-router-title'>Choisir la vidéo guidée</p>",
      "<div class='axis-oscillation-router-buttons'>",
      "  <button type='button' data-axis-oscillation-kind='lateral'>Balancement latéral</button>",
      "  <button type='button' data-axis-oscillation-kind='vertical'>Balancement vertical</button>",
      "  <button type='button' data-axis-oscillation-kind='rotation'>Rotation</button>",
      "</div>",
      "<div class='axis-oscillation-status'>Sélectionne une vidéo.</div>"
    ].join("");

    host.insertBefore(panel, video);
  }

  function markExistingButtons() {
    document.querySelectorAll("button, a, article, .card, .feature-card, .practice-card, .axis-card").forEach(function (el) {
      if (el.classList && el.classList.contains("axis-oscillation-router")) return;

      const kind = kindFromText(el.textContent + " " + (el.getAttribute("aria-label") || ""));

      if (!kind) return;

      el.setAttribute("data-axis-oscillation-kind", kind);
      el.style.cursor = "pointer";
    });
  }

  function bindClicks() {
    document.addEventListener("click", function (event) {
      const target = event.target.closest("[data-axis-oscillation-kind]");

      if (!target) return;

      const kind = target.getAttribute("data-axis-oscillation-kind");
      if (!kind) return;

      event.preventDefault();
      event.stopPropagation();

      setVideo(kind);
    }, true);
  }

  function init() {
    if (pageName() !== "oscillation.html") return;

    ensureRouterPanel();
    markExistingButtons();
    bindClicks();

    document.querySelectorAll("video").forEach(applyNoDownload);
    removeDownloadLinks();

    setTimeout(function () {
      markExistingButtons();
      removeDownloadLinks();
      setVideo("lateral");
    }, 250);

    setTimeout(function () {
      markExistingButtons();
      removeDownloadLinks();
    }, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();