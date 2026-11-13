"use client";

import Image from "next/image";
import { Clock, Backpack, Info } from "lucide-react";
import { CLASSES } from "@/lib/classes-data";
import { Reveal, Magnetic } from "./motion";
import { TornPaper, FlowerSticker } from "./torn";

const ACCENT: Record<string, { chip: string; bar: string; glow: string }> = {
  sky:   { chip: "bg-sky/30 text-[#2e7d9e]",   bar: "bg-sky",   glow: "group-hover:shadow-[0_22px_50px_rgba(143,207,228,0.45)]" },
  coral: { chip: "bg-coral/25 text-[#b45324]", bar: "bg-coral", glow: "group-hover:shadow-[0_22px_50px_rgba(255,138,94,0.45)]" },
  sun:   { chip: "bg-sun/30 text-[#9a6b10]",   bar: "bg-sun",   glow: "group-hover:shadow-[0_22px_50px_rgba(255,194,77,0.5)]" },
  terra: { chip: "bg-terra/20 text-terra",     bar: "bg-terra", glow: "group-hover:shadow-[0_22px_50px_rgba(201,111,74,0.45)]" },
  palm:  { chip: "bg-palm/20 text-[#2e6e4e]",  bar: "bg-palm",  glow: "group-hover:shadow-[0_22px_50px_rgba(78,158,116,0.45)]" },
  blush: { chip: "bg-blush text-rosedeep",     bar: "bg-rose",  glow: "group-hover:shadow-[0_22px_50px_rgba(231,90,135,0.45)]" },
};

/**
 * Classes — the six official workshops as interactive editorial cards.
 * All copy is verbatim-derived from the Elchí class brochure.
 */
export function Classes() {
  return (
    <section id="classes" aria-label="Classes and programs" className="relative bg-paper">
      <div aria-hidden>
        <TornPaper fill="#fff8f0" height={44} className="rotate-180" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
                Classes &amp; programs
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 max-w-xl font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Pick your{" "}
                <span className="font-script text-[1.1em] font-normal text-rosedeep">
                  kind of magic
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-inksoft">
                Six signature workshops, every one of them beginner-friendly and
                guided step by step. All skill levels welcome.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Magnetic>
              <a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-ink hover:text-cream"
              >
                Reserve your spot
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSES.map((c, i) => {
            const a = ACCENT[c.accent];
            return (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.1} className="h-full">
                <article
                  data-cursor
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_6px_24px_rgba(52,35,28,0.07)] transition-all duration-500 hover:-translate-y-2 ${a.glow}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={c.image}
                      alt={`${c.name} workshop at Elchí Studio Bali`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:rotate-[1.2deg]"
                    />
                    <span
                      className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-monobrand text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm ${a.chip}`}
                    >
                      <Clock className="h-3 w-3" aria-hidden />
                      {c.duration}
                    </span>
                    <span className={`absolute inset-x-0 bottom-0 h-1.5 ${a.bar}`} aria-hidden />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-2xl font-bold text-ink">{c.name}</h3>
                    <p className="mt-1 font-script text-lg text-rosedeep">{c.tagline}</p>
                    <p className="mt-3 text-sm leading-relaxed text-inksoft">{c.description}</p>

                    {c.bring && (
                      <p className="mt-4 flex items-start gap-2 rounded-xl bg-paper px-3.5 py-2.5 text-xs leading-relaxed text-inksoft">
                        <Backpack className="mt-0.5 h-4 w-4 shrink-0 text-terra" aria-hidden />
                        <span>
                          <strong className="font-semibold text-ink">What to bring:</strong> {c.bring}
                        </span>
                      </p>
                    )}
                    {c.note && (
                      <p className="mt-4 flex items-start gap-2 rounded-xl bg-blushlight px-3.5 py-2.5 text-xs leading-relaxed text-inksoft">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-hidden />
                        <span>{c.note}</span>
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      <a
                        href="#booking"
                        onClick={(e) => {
                          e.preventDefault();
                          const sel = document.querySelector<HTMLSelectElement>("#booking-class-select");
                          if (sel) sel.value = c.slug;
                          document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="link-sweep inline-flex items-center gap-1.5 pb-0.5 text-sm font-semibold text-rosedeep"
                        aria-label={`Book the ${c.name} workshop`}
                      >
                        Book {c.name}
                        <span aria-hidden>→</span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-ink px-8 py-10 text-center text-cream sm:px-12">
            <div className="absolute -left-6 -top-6 w-20 opacity-70" aria-hidden>
              <FlowerSticker className="w-full" />
            </div>
            <p className="font-monobrand text-[10px] uppercase tracking-[0.35em] text-blush">
              Can&apos;t find a date or a class you like?
            </p>
            <p className="mx-auto mt-3 max-w-2xl font-display text-2xl font-bold leading-snug sm:text-3xl">
              Every workshop can become a{" "}
              <span className="font-script text-[1.15em] font-normal text-blush">private</span>{" "}
              experience — tailored just for you.
            </p>
            <Magnetic className="mt-7">
              <a
                href="#experiences"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#experiences")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-rose px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105"
              >
                Discover private experiences ↓
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
