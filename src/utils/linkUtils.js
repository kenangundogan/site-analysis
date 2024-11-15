import axios from 'axios';
import { JSDOM } from 'jsdom';
import fileUtils from './fileUtils.js';
import getRandomHeader from './headerSelector.js';

const extractLinks = (html, baseUrl) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const links = Array.from(document.querySelectorAll('a'));

    return links
        .map((link) => {
            const href = link.getAttribute('href');
            const alt = link.getAttribute('title') || link.textContent.trim();
            if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
                return {
                    alt,
                    url: href.startsWith('/') ? `${baseUrl}${href}` : href,
                    status: {
                        code: null,
                        message: null,
                    },
                    date: {
                        start: null,
                        end: null,
                        duration: null,
                    },
                };
            }
        })
        .filter((link) => link);
};

const initializeFileWithLinks = (links, fileName, url, baseurl) => {
    const startDate = new Date().toISOString();
    const data = {
        url,
        baseurl,
        totalLinks: links.length,
        response: {},
        date: {
            start: startDate,
            end: null,
            duration: null,
        },
        links,
    };
    fileUtils.writeToFile(fileName, data);
};

const fetchLinkStatusAndUpdateFile = async (link, fileName, options, headerType) => {
    const startTime = new Date();

    // Her link için rastgele bir header seçiyoruz
    const headerData = getRandomHeader(headerType);
    const headers = headerData.headers;

    try {
        const response = await axios.get(link.url, {
            headers,
        });
        const endTime = new Date();

        link.status = {
            code: response.status,
            message: response.statusText,
        };
        link.date = {
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            duration: `${(endTime - startTime) / 1000} seconds`,
        };

        // Kullanılan header bilgisini link verisine ekliyoruz
        link.headerInfo = {
            headerType: headerData.headerType || 'default',
            headerId: headerData.headerId,
            headersUsed: headers,
        };

        // Ek işlemler burada...

    } catch (error) {
        const endTime = new Date();
        link.status = {
            code: error.response ? error.response.status : 500,
            message: error.message,
        };
        link.date = {
            start: startTime.toISOString(),
            end: endTime.toISOString(),
            duration: `${(endTime - startTime) / 1000} seconds`,
        };

        // Hata durumunda da header bilgisini ekleyelim
        link.headerInfo = {
            headerType: headerData.headerType || 'default',
            headerId: headerData.headerId,
            headersUsed: headers,
        };
    }

    // JSON dosyasını güncelle
    const existingData = fileUtils.readFromFile(fileName);
    existingData.links = existingData.links.map((item) =>
        item.url === link.url ? link : item,
    );

    // response objesini güncelle
    const statusCode = link.status.code;
    if (statusCode) {
        if (!existingData.response[statusCode]) {
            existingData.response[statusCode] = 1;
        } else {
            existingData.response[statusCode] += 1;
        }
    }

    // Taramanın tamamlanıp tamamlanmadığını kontrol et
    const isCompleted = existingData.links.every(
        (item) => item.status && item.status.code !== null,
    );
    if (isCompleted && !existingData.date.end) {
        const endDate = new Date().toISOString();
        const duration =
            existingData.date.start && endDate
                ? `${(
                    (new Date(endDate) - new Date(existingData.date.start)) /
                    1000
                ).toFixed(2)} seconds`
                : null;

        existingData.date.end = endDate;
        existingData.date.duration = duration;
    }

    fileUtils.writeToFile(fileName, existingData);
};

export default {
    extractLinks,
    initializeFileWithLinks,
    fetchLinkStatusAndUpdateFile,
};
