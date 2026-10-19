const prisma = require('../config/db');

// In-memory buffer for fast error logging
let errorBuffer = [];
let isLoaded = false;
const MAX_ERRORS = 100;

const loadErrors = async () => {
  if (isLoaded) return;
  try {
    const record = await prisma.siteSetting.findUnique({ where: { key: 'site_error_logs' } });
    if (record && record.value) {
      errorBuffer = JSON.parse(record.value);
    }
  } catch (e) {
    errorBuffer = [];
  }
  isLoaded = true;
};

const persistErrors = async () => {
  try {
    await prisma.siteSetting.upsert({
      where: { key: 'site_error_logs' },
      update: { value: JSON.stringify(errorBuffer.slice(0, MAX_ERRORS)) },
      create: { key: 'site_error_logs', value: JSON.stringify(errorBuffer.slice(0, MAX_ERRORS)), group: 'monitoring' },
    });
  } catch (e) {}
};

const logError = async ({ type = 'SERVER_ERROR', message, path, statusCode = 500, ip = '', userAgent = '' }) => {
  await loadErrors();

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    type,
    message: String(message || 'Unknown error'),
    path: String(path || '/'),
    statusCode: Number(statusCode),
    ip: String(ip || ''),
    userAgent: String(userAgent || '').substring(0, 150),
    timestamp: new Date().toISOString(),
  };

  errorBuffer.unshift(entry);
  if (errorBuffer.length > MAX_ERRORS) {
    errorBuffer = errorBuffer.slice(0, MAX_ERRORS);
  }

  // Persist asynchronously
  persistErrors().catch(() => {});
  return entry;
};

const getErrorLogs = async () => {
  await loadErrors();
  return errorBuffer;
};

const clearErrorLogs = async () => {
  errorBuffer = [];
  await persistErrors();
  return true;
};

module.exports = {
  logError,
  getErrorLogs,
  clearErrorLogs,
};
