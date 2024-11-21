import StructuredDataTag from '../models/structuredDataTag.js';

const extractStructuredDataTag = (document) => {
    const attributes = [];
    const externalScripts = document.querySelector('script[type="application/ld+json"]');
    if (externalScripts) {
        attributes.push({
            type: 'application/ld+json',
            content: externalScripts.textContent
        });
    }

    return attributes;
};

const processStructuredDataTag = async (document, scanId, linkId) => {
    const structuredDataTag = extractStructuredDataTag(document);

    if (structuredDataTag.length > 0) {
        await StructuredDataTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: structuredDataTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractStructuredDataTag,
    processStructuredDataTag,
};
