import type { Locale } from "./types";

/** Language switcher entries — native labels, ordered ID → EN → 한국어 → 中文. */
export const LOCALES_LABELS: { code: Locale; native: string; label: string }[] = [
  { code: "id", native: "ID", label: "Bahasa Indonesia" },
  { code: "en", native: "EN", label: "English" },
  { code: "ko", native: "한국어", label: "한국어" },
  { code: "zh", native: "中文", label: "中文" },
];
