"use client";

import { motion } from "framer-motion";
import { LOCALES_LABELS } from "@/lib/i18n";
import { useSite } from "./locale-provider";
import { cn } from "@/lib/utils";

/**
 * LanguageSwitcher — ID · EN · 한국어 pill group with a sliding
 * watercolour indicator. `variant` adapts it to light (cream nav)
 * or dark (ink overlay) surfaces. Switching plays the site-wide
 * curtain wipe from LocaleProvider.
 */
export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { locale, setLocale } = useSite();
  const dark = variant === "dark";

  return (
    <div
      role="group"
      aria-label="Language — Bahasa Indonesia, English, 한국어"
      className={cn(
        "inline-flex items-center rounded-full p-0.5 whitespace-nowrap",
        dark ? "border border-cream/25 bg-cream/5" : "border border-ink/15 bg-cream/70 backdrop-blur-sm"
      )}
    >
      {LOCALES_LABELS.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={active}
            title={l.label}
            className={cn(
              "relative rounded-full px-2.5 py-1 font-monobrand text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-300",
              active
                ? dark
                  ? "text-ink"
                  : "text-cream"
                : dark
                  ? "text-cream/55 hover:text-cream"
                  : "text-inksoft hover:text-ink"
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${variant}`}
                className={cn("absolute inset-0 rounded-full", dark ? "bg-cream" : "bg-ink")}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                aria-hidden
              />
            )}
            <span className="relative z-10">{l.native}</span>
          </button>
        );
      })}
    </div>
  );
}
