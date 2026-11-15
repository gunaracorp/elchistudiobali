# 📝 WORKLOG — Elchí Studio Bali Website

### Riwayat Kerja Detail / Detailed Work History · Bahasa Indonesia + English

| Metadata | Nilai / Value |
|----------|---------------|
| **Proyek / Project** | Website resmi PT. Elchi Studio Bali (trilingual + CMS + Concierge AI) |
| **Versi saat ini / Current version** | `v3.0.0` (15 November 2026) |
| **Repo / Repository** | `github.com/gunaracorp/elchistudiobali` — branch `main` |
| **Periode kerja / Work period** | 13 November 2026 – 15 November 2026 (3 hari efektif / effective days) |
| **Total commit** | 10+ (lihat tabel commit / see commit table) |
| **Ukuran kode / Code size** | ± 13.317 baris TypeScript/TSX · 11 halaman · 12 endpoint · 4 model DB |
| **Pemilik brand / Brand owner** | PT. Elchi Studio Bali — Elin Kim (Founder & Lead Instructor) |
| **Pengembang / Developer** | PT Top Konsultan Internasional — Gugun Gunara |

> 🇮🇩 Dokumen ini adalah log kerja paling detail untuk proyek — setiap fase, setiap iterasi desain, setiap keputusan, dan setiap commit. Ringkasan versi ada di [CHANGELOG.md](./CHANGELOG.md); ikhtisar arsitektur ada di [README.md](./README.md) & [README-FULL.md](./README-FULL.md) & [README.EN.md](./README.EN.md).
>
> 🇬🇧 This document is the most detailed work log for the project — every phase, every design iteration, every decision, and every commit. Version summaries live in [CHANGELOG.md](./CHANGELOG.md); architecture overviews in [README.md](./README.md) & [README-FULL.md](./README-FULL.md) & [README.EN.md](./README.EN.md).

---

## 📊 Ringkasan Eksekutif / Executive Summary

**🇮🇩** Dalam 3 hari kerja efektif, website resmi PT. Elchi Studio Bali dibangun dari nol menjadi aplikasi produksi berstandar internasional: 11 halaman trilingual (EN default · ID · KO), CMS dasbor admin berbahasa Indonesia, Concierge AI berbasis fakta resmi, SEO lengkap per-halaman-per-bahasa (meta, hreflang, JSON-LD, sitemap, robots), alur booking end-to-end (formulir → database → inbox dasbor → WhatsApp), serta alat operasional (Publish + Download Excel). Seluruh konten bersumber dari dokumen resmi klien (NIB, brosur, profil instruktur) tanpa data yang dikarang.

**🇬🇧** In 3 effective working days, PT. Elchi Studio Bali's official website was built from zero into a production-grade, international-standard application: 11 trilingual pages (EN default · ID · KO), an Indonesian-language admin CMS dashboard, an official-facts-only Concierge AI, complete per-page-per-language SEO (meta, hreflang, JSON-LD, sitemap, robots), an end-to-end booking flow (form → database → dashboard inbox → WhatsApp), and operational tools (Publish + Download Excel). All content sources from the client's official documents (NIB, brochure, instructor profile) with no invented data.

---

## FASE 0 — Inisiasi & Aset Resmi / Initiation & Official Assets
**📅 13 November 2026 · commit `Initial commit` (20:13) & `98eb95e4` (21:03)**

### 🇮🇩 Bahasa Indonesia

**20:13 — Initial commit: scaffold aplikasi.**
Memulai proyek di workspace Next.js: **Next.js 16** (App Router, TypeScript), **React 19**, **Tailwind CSS 4** + **shadcn/ui** (45+ komponen Radix siap pakai), **Prisma 6** dengan SQLite, linting ESLint 9. Skrip `dev` di port 3000, `build` menghasilkan output standalone (server.js siap produksi).

**21:03 — Ekstraksi aset resmi klien.**
Membaca dokumen yang diunggah klien di `upload/`: **NIB PT ELCHI STUDIO BALI**, AKTA PENDIRIAN PMDN, SK KEMENKUMHAM, SURAT KETERANGAN TERDAFTAR, dan brosur **"Elin's Classes workshop"**. Dari dokumen tersebut:
- Mengekstrak **11 aset visual** ke `public/images/`: hero watercolour, 6 foto kelas (Travel Drawing, Dog Keychain, Postcards, Custom Flip-Flop, Custom T-shirt, Creative Flow), potret Elin, foto studio, foto workshop grup.
- Menyusun **data kelas resmi** di `src/lib/classes-data.ts` — durasi, deskripsi, dan isi setiap kelas diambil apa adanya dari brosur (statis di kode agar konten resmi tidak bisa rusak lewat UI).
- Mencatat fakta profil instruktur: 19 tahun mengajar, École de Condé Paris, ESADMM Marseille, sertifikasi needle felting (2022) / fitness (2020) / flower rice cakes (2018), bahasa pengajaran EN/FR/KO, klien workshop: Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento, Korean Cultural Centre Australia, 250+ ulasan bintang lima.

### 🇬🇧 English

**20:13 — Initial commit: app scaffold.**
Started from the Next.js workspace: **Next.js 16** (App Router, TypeScript), **React 19**, **Tailwind CSS 4** + **shadcn/ui** (45+ ready Radix components), **Prisma 6** with SQLite, ESLint 9. `dev` runs on port 3000; `build` produces a standalone production output (server.js).

**21:03 — Client official asset extraction.**
Read the client's uploaded documents: the **PT ELCHI STUDIO BALI NIB**, PMDN deed of establishment, KEMENKUMHAM decree, registration certificate, and the **"Elin's Classes workshop"** brochure. From these:
- Extracted **11 visual assets** into `public/images/`: watercolour hero, 6 class photos, Elin's portrait, studio shot, group-workshop shot.
- Compiled the **official class dataset** in `src/lib/classes-data.ts` — durations, descriptions, and content taken verbatim from the brochure (kept static in code so official content cannot be broken through the UI).
- Recorded instructor facts: 19 years teaching, École de Condé Paris, ESADMM Marseille, needle felting (2022) / fitness (2020) / flower rice cakes (2018) certifications, teaches in EN/FR/KO, workshop clients: Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento, Korean Cultural Centre Australia, 250+ five-star reviews.

---

## FASE 1 — Eksplorasi Desain, Iterasi v1–v7 / Design Exploration, Iterations v1–v7
**📅 14–15 November 2026 (sesi malam / evening session) · commit `b8d5e3c0` (15 Nov 00:52) & `52c741d8` (01:24)**

### 🇮🇩 Bahasa Indonesia

Tujuh iterasi desain penuh, masing-masing dirender sebagai bukti visual (`scripts/v*-*.png`) dan ditinjau sebelum lanjut:

| Iterasi | Artefak | Yang dibangun & diputuskan |
|---------|---------|---------------------------|
| **v1 — Hero** | `v-hero.png` | Konsep pertama hero watercolour + tipografi display variabel; ditetapkan arah "galeri seni hidup", bukan template travel blog. |
| **v2 — Hero + About** | `v2-hero.png`, `v2-about.png` | Marquee kelas berjalan, kartu nilai studio; palet final **krem / ros / ink** dengan tekstur cat air; kursor kustom ditambah. |
| **v3 — Kelas** | `v3-hero.png`, `v3-classes.png` | Grid 6 kelas unggulan, hierarki tipografi, ikon lucide-react satu keluarga. |
| **v4 — Elin & Experiences** | `v4-elin.png`, `v4-exp.png`, `v4-gallery.png` | Profil instruktur + strip 14 logo klien internasional; draf halaman pengalaman privat (grup ≤ 50 & privat 1:1); draf galeri. |
| **v5 — Booking & Admin** | `v5-booking.png`, `v5-success.png`, `v5-admin.png`, `v5-elin.png` | Formulir booking lengkap (kelas, tanggal, jumlah peserta, pesan) + layar sukses; konsep dasbor admin. |
| **v6 — Concierge, FAQ, Mobile** | `v6-concierge.png`, `v6-faq.png`, `v6-mobile-hero.png`, `v6-mobile-menu.png` | Asisten AI Concierge di sudut situs; FAQ trilingual; audit tampilan ponsel 390×844 (hero, menu hamburger, footer). |
| **v7 — Galeri final** | `v7-gallery.png` | Galeri interaktif + lightbox; tampilan final **disetujui** → masuk fase fungsional. |

**00:52 (15 Nov) — commit `b8d5e3c0`**: iterasi v2–v6 stabil di `main`. **01:24 — commit `52c741d8`**: galeri final + formulir booking + seed CMS (akun admin, pengaturan, 8 foto galeri bawaan) + dasbor fungsional.

### 🇬🇧 English

Seven full design iterations, each rendered as visual proof (`scripts/v*-*.png`) and reviewed before moving on:

| Iteration | Artifacts | What was built & decided |
|-----------|-----------|--------------------------|
| **v1 — Hero** | `v-hero.png` | First watercolour hero concept + variable display typography; direction set as "a living art gallery", not a travel-blog template. |
| **v2 — Hero + About** | `v2-hero.png`, `v2-about.png` | Running class marquee, studio value cards; final **cream / rose / ink** palette with watercolour textures; custom cursor added. |
| **v3 — Classes** | `v3-hero.png`, `v3-classes.png` | 6-class grid, typographic hierarchy, single-family lucide-react icons. |
| **v4 — Elin & Experiences** | `v4-elin.png`, `v4-exp.png`, `v4-gallery.png` | Instructor profile + strip of 14 international client logos; draft private-experiences page (group ≤ 50 & private 1:1); gallery draft. |
| **v5 — Booking & Admin** | `v5-booking.png`, `v5-success.png`, `v5-admin.png`, `v5-elin.png` | Complete booking form (class, date, participants, message) + success screen; admin dashboard concept. |
| **v6 — Concierge, FAQ, Mobile** | `v6-concierge.png`, `v6-faq.png`, `v6-mobile-hero.png`, `v6-mobile-menu.png` | Concierge AI assistant in the site corner; trilingual FAQ; 390×844 mobile audit (hero, hamburger menu, footer). |
| **v7 — Final gallery** | `v7-gallery.png` | Interactive gallery + lightbox; final look **approved** → functionality phase. |

**00:52 (15 Nov) — commit `b8d5e3c0`**: iterations v2–v6 stable on `main`. **01:24 — commit `52c741d8`**: final gallery + booking form + CMS seed (admin account, settings, 8 default gallery photos) + working dashboard.

---

## FASE 2 — Trilingual, CMS & Concierge AI / Trilingual, CMS & Concierge AI
**📅 15 November 2026 (sesi siang / day session) · commit `c675e0d8` (13:21), `2258a4e8` (14:23), `d1260df9` (17:38)**

### 🇮🇩 Bahasa Indonesia

**Sistem i18n penuh.** Membangun `src/lib/i18n/` (`en.ts`, `id.ts`, `ko.ts`, `labels.ts`, `types.ts`) + `locale-provider.tsx` + `language-switcher.tsx`: satu komponen merender tiga bahasa tanpa halaman duplikat. `DEFAULT_LOCALE = "en"` — kunjungan pertama berbahasa Inggris (standar internasional); preferensi tersimpan di peramban; `?lang=` bisa dibagikan.

**SEO 3 bahasa.** `src/lib/seo.ts`: `PAGE_SEO` (judul + deskripsi + breadcrumb untuk 10 rute × 3 bahasa), `buildMetadata()` (canonical + **hreflang ×3** + OpenGraph locale `id_ID`/`en_US`/`ko_KR`), `siteGraph()` JSON-LD `@graph` (EducationalOrganization + WebSite + BreadcrumbList), `sitemap.ts` otomatis, `public/robots.txt`.

**Dasbor admin ala WordPress (`/admin`).** Login scrypt ber-salt + cookie `httpOnly` HMAC 7 hari; 3 tab: **Booking Masuk** (badge NEW, waktu WITA Asia/Makassar, tombol WhatsApp per pemesan dengan normalisasi nomor 62), **Galeri** (unggah ≤ 6 MB, drag & drop @dnd-kit, keterangan per foto, hapus), **Pengaturan** (alamat, WhatsApp, email, jam, Instagram) + **Ganti Password** (verifikasi password lama, min. 8 karakter).

**Concierge AI.** `concierge.tsx` → `POST /api/concierge` → Z-AI GLM: knowledge base hanya fakta resmi (6 kelas + durasi, pengalaman privat, profil Elin, lokasi, alur booking), aturan bahasa per locale (ID/EN/KO — 해요체/합니다체 untuk Korea), jawaban 2–5 kalimat, riwayat 8 pesan.

**13:21 — commit `c675e0d8`**: QA & penyempurnaan menyeluruh. **14:23 — commit `2258a4e8`**: deliverable klien — **showcase PDF 17 halaman** (cover brand, 10 tampilan desktop, 3 ponsel, 2 dasbor, ringkasan fitur) + **`Elchi-Website-Paket.zip`** + 12 screenshot sumber. **17:38 — commit `d1260df9`**: dokumentasi HANDOVER dwibahasa, footer CMS (kontak dari database), pengayaan JSON-LD, sitemap final.

### 🇬🇧 English

**Full i18n system.** Built `src/lib/i18n/` (`en.ts`, `id.ts`, `ko.ts`, `labels.ts`, `types.ts`) + `locale-provider.tsx` + `language-switcher.tsx`: one component renders three languages without duplicate pages. `DEFAULT_LOCALE = "en"` — first visits in English (international standard); browser-saved preference; shareable `?lang=`.

**Trilingual SEO.** `src/lib/seo.ts`: `PAGE_SEO` (title + description + breadcrumb for 10 routes × 3 languages), `buildMetadata()` (canonical + **hreflang ×3** + OpenGraph locales `id_ID`/`en_US`/`ko_KR`), `siteGraph()` JSON-LD `@graph` (EducationalOrganization + WebSite + BreadcrumbList), automatic `sitemap.ts`, `public/robots.txt`.

**WordPress-style admin dashboard (`/admin`).** Salted scrypt login + 7-day `httpOnly` HMAC cookie; 3 tabs: **Booking Inbox** (NEW badges, WITA Asia/Makassar times, per-guest WhatsApp button with 62-format normalisation), **Gallery** (≤ 6 MB uploads, @dnd-kit drag & drop, per-photo captions, delete), **Settings** (address, WhatsApp, emails, hours, Instagram) + **Change Password** (verifies old password, min. 8 chars).

**Concierge AI.** `concierge.tsx` → `POST /api/concierge` → Z-AI GLM: official-facts-only knowledge base (6 classes + durations, private experiences, Elin's profile, location, booking flow), per-locale language rules (ID/EN/KO — 해요체/합니다체 for Korean), 2–5 sentence answers, 8-message history.

**13:21 — commit `c675e0d8`**: full QA & polish. **14:23 — commit `2258a4e8`**: client deliverables — **17-page showcase PDF** (branded cover, 10 desktop views, 3 mobile, 2 dashboard pages, feature summary) + **`Elchi-Website-Paket.zip`** + 12 source screenshots. **17:38 — commit `d1260df9`**: bilingual HANDOVER documentation, CMS footer (contact from database), enriched JSON-LD, final sitemap.

---

## FASE 3 — Data Resmi & Operasional · Rilis v3.0.0 / Official Data & Operations · v3.0.0 Release
**📅 15 November 2026 (sesi malam / evening session) · commit `ef23cc0` (20:04) → push `277315f9` (20:05)**

### 🇮🇩 Bahasa Indonesia

- **Alamat resmi confirmed** dari pemilik studio: **Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia**. Alamat sementara "BTS Business Park" **dihapus dari semua titik** — 0 sisa di seluruh `src/`, `prisma/`, `scripts/` (terverifikasi grep): SEO kontak ×3 bahasa, JSON-LD PostalAddress, seed script, database live, Concierge, HANDOVER, showcase PDF.
- **Email dikoreksi + 3 email aktif**: typo `elchie→elchi` diperbaiki; footer merender **3 email aktif** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) dari pengaturan (multi-alamat dipisah koma); JSON-LD memuat 3 `contactPoint`; kolom Email dasbor mendukung multi-alamat.
- **Tombol Publish & Download Excel** di dasbor: tombol simpan Pengaturan menjadi **Publish**; **Download Excel** di sebelahnya mengekspor seluruh booking ke CSV (BOM UTF-8, pemisah `;`, nama file bertanggal).
- **Uji penerimaan browser** (agent-browser): login admin → tab Pengaturan → klik Download Excel → status **`Excel diunduh ✓ (2 booking)`** + file CSV valid terunduh; password asli pemilik tidak tersentuh (password sementara untuk uji, hash asli dipulihkan).
- **20:04 — commit `ef23cc0`** (42 file berubah) → **20:05 — push ke GitHub** `gunaracorp/elchistudiobali` `main` (`277315f9`).

### 🇬🇧 English

- **Confirmed official address** from the studio owner: **Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia**. The temporary "BTS Business Park" address was **removed from every touchpoint** — 0 leftovers across `src/`, `prisma/`, `scripts/` (grep-verified): trilingual contact SEO, JSON-LD PostalAddress, seed script, live database, Concierge, HANDOVER, showcase PDF.
- **Email correction + 3 active emails**: the `elchie→elchi` typo fixed; the footer renders **3 active emails** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) from settings (comma-separated multi-address); JSON-LD carries 3 `contactPoint`s; the dashboard Email field supports multiple addresses.
- **Publish & Download Excel buttons** in the dashboard: the Settings save button became **Publish**; **Download Excel** beside it exports all bookings to CSV (UTF-8 BOM, `;` separator, dated filename).
- **Browser acceptance test** (agent-browser): admin login → Settings tab → click Download Excel → status **`Excel diunduh ✓ (2 booking)`** + valid CSV downloaded; the owner's real password untouched (temporary password for testing, original hash restored).
- **20:04 — commit `ef23cc0`** (42 files changed) → **20:05 — pushed to GitHub** `gunaracorp/elchistudiobali` `main` (`277315f9`).

---

## FASE 4 — Dokumentasi Internasional / International Documentation
**📅 15 November 2026 (malam / evening) · commit `79e10ab` → commit dokumentasi EN/WORKLOG/CHANGELOG**

### 🇮🇩 Bahasa Indonesia

- **`README.md`** — README utama Bahasa Indonesia (badge versi, fitur, peta halaman, stack, mulai cepat, data resmi, versi & worklog ringkas, keamanan, kredit).
- **`README-FULL.md`** — dokumentasi lengkap dwibahasa ID+EN, 15 bagian (identitas & versi, fitur, arsitektur, database, API, dasbor, i18n & SEO, Concierge, deployment, QA, worklog, changelog, roadmap, kredit).
- **`README.EN.md`** — edisi Inggris penuh dari dokumentasi lengkap (standar internasional).
- **`WORKLOG.md`** — dokumen ini: log kerja paling detail per fase dengan commit hash, artefak iterasi desain, dan log keputusan.
- **`CHANGELOG.md`** — riwayat rilis format Keep-a-Changelog dwibahasa.
- `package.json` diperbarui: nama `elchi-studio-bali-website`, versi **3.0.0**.

### 🇬🇧 English

- **`README.md`** — main Bahasa Indonesia README (version badges, features, page map, stack, quick start, official data, version & short worklog, security, credits).
- **`README-FULL.md`** — complete bilingual ID+EN documentation, 15 sections (identity & versioning, features, architecture, database, API, dashboard, i18n & SEO, Concierge, deployment, QA, worklog, changelog, roadmap, credits).
- **`README.EN.md`** — full English edition of the complete documentation (international standard).
- **`WORKLOG.md`** — this document: the most detailed work log per phase with commit hashes, design-iteration artifacts, and a decision log.
- **`CHANGELOG.md`** — Keep-a-Changelog-format bilingual release history.
- `package.json` updated: name `elchi-studio-bali-website`, version **3.0.0**.

---

## 🗃 Tabel Commit Lengkap / Full Commit Table

| # | Tanggal & waktu / Date & time | Hash | 🇮🇩 Isi | 🇬🇧 Content |
|---|-------------------------------|------|---------|-------------|
| 1 | 13 Nov 2026 · 20:13 | `Initial commit` | Scaffold Next.js 16 + Tailwind 4 + shadcn/ui + Prisma 6 | Next.js 16 + Tailwind 4 + shadcn/ui + Prisma 6 scaffold |
| 2 | 13 Nov 2026 · 21:03 | `98eb95e4` | Ekstraksi aset resmi NIB & brosur (11 aset) + data kelas | Official NIB & brochure asset extraction (11 assets) + class data |
| 3 | 15 Nov 2026 · 00:52 | `b8d5e3c0` | Iterasi desain v2–v6 stabil | Design iterations v2–v6 stable |
| 4 | 15 Nov 2026 · 01:24 | `52c741d8` | v7 galeri final + booking + seed CMS + dasbor | v7 final gallery + booking + CMS seed + dashboard |
| 5 | 15 Nov 2026 · 13:21 | `c675e0d8` | QA menyeluruh & penyempurnaan | Full QA & polish |
| 6 | 15 Nov 2026 · 14:23 | `2258a4e8` | Showcase PDF 17 hal + paket ZIP + 12 screenshot | 17-page showcase PDF + ZIP package + 12 screenshots |
| 7 | 15 Nov 2026 · 17:38 | `d1260df9` | HANDOVER dwibahasa + footer CMS + JSON-LD + sitemap | Bilingual HANDOVER + CMS footer + JSON-LD + sitemap |
| 8 | 15 Nov 2026 · 20:04 | `ef23cc0` | **Rilis v3.0.0**: alamat confirmed + 3 email + Publish & Download Excel (42 file) | **v3.0.0 release**: confirmed address + 3 emails + Publish & Download Excel (42 files) |
| 9 | 15 Nov 2026 · 20:05 | `277315f9` | Push ke GitHub `main` | Pushed to GitHub `main` |
| 10 | 15 Nov 2026 (malam) | `79e10ab` | README utama ID + README-FULL dwibahasa + versi resmi 3.0.0 | Main ID README + bilingual README-FULL + official 3.0.0 version |
| 11 | 15 Nov 2026 (malam) | *(commit ini / this commit)* | README.EN + WORKLOG + CHANGELOG + koreksi default bahasa | README.EN + WORKLOG + CHANGELOG + default-language correction |

---

## 📈 Statistik Proyek / Project Statistics

| Metrik / Metric | 🇮🇩 Nilai | 🇬🇧 Value |
|-----------------|-----------|-----------|
| Baris kode TypeScript/TSX | ± 13.317 | ± 13,317 lines |
| Halaman publik + admin | 11 (10 publik × 3 bahasa + `/admin`) | 11 (10 public × 3 languages + `/admin`) |
| Endpoint API | 12 (5 publik + 7 admin) | 12 (5 public + 7 admin) |
| Model database | 4 (Booking, AdminUser, SiteSetting, GalleryImage) | 4 (Booking, AdminUser, SiteSetting, GalleryImage) |
| Komponen kustom | 24 di `src/components/elchi/` | 24 in `src/components/elchi/` |
| Aset visual resmi | 11 di `public/images/` + 8 galeri seed | 11 in `public/images/` + 8 gallery seeds |
| Bahasa | 3 penuh (EN default · ID · KO) | 3 full (EN default · ID · KO) |
| Iterasi desain | 7 (v1–v7) | 7 (v1–v7) |
| Screenshot QA | 12 sumber + 10 paket | 12 source + 10 package |
| Halaman showcase PDF | 17 | 17 |

---

## 🧭 Log Keputusan Penting / Key Decision Log

| # | 🇮🇩 Keputusan & alasan | 🇬🇧 Decision & rationale |
|---|------------------------|--------------------------|
| 1 | **Kelas statis di kode, galeri dinamis di DB** — konten resmi brosur tidak bisa rusak lewat UI; foto bebas diganti studio. | **Classes static in code, gallery dynamic in DB** — official brochure content cannot be broken via UI; photos freely swappable by the studio. |
| 2 | **Pengaturan key-value** — menambah field baru tanpa migrasi skema. | **Key-value settings** — new fields without schema migration. |
| 3 | **Default bahasa Inggris** (`DEFAULT_LOCALE="en"`) — audiens utama wisatawan internasional; switcher di header; `?lang=` shareable & terindeks. | **English default** (`DEFAULT_LOCALE="en"`) — primary audience is international travellers; header switcher; shareable & indexable `?lang=`. |
| 4 | **Dasbor berbahasa Indonesia** — pemilik studio paham tanpa pelatihan; situs berbahasa Inggris default. | **Bahasa Indonesia dashboard** — the owner understands it without training while the site defaults to English. |
| 5 | **Concierge hanya fakta resmi** — AI tidak mengarang harga/jadwal; hal belum dikonfirmasi diarahkan ke WhatsApp/booking. | **Concierge answers official facts only** — the AI never invents prices/schedules; unconfirmed items route to WhatsApp/booking. |
| 6 | **scrypt + cookie HMAC httpOnly** — keamanan admin tanpa dependensi baru; kredensial tak pernah masuk repo/ZIP. | **scrypt + httpOnly HMAC cookie** — admin security with zero new dependencies; credentials never enter the repo/ZIP. |
| 7 | **CSV Excel dengan BOM + pemisah `;`** — langsung rapi di Excel regional Indonesia. | **CSV with BOM + `;` separator** — opens cleanly in Indonesian-locale Excel. |
| 8 | **Branding konsultan di backend saja** — JSON-LD & kredit footer; permukaan UI murni Elchí. | **Consultant branding backend-only** — JSON-LD & footer credits; the UI surface stays purely Elchí. |

---

## 📌 Status Akhir / Final Status

**🇮🇩** Semua to-do permintaan klien **selesai & terverifikasi**: koreksi email (3 email aktif), alamat confirmed tanpa BTS, tombol Publish + Download Excel (teruji browser), default bahasa Inggris + switcher header, multi-halaman + full SEO, branding konsultan tersembunyi di backend, footer credits, versi resmi v3.0.0, README ID + README-FULL + README.EN + WORKLOG + CHANGELOG, verifikasi halaman, paket ZIP, dan push GitHub.

**🇬🇧** Every client-requested to-do is **done & verified**: email correction (3 active emails), confirmed address with no BTS leftovers, Publish + Download Excel buttons (browser-tested), English default + header switcher, multi-page + full SEO, backend-only consultant branding, footer credits, official v3.0.0 version, README ID + README-FULL + README.EN + WORKLOG + CHANGELOG, page verification, ZIP package, and GitHub push.

