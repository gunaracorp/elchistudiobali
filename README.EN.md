<div align="center">

# 🎨 Elchí Studio Bali — Full Documentation (English)

### Official Website · Trilingual CMS · Concierge AI · International SEO

**English edition of the complete project documentation.**
**Bahasa Indonesia edition:** [README.md](./README.md) (main) · Bilingual edition: [README-FULL.md](./README-FULL.md) · History: [WORKLOG.md](./WORKLOG.md) · Releases: [CHANGELOG.md](./CHANGELOG.md)

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

## Table of Contents

1. [App Identity & Versioning](#1-app-identity--versioning)
2. [About the Project](#2-about-the-project)
3. [Detailed Features](#3-detailed-features)
4. [Architecture & Folder Structure](#4-architecture--folder-structure)
5. [Database Schema](#5-database-schema)
6. [API Reference](#6-api-reference)
7. [Admin Dashboard](#7-admin-dashboard)
8. [i18n & SEO](#8-i18n--seo)
9. [Concierge AI](#9-concierge-ai)
10. [Installation, Configuration & Deployment](#10-installation-configuration--deployment)
11. [QA & Testing](#11-qa--testing)
12. [Detailed Worklog](#12-detailed-worklog)
13. [CHANGELOG](#13-changelog)
14. [Roadmap](#14-roadmap)
15. [Credits, Legal & Contact](#15-credits-legal--contact)

---

## 1. App Identity & Versioning

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
- **v3.x — Official Data & Operations.** Synchronisation of confirmed legal data (studio address, active emails), dashboard operational tools (Publish + Download Excel), and international-standard documentation (this English edition).

---

## 2. About the Project

**Elchí Studio Bali** is a creative-education studio in Bali leading art classes for travellers, groups, and anyone who wants to make things: *watercolour, sketching, needle felting, and crafts* such as Dog Keychain and Custom Flip-Flop. Its instructor, **Elin Kim**, has 19 years of teaching experience; studied art restoration at **École de Condé Paris** and Fine Arts at **ESADMM Marseille**; is certified in needle felting (2022), fitness (2020) and flower rice cakes (2018); teaches in English, French and Korean; and has held workshops for **Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento and the Korean Cultural Centre Australia**. Elin's previous studio, *Elin's Classes*, earned over **250 five-star reviews**.

The business challenge is classic: class-based businesses need a **convincing multilingual digital presence** (Bali's visitors come from all over the world), yet studio owners are not engineers. The solution built in this repository is a **trilingual website + CMS dashboard + Concierge AI in one Next.js application**, so the studio can:

1. Present itself professionally in **three languages at once** (Indonesian, English, Korean) without duplicate pages;
2. **Manage everything itself** — bookings, gallery, address, WhatsApp, emails, opening hours — through the Indonesian-language `/admin` dashboard;
3. Answer prospective students **24/7 via the Concierge AI**, which replies only from official facts;
4. Get indexed correctly by international search engines thanks to per-page-per-language metadata, `hreflang`, and JSON-LD structured data.

All content derives from the **studio's official documents** (NIB, class brochure, Elin's profile) — no invented prices, schedules, or addresses; anything unconfirmed is always routed to personal confirmation via WhatsApp/booking.

---

## 3. Detailed Features

### 3.1 Public Pages

| Route | Content & features |
|-------|--------------------|
| `/` | Animated watercolour hero + class marquee + value cards + booking CTA; custom cursor & magnetic effects |
| `/about` | Studio story, creative-education values, studio photos |
| `/classes` | Grid of 6 signature classes with official durations & descriptions |
| `/classes/[slug]` | Dynamic detail page per class (own SEO metadata, course JSON-LD) |
| `/experiences` | Private group classes (up to 50 participants — Elin has taught groups of 50) & private 1:1 90-minute sessions |
| `/elin` | Instructor profile + 14 international client logos (Pinterest, Bottega Veneta, etc.) |
| `/gallery` | Interactive gallery + lightbox; 8 default photos from the official brochure, dashboard-managed |
| `/booking` | Booking form (name, email, class, preferred date, participants, message) → saved to database → dashboard inbox; no upfront payment |
| `/faq` | Trilingual FAQ from real visitor questions |
| `/contact` | Address, WhatsApp, emails (×3), opening hours, info map |
| `/admin` | Studio dashboard (Bahasa Indonesia) — see section 7 |

**6 signature classes:** Travel Drawing · Dog Keychain · Postcards · Custom Flip-Flop · Custom T-shirt · Creative Flow.

### 3.2 Systems & UX

- **Reload-free trilingual experience** — custom locale provider, navbar language switcher, shareable & indexable `?lang=` parameter. **First visits default to English** (`DEFAULT_LOCALE = "en"`).
- **WhatsApp integrated at three touchpoints** — floating button on every page, footer contact card, and per-booking `wa.me` deep links in the dashboard (numbers normalised to the 62 format).
- **Dignified motion** — Framer Motion: scroll `Reveal`, `Magnetic` buttons, running marquee, page transitions; respects `prefers-reduced-motion`.
- **Native Korean typography** — Noto Sans KR for hangul accents, not system fallback.
- **"Watercolour Bali" theme** — cream/rose/ink palette with watercolour textures; all icons from lucide-react (one consistent family).

---

## 4. Architecture & Folder Structure

**Next.js App Router architecture** with server components for pages (SEO + direct DB access) and client components for interactions (dashboard, gallery, Concierge). Site settings are read from SQLite via Prisma; admin sessions are guarded by a signed-cookie middleware.

```
elchistudiobali/
├── prisma/schema.prisma       # 4 models: Booking, AdminUser, SiteSetting, GalleryImage
├── db/custom.db               # SQLite database (runtime)
├── public/
│   ├── images/                # 11 official assets: hero, 6 class photos, Elin portrait, gallery, workshop
│   └── robots.txt             # Search-engine crawler rules
├── scripts/                   # seed, settings updater, PDF generator, screenshot capture, ZIP rebuild
├── src/
│   ├── app/                   # home + 10 public pages + /admin + 12 API endpoints + sitemap.ts
│   ├── components/elchi/      # 24 components: hero, navbar, footer, gallery, concierge, ...
│   └── lib/                   # i18n (en/id/ko), seo.ts, auth.ts, site-settings.ts, classes-data.ts, db.ts
└── download/                  # Deliverables: showcase PDF, HANDOVER, ZIP package, screenshots, READMEs
```

**Key architectural decisions:**

1. **Static classes, dynamic gallery.** The 6 class descriptions live in code (`classes-data.ts`) so official content cannot be broken through the UI; gallery photos are dynamic DB rows so the studio can swap them freely.
2. **Settings are key-value.** `SiteSetting` stores `key/value` pairs (no wide columns) — new fields need no schema migration.
3. **Multi-value emails.** The email field supports several addresses separated by commas; the footer renders them as a list of `mailto` links.
4. **Single-file dashboard.** The whole dashboard (`admin/page.tsx`) is one client component with 3 tabs — simple, fast, easy to hand over.

---

## 5. Database Schema

Four Prisma models on SQLite (`db/custom.db`):

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

- **Booking** — every booking form submission; `status` defaults to `new` (the dashboard shows a "NEW" badge); stored in UTC, displayed in **WITA (Asia/Makassar)** time in the dashboard.
- **AdminUser** — a single admin account; password stored as `salt:hash` using **64-byte scrypt** (`node:crypto.scryptSync`); unique email.
- **SiteSetting** — 5 public keys: `studio_address`, `studio_whatsapp`, `studio_email` (supports several, comma-separated), `studio_hours`, `instagram_url`.
- **GalleryImage** — display order controlled by `sortOrder` (@dnd-kit drag & drop in the dashboard); when the list is emptied, the site falls back to 8 default photos.

---

## 6. API Reference

12 endpoints in `src/app/api/`. Every admin endpoint verifies the signed session cookie — no valid session → `401`.

| Endpoint | Method | Auth | Function |
|----------|--------|------|----------|
| `/api` | GET | public | Health check / info |
| `/api/bookings` | POST | public | Accept booking form submissions (zod validation) |
| `/api/gallery` | GET | public | Ordered gallery list |
| `/api/settings` | GET | public | 5 public setting keys (footer, WA, contact) |
| `/api/concierge` | POST | public | Concierge AI chat (last ≤ 8 messages + locale) |
| `/api/admin/login` | POST | — | Email+password login → sets session cookie |
| `/api/admin/logout` | POST | session | Destroy session |
| `/api/admin/me` | GET | session | Current session identity |
| `/api/admin/bookings` | GET | session | All bookings (dashboard inbox) |
| `/api/admin/gallery` | GET/POST/PUT/DELETE | session | Gallery CRUD + reorder (`sortOrder`) |
| `/api/admin/settings` | GET/PUT | session | Read & save site settings |
| `/api/admin/password` | POST | session | Change admin password (verifies old, min. 8 chars) |

**Download Excel format:** CSV with **UTF-8 BOM** + `;` separator so it opens cleanly in Indonesian-locale Excel; columns: `createdAt;name;email;phone;classType;participants;preferredDate;status;message`. Export is built client-side from `/api/admin/bookings` data — no extra endpoint needed.

---

## 7. Admin Dashboard

### Interface (Bahasa Indonesia — `/admin`)

The dashboard is a fully **Bahasa Indonesia** interface — designed so the studio owner understands it without training. Three tabs:

1. **Booking Masuk (Booking Inbox)** — one card per booking: name + status badge (`NEW`), class & participants, preferred date, email/phone, quoted message, WITA timestamp, and a **"Hubungi via WhatsApp"** button opening a chat with the guest's number (auto-normalised to the 62 format). A **Refresh** button reloads the inbox.
2. **Galeri (Gallery)** — add photos via **device upload (≤ 6 MB)** or image URL; edit captions; reorder up/down; delete. Changes appear on the live site instantly; if the list is emptied, the site falls back to the 8 default brochure photos.
3. **Pengaturan (Settings)** — Studio Address, WhatsApp Number, **Studio Email (multiple addresses, comma-separated)**, Opening Hours, Instagram URL. Two action buttons:
   - **Publish** (rose) — saves settings; changes go live on the site's footer & WhatsApp links immediately.
   - **Download Excel** (white, next to Publish) — exports **all bookings** to an Excel-ready CSV and downloads it immediately; after clicking, a status shows *"Excel diunduh ✓ (N booking)"* ("Excel downloaded ✓").
   
   Plus a **Change Admin Password** panel (current password + new min. 8 chars + confirmation).

**Security flow:** login at `/admin` (email + password) → server verifies scrypt → 7-day `httpOnly` HMAC cookie → every `/api/admin/*` call verifies the cookie signature. **Keluar (Logout)** destroys the session. Passwords are stored as **salted scrypt hashes** (`node:crypto`) — never in plain text; credentials are never stored in the repository, ZIP, or documents.

---

## 8. i18n & SEO

**Language mechanism.** Three full locales — `en`, `id`, `ko` — defined in `src/lib/i18n/` (`en.ts`, `id.ts`, `ko.ts` + `labels.ts`, `types.ts`). `DEFAULT_LOCALE = "en"` — **first visits default to English** (international standard); the active language comes from the `?lang=` URL parameter and can be overridden by the browser-saved preference, managed by `locale-provider.tsx`, switched via the navbar language picker. **No duplicate pages** — one component renders all three languages.

**Per-page per-language SEO.** `src/lib/seo.ts` stores `PAGE_SEO` (title + description + breadcrumb for 10 routes × 3 languages); `buildMetadata()` produces title/description + canonical + `alternates.languages` (**hreflang ×3** per page) + OpenGraph with matching locales (`id_ID`, `en_US`, `ko_KR`).

**JSON-LD structured data.** `siteGraph()` builds an `@graph` containing:
- the Elchí Studio Bali `EducationalOrganization` — official address `Gg. Puji No. 9B, Tibubeneng, Kuta Utara, 80361` (PostalAddress), **3 active email contactPoints**, telephone, languages spoken, founder Elin Kim;
- `WebSite` + per-page `BreadcrumbList`;
- consultant attribution (backend-only, not shown on the UI surface).

**Sitemap & robots.** `src/app/sitemap.ts` generates every route × 3 languages automatically; `public/robots.txt` governs crawlers.

**Adding a new language (e.g. French):** add `fr.ts` in `src/lib/i18n/`, register it in `index.ts` + `LOCALES` in `seo.ts`, add an `fr` block to `PAGE_SEO`, and add an option in `language-switcher.tsx` — no page changes required.

---

## 9. Concierge AI

A chat assistant in the site corner (`concierge.tsx` → `POST /api/concierge` → **Z-AI GLM** via `z-ai-web-dev-sdk`). Its design is strict so the assistant can never lie:

- **Knowledge base = official facts only**: the 6 classes + official durations, private experiences, Elin's profile, the booking flow, the studio location (`Gg. Puji No. 9B, Tibubeneng, Kuta Utara, Badung, Bali 80361`) and the 3 active emails.
- **Answer rules**: reply only from the information above; for exact prices/schedules, warmly explain the studio confirms details personally via the booking form; 2–5 sentence answers.
- **Per-locale language rules**: visitors on the Indonesian version are **always** answered in Bahasa Indonesia; the Korean version answers in polite-casual Korean (해요체/합니다체); the English version in English — unless the visitor writes in another language, then follow the visitor.
- **Context**: the last 8 messages are sent as conversation history (light and cheap).

---

## 10. Installation, Configuration & Deployment

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
| `DATABASE_URL` | optional | **not needed** — the SQLite URL (`file:../db/custom.db`) is embedded in `prisma/schema.prisma`; set it only for a hosted DB |
| `NEXT_PUBLIC_SITE_URL` | optional | default `https://elchistudiobali.com` |
| `ADMIN_EMAIL` | optional | override seed email (default: official NIB email) |
| `ADMIN_PASSWORD` | optional | override seed password (default: random, printed once) |

**npm scripts:** `dev` (port 3000 + log), `build` (standalone + copy static & public), `start` (run standalone), `lint`, `db:push`, `db:studio` (visual DB inspector).

**Operational notes:** change the admin password on first login (Settings → Change Admin Password); address/WhatsApp/email/hours can be changed anytime from the dashboard without redeploying; back up `db/custom.db` regularly (all booking data lives in this single file).

**Deploy to Vercel (ready out of the box):** keep the repo pushed to GitHub → in Vercel: **Add New Project → Import** `gunaracorp/elchistudiobali` → the Next.js framework is auto-detected; keep the default build command (`npm run build`) — `postinstall` already runs `prisma generate`; **no env vars required to start** (the SQLite URL is embedded in the schema and `db/custom.db` ships with the repo, containing the admin account, settings, and gallery). Optionally set `NEXT_PUBLIC_SITE_URL=https://elchistudiobali.com` in *Settings → Environment Variables*.

> ⚠️ **Serverless note:** Vercel's filesystem is ephemeral/read-only — public pages, SEO, admin login, and data reads work normally, but **writes** (incoming bookings, Publish settings, gallery uploads) will not persist. For a full cloud CMS, migrate to a hosted database (Turso/Neon/Vercel Postgres) — the Prisma schema/API split keeps that migration small.

---

## 11. QA & Testing

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

## 12. Detailed Worklog

> Sources: Git commit history (`main`), design iteration artifacts (`scripts/v*-*.png`), and session notes. 9 commits · 3 effective working days. The fullest version lives in [WORKLOG.md](./WORKLOG.md).

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
- **International documentation**: README.md (Bahasa Indonesia) + README-FULL.md (bilingual) + this README.EN.md (English) + WORKLOG.md + CHANGELOG.md.

---

## 13. CHANGELOG

See [CHANGELOG.md](./CHANGELOG.md) for the full bilingual release history. Summary:

- **v3.0.0 (15 Nov 2026)** — Official data & operations: confirmed address, 3 active emails, Publish + Download Excel buttons, international documentation set.
- **v2.0.0 (15 Nov 2026)** — Full functionality: 11 trilingual pages, WordPress-style admin dashboard, Concierge AI, trilingual SEO, showcase PDF + ZIP.
- **v1.0.0 (13 Nov 2026)** — Foundation: scaffold, official asset extraction, 7 design iterations to the final look.

---

## 14. Roadmap

> Plans, not promises — order may follow the studio's needs.

- **v3.1** — Excel download straight from the Booking tab (not only Settings) + date filters.
- **v3.2** — Editable booking statuses in the dashboard (new → confirmed → done).
- **v4.0** — Automatic email notifications on new bookings + paginated gallery.
- **v4.x** — A fourth language (French) — the i18n framework is ready.

---

## 15. Credits, Legal & Contact

| Role | Party |
|------|-------|
| Studio & brand owner | **PT. Elchi Studio Bali** — Elin Kim (Founder & Lead Instructor) |
| Design, development & consulting | **PT Top Konsultan Internasional** — Gugun Gunara *(Master Polymath · Sage Universal · The Ultimate Problem Solver)* |
| Source assets & content | The studio's NIB documents & official brochure |
| AI infrastructure | Z-AI GLM (`z-ai-web-dev-sdk`) |

**Copyright:** all content, brands, and photos belong to PT. Elchi Studio Bali. This document serves the studio's & developer's internal needs. Admin credentials are never stored in the repository or distribution packages.

<div align="center">

### 📍 PT. Elchi Studio Bali

**Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia**
📧 `ptelchistudiobali@gmail.com` · `elchistudio@gmail.com` · `info@elchistudio.com`
📱 WhatsApp **+62 823-3957-0355** · 🌐 [elchistudiobali.com](https://elchistudiobali.com)

**© 2026 PT. Elchi Studio Bali · v3.0.0 · Built with Next.js 16** 🌺

</div>


