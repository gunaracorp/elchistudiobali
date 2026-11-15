/**
 * ELCHÍ STUDIO BALI — i18n type system.
 * Three locales: Indonesian (id), English (en), Korean (ko).
 * Every user-facing string lives in a LocaleData record; structural
 * facts (slugs, images, durations, accents) stay in classes-data.ts.
 */

export type Locale = "en" | "id" | "ko";

export type ClassSlug =
  | "travel-drawing"
  | "postcards"
  | "dog-keychain"
  | "custom-flip-flop"
  | "custom-t-shirt"
  | "creative-flow";

export type PrivateSlug = "private-group" | "private-1on1";

/** Split display heading: plain part a, script accent, plain part b. */
export type Text3 = { a: string; script: string; b: string };

export type NavItem = { href: string; label: string };

export type Dict = {
  navLinks: NavItem[];
  meta: {
    skip: string;
    mainNav: string;
    menuDialog: string;
    openMenu: string;
    closeMenu: string;
    menuTag: string;
    langGroup: string;
    bookCta: string;
  };
  loader: { hello: string };
  hero: {
    aria: string;
    badge: string;
    h1: Text3;
    sub: { pre: string; strong: string; post: string };
    ctaPrimary: string;
    ctaSecondary: string;
    scrollCue: string;
    statsLabels: [string, string, string, string];
  };
  marquee: { aria: string };
  about: {
    aria: string;
    kicker: string;
    h2: Text3;
    p1: string;
    p2: string;
    values: { title: string; body: string }[];
    studioAlt: string;
    postcardsAlt: string;
  };
  classesSec: {
    aria: string;
    kicker: string;
    h2: Text3;
    sub: string;
    reserve: string;
    bring: string;
    classAlt: string;
    bookCta: string;
    ariaBookCta: string;
    bannerKicker: string;
    bannerTitle: Text3;
    bannerCta: string;
  };
  experiences: {
    aria: string;
    kicker: string;
    h2: Text3;
    sub: string;
    quote: string;
  };
  instructor: {
    aria: string;
    kicker: string;
    h2: Text3;
    education: string;
    certifications: string;
    journey: string;
    clientsKicker: string;
    clientsAria: string;
    portraitAlt: string;
  };
  gallery: {
    aria: string;
    kicker: string;
    h2: Text3;
    sub: string;
    cardTitle: Text3;
    cardBody: string;
    lightboxAria: string;
    closeAria: string;
    prevAria: string;
    nextAria: string;
  };
  booking: {
    aria: string;
    kicker: string;
    h2: Text3;
    sub: string;
    steps: [string, string, string];
    formTitle: string;
    formAria: string;
    labels: {
      name: string;
      email: string;
      phone: string;
      phoneOpt: string;
      date: string;
      cls: string;
      participants: string;
      message: string;
      messageOpt: string;
    };
    ph: { name: string; email: string; message: string };
    sending: string;
    submit: string;
    noPay: string;
    successTitle: string;
    successBody: string;
    sendAnother: string;
    errors: { name: string; email: string; cls: string; generic: string };
  };
  faq: {
    aria: string;
    kicker: string;
    h2: Text3;
    still: string;
    stillLink: string;
    stillTail: string;
  };
  footer: {
    aria: string;
    kicker: string;
    h2: Text3;
    start: string;
    browse: string;
    studioT: string;
    studioEmpty: string;
    waT: string;
    waB: string;
    waCta: string;
    waFloatAria: string;
    mailT: string;
    mailB: string;
    compT: string;
    compB: string;
    blurb: string;
    explore: string;
    workshops: string;
    rights: string;
    made: string;
    admin: string;
  };
  concierge: {
    open: string;
    close: string;
    dialogAria: string;
    title: string;
    badge: string;
    greeting: string;
    quick: [string, string, string];
    ph: string;
    sendAria: string;
    typing: string;
    failReply: string;
    failCatch: string;
  };
  admin: {
    title: string;
    desc: string;
    keyLabel: string;
    keyPh: string;
    unlock: string;
    received: string;
    refresh: string;
    lock: string;
    empty: string;
    mvp: string;
    pax: string;
    pref: string;
  };
};

export type ClassText = {
  tagline: string;
  description: string;
  bring?: string;
  note?: string;
};

export type PrivateText = {
  slug: PrivateSlug;
  name: string;
  short: string;
  optionLabel: string;
  cta: string;
  lead: string;
  body: string;
  how: string;
  extra?: string;
};

export type ElinText = {
  role: string;
  reviewsLine: string;
  languagesLine: string;
  bio: [string, string, string];
  certifications: { year: string; text: string }[];
  experience: { year: string; text: string }[];
};

export type GalleryText = { alt: string; caption: string };

/** Fully merged class content (structure + localized copy). */
export type ClassContent = {
  slug: string;
  name: string;
  image: string;
  accent: string;
  minutes: number;
  duration: string;
  tagline: string;
  description: string;
  bring?: string;
  note?: string;
};

/** Fully merged private experience (localized copy + structural image). */
export type PrivateContent = PrivateText & { image: string };

/** Fully merged gallery shot (structure + localized alt/caption). */
export type GalleryShot = {
  src: string;
  alt: string;
  caption: string;
  span: string;
  h: string;
};

export type LocaleData = {
  chrome: Dict;
  classes: Record<ClassSlug, ClassText>;
  privates: PrivateText[];
  elin: ElinText;
  faqs: { q: string; a: string }[];
  gallery: GalleryText[];
};
