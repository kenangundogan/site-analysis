import Headers from '../models/headers.js';

const extractHeaders = (responseHeaders) => {
    const sanitizedHeaders = {};
    for (const [key, value] of Object.entries(responseHeaders)) {
        try {
            sanitizedHeaders[key] = typeof value === 'string' ? value : JSON.stringify(value);
        } catch (e) {
            sanitizedHeaders[key] = '';
        }
    }
    return sanitizedHeaders;
};

const processHeaders = async (responseHeaders, scanId, linkId) => {
    const extractedHeaders = extractHeaders(responseHeaders);

    // Headers belgesini oluştur veya güncelle
    await Headers.findOneAndUpdate(
        { scanId, linkId },
        { headers: extractedHeaders },
        { upsert: true, new: true }
    );
};

export default {
    extractHeaders,
    processHeaders,
};
