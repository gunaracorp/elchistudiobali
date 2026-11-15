import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Experiences } from "@/components/elchi/experiences";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema } from "@/lib/seo";

/** Pengalaman Privat — dedicated SEO page (?lang= pins the language server-side). */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("experiences", lang);
}

export default async function ExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.experiences[locale].crumb}>
      <Experiences />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("experiences", locale)) }}
      />
    </PageShell>
  );
}
