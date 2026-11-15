"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Magnetic, StaggerWords, useMounted } from "./motion";
import { TornPaper, SunSticker, PalmSticker, SparkleSticker, FlowerSticker } from "./torn";
import { useSite } from "./locale-provider";

/**
 * Hero — cinematic entrance. Layered parallax over the brand artwork,
 * staggered editorial headline, floating sticker constellations.
 * Headline, badge, CTAs and stats are fully trilingual; changing the
 * language replays the stagger reveal (keyed by locale).
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { locale, d, stats } = useSite();
  const t = d.hero;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const parallaxOn = mounted && !reduce;

  return (
    <section
      ref={ref}
      id="home"
      aria-label={t.aria}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      {/* Parallax artwork layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={parallaxOn ? { y: bgY, scale: bgScale } : undefined}
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover saturate-[1.45] contrast-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/35 via-cream/10 to-cream" />
        <div className="absolute inset-0 paper-grain opacity-40" />
      </motion.div>

      {/* Floating stickers */}
      <motion.div
        className="pointer-events-none absolute left-[6%] top-[22%] -z-0 hidden w-20 md:block"
        initial={false}
        animate={parallaxOn ? { y: [0, -16, 0], rotate: [0, 6, 0] } : undefined}
        transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <PalmSticker className="w-full drop-shadow-[0_10px_14px_rgba(52,35,28,0.15)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[18%] hidden w-24 md:block"
        initial={false}
        animate={parallaxOn ? { y: [0, 14, 0], rotate: [0, -8, 0] } : undefined}
        transition={reduce ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        aria-hidden
      >
        <SunSticker className="w-full drop-shadow-[0_10px_14px_rgba(255,194,77,0.4)]" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[14%] top-[58%] hidden w-12 lg:block"
        initial={false}
        animate={parallaxOn ? { y: [0, -12, 0], scale: [1, 1.15, 1] } : undefined}
        transition={reduce ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden
      >
        <SparkleSticker className="w-full" color="#8fcfe4" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[24%] right-[16%] hidden w-14 lg:block"
        initial={false}
        animate={parallaxOn ? { y: [0, -10, 0], rotate: [0, 10, 0] } : undefined}
        transition={reduce ? undefined : { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        aria-hidden
      >
        <FlowerSticker className="w-full" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8"
        style={parallaxOn ? { y: contentY, opacity: fade } : undefined}
      >
        <motion.p
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/80 px-4 py-1.5 font-monobrand text-[10px] uppercase tracking-[0.3em] text-inksoft backdrop-blur-sm sm:text-[11px]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-rose" aria-hidden />
          {t.badge}
        </motion.p>

        <h1 className="max-w-5xl font-display text-[13vw] font-black leading-[0.98] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <StaggerWords key={`a-${locale}`} text={t.h1.a} delay={2.35} />
          <br />
          <span className="relative inline-block">
            <span className="font-script text-[1.18em] font-normal text-rose">
              <StaggerWords key={`s-${locale}`} text={t.h1.script} delay={2.75} />
            </span>
            <motion.svg
              key={`svg-${locale}`}
              viewBox="0 0 300 22"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute -bottom-1 left-0 h-[0.16em] w-full sm:-bottom-2"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 3.3, duration: 0.8, ease: "easeOut" }}
            >
              <path
                d="M4 15 Q 28 5, 54 13 T 106 13 T 158 12 T 210 12 T 296 10"
                fill="none"
                stroke="#e75a87"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>{" "}
          <StaggerWords key={`b-${locale}`} text={t.h1.b} delay={2.95} />
        </h1>

        <motion.p
          className="mt-8 max-w-2xl text-base leading-relaxed text-inksoft sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          {t.sub.pre}
          <strong className="font-semibold text-ink">{t.sub.strong}</strong>
          {t.sub.post}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
        >
          <Magnetic>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-rosedeep px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(201,58,108,0.4)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_18px_44px_rgba(201,58,108,0.5)]"
            >
              {t.ctaPrimary}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#classes"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#classes")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream/60 px-8 py-[14px] text-base font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:bg-ink hover:text-cream"
            >
              {t.ctaSecondary}
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          className="mt-16 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 sm:gap-x-14"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.9 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <dt className="order-2 font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-4xl font-bold text-rosedeep sm:text-5xl">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-inksoft transition-colors hover:text-rosedeep"
        aria-label={t.scrollCue}
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6" aria-hidden />
      </motion.a>

      {/* Torn transition into marquee */}
      <div className="absolute bottom-0 left-0 right-0 rotate-180" aria-hidden>
        <TornPaper fill="#e75a87" height={44} />
      </div>
    </section>
  );
}
