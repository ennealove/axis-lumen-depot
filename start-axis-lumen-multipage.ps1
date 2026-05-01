[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
$Root = "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"
python -m http.server 8030 --bind 127.0.0.1 --directory "$Root"
