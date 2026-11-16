<div align="center">

# 🌺 Elchí Studio Bali — Website Standar Internasional (Edisi Statis v5)

**Satu file `index.html` — siap di-push ke GitHub & langsung live di GitHub Pages.**

Trilingual 🇮🇩 Indonesia · 🇬🇧 English · 🇰🇷 한국어 — **widget chat WhatsApp plugin-style** langsung ke Ms Elin Kim — animasi ringan tanpa membebani.

![WhatsApp](https://img.shields.io/badge/WhatsApp-%2B62_823_3957_0355-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Languages](https://img.shields.io/badge/3_Bahasa-ID_%C2%B7_EN_%C2%B7_KO-e75a87?style=for-the-badge)
![Size](https://img.shields.io/badge/Ukuran_1_file-~870_KB-ffc24d?style=for-the-badge)

</div>

---

## ✨ Yang Ada di Website Ini

| # | Fitur | Detail |
|---|-------|--------|
| 1 | 💬 **Widget chat WhatsApp + integrasi penuh** | **Widget chat popup ala plugin** (tombol hijau melayang → panel chat: foto profil Elin Kim, status *Online*, sapaan otomatis, **4 tombol balasan cepat** — booking · harga · acara grup · sapaan, dan **kotak pesan bebas** yang langsung membuka WhatsApp) — plus tombol **Book via WhatsApp** di hero, **tombol booking per kelas** dengan pesan otomatis, kartu WhatsApp di footer, dan **form booking yang menyusun pesan rapi** — semuanya langsung ke **+62 823-3957-0355 (Ms Elin Kim)** |
| 2 | 🌍 **Trilingual instan** | ID / EN / KO di navbar — auto-detect bahasa browser pengunjung, pilihan tersimpan, mendukung `?lang=ko` di URL |
| 3 | 🎨 **Brand asli dipertahankan** | Palet resmi studio (rose `#e75a87`, coral, sunshine, sky, palm), Fraunces + Pacifico + Manrope, foto-foto asli dari brosur studio |
| 4 | 🎬 **Animasi ringan (GPU-friendly)** | Preloader, reveal-on-scroll bertahap, parallax hero, marquee kelas, blob watercolour mengapung, counter statistik (19 tahun · 250+ ulasan · usia 2–80 · 50 peserta), kartu hover-lift, galeri lightbox, kursor kustom — semua hanya `transform`/`opacity` (60 fps, hemat baterai) |
| 5 | 📱 **Responsif penuh** | Desktop, tablet, ponsel — menu fullscreen mobile dengan langkah animasi berjenjang |
| 6 | ♿ **Aksesibel** | Skip-link, aria-label, navigasi keyboard (Esc/panah di lightbox), `prefers-reduced-motion` menghormati pengguna yang tidak ingin animasi |
| 7 | 🔍 **SEO internasional** | Judul & deskripsi dinamis per bahasa, canonical `elchistudiobali.com`, `hreflang` ×3, Open Graph, **JSON-LD LocalBusiness** (alamat Tibubeneng, telepon, rating) |

**Konten 100% asli studio:** 6 kelas (Travel Drawing · Postcards · Dog Keychain · Custom Flip-Flop · Custom T-shirt · Creative Flow), pengalaman privat grup & 1:1, profil lengkap Elin Kim (École de Condé Paris, ESADMM Marseille, 14 klien internasional), 8 FAQ, alamat Gg. Puji No. 9B Tibubeneng — semuanya diambil dari data resmi repo Anda, bukan karangan.

---

## 📁 Isi Paket

```
elchi-studio-website/
├── index.html      ← SELURUH website (HTML+CSS+JS+gambar ter-embed)
├── README.md       ← file ini
└── preview/        ← tangkapan layar hasil verifikasi browser
    ├── desktop-classes.png
    ├── desktop-footer.png
    ├── desktop-wa-widget.png   ← widget chat WhatsApp (desktop)
    ├── mobile-wa-widget.png    ← widget chat WhatsApp (ponsel)
    └── mobile-hero.png
```

Tidak ada build step, tidak ada dependensi — cukup buka `index.html` di browser.

---

## 🚀 Cara Push ke GitHub (github.com/gunaracorp/elchistudiobali)

> Sandbox ini tidak menyimpan kredensial GitHub Anda, jadi langkah terakhir (push) dijalankan dari komputer Anda — kurang dari 2 menit.

### Opsi A — Rekomendasi: branch `gh-pages` (repo Next.js tetap bersih)

```bash
# 1. Clone repo Anda (sekali saja)
git clone https://github.com/gunaracorp/elchistudiobali.git
cd elchistudiobali

# 2. Buat/masuk branch gh-pages
git checkout --orphan gh-pages
git rm -rf . 2>/dev/null || true

# 3. Salin website ke dalam repo
cp /path/ke/elchi-studio-website/index.html .
cp /path/ke/elchi-studio-website/README.md .

# 4. Commit & push
git add index.html README.md
git commit -m "feat: website statis standar internasional + WhatsApp Ms Elin (v4)"
git push -f origin gh-pages
git checkout main   # kembali ke kode Next.js
```

Lalu aktifkan Pages sekali saja:
**GitHub → Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages` → Root → Save**

Situs live di: `https://gunaracorp.github.io/elchistudiobali/`

### Opsi B — Satu file di branch `main`

```bash
git clone https://github.com/gunaracorp/elchistudiobali.git
cd elchistudiobali
cp /path/ke/elchi-studio-website/index.html .
touch .nojekyll          # agar GitHub Pages menyajikan file apa adanya
git add index.html .nojekyll
git commit -m "feat: landing statis + WhatsApp integrasi (v4)"
git push origin main
```

Lalu **Settings → Pages → Branch: `main` → Root → Save**.

> 💡 **Strategi dua sayap:** situs Next.js (CMS, booking database, admin) tetap di-deploy ke **Vercel** seperti panduan README-FULL.md Anda; halaman statis ini jadi landing cepat + backup di GitHub Pages. Keduanya memakai nomor WhatsApp yang sama.

> 🛠️ **Kenapa deploy Vercel branch `gh-pages` pernah gagal `NEXT_NO_VERSION`?** Karena preset framework Next.js di dashboard Vercel (terdeteksi dari branch `main`) dipaksakan ke branch statis ini yang tidak punya `package.json`. **Sudah diperbaiki permanen** lewat file `vercel.json` di branch ini (`framework: null`, tanpa install & build, `outputDirectory: "."`) — Vercel kini menyajikannya sebagai situs statis murni, dan build apa pun (produksi maupun preview) akan hijau otomatis. Tidak perlu mengubah apa pun di dashboard.

---

## 💬 Mengubah Nomor / Pesan WhatsApp

Semua ada di satu tempat — buka `index.html`, cari baris:

```js
const WA_NUMBER = "6282339570355";
```

- Ganti angka itu jika nomor studio berubah (format internasional tanpa `+` dan tanpa tanda hubung).
- Pesan otomatis per bahasa ada di objek `WA_STR` tepat di bawahnya (`generic` = pesan tombol umum, `cls` = pesan per kelas — gunakan `{name}` untuk nama kelas).

---

## ✅ Hasil Verifikasi (headless browser, lulus semua)

- 0 error JavaScript, 0 warning console
- Bahasa: ID / EN / KO teruji berganti lengkap (judul, SEO meta, nav, form)
- WhatsApp: tautan per kelas, tombol umum, dan form booking teruji menyusun pesan `wa.me` yang benar
- Lightbox galeri, menu mobile, switch bahasa mobile — teruji
- Desktop 1440px & mobile 390px — layout rapi tanpa overflow

---

## 📝 Kredit

| Peran | Pihak |
|-------|-------|
| Studio & pemilik brand | **PT. Elchi Studio Bali** — Elin Kim (Founder & Lead Instructor) |
| Desain & pengembangan | **PT Top Konsultan Internasional** — Gugun Gunara |
| Data & foto sumber | Brosur resmi & dokumen NIB studio (dari repo `elchistudiobali`) |

<div align="center">

**© 2026 PT. Elchi Studio Bali** · Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361
📱 WhatsApp [+62 823-3957-0355](https://wa.me/6282339570355) · 🌐 elchistudiobali.com

</div>
