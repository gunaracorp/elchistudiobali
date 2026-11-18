import type { MetadataRoute } from "next";

/** PWA manifest — the studio becomes an installable app (ROADMAP Langkah 4). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elchí Studio Bali — Creative Workshops & Art Classes",
    short_name: "Elchí",
    description:
      "Creative art classes in Bali with Elin Kim — watercolour, sketching, felting & custom crafts. Art, fun and skills.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#2c2119",
    theme_color: "#c93a6c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
