import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** GET /api/admin/me — who is logged in (null when nobody). */
export async function GET() {
  const email = await currentAdmin();
  return NextResponse.json({ email });
}
