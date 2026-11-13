"use client";

import Image from "next/image";
import { HeartHandshake, Users, Languages, Palette } from "lucide-react";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, SparkleSticker, SmileSticker } from "./torn";

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Personalised attention",
    body: "Every individual is guided personally — small touches, big smiles, and at least 20 minutes of one-on-one feedback in Creative Flow.",
    tint: "bg-blushlight text-rosedeep",
  },
  {
    icon: Users,
    title: "All ages & levels",
    body: "From 2 to 80 years old, complete beginners to advanced artists — sessions are designed to be fun, easy to follow and rewarding.",
    tint: "bg-sky/25 text-[#2e7d9e]",
  },
  {
    icon: Palette,
    title: "Real skills, real results",
    body: "An enjoyable learning experience and excellent final results — you leave with artwork you are genuinely proud of.",
    tint: "bg-sun/25 text-[#9a6b10]",
  },
  {
    icon: Languages,
    title: "Taught in 3 languages",
    body: "Classes are available in English, French and Korean — selamat datang, bienvenue, and 어서 오세요!",
    tint: "bg-palm/20 text-[#2e6e4e]",
  },
];

/**
 * About — the studio philosophy, sourced from Elin's own teaching letter.
 */
export function About() {
  return (
    <section id="about" aria-label="About Elchí Studio" className="relative bg-cream">
      <div aria-hidden className="rotate-180">
        <TornPaper fill="#e75a87" height={44} />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
                About the studio
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
                Hello,{" "}
                <span className="font-script text-[1.1em] font-normal text-rosedeep">
                  Bonjour,
                </span>{" "}
                안녕!
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 text-lg leading-relaxed text-inksoft">
                Elchí Studio Bali is a creative learning studio where travellers,
                friends and curious creatives slow down and make things with
                their hands. Watercolour, sketching, felting, custom crafts —
                every session is led personally by Elin, an art educator whose
                journey runs from{" "}
                <em className="font-display">École de Condé Paris</em> to the
                tropics of Bali.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-5 text-lg leading-relaxed text-inksoft">
                We keep classes small in spirit even when the room is full:
                personalised guidance, easy-to-follow steps, and results you
                will be proud to take home — or send to a loved one, months
                later, as a postcard surprise.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={0.1 + i * 0.07}>
                  <div className="group h-full rounded-2xl border border-ink/8 bg-white/60 p-5 shadow-[0_2px_12px_rgba(52,35,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(52,35,28,0.10)]">
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${v.tint}`}>
                      <v.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-inksoft">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Collage */}
          <div className="relative">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(52,35,28,0.18)]">
                <Image
                  src="/images/gallery-studio.png"
                  alt="Inside the Elchí Studio Bali — art supplies, rattan and tropical light"
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
                  alt="Bali-themed postcards and a watercolour palette on the studio table"
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
