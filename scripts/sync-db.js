const { execSync } = require('child_process');
require('dotenv').config();
const { fixSupabaseUrl } = require('../src/utils/supabaseUrl');

const rawDbUrl = process.env.DATABASE_URL;
const rawDirectUrl = process.env.DIRECT_URL;

if (!rawDbUrl) {
  console.error('[Database Sync] ERROR: DATABASE_URL environment variable is not defined.');
  process.exit(1);
}

// Convert URLs to IPv4 Session pooler (port 5432) for DDL schema push
const sessionUrl = fixSupabaseUrl(rawDirectUrl || rawDbUrl, 5432);
process.env.DATABASE_URL = sessionUrl;
process.env.DIRECT_URL = sessionUrl;

console.log(`[Database Sync] Target database host: ${sessionUrl.replace(/:[^:]*@/, ':****@')}`);

try {
  console.log('[Database Sync] Running prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

  console.log('[Database Sync] Pushing PostgreSQL database schema...');
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit', env: process.env });

  console.log('[Database Sync] PostgreSQL database schema synchronized successfully!');
} catch (error) {
  console.error('[Database Sync] Error during database sync:', error.message);
  process.exit(1);
}
