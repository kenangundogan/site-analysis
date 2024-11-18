import { Router } from 'express';
import scanController from '../controllers/scanController.js';
import apiController from '../controllers/apiController.js';
import metaTagController from '../controllers/metaTagController.js'; 

const router = Router();

// API bilgilendirme endpoint'i
router.get('/', apiController.getApiInfo);

// Tüm taramaları listeleme
router.get('/scans', scanController.getScans);

// Yeni bir tarama başlatma
router.post('/scans', scanController.startScan);

// Belirli bir tarama raporunu alma
router.get('/scans/:scanId', scanController.getScanReport);

// Meta tag bilgilerini alma
router.get('/scans/:scanId/links/:linkId/metaTags', metaTagController.getMetaTagsByLink);

export default router;
