"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, CheckCircle2, Loader2, Send } from "lucide-react";
import { Reveal, Magnetic } from "./motion";
import { TornPaper, SunSticker } from "./torn";
import { useContent, useSite } from "./locale-provider";
import { fill } from "@/lib/i18n";
import { track } from "@vercel/analytics/react";
import { WhatsAppIcon } from "./whatsapp";
import { waHref } from "@/lib/site-settings";

type Status = "idle" | "sending" | "success" | "error";
type ErrorKey = "name" | "email" | "cls" | "generic";

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white/90 px-4 py-3 text-sm text-ink placeholder:text-inksoft/50 focus:border-rosedeep focus:outline-none transition-colors";

/** Official studio WhatsApp — the float widget uses the same number. */
const STUDIO_WA_NUMBER = "+62 823-3957-0355";

/** Paket bundles (ROADMAP Langkah 7) — built ONLY from official studio
 * facts (class names, durations, group limits, no-upfront-payment policy).
 * Prices are never invented: the studio confirms them personally. */
const PAKET: Record<string, {
  kicker: string;
  heading: string;
  note: string;
  waCta: string;
  waText: string;
  cards: { title: string; sub: string; inc: string[]; cls: string; pax: string; cta: string }[];
}> = {
  en: {
    kicker: "Packages",
    heading: "Three easy ways to create with us",
    note: "Prices are confirmed personally by Ms. Elin — no upfront payment. Every enquiry gets a personal reply.",
    waCta: "Ask via WhatsApp",
    waText: "Hi Elin! I'd like to ask about a class package at Elchí Studio Bali.",
    cards: [
      {
        title: "Solo Escape",
        sub: "One guest · any class",
        inc: ["Pick 1 of 6 creative classes (60–110 min)", "Guided hands-on by Elin Kim — 19 years of teaching", "All skill levels, zero experience needed"],
        cls: "travel-drawing", pax: "1", cta: "Fill the form",
      },
      {
        title: "Duo & Couples",
        sub: "Two guests · one session",
        inc: ["Create side by side in the same class", "Bring photos on your phone to personalise your artwork", "Postcards: pick 3 designs — the studio mails your letters later as a surprise"],
        cls: "postcards", pax: "2", cta: "Fill the form",
      },
      {
        title: "Group & Team Building",
        sub: "Private group · up to 50 guests",
        inc: ["Hen's parties, birthdays & corporate team building", "Private 1:1 (90 min) tailored to your idea", "Elin has taught groups of up to 50"],
        cls: "private-group", pax: "10", cta: "Fill the form",
      },
    ],
  },
  id: {
    kicker: "Paket",
    heading: "Tiga cara mudah berkarya bersama kami",
    note: "Harga dikonfirmasi langsung oleh Ms. Elin — tanpa pembayaran di muka. Setiap pertanyaan dijawab personal.",
    waCta: "Tanya via WhatsApp",
    waText: "Halo Elin! Aku ingin tanya soal paket kelas di Elchí Studio Bali.",
    cards: [
      {
        title: "Solo Escape",
        sub: "Satu tamu · satu kelas",
        inc: ["Pilih 1 dari 6 kelas kreatif (60–110 menit)", "Dipandu langsung Elin Kim — 19 tahun mengajar", "Semua tingkat, tanpa pengalaman"],
        cls: "travel-drawing", pax: "1", cta: "Isi form-nya",
      },
      {
        title: "Duo & Pasangan",
        sub: "Dua tamu · satu sesi",
        inc: ["Berkarya berdampingan di kelas yang sama", "Bawa foto di ponselmu untuk personalisasi karya", "Postcards: pilih 3 desain — suratmu dikirim surprise nanti"],
        cls: "postcards", pax: "2", cta: "Isi form-nya",
      },
      {
        title: "Grup & Team Building",
        sub: "Grup privat · hingga 50 orang",
        inc: ["Hen's party, ulang tahun & team building kantor", "Private 1:1 (90 menit) sesuai idemu", "Elin pernah mengajar grup hingga 50 orang"],
        cls: "private-group", pax: "10", cta: "Isi form-nya",
      },
    ],
  },
  ko: {
    kicker: "패키지",
    heading: "함께 만들기, 세 가지 방법",
    note: "가격은 Ms. Elin이 직접 안내합니다 — 선결제 없음. 모든 문의에 개별 답장드려요.",
    waCta: "WhatsApp로 문의",
    waText: "안녕하세요 Elin! Elchí Studio Bali 클래스 패키지에 대해 문의하고 싶어요.",
    cards: [
      {
        title: "Solo Escape",
        sub: "1인 · 원하는 클래스",
        inc: ["6가지 크리에이티브 클래스 중 선택 (60–110분)", "19년 경력 Elin Kim의 직접 지도", "모든 수준 환영 — 경험 필요 없음"],
        cls: "travel-drawing", pax: "1", cta: "신청서 작성",
      },
      {
        title: "Duo & Couples",
        sub: "2인 · 같은 세션",
        inc: ["같은 클래스에서 나란히 작품 만들기", "휴대폰 사진을 가져오면 작품에 담아드려요", "Postcards: 3가지 디자인 선택 — 편지는 나중에 서프라이즈로 발송"],
        cls: "postcards", pax: "2", cta: "신청서 작성",
      },
      {
        title: "Group & Team Building",
        sub: "프라이빗 그룹 · 최대 50명",
        inc: ["Hens party, 생일 파티 & 기업 워크숍", "Private 1:1 (90분) 맞춤 클래스", "Elin은 최대 50명 그룹 강의 경험 보유"],
        cls: "private-group", pax: "10", cta: "신청서 작성",
      },
    ],
  },
  zh: {
    kicker: "套餐",
    heading: "三种轻松的创作方式",
    note: "价格由 Elin 女士亲自确认——无需预付。每一份咨询都会得到亲自回复。",
    waCta: "WhatsApp 咨询",
    waText: "你好 Elin！我想咨询 Elchí Studio Bali 的课程套餐。",
    cards: [
      {
        title: "单人时光",
        sub: "一位嘉宾 · 任选课程",
        inc: ["从6个创意课程中任选一课（60–110分钟）", "由拥有19年教学经验的 Elin Kim 亲自指导", "所有水平欢迎，零经验也没问题"],
        cls: "travel-drawing", pax: "1", cta: "填写表格",
      },
      {
        title: "双人与情侣",
        sub: "两位嘉宾 · 同一节课堂",
        inc: ["在同一堂课中并肩创作", "带上手机里的照片，为作品注入个人故事", "Postcards：挑选3款设计——你的信稍后会以惊喜方式寄出"],
        cls: "postcards", pax: "2", cta: "填写表格",
      },
      {
        title: "团体与团建",
        sub: "私人团体 · 最多50人",
        inc: ["单身派对、生日庆祝与企业团建", "私人一对一（90分钟）按你的想法定制", "Elin 曾教授多达50人的团体"],
        cls: "private-group", pax: "10", cta: "填写表格",
      },
    ],
  },
};

/** Map server error codes to localized copy. */
function errorCode(status: number, code: string | undefined): ErrorKey {
  if (code === "invalid_name") return "name";
  if (code === "invalid_email") return "email";
  if (code === "invalid_class") return "cls";
  if (status === 400) return "generic";
  return "generic";
}

/**
 * Booking — the enquiry & reservation engine.
 * Posts to /api/bookings (Prisma + SQLite) with localized validation
 * messages. Confirmation is animated with a torn-paper confetti burst.
 */
export function Booking() {
  const { classes, privates } = useContent();
  const { d, locale } = useSite();
  const t = d.booking;

  const options = useMemo(
    () => [
      ...classes.map((c) => ({ value: c.slug, name: c.name, label: `${c.name} · ${c.duration}` })),
      ...privates.map((p) => ({ value: p.slug, name: p.name, label: p.optionLabel })),
    ],
    [classes, privates]
  );

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    classType: "travel-drawing",
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
      if (!res.ok) {
        throw new Error(JSON.stringify({ s: res.status, c: data.code }));
      }
      setStatus("success");
      track("booking_submit");
    } catch (err) {
      setStatus("error");
      let key: ErrorKey = "generic";
      try {
        if (err instanceof Error) {
          const parsed = JSON.parse(err.message) as { s: number; c?: string };
          key = errorCode(parsed.s, parsed.c);
        }
      } catch {
        key = "generic";
      }
      setErrorMsg(t.errors[key]);
    }
  }

  const selectedName =
    options.find((o) => o.value === form.classType)?.name.split(" · ")[0] ?? "";

  const P = PAKET[locale] ?? PAKET.en;

  // Pre-fill from URL (?cls=dog-keychain&pax=3) — used by paket CTAs & shared links.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const cls = q.get("cls");
    const pax = q.get("pax");
    setForm((f) => ({
      ...f,
      classType: cls && options.some((o) => o.value === cls) ? cls : f.classType,
      participants:
        pax && Number(pax) >= 1 && Number(pax) <= 50 ? String(Math.floor(Number(pax))) : f.participants,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Paket CTA — fill the form and glide to it (Langkah 7). */
  function applyPaket(cls: string, pax: string) {
    setForm((f) => ({ ...f, classType: cls, participants: pax }));
    track("paket_select");
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section id="booking" aria-label={t.aria} className="relative bg-rose">
      <div aria-hidden>
        <TornPaper fill="#f9edde" height={44} className="rotate-180" />
      </div>

      {/* Paket populer (ROADMAP Langkah 7) — real classes, honest pricing note */}
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
        <Reveal>
          <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-cream/80">
            {P.kicker}
          </p>
          <h3 className="mt-3 font-display text-3xl font-black text-cream sm:text-4xl">
            {P.heading}
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {P.cards.map((c) => (
            <Reveal key={c.title} delay={0.06}>
              <div className="flex h-full flex-col rounded-3xl bg-cream p-6 shadow-[0_20px_50px_rgba(52,35,28,0.25)]">
                <p className="font-script text-2xl text-rosedeep">{c.title}</p>
                <p className="mt-1 font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                  {c.sub}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink">
                  {c.inc.map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <span className="mt-0.5 text-blush" aria-hidden>
                        ✦
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => applyPaket(c.cls, c.pax)}
                    className="rounded-full bg-rosedeep px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    {c.cta}
                  </button>
                  <a
                    href={waHref(STUDIO_WA_NUMBER, `${P.waText} (${c.title})`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-blushlight"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" aria-hidden />
                    {P.waCta}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-sm italic text-cream/85">{P.note}</p>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
          <div className="text-cream">
            <Reveal>
              <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-cream/80">
                {t.kicker}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
                {t.h2.a}{" "}
                <span className="font-script text-[1.1em] font-normal text-ink">
                  {t.h2.script}
                </span>{" "}
                {t.h2.b}
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/90">
                {t.sub}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-4 text-cream/90">
                {t.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream/20 font-monobrand text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
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
                      {t.successTitle}
                    </h3>
                    <p className="mt-3 max-w-sm leading-relaxed text-inksoft">
                      {fill(t.successBody, { name: selectedName })}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-8 rounded-full border-2 border-ink px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                    >
                      {t.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    id="booking-form"
                    onSubmit={submit}
                    className="space-y-4"
                    aria-label={t.formAria}
                  >
                    <div className="flex items-center gap-2">
                      <CalendarHeart className="h-5 w-5 text-rosedeep" aria-hidden />
                      <h3 className="font-display text-xl font-bold text-ink">
                        {t.formTitle}
                      </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bk-name" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          {t.labels.name}
                        </label>
                        <input
                          id="bk-name" required minLength={2} maxLength={80}
                          value={form.name} onChange={set("name")}
                          className={inputCls} placeholder={t.ph.name}
                          autoComplete="name"
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-email" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          {t.labels.email}
                        </label>
                        <input
                          id="bk-email" required type="email"
                          value={form.email} onChange={set("email")}
                          className={inputCls} placeholder={t.ph.email}
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bk-phone" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                          {t.labels.phone} <span className="normal-case tracking-normal">{t.labels.phoneOpt}</span>
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
                          {t.labels.date}
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
                        {t.labels.cls}
                      </label>
                      <select
                        id="booking-class-select" required
                        value={form.classType} onChange={set("classType")}
                        className={inputCls}
                      >
                        {options.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="bk-participants" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                        {t.labels.participants}
                      </label>
                      <input
                        id="bk-participants" type="number" min={1} max={50}
                        value={form.participants} onChange={set("participants")}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label htmlFor="bk-message" className="mb-1.5 block font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                        {t.labels.message} <span className="normal-case tracking-normal">{t.labels.messageOpt}</span>
                      </label>
                      <textarea
                        id="bk-message" rows={3} maxLength={1000}
                        value={form.message} onChange={set("message")}
                        className={inputCls}
                        placeholder={t.ph.message}
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
                            {t.sending}
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" aria-hidden />
                            {t.submit}
                          </>
                        )}
                      </button>
                    </Magnetic>
                    <p className="text-center text-xs text-inksoft/70">
                      {t.noPay}
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
