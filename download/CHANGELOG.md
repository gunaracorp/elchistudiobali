# 📋 CHANGELOG — Elchí Studio Bali Website

**🇮🇩** Semua perubahan penting pada proyek ini didokumentasikan dalam berkas ini. Format mengikuti [Keep a Changelog](https://keepachangelog.com/id/1.1.0/); penomoran versi mengikuti [Semantic Versioning](https://semver.org/lang/id/).
**🇬🇧** All notable changes to this project are documented in this file. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org).

---

## [Unreleased]

### Added / Ditambahkan
- **🇮🇩** `README.EN.md` — edisi dokumentasi lengkap berbahasa Inggris (15 bagian).
- **🇮🇩** `WORKLOG.md` — log kerja paling detail: fase, iterasi desain v1–v7, tabel commit, statistik, log keputusan.
- **🇮🇩** `CHANGELOG.md` — berkas ini.
- **🇬🇧** `README.EN.md` — full English documentation edition (15 sections).
- **🇬🇧** `WORKLOG.md` — most detailed work log: phases, design iterations v1–v7, commit table, statistics, decision log.
- **🇬🇧** `CHANGELOG.md` — this file.

### Fixed / Diperbaiki
- **🇮🇩** Koreksi klaim bahasa default pada README (sebelumnya tertulis `id`, kode sebenarnya `DEFAULT_LOCALE = "en"`).
- **🇬🇧** Corrected the default-language claims in the READMEs (previously stated `id`; the code is actually `DEFAULT_LOCALE = "en"`).

---

## [3.0.0] — 2026-11-15 🌺

### Added / Ditambahkan
- **🇮🇩** Tombol **Publish** di tab Pengaturan dasbor — menyimpan dan menayangkan perubahan langsung ke situs.
- **🇮🇩** Tombol **Download Excel** di sebelah Publish — mengekspor seluruh booking ke CSV siap-Excel (BOM UTF-8, pemisah `;`, nama file bertanggal); teruji di browser: `Excel diunduh ✓ (2 booking)`.
- **🇮🇩** Dukungan multi-alamat email: footer merender **3 email aktif** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) dari pengaturan yang dipisah koma.
- **🇮🇩** README internasional: `README.md` (Bahasa Indonesia) + `README-FULL.md` (dwibahasa ID+EN).
- **🇬🇧** **Publish** button on the dashboard's Settings tab — saves and goes live immediately.
- **🇬🇧** **Download Excel** button beside Publish — exports all bookings to an Excel-ready CSV (UTF-8 BOM, `;` separator, dated filename); browser-tested: `Excel diunduh ✓ (2 booking)`.
- **🇬🇧** Multi-address email support: the footer renders **3 active emails** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) from comma-separated settings.
- **🇬🇧** International READMEs: `README.md` (Bahasa Indonesia) + `README-FULL.md` (bilingual ID+EN).

### Changed / Diubah
- **🇮🇩** Alamat resmi studio dikonfirmasi pemilik: **Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361** — disinkronkan ke semua titik (SEO ×3 bahasa, JSON-LD, seed, database live, Concierge, HANDOVER, showcase PDF).
- **🇮🇩** `package.json`: nama paket `elchi-studio-bali-website`, versi resmi **3.0.0**.
- **🇬🇧** Confirmed studio address from the owner: **Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361** — synced to every touchpoint (trilingual SEO, JSON-LD, seed, live database, Concierge, HANDOVER, showcase PDF).
- **🇬🇧** `package.json`: package name `elchi-studio-bali-website`, official version **3.0.0**.

### Fixed / Diperbaiki
- **🇮🇩** Typo email `elchie→elchi` dikoreksi di seluruh sistem.
- **🇬🇧** The `elchie→elchi` email typo corrected across the system.

### Removed / Dihapus
- **🇮🇩** Alamat sementara "BTS Business Park" dihapus dari **semua** titik aplikasi (0 sisa, terverifikasi grep).
- **🇬🇧** The temporary "BTS Business Park" address removed from **every** app touchpoint (0 leftovers, grep-verified).

---

## [2.0.0] — 2026-11-15

### Added / Ditambahkan
- **🇮🇩** Trilingual penuh (EN · ID · KO) di 11 halaman — satu komponen, tiga bahasa, tanpa halaman duplikat; `DEFAULT_LOCALE="en"`, switcher di header, `?lang=` shareable.
- **🇮🇩** Dasbor admin ala WordPress (`/admin`, Bahasa Indonesia): Booking Masuk (badge NEW, waktu WITA, WhatsApp deep-link), Galeri (unggah ≤ 6 MB, drag & drop @dnd-kit, keterangan), Pengaturan, Ganti Password.
- **🇮🇩** Concierge AI (Z-AI GLM): hanya fakta resmi, aturan bahasa per locale, riwayat 8 pesan.
- **🇮🇩** SEO per-halaman-per-bahasa: `PAGE_SEO` (10 rute × 3 bahasa), canonical + hreflang ×3, OpenGraph locale, JSON-LD `@graph`, `sitemap.ts`, `robots.txt`.
- **🇮🇩** WhatsApp terintegrasi 3 titik: tombol melayang, kartu footer, deep-link per booking di dasbor.
- **🇮🇩** Deliverable klien: showcase PDF 17 halaman + `Elchi-Website-Paket.zip` + 12 screenshot + HANDOVER dwibahasa.
- **🇬🇧** Full trilingual (EN · ID · KO) across 11 pages — one component, three languages, no duplicates; `DEFAULT_LOCALE="en"`, header switcher, shareable `?lang=`.
- **🇬🇧** WordPress-style admin dashboard (`/admin`, Bahasa Indonesia): Booking inbox (NEW badges, WITA times, WhatsApp deep links), Gallery (≤ 6 MB uploads, @dnd-kit reorder, captions), Settings, password change.
- **🇬🇧** Concierge AI (Z-AI GLM): official facts only, per-locale language rules, 8-message history.
- **🇬🇧** Per-page-per-language SEO: `PAGE_SEO` (10 routes × 3 languages), canonical + hreflang ×3, locale OpenGraph, JSON-LD `@graph`, `sitemap.ts`, `robots.txt`.
- **🇬🇧** WhatsApp integrated at 3 touchpoints: floating button, footer card, per-booking deep links in the dashboard.
- **🇬🇧** Client deliverables: 17-page showcase PDF + `Elchi-Website-Paket.zip` + 12 screenshots + bilingual HANDOVER.

---

## [1.0.0] — 2026-11-13

### Added / Ditambahkan
- **🇮🇩** Scaffold aplikasi: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Prisma 6 (SQLite).
- **🇮🇩** Ekstraksi aset resmi dari dokumen klien (NIB + brosur): 11 aset visual ke `public/images/` + data 6 kelas resmi di `classes-data.ts`.
- **🇮🇩** 7 iterasi desain (v1 hero → v7 galeri) sampai tampilan final disetujui.
- **🇬🇧** App scaffold: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Prisma 6 (SQLite).
- **🇬🇧** Official asset extraction from client documents (NIB + brochure): 11 visual assets into `public/images/` + the 6 official classes in `classes-data.ts`.
- **🇬🇧** 7 design iterations (v1 hero → v7 gallery) to the approved final look.

---

[Unreleased]: https://github.com/gunaracorp/elchistudiobali/commits/main
[3.0.0]: https://github.com/gunaracorp/elchistudiobali/releases/tag/v3.0.0
[2.0.0]: https://github.com/gunaracorp/elchistudiobali/releases/tag/v2.0.0
[1.0.0]: https://github.com/gunaracorp/elchistudiobali/releases/tag/v1.0.0

**🇮🇩** © 2026 PT. Elchi Studio Bali · Dikembangkan oleh PT Top Konsultan Internasional
**🇬🇧** © 2026 PT. Elchi Studio Bali · Developed by PT Top Konsultan Internasional
