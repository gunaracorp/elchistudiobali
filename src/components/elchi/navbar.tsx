"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, CalendarHeart } from "lucide-react";
import { useSite } from "./locale-provider";
import { LanguageSwitcher } from "./language-switcher";
import { Magnetic } from "./motion";
import { cn } from "@/lib/utils";

/**
 * Navbar — floating brand bar. Transparent over the hero, blush glass
 * after scroll, full-screen editorial overlay on mobile.
 * Carries the trilingual switcher (ID · EN · 한국어).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { d } = useSite();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, open ? 350 : 0);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          scrolled ? "bg-cream/85 shadow-[0_8px_30px_rgba(52,35,28,0.08)] backdrop-blur-md" : "bg-transparent"
        )}
      >
        <nav
          aria-label={d.meta.mainNav}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-8"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="group flex items-baseline gap-2"
            aria-label="Elchí Studio Bali — back to top"
          >
            <span className="font-script text-[26px] leading-none text-rosedeep transition-transform duration-300 group-hover:-rotate-3">
              Elchí
            </span>
            <span className="hidden font-monobrand text-[9px] tracking-[0.4em] text-inksoft sm:inline">
              STUDIO&nbsp;BALI
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {d.navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="link-sweep pb-1 font-monobrand text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-rosedeep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:inline-block">
              <LanguageSwitcher variant="light" />
            </div>
            <Magnetic className="hidden sm:inline-block">
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  go("#booking");
                }}
                className="inline-flex items-center gap-2 rounded-full bg-rosedeep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(201,58,108,0.35)] transition-transform duration-300 hover:scale-[1.04]"
              >
                <CalendarHeart className="h-4 w-4" aria-hidden />
                {d.meta.bookCta}
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-cream/70 text-ink lg:hidden"
              aria-label={d.meta.openMenu}
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-ink text-cream"
            initial={{ clipPath: "circle(0% at 92% 6%)" }}
            animate={{ clipPath: "circle(140% at 92% 6%)" }}
            exit={{ clipPath: "circle(0% at 92% 6%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={d.meta.menuDialog}
          >
            <div className="flex h-16 items-center justify-between px-5 sm:h-[72px] sm:px-8">
              <span className="font-script text-2xl text-blush">Elchí</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream"
                aria-label={d.meta.closeMenu}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {d.navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className="group flex items-baseline gap-4 py-2"
                  >
                    <span className="font-monobrand text-xs text-rose">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl font-semibold transition-transform duration-300 group-hover:translate-x-2 group-hover:text-blush sm:text-5xl">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + d.navLinks.length * 0.07, duration: 0.5 }}
                className="mt-6"
              >
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    go("#booking");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-base font-semibold text-white"
                >
                  <CalendarHeart className="h-5 w-5" aria-hidden />
                  {d.meta.bookCta}
                </a>
              </motion.li>
            </ul>
            <div className="flex flex-col gap-4 px-8 pb-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="shrink-0">
                <LanguageSwitcher variant="dark" />
              </div>
              <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-cream/50 sm:text-right">
                {d.meta.menuTag}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
