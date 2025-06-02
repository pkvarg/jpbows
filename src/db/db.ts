// src/db/db.ts
import { PrismaClient } from '../../prisma/generated/prisma'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}

export default db
