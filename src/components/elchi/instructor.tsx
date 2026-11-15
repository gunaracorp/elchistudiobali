"use client";

import Image from "next/image";
import { GraduationCap, BadgeCheck, Briefcase, Globe2, Star } from "lucide-react";
import { ELIN } from "@/lib/classes-data";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, SmileSticker, SparkleSticker } from "./torn";
import { useSite } from "./locale-provider";

/**
 * Instructor — Elin Kim's verified profile.
 * Education, certifications and experience are reproduced from her
 * official brochure and localized; institution names keep their
 * original spellings (proper nouns).
 */
export function Instructor() {
  const { d, data } = useSite();
  const t = d.instructor;
  const e = data.elin;

  return (
    <section id="instructor" aria-label={t.aria} className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-28">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* Portrait column */}
          <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
            <Reveal>
              <div className="relative mx-auto aspect-square w-[86%]">
                <div
                  className="absolute -inset-3 animate-spin-slow rounded-full border-2 border-dashed border-rose/50"
                  aria-hidden
                />
                <div className="absolute -inset-8 rounded-full bg-blushlight/70 blur-2xl" aria-hidden />
                <Image
                  src="/images/elin-portrait.png"
                  alt={t.portraitAlt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 400px"
                  className="rounded-full object-cover shadow-[0_24px_60px_rgba(52,35,28,0.25)]"
                  priority={false}
                />
                <div className="absolute -right-2 top-4 w-14 animate-floaty sm:w-16" aria-hidden>
                  <SmileSticker className="w-full drop-shadow" />
                </div>
                <div className="absolute -left-4 bottom-10 w-10 animate-floaty" aria-hidden style={{ "--float-rot": "-14deg" } as React.CSSProperties}>
                  <SparkleSticker className="w-full" color="#8fcfe4" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 text-center">
                <p className="font-script text-3xl text-rosedeep">{ELIN.name}</p>
                <p className="mt-1 font-monobrand text-[11px] uppercase tracking-[0.3em] text-inksoft">
                  {e.role}
                </p>
                <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-sun/25 px-5 py-2 text-sm font-semibold text-[#7a5205]">
                  <Star className="h-4 w-4 fill-current" aria-hidden />
                  {e.reviewsLine}
                </p>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-inksoft">
                  <Globe2 className="h-4 w-4 text-palm" aria-hidden />
                  {e.languagesLine}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Bio column */}
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

            <div className="mt-7 space-y-5">
              {e.bio.map((p, i) => (
                <Reveal key={i} delay={0.12 + i * 0.06}>
                  <p className="text-lg leading-relaxed text-inksoft">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white/70 p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                    <GraduationCap className="h-5 w-5 text-rosedeep" aria-hidden />
                    {t.education}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {ELIN.education.map((ed) => (
                      <li key={ed.year} className="text-sm leading-snug text-inksoft">
                        <span className="mr-2 font-monobrand text-xs font-bold text-terra">
                          {ed.year}
                        </span>
                        {ed.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="h-full rounded-2xl border border-ink/8 bg-white/70 p-6">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                    <BadgeCheck className="h-5 w-5 text-palm" aria-hidden />
                    {t.certifications}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {e.certifications.map((c) => (
                      <li key={c.year} className="text-sm leading-snug text-inksoft">
                        <span className="mr-2 font-monobrand text-xs font-bold text-palm">
                          {c.year}
                        </span>
                        {c.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-6">
              <div className="rounded-2xl border border-ink/8 bg-white/70 p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Briefcase className="h-5 w-5 text-sky" aria-hidden />
                  {t.journey}
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {e.experience.map((ex) => (
                    <li key={ex.text} className="text-sm leading-snug text-inksoft">
                      <span className="mr-2 font-monobrand text-xs font-bold text-[#2e7d9e]">
                        {ex.year}
                      </span>
                      {ex.text}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Client wall — plain text, factual from brochure */}
            <Reveal delay={0.24} className="mt-10">
              <div className="rounded-2xl bg-ink p-7 text-cream sm:p-8">
                <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">
                  {t.clientsKicker}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label={t.clientsAria}>
                  {ELIN.clients.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-cream/20 px-4 py-1.5 font-display text-sm font-semibold text-cream/90 transition-colors duration-300 hover:border-blush hover:text-blush"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div aria-hidden>
        <TornPaper fill="#f9edde" height={44} />
      </div>
    </section>
  );
}
