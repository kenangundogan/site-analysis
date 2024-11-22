import TrackingCode from '../models/trackingCode.js';

const extractTrackingCode = (document) => {
    const allText = document.documentElement.outerHTML;

    // Kodları regex ile yakalamak için bir yapı oluştur
    const extractCodes = (pattern, key) => {
        return [...(allText.match(pattern) || [])].map(code => ({ key, value: code.replace(/['"`]/g, '') }));
    };

    const googleGtmCode = [...extractCodes(/['"`]GTM-[A-Z0-9]+['"`]/g, 'GTM')];
    const googleUaCode = [...extractCodes(/['"`]UA-[A-Z0-9]+['"`]/g, 'UA')];
    const googleAdsCode = [...extractCodes(/['"`]AW-[A-Z0-9]+['"`]/g, 'Ads')];
    const googleDcCode = [...extractCodes(/['"`]DC-[A-Z0-9]+['"`]/g, 'DC')];

    const googleGtmUrls = [...extractCodes(/src=['"]([^'"]*googletagmanager[^'"]*)['"]/g, 'GTM')];
    const googleUaUrls = [...extractCodes(/src=['"]([^'"]*analytics[^'"]*)['"]/g, 'UA')];
    const googleAdsUrls = [...extractCodes(/src=['"]([^'"]*googleads[^'"]*)['"]/g, 'Ads')];
    const googleDcUrls = [...extractCodes(/src=['"]([^'"]*doubleclick[^'"]*)['"]/g, 'DC')];

    // Tüm nitelikleri taramak için bir yardımcı fonksiyon
    const extractFromAttributes = (document, patterns) => {
        const codes = [];
        const elements = document.querySelectorAll('*'); // Tüm HTML elementlerini seç
        elements.forEach((element) => {
            Array.from(element.attributes).forEach((attr) => {
                patterns.forEach((pattern) => {
                    if (pattern.regex.test(attr.value)) {
                        codes.push({
                            key: pattern.key,
                            value: attr.value.match(pattern.regex)[0],
                        });
                    }
                });
            });
        });
        return codes;
    };

    const attrPatterns = [
        { regex: /GTM-[A-Z0-9]+/, key: 'GTM' }, // GTM kodları
        { regex: /UA-[A-Z0-9]+/, key: 'UA' },   // Universal Analytics
        { regex: /AW-[A-Z0-9]+/, key: 'Ads' },  // Google Ads
        { regex: /DC-[A-Z0-9]+/, key: 'DC' },   // DoubleClick
    ];

    const googleAttrCodes = extractFromAttributes(document, attrPatterns);

    // Gemius kodlarını yakalamak için bir yardımcı fonksiyon
    const extractGemiusCodes = (patterns) => {
        const gemiusCodes = [];
        patterns.forEach((pattern) => {
            const matches = [...allText.matchAll(pattern.regex)];
            matches.forEach((match) => {
                gemiusCodes.push({ key: pattern.key, value: match[1] });
            });
        });
        return gemiusCodes;
    };

    const gemiusPatterns = [
        { regex: /gemius(?:Ids)?\s*=\s*{([^}]*)}/g, key: 'gemius' }, // Obje yapıları
        { regex: /gemius(?:Ids)?\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g, key: 'gemius' }, // Tekil string
        { regex: /pp_gemius_identifier\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g, key: 'gemius' }, // pp_gemius_identifier
    ];

    const gemiusCodes = extractGemiusCodes(gemiusPatterns);

    const gemiusUrls = [...extractCodes(/href=['"]([^'"]*gemius[^'"]*)['"]/g, 'gemius')];

    return {
        google: {
            codes: [
                ...googleGtmCode,
                ...googleUaCode,
                ...googleAdsCode,
                ...googleDcCode,
                ...googleAttrCodes, // Tüm attr içlerinden taranan kodlar
            ],
            urls: [...googleGtmUrls, ...googleUaUrls, ...googleAdsUrls, ...googleDcUrls],
        },
        gemius: {
            codes: gemiusCodes,
            urls: gemiusUrls,
        },
    };
};

const processTrackingCode = async (document, scanId, linkId) => {
    try {
        const trackingCode = extractTrackingCode(document);
        await TrackingCode.findOneAndUpdate(
            { scanId, linkId },
            { attributes: trackingCode },
            { upsert: true, new: true }
        );
    } catch (error) {
        console.error('Error processing tracking code:', error);
        throw error;
    }
};

export default {
    extractTrackingCode,
    processTrackingCode,
};
