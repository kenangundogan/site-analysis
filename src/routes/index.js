import { Router } from 'express';
import scanController from '../controllers/scanController.js';

const router = Router();

router.get('/', scanController.startScan);
router.get('/scans', scanController.getScans);
router.get('/scan-report/:scanId', scanController.getScanReport);

export default router;
