import axios from 'axios';
import Scan from '../models/scan.js';
import Link from '../models/link.js';
import linkUtils from './linkService.js';
import extractLinks from '../utils/linkExtractor.js';

const startScan = async (params) => {
    const { scanId, url, baseUrl, header: headerType, ...options } = params;

    if (!url || !baseUrl) {
        throw new Error('URL ve baseUrl parametreleri zorunludur.');
    }

    try {
        const startDate = new Date();
        const report = {
            type: 'urls',
            endpoint: `/scans/${scanId}`,
        }
        
        // Tarama durumunu 'in-progress' olarak güncelle
        await Scan.findByIdAndUpdate(scanId, { status: 'in-progress',  'date.start': startDate, 'date.end': null, 'date.duration': null, report });

        const mainResponse = await axios.get(url);
        const links = extractLinks(mainResponse.data, baseUrl);

        // Her bir link için Link modeli oluştur ve kaydet
        const linkDocuments = links.map((link) => ({
            scanId,
            url: link.url,
        }));

        await Link.insertMany(linkDocuments);

        // İstekler paralel olarak yapılabilir
        await Promise.all(
            links.map((link) =>
                linkUtils.fetchLinkStatusAndUpdateDB(link, scanId, options, headerType)
            )
        );

        // Tarama tamamlandı, güncelle
        const endDate = new Date();
        const duration = (endDate - startDate) / 1000;
        await Scan.findByIdAndUpdate(scanId, { status: 'completed', 'date.end': endDate, 'date.duration': duration });
    } catch (error) {
        const endDate = new Date();
        const duration = (endDate - startDate) / 1000;
        console.error(`Tarama sırasında hata oluştu: ${error.message}`);
        await Scan.findByIdAndUpdate(scanId, { status: 'error', 'date.end': endDate, 'date.duration': duration });
    }

    // İşlem tamamlandı
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