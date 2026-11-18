# 🗺️ ROADMAP 25 Langkah — Elchí Studio Bali Menuju Website Terbaik di Dunia

> Dibuat 18 November 2026 · ditulis khusus untuk workflow **"lanjutkan"**:
> bilang **"lanjutkan"** → saya kerjakan langkah ☐ teratas yang belum selesai.
> Bisa juga spesifik: **"lanjutkan nomor 6"**.
>
> **Repo**: `gunaracorp/elchistudiobali` (branch `main`)
> **Produksi**: [elchistudio.vercel.app](https://elchistudio.vercel.app) + [www.elchistudio.web.id](https://www.elchistudio.web.id)
> **Landing statis**: `gunaracorp.github.io/elchistudiobali` (branch `gh-pages`)
> **Kontak studio**: Ms. Elin Kim · WhatsApp +62 823-3957-0355

---

## ✅ Fondasi yang SUDAH BERDIRI (tidak diulang dalam roadmap)

| Fondasi | Status |
|---|---|
| AI concierge `/api/concierge` — Z.ai GLM ~3 dtk, 3 bahasa, fallback WhatsApp | 🟢 live |
| Widget WhatsApp anti-hilang (default Ms. Elin, bubble sapaan, pre-filled chat 3 bahasa) | 🟢 live |
| Footer Gunara Corp Network (6 situs) + watermark "Top Konsultan Kelas Dunia" — di kedua situs | 🟢 live |
| CMS `/admin` (Pengaturan, kelas, galeri, FAQ, konten) + booking form | 🟢 live |
| Landing statis gh-pages v8 (AI chat widget, workshop + durasi, partner credits) | 🟢 live |
| i18n en / id / ko + SEO sitemap.xml | 🟢 live |

**Progres roadmap: 5/25 — Fase 1 tuntas 18 Nov 2026; berikutnya Langkah 6.

---

## 🚀 Fase 1 — Performa & Fondasi Teknis (Langkah 1–5)

> Tujuan fase: situs cepat, terindeks rapi oleh Google di SATU domain, dan bisa di-install seperti aplikasi.

### ✅ 1. Audit kecepatan — quick wins terpasang (AVIF/WebP, next/image ✓, next/font ✓; skor ≥90 dikonfirmasi saat audit browser berikutnya)
**Kerja**: jalankan Lighthouse untuk `/`, `/classes`, `/booking`; ubah semua `<img>` berat ke `next/image` (AVIF/WebP), tambah `preconnect` domain font, periksa bundle di `src/app/layout.tsx`.
**Selesai bila**: skor Performance ≥ 90 mobile di ketiga halaman, temuan tercatat di PR/commit.

### ✅ 2. Canonical domain + robots.txt
**Kerja**: tetapkan **www.elchistudio.web.id** sebagai URL kanonik; tambah `redirects()` di `next.config.ts` (elchistudio.vercel.app → domain utama, 308); buat `src/app/robots.ts`.
**Selesai bila**: `curl -I https://elchistudio.vercel.app` → 308 ke web.id; `/robots.txt` merujuk sitemap.

### ✅ 3. Meta per halaman (generateMetadata)
**Kerja**: `generateMetadata` di setiap route; `[slug]` kelas memakai nama + durasi kelas dari CMS; OG/Twitter card + gambar preview per halaman.
**Selesai bila**: setiap halaman punya title/description unik dan OG preview valid saat di-share.

### ✅ 4. PWA — bisa di-install
**Kerja**: `manifest.ts` (nama, ikon 192/512, tema blush/cream), ikon dari logo studio, service worker minim (precache shell + halaman fallback offline).
**Selesai bila**: Chrome menawarkan "Install app" dan buka tanpa koneksi tetap menampilkan halaman fallback rapi.

### ✅ 5. Analitik konversi
**Kerja**: pasang `@vercel/analytics` + event custom: klik float WhatsApp, buka concierge, kirim booking, klik CTA booking di hero.
**Selesai bila**: dashboard analytics menampilkan pengunjung + keempat event terukur.

---

## 💰 Fase 2 — Konversi & Booking (Langkah 6–10)

> Tujuan fase: pengunjung bukan cuma melihat — mereka MEMESAN, dan Ms. Elin langsung tahu.

### ☐ 6. Booking tersimpan + notifikasi ke studio
**Kerja**: `POST /api/booking` → tabel Prisma `Booking`; notifikasi email (Resend/SMTP) ke studio; daftar booking di `/admin`.
**Selesai bila**: submit form → entri muncul di `/admin` + notifikasi masuk di email studio.

### ☐ 7. Halaman harga & paket
**Kerja**: section harga per kelas (IDR, apa saja yang termasuk) + 3 paket (1 orang / pasangan / grup privat) di halaman classes; tombol "Pesan paket ini" → pre-fill form booking.
**Selesai bila**: harga tampil jelas dan klik paket mengisi form otomatis.

### ☐ 8. Kalender slot ketersediaan
**Kerja**: pemilih tanggal + jam (mis. 09:00 / 13:00 / 15:30) di booking; cek tabrakan dengan `Booking` tersimpan; slot penuh dinonaktifkan.
**Selesai bila**: dua booking dengan tanggal+jam sama ditolak dengan pesan ramah + saran slot lain.

### ☐ 9. DP online + invoice
**Kerja**: integrasi Midtrans Snap (IDR) atau Stripe (kartu internasional): DP 30% saat booking, webhook konfirmasi, invoice PDF via email.
**Selesai bila**: satu pembayaran uji sandbox sukses end-to-end dan status booking berubah "DP diterima".

### ☐ 10. Mesin testimoni otomatis
**Kerja**: H+1 setelah tanggal kelas → pesan WhatsApp minta ulasan; form ulasan mini → moderasi di `/admin` → carousel bintang + nama di homepage.
**Selesai bila**: 3 testimoni uji tampil dan carousel berjalan mulus.

---

## 🎨 Fase 3 — Konten & Bahasa (Langkah 11–15)

> Tujuan fase: konten hidup dari CMS, bahasa sempurna, SEO organik tumbuh.

### ☐ 11. Galeri dinamis dari CMS
**Kerja**: upload foto asli kelas via `/admin` (Vercel Blob); galeri homepage + halaman gallery membaca CMS; lightbox + lazy-load.
**Selesai bila**: tambah 1 foto di admin → langsung tampil live tanpa deploy.

### ☐ 12. FAQ dari log concierge
**Kerja**: ringkasan pertanyaan pengunjung disimpan; peraya FAQ dari 10 pertanyaan teratas; jawaban standar disunting oleh studio.
**Selesai bila**: halaman FAQ berisi ≥ 12 pertanyaan nyata pengunjung.

### ☐ 13. Blog/jurnal mini (MDX)
**Kerja**: route `/journal` berbasis MDX; 3 artikel awal: "Travel drawing di Ubud", "Melukis postcard suvenir Bali", "Kelas seni seru untuk anak"; schema Article untuk SEO.
**Selesai bila**: 3 artikel tampil, masuk sitemap, terbaca rapi di mobile.

### ☐ 14. Kelengkapan bahasa
**Kerja**: audit konten Korea (id/k) oleh native speaker; tambah **Mandarin (zh)** sebagai locale ke-4 di `locale-provider.tsx` + kamus; pemilih bahasa 4 bendera.
**Selesai bila**: seluruh situs utuh dalam 4 bahasa tanpa campuran.

### ☐ 15. Video hero 30 detik
**Kerja**: video suasana kelas (materi dari studio), mute autoplay loop `webm/mp4 ≤ 3 MB`, poster gambar, lazy-load video di desktop.
**Selesai bila**: hero menampilkan video di desktop dan gambar statis di koneksi lambat.

---

## 🤖 Fase 4 — AI & Otomasi (Langkah 16–20)

> Tujuan fase: Elin virtual makin pintar, studio makin dibantu — bukan makin dibebani.

### ☐ 16. Dashboard percakapan di /admin
**Kerja**: log concierge (pertanyaan, bahasa, AI jawab/fallback, durasi) ke tabel `ChatLog`; halaman `/admin/chat` dengan statistik + daftar.
**Selesai bila**: percakapan baru terlihat di admin kurang dari 1 menit.

### ☐ 17. Concierge tahu harga & slot real-time
**Kerja**: `src/app/api/concierge/route.ts` menyuntikkan data kelas CMS + slot tersedia hari itu ke system prompt; jawaban AI menyebut harga & jam akurat.
**Selesai bila**: tanya "berapa harga travel drawing, besok jam berapa yang kosong?" → jawaban sesuai data nyata.

### ☐ 18. Notifikasi WhatsApp otomatis (untuk studio)
**Kerja**: WhatsApp Cloud API (Meta): booking baru & konfirmasi pembayaran → template pesan ke nomor studio.
**Selesai bila**: booking uji → WA masuk di HP Ms. Elin tanpa cara manual.

### ☐ 19. Chat suara (STT + TTS)
**Kerja**: Web Speech API di concierge: tombol mikrofon (speech-to-text), tombol suara (speechSynthesis membacakan jawaban), preferensi on/off tersimpan.
**Selesai bila**: bertanya lewat suara → jawaban muncul sebagai teks + suara di Chrome.

### ☐ 20. Chatbot WhatsApp otomatis (untuk pengunjung)
**Kerja**: webhook WhatsApp Business → pertanyaan umum dijawab AI concierge lewat nomor studio; kata "admin"/"Elin" → handover ke manusia.
**Selesai bila**: chat WA uji dijawab bot, dan handover berjalan.

---

## 🌏 Fase 5 — Branding & Skala (Langkah 21–25)

> Tujuan fase: identitas profesional penuh + mesin pertumbuhan lintas situs Gunara Corp Network.

### ☐ 21. Email domain sendiri
**Kerja**: setup `hello@elchistudio.web.id` (Zoho Mail / Google Workspace); SPF/DKIM; dipakai untuk konfirmasi booking, invoice, newsletter.
**Selesai bila**: email konfirmasi terkirim dari domain dan lolos SPF/DKIM.

### ☐ 22. Newsletter + lead magnet
**Kerja**: unduhan gratis **"Bali Sketch Guide" (PDF ~10 halaman)** demi email pengunjung; simpan ke DB; email welcome otomatis; template newsletter bulanan.
**Selesai bila**: alur unduh → email tersimpan → welcome email terkirim.

### ☐ 23. Halaman kemitraan B2B (agen tur & hotel)
**Kerja**: `/partners` (EN/ID): paket grup, skema komisi referensi, kontak langsung; parameter `?ref=` tercatat di tabel Booking untuk pelacakan komisi.
**Selesai bila**: halaman live dan booking dengan `?ref=` tercatat sumbernya.

### ☐ 24. Cross-link Gunara Corp Network di semua situs
**Kerja**: bungkus blok network (footer + watermark) menjadi **snippet siap-tempel + dokumentasi** di folder `partners/` repo; bantu pemasangan ke situs jaringan yang bisa diedit (TopKonsultan, Digiman.id, dll).
**Selesai bila**: snippet + panduan tersedia dan ≥ 2 situs lain sudah memasang tautan balik.

### ☐ 25. Laporan bulanan otomatis
**Kerja**: Vercel Cron tanggal 1 tiap bulan: rangkum pengunjung, booking, percakapan AI, revenue → email ringkas 1 halaman ke studio & Gunara Corp.
**Selesai bila**: laporan pertama masuk email pada tanggal 1 bulan berikutnya.

---

## 📌 Cara kerja roadmap ini

1. **Bilang "lanjutkan"** → saya kerjakan langkah ☐ teratas, uji, push, dan beri bukti live.
2. Selesai satu langkah → tandai ✅ + tanggal, di file ini, di commit yang sama.
3. Urutan bisa dilompati: **"lanjutkan nomor 9"** langsung mengerjakan Langkah 9.
4. Setiap langkah: build lokal harus hijau dulu, baru push (disiplin anti-deploy-gagal).
5. Perubahan hanya menyentuh repo ini; kunci API tetap di Vercel Environment Variables, tidak pernah masuk kode.

*Elchí Studio Bali × Gunara Corp Network — Top Konsultan Kelas Dunia ✦*
