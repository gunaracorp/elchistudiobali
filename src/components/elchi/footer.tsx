"use client";

import Link from "next/link";
import { MapPin, Mail, ShieldCheck, Clock, PenTool, Server, Scale, Instagram, Globe, Briefcase } from "lucide-react";
import { Reveal, Magnetic } from "./motion";
import { WhatsAppIcon } from "./whatsapp";
import { useSite, useContent } from "./locale-provider";
import { useSettings, waHref } from "@/lib/site-settings";
import { routeFor } from "@/lib/seo";

/**
 * Footer + Contact — dark editorial close, now CMS-driven.
 * Address / WhatsApp / Email come from studio settings (editable in
 * /admin → Pengaturan, seeded from the official NIB documents).
 * Company name (PT. Elchi Studio Bali) is public record; no private
 * identifiers are exposed. Footer links point at the dedicated SEO
 * routes (always crawlable, pinned with ?lang=), and the studio's own
 * social profiles show up here when configured in the dashboard.
 */

/** Footer label for the B2B partners page (Langkah 23) — self-contained i18n. */
const PARTNER_PAGE_LABELS: Record<string, string> = {
  en: "Partners",
  id: "Mitra",
  ko: "파트너",
  zh: "合作伙伴",
};

/** Partner credits — the trio behind the Elchí website. */
const CREDITS = [
  {
    icon: PenTool,
    label: "Design by",
    name: "Digiman.id",
    legal: "PT Digital Bisnis Manajemen",
    href: "https://digiman.id",
  },
  {
    icon: Server,
    label: "Hosting by",
    name: "JuraganWebsite",
    legal: "juraganwebsite.web.id",
    href: "https://juraganwebsite.web.id",
  },
  {
    icon: Scale,
    label: "Support system & legal by",
    name: "PT Top Konsultan Internasional",
    legal: "topkonsultan.web.id",
    href: "https://topkonsultan.web.id",
  },
  {
    icon: ShieldCheck,
    label: "Permits by",
    name: "PusatPerizinan.com",
    legal: "pusatperizinan.com",
    href: "https://pusatperizinan.com",
  },
  {
    icon: Briefcase,
    label: "Consulting by",
    name: "GConsultant",
    legal: "gconsultant.web.id",
    href: "https://gconsultant.web.id",
  },
  {
    icon: Globe,
    label: "Holding",
    name: "GunaraCorp",
    legal: "gunara.web.id",
    href: "https://gunara.web.id",
  },
];

/** Gunara Corp network — interlinked family of brands (SEO + trust). */
const NETWORK = [
  { name: "GunaraCorp", href: "https://gunara.web.id" },
  { name: "Top Konsultan", href: "https://topkonsultan.web.id" },
  { name: "Digiman.id", href: "https://digiman.id" },
  { name: "JuraganWebsite", href: "https://juraganwebsite.web.id" },
  { name: "PusatPerizinan.com", href: "https://pusatperizinan.com" },
  { name: "GConsultant", href: "https://gconsultant.web.id" },
];

export function Footer() {
  const { d, locale } = useSite();
  const { classes } = useContent();
  const settings = useSettings();
  const t = d.footer;

  const go = (href: string) => (e: React.MouseEvent) => {
    // Homepage: smooth-scroll to the section (signature single-scroll
    // feel). Subpages: let the crawlable route href navigate.
    if (typeof window !== "undefined" && window.location.pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      if (document.querySelector(href)) {
        document.querySelector(href)!.scrollIntoView({ behavior: "smooth" });
      } else {
        // Anchor missing on the homepage? Navigate to its dedicated route.
        window.location.href = `${routeFor(href)}?lang=${locale}`;
      }
    }
  };

  const ctaBooking = `${routeFor("#booking")}?lang=${locale}`;
  const ctaClasses = `${routeFor("#classes")}?lang=${locale}`;

  const address = settings?.studio_address?.trim() || "";
  const wa = settings?.studio_whatsapp?.trim() || "";
  const email = settings?.studio_email?.trim() || "";
  /** Multiple emails supported — comma-separated in /admin (all active). */
  const emails = email
    ? email.split(",").map((e) => e.trim()).filter(Boolean)
    : [];
  const hours = settings?.studio_hours?.trim() || "";
  const instagram = settings?.instagram_url?.trim() || "";
  const hasSocials = Boolean(instagram || wa || email);

  return (
    <footer id="contact" aria-label={t.aria} className="relative bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 sm:pt-24">
        <div className="mb-16 text-center">
          <Reveal>
            <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-blush">
              {t.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-[1.05] sm:text-6xl">
              {t.h2.a}{" "}
              <span className="font-script text-[1.1em] font-normal text-blush">
                {t.h2.script}
              </span>{" "}
              {t.h2.b}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic>
                <a
                  href={ctaBooking}
                  onClick={go("#booking")}
                  className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(231,90,135,0.4)] transition-transform duration-300 hover:scale-105"
                >
                  {t.start}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={ctaClasses}
                  onClick={go("#classes")}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-8 py-4 text-base font-semibold text-cream transition-colors duration-300 hover:border-blush hover:text-blush"
                >
                  {t.browse}
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mx-auto mt-12 grid max-w-4xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
              {/* Studio address (from settings; falls back to invitation text) */}
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <MapPin className="h-4 w-4" aria-hidden /> {t.studioT}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  {address || t.studioEmpty}
                  {address && (
                    <>
                      <br />Bali, Indonesia.
                    </>
                  )}
                  {hours && (
                    <span className="mt-2 flex items-center gap-1.5 text-xs text-cream/60">
                      <Clock className="h-3.5 w-3.5" aria-hidden /> {hours}
                    </span>
                  )}
                </dd>
              </div>
              {/* WhatsApp (from settings) */}
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <WhatsAppIcon className="h-4 w-4" /> {t.waT}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  {wa ? (
                    <>
                      <a
                        href={waHref(wa)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-cream transition-colors hover:text-blush"
                      >
                        {wa}
                      </a>
                      <br />
                      <a
                        href={waHref(wa)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-105"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" /> {t.waCta}
                      </a>
                      <br />
                      <span className="mt-1.5 block text-xs text-cream/60">{t.waB}</span>
                    </>
                  ) : (
                    t.waB
                  )}
                </dd>
              </div>
              {/* Email (from settings) */}
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <Mail className="h-4 w-4" aria-hidden /> {t.mailT}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  {emails.length > 0 ? (
                    <>
                      {emails.map((e, i) => (
                        <a
                          key={e}
                          href={`mailto:${e}`}
                          className={`block break-all font-semibold text-cream transition-colors hover:text-blush${i > 0 ? " mt-1" : ""}`}
                        >
                          {e}
                        </a>
                      ))}
                      <span className="mt-1.5 block text-xs text-cream/60">{t.mailB}</span>
                    </>
                  ) : (
                    t.mailB
                  )}
                </dd>
              </div>
              {/* Company */}
              <div className="rounded-2xl border border-cream/10 bg-cream/5 p-5">
                <dt className="flex items-center gap-2 font-monobrand text-[10px] uppercase tracking-[0.25em] text-blush">
                  <ShieldCheck className="h-4 w-4" aria-hidden /> {t.compT}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-cream/85">
                  {t.compB}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <div className="grid gap-10 border-t border-cream/10 pt-12 md:grid-cols-[minmax(0,4fr)_minmax(0,4fr)_minmax(0,4fr)]">
          <div>
            <Link
              href={`/?lang=${locale}`}
              className="font-script text-4xl text-blush transition-colors hover:text-rose"
              aria-label="Elchí Studio Bali — home"
            >
              Elchí
            </Link>
            <p className="mt-1 font-monobrand text-[10px] uppercase tracking-[0.4em] text-cream/60">
              Studio Bali
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {t.blurb}
            </p>
            {/* Studio's own social profiles — from /admin → Pengaturan */}
            {hasSocials && (
              <div className="mt-5 flex items-center gap-3">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Elchí Studio Bali on Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-blush hover:text-blush"
                  >
                    <Instagram className="h-4 w-4" aria-hidden />
                  </a>
                )}
                {wa && (
                  <a
                    href={waHref(wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Elchí Studio Bali on WhatsApp"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-blush hover:text-blush"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${emails[0] ?? email}`}
                    aria-label="Email Elchí Studio Bali"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-blush hover:text-blush"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            )}
          </div>
          <nav aria-label={t.explore}>
            <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">
              {t.explore}
            </p>
            <ul className="mt-4 space-y-2.5">
              {d.navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={`${routeFor(l.href)}?lang=${locale}`}
                    onClick={go(l.href)}
                    className="text-sm text-cream/70 transition-colors hover:text-blush"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`/partners?lang=${locale}`}
                  className="text-sm text-inksoft transition-colors hover:text-rosedeep"
                >
                  {PARTNER_PAGE_LABELS[locale] ?? "Partners"}
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label={t.workshops}>
            <p className="font-monobrand text-[10px] uppercase tracking-[0.3em] text-blush">
              {t.workshops}
            </p>
            <ul className="mt-4 space-y-2.5">
              {classes.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/classes/${c.slug}?lang=${locale}`}
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

        {/* Gunara Corp network — the family behind the studio's website. */}
        <div
          aria-label="Gunara Corp network"
          className="relative mt-10 overflow-hidden border-t border-cream/10 pt-8"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1 select-none whitespace-nowrap text-center font-monobrand text-[56px] font-bold uppercase leading-none tracking-[0.18em] text-cream/[0.045]"
          >
            Gunara Corp
          </span>
          <p className="relative font-monobrand text-[10px] uppercase tracking-[0.35em] text-blush">
            Gunara Corp Network
          </p>
          <p className="relative mt-2 font-script text-3xl text-blush">Top Konsultan Kelas Dunia</p>
          <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {NETWORK.map((n) => (
              <a
                key={n.name}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-rose"
              >
                {n.name}
              </a>
            ))}
          </div>
          <p className="relative mt-4 font-monobrand text-[9px] uppercase tracking-[0.3em] text-cream/35">
            Holding · Consulting · Digital Marketing · Web Builder · Permits · Design
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/45">
            © {new Date().getFullYear()} PT. Elchi Studio Bali · {t.rights}
          </p>
          <div className="flex items-center gap-5">
            <p className="font-script text-sm text-cream/45">{t.made}</p>
            <a
              href="/admin"
              className="font-monobrand text-[10px] uppercase tracking-[0.2em] text-cream/35 transition-colors hover:text-blush"
            >
              {t.admin}
            </a>
          </div>
        </div>

        {/* Partner credits — crafted, hosted, protected. */}
        <div
          aria-label="Website partners"
          className="mt-6 flex flex-col items-center justify-center gap-x-10 gap-y-3 border-t border-cream/10 py-6 sm:flex-row sm:flex-wrap"
        >
          {CREDITS.map((c) => (
            <span
              key={c.name}
              className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 font-monobrand text-[9.5px] uppercase tracking-[0.16em] text-cream/45"
            >
              <c.icon className="h-3.5 w-3.5 shrink-0 text-rose" aria-hidden />
              <span>{c.label}</span>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blush transition-colors hover:text-rose"
              >
                {c.name}
              </a>
              <span className="text-cream/30">({c.legal})</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
