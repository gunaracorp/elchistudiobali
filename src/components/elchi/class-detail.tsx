"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Backpack, Info, ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal, Magnetic } from "./motion";
import { useContent, useSite } from "./locale-provider";
import { useGo } from "./use-go";
import { PAGE_SEO } from "@/lib/seo";
import { fill } from "@/lib/i18n";

/**
 * ClassDetail — a dedicated, fully localized landing page for one
 * signature class (crawled as its own URL, rendered in the ?lang=
 * language). Internal links to the booking route and the sibling
 * classes keep crawlers (and humans) flowing through the site.
 */
export function ClassDetail({ slug }: { slug: string }) {
  const { classes } = useContent();
  const { d, locale } = useSite();
  const { go, hrefFor } = useGo();
  const c = classes.find((x) => x.slug === slug);
  if (!c) return null;
  const t = d.classesSec;
  const others = classes.filter((x) => x.slug !== slug);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
      <Reveal>
        <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
          Art Class · Kuta, Bali
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] text-ink sm:text-6xl">
          {c.name}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-3 font-script text-2xl text-rosedeep sm:text-3xl">{c.tagline}</p>
      </Reveal>
      <Reveal delay={0.14}>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush px-4 py-1.5 font-monobrand text-[10px] font-bold uppercase tracking-[0.14em] text-rosedeep">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {c.duration}
          </span>
          <span className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
            All skill levels · English · Français · 한국어
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.18}>
        <div className="relative mt-9 aspect-[16/9] overflow-hidden rounded-[1.6rem] shadow-[0_18px_50px_rgba(52,35,28,0.16)]">
          <Image
            src={c.image}
            alt={`${c.name} — creative workshop at Elchí Studio Bali`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={0.22}>
        <div className="mt-10 space-y-6 text-lg leading-relaxed text-inksoft">
          <p>{c.description}</p>
          {c.note && (
            <p className="flex items-start gap-3 rounded-2xl bg-blushlight px-5 py-4 text-base leading-relaxed text-inksoft">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-rose" aria-hidden />
              <span>{c.note}</span>
            </p>
          )}
          {c.bring && (
            <p className="flex items-start gap-3 rounded-2xl bg-paper px-5 py-4 text-base leading-relaxed text-inksoft">
              <Backpack className="mt-0.5 h-5 w-5 shrink-0 text-terra" aria-hidden />
              <span>
                <strong className="font-semibold text-ink">{t.bring}</strong> {c.bring}
              </span>
            </p>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.26}>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={hrefFor("#booking")}
              onClick={(e) => {
                e.preventDefault();
                go("#booking");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-rosedeep px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(201,58,108,0.4)] transition-all duration-300 hover:scale-[1.05]"
              aria-label={fill(t.ariaBookCta, { name: c.name })}
            >
              {fill(t.bookCta, { name: c.name })}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href={`/classes?lang=${locale}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-8 py-4 text-base font-semibold text-ink transition-colors duration-300 hover:bg-ink hover:text-cream"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              {PAGE_SEO.classes[locale].crumb}
            </Link>
          </Magnetic>
        </div>
      </Reveal>

      {/* Internal linking — the five sibling classes */}
      <Reveal delay={0.3}>
        <div className="mt-16">
          <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-inksoft/70">
            {t.kicker}
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/classes/${o.slug}?lang=${locale}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose/40 hover:shadow-[0_10px_28px_rgba(231,90,135,0.14)]"
                >
                  <span>
                    <span className="font-display text-base font-bold text-ink group-hover:text-rosedeep">
                      {o.name}
                    </span>
                    <span className="block font-monobrand text-[9px] uppercase tracking-[0.18em] text-inksoft/60">
                      {o.duration}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-rose" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
