const pdf = require('pdf-parse');

/**
 * Robust, Node 24 compatible PDF buffer text extraction.
 * Safely resolves standard or default exports and catches all parsing issues.
 */
async function extractTextFromPdfBuffer(buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('Invalid PDF: Buffer is required');
  }

  // Handle various export patterns across Node/CJS versions
  const parseFn = typeof pdf === 'function' ? pdf : (pdf && pdf.default ? pdf.default : null);

  if (!parseFn || typeof parseFn !== 'function') {
    throw new Error('pdf-parse module is not callable as a function');
  }

  try {
    const data = await parseFn(buffer);
    if (!data || typeof data.text !== 'string') {
      return '';
    }
    // Clean, normalize whitespace, and trim
    return data.text.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').trim();
  } catch (err) {
    console.error('PDF parsing error:', err.message);
    throw new Error(`Failed to parse PDF document: ${err.message}`);
  }
}

module.exports = { extractTextFromPdfBuffer };
