import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Instructor } from "@/components/elchi/instructor";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema } from "@/lib/seo";

/** Elin Kim — Instruktur — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("elin", lang);
}

export default async function InstructorPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.elin[locale].crumb}>
      <Instructor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("elin", locale)) }}
      />
    </PageShell>
  );
}
