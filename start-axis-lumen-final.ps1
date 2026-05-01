[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()
python -m http.server 8040 --bind 127.0.0.1 --directory "C:\Users\chauv\Documents\JE SUIS\je-suis-site\phosphene-studio"