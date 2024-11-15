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
        };

        const validHeaders = ['mobile', 'desktop', 'tablet', 'random'];
        const headerType = validHeaders.includes(header) ? header : undefined;

        const result = await scanService.startScan({ url, baseurl, header: headerType, ...options });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getScans = (req, res, next) => {
    try {
        const scans = scanService.getScans();
        res.json(scans);
    } catch (error) {
        next(error);
    }
};

const getScanReport = (req, res, next) => {
    try {
        const report = scanService.getScanReport(req.params.scanId);
        res.json(report);
    } catch (error) {
        next(error);
    }
};

export default {
    startScan,
    getScans,
    getScanReport,
};
