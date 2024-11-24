import DomDepth from '../models/domDepth.js';

// Rekursif olarak DOM ağacını JSON formatında çıkarmak ve derinlik eklemek
const extractDomDepth = (element, depth = 0) => {
    const nodeObject = {
        tagName: element.tagName.toLowerCase(),
        depth,
        children: [],
    };

    // Alt elemanları dolaş ve alt öğeler için aynı işlemi uygula
    for (const child of element.children) {
        nodeObject.children.push(extractDomDepth(child, depth + 1));
    }

    return nodeObject;
};

// Tüm DOM'un derinliğini JSON formatında çıkar
const generateDomDepthJson = (document) => {
    return extractDomDepth(document.documentElement);
};

// Veritabanına kaydetmek için process fonksiyonu
const processDomDepth = async (document, scanId, linkId) => {
    // DOM'u JSON formatında çıkart
    const domDepthJson = generateDomDepthJson(document);

    // Veritabanına kaydet
    if (domDepthJson) {
        await DomDepth.findOneAndUpdate(
            { scanId, linkId },
            { contents: domDepthJson },
            { upsert: true, new: true }
        );
    }
};

export default {
    generateDomDepthJson,
    processDomDepth,
};
