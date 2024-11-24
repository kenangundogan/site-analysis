import MetaTag from '../models/metaTag.js';

const extractMetaTag = (document) => {
    const metaTag = Array.from(document.getElementsByTagName('meta'));

    return metaTag.map((meta) => {
        const attributes = {};
        for (const attr of meta.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processMetaTag = async (document, scanId, linkId) => {
    const metaTag = extractMetaTag(document);

    if (metaTag.length > 0) {
        await MetaTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: metaTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractMetaTag,
    processMetaTag,
};
