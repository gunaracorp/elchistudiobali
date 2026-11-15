import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Settings keys editable from the dashboard. */
export const SETTING_KEYS = [
  "studio_address",
  "studio_whatsapp",
  "studio_email",
  "studio_hours",
  "instagram_url",
] as const;

const MAX_LEN = 400;

/** GET /api/admin/settings — all editable settings. */
export async function GET() {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  const rows = await db.siteSetting.findMany();
  const settings = Object.fromEntries(SETTING_KEYS.map((k) => [k, rows.find((r) => r.key === k)?.value ?? ""]));
  return NextResponse.json({ settings });
}

/** PUT /api/admin/settings — bulk save (only whitelisted keys). */
export async function PUT(req: NextRequest) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Record<string, unknown>;
    for (const key of SETTING_KEYS) {
      if (!(key in body)) continue;
      const value = String(body[key] ?? "").slice(0, MAX_LEN).trim();
      await db.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin.settings.PUT]", err);
    return NextResponse.json({ error: "Gagal menyimpan pengaturan." }, { status: 500 });
  }
}
