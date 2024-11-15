import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import fileUtils from '../utils/fileUtils.js';
import linkUtils from '../utils/linkUtils.js';
import config from '../config/index.js';

const startScan = async (params) => {
    const { url, baseurl, header, ...options } = params;

    if (!url || !baseurl) {
        throw new Error('URL ve baseurl parametreleri zorunludur.');
    }

    const scanId = `${new Date().toISOString().replace(/[:.]/g, '-')}-${uuidv4()}`;
    const fileName = fileUtils.generateFileName(scanId);

    // Sonuçlar dizini oluşturulur
    fileUtils.createResultsDir();

    // Başlangıçta kullanıcıya dönüş yap
    const responseMessage = { message: 'Tarama başlatıldı.', scanId };

    // Asenkron işlemleri arka planda çalıştır
    (async () => {
        try {
            const mainResponse = await axios.get(url);
            const links = linkUtils.extractLinks(mainResponse.data, baseurl);

            linkUtils.initializeFileWithLinks(links, fileName, url, baseurl);

            await Promise.all(
                links.map((link) =>
                    linkUtils.fetchLinkStatusAndUpdateFile(link, fileName, options, header),
                ),
            );
        } catch (error) {
            console.error(`Tarama sırasında hata oluştu: ${error.message}`);
        }
    })();

    return responseMessage;
};

const getScans = () => {
    const scans = fileUtils.getAllScans();
    return scans;
};

const getScanReport = (scanId) => {
    const report = fileUtils.getScanReport(scanId);
    if (!report) {
        throw new Error('Geçersiz veya mevcut olmayan bir tarama ID\'si.');
    }
    return report;
};

export default {
    startScan,
    getScans,
    getScanReport,
};
