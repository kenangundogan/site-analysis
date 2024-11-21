import OpenGraphTag from '../models/openGraphTag.js';

const extractOpenGraphTag = (document) => {
    const openGraphTag = Array.from(document.getElementsByTagName('meta')).filter((meta) => {
        return meta.getAttribute('property') && meta.getAttribute('property').includes('og:');
    });

    return openGraphTag.map((meta) => {
        const attributes = {};
        for (const attr of meta.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processOpenGraphTag = async (document, scanId, linkId) => {
    const openGraphTag = extractOpenGraphTag(document);

    if (openGraphTag.length > 0) {
        await OpenGraphTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: openGraphTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractOpenGraphTag,
    processOpenGraphTag,
};
