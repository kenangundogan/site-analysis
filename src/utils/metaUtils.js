import { JSDOM } from 'jsdom';

const extractMetaTags = (html, options = {}) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const metaTags = Array.from(document.querySelectorAll('meta'));
    const result = {};

    if (options.allMeta) {
        result.allMeta = metaTags.map((meta) => ({
            name: meta.getAttribute('name') || meta.getAttribute('property'),
            content: meta.getAttribute('content'),
        }));
    }

    if (options.ogTags) {
        result.ogTags = metaTags
            .filter((meta) => {
                const property = meta.getAttribute('property');
                return property && property.startsWith('og:');
            })
            .map((meta) => ({
                property: meta.getAttribute('property'),
                content: meta.getAttribute('content'),
            }));
    }

    if (options.twitterTags) {
        result.twitterTags = metaTags
            .filter((meta) => {
                const name = meta.getAttribute('name');
                return name && name.startsWith('twitter:');
            })
            .map((meta) => ({
                name: meta.getAttribute('name'),
                content: meta.getAttribute('content'),
            }));
    }

    return result;
};

export default {
    extractMetaTags,
};
