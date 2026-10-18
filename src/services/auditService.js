const prisma = require('../config/db');

const logAction = async (userId, action, entity, entityId = null, details = null, req = null) => {
  try {
    let ipAddress = '127.0.0.1';
    let userAgent = 'System';

    if (req) {
      ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
      userAgent = req.headers['user-agent'] || 'Unknown';
    }

    await prisma.auditLog.create({
      data: {
        userId: userId ? Number(userId) : null,
        action,
        entity,
        entityId: entityId ? String(entityId) : null,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
        ipAddress: String(ipAddress),
        userAgent: String(userAgent).substring(0, 255),
      },
    });
  } catch (error) {
    console.error('[AuditLog] Failed to record audit log:', error.message);
  }
};

module.exports = {
  logAction,
};
