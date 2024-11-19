import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from '../models/link.js';
import getRandomHeader from './headerSelector.js';
import metaUtils from './metaUtils.js';
import headersUtils from './headersUtils.js';

const fetchLinkStatusAndUpdateDB = async (link, scanId, options, headerType) => {
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

        // Link bilgisini güncelle veya oluştur
        const linkUpdate = {
            scanId,
            statusCode: response.status,
            statusMessage: response.statusText,
            startDate: startTime,
            endDate: endTime,
            duration: (endTime - startTime) / 1000,
            headerInfo: {
                headerType: headerData.headerType || 'default',
                headerId: headerData.headerId,
                headersUsed: headers,
            }
        };

        const updatedLink = await Link.findOneAndUpdate(
            { scanId, url: link.url },
            linkUpdate,
            { upsert: true, new: true }
        );

        // Header bilgilerini ayrı koleksiyona kaydet
        if (options.headers) {
            await headersUtils.processHeaders(response.headers, scanId, updatedLink._id);
        }

        // HTML içeriğini al
        const html = response.data;

        // Meta verileri çıkar ve ayrı koleksiyona kaydet
        if (options.headMeta) {
            await metaUtils.processMetaTags(html, scanId, updatedLink._id);
        }
    } catch (error) {
        const endTime = new Date();

        // Hata durumunda da status code'u almaya çalışalım
        const statusCode = error.response ? error.response.status : null;
        const statusMessage = error.response ? error.response.statusText : error.message;

        // Link bilgisini güncelle veya oluştur
        const linkUpdate = {
            scanId,
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
        };

        await Link.findOneAndUpdate(
            { scanId, url: link.url },
            linkUpdate,
            { upsert: true, new: true }
        );

        // Hata oluştuğu için meta verileri işlenmeyecek
    }
};

const extractLinks = (html, baseUrl) => {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const links = Array.from(document.querySelectorAll('a'));
    const uniqueUrls = new Set();

    return links
        .map((link) => {
            const href = link.getAttribute('href');
            const fullUrl = href.startsWith('/') ? `${baseUrl}${href}` : href;
            if (href && !href.startsWith('#') && !href.startsWith('javascript') && !uniqueUrls.has(fullUrl)) {
                uniqueUrls.add(fullUrl);
                return {
                    url: fullUrl,
                };
            }
        })
        .filter((link) => link);
};

export default {
    fetchLinkStatusAndUpdateDB,
    extractLinks,
};