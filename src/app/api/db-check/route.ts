import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";

/**
 * DIAGNOSTIC (sementara) — serverless runtime check untuk API booking.
 * Tidak mengekspos kredensial; hanya path & keberadaan file + hasil
 * kueri Prisma. Hapus setelah stabil.
 */
export async function GET() {
  const cwd = process.cwd();
  const bundled = path.join(cwd, "db", "custom.db");
  const tmp = "/tmp/db/custom.db";

  let prisma: string = "unknown";
  let bookingCount: number | null = null;
  try {
    bookingCount = await db.booking.count();
    prisma = "ok";
  } catch (e) {
    prisma = e instanceof Error ? e.message.slice(0, 400) : String(e).slice(0, 400);
  }

  let cwdWritable = false;
  try {
    fs.accessSync(cwd, fs.constants.W_OK);
    cwdWritable = true;
  } catch {
    cwdWritable = false;
  }

  return NextResponse.json({
    cwd,
    bundledExists: fs.existsSync(bundled),
    bundledSize: fs.existsSync(bundled) ? fs.statSync(bundled).size : 0,
    tmpExists: fs.existsSync(tmp),
    cwdWritable,
    prisma,
    bookingCount,
  });
}
