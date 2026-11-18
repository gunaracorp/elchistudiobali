/**
 * Server-side studio facts for the AI concierge (ROADMAP Langkah 17).
 * Everything here is OFFICIAL studio information — nothing invented.
 */

/** Official studio WhatsApp (public on the site's float widget). */
export const STUDIO_WA = "+62 823-3957-0355";

/** Canonical booking form URL. */
export const BOOKING_URL = "https://www.elchistudio.web.id/booking";

/**
 * Current Bali date & time (WITA, UTC+8) — e.g.
 * "Tuesday, 18 November 2026 at 14:35 WITA (Bali time)".
 * Fresh on every concierge request, so the AI can interpret
 * "today / tomorrow / this weekend" correctly.
 */
export function baliNow(): string {
  return (
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Makassar",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()) + " WITA (Bali time)"
  );
}
