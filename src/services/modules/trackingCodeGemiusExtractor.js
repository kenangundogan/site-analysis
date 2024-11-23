export const trackingCodeGemiusExtractor = (document) => {
    const regexPatterns = [
        { key: 'Gemius', regex: /\bpp_gemius_identifier\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g },
        { key: 'Gemius', regex: /\bgemiusIds\s*=\s*{([^}]*)}/g },
        { key: 'Gemius', regex: /window\.gemiusID\s*=\s*['"]([a-zA-Z0-9._-]+)['"]/g },
    ];

    const foundCodes = new Map();

    // 1. Inline script içeriğini tarama
    const scriptTags = document.querySelectorAll('script');
    scriptTags.forEach((script) => {
        const content = script.innerHTML || '';
        regexPatterns.forEach(({ key, regex }) => {
            let match;
            while ((match = regex.exec(content)) !== null) {
                // Eğer match bir obje içeriyorsa ayrıştır
                if (match[0].includes('gemiusIds')) {
                    const values = extractFromObjectString(match[0]);
                    values.forEach((value) => {
                        addCodeToMap(foundCodes, { key, value });
                    });
                } else {
                    const value = match[1]?.trim();
                    if (value) {
                        addCodeToMap(foundCodes, { key, value });
                    }
                }
            }
        });
    });

    // 2. Attribute değerlerini tarama
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
        Array.from(element.attributes).forEach((attr) => {
            regexPatterns.forEach(({ key, regex }) => {
                const matches = attr.value.match(regex) || [];
                matches.forEach((value) => {
                    addCodeToMap(foundCodes, { key, value });
                });
            });
        });
    });

    // Map yapısını JSON formatına dönüştür
    return Array.from(foundCodes.values());
};

// Obje formatındaki Gemius ID'lerini ayrıştırmak için yardımcı fonksiyon
const extractFromObjectString = (objectString) => {
    const matches = objectString.match(/['"]([a-zA-Z0-9._-]+)['"]/g) || [];
    return matches.map((match) => match.replace(/['"]/g, ''));
};

// Kodları tekilleştiren ve sayısını artıran yardımcı fonksiyon
const addCodeToMap = (map, { key, value }) => {
    const existing = map.get(value) || { key, value, count: 0 };
    existing.count += 1;
    map.set(value, existing);
};
