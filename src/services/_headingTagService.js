import HeadingTag from '../models/headingTag.js';

// Geçersiz UTF-8 karakterlerini temizlemek için bir fonksiyon
const cleanText = (text) => {
    return text.replace(/[^\x00-\x7F]/g, ""); // Geçersiz karakterleri kaldır
};

const extractHeadingTag = (document) => {
    const headingTag = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingTagAttributes = [];

    headingTag.forEach((tag) => {
        const tagAttributes = {
            tag: tag.tagName,
            text: cleanText(tag.textContent.trim()), // Metni temizle ve boşlukları kırp
        };

        headingTagAttributes.push(tagAttributes);
    });

    // h tag'lerini isim sırasına göre sıralama
    headingTagAttributes.sort((a, b) => a.tag.localeCompare(b.tag));

    return headingTagAttributes;
};

const processHeadingTag = async (document, scanId, linkId) => {
    const headingTag = extractHeadingTag(document);

    if (headingTag.length > 0) {
        await HeadingTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: headingTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractHeadingTag,
    processHeadingTag,
};
