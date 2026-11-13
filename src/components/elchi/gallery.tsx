"use client";

import Image from "next/image";
import { Reveal, ParallaxEl } from "./motion";
import { TornPaper, FlowerSticker } from "./torn";

const SHOTS = [
  {
    src: "/images/class-travel-drawing.jpg",
    alt: "Framed travel sketch of Notre-Dame with drawing pens",
    caption: "Travel Drawing",
    span: "sm:col-span-2 sm:row-span-2",
    h: "aspect-[4/3] sm:aspect-auto sm:h-full",
  },
  {
    src: "/images/class-dog-keychain.jpg",
    alt: "Handmade needle-felted dog keychains held in hands",
    caption: "Dog Keychain",
    span: "",
    h: "aspect-square",
  },
  {
    src: "/images/gallery-painting.png",
    alt: "Hands painting a watercolour palm-tree postcard",
    caption: "Postcards in the making",
    span: "",
    h: "aspect-square",
  },
  {
    src: "/images/class-flipflop.jpg",
    alt: "Custom flip-flops with colorful straps and charms",
    caption: "Custom Flip-Flop",
    span: "",
    h: "aspect-square",
  },
  {
    src: "/images/class-creative-flow.png",
    alt: "Group watercolour workshop in a bright tropical studio",
    caption: "Creative Flow",
    span: "",
    h: "aspect-square",
  },
  {
    src: "/images/group-workshop.jpg",
    alt: "A happy group with their finished creations after a workshop",
    caption: "Private group joy",
    span: "sm:col-span-2",
    h: "aspect-[16/9]",
  },
  {
    src: "/images/gallery-studio.png",
    alt: "The Elchí studio corner with art supplies and tropical light",
    caption: "The studio",
    span: "",
    h: "aspect-square",
  },
  {
    src: "/images/class-tshirt.jpg",
    alt: "Hand-painted t-shirt with palm tree design",
    caption: "Custom T-shirt",
    span: "",
    h: "aspect-square",
  },
];

/**
 * Gallery — interactive image grid with mask-reveal and hover depth.
 * Mix of authentic studio photos (from the brand brochures) and
 * brand-commissioned artwork.
 */
export function Gallery() {
  return (
    <section id="gallery" aria-label="Gallery — studio and workshop moments" className="relative bg-paper">
      <div aria-hidden>
        <TornPaper fill="#fff8f0" height={44} className="rotate-180" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-14 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rose">
              Gallery &amp; journal
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Moments made{" "}
              <span className="font-script text-[1.1em] font-normal text-rosedeep">
                by hand
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-inksoft">
              Real creations from real sessions — sketchbooks, felted pups,
              painted postcards and very happy hands.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 [grid-auto-rows:1fr]">
          {SHOTS.map((s, i) => (
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
                Your artwork could be right here{" "}
                <span className="font-script text-[1.15em] font-normal text-rosedeep">
                  next week
                </span>
              </p>
              <p className="mt-4 text-inksoft">
                Every photo on this page started with someone saying
                &ldquo;I can&apos;t even draw a straight line.&rdquo; They left with
                masterpieces.
              </p>
            </ParallaxEl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
