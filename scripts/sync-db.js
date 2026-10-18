const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();
const { fixSupabaseUrl } = require('../src/utils/supabaseUrl');

let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
let directUrl = process.env.DIRECT_URL || dbUrl;

// Ensure URLs are IPv4 compatible if pointing to Supabase
dbUrl = fixSupabaseUrl(dbUrl, 6543);
directUrl = fixSupabaseUrl(directUrl, 5432);

process.env.DATABASE_URL = dbUrl;
process.env.DIRECT_URL = directUrl;

const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

console.log(`[Database Sync] Detected database URL: ${dbUrl.replace(/:[^:]*@/, ':****@')}`);
console.log(`[Database Sync] Direct migration URL: ${directUrl.replace(/:[^:]*@/, ':****@')}`);
console.log(`[Database Sync] Provider: ${isPostgres ? 'PostgreSQL' : 'SQLite'}`);

const prismaDir = path.join(__dirname, '..', 'prisma');
const schemaPath = path.join(prismaDir, 'schema.prisma');
const sourceSchema = isPostgres 
  ? path.join(prismaDir, 'schema.postgres.prisma')
  : path.join(prismaDir, 'schema.sqlite.prisma');

if (fs.existsSync(sourceSchema)) {
  fs.copyFileSync(sourceSchema, schemaPath);
  console.log(`[Database Sync] Copied ${path.basename(sourceSchema)} to schema.prisma`);
}

try {
  console.log('[Database Sync] Running prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

  console.log('[Database Sync] Pushing database schema...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit', env: process.env });

  console.log('[Database Sync] Database schema synchronized successfully!');
} catch (error) {
  console.error('[Database Sync] Error during database sync:', error.message);
  process.exit(1);
}
