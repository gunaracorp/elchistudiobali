"use client";

import Image from "next/image";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, FlowerSticker } from "./torn";
import { useContent, useSite } from "./locale-provider";

/**
 * Gallery — interactive image grid with mask-reveal and hover depth.
 * Mix of authentic studio photos (from the brand brochures) and
 * brand-commissioned artwork; alt text & captions are localized.
 */
export function Gallery() {
  const { gallery } = useContent();
  const { d } = useSite();
  const t = d.gallery;

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
          {gallery.map((s, i) => (
            <Reveal
              as="li"
              key={s.src + i}
              delay={(i % 4) * 0.07}
              className={`${s.span} min-h-0`}
            >
              <figure
                data-cursor
                className={`group relative h-full w-full overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(52,35,28,0.10)] ${s.h}`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
    </section>
  );
}
