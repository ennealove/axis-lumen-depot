import { $ } from './core/dom.js';
import { state } from './core/state.js';
import { preloadImages } from './core/media.js';
import { bindNavigation, showView } from './core/navigation.js';
import { speak, pauseSpeech, resumeSpeech, stopSpeech } from './core/speech.js';
import { startSchedule, pauseSchedule, resumeSchedule, nextPhase, stopSchedule } from './core/schedule.js';
import { bundledLibrary, loadServerLibrary, populateAudioSelects, bindLibraryInputs, renderLibrary, renderLibraryRoots } from './modules/library.js';
import { populateObjectSelects, populateSwingSelects, bindMixageInputs, refreshMixageInfo, getMixageConfig, buildMixageSchedule } from './modules/mixage.js';
import { bindSessionInputs, refreshSessionSummary, getSessionConfig, buildSessionSchedule } from './modules/session.js';
import { populateBreathSelects, bindBreathInputs, refreshBreathSummary, getBreathConfig, buildBreathSchedule } from './modules/respiration.js';
import { populateGyroModelSelects, bindGyroInputs, getGyroConfig, buildGyroSchedule } from './modules/gyrascope.js';
import { bindTensionInputs, getTensionConfig, buildTensionSchedule } from './modules/tensions.js';
import { renderLessons, bindLearningControls, buildReadAllLessonsText } from './modules/apprendre.js';
import { initTemplePlus } from './modules/temple-plus.js';
import { refreshPreviewState, showStageOverlay, drawPracticeCanvas, drawStageCanvas, hideStageOverlay } from './modules/pratique.js';
import { drawDashboard, drawMixagePreview } from './render/mixage-renderer.js';
import { drawBreathPreview } from './render/breath-renderer.js';
import { drawGyroPreview } from './render/gyrascope-renderer.js';
import { drawTensionPreview } from './render/tension-renderer.js';

document.addEventListener('DOMContentLoaded', init);

export async function init() {
  loadSettings();
  applySettingsToUi();
  await preloadImages();
  state.library = bundledLibrary();
  await loadServerLibrary();
  populateObjectSelects();
  populateSwingSelects();
  populateBreathSelects();
  populateGyroModelSelects();
  populateAudioSelects();
  bindNavigation();
  bindSettings();
  bindButtons();
  bindMixageInputs();
  bindSessionInputs();
  bindBreathInputs();
  bindGyroInputs();
  bindTensionInputs();
  bindLibraryInputs();
  renderLessons();
  bindLearningControls();
  await initTemplePlus();
  renderLibraryRoots();
  renderLibrary();
  refreshMixageInfo();
  refreshBreathSummary();
  refreshSessionSummary();
  refreshPreviewState();
  animationLoop();
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem('phosphene-studio-v3-settings');
    if (raw) state.settings = { ...state.settings, ...JSON.parse(raw) };
  } catch {}
}

export function saveSettings() {
  localStorage.setItem('phosphene-studio-v3-settings', JSON.stringify(state.settings));
}

export function applySettingsToUi() {
  $('#voiceEnabled').checked = state.settings.voiceEnabled;
  $('#soundEnabled').checked = state.settings.soundEnabled;
  $('#speechRate').value = String(state.settings.speechRate);
}

export function bindSettings() {
  $('#voiceEnabled').addEventListener('change', (e) => { state.settings.voiceEnabled = e.target.checked; saveSettings(); });
  $('#soundEnabled').addEventListener('change', (e) => { state.settings.soundEnabled = e.target.checked; saveSettings(); });
  $('#speechRate').addEventListener('input', (e) => { state.settings.speechRate = Number(e.target.value || 0.95); saveSettings(); });
}

export function bindButtons() {
  $('#quickMixage15').addEventListener('click', async () => { $('#mixageDuration').value = '15'; refreshMixageInfo(); await startSchedule(buildMixageSchedule(getMixageConfig())); });
  $('#quickSession45').addEventListener('click', async () => { $('#sessionMixageMin').value = '15'; $('#sessionBreathMin').value = '15'; $('#sessionFinalMin').value = '15'; refreshSessionSummary(); await startSchedule(buildSessionSchedule(getSessionConfig())); });

  $('#startMixage').addEventListener('click', async () => startSchedule(buildMixageSchedule(getMixageConfig())));
  $('#sendMixageToPractice').addEventListener('click', () => { state.currentPreviewModule = 'mixage'; refreshPreviewState(); showView('pratique'); });

  $('#previewSession').addEventListener('click', () => { refreshSessionSummary(); showView('session'); });
  $('#startSession').addEventListener('click', async () => startSchedule(buildSessionSchedule(getSessionConfig())));

  $('#startBreath').addEventListener('click', async () => startSchedule(buildBreathSchedule(getBreathConfig())));
  $('#sendBreathToPractice').addEventListener('click', () => { state.currentPreviewModule = 'respiration'; refreshPreviewState(); showView('pratique'); });

  $('#startGyro').addEventListener('click', async () => startSchedule(buildGyroSchedule(getGyroConfig())));
  $('#gyroFullscreenBtn').addEventListener('click', () => { state.currentPreviewModule = 'gyrascope'; refreshPreviewState(); showStageOverlay(); });

  $('#startTension').addEventListener('click', async () => startSchedule(buildTensionSchedule(getTensionConfig())));
  $('#sendTensionToPractice').addEventListener('click', () => { state.currentPreviewModule = 'tensions'; refreshPreviewState(); showView('pratique'); });

  $('#openPracticeStage').addEventListener('click', showStageOverlay);
  $('#practiceFullscreenBtn').addEventListener('click', showStageOverlay);
  $('#practiceStopBtn').addEventListener('click', () => stopSchedule());

  $('#overlayPause').addEventListener('click', pauseSchedule);
  $('#overlayResume').addEventListener('click', resumeSchedule);
  $('#overlayNext').addEventListener('click', nextPhase);
  $('#overlayFullscreen').addEventListener('click', async () => { const target = document.getElementById('stageOverlay') || document.documentElement; try { await target.requestFullscreen(); } catch {} });
  $('#overlayClose').addEventListener('click', hideStageOverlay);

  $('#readAllLessons')?.addEventListener('click', () => speak(buildReadAllLessonsText(), { key: 'read-all-lessons', force: true }));
  $('#pauseLessons')?.addEventListener('click', pauseSpeech);
  $('#resumeLessons')?.addEventListener('click', resumeSpeech);
  $('#stopLessons')?.addEventListener('click', stopSpeech);
}

export function animationLoop(time = 0) {
  drawDashboard(time / 1000);
  drawMixagePreview(time / 1000);
  drawBreathPreview(time / 1000);
  drawGyroPreview(time / 1000);
  drawTensionPreview(time / 1000);
  drawPracticeCanvas(time / 1000);
  drawStageCanvas(time / 1000);
  state.rafId = requestAnimationFrame(animationLoop);
}
