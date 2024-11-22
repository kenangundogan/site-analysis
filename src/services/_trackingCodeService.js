import TrackingCode from '../models/trackingCode.js';

const extractTrackingCode = (document) => {
    const allText = document.documentElement.outerHTML;

    // Kodları regex ile yakalamak için bir yapı oluştur
    const extractCodes = (pattern, key) => {
        return [...(allText.match(pattern) || [])].map(code => ({ key, value: code.replace(/['"`]/g, '') }));
    };

    const googleGtmCode = [...extractCodes(/['"`]GTM-[A-Z0-9]+['"`]/g, 'GTM')];
    const googleUaCode = [...extractCodes(/['"`]UA-[A-Z0-9]+['"`]/g, 'UA')];
    const googleGaCode = [...extractCodes(/['"`]GA-[A-Z0-9]+['"`]/g, 'GA')];
    const googleGtagCode = [...extractCodes(/['"`]AW-[A-Z0-9]+['"`]/g, 'Gtag')];
    const googleAdsCode = [...extractCodes(/['"`]AW-[A-Z0-9]+['"`]/g, 'Ads')];
    const googleDcCode = [...extractCodes(/['"`]DC-[A-Z0-9]+['"`]/g, 'DC')];

    const googleGtmUrls = [...extractCodes(/src=['"]([^'"]*googletagmanager[^'"]*)['"]/g, 'GTM')];
    const googleUaUrls = [...extractCodes(/src=['"]([^'"]*google-analytics[^'"]*)['"]/g, 'GA')];
    const googleGaUrls = [...extractCodes(/src=['"]([^'"]*google-analytics[^'"]*)['"]/g, 'GA')];
    const googleGtagUrls = [...extractCodes(/src=['"]([^'"]*googletag[^'"]*)['"]/g, 'Gtag')];
    const googleAdsUrls = [...extractCodes(/src=['"]([^'"]*googleads[^'"]*)['"]/g, 'Ads')];
    const googleDcUrls = [...extractCodes(/src=['"]([^'"]*doubleclick[^'"]*)['"]/g, 'DC')];

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
            codes: [...googleGtmCode, ...googleUaCode, ...googleGaCode, ...googleGtagCode, ...googleAdsCode, ...googleDcCode],
            urls: [...googleGtmUrls, ...googleUaUrls, ...googleGaUrls, ...googleGtagUrls, ...googleAdsUrls, ...googleDcUrls],
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

        // Veri yapısını konsolda göster
        console.log('Tracking Code:', JSON.stringify(trackingCode, null, 2));

        // MongoDB güncelleme işlemi
        const result = await TrackingCode.findOneAndUpdate(
            { scanId, linkId },
            { attributes: trackingCode },
            { upsert: true, new: true }
        );

        console.log('MongoDB Update Result:', result);
    } catch (error) {
        console.error('Error processing tracking code:', error);
        throw error;
    }
};

export default {
    extractTrackingCode,
    processTrackingCode,
};
