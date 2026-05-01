# ============================================================
#  AXIS LUMEN — Réécriture directe des fichiers core
#  Réécrit : index.html + js/core/state.js + js/main.js
#  Lance depuis PowerShell (pas besoin d'admin)
# ============================================================

$ROOT = "C:\Users\chauv\Documents\AXIS LUMEN\dev\axis-lumen-front\public\phosphene-studio"

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  AXIS LUMEN — Réécriture des fichiers core" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

# ─── Sauvegarde ──────────────────────────────────────────────
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$BACKUP = "$ROOT\..\phosphene-studio-BACKUP-$stamp"
Write-Host "[0] Sauvegarde → $BACKUP" -ForegroundColor Yellow
Copy-Item -Recurse -Path $ROOT -Destination $BACKUP
Write-Host "    OK" -ForegroundColor Green
Write-Host ""

# ============================================================
#  Fonction utilitaire : écriture UTF-8 sans BOM
# ============================================================
function Write-Utf8 {
  param([string]$Path, [string]$Content)
  $enc = New-Object System.Text.UTF8Encoding $false   # false = pas de BOM
  [System.IO.File]::WriteAllText($Path, $Content, $enc)
}

# ============================================================
#  1. index.html
# ============================================================
Write-Host "[1] Réécriture de index.html..." -ForegroundColor Yellow

$indexHtml = @'
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AXIS LUMEN STUDIO V3 — Plateforme de biofeedback guidé</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="app-shell">
    <aside class="sidebar glass">
      <div class="brand">
        <div class="brand-mark">◎</div>
        <div>
          <h1>AXIS LUMEN STUDIO V3</h1>
          <p>Guide vivant · séance complète</p>
        </div>
      </div>

      <nav class="nav-tabs" aria-label="Navigation principale">
        <button class="nav-tab active" data-view="dashboard">Accueil</button>
        <button class="nav-tab" data-view="session">Séance complète</button>
        <button class="nav-tab" data-view="mixage">Oscillation guidée</button>
        <button class="nav-tab" data-view="respiration">Respiration</button>
        <button class="nav-tab" data-view="rotor">Rotor Optique</button>
        <button class="nav-tab" data-view="tensions">Tensions statiques</button>
        <button class="nav-tab" data-view="apprendre">Apprendre</button>
        <button class="nav-tab" data-view="bibliotheque">Bibliothèque</button>
        <button class="nav-tab" data-view="pratique">Mode pratique</button>
      </nav>

      <section class="settings-block">
        <h2>Guidage</h2>
        <label class="switch-row">
          <span>Voix synthétique</span>
          <input id="voiceEnabled" type="checkbox" checked />
        </label>
        <label class="switch-row">
          <span>Sons repères</span>
          <input id="soundEnabled" type="checkbox" checked />
        </label>
        <label class="stacked">
          <span>Vitesse voix</span>
          <input id="speechRate" type="range" min="0.8" max="1.25" step="0.05" value="0.95" />
        </label>
      </section>

      <section class="settings-block compact-note">
        <h2>Voie retenue</h2>
        <p>Le protocole d'oscillation intègre déjà le balancement guidé : observation de l'objet, lumière, grand mouvement, petit mouvement, grand mouvement, ancrage associé et recharge.</p>
        <p class="muted small">Le lanceur Windows démarre un petit serveur local pour améliorer la lecture audio et l'import.</p>
      </section>
    </aside>

    <main class="main-panel">
      <header class="topbar glass">
        <div>
          <div class="eyebrow">Voix · temps · audio · visuel synchronisés</div>
          <h2 id="viewTitle">Accueil</h2>
        </div>
        <div class="topbar-actions">
          <button id="quickMixage15" class="primary-btn">Oscillation 15 min</button>
          <button id="quickSession45" class="secondary-btn">Séance 45 min</button>
          <button id="openPracticeStage" class="secondary-btn">Plein écran</button>
        </div>
      </header>

      <!-- DASHBOARD -->
      <section id="dashboard" class="view active">
        <div class="grid two-col">
          <article class="card hero-card">
            <div class="hero-copy">
              <div class="eyebrow">Objectif central</div>
              <h3>L'utilisateur écoute, suit, pratique.</h3>
              <p>La séance complète intègre le protocole d'oscillation guidée comme cœur du système : image observée, biofeedback lumineux, balancement animé sur visage humain, ancrage sonore imposé, puis recharge.</p>
              <div class="hero-actions">
                <button class="primary-btn go-view" data-target="mixage">Configurer l'oscillation</button>
                <button class="secondary-btn go-view" data-target="session">Construire une séance</button>
              </div>
            </div>
            <div class="hero-visual">
              <canvas id="dashboardCanvas" width="560" height="340"></canvas>
            </div>
          </article>

          <article class="card">
            <h3>Cycle universel</h3>
            <ol class="timeline">
              <li><strong>1.</strong> Observation de l'objet — 30 s</li>
              <li><strong>2.</strong> Observation lumineuse — 30 s</li>
              <li><strong>3.</strong> Fermez les yeux · mettez votre bandeau</li>
              <li><strong>4.</strong> Travail guidé : oscillation, respiration, rotor optique ou tensions</li>
            </ol>
            <div class="note-box">
              <strong>Règle fixe :</strong> quand un balancement est choisi dans le protocole, l'ancrage associé devient obligatoire. La voix l'annonce au départ, puis rappelle les changements de phase.
            </div>
          </article>
        </div>

        <div class="grid three-col">
          <article class="card mini-card">
            <h3>Oscillation guidée</h3>
            <p>Visage humain animé, point de concentration, cycles ample / réduit / ample, recharge automatique.</p>
            <button class="secondary-btn go-view" data-target="mixage">Ouvrir</button>
          </article>
          <article class="card mini-card">
            <h3>Respiration</h3>
            <p>Carrée, rectangulaire ou triangulaire. Une seule mesure de base, sons repères, musique de fond possible.</p>
            <button class="secondary-btn go-view" data-target="respiration">Ouvrir</button>
          </article>
          <article class="card mini-card">
            <h3>Rotor Optique</h3>
            <p>Grande structure colorée, anneau externe fixe, centre mobile, objet sur pale et vitesse graduée.</p>
            <button class="secondary-btn go-view" data-target="rotor">Ouvrir</button>
          </article>
        </div>
      </section>

      <!-- SESSION -->
      <section id="session" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Séance complète</h3>
            <p class="muted">Le protocole inclut déjà le balancement : objet + biofeedback + mouvement de tête + ancrage. Chaque bloc conserve ses pistes dédiées.</p>
            <div class="grid compact-grid">
              <label class="stacked">
                <span>Objet principal</span>
                <select id="sessionObject"></select>
              </label>
              <label class="stacked">
                <span>Balancement de l'oscillation</span>
                <select id="sessionSwing"></select>
              </label>
              <label class="stacked">
                <span>Respiration</span>
                <select id="sessionBreath"></select>
              </label>
              <label class="stacked">
                <span>Final</span>
                <select id="sessionFinal">
                  <option value="rotor">Rotor Optique</option>
                  <option value="tensions">Tensions statiques</option>
                </select>
              </label>
              <label class="stacked">
                <span>Oscillation active (min)</span>
                <input id="sessionMixageMin" type="number" min="15" max="45" step="3" value="15" />
              </label>
              <label class="stacked">
                <span>Respiration (min)</span>
                <input id="sessionBreathMin" type="number" min="3" max="30" step="1" value="15" />
              </label>
              <label class="stacked">
                <span>Final (min)</span>
                <input id="sessionFinalMin" type="number" min="3" max="30" step="1" value="15" />
              </label>
              <div class="session-subcard">
                <div class="eyebrow">Pistes dédiées</div>
                <label class="stacked small-gap">
                  <span>Oscillation · playlists support</span>
                  <select id="sessionMixageAudio"></select>
                </label>
                <label class="stacked small-gap">
                  <span>Respiration · playlists support</span>
                  <select id="sessionBreathAudio"></select>
                </label>
                <label class="stacked small-gap">
                  <span>Final</span>
                  <select id="sessionFinalAudio"></select>
                </label>
              </div>
            </div>

            <div id="sessionGyroOptions" class="session-subcard">
              <div class="eyebrow">Réglages finaux du Rotor Optique</div>
              <div class="grid compact-grid">
                <label class="stacked">
                  <span>Objet central</span>
                  <select id="sessionGyroObject"></select>
                </label>
                <label class="stacked">
                  <span>Modèle visuel</span>
                  <select id="sessionGyroModel"></select>
                </label>
                <label class="stacked">
                  <span>Sens</span>
                  <select id="sessionGyroDirection">
                    <option value="clockwise">Horaire</option>
                    <option value="counterclockwise">Antihoraire</option>
                  </select>
                </label>
                <label class="stacked">
                  <span>Vitesse graduée</span>
                  <input id="sessionGyroSpeed" type="range" min="0" max="30" step="1" value="15" />
                </label>
                <label class="stacked">
                  <span>Couleur centre</span>
                  <input id="sessionGyroColorInner" type="color" value="#ffd36b" />
                </label>
                <label class="stacked">
                  <span>Couleur anneau externe</span>
                  <input id="sessionGyroColorOuter" type="color" value="#6cb9ff" />
                </label>
                <div class="inline-note">Le final Rotor Optique reprend les mêmes réglages que sa page dédiée.</div>
              </div>
            </div>

            <div class="totals-row">
              <div>Total actif : <strong id="sessionTotalActive">45 min</strong></div>
              <div>Total réel estimé : <strong id="sessionTotalReal">~49 min</strong></div>
            </div>
            <div class="button-row">
              <button id="previewSession" class="secondary-btn">Prévisualiser</button>
              <button id="startSession" class="primary-btn">Lancer la séance</button>
            </div>
          </article>
          <article class="card">
            <h3>Aperçu des phases</h3>
            <div id="sessionPreview" class="phase-list"></div>
          </article>
        </div>
      </section>

      <!-- MIXAGE / OSCILLATION GUIDÉE -->
      <section id="mixage" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Oscillation guidée</h3>
            <p class="muted">L'image observée est intégrée au biofeedback pendant le balancement. Le visage humain ne bouge que par la tête, avec un point de concentration éloigné en grand mouvement puis intérieur en petit mouvement.</p>
            <label class="stacked">
              <span>Objet observé</span>
              <select id="mixageObject"></select>
            </label>
            <label class="stacked">
              <span>Balancement</span>
              <select id="mixageSwing"></select>
            </label>
            <div class="locked-box">
              <div>Ancrage associé : <strong id="mixageMantra">ILLI</strong></div>
              <div>Rythme imposé : <strong id="mixageRhythm">2 s</strong></div>
            </div>
            <label class="stacked">
              <span>Durée active (15 à 45 min)</span>
              <input id="mixageDuration" type="number" min="15" max="45" step="3" value="15" />
            </label>
            <label class="stacked">
              <span>Support musical</span>
              <select id="mixageAudio"></select>
            </label>
            <div class="note-box" id="mixageSummary"></div>
            <div class="button-row">
              <button id="startMixage" class="primary-btn">Démarrer l'oscillation</button>
              <button id="sendMixageToPractice" class="secondary-btn">Préparer le mode pratique</button>
            </div>
          </article>
          <article class="card visual-card">
            <h3>Visage support animé</h3>
            <canvas id="mixagePreviewCanvas" width="560" height="380"></canvas>
            <p class="muted">Le point lumineux au centre sert de support de concentration. L'objet observé reste visible dans l'encart agrandi.</p>
          </article>
        </div>
      </section>

      <!-- RESPIRATION -->
      <section id="respiration" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Respiration guidée</h3>
            <label class="stacked">
              <span>Type</span>
              <select id="breathType">
                <option value="square">Carrée</option>
                <option value="rectangular">Rectangulaire</option>
                <option value="triangular">Triangulaire</option>
              </select>
            </label>
            <label class="stacked">
              <span>Mesure de base (4 à 20 s)</span>
              <input id="breathBase" type="number" min="4" max="20" step="1" value="4" />
            </label>
            <div class="note-box" id="breathSummary"></div>
            <label class="stacked">
              <span>Durée (min)</span>
              <input id="breathDuration" type="number" min="3" max="30" step="1" value="15" />
            </label>
            <label class="stacked">
              <span>Support musical</span>
              <select id="breathAudio"></select>
            </label>
            <div class="button-row">
              <button id="startBreath" class="primary-btn">Lancer</button>
              <button id="sendBreathToPractice" class="secondary-btn">Préparer le mode pratique</button>
            </div>
          </article>
          <article class="card visual-card">
            <h3>Schéma vocal</h3>
            <table class="phase-table">
              <thead>
                <tr><th>Phase</th><th>Voix</th><th>Repère sonore</th></tr>
              </thead>
              <tbody>
                <tr><td>Inspiration</td><td>Inspirez</td><td>grave ample</td></tr>
                <tr><td>Rétention</td><td>Bloquez</td><td>médium soutenu</td></tr>
                <tr><td>Expiration</td><td>Expirez</td><td>aigu clair</td></tr>
                <tr><td>Rétention</td><td>Bloquez</td><td>harmonique distincte</td></tr>
              </tbody>
            </table>
            <canvas id="breathPreviewCanvas" width="560" height="300"></canvas>
          </article>
        </div>
      </section>

      <!-- ROTOR OPTIQUE (ex-Gyrascope) -->
      <section id="rotor" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Rotor Optique</h3>
            <p class="muted">Observation de l'objet, biofeedback lumineux, puis insertion dans le rotor. L'anneau externe reste fixe, le centre tourne avec un effet optique de contre-rotation.</p>
            <label class="stacked">
              <span>Objet central</span>
              <select id="gyroObject"></select>
            </label>
            <label class="stacked">
              <span>Modèle visuel du rotor</span>
              <select id="gyroModel"></select>
            </label>
            <div id="gyroObjectChips" class="object-chip-grid"></div>
            <label class="stacked">
              <span>Ou importer une image</span>
              <input id="gyroImageUpload" type="file" accept="image/*" />
            </label>
            <label class="stacked">
              <span>Sens de rotation</span>
              <select id="gyroDirection">
                <option value="clockwise">Horaire</option>
                <option value="counterclockwise">Antihoraire</option>
              </select>
            </label>
            <label class="stacked">
              <span>Vitesse graduée</span>
              <input id="gyroSpeed" type="range" min="0" max="30" step="1" value="15" />
            </label>
            <div class="grid compact-grid">
              <label class="stacked">
                <span>Couleur centre</span>
                <input id="gyroColorInner" type="color" value="#ffd36b" />
              </label>
              <label class="stacked">
                <span>Couleur anneau externe</span>
                <input id="gyroColorOuter" type="color" value="#6cb9ff" />
              </label>
            </div>
            <label class="stacked">
              <span>Durée (min)</span>
              <input id="gyroDuration" type="number" min="3" max="30" step="1" value="15" />
            </label>
            <label class="stacked">
              <span>Support musical</span>
              <select id="gyroAudio"></select>
            </label>
            <div class="note-box">4 modèles visuels disponibles : 4 pales, 8 pales, 12 pales et spirale.</div>
            <div class="button-row">
              <button id="startGyro" class="primary-btn">Lancer</button>
              <button id="gyroFullscreenBtn" class="secondary-btn">Ouvrir en grand</button>
            </div>
          </article>
          <article class="card visual-card">
            <h3>Prévisualisation</h3>
            <canvas id="gyroPreviewCanvas" width="560" height="420"></canvas>
          </article>
        </div>
      </section>

      <!-- TENSIONS -->
      <section id="tensions" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Tensions statiques</h3>
            <p class="muted">À utiliser en fin de séance ou avant sommeil, avec biofeedback lumineux de 30 secondes avant le démarrage.</p>
            <div class="grid compact-grid">
              <label class="stacked">
                <span>Contractez (s)</span>
                <input id="tensionContract" type="number" min="2" max="20" step="1" value="6" />
              </label>
              <label class="stacked">
                <span>Maintenez (s)</span>
                <input id="tensionHold" type="number" min="2" max="20" step="1" value="6" />
              </label>
              <label class="stacked">
                <span>Relâchez (s)</span>
                <input id="tensionRelease" type="number" min="2" max="30" step="1" value="8" />
              </label>
              <label class="stacked">
                <span>Durée (min)</span>
                <input id="tensionDuration" type="number" min="3" max="30" step="1" value="15" />
              </label>
            </div>
            <label class="stacked">
              <span>Support musical</span>
              <select id="tensionAudio"></select>
            </label>
            <div class="button-row">
              <button id="startTension" class="primary-btn">Lancer</button>
              <button id="sendTensionToPractice" class="secondary-btn">Préparer le mode pratique</button>
            </div>
          </article>
          <article class="card visual-card">
            <h3>Cycle</h3>
            <div class="note-box">Voix : <strong>Contractez</strong> → <strong>Maintenez</strong> → <strong>Relâchez</strong></div>
            <canvas id="tensionPreviewCanvas" width="560" height="300"></canvas>
          </article>
        </div>
      </section>

      <!-- APPRENDRE -->
      <section id="apprendre" class="view">
        <div class="card">
          <div class="section-head">
            <div>
              <h3>Mode apprendre</h3>
              <p class="muted">Chaque chapitre devient un mini-instructeur : lecture, résumé, et bouton direct pour lancer la pratique correspondante.</p>
            </div>
            <div class="button-row wrap-row small-gap learn-toolbar">
              <button id="readAllLessons" class="secondary-btn">Lire tous les enseignements</button>
              <button id="pauseLessons" class="secondary-btn">Pause lecture</button>
              <button id="resumeLessons" class="secondary-btn">Reprendre</button>
              <button id="stopLessons" class="danger-btn">Arrêt lecture</button>
            </div>
          </div>
          <div id="learnGrid" class="grid three-col"></div>
        </div>
      </section>

      <!-- BIBLIOTHÈQUE -->
      <section id="bibliotheque" class="view">
        <div class="grid two-col">
          <article class="card">
            <h3>Bibliothèque audio</h3>
            <div class="button-row wrap-row">
              <button id="libraryRescanServer" class="secondary-btn">Scanner les playlists</button>
              <label class="file-btn" for="libraryInputFiles">Choisir des fichiers audio</label>
              <label class="file-btn" for="libraryInputFolder">Choisir un dossier audio</label>
            </div>
            <input id="libraryInputFiles" type="file" accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.webm" multiple hidden />
            <input id="libraryInputFolder" type="file" accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.webm" webkitdirectory multiple hidden />
            <p class="muted">Les playlists sont synchronisées automatiquement. Les imports manuels restent disponibles en secours.</p>
            <div id="libraryRoots" class="note-box"></div>
            <div class="button-row">
              <button id="clearLibrary" class="danger-btn">Retirer les imports manuels</button>
            </div>
            <div id="librarySummary" class="note-box"></div>
          </article>
          <article class="card">
            <h3>Fichiers</h3>
            <div id="libraryList" class="library-list"></div>
          </article>
        </div>
      </section>

      <!-- PRATIQUE -->
      <section id="pratique" class="view">
        <div class="grid two-col">
          <article class="card visual-card practice-card">
            <h3>Scène pratique</h3>
            <canvas id="practicePreviewCanvas" width="720" height="460"></canvas>
            <div class="button-row">
              <button id="practiceFullscreenBtn" class="primary-btn">Ouvrir en plein écran</button>
              <button id="practiceStopBtn" class="danger-btn">Stop</button>
            </div>
          </article>
          <article class="card">
            <h3>État courant</h3>
            <div class="status-grid">
              <div><span>Module</span><strong id="statusModule">Aucun</strong></div>
              <div><span>Phase</span><strong id="statusPhase">—</strong></div>
              <div><span>Ancrage</span><strong id="statusMantra">—</strong></div>
              <div><span>Mouvement</span><strong id="statusMovement">—</strong></div>
              <div><span>Temps restant</span><strong id="statusTimer">00:00</strong></div>
              <div><span>Support audio</span><strong id="statusAudio">Aucun</strong></div>
            </div>
            <div class="note-box" id="practiceHint">Prépare un module puis lance-le. La scène pratique est utilisée par tous les écrans.</div>
          </article>
        </div>
      </section>
    </main>
  </div>

  <!-- OVERLAY PLEIN ÉCRAN -->
  <div id="stageOverlay" class="stage-overlay hidden" aria-hidden="true">
    <div class="stage-top">
      <div>
        <div class="eyebrow" id="overlayModule">Mode pratique</div>
        <h2 id="overlayPhase">Prêt</h2>
      </div>
      <div class="overlay-timer" id="overlayTimer">00:00</div>
    </div>
    <div class="stage-center">
      <canvas id="stageCanvas" width="1920" height="1080"></canvas>
      <div class="stage-center-text" aria-live="polite">
        <div class="stage-mantra"  id="overlayMantra">—</div>
        <div class="stage-movement" id="overlayMovement">—</div>
        <div class="stage-guidance" id="overlayGuidance">Le logiciel annoncera chaque transition.</div>
      </div>
    </div>
    <div class="stage-bottom">
      <button id="overlayPause"      class="secondary-btn">Pause</button>
      <button id="overlayResume"     class="secondary-btn">Reprendre</button>
      <button id="overlayNext"       class="secondary-btn">Phase suivante</button>
      <button id="overlayFullscreen" class="secondary-btn">Plein écran navigateur</button>
      <button id="overlayClose"      class="danger-btn">Quitter</button>
    </div>
  </div>

  <script type="module" src="js/main.js"></script>
  <script defer src="./learning-data.js"></script>
  <script defer src="./learning-rich.js"></script>
</body>
</html>
'@

Write-Utf8 -Path "$ROOT\index.html" -Content $indexHtml
Write-Host "    OK — index.html réécrit" -ForegroundColor Green
Write-Host ""

# ============================================================
#  2. js/core/state.js
# ============================================================
Write-Host "[2] Réécriture de js/core/state.js..." -ForegroundColor Yellow

$stateJs = @'
// state.js — Axis Lumen Studio V3
// Toutes les constantes de l'application. Aucune référence externe.

export const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac', '.webm'];

export const IMAGE_SOURCES = {
  faceFront:  'assets/images/face_front.png',
  faceBack:   'assets/images/face_back.png',
  flower:     'assets/images/flower.png',
  tree:       'assets/images/tree.png',
  geometry:   'assets/images/geometry.svg',
  gyroModel1: 'assets/images/gyro_model_1.png',
  gyroModel2: 'assets/images/gyro_model_2.png',
  gyroModel3: 'assets/images/gyro_model_3.png',
  gyroModel4: 'assets/images/gyro_model_4.png',
};

export const OBJECTS = {
  flower:   { label: 'Fleur',      icon: '🌸', imageKey: 'flower',   category: 'plante'    },
  tree:     { label: 'Arbre',      icon: '🌳', imageKey: 'tree',     category: 'plante'    },
  geometry: { label: 'Géométrie',  icon: '⬡',  imageKey: 'geometry', category: 'géométrie' },
  lotus:    { label: 'Lotus',      icon: '🪷',                        category: 'plante'    },
  seed:     { label: 'Graine',     icon: '🌱',                        category: 'plante'    },
  spiral:   { label: 'Spirale',    icon: '🌀',                        category: 'géométrie' },
  triangle: { label: 'Triangle',   icon: '🔺',                        category: 'géométrie' },
  star:     { label: 'Étoile',     icon: '⭐',                        category: 'géométrie' },
  cube:     { label: 'Cube',       icon: '🧊',                        category: 'volume'    },
  sphere:   { label: 'Sphère',     icon: '⚪',                        category: 'volume'    },
};

// Modèles visuels du Rotor Optique (ex-Gyrascope — noms internes conservés pour compatibilité)
export const GYRO_MODELS = {
  model1: { label: 'Rotor 4 pales',  src: 'assets/images/gyro_model_1.png', imageKey: 'gyroModel1' },
  model2: { label: 'Rotor 8 pales',  src: 'assets/images/gyro_model_2.png', imageKey: 'gyroModel2' },
  model3: { label: 'Rotor 12 pales', src: 'assets/images/gyro_model_3.png', imageKey: 'gyroModel3' },
  model4: { label: 'Rotor Spirale',  src: 'assets/images/gyro_model_4.png', imageKey: 'gyroModel4' },
};

// Alias public pour les nouveaux modules
export const ROTOR_MODELS = GYRO_MODELS;

// Patterns d'oscillation (ex-SWINGS — alias conservé pour compatibilité)
export const SWING_PATTERNS = {
  lateral: {
    label: 'Latéral',
    mantra: 'ILLI',
    rhythmSeconds: 2, rhythmText: '2 secondes', face: 'front',
    explanation: 'Tête gauche-droite sur 2 secondes. L\'ancrage ILLI est associé à ce mouvement.',
  },
  vertical: {
    label: 'Vertical',
    mantra: 'ALLA',
    rhythmSeconds: 2, rhythmText: '2 secondes', face: 'front',
    explanation: 'Tête haut-bas sur 2 secondes. L\'ancrage ALLA est associé à ce mouvement.',
  },
  antero: {
    label: 'Antéro-postérieur',
    mantra: 'OLLO',
    rhythmSeconds: 2, rhythmText: '2 secondes', face: 'front',
    explanation: 'Sensation avant-arrière sur 2 secondes. L\'ancrage OLLO est associé à ce mouvement.',
  },
  figure8: {
    label: 'En 8',
    mantra: 'ILLI',
    rhythmSeconds: 2, rhythmText: '2 secondes', face: 'front',
    explanation: 'Trajet en huit devant le visage sur 2 secondes.',
  },
  cross: {
    label: 'En croix',
    mantra: 'ALLA',
    rhythmSeconds: 2, rhythmText: '2 secondes', face: 'front',
    explanation: 'Croisement horizontal et vertical, rythme fixé à 2 secondes.',
  },
  rotation: {
    label: 'Rotation',
    mantra: 'RORO',
    rhythmSeconds: 3, rhythmText: '3 secondes', face: 'front',
    explanation: 'Rotation douce, sans chercher le vertige. L\'ancrage RORO est associé.',
  },
  horseshoe: {
    label: 'Fer à cheval',
    mantra: 'ÉLLÉ',
    rhythmSeconds: 3, rhythmText: '3 secondes', face: 'back',
    explanation: 'Arc de l\'oreille droite vers l\'occiput puis l\'oreille gauche.',
  },
};

// Alias de rétrocompatibilité
export const SWINGS = SWING_PATTERNS;

export const BREATH_TYPES = {
  square:      { label: 'Carrée'         },
  rectangular: { label: 'Rectangulaire'  },
  triangular:  { label: 'Triangulaire'   },
};

export const state = {
  settings: {
    voiceEnabled:  true,
    soundEnabled:  true,
    speechRate:    0.95,
    speechVolume:  0.9,
  },
  images:               {},
  library:              [],
  currentPreviewModule: 'mixage',
  currentPreviewConfig: {},
  customGyroImage:      null,
  customGyroImageObj:   null,
  audioCtx:             null,
  backgroundAudio:      null,
  backgroundAudioId:    null,
  schedule:             [],
  phaseIndex:           -1,
  currentPhase:         null,
  phaseStart:           0,
  phaseTimer:           null,
  paused:               false,
  pauseAt:              0,
  rafId:                0,
  speechKey:            '',
  serverRoots:          [],
  libraryScanMessage:   '',
  learningContent:      null,
  speechPaused:         false,
};
'@

Write-Utf8 -Path "$ROOT\js\core\state.js" -Content $stateJs
Write-Host "    OK — state.js réécrit" -ForegroundColor Green
Write-Host ""

# ============================================================
#  3. js/main.js
# ============================================================
Write-Host "[3] Réécriture de js/main.js..." -ForegroundColor Yellow

$mainJs = @'
// main.js — Axis Lumen Studio V3
// Point d'entrée principal. Aucune référence externe.

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
  renderLibraryRoots();
  renderLibrary();
  refreshMixageInfo();
  refreshBreathSummary();
  refreshSessionSummary();
  refreshPreviewState();
  animationLoop();
}

// ─── Paramètres ──────────────────────────────────────────────────────────────
const SETTINGS_KEY = 'axis-lumen-studio-v3-settings';

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) state.settings = { ...state.settings, ...JSON.parse(raw) };
  } catch {}
}

export function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

export function applySettingsToUi() {
  $('#voiceEnabled').checked  = state.settings.voiceEnabled;
  $('#soundEnabled').checked  = state.settings.soundEnabled;
  $('#speechRate').value      = String(state.settings.speechRate);
}

export function bindSettings() {
  $('#voiceEnabled').addEventListener('change', (e) => { state.settings.voiceEnabled = e.target.checked; saveSettings(); });
  $('#soundEnabled').addEventListener('change', (e) => { state.settings.soundEnabled = e.target.checked; saveSettings(); });
  $('#speechRate').addEventListener('input',    (e) => { state.settings.speechRate = Number(e.target.value || 0.95); saveSettings(); });
}

// ─── Boutons ─────────────────────────────────────────────────────────────────
export function bindButtons() {
  // Raccourcis rapides
  $('#quickMixage15').addEventListener('click', async () => {
    $('#mixageDuration').value = '15';
    refreshMixageInfo();
    await startSchedule(buildMixageSchedule(getMixageConfig()));
  });
  $('#quickSession45').addEventListener('click', async () => {
    $('#sessionMixageMin').value = '15';
    $('#sessionBreathMin').value = '15';
    $('#sessionFinalMin').value  = '15';
    refreshSessionSummary();
    await startSchedule(buildSessionSchedule(getSessionConfig()));
  });

  // Oscillation guidée
  $('#startMixage').addEventListener('click', async () => startSchedule(buildMixageSchedule(getMixageConfig())));
  $('#sendMixageToPractice').addEventListener('click', () => {
    state.currentPreviewModule = 'mixage';
    refreshPreviewState();
    showView('pratique');
  });

  // Séance
  $('#previewSession').addEventListener('click', () => { refreshSessionSummary(); showView('session'); });
  $('#startSession').addEventListener('click', async () => startSchedule(buildSessionSchedule(getSessionConfig())));

  // Respiration
  $('#startBreath').addEventListener('click', async () => startSchedule(buildBreathSchedule(getBreathConfig())));
  $('#sendBreathToPractice').addEventListener('click', () => {
    state.currentPreviewModule = 'respiration';
    refreshPreviewState();
    showView('pratique');
  });

  // Rotor Optique
  $('#startGyro').addEventListener('click', async () => startSchedule(buildGyroSchedule(getGyroConfig())));
  $('#gyroFullscreenBtn').addEventListener('click', () => {
    state.currentPreviewModule = 'gyrascope';
    refreshPreviewState();
    showStageOverlay();
  });

  // Tensions
  $('#startTension').addEventListener('click', async () => startSchedule(buildTensionSchedule(getTensionConfig())));
  $('#sendTensionToPractice').addEventListener('click', () => {
    state.currentPreviewModule = 'tensions';
    refreshPreviewState();
    showView('pratique');
  });

  // Scène pratique
  $('#openPracticeStage').addEventListener('click', showStageOverlay);
  $('#practiceFullscreenBtn').addEventListener('click', showStageOverlay);
  $('#practiceStopBtn').addEventListener('click', () => stopSchedule());

  // Overlay
  $('#overlayPause').addEventListener('click', pauseSchedule);
  $('#overlayResume').addEventListener('click', resumeSchedule);
  $('#overlayNext').addEventListener('click', nextPhase);
  $('#overlayFullscreen').addEventListener('click', async () => {
    const target = document.getElementById('stageOverlay') || document.documentElement;
    try { await target.requestFullscreen(); } catch {}
  });
  $('#overlayClose').addEventListener('click', hideStageOverlay);

  // Apprendre
  $('#readAllLessons')?.addEventListener('click', () => speak(buildReadAllLessonsText(), { key: 'read-all-lessons', force: true }));
  $('#pauseLessons')?.addEventListener('click',   pauseSpeech);
  $('#resumeLessons')?.addEventListener('click',  resumeSpeech);
  $('#stopLessons')?.addEventListener('click',    stopSpeech);
}

// ─── Boucle d'animation ───────────────────────────────────────────────────────
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
'@

Write-Utf8 -Path "$ROOT\js\main.js" -Content $mainJs
Write-Host "    OK — main.js réécrit" -ForegroundColor Green
Write-Host ""

# ============================================================
#  4. Vérification résidus dans les 3 fichiers réécrits
# ============================================================
Write-Host "[4] Vérification des résidus dans les fichiers réécrits..." -ForegroundColor Yellow

$cibles = @(
  "$ROOT\index.html",
  "$ROOT\js\core\state.js",
  "$ROOT\js\main.js"
)

$mots = @("PHOSPHENE STUDIO", "mixage phosphénique", "Mixage phosphénique",
          "phosphène", "Lefébure", "Lefebure",
          "phosphene-studio-v3-settings", "phosphene-studio-v2-settings")

$residus = 0
foreach ($f in $cibles) {
  $txt = Get-Content $f -Raw -Encoding UTF8
  foreach ($m in $mots) {
    if ($txt -match [regex]::Escape($m)) {
      Write-Host "    RESIDU '$m' dans $(Split-Path $f -Leaf)" -ForegroundColor Red
      $residus++
    }
  }
}

if ($residus -eq 0) {
  Write-Host "    Aucun residu — fichiers propres" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  Réécriture terminée." -ForegroundColor Cyan
Write-Host "  Sauvegarde : $BACKUP" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Prochaine etape : lancer migrate-axis-lumen.ps1" -ForegroundColor Yellow
Write-Host "pour nettoyer les autres fichiers JS/CSS du projet." -ForegroundColor Yellow
Write-Host ""
