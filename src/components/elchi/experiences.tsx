"use client";

import Image from "next/image";
import { PartyPopper, UserRound, ArrowRight } from "lucide-react";
import { PRIVATE_EXPERIENCES } from "@/lib/classes-data";
import { Reveal, Magnetic } from "./motion";
import { TornPaper, SparkleSticker, PalmSticker } from "./torn";

const ICONS = [PartyPopper, UserRound];

/**
 * Experiences — cinematic ink section for Private Group & Private 1:1.
 * Verbatim-derived from the official brochure copy.
 */
export function Experiences() {
  const goBooking = (slug: string) => {
    const sel = document.querySelector<HTMLSelectElement>("#booking-class-select");
    if (sel) sel.value = slug;
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="experiences" aria-label="Private workshops and experiences" className="relative bg-ink text-cream">
      <div aria-hidden>
        <TornPaper fill="#f9edde" height={44} className="rotate-180" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-blush">
              Workshops &amp; experiences
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">
              Make it a{" "}
              <span className="font-script text-[1.1em] font-normal text-blush">
                special occasion
              </span>{" "}
              to remember
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              Looking for a unique way to celebrate, connect or get creative
              together? Two private formats, one studio full of aloha.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          {PRIVATE_EXPERIENCES.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.slug} delay={i * 0.12}>
                <article
                  data-cursor
                  className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-cream/10 bg-[#3f2c24] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.name} at Elchí Studio Bali`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3f2c24] via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 font-monobrand text-[10px] font-bold uppercase tracking-[0.16em] text-ink backdrop-blur">
                      <Icon className="h-4 w-4 text-rosedeep" aria-hidden />
                      {p.name}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <h3 className="font-display text-3xl font-bold leading-tight text-cream">
                      {p.lead}
                    </h3>
                    <p className="mt-4 leading-relaxed text-cream/75">{p.body}</p>
                    {"extra" in p && p.extra && (
                      <p className="mt-3 font-monobrand text-xs uppercase tracking-[0.2em] text-blush">
                        {p.extra}
                      </p>
                    )}
                    <p className="mt-4 rounded-xl bg-cream/8 p-4 text-sm leading-relaxed text-cream/85">
                      {p.how}
                    </p>
                    <div className="mt-auto pt-6">
                      <Magnetic>
                        <button
                          type="button"
                          onClick={() => goBooking(p.slug)}
                          className="inline-flex items-center gap-2 rounded-full bg-blush px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:bg-rose hover:text-white"
                        >
                          Enquire for {p.name.toLowerCase()}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </button>
                      </Magnetic>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15} className="mt-16">
          <p className="text-center font-script text-2xl text-blush sm:text-3xl">
            &ldquo;Let&apos;s make something memorable together.&rdquo;
          </p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-24 right-6 hidden w-16 animate-floaty opacity-80 lg:block" aria-hidden>
        <SparkleSticker className="w-full" color="#f9cbd9" />
      </div>
      <div className="pointer-events-none absolute left-4 top-40 hidden w-14 animate-floaty opacity-70 lg:block" aria-hidden style={{ "--float-rot": "-12deg" } as React.CSSProperties}>
        <PalmSticker className="w-full" />
      </div>

      <div aria-hidden>
        <TornPaper fill="#fff8f0" height={44} />
      </div>
    </section>
  );
}
