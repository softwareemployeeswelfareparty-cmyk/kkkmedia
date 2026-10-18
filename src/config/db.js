const { PrismaClient } = require('@prisma/client');
const { fixSupabaseUrl } = require('../utils/supabaseUrl');

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = fixSupabaseUrl(process.env.DATABASE_URL, 6543);
}
if (process.env.DIRECT_URL) {
  process.env.DIRECT_URL = fixSupabaseUrl(process.env.DIRECT_URL, 5432);
}

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error', 'warn'],
  });
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  prisma = global.__prisma;
}

module.exports = prisma;
