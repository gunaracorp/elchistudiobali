import type { Metadata } from "next";
import { PageShell } from "@/components/elchi/site-shell";
import { Footer } from "@/components/elchi/footer";
import { buildMetadata, pickLocale, PAGE_SEO, breadcrumbSchema } from "@/lib/seo";

/** Contact — dedicated SEO page; the rich Footer is the page content. */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await searchParams;
  return buildMetadata("contact", lang);
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const locale = pickLocale(lang);
  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.contact[locale].crumb} withFooter={false}>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema("contact", locale)) }}
      />
    </PageShell>
  );
}
