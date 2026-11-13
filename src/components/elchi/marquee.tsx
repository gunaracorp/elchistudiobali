"use client";

import { CLASSES } from "@/lib/classes-data";

/**
 * Marquee — infinite ticker of the official workshop names.
 * Rose ribbon, duplicated track for a seamless loop; decorative only.
 */
export function Marquee() {
  const items = CLASSES.map((c) => c.name).concat([
    "Private 1:1",
    "Private Groups",
  ]);
  const row = [...items, ...items];

  return (
    <section aria-label="Our workshops" className="relative z-10 -mt-1 overflow-hidden bg-rose py-4 sm:py-5">
      <div className="flex w-max animate-marquee items-center gap-8 pr-8">
        {row.map((name, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap" aria-hidden={i >= items.length}>
            <span className="font-display text-xl font-semibold uppercase tracking-wide text-cream sm:text-2xl">
              {name}
            </span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-ink" aria-hidden>
              <path
                d="M12 2 C13.2 8 16 10.8 22 12 C16 13.2 13.2 16 12 22 C10.8 16 8 13.2 2 12 C8 10.8 10.8 8 12 2 Z"
                fill="currentColor"
              />
            </svg>
          </span>
        ))}
      </div>
    </section>
  );
}
