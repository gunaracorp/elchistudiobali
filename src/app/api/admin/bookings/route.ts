import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** GET /api/admin/bookings — booking inbox (admin session or legacy key). */
export async function GET(req: NextRequest) {
  const email = await currentAdmin();
  const legacyKey = req.nextUrl.searchParams.get("key") ?? "";
  const expectedKey = process.env.ADMIN_KEY ?? "elchi-studio-2026";
  if (!email && legacyKey !== expectedKey) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("[admin.bookings]", err);
    return NextResponse.json({ error: "Gagal memuat booking." }, { status: 500 });
  }
}
