const translationCache = new Map();
const MAX_CACHE_SIZE = 3000;

/**
 * Translates a single text using Google Translate GTX endpoint
 * @param {string} text 
 * @param {string} targetLang - 'ta', 'en', 'ml', etc.
 * @param {string} sourceLang - 'auto', 'ta', 'en', 'ml'
 * @returns {Promise<string>}
 */
async function translateText(text, targetLang = 'en', sourceLang = 'auto') {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return text || '';
  }

  const cacheKey = `${sourceLang}:${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sourceLang
    )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Translation upstream returned status ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map(item => (item && item[0] ? item[0] : '')).join('');
      
      // Cache the result
      if (translationCache.size >= MAX_CACHE_SIZE) {
        const firstKey = translationCache.keys().next().value;
        translationCache.delete(firstKey);
      }
      translationCache.set(cacheKey, translated);
      return translated;
    }

    return text;
  } catch (error) {
    console.error(`[TranslationService] Error translating text to ${targetLang}:`, error.message);
    return text; // Graceful fallback to original text
  }
}

/**
 * Translates an array of texts in parallel
 * @param {string[]} texts
 * @param {string} targetLang
 * @param {string} sourceLang
 * @returns {Promise<string[]>}
 */
async function translateBatch(texts, targetLang = 'en', sourceLang = 'auto') {
  if (!Array.isArray(texts)) return [];
  return Promise.all(texts.map(t => translateText(t, targetLang, sourceLang)));
}

module.exports = {
  translateText,
  translateBatch
};
