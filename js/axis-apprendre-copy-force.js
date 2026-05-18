(() => {
  "use strict";

  const NEW_KICKER = "ÉCOLE DU TEMPLE VIVANT";
  const NEW_TITLE = "Cours d’une heure — enseignement, pratique et intégration";
  const NEW_TEXT = "117 modules d’une heure chacun — enseignement structuré, pratique corporelle, questions de carnet et séance pré-configurée. Un parcours de 19 mois pour transformer durablement sa vie intérieure. Chaque cours se valide avant d’ouvrir le suivant.";

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

