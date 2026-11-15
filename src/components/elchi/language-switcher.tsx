"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { LOCALES_LABELS } from "@/lib/i18n";
import { useSite } from "./locale-provider";
import { cn } from "@/lib/utils";

/**
 * LanguageMenu — a globe button with an elegant floating dropdown
 * (ID · EN · 한국어). Lives in the navbar (light variant over cream
 * glass, dark variant inside the mobile overlay). Switching plays the
 * site-wide curtain wipe from LocaleProvider. Closes on outside
 * click / Escape / selection; fully keyboard & screen-reader friendly.
 */
export function LanguageMenu({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dark = variant === "dark";

  const active = LOCALES_LABELS.find((l) => l.code === locale) ?? LOCALES_LABELS[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {/* Globe trigger — matches the circular ghost buttons of the navbar */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language — ${active.label}`}
        title={active.label}
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 transition-all duration-300",
          dark
            ? "border border-cream/25 bg-cream/5 text-cream hover:border-blush/70 hover:text-blush"
            : "border border-ink/15 bg-cream/70 text-ink shadow-[0_2px_10px_rgba(52,35,28,0.06)] backdrop-blur-sm hover:border-rose/60 hover:text-rosedeep",
          open && (dark ? "border-blush/70 text-blush" : "border-rose/60 text-rosedeep")
        )}
      >
        <Globe className={cn("h-4 w-4 transition-transform duration-500", open && "rotate-[360deg]")} aria-hidden />
        <span className="font-monobrand text-[10px] font-bold uppercase tracking-[0.14em]">
          {active.code === "ko" ? "KR" : active.code.toUpperCase()}
        </span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            aria-label="Language — Bahasa Indonesia, English, 한국어"
            initial={{ opacity: 0, y: -8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 460, damping: 30 }}
            className={cn(
              "absolute right-0 top-[calc(100%+10px)] z-50 w-60 origin-top-right overflow-hidden rounded-2xl border p-1.5",
              dark
                ? "border-cream/15 bg-ink shadow-[0_26px_60px_rgba(0,0,0,0.55)]"
                : "border-ink/10 bg-cream shadow-[0_26px_60px_rgba(52,35,28,0.20)]"
            )}
          >
            <p
              className={cn(
                "px-3.5 pb-1.5 pt-2 font-monobrand text-[9px] uppercase tracking-[0.3em]",
                dark ? "text-cream/40" : "text-inksoft/55"
              )}
            >
              Bahasa · Language · 언어
            </p>
            {LOCALES_LABELS.map((l) => {
              const isActive = locale === l.code;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setOpen(false);
                    if (!isActive) setLocale(l.code);
                  }}
                  className={cn(
                    "group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-200",
                    dark
                      ? isActive
                        ? "bg-cream/10 text-blush"
                        : "text-cream/75 hover:translate-x-0.5 hover:bg-cream/5 hover:text-cream"
                      : isActive
                        ? "bg-rose/10 text-rosedeep"
                        : "text-inksoft hover:translate-x-0.5 hover:bg-rose/5 hover:text-ink"
                  )}
                >
                  <span className="flex flex-col">
                    <span className="font-display text-sm font-semibold leading-tight">{l.label}</span>
                    <span className={cn("font-monobrand text-[9px] uppercase tracking-[0.25em]", dark ? "text-cream/40" : "text-inksoft/50")}>
                      {l.code === "id" ? "Bahasa Indonesia" : l.code === "en" ? "English" : "Korean"}
                    </span>
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 24 }}
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-full",
                          dark ? "bg-blush/20 text-blush" : "bg-rose/15 text-rosedeep"
                        )}
                        aria-hidden
                      >
                        <Check className="h-3.5 w-3.5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
