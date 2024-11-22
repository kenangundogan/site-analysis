import { Router } from 'express';
import scanController from '../controllers/scanController.js';
import apiController from '../controllers/apiController.js';
import metaTagController from '../controllers/metaTagController.js'; 
import headersController from '../controllers/headersController.js'; 
import linkTagController from '../controllers/linkTagController.js';
import openGraphTagController from '../controllers/openGraphTagController.js';
import twitterCardTagController from '../controllers/twitterCardTagController.js';
import headingTagController from '../controllers/headingTagController.js';
import styleTagController from '../controllers/styleTagController.js';
import scriptTagController from '../controllers/scriptTagController.js';
import structuredDataTagController from '../controllers/structuredDataTagController.js';
import trackingCodeController from '../controllers/trackingCodeController.js';

const router = Router();

// API bilgilendirme endpoint'i
router.get('/', apiController.getApiInfo);

// Tüm taramaları listeleme
router.get('/scans', scanController.getScans);

// Yeni bir tarama başlatma
router.post('/scans', scanController.startScan);

// Belirli bir tarama raporunu alma
router.get('/scans/:scanId', scanController.getScanReport);

// Belirli bir tarama ve link için headers bilgilerini alma
router.get('/scans/:scanId/links/:linkId/headers', headersController.getHeadersByScanAndLink);

// Belirli bir tarama ve link için meta etiketlerini alma
router.get('/scans/:scanId/links/:linkId/metaTag', metaTagController.getMetaTagByScanAndLink);

// Belirli bir tarama ve link için link etiketlerini alma
router.get('/scans/:scanId/links/:linkId/linkTag', linkTagController.getLinkTagByScanAndLink);

// Belirli bir tarama ve link için open graph etiketlerini alma
router.get('/scans/:scanId/links/:linkId/openGraphTag', openGraphTagController.getOpenGraphTagByScanAndLink);

// Belirli bir tarama ve link için twitter card etiketlerini alma
router.get('/scans/:scanId/links/:linkId/twitterCardTag', twitterCardTagController.getTwitterCardTagByScanAndLink);

// Belirli bir tarama ve link için heading etiketlerini alma
router.get('/scans/:scanId/links/:linkId/headingTag', headingTagController.getHeadingTagByScanAndLink);

// Belirli bir tarama ve link için style etiketlerini alma
router.get('/scans/:scanId/links/:linkId/styleTag', styleTagController.getStyleTagByScanAndLink);

// Belirli bir tarama ve link için script etiketlerini alma
router.get('/scans/:scanId/links/:linkId/scriptTag', scriptTagController.getScriptTagByScanAndLink);

// Belirli bir tarama ve link için structured data bilgilerini alma
router.get('/scans/:scanId/links/:linkId/structuredDataTag', structuredDataTagController.getStructuredDataTagByScanAndLink);

// Belirli bir tarama ve link için tracking code bilgilerini alma
router.get('/scans/:scanId/links/:linkId/trackingCode', trackingCodeController.getTrackingCodeByScanAndLink);

export default router;
