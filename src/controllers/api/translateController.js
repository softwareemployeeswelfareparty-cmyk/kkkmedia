const { translateText, translateBatch } = require('../../services/translateService');

/**
 * Handle translation requests
 * POST /api/translate
 * Body: { text: "...", targetLang: "en", sourceLang: "auto" }
 * OR: { texts: ["..."], targetLang: "en", sourceLang: "auto" }
 */
exports.translate = async (req, res, next) => {
  try {
    const { text, texts, to, targetLang, from, sourceLang } = req.body;
    const dest = targetLang || to || 'en';
    const src = sourceLang || from || 'auto';

    // Support single text
    if (typeof text === 'string') {
      const translatedText = await translateText(text, dest, src);
      return res.status(200).json({
        success: true,
        translatedText,
        sourceLang: src,
        targetLang: dest
      });
    }

    // Support array of texts
    if (Array.isArray(texts)) {
      const translations = await translateBatch(texts, dest, src);
      return res.status(200).json({
        success: true,
        translations,
        sourceLang: src,
        targetLang: dest
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Missing "text" or "texts" field in request body.'
    });
  } catch (error) {
    next(error);
  }
};
