$ErrorActionPreference = "Stop"
$Root = "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"
Set-Location -LiteralPath $Root

Write-Host ""
Write-Host "AXIS LUMEN STUDIO - serveur local" -ForegroundColor Cyan
Write-Host "Dossier : $Root" -ForegroundColor Yellow
Write-Host "Adresse : http://127.0.0.1:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Pour arreter le serveur : CTRL + C" -ForegroundColor DarkGray
Write-Host ""

python -m http.server 8000 --bind 127.0.0.1
