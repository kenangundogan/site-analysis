import LinkTag from '../models/linkTag.js';
import cleanText from '../utils/cleanText.js';

const extractLinkTag = (document) => {
    const linkTag = Array.from(document.getElementsByTagName('link'));

    return linkTag.map((link) => {
        const attributes = {};
        for (const attr of link.attributes) {
            attributes[attr.name] = cleanText(attr.value.trim());
        }
        return attributes;
    });
};

const processLinkTag = async (document, scanId, linkId) => {
    const linkTag = extractLinkTag(document);

    await LinkTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: linkTag.length > 0 ? linkTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractLinkTag,
    processLinkTag,
};
