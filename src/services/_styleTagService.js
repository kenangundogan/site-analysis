import StyleTag from '../models/styleTag.js';

const extractStyleTag = (document) => {
    const styleObjects = [];

    // tüm tagler içindeki style attribute
    const inline = document.querySelectorAll('*[style]');
    if (inline.length > 0) {
        inline.forEach((tag) => {
            const styleValue = tag.getAttribute('style').trim();
            if (styleValue) {
                styleObjects.push({
                    key: 'inline',
                    type: 'text/css',
                    value: styleValue,
                    valueType: 'text',
                });
            }
        });
    }

    // Embeded style tag
    const embedded = document.querySelectorAll('style');
    if (embedded.length > 0) {
        embedded.forEach((tag) => {
            const styleValue = tag.innerHTML.trim();
            if (styleValue) {
                styleObjects.push({
                    key: 'embedded',
                    type: 'text/css',
                    value: styleValue,
                    valueType: 'text',
                });
            }
        });
    }

    // External style tag rel="stylesheet" yada type="text/css" yada href varsa
    const external = document.querySelectorAll('link[rel="stylesheet"], link[type="text/css"]');
    if (external.length > 0) {
        external.forEach((tag) => {
            const styleValue = tag.href.trim();
            if (styleValue) {
                styleObjects.push({
                    key: 'external',
                    type: 'text/css',
                    value: styleValue,
                    valueType: 'url',
                });
            }
        });
    }

    return styleObjects;
};

const processStyleTag = async (document, scanId, linkId) => {
    const styleTag = extractStyleTag(document);

    if (styleTag.length > 0) {
        await StyleTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: styleTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractStyleTag,
    processStyleTag,
};