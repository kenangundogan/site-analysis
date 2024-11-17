import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from '../models/link.js';
import getRandomHeader from './headerSelector.js';

const fetchLinkStatusAndUpdateDB = async (link, scanUuid, options, headerType) => {
    const startTime = new Date();

    // Her link için rastgele bir header seç
    const headerData = getRandomHeader(headerType);
    const headers = headerData.headers;

    try {
        const response = await axios.get(link.url, {
            headers,
            validateStatus: () => true, // Tüm durum kodlarını başarılı kabul et
        });
        const endTime = new Date();

        // Link bilgisini güncelle
        await Link.updateOne(
            { scanUuid, url: link.url },
            {
                statusCode: response.status,
                statusMessage: response.statusText,
                startDate: startTime,
                endDate: endTime,
                duration: (endTime - startTime) / 1000,
                headerInfo: {
                    headerType: headerData.headerType || 'default',
                    headerId: headerData.headerId,
                    headersUsed: headers,
                },
                response: options.headers ? response.headers : undefined,
                // Diğer opsiyonel verileri ekleyebilirsiniz
            },
        );
    } catch (error) {
        const endTime = new Date();

        // Hata durumunda da status code'u almaya çalışalım
        const statusCode = error.response ? error.response.status : null;
        const statusMessage = error.response ? error.response.statusText : error.message;

        await Link.updateOne(
            { scanUuid, url: link.url },
            {
                statusCode,
                statusMessage,
                startDate: startTime,
                endDate: endTime,
                duration: (endTime - startTime) / 1000,
                headerInfo: {
                    headerType: headerData.headerType || 'default',
                    headerId: headerData.headerId,
                    headersUsed: headers,
                },
            },
        );
    }
};

const extractLinks = (html, baseUrl) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const links = Array.from(document.querySelectorAll('a'));

    return links
        .map((link) => {
            const href = link.getAttribute('href');
            const alt = link.textContent.trim();
            if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
                return {
                    alt,
                    url: href.startsWith('/') ? `${baseUrl}${href}` : href,
                };
            }
        })
        .filter((link) => link);
};

export default {
    fetchLinkStatusAndUpdateDB,
    extractLinks,
};