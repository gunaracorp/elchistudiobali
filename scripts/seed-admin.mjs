/**
 * Seed dasbor studio Elchí:
 *  - Akun admin (email resmi perusahaan dari NIB; password acak, dicetak SEKALI di sini)
 *  - Pengaturan situs default (alamat NIB, WhatsApp dari Ka Elchi, email NIB)
 *  - 8 foto galeri bawaan (hanya jika tabel galeri masih kosong)
 * Jalankan: node scripts/seed-admin.mjs
 */
import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const db = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ptelchistudiobali@gmail.com";
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || `Elchi-${randomBytes(4).toString("hex")}`;

const DEFAULT_SETTINGS = {
  studio_address:
    "BTS Business Park, Jalan Dewi Sartika No. 2B Building, Banjar Segara Kuta, Tuban, Kuta, Kabupaten Badung, Bali 80361",
  studio_whatsapp: "+62 823-3957-0355",
  studio_email: "ptelchistudiobali@gmail.com",
  studio_hours: "",
  instagram_url: "",
};

const DEFAULT_GALLERY = [
  { src: "/images/class-travel-drawing.jpg", caption: "Travel Drawing" },
  { src: "/images/class-dog-keychain.jpg", caption: "Dog Keychain" },
  { src: "/images/gallery-painting.png", caption: "Postcards in the making" },
  { src: "/images/class-flipflop.jpg", caption: "Custom Flip-Flop" },
  { src: "/images/class-creative-flow.png", caption: "Creative Flow" },
  { src: "/images/group-workshop.jpg", caption: "Private group joy" },
  { src: "/images/gallery-studio.png", caption: "The studio" },
  { src: "/images/class-tshirt.jpg", caption: "Custom T-shirt" },
];

async function main() {
  // Admin account
  const existing = await db.adminUser.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    console.log(`Admin sudah ada: ${ADMIN_EMAIL} (password tidak diubah)`);
  } else {
    await db.adminUser.create({
      data: { email: ADMIN_EMAIL, passwordHash: hashPassword(ADMIN_PASSWORD) },
    });
    console.log("=== KREDENSIAL ADMIN (cetak sekali) ===");
    console.log(`Email    : ${ADMIN_EMAIL}`);
    console.log(`Password : ${ADMIN_PASSWORD}`);
    console.log("======================================");
  }

  // Settings
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await db.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  console.log("Pengaturan default tersimpan (alamat NIB, WhatsApp, email).");

  // Gallery (only when empty)
  const count = await db.galleryImage.count();
  if (count === 0) {
    await db.galleryImage.createMany({
      data: DEFAULT_GALLERY.map((g, i) => ({ ...g, sortOrder: i + 1 })),
    });
    console.log(`Galeri bawaan di-seed: ${DEFAULT_GALLERY.length} foto.`);
  } else {
    console.log(`Galeri sudah berisi ${count} foto — tidak diubah.`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
