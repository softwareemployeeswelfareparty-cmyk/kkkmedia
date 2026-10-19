const redirectService = require('../../services/redirectService');

const getRedirects = async (req, res, next) => {
  try {
    const redirects = await redirectService.getAllRedirects();
    res.json({ success: true, data: redirects });
  } catch (error) {
    next(error);
  }
};

const createRedirect = async (req, res, next) => {
  try {
    const { fromPath, toPath, statusCode } = req.body;
    if (!fromPath || !toPath) {
      return res.status(400).json({ success: false, message: 'Source and destination paths are required.' });
    }
    const entry = await redirectService.addRedirect({ fromPath, toPath, statusCode });
    res.status(201).json({ success: true, message: 'Redirect rule created successfully.', data: entry });
  } catch (error) {
    next(error);
  }
};

const deleteRedirect = async (req, res, next) => {
  try {
    const { id } = req.params;
    await redirectService.deleteRedirect(id);
    res.json({ success: true, message: 'Redirect rule deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRedirects,
  createRedirect,
  deleteRedirect,
};
