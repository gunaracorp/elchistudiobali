import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Admin auth — zero new dependencies (MVP, WordPress-style login).
 * - Passwords: scrypt with per-user random salt (store "salt:hash").
 * - Sessions: HMAC-SHA256 signed token in an httpOnly cookie.
 * Swap in NextAuth + database sessions before scaling beyond the studio.
 */

export const SESSION_COOKIE = "elchi_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function authSecret(): string {
  return process.env.AUTH_SECRET || "elchi-dev-secret-change-me";
}

/* ------------------------------- passwords -------------------------------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

/* -------------------------------- sessions -------------------------------- */

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

export function signSession(payload: { sub: string; exp: number }): string {
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", authSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined | null): { sub: string } | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", authSecret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      sub: string;
      exp: number;
    };
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return { sub: payload.sub };
  } catch {
    return null;
  }
}

export function newSessionPayload(sub: string) {
  return { sub, exp: Date.now() + SESSION_TTL_MS };
}

/** Read + verify the admin session from the request's cookie store. */
export async function currentAdmin(): Promise<string | null> {
  const store = await cookies();
  const session = verifySession(store.get(SESSION_COOKIE)?.value);
  return session?.sub ?? null;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}
