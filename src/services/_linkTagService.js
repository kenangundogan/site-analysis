import LinkTag from '../models/linkTag.js';

const extractLinkTag = (document) => {
    const linkTag = Array.from(document.getElementsByTagName('link'));

    return linkTag.map((link) => {
        const attributes = {};
        for (const attr of link.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processLinkTag = async (document, scanId, linkId) => {
    const linkTag = extractLinkTag(document);

    if (linkTag.length > 0) {
        await LinkTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: linkTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractLinkTag,
    processLinkTag,
};
