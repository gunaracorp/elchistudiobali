<div align="center">

# 🎨 Elchí Studio Bali

### Website Resmi & Dasbor Studio — Trilingual (🇮🇩 Indonesia · 🇬🇧 English · 🇰🇷 한국어)

**Website kelas seni & workshop kreatif di Bali dengan CMS dasbor ala WordPress, booking langsung, dan Concierge AI — dibangun dengan standar internasional.**

![Version](https://img.shields.io/badge/versi-3.0.0-E75A87?style=for-the-badge&logo=semanticweb&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

**Status produksi** · 11 halaman publik · 12 API endpoint · 3 bahasa penuh · 13.000+ baris kode

</div>

---

## 📖 Tentang Proyek

Website resmi **PT. Elchi Studio Bali** — studio pendidikan kreatif di Bali yang dipimpin **Elin Kim** (19 tahun pengalaman mengajar; lulusan École de Condé Paris & ESADMM Marseille; pernah mengajar untuk Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento, dan Korean Cultural Centre Australia).

Sistem ini bukan sekadar landing page: ini adalah **website + CMS + asisten AI** dalam satu aplikasi Next.js yang memungkinkan studio mengelola seluruh kontennya sendiri — seperti WordPress, tapi lebih cepat, trilingual penuh, dan tanpa plugin berbayar.

> 📚 **Dokumentasi lengkap (dwibahasa ID + EN, worklog detail, API reference, arsitektur):**
> lihat **[README-FULL.md](./README-FULL.md)**

---

## ✨ Fitur Utama

| # | Fitur | Keterangan |
|---|-------|------------|
| 1 | 🌍 **Trilingual penuh** | Indonesia, Inggris, Korea — setiap halaman, meta SEO, dan JSON-LD tersedia dalam 3 bahasa (`?lang=`) |
| 2 | 🗓 **Dasbor admin ala WordPress** | `/admin` — inbox booking, manajer galeri (upload ≤ 6 MB, urutkan drag & drop, keterangan), pengaturan situs, ganti password |
| 3 | 📥 **Booking langsung ke dasbor** | Form booking publik → tersimpan di SQLite (Prisma) → tampil real-time di dasbor dengan tombol "Hubungi via WhatsApp" per pemesan |
| 4 | 📊 **Publish + Download Excel** | Tombol **Publish** menyimpan pengaturan langsung ke situs; tombol **Download Excel** di sebelahnya mengekspor semua booking ke CSV siap-Excel (BOM + pemisah `;`) |
| 5 | 🤖 **Concierge AI** | Asisten chat berbasis Z-AI GLM yang menjawab pertanyaan pengunjung dalam bahasa pengunjung — hanya dari fakta resmi, tanpa mengarang harga/jadwal |
| 6 | 💬 **WhatsApp terintegrasi** | Tombol chat hijau melayang, kartu kontak footer, dan deep-link per booking di dasbor |
| 7 | 🖼 **Galeri interaktif** | Lightbox, 8 foto bawaan dari brosur resmi, dikelola penuh dari dasbor |
| 8 | 🔍 **SEO internasional** | Metadata per-halaman-per-bahasa, canonical + `hreflang` ×3, JSON-LD `@graph` (studio, website, breadcrumb), `sitemap.ts` otomatis |
| 9 | 🔐 **Keamanan tanpa dependensi baru** | Password hash **scrypt ber-salt**, sesi cookie `httpOnly` bertanda tangan HMAC (kedaluwarsa 7 hari), semua API admin menolak request tanpa sesi |
| 10 | ✨ **Motion & branding** | Framer Motion (reveal, magnetic, marquee), kursor kustom, tipografi Korea dengan Noto Sans KR, tema air "watercolour Bali" |

---

## 🗺 Peta Halaman

| Rute | Isi | Bahasa |
|------|-----|--------|
| `/` | Hero watercolour, marquee, CTA | EN (default) · ID · KO |
| `/about` | Nilai & cerita studio | ×3 |
| `/classes` + `/classes/[slug]` | 6 kelas unggulan + halaman detail dinamis | ×3 |
| `/experiences` | Kelas grup privat (hingga 50 peserta) & privat 1:1 | ×3 |
| `/elin` | Profil instruktur + 14 logo klien internasional | ×3 |
| `/gallery` | Galeri interaktif + lightbox | ×3 |
| `/booking` | Formulir booking → dasbor | ×3 |
| `/faq` | FAQ trilingual | ×3 |
| `/contact` | Kontak, WhatsApp, alamat studio | ×3 |
| `/admin` | Dasbor studio (Bahasa Indonesia) | ID |

**6 kelas unggulan:** Travel Drawing · Dog Keychain · Postcards · Custom Flip-Flop · Custom T-shirt · Creative Flow.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router, standalone output) · React 19 · TypeScript 5
- **Styling:** Tailwind CSS 4 · shadcn/ui (Radix UI) · font variabel (display, script, monobrand, Noto Sans KR)
- **Animasi:** Framer Motion 12
- **Database:** SQLite + Prisma ORM 6 (`Booking`, `AdminUser`, `SiteSetting`, `GalleryImage`)
- **AI:** z-ai-web-dev-sdk (chat completions untuk Concierge)
- **Drag & drop:** @dnd-kit (urutan galeri)
- **Runtime:** Node / Bun — dev di port 3000

---

## 🚀 Mulai Cepat

```bash
# 1. Instal dependensi
npm install          # atau: bun install

# 2. Siapkan database (SQLite)
npm run db:push      # prisma db push

# 3. Seed akun admin + pengaturan + galeri bawaan
node scripts/seed-admin.mjs
#    → email admin: ptelchistudiobali@gmail.com
#    → password acak dicetak SEKALI di terminal — segera ganti di dasbor

# 4. Jalankan pengembangan
npm run dev          # http://localhost:3000  ·  dasbor: /admin

# 5. Build produksi (standalone)
npm run build && npm start
```

**Variabel lingkungan:** **tidak ada yang wajib** — URL database SQLite (`file:../db/custom.db`) sudah tertanam di `prisma/schema.prisma`. Opsional: `NEXT_PUBLIC_SITE_URL` (default `https://elchistudiobali.com`), `ADMIN_EMAIL` / `ADMIN_PASSWORD` saat seed.

### 🚀 Deploy ke Vercel

Repo ini siap diunggah ke Vercel **tanpa konfigurasi tambahan**:

1. Pastikan repo ter-push ke GitHub → di Vercel: **Add New Project → Import** `gunaracorp/elchistudiobali`.
2. Framework **Next.js** terdeteksi otomatis; biarkan Build Command default (`npm run build`) — `postinstall` sudah menjalankan `prisma generate`.
3. **Tidak perlu env var untuk mulai**: URL SQLite tertanam di schema, dan `db/custom.db` (akun admin, pengaturan, 9 foto galeri) ikut ter-commit.
4. Opsional di *Settings → Environment Variables*: `NEXT_PUBLIC_SITE_URL=https://elchistudiobali.com`.

> ⚠️ **Catatan serverless:** filesystem Vercel bersifat *ephemeral/read-only* — halaman publik, SEO, login admin, dan pembacaan data berjalan normal, tetapi **penulisan** (booking masuk, Publish pengaturan, upload galeri) tidak tersimpan permanen. Untuk CMS penuh di cloud, migrasikan ke database hosted (Turso/Neon/Vercel Postgres) — skema & API sudah terpisah rapi lewat Prisma sehingga migrasinya kecil.

---

## 📍 Data Resmi Studio (terkonfirmasi pemilik)

| Data | Nilai |
|------|-------|
| 🏢 Badan usaha | PT. Elchi Studio Bali (sesuai NIB) |
| 📌 Alamat | Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia |
| 📱 WhatsApp | +62 823-3957-0355 |
| 📧 Email aktif | `ptelchistudiobali@gmail.com` · `elchistudio@gmail.com` · `info@elchistudio.com` |
| 🌐 Domain | `elchistudiobali.com` |

---

## 🧾 Versi Aplikasi

**Versi saat ini: `v3.0.0`** (15 November 2026) — lihat [README-FULL.md → Worklog & CHANGELOG](./README-FULL.md) untuk detail per fase.

| Versi | Tanggal | Ringkasan |
|-------|---------|-----------|
| **v1.0.0** | 13 Nov 2026 | Fondasi & desain — scaffold Next.js 16, ekstraksi aset resmi (NIB + brosur), 7 iterasi desain (hero → galeri) |
| **v2.0.0** | 15 Nov 2026 | Trilingual + CMS — 11 halaman × 3 bahasa, dasbor admin, Concierge AI, SEO 3 bahasa, showcase PDF, paket ZIP |
| **v3.0.0** | 15 Nov 2026 | Data resmi & operasional — alamat confirmed Tibubeneng (BTS dihapus), 3 email aktif di footer + schema, tombol Publish & Download Excel, QA penuh, README internasional |

---

## 📝 Worklog (ringkas)

<details>
<summary><b>Klik untuk membuka riwayat kerja ringkas</b> — versi detail ada di README-FULL.md</summary>

- **13 Nov 2026 · 20:13** — `Initial commit`: scaffold proyek (Next.js 16 + Tailwind 4 + shadcn/ui + Prisma).
- **13 Nov 2026 · 21:03** — Ekstraksi aset resmi dari dokumen klien: data NIB, foto kelas & studio, potret Elin (`public/images/`, 11 aset).
- **15 Nov 2026 · 00:52** — Sesi build v2–v6: hero watercolour + marquee, halaman kelas & detail, profil Elin + logo klien, pengalaman privat, UI admin v1, Concierge AI, FAQ, tampilan ponsel.
- **15 Nov 2026 · 01:24** — Iterasi v7 (galeri akhir), formulir booking, seed CMS (admin + pengaturan + 8 foto), dasbor fungsional.
- **15 Nov 2026 · 13:21** — QA menyeluruh + penyempurnaan; **14:23** showcase PDF 17 halaman + paket ZIP.
- **15 Nov 2026 · 17:38** — Dokumentasi HANDOVER dwibahasa, footer CMS, JSON-LD `@graph`, sitemap.
- **15 Nov 2026 · 20:04** — **Rilis v3.0.0**: alamat confirmed `Gg. Puji No.9B, Tibubeneng` (menggantikan alamat BTS lama di semua titik), 3 email aktif di footer + JSON-LD, tombol **Publish** + **Download Excel** (teruji klik browser: `Excel diunduh ✓ (2 booking)`), README internasional, push ke GitHub.

</details>

---

## 🔐 Keamanan & Kredensial

- Password admin disimpan sebagai **hash scrypt ber-salt** (modul `node:crypto`) — tidak pernah dalam teks polos.
- Sesi login = cookie `httpOnly` bertanda tangan **HMAC**, kedaluwarsa 7 hari; semua `/api/admin/*` menolak request tanpa sesi valid.
- Kredensial **tidak pernah** disimpan di dalam repo, ZIP, atau dokumen — dikirim terpisah ke pemilik studio.

---

## 👥 Kredit

| Peran | Pihak |
|-------|-------|
| Studio & pemilik brand | **PT. Elchi Studio Bali** — Elin Kim (Founder & Lead Instructor) |
| Desain & pengembangan website | **PT Top Konsultan Internasional** — Gugun Gunara (Master Polymath · Sage Universal · The Ultimate Problem Solver) |
| Foto & konten sumber | Brosur resmi & dokumen NIB studio |

---

<div align="center">

**© 2026 PT. Elchi Studio Bali** · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361, Indonesia
🌐 [elchistudiobali.com](https://elchistudiobali.com) · 📱 WhatsApp [+62 823-3957-0355](https://wa.me/6282339570355)

*Dibuat dengan standar internasional — trilingual, CMS, AI, dan SEO penuh.* 🌺

</div>
