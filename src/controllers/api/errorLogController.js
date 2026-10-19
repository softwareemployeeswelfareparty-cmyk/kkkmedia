const errorLogService = require('../../services/errorLogService');

const getErrorLogs = async (req, res, next) => {
  try {
    const logs = await errorLogService.getErrorLogs();
    res.json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

const clearErrorLogs = async (req, res, next) => {
  try {
    await errorLogService.clearErrorLogs();
    res.json({ success: true, message: 'Error monitoring logs cleared successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getErrorLogs,
  clearErrorLogs,
};
