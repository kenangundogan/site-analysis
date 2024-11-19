import axios from 'axios';
import Scan from '../models/scan.js';
import Link from '../models/link.js';
import linkUtils from '../utils/linkUtils.js';

const startScan = async (params) => {
    const { scanId, url, baseUrl, header: headerType, ...options } = params;

    if (!url || !baseUrl) {
        throw new Error('URL ve baseUrl parametreleri zorunludur.');
    }

    // Asenkron işlemleri arka planda çalıştır
    (async () => {
        try {
            // Tarama durumunu 'in-progress' olarak güncelle
            await Scan.findByIdAndUpdate(scanId, { status: 'in-progress', startDate: new Date() });

            const mainResponse = await axios.get(url);
            const links = linkUtils.extractLinks(mainResponse.data, baseUrl);

            // Her bir link için Link modeli oluştur ve kaydet
            for (const link of links) {
                const linkData = {
                    scanId,
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
                    await linkUtils.fetchLinkStatusAndUpdateDB(link, scanId, options, headerType);
                }),
            );

            // Tarama tamamlandı, güncelle
            await Scan.findByIdAndUpdate(scanId, { status: 'completed', endDate: new Date() });
        } catch (error) {
            console.error(`Tarama sırasında hata oluştu: ${error.message}`);
            await Scan.findByIdAndUpdate(scanId, { status: 'error', endDate: new Date() });
        }
    })();

    // Asenkron işlem başlatıldı, kontrolöre dönüş yapıyoruz
    return;
};

const getScans = async () => {
    const scans = await Scan.find().sort({ startDate: -1 });
    return scans;
};

const getScanReport = async (scanId) => {
    const scan = await Scan.findById(scanId);
    if (!scan) {
        throw new Error('Belirtilen scanId ile eşleşen bir tarama bulunamadı.');
    }
    const links = await Link.find({ scanId });
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
