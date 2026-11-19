import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Runtime SQLite resolution (fix POST 500, Langkah 23):
 * - DATABASE_URL env override bila diset (self-host volume / migrasi Postgres).
 * - Lokal & self-host: <cwd>/db/custom.db (cwd writable).
 * - Serverless (Vercel): FS baca-saja → salin template db dari bundle ke
 *   /tmp dan jalankan dari sana; /tmp persist per instance warm (Fluid).
 *   Data tetap ephemeral antar instance — Postgres permanen ada di
 *   ROADMAP Langkah 9.
 */
const TMP_DB = '/tmp/db/custom.db'

function resolveDbUrl(): string {
  const envUrl = process.env.DATABASE_URL
  // Hanya hormati override yang benar-benar SQLite — Vercel bisa saja
  // membawa DATABASE_URL non-file (placeholder Postgres) yang akan
  // merusak validasi datasource.
  if (envUrl && envUrl.startsWith('file:')) return envUrl
  const bundled = path.join(process.cwd(), 'db', 'custom.db')
  try {
    fs.accessSync(process.cwd(), fs.constants.W_OK)
    return 'file:' + bundled
  } catch {
    try {
      fs.mkdirSync(path.dirname(TMP_DB), { recursive: true })
      if (fs.existsSync(bundled) && !fs.existsSync(TMP_DB)) fs.copyFileSync(bundled, TMP_DB)
    } catch {
      /* fall through — biarkan Prisma yang melapor bila benar-benar tak ada */
    }
    return 'file:' + TMP_DB
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: resolveDbUrl(),
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
