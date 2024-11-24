import ATag from '../models/aTag.js';

const extractATag = (document) => {
    const aTag = Array.from(document.getElementsByTagName('a'));

    return aTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processATag = async (document, scanId, linkId) => {
    const aTag = extractATag(document);

    if (aTag.length > 0) {
        await ATag.findOneAndUpdate(
            { scanId, linkId },
            { contents: aTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractATag,
    processATag,
};
