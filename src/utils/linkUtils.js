import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from '../models/link.js';
import getRandomHeader from './headerSelector.js';
import { URL } from 'url';

const fetchLinkStatusAndUpdateDB = async (link, scanUuid, options, headerType) => {
    const startTime = new Date();

    // Her link için rastgele bir header seç
    const headerData = getRandomHeader(headerType);
    const headers = headerData.headers;

    try {
        const response = await axios.get(link.url, {
            headers,
            validateStatus: () => true, // Tüm durum kodlarını başarılı kabul et
            responseType: 'text', // Yanıtı metin olarak al
        });
        const endTime = new Date();

        // response.headers'ı serileştir
        const sanitizedHeaders = {};
        for (const [key, value] of Object.entries(response.headers)) {
            try {
                sanitizedHeaders[key] = typeof value === 'string' ? value : JSON.stringify(value);
            } catch (e) {
                sanitizedHeaders[key] = '';
            }
        }

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
                response: options.headers ? sanitizedHeaders : undefined,
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

    const uniqueUrls = new Set(); // Benzersiz URL'leri takip etmek için Set kullanıyoruz
    const baseDomain = new URL(baseUrl).hostname; // Temel alan adını alıyoruz

    return links
        .map((link) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
                try {
                    // Href'i mutlak bir URL'ye dönüştürüyoruz
                    const absoluteUrl = new URL(href, baseUrl).href;
                    const urlDomain = new URL(absoluteUrl).hostname;

                    // Sadece iç URL'leri ekliyoruz
                    if (urlDomain === baseDomain) {
                        // Benzersizliği kontrol ediyoruz
                        if (!uniqueUrls.has(absoluteUrl)) {
                            uniqueUrls.add(absoluteUrl);
                            return {
                                url: absoluteUrl,
                            };
                        }
                    }
                } catch (e) {
                    // Geçersiz URL durumunda hiçbir şey yapmıyoruz
                    return null;
                }
            }
            return null;
        })
        .filter((link) => link !== null); // Null olmayan değerleri alıyoruz
};

export default {
    fetchLinkStatusAndUpdateDB,
    extractLinks,
};