import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { ComponentProps } from "react";
import { PageShell } from "@/components/elchi/site-shell";
import { ARTICLES, BLOG_UI, getArticle } from "@/lib/blog";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema, langPath, SITE_URL } from "@/lib/seo";

/** Journal article — unique metadata + canonical per story. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `${SITE_URL}/blog/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      url: `${SITE_URL}/blog/${a.slug}`,
      type: "article",
      publishedTime: a.date,
      images: ["/og.jpg"],
    },
  };
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/** Editorial typography for markdown bodies (no typography plugin needed). */
const mdComponents = {
  h2: ({ node, ...p }: ComponentProps<"h2"> & { node?: unknown }) => (
    <h2 className="mt-10 font-display text-2xl font-black text-ink" {...p} />
  ),
  h3: ({ node, ...p }: ComponentProps<"h3"> & { node?: unknown }) => (
    <h3 className="mt-8 font-display text-xl font-bold text-ink" {...p} />
  ),
  p: ({ node, ...p }: ComponentProps<"p"> & { node?: unknown }) => (
    <p className="mt-5 leading-[1.85] text-inksoft" {...p} />
  ),
  ul: ({ node, ...p }: ComponentProps<"ul"> & { node?: unknown }) => (
    <ul className="mt-5 space-y-2.5" {...p} />
  ),
  li: ({ node, children, ...p }: ComponentProps<"li"> & { node?: unknown }) => (
    <li className="flex items-start gap-2.5 leading-relaxed text-inksoft" {...p}>
      <span className="mt-1 text-blush" aria-hidden>
        ✦
      </span>
      <span>{children}</span>
    </li>
  ),
  a: ({ node, ...p }: ComponentProps<"a"> & { node?: unknown }) => (
    <a className="font-semibold text-rosedeep underline decoration-blush/40 underline-offset-2" {...p} />
  ),
  strong: ({ node, ...p }: ComponentProps<"strong"> & { node?: unknown }) => (
    <strong className="font-bold text-ink" {...p} />
  ),
  blockquote: ({ node, ...p }: ComponentProps<"blockquote"> & { node?: unknown }) => (
    <blockquote className="mt-6 border-l-2 border-blush pl-4 font-display text-lg italic text-ink" {...p} />
  ),
};

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  const a = getArticle(slug);
  if (!a) notFound();
  const L = BLOG_UI[locale];
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : locale === "id" ? "id-ID" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Person", name: "Elin Kim" },
    publisher: { "@type": "Organization", name: "Elchí Studio Bali", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
    image: `${SITE_URL}/og.jpg`,
  };

  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.blog[locale].crumb}>
      <article className="bg-cream">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-8">
          <Link
            href={langPath("/blog", locale)}
            className="font-monobrand text-[10px] uppercase tracking-[0.25em] text-rosedeep transition-colors hover:text-ink"
          >
            ← {L.back}
          </Link>
          <p className="mt-8 font-monobrand text-[11px] uppercase tracking-[0.35em] text-rosedeep">
            {L.kicker}
          </p>
          <h1 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
            {a.title}
          </h1>
          <p className="mt-4 font-monobrand text-[10px] uppercase tracking-[0.2em] text-inksoft/70">
            {fmt(a.date)} · {a.readingMinutes} {L.minRead}
          </p>

          <div className="mt-10 border-t border-ink/10 pt-2">
            <ReactMarkdown components={mdComponents}>{a.body}</ReactMarkdown>
          </div>

          <p className="mt-12 border-t border-ink/10 pt-6 font-monobrand text-[10px] uppercase tracking-[0.25em] text-inksoft/70">
            {L.by}
          </p>

          <div className="mt-8 rounded-[2rem] bg-rose px-7 py-10 text-center text-cream sm:px-10">
            <p className="font-script text-3xl">{L.ready}</p>
            <Link
              href={langPath("/booking", locale)}
              className="mt-6 inline-block rounded-full bg-cream px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              {L.cta}
            </Link>
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema("blog", locale), articleJsonLd]) }}
      />
    </PageShell>
  );
}
