import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** GET /api/admin/gallery — all entries, ordered. */
export async function GET() {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  const images = await db.galleryImage.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });
  return NextResponse.json({ images });
}

/** POST /api/admin/gallery — add an image (uploaded src or external URL). */
export async function POST(req: NextRequest) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const body = await req.json();
    const src = String(body.src ?? "").trim();
    const caption = String(body.caption ?? "").trim().slice(0, 160) || "Elchí Studio Bali";
    if (!src || !/^(\/|https?:\/\/)/.test(src)) {
      return NextResponse.json({ error: "URL gambar tidak valid." }, { status: 400 });
    }
    const last = await db.galleryImage.findFirst({ orderBy: [{ sortOrder: "desc" }] });
    const image = await db.galleryImage.create({
      data: { src, caption, sortOrder: (last?.sortOrder ?? 0) + 1 },
    });
    return NextResponse.json({ image }, { status: 201 });
  } catch (err) {
    console.error("[admin.gallery.POST]", err);
    return NextResponse.json({ error: "Gagal menambah foto." }, { status: 500 });
  }
}

/** PATCH /api/admin/gallery — bulk reorder or edit caption. */
export async function PATCH(req: NextRequest) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (Array.isArray(body.order)) {
      const ids = body.order as string[];
      await db.$transaction(
        ids.map((id, i) => db.galleryImage.update({ where: { id }, data: { sortOrder: i + 1 } }))
      );
      return NextResponse.json({ ok: true });
    }
    if (typeof body.id === "string" && typeof body.caption === "string") {
      await db.galleryImage.update({
        where: { id: body.id },
        data: { caption: body.caption.slice(0, 160).trim() || "Elchí Studio Bali" },
      });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Permintaan tidak dipahami." }, { status: 400 });
  } catch (err) {
    console.error("[admin.gallery.PATCH]", err);
    return NextResponse.json({ error: "Gagal memperbarui foto." }, { status: 500 });
  }
}

/** DELETE /api/admin/gallery?id=… */
export async function DELETE(req: NextRequest) {
  const email = await currentAdmin();
  if (!email) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id wajib diisi." }, { status: 400 });
  }
  try {
    await db.galleryImage.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin.gallery.DELETE]", err);
    return NextResponse.json({ error: "Gagal menghapus foto." }, { status: 500 });
  }
}
