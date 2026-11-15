"use client";

import { LocaleProvider, useSite } from "./locale-provider";
import { Cursor } from "./cursor";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Concierge } from "./concierge";
import { WhatsAppFloat } from "./whatsapp";
import { ScrollProgress } from "./motion";
import Link from "next/link";
import { langPath, pickLocale } from "@/lib/seo";

/**
 * PageShell — the chrome around SEO subpages (about, classes, elin…).
 * Same trilingual provider + navbar/footer/floats as the homepage, but
 * without the 2.2s branded loader (subpages must render instantly for
 * visitors and crawlers alike). Optional breadcrumb bar keeps the
 * hierarchy visible: Elchí / Classes.
 */
export function PageShell({
  initialLocale,
  crumb,
  withFooter = true,
  children,
}: {
  /** Locale pinned by ?lang= from the server page. */
  initialLocale?: string | null;
  /** Short localized label for the breadcrumb ("Classes"). */
  crumb?: string;
  /** /contact renders the Footer itself as page content. */
  withFooter?: boolean;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider initialLocale={initialLocale ? pickLocale(initialLocale) : null}>
      <Inner crumb={crumb} withFooter={withFooter}>
        {children}
      </Inner>
    </LocaleProvider>
  );
}

function Inner({
  crumb,
  withFooter,
  children,
}: {
  crumb?: string;
  withFooter: boolean;
  children: React.ReactNode;
}) {
  const { d, locale } = useSite();
  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-cream"
      >
        {d.meta.skip}
      </a>
      <ScrollProgress />
      <Cursor />
      <Navbar instant />
      <div className="pt-16 sm:pt-[72px]">
        {crumb && (
          <nav aria-label="Breadcrumb" className="border-b border-ink/5 bg-cream/70 backdrop-blur-sm">
            <ol className="mx-auto flex max-w-7xl items-center gap-2.5 px-5 py-2.5 sm:px-8">
              <li>
                <Link
                  href={langPath("/", locale)}
                  className="font-script text-lg leading-none text-rosedeep transition-colors hover:text-rose"
                >
                  Elchí
                </Link>
              </li>
              <li aria-hidden className="font-monobrand text-[10px] text-inksoft/50">
                /
              </li>
              <li className="font-monobrand text-[10px] font-bold uppercase tracking-[0.22em] text-ink">
                {crumb}
              </li>
            </ol>
          </nav>
        )}
        <main id="main-content">{children}</main>
      </div>
      {withFooter && <Footer />}
      <Concierge />
      <WhatsAppFloat />
    </div>
  );
}
