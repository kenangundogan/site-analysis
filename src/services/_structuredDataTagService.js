import StructuredDataTag from '../models/structuredDataTag.js';

const extractStructuredDataTag = (document) => {
    const structuredDataObjects = [];
    const structuredDataTags = document.querySelectorAll('script[type="application/ld+json"]');
    structuredDataTags.forEach((tag) => {
        const structuredDataContent = tag.innerHTML.trim();
        if (structuredDataContent) {
            structuredDataObjects.push({
                key: "embedded",
                type: "application/ld+json",
                value: structuredDataContent,
                valueType: "text",
            });
        }
    });
    return structuredDataObjects;
};


const processStructuredDataTag = async (document, scanId, linkId) => {
    const structuredDataTag = extractStructuredDataTag(document);

    await StructuredDataTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: structuredDataTag.length > 0 ? structuredDataTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractStructuredDataTag,
    processStructuredDataTag,
};
