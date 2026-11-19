# Gunara Corp Network — Panduan Cross-Link Elchí Studio Bali

> **ROADMAP Langkah 24** · Disusun 18 November 2026 · Pemilik: PT Elchi Studio Bali
> Tujuan: tautan timbal balik (dofollow) antar situs jaringan Gunara Corp untuk
> kekuatan SEO, kepercayaan pengunjung, dan rujukan legalitas antar-perusahaan.

## 1. Cara kerja singkat

Setiap situs jaringan memasang **satu badge di footer (semua halaman)** yang
menautkan ke `https://www.elchistudio.web.id/` dengan **parameter `?ref=` unik
per situs**. Sisi Elchí Studio sudah menyediakan blok pasangan di footer
(bagian "Partner credits" — Digiman.id, JuraganWebsite, TopKonsultan,
GunaraCorp) sehingga arah balik sudah jalan; yang tersisa adalah arah **masuk**
dari situs jaringan ke Elchí.

- Tautan harus **dofollow** (JANGAN `rel="nofollow"` — ini kemitraan resmi, bukan iklan).
- Selalu `target="_blank" rel="noopener"`.
- `?ref=` unik per situs supaya trafik balik terlihat pada parameter URL di analytics.

## 2. Status pemasangan (dicek 18 Nov 2026)

| Situs jaringan | Status situs | Tautan balik ke Elchí | Ref unik |
| --- | --- | --- | --- |
| topkonsultan.web.id (PT Top Konsultan Internasional) | ✅ online (200) | ❌ belum | `?ref=topkonsultan` |
| juraganwebsite.web.id | ✅ online (200) | ❌ belum | `?ref=juraganwebsite` |
| gunara.web.id (GunaraCorp) | ✅ online (200) | ❌ belum | `?ref=gunaracorp` |
| digiman.id (PT Digital Bisnis Manajemen) | ⚠️ **404 — situs mati** | ❌ belum | `?ref=digiman` |

**Target Langkah 24: ≥ 2 situs terpasang.** Centang satu per satu di bawah.

- [ ] TopKonsultan memasang badge
- [ ] JuraganWebsite memasang badge
- [ ] GunaraCorp memasang badge
- [ ] Digiman.id kembali online lalu memasang badge

> Catatan Digiman.id: root domain mengembalikan HTTP 404 pada pengecekan
> 18 Nov 2026. Hubungi pemilik situs agar diaktifkan dulu sebelum pemasangan.

## 3. Snippet siap-tempel

Dua varian tersedia di `partners/network-badge.html`:

1. **Badge bergaya** (HTML + CSS inline, palet Elchí: cream/sand/ink/rose) —
   cocok untuk footer situs modern; tidak butuh file CSS tambahan.
2. **Teks minimal** — satu anchor dofollow, untuk situs yang footer-nya sederhana.

## 4. Langkah pemasangan (per situs)

1. Buka panel admin/tema situs jaringan, cari **footer** (atau blok "partner").
2. Salin varian badge dari `partners/network-badge.html`, **ganti nilai
   `?ref=`** sesuai kolom "Ref unik" pada tabel di atas.
3. Tempel **sebelum penutup `</footer>`** (atau di baris kredit yang sudah ada).
4. Simpan & terbitkan.
5. Verifikasi dengan perintah di bagian 5.

## 5. Verifikasi pemasangan (satu perintah per situs)

```bash
# Ganti DOMAIN sesuai situs; keluaran harus menampilkan href elchistudio
curl -sL --max-time 25 -A "Mozilla/5.0" "https://DOMAIN" | grep -io 'href="[^"]*elchistudio[^"]*"'
```

Contoh:

```bash
curl -sL "https://topkonsultan.web.id" | grep -io 'href="[^"]*elchistudio[^"]*"'
# Harapannya: href="https://www.elchistudio.web.id/?ref=topkonsultan"
```

Setelah ≥ 2 situs terpasang dan terverifikasi, ubah Langkah 24 di
`ROADMAP.md` menjadi ✅ dan perbarui baris progres menjadi 12/25.

## 6. Halaman penerima trafik

- Landing: `https://www.elchistudio.web.id/?ref=<situs>` — halaman utama
  (pelaku bisnis jaringan umumnya menautkan halaman depan).
- Untuk konteks B2B, alternatifnya: `https://www.elchistudio.web.id/partners?ref=<situs>`
  — halaman Mitra yang menjelaskan program kemitraan hotel/agen.

## 7. Prinsip jaringan

- Cross-link adalah **kemitraan antar-perusahaan yang nyata**: Digiman.id
  (desain), JuraganWebsite (hosting), TopKonsultan (legal & dukungan sistem),
  GunaraCorp (induk) — semuanya tercantum terbuka di footer Elchí Studio.
- Jangan menautkan Elchí dari situs yang tidak berada dalam jaringan ini
  melalui skema ini; kemitraan konten/kelas tetap melalui halaman `/partners`
  dan kode referral resmi.
