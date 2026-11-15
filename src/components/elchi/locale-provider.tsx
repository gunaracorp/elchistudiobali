"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  DICTS,
  DEFAULT_LOCALE,
  LOCALE_CODES,
  STORAGE_KEY,
  classList,
  galleryShots,
  privateList,
  type Locale,
} from "@/lib/i18n";
import type { Dict, LocaleData } from "@/lib/i18n/types";
import { STAT_VALUES } from "@/lib/classes-data";

type SiteCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Localized interface strings (nav, hero, booking, footer…). */
  d: Dict;
  /** Localized content data (classes, privates, elin, faqs, gallery). */
  data: LocaleData;
  /** Canonical stat values paired with localized labels. */
  stats: { value: string; label: string }[];
};

const LocaleCtx = createContext<SiteCtx | null>(null);

function isLocale(v: unknown): v is Locale {
  return v === "en" || v === "id" || v === "ko";
}

/**
 * LocaleProvider — the trilingual engine (ID · EN · 한국어).
 * SSR always renders English; after mount the stored or detected
 * browser locale is applied while the branded loader is still on
 * screen, so there is no visible flash and no hydration mismatch.
 * Explicit switching plays a soft watercolour curtain wipe
 * (skipped for prefers-reduced-motion users, lens D6).
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [wipe, setWipe] = useState<"idle" | "cover" | "reveal">("idle");
  const reduce = useReducedMotion();

  // First visit: restore saved preference, else detect browser language.
  // Deferred one frame (house pattern, cf. useMounted) so hydration
  // always matches the server-rendered English shell.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      let initial: Locale | null = null;
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLocale(saved)) initial = saved;
      } catch {
        /* storage unavailable — fall through to detection */
      }
      if (!initial) {
        const lang = (navigator.language || "").toLowerCase();
        if (lang.startsWith("id")) initial = "id";
        else if (lang.startsWith("ko")) initial = "ko";
      }
      if (initial && initial !== DEFAULT_LOCALE) setLocaleState(initial);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep the document language attribute in sync (a11y + translation tools).
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (!LOCALE_CODES.includes(next)) return;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* non-fatal */
      }
      if (reduce || next === locale) {
        setLocaleState(next);
        return;
      }
      setWipe("cover");
      window.setTimeout(() => {
        setLocaleState(next);
        setWipe("reveal");
        window.setTimeout(() => setWipe("idle"), 700);
      }, 400);
    },
    [locale, reduce]
  );

  const value = useMemo<SiteCtx>(() => {
    const data = DICTS[locale];
    return {
      locale,
      setLocale,
      d: data.chrome,
      data,
      stats: STAT_VALUES.map((value, i) => ({ value, label: data.chrome.hero.statsLabels[i] })),
    };
  }, [locale, setLocale]);

  return (
    <LocaleCtx.Provider value={value}>
      {children}
      {/* Watercolour curtain wipe on language switch */}
      <AnimatePresence>
        {wipe !== "idle" && (
          <motion.div
            key={wipe}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[130]"
            initial={wipe === "cover" ? { y: "-100%" } : { y: "0%" }}
            animate={{ y: wipe === "cover" ? "0%" : "100%" }}
            exit={wipe === "cover" ? { y: "0%" } : { y: "100%" }}
            transition={
              wipe === "cover"
                ? { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
            }
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(118deg, #fde9ef 0%, #f9cbd9 34%, #e75a87 62%, #ff8a5e 84%, #ffc24d 100%)",
              }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-script text-6xl text-white drop-shadow-[0_6px_18px_rgba(201,58,108,0.35)]"
              initial={wipe === "cover" ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
              animate={wipe === "cover" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
              transition={{ duration: 0.35 }}
            >
              Elchí
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </LocaleCtx.Provider>
  );
}

/** Site-wide locale hook — the single entry point for localized content. */
export function useSite(): SiteCtx {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error("useSite must be used inside <LocaleProvider>");
  return ctx;
}

/** Live localized lists (classes, privates, gallery) for the active locale. */
export function useContent() {
  const { locale } = useSite();
  return useMemo(
    () => ({
      classes: classList(locale),
      privates: privateList(locale),
      gallery: galleryShots(locale),
    }),
    [locale]
  );
}
