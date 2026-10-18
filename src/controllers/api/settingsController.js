const settingsService = require('../../services/settingsService');
const { logAction } = require('../../services/auditService');

const getSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const updated = await settingsService.bulkUpdateSettings(req.body);
    await logAction(req.user.id, 'UPDATE', 'SiteSetting', null, 'Updated site settings', req);
    res.json({
      success: true,
      message: 'Site settings updated successfully.',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
