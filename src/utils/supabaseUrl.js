/**
 * Utility to ensure Supabase connection strings work in environments (like Render free tier)
 * that do not support outbound IPv6 routing.
 * 
 * Direct connections (db.[ref].supabase.co) are IPv6-only on Supabase.
 * The shared connection pooler (aws-0-[region].pooler.supabase.com) provides full IPv4 support.
 */

function fixSupabaseUrl(urlStr, targetPort = null) {
  if (!urlStr || typeof urlStr !== 'string') return urlStr;
  if (!urlStr.includes('supabase.co') && !urlStr.includes('pooler.supabase.com')) return urlStr;

  try {
    const parsed = new URL(urlStr);
    
    // Project qfxzvhdqcglyftilhetm is in AWS ap-southeast-1 (Singapore)
    const defaultRegion = 'aws-0-ap-southeast-1';
    const region = process.env.SUPABASE_REGION || defaultRegion;
    const poolerHost = region.includes('.pooler.supabase.com') 
      ? region 
      : `${region}.pooler.supabase.com`;

    // 1. If pointing to direct db.[ref].supabase.co host (IPv6 only)
    if (parsed.hostname.startsWith('db.')) {
      const parts = parsed.hostname.split('.');
      const projectRef = parts[1];

      parsed.hostname = poolerHost;

      // In Supabase pooler, username format must be: [user].[project-ref]
      if (parsed.username && !parsed.username.includes('.')) {
        parsed.username = `${parsed.username}.${projectRef}`;
      }
    }

    // 2. Adjust port & pgbouncer flag depending on use-case (5432 for migrations, 6543 for app)
    if (parsed.hostname.includes('.pooler.supabase.com') && targetPort) {
      parsed.port = String(targetPort);
      if (targetPort === 5432) {
        // Session mode for db push / migrations (no pgbouncer param)
        parsed.searchParams.delete('pgbouncer');
      } else if (targetPort === 6543) {
        // Transaction mode for pooler
        parsed.searchParams.set('pgbouncer', 'true');
      }
    }

    return parsed.toString();
  } catch (err) {
    // If URL parsing fails, return original string
  }

  return urlStr;
}

module.exports = { fixSupabaseUrl };
