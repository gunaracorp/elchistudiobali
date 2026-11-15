/**
 * QA helper: set password admin sementara untuk uji dasbor,
 * hash asli disimpan ke scripts/.orig-admin-hash agar bisa dipulihkan.
 * Pakai: node scripts/admin-password-temp.mjs set   → password: Elchi-QA-2026x
 *       node scripts/admin-password-temp.mjs restore → hash asli kembali
 */
import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";
import { writeFileSync, readFileSync, existsSync, unlinkSync } from "node:fs";

const db = new PrismaClient();
const HASH_FILE = "/home/z/my-project/scripts/.orig-admin-hash";
const TEMP_PW = "Elchi-QA-2026x";
const EMAIL = "ptelchistudiobali@gmail.com";

const admin = await db.adminUser.findUnique({ where: { email: EMAIL } });
if (!admin) {
  console.error("Admin tidak ditemukan:", EMAIL);
  process.exit(1);
}

if (process.argv[2] === "set") {
  writeFileSync(HASH_FILE, admin.passwordHash);
  const salt = randomBytes(16).toString("hex");
  const hash = `${salt}:${scryptSync(TEMP_PW, salt, 64).toString("hex")}`;
  await db.adminUser.update({ where: { email: EMAIL }, data: { passwordHash: hash } });
  console.log("✓ Password sementara aktif:", TEMP_PW, "(hash asli disimpan)");
} else if (process.argv[2] === "restore") {
  if (!existsSync(HASH_FILE)) {
    console.error("File hash asli tidak ada — tidak bisa memulihkan.");
    process.exit(1);
  }
  await db.adminUser.update({
    where: { email: EMAIL },
    data: { passwordHash: readFileSync(HASH_FILE, "utf8").trim() },
  });
  unlinkSync(HASH_FILE);
  console.log("✓ Hash password asli dipulihkan — kredensial user kembali semula");
} else {
  console.error("Argumen: set | restore");
  process.exit(1);
}
await db.$disconnect();
