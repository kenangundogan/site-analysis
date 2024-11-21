import { Router } from 'express';
import scanController from '../controllers/scanController.js';
import apiController from '../controllers/apiController.js';
import metaTagController from '../controllers/metaTagController.js'; 
import headersController from '../controllers/headersController.js'; 

const router = Router();

// API bilgilendirme endpoint'i
router.get('/', apiController.getApiInfo);

// Tüm taramaları listeleme
router.get('/scans', scanController.getScans);

// Yeni bir tarama başlatma
router.post('/scans', scanController.startScan);

// Belirli bir tarama raporunu alma
router.get('/scans/:scanId', scanController.getScanReport);

// Belirli bir tarama ve link için meta etiketlerini alma
router.get('/scans/:scanId/links/:linkId/metaTag', metaTagController.getMetaTagByScanAndLink);

// Belirli bir tarama ve link için headers bilgilerini alma
router.get('/scans/:scanId/links/:linkId/headers', headersController.getHeadersByScanAndLink);

export default router;
