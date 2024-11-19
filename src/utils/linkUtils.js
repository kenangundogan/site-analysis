import axios from 'axios';
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
            },
        };

        const updatedLink = await Link.findOneAndUpdate(
            { scanId, url: link.url },
            linkUpdate,
            { upsert: true, new: true }
        );

        // Header bilgilerini ayrı koleksiyona kaydet
        if (options.headers) {
            await headersUtils.processHeaders(response.headers, scanId, updatedLink._id);
            await Link.findByIdAndUpdate(updatedLink._id, {
                headersEndpoint: `/scans/${scanId}/links/${updatedLink._id}/headers`,
            });
        }

        // Meta verileri çıkar ve ayrı koleksiyona kaydet
        if (options.headMeta) {
            await metaUtils.processMetaTags(response.data, scanId, updatedLink._id);
            await Link.findByIdAndUpdate(updatedLink._id, {
                metaTagEndpoint: `/scans/${scanId}/links/${updatedLink._id}/metaTags`,
            });
        }
    } catch (error) {
        const endTime = new Date();

        // Hata durumunda da status code'u almaya çalışalım
        const statusCode = error.response ? error.response.status : 500;
        const statusMessage = error.message ? error.message : error.message;

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

        // Hata oluştuğu için diğer işlemler yapılmayacak
    }
};

export default {
    fetchLinkStatusAndUpdateDB,
};