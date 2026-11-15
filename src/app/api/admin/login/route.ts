import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newSessionPayload, sessionCookieOptions, SESSION_COOKIE, signSession, verifyPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** POST /api/admin/login — WordPress-style email + password login. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
    }

    const user = await db.adminUser.findUnique({ where: { email } });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
    }

    const token = signSession(newSessionPayload(email));
    const res = NextResponse.json({ ok: true, email: user.email });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[admin.login]", err);
    return NextResponse.json({ error: "Login gagal — coba lagi sebentar." }, { status: 500 });
  }
}
