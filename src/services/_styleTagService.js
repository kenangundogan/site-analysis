import StyleTag from '../models/styleTag.js';

const extractStyleTag = (document) => {
    const attributes = [];

    // Inline CSS'leri al
    const styleTags = document.querySelectorAll('style');
    if (styleTags) {
        styleTags.forEach((tag) => {
            attributes.push({
                type: 'style',
                content: tag.innerHTML.trim(),
            });
        });
    }

    // External CSS'leri al
    const linkTags = document.querySelectorAll('link[rel="stylesheet"]');
    if (linkTags) {
        linkTags.forEach((tag) => {
            attributes.push({
                type: 'link',
                content: tag.href,
            });
        });
    }

    return attributes;
};

const processStyleTag = async (document, scanId, linkId) => {
    const styleTag = extractStyleTag(document);

    if (styleTag.length > 0) {
        await StyleTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: styleTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractStyleTag,
    processStyleTag,
};
