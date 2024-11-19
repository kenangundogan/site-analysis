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

export default {
    extractHeaders,
};
