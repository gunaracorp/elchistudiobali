import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { About } from "@/components/elchi/about";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema } from "@/lib/seo";

/** Tentang Studio — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("about", lang);
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.about[locale].crumb}>
      <About />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("about", locale)) }}
      />
    </PageShell>
  );
}
