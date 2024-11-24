import axios from 'axios';
import { JSDOM } from 'jsdom';
import Link from '../models/link.js';
import getRandomHeader from '../utils/headerSelector.js';
import metaTagService from './_metaTagService.js';
import linkTagService from './_linkTagService.js';
import headersUtils from './_headersService.js';
import openGraphTagService from './_openGraphTagService.js';
import twitterCardTagService from './_twitterCardTagService.js';
import headingTagService from './_headingTagService.js';
import styleTagService from './_styleTagService.js';
import scriptTagService from './_scriptTagService.js';
import structuredDataTagService from './_structuredDataTagService.js';
import trackingCodeService from './_trackingCodeService.js';
import aTagService from './_aTagService.js';
import imgTagService from './_imgTagService.js';
import domDepthService from './_domDepthService.js';
import videoTagService from './_videoTagService.js';

// Link'i güncelleme veya oluşturma işlemi için yardımcı fonksiyon
const updateLink = async (filter, update) => {
    return Link.findOneAndUpdate(filter, update, { upsert: true, new: true });
};

// Tek bir seçeneği işleyen yardımcı fonksiyon
const processOption = async (option, service, document, scanId, linkId, type, linkUrl) => {
    if (option) {
        try {
            await service(document, scanId, linkId);
            return { type, endpoint: `/scans/${scanId}/links/${linkId}/${type}` };
        } catch (e) {
            console.error(`Error processing ${type} for link ${linkUrl}:`, e.message);
            return null;
        }
    }
    return null;
};

// Ana fonksiyon: Link durumu alınıp veritabanında güncellenir
const fetchLinkStatusAndUpdateDB = async (link, scanId, options, headerType) => {
    const startTime = new Date();
    const headerData = getRandomHeader(headerType);
    const headers = headerData.headers;

    try {
        // HTTP isteği gönder
        const response = await axios.get(link.url, {
            headers,
            validateStatus: () => true, // Tüm durum kodlarını başarılı kabul et
            responseType: 'text', // Yanıt metin olarak alınır
        });

        // Link durum bilgilerini güncelle
        const endTime = new Date();
        const updatedLink = await updateLink(
            { scanId, url: link.url },
            {
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
            }
        );

        // DOM işlemleri için JSDOM kullanımı
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Paralel işlemleri hazırlıyoruz
        const tasks = [
            processOption(options.headers, headersUtils.processHeaders, response.headers, scanId, updatedLink._id, 'headers', link.url),
            processOption(options.headingTag, headingTagService.processHeadingTag, document, scanId, updatedLink._id, 'headingTag', link.url),
            processOption(options.linkTag, linkTagService.processLinkTag, document, scanId, updatedLink._id, 'linkTag', link.url),
            processOption(options.metaTag, metaTagService.processMetaTag, document, scanId, updatedLink._id, 'metaTag', link.url),
            processOption(options.openGraphTag, openGraphTagService.processOpenGraphTag, document, scanId, updatedLink._id, 'openGraphTag', link.url),
            processOption(options.twitterCardTag, twitterCardTagService.processTwitterCardTag, document, scanId, updatedLink._id, 'twitterCardTag', link.url),
            processOption(options.aTag, aTagService.processATag, document, scanId, updatedLink._id, 'aTag', link.url),
            processOption(options.imgTag, imgTagService.processImgTag, document, scanId, updatedLink._id, 'imgTag', link.url),
            processOption(options.videoTag, videoTagService.processVideoTag, document, scanId, updatedLink._id, 'videoTag', link.url),
            processOption(options.domDepth, domDepthService.processDomDepth, document, scanId, updatedLink._id, 'domDepth', link.url),
            processOption(options.styleTag, styleTagService.processStyleTag, document, scanId, updatedLink._id, 'styleTag', link.url),
            processOption(options.scriptTag, scriptTagService.processScriptTag, document, scanId, updatedLink._id, 'scriptTag', link.url),
            processOption(options.structuredDataTag, structuredDataTagService.processStructuredDataTag, document, scanId, updatedLink._id, 'structuredDataTag', link.url),
            processOption(options.trackingCode, trackingCodeService.processTrackingCode, document, scanId, updatedLink._id, 'trackingCode', link.url),
        ];

        // Tüm işlemleri paralel olarak çalıştır ve raporu oluştur
        const report = (await Promise.all(tasks)).filter(Boolean);

        // Güncellenen raporu veritabanına kaydet
        await Link.findByIdAndUpdate(updatedLink._id, { report });
    } catch (error) {
        const endTime = new Date();
        const statusCode = error.response ? error.response.status : 500;
        const statusMessage = error.response ? error.response.statusText : error.message;

        // Hata durumunda da link bilgisini güncelle
        await updateLink(
            { scanId, url: link.url },
            {
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
                responseHeader: headerData,
            }
        );

        // Hata loglama
        console.error(`Error processing link ${link.url}:`, error.message);
    }
};

export default {
    fetchLinkStatusAndUpdateDB,
};
