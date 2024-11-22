// Google Tag Manager	GTM-XXXXX	https://www.googletagmanager.com/gtm.js
// Universal Analytics	UA-XXXXX-Y	https://www.google-analytics.com/analytics.js
// Google Analytics (GA4)	GA-XXXXX	https://www.googletagmanager.com/gtag/js
// Google Ads	AW-XXXXX	https://www.googletagmanager.com/gtag/js
// DoubleClick	DC-XXXXX	https://securepubads.g.doubleclick.net/tag/js/gpt.js
// Google Optimize	OPT-XXXXX	https://www.googleoptimize.com/optimize.js
// Google Remarketing	AW-XXXXX	https://www.googletagmanager.com/gtag/js
// Google Floodlight	XXXXX	https://fls.doubleclick.net

import TrackingCode from '../models/trackingCode.js';

const extractTrackingCode = (document) => {
    const allText = document.documentElement.outerHTML;

    // Kodları regex ile yakalamak için bir yapı oluştur
    const extractCodes = (pattern, key, cleanValue = false) => {
        return [...(allText.match(pattern) || [])].map(code => {
            let value = code.trim().replace(/^[\s'"]|['"]$/g, ''); // Çevreleyen boşluk ve tırnakları temizle
            if (cleanValue) {
                value = value.replace(/^src=["']?|["']$/g, ''); // "src=" temizle
            }
            return { key, value };
        });
    };

    const googleGtmCode = [...extractCodes(/(?:^|['"\s])GTM-[A-Z0-9]+(?:['"\s]|$)/g, 'GTM')];
    const googleUaCode = [...extractCodes(/(?:^|['"\s])UA-\d+(-[A-Za-z0-9]+)?(?:['"\s]|$)/g, 'UA')];
    const googleAdsCode = [...extractCodes(/(?:^|['"\s])AW-[A-Z0-9]+(?:['"\s]|$)/g, 'Ads')];
    const googleDcCode = [...extractCodes(/(?:^|['"\s])DC-[A-Z0-9]+(?:['"\s]|$)/g, 'DC')];

    const googleGtmUrls = [...extractCodes(/src=['"]([^'"]*googletagmanager[^'"]*)['"]/g, 'GTM', true)];
    const googleUaUrls = [...extractCodes(/src=['"]([^'"]*google-analytics[^'"]*)['"]/g, 'UA', true)];
    const googleAdsUrls = [...extractCodes(/src=['"]([^'"]*googleads[^'"]*)['"]/g, 'Ads', true)];
    const googleDcUrls = [...extractCodes(/src=['"]([^'"]*doubleclick[^'"]*)['"]/g, 'DC', true)];

    // Tüm nitelikleri taramak için bir yardımcı fonksiyon
    const extractFromAttributes = (document, patterns) => {
        const codes = [];
        const elements = document.querySelectorAll('*'); // Tüm HTML elementlerini seç
        elements.forEach((element) => {
            Array.from(element.attributes).forEach((attr) => {
                patterns.forEach((pattern) => {
                    const match = attr.value.match(pattern.regex);
                    if (match) {
                        codes.push({
                            key: pattern.key,
                            value: match[0].replace(/^[^A-Za-z0-9]+/, ''), // Başındaki istenmeyen karakterleri temizle
                        });
                    }
                });
            });
        });
        return codes;
    };

    const attrPatterns = [
        { regex: /GTM-[A-Z0-9]+/, key: 'GTM' }, // GTM kodları
        { regex: /UA-\d+(-[A-Za-z0-9]+)?/, key: 'UA' }, // Universal Analytics
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
                let value = match[1]?.trim();
                if (value) {
                    value = value.replace(/[^A-Za-z0-9._-]/g, ''); // Kod dışındaki tüm karakterleri temizle
                    gemiusCodes.push({ key: pattern.key, value });
                }
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

    const gemiusUrls = [...extractCodes(/href=['"]([^'"]*gemius[^'"]*)['"]/g, 'gemius', true)];

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
