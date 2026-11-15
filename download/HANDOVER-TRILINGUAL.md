# Elchí Studio Bali — Dokumentasi Trilingual (ID · EN · 한국어) / Trilingual Documentation

> **ID / English** — Diperbarui 15 November 2026 · Updated 15 November 2026

---

## Bahasa Indonesia

### Ringkasan

Situs Elchí Studio Bali kini sepenuhnya **trilingual**: Bahasa Indonesia, Bahasa Korea, dan Bahasa Inggris. Seluruh antarmuka — navigasi, hero, 6 kelas, pengalaman privat, profil instruktur, galeri, formulir booking, FAQ, footer, dan AI Concierge — tersedia dalam ketiga bahasa, tanpa halaman terpisah: satu halaman, satu klik ganti bahasa.

### Cara kerja sistem bahasa

| Komponen | File | Peran |
| --- | --- | --- |
| Provider | `src/components/elchi/locale-provider.tsx` | State bahasa global, persistensi, animasi transisi |
| Kamus ID | `src/lib/i18n/id.ts` | Seluruh teks Bahasa Indonesia |
| Kamus EN | `src/lib/i18n/en.ts` | Seluruh teks Bahasa Inggris (kanonik) |
| Kamus KO | `src/lib/i18n/ko.ts` | Seluruh teks Bahasa Korea |
| Tipe | `src/lib/i18n/types.ts` | Kontrak struktur kamus (aman TypeScript) |
| Helper | `src/lib/i18n/index.ts` | Penggabungan konten terstruktur + terjemahan |
| Switcher | `src/components/elchi/language-switcher.tsx` | Pil `ID · EN · 한국어` (3 lokasi: navbar, menu mobile, footer) |

**Perilaku penting:**

1. **Deteksi otomatis** — kunjungan pertama mengikuti bahasa browser (`id` → Bahasa Indonesia, `ko` → 한국어, lainnya → English). Deteksi terjadi di belakang loader pembuka sehingga tidak ada kedipan teks.
2. **Persistensi** — pilihan disimpan di `localStorage` (kunci `elchi-locale`) dan dipakai lagi pada kunjungan berikutnya.
3. **`<html lang>` selalu sinkron** — penting untuk pembaca layar, penerjemah otomatis, dan SEO.
4. **Transisi sinematik** — pergantian bahasa memainkan tirai gradien watercolour ±0,4 detik dengan wordmark "Elchí"; otomatis dilewati untuk pengguna `prefers-reduced-motion`.
5. **Animasi hero diputar ulang** — headline dianimasikan ulang (stagger word-by-word) setiap ganti bahasa; kode HTML `key={locale}` menangani ini.
6. **Aman hidrasi** — server selalu merender English; swap bahasa terjadi setelah mount (pola `requestAnimationFrame`, tanpa hydration mismatch).

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
- Browser (1440×900 & 390×844): hero EN/ID/KO, classes ID, booking ID end-to-end (data tersimpan di DB + layar "Terima kasih!"), menu mobile ID, switcher di 3 lokasi, `document.documentElement.lang` benar untuk ketiga locale.
- Screenshot bukti: folder `screenshots/` di samping dokumen ini.

### Menambah bahasa baru (mis. Prancis)

1. Buat `src/lib/i18n/fr.ts` mengikuti tipe `LocaleData`.
2. Daftarkan di `src/lib/i18n/index.ts` (`DICTS`) dan `src/lib/i18n/labels.ts` (`LOCALES_LABELS`).
3. Tambahkan kode di `LOCALE_CODES` (index) dan `isLocale` (locale-provider).
4. Jika bahasa butuh font khusus, muat via `next/font` di `layout.tsx` + aturan CSS `html[lang="fr"]` di `globals.css`.
5. Tambahkan rule bahasa di `LOCALE_RULES` (`src/app/api/concierge/route.ts`).

---

## English

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
