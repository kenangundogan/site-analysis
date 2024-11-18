const extractMetaTags = (document) => {
    const metaTags = Array.from(document.querySelectorAll('meta'));

    return metaTags.map((meta) => {
        const attributes = {};
        for (let attr of meta.attributes) {
            attributes[attr.name] = attr.value;
        }
        return attributes;
    });
};

export default {
    extractMetaTags,
};
