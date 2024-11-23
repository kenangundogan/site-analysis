import TwitterCardTag from '../models/twitterCardTag.js';

const extractTwitterCardTag = (document) => {
    const twitterCardTag = Array.from(document.getElementsByTagName('meta')).filter((meta) => {
        return meta.getAttribute('name') && meta.getAttribute('name').includes('twitter:');
    });

    return twitterCardTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processTwitterCardTag = async (document, scanId, linkId) => {
    const twitterCardTag = extractTwitterCardTag(document);

    if (twitterCardTag.length > 0) {
        await TwitterCardTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: twitterCardTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractTwitterCardTag,
    processTwitterCardTag,
};
