import ImgTag from '../models/imgTag.js';

const extractImgTag = (document) => {
    const imgTag = Array.from(document.getElementsByTagName('img'));

    return imgTag.map((item) => {
        const attributes = {};
        for (const attr of item.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processImgTag = async (document, scanId, linkId) => {
    const imgTag = extractImgTag(document);

    if (imgTag.length > 0) {
        await ImgTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: imgTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractImgTag,
    processImgTag,
};
