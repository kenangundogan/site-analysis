import HeadingTag from '../models/headingTag.js';
import cleanText from '../utils/cleanText.js';

const extractHeadingTag = (document) => {
    const headingTag = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingTagAttributes = [];

    headingTag.forEach((tag) => {
        const tagAttributes = {
            tag: tag.tagName,
            text: cleanText(tag.textContent.trim()),
        };

        headingTagAttributes.push(tagAttributes);
    });

    headingTagAttributes.sort((a, b) => a.tag.localeCompare(b.tag));

    return headingTagAttributes;
};

const processHeadingTag = async (document, scanId, linkId) => {
    const headingTag = extractHeadingTag(document);

    await HeadingTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: headingTag.length > 0 ? headingTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractHeadingTag,
    processHeadingTag,
};
