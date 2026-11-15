#!/usr/bin/env bash
# Uji tombol Publish + Download Excel di /admin (Pengaturan)
set -e
B="agent-browser"
$B open "http://localhost:3000/admin"
$B wait --load networkidle
$B wait 1000
# Login
$B find label "Email" fill "ptelchistudiobali@gmail.com"
$B find label "Password" fill "Elchi-QA-2026x"
$B find role button click --name "Masuk"
$B wait --load networkidle
$B wait 1200
echo "=== URL setelah login: $($B get url)"
# Buka tab Pengaturan
$B find text "Pengaturan" click
$B wait 1200
echo "=== Tombol di area simpan ==="
$B find role button click --name "Download Excel"
$B wait 1500
echo "=== Status setelah klik ==="
$B snapshot -s "section" -c | grep -i -m3 "Excel\|Publish\|diunduh" || true
echo "=== cek file terunduh ==="
ls -la ~/Downloads 2>/dev/null | tail -3 || echo "(direktori unduhan default tidak ada di sandbox)"
