@echo off
setlocal
cd /d "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"
set PORT=8000

echo ======================================
echo AXIS LUMEN - Serveur local

echo Dossier: %CD%
echo URL: http://localhost:%PORT%
echo ======================================

timeout /t 1 >nul
start "" "http://localhost:%PORT%"

where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server %PORT%
  goto :eof
)

where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT%
  goto :eof
)

echo.
echo Python est introuvable. Installez Python puis relancez ce raccourci.
pause
