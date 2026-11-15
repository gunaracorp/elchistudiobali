"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { KeyRound, Loader2, Inbox, RefreshCcw } from "lucide-react";
import { useSite } from "./locale-provider";
import { fill } from "@/lib/i18n";

type BookingRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  classType: string;
  preferredDate: string | null;
  participants: number;
  message: string | null;
  status: string;
  createdAt: string;
};

/**
 * AdminModal — lightweight studio dashboard for incoming bookings.
 * Auth is a shared studio key checked server-side (MVP; documented
 * in the handover notes — upgrade to NextAuth before production).
 * Surface copy is localized (ID / EN / KO) for studio staff comfort.
 */
export function AdminModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [key, setKey] = useState("");
  const [rows, setRows] = useState<BookingRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { d } = useSite();
  const t = d.admin;

  async function load(k: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/bookings?key=${encodeURIComponent(k)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setRows(data.bookings);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl bg-cream sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
            <Inbox className="h-6 w-6 text-rosedeep" aria-hidden />
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-inksoft">
            {t.desc}
          </DialogDescription>
        </DialogHeader>

        {rows === null ? (
          <form
            className="space-y-4 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              load(key);
            }}
          >
            <div>
              <label htmlFor="admin-key" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                {t.keyLabel}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-inksoft/50" aria-hidden />
                  <input
                    id="admin-key"
                    type="password"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="w-full rounded-xl border border-ink/15 bg-white px-10 py-3 text-sm focus:border-rosedeep focus:outline-none"
                    placeholder={t.keyPh}
                    autoComplete="off"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !key}
                  className="inline-flex items-center gap-2 rounded-xl bg-rosedeep px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
                  {t.unlock}
                </button>
              </div>
              {error && (
                <p role="alert" className="mt-2 text-sm font-medium text-rosedeep">{error}</p>
              )}
              <p className="mt-3 text-xs leading-relaxed text-inksoft/70">
                {t.mvp}
              </p>
            </div>
          </form>
        ) : (
          <div className="pt-2">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-monobrand text-[11px] uppercase tracking-[0.2em] text-inksoft">
                {fill(t.received, { n: String(rows.length) })}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => load(key)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-paper"
                >
                  <RefreshCcw className="h-3.5 w-3.5" aria-hidden /> {t.refresh}
                </button>
                <button
                  type="button"
                  onClick={() => { setRows(null); setKey(""); }}
                  className="rounded-full border border-ink/15 px-4 py-1.5 text-xs font-semibold text-ink hover:bg-paper"
                >
                  {t.lock}
                </button>
              </div>
            </div>

            {rows.length === 0 ? (
              <p className="rounded-xl bg-paper px-5 py-8 text-center text-sm text-inksoft">
                {t.empty}
              </p>
            ) : (
              <ul className="space-y-3">
                {rows.map((r) => (
                  <li key={r.id} className="rounded-xl border border-ink/10 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display text-base font-bold text-ink">
                        {r.name}{" "}
                        <span className="ml-1 rounded-full bg-blushlight px-2.5 py-0.5 font-monobrand text-[10px] font-bold uppercase tracking-wider text-rosedeep">
                          {r.status}
                        </span>
                      </p>
                      <p className="font-monobrand text-[10px] text-inksoft/70">
                        {new Date(r.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Makassar" })} WITA
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-inksoft">
                      <strong className="text-ink">{r.classType}</strong> · {r.participants} {t.pax}
                      {r.preferredDate ? ` · ${t.pref} ${r.preferredDate}` : ""}
                    </p>
                    <p className="mt-1 text-sm text-inksoft">
                      {r.email}
                      {r.phone ? ` · ${r.phone}` : ""}
                    </p>
                    {r.message && (
                      <p className="mt-2 rounded-lg bg-paper px-3 py-2 text-sm italic text-inksoft">
                        &ldquo;{r.message}&rdquo;
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
