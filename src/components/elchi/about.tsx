"use client";

import Image from "next/image";
import { HeartHandshake, Users, Languages, Palette } from "lucide-react";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, SparkleSticker, SmileSticker } from "./torn";
import { useSite } from "./locale-provider";

const VALUE_ICONS = [HeartHandshake, Users, Palette, Languages];
const VALUE_TINTS = [
  "bg-blushlight text-rosedeep",
  "bg-sky/25 text-[#2e7d9e]",
  "bg-sun/25 text-[#9a6b10]",
  "bg-palm/20 text-[#2e6e4e]",
];

/**
 * About — the studio philosophy, sourced from Elin's own teaching letter.
 * Fully localized; the "3 languages" value now mirrors this very site.
 */
export function About() {
  const { d } = useSite();
  const t = d.about;

  return (
    <section id="about" aria-label={t.aria} className="relative bg-cream">
      <div aria-hidden className="rotate-180">
        <TornPaper fill="#e75a87" height={44} />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
                {t.kicker}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                {t.h2.a}{" "}
                <span className="font-script text-[1.1em] font-normal text-rosedeep">
                  {t.h2.script}
                </span>{" "}
                {t.h2.b}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 text-lg leading-relaxed text-inksoft">{t.p1}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 text-lg leading-relaxed text-inksoft">{t.p2}</p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {t.values.map((v, i) => {
                const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
                return (
                  <Reveal key={v.title} delay={0.1 + i * 0.07}>
                    <div className="group h-full rounded-2xl border border-ink/8 bg-white/60 p-5 shadow-[0_2px_12px_rgba(52,35,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(52,35,28,0.10)]">
                      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${VALUE_TINTS[i % VALUE_TINTS.length]}`}>
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 font-display text-lg font-bold text-ink">{v.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-inksoft">{v.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Collage */}
          <div className="relative">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(52,35,28,0.18)]">
                <Image
                  src="/images/gallery-studio.png"
                  alt={t.studioAlt}
                  width={1152}
                  height={864}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />
              </div>
            </Reveal>
            <ParallaxEl distance={40} className="absolute -bottom-10 -left-4 w-[46%] sm:-left-10">
              <div className="overflow-hidden rounded-[1.4rem] border-[6px] border-cream shadow-[0_18px_44px_rgba(52,35,28,0.22)]">
                <Image
                  src="/images/class-postcards.jpg"
                  alt={t.postcardsAlt}
                  width={840}
                  height={630}
                  className="h-auto w-full object-cover"
                />
              </div>
            </ParallaxEl>
            <div className="absolute -right-5 -top-8 w-16 animate-floaty sm:-right-8 sm:w-20" aria-hidden style={{ "--float-rot": "8deg" } as React.CSSProperties}>
              <SmileSticker className="w-full drop-shadow-[0_8px_12px_rgba(52,35,28,0.2)]" />
            </div>
            <div className="absolute -left-3 top-8 hidden w-10 animate-floaty lg:block" aria-hidden style={{ "--float-rot": "-10deg" } as React.CSSProperties}>
              <SparkleSticker className="w-full" color="#8fcfe4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
