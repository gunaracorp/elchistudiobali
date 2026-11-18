/**
 * ELCHÍ STUDIO BALI — The Studio Journal (ROADMAP Langkah 13).
 * Articles are authored from the studio's OFFICIAL facts only
 * (src/lib/classes-data.ts + published materials). No invented
 * prices, schedules or claims. English bodies serve the main
 * search audience; UI labels are trilingual (en/id/ko).
 */

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO publish date
  readingMinutes: number;
  tag: string;
  excerpt: string;
  body: string; // markdown
};

export const ARTICLES: BlogArticle[] = [
  {
    slug: "travel-drawing-bali",
    title: "Travel Drawing in Bali: Turn Your Trip Into a Sketchbook",
    description:
      "How Travel Drawing at Elchí Studio Bali works: 100 minutes, pencils and pens, one photo of a place you love — and a hand-drawn souvenir of your trip.",
    date: "2026-10-28",
    readingMinutes: 4,
    tag: "Sketching",
    excerpt:
      "Photos blur; sketches stay. How a 100-minute Travel Drawing class turns the place you love into a hand-drawn souvenir — no experience needed.",
    body: `Every trip eventually blurs. The beaches blend together, the sunsets become one sunset, and three months later you are flipping through a camera roll that all looks the same. A sketchbook breaks that blur. When you draw a place — even imperfectly, especially imperfectly — you keep it.

Travel Drawing is our 100-minute class built exactly for that. You will learn essential sketching skills and use pencils and pens to recreate a destination of your choice. Like every class at Elchí Studio Bali, it is open to all skill levels: whether you are picking up a pencil for the first time or refining techniques you already have.

## Bring one photo — that is the whole preparation

You do not need to carry sketching supplies or prepare anything fancy. Bring photos on your phone of the place you want to draw. Choosing the photo is worth thirty seconds of thought:

- Pick **one clear subject** — a temple gate, a beach umbrella, a scooter parked outside a warung — rather than a whole panorama.
- Look for **big, simple shapes**. A scene with three or four main forms is friendlier than one with thirty.
- Choose a place that **means something to you**. You are about to spend quality time with this image.

## What actually happens in the minutes

Nobody starts with details. You block the big shapes first, find the horizon, let the composition breathe — and only then let the smaller lines in. Working with pencils and pens (instead of erasable perfection) keeps your lines honest and your confidence growing: a wobbly line that is *yours* beats a timid one that is not.

By the end of the session you will have a hand-drawn version of a place you love, made by your own hand. That is a souvenir no gift shop sells.

## Who it is for

- Travellers who want their trip to last a little longer
- First-timers who always wanted to draw but never started
- Anyone refining their sketching technique with guided feedback

Every class is led by Elin Kim — 19 years of teaching experience, trained in art restoration at École de Condé Paris and Fine Arts at ESADMM Marseille — and classes are taught in English, French and Korean. You will not be left guessing.

## Book your seat

Ready to sketch your Bali? Reserve through the [booking form](https://www.elchistudio.web.id/booking): your name, email, class and preferred date. No payment is taken upfront — the studio confirms availability personally and shares the exact address and WhatsApp number with your confirmation.`,
  },
  {
    slug: "first-art-class-bali",
    title: "How to Choose Your First Creative Class in Bali (No Experience Needed)",
    description:
      "Every Elchí class is beginner-friendly. Compare all six classes — travel sketching, postcards, felting, flip-flops, T-shirts, creative flow — and pick yours.",
    date: "2026-11-08",
    readingMinutes: 5,
    tag: "Beginner guide",
    excerpt:
      "Six classes, one honest guide: what you will actually make in each, how to pick, and why \u201cI can't draw a straight line\u201d is not a dealbreaker.",
    body: `"I can't even draw a straight line." We hear it at the door, almost every day. And almost every day, that same person leaves a couple of hours later holding something they made with their own hands.

Here is the honest truth: every class at Elchí Studio Bali is open to every skill level. You do not need experience to start — that is literally what the classes are for. The only real question is what you want to take home.

## The six classes at a glance

- **Travel Drawing (100 minutes)** — essential sketching skills with pencils and pens to recreate a destination of your choice. Bring photos on your phone of the place you want to draw.
- **Postcards (100 minutes)** — choose 3 favourite designs from a collection of unique Bali-themed postcards and learn basic watercolour techniques plus acrylic pens and coloured pencils.
- **Dog Keychain (110 minutes)** — needle-felting with felting wool to create a 3D version of your own dog. Bring photos of your dog — yes, really.
- **Custom Flip-Flop (60 minutes)** — redesign flip-flops by wrapping the straps in your favourite colours and adding ten special charms. (Ankle straps are available for purchase separately at the studio.)
- **Custom T-shirt (90 minutes)** — choose your shirt colour and size, paint your own design, and learn creative cutting techniques. No sewing required.
- **Creative Flow (90 minutes)** — bring your own art goals, choose your materials, and enjoy a relaxed group class with personalised guidance, including at least 20 minutes of one-on-one feedback.

## How to actually choose

Ask yourself one thing: **what do I want to be holding at the end?**

- A drawing of a place you love → Travel Drawing
- A painted postcard (and a letter that arrives months later) → Postcards
- A tiny felt version of your dog → Dog Keychain
- Something you can wear → Custom T-shirt or Custom Flip-Flop
- Total creative freedom → Creative Flow

## A teacher worth 19 years

Every class is led by Elin Kim — 19 years of teaching experience, art restoration studies at École de Condé Paris, Fine Arts at ESADMM Marseille, and workshops for organisations including Pinterest, Bottega Veneta, Westfield, Mirvac, ClassBento and the Korean Cultural Centre Australia. Her previous studio, Elin's Classes, earned over 250 five-star reviews.

Classes are taught in English, French and Korean — so the tips actually land, whatever language you dream in.

## Going private

Travelling with a crew? Private group classes run for hen's parties, birthdays and team-building days — up to 50 participants. Prefer the spotlight? A Private 1:1 Class (90 minutes) is tailored entirely to your interests.

## Reserve your seat

Pick your class in the [booking form](https://www.elchistudio.web.id/booking) — name, email, class, preferred date, participants. No payment is taken upfront; the studio confirms availability personally and shares the exact address and WhatsApp number with your confirmation.`,
  },
  {
    slug: "postcards-future-self",
    title: "Postcards to Your Future Self: Bali's Slow-Mail Surprise",
    description:
      "Paint Bali-themed postcards in watercolour, write a letter to your future self, pick a month — and let the studio mail it months later as a surprise.",
    date: "2026-11-18",
    readingMinutes: 4,
    tag: "Watercolour",
    excerpt:
      "Paint three Bali-themed postcards, write a letter to your future self, pick a month — and let the studio mail the surprise.",
    body: `Somewhere between instant messages and disappearing stories, a hand-painted postcard arriving months after your holiday has become almost radical. We built our Postcards class around that little bit of magic.

## Paint first

Postcards is a 100-minute watercolour session. You choose 3 favourite designs from a collection of unique Bali-themed postcards, then learn basic watercolour techniques — plus acrylic pens and coloured pencils for the details that make a design yours. No experience needed: the collection gives you a running start, and your brush does the rest.

## Then write

Here is the part people do not expect. Afterwards, you may write a letter to your future self or a loved one. Pick a month. The studio mails it later — as a surprise.

Imagine opening your mailbox in March to find your own handwriting from a humid afternoon in Bali: what you hoped for, what you were grateful for, the joke from the class. Or imagine your best friend receiving it instead, completely out of the blue.

## Why slow mail works

- **Anticipation is part of the gift.** A message arrives; a letter is *awaited*.
- **Paper keeps what feeds forget.** Months later, ink still says what a story long expired cannot.
- **Your hand is in it.** The wobbly watercolour sky is proof a human made this — specifically, you.

## Who loves this class

Couples splitting the set (three designs, two painters, friendly negotiations). Friends who want a shared ritual. Solo travellers writing to the person they are becoming. It also pairs beautifully with the last days of a trip — you leave, and a piece of Bali follows you home slowly.

## The practical bit

All materials are at the studio. Reserve through the [booking form](https://www.elchistudio.web.id/booking) with your name, email, class and preferred date — no payment is taken upfront, and the studio confirms availability personally. Then choose your month. The postman will do the rest.`,
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Trilingual UI labels for the journal surfaces. */
export const BLOG_UI = {
  en: {
    kicker: "The Studio Journal",
    heading: "Stories from the studio desk",
    sub: "Sketching tips, class guides and small behind-the-scenes moments — written by the Elchí Studio Bali team from real studio life.",
    readMore: "Read the story",
    back: "All stories",
    minRead: "min read",
    ready: "Ready to make something memorable?",
    cta: "Book your class",
    by: "From the studio desk — Elin Kim & team",
  },
  id: {
    kicker: "Jurnal Studio",
    heading: "Cerita dari meja studio",
    sub: "Tips menggambar, panduan kelas, dan momen di balik layar — ditulis tim Elchí Studio Bali dari kehidupan studio yang sesungguhnya.",
    readMore: "Baca ceritanya",
    back: "Semua cerita",
    minRead: "menit baca",
    ready: "Siap berkarya yang berkesan?",
    cta: "Pesan kelasmu",
    by: "Dari meja studio — Elin Kim & tim",
  },
  ko: {
    kicker: "스튜디오 저널",
    heading: "스튜디오 데스크에서 온 이야기",
    sub: "스케치 팁, 클래스 가이드, 그리고 작은 비하인드 — Elchí Studio Bali 팀이 직접 쓴 이야기입니다.",
    readMore: "이야기 읽기",
    back: "모든 이야기",
    minRead: "분 읽기",
    ready: "기억에 남을 작품, 준비됐나요?",
    cta: "클래스 예약하기",
    by: "스튜디오 데스크에서 — Elin Kim & 팀",
  },
  zh: {
    kicker: "工作室日志",
    heading: "来自工作室书桌的故事",
    sub: "速写技巧、课程指南与幕后小故事——由 Elchí Studio Bali 团队从真实的工作室生活写起。",
    readMore: "阅读全文",
    back: "所有文章",
    minRead: "分钟阅读",
    ready: "准备好创造难忘的回忆了吗？",
    cta: "预约你的课程",
    by: "来自工作室书桌——Elin Kim 与团队",
  },
} as const;

export type BlogLocale = keyof typeof BLOG_UI;
