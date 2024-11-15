import headers from './headers.js';

const getRandomHeader = (headerType) => {
    let headerSet;

    switch (headerType) {
        case 'mobile':
            headerSet = headers.mobileHeaders;
            break;
        case 'desktop':
            headerSet = headers.desktopHeaders;
            break;
        case 'tablet':
            headerSet = headers.tabletHeaders;
            break;
        case 'random':
            headerSet = headers.allHeaders;
            break;
        default:
            return {
                headerType: 'default',
                headers: headers.defaultHeader,
                headerId: null,
            };
    }

    const randomIndex = Math.floor(Math.random() * headerSet.length);
    const selectedHeader = headerSet[randomIndex];

    return {
        headerType,
        headers: selectedHeader,
        headerId: randomIndex, // Header'ın indeksini veya kimliğini ekliyoruz
    };
};

export default getRandomHeader;
