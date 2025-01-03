import ImgTag from '../models/imgTag.js';
import cleanText from '../utils/cleanText.js';

const extractImgTag = (document) => {
    const imgTag = Array.from(document.getElementsByTagName('img'));

    return imgTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = cleanText(attr.value.trim());
        }
        return attributes;
    });
};

const processImgTag = async (document, scanId, linkId) => {
    const imgTag = extractImgTag(document);

    await ImgTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: imgTag.length > 0 ? imgTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractImgTag,
    processImgTag,
};
