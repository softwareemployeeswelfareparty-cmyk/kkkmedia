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
    
    // Project qfxzvhdqcglyftilhetm is confirmed in AWS ap-southeast-1 (Singapore)
    const defaultRegion = 'aws-0-ap-southeast-1';
    const region = process.env.SUPABASE_REGION || defaultRegion;
    const poolerHost = region.includes('.pooler.supabase.com') 
      ? region 
      : `${region}.pooler.supabase.com`;

    // Extract project ref from db.[ref].supabase.co or SUPABASE_URL
    let projectRef = 'qfxzvhdqcglyftilhetm';
    if (parsed.hostname.startsWith('db.')) {
      projectRef = parsed.hostname.split('.')[1];
      parsed.hostname = poolerHost;
    } else if (process.env.SUPABASE_URL) {
      try {
        const su = new URL(process.env.SUPABASE_URL);
        projectRef = su.hostname.split('.')[0];
      } catch (e) {}
    }

    // On Supabase shared poolers, the username MUST be: [user].[project-ref]
    // If username is just 'postgres', authentication will fail with 'credentials for postgres not valid'
    if (parsed.hostname.includes('.pooler.supabase.com')) {
      if (parsed.username && !parsed.username.includes('.')) {
        parsed.username = `${parsed.username}.${projectRef}`;
      }
    }

    // Adjust port & pgbouncer flag depending on use-case (5432 for migrations, 6543 for app)
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
