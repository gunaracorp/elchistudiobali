"use client";

import { useState } from "react";
import { MapPin, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { NAV_LINKS, CLASSES } from "@/lib/classes-data";
import { Reveal, Magnetic } from "./motion";
import { AdminModal } from "./admin-modal";

/**
 * Footer + Contact — dark editorial close.
 * Company name (PT. Elchi Studio Bali) is public record from the
 * registration documents; no private identifiers are exposed.
 */
export function Footer() {
  const [adminOpen, setAdminOpen] = useState(false);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" aria-label="Contact and footer" className="relative bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-blush">
              Contact &amp; booking
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] sm:text-6xl">
              Let&apos;s create something{" "}
              <span className="font-script text-[1.1em] font-normal text-blush">
                just for you
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href="#booking"
                  onClick={go("#booking")}
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(231,90,135,0.4)] transition-transform duration-300 hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  Start a booking
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#classes"
                  onClick={go("#classes")}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-8 py-4 text-base font-semibold text-cream transition-colors duration-300 hover:border-blush hover:text-blush"
                >
                  Browse classes again
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mx-auto mt-12 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <MapPin className="h-4 w-4" aria-hidden /> Studio
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  Bali, Indonesia.
                  <br />
                  Exact studio address &amp; WhatsApp number are shared
                  personally with every booking confirmation.
                </dd>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <Mail className="h-4 w-4" aria-hidden /> Enquiries
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  The booking form above is the fastest way to reach the
                  studio — every request lands directly with the team.
                </dd>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <ShieldCheck className="h-4 w-4" aria-hidden /> Company
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  PT. Elchi Studio Bali — a registered Indonesian company.
                  Legal &amp; identity documents are never published here.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="grid gap-10 border-t border-cream/10 pt-12 md:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,4fr)]">
          <div>
            <p className="font-script text-4xl text-blush">Elchí</p>
            <p className="mt-1 font-monobrand text-[10px] uppercase tracking-[0.4em] text-cream/60">
              Studio Bali
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              A creative learning experience beyond boundaries — art, fun, and
              skills in the heart of the tropics.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={go(l.href)}
                    className="text-sm text-cream/70 transition-colors hover:text-blush"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="All workshops">
            <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">
              Workshops
            </p>
            <ul className="mt-4 space-y-2.5">
              {CLASSES.map((c) => (
                <li key={c.slug}>
                  <a
                    href="#classes"
                    onClick={go("#classes")}
                    className="text-sm text-cream/70 transition-colors hover:text-blush"
                  >
                    {c.name}{" "}
                    <span className="text-cream/40">· {c.duration}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/45">
            © {new Date().getFullYear()} PT. Elchi Studio Bali · All rights reserved
          </p>
          <p className="font-script text-sm text-cream/45">
            made with love &amp; a little glitter
          </p>
          <button
            type="button"
            onClick={() => setAdminOpen(true)}
            className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/35 transition-colors hover:text-blush"
          >
            Studio Admin
          </button>
        </div>
      </div>

      <AdminModal open={adminOpen} onOpenChange={setAdminOpen} />
    </footer>
  );
}
