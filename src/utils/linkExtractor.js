import { JSDOM } from 'jsdom';

const extractLinks = (html, baseUrl) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const links = Array.from(document.querySelectorAll('a'));
    const uniqueUrls = new Set();

    return links
        .map((link) => {
            const href = link.getAttribute('href');
            if (!href) return null;

            const fullUrl = href.startsWith('/') ? `${baseUrl}${href}` : href;

            if (
                !href.startsWith('#') &&
                !href.startsWith('javascript') &&
                !uniqueUrls.has(fullUrl)
            ) {
                uniqueUrls.add(fullUrl);
                return {
                    url: fullUrl,
                };
            }
            return null;
        })
        .filter((link) => link);
};

export default extractLinks;
