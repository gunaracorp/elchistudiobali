"use client";

import { motion } from "framer-motion";
import { useSite } from "./locale-provider";
import { useSettings, waHref } from "@/lib/site-settings";
import { track } from "@vercel/analytics/react";

/**
 * WhatsApp glyph — official brand path (lucide has no brand icons).
 */
export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.244-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a11.61 11.61 0 0 1-5.88-1.617l-.42-.25-4.3 1.128 1.15-4.203-.273-.28A11.61 11.61 0 0 1 2.06 12c0-6.41 5.22-11.62 11.64-11.62 3.11 0 6.03 1.21 8.23 3.4a11.56 11.56 0 0 1 3.41 8.23c0 6.41-5.22 11.62-11.64 11.62m9.92-21.53A13.61 13.61 0 0 0 13.7 0C6.14 0 0 6.14 0 13.7c0 2.41.63 4.76 1.83 6.83L0 24l3.6-.94a13.64 13.64 0 0 0 6.1 1.55h.01c7.53 0 13.66-6.14 13.66-13.7 0-3.66-1.43-7.1-4.03-9.68z" />
    </svg>
  );
}

/**
 * Studio default — Ms. Elin's number (mirrors the landing site). The float
 * must NEVER disappear just because /api/settings is still empty (settings
 * live in the deployment database, which starts blank). Override anytime
 * via /admin → Pengaturan.
 */
const DEFAULT_WA = "+62 823-3957-0355";

/** Pre-filled first message per locale — visitors land in a warm chat. */
const WA_CHAT: Record<string, string> = {
  en: "Hi Elin! I'd love to know more about your classes ✦",
  id: "Halo Elin! Aku ingin tanya soal kelasnya ✦",
  ko: "안녕하세요 Elin! 클래스에 대해 문의하고 싶어요 ✦",
};

/** Hover bubble next to the float. */
const WA_BUBBLE: Record<string, string> = {
  en: "Chat with Ms. Elin ✦ fast replies",
  id: "Chat dengan Ms. Elin ✦ dibalas cepat",
  ko: "Ms. Elin과 채팅 ✦ 빠른 응답",
};

/**
 * WhatsAppFloat — sticky chat button (green), stacked above the
 * concierge bubble. Always visible: falls back to the studio number
 * when settings are empty, so every visitor can reach the studio.
 */
export function WhatsAppFloat() {
  const { d, locale } = useSite();
  const settings = useSettings();
  const number = settings?.studio_whatsapp || DEFAULT_WA;

  return (
    <motion.a
      href={waHref(number, WA_CHAT[locale] ?? WA_CHAT.en)}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_float_click")}
      aria-label={d.footer.waFloatAria}
      className="group fixed bottom-[92px] right-5 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.45)] transition-transform hover:scale-105"
      initial={{ scale: 0, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ delay: 4.4, type: "spring", stiffness: 260, damping: 18 }}
    >
      {/* soft pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-waping" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7" />
      {/* greeting bubble — announces itself once, then hover-only */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[4.25rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-cream/15 bg-ink/85 px-4 py-2 font-monobrand text-[10px] uppercase tracking-[0.18em] text-blush opacity-0 shadow-xl backdrop-blur transition-opacity duration-300 group-hover:opacity-100 animate-[wabubble_9s_ease_4.8s] sm:block"
      >
        {WA_BUBBLE[locale] ?? WA_BUBBLE.en}
      </span>
    </motion.a>
  );
}
