import TwitterCardTag from '../models/twitterCardTag.js';
import cleanText from '../utils/cleanText.js';

const extractTwitterCardTag = (document) => {
    const twitterCardTag = Array.from(document.getElementsByTagName('meta')).filter((meta) => {
        return meta.getAttribute('name') && meta.getAttribute('name').includes('twitter:');
    });

    return twitterCardTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = cleanText(attr.value.trim());
        }
        return attributes;
    });
};

const processTwitterCardTag = async (document, scanId, linkId) => {
    const twitterCardTag = extractTwitterCardTag(document);

    await TwitterCardTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: twitterCardTag.length > 0 ? twitterCardTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractTwitterCardTag,
    processTwitterCardTag,
};
