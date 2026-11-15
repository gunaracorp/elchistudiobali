#!/usr/bin/env bash
# Recapture 09-footer (kartu kontak) & 09b-credits dengan scroll ke elemen footer
set -e
B="agent-browser"
OUT="/home/z/my-project/download/screenshots"
$B set viewport 1440 900
$B open "http://localhost:3000/"
$B wait --load networkidle
$B wait 1500
$B eval "document.querySelector('footer')?.scrollIntoView({block:'start'})"
$B wait 2000
$B screenshot "$OUT/09-footer.png"; echo "✓ 09-footer"
$B eval "window.scrollTo(0, document.body.scrollHeight)"
$B wait 2000
$B screenshot "$OUT/09b-credits.png"; echo "✓ 09b-credits"
$B close
