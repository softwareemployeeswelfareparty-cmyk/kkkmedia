/**
 * Utility to ensure Supabase connection strings work in environments (like Render free tier)
 * that do not support outbound IPv6 routing.
 * 
 * Direct connections (db.[ref].supabase.co) are IPv6-only on Supabase.
 * The shared connection pooler (aws-0-[region].pooler.supabase.com) provides full IPv4 support.
 */

function fixSupabaseUrl(urlStr, targetPort = null) {
  if (!urlStr || typeof urlStr !== 'string') return urlStr;
  if (!urlStr.includes('.supabase.co')) return urlStr;

  try {
    const parsed = new URL(urlStr);
    
    // Only rewrite if pointing to direct db.[ref].supabase.co host
    if (parsed.hostname.startsWith('db.')) {
      const parts = parsed.hostname.split('.');
      const projectRef = parts[1];
      const region = process.env.SUPABASE_REGION || 'aws-0-ap-south-1';
      const poolerHost = region.includes('.pooler.supabase.com') 
        ? region 
        : `${region}.pooler.supabase.com`;

      parsed.hostname = poolerHost;

      // In Supabase pooler, username format must be: [user].[project-ref]
      if (parsed.username && !parsed.username.includes('.')) {
        parsed.username = `${parsed.username}.${projectRef}`;
      }

      if (targetPort) {
        parsed.port = String(targetPort);
        if (targetPort === 5432) {
          // Session mode: do not include pgbouncer flag
          parsed.searchParams.delete('pgbouncer');
        } else if (targetPort === 6543) {
          // Transaction mode: pgBouncer requires this flag
          parsed.searchParams.set('pgbouncer', 'true');
        }
      }

      return parsed.toString();
    }
  } catch (err) {
    // If URL parsing fails, return original string
  }

  return urlStr;
}

module.exports = { fixSupabaseUrl };
