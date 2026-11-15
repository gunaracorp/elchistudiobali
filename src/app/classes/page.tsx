import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Classes } from "@/components/elchi/classes";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema, classesSchema } from "@/lib/seo";

/** Kelas & Lokakarya — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("classes", lang);
}

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.classes[locale].crumb}>
      <Classes />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("classes", locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(classesSchema(locale)) }}
      />
    </PageShell>
  );
}
