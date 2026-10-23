/**
 * KKK Media — Article Content Formatter
 * Converts raw article text with line breaks/paragraphs into clean semantic HTML <p> tags,
 * while safely preserving any existing HTML block tags (h1-h6, blockquote, ul, ol, img, etc.).
 */

function formatArticleContent(content) {
  if (!content || typeof content !== 'string') return '';
  const trimmed = content.trim();
  if (!trimmed) return '';

  // Normalize Windows (\r\n) and classic Mac (\r) line breaks to \n
  const normalized = trimmed.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Check if content already consists of well-formed HTML blocks
  const pCount = (normalized.match(/<p[\s>]/gi) || []).length;
  if (pCount >= 2 && !/\n\s*\n/.test(normalized.replace(/<[^>]+>/g, ''))) {
    return normalized;
  }

  // Split content on two or more consecutive newlines into logical paragraphs
  const chunks = normalized.split(/\n\s*\n+/);

  const formattedChunks = chunks.map(chunk => {
    const c = chunk.trim();
    if (!c) return '';

    // If chunk already starts with a block-level HTML tag, keep it as-is
    if (/^<(h[1-6]|p|blockquote|ul|ol|table|div|figure|section|article)[\s>]/i.test(c)) {
      return c;
    }

    // Wrap plain text in <p>, converting internal single newlines to <br>
    const withBreaks = c.replace(/\n/g, '<br>');
    return `<p>${withBreaks}</p>`;
  });

  return formattedChunks.filter(Boolean).join('\n\n');
}

module.exports = {
  formatArticleContent
};
