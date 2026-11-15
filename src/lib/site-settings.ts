"use client";

import { useEffect, useState } from "react";

/**
 * Public site settings — edited from /admin, served by /api/settings.
 * `null` means "still loading"; components render their i18n fallback.
 */
export type SiteSettings = {
  studio_address: string;
  studio_whatsapp: string;
  studio_email: string;
  studio_hours: string;
  instagram_url: string;
};

export const EMPTY_SETTINGS: SiteSettings = {
  studio_address: "",
  studio_whatsapp: "",
  studio_email: "",
  studio_hours: "",
  instagram_url: "",
};

export function waHref(number: string, text?: string): string {
  const digits = number.replace(/[^0-9]/g, "").replace(/^0/, "62");
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${digits}${q}`;
}

export function useSettings(): SiteSettings | null {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings({ ...EMPTY_SETTINGS, ...(d.settings ?? {}) }))
      .catch(() => setSettings(EMPTY_SETTINGS));
  }, []);
  return settings;
}
