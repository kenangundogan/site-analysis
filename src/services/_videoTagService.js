import VideoTag from '../models/videoTag.js';
import cleanText from '../utils/cleanText.js';

const extractVideoTag = (document) => {
    const attributes = [];

    // video embeded tag (youtube, vimeo, dailymotion)
    const embededVideoTag = Array.from(document.getElementsByTagName('iframe')).filter((iframe) => {
        return iframe.src.includes('youtube.com') || iframe.src.includes('vimeo.com') || iframe.src.includes('dailymotion.com');
    });

    // embededVideoTag tüm attribute'ları attributes array'ine push et
    embededVideoTag.map((video) => {
        const attribute = {};
        for (const attr of video.attributes) {
            attribute[attr.name] = cleanText(attr.value.trim());
        }
        attributes.push(attribute);
    });

    // video tag
    const videoTag = Array.from(document.getElementsByTagName('video'));
    videoTag.map((video) => {
        const attribute = {};
        for (const attr of video.attributes) {
            attribute[attr.name] = cleanText(attr.value.trim());
        }
        attributes.push(attribute);
    });

    return attributes;

};

const processVideoTag = async (document, scanId, linkId) => {
    const videoTag = extractVideoTag(document);

    await VideoTag.findOneAndUpdate(
        { scanId, linkId },
        { contents: videoTag.length > 0 ? videoTag : null },
        { upsert: true, new: true }
    );
};

export default {
    extractVideoTag,
    processVideoTag,
};
