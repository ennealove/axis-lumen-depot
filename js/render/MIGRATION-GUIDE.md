# AXIS LUMEN — Guide de migration : suppression des références phosphénistes ## Contexte Ce document liste **toutes les substitutions à effectuer** dans le projet
`rémanence lumineuse-studio` pour qu'aucune référence au pratique de rémanence lumineuse ou au Dr Lefébure
n'apparaisse dans le code, les fichiers, les interfaces ou les métadonnées. --- ## 1. Renommage de dossier / URL racine | Avant | Après |
|---|---|
| `rémanence lumineuse-studio/` | `axis-lumen-studio/` |
| `/rémanence lumineuse-studio/` (URL) | `/axis-lumen-studio/` (URL) | --- ## 2. Clé de stockage localStorage | Avant | Après |
|---|---|
| `rémanence lumineuse-studio-v3-settings` | `axis-lumen-studio-v3-settings` | Fichier concerné : `main.js` → constante `SETTINGS_KEY`. --- ## 3. Renommage de fichiers | Avant | Après |
|---|---|
| `gyrascope-renderer.js` | `rotor-renderer.js` |
| `modules/gyrascope.js` | `modules/rotor.js` | --- ## 4. Renommage d'exports et d'imports ### gyrascope-renderer → rotor-renderer | Avant | Après |
|---|---|
| `drawGyroPreview` | `drawRotorPreview` |
| `drawGyrascope` | `drawRotorDisc` |
| `drawGyroModelVisual` | `drawRotorModelVisual` |
| `drawGyroModelLegend` | `drawRotorModelLegend` | ### Imports dans main.js ```js
// Avant
import { drawGyroPreview } from './render/gyrascope-renderer.js'; // Après
import { drawRotorPreview } from './render/rotor-renderer.js';
``` --- ## 5. Renommage dans core/state.js | Avant | Après |
|---|---|
| `GYRO_MODELS` | `ROTOR_MODELS` |
| `getGyroConfig()` | `getRotorConfig()` |
| `buildGyroSchedule()` | `buildRotorSchedule()` |
| `populateGyroModelSelects()` | `populateRotorModelSelects()` |
| `bindGyroInputs()` | `bindRotorInputs()` | --- ## 6. Vocabulaire dans l'interface utilisateur (HTML / labels) | Avant | Après |
|---|---|
| `Gyrascope` | `Rotor Optique` |
| `gyrascope` | `rotor` |
| `gyro` (préfixe IDs HTML) | `rotor` |
| `#gyroPreviewCanvas` | `#rotorPreviewCanvas` |
| `#gyroFullscreenBtn` | `#rotorFullscreenBtn` |
| `#startGyro` | `#startRotor` |
| `Mantra` (si référence phosphéniste) | `Ancrage` |
| `GRAND` (label mouvement) | `AMPLE` |
| `PETIT` (label mouvement) | `RÉDUIT` | --- ## 7. Labels de carte (drawCardLabel) | Avant | Après |
|---|---|
| `Gyrascope · …` | `Rotor Optique · …` |
| `Mantra ${swing.mantra}` | `Ancrage ${pattern.mantra}` | --- ## 8. Mixage-renderer : aliases exportés Les anciens noms sont conservés en **alias** pour ne pas casser d'éventuels
appels externes, mais les fonctions principales sont renommées : | Ancien export | Nouvel export principal |
|---|---|
| `drawSwingPath` | `drawTrajectoryPath` |
| `swingPose` | `computePose` |
| `drawMixageScene` | `drawOscillationScene` | --- ## 9. Variables dans state.js (SWINGS → SWING_PATTERNS) | Avant | Après |
|---|---|
| `SWINGS` | `SWING_PATTERNS` | Mettre à jour tous les imports qui référencent `SWINGS`. --- ## 10. Noms de modules dans la navigation / menus | Avant | Après |
|---|---|
| Menu "Gyrascope" | Menu "Rotor Optique" |
| Onglet `gyrascope` | Onglet `rotor` |
| `showView('gyrascope')` | `showView('rotor')` | --- ## 11. Métadonnées & SEO (index.html, manifest, package.json) Chercher et remplacer dans tous les fichiers : ```
rémanence lumineuse → axis-lumen
rémanence lumineuse → Axis Lumen
pratique de rémanence lumineuse → [supprimer]
Lefébure → [supprimer]
Dr Lefebure → [supprimer]
rémanence lumineuse-studio → axis-lumen-studio
``` --- ## 12. Intégration audio rajeunissement Le nouveau fichier `modules/rejuvenation-audio.js` expose : ```js
import { initPlaylist, REJUVENATION_PLAYLISTS } from './modules/rejuvenation-audio.js'; // Démarrer la playlist intégrale dans le conteneur #al-playlist-container
const player = initPlaylist('playlist-integrale', 'al-playlist-container');
``` **Action requise :** vérifier et corriger les noms de fichiers dans
`REJUVENATION_TRACKS` (tableau `file:`) pour qu'ils correspondent exactement
aux fichiers présents dans :
```
C:\Users\chauv\Documents\AXIS LUMEN\ Axis Lumen site internet 13 bis\app\modules\rajeunissement\sound\
``` --- ## 13. CSS / classes | Avant | Après |
|---|---|
| `.rémanence lumineuse-*` | `.al-*` (préfixe Axis Lumen) |
| `#rémanence lumineuse-*` | `#al-*` | --- ## Checklist de validation finale - [ ] Aucun fichier ne contient `rémanence lumineuse`, `rémanence lumineuse`, `Lefébure`, `Lefebure`
- [ ] La clé localStorage est `axis-lumen-studio-v3-settings`
- [ ] Le module Gyrascope est renommé "Rotor Optique" partout (code + UI)
- [ ] `SWINGS` → `SWING_PATTERNS` dans state.js et tous les imports
- [ ] `GYRO_MODELS` → `ROTOR_MODELS` dans state.js et tous les imports
- [ ] Les fichiers audio du dossier `sound/` sont listés dans `REJUVENATION_TRACKS`
- [ ] `initPlaylist()` est appelé dans le module rajeunissement
- [ ] Le dossier racine est renommé `axis-lumen-studio`
- [ ] Les métadonnées HTML (title, meta description, og:title) sont mises à jour
- [ ] package.json / manifest ne contient plus de référence au pratique de rémanence lumineuse --- *Document généré par Axis Lumen Studio — Déploiement commercial*
