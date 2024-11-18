import scanService from '../services/scanService.js';

const startScan = async (req, res, next) => {
    try {
        const {
            url,
            baseurl,
            header,
            content = false,
            headMeta = false,
            headLink = false,
            heading = false,
            headers = false,
            structuredData = false,
            jsFiles = false,
            cssFiles = false,
            tracking = false,
            ogTags = false,
            twitterTags = false,
            allMeta = false,
        } = req.body;

        // Gerekli parametrelerin kontrolü
        if (!url || !baseurl) {
            return res.status(400).json({
                error: 'URL ve baseurl parametreleri zorunludur.',
            });
        }

        const options = {
            content,
            headMeta,
            headLink,
            heading,
            headers,
            structuredData,
            jsFiles,
            cssFiles,
            tracking,
            metaTags: {
                ogTags,
                twitterTags,
                allMeta,
            },
        };

        const validHeaders = ['mobile', 'desktop', 'tablet', 'random'];
        const headerType = validHeaders.includes(header) ? header : undefined;

        const result = await scanService.startScan({ url, baseurl, header: headerType, ...options });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getScans = async (req, res, next) => {
    try {
        const scans = await scanService.getScans();
        console.log('getScans fonksiyonu çağrıldı. Bulunan taramalar:', scans);
        res.json(scans);
    } catch (error) {
        console.error('getScans fonksiyonunda hata:', error);
        next(error);
    }
};

const getScanReport = async (req, res, next) => {
    try {
        const { scanId } = req.params;
        const report = await scanService.getScanReport(scanId);
        res.json(report);
    } catch (error) {
        console.error('getScanReport fonksiyonunda hata:', error);
        next(error);
    }
};

export default {
    startScan,
    getScans,
    getScanReport,
};
