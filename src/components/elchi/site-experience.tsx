"use client";

import { useCallback, useState } from "react";
import { LocaleProvider, useSite } from "./locale-provider";
import { Loader } from "./loader";
import { Cursor } from "./cursor";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { About } from "./about";
import { Classes } from "./classes";
import { Experiences } from "./experiences";
import { Instructor } from "./instructor";
import { Gallery } from "./gallery";
import { Booking } from "./booking";
import { Faq } from "./faq";
import { Footer } from "./footer";
import { Concierge } from "./concierge";

/**
 * SiteExperience — the living one-page journey of Elchí Studio Bali.
 * Single scroll narrative: Hero → Marquee → About → Classes →
 * Experiences → Instructor → Gallery → Booking → FAQ → Contact.
 * Wrapped in LocaleProvider (Bahasa Indonesia · English · 한국어).
 */
export function SiteExperience() {
  return (
    <LocaleProvider>
      <SiteShell />
    </LocaleProvider>
  );
}

function SiteShell() {
  const [, setReady] = useState(false);
  const { d } = useSite();
  const onDone = useCallback(() => setReady(true), []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#classes"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
      >
        {d.meta.skip}
      </a>
      <Loader onDone={onDone} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Classes />
        <Experiences />
        <Instructor />
        <Gallery />
        <Booking />
        <Faq />
      </main>
      <Footer />
      <Concierge />
    </div>
  );
}
