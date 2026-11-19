import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Partners } from "@/components/elchi/partners";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema } from "@/lib/seo";

/** Mitra / Partners — dedicated B2B SEO page (?lang= pins the language). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("partners", lang);
}

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.partners[locale].crumb}>
      <Partners />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("partners", locale)) }}
      />
    </PageShell>
  );
}
