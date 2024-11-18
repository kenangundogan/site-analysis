import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Scan from '../models/scan.js';
import Link from '../models/link.js';
import linkUtils from '../utils/linkUtils.js';

const startScan = async (params) => {
    const { url, baseurl, header: headerType, ...options } = params;

    if (!url || !baseurl) {
        throw new Error('URL ve baseurl parametreleri zorunludur.');
    }

    const scanUuid = uuidv4();

    // Yeni tarama kaydı oluştur
    const newScan = new Scan({
        uuid: scanUuid,
        url,
        baseurl,
        options,
    });

    await newScan.save();

    // Asenkron işlemleri arka planda çalıştır
    (async () => {
        try {
            const mainResponse = await axios.get(url);
            const links = linkUtils.extractLinks(mainResponse.data, baseurl);

            // Her bir link için Link modeli oluştur ve kaydet
            for (const link of links) {
                const linkData = {
                    scanUuid,
                    url: link.url,
                    statusCode: null,
                    statusMessage: null,
                    headerInfo: null,
                };
                const newLink = new Link(linkData);
                await newLink.save();
            }

            // İstekler paralel olarak yapılabilir
            await Promise.all(
                links.map(async (link) => {
                    await linkUtils.fetchLinkStatusAndUpdateDB(link, scanUuid, options, headerType);
                }),
            );

            // Tarama tamamlandı, güncelle
            await Scan.updateOne({ uuid: scanUuid }, { status: 'completed', endDate: new Date() });
        } catch (error) {
            console.error(`Tarama sırasında hata oluştu: ${error.message}`);
            await Scan.updateOne({ uuid: scanUuid }, { status: 'error', endDate: new Date() });
        }
    })();

    return { message: 'Tarama başlatıldı.', scanId: scanUuid };
};

const getScans = async () => {
    const scans = await Scan.find().sort({ startDate: -1 });
    return scans;
};

const getScanReport = async (scanUuid) => {
    const scan = await Scan.findOne({ uuid: scanUuid });
    if (!scan) {
        throw new Error('Belirtilen scanId ile eşleşen bir tarama bulunamadı.');
    }
    const links = await Link.find({ scanUuid });
    return {
        scan,
        links,
    };
};

export default {
    startScan,
    getScans,
    getScanReport,
};
