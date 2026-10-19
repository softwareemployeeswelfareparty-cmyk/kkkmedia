const prisma = require('../config/db');

// In-memory cache for fast lookups
let settingsCache = null;
let lastFetch = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

const getSettingsMap = async (forceRefresh = false) => {
  const now = Date.now();
  if (!forceRefresh && settingsCache && (now - lastFetch < CACHE_TTL)) {
    return settingsCache;
  }

  const settings = await prisma.siteSetting.findMany();
  const map = {};
  for (const item of settings) {
    map[item.key] = item.value;
  }

  // Ensure default fallbacks
  map.site_name = map.site_name || 'KKK Media';
  map.site_tagline = map.site_tagline || 'தமிழின் முன்னணி டிஜிட்டல் செய்தி தளம்';
  map.site_description = map.site_description || 'KKK Media Digital News Portal';
  map.contact_email = map.contact_email || 'contact@kkkmedia.com';
  map.contact_phone = map.contact_phone || '+91 44 2855 0101';
  map.contact_address = map.contact_address || 'Chennai, Tamil Nadu';
  map.site_logo = map.site_logo || '/images/logo.png';
  map.site_favicon = map.site_favicon || '/images/favicon.png';
  map.adsense_enabled = map.adsense_enabled === 'true';

  settingsCache = map;
  lastFetch = now;
  return map;
};

const clearSettingsCache = () => {
  settingsCache = null;
  lastFetch = 0;
};

const getAllSettings = async () => {
  return await prisma.siteSetting.findMany({
    orderBy: [{ group: 'asc' }, { key: 'asc' }],
  });
};

const updateSetting = async (key, value, group = 'general') => {
  const setting = await prisma.siteSetting.upsert({
    where: { key },
    update: { value: String(value) },
    create: { key, value: String(value), group },
  });
  settingsCache = null; // Invalidate cache
  return setting;
};

const bulkUpdateSettings = async (settingsObj) => {
  const promises = [];
  for (const [key, val] of Object.entries(settingsObj)) {
    if (val !== undefined) {
      promises.push(
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(val) },
          create: { key, value: String(val), group: 'general' },
        })
      );
    }
  }
  await Promise.all(promises);
  settingsCache = null;
  return await getSettingsMap(true);
};

module.exports = {
  getSettingsMap,
  getAllSettings,
  updateSetting,
  bulkUpdateSettings,
  clearSettingsCache,
};
