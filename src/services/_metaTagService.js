import MetaTag from '../models/metaTag.js';
import cleanText from '../utils/cleanText.js';

const extractMetaTag = (document) => {
    const metaTag = Array.from(document.getElementsByTagName('meta'));

    return metaTag.map((meta) => {
        const attributes = {};
        for (const attr of meta.attributes) {
            attributes[attr.name] = cleanText(attr.value.trim());
        }
        return attributes;
    });
};

const processMetaTag = async (document, scanId, linkId) => {
    const metaTag = extractMetaTag(document);

    await MetaTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: metaTag.length > 0 ? metaTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractMetaTag,
    processMetaTag,
};
