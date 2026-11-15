<div align="center">

# 🎨 Elchí Studio Bali — Dokumentasi Lengkap / Full Documentation

### Website Resmi · Trilingual CMS · Concierge AI · SEO Internasional

**Bahasa Indonesia · English** (setiap bagian tersedia dalam dua bahasa / each section is available in both languages)

![Version](https://img.shields.io/badge/version-3.0.0-E75A87?style=for-the-badge)
![Release](https://img.shields.io/badge/release-15_Nov_2026-2D3748?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-SQLite-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Framer](https://img.shields.io/badge/Framer_Motion-12-E75A87?style=flat-square)

</div>

---

## 📑 Daftar Isi / Table of Contents

1. [Identitas & Versi Aplikasi / App Identity & Versioning](#1-identitas--versi-aplikasi--app-identity--versioning)
2. [Tentang Proyek / About the Project](#2-tentang-proyek--about-the-project)
3. [Fitur Detail / Detailed Features](#3-fitur-detail--detailed-features)
4. [Arsitektur & Struktur Folder / Architecture & Folder Structure](#4-arsitektur--struktur-folder--architecture--folder-structure)
5. [Basis Data / Database Schema](#5-basis-data--database-schema)
6. [API Reference](#6-api-reference)
7. [Dasbor Admin / Admin Dashboard](#7-dasbor-admin--admin-dashboard)
8. [Internasionalisasi & SEO / i18n & SEO](#8-internasionalisasi--seo--i18n--seo)
9. [Concierge AI](#9-concierge-ai)
10. [Instalasi, Konfigurasi & Deployment](#10-instalasi-konfigurasi--deployment)
11. [QA & Pengujian / QA & Testing](#11-qa--pengujian--qa--testing)
12. [Worklog Detail / Detailed Worklog](#12-worklog-detail--detailed-worklog)
13. [CHANGELOG](#13-changelog)
14. [Roadmap](#14-roadmap)
15. [Kredit, Legal & Kontak / Credits, Legal & Contact](#15-kredit-legal--kontak--credits-legal--contact)

---

## 1. Identitas & Versi Aplikasi / App Identity & Versioning

### 🇮🇩 Bahasa Indonesia

| Properti | Nilai |
|----------|-------|
| **Nama aplikasi** | Elchí Studio Bali Website |
| **Nama paket** | `elchi-studio-bali-website` (lihat `package.json`) |
| **Versi saat ini** | **`v3.0.0`** — dirilis 15 November 2026 |
| **Skema penomoran** | [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH` |
| **Status** | Produksi (website resmi studio) |
| **Domain resmi** | `https://elchistudiobali.com` |
| **Pemilik brand** | PT. Elchi Studio Bali (sesuai dokumen NIB) |
| **Pengembang** | PT Top Konsultan Internasional |
| **Repo** | `github.com/gunaracorp/elchistudiobali` (branch `main`) |
| **Ukuran kode** | ± 13.317 baris TypeScript/TSX · 11 halaman · 12 endpoint API · 4 model database |

**Arti tiap versi mayor dalam proyek ini:**

- **v1.x — Fondasi & Desain.** Periode eksplorasi visual: scaffold framework, ekstraksi aset resmi dari dokumen klien (NIB + brosur), dan **7 iterasi desain** (v1 hero → v7 galeri) sampai tampilan final disetujui.
- **v2.x — Fungsionalitas Penuh.** Seluruh fitur inti: 11 halaman trilingual, CMS dasbor admin, Concierge AI, SEO 3 bahasa, paket dokumentasi & showcase.
- **v3.x — Data Resmi & Operasional.** Sinkronisasi data legal terkonfirmasi (alamat studio, email aktif), alat operasional dasbor (Publish + Download Excel), dan dokumentasi berstandar internasional (README dwibahasa ini).

### 🇬🇧 English

| Property | Value |
|----------|-------|
| **App name** | Elchí Studio Bali Website |
| **Package name** | `elchi-studio-bali-website` (see `package.json`) |
| **Current version** | **`v3.0.0`** — released 15 November 2026 |
| **Versioning scheme** | [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH` |
| **Status** | Production (the studio's official website) |
| **Official domain** | `https://elchistudiobali.com` |
| **Brand owner** | PT. Elchi Studio Bali (per NIB incorporation documents) |
| **Developer** | PT Top Konsultan Internasional |
| **Repository** | `github.com/gunaracorp/elchistudiobali` (branch `main`) |
| **Code size** | ± 13,317 lines of TypeScript/TSX · 11 pages · 12 API endpoints · 4 database models |

**What each major version means in this project:**

- **v1.x — Foundation & Design.** Visual exploration period: framework scaffold, extraction of official assets from client documents (NIB + brochure), and **7 design iterations** (v1 hero → v7 gallery) until the final look was approved.
- **v2.x — Full Functionality.** All core features: 11 trilingual pages, admin CMS dashboard, Concierge AI, trilingual SEO, documentation & showcase package.
- **v3.x — Official Data & Operations.** Synchronisation of confirmed legal data (studio address, active emails), dashboard operational tools (Publish + Download Excel), and international-standard documentation (this bilingual README).

---

## 2. Tentang Proyek / About the Project

### 🇮🇩 Bahasa Indonesia

**Elchí Studio Bali** adalah studio pendidikan kreatif di Bali yang memimpin kelas seni untuk wisatawan, grup, dan siapa pun yang ingin berkarya: *watercolour, sketching, needle felting, hingga craft* seperti Dog Keychain dan Custom Flip-Flop. Instruktornya, **Elin Kim**, memiliki 19 tahun pengalaman mengajar; menempuh pendidikan *art restoration* di **École de Condé Paris** dan *Fine Arts* di **ESADMM Marseille**; bersertifikasi needle felting (2022), fitness (2020), dan flower rice cakes (2018); mengajar dalam bahasa Inggris, Prancis, dan Korea; serta pernah mengadakan workshop untuk **Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento, dan Korean Cultural Centre Australia**. Studio sebelumnya milik Elin, *Elin's Classes*, mengumpulkan lebih dari **250 ulasan bintang lima**.

Tantangan bisnisnya klasik: bisnis berbasis kelas butuh **kehadiran digital yang meyakinkan dalam beberapa bahasa** (pengunjung Bali datang dari seluruh dunia), tetapi pemilik studio bukan teknisi. Solusinya adalah aplikasi yang dibangun di repositori ini — **website trilingual + CMS dasbor + Concierge AI dalam satu paket Next.js** — sehingga studio bisa:

1. Tampil profesional dalam **tiga bahasa sekaligus** (Indonesia, Inggris, Korea) tanpa halaman duplikat;
2. **Mengelola sendiri** booking, galeri, alamat, WhatsApp, email, dan jam operasional lewat dasbor `/admin` yang berbahasa Indonesia;
3. Menerima pertanyaan calon peserta **24/7 lewat Concierge AI** yang menjawab hanya dari fakta resmi;
4. Terindeks benar oleh mesin pencari internasional berkat metadata per-halaman-per-bahasa, `hreflang`, dan data terstruktur JSON-LD.

Semua konten berasal dari **dokumen resmi studio** (NIB, brosur kelas, profil Elin) — tidak ada harga, jadwal, atau alamat yang dikarang; detail yang belum dikonfirmasi selalu diarahkan ke konfirmasi personal via WhatsApp/booking.

### 🇬🇧 English

**Elchí Studio Bali** is a creative-education studio in Bali leading art classes for travellers, groups, and anyone who wants to make things: *watercolour, sketching, needle felting, and crafts* such as Dog Keychain and Custom Flip-Flop. Its instructor, **Elin Kim**, has 19 years of teaching experience; studied art restoration at **École de Condé Paris** and Fine Arts at **ESADMM Marseille**; is certified in needle felting (2022), fitness (2020) and flower rice cakes (2018); teaches in English, French and Korean; and has held workshops for **Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento and the Korean Cultural Centre Australia**. Elin's previous studio, *Elin's Classes*, earned over **250 five-star reviews**.

The business challenge is classic: class-based businesses need a **convincing multilingual digital presence** (Bali's visitors come from all over the world), yet studio owners are not engineers. The solution built in this repository is a **trilingual website + CMS dashboard + Concierge AI in one Next.js application**, so the studio can:

1. Present itself professionally in **three languages at once** (Indonesian, English, Korean) without duplicate pages;
2. **Manage everything itself** — bookings, gallery, address, WhatsApp, emails, opening hours — through the Indonesian-language `/admin` dashboard;
3. Answer prospective students **24/7 via the Concierge AI**, which replies only from official facts;
4. Get indexed correctly by international search engines thanks to per-page-per-language metadata, `hreflang`, and JSON-LD structured data.

All content derives from the **studio's official documents** (NIB, class brochure, Elin's profile) — no invented prices, schedules, or addresses; anything unconfirmed is always routed to personal confirmation via WhatsApp/booking.

---

## 3. Fitur Detail / Detailed Features

### 3.1 Halaman Publik / Public Pages

| Rute / Route | 🇮🇩 Isi & fitur | 🇬🇧 Content & features |
|--------------|-----------------|------------------------|
| `/` | Hero watercolour animasi + marquee kelas + kartu nilai studio + CTA booking; kursor kustom & efek magnetic | Animated watercolour hero + class marquee + value cards + booking CTA; custom cursor & magnetic effects |
| `/about` | Cerita studio, nilai pendidikan kreatif, foto studio | Studio story, creative-education values, studio photos |
| `/classes` | Grid 6 kelas unggulan dengan durasi & deskripsi resmi | Grid of 6 signature classes with official durations & descriptions |
| `/classes/[slug]` | Halaman detail dinamis per kelas (SEO metadata sendiri, JSON-LD kursus) | Dynamic detail page per class (own SEO metadata, course JSON-LD) |
| `/experiences` | Kelas grup privat (hingga 50 peserta — Elin pernah mengajar grup 50) & privat 1:1 90 menit | Private group classes (up to 50 participants — Elin has taught groups of 50) & private 1:1 90-minute sessions |
| `/elin` | Profil instruktur + 14 logo klien internasional (Pinterest, Bottega Veneta, dst.) | Instructor profile + 14 international client logos (Pinterest, Bottega Veneta, etc.) |
| `/gallery` | Galeri interaktif + lightbox; 8 foto bawaan dari brosur resmi, dikelola dari dasbor | Interactive gallery + lightbox; 8 default photos from the official brochure, dashboard-managed |
| `/booking` | Formulir booking (nama, email, kelas, tanggal pilihan, jumlah peserta, pesan) → tersimpan ke database → inbox dasbor; tanpa pembayaran di muka | Booking form (name, email, class, preferred date, participants, message) → saved to database → dashboard inbox; no upfront payment |
| `/faq` | FAQ trilingual dari pertanyaan nyata pengunjung | Trilingual FAQ from real visitor questions |
| `/contact` | Alamat, WhatsApp, email (×3), jam operasional, peta informasi | Address, WhatsApp, emails (×3), opening hours, info map |
| `/admin` | Dasbor studio (Bahasa Indonesia) — lihat bagian 7 | Studio dashboard (Bahasa Indonesia) — see section 7 |

### 3.2 Sistem & UX / Systems & UX

- 🇮🇩 **Pengalaman trilingual tanpa reload** — provider locale kustom (`locale-provider.tsx`), pemilih bahasa di navbar, parameter `?lang=` yang bisa dibagikan & diindeks.
- 🇮🇩 **WhatsApp terintegrasi tiga titik** — tombol melayang di semua halaman, kartu kontak footer, dan deep-link `wa.me` per pemesan di dasbor (nomor otomatis dinormalisasi ke format 62).
- 🇮🇩 **Animasi bermartabat** — Framer Motion: `Reveal` saat scroll, `Magnetic` pada tombol, marquee berjalan, transisi halaman; tetap menghormati `prefers-reduced-motion`.
- 🇮🇩 **Tipografi Korea asli** — font Noto Sans KR untuk aksen hangul, bukan fallback sistem.
- 🇮🇩 **Tema "watercolour Bali"** — palet krem/ros/ink dengan tekstur cat air; setiap ikon dari lucide-react (konsisten satu keluarga).
- 🇬🇧 **Reload-free trilingual experience** — custom locale provider, navbar language switcher, shareable & indexable `?lang=` parameter.
- 🇬🇧 **WhatsApp integrated at three touchpoints** — floating button on every page, footer contact card, and per-booking `wa.me` deep links in the dashboard (numbers normalised to the 62 format).
- 🇬🇧 **Dignified motion** — Framer Motion: scroll `Reveal`, `Magnetic` buttons, running marquee, page transitions; respects `prefers-reduced-motion`.
- 🇬🇧 **Native Korean typography** — Noto Sans KR for hangul accents, not system fallback.
- 🇬🇧 **"Watercolour Bali" theme** — cream/rose/ink palette with watercolour textures; all icons from lucide-react (one consistent family).

---

## 4. Arsitektur & Struktur Folder / Architecture & Folder Structure

### 🇮🇩 Bahasa Indonesia

Arsitektur **Next.js App Router** dengan komponen server untuk halaman (SEO + akses DB langsung) dan komponen klien untuk interaksi (dasbor, galeri, Concierge). Data pengaturan situs dibaca dari SQLite lewat Prisma; sesi admin dijaga middleware cookie bertanda tangan.

```
elchistudiobali/
├── prisma/
│   └── schema.prisma          # 4 model: Booking, AdminUser, SiteSetting, GalleryImage
├── db/
│   └── custom.db              # Database SQLite (runtime)
├── public/
│   └── images/                # 11 aset resmi: hero, 6 foto kelas, potret Elin, galeri, workshop
├── scripts/
│   ├── seed-admin.mjs         # Seed akun admin + pengaturan + 8 galeri bawaan
│   ├── update-settings.mjs    # Update pengaturan (alamat/email) langsung ke DB
│   ├── showcase_pdf.py        # Generator showcase PDF 17 halaman (ReportLab)
│   ├── capture-screenshots.sh # Screenshot otomatis desktop & ponsel (agent-browser)
│   └── rebuild-zip.sh         # Rebuild paket deliverable ZIP
├── src/
│   ├── app/
│   │   ├── page.tsx           # Beranda
│   │   ├── about|classes|classes/[slug]|experiences|elin|
│   │   │   gallery|booking|faq|contact/page.tsx   # 10 halaman publik
│   │   ├── admin/page.tsx     # Dasbor studio (client component, 3 tab)
│   │   ├── api/               # 12 endpoint (lihat bagian 6)
│   │   ├── layout.tsx         # Shell HTML + JSON-LD + font variabel
│   │   └── sitemap.ts         # Sitemap otomatis ×3 bahasa
│   ├── components/elchi/      # 24 komponen: hero, navbar, footer, galeri,
│   │                          #   concierge, booking, whatsapp, motion, dst.
│   └── lib/
│       ├── i18n/              # en.ts · id.ts · ko.ts · labels.ts · types.ts
│       ├── seo.ts             # PAGE_SEO (metadata ×3 bahasa), JSON-LD siteGraph, ROUTES
│       ├── auth.ts            # scrypt hash + sesi HMAC httpOnly
│       ├── site-settings.ts   # Pembaca SiteSetting (key-value)
│       ├── classes-data.ts    # Data 6 kelas resmi (bukan dari DB — statis & diaudit)
│       └── db.ts              # Singleton PrismaClient
└── download/                  # Deliverable: showcase PDF, HANDOVER, paket ZIP, screenshots
```

**Keputusan arsitektur penting:**

1. **Kelas statis, galeri dinamis.** Data 6 kelas disimpan sebagai kode (`classes-data.ts`) agar konten resmi tidak bisa rusak lewat UI; foto galeri justru dinamis dari DB agar studio bebas mengganti.
2. **Pengaturan = key-value.** `SiteSetting` berbentuk pasangan `key/value` (bukan kolom lebar) — menambah field baru tidak butuh migrasi skema.
3. **Email multi-nilai.** Kolom email mendukung beberapa alamat dipisah koma; footer merendernya sebagai daftar tautan `mailto`.
4. **Admin satu file.** Seluruh dasbor (`admin/page.tsx`) adalah satu client component dengan 3 tab — sederhana, cepat, mudah diwariskan.

### 🇬🇧 English

**Next.js App Router architecture** with server components for pages (SEO + direct DB access) and client components for interactions (dashboard, gallery, Concierge). Site settings are read from SQLite via Prisma; admin sessions are guarded by a signed-cookie middleware.

```
elchistudiobali/
├── prisma/schema.prisma       # 4 models: Booking, AdminUser, SiteSetting, GalleryImage
├── db/custom.db               # SQLite database (runtime)
├── public/images/             # 11 official assets: hero, 6 class photos, Elin portrait, gallery, workshop
├── scripts/                   # seed, settings updater, PDF generator, screenshot capture, ZIP rebuild
├── src/
│   ├── app/                   # home + 10 public pages + /admin + 12 API endpoints + sitemap
│   ├── components/elchi/      # 24 components: hero, navbar, footer, gallery, concierge, ...
│   └── lib/                   # i18n (en/id/ko), seo.ts, auth.ts, site-settings.ts, classes-data.ts, db.ts
└── download/                  # Deliverables: showcase PDF, HANDOVER, ZIP package, screenshots
```

**Key architectural decisions:**

1. **Static classes, dynamic gallery.** The 6 class descriptions live in code (`classes-data.ts`) so official content cannot be broken through the UI; gallery photos are dynamic DB rows so the studio can swap them freely.
2. **Settings are key-value.** `SiteSetting` stores `key/value` pairs (no wide columns) — new fields need no schema migration.
3. **Multi-value emails.** The email field supports several addresses separated by commas; the footer renders them as a list of `mailto` links.
4. **Single-file dashboard.** The whole dashboard (`admin/page.tsx`) is one client component with 3 tabs — simple, fast, easy to hand over.

---

## 5. Basis Data / Database Schema

### 🇮🇩 Bahasa Indonesia

Empat model Prisma pada SQLite (`db/custom.db`):

```
Booking       AdminUser        SiteSetting          GalleryImage
──────────    ───────────      ─────────────        ────────────
id (cuid)     id (cuid)        key  (@id)           id (cuid)
name          email (@unique)  value                src
email         passwordHash     updatedAt            caption
phone         createdAt                             sortOrder
classType     updatedAt                             createdAt
participants
preferredDate
message
status
createdAt
```

- **Booking** — setiap kiriman formulir booking; `status` default `new` (dasbor menampilkan badge "NEW"); waktu disimpan UTC dan ditampilkan **WITA (Asia/Makassar)** di dasbor.
- **AdminUser** — satu akun admin; password = `salt:hash` dengan **scrypt 64-byte** (`node:crypto.scryptSync`); email unik.
- **SiteSetting** — 5 kunci publik: `studio_address`, `studio_whatsapp`, `studio_email` (bisa beberapa, dipisah koma), `studio_hours`, `instagram_url`.
- **GalleryImage** — urutan tampil dikontrol `sortOrder` (drag & drop @dnd-kit di dasbor); jika daftar dikosongkan, situs memakai 8 foto bawaan.

### 🇬🇧 English

Four Prisma models on SQLite (`db/custom.db`):

- **Booking** — every booking form submission; `status` defaults to `new` (the dashboard shows a "NEW" badge); stored in UTC, displayed in **WITA (Asia/Makassar)** time in the dashboard.
- **AdminUser** — a single admin account; password stored as `salt:hash` using **64-byte scrypt** (`node:crypto.scryptSync`); unique email.
- **SiteSetting** — 5 public keys: `studio_address`, `studio_whatsapp`, `studio_email` (supports several, comma-separated), `studio_hours`, `instagram_url`.
- **GalleryImage** — display order controlled by `sortOrder` (@dnd-kit drag & drop in the dashboard); when the list is emptied, the site falls back to 8 default photos.

---

## 6. API Reference

12 endpoint di `src/app/api/`. Semua endpoint admin memeriksa sesi cookie bertanda tangan — tanpa sesi valid → `401`.

| Endpoint | Metode | Auth | 🇮🇩 Fungsi | 🇬🇧 Function |
|----------|--------|------|------------|--------------|
| `/api` | GET | publik | Health check / info | Health check / info |
| `/api/bookings` | POST | publik | Terima kiriman formulir booking (validasi zod) | Accept booking form submissions (zod validation) |
| `/api/gallery` | GET | publik | Daftar foto galeri terurut | Ordered gallery list |
| `/api/settings` | GET | publik | 5 kunci pengaturan publik (footer, WA, kontak) | 5 public setting keys (footer, WA, contact) |
| `/api/concierge` | POST | publik | Chat Concierge AI (riwayat ≤ 8 pesan + locale) | Concierge AI chat (last ≤ 8 messages + locale) |
| `/api/admin/login` | POST | — | Login email+password → set cookie sesi | Email+password login → sets session cookie |
| `/api/admin/logout` | POST | sesi | Hapus sesi | Destroy session |
| `/api/admin/me` | GET | sesi | Identitas sesi aktif | Current session identity |
| `/api/admin/bookings` | GET | sesi | Daftar semua booking (inbox dasbor) | All bookings (dashboard inbox) |
| `/api/admin/gallery` | GET/POST/PUT/DELETE | sesi | CRUD galeri + reorder (`sortOrder`) | Gallery CRUD + reorder (`sortOrder`) |
| `/api/admin/settings` | GET/PUT | sesi | Baca & simpan pengaturan situs | Read & save site settings |
| `/api/admin/password` | POST | sesi | Ganti password admin (verifikasi password lama, min. 8) | Change admin password (verifies old, min. 8 chars) |

**Format Download Excel:** CSV dengan **BOM UTF-8** + pemisah `;` agar langsung rapi dibuka di Excel regional Indonesia; kolom: `createdAt;name;email;phone;classType;participants;preferredDate;status;message`. Ekspor dibangun di sisi klien dari data `/api/admin/bookings` — tidak butuh endpoint tambahan.
**Download Excel format:** CSV with **UTF-8 BOM** + `;` separator so it opens cleanly in Indonesian-locale Excel; columns: `createdAt;name;email;phone;classType;participants;preferredDate;status;message`. Export is built client-side from `/api/admin/bookings` data — no extra endpoint needed.

---

## 7. Dasbor Admin / Admin Dashboard

### 🇮🇩 Bahasa Indonesia (`/admin`)

Antarmuka penuh **Bahasa Indonesia** — dirancang agar pemilik studio langsung paham tanpa pelatihan. Tiga tab:

1. **Booking Masuk** — kartu per pemesan: nama + badge status (`NEW`), kelas & jumlah peserta, tanggal pilihan, email/telepon, kutipan pesan, waktu WITA, dan tombol **"Hubungi via WhatsApp"** yang membuka chat dengan nomor pemesan (otomatis format 62). Tombol **Segarkan** memuat ulang inbox.
2. **Galeri** — tambah foto lewat **unggah dari perangkat (≤ 6 MB)** atau URL gambar; edit keterangan per foto; urutkan naik/turun; hapus. Perubahan langsung tampil di galeri situs; jika seluruh daftar dikosongkan, situs kembali memakai 8 foto brosur bawaan.
3. **Pengaturan** — Alamat Studio, Nomor WhatsApp, **Email Studio (beberapa alamat, pisahkan dengan koma)**, Jam Operasional, URL Instagram. Dua tombol aksi:
   - **Publish** (merah) — menyimpan pengaturan; perubahan langsung tayang di footer & tombol WhatsApp situs.
   - **Download Excel** (putih, di sebelah Publish) — mengekspor **seluruh booking** ke CSV siap-Excel dan langsung mengunduhnya; setelah klik muncul status *"Excel diunduh ✓ (N booking)"*.
   
   Ditambah panel **Ganti Password Admin** (password saat ini + baru min. 8 karakter + konfirmasi).

**Alur keamanan:** login di `/admin` (email + password) → server memverifikasi scrypt → cookie `httpOnly` HMAC berumur 7 hari → setiap panggilan `/api/admin/*` memverifikasi tanda tangan cookie. **Keluar** menghapus sesi.

### 🇬🇧 English (`/admin`)

A fully **Bahasa Indonesia** interface — designed so the studio owner understands it without training. Three tabs:

1. **Booking Masuk (Booking Inbox)** — one card per booking: name + status badge (`NEW`), class & participants, preferred date, email/phone, quoted message, WITA timestamp, and a **"Hubungi via WhatsApp"** button opening a chat with the guest's number (auto-normalised to the 62 format). A **Refresh** button reloads the inbox.
2. **Galeri (Gallery)** — add photos via **device upload (≤ 6 MB)** or image URL; edit captions; reorder up/down; delete. Changes appear on the live site instantly; if the list is emptied, the site falls back to the 8 default brochure photos.
3. **Pengaturan (Settings)** — Studio Address, WhatsApp Number, **Studio Email (multiple addresses, comma-separated)**, Opening Hours, Instagram URL. Two action buttons:
   - **Publish** (rose) — saves settings; changes go live on the site's footer & WhatsApp links immediately.
   - **Download Excel** (white, next to Publish) — exports **all bookings** to an Excel-ready CSV and downloads it immediately; after clicking, a status shows *"Excel diunduh ✓ (N booking)"* ("Excel downloaded ✓").
   
   Plus an **Change Admin Password** panel (current password + new min. 8 chars + confirmation).

**Security flow:** login at `/admin` (email + password) → server verifies scrypt → 7-day `httpOnly` HMAC cookie → every `/api/admin/*` call verifies the cookie signature. **Keluar (Logout)** destroys the session.

---

## 8. Internasionalisasi & SEO / i18n & SEO

### 🇮🇩 Bahasa Indonesia

**Mekanisme bahasa.** Tiga locale penuh — `en`, `id`, `ko` — didefinisikan di `src/lib/i18n/` (`en.ts`, `id.ts`, `ko.ts` + `labels.ts`, `types.ts`). `DEFAULT_LOCALE = "en"` — **kunjungan pertama default berbahasa Inggris** (standar internasional); bahasa aktif dipilih lewat parameter URL `?lang=` dan dapat ditimpa preferensi tersimpan di peramban, dikelola `locale-provider.tsx`, diganti lewat pemilih bahasa di navbar. **Tidak ada halaman duplikat** — satu komponen merender tiga bahasa.

**SEO per halaman per bahasa.** `src/lib/seo.ts` menyimpan `PAGE_SEO` (judul + deskripsi + breadcrumb untuk 10 rute × 3 bahasa), `buildMetadata()` menghasilkan title/description + canonical + `alternates.languages` (**hreflang ×3** untuk setiap halaman) + OpenGraph dengan locale yang sesuai (`id_ID`, `en_US`, `ko_KR`).

**Data terstruktur JSON-LD.** `siteGraph()` menyusun `@graph` berisi:
- `EducationalOrganization` Elchí Studio Bali — alamat resmi `Gg. Puji No. 9B, Tibubeneng, Kuta Utara, 80361` (PostalAddress), **3 contactPoint email aktif**, telepon, bahasa yang dikuasai, founder Elin Kim;
- `WebSite` + `BreadcrumbList` per halaman;
- atribusi konsultan (backend, tidak tampil di permukaan UI).

**Sitemap.** `src/app/sitemap.ts` menghasilkan URL semua rute × 3 bahasa otomatis.

**Menambah bahasa baru (mis. Prancis):** tambah `fr.ts` di `src/lib/i18n/`, daftarkan di `index.ts` + `LOCALES` di `seo.ts`, tambahkan blok `fr` di `PAGE_SEO`, dan tambah opsi di `language-switcher.tsx` — tidak ada perubahan halaman.

### 🇬🇧 English

**Language mechanism.** Three full locales — `en`, `id`, `ko` — defined in `src/lib/i18n/` (`en.ts`, `id.ts`, `ko.ts` + `labels.ts`, `types.ts`). `DEFAULT_LOCALE = "en"` — **first visits default to English** (international standard); the active language comes from the `?lang=` URL parameter and can be overridden by the browser-saved preference, managed by `locale-provider.tsx`, switched via the navbar language picker. **No duplicate pages** — one component renders all three languages.

**Per-page per-language SEO.** `src/lib/seo.ts` stores `PAGE_SEO` (title + description + breadcrumb for 10 routes × 3 languages); `buildMetadata()` produces title/description + canonical + `alternates.languages` (**hreflang ×3** per page) + OpenGraph with matching locales (`id_ID`, `en_US`, `ko_KR`).

**JSON-LD structured data.** `siteGraph()` builds an `@graph` containing:
- the Elchí Studio Bali `EducationalOrganization` — official address `Gg. Puji No. 9B, Tibubeneng, Kuta Utara, 80361` (PostalAddress), **3 active email contactPoints**, telephone, languages spoken, founder Elin Kim;
- `WebSite` + per-page `BreadcrumbList`;
- consultant attribution (backend-only, not shown on the UI surface).

**Sitemap.** `src/app/sitemap.ts` generates every route × 3 languages automatically.

**Adding a new language (e.g. French):** add `fr.ts` in `src/lib/i18n/`, register it in `index.ts` + `LOCALES` in `seo.ts`, add an `fr` block to `PAGE_SEO`, and add an option in `language-switcher.tsx` — no page changes required.

---

## 9. Concierge AI

### 🇮🇩 Bahasa Indonesia

Asisten chat di sudut situs (komponen `concierge.tsx` → `POST /api/concierge` → **Z-AI GLM** via `z-ai-web-dev-sdk`). Perancangannya ketat supaya asisten tidak pernah berbohong:

- **Knowledge base hanya fakta resmi**: daftar 6 kelas + durasi resmi, pengalaman privat, profil Elin, alur booking, lokasi studio (`Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361`) dan 3 email aktif.
- **Aturan jawaban**: hanya menjawab dari informasi di atas; jika ditanya harga/jadwal persis, jawab hangat bahwa studio mengonfirmasi pribadi lewat formulir booking; jawaban 2–5 kalimat.
- **Aturan bahasa per locale**: pengunjung di versi Indonesia **pasti** dijawab dalam Bahasa Indonesia; versi Korea dijawab dalam Korea santai-formal (해요체/합니다체); versi Inggris dalam Inggris — kecuali pengunjung menulis dalam bahasa lain, ikuti bahasa pengunjung.
- **Konteks**: 8 pesan terakhir dikirim sebagai riwayat percakapan (ringan & murah).

### 🇬🇧 English

A chat assistant in the site corner (`concierge.tsx` → `POST /api/concierge` → **Z-AI GLM** via `z-ai-web-dev-sdk`). Its design is strict so the assistant can never lie:

- **Knowledge base = official facts only**: the 6 classes + official durations, private experiences, Elin's profile, the booking flow, the studio location (`Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361`) and the 3 active emails.
- **Answer rules**: reply only from the information above; for exact prices/schedules, warmly explain the studio confirms details personally via the booking form; 2–5 sentence answers.
- **Per-locale language rules**: visitors on the Indonesian version are **always** answered in Bahasa Indonesia; the Korean version answers in polite-casual Korean (해요체/합니다체); the English version in English — unless the visitor writes in another language, then follow the visitor.
- **Context**: the last 8 messages are sent as conversation history (light and cheap).

---

## 10. Instalasi, Konfigurasi & Deployment

### 🇮🇩 Bahasa Indonesia

**Prasyarat:** Node.js ≥ 20 (atau Bun) · npm/bun.

```bash
npm install                 # 1. instal dependensi
npm run db:push             # 2. buat skema SQLite (prisma db push)
node scripts/seed-admin.mjs # 3. seed admin + pengaturan + 8 galeri bawaan
npm run dev                 # 4. pengembangan → http://localhost:3000
npm run build && npm start  # 5. produksi (output standalone Next.js)
```

**Variabel lingkungan:**

| Variabel | Wajib? | Isi |
|----------|--------|-----|
| `DATABASE_URL` | ✅ | `file:./db/custom.db` (SQLite) |
| `NEXT_PUBLIC_SITE_URL` | opsional | default `https://elchistudiobali.com` |
| `ADMIN_EMAIL` | opsional | override email saat seed (default email resmi NIB) |
| `ADMIN_PASSWORD` | opsional | override password saat seed (default: acak, dicetak sekali) |

**Skrip npm:** `dev` (port 3000 + log), `build` (standalone + salin static & public), `start` (jalankan standalone), `lint`, `db:push`, `db:studio` (inspeksi DB visual).

**Catatan operasional:** ganti password admin pada login pertama (Pengaturan → Ganti Password Admin); alamat/WhatsApp/email/jam bisa diubah kapan saja dari dasbor tanpa deploy ulang; cadangkan `db/custom.db` secara berkala (seluruh data booking ada di satu file ini).

### 🇬🇧 English

**Prerequisites:** Node.js ≥ 20 (or Bun) · npm/bun.

```bash
npm install                 # 1. install dependencies
npm run db:push             # 2. create the SQLite schema (prisma db push)
node scripts/seed-admin.mjs # 3. seed admin + settings + 8 default gallery photos
npm run dev                 # 4. development → http://localhost:3000
npm run build && npm start  # 5. production (Next.js standalone output)
```

**Environment variables:**

| Variable | Required | Value |
|----------|----------|-------|
| `DATABASE_URL` | ✅ | `file:./db/custom.db` (SQLite) |
| `NEXT_PUBLIC_SITE_URL` | optional | default `https://elchistudiobali.com` |
| `ADMIN_EMAIL` | optional | override seed email (default: official NIB email) |
| `ADMIN_PASSWORD` | optional | override seed password (default: random, printed once) |

**npm scripts:** `dev` (port 3000 + log), `build` (standalone + copy static & public), `start` (run standalone), `lint`, `db:push`, `db:studio` (visual DB inspector).

**Operational notes:** change the admin password on first login (Settings → Change Admin Password); address/WhatsApp/email/hours can be changed anytime from the dashboard without redeploying; back up `db/custom.db` regularly (all booking data lives in this single file).

---

## 11. QA & Pengujian / QA & Testing

### 🇮🇩 Bahasa Indonesia

Semua pengujian berikut dilakukan langsung pada aplikasi berjalan dan **lulus**:

| # | Pengujian | Metode | Hasil |
|---|-----------|--------|-------|
| 1 | Typecheck `src/` | `tsc --noEmit` | ✅ bersih (0 error di kode aplikasi) |
| 2 | JSON-LD alamat & email | curl beranda + parsing `@graph` | ✅ alamat `Gg. Puji No. 9B, Tibubeneng` + 3 `contactPoint` email |
| 3 | Footer menampilkan 3 email | Screenshot halaman live | ✅ ketiga email tampil berjajar di kartu Email |
| 4 | Tombol **Publish** | Klik browser (agent-browser) | ✅ pengaturan tersimpan, footer diperbarui |
| 5 | Tombol **Download Excel** | Klik browser + inspeksi unduhan | ✅ status `Excel diunduh ✓ (2 booking)`; file CSV valid (BOM, 9 kolom, 2 baris data) |
| 6 | Login admin + sesi | Browser: login → dasbor → keluar | ✅ sesi aktif, logout membersihkan sesi |
| 7 | Ganti password | Alur API admin (verifikasi password lama) | ✅ berfungsi; hash scrypt tersimpan |
| 8 | Sitemap & hreflang | curl `/sitemap.xml` + header `<link>` | ✅ 3 bahasa × semua rute |
| 9 | Concierge multi-bahasa | Kirim pertanyaan ID/EN/KO | ✅ jawaban mengikuti bahasa pengunjung |
| 10 | Showcase PDF | Render 17 halaman → inspeksi visual | ✅ tanpa overflow, alamat & email baru di halaman kontak |
| 11 | Tampilan ponsel | Viewport 390×844 | ✅ hero, menu, kelas, footer responsif |

### 🇬🇧 English

All tests below were run against the live application and **passed**:

| # | Test | Method | Result |
|---|------|--------|--------|
| 1 | `src/` typecheck | `tsc --noEmit` | ✅ clean (0 errors in app code) |
| 2 | JSON-LD address & emails | curl homepage + parse `@graph` | ✅ address `Gg. Puji No. 9B, Tibubeneng` + 3 email `contactPoint`s |
| 3 | Footer renders 3 emails | Live-page screenshot | ✅ all three emails listed in the Email card |
| 4 | **Publish** button | Browser click (agent-browser) | ✅ settings saved, footer updated |
| 5 | **Download Excel** button | Browser click + download inspection | ✅ status `Excel diunduh ✓ (2 booking)`; valid CSV (BOM, 9 columns, 2 data rows) |
| 6 | Admin login + session | Browser: login → dashboard → logout | ✅ session active, logout clears session |
| 7 | Password change | Admin API flow (verifies old password) | ✅ works; scrypt hash stored |
| 8 | Sitemap & hreflang | curl `/sitemap.xml` + `<link>` headers | ✅ 3 languages × all routes |
| 9 | Concierge multilingual | Sent ID/EN/KO questions | ✅ replies follow the visitor's language |
| 10 | Showcase PDF | Rendered 17 pages → visual inspection | ✅ no overflow; new address & emails on the contact page |
| 11 | Mobile view | 390×844 viewport | ✅ responsive hero, menu, classes, footer |

---

## 12. Worklog Detail / Detailed Worklog

### 🇮🇩 Bahasa Indonesia — Riwayat kerja berstandar internasional

> Sumber: riwayat commit Git (`main`), artefak iterasi desain (`scripts/v*-*.png`), dan catatan sesi. 9 commit · 3 hari kerja efektif.

**FASE 0 — Inisiasi (13 November 2026)**
- `20:13` — **Initial commit.** Scaffold aplikasi: Next.js 16 App Router + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Prisma 6 (SQLite) di workspace.
- `21:03` — **Ekstraksi aset resmi.** Membaca dokumen resmi klien (NIB PT. Elchi Studio Bali + brosur kelas) dan mengekstrak 11 aset ke `public/images/`: hero watercolour, 6 foto kelas (Travel Drawing, Dog Keychain, Postcards, Custom Flip-Flop, Custom T-shirt, Creative Flow), potret Elin, foto studio & workshop. Menyusun data kelas resmi (`classes-data.ts`).

**FASE 1 — Eksplorasi desain, iterasi v1–v7 (14–15 November 2026, sesi malam)**
- **v1 — Hero** (`v-hero.png`): konsep pertama hero watercolour + tipografi display.
- **v2 — Hero + About** (`v2-hero`, `v2-about`): marquee kelas, kartu nilai, penyesuaian palet krem/ros/ink.
- **v3 — Kelas** (`v3-hero`, `v3-classes`): grid 6 kelas unggulan + hierarki tipografi.
- **v4 — Elin & Experiences** (`v4-elin`, `v4-exp`, `v4-gallery`): profil instruktur + strip logo klien + draf galeri.
- **v5 — Booking & Admin** (`v5-booking`, `v5-admin`, `v5-elin`, `v5-success`): formulir booking + layar sukses + konsep dasbor admin.
- **v6 — Concierge, FAQ, Mobile** (`v6-concierge`, `v6-faq`, `v6-mobile-hero`, `v6-mobile-menu`): asisten AI, FAQ, dan audit tampilan ponsel.
- **v7 — Galeri final** (`v7-gallery`): galeri interaktif + lightbox. Tampilan final disetujui → masuk fase fungsional.
- `2026-11-15 00:52` — **Commit build malam.** Seluruh iterasi v2–v6 stabil di `main`.
- `2026-11-15 01:24` — **Commit fungsional v7.** Galeri final + booking + seed CMS.

**FASE 2 — Trilingual, CMS & AI (15 November 2026, sesi siang)**
- Sistem i18n penuh (`src/lib/i18n/`: `id.ts`, `en.ts`, `ko.ts`) — satu komponen, tiga bahasa, tanpa halaman duplikat; pemilih bahasa navbar + `?lang=` shareable.
- SEO 3 bahasa: `PAGE_SEO` (10 rute × 3 bahasa), `buildMetadata()` dengan canonical + hreflang ×3 + OpenGraph locale; `sitemap.ts` otomatis; JSON-LD `siteGraph()`.
- **Dasbor admin ala WordPress** (`/admin`): login scrypt + cookie HMAC httpOnly 7 hari; tab Booking Masuk (badge NEW, waktu WITA, WhatsApp deep-link), tab Galeri (unggah ≤ 6 MB, drag & drop @dnd-kit, keterangan), tab Pengaturan + Ganti Password.
- **Concierge AI**: sistem prompt berbasis fakta resmi + aturan bahasa per locale (ID/EN/KO).
- `13:21` — **Commit QA & penyempurnaan.**
- `14:23` — **Deliverable klien.** Showcase PDF 17 halaman (cover, 10 tampilan desktop, 3 ponsel, 2 dasbor, ringkasan) + paket `Elchi-Website-Paket.zip`.
- `17:38` — **Commit dokumentasi.** HANDOVER dwibahasa, footer CMS, pengayaan JSON-LD, sitemap final.

**FASE 3 — Data resmi & operasional — rilis v3.0.0 (15 November 2026, sesi malam)**
- **Alamat resmi confirmed** dari pemilik studio: `Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia` — alamat sementara "BTS Business Park" **dihapus dari semua titik** (SEO kontak ×3 bahasa, JSON-LD PostalAddress, seed script, database live, concierge, HANDOVER, showcase PDF).
- **Koreksi email + 3 email aktif**: typo `elchie→elchi` diperbaiki; footer kini merender **3 email aktif** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) dari pengaturan (dipisah koma); JSON-LD memuat 3 `contactPoint`; kolom Email di dasbor mendukung multi-alamat.
- **Tombol Publish & Download Excel**: tombol simpan Pengaturan diubah menjadi **Publish**; tombol **Download Excel** ditambahkan di sebelahnya — ekspor seluruh booking ke CSV (BOM UTF-8, pemisah `;`, nama file bertanggal) langsung dari dasbor.
- **Uji penerimaan di browser**: login admin → tab Pengaturan → klik Download Excel → status `Excel diunduh ✓ (2 booking)` + file CSV valid terunduh; password admin asli dijaga (uji memakai password sementara, lalu hash asli dipulihkan).
- `20:04` — **Commit rilis v3.0.0** (42 file berubah) → `20:05` **push ke GitHub** `gunaracorp/elchistudiobali` (`main`).
- **Dokumentasi internasional**: README.md (Bahasa Indonesia) + README-FULL.md (dwibahasa ID+EN — dokumen ini) dengan worklog, API reference, arsitektur, dan CHANGELOG.

### 🇬🇧 English — International-standard work history

> Sources: Git commit history (`main`), design iteration artifacts (`scripts/v*-*.png`), and session notes. 9 commits · 3 effective working days.

**PHASE 0 — Initiation (13 November 2026)**
- `20:13` — **Initial commit.** App scaffold: Next.js 16 App Router + React 19 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Prisma 6 (SQLite).
- `21:03` — **Official asset extraction.** Read the client's official documents (PT. Elchi Studio Bali NIB + class brochure) and extracted 11 assets into `public/images/`: watercolour hero, 6 class photos, Elin's portrait, studio & workshop shots. Compiled the official class dataset (`classes-data.ts`).

**PHASE 1 — Design exploration, iterations v1–v7 (14–15 November 2026, evening session)**
- **v1 — Hero:** first watercolour hero concept + display typography.
- **v2 — Hero + About:** class marquee, value cards, cream/rose/ink palette tuning.
- **v3 — Classes:** 6-class grid + typographic hierarchy.
- **v4 — Elin & Experiences:** instructor profile + client-logo strip + gallery draft.
- **v5 — Booking & Admin:** booking form + success screen + admin dashboard concept.
- **v6 — Concierge, FAQ, Mobile:** AI assistant, FAQ, and mobile-layout audit.
- **v7 — Final gallery:** interactive gallery + lightbox. Final look approved → functionality phase.
- `2026-11-15 00:52` — **Night-build commit.** Iterations v2–v6 stable on `main`.
- `2026-11-15 01:24` — **v7 functional commit.** Final gallery + booking + CMS seed.

**PHASE 2 — Trilingual, CMS & AI (15 November 2026, day session)**
- Full i18n system — one component, three languages, no duplicate pages; navbar switcher + shareable `?lang=`.
- Trilingual SEO: `PAGE_SEO` (10 routes × 3 languages), `buildMetadata()` with canonical + hreflang ×3 + locale-correct OpenGraph; automatic `sitemap.ts`; JSON-LD `siteGraph()`.
- **WordPress-style admin dashboard** (`/admin`): scrypt login + 7-day httpOnly HMAC cookie; Booking inbox (NEW badges, WITA times, WhatsApp deep links), Gallery tab (≤ 6 MB uploads, @dnd-kit reorder, captions), Settings + password change.
- **Concierge AI**: official-facts-only system prompt + per-locale language rules (ID/EN/KO).
- `13:21` — **QA & polish commit.**
- `14:23` — **Client deliverables.** 17-page showcase PDF + `Elchi-Website-Paket.zip`.
- `17:38` — **Documentation commit.** Bilingual HANDOVER, CMS footer, enriched JSON-LD, final sitemap.

**PHASE 3 — Official data & operations — v3.0.0 release (15 November 2026, evening session)**
- **Confirmed official address** from the studio owner: `Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia` — the temporary "BTS Business Park" address was **removed from every touchpoint** (trilingual contact SEO, JSON-LD PostalAddress, seed script, live database, concierge, HANDOVER, showcase PDF).
- **Email correction + 3 active emails**: the `elchie→elchi` typo fixed; the footer now renders **3 active emails** (`ptelchistudiobali@gmail.com`, `elchistudio@gmail.com`, `info@elchistudio.com`) from settings (comma-separated); JSON-LD carries 3 `contactPoint`s; the dashboard Email field supports multiple addresses.
- **Publish & Download Excel buttons**: the Settings save button became **Publish**; a **Download Excel** button was added beside it — exports all bookings to CSV (UTF-8 BOM, `;` separator, dated filename) straight from the dashboard.
- **Browser acceptance test**: admin login → Settings tab → click Download Excel → status `Excel diunduh ✓ (2 booking)` + valid CSV downloaded; the owner's real password untouched (temporary password used for testing, then the original hash restored).
- `20:04` — **v3.0.0 release commit** (42 files changed) → `20:05` **pushed to GitHub** `gunaracorp/elchistudiobali` (`main`).
- **International documentation**: README.md (Bahasa Indonesia) + README-FULL.md (this bilingual ID+EN document) with worklog, API reference, architecture, and CHANGELOG.

---

## 13. CHANGELOG

### v3.0.0 — 15 November 2026 🌺
**🇮🇩** Data resmi & operasional: alamat confirmed `Gg. Puji No. 9B, Tibubeneng` (BTS Business Park dihapus dari semua titik); 3 email aktif di footer + JSON-LD (typo `elchie` dikoreksi); tombol **Publish** + **Download Excel** (CSV siap-Excel) di dasbor; README internasional (ID + EN); push ke GitHub.
**🇬🇧** Official data & operations: confirmed address `Gg. Puji No. 9B, Tibubeneng` (BTS Business Park removed everywhere); 3 active emails in footer + JSON-LD (`elchie` typo fixed); **Publish** + **Download Excel** (Excel-ready CSV) dashboard buttons; international README (ID + EN); pushed to GitHub.

### v2.0.0 — 15 November 2026
**🇮🇩** Trilingual penuh (ID/EN/KO) di 11 halaman; dasbor admin ala WordPress (booking, galeri, pengaturan, ganti password); Concierge AI berbasis fakta resmi; SEO per-halaman-per-bahasa + JSON-LD + sitemap; WhatsApp terintegrasi; showcase PDF + paket ZIP.
**🇬🇧** Full trilingual (ID/EN/KO) across 11 pages; WordPress-style admin dashboard (bookings, gallery, settings, password change); facts-only Concierge AI; per-page-per-language SEO + JSON-LD + sitemap; integrated WhatsApp; showcase PDF + ZIP package.

### v1.0.0 — 13 November 2026
**🇮🇩** Fondasi: scaffold Next.js 16 + ekstraksi aset resmi (NIB & brosur) + 7 iterasi desain (v1 hero → v7 galeri) sampai tampilan final.
**🇬🇧** Foundation: Next.js 16 scaffold + official asset extraction (NIB & brochure) + 7 design iterations (v1 hero → v7 gallery) to final look.

---

## 14. Roadmap

> 🇮🇩 Rencana, bukan janji — urutan bisa berubah mengikuti kebutuhan studio. / 🇬🇧 Plans, not promises — order may follow the studio's needs.

- **v3.1** 🇮🇩 Unduh Excel langsung dari tab Booking Masuk (bukan hanya Pengaturan) + filter tanggal. 🇬🇧 Excel download straight from the Booking tab (not only Settings) + date filters.
- **v3.2** 🇮🇩 Status booking bisa diubah di dasbor (new → confirmed → done). 🇬🇧 Editable booking statuses in the dashboard (new → confirmed → done).
- **v4.0** 🇮🇩 Notifikasi email otomatis saat booking masuk + galeri multi-halaman. 🇬🇧 Automatic email notifications on new bookings + paginated gallery.
- **v4.x** 🇮🇩 Bahasa keempat (Prancis) — kerangka i18n sudah siap. 🇬🇧 A fourth language (French) — the i18n framework is ready.

---

## 15. Kredit, Legal & Kontak / Credits, Legal & Contact

| Peran / Role | 🇮🇩 / 🇬🇧 |
|--------------|-----------|
| Studio & pemilik brand / Brand owner | **PT. Elchi Studio Bali** — Elin Kim (Founder & Lead Instructor) |
| Desain, pengembangan & konsultasi / Design, development & consulting | **PT Top Konsultan Internasional** — Gugun Gunara *(Master Polymath · Sage Universal · The Ultimate Problem Solver)* |
| Aset & konten sumber / Source assets & content | Dokumen NIB & brosur resmi studio / The studio's NIB documents & official brochure |
| Infrastruktur AI / AI infrastructure | Z-AI GLM (`z-ai-web-dev-sdk`) |

**🇮🇩 Hak cipta:** seluruh konten, merek, dan foto adalah milik PT. Elchi Studio Bali. Dokumen ini untuk keperluan internal studio & pengembang. Kredensial admin tidak pernah disimpan dalam repositori atau paket distribusi.
**🇬🇧 Copyright:** all content, brands, and photos belong to PT. Elchi Studio Bali. This document serves the studio's & developer's internal needs. Admin credentials are never stored in the repository or distribution packages.

<div align="center">

### 📍 PT. Elchi Studio Bali

**Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia**
📧 `ptelchistudiobali@gmail.com` · `elchistudio@gmail.com` · `info@elchistudio.com`
📱 WhatsApp **+62 823-3957-0355** · 🌐 [elchistudiobali.com](https://elchistudiobali.com)

**© 2026 PT. Elchi Studio Bali · v3.0.0 · Dibangun dengan Next.js 16 / Built with Next.js 16** 🌺

</div>



