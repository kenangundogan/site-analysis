import OpenGraphTag from '../models/openGraphTag.js';
import cleanText from '../utils/cleanText.js';

const extractOpenGraphTag = (document) => {
    const openGraphTag = Array.from(document.getElementsByTagName('meta')).filter((meta) => {
        return meta.getAttribute('property') && meta.getAttribute('property').includes('og:');
    });

    return openGraphTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = cleanText(attr.value.trim());
        }
        return attributes;
    });
};

const processOpenGraphTag = async (document, scanId, linkId) => {
    const openGraphTag = extractOpenGraphTag(document);

    await OpenGraphTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: openGraphTag.length > 0 ? openGraphTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractOpenGraphTag,
    processOpenGraphTag,
};
