const prisma = require('../config/db');

let redirectsCache = null;
let isLoaded = false;

const loadRedirects = async () => {
  if (isLoaded && redirectsCache) return redirectsCache;
  try {
    const record = await prisma.siteSetting.findUnique({ where: { key: 'site_redirects' } });
    if (record && record.value) {
      redirectsCache = JSON.parse(record.value);
    } else {
      redirectsCache = [];
    }
  } catch (e) {
    redirectsCache = [];
  }
  isLoaded = true;
  return redirectsCache;
};

const persistRedirects = async () => {
  try {
    await prisma.siteSetting.upsert({
      where: { key: 'site_redirects' },
      update: { value: JSON.stringify(redirectsCache || []) },
      create: { key: 'site_redirects', value: JSON.stringify(redirectsCache || []), group: 'seo' },
    });
  } catch (e) {}
};

const getAllRedirects = async () => {
  return await loadRedirects();
};

const addRedirect = async ({ fromPath, toPath, statusCode = 301 }) => {
  await loadRedirects();

  // Normalize paths
  let cleanFrom = fromPath.trim();
  if (!cleanFrom.startsWith('/')) cleanFrom = '/' + cleanFrom;
  let cleanTo = toPath.trim();
  if (!cleanTo.startsWith('http') && !cleanTo.startsWith('/')) cleanTo = '/' + cleanTo;

  // Check duplicate
  const existingIdx = redirectsCache.findIndex(r => r.fromPath.toLowerCase() === cleanFrom.toLowerCase());
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    fromPath: cleanFrom,
    toPath: cleanTo,
    statusCode: Number(statusCode) === 302 ? 302 : 301,
    hits: 0,
    lastUsedAt: null,
    createdAt: new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    redirectsCache[existingIdx] = { ...redirectsCache[existingIdx], ...entry, hits: redirectsCache[existingIdx].hits };
  } else {
    redirectsCache.push(entry);
  }

  await persistRedirects();
  return entry;
};

const deleteRedirect = async (id) => {
  await loadRedirects();
  redirectsCache = redirectsCache.filter(r => r.id !== id);
  await persistRedirects();
  return true;
};

const matchRedirect = (currentPath) => {
  if (!redirectsCache || redirectsCache.length === 0) return null;

  const normalized = currentPath.toLowerCase().replace(/\/$/, '') || '/';
  const found = redirectsCache.find(r => {
    const fromNorm = r.fromPath.toLowerCase().replace(/\/$/, '') || '/';
    return fromNorm === normalized;
  });

  if (found) {
    found.hits = (found.hits || 0) + 1;
    found.lastUsedAt = new Date().toISOString();
    // Persist hit counters periodically or debounced
    persistRedirects().catch(() => {});
    return found;
  }

  return null;
};

module.exports = {
  loadRedirects,
  getAllRedirects,
  addRedirect,
  deleteRedirect,
  matchRedirect,
};
