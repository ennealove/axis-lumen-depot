(() => {
  "use strict";

  const NEW_KICKER = "ÉCOLE DU TEMPLE VIVANT";
  const NEW_TITLE = "Cours d’une heure — enseignement, pratique et intégration";
  const NEW_TEXT = "Chaque cours devient un véritable module d’environ une heure : un enseignement structuré, une image dédiée, un support PDF imprimable, un cadre de protection, des références et une pratique guidée. Les 72 portes existantes restent la base du parcours ; elles deviennent les fondations d’une grande école évolutive, pensée pour accompagner l’élève pas à pas : comprendre, pratiquer, observer, intégrer, puis valider son expérience intérieure.";

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function fixLearningIntro() {
    const nodes = Array.from(document.querySelectorAll("p, h1, h2, h3, span, div"));

    nodes.forEach((node) => {
      const text = cleanText(node.textContent);

      if (!text) return;

      if (
        text.includes("nouvelle architecture pédagogique") ||
        text.includes("nouvelle architecture pedagogique")
      ) {
        node.textContent = NEW_KICKER;
      }

      if (
        text.includes("école des cours d’une heure") ||
        text.includes("ecole des cours d’une heure") ||
        text.includes("école des cours d'une heure") ||
        text.includes("ecole des cours d'une heure")
      ) {
        node.textContent = NEW_TITLE;
      }

      if (
        text.includes("une extension premium de l’onglet apprendre") ||
        text.includes("une extension premium de l'onglet apprendre") ||
        text.includes("les 72 portes existantes restent en place")
      ) {
        node.textContent = NEW_TEXT;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fixLearningIntro);
  } else {
    fixLearningIntro();
  }

  setTimeout(fixLearningIntro, 300);
  setTimeout(fixLearningIntro, 1000);
  setTimeout(fixLearningIntro, 2500);

  const observer = new MutationObserver(fixLearningIntro);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();

