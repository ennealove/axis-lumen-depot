# Installe ce site multipage dans le dossier phosphene-studio en sauvegardant l'ancien.
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$ErrorActionPreference = "Stop"

$SourceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$TargetRoot = "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"
$BackupRoot = "C:\Users\chauv\Documents\JE SUIS\SAUVEGARDES_SITE_COMPLET"
$Stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupPath = Join-Path $BackupRoot ("phosphene-studio_AVANT_INSTALL_MULTIPAGE_PRO_" + $Stamp)
$Preserve = Join-Path $env:TEMP ("axis_lumen_assets_preserve_" + $Stamp)

function Ensure-Dir($p){ if(!(Test-Path -LiteralPath $p)){ New-Item -ItemType Directory -Path $p -Force | Out-Null } }
function Copy-Tree($s,$d){ if(Test-Path -LiteralPath $s){ Ensure-Dir $d; Copy-Item -LiteralPath (Join-Path $s "*") -Destination $d -Recurse -Force } }
function Stop-Port($Port){
  $connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if($connections){
    $ownerProcessIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
    foreach($ownerProcessId in $ownerProcessIds){ Stop-Process -Id $ownerProcessId -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 1
  }
}

Ensure-Dir $BackupRoot
Stop-Port 8000
Stop-Port 8030

if(Test-Path -LiteralPath $TargetRoot){
  Copy-Item -LiteralPath $TargetRoot -Destination $BackupPath -Recurse -Force
  Ensure-Dir $Preserve
  Copy-Tree (Join-Path $TargetRoot "assets\videos") (Join-Path $Preserve "assets\videos")
  Copy-Tree (Join-Path $TargetRoot "assets\vidéo") (Join-Path $Preserve "assets\vidéo")
  Copy-Tree (Join-Path $TargetRoot "assets\audio") (Join-Path $Preserve "assets\audio")
  Copy-Tree (Join-Path $TargetRoot "assets\virtues") (Join-Path $Preserve "assets\virtues")
  Get-ChildItem -LiteralPath $TargetRoot -Force | Remove-Item -Recurse -Force
}else{
  Ensure-Dir $TargetRoot
}

Copy-Item -LiteralPath (Join-Path $SourceRoot "*") -Destination $TargetRoot -Recurse -Force

# Restaure assets locaux
Copy-Tree (Join-Path $Preserve "assets\videos") (Join-Path $TargetRoot "assets\videos")
Copy-Tree (Join-Path $Preserve "assets\vidéo") (Join-Path $TargetRoot "assets\vidéo")
Copy-Tree (Join-Path $Preserve "assets\audio") (Join-Path $TargetRoot "assets\audio")
Copy-Tree (Join-Path $Preserve "assets\virtues") (Join-Path $TargetRoot "assets\virtues")

Write-Host "Installation terminée."
Write-Host "Sauvegarde : $BackupPath"
Write-Host "Dossier : $TargetRoot"
Write-Host "Lance : powershell -ExecutionPolicy Bypass -File `"$TargetRoot\start-multipage-pro.ps1`""
