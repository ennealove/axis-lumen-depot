import { SWINGS } from "./core/state.js";

const premiumSwings = {
  lateral: {
    label: "Latéral",
    mantra: "ILLI",
    rhythm: 2,
    rhythmSeconds: 2,
    rhythmText: "2 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Balancement latéral : oreille vers épaule, gauche puis droite, buste stable."
  },
  vertical: {
    label: "Vertical",
    mantra: "ALLA",
    rhythm: 2,
    rhythmSeconds: 2,
    rhythmText: "2 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Balancement vertical : hochement doux vers l'avant puis retour neutre, sans brusquer la nuque."
  },
  rotation: {
    label: "Rotation",
    mantra: "RORO",
    rhythm: 3,
    rhythmSeconds: 3,
    rhythmText: "3 secondes",
    face: "front",
    view: "front",
    assetMode: "front",
    explanation: "Rotation douce de la tête. Alterner horaire et antihoraire pour compenser."
  }
};

Object.keys(SWINGS).forEach((key) => delete SWINGS[key]);
Object.assign(SWINGS, premiumSwings);

window.AXIS_PREMIUM_ASSETS = {
  root: "assets/images",
  busteFace: "assets/images/buste_face.png",
  busteProfil: "assets/images/buste_profil.png",
  teteFace: "assets/images/tete_face.png",
  teteProfil: "assets/images/tete_profil.png",
  halo: "assets/images/halo_lumineux.png"
};

