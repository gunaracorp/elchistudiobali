"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, CheckCircle2, Loader2, Send } from "lucide-react";
import { BOOKING_CLASS_OPTIONS } from "@/lib/classes-data";
import { Reveal, Magnetic } from "./motion";
import { TornPaper, SunSticker } from "./torn";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-inksoft/50 focus:border-rosedeep focus:outline-none transition-colors";

/**
 * Booking — the enquiry & reservation engine.
 * Posts to /api/bookings (Prisma + SQLite). Confirmation is animated
 * with a torn-paper confetti burst.
 */
export function Booking() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    classType: BOOKING_CLASS_OPTIONS[0].value,
    preferredDate: "",
    participants: "2",
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, participants: Number(form.participants) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="booking" aria-label="Book a class" className="relative bg-rose">
      <div aria-hidden>
        <TornPaper fill="#f9edde" height={44} className="rotate-180" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="text-cream">
            <Reveal>
              <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-cream/80">
                Booking &amp; enquiry
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
                Reserve your{" "}
                <span className="font-script text-[1.1em] font-normal text-ink">
                  creative day
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
                Tell us which workshop calls to you and when you&apos;d love to
                join. We&apos;ll reply with availability, studio details and
                everything you need to know.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-4 text-cream/90">
                {[
                  "Choose your class and preferred date",
                  "Send the form — it lands directly with the studio",
                  "We confirm availability and studio location personally",
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/20 font-monobrand text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="pointer-events-none absolute -bottom-4 right-8 hidden w-20 animate-floaty lg:block" aria-hidden>
              <SunSticker className="w-full" />
            </div>
          </div>

          <Reveal delay={0.12}>
            <div className="relative overflow-hidden rounded-[2rem] bg-cream p-7 shadow-[0_30px_80px_rgba(52,35,28,0.35)] sm:p-9">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[430px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    {/* confetti burst */}
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                      {Array.from({ length: 18 }).map((_, i) => {
                        const angle = (i / 18) * Math.PI * 2;
                        const dx = Math.cos(angle) * 140;
                        const dy = Math.sin(angle) * 120;
                        const colors = ["#e75a87", "#ffc24d", "#8fcfe4", "#4e9e74", "#ff8a5e"];
                        return (
                          <motion.span
                            key={i}
                            className="absolute left-1/2 top-1/3 h-2.5 w-2.5 rounded-sm"
                            style={{ background: colors[i % colors.length] }}
                            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                            animate={{ x: dx, y: dy + 60, opacity: 0, rotate: 220 }}
                            transition={{ duration: 1.4, delay: 0.15 + (i % 5) * 0.06, ease: "easeOut" }}
                          />
                        );
                      })}
                    </div>
                    <CheckCircle2 className="h-16 w-16 text-palm" aria-hidden />
                    <h3 className="mt-5 font-display text-3xl font-bold text-ink">
                      Terima kasih! Thank you!
                    </h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-inksoft">
                      Your request for{" "}
                      <strong className="text-ink">
                        {BOOKING_CLASS_OPTIONS.find((o) => o.value === form.classType)?.label.split(" · ")[0]}
                      </strong>{" "}
                      has been received. We&apos;ll get back to you soon with
                      availability and studio details.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 rounded-full border-2 border-ink px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="space-y-4"
                    aria-label="Class booking form"
                  >
                    <div className="flex items-center gap-2">
                      <CalendarHeart className="h-5 w-5 text-rosedeep" aria-hidden />
                      <h3 className="font-display text-xl font-bold text-ink">
                        Class booking form
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bk-name" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          Your name *
                        </label>
                        <input
                          id="bk-name" required minLength={2} maxLength={80}
                          value={form.name} onChange={set("name")}
                          className={inputCls} placeholder="Putu / Sarah / Minji…"
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-email" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          Email *
                        </label>
                        <input
                          id="bk-email" required type="email"
                          value={form.email} onChange={set("email")}
                          className={inputCls} placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bk-phone" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          Phone / WhatsApp <span className="normal-case tracking-normal">(optional)</span>
                        </label>
                        <input
                          id="bk-phone" type="tel"
                          value={form.phone} onChange={set("phone")}
                          className={inputCls} placeholder="+62 …"
                          autoComplete="tel"
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-date" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          Preferred date
                        </label>
                        <input
                          id="bk-date" type="date"
                          value={form.preferredDate} onChange={set("preferredDate")}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="booking-class-select" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                        Class *
                      </label>
                      <select
                        id="booking-class-select" required
                        value={form.classType} onChange={set("classType")}
                        className={inputCls}
                      >
                        {BOOKING_CLASS_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bk-participants" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                        Participants
                      </label>
                      <input
                        id="bk-participants" type="number" min={1} max={50}
                        value={form.participants} onChange={set("participants")}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="bk-message" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                        Your idea or occasion <span className="normal-case tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        id="bk-message" rows={3} maxLength={1000}
                        value={form.message} onChange={set("message")}
                        className={inputCls}
                        placeholder="A hen's party for 8 friends? A rainy-day watercolour session? Tell us everything…"
                      />
                    </div>

                    {status === "error" && (
                      <p role="alert" className="rounded-xl bg-rose/10 px-4 py-3 text-sm font-medium text-rosedeep">
                        {errorMsg}
                      </p>
                    )}

                    <Magnetic className="block">
                      <button
                        type="submit" disabled={status === "sending"}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-rosedeep py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(201,58,108,0.35)] transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" aria-hidden />
                            Send booking request
                          </>
                        )}
                      </button>
                    </Magnetic>
                    <p className="text-center text-xs text-inksoft/70">
                      No payment needed now — we confirm details with you personally first.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <div aria-hidden>
        <TornPaper fill="#fff8f0" height={44} />
      </div>
    </section>
  );
}
