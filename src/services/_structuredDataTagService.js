import StructuredDataTag from '../models/structuredDataTag.js';

const extractStructuredDataTag = (document) => {
    const structuredDataObjects = [];

    const structuredDataTags = document.querySelectorAll('script[type="application/ld+json"]');
    structuredDataTags.forEach((tag) => {
        try {
            const structuredDataObject = JSON.parse(tag.innerHTML);
            structuredDataObjects.push(structuredDataObject);
        } catch (e) {
            console.error('Error parsing structured data tag', e);
        }
    }
    );
    return structuredDataObjects;
};

const processStructuredDataTag = async (document, scanId, linkId) => {
    const structuredDataTag = extractStructuredDataTag(document);

    if (structuredDataTag.length > 0) {
        await StructuredDataTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: structuredDataTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractStructuredDataTag,
    processStructuredDataTag,
};
