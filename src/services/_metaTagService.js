import MetaTag from '../models/metaTag.js';

const extractMetaTags = (document) => {
    const metaTags = Array.from(document.getElementsByTagName('meta'));

    return metaTags.map((meta) => {
        const attributes = {};
        for (const attr of meta.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processMetaTags = async (document, scanId, linkId) => {
    const metaTags = extractMetaTags(document);

    if (metaTags.length > 0) {
        await MetaTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: metaTags },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractMetaTags,
    processMetaTags,
};
