const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config();
const { fixSupabaseUrl } = require('../src/utils/supabaseUrl');

let dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
let directUrl = process.env.DIRECT_URL || dbUrl;

// Ensure URLs are IPv4 compatible if pointing to Supabase
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

if (isPostgres) {
  // During schema sync (DDL), use session port 5432 for both DATABASE_URL and DIRECT_URL
  // to prevent pgBouncer transaction pooler (port 6543) from rejecting schema changes
  const sessionUrl = fixSupabaseUrl(directUrl || dbUrl, 5432);
  process.env.DATABASE_URL = sessionUrl;
  process.env.DIRECT_URL = sessionUrl;
  console.log(`[Database Sync] IPv4 Session URL for schema push: ${sessionUrl.replace(/:[^:]*@/, ':****@')}`);
}

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
