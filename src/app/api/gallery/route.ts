import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/gallery — public gallery entries managed from the dashboard.
 * Empty result means the site falls back to its built-in editorial shots.
 */
export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 60,
    });
    return NextResponse.json({ images });
  } catch (err) {
    console.error("[gallery.GET]", err);
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
