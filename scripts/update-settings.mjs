/**
 * Update pengaturan situs Elchí: alamat confirmed baru + 3 email aktif.
 * Skema SiteSetting = key-value store (key @id, value String).
 * Jalankan: node scripts/update-settings.mjs
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const UPDATES = {
  studio_address:
    "Gg. Puji No. 9B, Tibubeneng, Kec. Kuta Utara, Kabupaten Badung, Bali 80361, Indonesia",
  // Tiga email studio — semuanya aktif (dipisahkan koma, footer menampilkan semuanya)
  studio_email:
    "ptelchistudiobali@gmail.com, elchistudio@gmail.com, info@elchistudio.com",
};

for (const [key, value] of Object.entries(UPDATES)) {
  await db.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

const rows = await db.siteSetting.findMany({
  where: { key: { in: Object.keys(UPDATES) } },
});
for (const r of rows) console.log(`✓ ${r.key} = ${r.value}`);
const wa = await db.siteSetting.findUnique({ where: { key: "studio_whatsapp" } });
console.log(`✓ studio_whatsapp = ${wa?.value ?? "(kosong)"}`);
await db.$disconnect();
