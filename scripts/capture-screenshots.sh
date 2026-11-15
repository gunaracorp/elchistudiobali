#!/usr/bin/env bash
# Capture ulang screenshot showcase (desktop 1440x900 + mobile 390x844)
# dari dev server lokal. Output: /home/z/my-project/download/screenshots/
set -e
B="agent-browser"
OUT="/home/z/my-project/download/screenshots"
mkdir -p "$OUT"

shot() { # name path
  $B open "http://localhost:3000$2"
  $B wait --load networkidle
  $B wait 1800
  $B screenshot "$OUT/$1.png"
  echo "✓ $1"
}

# ---------- Desktop 1440x900 ----------
$B set viewport 1440 900
shot 01-hero-id      "/"
shot 02-about        "/about"
shot 03-classes      "/classes"
shot 04-experiences  "/experiences"
shot 05-instructor   "/elin"
shot 06-gallery      "/gallery"
shot 07-booking      "/booking"
shot 08-faq          "/faq"

# Footer shots (scroll di home)
$B open "http://localhost:3000/"
$B wait --load networkidle
$B wait 1500
$B eval "window.scrollTo(0, document.body.scrollHeight - 1700)"
$B wait 1800
$B screenshot "$OUT/09-footer.png"; echo "✓ 09-footer"
$B eval "window.scrollTo(0, document.body.scrollHeight)"
$B wait 1800
$B screenshot "$OUT/09b-credits.png"; echo "✓ 09b-credits"

# ---------- Mobile 390x844 ----------
$B set viewport 390 844
shot 10-mobile-hero    "/"
shot 11-mobile-classes "/classes"
$B open "http://localhost:3000/"
$B wait --load networkidle
$B eval "window.scrollTo(0, document.body.scrollHeight)"
$B wait 1800
$B screenshot "$OUT/12-mobile-footer.png"; echo "✓ 12-mobile-footer"

$B close
echo "SELESAI — $(ls "$OUT" | wc -l) file di $OUT"
