import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/elchi/site-shell";
import { ARTICLES, BLOG_UI } from "@/lib/blog";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema, langPath } from "@/lib/seo";

/** Jurnal Studio — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("blog", lang);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  const L = BLOG_UI[locale];
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.blog[locale].crumb}>
      <section aria-label={PAGE_SEO.blog[locale].crumb} className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-20">
          <p className="font-monobrand text-[11px] uppercase tracking-[0.35em] text-rosedeep">
            {L.kicker}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] text-ink sm:text-5xl">
            {L.heading}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-inksoft">{L.sub}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <article
                key={a.slug}
                className="flex flex-col rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_18px_44px_rgba(52,35,28,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blushlight px-3 py-1 font-monobrand text-[9px] uppercase tracking-[0.2em] text-rosedeep">
                    {a.tag}
                  </span>
                  <span className="font-monobrand text-[10px] uppercase tracking-[0.15em] text-inksoft/70">
                    {fmt(a.date)}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-xl font-black leading-snug text-ink">
                  <Link href={langPath(`/blog/${a.slug}`, locale)} className="transition-colors hover:text-rosedeep">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-inksoft">{a.excerpt}</p>
                <p className="mt-5 font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
                  {a.readingMinutes} {L.minRead}
                </p>
                <Link
                  href={langPath(`/blog/${a.slug}`, locale)}
                  className="mt-3 inline-flex items-center gap-2 font-semibold text-rosedeep transition-colors hover:text-ink"
                >
                  {L.readMore} <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-14 rounded-[2rem] bg-rose px-7 py-10 text-center text-cream shadow-[0_24px_60px_rgba(52,35,28,0.25)] sm:px-10">
            <p className="font-script text-3xl">{L.ready}</p>
            <Link
              href={langPath("/booking", locale)}
              className="mt-6 inline-block rounded-full bg-cream px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              {L.cta}
            </Link>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("blog", locale)) }}
      />
    </PageShell>
  );
}
