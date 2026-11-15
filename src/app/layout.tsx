import type { Metadata } from "next";
import { Fraunces, Manrope, Pacifico, Space_Mono, Noto_Sans_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ATTRIBUTION_COMMENT, CONSULTANT_KEYWORDS, SITE_URL, siteGraph } from "@/lib/seo";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const notoKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  weight: ["400", "700", "900"],
  display: "swap",
  preload: false,
});

const nanumPen = Nanum_Pen_Script({
  variable: "--font-nanum-pen",
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elchí Studio Bali — Creative Workshops & Art Classes in Bali",
    template: "%s · Elchí Studio Bali",
  },
  description:
    "Watercolour postcards, travel sketching, needle felting and craft workshops in Bali. Art, fun and skills — with Elin's 19 years of teaching magic. All skill levels welcome, taught in English, French and Korean.",
  keywords: [
    "Elchi Studio Bali", "creative workshop Bali", "art class Bali",
    "watercolour workshop", "needle felting class", "travel drawing",
    "craft workshop Ubud", "Elin Kim artist", "Bali art studio",
    "kelas seni Bali", "lokakarya kreatif Bali", "워크숍 발리", "발리 미술 클래스",
    "art class Kuta", "private art workshop Bali", "team building Bali",
    ...CONSULTANT_KEYWORDS,
  ],
  authors: [
    { name: "Elchí Studio Bali" },
    { name: "PT Top Konsultan Internasional — support system & legal (Gugun Gunara)", url: "https://topkonsultan.web.id" },
    { name: "Digiman.id — PT Digital Bisnis Manajemen (design)", url: "https://digiman.id" },
  ],
  creator: "Digiman.id — PT Digital Bisnis Manajemen",
  publisher: "PT. Elchi Studio Bali",
  openGraph: {
    title: "Elchí Studio Bali — A Creative Learning Experience",
    description:
      "Let's make something memorable together. Creative workshops in Bali: watercolour, sketching, felting & custom crafts.",
    siteName: "Elchí Studio Bali",
    type: "website",
    locale: "en_US",
    alternateLocale: ["id_ID", "ko_KR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elchí Studio Bali",
    description: "Creative workshops & art classes in Bali — art, fun and skills with 19 years of teaching magic.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${manrope.variable} ${pacifico.variable} ${spaceMono.variable} ${notoKr.variable} ${nanumPen.variable} antialiased bg-cream text-ink font-sans`}
      >
        {/* Backend attribution only — never rendered visibly. */}
        <span
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: `<!-- ${ATTRIBUTION_COMMENT} -->` }}
        />
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph()) }}
        />
      </body>
    </html>
  );
}
