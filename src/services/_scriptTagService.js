import ScriptTag from '../models/scriptTag.js';

const extractScriptTag = (document) => {
    const scriptObjects = [];

    // Inline script'leri al
    const embedded = document.querySelectorAll('script');
    embedded.forEach((script) => {
        const scriptContent = script.innerHTML.trim();
        if (scriptContent) {
            scriptObjects.push({
                key: "embedded",
                type: "text/javascript",
                value: scriptContent,
                valueType: "text",
            });
        }
    });

    // External script'leri al
    const externalScripts = document.querySelectorAll('script[src]');
    externalScripts.forEach((script) => {
        const scriptSrc = script.getAttribute('src');
        if (scriptSrc) {
            scriptObjects.push({
                key: "external",
                type: "text/javascript",
                value: scriptSrc,
                valueType: "url",
            });
        }
    });

    return scriptObjects;
};

const processScriptTag = async (document, scanId, linkId) => {
    const scriptTag = extractScriptTag(document);

    if (scriptTag.length > 0) {
        await ScriptTag.findOneAndUpdate(
            { scanId, linkId },
            { contents: scriptTag },
            { upsert: true, new: true }
        );
    }
};

export default {
    extractScriptTag,
    processScriptTag,
};