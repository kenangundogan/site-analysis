import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from '../models/link.js';
import getRandomHeader from '../utils/headerSelector.js';
import metaUtils from './_metaTagService.js';
import headersUtils from './_headersService.js';

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
            date: {
                start: startTime,
                end: endTime,
                duration: (endTime - startTime) / 1000,
            },
            status: {
                code: response.status,
                message: response.statusText,
            },
            responseHeader: headerData,
        };

        const updatedLink = await Link.findOneAndUpdate(
            { scanId, url: link.url },
            linkUpdate,
            { upsert: true, new: true }
        );

        let content = [];
        const responseData = response.data;
        const dom = new JSDOM(responseData);
        const document = dom.window.document;
        
        if (options.headers) {
            await headersUtils.processHeaders(response.headers, scanId, updatedLink._id);
            content.push({
                type: 'headers',
                headers: `/scans/${scanId}/links/${updatedLink._id}/headers`,
            });
        }

        if (options.headMeta) {
            await metaUtils.processMetaTags(document, scanId, updatedLink._id);
            content.push({
                type: 'metaTags',
                metaTags: `/scans/${scanId}/links/${updatedLink._id}/metaTags`,
            });
        }

        // Link'i güncelle
        await Link.findByIdAndUpdate(updatedLink._id, {
            content,
        });

    } catch (error) {
        const endTime = new Date();

        // Hata durumunda da status code'u almaya çalışalım
        const statusCode = error.response ? error.response.status : 500;
        const statusMessage = error.message ? error.message : error.message;

        // Link bilgisini güncelle veya oluştur
        const linkUpdate = {
            scanId,
            date: {
                start: startTime,
                end: endTime,
                duration: (endTime - startTime) / 1000,
            },
            status: {
                code: statusCode,
                message: statusMessage,
            },
            responseHeader: headerData
        };

        await Link.findOneAndUpdate(
            { scanId, url: link.url },
            linkUpdate,
            { upsert: true, new: true }
        );

        // Hata oluştuğu için diğer işlemler yapılmayacak
    }
};

export default {
    fetchLinkStatusAndUpdateDB,
};