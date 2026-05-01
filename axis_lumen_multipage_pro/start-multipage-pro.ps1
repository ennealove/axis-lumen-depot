[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 8030
$connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($connections) {
  $ownerProcessIds = $connections | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($ownerProcessId in $ownerProcessIds) {
    Stop-Process -Id $ownerProcessId -Force -ErrorAction SilentlyContinue
  }
  Start-Sleep -Seconds 1
}
python -m http.server $Port --bind 127.0.0.1 --directory "$Root"
