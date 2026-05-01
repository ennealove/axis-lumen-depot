export const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm']; export const IMAGE_SOURCES = { faceFront: 'assets/images/face_front.svg', faceBack: 'assets/images/face_back.svg', flower: 'assets/images/flower.png', tree: 'assets/images/tree.svg', geometry: 'assets/images/geometry.svg', gyroModel1: 'assets/images/gyro_model_1.png', gyroModel2: 'assets/images/gyro_model_2.png', gyroModel3: 'assets/images/gyro_model_3.png', gyroModel4: 'assets/images/gyro_model_4.png', }; export const OBJECTS = { flower: { label: 'Fleur', icon: '??', imageKey: 'flower', category: 'plante' }, tree: { label: 'Arbre', icon: '??', imageKey: 'tree', category: 'plante' }, geometry: { label: 'Géométrie', icon: '?', imageKey: 'geometry', category: 'géométrie' }, lotus: { label: 'Lotus', icon: '??', category: 'plante' }, seed: { label: 'Graine', icon: '??', category: 'plante' }, spiral: { label: 'Spirale', icon: '??', category: 'géométrie' }, triangle: { label: 'Triangle', icon: '??', category: 'géométrie' }, star: { label: 'Étoile', icon: '?', category: 'géométrie' }, cube: { label: 'Cube', icon: '??', category: 'volume' }, sphere: { label: 'Sphère', icon: '?', category: 'volume' }, }; export const GYRO_MODELS = { model1: { label: 'Modèle 1', src: 'assets/images/gyro_model_1.png', imageKey: 'gyroModel1' }, model2: { label: 'Modèle 2', src: 'assets/images/gyro_model_2.png', imageKey: 'gyroModel2' }, model3: { label: 'Modèle 3', src: 'assets/images/gyro_model_3.png', imageKey: 'gyroModel3' }, model4: { label: 'Modèle 4', src: 'assets/images/gyro_model_4.png', imageKey: 'gyroModel4' }, }; export const SWINGS = {
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
}; export const BREATH_TYPES = { square: { label: 'Carrée' }, rectangular: { label: 'Rectangulaire' }, triangular: { label: 'Triangulaire' }, }; export const state = { settings: { voiceEnabled: true, soundEnabled: true, speechRate: 0.95, speechVolume: 0.9 }, images: {}, library: [], currentPreviewModule: 'mixage', currentPreviewConfig: {}, customGyroImage: null, customGyroImageObj: null, audioCtx: null, backgroundAudio: null, backgroundAudioId: null, schedule: [], phaseIndex: -1, currentPhase: null, phaseStart: 0, phaseTimer: null, paused: false, pauseAt: 0, rafId: 0, speechKey: '', serverRoots: [], libraryScanMessage: '', learningContent: null, speechPaused: false, }; 
