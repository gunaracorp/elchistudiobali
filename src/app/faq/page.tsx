import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Faq } from "@/components/elchi/faq";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema, faqSchema } from "@/lib/seo";

/** FAQ — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("faq", lang);
}

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.faq[locale].crumb}>
      <Faq />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("faq", locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(locale)) }}
      />
    </PageShell>
  );
}
