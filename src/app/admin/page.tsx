"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Building2, CalendarHeart, CheckCircle2, Download, ImagePlus, Images, Inbox,
  KeyRound, Link2, Loader2, LogOut, Mail, MapPin, MessageCircle, RefreshCcw,
  Settings, Trash2, ArrowUpCircle, ArrowDownCircle, ExternalLink, Eye, EyeOff,
} from "lucide-react";

/**
 * /admin — WordPress-style studio dashboard (Bahasa Indonesia).
 * Login (email + password) → Booking inbox · Galeri manager · Pengaturan.
 * Session lives in an httpOnly signed cookie (see src/lib/auth.ts).
 */

type BookingRow = {
  id: string; name: string; email: string; phone: string | null;
  classType: string; preferredDate: string | null; participants: number;
  message: string | null; status: string; createdAt: string;
};
type GalleryRow = { id: string; src: string; caption: string; sortOrder: number; createdAt: string };
type SettingsForm = Record<string, string>;

const TABS = [
  { id: "bookings", label: "Booking Masuk", icon: Inbox },
  { id: "gallery", label: "Galeri", icon: Images },
  { id: "settings", label: "Pengaturan", icon: Settings },
] as const;
type Tab = (typeof TABS)[number]["id"];

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-inksoft/50 focus:border-rosedeep focus:outline-none transition-colors";

export default function AdminPage() {
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setEmail(d.email || null))
      .catch(() => setEmail(null));
  }, []);

  if (email === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink text-cream">
        <Loader2 className="h-8 w-8 animate-spin text-blush" aria-hidden />
      </main>
    );
  }
  return email ? <Dashboard email={email} onLogout={() => setEmail(null)} /> : <LoginCard onSuccess={setEmail} />;
}

/* --------------------------------- Login ---------------------------------- */

function LoginCard({ onSuccess }: { onSuccess: (email: string) => void }) {
  const [email, setEmailValue] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login gagal.");
      onSuccess(data.email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login gagal.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-5 text-cream">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-script text-5xl text-blush">Elchí</p>
          <p className="mt-2 font-monobrand text-[11px] uppercase tracking-[0.4em] text-cream/60">
            Studio Bali · Dasbor
          </p>
        </div>
        <form
          onSubmit={submit}
          className="rounded-3xl border border-cream/10 bg-[#3f2c24] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
        >
          <h1 className="font-display text-2xl font-bold">Masuk Dasbor Studio</h1>
          <p className="mt-1.5 text-sm text-cream/60">
            Kelola booking, galeri, dan pengaturan situs — seperti WordPress.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/60">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" aria-hidden />
                <input
                  id="admin-email" type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full rounded-xl border border-cream/15 bg-cream/10 px-10 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-blush focus:outline-none"
                  placeholder="nama@studio.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/60">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" aria-hidden />
                <input
                  id="admin-password" type={show ? "text" : "password"} required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-cream/15 bg-cream/10 px-10 py-3 pr-11 text-sm text-cream placeholder:text-cream/30 focus:border-blush focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button" onClick={() => setShow((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
                  aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {show ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-rose/20 px-4 py-2.5 text-sm font-medium text-blush">
                {error}
              </p>
            )}

            <button
              type="submit" disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-rose py-3.5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(231,90,135,0.4)] transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <KeyRound className="h-4 w-4" aria-hidden />}
              Masuk
            </button>
          </div>
          <a href="/" className="mt-5 flex items-center justify-center gap-1.5 text-xs text-cream/50 hover:text-blush">
            ← Kembali ke situs
          </a>
        </form>
      </div>
    </main>
  );
}

/* ------------------------------- Dashboard -------------------------------- */

function Dashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("bookings");

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    onLogout();
  }

  return (
    <main className="min-h-screen bg-cream text-ink">
      <header className="sticky top-0 z-10 border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-baseline gap-3">
            <span className="font-script text-3xl text-rosedeep">Elchí</span>
            <span className="hidden font-monobrand text-[10px] uppercase tracking-[0.35em] text-inksoft sm:inline">
              Dasbor Studio
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold text-ink hover:bg-paper"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden /> Lihat Situs
            </a>
            <button
              type="button" onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-cream hover:bg-rosedeep"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden /> Keluar
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-1 px-5 pb-3">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id} type="button" onClick={() => setTab(t.id)}
                aria-pressed={tab === t.id}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  tab === t.id ? "bg-rosedeep text-white" : "text-inksoft hover:bg-blushlight hover:text-rosedeep"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden /> {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <p className="mb-6 font-monobrand text-[10px] uppercase tracking-[0.25em] text-inksoft/70">
          Masuk sebagai {email}
        </p>
        {tab === "bookings" && <BookingsTab />}
        {tab === "gallery" && <GalleryTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </main>
  );
}

/* -------------------------------- Bookings -------------------------------- */

function BookingsTab() {
  const [rows, setRows] = useState<BookingRow[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat.");
      setRows(data.bookings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat.");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (error) return <p role="alert" className="text-sm font-medium text-rosedeep">{error}</p>;
  if (rows === null) return <Loader2 className="h-6 w-6 animate-spin text-rosedeep" aria-hidden />;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <p className="font-monobrand text-[11px] uppercase tracking-[0.2em] text-inksoft">
          {rows.length} booking diterima
        </p>
        <button type="button" onClick={load} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold hover:bg-paper">
          <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> Segarkan
        </button>
      </div>
      {rows.length === 0 ? (
        <p className="rounded-2xl bg-paper px-6 py-10 text-center text-sm text-inksoft">
          Belum ada booking — permintaan pertama dari situs akan tampil di sini.
        </p>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_2px_10px_rgba(52,35,28,0.05)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg font-bold">
                  {r.name}
                  <span className="ml-2 rounded-full bg-blushlight px-2.5 py-0.5 font-monobrand text-[10px] font-bold uppercase tracking-wider text-rosedeep">
                    {r.status}
                  </span>
                </p>
                <p className="font-monobrand text-[10px] text-inksoft/70">
                  {new Date(r.createdAt).toLocaleString("id-ID", { timeZone: "Asia/Makassar" })} WITA
                </p>
              </div>
              <p className="mt-1.5 text-sm text-inksoft">
                <strong className="text-ink">{r.classType}</strong> · {r.participants} peserta
                {r.preferredDate ? ` · pilihan ${r.preferredDate}` : ""}
              </p>
              <p className="mt-1 text-sm text-inksoft">
                {r.email}
                {r.phone ? ` · ${r.phone}` : ""}
              </p>
              {r.message && (
                <p className="mt-2.5 rounded-xl bg-paper px-4 py-2.5 text-sm italic text-inksoft">
                  &ldquo;{r.message}&rdquo;
                </p>
              )}
              <a
                href={`https://wa.me/${r.phone ? r.phone.replace(/[^0-9]/g, "").replace(/^0/, "62") : ""}`}
                target="_blank" rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-palm hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Hubungi via WhatsApp
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* --------------------------------- Gallery -------------------------------- */

function GalleryTab() {
  const [images, setImages] = useState<GalleryRow[] | null>(null);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat galeri.");
      setImages(data.images);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal memuat galeri.");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  }

  async function add(src: string, cap: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src, caption: cap }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menambah foto.");
      flash("Foto ditambahkan ke galeri ✓");
      setUrl("");
      setCaption("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menambah foto.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadFile(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const upData = await up.json();
      if (!up.ok) throw new Error(upData.error || "Gagal mengunggah.");
      await add(upData.src, caption || file.name.replace(/\.[^.]+$/, ""));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengunggah.");
      setBusy(false);
    }
  }

  async function saveCaption(row: GalleryRow, cap: string) {
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id, caption: cap }),
    });
    flash("Keterangan tersimpan ✓");
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    flash("Foto dihapus dari galeri ✓");
    load();
  }

  async function move(index: number, dir: -1 | 1) {
    if (!images) return;
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setImages(next);
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: next.map((i) => i.id) }),
    });
  }

  if (images === null && !error) return <Loader2 className="h-6 w-6 animate-spin text-rosedeep" aria-hidden />;
  if (error && images === null) return <p role="alert" className="text-sm font-medium text-rosedeep">{error}</p>;

  return (
    <section>
      {/* Tambah foto */}
      <div className="mb-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <ImagePlus className="h-5 w-5 text-rosedeep" aria-hidden /> Tambah Foto Galeri
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
              Unggah dari perangkat
            </label>
            <input
              type="file" accept="image/*" disabled={busy}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }}
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-rosedeep file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
              Atau tempel URL gambar
            </label>
            <div className="flex gap-2">
              <input
                value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="https://…/foto.jpg"
                className={inputCls}
              />
              <button
                type="button" disabled={busy || !url.trim()}
                onClick={() => add(url.trim(), caption)}
                className="shrink-0 rounded-xl bg-rosedeep px-5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : "Tambah"}
              </button>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
              Keterangan (tampil saat foto disentuh)
            </label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Contoh: Sesi cat air sore hari" className={inputCls} />
          </div>
        </div>
        {notice && <p className="mt-3 text-sm font-medium text-palm">{notice}</p>}
        {error && <p role="alert" className="mt-3 text-sm font-medium text-rosedeep">{error}</p>}
        <p className="mt-3 text-xs text-inksoft/70">
          Foto di daftar ini langsung tampil di galeri situs. Jika daftar dikosongkan, situs memakai galeri bawaan.
        </p>
      </div>

      {/* Daftar foto */}
      {images!.length === 0 ? (
        <p className="rounded-2xl bg-paper px-6 py-10 text-center text-sm text-inksoft">
          Galeri masih kosong — situs menampilkan 8 foto bawaan sampai Anda menambah foto sendiri.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images!.map((row, i) => (
            <GalleryCard key={row.id} row={row} index={i} total={images!.length}
              onSaveCaption={saveCaption} onDelete={remove} onMove={move} />
          ))}
        </ul>
      )}
    </section>
  );
}

function GalleryCard({
  row, index, total, onSaveCaption, onDelete, onMove,
}: {
  row: GalleryRow; index: number; total: number;
  onSaveCaption: (row: GalleryRow, cap: string) => void;
  onDelete: (id: string) => void;
  onMove: (index: number, dir: -1 | 1) => void;
}) {
  const [cap, setCap] = useState(row.caption);
  // Sync local caption with the latest server value (render-time pattern).
  const [seen, setSeen] = useState(row.caption);
  if (row.caption !== seen) {
    setSeen(row.caption);
    setCap(row.caption);
  }

  return (
    <li className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <div className="relative aspect-[4/3] bg-paper">
        <img src={row.src} alt={row.caption} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-2.5 py-0.5 font-monobrand text-[10px] text-cream">
          #{index + 1}
        </span>
      </div>
      <div className="space-y-2 p-3.5">
        <input
          value={cap} onChange={(e) => setCap(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm focus:border-rosedeep focus:outline-none"
          aria-label={`Keterangan foto ${index + 1}`}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0}
              className="rounded-full border border-ink/15 p-1.5 hover:bg-paper disabled:opacity-30" aria-label="Geser ke atas">
              <ArrowUpCircle className="h-4 w-4" aria-hidden />
            </button>
            <button type="button" onClick={() => onMove(index, 1)} disabled={index === total - 1}
              className="rounded-full border border-ink/15 p-1.5 hover:bg-paper disabled:opacity-30" aria-label="Geser ke bawah">
              <ArrowDownCircle className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => onDelete(row.id)}
              className="inline-flex items-center gap-1 rounded-full border border-rose/30 px-3 py-1.5 text-xs font-semibold text-rosedeep hover:bg-rose hover:text-white"
              aria-label={`Hapus foto ${index + 1}`}>
              <Trash2 className="h-3.5 w-3.5" aria-hidden /> Hapus
            </button>
            <button type="button" onClick={() => onSaveCaption(row, cap)}
              className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-cream hover:bg-rosedeep">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

/* -------------------------------- Settings -------------------------------- */

const SETTING_FIELDS: { key: string; label: string; hint?: string; textarea?: boolean; icon: typeof MapPin }[] = [
  { key: "studio_address", label: "Alamat Studio", hint: "Tampil di kartu Studio pada footer situs.", textarea: true, icon: MapPin },
  { key: "studio_whatsapp", label: "Nomor WhatsApp", hint: "Format bebas; tombol chat otomatis memakai nomor ini.", icon: MessageCircle },
  { key: "studio_email", label: "Email Studio", hint: "Boleh lebih dari satu — pisahkan dengan koma; semuanya tampil di kartu Email pada footer situs.", icon: Mail },
  { key: "studio_hours", label: "Jam Operasional (opsional)", hint: "Kosongkan bila tidak ingin ditampilkan.", icon: CalendarHeart },
  { key: "instagram_url", label: "URL Instagram (opsional)", hint: "Kosongkan bila belum ada akun resmi.", icon: Link2 },
];

function SettingsTab() {
  const [form, setForm] = useState<SettingsForm | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [dlBusy, setDlBusy] = useState(false);
  const [dlMsg, setDlMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Ganti password
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setForm(d.settings))
      .catch(() => setError("Gagal memuat pengaturan."));
  }, []);

  async function save() {
    if (!form) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Gagal menyimpan.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal menyimpan.");
    } finally {
      setBusy(false);
    }
  }

  /** Download Excel: export semua booking ke CSV (dibuka rapi di Excel/Sheets). */
  async function downloadBookings() {
    setDlBusy(true);
    setDlMsg(null);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memuat booking.");
      const rows: BookingRow[] = Array.isArray(data.bookings) ? data.bookings : [];
      const cols: (keyof BookingRow)[] = [
        "createdAt", "name", "email", "phone", "classType",
        "participants", "preferredDate", "status", "message",
      ];
      const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      // BOM + pemisah ";" agar langsung rapi saat dibuka di Excel regional Indonesia
      const csv =
        "\uFEFF" +
        [cols.join(";"), ...rows.map((r) => cols.map((c) => esc(r[c])).join(";"))].join("\r\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `elchi-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setDlMsg({ ok: true, text: `Excel diunduh ✓ (${rows.length} booking)` });
    } catch (e) {
      setDlMsg({ ok: false, text: e instanceof Error ? e.message : "Gagal mengunduh." });
    } finally {
      setDlBusy(false);
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (next !== confirm) {
      setPwMsg({ ok: false, text: "Konfirmasi password tidak sama." });
      return;
    }
    setPwBusy(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: cur, next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengganti password.");
      setPwMsg({ ok: true, text: "Password berhasil diganti ✓" });
      setCur(""); setNext(""); setConfirm("");
    } catch (e) {
      setPwMsg({ ok: false, text: e instanceof Error ? e.message : "Gagal mengganti password." });
    } finally {
      setPwBusy(false);
    }
  }

  if (!form) return error ? <p role="alert" className="text-sm font-medium text-rosedeep">{error}</p> : <Loader2 className="h-6 w-6 animate-spin text-rosedeep" aria-hidden />;

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <Building2 className="h-5 w-5 text-rosedeep" aria-hidden /> Informasi Studio
        </h2>
        <p className="mt-1 text-sm text-inksoft">Perubahan langsung tampil di situs setelah disimpan.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {SETTING_FIELDS.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
                <label htmlFor={`set-${f.key}`} className="mb-1.5 flex items-center gap-1.5 font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                  <Icon className="h-3.5 w-3.5" aria-hidden /> {f.label}
                </label>
                {f.textarea ? (
                  <textarea
                    id={`set-${f.key}`} rows={3}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className={inputCls}
                  />
                ) : (
                  <input
                    id={`set-${f.key}`}
                    value={form[f.key] ?? ""}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className={inputCls}
                  />
                )}
                {f.hint && <p className="mt-1.5 text-xs text-inksoft/60">{f.hint}</p>}
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button" onClick={save} disabled={busy}
            className="inline-flex items-center gap-2 rounded-full bg-rosedeep px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(201,58,108,0.35)] transition-transform hover:scale-[1.03] disabled:opacity-70"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
            Publish
          </button>
          <button
            type="button" onClick={downloadBookings} disabled={dlBusy}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-paper disabled:opacity-70"
          >
            {dlBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Download className="h-4 w-4" aria-hidden />}
            Download Excel
          </button>
          {saved && <p className="text-sm font-medium text-palm">Tersimpan — situs sudah diperbarui ✓</p>}
          {dlMsg && (
            <p role="status" className={`text-sm font-medium ${dlMsg.ok ? "text-palm" : "text-rosedeep"}`}>
              {dlMsg.text}
            </p>
          )}
          {error && <p role="alert" className="text-sm font-medium text-rosedeep">{error}</p>}
        </div>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <KeyRound className="h-5 w-5 text-rosedeep" aria-hidden /> Ganti Password Admin
        </h2>
        <form onSubmit={changePassword} className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="pw-cur" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">Password saat ini</label>
            <input id="pw-cur" type="password" required value={cur} onChange={(e) => setCur(e.target.value)} className={inputCls} autoComplete="current-password" />
          </div>
          <div>
            <label htmlFor="pw-next" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">Password baru (min. 8)</label>
            <input id="pw-next" type="password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>
          <div>
            <label htmlFor="pw-conf" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">Ulangi password baru</label>
            <input id="pw-conf" type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} autoComplete="new-password" />
          </div>
          <div className="sm:col-span-3">
            <button type="submit" disabled={pwBusy} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream hover:bg-rosedeep disabled:opacity-70">
              {pwBusy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <KeyRound className="h-4 w-4" aria-hidden />}
              Ganti Password
            </button>
            {pwMsg && (
              <p className={`ml-3 inline text-sm font-medium ${pwMsg.ok ? "text-palm" : "text-rosedeep"}`}>{pwMsg.text}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
