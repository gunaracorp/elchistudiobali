import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Public site settings — only these keys are exposed to visitors. */
const PUBLIC_KEYS = ["studio_address", "studio_whatsapp", "studio_email", "studio_hours", "instagram_url"];

/** GET /api/settings — public settings used by the site footer & contact areas. */
export async function GET() {
  try {
    const rows = await db.siteSetting.findMany({
      where: { key: { in: PUBLIC_KEYS } },
    });
    const settings = Object.fromEntries(
      PUBLIC_KEYS.map((k) => [k, rows.find((r) => r.key === k)?.value ?? ""])
    );
    return NextResponse.json({ settings });
  } catch (err) {
    console.error("[settings.GET]", err);
    return NextResponse.json({ settings: {} }, { status: 200 });
  }
}
