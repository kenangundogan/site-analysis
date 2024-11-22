import TrackingCode from '../models/trackingCode.js';

const extractTrackingCode = (document) => {
    const allText = document.documentElement.outerHTML;

    // Kodları regex ile yakalamak için bir yapı oluştur
    const extractCodes = (pattern, key) => {
        return [...(allText.match(pattern) || [])].map(code => ({ key, value: code.replace(/['"`]/g, '') }));
    };

    const googleCodes = [
        ...extractCodes(/['"`]GTM-[A-Z0-9]+['"`]/g, 'GTM'),
        ...extractCodes(/['"`]GA-[A-Z0-9]+['"`]/g, 'GA'),
        ...extractCodes(/['"`]UA-[A-Z0-9]+['"`]/g, 'UA'),
    ];

    const gemiusCodes = [];

    // Obje yapısındaki gemius kodlarını yakala
    const objectPattern = /gemius(?:Ids)?\s*=\s*{([^}]*)}/g;
    const objectMatches = allText.match(objectPattern) || [];
    objectMatches.forEach((match) => {
        const ids = match.match(/['"]([a-zA-Z0-9._-]+)['"]/g) || [];
        ids.forEach((id) => {
            gemiusCodes.push({ key: 'gemius', value: id.replace(/['"]/g, '') });
        });
    });

    // Tekil string gemius kodlarını yakala
    const singlePattern = /gemius(?:Ids)?\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g;
    const singleMatches = [...allText.matchAll(singlePattern)];
    singleMatches.forEach((match) => {
        gemiusCodes.push({ key: 'gemius', value: match[1] });
    });

    // pp_gemius_identifier yapısını yakala
    const ppPattern = /pp_gemius_identifier\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g;
    const ppMatches = [...allText.matchAll(ppPattern)];
    ppMatches.forEach((match) => {
        gemiusCodes.push({ key: 'gemius', value: match[1] });
    });

    return {
        google: googleCodes,
        gemius: gemiusCodes,
    };
};

const processTrackingCode = async (document, scanId, linkId) => {
    const trackingCode = extractTrackingCode(document);

    await TrackingCode.findOneAndUpdate(
        { scanId, linkId },
        { attributes: trackingCode },
        { upsert: true, new: true }
    );
};

export default {
    extractTrackingCode,
    processTrackingCode,
};
