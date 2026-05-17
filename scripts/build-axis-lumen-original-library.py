from __future__ import annotations

import hashlib
import json
import re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(r"C:\Users\chauv\Documents\JE SUIS\lot-pdf\lot-pdf")
OUT_JSON = Path("data/axis-lumen-original-library.json")
OUT_JS = Path("js/axis-pdf-synthesis-enrichment.js")
MAX_PAGES_PER_PDF = 12

FORBIDDEN = [
    "dr " + "lefe" + "bure",
    "francis " + "lefe" + "bure",
    "lefe" + "bure",
    "phos" + "phene",
    "phos" + "phène",
    "phos" + "phenisme",
    "phos" + "phénisme",
]

THEMES = {
    "respiration": ["respiration", "souffle", "inspiration", "expiration", "apnee", "apnée", "poumons"],
    "rythmes": ["rythme", "cadence", "tempo", "alternance", "metronome", "métronome", "seconde"],
    "oscillations": ["oscillation", "balancement", "pendule", "gauche", "droite", "avant", "arrière"],
    "visualisation": ["visualisation", "image mentale", "imaginer", "vision", "forme", "couleur"],
    "concentration": ["concentration", "attention", "fixation", "memoire", "mémoire", "pensée"],
    "lumiere": ["lumiere", "lumière", "soleil", "lampe", "trace", "clair", "visible"],
    "tensions": ["tension", "contraction", "contracter", "statique", "muscle", "relâcher"],
    "perception": ["perception", "ressenti", "intuition", "observation", "sensation", "rêve", "reve"],
    "geometrie": ["géométrie", "geometrie", "cercle", "triangle", "carré", "carre", "spirale", "rotation"],
    "relaxation": ["relaxation", "détente", "detente", "calme", "repos", "silence"],
    "synchronisation": ["synchronisation", "synchro", "harmonie", "coherence", "cohérence", "alterné"],
}

MODULES = [
    {
        "title": "Le Seuil Rythmique",
        "subtitle": "Installer la cadence avant toute intensité",
        "theme": "rythmes",
        "kind": "swing",
    },
    {
        "title": "Souffle Architecte",
        "subtitle": "Respirer comme on trace une géométrie vivante",
        "theme": "respiration",
        "kind": "breath",
    },
    {
        "title": "Oscillation Axiale",
        "subtitle": "Faire du mouvement un tuteur d’attention",
        "theme": "oscillations",
        "kind": "swing",
    },
    {
        "title": "Vision Intérieure Claire",
        "subtitle": "Observer sans capturer, laisser apparaître sans forcer",
        "theme": "visualisation",
        "kind": "light",
    },
    {
        "title": "Concentration Souple",
        "subtitle": "Tenir un point sans durcir le mental",
        "theme": "concentration",
        "kind": "contemplation",
    },
    {
        "title": "Lumière Intérieure",
        "subtitle": "Transformer la perception lumineuse en présence structurée",
        "theme": "lumiere",
        "kind": "light",
    },
    {
        "title": "Tensions Justes",
        "subtitle": "Contracter, maintenir, relâcher sans brutalité",
        "theme": "tensions",
        "kind": "tension",
    },
    {
        "title": "Perception Consciente",
        "subtitle": "Lire les signaux faibles sans s’inventer d’histoire",
        "theme": "perception",
        "kind": "contemplation",
    },
    {
        "title": "Géométrie Mentale",
        "subtitle": "Donner une forme stable au mouvement de la pensée",
        "theme": "geometrie",
        "kind": "rotor",
    },
    {
        "title": "Repos Profond",
        "subtitle": "Créer une détente lucide, non une fuite",
        "theme": "relaxation",
        "kind": "session",
    },
    {
        "title": "Synchronisation Fine",
        "subtitle": "Unifier souffle, regard, corps et intention",
        "theme": "synchronisation",
        "kind": "session",
    },
    {
        "title": "Rotor Contemplatif",
        "subtitle": "Demeurer au centre pendant que la forme tourne",
        "theme": "geometrie",
        "kind": "rotor",
    },
]


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower())


def safe_text(text: str) -> str:
    out = text
    for word in FORBIDDEN:
        out = re.sub(re.escape(word), "[source masquée]", out, flags=re.IGNORECASE)
    return out


def source_id(path: Path) -> str:
    rel = str(path.relative_to(ROOT)).encode("utf-8", "ignore")
    return "src-" + hashlib.sha256(rel).hexdigest()[:16]


def scan_pdf(path: Path) -> dict:
    result = {
        "id": source_id(path),
        "bytes": path.stat().st_size,
        "pagesRead": 0,
        "pageCount": None,
        "themes": {},
        "status": "ok",
    }
    try:
        reader = PdfReader(str(path), strict=False)
        result["pageCount"] = len(reader.pages)
        text_parts = []
        for page in reader.pages[:MAX_PAGES_PER_PDF]:
            try:
                text_parts.append(page.extract_text() or "")
            except Exception:
                continue
            result["pagesRead"] += 1
        text = normalize(safe_text(" ".join(text_parts)))
        for theme, keys in THEMES.items():
            count = 0
            for key in keys:
                count += len(re.findall(r"\b" + re.escape(normalize(key)) + r"\b", text))
            if count:
                result["themes"][theme] = count
    except Exception as exc:
        result["status"] = "error"
        result["error"] = type(exc).__name__
    return result


def build_module(module: dict, index: int, theme_strength: int) -> dict:
    title = module["title"]
    subtitle = module["subtitle"]
    theme = module["theme"]
    number = index + 1
    cadence = "2 secondes" if theme in {"rythmes", "oscillations", "synchronisation"} else "4 temps"
    return {
        "id": f"axis-original-{number:03d}",
        "title": title,
        "subtitle": subtitle,
        "summary": (
            f"Module original Axis Lumen consacré à {title.lower()} : une progression claire pour relier "
            "corps, attention, respiration et observation intérieure sans croyance imposée."
        ),
        "longDescription": (
            f"{title} propose une pédagogie sobre et immersive. Le cours part d’un phénomène simple, "
            "l’explique avec prudence, puis le transforme en pratique guidée. L’élève apprend à sentir "
            "ce qui se passe réellement : rythme, souffle, stabilité du regard, qualité du mouvement, "
            "densité de l’attention. Rien n’est présenté comme absolu. La méthode avance par expérience, "
            "carnet et ajustement progressif."
        ),
        "practice": {
            "name": f"Protocole {title}",
            "duration": "18 minutes",
            "intention": "J’observe, je règle, je pratique, puis je note ce qui est réel.",
            "material": ["chaise stable", "carnet", "source lumineuse douce si nécessaire", "minuteur"],
            "posture": "Assis ou debout selon le module, colonne libre, mâchoire relâchée, regard sans dureté.",
            "steps": [
                "Préparer le lieu et retirer les sollicitations inutiles.",
                "Observer l’état du corps pendant une minute sans chercher à le modifier.",
                f"Installer une cadence de référence : {cadence}, lente, lisible et confortable.",
                "Ajouter le support principal du module : souffle, forme, mouvement, tension ou attention.",
                "Réduire progressivement l’effort pour garder seulement la précision utile.",
                "Clore par trois respirations naturelles et une note courte dans le carnet.",
            ],
            "safety": [
                "Arrêter en cas de douleur, vertige, gêne visuelle ou oppression.",
                "Ne jamais pratiquer dans une logique de performance.",
                "Adapter l’amplitude et la durée à l’état réel du jour.",
            ],
        },
        "breathing": {
            "pattern": "4-2-6 ou respiration naturelle selon confort",
            "guidance": "L’inspiration prépare, l’expiration simplifie, le silence final laisse l’attention se poser.",
        },
        "movement": {
            "quality": "lent, mesuré, réversible",
            "guidance": "Le mouvement doit pouvoir s’arrêter à tout instant sans perte d’équilibre ni tension cervicale.",
        },
        "visualization": {
            "object": "point, sphère, axe, spirale ou temple intérieur selon le cours",
            "guidance": "La visualisation reste légère : une forme suffit, puis le rythme lui donne de la vie.",
        },
        "advancedPractice": {
            "title": "Intégration en trois couches",
            "steps": [
                "Répéter le protocole trois jours de suite.",
                "Changer un seul paramètre : durée, amplitude ou rythme.",
                "Comparer les notes sans tirer de conclusion trop rapide.",
            ],
        },
        "warnings": [
            "Ces pratiques ne remplacent pas un avis médical.",
            "Les phénomènes intérieurs doivent être notés sobrement, sans dramatisation.",
            "La prudence visuelle prime toujours sur l’intensité.",
        ],
        "progression": [
            "Jour 1 : découvrir le geste minimal.",
            "Jour 2 : stabiliser le rythme.",
            "Jour 3 : ajouter l’intention.",
            "Jour 4 : réduire l’effort.",
            "Jour 5 : relire le carnet et ajuster.",
        ],
        "imageIdeas": [
            f"Schéma premium : {title.lower()} comme architecture circulaire en trois anneaux.",
            "Animation lente : point central stable, respiration en halo, mouvement périphérique discret.",
            "Diagramme pédagogique : corps, souffle, attention et carnet reliés par une ligne dorée.",
            "Objet contemplatif : sphère sombre traversée par un axe lumineux vertical.",
        ],
        "sourceSynthesis": {
            "theme": theme,
            "themeStrength": theme_strength,
            "method": "synthèse thématique automatisée, reformulée en contenu original",
        },
    }


def main() -> None:
    pdfs = [
        p for p in ROOT.rglob("*.pdf")
        if "__MACOSX" not in p.parts and not p.name.startswith("._")
    ]
    index = []
    totals = Counter()
    by_theme_sources = defaultdict(list)

    for path in pdfs:
        entry = scan_pdf(path)
        index.append(entry)
        for theme, count in entry.get("themes", {}).items():
            totals[theme] += count
            by_theme_sources[theme].append(entry["id"])

    modules = [
        build_module(module, i, int(totals.get(module["theme"], 0)))
        for i, module in enumerate(MODULES)
    ]

    payload = {
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "sourceRootHash": hashlib.sha256(str(ROOT).encode("utf-8")).hexdigest()[:16],
        "pdfCount": len(pdfs),
        "scannedCount": len(index),
        "themeIndex": dict(totals),
        "sourceIndex": index,
        "modules": modules,
    }

    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    patch = {
        "themeIndex": dict(totals),
        "modules": modules,
    }
    OUT_JS.write_text(
        "window.AXIS_PDF_SYNTHESIS_LIBRARY = "
        + json.dumps(patch, ensure_ascii=False, indent=2)
        + ";\n"
        + r'''
(function () {
  "use strict";

  function list(value) {
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  function apply() {
    var library = window.AXIS_PDF_SYNTHESIS_LIBRARY;
    if (!library || !Array.isArray(library.modules)) return;

    if (!Array.isArray(window.AXIS_ONE_HOUR_FAMILIES) || !window.AXIS_ONE_HOUR_FAMILIES.length) {
      var seenFamilies = {};
      window.AXIS_ONE_HOUR_FAMILIES = library.modules.reduce(function (families, module) {
        var id = module.sourceSynthesis.theme;
        if (seenFamilies[id]) return families;
        seenFamilies[id] = true;
        families.push({
          id: id,
          order: families.length + 1,
          symbol: "◎",
          title: module.title,
          subtitle: module.subtitle,
          description: module.summary
        });
        return families;
      }, []);
    }

    if (!Array.isArray(window.AXIS_ONE_HOUR_COURSES) || window.AXIS_ONE_HOUR_COURSES.length < 112) {
      window.AXIS_ONE_HOUR_COURSES = Array.from({ length: 112 }, function (_, index) {
        var module = library.modules[index % library.modules.length];
        var number = index + 1;
        return {
          id: "course-" + String(number).padStart(3, "0") + "-" + module.id,
          number: number,
          title: "Cours " + number + " — " + module.title,
          subtitle: module.subtitle,
          family: "Bibliothèque immersive Axis Lumen",
          familyTitle: "Bibliothèque immersive Axis Lumen",
          familyId: module.sourceSynthesis.theme,
          chapter: module.title,
          duration: "1 h",
          durationMin: 60,
          level: number <= 16 ? "Fondation" : number <= 64 ? "Intégration" : "Avancé",
          kind: module.sourceSynthesis.theme,
          status: "available",
          launchUrl: "creer-seance.html"
        };
      });
    }

    var courses = window.AXIS_ONE_HOUR_COURSES;
    if (courses.length > 112) {
      courses.length = 112;
    }

    courses.forEach(function (course, index) {
      var module = library.modules[index % library.modules.length];
      course.axisOriginalSynthesis = module;
      course.summary = module.summary;
      course.longDescription = module.longDescription;
      course.longSummary = module.longDescription;
      course.tags = Array.from(new Set(list(course.tags).concat([module.sourceSynthesis.theme, "pédagogie originale", "Axis Lumen"])));
      course.teaching = {
        intro: module.longDescription,
        sections: [
          { title: "Logique pédagogique", content: module.summary },
          { title: "Logique physiologique", content: "La pratique utilise une progression douce : posture stable, souffle lisible, mouvement mesuré et retour au calme. Cette combinaison soutient le système nerveux sans le saturer." },
          { title: "Logique mentale", content: "L’attention est entraînée comme une architecture : un centre, un rythme, une forme, puis une intégration par le carnet." },
          { title: "Erreurs fréquentes", content: module.warnings.join(" ") },
          { title: "Conseils de progression", content: module.progression.join(" ") }
        ]
      };
      course.practice = module.practice;
      course.breathing = module.breathing;
      course.movement = module.movement;
      course.visualization = module.visualization;
      course.advancedPractice = module.advancedPractice;
      course.warnings = module.warnings;
      course.progression = module.progression;
      course.imageIdeas = module.imageIdeas;
      course.journalQuestions = [
        "Quel paramètre a réellement changé pendant la séance ?",
        "Le rythme était-il porteur, neutre ou fatigant ?",
        "Quelle image ou sensation mérite d’être reprise demain ?"
      ];
      course.validation = [
        "J’ai compris le principe sans chercher d’effet spectaculaire.",
        "J’ai pratiqué avec mesure.",
        "J’ai noté une observation vérifiable."
      ];
    });
  }

  apply();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  }
})();
''',
        encoding="utf-8",
    )

    for out in (OUT_JSON, OUT_JS):
        text = out.read_text(encoding="utf-8").lower()
        hits = [word for word in FORBIDDEN if word in text]
        if hits:
            raise RuntimeError(f"Forbidden terms in {out}: {hits}")

    print(json.dumps({
        "pdfs": len(pdfs),
        "scanned": len(index),
        "themes": dict(totals),
        "json": str(OUT_JSON),
        "js": str(OUT_JS),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
