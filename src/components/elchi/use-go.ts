"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSite } from "./locale-provider";
import { routeFor } from "@/lib/seo";

/**
 * useGo — route-aware navigation for section anchors.
 * On the one-page homepage an anchor (#booking…) smooth-scrolls, keeping
 * the signature single-scroll feel. On any SEO subpage the same anchor
 * navigates to its dedicated route (/booking?lang=…) so every CTA stays
 * a real crawlable link. `hrefFor(hash)` builds that crawlable href.
 */
export function useGo() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useSite();
  const onHome = pathname === "/";

  const go = useCallback(
    (hash: string) => {
      if (onHome) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`${routeFor(hash)}?lang=${locale}`);
      }
    },
    [onHome, router, locale]
  );

  /** Crawlable href for an anchor: the dedicated route pinned to the locale. */
  const hrefFor = useCallback(
    (hash: string) => {
      const route = routeFor(hash);
      return onHome ? hash : `${route}?lang=${locale}`;
    },
    [onHome, locale]
  );

  return { go, hrefFor, onHome };
}
