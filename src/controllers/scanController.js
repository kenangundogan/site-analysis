import scanService from '../services/scanService.js';
import Scan from '../models/scan.js';
import Link from '../models/link.js';
import formatResponse from '../utils/responseFormatter.js';

const startScan = async (req, res, next) => {
    try {
        const { url, baseUrl, header, ...options } = req.body;

        // Gerekli parametrelerin kontrolü
        if (!url || !baseUrl) {
            return res.status(400).json(
                formatResponse({
                    status: 'error',
                    message: 'URL ve baseUrl parametreleri zorunludur.',
                })
            );
        }

        // Yeni bir tarama oluştur
        const scan = new Scan({ url, baseUrl });
        await scan.save();

        // Tarama işlemini başlat
        scanService.startScan({
            scanId: scan._id,
            url,
            baseUrl,
            header: header,
            ...options,
        });

        res.json(
            formatResponse({
                status: 'success',
                message: 'Tarama işlemi başlatıldı.',
                data: { 
                    scanId: scan._id,
                    endpoint: `/scans/${scan._id}`,
                    url,
                    baseUrl,
                    header,
                    ...options,
                },
            })
        );
    } catch (error) {
        console.error('startScan fonksiyonunda hata:', error);
        next(error);
    }
};

const getScans = async (req, res, next) => {
    try {
        const scans = await Scan.find().select('-__v');
        res.json(
            formatResponse({
                data: scans,
            })
        );
    } catch (error) {
        console.error('getScans fonksiyonunda hata:', error);
        next(error);
    }
};

const getScanReport = async (req, res, next) => {
    try {
        const { scanId } = req.params;

        const links = await Link.find({ scanId }).select('-__v');

        res.json(
            formatResponse({
                data: links,
            })
        );
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
