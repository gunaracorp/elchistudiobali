import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentAdmin, hashPassword, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/password — change the admin password (session required). */
export async function POST(req: NextRequest) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Sesi berakhir — silakan login lagi." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const current = String(body.current ?? "");
    const next = String(body.next ?? "");

    if (next.length < 8) {
      return NextResponse.json({ error: "Password baru minimal 8 karakter." }, { status: 400 });
    }

    const user = await db.adminUser.findUnique({ where: { email } });
    if (!user || !verifyPassword(current, user.passwordHash)) {
      return NextResponse.json({ error: "Password saat ini salah." }, { status: 400 });
    }

    await db.adminUser.update({
      where: { email },
      data: { passwordHash: hashPassword(next) },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin.password]", err);
    return NextResponse.json({ error: "Gagal mengganti password." }, { status: 500 });
  }
}
