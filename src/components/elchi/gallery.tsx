"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, FlowerSticker } from "./torn";
import { useContent, useSite } from "./locale-provider";

type CmsShot = { id: string; src: string; caption: string };

/**
 * Gallery — interactive image grid with hover depth + lightbox.
 * Images managed from /admin appear first; when the studio hasn't
 * added any yet, the built-in editorial shots (localized alt/caption)
 * are shown. Click any image for the animated lightbox viewer.
 */
export function Gallery() {
  const { gallery } = useContent();
  const { d } = useSite();
  const t = d.gallery;
  const [cms, setCms] = useState<CmsShot[] | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setCms(data.images ?? []))
      .catch(() => setCms([]));
  }, []);

  const usingCms = !!cms && cms.length > 0;
  const shots = usingCms
    ? cms!.map((c, i) => ({
        src: c.src,
        alt: c.caption || `Elchí Studio Bali ${i + 1}`,
        caption: c.caption,
        span: i === 0 ? "sm:col-span-2 sm:row-span-2" : "",
        h: i === 0 ? "aspect-[4/3] sm:aspect-auto sm:h-full" : "aspect-square",
      }))
    : gallery;
  const captions = shots.map((s) => s.caption);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? i : (i - 1 + shots.length) % shots.length));
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % shots.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, shots.length]);

  return (
    <section id="gallery" aria-label={t.aria} className="relative bg-paper">
      <div aria-hidden>
        <TornPaper fill="#fff8f0" height={44} className="rotate-180" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
              {t.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              {t.h2.a}{" "}
              <span className="font-script text-[1.1em] font-normal text-rosedeep">
                {t.h2.script}
              </span>{" "}
              {t.h2.b}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-inksoft">
              {t.sub}
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 [grid-auto-rows:1fr]">
          {shots.map((s, i) => (
            <Reveal
              as="li"
              key={s.src + i}
              delay={(i % 4) * 0.07}
              className={`${s.span} min-h-0`}
            >
              <figure
                data-cursor
                onClick={() => setLightbox(i)}
                className={`group relative h-full w-full cursor-zoom-in overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(52,35,28,0.10)] ${s.h}`}
              >
                {usingCms ? (
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09]"
                  />
                ) : (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-3 top-3 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" aria-hidden>
                  <ZoomIn className="h-4 w-4" />
                </span>
                <figcaption className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="font-script text-xl text-cream drop-shadow">{s.caption}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-blushlight p-10 text-center">
            <div className="absolute -left-5 -bottom-5 w-20 opacity-80" aria-hidden>
              <FlowerSticker className="w-full" />
            </div>
            <ParallaxEl distance={20}>
              <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
                {t.cardTitle.a}{" "}
                <span className="font-script text-[1.15em] font-normal text-rosedeep">
                  {t.cardTitle.script}
                </span>{" "}
                {t.cardTitle.b}
              </p>
              <p className="mt-4 text-inksoft">{t.cardBody}</p>
            </ParallaxEl>
          </div>
        </Reveal>
      </div>

      {/* Lightbox — cinematic viewer */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.lightboxAria}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            <motion.figure
              className="relative max-h-[86svh] max-w-4xl"
              initial={{ scale: 0.85, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {usingCms ? (
                <img
                  src={shots[lightbox].src}
                  alt={shots[lightbox].alt}
                  className="max-h-[76svh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
                />
              ) : (
                <Image
                  src={shots[lightbox].src}
                  alt={shots[lightbox].alt}
                  width={1200}
                  height={900}
                  className="max-h-[76svh] w-auto max-w-full rounded-2xl object-contain shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
                />
              )}
              <figcaption className="mt-4 text-center font-script text-2xl text-blush">
                {captions[lightbox]}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label={t.closeAria}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            {shots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + shots.length) % shots.length);
                  }}
                  aria-label={t.prevAria}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10 sm:left-6"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % shots.length);
                  }}
                  aria-label={t.nextAria}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10 sm:right-6"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
