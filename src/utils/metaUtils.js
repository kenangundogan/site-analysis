import { JSDOM } from 'jsdom';
import MetaTag from '../models/metaTag.js';

const extractMetaTags = (html) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const metaTags = Array.from(document.getElementsByTagName('meta'));

    return metaTags.map((meta) => {
        const attributes = {};
        for (const attr of meta.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

const processMetaTags = async (html, scanId, linkId) => {
    const metaTags = extractMetaTags(html);

    if (metaTags.length > 0) {
        // MetaTag belgesini oluştur veya güncelle
        await MetaTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: metaTags },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractMetaTags,
    processMetaTags,
};
