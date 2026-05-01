$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Port = 8020
$connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($connections) { $ids = $connections | Select-Object -ExpandProperty OwningProcess -Unique; foreach ($id in $ids) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue }; Start-Sleep -Seconds 1 }
Start-Process "http://127.0.0.1:$Port"
python -m http.server $Port --bind 127.0.0.1 --directory "$Root"
