#!/usr/bin/env bash
# Rebuild paket ZIP deliverable (PDF + HANDOVER + README + screenshots terpilih)
set -e
DL="/home/z/my-project/download"
SS="$DL/screenshots"
BUILD="/tmp/zipbuild"
rm -rf "$BUILD" && mkdir -p "$BUILD/screenshots"

cp "$DL/Elchi-Website-Showcase.pdf" "$BUILD/"
cp "$DL/HANDOVER-TRILINGUAL.md" "$BUILD/"
cp "$DL/README.md" "$BUILD/"

# Screenshot set (site-footer-cms diperbarui = kartu kontak terbaru: alamat baru + 3 email)
for f in admin-dashboard-bookings booking-indonesian mobile-menu-indonesian \
         hero-english hero-korean admin-gallery gallery-lightbox hero-indonesian \
         admin-login 09-footer; do
  cp "$SS/$f.png" "$BUILD/screenshots/"
done
mv "$BUILD/screenshots/09-footer.png" "$BUILD/screenshots/site-footer-cms.png"

cd "$BUILD"
rm -f "$DL/Elchi-Website-Paket.zip"
zip -r "$DL/Elchi-Website-Paket.zip" Elchi-Website-Showcase.pdf HANDOVER-TRILINGUAL.md README.md screenshots/ > /dev/null
echo "=== ISI ZIP BARU ==="
unzip -l "$DL/Elchi-Website-Paket.zip" | awk '{print $4}' | grep -v "^$" | tail -n +4
echo "=== UKURAN ==="
ls -la "$DL/Elchi-Website-Paket.zip"
