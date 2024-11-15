import scanService from '../services/scanService.js';

const startScan = async (req, res, next) => {
    try {
        const validHeaders = ['mobile', 'desktop', 'tablet', 'random'];
        const header = validHeaders.includes(req.query.header) ? req.query.header : undefined;
        const result = await scanService.startScan({ ...req.query, header });
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
