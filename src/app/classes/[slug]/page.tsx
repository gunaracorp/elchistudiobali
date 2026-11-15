import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/elchi/site-shell";
import { ClassDetail } from "@/components/elchi/class-detail";
import { CLASSES } from "@/lib/classes-data";
import {
  breadcrumbSchema,
  buildClassMetadata,
  courseSchema,
  pickLocale,
  PAGE_SEO,
} from "@/lib/seo";

/** One landing page per signature class — 6 crawlable course URLs. */
export function generateStaticParams() {
  return CLASSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { lang } = await searchParams;
  return buildClassMetadata(slug, lang) ?? { title: "Class not found" };
}

export default async function ClassPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const { lang } = await searchParams;
  if (!CLASSES.some((c) => c.slug === slug)) notFound();
  const locale = pickLocale(lang);

  const course = courseSchema(slug);
  const breadcrumb = breadcrumbSchema("classes", locale);
  const graph = { "@context": "https://schema.org", "@graph": [course, breadcrumb] };

  return (
    <PageShell initialLocale={lang ?? null} crumb={PAGE_SEO.classes[locale].crumb}>
      <ClassDetail slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
    </PageShell>
  );
}
