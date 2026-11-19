import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const VALID_CLASSES = new Set([
  "travel-drawing", "postcards", "dog-keychain", "custom-flip-flop",
  "custom-t-shirt", "creative-flow", "private-group", "private-1on1",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = body.phone ? String(body.phone).trim().slice(0, 40) : null;
    const classType = String(body.classType ?? "").trim();
    const preferredDate = body.preferredDate ? String(body.preferredDate).slice(0, 20) : null;
    const participants = Math.min(Math.max(Number(body.participants) || 1, 1), 50);
    const message = body.message ? String(body.message).trim().slice(0, 1000) : null;
    // Partner referral source (Langkah 23) — /booking?ref=CODE lands here.
    const ref = body.ref ? String(body.ref).trim().slice(0, 40) || null : null;

    if (name.length < 2 || name.length > 80) {
      return NextResponse.json(
        { error: "Please give us your name (2–80 characters).", code: "invalid_name" },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "That email doesn't look right — mind checking it?", code: "invalid_email" },
        { status: 400 }
      );
    }
    if (!VALID_CLASSES.has(classType)) {
      return NextResponse.json(
        { error: "Please choose one of our classes.", code: "invalid_class" },
        { status: 400 }
      );
    }

    const booking = await db.booking.create({
      data: { name, email, phone, classType, preferredDate, participants, message, ref },
    });

    return NextResponse.json({ ok: true, id: booking.id }, { status: 201 });
  } catch (err) {
    console.error("[bookings.POST]", err);
    return NextResponse.json(
      { error: "The studio mailbox hiccuped — please try again in a moment." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key") ?? "";
    const expected = process.env.ADMIN_KEY ?? "elchi-studio-2026";
    if (key !== expected) {
      return NextResponse.json({ error: "Invalid studio key." }, { status: 401 });
    }
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    console.error("[bookings.GET]", err);
    return NextResponse.json({ error: "Failed to load bookings." }, { status: 500 });
  }
}
