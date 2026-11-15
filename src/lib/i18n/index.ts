import { CLASSES, GALLERY_SHOTS, PRIVATE_EXPERIENCES } from "@/lib/classes-data";
import { en } from "./en";
import { id } from "./id";
import { ko } from "./ko";
import type {
  ClassContent,
  ClassSlug,
  GalleryShot,
  Locale,
  LocaleData,
  PrivateContent,
} from "./types";

export type { Locale, LocaleData, ClassContent, PrivateContent, GalleryShot } from "./types";
export { LOCALES_LABELS } from "./labels";

export const DICTS: Record<Locale, LocaleData> = { en, id, ko };

export const DEFAULT_LOCALE: Locale = "en";
export const STORAGE_KEY = "elchi-locale";
export const LOCALE_CODES: Locale[] = ["en", "id", "ko"];

/** Localized duration label from canonical minutes. */
export function durationFor(minutes: number, locale: Locale): string {
  if (locale === "id") return `${minutes} menit`;
  if (locale === "ko") return `${minutes}분`;
  return `${minutes} minutes`;
}

/** Merge structural class facts with localized copy, in canonical order. */
export function classList(locale: Locale): ClassContent[] {
  const data = DICTS[locale];
  return CLASSES.map((c) => ({
    slug: c.slug,
    name: c.name,
    image: c.image,
    accent: c.accent,
    minutes: c.minutes,
    duration: durationFor(c.minutes, locale),
    ...data.classes[c.slug as ClassSlug],
  }));
}

/** Private experiences merged with localized copy. */
export function privateList(locale: Locale): PrivateContent[] {
  const data = DICTS[locale];
  return data.privates.map((p) => ({
    ...p,
    image:
      PRIVATE_EXPERIENCES.find((e) => e.slug === p.slug)?.image ??
      "/images/group-workshop.jpg",
  }));
}

/** Gallery shots merged with localized alt text and captions. */
export function galleryShots(locale: Locale): GalleryShot[] {
  const data = DICTS[locale];
  return GALLERY_SHOTS.map((s, i) => ({
    src: s.src,
    span: s.span,
    h: s.h,
    ...data.gallery[i],
  }));
}

/** Replace simple {token} placeholders in a dictionary string. */
export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}
