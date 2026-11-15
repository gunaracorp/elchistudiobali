# Elchí Studio Bali — Dokumentasi Trilingual + Dasbor Admin (ID · EN · 한국어) / Trilingual Documentation + Admin CMS

> **ID / English** — Diperbarui 15 November 2026 (rev. 2: dasbor admin CMS, WhatsApp, animasi baru) · Updated 15 November 2026

---

## Bahasa Indonesia

### 🆕 Dasbor Admin ala WordPress (`/admin`)

Kini studio bisa mengelola situsnya sendiri, seperti WordPress:

1. Buka **`/admin`** (atau klik "Studio Admin" di footer situs).
2. Masuk dengan:
   - **Email:** `ptelchistudiobali@gmail.com` (email resmi perusahaan dari NIB)
   - **Password:** dibuat acak saat seed — lihat laporan penyerahan; **segera ganti** di dasbor → Pengaturan → Ganti Password Admin.
3. Tiga tab dasbor (Bahasa Indonesia):
   - **Booking Masuk** — semua reservasi dari situs, waktu WITA, tombol "Hubungi via WhatsApp" per pemesan.
   - **Galeri** — tambah foto (unggah dari perangkat ≤ 6 MB, atau URL gambar), edit keterangan, urutkan naik/turun, hapus. Foto di sini **langsung tampil di galeri situs**; jika daftar dikosongkan, situs memakai 8 foto bawaan.
   - **Pengaturan** — Alamat Studio, Nomor WhatsApp, Email (bisa beberapa, pisahkan dengan koma), Jam Operasional, URL Instagram + Ganti Password. Tombol **Publish** menyimpan perubahan langsung ke situs; tombol **Download Excel** di sebelahnya mengekspor semua booking ke CSV siap-Excel.

**Keamanan (MVP, tanpa dependensi baru):** password disimpan sebagai hash scrypt ber-salt; sesi = cookie `httpOnly` bertanda tangan HMAC (masa berlaku 7 hari); semua API admin menolak request tanpa sesi. Sebelum dipakai produksi skala besar, tinggal naik kelas ke NextAuth + peran (catatan MVP ada di kode).

**Data yang diisi dari dokumen resmi Anda (seed):**
- Alamat studio confirmed (dari Anda): *Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia* — tampil di kartu Studio footer (bisa diubah kapan saja di Pengaturan).
- WhatsApp (dari Anda): **+62 823-3957-0355** → tombol chat hijau melayang + kartu WhatsApp footer + link per booking di dasbor.
- Tiga email studio — semuanya aktif (dari Anda): `ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com` — tampil berjajar di kartu Email footer (dipisahkan koma di Pengaturan).
- 8 foto galeri bawaan dari brosur resmi.

Dokumen privat (KTP, NPWP, akta, susunan direksi) **tidak pernah** dipublikasikan di situs — hanya data perusahaan publik (nama, alamat kantor, email, telepon) yang dipakai.

### 🆕 WhatsApp & kontak langsung

- Tombol **WhatsApp hijau melayang** (dengan animasi denyut cincin) di kanan bawah, di atas tombol concierge — membuka `wa.me` ke nomor studio.
- Kartu WhatsApp di footer dengan tombol "Chat WhatsApp".
- Nomor & email semuanya diatur dari dasbor (Pengaturan).

### 🆕 Animasi baru

1. **Scroll progress bar** — pita gradien rose→sun di atas layar, mengikuti posisi gulir.
2. **Tilt 3D kartu kelas** — kartu sedikit berputar mengikuti kursor (dinonaktifkan otomatis untuk sentuh & `prefers-reduced-motion`).
3. **Lightbox galeri** — klik foto mana pun: zoom sinematik dengan spring, backdrop blur, navigasi panah ←/→ + tombol Escape, keterangan tulisan tangan.
4. **Pulse WhatsApp** — cincin denyut lembut pada tombol chat.

### 🆕 Pengayaan konten dari dokumen

Data klien (14 organisasi, termasuk City of Parramatta, fetch tv, lyka, University of Sydney Union, Ku-ring-gai Council, Inner West, Sylvania Waters) dan riwayat pendidikan lengkap Elin (AAA Paris 2006, IFALPES Chambéry 2005) — semuanya sudah terverifikasi dari brosur resmi dan tampil di profil instruktur.

---

## Bahasa Indonesia (bagian sebelumnya)

### Ringkasan

Situs Elchí Studio Bali kini sepenuhnya **trilingual** (English · Bahasa Indonesia · 한국어) dengan **English sebagai bahasa default** — pengunjung baru selalu masuk ke English, dan Google mengindeks HTML English. Seluruh antarmuka — navigasi, hero, 6 kelas, pengalaman privat, profil instruktur, galeri, formulir booking, FAQ, footer, dan AI Concierge — tersedia dalam ketiga bahasa. Sejak pembaruan terakhir, setiap section juga punya **halaman dedikasinya sendiri** (full-SEO, lihat bagian "SEO & Halaman Terpisah") dan `?lang=` menjadikan tiap bahasa URL yang sebenarnya.

### Cara kerja sistem bahasa

| Komponen | File | Peran |
| --- | --- | --- |
| Provider | `src/components/elchi/locale-provider.tsx` | State bahasa global, persistensi, animasi transisi |
| Kamus ID | `src/lib/i18n/id.ts` | Seluruh teks Bahasa Indonesia |
| Kamus EN | `src/lib/i18n/en.ts` | Seluruh teks Bahasa Inggris (kanonik) |
| Kamus KO | `src/lib/i18n/ko.ts` | Seluruh teks Bahasa Korea |
| Tipe | `src/lib/i18n/types.ts` | Kontrak struktur kamus (aman TypeScript) |
| Helper | `src/lib/i18n/index.ts` | Penggabungan konten terstruktur + terjemahan |
| Menu Bahasa | `src/components/elchi/language-switcher.tsx` | Tombol globe + dropdown elegan `ID · EN · 한국어` (2 lokasi: navbar desktop, menu overlay mobile; tidak ada lagi di footer) |
| Kredit Partner | `src/components/elchi/footer.tsx` | Bar kredit di footer: Design by Digiman.id (PT Digital Bisnis Manajemen) · Hosting by JuraganWebsite (juraganwebsite.web.id) · Support system & legal by PT Top Konsultan Internasional (pusatperizinan.com) |

**Perilaku penting:**

1. **English default** — kunjungan pertama selalu English (tidak ada lagi deteksi bahasa browser). Server HTML pun English — itulah yang dibaca Google.
2. **Prioritas bahasa**: URL `?lang=` > `localStorage` (kunci `elchi-locale`) > default English. Mengganti bahasa lewat globe otomatis menempelkan `?lang=` ke URL, jadi setiap bahasa bisa di-share dan di-crawl.
3. **`<html lang>` selalu sinkron** — penting untuk pembaca layar, penerjemah otomatis, dan SEO.
4. **Transisi sinematik** — pergantian bahasa memainkan tirai gradien watercolour ±0,4 detik dengan wordmark "Elchí"; otomatis dilewati untuk pengguna `prefers-reduced-motion`.
5. **Animasi hero diputar ulang** — headline dianimasikan ulang (stagger word-by-word) setiap ganti bahasa; kode HTML `key={locale}` menangani ini.
6. **Aman hidrasi** — server merender locale yang di-pin URL (atau English); swap localStorage terjadi setelah mount (pola `requestAnimationFrame`, tanpa hydration mismatch).

## SEO & Halaman Terpisah (pembaruan terbaru)

Homepage tetap menjadi pengalaman one-page; di atasnya kini berdiri **15 URL yang bisa diindeks Google** (masing-masing tersedia dalam 3 bahasa via `?lang=`):

| Route | Isi | Schema JSON-LD |
| --- | --- | --- |
| `/` | Landing one-page lengkap | Organization graph (global) |
| `/about` | Tentang studio | BreadcrumbList |
| `/classes` | 6 kelas unggulan | BreadcrumbList + ItemList/Course |
| `/classes/[slug]` ×6 | Travel Drawing, Postcards, Dog Keychain, Custom Flip-Flop, Custom T-shirt, Creative Flow | Course + BreadcrumbList |
| `/experiences` | Pengalaman privat grup & 1:1 | BreadcrumbList |
| `/elin` | Profil Elin Kim | BreadcrumbList |
| `/gallery` | Galeri + lightbox | BreadcrumbList |
| `/booking` | Formulir reservasi | BreadcrumbList |
| `/faq` | FAQ | **FAQPage** (rich results) + BreadcrumbList |
| `/contact` | Kontak & alamat NIB | BreadcrumbList |

- **Metadata trilingual per halaman** — title/description/canonical/hreflang dibangun oleh `src/lib/seo.ts` (sumber tunggal; ganti domain di konstanta `SITE_URL` atau set env `NEXT_PUBLIC_SITE_URL` saat go-live).
- **`/sitemap.xml`** — semua route + alternates hreflang en/id/ko; **`/robots.txt`** — allow all + sitemap.
- **Navigasi cerdas**: di homepage anchor smooth-scroll; di halaman sub, navbar/footer/CTA menjadi link nyata ke route (`?lang=` mengikuti bahasa aktif). Footer selalu berisi link crawlable ke semua route + 6 halaman kelas.
- **Halaman sub tanpa loader** — `Navbar instant` merender langsung (loader 2 detik hanya di homepage).

### Branding konsultan (backend — tidak tampil di permukaan)

Identitas konsultan ditanam **hanya di metadata/structured data** (terbaca Google, tak terlihat pengunjung):

- `src/lib/seo.ts` → `CONSULTANT` + `CONSULTANT_KEYWORDS` + `ATTRIBUTION_COMMENT`: **Gugun Gunara** (Muhammad Lutfi Azmi · prabudanling · Santri Angon), "Master Polymath · Sage Universal · The Ultimate Problem Solver", PT Top Konsultan Internasional (topkonsultan.web.id · pusatperizinan.com), Digiman.id (PT Digital Bisnis Manajemen), + 6 profil sosial (Facebook/X/Instagram/TikTok/Threads/Reddit) sebagai `sameAs` node JSON-LD.
- layout.tsx: meta keywords + authors + komentar HTML atribusi + JSON-LD `@graph` (studio + website + organisasi konsultan + agensi desain, tersambung via `contributor`).
- Permukaan situs tetap murni Elchí: sosial yang tampil di footer hanya milik studio (Instagram/WhatsApp/Email dari `/admin → Pengaturan`).
- Kredit partner tampil elegan di footer (sesuai permintaan): Digiman.id · JuraganWebsite · PT Top Konsultan Internasional (topkonsultan.web.id · pusatperizinan.com).

### Tipografi Korea

- Judul (`font-display`): **Noto Sans KR** 900 — `html[lang="ko"] .font-display`
- Aksen tulisan tangan (`font-script`): **Nanum Pen Script** — `html[lang="ko"] .font-script`
- `word-break: keep-all` pada `body` mencegah pemenggalan kata Korea yang jelek di tengah baris.
- Font dimuat via `next/font` (`preload: false`, diminta hanya saat locale Korea aktif/memuat glyph Hangul).

### Keputusan konten (disengaja)

1. **Nama kelas tetap brand bahasa Inggris** (Travel Drawing, Postcards, Dog Keychain, Custom Flip-Flop, Custom T-shirt, Creative Flow) di ketiga bahasa — konsisten dengan materi brosur resmi; tagline, deskripsi, durasi, dan label semuanya diterjemahkan.
2. **Institusi pendidikan & klien** tetap dalam ejaan aslinya (École de Condé, ESADMM, Pinterest, …) — nama proper.
3. **Sapaan trilingual** (`SELAMAT DATANG · WELCOME · 어서 오세요`) tampil di loader pembuka di semua bahasa — identitas studio yang mengajar dalam 3 bahasa.
4. Dasbor admin (Studio Admin) juga dilokalisasi untuk kenyamanan staf.

### API

- `POST /api/concierge` menerima `locale` (`"id" | "en" | "ko"`) — balasan AI diwajibkan dalam bahasa tersebut melalui language rule pada system prompt. Terverifikasi: pertanyaan Korea dijawab Korea; pertanyaan Indonesia dijawab Indonesia.
- `POST /api/bookings` kini mengembalikan `code` (`invalid_name` / `invalid_email` / `invalid_class`) — frontend memetakan kode ke pesan error terlokalisasi.

### Hasil QA (semua lulus)

- `bun run lint` — bersih.
- `bunx tsc --noEmit` — 0 error pada kode proyek (error tersisa hanya fixture template `examples/` & `skills/` yang sudah ada sebelum perubahan ini).
- `bun run build` — build produksi sukses.
- Browser (1440×900 & 390×844): hero EN/ID/KO, classes ID, booking ID end-to-end (data tersimpan di DB + layar "Terima kasih!"), menu mobile ID, menu bahasa (globe) di navbar & menu mobile, `document.documentElement.lang` benar untuk ketiga locale.
- Screenshot bukti: folder `screenshots/` di samping dokumen ini.

### Menambah bahasa baru (mis. Prancis)

1. Buat `src/lib/i18n/fr.ts` mengikuti tipe `LocaleData`.
2. Daftarkan di `src/lib/i18n/index.ts` (`DICTS`) dan `src/lib/i18n/labels.ts` (`LOCALES_LABELS`).
3. Tambahkan kode di `LOCALE_CODES` (index) dan `isLocale` (locale-provider).
4. Jika bahasa butuh font khusus, muat via `next/font` di `layout.tsx` + aturan CSS `html[lang="fr"]` di `globals.css`.
5. Tambahkan rule bahasa di `LOCALE_RULES` (`src/app/api/concierge/route.ts`).

---

## English

### 🆕 WordPress-style admin dashboard (`/admin`)

The studio can now manage its own site:

1. Open **`/admin`** (or the "Studio Admin" link in the footer).
2. Sign in with the seeded account: **`ptelchistudiobali@gmail.com`** (official company email from the NIB) + the password delivered in the handover notes — **change it immediately** in Dashboard → Pengaturan → Ganti Password Admin.
3. Three tabs (Indonesian UI):
   - **Booking Masuk** — every site reservation, WITA timestamps, one-tap WhatsApp contact per guest.
   - **Galeri** — add photos (device upload ≤ 6 MB or image URL), edit captions, reorder, delete. Dashboard photos **appear on the site instantly**; an empty list falls back to the 8 built-in editorial shots.
   - **Pengaturan** — studio address, WhatsApp number, email, opening hours, Instagram URL, plus password change. Saves go live on the site immediately.

**Security (MVP, zero new dependencies):** scrypt-salted password hashes; HMAC-signed httpOnly session cookie (7 days); every admin API rejects unauthenticated calls. Upgrade path documented in code (NextAuth + roles).

**Seeded from your official documents:** NIB office address, WhatsApp +62 823-3957-0355, company email, and the 8 brochure photos. Private identity documents are never published.

### 🆕 WhatsApp & direct contact

Green floating WhatsApp button (pulsing ring animation) above the concierge bubble, WhatsApp card in the footer with a "Chat on WhatsApp" pill — all driven by the dashboard settings.

### 🆕 New animations

1. **Scroll progress ribbon** (rose→sun gradient) tracking scroll position.
2. **3D card tilt** on the class cards (fine pointers only, reduced-motion aware).
3. **Gallery lightbox** — spring zoom, blurred backdrop, arrow/Esc keyboard navigation.
4. **WhatsApp pulse ring**.

---

## English (previous sections)

### Summary

The Elchí Studio Bali website is now fully **trilingual** — Bahasa Indonesia, 한국어, and English. Every surface (nav, hero, six classes, private experiences, instructor profile, gallery, booking form, FAQ, footer, AI Concierge) is localized in one single-page experience with a one-click language switcher — no separate routes.

### System mechanics

1. **LocaleProvider** (`locale-provider.tsx`) holds the global locale, persists it to `localStorage`, syncs `<html lang>`, and plays the branded watercolour curtain wipe on explicit switches (skipped under `prefers-reduced-motion`).
2. **First visit** detects browser language (`id`/`ko`/default `en`) behind the intro loader, so there is never a visible text flash.
3. **Hydration-safe**: SSR always renders English; the locale swap happens one frame after mount (house `requestAnimationFrame` pattern).
4. **Hero replay**: headline `StaggerWords` are keyed by locale, so the word-by-word cinematic reveal replays on every switch.
5. **Korean typography**: Noto Sans KR 900 for display headings, Nanum Pen Script for handwritten accents, `word-break: keep-all` for correct Korean line breaking.
6. **APIs**: `/api/concierge` accepts `locale` and forces replies in that language; `/api/bookings` returns stable error `code`s mapped to localized messages client-side.

### Content decisions

- Class names remain the official English brand names in all locales (matching the printed brochures); everything around them is translated.
- Institution and client names keep their original spellings (proper nouns).
- The trilingual greeting (`SELAMAT DATANG · WELCOME · 어서 오세요`) appears on the loader in every locale — the studio itself teaches in three languages.

### Verified

ESLint clean · project TypeScript clean (pre-existing template-fixture errors in `examples/`/`skills/` untouched) · production build passes · browser-verified across desktop & mobile for all three locales, including an end-to-end booking persisted to SQLite with a localized success screen.

### Adding a new language

See the 5-step Indonesian checklist above (`fr.ts` → `DICTS` → `LOCALES_LABELS` → `LOCALE_CODES`/`isLocale` → optional font + CSS + concierge rule).
