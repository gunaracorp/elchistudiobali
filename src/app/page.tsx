import { SiteExperience } from "@/components/elchi/site-experience";
import { buildMetadata, pickLocale } from "@/lib/seo";

/**
 * Homepage — the one-page journey AND the English default for crawlers.
 * `?lang=` pins a language server-side, giving Google three true
 * language variants of the page (canonical + hreflang per locale).
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  return buildMetadata("home", pickLocale(lang));
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  return <SiteExperience initialLocale={lang ?? null} />;
}
