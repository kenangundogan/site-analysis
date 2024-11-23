export const trackingCodeGoogleExtractor = (document) => {
    const regexPatterns = [
        { key: 'GTM', regex: /(?<![a-zA-Z0-9\s])GTM-[A-Z0-9]+/g },
        { key: 'UA', regex: /(?<![a-zA-Z0-9\s])UA-\d+(-[A-Za-z0-9]+)?/g },
        { key: 'GA4', regex: /(?<![a-zA-Z0-9\s])G-[A-Z0-9]+/g },
        { key: 'Ads', regex: /(?<![a-zA-Z0-9\s])AW-[A-Z0-9]+/g },
        { key: 'DC', regex: /(?<![a-zA-Z0-9\s])DC-[A-Z0-9]+/g },
    ];

    const foundCodes = new Map();

    // Inline script içeriği tarama
    const scriptTags = document.querySelectorAll('script');
    scriptTags.forEach((script) => {
        const content = script.innerHTML || '';
        regexPatterns.forEach(({ key, regex }) => {
            const matches = content.match(regex) || [];
            matches.forEach((match) => {
                const existing = foundCodes.get(match) || { key, value: match, count: 0 };
                existing.count += 1;
                foundCodes.set(match, existing);
            });
        });
    });

    // Attribute değerlerini tarama
    const allElements = document.querySelectorAll('*');
    allElements.forEach((element) => {
        Array.from(element.attributes).forEach((attr) => {
            regexPatterns.forEach(({ key, regex }) => {
                const matches = attr.value.match(regex) || [];
                matches.forEach((match) => {
                    const existing = foundCodes.get(match) || { key, value: match, count: 0 };
                    existing.count += 1;
                    foundCodes.set(match, existing);
                });
            });
        });
    });

    // Map yapısını JSON formatına dönüştür
    return Array.from(foundCodes.values());
};
