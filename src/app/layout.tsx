import type { Metadata } from "next";
import { Fraunces, Manrope, Pacifico, Space_Mono, Noto_Sans_KR, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Elchí Studio Bali — Creative Workshops & Art Classes in Bali",
  description:
    "Watercolour postcards, travel sketching, needle felting and craft workshops in Bali. Art, fun and skills — with Elin's 19 years of teaching magic. All skill levels welcome, taught in English, French and Korean.",
  keywords: [
    "Elchi Studio Bali", "creative workshop Bali", "art class Bali",
    "watercolour workshop", "needle felting class", "travel drawing",
    "craft workshop Ubud", "Elin Kim artist", "Bali art studio",
    "kelas seni Bali", "lokakarya kreatif Bali", "워크숍 발리", "발리 미술 클래스",
  ],
  authors: [{ name: "Elchí Studio Bali" }],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Elchí Studio Bali",
  alternateName: "PT. Elchi Studio Bali",
  description:
    "Creative education studio in Bali offering watercolour, sketching, needle felting and craft workshops for travellers, groups and curious creatives.",
  areaServed: "Bali, Indonesia",
  knowsLanguage: ["en", "fr", "ko", "id"],
  availableLanguage: ["en", "id", "ko"],
  slogan: "Let's make something memorable together.",
  founder: {
    "@type": "Person",
    name: "Elin Kim",
    jobTitle: "Founder & Lead Instructor",
    knowsLanguage: ["en", "fr", "ko"],
  },
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
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
