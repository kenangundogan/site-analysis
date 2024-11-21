import ScriptTag from '../models/scriptTag.js';

const extractScriptTag = (document) => {
    const attributes = [];

    // Inline script'leri al
    const inlineScripts = document.querySelectorAll('script');
    inlineScripts.forEach((script) => {
        if (script.innerHTML) {
            attributes.push({
                type: 'inline',
                content: script.innerHTML,
            });
        }
    });
    // External script'leri al
    const externalScripts = document.querySelectorAll('script[src]');
    externalScripts.forEach((script) => {
        attributes.push({
            type: 'external',
            src: script.getAttribute('src'),
        });
    });

    return attributes;
};

const processScriptTag = async (document, scanId, linkId) => {
    const scriptTag = extractScriptTag(document);

    if (scriptTag.length > 0) {
        await ScriptTag.findOneAndUpdate(
            { scanId, linkId },
            { attributes: scriptTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractScriptTag,
    processScriptTag,
};
