/**
 * SEO backbone for Elchí Studio Bali.
 * - Route registry shared by navbar / footer / sitemap / breadcrumbs.
 * - Trilingual metadata per page (?lang= alternates + canonical).
 * - JSON-LD graph: studio organization, website, per-page schema, and
 *   the consultant/support network (backend attribution only — it lives
 *   in metadata & structured data, never on the visible surface).
 * Canonical facts come from src/lib/classes-data.ts (official documents).
 */
import type { Metadata } from "next";
import { CLASSES, ELIN } from "@/lib/classes-data";
import { DICTS, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Site constants                                                      */
/* ------------------------------------------------------------------ */

/** Production origin — override with NEXT_PUBLIC_SITE_URL when deploying. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://elchistudiobali.com"
).replace(/\/$/, "");

export const LOCALES: Locale[] = ["en", "id", "ko"];

export function pickLocale(v?: string | null): Locale {
  return v === "id" || v === "ko" || v === "en" ? v : DEFAULT_LOCALE;
}

/** Locale-pinned URL: English is the clean default, others get ?lang=. */
export function langPath(path: string, locale: Locale): string {
  return locale === "en" ? path : `${path}?lang=${locale}`;
}

/* ------------------------------------------------------------------ */
/* Route registry                                                      */
/* ------------------------------------------------------------------ */

export const ROUTES = [
  { path: "/about", hash: "#about", key: "about" },
  { path: "/classes", hash: "#classes", key: "classes" },
  { path: "/experiences", hash: "#experiences", key: "experiences" },
  { path: "/elin", hash: "#instructor", key: "elin" },
  { path: "/gallery", hash: "#gallery", key: "gallery" },
  { path: "/booking", hash: "#booking", key: "booking" },
  { path: "/faq", hash: "#faq", key: "faq" },
  { path: "/contact", hash: "#contact", key: "contact" },
] as const;

export type RouteKey = (typeof ROUTES)[number]["key"] | "home";

/** "#classes" → "/classes" (nav anchors stay stable in the dictionaries). */
export function routeFor(hash: string): string {
  return ROUTES.find((r) => r.hash === hash)?.path ?? "/";
}

/* ------------------------------------------------------------------ */
/* Trilingual page metadata                                            */
/* ------------------------------------------------------------------ */

type SeoEntry = { title: string; description: string; crumb: string };

export const PAGE_SEO: Record<RouteKey, Record<Locale, SeoEntry>> = {
  home: {
    en: {
      title: "Creative Workshops & Art Classes in Bali",
      description:
        "Watercolour postcards, travel sketching, needle felting & craft workshops in Kuta, Bali. Art, fun and skills with 19 years of teaching magic — English, French & Korean spoken.",
      crumb: "Home",
    },
    id: {
      title: "Lokakarya Kreatif & Kelas Seni di Bali",
      description:
        "Kartu pos cat air, travel sketching, needle felting & lokakarya kriya di Kuta, Bali. Seni, keseruan, dan keterampilan dengan 19 tahun pengalaman mengajar — bahasa Inggris, Prancis & Korea.",
      crumb: "Beranda",
    },
    ko: {
      title: "발리 아트 클래스 & 창의 워크숍",
      description:
        "발리 쿠타의 수채화 엽서, 여행 스케치, 니들펠트 & 공예 워크숍. 19년의 가르침 경험으로 예술과 즐거움을 함께합니다 — 영어, 프랑스어, 한국어 가능.",
      crumb: "홈",
    },
  },
  about: {
    en: {
      title: "About the Studio — A Creative Learning Experience Beyond Boundaries",
      description:
        "Meet Elchí Studio Bali: a warm, watercolour-washed creative studio in Kuta where travellers, families and teams learn real art skills — beyond boundaries, beyond language.",
      crumb: "About",
    },
    id: {
      title: "Tentang Studio — Pengalaman Belajar Kreatif di Bali",
      description:
        "Kenali Elchí Studio Bali: studio kreatif yang hangat di Kuta tempat wisatawan, keluarga, dan tim belajar keterampilan seni sungguhan — melampaui batas dan bahasa.",
      crumb: "Tentang",
    },
    ko: {
      title: "스튜디오 소개 — 발리의 창의적 학습 경험",
      description:
        "Elchí Studio Bali를 만나보세요. 쿠타의 따뜻한 수채화 스튜디오에서 여행자, 가족, 팀이 진짜 미술 기술을 배웁니다.",
      crumb: "소개",
    },
  },
  classes: {
    en: {
      title: "Art Classes & Craft Workshops — 6 Signature Classes",
      description:
        "Travel Drawing, Watercolour Postcards, Dog Keychain felting, Custom Flip-Flops, Custom T-shirts and Creative Flow — hands-on art classes in Bali for every skill level.",
      crumb: "Classes",
    },
    id: {
      title: "Kelas Seni & Lokakarya Kriya — 6 Kelas Unggulan",
      description:
        "Travel Drawing, Kartu Pos Cat Air, Gantungan Kunci Felting, Sandal Custom, Kaos Custom, dan Creative Flow — kelas seni langsung praktik di Bali untuk semua level.",
      crumb: "Kelas",
    },
    ko: {
      title: "아트 클래스 & 공예 워크숍 — 6가지 시그니처 클래스",
      description:
        "여행 드로잉, 수채화 엽서, 강아지 키링 펠트, 샌들 꾸미기, 티셔츠 페인팅, 크리에이티브 플로우 — 발리에서 누구나 즐기는 아트 클래스.",
      crumb: "클래스",
    },
  },
  experiences: {
    en: {
      title: "Private Group & 1:1 Art Experiences in Bali",
      description:
        "Hen's parties, birthdays, team-building or a solo creative escape — private art workshops in Bali tailored to your date, your group and your ideas.",
      crumb: "Experiences",
    },
    id: {
      title: "Pengalaman Seni Privat — Grup & 1:1 di Bali",
      description:
        "Acara hen's party, ulang tahun, team-building, atau pelarian kreatif solo — lokakarya seni privat di Bali yang disesuaikan dengan tanggal, grup, dan ide Anda.",
      crumb: "Pengalaman",
    },
    ko: {
      title: "프라이빗 그룹 & 1:1 아트 체험",
      description:
        "여자 모임, 생일 파티, 팀 빌딩 또는 혼자만의 창의적 여정 — 날짜와 취향에 맞춘 발리 프라이빗 아트 워크숍.",
      crumb: "체험",
    },
  },
  elin: {
    en: {
      title: "Elin Kim — Founder & Lead Instructor, 19 Years of Teaching Magic",
      description:
        "Meet Elin Kim: artist and educator with 19 years of experience, trusted by brands like Dior, LG and Hyundai — teaching art in English, French and Korean in Bali.",
      crumb: "Elin",
    },
    id: {
      title: "Elin Kim — Pendiri & Instruktur Utama, 19 Tahun Mengajar",
      description:
        "Kenali Elin Kim: seniman dan pendidik berpengalaman 19 tahun, dipercaya merek seperti Dior, LG, dan Hyundai — mengajar seni dalam bahasa Inggris, Prancis, dan Korea di Bali.",
      crumb: "Elin",
    },
    ko: {
      title: "엘린 김 — 설립자 & 수석 강사, 19년의 가르침",
      description:
        "엘린 김을 만나보세요. 19년 경력의 아티스트이자 교육자, Dior·LG·현대와 함께한 이력 — 영어, 프랑스어, 한국어로 가르칩니다.",
      crumb: "엘린",
    },
  },
  gallery: {
    en: {
      title: "Gallery — Student Artwork & Studio Moments",
      description:
        "Watercolour postcards, felted pups, painted tees and happy makers — a peek inside the Elchí Studio Bali gallery. Click any photo to view it in full.",
      crumb: "Gallery",
    },
    id: {
      title: "Galeri — Karya Siswa & Momen Studio",
      description:
        "Kartu pos cat air, anjing felting, kaos lukis, dan pembuat yang bahagia — intipan galeri Elchí Studio Bali. Klik foto untuk melihat ukuran penuh.",
      crumb: "Galeri",
    },
    ko: {
      title: "갤러리 — 학생 작품 & 스튜디오 순간",
      description:
        "수채화 엽서, 펠트 강아지, 페인팅 티셔츠, 행복한 메이커들 — Elchí Studio Bali 갤러리 미리보기. 사진을 클릭하면 크게 볼 수 있습니다.",
      crumb: "갤러리",
    },
  },
  booking: {
    en: {
      title: "Book a Class — Reserve Your Seat in Kuta, Bali",
      description:
        "Reserve your creative workshop in three quick steps: pick a class, choose date & time, tell us who's coming. Your booking lands directly in the studio's inbox.",
      crumb: "Booking",
    },
    id: {
      title: "Pesan Kelas — Amankan Kursi Anda di Kuta, Bali",
      description:
        "Pesan lokakarya kreatif dalam tiga langkah cepat: pilih kelas, pilih tanggal & jam, beri tahu siapa yang datang. Booking langsung masuk ke studio.",
      crumb: "Booking",
    },
    ko: {
      title: "클래스 예약 — 발리 쿠타에서 자리를 예약하세요",
      description:
        "세 단계로 워크숍을 예약하세요: 클래스 선택, 날짜 & 시간 선택, 참여 인원 입력. 예약은 스튜디오에 바로 전달됩니다.",
      crumb: "예약",
    },
  },
  faq: {
    en: {
      title: "FAQ — Everything About Our Art Classes",
      description:
        "Do I need experience? What should I bring? Can kids join? Answers to the questions travellers ask most before booking a creative workshop in Bali.",
      crumb: "FAQ",
    },
    id: {
      title: "FAQ — Semua Pertanyaan tentang Kelas Kami",
      description:
        "Perlu pengalaman? Bawa apa saja? Bolehkah anak ikut? Jawaban atas pertanyaan yang paling sering diajukan sebelum booking lokakarya kreatif di Bali.",
      crumb: "FAQ",
    },
    ko: {
      title: "FAQ — 아트 클래스에 대한 모든 것",
      description:
        "경험이 필요한가요? 무엇을 가져와야 하나요? 아이도 참여할 수 있나요? 발리 워크숍 예약 전 가장 많이 묻는 질문들의 답변.",
      crumb: "FAQ",
    },
  },
  contact: {
    en: {
      title: "Contact & Studio Address — Tibubeneng, Kuta Utara, Bali",
      description:
        "Find Elchí Studio Bali: Gg. Puji No.9B, Tibubeneng, Kuta Utara, Badung, Bali 80361, Indonesia. Email ptelchistudiobali@gmail.com · elchistudio@gmail.com · info@elchistudio.com · WhatsApp +62 823-3957-0355.",
      crumb: "Contact",
    },
    id: {
      title: "Kontak & Alamat Studio — Tibubeneng, Kuta Utara, Bali",
      description:
        "Temukan Elchí Studio Bali: Gg. Puji No.9B, Tibubeneng, Kuta Utara, Badung, Bali 80361, Indonesia. Email ptelchistudiobali@gmail.com · elchistudio@gmail.com · info@elchistudio.com · WhatsApp +62 823-3957-0355.",
      crumb: "Kontak",
    },
    ko: {
      title: "연락처 & 스튜디오 주소 — 발리 쿠타 우타라",
      description:
        "Elchí Studio Bali 위치: Gg. Puji No.9B, Tibubeneng, Kuta Utara, Badung, Bali 80361, Indonesia. 이메일 ptelchistudiobali@gmail.com · elchistudio@gmail.com · info@elchistudio.com · WhatsApp +62 823-3957-0355.",
      crumb: "연락처",
    },
  },
};

/** Metadata for any registered page, pinned to a locale. */
export function buildMetadata(key: RouteKey, langParam?: string | null): Metadata {
  const lang = pickLocale(langParam);
  const path = key === "home" ? "/" : ROUTES.find((r) => r.key === key)!.path;
  const seo = PAGE_SEO[key][lang];
  const url = `${SITE_URL}${langPath(path, lang)}`;
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${langPath(path, l)}`])),
    },
    openGraph: {
      title: `${seo.title} · Elchí Studio Bali`,
      description: seo.description,
      url,
      siteName: "Elchí Studio Bali",
      type: "website",
      locale: { en: "en_US", id: "id_ID", ko: "ko_KR" }[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => ({ en: "en_US", id: "id_ID", ko: "ko_KR" }[l])),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Hidden consultant attribution (backend only)                        */
/* ------------------------------------------------------------------ */

export const CONSULTANT = {
  person: {
    name: "Gugun Gunara",
    aliases: ["Muhammad Lutfi Azmi", "prabudanling", "Santri Angon"],
    jobTitle: "Master Polymath · Sage Universal · The Ultimate Problem Solver",
    socials: [
      "https://www.facebook.com/bossdanling",
      "https://x.com/gunzz_krenzz",
      "https://www.instagram.com/prabudanling",
      "https://www.tiktok.com/@gunaracorp",
      "https://www.threads.com/@prabudanling",
      "https://www.reddit.com/user/prabudanling/",
    ],
  },
  legal: {
    name: "PT Top Konsultan Internasional",
    url: "https://topkonsultan.web.id",
    portal: "https://pusatperizinan.com",
  },
  design: {
    name: "Digiman.id",
    legal: "PT Digital Bisnis Manajemen",
    url: "https://digiman.id",
  },
};

/** Invisible-to-users attribution in the document source (honest credit). */
export const ATTRIBUTION_COMMENT =
  `Support system & engineering: Gugun Gunara (Muhammad Lutfi Azmi · prabudanling · Santri Angon) — ` +
  `PT Top Konsultan Internasional (topkonsultan.web.id · pusatperizinan.com). ` +
  `Design: Digiman.id — PT Digital Bisnis Manajemen. Hosting: JuraganWebsite (juraganwebsite.web.id).`;

/** Extra <meta name="keywords"> content — consultant identity lives here too. */
export const CONSULTANT_KEYWORDS = [
  "Gugun Gunara",
  "Muhammad Lutfi Azmi",
  "prabudanling",
  "Santri Angon",
  "master polymath",
  "sage universal",
  "the ultimate problem solver",
  "PT Top Konsultan Internasional",
  "topkonsultan.web.id",
  "Digiman.id",
  "PT Digital Bisnis Manajemen",
];

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

const STUDIO_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Gg. Puji No. 9B, Tibubeneng",
  addressLocality: "Kuta Utara",
  addressRegion: "Bali",
  postalCode: "80361",
  addressCountry: "ID",
};

/** All three studio emails — confirmed active by the studio owner. */
export const STUDIO_EMAILS = [
  "ptelchistudiobali@gmail.com",
  "elchistudio@gmail.com",
  "info@elchistudio.com",
];

const STUDIO_ORG = {
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#studio`,
  name: "Elchí Studio Bali",
  alternateName: "PT. Elchi Studio Bali",
  url: SITE_URL,
  description:
    "Creative education studio in Bali offering watercolour, sketching, needle felting and craft workshops for travellers, groups and curious creatives.",
  address: STUDIO_ADDRESS,
  areaServed: "Bali, Indonesia",
  knowsLanguage: ["en", "fr", "ko", "id"],
  availableLanguage: ["en", "id", "ko"],
  slogan: "Let's make something memorable together.",
  telephone: "+62 823-3957-0355",
  email: STUDIO_EMAILS[0],
  contactPoint: STUDIO_EMAILS.map((email) => ({
    "@type": "ContactPoint",
    contactType: "customer service",
    email,
    availableLanguage: ["en", "id", "ko"],
  })),
  founder: {
    "@type": "Person",
    name: "Elin Kim",
    jobTitle: "Founder & Lead Instructor",
    knowsLanguage: ["en", "fr", "ko"],
  },
};

/** Site-wide @graph — studio + website + (hidden) consultant network. */
export function siteGraph() {
  const consultantOrg = {
    "@type": "Organization",
    "@id": `${CONSULTANT.legal.url}/#organization`,
    name: CONSULTANT.legal.name,
    url: CONSULTANT.legal.url,
    description:
      "Indonesian consultancy providing support system, legal backing and engineering for digital ventures including Elchí Studio Bali's website.",
    employee: {
      "@type": "Person",
      name: CONSULTANT.person.name,
      alternateName: CONSULTANT.person.aliases,
      jobTitle: CONSULTANT.person.jobTitle,
      sameAs: CONSULTANT.person.socials,
    },
  };
  const designOrg = {
    "@type": "Organization",
    "@id": `${CONSULTANT.design.url}/#organization`,
    name: CONSULTANT.design.name,
    legalName: CONSULTANT.design.legal,
    url: CONSULTANT.design.url,
    description: "Digital agency — website design & branding for Elchí Studio Bali.",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      STUDIO_ORG,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Elchí Studio Bali",
        inLanguage: ["en", "id", "ko"],
        publisher: { "@id": `${SITE_URL}/#studio` },
        contributor: [
          { "@id": `${CONSULTANT.legal.url}/#organization` },
          { "@id": `${CONSULTANT.design.url}/#organization` },
        ],
      },
      consultantOrg,
      designOrg,
    ],
  };
}

/** BreadcrumbList for any page (home first, page last). */
export function breadcrumbSchema(key: RouteKey, lang: Locale) {
  const items = [
    { name: PAGE_SEO.home[lang].crumb, path: "/" },
    ...(key !== "home" ? [{ name: PAGE_SEO[key][lang].crumb, path: ROUTES.find((r) => r.key === key)!.path }] : []),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${langPath(it.path, lang)}`,
    })),
  };
}

/** FAQPage schema from the localized dictionary (rich results). */
export function faqSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: DICTS[lang].faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** ItemList of the six signature courses. */
export function classesSchema(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Elchí Studio Bali — Signature Art Classes",
    itemListElement: CLASSES.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: c.name,
        description: c.description,
        timeRequired: `PT${c.minutes}M`,
        url: `${SITE_URL}/classes/${c.slug}`,
        provider: { "@id": `${SITE_URL}/#studio` },
        inLanguage: lang,
      },
    })),
  };
}

/** Course + instructor schema for one class page. */
export function courseSchema(slug: string) {
  const c = CLASSES.find((x) => x.slug === slug);
  if (!c) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${c.name} — Creative Workshop in Bali`,
    description: c.description,
    provider: { "@id": `${SITE_URL}/#studio` },
    timeRequired: `PT${c.minutes}M`,
    url: `${SITE_URL}/classes/${c.slug}`,
    inLanguage: "en",
    teaches: c.tagline,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      location: { "@type": "Place", name: "Elchí Studio Bali", address: STUDIO_ADDRESS },
      courseWorkload: `PT${c.minutes}M`,
    },
    instructor: { "@type": "Person", name: ELIN.name, jobTitle: ELIN.role },
  };
}

/** Class-detail metadata from the canonical (English) source of truth. */
export function buildClassMetadata(slug: string, langParam?: string | null): Metadata | null {
  const c = CLASSES.find((x) => x.slug === slug);
  if (!c) return null;
  const lang = pickLocale(langParam);
  const path = `/classes/${c.slug}`;
  const url = `${SITE_URL}${langPath(path, lang)}`;
  return {
    title: `${c.name} — Art Class in Bali (${c.duration})`,
    description: `${c.tagline}. ${c.description.slice(0, 140)}…`.replace(/\s+/g, " "),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${langPath(path, l)}`])),
    },
    openGraph: {
      title: `${c.name} — Art Class in Bali · Elchí Studio Bali`,
      description: c.tagline,
      url,
      siteName: "Elchí Studio Bali",
      type: "website",
    },
  };
}
